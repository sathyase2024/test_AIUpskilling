import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { Lesson } from '../entities/lesson.entity';
import { Topic } from '../entities/topic.entity';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly apiKey: string;
  private readonly apiUrl = 'https://api.anthropic.com/v1/messages';
  private readonly workerUrl: string;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>,
    @InjectRepository(Topic) private topicRepo: Repository<Topic>,
  ) {
    this.apiKey = this.configService.get<string>('ANTHROPIC_API_KEY', '');
    this.workerUrl = this.configService.get<string>('AI_WORKER_URL', 'http://localhost:8000');
  }

  /** Generate lesson content via AI worker, persist to DB, return updated lesson */
  async generateLesson(lessonId: string): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOne({ where: { id: lessonId }, relations: ['topic'] });
    if (!lesson) throw new NotFoundException('Lesson not found');

    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.workerUrl}/generate/lesson`, {
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          topicName: lesson.topic?.name ?? '',
          lessonType: lesson.type,
        }),
      );
      const content: string = response.data?.content ?? '';
      lesson.content = content;
      lesson.isGenerated = true;
      return this.lessonRepo.save(lesson);
    } catch (error) {
      this.logger.warn(`AI worker unavailable for lesson ${lessonId}, using fallback`);
      lesson.content = this.fallbackContent(lesson.title);
      lesson.isGenerated = false;
      return this.lessonRepo.save(lesson);
    }
  }

  /** Return lesson content, generating it first if not yet produced */
  async getLessonContent(lessonId: string): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOne({ where: { id: lessonId }, relations: ['topic'] });
    if (!lesson) throw new NotFoundException('Lesson not found');
    if (!lesson.isGenerated || !lesson.content) {
      return this.generateLesson(lessonId);
    }
    return lesson;
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

  private fallbackContent(title: string): string {
    return `# ${title}\n\nContent generation is temporarily unavailable. Please check back later.`;
  }
}
