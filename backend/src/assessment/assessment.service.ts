import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { CourseAssessmentResult } from '../entities/course-assessment-result.entity';
import { Lesson } from '../entities/lesson.entity';
import { Topic } from '../entities/topic.entity';
import { ProgressService } from '../progress/progress.service';
import { SubmitAssessmentDto } from './dto/submit-assessment.dto';

@Injectable()
export class AssessmentService {
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
    const candidates = [
      process.env.GENERATED_LESSONS_DIR,
      '/app/generated_lessons',
      path.resolve(process.cwd(), 'generated_lessons'),
      path.resolve(process.cwd(), '..', 'generated_lessons'),
    ].filter(Boolean) as string[];

    for (const dir of candidates) {
      try {
        if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) return dir;
      } catch { /* ignore */ }
    }
    return null;
  }

  getAssessment(courseSlug: string): any {
    const baseDir = this.resolveGeneratedDir();
    if (!baseDir) throw new NotFoundException('No assessment data available');

    const filePath = path.join(baseDir, courseSlug, 'assessment.json');
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(`No assessment found for course: ${courseSlug}`);
    }

    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  private grade(
    questions: { answer: number; lessonOrder: number }[],
    userAnswers: number[],
    threshold: number,
  ): { score: number; passed: boolean; correct: number; total: number; wrongLessonOrders: number[] } {
    const total = questions.length;
    let correct = 0;
    const wrongLessonOrders: number[] = [];

    for (let i = 0; i < total; i++) {
      if (userAnswers[i] === questions[i].answer) {
        correct++;
      } else {
        wrongLessonOrders.push(questions[i].lessonOrder);
      }
    }

    const score = Math.round((correct / total) * 100);
    return { score, passed: score >= threshold, correct, total, wrongLessonOrders };
  }

  async submitModuleAttempt(
    userId: string,
    courseSlug: string,
    moduleIndex: number,
    dto: SubmitAssessmentDto,
  ) {
    const assessment = this.getAssessment(courseSlug);
    const mod = (assessment.modules as any[]).find((m) => m.index === moduleIndex);
    if (!mod) throw new NotFoundException(`Module ${moduleIndex} not found in assessment`);

    const result = this.grade(mod.questions, dto.answers, assessment.passThreshold ?? 80);

    const existing = await this.resultRepo.findOne({
      where: { userId, courseSlug, type: 'module', moduleIndex },
    });
    if (existing) {
      existing.score = result.score;
      existing.passed = result.passed;
      existing.wrongLessonOrders = result.wrongLessonOrders;
      await this.resultRepo.save(existing);
    } else {
      await this.resultRepo.save(
        this.resultRepo.create({
          userId,
          courseSlug,
          type: 'module',
          moduleIndex,
          score: result.score,
          passed: result.passed,
          wrongLessonOrders: result.wrongLessonOrders,
        }),
      );
    }

    if (result.passed) {
      await this.markLessonsComplete(userId, courseSlug, mod.lessonOrders);
    }

    return result;
  }

  async submitFinalAttempt(
    userId: string,
    courseSlug: string,
    dto: SubmitAssessmentDto,
  ) {
    const assessment = this.getAssessment(courseSlug);
    const finalExam = assessment.finalExam;
    if (!finalExam) throw new NotFoundException('No final exam in this course assessment');

    const threshold = finalExam.passThreshold ?? assessment.passThreshold ?? 80;
    const result = this.grade(finalExam.questions, dto.answers, threshold);

    const existing = await this.resultRepo.findOne({
      where: { userId, courseSlug, type: 'final', moduleIndex: IsNull() },
    });
    if (existing) {
      if (result.score >= existing.score) {
        existing.score = result.score;
        existing.passed = result.passed;
        existing.wrongLessonOrders = result.wrongLessonOrders;
        await this.resultRepo.save(existing);
      }
    } else {
      await this.resultRepo.save(
        this.resultRepo.create({
          userId,
          courseSlug,
          type: 'final',
          moduleIndex: null,
          score: result.score,
          passed: result.passed,
          wrongLessonOrders: result.wrongLessonOrders,
        }),
      );
    }

    if (result.passed) {
      await this.markAllLessonsComplete(userId, courseSlug);
    }

    return result;
  }

  async getResults(userId: string, courseSlug: string) {
    const rows = await this.resultRepo.find({ where: { userId, courseSlug } });

    const moduleResults: Record<number, any> = {};
    let finalResult: any = null;
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
