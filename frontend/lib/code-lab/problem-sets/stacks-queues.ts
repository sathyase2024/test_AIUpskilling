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
    # TODO: Return True if all brackets are matched and properly nested
    pass
${PY_HARNESS}
_t(is_valid('()'),True,'simple pair')
_t(is_valid('()[]{}'),True,'three pairs')
_t(is_valid('(]'),False,'wrong type')
_t(is_valid('([)]'),False,'wrong order')
_t(is_valid('{[]}'),True,'nested')
_t(is_valid('('),False,'unclosed opener')
_t(is_valid(']'),False,'closer without opener')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function isValid(s) {
  // TODO: Return true if all brackets are matched and properly nested
  return false;
}
${JS_HARNESS}
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
    # TODO: For each day, return how many days until a warmer temperature (0 if never)
    pass
${PY_HARNESS}
_t(daily_temperatures([73,74,75,71,69,72,76,73]),[1,1,4,2,1,1,0,0],'example 1')
_t(daily_temperatures([30,40,50,60]),[1,1,1,0],'increasing')
_t(daily_temperatures([90,60,30]),[0,0,0],'decreasing')
_t(daily_temperatures([50]),[0],'single day')
_t(daily_temperatures([70,70,75]),[2,1,0],'equal temps wait')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function dailyTemperatures(temperatures) {
  // TODO: For each day, return how many days until a warmer temperature (0 if never)
  return [];
}
${JS_HARNESS}
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
    # TODO: Return the area of the largest rectangle that fits in the histogram
    pass
${PY_HARNESS}
_t(largest_rectangle_area([2,1,5,6,2,3]),10,'example 1')
_t(largest_rectangle_area([2,4]),4,'two bars')
_t(largest_rectangle_area([1]),1,'single bar')
_t(largest_rectangle_area([2,2,2]),6,'flat histogram')
_t(largest_rectangle_area([5,4,1,2]),8,'descending then rise')
_t(largest_rectangle_area([0,9]),9,'zero-height bar')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function largestRectangleArea(heights) {
  // TODO: Return the area of the largest rectangle that fits in the histogram
  return 0;
}
${JS_HARNESS}
_t(largestRectangleArea([2,1,5,6,2,3]),10,'example 1');
_t(largestRectangleArea([2,4]),4,'two bars');
_t(largestRectangleArea([1]),1,'single bar');
_t(largestRectangleArea([2,2,2]),6,'flat histogram');
_t(largestRectangleArea([5,4,1,2]),8,'descending then rise');
_t(largestRectangleArea([0,9]),9,'zero-height bar');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
