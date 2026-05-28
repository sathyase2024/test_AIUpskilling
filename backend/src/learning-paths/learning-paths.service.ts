import { Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LearningPath } from '../entities/learning-path.entity';

const SEED_PATHS = [
  {
    title: 'Full Stack Java Developer',
    slug: 'fullstack-java',
    description: 'Build enterprise-grade full-stack apps with Java, Spring Boot and React',
    difficulty: 'advanced' as const,
    durationMonths: 7,
    skills: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'REST APIs', 'Docker'],
    techStack: ['Java', 'Spring Boot 3', 'React 19', 'PostgreSQL', 'Docker'],
    rating: 4.8,
    color: 'from-orange-500 to-red-600',
    highlights: ['Build 4 production-ready apps', 'Spring Boot microservices', 'React frontend integration'],
  },
  {
    title: 'MERN Stack',
    slug: 'mern-stack',
    description: 'Become a proficient full-stack JavaScript developer with MongoDB, Express, React and Node',
    difficulty: 'intermediate' as const,
    durationMonths: 5,
    skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    techStack: ['React 19', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    rating: 4.7,
    color: 'from-green-500 to-teal-500',
    highlights: ['Full-stack JS from scratch', '3 real-world projects', 'Auth & deployment'],
  },
  {
    title: 'AI Engineer',
    slug: 'ai-engineer',
    description: 'Go from Python basics to building production LLM-powered applications and AI agents',
    difficulty: 'advanced' as const,
    durationMonths: 8,
    skills: ['Python', 'Machine Learning', 'LLMs', 'RAG', 'Agents', 'MLOps'],
    techStack: ['Python', 'FastAPI', 'LangChain', 'Claude API', 'AWS'],
    rating: 4.9,
    color: 'from-violet-500 to-purple-700',
    highlights: ['Build LLM apps & agents', 'RAG pipelines', 'Deploy to production'],
  },
  {
    title: 'DevOps Engineer',
    slug: 'devops-engineer',
    description: 'Master CI/CD, container orchestration and cloud infrastructure for modern software delivery',
    difficulty: 'advanced' as const,
    durationMonths: 5,
    skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Monitoring'],
    techStack: ['Docker', 'Kubernetes', 'GitHub Actions', 'Terraform', 'AWS'],
    rating: 4.7,
    color: 'from-blue-600 to-indigo-600',
    highlights: ['AWS certifications prep', 'Real infrastructure projects', 'Cost optimisation'],
  },
  {
    title: 'Frontend Engineer',
    slug: 'frontend-engineer',
    description: 'Build stunning, performant user interfaces with React, Next.js and modern CSS',
    difficulty: 'intermediate' as const,
    durationMonths: 4,
    skills: ['HTML/CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Accessibility'],
    techStack: ['React 19', 'Next.js 14', 'TypeScript', 'Tailwind CSS'],
    rating: 4.8,
    color: 'from-cyan-400 to-blue-500',
    highlights: ['5 portfolio projects', 'Performance optimisation', 'Accessibility best practices'],
  },
  {
    title: 'Data Scientist',
    slug: 'data-scientist',
    description: 'Extract insights from data using Python, statistics and machine learning',
    difficulty: 'intermediate' as const,
    durationMonths: 6,
    skills: ['Python', 'Statistics', 'Pandas', 'Machine Learning', 'Data Visualisation', 'SQL'],
    techStack: ['Python', 'scikit-learn', 'Pandas', 'Matplotlib', 'PostgreSQL'],
    rating: 4.7,
    color: 'from-purple-500 to-pink-600',
    highlights: ['Real datasets & Kaggle competitions', 'End-to-end ML pipelines', 'Storytelling with data'],
  },
  {
    title: 'Cloud Engineer',
    slug: 'cloud-engineer',
    description: 'Design and operate scalable cloud systems on AWS with best-in-class security and cost controls',
    difficulty: 'advanced' as const,
    durationMonths: 6,
    skills: ['AWS', 'Cloud Architecture', 'Networking', 'Security', 'Terraform', 'Cost Optimisation'],
    techStack: ['AWS', 'Terraform', 'CloudFormation', 'Docker', 'Lambda'],
    rating: 4.8,
    color: 'from-orange-400 to-yellow-500',
    highlights: ['SAA-C03 certification prep', 'Multi-tier architecture projects', 'FinOps fundamentals'],
  },
  {
    title: 'Cybersecurity Engineer',
    slug: 'cybersecurity-engineer',
    description: 'Protect systems and networks through ethical hacking, threat modelling and secure development',
    difficulty: 'advanced' as const,
    durationMonths: 7,
    skills: ['Penetration Testing', 'OWASP', 'Network Security', 'Cryptography', 'Secure Coding', 'Incident Response'],
    techStack: ['Kali Linux', 'Burp Suite', 'Wireshark', 'Metasploit', 'Python'],
    rating: 4.8,
    color: 'from-red-600 to-rose-700',
    highlights: ['Hands-on CTF challenges', 'OWASP Top 10 deep dive', 'Bug-bounty ready skills'],
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
