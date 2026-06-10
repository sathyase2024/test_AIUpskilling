import { PY_HARNESS, JS_HARNESS, type ProblemDef } from './harness'

export const OOP_DESIGN: ProblemDef[] = [
  {
    id:'min-stack', title:'Min Stack', difficulty:'Beginner', category:'OOP & Design',
    description:'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Implement the MinStack class with: push(val) pushes the element val onto the stack; pop() removes the element on the top; top() gets the top element; get_min() retrieves the minimum element. You must implement a solution with O(1) time complexity for EACH function — recomputing the minimum on demand is O(n) and does not count.',
    examples:[
      {input:'push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()',output:'[-3, 0, -2]',explanation:'getMin returns -3; after popping -3, top is 0 and the minimum becomes -2.'},
    ],
    constraints:['-2³¹ <= val <= 2³¹ - 1','pop, top and get_min are always called on non-empty stacks','At most 3·10⁴ calls total','Every operation must be O(1)'],
    hints:['Keep a second stack holding the minimum alongside each element','On push, store min(val, current min) on the min-stack; on pop, pop both','get_min is then just the top of the min-stack'],
    tags:['stack','design'], timeComplexity:'O(1) per op', spaceComplexity:'O(n)',
    starterCode:{
      python:`class MinStack:
    def __init__(self):
        pass

    def push(self, val):
        pass

    def pop(self):
        pass

    def top(self):
        pass

    def get_min(self):
        pass
`,
      javascript:`class MinStack {
  constructor() {

  }

  push(val) {

  }

  pop() {

  }

  top() {

  }

  getMin() {

  }
}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_s=MinStack()
_s.push(-2);_s.push(0);_s.push(-3)
_t(_s.get_min(),-3,'min after pushes')
_s.pop()
_t(_s.top(),0,'top after pop')
_t(_s.get_min(),-2,'min after pop')
_s2=MinStack()
_s2.push(5);_s2.push(5);_s2.pop()
_t(_s2.get_min(),5,'duplicate minimums')
_s2.push(3);_s2.push(7)
_t(_s2.get_min(),3,'min not at top')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
const _s=new MinStack();
_s.push(-2);_s.push(0);_s.push(-3);
_t(_s.getMin(),-3,'min after pushes');
_s.pop();
_t(_s.top(),0,'top after pop');
_t(_s.getMin(),-2,'min after pop');
const _s2=new MinStack();
_s2.push(5);_s2.push(5);_s2.pop();
_t(_s2.getMin(),5,'duplicate minimums');
_s2.push(3);_s2.push(7);
_t(_s2.getMin(),3,'min not at top');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'lru-cache', title:'LRU Cache', difficulty:'Intermediate', category:'OOP & Design',
    description:'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class: LRUCache(capacity) initializes the cache with positive size capacity; get(key) returns the value of the key if it exists, otherwise -1; put(key, value) updates the value if the key exists, otherwise adds the pair — and if the number of keys exceeds capacity, evicts the least recently used key. Both get and put count as "use". The functions get and put must each run in O(1) average time complexity.',
    examples:[
      {input:'LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2); put(4,4); get(1); get(3); get(4)',output:'[1, -1, -1, 3, 4]',explanation:'put(3,3) evicts key 2 (least recently used since get(1) refreshed key 1); put(4,4) then evicts key 1.'},
    ],
    constraints:['1 <= capacity <= 3000','0 <= key <= 10⁴','0 <= value <= 10⁵','At most 2·10⁵ calls to get and put','get and put must be O(1) average'],
    hints:['A hash map gives O(1) lookup; a doubly linked list gives O(1) reordering and eviction','Map keys to list nodes; move a node to the front on every access','In Python, collections.OrderedDict (move_to_end / popitem) implements exactly this; in JS the built-in Map preserves insertion order'],
    tags:['hash-map','linked-list','design'], timeComplexity:'O(1) per op', spaceComplexity:'O(capacity)',
    starterCode:{
      python:`from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        pass

    def get(self, key):
        pass

    def put(self, key, value):
        pass
`,
      javascript:`class LRUCache {
  constructor(capacity) {

  }

  get(key) {

  }

  put(key, value) {

  }
}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_c=LRUCache(2)
_c.put(1,1);_c.put(2,2)
_t(_c.get(1),1,'get refreshes key 1')
_c.put(3,3)
_t(_c.get(2),-1,'key 2 evicted')
_c.put(4,4)
_t(_c.get(1),-1,'key 1 evicted')
_t(_c.get(3),3,'key 3 alive')
_t(_c.get(4),4,'key 4 alive')
_c2=LRUCache(1)
_c2.put(2,1)
_t(_c2.get(2),1,'capacity one')
_c2.put(2,99)
_t(_c2.get(2),99,'update in place')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
const _c=new LRUCache(2);
_c.put(1,1);_c.put(2,2);
_t(_c.get(1),1,'get refreshes key 1');
_c.put(3,3);
_t(_c.get(2),-1,'key 2 evicted');
_c.put(4,4);
_t(_c.get(1),-1,'key 1 evicted');
_t(_c.get(3),3,'key 3 alive');
_t(_c.get(4),4,'key 4 alive');
const _c2=new LRUCache(1);
_c2.put(2,1);
_t(_c2.get(2),1,'capacity one');
_c2.put(2,99);
_t(_c2.get(2),99,'update in place');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'implement-trie', title:'Implement Trie (Prefix Tree)', difficulty:'Intermediate', category:'OOP & Design',
    description:'A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a set of strings. Implement the Trie class: Trie() initializes the trie object; insert(word) inserts the string word into the trie; search(word) returns true if the string word is in the trie (i.e. was inserted before), and false otherwise; starts_with(prefix) (startsWith in JavaScript) returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise. Each operation runs in O(L) time where L is the length of the word or prefix.',
    examples:[
      {input:'insert("apple"); search("apple"); search("app"); startsWith("app"); insert("app"); search("app")',output:'[true, false, true, true]',explanation:'search("apple") → true; search("app") → false (only "apple" inserted so far); startsWith("app") → true; after insert("app"), search("app") → true.'},
    ],
    constraints:['1 <= word.length, prefix.length <= 2000','word and prefix consist only of lowercase English letters','At most 3·10⁴ calls in total to insert, search and starts_with'],
    hints:['Each node holds a map from a character to a child node plus a flag marking the end of a word','insert walks/creates nodes for each character, then sets the end-of-word flag on the last node','search must also verify the end-of-word flag; starts_with only needs the path to exist'],
    tags:['trie','tree','design','hash-map'], timeComplexity:'O(L) per op', spaceComplexity:'O(total characters)',
    starterCode:{
      python:`class Trie:
    def __init__(self):
        pass

    def insert(self, word):
        pass

    def search(self, word):
        pass

    def starts_with(self, prefix):
        pass
`,
      javascript:`class Trie {
  constructor() {

  }

  insert(word) {

  }

  search(word) {

  }

  startsWith(prefix) {

  }
}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_tr=Trie()
_tr.insert('apple')
_t(_tr.search('apple'),True,'inserted word found')
_t(_tr.search('app'),False,'prefix is not a word yet')
_t(_tr.starts_with('app'),True,'prefix exists')
_tr.insert('app')
_t(_tr.search('app'),True,'now a full word')
_t(_tr.starts_with('appl'),True,'longer prefix exists')
_t(_tr.search('banana'),False,'never inserted')
_t(_tr.starts_with('b'),False,'no such prefix')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
const _tr=new Trie();
_tr.insert('apple');
_t(_tr.search('apple'),true,'inserted word found');
_t(_tr.search('app'),false,'prefix is not a word yet');
_t(_tr.startsWith('app'),true,'prefix exists');
_tr.insert('app');
_t(_tr.search('app'),true,'now a full word');
_t(_tr.startsWith('appl'),true,'longer prefix exists');
_t(_tr.search('banana'),false,'never inserted');
_t(_tr.startsWith('b'),false,'no such prefix');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'queue-using-stacks', title:'Implement Queue using Stacks', difficulty:'Beginner', category:'OOP & Design',
    description:'Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue: push, peek, pop, and empty. Implement the MyQueue class: push(x) pushes element x to the back of the queue; pop() removes the element from the front of the queue and returns it; peek() returns the element at the front of the queue; empty() returns true if the queue is empty, false otherwise. You must use only standard stack operations (push to top, peek/pop from top, size, is-empty). Follow-up: can you implement the queue such that each operation is amortized O(1) time complexity? Even though pop or peek may occasionally take O(n), the average over a sequence of operations is O(1) by moving elements between an input and output stack only when the output stack is empty.',
    examples:[
      {input:'push(1); push(2); peek(); pop(); empty()',output:'[1, 1, false]',explanation:'peek() → 1 (front); pop() → 1 (removes front); empty() → false (2 still queued).'},
    ],
    constraints:['1 <= x <= 9','At most 100 calls will be made to push, pop, peek, and empty','All the calls to pop and peek are valid (the queue is non-empty)'],
    hints:['Use one stack for incoming pushes and another for outgoing pops','When you need the front and the output stack is empty, pour the entire input stack into the output stack to reverse the order','Each element moves between stacks at most once, giving amortized O(1) per operation'],
    tags:['stack','queue','design'], timeComplexity:'O(1) amortized per op', spaceComplexity:'O(n)',
    starterCode:{
      python:`class MyQueue:
    def __init__(self):
        pass

    def push(self, x):
        pass

    def pop(self):
        pass

    def peek(self):
        pass

    def empty(self):
        pass
`,
      javascript:`class MyQueue {
  constructor() {

  }

  push(x) {

  }

  pop() {

  }

  peek() {

  }

  empty() {

  }
}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_q=MyQueue()
_q.push(1);_q.push(2)
_t(_q.peek(),1,'front is 1')
_t(_q.pop(),1,'pop returns front')
_t(_q.empty(),False,'still has 2')
_t(_q.pop(),2,'pop returns 2')
_t(_q.empty(),True,'now empty')
_q.push(3);_q.push(4);_q.push(5)
_t(_q.pop(),3,'fifo order maintained')
_t(_q.peek(),4,'next front is 4')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
const _q=new MyQueue();
_q.push(1);_q.push(2);
_t(_q.peek(),1,'front is 1');
_t(_q.pop(),1,'pop returns front');
_t(_q.empty(),false,'still has 2');
_t(_q.pop(),2,'pop returns 2');
_t(_q.empty(),true,'now empty');
_q.push(3);_q.push(4);_q.push(5);
_t(_q.pop(),3,'fifo order maintained');
_t(_q.peek(),4,'next front is 4');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
