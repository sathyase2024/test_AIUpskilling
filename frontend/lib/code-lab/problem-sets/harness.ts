import type { CodeLabProblem } from '../types'

// A problem definition without its display number; numbers are assigned
// sequentially when the category sets are assembled in problems.ts.
export type ProblemDef = Omit<CodeLabProblem, 'num'>

export const PY_HARNESS = `
_p=_n=0
def _t(g,e,d=''):
    global _p,_n;_n+=1
    if g==e:_p+=1;print(f'✓ Test {_n}'+(f' - {d}' if d else ''))
    else:print(f'✗ Test {_n} - Expected {repr(e)}, got {repr(g)}'+(f' [{d}]' if d else ''))
`

export const JS_HARNESS = `
let _p=0,_n=0;const _t=(g,e,d='')=>{_n++;const ok=JSON.stringify(g)===JSON.stringify(e);ok?(_p++,console.log(\`✓ Test \${_n}\`+(d?\` - \${d}\`:''))):console.log(\`✗ Test \${_n} - Expected \${JSON.stringify(e)}, got \${JSON.stringify(g)}\`+(d?\` [\${d}]\`:''));};
`

// Singly-linked list scaffolding shared by linked-list problems.
export const PY_LIST = `class ListNode:
    def __init__(self, val=0, next=None):
        self.val, self.next = val, next

def _build(arr):
    head = cur = ListNode()
    for v in arr: cur.next = ListNode(v); cur = cur.next
    return head.next

def _to_list(node):
    out = []
    while node: out.append(node.val); node = node.next
    return out
`

export const JS_LIST = `class ListNode { constructor(val=0, next=null) { this.val = val; this.next = next; } }
const _build = a => { const h = new ListNode(); let c = h; for (const v of a) { c.next = new ListNode(v); c = c.next; } return h.next; };
const _toList = n => { const o = []; while (n) { o.push(n.val); n = n.next; } return o; };
`

// Binary tree scaffolding: _tree builds from a LeetCode-style level-order
// array where null marks a missing child.
export const PY_TREE = `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def _tree(vals):
    if not vals or vals[0] is None: return None
    root = TreeNode(vals[0]); q = [root]; i = 1
    while q and i < len(vals):
        node = q.pop(0)
        if i < len(vals) and vals[i] is not None:
            node.left = TreeNode(vals[i]); q.append(node.left)
        i += 1
        if i < len(vals) and vals[i] is not None:
            node.right = TreeNode(vals[i]); q.append(node.right)
        i += 1
    return root
`

export const JS_TREE = `class TreeNode { constructor(val=0, left=null, right=null) { this.val = val; this.left = left; this.right = right; } }
function _tree(vals) {
  if (!vals.length || vals[0] === null) return null;
  const root = new TreeNode(vals[0]), q = [root]; let i = 1;
  while (q.length && i < vals.length) {
    const n = q.shift();
    if (i < vals.length && vals[i] !== null) { n.left = new TreeNode(vals[i]); q.push(n.left); }
    i++;
    if (i < vals.length && vals[i] !== null) { n.right = new TreeNode(vals[i]); q.push(n.right); }
    i++;
  }
  return root;
}
`
