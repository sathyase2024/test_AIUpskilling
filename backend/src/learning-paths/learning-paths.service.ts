import { Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LearningPath } from '../entities/learning-path.entity';
import { Topic } from '../entities/topic.entity';

const SEED_PATHS = [
  {
    title: 'Full-Stack Web Developer',
    slug: 'fullstack-web',
    description: 'Master both frontend and backend development to build complete web applications',
    difficulty: 'intermediate' as const,
    durationMonths: 6,
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'PostgreSQL', 'REST APIs'],
    techStack: ['React', 'NestJS', 'PostgreSQL', 'Docker'],
    rating: 4.8,
    color: 'from-blue-500 to-cyan-500',
    highlights: ['Build 5 real-world projects', 'Deploy to cloud', 'Interview preparation'],
  },
  {
    title: 'AI/ML Engineer',
    slug: 'ai-ml-engineer',
    description: 'Go from Python basics to building production ML models and LLM-powered applications',
    difficulty: 'advanced' as const,
    durationMonths: 8,
    skills: ['Python', 'Machine Learning', 'Deep Learning', 'LLMs', 'MLOps'],
    techStack: ['Python', 'PyTorch', 'FastAPI', 'AWS'],
    rating: 4.9,
    color: 'from-purple-500 to-pink-600',
    highlights: ['Train real ML models', 'Build LLM apps', 'Deploy to production'],
  },
  {
    title: 'Cloud & DevOps Engineer',
    slug: 'cloud-devops',
    description: 'Master cloud infrastructure, CI/CD pipelines and container orchestration',
    difficulty: 'advanced' as const,
    durationMonths: 5,
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
    techStack: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions'],
    rating: 4.7,
    color: 'from-orange-400 to-yellow-500',
    highlights: ['AWS certifications prep', 'Real infrastructure projects', 'Cost optimisation'],
  },
];

@Injectable()
export class LearningPathsService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(LearningPath)
    private pathRepo: Repository<LearningPath>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.pathRepo.count();
    if (count === 0) await this.seed();
  }

  async seed() {
    for (const p of SEED_PATHS) {
      const path = this.pathRepo.create({ ...p, enrolledCount: Math.floor(Math.random() * 3000) + 200 });
      await this.pathRepo.save(path);
    }
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
