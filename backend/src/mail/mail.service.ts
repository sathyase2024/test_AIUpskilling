import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

/**
 * Sends transactional email via Gmail SMTP (app password).
 * Requires GMAIL_USER and GMAIL_APP_PASSWORD in the environment. When those are
 * absent (e.g. local dev), it falls back to logging the message so the OTP flow
 * still works end-to-end without real delivery.
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter | null = null;
  private readonly from: string;

  constructor(private readonly cfg: ConfigService) {
    const user = this.cfg.get<string>('GMAIL_USER');
    const pass = this.cfg.get<string>('GMAIL_APP_PASSWORD');
    this.from = `SkillForge <${user ?? 'no-reply@skillveris.com'}>`;
    if (user && pass) {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass },
      });
    } else {
      this.logger.warn(
        'GMAIL_USER / GMAIL_APP_PASSWORD not set — emails will be logged, not sent.',
      );
    }
  }

  async sendOtp(email: string, code: string): Promise<void> {
    const subject = 'Your SkillForge sign-in code';
    const text = `Your SkillForge verification code is ${code}. It expires in 10 minutes.`;
    const html = `
      <div style="font-family:system-ui,sans-serif;max-width:420px;margin:0 auto">
        <h2 style="color:#7c3aed">SkillForge</h2>
        <p>Use this code to sign in. It expires in 10 minutes.</p>
        <p style="font-size:32px;font-weight:700;letter-spacing:8px;color:#111">${code}</p>
        <p style="color:#888;font-size:13px">If you didn't request this, you can ignore this email.</p>
      </div>`;

    if (!this.transporter) {
      this.logger.log(`[DEV] OTP for ${email}: ${code}`);
      return;
    }
    try {
      await this.transporter.sendMail({ from: this.from, to: email, subject, text, html });
    } catch (err: any) {
      this.logger.error(`Failed to send OTP to ${email}: ${err.message}`);
      throw err;
    }
  }
}
