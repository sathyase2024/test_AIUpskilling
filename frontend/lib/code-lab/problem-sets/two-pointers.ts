import { PY_HARNESS, JS_HARNESS, type ProblemDef } from './harness'

export const TWO_POINTERS: ProblemDef[] = [
  {
    id:'valid-palindrome', title:'Valid Palindrome', difficulty:'Beginner', category:'Two Pointers',
    description:'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.',
    examples:[
      {input:'s = "A man, a plan, a canal: Panama"',output:'true',explanation:'After cleaning, "amanaplanacanalpanama" is a palindrome.'},
      {input:'s = "race a car"',output:'false',explanation:'"raceacar" is not a palindrome.'},
      {input:'s = " "',output:'true',explanation:'After removing non-alphanumeric characters, s is the empty string "", which reads the same forward and backward.'},
    ],
    constraints:['1 <= s.length <= 2·10⁵','s consists only of printable ASCII characters'],
    hints:['Two pointers from both ends avoid building a cleaned copy of the string','Skip characters that are not letters or digits before comparing','Remember digits count: "0P" is NOT a palindrome since 0 != p'],
    tags:['string','two-pointers'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def is_palindrome(s):
    pass
`,
      javascript:`function isPalindrome(s) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(is_palindrome('A man, a plan, a canal: Panama'),True,'example 1')
_t(is_palindrome('race a car'),False,'example 2')
_t(is_palindrome(' '),True,'whitespace only')
_t(is_palindrome('0P'),False,'digit vs letter')
_t(is_palindrome('ab_a'),True,'underscore ignored')
_t(is_palindrome('a'),True,'single char')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(isPalindrome('A man, a plan, a canal: Panama'),true,'example 1');
_t(isPalindrome('race a car'),false,'example 2');
_t(isPalindrome(' '),true,'whitespace only');
_t(isPalindrome('0P'),false,'digit vs letter');
_t(isPalindrome('ab_a'),true,'underscore ignored');
_t(isPalindrome('a'),true,'single char');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'three-sum', title:'3Sum', difficulty:'Intermediate', category:'Two Pointers',
    description:'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets. The tests normalize ordering, so triplets may be returned in any order.',
    examples:[
      {input:'nums = [-1,0,1,2,-1,-4]',output:'[[-1,-1,2],[-1,0,1]]',explanation:'The distinct triplets summing to 0 are [-1,0,1] and [-1,-1,2]. Note [-1,0,1] is only counted once even though it can be formed two ways.'},
      {input:'nums = [0,1,1]',output:'[]',explanation:'No triplet sums to 0.'},
      {input:'nums = [0,0,0]',output:'[[0,0,0]]',explanation:'The only possible triplet sums to 0.'},
    ],
    constraints:['3 <= nums.length <= 3000','-10⁵ <= nums[i] <= 10⁵'],
    hints:['Sort the array first — duplicates become adjacent and easy to skip','Fix the first element, then run two pointers from both ends of the remainder looking for the complement','After finding a triplet, advance past equal values on both pointers to avoid duplicate triplets'],
    tags:['array','two-pointers','sorting'], timeComplexity:'O(n²)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def three_sum(nums):
    pass
`,
      javascript:`function threeSum(nums) {

}
`,
    },
    testCode:{
      python:`_norm=lambda a:sorted(sorted(t) for t in a)
${PY_HARNESS}
_t(_norm(three_sum([-1,0,1,2,-1,-4])),[[-1,-1,2],[-1,0,1]],'example 1')
_t(_norm(three_sum([0,1,1])),[],'no solution')
_t(_norm(three_sum([0,0,0])),[[0,0,0]],'all zeros')
_t(_norm(three_sum([-2,0,1,1,2])),[[-2,0,2],[-2,1,1]],'two triplets')
_t(_norm(three_sum([0,0,0,0])),[[0,0,0]],'extra zeros deduped')
print(f'{_p}/{_n} tests passed')`,
      javascript:`const _norm=a=>a.map(t=>[...t].sort((x,y)=>x-y)).sort((x,y)=>x[0]-y[0]||x[1]-y[1]||x[2]-y[2]);
${JS_HARNESS}
_t(_norm(threeSum([-1,0,1,2,-1,-4])),[[-1,-1,2],[-1,0,1]],'example 1');
_t(_norm(threeSum([0,1,1])),[],'no solution');
_t(_norm(threeSum([0,0,0])),[[0,0,0]],'all zeros');
_t(_norm(threeSum([-2,0,1,1,2])),[[-2,0,2],[-2,1,1]],'two triplets');
_t(_norm(threeSum([0,0,0,0])),[[0,0,0]],'extra zeros deduped');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'container-most-water', title:'Container With Most Water', difficulty:'Intermediate', category:'Two Pointers',
    description:'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the i-th line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container holds the most water. Return the maximum amount of water a container can store. Notice that you may not slant the container.',
    examples:[
      {input:'height = [1,8,6,2,5,4,8,3,7]',output:'49',explanation:'The lines at indices 1 and 8 (heights 8 and 7) form a container of width 7 and height min(8,7) = 7, area 49.'},
      {input:'height = [1,1]',output:'1',explanation:'Width 1 × height 1 = 1.'},
    ],
    constraints:['n == height.length','2 <= n <= 10⁵','0 <= height[i] <= 10⁴'],
    hints:['Area between pointers l and r is (r - l) × min(height[l], height[r])','Start with the widest container: pointers at both ends','Moving the taller pointer inward can never help — always move the shorter one'],
    tags:['array','two-pointers','greedy'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def max_area(height):
    pass
`,
      javascript:`function maxArea(height) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(max_area([1,8,6,2,5,4,8,3,7]),49,'example 1')
_t(max_area([1,1]),1,'two lines')
_t(max_area([4,3,2,1,4]),16,'equal ends')
_t(max_area([1,2,1]),2,'small peak')
_t(max_area([2,3,4,5,18,17,6]),17,'tall middle pair')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(maxArea([1,8,6,2,5,4,8,3,7]),49,'example 1');
_t(maxArea([1,1]),1,'two lines');
_t(maxArea([4,3,2,1,4]),16,'equal ends');
_t(maxArea([1,2,1]),2,'small peak');
_t(maxArea([2,3,4,5,18,17,6]),17,'tall middle pair');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'trapping-rain-water', title:'Trapping Rain Water', difficulty:'Advanced', category:'Two Pointers',
    description:'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining. Water trapped above each bar is bounded by the tallest bars to its left and to its right: water at index i equals max(0, min(maxLeft, maxRight) - height[i]).',
    examples:[
      {input:'height = [0,1,0,2,1,0,1,3,2,1,2,1]',output:'6',explanation:'The elevation map traps 6 units of rain water in the valleys between the bars of heights 2 and 3.'},
      {input:'height = [4,2,0,3,2,5]',output:'9',explanation:'9 units collect between the walls of height 4 and 5.'},
    ],
    constraints:['n == height.length','1 <= n <= 2·10⁴','0 <= height[i] <= 10⁵'],
    hints:['Brute force computes maxLeft/maxRight per index — O(n²); precomputing both arrays makes it O(n) time, O(n) space','For O(1) space use two pointers with running leftMax and rightMax','Advance the side with the smaller max: the water level there is already decided by that smaller max'],
    tags:['array','two-pointers','stack','dynamic-programming'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def trap(height):
    pass
`,
      javascript:`function trap(height) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(trap([0,1,0,2,1,0,1,3,2,1,2,1]),6,'example 1')
_t(trap([4,2,0,3,2,5]),9,'example 2')
_t(trap([1,2,3]),0,'monotonic — traps nothing')
_t(trap([3]),0,'single bar')
_t(trap([5,4,1,2]),1,'shallow right wall')
_t(trap([2,0,2]),2,'simple valley')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(trap([0,1,0,2,1,0,1,3,2,1,2,1]),6,'example 1');
_t(trap([4,2,0,3,2,5]),9,'example 2');
_t(trap([1,2,3]),0,'monotonic — traps nothing');
_t(trap([3]),0,'single bar');
_t(trap([5,4,1,2]),1,'shallow right wall');
_t(trap([2,0,2]),2,'simple valley');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'move-zeroes', title:'Move Zeroes', difficulty:'Beginner', category:'Two Pointers',
    description:'Given an integer array nums, move all 0\'s to the end of it while maintaining the relative order of the non-zero elements. You must do this in place without making a copy of the array, and return the modified array so the tests can compare it directly. Follow-up: minimize the total number of operations.',
    examples:[
      {input:'nums = [0,1,0,3,12]',output:'[1,3,12,0,0]',explanation:'The non-zero elements keep their order; both zeros move to the end.'},
      {input:'nums = [0]',output:'[0]',explanation:'A single zero stays in place.'},
    ],
    constraints:['1 <= nums.length <= 10⁴','-2³¹ <= nums[i] <= 2³¹ - 1'],
    hints:['Use a slow pointer marking where the next non-zero element should land','Scan with a fast pointer; when it finds a non-zero, write it at the slow pointer and advance both','After all non-zeros are placed, fill the remaining tail with zeros (or swap as you go)'],
    tags:['array','two-pointers','in-place'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def move_zeroes(nums):
    pass
`,
      javascript:`function moveZeroes(nums) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(move_zeroes([0,1,0,3,12]),[1,3,12,0,0],'example 1')
_t(move_zeroes([0]),[0],'single zero')
_t(move_zeroes([1,2,3]),[1,2,3],'no zeros')
_t(move_zeroes([0,0,1]),[1,0,0],'leading zeros')
_t(move_zeroes([1,0,2,0,3]),[1,2,3,0,0],'interleaved zeros')
_t(move_zeroes([0,0,0]),[0,0,0],'all zeros')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(moveZeroes([0,1,0,3,12]),[1,3,12,0,0],'example 1');
_t(moveZeroes([0]),[0],'single zero');
_t(moveZeroes([1,2,3]),[1,2,3],'no zeros');
_t(moveZeroes([0,0,1]),[1,0,0],'leading zeros');
_t(moveZeroes([1,0,2,0,3]),[1,2,3,0,0],'interleaved zeros');
_t(moveZeroes([0,0,0]),[0,0,0],'all zeros');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'remove-duplicates-sorted', title:'Remove Duplicates from Sorted Array', difficulty:'Beginner', category:'Two Pointers',
    description:'Given an integer array nums sorted in non-decreasing order, remove the duplicates so that each unique element appears only once, keeping the relative order. To make the result simple to compare across languages, return the list of unique elements in order (the deduped prefix), rather than a count.',
    examples:[
      {input:'nums = [1,1,2]',output:'[1,2]',explanation:'The unique elements in order are 1 and 2.'},
      {input:'nums = [0,0,1,1,1,2,2,3,3,4]',output:'[0,1,2,3,4]',explanation:'Each of the five distinct values appears once in the result.'},
    ],
    constraints:['1 <= nums.length <= 3·10⁴','-100 <= nums[i] <= 100','nums is sorted in non-decreasing order'],
    hints:['Because the array is sorted, duplicates are adjacent','Keep a write pointer for the next slot; only write a value when it differs from the previous kept value','The first element is always kept'],
    tags:['array','two-pointers'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def remove_duplicates(nums):
    pass
`,
      javascript:`function removeDuplicates(nums) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(remove_duplicates([1,1,2]),[1,2],'example 1')
_t(remove_duplicates([0,0,1,1,1,2,2,3,3,4]),[0,1,2,3,4],'example 2')
_t(remove_duplicates([1]),[1],'single element')
_t(remove_duplicates([1,2,3]),[1,2,3],'already unique')
_t(remove_duplicates([2,2,2,2]),[2],'all duplicates')
_t(remove_duplicates([-3,-3,-1,0,0]),[-3,-1,0],'negatives')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(removeDuplicates([1,1,2]),[1,2],'example 1');
_t(removeDuplicates([0,0,1,1,1,2,2,3,3,4]),[0,1,2,3,4],'example 2');
_t(removeDuplicates([1]),[1],'single element');
_t(removeDuplicates([1,2,3]),[1,2,3],'already unique');
_t(removeDuplicates([2,2,2,2]),[2],'all duplicates');
_t(removeDuplicates([-3,-3,-1,0,0]),[-3,-1,0],'negatives');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'sort-colors', title:'Sort Colors', difficulty:'Intermediate', category:'Two Pointers',
    description:'Given an array nums with n objects colored red, white, or blue, sort them in place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. We use the integers 0, 1, and 2 to represent the colors red, white, and blue respectively. You must solve this without using the library\'s sort function, and return the modified array so the tests can compare it directly. Follow-up: can you solve it in one pass with O(1) extra space?',
    examples:[
      {input:'nums = [2,0,2,1,1,0]',output:'[0,0,1,1,2,2]',explanation:'The colors are grouped 0s, then 1s, then 2s.'},
      {input:'nums = [2,0,1]',output:'[0,1,2]',explanation:'A single pass groups the three colors.'},
    ],
    constraints:['n == nums.length','1 <= n <= 300','nums[i] is either 0, 1, or 2'],
    hints:['A counting sort over three buckets works but takes two passes','Dutch national flag: maintain pointers low, mid, and high','Scan with mid: swap 0s to the low region, 2s to the high region, and leave 1s in place'],
    tags:['array','two-pointers','sorting','dutch-national-flag'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def sort_colors(nums):
    pass
`,
      javascript:`function sortColors(nums) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(sort_colors([2,0,2,1,1,0]),[0,0,1,1,2,2],'example 1')
_t(sort_colors([2,0,1]),[0,1,2],'example 2')
_t(sort_colors([0]),[0],'single element')
_t(sort_colors([1,1,1]),[1,1,1],'all same')
_t(sort_colors([2,2,0,0,1,1]),[0,0,1,1,2,2],'reverse grouped')
_t(sort_colors([1,0,2,0]),[0,0,1,2],'mixed')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(sortColors([2,0,2,1,1,0]),[0,0,1,1,2,2],'example 1');
_t(sortColors([2,0,1]),[0,1,2],'example 2');
_t(sortColors([0]),[0],'single element');
_t(sortColors([1,1,1]),[1,1,1],'all same');
_t(sortColors([2,2,0,0,1,1]),[0,0,1,1,2,2],'reverse grouped');
_t(sortColors([1,0,2,0]),[0,0,1,2],'mixed');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'three-sum-closest', title:'3Sum Closest', difficulty:'Intermediate', category:'Two Pointers',
    description:'Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. Each input is generated such that exactly one solution (one closest sum) exists.',
    examples:[
      {input:'nums = [-1,2,1,-4], target = 1',output:'2',explanation:'The sum that is closest to the target is 2 (from -1 + 2 + 1 = 2).'},
      {input:'nums = [0,0,0], target = 1',output:'0',explanation:'The only triplet sums to 0, which is the closest possible.'},
    ],
    constraints:['3 <= nums.length <= 500','-1000 <= nums[i] <= 1000','-10⁴ <= target <= 10⁴','Exactly one closest sum exists'],
    hints:['Sort the array so you can move two pointers intelligently','Fix the first element, then run left/right pointers on the remainder','Track the sum with the smallest absolute distance to target; move the pointer that reduces the gap'],
    tags:['array','two-pointers','sorting'], timeComplexity:'O(n²)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def three_sum_closest(nums, target):
    pass
`,
      javascript:`function threeSumClosest(nums, target) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(three_sum_closest([-1,2,1,-4],1),2,'example 1')
_t(three_sum_closest([0,0,0],1),0,'all zeros')
_t(three_sum_closest([1,1,0],-100),2,'far below target')
_t(three_sum_closest([1,2,4,8,16,32,64,128],82),82,'exact match')
_t(three_sum_closest([-3,-2,-5,3,-4],-1),-2,'negatives')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(threeSumClosest([-1,2,1,-4],1),2,'example 1');
_t(threeSumClosest([0,0,0],1),0,'all zeros');
_t(threeSumClosest([1,1,0],-100),2,'far below target');
_t(threeSumClosest([1,2,4,8,16,32,64,128],82),82,'exact match');
_t(threeSumClosest([-3,-2,-5,3,-4],-1),-2,'negatives');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
