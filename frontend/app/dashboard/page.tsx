'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import FeatureRibbon from '@/components/FeatureRibbon'
import AuthGuard from '@/components/AuthGuard'
import { apiGet } from '@/lib/api'
import HobbySelector from '@/components/HobbySelector'
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
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: <Star className="w-4 h-4" />,
    title: 'Quiz Passed: REST Principles',
    sub: 'Score: 92% · 15 XP earned',
    time: '4h ago',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    icon: <Flame className="w-4 h-4" />,
    title: 'Streak Milestone: 15 Days!',
    sub: "Keep it going — you're on fire",
    time: '1d ago',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
  {
    icon: <Award className="w-4 h-4" />,
    title: 'Badge Unlocked: API Builder',
    sub: 'Completed 5 REST API lessons',
    time: '2d ago',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    icon: <BookOpen className="w-4 h-4" />,
    title: 'Started: Docker Fundamentals',
    sub: 'DevOps track · Module 1',
    time: '3d ago',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
]

const recommendedCourses: Course[] = [
  {
    title: 'React Hooks Deep Dive',
    category: 'Frontend',
    difficulty: 'Intermediate',
    duration: '6h 30m',
    gradient: 'from-amber-500 to-orange-600',
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
    gradient: 'from-blue-600 to-indigo-600',
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
    ? 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-500/15 dark:border-emerald-500/30'
    : d === 'Intermediate'
    ? 'text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-300 dark:bg-blue-500/15 dark:border-blue-500/30'
    : 'text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-500/15 dark:border-amber-500/30'
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
      icon: <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      gradient: 'from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10',
      iconBg: 'bg-amber-100 dark:bg-amber-500/20',
      progress: xpProgress,
    },
    {
      label: 'Courses Completed',
      value: loading ? '—' : String(overview!.completedLessons),
      sub: loading ? 'Loading…' : `${overview!.topicsStarted ?? 0} topics started`,
      icon: <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      gradient: 'from-blue-50 to-sky-50 dark:from-blue-500/10 dark:to-sky-500/10',
      iconBg: 'bg-blue-100 dark:bg-blue-500/20',
    },
    {
      label: 'Hours Learned',
      value: '—',
      sub: 'Coming soon',
      icon: <Clock className="w-5 h-5 text-slate-500 dark:text-white/50" />,
      gradient: 'from-slate-50 to-slate-100 dark:from-white/5 dark:to-white/10',
      iconBg: 'bg-slate-100 dark:bg-white/10',
    },
    {
      label: 'Current Streak',
      value: loading ? '—' : `${overview!.streak} days`,
      sub: 'Keep it up!',
      icon: <Flame className="w-5 h-5 text-orange-500" />,
      gradient: 'from-orange-50 to-red-50 dark:from-orange-500/10 dark:to-red-500/10',
      iconBg: 'bg-orange-100 dark:bg-orange-500/20',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`relative bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10 shadow-sm rounded-2xl p-5 flex flex-col gap-3 overflow-hidden hover:border-amber-300 dark:hover:border-amber-500/30 hover:shadow-md transition-all hover:-translate-y-0.5`}
        >
          {/* Subtle gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-60 pointer-events-none rounded-2xl`} />
          <div className="relative">
            <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center`}>
              {c.icon}
            </div>
          </div>
          <div className={`relative transition-opacity duration-300 ${loading ? 'opacity-40' : 'opacity-100'}`}>
            <p className="text-slate-500 dark:text-white/50 text-xs font-medium">{c.label}</p>
            <p className="text-slate-900 dark:text-white text-2xl font-bold mt-0.5">{c.value}</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3 text-emerald-600" />
              <p className="text-emerald-600 text-xs">{c.sub}</p>
            </div>
          </div>
          {c.progress !== undefined && (
            <div className="relative space-y-1">
              <div className="h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-1000"
                  style={{ width: `${c.progress}%` }}
                />
              </div>
              <p className="text-slate-400 dark:text-white/40 text-[10px]">Level {overview?.level ?? '…'} · {Math.round(c.progress)}% to next</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function LearningPath() {
  const [topic, setTopic] = useState<{ name: string; slug: string; description: string } | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    apiGet<{ topics: Array<{ name: string; slug: string; description: string }> }>('/topics?limit=10')
      .then((data) => {
        const first = Array.isArray(data) ? (data as Array<{ name: string; slug: string; description: string }>)[0] : data.topics?.[0]
        if (first) setTopic(first)
      })
      .catch(() => {})

    apiGet<{ completedLessons: number }>('/progress/overview')
      .then((data) => {
        const pct = Math.min(100, (data.completedLessons / 35) * 100)
        setTimeout(() => setProgress(pct), 400)
      })
      .catch(() => {})
  }, [])

  const prog = progress

  return (
    <div className="bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10 shadow-sm rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Target className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-slate-500 dark:text-white/50 text-xs font-medium uppercase tracking-wider">Active Path</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-xl font-bold">{topic ? topic.name : '—'}</h2>
          <p className="text-slate-500 dark:text-white/50 text-sm mt-1">
            Current module:{' '}
            <span className="text-amber-600 dark:text-amber-400 font-medium">{topic ? topic.description : '—'}</span>
          </p>
        </div>
        <div className="text-right">
          <span className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
            {topic ? `${Math.round(prog)}%` : '—'}
          </span>
          <p className="text-slate-400 dark:text-white/40 text-xs mt-0.5">complete</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-1000 relative"
          style={{ width: `${prog}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_8px_rgba(217,119,6,0.6)]" />
        </div>
      </div>

      {/* Next up + Continue button */}
      <div className="mt-5 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-slate-400 dark:text-white/40 text-xs mb-1">Next up</p>
          <p className="text-slate-900 dark:text-white text-sm font-medium">
            Continue where you left off
          </p>
        </div>
        <Link
          href={topic ? `/learn/${topic.slug}` : '/learn'}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold hover:from-amber-400 hover:to-amber-500 transition-all shrink-0 shadow-lg shadow-amber-500/25"
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
                ? 'bg-amber-50 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-500/30 text-amber-700 dark:text-amber-300'
                : 'bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10 text-slate-400 dark:text-white/40'
            }`}
          >
            {m.done ? (
              <CheckCircle className="w-3 h-3" />
            ) : (
              <div className="w-3 h-3 rounded-full border border-slate-300 dark:border-white/15" />
            )}
            {m.label}
          </div>
        ))}
      </div>
    </div>
  )
}

const SKILL_META: Record<string, { name: string; color: string }> = {
  programming: { name: 'Programming', color: 'from-amber-500 to-amber-600' },
  frontend:    { name: 'Frontend',    color: 'from-amber-500 to-amber-600' },
  backend:     { name: 'Backend',     color: 'from-amber-500 to-amber-600' },
  devops:      { name: 'DevOps',      color: 'from-amber-500 to-amber-600' },
  'ai-ml':     { name: 'AI / ML',     color: 'from-amber-500 to-amber-600' },
  databases:   { name: 'Databases',   color: 'from-amber-500 to-amber-600' },
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
    <div className="bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10 shadow-sm rounded-2xl p-6 h-full">
      <div className="flex items-center gap-2 mb-5">
        <BarChart2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        <h3 className="text-slate-900 dark:text-white font-semibold">Skill Progress</h3>
      </div>
      <div className="space-y-4">
        {skills.map((s) => (
          <div key={s.name}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-700 dark:text-white/90 font-medium">{s.name}</span>
              <span className="text-slate-400 dark:text-white/40">{s.level}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
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

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = diffMs / (1000 * 60 * 60)
  if (diffHours < 1) return 'just now'
  if (diffHours < 24) return `${Math.floor(diffHours)}h ago`
  if (diffHours < 48) return 'yesterday'
  return date.toLocaleDateString()
}

function RecentActivityFeed() {
  const [items, setItems] = useState<Array<{
    lessonTitle: string
    lessonId: string
    topicId: string
    xpEarned: number
    completedAt: string
  }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiGet<Array<{ lessonTitle: string; lessonId: string; topicId: string; xpEarned: number; completedAt: string }>>(
      '/progress/recent'
    )
      .then((data) => {
        setItems(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10 shadow-sm rounded-2xl p-6 h-full">
      <div className="flex items-center gap-2 mb-5">
        <Activity className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        <h3 className="text-slate-900 dark:text-white font-semibold">Recent Activity</h3>
      </div>
      <div className="space-y-1">
        {!loading && items.length === 0 && (
          <p className="text-slate-500 dark:text-white/50 text-sm py-4 text-center">Complete your first lesson to see activity here</p>
        )}
        {items.map((item, i) => (
          <div key={i} className="flex gap-3 py-2.5 border-b border-slate-100 dark:border-white/10 last:border-0">
            <div className="mt-0.5 shrink-0 w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-500/15 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-800 dark:text-white/90 text-sm font-medium leading-snug">{item.lessonTitle}</p>
              <p className="text-slate-500 dark:text-white/50 text-xs mt-0.5">+{item.xpEarned} XP earned</p>
            </div>
            <span className="text-slate-400 dark:text-white/40 text-xs shrink-0 pt-0.5 whitespace-nowrap">
              {formatRelativeTime(item.completedAt)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface TopicItem {
  name: string
  slug: string
  category?: string
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
  durationHours?: number
  enrolledCount?: number
  imageGradient?: string
}

function RecommendedCourses() {
  const [topics, setTopics] = useState<TopicItem[]>([])
  const [loading, setLoading] = useState(true)
  const [hobbySlug, setHobbySlug] = useState<string | null>(null)

  useEffect(() => {
    apiGet<TopicItem[] | { topics: TopicItem[] }>('/topics?limit=6')
      .then((data) => {
        const arr = Array.isArray(data) ? data : (data as { topics: TopicItem[] }).topics ?? []
        setTopics(arr)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const fallbackGradient = 'linear-gradient(135deg,#f59e0b,#d97706)'

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-900 dark:text-white font-semibold text-lg">Recommended for You</h3>
        <Link
          href="/topics"
          className="text-amber-600 dark:text-amber-400 text-sm flex items-center gap-1 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
        >
          View all <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {loading && [0, 1, 2].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10 shadow-sm rounded-2xl overflow-hidden opacity-40 animate-pulse"
          >
            <div className="h-28 bg-slate-100 dark:bg-white/10" />
            <div className="p-4 space-y-2">
              <div className="h-3 bg-slate-200 dark:bg-white/10 rounded w-1/2" />
              <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-3/4" />
              <div className="h-8 bg-slate-200 dark:bg-white/10 rounded mt-3" />
            </div>
          </div>
        ))}
        {!loading && topics.map((c) => (
          <div
            key={c.slug}
            className="bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10 shadow-sm rounded-2xl overflow-hidden group hover:border-amber-300 dark:hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            {/* Thumbnail */}
            <div
              className="h-28 flex items-center justify-center relative overflow-hidden"
              style={{ background: c.imageGradient || fallbackGradient }}
            >
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_50%,white,transparent_60%)]" />
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-amber-500" />
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {c.category && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 text-[10px] font-medium border border-amber-200 dark:border-amber-500/30">
                    {c.category}
                  </span>
                )}
                {c.difficulty && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${difficultyColor(c.difficulty)}`}
                  >
                    {c.difficulty}
                  </span>
                )}
              </div>
              <p className="text-slate-900 dark:text-white font-semibold text-sm leading-snug">{c.name}</p>
              <div className="flex items-center justify-between mt-2 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400 dark:text-white/40" />
                  <span className="text-slate-500 dark:text-white/50 text-xs">{c.durationHours != null ? `${c.durationHours}h` : '—'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400 dark:text-white/40 text-xs">{c.enrolledCount != null ? `${c.enrolledCount.toLocaleString()} enrolled` : ''}</span>
                </div>
              </div>
              <button
                onClick={() => setHobbySlug(c.slug)}
                className="block w-full text-center py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold hover:from-amber-400 hover:to-amber-500 transition-all shadow-md shadow-amber-500/20"
              >
                Start Learning
              </button>
            </div>
          </div>
        ))}
      </div>

      {hobbySlug && (
        <HobbySelector
          courseSlug={hobbySlug}
          onClose={() => setHobbySlug(null)}
        />
      )}
    </div>
  )
}

function StreakCalendar({ streak }: { streak: number }) {
  const days = buildStreakDays(30, streak)

  return (
    <div className="bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10 shadow-sm rounded-2xl p-6">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500" />
          <h3 className="text-slate-900 dark:text-white font-semibold">Your Learning Streak</h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-white/50">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-emerald-500" />
            Active
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-white/10" />
            Inactive
          </div>
        </div>
      </div>
      <p className="text-slate-500 dark:text-white/50 text-sm mb-5">Last 30 days · {streak}-day current streak</p>
      <div className="grid grid-cols-[repeat(15,_1fr)] gap-2">
        {days.map((active, i) => (
          <div
            key={i}
            title={`Day ${i + 1}`}
            className={`aspect-square rounded-full transition-all ${
              active
                ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-[0_0_6px_rgba(52,211,153,0.5)]'
                : 'bg-slate-200 dark:bg-white/10'
            }`}
          />
        ))}
      </div>
      <p className="mt-5 text-sm text-slate-600 dark:text-white/70 font-medium">
        🎉 You&apos;re on a roll! Keep learning today to maintain your{' '}
        <span className="text-orange-600 dark:text-orange-400 font-bold">{streak}-day streak</span>.
      </p>
    </div>
  )
}

function AIInsights() {
  return (
    <div className="relative bg-white dark:bg-[#12121a] border border-amber-200 dark:border-amber-500/30 shadow-sm rounded-2xl p-6 overflow-hidden">
      {/* Amber glow effect */}
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-amber-100/60 dark:bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-orange-100/50 dark:bg-orange-500/10 blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-100 dark:from-amber-500/20 to-amber-50 dark:to-amber-500/10 flex items-center justify-center border border-amber-200 dark:border-amber-500/30">
            <Brain className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-slate-900 dark:text-white font-semibold">AI Learning Insights</h3>
          <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-300 text-[10px] font-medium">
            Powered by AI
          </span>
        </div>
        <p className="text-slate-500 dark:text-white/50 text-sm mb-5 ml-10">
          Based on your progress, here&apos;s what AI recommends…
        </p>

        <div className="space-y-3 mb-5">
          {aiInsights.map((ins, i) => (
            <div
              key={i}
              className="flex gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-amber-300 dark:hover:border-amber-500/30 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-slate-600 dark:text-white/70 text-sm leading-relaxed">{ins}</p>
            </div>
          ))}
        </div>

        {/* Velocity banner */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-50 dark:from-amber-500/10 to-orange-50 dark:to-orange-500/10 border border-amber-200 dark:border-amber-500/30">
          <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <p className="text-slate-700 dark:text-white/90 text-sm font-medium">
            Your learning velocity is{' '}
            <span className="text-amber-600 dark:text-amber-400 font-bold">23% above average</span> this month.
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
      <p className="text-slate-400 dark:text-white/40 text-[10px] font-semibold uppercase tracking-widest px-3 mb-2">
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
                ? 'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30'
                : 'text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600 dark:text-amber-400' : ''}`} />
            {item.label}
          </button>
        )
      })}

      <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/10">
        <Link
          href="/topics"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
        >
          <BookOpen className="w-4 h-4" />
          Browse Topics
        </Link>
        <Link
          href="/paths"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
        >
          <Map className="w-4 h-4" />
          Career Paths
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
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
    <div className="min-h-screen bg-[#f7f8fa] dark:bg-transparent">
      <Navbar />
      <FeatureRibbon withNavbarOffset />

      <div className="pt-4 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Dashboard top bar */}
        <div className="flex items-center justify-between py-4 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-white/50">
            <span>Home</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-700 dark:text-white/90">Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-9 h-9 rounded-xl bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-center text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 border border-white dark:border-[#0a0a0f]" />
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10 shadow-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-white/10 transition-all">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <User className="w-3 h-3 text-white" />
              </div>
              <span className="text-slate-700 dark:text-white/90 text-sm font-medium">Alex</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-white/40" />
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
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Good morning, Alex! 👋</h1>
                <p className="text-slate-600 dark:text-white/70 mt-1">Continue your learning journey</p>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-orange-200 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-500/15">
                <Flame className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-slate-900 dark:text-white font-bold text-sm leading-none">{streak} day streak 🔥</p>
                  <p className="text-orange-600 dark:text-orange-400 text-[10px] mt-0.5">Keep it up!</p>
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
