"use client";

import { useState, useEffect, useRef, use } from "react";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Lock, Play, ChevronDown, ChevronRight,
  Clock, Zap, BookOpen, MessageSquare, X, Send, Bot, User, Award, Star, Brain,
  RefreshCw, FileText, Code2, HelpCircle, Briefcase,
} from "lucide-react";
import LessonRenderer from "@/components/LessonRenderer";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ApiLesson {
  id: string;
  title: string;
  type: string;
  durationMinutes: number;
  xpReward: number;
  isGenerated: boolean;
  orderIndex: number;
}

interface ApiTopic {
  id: string;
  name: string;
  slug: string;
  category: string;
  difficulty: string;
  description: string;
  durationHours: number;
  lessons: ApiLesson[];
}

interface Module {
  id: string;
  title: string;
  lessons: ApiLesson[];
}

interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function groupIntoModules(lessons: ApiLesson[]): Module[] {
  const sorted = [...lessons].sort((a, b) => a.orderIndex - b.orderIndex);
  const groups: Module[] = [
    { id: "m1", title: "Foundations", lessons: [] },
    { id: "m2", title: "Practice & Application", lessons: [] },
    { id: "m3", title: "Capstone Project", lessons: [] },
  ];
  sorted.forEach((l, i) => {
    if (i < 2) groups[0].lessons.push(l);
    else if (i < 4) groups[1].lessons.push(l);
    else groups[2].lessons.push(l);
  });
  return groups.filter((g) => g.lessons.length > 0);
}

function lessonTypeIcon(type: string) {
  const cls = "shrink-0";
  if (type === "exercise") return <Code2 size={13} className={cls} />;
  if (type === "quiz") return <HelpCircle size={13} className={cls} />;
  if (type === "project") return <Briefcase size={13} className={cls} />;
  return <FileText size={13} className={cls} />;
}

function lessonTypeBadge(type: string) {
  const map: Record<string, string> = {
    reading: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    exercise: "text-green-400 bg-green-500/10 border-green-500/30",
    quiz: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
    project: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  };
  return map[type] ?? "text-white/40 bg-white/5 border-white/10";
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LearnTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: topicSlug } = use(params);

  const [topic, setTopic] = useState<ApiTopic | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [allLessons, setAllLessons] = useState<ApiLesson[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [lessonContent, setLessonContent] = useState<any>(null);
  const [loadingTopic, setLoadingTopic] = useState(true);
  const [loadingContent, setLoadingContent] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [expandedModules, setExpandedModules] = useState<string[]>(["m1", "m2", "m3"]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showXpWidget, setShowXpWidget] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");

  const contentRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // ── Fetch topic + lessons ────────────────────────────────────────────────────
  useEffect(() => {
    setLoadingTopic(true);
    fetch(`${API}/topics/${topicSlug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: ApiTopic | null) => {
        if (data) {
          setTopic(data);
          const sorted = [...(data.lessons ?? [])].sort((a, b) => a.orderIndex - b.orderIndex);
          setAllLessons(sorted);
          setModules(groupIntoModules(sorted));
          if (sorted.length > 0) setSelectedLessonId(sorted[0].id);
        }
      })
      .catch(console.error)
      .finally(() => setLoadingTopic(false));
  }, [topicSlug]);

  // ── Fetch / generate lesson content ─────────────────────────────────────────
  useEffect(() => {
    if (!selectedLessonId) return;
    setLessonContent(null);
    setLoadingContent(true);
    setGenerating(false);
    setScrollProgress(0);
    setShowXpWidget(false);

    fetch(`${API}/ai/lessons/${selectedLessonId}/content`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.contentJson) {
          setLessonContent(data.contentJson);
          setLoadingContent(false);
        } else {
          // Trigger AI generation
          setGenerating(true);
          const lesson = allLessons.find((l) => l.id === selectedLessonId);
          const body = lesson
            ? {
                lessonTitle: lesson.title,
                lessonType: lesson.type,
                topicName: topic?.name ?? topicSlug,
                topicCategory: topic?.category ?? "programming",
                difficulty: topic?.difficulty ?? "intermediate",
              }
            : {};
          return fetch(`${API}/ai/lessons/${selectedLessonId}/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
            .then((r) => (r.ok ? r.json() : null))
            .then((gen) => {
              if (gen?.contentJson) setLessonContent(gen.contentJson);
            })
            .catch(console.error)
            .finally(() => {
              setLoadingContent(false);
              setGenerating(false);
            });
        }
      })
      .catch(() => setLoadingContent(false));
  }, [selectedLessonId]);

  // ── Scroll progress ──────────────────────────────────────────────────────────
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handle = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const p = scrollHeight <= clientHeight ? 100 : Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);
      setScrollProgress(p);
      if (p >= 85) setShowXpWidget(true);
    };
    el.addEventListener("scroll", handle);
    return () => el.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  // ── Actions ──────────────────────────────────────────────────────────────────
  const selectLesson = (id: string) => { setSelectedLessonId(id); };

  const markComplete = () => {
    if (selectedLessonId && !completedLessons.includes(selectedLessonId)) {
      setCompletedLessons((p) => [...p, selectedLessonId]);
    }
    const idx = allLessons.findIndex((l) => l.id === selectedLessonId);
    if (idx < allLessons.length - 1) selectLesson(allLessons[idx + 1].id);
  };

  const sendChat = () => {
    const text = chatInput.trim();
    if (!text) return;
    const topicName = topic?.name ?? topicSlug;
    setChatMessages((p) => [
      ...p,
      { role: "user", text },
      {
        role: "ai",
        text: `Great question about ${topicName}! That concept is fundamental to understanding the topic. The key insight is that ${text.toLowerCase().replace(/\?$/, "")} requires understanding the underlying principles. Would you like me to show a practical example or explain a related concept?`,
      },
    ]);
    setChatInput("");
  };

  // ── Derived state ────────────────────────────────────────────────────────────
  const currentIdx = allLessons.findIndex((l) => l.id === selectedLessonId);
  const currentLesson = allLessons[currentIdx] ?? null;
  const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;
  const courseProgress = allLessons.length > 0 ? Math.round((completedLessons.length / allLessons.length) * 100) : 0;
  const decodedName = topic?.name ?? decodeURIComponent(topicSlug).replace(/-/g, " ");

  // ── Render ───────────────────────────────────────────────────────────────────
  if (loadingTopic) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto animate-pulse">
            <Brain className="w-8 h-8 text-purple-400" />
          </div>
          <p className="text-white/50">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">

      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-40 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button onClick={() => history.back()} className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm">
            <ArrowLeft size={16} /> Back
          </button>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-sm font-medium text-white/80 capitalize truncate max-w-xs">{decodedName}</span>
          <div className="ml-auto flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-white/40">
              <BookOpen size={13} />
              Lesson {currentIdx + 1} of {allLessons.length}
            </span>
            {currentLesson && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30">
                <Star size={13} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-semibold text-yellow-300">+{currentLesson.xpReward} XP</span>
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
          <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full">

        {/* ── Sidebar ── */}
        <aside className="hidden lg:flex flex-col w-[280px] shrink-0 border-r border-white/10 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
          <div className="p-4 border-b border-white/10">
            <h2 className="font-bold text-sm mb-1 truncate">{decodedName}</h2>
            <p className="text-xs text-white/40 mb-2 capitalize">{topic?.category ?? ""} · {topic?.difficulty ?? ""}</p>
            <p className="text-xs text-white/30 mb-3">{courseProgress}% complete</p>
            <div className="h-1.5 rounded-full bg-white/5">
              <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500" style={{ width: `${courseProgress}%` }} />
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {modules.map((mod) => {
              const isExpanded = expandedModules.includes(mod.id);
              const modDone = mod.lessons.filter((l) => completedLessons.includes(l.id)).length;
              return (
                <div key={mod.id}>
                  <button
                    onClick={() => setExpandedModules((p) => p.includes(mod.id) ? p.filter((x) => x !== mod.id) : [...p, mod.id])}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
                  >
                    {isExpanded ? <ChevronDown size={14} className="text-white/40 shrink-0" /> : <ChevronRight size={14} className="text-white/40 shrink-0" />}
                    <span className="text-xs font-semibold text-white/70 flex-1">{mod.title}</span>
                    <span className="text-xs text-white/30 shrink-0">{modDone}/{mod.lessons.length}</span>
                  </button>

                  {isExpanded && (
                    <div className="ml-2 mt-0.5 space-y-0.5">
                      {mod.lessons.map((lesson) => {
                        const isDone = completedLessons.includes(lesson.id);
                        const isCurrent = selectedLessonId === lesson.id;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => selectLesson(lesson.id)}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all text-xs ${
                              isCurrent ? "bg-purple-600/20 border border-purple-500/40 text-white"
                                : isDone ? "text-white/50 hover:bg-white/5"
                                : "text-white/60 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            {isDone ? (
                              <CheckCircle2 size={13} className="text-green-400 shrink-0" />
                            ) : isCurrent ? (
                              <Play size={13} className="text-purple-400 shrink-0 fill-purple-400" />
                            ) : (
                              <span className={`shrink-0 ${lessonTypeBadge(lesson.type)} border rounded px-1 py-0.5 text-[9px] uppercase font-bold`}>
                                {lesson.type[0]}
                              </span>
                            )}
                            <span className="flex-1 leading-tight">{lesson.title}</span>
                            <span className="text-[10px] text-white/20 shrink-0">{lesson.durationMinutes}m</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* ── Main Content ── */}
        <main ref={contentRef} className="flex-1 overflow-y-auto h-[calc(100vh-57px)]">
          <div className="max-w-3xl mx-auto px-6 py-10">

            {/* Lesson meta badges */}
            {currentLesson && (
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border ${lessonTypeBadge(currentLesson.type)}`}>
                  {lessonTypeIcon(currentLesson.type)}
                  <span className="capitalize">{currentLesson.type}</span>
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  <Clock size={12} /> {currentLesson.durationMinutes} min
                </span>
                <span className={`text-xs px-3 py-1 rounded-full border ${
                  topic?.difficulty === "beginner" ? "border-green-500/30 bg-green-500/10 text-green-400"
                  : topic?.difficulty === "advanced" ? "border-red-500/30 bg-red-500/10 text-red-400"
                  : "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                } capitalize`}>{topic?.difficulty ?? "intermediate"}</span>
                <span className="flex items-center gap-1.5 text-xs text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30">
                  <Zap size={12} /> {currentLesson.xpReward} XP
                </span>
              </div>
            )}

            {/* Lesson title */}
            <h1 className="text-3xl font-bold mb-8 leading-tight">
              {currentLesson?.title ?? decodedName}
            </h1>

            {/* Content area */}
            <div className="prose prose-invert max-w-none space-y-6 text-white/80 leading-relaxed">
              {loadingContent || generating ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto animate-pulse">
                      <Brain className="w-6 h-6 text-purple-400" />
                    </div>
                    <p className="text-white/50 text-sm font-medium">
                      {generating ? "AI is generating your lesson…" : "Loading lesson content…"}
                    </p>
                    {generating && (
                      <p className="text-white/30 text-xs max-w-xs mx-auto">
                        Claude is creating rich, personalised content for this lesson. This may take 10–20 seconds.
                      </p>
                    )}
                  </div>
                </div>
              ) : lessonContent ? (
                <LessonRenderer content={lessonContent} />
              ) : (
                /* Graceful no-content fallback */
                <div className="text-center py-16 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
                    <RefreshCw size={24} className="text-white/30" />
                  </div>
                  <p className="text-white/40 text-sm">Content could not be loaded.</p>
                  <button
                    onClick={() => setSelectedLessonId((id) => { const copy = id; setSelectedLessonId(null); setTimeout(() => setSelectedLessonId(copy), 50); return null; })}
                    className="text-xs text-purple-400 hover:text-purple-300 underline"
                  >
                    Retry
                  </button>
                  <p className="text-white/25 text-xs max-w-xs mx-auto">
                    Make sure ANTHROPIC_API_KEY is set in the Render AI worker environment, then retry.
                  </p>
                </div>
              )}
            </div>

            {/* Complete button */}
            {!loadingContent && !generating && lessonContent && (
              <div className="mt-10">
                <button
                  onClick={markComplete}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg ${
                    completedLessons.includes(selectedLessonId ?? "")
                      ? "bg-green-500/20 border border-green-500/40 text-green-300 cursor-default"
                      : "bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:opacity-90 shadow-purple-500/20"
                  }`}
                  disabled={completedLessons.includes(selectedLessonId ?? "")}
                >
                  {completedLessons.includes(selectedLessonId ?? "") ? (
                    <span className="flex items-center justify-center gap-2"><CheckCircle2 size={16} /> Completed</span>
                  ) : nextLesson ? "Mark Complete & Continue →" : "Complete Course 🎉"}
                </button>
              </div>
            )}

            {/* Bottom navigation */}
            <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
              <button
                onClick={() => prevLesson && selectLesson(prevLesson.id)}
                disabled={!prevLesson}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-sm text-white/60 hover:bg-white/5 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={15} />
                {prevLesson ? prevLesson.title.split("—")[1]?.trim() ?? "Previous" : "Previous"}
              </button>

              <div className="hidden sm:flex items-center gap-1.5">
                {allLessons.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => selectLesson(l.id)}
                    title={l.title}
                    className={`rounded-full transition-all ${
                      l.id === selectedLessonId ? "w-6 h-2 bg-purple-500"
                      : completedLessons.includes(l.id) ? "w-2 h-2 bg-green-500/60"
                      : "w-2 h-2 bg-white/10"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => nextLesson && selectLesson(nextLesson.id)}
                disabled={!nextLesson}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {nextLesson ? nextLesson.title.split("—")[1]?.trim() ?? "Next" : "Finish"}
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* ── XP Widget ── */}
      {showXpWidget && currentLesson && (
        <div className="fixed bottom-24 right-6 z-50 animate-bounce">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold shadow-xl shadow-purple-500/30 text-sm">
            <Zap size={16} className="fill-white" /> +{currentLesson.xpReward} XP
          </div>
        </div>
      )}

      {/* ── AI Chat Button ── */}
      <button
        onClick={() => setAiChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold shadow-xl shadow-purple-500/30 hover:opacity-90 hover:scale-105 transition-all"
      >
        <MessageSquare size={18} /> Ask AI
      </button>

      {/* ── AI Chat Panel ── */}
      {aiChatOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end pointer-events-none">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" onClick={() => setAiChatOpen(false)} />
          <div className="relative pointer-events-auto w-full sm:w-[420px] h-[70vh] sm:h-[500px] sm:mr-6 sm:mb-6 rounded-t-2xl sm:rounded-2xl bg-[#12121f] border border-white/10 shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-gradient-to-r from-purple-900/40 to-cyan-900/20">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold">AI Tutor</p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Online
                </p>
              </div>
              <button onClick={() => setAiChatOpen(false)} className="ml-auto text-white/40 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot size={13} className="text-white" />
                </div>
                <div className="flex-1 bg-white/5 border border-white/8 rounded-xl rounded-tl-sm px-3.5 py-2.5 text-sm text-white/80 leading-relaxed">
                  Hi! I'm your AI tutor for <strong>{decodedName}</strong>. Ask me anything about this lesson or topic!
                </div>
              </div>

              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${msg.role === "user" ? "bg-purple-600/40 border border-purple-500/40" : "bg-gradient-to-br from-purple-500 to-cyan-400"}`}>
                    {msg.role === "user" ? <User size={13} className="text-purple-300" /> : <Bot size={13} className="text-white" />}
                  </div>
                  <div className={`flex-1 rounded-xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-purple-600/20 border border-purple-500/30 text-white rounded-tr-sm" : "bg-white/5 border border-white/8 text-white/80 rounded-tl-sm"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="p-3 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendChat()}
                  placeholder={`Ask about ${decodedName}...`}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-all"
                />
                <button onClick={sendChat} className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center hover:opacity-90 transition-all shrink-0">
                  <Send size={15} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
