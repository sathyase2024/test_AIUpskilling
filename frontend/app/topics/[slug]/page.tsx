'use client'

export const dynamic = 'force-dynamic'
// Client-side only — slug fetched via useParams(), no generateStaticParams needed.

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  Star,
  Clock,
  Users,
  BookOpen,
  Lock,
  Play,
  FileText,
  Code2,
  HelpCircle,
  Briefcase,
  Brain,
  ChevronRight,
  Award,
  Zap,
  CheckCircle,
  Sparkles,
} from 'lucide-react'
import { groupLessonsIntoModules } from '@/lib/modules'

// ─── Types ────────────────────────────────────────────────────────────────────

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'
type LessonType = 'video' | 'reading' | 'exercise' | 'quiz' | 'project'

interface Lesson {
  id: string
  title: string
  duration: string
  type: LessonType
  xp: number
  locked: boolean
}

interface TopicDetail {
  id: number
  slug: string
  name: string
  category: string
  difficulty: Difficulty
  description: string
  hours: number
  rating: string
  enrolled: string
  reviews: number
  icon: string
  gradient: string
  lessons: Lesson[]
}

// ─── API → TopicDetail transform ──────────────────────────────────────────────

function transformApiResponse(raw: any): TopicDetail {
  const capFirst = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s
  const difficulty = (['Beginner','Intermediate','Advanced'] as Difficulty[])
    .find(d => d.toLowerCase() === raw.difficulty?.toLowerCase()) ?? 'Intermediate'

  const lessons: Lesson[] = (raw.lessons ?? []).map((l: any) => ({
    id: l.id ?? String(l.orderIndex),
    title: l.title ?? `Lesson ${l.orderIndex}`,
    duration: `${l.durationMinutes ?? 15} min`,
    type: (l.type as LessonType) ?? 'reading',
    xp: l.xpReward ?? 50,
    locked: false,
  }))

  const enrolled = raw.enrolledCount >= 1000
    ? `${(raw.enrolledCount / 1000).toFixed(1)}K`
    : String(raw.enrolledCount ?? 0)

  const SLUG_ICON: Record<string, string> = {
    javascript: 'JS', typescript: 'TS', python: 'PY', java: '☕', go: 'Go',
    rust: '🦀', react: '⚛', nextjs: '▲', angular: '🅰', vuejs: '💚',
    nodejs: '🟩', 'spring-boot': '🍃', django: '🐍', fastapi: '⚡',
    docker: '🐳', kubernetes: '☸', aws: '☁', terraform: '🏗',
    postgresql: '🐘', mongodb: '🍃', redis: '⚡', dsa: '🌳',
    'system-design': '🏛', flutter: '🦋', 'react-native': '📱',
    'ml-fundamentals': '📊', 'generative-ai': '🤖', rag: '🔍',
    'ai-agents': '🤖', 'prompt-engineering': '✍',
    'pytorch-deep-learning': '🔥', 'retrieval-augmented-generation': '🔍',
    'ai-agents-agentic-workflows': '🤖', 'large-language-models': '🧠',
    'python-for-ai-ml': 'PY',
    'tensorflow-keras': '🔷',
    'hugging-face-transformers': '🤗',
  }

  return {
    id: 0,
    slug: raw.slug,
    name: raw.name,
    category: raw.category ? capFirst(raw.category.replace(/-/g, ' ')) : 'Programming',
    difficulty,
    description: raw.description ?? '',
    hours: raw.durationHours ?? 0,
    rating: Number(raw.rating ?? 4.5).toFixed(1),
    enrolled,
    reviews: Math.floor((raw.enrolledCount ?? 0) / 8),
    icon: SLUG_ICON[raw.slug] ?? '📚',
    gradient: raw.imageGradient ?? 'from-amber-500 to-amber-600',
    lessons,
  }
}

// ─── Fallback data ────────────────────────────────────────────────────────────

function buildFallbackTopic(slug: string): TopicDetail {
  const name = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return {
    id: 0,
    slug,
    name,
    category: 'Programming',
    difficulty: 'Intermediate',
    description: `Master ${name} from fundamentals to advanced patterns with AI-powered lessons.`,
    hours: 20,
    rating: '4.8',
    enrolled: '25K',
    reviews: 1800,
    icon: '📚',
    gradient: 'from-amber-500 to-amber-600',
    lessons: [
      { id: 'l1', title: `Introduction to ${name}`, duration: '12 min', type: 'video', xp: 30, locked: false },
      { id: 'l2', title: 'Core Concepts', duration: '18 min', type: 'reading', xp: 40, locked: false },
      { id: 'l3', title: 'Hands-on Exercise', duration: '25 min', type: 'exercise', xp: 60, locked: false },
      { id: 'l4', title: 'Advanced Patterns', duration: '20 min', type: 'video', xp: 50, locked: false },
      { id: 'l5', title: 'Knowledge Quiz', duration: '10 min', type: 'quiz', xp: 80, locked: true },
      { id: 'l6', title: 'Real-World Application', duration: '30 min', type: 'reading', xp: 70, locked: true },
      { id: 'l7', title: 'Best Practices', duration: '15 min', type: 'video', xp: 45, locked: true },
      { id: 'l8', title: 'Integration Patterns', duration: '22 min', type: 'exercise', xp: 65, locked: true },
      { id: 'l9', title: 'Performance Optimization', duration: '18 min', type: 'reading', xp: 55, locked: true },
      { id: 'l10', title: 'Final Project', duration: '45 min', type: 'project', xp: 200, locked: true },
    ],
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLessonIcon(type: LessonType) {
  switch (type) {
    case 'video':    return Play
    case 'reading':  return FileText
    case 'exercise': return Code2
    case 'quiz':     return HelpCircle
    case 'project':  return Briefcase
    default:         return BookOpen
  }
}

function getLessonTypeLabel(type: LessonType): string {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

function getLessonTypeColor(type: LessonType): string {
  switch (type) {
    case 'video':    return 'text-blue-600'
    case 'reading':  return 'text-emerald-600'
    case 'exercise': return 'text-amber-600'
    case 'quiz':     return 'text-amber-600'
    case 'project':  return 'text-orange-600'
    default:         return 'text-slate-400'
  }
}

function difficultyStyle(d: Difficulty) {
  if (d === 'Beginner')     return 'text-emerald-700 bg-emerald-50 border-emerald-200'
  if (d === 'Intermediate') return 'text-blue-700 bg-blue-50 border-blue-200'
  return 'text-amber-700 bg-amber-50 border-amber-200'
}

function generateBulletPoints(topicName: string): string[] {
  return [
    `Core concepts and fundamentals of ${topicName}`,
    `Industry best practices and design patterns`,
    `Hands-on exercises with real-world scenarios`,
    `Performance optimization and advanced techniques`,
    `Building production-ready applications`,
  ]
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function PageSkeleton() {
  return (
    <div className="min-h-screen animate-pulse" style={{ backgroundColor: '#f7f8fa' }}>
      <div className="h-64 bg-slate-100" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          <div className="flex-1 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 rounded-2xl bg-slate-100" />
            ))}
          </div>
          <div className="w-80 space-y-4">
            <div className="h-48 rounded-2xl bg-slate-100" />
            <div className="h-32 rounded-2xl bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TopicDetailPage() {
  const params = useParams()
  const slug = typeof params.slug === 'string' ? params.slug : Array.isArray(params.slug) ? params.slug[0] : ''

  const [topic, setTopic] = useState<TopicDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    const API_URL = '/api/proxy'

    async function fetchTopic() {
      try {
        const res = await fetch(`${API_URL}/topics/${slug}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const raw = await res.json()
        setTopic(transformApiResponse(raw))
      } catch {
        // API unavailable — use fallback mock data
        setTopic(buildFallbackTopic(slug))
      } finally {
        setLoading(false)
      }
    }

    fetchTopic()
  }, [slug])

  if (loading) return <PageSkeleton />
  if (!topic) return null

  const modules = groupLessonsIntoModules(topic.lessons)
  const totalLessons = topic.lessons.length
  const totalXp = topic.lessons.reduce((sum, l) => sum + l.xp, 0)
  const bulletPoints = generateBulletPoints(topic.name)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f8fa' }}>

      {/* ── Hero Header ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `radial-gradient(ellipse 120% 100% at 50% 0%, rgba(245,158,11,0.12) 0%, transparent 65%), #f7f8fa`,
        }}
      >
        {/* Ambient orb */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)', filter: 'blur(60px)' }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-12">
          {/* Back button */}
          <Link
            href="/topics"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 transition-colors text-sm mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Topics
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            {/* Icon */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl shadow-lg shrink-0"
              style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', border: '1px solid rgba(255,255,255,0.4)' }}
            >
              {topic.icon}
            </div>

            <div className="flex-1">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold border"
                  style={{ background: 'rgba(245,158,11,0.10)', borderColor: 'rgba(245,158,11,0.30)', color: '#b45309' }}
                >
                  {topic.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${difficultyStyle(topic.difficulty)}`}>
                  {topic.difficulty}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
                {topic.name}
              </h1>

              <p className="text-slate-600 text-base leading-relaxed mb-5 max-w-2xl">
                {topic.description}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>{topic.hours} hours</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-slate-700 font-semibold">{topic.rating}</span>
                  <span className="text-slate-400">({topic.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>{topic.enrolled} enrolled</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>{totalLessons} lessons</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>{totalXp.toLocaleString()} XP total</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left Column: Lesson List ── */}
          <div className="flex-1 min-w-0 space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Course Content</h2>

            {modules.map((mod, modIdx) => (
              <div
                key={modIdx}
                className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm"
              >
                {/* Module header */}
                <div
                  className="px-5 py-3.5 flex items-center justify-between gap-3"
                  style={{ background: 'rgba(245,158,11,0.06)', borderBottom: '1px solid rgba(226,232,240,1)' }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-amber-700 shrink-0"
                      style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.30)' }}
                    >
                      {modIdx + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-slate-900 truncate">{mod.title}</h3>
                      <p className="text-xs text-slate-500 truncate">{mod.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 shrink-0">{mod.lessons.length} lessons</span>
                </div>

                {/* Lesson rows */}
                <div className="divide-y divide-slate-100">
                  {mod.lessons.map((lesson) => {
                    const Icon = getLessonIcon(lesson.type)
                    const iconColor = getLessonTypeColor(lesson.type)

                    return (
                      <div
                        key={lesson.id}
                        className={`flex items-center gap-4 px-5 py-3.5 transition-colors ${
                          lesson.locked
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-slate-50 cursor-pointer'
                        }`}
                      >
                        {/* Type icon */}
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconColor}`}
                          style={{ background: 'rgba(241,245,249,1)', border: '1px solid rgba(226,232,240,1)' }}
                        >
                          <Icon className="w-4 h-4" aria-hidden="true" />
                        </div>

                        {/* Title + type */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${lesson.locked ? 'text-slate-400' : 'text-slate-900'}`}>
                            {lesson.title}
                          </p>
                          <p className={`text-xs mt-0.5 ${iconColor} opacity-90`}>
                            {getLessonTypeLabel(lesson.type)}
                          </p>
                        </div>

                        {/* Duration */}
                        <div className="flex items-center gap-1 text-xs text-slate-400 shrink-0">
                          <Clock className="w-3 h-3" />
                          {lesson.duration}
                        </div>

                        {/* XP */}
                        <div className="hidden sm:flex items-center gap-1 text-xs text-amber-600 shrink-0">
                          <Zap className="w-3 h-3" />
                          {lesson.xp} XP
                        </div>

                        {/* Lock / play indicator */}
                        <div className="shrink-0">
                          {lesson.locked
                            ? <Lock className="w-4 h-4 text-slate-300" aria-hidden="true" />
                            : <ChevronRight className="w-4 h-4 text-slate-300" aria-hidden="true" />
                          }
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* ── Right Column: Sidebar ── */}
          <div className="lg:w-80 xl:w-96 shrink-0 space-y-5">

            {/* Start Learning CTA */}
            <div
              className="rounded-2xl p-6 text-center bg-white border border-amber-200 shadow-sm"
            >
              <Link
                href={`/learn/${slug}`}
                className="block w-full py-3.5 rounded-xl text-white font-bold text-base transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95 shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  boxShadow: '0 8px 30px rgba(245,158,11,0.30)',
                }}
              >
                Start Learning
              </Link>
              <p className="text-slate-500 text-xs mt-3">Free preview available · No credit card required</p>
            </div>

            {/* Topic Stats Card */}
            <div
              className="rounded-2xl p-5 space-y-4 bg-white border border-slate-200 shadow-sm"
            >
              <h3 className="text-sm font-bold text-slate-900">Topic Overview</h3>

              {[
                { icon: Clock,    label: 'Duration',    value: `${topic.hours} hours`, color: 'text-amber-600' },
                { icon: BookOpen, label: 'Lessons',     value: `${totalLessons} lessons`, color: 'text-amber-600' },
                { icon: Zap,      label: 'Total XP',    value: `${totalXp.toLocaleString()} XP`, color: 'text-amber-600' },
                { icon: Award,    label: 'Certificate', value: 'Upon completion', color: 'text-emerald-600' },
                { icon: Users,    label: 'Enrolled',    value: topic.enrolled, color: 'text-amber-600' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-slate-500 text-sm">
                    <Icon className={`w-4 h-4 ${color}`} aria-hidden="true" />
                    {label}
                  </div>
                  <span className="text-slate-700 text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>

            {/* What you'll learn */}
            <div
              className="rounded-2xl p-5 bg-white border border-slate-200 shadow-sm"
            >
              <h3 className="text-sm font-bold text-slate-900 mb-4">What you&apos;ll learn</h3>
              <ul className="space-y-2.5">
                {bulletPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-slate-600 text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructor Card */}
            <div
              className="rounded-2xl p-5 flex items-center gap-4 bg-white border border-slate-200 shadow-sm"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}
              >
                <Brain className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <p className="text-sm font-semibold text-slate-900">AI-Generated by Claude</p>
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Content dynamically generated and personalized by Anthropic&apos;s Claude AI model.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
