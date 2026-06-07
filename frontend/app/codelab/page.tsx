'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import {
  Terminal,
  Play,
  Send,
  Save,
  Sparkles,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  MemoryStick,
  Lightbulb,
  Code2,
  Sun,
  Moon,
  AlertCircle,
} from 'lucide-react'

// ─── Dynamic Monaco Editor (SSR disabled) ────────────────────────────────────

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-[#1e1e1e]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-purple-500/40 border-t-purple-500 rounded-full animate-spin" />
        <span className="text-white/40 text-sm font-mono">Loading editor…</span>
      </div>
    </div>
  ),
})

// ─── Types ───────────────────────────────────────────────────────────────────

type Language = 'python' | 'javascript' | 'typescript' | 'java' | 'go' | 'cpp'
type EditorTheme = 'vs-dark' | 'light'
type ActiveTab = 'output' | 'review' | 'testcases'
type TestStatus = 'passed' | 'failed' | 'pending'

interface TestCase {
  id: number
  input: string
  expected: string
  actual: string
  status: TestStatus
}

// ─── Starter Code ─────────────────────────────────────────────────────────────

const STARTER_CODE: Record<Language, string> = {
  python: `# Two Sum Problem
# Given an array of integers nums and an integer target,
# return indices of the two numbers such that they add up to target.
#
# Time Complexity: O(n)  |  Space Complexity: O(n)

from typing import List

def two_sum(nums: List[int], target: int) -> List[int]:
    """
    Uses a hash map to store complement indices.
    Returns [i, j] where nums[i] + nums[j] == target.
    """
    seen = {}  # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []  # No solution found


# ─── Test your solution ──────────────────────────────────
if __name__ == "__main__":
    print(two_sum([2, 7, 11, 15], 9))   # Expected: [0, 1]
    print(two_sum([3, 2, 4], 6))         # Expected: [1, 2]
    print(two_sum([3, 3], 6))            # Expected: [0, 1]
`,

  javascript: `// Two Sum Problem
// Given an array of integers nums and an integer target,
// return indices of the two numbers such that they add up to target.
//
// Time Complexity: O(n)  |  Space Complexity: O(n)

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  const seen = new Map(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }

  return []; // No solution found
}

// ─── Test your solution ──────────────────────────────────
console.log(twoSum([2, 7, 11, 15], 9));  // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6));        // Expected: [1, 2]
console.log(twoSum([3, 3], 6));           // Expected: [0, 1]
`,

  typescript: `// Two Sum Problem
// Given an array of integers nums and an integer target,
// return indices of the two numbers such that they add up to target.
//
// Time Complexity: O(n)  |  Space Complexity: O(n)

function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const complement: number = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement)!, i];
    }
    seen.set(nums[i], i);
  }

  return []; // No solution found
}

// ─── Test your solution ──────────────────────────────────
console.log(twoSum([2, 7, 11, 15], 9));  // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6));        // Expected: [1, 2]
console.log(twoSum([3, 3], 6));           // Expected: [0, 1]
`,

  java: `// Two Sum Problem
// Given an array of integers nums and an integer target,
// return indices of the two numbers such that they add up to target.
//
// Time Complexity: O(n)  |  Space Complexity: O(n)

import java.util.HashMap;
import java.util.Arrays;

public class Solution {

    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> seen = new HashMap<>(); // value -> index

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            seen.put(nums[i], i);
        }

        return new int[] {}; // No solution found
    }

    // ─── Test your solution ──────────────────────────────
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(Arrays.toString(sol.twoSum(new int[]{2,7,11,15}, 9))); // [0, 1]
        System.out.println(Arrays.toString(sol.twoSum(new int[]{3,2,4}, 6)));     // [1, 2]
        System.out.println(Arrays.toString(sol.twoSum(new int[]{3,3}, 6)));       // [0, 1]
    }
}
`,

  go: `// Two Sum Problem
// Given an array of integers nums and an integer target,
// return indices of the two numbers such that they add up to target.
//
// Time Complexity: O(n)  |  Space Complexity: O(n)

package main

import "fmt"

func twoSum(nums []int, target int) []int {
	seen := make(map[int]int) // value -> index

	for i, num := range nums {
		complement := target - num
		if j, ok := seen[complement]; ok {
			return []int{j, i}
		}
		seen[num] = i
	}

	return []int{} // No solution found
}

// ─── Test your solution ──────────────────────────────────
func main() {
	fmt.Println(twoSum([]int{2, 7, 11, 15}, 9)) // [0 1]
	fmt.Println(twoSum([]int{3, 2, 4}, 6))       // [1 2]
	fmt.Println(twoSum([]int{3, 3}, 6))           // [0 1]
}
`,

  cpp: `// Two Sum Problem
// Given an array of integers nums and an integer target,
// return indices of the two numbers such that they add up to target.
//
// Time Complexity: O(n)  |  Space Complexity: O(n)

#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen; // value -> index

    for (int i = 0; i < (int)nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.count(complement)) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }

    return {}; // No solution found
}

// ─── Test your solution ──────────────────────────────────
int main() {
    vector<int> a = {2, 7, 11, 15};
    auto r1 = twoSum(a, 9);
    cout << "[" << r1[0] << ", " << r1[1] << "]" << endl; // [0, 1]

    vector<int> b = {3, 2, 4};
    auto r2 = twoSum(b, 6);
    cout << "[" << r2[0] << ", " << r2[1] << "]" << endl; // [1, 2]

    vector<int> c = {3, 3};
    auto r3 = twoSum(c, 6);
    cout << "[" << r3[0] << ", " << r3[1] << "]" << endl; // [0, 1]

    return 0;
}
`,
}

// ─── Language display metadata ────────────────────────────────────────────────

const LANGUAGE_META: Record<Language, { label: string; monacoLang: string }> = {
  python:     { label: 'Python',     monacoLang: 'python' },
  javascript: { label: 'JavaScript', monacoLang: 'javascript' },
  typescript: { label: 'TypeScript', monacoLang: 'typescript' },
  java:       { label: 'Java',       monacoLang: 'java' },
  go:         { label: 'Go',         monacoLang: 'go' },
  cpp:        { label: 'C++',        monacoLang: 'cpp' },
}

// ─── Mock test cases ──────────────────────────────────────────────────────────

const INITIAL_TEST_CASES: TestCase[] = [
  { id: 1, input: 'nums=[2,7,11,15], target=9',  expected: '[0,1]', actual: '', status: 'pending' },
  { id: 2, input: 'nums=[3,2,4], target=6',       expected: '[1,2]', actual: '', status: 'pending' },
  { id: 3, input: 'nums=[3,3], target=6',          expected: '[0,1]', actual: '', status: 'pending' },
]

// ─── API base ─────────────────────────────────────────────────────────────────

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// ─── Types ─────────────────────────────────────────────────────────────────────

interface AIReviewResult {
  review: string
  suggestions: string[]
  score: number
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function CodeLabPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('python')
  const [code, setCode] = useState<string>(STARTER_CODE.python)
  const [theme, setTheme] = useState<EditorTheme>('vs-dark')
  const [activeTab, setActiveTab] = useState<ActiveTab>('output')
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState<string | null>(null)
  const [showHints, setShowHints] = useState(false)
  const [testCases, setTestCases] = useState<TestCase[]>(INITIAL_TEST_CASES)
  const [showTestCases, setShowTestCases] = useState(true)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const [aiReview, setAiReview] = useState<AIReviewResult | null>(null)
  const [reviewLoading, setReviewLoading] = useState(false)
  const [reviewError, setReviewError] = useState<string | null>(null)

  // Derived editor stats
  const lineCount = code.split('\n').length
  const charCount = code.length

  // Sync code when language changes
  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang)
    setCode(STARTER_CODE[lang])
    setOutput(null)
    setTestCases(INITIAL_TEST_CASES)
    setLangDropdownOpen(false)
    setAiReview(null)
    setReviewError(null)
  }

  // Mock run behavior
  const handleRun = () => {
    setIsRunning(true)
    setActiveTab('output')

    setTimeout(() => {
      setIsRunning(false)
      setOutput(
        `>>> Running ${LANGUAGE_META[selectedLanguage].label} code...\n\n` +
        `[0, 1]\n[1, 2]\n[0, 1]\n\n` +
        `✓ All test cases passed!\n` +
        `Execution time : 42 ms\n` +
        `Memory usage   : 18.3 MB`
      )
      setTestCases([
        { id: 1, input: 'nums=[2,7,11,15], target=9',  expected: '[0,1]', actual: '[0,1]', status: 'passed' },
        { id: 2, input: 'nums=[3,2,4], target=6',       expected: '[1,2]', actual: '[1,2]', status: 'passed' },
        { id: 3, input: 'nums=[3,3], target=6',          expected: '[0,1]', actual: '[0,1]', status: 'passed' },
      ])
    }, 1500)
  }

  // Call backend AI review endpoint
  const handleAIReview = useCallback(async () => {
    setReviewLoading(true)
    setReviewError(null)
    setActiveTab('review')
    try {
      const res = await fetch(`${API_URL}/ai/code/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language: selectedLanguage }),
      })
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      const data: AIReviewResult = await res.json()
      setAiReview(data)
    } catch {
      setReviewError('Could not reach the review service. Check your connection and try again.')
    } finally {
      setReviewLoading(false)
    }
  }, [code, selectedLanguage])

  // Close lang dropdown on outside click
  useEffect(() => {
    if (!langDropdownOpen) return
    const handler = () => setLangDropdownOpen(false)
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [langDropdownOpen])

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0f] overflow-hidden">
      <Navbar />

      {/* ── Top Toolbar ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-white/10 bg-black/40 backdrop-blur-md mt-16 flex-shrink-0">
        {/* Title */}
        <div className="flex items-center gap-2 mr-4">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500">
            <Terminal className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-sm tracking-tight hidden sm:block">Code Lab</span>
        </div>

        {/* Language Selector */}
        <div
          className="relative"
          onClick={(e) => { e.stopPropagation(); setLangDropdownOpen(!langDropdownOpen) }}
        >
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm text-white/80">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            {LANGUAGE_META[selectedLanguage].label}
            <ChevronDown className="w-3.5 h-3.5 text-white/40" />
          </button>
          {langDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-40 rounded-xl bg-[#1a1a2e] border border-white/10 shadow-xl z-50 overflow-hidden">
              {(Object.keys(LANGUAGE_META) as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-white/10 ${
                    selectedLanguage === lang ? 'text-cyan-400 bg-white/5' : 'text-white/70'
                  }`}
                >
                  {LANGUAGE_META[lang].label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm text-white/80"
        >
          {theme === 'vs-dark' ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-yellow-400" />}
          <span className="hidden sm:block">{theme === 'vs-dark' ? 'Dark' : 'Light'}</span>
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* AI Review */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm"
          onClick={handleAIReview}
          disabled={reviewLoading}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-medium hidden sm:block">AI Review</span>
        </button>

        {/* Save */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 hover:border-white/40 bg-transparent text-white/70 hover:text-white transition-colors text-sm">
          <Save className="w-3.5 h-3.5" />
          <span className="hidden sm:block">Save</span>
        </button>

        {/* Submit */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-medium transition-all shadow-lg shadow-purple-900/30">
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:block">Submit</span>
        </button>

        {/* Run */}
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium transition-all shadow-lg shadow-green-900/30"
        >
          {isRunning ? (
            <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-white" />
          )}
          {isRunning ? 'Running…' : 'Run'}
        </button>
      </div>

      {/* ── 3-Panel Layout ──────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left Panel: Problem Description ─────────────────────────── */}
        <aside className="w-[250px] flex-shrink-0 border-r border-white/10 bg-black/20 flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <h2 className="font-semibold text-white text-sm leading-tight">Two Sum Problem</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                Medium
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                +150 XP
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 border-b border-white/10 text-white/70 text-xs leading-relaxed space-y-2">
            <p>
              Given an array of integers <code className="text-cyan-400 bg-cyan-400/10 px-1 rounded">nums</code> and
              an integer <code className="text-cyan-400 bg-cyan-400/10 px-1 rounded">target</code>, return
              indices of the two numbers such that they add up to <code className="text-cyan-400 bg-cyan-400/10 px-1 rounded">target</code>.
            </p>
            <p>
              You may assume that each input would have <strong className="text-white/90">exactly one solution</strong>,
              and you may not use the same element twice.
            </p>
            <p>You can return the answer in any order.</p>
          </div>

          {/* Examples */}
          <div className="p-4 border-b border-white/10 space-y-3">
            <h3 className="text-white/90 text-xs font-semibold uppercase tracking-wider">Examples</h3>

            <div className="rounded-lg bg-white/5 border border-white/10 p-3 space-y-1.5 text-xs font-mono">
              <div className="text-white/50">Input:</div>
              <div className="text-green-400">nums = [2,7,11,15], target = 9</div>
              <div className="text-white/50 pt-1">Output:</div>
              <div className="text-cyan-400">[0,1]</div>
              <div className="text-white/40 text-[10px] pt-1">nums[0] + nums[1] = 2 + 7 = 9</div>
            </div>

            <div className="rounded-lg bg-white/5 border border-white/10 p-3 space-y-1.5 text-xs font-mono">
              <div className="text-white/50">Input:</div>
              <div className="text-green-400">nums = [3,2,4], target = 6</div>
              <div className="text-white/50 pt-1">Output:</div>
              <div className="text-cyan-400">[1,2]</div>
            </div>
          </div>

          {/* Constraints */}
          <div className="p-4 border-b border-white/10 space-y-2">
            <h3 className="text-white/90 text-xs font-semibold uppercase tracking-wider">Constraints</h3>
            <ul className="space-y-1 text-xs text-white/60 font-mono">
              <li className="flex items-start gap-1.5"><span className="text-purple-400 mt-0.5">•</span> 2 ≤ nums.length ≤ 10⁴</li>
              <li className="flex items-start gap-1.5"><span className="text-purple-400 mt-0.5">•</span> -10⁹ ≤ nums[i] ≤ 10⁹</li>
              <li className="flex items-start gap-1.5"><span className="text-purple-400 mt-0.5">•</span> -10⁹ ≤ target ≤ 10⁹</li>
              <li className="flex items-start gap-1.5"><span className="text-purple-400 mt-0.5">•</span> Only one valid answer exists.</li>
            </ul>
          </div>

          {/* Hints */}
          <div className="p-4 border-b border-white/10 space-y-2">
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center gap-2 text-xs font-medium text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              {showHints ? 'Hide Hints' : 'Show Hints'}
              <ChevronDown className={`w-3 h-3 transition-transform ${showHints ? 'rotate-180' : ''}`} />
            </button>
            {showHints && (
              <div className="space-y-2 mt-1">
                <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-2.5 text-xs text-yellow-200/80">
                  <span className="text-yellow-400 font-semibold">Hint 1:</span> A brute force approach runs in O(n²). Can you do better?
                </div>
                <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-2.5 text-xs text-yellow-200/80">
                  <span className="text-yellow-400 font-semibold">Hint 2:</span> Try storing each number&apos;s complement in a hash map as you iterate.
                </div>
              </div>
            )}
          </div>

          {/* Test Cases (collapsible) */}
          <div className="p-4">
            <button
              onClick={() => setShowTestCases(!showTestCases)}
              className="flex items-center gap-2 text-xs font-medium text-white/70 hover:text-white transition-colors w-full"
            >
              {showTestCases ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              Test Cases
              <span className="ml-auto text-white/40">3</span>
            </button>
            {showTestCases && (
              <div className="mt-2 space-y-2">
                {testCases.map((tc) => (
                  <div key={tc.id} className="rounded-lg bg-white/5 border border-white/10 p-2.5 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-white/50 font-medium">Case {tc.id}</span>
                      {tc.status === 'passed' && <CheckCircle className="w-3.5 h-3.5 text-green-400" />}
                      {tc.status === 'failed'  && <XCircle    className="w-3.5 h-3.5 text-red-400"   />}
                      {tc.status === 'pending' && <AlertCircle className="w-3.5 h-3.5 text-white/30" />}
                    </div>
                    <div className="font-mono text-white/60 leading-relaxed space-y-0.5">
                      <div><span className="text-white/30">in: </span>{tc.input}</div>
                      <div><span className="text-white/30">exp: </span>{tc.expected}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* ── Middle Panel: Monaco Editor ──────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-white/10">
          {/* Editor */}
          <div className="flex-1 border border-white/10 overflow-hidden">
            <MonacoEditor
              height="100%"
              language={LANGUAGE_META[selectedLanguage].monacoLang}
              theme={theme}
              value={code}
              onChange={(val) => setCode(val ?? '')}
              options={{
                fontSize: 13,
                fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
                fontLigatures: true,
                lineNumbers: 'on',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                padding: { top: 16, bottom: 16 },
                renderLineHighlight: 'gutter',
                smoothScrolling: true,
                cursorBlinking: 'smooth',
                tabSize: 4,
                bracketPairColorization: { enabled: true },
              }}
            />
          </div>

          {/* Bottom Bar */}
          <div className="flex items-center gap-4 px-4 py-1.5 bg-black/40 border-t border-white/10 text-xs text-white/40 flex-shrink-0">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-white/50">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-white/50">Enter</kbd>
              <span className="ml-1">to run</span>
            </span>
            <span className="hidden sm:block">|</span>
            <span className="hidden sm:flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-white/50">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-white/50">S</kbd>
              <span className="ml-1">to save</span>
            </span>
            <div className="flex-1" />
            <span>{lineCount} lines</span>
            <span className="hidden sm:block">{charCount} chars</span>
            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30 font-medium">
              {LANGUAGE_META[selectedLanguage].label}
            </span>
          </div>
        </div>

        {/* ── Right Panel: Output + AI Review ─────────────────────────── */}
        <aside className="w-[300px] flex-shrink-0 flex flex-col bg-black/30">
          {/* Tabs */}
          <div className="flex border-b border-white/10 flex-shrink-0">
            {(['output', 'review', 'testcases'] as ActiveTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 text-xs font-medium transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'text-white border-purple-500'
                    : 'text-white/40 border-transparent hover:text-white/70'
                }`}
              >
                {tab === 'output'    && 'Output'}
                {tab === 'review'    && (
                  <span className="flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI Review
                  </span>
                )}
                {tab === 'testcases' && 'Test Cases'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">

            {/* ── Output Tab ─────────────────────────────────────────── */}
            {activeTab === 'output' && (
              <div className="p-3 h-full flex flex-col gap-3">
                {/* Console */}
                <div className="flex-1 rounded-xl bg-[#0d0d1a] border border-white/10 p-3 font-mono text-xs overflow-y-auto min-h-[120px]">
                  {isRunning ? (
                    <div className="flex items-center gap-2 text-white/50">
                      <div className="w-3 h-3 border border-green-500/40 border-t-green-500 rounded-full animate-spin" />
                      Executing…
                    </div>
                  ) : output ? (
                    <pre className="whitespace-pre-wrap text-green-300 leading-relaxed">{output}</pre>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-2 text-white/30 py-8">
                      <Terminal className="w-8 h-8 opacity-30" />
                      <span>Run your code to see output</span>
                    </div>
                  )}
                </div>

                {/* Stats */}
                {output && !isRunning && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-white/5 border border-white/10 p-2.5 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <div>
                        <div className="text-white/40 text-[10px]">Time</div>
                        <div className="text-white text-xs font-semibold">42 ms</div>
                      </div>
                    </div>
                    <div className="rounded-lg bg-white/5 border border-white/10 p-2.5 flex items-center gap-2">
                      <MemoryStick className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <div>
                        <div className="text-white/40 text-[10px]">Memory</div>
                        <div className="text-white text-xs font-semibold">18.3 MB</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pass/Fail summary */}
                {output && !isRunning && (
                  <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <div>
                      <div className="text-green-400 text-xs font-semibold">All Tests Passed</div>
                      <div className="text-green-300/60 text-[10px]">3 / 3 test cases passed</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── AI Review Tab ───────────────────────────────────────── */}
            {activeTab === 'review' && (
              <div className="p-3 space-y-3">
                {/* Header */}
                <div className="flex items-center gap-2 pb-1">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    AI Code Review
                  </span>
                </div>

                {/* Loading */}
                {reviewLoading && (
                  <div className="flex flex-col items-center justify-center gap-3 py-12 text-white/50">
                    <div className="w-8 h-8 border-2 border-purple-500/40 border-t-purple-500 rounded-full animate-spin" />
                    <span className="text-xs">Analysing your code…</span>
                  </div>
                )}

                {/* Error */}
                {!reviewLoading && reviewError && (
                  <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-300">
                    {reviewError}
                  </div>
                )}

                {/* Prompt to get review */}
                {!reviewLoading && !reviewError && !aiReview && (
                  <div className="flex flex-col items-center gap-3 py-10 text-center">
                    <Sparkles className="w-8 h-8 text-purple-400/50" />
                    <p className="text-xs text-white/40">Click <strong className="text-white/60">AI Review</strong> in the toolbar to analyse your code.</p>
                    <button
                      onClick={handleAIReview}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-medium transition-all"
                    >
                      Get AI Review
                    </button>
                  </div>
                )}

                {/* Real review result */}
                {!reviewLoading && aiReview && (
                  <>
                    {/* Review text */}
                    <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-xs font-semibold text-green-400">Review</span>
                      </div>
                      <p className="text-xs text-white/70 pl-6 leading-relaxed">{aiReview.review}</p>
                    </div>

                    {/* Suggestions */}
                    {aiReview.suggestions.length > 0 && (
                      <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-yellow-400" />
                          <span className="text-xs font-semibold text-yellow-400">Suggestions</span>
                        </div>
                        <ul className="space-y-1.5 pl-6">
                          {aiReview.suggestions.map((s, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-white/70">
                              <AlertCircle className="w-3.5 h-3.5 text-yellow-400 mt-0.5 flex-shrink-0" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Score */}
                    <div className="rounded-xl bg-gradient-to-br from-purple-600/20 to-cyan-600/10 border border-purple-500/20 p-3 text-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        {aiReview.score}/100
                      </div>
                      <div className="text-xs text-white/50 mt-0.5">AI Score</div>
                    </div>

                    {/* Re-review */}
                    <button
                      onClick={handleAIReview}
                      className="w-full py-2 rounded-lg border border-white/10 hover:border-purple-500/40 text-xs text-white/50 hover:text-white/80 transition-colors"
                    >
                      Re-analyse
                    </button>
                  </>
                )}
              </div>
            )}

            {/* ── Test Cases Tab ──────────────────────────────────────── */}
            {activeTab === 'testcases' && (
              <div className="p-3 space-y-2">
                <p className="text-xs text-white/40 pb-1">Run your code to execute test cases.</p>

                {/* Table Header */}
                <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 text-[10px] font-semibold uppercase tracking-wider text-white/30 px-2">
                  <span>Input</span>
                  <span>Expected</span>
                  <span>Actual</span>
                  <span>Status</span>
                </div>

                {/* Rows */}
                {testCases.map((tc) => (
                  <div
                    key={tc.id}
                    className={`rounded-xl border p-3 space-y-1.5 text-xs font-mono transition-colors ${
                      tc.status === 'passed'
                        ? 'bg-green-500/5 border-green-500/20'
                        : tc.status === 'failed'
                        ? 'bg-red-500/5 border-red-500/20'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white/50">Case {tc.id}</span>
                      {tc.status === 'passed' && (
                        <span className="flex items-center gap-1 text-green-400 text-[10px]">
                          <CheckCircle className="w-3 h-3" /> Passed
                        </span>
                      )}
                      {tc.status === 'failed' && (
                        <span className="flex items-center gap-1 text-red-400 text-[10px]">
                          <XCircle className="w-3 h-3" /> Failed
                        </span>
                      )}
                      {tc.status === 'pending' && (
                        <span className="flex items-center gap-1 text-white/30 text-[10px]">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </div>
                    <div className="text-white/60 space-y-0.5 leading-relaxed">
                      <div><span className="text-white/30">Input    </span>{tc.input}</div>
                      <div><span className="text-white/30">Expected </span><span className="text-cyan-300">{tc.expected}</span></div>
                      {tc.actual && (
                        <div><span className="text-white/30">Actual   </span>
                          <span className={tc.status === 'passed' ? 'text-green-300' : 'text-red-300'}>
                            {tc.actual}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
