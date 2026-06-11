'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

const STORAGE_KEY = 'sv-theme'

export function applyTheme(theme: 'light' | 'dark') {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

/**
 * Light/dark toggle. The initial theme is resolved before hydration by the
 * inline script in app/layout.tsx (localStorage 'sv-theme', else system
 * preference), so this component only reads and flips the current state.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [mounted, setMounted] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const next = dark ? 'light' : 'dark'
    applyTheme(next)
    localStorage.setItem(STORAGE_KEY, next)
    setDark(!dark)
  }

  return (
    <button
      onClick={toggle}
      aria-label={mounted && dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10 transition-colors ${className}`}
    >
      {mounted && dark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
    </button>
  )
}
