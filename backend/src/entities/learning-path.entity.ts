import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Topic } from './topic.entity';

@Entity('learning_paths')
export class LearningPath {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: ['beginner', 'intermediate', 'advanced'],
  })
  difficulty: 'beginner' | 'intermediate' | 'advanced';

  @Column({ type: 'int' })
  durationMonths: number;

  @Column('simple-array')
  skills: string[];

  @Column('simple-array')
  techStack: string[];

  @Column({ default: 0 })
  enrolledCount: number;

  @Column({ type: 'float' })
  rating: number;

  @Column()
  color: string;

  @Column('simple-array')
  highlights: string[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Topic, (topic) => topic.learningPaths)
  @JoinTable({
    name: 'path_topics',
    joinColumn: { name: 'pathId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'topicId', referencedColumnName: 'id' },
  })
  topics: Topic[];
}
