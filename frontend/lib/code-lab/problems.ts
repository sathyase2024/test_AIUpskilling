import type { CodeLabProblem, Language } from './types'
import { ARRAYS_STRINGS } from './problem-sets/arrays-strings'
import { TWO_POINTERS } from './problem-sets/two-pointers'
import { SLIDING_WINDOW } from './problem-sets/sliding-window'
import { HASH_TABLES } from './problem-sets/hash-tables'
import { STACKS_QUEUES } from './problem-sets/stacks-queues'
import { LINKED_LISTS } from './problem-sets/linked-lists'
import { TREES } from './problem-sets/trees'
import { GRAPHS } from './problem-sets/graphs'
import { DYNAMIC_PROGRAMMING } from './problem-sets/dynamic-programming'
import { MATH_NUMBERS } from './problem-sets/math-numbers'
import { BIT_MANIPULATION } from './problem-sets/bit-manipulation'
import { SORTING_SEARCHING } from './problem-sets/sorting-searching'
import { OOP_DESIGN } from './problem-sets/oop-design'
import { RECURSION_BACKTRACKING } from './problem-sets/recursion-backtracking'
import { ML_ALGORITHMS } from './problem-sets/ml-algorithms'
import { TS_PACK } from './problem-sets/lang-typescript'
import { JAVA_PACK } from './problem-sets/lang-java'
import { GO_PACK } from './problem-sets/lang-go'
import { CPP_PACK } from './problem-sets/lang-cpp'

const ALL = [
  ...ARRAYS_STRINGS,
  ...TWO_POINTERS,
  ...SLIDING_WINDOW,
  ...HASH_TABLES,
  ...STACKS_QUEUES,
  ...LINKED_LISTS,
  ...TREES,
  ...GRAPHS,
  ...DYNAMIC_PROGRAMMING,
  ...MATH_NUMBERS,
  ...BIT_MANIPULATION,
  ...SORTING_SEARCHING,
  ...OOP_DESIGN,
  ...RECURSION_BACKTRACKING,
  ...ML_ALGORITHMS,
]

// Per-language packs (starter scaffold + hidden test suite). TypeScript only
// defines starters: its hidden tests reuse the JavaScript suites verbatim,
// since the backend executes TS via type stripping.
const PACKS: Array<[Language, Record<string, { starter: string; tests?: string }>]> = [
  ['typescript', TS_PACK],
  ['java', JAVA_PACK],
  ['go', GO_PACK],
  ['cpp', CPP_PACK],
]

export const PROBLEMS: CodeLabProblem[] = ALL.map((p, i) => {
  const starterCode = { ...p.starterCode }
  const testCode = { ...p.testCode }
  for (const [lang, pack] of PACKS) {
    const entry = pack[p.id]
    if (!entry) continue
    const tests = entry.tests ?? (lang === 'typescript' ? p.testCode.javascript : undefined)
    if (!tests) continue
    starterCode[lang] = entry.starter
    testCode[lang] = tests
  }
  return { ...p, num: i + 1, starterCode, testCode }
})
