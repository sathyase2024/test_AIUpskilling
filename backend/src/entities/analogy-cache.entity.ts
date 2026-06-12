import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('analogy_cache')
@Index(['courseSlug', 'conceptId', 'domain'], { unique: true })
export class AnalogyCacheEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  courseSlug: string;

  @Column()
  conceptId: string;

  @Column()
  domain: string;

  @Column({ type: 'text' })
  analogy: string;

  @CreateDateColumn()
  createdAt: Date;
}
