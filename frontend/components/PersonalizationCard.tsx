'use client'

import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
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
  /** Raw analogy text from the lesson JSON — used as cricket fallback when
   *  no pre-generated data exists for this concept yet. */
  fallbackText?: string
}

export default function PersonalizationCard({ courseSlug, conceptId, conceptName, fallbackText }: Props) {
  const [analogies, setAnalogies] = useState<CourseAnalogies | null>(null)
  const [domain, setDomain]       = useState<InterestDomain>('cricket')
  const [picking, setPicking]     = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(INTEREST_KEY) as InterestDomain | null
      if (saved && ALL_DOMAINS.includes(saved)) setDomain(saved)
    }
  }, [])

  useEffect(() => {
    getCourseAnalogies(courseSlug).then(setAnalogies)
  }, [courseSlug])

  // Fuzzy match: exact id → name contains slug words → slug contains concept name
  const slug = conceptId.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const slugWords = slug.split('-').filter(w => w.length > 3)
  const concept = analogies?.concepts.find(c =>
    c.id === slug ||
    slugWords.some(w => c.id.includes(w) || c.name.toLowerCase().includes(w)) ||
    c.name.toLowerCase().replace(/\s+/g, '-').includes(slug) ||
    slug.includes(c.name.toLowerCase().replace(/\s+/g, '-'))
  )

  // Resolve analogy text: pre-generated data → cricket fallback text → nothing
  const analogy =
    (concept ? concept[domain] : null) ??
    (domain === 'cricket' && fallbackText ? fallbackText : null)

  if (!analogy) return null

  function pickDomain(d: InterestDomain) {
    setDomain(d)
    localStorage.setItem(INTEREST_KEY, d)
    setPicking(false)
  }

  return (
    <div className="my-6 rounded-2xl overflow-hidden bg-[#0d0d18] dark:bg-[#0d0d18] bg-opacity-100"
      style={{ boxShadow: '0 0 0 1px rgba(168,85,247,0.20), 0 4px 16px rgba(168,85,247,0.06)' }}
    >
      {/* Label row */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-gradient-to-br from-purple-500 to-violet-400 shadow shadow-purple-500/30">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-semibold text-purple-300/80 uppercase tracking-wider">Analogy</span>
          <span className="text-base leading-none">{DOMAIN_ICONS[domain]}</span>
          <span className="text-xs text-white/40">{DOMAIN_LABELS[domain]}</span>
        </div>
        <button
          onClick={() => setPicking(v => !v)}
          className="text-[11px] text-purple-400/60 hover:text-purple-300 transition-colors flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3" />
          {picking ? 'Close' : 'Change'}
        </button>
      </div>

      {/* Analogy text */}
      <p className="px-5 pb-4 text-sm text-white/75 leading-relaxed">
        {analogy}
      </p>

      {/* Domain picker (inline, shown on demand) */}
      {picking && (
        <div className="px-5 pb-4 pt-1 border-t border-white/[0.06]">
          <div className="flex flex-wrap gap-1.5">
            {ALL_DOMAINS.map(d => (
              <button
                key={d}
                onClick={() => pickDomain(d)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all
                  ${d === domain
                    ? 'bg-purple-500/30 border border-purple-400/50 text-purple-200'
                    : 'bg-white/[0.04] border border-white/[0.08] text-white/45 hover:text-white/75 hover:bg-white/[0.07]'
                  }`}
              >
                <span>{DOMAIN_ICONS[d]}</span>
                {DOMAIN_LABELS[d]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
