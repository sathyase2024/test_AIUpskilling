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
    # TODO: Return the number of distinct ways to climb n steps (1 or 2 at a time)
    pass
${PY_HARNESS}
_t(climb_stairs(2),2,'example 1')
_t(climb_stairs(3),3,'example 2')
_t(climb_stairs(1),1,'one step')
_t(climb_stairs(5),8,'five steps')
_t(climb_stairs(10),89,'ten steps')
_t(climb_stairs(45),1836311903,'large n needs O(n)')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function climbStairs(n) {
  // TODO: Return the number of distinct ways to climb n steps (1 or 2 at a time)
  return 0;
}
${JS_HARNESS}
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
    # TODO: Return the max loot without robbing two adjacent houses
    pass
${PY_HARNESS}
_t(rob([1,2,3,1]),4,'example 1')
_t(rob([2,7,9,3,1]),12,'example 2')
_t(rob([5]),5,'single house')
_t(rob([2,1,1,2]),4,'skip two in a row')
_t(rob([2,100,3,100,4]),200,'alternating riches')
_t(rob([0,0,0]),0,'nothing to steal')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function rob(nums) {
  // TODO: Return the max loot without robbing two adjacent houses
  return 0;
}
${JS_HARNESS}
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
    # TODO: Return the minimum number of coins to make amount, or -1
    pass
${PY_HARNESS}
_t(coin_change([1,2,5],11),3,'example 1')
_t(coin_change([2],3),-1,'impossible')
_t(coin_change([1],0),0,'zero amount')
_t(coin_change([1,3,4],6),2,'greedy fails here')
_t(coin_change([2,5,10,1],27),4,'27 = 10+10+5+2')
_t(coin_change([186,419,83,408],6249),20,'large stress case')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function coinChange(coins, amount) {
  // TODO: Return the minimum number of coins to make amount, or -1
  return -1;
}
${JS_HARNESS}
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
      python:`def length_of_lis(nums):
    # TODO: Return the length of the longest strictly increasing subsequence
    pass
${PY_HARNESS}
_t(length_of_lis([10,9,2,5,3,7,101,18]),4,'example 1')
_t(length_of_lis([0,1,0,3,2,3]),4,'example 2')
_t(length_of_lis([7,7,7,7,7,7,7]),1,'all equal')
_t(length_of_lis([4,10,4,3,8,9]),3,'[4,8,9]')
_t(length_of_lis([1]),1,'single element')
_t(length_of_lis([5,4,3,2,1]),1,'strictly decreasing')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function lengthOfLIS(nums) {
  // TODO: Return the length of the longest strictly increasing subsequence
  return 0;
}
${JS_HARNESS}
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
    # TODO: Return the minimum number of insert/delete/replace operations
    pass
${PY_HARNESS}
_t(min_distance('horse','ros'),3,'example 1')
_t(min_distance('intention','execution'),5,'example 2')
_t(min_distance('','abc'),3,'all inserts')
_t(min_distance('abc',''),3,'all deletes')
_t(min_distance('abc','abc'),0,'identical')
_t(min_distance('park','spake'),3,'mixed operations')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function minDistance(word1, word2) {
  // TODO: Return the minimum number of insert/delete/replace operations
  return 0;
}
${JS_HARNESS}
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
    # TODO: Return True if pattern p (with . and *) matches ALL of s
    pass
${PY_HARNESS}
_t(is_match('aa','a'),False,'example 1')
_t(is_match('aa','a*'),True,'star expands')
_t(is_match('ab','.*'),True,'dot star')
_t(is_match('aab','c*a*b'),True,'zero c then two a')
_t(is_match('mississippi','mis*is*p*.'),False,'classic false case')
_t(is_match('','c*'),True,'empty string vs star')
_t(is_match('ab','.*c'),False,'trailing literal unmatched')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function isMatch(s, p) {
  // TODO: Return true if pattern p (with . and *) matches ALL of s
  return false;
}
${JS_HARNESS}
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
]
