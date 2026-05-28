# SkillForge AI — AI-Powered Upskilling Platform

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Anthropic API Key

### Setup

1. Clone the repo
2. Copy env file: `cp .env.example .env`
3. Add your Anthropic API key to `.env`
4. Run: `docker compose up -d`
5. Open: http://localhost:3000

### Services
| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:3001 |
| API Docs | http://localhost:3001/api/docs |
| AI Worker | http://localhost:8000 |

### Development (without Docker)

**Backend:**
```bash
cd backend
cp .env.example .env  # fill in values
npm install
npm run start:dev
```

**AI Worker:**
```bash
cd ai-worker
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
