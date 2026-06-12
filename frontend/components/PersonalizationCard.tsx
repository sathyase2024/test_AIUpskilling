'use client'

import { useState, useEffect } from 'react'
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react'
import {
  getCourseAnalogies,
  ALL_DOMAINS,
  DOMAIN_LABELS,
  DOMAIN_ICONS,
  type InterestDomain,
  type CourseAnalogies,
} from '@/lib/personalization/engine'

const INTEREST_KEY = 'user_interest_domain'

interface Props {
  courseSlug: string
  conceptId: string
  conceptName: string
}

export default function PersonalizationCard({ courseSlug, conceptId, conceptName }: Props) {
  const [analogies, setAnalogies]   = useState<CourseAnalogies | null>(null)
  const [domain, setDomain]         = useState<InterestDomain>('cricket')
  const [expanded, setExpanded]     = useState(false)
  const [picking, setPicking]       = useState(false)

  // Load persisted preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(INTEREST_KEY) as InterestDomain | null
      if (saved && ALL_DOMAINS.includes(saved)) setDomain(saved)
    }
  }, [])

  // Load course analogies (lazy)
  useEffect(() => {
    getCourseAnalogies(courseSlug).then(setAnalogies)
  }, [courseSlug])

  const concept  = analogies?.concepts.find(c => c.id === conceptId)
  const analogy  = concept ? concept[domain] : null

  if (!analogy) return null

  function pickDomain(d: InterestDomain) {
    setDomain(d)
    localStorage.setItem(INTEREST_KEY, d)
    setPicking(false)
  }

  return (
    <div
      className="mt-6 rounded-2xl overflow-hidden"
      style={{ boxShadow: '0 0 0 1px rgba(168,85,247,0.25), 0 4px 20px rgba(168,85,247,0.06)' }}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-purple-900/30 to-violet-900/10 hover:from-purple-900/40 transition-colors text-left"
      >
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-violet-400 shrink-0 shadow-lg shadow-purple-500/30">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-bold text-white">Understand it your way</p>
            <span className="text-lg leading-none">{DOMAIN_ICONS[domain]}</span>
            <span className="text-xs text-purple-300/80 font-medium">{DOMAIN_LABELS[domain]} analogy</span>
          </div>
          <p className="text-[11px] text-white/40 mt-0.5">{conceptName}</p>
        </div>
        {expanded
          ? <ChevronUp  className="w-4 h-4 text-white/30 shrink-0" />
          : <ChevronDown className="w-4 h-4 text-white/30 shrink-0" />
        }
      </button>

      {expanded && (
        <div className="bg-[#0d0d18] border-t border-white/[0.06]">
          {/* Analogy text */}
          <div className="px-5 pt-4 pb-3">
            <p className="text-sm text-white/75 leading-relaxed italic">
              <span className="text-lg mr-2">{DOMAIN_ICONS[domain]}</span>
              {analogy}
            </p>
          </div>

          {/* Domain switcher */}
          {picking ? (
            <div className="px-5 pb-4">
              <p className="text-[11px] text-white/40 mb-2 uppercase tracking-wider">Pick your interest</p>
              <div className="flex flex-wrap gap-1.5">
                {ALL_DOMAINS.map(d => (
                  <button
                    key={d}
                    onClick={() => pickDomain(d)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all
                      ${d === domain
                        ? 'bg-purple-500/30 border border-purple-400/50 text-purple-200'
                        : 'bg-white/[0.04] border border-white/10 text-white/50 hover:text-white/80 hover:bg-white/[0.07]'
                      }`}
                  >
                    <span>{DOMAIN_ICONS[d]}</span>
                    {DOMAIN_LABELS[d]}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="px-5 pb-4 flex items-center justify-between">
              <p className="text-[11px] text-white/30">
                Analogies available for 12 interest domains
              </p>
              <button
                onClick={() => setPicking(true)}
                className="text-[11px] text-purple-400/70 hover:text-purple-300 transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                Change interest
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
