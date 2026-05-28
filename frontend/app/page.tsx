'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import {
  Brain,
  Code,
  Rocket,
  Zap,
  Shield,
  BarChart,
  BookOpen,
  Users,
  Trophy,
  Target,
  Globe,
  Lock,
  Cpu,
  Server,
  Sparkles,
  ChevronRight,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Gamepad,
  Music,
  Camera,
  Plane,
  Dumbbell,
  Flame,
  Clock,
  Layers,
  GitBranch,
  Database,
  Star,
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Brain,
    gradient: 'from-purple-500 to-violet-600',
    title: 'AI-Generated Curriculum',
    description:
      'Personalized content generated on-demand by Claude AI. Every lesson adapts to your learning style, pace, and existing knowledge.',
  },
  {
    icon: Rocket,
    gradient: 'from-cyan-500 to-blue-600',
    title: 'Career Learning Paths',
    description:
      'Structured roadmaps for 20+ tech roles. Go from zero to job-ready with curated, ordered modules that mirror real hiring requirements.',
  },
  {
    icon: Star,
    gradient: 'from-pink-500 to-rose-600',
    title: 'Hobby Personalization',
    description:
      'Learn with examples drawn from your passions. Love cricket? Understand data structures through match statistics and player analytics.',
  },
  {
    icon: Code,
    gradient: 'from-green-500 to-emerald-600',
    title: 'Embedded Code Editor',
    description:
      'Practice inside a full Monaco editor without leaving the lesson. Submit your solution and get instant AI code review with detailed feedback.',
  },
  {
    icon: Shield,
    gradient: 'from-amber-500 to-orange-600',
    title: 'Expert Validation',
    description:
      'Every piece of AI-generated content is automatically scored and must pass an 85%+ accuracy threshold before it reaches you.',
  },
  {
    icon: BarChart,
    gradient: 'from-teal-500 to-cyan-600',
    title: 'Progress Tracking',
    description:
      'Earn XP, maintain streaks, and visualise your skills on interactive radar charts. Gamified progress keeps motivation high.',
  },
]

const categories = [
  { icon: Code, name: 'Programming', count: 42, color: 'from-purple-500 to-violet-600' },
  { icon: Globe, name: 'Frontend', count: 28, color: 'from-cyan-500 to-blue-600' },
  { icon: Server, name: 'Backend', count: 35, color: 'from-green-500 to-emerald-600' },
  { icon: Brain, name: 'AI / ML', count: 31, color: 'from-pink-500 to-rose-600' },
  { icon: Cpu, name: 'Cloud & DevOps', count: 24, color: 'from-amber-500 to-orange-600' },
  { icon: Lock, name: 'Security', count: 18, color: 'from-red-500 to-rose-600' },
  { icon: Database, name: 'Databases', count: 22, color: 'from-teal-500 to-cyan-600' },
  { icon: Layers, name: 'System Design', count: 15, color: 'from-indigo-500 to-purple-600' },
]

const careerPaths = [
  {
    title: 'Full Stack Java',
    gradient: 'from-purple-600 to-violet-700',
    stack: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Docker'],
    duration: '6 months',
    difficulty: 'Intermediate',
    difficultyColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
  {
    title: 'AI Engineer',
    gradient: 'from-cyan-600 to-blue-700',
    stack: ['Python', 'PyTorch', 'LangChain', 'FastAPI', 'RAG'],
    duration: '5 months',
    difficulty: 'Advanced',
    difficultyColor: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
  {
    title: 'DevOps & Cloud',
    gradient: 'from-green-600 to-emerald-700',
    stack: ['AWS', 'Terraform', 'Kubernetes', 'GitHub Actions', 'Prometheus'],
    duration: '4 months',
    difficulty: 'Intermediate',
    difficultyColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
  {
    title: 'MERN Stack',
    gradient: 'from-pink-600 to-rose-700',
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'TypeScript'],
    duration: '4 months',
    difficulty: 'Beginner',
    difficultyColor: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
]

const hobbies = [
  { id: 'gaming', label: 'Gaming', icon: Gamepad, color: 'from-purple-500 to-violet-600' },
  { id: 'cricket', label: 'Cricket', icon: Target, color: 'from-green-500 to-emerald-600' },
  { id: 'music', label: 'Music', icon: Music, color: 'from-pink-500 to-rose-600' },
  { id: 'fitness', label: 'Fitness', icon: Dumbbell, color: 'from-amber-500 to-orange-600' },
  { id: 'photography', label: 'Photography', icon: Camera, color: 'from-cyan-500 to-blue-600' },
  { id: 'travel', label: 'Travel', icon: Plane, color: 'from-teal-500 to-cyan-600' },
]

const hobbyExamples: Record<string, { topic: string; lesson: string; code: string }> = {
  gaming: {
    topic: 'Data Structures via Game Inventory',
    lesson:
      'Understand hash maps and arrays by modelling a game inventory system. Each item slot maps directly to a key-value store — exactly how Python dicts work.',
    code: `# Game inventory using a dict (hash map)
inventory = {
    "sword": {"damage": 45, "qty": 1},
    "potion": {"heal": 50, "qty": 12},
}

def use_item(name: str) -> str:
    item = inventory.get(name)          # O(1) lookup
    if item and item["qty"] > 0:
        item["qty"] -= 1
        return f"Used {name}!"
    return "Item not found."`,
  },
  cricket: {
    topic: 'Statistics & Data Analysis via Cricket',
    lesson:
      'Learn Pandas DataFrames through real IPL match data. Aggregate batting averages, compute strike rates, and visualise run trends — all with live data.',
    code: `import pandas as pd

matches = pd.read_csv("ipl_2024.csv")

# Top 5 run-scorers this season
top_batters = (
    matches.groupby("batter")["runs_scored"]
    .sum()
    .sort_values(ascending=False)
    .head(5)
)
print(top_batters)`,
  },
  music: {
    topic: 'Algorithms via Audio Signal Processing',
    lesson:
      'Discover sorting algorithms through music playlist curation. Merge-sort playlists by BPM, frequency analysis with FFT — algorithms you will actually remember.',
    code: `import numpy as np

def analyze_beat(audio_samples, sample_rate=44100):
    """Detect BPM using Fast Fourier Transform."""
    fft_result = np.fft.fft(audio_samples)
    frequencies = np.fft.fftfreq(
        len(audio_samples), 1 / sample_rate
    )
    dominant_freq = frequencies[
        np.argmax(np.abs(fft_result))
    ]
    bpm = abs(dominant_freq) * 60
    return round(bpm, 1)`,
  },
  fitness: {
    topic: 'APIs & Data Modelling via Fitness Tracking',
    lesson:
      'Build a personal workout API with FastAPI. Model sets, reps, and progressive overload as REST resources — REST concepts click when the data is your own.',
    code: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class WorkoutSet(BaseModel):
    exercise: str
    weight_kg: float
    reps: int

@app.post("/log")
def log_set(s: WorkoutSet) -> dict:
    volume = s.weight_kg * s.reps        # total volume
    return {"exercise": s.exercise, "volume_kg": volume}`,
  },
  photography: {
    topic: 'Image Processing & Computer Vision',
    lesson:
      'Learn NumPy array operations by editing photos. Brightness, contrast, and blur filters are just matrix math — theory you can see with your own images.',
    code: `from PIL import Image
import numpy as np

def adjust_brightness(path: str, factor: float) -> Image.Image:
    img = Image.open(path)
    arr = np.array(img, dtype=np.float32)

    # Matrix multiplication = brightness change
    arr = np.clip(arr * factor, 0, 255)

    return Image.fromarray(arr.astype(np.uint8))

brighter = adjust_brightness("sunset.jpg", 1.4)
brighter.save("sunset_bright.jpg")`,
  },
  travel: {
    topic: 'Graph Algorithms via Route Optimisation',
    lesson:
      "Plan the perfect trip with Dijkstra's algorithm. Shortest-path finding makes graph theory tangible — your travel wishlist becomes a live coding exercise.",
    code: `import heapq

def cheapest_flight(graph, src, dst):
    """Dijkstra's algorithm for cheapest fare."""
    heap = [(0, src)]          # (cost, city)
    visited = {}

    while heap:
        cost, city = heapq.heappop(heap)
        if city in visited:
            continue
        visited[city] = cost
        if city == dst:
            return cost
        for neighbour, fare in graph.get(city, []):
            heapq.heappush(heap, (cost + fare, neighbour))
    return float("inf")`,
  },
}

const stats = [
  { value: '95%', label: 'Validation Score', icon: CheckCircle, color: 'from-purple-500 to-violet-600' },
  { value: '100hrs', label: 'Content per Topic', icon: Clock, color: 'from-cyan-500 to-blue-600' },
  { value: 'AI-First', label: 'Platform Design', icon: Brain, color: 'from-pink-500 to-rose-600' },
  { value: 'Zero', label: 'Complexity Barriers', icon: Zap, color: 'from-amber-500 to-orange-600' },
]

// ─── Animated Counter ────────────────────────────────────────────────────────

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [displayed, setDisplayed] = useState('0')

  useEffect(() => {
    const numeric = parseInt(value.replace(/\D/g, ''), 10)
    if (isNaN(numeric)) {
      setDisplayed(value)
      return
    }
    let start = 0
    const step = Math.ceil(numeric / 40)
    const timer = setInterval(() => {
      start += step
      if (start >= numeric) {
        clearInterval(timer)
        setDisplayed(value)
      } else {
        setDisplayed(value.replace(/\d+/, String(start)))
      }
    }, 30)
    return () => clearInterval(timer)
  }, [value])

  return <span>{displayed}</span>
}

// ─── Floating Code Card ───────────────────────────────────────────────────────

function FloatingCodeCard() {
  return (
    <div className="relative w-full max-w-sm mx-auto lg:mx-0 animate-float">
      {/* Glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-400 opacity-30 blur-lg" />
      <div className="relative bg-[#0d0d14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-white/40 font-mono">ai_lesson.py — AI Tutor</span>
        </div>
        {/* Code */}
        <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto">
          <code>
            <span className="text-purple-400"># AI-Generated Lesson: Sorting Algorithms</span>
            {'\n'}
            <span className="text-cyan-400">def</span>{' '}
            <span className="text-green-400">quicksort</span>
            <span className="text-white">(arr):</span>
            {'\n'}
            <span className="text-white/40">    </span>
            <span className="text-cyan-400">if</span>
            <span className="text-white"> len(arr) </span>
            <span className="text-purple-400">&lt;=</span>
            <span className="text-amber-400"> 1</span>
            <span className="text-white">:</span>
            {'\n'}
            <span className="text-white/40">        </span>
            <span className="text-cyan-400">return</span>
            <span className="text-white"> arr</span>
            {'\n'}
            <span className="text-white/40">    </span>
            <span className="text-white">pivot </span>
            <span className="text-purple-400">=</span>
            <span className="text-white"> arr[len(arr) </span>
            <span className="text-purple-400">//</span>
            <span className="text-amber-400"> 2</span>
            <span className="text-white">]</span>
            {'\n'}
            <span className="text-white/40">    </span>
            <span className="text-white">left  </span>
            <span className="text-purple-400">=</span>
            <span className="text-white"> [x </span>
            <span className="text-cyan-400">for</span>
            <span className="text-white"> x </span>
            <span className="text-cyan-400">in</span>
            <span className="text-white"> arr </span>
            <span className="text-cyan-400">if</span>
            <span className="text-white"> x </span>
            <span className="text-purple-400">&lt;</span>
            <span className="text-white"> pivot]</span>
            {'\n'}
            <span className="text-white/40">    </span>
            <span className="text-white">right </span>
            <span className="text-purple-400">=</span>
            <span className="text-white"> [x </span>
            <span className="text-cyan-400">for</span>
            <span className="text-white"> x </span>
            <span className="text-cyan-400">in</span>
            <span className="text-white"> arr </span>
            <span className="text-cyan-400">if</span>
            <span className="text-white"> x </span>
            <span className="text-purple-400">&gt;</span>
            <span className="text-white"> pivot]</span>
            {'\n'}
            <span className="text-white/40">    </span>
            <span className="text-cyan-400">return</span>
            <span className="text-white"> quicksort(left) </span>
            <span className="text-purple-400">+</span>
            <span className="text-white"> [pivot] </span>
            <span className="text-purple-400">+</span>
            <span className="text-white"> quicksort(right)</span>
            {'\n\n'}
            <span className="text-white/40"># ✅ AI Review: O(n log n) average — great work!</span>
          </code>
        </pre>
        {/* AI badge */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/3 border-t border-white/10">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs text-white/60">Claude AI reviewed your solution</span>
          <span className="ml-auto text-xs font-semibold text-green-400">98% score</span>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [selectedHobby, setSelectedHobby] = useState<string>('gaming')

  const example = hobbyExamples[selectedHobby]

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-[#0a0a0f] to-cyan-900/30" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-600/15 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        {/* Particle dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/20 animate-pulse"
              style={{
                left: `${(i * 37 + 5) % 100}%`,
                top: `${(i * 53 + 10) % 100}%`,
                animationDelay: `${(i * 0.3) % 3}s`,
                animationDuration: `${2 + (i % 3)}s`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left column */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-white/70">Powered by Claude AI</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Master Any Skill with{' '}
                <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  AI-Powered Learning
                </span>
              </h1>

              <p className="text-lg text-white/60 leading-relaxed max-w-lg">
                Get personalized learning paths crafted by AI, hands-on coding exercises with live
                review, and lessons tailored to your hobbies and career goals.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/signup"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/25"
                >
                  Start Learning Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/topics"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white/80 font-semibold hover:border-purple-500/50 hover:text-white transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  Explore Topics
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 pt-4">
                {[
                  { value: '200+', label: 'Topics' },
                  { value: '50+', label: 'Career Paths' },
                  { value: '10K+', label: 'Learners' },
                  { value: 'AI', label: 'Powered' },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                    <span className="text-xs text-white/50">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column — floating code card */}
            <div className="flex justify-center lg:justify-end">
              <FloatingCodeCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                level up fast
              </span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              A complete learning ecosystem built from the ground up with AI at the core — not
              bolted on as an afterthought.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/8"
                >
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${f.gradient} mb-4 shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">{f.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Topic Categories ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Explore{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Topic Categories
              </span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Dive into any domain. Every category contains structured lessons, hands-on exercises,
              and AI-generated examples.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.name}
                  href="/topics"
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:scale-105 transition-all duration-300 hover:border-purple-500/50 flex flex-col gap-3 cursor-pointer"
                >
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${cat.color} w-fit shadow-lg`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{cat.name}</p>
                    <p className="text-xs text-white/40 mt-0.5">{cat.count} topics</p>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/topics"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white/70 hover:text-white hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              View All Topics
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Career Paths ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Structured{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Career Paths
              </span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Follow a proven roadmap from beginner to job-ready. Every path mirrors real hiring
              criteria across top tech companies.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerPaths.map((path) => (
              <div
                key={path.title}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 hover:border-purple-500/50 flex flex-col"
              >
                {/* Gradient header */}
                <div className={`h-2 bg-gradient-to-r ${path.gradient}`} />
                <div className="p-5 flex flex-col gap-4 flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-base leading-snug">{path.title}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium shrink-0 ml-2 ${path.difficultyColor}`}
                    >
                      {path.difficulty}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {path.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-0.5 rounded-md bg-white/8 border border-white/10 text-white/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center gap-2 text-xs text-white/40">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{path.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/paths"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/20"
            >
              View All Paths
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Hobby Personalization ─────────────────────────────────────────── */}
      <section className="py-24 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: explanation */}
            <div className="flex flex-col gap-6 lg:sticky lg:top-24">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 w-fit">
                <Star className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-300">Hobby Personalization</span>
              </div>

              <h2 className="text-4xl font-bold">
                Learn through{' '}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  what you love
                </span>
              </h2>

              <p className="text-white/60 leading-relaxed">
                Abstract concepts stick when they come wrapped in something you already care about.
                Pick a hobby and watch how the AI transforms standard lessons into stories and
                examples that resonate with you personally.
              </p>

              <ul className="flex flex-col gap-3">
                {[
                  'Concepts explained with real-world hobby examples',
                  'Practice exercises built around your interests',
                  'Projects that double as passion projects',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Hobby selector buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                {hobbies.map((hobby) => {
                  const Icon = hobby.icon
                  const isActive = selectedHobby === hobby.id
                  return (
                    <button
                      key={hobby.id}
                      onClick={() => setSelectedHobby(hobby.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-300 hover:scale-105 ${
                        isActive
                          ? `bg-gradient-to-r ${hobby.color} border-transparent text-white shadow-lg`
                          : 'bg-white/5 border-white/10 text-white/60 hover:border-purple-500/50 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {hobby.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Right: live example */}
            <div className="flex flex-col gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-purple-500/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider">AI Lesson</p>
                    <p className="text-sm font-semibold text-white">{example.topic}</p>
                  </div>
                </div>
                <p className="text-sm text-white/60 leading-relaxed border-l-2 border-purple-500/40 pl-4">
                  {example.lesson}
                </p>
              </div>

              <div className="bg-[#0d0d14] border border-white/10 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs text-white/40 font-mono">example.py</span>
                </div>
                <pre className="p-5 text-xs font-mono leading-relaxed overflow-x-auto text-white/75 whitespace-pre">
                  {example.code}
                </pre>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/3 border border-white/8">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <p className="text-xs text-white/50">
                  This example was generated by Claude AI specifically for{' '}
                  <span className="text-white/80 capitalize">{selectedHobby}</span> enthusiasts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof / Stats ──────────────────────────────────────────── */}
      <section className="py-24 bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Built for{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                serious learners
              </span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Quality over quantity. Every metric reflects our obsession with making learning
              genuinely effective.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.label}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:border-purple-500/50 text-center flex flex-col items-center gap-3"
                >
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${s.color} shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    <AnimatedStat value={s.value} label={s.label} />
                  </p>
                  <p className="text-sm text-white/50">{s.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0a0a0f] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-cyan-900/20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Ready to start your{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              AI learning journey?
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl">
            Join thousands of learners who are accelerating their careers with AI-personalised
            lessons and expert-validated content.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/signup"
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-lg hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-xl shadow-purple-500/25"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/paths"
              className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white/80 font-semibold text-lg hover:border-purple-500/50 hover:text-white transition-all duration-300 hover:scale-105"
            >
              View Career Paths
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="bg-[#07070d] border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-2 w-fit">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-400">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold text-lg tracking-tight">
                  AI
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Upskill
                  </span>
                </span>
              </Link>
              <p className="text-sm text-white/40 leading-relaxed max-w-xs">
                The AI-first learning platform that personalises every lesson to your career goals
                and hobbies. Master any skill, faster.
              </p>
            </div>

            {/* Links */}
            {[
              {
                heading: 'Product',
                links: [
                  { label: 'How it works', href: '/about' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'Changelog', href: '/changelog' },
                ],
              },
              {
                heading: 'Topics',
                links: [
                  { label: 'Programming', href: '/topics' },
                  { label: 'AI / ML', href: '/topics' },
                  { label: 'Cloud & DevOps', href: '/topics' },
                ],
              },
              {
                heading: 'Paths',
                links: [
                  { label: 'Full Stack Java', href: '/paths' },
                  { label: 'AI Engineer', href: '/paths' },
                  { label: 'MERN Stack', href: '/paths' },
                ],
              },
            ].map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/30">
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              &copy; {new Date().getFullYear()}{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-medium">
                AIUpskill
              </span>
              . All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {['Privacy', 'Terms', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href="/"
                  className="text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Keyframes for float animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
