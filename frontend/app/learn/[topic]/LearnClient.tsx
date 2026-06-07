"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
} from "lucide-react";
import Link from "next/link";
import LessonRenderer from "@/components/LessonRenderer";
import EmbeddedEditor from "@/components/EmbeddedEditor";
import { apiGet, apiPost, isAuthenticated, getStoredUser, setStoredUser } from "@/lib/api";
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

  const contentRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const decodedTopic = decodeURIComponent(topic).replace(/-/g, " ");

  // ── Fetch the topic + its lessons (public endpoint) ──────────────────────────
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
        setError(
          "We couldn't load this course. Make sure the backend is running and the topic exists.",
        );
        // eslint-disable-next-line no-console
        console.error("Failed to load topic", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [topic]);

  // Derived current-lesson info
  const currentIndex = lessons.findIndex((l) => l.id === selectedLessonId);
  const currentLesson = currentIndex >= 0 ? lessons[currentIndex] : null;
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  const totalLessons = lessons.length;
  const courseProgress = totalLessons ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  // ── Scroll progress tracking ─────────────────────────────────────────────────
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

  // Auto-scroll chat to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const selectLesson = (id: string) => {
    setSelectedLessonId(id);
    setScrollProgress(0);
    setShowXpWidget(false);
    contentRef.current?.scrollTo({ top: 0 });
  };

  // ── Mark complete (persists to the API when signed in) ───────────────────────
  const markComplete = useCallback(async () => {
    if (!currentLesson) return;
    const id = currentLesson.id;
    const xpReward = currentLesson.xpReward ?? 50;
    if (!completedLessons.includes(id)) {
      setCompletedLessons((prev) => [...prev, id]);
      // Optimistically update stored user XP so Navbar reflects new total
      const user = getStoredUser();
      if (user) setStoredUser({ ...user, xp: (user.xp ?? 0) + xpReward });
    }
    if (isAuthenticated()) {
      try {
        await apiPost(`/progress/lessons/${id}/complete`, {});
      } catch (err) {
        // Non-fatal: keep the optimistic local completion.
        // eslint-disable-next-line no-console
        console.error("Failed to persist progress", err);
      }
    }
    if (nextLesson) selectLesson(nextLesson.id);
  }, [currentLesson, completedLessons, nextLesson]);

  // ── Course Advisor — FAQ-only bot ────────────────────────────────────────────
  // All answers come from the pre-defined knowledge base. No API calls are made.
  const processMessage = useCallback(async (message: string) => {
    if (!message.trim() || chatLoading) return;
    setChatMessages((prev) => [...prev, { role: "user", text: message }]);
    setChatLoading(true);

    // Brief typing simulation for natural feel
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

  const handleChipClick = (question: string) => {
    processMessage(question);
  };

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

        {/* Reading progress bar */}
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

          <nav className="flex-1 p-3 space-y-0.5">
            {lessons.map((lesson, i) => {
              const isDone = completedLessons.includes(lesson.id);
              const isCurrent = selectedLessonId === lesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => selectLesson(lesson.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all text-xs ${
                    isCurrent
                      ? "bg-purple-600/20 border border-purple-500/40 text-white"
                      : isDone
                      ? "text-white/50 hover:bg-white/5"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 size={13} className="text-green-400 shrink-0" />
                  ) : isCurrent ? (
                    <Play size={13} className="text-purple-400 shrink-0 fill-purple-400" />
                  ) : (
                    <span className="w-[13px] text-center text-white/30 shrink-0 font-mono">{i + 1}</span>
                  )}
                  <span className="flex-1 leading-tight">{lesson.title}</span>
                  {isCurrent && <span className="text-purple-400 text-[10px] font-medium shrink-0">Now</span>}
                </button>
              );
            })}
          </nav>
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

            {/* Lesson Title */}
            <h1 className="text-3xl font-bold mb-8 leading-tight">
              {currentLesson?.title ?? topicData.name}
            </h1>

            {/* ── Lesson Content ── */}
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

            {/* ── Embedded Code Playground ── */}
            <EmbeddedEditor topicSlug={topic} />

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

            {/* ── Bottom Navigation ── */}
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
            <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
              {lessons.map((lesson, i) => {
                const isDone = completedLessons.includes(lesson.id);
                const isCurrent = selectedLessonId === lesson.id;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => { selectLesson(lesson.id); setMobileNavOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all text-xs ${
                      isCurrent
                        ? "bg-purple-600/20 border border-purple-500/40 text-white"
                        : isDone
                        ? "text-white/50 hover:bg-white/5"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 size={13} className="text-green-400 shrink-0" />
                    ) : isCurrent ? (
                      <Play size={13} className="text-purple-400 shrink-0 fill-purple-400" />
                    ) : (
                      <span className="w-[13px] text-center text-white/30 shrink-0 font-mono">{i + 1}</span>
                    )}
                    <span className="flex-1 leading-tight">{lesson.title}</span>
                    {isCurrent && <span className="text-purple-400 text-[10px] shrink-0">Now</span>}
                  </button>
                );
              })}
            </nav>
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

            {/* ── Header ── */}
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

            {/* ── Scope badge ── */}
            <div className="px-4 py-2 bg-purple-500/5 border-b border-white/5 shrink-0">
              <p className="text-[11px] text-white/40 text-center">
                Answers questions about <span className="text-white/60 font-medium">scope · salary · career · future · difficulty</span>
              </p>
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">

              {/* Welcome message with quick replies */}
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

              {/* Conversation messages */}
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
                    {/* Quick-reply chips after every bot response */}
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

              {/* Typing indicator */}
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

            {/* ── Input ── */}
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
    </div>
  );
}
