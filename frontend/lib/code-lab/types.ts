export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'

export type Category =
  | 'Arrays & Strings'
  | 'Two Pointers'
  | 'Sliding Window'
  | 'Hash Tables'
  | 'Stacks & Queues'
  | 'Linked Lists'
  | 'Trees'
  | 'Graphs'
  | 'Dynamic Programming'
  | 'Math & Numbers'
  | 'Bit Manipulation'
  | 'Recursion & Backtracking'
  | 'Sorting & Searching'
  | 'OOP & Design'
  | 'AI / ML Algorithms'

export type Language = 'python' | 'javascript' | 'typescript' | 'java' | 'go' | 'cpp'

export interface CodeLabProblem {
  id: string
  num: number
  title: string
  difficulty: Difficulty
  category: Category
  description: string   // markdown-lite (bold **x**, code `x`)
  examples: Array<{ input: string; output: string; explanation?: string }>
  constraints: string[]
  starterCode: Partial<Record<Language, string>>  // includes embedded test harness
  hints: string[]
  tags: string[]
  timeComplexity?: string
  spaceComplexity?: string
}

export interface TestResult {
  num: number
  passed: boolean
  description: string
}

export interface ValidationResult {
  passed: boolean
  score: number        // 0–100
  passedTests: number
  totalTests: number
  testResults: TestResult[]
  feedback: string
  errorHint?: {
    title: string
    cause: string
    fix: string
    example?: string
  }
}
