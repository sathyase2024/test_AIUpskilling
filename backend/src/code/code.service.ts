import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface PistonResponse {
  run: { stdout: string; stderr: string; code: number; signal: string | null };
  compile?: { stdout: string; stderr: string; code: number };
}

// Map frontend language ids → Piston language + version
const LANG_MAP: Record<string, { language: string; version: string }> = {
  python:     { language: 'python',     version: '*' },
  javascript: { language: 'javascript', version: '*' },
  typescript: { language: 'typescript', version: '*' },
  java:       { language: 'java',       version: '*' },
  go:         { language: 'go',         version: '*' },
  cpp:        { language: 'c++',        version: '*' },
};

@Injectable()
export class CodeService {
  private readonly logger = new Logger(CodeService.name);
  private readonly pistonUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly cfg: ConfigService,
  ) {
    // PISTON_URL: self-hosted instance URL (no trailing slash)
    // Defaults to the docker-compose service name when running locally
    this.pistonUrl = cfg.get('PISTON_URL', 'http://piston:2000');
  }

  async execute(language: string, code: string) {
    const lang = LANG_MAP[language];
    if (!lang) {
      throw new HttpException(`Unsupported language: ${language}`, HttpStatus.BAD_REQUEST);
    }

    try {
      const { data } = await firstValueFrom(
        this.httpService.post<PistonResponse>(
          `${this.pistonUrl}/api/v2/execute`,
          {
            language: lang.language,
            version: lang.version,
            files: [{ content: code }],
          },
          { timeout: 15_000 },
        ),
      );

      return {
        stdout:   data.run.stdout   ?? '',
        stderr:   (data.compile?.stderr ?? '') + (data.run.stderr ?? ''),
        exitCode: data.run.code     ?? 0,
      };
    } catch (err: any) {
      this.logger.error(`Piston execution failed: ${err.message}`);
      const status = err.response?.status;
      if (status === 400) {
        throw new HttpException('Invalid code or language submitted', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Code execution service is temporarily unavailable. Please try again.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
