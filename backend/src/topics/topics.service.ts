import { Injectable, OnApplicationBootstrap, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

const LESSON_TEMPLATES = [
  { titleSuffix: '— Introduction & Setup', type: 'reading', durationMinutes: 15, xpReward: 30, orderIndex: 1 },
  { titleSuffix: '— Core Concepts', type: 'reading', durationMinutes: 30, xpReward: 50, orderIndex: 2 },
  { titleSuffix: '— Hands-on Exercise', type: 'exercise', durationMinutes: 45, xpReward: 75, orderIndex: 3 },
  { titleSuffix: '— Quiz: Test Your Knowledge', type: 'quiz', durationMinutes: 20, xpReward: 40, orderIndex: 4 },
  { titleSuffix: '— Mini Project', type: 'project', durationMinutes: 60, xpReward: 100, orderIndex: 5 },
];

@Injectable()
export class TopicsService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Topic) private topicRepo: Repository<Topic>,
    @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.topicRepo.count();
    if (count === 0) await this.seed();
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
