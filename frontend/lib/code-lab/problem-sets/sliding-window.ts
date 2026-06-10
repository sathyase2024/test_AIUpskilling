import { PY_HARNESS, JS_HARNESS, type ProblemDef } from './harness'

export const SLIDING_WINDOW: ProblemDef[] = [
  {
    id:'longest-substring-no-repeat', title:'Longest Substring Without Repeating Characters', difficulty:'Intermediate', category:'Sliding Window',
    description:'Given a string s, find the length of the longest substring without duplicate characters. A substring is a contiguous non-empty sequence of characters within a string — note this is different from a subsequence: for "pwwkew" the answer is "wke" (length 3), not "pwke".',
    examples:[
      {input:'s = "abcabcbb"',output:'3',explanation:'The answer is "abc", with length 3.'},
      {input:'s = "bbbbb"',output:'1',explanation:'The answer is "b", with length 1.'},
      {input:'s = "pwwkew"',output:'3',explanation:'The answer is "wke". "pwke" is a subsequence, not a substring.'},
    ],
    constraints:['0 <= s.length <= 5·10⁴','s consists of English letters, digits, symbols and spaces'],
    hints:['Maintain a window [left, right] containing no repeats','Keep a map from character to its latest index','When s[right] was already seen inside the window, jump left to one past its previous index'],
    tags:['string','sliding-window','hash-map'], timeComplexity:'O(n)', spaceComplexity:'O(min(n, charset))',
    starterCode:{
      python:`def length_of_longest_substring(s):
    pass
`,
      javascript:`function lengthOfLongestSubstring(s) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(length_of_longest_substring('abcabcbb'),3,'example 1')
_t(length_of_longest_substring('bbbbb'),1,'all same char')
_t(length_of_longest_substring('pwwkew'),3,'example 3')
_t(length_of_longest_substring(''),0,'empty string')
_t(length_of_longest_substring('au'),2,'two distinct')
_t(length_of_longest_substring('dvdf'),3,'window left jump')
_t(length_of_longest_substring('abba'),2,'stale index trap')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(lengthOfLongestSubstring('abcabcbb'),3,'example 1');
_t(lengthOfLongestSubstring('bbbbb'),1,'all same char');
_t(lengthOfLongestSubstring('pwwkew'),3,'example 3');
_t(lengthOfLongestSubstring(''),0,'empty string');
_t(lengthOfLongestSubstring('au'),2,'two distinct');
_t(lengthOfLongestSubstring('dvdf'),3,'window left jump');
_t(lengthOfLongestSubstring('abba'),2,'stale index trap');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'sliding-window-maximum', title:'Sliding Window Maximum', difficulty:'Advanced', category:'Sliding Window',
    description:'You are given an array of integers nums, and there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return an array of the maximum element in each window. A solution that rescans each window costs O(n·k); the target is O(n) using a monotonic deque.',
    examples:[
      {input:'nums = [1,3,-1,-3,5,3,6,7], k = 3',output:'[3,3,5,5,6,7]',explanation:'Window [1,3,-1] → 3, [3,-1,-3] → 3, [-1,-3,5] → 5, [-3,5,3] → 5, [5,3,6] → 6, [3,6,7] → 7.'},
      {input:'nums = [1], k = 1',output:'[1]'},
    ],
    constraints:['1 <= nums.length <= 10⁵','-10⁴ <= nums[i] <= 10⁴','1 <= k <= nums.length'],
    hints:['Keep a deque of indices whose values are in decreasing order','Before pushing index i, pop indices whose values are <= nums[i] — they can never be a future maximum','Pop from the front when the front index falls out of the window; the front is always the current maximum'],
    tags:['array','sliding-window','monotonic-deque','heap'], timeComplexity:'O(n)', spaceComplexity:'O(k)',
    starterCode:{
      python:`from collections import deque

def max_sliding_window(nums, k):
    pass
`,
      javascript:`function maxSlidingWindow(nums, k) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(max_sliding_window([1,3,-1,-3,5,3,6,7],3),[3,3,5,5,6,7],'example 1')
_t(max_sliding_window([1],1),[1],'single element')
_t(max_sliding_window([1,-1],1),[1,-1],'window of one')
_t(max_sliding_window([9,11],2),[11],'increasing pair')
_t(max_sliding_window([4,-2],2),[4],'decreasing pair')
_t(max_sliding_window([7,2,4],2),[7,4],'leading max expires')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(maxSlidingWindow([1,3,-1,-3,5,3,6,7],3),[3,3,5,5,6,7],'example 1');
_t(maxSlidingWindow([1],1),[1],'single element');
_t(maxSlidingWindow([1,-1],1),[1,-1],'window of one');
_t(maxSlidingWindow([9,11],2),[11],'increasing pair');
_t(maxSlidingWindow([4,-2],2),[4],'decreasing pair');
_t(maxSlidingWindow([7,2,4],2),[7,4],'leading max expires');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'minimum-window-substring', title:'Minimum Window Substring', difficulty:'Expert', category:'Sliding Window',
    description:'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "". The test cases are generated such that the answer is unique. Follow-up: could you find an algorithm that runs in O(m + n) time?',
    examples:[
      {input:'s = "ADOBECODEBANC", t = "ABC"',output:'"BANC"',explanation:'The minimum window substring "BANC" includes the characters A, B, and C from string t.'},
      {input:'s = "a", t = "a"',output:'"a"',explanation:'The entire string s is the minimum window.'},
      {input:'s = "a", t = "aa"',output:'""',explanation:'Both occurrences of "a" from t must be in the window; since s has only one, return the empty string.'},
    ],
    constraints:['m == s.length, n == t.length','1 <= m, n <= 10⁵','s and t consist of uppercase and lowercase English letters'],
    hints:['Count the required frequency of each character of t','Expand the right edge until the window covers all requirements, then shrink from the left while it stays valid','Track how many distinct characters are currently fully satisfied to make validity checks O(1)'],
    tags:['string','sliding-window','hash-map'], timeComplexity:'O(m + n)', spaceComplexity:'O(charset)',
    starterCode:{
      python:`from collections import Counter

def min_window(s, t):
    pass
`,
      javascript:`function minWindow(s, t) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(min_window('ADOBECODEBANC','ABC'),'BANC','example 1')
_t(min_window('a','a'),'a','single char match')
_t(min_window('a','aa'),'','not enough chars')
_t(min_window('ab','b'),'b','suffix window')
_t(min_window('bba','ab'),'ba','duplicates in s')
_t(min_window('aaflslflsldkalskaaa','aaa'),'aaa','repeated requirement')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(minWindow('ADOBECODEBANC','ABC'),'BANC','example 1');
_t(minWindow('a','a'),'a','single char match');
_t(minWindow('a','aa'),'','not enough chars');
_t(minWindow('ab','b'),'b','suffix window');
_t(minWindow('bba','ab'),'ba','duplicates in s');
_t(minWindow('aaflslflsldkalskaaa','aaa'),'aaa','repeated requirement');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
