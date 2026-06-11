'use client'

import { useState } from 'react'
import { FlaskConical, ChevronDown, ChevronUp, Lightbulb, Terminal } from 'lucide-react'
import EmbeddedEditor from '@/components/EmbeddedEditor'
import type { ModuleChallenge } from '@/lib/module-challenges'

interface Props {
  challenge: ModuleChallenge
  topicSlug: string
  moduleIndex: number
  moduleName: string
}

export default function ModuleChallengeCard({
  challenge,
  topicSlug,
  moduleIndex,
  moduleName,
}: Props) {
  const [outputOpen, setOutputOpen] = useState(false)
  const [hintsOpen, setHintsOpen]   = useState(false)
  const [revealedHints, setRevealedHints] = useState(0)

  return (
    <div
      className="mt-12 rounded-2xl overflow-hidden bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10"
      style={{
        boxShadow: '0 0 0 1px rgba(245,158,11,0.20), 0 4px 24px rgba(245,158,11,0.08)',
      }}
    >
      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 shrink-0 shadow-lg shadow-amber-500/30">
          <FlaskConical className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-bold text-slate-900 dark:text-white">{challenge.title}</p>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-500/30 text-[10px] font-semibold text-amber-700 dark:text-amber-300">
              Module Challenge
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-white/50 mt-0.5">{moduleName}</p>
        </div>
      </div>

      {/* ── Scenario + tasks ── */}
      <div className="px-5 py-4 bg-white dark:bg-transparent border-t border-slate-200 dark:border-white/10">
        <p className="text-sm text-slate-600 dark:text-white/70 leading-relaxed mb-4">{challenge.scenario}</p>

        <div className="space-y-1.5">
          {challenge.tasks.map((task, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm">
              <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-amber-50 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-500/30 flex items-center justify-center text-[10px] font-bold text-amber-600 dark:text-amber-400">
                {i + 1}
              </span>
              <span className="text-slate-700 dark:text-white/90 leading-snug">{task}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Code editor ── */}
      <div className="border-t border-slate-200 dark:border-white/10">
        <EmbeddedEditor
          topicSlug={topicSlug}
          lessonId={`module-challenge-${moduleIndex}`}
          lessonSnippets={{ [challenge.language]: challenge.starterCode }}
          snippetLabel="Challenge starter"
          embedded
        />
      </div>

      {/* ── Expected output ── */}
      <div className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-transparent">
        <button
          onClick={() => setOutputOpen((v) => !v)}
          className="w-full flex items-center gap-2 px-5 py-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
        >
          <Terminal className="w-3.5 h-3.5 text-slate-400 dark:text-white/40 shrink-0" />
          <span className="text-xs font-medium text-slate-500 dark:text-white/50">Expected output</span>
          {outputOpen ? (
            <ChevronUp className="w-3.5 h-3.5 text-slate-400 dark:text-white/40 ml-auto" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-white/40 ml-auto" />
          )}
        </button>
        {outputOpen && (
          <pre className="mx-5 mb-4 px-4 py-3 rounded-lg bg-[#0d0d14] text-[11px] font-mono leading-relaxed text-green-300/70 whitespace-pre-wrap overflow-x-auto">
            {challenge.expectedOutput}
          </pre>
        )}
      </div>

      {/* ── Hints ── */}
      <div className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-transparent">
        <button
          onClick={() => setHintsOpen((v) => !v)}
          className="w-full flex items-center gap-2 px-5 py-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="text-xs font-medium text-slate-500 dark:text-white/50">
            Hints ({challenge.hints.length})
          </span>
          {hintsOpen ? (
            <ChevronUp className="w-3.5 h-3.5 text-slate-400 dark:text-white/40 ml-auto" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-white/40 ml-auto" />
          )}
        </button>
        {hintsOpen && (
          <div className="px-5 pb-4 space-y-2">
            {challenge.hints.slice(0, revealedHints).map((hint, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30"
              >
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 mt-0.5 shrink-0">
                  {i + 1}
                </span>
                <code className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-mono">
                  {hint}
                </code>
              </div>
            ))}
            {revealedHints < challenge.hints.length && (
              <button
                onClick={() => setRevealedHints((n) => n + 1)}
                className="mt-1 text-xs text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 transition-colors flex items-center gap-1"
              >
                <Lightbulb className="w-3 h-3" />
                {revealedHints === 0 ? 'Show first hint' : 'Show next hint'}
              </button>
            )}
            {revealedHints === challenge.hints.length && (
              <button
                onClick={() => setRevealedHints(0)}
                className="mt-1 text-xs text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white/60 transition-colors"
              >
                Hide hints
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
