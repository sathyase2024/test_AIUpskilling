import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { CourseAssessmentResult } from '../entities/course-assessment-result.entity';
import { Lesson } from '../entities/lesson.entity';
import { Topic } from '../entities/topic.entity';
import { ProgressService } from '../progress/progress.service';
import { SubmitAssessmentDto } from './dto/submit-assessment.dto';
import {
  Assessment,
  AssessmentQuestion,
  GradeResult,
  PublicAssessment,
} from './assessment.types';

/** Course slugs are kebab-case; anything else is rejected before touching the filesystem. */
const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

@Injectable()
export class AssessmentService {
  private generatedDir: string | null | undefined; // undefined = not resolved yet
  private readonly cache = new Map<string, Assessment>();

  constructor(
    @InjectRepository(CourseAssessmentResult)
    private resultRepo: Repository<CourseAssessmentResult>,
    @InjectRepository(Topic)
    private topicRepo: Repository<Topic>,
    @InjectRepository(Lesson)
    private lessonRepo: Repository<Lesson>,
    private progressService: ProgressService,
  ) {}

  private resolveGeneratedDir(): string | null {
    if (this.generatedDir !== undefined) return this.generatedDir;
    const candidates = [
      process.env.GENERATED_LESSONS_DIR,
      '/app/generated_lessons',
      path.resolve(process.cwd(), 'generated_lessons'),
      path.resolve(process.cwd(), '..', 'generated_lessons'),
    ].filter(Boolean) as string[];

    this.generatedDir = null;
    for (const dir of candidates) {
      try {
        if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
          this.generatedDir = dir;
          break;
        }
      } catch {
        /* ignore */
      }
    }
    return this.generatedDir;
  }

  /**
   * Load and cache a course's assessment. Assessment files are baked into the
   * image and immutable at runtime, so a plain in-memory cache avoids a
   * blocking disk read + JSON.parse on every request.
   */
  private loadAssessment(courseSlug: string): Assessment {
    if (!SLUG_RE.test(courseSlug)) {
      throw new BadRequestException(`Invalid course slug: ${courseSlug}`);
    }
    const cached = this.cache.get(courseSlug);
    if (cached) return cached;

    const baseDir = this.resolveGeneratedDir();
    if (!baseDir) throw new NotFoundException('No assessment data available');

    const filePath = path.join(baseDir, courseSlug, 'assessment.json');
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(`No assessment found for course: ${courseSlug}`);
    }

    const assessment = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Assessment;
    this.cache.set(courseSlug, assessment);
    return assessment;
  }

  /**
   * Client-facing view of an assessment: question text and options only.
   * Correct answers and explanations stay server-side until the attempt is
   * graded, so they never appear in the network response of the GET.
   */
  getAssessment(courseSlug: string): PublicAssessment {
    const a = this.loadAssessment(courseSlug);
    const pub = ({ answer: _a, explanation: _e, ...q }: AssessmentQuestion) => q;
    return {
      courseSlug: a.courseSlug,
      passThreshold: a.passThreshold,
      modules: a.modules.map((m) => ({ ...m, questions: m.questions.map(pub) })),
      finalExam: {
        passThreshold: a.finalExam?.passThreshold,
        questions: (a.finalExam?.questions ?? []).map(pub),
      },
    };
  }

  private grade(
    questions: AssessmentQuestion[],
    userAnswers: number[],
    threshold: number,
  ): GradeResult {
    const total = questions.length;
    if (!Array.isArray(userAnswers) || userAnswers.length !== total) {
      throw new BadRequestException(
        `Expected ${total} answers, received ${userAnswers?.length ?? 0}`,
      );
    }

    let correct = 0;
    const wrongLessonOrders: number[] = [];
    const review = questions.map((q, i) => {
      const ok = userAnswers[i] === q.answer;
      if (ok) correct++;
      else wrongLessonOrders.push(q.lessonOrder);
      return { correctAnswer: q.answer, explanation: q.explanation, correct: ok };
    });

    const score = Math.round((correct / total) * 100);
    return { score, passed: score >= threshold, correct, total, wrongLessonOrders, review };
  }

  /** Persist a graded attempt, keeping the user's best score. */
  private async saveBestResult(
    userId: string,
    courseSlug: string,
    type: 'module' | 'final',
    moduleIndex: number | null,
    result: GradeResult,
  ): Promise<void> {
    const existing = await this.resultRepo.findOne({
      where: {
        userId,
        courseSlug,
        type,
        moduleIndex: moduleIndex === null ? IsNull() : moduleIndex,
      },
    });
    if (existing) {
      if (result.score >= existing.score) {
        existing.score = result.score;
        existing.passed = existing.passed || result.passed;
        existing.wrongLessonOrders = result.wrongLessonOrders;
        await this.resultRepo.save(existing);
      }
    } else {
      await this.resultRepo.save(
        this.resultRepo.create({
          userId,
          courseSlug,
          type,
          moduleIndex,
          score: result.score,
          passed: result.passed,
          wrongLessonOrders: result.wrongLessonOrders,
        }),
      );
    }
  }

  /** Grade an attempt without persisting anything (signed-out users). */
  gradeAttempt(
    courseSlug: string,
    type: 'module' | 'final',
    moduleIndex: number | undefined,
    answers: number[],
  ): GradeResult {
    const assessment = this.loadAssessment(courseSlug);
    if (type === 'module') {
      const mod = assessment.modules.find((m) => m.index === moduleIndex);
      if (!mod) throw new NotFoundException(`Module ${moduleIndex} not found in assessment`);
      return this.grade(mod.questions, answers, assessment.passThreshold ?? 80);
    }
    const finalExam = assessment.finalExam;
    if (!finalExam?.questions?.length) {
      throw new NotFoundException('No final exam in this course assessment');
    }
    const threshold = finalExam.passThreshold ?? assessment.passThreshold ?? 80;
    return this.grade(finalExam.questions, answers, threshold);
  }

  async submitModuleAttempt(
    userId: string,
    courseSlug: string,
    moduleIndex: number,
    dto: SubmitAssessmentDto,
  ): Promise<GradeResult> {
    const assessment = this.loadAssessment(courseSlug);
    const mod = assessment.modules.find((m) => m.index === moduleIndex);
    if (!mod) throw new NotFoundException(`Module ${moduleIndex} not found in assessment`);

    const result = this.grade(mod.questions, dto.answers, assessment.passThreshold ?? 80);
    await this.saveBestResult(userId, courseSlug, 'module', moduleIndex, result);

    if (result.passed) {
      await this.markLessonsComplete(userId, courseSlug, mod.lessonOrders);
    }
    return result;
  }

  async submitFinalAttempt(
    userId: string,
    courseSlug: string,
    dto: SubmitAssessmentDto,
  ): Promise<GradeResult> {
    const assessment = this.loadAssessment(courseSlug);
    const finalExam = assessment.finalExam;
    if (!finalExam?.questions?.length) {
      throw new NotFoundException('No final exam in this course assessment');
    }

    const threshold = finalExam.passThreshold ?? assessment.passThreshold ?? 80;
    const result = this.grade(finalExam.questions, dto.answers, threshold);
    await this.saveBestResult(userId, courseSlug, 'final', null, result);

    if (result.passed) {
      await this.markAllLessonsComplete(userId, courseSlug);
    }
    return result;
  }

  async getResults(userId: string, courseSlug: string) {
    const rows = await this.resultRepo.find({ where: { userId, courseSlug } });

    const moduleResults: Record<number, unknown> = {};
    let finalResult: unknown = null;
    const allWrong = new Set<number>();

    for (const r of rows) {
      const shaped = {
        id: r.id,
        type: r.type,
        moduleIndex: r.moduleIndex,
        score: r.score,
        passed: r.passed,
        wrongLessonOrders: r.wrongLessonOrders ?? [],
        createdAt: r.createdAt,
      };
      if (r.type === 'module' && r.moduleIndex !== null) {
        moduleResults[r.moduleIndex] = shaped;
      } else if (r.type === 'final') {
        finalResult = shaped;
      }
      for (const ord of r.wrongLessonOrders ?? []) allWrong.add(ord);
    }

    return { moduleResults, finalResult, wrongLessonOrders: Array.from(allWrong) };
  }

  private async markLessonsComplete(userId: string, courseSlug: string, lessonOrders: number[]) {
    // An empty `where` array would match EVERY lesson in the table — guard it.
    if (!lessonOrders?.length) return;
    const topic = await this.topicRepo.findOne({ where: { slug: courseSlug } });
    if (!topic) return;

    const lessons = await this.lessonRepo.find({
      where: lessonOrders.map((ord) => ({ topicId: topic.id, orderIndex: ord })),
    });
    await Promise.all(lessons.map((l) => this.progressService.markLessonComplete(userId, l.id)));
  }

  private async markAllLessonsComplete(userId: string, courseSlug: string) {
    const topic = await this.topicRepo.findOne({ where: { slug: courseSlug } });
    if (!topic) return;

    const lessons = await this.lessonRepo.find({ where: { topicId: topic.id } });
    await Promise.all(lessons.map((l) => this.progressService.markLessonComplete(userId, l.id)));
  }
}
