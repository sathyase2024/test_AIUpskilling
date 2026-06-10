import { Injectable, Logger } from '@nestjs/common';
import { execFile } from 'child_process';
import { writeFile, unlink, mkdir, rm } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { promisify } from 'util';
import {
  LANGUAGES,
  PYTHON_AVAILABLE_LIBRARIES,
  PYTHON_UNAVAILABLE_LIBRARIES,
  resolveLanguageId,
} from './sandbox.config';

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

  // Dispatch table: canonical language id → runner. Register new languages here
  // (the language itself is declared in sandbox.config.ts).
  private readonly runners: Record<string, (code: string) => Promise<ExecResult>> = {
    python:     (c) => this.runPython(c),
    java:       (c) => this.runJava(c),
    javascript: (c) => this.runNode(c),
    typescript: (c) => this.runTypeScript(c),
    cpp:        (c) => this.runCpp(c),
    go:         (c) => this.runGo(c),
  };

  async execute(language: string, code: string): Promise<ExecResult> {
    const id = resolveLanguageId(language);
    const runner = id ? this.runners[id] : undefined;
    if (!id || !runner) {
      const names = LANGUAGES.filter((l) => l.available).map((l) => l.label).join(', ');
      return {
        stdout: '',
        stderr: `${language} execution is not available. Supported languages: ${names}.`,
        exitCode: 1,
      };
    }
    if (Buffer.byteLength(code, 'utf8') > MAX_CODE_BYTES) {
      return { stdout: '', stderr: 'Code exceeds the 50 KB size limit.', exitCode: 1 };
    }
    return runner(code);
  }

  private async runPython(code: string): Promise<ExecResult> {
    const file = join(tmpdir(), `py_${tag()}.py`);
    // Strip stray markdown fences that lesson JSON may include
    const clean = code.replace(/^```[a-z]*\n?/gm, '').replace(/^```$/gm, '');
    try {
      await writeFile(file, clean, 'utf8');
      const { stdout, stderr } = await execFileAsync('python3', [file], EXEC_OPTS);
      return { stdout, stderr, exitCode: 0 };
    } catch (err: any) {
      const res = handleError(err);
      // Many lessons import heavy frameworks (torch, tensorflow, transformers)
      // that aren't in the sandbox. Make that explicit instead of a bare trace.
      if (/ModuleNotFoundError|No module named/.test(res.stderr)) {
        res.stderr +=
          `\n\n[sandbox] This library isn't available here. The playground includes ` +
          `${PYTHON_AVAILABLE_LIBRARIES.join(', ')}. Heavy frameworks like ` +
          `${PYTHON_UNAVAILABLE_LIBRARIES.slice(0, 3).join(', ')} are not installed — ` +
          `that lesson code is for reference.`;
      }
      return res;
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
