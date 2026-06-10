import { PY_HARNESS, JS_HARNESS, type ProblemDef } from './harness'

export const ARRAYS_STRINGS: ProblemDef[] = [
  {
    id:'two-sum', title:'Two Sum', difficulty:'Beginner', category:'Arrays & Strings',
    description:'Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target. You may assume that each input has exactly one solution, and you may not use the same element twice. Return the answer with the smaller index first. Follow-up: can you come up with an algorithm that is less than O(n²) time complexity?',
    examples:[
      {input:'nums = [2,7,11,15], target = 9',output:'[0,1]',explanation:'nums[0] + nums[1] = 2 + 7 = 9, so we return [0, 1].'},
      {input:'nums = [3,2,4], target = 6',output:'[1,2]',explanation:'nums[1] + nums[2] = 2 + 4 = 6.'},
      {input:'nums = [3,3], target = 6',output:'[0,1]'},
    ],
    constraints:['2 <= nums.length <= 10⁴','-10⁹ <= nums[i] <= 10⁹','-10⁹ <= target <= 10⁹','Exactly one valid answer exists'],
    hints:['A brute-force double loop is O(n²) — try trading space for time','Store each number\'s index in a hash map as you scan','For each num, the partner you need is target - num; check whether it is already in the map'],
    tags:['array','hash-map'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def two_sum(nums, target):
    pass
`,
      javascript:`function twoSum(nums, target) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(two_sum([2,7,11,15],9),[0,1],'example 1')
_t(two_sum([3,2,4],6),[1,2],'example 2')
_t(two_sum([3,3],6),[0,1],'duplicate values')
_t(two_sum([-1,-2,-3,-4,-5],-8),[2,4],'negative numbers')
_t(two_sum([0,4,3,0],0),[0,3],'zeros sum to zero')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(twoSum([2,7,11,15],9),[0,1],'example 1');
_t(twoSum([3,2,4],6),[1,2],'example 2');
_t(twoSum([3,3],6),[0,1],'duplicate values');
_t(twoSum([-1,-2,-3,-4,-5],-8),[2,4],'negative numbers');
_t(twoSum([0,4,3,0],0),[0,3],'zeros sum to zero');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'best-time-stock', title:'Best Time to Buy and Sell Stock', difficulty:'Beginner', category:'Arrays & Strings',
    description:'You are given an array prices where prices[i] is the price of a given stock on the i-th day. You want to maximize your profit by choosing a single day to buy one stock and a different day in the future to sell it. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    examples:[
      {input:'prices = [7,1,5,3,6,4]',output:'5',explanation:'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5. You must buy before you sell, so buying at 1 and selling at 7 is not allowed.'},
      {input:'prices = [7,6,4,3,1]',output:'0',explanation:'Prices only decrease, so no transaction is profitable and the answer is 0.'},
    ],
    constraints:['1 <= prices.length <= 10⁵','0 <= prices[i] <= 10⁴'],
    hints:['Checking every buy/sell pair is O(n²) — a single pass suffices','Track the minimum price seen so far as you sweep left to right','At each day, the best profit selling today is price - minSoFar; keep the maximum'],
    tags:['array','greedy','dynamic-programming'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def max_profit(prices):
    pass
`,
      javascript:`function maxProfit(prices) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(max_profit([7,1,5,3,6,4]),5,'example 1')
_t(max_profit([7,6,4,3,1]),0,'strictly decreasing')
_t(max_profit([1,2]),1,'two days')
_t(max_profit([2,4,1]),2,'peak before valley')
_t(max_profit([3,2,6,5,0,3]),4,'buy at 2 sell at 6')
_t(max_profit([5]),0,'single day')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(maxProfit([7,1,5,3,6,4]),5,'example 1');
_t(maxProfit([7,6,4,3,1]),0,'strictly decreasing');
_t(maxProfit([1,2]),1,'two days');
_t(maxProfit([2,4,1]),2,'peak before valley');
_t(maxProfit([3,2,6,5,0,3]),4,'buy at 2 sell at 6');
_t(maxProfit([5]),0,'single day');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'product-except-self', title:'Product of Array Except Self', difficulty:'Intermediate', category:'Arrays & Strings',
    description:'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation. Follow-up: can you solve it in O(1) extra space (the output array does not count)?',
    examples:[
      {input:'nums = [1,2,3,4]',output:'[24,12,8,6]',explanation:'answer[0] = 2·3·4 = 24, answer[1] = 1·3·4 = 12, and so on.'},
      {input:'nums = [-1,1,0,-3,3]',output:'[0,0,9,0,0]',explanation:'Every position containing a non-zero element gets 0 because the array contains a zero elsewhere.'},
    ],
    constraints:['2 <= nums.length <= 10⁵','-30 <= nums[i] <= 30','Division is not allowed','Must run in O(n) time'],
    hints:['answer[i] is (product of everything left of i) × (product of everything right of i)','Build prefix products in one pass, then sweep from the right multiplying in suffix products','You can store prefixes directly in the output array and carry the suffix in a single variable'],
    tags:['array','prefix-sum'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def product_except_self(nums):
    pass
`,
      javascript:`function productExceptSelf(nums) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(product_except_self([1,2,3,4]),[24,12,8,6],'example 1')
_t(product_except_self([-1,1,0,-3,3]),[0,0,9,0,0],'contains zero')
_t(product_except_self([2,3]),[3,2],'two elements')
_t(product_except_self([1,1,1,1]),[1,1,1,1],'all ones')
_t(product_except_self([0,0]),[0,0],'two zeros')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(productExceptSelf([1,2,3,4]),[24,12,8,6],'example 1');
_t(productExceptSelf([-1,1,0,-3,3]),[0,0,9,0,0],'contains zero');
_t(productExceptSelf([2,3]),[3,2],'two elements');
_t(productExceptSelf([1,1,1,1]),[1,1,1,1],'all ones');
_t(productExceptSelf([0,0]),[0,0],'two zeros');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'maximum-subarray', title:'Maximum Subarray', difficulty:'Intermediate', category:'Arrays & Strings',
    description:'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum, and return its sum. Follow-up: if you have figured out the O(n) solution (Kadane\'s algorithm), try coding a solution using the divide-and-conquer approach, which is more subtle.',
    examples:[
      {input:'nums = [-2,1,-3,4,-1,2,1,-5,4]',output:'6',explanation:'The subarray [4,-1,2,1] has the largest sum, 6.'},
      {input:'nums = [1]',output:'1',explanation:'The only subarray is [1].'},
      {input:'nums = [5,4,-1,7,8]',output:'23',explanation:'The whole array has the largest sum.'},
    ],
    constraints:['1 <= nums.length <= 10⁵','-10⁴ <= nums[i] <= 10⁴'],
    hints:['At each index decide: extend the running subarray or start fresh at this element','cur = max(num, cur + num); the answer is the best cur seen anywhere','Careful with all-negative arrays — the answer is the largest single element, never an empty sum'],
    tags:['array','dynamic-programming','divide-and-conquer','kadane'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def max_subarray(nums):
    pass
`,
      javascript:`function maxSubarray(nums) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(max_subarray([-2,1,-3,4,-1,2,1,-5,4]),6,'example 1')
_t(max_subarray([1]),1,'single element')
_t(max_subarray([5,4,-1,7,8]),23,'whole array')
_t(max_subarray([-1]),-1,'single negative')
_t(max_subarray([-2,-1]),-1,'all negative')
_t(max_subarray([8,-19,5,-4,20]),21,'restart mid-array')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(maxSubarray([-2,1,-3,4,-1,2,1,-5,4]),6,'example 1');
_t(maxSubarray([1]),1,'single element');
_t(maxSubarray([5,4,-1,7,8]),23,'whole array');
_t(maxSubarray([-1]),-1,'single negative');
_t(maxSubarray([-2,-1]),-1,'all negative');
_t(maxSubarray([8,-19,5,-4,20]),21,'restart mid-array');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'merge-intervals', title:'Merge Intervals', difficulty:'Intermediate', category:'Arrays & Strings',
    description:'Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input. The output must be sorted by start time. Intervals that merely touch (one ends exactly where another begins) are considered overlapping.',
    examples:[
      {input:'intervals = [[1,3],[2,6],[8,10],[15,18]]',output:'[[1,6],[8,10],[15,18]]',explanation:'[1,3] and [2,6] overlap, so they merge into [1,6].'},
      {input:'intervals = [[1,4],[4,5]]',output:'[[1,5]]',explanation:'[1,4] and [4,5] touch at 4 and are considered overlapping.'},
    ],
    constraints:['1 <= intervals.length <= 10⁴','intervals[i].length == 2','0 <= start_i <= end_i <= 10⁴','Input is not guaranteed to be sorted'],
    hints:['Sort the intervals by start time first','Walk the sorted list keeping a current merged interval; extend its end while the next start is <= the current end','When the next interval starts after the current end, push the merged interval and start a new one'],
    tags:['array','sorting','intervals'], timeComplexity:'O(n log n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def merge_intervals(intervals):
    pass
`,
      javascript:`function mergeIntervals(intervals) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(merge_intervals([[1,3],[2,6],[8,10],[15,18]]),[[1,6],[8,10],[15,18]],'example 1')
_t(merge_intervals([[1,4],[4,5]]),[[1,5]],'touching intervals')
_t(merge_intervals([[1,4],[2,3]]),[[1,4]],'fully contained')
_t(merge_intervals([[5,6],[1,2]]),[[1,2],[5,6]],'unsorted input')
_t(merge_intervals([[1,4],[0,4]]),[[0,4]],'same end')
_t(merge_intervals([[2,2]]),[[2,2]],'single point interval')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(mergeIntervals([[1,3],[2,6],[8,10],[15,18]]),[[1,6],[8,10],[15,18]],'example 1');
_t(mergeIntervals([[1,4],[4,5]]),[[1,5]],'touching intervals');
_t(mergeIntervals([[1,4],[2,3]]),[[1,4]],'fully contained');
_t(mergeIntervals([[5,6],[1,2]]),[[1,2],[5,6]],'unsorted input');
_t(mergeIntervals([[1,4],[0,4]]),[[0,4]],'same end');
_t(mergeIntervals([[2,2]]),[[2,2]],'single point interval');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'first-missing-positive', title:'First Missing Positive', difficulty:'Expert', category:'Arrays & Strings',
    description:'Given an unsorted integer array nums, return the smallest positive integer that is not present in nums. You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space. The array may contain duplicates, zeros, and negative numbers — none of which affect the answer.',
    examples:[
      {input:'nums = [1,2,0]',output:'3',explanation:'The numbers 1 and 2 are present, so the smallest missing positive is 3.'},
      {input:'nums = [3,4,-1,1]',output:'2',explanation:'1 is present but 2 is missing.'},
      {input:'nums = [7,8,9,11,12]',output:'1',explanation:'The smallest positive integer 1 is missing.'},
    ],
    constraints:['1 <= nums.length <= 10⁵','-2³¹ <= nums[i] <= 2³¹ - 1','Must run in O(n) time with O(1) extra space'],
    hints:['The answer is always in the range [1, n+1] where n is the array length — values outside [1, n] are irrelevant','Use the array itself as a hash table: the value v belongs at index v-1','Cyclic sort: repeatedly swap nums[i] into its correct slot, then scan for the first index where nums[i] != i+1'],
    tags:['array','in-place','cyclic-sort'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def first_missing_positive(nums):
    pass
`,
      javascript:`function firstMissingPositive(nums) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(first_missing_positive([1,2,0]),3,'example 1')
_t(first_missing_positive([3,4,-1,1]),2,'example 2')
_t(first_missing_positive([7,8,9,11,12]),1,'no small positives')
_t(first_missing_positive([1]),2,'single element')
_t(first_missing_positive([2,1]),3,'complete pair')
_t(first_missing_positive([1,1]),2,'duplicates')
_t(first_missing_positive([-5]),1,'only negative')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(firstMissingPositive([1,2,0]),3,'example 1');
_t(firstMissingPositive([3,4,-1,1]),2,'example 2');
_t(firstMissingPositive([7,8,9,11,12]),1,'no small positives');
_t(firstMissingPositive([1]),2,'single element');
_t(firstMissingPositive([2,1]),3,'complete pair');
_t(firstMissingPositive([1,1]),2,'duplicates');
_t(firstMissingPositive([-5]),1,'only negative');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
