import { Injectable, Logger, OnApplicationBootstrap, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Topic } from '../entities/topic.entity';
import { Lesson } from '../entities/lesson.entity';

const SEED_TOPICS = [
  { name: 'Java Mastery', slug: 'java-mastery', category: 'programming', description: 'Master Java from fundamentals to advanced patterns', difficulty: 'advanced', durationHours: 60, tags: ['java','oop','spring','jvm'], imageGradient: 'from-orange-500 to-red-600' },
  { name: 'Python Fundamentals', slug: 'python-fundamentals', category: 'programming', description: 'Learn Python from scratch with hands-on projects', difficulty: 'beginner', durationHours: 40, tags: ['python','scripting','data'], imageGradient: 'from-blue-500 to-cyan-500' },
  { name: 'React 19', slug: 'react-19', category: 'frontend', description: 'Build modern UIs with React 19 and hooks', difficulty: 'intermediate', durationHours: 50, tags: ['react','jsx','hooks','ui'], imageGradient: 'from-cyan-400 to-blue-500' },
  { name: 'Next.js App Router', slug: 'nextjs-app-router', category: 'frontend', description: 'Full-stack React with Next.js 14+ App Router', difficulty: 'advanced', durationHours: 45, tags: ['nextjs','react','ssr','fullstack'], imageGradient: 'from-gray-700 to-gray-900' },
  { name: 'Spring Boot 3', slug: 'spring-boot-3', category: 'backend', description: 'Enterprise Java with Spring Boot and REST APIs', difficulty: 'advanced', durationHours: 55, tags: ['spring','java','rest','microservices'], imageGradient: 'from-green-500 to-emerald-600' },
  { name: 'FastAPI', slug: 'fastapi', category: 'backend', description: 'High-performance Python APIs with FastAPI', difficulty: 'intermediate', durationHours: 35, tags: ['python','api','async','fastapi'], imageGradient: 'from-teal-500 to-green-500' },
  { name: 'AWS Solutions Architect', slug: 'aws-solutions-architect', category: 'cloud', description: 'Design scalable systems on AWS', difficulty: 'advanced', durationHours: 70, tags: ['aws','cloud','architecture','devops'], imageGradient: 'from-orange-400 to-yellow-500' },
  { name: 'Docker & Kubernetes', slug: 'docker-kubernetes', category: 'devops', description: 'Containerisation and orchestration with Docker and K8s', difficulty: 'intermediate', durationHours: 40, tags: ['docker','kubernetes','containers','devops'], imageGradient: 'from-blue-600 to-indigo-600' },
  { name: 'Machine Learning Fundamentals', slug: 'machine-learning', category: 'ai-ml', description: 'Core ML algorithms and model building with scikit-learn', difficulty: 'intermediate', durationHours: 60, tags: ['ml','python','sklearn','data'], imageGradient: 'from-purple-500 to-pink-600' },
  { name: 'Generative AI & LLMs', slug: 'generative-ai', category: 'ai-ml', description: 'Build LLM-powered apps, RAG pipelines and AI agents', difficulty: 'advanced', durationHours: 50, tags: ['genai','llm','rag','agents','claude'], imageGradient: 'from-violet-500 to-purple-700' },
  { name: 'PostgreSQL Advanced', slug: 'postgresql', category: 'databases', description: 'Advanced SQL, indexing, performance and extensions', difficulty: 'intermediate', durationHours: 35, tags: ['sql','postgres','database','performance'], imageGradient: 'from-blue-700 to-blue-900' },
  { name: 'React Native', slug: 'react-native', category: 'mobile', description: 'Cross-platform mobile apps with React Native', difficulty: 'intermediate', durationHours: 45, tags: ['react-native','mobile','ios','android'], imageGradient: 'from-cyan-600 to-blue-700' },
  { name: 'DSA & Algorithms', slug: 'dsa-algorithms', category: 'software-engineering', description: 'Data structures, algorithms and interview prep', difficulty: 'intermediate', durationHours: 55, tags: ['dsa','algorithms','leetcode','interviews'], imageGradient: 'from-yellow-500 to-orange-600' },
  { name: 'System Design', slug: 'system-design', category: 'software-engineering', description: 'Design scalable distributed systems', difficulty: 'advanced', durationHours: 40, tags: ['design','scalability','distributed','interviews'], imageGradient: 'from-indigo-500 to-purple-600' },
  { name: 'Ethical Hacking', slug: 'ethical-hacking', category: 'cybersecurity', description: 'Penetration testing and security fundamentals', difficulty: 'advanced', durationHours: 50, tags: ['security','hacking','pentest','owasp'], imageGradient: 'from-red-600 to-rose-700' },
];

// ── Pre-generated AI/ML topics ──────────────────────────────────────────────────
// These slugs have rich, pre-generated lesson content stored as JSON on disk
// (one directory per slug under the generated-lessons folder). The folder is
// resolved at runtime — see seedGeneratedLessons(). Metadata below drives the
// Topic record; the lessons (with their contentJson) come from the JSON files.
const GENERATED_TOPIC_META: Record<
  string,
  Omit<typeof SEED_TOPICS[number], 'slug'>
> = {
  'large-language-models': {
    name: 'Large Language Models', category: 'ai-ml',
    description: 'Transformers, attention, tokenization, fine-tuning and prompting — from fundamentals to production LLMs',
    difficulty: 'advanced', durationHours: 60,
    tags: ['llm', 'transformers', 'nlp', 'genai', 'ai'], imageGradient: 'from-violet-500 to-fuchsia-600',
  },
  'ai-agents-agentic-workflows': {
    name: 'AI Agents & Agentic Workflows', category: 'ai-ml',
    description: 'Design autonomous agents, tool use, multi-agent coordination and agentic pipelines',
    difficulty: 'advanced', durationHours: 50,
    tags: ['agents', 'llm', 'tools', 'orchestration', 'ai'], imageGradient: 'from-purple-500 to-indigo-600',
  },
  'retrieval-augmented-generation': {
    name: 'Retrieval-Augmented Generation', category: 'ai-ml',
    description: 'Build RAG pipelines: embeddings, vector stores, chunking, retrieval and grounded generation',
    difficulty: 'advanced', durationHours: 40,
    tags: ['rag', 'embeddings', 'vector-db', 'llm', 'ai'], imageGradient: 'from-cyan-500 to-blue-600',
  },
  'pytorch-deep-learning': {
    name: 'PyTorch Deep Learning', category: 'ai-ml',
    description: 'Tensors, autograd, neural networks and training loops with PyTorch',
    difficulty: 'intermediate', durationHours: 55,
    tags: ['pytorch', 'deep-learning', 'neural-networks', 'python', 'ai'], imageGradient: 'from-orange-500 to-red-600',
  },
  'python-for-ai-ml': {
    name: 'Python for AI & ML', category: 'ai-ml',
    description: 'NumPy, pandas, data wrangling and the scientific Python stack for machine learning',
    difficulty: 'beginner', durationHours: 45,
    tags: ['python', 'numpy', 'pandas', 'data', 'ai'], imageGradient: 'from-green-500 to-teal-600',
  },
};

const LESSON_TYPES = ['video', 'reading', 'exercise', 'quiz', 'project'] as const;

const LESSON_TEMPLATES = [
  { titleSuffix: '— Introduction & Setup', type: 'reading', durationMinutes: 15, xpReward: 30, orderIndex: 1 },
  { titleSuffix: '— Core Concepts', type: 'reading', durationMinutes: 30, xpReward: 50, orderIndex: 2 },
  { titleSuffix: '— Hands-on Exercise', type: 'exercise', durationMinutes: 45, xpReward: 75, orderIndex: 3 },
  { titleSuffix: '— Quiz: Test Your Knowledge', type: 'quiz', durationMinutes: 20, xpReward: 40, orderIndex: 4 },
  { titleSuffix: '— Mini Project', type: 'project', durationMinutes: 60, xpReward: 100, orderIndex: 5 },
];

@Injectable()
export class TopicsService implements OnApplicationBootstrap {
  private readonly logger = new Logger(TopicsService.name);

  constructor(
    @InjectRepository(Topic) private topicRepo: Repository<Topic>,
    @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.topicRepo.count();
    if (count === 0) await this.seed();
    // Idempotent — only inserts slugs that don't already exist.
    await this.seedGeneratedLessons();
  }

  async seed() {
    for (const t of SEED_TOPICS) {
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

  /**
   * Resolve the directory that holds pre-generated lesson JSON.
   * Honours GENERATED_LESSONS_DIR, otherwise tries a few sensible locations
   * (container mount point and the repo root relative to the running process).
   */
  private resolveGeneratedDir(): string | null {
    const candidates = [
      process.env.GENERATED_LESSONS_DIR,
      '/app/generated_lessons',
      path.resolve(process.cwd(), 'generated_lessons'),
      path.resolve(process.cwd(), '..', 'generated_lessons'),
    ].filter(Boolean) as string[];

    for (const dir of candidates) {
      try {
        if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) return dir;
      } catch {
        // ignore and keep looking
      }
    }
    return null;
  }

  /**
   * Seed topics whose lessons have rich, pre-generated content stored as JSON.
   * Each slug in GENERATED_TOPIC_META maps to a directory of lesson_*.json files.
   * Safe to call repeatedly: slugs that already exist are skipped.
   */
  async seedGeneratedLessons() {
    const baseDir = this.resolveGeneratedDir();
    if (!baseDir) {
      this.logger.warn(
        'No generated_lessons directory found — skipping pre-generated lesson seeding. ' +
          'Set GENERATED_LESSONS_DIR or mount the folder to enable it.',
      );
      return;
    }

    let seeded = 0;
    for (const [slug, meta] of Object.entries(GENERATED_TOPIC_META)) {
      const existing = await this.topicRepo.findOne({ where: { slug } });
      if (existing) continue;

      const dir = path.join(baseDir, slug);
      if (!fs.existsSync(dir)) {
        this.logger.warn(`Generated content for "${slug}" not found at ${dir} — skipping`);
        continue;
      }

      const lessonFiles = fs
        .readdirSync(dir)
        .filter((f) => f.startsWith('lesson_') && f.endsWith('.json'))
        .sort();
      if (lessonFiles.length === 0) {
        this.logger.warn(`No lesson files for "${slug}" in ${dir} — skipping`);
        continue;
      }

      const topic = (await this.topicRepo.save(
        this.topicRepo.create({
          ...meta,
          slug,
          rating: 4.7 + Math.random() * 0.3,
          enrolledCount: Math.floor(Math.random() * 5000) + 500,
        } as Topic),
      )) as Topic;

      let order = 1;
      for (const file of lessonFiles) {
        let contentJson: Record<string, any>;
        try {
          contentJson = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8'));
        } catch (err: any) {
          this.logger.error(`Failed to parse ${file}: ${err.message}`);
          continue;
        }

        const rawType = String(contentJson.type ?? 'reading');
        const type = (LESSON_TYPES as readonly string[]).includes(rawType) ? rawType : 'reading';
        const title = String(contentJson.title ?? `Lesson ${order}`);

        await this.lessonRepo.save(
          this.lessonRepo.create({
            topicId: topic.id,
            title,
            slug: `${slug}-lesson-${order}`,
            orderIndex: order,
            type: type as Lesson['type'],
            durationMinutes: Number(contentJson.estimatedMinutes) || 30,
            xpReward: Number(contentJson.xpReward) || 50,
            content: JSON.stringify(contentJson),
            contentJson,
            isGenerated: true,
          }),
        );
        order++;
      }

      seeded++;
      this.logger.log(`Seeded generated topic "${slug}" with ${order - 1} lessons`);
    }

    if (seeded > 0) this.logger.log(`✅ Seeded ${seeded} pre-generated topic(s)`);
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
