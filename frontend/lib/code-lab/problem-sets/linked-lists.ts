import { PY_HARNESS, JS_HARNESS, PY_LIST, JS_LIST, type ProblemDef } from './harness'

export const LINKED_LISTS: ProblemDef[] = [
  {
    id:'reverse-linked-list', title:'Reverse Linked List', difficulty:'Beginner', category:'Linked Lists',
    description:'Given the head of a singly linked list, reverse the list, and return the new head. The ListNode class is provided in the starter code. Follow-up: a linked list can be reversed either iteratively or recursively — could you implement both?',
    examples:[
      {input:'head = [1,2,3,4,5]',output:'[5,4,3,2,1]'},
      {input:'head = [1,2]',output:'[2,1]'},
      {input:'head = []',output:'[]'},
    ],
    constraints:['The number of nodes in the list is in the range [0, 5000]','-5000 <= Node.val <= 5000'],
    hints:['Iterate with three pointers: prev, cur, next','At each step point cur.next back to prev, then advance all three','When cur becomes null, prev is the new head'],
    tags:['linked-list','recursion'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`${PY_LIST}
def reverse_list(head):
    # TODO: Reverse the list and return the new head
    pass
${PY_HARNESS}
_t(_to_list(reverse_list(_build([1,2,3,4,5]))),[5,4,3,2,1],'five nodes')
_t(_to_list(reverse_list(_build([1,2]))),[2,1],'two nodes')
_t(_to_list(reverse_list(_build([]))),[],'empty list')
_t(_to_list(reverse_list(_build([7]))),[7],'single node')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_LIST}
function reverseList(head) {
  // TODO: Reverse the list and return the new head
  return null;
}
${JS_HARNESS}
_t(_toList(reverseList(_build([1,2,3,4,5]))),[5,4,3,2,1],'five nodes');
_t(_toList(reverseList(_build([1,2]))),[2,1],'two nodes');
_t(_toList(reverseList(_build([]))),[],'empty list');
_t(_toList(reverseList(_build([7]))),[7],'single node');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'linked-list-cycle', title:'Linked List Cycle', difficulty:'Beginner', category:'Linked Lists',
    description:'Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Return true if there is a cycle in the linked list, otherwise return false. Follow-up: can you solve it using O(1) memory (Floyd\'s tortoise-and-hare)?',
    examples:[
      {input:'head = [3,2,0,-4], tail connects to node index 1',output:'true',explanation:'The tail\'s next pointer loops back to the second node.'},
      {input:'head = [1,2], no cycle',output:'false'},
      {input:'head = [1], no cycle',output:'false'},
    ],
    constraints:['The number of nodes in the list is in the range [0, 10⁴]','-10⁵ <= Node.val <= 10⁵','Follow-up: O(1) space'],
    hints:['A visited-set works but costs O(n) space','Floyd\'s algorithm: a slow pointer moves 1 step, a fast pointer moves 2','If they ever meet, there is a cycle; if fast reaches null, there is none'],
    tags:['linked-list','two-pointers','floyd-cycle'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`${PY_LIST}
def has_cycle(head):
    # TODO: Return True if the list contains a cycle
    pass
${PY_HARNESS}
_h=_build([3,2,0,-4]);_tail=_h
while _tail.next: _tail=_tail.next
_tail.next=_h.next
_t(has_cycle(_h),True,'cycle to index 1')
_t(has_cycle(_build([1,2])),False,'no cycle')
_t(has_cycle(_build([])),False,'empty list')
_s=_build([1]);_s.next=_s
_t(has_cycle(_s),True,'self loop')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_LIST}
function hasCycle(head) {
  // TODO: Return true if the list contains a cycle
  return false;
}
${JS_HARNESS}
const _h=_build([3,2,0,-4]);let _tail=_h;
while(_tail.next)_tail=_tail.next;
_tail.next=_h.next;
_t(hasCycle(_h),true,'cycle to index 1');
_t(hasCycle(_build([1,2])),false,'no cycle');
_t(hasCycle(_build([])),false,'empty list');
const _s=_build([1]);_s.next=_s;
_t(hasCycle(_s),true,'self loop');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'merge-k-sorted-lists', title:'Merge k Sorted Lists', difficulty:'Advanced', category:'Linked Lists',
    description:'You are given an array of k linked lists, each sorted in ascending order. Merge all the linked lists into one sorted linked list and return its head. Merging lists one by one costs O(k·N); using a min-heap of list heads or divide-and-conquer pairwise merging achieves O(N log k), where N is the total number of nodes.',
    examples:[
      {input:'lists = [[1,4,5],[1,3,4],[2,6]]',output:'[1,1,2,3,4,4,5,6]',explanation:'Merging the three sorted lists yields one fully sorted list.'},
      {input:'lists = []',output:'[]'},
      {input:'lists = [[]]',output:'[]'},
    ],
    constraints:['k == lists.length','0 <= k <= 10⁴','0 <= lists[i].length <= 500','-10⁴ <= lists[i][j] <= 10⁴','Each lists[i] is sorted ascending'],
    hints:['A min-heap keyed on node values always pops the global smallest head','After popping a node, push its successor if it exists','Alternatively merge lists pairwise like merge sort: k lists take log k rounds'],
    tags:['linked-list','heap','divide-and-conquer','merge-sort'], timeComplexity:'O(N log k)', spaceComplexity:'O(k)',
    starterCode:{
      python:`${PY_LIST}
def merge_k_lists(lists):
    # TODO: Merge k sorted linked lists into one sorted list and return its head
    pass
${PY_HARNESS}
_t(_to_list(merge_k_lists([_build(l) for l in [[1,4,5],[1,3,4],[2,6]]])),[1,1,2,3,4,4,5,6],'example 1')
_t(_to_list(merge_k_lists([])),[],'no lists')
_t(_to_list(merge_k_lists([_build([])])),[],'one empty list')
_t(_to_list(merge_k_lists([_build([1]),_build([0])])),[0,1],'two singletons')
_t(_to_list(merge_k_lists([_build([-2,-1]),_build([]),_build([-3])])),[-3,-2,-1],'negatives and empty')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_LIST}
function mergeKLists(lists) {
  // TODO: Merge k sorted linked lists into one sorted list and return its head
  return null;
}
${JS_HARNESS}
_t(_toList(mergeKLists([[1,4,5],[1,3,4],[2,6]].map(_build))),[1,1,2,3,4,4,5,6],'example 1');
_t(_toList(mergeKLists([])),[],'no lists');
_t(_toList(mergeKLists([_build([])])),[],'one empty list');
_t(_toList(mergeKLists([_build([1]),_build([0])])),[0,1],'two singletons');
_t(_toList(mergeKLists([_build([-2,-1]),_build([]),_build([-3])])),[-3,-2,-1],'negatives and empty');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
