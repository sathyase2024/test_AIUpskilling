'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import BrandLogo, { BrandMark } from '@/components/BrandLogo'
import {
  Sparkles,
  Search,
  Brain,
  Bot,
  Rocket,
  Award,
  GraduationCap,
  Clock,
  Gamepad2,
  Music,
  Camera,
  Code2,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Database,
  Cloud,
  Container,
  GitBranch,
  Shield,
  Server,
  Cpu,
  Layers,
  PlayCircle,
  Zap,
  Target,
  BookOpen,
  Users,
  Trophy,
  Star,
  Medal,
  Video,
  AtSign,
  Bird,
  Wallet,
  Briefcase,
  Crown,
  PiggyBank,
  Lightbulb,
  Activity,
  FileCode,
  Terminal,
  MessageSquare,
  LineChart,
} from 'lucide-react'

// ─── Shared classes ───────────────────────────────────────────────────────────

const CARD =
  'bg-white border border-slate-200 shadow-sm dark:bg-[#12121a] dark:border-white/10'
const HEADING = 'text-slate-900 dark:text-white'
const BODY = 'text-slate-600 dark:text-white/70'
const MUTED = 'text-slate-400 dark:text-white/40'
const AMBER_LINK =
  'inline-flex items-center gap-1 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500'
const CHIP =
  'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30'
const PRIMARY_BTN =
  'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-400 hover:to-amber-500'
const SCROLLER =
  'flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:px-0 lg:overflow-visible lg:grid lg:snap-none lg:pb-0'

// ─── Data ──────────────────────────────────────────────────────────────────────

const ribbon = [
  { icon: GraduationCap, label: '100% Free Forever', emoji: '🎓' },
  { icon: Sparkles, label: 'AI-Powered Learning', emoji: '✨' },
  { icon: Award, label: 'Industry Expert Content', emoji: '🏆' },
  { icon: Medal, label: 'Certificates & Badges', emoji: '📜' },
  { icon: Clock, label: 'Learn At Your Own Pace', emoji: '⏱' },
]

const heroFeatures = [
  { icon: Sparkles, title: 'Hobby-Based Learning', desc: 'Learn concepts through what you love' },
  { icon: Bot, title: 'AI Mentor 24/7', desc: 'Personalized guidance anytime' },
  { icon: Rocket, title: 'Real-world Projects', desc: 'Build. Showcase. Get Hired.' },
  { icon: Award, title: 'Certificates', desc: 'Industry-recognized completion certificates' },
]

const popularSearches = ['Python', 'AI Engineer', 'DevOps', 'SQL', 'Data Science', 'Web Development']

const employers = ['Google', 'Microsoft', 'Amazon', 'Deloitte', 'TCS', 'IBM', 'Infosys', '& 500+ More']

const hobbies = [
  { label: 'Cricket', emoji: '🏏', tint: 'bg-green-50 dark:bg-green-500/10' },
  { label: 'Gaming', emoji: '🎮', tint: 'bg-violet-50 dark:bg-violet-500/10' },
  { label: 'Music', emoji: '🎧', tint: 'bg-pink-50 dark:bg-pink-500/10' },
  { label: 'Photography', emoji: '📷', tint: 'bg-sky-50 dark:bg-sky-500/10' },
  { label: 'Travel', emoji: '✈️', tint: 'bg-teal-50 dark:bg-teal-500/10' },
  { label: 'Movies', emoji: '🎬', tint: 'bg-rose-50 dark:bg-rose-500/10' },
  { label: 'Fitness', emoji: '💪', tint: 'bg-orange-50 dark:bg-orange-500/10' },
  { label: 'Chess', emoji: '♟️', tint: 'bg-slate-100 dark:bg-white/5' },
  { label: 'Cooking', emoji: '🍳', tint: 'bg-amber-50 dark:bg-amber-500/10' },
  { label: 'Finance', emoji: '💰', tint: 'bg-emerald-50 dark:bg-emerald-500/10' },
  { label: 'Business', emoji: '💼', tint: 'bg-indigo-50 dark:bg-indigo-500/10' },
  { label: 'Sports', emoji: '🏆', tint: 'bg-yellow-50 dark:bg-yellow-500/10' },
]

const stats = [
  { icon: Rocket, value: '12,000+', label: 'Projects Built' },
  { icon: Award, value: '8,500+', label: 'Certificates Earned' },
  { icon: BookOpen, value: '10,000+', label: 'Practice Questions' },
  { icon: GraduationCap, value: '100%', label: 'Free Forever' },
]

const learningPaths = [
  { icon: Brain, title: 'AI Engineer Path', meta: '50+ Topics', demand: 'High Demand' },
  { icon: Layers, title: 'Full Stack Developer', meta: '60+ Topics', demand: 'High Demand' },
  { icon: LineChart, title: 'Data Analyst Path', meta: '40+ Topics', demand: 'Growing' },
  { icon: Container, title: 'DevOps Engineer', meta: '45+ Topics', demand: 'Fast Growing' },
  { icon: Shield, title: 'Cyber Security Analyst', meta: '35+ Topics', demand: 'High Demand' },
  { icon: Cloud, title: 'Cloud Engineer', meta: '40+ Topics', demand: 'High Demand' },
]

const capstones = [
  { icon: FileCode, title: 'AI Resume Builder', stack: 'NLP, Python' },
  { icon: Video, title: 'Netflix Clone', stack: 'Next.js, Tailwind' },
  { icon: Activity, title: 'IPL Analytics Dashboard', stack: 'Python, Pandas' },
  { icon: Bot, title: 'AI Interview Coach', stack: 'LLM, Python' },
  { icon: Container, title: 'DevOps CI/CD Pipeline', stack: 'AWS, Docker' },
  { icon: Briefcase, title: 'E-Commerce Platform', stack: 'MERN Stack' },
  { icon: Wallet, title: 'Expense Tracker', stack: 'MERN Stack' },
  { icon: TrendingUp, title: 'Stock Price Predictor', stack: 'ML, Python' },
]

const roadmaps = [
  { title: 'AI Engineer', salary: '₹8-20 LPA', demand: 'High Demand' },
  { title: 'Data Analyst', salary: '₹5-15 LPA', demand: 'Growing' },
  { title: 'Full Stack Developer', salary: '₹6-18 LPA', demand: 'High Demand' },
  { title: 'Cloud Engineer', salary: '₹7-17 LPA', demand: 'Fast Growing' },
  { title: 'ML Engineer', salary: '₹10-25 LPA', demand: 'High Demand' },
  { title: 'Data Scientist', salary: '₹9-22 LPA', demand: 'Growing' },
  { title: 'DevOps Engineer', salary: '₹7-18 LPA', demand: 'Fast Growing' },
  { title: 'JavaScript Developer', salary: '₹4-12 LPA', demand: 'From Zero to Hero' },
]

const tutorials = [
  { icon: Terminal, label: 'Python Tutorial', color: 'text-amber-500' },
  { icon: Database, label: 'SQL Tutorial', color: 'text-sky-500' },
  { icon: Code2, label: 'Java Tutorial', color: 'text-orange-500' },
  { icon: Cpu, label: 'React Tutorial', color: 'text-cyan-500' },
  { icon: Brain, label: 'Machine Learning', color: 'text-pink-500' },
  { icon: Cloud, label: 'AWS Tutorial', color: 'text-yellow-600' },
  { icon: Container, label: 'Docker Tutorial', color: 'text-blue-500' },
  { icon: FileCode, label: 'JavaScript Guide', color: 'text-yellow-500' },
]

const interviewTopics = [
  { icon: Terminal, label: 'Python Interview' },
  { icon: Database, label: 'SQL Interview' },
  { icon: Layers, label: 'System Design' },
  { icon: Cpu, label: 'React Interview' },
  { icon: MessageSquare, label: 'Behavioral Questions' },
]

const exploreTopics = [
  'Python', 'Java', 'JavaScript', 'React', 'Node.js', 'TypeScript', 'SQL',
  'MongoDB', 'Git', 'Docker', 'Kubernetes', 'AWS', 'Linux', 'DSA', 'AI/ML', '+ More',
]

const testimonials = [
  {
    quote: 'SkillVeris taught me Python through Cricket. Now I’m building real projects and feeling confident!',
    name: 'Arjun S.',
    role: 'B.Tech Student',
  },
  {
    quote: 'The best platform for hobby-based learning. Concepts finally stick.',
    name: 'Priya R.',
    role: 'Data Analyst',
  },
  {
    quote: 'I went from zero coding to a portfolio of projects — all by learning through my love for gaming. Landed my first internship!',
    name: 'Kabir M.',
    role: 'CS Undergraduate',
  },
]

const challenges = [
  { icon: Terminal, title: 'Python Challenge', participants: '2,180 Participants' },
  { icon: Sparkles, title: 'AI Prompt Challenge', participants: '3,104 Participants' },
  { icon: Database, title: 'SQL Challenge', participants: '2,542 Participants' },
  { icon: Code2, title: 'Web Dev Challenge', participants: '1,948 Participants' },
]

const leaderboard = [
  { rank: 1, name: 'Rahul K.', xp: '12,450 XP', chip: 'bg-amber-400 text-amber-950' },
  { rank: 2, name: 'Priya R.', xp: '10,230 XP', chip: 'bg-slate-300 text-slate-800 dark:bg-slate-400' },
  { rank: 3, name: 'Arjun S.', xp: '8,910 XP', chip: 'bg-orange-300 text-orange-950' },
]

const footerColumns = [
  {
    heading: 'Learn',
    links: [
      { label: 'All Courses', href: '/topics' },
      { label: 'Learning Paths', href: '/paths' },
      { label: 'Practice Questions', href: '/codelab' },
      { label: 'Mock Tests', href: '/codelab' },
      { label: 'Code Lab', href: '/codelab' },
    ],
  },
  {
    heading: 'Career Paths',
    links: [
      { label: 'AI Engineer', href: '/paths' },
      { label: 'Full Stack Developer', href: '/paths' },
      { label: 'Data Analyst', href: '/paths' },
      { label: 'DevOps Engineer', href: '/paths' },
      { label: 'Cloud Engineer', href: '/paths' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Blog', href: '/topics' },
      { label: 'Cheat Sheets', href: '/topics' },
      { label: 'Interview Questions', href: '/topics' },
      { label: 'Study Notes', href: '/topics' },
      { label: 'Roadmaps', href: '/topics' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/terms' },
      { label: 'Our Mission', href: '/terms' },
      { label: 'Careers', href: '/terms' },
      { label: 'Contact Us', href: '/terms' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/privacy' },
      { label: 'Code of Conduct', href: '/terms' },
    ],
  },
]

// ─── Section header ──────────────────────────────────────────────────────────

function SectionHead({
  title,
  href,
  scrollable = true,
}: {
  title: string
  href?: string
  scrollable?: boolean
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6">
      <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${HEADING}`}>{title}</h2>
      {href ? (
        <Link href={href} className={`${AMBER_LINK} shrink-0`}>
          <span className="lg:hidden">Swipe</span>
          <span className="hidden lg:inline">View All</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      ) : scrollable ? (
        <span className={`${AMBER_LINK} shrink-0 lg:hidden`}>
          Swipe
          <ArrowRight className="w-4 h-4" />
        </span>
      ) : null}
    </div>
  )
}

function DemandPill({ label }: { label: string }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CHIP}`}>{label}</span>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    router.push('/topics')
  }

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <div className="min-h-screen overflow-x-hidden pb-20 md:pb-0">
      <Navbar />

      {/* ── 1. Feature ribbon ─────────────────────────────────────────────── */}
      <div className="pt-16 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto py-2.5 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:justify-center">
            {ribbon.map((r) => {
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

      {/* ── 2. Hero ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Glow orbs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/4 w-80 h-80 bg-amber-400/15 dark:bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/10 dark:bg-amber-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="flex flex-col gap-6 min-w-0">
              <span className={`inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full text-xs font-semibold ${CHIP}`}>
                <Sparkles className="w-3.5 h-3.5" />
                The World&apos;s First
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                  Hobby-Personalized
                </span>
                <br />
                <span className={HEADING}>Learning Platform</span>
              </h1>

              <p className={`text-lg ${BODY} max-w-lg`}>
                Learn technology through what you love.
              </p>

              {/* Search */}
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <div className={`flex items-center gap-2 flex-1 rounded-xl px-4 ${CARD}`}>
                  <Search className={`w-4 h-4 shrink-0 ${MUTED}`} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="What do you want to learn?"
                    aria-label="Search topics"
                    className={`w-full min-w-0 bg-transparent py-3 text-sm outline-none ${HEADING} placeholder:text-slate-400 dark:placeholder:text-white/40`}
                  />
                </div>
                <button
                  type="submit"
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-amber-500/20 transition-all ${PRIMARY_BTN}`}
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </form>

              {/* Popular searches */}
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs font-semibold ${MUTED}`}>Popular Searches:</span>
                {popularSearches.map((p) => (
                  <Link
                    key={p}
                    href="/topics"
                    className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${CHIP} hover:brightness-95`}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="relative min-w-0">
              {/* Decorative central shield + floating hobby orbs */}
              <div className="relative mx-auto mb-8 hidden sm:flex h-56 items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-amber-400/15 dark:bg-amber-500/15 blur-2xl" />
                </div>
                <div className={`relative z-10 rounded-3xl p-6 ${CARD}`}>
                  <BrandMark className="w-24 h-24" />
                </div>
                {[
                  { Icon: Gamepad2, pos: 'top-0 left-2' },
                  { Icon: Music, pos: 'top-2 right-2' },
                  { Icon: Camera, pos: 'bottom-2 left-6' },
                  { Icon: Code2, pos: 'bottom-0 right-6' },
                ].map(({ Icon, pos }, i) => (
                  <div
                    key={i}
                    className={`absolute ${pos} z-20 flex h-11 w-11 items-center justify-center rounded-2xl shadow-md ${CARD}`}
                  >
                    <Icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                ))}
              </div>

              {/* Feature card list */}
              <div className={`rounded-2xl p-5 flex flex-col gap-3 ${CARD}`}>
                {heroFeatures.map((f) => {
                  const Icon = f.icon
                  return (
                    <div key={f.title} className="flex items-start gap-3">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${CHIP}`}>
                        <Icon className="w-5 h-5" />
                      </span>
                      <div className="min-w-0">
                        <p className={`font-semibold text-sm ${HEADING}`}>{f.title}</p>
                        <p className={`text-xs ${BODY}`}>{f.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Employer strip ─────────────────────────────────────────────── */}
      <section className="py-10 border-y border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className={`text-center text-sm font-semibold mb-5 ${BODY}`}>
            Skills Aligned With Top Technology Employers
          </p>
          <div className="flex gap-8 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:justify-center">
            {employers.map((e) => (
              <span
                key={e}
                className={`shrink-0 whitespace-nowrap text-lg font-bold tracking-tight ${MUTED}`}
              >
                {e}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Learn through what you love ────────────────────────────────── */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead title="Learn Through What You Love" href="/signup" />
        <div className={`${SCROLLER} lg:grid-cols-6`}>
          {hobbies.map((h) => (
            <Link
              key={h.label}
              href="/signup"
              className={`group shrink-0 w-28 lg:w-auto snap-start rounded-2xl p-4 flex flex-col items-center gap-2 transition-all hover:-translate-y-1 ${CARD}`}
            >
              <span className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${h.tint}`}>
                {h.emoji}
              </span>
              <span className={`text-xs font-semibold text-center ${HEADING}`}>{h.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 5. Continue learning ──────────────────────────────────────────── */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-6 ${HEADING}`}>
          Continue Learning
        </h2>
        <div className="grid lg:grid-cols-3 gap-4">
          <div className={`lg:col-span-2 rounded-2xl p-6 ${CARD}`}>
            <div className="flex items-center justify-between gap-4 mb-1">
              <p className={`font-bold ${HEADING}`}>Python for Cricket Lovers</p>
              <span className={`text-xs font-semibold ${MUTED}`}>65% Complete</span>
            </div>
            <p className={`text-sm mb-4 ${BODY}`}>Working with Pandas</p>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden mb-5">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-600" style={{ width: '65%' }} />
            </div>
            <Link
              href="/learn/python-for-ai-ml"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-amber-500/20 transition-all ${PRIMARY_BTN}`}
            >
              <PlayCircle className="w-4 h-4" />
              Resume
            </Link>
          </div>
          <div className={`rounded-2xl p-6 flex flex-col justify-center gap-2 ${CARD}`}>
            <span className={`text-xs font-semibold uppercase tracking-wider ${MUTED}`}>Next Up</span>
            <p className={`font-semibold ${HEADING}`}>Data Analysis with Pandas</p>
            <span className={`flex items-center gap-1.5 text-xs ${BODY}`}>
              <Clock className="w-3.5 h-3.5" />
              25 min
            </span>
          </div>
        </div>
      </section>

      {/* ── 6. Stats row ──────────────────────────────────────────────────── */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className={`rounded-2xl p-6 flex flex-col items-center text-center gap-2 ${CARD}`}>
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${CHIP}`}>
                  <Icon className="w-5 h-5" />
                </span>
                <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">{s.value}</p>
                <p className={`text-xs font-medium ${BODY}`}>{s.label}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── 7. Top learning paths ─────────────────────────────────────────── */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead title="Top Learning Paths" href="/paths" />
        <div className={`${SCROLLER} lg:grid-cols-3`}>
          {learningPaths.map((p) => {
            const Icon = p.icon
            return (
              <Link
                key={p.title}
                href="/paths"
                className={`group shrink-0 w-72 lg:w-auto snap-start rounded-2xl p-5 flex flex-col gap-3 transition-all hover:-translate-y-1 ${CARD}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${CHIP}`}>
                    <Icon className="w-5 h-5" />
                  </span>
                  <DemandPill label={p.demand} />
                </div>
                <p className={`font-bold ${HEADING}`}>{p.title}</p>
                <p className={`text-xs ${MUTED}`}>{p.meta}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── 8. Capstone projects ──────────────────────────────────────────── */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead title="Build Portfolio-Worthy Capstone Projects" href="/topics" />
        <div className={`${SCROLLER} lg:grid-cols-4`}>
          {capstones.map((c) => {
            const Icon = c.icon
            return (
              <Link
                key={c.title}
                href="/topics"
                className={`group shrink-0 w-60 lg:w-auto snap-start rounded-2xl p-5 flex flex-col gap-3 transition-all hover:-translate-y-1 ${CARD}`}
              >
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${CHIP}`}>
                  <Icon className="w-5 h-5" />
                </span>
                <p className={`font-bold leading-snug ${HEADING}`}>{c.title}</p>
                <p className={`text-xs ${MUTED}`}>{c.stack}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── 9. Career roadmaps ────────────────────────────────────────────── */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead title="Career Roadmaps" href="/paths" />
        <div className={`${SCROLLER} lg:grid-cols-4`}>
          {roadmaps.map((r) => (
            <Link
              key={r.title}
              href="/paths"
              className={`group shrink-0 w-60 lg:w-auto snap-start rounded-2xl p-5 flex flex-col gap-2 transition-all hover:-translate-y-1 ${CARD}`}
            >
              <p className={`font-bold ${HEADING}`}>{r.title}</p>
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">{r.salary}</p>
              <DemandPill label={r.demand} />
            </Link>
          ))}
        </div>
      </section>

      {/* ── 10. Trending tutorials ────────────────────────────────────────── */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead title="Trending Tutorials" href="/topics" />
        <div className={`${SCROLLER} lg:grid-cols-4`}>
          {tutorials.map((t) => {
            const Icon = t.icon
            return (
              <Link
                key={t.label}
                href="/topics"
                className={`group shrink-0 w-48 lg:w-auto snap-start rounded-2xl p-5 flex items-center gap-3 transition-all hover:-translate-y-1 ${CARD}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5">
                  <Icon className={`w-5 h-5 ${t.color}`} />
                </span>
                <span className={`font-semibold text-sm ${HEADING}`}>{t.label}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── 11. Popular interview questions ───────────────────────────────── */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead title="Popular Interview Questions" href="/codelab" />
        <div className={`${SCROLLER} lg:grid-cols-5`}>
          {interviewTopics.map((t) => {
            const Icon = t.icon
            return (
              <Link
                key={t.label}
                href="/codelab"
                className={`group shrink-0 w-48 lg:w-auto snap-start rounded-2xl p-5 flex items-center gap-3 transition-all hover:-translate-y-1 ${CARD}`}
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${CHIP}`}>
                  <Icon className="w-5 h-5" />
                </span>
                <span className={`font-semibold text-sm ${HEADING}`}>{t.label}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── 12. Explore learning topics ───────────────────────────────────── */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-6 ${HEADING}`}>
          Explore Learning Topics
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {exploreTopics.map((t) => (
            <Link
              key={t}
              href="/topics"
              className={`text-sm font-medium px-3.5 py-1.5 rounded-full transition-colors ${CHIP} hover:brightness-95`}
            >
              {t}
            </Link>
          ))}
        </div>
      </section>

      {/* ── 13. Save more, learn more ─────────────────────────────────────── */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight text-center mb-2 ${HEADING}`}>
          Save More. Learn More.
        </h2>
        <p className={`text-center text-sm mb-8 ${BODY}`}>
          <span aria-hidden>🐷</span> Why pay a fortune when you can learn it all for free?
        </p>
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          <div className={`rounded-2xl p-6 flex flex-col gap-2 ${CARD}`}>
            <p className={`font-semibold ${BODY}`}>Traditional Platforms</p>
            <p className={`text-3xl font-extrabold line-through ${MUTED}`}>₹2,30,000+</p>
            <p className={`text-xs ${MUTED}`}>Avg. annual cost</p>
          </div>
          <div className="relative rounded-2xl p-6 flex flex-col gap-2 border-2 border-amber-400 dark:border-amber-500/50 bg-amber-50/60 dark:bg-amber-500/10 shadow-lg shadow-amber-500/10">
            <span className={`absolute -top-3 right-5 text-xs font-bold px-3 py-1 rounded-full ${PRIMARY_BTN}`}>
              Most Popular
            </span>
            <p className={`font-semibold ${HEADING}`}>SkillVeris</p>
            <p className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">₹0</p>
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">100% Free Forever</p>
          </div>
        </div>
      </section>

      {/* ── 14. Testimonials ──────────────────────────────────────────────── */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead title="What Students Say" scrollable />
        <div className={`${SCROLLER} lg:grid-cols-3`}>
          {testimonials.map((t) => (
            <div
              key={t.name}
              className={`shrink-0 w-80 lg:w-auto snap-start rounded-2xl p-6 flex flex-col gap-3 ${CARD}`}
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className={`text-sm leading-relaxed ${BODY}`}>&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-auto">
                <p className={`text-sm font-semibold ${HEADING}`}>{t.name}</p>
                <p className={`text-xs ${MUTED}`}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 15. Community & challenges ────────────────────────────────────── */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead title="Community & Challenges" href="/codelab" />
        <div className={`${SCROLLER} lg:grid-cols-4`}>
          {challenges.map((c) => {
            const Icon = c.icon
            return (
              <Link
                key={c.title}
                href="/codelab"
                className={`group shrink-0 w-60 lg:w-auto snap-start rounded-2xl p-5 flex flex-col gap-3 transition-all hover:-translate-y-1 ${CARD}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${CHIP}`}>
                    <Icon className="w-5 h-5" />
                  </span>
                  <span aria-hidden className="text-xl">🏆</span>
                </div>
                <p className={`font-bold ${HEADING}`}>{c.title}</p>
                <p className={`text-xs ${MUTED}`}>{c.participants}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── 16. Weekly leaderboard ────────────────────────────────────────── */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead title="Weekly Leaderboard" href="/dashboard" scrollable={false} />
        <div className={`rounded-2xl p-6 ${CARD}`}>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className={`text-sm font-semibold ${HEADING}`}>This Week&apos;s Top Learners</span>
          </div>
          <ul className="flex flex-col divide-y divide-slate-100 dark:divide-white/10">
            {leaderboard.map((l) => (
              <li key={l.rank} className="flex items-center gap-4 py-3">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${l.chip}`}>
                  {l.rank}
                </span>
                <span className={`flex-1 font-semibold ${HEADING}`}>{l.name}</span>
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">{l.xp}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 17. Newsletter ────────────────────────────────────────────────── */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-2xl p-8 sm:p-10 text-center flex flex-col items-center gap-4 ${CARD}`}>
          <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${HEADING}`}>
            Stay Ahead in Your Learning Journey
          </h2>
          <p className={`max-w-xl text-sm ${BODY}`}>
            Get the best learning resources, tips and updates delivered to your inbox.
          </p>
          {subscribed ? (
            <p className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400">
              <CheckCircle className="w-5 h-5" />
              Thanks! You&apos;re on the list.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className={`flex-1 min-w-0 rounded-xl px-4 py-3 text-sm outline-none ${CARD} ${HEADING} placeholder:text-slate-400 dark:placeholder:text-white/40`}
              />
              <button
                type="submit"
                className={`px-6 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-amber-500/20 transition-all ${PRIMARY_BTN}`}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── 18. Footer ────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 dark:border-white/10 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <BrandLogo />
              <p className={`text-sm leading-relaxed max-w-xs ${BODY}`}>
                The world&apos;s first hobby-personalized learning platform. Learn tech skills
                through what excites you. 100% Free Forever.
              </p>
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                Learn Through What You Love
              </p>
              <div className="flex items-center gap-2">
                {[Video, AtSign, Bird, Camera].map((Icon, i) => (
                  <Link
                    key={i}
                    href="/terms"
                    aria-label="Social link"
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${CARD} ${BODY} hover:text-amber-600 dark:hover:text-amber-400`}
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {footerColumns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-3">
                <p className={`text-xs font-semibold uppercase tracking-widest ${MUTED}`}>
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={`text-sm transition-colors ${BODY} hover:text-amber-600 dark:hover:text-amber-400`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className={`text-xs ${MUTED}`}>
              Made with <span aria-hidden>❤️</span> for learners in India and around the world
            </p>
            <p className={`text-xs ${MUTED}`}>
              © {new Date().getFullYear()} SkillVeris. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
