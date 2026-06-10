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
]
