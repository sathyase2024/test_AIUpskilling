# Personalize Course — AI Analogy Engine

Generate personalized analogies for every concept in a course, mapping from the
canonical cricket analogy to all 11 interest domains. Run this after generating
or updating any course content.

## Usage

```
/personalize-course <topic-slug>
```

Example:
```
/personalize-course pytorch-deep-learning
/personalize-course large-language-models
```

If no slug is given, use `$ARGUMENTS`. If still empty, ask the user which course to personalize.

---

## Steps to execute

### 1. Discover course concepts

Read the course lesson content from the backend data or any existing lesson files
under `frontend/app/learn/` and `frontend/lib/`. The slug is: **$ARGUMENTS**

Search for:
- Files named after the slug
- contentJson fields with `concepts`, `title`, `sections`, `keyTakeaways`
- Any TypeScript/JSON that contains lessons for this course

If the course is served dynamically from the backend, extract concept names from
the lesson titles and descriptions stored in `frontend/lib/data.ts` or the
course FAQ file.

### 2. Extract concepts list

From the discovered content, produce a list of 8–20 core concepts taught in this
course. Examples for "pytorch-deep-learning":
- Tensors, Autograd, Neural Network layers, Loss functions, Optimizers,
  Training loop, Overfitting, Regularization, CNNs, Transfer learning

### 3. Generate analogies for all 11 domains

For each concept, generate a short (1–2 sentence) analogy in EVERY domain:

| Domain | Lens |
|--------|------|
| cricket | The canonical source — always provided as reference |
| gaming | Video games, RPGs, strategy games, esports |
| music | Instruments, production, composition, live performance |
| photography | Camera settings, composition, editing, lighting |
| travel | Navigation, packing, itineraries, exploration |
| movies | Directing, cinematography, scriptwriting, editing |
| fitness | Training, reps, form, recovery, progressive overload |
| chess | Openings, tactics, strategy, endgame |
| cooking | Recipes, ingredients, techniques, seasoning |
| finance | Investing, risk, portfolio, returns, compounding |
| business | Startups, products, teams, strategy, metrics |
| sports | (non-cricket) Football, basketball, athletics — general |

Quality bar:
- Each analogy must be concrete and specific — no vague metaphors
- The analogy should make the concept *immediately intuitive* for someone in that domain
- Keep it under 40 words per analogy
- Do not repeat the same analogy across domains

### 4. Write the output file

Write the analogies to:
```
frontend/lib/personalization/analogies/<slug>.ts
```

Use this exact TypeScript structure:

```typescript
import type { CourseAnalogies } from '../engine'

const analogies: CourseAnalogies = {
  courseSlug: '<slug>',
  courseTitle: '<Full Course Title>',
  concepts: [
    {
      id: 'concept-id',          // kebab-case
      name: 'Concept Name',
      cricket: 'Cricket analogy here.',
      gaming: 'Gaming analogy here.',
      music: 'Music analogy here.',
      photography: 'Photography analogy here.',
      travel: 'Travel analogy here.',
      movies: 'Movies analogy here.',
      fitness: 'Fitness analogy here.',
      chess: 'Chess analogy here.',
      cooking: 'Cooking analogy here.',
      finance: 'Finance analogy here.',
      business: 'Business analogy here.',
      sports: 'Sports analogy here.',
    },
    // ... more concepts
  ],
}

export default analogies
```

### 5. Register the course in the engine index

Open `frontend/lib/personalization/engine.ts` and add an import + entry for the
new course in the `COURSE_REGISTRY` map. If the file does not exist yet, create
it using the template below.

### 6. Confirm completion

Print a summary:
- Course slug processed
- Number of concepts generated
- Domains covered
- File path written

---

## engine.ts template (create if missing)

```typescript
export type InterestDomain =
  | 'cricket' | 'gaming' | 'music' | 'photography' | 'travel'
  | 'movies' | 'fitness' | 'chess' | 'cooking' | 'finance'
  | 'business' | 'sports'

export interface ConceptAnalogy {
  id: string
  name: string
  cricket: string
  gaming: string
  music: string
  photography: string
  travel: string
  movies: string
  fitness: string
  chess: string
  cooking: string
  finance: string
  business: string
  sports: string
}

export interface CourseAnalogies {
  courseSlug: string
  courseTitle: string
  concepts: ConceptAnalogy[]
}

// Registry — add each course here after running /personalize-course
const COURSE_REGISTRY: Record<string, () => Promise<CourseAnalogies>> = {}

export async function getCourseAnalogies(slug: string): Promise<CourseAnalogies | null> {
  const loader = COURSE_REGISTRY[slug]
  if (!loader) return null
  return loader()
}

export function getAnalogy(
  analogies: CourseAnalogies,
  conceptId: string,
  domain: InterestDomain,
): string {
  const concept = analogies.concepts.find(c => c.id === conceptId)
  return concept ? concept[domain] : ''
}

export const DOMAIN_LABELS: Record<InterestDomain, string> = {
  cricket: 'Cricket',
  gaming: 'Gaming',
  music: 'Music',
  photography: 'Photography',
  travel: 'Travel',
  movies: 'Movies',
  fitness: 'Fitness',
  chess: 'Chess',
  cooking: 'Cooking',
  finance: 'Finance',
  business: 'Business',
  sports: 'Sports',
}

export const DOMAIN_ICONS: Record<InterestDomain, string> = {
  cricket: '🏏',
  gaming: '🎮',
  music: '🎵',
  photography: '📷',
  travel: '✈️',
  movies: '🎬',
  fitness: '💪',
  chess: '♟️',
  cooking: '👨‍🍳',
  finance: '📈',
  business: '💼',
  sports: '⚽',
}
```
