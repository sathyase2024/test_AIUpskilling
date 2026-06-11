'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Bot, Code, User } from 'lucide-react'

/**
 * App-wide mobile bottom navigation (per the SkillVeris mobile design):
 * Home · Learn · AI Mentor (elevated center) · Practice · Profile.
 * Hidden on immersive full-height workspaces (course player, Code Lab
 * editor) where it would cover the fixed-height layout.
 */
const IMMERSIVE_PREFIXES = ['/learn/', '/codelab']

export default function BottomNav() {
  const pathname = usePathname()
  if (IMMERSIVE_PREFIXES.some((p) => pathname.startsWith(p))) return null

  const items = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/topics', label: 'Learn', icon: BookOpen },
    { href: '/topics?mentor=1', label: 'AI Mentor', icon: Bot, center: true },
    { href: '/codelab', label: 'Practice', icon: Code },
    { href: '/profile', label: 'Profile', icon: User },
  ]

  const isActive = (href: string) => {
    const base = href.split('?')[0]
    return base === '/' ? pathname === '/' : pathname.startsWith(base)
  }

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0d0d14]/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile navigation"
    >
      <div className="flex items-end justify-around px-2 h-16">
        {items.map(({ href, label, icon: Icon, center }) => {
          const active = isActive(href)
          if (center) {
            return (
              <Link key={label} href={href} aria-label={label} className="flex flex-col items-center -mt-5">
                <span className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 ring-4 ring-amber-500/20 shadow-lg shadow-amber-500/30 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </span>
                <span className="text-[10px] mt-1 mb-1.5 font-medium text-amber-600 dark:text-amber-400">{label}</span>
              </Link>
            )
          }
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`flex flex-col items-center gap-1 py-2 px-3 ${
                active
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-slate-400 dark:text-white/40'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
