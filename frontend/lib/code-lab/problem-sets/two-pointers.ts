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
]
