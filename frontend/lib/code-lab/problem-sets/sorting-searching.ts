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
  {
    id:'find-min-rotated', title:'Find Minimum in Rotated Sorted Array', difficulty:'Intermediate', category:'Sorting & Searching',
    description:'Suppose an array of length n sorted in ascending order with distinct values is rotated between 1 and n times. Given the rotated sorted array nums of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time — scanning the array is O(n) and does not meet the bar.',
    examples:[
      {input:'nums = [3,4,5,1,2]',output:'1',explanation:'The original array was [1,2,3,4,5] rotated 3 times; the minimum is 1.'},
      {input:'nums = [4,5,6,7,0,1,2]',output:'0',explanation:'The original array was [0,1,2,4,5,6,7] rotated 4 times; the minimum is 0.'},
      {input:'nums = [11,13,15,17]',output:'11',explanation:'The array was rotated 4 times (back to sorted); the minimum is the first element 11.'},
    ],
    constraints:['n == nums.length','1 <= n <= 5000','-5000 <= nums[i] <= 5000','All the integers of nums are unique','nums is sorted ascending then rotated between 1 and n times'],
    hints:['The minimum is the only element smaller than its predecessor (the rotation pivot)','Compare nums[mid] with nums[hi]: if nums[mid] > nums[hi], the pivot is to the right','Otherwise the minimum is at mid or to its left; shrink hi to mid'],
    tags:['array','binary-search'], timeComplexity:'O(log n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def find_min(nums):
    pass
`,
      javascript:`function findMin(nums) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(find_min([3,4,5,1,2]),1,'example 1')
_t(find_min([4,5,6,7,0,1,2]),0,'example 2')
_t(find_min([11,13,15,17]),11,'no effective rotation')
_t(find_min([2,1]),1,'two elements')
_t(find_min([1]),1,'single element')
_t(find_min([5,1,2,3,4]),1,'pivot near start')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(findMin([3,4,5,1,2]),1,'example 1');
_t(findMin([4,5,6,7,0,1,2]),0,'example 2');
_t(findMin([11,13,15,17]),11,'no effective rotation');
_t(findMin([2,1]),1,'two elements');
_t(findMin([1]),1,'single element');
_t(findMin([5,1,2,3,4]),1,'pivot near start');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'search-2d-matrix', title:'Search a 2D Matrix', difficulty:'Intermediate', category:'Sorting & Searching',
    description:'You are given an m x n integer matrix with two properties: each row is sorted in non-decreasing order, and the first integer of each row is greater than the last integer of the previous row. Given an integer target, return true if target is in the matrix or false otherwise. You must write a solution in O(log(m·n)) time — because the matrix reads as one fully sorted sequence row by row, a single binary search over the m·n virtual indices works.',
    examples:[
      {input:'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3',output:'true',explanation:'3 is present in the first row.'},
      {input:'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13',output:'false',explanation:'13 is not present in the matrix.'},
    ],
    constraints:['m == matrix.length','n == matrix[i].length','1 <= m, n <= 100','-10⁴ <= matrix[i][j], target <= 10⁴'],
    hints:['Treat the matrix as a flat sorted array of length m·n','Map a flat index idx to row = idx // n and column = idx % n','Binary search the range [0, m·n - 1] comparing matrix[row][col] with target'],
    tags:['array','binary-search','matrix'], timeComplexity:'O(log(m·n))', spaceComplexity:'O(1)',
    starterCode:{
      python:`def search_matrix(matrix, target):
    pass
`,
      javascript:`function searchMatrix(matrix, target) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_m=[[1,3,5,7],[10,11,16,20],[23,30,34,60]]
_t(search_matrix(_m,3),True,'example 1')
_t(search_matrix(_m,13),False,'example 2')
_t(search_matrix(_m,1),True,'top-left corner')
_t(search_matrix(_m,60),True,'bottom-right corner')
_t(search_matrix([[1]],1),True,'single hit')
_t(search_matrix([[1]],2),False,'single miss')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
const _m=[[1,3,5,7],[10,11,16,20],[23,30,34,60]];
_t(searchMatrix(_m,3),true,'example 1');
_t(searchMatrix(_m,13),false,'example 2');
_t(searchMatrix(_m,1),true,'top-left corner');
_t(searchMatrix(_m,60),true,'bottom-right corner');
_t(searchMatrix([[1]],1),true,'single hit');
_t(searchMatrix([[1]],2),false,'single miss');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'koko-eating-bananas', title:'Koko Eating Bananas', difficulty:'Intermediate', category:'Sorting & Searching',
    description:'Koko loves to eat bananas. There are n piles of bananas, the i-th pile has piles[i] bananas. The guards have gone and will come back in h hours. Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile and eats k bananas from it. If the pile has fewer than k bananas, she eats all of them and will not eat any more during that hour. Koko likes to eat slowly but still wants to finish all the bananas before the guards return. Return the minimum integer k such that she can eat all the bananas within h hours. The answer is found by binary-searching the eating speed (the answer space), since the hours needed are monotonically non-increasing in k.',
    examples:[
      {input:'piles = [3,6,7,11], h = 8',output:'4',explanation:'At speed 4, hours = 1 + 2 + 2 + 3 = 8, exactly within the limit; speed 3 would need 1+2+3+4 = 10 hours.'},
      {input:'piles = [30,11,23,4,20], h = 5',output:'30',explanation:'With only 5 hours (one pile per hour), Koko must eat the largest pile in a single hour, so k = 30.'},
      {input:'piles = [30,11,23,4,20], h = 6',output:'23',explanation:'With 6 hours she can split: speed 23 needs 2+1+1+1+1 = 6 hours.'},
    ],
    constraints:['1 <= piles.length <= 10⁴','piles.length <= h <= 10⁹','1 <= piles[i] <= 10⁹','The answer fits in a signed 32-bit integer'],
    hints:['The feasible speeds range from 1 to max(piles); larger k never needs more hours','For a candidate speed k, hours = Σ ceil(piles[i] / k)','Binary search the smallest k whose required hours is <= h'],
    tags:['array','binary-search'], timeComplexity:'O(n log max(piles))', spaceComplexity:'O(1)',
    starterCode:{
      python:`def min_eating_speed(piles, h):
    pass
`,
      javascript:`function minEatingSpeed(piles, h) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(min_eating_speed([3,6,7,11],8),4,'example 1')
_t(min_eating_speed([30,11,23,4,20],5),30,'one pile per hour')
_t(min_eating_speed([30,11,23,4,20],6),23,'six hours')
_t(min_eating_speed([1,1,1,999],1000),1,'plenty of time')
_t(min_eating_speed([312884470],968709470),1,'single huge pile, slow ok')
_t(min_eating_speed([3],3),1,'single pile slow')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(minEatingSpeed([3,6,7,11],8),4,'example 1');
_t(minEatingSpeed([30,11,23,4,20],5),30,'one pile per hour');
_t(minEatingSpeed([30,11,23,4,20],6),23,'six hours');
_t(minEatingSpeed([1,1,1,999],1000),1,'plenty of time');
_t(minEatingSpeed([312884470],968709470),1,'single huge pile, slow ok');
_t(minEatingSpeed([3],3),1,'single pile slow');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'count-smaller-after-self', title:'Count of Smaller Numbers After Self', difficulty:'Expert', category:'Sorting & Searching',
    description:'Given an integer array nums, return an integer array counts where counts[i] is the number of elements to the right of nums[i] that are strictly smaller than nums[i]. A brute-force O(n²) scan is too slow for the largest inputs; the intended approaches use a modified merge sort that counts inversions, or a Binary Indexed Tree / Fenwick tree over coordinate-compressed values, both O(n log n).',
    examples:[
      {input:'nums = [5,2,6,1]',output:'[2,1,1,0]',explanation:'To the right of 5 there are 2 smaller (2 and 1); right of 2 there is 1 smaller (1); right of 6 there is 1 smaller (1); right of 1 there are 0 smaller.'},
      {input:'nums = [-1,-1]',output:'[0,0]',explanation:'Neither -1 has a strictly smaller element to its right.'},
      {input:'nums = [-1]',output:'[0]',explanation:'A single element has nothing to its right.'},
    ],
    constraints:['1 <= nums.length <= 10⁵','-10⁴ <= nums[i] <= 10⁴'],
    hints:['Brute force compares each pair — O(n²); use divide and conquer instead','During a merge sort, when an element from the right half is placed before elements remaining in the left half, those left elements each gained a smaller-to-the-right count','Track original indices through the sort so counts land in the right output slot; a Fenwick tree over compressed values is an alternative'],
    tags:['array','merge-sort','binary-indexed-tree','divide-and-conquer'], timeComplexity:'O(n log n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def count_smaller(nums):
    pass
`,
      javascript:`function countSmaller(nums) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(count_smaller([5,2,6,1]),[2,1,1,0],'example 1')
_t(count_smaller([-1,-1]),[0,0],'equal values, none strictly smaller')
_t(count_smaller([-1]),[0],'single element')
_t(count_smaller([1,2,3,4]),[0,0,0,0],'ascending')
_t(count_smaller([4,3,2,1]),[3,2,1,0],'descending')
_t(count_smaller([2,0,1]),[2,0,0],'mixed')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(countSmaller([5,2,6,1]),[2,1,1,0],'example 1');
_t(countSmaller([-1,-1]),[0,0],'equal values, none strictly smaller');
_t(countSmaller([-1]),[0],'single element');
_t(countSmaller([1,2,3,4]),[0,0,0,0],'ascending');
_t(countSmaller([4,3,2,1]),[3,2,1,0],'descending');
_t(countSmaller([2,0,1]),[2,0,0],'mixed');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
