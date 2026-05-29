import { Injectable, OnApplicationBootstrap, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from '../entities/topic.entity';
import { Lesson } from '../entities/lesson.entity';

const SEED_TOPICS = [
  // ── Programming Languages ────────────────────────────────────────────────────
  { name: 'Java Mastery', slug: 'java', category: 'programming', description: 'Comprehensive Java from core OOP through concurrency, streams, and modern Java 21 features.', difficulty: 'intermediate', durationHours: 40, tags: ['java','oop','jvm','collections','streams'], imageGradient: 'from-orange-500 to-red-600' },
  { name: 'Python for Everyone', slug: 'python', category: 'programming', description: 'From zero to Pythonista — covering syntax, data structures, OOP, and practical applications.', difficulty: 'beginner', durationHours: 28, tags: ['python','scripting','automation','data'], imageGradient: 'from-blue-500 to-cyan-500' },
  { name: 'Modern JavaScript', slug: 'javascript', category: 'programming', description: 'Deep dive into modern JavaScript: closures, prototypes, Promises, generators, and ES2024.', difficulty: 'intermediate', durationHours: 32, tags: ['es2024','async','dom','modules'], imageGradient: 'from-yellow-400 to-orange-500' },
  { name: 'TypeScript Deep Dive', slug: 'typescript', category: 'programming', description: 'Advanced TypeScript patterns — discriminated unions, conditional types, and type-safe APIs.', difficulty: 'intermediate', durationHours: 24, tags: ['types','generics','decorators','utility-types'], imageGradient: 'from-blue-600 to-indigo-600' },
  { name: 'Go Essentials', slug: 'go', category: 'programming', description: 'Build high-performance services with Go — goroutines, interfaces, and idiomatic patterns.', difficulty: 'intermediate', durationHours: 30, tags: ['goroutines','channels','interfaces','microservices'], imageGradient: 'from-cyan-500 to-teal-600' },
  { name: 'Rust Systems Programming', slug: 'rust', category: 'programming', description: 'Memory-safe systems programming with Rust — ownership model, lifetimes, and async Rust.', difficulty: 'advanced', durationHours: 50, tags: ['ownership','borrow-checker','concurrency','wasm'], imageGradient: 'from-orange-600 to-red-700' },

  // ── Frontend ─────────────────────────────────────────────────────────────────
  { name: 'React 19 & Ecosystem', slug: 'react', category: 'frontend', description: 'Master React 19 with concurrent features, Server Components, and the modern ecosystem.', difficulty: 'intermediate', durationHours: 36, tags: ['hooks','context','suspense','rsc','tanstack'], imageGradient: 'from-cyan-400 to-blue-500' },
  { name: 'Next.js App Router', slug: 'nextjs', category: 'frontend', description: 'Production-grade Next.js: App Router, caching strategies, Server Actions, and deployment.', difficulty: 'intermediate', durationHours: 30, tags: ['app-router','rsc','isr','server-actions'], imageGradient: 'from-gray-700 to-gray-900' },
  { name: 'Angular 18 Enterprise', slug: 'angular', category: 'frontend', description: 'Enterprise Angular with signals, standalone components, and scalable state management.', difficulty: 'intermediate', durationHours: 42, tags: ['signals','standalone','rxjs','ngrx'], imageGradient: 'from-red-600 to-rose-700' },
  { name: 'Vue.js 3 Composition API', slug: 'vuejs', category: 'frontend', description: 'Vue 3 from scratch — Composition API, Pinia for state, and Nuxt 3 for full-stack apps.', difficulty: 'beginner', durationHours: 28, tags: ['composition-api','pinia','nuxt3','typescript'], imageGradient: 'from-green-500 to-emerald-600' },
  { name: 'Tailwind CSS Mastery', slug: 'tailwindcss', category: 'frontend', description: 'Build beautiful UIs with Tailwind CSS — design systems, custom components, and animations.', difficulty: 'beginner', durationHours: 16, tags: ['utility-first','design-systems','animations','dark-mode'], imageGradient: 'from-cyan-400 to-sky-500' },

  // ── Backend ──────────────────────────────────────────────────────────────────
  { name: 'Node.js & Express', slug: 'nodejs', category: 'backend', description: 'Build high-throughput Node.js services — REST APIs, streams, and performance tuning.', difficulty: 'intermediate', durationHours: 32, tags: ['rest','express','fastify','event-loop','streams'], imageGradient: 'from-green-600 to-lime-600' },
  { name: 'Spring Boot 3', slug: 'spring-boot', category: 'backend', description: 'Enterprise Java with Spring Boot 3 — security, JPA, reactive programming, and microservices.', difficulty: 'intermediate', durationHours: 44, tags: ['spring-mvc','security','jpa','microservices','reactive'], imageGradient: 'from-green-500 to-emerald-600' },
  { name: 'Django & DRF', slug: 'django', category: 'backend', description: 'Full-stack Python with Django — REST APIs, async views, WebSockets, and background tasks.', difficulty: 'intermediate', durationHours: 34, tags: ['drf','authentication','orm','celery','channels'], imageGradient: 'from-green-700 to-teal-700' },
  { name: 'FastAPI & Async Python', slug: 'fastapi', category: 'backend', description: 'Build blazing-fast APIs with FastAPI — async endpoints, Pydantic v2, and automatic docs.', difficulty: 'intermediate', durationHours: 24, tags: ['async','pydantic','openapi','dependency-injection'], imageGradient: 'from-teal-500 to-green-500' },
  { name: 'Microservices Architecture', slug: 'microservices', category: 'backend', description: 'Design production microservices — DDD, CQRS, event sourcing, and the Saga pattern.', difficulty: 'advanced', durationHours: 40, tags: ['ddd','event-driven','saga','cqrs','service-mesh'], imageGradient: 'from-indigo-500 to-purple-600' },

  // ── Cloud & DevOps ────────────────────────────────────────────────────────────
  { name: 'AWS Solutions Architect', slug: 'aws', category: 'cloud', description: 'Design resilient AWS architectures — compute, storage, networking, serverless, and IaC with CDK.', difficulty: 'intermediate', durationHours: 50, tags: ['ec2','s3','lambda','rds','vpc','cdk'], imageGradient: 'from-orange-400 to-yellow-500' },
  { name: 'Docker & Containerization', slug: 'docker', category: 'devops', description: 'Master Docker from basics to multi-stage builds, Compose stacks, and container security.', difficulty: 'beginner', durationHours: 18, tags: ['dockerfile','compose','networking','volumes','security'], imageGradient: 'from-blue-600 to-indigo-600' },
  { name: 'Kubernetes in Production', slug: 'kubernetes', category: 'devops', description: 'Run production Kubernetes clusters — Helm charts, RBAC, Operators, and GitOps workflows.', difficulty: 'advanced', durationHours: 48, tags: ['pods','helm','operators','rbac','gitops','istio'], imageGradient: 'from-blue-500 to-cyan-600' },
  { name: 'Terraform & IaC', slug: 'terraform', category: 'devops', description: 'Infrastructure as Code with Terraform — modules, remote state, and multi-cloud deployments.', difficulty: 'intermediate', durationHours: 28, tags: ['hcl','modules','state','multi-cloud','terragrunt'], imageGradient: 'from-purple-500 to-indigo-600' },

  // ── AI & Machine Learning ─────────────────────────────────────────────────────
  { name: 'Machine Learning Fundamentals', slug: 'ml-fundamentals', category: 'ai-ml', description: 'Core ML concepts — regression, classification, clustering, model evaluation, and scikit-learn.', difficulty: 'intermediate', durationHours: 38, tags: ['supervised','unsupervised','scikit-learn','feature-engineering'], imageGradient: 'from-purple-500 to-pink-600' },
  { name: 'Generative AI & LLMs', slug: 'generative-ai', category: 'ai-ml', description: 'Understand and harness LLMs — architecture, fine-tuning, embeddings, and multimodal models.', difficulty: 'intermediate', durationHours: 30, tags: ['gpt','fine-tuning','embeddings','multimodal'], imageGradient: 'from-violet-500 to-purple-700' },
  { name: 'RAG Systems & Vector Search', slug: 'rag', category: 'ai-ml', description: 'Build production RAG pipelines — embeddings, vector stores, retrieval strategies, and evaluation.', difficulty: 'intermediate', durationHours: 24, tags: ['embeddings','vector-db','langchain','llamaindex'], imageGradient: 'from-fuchsia-500 to-purple-600' },
  { name: 'AI Agents & Tool Use', slug: 'ai-agents', category: 'ai-ml', description: 'Design autonomous AI agents — ReAct loops, function calling, planning, and multi-agent orchestration.', difficulty: 'advanced', durationHours: 28, tags: ['react','function-calling','multi-agent','autogen'], imageGradient: 'from-pink-500 to-rose-600' },
  { name: 'Advanced Prompt Engineering', slug: 'prompt-engineering', category: 'ai-ml', description: 'Master prompt design — chain-of-thought, few-shot learning, and reliable structured outputs.', difficulty: 'beginner', durationHours: 12, tags: ['chain-of-thought','few-shot','system-prompts','structured-output'], imageGradient: 'from-amber-500 to-orange-600' },

  // ── Databases ─────────────────────────────────────────────────────────────────
  { name: 'PostgreSQL Advanced', slug: 'postgresql', category: 'databases', description: 'Advanced PostgreSQL — query planner, indexing strategies, partitioning, and high availability.', difficulty: 'intermediate', durationHours: 28, tags: ['indexing','query-optimization','partitioning','jsonb'], imageGradient: 'from-blue-700 to-blue-900' },
  { name: 'MongoDB & Atlas', slug: 'mongodb', category: 'databases', description: 'MongoDB from documents to aggregation pipelines, Atlas Search, and transactional workloads.', difficulty: 'intermediate', durationHours: 22, tags: ['aggregation','indexes','atlas-search','transactions'], imageGradient: 'from-green-600 to-teal-600' },

  // ── Software Engineering ──────────────────────────────────────────────────────
  { name: 'Data Structures & Algorithms', slug: 'dsa', category: 'software-engineering', description: 'Interview-ready DSA — arrays, trees, graphs, dynamic programming, and problem-solving patterns.', difficulty: 'intermediate', durationHours: 60, tags: ['arrays','trees','graphs','dp','sorting'], imageGradient: 'from-yellow-500 to-orange-600' },
  { name: 'System Design', slug: 'system-design', category: 'software-engineering', description: 'Design large-scale systems — URL shorteners to Twitter, with deep dives on trade-offs.', difficulty: 'advanced', durationHours: 40, tags: ['scalability','cap-theorem','load-balancing','caching'], imageGradient: 'from-indigo-500 to-purple-600' },

  // ── Mobile ────────────────────────────────────────────────────────────────────
  { name: 'React Native', slug: 'react-native', category: 'mobile', description: 'Build cross-platform mobile apps with React Native — navigation, animations, and native APIs.', difficulty: 'intermediate', durationHours: 36, tags: ['expo','navigation','animations','native-modules'], imageGradient: 'from-cyan-600 to-blue-700' },
  { name: 'Flutter & Dart', slug: 'flutter', category: 'mobile', description: 'Beautiful cross-platform apps with Flutter — custom widgets, BLoC state, and platform channels.', difficulty: 'intermediate', durationHours: 40, tags: ['widgets','state-management','bloc','animations','dart'], imageGradient: 'from-blue-400 to-cyan-500' },
];

const LESSON_TEMPLATES = [
  { titleSuffix: '— Introduction & Core Concepts', type: 'reading', durationMinutes: 20, xpReward: 50, orderIndex: 1 },
  { titleSuffix: '— Deep Dive & Advanced Patterns', type: 'reading', durationMinutes: 35, xpReward: 75, orderIndex: 2 },
  { titleSuffix: '— Hands-on Exercise', type: 'exercise', durationMinutes: 50, xpReward: 100, orderIndex: 3 },
  { titleSuffix: '— Quiz: Test Your Knowledge', type: 'quiz', durationMinutes: 20, xpReward: 50, orderIndex: 4 },
  { titleSuffix: '— Capstone Mini Project', type: 'project', durationMinutes: 60, xpReward: 150, orderIndex: 5 },
];

@Injectable()
export class TopicsService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Topic) private topicRepo: Repository<Topic>,
    @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedMissing();
  }

  async seedMissing() {
    for (const t of SEED_TOPICS) {
      const existing = await this.topicRepo.findOne({ where: { slug: t.slug } });
      if (existing) continue;
      const topicData = { ...t, rating: 4.5 + Math.random() * 0.5, enrolledCount: Math.floor(Math.random() * 5000) + 500 } as any;
      const topic = this.topicRepo.create(topicData as Topic);
      const saved = await this.topicRepo.save(topic) as Topic;
      for (const tmpl of LESSON_TEMPLATES) {
        const lesson = this.lessonRepo.create({
          topicId: saved.id,
          title: `${saved.name} ${tmpl.titleSuffix}`,
          slug: `${saved.slug}-lesson-${tmpl.orderIndex}`,
          orderIndex: tmpl.orderIndex,
          type: tmpl.type as any,
          durationMinutes: tmpl.durationMinutes,
          xpReward: tmpl.xpReward,
        });
        await this.lessonRepo.save(lesson);
      }
    }
  }

  async seed() {
    await this.seedMissing();
  }

  async findAll(query: { category?: string; difficulty?: string; search?: string; page?: number; limit?: number }) {
    const { category, difficulty, search, page = 1, limit = 20 } = query;
    const qb = this.topicRepo.createQueryBuilder('t').where('t.isActive = :a', { a: true });
    if (category && category !== 'all') qb.andWhere('t.category = :c', { c: category });
    if (difficulty) qb.andWhere('t.difficulty = :d', { d: difficulty });
    if (search) qb.andWhere('(t.name ILIKE :s OR t.description ILIKE :s)', { s: `%${search}%` });
    qb.orderBy('t.enrolledCount', 'DESC').skip((page - 1) * limit).take(limit);
    const [data, total] = await qb.getManyAndCount();
    return { data, total, page };
  }

  async findBySlug(slug: string) {
    const topic = await this.topicRepo.findOne({ where: { slug } });
    if (!topic) throw new NotFoundException('Topic not found');
    const lessons = await this.lessonRepo.find({ where: { topicId: topic.id }, order: { orderIndex: 'ASC' } });
    return { ...topic, lessons };
  }

  async getCategories() {
    const rows = await this.topicRepo.createQueryBuilder('t').select('t.category', 'category').addSelect('COUNT(*)', 'count').where('t.isActive = true').groupBy('t.category').getRawMany();
    return rows;
  }
}
