import { PY_HARNESS, JS_HARNESS, type ProblemDef } from './harness'

export const GRAPHS: ProblemDef[] = [
  {
    id:'number-of-islands', title:'Number of Islands', difficulty:'Intermediate', category:'Graphs',
    description:'Given an m x n 2D binary grid which represents a map of "1"s (land) and "0"s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water. Diagonal connections do NOT count.',
    examples:[
      {input:'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',output:'1',explanation:'All land cells are connected, forming a single island.'},
      {input:'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',output:'3',explanation:'Three separate clusters of land. The diagonal cells at (2,2) and (3,3) are NOT connected.'},
    ],
    constraints:['m == grid.length, n == grid[i].length','1 <= m, n <= 300','grid[i][j] is "1" or "0"','Cells are the strings "1"/"0", not numbers'],
    hints:['Scan every cell; each unvisited "1" starts a new island','Flood-fill (DFS or BFS) from that cell, marking visited land (e.g., overwrite with "0")','Count how many flood-fills you launch'],
    tags:['graph','dfs','bfs','matrix','flood-fill'], timeComplexity:'O(m·n)', spaceComplexity:'O(m·n)',
    starterCode:{
      python:`def num_islands(grid):
    pass
`,
      javascript:`function numIslands(grid) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(num_islands([['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]),1,'one island')
_t(num_islands([['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]),3,'three islands')
_t(num_islands([['1']]),1,'single land cell')
_t(num_islands([['0']]),0,'single water cell')
_t(num_islands([['1','0','1'],['0','1','0'],['1','0','1']]),5,'diagonals do not connect')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(numIslands([['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]),1,'one island');
_t(numIslands([['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]),3,'three islands');
_t(numIslands([['1']]),1,'single land cell');
_t(numIslands([['0']]),0,'single water cell');
_t(numIslands([['1','0','1'],['0','1','0'],['1','0','1']]),5,'diagonals do not connect');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'course-schedule', title:'Course Schedule', difficulty:'Intermediate', category:'Graphs',
    description:'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [a, b] indicates that you must take course b first if you want to take course a. Return true if you can finish all courses, otherwise return false. This is equivalent to asking whether the prerequisite graph contains a cycle.',
    examples:[
      {input:'numCourses = 2, prerequisites = [[1,0]]',output:'true',explanation:'Take course 0 first, then course 1.'},
      {input:'numCourses = 2, prerequisites = [[1,0],[0,1]]',output:'false',explanation:'Course 1 requires course 0 and vice versa — a cycle, so it is impossible.'},
    ],
    constraints:['1 <= numCourses <= 2000','0 <= prerequisites.length <= 5000','prerequisites[i].length == 2','0 <= a, b < numCourses','All pairs are distinct'],
    hints:['Build an adjacency list and detect a cycle','Kahn\'s algorithm: repeatedly remove nodes with in-degree 0; if you remove all of them, there is no cycle','Or DFS with three colors: unvisited / in-progress / done; hitting an in-progress node means a cycle'],
    tags:['graph','topological-sort','dfs','bfs'], timeComplexity:'O(V + E)', spaceComplexity:'O(V + E)',
    starterCode:{
      python:`from collections import deque

def can_finish(num_courses, prerequisites):
    pass
`,
      javascript:`function canFinish(numCourses, prerequisites) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(can_finish(2,[[1,0]]),True,'simple chain')
_t(can_finish(2,[[1,0],[0,1]]),False,'two-node cycle')
_t(can_finish(5,[[1,4],[2,4],[3,1],[3,2]]),True,'diamond DAG')
_t(can_finish(1,[]),True,'no prerequisites')
_t(can_finish(3,[[0,1],[1,2],[2,0]]),False,'three-node cycle')
_t(can_finish(4,[[1,0],[2,1],[3,2]]),True,'long chain')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(canFinish(2,[[1,0]]),true,'simple chain');
_t(canFinish(2,[[1,0],[0,1]]),false,'two-node cycle');
_t(canFinish(5,[[1,4],[2,4],[3,1],[3,2]]),true,'diamond DAG');
_t(canFinish(1,[]),true,'no prerequisites');
_t(canFinish(3,[[0,1],[1,2],[2,0]]),false,'three-node cycle');
_t(canFinish(4,[[1,0],[2,1],[3,2]]),true,'long chain');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'word-ladder', title:'Word Ladder', difficulty:'Advanced', category:'Graphs',
    description:'A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence beginWord → s1 → s2 → ... → endWord such that every adjacent pair of words differs by exactly one letter, every si is in wordList (beginWord does not need to be), and the last word equals endWord. Given beginWord, endWord, and wordList, return the number of words in the shortest transformation sequence, or 0 if no such sequence exists. Shortest-path structure means BFS, not DFS.',
    examples:[
      {input:'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',output:'5',explanation:'One shortest sequence is "hit" → "hot" → "dot" → "dog" → "cog", which has 5 words.'},
      {input:'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]',output:'0',explanation:'endWord "cog" is not in wordList, so no valid sequence exists.'},
    ],
    constraints:['1 <= beginWord.length <= 10','endWord.length == beginWord.length','1 <= wordList.length <= 5000','All words consist of lowercase English letters','All words in wordList are unique'],
    hints:['Model words as graph nodes with edges between words differing by one letter','BFS from beginWord, tracking depth; the first time you reach endWord is the answer','Generating all 26 single-letter mutations of the current word and checking set membership beats comparing every pair'],
    tags:['graph','bfs','string'], timeComplexity:'O(n·L·26)', spaceComplexity:'O(n·L)',
    starterCode:{
      python:`from collections import deque

def ladder_length(begin_word, end_word, word_list):
    pass
`,
      javascript:`function ladderLength(beginWord, endWord, wordList) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(ladder_length('hit','cog',['hot','dot','dog','lot','log','cog']),5,'example 1')
_t(ladder_length('hit','cog',['hot','dot','dog','lot','log']),0,'endWord missing')
_t(ladder_length('a','c',['a','b','c']),2,'single letter words')
_t(ladder_length('hot','dog',['hot','dog']),0,'no bridge word')
_t(ladder_length('hot','dot',['dot']),2,'direct neighbor')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(ladderLength('hit','cog',['hot','dot','dog','lot','log','cog']),5,'example 1');
_t(ladderLength('hit','cog',['hot','dot','dog','lot','log']),0,'endWord missing');
_t(ladderLength('a','c',['a','b','c']),2,'single letter words');
_t(ladderLength('hot','dog',['hot','dog']),0,'no bridge word');
_t(ladderLength('hot','dot',['dot']),2,'direct neighbor');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'rotting-oranges', title:'Rotting Oranges', difficulty:'Intermediate', category:'Graphs',
    description:'You are given an m x n grid where each cell can have one of three values: 0 representing an empty cell, 1 representing a fresh orange, or 2 representing a rotten orange. Every minute, any fresh orange that is 4-directionally adjacent (up, down, left, right) to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible (some fresh orange can never become rotten), return -1. Diagonal adjacency does NOT spread rot.',
    examples:[
      {input:'grid = [[2,1,1],[1,1,0],[0,1,1]]',output:'4'},
      {input:'grid = [[2,1,1],[0,1,1],[1,0,1]]',output:'-1',explanation:'The orange in the bottom-left corner (row 2, column 0) is never adjacent to a rotten orange, so it can never rot.'},
      {input:'grid = [[0,2]]',output:'0',explanation:'There are no fresh oranges at minute 0, so the answer is 0.'},
    ],
    constraints:['m == grid.length, n == grid[i].length','1 <= m, n <= 10','grid[i][j] is 0, 1, or 2'],
    hints:['This is a multi-source BFS — enqueue every rotten orange as a level-0 source','Process the queue level by level; each level is one elapsed minute','After the BFS, if any fresh orange remains, return -1; otherwise return the number of elapsed minutes'],
    tags:['graph','bfs','matrix'], timeComplexity:'O(m·n)', spaceComplexity:'O(m·n)',
    starterCode:{
      python:`from collections import deque

def oranges_rotting(grid):
    pass
`,
      javascript:`function orangesRotting(grid) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(oranges_rotting([[2,1,1],[1,1,0],[0,1,1]]),4,'example 1')
_t(oranges_rotting([[2,1,1],[0,1,1],[1,0,1]]),-1,'unreachable fresh orange')
_t(oranges_rotting([[0,2]]),0,'no fresh oranges')
_t(oranges_rotting([[0]]),0,'single empty cell')
_t(oranges_rotting([[1]]),-1,'single fresh orange never rots')
_t(oranges_rotting([[2,2],[1,1]]),1,'two sources one minute')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(orangesRotting([[2,1,1],[1,1,0],[0,1,1]]),4,'example 1');
_t(orangesRotting([[2,1,1],[0,1,1],[1,0,1]]),-1,'unreachable fresh orange');
_t(orangesRotting([[0,2]]),0,'no fresh oranges');
_t(orangesRotting([[0]]),0,'single empty cell');
_t(orangesRotting([[1]]),-1,'single fresh orange never rots');
_t(orangesRotting([[2,2],[1,1]]),1,'two sources one minute');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'pacific-atlantic', title:'Pacific Atlantic Water Flow', difficulty:'Intermediate', category:'Graphs',
    description:'There is an m x n rectangular island that borders both the Pacific Ocean and the Atlantic Ocean. The Pacific Ocean touches the island\'s left and top edges, and the Atlantic Ocean touches the island\'s right and bottom edges. The island is partitioned into a grid of square cells; heights[r][c] represents the height above sea level of the cell at coordinate (r, c). Rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell\'s height is less than or equal to the current cell\'s height. Water can flow from any cell adjacent to an ocean into that ocean. Return a list of grid coordinates [r, c] such that rain water can flow from cell (r, c) to BOTH the Pacific and Atlantic oceans. The result may be returned in any order; tests compare the coordinate set after sorting.',
    examples:[
      {input:'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]',output:'[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]'},
      {input:'heights = [[1]]',output:'[[0,0]]',explanation:'A single cell touches all four edges, so it reaches both oceans.'},
    ],
    constraints:['m == heights.length, n == heights[r].length','1 <= m, n <= 200','0 <= heights[r][c] <= 10⁵'],
    hints:['Do not flood from each cell — instead flood inward from the ocean borders','Run a reverse BFS/DFS from the Pacific border (top + left) where you may step to a neighbor with height >= current, marking reachable cells','Do the same from the Atlantic border (bottom + right); the answer is the intersection of the two reachable sets'],
    tags:['graph','dfs','bfs','matrix'], timeComplexity:'O(m·n)', spaceComplexity:'O(m·n)',
    starterCode:{
      python:`def pacific_atlantic(heights):
    pass
`,
      javascript:`function pacificAtlantic(heights) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
def _norm(x): return sorted([list(c) for c in x])
_t(_norm(pacific_atlantic([[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]])),_norm([[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]),'example 1')
_t(_norm(pacific_atlantic([[1]])),[[0,0]],'single cell')
_t(_norm(pacific_atlantic([[2,1],[1,2]])),_norm([[0,0],[0,1],[1,0],[1,1]]),'all reach both')
_t(_norm(pacific_atlantic([[1,2,3],[8,9,4],[7,6,5]])),_norm([[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]])," spiral")
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
const _norm=x=>x.map(c=>[c[0],c[1]]).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
_t(_norm(pacificAtlantic([[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]])),_norm([[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]),'example 1');
_t(_norm(pacificAtlantic([[1]])),[[0,0]],'single cell');
_t(_norm(pacificAtlantic([[2,1],[1,2]])),_norm([[0,0],[0,1],[1,0],[1,1]]),'all reach both');
_t(_norm(pacificAtlantic([[1,2,3],[8,9,4],[7,6,5]])),_norm([[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]),'spiral');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'alien-dictionary', title:'Alien Dictionary', difficulty:'Expert', category:'Graphs',
    description:'There is a new alien language that uses the lowercase English alphabet, but the order of the letters is unknown. You are given a list of strings words from the alien language\'s dictionary. The strings in words are sorted lexicographically by the rules of this new language. Derive the order of letters in this language and return it as a string. If there is no valid letter ordering that is consistent with the given words, return "". The dictionary order is determined by comparing adjacent words: the first position where they differ dictates that the earlier word\'s letter precedes the later word\'s letter. If a word is a prefix of a previous longer word (e.g. ["abc","ab"]), the ordering is invalid because a longer word cannot precede its own prefix. Each test is designed so that a consistent ordering, when it exists, is unique.',
    examples:[
      {input:'words = ["wrt","wrf","er","ett","rftt"]',output:'"wertf"',explanation:'From the adjacencies: w < e, t < f, r < t, e < r, giving the total order w < e < r < t < f.'},
      {input:'words = ["z","x","z"]',output:'""',explanation:'The constraints imply z < x and x < z, a cycle, so no valid ordering exists.'},
      {input:'words = ["abc","ab"]',output:'""',explanation:'"abc" precedes its own prefix "ab", which is impossible — invalid input.'},
    ],
    constraints:['1 <= words.length <= 100','1 <= words[i].length <= 100','words[i] consists of only lowercase English letters','Each solvable test has a unique valid ordering'],
    hints:['Build a graph: for each adjacent pair of words, the first differing character gives an edge "earlier < later"','Watch the prefix case: if word i is longer than word i+1 and word i+1 is a prefix of word i, the input is invalid','Topologically sort the letters; if a cycle exists (cannot order all letters) return ""'],
    tags:['graph','topological-sort','string','bfs','dfs'], timeComplexity:'O(C)', spaceComplexity:'O(1)',
    starterCode:{
      python:`from collections import deque

def alien_order(words):
    pass
`,
      javascript:`function alienOrder(words) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(alien_order(['wrt','wrf','er','ett','rftt']),'wertf','classic unique order')
_t(alien_order(['z','x','z']),'','cycle is invalid')
_t(alien_order(['abc','ab']),'','prefix violation')
_t(alien_order(['w','x','y','z']),'wxyz','total order from single letters')
_t(alien_order(['a']),'a','single letter')
_t(alien_order(['c','cb','b','ba','a']),'cba','prefix-then-branch chain')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(alienOrder(['wrt','wrf','er','ett','rftt']),'wertf','classic unique order');
_t(alienOrder(['z','x','z']),'','cycle is invalid');
_t(alienOrder(['abc','ab']),'','prefix violation');
_t(alienOrder(['w','x','y','z']),'wxyz','total order from single letters');
_t(alienOrder(['a']),'a','single letter');
_t(alienOrder(['c','cb','b','ba','a']),'cba','prefix-then-branch chain');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
