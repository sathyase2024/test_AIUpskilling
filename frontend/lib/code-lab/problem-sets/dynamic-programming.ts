import { PY_HARNESS, JS_HARNESS, type ProblemDef } from './harness'

export const DYNAMIC_PROGRAMMING: ProblemDef[] = [
  {
    id:'climbing-stairs', title:'Climbing Stairs', difficulty:'Beginner', category:'Dynamic Programming',
    description:'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top? Note that the count grows like the Fibonacci sequence, so a naive recursion without memoization is exponential.',
    examples:[
      {input:'n = 2',output:'2',explanation:'Two ways: 1+1 and 2.'},
      {input:'n = 3',output:'3',explanation:'Three ways: 1+1+1, 1+2 and 2+1.'},
    ],
    constraints:['1 <= n <= 45'],
    hints:['To stand on step n you arrived from step n-1 or step n-2','ways(n) = ways(n-1) + ways(n-2), with ways(1)=1, ways(2)=2','Two rolling variables give O(n) time and O(1) space'],
    tags:['dynamic-programming','fibonacci','memoization'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def climb_stairs(n):
    pass
`,
      javascript:`function climbStairs(n) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(climb_stairs(2),2,'example 1')
_t(climb_stairs(3),3,'example 2')
_t(climb_stairs(1),1,'one step')
_t(climb_stairs(5),8,'five steps')
_t(climb_stairs(10),89,'ten steps')
_t(climb_stairs(45),1836311903,'large n needs O(n)')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(climbStairs(2),2,'example 1');
_t(climbStairs(3),3,'example 2');
_t(climbStairs(1),1,'one step');
_t(climbStairs(5),8,'five steps');
_t(climbStairs(10),89,'ten steps');
_t(climbStairs(45),1836311903,'large n needs O(n)');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'house-robber', title:'House Robber', difficulty:'Intermediate', category:'Dynamic Programming',
    description:'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed; the only constraint stopping you from robbing all of them is that adjacent houses have security systems connected — robbing two adjacent houses alerts the police. Given an integer array nums representing the amount of money in each house, return the maximum amount you can rob tonight without alerting the police.',
    examples:[
      {input:'nums = [1,2,3,1]',output:'4',explanation:'Rob house 1 (money = 1) and house 3 (money = 3): total = 4.'},
      {input:'nums = [2,7,9,3,1]',output:'12',explanation:'Rob houses 1, 3 and 5: 2 + 9 + 1 = 12.'},
    ],
    constraints:['1 <= nums.length <= 100','0 <= nums[i] <= 400'],
    hints:['For each house: either skip it (keep previous best) or rob it (add to best excluding the neighbor)','dp[i] = max(dp[i-1], dp[i-2] + nums[i])','Only the last two dp values are needed — O(1) space'],
    tags:['dynamic-programming','array'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def rob(nums):
    pass
`,
      javascript:`function rob(nums) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(rob([1,2,3,1]),4,'example 1')
_t(rob([2,7,9,3,1]),12,'example 2')
_t(rob([5]),5,'single house')
_t(rob([2,1,1,2]),4,'skip two in a row')
_t(rob([2,100,3,100,4]),200,'alternating riches')
_t(rob([0,0,0]),0,'nothing to steal')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(rob([1,2,3,1]),4,'example 1');
_t(rob([2,7,9,3,1]),12,'example 2');
_t(rob([5]),5,'single house');
_t(rob([2,1,1,2]),4,'skip two in a row');
_t(rob([2,100,3,100,4]),200,'alternating riches');
_t(rob([0,0,0]),0,'nothing to steal');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'coin-change', title:'Coin Change', difficulty:'Intermediate', category:'Dynamic Programming',
    description:'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1. You may assume that you have an infinite number of each kind of coin. Greedy (largest coin first) does not work in general — e.g. coins [1,3,4] and amount 6.',
    examples:[
      {input:'coins = [1,2,5], amount = 11',output:'3',explanation:'11 = 5 + 5 + 1.'},
      {input:'coins = [2], amount = 3',output:'-1',explanation:'3 cannot be formed from 2s.'},
      {input:'coins = [1], amount = 0',output:'0',explanation:'Zero coins are needed for amount 0.'},
    ],
    constraints:['1 <= coins.length <= 12','1 <= coins[i] <= 2³¹ - 1','0 <= amount <= 10⁴'],
    hints:['dp[a] = fewest coins to form amount a; dp[0] = 0','dp[a] = 1 + min(dp[a - c]) over all coins c <= a','Initialize with infinity; an unreachable final amount means return -1'],
    tags:['dynamic-programming','bfs'], timeComplexity:'O(amount · coins)', spaceComplexity:'O(amount)',
    starterCode:{
      python:`def coin_change(coins, amount):
    pass
`,
      javascript:`function coinChange(coins, amount) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(coin_change([1,2,5],11),3,'example 1')
_t(coin_change([2],3),-1,'impossible')
_t(coin_change([1],0),0,'zero amount')
_t(coin_change([1,3,4],6),2,'greedy fails here')
_t(coin_change([2,5,10,1],27),4,'27 = 10+10+5+2')
_t(coin_change([186,419,83,408],6249),20,'large stress case')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(coinChange([1,2,5],11),3,'example 1');
_t(coinChange([2],3),-1,'impossible');
_t(coinChange([1],0),0,'zero amount');
_t(coinChange([1,3,4],6),2,'greedy fails here');
_t(coinChange([2,5,10,1],27),4,'27 = 10+10+5+2');
_t(coinChange([186,419,83,408],6249),20,'large stress case');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'longest-increasing-subsequence', title:'Longest Increasing Subsequence', difficulty:'Intermediate', category:'Dynamic Programming',
    description:'Given an integer array nums, return the length of the longest strictly increasing subsequence. A subsequence is derived by deleting some or no elements without changing the order of the remaining elements. Follow-up: the classic DP is O(n²) — can you reach O(n log n) with patience sorting (binary search over pile tops)?',
    examples:[
      {input:'nums = [10,9,2,5,3,7,101,18]',output:'4',explanation:'The longest increasing subsequence is [2,3,7,101] (or [2,5,7,101]), length 4.'},
      {input:'nums = [0,1,0,3,2,3]',output:'4',explanation:'[0,1,2,3] has length 4.'},
      {input:'nums = [7,7,7,7,7,7,7]',output:'1',explanation:'Strictly increasing — equal elements cannot chain.'},
    ],
    constraints:['1 <= nums.length <= 2500','-10⁴ <= nums[i] <= 10⁴','Strictly increasing (no equal neighbors)'],
    hints:['O(n²) DP: dp[i] = 1 + max(dp[j]) over j < i with nums[j] < nums[i]','For O(n log n): keep an array of the smallest possible tail for each subsequence length','Binary-search the tails array for the first element >= num and replace it (or append)'],
    tags:['dynamic-programming','binary-search','patience-sorting'], timeComplexity:'O(n log n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`import bisect

def length_of_lis(nums):
    pass
`,
      javascript:`function lengthOfLIS(nums) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(length_of_lis([10,9,2,5,3,7,101,18]),4,'example 1')
_t(length_of_lis([0,1,0,3,2,3]),4,'example 2')
_t(length_of_lis([7,7,7,7,7,7,7]),1,'all equal')
_t(length_of_lis([4,10,4,3,8,9]),3,'[4,8,9]')
_t(length_of_lis([1]),1,'single element')
_t(length_of_lis([5,4,3,2,1]),1,'strictly decreasing')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(lengthOfLIS([10,9,2,5,3,7,101,18]),4,'example 1');
_t(lengthOfLIS([0,1,0,3,2,3]),4,'example 2');
_t(lengthOfLIS([7,7,7,7,7,7,7]),1,'all equal');
_t(lengthOfLIS([4,10,4,3,8,9]),3,'[4,8,9]');
_t(lengthOfLIS([1]),1,'single element');
_t(lengthOfLIS([5,4,3,2,1]),1,'strictly decreasing');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'edit-distance', title:'Edit Distance', difficulty:'Advanced', category:'Dynamic Programming',
    description:'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have three operations permitted on a word: insert a character, delete a character, or replace a character. This is the classic Levenshtein distance, solved with a 2D DP over prefixes of both words.',
    examples:[
      {input:'word1 = "horse", word2 = "ros"',output:'3',explanation:'horse → rorse (replace h with r) → rose (remove r) → ros (remove e).'},
      {input:'word1 = "intention", word2 = "execution"',output:'5',explanation:'Five edits transform one word into the other.'},
    ],
    constraints:['0 <= word1.length, word2.length <= 500','word1 and word2 consist of lowercase English letters'],
    hints:['dp[i][j] = edits to turn the first i chars of word1 into the first j chars of word2','If the last characters match, dp[i][j] = dp[i-1][j-1]; otherwise 1 + min(insert, delete, replace)','Base cases: dp[i][0] = i (all deletes) and dp[0][j] = j (all inserts)'],
    tags:['dynamic-programming','string','levenshtein'], timeComplexity:'O(m·n)', spaceComplexity:'O(m·n)',
    starterCode:{
      python:`def min_distance(word1, word2):
    pass
`,
      javascript:`function minDistance(word1, word2) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(min_distance('horse','ros'),3,'example 1')
_t(min_distance('intention','execution'),5,'example 2')
_t(min_distance('','abc'),3,'all inserts')
_t(min_distance('abc',''),3,'all deletes')
_t(min_distance('abc','abc'),0,'identical')
_t(min_distance('park','spake'),3,'mixed operations')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(minDistance('horse','ros'),3,'example 1');
_t(minDistance('intention','execution'),5,'example 2');
_t(minDistance('','abc'),3,'all inserts');
_t(minDistance('abc',''),3,'all deletes');
_t(minDistance('abc','abc'),0,'identical');
_t(minDistance('park','spake'),3,'mixed operations');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'regex-matching', title:'Regular Expression Matching', difficulty:'Expert', category:'Dynamic Programming',
    description:'Given an input string s and a pattern p, implement regular expression matching with support for "." and "*" where "." matches any single character and "*" matches zero or more of the preceding element. The matching should cover the entire input string, not partial. For example, pattern "c*a*b" matches "aab" because c* matches zero c\'s, a* matches two a\'s, and b matches b.',
    examples:[
      {input:'s = "aa", p = "a"',output:'false',explanation:'"a" does not match the entire string "aa".'},
      {input:'s = "aa", p = "a*"',output:'true',explanation:'"*" means zero or more of the preceding element "a", so "a*" matches "aa".'},
      {input:'s = "ab", p = ".*"',output:'true',explanation:'".*" means zero or more of any character.'},
    ],
    constraints:['1 <= s.length <= 20','1 <= p.length <= 20','s contains only lowercase English letters','p contains lowercase letters, "." and "*"','Each "*" is preceded by a valid character'],
    hints:['dp[i][j] = does s[:i] match p[:j]?','If p[j-1] is a letter or ".": dp[i][j] = dp[i-1][j-1] and the characters match','If p[j-1] is "*": either drop "x*" entirely (dp[i][j-2]) or, when s[i-1] matches x, consume one character (dp[i-1][j])'],
    tags:['dynamic-programming','string','recursion'], timeComplexity:'O(m·n)', spaceComplexity:'O(m·n)',
    starterCode:{
      python:`def is_match(s, p):
    pass
`,
      javascript:`function isMatch(s, p) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(is_match('aa','a'),False,'example 1')
_t(is_match('aa','a*'),True,'star expands')
_t(is_match('ab','.*'),True,'dot star')
_t(is_match('aab','c*a*b'),True,'zero c then two a')
_t(is_match('mississippi','mis*is*p*.'),False,'classic false case')
_t(is_match('','c*'),True,'empty string vs star')
_t(is_match('ab','.*c'),False,'trailing literal unmatched')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(isMatch('aa','a'),false,'example 1');
_t(isMatch('aa','a*'),true,'star expands');
_t(isMatch('ab','.*'),true,'dot star');
_t(isMatch('aab','c*a*b'),true,'zero c then two a');
_t(isMatch('mississippi','mis*is*p*.'),false,'classic false case');
_t(isMatch('','c*'),true,'empty string vs star');
_t(isMatch('ab','.*c'),false,'trailing literal unmatched');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'unique-paths', title:'Unique Paths', difficulty:'Intermediate', category:'Dynamic Programming',
    description:'There is a robot on an m x n grid. The robot is initially located at the top-left corner (grid[0][0]). The robot tries to move to the bottom-right corner (grid[m-1][n-1]). The robot can only move either down or right at any point in time. Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner. The answer is guaranteed to be at most the order of 2·10⁹ and fits in a signed 32-bit integer for the given test cases.',
    examples:[
      {input:'m = 3, n = 7',output:'28',explanation:'There are 28 distinct paths from the top-left to the bottom-right of a 3 x 7 grid.'},
      {input:'m = 3, n = 2',output:'3',explanation:'From the top-left there are 3 ways to reach the bottom-right: Right→Down→Down, Down→Down→Right, Down→Right→Down.'},
    ],
    constraints:['1 <= m, n <= 100','The answer fits in a signed 32-bit integer for these inputs'],
    hints:['Every cell can only be reached from the cell above it or the cell to its left','dp[i][j] = dp[i-1][j] + dp[i][j-1], with the first row and first column all equal to 1','A single rolling row of length n reduces the space to O(n)'],
    tags:['dynamic-programming','combinatorics','math'], timeComplexity:'O(m·n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def unique_paths(m, n):
    pass
`,
      javascript:`function uniquePaths(m, n) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(unique_paths(3,7),28,'example 1')
_t(unique_paths(3,2),3,'example 2')
_t(unique_paths(1,1),1,'single cell')
_t(unique_paths(1,10),1,'single row')
_t(unique_paths(10,10),48620,'square grid')
_t(unique_paths(23,12),193536720,'large but int32-safe')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(uniquePaths(3,7),28,'example 1');
_t(uniquePaths(3,2),3,'example 2');
_t(uniquePaths(1,1),1,'single cell');
_t(uniquePaths(1,10),1,'single row');
_t(uniquePaths(10,10),48620,'square grid');
_t(uniquePaths(23,12),193536720,'large but int32-safe');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'word-break', title:'Word Break', difficulty:'Intermediate', category:'Dynamic Programming',
    description:'Given a string s and a dictionary of strings word_dict, return true if s can be segmented into a space-separated sequence of one or more dictionary words. Note that the same word in the dictionary may be reused multiple times in the segmentation. The dictionary contains no duplicate words.',
    examples:[
      {input:'s = "leetcode", word_dict = ["leet","code"]',output:'true',explanation:'"leetcode" can be segmented as "leet code".'},
      {input:'s = "applepenapple", word_dict = ["apple","pen"]',output:'true',explanation:'"applepenapple" can be segmented as "apple pen apple"; note that "apple" is reused.'},
      {input:'s = "catsandog", word_dict = ["cats","dog","sand","and","cat"]',output:'false',explanation:'There is no way to segment the entire string into dictionary words.'},
    ],
    constraints:['1 <= s.length <= 300','1 <= word_dict.length <= 1000','1 <= word_dict[i].length <= 20','s and word_dict[i] consist of only lowercase English letters','All the strings of word_dict are unique'],
    hints:['dp[i] = can the prefix s[:i] be fully segmented? dp[0] = True','dp[i] is True if some j < i has dp[j] True and s[j:i] is in the dictionary','Put the dictionary in a set for O(1) membership and iterate end positions left to right'],
    tags:['dynamic-programming','string','hash-set'], timeComplexity:'O(n²)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def word_break(s, word_dict):
    pass
`,
      javascript:`function wordBreak(s, wordDict) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(word_break('leetcode',['leet','code']),True,'example 1')
_t(word_break('applepenapple',['apple','pen']),True,'reuse a word')
_t(word_break('catsandog',['cats','dog','sand','and','cat']),False,'cannot segment')
_t(word_break('a',['a']),True,'single letter')
_t(word_break('aaaaaaa',['aaaa','aaa']),True,'overlap split')
_t(word_break('cars',['car','ca','rs']),True,'ca + rs')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(wordBreak('leetcode',['leet','code']),true,'example 1');
_t(wordBreak('applepenapple',['apple','pen']),true,'reuse a word');
_t(wordBreak('catsandog',['cats','dog','sand','and','cat']),false,'cannot segment');
_t(wordBreak('a',['a']),true,'single letter');
_t(wordBreak('aaaaaaa',['aaaa','aaa']),true,'overlap split');
_t(wordBreak('cars',['car','ca','rs']),true,'ca + rs');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'longest-common-subsequence', title:'Longest Common Subsequence', difficulty:'Intermediate', category:'Dynamic Programming',
    description:'Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0. A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters. A common subsequence of two strings is a subsequence that is common to both strings.',
    examples:[
      {input:'text1 = "abcde", text2 = "ace"',output:'3',explanation:'The longest common subsequence is "ace" and its length is 3.'},
      {input:'text1 = "abc", text2 = "abc"',output:'3',explanation:'The longest common subsequence is "abc".'},
      {input:'text1 = "abc", text2 = "def"',output:'0',explanation:'There is no common subsequence, so the result is 0.'},
    ],
    constraints:['1 <= text1.length, text2.length <= 1000','text1 and text2 consist of only lowercase English characters'],
    hints:['dp[i][j] = LCS length of the first i chars of text1 and first j chars of text2','If text1[i-1] == text2[j-1], dp[i][j] = dp[i-1][j-1] + 1','Otherwise dp[i][j] = max(dp[i-1][j], dp[i][j-1])'],
    tags:['dynamic-programming','string'], timeComplexity:'O(m·n)', spaceComplexity:'O(m·n)',
    starterCode:{
      python:`def longest_common_subsequence(text1, text2):
    pass
`,
      javascript:`function longestCommonSubsequence(text1, text2) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(longest_common_subsequence('abcde','ace'),3,'example 1')
_t(longest_common_subsequence('abc','abc'),3,'identical')
_t(longest_common_subsequence('abc','def'),0,'no overlap')
_t(longest_common_subsequence('bsbininm','jmjkbkjkv'),1,'single shared char')
_t(longest_common_subsequence('ezupkr','ubmrapg'),2,'mixed')
_t(longest_common_subsequence('a','a'),1,'single char match')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(longestCommonSubsequence('abcde','ace'),3,'example 1');
_t(longestCommonSubsequence('abc','abc'),3,'identical');
_t(longestCommonSubsequence('abc','def'),0,'no overlap');
_t(longestCommonSubsequence('bsbininm','jmjkbkjkv'),1,'single shared char');
_t(longestCommonSubsequence('ezupkr','ubmrapg'),2,'mixed');
_t(longestCommonSubsequence('a','a'),1,'single char match');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'decode-ways', title:'Decode Ways', difficulty:'Intermediate', category:'Dynamic Programming',
    description:'A message containing letters from A-Z can be encoded into numbers using the mapping "A" → "1", "B" → "2", ..., "Z" → "26". To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of this mapping (there may be many ways). For example, "11106" can be mapped into "AAJF" (1 1 10 6) or "KJF" (11 10 6); note that the grouping (1 11 06) is invalid because "06" cannot be mapped into a letter since leading zeros are not allowed. Given a string s containing only digits, return the number of ways to decode it. The answer fits in a 32-bit integer. Note that a string starting with 0 or containing an invalid standalone 0 has 0 ways.',
    examples:[
      {input:'s = "12"',output:'2',explanation:'"12" could be decoded as "AB" (1 2) or "L" (12).'},
      {input:'s = "226"',output:'3',explanation:'"226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).'},
      {input:'s = "06"',output:'0',explanation:'"06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").'},
    ],
    constraints:['1 <= s.length <= 100','s contains only digits and may contain leading zero(s)'],
    hints:['dp[i] = number of ways to decode the prefix s[:i]; dp[0] = 1','A single digit s[i-1] contributes dp[i-1] ways when it is 1–9 (not 0)','A two-digit group s[i-2:i] contributes dp[i-2] ways when it is between 10 and 26'],
    tags:['dynamic-programming','string'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def num_decodings(s):
    pass
`,
      javascript:`function numDecodings(s) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(num_decodings('12'),2,'example 1')
_t(num_decodings('226'),3,'example 2')
_t(num_decodings('06'),0,'leading zero')
_t(num_decodings('0'),0,'just zero')
_t(num_decodings('10'),1,'ten only')
_t(num_decodings('100'),0,'invalid trailing zero')
_t(num_decodings('11106'),2,'classic multi')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(numDecodings('12'),2,'example 1');
_t(numDecodings('226'),3,'example 2');
_t(numDecodings('06'),0,'leading zero');
_t(numDecodings('0'),0,'just zero');
_t(numDecodings('10'),1,'ten only');
_t(numDecodings('100'),0,'invalid trailing zero');
_t(numDecodings('11106'),2,'classic multi');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'partition-equal-subset-sum', title:'Partition Equal Subset Sum', difficulty:'Intermediate', category:'Dynamic Programming',
    description:'Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal, or false otherwise. This reduces to a subset-sum problem: a valid partition exists if and only if the total sum is even and some subset sums to exactly half the total.',
    examples:[
      {input:'nums = [1,5,11,5]',output:'true',explanation:'The array can be partitioned as [1,5,5] and [11], both summing to 11.'},
      {input:'nums = [1,2,3,5]',output:'false',explanation:'The array cannot be partitioned into equal-sum subsets.'},
    ],
    constraints:['1 <= nums.length <= 200','1 <= nums[i] <= 100'],
    hints:['If the total sum is odd, an equal partition is impossible','Reduce to: can any subset sum to total/2? This is a 0/1 knapsack on the target','Use a boolean dp over achievable sums; iterate sums downward to reuse each number at most once'],
    tags:['dynamic-programming','array','knapsack'], timeComplexity:'O(n·sum)', spaceComplexity:'O(sum)',
    starterCode:{
      python:`def can_partition(nums):
    pass
`,
      javascript:`function canPartition(nums) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(can_partition([1,5,11,5]),True,'example 1')
_t(can_partition([1,2,3,5]),False,'odd-ish no split')
_t(can_partition([1,1]),True,'two equal')
_t(can_partition([1]),False,'single element')
_t(can_partition([2,2,3,5]),False,'sum is even but no subset')
_t(can_partition([3,3,3,4,5]),True,'sum 18 -> 9 each')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(canPartition([1,5,11,5]),true,'example 1');
_t(canPartition([1,2,3,5]),false,'odd-ish no split');
_t(canPartition([1,1]),true,'two equal');
_t(canPartition([1]),false,'single element');
_t(canPartition([2,2,3,5]),false,'sum is even but no subset');
_t(canPartition([3,3,3,4,5]),true,'sum 18 -> 9 each');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'burst-balloons', title:'Burst Balloons', difficulty:'Expert', category:'Dynamic Programming',
    description:'You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons. If you burst the i-th balloon, you will get nums[i-1] · nums[i] · nums[i+1] coins. If i-1 or i+1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it. Return the maximum coins you can collect by bursting the balloons wisely. The trick is to think about which balloon is burst LAST in a range: that fixes both of its (virtual) neighbors and splits the range into independent subproblems.',
    examples:[
      {input:'nums = [3,1,5,8]',output:'167',explanation:'Burst order [1,5,3,8]: 3·1·5 + 3·5·8 + 1·3·8 + 1·8·1 = 15 + 120 + 24 + 8 = 167.'},
      {input:'nums = [1,5]',output:'10',explanation:'Burst 1 first (1·1·5 = 5), then 5 (1·5·1 = 5): total 10.'},
    ],
    constraints:['n == nums.length','1 <= n <= 300','0 <= nums[i] <= 100','Keep arrays small in practice — the DP is O(n³)'],
    hints:['Pad the array with a 1 on each end so boundary balloons have neighbors','dp[i][j] = max coins from bursting all balloons strictly between indices i and j (exclusive)','For each range, try every k as the LAST balloon burst: dp[i][j] = max(dp[i][k] + nums[i]·nums[k]·nums[j] + dp[k][j])'],
    tags:['dynamic-programming','divide-and-conquer','interval-dp'], timeComplexity:'O(n³)', spaceComplexity:'O(n²)',
    starterCode:{
      python:`def max_coins(nums):
    pass
`,
      javascript:`function maxCoins(nums) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(max_coins([3,1,5,8]),167,'example 1')
_t(max_coins([1,5]),10,'two balloons')
_t(max_coins([5]),5,'single balloon')
_t(max_coins([7]),7,'single seven')
_t(max_coins([1,2,3,4,5]),110,'ascending')
_t(max_coins([9,76,64]),44416,'three values')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(maxCoins([3,1,5,8]),167,'example 1');
_t(maxCoins([1,5]),10,'two balloons');
_t(maxCoins([5]),5,'single balloon');
_t(maxCoins([7]),7,'single seven');
_t(maxCoins([1,2,3,4,5]),110,'ascending');
_t(maxCoins([9,76,64]),44416,'three values');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
