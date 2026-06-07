'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Clock,
  Users,
  Play,
  BookOpen,
  Award,
  Zap,
  Star,
  TrendingUp,
  Music,
  Gamepad2,
  Camera,
  Dumbbell,
  Plane,
  Coffee,
  ArrowRight,
  ChevronRight,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { apiGet } from '@/lib/api';
import {
  PATH_META,
  DEFAULT_PATH_META,
  DIFFICULTY_LABEL,
  DIFFICULTY_COLOR,
  fmtEnrolled,
} from '@/lib/paths-config';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ApiPath {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMonths: number;
  skills: string[];
  techStack: string[];
  enrolledCount: number;
  rating: number;
  color: string;
  highlights: string[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FILTERS = ['All Paths', 'AI/ML', 'DevOps', 'Cloud', 'Data', 'Full Stack', 'Frontend', 'Security', 'Mobile'];

const HOW_IT_WORKS = [
  { icon: BookOpen, label: 'Choose Path', description: 'Browse AI-curated paths tailored for your target role', step: 1 },
  { icon: Zap, label: 'Personalise', description: 'Tell us your hobbies for cricket-themed examples that click', step: 2 },
  { icon: Play, label: 'Learn & Code', description: 'Complete interactive lessons, exercises, and capstone projects', step: 3 },
  { icon: Award, label: 'Get Certified', description: 'Earn verifiable certificates recognised by top employers', step: 4 },
];

const HOBBIES = [
  { icon: Music, label: 'Music' },
  { icon: Gamepad2, label: 'Gaming' },
  { icon: Camera, label: 'Photography' },
  { icon: Dumbbell, label: 'Fitness' },
  { icon: Plane, label: 'Travel' },
  { icon: Coffee, label: 'Coffee' },
];

// ─── Skeleton card ────────────────────────────────────────────────────────────

function PathCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden animate-pulse">
      <div className="h-28 bg-white/5" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/5 rounded w-full" />
        <div className="h-3 bg-white/5 rounded w-5/6" />
        <div className="flex gap-1.5">
          {[1, 2, 3].map((i) => <div key={i} className="h-5 w-16 bg-white/5 rounded-md" />)}
        </div>
        <div className="flex gap-2 pt-1">
          <div className="flex-1 h-9 bg-white/5 rounded-lg" />
          <div className="flex-1 h-9 bg-white/10 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// ─── Path card ────────────────────────────────────────────────────────────────

function PathCard({ path }: { path: ApiPath }) {
  const meta = PATH_META[path.slug] ?? DEFAULT_PATH_META;
  const Icon = meta.icon;
  const firstAvailableCourse = (PATH_META[path.slug]?.courses ?? []).find((c) => c.available);

  return (
    <div
      className={`group relative rounded-2xl border border-white/10 ${meta.borderGlow} bg-white/5 overflow-hidden transition-all duration-300 hover:shadow-xl ${meta.glowColor} hover:-translate-y-0.5`}
    >
      {/* Card header */}
      <div className={`relative h-28 bg-gradient-to-br ${meta.headerGradient} p-5 flex items-end`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} opacity-20`} />
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center shadow-lg`}>
          <Icon size={18} className="text-white" />
        </div>
        <span className="ml-auto px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/50 text-xs">
          {meta.category}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="font-bold text-base mb-1.5">{path.title}</h3>
        <p className="text-sm text-white/50 mb-4 line-clamp-2">{path.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {path.techStack.slice(0, 4).map((tech, i) => (
            <span key={tech} className={`px-2 py-0.5 rounded-md text-xs font-medium ${meta.stackColors[i] ?? 'bg-white/5 text-white/50'}`}>
              {tech}
            </span>
          ))}
          {path.techStack.length > 4 && (
            <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-white/5 text-white/40">
              +{path.techStack.length - 4} more
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-white/40 mb-5">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {path.durationMonths}m
          </span>
          <span className={`px-2 py-0.5 rounded-full border text-xs ${DIFFICULTY_COLOR[path.difficulty]}`}>
            {DIFFICULTY_LABEL[path.difficulty]}
          </span>
          <span className="flex items-center gap-1 ml-auto">
            <Users size={11} />
            {fmtEnrolled(path.enrolledCount)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/paths/${path.slug}`}
            className="flex-1 py-2 rounded-lg border border-white/15 text-white/70 text-sm font-medium hover:bg-white/5 hover:border-white/25 transition-all text-center"
          >
            View Path
          </Link>
          {firstAvailableCourse ? (
            <Link
              href={`/learn/${firstAvailableCourse.slug}`}
              className={`flex-1 py-2 rounded-lg bg-gradient-to-r ${meta.gradient} text-white text-sm font-medium hover:opacity-90 transition-all text-center`}
            >
              Start
            </Link>
          ) : (
            <Link
              href={`/paths/${path.slug}`}
              className={`flex-1 py-2 rounded-lg bg-gradient-to-r ${meta.gradient} text-white text-sm font-medium hover:opacity-90 transition-all text-center`}
            >
              Explore
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Featured path card ───────────────────────────────────────────────────────

function FeaturedPath({ path }: { path: ApiPath }) {
  const meta = PATH_META[path.slug] ?? DEFAULT_PATH_META;
  const Icon = meta.icon;
  const courses = PATH_META[path.slug]?.courses ?? [];

  return (
    <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-cyan-900/20 pointer-events-none" />
      <div className="relative grid md:grid-cols-2 gap-0">
        {/* Left */}
        <div className="p-8 md:p-10">
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center shadow-lg`}>
              <Icon size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{path.title}</h2>
              <p className="text-sm text-white/50">{meta.category} · {DIFFICULTY_LABEL[path.difficulty]}</p>
            </div>
          </div>

          <p className="text-white/60 mb-5 leading-relaxed">{path.description}</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {path.skills.slice(0, 6).map((skill) => (
              <span key={skill} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">
                {skill}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-5 mb-7 text-sm text-white/50">
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-purple-400" />{path.durationMonths} months</span>
            <span className="flex items-center gap-1.5"><Star size={14} className="text-yellow-400 fill-yellow-400" />{path.rating}</span>
            <span className="flex items-center gap-1.5"><Users size={14} className="text-cyan-400" />{fmtEnrolled(path.enrolledCount)} enrolled</span>
          </div>

          <Link
            href={`/paths/${path.slug}`}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${meta.gradient} text-white font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-200 shadow-lg`}
          >
            <Play size={16} fill="currentColor" />
            View Full Path
          </Link>
        </div>

        {/* Right — course journey */}
        <div className="p-8 md:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10">
          <p className="text-sm text-white/40 uppercase tracking-widest font-semibold mb-5">Learning Journey</p>
          <div className="space-y-3">
            {courses.map((course, i) => (
              <div key={course.slug} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  course.available
                    ? 'border-green-500/40 bg-green-500/10 text-green-400'
                    : 'border-white/10 bg-white/5 text-white/30'
                }`}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-white/80 truncate">{course.name}</span>
                    {course.available && (
                      <span className="text-xs text-green-400 flex items-center gap-1 flex-shrink-0">
                        <CheckCircle2 size={11} />
                        Ready
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 h-1 rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${meta.gradient} transition-all`}
                      style={{ width: course.available ? '100%' : '0%' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PathsPage() {
  const [activeFilter, setActiveFilter] = useState('All Paths');
  const [paths, setPaths] = useState<ApiPath[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<ApiPath[]>('/learning-paths')
      .then(setPaths)
      .catch(() => setPaths([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = paths.filter((p) => {
    if (activeFilter === 'All Paths') return true;
    return (PATH_META[p.slug] ?? DEFAULT_PATH_META).category === activeFilter;
  });

  const featured = paths.find((p) => p.slug === 'ai-engineer') ?? paths[0];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-6">
            <TrendingUp size={14} className="text-purple-400" />
            10 career paths — Patch 1 launching now
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Find Your Perfect{' '}
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Career Path
            </span>
          </h1>

          <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">
            AI-curated learning paths for top tech roles — personalised to your goals, pace, and interests.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeFilter === f
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-500 border-transparent text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured path */}
      {!loading && featured && (activeFilter === 'All Paths' || (PATH_META[featured.slug]?.category ?? '') === activeFilter) && (
        <section className="px-6 mb-14">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-white/50 uppercase tracking-widest font-semibold">Featured Path</span>
            </div>
            <FeaturedPath path={featured} />
          </div>
        </section>
      )}

      {/* Path cards grid */}
      <section className="px-6 mb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">
            {activeFilter === 'All Paths' ? 'All Learning Paths' : `${activeFilter} Paths`}
            {!loading && (
              <span className="ml-3 text-base font-normal text-white/40">({filtered.length})</span>
            )}
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => <PathCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-white/40">
              <Loader2 size={32} className="mx-auto mb-3 opacity-40" />
              <p>No paths found for this filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((path) => <PathCard key={path.id} path={path} />)}
            </div>
          )}
        </div>
      </section>

      {/* How paths work */}
      <section className="px-6 mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How Paths Work</h2>
            <p className="text-white/40">From zero to job-ready in 4 steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {HOW_IT_WORKS.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="relative">
                  {index < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-1/2 w-full h-px bg-gradient-to-r from-white/10 to-transparent z-0" />
                  )}
                  <div className="relative z-10 flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-white/[0.07] transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600/30 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/10">
                      <Icon size={24} className="text-purple-400" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-xs font-bold mb-3">
                      {item.step}
                    </div>
                    <h3 className="font-bold mb-2">{item.label}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Personalisation banner */}
      <section className="px-6 mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl border border-purple-500/20 overflow-hidden bg-gradient-to-r from-purple-900/30 via-violet-900/20 to-cyan-900/20 p-10 text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300 mb-5">
                <Zap size={13} />
                AI-Personalised Learning
              </div>
              <h2 className="text-3xl font-bold mb-3">
                Every path adapts to{' '}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">your interests</span>
              </h2>
              <p className="text-white/50 mb-8 max-w-xl mx-auto">
                Our AI weaves your hobbies into learning examples — cricket analogies, gaming scenarios — making code finally click.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {HOBBIES.map((h) => {
                  const HIcon = h.icon;
                  return (
                    <div key={h.label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 hover:border-purple-500/40 hover:text-white transition-all cursor-pointer">
                      <HIcon size={15} className="text-purple-400" />
                      {h.label}
                    </div>
                  );
                })}
              </div>
              <Link
                href="/paths"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/25"
              >
                Personalise My Path
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
