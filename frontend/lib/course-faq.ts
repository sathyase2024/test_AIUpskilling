// Per-course FAQ — market-researched answers served instantly without API calls.
// When a user's question matches a known intent, this answer is returned directly
// and the Claude API is not called, saving tokens.

type IntentKey = 'why' | 'scope' | 'salary' | 'future' | 'difficulty' | 'career'

interface FAQEntry {
  intent: IntentKey
  answer: string
}

// Ordered by specificity — salary/future checked before generic "why"
const INTENT_PATTERNS: Array<{ intent: IntentKey; patterns: string[] }> = [
  {
    intent: 'salary',
    patterns: ['salary', 'pay ', 'earn', 'income', 'compensation', 'ctc', 'package', 'how much money', 'how much can i make', 'wages'],
  },
  {
    intent: 'future',
    patterns: ['future', 'trend', 'outlook', 'next few years', '2025', '2026', '2030', 'going forward', 'long term', 'still relevant', 'dying', 'worth in future'],
  },
  {
    intent: 'scope',
    patterns: ['scope', 'demand', 'job market', 'opportunity', 'companies use', 'who uses', 'market size', 'industry', 'how popular'],
  },
  {
    intent: 'career',
    patterns: ['career', 'job role', 'position', 'what jobs', 'what role', 'interview', 'placement', 'get hired', 'who hires', 'what can i become'],
  },
  {
    intent: 'difficulty',
    patterns: ['how hard', 'how difficult', 'how easy', 'how long', 'time to learn', 'prerequisite', 'how to start', 'beginner', 'is it easy', 'is it hard', 'difficult to learn'],
  },
  {
    intent: 'why',
    patterns: ['why should', 'should i learn', 'worth learning', 'why learn', 'reason to learn', 'benefit', 'advantage', 'importance', 'useful', 'why do i need', 'is it worth', 'why study'],
  },
]

export function detectIntent(message: string): IntentKey | null {
  const msg = message.toLowerCase()
  for (const { intent, patterns } of INTENT_PATTERNS) {
    if (patterns.some((p) => msg.includes(p))) return intent
  }
  return null
}

// ─── Per-course answers ───────────────────────────────────────────────────────

const COURSE_FAQ: Record<string, Record<IntentKey, string>> = {
  'python-for-ai-ml': {
    why: `Python is the universal language of AI, data science, and automation — 85%+ of ML engineers globally use it as their primary language. Every major AI framework (TensorFlow, PyTorch, LangChain, Hugging Face) is Python-first, meaning Python is the single entry point to the entire AI ecosystem. Beyond AI, Python is used for web backends, automation, scripting, and data analysis, making it one of the most versatile skills in tech. If you want a career in any data or AI-adjacent field, Python isn't optional — it's the foundation everything else is built on.`,

    scope: `Python skill appears in 2.4M+ job postings globally as of 2025, making it the most-demanded programming language worldwide. In AI/ML specifically, Python commands 90%+ market share. India alone has 400,000+ active Python job openings spanning data science, backend development, AI engineering, and automation. From startups to FAANG companies, every tech organisation has Python in their stack. The demand shows no signs of slowing — AI adoption is accelerating, and Python is the language driving it.`,

    salary: `Python ML/AI engineers earn $120,000–$185,000/year in the US. Senior AI engineers with strong Python skills command $200K+ at FAANG and top AI companies. In India, Python developers earn ₹6–18 LPA at the intermediate level, rising to ₹20–40 LPA+ for senior AI/ML engineers at product companies. Python + ML/data skills is one of the highest-ROI combinations in tech — even Python-only developers earn 20–30% more than the average developer.`,

    future: `Python's dominance in AI and data science is set to continue well beyond 2030. The AI boom — LLMs, autonomous agents, computer vision — is entirely Python-driven. Python 3.12+ introduced significant performance gains (up to 60% faster), and the ecosystem is expanding rapidly. Even as newer languages emerge, Python's library ecosystem (NumPy, pandas, PyTorch, scikit-learn) creates a switching cost that makes displacement unlikely. It's one of the safest long-term bets in tech.`,

    difficulty: `Python is consistently ranked the easiest programming language to learn. Most complete beginners write useful scripts within 1–2 weeks. For AI/ML proficiency (NumPy, pandas, scikit-learn), expect 2–3 months of consistent practice (1–2 hours daily). The syntax is clean and English-like, and the community is enormous — virtually every problem you'll encounter has been answered on Stack Overflow. Start with small data analysis projects or Kaggle competitions to build practical skills fast.`,

    career: `Python unlocks roles across multiple domains: ML Engineer, Data Scientist, AI Developer, Data Analyst, Backend Developer (Django/FastAPI), Automation Engineer, and DevOps Engineer. Entry-level data analyst roles are the fastest path in. ML Engineer and AI Engineer roles pay the highest. At product companies, Python skills open doors at Google, Meta, Amazon, Netflix, and thousands of startups. In India, companies like Flipkart, Swiggy, Zepto, and every major IT services firm (TCS, Infosys, Wipro) actively hire Python developers.`,
  },

  'large-language-models': {
    why: `LLMs are the defining technology of this decade — GPT-4, Claude, Gemini, and Llama are transforming healthcare, finance, legal, education, and software development simultaneously. Every software company is either building LLM-powered products or integrating LLMs into existing ones. Engineers who understand how LLMs work — attention mechanisms, tokenization, fine-tuning, RLHF — are among the most sought-after in tech. This isn't a niche skill; it's becoming foundational infrastructure knowledge, like databases were in the 2000s.`,

    scope: `AI/ML engineer job postings grew 400%+ between 2022–2024. Entirely new job categories (LLM Engineer, AI Product Engineer, Prompt Engineer) emerged in this period that didn't exist before. 73% of Fortune 500 companies are actively investing in LLM-powered products. The talent gap is enormous — demand massively outstrips supply. Every company from startups to enterprise is racing to build AI-native products, and engineers with LLM expertise are the bottleneck.`,

    salary: `LLM engineers are among the highest-paid in tech. Median compensation: $150,000–$280,000 in the US. At top AI companies (OpenAI, Anthropic, Google DeepMind, Meta AI), total compensation including equity can exceed $500K–$1M+. Entry-level AI engineer roles start at $130K+ even at non-FAANG companies. In India, LLM engineers at product startups earn ₹25–60 LPA. The salary premium for genuine LLM expertise (not just API wrapping) is significant.`,

    future: `LLMs are transitioning from novelty to infrastructure — they'll be embedded in every software product the way databases are today. The frontier is moving toward: multimodal models (text + vision + audio), smaller specialised models, and agentic systems. Engineers who understand LLM internals — not just API wrappers — will lead this next wave. By 2027, Gartner estimates 80% of enterprises will have deployed AI-native applications. The window to build deep expertise while the field is young is now.`,

    difficulty: `LLMs have meaningful prerequisites — Python (essential), linear algebra (helpful), probability theory (helpful). However, you can start being productive with LLMs quickly by using APIs and studying attention mechanisms conceptually before diving into the full math. Expect 4–6 months from zero to a capable LLM engineer who can fine-tune models and build production applications. The community is active, tutorials are excellent (Andrej Karpathy, Hugging Face, fast.ai), and the field rewards curiosity and iteration.`,

    career: `Roles include: AI Engineer, LLM Engineer, ML Engineer, NLP Engineer, AI Product Engineer, AI Researcher, and Foundation Model Developer. These roles exist at every type of company now — not just AI labs. Startups pay equity premiums; big tech pays cash. Common paths: join an AI-native startup early (equity upside), join a large tech company (stability + resources), or build AI products as a solopreneur. LLM expertise is genuinely rare and commands outsized compensation.`,
  },

  'ai-agents-agentic-workflows': {
    why: `Agents represent the shift from AI assistants (answering questions) to autonomous systems (taking actions). Instead of just responding, agents browse the web, write and execute code, manage files, call APIs, and chain multiple steps to complete complex goals. This is where AI creates the most business leverage, and it's the frontier every company is racing toward in 2025. Engineers who can build reliable, production-grade agents are exceptionally valuable right now.`,

    scope: `The autonomous AI agent market is projected to reach $47.1 billion by 2030 at a 43.8% CAGR. Agent developer roles are the fastest-growing specialisation within AI engineering. Salesforce, Microsoft (Copilot), Google (Vertex AI Agents), and ServiceNow are embedding agentic workflows into core enterprise products — driving demand for engineers who understand multi-agent systems, tool use, and orchestration patterns.`,

    salary: `Agentic AI engineers command significant premiums due to high demand and limited supply. Compensation ranges from $160,000–$270,000 in the US, with equity at AI-native companies pushing total comp higher. Because agent engineering requires combining LLM knowledge with systems engineering, software architecture, and reliability engineering, qualified candidates are scarce. India-based AI agent developers at product companies earn ₹28–55 LPA.`,

    future: `By 2026, Gartner predicts 25% of enterprise software decisions will be made or mediated by AI agents. Active research frontiers: multi-agent coordination, long-horizon planning, tool use reliability, and agent memory. Frameworks like LangGraph, CrewAI, and AutoGen are maturing rapidly. The engineers building this infrastructure today are setting the standards for how agentic AI gets deployed — an early-mover advantage that compounds over time.`,

    difficulty: `Agent engineering builds on LLM foundations — if you're comfortable with Python and basic LLM concepts (prompting, API calls), expect 6–10 weeks to build production-grade agents. The frameworks (LangGraph, CrewAI, AutoGen) abstract significant complexity. The harder challenge is reliability: getting agents to work once is easy; getting them to work consistently on diverse inputs requires careful prompt engineering, state management, and error handling. Starting with simple tool-use examples before multi-agent systems is the right approach.`,

    career: `Roles include: AI Agent Developer, AI Automation Engineer, Agentic Systems Engineer, RPA AI Specialist, and AI Orchestration Engineer. Most companies haven't fully staffed for these roles yet — you're entering at the ground floor of a category that will be mainstream within 2 years. High upside for early movers. Strong fit for engineers who enjoy systems thinking and enjoy debugging complex, stateful workflows.`,
  },

  'retrieval-augmented-generation': {
    why: `RAG solves the two biggest limitations of LLMs: hallucination (making things up) and knowledge cutoff (not knowing about recent events or private data). By grounding LLM responses in retrieved documents from your own knowledge base, RAG makes AI reliable and auditable enough for enterprise production use. It's the most widely implemented AI pattern in enterprise settings — if a company is deploying AI on their internal documents, they're almost certainly using RAG.`,

    scope: `78% of enterprise LLM deployments use RAG architecture as of 2025. Vector databases — a new infrastructure category spawned by RAG demand — have become a billion-dollar market (Pinecone, Weaviate, Qdrant, Chroma). RAG skills appear in virtually every AI engineering job description that involves building customer-facing or internal AI applications. It's become table-stakes knowledge for production AI engineering.`,

    salary: `RAG engineers earn $140,000–$225,000 in the US. Because RAG combines ML knowledge (embeddings, retrieval algorithms) with engineering skills (pipeline design, database optimisation, evaluation), engineers who master it command strong premiums over pure API-wrapper developers. In India, AI engineers specialising in RAG earn ₹22–50 LPA at product companies.`,

    future: `RAG is actively evolving: GraphRAG (Microsoft), multi-hop retrieval, hypothetical document embeddings, and hybrid search (dense + sparse retrieval) are current frontiers. As enterprises move from AI pilots to production, RAG engineers who can design reliable, accurate retrieval systems become critical. The shift from simple document QA to agentic RAG (where retrieval is a tool for agents) will expand use cases significantly over 2025–2028.`,

    difficulty: `The core RAG concept is accessible: embed documents into vectors, store in a vector database, retrieve the most relevant chunks on a query, and pass them to the LLM as context. A basic working pipeline can be built in 2–3 weeks with Python, LangChain, and a free vector DB. Production-grade RAG — optimising chunk size, implementing re-ranking, evaluating retrieval quality, handling multi-turn conversations — takes 2–3 months to master. Start with LangChain or LlamaIndex for fastest onboarding.`,

    career: `Roles include: AI Engineer, Knowledge Engineer, Enterprise AI Developer, Search/Retrieval Engineer, and Conversational AI Engineer. RAG is especially valued at companies deploying AI on proprietary data — legal tech, healthtech, fintech, and enterprise software. Any company building a "chat with your documents" or "AI customer support" product needs RAG engineers. Highly practical, immediately deployable skills.`,
  },

  'pytorch-deep-learning': {
    why: `PyTorch is the de facto standard for deep learning research and is rapidly taking over production as well. It powers models at Meta (LLaMA), Tesla (Autopilot), Stability AI (Stable Diffusion), and the majority of academic AI research. If you want to understand deep learning at the implementation level — not just call APIs — PyTorch is how you do it. Custom neural architectures, novel training loops, experimental model designs — all start with PyTorch.`,

    scope: `PyTorch is used in 80%+ of ML research papers (surpassing TensorFlow from 2022 onward). It's required for ML Engineer and Deep Learning Engineer roles at top tech companies. Over 150,000 GitHub repositories use PyTorch. NVIDIA's deep learning ecosystem is tightly integrated with PyTorch. The framework's dominance in research means the next generation of production models will all be PyTorch-native.`,

    salary: `Deep learning engineers with PyTorch expertise earn $140,000–$230,000+ in the US. At research-focused companies — Meta AI, NVIDIA, Tesla, Waymo, and AI labs — total compensation including equity regularly exceeds $400K. The combination of PyTorch + GPU programming + model optimisation is one of the highest-value skill sets in all of tech. In India, deep learning engineers earn ₹20–50 LPA at product companies.`,

    future: `PyTorch 2.x introduced `torch.compile`, delivering near-C++ performance without leaving Python — a major leap for production deployment. With Meta's investment and NVIDIA's CUDA ecosystem built around it, PyTorch's dominance will continue. Deep learning is the foundation of all frontier AI: LLMs, diffusion models, video generation, robotics — all use PyTorch at the core. This is a foundational skill that grows more valuable as AI matures.`,

    difficulty: `PyTorch is more demanding than high-level frameworks like Keras — you'll write training loops explicitly, manage tensor dimensions manually, and debug gradients. Linear algebra (matrix operations) and basic calculus (backpropagation) are genuinely helpful prerequisites. Expect 3–5 months for solid proficiency, including custom architectures, debugging vanishing gradients, and GPU optimisation. The payoff is deep understanding that makes you effective with any future framework.`,

    career: `Roles include: ML Engineer, Deep Learning Engineer, Computer Vision Engineer, NLP Researcher, AI Researcher, and Robotics AI Engineer. These are consistently among the highest-paying engineering roles globally. Strong fit for engineers who want to understand the fundamentals deeply, not just use pre-built models. Research roles at AI labs often specifically require PyTorch expertise.`,
  },

  'tensorflow-keras': {
    why: `TensorFlow powers ML in production at Google, Airbnb, Twitter, Uber, and thousands of enterprise companies globally. Keras — its high-level API — makes building neural networks accessible without requiring deep framework knowledge, making it the best entry point to deep learning for many developers. For mobile ML (TensorFlow Lite) and web ML (TensorFlow.js), TensorFlow has no real competitor. It's also the framework of choice in heavily regulated industries (healthcare, finance, manufacturing) where Google's enterprise support and stability matter.`,

    scope: `TensorFlow has 180,000+ GitHub stars and is used in production by more companies globally than any other ML framework. It's especially strong in enterprise settings where stability, tooling (TFX, TF Serving), and long-term support are priorities. TensorFlow Lite powers on-device ML in billions of Android devices. Google TPU infrastructure is TensorFlow-native, making it the optimal choice for large-scale training at Google Cloud.`,

    salary: `TensorFlow/Keras engineers earn $130,000–$205,000 in the US. In enterprise industries — banking, healthcare, manufacturing — ML engineers with TensorFlow production deployment skills are in high demand with strong salaries. In India, TensorFlow ML engineers earn ₹15–40 LPA at product and enterprise companies. The Keras skill specifically opens doors to data science roles at companies that prioritise rapid prototyping.`,

    future: `TensorFlow's core strength is production deployment — TF Serving, TF Lite, TFX pipelines, and SavedModel format are mature, battle-tested tools. As ML moves from research to scaled production, these deployment capabilities become more critical. Google's investment is unwavering; TensorFlow 3.x continues active development. While PyTorch leads in research, TensorFlow's production tooling keeps it essential in enterprise settings for the foreseeable future.`,

    difficulty: `Keras (the high-level API) is one of the gentlest entry points into deep learning — you can build and train a neural network in 20 lines of code. Most learners are productive with Keras in 4–6 weeks. TensorFlow proper (custom training loops, tf.function, distributed training, SavedModel format) takes 3–4 months to feel comfortable with. The transition from Keras to full TensorFlow is manageable if you tackle it incrementally.`,

    career: `Roles include: ML Engineer, Data Scientist, AI Developer, Computer Vision Engineer, and Mobile ML Engineer. Strong fit for roles at Google-ecosystem companies (GCP), healthcare AI companies, fintech, and organisations that have already standardised on TensorFlow. TF Lite skills specifically are valuable for IoT, edge computing, and mobile AI roles — a growing category as AI moves to the edge.`,
  },

  'hugging-face-transformers': {
    why: `Hugging Face is the GitHub of AI — hosting 500,000+ pretrained models, 100,000+ datasets, and the Transformers library that makes state-of-the-art NLP accessible in 5 lines of code. Instead of training BERT or GPT from scratch (millions of dollars of compute), you load a pretrained model and fine-tune it on your data in hours. It's the fastest path from idea to production NLP, and it's become the universal standard for the AI community.`,

    scope: `Hugging Face is used by 100,000+ organisations including Google, Meta, Microsoft, Amazon, and NASA. It's mentioned in virtually every NLP and GenAI job posting — both as a required skill and as the tool teams are actively using. The platform hosts the weights for LLaMA, Mistral, Falcon, Stable Diffusion, and thousands of other foundation models. For any role involving text AI, computer vision AI, or audio AI, Hugging Face is the toolkit.`,

    salary: `NLP/GenAI engineers with Hugging Face expertise earn $130,000–$215,000 in the US. Because Hugging Face bridges cutting-edge research with production deployment, engineers who master it can work at both AI labs and enterprise companies. In India, Hugging Face-skilled engineers at AI product companies earn ₹18–45 LPA. The expanding scope beyond NLP to vision and audio is creating new role categories with premium pay.`,

    future: `The Hugging Face ecosystem is expanding aggressively: beyond NLP into images (DALL-E, Stable Diffusion), audio (Whisper, MusicGen), video (Stable Video Diffusion), and robotics. Their Inference Endpoints and Serverless API are becoming the default deployment layer for open-source AI. The rise of open-source models competing with closed APIs (LLaMA vs GPT-4, Mistral vs Claude) strengthens Hugging Face's position as the neutral platform. Essential for the open-source AI movement of 2025–2030.`,

    difficulty: `The high-level pipeline API (`pipeline('sentiment-analysis')`) can produce results in 2 days with no prior ML experience. Fine-tuning a pretrained model with the Trainer API takes 2–4 weeks to learn. Advanced topics — LoRA/QLoRA fine-tuning, PEFT, custom training loops, quantisation, and deployment with optimum — take 2–3 months. It's one of the most accessible entry points into production AI with an excellent community, documentation (docs.huggingface.co), and free tutorials.`,

    career: `Roles include: NLP Engineer, GenAI Engineer, AI Developer, ML Engineer, and Conversational AI Engineer. Any role involving text generation, classification, summarisation, translation, question answering, or semantic search at scale will involve Hugging Face. Particularly strong fit for startups building AI products on open-source models (cost efficiency vs closed APIs), and for enterprise companies wanting model customisation without vendor lock-in.`,
  },
}

/**
 * Checks if a user message matches a pre-defined FAQ for the given course slug.
 * Returns the answer string if matched, null if no intent was detected.
 */
export function matchFAQ(slug: string, message: string): string | null {
  const answers = COURSE_FAQ[slug]
  if (!answers) return null

  const intent = detectIntent(message)
  if (!intent) return null

  return answers[intent] ?? null
}

// ─── Chat UI helpers ──────────────────────────────────────────────────────────

export interface QuickReply {
  label: string
  question: string
}

export const QUICK_REPLIES: QuickReply[] = [
  { label: '🎯 Why Learn?',      question: 'Why should I learn this skill?' },
  { label: '📊 Scope & Demand',  question: 'What is the job scope and market demand?' },
  { label: '💰 Salary',          question: 'What salary can I earn with this skill?' },
  { label: '🔮 Future Outlook',  question: 'What is the future of this skill?' },
  { label: '📚 How Hard?',       question: 'How hard is it to learn and how long does it take?' },
  { label: '🚀 Career Paths',    question: 'What career paths and job roles does this open up?' },
]

export const DEFLECTION_REPLY =
  "I'm your course advisor and can only answer specific questions about this skill — scope, salary, future outlook, difficulty, and career paths. Please choose a topic below or rephrase your question around those areas."
