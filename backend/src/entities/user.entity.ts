import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  // Nullable so existing user rows (pre-username) survive schema sync; new
  // signups always supply one (enforced in RegisterDto). Postgres allows
  // multiple NULLs under a unique constraint.
  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ select: false, nullable: true })
  password: string;

  @Column()
  name: string;

  @Column('simple-array', { nullable: true })
  hobbies: string[];

  @Column({ nullable: true })
  currentPathId: string;

  @Column({ default: 0 })
  xp: number;

  @Column({ default: 1 })
  level: number;

  @Column({ default: 0 })
  streak: number;

  @Column({ type: 'timestamp', nullable: true })
  lastActiveAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
