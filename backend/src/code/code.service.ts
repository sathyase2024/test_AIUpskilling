import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import { writeFile, unlink, mkdir, rm } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

const EXEC_OPTS = {
  timeout: 15_000,
  maxBuffer: 512 * 1024,
  env: { PATH: process.env.PATH },
};

interface ExecResult { stdout: string; stderr: string; exitCode: number }

function tag() {
  return `${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function handleError(err: any): ExecResult {
  if (err.killed || err.signal === 'SIGTERM') {
    return { stdout: '', stderr: 'Execution timed out (15s limit).', exitCode: 124 };
  }
  return { stdout: err.stdout ?? '', stderr: err.stderr ?? err.message, exitCode: err.code ?? 1 };
}

@Injectable()
export class CodeService {
  private readonly logger = new Logger(CodeService.name);

  async execute(language: string, code: string): Promise<ExecResult> {
    switch (language) {
      case 'python':     return this.runPython(code);
      case 'java':       return this.runJava(code);
      case 'javascript':
      case 'typescript': return this.runNode(code);
      default:
        return {
          stdout: '',
          stderr: `${language} execution is not yet available. Use Python, JavaScript, or Java.`,
          exitCode: 1,
        };
    }
  }

  // ── Python ────────────────────────────────────────────────────────────────────
  private async runPython(code: string): Promise<ExecResult> {
    const file = join(tmpdir(), `py_${tag()}.py`);
    try {
      await writeFile(file, code, 'utf8');
      const { stdout, stderr } = await execAsync(`python3 ${file}`, EXEC_OPTS);
      return { stdout, stderr, exitCode: 0 };
    } catch (err: any) {
      return handleError(err);
    } finally {
      unlink(file).catch(() => {});
    }
  }

  // ── Java — compile then run ───────────────────────────────────────────────────
  private async runJava(code: string): Promise<ExecResult> {
    const dir = join(tmpdir(), `java_${tag()}`);
    const file = join(dir, 'Main.java');
    try {
      await mkdir(dir, { recursive: true });
      await writeFile(file, code, 'utf8');

      // Step 1: compile
      try {
        await execAsync(`javac ${file}`, { ...EXEC_OPTS, timeout: 20_000 });
      } catch (err: any) {
        return { stdout: '', stderr: err.stderr ?? err.message, exitCode: 1 };
      }

      // Step 2: run
      try {
        const { stdout, stderr } = await execAsync(`java -cp ${dir} Main`, EXEC_OPTS);
        return { stdout, stderr, exitCode: 0 };
      } catch (err: any) {
        return handleError(err);
      }
    } finally {
      rm(dir, { recursive: true, force: true }).catch(() => {});
    }
  }

  // ── JavaScript / TypeScript (Node.js) ────────────────────────────────────────
  private async runNode(code: string): Promise<ExecResult> {
    const file = join(tmpdir(), `js_${tag()}.mjs`);
    try {
      await writeFile(file, code, 'utf8');
      const { stdout, stderr } = await execAsync(`node ${file}`, EXEC_OPTS);
      return { stdout, stderr, exitCode: 0 };
    } catch (err: any) {
      return handleError(err);
    } finally {
      unlink(file).catch(() => {});
    }
  }
}
