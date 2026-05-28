'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
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
  const [mobileOpen, setMobileOpen]         = useState(false)
  const [userMenuOpen, setUserMenuOpen]     = useState(false)
  const [notifOpen, setNotifOpen]           = useState(false)
  const [scrolled, setScrolled]             = useState(false)

  const userMenuRef = useRef<HTMLDivElement>(null)
  const notifRef    = useRef<HTMLDivElement>(null)

  const unreadCount = mockNotifications.filter(n => !n.read).length

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
    if (type === 'achievement') return <Trophy className="w-4 h-4 text-amber-400" />
    if (type === 'reminder')    return <Zap className="w-4 h-4 text-cyan-400" />
    return <Sparkles className="w-4 h-4 text-purple-400" />
  }

  return (
    <nav
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-white/5 backdrop-blur-md border-b border-white/5',
      ].join(' ')}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ---- Logo ---- */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group flex-shrink-0"
            aria-label="SkillForge AI — home"
          >
            <div
              className="relative p-2 rounded-xl transition-all duration-300 group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)' }}
            >
              <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
              {/* Glow ring on hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: '0 0 20px rgba(124,58,237,0.6)' }}
                aria-hidden="true"
              />
            </div>
            <span className="font-bold text-lg tracking-tight select-none">
              <span className="text-white">Skill</span>
              <span
                style={{
                  background: 'linear-gradient(135deg, #a78bfa 0%, #22d3ee 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Forge
              </span>
              <span className="text-white/60 font-normal text-sm ml-1">AI</span>
            </span>
          </Link>

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
                      ? 'text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5',
                  ].join(' ')}
                  aria-current={active ? 'page' : undefined}
                >
                  {/* Active background */}
                  {active && (
                    <span
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)' }}
                      aria-hidden="true"
                    />
                  )}

                  <span className={active ? 'text-primary-400' : 'text-white/40 group-hover:text-white/70 transition-colors'} aria-hidden="true">
                    {icon}
                  </span>
                  <span className="relative z-10">{label}</span>

                  {/* Active underline indicator */}
                  {active && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* ---- Right side controls ---- */}
          <div className="flex items-center gap-2">

            {/* --- Notification bell --- */}
            <div className="relative" ref={notifRef}>
              <button
                className={[
                  'relative p-2 rounded-lg text-white/60 hover:text-white',
                  'hover:bg-white/5 transition-all duration-200',
                  notifOpen ? 'bg-white/5 text-white' : '',
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
                      style={{ background: '#7c3aed' }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ background: '#7c3aed' }}
                    />
                  </span>
                )}
              </button>

              {/* Notification dropdown */}
              {notifOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    background: 'rgba(18,18,26,0.96)',
                    border: '1px solid rgba(139,92,246,0.2)',
                    backdropFilter: 'blur(24px)',
                  }}
                  role="dialog"
                  aria-label="Notifications"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                    <h3 className="font-semibold text-white text-sm">Notifications</h3>
                    {unreadCount > 0 && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: 'rgba(124,58,237,0.2)', color: '#a78bfa' }}
                      >
                        {unreadCount} new
                      </span>
                    )}
                  </div>

                  {/* Notification list */}
                  <ul className="divide-y divide-white/5">
                    {mockNotifications.map(notif => (
                      <li
                        key={notif.id}
                        className={[
                          'flex items-start gap-3 px-4 py-3 cursor-pointer',
                          'hover:bg-white/5 transition-colors duration-150',
                          !notif.read ? 'bg-purple-500/5' : '',
                        ].join(' ')}
                      >
                        <div
                          className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: 'rgba(255,255,255,0.06)' }}
                        >
                          {notifTypeIcon(notif.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{notif.title}</p>
                          <p className="text-xs text-white/50 mt-0.5 line-clamp-2">{notif.message}</p>
                          <p className="text-xs text-white/30 mt-1">{notif.time}</p>
                        </div>
                        {!notif.read && (
                          <div
                            className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                            style={{ background: '#7c3aed' }}
                            aria-label="Unread"
                          />
                        )}
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="px-4 py-2.5 border-t border-white/5">
                    <button className="w-full text-xs text-center font-medium transition-colors" style={{ color: '#a78bfa' }}>
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
                  'hover:bg-white/5 transition-all duration-200 group',
                  userMenuOpen ? 'bg-white/5' : '',
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
                  style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)' }}
                  aria-hidden="true"
                >
                  AC
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-white leading-tight">Alex Chen</p>
                  <p className="text-xs text-white/40 leading-tight">Level 14</p>
                </div>
                <ChevronDown
                  className={[
                    'hidden sm:block w-3.5 h-3.5 text-white/40 transition-transform duration-200',
                    userMenuOpen ? 'rotate-180' : '',
                  ].join(' ')}
                  aria-hidden="true"
                />
              </button>

              {/* User dropdown */}
              {userMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    background: 'rgba(18,18,26,0.96)',
                    border: '1px solid rgba(139,92,246,0.2)',
                    backdropFilter: 'blur(24px)',
                  }}
                  role="menu"
                  aria-label="User menu"
                >
                  {/* Profile header */}
                  <div
                    className="px-4 py-4 border-b border-white/5"
                    style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(6,182,212,0.05) 100%)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold text-white flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)' }}
                      >
                        AC
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">Alex Chen</p>
                        <p className="text-xs text-white/50">alex.chen@example.com</p>
                      </div>
                    </div>

                    {/* XP progress bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-white/50">Level 14</span>
                        <span className="text-xs" style={{ color: '#a78bfa' }}>8,420 / 10,000 XP</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: '84.2%',
                            background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
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
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors duration-150"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <span className="text-white/40" aria-hidden="true">{icon}</span>
                        {label}
                      </Link>
                    ))}
                  </div>

                  {/* Divider + Logout */}
                  <div className="border-t border-white/5 py-1.5">
                    <button
                      role="menuitem"
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/5 transition-colors duration-150"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <LogOut className="w-4 h-4" aria-hidden="true" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* --- Mobile menu toggle --- */}
            <button
              className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
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
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
        aria-hidden={!mobileOpen}
        style={{
          borderTop: mobileOpen ? '1px solid rgba(255,255,255,0.07)' : 'none',
          background: 'rgba(10,10,15,0.97)',
          backdropFilter: 'blur(20px)',
        }}
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
                    ? 'text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5',
                ].join(' ')}
                style={active ? {
                  background: 'rgba(124,58,237,0.15)',
                  border: '1px solid rgba(124,58,237,0.25)',
                } : {}}
                aria-current={active ? 'page' : undefined}
              >
                <span className={active ? 'text-purple-400' : 'text-white/40'} aria-hidden="true">
                  {icon}
                </span>
                {label}
                {active && (
                  <span
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ background: '#7c3aed' }}
                    aria-hidden="true"
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* Mobile user section */}
        <div
          className="mx-4 mb-4 rounded-xl overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}
        >
          {/* User info row */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)' }}
            >
              AC
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Alex Chen</p>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-white/40">Lv. 14 ·</span>
                <span className="text-xs" style={{ color: '#a78bfa' }}>8,420 XP</span>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 divide-x divide-white/5">
            <Link
              href="/settings"
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Settings className="w-4 h-4" aria-hidden="true" />
              Settings
            </Link>
            <button className="flex items-center justify-center gap-2 px-4 py-3 text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/5 transition-colors">
              <LogOut className="w-4 h-4" aria-hidden="true" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
