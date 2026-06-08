'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import {
  Search,
  Star,
  Clock,
  Users,
  BookOpen,
  Filter,
  X,
  Gamepad2,
  Music,
  Dumbbell,
  Camera,
  TrendingUp,
  Lock,
} from 'lucide-react'

const API_URL = '/api/proxy'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ApiTopicsResponse {
  data: any[]
  total: number
  page: number
}

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'
type Category =
  | 'AI/ML'
  | 'Cloud'
  | 'DevOps'
  | 'Backend'
  | 'Data Engineering'
  | 'Frontend'
  | 'System Design'
  | 'Security'

interface Topic {
  id: number
  slug: string
  name: string
  category: Category
  difficulty: Difficulty
  hours: number
  rating: string
  reviews: number
  enrolled: string
  tags: string[]
  icon: string
  gradient: string
  topBarGradient: string
  description: string
  isNew?: boolean
  isHot?: boolean
  comingSoon: boolean
}

// ─── Gradient helpers ─────────────────────────────────────────────────────────

const TC: Record<string, string> = {
  'gray-700': '#374151', 'gray-900': '#111827',
  'red-500': '#ef4444',  'red-600': '#dc2626',  'red-700': '#b91c1c',
  'rose-400': '#fb7185', 'rose-600': '#e11d48', 'rose-700': '#be123c',
  'orange-400': '#fb923c','orange-500': '#f97316','orange-600': '#ea580c',
  'amber-500': '#f59e0b', 'amber-600': '#d97706',
  'yellow-400': '#facc15','yellow-500': '#eab308','yellow-600': '#ca8a04',
  'lime-600': '#65a30d',
  'green-500': '#22c55e', 'green-600': '#16a34a', 'green-700': '#15803d',
  'emerald-400': '#34d399','emerald-500': '#10b981','emerald-600': '#059669',
  'teal-500': '#14b8a6',  'teal-600': '#0d9488',  'teal-700': '#0f766e',
  'cyan-400': '#22d3ee',  'cyan-500': '#06b6d4',  'cyan-600': '#0891b2',
  'sky-400': '#38bdf8',   'sky-500': '#0ea5e9',   'sky-600': '#0284c7',
  'blue-400': '#60a5fa',  'blue-500': '#3b82f6',  'blue-600': '#2563eb',
  'blue-700': '#1d4ed8',  'blue-900': '#1e3a8a',
  'indigo-500': '#6366f1','indigo-600': '#4f46e5','indigo-700': '#4338ca',
  'violet-500': '#8b5cf6','violet-600': '#7c3aed','violet-700': '#6d28d9',
  'purple-500': '#a855f7','purple-600': '#9333ea','purple-700': '#7e22ce',
  'fuchsia-500': '#d946ef','fuchsia-600': '#c026d3',
  'pink-400': '#f472b6',  'pink-500': '#ec4899',  'pink-600': '#db2777',
}

function gradientBg(cls: string, dir = 'to right'): string {
  const fromKey = cls.match(/from-([a-z]+-\d+)/)?.[1] ?? ''
  const toKey   = cls.match(/\bto-([a-z]+-\d+)/)?.[1] ?? ''
  const from = TC[fromKey] ?? '#7c3aed'
  const to   = TC[toKey]   ?? '#06b6d4'
  return `linear-gradient(${dir}, ${from}, ${to})`
}

// ─── All 39 courses ───────────────────────────────────────────────────────────

const TOPICS: Topic[] = [
  // ── AI & Machine Learning (generated — comingSoon: false) ──────────────────
  {
    id: 1, slug: 'python-for-ai-ml', name: 'Python for AI & ML',
    category: 'AI/ML', difficulty: 'Beginner', hours: 45,
    rating: '4.9', reviews: 2134, enrolled: '18.3K',
    tags: ['Python', 'NumPy', 'Pandas', 'Scikit-learn'],
    icon: 'PY', gradient: 'from-green-500 to-teal-600',
    topBarGradient: 'from-green-500/80 to-teal-600/60',
    description: 'NumPy, pandas, data wrangling and the scientific Python stack for machine learning.',
    comingSoon: false,
  },
  {
    id: 2, slug: 'large-language-models', name: 'Large Language Models',
    category: 'AI/ML', difficulty: 'Advanced', hours: 60,
    rating: '4.9', reviews: 1240, enrolled: '8.5K',
    tags: ['Transformers', 'NLP', 'Fine-tuning', 'GenAI'],
    icon: '🧠', gradient: 'from-violet-500 to-fuchsia-600',
    topBarGradient: 'from-violet-500/80 to-fuchsia-600/60',
    description: 'Transformers, attention, tokenization, fine-tuning and prompting — from fundamentals to production LLMs.',
    isHot: true, comingSoon: false,
  },
  {
    id: 3, slug: 'ai-agents-agentic-workflows', name: 'AI Agents & Agentic Workflows',
    category: 'AI/ML', difficulty: 'Advanced', hours: 50,
    rating: '4.8', reviews: 890, enrolled: '6.2K',
    tags: ['Agents', 'Tool Use', 'ReAct', 'Orchestration'],
    icon: '🤖', gradient: 'from-purple-500 to-indigo-600',
    topBarGradient: 'from-purple-500/80 to-indigo-600/60',
    description: 'Design autonomous agents, tool use, multi-agent coordination and agentic pipelines.',
    isNew: true, comingSoon: false,
  },
  {
    id: 4, slug: 'retrieval-augmented-generation', name: 'Retrieval-Augmented Generation',
    category: 'AI/ML', difficulty: 'Intermediate', hours: 40,
    rating: '4.8', reviews: 743, enrolled: '5.1K',
    tags: ['RAG', 'Embeddings', 'Vector DB', 'LangChain'],
    icon: '🔍', gradient: 'from-cyan-500 to-blue-600',
    topBarGradient: 'from-cyan-500/80 to-blue-600/60',
    description: 'Build RAG pipelines: embeddings, vector stores, chunking, retrieval and grounded generation.',
    isNew: true, comingSoon: false,
  },
  {
    id: 5, slug: 'pytorch-deep-learning', name: 'PyTorch Deep Learning',
    category: 'AI/ML', difficulty: 'Intermediate', hours: 55,
    rating: '4.8', reviews: 1102, enrolled: '7.8K',
    tags: ['PyTorch', 'Neural Networks', 'Autograd', 'CNN'],
    icon: '🔥', gradient: 'from-orange-500 to-red-600',
    topBarGradient: 'from-orange-500/80 to-red-600/60',
    description: 'Tensors, autograd, neural networks and training loops with PyTorch.',
    isHot: true, comingSoon: false,
  },
  {
    id: 6, slug: 'tensorflow-keras', name: 'TensorFlow & Keras',
    category: 'AI/ML', difficulty: 'Intermediate', hours: 50,
    rating: '4.7', reviews: 965, enrolled: '6.9K',
    tags: ['TensorFlow', 'Keras', 'CNNs', 'Transfer Learning'],
    icon: '⚡', gradient: 'from-amber-500 to-orange-600',
    topBarGradient: 'from-amber-500/80 to-orange-600/60',
    description: 'Build, train and deploy neural networks with TensorFlow 2 and the Keras high-level API.',
    comingSoon: false,
  },
  {
    id: 7, slug: 'hugging-face-transformers', name: 'Hugging Face Transformers',
    category: 'AI/ML', difficulty: 'Intermediate', hours: 45,
    rating: '4.8', reviews: 876, enrolled: '5.8K',
    tags: ['Hugging Face', 'BERT', 'GPT', 'Fine-tuning'],
    icon: '🤗', gradient: 'from-yellow-400 to-amber-500',
    topBarGradient: 'from-yellow-400/80 to-amber-500/60',
    description: 'Master the Hugging Face ecosystem — pretrained models, tokenizers, fine-tuning, and the Hub.',
    isNew: true, comingSoon: false,
  },

  // ── AI & Machine Learning (coming soon) ────────────────────────────────────
  {
    id: 8, slug: 'mlops-model-deployment', name: 'MLOps & Model Deployment',
    category: 'AI/ML', difficulty: 'Advanced', hours: 45,
    rating: '4.7', reviews: 0, enrolled: '—',
    tags: ['MLOps', 'Docker', 'CI/CD', 'Monitoring'],
    icon: '🚀', gradient: 'from-rose-600 to-red-700',
    topBarGradient: 'from-rose-600/80 to-red-700/60',
    description: 'Deploy, monitor and maintain ML models in production with CI/CD, containerisation and observability.',
    comingSoon: true,
  },
  {
    id: 9, slug: 'data-science-with-python', name: 'Data Science with Python',
    category: 'AI/ML', difficulty: 'Beginner', hours: 50,
    rating: '4.7', reviews: 0, enrolled: '—',
    tags: ['Pandas', 'Matplotlib', 'Statistics', 'EDA'],
    icon: '📊', gradient: 'from-emerald-500 to-teal-600',
    topBarGradient: 'from-emerald-500/80 to-teal-600/60',
    description: 'Exploratory data analysis, statistical modelling and visualisation with pandas, matplotlib and seaborn.',
    comingSoon: true,
  },
  {
    id: 10, slug: 'machine-learning-fundamentals', name: 'Machine Learning Fundamentals',
    category: 'AI/ML', difficulty: 'Beginner', hours: 40,
    rating: '4.7', reviews: 0, enrolled: '—',
    tags: ['Supervised', 'Unsupervised', 'Scikit-learn', 'Ensemble'],
    icon: '⚙️', gradient: 'from-blue-500 to-indigo-600',
    topBarGradient: 'from-blue-500/80 to-indigo-600/60',
    description: 'Supervised, unsupervised, and ensemble learning — from linear models to gradient boosting.',
    comingSoon: true,
  },

  // ── Cloud ──────────────────────────────────────────────────────────────────
  {
    id: 11, slug: 'aws-core-services', name: 'AWS Core Services',
    category: 'Cloud', difficulty: 'Beginner', hours: 35,
    rating: '4.7', reviews: 0, enrolled: '—',
    tags: ['EC2', 'S3', 'RDS', 'IAM'],
    icon: '☁️', gradient: 'from-orange-400 to-amber-600',
    topBarGradient: 'from-orange-400/80 to-amber-600/60',
    description: 'EC2, S3, RDS, VPC and IAM — the AWS building blocks every cloud developer needs.',
    comingSoon: true,
  },
  {
    id: 12, slug: 'aws-solutions-architect', name: 'AWS Solutions Architect',
    category: 'Cloud', difficulty: 'Intermediate', hours: 50,
    rating: '4.8', reviews: 0, enrolled: '—',
    tags: ['Architecture', 'High Availability', 'SAA-C03', 'AWS'],
    icon: '🏗️', gradient: 'from-orange-500 to-red-600',
    topBarGradient: 'from-orange-500/80 to-red-600/60',
    description: 'Design scalable, resilient AWS architectures with best practices for real-world solutions.',
    comingSoon: true,
  },
  {
    id: 13, slug: 'cloud-security', name: 'Cloud Security',
    category: 'Cloud', difficulty: 'Intermediate', hours: 40,
    rating: '4.7', reviews: 0, enrolled: '—',
    tags: ['IAM', 'Encryption', 'Compliance', 'Zero Trust'],
    icon: '🔒', gradient: 'from-blue-600 to-indigo-700',
    topBarGradient: 'from-blue-600/80 to-indigo-700/60',
    description: 'IAM policies, encryption, network security groups, and compliance in multi-cloud environments.',
    comingSoon: true,
  },
  {
    id: 14, slug: 'serverless-architecture', name: 'Serverless Architecture',
    category: 'Cloud', difficulty: 'Intermediate', hours: 30,
    rating: '4.6', reviews: 0, enrolled: '—',
    tags: ['Lambda', 'API Gateway', 'DynamoDB', 'Event-Driven'],
    icon: 'λ', gradient: 'from-cyan-500 to-sky-600',
    topBarGradient: 'from-cyan-500/80 to-sky-600/60',
    description: 'Lambda, API Gateway, DynamoDB and event-driven patterns for serverless applications.',
    comingSoon: true,
  },

  // ── DevOps ─────────────────────────────────────────────────────────────────
  {
    id: 15, slug: 'docker-containers', name: 'Docker & Containers',
    category: 'DevOps', difficulty: 'Beginner', hours: 30,
    rating: '4.8', reviews: 0, enrolled: '—',
    tags: ['Docker', 'Compose', 'Images', 'Networking'],
    icon: '🐳', gradient: 'from-cyan-400 to-blue-500',
    topBarGradient: 'from-cyan-400/80 to-blue-500/60',
    description: 'Images, containers, volumes, networking, and Docker Compose for local development and production.',
    comingSoon: true,
  },
  {
    id: 16, slug: 'kubernetes', name: 'Kubernetes',
    category: 'DevOps', difficulty: 'Intermediate', hours: 45,
    rating: '4.8', reviews: 0, enrolled: '—',
    tags: ['K8s', 'Pods', 'Helm', 'Ingress'],
    icon: '☸️', gradient: 'from-blue-500 to-indigo-600',
    topBarGradient: 'from-blue-500/80 to-indigo-600/60',
    description: 'Pods, deployments, services, ingress and Helm charts — orchestration for production workloads.',
    comingSoon: true,
  },
  {
    id: 17, slug: 'terraform-infrastructure-as-code', name: 'Terraform & Infrastructure as Code',
    category: 'DevOps', difficulty: 'Intermediate', hours: 40,
    rating: '4.7', reviews: 0, enrolled: '—',
    tags: ['Terraform', 'IaC', 'Modules', 'State'],
    icon: '🏔️', gradient: 'from-violet-600 to-purple-700',
    topBarGradient: 'from-violet-600/80 to-purple-700/60',
    description: 'Provision and manage cloud infrastructure with Terraform modules, state, and CI/CD integration.',
    comingSoon: true,
  },
  {
    id: 18, slug: 'ci-cd-github-actions', name: 'CI/CD with GitHub Actions',
    category: 'DevOps', difficulty: 'Beginner', hours: 25,
    rating: '4.7', reviews: 0, enrolled: '—',
    tags: ['GitHub Actions', 'CI/CD', 'Automation', 'Pipelines'],
    icon: '⚙', gradient: 'from-gray-700 to-gray-900',
    topBarGradient: 'from-gray-700/80 to-gray-900/60',
    description: 'Automate testing, building, and deployment workflows with GitHub Actions from day one.',
    comingSoon: true,
  },
  {
    id: 19, slug: 'linux-shell-scripting', name: 'Linux & Shell Scripting',
    category: 'DevOps', difficulty: 'Beginner', hours: 25,
    rating: '4.6', reviews: 0, enrolled: '—',
    tags: ['Bash', 'Linux', 'Scripting', 'Sysadmin'],
    icon: '🐧', gradient: 'from-green-600 to-teal-700',
    topBarGradient: 'from-green-600/80 to-teal-700/60',
    description: 'Bash scripting, file system, processes, networking and system administration essentials.',
    comingSoon: true,
  },
  {
    id: 20, slug: 'devsecops', name: 'DevSecOps',
    category: 'DevOps', difficulty: 'Intermediate', hours: 35,
    rating: '4.7', reviews: 0, enrolled: '—',
    tags: ['SAST', 'DAST', 'Secrets', 'Security Pipeline'],
    icon: '🛡️', gradient: 'from-red-600 to-rose-700',
    topBarGradient: 'from-red-600/80 to-rose-700/60',
    description: 'Embed security into the DevOps pipeline with static analysis, SAST/DAST, and secrets management.',
    comingSoon: true,
  },

  // ── Backend ────────────────────────────────────────────────────────────────
  {
    id: 21, slug: 'nodejs-express', name: 'Node.js & Express',
    category: 'Backend', difficulty: 'Beginner', hours: 35,
    rating: '4.7', reviews: 0, enrolled: '—',
    tags: ['Node.js', 'Express', 'REST API', 'Async'],
    icon: '🟢', gradient: 'from-green-500 to-emerald-600',
    topBarGradient: 'from-green-500/80 to-emerald-600/60',
    description: 'Build REST APIs and web servers with Node.js, Express, middleware, and async patterns.',
    comingSoon: true,
  },
  {
    id: 22, slug: 'java-spring-boot', name: 'Java Spring Boot',
    category: 'Backend', difficulty: 'Intermediate', hours: 50,
    rating: '4.7', reviews: 0, enrolled: '—',
    tags: ['Spring Boot', 'Java', 'JPA', 'REST'],
    icon: '🍃', gradient: 'from-green-600 to-lime-600',
    topBarGradient: 'from-green-600/80 to-lime-600/60',
    description: 'Enterprise Java development with Spring Boot, Spring Data JPA, and RESTful API design.',
    comingSoon: true,
  },
  {
    id: 23, slug: 'apache-kafka-messaging', name: 'Apache Kafka & Messaging',
    category: 'Backend', difficulty: 'Intermediate', hours: 35,
    rating: '4.7', reviews: 0, enrolled: '—',
    tags: ['Kafka', 'Event Streaming', 'Consumers', 'Producers'],
    icon: '📨', gradient: 'from-red-600 to-rose-700',
    topBarGradient: 'from-red-600/80 to-rose-700/60',
    description: 'Event streaming with Kafka: producers, consumers, topics, partitions and stream processing.',
    comingSoon: true,
  },
  {
    id: 24, slug: 'postgresql-mastery', name: 'PostgreSQL Mastery',
    category: 'Backend', difficulty: 'Intermediate', hours: 40,
    rating: '4.8', reviews: 0, enrolled: '—',
    tags: ['PostgreSQL', 'SQL', 'Indexes', 'Query Optimization'],
    icon: '🐘', gradient: 'from-blue-600 to-indigo-700',
    topBarGradient: 'from-blue-600/80 to-indigo-700/60',
    description: 'Advanced SQL, indexes, query optimisation, transactions and PostgreSQL internals.',
    comingSoon: true,
  },
  {
    id: 25, slug: 'mongodb', name: 'MongoDB',
    category: 'Backend', difficulty: 'Beginner', hours: 30,
    rating: '4.7', reviews: 0, enrolled: '—',
    tags: ['MongoDB', 'NoSQL', 'Aggregation', 'Atlas'],
    icon: '🍃', gradient: 'from-green-500 to-emerald-600',
    topBarGradient: 'from-green-500/80 to-emerald-600/60',
    description: 'Document modelling, CRUD operations, aggregation pipelines, indexes and Atlas for MongoDB.',
    comingSoon: true,
  },

  // ── Data Engineering ───────────────────────────────────────────────────────
  {
    id: 26, slug: 'sql-mastery', name: 'SQL Mastery',
    category: 'Data Engineering', difficulty: 'Beginner', hours: 30,
    rating: '4.8', reviews: 0, enrolled: '—',
    tags: ['SQL', 'Query Optimization', 'Joins', 'Analytics'],
    icon: '🗃️', gradient: 'from-blue-500 to-sky-600',
    topBarGradient: 'from-blue-500/80 to-sky-600/60',
    description: 'Write complex SQL queries, understand execution plans, and optimise database performance.',
    comingSoon: true,
  },
  {
    id: 27, slug: 'apache-spark', name: 'Apache Spark',
    category: 'Data Engineering', difficulty: 'Intermediate', hours: 40,
    rating: '4.7', reviews: 0, enrolled: '—',
    tags: ['Spark', 'PySpark', 'DataFrames', 'MLlib'],
    icon: '✨', gradient: 'from-orange-500 to-red-600',
    topBarGradient: 'from-orange-500/80 to-red-600/60',
    description: 'Distributed data processing with Spark: DataFrames, Spark SQL, and MLlib at scale.',
    comingSoon: true,
  },
  {
    id: 28, slug: 'dbt-analytics-engineering', name: 'dbt & Analytics Engineering',
    category: 'Data Engineering', difficulty: 'Intermediate', hours: 30,
    rating: '4.7', reviews: 0, enrolled: '—',
    tags: ['dbt', 'Analytics Engineering', 'SQL', 'Data Models'],
    icon: '📈', gradient: 'from-rose-500 to-pink-600',
    topBarGradient: 'from-rose-500/80 to-pink-600/60',
    description: 'Transform raw data with dbt, build reliable data models, and document your analytics stack.',
    comingSoon: true,
  },
  {
    id: 29, slug: 'apache-airflow-orchestration', name: 'Apache Airflow & Orchestration',
    category: 'Data Engineering', difficulty: 'Intermediate', hours: 30,
    rating: '4.6', reviews: 0, enrolled: '—',
    tags: ['Airflow', 'DAGs', 'Orchestration', 'Pipelines'],
    icon: '🌊', gradient: 'from-teal-500 to-cyan-600',
    topBarGradient: 'from-teal-500/80 to-cyan-600/60',
    description: 'Orchestrate data pipelines with Airflow DAGs, operators, sensors, and XComs.',
    comingSoon: true,
  },

  // ── Frontend ───────────────────────────────────────────────────────────────
  {
    id: 30, slug: 'react-js', name: 'React.js',
    category: 'Frontend', difficulty: 'Beginner', hours: 40,
    rating: '4.8', reviews: 0, enrolled: '—',
    tags: ['React', 'Hooks', 'JSX', 'State Management'],
    icon: '⚛️', gradient: 'from-cyan-400 to-blue-500',
    topBarGradient: 'from-cyan-400/80 to-blue-500/60',
    description: 'Components, hooks, state management, routing and best practices for modern React applications.',
    comingSoon: true,
  },
  {
    id: 31, slug: 'next-js', name: 'Next.js',
    category: 'Frontend', difficulty: 'Intermediate', hours: 35,
    rating: '4.8', reviews: 0, enrolled: '—',
    tags: ['Next.js', 'App Router', 'SSR', 'Full Stack'],
    icon: 'N', gradient: 'from-gray-700 to-gray-900',
    topBarGradient: 'from-gray-700/80 to-gray-900/60',
    description: 'Full-stack React with Next.js: server components, app router, data fetching and deployment.',
    comingSoon: true,
  },
  {
    id: 32, slug: 'typescript', name: 'TypeScript',
    category: 'Frontend', difficulty: 'Beginner', hours: 30,
    rating: '4.8', reviews: 0, enrolled: '—',
    tags: ['TypeScript', 'Types', 'Generics', 'Interfaces'],
    icon: 'TS', gradient: 'from-blue-500 to-blue-700',
    topBarGradient: 'from-blue-500/80 to-blue-700/60',
    description: 'Type safety, interfaces, generics and advanced TypeScript patterns for scalable applications.',
    comingSoon: true,
  },
  {
    id: 33, slug: 'tailwind-css-modern-css', name: 'Tailwind CSS & Modern CSS',
    category: 'Frontend', difficulty: 'Beginner', hours: 20,
    rating: '4.7', reviews: 0, enrolled: '—',
    tags: ['Tailwind', 'CSS', 'Responsive', 'Design System'],
    icon: '🎨', gradient: 'from-cyan-500 to-teal-600',
    topBarGradient: 'from-cyan-500/80 to-teal-600/60',
    description: 'Utility-first styling, responsive design, dark mode and component patterns with Tailwind CSS.',
    comingSoon: true,
  },
  {
    id: 34, slug: 'react-native', name: 'React Native',
    category: 'Frontend', difficulty: 'Intermediate', hours: 40,
    rating: '4.7', reviews: 0, enrolled: '—',
    tags: ['React Native', 'Expo', 'Mobile', 'Navigation'],
    icon: '📱', gradient: 'from-purple-500 to-blue-600',
    topBarGradient: 'from-purple-500/80 to-blue-600/60',
    description: 'Cross-platform mobile development with React Native, Expo, navigation and native APIs.',
    comingSoon: true,
  },
  {
    id: 35, slug: 'flutter', name: 'Flutter',
    category: 'Frontend', difficulty: 'Intermediate', hours: 40,
    rating: '4.7', reviews: 0, enrolled: '—',
    tags: ['Flutter', 'Dart', 'Widgets', 'State Management'],
    icon: '🦋', gradient: 'from-blue-400 to-cyan-500',
    topBarGradient: 'from-blue-400/80 to-cyan-500/60',
    description: 'Build beautiful cross-platform apps with Flutter, Dart, widgets and state management.',
    comingSoon: true,
  },

  // ── System Design ──────────────────────────────────────────────────────────
  {
    id: 36, slug: 'api-design-best-practices', name: 'API Design & Best Practices',
    category: 'System Design', difficulty: 'Intermediate', hours: 30,
    rating: '4.7', reviews: 0, enrolled: '—',
    tags: ['REST', 'GraphQL', 'OpenAPI', 'OAuth'],
    icon: '🔌', gradient: 'from-violet-500 to-purple-700',
    topBarGradient: 'from-violet-500/80 to-purple-700/60',
    description: 'REST, GraphQL, OpenAPI spec, versioning, auth patterns and developer experience.',
    comingSoon: true,
  },

  // ── Security ───────────────────────────────────────────────────────────────
  {
    id: 37, slug: 'web-app-security-owasp', name: 'Web App Security & OWASP',
    category: 'Security', difficulty: 'Intermediate', hours: 35,
    rating: '4.8', reviews: 0, enrolled: '—',
    tags: ['OWASP Top 10', 'XSS', 'SQLi', 'Penetration Testing'],
    icon: '🔐', gradient: 'from-red-600 to-rose-700',
    topBarGradient: 'from-red-600/80 to-rose-700/60',
    description: 'OWASP Top 10 vulnerabilities, secure coding practices, threat modelling and penetration testing basics.',
    comingSoon: true,
  },
  {
    id: 38, slug: 'api-security', name: 'API Security',
    category: 'Security', difficulty: 'Intermediate', hours: 30,
    rating: '4.7', reviews: 0, enrolled: '—',
    tags: ['OAuth 2.0', 'JWT', 'Rate Limiting', 'API Threats'],
    icon: '🛡️', gradient: 'from-orange-600 to-red-600',
    topBarGradient: 'from-orange-600/80 to-red-600/60',
    description: 'OAuth 2.0, JWT, rate limiting, input validation and API-specific attack vectors.',
    comingSoon: true,
  },
  {
    id: 39, slug: 'cloud-security-fundamentals', name: 'Cloud Security Fundamentals',
    category: 'Security', difficulty: 'Beginner', hours: 25,
    rating: '4.7', reviews: 0, enrolled: '—',
    tags: ['IAM', 'Encryption', 'VPC Security', 'Compliance'],
    icon: '🔑', gradient: 'from-blue-500 to-indigo-700',
    topBarGradient: 'from-blue-500/80 to-indigo-700/60',
    description: 'IAM, encryption at rest/transit, VPC security, compliance frameworks and cloud posture management.',
    comingSoon: true,
  },
]

// ─── API → Topic overlay ──────────────────────────────────────────────────────

const DIFF_MAP: Record<string, Difficulty> = {
  beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced',
}

function fmtEnrolled(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return String(n)
}

function applyApiData(base: Topic, raw: any): Topic {
  const grad = raw.imageGradient ?? base.gradient
  return {
    ...base,
    difficulty: DIFF_MAP[raw.difficulty] ?? base.difficulty,
    hours: raw.durationHours ?? base.hours,
    rating: typeof raw.rating === 'number' ? raw.rating.toFixed(1) : base.rating,
    reviews: raw.reviews ?? Math.floor((raw.enrolledCount ?? 0) / 8),
    enrolled: raw.enrolledCount ? fmtEnrolled(raw.enrolledCount) : base.enrolled,
    gradient: grad,
    description: raw.description ?? base.description,
    comingSoon: false,
  }
}

// ─── Filters config ───────────────────────────────────────────────────────────

const CATEGORIES: string[] = [
  'All',
  'AI/ML',
  'Cloud',
  'DevOps',
  'Backend',
  'Data Engineering',
  'Frontend',
  'System Design',
  'Security',
]

const DIFFICULTY_OPTIONS: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced']

const DURATION_OPTIONS = [
  { label: 'Under 25 hours', min: 0, max: 25 },
  { label: '25–35 hours', min: 25, max: 35 },
  { label: '35–50 hours', min: 35, max: 50 },
  { label: '50+ hours', min: 50, max: Infinity },
]

const HOBBY_OPTIONS = [
  { icon: Gamepad2, label: 'Gaming' },
  { icon: Music, label: 'Music' },
  { icon: Dumbbell, label: 'Fitness' },
  { icon: Camera, label: 'Photography' },
]

// ─── Style helpers ────────────────────────────────────────────────────────────

function difficultyBadgeStyle(d: Difficulty) {
  return d === 'Beginner'
    ? 'text-green-400 bg-green-500/10 border-green-500/30'
    : d === 'Intermediate'
    ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
    : 'text-red-400 bg-red-500/10 border-red-500/30'
}

function categoryBadgeStyle(c: Category) {
  const map: Record<Category, string> = {
    'AI/ML': 'text-purple-300 bg-purple-500/10 border-purple-500/20',
    Cloud: 'text-sky-300 bg-sky-500/10 border-sky-500/20',
    DevOps: 'text-orange-300 bg-orange-500/10 border-orange-500/20',
    Backend: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
    'Data Engineering': 'text-blue-300 bg-blue-500/10 border-blue-500/20',
    Frontend: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
    'System Design': 'text-violet-300 bg-violet-500/10 border-violet-500/20',
    Security: 'text-red-300 bg-red-500/10 border-red-500/20',
  }
  return map[c] ?? 'text-white/60 bg-white/5 border-white/10'
}

// ─── Topic Card ───────────────────────────────────────────────────────────────

function TopicCard({ topic }: { topic: Topic }) {
  const inner = (
    <div
      className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col ${
        topic.comingSoon
          ? 'opacity-65'
          : 'hover:-translate-y-1 hover:scale-[1.02] hover:border-white/25 hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer'
      }`}
    >
      {/* Colored top bar */}
      <div className="h-1.5 w-full" style={{ background: gradientBg(topic.topBarGradient) }} />

      {/* Header graphic */}
      <div
        className="relative h-32 flex items-center justify-center overflow-hidden"
        style={{ background: gradientBg(topic.gradient, 'to bottom right') }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="relative w-16 h-16 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-xl">
          <span className="text-2xl font-bold text-white select-none">{topic.icon}</span>
        </div>

        {/* Badges */}
        {topic.comingSoon && (
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 text-white/60 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
            <Lock className="w-2.5 h-2.5" /> Soon
          </span>
        )}
        {!topic.comingSoon && topic.isHot && (
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-orange-500/90 text-white text-[10px] font-bold uppercase tracking-wide">
            🔥 Hot
          </span>
        )}
        {!topic.comingSoon && topic.isNew && (
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-green-500/90 text-white text-[10px] font-bold uppercase tracking-wide">
            ✨ New
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${categoryBadgeStyle(topic.category)}`}>
            {topic.category}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${difficultyBadgeStyle(topic.difficulty)}`}>
            {topic.difficulty}
          </span>
        </div>

        <h3 className={`font-bold text-base leading-snug transition-colors ${topic.comingSoon ? 'text-white/70' : 'text-white/90 group-hover:text-purple-200'}`}>
          {topic.name}
        </h3>

        <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{topic.description}</p>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-white/50">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {topic.hours}h
          </div>
          {!topic.comingSoon && (
            <>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-white/70">{topic.rating}</span>
                <span className="text-white/30">({topic.reviews.toLocaleString()})</span>
              </div>
              <div className="flex items-center gap-1 ml-auto">
                <Users className="w-3 h-3" />
                {topic.enrolled}
              </div>
            </>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {topic.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 border border-white/10 text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-1">
          {topic.comingSoon ? (
            <div className="block w-full py-2.5 rounded-xl text-white/35 text-sm font-semibold text-center bg-white/5 border border-white/10 cursor-not-allowed select-none">
              Coming Soon
            </div>
          ) : (
            <div
              className="block w-full py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all shadow-md text-center"
              style={{ background: gradientBg(topic.gradient) }}
            >
              Start Learning
            </div>
          )}
        </div>
      </div>
    </div>
  )

  if (topic.comingSoon) return inner

  return (
    <Link href={`/topics/${topic.slug}`} className="block">
      {inner}
    </Link>
  )
}

// ─── Sidebar Filters ──────────────────────────────────────────────────────────

interface SidebarFiltersProps {
  difficultyFilter: Set<Difficulty>
  onDifficultyChange: (d: Difficulty) => void
  categoryFilter: string
  onCategoryChange: (c: string) => void
  selectedDurations: Set<number>
  onDurationChange: (idx: number) => void
  selectedHobbies: Set<string>
  onHobbyChange: (h: string) => void
  onClearAll: () => void
  allTopics: Topic[]
}

function SidebarFilters({
  difficultyFilter,
  onDifficultyChange,
  categoryFilter,
  onCategoryChange,
  selectedDurations,
  onDurationChange,
  selectedHobbies,
  onHobbyChange,
  onClearAll,
  allTopics,
}: SidebarFiltersProps) {
  const hasFilters =
    difficultyFilter.size > 0 ||
    categoryFilter !== 'All' ||
    selectedDurations.size > 0 ||
    selectedHobbies.size > 0

  return (
    <aside className="hidden lg:block w-56 shrink-0 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-purple-400" />
          <h3 className="text-white font-semibold text-sm">Filters</h3>
        </div>
        {hasFilters && (
          <button
            onClick={onClearAll}
            className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Duration */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Duration</p>
        {DURATION_OPTIONS.map((opt, idx) => (
          <label key={opt.label} className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                selectedDurations.has(idx) ? 'bg-purple-500 border-purple-500' : 'border-white/20 group-hover:border-white/40'
              }`}
              onClick={() => onDurationChange(idx)}
            >
              {selectedDurations.has(idx) && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span
              className={`text-sm transition-colors ${selectedDurations.has(idx) ? 'text-white' : 'text-white/50 group-hover:text-white/70'}`}
              onClick={() => onDurationChange(idx)}
            >
              {opt.label}
            </span>
          </label>
        ))}
      </div>

      {/* Difficulty */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Difficulty</p>
        {DIFFICULTY_OPTIONS.map((d) => (
          <label key={d} className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                difficultyFilter.has(d) ? 'bg-purple-500 border-purple-500' : 'border-white/20 group-hover:border-white/40'
              }`}
              onClick={() => onDifficultyChange(d)}
            >
              {difficultyFilter.has(d) && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span
              className={`text-sm transition-colors ${difficultyFilter.has(d) ? 'text-white' : 'text-white/50 group-hover:text-white/70'}`}
              onClick={() => onDifficultyChange(d)}
            >
              {d}
            </span>
            <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full border ${difficultyBadgeStyle(d)}`}>
              {allTopics.filter((t) => t.difficulty === d).length}
            </span>
          </label>
        ))}
      </div>

      {/* Category */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Category</p>
        {CATEGORIES.filter((c) => c !== 'All').map((c) => (
          <button
            key={c}
            onClick={() => onCategoryChange(c)}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-sm transition-all ${
              categoryFilter === c
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            {c}
            <span className="text-xs text-white/30">
              {allTopics.filter((t) => t.category === c).length}
            </span>
          </button>
        ))}
      </div>

      {/* Hobby Personalization */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Personalize by Hobby</p>
        <p className="text-white/30 text-xs mb-3 leading-relaxed">AI tailors examples to your interests</p>
        <div className="grid grid-cols-2 gap-2">
          {HOBBY_OPTIONS.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => onHobbyChange(label)}
              className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                selectedHobbies.has(label)
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                  : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col animate-pulse">
      <div className="h-1.5 w-full bg-white/10" />
      <div className="h-32 bg-white/5" />
      <div className="p-4 flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="h-4 w-20 rounded-full bg-white/10" />
          <div className="h-4 w-16 rounded-full bg-white/10" />
        </div>
        <div className="h-5 w-3/4 rounded bg-white/10" />
        <div className="h-4 w-full rounded bg-white/5" />
        <div className="h-4 w-2/3 rounded bg-white/5" />
        <div className="flex gap-2 mt-1">
          <div className="h-5 w-12 rounded bg-white/10" />
          <div className="h-5 w-12 rounded bg-white/10" />
          <div className="h-5 w-12 rounded bg-white/10" />
        </div>
        <div className="h-9 w-full rounded-xl bg-white/10 mt-auto" />
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TopicsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [difficultyFilter, setDifficultyFilter] = useState<Set<Difficulty>>(new Set())
  const [selectedDurations, setSelectedDurations] = useState<Set<number>>(new Set())
  const [selectedHobbies, setSelectedHobbies] = useState<Set<string>>(new Set())
  const [apiTopicMap, setApiTopicMap] = useState<Map<string, any> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch all available topics once on mount — merge with static TOPICS
  useEffect(() => {
    const controller = new AbortController()
    async function fetchTopics() {
      try {
        const res = await fetch(`${API_URL}/topics`, {
          signal: controller.signal,
          cache: 'no-store',
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json: ApiTopicsResponse = await res.json()
        const map = new Map<string, any>()
        for (const raw of json.data) {
          if (raw.slug) map.set(raw.slug, raw)
        }
        setApiTopicMap(map)
      } catch (err) {
        if ((err as Error).name !== 'AbortError') setApiTopicMap(new Map())
      } finally {
        setIsLoading(false)
      }
    }
    fetchTopics()
    return () => controller.abort()
  }, [])

  // Merge static TOPICS with live API data
  const baseTopics = useMemo<Topic[]>(() => {
    if (!apiTopicMap) return TOPICS
    return TOPICS.map((t) => {
      const raw = apiTopicMap.get(t.slug)
      return raw ? applyApiData(t, raw) : t
    })
  }, [apiTopicMap])

  const availableCount = baseTopics.filter((t) => !t.comingSoon).length

  // Client-side filtering
  const filteredTopics = useMemo(() => {
    return baseTopics.filter((topic) => {
      if (
        searchQuery &&
        !topic.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !topic.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) &&
        !topic.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) return false

      if (activeCategory !== 'All' && topic.category !== activeCategory) return false
      if (difficultyFilter.size > 0 && !difficultyFilter.has(topic.difficulty)) return false

      if (selectedDurations.size > 0) {
        const matches = [...selectedDurations].some((idx) => {
          const opt = DURATION_OPTIONS[idx]
          return topic.hours >= opt.min && topic.hours < opt.max
        })
        if (!matches) return false
      }

      return true
    })
  }, [searchQuery, activeCategory, difficultyFilter, selectedDurations, baseTopics])

  const toggleDifficulty = (d: Difficulty) => {
    setDifficultyFilter((prev) => { const n = new Set(prev); n.has(d) ? n.delete(d) : n.add(d); return n })
  }
  const toggleDuration = (idx: number) => {
    setSelectedDurations((prev) => { const n = new Set(prev); n.has(idx) ? n.delete(idx) : n.add(idx); return n })
  }
  const toggleHobby = (h: string) => {
    setSelectedHobbies((prev) => { const n = new Set(prev); n.has(h) ? n.delete(h) : n.add(h); return n })
  }
  const clearAll = () => {
    setDifficultyFilter(new Set())
    setSelectedDurations(new Set())
    setSelectedHobbies(new Set())
    setActiveCategory('All')
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0f' }}>
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-24 pb-10 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/15 via-transparent to-cyan-900/15 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-5">
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
              {availableCount} courses live · {baseTopics.length} total in catalogue
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
              Explore{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                All Courses
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Browse 39 developer courses across AI, Cloud, DevOps, Backend, Frontend and more.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, tags, or technologies..."
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl pl-12 pr-12 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-all text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Difficulty pills */}
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            {(['All', ...DIFFICULTY_OPTIONS] as string[]).map((pill) => {
              const isActive = pill === 'All' ? difficultyFilter.size === 0 : difficultyFilter.has(pill as Difficulty)
              return (
                <button
                  key={pill}
                  onClick={() => {
                    if (pill === 'All') setDifficultyFilter(new Set())
                    else toggleDifficulty(pill as Difficulty)
                  }}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-500 border-transparent text-white shadow-lg shadow-purple-500/25'
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/20'
                  }`}
                >
                  {pill}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="sticky top-16 z-30 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/25'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                  {cat !== 'All' && (
                    <span className={`ml-1.5 text-[10px] ${isActive ? 'text-white/70' : 'text-white/30'}`}>
                      {baseTopics.filter((t) => t.category === cat).length}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-16">
        <div className="flex gap-8">
          <SidebarFilters
            difficultyFilter={difficultyFilter}
            onDifficultyChange={toggleDifficulty}
            categoryFilter={activeCategory}
            onCategoryChange={setActiveCategory}
            selectedDurations={selectedDurations}
            onDurationChange={toggleDuration}
            selectedHobbies={selectedHobbies}
            onHobbyChange={toggleHobby}
            onClearAll={clearAll}
            allTopics={baseTopics}
          />

          <div className="flex-1 min-w-0">
            {/* Results count + sort */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <p className="text-white/50 text-sm">
                  Showing{' '}
                  <span className="text-white font-semibold">{filteredTopics.length}</span> of{' '}
                  <span className="text-white font-semibold">{baseTopics.length}</span> courses
                </p>
                {(difficultyFilter.size > 0 || activeCategory !== 'All' || selectedDurations.size > 0 || searchQuery) && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20"
                  >
                    <X className="w-3 h-3" />
                    Clear filters
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-white/40 text-sm">Sort by:</span>
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white/70 text-sm focus:outline-none focus:border-white/20 transition-all">
                  <option value="popular">Most Popular</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                  <option value="duration-asc">Shortest First</option>
                </select>
              </div>
            </div>

            {/* Active filter chips */}
            {(difficultyFilter.size > 0 || activeCategory !== 'All' || selectedDurations.size > 0 || selectedHobbies.size > 0) && (
              <div className="flex flex-wrap gap-2 mb-5">
                {activeCategory !== 'All' && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-medium">
                    {activeCategory}
                    <button onClick={() => setActiveCategory('All')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {[...difficultyFilter].map((d) => (
                  <span key={d} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/60 text-xs font-medium">
                    {d}
                    <button onClick={() => toggleDifficulty(d)}><X className="w-3 h-3" /></button>
                  </span>
                ))}
                {[...selectedHobbies].map((h) => (
                  <span key={h} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
                    {h}
                    <button onClick={() => toggleHobby(h)}><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            )}

            {/* Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filteredTopics.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredTopics.map((topic) => (
                  <TopicCard key={topic.id} topic={topic} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-white/20" />
                </div>
                <p className="text-white/50 font-semibold mb-2">No courses found</p>
                <p className="text-white/30 text-sm mb-5">Try adjusting your search or filters.</p>
                <button
                  onClick={clearAll}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {!isLoading && filteredTopics.length > 0 && (
              <p className="mt-10 text-center text-white/20 text-sm">
                {filteredTopics.length === baseTopics.length
                  ? `All ${baseTopics.length} courses shown`
                  : `${filteredTopics.length} of ${baseTopics.length} courses match your filters`}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
