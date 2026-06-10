"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Play,
  Clock,
  Zap,
  BookOpen,
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Brain,
  AlertCircle,
  Menu,
  ChevronDown,
  GraduationCap,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import LessonRenderer from "@/components/LessonRenderer";
import ModuleChallengeCard from "@/components/ModuleChallengeCard";
import { getModuleChallenge } from "@/lib/module-challenges";
import {
  apiGet,
  apiPost,
  isAuthenticated,
  getStoredUser,
  setStoredUser,
  getAssessment,
  getAssessmentResults,
  submitModuleAssessment,
  submitFinalAssessment,
  type Assessment,
  type SubmitResult,
} from "@/lib/api";
import { groupLessonsIntoModules } from "@/lib/modules";
import { matchFAQ, QUICK_REPLIES, DEFLECTION_REPLY, type QuickReply } from "@/lib/course-faq";

// ─── Types (shape returned by the backend) ───────────────────────────────────

interface ApiLesson {
  id: string;
  title: string;
  type: string;
  orderIndex: number;
  durationMinutes: number;
  xpReward: number;
  isGenerated: boolean;
  contentJson: any | null;
}

interface ApiTopic {
  id: string;
  name: string;
  slug: string;
  description: string;
  difficulty: string;
  lessons: ApiLesson[];
}

interface ChatMessage {
  role: "user" | "ai";
  text: string;
  chips?: QuickReply[];
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LearnClient({ topic }: { topic: string }) {
  const [topicData, setTopicData] = useState<ApiTopic | null>(null);
  const [lessons, setLessons] = useState<ApiLesson[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showXpWidget, setShowXpWidget] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  // ── Assessment state ─────────────────────────────────────────────────────────
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [quizOpen, setQuizOpen] = useState<
    { type: "module"; moduleIndex: number } | { type: "final" } | null
  >(null);
  const [quizCurrentQ, setQuizCurrentQ] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);
  const [quizResult, setQuizResult] = useState<SubmitResult | null>(null);
  const [quizSubmitting, setQuizSubmitting] = useState(false);
  const [quizError, setQuizError] = useState<string | null>(null);
  const [moduleResults, setModuleResults] = useState<
    Record<number, { score: number; passed: boolean }>
  >({});
  const [finalResult, setFinalResult] = useState<{
    score: number;
    passed: boolean;
  } | null>(null);
  const [needsReview, setNeedsReview] = useState<Set<number>>(new Set());

  const contentRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const decodedTopic = decodeURIComponent(topic).replace(/-/g, " ");

  // ── Fetch topic + lessons ────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    apiGet<ApiTopic>(`/topics/${topic}`)
      .then((data) => {
        if (cancelled) return;
        const sorted = [...(data.lessons || [])].sort((a, b) => a.orderIndex - b.orderIndex);
        setTopicData(data);
        setLessons(sorted);
        setSelectedLessonId(sorted[0]?.id ?? null);
      })
      .catch((err) => {
        if (cancelled) return;
        // eslint-disable-next-line no-console
        console.error("Failed to load topic", err);
        try {
          const body = JSON.parse(err.message);
          const hint = body.hint ? ` (${body.hint})` : '';
          const msg = body.message || 'Unknown error';
          setError(`Couldn't load this course: ${msg}${hint}`);
        } catch {
          setError("We couldn't load this course. Make sure the backend is running and the topic exists.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [topic]);

  // ── Load assessment questions + previous results ─────────────────────────────
  useEffect(() => {
    let cancelled = false;
    getAssessment(topic)
      .then((a) => { if (!cancelled) setAssessment(a); })
      .catch(() => {});

    if (isAuthenticated()) {
      getAssessmentResults(topic)
        .then((r) => {
          if (cancelled) return;
          if (r.moduleResults) {
            setModuleResults(
              Object.fromEntries(
                Object.entries(r.moduleResults).map(([k, v]) => [Number(k), v]),
              ),
            );
          }
          setFinalResult(r.finalResult ?? null);
          setNeedsReview(new Set(r.wrongLessonOrders ?? []));
        })
        .catch(() => {});
    }

    return () => { cancelled = true; };
  }, [topic]);

  // ── Group lessons into named modules ─────────────────────────────────────────
  const modules = useMemo(() => groupLessonsIntoModules(lessons), [lessons]);
  const [openModules, setOpenModules] = useState<Set<number>>(new Set([0]));

  const toggleModule = (i: number) =>
    setOpenModules((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  // Keep the module that holds the active lesson expanded.
  useEffect(() => {
    if (!selectedLessonId) return;
    const idx = modules.findIndex((m) => m.lessons.some((l) => l.id === selectedLessonId));
    if (idx >= 0) {
      setOpenModules((prev) => (prev.has(idx) ? prev : new Set(prev).add(idx)));
    }
  }, [selectedLessonId, modules]);

  const currentIndex = lessons.findIndex((l) => l.id === selectedLessonId);
  const currentLesson = currentIndex >= 0 ? lessons[currentIndex] : null;
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  const totalLessons = lessons.length;
  const courseProgress = totalLessons ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  // ── Scroll progress ──────────────────────────────────────────────────────────
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const progress = scrollHeight <= clientHeight ? 100 : Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);
      setScrollProgress(progress);
      if (progress >= 90) setShowXpWidget(true);
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [selectedLessonId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const selectLesson = (id: string) => {
    setSelectedLessonId(id);
    setScrollProgress(0);
    setShowXpWidget(false);
    contentRef.current?.scrollTo({ top: 0 });
  };

  // ── Mark complete ────────────────────────────────────────────────────────────
  const markComplete = useCallback(async () => {
    if (!currentLesson) return;
    const id = currentLesson.id;
    const xpReward = currentLesson.xpReward ?? 50;
    if (!completedLessons.includes(id)) {
      setCompletedLessons((prev) => [...prev, id]);
      const user = getStoredUser();
      if (user) setStoredUser({ ...user, xp: (user.xp ?? 0) + xpReward });
    }
    if (isAuthenticated()) {
      try {
        await apiPost(`/progress/lessons/${id}/complete`, {});
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Failed to persist progress", err);
      }
    }
    if (nextLesson) selectLesson(nextLesson.id);
  }, [currentLesson, completedLessons, nextLesson]);

  // ── Assessment quiz handlers ─────────────────────────────────────────────────
  const openModuleQuiz = useCallback((moduleIndex: number) => {
    if (!assessment) return;
    const mod = assessment.modules.find((m) => m.index === moduleIndex);
    if (!mod) return;
    setQuizOpen({ type: "module", moduleIndex });
    setQuizCurrentQ(0);
    setQuizAnswers(new Array(mod.questions.length).fill(null));
    setQuizResult(null);
  }, [assessment]);

  const openFinalExam = useCallback(() => {
    if (!assessment?.finalExam) return;
    setQuizOpen({ type: "final" });
    setQuizCurrentQ(0);
    setQuizAnswers(new Array(assessment.finalExam.questions.length).fill(null));
    setQuizResult(null);
  }, [assessment]);

  const closeQuiz = useCallback(() => {
    setQuizOpen(null);
    setQuizResult(null);
    setQuizError(null);
  }, []);

  const submitQuiz = useCallback(async () => {
    if (!quizOpen || !assessment) return;
    const answers = quizAnswers as number[];
    setQuizSubmitting(true);
    setQuizError(null);
    try {
      let result: SubmitResult;

      if (!isAuthenticated()) {
        // Grade locally — not persisted (user not signed in)
        const questions = quizOpen.type === "module"
          ? (assessment.modules.find((m) => m.index === quizOpen.moduleIndex)?.questions ?? [])
          : (assessment.finalExam?.questions ?? []);
        const threshold = assessment.passThreshold ?? 80;
        let correct = 0;
        const wrongLessonOrders: number[] = [];
        for (let i = 0; i < questions.length; i++) {
          if (answers[i] === questions[i].answer) correct++;
          else wrongLessonOrders.push(questions[i].lessonOrder);
        }
        const total = questions.length;
        const score = Math.round((correct / total) * 100);
        result = { score, passed: score >= threshold, correct, total, wrongLessonOrders };
      } else if (quizOpen.type === "module") {
        result = await submitModuleAssessment(topic, quizOpen.moduleIndex, answers);
      } else {
        result = await submitFinalAssessment(topic, answers);
      }

      // Update local UI state regardless of auth
      if (quizOpen.type === "module") {
        setModuleResults((prev) => ({
          ...prev,
          [quizOpen.moduleIndex]: { score: result.score, passed: result.passed },
        }));
        if (result.passed) {
          const mod = modules[quizOpen.moduleIndex];
          if (mod) {
            setCompletedLessons((prev) => [
              ...new Set([...prev, ...mod.lessons.map((l) => l.id)]),
            ]);
          }
        }
      } else {
        setFinalResult({ score: result.score, passed: result.passed });
        if (result.passed) setCompletedLessons(lessons.map((l) => l.id));
      }

      setNeedsReview((prev) => {
        const next = new Set(prev);
        for (const ord of result.wrongLessonOrders) next.add(ord);
        return next;
      });
      setQuizResult(result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Quiz submission failed", err);
      setQuizError("Submission failed. Please try again.");
    } finally {
      setQuizSubmitting(false);
    }
  }, [quizOpen, assessment, quizAnswers, topic, modules, lessons]);

  // ── Course Advisor ───────────────────────────────────────────────────────────
  const processMessage = useCallback(async (message: string) => {
    if (!message.trim() || chatLoading) return;
    setChatMessages((prev) => [...prev, { role: "user", text: message }]);
    setChatLoading(true);
    await new Promise((r) => setTimeout(r, 480));
    const answer = matchFAQ(topic, message);
    setChatMessages((prev) => [
      ...prev,
      { role: "ai", text: answer ?? DEFLECTION_REPLY, chips: QUICK_REPLIES },
    ]);
    setChatLoading(false);
  }, [chatLoading, topic]);

  const sendChat = async () => {
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    setChatInput("");
    await processMessage(trimmed);
  };

  const handleChipClick = (question: string) => { processMessage(question); };

  // ── Loading / error states ───────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto animate-pulse">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <p className="text-white/50 text-sm">Loading course…</p>
        </div>
      </div>
    );
  }

  if (error || !topicData) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center px-6">
        <div className="max-w-md text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6 text-red-400" />
          </div>
          <p className="text-white/70 text-sm">{error ?? "Course not found."}</p>
          <Link href="/topics" className="inline-block text-sm text-purple-300 hover:text-purple-200">
            ← Back to all topics
          </Link>
        </div>
      </div>
    );
  }

  const lessonContent = currentLesson?.contentJson ?? null;

  // ── Module challenge for last lesson in module ───────────────────────────────
  const currentModuleIndex = modules.findIndex((m) =>
    m.lessons.some((l) => l.id === selectedLessonId),
  );
  const currentModule = currentModuleIndex >= 0 ? modules[currentModuleIndex] : null;
  const isLastInModule =
    currentModule?.lessons[currentModule.lessons.length - 1]?.id === selectedLessonId;
  const moduleChallenge =
    isLastInModule && currentModule
      ? getModuleChallenge(topic, currentModule.title)
      : null;

  // ── Quiz question list (derived at render time) ──────────────────────────────
  const quizQuestions = quizOpen && assessment
    ? quizOpen.type === "module"
      ? assessment.modules.find((m) => m.index === quizOpen.moduleIndex)?.questions ?? []
      : assessment.finalExam?.questions ?? []
    : [];

  // ── Module accordion nav ─────────────────────────────────────────────────────
  const renderModuleNav = (onPick: (id: string) => void) => (
    <>
      {modules.map((mod, mIdx) => {
        const open = openModules.has(mIdx);
        const doneCount = mod.lessons.filter((l) => completedLessons.includes(l.id)).length;
        const allDone = doneCount === mod.lessons.length;
        const hasCurrent = mod.lessons.some((l) => l.id === selectedLessonId);
        const hasAssessment = assessment?.modules.some((m) => m.index === mIdx);
        const modResult = moduleResults[mIdx];
        return (
          <div key={mIdx} className="mb-1">
            <button
              onClick={() => toggleModule(mIdx)}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${
                hasCurrent ? "bg-white/[0.04]" : "hover:bg-white/[0.03]"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  allDone
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                }`}
              >
                {mIdx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white/80 truncate">{mod.title}</p>
                <p className="text-[10px] text-white/35">{doneCount}/{mod.lessons.length} done</p>
              </div>
              <ChevronDown
                size={14}
                className={`text-white/30 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>

            {/* Test-out action row */}
            {hasAssessment && (
              modResult?.passed ? (
                <div className="flex items-center gap-1 px-3 pb-1 text-[10px] text-green-400">
                  <CheckCircle2 size={10} />
                  Tested out — {modResult.score}%
                </div>
              ) : (
                <button
                  onClick={() => openModuleQuiz(mIdx)}
                  className="w-full text-left px-3 pb-1.5 text-[10px] text-purple-400/70 hover:text-purple-300 transition-colors flex items-center gap-1"
                >
                  <GraduationCap size={10} />
                  Test out this module
                </button>
              )
            )}

            {open && (
              <div className="mt-0.5 ml-2 pl-2 border-l border-white/10 space-y-0.5">
                {mod.lessons.map((lesson, j) => {
                  const globalIdx = mod.startIndex + j;
                  const isDone = completedLessons.includes(lesson.id);
                  const isCurrent = selectedLessonId === lesson.id;
                  const reviewFlag = needsReview.has(lesson.orderIndex);
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onPick(lesson.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all text-xs ${
                        isCurrent
                          ? "bg-purple-600/20 border border-purple-500/40 text-white"
                          : isDone
                          ? "text-white/50 hover:bg-white/5"
                          : reviewFlag
                          ? "text-red-400/80 hover:bg-red-500/5 hover:text-red-300"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 size={13} className="text-green-400 shrink-0" />
                      ) : isCurrent ? (
                        <Play size={13} className="text-purple-400 shrink-0 fill-purple-400" />
                      ) : reviewFlag ? (
                        <span className="w-[13px] flex items-center justify-center shrink-0">
                          <span className="w-2 h-2 rounded-full bg-red-400/70" />
                        </span>
                      ) : (
                        <span className="w-[13px] text-center text-white/30 shrink-0 font-mono">{globalIdx + 1}</span>
                      )}
                      <span className="flex-1 leading-tight">{lesson.title}</span>
                      {isCurrent && <span className="text-purple-400 text-[10px] font-medium shrink-0">Now</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-40 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link
            href="/topics"
            className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm shrink-0"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </Link>

          <button
            onClick={() => setMobileNavOpen(true)}
            className="lg:hidden flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm shrink-0"
            aria-label="Open lesson list"
          >
            <Menu size={16} />
            <span className="text-xs">Lessons</span>
          </button>

          <div className="h-4 w-px bg-white/10" />

          <span className="text-sm font-medium text-white/80 capitalize truncate max-w-xs">
            {topicData.name || decodedTopic}
          </span>

          <div className="ml-auto flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-white/40">
              <BookOpen size={13} />
              Lesson {currentIndex + 1} of {totalLessons}
            </span>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30">
              <Zap size={13} className="text-yellow-400" />
              <span className="text-xs font-semibold text-yellow-300">+{currentLesson?.xpReward ?? 50} XP</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* ── Sidebar ── */}
        <aside className="hidden lg:flex flex-col w-[300px] shrink-0 border-r border-white/10 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
          <div className="p-4 border-b border-white/10">
            <h2 className="font-bold text-sm mb-1 truncate">{topicData.name}</h2>
            <p className="text-xs text-white/40 mb-3">{courseProgress}% complete</p>
            <div className="h-1.5 rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${courseProgress}%` }}
              />
            </div>
          </div>

          <nav className="flex-1 p-3">
            {renderModuleNav(selectLesson)}
          </nav>

          {/* Final exam / course complete */}
          {assessment?.finalExam && (
            <div className="p-3 border-t border-white/10 shrink-0">
              {finalResult?.passed ? (
                <div className="flex items-center gap-2 text-sm text-green-400 font-semibold justify-center py-1">
                  <Trophy size={15} />
                  Course Complete!
                </div>
              ) : (
                <button
                  onClick={openFinalExam}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
                >
                  <GraduationCap size={14} />
                  Take Final Exam
                </button>
              )}
            </div>
          )}
        </aside>

        {/* ── Main Content ── */}
        <main ref={contentRef} className="flex-1 overflow-y-auto h-[calc(100vh-57px)]">
          <div className="max-w-3xl mx-auto px-6 py-10">
            {/* Lesson Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="flex items-center gap-1.5 text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <Clock size={12} />
                {currentLesson?.durationMinutes ?? 15} min
              </span>
              <span className="text-xs px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 capitalize">
                {topicData.difficulty}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30">
                <Zap size={12} />
                {currentLesson?.xpReward ?? 50} XP
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-8 leading-tight">
              {currentLesson?.title ?? topicData.name}
            </h1>

            {lessonContent ? (
              <LessonRenderer content={lessonContent} />
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto">
                    <Brain className="w-6 h-6 text-purple-400" />
                  </div>
                  <p className="text-white/50 text-sm">
                    Content for this lesson hasn&apos;t been generated yet.
                  </p>
                </div>
              </div>
            )}

            {moduleChallenge && currentModule && (
              <ModuleChallengeCard
                challenge={moduleChallenge}
                topicSlug={topic}
                moduleIndex={currentModuleIndex}
                moduleName={currentModule.title}
              />
            )}

            {/* Mark complete */}
            {currentLesson && (
              <button
                onClick={markComplete}
                className="mt-10 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/20"
              >
                {completedLessons.includes(currentLesson.id)
                  ? nextLesson
                    ? "Next Lesson"
                    : "Completed"
                  : "Mark Complete & Continue"}
              </button>
            )}

            {/* Final exam prompt on last lesson */}
            {!nextLesson && assessment?.finalExam && !finalResult?.passed && (
              <button
                onClick={openFinalExam}
                className="mt-4 w-full py-3 rounded-xl border border-purple-500/40 text-purple-300 text-sm font-semibold hover:bg-purple-500/10 transition-all flex items-center justify-center gap-2"
              >
                <GraduationCap size={16} />
                Take Final Exam
              </button>
            )}
            {!nextLesson && finalResult?.passed && (
              <div className="mt-4 flex items-center justify-center gap-2 text-green-400 font-semibold py-2">
                <Trophy size={18} />
                Course Complete!
              </div>
            )}

            {/* Bottom Navigation */}
            <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
              <button
                onClick={() => prevLesson && selectLesson(prevLesson.id)}
                disabled={!prevLesson}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-sm text-white/60 hover:bg-white/5 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed max-w-[45%]"
              >
                <ArrowLeft size={15} className="shrink-0" />
                <span className="truncate">{prevLesson ? prevLesson.title : "Previous"}</span>
              </button>

              <button
                onClick={() => nextLesson && selectLesson(nextLesson.id)}
                disabled={!nextLesson}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed max-w-[45%]"
              >
                <span className="truncate">{nextLesson ? nextLesson.title : "Next"}</span>
                <ArrowRight size={15} className="shrink-0" />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* ── Mobile Lesson Drawer ── */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-[#0d0d18] border-r border-white/10 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="font-bold text-sm truncate pr-2">{topicData.name}</h2>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="text-white/40 hover:text-white transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-xs text-white/40 mb-2">{courseProgress}% complete</p>
              <div className="h-1.5 rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${courseProgress}%` }}
                />
              </div>
            </div>
            <nav className="flex-1 overflow-y-auto p-2">
              {renderModuleNav((id) => { selectLesson(id); setMobileNavOpen(false); })}
            </nav>
            {assessment?.finalExam && (
              <div className="p-3 border-t border-white/10 shrink-0">
                {finalResult?.passed ? (
                  <div className="flex items-center gap-2 text-sm text-green-400 font-semibold justify-center py-1">
                    <Trophy size={15} />
                    Course Complete!
                  </div>
                ) : (
                  <button
                    onClick={() => { openFinalExam(); setMobileNavOpen(false); }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
                  >
                    <GraduationCap size={14} />
                    Take Final Exam
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Floating XP Widget ── */}
      {showXpWidget && (
        <div className="fixed bottom-24 right-6 z-50 animate-bounce">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold shadow-xl shadow-purple-500/30 text-sm">
            <Zap size={16} className="fill-white" />
            +{currentLesson?.xpReward ?? 50} XP
          </div>
        </div>
      )}

      {/* ── Course Advisor FAB ── */}
      <button
        onClick={() => setAiChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold shadow-xl shadow-purple-500/30 hover:opacity-90 hover:scale-105 transition-all"
      >
        <MessageSquare size={18} />
        Course Advisor
      </button>

      {/* ── Course Advisor Panel ── */}
      {aiChatOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end pointer-events-none">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
            onClick={() => setAiChatOpen(false)}
          />
          <div className="relative pointer-events-auto w-full sm:w-[420px] h-[76vh] sm:h-[560px] sm:mr-6 sm:mb-6 rounded-t-2xl sm:rounded-2xl bg-[#12121f] border border-white/10 shadow-2xl flex flex-col overflow-hidden">

            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-gradient-to-r from-purple-900/50 to-cyan-900/20 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shadow-lg">
                <Bot size={17} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold leading-tight">Course Advisor</p>
                <p className="text-[11px] text-white/50 truncate">{topicData.name}</p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-green-400 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                Online
              </div>
              <button
                onClick={() => setAiChatOpen(false)}
                className="ml-2 text-white/40 hover:text-white transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-4 py-2 bg-purple-500/5 border-b border-white/5 shrink-0">
              <p className="text-[11px] text-white/40 text-center">
                Answers questions about <span className="text-white/60 font-medium">scope · salary · career · future · difficulty</span>
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot size={13} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="bg-white/5 border border-white/8 rounded-xl rounded-tl-none px-3.5 py-3 text-sm text-white/80 leading-relaxed">
                    Hi! I&apos;m your advisor for{" "}
                    <span className="text-white font-semibold">{topicData.name}</span>.
                    {" "}I can answer specific questions about this skill&apos;s scope, salary, career opportunities, future outlook, and learning difficulty.
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {QUICK_REPLIES.map((chip) => (
                      <button
                        key={chip.label}
                        onClick={() => handleChipClick(chip.question)}
                        disabled={chatLoading}
                        className="px-2.5 py-1 rounded-full border border-purple-500/35 bg-purple-500/10 text-purple-300 text-[11px] font-medium hover:bg-purple-500/25 hover:border-purple-400/50 transition-all disabled:opacity-50"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      msg.role === "user"
                        ? "bg-purple-600/40 border border-purple-500/40"
                        : "bg-gradient-to-br from-purple-500 to-cyan-400"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User size={13} className="text-purple-300" />
                    ) : (
                      <Bot size={13} className="text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-purple-600/20 border border-purple-500/30 text-white rounded-tr-none"
                          : "bg-white/5 border border-white/8 text-white/85 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.role === "ai" && msg.chips && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {msg.chips.map((chip) => (
                          <button
                            key={chip.label}
                            onClick={() => handleChipClick(chip.question)}
                            disabled={chatLoading}
                            className="px-2.5 py-1 rounded-full border border-white/15 bg-white/5 text-white/50 text-[11px] font-medium hover:bg-purple-500/15 hover:border-purple-500/35 hover:text-purple-300 transition-all disabled:opacity-40"
                          >
                            {chip.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="bg-white/5 border border-white/8 rounded-xl rounded-tl-none px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-3 border-t border-white/10 shrink-0 bg-[#12121f]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !chatLoading && sendChat()}
                  placeholder="Ask about scope, salary, career, future…"
                  disabled={chatLoading}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all disabled:opacity-50"
                />
                <button
                  onClick={sendChat}
                  disabled={chatLoading || !chatInput.trim()}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center hover:opacity-90 transition-all shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={15} className="text-white" />
                </button>
              </div>
              <p className="text-center text-[10px] text-white/20 mt-2">
                Answers are based on industry research · Not personalised advice
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Quiz / Final Exam Modal ── */}
      {quizOpen && assessment && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={closeQuiz}
          />
          <div className="relative w-full max-w-2xl max-h-[88vh] bg-[#0d0d18] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden">

            {/* Modal header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-gradient-to-r from-purple-900/40 to-transparent shrink-0">
              <GraduationCap size={18} className="text-purple-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold">
                  {quizOpen.type === "module"
                    ? `Module ${quizOpen.moduleIndex + 1} — Knowledge Check`
                    : "Final Exam"}
                </p>
                {!quizResult && (
                  <p className="text-[11px] text-white/40">
                    {quizOpen.type === "module"
                      ? "Score ≥80% to test out of this module"
                      : "Score ≥80% to earn course completion"}
                  </p>
                )}
              </div>
              <button onClick={closeQuiz} className="text-white/40 hover:text-white transition-colors shrink-0">
                <X size={18} />
              </button>
            </div>

            {/* Taking the quiz */}
            {!quizResult && quizQuestions.length > 0 && (() => {
              const q = quizQuestions[quizCurrentQ];
              const totalQ = quizQuestions.length;
              const answered = quizAnswers.filter((a) => a !== null).length;
              const allAnswered = answered === totalQ;
              return (
                <>
                  <div className="flex-1 overflow-y-auto p-5">
                    {/* Progress bar */}
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-xs text-white/40 shrink-0">
                        {quizCurrentQ + 1} / {totalQ}
                      </span>
                      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-300"
                          style={{ width: `${((quizCurrentQ + 1) / totalQ) * 100}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-white/30 shrink-0">{answered} answered</span>
                    </div>

                    {/* Question */}
                    <p className="text-base font-medium leading-relaxed mb-5">{q.question}</p>

                    {/* Options */}
                    <div className="space-y-2.5">
                      {q.options.map((opt: string, idx: number) => {
                        const selected = quizAnswers[quizCurrentQ] === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              const next = [...quizAnswers];
                              next[quizCurrentQ] = idx;
                              setQuizAnswers(next);
                              if (quizCurrentQ < totalQ - 1) {
                                setTimeout(() => setQuizCurrentQ((q) => q + 1), 350);
                              }
                            }}
                            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                              selected
                                ? "border-purple-500/60 bg-purple-500/20 text-white"
                                : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25 hover:bg-white/[0.05] hover:text-white"
                            }`}
                          >
                            <span className="font-mono text-purple-400 mr-2.5 text-xs">
                              {String.fromCharCode(65 + idx)}.
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer nav */}
                  <div className="px-5 py-4 border-t border-white/10 flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => setQuizCurrentQ((q) => Math.max(0, q - 1))}
                      disabled={quizCurrentQ === 0}
                      className="px-3 py-2 rounded-lg border border-white/10 text-white/50 text-sm disabled:opacity-30 hover:bg-white/5 transition-all"
                    >
                      Back
                    </button>
                    <div className="flex-1">
                      {quizError && (
                        <p className="text-xs text-red-400 text-center">{quizError}</p>
                      )}
                    </div>
                    {quizCurrentQ < totalQ - 1 ? (
                      <button
                        onClick={() => setQuizCurrentQ((q) => q + 1)}
                        disabled={quizAnswers[quizCurrentQ] === null}
                        className="px-4 py-2 rounded-lg bg-purple-600/25 border border-purple-500/40 text-purple-300 text-sm disabled:opacity-30 hover:bg-purple-600/35 transition-all"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={submitQuiz}
                        disabled={!allAnswered || quizSubmitting}
                        className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-semibold disabled:opacity-40 hover:opacity-90 transition-all"
                      >
                        {quizSubmitting ? "Submitting…" : "Submit"}
                      </button>
                    )}
                  </div>
                </>
              );
            })()}

            {/* Result screen */}
            {quizResult && (
              <>
                <div className="flex-1 overflow-y-auto p-5">
                  {/* Score */}
                  <div className="text-center py-4 mb-5">
                    <div
                      className={`text-5xl font-bold mb-2 ${
                        quizResult.passed ? "text-green-400" : "text-orange-400"
                      }`}
                    >
                      {quizResult.score}%
                    </div>
                    <p className="text-white/40 text-sm mb-3">
                      {quizResult.correct} of {quizResult.total} correct
                    </p>
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${
                        quizResult.passed
                          ? "bg-green-500/20 border border-green-500/40 text-green-400"
                          : "bg-orange-500/20 border border-orange-500/40 text-orange-400"
                      }`}
                    >
                      {quizResult.passed ? (
                        quizOpen.type === "final" ? (
                          <><Trophy size={14} /> Course Complete!</>
                        ) : (
                          <><CheckCircle2 size={14} /> Module Passed</>
                        )
                      ) : (
                        <><AlertCircle size={14} /> Keep Studying</>
                      )}
                    </div>
                    <p className="text-xs text-white/40 mt-3">
                      {quizResult.passed
                        ? quizOpen.type === "module"
                          ? "All lessons in this module are now marked complete."
                          : "All course lessons are now marked complete."
                        : quizResult.wrongLessonOrders.length > 0
                        ? "Lessons linked to wrong answers are highlighted red in the sidebar."
                        : "Review the material and try again."}
                    </p>
                  </div>

                  {/* Per-question review (module) / Areas of improvement (final) */}
                  {quizOpen.type === "module" ? (
                    <div className="space-y-2">
                      {quizQuestions.map((q: any, i: number) => {
                        const userAns = quizAnswers[i] as number;
                        const correct = userAns === q.answer;
                        return (
                          <div
                            key={i}
                            className={`p-3.5 rounded-xl border text-sm ${
                              correct
                                ? "border-green-500/20 bg-green-500/5"
                                : "border-red-500/20 bg-red-500/5"
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              {correct ? (
                                <CheckCircle2 size={14} className="text-green-400 shrink-0 mt-0.5" />
                              ) : (
                                <AlertCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                              )}
                              <p className="text-white/75 leading-relaxed">{q.question}</p>
                            </div>
                            {!correct && (
                              <div className="mt-2 ml-6 space-y-1">
                                <p className="text-[11px] text-red-400/70">
                                  Your answer: {q.options[userAns]}
                                </p>
                                <p className="text-[11px] text-green-400/80">
                                  Correct: {q.options[q.answer]}
                                </p>
                                <p className="text-[11px] text-white/35 leading-relaxed">
                                  {q.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (() => {
                    // Final exam: group wrong answers by module → show areas of improvement
                    const byModule = new Map<number, { title: string; lessonTitles: string[] }>();
                    quizQuestions.forEach((q: any, i: number) => {
                      if (quizAnswers[i] !== q.answer) {
                        const modIdx = typeof q.moduleIndex === "number" ? q.moduleIndex : -1;
                        const modTitle =
                          assessment?.modules.find((m) => m.index === modIdx)?.title ??
                          "General";
                        if (!byModule.has(modIdx))
                          byModule.set(modIdx, { title: modTitle, lessonTitles: [] });
                        const lessonTitle =
                          lessons.find((l) => l.orderIndex === q.lessonOrder)?.title ??
                          `Lesson ${q.lessonOrder}`;
                        const entry = byModule.get(modIdx)!;
                        if (!entry.lessonTitles.includes(lessonTitle))
                          entry.lessonTitles.push(lessonTitle);
                      }
                    });
                    const areas = Array.from(byModule.values());
                    if (areas.length === 0) return null;
                    return (
                      <div>
                        <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
                          Areas to revisit
                        </p>
                        <div className="space-y-3">
                          {areas.map((area, i) => (
                            <div
                              key={i}
                              className="p-3.5 rounded-xl border border-orange-500/25 bg-orange-500/5"
                            >
                              <p className="text-sm font-semibold text-orange-300 mb-2">
                                {area.title}
                              </p>
                              <ul className="space-y-1">
                                {area.lessonTitles.map((title, j) => (
                                  <li key={j} className="flex items-start gap-2 text-xs text-white/55">
                                    <span className="text-orange-400/60 shrink-0 mt-0.5">·</span>
                                    {title}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="px-5 py-4 border-t border-white/10 flex justify-end shrink-0">
                  <button
                    onClick={closeQuiz}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-all"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
