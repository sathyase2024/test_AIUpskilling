import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Lesson } from './lesson.entity';
import { LearningPath } from './learning-path.entity';

@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  category: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: ['beginner', 'intermediate', 'advanced'],
  })
  difficulty: 'beginner' | 'intermediate' | 'advanced';

  @Column({ type: 'float' })
  durationHours: number;

  @Column({ type: 'float', default: 4.5 })
  rating: number;

  @Column({ default: 0 })
  enrolledCount: number;

  @Column('simple-array')
  tags: string[];

  @Column()
  imageGradient: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Lesson, (lesson) => lesson.topic)
  lessons: Lesson[];

  @ManyToMany(() => LearningPath, (path) => path.topics)
  learningPaths: LearningPath[];
}
