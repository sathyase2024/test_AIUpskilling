# SkillForge AI — Full-Stack Upskilling Platform

> AI-powered personalized learning with Claude, NestJS, PostgreSQL, and Next.js

## 🚀 Quick Start (Docker)

### Prerequisites
- Docker Desktop
- Anthropic API Key ([get one here](https://console.anthropic.com))

### 1. Clone & Configure
```bash
git clone https://github.com/sathyase2024/test_AIUpskilling
cd test_AIUpskilling
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

### 2. Start Everything
```bash
docker compose up -d
```

### 3. Open the App
| Service | URL |
|---------|-----|
| 🎨 Frontend | http://localhost:3000 |
| ⚙️ Backend API | http://localhost:3001 |
| 📚 API Docs | http://localhost:3001/api/docs |
| 🤖 AI Worker | http://localhost:8000 |

## 🛠️ Local Development

**Backend (NestJS):**
```bash
cd backend && cp .env.example .env
npm install && npm run start:dev
```

**AI Worker (FastAPI + Claude):**
```bash
cd ai-worker && cp .env.example .env
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Frontend (Next.js):**
```bash
cd frontend
NEXT_PUBLIC_API_URL=http://localhost:3001 npm run dev
```

## 🏗️ Architecture
- **Frontend**: Next.js 16, TailwindCSS, TypeScript
- **Backend**: NestJS, TypeORM, PostgreSQL, JWT Auth
- **AI Worker**: FastAPI, Anthropic Claude API (claude-sonnet-4-6)
- **Infrastructure**: Docker Compose

## ✨ Features
- 🔐 User auth (signup/login/JWT)
- 📚 65 topics across 10 categories
- 🤖 AI-generated lesson content via Claude
- 💻 Code Lab with Monaco Editor + AI review
- 📈 Progress tracking & XP system
- 🎯 8 career learning paths
- 🎮 Hobby-personalized learning
