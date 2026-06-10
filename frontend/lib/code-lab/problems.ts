import type { CodeLabProblem } from './types'

const PY_HARNESS = `
_p=_n=0
def _t(g,e,d=''):
    global _p,_n;_n+=1
    if g==e:_p+=1;print(f'✓ Test {_n}'+(f' - {d}' if d else ''))
    else:print(f'✗ Test {_n} - Expected {repr(e)}, got {repr(g)}'+(f' [{d}]' if d else ''))
`

const JS_HARNESS = `
let _p=0,_n=0;const _t=(g,e,d='')=>{_n++;const ok=JSON.stringify(g)===JSON.stringify(e);ok?(_p++,console.log(\`✓ Test \${_n}\`+(d?\` - \${d}\`:''))):console.log(\`✗ Test \${_n} - Expected \${JSON.stringify(e)}, got \${JSON.stringify(g)}\`+(d?\` [\${d}]\`:''));};
`

export const PROBLEMS: CodeLabProblem[] = [
  {
    id:'two-sum', num:1, title:'Two Sum', difficulty:'Beginner', category:'Arrays & Strings',
    description:'Given an array of integers and a target, return indices of the two numbers that add up to the target. Exactly one solution exists.',
    examples:[{input:'nums=[2,7,11,15], target=9',output:'[0,1]',explanation:'nums[0]+nums[1]=9'},{input:'nums=[3,2,4], target=6',output:'[1,2]'}],
    constraints:['2 ≤ nums.length ≤ 10⁴','Each input has exactly one solution','May not use same element twice'],
    hints:['Use a hash map to store each number\'s index','For each num, check if (target-num) is already in the map'],
    tags:['array','hash-map'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen: return [seen[target-n], i]
        seen[n] = i
    return []
${PY_HARNESS}
_t(two_sum([2,7,11,15],9),[0,1],'basic')
_t(two_sum([3,2,4],6),[1,2],'second pair')
_t(two_sum([3,3],6),[0,1],'duplicates')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const c = target - nums[i];
    if (seen.has(c)) return [seen.get(c), i];
    seen.set(nums[i], i);
  }
  return [];
}
${JS_HARNESS}
_t(twoSum([2,7,11,15],9),[0,1],'basic');
_t(twoSum([3,2,4],6),[1,2],'second pair');
_t(twoSum([3,3],6),[0,1],'duplicates');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'best-time-stock', num:2, title:'Best Time to Buy and Sell Stock', difficulty:'Beginner', category:'Arrays & Strings',
    description:'Given an array of prices where prices[i] is the price on day i, find the maximum profit from a single buy-sell transaction.',
    examples:[{input:'prices=[7,1,5,3,6,4]',output:'5',explanation:'Buy at 1, sell at 6'},{input:'prices=[7,6,4,3,1]',output:'0',explanation:'No profitable transaction'}],
    constraints:['1 ≤ prices.length ≤ 10⁵','0 ≤ prices[i] ≤ 10⁴'],
    hints:['Track the minimum price seen so far','At each step compute profit and update max'],
    tags:['array','greedy'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def max_profit(prices):
    min_p = float('inf'); best = 0
    for p in prices:
        min_p = min(min_p, p)
        best = max(best, p - min_p)
    return best
${PY_HARNESS}
_t(max_profit([7,1,5,3,6,4]),5,'normal case')
_t(max_profit([7,6,4,3,1]),0,'no profit')
_t(max_profit([1,2]),1,'two elements')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function maxProfit(prices) {
  let minP = Infinity, best = 0;
  for (const p of prices) {
    minP = Math.min(minP, p);
    best = Math.max(best, p - minP);
  }
  return best;
}
${JS_HARNESS}
_t(maxProfit([7,1,5,3,6,4]),5,'normal case');
_t(maxProfit([7,6,4,3,1]),0,'no profit');
_t(maxProfit([1,2]),1,'two elements');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'contains-duplicate', num:3, title:'Contains Duplicate', difficulty:'Beginner', category:'Arrays & Strings',
    description:'Return true if any value appears at least twice in the array, false if every element is distinct.',
    examples:[{input:'nums=[1,2,3,1]',output:'true'},{input:'nums=[1,2,3,4]',output:'false'}],
    constraints:['1 ≤ nums.length ≤ 10⁵','-10⁹ ≤ nums[i] ≤ 10⁹'],
    hints:['A set stores only unique values','Compare set size to array length'],
    tags:['array','hash-set'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def contains_duplicate(nums):
    return len(nums) != len(set(nums))
${PY_HARNESS}
_t(contains_duplicate([1,2,3,1]),True,'has duplicate')
_t(contains_duplicate([1,2,3,4]),False,'all unique')
_t(contains_duplicate([1,1,1,3,3,4]),True,'multiple dupes')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function containsDuplicate(nums) {
  return nums.length !== new Set(nums).size;
}
${JS_HARNESS}
_t(containsDuplicate([1,2,3,1]),true,'has duplicate');
_t(containsDuplicate([1,2,3,4]),false,'all unique');
_t(containsDuplicate([1,1,1,3,3,4]),true,'multiple dupes');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'maximum-subarray', num:4, title:'Maximum Subarray (Kadane\'s)', difficulty:'Intermediate', category:'Arrays & Strings',
    description:'Find the contiguous subarray with the largest sum and return its sum.',
    examples:[{input:'nums=[-2,1,-3,4,-1,2,1,-5,4]',output:'6',explanation:'[4,-1,2,1] has sum 6'},{input:'nums=[1]',output:'1'}],
    constraints:['1 ≤ nums.length ≤ 10⁵','-10⁴ ≤ nums[i] ≤ 10⁴'],
    hints:['At each position decide: extend current subarray or start fresh','cur = max(num, cur+num)'],
    tags:['array','dynamic-programming','kadane'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def max_subarray(nums):
    best = cur = nums[0]
    for n in nums[1:]:
        cur = max(n, cur + n)
        best = max(best, cur)
    return best
${PY_HARNESS}
_t(max_subarray([-2,1,-3,4,-1,2,1,-5,4]),6,'classic case')
_t(max_subarray([1]),1,'single element')
_t(max_subarray([5,4,-1,7,8]),23,'all positive')
_t(max_subarray([-1,-2,-3]),-1,'all negative')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function maxSubarray(nums) {
  let best = nums[0], cur = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }
  return best;
}
${JS_HARNESS}
_t(maxSubarray([-2,1,-3,4,-1,2,1,-5,4]),6,'classic case');
_t(maxSubarray([1]),1,'single element');
_t(maxSubarray([5,4,-1,7,8]),23,'all positive');
_t(maxSubarray([-1,-2,-3]),-1,'all negative');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'product-except-self', num:5, title:'Product of Array Except Self', difficulty:'Intermediate', category:'Arrays & Strings',
    description:'Return an array where output[i] equals the product of all elements except nums[i]. Must run in O(n) without division.',
    examples:[{input:'nums=[1,2,3,4]',output:'[24,12,8,6]'},{input:'nums=[-1,1,0,-3,3]',output:'[0,0,9,0,0]'}],
    constraints:['2 ≤ nums.length ≤ 10⁵','No division allowed','Answer fits in 32-bit integer'],
    hints:['Build prefix products left to right','Multiply by suffix products right to left in a second pass'],
    tags:['array','prefix-product'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def product_except_self(nums):
    n = len(nums); res = [1] * n
    l = 1
    for i in range(n): res[i] = l; l *= nums[i]
    r = 1
    for i in range(n-1, -1, -1): res[i] *= r; r *= nums[i]
    return res
${PY_HARNESS}
_t(product_except_self([1,2,3,4]),[24,12,8,6],'basic')
_t(product_except_self([-1,1,0,-3,3]),[0,0,9,0,0],'with zero')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function productExceptSelf(nums) {
  const n = nums.length, res = Array(n).fill(1);
  let l = 1;
  for (let i = 0; i < n; i++) { res[i] = l; l *= nums[i]; }
  let r = 1;
  for (let i = n-1; i >= 0; i--) { res[i] *= r; r *= nums[i]; }
  return res;
}
${JS_HARNESS}
_t(productExceptSelf([1,2,3,4]),[24,12,8,6],'basic');
_t(productExceptSelf([-1,1,0,-3,3]),[0,0,9,0,0],'with zero');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'valid-anagram', num:6, title:'Valid Anagram', difficulty:'Beginner', category:'Arrays & Strings',
    description:'Given two strings s and t, return true if t is an anagram of s (same characters, same counts).',
    examples:[{input:'s="anagram", t="nagaram"',output:'true'},{input:'s="rat", t="car"',output:'false'}],
    constraints:['1 ≤ s.length, t.length ≤ 5×10⁴','Strings consist of lowercase letters'],
    hints:['Sort both strings and compare','Or use a character frequency counter'],
    tags:['string','hash-map','sorting'], timeComplexity:'O(n log n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`from collections import Counter
def is_anagram(s, t):
    return Counter(s) == Counter(t)
${PY_HARNESS}
_t(is_anagram('anagram','nagaram'),True,'classic')
_t(is_anagram('rat','car'),False,'different chars')
_t(is_anagram('a','ab'),False,'different lengths')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const cnt = {};
  for (const c of s) cnt[c] = (cnt[c]||0)+1;
  for (const c of t) { if (!cnt[c]) return false; cnt[c]--; }
  return true;
}
${JS_HARNESS}
_t(isAnagram('anagram','nagaram'),true,'classic');
_t(isAnagram('rat','car'),false,'different chars');
_t(isAnagram('a','ab'),false,'different lengths');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'longest-common-prefix', num:7, title:'Longest Common Prefix', difficulty:'Beginner', category:'Arrays & Strings',
    description:'Find the longest common prefix string among an array of strings. Return empty string if none.',
    examples:[{input:'strs=["flower","flow","flight"]',output:'"fl"'},{input:'strs=["dog","racecar","car"]',output:'""'}],
    constraints:['1 ≤ strs.length ≤ 200','0 ≤ strs[i].length ≤ 200'],
    hints:['Start with the first string as prefix','Trim the prefix until each string starts with it'],
    tags:['string'], timeComplexity:'O(S)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def longest_common_prefix(strs):
    if not strs: return ''
    prefix = strs[0]
    for s in strs[1:]:
        while not s.startswith(prefix): prefix = prefix[:-1]
        if not prefix: return ''
    return prefix
${PY_HARNESS}
_t(longest_common_prefix(['flower','flow','flight']),'fl','common two chars')
_t(longest_common_prefix(['dog','racecar','car']),'','no common')
_t(longest_common_prefix(['a']),'a','single string')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function longestCommonPrefix(strs) {
  if (!strs.length) return '';
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) prefix = prefix.slice(0,-1);
    if (!prefix) return '';
  }
  return prefix;
}
${JS_HARNESS}
_t(longestCommonPrefix(['flower','flow','flight']),'fl','common two chars');
_t(longestCommonPrefix(['dog','racecar','car']),'','no common');
_t(longestCommonPrefix(['a']),'a','single string');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'valid-palindrome', num:8, title:'Valid Palindrome', difficulty:'Beginner', category:'Two Pointers',
    description:'A phrase is a palindrome if, after converting to lowercase and removing non-alphanumeric characters, it reads the same forwards and backwards.',
    examples:[{input:'s="A man, a plan, a canal: Panama"',output:'true'},{input:'s="race a car"',output:'false'}],
    constraints:['1 ≤ s.length ≤ 2×10⁵'],
    hints:['Strip to alphanumeric and lowercase first','Use two pointers from both ends'],
    tags:['string','two-pointers'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def is_palindrome(s):
    s = ''.join(c.lower() for c in s if c.isalnum())
    return s == s[::-1]
${PY_HARNESS}
_t(is_palindrome('A man, a plan, a canal: Panama'),True,'classic')
_t(is_palindrome('race a car'),False,'not palindrome')
_t(is_palindrome(' '),True,'empty after strip')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function isPalindrome(s) {
  s = s.toLowerCase().replace(/[^a-z0-9]/g,'');
  let l=0,r=s.length-1;
  while(l<r){if(s[l]!==s[r])return false;l++;r--;}
  return true;
}
${JS_HARNESS}
_t(isPalindrome('A man, a plan, a canal: Panama'),true,'classic');
_t(isPalindrome('race a car'),false,'not palindrome');
_t(isPalindrome(' '),true,'empty after strip');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'three-sum', num:9, title:'Three Sum', difficulty:'Intermediate', category:'Two Pointers',
    description:'Find all unique triplets in the array that sum to zero. The solution set must not contain duplicate triplets.',
    examples:[{input:'nums=[-1,0,1,2,-1,-4]',output:'[[-1,-1,2],[-1,0,1]]'},{input:'nums=[0,0,0]',output:'[[0,0,0]]'}],
    constraints:['3 ≤ nums.length ≤ 3000','-10⁵ ≤ nums[i] ≤ 10⁵'],
    hints:['Sort the array first','For each element fix it and use two pointers on the rest','Skip duplicate elements to avoid duplicate triplets'],
    tags:['array','two-pointers','sorting'], timeComplexity:'O(n²)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def three_sum(nums):
    nums.sort(); res = []
    for i in range(len(nums)-2):
        if i > 0 and nums[i] == nums[i-1]: continue
        l, r = i+1, len(nums)-1
        while l < r:
            s = nums[i]+nums[l]+nums[r]
            if s == 0:
                res.append([nums[i],nums[l],nums[r]])
                while l < r and nums[l] == nums[l+1]: l += 1
                while l < r and nums[r] == nums[r-1]: r -= 1
                l += 1; r -= 1
            elif s < 0: l += 1
            else: r -= 1
    return res
${PY_HARNESS}
_t(three_sum([-1,0,1,2,-1,-4]),[[-1,-1,2],[-1,0,1]],'classic')
_t(three_sum([0,1,1]),[],  'no triplet')
_t(three_sum([0,0,0]),[[0,0,0]],'all zeros')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function threeSum(nums) {
  nums.sort((a,b)=>a-b); const res=[];
  for(let i=0;i<nums.length-2;i++){
    if(i>0&&nums[i]===nums[i-1])continue;
    let l=i+1,r=nums.length-1;
    while(l<r){
      const s=nums[i]+nums[l]+nums[r];
      if(s===0){res.push([nums[i],nums[l],nums[r]]);while(l<r&&nums[l]===nums[l+1])l++;while(l<r&&nums[r]===nums[r-1])r--;l++;r--;}
      else if(s<0)l++;else r--;
    }
  }
  return res;
}
${JS_HARNESS}
_t(threeSum([-1,0,1,2,-1,-4]),[[-1,-1,2],[-1,0,1]],'classic');
_t(threeSum([0,1,1]),[],'no triplet');
_t(threeSum([0,0,0]),[[0,0,0]],'all zeros');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'container-with-most-water', num:10, title:'Container With Most Water', difficulty:'Intermediate', category:'Two Pointers',
    description:'Given n vertical lines at positions 0..n-1 with heights height[i], find two lines that together with the x-axis form a container holding the most water.',
    examples:[{input:'height=[1,8,6,2,5,4,8,3,7]',output:'49'},{input:'height=[1,1]',output:'1'}],
    constraints:['2 ≤ height.length ≤ 10⁵','0 ≤ height[i] ≤ 10⁴'],
    hints:['Start with widest container (l=0, r=n-1)','Move the pointer with the shorter height inward'],
    tags:['array','two-pointers','greedy'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def max_area(height):
    l, r = 0, len(height)-1; best = 0
    while l < r:
        best = max(best, min(height[l],height[r])*(r-l))
        if height[l] < height[r]: l += 1
        else: r -= 1
    return best
${PY_HARNESS}
_t(max_area([1,8,6,2,5,4,8,3,7]),49,'classic')
_t(max_area([1,1]),1,'two lines')
_t(max_area([4,3,2,1,4]),16,'equal ends')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function maxArea(height) {
  let l=0,r=height.length-1,best=0;
  while(l<r){best=Math.max(best,Math.min(height[l],height[r])*(r-l));if(height[l]<height[r])l++;else r--;}
  return best;
}
${JS_HARNESS}
_t(maxArea([1,8,6,2,5,4,8,3,7]),49,'classic');
_t(maxArea([1,1]),1,'two lines');
_t(maxArea([4,3,2,1,4]),16,'equal ends');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'trapping-rain-water', num:11, title:'Trapping Rain Water', difficulty:'Advanced', category:'Two Pointers',
    description:'Given an elevation map, compute how much water it can trap after raining.',
    examples:[{input:'height=[0,1,0,2,1,0,1,3,2,1,2,1]',output:'6'},{input:'height=[4,2,0,3,2,5]',output:'9'}],
    constraints:['1 ≤ height.length ≤ 2×10⁴','0 ≤ height[i] ≤ 10⁵'],
    hints:['Water at position i = min(maxLeft, maxRight) - height[i]','Two-pointer approach: maintain running max from each side'],
    tags:['array','two-pointers','stack'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def trap(height):
    l, r = 0, len(height)-1
    lm = rm = res = 0
    while l < r:
        if height[l] <= height[r]:
            if height[l] >= lm: lm = height[l]
            else: res += lm - height[l]
            l += 1
        else:
            if height[r] >= rm: rm = height[r]
            else: res += rm - height[r]
            r -= 1
    return res
${PY_HARNESS}
_t(trap([0,1,0,2,1,0,1,3,2,1,2,1]),6,'classic')
_t(trap([4,2,0,3,2,5]),9,'second case')
_t(trap([1,0,1]),1,'simple valley')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function trap(height) {
  let l=0,r=height.length-1,lm=0,rm=0,res=0;
  while(l<r){if(height[l]<=height[r]){if(height[l]>=lm)lm=height[l];else res+=lm-height[l];l++;}else{if(height[r]>=rm)rm=height[r];else res+=rm-height[r];r--;}}
  return res;
}
${JS_HARNESS}
_t(trap([0,1,0,2,1,0,1,3,2,1,2,1]),6,'classic');
_t(trap([4,2,0,3,2,5]),9,'second case');
_t(trap([1,0,1]),1,'simple valley');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'move-zeroes', num:12, title:'Move Zeroes', difficulty:'Beginner', category:'Two Pointers',
    description:'Move all zeros to the end of the array while maintaining the relative order of non-zero elements. Do it in-place.',
    examples:[{input:'nums=[0,1,0,3,12]',output:'[1,3,12,0,0]'},{input:'nums=[0]',output:'[0]'}],
    constraints:['1 ≤ nums.length ≤ 10⁴'],
    hints:['Use a write pointer that only advances for non-zero elements','Fill remaining positions with zeros'],
    tags:['array','two-pointers'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def move_zeroes(nums):
    pos = 0
    for n in nums:
        if n != 0: nums[pos] = n; pos += 1
    for i in range(pos, len(nums)): nums[i] = 0
    return nums
${PY_HARNESS}
_t(move_zeroes([0,1,0,3,12]),[1,3,12,0,0],'classic')
_t(move_zeroes([0]),[0],'single zero')
_t(move_zeroes([1,0,1]),[1,1,0],'middle zero')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function moveZeroes(nums) {
  let pos=0;
  for(const n of nums){if(n!==0)nums[pos++]=n;}
  while(pos<nums.length)nums[pos++]=0;
  return nums;
}
${JS_HARNESS}
_t(moveZeroes([0,1,0,3,12]),[1,3,12,0,0],'classic');
_t(moveZeroes([0]),[0],'single zero');
_t(moveZeroes([1,0,1]),[1,1,0],'middle zero');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'max-sum-subarray-k', num:13, title:'Max Sum Subarray of Size K', difficulty:'Beginner', category:'Sliding Window',
    description:'Given an array and integer k, find the maximum sum of any contiguous subarray of size k.',
    examples:[{input:'nums=[2,1,5,1,3,2], k=3',output:'9',explanation:'[5,1,3]'},{input:'nums=[2,3,4,1,5], k=2',output:'7',explanation:'[3,4]'}],
    constraints:['1 ≤ k ≤ nums.length ≤ 10⁵'],
    hints:['Compute sum of first window','Slide: add next element, remove first element'],
    tags:['array','sliding-window'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def max_sum_k(nums, k):
    s = sum(nums[:k]); best = s
    for i in range(k, len(nums)):
        s += nums[i] - nums[i-k]
        best = max(best, s)
    return best
${PY_HARNESS}
_t(max_sum_k([2,1,5,1,3,2],3),9,'classic')
_t(max_sum_k([2,3,4,1,5],2),7,'k=2')
_t(max_sum_k([1],1),1,'single element')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function maxSumK(nums, k) {
  let s=nums.slice(0,k).reduce((a,b)=>a+b,0),best=s;
  for(let i=k;i<nums.length;i++){s+=nums[i]-nums[i-k];best=Math.max(best,s);}
  return best;
}
${JS_HARNESS}
_t(maxSumK([2,1,5,1,3,2],3),9,'classic');
_t(maxSumK([2,3,4,1,5],2),7,'k=2');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'longest-substring-no-repeat', num:14, title:'Longest Substring Without Repeating Characters', difficulty:'Intermediate', category:'Sliding Window',
    description:'Find the length of the longest substring without repeating characters.',
    examples:[{input:'s="abcabcbb"',output:'3',explanation:'"abc"'},{input:'s="bbbbb"',output:'1'},{input:'s="pwwkew"',output:'3',explanation:'"wke"'}],
    constraints:['0 ≤ s.length ≤ 5×10⁴'],
    hints:['Use a hash map to track each character\'s last seen index','Move left pointer past the last occurrence when a duplicate is found'],
    tags:['string','sliding-window','hash-map'], timeComplexity:'O(n)', spaceComplexity:'O(min(m,n))',
    starterCode:{
      python:`def length_of_longest_substring(s):
    seen = {}; l = best = 0
    for r, c in enumerate(s):
        if c in seen and seen[c] >= l: l = seen[c] + 1
        seen[c] = r
        best = max(best, r - l + 1)
    return best
${PY_HARNESS}
_t(length_of_longest_substring('abcabcbb'),3,'classic')
_t(length_of_longest_substring('bbbbb'),1,'all same')
_t(length_of_longest_substring('pwwkew'),3,'wke')
_t(length_of_longest_substring(''),0,'empty')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function lengthOfLongestSubstring(s) {
  const seen=new Map();let l=0,best=0;
  for(let r=0;r<s.length;r++){if(seen.has(s[r])&&seen.get(s[r])>=l)l=seen.get(s[r])+1;seen.set(s[r],r);best=Math.max(best,r-l+1);}
  return best;
}
${JS_HARNESS}
_t(lengthOfLongestSubstring('abcabcbb'),3,'classic');
_t(lengthOfLongestSubstring('bbbbb'),1,'all same');
_t(lengthOfLongestSubstring(''),0,'empty');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'minimum-window-substring', num:15, title:'Minimum Window Substring', difficulty:'Advanced', category:'Sliding Window',
    description:'Given strings s and t, find the minimum window in s which contains all characters of t.',
    examples:[{input:'s="ADOBECODEBANC", t="ABC"',output:'"BANC"'},{input:'s="a", t="a"',output:'"a"'},{input:'s="a", t="b"',output:'""'}],
    constraints:['1 ≤ s.length, t.length ≤ 10⁵'],
    hints:['Expand right until window contains all of t','Contract left to minimize while still valid'],
    tags:['string','sliding-window','hash-map'], timeComplexity:'O(s+t)', spaceComplexity:'O(t)',
    starterCode:{
      python:`from collections import Counter
def min_window(s, t):
    need = Counter(t); missing = len(t); l = 0; best = ''
    for r, c in enumerate(s):
        if need[c] > 0: missing -= 1
        need[c] -= 1
        while missing == 0:
            window = s[l:r+1]
            if not best or len(window) < len(best): best = window
            need[s[l]] += 1
            if need[s[l]] > 0: missing += 1
            l += 1
    return best
${PY_HARNESS}
_t(min_window('ADOBECODEBANC','ABC'),'BANC','classic')
_t(min_window('a','a'),'a','exact match')
_t(min_window('a','b'),'','no match')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function minWindow(s, t) {
  const need={};for(const c of t)need[c]=(need[c]||0)+1;
  let missing=t.length,l=0,best='';
  for(let r=0;r<s.length;r++){
    if(need[s[r]]>0)missing--;
    need[s[r]]=(need[s[r]]||0)-1;
    while(missing===0){
      const w=s.slice(l,r+1);if(!best||w.length<best.length)best=w;
      need[s[l]]++;if(need[s[l]]>0)missing++;l++;
    }
  }
  return best;
}
${JS_HARNESS}
_t(minWindow('ADOBECODEBANC','ABC'),'BANC','classic');
_t(minWindow('a','a'),'a','exact match');
_t(minWindow('a','b'),'','no match');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'group-anagrams', num:16, title:'Group Anagrams', difficulty:'Intermediate', category:'Hash Tables',
    description:'Given an array of strings, group the anagrams together. You can return the answer in any order.',
    examples:[{input:'strs=["eat","tea","tan","ate","nat","bat"]',output:'[["bat"],["nat","tan"],["ate","eat","tea"]]'}],
    constraints:['1 ≤ strs.length ≤ 10⁴','0 ≤ strs[i].length ≤ 100'],
    hints:['Sorted string is a canonical key for anagram groups','Use a dictionary mapping sorted string → list'],
    tags:['string','hash-map','sorting'], timeComplexity:'O(n·k·log k)', spaceComplexity:'O(n·k)',
    starterCode:{
      python:`from collections import defaultdict
def group_anagrams(strs):
    d = defaultdict(list)
    for s in strs: d[tuple(sorted(s))].append(s)
    return sorted([sorted(v) for v in d.values()])
${PY_HARNESS}
_t(group_anagrams(['eat','tea','tan','ate','nat','bat']),[['ate','eat','tea'],['bat'],['nat','tan']],'classic')
_t(group_anagrams(['']),[['']],'empty string')
_t(group_anagrams(['a']),[['a']],'single')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function groupAnagrams(strs) {
  const d=new Map();
  for(const s of strs){const k=[...s].sort().join('');if(!d.has(k))d.set(k,[]);d.get(k).push(s);}
  return [...d.values()].map(g=>g.sort()).sort((a,b)=>a[0].localeCompare(b[0]));
}
${JS_HARNESS}
_t(groupAnagrams(['eat','tea','tan','ate','nat','bat']),[['ate','eat','tea'],['bat'],['nat','tan']],'classic');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'top-k-frequent', num:17, title:'Top K Frequent Elements', difficulty:'Intermediate', category:'Hash Tables',
    description:'Given an integer array and k, return the k most frequent elements. Answer may be in any order.',
    examples:[{input:'nums=[1,1,1,2,2,3], k=2',output:'[1,2]'},{input:'nums=[1], k=1',output:'[1]'}],
    constraints:['1 ≤ nums.length ≤ 10⁵','Answer is unique'],
    hints:['Count frequencies with a hash map','Use a heap or bucket sort to find top k'],
    tags:['array','hash-map','heap'], timeComplexity:'O(n log k)', spaceComplexity:'O(n)',
    starterCode:{
      python:`from collections import Counter
def top_k_frequent(nums, k):
    return [x for x, _ in Counter(nums).most_common(k)]
${PY_HARNESS}
_t(sorted(top_k_frequent([1,1,1,2,2,3],2)),[1,2],'classic')
_t(top_k_frequent([1],1),[1],'single element')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function topKFrequent(nums, k) {
  const cnt=new Map();for(const n of nums)cnt.set(n,(cnt.get(n)||0)+1);
  return [...cnt.entries()].sort((a,b)=>b[1]-a[1]).slice(0,k).map(e=>e[0]);
}
${JS_HARNESS}
_t(topKFrequent([1,1,1,2,2,3],2).sort((a,b)=>a-b),[1,2],'classic');
_t(topKFrequent([1],1),[1],'single');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'longest-consecutive', num:18, title:'Longest Consecutive Sequence', difficulty:'Intermediate', category:'Hash Tables',
    description:'Find the length of the longest consecutive elements sequence in O(n) time.',
    examples:[{input:'nums=[100,4,200,1,3,2]',output:'4',explanation:'[1,2,3,4]'},{input:'nums=[0,3,7,2,5,8,4,6,0,1]',output:'9'}],
    constraints:['0 ≤ nums.length ≤ 10⁵','-10⁹ ≤ nums[i] ≤ 10⁹'],
    hints:['Put all numbers in a set','A number starts a sequence only if num-1 is not in the set'],
    tags:['array','hash-set'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def longest_consecutive(nums):
    s = set(nums); best = 0
    for n in s:
        if n-1 not in s:
            cur = n; length = 1
            while cur+1 in s: cur += 1; length += 1
            best = max(best, length)
    return best
${PY_HARNESS}
_t(longest_consecutive([100,4,200,1,3,2]),4,'classic')
_t(longest_consecutive([0,3,7,2,5,8,4,6,0,1]),9,'long sequence')
_t(longest_consecutive([]),0,'empty')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function longestConsecutive(nums) {
  const s=new Set(nums);let best=0;
  for(const n of s){if(!s.has(n-1)){let cur=n,len=1;while(s.has(cur+1)){cur++;len++;}best=Math.max(best,len);}}
  return best;
}
${JS_HARNESS}
_t(longestConsecutive([100,4,200,1,3,2]),4,'classic');
_t(longestConsecutive([0,3,7,2,5,8,4,6,0,1]),9,'long');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'valid-parentheses', num:19, title:'Valid Parentheses', difficulty:'Beginner', category:'Stacks & Queues',
    description:'Given a string containing just \'(\', \')\', \'{\', \'}\', \'[\', \']\', determine if the input string is valid. Brackets must close in the correct order.',
    examples:[{input:'s="()[]{}"',output:'true'},{input:'s="(]"',output:'false'},{input:'s="{[]}"',output:'true'}],
    constraints:['1 ≤ s.length ≤ 10⁴'],
    hints:['Push open brackets onto a stack','When you see a close bracket, pop and check it matches'],
    tags:['string','stack'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def is_valid(s):
    stack = []; pairs = {')':'(',']':'[','}':'{'}
    for c in s:
        if c in '([{': stack.append(c)
        elif not stack or stack[-1] != pairs[c]: return False
        else: stack.pop()
    return len(stack) == 0
${PY_HARNESS}
_t(is_valid('()'),True,'simple pair')
_t(is_valid('()[]{}'  ),True,'all types')
_t(is_valid('(]'),False,'mismatch')
_t(is_valid('{[]}'),True,'nested')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function isValid(s) {
  const stack=[],pairs={')':'(',']':'[','}':'{'};
  for(const c of s){if('([{'.includes(c))stack.push(c);else if(!stack.length||stack[stack.length-1]!==pairs[c])return false;else stack.pop();}
  return stack.length===0;
}
${JS_HARNESS}
_t(isValid('()'),true,'simple pair');
_t(isValid('()[]{}'),true,'all types');
_t(isValid('(]'),false,'mismatch');
_t(isValid('{[]}'),true,'nested');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'daily-temperatures', num:20, title:'Daily Temperatures', difficulty:'Intermediate', category:'Stacks & Queues',
    description:'Given an array of daily temperatures, return an array answer where answer[i] is the number of days until a warmer temperature. If no future warmer day exists, answer[i] = 0.',
    examples:[{input:'temps=[73,74,75,71,69,72,76,73]',output:'[1,1,4,2,1,1,0,0]'},{input:'temps=[30,40,50,60]',output:'[1,1,1,0]'}],
    constraints:['1 ≤ temps.length ≤ 10⁵','30 ≤ temps[i] ≤ 100'],
    hints:['Use a monotonic decreasing stack of indices','When current temp exceeds stack top, pop and record the difference'],
    tags:['array','stack','monotonic-stack'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def daily_temperatures(temps):
    n = len(temps); res = [0]*n; stack = []
    for i, t in enumerate(temps):
        while stack and temps[stack[-1]] < t:
            j = stack.pop(); res[j] = i - j
        stack.append(i)
    return res
${PY_HARNESS}
_t(daily_temperatures([73,74,75,71,69,72,76,73]),[1,1,4,2,1,1,0,0],'classic')
_t(daily_temperatures([30,40,50,60]),[1,1,1,0],'ascending')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function dailyTemperatures(temps) {
  const n=temps.length,res=Array(n).fill(0),stack=[];
  for(let i=0;i<n;i++){while(stack.length&&temps[stack[stack.length-1]]<temps[i]){const j=stack.pop();res[j]=i-j;}stack.push(i);}
  return res;
}
${JS_HARNESS}
_t(dailyTemperatures([73,74,75,71,69,72,76,73]),[1,1,4,2,1,1,0,0],'classic');
_t(dailyTemperatures([30,40,50,60]),[1,1,1,0],'ascending');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'evaluate-rpn', num:21, title:'Evaluate Reverse Polish Notation', difficulty:'Intermediate', category:'Stacks & Queues',
    description:'Evaluate the value of an arithmetic expression in Reverse Polish Notation. Valid operators are +, -, *, /. Integer division truncates toward zero.',
    examples:[{input:'["2","1","+","3","*"]',output:'9'},{input:'["4","13","5","/","+"]',output:'6'}],
    constraints:['1 ≤ tokens.length ≤ 10⁴','Operands fit in 32-bit integer'],
    hints:['Push operands onto a stack','On operator, pop two operands, compute, push result'],
    tags:['array','stack','math'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def eval_rpn(tokens):
    stack = []
    for t in tokens:
        if t in '+-*/':
            b, a = stack.pop(), stack.pop()
            if t=='+': stack.append(a+b)
            elif t=='-': stack.append(a-b)
            elif t=='*': stack.append(a*b)
            else: stack.append(int(a/b))
        else: stack.append(int(t))
    return stack[0]
${PY_HARNESS}
_t(eval_rpn(['2','1','+','3','*']),9,'basic')
_t(eval_rpn(['4','13','5','/','+']),6,'division')
_t(eval_rpn(['10','6','9','3','+','-11','*','/','+','17','+','5','+']),22,'complex')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function evalRPN(tokens) {
  const stack=[];
  for(const t of tokens){
    if('+-*/'.includes(t)){const b=stack.pop(),a=stack.pop();if(t==='+')stack.push(a+b);else if(t==='-')stack.push(a-b);else if(t==='*')stack.push(a*b);else stack.push(Math.trunc(a/b));}
    else stack.push(Number(t));
  }
  return stack[0];
}
${JS_HARNESS}
_t(evalRPN(['2','1','+','3','*']),9,'basic');
_t(evalRPN(['4','13','5','/','+' ]),6,'division');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'reverse-linked-list', num:22, title:'Reverse Linked List', difficulty:'Beginner', category:'Linked Lists',
    description:'Reverse a singly linked list. In this challenge, represent the list as an array and return the reversed array.',
    examples:[{input:'head=[1,2,3,4,5]',output:'[5,4,3,2,1]'},{input:'head=[1,2]',output:'[2,1]'}],
    constraints:['0 ≤ list length ≤ 5000','-5000 ≤ Node.val ≤ 5000'],
    hints:['Iterative: keep track of prev, curr, next','Recursive: reverse(head.next) and make head.next.next = head'],
    tags:['linked-list','recursion'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def reverse_list(lst):
    prev = None
    # Simulate with list (acts as array of values)
    for val in lst:
        prev = [val] + (prev or [])
    return prev or []
${PY_HARNESS}
_t(reverse_list([1,2,3,4,5]),[5,4,3,2,1],'classic')
_t(reverse_list([1,2]),[2,1],'two nodes')
_t(reverse_list([])  ,[]  ,'empty')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function reverseList(lst) {
  return [...lst].reverse();
}
${JS_HARNESS}
_t(reverseList([1,2,3,4,5]),[5,4,3,2,1],'classic');
_t(reverseList([1,2]),[2,1],'two nodes');
_t(reverseList([])  ,[]  ,'empty');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'merge-sorted-lists', num:23, title:'Merge Two Sorted Lists', difficulty:'Beginner', category:'Linked Lists',
    description:'Merge two sorted linked lists and return the merged list (sorted). Represented here as sorted arrays.',
    examples:[{input:'l1=[1,2,4], l2=[1,3,4]',output:'[1,1,2,3,4,4]'},{input:'l1=[], l2=[0]',output:'[0]'}],
    constraints:['0 ≤ list length ≤ 50','-100 ≤ Node.val ≤ 100'],
    hints:['Compare heads, pick smaller, recurse or iterate','Use a dummy head to simplify edge cases'],
    tags:['linked-list','recursion'], timeComplexity:'O(m+n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def merge_two_lists(l1, l2):
    res = []; i = j = 0
    while i < len(l1) and j < len(l2):
        if l1[i] <= l2[j]: res.append(l1[i]); i += 1
        else: res.append(l2[j]); j += 1
    return res + l1[i:] + l2[j:]
${PY_HARNESS}
_t(merge_two_lists([1,2,4],[1,3,4]),[1,1,2,3,4,4],'classic')
_t(merge_two_lists([],[0]),[0],'one empty')
_t(merge_two_lists([],[])  ,[]  ,'both empty')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function mergeTwoLists(l1, l2) {
  const res=[];let i=0,j=0;
  while(i<l1.length&&j<l2.length){if(l1[i]<=l2[j])res.push(l1[i++]);else res.push(l2[j++]);}
  return res.concat(l1.slice(i)).concat(l2.slice(j));
}
${JS_HARNESS}
_t(mergeTwoLists([1,2,4],[1,3,4]),[1,1,2,3,4,4],'classic');
_t(mergeTwoLists([],[0]),[0],'one empty');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'max-depth-tree', num:24, title:'Maximum Depth of Binary Tree', difficulty:'Beginner', category:'Trees',
    description:'Given the root of a binary tree, return its maximum depth (number of nodes along the longest path from root to leaf).',
    examples:[{input:'root=[3,9,20,null,null,15,7]',output:'3'},{input:'root=[1,null,2]',output:'2'}],
    constraints:['0 ≤ nodes ≤ 10⁴','-100 ≤ Node.val ≤ 100'],
    hints:['Recursive: depth = 1 + max(left depth, right depth)','Base case: None returns 0'],
    tags:['tree','dfs','recursion'], timeComplexity:'O(n)', spaceComplexity:'O(h)',
    starterCode:{
      python:`def max_depth(tree):
    # tree is a dict: {'val':v,'left':...,'right':...} or None
    if tree is None: return 0
    return 1 + max(max_depth(tree.get('left')), max_depth(tree.get('right')))

def n(v, l=None, r=None): return {'val':v,'left':l,'right':r}
${PY_HARNESS}
_t(max_depth(n(3,n(9),n(20,n(15),n(7)))),3,'classic')
_t(max_depth(n(1,None,n(2))),2,'right skew')
_t(max_depth(None),0,'empty tree')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function maxDepth(tree) {
  if(!tree)return 0;
  return 1+Math.max(maxDepth(tree.left),maxDepth(tree.right));
}
const n=(v,l=null,r=null)=>({val:v,left:l,right:r});
${JS_HARNESS}
_t(maxDepth(n(3,n(9),n(20,n(15),n(7)))),3,'classic');
_t(maxDepth(n(1,null,n(2))),2,'right skew');
_t(maxDepth(null),0,'empty');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'validate-bst', num:25, title:'Validate Binary Search Tree', difficulty:'Intermediate', category:'Trees',
    description:'Determine if a binary tree is a valid BST. Each node\'s left subtree contains only values less than the node, and right subtree only greater values.',
    examples:[{input:'root=[2,1,3]',output:'true'},{input:'root=[5,1,4,null,null,3,6]',output:'false',explanation:'4 is in right but 4 < 5'}],
    constraints:['1 ≤ nodes ≤ 10⁴','-2³¹ ≤ Node.val ≤ 2³¹-1'],
    hints:['Pass min/max bounds through recursion','Left child must be < current, right child must be > current'],
    tags:['tree','dfs','bst'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def is_valid_bst(tree, lo=float('-inf'), hi=float('inf')):
    if tree is None: return True
    if tree['val'] <= lo or tree['val'] >= hi: return False
    return (is_valid_bst(tree.get('left'), lo, tree['val']) and
            is_valid_bst(tree.get('right'), tree['val'], hi))

def n(v, l=None, r=None): return {'val':v,'left':l,'right':r}
${PY_HARNESS}
_t(is_valid_bst(n(2,n(1),n(3))),True,'valid BST')
_t(is_valid_bst(n(5,n(1),n(4,n(3),n(6)))),False,'invalid BST')
_t(is_valid_bst(None),True,'empty')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function isValidBST(tree,lo=-Infinity,hi=Infinity){if(!tree)return true;if(tree.val<=lo||tree.val>=hi)return false;return isValidBST(tree.left,lo,tree.val)&&isValidBST(tree.right,tree.val,hi);}
const n=(v,l=null,r=null)=>({val:v,left:l,right:r});
${JS_HARNESS}
_t(isValidBST(n(2,n(1),n(3))),true,'valid BST');
_t(isValidBST(n(5,n(1),n(4,n(3),n(6)))),false,'invalid BST');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'level-order-traversal', num:26, title:'Binary Tree Level Order Traversal', difficulty:'Intermediate', category:'Trees',
    description:'Return the level-order traversal of a binary tree\'s values as a list of lists.',
    examples:[{input:'root=[3,9,20,null,null,15,7]',output:'[[3],[9,20],[15,7]]'},{input:'root=[1]',output:'[[1]]'}],
    constraints:['0 ≤ nodes ≤ 2000','-1000 ≤ Node.val ≤ 1000'],
    hints:['Use a queue (BFS)','Process all nodes at current level before moving to next'],
    tags:['tree','bfs','queue'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`from collections import deque
def level_order(tree):
    if not tree: return []
    q = deque([tree]); res = []
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft(); level.append(node['val'])
            if node.get('left'):  q.append(node['left'])
            if node.get('right'): q.append(node['right'])
        res.append(level)
    return res

def n(v, l=None, r=None): return {'val':v,'left':l,'right':r}
${PY_HARNESS}
_t(level_order(n(3,n(9),n(20,n(15),n(7)))),[[3],[9,20],[15,7]],'classic')
_t(level_order(n(1)),[[1]],'single node')
_t(level_order(None),[],'empty')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function levelOrder(tree){
  if(!tree)return[];const q=[tree],res=[];
  while(q.length){const level=[],len=q.length;for(let i=0;i<len;i++){const node=q.shift();level.push(node.val);if(node.left)q.push(node.left);if(node.right)q.push(node.right);}res.push(level);}
  return res;
}
const n=(v,l=null,r=null)=>({val:v,left:l,right:r});
${JS_HARNESS}
_t(levelOrder(n(3,n(9),n(20,n(15),n(7)))),[[3],[9,20],[15,7]],'classic');
_t(levelOrder(null),[],'empty');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'number-of-islands', num:27, title:'Number of Islands', difficulty:'Intermediate', category:'Graphs',
    description:'Given a 2D grid of \'1\'s (land) and \'0\'s (water), count the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally/vertically.',
    examples:[{input:'grid=[["1","1","0"],["0","1","0"],["0","0","1"]]',output:'2'},{input:'grid=[["1","1","1"],["0","1","0"],["1","1","1"]]',output:'1'}],
    constraints:['1 ≤ rows, cols ≤ 300','grid[i][j] is \'0\' or \'1\''],
    hints:['DFS from each unvisited land cell','Mark visited cells as \'0\' to avoid revisiting'],
    tags:['grid','dfs','bfs','union-find'], timeComplexity:'O(m·n)', spaceComplexity:'O(m·n)',
    starterCode:{
      python:`def num_islands(grid):
    if not grid: return 0
    rows, cols = len(grid), len(grid[0]); count = 0
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0': return
        grid[r][c] = '0'
        dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1)
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1': count += 1; dfs(r, c)
    return count
${PY_HARNESS}
_t(num_islands([['1','1','0'],['0','1','0'],['0','0','1']]),2,'two islands')
_t(num_islands([['1','1','1'],['0','1','0'],['1','1','1']]),1,'one island')
_t(num_islands([['0']]),0,'all water')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function numIslands(grid) {
  if(!grid.length)return 0;
  const rows=grid.length,cols=grid[0].length;let count=0;
  function dfs(r,c){if(r<0||r>=rows||c<0||c>=cols||grid[r][c]==='0')return;grid[r][c]='0';dfs(r+1,c);dfs(r-1,c);dfs(r,c+1);dfs(r,c-1);}
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)if(grid[r][c]==='1'){count++;dfs(r,c);}
  return count;
}
${JS_HARNESS}
_t(numIslands([['1','1','0'],['0','1','0'],['0','0','1']]),2,'two islands');
_t(numIslands([['0']]),0,'all water');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'course-schedule', num:28, title:'Course Schedule', difficulty:'Intermediate', category:'Graphs',
    description:'There are numCourses courses. Given prerequisites[i]=[a,b] meaning you must take b before a, determine if it\'s possible to finish all courses.',
    examples:[{input:'numCourses=2, prerequisites=[[1,0]]',output:'true'},{input:'numCourses=2, prerequisites=[[1,0],[0,1]]',output:'false',explanation:'Cycle exists'}],
    constraints:['1 ≤ numCourses ≤ 2000','0 ≤ prerequisites.length ≤ 5000'],
    hints:['Build adjacency list','Detect cycle using DFS with 3-color marking (0=unvisited, 1=visiting, 2=done)'],
    tags:['graph','dfs','topological-sort'], timeComplexity:'O(V+E)', spaceComplexity:'O(V+E)',
    starterCode:{
      python:`def can_finish(num_courses, prerequisites):
    graph = [[] for _ in range(num_courses)]
    for a, b in prerequisites: graph[b].append(a)
    visited = [0] * num_courses
    def dfs(node):
        if visited[node] == 1: return False
        if visited[node] == 2: return True
        visited[node] = 1
        for nb in graph[node]:
            if not dfs(nb): return False
        visited[node] = 2; return True
    return all(dfs(i) for i in range(num_courses))
${PY_HARNESS}
_t(can_finish(2,[[1,0]]),True,'no cycle')
_t(can_finish(2,[[1,0],[0,1]]),False,'cycle')
_t(can_finish(1,[]),True,'no prerequisites')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function canFinish(numCourses, prerequisites) {
  const graph=Array.from({length:numCourses},()=>[]);
  for(const[a,b]of prerequisites)graph[b].push(a);
  const vis=Array(numCourses).fill(0);
  function dfs(n){if(vis[n]===1)return false;if(vis[n]===2)return true;vis[n]=1;for(const nb of graph[n])if(!dfs(nb))return false;vis[n]=2;return true;}
  return Array.from({length:numCourses},(_,i)=>i).every(dfs);
}
${JS_HARNESS}
_t(canFinish(2,[[1,0]]),true,'no cycle');
_t(canFinish(2,[[1,0],[0,1]]),false,'cycle');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'fibonacci', num:29, title:'Fibonacci Number', difficulty:'Beginner', category:'Dynamic Programming',
    description:'Compute F(n) where F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2). Use iterative DP for O(n) time.',
    examples:[{input:'n=4',output:'3'},{input:'n=10',output:'55'}],
    constraints:['0 ≤ n ≤ 30'],
    hints:['Keep only last two values instead of full array','This is the base of all DP thinking: break into subproblems'],
    tags:['dp','math','recursion'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def fib(n):
    if n <= 1: return n
    a, b = 0, 1
    for _ in range(2, n+1): a, b = b, a+b
    return b
${PY_HARNESS}
_t(fib(0),0,'base 0')
_t(fib(1),1,'base 1')
_t(fib(4),3,'n=4')
_t(fib(10),55,'n=10')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function fib(n){if(n<=1)return n;let a=0,b=1;for(let i=2;i<=n;i++){[a,b]=[b,a+b];}return b;}
${JS_HARNESS}
_t(fib(0),0,'base 0');
_t(fib(4),3,'n=4');
_t(fib(10),55,'n=10');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'climbing-stairs', num:30, title:'Climbing Stairs', difficulty:'Beginner', category:'Dynamic Programming',
    description:'You are climbing a staircase of n steps. Each time you can climb 1 or 2 steps. How many distinct ways can you reach the top?',
    examples:[{input:'n=2',output:'2',explanation:'1+1 or 2'},{input:'n=3',output:'3',explanation:'1+1+1, 1+2, 2+1'}],
    constraints:['1 ≤ n ≤ 45'],
    hints:['ways(n) = ways(n-1) + ways(n-2) — same as Fibonacci!','Base cases: ways(1)=1, ways(2)=2'],
    tags:['dp','math'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def climb_stairs(n):
    a, b = 1, 1
    for _ in range(2, n+1): a, b = b, a+b
    return b
${PY_HARNESS}
_t(climb_stairs(1),1,'one step')
_t(climb_stairs(2),2,'two steps')
_t(climb_stairs(3),3,'three steps')
_t(climb_stairs(5),8,'five steps')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function climbStairs(n){let a=1,b=1;for(let i=2;i<=n;i++){[a,b]=[b,a+b];}return b;}
${JS_HARNESS}
_t(climbStairs(2),2,'two steps');
_t(climbStairs(3),3,'three steps');
_t(climbStairs(5),8,'five steps');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'house-robber', num:31, title:'House Robber', difficulty:'Beginner', category:'Dynamic Programming',
    description:'You are a robber planning to rob houses along a street. Adjacent houses have connected alarms. Given amounts in each house, find the maximum you can rob without alerting police.',
    examples:[{input:'nums=[1,2,3,1]',output:'4',explanation:'Rob house 1 (1) + house 3 (3)'},{input:'nums=[2,7,9,3,1]',output:'12'}],
    constraints:['1 ≤ nums.length ≤ 100','0 ≤ nums[i] ≤ 400'],
    hints:['At each house: either rob it + prev_prev, or skip it (prev)','dp[i] = max(dp[i-1], dp[i-2] + nums[i])'],
    tags:['dp','array'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def rob(nums):
    prev2 = prev = 0
    for n in nums: prev2, prev = prev, max(prev, prev2 + n)
    return prev
${PY_HARNESS}
_t(rob([1,2,3,1]),4,'classic')
_t(rob([2,7,9,3,1]),12,'second case')
_t(rob([1]),1,'single house')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function rob(nums){let p2=0,p=0;for(const n of nums){[p2,p]=[p,Math.max(p,p2+n)];}return p;}
${JS_HARNESS}
_t(rob([1,2,3,1]),4,'classic');
_t(rob([2,7,9,3,1]),12,'second case');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'coin-change', num:32, title:'Coin Change', difficulty:'Intermediate', category:'Dynamic Programming',
    description:'Given coin denominations and an amount, find the fewest number of coins that make up that amount. Return -1 if not possible.',
    examples:[{input:'coins=[1,5,11], amount=11',output:'1'},{input:'coins=[1,2,5], amount=11',output:'3',explanation:'5+5+1'},{input:'coins=[2], amount=3',output:'-1'}],
    constraints:['1 ≤ coins.length ≤ 12','0 ≤ amount ≤ 10⁴'],
    hints:['dp[a] = min coins to make amount a','For each coin, update dp[coin..amount]'],
    tags:['dp','bfs'], timeComplexity:'O(amount·coins)', spaceComplexity:'O(amount)',
    starterCode:{
      python:`def coin_change(coins, amount):
    dp = [float('inf')] * (amount+1); dp[0] = 0
    for coin in coins:
        for a in range(coin, amount+1): dp[a] = min(dp[a], dp[a-coin]+1)
    return dp[amount] if dp[amount] != float('inf') else -1
${PY_HARNESS}
_t(coin_change([1,5,11],11),1,'exact coin')
_t(coin_change([1,2,5],11),3,'three coins')
_t(coin_change([2],3),-1,'impossible')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function coinChange(coins,amount){const dp=Array(amount+1).fill(Infinity);dp[0]=0;for(const c of coins)for(let a=c;a<=amount;a++)dp[a]=Math.min(dp[a],dp[a-c]+1);return dp[amount]===Infinity?-1:dp[amount];}
${JS_HARNESS}
_t(coinChange([1,5,11],11),1,'exact coin');
_t(coinChange([1,2,5],11),3,'three coins');
_t(coinChange([2],3),-1,'impossible');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'longest-increasing-subsequence', num:33, title:'Longest Increasing Subsequence', difficulty:'Intermediate', category:'Dynamic Programming',
    description:'Return the length of the longest strictly increasing subsequence.',
    examples:[{input:'nums=[10,9,2,5,3,7,101,18]',output:'4',explanation:'[2,3,7,101]'},{input:'nums=[7,7,7,7,7]',output:'1'}],
    constraints:['1 ≤ nums.length ≤ 2500','-10⁴ ≤ nums[i] ≤ 10⁴'],
    hints:['dp[i] = longest subsequence ending at index i','Patience sorting (binary search) gives O(n log n)'],
    tags:['dp','binary-search'], timeComplexity:'O(n log n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`import bisect
def length_of_lis(nums):
    dp = []
    for n in nums:
        pos = bisect.bisect_left(dp, n)
        if pos == len(dp): dp.append(n)
        else: dp[pos] = n
    return len(dp)
${PY_HARNESS}
_t(length_of_lis([10,9,2,5,3,7,101,18]),4,'classic')
_t(length_of_lis([0,1,0,3,2,3]),4,'with repeats')
_t(length_of_lis([7,7,7]),1,'all same')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function lengthOfLIS(nums){const dp=[];for(const n of nums){let l=0,r=dp.length;while(l<r){const m=(l+r)>>1;if(dp[m]<n)l=m+1;else r=m;}dp[l]=n;}return dp.length;}
${JS_HARNESS}
_t(lengthOfLIS([10,9,2,5,3,7,101,18]),4,'classic');
_t(lengthOfLIS([7,7,7]),1,'all same');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'word-break', num:34, title:'Word Break', difficulty:'Intermediate', category:'Dynamic Programming',
    description:'Given a string s and a dictionary of strings, return true if s can be segmented into space-separated sequence of dictionary words.',
    examples:[{input:'s="leetcode", wordDict=["leet","code"]',output:'true'},{input:'s="catsandog", wordDict=["cats","dog","sand","and","cat"]',output:'false'}],
    constraints:['1 ≤ s.length ≤ 300','1 ≤ wordDict.length ≤ 1000'],
    hints:['dp[i] = can string s[0..i] be segmented','For each i, try all j<i where dp[j] is true and s[j:i] is in dict'],
    tags:['dp','hash-set','string'], timeComplexity:'O(n²)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def word_break(s, word_dict):
    words = set(word_dict); n = len(s)
    dp = [False] * (n+1); dp[0] = True
    for i in range(1, n+1):
        for j in range(i):
            if dp[j] and s[j:i] in words: dp[i] = True; break
    return dp[n]
${PY_HARNESS}
_t(word_break('leetcode',['leet','code']),True,'basic')
_t(word_break('applepenapple',['apple','pen']),True,'repeat word')
_t(word_break('catsandog',['cats','dog','sand','and','cat']),False,'no solution')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function wordBreak(s,wordDict){const words=new Set(wordDict),n=s.length,dp=Array(n+1).fill(false);dp[0]=true;for(let i=1;i<=n;i++)for(let j=0;j<i;j++)if(dp[j]&&words.has(s.slice(j,i))){dp[i]=true;break;}return dp[n];}
${JS_HARNESS}
_t(wordBreak('leetcode',['leet','code']),true,'basic');
_t(wordBreak('catsandog',['cats','dog','sand','and','cat']),false,'no solution');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'palindrome-number', num:35, title:'Palindrome Number', difficulty:'Beginner', category:'Math & Numbers',
    description:'Determine if an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward. Negative numbers are not palindromes.',
    examples:[{input:'x=121',output:'true'},{input:'x=-121',output:'false'},{input:'x=10',output:'false'}],
    constraints:['-2³¹ ≤ x ≤ 2³¹-1'],
    hints:['Negative numbers and multiples of 10 (except 0) are never palindromes','Compare string with its reverse, or reverse only half the digits'],
    tags:['math','string'], timeComplexity:'O(log n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def is_palindrome_num(x):
    if x < 0: return False
    s = str(x); return s == s[::-1]
${PY_HARNESS}
_t(is_palindrome_num(121),True,'palindrome')
_t(is_palindrome_num(-121),False,'negative')
_t(is_palindrome_num(10),False,'trailing zero')
_t(is_palindrome_num(0),True,'zero')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function isPalindromeNum(x){if(x<0)return false;const s=String(x);return s===s.split('').reverse().join('');}
${JS_HARNESS}
_t(isPalindromeNum(121),true,'palindrome');
_t(isPalindromeNum(-121),false,'negative');
_t(isPalindromeNum(10),false,'trailing zero');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'count-primes', num:36, title:'Count Primes', difficulty:'Intermediate', category:'Math & Numbers',
    description:'Count the number of prime numbers less than n using the Sieve of Eratosthenes.',
    examples:[{input:'n=10',output:'4',explanation:'2, 3, 5, 7'},{input:'n=0',output:'0'},{input:'n=1',output:'0'}],
    constraints:['0 ≤ n ≤ 5×10⁶'],
    hints:['Sieve: start with all True, mark multiples of each prime as False','Start marking from i*i (smaller multiples already handled)'],
    tags:['math','sieve'], timeComplexity:'O(n log log n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def count_primes(n):
    if n < 2: return 0
    sieve = [True] * n; sieve[0] = sieve[1] = False
    for i in range(2, int(n**0.5)+1):
        if sieve[i]:
            for j in range(i*i, n, i): sieve[j] = False
    return sum(sieve)
${PY_HARNESS}
_t(count_primes(10),4,'n=10')
_t(count_primes(0),0,'n=0')
_t(count_primes(20),8,'n=20')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function countPrimes(n){if(n<2)return 0;const s=Array(n).fill(true);s[0]=s[1]=false;for(let i=2;i*i<n;i++)if(s[i])for(let j=i*i;j<n;j+=i)s[j]=false;return s.filter(Boolean).length;}
${JS_HARNESS}
_t(countPrimes(10),4,'n=10');
_t(countPrimes(20),8,'n=20');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'single-number', num:37, title:'Single Number', difficulty:'Beginner', category:'Bit Manipulation',
    description:'Given a non-empty array where every element appears twice except for one, find that single element. O(n) time, O(1) space.',
    examples:[{input:'nums=[2,2,1]',output:'1'},{input:'nums=[4,1,2,1,2]',output:'4'}],
    constraints:['1 ≤ nums.length ≤ 3×10⁴'],
    hints:['XOR of a number with itself is 0','XOR all numbers — pairs cancel out, leaving the single element'],
    tags:['bit-manipulation','xor'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`from functools import reduce
from operator import xor
def single_number(nums):
    return reduce(xor, nums)
${PY_HARNESS}
_t(single_number([2,2,1]),1,'basic')
_t(single_number([4,1,2,1,2]),4,'longer')
_t(single_number([1]),1,'single element')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function singleNumber(nums){return nums.reduce((a,b)=>a^b,0);}
${JS_HARNESS}
_t(singleNumber([2,2,1]),1,'basic');
_t(singleNumber([4,1,2,1,2]),4,'longer');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'missing-number', num:38, title:'Missing Number', difficulty:'Beginner', category:'Bit Manipulation',
    description:'Given an array containing n distinct numbers in range [0,n], find the one missing number.',
    examples:[{input:'nums=[3,0,1]',output:'2'},{input:'nums=[0,1]',output:'2'},{input:'nums=[9,6,4,2,3,5,7,0,1]',output:'8'}],
    constraints:['1 ≤ nums.length ≤ 10⁴','All values distinct'],
    hints:['Expected sum of 0..n is n*(n+1)/2','Subtract actual sum to find missing number'],
    tags:['bit-manipulation','math','array'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def missing_number(nums):
    n = len(nums)
    return n*(n+1)//2 - sum(nums)
${PY_HARNESS}
_t(missing_number([3,0,1]),2,'basic')
_t(missing_number([0,1]),2,'at end')
_t(missing_number([9,6,4,2,3,5,7,0,1]),8,'longer')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function missingNumber(nums){const n=nums.length;return n*(n+1)/2-nums.reduce((a,b)=>a+b,0);}
${JS_HARNESS}
_t(missingNumber([3,0,1]),2,'basic');
_t(missingNumber([0,1]),2,'at end');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'binary-search', num:39, title:'Binary Search', difficulty:'Beginner', category:'Sorting & Searching',
    description:'Given a sorted array and a target, return the index of the target using binary search. Return -1 if not found.',
    examples:[{input:'nums=[-1,0,3,5,9,12], target=9',output:'4'},{input:'nums=[-1,0,3,5,9,12], target=2',output:'-1'}],
    constraints:['1 ≤ nums.length ≤ 10⁴','All values unique'],
    hints:['Maintain left and right pointers','Compare mid element to target, halve the search space each time'],
    tags:['array','binary-search'], timeComplexity:'O(log n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def binary_search(nums, target):
    l, r = 0, len(nums)-1
    while l <= r:
        m = (l+r)//2
        if nums[m] == target: return m
        elif nums[m] < target: l = m+1
        else: r = m-1
    return -1
${PY_HARNESS}
_t(binary_search([-1,0,3,5,9,12],9),4,'found')
_t(binary_search([-1,0,3,5,9,12],2),-1,'not found')
_t(binary_search([1],1),0,'single element found')
_t(binary_search([1],0),-1,'single element not found')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function binarySearch(nums,target){let l=0,r=nums.length-1;while(l<=r){const m=(l+r)>>1;if(nums[m]===target)return m;else if(nums[m]<target)l=m+1;else r=m-1;}return -1;}
${JS_HARNESS}
_t(binarySearch([-1,0,3,5,9,12],9),4,'found');
_t(binarySearch([-1,0,3,5,9,12],2),-1,'not found');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'search-rotated-array', num:40, title:'Search in Rotated Sorted Array', difficulty:'Intermediate', category:'Sorting & Searching',
    description:'Given a sorted array rotated at some pivot, search for a target. Must be O(log n).',
    examples:[{input:'nums=[4,5,6,7,0,1,2], target=0',output:'4'},{input:'nums=[4,5,6,7,0,1,2], target=3',output:'-1'}],
    constraints:['1 ≤ nums.length ≤ 5000','All values unique'],
    hints:['One half of the array is always sorted after a rotation','Determine which half is sorted, check if target is in that half'],
    tags:['array','binary-search'], timeComplexity:'O(log n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def search_rotated(nums, target):
    l, r = 0, len(nums)-1
    while l <= r:
        m = (l+r)//2
        if nums[m] == target: return m
        if nums[l] <= nums[m]:
            if nums[l] <= target < nums[m]: r = m-1
            else: l = m+1
        else:
            if nums[m] < target <= nums[r]: l = m+1
            else: r = m-1
    return -1
${PY_HARNESS}
_t(search_rotated([4,5,6,7,0,1,2],0),4,'in right half')
_t(search_rotated([4,5,6,7,0,1,2],3),-1,'not found')
_t(search_rotated([1],0),-1,'not in single element')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function searchRotated(nums,target){let l=0,r=nums.length-1;while(l<=r){const m=(l+r)>>1;if(nums[m]===target)return m;if(nums[l]<=nums[m]){if(nums[l]<=target&&target<nums[m])r=m-1;else l=m+1;}else{if(nums[m]<target&&target<=nums[r])l=m+1;else r=m-1;}}return -1;}
${JS_HARNESS}
_t(searchRotated([4,5,6,7,0,1,2],0),4,'found');
_t(searchRotated([4,5,6,7,0,1,2],3),-1,'not found');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'lru-cache', num:41, title:'LRU Cache', difficulty:'Advanced', category:'OOP & Design',
    description:'Design a data structure that follows the Least Recently Used cache policy. Implement get(key) and put(key,value) both in O(1).',
    examples:[{input:'LRUCache(2); put(1,1); put(2,2); get(1)→1; put(3,3); get(2)→-1',output:'-1 (key 2 was evicted)'}],
    constraints:['1 ≤ capacity ≤ 3000','0 ≤ key, value ≤ 10⁴'],
    hints:['Combine a hash map (O(1) lookup) with a doubly linked list (O(1) reorder)','Python\'s OrderedDict gives both for free'],
    tags:['design','hash-map','linked-list'], timeComplexity:'O(1)', spaceComplexity:'O(capacity)',
    starterCode:{
      python:`from collections import OrderedDict
class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity; self.cache = OrderedDict()
    def get(self, key):
        if key not in self.cache: return -1
        self.cache.move_to_end(key); return self.cache[key]
    def put(self, key, value):
        if key in self.cache: self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap: self.cache.popitem(last=False)

_p=_n=0
def _t(g,e,d=''):
    global _p,_n;_n+=1
    if g==e:_p+=1;print(f'✓ Test {_n}'+(f' - {d}' if d else ''))
    else:print(f'✗ Test {_n} - Expected {repr(e)}, got {repr(g)}'+(f' [{d}]' if d else ''))

c = LRUCache(2)
c.put(1,1); c.put(2,2)
_t(c.get(1),1,'get existing')
c.put(3,3)
_t(c.get(2),-1,'evicted key')
_t(c.get(3),3,'new key')
c.put(4,4)
_t(c.get(1),-1,'evicted after put 4')
print(f'{_p}/{_n} tests passed')`,
      javascript:`class LRUCache {
  constructor(cap) { this.cap=cap; this.cache=new Map(); }
  get(key) { if(!this.cache.has(key))return -1; const v=this.cache.get(key); this.cache.delete(key); this.cache.set(key,v); return v; }
  put(key,value) { if(this.cache.has(key))this.cache.delete(key); this.cache.set(key,value); if(this.cache.size>this.cap)this.cache.delete(this.cache.keys().next().value); }
}
${JS_HARNESS}
const c=new LRUCache(2);c.put(1,1);c.put(2,2);
_t(c.get(1),1,'get existing');c.put(3,3);
_t(c.get(2),-1,'evicted key');
_t(c.get(3),3,'new key');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'knn-classifier', num:42, title:'K-Nearest Neighbors Classifier', difficulty:'Intermediate', category:'AI / ML Algorithms',
    description:'Implement a KNN classifier. Given training points and labels, classify a test point by majority vote among its k nearest neighbors (Euclidean distance).',
    examples:[{input:'train=[[1,2],[2,3],[3,1]], labels=[0,0,1], point=[2,2], k=2',output:'0'},{input:'k=1, nearest is [2,3]→label 0',output:'0'}],
    constraints:['1 ≤ k ≤ len(train)','Points can be any dimension'],
    hints:['Compute Euclidean distance from test point to each training point','Sort by distance, pick k nearest, return majority label'],
    tags:['ml','classification','distance'], timeComplexity:'O(n·d)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def knn_classify(train, labels, point, k):
    dists = []
    for i, p in enumerate(train):
        d = sum((a-b)**2 for a,b in zip(p, point))**0.5
        dists.append((d, labels[i]))
    dists.sort()
    votes = {}
    for _, label in dists[:k]: votes[label] = votes.get(label, 0)+1
    return max(votes, key=votes.get)
${PY_HARNESS}
_t(knn_classify([[1,2],[2,3],[3,1]],[0,0,1],[2,2],2),0,'majority 0')
_t(knn_classify([[0,0],[1,1],[2,0]],[0,1,0],[1,0],1),0,'k=1 nearest')
_t(knn_classify([[0,0],[1,1]],[0,1],[0.4,0.4],1),0,'closest to class 0')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function knnClassify(train,labels,point,k){
  const dists=train.map((p,i)=>({d:Math.sqrt(p.reduce((s,v,j)=>s+(v-point[j])**2,0)),l:labels[i]}));
  dists.sort((a,b)=>a.d-b.d);
  const votes={};for(const{l}of dists.slice(0,k))votes[l]=(votes[l]||0)+1;
  return +Object.entries(votes).sort((a,b)=>b[1]-a[1])[0][0];
}
${JS_HARNESS}
_t(knnClassify([[1,2],[2,3],[3,1]],[0,0,1],[2,2],2),0,'majority 0');
_t(knnClassify([[0,0],[1,1],[2,0]],[0,1,0],[1,0],1),0,'k=1 nearest');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'gradient-descent', num:43, title:'Linear Regression via Gradient Descent', difficulty:'Intermediate', category:'AI / ML Algorithms',
    description:'Implement batch gradient descent to fit y = m*x + b on a dataset. Return the learned (m, b) rounded to 2 decimal places after 1000 epochs.',
    examples:[{input:'X=[1,2,3,4,5], y=[2,4,6,8,10], lr=0.01',output:'(2.0, 0.0)',explanation:'Perfect y=2x fit'}],
    constraints:['Data is 1D','Learning rate 0.01, 1000 epochs sufficient for convergence'],
    hints:['gradient of m: -2/n * sum(x*(y - y_pred))','gradient of b: -2/n * sum(y - y_pred)'],
    tags:['ml','regression','optimization'], timeComplexity:'O(epochs·n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def gradient_descent(X, y, lr=0.01, epochs=1000):
    m = b = 0.0; n = len(X)
    for _ in range(epochs):
        y_pred = [m*x+b for x in X]
        dm = -2/n * sum(X[i]*(y[i]-y_pred[i]) for i in range(n))
        db = -2/n * sum(y[i]-y_pred[i] for i in range(n))
        m -= lr*dm; b -= lr*db
    return round(m, 2), round(b, 2)
${PY_HARNESS}
m, b = gradient_descent([1,2,3,4,5],[2,4,6,8,10])
_t(m, 2.0, 'slope should be 2')
_t(b, 0.0, 'intercept should be 0')
m2, b2 = gradient_descent([1,2,3],[3,5,7])
_t(m2, 2.0, 'slope of y=2x+1')
_t(b2, 1.0, 'intercept of y=2x+1')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function gradientDescent(X,y,lr=0.01,epochs=1000){
  let m=0,b=0;const n=X.length;
  for(let e=0;e<epochs;e++){
    const yp=X.map(x=>m*x+b);
    const dm=-2/n*X.reduce((s,x,i)=>s+x*(y[i]-yp[i]),0);
    const db=-2/n*y.reduce((s,yi,i)=>s+(yi-yp[i]),0);
    m-=lr*dm; b-=lr*db;
  }
  return [+m.toFixed(2),+b.toFixed(2)];
}
${JS_HARNESS}
const [m,b]=gradientDescent([1,2,3,4,5],[2,4,6,8,10]);
_t(m,2,'slope=2');_t(b,0,'intercept=0');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'subsets', num:44, title:'Subsets', difficulty:'Intermediate', category:'Recursion & Backtracking',
    description:'Given an integer array of unique elements, return all possible subsets (the power set).',
    examples:[{input:'nums=[1,2,3]',output:'[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]'},{input:'nums=[0]',output:'[[],[0]]'}],
    constraints:['1 ≤ nums.length ≤ 10','All values unique'],
    hints:['For each element, decide: include or exclude','Iterative: start with [[]], for each number add it to every existing subset'],
    tags:['backtracking','array','bit-manipulation'], timeComplexity:'O(n·2ⁿ)', spaceComplexity:'O(n·2ⁿ)',
    starterCode:{
      python:`def subsets(nums):
    res = [[]]
    for n in nums:
        res += [s + [n] for s in res]
    return sorted(res, key=lambda x: (len(x), x))
${PY_HARNESS}
_t(subsets([1,2,3]),[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]],'3 elements')
_t(subsets([0]),[[],[0]],'single element')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function subsets(nums){let res=[[]];for(const n of nums)res=[...res,...res.map(s=>[...s,n])];return res.sort((a,b)=>a.length-b.length||JSON.stringify(a).localeCompare(JSON.stringify(b)));}
${JS_HARNESS}
_t(subsets([1,2,3]),[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]],'3 elements');
_t(subsets([0]),[[],[0]],'single element');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'combination-sum', num:45, title:'Combination Sum', difficulty:'Intermediate', category:'Recursion & Backtracking',
    description:'Find all combinations of candidates that sum to target. Numbers may be reused. Return combinations sorted in non-descending order.',
    examples:[{input:'candidates=[2,3,6,7], target=7',output:'[[2,2,3],[7]]'},{input:'candidates=[2,3,5], target=8',output:'[[2,2,2,2],[2,3,3],[3,5]]'}],
    constraints:['1 ≤ candidates.length ≤ 30','All candidates unique','1 ≤ target ≤ 40'],
    hints:['Sort candidates and backtrack','At each step either include current candidate again or move to next'],
    tags:['backtracking','array'], timeComplexity:'O(N^(T/M))', spaceComplexity:'O(T/M)',
    starterCode:{
      python:`def combination_sum(candidates, target):
    candidates.sort(); res = []
    def bt(start, curr, rem):
        if rem == 0: res.append(curr[:]); return
        for i in range(start, len(candidates)):
            if candidates[i] > rem: break
            curr.append(candidates[i]); bt(i, curr, rem-candidates[i]); curr.pop()
    bt(0, [], target); return res
${PY_HARNESS}
_t(combination_sum([2,3,6,7],7),[[2,2,3],[7]],'classic')
_t(combination_sum([2,3,5],8),[[2,2,2,2],[2,3,3],[3,5]],'three results')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function combinationSum(candidates,target){candidates.sort((a,b)=>a-b);const res=[];function bt(start,curr,rem){if(rem===0){res.push([...curr]);return;}for(let i=start;i<candidates.length;i++){if(candidates[i]>rem)break;curr.push(candidates[i]);bt(i,curr,rem-candidates[i]);curr.pop();}}bt(0,[],target);return res;}
${JS_HARNESS}
_t(combinationSum([2,3,6,7],7),[[2,2,3],[7]],'classic');
_t(combinationSum([2,3,5],8),[[2,2,2,2],[2,3,3],[3,5]],'three results');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'merge-sort', num:46, title:'Merge Sort', difficulty:'Intermediate', category:'Sorting & Searching',
    description:'Implement the merge sort algorithm that divides, sorts, and merges sublists recursively.',
    examples:[{input:'nums=[38,27,43,3,9,82,10]',output:'[3,9,10,27,38,43,82]'},{input:'nums=[5,2,8,1,9]',output:'[1,2,5,8,9]'}],
    constraints:['0 ≤ nums.length ≤ 10⁵'],
    hints:['Divide at midpoint into left and right halves','Merge by comparing front elements of each sorted half'],
    tags:['sorting','divide-and-conquer','recursion'], timeComplexity:'O(n log n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def merge_sort(nums):
    if len(nums) <= 1: return nums
    mid = len(nums)//2
    left = merge_sort(nums[:mid]); right = merge_sort(nums[mid:])
    i = j = 0; res = []
    while i < len(left) and j < len(right):
        if left[i] <= right[j]: res.append(left[i]); i += 1
        else: res.append(right[j]); j += 1
    return res + left[i:] + right[j:]
${PY_HARNESS}
_t(merge_sort([38,27,43,3,9,82,10]),[3,9,10,27,38,43,82],'classic')
_t(merge_sort([5,2,8,1,9]),[1,2,5,8,9],'basic')
_t(merge_sort([]),[  ],'empty')
_t(merge_sort([1]),[1],'single element')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function mergeSort(nums){if(nums.length<=1)return nums;const mid=Math.floor(nums.length/2),left=mergeSort(nums.slice(0,mid)),right=mergeSort(nums.slice(mid));let i=0,j=0,res=[];while(i<left.length&&j<right.length)res.push(left[i]<=right[j]?left[i++]:right[j++]);return res.concat(left.slice(i)).concat(right.slice(j));}
${JS_HARNESS}
_t(mergeSort([38,27,43,3,9,82,10]),[3,9,10,27,38,43,82],'classic');
_t(mergeSort([]),[  ],'empty');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'kth-largest', num:47, title:'Kth Largest Element in Array', difficulty:'Intermediate', category:'Sorting & Searching',
    description:'Find the kth largest element in an unsorted array (not the kth distinct element).',
    examples:[{input:'nums=[3,2,1,5,6,4], k=2',output:'5'},{input:'nums=[3,2,3,1,2,4,5,5,6], k=4',output:'4'}],
    constraints:['1 ≤ k ≤ nums.length ≤ 10⁵'],
    hints:['Min-heap of size k: push all, pop until size k, top is answer','Quickselect achieves O(n) average'],
    tags:['sorting','heap','quickselect'], timeComplexity:'O(n log k)', spaceComplexity:'O(k)',
    starterCode:{
      python:`import heapq
def find_kth_largest(nums, k):
    return heapq.nlargest(k, nums)[-1]
${PY_HARNESS}
_t(find_kth_largest([3,2,1,5,6,4],2),5,'classic k=2')
_t(find_kth_largest([3,2,3,1,2,4,5,5,6],4),4,'k=4')
_t(find_kth_largest([1],1),1,'single element')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function findKthLargest(nums,k){return nums.sort((a,b)=>b-a)[k-1];}
${JS_HARNESS}
_t(findKthLargest([3,2,1,5,6,4],2),5,'classic k=2');
_t(findKthLargest([3,2,3,1,2,4,5,5,6],4),4,'k=4');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'decode-string', num:48, title:'Decode String', difficulty:'Intermediate', category:'Stacks & Queues',
    description:'Decode a string encoded as k[encoded_string] where the encoded_string inside brackets is repeated k times.',
    examples:[{input:'s="3[a]2[bc]"',output:'"aaabcbc"'},{input:'s="3[a2[c]]"',output:'"accaccacc"'}],
    constraints:['1 ≤ s.length ≤ 30','k is always a positive integer'],
    hints:['Use a stack to track (current_string, repeat_count) pairs','When you see \']\', pop and repeat the accumulated string'],
    tags:['string','stack','recursion'], timeComplexity:'O(maxK^n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def decode_string(s):
    stack = []; cur = ''; num = 0
    for c in s:
        if c.isdigit(): num = num*10 + int(c)
        elif c == '[': stack.append((cur, num)); cur = ''; num = 0
        elif c == ']':
            prev, k = stack.pop()
            cur = prev + cur * k
        else: cur += c
    return cur
${PY_HARNESS}
_t(decode_string('3[a]2[bc]'),'aaabcbc','basic')
_t(decode_string('3[a2[c]]'),'accaccacc','nested')
_t(decode_string('2[abc]3[cd]ef'),'abcabccdcdcdef','mixed')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function decodeString(s){const stack=[];let cur='',num=0;for(const c of s){if(/\d/.test(c))num=num*10+Number(c);else if(c==='['){stack.push([cur,num]);cur='';num=0;}else if(c===']'){const[prev,k]=stack.pop();cur=prev+cur.repeat(k);}else cur+=c;}return cur;}
${JS_HARNESS}
_t(decodeString('3[a]2[bc]'),'aaabcbc','basic');
_t(decodeString('3[a2[c]]'),'accaccacc','nested');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'unique-paths', num:49, title:'Unique Paths', difficulty:'Intermediate', category:'Dynamic Programming',
    description:'A robot is in the top-left corner of an m×n grid. It can only move right or down. How many unique paths are there to the bottom-right corner?',
    examples:[{input:'m=3, n=7',output:'28'},{input:'m=3, n=2',output:'3'}],
    constraints:['1 ≤ m, n ≤ 100'],
    hints:['paths(m,n) = paths(m-1,n) + paths(m,n-1)','Use 1D DP array representing one row'],
    tags:['dp','math','combinatorics'], timeComplexity:'O(m·n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def unique_paths(m, n):
    dp = [1] * n
    for _ in range(1, m):
        for j in range(1, n): dp[j] += dp[j-1]
    return dp[-1]
${PY_HARNESS}
_t(unique_paths(3,7),28,'3x7 grid')
_t(unique_paths(3,2),3,'3x2 grid')
_t(unique_paths(1,1),1,'1x1 grid')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function uniquePaths(m,n){const dp=Array(n).fill(1);for(let i=1;i<m;i++)for(let j=1;j<n;j++)dp[j]+=dp[j-1];return dp[n-1];}
${JS_HARNESS}
_t(uniquePaths(3,7),28,'3x7 grid');
_t(uniquePaths(3,2),3,'3x2 grid');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'perceptron', num:50, title:'Perceptron Learning Algorithm', difficulty:'Intermediate', category:'AI / ML Algorithms',
    description:'Implement the perceptron update rule. Train on linearly separable data (AND gate) and return predictions. Each epoch updates weights when misclassified.',
    examples:[{input:'AND gate: X=[[0,0],[0,1],[1,0],[1,1]], y=[0,0,0,1]',output:'[0,0,0,1] after training'}],
    constraints:['Data must be linearly separable','Binary labels (0 or 1)'],
    hints:['update rule: w += lr * (y - pred) * x','Initialize weights to 0, bias to 0'],
    tags:['ml','classification','neural-networks'], timeComplexity:'O(epochs·n)', spaceComplexity:'O(features)',
    starterCode:{
      python:`def perceptron(X, y, lr=0.1, epochs=100):
    w = [0.0]*len(X[0]); b = 0.0
    for _ in range(epochs):
        for xi, yi in zip(X, y):
            pred = 1 if sum(a*b_ for a,b_ in zip(w,xi))+b > 0 else 0
            err = yi - pred
            w = [wj + lr*err*xj for wj,xj in zip(w,xi)]
            b += lr * err
    return [1 if sum(a*b_ for a,b_ in zip(w,xi))+b > 0 else 0 for xi in X]

${PY_HARNESS}
_t(perceptron([[0,0],[0,1],[1,0],[1,1]],[0,0,0,1]),[0,0,0,1],'AND gate')
_t(perceptron([[0,0],[0,1],[1,0],[1,1]],[0,0,0,0]),[0,0,0,0],'all zeros')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function perceptron(X,y,lr=0.1,epochs=100){
  let w=Array(X[0].length).fill(0),b=0;
  for(let e=0;e<epochs;e++)for(let i=0;i<X.length;i++){const dot=X[i].reduce((s,v,j)=>s+v*w[j],0)+b;const pred=dot>0?1:0;const err=y[i]-pred;w=w.map((v,j)=>v+lr*err*X[i][j]);b+=lr*err;}
  return X.map(xi=>{const dot=xi.reduce((s,v,j)=>s+v*w[j],0)+b;return dot>0?1:0;});
}
${JS_HARNESS}
_t(perceptron([[0,0],[0,1],[1,0],[1,1]],[0,0,0,1]),[0,0,0,1],'AND gate');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
