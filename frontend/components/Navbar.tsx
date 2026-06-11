'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { getStoredUser, logout, type StoredUser } from '@/lib/api'
import BrandLogo from '@/components/BrandLogo'
import ThemeToggle from '@/components/ThemeToggle'
import {
  Sparkles,
  Menu,
  X,
  Bell,
  User,
  ChevronDown,
  LogOut,
  Settings,
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Trophy,
  Zap,
  Target,
  Code,
} from 'lucide-react'

/* -------------------------------------------------------
   Nav link definitions
------------------------------------------------------- */
interface NavLink {
  href: string
  label: string
  icon: React.ReactNode
}

const navLinks: NavLink[] = [
  {
    href: '/',
    label: 'Home',
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    href: '/topics',
    label: 'Topics',
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    href: '/paths',
    label: 'Paths',
    icon: <Target className="w-4 h-4" />,
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    href: '/codelab',
    label: 'Code Lab',
    icon: <Code className="w-4 h-4" />,
  },
]

/* -------------------------------------------------------
   Sample notifications (mock data)
------------------------------------------------------- */
interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: 'achievement' | 'reminder' | 'update'
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Achievement Unlocked!',
    message: 'You earned the "7-Day Streak" badge',
    time: '2 min ago',
    read: false,
    type: 'achievement',
  },
  {
    id: '2',
    title: 'New Lesson Available',
    message: 'Spring Security JWT — Part 2 is live',
    time: '1 hr ago',
    read: false,
    type: 'update',
  },
  {
    id: '3',
    title: 'Daily Reminder',
    message: 'Keep your streak going — 15 min left today',
    time: '3 hrs ago',
    read: true,
    type: 'reminder',
  },
]

/* -------------------------------------------------------
   Main Navbar component
------------------------------------------------------- */
export default function Navbar() {
  const pathname = usePathname()
  const router   = useRouter()
  const [mobileOpen, setMobileOpen]         = useState(false)
  const [userMenuOpen, setUserMenuOpen]     = useState(false)
  const [notifOpen, setNotifOpen]           = useState(false)
  const [scrolled, setScrolled]             = useState(false)
  const [user, setUser]                     = useState<StoredUser | null>(null)
  const [mounted, setMounted]               = useState(false)

  const userMenuRef = useRef<HTMLDivElement>(null)
  const notifRef    = useRef<HTMLDivElement>(null)

  const unreadCount = mockNotifications.filter(n => !n.read).length

  /* Load the signed-in user from localStorage (client-only) */
  useEffect(() => {
    setMounted(true)
    setUser(getStoredUser())
  }, [pathname])

  /* Derived display values with sensible fallbacks */
  const displayName  = user?.name || 'Guest'
  const displayEmail = user?.email || 'Sign in to sync your progress'
  const initials = (user?.name || 'G')
    .split(' ')
    .map(p => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const level = user?.level ?? 1
  const xp    = user?.xp ?? 0

  async function handleLogout() {
    await logout()
    router.push('/')
  }

  /* Detect scroll for background opacity change */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close dropdowns on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  /* ---- helpers ---- */
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const notifTypeIcon = (type: Notification['type']) => {
    if (type === 'achievement') return <Trophy className="w-4 h-4 text-amber-500" />
    if (type === 'reminder')    return <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
    return <Sparkles className="w-4 h-4 text-slate-400 dark:text-white/40" />
  }

  return (
    <nav
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/85 dark:bg-[#0d0d14]/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-sm'
          : 'bg-white/85 dark:bg-[#0d0d14]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10',
      ].join(' ')}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ---- Logo ---- */}
          <BrandLogo />

          {/* ---- Desktop nav links ---- */}
          <div className="hidden md:flex items-center gap-1" role="menubar">
            {navLinks.map(({ href, label, icon }) => {
              const active = isActive(href)
              return (
                <Link
                  key={href}
                  href={href}
                  role="menuitem"
                  className={[
                    'relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium',
                    'transition-all duration-200 group',
                    active
                      ? 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/15'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10',
                  ].join(' ')}
                  aria-current={active ? 'page' : undefined}
                >
                  {/* Active background */}
                  {active && (
                    <span
                      className="absolute inset-0 rounded-lg bg-amber-500/[0.08] border border-amber-500/25"
                      aria-hidden="true"
                    />
                  )}

                  <span className={active ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 group-hover:text-slate-600 dark:text-white/40 dark:group-hover:text-white/70 transition-colors'} aria-hidden="true">
                    {icon}
                  </span>
                  <span className="relative z-10">{label}</span>

                  {/* Active underline indicator */}
                  {active && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #f59e0b, #d97706)' }}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* ---- Right side controls ---- */}
          <div className="flex items-center gap-2">

            {/* --- Theme toggle --- */}
            <ThemeToggle />

            {/* --- Notification bell --- */}
            <div className="relative" ref={notifRef}>
              <button
                className={[
                  'relative p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white',
                  'hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200',
                  notifOpen ? 'bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white' : '',
                ].join(' ')}
                onClick={() => {
                  setNotifOpen(v => !v)
                  setUserMenuOpen(false)
                }}
                aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
                aria-expanded={notifOpen}
                aria-haspopup="true"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span
                    className="absolute top-1.5 right-1.5 flex h-2 w-2"
                    aria-hidden="true"
                  >
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ background: '#f59e0b' }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ background: '#f59e0b' }}
                    />
                  </span>
                )}
              </button>

              {/* Notification dropdown */}
              {notifOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-[#16161e] border border-slate-200 dark:border-white/10"
                  role="dialog"
                  aria-label="Notifications"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-white/10">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Notifications</h3>
                    {unreadCount > 0 && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30"
                      >
                        {unreadCount} new
                      </span>
                    )}
                  </div>

                  {/* Notification list */}
                  <ul className="divide-y divide-slate-100 dark:divide-white/10">
                    {mockNotifications.map(notif => (
                      <li
                        key={notif.id}
                        className={[
                          'flex items-start gap-3 px-4 py-3 cursor-pointer',
                          'hover:bg-slate-50 dark:hover:bg-white/10 transition-colors duration-150',
                          !notif.read ? 'bg-amber-50/60 dark:bg-amber-500/10' : '',
                        ].join(' ')}
                      >
                        <div
                          className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-white/10"
                        >
                          {notifTypeIcon(notif.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{notif.title}</p>
                          <p className="text-xs text-slate-500 dark:text-white/50 mt-0.5 line-clamp-2">{notif.message}</p>
                          <p className="text-xs text-slate-400 dark:text-white/40 mt-1">{notif.time}</p>
                        </div>
                        {!notif.read && (
                          <div
                            className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                            style={{ background: '#f59e0b' }}
                            aria-label="Unread"
                          />
                        )}
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="px-4 py-2.5 border-t border-slate-100 dark:border-white/10">
                    <button className="w-full text-xs text-center font-medium transition-colors text-amber-600 dark:text-amber-400">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* --- User avatar & dropdown --- */}
            <div className="relative" ref={userMenuRef}>
              <button
                className={[
                  'flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl',
                  'hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200 group',
                  userMenuOpen ? 'bg-slate-100 dark:bg-white/10' : '',
                ].join(' ')}
                onClick={() => {
                  setUserMenuOpen(v => !v)
                  setNotifOpen(false)
                }}
                aria-label="User menu"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                {/* Avatar */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)' }}
                  aria-hidden="true"
                >
                  {initials}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">{displayName}</p>
                  <p className="text-xs text-slate-500 dark:text-white/50 leading-tight">Level {level}</p>
                </div>
                <ChevronDown
                  className={[
                    'hidden sm:block w-3.5 h-3.5 text-slate-400 dark:text-white/40 transition-transform duration-200',
                    userMenuOpen ? 'rotate-180' : '',
                  ].join(' ')}
                  aria-hidden="true"
                />
              </button>

              {/* User dropdown */}
              {userMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-[#16161e] border border-slate-200 dark:border-white/10"
                  role="menu"
                  aria-label="User menu"
                >
                  {/* Profile header */}
                  <div
                    className="px-4 py-4 border-b border-slate-100 dark:border-white/10"
                    style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0.02) 100%)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold text-white flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)' }}
                      >
                        {initials}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white text-sm">{displayName}</p>
                        <p className="text-xs text-slate-500 dark:text-white/50">{displayEmail}</p>
                      </div>
                    </div>

                    {/* XP progress bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-500 dark:text-white/50">Level {level}</span>
                        <span className="text-xs text-amber-700 dark:text-amber-300">{xp.toLocaleString()} XP</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden bg-slate-200 dark:bg-white/10">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(100, (xp % 10000) / 100)}%`,
                            background: 'linear-gradient(90deg, #f59e0b, #d97706)',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="py-1.5">
                    {[
                      { href: '/dashboard',  icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard' },
                      { href: '/profile',    icon: <User className="w-4 h-4" />,            label: 'My Profile' },
                      { href: '/progress',   icon: <Trophy className="w-4 h-4" />,          label: 'My Progress' },
                      { href: '/paths',      icon: <GraduationCap className="w-4 h-4" />,   label: 'My Learning Path' },
                      { href: '/settings',   icon: <Settings className="w-4 h-4" />,        label: 'Settings' },
                    ].map(({ href, icon, label }) => (
                      <Link
                        key={href}
                        href={href}
                        role="menuitem"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-colors duration-150"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <span className="text-slate-400 dark:text-white/40" aria-hidden="true">{icon}</span>
                        {label}
                      </Link>
                    ))}
                  </div>

                  {/* Divider + Logout / Sign in */}
                  <div className="border-t border-slate-100 dark:border-white/10 py-1.5">
                    {mounted && !user ? (
                      <Link
                        href="/login"
                        role="menuitem"
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-colors duration-150"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" aria-hidden="true" />
                        Sign In
                      </Link>
                    ) : (
                      <button
                        role="menuitem"
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-500/10 transition-colors duration-150"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4" aria-hidden="true" />
                        Sign Out
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* --- Mobile menu toggle --- */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-all duration-200"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen
                ? <X className="w-5 h-5" aria-hidden="true" />
                : <Menu className="w-5 h-5" aria-hidden="true" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          Mobile menu panel
      ======================================================== */}
      <div
        id="mobile-menu"
        className={[
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-[#16161e]',
          mobileOpen
            ? 'max-h-[600px] opacity-100 border-t border-slate-200 dark:border-white/10 shadow-xl'
            : 'max-h-0 opacity-0',
        ].join(' ')}
        aria-hidden={!mobileOpen}
      >
        <div className="px-4 py-4 space-y-1">

          {/* Nav links */}
          {navLinks.map(({ href, label, icon }) => {
            const active = isActive(href)
            return (
              <Link
                key={href}
                href={href}
                className={[
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                  active
                    ? 'text-amber-600 bg-amber-50 border border-amber-200 dark:text-amber-400 dark:bg-amber-500/15 dark:border-amber-500/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10',
                ].join(' ')}
                aria-current={active ? 'page' : undefined}
              >
                <span className={active ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-white/40'} aria-hidden="true">
                  {icon}
                </span>
                {label}
                {active && (
                  <span
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ background: '#f59e0b' }}
                    aria-hidden="true"
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* Mobile user section */}
        <div
          className="mx-4 mb-4 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5"
        >
          {/* User info row */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-white/10">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)' }}
            >
              {initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{displayName}</p>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500 dark:text-white/50">Lv. {level} ·</span>
                <span className="text-xs text-amber-700 dark:text-amber-300">{xp.toLocaleString()} XP</span>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-white/10">
            <Link
              href="/settings"
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
            >
              <Settings className="w-4 h-4" aria-hidden="true" />
              Settings
            </Link>
            {mounted && !user ? (
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
              >
                <User className="w-4 h-4" aria-hidden="true" />
                Sign In
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" aria-hidden="true" />
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
