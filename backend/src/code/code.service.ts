import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { exec } from 'child_process';
import { writeFile, unlink } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface ExecResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

// Language → temp file extension + shell command
const RUNNERS: Record<string, { ext: string; cmd: (f: string) => string }> = {
  python:     { ext: 'py',  cmd: (f) => `python3 ${f}` },
  javascript: { ext: 'js',  cmd: (f) => `node ${f}` },
  typescript: { ext: 'ts',  cmd: (f) => `node --input-type=module < ${f}` },
};

@Injectable()
export class CodeService {
  private readonly logger = new Logger(CodeService.name);

  async execute(language: string, code: string): Promise<ExecResult> {
    const runner = RUNNERS[language];

    if (!runner) {
      // Java, Go, C++ not installed on the server — return a clear message
      return {
        stdout: '',
        stderr: `${language.toUpperCase()} server-side execution is not available in this environment. Switch to Python or JavaScript to run code here.`,
        exitCode: 1,
      };
    }

    const tmpFile = join(tmpdir(), `exec_${Date.now()}_${Math.random().toString(36).slice(2)}.${runner.ext}`);

    try {
      await writeFile(tmpFile, code, 'utf8');

      const { stdout, stderr } = await execAsync(runner.cmd(tmpFile), {
        timeout: 10_000,   // 10 s hard limit
        maxBuffer: 512 * 1024,  // 512 KB output cap
        env: { PATH: process.env.PATH },  // minimal env — no secrets leaked
      });

      return { stdout, stderr, exitCode: 0 };
    } catch (err: any) {
      if (err.killed || err.signal === 'SIGTERM') {
        return { stdout: '', stderr: 'Execution timed out (10s limit).', exitCode: 124 };
      }
      // child_process throws when exit code != 0; stdout/stderr are still available
      return {
        stdout: err.stdout ?? '',
        stderr: err.stderr ?? err.message,
        exitCode: err.code ?? 1,
      };
    } finally {
      unlink(tmpFile).catch(() => {}); // clean up temp file
    }
  }
}
