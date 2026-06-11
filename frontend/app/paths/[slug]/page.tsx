'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  Zap,
  CheckCircle2,
  Lock,
  Play,
  BookOpen,
  ChevronRight,
  AlertCircle,
  Loader2,
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

const DIFF_ICON_COLOR: Record<string, string> = {
  beginner: 'text-emerald-600',
  intermediate: 'text-amber-600',
  advanced: 'text-red-600',
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PathDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [path, setPath] = useState<ApiPath | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const meta = PATH_META[slug] ?? DEFAULT_PATH_META;
  const Icon = meta.icon;
  const courses = PATH_META[slug]?.courses ?? [];
  const firstAvailable = courses.find((c) => c.available);
  const availableCount = courses.filter((c) => c.available).length;

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    apiGet<ApiPath>(`/learning-paths/${slug}`)
      .then(setPath)
      .catch(() => setError('Could not load this path. Make sure the backend is running.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f8fa] text-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 text-amber-500 animate-spin mx-auto" />
          <p className="text-slate-500 text-sm">Loading path…</p>
        </div>
      </div>
    );
  }

  if (error || !path) {
    return (
      <div className="min-h-screen bg-[#f7f8fa] text-slate-900 flex items-center justify-center px-6">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
          <p className="text-slate-600">{error ?? 'Path not found.'}</p>
          <Link href="/paths" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm">
            <ArrowLeft size={14} /> Back to Paths
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-900">
      {/* Hero */}
      <section className="relative pt-20 pb-14 px-6 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${meta.headerGradient} opacity-40 pointer-events-none`} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative">
          {/* Back */}
          <Link
            href="/paths"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 mb-8 transition-colors"
          >
            <ArrowLeft size={14} />
            All Paths
          </Link>

          <div className="flex items-start gap-5 mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center shadow-xl flex-shrink-0`}>
              <Icon size={28} className="text-white" />
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-xs text-slate-600">
                  {meta.category}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full border text-xs ${DIFFICULTY_COLOR[path.difficulty]}`}>
                  {DIFFICULTY_LABEL[path.difficulty]}
                </span>
                {availableCount > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs text-emerald-700">
                    {availableCount} of {courses.length} courses live
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">{path.title}</h1>
            </div>
          </div>

          <p className="text-slate-600 text-lg leading-relaxed mb-7 max-w-2xl">{path.description}</p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-5 text-sm text-slate-500 mb-8">
            <span className="flex items-center gap-1.5"><Clock size={15} className="text-amber-600" />{path.durationMonths} months</span>
            <span className="flex items-center gap-1.5"><Star size={15} className="text-amber-500 fill-amber-500" />{path.rating} rating</span>
            <span className="flex items-center gap-1.5"><Users size={15} className="text-slate-400" />{fmtEnrolled(path.enrolledCount)} enrolled</span>
            <span className="flex items-center gap-1.5"><BookOpen size={15} className="text-emerald-600" />{courses.length} courses</span>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3">
            {firstAvailable ? (
              <Link
                href={`/learn/${firstAvailable.slug}`}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${meta.gradient} text-white font-semibold hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg`}
              >
                <Play size={16} fill="currentColor" />
                Start Learning
              </Link>
            ) : (
              <button
                disabled
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-200 text-slate-400 font-semibold cursor-not-allowed"
              >
                <Lock size={16} />
                Coming Soon
              </button>
            )}
            <Link
              href="/topics"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all"
            >
              Browse All Courses
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">

          {/* Left — course list */}
          <div className="md:col-span-2 space-y-3">
            <h2 className="text-xl font-bold mb-5">Course Curriculum</h2>
            {courses.map((course, i) => (
              <div
                key={course.slug}
                className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                  course.available
                    ? 'border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-amber-300 cursor-pointer'
                    : 'border-slate-200 bg-slate-50 opacity-60'
                }`}
              >
                {/* Step number */}
                <div className={`w-9 h-9 rounded-lg border flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
                  course.available
                    ? `border-emerald-300 bg-emerald-50 text-emerald-600`
                    : 'border-slate-200 bg-white text-slate-300'
                }`}>
                  {course.available ? <CheckCircle2 size={16} /> : i + 1}
                </div>

                {/* Course info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-800 truncate">{course.name}</span>
                    {course.available && (
                      <span className="px-1.5 py-0.5 rounded text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
                        Live
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">{course.category}</span>
                    <span className={`text-xs ${DIFF_ICON_COLOR[course.difficulty]}`}>
                      · {DIFFICULTY_LABEL[course.difficulty]}
                    </span>
                  </div>
                </div>

                {/* Action */}
                {course.available ? (
                  <Link
                    href={`/learn/${course.slug}`}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-lg bg-gradient-to-r ${meta.gradient} text-white text-xs font-medium hover:opacity-90 transition-all`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Start
                  </Link>
                ) : (
                  <span className="flex-shrink-0 flex items-center gap-1 text-xs text-slate-400">
                    <Lock size={11} />
                    Soon
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {/* Path highlights */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5">
              <h3 className="font-bold text-sm mb-4">What You'll Achieve</h3>
              <ul className="space-y-2.5">
                {path.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-slate-600">
                    <Zap size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5">
              <h3 className="font-bold text-sm mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {path.techStack.map((tech, i) => (
                  <span key={tech} className={`px-2 py-1 rounded-md text-xs font-medium ${meta.stackColors[i] ?? 'bg-slate-100 text-slate-600'}`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5">
              <h3 className="font-bold text-sm mb-4">Skills You'll Gain</h3>
              <div className="flex flex-wrap gap-1.5">
                {path.skills.map((skill) => (
                  <span key={skill} className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-600">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Path progress card */}
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm">Path Progress</h3>
                <span className="text-xs text-amber-600">
                  {availableCount}/{courses.length} live
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 mb-3">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${meta.gradient} transition-all`}
                  style={{ width: `${courses.length ? (availableCount / courses.length) * 100 : 0}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">
                {availableCount === 0
                  ? 'Content generation in progress — check back soon!'
                  : `${availableCount} course${availableCount > 1 ? 's' : ''} ready to start`}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
