import { Injectable, Logger } from '@nestjs/common';
import { execFile } from 'child_process';
import { writeFile, unlink, mkdir, rm } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

const EXEC_OPTS = {
  timeout: 10_000,
  maxBuffer: 256 * 1024,
  env: {
    PATH: process.env.PATH,
    JAVA_HOME: process.env.JAVA_HOME,
    HOME: process.env.HOME ?? '/tmp',
  },
};

const MAX_CODE_BYTES = 50 * 1024; // 50 KB
const ALLOWED_LANGUAGES = new Set(['python', 'java', 'javascript', 'typescript', 'cpp', 'go']);

export interface ExecResult { stdout: string; stderr: string; exitCode: number }

function tag() {
  return `${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function handleError(err: any): ExecResult {
  if (err.killed || err.signal === 'SIGTERM') {
    return { stdout: '', stderr: 'Execution timed out (10s limit).', exitCode: 124 };
  }
  return { stdout: err.stdout ?? '', stderr: err.stderr ?? err.message, exitCode: err.code ?? 1 };
}

@Injectable()
export class CodeService {
  private readonly logger = new Logger(CodeService.name);

  async execute(language: string, code: string): Promise<ExecResult> {
    if (!ALLOWED_LANGUAGES.has(language)) {
      return {
        stdout: '',
        stderr: `${language} execution is not yet available. Use Python, JavaScript, TypeScript, Java, C++, or Go.`,
        exitCode: 1,
      };
    }
    if (Buffer.byteLength(code, 'utf8') > MAX_CODE_BYTES) {
      return { stdout: '', stderr: 'Code exceeds the 50 KB size limit.', exitCode: 1 };
    }
    switch (language) {
      case 'python':     return this.runPython(code);
      case 'java':       return this.runJava(code);
      case 'javascript': return this.runNode(code);
      case 'typescript': return this.runTypeScript(code);
      case 'cpp':        return this.runCpp(code);
      case 'go':         return this.runGo(code);
      default:           return { stdout: '', stderr: 'Unsupported language.', exitCode: 1 };
    }
  }

  private async runPython(code: string): Promise<ExecResult> {
    const file = join(tmpdir(), `py_${tag()}.py`);
    try {
      await writeFile(file, code, 'utf8');
      const { stdout, stderr } = await execFileAsync('python3', [file], EXEC_OPTS);
      return { stdout, stderr, exitCode: 0 };
    } catch (err: any) {
      return handleError(err);
    } finally {
      unlink(file).catch(() => {});
    }
  }

  private async runJava(code: string): Promise<ExecResult> {
    const dir = join(tmpdir(), `java_${tag()}`);
    const file = join(dir, 'Main.java');
    try {
      await mkdir(dir, { recursive: true });
      await writeFile(file, code, 'utf8');
      try {
        await execFileAsync('javac', [file], { ...EXEC_OPTS, timeout: 20_000 });
      } catch (err: any) {
        return { stdout: '', stderr: err.stderr ?? err.message, exitCode: 1 };
      }
      try {
        const { stdout, stderr } = await execFileAsync('java', ['-cp', dir, 'Main'], EXEC_OPTS);
        return { stdout, stderr, exitCode: 0 };
      } catch (err: any) {
        return handleError(err);
      }
    } finally {
      rm(dir, { recursive: true, force: true }).catch(() => {});
    }
  }

  private async runNode(code: string): Promise<ExecResult> {
    const file = join(tmpdir(), `js_${tag()}.js`);
    try {
      await writeFile(file, code, 'utf8');
      const { stdout, stderr } = await execFileAsync('node', [file], EXEC_OPTS);
      return { stdout, stderr, exitCode: 0 };
    } catch (err: any) {
      return handleError(err);
    } finally {
      unlink(file).catch(() => {});
    }
  }

  private async runTypeScript(code: string): Promise<ExecResult> {
    const file = join(tmpdir(), `ts_${tag()}.ts`);
    try {
      await writeFile(file, code, 'utf8');
      const { stdout, stderr } = await execFileAsync(
        'node', ['--experimental-strip-types', file], EXEC_OPTS,
      );
      return { stdout, stderr, exitCode: 0 };
    } catch (err: any) {
      return handleError(err);
    } finally {
      unlink(file).catch(() => {});
    }
  }

  private async runCpp(code: string): Promise<ExecResult> {
    const dir = join(tmpdir(), `cpp_${tag()}`);
    const src = join(dir, 'main.cpp');
    const bin = join(dir, 'main');
    try {
      await mkdir(dir, { recursive: true });
      await writeFile(src, code, 'utf8');
      try {
        await execFileAsync('g++', ['-O2', '-std=c++17', src, '-o', bin], { ...EXEC_OPTS, timeout: 20_000 });
      } catch (err: any) {
        return { stdout: '', stderr: err.stderr ?? err.message, exitCode: 1 };
      }
      try {
        const { stdout, stderr } = await execFileAsync(bin, [], EXEC_OPTS);
        return { stdout, stderr, exitCode: 0 };
      } catch (err: any) {
        return handleError(err);
      }
    } finally {
      rm(dir, { recursive: true, force: true }).catch(() => {});
    }
  }

  private async runGo(code: string): Promise<ExecResult> {
    // A minimal go.mod lets `go run .` work in module mode regardless of the
    // toolchain's default. GOCACHE must point at a writable dir for the build.
    const dir = join(tmpdir(), `go_${tag()}`);
    const file = join(dir, 'main.go');
    try {
      await mkdir(dir, { recursive: true });
      await writeFile(join(dir, 'go.mod'), 'module playground\n\ngo 1.21\n', 'utf8');
      await writeFile(file, code, 'utf8');
      const { stdout, stderr } = await execFileAsync('go', ['run', '.'], {
        ...EXEC_OPTS,
        timeout: 30_000,
        cwd: dir,
        env: { ...EXEC_OPTS.env, GOCACHE: '/tmp/go-cache', GOPATH: '/tmp/go-path' },
      });
      return { stdout, stderr, exitCode: 0 };
    } catch (err: any) {
      return handleError(err);
    } finally {
      rm(dir, { recursive: true, force: true }).catch(() => {});
    }
  }
}
