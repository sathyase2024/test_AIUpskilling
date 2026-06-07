import {
  Brain,
  Server,
  Cloud,
  Layers,
  Code2,
  BarChart3,
  Shield,
  Smartphone,
  Database,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';

export interface CourseItem {
  slug: string;
  name: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  available: boolean;
}

export interface PathVisualMeta {
  icon: LucideIcon;
  category: string;
  gradient: string;
  headerGradient: string;
  glowColor: string;
  borderGlow: string;
  stackColors: string[];
  courses: CourseItem[];
}

export const PATH_META: Record<string, PathVisualMeta> = {
  'ai-engineer': {
    icon: Brain,
    category: 'AI/ML',
    gradient: 'from-violet-500 to-purple-700',
    headerGradient: 'from-violet-900/80 to-purple-800/60',
    glowColor: 'hover:shadow-violet-500/20',
    borderGlow: 'hover:border-violet-500/50',
    stackColors: [
      'bg-blue-500/20 text-blue-300',
      'bg-green-500/20 text-green-300',
      'bg-teal-500/20 text-teal-300',
      'bg-violet-500/20 text-violet-300',
      'bg-yellow-500/20 text-yellow-300',
    ],
    courses: [
      { slug: 'python-for-ai-ml', name: 'Python for AI/ML', category: 'AI & Machine Learning', difficulty: 'beginner', available: true },
      { slug: 'large-language-models', name: 'Large Language Models', category: 'AI & Machine Learning', difficulty: 'intermediate', available: true },
      { slug: 'retrieval-augmented-generation', name: 'Retrieval-Augmented Generation', category: 'AI & Machine Learning', difficulty: 'intermediate', available: true },
      { slug: 'ai-agents-agentic-workflows', name: 'AI Agents & Agentic Workflows', category: 'AI & Machine Learning', difficulty: 'advanced', available: true },
      { slug: 'mlops-model-deployment', name: 'MLOps & Model Deployment', category: 'AI & Machine Learning', difficulty: 'advanced', available: false },
    ],
  },
  'devops-engineer': {
    icon: Server,
    category: 'DevOps',
    gradient: 'from-blue-600 to-indigo-600',
    headerGradient: 'from-blue-900/80 to-indigo-800/60',
    glowColor: 'hover:shadow-blue-500/20',
    borderGlow: 'hover:border-blue-500/50',
    stackColors: [
      'bg-sky-500/20 text-sky-300',
      'bg-blue-500/20 text-blue-300',
      'bg-purple-500/20 text-purple-300',
      'bg-orange-500/20 text-orange-300',
      'bg-yellow-500/20 text-yellow-300',
    ],
    courses: [
      { slug: 'linux-shell-scripting', name: 'Linux & Shell Scripting', category: 'DevOps', difficulty: 'beginner', available: false },
      { slug: 'docker-containers', name: 'Docker & Containers', category: 'DevOps', difficulty: 'beginner', available: false },
      { slug: 'kubernetes', name: 'Kubernetes', category: 'DevOps', difficulty: 'intermediate', available: false },
      { slug: 'terraform-infrastructure-as-code', name: 'Terraform & Infrastructure as Code', category: 'DevOps', difficulty: 'intermediate', available: false },
      { slug: 'ci-cd-github-actions', name: 'CI/CD with GitHub Actions', category: 'DevOps', difficulty: 'beginner', available: false },
    ],
  },
  'cloud-engineer': {
    icon: Cloud,
    category: 'Cloud',
    gradient: 'from-orange-400 to-yellow-500',
    headerGradient: 'from-orange-900/80 to-yellow-800/60',
    glowColor: 'hover:shadow-orange-500/20',
    borderGlow: 'hover:border-orange-500/50',
    stackColors: [
      'bg-yellow-500/20 text-yellow-300',
      'bg-purple-500/20 text-purple-300',
      'bg-blue-500/20 text-blue-300',
      'bg-orange-500/20 text-orange-300',
      'bg-cyan-500/20 text-cyan-300',
    ],
    courses: [
      { slug: 'aws-core-services', name: 'AWS Core Services', category: 'Cloud', difficulty: 'beginner', available: false },
      { slug: 'aws-solutions-architect', name: 'AWS Solutions Architect', category: 'Cloud', difficulty: 'intermediate', available: false },
      { slug: 'terraform-infrastructure-as-code', name: 'Terraform & Infrastructure as Code', category: 'DevOps', difficulty: 'intermediate', available: false },
      { slug: 'cloud-security', name: 'Cloud Security', category: 'Cloud', difficulty: 'intermediate', available: false },
      { slug: 'serverless-architecture', name: 'Serverless Architecture', category: 'Cloud', difficulty: 'intermediate', available: false },
    ],
  },
  'data-engineer': {
    icon: Database,
    category: 'Data',
    gradient: 'from-teal-500 to-cyan-600',
    headerGradient: 'from-teal-900/80 to-cyan-800/60',
    glowColor: 'hover:shadow-teal-500/20',
    borderGlow: 'hover:border-teal-500/50',
    stackColors: [
      'bg-teal-500/20 text-teal-300',
      'bg-orange-500/20 text-orange-300',
      'bg-blue-500/20 text-blue-300',
      'bg-green-500/20 text-green-300',
      'bg-purple-500/20 text-purple-300',
    ],
    courses: [
      { slug: 'sql-mastery', name: 'SQL Mastery', category: 'Data Engineering', difficulty: 'beginner', available: false },
      { slug: 'apache-kafka-messaging', name: 'Apache Kafka & Messaging', category: 'Backend', difficulty: 'intermediate', available: false },
      { slug: 'apache-spark', name: 'Apache Spark', category: 'Data Engineering', difficulty: 'intermediate', available: false },
      { slug: 'apache-airflow-orchestration', name: 'Apache Airflow & Orchestration', category: 'Data Engineering', difficulty: 'intermediate', available: false },
      { slug: 'dbt-analytics-engineering', name: 'dbt & Analytics Engineering', category: 'Data Engineering', difficulty: 'intermediate', available: false },
    ],
  },
  'fullstack-java': {
    icon: Layers,
    category: 'Full Stack',
    gradient: 'from-orange-500 to-red-600',
    headerGradient: 'from-orange-900/80 to-red-800/60',
    glowColor: 'hover:shadow-orange-500/20',
    borderGlow: 'hover:border-orange-500/50',
    stackColors: [
      'bg-orange-500/20 text-orange-300',
      'bg-green-500/20 text-green-300',
      'bg-cyan-500/20 text-cyan-300',
      'bg-blue-500/20 text-blue-300',
    ],
    courses: [
      { slug: 'java-spring-boot', name: 'Java Spring Boot', category: 'Backend', difficulty: 'intermediate', available: false },
      { slug: 'postgresql-mastery', name: 'PostgreSQL Mastery', category: 'Backend', difficulty: 'intermediate', available: false },
      { slug: 'react-js', name: 'React.js', category: 'Frontend', difficulty: 'beginner', available: false },
      { slug: 'docker-containers', name: 'Docker & Containers', category: 'DevOps', difficulty: 'beginner', available: false },
    ],
  },
  'frontend-engineer': {
    icon: Code2,
    category: 'Frontend',
    gradient: 'from-cyan-400 to-blue-500',
    headerGradient: 'from-cyan-900/80 to-blue-800/60',
    glowColor: 'hover:shadow-cyan-500/20',
    borderGlow: 'hover:border-cyan-500/50',
    stackColors: [
      'bg-blue-500/20 text-blue-300',
      'bg-cyan-500/20 text-cyan-300',
      'bg-black/30 text-white/80',
      'bg-teal-500/20 text-teal-300',
    ],
    courses: [
      { slug: 'typescript', name: 'TypeScript', category: 'Frontend', difficulty: 'beginner', available: false },
      { slug: 'react-js', name: 'React.js', category: 'Frontend', difficulty: 'beginner', available: false },
      { slug: 'next-js', name: 'Next.js', category: 'Frontend', difficulty: 'intermediate', available: false },
      { slug: 'tailwind-css-modern-css', name: 'Tailwind CSS & Modern CSS', category: 'Frontend', difficulty: 'beginner', available: false },
    ],
  },
  'mern-stack': {
    icon: Code2,
    category: 'Full Stack',
    gradient: 'from-green-500 to-teal-500',
    headerGradient: 'from-green-900/80 to-teal-800/60',
    glowColor: 'hover:shadow-green-500/20',
    borderGlow: 'hover:border-green-500/50',
    stackColors: [
      'bg-cyan-500/20 text-cyan-300',
      'bg-lime-500/20 text-lime-300',
      'bg-blue-500/20 text-blue-300',
      'bg-green-500/20 text-green-300',
    ],
    courses: [
      { slug: 'react-js', name: 'React.js', category: 'Frontend', difficulty: 'beginner', available: false },
      { slug: 'nodejs-express', name: 'Node.js & Express', category: 'Backend', difficulty: 'beginner', available: false },
      { slug: 'typescript', name: 'TypeScript', category: 'Frontend', difficulty: 'beginner', available: false },
      { slug: 'mongodb', name: 'MongoDB', category: 'Backend', difficulty: 'beginner', available: false },
    ],
  },
  'data-scientist': {
    icon: BarChart3,
    category: 'AI/ML',
    gradient: 'from-purple-500 to-pink-600',
    headerGradient: 'from-purple-900/80 to-pink-800/60',
    glowColor: 'hover:shadow-purple-500/20',
    borderGlow: 'hover:border-purple-500/50',
    stackColors: [
      'bg-blue-500/20 text-blue-300',
      'bg-green-500/20 text-green-300',
      'bg-orange-500/20 text-orange-300',
      'bg-yellow-500/20 text-yellow-300',
    ],
    courses: [
      { slug: 'python-for-ai-ml', name: 'Python for AI/ML', category: 'AI & Machine Learning', difficulty: 'beginner', available: true },
      { slug: 'sql-mastery', name: 'SQL Mastery', category: 'Data Engineering', difficulty: 'beginner', available: false },
      { slug: 'machine-learning-fundamentals', name: 'Machine Learning Fundamentals', category: 'AI & Machine Learning', difficulty: 'beginner', available: false },
      { slug: 'data-science-with-python', name: 'Data Science with Python', category: 'AI & Machine Learning', difficulty: 'beginner', available: false },
    ],
  },
  'cybersecurity-engineer': {
    icon: Shield,
    category: 'Security',
    gradient: 'from-red-600 to-rose-700',
    headerGradient: 'from-red-900/80 to-rose-800/60',
    glowColor: 'hover:shadow-red-500/20',
    borderGlow: 'hover:border-red-500/50',
    stackColors: [
      'bg-red-500/20 text-red-300',
      'bg-gray-500/20 text-gray-300',
      'bg-orange-500/20 text-orange-300',
      'bg-teal-500/20 text-teal-300',
      'bg-blue-500/20 text-blue-300',
    ],
    courses: [
      { slug: 'linux-shell-scripting', name: 'Linux & Shell Scripting', category: 'DevOps', difficulty: 'beginner', available: false },
      { slug: 'web-app-security-owasp', name: 'Web App Security OWASP', category: 'Security', difficulty: 'intermediate', available: false },
      { slug: 'api-security', name: 'API Security', category: 'Security', difficulty: 'intermediate', available: false },
      { slug: 'cloud-security-fundamentals', name: 'Cloud Security Fundamentals', category: 'Security', difficulty: 'beginner', available: false },
      { slug: 'devsecops', name: 'DevSecOps', category: 'DevOps', difficulty: 'intermediate', available: false },
    ],
  },
  'mobile-developer': {
    icon: Smartphone,
    category: 'Mobile',
    gradient: 'from-pink-500 to-rose-500',
    headerGradient: 'from-pink-900/80 to-rose-800/60',
    glowColor: 'hover:shadow-pink-500/20',
    borderGlow: 'hover:border-pink-500/50',
    stackColors: [
      'bg-cyan-500/20 text-cyan-300',
      'bg-blue-500/20 text-blue-300',
      'bg-purple-500/20 text-purple-300',
      'bg-pink-500/20 text-pink-300',
    ],
    courses: [
      { slug: 'typescript', name: 'TypeScript', category: 'Frontend', difficulty: 'beginner', available: false },
      { slug: 'react-native', name: 'React Native', category: 'Frontend', difficulty: 'intermediate', available: false },
      { slug: 'flutter', name: 'Flutter', category: 'Frontend', difficulty: 'intermediate', available: false },
      { slug: 'api-design-best-practices', name: 'API Design & Best Practices', category: 'System Design', difficulty: 'intermediate', available: false },
    ],
  },
};

export const DEFAULT_PATH_META: Omit<PathVisualMeta, 'courses'> = {
  icon: BookOpen,
  category: 'Other',
  gradient: 'from-purple-600 to-violet-500',
  headerGradient: 'from-purple-900/80 to-violet-800/60',
  glowColor: 'hover:shadow-purple-500/20',
  borderGlow: 'hover:border-purple-500/50',
  stackColors: [
    'bg-purple-500/20 text-purple-300',
    'bg-blue-500/20 text-blue-300',
    'bg-cyan-500/20 text-cyan-300',
  ],
};

export const DIFFICULTY_LABEL: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export const DIFFICULTY_COLOR: Record<string, string> = {
  beginner: 'text-green-400 bg-green-500/10 border-green-500/30',
  intermediate: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  advanced: 'text-red-400 bg-red-500/10 border-red-500/30',
};

export function fmtEnrolled(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
}
