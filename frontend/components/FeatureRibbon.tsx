import { GraduationCap, Sparkles, Award, Medal, Clock } from 'lucide-react'

/**
 * Brand feature ribbon shown directly under the navbar on content pages:
 * 100% Free Forever · AI-Powered Learning · Industry Expert Content ·
 * Certificates & Badges · Learn At Your Own Pace.
 * Pass `withNavbarOffset` when the ribbon is the first element under the
 * fixed navbar (adds pt-16 so it clears it).
 */
const ITEMS = [
  { icon: GraduationCap, label: '100% Free Forever', emoji: '🎓' },
  { icon: Sparkles, label: 'AI-Powered Learning', emoji: '✨' },
  { icon: Award, label: 'Industry Expert Content', emoji: '🏆' },
  { icon: Medal, label: 'Certificates & Badges', emoji: '📜' },
  { icon: Clock, label: 'Learn At Your Own Pace', emoji: '⏱' },
]

export default function FeatureRibbon({ withNavbarOffset = false }: { withNavbarOffset?: boolean }) {
  return (
    <div className={`${withNavbarOffset ? 'pt-16' : ''} border-b border-slate-200 dark:border-white/10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 overflow-x-auto py-2.5 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:justify-center">
          {ITEMS.map((r) => {
            const Icon = r.icon
            return (
              <div
                key={r.label}
                className="flex items-center gap-1.5 shrink-0 text-xs font-medium text-amber-600 dark:text-amber-400"
              >
                <span aria-hidden>{r.emoji}</span>
                <Icon className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">{r.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
