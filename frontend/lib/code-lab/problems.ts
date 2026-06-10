import type { CodeLabProblem } from './types'
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

export const PROBLEMS: CodeLabProblem[] = [
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
].map((p, i) => ({ ...p, num: i + 1 }))
