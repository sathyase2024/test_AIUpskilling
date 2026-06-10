import { PY_HARNESS, JS_HARNESS, PY_TREE, JS_TREE, type ProblemDef } from './harness'

const PY_TREE_DOC = `# Definition for a binary tree node (provided by the runner):
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val, self.left, self.right = val, left, right
`

const JS_TREE_DOC = `// Definition for a binary tree node (provided by the runner):
// class TreeNode { constructor(val=0, left=null, right=null) { this.val = val; this.left = left; this.right = right; } }
`

export const TREES: ProblemDef[] = [
  {
    id:'max-depth-binary-tree', title:'Maximum Depth of Binary Tree', difficulty:'Beginner', category:'Trees',
    description:'Given the root of a binary tree, return its maximum depth. A binary tree\'s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node. The TreeNode class is provided by the runner; test inputs are built from level-order arrays where null marks a missing child.',
    examples:[
      {input:'root = [3,9,20,null,null,15,7]',output:'3',explanation:'The longest root-to-leaf path is 3 → 20 → 15 (or 7), which contains 3 nodes.'},
      {input:'root = [1,null,2]',output:'2'},
    ],
    constraints:['The number of nodes in the tree is in the range [0, 10⁴]','-100 <= Node.val <= 100'],
    hints:['Recursive definition: depth(node) = 1 + max(depth(left), depth(right))','The empty tree has depth 0 — that is the base case','An iterative BFS that counts levels also works'],
    tags:['tree','dfs','bfs','recursion'], timeComplexity:'O(n)', spaceComplexity:'O(h)',
    starterCode:{
      python:`${PY_TREE_DOC}
def max_depth(root):
    pass
`,
      javascript:`${JS_TREE_DOC}
function maxDepth(root) {

}
`,
    },
    testCode:{
      python:`${PY_TREE}${PY_HARNESS}
_t(max_depth(_tree([3,9,20,None,None,15,7])),3,'example 1')
_t(max_depth(_tree([1,None,2])),2,'right skewed')
_t(max_depth(_tree([])),0,'empty tree')
_t(max_depth(_tree([0])),1,'single node')
_t(max_depth(_tree([1,2,3,4,None,None,None,5])),4,'left-heavy chain')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_TREE}${JS_HARNESS}
_t(maxDepth(_tree([3,9,20,null,null,15,7])),3,'example 1');
_t(maxDepth(_tree([1,null,2])),2,'right skewed');
_t(maxDepth(_tree([])),0,'empty tree');
_t(maxDepth(_tree([0])),1,'single node');
_t(maxDepth(_tree([1,2,3,4,null,null,null,5])),4,'left-heavy chain');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'validate-bst', title:'Validate Binary Search Tree', difficulty:'Intermediate', category:'Trees',
    description:'Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows: the left subtree of a node contains only nodes with keys strictly less than the node\'s key; the right subtree contains only nodes with keys strictly greater than the node\'s key; and both subtrees must themselves be binary search trees. Note: comparing only parent and child is not enough — every node in a subtree must respect the ancestor\'s bound.',
    examples:[
      {input:'root = [2,1,3]',output:'true'},
      {input:'root = [5,1,4,null,null,3,6]',output:'false',explanation:'The root is 5 but the right child\'s subtree contains 3 and 4, which are less than 5.'},
    ],
    constraints:['The number of nodes is in the range [1, 10⁴]','-2³¹ <= Node.val <= 2³¹ - 1','Equal values are NOT allowed'],
    hints:['Pass down an allowed (low, high) range for each node','Left child narrows the high bound; right child narrows the low bound','Alternatively, an in-order traversal of a valid BST must be strictly increasing'],
    tags:['tree','bst','dfs','recursion'], timeComplexity:'O(n)', spaceComplexity:'O(h)',
    starterCode:{
      python:`${PY_TREE_DOC}
def is_valid_bst(root):
    pass
`,
      javascript:`${JS_TREE_DOC}
function isValidBST(root) {

}
`,
    },
    testCode:{
      python:`${PY_TREE}${PY_HARNESS}
_t(is_valid_bst(_tree([2,1,3])),True,'example 1')
_t(is_valid_bst(_tree([5,1,4,None,None,3,6])),False,'example 2')
_t(is_valid_bst(_tree([1])),True,'single node')
_t(is_valid_bst(_tree([5,4,6,None,None,3,7])),False,'deep violation')
_t(is_valid_bst(_tree([2,2,2])),False,'duplicates invalid')
_t(is_valid_bst(_tree([-10,-20,0])),True,'negative values')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_TREE}${JS_HARNESS}
_t(isValidBST(_tree([2,1,3])),true,'example 1');
_t(isValidBST(_tree([5,1,4,null,null,3,6])),false,'example 2');
_t(isValidBST(_tree([1])),true,'single node');
_t(isValidBST(_tree([5,4,6,null,null,3,7])),false,'deep violation');
_t(isValidBST(_tree([2,2,2])),false,'duplicates invalid');
_t(isValidBST(_tree([-10,-20,0])),true,'negative values');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'level-order-traversal', title:'Binary Tree Level Order Traversal', difficulty:'Intermediate', category:'Trees',
    description:'Given the root of a binary tree, return the level order traversal of its nodes\' values — i.e., from left to right, level by level, as a list of lists where each inner list holds one level.',
    examples:[
      {input:'root = [3,9,20,null,null,15,7]',output:'[[3],[9,20],[15,7]]'},
      {input:'root = [1]',output:'[[1]]'},
      {input:'root = []',output:'[]'},
    ],
    constraints:['The number of nodes is in the range [0, 2000]','-1000 <= Node.val <= 1000'],
    hints:['Use a queue (BFS); seed it with the root','Snapshot the queue length at the start of each level — that many nodes belong to the current level','Collect those values, enqueue their children, repeat until the queue empties'],
    tags:['tree','bfs','queue'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`from collections import deque

${PY_TREE_DOC}
def level_order(root):
    pass
`,
      javascript:`${JS_TREE_DOC}
function levelOrder(root) {

}
`,
    },
    testCode:{
      python:`${PY_TREE}${PY_HARNESS}
_t(level_order(_tree([3,9,20,None,None,15,7])),[[3],[9,20],[15,7]],'example 1')
_t(level_order(_tree([1])),[[1]],'single node')
_t(level_order(_tree([])),[],'empty tree')
_t(level_order(_tree([1,2,None,3])),[[1],[2],[3]],'left chain')
_t(level_order(_tree([1,2,3,4,5,6,7])),[[1],[2,3],[4,5,6,7]],'perfect tree')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_TREE}${JS_HARNESS}
_t(levelOrder(_tree([3,9,20,null,null,15,7])),[[3],[9,20],[15,7]],'example 1');
_t(levelOrder(_tree([1])),[[1]],'single node');
_t(levelOrder(_tree([])),[],'empty tree');
_t(levelOrder(_tree([1,2,null,3])),[[1],[2],[3]],'left chain');
_t(levelOrder(_tree([1,2,3,4,5,6,7])),[[1],[2,3],[4,5,6,7]],'perfect tree');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'binary-tree-max-path-sum', title:'Binary Tree Maximum Path Sum', difficulty:'Expert', category:'Trees',
    description:'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge connecting them. A node can only appear in the sequence at most once, and the path does not need to pass through the root. The path sum is the sum of the node values in the path. Given the root of a binary tree, return the maximum path sum of any non-empty path. Values may be negative, so a subtree branch is only worth taking when its contribution is positive.',
    examples:[
      {input:'root = [1,2,3]',output:'6',explanation:'The optimal path is 2 → 1 → 3 with a sum of 2 + 1 + 3 = 6.'},
      {input:'root = [-10,9,20,null,null,15,7]',output:'42',explanation:'The optimal path is 15 → 20 → 7 with a sum of 42; it does not pass through the root.'},
    ],
    constraints:['The number of nodes is in the range [1, 3·10⁴]','-1000 <= Node.val <= 1000'],
    hints:['For each node compute the best downward gain: node.val + max(leftGain, rightGain, with negatives clamped to 0)','The best path THROUGH a node is node.val + leftGain + rightGain — update a global maximum with it','Return only the single-branch gain upward; a parent path cannot use both children'],
    tags:['tree','dfs','recursion','dynamic-programming'], timeComplexity:'O(n)', spaceComplexity:'O(h)',
    starterCode:{
      python:`${PY_TREE_DOC}
def max_path_sum(root):
    pass
`,
      javascript:`${JS_TREE_DOC}
function maxPathSum(root) {

}
`,
    },
    testCode:{
      python:`${PY_TREE}${PY_HARNESS}
_t(max_path_sum(_tree([1,2,3])),6,'example 1')
_t(max_path_sum(_tree([-10,9,20,None,None,15,7])),42,'example 2')
_t(max_path_sum(_tree([-3])),-3,'single negative node')
_t(max_path_sum(_tree([2,-1])),2,'skip negative child')
_t(max_path_sum(_tree([-2,-1])),-1,'all negative picks max node')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_TREE}${JS_HARNESS}
_t(maxPathSum(_tree([1,2,3])),6,'example 1');
_t(maxPathSum(_tree([-10,9,20,null,null,15,7])),42,'example 2');
_t(maxPathSum(_tree([-3])),-3,'single negative node');
_t(maxPathSum(_tree([2,-1])),2,'skip negative child');
_t(maxPathSum(_tree([-2,-1])),-1,'all negative picks max node');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'invert-binary-tree', title:'Invert Binary Tree', difficulty:'Beginner', category:'Trees',
    description:'Given the root of a binary tree, invert the tree (swap the left and right child of every node), and return its root. The TreeNode class is provided by the runner; test inputs are built from level-order arrays where null marks a missing child, and results are compared as a level-order serialization with trailing nulls trimmed.',
    examples:[
      {input:'root = [4,2,7,1,3,6,9]',output:'[4,7,2,9,6,3,1]'},
      {input:'root = [2,1,3]',output:'[2,3,1]'},
      {input:'root = []',output:'[]'},
    ],
    constraints:['The number of nodes in the tree is in the range [0, 100]','-100 <= Node.val <= 100'],
    hints:['Swap the left and right children of the current node','Recurse into both subtrees (the order does not matter)','The empty tree is the base case — return null'],
    tags:['tree','dfs','bfs','recursion'], timeComplexity:'O(n)', spaceComplexity:'O(h)',
    starterCode:{
      python:`${PY_TREE_DOC}
def invert_tree(root):
    pass
`,
      javascript:`${JS_TREE_DOC}
function invertTree(root) {

}
`,
    },
    testCode:{
      python:`${PY_TREE}${PY_HARNESS}
def _dump(root):
    out=[];q=[root]
    while q:
        node=q.pop(0)
        if node is None: out.append(None); continue
        out.append(node.val); q.append(node.left); q.append(node.right)
    while out and out[-1] is None: out.pop()
    return out
_t(_dump(invert_tree(_tree([4,2,7,1,3,6,9]))),[4,7,2,9,6,3,1],'example 1')
_t(_dump(invert_tree(_tree([2,1,3]))),[2,3,1],'example 2')
_t(_dump(invert_tree(_tree([]))),[],'empty tree')
_t(_dump(invert_tree(_tree([1]))),[1],'single node')
_t(_dump(invert_tree(_tree([1,2,None,3]))),[1,None,2,None,3],'left chain becomes right')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_TREE}${JS_HARNESS}
function _dump(root){
  const out=[],q=[root];
  while(q.length){
    const node=q.shift();
    if(node===null){out.push(null);continue;}
    out.push(node.val);q.push(node.left);q.push(node.right);
  }
  while(out.length&&out[out.length-1]===null)out.pop();
  return out;
}
_t(_dump(invertTree(_tree([4,2,7,1,3,6,9]))),[4,7,2,9,6,3,1],'example 1');
_t(_dump(invertTree(_tree([2,1,3]))),[2,3,1],'example 2');
_t(_dump(invertTree(_tree([]))),[],'empty tree');
_t(_dump(invertTree(_tree([1]))),[1],'single node');
_t(_dump(invertTree(_tree([1,2,null,3]))),[1,null,2,null,3],'left chain becomes right');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'diameter-of-binary-tree', title:'Diameter of Binary Tree', difficulty:'Intermediate', category:'Trees',
    description:'Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in the tree. This path may or may not pass through the root. The length of a path between two nodes is represented by the number of edges between them (not the number of nodes).',
    examples:[
      {input:'root = [1,2,3,4,5]',output:'3',explanation:'The longest path is [4,2,1,3] or [5,2,1,3], which has 3 edges.'},
      {input:'root = [1,2]',output:'1'},
    ],
    constraints:['The number of nodes in the tree is in the range [1, 10⁴]','-100 <= Node.val <= 100'],
    hints:['For each node, the longest path through it equals leftHeight + rightHeight (in edges)','Compute heights with a post-order DFS and update a global maximum diameter as you go','Height of an empty subtree is 0; a leaf has height 1 in node terms, so its child heights are 0'],
    tags:['tree','dfs','recursion'], timeComplexity:'O(n)', spaceComplexity:'O(h)',
    starterCode:{
      python:`${PY_TREE_DOC}
def diameter_of_binary_tree(root):
    pass
`,
      javascript:`${JS_TREE_DOC}
function diameterOfBinaryTree(root) {

}
`,
    },
    testCode:{
      python:`${PY_TREE}${PY_HARNESS}
_t(diameter_of_binary_tree(_tree([1,2,3,4,5])),3,'example 1')
_t(diameter_of_binary_tree(_tree([1,2])),1,'two nodes')
_t(diameter_of_binary_tree(_tree([1])),0,'single node')
_t(diameter_of_binary_tree(_tree([1,2,None,3,None,4])),3,'left skewed chain')
_t(diameter_of_binary_tree(_tree([4,2,7,1,3,6,9])),4,'balanced tree')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_TREE}${JS_HARNESS}
_t(diameterOfBinaryTree(_tree([1,2,3,4,5])),3,'example 1');
_t(diameterOfBinaryTree(_tree([1,2])),1,'two nodes');
_t(diameterOfBinaryTree(_tree([1])),0,'single node');
_t(diameterOfBinaryTree(_tree([1,2,null,3,null,4])),3,'left skewed chain');
_t(diameterOfBinaryTree(_tree([4,2,7,1,3,6,9])),4,'balanced tree');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'lowest-common-ancestor-bst', title:'Lowest Common Ancestor of a BST', difficulty:'Intermediate', category:'Trees',
    description:'Given the root of a binary search tree (BST) and two values p and q present in the tree, return the value of the lowest common ancestor (LCA) of the two nodes. The lowest common ancestor is defined as the lowest node in the tree that has both target nodes as descendants (where a node is allowed to be a descendant of itself). To keep the signature uniform across languages, the function takes the two targets as integer VALUES (not node references) and returns the LCA node; tests compare the returned node\'s value. All node values in the BST are unique, and both p and q are guaranteed to exist.',
    examples:[
      {input:'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8',output:'6',explanation:'The LCA of nodes 2 and 8 is 6, since they lie in different subtrees of the root.'},
      {input:'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4',output:'2',explanation:'A node can be a descendant of itself, so the LCA of 2 and 4 is 2.'},
    ],
    constraints:['The number of nodes in the tree is in the range [2, 10⁵]','-10⁹ <= Node.val <= 10⁹','All Node.val are unique','p != q','Both p and q exist in the BST'],
    hints:['Use the BST ordering — you do not need to search both subtrees','If both p and q are greater than the current node, go right; if both are smaller, go left','When the targets split (one on each side) or one equals the current node, the current node is the LCA'],
    tags:['tree','bst','dfs','recursion'], timeComplexity:'O(h)', spaceComplexity:'O(1)',
    starterCode:{
      python:`${PY_TREE_DOC}
def lowest_common_ancestor(root, p, q):
    pass
`,
      javascript:`${JS_TREE_DOC}
function lowestCommonAncestor(root, p, q) {

}
`,
    },
    testCode:{
      python:`${PY_TREE}${PY_HARNESS}
_b=_tree([6,2,8,0,4,7,9,None,None,3,5])
_t(lowest_common_ancestor(_b,2,8).val,6,'split at root')
_t(lowest_common_ancestor(_b,2,4).val,2,'ancestor is one of the nodes')
_t(lowest_common_ancestor(_b,3,5).val,4,'lca deeper in tree')
_t(lowest_common_ancestor(_b,7,9).val,8,'right subtree')
_t(lowest_common_ancestor(_tree([2,1]),1,2).val,2,'two node tree')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_TREE}${JS_HARNESS}
const _b=_tree([6,2,8,0,4,7,9,null,null,3,5]);
_t(lowestCommonAncestor(_b,2,8).val,6,'split at root');
_t(lowestCommonAncestor(_b,2,4).val,2,'ancestor is one of the nodes');
_t(lowestCommonAncestor(_b,3,5).val,4,'lca deeper in tree');
_t(lowestCommonAncestor(_b,7,9).val,8,'right subtree');
_t(lowestCommonAncestor(_tree([2,1]),1,2).val,2,'two node tree');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'serialize-deserialize-tree', title:'Serialize and Deserialize Binary Tree', difficulty:'Expert', category:'Trees',
    description:'Serialization is the process of converting a data structure into a sequence of bits so that it can be stored or transmitted and later reconstructed. Design an algorithm to serialize and deserialize a binary tree. Implement two functions: serialize(root) that turns a tree into a string, and deserialize(data) that turns such a string back into the identical tree. You may use ANY encoding you like — the tests only verify that deserialize(serialize(tree)) reproduces the original tree (a perfect round trip), never the exact string. The TreeNode class is provided by the runner.',
    examples:[
      {input:'root = [1,2,3,null,null,4,5]',output:'[1,2,3,null,null,4,5]',explanation:'serialize then deserialize must reproduce the original tree.'},
      {input:'root = []',output:'[]',explanation:'The empty tree must round-trip to the empty tree.'},
    ],
    constraints:['The number of nodes in the tree is in the range [0, 10⁴]','-1000 <= Node.val <= 1000','serialize must return a string','deserialize must accept exactly what serialize returns'],
    hints:['A pre-order DFS that emits a sentinel (e.g. "#") for null children captures the full structure','To deserialize, read tokens in the same pre-order: a sentinel is null, otherwise build a node and recurse left then right','BFS level-order with null markers works equally well — just be consistent between the two functions'],
    tags:['tree','dfs','bfs','design','string'], timeComplexity:'O(n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`${PY_TREE_DOC}
def serialize(root):
    pass

def deserialize(data):
    pass
`,
      javascript:`${JS_TREE_DOC}
function serialize(root) {

}

function deserialize(data) {

}
`,
    },
    testCode:{
      python:`${PY_TREE}${PY_HARNESS}
def _dump(root):
    out=[];q=[root]
    while q:
        node=q.pop(0)
        if node is None: out.append(None); continue
        out.append(node.val); q.append(node.left); q.append(node.right)
    while out and out[-1] is None: out.pop()
    return out
_t(_dump(deserialize(serialize(_tree([1,2,3,None,None,4,5])))),[1,2,3,None,None,4,5],'example 1')
_t(_dump(deserialize(serialize(_tree([])))),[],'empty tree')
_t(_dump(deserialize(serialize(_tree([1])))),[1],'single node')
_t(_dump(deserialize(serialize(_tree([1,2,3,4,5,6,7])))),[1,2,3,4,5,6,7],'perfect tree')
_t(_dump(deserialize(serialize(_tree([-1,-2,-3])))),[-1,-2,-3],'negative values')
_t(_dump(deserialize(serialize(_tree([5,4,7,3,None,2,None,-1,None,9])))),[5,4,7,3,None,2,None,-1,None,9],'irregular shape')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_TREE}${JS_HARNESS}
function _dump(root){
  const out=[],q=[root];
  while(q.length){
    const node=q.shift();
    if(node===null){out.push(null);continue;}
    out.push(node.val);q.push(node.left);q.push(node.right);
  }
  while(out.length&&out[out.length-1]===null)out.pop();
  return out;
}
_t(_dump(deserialize(serialize(_tree([1,2,3,null,null,4,5])))),[1,2,3,null,null,4,5],'example 1');
_t(_dump(deserialize(serialize(_tree([])))),[],'empty tree');
_t(_dump(deserialize(serialize(_tree([1])))),[1],'single node');
_t(_dump(deserialize(serialize(_tree([1,2,3,4,5,6,7])))),[1,2,3,4,5,6,7],'perfect tree');
_t(_dump(deserialize(serialize(_tree([-1,-2,-3])))),[-1,-2,-3],'negative values');
_t(_dump(deserialize(serialize(_tree([5,4,7,3,null,2,null,-1,null,9])))),[5,4,7,3,null,2,null,-1,null,9],'irregular shape');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
