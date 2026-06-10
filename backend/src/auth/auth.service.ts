import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { EmailOtp } from '../entities/email-otp.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const OTP_MAX_ATTEMPTS = 5;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
    @InjectRepository(EmailOtp) private otpRepo: Repository<EmailOtp>,
  ) {}

  async register(dto: RegisterDto) {
    if (await this.usersService.findByEmail(dto.email)) {
      throw new ConflictException('Email already in use');
    }
    if (await this.usersService.findByUsername(dto.username)) {
      throw new ConflictException('Username already taken');
    }
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({ ...dto, password: hash });
    return this.generateTokens(user);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(dto.email);
    if (!user || !user.password) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    return this.generateTokens(user);
  }

  // ── Email OTP (passwordless) ────────────────────────────────────────────────

  /** Generate a 6-digit code, store it hashed, and email it. Always succeeds
   *  generically to avoid leaking whether an email is registered. */
  async requestOtp(email: string) {
    const user = await this.usersService.findByEmail(email);
    // Only send to known users, but respond identically either way.
    if (user) {
      const code = String(Math.floor(100000 + Math.random() * 900000));
      const codeHash = await bcrypt.hash(code, 10);
      // Invalidate previous unconsumed codes for this email.
      await this.otpRepo.delete({ email });
      await this.otpRepo.save(
        this.otpRepo.create({
          email,
          codeHash,
          expiresAt: new Date(Date.now() + OTP_TTL_MS),
        }),
      );
      await this.mailService.sendOtp(email, code);
    }
    return { message: 'If that email is registered, a sign-in code has been sent.' };
  }

  async verifyOtp(email: string, code: string) {
    const otp = await this.otpRepo.findOne({
      where: { email, consumed: false },
      order: { createdAt: 'DESC' },
    });
    if (!otp) throw new UnauthorizedException('Invalid or expired code');
    if (otp.expiresAt < new Date()) {
      await this.otpRepo.delete({ id: otp.id });
      throw new UnauthorizedException('Code expired — request a new one');
    }
    if (otp.attempts >= OTP_MAX_ATTEMPTS) {
      await this.otpRepo.delete({ id: otp.id });
      throw new UnauthorizedException('Too many attempts — request a new code');
    }

    const valid = await bcrypt.compare(code, otp.codeHash);
    if (!valid) {
      await this.otpRepo.increment({ id: otp.id }, 'attempts', 1);
      throw new UnauthorizedException('Invalid or expired code');
    }

    otp.consumed = true;
    await this.otpRepo.save(otp);

    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid or expired code');
    return this.generateTokens(user);
  }

  generateTokens(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        xp: user.xp,
        level: user.level,
        streak: user.streak,
        hobbies: user.hobbies,
      },
    };
  }
}
