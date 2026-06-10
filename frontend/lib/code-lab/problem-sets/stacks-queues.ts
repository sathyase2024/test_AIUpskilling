import { PY_HARNESS, JS_HARNESS, type ProblemDef } from './harness'

export const STACKS_QUEUES: ProblemDef[] = [
  {
    id:'valid-parentheses', title:'Valid Parentheses', difficulty:'Beginner', category:'Stacks & Queues',
    description:'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. An input string is valid if: (1) open brackets must be closed by the same type of brackets, (2) open brackets must be closed in the correct order, and (3) every close bracket has a corresponding open bracket of the same type.',
    examples:[
      {input:'s = "()"',output:'true'},
      {input:'s = "()[]{}"',output:'true'},
      {input:'s = "(]"',output:'false',explanation:'The opening "(" is closed by "]", a different bracket type.'},
      {input:'s = "([)]"',output:'false',explanation:'Brackets close out of order.'},
    ],
    constraints:['1 <= s.length <= 10⁴','s consists of parentheses only: ()[]{}'],
    hints:['Push opening brackets onto a stack','On a closing bracket, the stack top must be the matching opener — pop it; otherwise the string is invalid','The string is valid only if the stack is empty at the end'],
    tags:['string','stack'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def is_valid(s):
    pass
`,
      javascript:`function isValid(s) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(is_valid('()'),True,'simple pair')
_t(is_valid('()[]{}'),True,'three pairs')
_t(is_valid('(]'),False,'wrong type')
_t(is_valid('([)]'),False,'wrong order')
_t(is_valid('{[]}'),True,'nested')
_t(is_valid('('),False,'unclosed opener')
_t(is_valid(']'),False,'closer without opener')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(isValid('()'),true,'simple pair');
_t(isValid('()[]{}'),true,'three pairs');
_t(isValid('(]'),false,'wrong type');
_t(isValid('([)]'),false,'wrong order');
_t(isValid('{[]}'),true,'nested');
_t(isValid('('),false,'unclosed opener');
_t(isValid(']'),false,'closer without opener');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'daily-temperatures', title:'Daily Temperatures', difficulty:'Intermediate', category:'Stacks & Queues',
    description:'Given an array of integers temperatures representing the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the i-th day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead. A naive scan for each day is O(n²); a monotonic stack solves it in O(n).',
    examples:[
      {input:'temperatures = [73,74,75,71,69,72,76,73]',output:'[1,1,4,2,1,1,0,0]',explanation:'Day 0 (73°) waits 1 day for 74°; day 2 (75°) waits 4 days for 76°; the last day has no warmer future day.'},
      {input:'temperatures = [30,40,50,60]',output:'[1,1,1,0]'},
    ],
    constraints:['1 <= temperatures.length <= 10⁵','30 <= temperatures[i] <= 100'],
    hints:['Keep a stack of indices whose temperatures are strictly decreasing','When a new temperature is warmer than the stack top, pop and record the index distance','Each index is pushed and popped at most once → O(n) total'],
    tags:['array','stack','monotonic-stack'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def daily_temperatures(temperatures):
    pass
`,
      javascript:`function dailyTemperatures(temperatures) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(daily_temperatures([73,74,75,71,69,72,76,73]),[1,1,4,2,1,1,0,0],'example 1')
_t(daily_temperatures([30,40,50,60]),[1,1,1,0],'increasing')
_t(daily_temperatures([90,60,30]),[0,0,0],'decreasing')
_t(daily_temperatures([50]),[0],'single day')
_t(daily_temperatures([70,70,75]),[2,1,0],'equal temps wait')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(dailyTemperatures([73,74,75,71,69,72,76,73]),[1,1,4,2,1,1,0,0],'example 1');
_t(dailyTemperatures([30,40,50,60]),[1,1,1,0],'increasing');
_t(dailyTemperatures([90,60,30]),[0,0,0],'decreasing');
_t(dailyTemperatures([50]),[0],'single day');
_t(dailyTemperatures([70,70,75]),[2,1,0],'equal temps wait');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'largest-rectangle-histogram', title:'Largest Rectangle in Histogram', difficulty:'Expert', category:'Stacks & Queues',
    description:'Given an array of integers heights representing the histogram\'s bar heights where the width of each bar is 1, return the area of the largest rectangle in the histogram. For each bar, the widest rectangle using that bar\'s full height extends to the nearest shorter bar on each side — a monotonic stack finds these boundaries for all bars in one pass.',
    examples:[
      {input:'heights = [2,1,5,6,2,3]',output:'10',explanation:'The largest rectangle has height 5 and spans the bars [5,6], area = 5 × 2 = 10.'},
      {input:'heights = [2,4]',output:'4',explanation:'Either the bar of height 4 alone (area 4) or both bars at height 2 (area 4).'},
    ],
    constraints:['1 <= heights.length <= 10⁵','0 <= heights[i] <= 10⁴'],
    hints:['Maintain a stack of indices with non-decreasing heights','When the current bar is shorter than the stack top, pop: the popped bar\'s rectangle ends here and starts after the new stack top','Append a sentinel height 0 at the end to flush the stack'],
    tags:['array','stack','monotonic-stack'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def largest_rectangle_area(heights):
    pass
`,
      javascript:`function largestRectangleArea(heights) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(largest_rectangle_area([2,1,5,6,2,3]),10,'example 1')
_t(largest_rectangle_area([2,4]),4,'two bars')
_t(largest_rectangle_area([1]),1,'single bar')
_t(largest_rectangle_area([2,2,2]),6,'flat histogram')
_t(largest_rectangle_area([5,4,1,2]),8,'descending then rise')
_t(largest_rectangle_area([0,9]),9,'zero-height bar')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(largestRectangleArea([2,1,5,6,2,3]),10,'example 1');
_t(largestRectangleArea([2,4]),4,'two bars');
_t(largestRectangleArea([1]),1,'single bar');
_t(largestRectangleArea([2,2,2]),6,'flat histogram');
_t(largestRectangleArea([5,4,1,2]),8,'descending then rise');
_t(largestRectangleArea([0,9]),9,'zero-height bar');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'evaluate-rpn', title:'Evaluate Reverse Polish Notation', difficulty:'Intermediate', category:'Stacks & Queues',
    description:'You are given an array of strings tokens that represents an arithmetic expression in Reverse Polish Notation. Evaluate the expression and return an integer that represents its value. The valid operators are "+", "-", "*", and "/". Each operand may be an integer or another expression. Division between two integers always truncates toward zero (so -7 / 2 = -3 and 10 / -3 = -3, not toward negative infinity). There will be no division by zero. The expression is always valid, and every intermediate result and the final answer fit in a signed 32-bit integer.',
    examples:[
      {input:'tokens = ["2","1","+","3","*"]',output:'9',explanation:'((2 + 1) * 3) = 9.'},
      {input:'tokens = ["4","13","5","/","+"]',output:'6',explanation:'(4 + (13 / 5)) = (4 + 2) = 6.'},
      {input:'tokens = ["10","-3","/"]',output:'-3',explanation:'10 / -3 = -3.33..., which truncates toward zero to -3.'},
    ],
    constraints:['1 <= tokens.length <= 10⁴','tokens[i] is either an operator: "+", "-", "*", "/", or an integer in the range [-200, 200]','Division truncates toward zero','No division by zero'],
    hints:['Push operands onto a stack; on an operator, pop the top two and apply it','Order matters for "-" and "/": the second-popped value is the left operand','Use truncation toward zero, not floor division — in Python prefer int(a / b) and in JS use Math.trunc(a / b)'],
    tags:['array','math','stack'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def eval_rpn(tokens):
    pass
`,
      javascript:`function evalRPN(tokens) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(eval_rpn(['2','1','+','3','*']),9,'example 1')
_t(eval_rpn(['4','13','5','/','+']),6,'example 2')
_t(eval_rpn(['10','-3','/']),-3,'negative division truncates toward zero')
_t(eval_rpn(['7','2','/']),3,'positive truncation')
_t(eval_rpn(['-7','2','/']),-3,'negative numerator truncates toward zero')
_t(eval_rpn(['5']),5,'single operand')
_t(eval_rpn(['10','6','9','3','+','-11','*','/','*','17','+','5','+']),22,'complex expression')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(evalRPN(['2','1','+','3','*']),9,'example 1');
_t(evalRPN(['4','13','5','/','+']),6,'example 2');
_t(evalRPN(['10','-3','/']),-3,'negative division truncates toward zero');
_t(evalRPN(['7','2','/']),3,'positive truncation');
_t(evalRPN(['-7','2','/']),-3,'negative numerator truncates toward zero');
_t(evalRPN(['5']),5,'single operand');
_t(evalRPN(['10','6','9','3','+','-11','*','/','*','17','+','5','+']),22,'complex expression');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'decode-string', title:'Decode String', difficulty:'Intermediate', category:'Stacks & Queues',
    description:'Given an encoded string, return its decoded string. The encoding rule is k[encoded_string], where the encoded_string inside the square brackets is repeated exactly k times. You may assume that the input string is always valid: there are no extra white spaces, the square brackets are well-formed, and so on. Furthermore, you may assume that the original data does not contain any digits and that digits are only used to indicate the repeat count k. Encodings may be nested, e.g. 3[a2[c]] decodes to "accaccacc".',
    examples:[
      {input:'s = "3[a]2[bc]"',output:'"aaabcbc"'},
      {input:'s = "3[a2[c]]"',output:'"accaccacc"',explanation:'The inner 2[c] expands to "cc", then a+"cc" repeated 3 times.'},
      {input:'s = "2[abc]3[cd]ef"',output:'"abcabccdcdcdef"'},
    ],
    constraints:['1 <= s.length <= 30','s consists of lowercase English letters, digits, and square brackets "[]"','s is guaranteed to be a valid input','All the integers in s are in the range [1, 300]'],
    hints:['Use a stack to remember the string built so far and the repeat count when entering a bracket','On "[" push the current string and the parsed number, then reset the current string','On "]" pop the count and the previous string, and append current*count to it'],
    tags:['string','stack','recursion'], timeComplexity:'O(n·k)', spaceComplexity:'O(n·k)',
    starterCode:{
      python:`def decode_string(s):
    pass
`,
      javascript:`function decodeString(s) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(decode_string('3[a]2[bc]'),'aaabcbc','example 1')
_t(decode_string('3[a2[c]]'),'accaccacc','nested')
_t(decode_string('2[abc]3[cd]ef'),'abcabccdcdcdef','multiple groups')
_t(decode_string('abc'),'abc','no encoding')
_t(decode_string('10[a]'),'aaaaaaaaaa','multi-digit count')
_t(decode_string('2[2[b]c]'),'bbcbbc','nested with suffix')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(decodeString('3[a]2[bc]'),'aaabcbc','example 1');
_t(decodeString('3[a2[c]]'),'accaccacc','nested');
_t(decodeString('2[abc]3[cd]ef'),'abcabccdcdcdef','multiple groups');
_t(decodeString('abc'),'abc','no encoding');
_t(decodeString('10[a]'),'aaaaaaaaaa','multi-digit count');
_t(decodeString('2[2[b]c]'),'bbcbbc','nested with suffix');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'longest-valid-parentheses', title:'Longest Valid Parentheses', difficulty:'Expert', category:'Stacks & Queues',
    description:'Given a string s containing just the characters "(" and ")", return the length of the longest valid (well-formed) parentheses substring. A valid substring is one in which every opening bracket has a matching closing bracket in the correct order and vice versa. The substring must be contiguous.',
    examples:[
      {input:'s = "(()"',output:'2',explanation:'The longest valid substring is "()", whose length is 2.'},
      {input:'s = ")()())"',output:'4',explanation:'The longest valid substring is "()()", whose length is 4.'},
      {input:'s = ""',output:'0'},
    ],
    constraints:['0 <= s.length <= 3·10⁴','s[i] is "(" or ")"'],
    hints:['A stack of indices works: seed it with -1 as a base; push indices of "("','On ")" pop; if the stack becomes empty push the current index as a new base, otherwise the length is current index minus the new stack top','An O(1)-space alternative counts opens and closes left-to-right and again right-to-left'],
    tags:['string','stack','dynamic-programming'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`def longest_valid_parentheses(s):
    pass
`,
      javascript:`function longestValidParentheses(s) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(longest_valid_parentheses('(()'),2,'example 1')
_t(longest_valid_parentheses(')()())'),4,'example 2')
_t(longest_valid_parentheses(''),0,'empty string')
_t(longest_valid_parentheses('()(()'),2,'reset in middle')
_t(longest_valid_parentheses('()(())'),6,'fully matched')
_t(longest_valid_parentheses('((((('),0,'all opens')
_t(longest_valid_parentheses(')))))'),0,'all closes')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(longestValidParentheses('(()'),2,'example 1');
_t(longestValidParentheses(')()())'),4,'example 2');
_t(longestValidParentheses(''),0,'empty string');
_t(longestValidParentheses('()(()'),2,'reset in middle');
_t(longestValidParentheses('()(())'),6,'fully matched');
_t(longestValidParentheses('((((('),0,'all opens');
_t(longestValidParentheses(')))))'),0,'all closes');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
