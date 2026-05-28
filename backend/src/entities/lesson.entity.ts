import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Topic } from './topic.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  topicId: string;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column({ type: 'int' })
  orderIndex: number;

  @Column({
    type: 'enum',
    enum: ['video', 'reading', 'exercise', 'quiz', 'project'],
  })
  type: 'video' | 'reading' | 'exercise' | 'quiz' | 'project';

  @Column({ type: 'int' })
  durationMinutes: number;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ type: 'int', default: 50 })
  xpReward: number;

  @Column({ default: false })
  isGenerated: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Topic, (topic) => topic.lessons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'topicId' })
  topic: Topic;
}
