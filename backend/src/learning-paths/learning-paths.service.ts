import { Injectable, NotFoundException, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { LearningPath } from '../entities/learning-path.entity';
import { Topic } from '../entities/topic.entity';

// Maps course-catalogue slugs → existing topic slugs in the DB.
// Topics that haven't been generated yet are absent and silently skipped.
const COURSE_TO_TOPIC: Record<string, string> = {
  'python-for-ai-ml': 'python-for-ai-ml',
  'large-language-models': 'large-language-models',
  'retrieval-augmented-generation': 'retrieval-augmented-generation',
  'ai-agents-agentic-workflows': 'ai-agents-agentic-workflows',
  'docker-containers': 'docker',
  'kubernetes': 'kubernetes',
  'terraform-infrastructure-as-code': 'terraform',
  'aws-solutions-architect': 'aws',
  'java-spring-boot': 'spring-boot',
  'postgresql-mastery': 'postgresql',
  'react-js': 'react',
  'next-js': 'nextjs',
  'tailwind-css-modern-css': 'tailwindcss',
  'nodejs-express': 'nodejs',
  'typescript': 'typescript',
  'machine-learning-fundamentals': 'ml-fundamentals',
  'react-native': 'react-native',
  'flutter': 'flutter',
  'mongodb': 'mongodb',
};

function resolveTopicSlugs(courseSlugs: string[]): string[] {
  return [...new Set(courseSlugs.map((s) => COURSE_TO_TOPIC[s]).filter(Boolean))];
}

const SEED_PATHS: Array<{
  title: string;
  slug: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMonths: number;
  skills: string[];
  techStack: string[];
  rating: number;
  color: string;
  highlights: string[];
  courseSlugs: string[];
}> = [
  {
    title: 'AI Engineer',
    slug: 'ai-engineer',
    description: 'Go from Python basics to building production LLM-powered applications and AI agents',
    difficulty: 'advanced',
    durationMonths: 8,
    skills: ['Python', 'Machine Learning', 'LLMs', 'RAG', 'Agents', 'MLOps'],
    techStack: ['Python', 'FastAPI', 'LangChain', 'Claude API', 'AWS'],
    rating: 4.9,
    color: 'from-violet-500 to-purple-700',
    highlights: ['Build LLM apps & agents', 'RAG pipelines', 'Deploy to production'],
    courseSlugs: [
      'python-for-ai-ml',
      'large-language-models',
      'retrieval-augmented-generation',
      'ai-agents-agentic-workflows',
      'mlops-model-deployment',
    ],
  },
  {
    title: 'DevOps Engineer',
    slug: 'devops-engineer',
    description: 'Master CI/CD, container orchestration and cloud infrastructure for modern software delivery',
    difficulty: 'advanced',
    durationMonths: 5,
    skills: ['Linux', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Monitoring'],
    techStack: ['Docker', 'Kubernetes', 'GitHub Actions', 'Terraform', 'AWS'],
    rating: 4.7,
    color: 'from-blue-600 to-indigo-600',
    highlights: ['AWS certifications prep', 'Real infrastructure projects', 'Cost optimisation'],
    courseSlugs: [
      'linux-shell-scripting',
      'docker-containers',
      'kubernetes',
      'terraform-infrastructure-as-code',
      'ci-cd-github-actions',
    ],
  },
  {
    title: 'Cloud Engineer',
    slug: 'cloud-engineer',
    description: 'Design and operate scalable cloud systems on AWS with best-in-class security and cost controls',
    difficulty: 'advanced',
    durationMonths: 6,
    skills: ['AWS', 'Cloud Architecture', 'Networking', 'Security', 'Terraform', 'Serverless'],
    techStack: ['AWS', 'Terraform', 'CloudFormation', 'Lambda', 'S3'],
    rating: 4.8,
    color: 'from-orange-400 to-yellow-500',
    highlights: ['SAA-C03 certification prep', 'Multi-tier architecture projects', 'FinOps fundamentals'],
    courseSlugs: [
      'aws-core-services',
      'aws-solutions-architect',
      'terraform-infrastructure-as-code',
      'cloud-security',
      'serverless-architecture',
    ],
  },
  {
    title: 'Data Engineer',
    slug: 'data-engineer',
    description: 'Build robust data pipelines, warehouses and streaming platforms that power analytics at scale',
    difficulty: 'advanced',
    durationMonths: 6,
    skills: ['SQL', 'Apache Spark', 'Kafka', 'Airflow', 'dbt', 'Data Warehousing'],
    techStack: ['Apache Spark', 'Kafka', 'Airflow', 'dbt', 'Snowflake'],
    rating: 4.8,
    color: 'from-teal-500 to-cyan-600',
    highlights: ['End-to-end pipeline projects', 'Real-time & batch processing', 'Cloud warehouse design'],
    courseSlugs: [
      'sql-mastery',
      'apache-kafka-messaging',
      'apache-spark',
      'apache-airflow-orchestration',
      'dbt-analytics-engineering',
    ],
  },
  {
    title: 'Full Stack Java Developer',
    slug: 'fullstack-java',
    description: 'Build enterprise-grade full-stack apps with Java, Spring Boot and React',
    difficulty: 'advanced',
    durationMonths: 7,
    skills: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'REST APIs', 'Docker'],
    techStack: ['Java', 'Spring Boot 3', 'React 19', 'PostgreSQL', 'Docker'],
    rating: 4.8,
    color: 'from-orange-500 to-red-600',
    highlights: ['Build 4 production-ready apps', 'Spring Boot microservices', 'React frontend integration'],
    courseSlugs: ['java-spring-boot', 'postgresql-mastery', 'react-js', 'docker-containers'],
  },
  {
    title: 'Frontend Engineer',
    slug: 'frontend-engineer',
    description: 'Build stunning, performant user interfaces with React, Next.js and modern CSS',
    difficulty: 'intermediate',
    durationMonths: 4,
    skills: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Performance', 'Accessibility'],
    techStack: ['React 19', 'Next.js 14', 'TypeScript', 'Tailwind CSS'],
    rating: 4.8,
    color: 'from-cyan-400 to-blue-500',
    highlights: ['5 portfolio projects', 'Performance optimisation', 'Accessibility best practices'],
    courseSlugs: ['typescript', 'react-js', 'next-js', 'tailwind-css-modern-css'],
  },
  {
    title: 'MERN Stack',
    slug: 'mern-stack',
    description: 'Become a proficient full-stack JavaScript developer with MongoDB, Express, React and Node',
    difficulty: 'intermediate',
    durationMonths: 5,
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'MongoDB'],
    techStack: ['React 19', 'Node.js', 'Express', 'MongoDB', 'TypeScript'],
    rating: 4.7,
    color: 'from-green-500 to-teal-500',
    highlights: ['Full-stack JS from scratch', '3 real-world projects', 'Auth & deployment'],
    courseSlugs: ['react-js', 'nodejs-express', 'typescript', 'mongodb'],
  },
  {
    title: 'Data Scientist',
    slug: 'data-scientist',
    description: 'Extract insights from data using Python, statistics and machine learning',
    difficulty: 'intermediate',
    durationMonths: 6,
    skills: ['Python', 'Statistics', 'Pandas', 'Machine Learning', 'Data Visualisation', 'SQL'],
    techStack: ['Python', 'scikit-learn', 'Pandas', 'Matplotlib', 'SQL'],
    rating: 4.7,
    color: 'from-purple-500 to-pink-600',
    highlights: ['Real datasets & Kaggle competitions', 'End-to-end ML pipelines', 'Storytelling with data'],
    courseSlugs: ['python-for-ai-ml', 'sql-mastery', 'machine-learning-fundamentals', 'data-science-with-python'],
  },
  {
    title: 'Web & Cloud Security Engineer',
    slug: 'cybersecurity-engineer',
    description: 'Secure web applications and cloud infrastructure through OWASP hardening and DevSecOps practices',
    difficulty: 'advanced',
    durationMonths: 6,
    skills: ['Linux', 'OWASP Top 10', 'API Security', 'Cloud Security', 'DevSecOps', 'Threat Modelling'],
    techStack: ['Burp Suite', 'OWASP ZAP', 'AWS Security Hub', 'GitHub Actions', 'Terraform'],
    rating: 4.8,
    color: 'from-red-600 to-rose-700',
    highlights: ['Hands-on CTF challenges', 'OWASP Top 10 deep dive', 'Bug-bounty ready skills'],
    courseSlugs: [
      'linux-shell-scripting',
      'web-app-security-owasp',
      'api-security',
      'cloud-security-fundamentals',
      'devsecops',
    ],
  },
  {
    title: 'Mobile Developer',
    slug: 'mobile-developer',
    description: 'Build beautiful cross-platform iOS and Android apps with React Native and Flutter',
    difficulty: 'intermediate',
    durationMonths: 5,
    skills: ['TypeScript', 'React Native', 'Flutter', 'Dart', 'REST APIs', 'App Store Deployment'],
    techStack: ['React Native', 'Flutter', 'TypeScript', 'Expo', 'Dart'],
    rating: 4.7,
    color: 'from-pink-500 to-rose-500',
    highlights: ['Publish to App Store & Play Store', 'Native API integration', 'Smooth animations'],
    courseSlugs: ['typescript', 'react-native', 'flutter', 'api-design-best-practices'],
  },
];

@Injectable()
export class LearningPathsService implements OnApplicationBootstrap {
  private readonly logger = new Logger(LearningPathsService.name);

  constructor(
    @InjectRepository(LearningPath)
    private pathRepo: Repository<LearningPath>,
    @InjectRepository(Topic)
    private topicRepo: Repository<Topic>,
  ) {}

  async onApplicationBootstrap() {
    await this.upsertPaths();
  }

  async upsertPaths() {
    let created = 0;
    let updated = 0;

    for (const p of SEED_PATHS) {
      const { courseSlugs, ...pathData } = p;
      const topicSlugs = resolveTopicSlugs(courseSlugs);

      const topics = topicSlugs.length
        ? await this.topicRepo.find({ where: { slug: In(topicSlugs) } })
        : [];

      const existing = await this.pathRepo.findOne({
        where: { slug: p.slug },
        relations: { topics: true },
      });

      if (existing) {
        await this.pathRepo.save({ ...existing, ...pathData, topics });
        updated++;
      } else {
        const path = this.pathRepo.create({
          ...pathData,
          enrolledCount: Math.floor(Math.random() * 3000) + 200,
          topics,
        });
        await this.pathRepo.save(path);
        created++;
      }
    }

    if (created > 0) this.logger.log(`✅ Created ${created} learning path(s)`);
    if (updated > 0) this.logger.log(`✅ Updated ${updated} learning path(s)`);
  }

  async findAll(): Promise<LearningPath[]> {
    return this.pathRepo.find({ where: { isActive: true }, order: { enrolledCount: 'DESC' } });
  }

  async findBySlug(slug: string): Promise<LearningPath> {
    const path = await this.pathRepo.findOne({ where: { slug }, relations: { topics: true } });
    if (!path) throw new NotFoundException('Learning path not found');
    return path;
  }

  async findById(id: string): Promise<LearningPath> {
    const path = await this.pathRepo.findOne({ where: { id }, relations: { topics: true } });
    if (!path) throw new NotFoundException('Learning path not found');
    return path;
  }
}
