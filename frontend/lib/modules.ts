// Course module grouping — the single source of truth for how a flat, ordered
// list of lessons is presented as a handful of named "modules" (Udacity-style),
// instead of one long list. Purely derived from lesson order + count, so every
// course — including ones generated in the future — groups automatically with
// no per-course configuration.

export interface CourseModule<T> {
  title: string
  subtitle: string
  lessons: T[]
  /** Global index (0-based) of this module's first lesson in the flat list. */
  startIndex: number
}

// The learning-journey arc. We always include the first and last phase and
// sample evenly in between, so a course reads Foundations → … → Capstone
// regardless of how many modules it ends up with.
const PHASES: { title: string; subtitle: string }[] = [
  { title: 'Foundations',        subtitle: 'Core concepts and groundwork' },
  { title: 'Core Skills',        subtitle: 'Essential techniques and patterns' },
  { title: 'Applied Practice',   subtitle: 'Hands-on, real-world scenarios' },
  { title: 'Advanced Topics',    subtitle: 'Deeper, more complex material' },
  { title: 'Production & Scale',  subtitle: 'Building for the real world' },
  { title: 'Mastery & Capstone', subtitle: 'Projects and final review' },
]

const TARGET_LESSONS_PER_MODULE = 6

/** How many modules to split `count` lessons into (1..PHASES.length). */
function moduleCountFor(count: number): number {
  if (count <= 1) return Math.max(count, 0)
  const desired = Math.ceil(count / TARGET_LESSONS_PER_MODULE)
  return Math.min(PHASES.length, Math.max(2, desired))
}

/** Pick `n` phase names, always keeping the first and last of the arc. */
function pickPhases(n: number): typeof PHASES {
  if (n >= PHASES.length) return PHASES.slice(0, n)
  if (n === 1) return [PHASES[0]]
  const out: typeof PHASES = []
  for (let i = 0; i < n; i++) {
    out.push(PHASES[Math.round((i * (PHASES.length - 1)) / (n - 1))])
  }
  return out
}

/**
 * Group an ordered list of lessons into named modules. Lessons are split into
 * contiguous, balanced chunks (larger chunks first when it doesn't divide
 * evenly), preserving the original order.
 */
export function groupLessonsIntoModules<T>(lessons: T[]): CourseModule<T>[] {
  if (lessons.length === 0) return []

  const count = moduleCountFor(lessons.length)
  const phases = pickPhases(count)

  const base = Math.floor(lessons.length / count)
  let remainder = lessons.length % count

  const modules: CourseModule<T>[] = []
  let cursor = 0
  for (let i = 0; i < count; i++) {
    const size = base + (remainder > 0 ? 1 : 0)
    if (remainder > 0) remainder--
    modules.push({
      title: phases[i].title,
      subtitle: phases[i].subtitle,
      lessons: lessons.slice(cursor, cursor + size),
      startIndex: cursor,
    })
    cursor += size
  }
  return modules
}
