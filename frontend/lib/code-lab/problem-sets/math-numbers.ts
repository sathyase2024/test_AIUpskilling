import { PY_HARNESS, JS_HARNESS, type ProblemDef } from './harness'

export const MATH_NUMBERS: ProblemDef[] = [
  {
    id:'palindrome-number', title:'Palindrome Number', difficulty:'Beginner', category:'Math & Numbers',
    description:'Given an integer x, return true if x is a palindrome, and false otherwise. An integer is a palindrome when it reads the same forward and backward. For example, 121 is a palindrome while 123 is not. Negative numbers are never palindromes (the minus sign only appears on the left). Follow-up: could you solve it without converting the integer to a string?',
    examples:[
      {input:'x = 121',output:'true'},
      {input:'x = -121',output:'false',explanation:'From left to right it reads -121; from right to left it becomes 121-, so it is not a palindrome.'},
      {input:'x = 10',output:'false',explanation:'Reads 01 from right to left.'},
    ],
    constraints:['-2³¹ <= x <= 2³¹ - 1'],
    hints:['Negatives and (nonzero) multiples of 10 can be rejected immediately','Reverse the digits arithmetically: rev = rev*10 + x%10','You only need to reverse half the digits: stop when rev >= remaining x'],
    tags:['math'], timeComplexity:'O(log₁₀ x)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def is_palindrome_number(x):
    pass
`,
      javascript:`function isPalindromeNumber(x) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(is_palindrome_number(121),True,'example 1')
_t(is_palindrome_number(-121),False,'negative')
_t(is_palindrome_number(10),False,'trailing zero')
_t(is_palindrome_number(0),True,'zero')
_t(is_palindrome_number(1221),True,'even digits')
_t(is_palindrome_number(1234567899),False,'large number')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(isPalindromeNumber(121),true,'example 1');
_t(isPalindromeNumber(-121),false,'negative');
_t(isPalindromeNumber(10),false,'trailing zero');
_t(isPalindromeNumber(0),true,'zero');
_t(isPalindromeNumber(1221),true,'even digits');
_t(isPalindromeNumber(1234567899),false,'large number');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'basic-calculator', title:'Basic Calculator', difficulty:'Expert', category:'Math & Numbers',
    description:'Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation. The expression may contain digits, "+", "-", "(", ")", and spaces. The unary minus is allowed (e.g. "-(2+3)"). You are NOT allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().',
    examples:[
      {input:'s = "1 + 1"',output:'2'},
      {input:'s = " 2-1 + 2 "',output:'3'},
      {input:'s = "(1+(4+5+2)-3)+(6+8)"',output:'23',explanation:'Parentheses group sub-expressions; evaluate inside-out.'},
    ],
    constraints:['1 <= s.length <= 3·10⁵','s consists of digits, "+", "-", "(", ")" and spaces','s represents a valid expression','The answer fits in a 32-bit integer'],
    hints:['Track a running result and a sign (+1/-1) for the next operand','On "(" push the current result and sign onto a stack and start fresh; on ")" pop and combine','Multi-digit numbers: accumulate digits until a non-digit appears'],
    tags:['math','stack','string','parsing'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def calculate(s):
    pass
`,
      javascript:`function calculate(s) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(calculate('1 + 1'),2,'example 1')
_t(calculate(' 2-1 + 2 '),3,'example 2')
_t(calculate('(1+(4+5+2)-3)+(6+8)'),23,'nested parens')
_t(calculate('-2+ 1'),-1,'unary minus')
_t(calculate('- (3 + (4 + 5))'),-12,'unary minus on group')
_t(calculate('2147483647'),2147483647,'single big number')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(calculate('1 + 1'),2,'example 1');
_t(calculate(' 2-1 + 2 '),3,'example 2');
_t(calculate('(1+(4+5+2)-3)+(6+8)'),23,'nested parens');
_t(calculate('-2+ 1'),-1,'unary minus');
_t(calculate('- (3 + (4 + 5))'),-12,'unary minus on group');
_t(calculate('2147483647'),2147483647,'single big number');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'happy-number', title:'Happy Number', difficulty:'Beginner', category:'Math & Numbers',
    description:'Write an algorithm to determine if a number n is happy. A happy number is a number defined by the following process: starting with any positive integer, replace the number by the sum of the squares of its digits; repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy. Return true if n is a happy number, and false if not.',
    examples:[
      {input:'n = 19',output:'true',explanation:'1² + 9² = 82, 8² + 2² = 68, 6² + 8² = 100, 1² + 0² + 0² = 1.'},
      {input:'n = 2',output:'false',explanation:'The process falls into a cycle that never reaches 1.'},
    ],
    constraints:['1 <= n <= 2³¹ - 1'],
    hints:['Define a step that replaces n with the sum of the squares of its digits','Detect cycles with a seen-set, or with Floyd\'s slow/fast pointers','You reach 1 (happy) or revisit a number (unhappy)'],
    tags:['math','hash-table','two-pointers','cycle-detection'], timeComplexity:'O(log n)', spaceComplexity:'O(log n)',
    starterCode:{
      python:`def is_happy(n):
    pass
`,
      javascript:`function isHappy(n) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(is_happy(19),True,'example 1')
_t(is_happy(2),False,'example 2')
_t(is_happy(1),True,'one is happy')
_t(is_happy(7),True,'seven is happy')
_t(is_happy(4),False,'four enters the cycle')
_t(is_happy(100),True,'power of ten')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(isHappy(19),true,'example 1');
_t(isHappy(2),false,'example 2');
_t(isHappy(1),true,'one is happy');
_t(isHappy(7),true,'seven is happy');
_t(isHappy(4),false,'four enters the cycle');
_t(isHappy(100),true,'power of ten');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'pow-x-n', title:'Pow(x, n)', difficulty:'Intermediate', category:'Math & Numbers',
    description:'Implement pow(x, n), which calculates x raised to the power n (i.e. xⁿ). The exponent n may be negative, in which case the result is the reciprocal 1 / x^(-n). A naive loop multiplying x by itself n times is O(n); fast exponentiation (exponentiation by squaring) reduces this to O(log n) by repeatedly squaring the base and halving the exponent. Because results are floating point, the hidden tests compare integer values obtained AFTER rounding, so your answer only needs to be accurate to a small tolerance.',
    examples:[
      {input:'x = 2.00000, n = 10',output:'1024.00000'},
      {input:'x = 2.10000, n = 3',output:'9.26100'},
      {input:'x = 2.00000, n = -2',output:'0.25000',explanation:'2^(-2) = 1 / 2² = 1 / 4 = 0.25.'},
    ],
    constraints:['-100.0 < x < 100.0','-2³¹ <= n <= 2³¹ - 1','n is an integer','Either x is not zero or n > 0','-10⁴ <= xⁿ <= 10⁴'],
    hints:['Handle a negative exponent by inverting: x^n = (1/x)^(-n)','Exponentiation by squaring: if n is even, x^n = (x²)^(n/2); if odd, x^n = x · x^(n-1)','Be careful taking -n when n is the most negative int; use a long/while-based decomposition'],
    tags:['math','recursion','divide-and-conquer'], timeComplexity:'O(log n)', spaceComplexity:'O(log n)',
    starterCode:{
      python:`def my_pow(x, n):
    pass
`,
      javascript:`function myPow(x, n) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(round(my_pow(2.0,10)),1024,'two to the tenth')
_t(round(my_pow(2.0,0)),1,'exponent zero')
_t(round(my_pow(2.0,-2)*10000),2500,'negative exponent reciprocal')
_t(round(my_pow(3.0,5)),243,'three to the fifth')
_t(round(my_pow(0.5,4)*10000),625,'fractional base')
_t(round(my_pow(2.1,3)*100000),926100,'non-integer base')
_t(round(my_pow(1.0,2147483647)),1,'one to a huge power')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(Math.round(myPow(2.0,10)),1024,'two to the tenth');
_t(Math.round(myPow(2.0,0)),1,'exponent zero');
_t(Math.round(myPow(2.0,-2)*10000),2500,'negative exponent reciprocal');
_t(Math.round(myPow(3.0,5)),243,'three to the fifth');
_t(Math.round(myPow(0.5,4)*10000),625,'fractional base');
_t(Math.round(myPow(2.1,3)*100000),926100,'non-integer base');
_t(Math.round(myPow(1.0,2147483647)),1,'one to a huge power');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
