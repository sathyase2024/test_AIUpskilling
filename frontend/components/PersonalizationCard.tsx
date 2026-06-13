'use client'

import { useState, useEffect, useRef } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import {
  getCourseAnalogies,
  ALL_DOMAINS,
  DOMAIN_LABELS,
  DOMAIN_ICONS,
  INTEREST_KEY,
  type InterestDomain,
  type CourseAnalogies,
} from '@/lib/personalization/engine'

const CACHE_PREFIX = 'analogy_cache:'

// Retry schedule: wait this many ms before each attempt (index 0 = first attempt, no wait)
const RETRY_DELAYS = [0, 3_000, 8_000, 15_000]

interface Props {
  courseSlug: string
  conceptId: string
  conceptName: string
  /** Cricket analogy text from the lesson JSON — shown instantly as fallback
   *  while the domain-specific analogy is generated in the background. */
  fallbackText?: string
  /** Position in the lesson (0-based). Staggers background API calls so that
   *  several cards on the same page don't hit the AI worker simultaneously. */
  sectionIndex?: number
  /** Externally controlled domain (from the lesson reader sidebar switcher).
   *  When provided, overrides the locally stored preference. */
  activeDomain?: InterestDomain
}

export default function PersonalizationCard({
  courseSlug,
  conceptId,
  conceptName,
  fallbackText,
  sectionIndex = 0,
  activeDomain,
}: Props) {
  const [analogies, setAnalogies]     = useState<CourseAnalogies | null>(null)
  const [domain, setDomain]           = useState<InterestDomain>('cricket')
  const [picking, setPicking]         = useState(false)
  const [translated, setTranslated]   = useState<string | null>(null)
  const [personalizing, setPersonalizing] = useState(false)
  const translatedFor = useRef<string>('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(INTEREST_KEY) as InterestDomain | null
      if (saved && ALL_DOMAINS.includes(saved)) setDomain(saved)
    }
  }, [])

  // Sync with external activeDomain (from sidebar switcher)
  useEffect(() => {
    if (activeDomain && activeDomain !== domain) {
      setDomain(activeDomain)
    }
  // Only react to activeDomain changes, not domain itself
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDomain])

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

  const staticAnalogy =
    (concept ? concept[domain] : null) ??
    (domain === 'cricket' && fallbackText ? fallbackText : null)

  useEffect(() => {
    if (domain === 'cricket' || staticAnalogy !== null) {
      setTranslated(null)
      setPersonalizing(false)
      translatedFor.current = ''
      return
    }

    const key = `${domain}:${conceptId}`
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

    setPersonalizing(true)
    const ctrl = new AbortController()

    // Abortable sleep — rejects immediately when the signal fires
    function sleep(ms: number): Promise<void> {
      return new Promise((resolve, reject) => {
        const t = setTimeout(resolve, ms)
        ctrl.signal.addEventListener('abort', () => { clearTimeout(t); reject(new DOMException('Aborted', 'AbortError')) })
      })
    }

    async function attempt() {
      // Stagger start: 100ms per card index — just enough to avoid exact-simultaneous
      // requests without being perceptibly slow.
      await sleep(sectionIndex * 100)

      for (let i = 0; i < RETRY_DELAYS.length; i++) {
        if (ctrl.signal.aborted) return
        if (i > 0) {
          try { await sleep(RETRY_DELAYS[i]) } catch { return }
        }
        try {
          const r = await fetch('/api/proxy/ai/translate-analogy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cricketAnalogy: fallbackText ?? '', domain, conceptName, courseSlug, conceptId: slug }),
            signal: ctrl.signal,
          })
          if (!r.ok) throw new Error(`HTTP ${r.status}`)
          const data = await r.json()
          if (!data?.analogy) throw new Error('empty response')

          if (typeof window !== 'undefined') localStorage.setItem(cacheKey, data.analogy)
          setTranslated(data.analogy)
          translatedFor.current = key
          setPersonalizing(false)
          return
        } catch (err: any) {
          if (err?.name === 'AbortError') return
          if (i < RETRY_DELAYS.length - 1) {
            console.info(`[PersonalizationCard] ${conceptId}/${domain} attempt ${i + 1} failed, retrying — ${err.message}`)
          } else {
            console.warn(`[PersonalizationCard] ${conceptId}/${domain} all retries exhausted — ${err.message}`)
            setPersonalizing(false)
            // analogy stays as cricket fallback; will retry automatically next page load
          }
        }
      }
    }

    attempt()

    return () => {
      ctrl.abort()
      setPersonalizing(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain, staticAnalogy, fallbackText, courseSlug, conceptId, conceptName, sectionIndex])

  // Resolution order:
  //   1. Static engine data (pre-generated TS file)
  //   2. DB-cached / live-generated text
  //   3. Cricket fallback while personalizing (shown instantly, replaced silently)
  const analogy = staticAnalogy ?? translated ?? (fallbackText || null)
  const showFallback = personalizing && !staticAnalogy && !translated && !!fallbackText

  if (!analogy && !personalizing) return null

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
          {personalizing && (
            <span className="flex items-center gap-1 text-[10px] text-purple-400/50">
              <Loader2 className="w-2.5 h-2.5 animate-spin" />
              personalizing…
            </span>
          )}
        </div>
        <button
          onClick={() => setPicking(v => !v)}
          className="text-[11px] text-purple-400/60 hover:text-purple-300 transition-colors flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3" />
          {picking ? 'Close' : 'Change'}
        </button>
      </div>

      {/* Domain picker — shown at TOP, between header and body */}
      {picking && (
        <div className="px-5 pt-1 pb-3 border-b border-white/[0.06]">
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

      {/* Body — always shows content immediately; personalizing is a silent background process */}
      {analogy ? (
        <div className="px-5 pb-4 pt-3">
          <div className={`text-[14px] leading-[1.7] space-y-2 transition-opacity duration-500 ${showFallback ? 'text-white/50' : 'text-white/70'}`}>
            {analogy.split(/\n\n+/).map((para, i) => (
              <p key={i}>{para.trim()}</p>
            ))}
          </div>
          {showFallback && (
            <p className="text-[11px] text-white/25 pt-2">
              🏏 Cricket analogy shown while your {DOMAIN_LABELS[domain]} version generates in the background.
            </p>
          )}
        </div>
      ) : (
        /* Only reached when there is no fallbackText at all */
        <div className="px-5 pb-4 pt-3 space-y-2">
          <div className="h-3 rounded bg-white/[0.06] animate-pulse w-full" />
          <div className="h-3 rounded bg-white/[0.06] animate-pulse w-5/6" />
          <div className="h-3 rounded bg-white/[0.06] animate-pulse w-4/6" />
          <p className="text-[11px] text-white/25 pt-1">Crafting {DOMAIN_LABELS[domain]} analogy…</p>
        </div>
      )}
    </div>
  )
}
