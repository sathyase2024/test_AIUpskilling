'use client'

import { useState, useEffect, useRef } from 'react'
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
const CACHE_PREFIX = 'analogy_cache:'

interface Props {
  courseSlug: string
  conceptId: string
  conceptName: string
  /** Cricket analogy text from the lesson JSON — used as cricket display text
   *  and as reference context when generating other-domain analogies. */
  fallbackText?: string
  /** Position in the lesson (0-based). Used to stagger API calls so that
   *  several analogy cards on the same page don't all fire simultaneously. */
  sectionIndex?: number
}

export default function PersonalizationCard({
  courseSlug,
  conceptId,
  conceptName,
  fallbackText,
  sectionIndex = 0,
}: Props) {
  const [analogies, setAnalogies] = useState<CourseAnalogies | null>(null)
  const [domain, setDomain]       = useState<InterestDomain>('cricket')
  const [picking, setPicking]     = useState(false)
  const [translated, setTranslated] = useState<string | null>(null)
  const [loading, setLoading]     = useState(false)
  // Track which (domain, conceptId) the current translation was generated for
  const translatedFor = useRef<string>('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(INTEREST_KEY) as InterestDomain | null
      if (saved && ALL_DOMAINS.includes(saved)) setDomain(saved)
    }
  }, [])

  useEffect(() => {
    getCourseAnalogies(courseSlug).then(setAnalogies)
  }, [courseSlug])

  // Fuzzy match concept from pre-generated static data
  const slug = conceptId.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const slugWords = slug.split('-').filter(w => w.length > 3)
  const concept = analogies?.concepts.find(c =>
    c.id === slug ||
    slugWords.some(w => c.id.includes(w) || c.name.toLowerCase().includes(w)) ||
    c.name.toLowerCase().replace(/\s+/g, '-').includes(slug) ||
    slug.includes(c.name.toLowerCase().replace(/\s+/g, '-'))
  )

  // Static analogy: pre-generated data or the raw cricket text (cricket domain only)
  const staticAnalogy =
    (concept ? concept[domain] : null) ??
    (domain === 'cricket' && fallbackText ? fallbackText : null)

  // Fetch a generated analogy from the backend when static data is unavailable
  useEffect(() => {
    if (domain === 'cricket') {
      // Cricket is always served from fallbackText — no API needed
      setTranslated(null)
      translatedFor.current = ''
      return
    }
    if (staticAnalogy !== null) {
      // Static pre-generated data covers this domain — no API needed
      setTranslated(null)
      translatedFor.current = ''
      return
    }

    const key = `${domain}:${conceptId}`
    // Already have a fresh translation for this combo
    if (translatedFor.current === key && translated !== null) return

    const cacheKey = `${CACHE_PREFIX}${courseSlug}:${conceptId}:${domain}`
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        setTranslated(cached)
        translatedFor.current = key
        return
      }
    }

    // Stagger requests: each section waits (sectionIndex * 150 ms) before firing
    // so that a lesson with 5 analogy cards doesn't hit the API simultaneously.
    setLoading(true)
    const ctrl = new AbortController()
    const timer = setTimeout(() => {
      fetch('/api/proxy/ai/translate-analogy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cricketAnalogy: fallbackText ?? '',
          domain,
          conceptName,
          topicName: courseSlug.replace(/-/g, ' '),
        }),
        signal: ctrl.signal,
      })
        .then(r => r.ok ? r.json() : Promise.reject(`HTTP ${r.status}`))
        .then(data => {
          if (data?.analogy) {
            if (typeof window !== 'undefined') localStorage.setItem(cacheKey, data.analogy)
            setTranslated(data.analogy)
            translatedFor.current = key
          }
        })
        .catch(err => {
          if ((err as { name?: string })?.name !== 'AbortError') {
            console.warn(`[PersonalizationCard] analogy generation failed for ${conceptId}/${domain}:`, err)
          }
        })
        .finally(() => setLoading(false))
    }, sectionIndex * 200)

    return () => {
      clearTimeout(timer)
      ctrl.abort()
    }
  }, [domain, staticAnalogy, fallbackText, courseSlug, conceptId, conceptName, sectionIndex, translated])

  const analogy = staticAnalogy ?? translated

  // Show loading skeleton so the card doesn't pop in/out — but only if we
  // have something to generate (cricket text or at least a concept name).
  const canGenerate = domain !== 'cricket' && (!!fallbackText || !!conceptName)
  if (!analogy && !loading && !canGenerate) return null
  if (!analogy && !loading) return null   // nothing to show and not fetching

  function pickDomain(d: InterestDomain) {
    setDomain(d)
    localStorage.setItem(INTEREST_KEY, d)
    setPicking(false)
  }

  return (
    <div
      className="my-6 rounded-2xl overflow-hidden bg-[#0d0d18] dark:bg-[#0d0d18] bg-opacity-100"
      style={{ boxShadow: '0 0 0 1px rgba(168,85,247,0.20), 0 4px 16px rgba(168,85,247,0.06)' }}
    >
      {/* Header row */}
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

      {/* Body */}
      {loading ? (
        <div className="px-5 pb-4 space-y-2">
          <div className="h-3 rounded bg-white/[0.06] animate-pulse w-full" />
          <div className="h-3 rounded bg-white/[0.06] animate-pulse w-5/6" />
          <div className="h-3 rounded bg-white/[0.06] animate-pulse w-4/6" />
          <p className="text-[11px] text-white/25 pt-1">
            Crafting {DOMAIN_LABELS[domain]} analogy…
          </p>
        </div>
      ) : (
        <p className="px-5 pb-4 text-sm text-white/75 leading-relaxed">
          {analogy}
        </p>
      )}

      {/* Domain picker */}
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
