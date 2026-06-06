import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProgress } from '../entities/user-progress.entity';
import { Lesson } from '../entities/lesson.entity';
import { User } from '../entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(UserProgress) private progressRepo: Repository<UserProgress>,
    @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private usersService: UsersService,
  ) {}

  async markLessonComplete(userId: string, lessonId: string) {
    const lesson = await this.lessonRepo.findOne({ where: { id: lessonId } });
    if (!lesson) return { error: 'Lesson not found' };
    let progress = await this.progressRepo.findOne({ where: { userId, lessonId } });
    if (progress?.completed) return { alreadyCompleted: true, xpEarned: 0 };
    if (!progress) {
      progress = this.progressRepo.create({ userId, lessonId, topicId: lesson.topicId });
    }
    progress.completed = true;
    progress.completionPercent = 100;
    progress.xpEarned = lesson.xpReward;
    progress.completedAt = new Date();
    await this.progressRepo.save(progress);
    await this.usersService.addXp(userId, lesson.xpReward);
    return { success: true, xpEarned: lesson.xpReward, lessonId };
  }

  async getTopicProgress(userId: string, topicId: string) {
    const total = await this.lessonRepo.count({ where: { topicId } });
    const done = await this.progressRepo.count({ where: { userId, topicId, completed: true } });
    return { topicId, completed: done, total, percent: total ? Math.round((done / total) * 100) : 0 };
  }

  async getOverview(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    const completedLessons = await this.progressRepo.count({ where: { userId, completed: true } });
    const totalXp = user?.xp ?? 0;
    const topicIds = await this.progressRepo.createQueryBuilder('p').select('DISTINCT p.topicId').where('p.userId = :userId', { userId }).getRawMany();
    return { completedLessons, totalXp, topicsStarted: topicIds.length, level: user?.level ?? 1, streak: user?.streak ?? 0 };
  }

  async getHistory(userId: string) {
    const since = new Date();
    since.setDate(since.getDate() - 29);
    since.setHours(0, 0, 0, 0);

    // Single query: active dates in the last 30 days
    const rows: { date: string }[] = await this.progressRepo
      .createQueryBuilder('p')
      .select("DATE(p.completedAt)", 'date')
      .where('p.userId = :userId AND p.completed = true AND p.completedAt >= :since', { userId, since })
      .groupBy("DATE(p.completedAt)")
      .getRawMany();

    const activeDates = new Set(rows.map((r) => r.date));

    const days: { date: string; active: boolean }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      days.push({ date: dateStr, active: activeDates.has(dateStr) });
    }
    return days;
  }

  async getSkillProgress(userId: string) {
    const categories = ['programming', 'frontend', 'backend', 'devops', 'ai-ml', 'databases'];

    // Single query: total lessons per category
    const totals: { category: string; total: string }[] = await this.lessonRepo
      .createQueryBuilder('l')
      .innerJoin('l.topic', 't')
      .select('t.category', 'category')
      .addSelect('COUNT(l.id)', 'total')
      .where('t.category IN (:...categories)', { categories })
      .groupBy('t.category')
      .getRawMany();

    // Single query: completed lessons per category for this user
    const dones: { category: string; done: string }[] = await this.progressRepo
      .createQueryBuilder('p')
      .innerJoin('p.lesson', 'l')
      .innerJoin('l.topic', 't')
      .select('t.category', 'category')
      .addSelect('COUNT(p.id)', 'done')
      .where('p.userId = :userId AND t.category IN (:...categories) AND p.completed = true', { userId, categories })
      .groupBy('t.category')
      .getRawMany();

    const totalMap = Object.fromEntries(totals.map((r) => [r.category, Number(r.total)]));
    const doneMap = Object.fromEntries(dones.map((r) => [r.category, Number(r.done)]));

    return Object.fromEntries(
      categories.map((cat) => {
        const total = totalMap[cat] ?? 0;
        const done = doneMap[cat] ?? 0;
        return [cat, total ? Math.round((done / total) * 100) : 0];
      }),
    );
  }
}
