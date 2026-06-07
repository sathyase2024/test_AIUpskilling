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
    id: 'python', version: '3.10.0', monacoId: 'python', label: 'Python',
    starter: `# Write your Python code here
print("Hello, World!")

# Try something from the lesson:
nums = [1, 2, 3, 4, 5]
print(f"Sum: {sum(nums)}")
`,
  },
  javascript: {
    id: 'javascript', version: '18.15.0', monacoId: 'javascript', label: 'JavaScript',
    starter: `// Write your JavaScript code here
console.log("Hello, World!");

// Try something from the lesson:
const nums = [1, 2, 3, 4, 5];
console.log("Sum:", nums.reduce((a, b) => a + b, 0));
`,
  },
  typescript: {
    id: 'typescript', version: '5.0.3', monacoId: 'typescript', label: 'TypeScript',
    starter: `// Write your TypeScript code here
const greet = (name: string): string => \`Hello, \${name}!\`;
console.log(greet("World"));

const nums: number[] = [1, 2, 3, 4, 5];
console.log("Sum:", nums.reduce((a, b) => a + b, 0));
`,
  },
  java: {
    id: 'java', version: '15.0.2', monacoId: 'java', label: 'Java',
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
    id: 'go', version: '1.16.2', monacoId: 'go', label: 'Go',
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
    id: 'c++', version: '10.2.0', monacoId: 'cpp', label: 'C++',
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

// ─── Piston execution ─────────────────────────────────────────────────────────

interface PistonResult {
  run: { stdout: string; stderr: string; code: number; signal: string | null }
  compile?: { stdout: string; stderr: string; code: number }
}

async function runOnPiston(lang: PistonLang, code: string): Promise<PistonResult> {
  const res = await fetch('https://emkc.org/api/v2/piston/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      language: lang.id,
      version: lang.version,
      files: [{ content: code }],
    }),
  })
  if (!res.ok) throw new Error(`Execution service error: ${res.status}`)
  return res.json()
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  topicSlug: string
}

export default function EmbeddedEditor({ topicSlug }: Props) {
  const [open, setOpen] = useState(false)
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
      const result = await runOnPiston(LANGUAGES[lang], code)
      setOutput({
        stdout: result.run.stdout,
        stderr: (result.compile?.stderr ?? '') + result.run.stderr,
        exitCode: result.run.code ?? 0,
      })
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
    <div className="mt-10 rounded-2xl border border-white/10 overflow-hidden bg-[#0d0d18]">

      {/* ── Header / toggle ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-white/5 transition-colors text-left"
      >
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 shrink-0">
          <Code2 className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">Code Playground</p>
          <p className="text-[11px] text-white/40">Practice what you just learned — runs in the browser</p>
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
