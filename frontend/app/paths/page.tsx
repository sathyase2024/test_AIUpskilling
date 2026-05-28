"use client";

import { useState } from "react";
import {
  Code2,
  Server,
  Layers,
  Brain,
  Cloud,
  Smartphone,
  Shield,
  BarChart3,
  Clock,
  Users,
  ChevronRight,
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
  CheckCircle2,
} from "lucide-react";

const FILTERS = ["All Paths", "Frontend", "Backend", "Full Stack", "AI/ML", "DevOps", "Mobile"];

const PATHS = [
  {
    id: 1,
    title: "Full Stack Java Developer",
    description: "Master enterprise-grade full stack development with Java, Spring Boot, and modern frontend technologies.",
    category: "Full Stack",
    gradient: "from-purple-600 to-violet-500",
    headerGradient: "from-purple-900/80 to-violet-800/60",
    glowColor: "hover:shadow-purple-500/20",
    borderGlow: "hover:border-purple-500/50",
    icon: Layers,
    stack: ["Java", "Spring Boot", "React", "PostgreSQL", "Docker", "AWS"],
    stackColors: ["bg-orange-500/20 text-orange-300", "bg-green-500/20 text-green-300", "bg-cyan-500/20 text-cyan-300", "bg-blue-500/20 text-blue-300", "bg-sky-500/20 text-sky-300", "bg-yellow-500/20 text-yellow-300"],
    duration: "6-8 months",
    difficulty: "Advanced",
    enrolled: "12.4K",
    progress: 35,
    isEnrolled: true,
  },
  {
    id: 2,
    title: "MERN Stack Developer",
    description: "Build scalable web apps with MongoDB, Express, React, and Node.js from ground up.",
    category: "Full Stack",
    gradient: "from-emerald-600 to-green-400",
    headerGradient: "from-emerald-900/80 to-green-800/60",
    glowColor: "hover:shadow-emerald-500/20",
    borderGlow: "hover:border-emerald-500/50",
    icon: Code2,
    stack: ["MongoDB", "Express.js", "React", "Node.js", "Redux", "Jest"],
    stackColors: ["bg-green-500/20 text-green-300", "bg-gray-500/20 text-gray-300", "bg-cyan-500/20 text-cyan-300", "bg-lime-500/20 text-lime-300", "bg-purple-500/20 text-purple-300", "bg-red-500/20 text-red-300"],
    duration: "5-7 months",
    difficulty: "Intermediate",
    enrolled: "18.2K",
    progress: 62,
    isEnrolled: true,
  },
  {
    id: 3,
    title: "AI Engineer",
    description: "Design and deploy intelligent systems using LLMs, vector databases, and MLOps pipelines.",
    category: "AI/ML",
    gradient: "from-cyan-600 to-teal-400",
    headerGradient: "from-cyan-900/80 to-teal-800/60",
    glowColor: "hover:shadow-cyan-500/20",
    borderGlow: "hover:border-cyan-500/50",
    icon: Brain,
    stack: ["Python", "PyTorch", "LangChain", "FastAPI", "Pinecone", "Kubernetes"],
    stackColors: ["bg-blue-500/20 text-blue-300", "bg-orange-500/20 text-orange-300", "bg-green-500/20 text-green-300", "bg-teal-500/20 text-teal-300", "bg-purple-500/20 text-purple-300", "bg-cyan-500/20 text-cyan-300"],
    duration: "8-10 months",
    difficulty: "Advanced",
    enrolled: "9.8K",
    progress: null,
    isEnrolled: false,
  },
  {
    id: 4,
    title: "DevOps Engineer",
    description: "Automate infrastructure, master CI/CD pipelines, and build resilient cloud-native systems.",
    category: "DevOps",
    gradient: "from-orange-600 to-amber-400",
    headerGradient: "from-orange-900/80 to-amber-800/60",
    glowColor: "hover:shadow-orange-500/20",
    borderGlow: "hover:border-orange-500/50",
    icon: Server,
    stack: ["Docker", "Kubernetes", "Terraform", "Jenkins", "AWS", "Prometheus"],
    stackColors: ["bg-sky-500/20 text-sky-300", "bg-blue-500/20 text-blue-300", "bg-purple-500/20 text-purple-300", "bg-red-500/20 text-red-300", "bg-yellow-500/20 text-yellow-300", "bg-orange-500/20 text-orange-300"],
    duration: "6-8 months",
    difficulty: "Intermediate",
    enrolled: "7.3K",
    progress: null,
    isEnrolled: false,
  },
  {
    id: 5,
    title: "Frontend Engineer",
    description: "Craft pixel-perfect, performant UIs with React, TypeScript, and modern CSS techniques.",
    category: "Frontend",
    gradient: "from-pink-600 to-rose-400",
    headerGradient: "from-pink-900/80 to-rose-800/60",
    glowColor: "hover:shadow-pink-500/20",
    borderGlow: "hover:border-pink-500/50",
    icon: Code2,
    stack: ["React", "TypeScript", "Next.js", "TailwindCSS", "GraphQL", "Storybook"],
    stackColors: ["bg-cyan-500/20 text-cyan-300", "bg-blue-500/20 text-blue-300", "bg-black/30 text-white/80", "bg-teal-500/20 text-teal-300", "bg-pink-500/20 text-pink-300", "bg-orange-500/20 text-orange-300"],
    duration: "4-6 months",
    difficulty: "Beginner",
    enrolled: "24.1K",
    progress: null,
    isEnrolled: false,
  },
  {
    id: 6,
    title: "Data Scientist",
    description: "Transform raw data into actionable insights using statistical modeling and machine learning.",
    category: "AI/ML",
    gradient: "from-blue-600 to-indigo-400",
    headerGradient: "from-blue-900/80 to-indigo-800/60",
    glowColor: "hover:shadow-blue-500/20",
    borderGlow: "hover:border-blue-500/50",
    icon: BarChart3,
    stack: ["Python", "Pandas", "Scikit-learn", "TensorFlow", "SQL", "Tableau"],
    stackColors: ["bg-blue-500/20 text-blue-300", "bg-green-500/20 text-green-300", "bg-orange-500/20 text-orange-300", "bg-yellow-500/20 text-yellow-300", "bg-gray-500/20 text-gray-300", "bg-blue-500/20 text-blue-300"],
    duration: "7-9 months",
    difficulty: "Intermediate",
    enrolled: "15.6K",
    progress: null,
    isEnrolled: false,
  },
  {
    id: 7,
    title: "Cloud Engineer",
    description: "Architect scalable, cost-optimized cloud solutions across AWS, GCP, and Azure platforms.",
    category: "DevOps",
    gradient: "from-indigo-600 to-blue-400",
    headerGradient: "from-indigo-900/80 to-blue-800/60",
    glowColor: "hover:shadow-indigo-500/20",
    borderGlow: "hover:border-indigo-500/50",
    icon: Cloud,
    stack: ["AWS", "Terraform", "Python", "Kubernetes", "CloudFormation", "Azure"],
    stackColors: ["bg-yellow-500/20 text-yellow-300", "bg-purple-500/20 text-purple-300", "bg-blue-500/20 text-blue-300", "bg-cyan-500/20 text-cyan-300", "bg-orange-500/20 text-orange-300", "bg-indigo-500/20 text-indigo-300"],
    duration: "6-8 months",
    difficulty: "Advanced",
    enrolled: "6.9K",
    progress: null,
    isEnrolled: false,
  },
  {
    id: 8,
    title: "Cybersecurity Engineer",
    description: "Defend systems, perform penetration testing, and build security-first architectures.",
    category: "Backend",
    gradient: "from-red-600 to-rose-400",
    headerGradient: "from-red-900/80 to-rose-800/60",
    glowColor: "hover:shadow-red-500/20",
    borderGlow: "hover:border-red-500/50",
    icon: Shield,
    stack: ["Python", "Metasploit", "Wireshark", "Linux", "OWASP", "Splunk"],
    stackColors: ["bg-blue-500/20 text-blue-300", "bg-red-500/20 text-red-300", "bg-teal-500/20 text-teal-300", "bg-gray-500/20 text-gray-300", "bg-orange-500/20 text-orange-300", "bg-green-500/20 text-green-300"],
    duration: "8-10 months",
    difficulty: "Advanced",
    enrolled: "5.2K",
    progress: null,
    isEnrolled: false,
  },
];

const FEATURED_STEPS = [
  { icon: "☕", label: "Java", color: "bg-orange-500/20 border-orange-500/40 text-orange-300" },
  { icon: "🍃", label: "Spring Boot", color: "bg-green-500/20 border-green-500/40 text-green-300" },
  { icon: "⚛️", label: "React", color: "bg-cyan-500/20 border-cyan-500/40 text-cyan-300" },
  { icon: "🐘", label: "PostgreSQL", color: "bg-blue-500/20 border-blue-500/40 text-blue-300" },
  { icon: "🐳", label: "Docker", color: "bg-sky-500/20 border-sky-500/40 text-sky-300" },
  { icon: "☁️", label: "AWS", color: "bg-yellow-500/20 border-yellow-500/40 text-yellow-300" },
];

const HOW_IT_WORKS = [
  { icon: BookOpen, label: "Choose Path", description: "Browse AI-curated paths tailored for your target role", step: 1 },
  { icon: Zap, label: "Personalize", description: "Tell us your hobbies and learning style for custom content", step: 2 },
  { icon: Code2, label: "Learn & Code", description: "Complete interactive lessons, projects, and coding challenges", step: 3 },
  { icon: Award, label: "Get Certified", description: "Earn verifiable certificates recognized by top employers", step: 4 },
];

const HOBBIES = [
  { icon: Music, label: "Music" },
  { icon: Gamepad2, label: "Gaming" },
  { icon: Camera, label: "Photography" },
  { icon: Dumbbell, label: "Fitness" },
  { icon: Plane, label: "Travel" },
  { icon: Coffee, label: "Coffee" },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: "text-green-400 bg-green-500/10 border-green-500/30",
  Intermediate: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  Advanced: "text-red-400 bg-red-500/10 border-red-500/30",
};

export default function PathsPage() {
  const [activeFilter, setActiveFilter] = useState("All Paths");

  const filtered = PATHS.filter(
    (p) => activeFilter === "All Paths" || p.category === activeFilter
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-6">
            <TrendingUp size={14} className="text-purple-400" />
            20+ career paths and growing
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Find Your Perfect{" "}
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              Career Path
            </span>
          </h1>

          <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">
            AI-curated learning paths for 20+ tech roles — personalized to your goals, pace, and interests.
          </p>

          {/* Filter Row */}
          <div className="flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeFilter === f
                    ? "bg-gradient-to-r from-purple-600 to-cyan-500 border-transparent text-white shadow-lg shadow-purple-500/25"
                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/20"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Path */}
      {(activeFilter === "All Paths" || activeFilter === "Full Stack") && (
        <section className="px-6 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-white/50 uppercase tracking-widest font-semibold">Featured Path</span>
            </div>

            <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-cyan-900/20 pointer-events-none" />

              <div className="relative grid md:grid-cols-2 gap-0">
                {/* Left */}
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <Layers size={22} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Full Stack Java Developer</h2>
                      <p className="text-sm text-white/50">Enterprise-grade full stack path</p>
                    </div>
                  </div>

                  <p className="text-white/60 mb-6 leading-relaxed">
                    Master the complete Java ecosystem — from core language fundamentals to deploying production Spring Boot APIs, building React frontends, and orchestrating containers on AWS.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Java", "Spring Boot", "React", "PostgreSQL", "Docker", "AWS", "REST APIs", "Microservices"].map((skill) => (
                      <span key={skill} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 mb-8 text-sm text-white/50">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-purple-400" />
                      6-8 months
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap size={14} className="text-yellow-400" />
                      Advanced
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={14} className="text-cyan-400" />
                      12.4K enrolled
                    </div>
                  </div>

                  <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-purple-500/25">
                    <Play size={16} fill="currentColor" />
                    Start Path
                  </button>
                </div>

                {/* Right — path visualization */}
                <div className="p-8 md:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10">
                  <p className="text-sm text-white/40 uppercase tracking-widest font-semibold mb-6">Learning Journey</p>
                  <div className="space-y-3">
                    {FEATURED_STEPS.map((step, i) => (
                      <div key={step.label} className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg ${step.color}`}>
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-white/80">{step.label}</span>
                            {i < 3 && (
                              <span className="text-xs text-green-400 flex items-center gap-1">
                                <CheckCircle2 size={12} />
                                Ready
                              </span>
                            )}
                          </div>
                          <div className="mt-1.5 h-1 rounded-full bg-white/5">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all"
                              style={{ width: i === 0 ? "100%" : i === 1 ? "80%" : i === 2 ? "45%" : "0%" }}
                            />
                          </div>
                        </div>
                        {i < FEATURED_STEPS.length - 1 && (
                          <div className="absolute left-[2.75rem] mt-10 w-0.5 h-3 bg-white/10" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Path Cards Grid */}
      <section className="px-6 mb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">
            {activeFilter === "All Paths" ? "All Learning Paths" : `${activeFilter} Paths`}
            <span className="ml-3 text-base font-normal text-white/40">({filtered.length})</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((path) => {
              const Icon = path.icon;
              return (
                <div
                  key={path.id}
                  className={`group relative rounded-2xl border border-white/10 ${path.borderGlow} bg-white/5 overflow-hidden transition-all duration-300 hover:shadow-xl ${path.glowColor} hover:-translate-y-0.5`}
                >
                  {/* Card Header */}
                  <div className={`relative h-28 bg-gradient-to-br ${path.headerGradient} p-5 flex items-end`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${path.gradient} opacity-20`} />
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${path.gradient} flex items-center justify-center shadow-lg mb-1`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    {path.isEnrolled && (
                      <span className="ml-auto px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-medium">
                        Enrolled
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <h3 className="font-bold text-base mb-1.5">{path.title}</h3>
                    <p className="text-sm text-white/50 mb-4 line-clamp-2">{path.description}</p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {path.stack.slice(0, 5).map((tech, i) => (
                        <span key={tech} className={`px-2 py-0.5 rounded-md text-xs font-medium ${path.stackColors[i]}`}>
                          {tech}
                        </span>
                      ))}
                      {path.stack.length > 5 && (
                        <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-white/5 text-white/40">
                          +{path.stack.length - 5} more
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 text-xs text-white/40 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {path.duration}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full border text-xs ${DIFFICULTY_COLORS[path.difficulty]}`}>
                        {path.difficulty}
                      </span>
                      <span className="flex items-center gap-1 ml-auto">
                        <Users size={11} />
                        {path.enrolled}
                      </span>
                    </div>

                    {/* Progress Bar (if enrolled) */}
                    {path.isEnrolled && path.progress !== null && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-white/40">Progress</span>
                          <span className="text-white/60 font-medium">{path.progress}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${path.gradient} transition-all`}
                            style={{ width: `${path.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 mt-2">
                      <button className="flex-1 py-2 rounded-lg border border-white/15 text-white/70 text-sm font-medium hover:bg-white/5 hover:border-white/25 transition-all">
                        View Path
                      </button>
                      <button className={`flex-1 py-2 rounded-lg bg-gradient-to-r ${path.gradient} text-white text-sm font-medium hover:opacity-90 transition-all`}>
                        {path.isEnrolled ? "Continue" : "Enroll"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How Paths Work */}
      <section className="px-6 mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How Paths Work</h2>
            <p className="text-white/40">From zero to job-ready in 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {HOW_IT_WORKS.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="relative">
                  {/* Connector line */}
                  {index < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-1/2 w-full h-px bg-gradient-to-r from-white/10 to-transparent z-0" />
                  )}

                  <div className="relative z-10 flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-white/8 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600/30 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/10">
                      <Icon size={24} className="text-purple-400" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-xs font-bold mb-3 shadow-sm">
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

      {/* Hobby Personalization Banner */}
      <section className="px-6 mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl border border-purple-500/20 overflow-hidden bg-gradient-to-r from-purple-900/30 via-violet-900/20 to-cyan-900/20 p-10 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-cyan-600/5 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300 mb-5">
                <Zap size={13} />
                AI-Personalized Learning
              </div>

              <h2 className="text-3xl font-bold mb-3">
                Every path adapts to{" "}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  your interests
                </span>
              </h2>
              <p className="text-white/50 mb-8 max-w-xl mx-auto">
                Our AI weaves your hobbies into learning examples — making code finally click.
              </p>

              {/* Hobby Pills */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {HOBBIES.map((hobby, i) => {
                  const Icon = hobby.icon;
                  return (
                    <div
                      key={hobby.label}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 hover:border-purple-500/40 hover:text-white transition-all cursor-pointer"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <Icon size={15} className="text-purple-400" />
                      {hobby.label}
                    </div>
                  );
                })}
              </div>

              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
                Personalize My Path
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
