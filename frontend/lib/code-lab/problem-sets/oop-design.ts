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
        # TODO: Initialize your data structure
        pass

    def push(self, val):
        # TODO
        pass

    def pop(self):
        # TODO
        pass

    def top(self):
        # TODO: Return the top element
        pass

    def get_min(self):
        # TODO: Return the minimum element in O(1)
        pass
${PY_HARNESS}
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
      javascript:`class MinStack {
  constructor() {
    // TODO: Initialize your data structure
  }
  push(val) {
    // TODO
  }
  pop() {
    // TODO
  }
  top() {
    // TODO: Return the top element
  }
  getMin() {
    // TODO: Return the minimum element in O(1)
  }
}
${JS_HARNESS}
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
      python:`class LRUCache:
    def __init__(self, capacity):
        # TODO: Initialize cache with given capacity
        pass

    def get(self, key):
        # TODO: Return value (refreshing recency) or -1
        pass

    def put(self, key, value):
        # TODO: Insert/update key, evicting the least recently used if over capacity
        pass
${PY_HARNESS}
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
      javascript:`class LRUCache {
  constructor(capacity) {
    // TODO: Initialize cache with given capacity
  }
  get(key) {
    // TODO: Return value (refreshing recency) or -1
    return -1;
  }
  put(key, value) {
    // TODO: Insert/update key, evicting the least recently used if over capacity
  }
}
${JS_HARNESS}
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
]
