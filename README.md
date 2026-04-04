# AI Upskilling Platform

Production-ready Next.js application for personalized AI upskilling using a modular 3-agent architecture.

## Core capabilities

- Multi-step onboarding flow:
  - Interest
  - Experience level
  - Goal
  - Time commitment
- Agent system:
  - **Agent 1** Personalization Agent
  - **Agent 2** Content Generation Agent
  - **Agent 3** Validation Agent
- Iterative agentic loop:
  - Regenerate while `score < 85 && iteration < 3`
- Module structure:
  - Concept, Analogy, Example, Exercise, Quiz, Notes
- Interactive dark UI with tabbed progressive reveal and quiz scoring
- SQLite persistence via Prisma for local development
- Two-level caching:
  - Course cache per `userId + profile fingerprint`
  - Module cache per `userId + profile + module`
- Streaming generation endpoint (SSE)
- AI provider abstraction (mock/openai/claude compatible)

## Folder structure

```txt
app/
  api/course/
    [id]/route.ts
    generate/route.ts
    generate/stream/route.ts
  globals.css
  layout.tsx
  page.tsx
components/
  CourseBuilderApp.tsx
  ModuleViewer.tsx
  OnboardingForm.tsx
docs/
  sample-output.json
lib/
  agents/
    contentGenerationAgent.ts
    courseOrchestrator.ts
    personalizationAgent.ts
    prompts.ts
    validationAgent.ts
  ai/providers/
    adapters.ts
    base.ts
    factory.ts
  courseRepository.ts
  env.ts
  prisma.ts
  types.ts
  utils/hash.ts
prisma/
  schema.prisma
```

## Environment

Create `.env`:

```bash
DATABASE_URL="file:./prisma/dev.db"
AI_PROVIDER="mock" # mock | openai | claude
AI_API_KEY=""
AI_MODEL="gpt-4o-mini"
AI_BASE_URL="https://api.openai.com/v1"

# optional provider-specific overrides
OPENAI_API_KEY=""
OPENAI_MODEL="gpt-4o-mini"
OPENAI_BASE_URL="https://api.openai.com/v1"
CLAUDE_API_KEY=""
CLAUDE_MODEL="claude-3-5-sonnet-latest"
CLAUDE_BASE_URL="https://api.openai.com/v1"
```

## Run

```bash
npm install
npm run prisma:generate
npx prisma db push
npm run dev
```

## API

### POST `/api/course/generate`

Request:

```json
{
  "userId": "user-001",
  "profile": {
    "interest": "Machine Learning",
    "experience_level": "Beginner",
    "goal": "Job prep",
    "time_commitment": 6
  },
  "moduleCount": 4
}
```

Response:

```json
{
  "source": "generated",
  "generatedCourse": { "...": "course payload" }
}
```

### POST `/api/course/generate/stream`

Request:

```json
{
  "userId": "user-001",
  "profile": {
    "interest": "Machine Learning",
    "experience_level": "Beginner",
    "goal": "Job prep",
    "time_commitment": 6
  }
}
```

SSE events:
- `status`
- `module:start`
- `module:iteration`
- `module:done`
- `done`

### GET `/api/course/:id?userId=user-001`

Fetches a saved course by ID and optional user scope.

## Prompt templates

Implemented in `lib/agents/prompts.ts`:
- personalization template
- content template
- validation template

## Scalability notes

- Stateless API routes
- DB-backed caching strategy for unchanged profiles/modules
- Provider abstraction keeps model switching low-risk
- Prisma singleton for efficient connection reuse
- Incremental streaming updates for better UX under AI latency

## Sample output

See `docs/sample-output.json`.
