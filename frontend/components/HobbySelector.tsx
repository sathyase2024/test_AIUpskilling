'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, ArrowRight, X } from 'lucide-react'
import { ALL_DOMAINS, DOMAIN_LABELS, DOMAIN_ICONS, type InterestDomain } from '@/lib/personalization/engine'

const INTEREST_KEY = 'user_interest_domain'

const DOMAIN_TAGLINES: Record<InterestDomain, string> = {
  cricket:     'Overs, innings, and pitch conditions become your mental model',
  gaming:      'Level up concepts through strategy games and esports',
  music:       'Think in melodies, harmonies, and production workflows',
  photography: 'Aperture, composition, and light as your frame of reference',
  travel:      'Itineraries, navigation, and new terrain as metaphors',
  movies:      'Directors, shots, and story arcs illuminate every idea',
  fitness:     'Reps, periodisation, and progressive overload explain it all',
  chess:       'Openings, tactics, and endgame thinking as your lens',
  cooking:     'Recipes, techniques, and flavour balance drive understanding',
  finance:     'Portfolios, risk, and compounding as your mental framework',
  business:    'Strategy, metrics, and product thinking guide every analogy',
  sports:      'Drills, game plans, and athletic performance as your guide',
}

interface Props {
  courseSlug: string
  /** Optional: called instead of router.push if parent wants to handle navigation */
  onConfirm?: (domain: InterestDomain, slug: string) => void
  onClose: () => void
}

export default function HobbySelector({ courseSlug, onConfirm, onClose }: Props) {
  const router = useRouter()
  const [selected, setSelected] = useState<InterestDomain>('cricket')

  // Pre-fill with saved preference if any
  useEffect(() => {
    const saved = localStorage.getItem(INTEREST_KEY) as InterestDomain | null
    if (saved && ALL_DOMAINS.includes(saved)) setSelected(saved)
  }, [])

  function confirm() {
    localStorage.setItem(INTEREST_KEY, selected)
    if (onConfirm) {
      onConfirm(selected, courseSlug)
    } else {
      router.push(`/learn/${courseSlug}`)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0d0d18] border border-white/10"
        style={{ boxShadow: '0 0 0 1px rgba(245,158,11,0.2), 0 24px 60px rgba(0,0,0,0.6)' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-500 to-orange-400 shadow-lg shadow-amber-500/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-semibold text-amber-400/80 uppercase tracking-wider">
              Personalise your learning
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">What are you into?</h2>
          <p className="text-sm text-white/50">
            We'll explain every concept through analogies from your world — making abstract ideas instantly click.
          </p>
        </div>

        {/* Domain grid */}
        <div className="px-6 pb-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {ALL_DOMAINS.map((domain) => {
            const active = selected === domain
            return (
              <button
                key={domain}
                onClick={() => setSelected(domain)}
                className={`relative text-left p-3.5 rounded-xl border transition-all duration-150 ${
                  active
                    ? 'border-amber-400/60 bg-amber-500/10'
                    : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                {active && (
                  <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <div className="text-2xl mb-2 leading-none">{DOMAIN_ICONS[domain]}</div>
                <p className={`text-sm font-semibold mb-1 ${active ? 'text-amber-300' : 'text-white/80'}`}>
                  {DOMAIN_LABELS[domain]}
                </p>
                <p className="text-[11px] leading-snug text-white/40 line-clamp-2">
                  {DOMAIN_TAGLINES[domain]}
                </p>
              </button>
            )
          })}
        </div>

        {/* Preview strip */}
        <div className="mx-6 mb-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
          <p className="text-[11px] text-white/40 uppercase tracking-wider mb-1.5">Preview</p>
          <p className="text-xs text-white/65 italic leading-relaxed">
            <span className="text-base mr-1.5 not-italic">{DOMAIN_ICONS[selected]}</span>
            {ANALOGY_PREVIEWS[selected]}
          </p>
        </div>

        {/* CTA */}
        <div className="px-6 pb-6 flex items-center gap-3">
          <button
            onClick={confirm}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 hover:scale-[1.01] active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              boxShadow: '0 6px 24px rgba(245,158,11,0.35)',
            }}
          >
            Start Learning
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => { localStorage.setItem(INTEREST_KEY, selected); router.push(`/learn/${courseSlug}`) }}
            className="text-xs text-white/30 hover:text-white/50 transition-colors whitespace-nowrap"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  )
}

// One-line previews — shows what a concept explanation looks like in each domain
const ANALOGY_PREVIEWS: Record<InterestDomain, string> = {
  cricket:     'Overfitting is like a bowler who only practises against one batter — dominant in nets, but lost in a real match.',
  gaming:      'Overfitting is like memorising spawn points on one map — the moment the rotation changes, you have no strategy.',
  music:       'Overfitting is a musician who only plays a song in the exact key they learned it in — change it by a semitone and they fall apart.',
  photography: 'Overfitting is editing one photo to pixel-perfection then applying that preset to every shot — it ruins them all.',
  travel:      'Overfitting is packing so specifically for one destination that your bag is completely wrong the moment you change countries.',
  movies:      'Overfitting is a screenplay written so tightly around one actor that no other casting works.',
  fitness:     'Overfitting is training exclusively on a fixed machine — your numbers look great, but the strength doesn\'t transfer to real life.',
  chess:       'Overfitting is memorising an opening 20 moves deep with no positional understanding — deviate on move 4 and you\'re lost.',
  cooking:     'Overfitting is perfecting a dish with one brand of tomato — switch brands and the recipe completely breaks.',
  finance:     'Overfitting is a model trained only on a bull market — it backtests brilliantly and fails catastrophically in volatility.',
  business:    'Overfitting is a growth playbook that only works for one city in one season — the moment you expand, it falls apart.',
  sports:      'Overfitting is a tennis player who only practises returns against one training partner\'s serve — any variation breaks their game.',
}
