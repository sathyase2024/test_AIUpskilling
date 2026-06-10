import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('course_assessment_results')
@Index(['userId', 'courseSlug'])
export class CourseAssessmentResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  courseSlug: string;

  @Column()
  type: string; // 'module' | 'final'

  @Column({ type: 'int', nullable: true })
  moduleIndex: number | null;

  @Column({ type: 'int' })
  score: number;

  @Column({ default: false })
  passed: boolean;

  @Column({ type: 'jsonb', nullable: false })
  wrongLessonOrders: number[];

  @CreateDateColumn()
  createdAt: Date;
}
