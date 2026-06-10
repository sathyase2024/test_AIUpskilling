import { PY_HARNESS, JS_HARNESS, type ProblemDef } from './harness'

export const RECURSION_BACKTRACKING: ProblemDef[] = [
  {
    id:'subsets', title:'Subsets', difficulty:'Intermediate', category:'Recursion & Backtracking',
    description:'Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order (the tests normalize ordering). An array of n unique elements has exactly 2ⁿ subsets, including the empty set and the full set.',
    examples:[
      {input:'nums = [1,2,3]',output:'[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]',explanation:'All 2³ = 8 subsets.'},
      {input:'nums = [0]',output:'[[],[0]]'},
    ],
    constraints:['1 <= nums.length <= 10','-10 <= nums[i] <= 10','All the numbers of nums are unique'],
    hints:['Backtrack: at each index choose to include or exclude the element','Record the current path at every node of the recursion tree, not just the leaves','Iterative alternative: start with [[]] and for each num, append num to a copy of every existing subset'],
    tags:['backtracking','recursion','bit-manipulation'], timeComplexity:'O(n·2ⁿ)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def subsets(nums):
    pass
`,
      javascript:`function subsets(nums) {

}
`,
    },
    testCode:{
      python:`_norm=lambda a:sorted(sorted(s) for s in a)
${PY_HARNESS}
_t(_norm(subsets([1,2,3])),[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]],'example 1')
_t(_norm(subsets([0])),[[],[0]],'single element')
_t(len(subsets([1,2,3,4,5])),32,'2^5 subsets')
print(f'{_p}/{_n} tests passed')`,
      javascript:`const _norm=a=>a.map(s=>[...s].sort((x,y)=>x-y)).sort((x,y)=>{const m=Math.min(x.length,y.length);for(let i=0;i<m;i++){if(x[i]!==y[i])return x[i]-y[i];}return x.length-y.length;});
${JS_HARNESS}
_t(_norm(subsets([1,2,3])),[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]],'example 1');
_t(_norm(subsets([0])),[[],[0]],'single element');
_t(subsets([1,2,3,4,5]).length,32,'2^5 subsets');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'combination-sum', title:'Combination Sum', difficulty:'Intermediate', category:'Recursion & Backtracking',
    description:'Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order. The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.',
    examples:[
      {input:'candidates = [2,3,6,7], target = 7',output:'[[2,2,3],[7]]',explanation:'2+2+3 = 7 (2 used twice) and 7 alone. These are the only combinations.'},
      {input:'candidates = [2,3,5], target = 8',output:'[[2,2,2,2],[2,3,3],[3,5]]'},
      {input:'candidates = [2], target = 1',output:'[]'},
    ],
    constraints:['1 <= candidates.length <= 30','2 <= candidates[i] <= 40','All elements of candidates are distinct','1 <= target <= 40'],
    hints:['Backtrack with a start index so combinations stay non-decreasing — this prevents duplicates like [2,3] and [3,2]','Reuse is allowed: after choosing candidates[i], recurse with the SAME index i','Prune when the remaining target goes negative'],
    tags:['backtracking','recursion','array'], timeComplexity:'O(branches^depth)', spaceComplexity:'O(target)',
    starterCode:{
      python:`def combination_sum(candidates, target):
    pass
`,
      javascript:`function combinationSum(candidates, target) {

}
`,
    },
    testCode:{
      python:`_norm=lambda a:sorted(sorted(c) for c in a)
${PY_HARNESS}
_t(_norm(combination_sum([2,3,6,7],7)),[[2,2,3],[7]],'example 1')
_t(_norm(combination_sum([2,3,5],8)),[[2,2,2,2],[2,3,3],[3,5]],'example 2')
_t(_norm(combination_sum([2],1)),[],'impossible')
_t(_norm(combination_sum([3],9)),[[3,3,3]],'single candidate reused')
print(f'{_p}/{_n} tests passed')`,
      javascript:`const _norm=a=>a.map(c=>[...c].sort((x,y)=>x-y)).sort((x,y)=>{const m=Math.min(x.length,y.length);for(let i=0;i<m;i++){if(x[i]!==y[i])return x[i]-y[i];}return x.length-y.length;});
${JS_HARNESS}
_t(_norm(combinationSum([2,3,6,7],7)),[[2,2,3],[7]],'example 1');
_t(_norm(combinationSum([2,3,5],8)),[[2,2,2,2],[2,3,3],[3,5]],'example 2');
_t(_norm(combinationSum([2],1)),[],'impossible');
_t(_norm(combinationSum([3],9)),[[3,3,3]],'single candidate reused');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'n-queens', title:'N-Queens', difficulty:'Advanced', category:'Recursion & Backtracking',
    description:'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other (no shared row, column, or diagonal). Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order (the tests sort it). Each solution contains a distinct board configuration, where each row is a string of "." and a single "Q".',
    examples:[
      {input:'n = 4',output:'[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',explanation:'There exist two distinct solutions to the 4-queens puzzle.'},
      {input:'n = 1',output:'[["Q"]]'},
    ],
    constraints:['1 <= n <= 9'],
    hints:['Place one queen per row; backtrack over the column choice','A square (r, c) is attacked if its column c, diagonal r-c, or anti-diagonal r+c is occupied — three hash sets give O(1) checks','Build the row strings only when a full placement succeeds'],
    tags:['backtracking','recursion'], timeComplexity:'O(n!)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def solve_n_queens(n):
    pass
`,
      javascript:`function solveNQueens(n) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(sorted(solve_n_queens(4)),[['..Q.','Q...','...Q','.Q..'],['.Q..','...Q','Q...','..Q.']],'n=4 both solutions')
_t(solve_n_queens(1),[['Q']],'n=1')
_t(solve_n_queens(2),[],'n=2 impossible')
_t(solve_n_queens(3),[],'n=3 impossible')
_t(len(solve_n_queens(5)),10,'n=5 has 10 solutions')
_t(len(solve_n_queens(6)),4,'n=6 has 4 solutions')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(solveNQueens(4).sort(),[['..Q.','Q...','...Q','.Q..'],['.Q..','...Q','Q...','..Q.']],'n=4 both solutions');
_t(solveNQueens(1),[['Q']],'n=1');
_t(solveNQueens(2),[],'n=2 impossible');
_t(solveNQueens(3),[],'n=3 impossible');
_t(solveNQueens(5).length,10,'n=5 has 10 solutions');
_t(solveNQueens(6).length,4,'n=6 has 4 solutions');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
