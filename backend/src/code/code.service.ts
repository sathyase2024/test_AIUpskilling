import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

// Wandbox compiler IDs for each language
// No API key required — free community service (wandbox.org)
const LANG_MAP: Record<string, { compiler: string; filename: string }> = {
  python:     { compiler: 'cpython-3.12.1',     filename: 'main.py'  },
  javascript: { compiler: 'nodejs-18.15.0',     filename: 'main.js'  },
  typescript: { compiler: 'typescript-5.1.6',   filename: 'main.ts'  },
  java:       { compiler: 'openjdk-head',        filename: 'Main.java' },
  go:         { compiler: 'go-1.20.7',          filename: 'main.go'  },
  cpp:        { compiler: 'gcc-13.1.0',         filename: 'main.cpp' },
};

interface WandboxResponse {
  status: string;           // exit code as string
  program_output?: string;
  program_error?: string;
  compiler_error?: string;
  compiler_message?: string;
}

@Injectable()
export class CodeService {
  private readonly logger = new Logger(CodeService.name);

  constructor(private readonly httpService: HttpService) {}

  async execute(language: string, code: string) {
    const lang = LANG_MAP[language];
    if (!lang) {
      throw new HttpException(`Unsupported language: ${language}`, HttpStatus.BAD_REQUEST);
    }

    try {
      const { data } = await firstValueFrom(
        this.httpService.post<WandboxResponse>(
          'https://wandbox.org/api/compile.json',
          {
            compiler: lang.compiler,
            code,
            'compiler-option-raw': language === 'cpp' ? '-std=c++17' : '',
          },
          { timeout: 20_000 },
        ),
      );

      const exitCode = parseInt(data.status ?? '0', 10);
      const stderr = [data.compiler_error, data.compiler_message, data.program_error]
        .filter(Boolean)
        .join('\n')
        .trim();

      return {
        stdout:   data.program_output ?? '',
        stderr,
        exitCode: isNaN(exitCode) ? 0 : exitCode,
      };
    } catch (err: any) {
      this.logger.error(`Wandbox execution failed: ${err.message}`);
      if (err.response?.status === 400) {
        throw new HttpException('Invalid code or language submitted', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Code execution service is temporarily unavailable. Please try again in a moment.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
