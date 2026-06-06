'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AuthGuard from '@/components/AuthGuard'
import { apiGet } from '@/lib/api'
import {
  Flame,
  Zap,
  BookOpen,
  Clock,
  TrendingUp,
  ChevronRight,
  Play,
  Brain,
  Sparkles,
  Award,
  CheckCircle,
  Star,
  Target,
  BarChart2,
  ArrowUpRight,
  Activity,
  Shield,
  Cloud,
  Database,
  LayoutDashboard,
  Map,
  Trophy,
  Settings,
  Bell,
  User,
  ChevronDown,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface StatCard {
  label: string
  value: string
  sub: string
  icon: React.ReactNode
  gradient: string
  iconBg: string
  progress?: number
}

interface Skill {
  name: string
  level: number
  color: string
}

interface ActivityItem {
  icon: React.ReactNode
  title: string
  sub: string
  time: string
  color: string
  bgColor: string
}

interface Course {
  title: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  gradient: string
  icon: React.ReactNode
  rating: string
  students: string
}

interface Milestone {
  label: string
  done: boolean
}

// ─── Data ────────────────────────────────────────────────────────────────────

const milestones: Milestone[] = [
  { label: 'Java Basics', done: true },
  { label: 'OOP & Design', done: true },
  { label: 'Spring Core', done: true },
  { label: 'REST APIs', done: false },
  { label: 'Microservices', done: false },
  { label: 'Cloud Deploy', done: false },
]

const recentActivity: ActivityItem[] = [
  {
    icon: <CheckCircle className="w-4 h-4" />,
    title: 'Completed: Spring Boot Annotations',
    sub: 'Spring Boot · Lesson 12',
    time: '2h ago',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: <Star className="w-4 h-4" />,
    title: 'Quiz Passed: REST Principles',
    sub: 'Score: 92% · 15 XP earned',
    time: '4h ago',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: <Flame className="w-4 h-4" />,
    title: 'Streak Milestone: 15 Days!',
    sub: "Keep it going — you're on fire",
    time: '1d ago',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
  },
  {
    icon: <Award className="w-4 h-4" />,
    title: 'Badge Unlocked: API Builder',
    sub: 'Completed 5 REST API lessons',
    time: '2d ago',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: <BookOpen className="w-4 h-4" />,
    title: 'Started: Docker Fundamentals',
    sub: 'DevOps track · Module 1',
    time: '3d ago',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
  },
]

const recommendedCourses: Course[] = [
  {
    title: 'React Hooks Deep Dive',
    category: 'Frontend',
    difficulty: 'Intermediate',
    duration: '6h 30m',
    gradient: 'from-cyan-500 to-blue-600',
    icon: <Activity className="w-6 h-6 text-white" />,
    rating: '4.9',
    students: '8.2K',
  },
  {
    title: 'Docker Fundamentals',
    category: 'DevOps',
    difficulty: 'Beginner',
    duration: '4h 15m',
    gradient: 'from-sky-500 to-indigo-600',
    icon: <Shield className="w-6 h-6 text-white" />,
    rating: '4.8',
    students: '12.1K',
  },
  {
    title: 'PostgreSQL Performance',
    category: 'Databases',
    difficulty: 'Advanced',
    duration: '8h 45m',
    gradient: 'from-blue-600 to-purple-600',
    icon: <Database className="w-6 h-6 text-white" />,
    rating: '4.7',
    students: '5.4K',
  },
]

const aiInsights: string[] = [
  "Focus on Docker next — it's the fastest path to your Java Developer goal.",
  'You learn best in 30-min sessions between 7–9 AM based on your history.',
  'Completing REST APIs this week puts you 2 weeks ahead of your target date.',
]

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
  { icon: Map, label: 'Learning Path', id: 'path' },
  { icon: BarChart2, label: 'Skills', id: 'skills' },
  { icon: Trophy, label: 'Achievements', id: 'achievements' },
  { icon: Activity, label: 'Activity', id: 'activity' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function difficultyColor(d: Course['difficulty']) {
  return d === 'Beginner'
    ? 'text-green-400 bg-green-400/10 border-green-400/20'
    : d === 'Intermediate'
    ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
    : 'text-red-400 bg-red-400/10 border-red-400/20'
}

function buildStreakDays(total = 30, streakLength = 15): boolean[] {
  return Array.from({ length: total }, (_, i) => i >= total - streakLength)
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCards() {
  const [overview, setOverview] = useState<{
    completedLessons: number
    totalXp: number
    topicsStarted?: number
    level: number
    streak: number
  } | null>(null)
  const [xpAnim, setXpAnim] = useState(0)

  useEffect(() => {
    apiGet<{ completedLessons: number; totalXp: number; topicsStarted?: number; level: number; streak: number }>(
      '/progress/overview'
    )
      .then((data) => {
        setOverview(data)
        const pct = (data.totalXp % 1000) / 10
        setTimeout(() => setXpAnim(pct), 400)
      })
      .catch(() => {
        // leave overview null; values will show as loading state
      })
  }, [])

  const loading = overview === null
  const xpProgress = overview ? (overview.totalXp % 1000) / 10 : xpAnim

  const cards: StatCard[] = [
    {
      label: 'Current XP',
      value: loading ? '—' : overview!.totalXp.toLocaleString(),
      sub: loading
        ? 'Loading…'
        : `${1000 - (overview!.totalXp % 1000)} XP to Level ${overview!.level + 1}`,
      icon: <Zap className="w-5 h-5 text-yellow-300" />,
      gradient: 'from-yellow-500/30 to-orange-500/20',
      iconBg: 'bg-yellow-500/20',
      progress: xpProgress,
    },
    {
      label: 'Courses Completed',
      value: loading ? '—' : String(overview!.completedLessons),
      sub: loading ? 'Loading…' : `${overview!.topicsStarted ?? 0} topics started`,
      icon: <BookOpen className="w-5 h-5 text-cyan-300" />,
      gradient: 'from-cyan-500/20 to-blue-500/10',
      iconBg: 'bg-cyan-500/20',
    },
    {
      label: 'Hours Learned',
      value: '—',
      sub: 'Coming soon',
      icon: <Clock className="w-5 h-5 text-purple-300" />,
      gradient: 'from-purple-500/20 to-pink-500/10',
      iconBg: 'bg-purple-500/20',
    },
    {
      label: 'Current Streak',
      value: loading ? '—' : `${overview!.streak} days`,
      sub: 'Keep it up!',
      icon: <Flame className="w-5 h-5 text-orange-400" />,
      gradient: 'from-orange-500/20 to-red-500/10',
      iconBg: 'bg-orange-500/20',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex flex-col gap-3 overflow-hidden hover:border-white/20 transition-all hover:-translate-y-0.5`}
        >
          {/* Subtle gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-60 pointer-events-none rounded-2xl`} />
          <div className="relative">
            <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center`}>
              {c.icon}
            </div>
          </div>
          <div className={`relative transition-opacity duration-300 ${loading ? 'opacity-40' : 'opacity-100'}`}>
            <p className="text-white/50 text-xs font-medium">{c.label}</p>
            <p className="text-white text-2xl font-bold mt-0.5">{c.value}</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3 text-green-400" />
              <p className="text-green-400 text-xs">{c.sub}</p>
            </div>
          </div>
          {c.progress !== undefined && (
            <div className="relative space-y-1">
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-1000"
                  style={{ width: `${c.progress}%` }}
                />
              </div>
              <p className="text-white/30 text-[10px]">Level {overview?.level ?? '…'} · {Math.round(c.progress)}% to next</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function LearningPath() {
  const [prog, setProg] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setProg(65), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Target className="w-4 h-4 text-purple-400" />
            <span className="text-white/50 text-xs font-medium uppercase tracking-wider">Active Path</span>
          </div>
          <h2 className="text-white text-xl font-bold">Full Stack Java Developer</h2>
          <p className="text-white/50 text-sm mt-1">
            Current module:{' '}
            <span className="text-cyan-400 font-medium">Spring Boot REST APIs</span>
          </p>
        </div>
        <div className="text-right">
          <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {prog}%
          </span>
          <p className="text-white/40 text-xs mt-0.5">complete</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 transition-all duration-1000 relative"
          style={{ width: `${prog}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        </div>
      </div>

      {/* Next up + Continue button */}
      <div className="mt-5 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-white/40 text-xs mb-1">Next up</p>
          <p className="text-white text-sm font-medium">
            Lesson 5: Request Validation &amp; Error Handling
          </p>
        </div>
        <Link
          href="/learn"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shrink-0 shadow-lg shadow-purple-500/25"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          Continue
        </Link>
      </div>

      {/* Milestone badges */}
      <div className="mt-6 flex flex-wrap gap-2">
        {milestones.map((m) => (
          <div
            key={m.label}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              m.done
                ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                : 'bg-white/5 border border-white/10 text-white/40'
            }`}
          >
            {m.done ? (
              <CheckCircle className="w-3 h-3" />
            ) : (
              <div className="w-3 h-3 rounded-full border border-white/30" />
            )}
            {m.label}
          </div>
        ))}
      </div>
    </div>
  )
}

const SKILL_META: Record<string, { name: string; color: string }> = {
  programming: { name: 'Programming', color: 'from-orange-500 to-red-500' },
  frontend:    { name: 'Frontend',    color: 'from-cyan-500 to-blue-500' },
  backend:     { name: 'Backend',     color: 'from-green-500 to-emerald-400' },
  devops:      { name: 'DevOps',      color: 'from-sky-500 to-cyan-400' },
  'ai-ml':     { name: 'AI / ML',     color: 'from-purple-500 to-violet-400' },
  databases:   { name: 'Databases',   color: 'from-blue-600 to-indigo-500' },
}

function SkillBars() {
  const [skills, setSkills] = useState<Skill[]>(
    Object.values(SKILL_META).map((m) => ({ name: m.name, level: 0, color: m.color }))
  )
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    apiGet<Record<string, number>>('/progress/skills')
      .then((data) => {
        const mapped = Object.entries(data)
          .filter(([key]) => SKILL_META[key])
          .map(([key, pct]) => ({
            name: SKILL_META[key].name,
            level: pct,
            color: SKILL_META[key].color,
          }))
        setSkills(mapped)
        setTimeout(() => setAnimated(true), 300)
      })
      .catch(() => {
        setTimeout(() => setAnimated(true), 300)
      })
  }, [])

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full">
      <div className="flex items-center gap-2 mb-5">
        <BarChart2 className="w-4 h-4 text-purple-400" />
        <h3 className="text-white font-semibold">Skill Progress</h3>
      </div>
      <div className="space-y-4">
        {skills.map((s) => (
          <div key={s.name}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-white/70 font-medium">{s.name}</span>
              <span className="text-white/40">{s.level}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${s.color} transition-all duration-1000`}
                style={{ width: animated ? `${s.level}%` : '0%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RecentActivityFeed() {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full">
      <div className="flex items-center gap-2 mb-5">
        <Activity className="w-4 h-4 text-cyan-400" />
        <h3 className="text-white font-semibold">Recent Activity</h3>
      </div>
      <div className="space-y-1">
        {recentActivity.map((item, i) => (
          <div key={i} className="flex gap-3 py-2.5 border-b border-white/5 last:border-0">
            <div
              className={`mt-0.5 shrink-0 w-8 h-8 rounded-full ${item.bgColor} flex items-center justify-center ${item.color}`}
            >
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/80 text-sm font-medium leading-snug">{item.title}</p>
              <p className="text-white/40 text-xs mt-0.5">{item.sub}</p>
            </div>
            <span className="text-white/30 text-xs shrink-0 pt-0.5 whitespace-nowrap">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RecommendedCourses() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">Recommended for You</h3>
        <Link
          href="/topics"
          className="text-purple-400 text-sm flex items-center gap-1 hover:text-purple-300 transition-colors"
        >
          View all <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {recommendedCourses.map((c) => (
          <div
            key={c.title}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10"
          >
            {/* Thumbnail */}
            <div className={`h-28 bg-gradient-to-br ${c.gradient} flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_50%,white,transparent_60%)]" />
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                {c.icon}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 text-[10px] font-medium border border-purple-500/20">
                  {c.category}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${difficultyColor(c.difficulty)}`}
                >
                  {c.difficulty}
                </span>
              </div>
              <p className="text-white font-semibold text-sm leading-snug">{c.title}</p>
              <div className="flex items-center justify-between mt-2 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-white/40" />
                  <span className="text-white/40 text-xs">{c.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white/60 text-xs">{c.rating}</span>
                  <span className="text-white/30 text-xs">· {c.students}</span>
                </div>
              </div>
              <Link
                href="/topics"
                className="block text-center py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-md shadow-purple-500/20"
              >
                Start Learning
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StreakCalendar({ streak }: { streak: number }) {
  const days = buildStreakDays(30, streak)

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-400" />
          <h3 className="text-white font-semibold">Your Learning Streak</h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-white/40">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-emerald-500" />
            Active
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-white/10" />
            Inactive
          </div>
        </div>
      </div>
      <p className="text-white/40 text-sm mb-5">Last 30 days · {streak}-day current streak</p>
      <div className="grid grid-cols-[repeat(15,_1fr)] gap-2">
        {days.map((active, i) => (
          <div
            key={i}
            title={`Day ${i + 1}`}
            className={`aspect-square rounded-full transition-all ${
              active
                ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-[0_0_6px_rgba(52,211,153,0.5)]'
                : 'bg-white/10'
            }`}
          />
        ))}
      </div>
      <p className="mt-5 text-sm text-white/60 font-medium">
        🎉 You&apos;re on a roll! Keep learning today to maintain your{' '}
        <span className="text-orange-400 font-bold">{streak}-day streak</span>.
      </p>
    </div>
  )
}

function AIInsights() {
  return (
    <div className="relative bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 overflow-hidden">
      {/* Purple glow effect */}
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600/40 to-cyan-500/20 flex items-center justify-center border border-purple-500/30">
            <Brain className="w-4 h-4 text-purple-400" />
          </div>
          <h3 className="text-white font-semibold">AI Learning Insights</h3>
          <span className="ml-2 px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-medium">
            Powered by AI
          </span>
        </div>
        <p className="text-white/50 text-sm mb-5 ml-10">
          Based on your progress, here&apos;s what AI recommends…
        </p>

        <div className="space-y-3 mb-5">
          {aiInsights.map((ins, i) => (
            <div
              key={i}
              className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <p className="text-white/70 text-sm leading-relaxed">{ins}</p>
            </div>
          ))}
        </div>

        {/* Velocity banner */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-cyan-500/20 border border-purple-500/20">
          <TrendingUp className="w-5 h-5 text-cyan-400 shrink-0" />
          <p className="text-white/80 text-sm font-medium">
            Your learning velocity is{' '}
            <span className="text-cyan-400 font-bold">23% above average</span> this month.
          </p>
        </div>
      </div>
    </div>
  )
}

function DashboardSidebar({
  activeSection,
  onSelect,
}: {
  activeSection: string
  onSelect: (id: string) => void
}) {
  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 gap-1 pt-2">
      <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest px-3 mb-2">
        Dashboard
      </p>
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activeSection === item.id
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
              isActive
                ? 'bg-gradient-to-r from-purple-600/30 to-cyan-500/10 text-white border border-purple-500/30'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : ''}`} />
            {item.label}
          </button>
        )
      })}

      <div className="mt-auto pt-6 border-t border-white/10">
        <Link
          href="/topics"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all"
        >
          <BookOpen className="w-4 h-4" />
          Browse Topics
        </Link>
        <Link
          href="/paths"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all"
        >
          <Map className="w-4 h-4" />
          Career Paths
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
    </aside>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [notifOpen, setNotifOpen] = useState(false)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    apiGet<{ id: number | string; name: string; email: string; xp?: number; level?: number; streak?: number; hobbies?: string[] }>(
      '/users/me'
    )
      .then((user) => {
        setStreak(user.streak ?? 0)
      })
      .catch(() => {
        // leave streak at 0
      })
  }, [])

  return (
    <AuthGuard>
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0f' }}>
      <Navbar />

      <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Dashboard top bar */}
        <div className="flex items-center justify-between py-4 border-b border-white/5">
          <div className="flex items-center gap-2 text-sm text-white/40">
            <span>Home</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/70">Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 border border-[#0a0a0f]" />
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
                <User className="w-3 h-3 text-white" />
              </div>
              <span className="text-white/70 text-sm font-medium">Alex</span>
              <ChevronDown className="w-3.5 h-3.5 text-white/40" />
            </div>
          </div>
        </div>

        <div className="flex gap-8 py-6 pb-16">
          {/* Sidebar */}
          <DashboardSidebar activeSection={activeSection} onSelect={setActiveSection} />

          {/* Main content */}
          <main className="flex-1 min-w-0 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-3xl font-bold text-white">Good morning, Alex! 👋</h1>
                <p className="text-white/50 mt-1">Continue your learning journey</p>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-orange-500/30 bg-orange-500/10">
                <Flame className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-white font-bold text-sm leading-none">{streak} day streak 🔥</p>
                  <p className="text-orange-300/70 text-[10px] mt-0.5">Keep it up!</p>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <StatCards />

            {/* Current Learning Path */}
            <LearningPath />

            {/* Skill Radar + Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SkillBars />
              <RecentActivityFeed />
            </div>

            {/* Recommended Courses */}
            <RecommendedCourses />

            {/* Streak Calendar */}
            <StreakCalendar streak={streak} />

            {/* AI Insights */}
            <AIInsights />
          </main>
        </div>
      </div>
    </div>
    </AuthGuard>
  )
}
