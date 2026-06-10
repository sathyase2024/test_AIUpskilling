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
]
