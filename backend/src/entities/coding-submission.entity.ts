import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Lesson } from './lesson.entity';

@Entity('coding_submissions')
export class CodingSubmission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  lessonId: string;

  @Column({ type: 'text' })
  code: string;

  @Column({ default: 'javascript' })
  language: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'passed', 'failed', 'error'],
    default: 'pending',
  })
  status: 'pending' | 'passed' | 'failed' | 'error';

  @Column({ type: 'text', nullable: true })
  feedback: string;

  @Column({ type: 'jsonb', nullable: true })
  testResults: Record<string, any>;

  @Column({ type: 'int', default: 0 })
  score: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lessonId' })
  lesson: Lesson;
}
