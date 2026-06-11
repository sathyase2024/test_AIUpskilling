import { PY_HARNESS, JS_HARNESS, type ProblemDef } from './harness'

export const BIT_MANIPULATION: ProblemDef[] = [
  {
    id:'single-number', title:'Single Number', difficulty:'Beginner', category:'Bit Manipulation',
    description:'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space — a hash map satisfies neither the space requirement nor the spirit of the problem.',
    examples:[
      {input:'nums = [2,2,1]',output:'1'},
      {input:'nums = [4,1,2,1,2]',output:'4'},
      {input:'nums = [1]',output:'1'},
    ],
    constraints:['1 <= nums.length <= 3·10⁴','-3·10⁴ <= nums[i] <= 3·10⁴','Each element appears twice except one','O(n) time, O(1) space required'],
    hints:['XOR of a number with itself is 0; XOR with 0 is the number itself','XOR is commutative and associative — order does not matter','XOR everything together: pairs cancel, leaving the single number'],
    tags:['bit-manipulation','xor','array'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def single_number(nums):
    pass
`,
      javascript:`function singleNumber(nums) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(single_number([2,2,1]),1,'example 1')
_t(single_number([4,1,2,1,2]),4,'example 2')
_t(single_number([1]),1,'single element')
_t(single_number([-1,-1,7]),7,'negative pairs')
_t(single_number([0,1,0]),1,'zero pair')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(singleNumber([2,2,1]),1,'example 1');
_t(singleNumber([4,1,2,1,2]),4,'example 2');
_t(singleNumber([1]),1,'single element');
_t(singleNumber([-1,-1,7]),7,'negative pairs');
_t(singleNumber([0,1,0]),1,'zero pair');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'counting-bits', title:'Counting Bits', difficulty:'Intermediate', category:'Bit Manipulation',
    description:'Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1 bits in the binary representation of i. Follow-up: it is very easy to come up with a solution with O(n log n) runtime (popcount per number) — can you do it in a single pass in O(n) using the results you have already computed?',
    examples:[
      {input:'n = 2',output:'[0,1,1]',explanation:'0 → 0b0 (0 ones), 1 → 0b1 (1), 2 → 0b10 (1).'},
      {input:'n = 5',output:'[0,1,1,2,1,2]',explanation:'3 → 0b11 (2), 4 → 0b100 (1), 5 → 0b101 (2).'},
    ],
    constraints:['0 <= n <= 10⁵'],
    hints:['i >> 1 is i with its last bit dropped','ans[i] = ans[i >> 1] + (i & 1)','Equivalently ans[i] = ans[i & (i-1)] + 1, since i & (i-1) clears the lowest set bit'],
    tags:['bit-manipulation','dynamic-programming'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def count_bits(n):
    pass
`,
      javascript:`function countBits(n) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(count_bits(2),[0,1,1],'example 1')
_t(count_bits(5),[0,1,1,2,1,2],'example 2')
_t(count_bits(0),[0],'just zero')
_t(count_bits(8),[0,1,1,2,1,2,2,3,1],'powers of two reset')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(countBits(2),[0,1,1],'example 1');
_t(countBits(5),[0,1,1,2,1,2],'example 2');
_t(countBits(0),[0],'just zero');
_t(countBits(8),[0,1,1,2,1,2,2,3,1],'powers of two reset');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'number-of-1-bits', title:'Number of 1 Bits', difficulty:'Beginner', category:'Bit Manipulation',
    description:'Write a function that takes a non-negative integer n and returns the number of 1 bits it has in its binary representation (also known as the Hamming weight or popcount). For this problem the input fits within an unsigned 31-bit range so the value is safe as a signed 32-bit integer in every language.',
    examples:[
      {input:'n = 11',output:'3',explanation:'The binary representation of 11 is 1011, which has three 1 bits.'},
      {input:'n = 128',output:'1',explanation:'The binary representation of 128 is 10000000, which has a single 1 bit.'},
      {input:'n = 0',output:'0',explanation:'Zero has no 1 bits.'},
    ],
    constraints:['0 <= n <= 2³¹ - 1'],
    hints:['Inspect the lowest bit with n & 1, then shift n right by one','Repeat until n becomes 0, accumulating the set bits','Brian Kernighan trick: n & (n - 1) clears the lowest set bit, so the loop runs once per 1 bit'],
    tags:['bit-manipulation','popcount'], timeComplexity:'O(number of set bits)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def hamming_weight(n):
    pass
`,
      javascript:`function hammingWeight(n) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(hamming_weight(11),3,'example 1')
_t(hamming_weight(128),1,'single bit')
_t(hamming_weight(0),0,'zero')
_t(hamming_weight(7),3,'three low bits')
_t(hamming_weight(2147483647),31,'all 31 bits set')
_t(hamming_weight(1),1,'one')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(hammingWeight(11),3,'example 1');
_t(hammingWeight(128),1,'single bit');
_t(hammingWeight(0),0,'zero');
_t(hammingWeight(7),3,'three low bits');
_t(hammingWeight(2147483647),31,'all 31 bits set');
_t(hammingWeight(1),1,'one');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'missing-number', title:'Missing Number', difficulty:'Beginner', category:'Bit Manipulation',
    description:'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array. Can you implement a solution using only O(1) extra space complexity and O(n) runtime complexity? Both the XOR trick (XOR all indices and values) and the Gauss sum formula (n·(n+1)/2 minus the array sum) achieve this.',
    examples:[
      {input:'nums = [3,0,1]',output:'2',explanation:'n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number.'},
      {input:'nums = [0,1]',output:'2',explanation:'n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number.'},
      {input:'nums = [9,6,4,2,3,5,7,0,1]',output:'8',explanation:'n = 9; 8 is the missing number in the range [0,9].'},
    ],
    constraints:['n == nums.length','1 <= n <= 10⁴','0 <= nums[i] <= n','All the numbers of nums are unique'],
    hints:['The expected sum of 0..n is n·(n+1)/2; subtract the actual sum to find the missing value','Alternatively XOR all indices 0..n together with all array values','Every present number cancels, leaving only the missing one'],
    tags:['bit-manipulation','xor','array','math'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def missing_number(nums):
    pass
`,
      javascript:`function missingNumber(nums) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(missing_number([3,0,1]),2,'example 1')
_t(missing_number([0,1]),2,'missing at end')
_t(missing_number([9,6,4,2,3,5,7,0,1]),8,'example 3')
_t(missing_number([0]),1,'missing one of [0,1]')
_t(missing_number([1]),0,'missing zero')
_t(missing_number([0,2]),1,'missing middle')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(missingNumber([3,0,1]),2,'example 1');
_t(missingNumber([0,1]),2,'missing at end');
_t(missingNumber([9,6,4,2,3,5,7,0,1]),8,'example 3');
_t(missingNumber([0]),1,'missing one of [0,1]');
_t(missingNumber([1]),0,'missing zero');
_t(missingNumber([0,2]),1,'missing middle');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
