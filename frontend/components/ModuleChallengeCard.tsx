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
      className="mt-12 rounded-2xl overflow-hidden"
      style={{
        border: '1px solid transparent',
        backgroundClip: 'padding-box',
        boxShadow: '0 0 0 1px rgba(251,146,60,0.30), 0 4px 24px rgba(251,146,60,0.08)',
      }}
    >
      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-orange-900/30 to-amber-900/10">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 shrink-0 shadow-lg shadow-orange-500/30">
          <FlaskConical className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-bold text-white">{challenge.title}</p>
            <span className="px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/35 text-[10px] font-semibold text-orange-300">
              Module Challenge
            </span>
          </div>
          <p className="text-[11px] text-white/45 mt-0.5">{moduleName}</p>
        </div>
      </div>

      {/* ── Scenario + tasks ── */}
      <div className="px-5 py-4 bg-[#0d0d18] border-t border-white/[0.06]">
        <p className="text-sm text-white/65 leading-relaxed mb-4">{challenge.scenario}</p>

        <div className="space-y-1.5">
          {challenge.tasks.map((task, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm">
              <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-[10px] font-bold text-orange-400">
                {i + 1}
              </span>
              <span className="text-white/70 leading-snug">{task}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Code editor ── */}
      <div className="border-t border-white/[0.06]">
        <EmbeddedEditor
          topicSlug={topicSlug}
          lessonId={`module-challenge-${moduleIndex}`}
          lessonSnippets={{ [challenge.language]: challenge.starterCode }}
          snippetLabel="Challenge starter"
          embedded
        />
      </div>

      {/* ── Expected output ── */}
      <div className="border-t border-white/[0.06] bg-[#0d0d18]">
        <button
          onClick={() => setOutputOpen((v) => !v)}
          className="w-full flex items-center gap-2 px-5 py-3 text-left hover:bg-white/[0.02] transition-colors"
        >
          <Terminal className="w-3.5 h-3.5 text-white/30 shrink-0" />
          <span className="text-xs font-medium text-white/50">Expected output</span>
          {outputOpen ? (
            <ChevronUp className="w-3.5 h-3.5 text-white/25 ml-auto" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-white/25 ml-auto" />
          )}
        </button>
        {outputOpen && (
          <pre className="px-5 pb-4 text-[11px] font-mono leading-relaxed text-green-300/70 whitespace-pre-wrap overflow-x-auto">
            {challenge.expectedOutput}
          </pre>
        )}
      </div>

      {/* ── Hints ── */}
      <div className="border-t border-white/[0.06] bg-[#0d0d18]">
        <button
          onClick={() => setHintsOpen((v) => !v)}
          className="w-full flex items-center gap-2 px-5 py-3 text-left hover:bg-white/[0.02] transition-colors"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-400/60 shrink-0" />
          <span className="text-xs font-medium text-white/50">
            Hints ({challenge.hints.length})
          </span>
          {hintsOpen ? (
            <ChevronUp className="w-3.5 h-3.5 text-white/25 ml-auto" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-white/25 ml-auto" />
          )}
        </button>
        {hintsOpen && (
          <div className="px-5 pb-4 space-y-2">
            {challenge.hints.slice(0, revealedHints).map((hint, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20"
              >
                <span className="text-[10px] font-bold text-amber-400/70 mt-0.5 shrink-0">
                  {i + 1}
                </span>
                <code className="text-xs text-amber-200/70 leading-relaxed font-mono">
                  {hint}
                </code>
              </div>
            ))}
            {revealedHints < challenge.hints.length && (
              <button
                onClick={() => setRevealedHints((n) => n + 1)}
                className="mt-1 text-xs text-amber-400/60 hover:text-amber-300 transition-colors flex items-center gap-1"
              >
                <Lightbulb className="w-3 h-3" />
                {revealedHints === 0 ? 'Show first hint' : 'Show next hint'}
              </button>
            )}
            {revealedHints === challenge.hints.length && (
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
    </div>
  )
}
