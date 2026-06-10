import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

/**
 * One-time passcode for passwordless email sign-in. The code itself is stored
 * hashed (never plaintext). Rows are short-lived and superseded on each request.
 */
@Entity('email_otps')
@Index(['email'])
export class EmailOtp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  /** bcrypt hash of the 6-digit code. */
  @Column()
  codeHash: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  /** Failed verification attempts — used to lock out brute force. */
  @Column({ default: 0 })
  attempts: number;

  @Column({ default: false })
  consumed: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
