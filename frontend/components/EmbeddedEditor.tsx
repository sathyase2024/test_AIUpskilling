'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Play, ChevronDown, ChevronUp, Terminal, Code2, CheckCircle, XCircle, RotateCcw } from 'lucide-react'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-[#1e1e1e]">
      <div className="w-5 h-5 border-2 border-purple-500/40 border-t-purple-500 rounded-full animate-spin" />
    </div>
  ),
})

// ─── Types ────────────────────────────────────────────────────────────────────

type Language = 'python' | 'javascript' | 'typescript' | 'java' | 'go' | 'cpp'

interface PistonLang {
  id: string        // piston language identifier
  version: string
  monacoId: string  // monaco editor language id
  label: string
  starter: string
}

// ─── Language config ──────────────────────────────────────────────────────────

const LANGUAGES: Record<Language, PistonLang> = {
  python: {
    id: 'python', version: '*', monacoId: 'python', label: 'Python',
    starter: `# Write your Python code here
print("Hello, World!")

# Try something from the lesson:
nums = [1, 2, 3, 4, 5]
print(f"Sum: {sum(nums)}")
`,
  },
  javascript: {
    id: 'javascript', version: '*', monacoId: 'javascript', label: 'JavaScript',
    starter: `// Write your JavaScript code here
console.log("Hello, World!");

// Try something from the lesson:
const nums = [1, 2, 3, 4, 5];
console.log("Sum:", nums.reduce((a, b) => a + b, 0));
`,
  },
  typescript: {
    id: 'typescript', version: '*', monacoId: 'typescript', label: 'TypeScript',
    starter: `// Write your TypeScript code here
const greet = (name: string): string => \`Hello, \${name}!\`;
console.log(greet("World"));

const nums: number[] = [1, 2, 3, 4, 5];
console.log("Sum:", nums.reduce((a, b) => a + b, 0));
`,
  },
  java: {
    id: 'java', version: '*', monacoId: 'java', label: 'Java',
    starter: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");

        int[] nums = {1, 2, 3, 4, 5};
        int sum = 0;
        for (int n : nums) sum += n;
        System.out.println("Sum: " + sum);
    }
}
`,
  },
  go: {
    id: 'go', version: '*', monacoId: 'go', label: 'Go',
    starter: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")

    nums := []int{1, 2, 3, 4, 5}
    sum := 0
    for _, n := range nums {
        sum += n
    }
    fmt.Println("Sum:", sum)
}
`,
  },
  cpp: {
    id: 'c++', version: '*', monacoId: 'cpp', label: 'C++',
    starter: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;

    vector<int> nums = {1, 2, 3, 4, 5};
    int sum = accumulate(nums.begin(), nums.end(), 0);
    cout << "Sum: " << sum << endl;

    return 0;
}
`,
  },
}

// ─── Detect default language from topic slug ──────────────────────────────────

function detectLanguage(slug: string): Language {
  if (/python|pytorch|tensorflow|hugging|machine-learn|data-sci|fastapi|django/.test(slug)) return 'python'
  if (/java(?!script)|spring|j2ee/.test(slug)) return 'java'
  if (/typescript/.test(slug)) return 'typescript'
  if (/\bgo\b|golang/.test(slug)) return 'go'
  if (/cpp|c\+\+/.test(slug)) return 'cpp'
  return 'javascript'
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

interface ExecResult {
  stdout: string
  stderr: string
  exitCode: number
}

// ─── JavaScript/TypeScript: run directly in the browser ──────────────────────
// No server call — captures console.log/error output from the user's code.

function runInBrowser(code: string): ExecResult {
  const logs: string[] = []
  const errs: string[] = []

  const origLog   = console.log
  const origError = console.error
  const origWarn  = console.warn
  const origInfo  = console.info

  const fmt = (...args: unknown[]) =>
    args.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' ')

  console.log   = (...a) => { logs.push(fmt(...a)) }
  console.error = (...a) => { errs.push(fmt(...a)) }
  console.warn  = (...a) => { logs.push('[warn] ' + fmt(...a)) }
  console.info  = (...a) => { logs.push(fmt(...a)) }

  try {
    // eslint-disable-next-line no-new-func
    new Function(code)()
    return { stdout: logs.join('\n'), stderr: errs.join('\n'), exitCode: 0 }
  } catch (e: any) {
    return { stdout: logs.join('\n'), stderr: e.message, exitCode: 1 }
  } finally {
    console.log   = origLog
    console.error = origError
    console.warn  = origWarn
    console.info  = origInfo
  }
}

// ─── Python / other languages: backend subprocess ────────────────────────────

async function runOnBackend(language: string, code: string): Promise<ExecResult> {
  const res = await fetch(`${API_URL}/code/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ language, code }),
  })
  if (!res.ok) {
    const msg = await res.text().catch(() => `Server error ${res.status}`)
    throw new Error(msg)
  }
  return res.json()
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  topicSlug: string
}

export default function EmbeddedEditor({ topicSlug }: Props) {
  const [open, setOpen] = useState(true)
  const [lang, setLang] = useState<Language>(() => detectLanguage(topicSlug))
  const [code, setCode] = useState<string>(() => LANGUAGES[detectLanguage(topicSlug)].starter)
  const [running, setRunning] = useState(false)
  const [output, setOutput] = useState<{ stdout: string; stderr: string; exitCode: number } | null>(null)
  const [execError, setExecError] = useState<string | null>(null)

  const handleLangChange = (next: Language) => {
    setLang(next)
    setCode(LANGUAGES[next].starter)
    setOutput(null)
    setExecError(null)
  }

  const handleRun = useCallback(async () => {
    if (running) return
    setRunning(true)
    setOutput(null)
    setExecError(null)
    try {
      let result: ExecResult
      if (lang === 'javascript' || lang === 'typescript') {
        // Run instantly in the browser — no server round-trip
        result = runInBrowser(code)
      } else {
        // Python and others run via backend subprocess
        result = await runOnBackend(lang, code)
      }
      setOutput(result)
    } catch (e) {
      setExecError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setRunning(false)
    }
  }, [running, lang, code])

  const reset = () => {
    setCode(LANGUAGES[lang].starter)
    setOutput(null)
    setExecError(null)
  }

  const succeeded = output && output.exitCode === 0 && !output.stderr
  const failed = output && (output.exitCode !== 0 || !!output.stderr)

  return (
    <div className="mt-10 rounded-2xl overflow-hidden bg-[#0d0d18]"
      style={{ border: '1px solid transparent', backgroundClip: 'padding-box', boxShadow: '0 0 0 1px rgba(139,92,246,0.35), 0 4px 24px rgba(139,92,246,0.12)' }}
    >

      {/* ── Header / toggle ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-white/5 transition-colors text-left bg-gradient-to-r from-purple-900/30 to-cyan-900/10"
      >
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 shrink-0 shadow-lg shadow-purple-500/30">
          <Code2 className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-white">Code Playground</p>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/30 text-[10px] font-semibold text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
              Live
            </span>
          </div>
          <p className="text-[11px] text-white/50 mt-0.5">Write and run code right here — no sign-in needed</p>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-white/30" />
        ) : (
          <ChevronDown className="w-4 h-4 text-white/30" />
        )}
      </button>

      {open && (
        <>
          {/* ── Toolbar ── */}
          <div className="flex items-center gap-2 px-4 py-2 border-t border-white/10 bg-black/30">
            {/* Language selector */}
            <div className="flex gap-1 flex-wrap">
              {(Object.keys(LANGUAGES) as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => handleLangChange(l)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    lang === l
                      ? 'bg-purple-600/40 border border-purple-500/50 text-purple-200'
                      : 'bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80'
                  }`}
                >
                  {LANGUAGES[l].label}
                </button>
              ))}
            </div>

            <div className="flex-1" />

            {/* Reset */}
            <button
              onClick={reset}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
              title="Reset to starter code"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>

            {/* Run */}
            <button
              onClick={handleRun}
              disabled={running}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-semibold transition-all shadow-md shadow-green-900/30"
            >
              {running ? (
                <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-white" />
              )}
              {running ? 'Running…' : 'Run'}
            </button>
          </div>

          {/* ── Editor ── */}
          <div className="h-[280px] border-t border-white/10">
            <MonacoEditor
              height="100%"
              language={LANGUAGES[lang].monacoId}
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val ?? '')}
              options={{
                fontSize: 13,
                fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
                fontLigatures: true,
                lineNumbers: 'on',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                padding: { top: 12, bottom: 12 },
                renderLineHighlight: 'gutter',
                smoothScrolling: true,
                cursorBlinking: 'smooth',
                tabSize: 4,
                bracketPairColorization: { enabled: true },
                suggest: { showKeywords: true },
              }}
            />
          </div>

          {/* ── Output panel ── */}
          <div className="border-t border-white/10 bg-black/40">
            {/* Status bar */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
              <Terminal className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[11px] text-white/40 font-medium uppercase tracking-wider">Output</span>
              {succeeded && (
                <span className="ml-auto flex items-center gap-1 text-[11px] text-green-400">
                  <CheckCircle className="w-3 h-3" /> Exit 0
                </span>
              )}
              {failed && (
                <span className="ml-auto flex items-center gap-1 text-[11px] text-red-400">
                  <XCircle className="w-3 h-3" /> Exit {output?.exitCode}
                </span>
              )}
            </div>

            <div className="min-h-[80px] max-h-[160px] overflow-y-auto px-4 py-3 font-mono text-xs leading-relaxed">
              {running && (
                <div className="flex items-center gap-2 text-white/40">
                  <div className="w-3 h-3 border border-green-500/40 border-t-green-500 rounded-full animate-spin" />
                  Executing on Piston…
                </div>
              )}
              {!running && !output && !execError && (
                <span className="text-white/25">Press Run to execute your code</span>
              )}
              {execError && (
                <span className="text-red-400">{execError}</span>
              )}
              {output && (
                <>
                  {output.stdout && (
                    <pre className="whitespace-pre-wrap text-green-300">{output.stdout}</pre>
                  )}
                  {output.stderr && (
                    <pre className="whitespace-pre-wrap text-red-300 mt-1">{output.stderr}</pre>
                  )}
                  {!output.stdout && !output.stderr && (
                    <span className="text-white/30">(no output)</span>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
