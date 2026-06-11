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
  {
    id:'permutations', title:'Permutations', difficulty:'Intermediate', category:'Recursion & Backtracking',
    description:'Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order (the tests normalize ordering by sorting the outer list of permutations, while each individual permutation is left intact because permutations differ precisely by the order of their elements). An array of n distinct integers has exactly n! permutations.',
    examples:[
      {input:'nums = [1,2,3]',output:'[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]',explanation:'All 3! = 6 orderings of the three numbers.'},
      {input:'nums = [0,1]',output:'[[0,1],[1,0]]'},
      {input:'nums = [1]',output:'[[1]]'},
    ],
    constraints:['1 <= nums.length <= 6','-10 <= nums[i] <= 10','All the integers of nums are unique'],
    hints:['Backtrack: build the permutation one position at a time, choosing an unused element','Track which elements are already used (a boolean array or a remaining list)','When the current arrangement has length n, record a copy of it'],
    tags:['backtracking','recursion','array'], timeComplexity:'O(n·n!)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def permute(nums):
    pass
`,
      javascript:`function permute(nums) {

}
`,
    },
    testCode:{
      python:`_norm=lambda a:sorted(a)
${PY_HARNESS}
_t(_norm(permute([1,2,3])),[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]],'example 1')
_t(_norm(permute([0,1])),[[0,1],[1,0]],'two elements')
_t(_norm(permute([1])),[[1]],'single element')
_t(len(permute([1,2,3,4])),24,'4! permutations')
_t(_norm(permute([7,8,9])),[[7,8,9],[7,9,8],[8,7,9],[8,9,7],[9,7,8],[9,8,7]],'distinct values')
print(f'{_p}/{_n} tests passed')`,
      javascript:`const _norm=a=>[...a].sort((x,y)=>{const m=Math.min(x.length,y.length);for(let i=0;i<m;i++){if(x[i]!==y[i])return x[i]-y[i];}return x.length-y.length;});
${JS_HARNESS}
_t(_norm(permute([1,2,3])),[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]],'example 1');
_t(_norm(permute([0,1])),[[0,1],[1,0]],'two elements');
_t(_norm(permute([1])),[[1]],'single element');
_t(permute([1,2,3,4]).length,24,'4! permutations');
_t(_norm(permute([7,8,9])),[[7,8,9],[7,9,8],[8,7,9],[8,9,7],[9,7,8],[9,8,7]],'distinct values');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'generate-parentheses', title:'Generate Parentheses', difficulty:'Intermediate', category:'Recursion & Backtracking',
    description:'Given n pairs of parentheses, write a function to generate all combinations of well-formed (valid, balanced) parentheses. You may return the answer in any order (the tests normalize by sorting the list of strings). A string is well-formed if every opening bracket has a matching closing bracket and brackets are properly nested.',
    examples:[
      {input:'n = 3',output:'["((()))","(()())","(())()","()(())","()()()"]',explanation:'All five well-formed combinations of 3 pairs of parentheses.'},
      {input:'n = 1',output:'["()"]'},
    ],
    constraints:['1 <= n <= 8'],
    hints:['Backtrack tracking how many open and close brackets have been used','You may add an open bracket while open count < n; you may add a close bracket while close count < open count','Record the string when its length reaches 2·n'],
    tags:['backtracking','recursion','string'], timeComplexity:'O(4ⁿ / √n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def generate_parenthesis(n):
    pass
`,
      javascript:`function generateParenthesis(n) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(sorted(generate_parenthesis(3)),sorted(['((()))','(()())','(())()','()(())','()()()']),'example 1')
_t(sorted(generate_parenthesis(1)),['()'],'single pair')
_t(sorted(generate_parenthesis(2)),sorted(['(())','()()']),'two pairs')
_t(len(generate_parenthesis(4)),14,'catalan number 14')
_t(len(generate_parenthesis(5)),42,'catalan number 42')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(generateParenthesis(3).slice().sort(),['((()))','(()())','(())()','()(())','()()()'].sort(),'example 1');
_t(generateParenthesis(1).slice().sort(),['()'],'single pair');
_t(generateParenthesis(2).slice().sort(),['(())','()()'].sort(),'two pairs');
_t(generateParenthesis(4).length,14,'catalan number 14');
_t(generateParenthesis(5).length,42,'catalan number 42');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'sudoku-solver', title:'Sudoku Solver', difficulty:'Expert', category:'Recursion & Backtracking',
    description:'Write a program to solve a Sudoku puzzle by filling the empty cells. The board is a 9 x 9 grid of strings where each cell holds a digit "1"-"9" or "." for an empty cell. A sudoku solution must satisfy all of the following rules: each of the digits 1-9 must occur exactly once in each row, each of the digits 1-9 must occur exactly once in each column, and each of the digits 1-9 must occur exactly once in each of the nine 3 x 3 sub-boxes of the grid. The "." character indicates empty cells. You may assume the input board has exactly one solution. Modify the board in place to fill the empty cells AND return the solved board so the full grid can be compared.',
    examples:[
      {input:'board = [["5","3",".",".","7",...],...] (the classic LeetCode puzzle)',output:'The unique completed 9x9 grid',explanation:'Each empty cell is filled so that every row, column, and 3x3 box contains the digits 1-9 exactly once.'},
    ],
    constraints:['board.length == 9','board[i].length == 9','board[i][j] is a digit "1"-"9" or "."','It is guaranteed that the input board has exactly one solution'],
    hints:['Backtrack over empty cells; try digits 1-9 that do not violate the row, column, or 3x3 box','Maintain sets (or fixed-size arrays) of used digits per row, per column, and per box for O(1) validity checks','When a digit leads to a dead end, undo it and try the next; return success up the recursion once the grid is full'],
    tags:['backtracking','recursion','matrix','hash-set'], timeComplexity:'O(9^(empty cells))', spaceComplexity:'O(1)',
    starterCode:{
      python:`def solve_sudoku(board):
    pass
`,
      javascript:`function solveSudoku(board) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_p1=[['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]
_sol1=[['5','3','4','6','7','8','9','1','2'],['6','7','2','1','9','5','3','4','8'],['1','9','8','3','4','2','5','6','7'],['8','5','9','7','6','1','4','2','3'],['4','2','6','8','5','3','7','9','1'],['7','1','3','9','2','4','8','5','6'],['9','6','1','5','3','7','2','8','4'],['2','8','7','4','1','9','6','3','5'],['3','4','5','2','8','6','1','7','9']]
_t(solve_sudoku(_p1),_sol1,'classic puzzle solved')
_p2=[['5','3','4','6','7','8','9','1','2'],['6','7','2','1','9','5','3','4','8'],['1','9','8','3','4','2','5','6','7'],['8','5','9','7','6','1','4','2','3'],['4','2','6','8','5','3','7','9','1'],['7','1','3','9','2','4','8','5','6'],['9','6','1','5','3','7','2','8','4'],['2','8','7','4','1','9','6','3','5'],['3','4','5','2','8','6','1','7','.']]
_sol2=[['5','3','4','6','7','8','9','1','2'],['6','7','2','1','9','5','3','4','8'],['1','9','8','3','4','2','5','6','7'],['8','5','9','7','6','1','4','2','3'],['4','2','6','8','5','3','7','9','1'],['7','1','3','9','2','4','8','5','6'],['9','6','1','5','3','7','2','8','4'],['2','8','7','4','1','9','6','3','5'],['3','4','5','2','8','6','1','7','9']]
_t(solve_sudoku(_p2),_sol2,'one empty cell')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
const _p1=[['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']];
const _sol1=[['5','3','4','6','7','8','9','1','2'],['6','7','2','1','9','5','3','4','8'],['1','9','8','3','4','2','5','6','7'],['8','5','9','7','6','1','4','2','3'],['4','2','6','8','5','3','7','9','1'],['7','1','3','9','2','4','8','5','6'],['9','6','1','5','3','7','2','8','4'],['2','8','7','4','1','9','6','3','5'],['3','4','5','2','8','6','1','7','9']];
_t(solveSudoku(_p1),_sol1,'classic puzzle solved');
const _p2=[['5','3','4','6','7','8','9','1','2'],['6','7','2','1','9','5','3','4','8'],['1','9','8','3','4','2','5','6','7'],['8','5','9','7','6','1','4','2','3'],['4','2','6','8','5','3','7','9','1'],['7','1','3','9','2','4','8','5','6'],['9','6','1','5','3','7','2','8','4'],['2','8','7','4','1','9','6','3','5'],['3','4','5','2','8','6','1','7','.']];
const _sol2=[['5','3','4','6','7','8','9','1','2'],['6','7','2','1','9','5','3','4','8'],['1','9','8','3','4','2','5','6','7'],['8','5','9','7','6','1','4','2','3'],['4','2','6','8','5','3','7','9','1'],['7','1','3','9','2','4','8','5','6'],['9','6','1','5','3','7','2','8','4'],['2','8','7','4','1','9','6','3','5'],['3','4','5','2','8','6','1','7','9']];
_t(solveSudoku(_p2),_sol2,'one empty cell');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
