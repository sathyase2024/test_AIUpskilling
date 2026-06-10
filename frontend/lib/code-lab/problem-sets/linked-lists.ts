import { PY_HARNESS, JS_HARNESS, PY_LIST, JS_LIST, type ProblemDef } from './harness'

const PY_LIST_DOC = `# Definition for a singly-linked list node (provided by the runner):
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val, self.next = val, next
`

const JS_LIST_DOC = `// Definition for a singly-linked list node (provided by the runner):
// class ListNode { constructor(val=0, next=null) { this.val = val; this.next = next; } }
`

export const LINKED_LISTS: ProblemDef[] = [
  {
    id:'reverse-linked-list', title:'Reverse Linked List', difficulty:'Beginner', category:'Linked Lists',
    description:'Given the head of a singly linked list, reverse the list, and return the new head. The ListNode class is provided by the runner. Follow-up: a linked list can be reversed either iteratively or recursively — could you implement both?',
    examples:[
      {input:'head = [1,2,3,4,5]',output:'[5,4,3,2,1]'},
      {input:'head = [1,2]',output:'[2,1]'},
      {input:'head = []',output:'[]'},
    ],
    constraints:['The number of nodes in the list is in the range [0, 5000]','-5000 <= Node.val <= 5000'],
    hints:['Iterate with three pointers: prev, cur, next','At each step point cur.next back to prev, then advance all three','When cur becomes null, prev is the new head'],
    tags:['linked-list','recursion'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`${PY_LIST_DOC}
def reverse_list(head):
    pass
`,
      javascript:`${JS_LIST_DOC}
function reverseList(head) {

}
`,
    },
    testCode:{
      python:`${PY_LIST}${PY_HARNESS}
_t(_to_list(reverse_list(_build([1,2,3,4,5]))),[5,4,3,2,1],'five nodes')
_t(_to_list(reverse_list(_build([1,2]))),[2,1],'two nodes')
_t(_to_list(reverse_list(_build([]))),[],'empty list')
_t(_to_list(reverse_list(_build([7]))),[7],'single node')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_LIST}${JS_HARNESS}
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
      python:`${PY_LIST_DOC}
def has_cycle(head):
    pass
`,
      javascript:`${JS_LIST_DOC}
function hasCycle(head) {

}
`,
    },
    testCode:{
      python:`${PY_LIST}${PY_HARNESS}
_h=_build([3,2,0,-4]);_tail=_h
while _tail.next: _tail=_tail.next
_tail.next=_h.next
_t(has_cycle(_h),True,'cycle to index 1')
_t(has_cycle(_build([1,2])),False,'no cycle')
_t(has_cycle(_build([])),False,'empty list')
_s=_build([1]);_s.next=_s
_t(has_cycle(_s),True,'self loop')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_LIST}${JS_HARNESS}
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
      python:`import heapq

${PY_LIST_DOC}
def merge_k_lists(lists):
    pass
`,
      javascript:`${JS_LIST_DOC}
function mergeKLists(lists) {

}
`,
    },
    testCode:{
      python:`${PY_LIST}${PY_HARNESS}
_t(_to_list(merge_k_lists([_build(l) for l in [[1,4,5],[1,3,4],[2,6]]])),[1,1,2,3,4,4,5,6],'example 1')
_t(_to_list(merge_k_lists([])),[],'no lists')
_t(_to_list(merge_k_lists([_build([])])),[],'one empty list')
_t(_to_list(merge_k_lists([_build([1]),_build([0])])),[0,1],'two singletons')
_t(_to_list(merge_k_lists([_build([-2,-1]),_build([]),_build([-3])])),[-3,-2,-1],'negatives and empty')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_LIST}${JS_HARNESS}
_t(_toList(mergeKLists([[1,4,5],[1,3,4],[2,6]].map(_build))),[1,1,2,3,4,4,5,6],'example 1');
_t(_toList(mergeKLists([])),[],'no lists');
_t(_toList(mergeKLists([_build([])])),[],'one empty list');
_t(_toList(mergeKLists([_build([1]),_build([0])])),[0,1],'two singletons');
_t(_toList(mergeKLists([_build([-2,-1]),_build([]),_build([-3])])),[-3,-2,-1],'negatives and empty');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'middle-of-linked-list', title:'Middle of the Linked List', difficulty:'Beginner', category:'Linked Lists',
    description:'Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes (i.e. the list has an even number of nodes), return the second middle node. The ListNode class is provided by the runner. The returned node is the head of the remaining sublist, so a comparison of its values from that point onward identifies it uniquely.',
    examples:[
      {input:'head = [1,2,3,4,5]',output:'[3,4,5]',explanation:'The middle node is the one with value 3.'},
      {input:'head = [1,2,3,4,5,6]',output:'[4,5,6]',explanation:'Since the list has two middle nodes (3 and 4), the second one (4) is returned.'},
    ],
    constraints:['The number of nodes in the list is in the range [1, 100]','1 <= Node.val <= 100'],
    hints:['Two pointers: slow moves one step, fast moves two steps','When fast reaches the end (or null past it), slow is at the middle','For an even length, this lands slow on the second middle automatically'],
    tags:['linked-list','two-pointers'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`${PY_LIST_DOC}
def middle_node(head):
    pass
`,
      javascript:`${JS_LIST_DOC}
function middleNode(head) {

}
`,
    },
    testCode:{
      python:`${PY_LIST}${PY_HARNESS}
_t(_to_list(middle_node(_build([1,2,3,4,5]))),[3,4,5],'odd length')
_t(_to_list(middle_node(_build([1,2,3,4,5,6]))),[4,5,6],'even length picks second middle')
_t(_to_list(middle_node(_build([1]))),[1],'single node')
_t(_to_list(middle_node(_build([1,2]))),[2],'two nodes')
_t(_to_list(middle_node(_build([1,2,3]))),[2,3],'three nodes')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_LIST}${JS_HARNESS}
_t(_toList(middleNode(_build([1,2,3,4,5]))),[3,4,5],'odd length');
_t(_toList(middleNode(_build([1,2,3,4,5,6]))),[4,5,6],'even length picks second middle');
_t(_toList(middleNode(_build([1]))),[1],'single node');
_t(_toList(middleNode(_build([1,2]))),[2],'two nodes');
_t(_toList(middleNode(_build([1,2,3]))),[2,3],'three nodes');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'remove-nth-from-end', title:'Remove Nth Node From End of List', difficulty:'Intermediate', category:'Linked Lists',
    description:'Given the head of a linked list, remove the n-th node from the end of the list and return its head. The ListNode class is provided by the runner. It is guaranteed that 1 <= n <= the length of the list. Follow-up: could you do this in one pass?',
    examples:[
      {input:'head = [1,2,3,4,5], n = 2',output:'[1,2,3,5]',explanation:'The 2nd node from the end (value 4) is removed.'},
      {input:'head = [1], n = 1',output:'[]'},
      {input:'head = [1,2], n = 1',output:'[1]'},
    ],
    constraints:['The number of nodes in the list is sz','1 <= sz <= 30','0 <= Node.val <= 100','1 <= n <= sz'],
    hints:['Use a dummy node before the head so removing the first node is uniform','Advance a fast pointer n steps ahead, then move fast and slow together until fast reaches the end','slow now sits just before the target node — unlink it with slow.next = slow.next.next'],
    tags:['linked-list','two-pointers'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`${PY_LIST_DOC}
def remove_nth_from_end(head, n):
    pass
`,
      javascript:`${JS_LIST_DOC}
function removeNthFromEnd(head, n) {

}
`,
    },
    testCode:{
      python:`${PY_LIST}${PY_HARNESS}
_t(_to_list(remove_nth_from_end(_build([1,2,3,4,5]),2)),[1,2,3,5],'example 1')
_t(_to_list(remove_nth_from_end(_build([1]),1)),[],'single node removed')
_t(_to_list(remove_nth_from_end(_build([1,2]),1)),[1],'remove last of two')
_t(_to_list(remove_nth_from_end(_build([1,2]),2)),[2],'remove head of two')
_t(_to_list(remove_nth_from_end(_build([1,2,3,4,5]),5)),[2,3,4,5],'remove head')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_LIST}${JS_HARNESS}
_t(_toList(removeNthFromEnd(_build([1,2,3,4,5]),2)),[1,2,3,5],'example 1');
_t(_toList(removeNthFromEnd(_build([1]),1)),[],'single node removed');
_t(_toList(removeNthFromEnd(_build([1,2]),1)),[1],'remove last of two');
_t(_toList(removeNthFromEnd(_build([1,2]),2)),[2],'remove head of two');
_t(_toList(removeNthFromEnd(_build([1,2,3,4,5]),5)),[2,3,4,5],'remove head');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'add-two-numbers', title:'Add Two Numbers', difficulty:'Intermediate', category:'Linked Lists',
    description:'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list, also with digits stored in reverse order. The ListNode class is provided by the runner. You may assume the two numbers do not contain any leading zeros, except the number 0 itself.',
    examples:[
      {input:'l1 = [2,4,3], l2 = [5,6,4]',output:'[7,0,8]',explanation:'342 + 465 = 807, stored in reverse as [7,0,8].'},
      {input:'l1 = [0], l2 = [0]',output:'[0]'},
      {input:'l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]',output:'[8,9,9,9,0,0,0,1]',explanation:'9999999 + 9999 = 10009998.'},
    ],
    constraints:['The number of nodes in each list is in the range [1, 100]','0 <= Node.val <= 9','It is guaranteed that the list represents a number that does not have leading zeros'],
    hints:['Walk both lists together, summing digits plus a carry from the previous position','Each output digit is sum % 10 and the next carry is sum // 10','Continue while either list has nodes left or a final carry of 1 remains'],
    tags:['linked-list','math','recursion'], timeComplexity:'O(max(m, n))', spaceComplexity:'O(max(m, n))',
    starterCode:{
      python:`${PY_LIST_DOC}
def add_two_numbers(l1, l2):
    pass
`,
      javascript:`${JS_LIST_DOC}
function addTwoNumbers(l1, l2) {

}
`,
    },
    testCode:{
      python:`${PY_LIST}${PY_HARNESS}
_t(_to_list(add_two_numbers(_build([2,4,3]),_build([5,6,4]))),[7,0,8],'example 1')
_t(_to_list(add_two_numbers(_build([0]),_build([0]))),[0],'zero plus zero')
_t(_to_list(add_two_numbers(_build([9,9,9,9,9,9,9]),_build([9,9,9,9]))),[8,9,9,9,0,0,0,1],'carry out new digit')
_t(_to_list(add_two_numbers(_build([5]),_build([5]))),[0,1],'single digit carry')
_t(_to_list(add_two_numbers(_build([1,8]),_build([0]))),[1,8],'different lengths')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_LIST}${JS_HARNESS}
_t(_toList(addTwoNumbers(_build([2,4,3]),_build([5,6,4]))),[7,0,8],'example 1');
_t(_toList(addTwoNumbers(_build([0]),_build([0]))),[0],'zero plus zero');
_t(_toList(addTwoNumbers(_build([9,9,9,9,9,9,9]),_build([9,9,9,9]))),[8,9,9,9,0,0,0,1],'carry out new digit');
_t(_toList(addTwoNumbers(_build([5]),_build([5]))),[0,1],'single digit carry');
_t(_toList(addTwoNumbers(_build([1,8]),_build([0]))),[1,8],'different lengths');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
