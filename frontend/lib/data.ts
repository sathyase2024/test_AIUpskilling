/* =============================================================
   SkillForge AI — Platform Data Layer
   All static/mock data and TypeScript interfaces for the MVP.
   ============================================================= */

/* -------------------------------------------------------
   Types & Interfaces
------------------------------------------------------- */

export type Difficulty = "beginner" | "intermediate" | "advanced";
export type LessonType = "video" | "reading" | "exercise" | "quiz" | "project";

export interface Topic {
  id: string;
  name: string;
  difficulty: Difficulty;
  duration: string;
  rating: number;
  enrolled: number;
  tags: string[];
  description?: string;
}

export interface TopicCategory {
  id: string;
  name: string;
  icon: string;
  color: string;          // Tailwind gradient classes
  bgColor: string;        // Tailwind bg + border classes
  description: string;
  count: number;
  topics: Topic[];
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  duration: string;
  skills: string[];
  color: string;          // Tailwind gradient classes
  bgColor: string;
  icon: string;
  enrolled: number;
  rating: number;
  topics: string[];
  highlights: string[];
  salaryRange: string;
}

export interface HobbyCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  example: string;
  color: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: LessonType;
  completed: boolean;
  locked: boolean;
  xp: number;
}

export interface SkillProgress {
  name: string;
  level: number;     // 0–100
  category: string;
}

export interface UserProgress {
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  coursesCompleted: number;
  hoursLearned: number;
  currentPath: string;
  skills: SkillProgress[];
  badges: string[];
  rank: string;
}

export interface DashboardStat {
  label: string;
  value: string;
  change: string;
  changePositive: boolean;
  icon: string;
  color: string;
  bgColor: string;
}

/* =============================================================
   1. TOPIC CATEGORIES
   ============================================================= */

export const topicCategories: TopicCategory[] = [
  {
    id: "programming-languages",
    name: "Programming Languages",
    icon: "Code",
    color: "from-violet-600 to-purple-600",
    bgColor: "bg-violet-500/10 border-violet-500/20",
    description:
      "Master the foundations — from Java and Python to modern systems languages like Rust and Go.",
    count: 8,
    topics: [
      {
        id: "java",
        name: "Java Mastery",
        difficulty: "intermediate",
        duration: "40 hours",
        rating: 4.8,
        enrolled: 128_400,
        tags: ["OOP", "JVM", "Spring", "Collections"],
        description:
          "Comprehensive Java from core OOP through concurrency, streams, and modern Java 21 features.",
      },
      {
        id: "python",
        name: "Python for Everyone",
        difficulty: "beginner",
        duration: "28 hours",
        rating: 4.9,
        enrolled: 245_800,
        tags: ["scripting", "automation", "data", "async"],
        description:
          "From zero to Pythonista — covering syntax, data structures, OOP, and practical applications.",
      },
      {
        id: "javascript",
        name: "Modern JavaScript",
        difficulty: "intermediate",
        duration: "32 hours",
        rating: 4.7,
        enrolled: 198_600,
        tags: ["ES2024", "async/await", "DOM", "modules"],
        description:
          "Deep dive into modern JavaScript: closures, prototypes, Promises, generators, and ES2024.",
      },
      {
        id: "typescript",
        name: "TypeScript Deep Dive",
        difficulty: "intermediate",
        duration: "24 hours",
        rating: 4.9,
        enrolled: 87_300,
        tags: ["types", "generics", "decorators", "utility types"],
        description:
          "Advanced TypeScript patterns — discriminated unions, conditional types, and type-safe APIs.",
      },
      {
        id: "go",
        name: "Go (Golang) Essentials",
        difficulty: "intermediate",
        duration: "30 hours",
        rating: 4.8,
        enrolled: 52_100,
        tags: ["concurrency", "goroutines", "channels", "microservices"],
        description:
          "Build high-performance services with Go — goroutines, interfaces, and idiomatic patterns.",
      },
      {
        id: "rust",
        name: "Rust Systems Programming",
        difficulty: "advanced",
        duration: "50 hours",
        rating: 4.9,
        enrolled: 31_700,
        tags: ["ownership", "borrow-checker", "concurrency", "WASM"],
        description:
          "Memory-safe systems programming with Rust — ownership model, lifetimes, and async Rust.",
      },
      {
        id: "kotlin",
        name: "Kotlin for JVM & Android",
        difficulty: "intermediate",
        duration: "26 hours",
        rating: 4.7,
        enrolled: 44_900,
        tags: ["coroutines", "null-safety", "extension functions", "Android"],
        description:
          "Modern Kotlin: coroutines, sealed classes, and building both JVM and Android applications.",
      },
      {
        id: "cpp",
        name: "C++ Modern Features",
        difficulty: "advanced",
        duration: "45 hours",
        rating: 4.6,
        enrolled: 28_500,
        tags: ["C++20", "templates", "RAII", "concurrency"],
        description:
          "Modern C++ with move semantics, concepts, ranges, and high-performance patterns.",
      },
    ],
  },

  {
    id: "frontend",
    name: "Frontend Development",
    icon: "Monitor",
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-500/10 border-cyan-500/20",
    description:
      "Build stunning, performant user interfaces with modern frameworks and web APIs.",
    count: 7,
    topics: [
      {
        id: "react",
        name: "React 19 & Ecosystem",
        difficulty: "intermediate",
        duration: "36 hours",
        rating: 4.9,
        enrolled: 312_400,
        tags: ["hooks", "context", "Suspense", "RSC", "TanStack Query"],
        description:
          "Master React 19 with concurrent features, Server Components, and the modern ecosystem.",
      },
      {
        id: "nextjs",
        name: "Next.js App Router",
        difficulty: "intermediate",
        duration: "30 hours",
        rating: 4.9,
        enrolled: 178_900,
        tags: ["App Router", "RSC", "ISR", "Server Actions", "streaming"],
        description:
          "Production-grade Next.js: App Router, caching strategies, Server Actions, and deployment.",
      },
      {
        id: "angular",
        name: "Angular 18 Enterprise",
        difficulty: "intermediate",
        duration: "42 hours",
        rating: 4.6,
        enrolled: 89_300,
        tags: ["signals", "standalone", "RxJS", "NgRx", "DI"],
        description:
          "Enterprise Angular with signals, standalone components, and scalable state management.",
      },
      {
        id: "vuejs",
        name: "Vue.js 3 Composition API",
        difficulty: "beginner",
        duration: "28 hours",
        rating: 4.7,
        enrolled: 97_600,
        tags: ["Composition API", "Pinia", "Nuxt 3", "TypeScript"],
        description:
          "Vue 3 from scratch — Composition API, Pinia for state, and Nuxt 3 for full-stack apps.",
      },
      {
        id: "tailwindcss",
        name: "Tailwind CSS Mastery",
        difficulty: "beginner",
        duration: "16 hours",
        rating: 4.8,
        enrolled: 143_200,
        tags: ["utility-first", "design systems", "animations", "dark mode"],
        description:
          "Build beautiful UIs with Tailwind CSS — design systems, custom components, and animations.",
      },
      {
        id: "threejs",
        name: "3D Web with Three.js",
        difficulty: "advanced",
        duration: "38 hours",
        rating: 4.7,
        enrolled: 24_800,
        tags: ["WebGL", "3D", "animations", "shaders", "React Three Fiber"],
        description:
          "Create immersive 3D web experiences with Three.js and React Three Fiber.",
      },
      {
        id: "web-performance",
        name: "Web Performance Engineering",
        difficulty: "advanced",
        duration: "22 hours",
        rating: 4.8,
        enrolled: 38_700,
        tags: ["Core Web Vitals", "bundle optimization", "caching", "CDN"],
        description:
          "Optimize web apps for speed — Core Web Vitals, bundle analysis, and rendering strategies.",
      },
    ],
  },

  {
    id: "backend",
    name: "Backend Development",
    icon: "Server",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
    description:
      "Design and build robust, scalable server-side systems and APIs.",
    count: 7,
    topics: [
      {
        id: "nodejs",
        name: "Node.js & Express",
        difficulty: "intermediate",
        duration: "32 hours",
        rating: 4.7,
        enrolled: 187_500,
        tags: ["REST APIs", "Express", "Fastify", "event loop", "streams"],
        description:
          "Build high-throughput Node.js services — REST APIs, streams, and performance tuning.",
      },
      {
        id: "spring-boot",
        name: "Spring Boot 3",
        difficulty: "intermediate",
        duration: "44 hours",
        rating: 4.8,
        enrolled: 134_200,
        tags: ["Spring MVC", "Spring Security", "JPA", "microservices", "reactive"],
        description:
          "Enterprise Java with Spring Boot 3 — security, JPA, reactive programming, and microservices.",
      },
      {
        id: "django",
        name: "Django & DRF",
        difficulty: "intermediate",
        duration: "34 hours",
        rating: 4.7,
        enrolled: 96_400,
        tags: ["Django REST", "authentication", "ORM", "Celery", "channels"],
        description:
          "Full-stack Python with Django — REST APIs, async views, WebSockets, and background tasks.",
      },
      {
        id: "fastapi",
        name: "FastAPI & Async Python",
        difficulty: "intermediate",
        duration: "24 hours",
        rating: 4.9,
        enrolled: 72_800,
        tags: ["async", "Pydantic", "OpenAPI", "dependency injection"],
        description:
          "Build blazing-fast APIs with FastAPI — async endpoints, Pydantic v2, and automatic docs.",
      },
      {
        id: "graphql",
        name: "GraphQL API Design",
        difficulty: "intermediate",
        duration: "20 hours",
        rating: 4.7,
        enrolled: 48_600,
        tags: ["schema design", "resolvers", "subscriptions", "Apollo", "Relay"],
        description:
          "Design flexible GraphQL APIs — schema-first design, DataLoader, subscriptions, and federation.",
      },
      {
        id: "grpc",
        name: "gRPC & Protocol Buffers",
        difficulty: "advanced",
        duration: "18 hours",
        rating: 4.7,
        enrolled: 29_300,
        tags: ["protobuf", "streaming", "microservices", "load balancing"],
        description:
          "High-performance inter-service communication with gRPC and Protocol Buffers.",
      },
      {
        id: "microservices",
        name: "Microservices Architecture",
        difficulty: "advanced",
        duration: "40 hours",
        rating: 4.8,
        enrolled: 61_400,
        tags: ["DDD", "event-driven", "Saga", "CQRS", "service mesh"],
        description:
          "Design production microservices — DDD, CQRS, event sourcing, and the Saga pattern.",
      },
    ],
  },

  {
    id: "mobile",
    name: "Mobile Development",
    icon: "Smartphone",
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-500/10 border-pink-500/20",
    description:
      "Create cross-platform mobile apps for iOS and Android with modern frameworks.",
    count: 5,
    topics: [
      {
        id: "react-native",
        name: "React Native",
        difficulty: "intermediate",
        duration: "36 hours",
        rating: 4.7,
        enrolled: 112_600,
        tags: ["Expo", "navigation", "animations", "native modules"],
        description:
          "Build cross-platform mobile apps with React Native — navigation, animations, and native APIs.",
      },
      {
        id: "flutter",
        name: "Flutter & Dart",
        difficulty: "intermediate",
        duration: "40 hours",
        rating: 4.8,
        enrolled: 98_300,
        tags: ["widgets", "state management", "BLoC", "animations", "Dart"],
        description:
          "Beautiful cross-platform apps with Flutter — custom widgets, BLoC state, and platform channels.",
      },
      {
        id: "swiftui",
        name: "SwiftUI & iOS 17",
        difficulty: "intermediate",
        duration: "38 hours",
        rating: 4.8,
        enrolled: 67_400,
        tags: ["SwiftUI", "Combine", "ARKit", "Core Data", "WidgetKit"],
        description:
          "Native iOS development with SwiftUI — declarative UI, Combine, and Apple ecosystem integration.",
      },
      {
        id: "android-kotlin",
        name: "Android with Jetpack Compose",
        difficulty: "intermediate",
        duration: "38 hours",
        rating: 4.7,
        enrolled: 74_800,
        tags: ["Compose", "Coroutines", "ViewModel", "Room", "Hilt"],
        description:
          "Modern Android development with Jetpack Compose, ViewModels, and Clean Architecture.",
      },
      {
        id: "mobile-ci-cd",
        name: "Mobile CI/CD & Testing",
        difficulty: "advanced",
        duration: "16 hours",
        rating: 4.6,
        enrolled: 21_500,
        tags: ["Fastlane", "Bitrise", "unit tests", "E2E", "app store"],
        description:
          "Automate mobile builds, testing, and deployment to app stores with CI/CD pipelines.",
      },
    ],
  },

  {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    icon: "Cloud",
    color: "from-sky-500 to-blue-700",
    bgColor: "bg-sky-500/10 border-sky-500/20",
    description:
      "Build and operate cloud-native infrastructure with industry-leading tools.",
    count: 8,
    topics: [
      {
        id: "aws",
        name: "AWS Solutions Architect",
        difficulty: "intermediate",
        duration: "50 hours",
        rating: 4.8,
        enrolled: 201_700,
        tags: ["EC2", "S3", "Lambda", "RDS", "VPC", "CDK"],
        description:
          "Design resilient AWS architectures — compute, storage, networking, serverless, and IaC with CDK.",
      },
      {
        id: "docker",
        name: "Docker & Containerization",
        difficulty: "beginner",
        duration: "18 hours",
        rating: 4.9,
        enrolled: 258_300,
        tags: ["Dockerfile", "Compose", "networking", "volumes", "security"],
        description:
          "Master Docker from basics to multi-stage builds, Compose stacks, and container security.",
      },
      {
        id: "kubernetes",
        name: "Kubernetes in Production",
        difficulty: "advanced",
        duration: "48 hours",
        rating: 4.8,
        enrolled: 98_600,
        tags: ["pods", "Helm", "Operators", "RBAC", "GitOps", "Istio"],
        description:
          "Run production Kubernetes clusters — Helm charts, RBAC, Operators, and GitOps workflows.",
      },
      {
        id: "terraform",
        name: "Terraform & IaC",
        difficulty: "intermediate",
        duration: "28 hours",
        rating: 4.8,
        enrolled: 87_400,
        tags: ["HCL", "modules", "state management", "multi-cloud", "Terragrunt"],
        description:
          "Infrastructure as Code with Terraform — modules, remote state, and multi-cloud deployments.",
      },
      {
        id: "github-actions",
        name: "GitHub Actions CI/CD",
        difficulty: "intermediate",
        duration: "16 hours",
        rating: 4.7,
        enrolled: 134_900,
        tags: ["workflows", "matrix builds", "secrets", "reusable workflows"],
        description:
          "Automate builds, tests, and deployments with GitHub Actions — from basics to advanced patterns.",
      },
      {
        id: "monitoring",
        name: "Observability Stack",
        difficulty: "intermediate",
        duration: "22 hours",
        rating: 4.7,
        enrolled: 54_200,
        tags: ["Prometheus", "Grafana", "OpenTelemetry", "Loki", "SLOs"],
        description:
          "Implement full observability with Prometheus, Grafana, distributed tracing, and alerting.",
      },
      {
        id: "gcp",
        name: "Google Cloud Platform",
        difficulty: "intermediate",
        duration: "42 hours",
        rating: 4.7,
        enrolled: 78_500,
        tags: ["GKE", "BigQuery", "Cloud Run", "Pub/Sub", "Vertex AI"],
        description:
          "Build on GCP — Kubernetes Engine, BigQuery analytics, serverless, and AI services.",
      },
      {
        id: "site-reliability",
        name: "Site Reliability Engineering",
        difficulty: "advanced",
        duration: "35 hours",
        rating: 4.8,
        enrolled: 41_300,
        tags: ["SLI/SLO/SLA", "chaos engineering", "incident management", "toil"],
        description:
          "SRE principles in practice — error budgets, on-call runbooks, and reliability automation.",
      },
    ],
  },

  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    icon: "Brain",
    color: "from-fuchsia-500 to-purple-700",
    bgColor: "bg-fuchsia-500/10 border-fuchsia-500/20",
    description:
      "From classical ML to cutting-edge Generative AI, LLMs, and autonomous agents.",
    count: 8,
    topics: [
      {
        id: "ml-fundamentals",
        name: "Machine Learning Fundamentals",
        difficulty: "intermediate",
        duration: "38 hours",
        rating: 4.8,
        enrolled: 167_400,
        tags: ["supervised", "unsupervised", "scikit-learn", "feature engineering"],
        description:
          "Core ML concepts — regression, classification, clustering, model evaluation, and scikit-learn.",
      },
      {
        id: "deep-learning",
        name: "Deep Learning with PyTorch",
        difficulty: "advanced",
        duration: "52 hours",
        rating: 4.8,
        enrolled: 89_600,
        tags: ["neural networks", "CNNs", "RNNs", "transformers", "training tricks"],
        description:
          "Build deep neural networks from scratch with PyTorch — CNNs, attention, and transformer architectures.",
      },
      {
        id: "generative-ai",
        name: "Generative AI & LLMs",
        difficulty: "intermediate",
        duration: "30 hours",
        rating: 4.9,
        enrolled: 212_800,
        tags: ["GPT", "fine-tuning", "embeddings", "multimodal", "evaluation"],
        description:
          "Understand and harness LLMs — architecture, fine-tuning, embeddings, and multimodal models.",
      },
      {
        id: "prompt-engineering",
        name: "Advanced Prompt Engineering",
        difficulty: "beginner",
        duration: "12 hours",
        rating: 4.8,
        enrolled: 348_200,
        tags: ["chain-of-thought", "few-shot", "system prompts", "structured output"],
        description:
          "Master prompt design — chain-of-thought, few-shot learning, and reliable structured outputs.",
      },
      {
        id: "rag",
        name: "RAG Systems & Vector Search",
        difficulty: "intermediate",
        duration: "24 hours",
        rating: 4.9,
        enrolled: 128_700,
        tags: ["embeddings", "vector DB", "LangChain", "LlamaIndex", "chunking"],
        description:
          "Build production RAG pipelines — embeddings, vector stores, retrieval strategies, and evaluation.",
      },
      {
        id: "ai-agents",
        name: "AI Agents & Tool Use",
        difficulty: "advanced",
        duration: "28 hours",
        rating: 4.9,
        enrolled: 94_300,
        tags: ["ReAct", "function calling", "multi-agent", "AutoGen", "CrewAI"],
        description:
          "Design autonomous AI agents — ReAct loops, function calling, planning, and multi-agent orchestration.",
      },
      {
        id: "mlops",
        name: "MLOps & Model Deployment",
        difficulty: "advanced",
        duration: "32 hours",
        rating: 4.7,
        enrolled: 58_400,
        tags: ["MLflow", "model registry", "serving", "drift detection", "CI/CD"],
        description:
          "Operationalize ML models — experiment tracking, model registry, serving, and monitoring.",
      },
      {
        id: "computer-vision",
        name: "Computer Vision",
        difficulty: "advanced",
        duration: "40 hours",
        rating: 4.7,
        enrolled: 47_200,
        tags: ["YOLO", "SAM", "object detection", "segmentation", "diffusion"],
        description:
          "Real-world computer vision — object detection, segmentation, diffusion models, and deployment.",
      },
    ],
  },

  {
    id: "databases",
    name: "Databases",
    icon: "Database",
    color: "from-orange-500 to-amber-600",
    bgColor: "bg-orange-500/10 border-orange-500/20",
    description:
      "Master relational, NoSQL, and NewSQL databases for modern application needs.",
    count: 6,
    topics: [
      {
        id: "postgresql",
        name: "PostgreSQL Advanced",
        difficulty: "intermediate",
        duration: "28 hours",
        rating: 4.8,
        enrolled: 112_300,
        tags: ["indexing", "query optimization", "partitioning", "JSONB", "replication"],
        description:
          "Advanced PostgreSQL — query planner, indexing strategies, partitioning, and high availability.",
      },
      {
        id: "mongodb",
        name: "MongoDB & Atlas",
        difficulty: "intermediate",
        duration: "22 hours",
        rating: 4.7,
        enrolled: 98_700,
        tags: ["aggregation", "indexes", "Atlas Search", "Change Streams", "transactions"],
        description:
          "MongoDB from documents to aggregation pipelines, Atlas Search, and transactional workloads.",
      },
      {
        id: "redis",
        name: "Redis & Caching Patterns",
        difficulty: "intermediate",
        duration: "16 hours",
        rating: 4.8,
        enrolled: 87_400,
        tags: ["data structures", "pub/sub", "streams", "Lua scripting", "clustering"],
        description:
          "Redis deep dive — caching patterns, pub/sub, streams, and distributed locking.",
      },
      {
        id: "sql",
        name: "SQL Mastery",
        difficulty: "beginner",
        duration: "20 hours",
        rating: 4.9,
        enrolled: 278_500,
        tags: ["joins", "window functions", "CTEs", "query optimization", "transactions"],
        description:
          "SQL from basics to advanced — window functions, CTEs, query optimization, and ACID transactions.",
      },
      {
        id: "elasticsearch",
        name: "Elasticsearch & Search",
        difficulty: "intermediate",
        duration: "24 hours",
        rating: 4.7,
        enrolled: 43_600,
        tags: ["full-text search", "aggregations", "mappings", "relevance tuning"],
        description:
          "Build powerful search experiences with Elasticsearch — mappings, analyzers, and relevance tuning.",
      },
      {
        id: "database-design",
        name: "Database Design & Modeling",
        difficulty: "intermediate",
        duration: "18 hours",
        rating: 4.8,
        enrolled: 68_200,
        tags: ["ERD", "normalization", "schema design", "OLAP vs OLTP", "data modeling"],
        description:
          "Design scalable databases — normalization, ERDs, event sourcing, and analytical schemas.",
      },
    ],
  },

  {
    id: "software-engineering",
    name: "Software Engineering",
    icon: "GitBranch",
    color: "from-indigo-500 to-violet-700",
    bgColor: "bg-indigo-500/10 border-indigo-500/20",
    description:
      "Core CS fundamentals, architecture patterns, and engineering best practices.",
    count: 6,
    topics: [
      {
        id: "dsa",
        name: "Data Structures & Algorithms",
        difficulty: "intermediate",
        duration: "60 hours",
        rating: 4.9,
        enrolled: 389_400,
        tags: ["arrays", "trees", "graphs", "DP", "sorting", "interview prep"],
        description:
          "Interview-ready DSA — arrays, trees, graphs, dynamic programming, and problem-solving patterns.",
      },
      {
        id: "system-design",
        name: "System Design",
        difficulty: "advanced",
        duration: "40 hours",
        rating: 4.9,
        enrolled: 214_700,
        tags: ["scalability", "CAP theorem", "load balancing", "caching", "databases"],
        description:
          "Design large-scale systems — URL shorteners to Twitter, with deep dives on trade-offs.",
      },
      {
        id: "design-patterns",
        name: "Design Patterns",
        difficulty: "intermediate",
        duration: "24 hours",
        rating: 4.7,
        enrolled: 134_800,
        tags: ["SOLID", "GoF patterns", "anti-patterns", "refactoring"],
        description:
          "Gang of Four and modern design patterns — when to use them and when to avoid them.",
      },
      {
        id: "clean-code",
        name: "Clean Code & Refactoring",
        difficulty: "intermediate",
        duration: "18 hours",
        rating: 4.8,
        enrolled: 147_300,
        tags: ["code smells", "SOLID", "testing", "DRY", "documentation"],
        description:
          "Write code that's maintainable, readable, and testable — guided by Clean Code principles.",
      },
      {
        id: "testing",
        name: "Testing & TDD",
        difficulty: "intermediate",
        duration: "22 hours",
        rating: 4.8,
        enrolled: 98_400,
        tags: ["unit tests", "integration tests", "TDD", "mocking", "coverage"],
        description:
          "Test-Driven Development in practice — unit, integration, contract, and end-to-end testing.",
      },
      {
        id: "git-advanced",
        name: "Git & Collaboration",
        difficulty: "beginner",
        duration: "12 hours",
        rating: 4.8,
        enrolled: 234_500,
        tags: ["branching strategies", "rebase", "hooks", "code review", "monorepos"],
        description:
          "Advanced Git — branching models, interactive rebase, hooks, and monorepo workflows.",
      },
    ],
  },

  {
    id: "cybersecurity",
    name: "Cybersecurity",
    icon: "Shield",
    color: "from-red-500 to-rose-700",
    bgColor: "bg-red-500/10 border-red-500/20",
    description:
      "Protect systems, networks, and applications from modern threats.",
    count: 5,
    topics: [
      {
        id: "ethical-hacking",
        name: "Ethical Hacking & Penetration Testing",
        difficulty: "advanced",
        duration: "52 hours",
        rating: 4.8,
        enrolled: 78_600,
        tags: ["Kali Linux", "Metasploit", "OWASP", "network scanning", "exploitation"],
        description:
          "Penetration testing methodology — network recon, exploitation, post-exploitation, and reporting.",
      },
      {
        id: "app-security",
        name: "Application Security (AppSec)",
        difficulty: "intermediate",
        duration: "30 hours",
        rating: 4.7,
        enrolled: 54_300,
        tags: ["OWASP Top 10", "XSS", "SQLi", "CSRF", "secure coding", "SAST/DAST"],
        description:
          "Secure your applications — OWASP Top 10, secure coding practices, and automated security testing.",
      },
      {
        id: "cloud-security",
        name: "Cloud Security",
        difficulty: "advanced",
        duration: "28 hours",
        rating: 4.7,
        enrolled: 41_800,
        tags: ["IAM", "secrets management", "network security", "compliance", "Zero Trust"],
        description:
          "Cloud security engineering — IAM least privilege, network isolation, and Zero Trust architectures.",
      },
      {
        id: "cryptography",
        name: "Applied Cryptography",
        difficulty: "advanced",
        duration: "22 hours",
        rating: 4.7,
        enrolled: 28_400,
        tags: ["TLS", "PKI", "hashing", "encryption", "key management"],
        description:
          "Cryptography in practice — symmetric/asymmetric encryption, TLS, PKI, and key management.",
      },
      {
        id: "security-fundamentals",
        name: "Security Fundamentals",
        difficulty: "beginner",
        duration: "16 hours",
        rating: 4.6,
        enrolled: 112_700,
        tags: ["CIA triad", "authentication", "authorization", "security models"],
        description:
          "Core security concepts — CIA triad, authentication, authorization, and threat modeling.",
      },
    ],
  },

  {
    id: "product-management",
    name: "Product & Management",
    icon: "Target",
    color: "from-yellow-500 to-orange-600",
    bgColor: "bg-yellow-500/10 border-yellow-500/20",
    description:
      "Product strategy, agile leadership, and the business of building great software.",
    count: 6,
    topics: [
      {
        id: "product-management",
        name: "Product Management",
        difficulty: "intermediate",
        duration: "32 hours",
        rating: 4.8,
        enrolled: 98_700,
        tags: ["discovery", "roadmapping", "metrics", "stakeholder management", "OKRs"],
        description:
          "PM fundamentals — discovery, roadmapping, prioritization frameworks, and metrics-driven decisions.",
      },
      {
        id: "agile-scrum",
        name: "Agile & Scrum",
        difficulty: "beginner",
        duration: "14 hours",
        rating: 4.7,
        enrolled: 187_400,
        tags: ["Scrum", "Kanban", "SAFe", "sprint planning", "retrospectives"],
        description:
          "Agile in practice — Scrum ceremonies, Kanban flow, estimation, and scaling frameworks.",
      },
      {
        id: "tech-leadership",
        name: "Engineering Leadership",
        difficulty: "advanced",
        duration: "24 hours",
        rating: 4.8,
        enrolled: 44_600,
        tags: ["technical strategy", "team building", "code review culture", "ADRs"],
        description:
          "Grow into engineering leadership — technical strategy, team dynamics, and decision-making.",
      },
      {
        id: "ux-design",
        name: "UX Design for Developers",
        difficulty: "beginner",
        duration: "20 hours",
        rating: 4.7,
        enrolled: 87_200,
        tags: ["user research", "wireframing", "Figma", "accessibility", "usability testing"],
        description:
          "Design thinking for engineers — user research, Figma, design systems, and accessibility.",
      },
      {
        id: "data-driven",
        name: "Data-Driven Product Decisions",
        difficulty: "intermediate",
        duration: "18 hours",
        rating: 4.8,
        enrolled: 56_800,
        tags: ["A/B testing", "analytics", "cohort analysis", "product metrics", "experimentation"],
        description:
          "Make better product decisions with data — A/B testing, funnel analysis, and experimentation.",
      },
      {
        id: "startup-principles",
        name: "Startup Engineering",
        difficulty: "intermediate",
        duration: "16 hours",
        rating: 4.7,
        enrolled: 38_400,
        tags: ["MVP", "technical debt", "scaling", "founder mode", "lean startup"],
        description:
          "Build and scale startups — MVP thinking, technical trade-offs, and rapid iteration.",
      },
    ],
  },
];

/* =============================================================
   2. CAREER PATHS
   ============================================================= */

export const careerPaths: CareerPath[] = [
  {
    id: "fullstack-java",
    title: "Full Stack Java Developer",
    description:
      "Master the complete Java ecosystem — from Spring Boot microservices to React frontends — and land roles at top-tier companies.",
    difficulty: "intermediate",
    duration: "6 months",
    skills: ["Java", "Spring Boot", "React", "PostgreSQL", "Docker", "AWS", "Microservices"],
    color: "from-orange-500 to-amber-600",
    bgColor: "bg-orange-500/10 border-orange-500/20",
    icon: "Code",
    enrolled: 48_600,
    rating: 4.8,
    topics: ["java", "spring-boot", "react", "postgresql", "docker", "aws", "microservices"],
    highlights: [
      "Build production-ready REST APIs with Spring Boot 3",
      "React 19 for dynamic, high-performance frontends",
      "Design normalized PostgreSQL schemas with JPA/Hibernate",
      "Deploy containerized services to AWS ECS/EKS",
      "End-to-end microservices with Kafka event streaming",
    ],
    salaryRange: "$120k – $180k",
  },
  {
    id: "mern-stack",
    title: "MERN Stack Developer",
    description:
      "Build modern full-stack web applications with MongoDB, Express, React, and Node.js — the most in-demand JavaScript stack.",
    difficulty: "intermediate",
    duration: "5 months",
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "MongoDB", "Redis", "Docker"],
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-500/10 border-cyan-500/20",
    icon: "Globe",
    enrolled: 67_300,
    rating: 4.7,
    topics: ["javascript", "typescript", "react", "nodejs", "mongodb", "redis", "docker"],
    highlights: [
      "Server-side rendering and SSG with Next.js App Router",
      "Real-time features with Socket.io and WebSockets",
      "JWT authentication with refresh token rotation",
      "Redis caching for high-performance APIs",
      "CI/CD pipelines with GitHub Actions",
    ],
    salaryRange: "$105k – $165k",
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    description:
      "Build production AI applications — from fine-tuning LLMs to deploying agentic systems that solve real-world problems.",
    difficulty: "advanced",
    duration: "7 months",
    skills: ["Python", "PyTorch", "LLMs", "RAG", "AI Agents", "MLOps", "FastAPI"],
    color: "from-fuchsia-500 to-purple-700",
    bgColor: "bg-fuchsia-500/10 border-fuchsia-500/20",
    icon: "Brain",
    enrolled: 38_900,
    rating: 4.9,
    topics: ["python", "deep-learning", "generative-ai", "rag", "ai-agents", "mlops", "fastapi"],
    highlights: [
      "Build end-to-end RAG pipelines with LangChain & LlamaIndex",
      "Fine-tune and quantize open-source LLMs",
      "Design multi-agent systems with CrewAI and AutoGen",
      "Deploy AI services with FastAPI and model quantization",
      "Monitor LLM applications in production with LangSmith",
    ],
    salaryRange: "$150k – $250k",
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    description:
      "Automate everything — infrastructure, deployments, and observability — to ship software faster and more reliably.",
    difficulty: "intermediate",
    duration: "6 months",
    skills: ["Docker", "Kubernetes", "Terraform", "AWS", "GitHub Actions", "Prometheus", "Python"],
    color: "from-sky-500 to-blue-700",
    bgColor: "bg-sky-500/10 border-sky-500/20",
    icon: "Cloud",
    enrolled: 41_200,
    rating: 4.8,
    topics: ["docker", "kubernetes", "terraform", "aws", "github-actions", "monitoring", "python"],
    highlights: [
      "Multi-stage Docker builds and container security hardening",
      "Production Kubernetes with Helm, RBAC, and GitOps",
      "Multi-cloud IaC with Terraform modules",
      "Full observability with Prometheus, Grafana, and OpenTelemetry",
      "Platform engineering with Internal Developer Platforms",
    ],
    salaryRange: "$125k – $185k",
  },
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    description:
      "Craft pixel-perfect, accessible, and blazing-fast user interfaces that delight millions of users.",
    difficulty: "intermediate",
    duration: "4 months",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Testing", "Web Performance"],
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-500/10 border-pink-500/20",
    icon: "Monitor",
    enrolled: 89_400,
    rating: 4.7,
    topics: ["react", "typescript", "nextjs", "tailwindcss", "testing", "web-performance"],
    highlights: [
      "React 19 Server Components and concurrent rendering",
      "Build a production design system with Storybook",
      "Achieve 100 Lighthouse scores with performance optimization",
      "TypeScript advanced patterns for type-safe UI libraries",
      "Accessibility (WCAG 2.2) and internationalization",
    ],
    salaryRange: "$105k – $160k",
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description:
      "Extract insights from data, build predictive models, and communicate findings that drive business decisions.",
    difficulty: "intermediate",
    duration: "6 months",
    skills: ["Python", "SQL", "Pandas", "Scikit-learn", "PyTorch", "Statistics", "Tableau"],
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
    icon: "BarChart2",
    enrolled: 52_100,
    rating: 4.8,
    topics: ["python", "sql", "ml-fundamentals", "deep-learning", "mlops", "database-design"],
    highlights: [
      "Statistical hypothesis testing and A/B experiment analysis",
      "Feature engineering and selection for production models",
      "Deep learning for tabular, NLP, and time-series data",
      "Build and deploy models with MLflow and FastAPI",
      "Data storytelling and executive dashboards",
    ],
    salaryRange: "$115k – $170k",
  },
  {
    id: "cloud-engineer",
    title: "Cloud Engineer",
    description:
      "Design and operate cloud-native architectures across AWS, GCP, and Azure at enterprise scale.",
    difficulty: "advanced",
    duration: "7 months",
    skills: ["AWS", "GCP", "Terraform", "Kubernetes", "Networking", "Security", "Cost Optimization"],
    color: "from-indigo-500 to-violet-700",
    bgColor: "bg-indigo-500/10 border-indigo-500/20",
    icon: "Layers",
    enrolled: 29_800,
    rating: 4.8,
    topics: ["aws", "gcp", "terraform", "kubernetes", "cloud-security", "monitoring", "site-reliability"],
    highlights: [
      "AWS Solutions Architect Professional-level design patterns",
      "Multi-cloud strategy and workload migration",
      "FinOps — cost optimization and rightsizing workloads",
      "Zero Trust network architecture and cloud WAF",
      "SRE practices — error budgets and reliability automation",
    ],
    salaryRange: "$130k – $200k",
  },
  {
    id: "cybersecurity-engineer",
    title: "Cybersecurity Engineer",
    description:
      "Defend organizations against real-world threats through offensive security thinking and defensive engineering.",
    difficulty: "advanced",
    duration: "8 months",
    skills: ["Penetration Testing", "AppSec", "Cloud Security", "Cryptography", "Python", "SIEM"],
    color: "from-red-500 to-rose-700",
    bgColor: "bg-red-500/10 border-red-500/20",
    icon: "Shield",
    enrolled: 24_600,
    rating: 4.7,
    topics: ["ethical-hacking", "app-security", "cloud-security", "cryptography", "security-fundamentals", "python"],
    highlights: [
      "OSCP-aligned penetration testing methodology",
      "Build a home lab with Kali Linux and vulnerable VMs",
      "Secure SDLC integration with SAST/DAST pipelines",
      "Cloud security posture management (CSPM)",
      "Incident response and digital forensics",
    ],
    salaryRange: "$120k – $190k",
  },
];

/* =============================================================
   3. HOBBY CATEGORIES (for personalized learning context)
   ============================================================= */

export const hobbyCategories: HobbyCategory[] = [
  {
    id: "gaming",
    name: "Gaming",
    icon: "Gamepad2",
    description: "Learn through game-themed projects and challenges",
    example: "Build a 2D game with Python or JavaScript",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "cricket",
    name: "Cricket",
    icon: "Trophy",
    description: "Apply data science to cricket analytics",
    example: "Build a cricket stats dashboard with IPL data",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "music",
    name: "Music",
    icon: "Music",
    description: "Build music-related apps and audio processing",
    example: "Create a chord progression generator with AI",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "movies",
    name: "Movies & Entertainment",
    icon: "Film",
    description: "Build recommendation engines and media apps",
    example: "Movie recommendation system with collaborative filtering",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "fitness",
    name: "Fitness & Health",
    icon: "Dumbbell",
    description: "Track workouts and health metrics with apps",
    example: "Workout tracker with AI-generated plans",
    color: "from-red-500 to-orange-600",
  },
  {
    id: "photography",
    name: "Photography",
    icon: "Camera",
    description: "Image processing, galleries, and computer vision",
    example: "AI photo enhancement and style transfer app",
    color: "from-slate-500 to-gray-700",
  },
  {
    id: "travel",
    name: "Travel",
    icon: "Map",
    description: "Build travel planners and geo-based apps",
    example: "AI travel itinerary planner with maps integration",
    color: "from-cyan-500 to-teal-600",
  },
  {
    id: "cooking",
    name: "Cooking",
    icon: "ChefHat",
    description: "Recipe apps, nutrition trackers, and food AI",
    example: "Ingredient-based recipe generator with LLM",
    color: "from-yellow-500 to-amber-600",
  },
  {
    id: "finance",
    name: "Finance & Investing",
    icon: "DollarSign",
    description: "Personal finance tools and market analysis",
    example: "Stock portfolio tracker with sentiment analysis",
    color: "from-emerald-500 to-green-700",
  },
  {
    id: "entrepreneurship",
    name: "Entrepreneurship",
    icon: "Rocket",
    description: "Build SaaS products and startup MVPs",
    example: "Build a micro-SaaS from idea to first customer",
    color: "from-violet-500 to-purple-700",
  },
];

/* =============================================================
   4. FEATURED LESSONS
   ============================================================= */

export const featuredLessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "Understanding Spring Boot Auto-Configuration",
    duration: "18 min",
    type: "video",
    completed: true,
    locked: false,
    xp: 50,
  },
  {
    id: "lesson-2",
    title: "Building RESTful APIs with Spring MVC",
    duration: "25 min",
    type: "video",
    completed: true,
    locked: false,
    xp: 75,
  },
  {
    id: "lesson-3",
    title: "JPA & Hibernate: Entity Relationships",
    duration: "30 min",
    type: "video",
    completed: false,
    locked: false,
    xp: 100,
  },
  {
    id: "lesson-4",
    title: "Spring Security: JWT Authentication",
    duration: "45 min",
    type: "exercise",
    completed: false,
    locked: false,
    xp: 150,
  },
  {
    id: "lesson-5",
    title: "Microservices Communication Patterns",
    duration: "35 min",
    type: "reading",
    completed: false,
    locked: true,
    xp: 100,
  },
  {
    id: "lesson-6",
    title: "Containerize a Spring Boot App with Docker",
    duration: "40 min",
    type: "project",
    completed: false,
    locked: true,
    xp: 200,
  },
];

/* =============================================================
   5. USER PROGRESS
   ============================================================= */

export const userProgress: UserProgress = {
  name: "Alex Chen",
  email: "alex.chen@example.com",
  avatar: "AC",
  level: 14,
  xp: 8_420,
  xpToNext: 10_000,
  streak: 23,
  coursesCompleted: 7,
  hoursLearned: 148,
  currentPath: "fullstack-java",
  badges: ["fast-learner", "streak-7", "first-project", "code-warrior", "night-owl"],
  rank: "Silver",
  skills: [
    { name: "Java",         level: 72, category: "programming-languages" },
    { name: "Spring Boot",  level: 58, category: "backend" },
    { name: "React",        level: 85, category: "frontend" },
    { name: "TypeScript",   level: 80, category: "programming-languages" },
    { name: "SQL",          level: 65, category: "databases" },
    { name: "Docker",       level: 55, category: "cloud-devops" },
    { name: "AWS",          level: 40, category: "cloud-devops" },
    { name: "Python",       level: 70, category: "programming-languages" },
    { name: "Git",          level: 88, category: "software-engineering" },
    { name: "System Design",level: 45, category: "software-engineering" },
  ],
};

/* =============================================================
   6. DASHBOARD STATS
   ============================================================= */

export const dashboardStats: DashboardStat[] = [
  {
    label: "Learning Streak",
    value: "23 days",
    change: "+5 from last week",
    changePositive: true,
    icon: "Flame",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10 border-orange-500/20",
  },
  {
    label: "Hours Learned",
    value: "148 hrs",
    change: "+12 this week",
    changePositive: true,
    icon: "Clock",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    label: "Courses Completed",
    value: "7",
    change: "+2 this month",
    changePositive: true,
    icon: "GraduationCap",
    color: "text-green-400",
    bgColor: "bg-green-500/10 border-green-500/20",
  },
  {
    label: "XP Points",
    value: "8,420",
    change: "+420 today",
    changePositive: true,
    icon: "Zap",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10 border-purple-500/20",
  },
];
