import { Injectable, Logger, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { Lesson } from '../entities/lesson.entity';
import { Topic } from '../entities/topic.entity';
import { AnalogyCacheEntry } from '../entities/analogy-cache.entity';

@Injectable()
export class AiService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AiService.name);
  private readonly apiKey: string;
  private readonly apiUrl = 'https://api.anthropic.com/v1/messages';
  private readonly workerUrl: string;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>,
    @InjectRepository(Topic) private topicRepo: Repository<Topic>,
    @InjectRepository(AnalogyCacheEntry) private analogyCacheRepo: Repository<AnalogyCacheEntry>,
  ) {
    this.apiKey = this.configService.get<string>('ANTHROPIC_API_KEY', '');
    this.workerUrl = this.configService.get<string>('AI_WORKER_URL', 'http://localhost:8000');
  }

  /** Generate lesson content via AI worker, persist to DB, return updated lesson */
  async generateLesson(lessonId: string): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOne({
      where: { id: lessonId },
      relations: { topic: true },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    if (lesson.isGenerated && lesson.contentJson) return lesson;

    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.workerUrl}/generate/lesson`, {
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          lessonType: lesson.type,
          topicName: (lesson as any).topic?.name || 'Programming',
          topicCategory: (lesson as any).topic?.category || 'general',
          difficulty: (lesson as any).topic?.difficulty || 'intermediate',
        }, { timeout: 90000 })
      );
      lesson.contentJson = response.data;
      lesson.content = JSON.stringify(response.data); // keep text field as fallback
      lesson.isGenerated = true;
      return await this.lessonRepo.save(lesson);
    } catch (err) {
      this.logger.error(`Generation failed for ${lessonId}: ${err.message}`);
      const fallback = this.getFallbackContentJson(lesson.title, lesson.type);
      lesson.contentJson = fallback;
      lesson.isGenerated = true;
      return await this.lessonRepo.save(lesson);
    }
  }

  /** Save pre-generated lesson content from the AI worker */
  async saveLessonContent(lessonId: string, data: { contentJson: any; isGenerated?: boolean }): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOne({ where: { id: lessonId } });
    if (!lesson) throw new NotFoundException('Lesson not found');
    lesson.contentJson = data.contentJson;
    lesson.isGenerated = data.isGenerated ?? true;
    return await this.lessonRepo.save(lesson);
  }

  // ── Analogy helpers ──────────────────────────────────────────────────────────

  /** Extract every analogy section from a lesson's contentJson together with
   *  the concept name derived from the heading immediately above it. */
  private extractAnalogyContexts(
    contentJson: Record<string, any>,
  ): Array<{ conceptId: string; conceptName: string; cricketAnalogy: string }> {
    const sections: Array<{ type: string; content?: string }> =
      contentJson?.sections ?? [];
    const results: Array<{ conceptId: string; conceptName: string; cricketAnalogy: string }> = [];
    let lastHeading: string = contentJson?.title ?? '';

    for (const s of sections) {
      if (s.type === 'heading' && s.content) lastHeading = s.content;
      if (s.type === 'analogy' && s.content?.trim()) {
        const conceptName = lastHeading;
        const conceptId = conceptName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        results.push({ conceptId, conceptName, cricketAnalogy: s.content });
      }
    }
    return results;
  }

  /**
   * Pre-generate and DB-cache analogies for every domain across every lesson
   * that has already been generated. Runs entirely in the background — the
   * caller gets an instant response with a summary of what was queued.
   *
   * Cricket analogies are stored directly from the lesson JSON (no AI call).
   * Each non-cricket domain is generated via the ai-worker and stored with
   * INSERT OR IGNORE so concurrent runs are safe.
   */
  async seedAnalogyCache(): Promise<{ message: string; lessons: number }> {
    if (!this.workerUrl || /localhost|127\.0\.0\.1/.test(this.workerUrl)) {
      return {
        message: 'AI_WORKER_URL not configured — set it to enable seeding.',
        lessons: 0,
      };
    }

    const NON_CRICKET_DOMAINS = [
      'gaming', 'music', 'photography', 'travel', 'movies',
      'fitness', 'chess', 'cooking', 'finance', 'business', 'sports',
    ];

    const lessons = await this.lessonRepo.find({
      where: { isGenerated: true },
      relations: { topic: true },
    });

    this.logger.log(`Analogy seed: ${lessons.length} generated lessons found — starting background job`);

    (async () => {
      let generated = 0;
      let skipped = 0;
      let failed = 0;

      for (const lesson of lessons) {
        const courseSlug = (lesson as any).topic?.slug;
        if (!courseSlug || !lesson.contentJson) continue;

        const contexts = this.extractAnalogyContexts(lesson.contentJson as Record<string, any>);
        if (contexts.length === 0) continue;

        for (const { conceptId, conceptName, cricketAnalogy } of contexts) {
          // ── Cricket: store from lesson JSON, no AI call ──────────────────
          await this.analogyCacheRepo
            .createQueryBuilder()
            .insert()
            .into(AnalogyCacheEntry)
            .values({ courseSlug, conceptId, domain: 'cricket', analogy: cricketAnalogy })
            .orIgnore()
            .execute();

          // ── Other domains: generate if not already cached ────────────────
          for (const domain of NON_CRICKET_DOMAINS) {
            const exists = await this.analogyCacheRepo.findOne({
              where: { courseSlug, conceptId, domain },
            });
            if (exists) { skipped++; continue; }

            try {
              await this.translateAnalogy(cricketAnalogy, domain, conceptName, courseSlug, conceptId);
              generated++;
            } catch (err) {
              failed++;
              this.logger.warn(
                `Seed failed: ${courseSlug}/${conceptId}/${domain} — ${err.message}`,
              );
            }

            // 400 ms between AI calls — keeps us well within Claude rate limits
            await new Promise(r => setTimeout(r, 400));
          }
        }

        this.logger.debug(`Seeded analogies for lesson "${lesson.title}" (${courseSlug})`);
      }

      this.logger.log(
        `Analogy seed complete — generated: ${generated}, skipped (already cached): ${skipped}, failed: ${failed}`,
      );
    })().catch(err => this.logger.error(`Analogy seed crashed: ${err.message}`));

    return {
      message: 'Analogy cache seeding started in background. Watch server logs for progress.',
      lessons: lessons.length,
    };
  }

  /** Auto-trigger pre-generation 15 s after startup so topic seeding finishes first */
  onApplicationBootstrap() {
    // Skip if no real AI worker is configured — localhost is not reachable on deployed infra.
    // On-demand generation (getLessonContent) handles individual lesson requests instead.
    if (!this.workerUrl || /localhost|127\.0\.0\.1/.test(this.workerUrl)) {
      this.logger.warn(
        `AI_WORKER_URL is "${this.workerUrl}" — skipping startup pre-generation. ` +
        'Set AI_WORKER_URL to enable background lesson generation.',
      );
      return;
    }
    setTimeout(() => {
      this.pregenerateAll().catch(err =>
        this.logger.error(`Startup pre-generation failed: ${err.message}`)
      );
    }, 15_000);
  }

  /** Generate all ungenerated lessons sequentially in the background */
  async pregenerateAll(): Promise<{ triggered: number }> {
    const ungenerated = await this.lessonRepo.find({ where: { isGenerated: false } });
    if (ungenerated.length === 0) return { triggered: 0 };
    this.logger.log(`Pre-generating ${ungenerated.length} lessons in background…`);

    // Sequential to avoid overwhelming the AI worker / Anthropic rate limits
    (async () => {
      let done = 0;
      for (const lesson of ungenerated) {
        try {
          await this.generateLesson(lesson.id);
          done++;
          if (done % 5 === 0) this.logger.log(`Pre-generation progress: ${done}/${ungenerated.length}`);
        } catch (err) {
          this.logger.error(`Pre-gen failed for ${lesson.id}: ${err.message}`);
        }
      }
      this.logger.log(`Pre-generation complete: ${done}/${ungenerated.length} lessons ready`);
    })().catch(console.error);

    return { triggered: ungenerated.length };
  }

  /** Return lesson content, generating it first if not yet produced */
  async getLessonContent(lessonId: string): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOne({ where: { id: lessonId }, relations: { topic: true } });
    if (!lesson) throw new NotFoundException('Lesson not found');
    if (!lesson.isGenerated || (!lesson.contentJson && !lesson.content)) {
      return this.generateLesson(lessonId);
    }
    return lesson;
  }

  /**
   * Return a domain-specific analogy for a concept.
   * Checks the DB cache first — generates via ai-worker only on a cache miss,
   * then persists the result so every subsequent call is instant.
   */
  async translateAnalogy(
    cricketAnalogy: string,
    domain: string,
    conceptName: string,
    courseSlug: string,
    conceptId: string,
  ): Promise<{ analogy: string; cached: boolean }> {
    // 1. DB cache hit — return immediately, no AI call needed
    const existing = await this.analogyCacheRepo.findOne({
      where: { courseSlug, conceptId, domain },
    });
    if (existing) {
      return { analogy: existing.analogy, cached: true };
    }

    // 2. Cache miss — ask the ai-worker to generate
    const topicName = courseSlug.replace(/-/g, ' ');
    const response = await firstValueFrom(
      this.httpService.post(
        `${this.workerUrl}/generate/translate-analogy`,
        { cricket_analogy: cricketAnalogy, domain, concept_name: conceptName, topic_name: topicName },
        { timeout: 30_000 },
      ),
    );
    const { analogy } = response.data as { analogy: string };

    // 3. Persist — use upsert to handle the rare race where two users request
    //    the same concept+domain simultaneously
    await this.analogyCacheRepo
      .createQueryBuilder()
      .insert()
      .into(AnalogyCacheEntry)
      .values({ courseSlug, conceptId, domain, analogy })
      .orIgnore()
      .execute();

    return { analogy, cached: false };
  }

  /** Send code to AI worker for review */
  async reviewCode(code: string, language: string): Promise<{ review: string; suggestions: string[]; score: number }> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.workerUrl}/review/code`, { code, language }),
      );
      return response.data;
    } catch (error) {
      this.logger.warn('AI worker unavailable for code review, using fallback');
      return {
        review: 'Code review service is temporarily unavailable. Please try again later.',
        suggestions: [],
        score: 0,
      };
    }
  }

  // ── Legacy methods kept for backwards compatibility ──────────────────────────

  async generateLessonContent(topicName: string, lessonTitle: string): Promise<string> {
    if (!this.apiKey) {
      this.logger.warn('ANTHROPIC_API_KEY not set, returning placeholder content');
      return `# ${lessonTitle}\n\nThis is placeholder content for the lesson on ${topicName}. Configure ANTHROPIC_API_KEY to enable AI-generated content.`;
    }

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          this.apiUrl,
          {
            model: 'claude-opus-4-5',
            max_tokens: 1024,
            messages: [
              {
                role: 'user',
                content: `Create educational content for a lesson titled "${lessonTitle}" from the topic "${topicName}".
                Format it as markdown with clear sections, code examples where relevant, and key takeaways.
                Keep it concise (400-600 words).`,
              },
            ],
          },
          {
            headers: {
              'x-api-key': this.apiKey,
              'anthropic-version': '2023-06-01',
              'content-type': 'application/json',
            },
          },
        ),
      );
      return response.data.content[0].text;
    } catch (error) {
      this.logger.error('Failed to generate lesson content', error);
      throw error;
    }
  }

  async chat(message: string, context?: string): Promise<string> {
    if (!this.apiKey) {
      return 'AI chat is not configured. Please set ANTHROPIC_API_KEY environment variable.';
    }

    const systemPrompt = context
      ? `You are a helpful AI tutor. Context: ${context}`
      : 'You are a helpful AI tutor helping users learn programming and technology topics.';

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          this.apiUrl,
          {
            model: 'claude-opus-4-5',
            max_tokens: 1024,
            system: systemPrompt,
            messages: [{ role: 'user', content: message }],
          },
          {
            headers: {
              'x-api-key': this.apiKey,
              'anthropic-version': '2023-06-01',
              'content-type': 'application/json',
            },
          },
        ),
      );
      return response.data.content[0].text;
    } catch (error) {
      this.logger.error('Failed to get AI response', error);
      throw error;
    }
  }

  async evaluateCode(
    code: string,
    language: string,
    task: string,
  ): Promise<{ feedback: string; score: number; passed: boolean }> {
    if (!this.apiKey) {
      return { feedback: 'Code evaluation not available without ANTHROPIC_API_KEY.', score: 0, passed: false };
    }

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          this.apiUrl,
          {
            model: 'claude-opus-4-5',
            max_tokens: 512,
            messages: [
              {
                role: 'user',
                content: `Evaluate this ${language} code for the task: "${task}"\n\nCode:\n\`\`\`${language}\n${code}\n\`\`\`\n\nRespond with JSON: { "feedback": "string", "score": 0-100, "passed": true/false }`,
              },
            ],
          },
          {
            headers: {
              'x-api-key': this.apiKey,
              'anthropic-version': '2023-06-01',
              'content-type': 'application/json',
            },
          },
        ),
      );
      const text = response.data.content[0].text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return { feedback: text, score: 50, passed: false };
    } catch (error) {
      this.logger.error('Failed to evaluate code', error);
      throw error;
    }
  }

  private getFallbackContentJson(title: string, type: string) {
    return {
      lessonId: '',
      title,
      type,
      topicName: '',
      sections: [
        { type: 'heading', content: title, level: 2, language: '', items: [], answer: -1, explanation: '' },
        { type: 'paragraph', content: 'This lesson content is being prepared. Please check back shortly.', language: '', level: 2, items: [], answer: -1, explanation: '' },
        { type: 'info_box', content: 'Content generation in progress. Refresh to check status.', language: '', level: 2, items: [], answer: -1, explanation: '' },
      ],
      estimatedMinutes: 15,
      xpReward: 50,
      generated: false,
    };
  }
}
