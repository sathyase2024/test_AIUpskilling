import { PY_HARNESS, JS_HARNESS, type ProblemDef } from './harness'

export const SORTING_SEARCHING: ProblemDef[] = [
  {
    id:'binary-search', title:'Binary Search', difficulty:'Beginner', category:'Sorting & Searching',
    description:'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity — a linear scan does not count.',
    examples:[
      {input:'nums = [-1,0,3,5,9,12], target = 9',output:'4',explanation:'9 exists in nums and its index is 4.'},
      {input:'nums = [-1,0,3,5,9,12], target = 2',output:'-1',explanation:'2 does not exist in nums.'},
    ],
    constraints:['1 <= nums.length <= 10⁴','-10⁴ < nums[i], target < 10⁴','All integers in nums are unique','nums is sorted in ascending order'],
    hints:['Maintain lo and hi bounds; inspect the middle element','If nums[mid] < target search the right half, if greater search the left','Watch the loop condition (lo <= hi) and mid computation to avoid off-by-one bugs'],
    tags:['array','binary-search'], timeComplexity:'O(log n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def search(nums, target):
    pass
`,
      javascript:`function search(nums, target) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(search([-1,0,3,5,9,12],9),4,'example 1')
_t(search([-1,0,3,5,9,12],2),-1,'not found')
_t(search([5],5),0,'single element hit')
_t(search([5],-5),-1,'single element miss')
_t(search([1,3],3),1,'two elements right')
_t(search([1,3],1),0,'two elements left')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(search([-1,0,3,5,9,12],9),4,'example 1');
_t(search([-1,0,3,5,9,12],2),-1,'not found');
_t(search([5],5),0,'single element hit');
_t(search([5],-5),-1,'single element miss');
_t(search([1,3],3),1,'two elements right');
_t(search([1,3],1),0,'two elements left');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'search-rotated-array', title:'Search in Rotated Sorted Array', difficulty:'Intermediate', category:'Sorting & Searching',
    description:'There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k so that it becomes [nums[k], ..., nums[n-1], nums[0], ..., nums[k-1]]. Given the rotated array nums and an integer target, return the index of target if it is in nums, or -1 if it is not. You must write an algorithm with O(log n) runtime complexity.',
    examples:[
      {input:'nums = [4,5,6,7,0,1,2], target = 0',output:'4'},
      {input:'nums = [4,5,6,7,0,1,2], target = 3',output:'-1'},
      {input:'nums = [1], target = 0',output:'-1'},
    ],
    constraints:['1 <= nums.length <= 5000','-10⁴ <= nums[i] <= 10⁴','All values of nums are unique','nums was sorted ascending, then possibly rotated'],
    hints:['At any mid, at least one half of the array is properly sorted','Check which half is sorted by comparing nums[lo] with nums[mid]','If target lies inside the sorted half\'s range, search there; otherwise search the other half'],
    tags:['array','binary-search'], timeComplexity:'O(log n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def search_rotated(nums, target):
    pass
`,
      javascript:`function searchRotated(nums, target) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(search_rotated([4,5,6,7,0,1,2],0),4,'example 1')
_t(search_rotated([4,5,6,7,0,1,2],3),-1,'not present')
_t(search_rotated([1],0),-1,'single miss')
_t(search_rotated([3,1],1),1,'two rotated')
_t(search_rotated([5,1,3],5),0,'target at pivot start')
_t(search_rotated([1,2,3,4,5],4),3,'no rotation')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(searchRotated([4,5,6,7,0,1,2],0),4,'example 1');
_t(searchRotated([4,5,6,7,0,1,2],3),-1,'not present');
_t(searchRotated([1],0),-1,'single miss');
_t(searchRotated([3,1],1),1,'two rotated');
_t(searchRotated([5,1,3],5),0,'target at pivot start');
_t(searchRotated([1,2,3,4,5],4),3,'no rotation');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'kth-largest-element', title:'Kth Largest Element in an Array', difficulty:'Intermediate', category:'Sorting & Searching',
    description:'Given an integer array nums and an integer k, return the k-th largest element in the array. Note that it is the k-th largest element in sorted order, not the k-th distinct element. Can you solve it without fully sorting the array? A min-heap of size k gives O(n log k); quickselect averages O(n).',
    examples:[
      {input:'nums = [3,2,1,5,6,4], k = 2',output:'5',explanation:'Sorted descending: [6,5,4,3,2,1]; the 2nd largest is 5.'},
      {input:'nums = [3,2,3,1,2,4,5,5,6], k = 4',output:'4',explanation:'Duplicates count: descending [6,5,5,4,...], the 4th is 4.'},
    ],
    constraints:['1 <= k <= nums.length <= 10⁵','-10⁴ <= nums[i] <= 10⁴'],
    hints:['Full sort is O(n log n) — fine as a first pass, but you can do better','Keep a min-heap of the k largest seen so far; its root is the answer','Quickselect: partition like quicksort but recurse into only one side'],
    tags:['array','heap','quickselect','sorting'], timeComplexity:'O(n) average', spaceComplexity:'O(k)',
    starterCode:{
      python:`import heapq

def find_kth_largest(nums, k):
    pass
`,
      javascript:`function findKthLargest(nums, k) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(find_kth_largest([3,2,1,5,6,4],2),5,'example 1')
_t(find_kth_largest([3,2,3,1,2,4,5,5,6],4),4,'with duplicates')
_t(find_kth_largest([1],1),1,'single element')
_t(find_kth_largest([7,6,5,4,3,2,1],5),3,'descending input')
_t(find_kth_largest([2,1],2),1,'k equals length')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(findKthLargest([3,2,1,5,6,4],2),5,'example 1');
_t(findKthLargest([3,2,3,1,2,4,5,5,6],4),4,'with duplicates');
_t(findKthLargest([1],1),1,'single element');
_t(findKthLargest([7,6,5,4,3,2,1],5),3,'descending input');
_t(findKthLargest([2,1],2),1,'k equals length');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'median-two-sorted-arrays', title:'Median of Two Sorted Arrays', difficulty:'Expert', category:'Sorting & Searching',
    description:'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log(m+n)). Merging the arrays is O(m+n) and does not meet the bar — the intended solution binary-searches the partition point of the smaller array. Return the median as a float.',
    examples:[
      {input:'nums1 = [1,3], nums2 = [2]',output:'2.0',explanation:'Merged array = [1,2,3], median is 2.'},
      {input:'nums1 = [1,2], nums2 = [3,4]',output:'2.5',explanation:'Merged array = [1,2,3,4], median is (2 + 3) / 2 = 2.5.'},
    ],
    constraints:['nums1.length == m, nums2.length == n','0 <= m, n <= 1000','1 <= m + n <= 2000','-10⁶ <= nums1[i], nums2[i] <= 10⁶','Both arrays sorted ascending'],
    hints:['Binary search the smaller array for a cut position i; the other cut j is determined by (m+n+1)/2 - i','The cut is correct when maxLeft1 <= minRight2 and maxLeft2 <= minRight1','Handle empty sides with ±infinity sentinels; odd totals take max of lefts, even totals average the two middles'],
    tags:['array','binary-search','divide-and-conquer'], timeComplexity:'O(log min(m,n))', spaceComplexity:'O(1)',
    starterCode:{
      python:`def find_median_sorted_arrays(nums1, nums2):
    pass
`,
      javascript:`function findMedianSortedArrays(nums1, nums2) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(find_median_sorted_arrays([1,3],[2]),2.0,'example 1')
_t(find_median_sorted_arrays([1,2],[3,4]),2.5,'example 2')
_t(find_median_sorted_arrays([0,0],[0,0]),0.0,'all zeros')
_t(find_median_sorted_arrays([],[1]),1.0,'first empty')
_t(find_median_sorted_arrays([2],[]),2.0,'second empty')
_t(find_median_sorted_arrays([1,2],[-1,3]),1.5,'interleaved')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(findMedianSortedArrays([1,3],[2]),2,'example 1');
_t(findMedianSortedArrays([1,2],[3,4]),2.5,'example 2');
_t(findMedianSortedArrays([0,0],[0,0]),0,'all zeros');
_t(findMedianSortedArrays([],[1]),1,'first empty');
_t(findMedianSortedArrays([2],[]),2,'second empty');
_t(findMedianSortedArrays([1,2],[-1,3]),1.5,'interleaved');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
