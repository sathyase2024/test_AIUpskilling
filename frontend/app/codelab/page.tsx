'use client'

import { useState, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import { PROBLEMS } from '@/lib/code-lab/problems'
import { validateOutput } from '@/lib/code-lab/validator'
import type { CodeLabProblem, Difficulty, Category, Language, ValidationResult } from '@/lib/code-lab/types'
import {
  ArrowLeft, Play, Lightbulb, ChevronDown, ChevronUp,
  CheckCircle, XCircle, Terminal, LayoutGrid, Database, ArrowLeftRight,
  Layers, Hash, LayoutList, Link2, GitBranch, Network,
  Sparkles, Calculator, Cpu, RefreshCw, ArrowUpDown, Box, Brain,
  Search, Code2,
} from 'lucide-react'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-[#1e1e1e]">
      <div className="w-8 h-8 border-2 border-purple-500/40 border-t-purple-500 rounded-full animate-spin" />
    </div>
  ),
})

type View = 'list' | 'editor'

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  Beginner:     'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
  Intermediate: 'text-blue-400   bg-blue-500/15    border-blue-500/30',
  Advanced:     'text-amber-400  bg-amber-500/15   border-amber-500/30',
  Expert:       'text-red-400    bg-red-500/15     border-red-500/30',
}

const CATEGORIES: Array<Category | 'All'> = [
  'All','Arrays & Strings','Two Pointers','Sliding Window','Hash Tables',
  'Stacks & Queues','Linked Lists','Trees','Graphs','Dynamic Programming',
  'Math & Numbers','Bit Manipulation','Recursion & Backtracking',
  'Sorting & Searching','OOP & Design','AI / ML Algorithms',
]

const DIFFICULTIES: Array<Difficulty | 'All'> = ['All','Beginner','Intermediate','Advanced','Expert']

const LANG_LABELS: Record<Language, string> = {
  python:'Python', javascript:'JavaScript', typescript:'TypeScript',
  java:'Java', go:'Go', cpp:'C++',
}

const MONACO_LANG: Record<Language, string> = {
  python:'python', javascript:'javascript', typescript:'typescript',
  java:'java', go:'go', cpp:'cpp',
}

function CategoryIcon({ cat }: { cat: string }) {
  const cls = 'w-3.5 h-3.5'
  const map: Record<string, React.ReactElement> = {
    'All':                       <LayoutGrid   className={cls} />,
    'Arrays & Strings':          <Database     className={cls} />,
    'Two Pointers':              <ArrowLeftRight className={cls} />,
    'Sliding Window':            <Layers       className={cls} />,
    'Hash Tables':               <Hash         className={cls} />,
    'Stacks & Queues':           <LayoutList   className={cls} />,
    'Linked Lists':              <Link2        className={cls} />,
    'Trees':                     <GitBranch    className={cls} />,
    'Graphs':                    <Network      className={cls} />,
    'Dynamic Programming':       <Sparkles     className={cls} />,
    'Math & Numbers':            <Calculator   className={cls} />,
    'Bit Manipulation':          <Cpu          className={cls} />,
    'Recursion & Backtracking':  <RefreshCw    className={cls} />,
    'Sorting & Searching':       <ArrowUpDown  className={cls} />,
    'OOP & Design':              <Box          className={cls} />,
    'AI / ML Algorithms':        <Brain        className={cls} />,
  }
  return map[cat] ?? <Code2 className={cls} />
}

const API_URL = '/api/proxy'

export default function CodeLabPage() {
  const [view,         setView]         = useState<View>('list')
  const [problem,      setProblem]      = useState<CodeLabProblem | null>(null)
  const [category,     setCategory]     = useState<Category | 'All'>('All')
  const [difficulty,   setDifficulty]   = useState<Difficulty | 'All'>('All')
  const [search,       setSearch]       = useState('')
  const [language,     setLanguage]     = useState<Language>('python')
  const [code,         setCode]         = useState('')
  const [isRunning,    setIsRunning]    = useState(false)
  const [validation,   setValidation]   = useState<ValidationResult | null>(null)
  const [rawOutput,    setRawOutput]    = useState<{stdout:string;stderr:string}|null>(null)
  const [activeTab,    setActiveTab]    = useState<'results'|'output'>('results')
  const [langOpen,     setLangOpen]     = useState(false)
  const [hintsOpen,    setHintsOpen]    = useState(false)
  const [revealedHints,setRevealedHints]= useState(0)
  const [mobilePane,   setMobilePane]   = useState<'problem'|'code'|'tests'>('problem')

  const filtered = useMemo(() => PROBLEMS.filter(p => {
    if (category !== 'All' && p.category !== category) return false
    if (difficulty !== 'All' && p.difficulty !== difficulty) return false
    if (search) {
      const q = search.toLowerCase()
      return p.title.toLowerCase().includes(q) || p.tags.some(t => t.includes(q))
    }
    return true
  }), [category, difficulty, search])

  const categoryCounts = useMemo(() => {
    const m: Record<string, number> = { All: PROBLEMS.length }
    for (const p of PROBLEMS) m[p.category] = (m[p.category] ?? 0) + 1
    return m
  }, [])

  function openProblem(p: CodeLabProblem) {
    const lang: Language = (p.starterCode.python ? 'python' : Object.keys(p.starterCode)[0]) as Language
    setProblem(p); setLanguage(lang); setCode(p.starterCode[lang] ?? '')
    setValidation(null); setRawOutput(null); setRevealedHints(0)
    setHintsOpen(false); setMobilePane('problem'); setView('editor')
  }

  function handleLangChange(lang: Language) {
    if (!problem) return
    setLanguage(lang)
    setCode(problem.starterCode[lang] ?? problem.starterCode.python ?? '')
    setValidation(null); setRawOutput(null); setLangOpen(false)
  }

  const handleRun = useCallback(async () => {
    if (!code || isRunning) return
    setIsRunning(true); setActiveTab('results'); setMobilePane('tests')
    try {
      // The visible editor holds only the user's solution; the hidden test
      // harness for the problem is appended at execution time.
      const tests = problem?.testCode?.[language] ?? ''
      const res = await fetch(`${API_URL}/code/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code: tests ? `${code}\n${tests}` : code }),
      })
      const data = await res.json()
      setRawOutput({ stdout: data.stdout ?? '', stderr: data.stderr ?? '' })
      setValidation(validateOutput(data.stdout ?? '', data.stderr ?? '', data.exitCode ?? 0))
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      setRawOutput({ stdout: '', stderr: msg })
      setValidation(validateOutput('', msg, 1))
    } finally {
      setIsRunning(false)
    }
  }, [code, language, isRunning, problem])

  // ── List View ──────────────────────────────────────────────────────────────
  if (view === 'list') {
    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <Navbar />
        <div className="pt-20 pb-12">
          {/* Hero */}
          <div className="text-center px-4 py-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 mb-4">
              <Cpu className="w-3 h-3" /> {PROBLEMS.length} Problems · 15 Categories
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Code{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Lab</span>
            </h1>
            <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed">
              Sharpen your skills with curated challenges — algorithms, data structures, ML and more.
              From beginner to expert, across 6 languages.
            </p>
          </div>

          {/* Search + difficulty */}
          <div className="max-w-5xl mx-auto px-4 mb-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search problems or tags…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {DIFFICULTIES.map(d => {
                const active = difficulty === d
                const base = 'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors'
                const col = active
                  ? d === 'All'          ? 'bg-white/10 border-white/30 text-white'
                  : d === 'Beginner'     ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : d === 'Intermediate' ? 'bg-blue-500/20    border-blue-500/40    text-blue-300'
                  : d === 'Advanced'     ? 'bg-amber-500/20   border-amber-500/40   text-amber-300'
                  :                        'bg-red-500/20     border-red-500/40     text-red-300'
                  : 'bg-white/[0.03] border-white/10 text-white/50 hover:bg-white/[0.06]'
                return (
                  <button key={d} onClick={() => setDifficulty(d)} className={`${base} ${col}`}>{d}</button>
                )
              })}
            </div>
          </div>

          {/* Mobile category chips (sidebar is hidden below sm) */}
          <div className="sm:hidden max-w-5xl mx-auto px-4 mb-4 flex gap-2 overflow-x-auto pb-1.5 [-webkit-overflow-scrolling:touch]">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap shrink-0 transition-colors ${
                  category === cat
                    ? 'bg-purple-500/15 border-purple-500/40 text-purple-300'
                    : 'bg-white/[0.03] border-white/10 text-white/50'
                }`}
              >
                <CategoryIcon cat={cat} />
                {cat}
                <span className={category === cat ? 'text-purple-400/70' : 'text-white/25'}>
                  {categoryCounts[cat] ?? 0}
                </span>
              </button>
            ))}
          </div>

          {/* Sidebar + grid */}
          <div className="max-w-5xl mx-auto px-4 flex gap-5">
            {/* Sidebar */}
            <aside className="w-52 flex-shrink-0 hidden sm:block">
              <div className="sticky top-24 rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left text-xs transition-colors ${
                      category === cat
                        ? 'bg-purple-500/15 text-purple-300 border-r-2 border-purple-500'
                        : 'text-white/50 hover:bg-white/[0.04] hover:text-white/80'
                    }`}
                  >
                    <span className={category === cat ? 'text-purple-400' : 'text-white/25'}>
                      <CategoryIcon cat={cat} />
                    </span>
                    <span className="flex-1 truncate font-medium">{cat}</span>
                    <span className={`text-[10px] tabular-nums ${category === cat ? 'text-purple-400/70' : 'text-white/25'}`}>
                      {categoryCounts[cat] ?? 0}
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            {/* Grid */}
            <main className="flex-1 min-w-0">
              <p className="text-xs text-white/40 mb-3">{filtered.length} problem{filtered.length !== 1 ? 's' : ''}</p>
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-20 text-white/30">
                  <Search className="w-8 h-8 opacity-30" />
                  <p className="text-sm">No problems match your filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filtered.map(p => (
                    <button
                      key={p.id}
                      onClick={() => openProblem(p)}
                      className="text-left rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 hover:bg-white/[0.055] p-4 transition-all group"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-white/25 font-mono tabular-nums">#{p.num}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${DIFFICULTY_COLORS[p.difficulty]}`}>
                          {p.difficulty}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-white/85 group-hover:text-white transition-colors leading-snug mb-2">
                        {p.title}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-white/40">
                          {p.category}
                        </span>
                        {p.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[10px] text-white/20">{tag}</span>
                        ))}
                      </div>
                      {p.timeComplexity && (
                        <div className="mt-2.5 flex gap-3 text-[10px] font-mono text-white/20">
                          <span>T: {p.timeComplexity}</span>
                          {p.spaceComplexity && <span>S: {p.spaceComplexity}</span>}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    )
  }

  // ── Editor View ────────────────────────────────────────────────────────────
  if (!problem) return null
  const availLangs = Object.keys(problem.starterCode) as Language[]
  const score = validation?.score ?? 0
  const scoreColor = score >= 80 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-red-400'
  const scoreBg    = score >= 80 ? 'bg-emerald-500'  : score >= 50 ? 'bg-amber-500'   : 'bg-red-500'

  return (
    <div className="flex flex-col h-[100dvh] bg-[#0a0a0f] overflow-hidden">
      <Navbar />

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-black/40 mt-16 flex-shrink-0">
        <button
          onClick={() => { setView('list'); setValidation(null) }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:block">Problems</span>
        </button>
        <div className="w-px h-5 bg-white/10" />
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xs text-white/25 font-mono shrink-0">#{problem.num}</span>
          <span className="text-sm font-semibold text-white truncate">{problem.title}</span>
          <span className={`hidden sm:inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${DIFFICULTY_COLORS[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
        </div>

        {/* Language selector */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(v => !v)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-sm text-white/80 transition-colors"
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            {LANG_LABELS[language]}
            <ChevronDown className="w-3.5 h-3.5 text-white/40" />
          </button>
          {langOpen && (
            <div className="absolute top-full right-0 mt-1 w-36 rounded-xl bg-[#1a1a2e] border border-white/10 shadow-xl z-50 overflow-hidden">
              {availLangs.map(l => (
                <button
                  key={l}
                  onClick={() => handleLangChange(l)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-white/10 ${language === l ? 'text-cyan-400 bg-white/5' : 'text-white/70'}`}
                >
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Run */}
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium transition-all shadow-lg shadow-green-900/30"
        >
          {isRunning
            ? <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            : <Play className="w-3.5 h-3.5 fill-white" />}
          {isRunning ? 'Running…' : 'Run'}
        </button>
      </div>

      {/* Mobile pane switcher (three columns collapse into tabs below lg) */}
      <div className="flex lg:hidden border-b border-white/10 bg-black/30 flex-shrink-0">
        {([['problem','Problem'],['code','Code'],['tests','Tests']] as const).map(([pane, label]) => (
          <button
            key={pane}
            onClick={() => setMobilePane(pane)}
            className={`flex-1 py-2.5 text-xs font-medium transition-colors border-b-2 ${
              mobilePane === pane ? 'text-white border-purple-500' : 'text-white/40 border-transparent'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Three-column layout (tabbed panes on mobile) */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left: description ── */}
        <aside className={`${mobilePane === 'problem' ? 'flex' : 'hidden'} lg:flex w-full lg:w-[280px] flex-shrink-0 lg:border-r border-white/10 bg-[#0d0d18] flex-col overflow-y-auto`}>
          <div className="p-4 border-b border-white/[0.06]">
            <p className="text-xs text-white/65 leading-relaxed">{problem.description}</p>
          </div>

          <div className="p-4 border-b border-white/[0.06] space-y-2.5">
            <h3 className="text-[10px] font-bold text-white/35 uppercase tracking-wider">Examples</h3>
            {problem.examples.map((ex, i) => (
              <div key={i} className="rounded-lg bg-white/[0.03] border border-white/[0.08] p-2.5 text-xs font-mono space-y-1 break-all">
                <div><span className="text-white/25">In: </span><span className="text-green-300/75">{ex.input}</span></div>
                <div><span className="text-white/25">Out: </span><span className="text-cyan-300/75">{ex.output}</span></div>
                {ex.explanation && <div className="text-white/30 text-[10px]">{ex.explanation}</div>}
              </div>
            ))}
          </div>

          <div className="p-4 border-b border-white/[0.06] space-y-1.5">
            <h3 className="text-[10px] font-bold text-white/35 uppercase tracking-wider">Constraints</h3>
            {problem.constraints.map((c, i) => (
              <div key={i} className="flex items-start gap-1.5 text-xs text-white/50">
                <span className="text-purple-400/50 mt-0.5 shrink-0">•</span>{c}
              </div>
            ))}
          </div>

          {/* Hints – amber accordion */}
          <div className="border-t border-white/[0.06]">
            <button
              onClick={() => setHintsOpen(v => !v)}
              className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-white/[0.02] transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400/60 shrink-0" />
              <span className="text-xs font-medium text-white/50">Hints ({problem.hints.length})</span>
              {hintsOpen
                ? <ChevronUp   className="w-3.5 h-3.5 text-white/25 ml-auto" />
                : <ChevronDown className="w-3.5 h-3.5 text-white/25 ml-auto" />}
            </button>
            {hintsOpen && (
              <div className="px-4 pb-4 space-y-2">
                {problem.hints.slice(0, revealedHints).map((hint, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
                    <span className="text-[10px] font-bold text-amber-400/70 mt-0.5 shrink-0">{i + 1}</span>
                    <code className="text-xs text-amber-200/70 leading-relaxed font-mono">{hint}</code>
                  </div>
                ))}
                {revealedHints < problem.hints.length && (
                  <button
                    onClick={() => setRevealedHints(n => n + 1)}
                    className="mt-1 text-xs text-amber-400/60 hover:text-amber-300 transition-colors flex items-center gap-1"
                  >
                    <Lightbulb className="w-3 h-3" />
                    {revealedHints === 0 ? 'Show first hint' : 'Show next hint'}
                  </button>
                )}
                {revealedHints === problem.hints.length && revealedHints > 0 && (
                  <button
                    onClick={() => setRevealedHints(0)}
                    className="mt-1 text-xs text-white/30 hover:text-white/50 transition-colors"
                  >
                    Hide hints
                  </button>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* ── Middle: editor ── */}
        <div className={`${mobilePane === 'code' ? 'flex' : 'hidden'} lg:flex w-full flex-1 flex-col min-w-0 lg:border-r border-white/10`}>
          <div className="flex-1 overflow-hidden">
            <MonacoEditor
              height="100%"
              language={MONACO_LANG[language]}
              theme="vs-dark"
              value={code}
              onChange={val => setCode(val ?? '')}
              options={{
                automaticLayout: true,
                fontSize: 13,
                fontFamily: '"Fira Code","Cascadia Code","JetBrains Mono",monospace',
                fontLigatures: true,
                lineNumbers: 'on',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                padding: { top: 16, bottom: 16 },
                smoothScrolling: true,
                cursorBlinking: 'smooth',
                tabSize: 4,
                bracketPairColorization: { enabled: true },
              }}
            />
          </div>
          <div className="flex items-center gap-3 px-4 py-1.5 bg-black/40 border-t border-white/10 text-xs text-white/35 shrink-0">
            <span>{code.split('\n').length} lines</span>
            <div className="flex-1" />
            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30 font-medium">
              {LANG_LABELS[language]}
            </span>
          </div>
        </div>

        {/* ── Right: results / output ── */}
        <aside className={`${mobilePane === 'tests' ? 'flex' : 'hidden'} lg:flex w-full lg:w-[300px] flex-shrink-0 flex-col bg-[#0d0d18]`}>
          {/* Tabs */}
          <div className="flex border-b border-white/10 shrink-0">
            {(['results','output'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 text-xs font-medium transition-colors border-b-2 capitalize ${
                  activeTab === tab ? 'text-white border-purple-500' : 'text-white/40 border-transparent hover:text-white/70'
                }`}
              >
                {tab === 'results' ? 'Test Results' : 'Output'}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Results tab */}
            {activeTab === 'results' && (
              <div className="p-3 space-y-3">
                {!validation && !isRunning && (
                  <div className="flex flex-col items-center gap-3 py-14 text-white/25">
                    <Play className="w-8 h-8 opacity-25" />
                    <p className="text-xs text-center">Run your code to see test results</p>
                  </div>
                )}

                {isRunning && (
                  <div className="flex flex-col items-center gap-3 py-14 text-white/40">
                    <div className="w-8 h-8 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
                    <p className="text-xs">Running tests…</p>
                  </div>
                )}

                {validation && !isRunning && (
                  <>
                    {/* Score */}
                    <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/45">Score</span>
                        <span className={`text-2xl font-bold tabular-nums ${scoreColor}`}>
                          {score}<span className="text-xs font-normal text-white/25">/100</span>
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-700 ${scoreBg}`} style={{ width: `${score}%` }} />
                      </div>
                      <p className="text-xs text-white/55 leading-relaxed">{validation.feedback}</p>
                    </div>

                    {/* Test rows */}
                    {validation.testResults.length > 0 && (
                      <div className="space-y-1.5">
                        {validation.testResults.map((r, i) => (
                          <div
                            key={i}
                            className={`flex items-start gap-2 p-2.5 rounded-lg text-xs ${
                              r.passed
                                ? 'bg-emerald-500/5 border border-emerald-500/15'
                                : 'bg-red-500/5 border border-red-500/15'
                            }`}
                          >
                            {r.passed
                              ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                              : <XCircle    className="w-3.5 h-3.5 text-red-400    mt-0.5 shrink-0" />}
                            <span className={r.passed ? 'text-emerald-300/75' : 'text-red-300/75'}>
                              {r.description || `Test ${r.num}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* All passed banner */}
                    {validation.passed && (
                      <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-emerald-400">All tests passed!</p>
                          <p className="text-[10px] text-emerald-300/55 mt-0.5">{validation.passedTests}/{validation.totalTests} test cases</p>
                        </div>
                      </div>
                    )}

                    {/* Amber hint card */}
                    {validation.errorHint && (
                      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 overflow-hidden">
                        <div className="flex items-start gap-2.5 px-3 py-3">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-amber-300">{validation.errorHint.title}</p>
                            <p className="text-xs text-amber-200/65 mt-0.5">{validation.errorHint.cause}</p>
                            <p className="text-xs text-amber-300/75 mt-1">{validation.errorHint.fix}</p>
                            {validation.errorHint.example && (
                              <code className="text-[11px] text-amber-200/55 font-mono mt-1.5 block bg-amber-500/10 rounded px-2 py-1">
                                {validation.errorHint.example}
                              </code>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Output tab */}
            {activeTab === 'output' && (
              <div className="p-3 space-y-2">
                {rawOutput?.stdout && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase text-white/25 mb-1.5">stdout</p>
                    <pre className="text-xs font-mono text-green-300/75 leading-relaxed whitespace-pre-wrap bg-[#0a0a14] rounded-lg p-3 border border-white/[0.05]">
                      {rawOutput.stdout}
                    </pre>
                  </div>
                )}
                {rawOutput?.stderr && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase text-red-400/50 mb-1.5">stderr</p>
                    <pre className="text-xs font-mono text-red-300/65 leading-relaxed whitespace-pre-wrap bg-red-900/10 rounded-lg p-3 border border-red-500/15">
                      {rawOutput.stderr}
                    </pre>
                  </div>
                )}
                {!rawOutput && !isRunning && (
                  <div className="flex flex-col items-center gap-2 py-14 text-white/25">
                    <Terminal className="w-8 h-8 opacity-25" />
                    <p className="text-xs">Run your code to see output</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
