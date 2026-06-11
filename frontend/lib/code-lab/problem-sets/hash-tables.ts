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
  {
    id:'valid-anagram', title:'Valid Anagram', difficulty:'Beginner', category:'Hash Tables',
    description:'Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram is a word formed by rearranging the letters of another, using all the original letters exactly once. Strings of different lengths can never be anagrams.',
    examples:[
      {input:'s = "anagram", t = "nagaram"',output:'true',explanation:'Both strings use the same letters with the same frequencies.'},
      {input:'s = "rat", t = "car"',output:'false',explanation:'"rat" and "car" do not contain the same letters.'},
    ],
    constraints:['1 <= s.length, t.length <= 5·10⁴','s and t consist of lowercase English letters'],
    hints:['If the lengths differ, they cannot be anagrams','Count the frequency of each character in s, then decrement for each character in t','They are anagrams iff every count returns to zero'],
    tags:['string','hash-map','sorting'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def is_anagram(s, t):
    pass
`,
      javascript:`function isAnagram(s, t) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(is_anagram('anagram','nagaram'),True,'example 1')
_t(is_anagram('rat','car'),False,'example 2')
_t(is_anagram('a','a'),True,'single char match')
_t(is_anagram('ab','a'),False,'different lengths')
_t(is_anagram('aacc','ccac'),False,'same length different counts')
_t(is_anagram('listen','silent'),True,'classic anagram')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(isAnagram('anagram','nagaram'),true,'example 1');
_t(isAnagram('rat','car'),false,'example 2');
_t(isAnagram('a','a'),true,'single char match');
_t(isAnagram('ab','a'),false,'different lengths');
_t(isAnagram('aacc','ccac'),false,'same length different counts');
_t(isAnagram('listen','silent'),true,'classic anagram');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'subarray-sum-equals-k', title:'Subarray Sum Equals K', difficulty:'Intermediate', category:'Hash Tables',
    description:'Given an array of integers nums and an integer k, return the total number of contiguous subarrays whose elements sum to k. The array may contain negative numbers and zeros, so a sliding window does not apply; use prefix sums with a hash map of counts.',
    examples:[
      {input:'nums = [1,1,1], k = 2',output:'2',explanation:'The subarrays [1,1] starting at index 0 and at index 1 both sum to 2.'},
      {input:'nums = [1,2,3], k = 3',output:'2',explanation:'[1,2] and [3] both sum to 3.'},
    ],
    constraints:['1 <= nums.length <= 2·10⁴','-1000 <= nums[i] <= 1000','-10⁷ <= k <= 10⁷'],
    hints:['A subarray sum equals (prefix sum at j) − (prefix sum at i)','Count how many earlier prefix sums equal currentPrefix − k','Initialize the map with prefix sum 0 seen once to count subarrays starting at index 0'],
    tags:['array','hash-map','prefix-sum'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`from collections import defaultdict

def subarray_sum(nums, k):
    pass
`,
      javascript:`function subarraySum(nums, k) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(subarray_sum([1,1,1],2),2,'example 1')
_t(subarray_sum([1,2,3],3),2,'example 2')
_t(subarray_sum([1,-1,0],0),3,'negatives and zero')
_t(subarray_sum([3,4,7,2,-3,1,4,2],7),4,'mixed signs')
_t(subarray_sum([0,0,0],0),6,'all zeros')
_t(subarray_sum([1],0),0,'no subarray sums to k')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(subarraySum([1,1,1],2),2,'example 1');
_t(subarraySum([1,2,3],3),2,'example 2');
_t(subarraySum([1,-1,0],0),3,'negatives and zero');
_t(subarraySum([3,4,7,2,-3,1,4,2],7),4,'mixed signs');
_t(subarraySum([0,0,0],0),6,'all zeros');
_t(subarraySum([1],0),0,'no subarray sums to k');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'four-sum-ii', title:'4Sum II', difficulty:'Intermediate', category:'Hash Tables',
    description:'Given four integer arrays nums1, nums2, nums3, and nums4 all of length n, return the number of tuples (i, j, k, l) such that nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0. Tuples are counted by index combination, so distinct index tuples that yield the same values are counted separately.',
    examples:[
      {input:'nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]',output:'2',explanation:'The two tuples are (0,0,0,1) → 1 + (-2) + (-1) + 2 = 0 and (1,1,0,0) → 2 + (-1) + (-1) + 0 = 0.'},
      {input:'nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]',output:'1',explanation:'The only tuple (0,0,0,0) sums to 0.'},
    ],
    constraints:['n == nums1.length == nums2.length == nums3.length == nums4.length','1 <= n <= 200','-2²⁸ <= nums1[i], nums2[i], nums3[i], nums4[i] <= 2²⁸'],
    hints:['Brute force over all four arrays is O(n⁴) — split the problem in half','Count every pairwise sum of nums1 and nums2 in a hash map','For each pairwise sum of nums3 and nums4, add the count of its negation from the map'],
    tags:['array','hash-map'], timeComplexity:'O(n²)', spaceComplexity:'O(n²)',
    starterCode:{
      python:`from collections import defaultdict

def four_sum_count(nums1, nums2, nums3, nums4):
    pass
`,
      javascript:`function fourSumCount(nums1, nums2, nums3, nums4) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(four_sum_count([1,2],[-2,-1],[-1,2],[0,2]),2,'example 1')
_t(four_sum_count([0],[0],[0],[0]),1,'example 2')
_t(four_sum_count([1],[1],[1],[1]),0,'no tuple sums to zero')
_t(four_sum_count([-1,1],[-1,1],[-1,1],[-1,1]),6,'symmetric arrays')
_t(four_sum_count([0,0],[0,0],[0,0],[0,0]),16,'all zeros')
_t(four_sum_count([1,2,3],[-1,-2,-3],[0,0,0],[0,0,0]),27,'many combinations')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(fourSumCount([1,2],[-2,-1],[-1,2],[0,2]),2,'example 1');
_t(fourSumCount([0],[0],[0],[0]),1,'example 2');
_t(fourSumCount([1],[1],[1],[1]),0,'no tuple sums to zero');
_t(fourSumCount([-1,1],[-1,1],[-1,1],[-1,1]),6,'symmetric arrays');
_t(fourSumCount([0,0],[0,0],[0,0],[0,0]),16,'all zeros');
_t(fourSumCount([1,2,3],[-1,-2,-3],[0,0,0],[0,0,0]),27,'many combinations');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
