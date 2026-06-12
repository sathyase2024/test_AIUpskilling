"""
SkillForge — Course Catalogue PDF Generator
Produces a detailed PDF of all 39 planned courses and their lessons.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm, cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable, KeepTogether
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from datetime import date

# ── Colour palette ────────────────────────────────────────────────────────────
DARK_BG    = colors.HexColor('#0f0f1a')
PURPLE     = colors.HexColor('#a855f7')
PURPLE_LT  = colors.HexColor('#d8b4fe')
CYAN       = colors.HexColor('#22d3ee')
GREEN      = colors.HexColor('#22c55e')
ORANGE     = colors.HexColor('#f97316')
SLATE      = colors.HexColor('#334155')
SLATE_LT   = colors.HexColor('#64748b')
WHITE      = colors.white
LIGHT_BG   = colors.HexColor('#f8fafc')
CARD_BG    = colors.HexColor('#f1f5f9')
BORDER     = colors.HexColor('#e2e8f0')

CAT_COLORS = {
    'programming':        colors.HexColor('#f97316'),
    'frontend':           colors.HexColor('#06b6d4'),
    'backend':            colors.HexColor('#22c55e'),
    'cloud':              colors.HexColor('#f59e0b'),
    'devops':             colors.HexColor('#6366f1'),
    'ai-ml':              colors.HexColor('#a855f7'),
    'databases':          colors.HexColor('#3b82f6'),
    'software-engineering': colors.HexColor('#ec4899'),
    'mobile':             colors.HexColor('#14b8a6'),
}

DIFF_COLORS = {
    'beginner':     colors.HexColor('#22c55e'),
    'intermediate': colors.HexColor('#f59e0b'),
    'advanced':     colors.HexColor('#ef4444'),
}

TYPE_LABELS = {
    'reading':         '📖 Reading',
    'exercise':        '🛠 Exercise',
    'quiz':            '❓ Quiz',
    'project':         '🏗 Project',
    'hands-on exercise': '🛠 Exercise',
    'hands-on-exercise': '🛠 Exercise',
    'capstone_project':  '🏗 Project',
    'capstone':          '🏗 Project',
    'deep_learning':     '📖 Reading',
    'lesson':            '📖 Reading',
}

STUB_LESSONS = [
    ('reading',  'Introduction & Core Concepts',    20,  50),
    ('reading',  'Deep Dive & Advanced Patterns',   35,  75),
    ('exercise', 'Hands-on Exercise',               50, 100),
    ('quiz',     'Quiz: Test Your Knowledge',        20,  50),
    ('project',  'Capstone Mini Project',           60, 150),
]

# ── Course data ───────────────────────────────────────────────────────────────

GENERATED = {
    'python-for-ai-ml': {
        'lessons': [
            ('reading','Introduction to Python and AI/ML Fundamentals',30,75),
            ('reading','Python Basics: Variables, Data Types, and Operations',30,75),
            ('reading','Control Flow: Conditionals and Loops',30,75),
            ('reading','Functions and Modules in Python',30,75),
            ('reading','Working with Lists, Tuples, and Dictionaries',30,75),
            ('reading','File Handling and Input/Output Operations',30,75),
            ('reading','Object-Oriented Programming Fundamentals',35,75),
            ('reading','Exception Handling and Debugging',30,75),
            ('reading','NumPy: Creating and Manipulating Arrays',35,75),
            ('exercise','Foundation Concepts Review and Practice',50,100),
            ('reading','Pandas: Data Structures and Loading Data',35,75),
            ('reading','Exploratory Data Analysis with Pandas',35,75),
            ('reading','Data Cleaning and Preprocessing Techniques',35,75),
            ('reading','Feature Engineering and Selection',35,75),
            ('reading','Statistical Analysis and Hypothesis Testing',35,75),
            ('reading','Data Visualization with Matplotlib and Seaborn',35,75),
            ('reading','Introduction to Scikit-Learn and Model Building',35,75),
            ('exercise','Core Skills Assessment and Practice',50,100),
            ('reading','Supervised Learning: Regression Models',35,75),
            ('project','End-to-End Machine Learning Project: House Price Prediction',60,150),
            ('reading','Supervised Learning: Classification Models',35,75),
            ('reading','Model Evaluation Metrics and Cross-Validation',35,75),
            ('reading','Hyperparameter Tuning and Grid Search',35,75),
            ('reading','Ensemble Methods: Bagging and Boosting',35,75),
            ('exercise','Intermediate Machine Learning Practice',50,100),
            ('reading','Unsupervised Learning: Clustering Algorithms',35,75),
            ('reading','Dimensionality Reduction Techniques',35,75),
            ('reading','Introduction to Neural Networks and Deep Learning',35,75),
            ('reading','Building Neural Networks with TensorFlow and Keras',35,75),
            ('exercise','Advanced Topics Assessment and Practice',50,100),
            ('reading','Convolutional Neural Networks for Image Processing',35,75),
            ('reading','Recurrent Neural Networks and Sequence Modeling',35,75),
            ('reading','Natural Language Processing with Python',35,75),
            ('reading','Model Deployment and Production Considerations',35,75),
            ('project','Comprehensive AI/ML Capstone Project',60,150),
        ]
    },
    'pytorch-deep-learning': {
        'lessons': [
            ('reading','Introduction to PyTorch and the Deep Learning Ecosystem',30,75),
            ('reading','Tensors: Creation, Operations, and GPU Acceleration',35,75),
            ('reading','Autograd and Automatic Differentiation',35,75),
            ('reading','Building Neural Networks with nn.Module',35,75),
            ('reading','Loss Functions and Optimizers',30,75),
            ('reading','Training and Validation Loops',35,75),
            ('reading','Data Loading with Dataset and DataLoader',35,75),
            ('reading','Transfer Learning with Pretrained Models',35,75),
            ('reading','Convolutional Neural Networks (CNNs)',35,75),
            ('exercise','Foundational Skills Exercise',50,100),
            ('reading','Recurrent Neural Networks and LSTMs',35,75),
            ('reading','Attention Mechanisms and Transformers in PyTorch',35,75),
            ('reading','Custom Loss Functions and Metrics',35,75),
            ('reading','Regularization: Dropout, Batch Norm, Weight Decay',35,75),
            ('reading','Learning Rate Scheduling and Warm-Up Strategies',35,75),
            ('reading','Mixed Precision Training with torch.cuda.amp',35,75),
            ('reading','Distributed Training with DistributedDataParallel',35,75),
            ('exercise','Intermediate Skills Checkpoint',50,100),
            ('reading','PyTorch Lightning for Clean Training Code',35,75),
            ('project','End-to-End Project: Image Classification Pipeline',60,150),
            ('reading','Object Detection with PyTorch',35,75),
            ('reading','Semantic Segmentation Models',35,75),
            ('reading','Time Series Forecasting with PyTorch',35,75),
            ('reading','Generative Adversarial Networks (GANs)',35,75),
            ('exercise','Advanced Techniques Exercise',50,100),
            ('reading','Variational Autoencoders (VAEs)',35,75),
            ('reading','Model Pruning and Quantization',35,75),
            ('reading','TorchScript and Model Export',35,75),
            ('reading','ONNX Export and Cross-Platform Deployment',35,75),
            ('exercise','Optimization Exercise: Latency and Throughput',50,100),
            ('reading','PyTorch Mobile and Edge Deployment',35,75),
            ('reading','Custom CUDA Extensions',35,75),
            ('reading','Debugging and Profiling PyTorch Models',35,75),
            ('reading','Testing Neural Networks Effectively',35,75),
            ('project','Capstone: Production Deep Learning System',60,150),
        ]
    },
    'tensorflow-keras': {
        'lessons': [
            ('reading','Introduction to TensorFlow and Keras Ecosystem',30,75),
            ('reading','Understanding Tensors and Data Structures',30,75),
            ('reading','Setting Up Your TensorFlow Development Environment',20,50),
            ('reading','NumPy Fundamentals for TensorFlow',30,75),
            ('reading','Computational Graphs and Static vs Dynamic Execution',35,75),
            ('reading','Keras Sequential API Basics',30,75),
            ('reading','Dense Layers and Activation Functions',30,75),
            ('reading','Loss Functions and Optimization Algorithms',35,75),
            ('reading','Training, Validation, and Test Sets',30,75),
            ('exercise','Foundation Concepts Review and Practice',50,100),
            ('reading','Convolutional Neural Networks Architecture',35,75),
            ('reading','Pooling and Flattening Operations',30,75),
            ('reading','Regularization Techniques: Dropout and L1/L2',35,75),
            ('reading','Batch Normalization and Layer Normalization',35,75),
            ('reading','Recurrent Neural Networks and LSTMs',35,75),
            ('reading','GRU Cells and Bidirectional RNNs',35,75),
            ('reading','Transfer Learning with Pretrained Models',35,75),
            ('exercise','Core Skills Application Exercise',50,100),
            ('reading','Building Custom Layers and Models',35,75),
            ('project','Image Classification Project: CIFAR-10 Dataset',60,150),
            ('reading','Data Augmentation and Preprocessing Pipelines',35,75),
            ('reading','Hyperparameter Tuning and Grid Search',35,75),
            ('reading','Early Stopping and Learning Rate Scheduling',35,75),
            ('reading','Model Evaluation Metrics and Confusion Matrices',35,75),
            ('exercise','Core Skills Mastery Exercise',50,100),
            ('reading','Functional API for Complex Model Architectures',35,75),
            ('reading','Multi-Input and Multi-Output Models',35,75),
            ('reading','Attention Mechanisms and Transformers',35,75),
            ('reading','Natural Language Processing with Keras',35,75),
            ('exercise','Advanced Techniques Application Exercise',50,100),
            ('reading','Model Deployment and TensorFlow Lite',35,75),
            ('reading','Distributed Training and Data Parallelism',35,75),
            ('reading','Custom Training Loops with GradientTape',35,75),
            ('reading','Debugging and Profiling TensorFlow Models',35,75),
            ('project','Capstone Project: End-to-End NLP Pipeline',60,150),
        ]
    },
    'hugging-face-transformers': {
        'lessons': [
            ('reading','Introduction to Transformers Architecture',30,75),
            ('reading','Attention Mechanism Fundamentals',35,75),
            ('reading','Self-Attention and Multi-Head Attention',35,75),
            ('reading','Encoder-Decoder Architecture Overview',35,75),
            ('reading','Understanding BERT and Its Variants',35,75),
            ('reading','GPT Models and Autoregressive Language Modeling',35,75),
            ('reading','Tokenization Strategies and Subword Tokenization',35,75),
            ('reading','Positional Encoding and Embeddings',35,75),
            ('reading','Transfer Learning with Pretrained Models',35,75),
            ('exercise','Foundation Concepts Review and Practice',50,100),
            ('reading','Setting Up Hugging Face Environment and Installation',20,50),
            ('reading','Loading and Using Pretrained Models',30,75),
            ('reading','Working with Tokenizers from the Hub',30,75),
            ('reading','Fine-tuning BERT for Text Classification',35,75),
            ('reading','Named Entity Recognition with Transformers',35,75),
            ('reading','Question Answering with SQuAD Dataset',35,75),
            ('reading','Semantic Similarity and Sentence Embeddings',35,75),
            ('exercise','Core Skills Checkpoint Exercise',50,100),
            ('reading','Sequence-to-Sequence Models for Translation',35,75),
            ('project','Building a Complete NLP Pipeline Project',60,150),
            ('reading','Custom Training Loops with PyTorch',35,75),
            ('reading','Distributed Training and Mixed Precision',35,75),
            ('reading','Optimizing Model Performance and Inference Speed',35,75),
            ('reading','Model Quantization and Pruning Techniques',35,75),
            ('exercise','Advanced Skills Assessment',50,100),
            ('reading','Zero-Shot and Few-Shot Learning Strategies',35,75),
            ('reading','Prompt Engineering and In-Context Learning',35,75),
            ('reading','Multi-Task Learning with Transformers',35,75),
            ('reading','Domain Adaptation and Transfer Learning Advanced',35,75),
            ('exercise','Advanced Optimization Techniques',50,100),
            ('reading','Vision Transformers and Multimodal Models',35,75),
            ('reading','Efficient Transformers and Long-Context Modeling',35,75),
            ('reading','Deploying Models to Production with HF Hub',35,75),
            ('reading','Monitoring and Evaluating Model Performance',35,75),
            ('project','Capstone: Advanced Transformer Application Project',60,150),
        ]
    },
    'large-language-models': {
        'lessons': [
            ('reading','Introduction to Large Language Models',30,75),
            ('reading','History and Evolution of Neural Language Models',30,75),
            ('reading','Fundamentals of Natural Language Processing',30,75),
            ('reading','Understanding Transformer Architecture',35,75),
            ('reading','Attention Mechanisms Explained',35,75),
            ('reading','Word Embeddings and Vector Representations',35,75),
            ('reading','Tokenization and Preprocessing Techniques',30,75),
            ('reading','Training Data and Dataset Considerations',35,75),
            ('reading','Loss Functions and Optimization in LLMs',35,75),
            ('exercise','Foundation Concepts Assessment',50,100),
            ('reading','Transfer Learning and Pre-training Strategies',35,75),
            ('reading','Fine-tuning Language Models for Specific Tasks',35,75),
            ('reading','Prompt Engineering Fundamentals',30,75),
            ('reading','Few-shot and Zero-shot Learning',35,75),
            ('reading','Chain of Thought Prompting Techniques',35,75),
            ('reading','Model Evaluation Metrics and Benchmarks',35,75),
            ('reading','Scaling Laws and Model Size Trade-offs',35,75),
            ('exercise','Core Skills Practice Exercise',50,100),
            ('reading','Inference Optimization and Quantization',35,75),
            ('project','Building LLM-powered Applications Project',60,150),
            ('reading','API Integration and Deployment',35,75),
            ('reading','Safety, Bias, and Ethical Considerations',35,75),
            ('reading','Hallucinations and Reliability Issues',35,75),
            ('reading','Retrieval-Augmented Generation (RAG)',35,75),
            ('exercise','Advanced Skills Consolidation Exercise',50,100),
            ('reading','Multi-modal Language Models',35,75),
            ('reading','Parameter-Efficient Fine-tuning Methods',35,75),
            ('reading','Mixture of Experts and Sparse Models',35,75),
            ('reading','Alignment and Reinforcement Learning from Human Feedback',35,75),
            ('exercise','Advanced Topics Application Exercise',50,100),
            ('reading','Emerging Architectures and Future Directions',35,75),
            ('reading','Efficient Inference at Scale',35,75),
            ('reading','LLM Interpretability and Analysis',35,75),
            ('reading','Building Production-Ready LLM Systems',35,75),
            ('project','Capstone: Advanced LLM Development Project',60,150),
        ]
    },
    'retrieval-augmented-generation': {
        'lessons': [
            ('reading','Introduction to RAG and Knowledge Retrieval',30,75),
            ('reading','Embeddings and Vector Representations',35,75),
            ('reading','Vector Databases: Pinecone, Weaviate, and Chroma',35,75),
            ('reading','Document Chunking Strategies',35,75),
            ('reading','Semantic Search and Similarity Metrics',35,75),
            ('reading','Building a Basic RAG Pipeline',35,75),
            ('reading','Retrieval Evaluation: Precision, Recall, and NDCG',35,75),
            ('reading','Hybrid Search: BM25 and Dense Retrieval',35,75),
            ('reading','Multi-Stage Retrieval and Reranking',35,75),
            ('exercise','Core RAG Skills Exercise',50,100),
            ('reading','Advanced Chunking: Semantic and Hierarchical',35,75),
            ('reading','Query Expansion and Reformulation Techniques',35,75),
            ('reading','Hypothetical Document Embeddings (HyDE)',35,75),
            ('reading','Contextual Compression and Filtering',35,75),
            ('reading','Multi-Hop and Iterative Retrieval',35,75),
            ('reading','RAG Evaluation with the RAGAS Framework',35,75),
            ('reading','Handling Conflicting and Contradictory Documents',35,75),
            ('exercise','Intermediate RAG Checkpoint',50,100),
            ('reading','GraphRAG: Knowledge Graph Integration',35,75),
            ('project','End-to-End Project: Document Q&A System',60,150),
            ('reading','Streaming RAG Responses',35,75),
            ('reading','Long-Context RAG with Late Chunking',35,75),
            ('reading','Domain-Specific RAG Fine-Tuning',35,75),
            ('reading','Cache-Augmented Generation',35,75),
            ('exercise','Advanced RAG Patterns Exercise',50,100),
            ('reading','Production RAG Architecture and Scalability',35,75),
            ('reading','Indexing Large Corpora Efficiently',35,75),
            ('reading','Self-Corrective RAG (CRAG)',35,75),
            ('reading','Agentic RAG: Dynamic and Adaptive Retrieval',35,75),
            ('exercise','Advanced Production Exercise',50,100),
            ('reading','Multimodal RAG: Images, Tables, and PDFs',35,75),
            ('reading','Real-Time RAG with Streaming Ingestion',35,75),
            ('reading','RAG Security and PII Handling',35,75),
            ('reading','Cost Optimization for RAG Pipelines',35,75),
            ('project','Capstone: Enterprise Knowledge Assistant',60,150),
        ]
    },
    'ai-agents-agentic-workflows': {
        'lessons': [
            ('reading','Introduction to AI Agents and Agentic Systems',30,75),
            ('reading','Agent Architectures: Reactive, Deliberative, and Hybrid',35,75),
            ('reading','Memory and State Management in Agents',35,75),
            ('reading','Tool Use and Function Calling',35,75),
            ('reading','Planning and Goal Decomposition',35,75),
            ('reading','The ReAct Pattern: Reasoning and Acting',35,75),
            ('reading','Chain of Thought for Agent Reasoning',35,75),
            ('reading','Multi-Agent Systems Overview',35,75),
            ('reading','Agent Communication Protocols',35,75),
            ('exercise','Core Concepts Exercise: Build a Simple Agent',50,100),
            ('reading','LangChain Agents Deep Dive',35,75),
            ('reading','LangGraph for Stateful Agents',35,75),
            ('reading','AutoGen: Multi-Agent Conversations',35,75),
            ('reading','CrewAI: Role-Based Agent Collaboration',35,75),
            ('reading','Custom Tool Development for Agents',35,75),
            ('reading','Context Window Management and Summarization',35,75),
            ('reading','Agent Orchestration and Delegation Patterns',35,75),
            ('exercise','Intermediate Skills Checkpoint',50,100),
            ('reading','Advanced Planning: Tree of Thoughts',35,75),
            ('project','End-to-End Project: Research Agent',60,150),
            ('reading','Agent Evaluation and Benchmarking',35,75),
            ('reading','Error Handling and Agent Recovery Strategies',35,75),
            ('reading','Human-in-the-Loop Agent Design',35,75),
            ('reading','Agent Security and Trust Boundaries',35,75),
            ('exercise','Advanced Agent Patterns Exercise',50,100),
            ('reading','Production Deployment of AI Agents',35,75),
            ('reading','Monitoring and Observability for Agents',35,75),
            ('reading','Cost Optimization for Agent Pipelines',35,75),
            ('reading','Agent Testing and Quality Assurance',35,75),
            ('exercise','Advanced Deployment Exercise',50,100),
            ('reading','Multimodal Agents: Vision and Audio Capabilities',35,75),
            ('reading','Autonomous Code Generation Agents',35,75),
            ('reading','Domain-Specific Agent Customization',35,75),
            ('reading','Enterprise Agent Architecture Patterns',35,75),
            ('project','Capstone: Production-Ready Agentic System',60,150),
        ]
    },
}

COURSES = [
    # ── Programming ───────────────────────────────────────────────────────────
    dict(name='Java Mastery',            slug='java',           category='programming',  difficulty='intermediate', hours=40,
         tags='Java, OOP, JVM, Concurrency, Streams, Java 21',   status='pending'),
    dict(name='Python for Everyone',     slug='python',         category='programming',  difficulty='beginner',     hours=28,
         tags='Python, Scripting, Automation, Data',              status='pending'),
    dict(name='Modern JavaScript',       slug='javascript',     category='programming',  difficulty='intermediate', hours=32,
         tags='ES2024, Async, DOM, Modules, Closures',            status='pending'),
    dict(name='TypeScript Deep Dive',    slug='typescript',     category='programming',  difficulty='intermediate', hours=24,
         tags='Types, Generics, Decorators, Utility Types',       status='pending'),
    dict(name='Go Essentials',           slug='go',             category='programming',  difficulty='intermediate', hours=30,
         tags='Goroutines, Channels, Interfaces, Microservices',  status='pending'),
    dict(name='Rust Systems Programming',slug='rust',           category='programming',  difficulty='advanced',     hours=50,
         tags='Ownership, Borrow Checker, Concurrency, WASM',     status='pending'),
    # ── Frontend ──────────────────────────────────────────────────────────────
    dict(name='React 19 & Ecosystem',   slug='react',          category='frontend',     difficulty='intermediate', hours=36,
         tags='Hooks, Context, Suspense, RSC, TanStack',          status='pending'),
    dict(name='Next.js App Router',     slug='nextjs',         category='frontend',     difficulty='intermediate', hours=30,
         tags='App Router, RSC, ISR, Server Actions',             status='pending'),
    dict(name='Angular 18 Enterprise', slug='angular',         category='frontend',     difficulty='intermediate', hours=42,
         tags='Signals, Standalone, RxJS, NgRx',                  status='pending'),
    dict(name='Vue.js 3 Composition API',slug='vuejs',         category='frontend',     difficulty='beginner',     hours=28,
         tags='Composition API, Pinia, Nuxt 3, TypeScript',       status='pending'),
    dict(name='Tailwind CSS Mastery',   slug='tailwindcss',    category='frontend',     difficulty='beginner',     hours=16,
         tags='Utility-First, Design Systems, Animations',        status='pending'),
    # ── Backend ───────────────────────────────────────────────────────────────
    dict(name='Node.js & Express',      slug='nodejs',         category='backend',      difficulty='intermediate', hours=32,
         tags='REST, Express, Fastify, Event Loop, Streams',      status='pending'),
    dict(name='Spring Boot 3',          slug='spring-boot',    category='backend',      difficulty='intermediate', hours=44,
         tags='Spring MVC, Security, JPA, Microservices, Reactive',status='pending'),
    dict(name='Django & DRF',           slug='django',         category='backend',      difficulty='intermediate', hours=34,
         tags='DRF, Authentication, ORM, Celery, Channels',       status='pending'),
    dict(name='FastAPI & Async Python', slug='fastapi',        category='backend',      difficulty='intermediate', hours=24,
         tags='Async, Pydantic v2, OpenAPI, Dependency Injection', status='pending'),
    dict(name='Microservices Architecture',slug='microservices',category='backend',     difficulty='advanced',     hours=40,
         tags='DDD, Event-Driven, Saga, CQRS, Service Mesh',      status='pending'),
    # ── Cloud ─────────────────────────────────────────────────────────────────
    dict(name='AWS Solutions Architect',slug='aws',            category='cloud',        difficulty='intermediate', hours=50,
         tags='EC2, S3, Lambda, RDS, VPC, CDK',                   status='pending'),
    # ── DevOps ───────────────────────────────────────────────────────────────
    dict(name='Docker & Containerization',slug='docker',       category='devops',       difficulty='beginner',     hours=18,
         tags='Dockerfile, Compose, Networking, Security',         status='pending'),
    dict(name='Kubernetes in Production',slug='kubernetes',    category='devops',       difficulty='advanced',     hours=48,
         tags='Pods, Helm, Operators, RBAC, GitOps, Istio',       status='pending'),
    dict(name='Terraform & IaC',        slug='terraform',      category='devops',       difficulty='intermediate', hours=28,
         tags='HCL, Modules, Remote State, Multi-Cloud',          status='pending'),
    # ── AI/ML ─────────────────────────────────────────────────────────────────
    dict(name='Python for AI & ML',     slug='python-for-ai-ml',      category='ai-ml', difficulty='beginner',    hours=45,
         tags='Python, NumPy, Pandas, Scikit-Learn, Deep Learning', status='complete'),
    dict(name='PyTorch Deep Learning',  slug='pytorch-deep-learning',  category='ai-ml', difficulty='intermediate',hours=55,
         tags='PyTorch, CNNs, RNNs, GANs, Deployment',            status='complete'),
    dict(name='TensorFlow & Keras',     slug='tensorflow-keras',       category='ai-ml', difficulty='intermediate',hours=50,
         tags='TensorFlow, Keras, CNNs, Transfer Learning, TFLite', status='complete'),
    dict(name='Hugging Face Transformers',slug='hugging-face-transformers',category='ai-ml',difficulty='intermediate',hours=45,
         tags='BERT, GPT, Fine-tuning, Tokenizers, HF Hub',       status='complete'),
    dict(name='Large Language Models',  slug='large-language-models',  category='ai-ml', difficulty='advanced',   hours=60,
         tags='LLMs, Transformers, RLHF, RAG, Deployment',        status='complete'),
    dict(name='Retrieval-Augmented Generation',slug='retrieval-augmented-generation',category='ai-ml',difficulty='advanced',hours=40,
         tags='RAG, Embeddings, Vector DBs, LangChain, RAGAS',    status='complete'),
    dict(name='AI Agents & Agentic Workflows',slug='ai-agents-agentic-workflows',category='ai-ml',difficulty='advanced',hours=50,
         tags='Agents, ReAct, LangGraph, AutoGen, CrewAI',        status='complete'),
    dict(name='Machine Learning Fundamentals',slug='ml-fundamentals',  category='ai-ml', difficulty='intermediate',hours=38,
         tags='Regression, Classification, Clustering, Scikit-Learn', status='pending'),
    dict(name='Generative AI & LLMs',   slug='generative-ai',          category='ai-ml', difficulty='intermediate',hours=30,
         tags='GPT, Fine-tuning, Embeddings, Multimodal',         status='pending'),
    dict(name='RAG Systems & Vector Search',slug='rag',                category='ai-ml', difficulty='intermediate',hours=24,
         tags='Embeddings, Vector DB, LangChain, LlamaIndex',     status='pending'),
    dict(name='AI Agents & Tool Use',   slug='ai-agents',              category='ai-ml', difficulty='advanced',   hours=28,
         tags='ReAct, Function Calling, Multi-Agent, AutoGen',    status='pending'),
    dict(name='Advanced Prompt Engineering',slug='prompt-engineering', category='ai-ml', difficulty='beginner',   hours=12,
         tags='Chain-of-Thought, Few-Shot, System Prompts',       status='pending'),
    dict(name='MLOps & Model Deployment',slug='mlops',                 category='ai-ml', difficulty='advanced',   hours=36,
         tags='MLflow, Kubeflow, Docker, Monitoring, Feature Stores', status='pending'),
    # ── Databases ─────────────────────────────────────────────────────────────
    dict(name='PostgreSQL Advanced',    slug='postgresql',     category='databases',    difficulty='intermediate', hours=28,
         tags='Indexing, Query Optimization, Partitioning, JSONB', status='pending'),
    dict(name='MongoDB & Atlas',        slug='mongodb',        category='databases',    difficulty='intermediate', hours=22,
         tags='Aggregation, Indexes, Atlas Search, Transactions', status='pending'),
    # ── Software Engineering ──────────────────────────────────────────────────
    dict(name='Data Structures & Algorithms',slug='dsa',       category='software-engineering',difficulty='intermediate',hours=60,
         tags='Arrays, Trees, Graphs, DP, Sorting, Interview Prep', status='pending'),
    dict(name='System Design',          slug='system-design',  category='software-engineering',difficulty='advanced',   hours=40,
         tags='Scalability, CAP Theorem, Load Balancing, Caching', status='pending'),
    # ── Mobile ────────────────────────────────────────────────────────────────
    dict(name='React Native',           slug='react-native',   category='mobile',       difficulty='intermediate', hours=36,
         tags='Expo, Navigation, Animations, Native Modules',     status='pending'),
    dict(name='Flutter & Dart',         slug='flutter',        category='mobile',       difficulty='intermediate', hours=40,
         tags='Widgets, State Management, BLoC, Animations, Dart', status='pending'),
]

CAT_LABELS = {
    'programming': 'Programming Languages',
    'frontend':    'Frontend Development',
    'backend':     'Backend Development',
    'cloud':       'Cloud Computing',
    'devops':      'DevOps & Infrastructure',
    'ai-ml':       'AI & Machine Learning',
    'databases':   'Databases',
    'software-engineering': 'Software Engineering',
    'mobile':      'Mobile Development',
}

def get_lessons(course):
    slug = course['slug']
    if slug in GENERATED:
        return GENERATED[slug]['lessons']
    return [(t, title, mins, xp) for t, title, mins, xp in STUB_LESSONS]

def lesson_count(course):
    return len(get_lessons(course))

def total_hours(course):
    mins = sum(m for _, _, m, _ in get_lessons(course))
    return round(mins / 60, 1)

# ── PDF Build ─────────────────────────────────────────────────────────────────

def build_pdf(path):
    doc = SimpleDocTemplate(
        path, pagesize=A4,
        leftMargin=20*mm, rightMargin=20*mm,
        topMargin=20*mm, bottomMargin=20*mm,
        title='SkillForge Course Catalogue',
        author='SkillForge',
    )

    styles = getSampleStyleSheet()
    W = A4[0] - 40*mm  # usable width

    # ── Custom styles ─────────────────────────────────────────────────────────
    def s(name, **kw):
        return ParagraphStyle(name, **kw)

    h1  = s('H1',  fontName='Helvetica-Bold',  fontSize=28, textColor=PURPLE,   spaceAfter=4*mm, alignment=TA_CENTER)
    h1s = s('H1S', fontName='Helvetica',        fontSize=13, textColor=SLATE_LT, spaceAfter=8*mm, alignment=TA_CENTER)
    h2  = s('H2',  fontName='Helvetica-Bold',  fontSize=16, textColor=WHITE,    spaceBefore=2*mm, spaceAfter=2*mm)
    h3  = s('H3',  fontName='Helvetica-Bold',  fontSize=12, textColor=DARK_BG,  spaceBefore=1*mm, spaceAfter=1*mm)
    h3s = s('H3S', fontName='Helvetica',        fontSize=9,  textColor=SLATE_LT, spaceAfter=2*mm)
    normal = s('NM', fontName='Helvetica',      fontSize=9,  textColor=SLATE,    spaceAfter=1*mm)
    small  = s('SM', fontName='Helvetica',      fontSize=8,  textColor=SLATE_LT)
    bold9  = s('B9', fontName='Helvetica-Bold', fontSize=9,  textColor=SLATE)
    badge_done = s('BD', fontName='Helvetica-Bold', fontSize=8, textColor=GREEN, alignment=TA_RIGHT)
    badge_pend = s('BP', fontName='Helvetica-Bold', fontSize=8, textColor=ORANGE, alignment=TA_RIGHT)
    tag_s  = s('TG', fontName='Helvetica',      fontSize=7.5, textColor=PURPLE)
    toc_cat= s('TC', fontName='Helvetica-Bold', fontSize=11, textColor=PURPLE,  spaceBefore=4*mm, spaceAfter=1*mm)
    toc_co = s('TCO',fontName='Helvetica',       fontSize=9,  textColor=SLATE,   leftIndent=8*mm,  spaceAfter=0.5*mm)
    cover_stat = s('CS', fontName='Helvetica-Bold', fontSize=22, textColor=WHITE, alignment=TA_CENTER)
    cover_stat_l= s('CSL',fontName='Helvetica',     fontSize=10, textColor=SLATE_LT, alignment=TA_CENTER, spaceAfter=3*mm)

    story = []

    # ════════════════════════════════════════════════════════════════════════
    # COVER PAGE
    # ════════════════════════════════════════════════════════════════════════
    story.append(Spacer(1, 30*mm))
    story.append(Paragraph('SkillForge', h1))
    story.append(Paragraph('AI Upskilling Platform', h1s))
    story.append(HRFlowable(width=W, color=PURPLE, thickness=1.5, spaceAfter=8*mm))

    story.append(Paragraph('Course Catalogue', s('CC', fontName='Helvetica-Bold', fontSize=20,
                            textColor=SLATE, spaceAfter=2*mm, alignment=TA_CENTER)))
    story.append(Paragraph('Complete Course & Lesson Plan', s('CCS', fontName='Helvetica', fontSize=12,
                            textColor=SLATE_LT, spaceAfter=12*mm, alignment=TA_CENTER)))

    # Stats row
    complete = sum(1 for c in COURSES if c['status'] == 'complete')
    pending  = sum(1 for c in COURSES if c['status'] == 'pending')
    total_l  = sum(lesson_count(c) for c in COURSES)

    stat_data = [[
        Paragraph(str(len(COURSES)), cover_stat),
        Paragraph(f'{complete}', cover_stat),
        Paragraph(f'{pending}', cover_stat),
        Paragraph(f'{total_l}', cover_stat),
    ],[
        Paragraph('Total Courses', cover_stat_l),
        Paragraph('Complete', cover_stat_l),
        Paragraph('Pending', cover_stat_l),
        Paragraph('Total Lessons', cover_stat_l),
    ]]
    stat_table = Table(stat_data, colWidths=[W/4]*4)
    stat_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), DARK_BG),
        ('TEXTCOLOR',  (0,0), (-1,-1), WHITE),
        ('ALIGN',      (0,0), (-1,-1), 'CENTER'),
        ('VALIGN',     (0,0), (-1,-1), 'MIDDLE'),
        ('ROUNDEDCORNERS', [4]),
        ('TOPPADDING',  (0,0), (-1,-1), 8),
        ('BOTTOMPADDING',(0,0), (-1,-1), 8),
        ('TEXTCOLOR', (1,0), (1,0), GREEN),
        ('TEXTCOLOR', (2,0), (2,0), ORANGE),
        ('TEXTCOLOR', (3,0), (3,0), CYAN),
    ]))
    story.append(stat_table)
    story.append(Spacer(1, 12*mm))

    story.append(Paragraph(f'Generated: {date.today().strftime("%B %d, %Y")}',
                            s('DT', fontName='Helvetica', fontSize=9, textColor=SLATE_LT, alignment=TA_CENTER)))
    story.append(PageBreak())

    # ════════════════════════════════════════════════════════════════════════
    # TABLE OF CONTENTS
    # ════════════════════════════════════════════════════════════════════════
    story.append(Paragraph('Table of Contents', s('TOCH', fontName='Helvetica-Bold', fontSize=18,
                            textColor=PURPLE, spaceAfter=6*mm)))
    story.append(HRFlowable(width=W, color=BORDER, thickness=0.5, spaceAfter=4*mm))

    seen_cats = []
    for c in COURSES:
        cat = c['category']
        if cat not in seen_cats:
            seen_cats.append(cat)
            story.append(Paragraph(CAT_LABELS.get(cat, cat), toc_cat))
        dot = '✅' if c['status'] == 'complete' else '○'
        story.append(Paragraph(f'{dot}  {c["name"]}  <font color="#64748b" size="8">— {lesson_count(c)} lessons · {c["hours"]}h</font>', toc_co))

    story.append(PageBreak())

    # ════════════════════════════════════════════════════════════════════════
    # COURSE SECTIONS — grouped by category
    # ════════════════════════════════════════════════════════════════════════
    seen_cats = []
    for c in COURSES:
        cat  = c['category']
        cclr = CAT_COLORS.get(cat, PURPLE)
        dclr = DIFF_COLORS.get(c['difficulty'], SLATE)

        # Category header
        if cat not in seen_cats:
            seen_cats.append(cat)
            if seen_cats.index(cat) > 0:
                story.append(PageBreak())

            cat_hdr = Table([[Paragraph(CAT_LABELS.get(cat, cat), h2)]], colWidths=[W])
            cat_hdr.setStyle(TableStyle([
                ('BACKGROUND',  (0,0), (-1,-1), cclr),
                ('TOPPADDING',  (0,0), (-1,-1), 6),
                ('BOTTOMPADDING',(0,0),(-1,-1), 6),
                ('LEFTPADDING', (0,0), (-1,-1), 8),
                ('ROUNDEDCORNERS', [4]),
            ]))
            story.append(cat_hdr)
            story.append(Spacer(1, 4*mm))

        lessons = get_lessons(c)
        n_read  = sum(1 for t,*_ in lessons if 'reading' in t or t in ('lesson','deep_learning'))
        n_ex    = sum(1 for t,*_ in lessons if 'exercise' in t)
        n_quiz  = sum(1 for t,*_ in lessons if t == 'quiz')
        n_proj  = sum(1 for t,*_ in lessons if 'project' in t or 'capstone' in t)
        lh      = total_hours(c)

        status_p = Paragraph('✅ Complete' if c['status'] == 'complete' else '○  Pending',
                              badge_done if c['status'] == 'complete' else badge_pend)

        hdr_data = [[
            Paragraph(c['name'], h3),
            status_p,
        ]]
        hdr_table = Table(hdr_data, colWidths=[W*0.75, W*0.25])
        hdr_table.setStyle(TableStyle([
            ('BACKGROUND',   (0,0), (-1,-1), CARD_BG),
            ('TOPPADDING',   (0,0), (-1,-1), 6),
            ('BOTTOMPADDING',(0,0), (-1,-1), 4),
            ('LEFTPADDING',  (0,0), (0,0),   8),
            ('RIGHTPADDING', (1,0), (1,0),   8),
            ('VALIGN',       (0,0), (-1,-1), 'TOP'),
        ]))

        meta_items = [
            f'<font color="#64748b">Slug:</font> <b>{c["slug"]}</b>',
            f'<font color="#64748b">Difficulty:</font> <b><font color="{dclr.hexval()}">{c["difficulty"].capitalize()}</font></b>',
            f'<font color="#64748b">Duration:</font> <b>{c["hours"]}h planned · {lh:.0f}h lessons</b>',
            f'<font color="#64748b">Lessons:</font> <b>{len(lessons)}</b>  '
            f'<font color="#64748b">(📖{n_read} 🛠{n_ex} ❓{n_quiz} 🏗{n_proj})</font>',
            f'<font color="#64748b">Tags:</font> {c["tags"]}',
        ]
        meta_p = Paragraph(' &nbsp;·&nbsp; '.join(meta_items), small)
        meta_table = Table([[meta_p]], colWidths=[W])
        meta_table.setStyle(TableStyle([
            ('BACKGROUND',   (0,0), (-1,-1), CARD_BG),
            ('TOPPADDING',   (0,0), (-1,-1), 2),
            ('BOTTOMPADDING',(0,0), (-1,-1), 6),
            ('LEFTPADDING',  (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ]))

        # Lesson rows
        lesson_rows = []
        module_idx = 0
        for i, (ltype, title, mins, xp) in enumerate(lessons):
            if i % 5 == 0:
                module_idx += 1
                mod_row = [
                    Paragraph(f'Module {module_idx}', s(f'MOD{i}', fontName='Helvetica-Bold',
                               fontSize=7.5, textColor=cclr)),
                    '', '', '',
                ]
                lesson_rows.append(mod_row)
            label = TYPE_LABELS.get(ltype, '📖 Reading')
            num   = f'{i+1:02d}'
            lesson_rows.append([
                Paragraph(f'<font color="#94a3b8">{num}</font>', small),
                Paragraph(title, normal),
                Paragraph(label, small),
                Paragraph(f'{mins} min · {xp} XP', small),
            ])

        col_w = [8*mm, W - 8*mm - 28*mm - 28*mm, 28*mm, 28*mm]
        lesson_table = Table(lesson_rows, colWidths=col_w)
        ts = [
            ('FONTSIZE',     (0,0), (-1,-1), 8),
            ('TOPPADDING',   (0,0), (-1,-1), 2),
            ('BOTTOMPADDING',(0,0), (-1,-1), 2),
            ('LEFTPADDING',  (0,0), (-1,-1), 4),
            ('RIGHTPADDING', (0,0), (-1,-1), 4),
            ('VALIGN',       (0,0), (-1,-1), 'MIDDLE'),
            ('ALIGN',        (2,0), (3,-1),  'CENTER'),
            ('TEXTCOLOR',    (2,0), (-1,-1), SLATE_LT),
        ]
        # Alternate row shading (skip module header rows)
        data_row = 0
        for i, row in enumerate(lesson_rows):
            if row[1] == '':  # module header
                ts.append(('BACKGROUND', (0,i), (-1,i), colors.HexColor('#e8e8f8')))
                ts.append(('SPAN', (0,i), (-1,i)))
            else:
                if data_row % 2 == 1:
                    ts.append(('BACKGROUND', (0,i), (-1,i), LIGHT_BG))
                data_row += 1

        lesson_table.setStyle(TableStyle(ts))

        # Bottom border
        sep = HRFlowable(width=W, color=BORDER, thickness=0.5, spaceAfter=5*mm, spaceBefore=2*mm)

        story.append(KeepTogether([hdr_table, meta_table, Spacer(1, 2*mm)]))
        story.append(lesson_table)
        story.append(sep)

    # ════════════════════════════════════════════════════════════════════════
    # SUMMARY PAGE
    # ════════════════════════════════════════════════════════════════════════
    story.append(PageBreak())
    story.append(Paragraph('Summary by Category', s('SH', fontName='Helvetica-Bold', fontSize=18,
                            textColor=PURPLE, spaceAfter=6*mm)))
    story.append(HRFlowable(width=W, color=BORDER, thickness=0.5, spaceAfter=4*mm))

    from collections import defaultdict
    cat_stats = defaultdict(lambda: dict(courses=0, lessons=0, complete=0, hours=0))
    for c in COURSES:
        cat_stats[c['category']]['courses'] += 1
        cat_stats[c['category']]['lessons'] += lesson_count(c)
        cat_stats[c['category']]['hours']   += c['hours']
        if c['status'] == 'complete':
            cat_stats[c['category']]['complete'] += 1

    sum_rows = [[
        Paragraph('Category', bold9),
        Paragraph('Courses', bold9),
        Paragraph('Complete', bold9),
        Paragraph('Total Lessons', bold9),
        Paragraph('Est. Hours', bold9),
    ]]
    for cat, label in CAT_LABELS.items():
        if cat not in cat_stats: continue
        st = cat_stats[cat]
        cclr = CAT_COLORS.get(cat, PURPLE)
        sum_rows.append([
            Paragraph(f'<font color="{cclr.hexval()}">■</font> {label}', normal),
            Paragraph(str(st['courses']), normal),
            Paragraph(f'{st["complete"]}/{st["courses"]}',
                      s('CMP', fontName='Helvetica-Bold', fontSize=9,
                        textColor=GREEN if st['complete']==st['courses'] else ORANGE)),
            Paragraph(str(st['lessons']), normal),
            Paragraph(f'{st["hours"]}h', normal),
        ])

    sum_rows.append([
        Paragraph('<b>TOTAL</b>', bold9),
        Paragraph(f'<b>{len(COURSES)}</b>', bold9),
        Paragraph(f'<b>{complete}/{len(COURSES)}</b>',
                  s('TOT', fontName='Helvetica-Bold', fontSize=9, textColor=GREEN if complete==len(COURSES) else ORANGE)),
        Paragraph(f'<b>{total_l}</b>', bold9),
        Paragraph(f'<b>{sum(c["hours"] for c in COURSES)}h</b>', bold9),
    ])

    sum_table = Table(sum_rows, colWidths=[W*0.38, W*0.12, W*0.15, W*0.18, W*0.17])
    sum_table.setStyle(TableStyle([
        ('BACKGROUND',   (0,0), (-1,0),  DARK_BG),
        ('TEXTCOLOR',    (0,0), (-1,0),  WHITE),
        ('FONTSIZE',     (0,0), (-1,-1), 9),
        ('TOPPADDING',   (0,0), (-1,-1), 5),
        ('BOTTOMPADDING',(0,0), (-1,-1), 5),
        ('LEFTPADDING',  (0,0), (-1,-1), 6),
        ('LINEBELOW',    (0,0), (-1,0),  1, PURPLE),
        ('LINEBELOW',    (0,-2),(-1,-2), 1, BORDER),
        ('BACKGROUND',   (0,-1),(-1,-1), CARD_BG),
        ('ROWBACKGROUNDS',(0,1),(-1,-2), [WHITE, LIGHT_BG]),
    ]))
    story.append(sum_table)

    doc.build(story)
    print(f'✅  PDF written → {path}')

if __name__ == '__main__':
    build_pdf('/home/user/test_AIUpskilling/SkillForge_Course_Catalogue.pdf')
