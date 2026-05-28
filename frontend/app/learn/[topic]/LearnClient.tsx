"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  Play,
  ChevronDown,
  ChevronRight,
  Clock,
  Zap,
  BookOpen,
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Award,
  Star,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Lesson {
  id: string;
  title: string;
  duration: string;
  xp: number;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

// ─── Static data ─────────────────────────────────────────────────────────────

const MODULES: Module[] = [
  {
    id: "m1",
    title: "Java Fundamentals",
    lessons: [
      { id: "l1", title: "Setting Up Your Environment", duration: "10 min", xp: 30 },
      { id: "l2", title: "OOP Concepts in Java", duration: "20 min", xp: 50 },
      { id: "l3", title: "Collections & Generics", duration: "18 min", xp: 45 },
    ],
  },
  {
    id: "m2",
    title: "Spring Boot Basics",
    lessons: [
      { id: "l4", title: "Introduction to Spring Boot", duration: "15 min", xp: 50 },
      { id: "l5", title: "Building REST APIs", duration: "25 min", xp: 60 },
      { id: "l6", title: "Dependency Injection & Beans", duration: "20 min", xp: 55 },
    ],
  },
  {
    id: "m3",
    title: "Database Integration",
    lessons: [
      { id: "l7", title: "Spring Data JPA", duration: "22 min", xp: 60 },
      { id: "l8", title: "PostgreSQL with Hibernate", duration: "28 min", xp: 70 },
      { id: "l9", title: "Database Migrations", duration: "15 min", xp: 40 },
    ],
  },
];

const COMPLETED_DEFAULT = ["l1", "l2", "l3"];
const CURRENT_LESSON_DEFAULT = "l4";

const MOCK_AI_CHAT: ChatMessage[] = [
  {
    role: "user",
    text: "How does @Autowired work?",
  },
  {
    role: "ai",
    text: "@Autowired is Spring's annotation for automatic dependency injection. When Spring sees it on a field, constructor, or setter, it looks in its ApplicationContext for a matching bean by type and injects it automatically.\n\nFor example:\n\n@Service\npublic class UserService {\n  @Autowired\n  private UserRepository repo;\n}\n\nSpring will find the UserRepository bean and inject it. Constructor injection (without the annotation in modern Spring) is preferred as it makes dependencies explicit and simplifies testing.",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LearnClient({ topic }: { topic: string }) {

  const [selectedLesson, setSelectedLesson] = useState<string>(CURRENT_LESSON_DEFAULT);
  const [completedLessons, setCompletedLessons] = useState<string[]>(COMPLETED_DEFAULT);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showXpWidget, setShowXpWidget] = useState(false);
  const [expandedModules, setExpandedModules] = useState<string[]>(["m1", "m2"]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(MOCK_AI_CHAT);
  const [chatInput, setChatInput] = useState("");

  const contentRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Derive current lesson info
  const allLessons = MODULES.flatMap((m) => m.lessons);
  const currentLessonIndex = allLessons.findIndex((l) => l.id === selectedLesson);
  const currentLesson = allLessons[currentLessonIndex];
  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;
  const totalLessons = allLessons.length;

  // Scroll progress tracking
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
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const toggleModule = (id: string) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const selectLesson = (id: string) => {
    setSelectedLesson(id);
    setScrollProgress(0);
    setShowXpWidget(false);
  };

  const markComplete = () => {
    if (!completedLessons.includes(selectedLesson)) {
      setCompletedLessons((prev) => [...prev, selectedLesson]);
    }
    if (nextLesson) selectLesson(nextLesson.id);
  };

  const sendChat = () => {
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    setChatMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      {
        role: "ai",
        text: "Great question! In Spring Boot, " + trimmed.toLowerCase().replace(/\?$/, "") + " is handled by the IoC container. The container manages object lifecycle and wires dependencies so you can focus on business logic rather than plumbing. Would you like a code example?",
      },
    ]);
    setChatInput("");
  };

  const totalCompletedInCourse = completedLessons.length;
  const courseProgress = Math.round((totalCompletedInCourse / totalLessons) * 100);

  const decodedTopic = decodeURIComponent(topic).replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-40 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm">
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="h-4 w-px bg-white/10" />

          <span className="text-sm font-medium text-white/80 capitalize truncate max-w-xs">
            {decodedTopic || "Full Stack Java Developer"}
          </span>

          <div className="ml-auto flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-white/40">
              <BookOpen size={13} />
              Lesson {currentLessonIndex + 1} of {totalLessons}
            </span>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30">
              <Star size={13} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-semibold text-yellow-300">+{currentLesson?.xp ?? 50} XP today</span>
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
        <aside className="hidden lg:flex flex-col w-[280px] shrink-0 border-r border-white/10 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
          <div className="p-4 border-b border-white/10">
            <h2 className="font-bold text-sm mb-1 truncate">Full Stack Java Developer</h2>
            <p className="text-xs text-white/40 mb-3">{courseProgress}% complete</p>
            <div className="h-1.5 rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${courseProgress}%` }}
              />
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {MODULES.map((mod) => {
              const isExpanded = expandedModules.includes(mod.id);
              const modCompleted = mod.lessons.filter((l) => completedLessons.includes(l.id)).length;

              return (
                <div key={mod.id}>
                  {/* Module header */}
                  <button
                    onClick={() => toggleModule(mod.id)}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
                  >
                    {isExpanded ? (
                      <ChevronDown size={14} className="text-white/40 shrink-0" />
                    ) : (
                      <ChevronRight size={14} className="text-white/40 shrink-0" />
                    )}
                    <span className="text-xs font-semibold text-white/70 flex-1">{mod.title}</span>
                    <span className="text-xs text-white/30 shrink-0">
                      {modCompleted}/{mod.lessons.length}
                    </span>
                  </button>

                  {/* Lessons */}
                  {isExpanded && (
                    <div className="ml-2 mt-0.5 space-y-0.5">
                      {mod.lessons.map((lesson) => {
                        const isDone = completedLessons.includes(lesson.id);
                        const isCurrent = selectedLesson === lesson.id;
                        const isLocked = !isDone && !isCurrent && lesson.id > selectedLesson;

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => !isLocked && selectLesson(lesson.id)}
                            disabled={isLocked}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all text-xs ${
                              isCurrent
                                ? "bg-purple-600/20 border border-purple-500/40 text-white"
                                : isDone
                                ? "text-white/50 hover:bg-white/5"
                                : isLocked
                                ? "text-white/20 cursor-not-allowed"
                                : "text-white/60 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            {isDone ? (
                              <CheckCircle2 size={13} className="text-green-400 shrink-0" />
                            ) : isCurrent ? (
                              <Play size={13} className="text-purple-400 shrink-0 fill-purple-400" />
                            ) : (
                              <Lock size={13} className="text-white/20 shrink-0" />
                            )}
                            <span className="flex-1 leading-tight">{lesson.title}</span>
                            {isCurrent && (
                              <span className="text-purple-400 text-[10px] font-medium shrink-0">Now</span>
                            )}
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

            {/* Lesson Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="flex items-center gap-1.5 text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <Clock size={12} />
                15 min read
              </span>
              <span className="text-xs px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400">
                Intermediate
              </span>
              <span className="flex items-center gap-1.5 text-xs text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30">
                <Zap size={12} />
                50 XP
              </span>
            </div>

            {/* Lesson Title */}
            <h1 className="text-3xl font-bold mb-8 leading-tight">
              Introduction to Spring Boot
            </h1>

            {/* ── Lesson Content ── */}
            <div className="prose prose-invert max-w-none space-y-6 text-white/80 leading-relaxed">

              {/* Section 1 */}
              <section>
                <h2 className="text-xl font-bold text-white mb-3 mt-0">What is Spring Boot?</h2>
                <p className="text-white/70 leading-7">
                  Spring Boot is an opinionated extension of the Spring Framework that removes the need for extensive XML
                  configuration. It uses <span className="font-mono text-cyan-300 bg-cyan-500/10 px-1.5 py-0.5 rounded text-sm">auto-configuration</span> to
                  detect dependencies on the classpath and automatically configure them, letting you focus on writing
                  business logic instead of wiring beans.
                </p>
                <p className="text-white/70 leading-7 mt-3">
                  At its core, Spring Boot embeds a servlet container (Tomcat by default), packages your application as
                  an executable JAR, and provides production-ready features like health checks and metrics out of the box
                  via <span className="font-mono text-cyan-300 bg-cyan-500/10 px-1.5 py-0.5 rounded text-sm">spring-boot-actuator</span>.
                </p>
              </section>

              {/* Info Box */}
              <div className="flex gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/25">
                <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-blue-500/30 flex items-center justify-center">
                  <span className="text-blue-300 text-xs font-bold">i</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-300 mb-1">Why Spring Boot over plain Spring?</p>
                  <p className="text-sm text-blue-200/70 leading-relaxed">
                    Traditional Spring requires dozens of configuration files. Spring Boot's convention-over-configuration
                    philosophy reduces boilerplate by ~70%, so a production-ready REST API can be running in under 5 minutes.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <section>
                <h2 className="text-xl font-bold text-white mb-3">Key Annotations</h2>
                <p className="text-white/70 leading-7">
                  Spring Boot uses annotations extensively to define behavior. Here are the most important ones you'll
                  encounter when building REST APIs:
                </p>

                <div className="mt-4 space-y-3">
                  {[
                    { name: "@SpringBootApplication", desc: "Entry point annotation. Combines @Configuration, @EnableAutoConfiguration, and @ComponentScan." },
                    { name: "@RestController", desc: "Marks a class as a REST controller. Combines @Controller and @ResponseBody so every method returns JSON." },
                    { name: "@GetMapping / @PostMapping", desc: "Map HTTP GET/POST requests to handler methods. Part of the @RequestMapping family." },
                    { name: "@Autowired", desc: "Tells Spring to inject a dependency automatically from the application context." },
                    { name: "@Service / @Repository", desc: "Stereotype annotations that mark beans as service or data-access layer components." },
                  ].map((ann) => (
                    <div key={ann.name} className="flex gap-3 p-3.5 rounded-lg bg-white/5 border border-white/8">
                      <code className="text-purple-300 font-mono text-sm shrink-0 leading-6">{ann.name}</code>
                      <p className="text-sm text-white/60 leading-relaxed">{ann.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Warning Box */}
              <div className="flex gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/25">
                <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-yellow-500/30 flex items-center justify-center">
                  <span className="text-yellow-300 text-xs font-bold">!</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-yellow-300 mb-1">Field injection vs Constructor injection</p>
                  <p className="text-sm text-yellow-200/70 leading-relaxed">
                    Although <code className="font-mono text-yellow-300 bg-yellow-500/10 px-1 rounded">@Autowired</code> on fields
                    is convenient, constructor injection is preferred in production code. It makes dependencies explicit,
                    simplifies unit testing without a Spring context, and avoids circular dependency issues.
                  </p>
                </div>
              </div>

              {/* Section 3 — Code block */}
              <section>
                <h2 className="text-xl font-bold text-white mb-3">Building Your First REST Controller</h2>
                <p className="text-white/70 leading-7 mb-4">
                  Let's build a complete REST controller that exposes CRUD endpoints for a{" "}
                  <span className="font-mono text-cyan-300 bg-cyan-500/10 px-1.5 py-0.5 rounded text-sm">User</span> resource.
                  The controller delegates to a service layer which in turn uses a JPA repository.
                </p>

                {/* Code block */}
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <div className="flex items-center justify-between bg-[#1a1a2e] px-4 py-2.5 border-b border-white/10">
                    <span className="text-xs text-white/40 font-mono">UserController.java</span>
                    <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">Java</span>
                  </div>
                  <pre className="bg-[#0d0d1a] p-5 overflow-x-auto text-sm leading-relaxed">
                    <code>
                      <span className="text-purple-400">@RestController</span>{"\n"}
                      <span className="text-purple-400">@RequestMapping</span>
                      <span className="text-white/70">("/api/users")</span>{"\n"}
                      <span className="text-blue-400">public class </span>
                      <span className="text-cyan-300">UserController </span>
                      <span className="text-white/70">{"{"}</span>{"\n"}
                      {"\n"}
                      {"    "}
                      <span className="text-purple-400">@Autowired</span>{"\n"}
                      {"    "}
                      <span className="text-blue-400">private </span>
                      <span className="text-cyan-300">UserService </span>
                      <span className="text-white/80">userService</span>
                      <span className="text-white/70">;</span>{"\n"}
                      {"\n"}
                      {"    "}
                      <span className="text-green-400">// GET all users</span>{"\n"}
                      {"    "}
                      <span className="text-purple-400">@GetMapping</span>{"\n"}
                      {"    "}
                      <span className="text-blue-400">public </span>
                      <span className="text-cyan-300">List</span>
                      <span className="text-white/70">{"<"}</span>
                      <span className="text-cyan-300">UserDTO</span>
                      <span className="text-white/70">{">"} </span>
                      <span className="text-yellow-300">getAllUsers</span>
                      <span className="text-white/70">() {"{"}</span>{"\n"}
                      {"        "}
                      <span className="text-blue-400">return </span>
                      <span className="text-white/80">userService</span>
                      <span className="text-white/70">.</span>
                      <span className="text-yellow-300">findAll</span>
                      <span className="text-white/70">();</span>{"\n"}
                      {"    "}
                      <span className="text-white/70">{"}"}</span>{"\n"}
                      {"\n"}
                      {"    "}
                      <span className="text-green-400">// GET user by ID</span>{"\n"}
                      {"    "}
                      <span className="text-purple-400">@GetMapping</span>
                      <span className="text-white/70">("/{"{"}id{"}"}")</span>{"\n"}
                      {"    "}
                      <span className="text-blue-400">public </span>
                      <span className="text-cyan-300">ResponseEntity</span>
                      <span className="text-white/70">{"<"}</span>
                      <span className="text-cyan-300">UserDTO</span>
                      <span className="text-white/70">{">"} </span>
                      <span className="text-yellow-300">getUserById</span>
                      <span className="text-white/70">(</span>
                      <span className="text-purple-400">@PathVariable </span>
                      <span className="text-blue-400">Long </span>
                      <span className="text-white/80">id</span>
                      <span className="text-white/70">) {"{"}</span>{"\n"}
                      {"        "}
                      <span className="text-blue-400">return </span>
                      <span className="text-white/80">userService</span>
                      <span className="text-white/70">.</span>
                      <span className="text-yellow-300">findById</span>
                      <span className="text-white/70">(</span>
                      <span className="text-white/80">id</span>
                      <span className="text-white/70">)</span>{"\n"}
                      {"            "}
                      <span className="text-white/70">.</span>
                      <span className="text-yellow-300">map</span>
                      <span className="text-white/70">(</span>
                      <span className="text-cyan-300">ResponseEntity</span>
                      <span className="text-white/70">::</span>
                      <span className="text-yellow-300">ok</span>
                      <span className="text-white/70">)</span>{"\n"}
                      {"            "}
                      <span className="text-white/70">.</span>
                      <span className="text-yellow-300">orElse</span>
                      <span className="text-white/70">(</span>
                      <span className="text-cyan-300">ResponseEntity</span>
                      <span className="text-white/70">.</span>
                      <span className="text-yellow-300">notFound</span>
                      <span className="text-white/70">().</span>
                      <span className="text-yellow-300">build</span>
                      <span className="text-white/70">());</span>{"\n"}
                      {"    "}
                      <span className="text-white/70">{"}"}</span>{"\n"}
                      {"\n"}
                      {"    "}
                      <span className="text-green-400">// POST create user</span>{"\n"}
                      {"    "}
                      <span className="text-purple-400">@PostMapping</span>{"\n"}
                      {"    "}
                      <span className="text-blue-400">public </span>
                      <span className="text-cyan-300">ResponseEntity</span>
                      <span className="text-white/70">{"<"}</span>
                      <span className="text-cyan-300">UserDTO</span>
                      <span className="text-white/70">{">"} </span>
                      <span className="text-yellow-300">createUser</span>
                      <span className="text-white/70">(</span>
                      <span className="text-purple-400">@RequestBody </span>
                      <span className="text-cyan-300">CreateUserRequest </span>
                      <span className="text-white/80">req</span>
                      <span className="text-white/70">) {"{"}</span>{"\n"}
                      {"        "}
                      <span className="text-cyan-300">UserDTO </span>
                      <span className="text-white/80">created </span>
                      <span className="text-white/70">= </span>
                      <span className="text-white/80">userService</span>
                      <span className="text-white/70">.</span>
                      <span className="text-yellow-300">create</span>
                      <span className="text-white/70">(</span>
                      <span className="text-white/80">req</span>
                      <span className="text-white/70">);</span>{"\n"}
                      {"        "}
                      <span className="text-blue-400">return </span>
                      <span className="text-cyan-300">ResponseEntity</span>
                      <span className="text-white/70">.</span>
                      <span className="text-yellow-300">status</span>
                      <span className="text-white/70">(</span>
                      <span className="text-green-300">201</span>
                      <span className="text-white/70">).</span>
                      <span className="text-yellow-300">body</span>
                      <span className="text-white/70">(</span>
                      <span className="text-white/80">created</span>
                      <span className="text-white/70">);</span>{"\n"}
                      {"    "}
                      <span className="text-white/70">{"}"}</span>{"\n"}
                      <span className="text-white/70">{"}"}</span>
                    </code>
                  </pre>
                </div>
              </section>

              {/* Quiz / Exercise */}
              <section className="mt-10">
                <div className="rounded-2xl border border-purple-500/25 bg-gradient-to-br from-purple-900/20 to-violet-900/10 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                      <Award size={16} className="text-purple-400" />
                    </div>
                    <h3 className="font-bold text-lg">Knowledge Check</h3>
                  </div>

                  <p className="text-sm text-white/60 mb-5">
                    Test your understanding before moving to the next lesson.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-3">
                        1. Which annotation combination does <code className="font-mono text-purple-300 bg-purple-500/10 px-1 rounded">@RestController</code> combine?
                      </p>
                      <div className="space-y-2">
                        {[
                          "@Controller + @RequestMapping",
                          "@Controller + @ResponseBody",
                          "@Component + @ResponseBody",
                          "@Service + @RequestMapping",
                        ].map((option, i) => (
                          <button
                            key={i}
                            className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${
                              i === 1
                                ? "border-green-500/40 bg-green-500/10 text-green-300"
                                : "border-white/10 bg-white/5 text-white/60 hover:bg-white/8 hover:border-white/20"
                            }`}
                          >
                            <span className="font-mono text-white/30 mr-2">{String.fromCharCode(65 + i)}.</span>
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-3">
                        2. What HTTP method does <code className="font-mono text-purple-300 bg-purple-500/10 px-1 rounded">@PostMapping</code> handle?
                      </p>
                      <div className="space-y-2">
                        {["GET", "PUT", "POST", "DELETE"].map((option, i) => (
                          <button
                            key={i}
                            className="w-full text-left px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white/60 hover:bg-white/8 hover:border-white/20 text-sm transition-all"
                          >
                            <span className="font-mono text-white/30 mr-2">{String.fromCharCode(65 + i)}.</span>
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={markComplete}
                    className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/20"
                  >
                    Mark Complete & Continue
                  </button>
                </div>
              </section>

            </div>

            {/* ── Bottom Navigation ── */}
            <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
              <button
                onClick={() => prevLesson && selectLesson(prevLesson.id)}
                disabled={!prevLesson}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-sm text-white/60 hover:bg-white/5 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={15} />
                {prevLesson ? prevLesson.title : "Previous"}
              </button>

              {/* Progress indicator */}
              <div className="hidden sm:flex items-center gap-1.5">
                {allLessons.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => selectLesson(l.id)}
                    className={`rounded-full transition-all ${
                      l.id === selectedLesson
                        ? "w-6 h-2 bg-purple-500"
                        : completedLessons.includes(l.id)
                        ? "w-2 h-2 bg-green-500/60"
                        : "w-2 h-2 bg-white/10"
                    }`}
                    title={l.title}
                  />
                ))}
              </div>

              <button
                onClick={() => nextLesson && selectLesson(nextLesson.id)}
                disabled={!nextLesson}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {nextLesson ? nextLesson.title : "Next"}
                <ArrowRight size={15} />
              </button>
            </div>

          </div>
        </main>
      </div>

      {/* ── Floating XP Widget ── */}
      {showXpWidget && (
        <div className="fixed bottom-24 right-6 z-50 animate-bounce">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold shadow-xl shadow-purple-500/30 text-sm">
            <Zap size={16} className="fill-white" />
            +{currentLesson?.xp ?? 50} XP
          </div>
        </div>
      )}

      {/* ── AI Tutor Chat Button ── */}
      <button
        onClick={() => setAiChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold shadow-xl shadow-purple-500/30 hover:opacity-90 hover:scale-105 transition-all"
      >
        <MessageSquare size={18} />
        Ask AI
      </button>

      {/* ── AI Chat Panel ── */}
      {aiChatOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-end justify-end pointer-events-none">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
            onClick={() => setAiChatOpen(false)}
          />

          {/* Panel */}
          <div className="relative pointer-events-auto w-full sm:w-[420px] h-[70vh] sm:h-[500px] sm:mr-6 sm:mb-6 rounded-t-2xl sm:rounded-2xl bg-[#12121f] border border-white/10 shadow-2xl flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-gradient-to-r from-purple-900/40 to-cyan-900/20">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold">AI Tutor</p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Online
                </p>
              </div>
              <button
                onClick={() => setAiChatOpen(false)}
                className="ml-auto text-white/40 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Welcome message */}
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot size={13} className="text-white" />
                </div>
                <div className="flex-1 bg-white/5 border border-white/8 rounded-xl rounded-tl-sm px-3.5 py-2.5 text-sm text-white/80 leading-relaxed">
                  Hi! I'm your AI tutor for this lesson. Ask me anything about Spring Boot, annotations, or Java concepts!
                </div>
              </div>

              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    msg.role === "user"
                      ? "bg-purple-600/40 border border-purple-500/40"
                      : "bg-gradient-to-br from-purple-500 to-cyan-400"
                  }`}>
                    {msg.role === "user" ? (
                      <User size={13} className="text-purple-300" />
                    ) : (
                      <Bot size={13} className="text-white" />
                    )}
                  </div>
                  <div className={`flex-1 rounded-xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-purple-600/20 border border-purple-500/30 text-white rounded-tr-sm"
                      : "bg-white/5 border border-white/8 text-white/80 rounded-tl-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendChat()}
                  placeholder="Ask about Spring Boot..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all"
                />
                <button
                  onClick={sendChat}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center hover:opacity-90 transition-all shrink-0"
                >
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
