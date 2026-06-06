import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../entities/lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>,
  ) {}

  /** List lessons, optionally filtered by topic, ordered by position. */
  async findAll(topicId?: string): Promise<Lesson[]> {
    return this.lessonRepo.find({
      where: topicId ? { topicId } : {},
      order: { orderIndex: 'ASC' },
    });
  }

  /** All lessons for a given topic, ordered. */
  async findByTopic(topicId: string): Promise<Lesson[]> {
    return this.lessonRepo.find({
      where: { topicId },
      order: { orderIndex: 'ASC' },
    });
  }

  /** A single lesson, including its generated contentJson. */
  async findOne(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOne({
      where: { id },
      relations: { topic: true },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    return lesson;
  }
}
