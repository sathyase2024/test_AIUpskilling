'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import {
  Search,
  Star,
  Clock,
  Users,
  BookOpen,
  Filter,
  ChevronRight,
  X,
  Gamepad2,
  Music,
  Dumbbell,
  Camera,
  TrendingUp,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'
type Category =
  | 'Programming'
  | 'Frontend'
  | 'Backend'
  | 'Mobile'
  | 'Cloud'
  | 'AI/ML'
  | 'Databases'
  | 'Security'
  | 'Product'

interface Topic {
  id: number
  name: string
  category: Category
  difficulty: Difficulty
  hours: number
  rating: string
  reviews: number
  enrolled: string
  tags: string[]
  icon: string
  gradient: string
  topBarGradient: string
  description: string
  isNew?: boolean
  isHot?: boolean
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TOPICS: Topic[] = [
  {
    id: 1,
    name: 'JavaScript Fundamentals',
    category: 'Programming',
    difficulty: 'Beginner',
    hours: 12,
    rating: '4.9',
    reviews: 3241,
    enrolled: '45.2K',
    tags: ['ES6+', 'DOM', 'Async'],
    icon: 'JS',
    gradient: 'from-yellow-500 to-orange-400',
    topBarGradient: 'from-yellow-500/80 to-orange-400/60',
    description: 'Master modern JavaScript from basics to advanced patterns.',
    isHot: true,
  },
  {
    id: 2,
    name: 'Python for Data Science',
    category: 'AI/ML',
    difficulty: 'Beginner',
    hours: 18,
    rating: '4.8',
    reviews: 2897,
    enrolled: '38.7K',
    tags: ['Pandas', 'NumPy', 'Matplotlib'],
    icon: 'PY',
    gradient: 'from-blue-500 to-cyan-400',
    topBarGradient: 'from-blue-500/80 to-cyan-400/60',
    description: 'Learn data manipulation and analysis with Python.',
  },
  {
    id: 3,
    name: 'React & Next.js',
    category: 'Frontend',
    difficulty: 'Intermediate',
    hours: 20,
    rating: '4.9',
    reviews: 4512,
    enrolled: '52.1K',
    tags: ['Hooks', 'SSR', 'TypeScript'],
    icon: '⚛',
    gradient: 'from-cyan-500 to-blue-600',
    topBarGradient: 'from-cyan-500/80 to-blue-600/60',
    description: 'Build production-ready React apps with Next.js 14.',
    isHot: true,
  },
  {
    id: 4,
    name: 'Spring Boot REST APIs',
    category: 'Backend',
    difficulty: 'Intermediate',
    hours: 16,
    rating: '4.7',
    reviews: 1876,
    enrolled: '21.4K',
    tags: ['Java', 'REST', 'JPA'],
    icon: '🍃',
    gradient: 'from-green-500 to-emerald-400',
    topBarGradient: 'from-green-500/80 to-emerald-400/60',
    description: 'Build scalable REST APIs with Spring Boot and Java.',
  },
  {
    id: 5,
    name: 'AWS Cloud Practitioner',
    category: 'Cloud',
    difficulty: 'Beginner',
    hours: 14,
    rating: '4.8',
    reviews: 2134,
    enrolled: '29.8K',
    tags: ['EC2', 'S3', 'Lambda'],
    icon: '☁',
    gradient: 'from-orange-500 to-yellow-400',
    topBarGradient: 'from-orange-500/80 to-yellow-400/60',
    description: 'Get AWS certified with hands-on cloud fundamentals.',
    isNew: true,
  },
  {
    id: 6,
    name: 'Machine Learning with PyTorch',
    category: 'AI/ML',
    difficulty: 'Advanced',
    hours: 32,
    rating: '4.9',
    reviews: 1654,
    enrolled: '14.2K',
    tags: ['Neural Networks', 'LLMs', 'MLOps'],
    icon: '🤖',
    gradient: 'from-purple-600 to-pink-500',
    topBarGradient: 'from-purple-600/80 to-pink-500/60',
    description: 'Deep learning and LLMs with PyTorch from scratch.',
    isHot: true,
  },
  {
    id: 7,
    name: 'PostgreSQL Deep Dive',
    category: 'Databases',
    difficulty: 'Intermediate',
    hours: 10,
    rating: '4.7',
    reviews: 987,
    enrolled: '11.3K',
    tags: ['SQL', 'Indexing', 'Transactions'],
    icon: '🐘',
    gradient: 'from-blue-600 to-indigo-500',
    topBarGradient: 'from-blue-600/80 to-indigo-500/60',
    description: 'Master PostgreSQL for high-performance applications.',
  },
  {
    id: 8,
    name: 'React Native Mobile Dev',
    category: 'Mobile',
    difficulty: 'Intermediate',
    hours: 22,
    rating: '4.6',
    reviews: 1432,
    enrolled: '17.6K',
    tags: ['iOS', 'Android', 'Expo'],
    icon: '📱',
    gradient: 'from-pink-500 to-rose-400',
    topBarGradient: 'from-pink-500/80 to-rose-400/60',
    description: 'Build cross-platform mobile apps with React Native.',
  },
  {
    id: 9,
    name: 'Docker & Kubernetes',
    category: 'Cloud',
    difficulty: 'Intermediate',
    hours: 15,
    rating: '4.8',
    reviews: 2765,
    enrolled: '23.9K',
    tags: ['Containers', 'Orchestration', 'Helm'],
    icon: '🐳',
    gradient: 'from-sky-500 to-blue-500',
    topBarGradient: 'from-sky-500/80 to-blue-500/60',
    description: 'Containerize and orchestrate apps at scale.',
    isNew: true,
  },
  {
    id: 10,
    name: 'Ethical Hacking Basics',
    category: 'Security',
    difficulty: 'Intermediate',
    hours: 25,
    rating: '4.7',
    reviews: 1123,
    enrolled: '9.8K',
    tags: ['Penetration Testing', 'OWASP', 'CTF'],
    icon: '🛡',
    gradient: 'from-red-500 to-rose-600',
    topBarGradient: 'from-red-500/80 to-rose-600/60',
    description: 'Learn offensive security and ethical hacking techniques.',
  },
  {
    id: 11,
    name: 'TypeScript Mastery',
    category: 'Programming',
    difficulty: 'Intermediate',
    hours: 8,
    rating: '4.9',
    reviews: 3089,
    enrolled: '41.5K',
    tags: ['Types', 'Generics', 'Decorators'],
    icon: 'TS',
    gradient: 'from-blue-500 to-indigo-600',
    topBarGradient: 'from-blue-500/80 to-indigo-600/60',
    description: 'Go from JavaScript to TypeScript with confidence.',
    isHot: true,
  },
  {
    id: 12,
    name: 'Product Management 101',
    category: 'Product',
    difficulty: 'Beginner',
    hours: 11,
    rating: '4.6',
    reviews: 876,
    enrolled: '8.4K',
    tags: ['Roadmaps', 'User Stories', 'OKRs'],
    icon: '📋',
    gradient: 'from-violet-500 to-purple-600',
    topBarGradient: 'from-violet-500/80 to-purple-600/60',
    description: 'Launch your PM career with practical frameworks.',
    isNew: true,
  },
  {
    id: 13,
    name: 'GraphQL API Design',
    category: 'Backend',
    difficulty: 'Advanced',
    hours: 13,
    rating: '4.8',
    reviews: 1054,
    enrolled: '12.7K',
    tags: ['Queries', 'Mutations', 'Subscriptions'],
    icon: '◈',
    gradient: 'from-pink-600 to-rose-500',
    topBarGradient: 'from-pink-600/80 to-rose-500/60',
    description: 'Design and build production GraphQL APIs.',
  },
  {
    id: 14,
    name: 'Flutter App Development',
    category: 'Mobile',
    difficulty: 'Beginner',
    hours: 20,
    rating: '4.7',
    reviews: 1342,
    enrolled: '15.1K',
    tags: ['Dart', 'Widgets', 'State'],
    icon: '🦋',
    gradient: 'from-teal-500 to-cyan-400',
    topBarGradient: 'from-teal-500/80 to-cyan-400/60',
    description: 'Build beautiful cross-platform apps with Flutter.',
  },
  {
    id: 15,
    name: 'Redis & Caching Strategies',
    category: 'Databases',
    difficulty: 'Advanced',
    hours: 9,
    rating: '4.7',
    reviews: 743,
    enrolled: '7.2K',
    tags: ['Caching', 'Pub/Sub', 'Streams'],
    icon: '⚡',
    gradient: 'from-red-600 to-orange-500',
    topBarGradient: 'from-red-600/80 to-orange-500/60',
    description: 'Master Redis for high-performance data access.',
  },
]

const CATEGORIES: string[] = [
  'All',
  'Programming',
  'Frontend',
  'Backend',
  'Mobile',
  'Cloud',
  'AI/ML',
  'Databases',
  'Security',
  'Product',
]

const DIFFICULTY_OPTIONS: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced']

const DURATION_OPTIONS = [
  { label: 'Under 5 hours', min: 0, max: 5 },
  { label: '5–15 hours', min: 5, max: 15 },
  { label: '15–25 hours', min: 15, max: 25 },
  { label: '25+ hours', min: 25, max: Infinity },
]

const HOBBY_OPTIONS = [
  { icon: Gamepad2, label: 'Gaming' },
  { icon: Music, label: 'Music' },
  { icon: Dumbbell, label: 'Fitness' },
  { icon: Camera, label: 'Photography' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function difficultyBadgeStyle(d: Difficulty) {
  return d === 'Beginner'
    ? 'text-green-400 bg-green-500/10 border-green-500/30'
    : d === 'Intermediate'
    ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
    : 'text-red-400 bg-red-500/10 border-red-500/30'
}

function categoryBadgeStyle(c: Category) {
  const map: Record<Category, string> = {
    Programming: 'text-yellow-300 bg-yellow-500/10 border-yellow-500/20',
    Frontend: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
    Backend: 'text-green-300 bg-green-500/10 border-green-500/20',
    Mobile: 'text-pink-300 bg-pink-500/10 border-pink-500/20',
    Cloud: 'text-orange-300 bg-orange-500/10 border-orange-500/20',
    'AI/ML': 'text-purple-300 bg-purple-500/10 border-purple-500/20',
    Databases: 'text-blue-300 bg-blue-500/10 border-blue-500/20',
    Security: 'text-red-300 bg-red-500/10 border-red-500/20',
    Product: 'text-violet-300 bg-violet-500/10 border-violet-500/20',
  }
  return map[c] ?? 'text-white/60 bg-white/5 border-white/10'
}

// ─── Topic Card ───────────────────────────────────────────────────────────────

function TopicCard({ topic }: { topic: Topic }) {
  return (
    <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-white/25 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col">
      {/* Colored top bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${topic.topBarGradient}`} />

      {/* Card header with icon */}
      <div
        className={`relative h-32 bg-gradient-to-br ${topic.gradient} flex items-center justify-center overflow-hidden`}
      >
        {/* Subtle light overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.25),transparent_60%)]" />

        {/* Icon */}
        <div className="relative w-16 h-16 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-xl">
          <span className="text-2xl font-bold text-white select-none">{topic.icon}</span>
        </div>

        {/* Badges (new / hot) */}
        {topic.isHot && (
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-orange-500/90 text-white text-[10px] font-bold uppercase tracking-wide">
            🔥 Hot
          </span>
        )}
        {topic.isNew && (
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-green-500/90 text-white text-[10px] font-bold uppercase tracking-wide">
            ✨ New
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Category + Difficulty */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${categoryBadgeStyle(
              topic.category
            )}`}
          >
            {topic.category}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${difficultyBadgeStyle(
              topic.difficulty
            )}`}
          >
            {topic.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-base leading-snug group-hover:text-purple-200 transition-colors">
          {topic.name}
        </h3>

        <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{topic.description}</p>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-white/50">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {topic.hours}h
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-white/70">{topic.rating}</span>
            <span className="text-white/30">({topic.reviews.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <Users className="w-3 h-3" />
            {topic.enrolled}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {topic.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white/70 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-1">
          <button
            className={`w-full py-2.5 rounded-xl bg-gradient-to-r ${topic.gradient} text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md`}
          >
            Start Learning
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Sidebar Filters ──────────────────────────────────────────────────────────

interface SidebarFiltersProps {
  difficultyFilter: Set<Difficulty>
  onDifficultyChange: (d: Difficulty) => void
  categoryFilter: string
  onCategoryChange: (c: string) => void
  selectedDurations: Set<number>
  onDurationChange: (idx: number) => void
  selectedHobbies: Set<string>
  onHobbyChange: (h: string) => void
  onClearAll: () => void
}

function SidebarFilters({
  difficultyFilter,
  onDifficultyChange,
  categoryFilter,
  onCategoryChange,
  selectedDurations,
  onDurationChange,
  selectedHobbies,
  onHobbyChange,
  onClearAll,
}: SidebarFiltersProps) {
  const hasFilters =
    difficultyFilter.size > 0 ||
    categoryFilter !== 'All' ||
    selectedDurations.size > 0 ||
    selectedHobbies.size > 0

  return (
    <aside className="hidden lg:block w-56 shrink-0 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-purple-400" />
          <h3 className="text-white font-semibold text-sm">Filters</h3>
        </div>
        {hasFilters && (
          <button
            onClick={onClearAll}
            className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Duration */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">
          Duration
        </p>
        {DURATION_OPTIONS.map((opt, idx) => (
          <label
            key={opt.label}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div
              className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                selectedDurations.has(idx)
                  ? 'bg-purple-500 border-purple-500'
                  : 'border-white/20 group-hover:border-white/40'
              }`}
              onClick={() => onDurationChange(idx)}
            >
              {selectedDurations.has(idx) && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span
              className={`text-sm transition-colors ${
                selectedDurations.has(idx) ? 'text-white' : 'text-white/50 group-hover:text-white/70'
              }`}
              onClick={() => onDurationChange(idx)}
            >
              {opt.label}
            </span>
          </label>
        ))}
      </div>

      {/* Difficulty */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">
          Difficulty
        </p>
        {DIFFICULTY_OPTIONS.map((d) => (
          <label key={d} className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                difficultyFilter.has(d)
                  ? 'bg-purple-500 border-purple-500'
                  : 'border-white/20 group-hover:border-white/40'
              }`}
              onClick={() => onDifficultyChange(d)}
            >
              {difficultyFilter.has(d) && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span
              className={`text-sm transition-colors ${
                difficultyFilter.has(d) ? 'text-white' : 'text-white/50 group-hover:text-white/70'
              }`}
              onClick={() => onDifficultyChange(d)}
            >
              {d}
            </span>
            <span
              className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full border ${difficultyBadgeStyle(d)}`}
            >
              {TOPICS.filter((t) => t.difficulty === d).length}
            </span>
          </label>
        ))}
      </div>

      {/* Category */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">
          Category
        </p>
        {CATEGORIES.filter((c) => c !== 'All').map((c) => (
          <button
            key={c}
            onClick={() => onCategoryChange(c)}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-sm transition-all ${
              categoryFilter === c
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            {c}
            <span className="text-xs text-white/30">
              {TOPICS.filter((t) => t.category === c).length}
            </span>
          </button>
        ))}
      </div>

      {/* Hobby Personalization */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">
          Personalize by Hobby
        </p>
        <p className="text-white/30 text-xs mb-3 leading-relaxed">
          AI tailors examples to your interests
        </p>
        <div className="grid grid-cols-2 gap-2">
          {HOBBY_OPTIONS.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => onHobbyChange(label)}
              className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                selectedHobbies.has(label)
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                  : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TopicsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [difficultyFilter, setDifficultyFilter] = useState<Set<Difficulty>>(new Set())
  const [selectedDurations, setSelectedDurations] = useState<Set<number>>(new Set())
  const [selectedHobbies, setSelectedHobbies] = useState<Set<string>>(new Set())

  // Filter logic
  const filteredTopics = useMemo(() => {
    return TOPICS.filter((topic) => {
      // Search
      if (
        searchQuery &&
        !topic.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !topic.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) &&
        !topic.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Category tab
      if (activeCategory !== 'All' && topic.category !== activeCategory) return false

      // Difficulty checkboxes
      if (difficultyFilter.size > 0 && !difficultyFilter.has(topic.difficulty)) return false

      // Duration checkboxes
      if (selectedDurations.size > 0) {
        const matchesDuration = [...selectedDurations].some((idx) => {
          const opt = DURATION_OPTIONS[idx]
          return topic.hours >= opt.min && topic.hours < opt.max
        })
        if (!matchesDuration) return false
      }

      return true
    })
  }, [searchQuery, activeCategory, difficultyFilter, selectedDurations])

  const toggleDifficulty = (d: Difficulty) => {
    setDifficultyFilter((prev) => {
      const next = new Set(prev)
      next.has(d) ? next.delete(d) : next.add(d)
      return next
    })
  }

  const toggleDuration = (idx: number) => {
    setSelectedDurations((prev) => {
      const next = new Set(prev)
      next.has(idx) ? next.delete(idx) : next.add(idx)
      return next
    })
  }

  const toggleHobby = (h: string) => {
    setSelectedHobbies((prev) => {
      const next = new Set(prev)
      next.has(h) ? next.delete(h) : next.add(h)
      return next
    })
  }

  const clearAll = () => {
    setDifficultyFilter(new Set())
    setSelectedDurations(new Set())
    setSelectedHobbies(new Set())
    setActiveCategory('All')
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0f' }}>
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-24 pb-10 px-4 sm:px-6 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/15 via-transparent to-cyan-900/15 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-5">
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
              200+ topics and growing
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
              Explore{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                200+ Topics
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Find the perfect topic for your skill level, goals, and interests — powered by AI.
            </p>
          </div>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, tags, or technologies..."
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl pl-12 pr-12 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Difficulty filter pills */}
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            {(['All', ...DIFFICULTY_OPTIONS] as string[]).map((pill) => {
              const isActive =
                pill === 'All'
                  ? difficultyFilter.size === 0
                  : difficultyFilter.has(pill as Difficulty)
              return (
                <button
                  key={pill}
                  onClick={() => {
                    if (pill === 'All') {
                      setDifficultyFilter(new Set())
                    } else {
                      toggleDifficulty(pill as Difficulty)
                    }
                  }}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-500 border-transparent text-white shadow-lg shadow-purple-500/25'
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/20'
                  }`}
                >
                  {pill}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Category Tabs — horizontally scrollable */}
      <div className="sticky top-16 z-30 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/25'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                  {cat !== 'All' && (
                    <span
                      className={`ml-1.5 text-[10px] ${isActive ? 'text-white/70' : 'text-white/30'}`}
                    >
                      {TOPICS.filter((t) => t.category === cat).length}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-16">
        <div className="flex gap-8">
          {/* Left sidebar filters */}
          <SidebarFilters
            difficultyFilter={difficultyFilter}
            onDifficultyChange={toggleDifficulty}
            categoryFilter={activeCategory}
            onCategoryChange={setActiveCategory}
            selectedDurations={selectedDurations}
            onDurationChange={toggleDuration}
            selectedHobbies={selectedHobbies}
            onHobbyChange={toggleHobby}
            onClearAll={clearAll}
          />

          {/* Topics grid */}
          <div className="flex-1 min-w-0">
            {/* Results count + sort */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <p className="text-white/50 text-sm">
                  Showing{' '}
                  <span className="text-white font-semibold">{filteredTopics.length}</span> of{' '}
                  <span className="text-white font-semibold">200+</span> topics
                </p>
                {(difficultyFilter.size > 0 ||
                  activeCategory !== 'All' ||
                  selectedDurations.size > 0 ||
                  searchQuery) && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20"
                  >
                    <X className="w-3 h-3" />
                    Clear filters
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-white/40 text-sm">Sort by:</span>
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white/70 text-sm focus:outline-none focus:border-white/20 transition-all">
                  <option value="popular">Most Popular</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                  <option value="duration-asc">Shortest First</option>
                </select>
              </div>
            </div>

            {/* Active filters summary */}
            {(difficultyFilter.size > 0 ||
              activeCategory !== 'All' ||
              selectedDurations.size > 0 ||
              selectedHobbies.size > 0) && (
              <div className="flex flex-wrap gap-2 mb-5">
                {activeCategory !== 'All' && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-medium">
                    {activeCategory}
                    <button onClick={() => setActiveCategory('All')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {[...difficultyFilter].map((d) => (
                  <span
                    key={d}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/60 text-xs font-medium"
                  >
                    {d}
                    <button onClick={() => toggleDifficulty(d)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {[...selectedHobbies].map((h) => (
                  <span
                    key={h}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-medium"
                  >
                    {h}
                    <button onClick={() => toggleHobby(h)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Grid */}
            {filteredTopics.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredTopics.map((topic) => (
                  <TopicCard key={topic.id} topic={topic} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-white/20" />
                </div>
                <p className="text-white/50 font-semibold mb-2">No topics found</p>
                <p className="text-white/30 text-sm mb-5">
                  Try adjusting your search or filters.
                </p>
                <button
                  onClick={clearAll}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Load more */}
            {filteredTopics.length > 0 && (
              <div className="mt-10 flex flex-col items-center gap-3">
                <p className="text-white/30 text-sm">
                  Showing {filteredTopics.length} of 200+ topics
                </p>
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all">
                  Load more topics
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
