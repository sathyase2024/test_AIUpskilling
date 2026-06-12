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
          hobby: 'cricket',   // always embed cricket analogy sections for personalization
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

  private slugify(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  /**
   * Extract every teachable concept from a lesson's contentJson.
   *
   * Strategy: iterate level-3 headings (each is a distinct concept).
   * For each heading, look ahead for an explicit `analogy` section — if found,
   * its content is the cricket analogy text. If not (lesson was generated without
   * hobby), we return an empty string as cricketAnalogy and the seed job will
   * generate one via the AI.
   */
  private extractAnalogyContexts(
    contentJson: Record<string, any>,
  ): Array<{ conceptId: string; conceptName: string; cricketAnalogy: string }> {
    const sections: Array<{ type: string; content?: string; level?: number }> =
      contentJson?.sections ?? [];
    const seen = new Set<string>();
    const results: Array<{ conceptId: string; conceptName: string; cricketAnalogy: string }> = [];

    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      if (s.type !== 'heading' || (s.level ?? 2) !== 3 || !s.content?.trim()) continue;

      const conceptId = this.slugify(s.content);
      if (seen.has(conceptId)) continue;
      seen.add(conceptId);

      // Look ahead for an analogy section before the next heading
      let cricketAnalogy = '';
      for (let j = i + 1; j < sections.length; j++) {
        if (sections[j].type === 'heading') break;
        if (sections[j].type === 'analogy' && sections[j].content?.trim()) {
          cricketAnalogy = sections[j].content!;
          break;
        }
      }

      results.push({ conceptId, conceptName: s.content, cricketAnalogy });
    }

    return results;
  }

  /**
   * Call translateAnalogy with retry on transient connection errors
   * (EAI_AGAIN / ECONNREFUSED = ai-worker restarting).
   * Gives up after maxAttempts and rethrows the last error.
   */
  private async translateWithRetry(
    cricketAnalogy: string,
    domain: string,
    conceptName: string,
    courseSlug: string,
    conceptId: string,
    maxAttempts = 4,
  ): Promise<{ analogy: string; cached: boolean }> {
    const RETRIABLE = ['EAI_AGAIN', 'ECONNREFUSED', 'ECONNRESET', 'ETIMEDOUT'];
    let lastErr: any;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await this.translateAnalogy(cricketAnalogy, domain, conceptName, courseSlug, conceptId);
      } catch (err: any) {
        lastErr = err;
        const isRetriable = RETRIABLE.some(code => err?.message?.includes(code) || err?.code === code);
        if (!isRetriable || attempt === maxAttempts) throw err;
        const waitMs = attempt * 8_000;   // 8s, 16s, 24s — give worker time to restart
        this.logger.warn(`Seed retry ${attempt}/${maxAttempts - 1} for ${courseSlug}/${conceptId}/${domain} in ${waitMs / 1000}s — ${err.message}`);
        await new Promise(r => setTimeout(r, waitMs));
      }
    }
    throw lastErr;
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
      let lessonsDone = 0;

      for (const lesson of lessons) {
        const courseSlug = (lesson as any).topic?.slug;
        if (!courseSlug || !lesson.contentJson) { lessonsDone++; continue; }

        const contexts = this.extractAnalogyContexts(lesson.contentJson as Record<string, any>);
        if (contexts.length === 0) { lessonsDone++; continue; }

        this.logger.log(`Seed [${lessonsDone + 1}/${lessons.length}] "${lesson.title}" (${courseSlug}) — ${contexts.length} concepts`);

        for (const { conceptId, conceptName, cricketAnalogy: rawCricket } of contexts) {
          // ── Step 1: ensure we have a cricket analogy (reference for other domains) ──
          let effectiveCricket = rawCricket;

          if (rawCricket) {
            // Lesson was generated with cricket hobby — store directly, zero AI calls
            await this.analogyCacheRepo
              .createQueryBuilder().insert().into(AnalogyCacheEntry)
              .values({ courseSlug, conceptId, domain: 'cricket', analogy: rawCricket })
              .orIgnore().execute();
          } else {
            // Lesson has no analogy sections — generate cricket from concept name
            const cached = await this.analogyCacheRepo.findOne({
              where: { courseSlug, conceptId, domain: 'cricket' },
            });
            if (cached) {
              effectiveCricket = cached.analogy;
            } else {
              try {
                const result = await this.translateWithRetry('', 'cricket', conceptName, courseSlug, conceptId);
                effectiveCricket = result.analogy;
                generated++;
              } catch (err: any) {
                failed++;
                this.logger.warn(`Seed cricket failed: ${courseSlug}/${conceptId} — ${err.message}`);
                continue;   // skip other domains if we couldn't get cricket either
              }
              await new Promise(r => setTimeout(r, 1_500));
            }
          }

          // ── Step 2: generate the other 11 domains in parallel ──
          // Check cache for all domains first, then fire missing ones concurrently.
          const existingEntries = await this.analogyCacheRepo
            .createQueryBuilder('ac')
            .where('ac.courseSlug = :courseSlug AND ac.conceptId = :conceptId AND ac.domain IN (:...domains)', {
              courseSlug, conceptId, domains: NON_CRICKET_DOMAINS,
            })
            .getMany();
          const cachedDomains = new Set(existingEntries.map(e => e.domain));
          skipped += cachedDomains.size;

          const missingDomains = NON_CRICKET_DOMAINS.filter(d => !cachedDomains.has(d));
          if (missingDomains.length > 0) {
            this.logger.log(`Seed   concept "${conceptName}" — generating ${missingDomains.length} domains (${missingDomains.join(', ')})`);
            // Process in batches of 3 — parallel within each batch, sequential across
            // batches. Prevents the ai-worker from receiving 11 simultaneous Claude
            // calls and timing out on the ones that queue behind the first few.
            const BATCH = 3;
            for (let b = 0; b < missingDomains.length; b += BATCH) {
              const chunk = missingDomains.slice(b, b + BATCH);
              const chunkResults = await Promise.allSettled(
                chunk.map(domain =>
                  this.translateWithRetry(effectiveCricket, domain, conceptName, courseSlug, conceptId),
                ),
              );
              for (let i = 0; i < chunkResults.length; i++) {
                const r = chunkResults[i];
                if (r.status === 'fulfilled') {
                  generated++;
                } else {
                  failed++;
                  this.logger.warn(`Seed failed: ${courseSlug}/${conceptId}/${chunk[i]} — ${(r.reason as any)?.message}`);
                }
              }
            }
          } else {
            this.logger.log(`Seed   concept "${conceptName}" — all ${NON_CRICKET_DOMAINS.length} domains already cached`);
          }
        }

        lessonsDone++;
      }
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
        { timeout: 60_000 },
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
