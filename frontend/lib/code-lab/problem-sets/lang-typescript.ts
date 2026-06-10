// TypeScript starter scaffolds. The hidden test code for TypeScript reuses the
// JavaScript suites verbatim: the backend executes TS with type stripping
// (node --experimental-strip-types), so the untyped harness runs unchanged.
// Linked-list/tree starters declare type-only interfaces — they are erased at
// run time, so they never clash with the runtime classes the tests define.

const LIST_DOC = `// The ListNode class is provided by the runner.
interface ListNode { val: number; next: ListNode | null }
`

const TREE_DOC = `// The TreeNode class is provided by the runner.
interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null }
`

export const TS_PACK: Record<string, { starter: string }> = {
  'two-sum': { starter: `function twoSum(nums: number[], target: number): number[] {

}
` },
  'best-time-stock': { starter: `function maxProfit(prices: number[]): number {

}
` },
  'product-except-self': { starter: `function productExceptSelf(nums: number[]): number[] {

}
` },
  'maximum-subarray': { starter: `function maxSubarray(nums: number[]): number {

}
` },
  'merge-intervals': { starter: `function mergeIntervals(intervals: number[][]): number[][] {

}
` },
  'first-missing-positive': { starter: `function firstMissingPositive(nums: number[]): number {

}
` },
  'valid-palindrome': { starter: `function isPalindrome(s: string): boolean {

}
` },
  'three-sum': { starter: `function threeSum(nums: number[]): number[][] {

}
` },
  'container-most-water': { starter: `function maxArea(height: number[]): number {

}
` },
  'trapping-rain-water': { starter: `function trap(height: number[]): number {

}
` },
  'longest-substring-no-repeat': { starter: `function lengthOfLongestSubstring(s: string): number {

}
` },
  'sliding-window-maximum': { starter: `function maxSlidingWindow(nums: number[], k: number): number[] {

}
` },
  'minimum-window-substring': { starter: `function minWindow(s: string, t: string): string {

}
` },
  'group-anagrams': { starter: `function groupAnagrams(strs: string[]): string[][] {

}
` },
  'top-k-frequent': { starter: `function topKFrequent(nums: number[], k: number): number[] {

}
` },
  'longest-consecutive-sequence': { starter: `function longestConsecutive(nums: number[]): number {

}
` },
  'valid-parentheses': { starter: `function isValid(s: string): boolean {

}
` },
  'daily-temperatures': { starter: `function dailyTemperatures(temperatures: number[]): number[] {

}
` },
  'largest-rectangle-histogram': { starter: `function largestRectangleArea(heights: number[]): number {

}
` },
  'reverse-linked-list': { starter: `${LIST_DOC}
function reverseList(head: ListNode | null): ListNode | null {

}
` },
  'linked-list-cycle': { starter: `${LIST_DOC}
function hasCycle(head: ListNode | null): boolean {

}
` },
  'merge-k-sorted-lists': { starter: `${LIST_DOC}
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {

}
` },
  'max-depth-binary-tree': { starter: `${TREE_DOC}
function maxDepth(root: TreeNode | null): number {

}
` },
  'validate-bst': { starter: `${TREE_DOC}
function isValidBST(root: TreeNode | null): boolean {

}
` },
  'level-order-traversal': { starter: `${TREE_DOC}
function levelOrder(root: TreeNode | null): number[][] {

}
` },
  'binary-tree-max-path-sum': { starter: `${TREE_DOC}
function maxPathSum(root: TreeNode | null): number {

}
` },
  'number-of-islands': { starter: `function numIslands(grid: string[][]): number {

}
` },
  'course-schedule': { starter: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {

}
` },
  'word-ladder': { starter: `function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {

}
` },
  'climbing-stairs': { starter: `function climbStairs(n: number): number {

}
` },
  'house-robber': { starter: `function rob(nums: number[]): number {

}
` },
  'coin-change': { starter: `function coinChange(coins: number[], amount: number): number {

}
` },
  'longest-increasing-subsequence': { starter: `function lengthOfLIS(nums: number[]): number {

}
` },
  'edit-distance': { starter: `function minDistance(word1: string, word2: string): number {

}
` },
  'regex-matching': { starter: `function isMatch(s: string, p: string): boolean {

}
` },
  'palindrome-number': { starter: `function isPalindromeNumber(x: number): boolean {

}
` },
  'basic-calculator': { starter: `function calculate(s: string): number {

}
` },
  'single-number': { starter: `function singleNumber(nums: number[]): number {

}
` },
  'counting-bits': { starter: `function countBits(n: number): number[] {

}
` },
  'binary-search': { starter: `function search(nums: number[], target: number): number {

}
` },
  'search-rotated-array': { starter: `function searchRotated(nums: number[], target: number): number {

}
` },
  'kth-largest-element': { starter: `function findKthLargest(nums: number[], k: number): number {

}
` },
  'median-two-sorted-arrays': { starter: `function findMedianSortedArrays(nums1: number[], nums2: number[]): number {

}
` },
  'min-stack': { starter: `class MinStack {
  constructor() {

  }

  push(val: number): void {

  }

  pop(): void {

  }

  top(): number {
    return 0
  }

  getMin(): number {
    return 0
  }
}
` },
  'lru-cache': { starter: `class LRUCache {
  constructor(capacity: number) {

  }

  get(key: number): number {
    return -1
  }

  put(key: number, value: number): void {

  }
}
` },
  'subsets': { starter: `function subsets(nums: number[]): number[][] {

}
` },
  'combination-sum': { starter: `function combinationSum(candidates: number[], target: number): number[][] {

}
` },
  'n-queens': { starter: `function solveNQueens(n: number): string[][] {

}
` },
  'knn-classifier': { starter: `function knnPredict(XTrain: number[][], yTrain: number[], x: number[], k: number): number {

}
` },
  'gradient-descent-linear': { starter: `function gradientDescent(X: number[], y: number[], lr: number = 0.01, epochs: number = 5000): number[] {

}
` },
}
