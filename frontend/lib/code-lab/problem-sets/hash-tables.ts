import { PY_HARNESS, JS_HARNESS, type ProblemDef } from './harness'

export const HASH_TABLES: ProblemDef[] = [
  {
    id:'group-anagrams', title:'Group Anagrams', difficulty:'Intermediate', category:'Hash Tables',
    description:'Given an array of strings strs, group the anagrams together. You can return the answer in any order (the tests normalize ordering). An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.',
    examples:[
      {input:'strs = ["eat","tea","tan","ate","nat","bat"]',output:'[["bat"],["nat","tan"],["ate","eat","tea"]]',explanation:'"eat", "tea" and "ate" are anagrams of each other; so are "tan" and "nat"; "bat" stands alone.'},
      {input:'strs = [""]',output:'[[""]]'},
      {input:'strs = ["a"]',output:'[["a"]]'},
    ],
    constraints:['1 <= strs.length <= 10⁴','0 <= strs[i].length <= 100','strs[i] consists of lowercase English letters'],
    hints:['Two strings are anagrams iff their sorted characters are equal','Use the sorted string (or a 26-count signature) as a hash-map key','Sorting each key is O(k log k); a character-count key makes grouping O(n·k)'],
    tags:['string','hash-map','sorting'], timeComplexity:'O(n·k log k)', spaceComplexity:'O(n·k)',
    starterCode:{
      python:`from collections import defaultdict

def group_anagrams(strs):
    pass
`,
      javascript:`function groupAnagrams(strs) {

}
`,
    },
    testCode:{
      python:`_norm=lambda a:sorted(sorted(g) for g in a)
${PY_HARNESS}
_t(_norm(group_anagrams(['eat','tea','tan','ate','nat','bat'])),[['ate','eat','tea'],['bat'],['nat','tan']],'example 1')
_t(_norm(group_anagrams([''])),[['']],'empty string')
_t(_norm(group_anagrams(['a'])),[['a']],'single string')
_t(_norm(group_anagrams(['ab','ba','ab'])),[['ab','ab','ba']],'duplicate words')
_t(_norm(group_anagrams(['abc','def'])),[['abc'],['def']],'no anagrams')
print(f'{_p}/{_n} tests passed')`,
      javascript:`const _norm=a=>a.map(g=>[...g].sort()).sort((x,y)=>JSON.stringify(x)<JSON.stringify(y)?-1:1);
${JS_HARNESS}
_t(_norm(groupAnagrams(['eat','tea','tan','ate','nat','bat'])),[['ate','eat','tea'],['bat'],['nat','tan']],'example 1');
_t(_norm(groupAnagrams([''])),[['']],'empty string');
_t(_norm(groupAnagrams(['a'])),[['a']],'single string');
_t(_norm(groupAnagrams(['ab','ba','ab'])),[['ab','ab','ba']],'duplicate words');
_t(_norm(groupAnagrams(['abc','def'])),[['abc'],['def']],'no anagrams');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'top-k-frequent', title:'Top K Frequent Elements', difficulty:'Intermediate', category:'Hash Tables',
    description:'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order (the tests sort the result before comparing). It is guaranteed that the answer is unique — no two of the top k candidates tie in frequency at the boundary. Follow-up: your algorithm\'s time complexity must be better than O(n log n), where n is the array\'s size.',
    examples:[
      {input:'nums = [1,1,1,2,2,3], k = 2',output:'[1,2]',explanation:'1 appears 3 times and 2 appears twice — the two most frequent elements.'},
      {input:'nums = [1], k = 1',output:'[1]'},
    ],
    constraints:['1 <= nums.length <= 10⁵','-10⁴ <= nums[i] <= 10⁴','k is in the range [1, number of distinct elements]','The answer is guaranteed to be unique'],
    hints:['Count frequencies with a hash map first','A heap of size k gives O(n log k)','Bucket sort by frequency (index = count) achieves O(n): walk buckets from highest count down'],
    tags:['array','hash-map','heap','bucket-sort'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`from collections import Counter

def top_k_frequent(nums, k):
    pass
`,
      javascript:`function topKFrequent(nums, k) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(sorted(top_k_frequent([1,1,1,2,2,3],2)),[1,2],'example 1')
_t(sorted(top_k_frequent([1],1)),[1],'single element')
_t(sorted(top_k_frequent([4,4,4,5,5,6],1)),[4],'top one')
_t(sorted(top_k_frequent([1,2],2)),[1,2],'all elements')
_t(sorted(top_k_frequent([-1,-1,2,2,2],2)),[-1,2],'negatives')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(topKFrequent([1,1,1,2,2,3],2).sort((a,b)=>a-b),[1,2],'example 1');
_t(topKFrequent([1],1).sort((a,b)=>a-b),[1],'single element');
_t(topKFrequent([4,4,4,5,5,6],1).sort((a,b)=>a-b),[4],'top one');
_t(topKFrequent([1,2],2).sort((a,b)=>a-b),[1,2],'all elements');
_t(topKFrequent([-1,-1,2,2,2],2).sort((a,b)=>a-b),[-1,2],'negatives');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'longest-consecutive-sequence', title:'Longest Consecutive Sequence', difficulty:'Intermediate', category:'Hash Tables',
    description:'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence (values that can be arranged as v, v+1, v+2, ... regardless of their positions in the array). You must write an algorithm that runs in O(n) time — sorting first would be O(n log n).',
    examples:[
      {input:'nums = [100,4,200,1,3,2]',output:'4',explanation:'The longest consecutive sequence is [1, 2, 3, 4], length 4.'},
      {input:'nums = [0,3,7,2,5,8,4,6,0,1]',output:'9',explanation:'The values 0 through 8 form a run of length 9; the duplicate 0 does not extend it.'},
    ],
    constraints:['0 <= nums.length <= 10⁵','-10⁹ <= nums[i] <= 10⁹','Must run in O(n) time'],
    hints:['Put everything in a hash set for O(1) membership checks','Only start counting from sequence starts: numbers v where v-1 is not in the set','Each value is then visited at most twice, giving O(n) overall'],
    tags:['array','hash-set','union-find'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def longest_consecutive(nums):
    pass
`,
      javascript:`function longestConsecutive(nums) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(longest_consecutive([100,4,200,1,3,2]),4,'example 1')
_t(longest_consecutive([0,3,7,2,5,8,4,6,0,1]),9,'example 2')
_t(longest_consecutive([]),0,'empty array')
_t(longest_consecutive([1,2,0,1]),3,'duplicates')
_t(longest_consecutive([5]),1,'single element')
_t(longest_consecutive([-2,-1,0,1]),4,'negative run')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(longestConsecutive([100,4,200,1,3,2]),4,'example 1');
_t(longestConsecutive([0,3,7,2,5,8,4,6,0,1]),9,'example 2');
_t(longestConsecutive([]),0,'empty array');
_t(longestConsecutive([1,2,0,1]),3,'duplicates');
_t(longestConsecutive([5]),1,'single element');
_t(longestConsecutive([-2,-1,0,1]),4,'negative run');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
