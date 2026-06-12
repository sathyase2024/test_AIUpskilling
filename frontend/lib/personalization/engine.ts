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

// Registry — each entry is a lazy import so only the needed course loads
const COURSE_REGISTRY: Record<string, () => Promise<{ default: CourseAnalogies }>> = {
  'pytorch-deep-learning':         () => import('./analogies/pytorch-deep-learning'),
  'large-language-models':         () => import('./analogies/large-language-models'),
  'hugging-face-transformers':     () => import('./analogies/hugging-face-transformers'),
  'tensorflow-keras':              () => import('./analogies/tensorflow-keras'),
  'retrieval-augmented-generation':() => import('./analogies/retrieval-augmented-generation'),
  'ai-agents-agentic-workflows':   () => import('./analogies/ai-agents-agentic-workflows'),
}

export async function getCourseAnalogies(slug: string): Promise<CourseAnalogies | null> {
  const loader = COURSE_REGISTRY[slug]
  if (!loader) return null
  try {
    const mod = await loader()
    return mod.default
  } catch {
    return null
  }
}

export function getAnalogy(
  analogies: CourseAnalogies,
  conceptId: string,
  domain: InterestDomain,
): string {
  const concept = analogies.concepts.find(c => c.id === conceptId)
  return concept ? concept[domain] : ''
}

export function registerCourse(
  slug: string,
  loader: () => Promise<{ default: CourseAnalogies }>,
): void {
  COURSE_REGISTRY[slug] = loader
}

export const ALL_DOMAINS: InterestDomain[] = [
  'cricket','gaming','music','photography','travel',
  'movies','fitness','chess','cooking','finance','business','sports',
]

export const DOMAIN_LABELS: Record<InterestDomain, string> = {
  cricket:     'Cricket',
  gaming:      'Gaming',
  music:       'Music',
  photography: 'Photography',
  travel:      'Travel',
  movies:      'Movies',
  fitness:     'Fitness',
  chess:       'Chess',
  cooking:     'Cooking',
  finance:     'Finance',
  business:    'Business',
  sports:      'Sports',
}

export const DOMAIN_ICONS: Record<InterestDomain, string> = {
  cricket:     '🏏',
  gaming:      '🎮',
  music:       '🎵',
  photography: '📷',
  travel:      '✈️',
  movies:      '🎬',
  fitness:     '💪',
  chess:       '♟️',
  cooking:     '👨‍🍳',
  finance:     '📈',
  business:    '💼',
  sports:      '⚽',
}
