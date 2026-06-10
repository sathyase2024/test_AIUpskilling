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
]
