(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,67585,(t,e,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"BailoutToCSR",{enumerable:!0,get:function(){return i}});let s=t.r(32061);function i({reason:t,children:e}){if("u"<typeof window)throw Object.defineProperty(new s.BailoutToCSRError(t),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return e}},9885,(t,e,n)=>{"use strict";function s(t){return t.split("/").map(t=>encodeURIComponent(t)).join("/")}Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"encodeURIPath",{enumerable:!0,get:function(){return s}})},52157,(t,e,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"PreloadChunks",{enumerable:!0,get:function(){return l}});let s=t.r(43476),i=t.r(74080),r=t.r(63599),a=t.r(9885),o=t.r(43369);function l({moduleIds:t}){if("u">typeof window)return null;let e=r.workAsyncStorage.getStore();if(void 0===e)return null;let n=[];if(e.reactLoadableManifest&&t){let s=e.reactLoadableManifest;for(let e of t){if(!s[e])continue;let t=s[e].files;n.push(...t)}}if(0===n.length)return null;let c=(0,o.getAssetTokenQuery)();return(0,s.jsx)(s.Fragment,{children:n.map(t=>{let n=`${e.assetPrefix}/_next/${(0,a.encodeURIPath)(t)}${c}`;return t.endsWith(".css")?(0,s.jsx)("link",{precedence:"dynamic",href:n,rel:"stylesheet",as:"style",nonce:e.nonce},t):((0,i.preload)(n,{as:"script",fetchPriority:"low",nonce:e.nonce}),null)})})}},69093,(t,e,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"default",{enumerable:!0,get:function(){return c}});let s=t.r(43476),i=t.r(71645),r=t.r(67585),a=t.r(52157);function o(t){return{default:t&&"default"in t?t.default:t}}let l={loader:()=>Promise.resolve(o(()=>null)),loading:null,ssr:!0},c=function(t){let e={...l,...t},n=(0,i.lazy)(()=>e.loader().then(o)),c=e.loading;function d(t){let o=c?(0,s.jsx)(c,{isLoading:!0,pastDelay:!0,error:null}):null,l=!e.ssr||!!e.loading,d=l?i.Suspense:i.Fragment,u=e.ssr?(0,s.jsxs)(s.Fragment,{children:["u"<typeof window?(0,s.jsx)(a.PreloadChunks,{moduleIds:e.modules}):null,(0,s.jsx)(n,{...t})]}):(0,s.jsx)(r.BailoutToCSR,{reason:"next/dynamic",children:(0,s.jsx)(n,{...t})});return(0,s.jsx)(d,{...l?{fallback:o}:{},children:u})}return d.displayName="LoadableComponent",d}},70703,(t,e,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"default",{enumerable:!0,get:function(){return i}});let s=t.r(55682)._(t.r(69093));function i(t,e){let n={};"function"==typeof t&&(n.loader=t);let i={...n,...e};return(0,s.default)({...i,modules:i.loadableGenerated?.modules})}("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),e.exports=n.default)},59925,(t,e,n)=>{e.exports=JSON.parse('[{"pattern":"SyntaxError.*unexpected EOF|SyntaxError.*was never closed|SyntaxError.*EOF while scanning","title":"SyntaxError — Unexpected end of file","cause":"A bracket, parenthesis, or quote was opened but never closed.","fix":"Check for unclosed `(`, `[`, `{`, or an unclosed string. Count opening vs closing brackets.","example":"# Wrong:\\nprint(\\"hello\\"\\n\\n# Right:\\nprint(\\"hello\\")"},{"pattern":"SyntaxError.*invalid syntax|SyntaxError.*expected","title":"SyntaxError — Invalid syntax","cause":"Python couldn\'t parse your code. Usually a missing colon, mismatched bracket, or typo.","fix":"Check the highlighted line. Common causes: missing `:` after `if`/`for`/`def`/`class`, or `=` used instead of `==` in a condition.","example":"# Wrong:\\nif x == 5\\n    print(x)\\n\\n# Right:\\nif x == 5:\\n    print(x)"},{"pattern":"IndentationError|TabError","title":"IndentationError — Wrong indentation","cause":"Python uses indentation to define code blocks. This line\'s indentation doesn\'t match its block, or tabs and spaces are mixed.","fix":"Use consistent 4-space indentation. Don\'t mix tabs and spaces. All lines inside an `if`/`for`/`def` must be indented the same amount.","example":"# Wrong:\\ndef greet():\\nprint(\'hi\')  # not indented\\n\\n# Right:\\ndef greet():\\n    print(\'hi\')"},{"pattern":"NameError: name \'(\\\\w+)\' is not defined","title":"NameError — Variable not defined","cause":"You\'re using a variable or function name that hasn\'t been assigned yet, is misspelled, or is out of scope.","fix":"Check the spelling. Make sure you define (assign) the variable before using it. If it\'s inside a function, check that it\'s in scope.","example":"# Wrong:\\nprint(message)  # message not defined yet\\n\\n# Right:\\nmessage = \'Hello\'\\nprint(message)"},{"pattern":"UnboundLocalError: local variable \'(\\\\w+)\' referenced before assignment","title":"UnboundLocalError — Variable used before assignment","cause":"A local variable inside a function is referenced before it\'s assigned. Often happens when modifying a global variable without declaring it global.","fix":"Either assign the variable first, or add `global variable_name` at the top of the function.","example":"# Wrong:\\ncount = 0\\ndef increment():\\n    count += 1  # modifies global without \'global\'\\n\\n# Right:\\ncount = 0\\ndef increment():\\n    global count\\n    count += 1"},{"pattern":"TypeError: unsupported operand type","title":"TypeError — Incompatible types for operator","cause":"You\'re using `+`, `-`, `*` etc. on incompatible types, like adding a string to a number.","fix":"Convert one value to match the other. Use `int()`, `float()`, or `str()` to cast types.","example":"# Wrong:\\nage = \'25\'\\nprint(age + 1)  # str + int\\n\\n# Right:\\nprint(int(age) + 1)"},{"pattern":"TypeError: \'(\\\\w+)\' object is not iterable","title":"TypeError — Object is not iterable","cause":"You\'re trying to loop over a value that isn\'t a list, tuple, string, or other iterable (e.g., an integer or None).","fix":"Make sure the value you\'re iterating is a list, tuple, string, or `range`. Wrap a single number in a list if needed.","example":"# Wrong:\\nfor x in 5:  # int is not iterable\\n    print(x)\\n\\n# Right:\\nfor x in range(5):\\n    print(x)"},{"pattern":"TypeError: \'(\\\\w+)\' object is not callable","title":"TypeError — Object is not callable","cause":"You\'re using `()` to call something that isn\'t a function — often a variable that shadows a built-in name.","fix":"Check if you accidentally reused a built-in name like `list`, `dict`, or `str` as a variable, then tried to call it as a function.","example":"# Wrong (shadows built-in):\\nlist = [1, 2, 3]\\nnums = list(\'abc\')  # \'list\' is now an array, not the built-in!\\n\\n# Right:\\nmy_list = [1, 2, 3]\\nnums = list(\'abc\')"},{"pattern":"TypeError: .*takes \\\\d+ positional argument|TypeError: .*missing \\\\d+ required positional argument","title":"TypeError — Wrong number of arguments","cause":"You\'re calling a function with too many or too few arguments.","fix":"Check the function definition to see how many parameters it needs. Make sure you\'re passing the right number.","example":"# Wrong:\\ndef add(a, b):\\n    return a + b\\nresult = add(1, 2, 3)  # too many args\\n\\n# Right:\\nresult = add(1, 2)"},{"pattern":"TypeError: \'NoneType\' object","title":"TypeError — Value is None","cause":"You\'re trying to use `None` like a regular value. Often the function forgot a `return` statement.","fix":"Check that the function returns a value. Add a `return` statement, or guard against None with `if result is not None:`.","example":"# Wrong:\\ndef get_name():\\n    name = \'Alice\'  # forgot return!\\n\\nprint(get_name().upper())  # None has no .upper()\\n\\n# Right:\\ndef get_name():\\n    return \'Alice\'\\nprint(get_name().upper())"},{"pattern":"AttributeError: \'(\\\\w+)\' object has no attribute \'(\\\\w+)\'","title":"AttributeError — No such attribute or method","cause":"The object doesn\'t have the method or property you\'re trying to access. Possibly a typo, wrong type, or the object is None.","fix":"Check the spelling. Use `dir(obj)` to see available attributes. Make sure the object is the type you expect.","example":"# Wrong:\\nmy_dict = {\'key\': \'value\'}\\nmy_dict.append(\'new\')  # dicts don\'t have .append()\\n\\n# Right:\\nmy_list = [\'value\']\\nmy_list.append(\'new\')"},{"pattern":"IndexError: list index out of range|IndexError: string index out of range|IndexError: tuple index out of range","title":"IndexError — Index out of range","cause":"You\'re accessing an index that doesn\'t exist. Lists are zero-indexed: a list of N items has valid indices 0 to N-1.","fix":"Use `len(lst) - 1` for the last item, or `lst[-1]`. Add a bounds check before accessing.","example":"# Wrong:\\ndata = [10, 20, 30]\\nprint(data[3])  # valid: 0, 1, 2\\n\\n# Right:\\nprint(data[2])      # index 2 = third item\\nprint(data[-1])     # last item"},{"pattern":"KeyError:","title":"KeyError — Key not found","cause":"You\'re accessing a dictionary (or DataFrame) with a key that doesn\'t exist. Keys are case-sensitive.","fix":"Use `dict.get(key, default)` to safely access a key. Or check with `if key in dict:` before accessing. Call `.keys()` (or `df.columns`) to see valid keys.","example":"# Wrong:\\nuser = {\'name\': \'Alice\'}\\nprint(user[\'age\'])  # \'age\' doesn\'t exist\\n\\n# Right (safe access):\\nprint(user.get(\'age\', \'unknown\'))  # returns \'unknown\' if missing"},{"pattern":"ValueError: invalid literal for int\\\\(\\\\) with base","title":"ValueError — Can\'t convert string to int","cause":"You\'re calling `int()` on a string that contains non-digit characters (like letters, spaces, or a decimal point).","fix":"For decimals, use `int(float(x))`. For strings with spaces, strip first: `int(x.strip())`.","example":"# Wrong:\\nint(\'3.14\')   # has a decimal point\\nint(\'hello\')  # not a number\\n\\n# Right:\\nint(float(\'3.14\'))  # → 3\\nint(\'42\')           # → 42"},{"pattern":"ValueError: could not convert string to float","title":"ValueError — Can\'t convert string to float","cause":"You\'re calling `float()` on a string that contains non-numeric characters.","fix":"Make sure the string contains only digits, an optional decimal point, and an optional leading sign. Strip whitespace with `.strip()` first.","example":"# Wrong:\\nfloat(\'3.14 kg\')  # has extra text\\n\\n# Right:\\nvalue = \'3.14 kg\'.split()[0]  # extract \'3.14\'\\nfloat(value)  # → 3.14"},{"pattern":"ZeroDivisionError","title":"ZeroDivisionError — Division by zero","cause":"You\'re dividing a number by zero.","fix":"Check the denominator before dividing. Use `if divisor != 0:` or a try/except block.","example":"# Wrong:\\nresult = 10 / 0\\n\\n# Right:\\ndivisor = 0\\nif divisor != 0:\\n    result = 10 / divisor\\nelse:\\n    result = float(\'inf\')"},{"pattern":"RecursionError: maximum recursion depth exceeded","title":"RecursionError — Infinite recursion","cause":"A function keeps calling itself without hitting a base case, overflowing the call stack.","fix":"Make sure your recursive function has a base case that stops it. Every recursive call must move toward the base case.","example":"# Wrong (no base case):\\ndef countdown(n):\\n    print(n)\\n    countdown(n - 1)  # never stops!\\n\\n# Right:\\ndef countdown(n):\\n    if n <= 0: return  # base case\\n    print(n)\\n    countdown(n - 1)"},{"pattern":"ModuleNotFoundError: No module named|ImportError: No module named|ImportError: cannot import name","title":"ImportError — Module not found","cause":"The module you\'re importing isn\'t installed, or the name is misspelled.","fix":"Check the spelling. In this sandbox, `numpy`, `pandas`, `torch`, `sklearn`, `transformers`, `matplotlib` are available. Custom modules must be in the same directory.","example":"import numpy as np      # ✓\\nimport pandas as pd     # ✓\\nimport torch            # ✓\\nimport sklearn          # ✓\\n\\n# Typo:\\n# import numppy          # ✗ misspelled"},{"pattern":"MemoryError","title":"MemoryError — Out of memory","cause":"Your code tried to allocate more memory than is available, usually by creating very large lists or arrays.","fix":"Use generators instead of materializing huge lists. Process data in chunks. Reduce the size of test data.","example":"# Too much memory:\\n# big_list = list(range(10**9))\\n\\n# Use a generator instead:\\nbig_gen = range(10**9)  # lazy, no memory until iterated\\nfor i in big_gen:\\n    if i > 10: break\\n    print(i)"},{"pattern":"ValueError: operands could not be broadcast together with shapes","title":"NumPy — Shape mismatch (broadcast error)","cause":"You\'re combining two NumPy arrays with incompatible shapes. NumPy can broadcast shapes like (3,) + (3,1) but not arbitrary mismatches.","fix":"Use `.shape` to inspect both arrays. Use `.reshape()` or `np.expand_dims()` to align dimensions.","example":"import numpy as np\\na = np.array([1, 2, 3])   # shape (3,)\\nb = np.array([1, 2])      # shape (2,) — incompatible!\\n\\n# Fix: match sizes\\nb = np.array([1, 2, 3])\\nresult = a + b  # ✓"},{"pattern":"ValueError: cannot reshape array of size (\\\\d+) into shape","title":"NumPy — Cannot reshape: size mismatch","cause":"The total number of elements doesn\'t match the new shape. A reshape from N elements must target a shape whose product equals N.","fix":"Make sure the product of new dimensions equals the total element count. Use `-1` for one dimension to let NumPy infer it.","example":"import numpy as np\\narr = np.arange(12)       # 12 elements\\nprint(arr.reshape(3, 4))  # ✓  3×4=12\\nprint(arr.reshape(-1, 4)) # ✓  infers first dim as 3"},{"pattern":"AxisError|axis \\\\d+ is out of bounds for array of dimension","title":"NumPy — Axis out of bounds","cause":"You specified an axis that doesn\'t exist. A 2D array only has axes 0 and 1.","fix":"Check `arr.ndim`. Valid axes for an N-d array are 0 to N-1.","example":"import numpy as np\\narr = np.zeros((3, 4))   # 2D: axes 0 and 1\\nprint(arr.sum(axis=0))   # ✓ rows\\nprint(arr.sum(axis=1))   # ✓ cols\\n# arr.sum(axis=2)        # ✗ no axis 2"},{"pattern":"TypeError: only size-1 arrays can be converted to Python scalars","title":"NumPy — Array passed where scalar expected","cause":"A Python `math` function received a NumPy array but needs a single number. NumPy has its own element-wise equivalents.","fix":"Use NumPy\'s functions instead of Python\'s `math` module: `np.sqrt()`, `np.log()`, `np.exp()`, etc.","example":"import numpy as np\\nimport math\\narr = np.array([1, 4, 9])\\n\\n# Wrong:\\n# math.sqrt(arr)\\n\\n# Right:\\nnp.sqrt(arr)  # → array([1., 2., 3.])"},{"pattern":"RuntimeError: Expected all tensors to be on the same device|is on CPU.*CUDA|is on CUDA.*CPU","title":"PyTorch — Tensors on different devices","cause":"You\'re operating on tensors where some are on CPU and others on GPU (CUDA). All tensors in an operation must be on the same device.","fix":"Use `.to(device)` to move all tensors to the same device. Define `device` once and use it consistently.","example":"import torch\\ndevice = torch.device(\'cuda\' if torch.cuda.is_available() else \'cpu\')\\n\\na = torch.tensor([1.0]).to(device)\\nb = torch.tensor([2.0]).to(device)  # same device ✓\\nresult = a + b"},{"pattern":"RuntimeError: mat1 and mat2 shapes cannot be multiplied|mat1.*mat2.*shapes","title":"PyTorch — Matrix shape mismatch","cause":"Matrix multiplication requires the inner dimensions to match: (m×k) @ (k×n). Your tensors have incompatible shapes.","fix":"Check `.shape` on both tensors. The last dim of the first must equal the first dim of the second. Use `.reshape()` or `.T` to fix.","example":"import torch\\na = torch.randn(3, 4)   # (3, 4)\\nb = torch.randn(4, 5)   # (4, 5) — inner dims match!\\nc = a @ b               # → (3, 5)  ✓\\n# a @ torch.randn(3, 5) # ✗ 4 ≠ 3"},{"pattern":"RuntimeError: CUDA out of memory|torch.cuda.OutOfMemoryError","title":"PyTorch — CUDA out of memory","cause":"The GPU ran out of VRAM. Usually caused by a large batch size or gradients being kept unnecessarily.","fix":"Reduce batch size. Use `torch.no_grad()` for inference. Call `torch.cuda.empty_cache()` to free cached memory.","example":"import torch\\ntorch.cuda.empty_cache()  # free unused allocations\\n\\n# Inference — no gradients needed:\\nwith torch.no_grad():\\n    output = model(input_tensor)"},{"pattern":"AssertionError: Torch not compiled with CUDA|No CUDA GPUs are available|CUDA is not available","title":"PyTorch — CUDA not available","cause":"Your code tries to use GPU acceleration, but CUDA isn\'t available in this environment.","fix":"Use `torch.device(\'cuda\' if torch.cuda.is_available() else \'cpu\')` to write code that works on both CPU and GPU.","example":"import torch\\ndevice = torch.device(\'cuda\' if torch.cuda.is_available() else \'cpu\')\\nprint(f\'Using: {device}\')\\n\\ntensor = torch.randn(4, 8).to(device)"},{"pattern":"element 0 of tensors does not require grad and does not have a grad_fn","title":"PyTorch — Tensor has no gradient","cause":"You\'re calling `.backward()` on a tensor that doesn\'t track gradients. It either wasn\'t created with `requires_grad=True` or was detached.","fix":"Add `requires_grad=True` to leaf tensors that need gradients. Don\'t wrap the forward pass in `torch.no_grad()` during training.","example":"import torch\\nx = torch.tensor([2.0], requires_grad=True)\\ny = x ** 2\\ny.backward()\\nprint(x.grad)  # → tensor([4.])"},{"pattern":"ValueError: If using all scalar values, you must pass an index","title":"Pandas — DataFrame from scalars needs an index","cause":"You\'re creating a DataFrame from a dict of single values. Pandas needs an index to know how many rows to create.","fix":"Wrap values in lists, or pass an `index` parameter.","example":"import pandas as pd\\n# Wrong:\\n# df = pd.DataFrame({\'a\': 1, \'b\': 2})\\n\\n# Right:\\ndf = pd.DataFrame({\'a\': [1], \'b\': [2]})"},{"pattern":"Cannot read propert(?:y|ies) of undefined|Cannot read propert(?:y|ies) of null","title":"TypeError — Reading property of undefined/null","cause":"You\'re accessing a property on `undefined` or `null`. The variable wasn\'t initialized, a function returned nothing, or an array lookup found no match.","fix":"Check the variable has a value before accessing properties. Use optional chaining (`?.`) or a null check.","example":"// Wrong:\\nconst user = null;\\nconsole.log(user.name); // Error!\\n\\n// Right (optional chaining):\\nconsole.log(user?.name); // undefined — no crash\\n\\n// Right (null check):\\nif (user) console.log(user.name);"},{"pattern":"is not a function","title":"TypeError — Not a function","cause":"You\'re calling something with `()` that isn\'t a function. The variable may hold a non-function value, be undefined, or the method name is misspelled.","fix":"Check with `typeof x`. Make sure the method exists on the object. Watch for typos.","example":"// Wrong:\\nconst greet = \'hello\';\\ngreet();  // string is not callable\\n\\n// Right:\\nconst greet = () => \'hello\';\\ngreet();  // ✓"},{"pattern":"ReferenceError: (\\\\w+) is not defined","title":"ReferenceError — Variable not defined","cause":"You\'re using a variable that hasn\'t been declared. Either it\'s a typo, out of scope, or you forgot `const`/`let`/`var`.","fix":"Declare the variable before using it. Check for typos and scope (block-scoped `const`/`let` can\'t be accessed outside their block).","example":"// Wrong:\\nconsole.log(message); // not declared\\n\\n// Right:\\nconst message = \'Hello\';\\nconsole.log(message);"},{"pattern":"Time limit exceeded|execution timed out|Killed\\\\b","title":"Execution Timed Out","cause":"Your code took too long to run. Usually caused by an infinite loop or a very slow algorithm.","fix":"Check for infinite loops. Make sure every loop has a condition that eventually becomes false.","example":"# Wrong — infinite loop:\\nwhile True:\\n    print(\'looping forever!\')\\n\\n# Right:\\ncount = 0\\nwhile count < 5:\\n    print(count)\\n    count += 1"}]')},4908,t=>{"use strict";var e=t.i(43476),n=t.i(71645),s=t.i(70703),i=t.i(62319),r=t.i(68281);let a=`
_p=_n=0
def _t(g,e,d=''):
    global _p,_n;_n+=1
    if g==e:_p+=1;print(f'✓ Test {_n}'+(f' - {d}' if d else ''))
    else:print(f'✗ Test {_n} - Expected {repr(e)}, got {repr(g)}'+(f' [{d}]' if d else ''))
`,o="\nlet _p=0,_n=0;const _t=(g,e,d='')=>{_n++;const ok=JSON.stringify(g)===JSON.stringify(e);ok?(_p++,console.log(`✓ Test ${_n}`+(d?` - ${d}`:''))):console.log(`✗ Test ${_n} - Expected ${JSON.stringify(e)}, got ${JSON.stringify(g)}`+(d?` [${d}]`:''));};\n",l=`class ListNode:
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
`,c=`class ListNode { constructor(val=0, next=null) { this.val = val; this.next = next; } }
const _build = a => { const h = new ListNode(); let c = h; for (const v of a) { c.next = new ListNode(v); c = c.next; } return h.next; };
const _toList = n => { const o = []; while (n) { o.push(n.val); n = n.next; } return o; };
`,d=`class TreeNode:
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
`,u=`class TreeNode { constructor(val=0, left=null, right=null) { this.val = val; this.left = left; this.right = right; } }
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
`,p=`# Definition for a singly-linked list node (provided by the runner):
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val, self.next = val, next
`,g=`// Definition for a singly-linked list node (provided by the runner):
// class ListNode { constructor(val=0, next=null) { this.val = val; this.next = next; } }
`,m=`# Definition for a binary tree node (provided by the runner):
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val, self.left, self.right = val, left, right
`,_=`// Definition for a binary tree node (provided by the runner):
// class TreeNode { constructor(val=0, left=null, right=null) { this.val = val; this.left = left; this.right = right; } }
`,h=`// The ListNode class is provided by the runner.
interface ListNode { val: number; next: ListNode | null }
`,f=`// The TreeNode class is provided by the runner.
interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null }
`,x=`var _p, _n int

func _t(g, e interface{}, d string) {
    _n++
    gs, es := fmt.Sprintf("%v", g), fmt.Sprintf("%v", e)
    if gs == es {
        _p++
        if d != "" {
            fmt.Printf("✓ Test %d - %s\\n", _n, d)
        } else {
            fmt.Printf("✓ Test %d\\n", _n)
        }
    } else {
        if d != "" {
            fmt.Printf("✗ Test %d - Expected %s, got %s [%s]\\n", _n, es, gs, d)
        } else {
            fmt.Printf("✗ Test %d - Expected %s, got %s\\n", _n, es, gs)
        }
    }
}`,b=`func _norm(a [][]int) [][]int {
    out := make([][]int, len(a))
    for i, s := range a {
        c := append([]int(nil), s...)
        sort.Ints(c)
        out[i] = c
    }
    sort.Slice(out, func(i, j int) bool {
        x, y := out[i], out[j]
        m := len(x)
        if len(y) < m {
            m = len(y)
        }
        for k := 0; k < m; k++ {
            if x[k] != y[k] {
                return x[k] < y[k]
            }
        }
        return len(x) < len(y)
    })
    return out
}`,y=`func _normS(a [][]string) [][]string {
    out := make([][]string, len(a))
    for i, s := range a {
        c := append([]string(nil), s...)
        sort.Strings(c)
        out[i] = c
    }
    sort.Slice(out, func(i, j int) bool {
        return strings.Join(out[i], ",") < strings.Join(out[j], ",")
    })
    return out
}`,v=`type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

func _tree(vals []interface{}) *TreeNode {
    if len(vals) == 0 || vals[0] == nil {
        return nil
    }
    root := &TreeNode{Val: vals[0].(int)}
    q := []*TreeNode{root}
    i := 1
    for len(q) > 0 && i < len(vals) {
        n := q[0]
        q = q[1:]
        if i < len(vals) && vals[i] != nil {
            n.Left = &TreeNode{Val: vals[i].(int)}
            q = append(q, n.Left)
        }
        i++
        if i < len(vals) && vals[i] != nil {
            n.Right = &TreeNode{Val: vals[i].(int)}
            q = append(q, n.Right)
        }
        i++
    }
    return root
}`,w=`type ListNode struct {
    Val  int
    Next *ListNode
}

func _build(a []int) *ListNode {
    h := &ListNode{}
    c := h
    for _, v := range a {
        c.Next = &ListNode{Val: v}
        c = c.Next
    }
    return h.Next
}

func _toList(n *ListNode) []int {
    o := []int{}
    for n != nil {
        o = append(o, n.Val)
        n = n.Next
    }
    return o
}`,S=[["typescript",{"two-sum":{starter:`function twoSum(nums: number[], target: number): number[] {

}
`},"best-time-stock":{starter:`function maxProfit(prices: number[]): number {

}
`},"product-except-self":{starter:`function productExceptSelf(nums: number[]): number[] {

}
`},"maximum-subarray":{starter:`function maxSubarray(nums: number[]): number {

}
`},"merge-intervals":{starter:`function mergeIntervals(intervals: number[][]): number[][] {

}
`},"first-missing-positive":{starter:`function firstMissingPositive(nums: number[]): number {

}
`},"valid-palindrome":{starter:`function isPalindrome(s: string): boolean {

}
`},"three-sum":{starter:`function threeSum(nums: number[]): number[][] {

}
`},"container-most-water":{starter:`function maxArea(height: number[]): number {

}
`},"trapping-rain-water":{starter:`function trap(height: number[]): number {

}
`},"longest-substring-no-repeat":{starter:`function lengthOfLongestSubstring(s: string): number {

}
`},"sliding-window-maximum":{starter:`function maxSlidingWindow(nums: number[], k: number): number[] {

}
`},"minimum-window-substring":{starter:`function minWindow(s: string, t: string): string {

}
`},"group-anagrams":{starter:`function groupAnagrams(strs: string[]): string[][] {

}
`},"top-k-frequent":{starter:`function topKFrequent(nums: number[], k: number): number[] {

}
`},"longest-consecutive-sequence":{starter:`function longestConsecutive(nums: number[]): number {

}
`},"valid-parentheses":{starter:`function isValid(s: string): boolean {

}
`},"daily-temperatures":{starter:`function dailyTemperatures(temperatures: number[]): number[] {

}
`},"largest-rectangle-histogram":{starter:`function largestRectangleArea(heights: number[]): number {

}
`},"reverse-linked-list":{starter:`${h}
function reverseList(head: ListNode | null): ListNode | null {

}
`},"linked-list-cycle":{starter:`${h}
function hasCycle(head: ListNode | null): boolean {

}
`},"merge-k-sorted-lists":{starter:`${h}
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {

}
`},"max-depth-binary-tree":{starter:`${f}
function maxDepth(root: TreeNode | null): number {

}
`},"validate-bst":{starter:`${f}
function isValidBST(root: TreeNode | null): boolean {

}
`},"level-order-traversal":{starter:`${f}
function levelOrder(root: TreeNode | null): number[][] {

}
`},"binary-tree-max-path-sum":{starter:`${f}
function maxPathSum(root: TreeNode | null): number {

}
`},"number-of-islands":{starter:`function numIslands(grid: string[][]): number {

}
`},"course-schedule":{starter:`function canFinish(numCourses: number, prerequisites: number[][]): boolean {

}
`},"word-ladder":{starter:`function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {

}
`},"climbing-stairs":{starter:`function climbStairs(n: number): number {

}
`},"house-robber":{starter:`function rob(nums: number[]): number {

}
`},"coin-change":{starter:`function coinChange(coins: number[], amount: number): number {

}
`},"longest-increasing-subsequence":{starter:`function lengthOfLIS(nums: number[]): number {

}
`},"edit-distance":{starter:`function minDistance(word1: string, word2: string): number {

}
`},"regex-matching":{starter:`function isMatch(s: string, p: string): boolean {

}
`},"palindrome-number":{starter:`function isPalindromeNumber(x: number): boolean {

}
`},"basic-calculator":{starter:`function calculate(s: string): number {

}
`},"single-number":{starter:`function singleNumber(nums: number[]): number {

}
`},"counting-bits":{starter:`function countBits(n: number): number[] {

}
`},"binary-search":{starter:`function search(nums: number[], target: number): number {

}
`},"search-rotated-array":{starter:`function searchRotated(nums: number[], target: number): number {

}
`},"kth-largest-element":{starter:`function findKthLargest(nums: number[], k: number): number {

}
`},"median-two-sorted-arrays":{starter:`function findMedianSortedArrays(nums1: number[], nums2: number[]): number {

}
`},"min-stack":{starter:`class MinStack {
  constructor() {

  }

  push(val: number): void {

  }

  pop(): void {

  }

  top(): number {
    return 0
  }

  getMin(): number {
    return 0
  }
}
`},"lru-cache":{starter:`class LRUCache {
  constructor(capacity: number) {

  }

  get(key: number): number {
    return -1
  }

  put(key: number, value: number): void {

  }
}
`},subsets:{starter:`function subsets(nums: number[]): number[][] {

}
`},"combination-sum":{starter:`function combinationSum(candidates: number[], target: number): number[][] {

}
`},"n-queens":{starter:`function solveNQueens(n: number): string[][] {

}
`},"knn-classifier":{starter:`function knnPredict(XTrain: number[][], yTrain: number[], x: number[], k: number): number {

}
`},"gradient-descent-linear":{starter:`function gradientDescent(X: number[], y: number[], lr: number = 0.01, epochs: number = 5000): number[] {

}
`},"rotate-array":{starter:`function rotate(nums: number[], k: number): number[] {

}
`},"longest-common-prefix":{starter:`function longestCommonPrefix(strs: string[]): string {

}
`},"spiral-matrix":{starter:`function spiralOrder(matrix: number[][]): number[] {

}
`},"set-matrix-zeroes":{starter:`function setZeroes(matrix: number[][]): number[][] {

}
`},"insert-interval":{starter:`function insert(intervals: number[][], newInterval: number[]): number[][] {

}
`},candy:{starter:`function candy(ratings: number[]): number {

}
`},"number-of-1-bits":{starter:`function hammingWeight(n: number): number {

}
`},"missing-number":{starter:`function missingNumber(nums: number[]): number {

}
`},"unique-paths":{starter:`function uniquePaths(m: number, n: number): number {

}
`},"word-break":{starter:`function wordBreak(s: string, wordDict: string[]): boolean {

}
`},"longest-common-subsequence":{starter:`function longestCommonSubsequence(text1: string, text2: string): number {

}
`},"decode-ways":{starter:`function numDecodings(s: string): number {

}
`},"partition-equal-subset-sum":{starter:`function canPartition(nums: number[]): boolean {

}
`},"burst-balloons":{starter:`function maxCoins(nums: number[]): number {

}
`},"rotting-oranges":{starter:`function orangesRotting(grid: number[][]): number {

}
`},"pacific-atlantic":{starter:`function pacificAtlantic(heights: number[][]): number[][] {

}
`},"alien-dictionary":{starter:`function alienOrder(words: string[]): string {

}
`},"valid-anagram":{starter:`function isAnagram(s: string, t: string): boolean {

}
`},"subarray-sum-equals-k":{starter:`function subarraySum(nums: number[], k: number): number {

}
`},"four-sum-ii":{starter:`function fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {

}
`},"middle-of-linked-list":{starter:`${h}
function middleNode(head: ListNode | null): ListNode | null {

}
`},"remove-nth-from-end":{starter:`${h}
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {

}
`},"add-two-numbers":{starter:`${h}
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {

}
`},"happy-number":{starter:`function isHappy(n: number): boolean {

}
`},"pow-x-n":{starter:`function myPow(x: number, n: number): number {

}
`},perceptron:{starter:`function perceptron(X: number[][], y: number[], lr: number = 0.1, epochs: number = 20): number[] {

}
`},"cosine-similarity":{starter:`function cosineSimilarity(a: number[], b: number[]): number {

}
`},"implement-trie":{starter:`class Trie {
  constructor() {

  }

  insert(word: string): void {

  }

  search(word: string): boolean {
    return false
  }

  startsWith(prefix: string): boolean {
    return false
  }
}
`},"queue-using-stacks":{starter:`class MyQueue {
  constructor() {

  }

  push(x: number): void {

  }

  pop(): number {
    return 0
  }

  peek(): number {
    return 0
  }

  empty(): boolean {
    return false
  }
}
`},permutations:{starter:`function permute(nums: number[]): number[][] {

}
`},"generate-parentheses":{starter:`function generateParenthesis(n: number): string[] {

}
`},"sudoku-solver":{starter:`function solveSudoku(board: string[][]): string[][] {

}
`},"find-all-anagrams":{starter:`function findAnagrams(s: string, p: string): number[] {

}
`},"longest-repeating-replacement":{starter:`function characterReplacement(s: string, k: number): number {

}
`},"max-consecutive-ones-iii":{starter:`function longestOnes(nums: number[], k: number): number {

}
`},"find-min-rotated":{starter:`function findMin(nums: number[]): number {

}
`},"search-2d-matrix":{starter:`function searchMatrix(matrix: number[][], target: number): boolean {

}
`},"koko-eating-bananas":{starter:`function minEatingSpeed(piles: number[], h: number): number {

}
`},"count-smaller-after-self":{starter:`function countSmaller(nums: number[]): number[] {

}
`},"evaluate-rpn":{starter:`function evalRPN(tokens: string[]): number {

}
`},"decode-string":{starter:`function decodeString(s: string): string {

}
`},"longest-valid-parentheses":{starter:`function longestValidParentheses(s: string): number {

}
`},"invert-binary-tree":{starter:`${f}
function invertTree(root: TreeNode | null): TreeNode | null {

}
`},"diameter-of-binary-tree":{starter:`${f}
function diameterOfBinaryTree(root: TreeNode | null): number {

}
`},"lowest-common-ancestor-bst":{starter:`${f}
function lowestCommonAncestor(root: TreeNode | null, p: number, q: number): TreeNode | null {

}
`},"serialize-deserialize-tree":{starter:`${f}
function serialize(root: TreeNode | null): string {

}

function deserialize(data: string): TreeNode | null {

}
`},"move-zeroes":{starter:`function moveZeroes(nums: number[]): number[] {

}
`},"remove-duplicates-sorted":{starter:`function removeDuplicates(nums: number[]): number[] {

}
`},"sort-colors":{starter:`function sortColors(nums: number[]): number[] {

}
`},"three-sum-closest":{starter:`function threeSumClosest(nums: number[], target: number): number {

}
`}}],["java",{"two-sum":{starter:`import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        return new int[]{};
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.twoSum(new int[]{2,7,11,15},9), new int[]{0,1}, "example 1");
    _t(s.twoSum(new int[]{3,2,4},6), new int[]{1,2}, "example 2");
    _t(s.twoSum(new int[]{3,3},6), new int[]{0,1}, "duplicate values");
    _t(s.twoSum(new int[]{-1,-2,-3,-4,-5},-8), new int[]{2,4}, "negative numbers");
    _t(s.twoSum(new int[]{0,4,3,0},0), new int[]{0,3}, "zeros sum to zero");
    _done();
  }
}`},"best-time-stock":{starter:`import java.util.*;
class Solution {
    public int maxProfit(int[] prices) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.maxProfit(new int[]{7,1,5,3,6,4}), 5, "example 1");
    _t(s.maxProfit(new int[]{7,6,4,3,1}), 0, "strictly decreasing");
    _t(s.maxProfit(new int[]{1,2}), 1, "two days");
    _t(s.maxProfit(new int[]{2,4,1}), 2, "peak before valley");
    _t(s.maxProfit(new int[]{3,2,6,5,0,3}), 4, "buy at 2 sell at 6");
    _t(s.maxProfit(new int[]{5}), 0, "single day");
    _done();
  }
}`},"product-except-self":{starter:`import java.util.*;
class Solution {
    public int[] productExceptSelf(int[] nums) {
        return new int[]{};
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.productExceptSelf(new int[]{1,2,3,4}), new int[]{24,12,8,6}, "example 1");
    _t(s.productExceptSelf(new int[]{-1,1,0,-3,3}), new int[]{0,0,9,0,0}, "contains zero");
    _t(s.productExceptSelf(new int[]{2,3}), new int[]{3,2}, "two elements");
    _t(s.productExceptSelf(new int[]{1,1,1,1}), new int[]{1,1,1,1}, "all ones");
    _t(s.productExceptSelf(new int[]{0,0}), new int[]{0,0}, "two zeros");
    _done();
  }
}`},"maximum-subarray":{starter:`import java.util.*;
class Solution {
    public int maxSubarray(int[] nums) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.maxSubarray(new int[]{-2,1,-3,4,-1,2,1,-5,4}), 6, "example 1");
    _t(s.maxSubarray(new int[]{1}), 1, "single element");
    _t(s.maxSubarray(new int[]{5,4,-1,7,8}), 23, "whole array");
    _t(s.maxSubarray(new int[]{-1}), -1, "single negative");
    _t(s.maxSubarray(new int[]{-2,-1}), -1, "all negative");
    _t(s.maxSubarray(new int[]{8,-19,5,-4,20}), 21, "restart mid-array");
    _done();
  }
}`},"merge-intervals":{starter:`import java.util.*;

class Solution {
    public int[][] mergeIntervals(int[][] intervals) {
        return new int[][]{};
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.mergeIntervals(new int[][]{{1,3},{2,6},{8,10},{15,18}}), new int[][]{{1,6},{8,10},{15,18}}, "example 1");
    _t(s.mergeIntervals(new int[][]{{1,4},{4,5}}), new int[][]{{1,5}}, "touching intervals");
    _t(s.mergeIntervals(new int[][]{{1,4},{2,3}}), new int[][]{{1,4}}, "fully contained");
    _t(s.mergeIntervals(new int[][]{{5,6},{1,2}}), new int[][]{{1,2},{5,6}}, "unsorted input");
    _t(s.mergeIntervals(new int[][]{{1,4},{0,4}}), new int[][]{{0,4}}, "same end");
    _t(s.mergeIntervals(new int[][]{{2,2}}), new int[][]{{2,2}}, "single point interval");
    _done();
  }
}`},"first-missing-positive":{starter:`import java.util.*;
class Solution {
    public int firstMissingPositive(int[] nums) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.firstMissingPositive(new int[]{1,2,0}), 3, "example 1");
    _t(s.firstMissingPositive(new int[]{3,4,-1,1}), 2, "example 2");
    _t(s.firstMissingPositive(new int[]{7,8,9,11,12}), 1, "no small positives");
    _t(s.firstMissingPositive(new int[]{1}), 2, "single element");
    _t(s.firstMissingPositive(new int[]{2,1}), 3, "complete pair");
    _t(s.firstMissingPositive(new int[]{1,1}), 2, "duplicates");
    _t(s.firstMissingPositive(new int[]{-5}), 1, "only negative");
    _done();
  }
}`},"single-number":{starter:`import java.util.*;
class Solution {
    public int singleNumber(int[] nums) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.singleNumber(new int[]{2,2,1}), 1, "example 1");
    _t(s.singleNumber(new int[]{4,1,2,1,2}), 4, "example 2");
    _t(s.singleNumber(new int[]{1}), 1, "single element");
    _t(s.singleNumber(new int[]{-1,-1,7}), 7, "negative pairs");
    _t(s.singleNumber(new int[]{0,1,0}), 1, "zero pair");
    _done();
  }
}`},"counting-bits":{starter:`import java.util.*;
class Solution {
    public int[] countBits(int n) {
        return new int[]{};
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.countBits(2), new int[]{0,1,1}, "example 1");
    _t(s.countBits(5), new int[]{0,1,1,2,1,2}, "example 2");
    _t(s.countBits(0), new int[]{0}, "just zero");
    _t(s.countBits(8), new int[]{0,1,1,2,1,2,2,3,1}, "powers of two reset");
    _done();
  }
}`},"climbing-stairs":{starter:`import java.util.*;
class Solution {
    public int climbStairs(int n) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.climbStairs(2), 2, "example 1");
    _t(s.climbStairs(3), 3, "example 2");
    _t(s.climbStairs(1), 1, "one step");
    _t(s.climbStairs(5), 8, "five steps");
    _t(s.climbStairs(10), 89, "ten steps");
    _t(s.climbStairs(45), 1836311903, "large n needs O(n)");
    _done();
  }
}`},"house-robber":{starter:`import java.util.*;
class Solution {
    public int rob(int[] nums) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.rob(new int[]{1,2,3,1}), 4, "example 1");
    _t(s.rob(new int[]{2,7,9,3,1}), 12, "example 2");
    _t(s.rob(new int[]{5}), 5, "single house");
    _t(s.rob(new int[]{2,1,1,2}), 4, "skip two in a row");
    _t(s.rob(new int[]{2,100,3,100,4}), 200, "alternating riches");
    _t(s.rob(new int[]{0,0,0}), 0, "nothing to steal");
    _done();
  }
}`},"coin-change":{starter:`import java.util.*;
class Solution {
    public int coinChange(int[] coins, int amount) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.coinChange(new int[]{1,2,5},11), 3, "example 1");
    _t(s.coinChange(new int[]{2},3), -1, "impossible");
    _t(s.coinChange(new int[]{1},0), 0, "zero amount");
    _t(s.coinChange(new int[]{1,3,4},6), 2, "greedy fails here");
    _t(s.coinChange(new int[]{2,5,10,1},27), 4, "27 = 10+10+5+2");
    _t(s.coinChange(new int[]{186,419,83,408},6249), 20, "large stress case");
    _done();
  }
}`},"longest-increasing-subsequence":{starter:`import java.util.*;
class Solution {
    public int lengthOfLIS(int[] nums) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.lengthOfLIS(new int[]{10,9,2,5,3,7,101,18}), 4, "example 1");
    _t(s.lengthOfLIS(new int[]{0,1,0,3,2,3}), 4, "example 2");
    _t(s.lengthOfLIS(new int[]{7,7,7,7,7,7,7}), 1, "all equal");
    _t(s.lengthOfLIS(new int[]{4,10,4,3,8,9}), 3, "[4,8,9]");
    _t(s.lengthOfLIS(new int[]{1}), 1, "single element");
    _t(s.lengthOfLIS(new int[]{5,4,3,2,1}), 1, "strictly decreasing");
    _done();
  }
}`},"edit-distance":{starter:`import java.util.*;
class Solution {
    public int minDistance(String word1, String word2) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.minDistance("horse","ros"), 3, "example 1");
    _t(s.minDistance("intention","execution"), 5, "example 2");
    _t(s.minDistance("","abc"), 3, "all inserts");
    _t(s.minDistance("abc",""), 3, "all deletes");
    _t(s.minDistance("abc","abc"), 0, "identical");
    _t(s.minDistance("park","spake"), 3, "mixed operations");
    _done();
  }
}`},"regex-matching":{starter:`import java.util.*;
class Solution {
    public boolean isMatch(String s, String p) {
        return false;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.isMatch("aa","a"), false, "example 1");
    _t(s.isMatch("aa","a*"), true, "star expands");
    _t(s.isMatch("ab",".*"), true, "dot star");
    _t(s.isMatch("aab","c*a*b"), true, "zero c then two a");
    _t(s.isMatch("mississippi","mis*is*p*."), false, "classic false case");
    _t(s.isMatch("","c*"), true, "empty string vs star");
    _t(s.isMatch("ab",".*c"), false, "trailing literal unmatched");
    _done();
  }
}`},"number-of-islands":{starter:`import java.util.*;
class Solution {
    public int numIslands(char[][] grid) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.numIslands(new char[][]{{'1','1','1','1','0'},{'1','1','0','1','0'},{'1','1','0','0','0'},{'0','0','0','0','0'}}), 1, "one island");
    _t(s.numIslands(new char[][]{{'1','1','0','0','0'},{'1','1','0','0','0'},{'0','0','1','0','0'},{'0','0','0','1','1'}}), 3, "three islands");
    _t(s.numIslands(new char[][]{{'1'}}), 1, "single land cell");
    _t(s.numIslands(new char[][]{{'0'}}), 0, "single water cell");
    _t(s.numIslands(new char[][]{{'1','0','1'},{'0','1','0'},{'1','0','1'}}), 5, "diagonals do not connect");
    _done();
  }
}`},"course-schedule":{starter:`import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        return false;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.canFinish(2,new int[][]{{1,0}}), true, "simple chain");
    _t(s.canFinish(2,new int[][]{{1,0},{0,1}}), false, "two-node cycle");
    _t(s.canFinish(5,new int[][]{{1,4},{2,4},{3,1},{3,2}}), true, "diamond DAG");
    _t(s.canFinish(1,new int[][]{}), true, "no prerequisites");
    _t(s.canFinish(3,new int[][]{{0,1},{1,2},{2,0}}), false, "three-node cycle");
    _t(s.canFinish(4,new int[][]{{1,0},{2,1},{3,2}}), true, "long chain");
    _done();
  }
}`},"word-ladder":{starter:`import java.util.*;

class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.ladderLength("hit","cog",Arrays.asList("hot","dot","dog","lot","log","cog")), 5, "example 1");
    _t(s.ladderLength("hit","cog",Arrays.asList("hot","dot","dog","lot","log")), 0, "endWord missing");
    _t(s.ladderLength("a","c",Arrays.asList("a","b","c")), 2, "single letter words");
    _t(s.ladderLength("hot","dog",Arrays.asList("hot","dog")), 0, "no bridge word");
    _t(s.ladderLength("hot","dot",Arrays.asList("dot")), 2, "direct neighbor");
    _done();
  }
}`},"group-anagrams":{starter:`import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        return null;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  // normalize list of groups of strings: sort chars within each string, sort group, sort groups
  static List<List<String>> _norm(List<List<String>> a) {
    List<List<String>> res = new ArrayList<>();
    for (List<String> g : a) {
      List<String> gg = new ArrayList<>();
      for (String w : g) { char[] c = w.toCharArray(); Arrays.sort(c); gg.add(new String(c)); }
      Collections.sort(gg);
      res.add(gg);
    }
    res.sort((x,y)->x.toString().compareTo(y.toString()));
    return res;
  }
  static List<List<String>> normExpected(List<List<String>> a) { return _norm(a); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(_norm(s.groupAnagrams(new String[]{"eat","tea","tan","ate","nat","bat"})), normExpected(Arrays.asList(Arrays.asList("ate","eat","tea"),Arrays.asList("bat"),Arrays.asList("nat","tan"))), "example 1");
    _t(_norm(s.groupAnagrams(new String[]{""})), normExpected(Arrays.asList(Arrays.asList(""))), "empty string");
    _t(_norm(s.groupAnagrams(new String[]{"a"})), normExpected(Arrays.asList(Arrays.asList("a"))), "single string");
    _t(_norm(s.groupAnagrams(new String[]{"ab","ba","ab"})), normExpected(Arrays.asList(Arrays.asList("ab","ab","ba"))), "duplicate words");
    _t(_norm(s.groupAnagrams(new String[]{"abc","def"})), normExpected(Arrays.asList(Arrays.asList("abc"),Arrays.asList("def"))), "no anagrams");
    _done();
  }
}`},"top-k-frequent":{starter:`import java.util.*;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        return new int[]{};
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static int[] _sort(int[] a) { int[] c = a.clone(); Arrays.sort(c); return c; }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(_sort(s.topKFrequent(new int[]{1,1,1,2,2,3},2)), new int[]{1,2}, "example 1");
    _t(_sort(s.topKFrequent(new int[]{1},1)), new int[]{1}, "single element");
    _t(_sort(s.topKFrequent(new int[]{4,4,4,5,5,6},1)), new int[]{4}, "top one");
    _t(_sort(s.topKFrequent(new int[]{1,2},2)), new int[]{1,2}, "all elements");
    _t(_sort(s.topKFrequent(new int[]{-1,-1,2,2,2},2)), new int[]{-1,2}, "negatives");
    _done();
  }
}`},"longest-consecutive-sequence":{starter:`import java.util.*;
class Solution {
    public int longestConsecutive(int[] nums) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.longestConsecutive(new int[]{100,4,200,1,3,2}), 4, "example 1");
    _t(s.longestConsecutive(new int[]{0,3,7,2,5,8,4,6,0,1}), 9, "example 2");
    _t(s.longestConsecutive(new int[]{}), 0, "empty array");
    _t(s.longestConsecutive(new int[]{1,2,0,1}), 3, "duplicates");
    _t(s.longestConsecutive(new int[]{5}), 1, "single element");
    _t(s.longestConsecutive(new int[]{-2,-1,0,1}), 4, "negative run");
    _done();
  }
}`},"reverse-linked-list":{starter:`// Provided: class ListNode { int val; ListNode next; ListNode(int val) {...} }
import java.util.*;
class Solution {
    public ListNode reverseList(ListNode head) {
        return null;
    }
}`,tests:`class ListNode {
  int val; ListNode next;
  ListNode() {}
  ListNode(int val) { this.val = val; }
}

public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static ListNode _build(int[] arr) {
    ListNode h = new ListNode(); ListNode c = h;
    for (int v : arr) { c.next = new ListNode(v); c = c.next; }
    return h.next;
  }
  static int[] _toArr(ListNode n) {
    List<Integer> o = new ArrayList<>();
    while (n != null) { o.add(n.val); n = n.next; }
    int[] r = new int[o.size()];
    for (int i = 0; i < r.length; i++) r[i] = o.get(i);
    return r;
  }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(_toArr(s.reverseList(_build(new int[]{1,2,3,4,5}))), new int[]{5,4,3,2,1}, "five nodes");
    _t(_toArr(s.reverseList(_build(new int[]{1,2}))), new int[]{2,1}, "two nodes");
    _t(_toArr(s.reverseList(_build(new int[]{}))), new int[]{}, "empty list");
    _t(_toArr(s.reverseList(_build(new int[]{7}))), new int[]{7}, "single node");
    _done();
  }
}`},"linked-list-cycle":{starter:`// Provided: class ListNode { int val; ListNode next; ListNode(int val) {...} }
import java.util.*;
class Solution {
    public boolean hasCycle(ListNode head) {
        return false;
    }
}`,tests:`class ListNode {
  int val; ListNode next;
  ListNode() {}
  ListNode(int val) { this.val = val; }
}

public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static ListNode _build(int[] arr) {
    ListNode h = new ListNode(); ListNode c = h;
    for (int v : arr) { c.next = new ListNode(v); c = c.next; }
    return h.next;
  }
  static int[] _toArr(ListNode n) {
    List<Integer> o = new ArrayList<>();
    while (n != null) { o.add(n.val); n = n.next; }
    int[] r = new int[o.size()];
    for (int i = 0; i < r.length; i++) r[i] = o.get(i);
    return r;
  }
  public static void main(String[] args) {
    Solution s = new Solution();
    ListNode _h=_build(new int[]{3,2,0,-4}); ListNode _tail=_h;
    while (_tail.next!=null) _tail=_tail.next;
    _tail.next=_h.next;
    _t(s.hasCycle(_h), true, "cycle to index 1");
    _t(s.hasCycle(_build(new int[]{1,2})), false, "no cycle");
    _t(s.hasCycle(_build(new int[]{})), false, "empty list");
    ListNode _sn=_build(new int[]{1}); _sn.next=_sn;
    _t(s.hasCycle(_sn), true, "self loop");
    _done();
  }
}`},"merge-k-sorted-lists":{starter:`import java.util.*;
// Provided: class ListNode { int val; ListNode next; ListNode(int val) {...} }
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        return null;
    }
}`,tests:`class ListNode {
  int val; ListNode next;
  ListNode() {}
  ListNode(int val) { this.val = val; }
}

public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static ListNode _build(int[] arr) {
    ListNode h = new ListNode(); ListNode c = h;
    for (int v : arr) { c.next = new ListNode(v); c = c.next; }
    return h.next;
  }
  static int[] _toArr(ListNode n) {
    List<Integer> o = new ArrayList<>();
    while (n != null) { o.add(n.val); n = n.next; }
    int[] r = new int[o.size()];
    for (int i = 0; i < r.length; i++) r[i] = o.get(i);
    return r;
  }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(_toArr(s.mergeKLists(new ListNode[]{_build(new int[]{1,4,5}),_build(new int[]{1,3,4}),_build(new int[]{2,6})})), new int[]{1,1,2,3,4,4,5,6}, "example 1");
    _t(_toArr(s.mergeKLists(new ListNode[]{})), new int[]{}, "no lists");
    _t(_toArr(s.mergeKLists(new ListNode[]{_build(new int[]{})})), new int[]{}, "one empty list");
    _t(_toArr(s.mergeKLists(new ListNode[]{_build(new int[]{1}),_build(new int[]{0})})), new int[]{0,1}, "two singletons");
    _t(_toArr(s.mergeKLists(new ListNode[]{_build(new int[]{-2,-1}),_build(new int[]{}),_build(new int[]{-3})})), new int[]{-3,-2,-1}, "negatives and empty");
    _done();
  }
}`},"palindrome-number":{starter:`import java.util.*;
class Solution {
    public boolean isPalindromeNumber(int x) {
        return false;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.isPalindromeNumber(121), true, "example 1");
    _t(s.isPalindromeNumber(-121), false, "negative");
    _t(s.isPalindromeNumber(10), false, "trailing zero");
    _t(s.isPalindromeNumber(0), true, "zero");
    _t(s.isPalindromeNumber(1221), true, "even digits");
    _t(s.isPalindromeNumber(1234567899), false, "large number");
    _done();
  }
}`},"basic-calculator":{starter:`import java.util.*;
class Solution {
    public int calculate(String s) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.calculate("1 + 1"), 2, "example 1");
    _t(s.calculate(" 2-1 + 2 "), 3, "example 2");
    _t(s.calculate("(1+(4+5+2)-3)+(6+8)"), 23, "nested parens");
    _t(s.calculate("-2+ 1"), -1, "unary minus");
    _t(s.calculate("- (3 + (4 + 5))"), -12, "unary minus on group");
    _t(s.calculate("2147483647"), 2147483647, "single big number");
    _done();
  }
}`},"knn-classifier":{starter:`import java.util.*;

class Solution {
    public int knnPredict(int[][] XTrain, int[] yTrain, double[] x, int k) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    int[][] _X = {{1,1},{2,2},{8,8},{9,9}}; int[] _y = {0,0,1,1};
    _t(s.knnPredict(_X,_y,new double[]{1.5,1.5},3), 0, "near cluster 0");
    _t(s.knnPredict(_X,_y,new double[]{8.5,8.5},3), 1, "near cluster 1");
    _t(s.knnPredict(_X,_y,new double[]{2,2},1), 0, "exact match k=1");
    _t(s.knnPredict(new int[][]{{0},{1},{2},{10}},new int[]{0,0,0,1},new double[]{9},1), 1, "1D nearest outlier");
    _t(s.knnPredict(new int[][]{{1,1},{1,2},{2,1},{5,5},{5,6}},new int[]{0,0,0,1,1},new double[]{4.5,5},3), 1, "five points k=3");
    _done();
  }
}`},"gradient-descent-linear":{starter:`import java.util.*;
class Solution {
    public double[] gradientDescent(double[] X, double[] y, double lr, int epochs) {
        return new double[]{0,0};
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    double[] r1 = s.gradientDescent(new double[]{1,2,3,4}, new double[]{3,5,7,9}, 0.01, 5000);
    _t((int)Math.round(r1[0]*5+r1[1]), 11, "predict x=5 on y=2x+1");
    _t((int)Math.round(r1[0]*10+r1[1]), 21, "predict x=10 on y=2x+1");
    double[] r2 = s.gradientDescent(new double[]{0,1,2,3}, new double[]{1,1,1,1}, 0.01, 5000);
    _t((int)Math.round(r2[0]*7+r2[1]), 1, "flat data learns w=0 b=1");
    double[] r3 = s.gradientDescent(new double[]{1,2,3}, new double[]{-2,-4,-6}, 0.01, 5000);
    _t((int)Math.round(r3[0]*4+r3[1]), -8, "negative slope y=-2x");
    _done();
  }
}`},"min-stack":{starter:`import java.util.*;

class MinStack {
    public MinStack() {

    }
    public void push(int val) {

    }
    public void pop() {

    }
    public int top() {
        return 0;
    }
    public int getMin() {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    MinStack _s = new MinStack();
    _s.push(-2); _s.push(0); _s.push(-3);
    _t(_s.getMin(), -3, "min after pushes");
    _s.pop();
    _t(_s.top(), 0, "top after pop");
    _t(_s.getMin(), -2, "min after pop");
    MinStack _s2 = new MinStack();
    _s2.push(5); _s2.push(5); _s2.pop();
    _t(_s2.getMin(), 5, "duplicate minimums");
    _s2.push(3); _s2.push(7);
    _t(_s2.getMin(), 3, "min not at top");
    _done();
  }
}`},"lru-cache":{starter:`import java.util.*;

class LRUCache {
    public LRUCache(int capacity) {

    }
    public int get(int key) {
        return 0;
    }
    public void put(int key, int value) {

    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    LRUCache _c = new LRUCache(2);
    _c.put(1,1); _c.put(2,2);
    _t(_c.get(1), 1, "get refreshes key 1");
    _c.put(3,3);
    _t(_c.get(2), -1, "key 2 evicted");
    _c.put(4,4);
    _t(_c.get(1), -1, "key 1 evicted");
    _t(_c.get(3), 3, "key 3 alive");
    _t(_c.get(4), 4, "key 4 alive");
    LRUCache _c2 = new LRUCache(1);
    _c2.put(2,1);
    _t(_c2.get(2), 1, "capacity one");
    _c2.put(2,99);
    _t(_c2.get(2), 99, "update in place");
    _done();
  }
}`},subsets:{starter:`import java.util.*;

class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        return null;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static List<Integer> _L(int... a) { List<Integer> l=new ArrayList<>(); for (int x:a) l.add(x); return l; }
  @SafeVarargs static List<List<Integer>> _LL(List<Integer>... a) { return new ArrayList<>(Arrays.asList(a)); }
  static List<List<Integer>> _norm(List<List<Integer>> a) {
    List<List<Integer>> res = new ArrayList<>();
    for (List<Integer> g : a) { List<Integer> gg = new ArrayList<>(g); Collections.sort(gg); res.add(gg); }
    res.sort((x,y)->{ int m=Math.min(x.size(),y.size());
      for (int i=0;i<m;i++) if (!x.get(i).equals(y.get(i))) return x.get(i)-y.get(i);
      return x.size()-y.size(); });
    return res;
  }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(_norm(s.subsets(new int[]{1,2,3})), _norm(_LL(_L(),_L(1),_L(1,2),_L(1,2,3),_L(1,3),_L(2),_L(2,3),_L(3))), "example 1");
    _t(_norm(s.subsets(new int[]{0})), _norm(_LL(_L(),_L(0))), "single element");
    _t(s.subsets(new int[]{1,2,3,4,5}).size(), 32, "2^5 subsets");
    _done();
  }
}`},"combination-sum":{starter:`import java.util.*;

class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        return null;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static List<Integer> _L(int... a) { List<Integer> l=new ArrayList<>(); for (int x:a) l.add(x); return l; }
  @SafeVarargs static List<List<Integer>> _LL(List<Integer>... a) { return new ArrayList<>(Arrays.asList(a)); }
  static List<List<Integer>> _norm(List<List<Integer>> a) {
    List<List<Integer>> res = new ArrayList<>();
    for (List<Integer> g : a) { List<Integer> gg = new ArrayList<>(g); Collections.sort(gg); res.add(gg); }
    res.sort((x,y)->{ int m=Math.min(x.size(),y.size());
      for (int i=0;i<m;i++) if (!x.get(i).equals(y.get(i))) return x.get(i)-y.get(i);
      return x.size()-y.size(); });
    return res;
  }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(_norm(s.combinationSum(new int[]{2,3,6,7},7)), _norm(_LL(_L(2,2,3),_L(7))), "example 1");
    _t(_norm(s.combinationSum(new int[]{2,3,5},8)), _norm(_LL(_L(2,2,2,2),_L(2,3,3),_L(3,5))), "example 2");
    _t(_norm(s.combinationSum(new int[]{2},1)), _norm(_LL()), "impossible");
    _t(_norm(s.combinationSum(new int[]{3},9)), _norm(_LL(_L(3,3,3))), "single candidate reused");
    _done();
  }
}`},"n-queens":{starter:`import java.util.*;

class Solution {
    public List<List<String>> solveNQueens(int n) {
        return null;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static List<String> _L(String... a) { return new ArrayList<>(Arrays.asList(a)); }
  @SafeVarargs static List<List<String>> _LL(List<String>... a) { return new ArrayList<>(Arrays.asList(a)); }
  static List<List<String>> _norm(List<List<String>> a) {
    List<List<String>> res = new ArrayList<>();
    for (List<String> g : a) { List<String> gg = new ArrayList<>(g); Collections.sort(gg); res.add(gg); }
    res.sort((x,y)->x.toString().compareTo(y.toString()));
    return res;
  }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(_norm(s.solveNQueens(4)), _norm(_LL(_L("..Q.","Q...","...Q",".Q.."),_L(".Q..","...Q","Q...","..Q."))), "n=4 both solutions");
    _t(_norm(s.solveNQueens(1)), _norm(_LL(_L("Q"))), "n=1");
    _t(_norm(s.solveNQueens(2)), _norm(_LL()), "n=2 impossible");
    _t(_norm(s.solveNQueens(3)), _norm(_LL()), "n=3 impossible");
    _t(s.solveNQueens(5).size(), 10, "n=5 has 10 solutions");
    _t(s.solveNQueens(6).size(), 4, "n=6 has 4 solutions");
    _done();
  }
}`},"longest-substring-no-repeat":{starter:`import java.util.*;
class Solution {
    public int lengthOfLongestSubstring(String s) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.lengthOfLongestSubstring("abcabcbb"), 3, "example 1");
    _t(s.lengthOfLongestSubstring("bbbbb"), 1, "all same char");
    _t(s.lengthOfLongestSubstring("pwwkew"), 3, "example 3");
    _t(s.lengthOfLongestSubstring(""), 0, "empty string");
    _t(s.lengthOfLongestSubstring("au"), 2, "two distinct");
    _t(s.lengthOfLongestSubstring("dvdf"), 3, "window left jump");
    _t(s.lengthOfLongestSubstring("abba"), 2, "stale index trap");
    _done();
  }
}`},"sliding-window-maximum":{starter:`import java.util.*;
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        return new int[]{};
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.maxSlidingWindow(new int[]{1,3,-1,-3,5,3,6,7},3), new int[]{3,3,5,5,6,7}, "example 1");
    _t(s.maxSlidingWindow(new int[]{1},1), new int[]{1}, "single element");
    _t(s.maxSlidingWindow(new int[]{1,-1},1), new int[]{1,-1}, "window of one");
    _t(s.maxSlidingWindow(new int[]{9,11},2), new int[]{11}, "increasing pair");
    _t(s.maxSlidingWindow(new int[]{4,-2},2), new int[]{4}, "decreasing pair");
    _t(s.maxSlidingWindow(new int[]{7,2,4},2), new int[]{7,4}, "leading max expires");
    _done();
  }
}`},"minimum-window-substring":{starter:`import java.util.*;
class Solution {
    public String minWindow(String s, String t) {
        return "";
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.minWindow("ADOBECODEBANC","ABC"), "BANC", "example 1");
    _t(s.minWindow("a","a"), "a", "single char match");
    _t(s.minWindow("a","aa"), "", "not enough chars");
    _t(s.minWindow("ab","b"), "b", "suffix window");
    _t(s.minWindow("bba","ab"), "ba", "duplicates in s");
    _t(s.minWindow("aaflslflsldkalskaaa","aaa"), "aaa", "repeated requirement");
    _done();
  }
}`},"binary-search":{starter:`import java.util.*;
class Solution {
    public int search(int[] nums, int target) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.search(new int[]{-1,0,3,5,9,12},9), 4, "example 1");
    _t(s.search(new int[]{-1,0,3,5,9,12},2), -1, "not found");
    _t(s.search(new int[]{5},5), 0, "single element hit");
    _t(s.search(new int[]{5},-5), -1, "single element miss");
    _t(s.search(new int[]{1,3},3), 1, "two elements right");
    _t(s.search(new int[]{1,3},1), 0, "two elements left");
    _done();
  }
}`},"search-rotated-array":{starter:`import java.util.*;
class Solution {
    public int searchRotated(int[] nums, int target) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.searchRotated(new int[]{4,5,6,7,0,1,2},0), 4, "example 1");
    _t(s.searchRotated(new int[]{4,5,6,7,0,1,2},3), -1, "not present");
    _t(s.searchRotated(new int[]{1},0), -1, "single miss");
    _t(s.searchRotated(new int[]{3,1},1), 1, "two rotated");
    _t(s.searchRotated(new int[]{5,1,3},5), 0, "target at pivot start");
    _t(s.searchRotated(new int[]{1,2,3,4,5},4), 3, "no rotation");
    _done();
  }
}`},"kth-largest-element":{starter:`import java.util.*;
class Solution {
    public int findKthLargest(int[] nums, int k) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.findKthLargest(new int[]{3,2,1,5,6,4},2), 5, "example 1");
    _t(s.findKthLargest(new int[]{3,2,3,1,2,4,5,5,6},4), 4, "with duplicates");
    _t(s.findKthLargest(new int[]{1},1), 1, "single element");
    _t(s.findKthLargest(new int[]{7,6,5,4,3,2,1},5), 3, "descending input");
    _t(s.findKthLargest(new int[]{2,1},2), 1, "k equals length");
    _done();
  }
}`},"median-two-sorted-arrays":{starter:`import java.util.*;
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        return 0.0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.findMedianSortedArrays(new int[]{1,3},new int[]{2}), 2.0, "example 1");
    _t(s.findMedianSortedArrays(new int[]{1,2},new int[]{3,4}), 2.5, "example 2");
    _t(s.findMedianSortedArrays(new int[]{0,0},new int[]{0,0}), 0.0, "all zeros");
    _t(s.findMedianSortedArrays(new int[]{},new int[]{1}), 1.0, "first empty");
    _t(s.findMedianSortedArrays(new int[]{2},new int[]{}), 2.0, "second empty");
    _t(s.findMedianSortedArrays(new int[]{1,2},new int[]{-1,3}), 1.5, "interleaved");
    _done();
  }
}`},"valid-parentheses":{starter:`import java.util.*;
class Solution {
    public boolean isValid(String s) {
        return false;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.isValid("()"), true, "simple pair");
    _t(s.isValid("()[]{}"), true, "three pairs");
    _t(s.isValid("(]"), false, "wrong type");
    _t(s.isValid("([)]"), false, "wrong order");
    _t(s.isValid("{[]}"), true, "nested");
    _t(s.isValid("("), false, "unclosed opener");
    _t(s.isValid("]"), false, "closer without opener");
    _done();
  }
}`},"daily-temperatures":{starter:`import java.util.*;
class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        return new int[]{};
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.dailyTemperatures(new int[]{73,74,75,71,69,72,76,73}), new int[]{1,1,4,2,1,1,0,0}, "example 1");
    _t(s.dailyTemperatures(new int[]{30,40,50,60}), new int[]{1,1,1,0}, "increasing");
    _t(s.dailyTemperatures(new int[]{90,60,30}), new int[]{0,0,0}, "decreasing");
    _t(s.dailyTemperatures(new int[]{50}), new int[]{0}, "single day");
    _t(s.dailyTemperatures(new int[]{70,70,75}), new int[]{2,1,0}, "equal temps wait");
    _done();
  }
}`},"largest-rectangle-histogram":{starter:`import java.util.*;
class Solution {
    public int largestRectangleArea(int[] heights) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.largestRectangleArea(new int[]{2,1,5,6,2,3}), 10, "example 1");
    _t(s.largestRectangleArea(new int[]{2,4}), 4, "two bars");
    _t(s.largestRectangleArea(new int[]{1}), 1, "single bar");
    _t(s.largestRectangleArea(new int[]{2,2,2}), 6, "flat histogram");
    _t(s.largestRectangleArea(new int[]{5,4,1,2}), 8, "descending then rise");
    _t(s.largestRectangleArea(new int[]{0,9}), 9, "zero-height bar");
    _done();
  }
}`},"max-depth-binary-tree":{starter:`// Provided: class TreeNode { int val; TreeNode left, right; TreeNode(int val) {...} }
import java.util.*;
class Solution {
    public int maxDepth(TreeNode root) {
        return 0;
    }
}`,tests:`class TreeNode {
  int val; TreeNode left, right;
  TreeNode(int val) { this.val = val; }
}

public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static TreeNode _tree(Integer[] vals) {
    if (vals.length == 0 || vals[0] == null) return null;
    TreeNode root = new TreeNode(vals[0]);
    Queue<TreeNode> q = new LinkedList<>(); q.add(root);
    int i = 1;
    while (!q.isEmpty() && i < vals.length) {
      TreeNode n = q.poll();
      if (i < vals.length && vals[i] != null) { n.left = new TreeNode(vals[i]); q.add(n.left); }
      i++;
      if (i < vals.length && vals[i] != null) { n.right = new TreeNode(vals[i]); q.add(n.right); }
      i++;
    }
    return root;
  }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.maxDepth(_tree(new Integer[]{3,9,20,null,null,15,7})), 3, "example 1");
    _t(s.maxDepth(_tree(new Integer[]{1,null,2})), 2, "right skewed");
    _t(s.maxDepth(_tree(new Integer[]{})), 0, "empty tree");
    _t(s.maxDepth(_tree(new Integer[]{0})), 1, "single node");
    _t(s.maxDepth(_tree(new Integer[]{1,2,3,4,null,null,null,5})), 4, "left-heavy chain");
    _done();
  }
}`},"validate-bst":{starter:`// Provided: class TreeNode { int val; TreeNode left, right; TreeNode(int val) {...} }
import java.util.*;
class Solution {
    public boolean isValidBST(TreeNode root) {
        return false;
    }
}`,tests:`class TreeNode {
  int val; TreeNode left, right;
  TreeNode(int val) { this.val = val; }
}

public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static TreeNode _tree(Integer[] vals) {
    if (vals.length == 0 || vals[0] == null) return null;
    TreeNode root = new TreeNode(vals[0]);
    Queue<TreeNode> q = new LinkedList<>(); q.add(root);
    int i = 1;
    while (!q.isEmpty() && i < vals.length) {
      TreeNode n = q.poll();
      if (i < vals.length && vals[i] != null) { n.left = new TreeNode(vals[i]); q.add(n.left); }
      i++;
      if (i < vals.length && vals[i] != null) { n.right = new TreeNode(vals[i]); q.add(n.right); }
      i++;
    }
    return root;
  }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.isValidBST(_tree(new Integer[]{2,1,3})), true, "example 1");
    _t(s.isValidBST(_tree(new Integer[]{5,1,4,null,null,3,6})), false, "example 2");
    _t(s.isValidBST(_tree(new Integer[]{1})), true, "single node");
    _t(s.isValidBST(_tree(new Integer[]{5,4,6,null,null,3,7})), false, "deep violation");
    _t(s.isValidBST(_tree(new Integer[]{2,2,2})), false, "duplicates invalid");
    _t(s.isValidBST(_tree(new Integer[]{-10,-20,0})), true, "negative values");
    _done();
  }
}`},"level-order-traversal":{starter:`import java.util.*;
// Provided: class TreeNode { int val; TreeNode left, right; TreeNode(int val) {...} }
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        return null;
    }
}`,tests:`class TreeNode {
  int val; TreeNode left, right;
  TreeNode(int val) { this.val = val; }
}

public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static TreeNode _tree(Integer[] vals) {
    if (vals.length == 0 || vals[0] == null) return null;
    TreeNode root = new TreeNode(vals[0]);
    Queue<TreeNode> q = new LinkedList<>(); q.add(root);
    int i = 1;
    while (!q.isEmpty() && i < vals.length) {
      TreeNode n = q.poll();
      if (i < vals.length && vals[i] != null) { n.left = new TreeNode(vals[i]); q.add(n.left); }
      i++;
      if (i < vals.length && vals[i] != null) { n.right = new TreeNode(vals[i]); q.add(n.right); }
      i++;
    }
    return root;
  }
  static List<Integer> _L(int... a) { List<Integer> l=new ArrayList<>(); for (int x:a) l.add(x); return l; }
  @SafeVarargs static List<List<Integer>> _LL(List<Integer>... a) { return new ArrayList<>(Arrays.asList(a)); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.levelOrder(_tree(new Integer[]{3,9,20,null,null,15,7})), _LL(_L(3),_L(9,20),_L(15,7)), "example 1");
    _t(s.levelOrder(_tree(new Integer[]{1})), _LL(_L(1)), "single node");
    _t(s.levelOrder(_tree(new Integer[]{})), _LL(), "empty tree");
    _t(s.levelOrder(_tree(new Integer[]{1,2,null,3})), _LL(_L(1),_L(2),_L(3)), "left chain");
    _t(s.levelOrder(_tree(new Integer[]{1,2,3,4,5,6,7})), _LL(_L(1),_L(2,3),_L(4,5,6,7)), "perfect tree");
    _done();
  }
}`},"binary-tree-max-path-sum":{starter:`// Provided: class TreeNode { int val; TreeNode left, right; TreeNode(int val) {...} }
import java.util.*;
class Solution {
    public int maxPathSum(TreeNode root) {
        return 0;
    }
}`,tests:`class TreeNode {
  int val; TreeNode left, right;
  TreeNode(int val) { this.val = val; }
}

public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static TreeNode _tree(Integer[] vals) {
    if (vals.length == 0 || vals[0] == null) return null;
    TreeNode root = new TreeNode(vals[0]);
    Queue<TreeNode> q = new LinkedList<>(); q.add(root);
    int i = 1;
    while (!q.isEmpty() && i < vals.length) {
      TreeNode n = q.poll();
      if (i < vals.length && vals[i] != null) { n.left = new TreeNode(vals[i]); q.add(n.left); }
      i++;
      if (i < vals.length && vals[i] != null) { n.right = new TreeNode(vals[i]); q.add(n.right); }
      i++;
    }
    return root;
  }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.maxPathSum(_tree(new Integer[]{1,2,3})), 6, "example 1");
    _t(s.maxPathSum(_tree(new Integer[]{-10,9,20,null,null,15,7})), 42, "example 2");
    _t(s.maxPathSum(_tree(new Integer[]{-3})), -3, "single negative node");
    _t(s.maxPathSum(_tree(new Integer[]{2,-1})), 2, "skip negative child");
    _t(s.maxPathSum(_tree(new Integer[]{-2,-1})), -1, "all negative picks max node");
    _done();
  }
}`},"valid-palindrome":{starter:`import java.util.*;
class Solution {
    public boolean isPalindrome(String s) {
        return false;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.isPalindrome("A man, a plan, a canal: Panama"), true, "example 1");
    _t(s.isPalindrome("race a car"), false, "example 2");
    _t(s.isPalindrome(" "), true, "whitespace only");
    _t(s.isPalindrome("0P"), false, "digit vs letter");
    _t(s.isPalindrome("ab_a"), true, "underscore ignored");
    _t(s.isPalindrome("a"), true, "single char");
    _done();
  }
}`},"three-sum":{starter:`import java.util.*;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        return null;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static List<Integer> _L(int... a) { List<Integer> l=new ArrayList<>(); for (int x:a) l.add(x); return l; }
  @SafeVarargs static List<List<Integer>> _LL(List<Integer>... a) { return new ArrayList<>(Arrays.asList(a)); }
  static List<List<Integer>> _norm(List<List<Integer>> a) {
    List<List<Integer>> res = new ArrayList<>();
    for (List<Integer> g : a) { List<Integer> gg = new ArrayList<>(g); Collections.sort(gg); res.add(gg); }
    res.sort((x,y)->{ for (int i=0;i<3;i++) if (!x.get(i).equals(y.get(i))) return x.get(i)-y.get(i); return 0; });
    return res;
  }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(_norm(s.threeSum(new int[]{-1,0,1,2,-1,-4})), _norm(_LL(_L(-1,-1,2),_L(-1,0,1))), "example 1");
    _t(_norm(s.threeSum(new int[]{0,1,1})), _norm(_LL()), "no solution");
    _t(_norm(s.threeSum(new int[]{0,0,0})), _norm(_LL(_L(0,0,0))), "all zeros");
    _t(_norm(s.threeSum(new int[]{-2,0,1,1,2})), _norm(_LL(_L(-2,0,2),_L(-2,1,1))), "two triplets");
    _t(_norm(s.threeSum(new int[]{0,0,0,0})), _norm(_LL(_L(0,0,0))), "extra zeros deduped");
    _done();
  }
}`},"container-most-water":{starter:`import java.util.*;
class Solution {
    public int maxArea(int[] height) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.maxArea(new int[]{1,8,6,2,5,4,8,3,7}), 49, "example 1");
    _t(s.maxArea(new int[]{1,1}), 1, "two lines");
    _t(s.maxArea(new int[]{4,3,2,1,4}), 16, "equal ends");
    _t(s.maxArea(new int[]{1,2,1}), 2, "small peak");
    _t(s.maxArea(new int[]{2,3,4,5,18,17,6}), 17, "tall middle pair");
    _done();
  }
}`},"trapping-rain-water":{starter:`import java.util.*;
class Solution {
    public int trap(int[] height) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.trap(new int[]{0,1,0,2,1,0,1,3,2,1,2,1}), 6, "example 1");
    _t(s.trap(new int[]{4,2,0,3,2,5}), 9, "example 2");
    _t(s.trap(new int[]{1,2,3}), 0, "monotonic — traps nothing");
    _t(s.trap(new int[]{3}), 0, "single bar");
    _t(s.trap(new int[]{5,4,1,2}), 1, "shallow right wall");
    _t(s.trap(new int[]{2,0,2}), 2, "simple valley");
    _done();
  }
}`},"rotate-array":{starter:`import java.util.*;
class Solution {
    public int[] rotate(int[] nums, int k) {
        return nums;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.rotate(new int[]{1,2,3,4,5,6,7},3), new int[]{5,6,7,1,2,3,4}, "example 1");
    _t(s.rotate(new int[]{-1,-100,3,99},2), new int[]{3,99,-1,-100}, "example 2");
    _t(s.rotate(new int[]{1,2},3), new int[]{2,1}, "k exceeds length");
    _t(s.rotate(new int[]{1,2,3},0), new int[]{1,2,3}, "zero rotation");
    _t(s.rotate(new int[]{1},100), new int[]{1}, "single element");
    _t(s.rotate(new int[]{1,2,3,4},4), new int[]{1,2,3,4}, "full rotation unchanged");
    _done();
  }
}`},"longest-common-prefix":{starter:`import java.util.*;
class Solution {
    public String longestCommonPrefix(String[] strs) {
        return "";
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.longestCommonPrefix(new String[]{"flower","flow","flight"}), "fl", "example 1");
    _t(s.longestCommonPrefix(new String[]{"dog","racecar","car"}), "", "no common prefix");
    _t(s.longestCommonPrefix(new String[]{"a"}), "a", "single string");
    _t(s.longestCommonPrefix(new String[]{"ab","abc","abcd"}), "ab", "shortest is prefix");
    _t(s.longestCommonPrefix(new String[]{"","abc"}), "", "empty string present");
    _t(s.longestCommonPrefix(new String[]{"interspecies","interstellar","interstate"}), "inters", "long prefix");
    _done();
  }
}`},"spiral-matrix":{starter:`import java.util.*;
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        return new ArrayList<>();
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static List<Integer> _L(int... a) { List<Integer> l=new ArrayList<>(); for (int x:a) l.add(x); return l; }
  @SafeVarargs static List<List<Integer>> _LL(List<Integer>... a) { return new ArrayList<>(Arrays.asList(a)); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.spiralOrder(new int[][]{{1,2,3},{4,5,6},{7,8,9}}), _L(1,2,3,6,9,8,7,4,5), "example 1");
    _t(s.spiralOrder(new int[][]{{1,2,3,4},{5,6,7,8},{9,10,11,12}}), _L(1,2,3,4,8,12,11,10,9,5,6,7), "example 2");
    _t(s.spiralOrder(new int[][]{{1}}), _L(1), "single cell");
    _t(s.spiralOrder(new int[][]{{1,2,3}}), _L(1,2,3), "single row");
    _t(s.spiralOrder(new int[][]{{1},{2},{3}}), _L(1,2,3), "single column");
    _t(s.spiralOrder(new int[][]{{1,2},{3,4}}), _L(1,2,4,3), "two by two");
    _done();
  }
}`},"set-matrix-zeroes":{starter:`import java.util.*;
class Solution {
    public int[][] setZeroes(int[][] matrix) {
        return matrix;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.setZeroes(new int[][]{{1,1,1},{1,0,1},{1,1,1}}), new int[][]{{1,0,1},{0,0,0},{1,0,1}}, "example 1");
    _t(s.setZeroes(new int[][]{{0,1,2,0},{3,4,5,2},{1,3,1,5}}), new int[][]{{0,0,0,0},{0,4,5,0},{0,3,1,0}}, "example 2");
    _t(s.setZeroes(new int[][]{{1,2,3}}), new int[][]{{1,2,3}}, "no zeros");
    _t(s.setZeroes(new int[][]{{0}}), new int[][]{{0}}, "single zero");
    _t(s.setZeroes(new int[][]{{1,0},{1,1}}), new int[][]{{0,0},{1,0}}, "two by two");
    _t(s.setZeroes(new int[][]{{5,0,5},{5,5,5}}), new int[][]{{0,0,0},{5,0,5}}, "column zeroed");
    _done();
  }
}`},"insert-interval":{starter:`import java.util.*;
class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        return intervals;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.insert(new int[][]{{1,3},{6,9}}, new int[]{2,5}), new int[][]{{1,5},{6,9}}, "example 1");
    _t(s.insert(new int[][]{{1,2},{3,5},{6,7},{8,10},{12,16}}, new int[]{4,8}), new int[][]{{1,2},{3,10},{12,16}}, "example 2");
    _t(s.insert(new int[][]{}, new int[]{5,7}), new int[][]{{5,7}}, "empty list");
    _t(s.insert(new int[][]{{1,5}}, new int[]{2,3}), new int[][]{{1,5}}, "contained interval");
    _t(s.insert(new int[][]{{3,5},{8,10}}, new int[]{1,2}), new int[][]{{1,2},{3,5},{8,10}}, "insert at front");
    _t(s.insert(new int[][]{{1,2},{5,6}}, new int[]{2,5}), new int[][]{{1,6}}, "touching merge");
    _done();
  }
}`},candy:{starter:`import java.util.*;
class Solution {
    public int candy(int[] ratings) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.candy(new int[]{1,0,2}), 5, "example 1");
    _t(s.candy(new int[]{1,2,2}), 4, "example 2");
    _t(s.candy(new int[]{1}), 1, "single child");
    _t(s.candy(new int[]{1,2,3,4}), 10, "strictly increasing");
    _t(s.candy(new int[]{4,3,2,1}), 10, "strictly decreasing");
    _t(s.candy(new int[]{1,3,2,2,1}), 7, "peak then plateau");
    _done();
  }
}`},"number-of-1-bits":{starter:`import java.util.*;
class Solution {
    public int hammingWeight(int n) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.hammingWeight(11), 3, "example 1");
    _t(s.hammingWeight(128), 1, "single bit");
    _t(s.hammingWeight(0), 0, "zero");
    _t(s.hammingWeight(7), 3, "three low bits");
    _t(s.hammingWeight(2147483647), 31, "all 31 bits set");
    _t(s.hammingWeight(1), 1, "one");
    _done();
  }
}`},"missing-number":{starter:`import java.util.*;
class Solution {
    public int missingNumber(int[] nums) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.missingNumber(new int[]{3,0,1}), 2, "example 1");
    _t(s.missingNumber(new int[]{0,1}), 2, "missing at end");
    _t(s.missingNumber(new int[]{9,6,4,2,3,5,7,0,1}), 8, "example 3");
    _t(s.missingNumber(new int[]{0}), 1, "missing one of [0,1]");
    _t(s.missingNumber(new int[]{1}), 0, "missing zero");
    _t(s.missingNumber(new int[]{0,2}), 1, "missing middle");
    _done();
  }
}`},"unique-paths":{starter:`import java.util.*;
class Solution {
    public int uniquePaths(int m, int n) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.uniquePaths(3,7), 28, "example 1");
    _t(s.uniquePaths(3,2), 3, "example 2");
    _t(s.uniquePaths(1,1), 1, "single cell");
    _t(s.uniquePaths(1,10), 1, "single row");
    _t(s.uniquePaths(10,10), 48620, "square grid");
    _t(s.uniquePaths(23,12), 193536720, "large but int32-safe");
    _done();
  }
}`},"word-break":{starter:`import java.util.*;
class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        return false;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.wordBreak("leetcode", Arrays.asList("leet","code")), true, "example 1");
    _t(s.wordBreak("applepenapple", Arrays.asList("apple","pen")), true, "reuse a word");
    _t(s.wordBreak("catsandog", Arrays.asList("cats","dog","sand","and","cat")), false, "cannot segment");
    _t(s.wordBreak("a", Arrays.asList("a")), true, "single letter");
    _t(s.wordBreak("aaaaaaa", Arrays.asList("aaaa","aaa")), true, "overlap split");
    _t(s.wordBreak("cars", Arrays.asList("car","ca","rs")), true, "ca + rs");
    _done();
  }
}`},"longest-common-subsequence":{starter:`import java.util.*;
class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.longestCommonSubsequence("abcde","ace"), 3, "example 1");
    _t(s.longestCommonSubsequence("abc","abc"), 3, "identical");
    _t(s.longestCommonSubsequence("abc","def"), 0, "no overlap");
    _t(s.longestCommonSubsequence("bsbininm","jmjkbkjkv"), 1, "single shared char");
    _t(s.longestCommonSubsequence("ezupkr","ubmrapg"), 2, "mixed");
    _t(s.longestCommonSubsequence("a","a"), 1, "single char match");
    _done();
  }
}`},"decode-ways":{starter:`import java.util.*;
class Solution {
    public int numDecodings(String s) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.numDecodings("12"), 2, "example 1");
    _t(s.numDecodings("226"), 3, "example 2");
    _t(s.numDecodings("06"), 0, "leading zero");
    _t(s.numDecodings("0"), 0, "just zero");
    _t(s.numDecodings("10"), 1, "ten only");
    _t(s.numDecodings("100"), 0, "invalid trailing zero");
    _t(s.numDecodings("11106"), 2, "classic multi");
    _done();
  }
}`},"partition-equal-subset-sum":{starter:`import java.util.*;
class Solution {
    public boolean canPartition(int[] nums) {
        return false;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.canPartition(new int[]{1,5,11,5}), true, "example 1");
    _t(s.canPartition(new int[]{1,2,3,5}), false, "odd-ish no split");
    _t(s.canPartition(new int[]{1,1}), true, "two equal");
    _t(s.canPartition(new int[]{1}), false, "single element");
    _t(s.canPartition(new int[]{2,2,3,5}), false, "sum is even but no subset");
    _t(s.canPartition(new int[]{3,3,3,4,5}), true, "sum 18 -> 9 each");
    _done();
  }
}`},"burst-balloons":{starter:`import java.util.*;
class Solution {
    public int maxCoins(int[] nums) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.maxCoins(new int[]{3,1,5,8}), 167, "example 1");
    _t(s.maxCoins(new int[]{1,5}), 10, "two balloons");
    _t(s.maxCoins(new int[]{5}), 5, "single balloon");
    _t(s.maxCoins(new int[]{7}), 7, "single seven");
    _t(s.maxCoins(new int[]{1,2,3,4,5}), 110, "ascending");
    _t(s.maxCoins(new int[]{9,76,64}), 44416, "three values");
    _done();
  }
}`},"rotting-oranges":{starter:`import java.util.*;
class Solution {
    public int orangesRotting(int[][] grid) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.orangesRotting(new int[][]{{2,1,1},{1,1,0},{0,1,1}}), 4, "example 1");
    _t(s.orangesRotting(new int[][]{{2,1,1},{0,1,1},{1,0,1}}), -1, "unreachable fresh orange");
    _t(s.orangesRotting(new int[][]{{0,2}}), 0, "no fresh oranges");
    _t(s.orangesRotting(new int[][]{{0}}), 0, "single empty cell");
    _t(s.orangesRotting(new int[][]{{1}}), -1, "single fresh orange never rots");
    _t(s.orangesRotting(new int[][]{{2,2},{1,1}}), 1, "two sources one minute");
    _done();
  }
}`},"pacific-atlantic":{starter:`import java.util.*;
class Solution {
    public List<int[]> pacificAtlantic(int[][] heights) {
        return new ArrayList<>();
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static List<int[]> _pairs(int[][] a) { List<int[]> l = new ArrayList<>(); for (int[] p : a) l.add(p); return l; }
  static List<List<Integer>> _norm(List<int[]> a) {
    List<List<Integer>> r = new ArrayList<>();
    for (int[] p : a) r.add(Arrays.asList(p[0], p[1]));
    r.sort((x,y)-> !x.get(0).equals(y.get(0)) ? x.get(0)-y.get(0) : x.get(1)-y.get(1));
    return r;
  }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(_norm(s.pacificAtlantic(new int[][]{{1,2,2,3,5},{3,2,3,4,4},{2,4,5,3,1},{6,7,1,4,5},{5,1,1,2,4}})), _norm(_pairs(new int[][]{{0,4},{1,3},{1,4},{2,2},{3,0},{3,1},{4,0}})), "example 1");
    _t(_norm(s.pacificAtlantic(new int[][]{{1}})), _norm(_pairs(new int[][]{{0,0}})), "single cell");
    _t(_norm(s.pacificAtlantic(new int[][]{{2,1},{1,2}})), _norm(_pairs(new int[][]{{0,0},{0,1},{1,0},{1,1}})), "all reach both");
    _t(_norm(s.pacificAtlantic(new int[][]{{1,2,3},{8,9,4},{7,6,5}})), _norm(_pairs(new int[][]{{0,2},{1,0},{1,1},{1,2},{2,0},{2,1},{2,2}})), "spiral");
    _done();
  }
}`},"alien-dictionary":{starter:`import java.util.*;
class Solution {
    public String alienOrder(String[] words) {
        return "";
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.alienOrder(new String[]{"wrt","wrf","er","ett","rftt"}), "wertf", "classic unique order");
    _t(s.alienOrder(new String[]{"z","x","z"}), "", "cycle is invalid");
    _t(s.alienOrder(new String[]{"abc","ab"}), "", "prefix violation");
    _t(s.alienOrder(new String[]{"w","x","y","z"}), "wxyz", "total order from single letters");
    _t(s.alienOrder(new String[]{"a"}), "a", "single letter");
    _t(s.alienOrder(new String[]{"c","cb","b","ba","a"}), "cba", "prefix-then-branch chain");
    _done();
  }
}`},"valid-anagram":{starter:`import java.util.*;
class Solution {
    public boolean isAnagram(String s, String t) {
        return false;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.isAnagram("anagram","nagaram"), true, "example 1");
    _t(s.isAnagram("rat","car"), false, "example 2");
    _t(s.isAnagram("a","a"), true, "single char match");
    _t(s.isAnagram("ab","a"), false, "different lengths");
    _t(s.isAnagram("aacc","ccac"), false, "same length different counts");
    _t(s.isAnagram("listen","silent"), true, "classic anagram");
    _done();
  }
}`},"subarray-sum-equals-k":{starter:`import java.util.*;
class Solution {
    public int subarraySum(int[] nums, int k) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.subarraySum(new int[]{1,1,1},2), 2, "example 1");
    _t(s.subarraySum(new int[]{1,2,3},3), 2, "example 2");
    _t(s.subarraySum(new int[]{1,-1,0},0), 3, "negatives and zero");
    _t(s.subarraySum(new int[]{3,4,7,2,-3,1,4,2},7), 4, "mixed signs");
    _t(s.subarraySum(new int[]{0,0,0},0), 6, "all zeros");
    _t(s.subarraySum(new int[]{1},0), 0, "no subarray sums to k");
    _done();
  }
}`},"four-sum-ii":{starter:`import java.util.*;
class Solution {
    public int fourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.fourSumCount(new int[]{1,2}, new int[]{-2,-1}, new int[]{-1,2}, new int[]{0,2}), 2, "example 1");
    _t(s.fourSumCount(new int[]{0}, new int[]{0}, new int[]{0}, new int[]{0}), 1, "example 2");
    _t(s.fourSumCount(new int[]{1}, new int[]{1}, new int[]{1}, new int[]{1}), 0, "no tuple sums to zero");
    _t(s.fourSumCount(new int[]{-1,1}, new int[]{-1,1}, new int[]{-1,1}, new int[]{-1,1}), 6, "symmetric arrays");
    _t(s.fourSumCount(new int[]{0,0}, new int[]{0,0}, new int[]{0,0}, new int[]{0,0}), 16, "all zeros");
    _t(s.fourSumCount(new int[]{1,2,3}, new int[]{-1,-2,-3}, new int[]{0,0,0}, new int[]{0,0,0}), 27, "many combinations");
    _done();
  }
}`},"middle-of-linked-list":{starter:`// Provided: class ListNode { int val; ListNode next; ListNode(int val) {...} }
import java.util.*;
class Solution {
    public ListNode middleNode(ListNode head) {
        return null;
    }
}`,tests:`class ListNode {
  int val; ListNode next;
  ListNode() {}
  ListNode(int val) { this.val = val; }
}


public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static ListNode _build(int[] arr) {
    ListNode h = new ListNode(); ListNode c = h;
    for (int v : arr) { c.next = new ListNode(v); c = c.next; }
    return h.next;
  }
  static int[] _toArr(ListNode n) {
    List<Integer> o = new ArrayList<>();
    while (n != null) { o.add(n.val); n = n.next; }
    int[] r = new int[o.size()];
    for (int i = 0; i < r.length; i++) r[i] = o.get(i);
    return r;
  }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(_toArr(s.middleNode(_build(new int[]{1,2,3,4,5}))), new int[]{3,4,5}, "odd length");
    _t(_toArr(s.middleNode(_build(new int[]{1,2,3,4,5,6}))), new int[]{4,5,6}, "even length picks second middle");
    _t(_toArr(s.middleNode(_build(new int[]{1}))), new int[]{1}, "single node");
    _t(_toArr(s.middleNode(_build(new int[]{1,2}))), new int[]{2}, "two nodes");
    _t(_toArr(s.middleNode(_build(new int[]{1,2,3}))), new int[]{2,3}, "three nodes");
    _done();
  }
}`},"remove-nth-from-end":{starter:`// Provided: class ListNode { int val; ListNode next; ListNode(int val) {...} }
import java.util.*;
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        return head;
    }
}`,tests:`class ListNode {
  int val; ListNode next;
  ListNode() {}
  ListNode(int val) { this.val = val; }
}


public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static ListNode _build(int[] arr) {
    ListNode h = new ListNode(); ListNode c = h;
    for (int v : arr) { c.next = new ListNode(v); c = c.next; }
    return h.next;
  }
  static int[] _toArr(ListNode n) {
    List<Integer> o = new ArrayList<>();
    while (n != null) { o.add(n.val); n = n.next; }
    int[] r = new int[o.size()];
    for (int i = 0; i < r.length; i++) r[i] = o.get(i);
    return r;
  }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(_toArr(s.removeNthFromEnd(_build(new int[]{1,2,3,4,5}),2)), new int[]{1,2,3,5}, "example 1");
    _t(_toArr(s.removeNthFromEnd(_build(new int[]{1}),1)), new int[]{}, "single node removed");
    _t(_toArr(s.removeNthFromEnd(_build(new int[]{1,2}),1)), new int[]{1}, "remove last of two");
    _t(_toArr(s.removeNthFromEnd(_build(new int[]{1,2}),2)), new int[]{2}, "remove head of two");
    _t(_toArr(s.removeNthFromEnd(_build(new int[]{1,2,3,4,5}),5)), new int[]{2,3,4,5}, "remove head");
    _done();
  }
}`},"add-two-numbers":{starter:`// Provided: class ListNode { int val; ListNode next; ListNode(int val) {...} }
import java.util.*;
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        return null;
    }
}`,tests:`class ListNode {
  int val; ListNode next;
  ListNode() {}
  ListNode(int val) { this.val = val; }
}


public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static ListNode _build(int[] arr) {
    ListNode h = new ListNode(); ListNode c = h;
    for (int v : arr) { c.next = new ListNode(v); c = c.next; }
    return h.next;
  }
  static int[] _toArr(ListNode n) {
    List<Integer> o = new ArrayList<>();
    while (n != null) { o.add(n.val); n = n.next; }
    int[] r = new int[o.size()];
    for (int i = 0; i < r.length; i++) r[i] = o.get(i);
    return r;
  }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(_toArr(s.addTwoNumbers(_build(new int[]{2,4,3}),_build(new int[]{5,6,4}))), new int[]{7,0,8}, "example 1");
    _t(_toArr(s.addTwoNumbers(_build(new int[]{0}),_build(new int[]{0}))), new int[]{0}, "zero plus zero");
    _t(_toArr(s.addTwoNumbers(_build(new int[]{9,9,9,9,9,9,9}),_build(new int[]{9,9,9,9}))), new int[]{8,9,9,9,0,0,0,1}, "carry out new digit");
    _t(_toArr(s.addTwoNumbers(_build(new int[]{5}),_build(new int[]{5}))), new int[]{0,1}, "single digit carry");
    _t(_toArr(s.addTwoNumbers(_build(new int[]{1,8}),_build(new int[]{0}))), new int[]{1,8}, "different lengths");
    _done();
  }
}`},"happy-number":{starter:`import java.util.*;
class Solution {
    public boolean isHappy(int n) {
        return false;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.isHappy(19), true, "example 1");
    _t(s.isHappy(2), false, "example 2");
    _t(s.isHappy(1), true, "one is happy");
    _t(s.isHappy(7), true, "seven is happy");
    _t(s.isHappy(4), false, "four enters the cycle");
    _t(s.isHappy(100), true, "power of ten");
    _done();
  }
}`},"pow-x-n":{starter:`import java.util.*;
class Solution {
    public double myPow(double x, int n) {
        return 0.0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t((int)Math.round(s.myPow(2.0,10)), 1024, "two to the tenth");
    _t((int)Math.round(s.myPow(2.0,0)), 1, "exponent zero");
    _t((int)Math.round(s.myPow(2.0,-2)*10000), 2500, "negative exponent reciprocal");
    _t((int)Math.round(s.myPow(3.0,5)), 243, "three to the fifth");
    _t((int)Math.round(s.myPow(0.5,4)*10000), 625, "fractional base");
    _t((int)Math.round(s.myPow(2.1,3)*100000), 926100, "non-integer base");
    _t((int)Math.round(s.myPow(1.0,2147483647)), 1, "one to a huge power");
    _done();
  }
}`},perceptron:{starter:`import java.util.*;
class Solution {
    public int[] perceptron(int[][] X, int[] y, double lr, int epochs) {
        return new int[]{};
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.perceptron(new int[][]{{0,0},{0,1},{1,0},{1,1}}, new int[]{0,0,0,1}, 0.1, 20), new int[]{0,0,0,1}, "AND gate");
    _t(s.perceptron(new int[][]{{0,0},{0,1},{1,0},{1,1}}, new int[]{0,1,1,1}, 0.1, 20), new int[]{0,1,1,1}, "OR gate");
    _t(s.perceptron(new int[][]{{0,0},{0,1},{1,0},{1,1}}, new int[]{0,0,0,0}, 0.1, 20), new int[]{0,0,0,0}, "all zeros stay zero");
    _t(s.perceptron(new int[][]{{2,2},{3,3},{-1,-1},{-2,-2}}, new int[]{1,1,0,0}, 0.1, 20), new int[]{1,1,0,0}, "separable diagonal");
    _t(s.perceptron(new int[][]{{1,1}}, new int[]{1}, 0.1, 20), new int[]{1}, "single positive point");
    _done();
  }
}`},"cosine-similarity":{starter:`import java.util.*;
class Solution {
    public double cosineSimilarity(double[] a, double[] b) {
        return 0.0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t((int)Math.round(s.cosineSimilarity(new double[]{1,0}, new double[]{0,1})*10000), 0, "orthogonal");
    _t((int)Math.round(s.cosineSimilarity(new double[]{1,2,3}, new double[]{1,2,3})*10000), 10000, "identical");
    _t((int)Math.round(s.cosineSimilarity(new double[]{1,2,3}, new double[]{-1,-2,-3})*10000), -10000, "opposite");
    _t((int)Math.round(s.cosineSimilarity(new double[]{1,2,3}, new double[]{4,5,6})*10000), 9746, "known case");
    _t((int)Math.round(s.cosineSimilarity(new double[]{2,0}, new double[]{3,0})*10000), 10000, "same direction scaled");
    _t((int)Math.round(s.cosineSimilarity(new double[]{1,1}, new double[]{1,0})*10000), 7071, "45 degrees");
    _done();
  }
}`},"implement-trie":{starter:`import java.util.*;

class Trie {
    public Trie() {

    }
    public void insert(String word) {

    }
    public boolean search(String word) {
        return false;
    }
    public boolean startsWith(String prefix) {
        return false;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Trie _tr = new Trie();
    _tr.insert("apple");
    _t(_tr.search("apple"), true, "inserted word found");
    _t(_tr.search("app"), false, "prefix is not a word yet");
    _t(_tr.startsWith("app"), true, "prefix exists");
    _tr.insert("app");
    _t(_tr.search("app"), true, "now a full word");
    _t(_tr.startsWith("appl"), true, "longer prefix exists");
    _t(_tr.search("banana"), false, "never inserted");
    _t(_tr.startsWith("b"), false, "no such prefix");
    _done();
  }
}`},"queue-using-stacks":{starter:`import java.util.*;

class MyQueue {
    public MyQueue() {

    }
    public void push(int x) {

    }
    public int pop() {
        return 0;
    }
    public int peek() {
        return 0;
    }
    public boolean empty() {
        return true;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    MyQueue _q = new MyQueue();
    _q.push(1); _q.push(2);
    _t(_q.peek(), 1, "front is 1");
    _t(_q.pop(), 1, "pop returns front");
    _t(_q.empty(), false, "still has 2");
    _t(_q.pop(), 2, "pop returns 2");
    _t(_q.empty(), true, "now empty");
    _q.push(3); _q.push(4); _q.push(5);
    _t(_q.pop(), 3, "fifo order maintained");
    _t(_q.peek(), 4, "next front is 4");
    _done();
  }
}`},permutations:{starter:`import java.util.*;
class Solution {
    public List<List<Integer>> permute(int[] nums) {
        return new ArrayList<>();
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static List<Integer> _L(int... a) { List<Integer> l=new ArrayList<>(); for (int x:a) l.add(x); return l; }
  @SafeVarargs static List<List<Integer>> _LL(List<Integer>... a) { return new ArrayList<>(Arrays.asList(a)); }
  static List<List<Integer>> _norm(List<List<Integer>> a) {
    List<List<Integer>> r = new ArrayList<>(a);
    r.sort((x,y)->{ int m=Math.min(x.size(),y.size()); for (int i=0;i<m;i++) if (!x.get(i).equals(y.get(i))) return x.get(i)-y.get(i); return x.size()-y.size(); });
    return r;
  }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(_norm(s.permute(new int[]{1,2,3})), _norm(_LL(_L(1,2,3),_L(1,3,2),_L(2,1,3),_L(2,3,1),_L(3,1,2),_L(3,2,1))), "example 1");
    _t(_norm(s.permute(new int[]{0,1})), _norm(_LL(_L(0,1),_L(1,0))), "two elements");
    _t(_norm(s.permute(new int[]{1})), _norm(_LL(_L(1))), "single element");
    _t(s.permute(new int[]{1,2,3,4}).size(), 24, "4! permutations");
    _t(_norm(s.permute(new int[]{7,8,9})), _norm(_LL(_L(7,8,9),_L(7,9,8),_L(8,7,9),_L(8,9,7),_L(9,7,8),_L(9,8,7))), "distinct values");
    _done();
  }
}`},"generate-parentheses":{starter:`import java.util.*;
class Solution {
    public List<String> generateParenthesis(int n) {
        return new ArrayList<>();
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static List<String> _sort(List<String> a) { List<String> r = new ArrayList<>(a); Collections.sort(r); return r; }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(_sort(s.generateParenthesis(3)), _sort(Arrays.asList("((()))","(()())","(())()","()(())","()()()")), "example 1");
    _t(_sort(s.generateParenthesis(1)), _sort(Arrays.asList("()")), "single pair");
    _t(_sort(s.generateParenthesis(2)), _sort(Arrays.asList("(())","()()")), "two pairs");
    _t(s.generateParenthesis(4).size(), 14, "catalan number 14");
    _t(s.generateParenthesis(5).size(), 42, "catalan number 42");
    _done();
  }
}`},"sudoku-solver":{starter:`import java.util.*;
class Solution {
    public char[][] solveSudoku(char[][] board) {
        return board;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.solveSudoku(new char[][]{{'5','3','.','.','7','.','.','.','.'},{'6','.','.','1','9','5','.','.','.'},{'.','9','8','.','.','.','.','6','.'},{'8','.','.','.','6','.','.','.','3'},{'4','.','.','8','.','3','.','.','1'},{'7','.','.','.','2','.','.','.','6'},{'.','6','.','.','.','.','2','8','.'},{'.','.','.','4','1','9','.','.','5'},{'.','.','.','.','8','.','.','7','9'}}), new char[][]{{'5','3','4','6','7','8','9','1','2'},{'6','7','2','1','9','5','3','4','8'},{'1','9','8','3','4','2','5','6','7'},{'8','5','9','7','6','1','4','2','3'},{'4','2','6','8','5','3','7','9','1'},{'7','1','3','9','2','4','8','5','6'},{'9','6','1','5','3','7','2','8','4'},{'2','8','7','4','1','9','6','3','5'},{'3','4','5','2','8','6','1','7','9'}}, "classic puzzle solved");
    _t(s.solveSudoku(new char[][]{{'5','3','4','6','7','8','9','1','2'},{'6','7','2','1','9','5','3','4','8'},{'1','9','8','3','4','2','5','6','7'},{'8','5','9','7','6','1','4','2','3'},{'4','2','6','8','5','3','7','9','1'},{'7','1','3','9','2','4','8','5','6'},{'9','6','1','5','3','7','2','8','4'},{'2','8','7','4','1','9','6','3','5'},{'3','4','5','2','8','6','1','7','.'}}), new char[][]{{'5','3','4','6','7','8','9','1','2'},{'6','7','2','1','9','5','3','4','8'},{'1','9','8','3','4','2','5','6','7'},{'8','5','9','7','6','1','4','2','3'},{'4','2','6','8','5','3','7','9','1'},{'7','1','3','9','2','4','8','5','6'},{'9','6','1','5','3','7','2','8','4'},{'2','8','7','4','1','9','6','3','5'},{'3','4','5','2','8','6','1','7','9'}}, "one empty cell");
    _done();
  }
}`},"find-all-anagrams":{starter:`import java.util.*;
class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        return new ArrayList<>();
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static List<Integer> _L(int... a) { List<Integer> l=new ArrayList<>(); for (int x:a) l.add(x); return l; }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.findAnagrams("cbaebabacd","abc"), _L(0,6), "example 1");
    _t(s.findAnagrams("abab","ab"), _L(0,1,2), "example 2");
    _t(s.findAnagrams("aa","bb"), _L(), "no anagrams");
    _t(s.findAnagrams("a","ab"), _L(), "p longer than s");
    _t(s.findAnagrams("aaaa","a"), _L(0,1,2,3), "single char p");
    _t(s.findAnagrams("baa","aa"), _L(1), "one match");
    _done();
  }
}`},"longest-repeating-replacement":{starter:`import java.util.*;
class Solution {
    public int characterReplacement(String s, int k) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.characterReplacement("ABAB",2), 4, "example 1");
    _t(s.characterReplacement("AABABBA",1), 4, "example 2");
    _t(s.characterReplacement("A",0), 1, "single char no ops");
    _t(s.characterReplacement("AAAA",0), 4, "all same");
    _t(s.characterReplacement("ABCDE",1), 2, "distinct chars");
    _t(s.characterReplacement("AAAB",0), 3, "no replacements allowed");
    _done();
  }
}`},"max-consecutive-ones-iii":{starter:`import java.util.*;
class Solution {
    public int longestOnes(int[] nums, int k) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.longestOnes(new int[]{1,1,1,0,0,0,1,1,1,1,0},2), 6, "example 1");
    _t(s.longestOnes(new int[]{0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1},3), 10, "example 2");
    _t(s.longestOnes(new int[]{0,0,0},0), 0, "no flips all zeros");
    _t(s.longestOnes(new int[]{1,1,1},0), 3, "all ones");
    _t(s.longestOnes(new int[]{0,0,0},3), 3, "flip everything");
    _t(s.longestOnes(new int[]{1,0,1,0,1},1), 3, "single flip");
    _done();
  }
}`},"find-min-rotated":{starter:`import java.util.*;
class Solution {
    public int findMin(int[] nums) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.findMin(new int[]{3,4,5,1,2}), 1, "example 1");
    _t(s.findMin(new int[]{4,5,6,7,0,1,2}), 0, "example 2");
    _t(s.findMin(new int[]{11,13,15,17}), 11, "no effective rotation");
    _t(s.findMin(new int[]{2,1}), 1, "two elements");
    _t(s.findMin(new int[]{1}), 1, "single element");
    _t(s.findMin(new int[]{5,1,2,3,4}), 1, "pivot near start");
    _done();
  }
}`},"search-2d-matrix":{starter:`import java.util.*;
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        return false;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    int[][] _m = {{1,3,5,7},{10,11,16,20},{23,30,34,60}};
    _t(s.searchMatrix(_m,3), true, "example 1");
    _t(s.searchMatrix(_m,13), false, "example 2");
    _t(s.searchMatrix(_m,1), true, "top-left corner");
    _t(s.searchMatrix(_m,60), true, "bottom-right corner");
    _t(s.searchMatrix(new int[][]{{1}},1), true, "single hit");
    _t(s.searchMatrix(new int[][]{{1}},2), false, "single miss");
    _done();
  }
}`},"koko-eating-bananas":{starter:`import java.util.*;
class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.minEatingSpeed(new int[]{3,6,7,11},8), 4, "example 1");
    _t(s.minEatingSpeed(new int[]{30,11,23,4,20},5), 30, "one pile per hour");
    _t(s.minEatingSpeed(new int[]{30,11,23,4,20},6), 23, "six hours");
    _t(s.minEatingSpeed(new int[]{1,1,1,999},1002), 1, "plenty of time");
    _t(s.minEatingSpeed(new int[]{312884470},968709470), 1, "single huge pile, slow ok");
    _t(s.minEatingSpeed(new int[]{3},3), 1, "single pile slow");
    _done();
  }
}`},"count-smaller-after-self":{starter:`import java.util.*;
class Solution {
    public List<Integer> countSmaller(int[] nums) {
        return new ArrayList<>();
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static List<Integer> _L(int... a) { List<Integer> l=new ArrayList<>(); for (int x:a) l.add(x); return l; }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.countSmaller(new int[]{5,2,6,1}), _L(2,1,1,0), "example 1");
    _t(s.countSmaller(new int[]{-1,-1}), _L(0,0), "equal values, none strictly smaller");
    _t(s.countSmaller(new int[]{-1}), _L(0), "single element");
    _t(s.countSmaller(new int[]{1,2,3,4}), _L(0,0,0,0), "ascending");
    _t(s.countSmaller(new int[]{4,3,2,1}), _L(3,2,1,0), "descending");
    _t(s.countSmaller(new int[]{2,0,1}), _L(2,0,0), "mixed");
    _done();
  }
}`},"evaluate-rpn":{starter:`import java.util.*;
class Solution {
    public int evalRPN(String[] tokens) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.evalRPN(new String[]{"2","1","+","3","*"}), 9, "example 1");
    _t(s.evalRPN(new String[]{"4","13","5","/","+"}), 6, "example 2");
    _t(s.evalRPN(new String[]{"10","-3","/"}), -3, "negative division truncates toward zero");
    _t(s.evalRPN(new String[]{"7","2","/"}), 3, "positive truncation");
    _t(s.evalRPN(new String[]{"-7","2","/"}), -3, "negative numerator truncates toward zero");
    _t(s.evalRPN(new String[]{"5"}), 5, "single operand");
    _t(s.evalRPN(new String[]{"10","6","9","3","+","-11","*","/","*","17","+","5","+"}), 22, "complex expression");
    _done();
  }
}`},"decode-string":{starter:`import java.util.*;
class Solution {
    public String decodeString(String s) {
        return "";
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.decodeString("3[a]2[bc]"), "aaabcbc", "example 1");
    _t(s.decodeString("3[a2[c]]"), "accaccacc", "nested");
    _t(s.decodeString("2[abc]3[cd]ef"), "abcabccdcdcdef", "multiple groups");
    _t(s.decodeString("abc"), "abc", "no encoding");
    _t(s.decodeString("10[a]"), "aaaaaaaaaa", "multi-digit count");
    _t(s.decodeString("2[2[b]c]"), "bbcbbc", "nested with suffix");
    _done();
  }
}`},"longest-valid-parentheses":{starter:`import java.util.*;
class Solution {
    public int longestValidParentheses(String s) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.longestValidParentheses("(()"), 2, "example 1");
    _t(s.longestValidParentheses(")()())"), 4, "example 2");
    _t(s.longestValidParentheses(""), 0, "empty string");
    _t(s.longestValidParentheses("()(()"), 2, "reset in middle");
    _t(s.longestValidParentheses("()(())"), 6, "fully matched");
    _t(s.longestValidParentheses("((((("), 0, "all opens");
    _t(s.longestValidParentheses(")))))"), 0, "all closes");
    _done();
  }
}`},"invert-binary-tree":{starter:`// Provided: class TreeNode { int val; TreeNode left, right; TreeNode(int val) {...} }
import java.util.*;
class Solution {
    public TreeNode invertTree(TreeNode root) {
        return root;
    }
}`,tests:`class TreeNode {
  int val; TreeNode left, right;
  TreeNode(int val) { this.val = val; }
}


public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static TreeNode _tree(Integer[] vals) {
    if (vals.length == 0 || vals[0] == null) return null;
    TreeNode root = new TreeNode(vals[0]);
    Queue<TreeNode> q = new LinkedList<>(); q.add(root);
    int i = 1;
    while (!q.isEmpty() && i < vals.length) {
      TreeNode n = q.poll();
      if (i < vals.length && vals[i] != null) { n.left = new TreeNode(vals[i]); q.add(n.left); }
      i++;
      if (i < vals.length && vals[i] != null) { n.right = new TreeNode(vals[i]); q.add(n.right); }
      i++;
    }
    return root;
  }
  static Integer[] _dump(TreeNode root) {
    List<Integer> out = new ArrayList<>();
    Queue<TreeNode> q = new LinkedList<>(); q.add(root);
    while (!q.isEmpty()) {
      TreeNode node = q.poll();
      if (node == null) { out.add(null); continue; }
      out.add(node.val); q.add(node.left); q.add(node.right);
    }
    while (!out.isEmpty() && out.get(out.size()-1) == null) out.remove(out.size()-1);
    return out.toArray(new Integer[0]);
  }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(_dump(s.invertTree(_tree(new Integer[]{4,2,7,1,3,6,9}))), new Integer[]{4,7,2,9,6,3,1}, "example 1");
    _t(_dump(s.invertTree(_tree(new Integer[]{2,1,3}))), new Integer[]{2,3,1}, "example 2");
    _t(_dump(s.invertTree(_tree(new Integer[]{}))), new Integer[]{}, "empty tree");
    _t(_dump(s.invertTree(_tree(new Integer[]{1}))), new Integer[]{1}, "single node");
    _t(_dump(s.invertTree(_tree(new Integer[]{1,2,null,3}))), new Integer[]{1,null,2,null,3}, "left chain becomes right");
    _done();
  }
}`},"diameter-of-binary-tree":{starter:`// Provided: class TreeNode { int val; TreeNode left, right; TreeNode(int val) {...} }
import java.util.*;
class Solution {
    public int diameterOfBinaryTree(TreeNode root) {
        return 0;
    }
}`,tests:`class TreeNode {
  int val; TreeNode left, right;
  TreeNode(int val) { this.val = val; }
}


public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static TreeNode _tree(Integer[] vals) {
    if (vals.length == 0 || vals[0] == null) return null;
    TreeNode root = new TreeNode(vals[0]);
    Queue<TreeNode> q = new LinkedList<>(); q.add(root);
    int i = 1;
    while (!q.isEmpty() && i < vals.length) {
      TreeNode n = q.poll();
      if (i < vals.length && vals[i] != null) { n.left = new TreeNode(vals[i]); q.add(n.left); }
      i++;
      if (i < vals.length && vals[i] != null) { n.right = new TreeNode(vals[i]); q.add(n.right); }
      i++;
    }
    return root;
  }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.diameterOfBinaryTree(_tree(new Integer[]{1,2,3,4,5})), 3, "example 1");
    _t(s.diameterOfBinaryTree(_tree(new Integer[]{1,2})), 1, "two nodes");
    _t(s.diameterOfBinaryTree(_tree(new Integer[]{1})), 0, "single node");
    _t(s.diameterOfBinaryTree(_tree(new Integer[]{1,2,null,3,null,4})), 3, "left skewed chain");
    _t(s.diameterOfBinaryTree(_tree(new Integer[]{4,2,7,1,3,6,9})), 4, "balanced tree");
    _done();
  }
}`},"lowest-common-ancestor-bst":{starter:`// Provided: class TreeNode { int val; TreeNode left, right; TreeNode(int val) {...} }
import java.util.*;
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, int p, int q) {
        return root;
    }
}`,tests:`class TreeNode {
  int val; TreeNode left, right;
  TreeNode(int val) { this.val = val; }
}


public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static TreeNode _tree(Integer[] vals) {
    if (vals.length == 0 || vals[0] == null) return null;
    TreeNode root = new TreeNode(vals[0]);
    Queue<TreeNode> q = new LinkedList<>(); q.add(root);
    int i = 1;
    while (!q.isEmpty() && i < vals.length) {
      TreeNode n = q.poll();
      if (i < vals.length && vals[i] != null) { n.left = new TreeNode(vals[i]); q.add(n.left); }
      i++;
      if (i < vals.length && vals[i] != null) { n.right = new TreeNode(vals[i]); q.add(n.right); }
      i++;
    }
    return root;
  }
  public static void main(String[] args) {
    Solution s = new Solution();
    TreeNode _b = _tree(new Integer[]{6,2,8,0,4,7,9,null,null,3,5});
    _t(s.lowestCommonAncestor(_b,2,8).val, 6, "split at root");
    _t(s.lowestCommonAncestor(_b,2,4).val, 2, "ancestor is one of the nodes");
    _t(s.lowestCommonAncestor(_b,3,5).val, 4, "lca deeper in tree");
    _t(s.lowestCommonAncestor(_b,7,9).val, 8, "right subtree");
    _t(s.lowestCommonAncestor(_tree(new Integer[]{2,1}),1,2).val, 2, "two node tree");
    _done();
  }
}`},"serialize-deserialize-tree":{starter:`// Provided: class TreeNode { int val; TreeNode left, right; TreeNode(int val) {...} }
import java.util.*;
class Solution {
    public String serialize(TreeNode root) {
        return "";
    }
    public TreeNode deserialize(String data) {
        return null;
    }
}`,tests:`class TreeNode {
  int val; TreeNode left, right;
  TreeNode(int val) { this.val = val; }
}


public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  static TreeNode _tree(Integer[] vals) {
    if (vals.length == 0 || vals[0] == null) return null;
    TreeNode root = new TreeNode(vals[0]);
    Queue<TreeNode> q = new LinkedList<>(); q.add(root);
    int i = 1;
    while (!q.isEmpty() && i < vals.length) {
      TreeNode n = q.poll();
      if (i < vals.length && vals[i] != null) { n.left = new TreeNode(vals[i]); q.add(n.left); }
      i++;
      if (i < vals.length && vals[i] != null) { n.right = new TreeNode(vals[i]); q.add(n.right); }
      i++;
    }
    return root;
  }
  static Integer[] _dump(TreeNode root) {
    List<Integer> out = new ArrayList<>();
    Queue<TreeNode> q = new LinkedList<>(); q.add(root);
    while (!q.isEmpty()) {
      TreeNode node = q.poll();
      if (node == null) { out.add(null); continue; }
      out.add(node.val); q.add(node.left); q.add(node.right);
    }
    while (!out.isEmpty() && out.get(out.size()-1) == null) out.remove(out.size()-1);
    return out.toArray(new Integer[0]);
  }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(_dump(s.deserialize(s.serialize(_tree(new Integer[]{1,2,3,null,null,4,5})))), new Integer[]{1,2,3,null,null,4,5}, "example 1");
    _t(_dump(s.deserialize(s.serialize(_tree(new Integer[]{})))), new Integer[]{}, "empty tree");
    _t(_dump(s.deserialize(s.serialize(_tree(new Integer[]{1})))), new Integer[]{1}, "single node");
    _t(_dump(s.deserialize(s.serialize(_tree(new Integer[]{1,2,3,4,5,6,7})))), new Integer[]{1,2,3,4,5,6,7}, "perfect tree");
    _t(_dump(s.deserialize(s.serialize(_tree(new Integer[]{-1,-2,-3})))), new Integer[]{-1,-2,-3}, "negative values");
    _t(_dump(s.deserialize(s.serialize(_tree(new Integer[]{5,4,7,3,null,2,null,-1,null,9})))), new Integer[]{5,4,7,3,null,2,null,-1,null,9}, "irregular shape");
    _done();
  }
}`},"move-zeroes":{starter:`import java.util.*;
class Solution {
    public int[] moveZeroes(int[] nums) {
        return nums;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.moveZeroes(new int[]{0,1,0,3,12}), new int[]{1,3,12,0,0}, "example 1");
    _t(s.moveZeroes(new int[]{0}), new int[]{0}, "single zero");
    _t(s.moveZeroes(new int[]{1,2,3}), new int[]{1,2,3}, "no zeros");
    _t(s.moveZeroes(new int[]{0,0,1}), new int[]{1,0,0}, "leading zeros");
    _t(s.moveZeroes(new int[]{1,0,2,0,3}), new int[]{1,2,3,0,0}, "interleaved zeros");
    _t(s.moveZeroes(new int[]{0,0,0}), new int[]{0,0,0}, "all zeros");
    _done();
  }
}`},"remove-duplicates-sorted":{starter:`import java.util.*;
class Solution {
    public int[] removeDuplicates(int[] nums) {
        return nums;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.removeDuplicates(new int[]{1,1,2}), new int[]{1,2}, "example 1");
    _t(s.removeDuplicates(new int[]{0,0,1,1,1,2,2,3,3,4}), new int[]{0,1,2,3,4}, "example 2");
    _t(s.removeDuplicates(new int[]{1}), new int[]{1}, "single element");
    _t(s.removeDuplicates(new int[]{1,2,3}), new int[]{1,2,3}, "already unique");
    _t(s.removeDuplicates(new int[]{2,2,2,2}), new int[]{2}, "all duplicates");
    _t(s.removeDuplicates(new int[]{-3,-3,-1,0,0}), new int[]{-3,-1,0}, "negatives");
    _done();
  }
}`},"sort-colors":{starter:`import java.util.*;
class Solution {
    public int[] sortColors(int[] nums) {
        return nums;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.sortColors(new int[]{2,0,2,1,1,0}), new int[]{0,0,1,1,2,2}, "example 1");
    _t(s.sortColors(new int[]{2,0,1}), new int[]{0,1,2}, "example 2");
    _t(s.sortColors(new int[]{0}), new int[]{0}, "single element");
    _t(s.sortColors(new int[]{1,1,1}), new int[]{1,1,1}, "all same");
    _t(s.sortColors(new int[]{2,2,0,0,1,1}), new int[]{0,0,1,1,2,2}, "reverse grouped");
    _t(s.sortColors(new int[]{1,0,2,0}), new int[]{0,0,1,2}, "mixed");
    _done();
  }
}`},"three-sum-closest":{starter:`import java.util.*;
class Solution {
    public int threeSumClosest(int[] nums, int target) {
        return 0;
    }
}`,tests:`public class Main {
  static int _p = 0, _n = 0;
  static String _s(Object o) {
    if (o instanceof int[]) return Arrays.toString((int[]) o);
    if (o instanceof double[]) return Arrays.toString((double[]) o);
    if (o instanceof char[]) return Arrays.toString((char[]) o);
    if (o instanceof Object[]) return Arrays.deepToString((Object[]) o);
    return String.valueOf(o);
  }
  static void _t(Object g, Object e, String d) {
    _n++;
    if (Objects.deepEquals(g, e)) { _p++; System.out.println("✓ Test " + _n + (d.isEmpty() ? "" : " - " + d)); }
    else System.out.println("✗ Test " + _n + " - Expected " + _s(e) + ", got " + _s(g) + (d.isEmpty() ? "" : " [" + d + "]"));
  }
  static void _done() { System.out.println(_p + "/" + _n + " tests passed"); }
  public static void main(String[] args) {
    Solution s = new Solution();
    _t(s.threeSumClosest(new int[]{-1,2,1,-4},1), 2, "example 1");
    _t(s.threeSumClosest(new int[]{0,0,0},1), 0, "all zeros");
    _t(s.threeSumClosest(new int[]{1,1,0},-100), 2, "far below target");
    _t(s.threeSumClosest(new int[]{1,2,4,8,16,32,64,128},82), 82, "exact match");
    _t(s.threeSumClosest(new int[]{-3,-2,-5,3,-4},-1), -2, "negatives");
    _done();
  }
}`}}],["go",{"two-sum":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func twoSum(nums []int, target int) []int {
	return nil
}
`,tests:`${x}

func main() {
    _t(twoSum([]int{2, 7, 11, 15}, 9), []int{0, 1}, "example 1")
    _t(twoSum([]int{3, 2, 4}, 6), []int{1, 2}, "example 2")
    _t(twoSum([]int{3, 3}, 6), []int{0, 1}, "duplicate values")
    _t(twoSum([]int{-1, -2, -3, -4, -5}, -8), []int{2, 4}, "negative numbers")
    _t(twoSum([]int{0, 4, 3, 0}, 0), []int{0, 3}, "zeros sum to zero")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"best-time-stock":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func maxProfit(prices []int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(maxProfit([]int{7, 1, 5, 3, 6, 4}), 5, "example 1")
    _t(maxProfit([]int{7, 6, 4, 3, 1}), 0, "strictly decreasing")
    _t(maxProfit([]int{1, 2}), 1, "two days")
    _t(maxProfit([]int{2, 4, 1}), 2, "peak before valley")
    _t(maxProfit([]int{3, 2, 6, 5, 0, 3}), 4, "buy at 2 sell at 6")
    _t(maxProfit([]int{5}), 0, "single day")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"product-except-self":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func productExceptSelf(nums []int) []int {
	return nil
}
`,tests:`${x}

func main() {
    _t(productExceptSelf([]int{1, 2, 3, 4}), []int{24, 12, 8, 6}, "example 1")
    _t(productExceptSelf([]int{-1, 1, 0, -3, 3}), []int{0, 0, 9, 0, 0}, "contains zero")
    _t(productExceptSelf([]int{2, 3}), []int{3, 2}, "two elements")
    _t(productExceptSelf([]int{1, 1, 1, 1}), []int{1, 1, 1, 1}, "all ones")
    _t(productExceptSelf([]int{0, 0}), []int{0, 0}, "two zeros")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"maximum-subarray":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func maxSubarray(nums []int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(maxSubarray([]int{-2, 1, -3, 4, -1, 2, 1, -5, 4}), 6, "example 1")
    _t(maxSubarray([]int{1}), 1, "single element")
    _t(maxSubarray([]int{5, 4, -1, 7, 8}), 23, "whole array")
    _t(maxSubarray([]int{-1}), -1, "single negative")
    _t(maxSubarray([]int{-2, -1}), -1, "all negative")
    _t(maxSubarray([]int{8, -19, 5, -4, 20}), 21, "restart mid-array")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"merge-intervals":{starter:`package main

// imports used by the hidden test runner
import (
	"fmt"
	"sort"
)

func mergeIntervals(intervals [][]int) [][]int {
	return nil
}
`,tests:`var _ = sort.Ints

${x}

func main() {
    _t(mergeIntervals([][]int{{1, 3}, {2, 6}, {8, 10}, {15, 18}}), [][]int{{1, 6}, {8, 10}, {15, 18}}, "example 1")
    _t(mergeIntervals([][]int{{1, 4}, {4, 5}}), [][]int{{1, 5}}, "touching intervals")
    _t(mergeIntervals([][]int{{1, 4}, {2, 3}}), [][]int{{1, 4}}, "fully contained")
    _t(mergeIntervals([][]int{{5, 6}, {1, 2}}), [][]int{{1, 2}, {5, 6}}, "unsorted input")
    _t(mergeIntervals([][]int{{1, 4}, {0, 4}}), [][]int{{0, 4}}, "same end")
    _t(mergeIntervals([][]int{{2, 2}}), [][]int{{2, 2}}, "single point interval")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"first-missing-positive":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func firstMissingPositive(nums []int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(firstMissingPositive([]int{1, 2, 0}), 3, "example 1")
    _t(firstMissingPositive([]int{3, 4, -1, 1}), 2, "example 2")
    _t(firstMissingPositive([]int{7, 8, 9, 11, 12}), 1, "no small positives")
    _t(firstMissingPositive([]int{1}), 2, "single element")
    _t(firstMissingPositive([]int{2, 1}), 3, "complete pair")
    _t(firstMissingPositive([]int{1, 1}), 2, "duplicates")
    _t(firstMissingPositive([]int{-5}), 1, "only negative")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"single-number":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func singleNumber(nums []int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(singleNumber([]int{2, 2, 1}), 1, "example 1")
    _t(singleNumber([]int{4, 1, 2, 1, 2}), 4, "example 2")
    _t(singleNumber([]int{1}), 1, "single element")
    _t(singleNumber([]int{-1, -1, 7}), 7, "negative pairs")
    _t(singleNumber([]int{0, 1, 0}), 1, "zero pair")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"counting-bits":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func countBits(n int) []int {
	return nil
}
`,tests:`${x}

func main() {
    _t(countBits(2), []int{0, 1, 1}, "example 1")
    _t(countBits(5), []int{0, 1, 1, 2, 1, 2}, "example 2")
    _t(countBits(0), []int{0}, "just zero")
    _t(countBits(8), []int{0, 1, 1, 2, 1, 2, 2, 3, 1}, "powers of two reset")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"climbing-stairs":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func climbStairs(n int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(climbStairs(2), 2, "example 1")
    _t(climbStairs(3), 3, "example 2")
    _t(climbStairs(1), 1, "one step")
    _t(climbStairs(5), 8, "five steps")
    _t(climbStairs(10), 89, "ten steps")
    _t(climbStairs(45), 1836311903, "large n needs O(n)")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"house-robber":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func rob(nums []int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(rob([]int{1, 2, 3, 1}), 4, "example 1")
    _t(rob([]int{2, 7, 9, 3, 1}), 12, "example 2")
    _t(rob([]int{5}), 5, "single house")
    _t(rob([]int{2, 1, 1, 2}), 4, "skip two in a row")
    _t(rob([]int{2, 100, 3, 100, 4}), 200, "alternating riches")
    _t(rob([]int{0, 0, 0}), 0, "nothing to steal")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"coin-change":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func coinChange(coins []int, amount int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(coinChange([]int{1, 2, 5}, 11), 3, "example 1")
    _t(coinChange([]int{2}, 3), -1, "impossible")
    _t(coinChange([]int{1}, 0), 0, "zero amount")
    _t(coinChange([]int{1, 3, 4}, 6), 2, "greedy fails here")
    _t(coinChange([]int{2, 5, 10, 1}, 27), 4, "27 = 10+10+5+2")
    _t(coinChange([]int{186, 419, 83, 408}, 6249), 20, "large stress case")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"longest-increasing-subsequence":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func lengthOfLIS(nums []int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(lengthOfLIS([]int{10, 9, 2, 5, 3, 7, 101, 18}), 4, "example 1")
    _t(lengthOfLIS([]int{0, 1, 0, 3, 2, 3}), 4, "example 2")
    _t(lengthOfLIS([]int{7, 7, 7, 7, 7, 7, 7}), 1, "all equal")
    _t(lengthOfLIS([]int{4, 10, 4, 3, 8, 9}), 3, "[4,8,9]")
    _t(lengthOfLIS([]int{1}), 1, "single element")
    _t(lengthOfLIS([]int{5, 4, 3, 2, 1}), 1, "strictly decreasing")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"edit-distance":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func minDistance(word1 string, word2 string) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(minDistance("horse", "ros"), 3, "example 1")
    _t(minDistance("intention", "execution"), 5, "example 2")
    _t(minDistance("", "abc"), 3, "all inserts")
    _t(minDistance("abc", ""), 3, "all deletes")
    _t(minDistance("abc", "abc"), 0, "identical")
    _t(minDistance("park", "spake"), 3, "mixed operations")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"regex-matching":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func isMatch(s string, p string) bool {
	return false
}
`,tests:`${x}

func main() {
    _t(isMatch("aa", "a"), false, "example 1")
    _t(isMatch("aa", "a*"), true, "star expands")
    _t(isMatch("ab", ".*"), true, "dot star")
    _t(isMatch("aab", "c*a*b"), true, "zero c then two a")
    _t(isMatch("mississippi", "mis*is*p*."), false, "classic false case")
    _t(isMatch("", "c*"), true, "empty string vs star")
    _t(isMatch("ab", ".*c"), false, "trailing literal unmatched")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"number-of-islands":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func numIslands(grid [][]string) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(numIslands([][]string{{"1", "1", "1", "1", "0"}, {"1", "1", "0", "1", "0"}, {"1", "1", "0", "0", "0"}, {"0", "0", "0", "0", "0"}}), 1, "one island")
    _t(numIslands([][]string{{"1", "1", "0", "0", "0"}, {"1", "1", "0", "0", "0"}, {"0", "0", "1", "0", "0"}, {"0", "0", "0", "1", "1"}}), 3, "three islands")
    _t(numIslands([][]string{{"1"}}), 1, "single land cell")
    _t(numIslands([][]string{{"0"}}), 0, "single water cell")
    _t(numIslands([][]string{{"1", "0", "1"}, {"0", "1", "0"}, {"1", "0", "1"}}), 5, "diagonals do not connect")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"course-schedule":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func canFinish(numCourses int, prerequisites [][]int) bool {
	return false
}
`,tests:`${x}

func main() {
    _t(canFinish(2, [][]int{{1, 0}}), true, "simple chain")
    _t(canFinish(2, [][]int{{1, 0}, {0, 1}}), false, "two-node cycle")
    _t(canFinish(5, [][]int{{1, 4}, {2, 4}, {3, 1}, {3, 2}}), true, "diamond DAG")
    _t(canFinish(1, [][]int{}), true, "no prerequisites")
    _t(canFinish(3, [][]int{{0, 1}, {1, 2}, {2, 0}}), false, "three-node cycle")
    _t(canFinish(4, [][]int{{1, 0}, {2, 1}, {3, 2}}), true, "long chain")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"word-ladder":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func ladderLength(beginWord string, endWord string, wordList []string) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(ladderLength("hit", "cog", []string{"hot", "dot", "dog", "lot", "log", "cog"}), 5, "example 1")
    _t(ladderLength("hit", "cog", []string{"hot", "dot", "dog", "lot", "log"}), 0, "endWord missing")
    _t(ladderLength("a", "c", []string{"a", "b", "c"}), 2, "single letter words")
    _t(ladderLength("hot", "dog", []string{"hot", "dog"}), 0, "no bridge word")
    _t(ladderLength("hot", "dot", []string{"dot"}), 2, "direct neighbor")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"group-anagrams":{starter:`package main

// imports used by the hidden test runner
import (
	"fmt"
	"sort"
	"strings"
)

func groupAnagrams(strs []string) [][]string {
	return nil
}
`,tests:`var _ = sort.Strings
var _ = strings.Join

${y}

${x}

func main() {
    _t(_normS(groupAnagrams([]string{"eat", "tea", "tan", "ate", "nat", "bat"})), [][]string{{"ate", "eat", "tea"}, {"bat"}, {"nat", "tan"}}, "example 1")
    _t(_normS(groupAnagrams([]string{""})), [][]string{{""}}, "empty string")
    _t(_normS(groupAnagrams([]string{"a"})), [][]string{{"a"}}, "single string")
    _t(_normS(groupAnagrams([]string{"ab", "ba", "ab"})), [][]string{{"ab", "ab", "ba"}}, "duplicate words")
    _t(_normS(groupAnagrams([]string{"abc", "def"})), [][]string{{"abc"}, {"def"}}, "no anagrams")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"top-k-frequent":{starter:`package main

// imports used by the hidden test runner
import (
	"fmt"
	"sort"
)

func topKFrequent(nums []int, k int) []int {
	return nil
}
`,tests:`${x}

func _sorted(a []int) []int {
    c := append([]int(nil), a...)
    sort.Ints(c)
    return c
}

func main() {
    _t(_sorted(topKFrequent([]int{1, 1, 1, 2, 2, 3}, 2)), []int{1, 2}, "example 1")
    _t(_sorted(topKFrequent([]int{1}, 1)), []int{1}, "single element")
    _t(_sorted(topKFrequent([]int{4, 4, 4, 5, 5, 6}, 1)), []int{4}, "top one")
    _t(_sorted(topKFrequent([]int{1, 2}, 2)), []int{1, 2}, "all elements")
    _t(_sorted(topKFrequent([]int{-1, -1, 2, 2, 2}, 2)), []int{-1, 2}, "negatives")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"longest-consecutive-sequence":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func longestConsecutive(nums []int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(longestConsecutive([]int{100, 4, 200, 1, 3, 2}), 4, "example 1")
    _t(longestConsecutive([]int{0, 3, 7, 2, 5, 8, 4, 6, 0, 1}), 9, "example 2")
    _t(longestConsecutive([]int{}), 0, "empty array")
    _t(longestConsecutive([]int{1, 2, 0, 1}), 3, "duplicates")
    _t(longestConsecutive([]int{5}), 1, "single element")
    _t(longestConsecutive([]int{-2, -1, 0, 1}), 4, "negative run")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"reverse-linked-list":{starter:`package main

// imports used by the hidden test runner
import "fmt"

// Provided: type ListNode struct { Val int; Next *ListNode }
func reverseList(head *ListNode) *ListNode {
	return nil
}
`,tests:`${w}

${x}

func main() {
    _t(_toList(reverseList(_build([]int{1, 2, 3, 4, 5}))), []int{5, 4, 3, 2, 1}, "five nodes")
    _t(_toList(reverseList(_build([]int{1, 2}))), []int{2, 1}, "two nodes")
    _t(_toList(reverseList(_build([]int{}))), []int{}, "empty list")
    _t(_toList(reverseList(_build([]int{7}))), []int{7}, "single node")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"linked-list-cycle":{starter:`package main

// imports used by the hidden test runner
import "fmt"

// Provided: type ListNode struct { Val int; Next *ListNode }
func hasCycle(head *ListNode) bool {
	return false
}
`,tests:`${w}

${x}

func main() {
    h := _build([]int{3, 2, 0, -4})
    tail := h
    for tail.Next != nil {
        tail = tail.Next
    }
    tail.Next = h.Next
    _t(hasCycle(h), true, "cycle to index 1")
    _t(hasCycle(_build([]int{1, 2})), false, "no cycle")
    _t(hasCycle(_build([]int{})), false, "empty list")
    s := _build([]int{1})
    s.Next = s
    _t(hasCycle(s), true, "self loop")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"merge-k-sorted-lists":{starter:`package main

// imports used by the hidden test runner
import "fmt"

// Provided: type ListNode struct { Val int; Next *ListNode }
func mergeKLists(lists []*ListNode) *ListNode {
	return nil
}
`,tests:`${w}

${x}

func main() {
    _t(_toList(mergeKLists([]*ListNode{_build([]int{1, 4, 5}), _build([]int{1, 3, 4}), _build([]int{2, 6})})), []int{1, 1, 2, 3, 4, 4, 5, 6}, "example 1")
    _t(_toList(mergeKLists([]*ListNode{})), []int{}, "no lists")
    _t(_toList(mergeKLists([]*ListNode{_build([]int{})})), []int{}, "one empty list")
    _t(_toList(mergeKLists([]*ListNode{_build([]int{1}), _build([]int{0})})), []int{0, 1}, "two singletons")
    _t(_toList(mergeKLists([]*ListNode{_build([]int{-2, -1}), _build([]int{}), _build([]int{-3})})), []int{-3, -2, -1}, "negatives and empty")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"palindrome-number":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func isPalindromeNumber(x int) bool {
	return false
}
`,tests:`${x}

func main() {
    _t(isPalindromeNumber(121), true, "example 1")
    _t(isPalindromeNumber(-121), false, "negative")
    _t(isPalindromeNumber(10), false, "trailing zero")
    _t(isPalindromeNumber(0), true, "zero")
    _t(isPalindromeNumber(1221), true, "even digits")
    _t(isPalindromeNumber(1234567899), false, "large number")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"basic-calculator":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func calculate(s string) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(calculate("1 + 1"), 2, "example 1")
    _t(calculate(" 2-1 + 2 "), 3, "example 2")
    _t(calculate("(1+(4+5+2)-3)+(6+8)"), 23, "nested parens")
    _t(calculate("-2+ 1"), -1, "unary minus")
    _t(calculate("- (3 + (4 + 5))"), -12, "unary minus on group")
    _t(calculate("2147483647"), 2147483647, "single big number")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"knn-classifier":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func knnPredict(XTrain [][]float64, yTrain []int, x []float64, k int) int {
	return 0
}
`,tests:`${x}

func main() {
    X := [][]float64{{1, 1}, {2, 2}, {8, 8}, {9, 9}}
    y := []int{0, 0, 1, 1}
    _t(knnPredict(X, y, []float64{1.5, 1.5}, 3), 0, "near cluster 0")
    _t(knnPredict(X, y, []float64{8.5, 8.5}, 3), 1, "near cluster 1")
    _t(knnPredict(X, y, []float64{2, 2}, 1), 0, "exact match k=1")
    _t(knnPredict([][]float64{{0}, {1}, {2}, {10}}, []int{0, 0, 0, 1}, []float64{9}, 1), 1, "1D nearest outlier")
    _t(knnPredict([][]float64{{1, 1}, {1, 2}, {2, 1}, {5, 5}, {5, 6}}, []int{0, 0, 0, 1, 1}, []float64{4.5, 5}, 3), 1, "five points k=3")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"gradient-descent-linear":{starter:`package main

// imports used by the hidden test runner
import (
	"fmt"
	"math"
)

// Returns slope w and intercept b for the best-fit line y = w*x + b.
func gradientDescent(X []float64, y []float64, lr float64, epochs int) (float64, float64) {
	return 0, 0
}
`,tests:`var _ = math.Round

${x}

func main() {
    w, b := gradientDescent([]float64{1, 2, 3, 4}, []float64{3, 5, 7, 9}, 0.01, 5000)
    _t(int(math.Round(w*5+b)), 11, "predict x=5 on y=2x+1")
    _t(int(math.Round(w*10+b)), 21, "predict x=10 on y=2x+1")
    w2, b2 := gradientDescent([]float64{0, 1, 2, 3}, []float64{1, 1, 1, 1}, 0.01, 5000)
    _t(int(math.Round(w2*7+b2)), 1, "flat data learns w=0 b=1")
    w3, b3 := gradientDescent([]float64{1, 2, 3}, []float64{-2, -4, -6}, 0.01, 5000)
    _t(int(math.Round(w3*4+b3)), -8, "negative slope y=-2x")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"min-stack":{starter:`package main

// imports used by the hidden test runner
import "fmt"

type MinStack struct {
}

func NewMinStack() *MinStack { return &MinStack{} }

func (s *MinStack) Push(val int) {}

func (s *MinStack) Pop() {}

func (s *MinStack) Top() int { return 0 }

func (s *MinStack) GetMin() int { return 0 }
`,tests:`${x}

func main() {
    s := NewMinStack()
    s.Push(-2)
    s.Push(0)
    s.Push(-3)
    _t(s.GetMin(), -3, "min after pushes")
    s.Pop()
    _t(s.Top(), 0, "top after pop")
    _t(s.GetMin(), -2, "min after pop")
    s2 := NewMinStack()
    s2.Push(5)
    s2.Push(5)
    s2.Pop()
    _t(s2.GetMin(), 5, "duplicate minimums")
    s2.Push(3)
    s2.Push(7)
    _t(s2.GetMin(), 3, "min not at top")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"lru-cache":{starter:`package main

// imports used by the hidden test runner
import "fmt"

type LRUCache struct {
}

func NewLRUCache(capacity int) *LRUCache { return &LRUCache{} }

func (c *LRUCache) Get(key int) int { return 0 }

func (c *LRUCache) Put(key int, value int) {}
`,tests:`${x}

func main() {
    c := NewLRUCache(2)
    c.Put(1, 1)
    c.Put(2, 2)
    _t(c.Get(1), 1, "get refreshes key 1")
    c.Put(3, 3)
    _t(c.Get(2), -1, "key 2 evicted")
    c.Put(4, 4)
    _t(c.Get(1), -1, "key 1 evicted")
    _t(c.Get(3), 3, "key 3 alive")
    _t(c.Get(4), 4, "key 4 alive")
    c2 := NewLRUCache(1)
    c2.Put(2, 1)
    _t(c2.Get(2), 1, "capacity one")
    c2.Put(2, 99)
    _t(c2.Get(2), 99, "update in place")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},subsets:{starter:`package main

// imports used by the hidden test runner
import (
	"fmt"
	"sort"
)

func subsets(nums []int) [][]int {
	return nil
}
`,tests:`${b}

${x}

func main() {
    _t(_norm(subsets([]int{1, 2, 3})), [][]int{{}, {1}, {1, 2}, {1, 2, 3}, {1, 3}, {2}, {2, 3}, {3}}, "example 1")
    _t(_norm(subsets([]int{0})), [][]int{{}, {0}}, "single element")
    _t(len(subsets([]int{1, 2, 3, 4, 5})), 32, "2^5 subsets")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"combination-sum":{starter:`package main

// imports used by the hidden test runner
import (
	"fmt"
	"sort"
)

func combinationSum(candidates []int, target int) [][]int {
	return nil
}
`,tests:`${b}

${x}

func main() {
    _t(_norm(combinationSum([]int{2, 3, 6, 7}, 7)), [][]int{{2, 2, 3}, {7}}, "example 1")
    _t(_norm(combinationSum([]int{2, 3, 5}, 8)), [][]int{{2, 2, 2, 2}, {2, 3, 3}, {3, 5}}, "example 2")
    _t(_norm(combinationSum([]int{2}, 1)), [][]int{}, "impossible")
    _t(_norm(combinationSum([]int{3}, 9)), [][]int{{3, 3, 3}}, "single candidate reused")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"n-queens":{starter:`package main

// imports used by the hidden test runner
import (
	"fmt"
	"sort"
	"strings"
)

func solveNQueens(n int) [][]string {
	return nil
}
`,tests:`var _ = sort.Strings
var _ = strings.Join

${y}

${x}

func main() {
    _t(_normS(solveNQueens(4)), _normS([][]string{{"..Q.", "Q...", "...Q", ".Q.."}, {".Q..", "...Q", "Q...", "..Q."}}), "n=4 both solutions")
    _t(_normS(solveNQueens(1)), [][]string{{"Q"}}, "n=1")
    _t(_normS(solveNQueens(2)), [][]string{}, "n=2 impossible")
    _t(_normS(solveNQueens(3)), [][]string{}, "n=3 impossible")
    _t(len(solveNQueens(5)), 10, "n=5 has 10 solutions")
    _t(len(solveNQueens(6)), 4, "n=6 has 4 solutions")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"longest-substring-no-repeat":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func lengthOfLongestSubstring(s string) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(lengthOfLongestSubstring("abcabcbb"), 3, "example 1")
    _t(lengthOfLongestSubstring("bbbbb"), 1, "all same char")
    _t(lengthOfLongestSubstring("pwwkew"), 3, "example 3")
    _t(lengthOfLongestSubstring(""), 0, "empty string")
    _t(lengthOfLongestSubstring("au"), 2, "two distinct")
    _t(lengthOfLongestSubstring("dvdf"), 3, "window left jump")
    _t(lengthOfLongestSubstring("abba"), 2, "stale index trap")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"sliding-window-maximum":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func maxSlidingWindow(nums []int, k int) []int {
	return nil
}
`,tests:`${x}

func main() {
    _t(maxSlidingWindow([]int{1, 3, -1, -3, 5, 3, 6, 7}, 3), []int{3, 3, 5, 5, 6, 7}, "example 1")
    _t(maxSlidingWindow([]int{1}, 1), []int{1}, "single element")
    _t(maxSlidingWindow([]int{1, -1}, 1), []int{1, -1}, "window of one")
    _t(maxSlidingWindow([]int{9, 11}, 2), []int{11}, "increasing pair")
    _t(maxSlidingWindow([]int{4, -2}, 2), []int{4}, "decreasing pair")
    _t(maxSlidingWindow([]int{7, 2, 4}, 2), []int{7, 4}, "leading max expires")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"minimum-window-substring":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func minWindow(s string, t string) string {
	return ""
}
`,tests:`${x}

func main() {
    _t(minWindow("ADOBECODEBANC", "ABC"), "BANC", "example 1")
    _t(minWindow("a", "a"), "a", "single char match")
    _t(minWindow("a", "aa"), "", "not enough chars")
    _t(minWindow("ab", "b"), "b", "suffix window")
    _t(minWindow("bba", "ab"), "ba", "duplicates in s")
    _t(minWindow("aaflslflsldkalskaaa", "aaa"), "aaa", "repeated requirement")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"binary-search":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func search(nums []int, target int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(search([]int{-1, 0, 3, 5, 9, 12}, 9), 4, "example 1")
    _t(search([]int{-1, 0, 3, 5, 9, 12}, 2), -1, "not found")
    _t(search([]int{5}, 5), 0, "single element hit")
    _t(search([]int{5}, -5), -1, "single element miss")
    _t(search([]int{1, 3}, 3), 1, "two elements right")
    _t(search([]int{1, 3}, 1), 0, "two elements left")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"search-rotated-array":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func searchRotated(nums []int, target int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(searchRotated([]int{4, 5, 6, 7, 0, 1, 2}, 0), 4, "example 1")
    _t(searchRotated([]int{4, 5, 6, 7, 0, 1, 2}, 3), -1, "not present")
    _t(searchRotated([]int{1}, 0), -1, "single miss")
    _t(searchRotated([]int{3, 1}, 1), 1, "two rotated")
    _t(searchRotated([]int{5, 1, 3}, 5), 0, "target at pivot start")
    _t(searchRotated([]int{1, 2, 3, 4, 5}, 4), 3, "no rotation")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"kth-largest-element":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func findKthLargest(nums []int, k int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(findKthLargest([]int{3, 2, 1, 5, 6, 4}, 2), 5, "example 1")
    _t(findKthLargest([]int{3, 2, 3, 1, 2, 4, 5, 5, 6}, 4), 4, "with duplicates")
    _t(findKthLargest([]int{1}, 1), 1, "single element")
    _t(findKthLargest([]int{7, 6, 5, 4, 3, 2, 1}, 5), 3, "descending input")
    _t(findKthLargest([]int{2, 1}, 2), 1, "k equals length")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"median-two-sorted-arrays":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
	return 0
}
`,tests:`${x}

func main() {
    _t(findMedianSortedArrays([]int{1, 3}, []int{2}), float64(2), "example 1")
    _t(findMedianSortedArrays([]int{1, 2}, []int{3, 4}), 2.5, "example 2")
    _t(findMedianSortedArrays([]int{0, 0}, []int{0, 0}), float64(0), "all zeros")
    _t(findMedianSortedArrays([]int{}, []int{1}), float64(1), "first empty")
    _t(findMedianSortedArrays([]int{2}, []int{}), float64(2), "second empty")
    _t(findMedianSortedArrays([]int{1, 2}, []int{-1, 3}), 1.5, "interleaved")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"valid-parentheses":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func isValid(s string) bool {
	return false
}
`,tests:`${x}

func main() {
    _t(isValid("()"), true, "simple pair")
    _t(isValid("()[]{}"), true, "three pairs")
    _t(isValid("(]"), false, "wrong type")
    _t(isValid("([)]"), false, "wrong order")
    _t(isValid("{[]}"), true, "nested")
    _t(isValid("("), false, "unclosed opener")
    _t(isValid("]"), false, "closer without opener")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"daily-temperatures":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func dailyTemperatures(temperatures []int) []int {
	return nil
}
`,tests:`${x}

func main() {
    _t(dailyTemperatures([]int{73, 74, 75, 71, 69, 72, 76, 73}), []int{1, 1, 4, 2, 1, 1, 0, 0}, "example 1")
    _t(dailyTemperatures([]int{30, 40, 50, 60}), []int{1, 1, 1, 0}, "increasing")
    _t(dailyTemperatures([]int{90, 60, 30}), []int{0, 0, 0}, "decreasing")
    _t(dailyTemperatures([]int{50}), []int{0}, "single day")
    _t(dailyTemperatures([]int{70, 70, 75}), []int{2, 1, 0}, "equal temps wait")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"largest-rectangle-histogram":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func largestRectangleArea(heights []int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(largestRectangleArea([]int{2, 1, 5, 6, 2, 3}), 10, "example 1")
    _t(largestRectangleArea([]int{2, 4}), 4, "two bars")
    _t(largestRectangleArea([]int{1}), 1, "single bar")
    _t(largestRectangleArea([]int{2, 2, 2}), 6, "flat histogram")
    _t(largestRectangleArea([]int{5, 4, 1, 2}), 8, "descending then rise")
    _t(largestRectangleArea([]int{0, 9}), 9, "zero-height bar")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"max-depth-binary-tree":{starter:`package main

// imports used by the hidden test runner
import "fmt"

// Provided: type TreeNode struct { Val int; Left, Right *TreeNode }
func maxDepth(root *TreeNode) int {
	return 0
}
`,tests:`${v}

${x}

func main() {
    _t(maxDepth(_tree([]interface{}{3, 9, 20, nil, nil, 15, 7})), 3, "example 1")
    _t(maxDepth(_tree([]interface{}{1, nil, 2})), 2, "right skewed")
    _t(maxDepth(_tree([]interface{}{})), 0, "empty tree")
    _t(maxDepth(_tree([]interface{}{0})), 1, "single node")
    _t(maxDepth(_tree([]interface{}{1, 2, 3, 4, nil, nil, nil, 5})), 4, "left-heavy chain")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"validate-bst":{starter:`package main

// imports used by the hidden test runner
import "fmt"

// Provided: type TreeNode struct { Val int; Left, Right *TreeNode }
func isValidBST(root *TreeNode) bool {
	return false
}
`,tests:`${v}

${x}

func main() {
    _t(isValidBST(_tree([]interface{}{2, 1, 3})), true, "example 1")
    _t(isValidBST(_tree([]interface{}{5, 1, 4, nil, nil, 3, 6})), false, "example 2")
    _t(isValidBST(_tree([]interface{}{1})), true, "single node")
    _t(isValidBST(_tree([]interface{}{5, 4, 6, nil, nil, 3, 7})), false, "deep violation")
    _t(isValidBST(_tree([]interface{}{2, 2, 2})), false, "duplicates invalid")
    _t(isValidBST(_tree([]interface{}{-10, -20, 0})), true, "negative values")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"level-order-traversal":{starter:`package main

// imports used by the hidden test runner
import "fmt"

// Provided: type TreeNode struct { Val int; Left, Right *TreeNode }
func levelOrder(root *TreeNode) [][]int {
	return nil
}
`,tests:`${v}

${x}

func main() {
    _t(levelOrder(_tree([]interface{}{3, 9, 20, nil, nil, 15, 7})), [][]int{{3}, {9, 20}, {15, 7}}, "example 1")
    _t(levelOrder(_tree([]interface{}{1})), [][]int{{1}}, "single node")
    _t(levelOrder(_tree([]interface{}{})), [][]int{}, "empty tree")
    _t(levelOrder(_tree([]interface{}{1, 2, nil, 3})), [][]int{{1}, {2}, {3}}, "left chain")
    _t(levelOrder(_tree([]interface{}{1, 2, 3, 4, 5, 6, 7})), [][]int{{1}, {2, 3}, {4, 5, 6, 7}}, "perfect tree")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"binary-tree-max-path-sum":{starter:`package main

// imports used by the hidden test runner
import "fmt"

// Provided: type TreeNode struct { Val int; Left, Right *TreeNode }
func maxPathSum(root *TreeNode) int {
	return 0
}
`,tests:`${v}

${x}

func main() {
    _t(maxPathSum(_tree([]interface{}{1, 2, 3})), 6, "example 1")
    _t(maxPathSum(_tree([]interface{}{-10, 9, 20, nil, nil, 15, 7})), 42, "example 2")
    _t(maxPathSum(_tree([]interface{}{-3})), -3, "single negative node")
    _t(maxPathSum(_tree([]interface{}{2, -1})), 2, "skip negative child")
    _t(maxPathSum(_tree([]interface{}{-2, -1})), -1, "all negative picks max node")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"valid-palindrome":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func isPalindrome(s string) bool {
	return false
}
`,tests:`${x}

func main() {
    _t(isPalindrome("A man, a plan, a canal: Panama"), true, "example 1")
    _t(isPalindrome("race a car"), false, "example 2")
    _t(isPalindrome(" "), true, "whitespace only")
    _t(isPalindrome("0P"), false, "digit vs letter")
    _t(isPalindrome("ab_a"), true, "underscore ignored")
    _t(isPalindrome("a"), true, "single char")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"three-sum":{starter:`package main

// imports used by the hidden test runner
import (
	"fmt"
	"sort"
)

func threeSum(nums []int) [][]int {
	return nil
}
`,tests:`${b}

${x}

func main() {
    _t(_norm(threeSum([]int{-1, 0, 1, 2, -1, -4})), [][]int{{-1, -1, 2}, {-1, 0, 1}}, "example 1")
    _t(_norm(threeSum([]int{0, 1, 1})), [][]int{}, "no solution")
    _t(_norm(threeSum([]int{0, 0, 0})), [][]int{{0, 0, 0}}, "all zeros")
    _t(_norm(threeSum([]int{-2, 0, 1, 1, 2})), [][]int{{-2, 0, 2}, {-2, 1, 1}}, "two triplets")
    _t(_norm(threeSum([]int{0, 0, 0, 0})), [][]int{{0, 0, 0}}, "extra zeros deduped")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"container-most-water":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func maxArea(height []int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(maxArea([]int{1, 8, 6, 2, 5, 4, 8, 3, 7}), 49, "example 1")
    _t(maxArea([]int{1, 1}), 1, "two lines")
    _t(maxArea([]int{4, 3, 2, 1, 4}), 16, "equal ends")
    _t(maxArea([]int{1, 2, 1}), 2, "small peak")
    _t(maxArea([]int{2, 3, 4, 5, 18, 17, 6}), 17, "tall middle pair")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"trapping-rain-water":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func trap(height []int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(trap([]int{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1}), 6, "example 1")
    _t(trap([]int{4, 2, 0, 3, 2, 5}), 9, "example 2")
    _t(trap([]int{1, 2, 3}), 0, "monotonic — traps nothing")
    _t(trap([]int{3}), 0, "single bar")
    _t(trap([]int{5, 4, 1, 2}), 1, "shallow right wall")
    _t(trap([]int{2, 0, 2}), 2, "simple valley")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"rotate-array":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func rotate(nums []int, k int) []int {
	return nil
}
`,tests:`${x}

func main() {
    _t(rotate([]int{1, 2, 3, 4, 5, 6, 7}, 3), []int{5, 6, 7, 1, 2, 3, 4}, "example 1")
    _t(rotate([]int{-1, -100, 3, 99}, 2), []int{3, 99, -1, -100}, "example 2")
    _t(rotate([]int{1, 2}, 3), []int{2, 1}, "k exceeds length")
    _t(rotate([]int{1, 2, 3}, 0), []int{1, 2, 3}, "zero rotation")
    _t(rotate([]int{1}, 100), []int{1}, "single element")
    _t(rotate([]int{1, 2, 3, 4}, 4), []int{1, 2, 3, 4}, "full rotation unchanged")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"longest-common-prefix":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func longestCommonPrefix(strs []string) string {
	return ""
}
`,tests:`${x}

func main() {
    _t(longestCommonPrefix([]string{"flower", "flow", "flight"}), "fl", "example 1")
    _t(longestCommonPrefix([]string{"dog", "racecar", "car"}), "", "no common prefix")
    _t(longestCommonPrefix([]string{"a"}), "a", "single string")
    _t(longestCommonPrefix([]string{"ab", "abc", "abcd"}), "ab", "shortest is prefix")
    _t(longestCommonPrefix([]string{"", "abc"}), "", "empty string present")
    _t(longestCommonPrefix([]string{"interspecies", "interstellar", "interstate"}), "inters", "long prefix")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"spiral-matrix":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func spiralOrder(matrix [][]int) []int {
	return nil
}
`,tests:`${x}

func main() {
    _t(spiralOrder([][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}), []int{1, 2, 3, 6, 9, 8, 7, 4, 5}, "example 1")
    _t(spiralOrder([][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}}), []int{1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7}, "example 2")
    _t(spiralOrder([][]int{{1}}), []int{1}, "single cell")
    _t(spiralOrder([][]int{{1, 2, 3}}), []int{1, 2, 3}, "single row")
    _t(spiralOrder([][]int{{1}, {2}, {3}}), []int{1, 2, 3}, "single column")
    _t(spiralOrder([][]int{{1, 2}, {3, 4}}), []int{1, 2, 4, 3}, "two by two")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"set-matrix-zeroes":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func setZeroes(matrix [][]int) [][]int {
	return nil
}
`,tests:`${x}

func main() {
    _t(setZeroes([][]int{{1, 1, 1}, {1, 0, 1}, {1, 1, 1}}), [][]int{{1, 0, 1}, {0, 0, 0}, {1, 0, 1}}, "example 1")
    _t(setZeroes([][]int{{0, 1, 2, 0}, {3, 4, 5, 2}, {1, 3, 1, 5}}), [][]int{{0, 0, 0, 0}, {0, 4, 5, 0}, {0, 3, 1, 0}}, "example 2")
    _t(setZeroes([][]int{{1, 2, 3}}), [][]int{{1, 2, 3}}, "no zeros")
    _t(setZeroes([][]int{{0}}), [][]int{{0}}, "single zero")
    _t(setZeroes([][]int{{1, 0}, {1, 1}}), [][]int{{0, 0}, {1, 0}}, "two by two")
    _t(setZeroes([][]int{{5, 0, 5}, {5, 5, 5}}), [][]int{{0, 0, 0}, {5, 0, 5}}, "column zeroed")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"insert-interval":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func insert(intervals [][]int, newInterval []int) [][]int {
	return nil
}
`,tests:`${x}

func main() {
    _t(insert([][]int{{1, 3}, {6, 9}}, []int{2, 5}), [][]int{{1, 5}, {6, 9}}, "example 1")
    _t(insert([][]int{{1, 2}, {3, 5}, {6, 7}, {8, 10}, {12, 16}}, []int{4, 8}), [][]int{{1, 2}, {3, 10}, {12, 16}}, "example 2")
    _t(insert([][]int{}, []int{5, 7}), [][]int{{5, 7}}, "empty list")
    _t(insert([][]int{{1, 5}}, []int{2, 3}), [][]int{{1, 5}}, "contained interval")
    _t(insert([][]int{{3, 5}, {8, 10}}, []int{1, 2}), [][]int{{1, 2}, {3, 5}, {8, 10}}, "insert at front")
    _t(insert([][]int{{1, 2}, {5, 6}}, []int{2, 5}), [][]int{{1, 6}}, "touching merge")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},candy:{starter:`package main

// imports used by the hidden test runner
import "fmt"

func candy(ratings []int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(candy([]int{1, 0, 2}), 5, "example 1")
    _t(candy([]int{1, 2, 2}), 4, "example 2")
    _t(candy([]int{1}), 1, "single child")
    _t(candy([]int{1, 2, 3, 4}), 10, "strictly increasing")
    _t(candy([]int{4, 3, 2, 1}), 10, "strictly decreasing")
    _t(candy([]int{1, 3, 2, 2, 1}), 7, "peak then plateau")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"number-of-1-bits":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func hammingWeight(n int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(hammingWeight(11), 3, "example 1")
    _t(hammingWeight(128), 1, "single bit")
    _t(hammingWeight(0), 0, "zero")
    _t(hammingWeight(7), 3, "three low bits")
    _t(hammingWeight(2147483647), 31, "all 31 bits set")
    _t(hammingWeight(1), 1, "one")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"missing-number":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func missingNumber(nums []int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(missingNumber([]int{3, 0, 1}), 2, "example 1")
    _t(missingNumber([]int{0, 1}), 2, "missing at end")
    _t(missingNumber([]int{9, 6, 4, 2, 3, 5, 7, 0, 1}), 8, "example 3")
    _t(missingNumber([]int{0}), 1, "missing one of [0,1]")
    _t(missingNumber([]int{1}), 0, "missing zero")
    _t(missingNumber([]int{0, 2}), 1, "missing middle")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"unique-paths":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func uniquePaths(m int, n int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(uniquePaths(3, 7), 28, "example 1")
    _t(uniquePaths(3, 2), 3, "example 2")
    _t(uniquePaths(1, 1), 1, "single cell")
    _t(uniquePaths(1, 10), 1, "single row")
    _t(uniquePaths(10, 10), 48620, "square grid")
    _t(uniquePaths(23, 12), 193536720, "large but int32-safe")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"word-break":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func wordBreak(s string, wordDict []string) bool {
	return false
}
`,tests:`${x}

func main() {
    _t(wordBreak("leetcode", []string{"leet", "code"}), true, "example 1")
    _t(wordBreak("applepenapple", []string{"apple", "pen"}), true, "reuse a word")
    _t(wordBreak("catsandog", []string{"cats", "dog", "sand", "and", "cat"}), false, "cannot segment")
    _t(wordBreak("a", []string{"a"}), true, "single letter")
    _t(wordBreak("aaaaaaa", []string{"aaaa", "aaa"}), true, "overlap split")
    _t(wordBreak("cars", []string{"car", "ca", "rs"}), true, "ca + rs")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"longest-common-subsequence":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func longestCommonSubsequence(text1 string, text2 string) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(longestCommonSubsequence("abcde", "ace"), 3, "example 1")
    _t(longestCommonSubsequence("abc", "abc"), 3, "identical")
    _t(longestCommonSubsequence("abc", "def"), 0, "no overlap")
    _t(longestCommonSubsequence("bsbininm", "jmjkbkjkv"), 1, "single shared char")
    _t(longestCommonSubsequence("ezupkr", "ubmrapg"), 2, "mixed")
    _t(longestCommonSubsequence("a", "a"), 1, "single char match")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"decode-ways":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func numDecodings(s string) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(numDecodings("12"), 2, "example 1")
    _t(numDecodings("226"), 3, "example 2")
    _t(numDecodings("06"), 0, "leading zero")
    _t(numDecodings("0"), 0, "just zero")
    _t(numDecodings("10"), 1, "ten only")
    _t(numDecodings("100"), 0, "invalid trailing zero")
    _t(numDecodings("11106"), 2, "classic multi")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"partition-equal-subset-sum":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func canPartition(nums []int) bool {
	return false
}
`,tests:`${x}

func main() {
    _t(canPartition([]int{1, 5, 11, 5}), true, "example 1")
    _t(canPartition([]int{1, 2, 3, 5}), false, "odd-ish no split")
    _t(canPartition([]int{1, 1}), true, "two equal")
    _t(canPartition([]int{1}), false, "single element")
    _t(canPartition([]int{2, 2, 3, 5}), false, "sum is even but no subset")
    _t(canPartition([]int{3, 3, 3, 4, 5}), true, "sum 18 -> 9 each")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"burst-balloons":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func maxCoins(nums []int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(maxCoins([]int{3, 1, 5, 8}), 167, "example 1")
    _t(maxCoins([]int{1, 5}), 10, "two balloons")
    _t(maxCoins([]int{5}), 5, "single balloon")
    _t(maxCoins([]int{7}), 7, "single seven")
    _t(maxCoins([]int{1, 2, 3, 4, 5}), 110, "ascending")
    _t(maxCoins([]int{9, 76, 64}), 44416, "three values")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"rotting-oranges":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func orangesRotting(grid [][]int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(orangesRotting([][]int{{2, 1, 1}, {1, 1, 0}, {0, 1, 1}}), 4, "example 1")
    _t(orangesRotting([][]int{{2, 1, 1}, {0, 1, 1}, {1, 0, 1}}), -1, "unreachable fresh orange")
    _t(orangesRotting([][]int{{0, 2}}), 0, "no fresh oranges")
    _t(orangesRotting([][]int{{0}}), 0, "single empty cell")
    _t(orangesRotting([][]int{{1}}), -1, "single fresh orange never rots")
    _t(orangesRotting([][]int{{2, 2}, {1, 1}}), 1, "two sources one minute")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"pacific-atlantic":{starter:`package main

// imports used by the hidden test runner
import (
	"fmt"
	"sort"
)
var _ = sort.Slice

func pacificAtlantic(heights [][]int) [][]int {
	return nil
}
`,tests:`var _ = sort.Slice

${x}

func _norm(a [][]int) [][]int {
    out := make([][]int, len(a))
    for i, p := range a {
        out[i] = []int{p[0], p[1]}
    }
    sort.Slice(out, func(i, j int) bool {
        if out[i][0] != out[j][0] {
            return out[i][0] < out[j][0]
        }
        return out[i][1] < out[j][1]
    })
    return out
}

func main() {
    _t(_norm(pacificAtlantic([][]int{{1, 2, 2, 3, 5}, {3, 2, 3, 4, 4}, {2, 4, 5, 3, 1}, {6, 7, 1, 4, 5}, {5, 1, 1, 2, 4}})), _norm([][]int{{0, 4}, {1, 3}, {1, 4}, {2, 2}, {3, 0}, {3, 1}, {4, 0}}), "example 1")
    _t(_norm(pacificAtlantic([][]int{{1}})), [][]int{{0, 0}}, "single cell")
    _t(_norm(pacificAtlantic([][]int{{2, 1}, {1, 2}})), _norm([][]int{{0, 0}, {0, 1}, {1, 0}, {1, 1}}), "all reach both")
    _t(_norm(pacificAtlantic([][]int{{1, 2, 3}, {8, 9, 4}, {7, 6, 5}})), _norm([][]int{{0, 2}, {1, 0}, {1, 1}, {1, 2}, {2, 0}, {2, 1}, {2, 2}}), "spiral")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"alien-dictionary":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func alienOrder(words []string) string {
	return ""
}
`,tests:`${x}

func main() {
    _t(alienOrder([]string{"wrt", "wrf", "er", "ett", "rftt"}), "wertf", "classic unique order")
    _t(alienOrder([]string{"z", "x", "z"}), "", "cycle is invalid")
    _t(alienOrder([]string{"abc", "ab"}), "", "prefix violation")
    _t(alienOrder([]string{"w", "x", "y", "z"}), "wxyz", "total order from single letters")
    _t(alienOrder([]string{"a"}), "a", "single letter")
    _t(alienOrder([]string{"c", "cb", "b", "ba", "a"}), "cba", "prefix-then-branch chain")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"valid-anagram":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func isAnagram(s string, t string) bool {
	return false
}
`,tests:`${x}

func main() {
    _t(isAnagram("anagram", "nagaram"), true, "example 1")
    _t(isAnagram("rat", "car"), false, "example 2")
    _t(isAnagram("a", "a"), true, "single char match")
    _t(isAnagram("ab", "a"), false, "different lengths")
    _t(isAnagram("aacc", "ccac"), false, "same length different counts")
    _t(isAnagram("listen", "silent"), true, "classic anagram")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"subarray-sum-equals-k":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func subarraySum(nums []int, k int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(subarraySum([]int{1, 1, 1}, 2), 2, "example 1")
    _t(subarraySum([]int{1, 2, 3}, 3), 2, "example 2")
    _t(subarraySum([]int{1, -1, 0}, 0), 3, "negatives and zero")
    _t(subarraySum([]int{3, 4, 7, 2, -3, 1, 4, 2}, 7), 4, "mixed signs")
    _t(subarraySum([]int{0, 0, 0}, 0), 6, "all zeros")
    _t(subarraySum([]int{1}, 0), 0, "no subarray sums to k")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"four-sum-ii":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func fourSumCount(nums1 []int, nums2 []int, nums3 []int, nums4 []int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(fourSumCount([]int{1, 2}, []int{-2, -1}, []int{-1, 2}, []int{0, 2}), 2, "example 1")
    _t(fourSumCount([]int{0}, []int{0}, []int{0}, []int{0}), 1, "example 2")
    _t(fourSumCount([]int{1}, []int{1}, []int{1}, []int{1}), 0, "no tuple sums to zero")
    _t(fourSumCount([]int{-1, 1}, []int{-1, 1}, []int{-1, 1}, []int{-1, 1}), 6, "symmetric arrays")
    _t(fourSumCount([]int{0, 0}, []int{0, 0}, []int{0, 0}, []int{0, 0}), 16, "all zeros")
    _t(fourSumCount([]int{1, 2, 3}, []int{-1, -2, -3}, []int{0, 0, 0}, []int{0, 0, 0}), 27, "many combinations")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"middle-of-linked-list":{starter:`package main

// imports used by the hidden test runner
import "fmt"

// Provided: type ListNode struct { Val int; Next *ListNode }
func middleNode(head *ListNode) *ListNode {
	return nil
}
`,tests:`${w}

${x}

func main() {
    _t(_toList(middleNode(_build([]int{1, 2, 3, 4, 5}))), []int{3, 4, 5}, "odd length")
    _t(_toList(middleNode(_build([]int{1, 2, 3, 4, 5, 6}))), []int{4, 5, 6}, "even length picks second middle")
    _t(_toList(middleNode(_build([]int{1}))), []int{1}, "single node")
    _t(_toList(middleNode(_build([]int{1, 2}))), []int{2}, "two nodes")
    _t(_toList(middleNode(_build([]int{1, 2, 3}))), []int{2, 3}, "three nodes")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"remove-nth-from-end":{starter:`package main

// imports used by the hidden test runner
import "fmt"

// Provided: type ListNode struct { Val int; Next *ListNode }
func removeNthFromEnd(head *ListNode, n int) *ListNode {
	return nil
}
`,tests:`${w}

${x}

func main() {
    _t(_toList(removeNthFromEnd(_build([]int{1, 2, 3, 4, 5}), 2)), []int{1, 2, 3, 5}, "example 1")
    _t(_toList(removeNthFromEnd(_build([]int{1}), 1)), []int{}, "single node removed")
    _t(_toList(removeNthFromEnd(_build([]int{1, 2}), 1)), []int{1}, "remove last of two")
    _t(_toList(removeNthFromEnd(_build([]int{1, 2}), 2)), []int{2}, "remove head of two")
    _t(_toList(removeNthFromEnd(_build([]int{1, 2, 3, 4, 5}), 5)), []int{2, 3, 4, 5}, "remove head")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"add-two-numbers":{starter:`package main

// imports used by the hidden test runner
import "fmt"

// Provided: type ListNode struct { Val int; Next *ListNode }
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
	return nil
}
`,tests:`${w}

${x}

func main() {
    _t(_toList(addTwoNumbers(_build([]int{2, 4, 3}), _build([]int{5, 6, 4}))), []int{7, 0, 8}, "example 1")
    _t(_toList(addTwoNumbers(_build([]int{0}), _build([]int{0}))), []int{0}, "zero plus zero")
    _t(_toList(addTwoNumbers(_build([]int{9, 9, 9, 9, 9, 9, 9}), _build([]int{9, 9, 9, 9}))), []int{8, 9, 9, 9, 0, 0, 0, 1}, "carry out new digit")
    _t(_toList(addTwoNumbers(_build([]int{5}), _build([]int{5}))), []int{0, 1}, "single digit carry")
    _t(_toList(addTwoNumbers(_build([]int{1, 8}), _build([]int{0}))), []int{1, 8}, "different lengths")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"happy-number":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func isHappy(n int) bool {
	return false
}
`,tests:`${x}

func main() {
    _t(isHappy(19), true, "example 1")
    _t(isHappy(2), false, "example 2")
    _t(isHappy(1), true, "one is happy")
    _t(isHappy(7), true, "seven is happy")
    _t(isHappy(4), false, "four enters the cycle")
    _t(isHappy(100), true, "power of ten")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"pow-x-n":{starter:`package main

// imports used by the hidden test runner
import (
	"fmt"
	"math"
)
var _ = math.Round

func myPow(x float64, n int) float64 {
	return 0
}
`,tests:`var _ = math.Round

${x}

func main() {
    _t(int(math.Round(myPow(2.0, 10))), 1024, "two to the tenth")
    _t(int(math.Round(myPow(2.0, 0))), 1, "exponent zero")
    _t(int(math.Round(myPow(2.0, -2)*10000)), 2500, "negative exponent reciprocal")
    _t(int(math.Round(myPow(3.0, 5))), 243, "three to the fifth")
    _t(int(math.Round(myPow(0.5, 4)*10000)), 625, "fractional base")
    _t(int(math.Round(myPow(2.1, 3)*100000)), 926100, "non-integer base")
    _t(int(math.Round(myPow(1.0, 2147483647))), 1, "one to a huge power")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},perceptron:{starter:`package main

// imports used by the hidden test runner
import "fmt"

func perceptron(X [][]float64, y []int, lr float64, epochs int) []int {
	return nil
}
`,tests:`${x}

func main() {
    _t(perceptron([][]float64{{0, 0}, {0, 1}, {1, 0}, {1, 1}}, []int{0, 0, 0, 1}, 0.1, 20), []int{0, 0, 0, 1}, "AND gate")
    _t(perceptron([][]float64{{0, 0}, {0, 1}, {1, 0}, {1, 1}}, []int{0, 1, 1, 1}, 0.1, 20), []int{0, 1, 1, 1}, "OR gate")
    _t(perceptron([][]float64{{0, 0}, {0, 1}, {1, 0}, {1, 1}}, []int{0, 0, 0, 0}, 0.1, 20), []int{0, 0, 0, 0}, "all zeros stay zero")
    _t(perceptron([][]float64{{2, 2}, {3, 3}, {-1, -1}, {-2, -2}}, []int{1, 1, 0, 0}, 0.1, 20), []int{1, 1, 0, 0}, "separable diagonal")
    _t(perceptron([][]float64{{1, 1}}, []int{1}, 0.1, 20), []int{1}, "single positive point")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"cosine-similarity":{starter:`package main

// imports used by the hidden test runner
import (
	"fmt"
	"math"
)
var _ = math.Round

func cosineSimilarity(a []float64, b []float64) float64 {
	return 0
}
`,tests:`var _ = math.Round

${x}

func main() {
    _t(int(math.Round(cosineSimilarity([]float64{1, 0}, []float64{0, 1})*10000)), 0, "orthogonal")
    _t(int(math.Round(cosineSimilarity([]float64{1, 2, 3}, []float64{1, 2, 3})*10000)), 10000, "identical")
    _t(int(math.Round(cosineSimilarity([]float64{1, 2, 3}, []float64{-1, -2, -3})*10000)), -10000, "opposite")
    _t(int(math.Round(cosineSimilarity([]float64{1, 2, 3}, []float64{4, 5, 6})*10000)), 9746, "known case")
    _t(int(math.Round(cosineSimilarity([]float64{2, 0}, []float64{3, 0})*10000)), 10000, "same direction scaled")
    _t(int(math.Round(cosineSimilarity([]float64{1, 1}, []float64{1, 0})*10000)), 7071, "45 degrees")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"implement-trie":{starter:`package main

// imports used by the hidden test runner
import "fmt"

type Trie struct {
}

func NewTrie() *Trie { return &Trie{} }

func (t *Trie) Insert(word string) {}

func (t *Trie) Search(word string) bool { return false }

func (t *Trie) StartsWith(prefix string) bool { return false }
`,tests:`${x}

func main() {
    tr := NewTrie()
    tr.Insert("apple")
    _t(tr.Search("apple"), true, "inserted word found")
    _t(tr.Search("app"), false, "prefix is not a word yet")
    _t(tr.StartsWith("app"), true, "prefix exists")
    tr.Insert("app")
    _t(tr.Search("app"), true, "now a full word")
    _t(tr.StartsWith("appl"), true, "longer prefix exists")
    _t(tr.Search("banana"), false, "never inserted")
    _t(tr.StartsWith("b"), false, "no such prefix")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"queue-using-stacks":{starter:`package main

// imports used by the hidden test runner
import "fmt"

type MyQueue struct {
}

func NewMyQueue() *MyQueue { return &MyQueue{} }

func (q *MyQueue) Push(x int) {}

func (q *MyQueue) Pop() int { return 0 }

func (q *MyQueue) Peek() int { return 0 }

func (q *MyQueue) Empty() bool { return false }
`,tests:`${x}

func main() {
    q := NewMyQueue()
    q.Push(1)
    q.Push(2)
    _t(q.Peek(), 1, "front is 1")
    _t(q.Pop(), 1, "pop returns front")
    _t(q.Empty(), false, "still has 2")
    _t(q.Pop(), 2, "pop returns 2")
    _t(q.Empty(), true, "now empty")
    q.Push(3)
    q.Push(4)
    q.Push(5)
    _t(q.Pop(), 3, "fifo order maintained")
    _t(q.Peek(), 4, "next front is 4")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},permutations:{starter:`package main

// imports used by the hidden test runner
import (
	"fmt"
	"sort"
)
var _ = sort.Slice

func permute(nums []int) [][]int {
	return nil
}
`,tests:`var _ = sort.Slice

${x}

func _normP(a [][]int) [][]int {
    sort.Slice(a, func(i, j int) bool {
        x, y := a[i], a[j]
        m := len(x)
        if len(y) < m {
            m = len(y)
        }
        for k := 0; k < m; k++ {
            if x[k] != y[k] {
                return x[k] < y[k]
            }
        }
        return len(x) < len(y)
    })
    return a
}

func main() {
    _t(_normP(permute([]int{1, 2, 3})), [][]int{{1, 2, 3}, {1, 3, 2}, {2, 1, 3}, {2, 3, 1}, {3, 1, 2}, {3, 2, 1}}, "example 1")
    _t(_normP(permute([]int{0, 1})), [][]int{{0, 1}, {1, 0}}, "two elements")
    _t(_normP(permute([]int{1})), [][]int{{1}}, "single element")
    _t(len(permute([]int{1, 2, 3, 4})), 24, "4! permutations")
    _t(_normP(permute([]int{7, 8, 9})), [][]int{{7, 8, 9}, {7, 9, 8}, {8, 7, 9}, {8, 9, 7}, {9, 7, 8}, {9, 8, 7}}, "distinct values")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"generate-parentheses":{starter:`package main

// imports used by the hidden test runner
import (
	"fmt"
	"sort"
)
var _ = sort.Strings

func generateParenthesis(n int) []string {
	return nil
}
`,tests:`var _ = sort.Strings

${x}

func _sortS(a []string) []string {
    c := append([]string(nil), a...)
    sort.Strings(c)
    return c
}

func main() {
    _t(_sortS(generateParenthesis(3)), _sortS([]string{"((()))", "(()())", "(())()", "()(())", "()()()"}), "example 1")
    _t(_sortS(generateParenthesis(1)), []string{"()"}, "single pair")
    _t(_sortS(generateParenthesis(2)), _sortS([]string{"(())", "()()"}), "two pairs")
    _t(len(generateParenthesis(4)), 14, "catalan number 14")
    _t(len(generateParenthesis(5)), 42, "catalan number 42")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"sudoku-solver":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func solveSudoku(board [][]string) [][]string {
	return nil
}
`,tests:`${x}

func main() {
    _t(solveSudoku([][]string{{"5", "3", ".", ".", "7", ".", ".", ".", "."}, {"6", ".", ".", "1", "9", "5", ".", ".", "."}, {".", "9", "8", ".", ".", ".", ".", "6", "."}, {"8", ".", ".", ".", "6", ".", ".", ".", "3"}, {"4", ".", ".", "8", ".", "3", ".", ".", "1"}, {"7", ".", ".", ".", "2", ".", ".", ".", "6"}, {".", "6", ".", ".", ".", ".", "2", "8", "."}, {".", ".", ".", "4", "1", "9", ".", ".", "5"}, {".", ".", ".", ".", "8", ".", ".", "7", "9"}}), [][]string{{"5", "3", "4", "6", "7", "8", "9", "1", "2"}, {"6", "7", "2", "1", "9", "5", "3", "4", "8"}, {"1", "9", "8", "3", "4", "2", "5", "6", "7"}, {"8", "5", "9", "7", "6", "1", "4", "2", "3"}, {"4", "2", "6", "8", "5", "3", "7", "9", "1"}, {"7", "1", "3", "9", "2", "4", "8", "5", "6"}, {"9", "6", "1", "5", "3", "7", "2", "8", "4"}, {"2", "8", "7", "4", "1", "9", "6", "3", "5"}, {"3", "4", "5", "2", "8", "6", "1", "7", "9"}}, "classic puzzle solved")
    _t(solveSudoku([][]string{{"5", "3", "4", "6", "7", "8", "9", "1", "2"}, {"6", "7", "2", "1", "9", "5", "3", "4", "8"}, {"1", "9", "8", "3", "4", "2", "5", "6", "7"}, {"8", "5", "9", "7", "6", "1", "4", "2", "3"}, {"4", "2", "6", "8", "5", "3", "7", "9", "1"}, {"7", "1", "3", "9", "2", "4", "8", "5", "6"}, {"9", "6", "1", "5", "3", "7", "2", "8", "4"}, {"2", "8", "7", "4", "1", "9", "6", "3", "5"}, {"3", "4", "5", "2", "8", "6", "1", "7", "."}}), [][]string{{"5", "3", "4", "6", "7", "8", "9", "1", "2"}, {"6", "7", "2", "1", "9", "5", "3", "4", "8"}, {"1", "9", "8", "3", "4", "2", "5", "6", "7"}, {"8", "5", "9", "7", "6", "1", "4", "2", "3"}, {"4", "2", "6", "8", "5", "3", "7", "9", "1"}, {"7", "1", "3", "9", "2", "4", "8", "5", "6"}, {"9", "6", "1", "5", "3", "7", "2", "8", "4"}, {"2", "8", "7", "4", "1", "9", "6", "3", "5"}, {"3", "4", "5", "2", "8", "6", "1", "7", "9"}}, "one empty cell")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"find-all-anagrams":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func findAnagrams(s string, p string) []int {
	return nil
}
`,tests:`${x}

func main() {
    _t(findAnagrams("cbaebabacd", "abc"), []int{0, 6}, "example 1")
    _t(findAnagrams("abab", "ab"), []int{0, 1, 2}, "example 2")
    _t(findAnagrams("aa", "bb"), []int{}, "no anagrams")
    _t(findAnagrams("a", "ab"), []int{}, "p longer than s")
    _t(findAnagrams("aaaa", "a"), []int{0, 1, 2, 3}, "single char p")
    _t(findAnagrams("baa", "aa"), []int{1}, "one match")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"longest-repeating-replacement":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func characterReplacement(s string, k int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(characterReplacement("ABAB", 2), 4, "example 1")
    _t(characterReplacement("AABABBA", 1), 4, "example 2")
    _t(characterReplacement("A", 0), 1, "single char no ops")
    _t(characterReplacement("AAAA", 0), 4, "all same")
    _t(characterReplacement("ABCDE", 1), 2, "distinct chars")
    _t(characterReplacement("AAAB", 0), 3, "no replacements allowed")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"max-consecutive-ones-iii":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func longestOnes(nums []int, k int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(longestOnes([]int{1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0}, 2), 6, "example 1")
    _t(longestOnes([]int{0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1}, 3), 10, "example 2")
    _t(longestOnes([]int{0, 0, 0}, 0), 0, "no flips all zeros")
    _t(longestOnes([]int{1, 1, 1}, 0), 3, "all ones")
    _t(longestOnes([]int{0, 0, 0}, 3), 3, "flip everything")
    _t(longestOnes([]int{1, 0, 1, 0, 1}, 1), 3, "single flip")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"find-min-rotated":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func findMin(nums []int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(findMin([]int{3, 4, 5, 1, 2}), 1, "example 1")
    _t(findMin([]int{4, 5, 6, 7, 0, 1, 2}), 0, "example 2")
    _t(findMin([]int{11, 13, 15, 17}), 11, "no effective rotation")
    _t(findMin([]int{2, 1}), 1, "two elements")
    _t(findMin([]int{1}), 1, "single element")
    _t(findMin([]int{5, 1, 2, 3, 4}), 1, "pivot near start")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"search-2d-matrix":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func searchMatrix(matrix [][]int, target int) bool {
	return false
}
`,tests:`${x}

func main() {
    m := [][]int{{1, 3, 5, 7}, {10, 11, 16, 20}, {23, 30, 34, 60}}
    _t(searchMatrix(m, 3), true, "example 1")
    _t(searchMatrix(m, 13), false, "example 2")
    _t(searchMatrix(m, 1), true, "top-left corner")
    _t(searchMatrix(m, 60), true, "bottom-right corner")
    _t(searchMatrix([][]int{{1}}, 1), true, "single hit")
    _t(searchMatrix([][]int{{1}}, 2), false, "single miss")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"koko-eating-bananas":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func minEatingSpeed(piles []int, h int) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(minEatingSpeed([]int{3, 6, 7, 11}, 8), 4, "example 1")
    _t(minEatingSpeed([]int{30, 11, 23, 4, 20}, 5), 30, "one pile per hour")
    _t(minEatingSpeed([]int{30, 11, 23, 4, 20}, 6), 23, "six hours")
    _t(minEatingSpeed([]int{1, 1, 1, 999}, 1002), 1, "plenty of time")
    _t(minEatingSpeed([]int{312884470}, 968709470), 1, "single huge pile, slow ok")
    _t(minEatingSpeed([]int{3}, 3), 1, "single pile slow")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"count-smaller-after-self":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func countSmaller(nums []int) []int {
	return nil
}
`,tests:`${x}

func main() {
    _t(countSmaller([]int{5, 2, 6, 1}), []int{2, 1, 1, 0}, "example 1")
    _t(countSmaller([]int{-1, -1}), []int{0, 0}, "equal values, none strictly smaller")
    _t(countSmaller([]int{-1}), []int{0}, "single element")
    _t(countSmaller([]int{1, 2, 3, 4}), []int{0, 0, 0, 0}, "ascending")
    _t(countSmaller([]int{4, 3, 2, 1}), []int{3, 2, 1, 0}, "descending")
    _t(countSmaller([]int{2, 0, 1}), []int{2, 0, 0}, "mixed")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"evaluate-rpn":{starter:`package main

// imports used by the hidden test runner
import (
	"fmt"
	"strconv"
)
var _ = strconv.Atoi

func evalRPN(tokens []string) int {
	return 0
}
`,tests:`var _ = strconv.Atoi

${x}

func main() {
    _t(evalRPN([]string{"2", "1", "+", "3", "*"}), 9, "example 1")
    _t(evalRPN([]string{"4", "13", "5", "/", "+"}), 6, "example 2")
    _t(evalRPN([]string{"10", "-3", "/"}), -3, "negative division truncates toward zero")
    _t(evalRPN([]string{"7", "2", "/"}), 3, "positive truncation")
    _t(evalRPN([]string{"-7", "2", "/"}), -3, "negative numerator truncates toward zero")
    _t(evalRPN([]string{"5"}), 5, "single operand")
    _t(evalRPN([]string{"10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"}), 22, "complex expression")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"decode-string":{starter:`package main

// imports used by the hidden test runner
import (
	"fmt"
	"strings"
)
var _ = strings.Repeat

func decodeString(s string) string {
	return ""
}
`,tests:`var _ = strings.Repeat

${x}

func main() {
    _t(decodeString("3[a]2[bc]"), "aaabcbc", "example 1")
    _t(decodeString("3[a2[c]]"), "accaccacc", "nested")
    _t(decodeString("2[abc]3[cd]ef"), "abcabccdcdcdef", "multiple groups")
    _t(decodeString("abc"), "abc", "no encoding")
    _t(decodeString("10[a]"), "aaaaaaaaaa", "multi-digit count")
    _t(decodeString("2[2[b]c]"), "bbcbbc", "nested with suffix")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"longest-valid-parentheses":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func longestValidParentheses(s string) int {
	return 0
}
`,tests:`${x}

func main() {
    _t(longestValidParentheses("(()"), 2, "example 1")
    _t(longestValidParentheses(")()())"), 4, "example 2")
    _t(longestValidParentheses(""), 0, "empty string")
    _t(longestValidParentheses("()(()"), 2, "reset in middle")
    _t(longestValidParentheses("()(())"), 6, "fully matched")
    _t(longestValidParentheses("((((("), 0, "all opens")
    _t(longestValidParentheses(")))))"), 0, "all closes")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"invert-binary-tree":{starter:`package main

// imports used by the hidden test runner
import "fmt"

// Provided: type TreeNode struct { Val int; Left, Right *TreeNode }
func invertTree(root *TreeNode) *TreeNode {
	return nil
}
`,tests:`${v}

${x}

func _dump(root *TreeNode) []interface{} {
    out := []interface{}{}
    q := []*TreeNode{root}
    for len(q) > 0 {
        n := q[0]
        q = q[1:]
        if n == nil {
            out = append(out, nil)
            continue
        }
        out = append(out, n.Val)
        q = append(q, n.Left, n.Right)
    }
    for len(out) > 0 && out[len(out)-1] == nil {
        out = out[:len(out)-1]
    }
    return out
}

func main() {
    _t(_dump(invertTree(_tree([]interface{}{4, 2, 7, 1, 3, 6, 9}))), []interface{}{4, 7, 2, 9, 6, 3, 1}, "example 1")
    _t(_dump(invertTree(_tree([]interface{}{2, 1, 3}))), []interface{}{2, 3, 1}, "example 2")
    _t(_dump(invertTree(_tree([]interface{}{}))), []interface{}{}, "empty tree")
    _t(_dump(invertTree(_tree([]interface{}{1}))), []interface{}{1}, "single node")
    _t(_dump(invertTree(_tree([]interface{}{1, 2, nil, 3}))), []interface{}{1, nil, 2, nil, 3}, "left chain becomes right")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"diameter-of-binary-tree":{starter:`package main

// imports used by the hidden test runner
import "fmt"

// Provided: type TreeNode struct { Val int; Left, Right *TreeNode }
func diameterOfBinaryTree(root *TreeNode) int {
	return 0
}
`,tests:`${v}

${x}

func main() {
    _t(diameterOfBinaryTree(_tree([]interface{}{1, 2, 3, 4, 5})), 3, "example 1")
    _t(diameterOfBinaryTree(_tree([]interface{}{1, 2})), 1, "two nodes")
    _t(diameterOfBinaryTree(_tree([]interface{}{1})), 0, "single node")
    _t(diameterOfBinaryTree(_tree([]interface{}{1, 2, nil, 3, nil, 4})), 3, "left skewed chain")
    _t(diameterOfBinaryTree(_tree([]interface{}{4, 2, 7, 1, 3, 6, 9})), 4, "balanced tree")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"lowest-common-ancestor-bst":{starter:`package main

// imports used by the hidden test runner
import "fmt"

// Provided: type TreeNode struct { Val int; Left, Right *TreeNode }
func lowestCommonAncestor(root *TreeNode, p int, q int) *TreeNode {
	return nil
}
`,tests:`${v}

${x}

func main() {
    b := _tree([]interface{}{6, 2, 8, 0, 4, 7, 9, nil, nil, 3, 5})
    _t(lowestCommonAncestor(b, 2, 8).Val, 6, "split at root")
    _t(lowestCommonAncestor(b, 2, 4).Val, 2, "ancestor is one of the nodes")
    _t(lowestCommonAncestor(b, 3, 5).Val, 4, "lca deeper in tree")
    _t(lowestCommonAncestor(b, 7, 9).Val, 8, "right subtree")
    _t(lowestCommonAncestor(_tree([]interface{}{2, 1}), 1, 2).Val, 2, "two node tree")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"serialize-deserialize-tree":{starter:`package main

// imports used by the hidden test runner
import (
	"fmt"
	"strconv"
	"strings"
)
var _ = strconv.Atoi
var _ = strings.Split

// Provided: type TreeNode struct { Val int; Left, Right *TreeNode }
func serialize(root *TreeNode) string {
	return ""
}

func deserialize(data string) *TreeNode {
	return nil
}
`,tests:`var _ = strconv.Atoi
var _ = strings.Split

${v}

${x}

func _dump(root *TreeNode) []interface{} {
    out := []interface{}{}
    q := []*TreeNode{root}
    for len(q) > 0 {
        n := q[0]
        q = q[1:]
        if n == nil {
            out = append(out, nil)
            continue
        }
        out = append(out, n.Val)
        q = append(q, n.Left, n.Right)
    }
    for len(out) > 0 && out[len(out)-1] == nil {
        out = out[:len(out)-1]
    }
    return out
}

func main() {
    _t(_dump(deserialize(serialize(_tree([]interface{}{1, 2, 3, nil, nil, 4, 5})))), []interface{}{1, 2, 3, nil, nil, 4, 5}, "example 1")
    _t(_dump(deserialize(serialize(_tree([]interface{}{})))), []interface{}{}, "empty tree")
    _t(_dump(deserialize(serialize(_tree([]interface{}{1})))), []interface{}{1}, "single node")
    _t(_dump(deserialize(serialize(_tree([]interface{}{1, 2, 3, 4, 5, 6, 7})))), []interface{}{1, 2, 3, 4, 5, 6, 7}, "perfect tree")
    _t(_dump(deserialize(serialize(_tree([]interface{}{-1, -2, -3})))), []interface{}{-1, -2, -3}, "negative values")
    _t(_dump(deserialize(serialize(_tree([]interface{}{5, 4, 7, 3, nil, 2, nil, -1, nil, 9})))), []interface{}{5, 4, 7, 3, nil, 2, nil, -1, nil, 9}, "irregular shape")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"move-zeroes":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func moveZeroes(nums []int) []int {
	return nil
}
`,tests:`${x}

func main() {
    _t(moveZeroes([]int{0, 1, 0, 3, 12}), []int{1, 3, 12, 0, 0}, "example 1")
    _t(moveZeroes([]int{0}), []int{0}, "single zero")
    _t(moveZeroes([]int{1, 2, 3}), []int{1, 2, 3}, "no zeros")
    _t(moveZeroes([]int{0, 0, 1}), []int{1, 0, 0}, "leading zeros")
    _t(moveZeroes([]int{1, 0, 2, 0, 3}), []int{1, 2, 3, 0, 0}, "interleaved zeros")
    _t(moveZeroes([]int{0, 0, 0}), []int{0, 0, 0}, "all zeros")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"remove-duplicates-sorted":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func removeDuplicates(nums []int) []int {
	return nil
}
`,tests:`${x}

func main() {
    _t(removeDuplicates([]int{1, 1, 2}), []int{1, 2}, "example 1")
    _t(removeDuplicates([]int{0, 0, 1, 1, 1, 2, 2, 3, 3, 4}), []int{0, 1, 2, 3, 4}, "example 2")
    _t(removeDuplicates([]int{1}), []int{1}, "single element")
    _t(removeDuplicates([]int{1, 2, 3}), []int{1, 2, 3}, "already unique")
    _t(removeDuplicates([]int{2, 2, 2, 2}), []int{2}, "all duplicates")
    _t(removeDuplicates([]int{-3, -3, -1, 0, 0}), []int{-3, -1, 0}, "negatives")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"sort-colors":{starter:`package main

// imports used by the hidden test runner
import "fmt"

func sortColors(nums []int) []int {
	return nil
}
`,tests:`${x}

func main() {
    _t(sortColors([]int{2, 0, 2, 1, 1, 0}), []int{0, 0, 1, 1, 2, 2}, "example 1")
    _t(sortColors([]int{2, 0, 1}), []int{0, 1, 2}, "example 2")
    _t(sortColors([]int{0}), []int{0}, "single element")
    _t(sortColors([]int{1, 1, 1}), []int{1, 1, 1}, "all same")
    _t(sortColors([]int{2, 2, 0, 0, 1, 1}), []int{0, 0, 1, 1, 2, 2}, "reverse grouped")
    _t(sortColors([]int{1, 0, 2, 0}), []int{0, 0, 1, 2}, "mixed")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`},"three-sum-closest":{starter:`package main

// imports used by the hidden test runner
import (
	"fmt"
	"sort"
)
var _ = sort.Ints

func threeSumClosest(nums []int, target int) int {
	return 0
}
`,tests:`var _ = sort.Ints

${x}

func main() {
    _t(threeSumClosest([]int{-1, 2, 1, -4}, 1), 2, "example 1")
    _t(threeSumClosest([]int{0, 0, 0}, 1), 0, "all zeros")
    _t(threeSumClosest([]int{1, 1, 0}, -100), 2, "far below target")
    _t(threeSumClosest([]int{1, 2, 4, 8, 16, 32, 64, 128}, 82), 82, "exact match")
    _t(threeSumClosest([]int{-3, -2, -5, 3, -4}, -1), -2, "negatives")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`}}],["cpp",{"two-sum":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<int> twoSum(vector<int>& nums, int target) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={2,7,11,15}; _t(twoSum(a,9),{0,1},"example 1"); }
  { vector<int> a={3,2,4}; _t(twoSum(a,6),{1,2},"example 2"); }
  { vector<int> a={3,3}; _t(twoSum(a,6),{0,1},"duplicate values"); }
  { vector<int> a={-1,-2,-3,-4,-5}; _t(twoSum(a,-8),{2,4},"negative numbers"); }
  { vector<int> a={0,4,3,0}; _t(twoSum(a,0),{0,3},"zeros sum to zero"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"best-time-stock":{starter:`#include <bits/stdc++.h>
using namespace std;
int maxProfit(vector<int>& prices) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={7,1,5,3,6,4}; _t(maxProfit(a),5,"example 1"); }
  { vector<int> a={7,6,4,3,1}; _t(maxProfit(a),0,"strictly decreasing"); }
  { vector<int> a={1,2}; _t(maxProfit(a),1,"two days"); }
  { vector<int> a={2,4,1}; _t(maxProfit(a),2,"peak before valley"); }
  { vector<int> a={3,2,6,5,0,3}; _t(maxProfit(a),4,"buy at 2 sell at 6"); }
  { vector<int> a={5}; _t(maxProfit(a),0,"single day"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"product-except-self":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<int> productExceptSelf(vector<int>& nums) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={1,2,3,4}; _t(productExceptSelf(a),{24,12,8,6},"example 1"); }
  { vector<int> a={-1,1,0,-3,3}; _t(productExceptSelf(a),{0,0,9,0,0},"contains zero"); }
  { vector<int> a={2,3}; _t(productExceptSelf(a),{3,2},"two elements"); }
  { vector<int> a={1,1,1,1}; _t(productExceptSelf(a),{1,1,1,1},"all ones"); }
  { vector<int> a={0,0}; _t(productExceptSelf(a),{0,0},"two zeros"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"maximum-subarray":{starter:`#include <bits/stdc++.h>
using namespace std;
int maxSubarray(vector<int>& nums) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={-2,1,-3,4,-1,2,1,-5,4}; _t(maxSubarray(a),6,"example 1"); }
  { vector<int> a={1}; _t(maxSubarray(a),1,"single element"); }
  { vector<int> a={5,4,-1,7,8}; _t(maxSubarray(a),23,"whole array"); }
  { vector<int> a={-1}; _t(maxSubarray(a),-1,"single negative"); }
  { vector<int> a={-2,-1}; _t(maxSubarray(a),-1,"all negative"); }
  { vector<int> a={8,-19,5,-4,20}; _t(maxSubarray(a),21,"restart mid-array"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"merge-intervals":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> mergeIntervals(vector<vector<int>>& intervals) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<vector<int>> a={{1,3},{2,6},{8,10},{15,18}}; _t(mergeIntervals(a),{{1,6},{8,10},{15,18}},"example 1"); }
  { vector<vector<int>> a={{1,4},{4,5}}; _t(mergeIntervals(a),{{1,5}},"touching intervals"); }
  { vector<vector<int>> a={{1,4},{2,3}}; _t(mergeIntervals(a),{{1,4}},"fully contained"); }
  { vector<vector<int>> a={{5,6},{1,2}}; _t(mergeIntervals(a),{{1,2},{5,6}},"unsorted input"); }
  { vector<vector<int>> a={{1,4},{0,4}}; _t(mergeIntervals(a),{{0,4}},"same end"); }
  { vector<vector<int>> a={{2,2}}; _t(mergeIntervals(a),{{2,2}},"single point interval"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"first-missing-positive":{starter:`#include <bits/stdc++.h>
using namespace std;
int firstMissingPositive(vector<int>& nums) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={1,2,0}; _t(firstMissingPositive(a),3,"example 1"); }
  { vector<int> a={3,4,-1,1}; _t(firstMissingPositive(a),2,"example 2"); }
  { vector<int> a={7,8,9,11,12}; _t(firstMissingPositive(a),1,"no small positives"); }
  { vector<int> a={1}; _t(firstMissingPositive(a),2,"single element"); }
  { vector<int> a={2,1}; _t(firstMissingPositive(a),3,"complete pair"); }
  { vector<int> a={1,1}; _t(firstMissingPositive(a),2,"duplicates"); }
  { vector<int> a={-5}; _t(firstMissingPositive(a),1,"only negative"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"single-number":{starter:`#include <bits/stdc++.h>
using namespace std;
int singleNumber(vector<int>& nums) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={2,2,1}; _t(singleNumber(a),1,"example 1"); }
  { vector<int> a={4,1,2,1,2}; _t(singleNumber(a),4,"example 2"); }
  { vector<int> a={1}; _t(singleNumber(a),1,"single element"); }
  { vector<int> a={-1,-1,7}; _t(singleNumber(a),7,"negative pairs"); }
  { vector<int> a={0,1,0}; _t(singleNumber(a),1,"zero pair"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"counting-bits":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<int> countBits(int n) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t(countBits(2),{0,1,1},"example 1");
  _t(countBits(5),{0,1,1,2,1,2},"example 2");
  _t(countBits(0),{0},"just zero");
  _t(countBits(8),{0,1,1,2,1,2,2,3,1},"powers of two reset");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"climbing-stairs":{starter:`#include <bits/stdc++.h>
using namespace std;
int climbStairs(int n) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t(climbStairs(2),2,"example 1");
  _t(climbStairs(3),3,"example 2");
  _t(climbStairs(1),1,"one step");
  _t(climbStairs(5),8,"five steps");
  _t(climbStairs(10),89,"ten steps");
  _t(climbStairs(45),1836311903,"large n needs O(n)");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"house-robber":{starter:`#include <bits/stdc++.h>
using namespace std;
int rob(vector<int>& nums) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={1,2,3,1}; _t(rob(a),4,"example 1"); }
  { vector<int> a={2,7,9,3,1}; _t(rob(a),12,"example 2"); }
  { vector<int> a={5}; _t(rob(a),5,"single house"); }
  { vector<int> a={2,1,1,2}; _t(rob(a),4,"skip two in a row"); }
  { vector<int> a={2,100,3,100,4}; _t(rob(a),200,"alternating riches"); }
  { vector<int> a={0,0,0}; _t(rob(a),0,"nothing to steal"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"coin-change":{starter:`#include <bits/stdc++.h>
using namespace std;
int coinChange(vector<int>& coins, int amount) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={1,2,5}; _t(coinChange(a,11),3,"example 1"); }
  { vector<int> a={2}; _t(coinChange(a,3),-1,"impossible"); }
  { vector<int> a={1}; _t(coinChange(a,0),0,"zero amount"); }
  { vector<int> a={1,3,4}; _t(coinChange(a,6),2,"greedy fails here"); }
  { vector<int> a={2,5,10,1}; _t(coinChange(a,27),4,"27 = 10+10+5+2"); }
  { vector<int> a={186,419,83,408}; _t(coinChange(a,6249),20,"large stress case"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"longest-increasing-subsequence":{starter:`#include <bits/stdc++.h>
using namespace std;
int lengthOfLIS(vector<int>& nums) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={10,9,2,5,3,7,101,18}; _t(lengthOfLIS(a),4,"example 1"); }
  { vector<int> a={0,1,0,3,2,3}; _t(lengthOfLIS(a),4,"example 2"); }
  { vector<int> a={7,7,7,7,7,7,7}; _t(lengthOfLIS(a),1,"all equal"); }
  { vector<int> a={4,10,4,3,8,9}; _t(lengthOfLIS(a),3,"[4,8,9]"); }
  { vector<int> a={1}; _t(lengthOfLIS(a),1,"single element"); }
  { vector<int> a={5,4,3,2,1}; _t(lengthOfLIS(a),1,"strictly decreasing"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"edit-distance":{starter:`#include <bits/stdc++.h>
using namespace std;
int minDistance(string word1, string word2) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t(minDistance("horse","ros"),3,"example 1");
  _t(minDistance("intention","execution"),5,"example 2");
  _t(minDistance("","abc"),3,"all inserts");
  _t(minDistance("abc",""),3,"all deletes");
  _t(minDistance("abc","abc"),0,"identical");
  _t(minDistance("park","spake"),3,"mixed operations");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"regex-matching":{starter:`#include <bits/stdc++.h>
using namespace std;
bool isMatch(string s, string p) {
  return false;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t(isMatch("aa","a"),false,"example 1");
  _t(isMatch("aa","a*"),true,"star expands");
  _t(isMatch("ab",".*"),true,"dot star");
  _t(isMatch("aab","c*a*b"),true,"zero c then two a");
  _t(isMatch("mississippi","mis*is*p*."),false,"classic false case");
  _t(isMatch("","c*"),true,"empty string vs star");
  _t(isMatch("ab",".*c"),false,"trailing literal unmatched");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"number-of-islands":{starter:`#include <bits/stdc++.h>
using namespace std;
int numIslands(vector<vector<char>>& grid) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<vector<char>> g={{'1','1','1','1','0'},{'1','1','0','1','0'},{'1','1','0','0','0'},{'0','0','0','0','0'}}; _t(numIslands(g),1,"one island"); }
  { vector<vector<char>> g={{'1','1','0','0','0'},{'1','1','0','0','0'},{'0','0','1','0','0'},{'0','0','0','1','1'}}; _t(numIslands(g),3,"three islands"); }
  { vector<vector<char>> g={{'1'}}; _t(numIslands(g),1,"single land cell"); }
  { vector<vector<char>> g={{'0'}}; _t(numIslands(g),0,"single water cell"); }
  { vector<vector<char>> g={{'1','0','1'},{'0','1','0'},{'1','0','1'}}; _t(numIslands(g),5,"diagonals do not connect"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"course-schedule":{starter:`#include <bits/stdc++.h>
using namespace std;
bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
  return false;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<vector<int>> p={{1,0}}; _t(canFinish(2,p),true,"simple chain"); }
  { vector<vector<int>> p={{1,0},{0,1}}; _t(canFinish(2,p),false,"two-node cycle"); }
  { vector<vector<int>> p={{1,4},{2,4},{3,1},{3,2}}; _t(canFinish(5,p),true,"diamond DAG"); }
  { vector<vector<int>> p={}; _t(canFinish(1,p),true,"no prerequisites"); }
  { vector<vector<int>> p={{0,1},{1,2},{2,0}}; _t(canFinish(3,p),false,"three-node cycle"); }
  { vector<vector<int>> p={{1,0},{2,1},{3,2}}; _t(canFinish(4,p),true,"long chain"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"word-ladder":{starter:`#include <bits/stdc++.h>
using namespace std;
int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<string> w={"hot","dot","dog","lot","log","cog"}; _t(ladderLength("hit","cog",w),5,"example 1"); }
  { vector<string> w={"hot","dot","dog","lot","log"}; _t(ladderLength("hit","cog",w),0,"endWord missing"); }
  { vector<string> w={"a","b","c"}; _t(ladderLength("a","c",w),2,"single letter words"); }
  { vector<string> w={"hot","dog"}; _t(ladderLength("hot","dog",w),0,"no bridge word"); }
  { vector<string> w={"dot"}; _t(ladderLength("hot","dot",w),2,"direct neighbor"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"group-anagrams":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<vector<string>> groupAnagrams(vector<string>& strs) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static vector<vector<string>> _norm(vector<vector<string>> a){for(auto& g:a){for(auto& s:g)sort(s.begin(),s.end());sort(g.begin(),g.end());}sort(a.begin(),a.end());return a;}

int main(){
  { vector<string> a={"eat","tea","tan","ate","nat","bat"}; _t(_norm(groupAnagrams(a)),_norm({{"ate","eat","tea"},{"bat"},{"nat","tan"}}),"example 1"); }
  { vector<string> a={""}; _t(_norm(groupAnagrams(a)),_norm({{""}}),"empty string"); }
  { vector<string> a={"a"}; _t(_norm(groupAnagrams(a)),_norm({{"a"}}),"single string"); }
  { vector<string> a={"ab","ba","ab"}; _t(_norm(groupAnagrams(a)),_norm({{"ab","ab","ba"}}),"duplicate words"); }
  { vector<string> a={"abc","def"}; _t(_norm(groupAnagrams(a)),_norm({{"abc"},{"def"}}),"no anagrams"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"top-k-frequent":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<int> topKFrequent(vector<int>& nums, int k) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={1,1,1,2,2,3}; auto r=topKFrequent(a,2); sort(r.begin(),r.end()); _t(r,{1,2},"example 1"); }
  { vector<int> a={1}; auto r=topKFrequent(a,1); sort(r.begin(),r.end()); _t(r,{1},"single element"); }
  { vector<int> a={4,4,4,5,5,6}; auto r=topKFrequent(a,1); sort(r.begin(),r.end()); _t(r,{4},"top one"); }
  { vector<int> a={1,2}; auto r=topKFrequent(a,2); sort(r.begin(),r.end()); _t(r,{1,2},"all elements"); }
  { vector<int> a={-1,-1,2,2,2}; auto r=topKFrequent(a,2); sort(r.begin(),r.end()); _t(r,{-1,2},"negatives"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"longest-consecutive-sequence":{starter:`#include <bits/stdc++.h>
using namespace std;
int longestConsecutive(vector<int>& nums) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={100,4,200,1,3,2}; _t(longestConsecutive(a),4,"example 1"); }
  { vector<int> a={0,3,7,2,5,8,4,6,0,1}; _t(longestConsecutive(a),9,"example 2"); }
  { vector<int> a={}; _t(longestConsecutive(a),0,"empty array"); }
  { vector<int> a={1,2,0,1}; _t(longestConsecutive(a),3,"duplicates"); }
  { vector<int> a={5}; _t(longestConsecutive(a),1,"single element"); }
  { vector<int> a={-2,-1,0,1}; _t(longestConsecutive(a),4,"negative run"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"reverse-linked-list":{starter:`#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct ListNode { int val; ListNode *next; ListNode(int v = 0, ListNode *n = nullptr) : val(v), next(n) {} };
ListNode* reverseList(ListNode* head) {
  return nullptr;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static ListNode* _build(const vector<int>& a){ListNode h;ListNode* c=&h;for(int v:a){c->next=new ListNode(v);c=c->next;}return h.next;}
static vector<int> _toList(ListNode* n){vector<int> o;while(n){o.push_back(n->val);n=n->next;}return o;}

int main(){
  _t(_toList(reverseList(_build({1,2,3,4,5}))),{5,4,3,2,1},"five nodes");
  _t(_toList(reverseList(_build({1,2}))),{2,1},"two nodes");
  _t(_toList(reverseList(_build({}))),{},"empty list");
  _t(_toList(reverseList(_build({7}))),{7},"single node");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"linked-list-cycle":{starter:`#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct ListNode { int val; ListNode *next; ListNode(int v = 0, ListNode *n = nullptr) : val(v), next(n) {} };
bool hasCycle(ListNode* head) {
  return false;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static ListNode* _build(const vector<int>& a){ListNode h;ListNode* c=&h;for(int v:a){c->next=new ListNode(v);c=c->next;}return h.next;}
static vector<int> _toList(ListNode* n){vector<int> o;while(n){o.push_back(n->val);n=n->next;}return o;}

int main(){
  { ListNode* h=_build({3,2,0,-4}); ListNode* tail=h; while(tail->next)tail=tail->next; tail->next=h->next; _t(hasCycle(h),true,"cycle to index 1"); }
  _t(hasCycle(_build({1,2})),false,"no cycle");
  _t(hasCycle(_build({})),false,"empty list");
  { ListNode* s=_build({1}); s->next=s; _t(hasCycle(s),true,"self loop"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"merge-k-sorted-lists":{starter:`#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct ListNode { int val; ListNode *next; ListNode(int v = 0, ListNode *n = nullptr) : val(v), next(n) {} };
ListNode* mergeKLists(vector<ListNode*>& lists) {
  return nullptr;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static ListNode* _build(const vector<int>& a){ListNode h;ListNode* c=&h;for(int v:a){c->next=new ListNode(v);c=c->next;}return h.next;}
static vector<int> _toList(ListNode* n){vector<int> o;while(n){o.push_back(n->val);n=n->next;}return o;}

int main(){
  { vector<ListNode*> v={_build({1,4,5}),_build({1,3,4}),_build({2,6})}; _t(_toList(mergeKLists(v)),{1,1,2,3,4,4,5,6},"example 1"); }
  { vector<ListNode*> v={}; _t(_toList(mergeKLists(v)),{},"no lists"); }
  { vector<ListNode*> v={_build({})}; _t(_toList(mergeKLists(v)),{},"one empty list"); }
  { vector<ListNode*> v={_build({1}),_build({0})}; _t(_toList(mergeKLists(v)),{0,1},"two singletons"); }
  { vector<ListNode*> v={_build({-2,-1}),_build({}),_build({-3})}; _t(_toList(mergeKLists(v)),{-3,-2,-1},"negatives and empty"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"palindrome-number":{starter:`#include <bits/stdc++.h>
using namespace std;
bool isPalindromeNumber(int x) {
  return false;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t(isPalindromeNumber(121),true,"example 1");
  _t(isPalindromeNumber(-121),false,"negative");
  _t(isPalindromeNumber(10),false,"trailing zero");
  _t(isPalindromeNumber(0),true,"zero");
  _t(isPalindromeNumber(1221),true,"even digits");
  _t(isPalindromeNumber(1234567899),false,"large number");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"basic-calculator":{starter:`#include <bits/stdc++.h>
using namespace std;
int calculate(string s) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t(calculate("1 + 1"),2,"example 1");
  _t(calculate(" 2-1 + 2 "),3,"example 2");
  _t(calculate("(1+(4+5+2)-3)+(6+8)"),23,"nested parens");
  _t(calculate("-2+ 1"),-1,"unary minus");
  _t(calculate("- (3 + (4 + 5))"),-12,"unary minus on group");
  _t(calculate("2147483647"),2147483647,"single big number");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"knn-classifier":{starter:`#include <bits/stdc++.h>
using namespace std;
int knnPredict(vector<vector<double>> XTrain, vector<int> yTrain, vector<double> x, int k) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<vector<double>> X={{1,1},{2,2},{8,8},{9,9}}; vector<int> y={0,0,1,1};
    _t(knnPredict(X,y,{1.5,1.5},3),0,"near cluster 0");
    _t(knnPredict(X,y,{8.5,8.5},3),1,"near cluster 1");
    _t(knnPredict(X,y,{2,2},1),0,"exact match k=1"); }
  _t(knnPredict({{0},{1},{2},{10}},{0,0,0,1},{9},1),1,"1D nearest outlier");
  _t(knnPredict({{1,1},{1,2},{2,1},{5,5},{5,6}},{0,0,0,1,1},{4.5,5},3),1,"five points k=3");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"gradient-descent-linear":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<double> gradientDescent(vector<double> X, vector<double> y, double lr = 0.01, int epochs = 5000) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { auto r=gradientDescent({1,2,3,4},{3,5,7,9},0.01,5000); double w=r[0],b=r[1];
    _t((long long)llround(w*5+b),(long long)11,"predict x=5 on y=2x+1");
    _t((long long)llround(w*10+b),(long long)21,"predict x=10 on y=2x+1"); }
  { auto r=gradientDescent({0,1,2,3},{1,1,1,1},0.01,5000); double w=r[0],b=r[1];
    _t((long long)llround(w*7+b),(long long)1,"flat data learns w=0 b=1"); }
  { auto r=gradientDescent({1,2,3},{-2,-4,-6},0.01,5000); double w=r[0],b=r[1];
    _t((long long)llround(w*4+b),(long long)-8,"negative slope y=-2x"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"min-stack":{starter:`#include <bits/stdc++.h>
using namespace std;
class MinStack {
public:
  MinStack() {}
  void push(int val) {}
  void pop() {}
  int top() { return 0; }
  int getMin() { return 0; }
};
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  MinStack s;
  s.push(-2); s.push(0); s.push(-3);
  _t(s.getMin(),-3,"min after pushes");
  s.pop();
  _t(s.top(),0,"top after pop");
  _t(s.getMin(),-2,"min after pop");
  MinStack s2;
  s2.push(5); s2.push(5); s2.pop();
  _t(s2.getMin(),5,"duplicate minimums");
  s2.push(3); s2.push(7);
  _t(s2.getMin(),3,"min not at top");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"lru-cache":{starter:`#include <bits/stdc++.h>
using namespace std;
class LRUCache {
public:
  LRUCache(int capacity) {}
  int get(int key) { return 0; }
  void put(int key, int value) {}
};
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  LRUCache c(2);
  c.put(1,1); c.put(2,2);
  _t(c.get(1),1,"get refreshes key 1");
  c.put(3,3);
  _t(c.get(2),-1,"key 2 evicted");
  c.put(4,4);
  _t(c.get(1),-1,"key 1 evicted");
  _t(c.get(3),3,"key 3 alive");
  _t(c.get(4),4,"key 4 alive");
  LRUCache c2(1);
  c2.put(2,1);
  _t(c2.get(2),1,"capacity one");
  c2.put(2,99);
  _t(c2.get(2),99,"update in place");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},subsets:{starter:`#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> subsets(vector<int>& nums) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static vector<vector<int>> _norm(vector<vector<int>> a){for(auto& x:a)sort(x.begin(),x.end());sort(a.begin(),a.end());return a;}

int main(){
  { vector<int> a={1,2,3}; _t(_norm(subsets(a)),_norm({{},{1},{1,2},{1,2,3},{1,3},{2},{2,3},{3}}),"example 1"); }
  { vector<int> a={0}; _t(_norm(subsets(a)),_norm({{},{0}}),"single element"); }
  { vector<int> a={1,2,3,4,5}; _t((int)subsets(a).size(),32,"2^5 subsets"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"combination-sum":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static vector<vector<int>> _norm(vector<vector<int>> a){for(auto& x:a)sort(x.begin(),x.end());sort(a.begin(),a.end());return a;}

int main(){
  { vector<int> a={2,3,6,7}; _t(_norm(combinationSum(a,7)),_norm({{2,2,3},{7}}),"example 1"); }
  { vector<int> a={2,3,5}; _t(_norm(combinationSum(a,8)),_norm({{2,2,2,2},{2,3,3},{3,5}}),"example 2"); }
  { vector<int> a={2}; _t(_norm(combinationSum(a,1)),_norm({}),"impossible"); }
  { vector<int> a={3}; _t(_norm(combinationSum(a,9)),_norm({{3,3,3}}),"single candidate reused"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"n-queens":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<vector<string>> solveNQueens(int n) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static vector<vector<string>> _norm(vector<vector<string>> a){for(auto& g:a){for(auto& s:g)sort(s.begin(),s.end());sort(g.begin(),g.end());}sort(a.begin(),a.end());return a;}

int main(){
  _t(_norm(solveNQueens(4)),_norm({{"..Q.","Q...","...Q",".Q.."},{".Q..","...Q","Q...","..Q."}}),"n=4 both solutions");
  _t(_norm(solveNQueens(1)),_norm({{"Q"}}),"n=1");
  _t((int)solveNQueens(2).size(),0,"n=2 impossible");
  _t((int)solveNQueens(3).size(),0,"n=3 impossible");
  _t((int)solveNQueens(5).size(),10,"n=5 has 10 solutions");
  _t((int)solveNQueens(6).size(),4,"n=6 has 4 solutions");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"longest-substring-no-repeat":{starter:`#include <bits/stdc++.h>
using namespace std;
int lengthOfLongestSubstring(string s) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t(lengthOfLongestSubstring("abcabcbb"),3,"example 1");
  _t(lengthOfLongestSubstring("bbbbb"),1,"all same char");
  _t(lengthOfLongestSubstring("pwwkew"),3,"example 3");
  _t(lengthOfLongestSubstring(""),0,"empty string");
  _t(lengthOfLongestSubstring("au"),2,"two distinct");
  _t(lengthOfLongestSubstring("dvdf"),3,"window left jump");
  _t(lengthOfLongestSubstring("abba"),2,"stale index trap");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"sliding-window-maximum":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={1,3,-1,-3,5,3,6,7}; _t(maxSlidingWindow(a,3),{3,3,5,5,6,7},"example 1"); }
  { vector<int> a={1}; _t(maxSlidingWindow(a,1),{1},"single element"); }
  { vector<int> a={1,-1}; _t(maxSlidingWindow(a,1),{1,-1},"window of one"); }
  { vector<int> a={9,11}; _t(maxSlidingWindow(a,2),{11},"increasing pair"); }
  { vector<int> a={4,-2}; _t(maxSlidingWindow(a,2),{4},"decreasing pair"); }
  { vector<int> a={7,2,4}; _t(maxSlidingWindow(a,2),{7,4},"leading max expires"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"minimum-window-substring":{starter:`#include <bits/stdc++.h>
using namespace std;
string minWindow(string s, string t) {
  return "";
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t(minWindow("ADOBECODEBANC","ABC"),string("BANC"),"example 1");
  _t(minWindow("a","a"),string("a"),"single char match");
  _t(minWindow("a","aa"),string(""),"not enough chars");
  _t(minWindow("ab","b"),string("b"),"suffix window");
  _t(minWindow("bba","ab"),string("ba"),"duplicates in s");
  _t(minWindow("aaflslflsldkalskaaa","aaa"),string("aaa"),"repeated requirement");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"binary-search":{starter:`#include <bits/stdc++.h>
using namespace std;
int search(vector<int>& nums, int target) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={-1,0,3,5,9,12}; _t(search(a,9),4,"example 1"); }
  { vector<int> a={-1,0,3,5,9,12}; _t(search(a,2),-1,"not found"); }
  { vector<int> a={5}; _t(search(a,5),0,"single element hit"); }
  { vector<int> a={5}; _t(search(a,-5),-1,"single element miss"); }
  { vector<int> a={1,3}; _t(search(a,3),1,"two elements right"); }
  { vector<int> a={1,3}; _t(search(a,1),0,"two elements left"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"search-rotated-array":{starter:`#include <bits/stdc++.h>
using namespace std;
int searchRotated(vector<int>& nums, int target) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={4,5,6,7,0,1,2}; _t(searchRotated(a,0),4,"example 1"); }
  { vector<int> a={4,5,6,7,0,1,2}; _t(searchRotated(a,3),-1,"not present"); }
  { vector<int> a={1}; _t(searchRotated(a,0),-1,"single miss"); }
  { vector<int> a={3,1}; _t(searchRotated(a,1),1,"two rotated"); }
  { vector<int> a={5,1,3}; _t(searchRotated(a,5),0,"target at pivot start"); }
  { vector<int> a={1,2,3,4,5}; _t(searchRotated(a,4),3,"no rotation"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"kth-largest-element":{starter:`#include <bits/stdc++.h>
using namespace std;
int findKthLargest(vector<int>& nums, int k) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={3,2,1,5,6,4}; _t(findKthLargest(a,2),5,"example 1"); }
  { vector<int> a={3,2,3,1,2,4,5,5,6}; _t(findKthLargest(a,4),4,"with duplicates"); }
  { vector<int> a={1}; _t(findKthLargest(a,1),1,"single element"); }
  { vector<int> a={7,6,5,4,3,2,1}; _t(findKthLargest(a,5),3,"descending input"); }
  { vector<int> a={2,1}; _t(findKthLargest(a,2),1,"k equals length"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"median-two-sorted-arrays":{starter:`#include <bits/stdc++.h>
using namespace std;
double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={1,3},b={2}; _t(findMedianSortedArrays(a,b),2.0,"example 1"); }
  { vector<int> a={1,2},b={3,4}; _t(findMedianSortedArrays(a,b),2.5,"example 2"); }
  { vector<int> a={0,0},b={0,0}; _t(findMedianSortedArrays(a,b),0.0,"all zeros"); }
  { vector<int> a={},b={1}; _t(findMedianSortedArrays(a,b),1.0,"first empty"); }
  { vector<int> a={2},b={}; _t(findMedianSortedArrays(a,b),2.0,"second empty"); }
  { vector<int> a={1,2},b={-1,3}; _t(findMedianSortedArrays(a,b),1.5,"interleaved"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"valid-parentheses":{starter:`#include <bits/stdc++.h>
using namespace std;
bool isValid(string s) {
  return false;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t(isValid("()"),true,"simple pair");
  _t(isValid("()[]{}"),true,"three pairs");
  _t(isValid("(]"),false,"wrong type");
  _t(isValid("([)]"),false,"wrong order");
  _t(isValid("{[]}"),true,"nested");
  _t(isValid("("),false,"unclosed opener");
  _t(isValid("]"),false,"closer without opener");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"daily-temperatures":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<int> dailyTemperatures(vector<int>& temperatures) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={73,74,75,71,69,72,76,73}; _t(dailyTemperatures(a),{1,1,4,2,1,1,0,0},"example 1"); }
  { vector<int> a={30,40,50,60}; _t(dailyTemperatures(a),{1,1,1,0},"increasing"); }
  { vector<int> a={90,60,30}; _t(dailyTemperatures(a),{0,0,0},"decreasing"); }
  { vector<int> a={50}; _t(dailyTemperatures(a),{0},"single day"); }
  { vector<int> a={70,70,75}; _t(dailyTemperatures(a),{2,1,0},"equal temps wait"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"largest-rectangle-histogram":{starter:`#include <bits/stdc++.h>
using namespace std;
int largestRectangleArea(vector<int>& heights) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={2,1,5,6,2,3}; _t(largestRectangleArea(a),10,"example 1"); }
  { vector<int> a={2,4}; _t(largestRectangleArea(a),4,"two bars"); }
  { vector<int> a={1}; _t(largestRectangleArea(a),1,"single bar"); }
  { vector<int> a={2,2,2}; _t(largestRectangleArea(a),6,"flat histogram"); }
  { vector<int> a={5,4,1,2}; _t(largestRectangleArea(a),8,"descending then rise"); }
  { vector<int> a={0,9}; _t(largestRectangleArea(a),9,"zero-height bar"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"max-depth-binary-tree":{starter:`#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct TreeNode { int val; TreeNode *left; TreeNode *right; TreeNode(int v = 0) : val(v), left(nullptr), right(nullptr) {} };
int maxDepth(TreeNode* root) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static const int XX = INT_MIN;
static TreeNode* _tree(const vector<int>& vals){
  if(vals.empty()||vals[0]==XX) return nullptr;
  TreeNode* root=new TreeNode(vals[0]); queue<TreeNode*> q; q.push(root); size_t i=1;
  while(!q.empty()&&i<vals.size()){
    TreeNode* n=q.front(); q.pop();
    if(i<vals.size()&&vals[i]!=XX){n->left=new TreeNode(vals[i]);q.push(n->left);} i++;
    if(i<vals.size()&&vals[i]!=XX){n->right=new TreeNode(vals[i]);q.push(n->right);} i++;
  }
  return root;
}

int main(){
  _t(maxDepth(_tree({3,9,20,XX,XX,15,7})),3,"example 1");
  _t(maxDepth(_tree({1,XX,2})),2,"right skewed");
  _t(maxDepth(_tree({})),0,"empty tree");
  _t(maxDepth(_tree({0})),1,"single node");
  _t(maxDepth(_tree({1,2,3,4,XX,XX,XX,5})),4,"left-heavy chain");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"validate-bst":{starter:`#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct TreeNode { int val; TreeNode *left; TreeNode *right; TreeNode(int v = 0) : val(v), left(nullptr), right(nullptr) {} };
bool isValidBST(TreeNode* root) {
  return false;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static const int XX = INT_MIN;
static TreeNode* _tree(const vector<int>& vals){
  if(vals.empty()||vals[0]==XX) return nullptr;
  TreeNode* root=new TreeNode(vals[0]); queue<TreeNode*> q; q.push(root); size_t i=1;
  while(!q.empty()&&i<vals.size()){
    TreeNode* n=q.front(); q.pop();
    if(i<vals.size()&&vals[i]!=XX){n->left=new TreeNode(vals[i]);q.push(n->left);} i++;
    if(i<vals.size()&&vals[i]!=XX){n->right=new TreeNode(vals[i]);q.push(n->right);} i++;
  }
  return root;
}

int main(){
  _t(isValidBST(_tree({2,1,3})),true,"example 1");
  _t(isValidBST(_tree({5,1,4,XX,XX,3,6})),false,"example 2");
  _t(isValidBST(_tree({1})),true,"single node");
  _t(isValidBST(_tree({5,4,6,XX,XX,3,7})),false,"deep violation");
  _t(isValidBST(_tree({2,2,2})),false,"duplicates invalid");
  _t(isValidBST(_tree({-10,-20,0})),true,"negative values");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"level-order-traversal":{starter:`#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct TreeNode { int val; TreeNode *left; TreeNode *right; TreeNode(int v = 0) : val(v), left(nullptr), right(nullptr) {} };
vector<vector<int>> levelOrder(TreeNode* root) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static const int XX = INT_MIN;
static TreeNode* _tree(const vector<int>& vals){
  if(vals.empty()||vals[0]==XX) return nullptr;
  TreeNode* root=new TreeNode(vals[0]); queue<TreeNode*> q; q.push(root); size_t i=1;
  while(!q.empty()&&i<vals.size()){
    TreeNode* n=q.front(); q.pop();
    if(i<vals.size()&&vals[i]!=XX){n->left=new TreeNode(vals[i]);q.push(n->left);} i++;
    if(i<vals.size()&&vals[i]!=XX){n->right=new TreeNode(vals[i]);q.push(n->right);} i++;
  }
  return root;
}

int main(){
  _t(levelOrder(_tree({3,9,20,XX,XX,15,7})),{{3},{9,20},{15,7}},"example 1");
  _t(levelOrder(_tree({1})),{{1}},"single node");
  _t(levelOrder(_tree({})),{},"empty tree");
  _t(levelOrder(_tree({1,2,XX,3})),{{1},{2},{3}},"left chain");
  _t(levelOrder(_tree({1,2,3,4,5,6,7})),{{1},{2,3},{4,5,6,7}},"perfect tree");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"binary-tree-max-path-sum":{starter:`#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct TreeNode { int val; TreeNode *left; TreeNode *right; TreeNode(int v = 0) : val(v), left(nullptr), right(nullptr) {} };
int maxPathSum(TreeNode* root) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static const int XX = INT_MIN;
static TreeNode* _tree(const vector<int>& vals){
  if(vals.empty()||vals[0]==XX) return nullptr;
  TreeNode* root=new TreeNode(vals[0]); queue<TreeNode*> q; q.push(root); size_t i=1;
  while(!q.empty()&&i<vals.size()){
    TreeNode* n=q.front(); q.pop();
    if(i<vals.size()&&vals[i]!=XX){n->left=new TreeNode(vals[i]);q.push(n->left);} i++;
    if(i<vals.size()&&vals[i]!=XX){n->right=new TreeNode(vals[i]);q.push(n->right);} i++;
  }
  return root;
}

int main(){
  _t(maxPathSum(_tree({1,2,3})),6,"example 1");
  _t(maxPathSum(_tree({-10,9,20,XX,XX,15,7})),42,"example 2");
  _t(maxPathSum(_tree({-3})),-3,"single negative node");
  _t(maxPathSum(_tree({2,-1})),2,"skip negative child");
  _t(maxPathSum(_tree({-2,-1})),-1,"all negative picks max node");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"valid-palindrome":{starter:`#include <bits/stdc++.h>
using namespace std;
bool isPalindrome(string s) {
  return false;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t(isPalindrome("A man, a plan, a canal: Panama"),true,"example 1");
  _t(isPalindrome("race a car"),false,"example 2");
  _t(isPalindrome(" "),true,"whitespace only");
  _t(isPalindrome("0P"),false,"digit vs letter");
  _t(isPalindrome("ab_a"),true,"underscore ignored");
  _t(isPalindrome("a"),true,"single char");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"three-sum":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> threeSum(vector<int>& nums) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static vector<vector<int>> _norm(vector<vector<int>> a){for(auto& x:a)sort(x.begin(),x.end());sort(a.begin(),a.end());return a;}

int main(){
  { vector<int> a={-1,0,1,2,-1,-4}; _t(_norm(threeSum(a)),_norm({{-1,-1,2},{-1,0,1}}),"example 1"); }
  { vector<int> a={0,1,1}; _t(_norm(threeSum(a)),_norm({}),"no solution"); }
  { vector<int> a={0,0,0}; _t(_norm(threeSum(a)),_norm({{0,0,0}}),"all zeros"); }
  { vector<int> a={-2,0,1,1,2}; _t(_norm(threeSum(a)),_norm({{-2,0,2},{-2,1,1}}),"two triplets"); }
  { vector<int> a={0,0,0,0}; _t(_norm(threeSum(a)),_norm({{0,0,0}}),"extra zeros deduped"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"container-most-water":{starter:`#include <bits/stdc++.h>
using namespace std;
int maxArea(vector<int>& height) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={1,8,6,2,5,4,8,3,7}; _t(maxArea(a),49,"example 1"); }
  { vector<int> a={1,1}; _t(maxArea(a),1,"two lines"); }
  { vector<int> a={4,3,2,1,4}; _t(maxArea(a),16,"equal ends"); }
  { vector<int> a={1,2,1}; _t(maxArea(a),2,"small peak"); }
  { vector<int> a={2,3,4,5,18,17,6}; _t(maxArea(a),17,"tall middle pair"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"trapping-rain-water":{starter:`#include <bits/stdc++.h>
using namespace std;
int trap(vector<int>& height) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={0,1,0,2,1,0,1,3,2,1,2,1}; _t(trap(a),6,"example 1"); }
  { vector<int> a={4,2,0,3,2,5}; _t(trap(a),9,"example 2"); }
  { vector<int> a={1,2,3}; _t(trap(a),0,"monotonic — traps nothing"); }
  { vector<int> a={3}; _t(trap(a),0,"single bar"); }
  { vector<int> a={5,4,1,2}; _t(trap(a),1,"shallow right wall"); }
  { vector<int> a={2,0,2}; _t(trap(a),2,"simple valley"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"rotate-array":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<int> rotate(vector<int>& nums, int k) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={1,2,3,4,5,6,7}; _t(rotate(a,3),{5,6,7,1,2,3,4},"example 1"); }
  { vector<int> a={-1,-100,3,99}; _t(rotate(a,2),{3,99,-1,-100},"example 2"); }
  { vector<int> a={1,2}; _t(rotate(a,3),{2,1},"k exceeds length"); }
  { vector<int> a={1,2,3}; _t(rotate(a,0),{1,2,3},"zero rotation"); }
  { vector<int> a={1}; _t(rotate(a,100),{1},"single element"); }
  { vector<int> a={1,2,3,4}; _t(rotate(a,4),{1,2,3,4},"full rotation unchanged"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"longest-common-prefix":{starter:`#include <bits/stdc++.h>
using namespace std;
string longestCommonPrefix(vector<string>& strs) {
  return "";
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<string> a={"flower","flow","flight"}; _t(longestCommonPrefix(a),string("fl"),"example 1"); }
  { vector<string> a={"dog","racecar","car"}; _t(longestCommonPrefix(a),string(""),"no common prefix"); }
  { vector<string> a={"a"}; _t(longestCommonPrefix(a),string("a"),"single string"); }
  { vector<string> a={"ab","abc","abcd"}; _t(longestCommonPrefix(a),string("ab"),"shortest is prefix"); }
  { vector<string> a={"","abc"}; _t(longestCommonPrefix(a),string(""),"empty string present"); }
  { vector<string> a={"interspecies","interstellar","interstate"}; _t(longestCommonPrefix(a),string("inters"),"long prefix"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"spiral-matrix":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<int> spiralOrder(vector<vector<int>>& matrix) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<vector<int>> m={{1,2,3},{4,5,6},{7,8,9}}; _t(spiralOrder(m),{1,2,3,6,9,8,7,4,5},"example 1"); }
  { vector<vector<int>> m={{1,2,3,4},{5,6,7,8},{9,10,11,12}}; _t(spiralOrder(m),{1,2,3,4,8,12,11,10,9,5,6,7},"example 2"); }
  { vector<vector<int>> m={{1}}; _t(spiralOrder(m),{1},"single cell"); }
  { vector<vector<int>> m={{1,2,3}}; _t(spiralOrder(m),{1,2,3},"single row"); }
  { vector<vector<int>> m={{1},{2},{3}}; _t(spiralOrder(m),{1,2,3},"single column"); }
  { vector<vector<int>> m={{1,2},{3,4}}; _t(spiralOrder(m),{1,2,4,3},"two by two"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"set-matrix-zeroes":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> setZeroes(vector<vector<int>>& matrix) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<vector<int>> m={{1,1,1},{1,0,1},{1,1,1}}; _t(setZeroes(m),{{1,0,1},{0,0,0},{1,0,1}},"example 1"); }
  { vector<vector<int>> m={{0,1,2,0},{3,4,5,2},{1,3,1,5}}; _t(setZeroes(m),{{0,0,0,0},{0,4,5,0},{0,3,1,0}},"example 2"); }
  { vector<vector<int>> m={{1,2,3}}; _t(setZeroes(m),{{1,2,3}},"no zeros"); }
  { vector<vector<int>> m={{0}}; _t(setZeroes(m),{{0}},"single zero"); }
  { vector<vector<int>> m={{1,0},{1,1}}; _t(setZeroes(m),{{0,0},{1,0}},"two by two"); }
  { vector<vector<int>> m={{5,0,5},{5,5,5}}; _t(setZeroes(m),{{0,0,0},{5,0,5}},"column zeroed"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"insert-interval":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<vector<int>> iv={{1,3},{6,9}}; vector<int> ni={2,5}; _t(insert(iv,ni),{{1,5},{6,9}},"example 1"); }
  { vector<vector<int>> iv={{1,2},{3,5},{6,7},{8,10},{12,16}}; vector<int> ni={4,8}; _t(insert(iv,ni),{{1,2},{3,10},{12,16}},"example 2"); }
  { vector<vector<int>> iv={}; vector<int> ni={5,7}; _t(insert(iv,ni),{{5,7}},"empty list"); }
  { vector<vector<int>> iv={{1,5}}; vector<int> ni={2,3}; _t(insert(iv,ni),{{1,5}},"contained interval"); }
  { vector<vector<int>> iv={{3,5},{8,10}}; vector<int> ni={1,2}; _t(insert(iv,ni),{{1,2},{3,5},{8,10}},"insert at front"); }
  { vector<vector<int>> iv={{1,2},{5,6}}; vector<int> ni={2,5}; _t(insert(iv,ni),{{1,6}},"touching merge"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},candy:{starter:`#include <bits/stdc++.h>
using namespace std;
int candy(vector<int>& ratings) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={1,0,2}; _t(candy(a),5,"example 1"); }
  { vector<int> a={1,2,2}; _t(candy(a),4,"example 2"); }
  { vector<int> a={1}; _t(candy(a),1,"single child"); }
  { vector<int> a={1,2,3,4}; _t(candy(a),10,"strictly increasing"); }
  { vector<int> a={4,3,2,1}; _t(candy(a),10,"strictly decreasing"); }
  { vector<int> a={1,3,2,2,1}; _t(candy(a),7,"peak then plateau"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"number-of-1-bits":{starter:`#include <bits/stdc++.h>
using namespace std;
int hammingWeight(int n) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t(hammingWeight(11),3,"example 1");
  _t(hammingWeight(128),1,"single bit");
  _t(hammingWeight(0),0,"zero");
  _t(hammingWeight(7),3,"three low bits");
  _t(hammingWeight(2147483647),31,"all 31 bits set");
  _t(hammingWeight(1),1,"one");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"missing-number":{starter:`#include <bits/stdc++.h>
using namespace std;
int missingNumber(vector<int>& nums) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={3,0,1}; _t(missingNumber(a),2,"example 1"); }
  { vector<int> a={0,1}; _t(missingNumber(a),2,"missing at end"); }
  { vector<int> a={9,6,4,2,3,5,7,0,1}; _t(missingNumber(a),8,"example 3"); }
  { vector<int> a={0}; _t(missingNumber(a),1,"missing one of [0,1]"); }
  { vector<int> a={1}; _t(missingNumber(a),0,"missing zero"); }
  { vector<int> a={0,2}; _t(missingNumber(a),1,"missing middle"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"unique-paths":{starter:`#include <bits/stdc++.h>
using namespace std;
int uniquePaths(int m, int n) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t(uniquePaths(3,7),28,"example 1");
  _t(uniquePaths(3,2),3,"example 2");
  _t(uniquePaths(1,1),1,"single cell");
  _t(uniquePaths(1,10),1,"single row");
  _t(uniquePaths(10,10),48620,"square grid");
  _t(uniquePaths(23,12),193536720,"large but int32-safe");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"word-break":{starter:`#include <bits/stdc++.h>
using namespace std;
bool wordBreak(string s, vector<string>& wordDict) {
  return false;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<string> w={"leet","code"}; _t(wordBreak("leetcode",w),true,"example 1"); }
  { vector<string> w={"apple","pen"}; _t(wordBreak("applepenapple",w),true,"reuse a word"); }
  { vector<string> w={"cats","dog","sand","and","cat"}; _t(wordBreak("catsandog",w),false,"cannot segment"); }
  { vector<string> w={"a"}; _t(wordBreak("a",w),true,"single letter"); }
  { vector<string> w={"aaaa","aaa"}; _t(wordBreak("aaaaaaa",w),true,"overlap split"); }
  { vector<string> w={"car","ca","rs"}; _t(wordBreak("cars",w),true,"ca + rs"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"longest-common-subsequence":{starter:`#include <bits/stdc++.h>
using namespace std;
int longestCommonSubsequence(string text1, string text2) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t(longestCommonSubsequence("abcde","ace"),3,"example 1");
  _t(longestCommonSubsequence("abc","abc"),3,"identical");
  _t(longestCommonSubsequence("abc","def"),0,"no overlap");
  _t(longestCommonSubsequence("bsbininm","jmjkbkjkv"),1,"single shared char");
  _t(longestCommonSubsequence("ezupkr","ubmrapg"),2,"mixed");
  _t(longestCommonSubsequence("a","a"),1,"single char match");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"decode-ways":{starter:`#include <bits/stdc++.h>
using namespace std;
int numDecodings(string s) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t(numDecodings("12"),2,"example 1");
  _t(numDecodings("226"),3,"example 2");
  _t(numDecodings("06"),0,"leading zero");
  _t(numDecodings("0"),0,"just zero");
  _t(numDecodings("10"),1,"ten only");
  _t(numDecodings("100"),0,"invalid trailing zero");
  _t(numDecodings("11106"),2,"classic multi");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"partition-equal-subset-sum":{starter:`#include <bits/stdc++.h>
using namespace std;
bool canPartition(vector<int>& nums) {
  return false;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={1,5,11,5}; _t(canPartition(a),true,"example 1"); }
  { vector<int> a={1,2,3,5}; _t(canPartition(a),false,"odd-ish no split"); }
  { vector<int> a={1,1}; _t(canPartition(a),true,"two equal"); }
  { vector<int> a={1}; _t(canPartition(a),false,"single element"); }
  { vector<int> a={2,2,3,5}; _t(canPartition(a),false,"sum is even but no subset"); }
  { vector<int> a={3,3,3,4,5}; _t(canPartition(a),true,"sum 18 -> 9 each"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"burst-balloons":{starter:`#include <bits/stdc++.h>
using namespace std;
int maxCoins(vector<int>& nums) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={3,1,5,8}; _t(maxCoins(a),167,"example 1"); }
  { vector<int> a={1,5}; _t(maxCoins(a),10,"two balloons"); }
  { vector<int> a={5}; _t(maxCoins(a),5,"single balloon"); }
  { vector<int> a={7}; _t(maxCoins(a),7,"single seven"); }
  { vector<int> a={1,2,3,4,5}; _t(maxCoins(a),110,"ascending"); }
  { vector<int> a={9,76,64}; _t(maxCoins(a),44416,"three values"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"rotting-oranges":{starter:`#include <bits/stdc++.h>
using namespace std;
int orangesRotting(vector<vector<int>>& grid) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<vector<int>> g={{2,1,1},{1,1,0},{0,1,1}}; _t(orangesRotting(g),4,"example 1"); }
  { vector<vector<int>> g={{2,1,1},{0,1,1},{1,0,1}}; _t(orangesRotting(g),-1,"unreachable fresh orange"); }
  { vector<vector<int>> g={{0,2}}; _t(orangesRotting(g),0,"no fresh oranges"); }
  { vector<vector<int>> g={{0}}; _t(orangesRotting(g),0,"single empty cell"); }
  { vector<vector<int>> g={{1}}; _t(orangesRotting(g),-1,"single fresh orange never rots"); }
  { vector<vector<int>> g={{2,2},{1,1}}; _t(orangesRotting(g),1,"two sources one minute"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"pacific-atlantic":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static vector<vector<int>> _norm(vector<vector<int>> a){for(auto& x:a)sort(x.begin(),x.end());sort(a.begin(),a.end());return a;}

int main(){
  { vector<vector<int>> h={{1,2,2,3,5},{3,2,3,4,4},{2,4,5,3,1},{6,7,1,4,5},{5,1,1,2,4}}; _t(_norm(pacificAtlantic(h)),_norm({{0,4},{1,3},{1,4},{2,2},{3,0},{3,1},{4,0}}),"example 1"); }
  { vector<vector<int>> h={{1}}; _t(_norm(pacificAtlantic(h)),_norm({{0,0}}),"single cell"); }
  { vector<vector<int>> h={{2,1},{1,2}}; _t(_norm(pacificAtlantic(h)),_norm({{0,0},{0,1},{1,0},{1,1}}),"all reach both"); }
  { vector<vector<int>> h={{1,2,3},{8,9,4},{7,6,5}}; _t(_norm(pacificAtlantic(h)),_norm({{0,2},{1,0},{1,1},{1,2},{2,0},{2,1},{2,2}}),"spiral"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"alien-dictionary":{starter:`#include <bits/stdc++.h>
using namespace std;
string alienOrder(vector<string>& words) {
  return "";
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<string> w={"wrt","wrf","er","ett","rftt"}; _t(alienOrder(w),string("wertf"),"classic unique order"); }
  { vector<string> w={"z","x","z"}; _t(alienOrder(w),string(""),"cycle is invalid"); }
  { vector<string> w={"abc","ab"}; _t(alienOrder(w),string(""),"prefix violation"); }
  { vector<string> w={"w","x","y","z"}; _t(alienOrder(w),string("wxyz"),"total order from single letters"); }
  { vector<string> w={"a"}; _t(alienOrder(w),string("a"),"single letter"); }
  { vector<string> w={"c","cb","b","ba","a"}; _t(alienOrder(w),string("cba"),"prefix-then-branch chain"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"valid-anagram":{starter:`#include <bits/stdc++.h>
using namespace std;
bool isAnagram(string s, string t) {
  return false;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t(isAnagram("anagram","nagaram"),true,"example 1");
  _t(isAnagram("rat","car"),false,"example 2");
  _t(isAnagram("a","a"),true,"single char match");
  _t(isAnagram("ab","a"),false,"different lengths");
  _t(isAnagram("aacc","ccac"),false,"same length different counts");
  _t(isAnagram("listen","silent"),true,"classic anagram");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"subarray-sum-equals-k":{starter:`#include <bits/stdc++.h>
using namespace std;
int subarraySum(vector<int>& nums, int k) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={1,1,1}; _t(subarraySum(a,2),2,"example 1"); }
  { vector<int> a={1,2,3}; _t(subarraySum(a,3),2,"example 2"); }
  { vector<int> a={1,-1,0}; _t(subarraySum(a,0),3,"negatives and zero"); }
  { vector<int> a={3,4,7,2,-3,1,4,2}; _t(subarraySum(a,7),4,"mixed signs"); }
  { vector<int> a={0,0,0}; _t(subarraySum(a,0),6,"all zeros"); }
  { vector<int> a={1}; _t(subarraySum(a,0),0,"no subarray sums to k"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"four-sum-ii":{starter:`#include <bits/stdc++.h>
using namespace std;
int fourSumCount(vector<int>& nums1, vector<int>& nums2, vector<int>& nums3, vector<int>& nums4) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={1,2},b={-2,-1},c={-1,2},d={0,2}; _t(fourSumCount(a,b,c,d),2,"example 1"); }
  { vector<int> a={0},b={0},c={0},d={0}; _t(fourSumCount(a,b,c,d),1,"example 2"); }
  { vector<int> a={1},b={1},c={1},d={1}; _t(fourSumCount(a,b,c,d),0,"no tuple sums to zero"); }
  { vector<int> a={-1,1},b={-1,1},c={-1,1},d={-1,1}; _t(fourSumCount(a,b,c,d),6,"symmetric arrays"); }
  { vector<int> a={0,0},b={0,0},c={0,0},d={0,0}; _t(fourSumCount(a,b,c,d),16,"all zeros"); }
  { vector<int> a={1,2,3},b={-1,-2,-3},c={0,0,0},d={0,0,0}; _t(fourSumCount(a,b,c,d),27,"many combinations"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"middle-of-linked-list":{starter:`#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct ListNode { int val; ListNode *next; ListNode(int v = 0, ListNode *n = nullptr) : val(v), next(n) {} };
ListNode* middleNode(ListNode* head) {
  return nullptr;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static ListNode* _build(const vector<int>& a){ListNode h;ListNode* c=&h;for(int v:a){c->next=new ListNode(v);c=c->next;}return h.next;}
static vector<int> _toList(ListNode* n){vector<int> o;while(n){o.push_back(n->val);n=n->next;}return o;}

int main(){
  _t(_toList(middleNode(_build({1,2,3,4,5}))),{3,4,5},"odd length");
  _t(_toList(middleNode(_build({1,2,3,4,5,6}))),{4,5,6},"even length picks second middle");
  _t(_toList(middleNode(_build({1}))),{1},"single node");
  _t(_toList(middleNode(_build({1,2}))),{2},"two nodes");
  _t(_toList(middleNode(_build({1,2,3}))),{2,3},"three nodes");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"remove-nth-from-end":{starter:`#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct ListNode { int val; ListNode *next; ListNode(int v = 0, ListNode *n = nullptr) : val(v), next(n) {} };
ListNode* removeNthFromEnd(ListNode* head, int n) {
  return nullptr;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static ListNode* _build(const vector<int>& a){ListNode h;ListNode* c=&h;for(int v:a){c->next=new ListNode(v);c=c->next;}return h.next;}
static vector<int> _toList(ListNode* n){vector<int> o;while(n){o.push_back(n->val);n=n->next;}return o;}

int main(){
  _t(_toList(removeNthFromEnd(_build({1,2,3,4,5}),2)),{1,2,3,5},"example 1");
  _t(_toList(removeNthFromEnd(_build({1}),1)),{},"single node removed");
  _t(_toList(removeNthFromEnd(_build({1,2}),1)),{1},"remove last of two");
  _t(_toList(removeNthFromEnd(_build({1,2}),2)),{2},"remove head of two");
  _t(_toList(removeNthFromEnd(_build({1,2,3,4,5}),5)),{2,3,4,5},"remove head");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"add-two-numbers":{starter:`#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct ListNode { int val; ListNode *next; ListNode(int v = 0, ListNode *n = nullptr) : val(v), next(n) {} };
ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
  return nullptr;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static ListNode* _build(const vector<int>& a){ListNode h;ListNode* c=&h;for(int v:a){c->next=new ListNode(v);c=c->next;}return h.next;}
static vector<int> _toList(ListNode* n){vector<int> o;while(n){o.push_back(n->val);n=n->next;}return o;}

int main(){
  _t(_toList(addTwoNumbers(_build({2,4,3}),_build({5,6,4}))),{7,0,8},"example 1");
  _t(_toList(addTwoNumbers(_build({0}),_build({0}))),{0},"zero plus zero");
  _t(_toList(addTwoNumbers(_build({9,9,9,9,9,9,9}),_build({9,9,9,9}))),{8,9,9,9,0,0,0,1},"carry out new digit");
  _t(_toList(addTwoNumbers(_build({5}),_build({5}))),{0,1},"single digit carry");
  _t(_toList(addTwoNumbers(_build({1,8}),_build({0}))),{1,8},"different lengths");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"happy-number":{starter:`#include <bits/stdc++.h>
using namespace std;
bool isHappy(int n) {
  return false;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t(isHappy(19),true,"example 1");
  _t(isHappy(2),false,"example 2");
  _t(isHappy(1),true,"one is happy");
  _t(isHappy(7),true,"seven is happy");
  _t(isHappy(4),false,"four enters the cycle");
  _t(isHappy(100),true,"power of ten");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"pow-x-n":{starter:`#include <bits/stdc++.h>
using namespace std;
double myPow(double x, int n) {
  return 0.0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t((long long)llround(myPow(2.0,10)),(long long)1024,"two to the tenth");
  _t((long long)llround(myPow(2.0,0)),(long long)1,"exponent zero");
  _t((long long)llround(myPow(2.0,-2)*10000),(long long)2500,"negative exponent reciprocal");
  _t((long long)llround(myPow(3.0,5)),(long long)243,"three to the fifth");
  _t((long long)llround(myPow(0.5,4)*10000),(long long)625,"fractional base");
  _t((long long)llround(myPow(2.1,3)*100000),(long long)926100,"non-integer base");
  _t((long long)llround(myPow(1.0,2147483647)),(long long)1,"one to a huge power");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},perceptron:{starter:`#include <bits/stdc++.h>
using namespace std;
vector<int> perceptron(vector<vector<double>> X, vector<int> y, double lr = 0.1, int epochs = 20) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<vector<double>> X={{0,0},{0,1},{1,0},{1,1}}; vector<int> y={0,0,0,1}; _t(perceptron(X,y,0.1,20),{0,0,0,1},"AND gate"); }
  { vector<vector<double>> X={{0,0},{0,1},{1,0},{1,1}}; vector<int> y={0,1,1,1}; _t(perceptron(X,y,0.1,20),{0,1,1,1},"OR gate"); }
  { vector<vector<double>> X={{0,0},{0,1},{1,0},{1,1}}; vector<int> y={0,0,0,0}; _t(perceptron(X,y,0.1,20),{0,0,0,0},"all zeros stay zero"); }
  { vector<vector<double>> X={{2,2},{3,3},{-1,-1},{-2,-2}}; vector<int> y={1,1,0,0}; _t(perceptron(X,y,0.1,20),{1,1,0,0},"separable diagonal"); }
  { vector<vector<double>> X={{1,1}}; vector<int> y={1}; _t(perceptron(X,y,0.1,20),{1},"single positive point"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"cosine-similarity":{starter:`#include <bits/stdc++.h>
using namespace std;
double cosineSimilarity(vector<double> a, vector<double> b) {
  return 0.0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t((long long)llround(cosineSimilarity({1,0},{0,1})*10000),(long long)0,"orthogonal");
  _t((long long)llround(cosineSimilarity({1,2,3},{1,2,3})*10000),(long long)10000,"identical");
  _t((long long)llround(cosineSimilarity({1,2,3},{-1,-2,-3})*10000),(long long)-10000,"opposite");
  _t((long long)llround(cosineSimilarity({1,2,3},{4,5,6})*10000),(long long)9746,"known case");
  _t((long long)llround(cosineSimilarity({2,0},{3,0})*10000),(long long)10000,"same direction scaled");
  _t((long long)llround(cosineSimilarity({1,1},{1,0})*10000),(long long)7071,"45 degrees");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"implement-trie":{starter:`#include <bits/stdc++.h>
using namespace std;
class Trie {
public:
  Trie() {}
  void insert(string word) {}
  bool search(string word) { return false; }
  bool startsWith(string prefix) { return false; }
};
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  Trie _tr;
  _tr.insert("apple");
  _t(_tr.search("apple"),true,"inserted word found");
  _t(_tr.search("app"),false,"prefix is not a word yet");
  _t(_tr.startsWith("app"),true,"prefix exists");
  _tr.insert("app");
  _t(_tr.search("app"),true,"now a full word");
  _t(_tr.startsWith("appl"),true,"longer prefix exists");
  _t(_tr.search("banana"),false,"never inserted");
  _t(_tr.startsWith("b"),false,"no such prefix");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"queue-using-stacks":{starter:`#include <bits/stdc++.h>
using namespace std;
class MyQueue {
public:
  MyQueue() {}
  void push(int x) {}
  int pop() { return 0; }
  int peek() { return 0; }
  bool empty() { return true; }
};
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  MyQueue _q;
  _q.push(1);_q.push(2);
  _t(_q.peek(),1,"front is 1");
  _t(_q.pop(),1,"pop returns front");
  _t(_q.empty(),false,"still has 2");
  _t(_q.pop(),2,"pop returns 2");
  _t(_q.empty(),true,"now empty");
  _q.push(3);_q.push(4);_q.push(5);
  _t(_q.pop(),3,"fifo order maintained");
  _t(_q.peek(),4,"next front is 4");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},permutations:{starter:`#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> permute(vector<int>& nums) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static vector<vector<int>> _normp(vector<vector<int>> a){sort(a.begin(),a.end());return a;}

int main(){
  { vector<int> a={1,2,3}; _t(_normp(permute(a)),_normp({{1,2,3},{1,3,2},{2,1,3},{2,3,1},{3,1,2},{3,2,1}}),"example 1"); }
  { vector<int> a={0,1}; _t(_normp(permute(a)),_normp({{0,1},{1,0}}),"two elements"); }
  { vector<int> a={1}; _t(_normp(permute(a)),_normp({{1}}),"single element"); }
  { vector<int> a={1,2,3,4}; _t((int)permute(a).size(),24,"4! permutations"); }
  { vector<int> a={7,8,9}; _t(_normp(permute(a)),_normp({{7,8,9},{7,9,8},{8,7,9},{8,9,7},{9,7,8},{9,8,7}}),"distinct values"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"generate-parentheses":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<string> generateParenthesis(int n) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { auto r=generateParenthesis(3); sort(r.begin(),r.end()); vector<string> e={"((()))","(()())","(())()","()(())","()()()"}; sort(e.begin(),e.end()); _t(r,e,"example 1"); }
  { auto r=generateParenthesis(1); sort(r.begin(),r.end()); vector<string> e={"()"}; _t(r,e,"single pair"); }
  { auto r=generateParenthesis(2); sort(r.begin(),r.end()); vector<string> e={"(())","()()"}; sort(e.begin(),e.end()); _t(r,e,"two pairs"); }
  _t((int)generateParenthesis(4).size(),14,"catalan number 14");
  _t((int)generateParenthesis(5).size(),42,"catalan number 42");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"sudoku-solver":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<vector<char>> solveSudoku(vector<vector<char>>& board) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<vector<char>> b={{'5','3','.','.','7','.','.','.','.'},{'6','.','.','1','9','5','.','.','.'},{'.','9','8','.','.','.','.','6','.'},{'8','.','.','.','6','.','.','.','3'},{'4','.','.','8','.','3','.','.','1'},{'7','.','.','.','2','.','.','.','6'},{'.','6','.','.','.','.','2','8','.'},{'.','.','.','4','1','9','.','.','5'},{'.','.','.','.','8','.','.','7','9'}};
    vector<vector<char>> sol={{'5','3','4','6','7','8','9','1','2'},{'6','7','2','1','9','5','3','4','8'},{'1','9','8','3','4','2','5','6','7'},{'8','5','9','7','6','1','4','2','3'},{'4','2','6','8','5','3','7','9','1'},{'7','1','3','9','2','4','8','5','6'},{'9','6','1','5','3','7','2','8','4'},{'2','8','7','4','1','9','6','3','5'},{'3','4','5','2','8','6','1','7','9'}};
    _t(solveSudoku(b),sol,"classic puzzle solved"); }
  { vector<vector<char>> b={{'5','3','4','6','7','8','9','1','2'},{'6','7','2','1','9','5','3','4','8'},{'1','9','8','3','4','2','5','6','7'},{'8','5','9','7','6','1','4','2','3'},{'4','2','6','8','5','3','7','9','1'},{'7','1','3','9','2','4','8','5','6'},{'9','6','1','5','3','7','2','8','4'},{'2','8','7','4','1','9','6','3','5'},{'3','4','5','2','8','6','1','7','.'}};
    vector<vector<char>> sol={{'5','3','4','6','7','8','9','1','2'},{'6','7','2','1','9','5','3','4','8'},{'1','9','8','3','4','2','5','6','7'},{'8','5','9','7','6','1','4','2','3'},{'4','2','6','8','5','3','7','9','1'},{'7','1','3','9','2','4','8','5','6'},{'9','6','1','5','3','7','2','8','4'},{'2','8','7','4','1','9','6','3','5'},{'3','4','5','2','8','6','1','7','9'}};
    _t(solveSudoku(b),sol,"one empty cell"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"find-all-anagrams":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<int> findAnagrams(string s, string p) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t(findAnagrams("cbaebabacd","abc"),{0,6},"example 1");
  _t(findAnagrams("abab","ab"),{0,1,2},"example 2");
  _t(findAnagrams("aa","bb"),{},"no anagrams");
  _t(findAnagrams("a","ab"),{},"p longer than s");
  _t(findAnagrams("aaaa","a"),{0,1,2,3},"single char p");
  _t(findAnagrams("baa","aa"),{1},"one match");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"longest-repeating-replacement":{starter:`#include <bits/stdc++.h>
using namespace std;
int characterReplacement(string s, int k) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t(characterReplacement("ABAB",2),4,"example 1");
  _t(characterReplacement("AABABBA",1),4,"example 2");
  _t(characterReplacement("A",0),1,"single char no ops");
  _t(characterReplacement("AAAA",0),4,"all same");
  _t(characterReplacement("ABCDE",1),2,"distinct chars");
  _t(characterReplacement("AAAB",0),3,"no replacements allowed");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"max-consecutive-ones-iii":{starter:`#include <bits/stdc++.h>
using namespace std;
int longestOnes(vector<int>& nums, int k) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={1,1,1,0,0,0,1,1,1,1,0}; _t(longestOnes(a,2),6,"example 1"); }
  { vector<int> a={0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1}; _t(longestOnes(a,3),10,"example 2"); }
  { vector<int> a={0,0,0}; _t(longestOnes(a,0),0,"no flips all zeros"); }
  { vector<int> a={1,1,1}; _t(longestOnes(a,0),3,"all ones"); }
  { vector<int> a={0,0,0}; _t(longestOnes(a,3),3,"flip everything"); }
  { vector<int> a={1,0,1,0,1}; _t(longestOnes(a,1),3,"single flip"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"find-min-rotated":{starter:`#include <bits/stdc++.h>
using namespace std;
int findMin(vector<int>& nums) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={3,4,5,1,2}; _t(findMin(a),1,"example 1"); }
  { vector<int> a={4,5,6,7,0,1,2}; _t(findMin(a),0,"example 2"); }
  { vector<int> a={11,13,15,17}; _t(findMin(a),11,"no effective rotation"); }
  { vector<int> a={2,1}; _t(findMin(a),1,"two elements"); }
  { vector<int> a={1}; _t(findMin(a),1,"single element"); }
  { vector<int> a={5,1,2,3,4}; _t(findMin(a),1,"pivot near start"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"search-2d-matrix":{starter:`#include <bits/stdc++.h>
using namespace std;
bool searchMatrix(vector<vector<int>>& matrix, int target) {
  return false;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<vector<int>> m={{1,3,5,7},{10,11,16,20},{23,30,34,60}};
    _t(searchMatrix(m,3),true,"example 1");
    _t(searchMatrix(m,13),false,"example 2");
    _t(searchMatrix(m,1),true,"top-left corner");
    _t(searchMatrix(m,60),true,"bottom-right corner"); }
  { vector<vector<int>> m={{1}}; _t(searchMatrix(m,1),true,"single hit"); }
  { vector<vector<int>> m={{1}}; _t(searchMatrix(m,2),false,"single miss"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"koko-eating-bananas":{starter:`#include <bits/stdc++.h>
using namespace std;
int minEatingSpeed(vector<int>& piles, int h) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={3,6,7,11}; _t(minEatingSpeed(a,8),4,"example 1"); }
  { vector<int> a={30,11,23,4,20}; _t(minEatingSpeed(a,5),30,"one pile per hour"); }
  { vector<int> a={30,11,23,4,20}; _t(minEatingSpeed(a,6),23,"six hours"); }
  { vector<int> a={1,1,1,999}; _t(minEatingSpeed(a,1002),1,"plenty of time"); }
  { vector<int> a={312884470}; _t(minEatingSpeed(a,968709470),1,"single huge pile, slow ok"); }
  { vector<int> a={3}; _t(minEatingSpeed(a,3),1,"single pile slow"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"count-smaller-after-self":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<int> countSmaller(vector<int>& nums) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={5,2,6,1}; _t(countSmaller(a),{2,1,1,0},"example 1"); }
  { vector<int> a={-1,-1}; _t(countSmaller(a),{0,0},"equal values, none strictly smaller"); }
  { vector<int> a={-1}; _t(countSmaller(a),{0},"single element"); }
  { vector<int> a={1,2,3,4}; _t(countSmaller(a),{0,0,0,0},"ascending"); }
  { vector<int> a={4,3,2,1}; _t(countSmaller(a),{3,2,1,0},"descending"); }
  { vector<int> a={2,0,1}; _t(countSmaller(a),{2,0,0},"mixed"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"evaluate-rpn":{starter:`#include <bits/stdc++.h>
using namespace std;
int evalRPN(vector<string>& tokens) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<string> a={"2","1","+","3","*"}; _t(evalRPN(a),9,"example 1"); }
  { vector<string> a={"4","13","5","/","+"}; _t(evalRPN(a),6,"example 2"); }
  { vector<string> a={"10","-3","/"}; _t(evalRPN(a),-3,"negative division truncates toward zero"); }
  { vector<string> a={"7","2","/"}; _t(evalRPN(a),3,"positive truncation"); }
  { vector<string> a={"-7","2","/"}; _t(evalRPN(a),-3,"negative numerator truncates toward zero"); }
  { vector<string> a={"5"}; _t(evalRPN(a),5,"single operand"); }
  { vector<string> a={"10","6","9","3","+","-11","*","/","*","17","+","5","+"}; _t(evalRPN(a),22,"complex expression"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"decode-string":{starter:`#include <bits/stdc++.h>
using namespace std;
string decodeString(string s) {
  return "";
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t(decodeString("3[a]2[bc]"),string("aaabcbc"),"example 1");
  _t(decodeString("3[a2[c]]"),string("accaccacc"),"nested");
  _t(decodeString("2[abc]3[cd]ef"),string("abcabccdcdcdef"),"multiple groups");
  _t(decodeString("abc"),string("abc"),"no encoding");
  _t(decodeString("10[a]"),string("aaaaaaaaaa"),"multi-digit count");
  _t(decodeString("2[2[b]c]"),string("bbcbbc"),"nested with suffix");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"longest-valid-parentheses":{starter:`#include <bits/stdc++.h>
using namespace std;
int longestValidParentheses(string s) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  _t(longestValidParentheses("(()"),2,"example 1");
  _t(longestValidParentheses(")()())"),4,"example 2");
  _t(longestValidParentheses(""),0,"empty string");
  _t(longestValidParentheses("()(()"),2,"reset in middle");
  _t(longestValidParentheses("()(())"),6,"fully matched");
  _t(longestValidParentheses("((((("),0,"all opens");
  _t(longestValidParentheses(")))))"),0,"all closes");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"invert-binary-tree":{starter:`#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct TreeNode { int val; TreeNode *left; TreeNode *right; TreeNode(int v = 0) : val(v), left(nullptr), right(nullptr) {} };
TreeNode* invertTree(TreeNode* root) {
  return nullptr;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static const int XX = INT_MIN;
static TreeNode* _tree(const vector<int>& vals){
  if(vals.empty()||vals[0]==XX) return nullptr;
  TreeNode* root=new TreeNode(vals[0]); queue<TreeNode*> q; q.push(root); size_t i=1;
  while(!q.empty()&&i<vals.size()){
    TreeNode* n=q.front(); q.pop();
    if(i<vals.size()&&vals[i]!=XX){n->left=new TreeNode(vals[i]);q.push(n->left);} i++;
    if(i<vals.size()&&vals[i]!=XX){n->right=new TreeNode(vals[i]);q.push(n->right);} i++;
  }
  return root;
}
static vector<int> _dump(TreeNode* root){
  vector<int> out; deque<TreeNode*> q; q.push_back(root);
  while(!q.empty()){
    TreeNode* node=q.front(); q.pop_front();
    if(node==nullptr){out.push_back(XX);continue;}
    out.push_back(node->val); q.push_back(node->left); q.push_back(node->right);
  }
  while(!out.empty()&&out.back()==XX) out.pop_back();
  return out;
}

int main(){
  _t(_dump(invertTree(_tree({4,2,7,1,3,6,9}))),{4,7,2,9,6,3,1},"example 1");
  _t(_dump(invertTree(_tree({2,1,3}))),{2,3,1},"example 2");
  _t(_dump(invertTree(_tree({}))),{},"empty tree");
  _t(_dump(invertTree(_tree({1}))),{1},"single node");
  _t(_dump(invertTree(_tree({1,2,XX,3}))),{1,XX,2,XX,3},"left chain becomes right");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"diameter-of-binary-tree":{starter:`#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct TreeNode { int val; TreeNode *left; TreeNode *right; TreeNode(int v = 0) : val(v), left(nullptr), right(nullptr) {} };
int diameterOfBinaryTree(TreeNode* root) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static const int XX = INT_MIN;
static TreeNode* _tree(const vector<int>& vals){
  if(vals.empty()||vals[0]==XX) return nullptr;
  TreeNode* root=new TreeNode(vals[0]); queue<TreeNode*> q; q.push(root); size_t i=1;
  while(!q.empty()&&i<vals.size()){
    TreeNode* n=q.front(); q.pop();
    if(i<vals.size()&&vals[i]!=XX){n->left=new TreeNode(vals[i]);q.push(n->left);} i++;
    if(i<vals.size()&&vals[i]!=XX){n->right=new TreeNode(vals[i]);q.push(n->right);} i++;
  }
  return root;
}

int main(){
  _t(diameterOfBinaryTree(_tree({1,2,3,4,5})),3,"example 1");
  _t(diameterOfBinaryTree(_tree({1,2})),1,"two nodes");
  _t(diameterOfBinaryTree(_tree({1})),0,"single node");
  _t(diameterOfBinaryTree(_tree({1,2,XX,3,XX,4})),3,"left skewed chain");
  _t(diameterOfBinaryTree(_tree({4,2,7,1,3,6,9})),4,"balanced tree");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"lowest-common-ancestor-bst":{starter:`#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct TreeNode { int val; TreeNode *left; TreeNode *right; TreeNode(int v = 0) : val(v), left(nullptr), right(nullptr) {} };
TreeNode* lowestCommonAncestor(TreeNode* root, int p, int q) {
  return nullptr;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static const int XX = INT_MIN;
static TreeNode* _tree(const vector<int>& vals){
  if(vals.empty()||vals[0]==XX) return nullptr;
  TreeNode* root=new TreeNode(vals[0]); queue<TreeNode*> q; q.push(root); size_t i=1;
  while(!q.empty()&&i<vals.size()){
    TreeNode* n=q.front(); q.pop();
    if(i<vals.size()&&vals[i]!=XX){n->left=new TreeNode(vals[i]);q.push(n->left);} i++;
    if(i<vals.size()&&vals[i]!=XX){n->right=new TreeNode(vals[i]);q.push(n->right);} i++;
  }
  return root;
}

int main(){
  TreeNode* _b=_tree({6,2,8,0,4,7,9,XX,XX,3,5});
  _t(lowestCommonAncestor(_b,2,8)->val,6,"split at root");
  _t(lowestCommonAncestor(_b,2,4)->val,2,"ancestor is one of the nodes");
  _t(lowestCommonAncestor(_b,3,5)->val,4,"lca deeper in tree");
  _t(lowestCommonAncestor(_b,7,9)->val,8,"right subtree");
  _t(lowestCommonAncestor(_tree({2,1}),1,2)->val,2,"two node tree");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"serialize-deserialize-tree":{starter:`#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct TreeNode { int val; TreeNode *left; TreeNode *right; TreeNode(int v = 0) : val(v), left(nullptr), right(nullptr) {} };
string serialize(TreeNode* root) {
  return "";
}
TreeNode* deserialize(string data) {
  return nullptr;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}
static const int XX = INT_MIN;
static TreeNode* _tree(const vector<int>& vals){
  if(vals.empty()||vals[0]==XX) return nullptr;
  TreeNode* root=new TreeNode(vals[0]); queue<TreeNode*> q; q.push(root); size_t i=1;
  while(!q.empty()&&i<vals.size()){
    TreeNode* n=q.front(); q.pop();
    if(i<vals.size()&&vals[i]!=XX){n->left=new TreeNode(vals[i]);q.push(n->left);} i++;
    if(i<vals.size()&&vals[i]!=XX){n->right=new TreeNode(vals[i]);q.push(n->right);} i++;
  }
  return root;
}
static vector<int> _dump(TreeNode* root){
  vector<int> out; deque<TreeNode*> q; q.push_back(root);
  while(!q.empty()){
    TreeNode* node=q.front(); q.pop_front();
    if(node==nullptr){out.push_back(XX);continue;}
    out.push_back(node->val); q.push_back(node->left); q.push_back(node->right);
  }
  while(!out.empty()&&out.back()==XX) out.pop_back();
  return out;
}

int main(){
  _t(_dump(deserialize(serialize(_tree({1,2,3,XX,XX,4,5})))),{1,2,3,XX,XX,4,5},"example 1");
  _t(_dump(deserialize(serialize(_tree({})))),{},"empty tree");
  _t(_dump(deserialize(serialize(_tree({1})))),{1},"single node");
  _t(_dump(deserialize(serialize(_tree({1,2,3,4,5,6,7})))),{1,2,3,4,5,6,7},"perfect tree");
  _t(_dump(deserialize(serialize(_tree({-1,-2,-3})))),{-1,-2,-3},"negative values");
  _t(_dump(deserialize(serialize(_tree({5,4,7,3,XX,2,XX,-1,XX,9})))),{5,4,7,3,XX,2,XX,-1,XX,9},"irregular shape");
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"move-zeroes":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<int> moveZeroes(vector<int>& nums) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={0,1,0,3,12}; _t(moveZeroes(a),{1,3,12,0,0},"example 1"); }
  { vector<int> a={0}; _t(moveZeroes(a),{0},"single zero"); }
  { vector<int> a={1,2,3}; _t(moveZeroes(a),{1,2,3},"no zeros"); }
  { vector<int> a={0,0,1}; _t(moveZeroes(a),{1,0,0},"leading zeros"); }
  { vector<int> a={1,0,2,0,3}; _t(moveZeroes(a),{1,2,3,0,0},"interleaved zeros"); }
  { vector<int> a={0,0,0}; _t(moveZeroes(a),{0,0,0},"all zeros"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"remove-duplicates-sorted":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<int> removeDuplicates(vector<int>& nums) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={1,1,2}; _t(removeDuplicates(a),{1,2},"example 1"); }
  { vector<int> a={0,0,1,1,1,2,2,3,3,4}; _t(removeDuplicates(a),{0,1,2,3,4},"example 2"); }
  { vector<int> a={1}; _t(removeDuplicates(a),{1},"single element"); }
  { vector<int> a={1,2,3}; _t(removeDuplicates(a),{1,2,3},"already unique"); }
  { vector<int> a={2,2,2,2}; _t(removeDuplicates(a),{2},"all duplicates"); }
  { vector<int> a={-3,-3,-1,0,0}; _t(removeDuplicates(a),{-3,-1,0},"negatives"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"sort-colors":{starter:`#include <bits/stdc++.h>
using namespace std;
vector<int> sortColors(vector<int>& nums) {
  return {};
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={2,0,2,1,1,0}; _t(sortColors(a),{0,0,1,1,2,2},"example 1"); }
  { vector<int> a={2,0,1}; _t(sortColors(a),{0,1,2},"example 2"); }
  { vector<int> a={0}; _t(sortColors(a),{0},"single element"); }
  { vector<int> a={1,1,1}; _t(sortColors(a),{1,1,1},"all same"); }
  { vector<int> a={2,2,0,0,1,1}; _t(sortColors(a),{0,0,1,1,2,2},"reverse grouped"); }
  { vector<int> a={1,0,2,0}; _t(sortColors(a),{0,0,1,2},"mixed"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`},"three-sum-closest":{starter:`#include <bits/stdc++.h>
using namespace std;
int threeSumClosest(vector<int>& nums, int target) {
  return 0;
}
`,tests:`// ---- test harness ----
static int _p = 0, _n = 0;
static string _s(int x){return to_string(x);}
static string _s(long long x){return to_string(x);}
static string _s(bool x){return x?"true":"false";}
static string _s(double x){ if(x==(long long)x) return to_string((long long)x)+(x<0&&(long long)x==0?"":""); ostringstream o; o<<x; return o.str(); }
static string _s(const string& x){return x;}
static string _s(const char* x){return string(x);}
template<class T> string _s(const vector<T>& v){string r="[";for(size_t i=0;i<v.size();++i){if(i)r+=",";r+=_s(v[i]);}r+="]";return r;}
template<class T> void _t(const T& g,const T& e,const string& d){_n++;if(g==e){_p++;cout<<"✓ Test "<<_n<<(d.empty()?"":" - "+d)<<"\\n";}else cout<<"✗ Test "<<_n<<" - Expected "<<_s(e)<<", got "<<_s(g)<<(d.empty()?"":" ["+d+"]")<<"\\n";}

int main(){
  { vector<int> a={-1,2,1,-4}; _t(threeSumClosest(a,1),2,"example 1"); }
  { vector<int> a={0,0,0}; _t(threeSumClosest(a,1),0,"all zeros"); }
  { vector<int> a={1,1,0}; _t(threeSumClosest(a,-100),2,"far below target"); }
  { vector<int> a={1,2,4,8,16,32,64,128}; _t(threeSumClosest(a,82),82,"exact match"); }
  { vector<int> a={-3,-2,-5,3,-4}; _t(threeSumClosest(a,-1),-2,"negatives"); }
  cout << _p << "/" << _n << " tests passed" << endl;
  return 0;
}
`}}]],T=[{id:"two-sum",title:"Two Sum",difficulty:"Beginner",category:"Arrays & Strings",description:"Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target. You may assume that each input has exactly one solution, and you may not use the same element twice. Return the answer with the smaller index first. Follow-up: can you come up with an algorithm that is less than O(n²) time complexity?",examples:[{input:"nums = [2,7,11,15], target = 9",output:"[0,1]",explanation:"nums[0] + nums[1] = 2 + 7 = 9, so we return [0, 1]."},{input:"nums = [3,2,4], target = 6",output:"[1,2]",explanation:"nums[1] + nums[2] = 2 + 4 = 6."},{input:"nums = [3,3], target = 6",output:"[0,1]"}],constraints:["2 <= nums.length <= 10⁴","-10⁹ <= nums[i] <= 10⁹","-10⁹ <= target <= 10⁹","Exactly one valid answer exists"],hints:["A brute-force double loop is O(n²) — try trading space for time","Store each number's index in a hash map as you scan","For each num, the partner you need is target - num; check whether it is already in the map"],tags:["array","hash-map"],timeComplexity:"O(n)",spaceComplexity:"O(n)",starterCode:{python:`def two_sum(nums, target):
    pass
`,javascript:`function twoSum(nums, target) {

}
`},testCode:{python:`${a}
_t(two_sum([2,7,11,15],9),[0,1],'example 1')
_t(two_sum([3,2,4],6),[1,2],'example 2')
_t(two_sum([3,3],6),[0,1],'duplicate values')
_t(two_sum([-1,-2,-3,-4,-5],-8),[2,4],'negative numbers')
_t(two_sum([0,4,3,0],0),[0,3],'zeros sum to zero')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(twoSum([2,7,11,15],9),[0,1],'example 1');
_t(twoSum([3,2,4],6),[1,2],'example 2');
_t(twoSum([3,3],6),[0,1],'duplicate values');
_t(twoSum([-1,-2,-3,-4,-5],-8),[2,4],'negative numbers');
_t(twoSum([0,4,3,0],0),[0,3],'zeros sum to zero');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"best-time-stock",title:"Best Time to Buy and Sell Stock",difficulty:"Beginner",category:"Arrays & Strings",description:"You are given an array prices where prices[i] is the price of a given stock on the i-th day. You want to maximize your profit by choosing a single day to buy one stock and a different day in the future to sell it. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",examples:[{input:"prices = [7,1,5,3,6,4]",output:"5",explanation:"Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5. You must buy before you sell, so buying at 1 and selling at 7 is not allowed."},{input:"prices = [7,6,4,3,1]",output:"0",explanation:"Prices only decrease, so no transaction is profitable and the answer is 0."}],constraints:["1 <= prices.length <= 10⁵","0 <= prices[i] <= 10⁴"],hints:["Checking every buy/sell pair is O(n²) — a single pass suffices","Track the minimum price seen so far as you sweep left to right","At each day, the best profit selling today is price - minSoFar; keep the maximum"],tags:["array","greedy","dynamic-programming"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`def max_profit(prices):
    pass
`,javascript:`function maxProfit(prices) {

}
`},testCode:{python:`${a}
_t(max_profit([7,1,5,3,6,4]),5,'example 1')
_t(max_profit([7,6,4,3,1]),0,'strictly decreasing')
_t(max_profit([1,2]),1,'two days')
_t(max_profit([2,4,1]),2,'peak before valley')
_t(max_profit([3,2,6,5,0,3]),4,'buy at 2 sell at 6')
_t(max_profit([5]),0,'single day')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(maxProfit([7,1,5,3,6,4]),5,'example 1');
_t(maxProfit([7,6,4,3,1]),0,'strictly decreasing');
_t(maxProfit([1,2]),1,'two days');
_t(maxProfit([2,4,1]),2,'peak before valley');
_t(maxProfit([3,2,6,5,0,3]),4,'buy at 2 sell at 6');
_t(maxProfit([5]),0,'single day');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"product-except-self",title:"Product of Array Except Self",difficulty:"Intermediate",category:"Arrays & Strings",description:"Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation. Follow-up: can you solve it in O(1) extra space (the output array does not count)?",examples:[{input:"nums = [1,2,3,4]",output:"[24,12,8,6]",explanation:"answer[0] = 2·3·4 = 24, answer[1] = 1·3·4 = 12, and so on."},{input:"nums = [-1,1,0,-3,3]",output:"[0,0,9,0,0]",explanation:"Every position containing a non-zero element gets 0 because the array contains a zero elsewhere."}],constraints:["2 <= nums.length <= 10⁵","-30 <= nums[i] <= 30","Division is not allowed","Must run in O(n) time"],hints:["answer[i] is (product of everything left of i) × (product of everything right of i)","Build prefix products in one pass, then sweep from the right multiplying in suffix products","You can store prefixes directly in the output array and carry the suffix in a single variable"],tags:["array","prefix-sum"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`def product_except_self(nums):
    pass
`,javascript:`function productExceptSelf(nums) {

}
`},testCode:{python:`${a}
_t(product_except_self([1,2,3,4]),[24,12,8,6],'example 1')
_t(product_except_self([-1,1,0,-3,3]),[0,0,9,0,0],'contains zero')
_t(product_except_self([2,3]),[3,2],'two elements')
_t(product_except_self([1,1,1,1]),[1,1,1,1],'all ones')
_t(product_except_self([0,0]),[0,0],'two zeros')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(productExceptSelf([1,2,3,4]),[24,12,8,6],'example 1');
_t(productExceptSelf([-1,1,0,-3,3]),[0,0,9,0,0],'contains zero');
_t(productExceptSelf([2,3]),[3,2],'two elements');
_t(productExceptSelf([1,1,1,1]),[1,1,1,1],'all ones');
_t(productExceptSelf([0,0]),[0,0],'two zeros');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"maximum-subarray",title:"Maximum Subarray",difficulty:"Intermediate",category:"Arrays & Strings",description:"Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum, and return its sum. Follow-up: if you have figured out the O(n) solution (Kadane's algorithm), try coding a solution using the divide-and-conquer approach, which is more subtle.",examples:[{input:"nums = [-2,1,-3,4,-1,2,1,-5,4]",output:"6",explanation:"The subarray [4,-1,2,1] has the largest sum, 6."},{input:"nums = [1]",output:"1",explanation:"The only subarray is [1]."},{input:"nums = [5,4,-1,7,8]",output:"23",explanation:"The whole array has the largest sum."}],constraints:["1 <= nums.length <= 10⁵","-10⁴ <= nums[i] <= 10⁴"],hints:["At each index decide: extend the running subarray or start fresh at this element","cur = max(num, cur + num); the answer is the best cur seen anywhere","Careful with all-negative arrays — the answer is the largest single element, never an empty sum"],tags:["array","dynamic-programming","divide-and-conquer","kadane"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`def max_subarray(nums):
    pass
`,javascript:`function maxSubarray(nums) {

}
`},testCode:{python:`${a}
_t(max_subarray([-2,1,-3,4,-1,2,1,-5,4]),6,'example 1')
_t(max_subarray([1]),1,'single element')
_t(max_subarray([5,4,-1,7,8]),23,'whole array')
_t(max_subarray([-1]),-1,'single negative')
_t(max_subarray([-2,-1]),-1,'all negative')
_t(max_subarray([8,-19,5,-4,20]),21,'restart mid-array')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(maxSubarray([-2,1,-3,4,-1,2,1,-5,4]),6,'example 1');
_t(maxSubarray([1]),1,'single element');
_t(maxSubarray([5,4,-1,7,8]),23,'whole array');
_t(maxSubarray([-1]),-1,'single negative');
_t(maxSubarray([-2,-1]),-1,'all negative');
_t(maxSubarray([8,-19,5,-4,20]),21,'restart mid-array');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"merge-intervals",title:"Merge Intervals",difficulty:"Intermediate",category:"Arrays & Strings",description:"Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input. The output must be sorted by start time. Intervals that merely touch (one ends exactly where another begins) are considered overlapping.",examples:[{input:"intervals = [[1,3],[2,6],[8,10],[15,18]]",output:"[[1,6],[8,10],[15,18]]",explanation:"[1,3] and [2,6] overlap, so they merge into [1,6]."},{input:"intervals = [[1,4],[4,5]]",output:"[[1,5]]",explanation:"[1,4] and [4,5] touch at 4 and are considered overlapping."}],constraints:["1 <= intervals.length <= 10⁴","intervals[i].length == 2","0 <= start_i <= end_i <= 10⁴","Input is not guaranteed to be sorted"],hints:["Sort the intervals by start time first","Walk the sorted list keeping a current merged interval; extend its end while the next start is <= the current end","When the next interval starts after the current end, push the merged interval and start a new one"],tags:["array","sorting","intervals"],timeComplexity:"O(n log n)",spaceComplexity:"O(n)",starterCode:{python:`def merge_intervals(intervals):
    pass
`,javascript:`function mergeIntervals(intervals) {

}
`},testCode:{python:`${a}
_t(merge_intervals([[1,3],[2,6],[8,10],[15,18]]),[[1,6],[8,10],[15,18]],'example 1')
_t(merge_intervals([[1,4],[4,5]]),[[1,5]],'touching intervals')
_t(merge_intervals([[1,4],[2,3]]),[[1,4]],'fully contained')
_t(merge_intervals([[5,6],[1,2]]),[[1,2],[5,6]],'unsorted input')
_t(merge_intervals([[1,4],[0,4]]),[[0,4]],'same end')
_t(merge_intervals([[2,2]]),[[2,2]],'single point interval')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(mergeIntervals([[1,3],[2,6],[8,10],[15,18]]),[[1,6],[8,10],[15,18]],'example 1');
_t(mergeIntervals([[1,4],[4,5]]),[[1,5]],'touching intervals');
_t(mergeIntervals([[1,4],[2,3]]),[[1,4]],'fully contained');
_t(mergeIntervals([[5,6],[1,2]]),[[1,2],[5,6]],'unsorted input');
_t(mergeIntervals([[1,4],[0,4]]),[[0,4]],'same end');
_t(mergeIntervals([[2,2]]),[[2,2]],'single point interval');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"first-missing-positive",title:"First Missing Positive",difficulty:"Expert",category:"Arrays & Strings",description:"Given an unsorted integer array nums, return the smallest positive integer that is not present in nums. You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space. The array may contain duplicates, zeros, and negative numbers — none of which affect the answer.",examples:[{input:"nums = [1,2,0]",output:"3",explanation:"The numbers 1 and 2 are present, so the smallest missing positive is 3."},{input:"nums = [3,4,-1,1]",output:"2",explanation:"1 is present but 2 is missing."},{input:"nums = [7,8,9,11,12]",output:"1",explanation:"The smallest positive integer 1 is missing."}],constraints:["1 <= nums.length <= 10⁵","-2³¹ <= nums[i] <= 2³¹ - 1","Must run in O(n) time with O(1) extra space"],hints:["The answer is always in the range [1, n+1] where n is the array length — values outside [1, n] are irrelevant","Use the array itself as a hash table: the value v belongs at index v-1","Cyclic sort: repeatedly swap nums[i] into its correct slot, then scan for the first index where nums[i] != i+1"],tags:["array","in-place","cyclic-sort"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`def first_missing_positive(nums):
    pass
`,javascript:`function firstMissingPositive(nums) {

}
`},testCode:{python:`${a}
_t(first_missing_positive([1,2,0]),3,'example 1')
_t(first_missing_positive([3,4,-1,1]),2,'example 2')
_t(first_missing_positive([7,8,9,11,12]),1,'no small positives')
_t(first_missing_positive([1]),2,'single element')
_t(first_missing_positive([2,1]),3,'complete pair')
_t(first_missing_positive([1,1]),2,'duplicates')
_t(first_missing_positive([-5]),1,'only negative')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(firstMissingPositive([1,2,0]),3,'example 1');
_t(firstMissingPositive([3,4,-1,1]),2,'example 2');
_t(firstMissingPositive([7,8,9,11,12]),1,'no small positives');
_t(firstMissingPositive([1]),2,'single element');
_t(firstMissingPositive([2,1]),3,'complete pair');
_t(firstMissingPositive([1,1]),2,'duplicates');
_t(firstMissingPositive([-5]),1,'only negative');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"rotate-array",title:"Rotate Array",difficulty:"Intermediate",category:"Arrays & Strings",description:"Given an integer array nums, rotate the array to the right by k steps, where k is non-negative. k may be larger than the array length, in which case the effective rotation is k mod n. Modify the array in place and return it so the tests can compare the result directly. Follow-up: can you do it in O(1) extra space?",examples:[{input:"nums = [1,2,3,4,5,6,7], k = 3",output:"[5,6,7,1,2,3,4]",explanation:"Rotate right by 3: [7,1,2,3,4,5,6] → [6,7,1,2,3,4,5] → [5,6,7,1,2,3,4]."},{input:"nums = [-1,-100,3,99], k = 2",output:"[3,99,-1,-100]",explanation:"Rotate right by 2: [99,-1,-100,3] → [3,99,-1,-100]."}],constraints:["1 <= nums.length <= 10⁵","-2³¹ <= nums[i] <= 2³¹ - 1","0 <= k <= 10⁵"],hints:["Rotating right by k moves each element to index (i + k) mod n","Reduce k modulo n first, since rotating by the length leaves the array unchanged","Reverse the whole array, then reverse the first k and the last n-k elements for O(1) space"],tags:["array","math","two-pointers","in-place"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`def rotate(nums, k):
    pass
`,javascript:`function rotate(nums, k) {

}
`},testCode:{python:`${a}
_t(rotate([1,2,3,4,5,6,7],3),[5,6,7,1,2,3,4],'example 1')
_t(rotate([-1,-100,3,99],2),[3,99,-1,-100],'example 2')
_t(rotate([1,2],3),[2,1],'k exceeds length')
_t(rotate([1,2,3],0),[1,2,3],'zero rotation')
_t(rotate([1],100),[1],'single element')
_t(rotate([1,2,3,4],4),[1,2,3,4],'full rotation unchanged')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(rotate([1,2,3,4,5,6,7],3),[5,6,7,1,2,3,4],'example 1');
_t(rotate([-1,-100,3,99],2),[3,99,-1,-100],'example 2');
_t(rotate([1,2],3),[2,1],'k exceeds length');
_t(rotate([1,2,3],0),[1,2,3],'zero rotation');
_t(rotate([1],100),[1],'single element');
_t(rotate([1,2,3,4],4),[1,2,3,4],'full rotation unchanged');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"longest-common-prefix",title:"Longest Common Prefix",difficulty:"Beginner",category:"Arrays & Strings",description:'Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return the empty string "". The comparison is case-sensitive, and the prefix must be shared by every string in the array.',examples:[{input:'strs = ["flower","flow","flight"]',output:'"fl"',explanation:'The longest prefix common to all three strings is "fl".'},{input:'strs = ["dog","racecar","car"]',output:'""',explanation:"There is no common prefix among the input strings, so the answer is the empty string."}],constraints:["1 <= strs.length <= 200","0 <= strs[i].length <= 200","strs[i] consists of only lowercase English letters if it is non-empty"],hints:["The common prefix can be no longer than the shortest string","Compare characters column by column across all strings, stopping at the first mismatch","Alternatively take strs[0] as a candidate prefix and trim it against each remaining string"],tags:["string","trie"],timeComplexity:"O(S)",spaceComplexity:"O(1)",starterCode:{python:`def longest_common_prefix(strs):
    pass
`,javascript:`function longestCommonPrefix(strs) {

}
`},testCode:{python:`${a}
_t(longest_common_prefix(['flower','flow','flight']),'fl','example 1')
_t(longest_common_prefix(['dog','racecar','car']),'','no common prefix')
_t(longest_common_prefix(['a']),'a','single string')
_t(longest_common_prefix(['ab','abc','abcd']),'ab','shortest is prefix')
_t(longest_common_prefix(['','abc']),'','empty string present')
_t(longest_common_prefix(['interspecies','interstellar','interstate']),'inters','long prefix')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(longestCommonPrefix(['flower','flow','flight']),'fl','example 1');
_t(longestCommonPrefix(['dog','racecar','car']),'','no common prefix');
_t(longestCommonPrefix(['a']),'a','single string');
_t(longestCommonPrefix(['ab','abc','abcd']),'ab','shortest is prefix');
_t(longestCommonPrefix(['','abc']),'','empty string present');
_t(longestCommonPrefix(['interspecies','interstellar','interstate']),'inters','long prefix');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"spiral-matrix",title:"Spiral Matrix",difficulty:"Intermediate",category:"Arrays & Strings",description:"Given an m x n matrix, return all elements of the matrix in spiral order, starting from the top-left corner and moving right, then down, then left, then up, spiralling inward until every element has been visited exactly once.",examples:[{input:"matrix = [[1,2,3],[4,5,6],[7,8,9]]",output:"[1,2,3,6,9,8,7,4,5]",explanation:"Traverse the outer ring clockwise, then the center element 5."},{input:"matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]",output:"[1,2,3,4,8,12,11,10,9,5,6,7]",explanation:"Spiral through the 3 x 4 grid clockwise."}],constraints:["m == matrix.length","n == matrix[i].length","1 <= m, n <= 10","-100 <= matrix[i][j] <= 100"],hints:["Track four boundaries: top, bottom, left, right","Walk right along top, down the right, left along bottom, up the left — then shrink the boundaries","Stop when the boundaries cross; guard the bottom and left passes so single rows/columns are not revisited"],tags:["array","matrix","simulation"],timeComplexity:"O(m·n)",spaceComplexity:"O(1)",starterCode:{python:`def spiral_order(matrix):
    pass
`,javascript:`function spiralOrder(matrix) {

}
`},testCode:{python:`${a}
_t(spiral_order([[1,2,3],[4,5,6],[7,8,9]]),[1,2,3,6,9,8,7,4,5],'example 1')
_t(spiral_order([[1,2,3,4],[5,6,7,8],[9,10,11,12]]),[1,2,3,4,8,12,11,10,9,5,6,7],'example 2')
_t(spiral_order([[1]]),[1],'single cell')
_t(spiral_order([[1,2,3]]),[1,2,3],'single row')
_t(spiral_order([[1],[2],[3]]),[1,2,3],'single column')
_t(spiral_order([[1,2],[3,4]]),[1,2,4,3],'two by two')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]),[1,2,3,6,9,8,7,4,5],'example 1');
_t(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]]),[1,2,3,4,8,12,11,10,9,5,6,7],'example 2');
_t(spiralOrder([[1]]),[1],'single cell');
_t(spiralOrder([[1,2,3]]),[1,2,3],'single row');
_t(spiralOrder([[1],[2],[3]]),[1,2,3],'single column');
_t(spiralOrder([[1,2],[3,4]]),[1,2,4,3],'two by two');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"set-matrix-zeroes",title:"Set Matrix Zeroes",difficulty:"Intermediate",category:"Arrays & Strings",description:"Given an m x n integer matrix, if an element is 0, set its entire row and column to 0. You must do it in place and return the modified matrix so the tests can compare it directly. Follow-up: a straightforward O(m·n) space solution copies the matrix; a better solution uses O(m + n) space, and you can achieve O(1) space by using the first row and first column as markers.",examples:[{input:"matrix = [[1,1,1],[1,0,1],[1,1,1]]",output:"[[1,0,1],[0,0,0],[1,0,1]]",explanation:"The single 0 at (1,1) zeroes row 1 and column 1."},{input:"matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]",output:"[[0,0,0,0],[0,4,5,0],[0,3,1,0]]",explanation:"Columns 0 and 3 and row 0 are zeroed because of the zeros in the first row."}],constraints:["m == matrix.length","n == matrix[0].length","1 <= m, n <= 200","-2³¹ <= matrix[i][j] <= 2³¹ - 1"],hints:["Decide which rows and columns must be zeroed before you start writing zeros, or you will cascade","One clean approach records the affected row and column indices in two sets","For O(1) space, use the first row and column as the marker arrays and handle them separately"],tags:["array","matrix","hash-set","in-place"],timeComplexity:"O(m·n)",spaceComplexity:"O(1)",starterCode:{python:`def set_zeroes(matrix):
    pass
`,javascript:`function setZeroes(matrix) {

}
`},testCode:{python:`${a}
_t(set_zeroes([[1,1,1],[1,0,1],[1,1,1]]),[[1,0,1],[0,0,0],[1,0,1]],'example 1')
_t(set_zeroes([[0,1,2,0],[3,4,5,2],[1,3,1,5]]),[[0,0,0,0],[0,4,5,0],[0,3,1,0]],'example 2')
_t(set_zeroes([[1,2,3]]),[[1,2,3]],'no zeros')
_t(set_zeroes([[0]]),[[0]],'single zero')
_t(set_zeroes([[1,0],[1,1]]),[[0,0],[1,0]],'two by two')
_t(set_zeroes([[5,0,5],[5,5,5]]),[[0,0,0],[5,0,5]],'column zeroed')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(setZeroes([[1,1,1],[1,0,1],[1,1,1]]),[[1,0,1],[0,0,0],[1,0,1]],'example 1');
_t(setZeroes([[0,1,2,0],[3,4,5,2],[1,3,1,5]]),[[0,0,0,0],[0,4,5,0],[0,3,1,0]],'example 2');
_t(setZeroes([[1,2,3]]),[[1,2,3]],'no zeros');
_t(setZeroes([[0]]),[[0]],'single zero');
_t(setZeroes([[1,0],[1,1]]),[[0,0],[1,0]],'two by two');
_t(setZeroes([[5,0,5],[5,5,5]]),[[0,0,0],[5,0,5]],'column zeroed');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"insert-interval",title:"Insert Interval",difficulty:"Intermediate",category:"Arrays & Strings",description:"You are given an array of non-overlapping intervals intervals where intervals[i] = [start_i, end_i] are sorted in ascending order by start_i, and a new interval newInterval = [start, end]. Insert newInterval into intervals such that the result is still sorted in ascending order by start and still has no overlapping intervals (merging if necessary). Return the resulting array of intervals. Intervals that merely touch (one ends exactly where another begins) are considered overlapping and must be merged.",examples:[{input:"intervals = [[1,3],[6,9]], newInterval = [2,5]",output:"[[1,5],[6,9]]",explanation:"[2,5] overlaps [1,3], merging into [1,5]; [6,9] is unaffected."},{input:"intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]",output:"[[1,2],[3,10],[12,16]]",explanation:"[4,8] overlaps [3,5], [6,7] and [8,10], merging them into [3,10]."}],constraints:["0 <= intervals.length <= 10⁴","intervals[i].length == 2","0 <= start_i <= end_i <= 10⁵","intervals is sorted by start_i in ascending order","newInterval.length == 2","0 <= start <= end <= 10⁵"],hints:["Intervals ending before newInterval starts can be copied as-is","Merge every interval that overlaps newInterval by extending its start/end bounds","Append the remaining intervals that start after the merged interval ends"],tags:["array","intervals"],timeComplexity:"O(n)",spaceComplexity:"O(n)",starterCode:{python:`def insert(intervals, new_interval):
    pass
`,javascript:`function insert(intervals, newInterval) {

}
`},testCode:{python:`${a}
_t(insert([[1,3],[6,9]],[2,5]),[[1,5],[6,9]],'example 1')
_t(insert([[1,2],[3,5],[6,7],[8,10],[12,16]],[4,8]),[[1,2],[3,10],[12,16]],'example 2')
_t(insert([],[5,7]),[[5,7]],'empty list')
_t(insert([[1,5]],[2,3]),[[1,5]],'contained interval')
_t(insert([[3,5],[8,10]],[1,2]),[[1,2],[3,5],[8,10]],'insert at front')
_t(insert([[1,2],[5,6]],[2,5]),[[1,6]],'touching merge')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(insert([[1,3],[6,9]],[2,5]),[[1,5],[6,9]],'example 1');
_t(insert([[1,2],[3,5],[6,7],[8,10],[12,16]],[4,8]),[[1,2],[3,10],[12,16]],'example 2');
_t(insert([],[5,7]),[[5,7]],'empty list');
_t(insert([[1,5]],[2,3]),[[1,5]],'contained interval');
_t(insert([[3,5],[8,10]],[1,2]),[[1,2],[3,5],[8,10]],'insert at front');
_t(insert([[1,2],[5,6]],[2,5]),[[1,6]],'touching merge');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"candy",title:"Candy",difficulty:"Advanced",category:"Arrays & Strings",description:"There are n children standing in a line, each assigned a rating value given in the integer array ratings. You are giving candies to these children subject to two requirements: each child must have at least one candy, and a child with a higher rating than an immediate neighbor must receive more candies than that neighbor. Return the minimum number of candies you need to distribute. Children with equal ratings have no constraint relative to each other.",examples:[{input:"ratings = [1,0,2]",output:"5",explanation:"Give 2, 1, 2 candies to the children for a total of 5."},{input:"ratings = [1,2,2]",output:"4",explanation:"Give 1, 2, 1 candies. The third child gets 1 candy; equal ratings carry no constraint."}],constraints:["n == ratings.length","1 <= n <= 2·10⁴","0 <= ratings[i] <= 2·10⁴"],hints:["Start everyone at one candy","Left-to-right pass: if ratings[i] > ratings[i-1], give one more than the left neighbor","Right-to-left pass: if ratings[i] > ratings[i+1], take the max of the current count and one more than the right neighbor"],tags:["array","greedy"],timeComplexity:"O(n)",spaceComplexity:"O(n)",starterCode:{python:`def candy(ratings):
    pass
`,javascript:`function candy(ratings) {

}
`},testCode:{python:`${a}
_t(candy([1,0,2]),5,'example 1')
_t(candy([1,2,2]),4,'example 2')
_t(candy([1]),1,'single child')
_t(candy([1,2,3,4]),10,'strictly increasing')
_t(candy([4,3,2,1]),10,'strictly decreasing')
_t(candy([1,3,2,2,1]),7,'peak then plateau')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(candy([1,0,2]),5,'example 1');
_t(candy([1,2,2]),4,'example 2');
_t(candy([1]),1,'single child');
_t(candy([1,2,3,4]),10,'strictly increasing');
_t(candy([4,3,2,1]),10,'strictly decreasing');
_t(candy([1,3,2,2,1]),7,'peak then plateau');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"valid-palindrome",title:"Valid Palindrome",difficulty:"Beginner",category:"Two Pointers",description:"A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",examples:[{input:'s = "A man, a plan, a canal: Panama"',output:"true",explanation:'After cleaning, "amanaplanacanalpanama" is a palindrome.'},{input:'s = "race a car"',output:"false",explanation:'"raceacar" is not a palindrome.'},{input:'s = " "',output:"true",explanation:'After removing non-alphanumeric characters, s is the empty string "", which reads the same forward and backward.'}],constraints:["1 <= s.length <= 2·10⁵","s consists only of printable ASCII characters"],hints:["Two pointers from both ends avoid building a cleaned copy of the string","Skip characters that are not letters or digits before comparing",'Remember digits count: "0P" is NOT a palindrome since 0 != p'],tags:["string","two-pointers"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`def is_palindrome(s):
    pass
`,javascript:`function isPalindrome(s) {

}
`},testCode:{python:`${a}
_t(is_palindrome('A man, a plan, a canal: Panama'),True,'example 1')
_t(is_palindrome('race a car'),False,'example 2')
_t(is_palindrome(' '),True,'whitespace only')
_t(is_palindrome('0P'),False,'digit vs letter')
_t(is_palindrome('ab_a'),True,'underscore ignored')
_t(is_palindrome('a'),True,'single char')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(isPalindrome('A man, a plan, a canal: Panama'),true,'example 1');
_t(isPalindrome('race a car'),false,'example 2');
_t(isPalindrome(' '),true,'whitespace only');
_t(isPalindrome('0P'),false,'digit vs letter');
_t(isPalindrome('ab_a'),true,'underscore ignored');
_t(isPalindrome('a'),true,'single char');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"three-sum",title:"3Sum",difficulty:"Intermediate",category:"Two Pointers",description:"Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets. The tests normalize ordering, so triplets may be returned in any order.",examples:[{input:"nums = [-1,0,1,2,-1,-4]",output:"[[-1,-1,2],[-1,0,1]]",explanation:"The distinct triplets summing to 0 are [-1,0,1] and [-1,-1,2]. Note [-1,0,1] is only counted once even though it can be formed two ways."},{input:"nums = [0,1,1]",output:"[]",explanation:"No triplet sums to 0."},{input:"nums = [0,0,0]",output:"[[0,0,0]]",explanation:"The only possible triplet sums to 0."}],constraints:["3 <= nums.length <= 3000","-10⁵ <= nums[i] <= 10⁵"],hints:["Sort the array first — duplicates become adjacent and easy to skip","Fix the first element, then run two pointers from both ends of the remainder looking for the complement","After finding a triplet, advance past equal values on both pointers to avoid duplicate triplets"],tags:["array","two-pointers","sorting"],timeComplexity:"O(n²)",spaceComplexity:"O(1)",starterCode:{python:`def three_sum(nums):
    pass
`,javascript:`function threeSum(nums) {

}
`},testCode:{python:`_norm=lambda a:sorted(sorted(t) for t in a)
${a}
_t(_norm(three_sum([-1,0,1,2,-1,-4])),[[-1,-1,2],[-1,0,1]],'example 1')
_t(_norm(three_sum([0,1,1])),[],'no solution')
_t(_norm(three_sum([0,0,0])),[[0,0,0]],'all zeros')
_t(_norm(three_sum([-2,0,1,1,2])),[[-2,0,2],[-2,1,1]],'two triplets')
_t(_norm(three_sum([0,0,0,0])),[[0,0,0]],'extra zeros deduped')
print(f'{_p}/{_n} tests passed')`,javascript:`const _norm=a=>a.map(t=>[...t].sort((x,y)=>x-y)).sort((x,y)=>x[0]-y[0]||x[1]-y[1]||x[2]-y[2]);
${o}
_t(_norm(threeSum([-1,0,1,2,-1,-4])),[[-1,-1,2],[-1,0,1]],'example 1');
_t(_norm(threeSum([0,1,1])),[],'no solution');
_t(_norm(threeSum([0,0,0])),[[0,0,0]],'all zeros');
_t(_norm(threeSum([-2,0,1,1,2])),[[-2,0,2],[-2,1,1]],'two triplets');
_t(_norm(threeSum([0,0,0,0])),[[0,0,0]],'extra zeros deduped');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"container-most-water",title:"Container With Most Water",difficulty:"Intermediate",category:"Two Pointers",description:"You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the i-th line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container holds the most water. Return the maximum amount of water a container can store. Notice that you may not slant the container.",examples:[{input:"height = [1,8,6,2,5,4,8,3,7]",output:"49",explanation:"The lines at indices 1 and 8 (heights 8 and 7) form a container of width 7 and height min(8,7) = 7, area 49."},{input:"height = [1,1]",output:"1",explanation:"Width 1 × height 1 = 1."}],constraints:["n == height.length","2 <= n <= 10⁵","0 <= height[i] <= 10⁴"],hints:["Area between pointers l and r is (r - l) × min(height[l], height[r])","Start with the widest container: pointers at both ends","Moving the taller pointer inward can never help — always move the shorter one"],tags:["array","two-pointers","greedy"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`def max_area(height):
    pass
`,javascript:`function maxArea(height) {

}
`},testCode:{python:`${a}
_t(max_area([1,8,6,2,5,4,8,3,7]),49,'example 1')
_t(max_area([1,1]),1,'two lines')
_t(max_area([4,3,2,1,4]),16,'equal ends')
_t(max_area([1,2,1]),2,'small peak')
_t(max_area([2,3,4,5,18,17,6]),17,'tall middle pair')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(maxArea([1,8,6,2,5,4,8,3,7]),49,'example 1');
_t(maxArea([1,1]),1,'two lines');
_t(maxArea([4,3,2,1,4]),16,'equal ends');
_t(maxArea([1,2,1]),2,'small peak');
_t(maxArea([2,3,4,5,18,17,6]),17,'tall middle pair');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"trapping-rain-water",title:"Trapping Rain Water",difficulty:"Advanced",category:"Two Pointers",description:"Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining. Water trapped above each bar is bounded by the tallest bars to its left and to its right: water at index i equals max(0, min(maxLeft, maxRight) - height[i]).",examples:[{input:"height = [0,1,0,2,1,0,1,3,2,1,2,1]",output:"6",explanation:"The elevation map traps 6 units of rain water in the valleys between the bars of heights 2 and 3."},{input:"height = [4,2,0,3,2,5]",output:"9",explanation:"9 units collect between the walls of height 4 and 5."}],constraints:["n == height.length","1 <= n <= 2·10⁴","0 <= height[i] <= 10⁵"],hints:["Brute force computes maxLeft/maxRight per index — O(n²); precomputing both arrays makes it O(n) time, O(n) space","For O(1) space use two pointers with running leftMax and rightMax","Advance the side with the smaller max: the water level there is already decided by that smaller max"],tags:["array","two-pointers","stack","dynamic-programming"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`def trap(height):
    pass
`,javascript:`function trap(height) {

}
`},testCode:{python:`${a}
_t(trap([0,1,0,2,1,0,1,3,2,1,2,1]),6,'example 1')
_t(trap([4,2,0,3,2,5]),9,'example 2')
_t(trap([1,2,3]),0,'monotonic — traps nothing')
_t(trap([3]),0,'single bar')
_t(trap([5,4,1,2]),1,'shallow right wall')
_t(trap([2,0,2]),2,'simple valley')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(trap([0,1,0,2,1,0,1,3,2,1,2,1]),6,'example 1');
_t(trap([4,2,0,3,2,5]),9,'example 2');
_t(trap([1,2,3]),0,'monotonic — traps nothing');
_t(trap([3]),0,'single bar');
_t(trap([5,4,1,2]),1,'shallow right wall');
_t(trap([2,0,2]),2,'simple valley');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"move-zeroes",title:"Move Zeroes",difficulty:"Beginner",category:"Two Pointers",description:"Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements. You must do this in place without making a copy of the array, and return the modified array so the tests can compare it directly. Follow-up: minimize the total number of operations.",examples:[{input:"nums = [0,1,0,3,12]",output:"[1,3,12,0,0]",explanation:"The non-zero elements keep their order; both zeros move to the end."},{input:"nums = [0]",output:"[0]",explanation:"A single zero stays in place."}],constraints:["1 <= nums.length <= 10⁴","-2³¹ <= nums[i] <= 2³¹ - 1"],hints:["Use a slow pointer marking where the next non-zero element should land","Scan with a fast pointer; when it finds a non-zero, write it at the slow pointer and advance both","After all non-zeros are placed, fill the remaining tail with zeros (or swap as you go)"],tags:["array","two-pointers","in-place"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`def move_zeroes(nums):
    pass
`,javascript:`function moveZeroes(nums) {

}
`},testCode:{python:`${a}
_t(move_zeroes([0,1,0,3,12]),[1,3,12,0,0],'example 1')
_t(move_zeroes([0]),[0],'single zero')
_t(move_zeroes([1,2,3]),[1,2,3],'no zeros')
_t(move_zeroes([0,0,1]),[1,0,0],'leading zeros')
_t(move_zeroes([1,0,2,0,3]),[1,2,3,0,0],'interleaved zeros')
_t(move_zeroes([0,0,0]),[0,0,0],'all zeros')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(moveZeroes([0,1,0,3,12]),[1,3,12,0,0],'example 1');
_t(moveZeroes([0]),[0],'single zero');
_t(moveZeroes([1,2,3]),[1,2,3],'no zeros');
_t(moveZeroes([0,0,1]),[1,0,0],'leading zeros');
_t(moveZeroes([1,0,2,0,3]),[1,2,3,0,0],'interleaved zeros');
_t(moveZeroes([0,0,0]),[0,0,0],'all zeros');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"remove-duplicates-sorted",title:"Remove Duplicates from Sorted Array",difficulty:"Beginner",category:"Two Pointers",description:"Given an integer array nums sorted in non-decreasing order, remove the duplicates so that each unique element appears only once, keeping the relative order. To make the result simple to compare across languages, return the list of unique elements in order (the deduped prefix), rather than a count.",examples:[{input:"nums = [1,1,2]",output:"[1,2]",explanation:"The unique elements in order are 1 and 2."},{input:"nums = [0,0,1,1,1,2,2,3,3,4]",output:"[0,1,2,3,4]",explanation:"Each of the five distinct values appears once in the result."}],constraints:["1 <= nums.length <= 3·10⁴","-100 <= nums[i] <= 100","nums is sorted in non-decreasing order"],hints:["Because the array is sorted, duplicates are adjacent","Keep a write pointer for the next slot; only write a value when it differs from the previous kept value","The first element is always kept"],tags:["array","two-pointers"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`def remove_duplicates(nums):
    pass
`,javascript:`function removeDuplicates(nums) {

}
`},testCode:{python:`${a}
_t(remove_duplicates([1,1,2]),[1,2],'example 1')
_t(remove_duplicates([0,0,1,1,1,2,2,3,3,4]),[0,1,2,3,4],'example 2')
_t(remove_duplicates([1]),[1],'single element')
_t(remove_duplicates([1,2,3]),[1,2,3],'already unique')
_t(remove_duplicates([2,2,2,2]),[2],'all duplicates')
_t(remove_duplicates([-3,-3,-1,0,0]),[-3,-1,0],'negatives')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(removeDuplicates([1,1,2]),[1,2],'example 1');
_t(removeDuplicates([0,0,1,1,1,2,2,3,3,4]),[0,1,2,3,4],'example 2');
_t(removeDuplicates([1]),[1],'single element');
_t(removeDuplicates([1,2,3]),[1,2,3],'already unique');
_t(removeDuplicates([2,2,2,2]),[2],'all duplicates');
_t(removeDuplicates([-3,-3,-1,0,0]),[-3,-1,0],'negatives');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"sort-colors",title:"Sort Colors",difficulty:"Intermediate",category:"Two Pointers",description:"Given an array nums with n objects colored red, white, or blue, sort them in place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. We use the integers 0, 1, and 2 to represent the colors red, white, and blue respectively. You must solve this without using the library's sort function, and return the modified array so the tests can compare it directly. Follow-up: can you solve it in one pass with O(1) extra space?",examples:[{input:"nums = [2,0,2,1,1,0]",output:"[0,0,1,1,2,2]",explanation:"The colors are grouped 0s, then 1s, then 2s."},{input:"nums = [2,0,1]",output:"[0,1,2]",explanation:"A single pass groups the three colors."}],constraints:["n == nums.length","1 <= n <= 300","nums[i] is either 0, 1, or 2"],hints:["A counting sort over three buckets works but takes two passes","Dutch national flag: maintain pointers low, mid, and high","Scan with mid: swap 0s to the low region, 2s to the high region, and leave 1s in place"],tags:["array","two-pointers","sorting","dutch-national-flag"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`def sort_colors(nums):
    pass
`,javascript:`function sortColors(nums) {

}
`},testCode:{python:`${a}
_t(sort_colors([2,0,2,1,1,0]),[0,0,1,1,2,2],'example 1')
_t(sort_colors([2,0,1]),[0,1,2],'example 2')
_t(sort_colors([0]),[0],'single element')
_t(sort_colors([1,1,1]),[1,1,1],'all same')
_t(sort_colors([2,2,0,0,1,1]),[0,0,1,1,2,2],'reverse grouped')
_t(sort_colors([1,0,2,0]),[0,0,1,2],'mixed')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(sortColors([2,0,2,1,1,0]),[0,0,1,1,2,2],'example 1');
_t(sortColors([2,0,1]),[0,1,2],'example 2');
_t(sortColors([0]),[0],'single element');
_t(sortColors([1,1,1]),[1,1,1],'all same');
_t(sortColors([2,2,0,0,1,1]),[0,0,1,1,2,2],'reverse grouped');
_t(sortColors([1,0,2,0]),[0,0,1,2],'mixed');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"three-sum-closest",title:"3Sum Closest",difficulty:"Intermediate",category:"Two Pointers",description:"Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. Each input is generated such that exactly one solution (one closest sum) exists.",examples:[{input:"nums = [-1,2,1,-4], target = 1",output:"2",explanation:"The sum that is closest to the target is 2 (from -1 + 2 + 1 = 2)."},{input:"nums = [0,0,0], target = 1",output:"0",explanation:"The only triplet sums to 0, which is the closest possible."}],constraints:["3 <= nums.length <= 500","-1000 <= nums[i] <= 1000","-10⁴ <= target <= 10⁴","Exactly one closest sum exists"],hints:["Sort the array so you can move two pointers intelligently","Fix the first element, then run left/right pointers on the remainder","Track the sum with the smallest absolute distance to target; move the pointer that reduces the gap"],tags:["array","two-pointers","sorting"],timeComplexity:"O(n²)",spaceComplexity:"O(1)",starterCode:{python:`def three_sum_closest(nums, target):
    pass
`,javascript:`function threeSumClosest(nums, target) {

}
`},testCode:{python:`${a}
_t(three_sum_closest([-1,2,1,-4],1),2,'example 1')
_t(three_sum_closest([0,0,0],1),0,'all zeros')
_t(three_sum_closest([1,1,0],-100),2,'far below target')
_t(three_sum_closest([1,2,4,8,16,32,64,128],82),82,'exact match')
_t(three_sum_closest([-3,-2,-5,3,-4],-1),-2,'negatives')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(threeSumClosest([-1,2,1,-4],1),2,'example 1');
_t(threeSumClosest([0,0,0],1),0,'all zeros');
_t(threeSumClosest([1,1,0],-100),2,'far below target');
_t(threeSumClosest([1,2,4,8,16,32,64,128],82),82,'exact match');
_t(threeSumClosest([-3,-2,-5,3,-4],-1),-2,'negatives');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"longest-substring-no-repeat",title:"Longest Substring Without Repeating Characters",difficulty:"Intermediate",category:"Sliding Window",description:'Given a string s, find the length of the longest substring without duplicate characters. A substring is a contiguous non-empty sequence of characters within a string — note this is different from a subsequence: for "pwwkew" the answer is "wke" (length 3), not "pwke".',examples:[{input:'s = "abcabcbb"',output:"3",explanation:'The answer is "abc", with length 3.'},{input:'s = "bbbbb"',output:"1",explanation:'The answer is "b", with length 1.'},{input:'s = "pwwkew"',output:"3",explanation:'The answer is "wke". "pwke" is a subsequence, not a substring.'}],constraints:["0 <= s.length <= 5·10⁴","s consists of English letters, digits, symbols and spaces"],hints:["Maintain a window [left, right] containing no repeats","Keep a map from character to its latest index","When s[right] was already seen inside the window, jump left to one past its previous index"],tags:["string","sliding-window","hash-map"],timeComplexity:"O(n)",spaceComplexity:"O(min(n, charset))",starterCode:{python:`def length_of_longest_substring(s):
    pass
`,javascript:`function lengthOfLongestSubstring(s) {

}
`},testCode:{python:`${a}
_t(length_of_longest_substring('abcabcbb'),3,'example 1')
_t(length_of_longest_substring('bbbbb'),1,'all same char')
_t(length_of_longest_substring('pwwkew'),3,'example 3')
_t(length_of_longest_substring(''),0,'empty string')
_t(length_of_longest_substring('au'),2,'two distinct')
_t(length_of_longest_substring('dvdf'),3,'window left jump')
_t(length_of_longest_substring('abba'),2,'stale index trap')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(lengthOfLongestSubstring('abcabcbb'),3,'example 1');
_t(lengthOfLongestSubstring('bbbbb'),1,'all same char');
_t(lengthOfLongestSubstring('pwwkew'),3,'example 3');
_t(lengthOfLongestSubstring(''),0,'empty string');
_t(lengthOfLongestSubstring('au'),2,'two distinct');
_t(lengthOfLongestSubstring('dvdf'),3,'window left jump');
_t(lengthOfLongestSubstring('abba'),2,'stale index trap');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"sliding-window-maximum",title:"Sliding Window Maximum",difficulty:"Advanced",category:"Sliding Window",description:"You are given an array of integers nums, and there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return an array of the maximum element in each window. A solution that rescans each window costs O(n·k); the target is O(n) using a monotonic deque.",examples:[{input:"nums = [1,3,-1,-3,5,3,6,7], k = 3",output:"[3,3,5,5,6,7]",explanation:"Window [1,3,-1] → 3, [3,-1,-3] → 3, [-1,-3,5] → 5, [-3,5,3] → 5, [5,3,6] → 6, [3,6,7] → 7."},{input:"nums = [1], k = 1",output:"[1]"}],constraints:["1 <= nums.length <= 10⁵","-10⁴ <= nums[i] <= 10⁴","1 <= k <= nums.length"],hints:["Keep a deque of indices whose values are in decreasing order","Before pushing index i, pop indices whose values are <= nums[i] — they can never be a future maximum","Pop from the front when the front index falls out of the window; the front is always the current maximum"],tags:["array","sliding-window","monotonic-deque","heap"],timeComplexity:"O(n)",spaceComplexity:"O(k)",starterCode:{python:`from collections import deque

def max_sliding_window(nums, k):
    pass
`,javascript:`function maxSlidingWindow(nums, k) {

}
`},testCode:{python:`${a}
_t(max_sliding_window([1,3,-1,-3,5,3,6,7],3),[3,3,5,5,6,7],'example 1')
_t(max_sliding_window([1],1),[1],'single element')
_t(max_sliding_window([1,-1],1),[1,-1],'window of one')
_t(max_sliding_window([9,11],2),[11],'increasing pair')
_t(max_sliding_window([4,-2],2),[4],'decreasing pair')
_t(max_sliding_window([7,2,4],2),[7,4],'leading max expires')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(maxSlidingWindow([1,3,-1,-3,5,3,6,7],3),[3,3,5,5,6,7],'example 1');
_t(maxSlidingWindow([1],1),[1],'single element');
_t(maxSlidingWindow([1,-1],1),[1,-1],'window of one');
_t(maxSlidingWindow([9,11],2),[11],'increasing pair');
_t(maxSlidingWindow([4,-2],2),[4],'decreasing pair');
_t(maxSlidingWindow([7,2,4],2),[7,4],'leading max expires');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"minimum-window-substring",title:"Minimum Window Substring",difficulty:"Expert",category:"Sliding Window",description:'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "". The test cases are generated such that the answer is unique. Follow-up: could you find an algorithm that runs in O(m + n) time?',examples:[{input:'s = "ADOBECODEBANC", t = "ABC"',output:'"BANC"',explanation:'The minimum window substring "BANC" includes the characters A, B, and C from string t.'},{input:'s = "a", t = "a"',output:'"a"',explanation:"The entire string s is the minimum window."},{input:'s = "a", t = "aa"',output:'""',explanation:'Both occurrences of "a" from t must be in the window; since s has only one, return the empty string.'}],constraints:["m == s.length, n == t.length","1 <= m, n <= 10⁵","s and t consist of uppercase and lowercase English letters"],hints:["Count the required frequency of each character of t","Expand the right edge until the window covers all requirements, then shrink from the left while it stays valid","Track how many distinct characters are currently fully satisfied to make validity checks O(1)"],tags:["string","sliding-window","hash-map"],timeComplexity:"O(m + n)",spaceComplexity:"O(charset)",starterCode:{python:`from collections import Counter

def min_window(s, t):
    pass
`,javascript:`function minWindow(s, t) {

}
`},testCode:{python:`${a}
_t(min_window('ADOBECODEBANC','ABC'),'BANC','example 1')
_t(min_window('a','a'),'a','single char match')
_t(min_window('a','aa'),'','not enough chars')
_t(min_window('ab','b'),'b','suffix window')
_t(min_window('bba','ab'),'ba','duplicates in s')
_t(min_window('aaflslflsldkalskaaa','aaa'),'aaa','repeated requirement')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(minWindow('ADOBECODEBANC','ABC'),'BANC','example 1');
_t(minWindow('a','a'),'a','single char match');
_t(minWindow('a','aa'),'','not enough chars');
_t(minWindow('ab','b'),'b','suffix window');
_t(minWindow('bba','ab'),'ba','duplicates in s');
_t(minWindow('aaflslflsldkalskaaa','aaa'),'aaa','repeated requirement');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"find-all-anagrams",title:"Find All Anagrams in a String",difficulty:"Intermediate",category:"Sliding Window",description:"Given two strings s and p, return an array of all the start indices of p's anagrams in s. The indices must be returned in ascending order. An anagram is a string formed by rearranging the letters of another, using all the original letters exactly once. A match is a substring of s of length p.length whose character counts equal those of p.",examples:[{input:'s = "cbaebabacd", p = "abc"',output:"[0,6]",explanation:'The substring starting at index 0 is "cba" (an anagram of "abc") and at index 6 is "bac".'},{input:'s = "abab", p = "ab"',output:"[0,1,2]",explanation:'"ab", "ba" and "ab" starting at indices 0, 1 and 2 are all anagrams of "ab".'}],constraints:["1 <= s.length, p.length <= 3·10⁴","s and p consist of lowercase English letters"],hints:["Slide a window of length p.length over s","Maintain character counts for the window and compare against counts of p","Update counts incrementally as the window advances instead of recounting each time"],tags:["string","sliding-window","hash-map"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`def find_anagrams(s, p):
    pass
`,javascript:`function findAnagrams(s, p) {

}
`},testCode:{python:`${a}
_t(find_anagrams('cbaebabacd','abc'),[0,6],'example 1')
_t(find_anagrams('abab','ab'),[0,1,2],'example 2')
_t(find_anagrams('aa','bb'),[],'no anagrams')
_t(find_anagrams('a','ab'),[],'p longer than s')
_t(find_anagrams('aaaa','a'),[0,1,2,3],'single char p')
_t(find_anagrams('baa','aa'),[1],'one match')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(findAnagrams('cbaebabacd','abc'),[0,6],'example 1');
_t(findAnagrams('abab','ab'),[0,1,2],'example 2');
_t(findAnagrams('aa','bb'),[],'no anagrams');
_t(findAnagrams('a','ab'),[],'p longer than s');
_t(findAnagrams('aaaa','a'),[0,1,2,3],'single char p');
_t(findAnagrams('baa','aa'),[1],'one match');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"longest-repeating-replacement",title:"Longest Repeating Character Replacement",difficulty:"Intermediate",category:"Sliding Window",description:"You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times. Return the length of the longest substring containing the same letter you can get after performing the above operations.",examples:[{input:'s = "ABAB", k = 2',output:"4",explanation:"Replace the two A's with two B's or vice versa, making the whole string the same letter."},{input:'s = "AABABBA", k = 1',output:"4",explanation:'Replace the one A in the middle to get "AABBBBA"; the substring "BBBB" has length 4.'}],constraints:["1 <= s.length <= 10⁵","s consists of only uppercase English letters","0 <= k <= s.length"],hints:["A window is valid when (window length − count of its most frequent char) <= k","Expand the right edge, tracking the max frequency of any single char in the window","When the window becomes invalid, shrink from the left; the answer is the largest valid window seen"],tags:["string","sliding-window","hash-map"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`def character_replacement(s, k):
    pass
`,javascript:`function characterReplacement(s, k) {

}
`},testCode:{python:`${a}
_t(character_replacement('ABAB',2),4,'example 1')
_t(character_replacement('AABABBA',1),4,'example 2')
_t(character_replacement('A',0),1,'single char no ops')
_t(character_replacement('AAAA',0),4,'all same')
_t(character_replacement('ABCDE',1),2,'distinct chars')
_t(character_replacement('AAAB',0),3,'no replacements allowed')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(characterReplacement('ABAB',2),4,'example 1');
_t(characterReplacement('AABABBA',1),4,'example 2');
_t(characterReplacement('A',0),1,'single char no ops');
_t(characterReplacement('AAAA',0),4,'all same');
_t(characterReplacement('ABCDE',1),2,'distinct chars');
_t(characterReplacement('AAAB',0),3,'no replacements allowed');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"max-consecutive-ones-iii",title:"Max Consecutive Ones III",difficulty:"Intermediate",category:"Sliding Window",description:"Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's to 1's.",examples:[{input:"nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2",output:"6",explanation:"Flip the two 0's at indices 3 and 4 to get [1,1,1,1,1,1,1,1,1,1,0]; the longest run of 1s is 6 (bolded subarray [1,1,1,1,1,1])."},{input:"nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3",output:"10",explanation:"Flipping three 0's yields a run of 10 consecutive 1s."}],constraints:["1 <= nums.length <= 10⁵","nums[i] is either 0 or 1","0 <= k <= nums.length"],hints:["Find the longest window containing at most k zeros","Expand the right edge and count zeros inside the window","When the zero count exceeds k, shrink from the left until it is valid again"],tags:["array","sliding-window","binary"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`def longest_ones(nums, k):
    pass
`,javascript:`function longestOnes(nums, k) {

}
`},testCode:{python:`${a}
_t(longest_ones([1,1,1,0,0,0,1,1,1,1,0],2),6,'example 1')
_t(longest_ones([0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1],3),10,'example 2')
_t(longest_ones([0,0,0],0),0,'no flips all zeros')
_t(longest_ones([1,1,1],0),3,'all ones')
_t(longest_ones([0,0,0],3),3,'flip everything')
_t(longest_ones([1,0,1,0,1],1),3,'single flip')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(longestOnes([1,1,1,0,0,0,1,1,1,1,0],2),6,'example 1');
_t(longestOnes([0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1],3),10,'example 2');
_t(longestOnes([0,0,0],0),0,'no flips all zeros');
_t(longestOnes([1,1,1],0),3,'all ones');
_t(longestOnes([0,0,0],3),3,'flip everything');
_t(longestOnes([1,0,1,0,1],1),3,'single flip');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"group-anagrams",title:"Group Anagrams",difficulty:"Intermediate",category:"Hash Tables",description:"Given an array of strings strs, group the anagrams together. You can return the answer in any order (the tests normalize ordering). An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.",examples:[{input:'strs = ["eat","tea","tan","ate","nat","bat"]',output:'[["bat"],["nat","tan"],["ate","eat","tea"]]',explanation:'"eat", "tea" and "ate" are anagrams of each other; so are "tan" and "nat"; "bat" stands alone.'},{input:'strs = [""]',output:'[[""]]'},{input:'strs = ["a"]',output:'[["a"]]'}],constraints:["1 <= strs.length <= 10⁴","0 <= strs[i].length <= 100","strs[i] consists of lowercase English letters"],hints:["Two strings are anagrams iff their sorted characters are equal","Use the sorted string (or a 26-count signature) as a hash-map key","Sorting each key is O(k log k); a character-count key makes grouping O(n·k)"],tags:["string","hash-map","sorting"],timeComplexity:"O(n·k log k)",spaceComplexity:"O(n·k)",starterCode:{python:`from collections import defaultdict

def group_anagrams(strs):
    pass
`,javascript:`function groupAnagrams(strs) {

}
`},testCode:{python:`_norm=lambda a:sorted(sorted(g) for g in a)
${a}
_t(_norm(group_anagrams(['eat','tea','tan','ate','nat','bat'])),[['ate','eat','tea'],['bat'],['nat','tan']],'example 1')
_t(_norm(group_anagrams([''])),[['']],'empty string')
_t(_norm(group_anagrams(['a'])),[['a']],'single string')
_t(_norm(group_anagrams(['ab','ba','ab'])),[['ab','ab','ba']],'duplicate words')
_t(_norm(group_anagrams(['abc','def'])),[['abc'],['def']],'no anagrams')
print(f'{_p}/{_n} tests passed')`,javascript:`const _norm=a=>a.map(g=>[...g].sort()).sort((x,y)=>JSON.stringify(x)<JSON.stringify(y)?-1:1);
${o}
_t(_norm(groupAnagrams(['eat','tea','tan','ate','nat','bat'])),[['ate','eat','tea'],['bat'],['nat','tan']],'example 1');
_t(_norm(groupAnagrams([''])),[['']],'empty string');
_t(_norm(groupAnagrams(['a'])),[['a']],'single string');
_t(_norm(groupAnagrams(['ab','ba','ab'])),[['ab','ab','ba']],'duplicate words');
_t(_norm(groupAnagrams(['abc','def'])),[['abc'],['def']],'no anagrams');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"top-k-frequent",title:"Top K Frequent Elements",difficulty:"Intermediate",category:"Hash Tables",description:"Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order (the tests sort the result before comparing). It is guaranteed that the answer is unique — no two of the top k candidates tie in frequency at the boundary. Follow-up: your algorithm's time complexity must be better than O(n log n), where n is the array's size.",examples:[{input:"nums = [1,1,1,2,2,3], k = 2",output:"[1,2]",explanation:"1 appears 3 times and 2 appears twice — the two most frequent elements."},{input:"nums = [1], k = 1",output:"[1]"}],constraints:["1 <= nums.length <= 10⁵","-10⁴ <= nums[i] <= 10⁴","k is in the range [1, number of distinct elements]","The answer is guaranteed to be unique"],hints:["Count frequencies with a hash map first","A heap of size k gives O(n log k)","Bucket sort by frequency (index = count) achieves O(n): walk buckets from highest count down"],tags:["array","hash-map","heap","bucket-sort"],timeComplexity:"O(n)",spaceComplexity:"O(n)",starterCode:{python:`from collections import Counter

def top_k_frequent(nums, k):
    pass
`,javascript:`function topKFrequent(nums, k) {

}
`},testCode:{python:`${a}
_t(sorted(top_k_frequent([1,1,1,2,2,3],2)),[1,2],'example 1')
_t(sorted(top_k_frequent([1],1)),[1],'single element')
_t(sorted(top_k_frequent([4,4,4,5,5,6],1)),[4],'top one')
_t(sorted(top_k_frequent([1,2],2)),[1,2],'all elements')
_t(sorted(top_k_frequent([-1,-1,2,2,2],2)),[-1,2],'negatives')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(topKFrequent([1,1,1,2,2,3],2).sort((a,b)=>a-b),[1,2],'example 1');
_t(topKFrequent([1],1).sort((a,b)=>a-b),[1],'single element');
_t(topKFrequent([4,4,4,5,5,6],1).sort((a,b)=>a-b),[4],'top one');
_t(topKFrequent([1,2],2).sort((a,b)=>a-b),[1,2],'all elements');
_t(topKFrequent([-1,-1,2,2,2],2).sort((a,b)=>a-b),[-1,2],'negatives');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"longest-consecutive-sequence",title:"Longest Consecutive Sequence",difficulty:"Intermediate",category:"Hash Tables",description:"Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence (values that can be arranged as v, v+1, v+2, ... regardless of their positions in the array). You must write an algorithm that runs in O(n) time — sorting first would be O(n log n).",examples:[{input:"nums = [100,4,200,1,3,2]",output:"4",explanation:"The longest consecutive sequence is [1, 2, 3, 4], length 4."},{input:"nums = [0,3,7,2,5,8,4,6,0,1]",output:"9",explanation:"The values 0 through 8 form a run of length 9; the duplicate 0 does not extend it."}],constraints:["0 <= nums.length <= 10⁵","-10⁹ <= nums[i] <= 10⁹","Must run in O(n) time"],hints:["Put everything in a hash set for O(1) membership checks","Only start counting from sequence starts: numbers v where v-1 is not in the set","Each value is then visited at most twice, giving O(n) overall"],tags:["array","hash-set","union-find"],timeComplexity:"O(n)",spaceComplexity:"O(n)",starterCode:{python:`def longest_consecutive(nums):
    pass
`,javascript:`function longestConsecutive(nums) {

}
`},testCode:{python:`${a}
_t(longest_consecutive([100,4,200,1,3,2]),4,'example 1')
_t(longest_consecutive([0,3,7,2,5,8,4,6,0,1]),9,'example 2')
_t(longest_consecutive([]),0,'empty array')
_t(longest_consecutive([1,2,0,1]),3,'duplicates')
_t(longest_consecutive([5]),1,'single element')
_t(longest_consecutive([-2,-1,0,1]),4,'negative run')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(longestConsecutive([100,4,200,1,3,2]),4,'example 1');
_t(longestConsecutive([0,3,7,2,5,8,4,6,0,1]),9,'example 2');
_t(longestConsecutive([]),0,'empty array');
_t(longestConsecutive([1,2,0,1]),3,'duplicates');
_t(longestConsecutive([5]),1,'single element');
_t(longestConsecutive([-2,-1,0,1]),4,'negative run');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"valid-anagram",title:"Valid Anagram",difficulty:"Beginner",category:"Hash Tables",description:"Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram is a word formed by rearranging the letters of another, using all the original letters exactly once. Strings of different lengths can never be anagrams.",examples:[{input:'s = "anagram", t = "nagaram"',output:"true",explanation:"Both strings use the same letters with the same frequencies."},{input:'s = "rat", t = "car"',output:"false",explanation:'"rat" and "car" do not contain the same letters.'}],constraints:["1 <= s.length, t.length <= 5·10⁴","s and t consist of lowercase English letters"],hints:["If the lengths differ, they cannot be anagrams","Count the frequency of each character in s, then decrement for each character in t","They are anagrams iff every count returns to zero"],tags:["string","hash-map","sorting"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`def is_anagram(s, t):
    pass
`,javascript:`function isAnagram(s, t) {

}
`},testCode:{python:`${a}
_t(is_anagram('anagram','nagaram'),True,'example 1')
_t(is_anagram('rat','car'),False,'example 2')
_t(is_anagram('a','a'),True,'single char match')
_t(is_anagram('ab','a'),False,'different lengths')
_t(is_anagram('aacc','ccac'),False,'same length different counts')
_t(is_anagram('listen','silent'),True,'classic anagram')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(isAnagram('anagram','nagaram'),true,'example 1');
_t(isAnagram('rat','car'),false,'example 2');
_t(isAnagram('a','a'),true,'single char match');
_t(isAnagram('ab','a'),false,'different lengths');
_t(isAnagram('aacc','ccac'),false,'same length different counts');
_t(isAnagram('listen','silent'),true,'classic anagram');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"subarray-sum-equals-k",title:"Subarray Sum Equals K",difficulty:"Intermediate",category:"Hash Tables",description:"Given an array of integers nums and an integer k, return the total number of contiguous subarrays whose elements sum to k. The array may contain negative numbers and zeros, so a sliding window does not apply; use prefix sums with a hash map of counts.",examples:[{input:"nums = [1,1,1], k = 2",output:"2",explanation:"The subarrays [1,1] starting at index 0 and at index 1 both sum to 2."},{input:"nums = [1,2,3], k = 3",output:"2",explanation:"[1,2] and [3] both sum to 3."}],constraints:["1 <= nums.length <= 2·10⁴","-1000 <= nums[i] <= 1000","-10⁷ <= k <= 10⁷"],hints:["A subarray sum equals (prefix sum at j) − (prefix sum at i)","Count how many earlier prefix sums equal currentPrefix − k","Initialize the map with prefix sum 0 seen once to count subarrays starting at index 0"],tags:["array","hash-map","prefix-sum"],timeComplexity:"O(n)",spaceComplexity:"O(n)",starterCode:{python:`from collections import defaultdict

def subarray_sum(nums, k):
    pass
`,javascript:`function subarraySum(nums, k) {

}
`},testCode:{python:`${a}
_t(subarray_sum([1,1,1],2),2,'example 1')
_t(subarray_sum([1,2,3],3),2,'example 2')
_t(subarray_sum([1,-1,0],0),3,'negatives and zero')
_t(subarray_sum([3,4,7,2,-3,1,4,2],7),4,'mixed signs')
_t(subarray_sum([0,0,0],0),6,'all zeros')
_t(subarray_sum([1],0),0,'no subarray sums to k')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(subarraySum([1,1,1],2),2,'example 1');
_t(subarraySum([1,2,3],3),2,'example 2');
_t(subarraySum([1,-1,0],0),3,'negatives and zero');
_t(subarraySum([3,4,7,2,-3,1,4,2],7),4,'mixed signs');
_t(subarraySum([0,0,0],0),6,'all zeros');
_t(subarraySum([1],0),0,'no subarray sums to k');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"four-sum-ii",title:"4Sum II",difficulty:"Intermediate",category:"Hash Tables",description:"Given four integer arrays nums1, nums2, nums3, and nums4 all of length n, return the number of tuples (i, j, k, l) such that nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0. Tuples are counted by index combination, so distinct index tuples that yield the same values are counted separately.",examples:[{input:"nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]",output:"2",explanation:"The two tuples are (0,0,0,1) → 1 + (-2) + (-1) + 2 = 0 and (1,1,0,0) → 2 + (-1) + (-1) + 0 = 0."},{input:"nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]",output:"1",explanation:"The only tuple (0,0,0,0) sums to 0."}],constraints:["n == nums1.length == nums2.length == nums3.length == nums4.length","1 <= n <= 200","-2²⁸ <= nums1[i], nums2[i], nums3[i], nums4[i] <= 2²⁸"],hints:["Brute force over all four arrays is O(n⁴) — split the problem in half","Count every pairwise sum of nums1 and nums2 in a hash map","For each pairwise sum of nums3 and nums4, add the count of its negation from the map"],tags:["array","hash-map"],timeComplexity:"O(n²)",spaceComplexity:"O(n²)",starterCode:{python:`from collections import defaultdict

def four_sum_count(nums1, nums2, nums3, nums4):
    pass
`,javascript:`function fourSumCount(nums1, nums2, nums3, nums4) {

}
`},testCode:{python:`${a}
_t(four_sum_count([1,2],[-2,-1],[-1,2],[0,2]),2,'example 1')
_t(four_sum_count([0],[0],[0],[0]),1,'example 2')
_t(four_sum_count([1],[1],[1],[1]),0,'no tuple sums to zero')
_t(four_sum_count([-1,1],[-1,1],[-1,1],[-1,1]),6,'symmetric arrays')
_t(four_sum_count([0,0],[0,0],[0,0],[0,0]),16,'all zeros')
_t(four_sum_count([1,2,3],[-1,-2,-3],[0,0,0],[0,0,0]),27,'many combinations')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(fourSumCount([1,2],[-2,-1],[-1,2],[0,2]),2,'example 1');
_t(fourSumCount([0],[0],[0],[0]),1,'example 2');
_t(fourSumCount([1],[1],[1],[1]),0,'no tuple sums to zero');
_t(fourSumCount([-1,1],[-1,1],[-1,1],[-1,1]),6,'symmetric arrays');
_t(fourSumCount([0,0],[0,0],[0,0],[0,0]),16,'all zeros');
_t(fourSumCount([1,2,3],[-1,-2,-3],[0,0,0],[0,0,0]),27,'many combinations');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"valid-parentheses",title:"Valid Parentheses",difficulty:"Beginner",category:"Stacks & Queues",description:"Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: (1) open brackets must be closed by the same type of brackets, (2) open brackets must be closed in the correct order, and (3) every close bracket has a corresponding open bracket of the same type.",examples:[{input:'s = "()"',output:"true"},{input:'s = "()[]{}"',output:"true"},{input:'s = "(]"',output:"false",explanation:'The opening "(" is closed by "]", a different bracket type.'},{input:'s = "([)]"',output:"false",explanation:"Brackets close out of order."}],constraints:["1 <= s.length <= 10⁴","s consists of parentheses only: ()[]{}"],hints:["Push opening brackets onto a stack","On a closing bracket, the stack top must be the matching opener — pop it; otherwise the string is invalid","The string is valid only if the stack is empty at the end"],tags:["string","stack"],timeComplexity:"O(n)",spaceComplexity:"O(n)",starterCode:{python:`def is_valid(s):
    pass
`,javascript:`function isValid(s) {

}
`},testCode:{python:`${a}
_t(is_valid('()'),True,'simple pair')
_t(is_valid('()[]{}'),True,'three pairs')
_t(is_valid('(]'),False,'wrong type')
_t(is_valid('([)]'),False,'wrong order')
_t(is_valid('{[]}'),True,'nested')
_t(is_valid('('),False,'unclosed opener')
_t(is_valid(']'),False,'closer without opener')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(isValid('()'),true,'simple pair');
_t(isValid('()[]{}'),true,'three pairs');
_t(isValid('(]'),false,'wrong type');
_t(isValid('([)]'),false,'wrong order');
_t(isValid('{[]}'),true,'nested');
_t(isValid('('),false,'unclosed opener');
_t(isValid(']'),false,'closer without opener');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"daily-temperatures",title:"Daily Temperatures",difficulty:"Intermediate",category:"Stacks & Queues",description:"Given an array of integers temperatures representing the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the i-th day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead. A naive scan for each day is O(n²); a monotonic stack solves it in O(n).",examples:[{input:"temperatures = [73,74,75,71,69,72,76,73]",output:"[1,1,4,2,1,1,0,0]",explanation:"Day 0 (73°) waits 1 day for 74°; day 2 (75°) waits 4 days for 76°; the last day has no warmer future day."},{input:"temperatures = [30,40,50,60]",output:"[1,1,1,0]"}],constraints:["1 <= temperatures.length <= 10⁵","30 <= temperatures[i] <= 100"],hints:["Keep a stack of indices whose temperatures are strictly decreasing","When a new temperature is warmer than the stack top, pop and record the index distance","Each index is pushed and popped at most once → O(n) total"],tags:["array","stack","monotonic-stack"],timeComplexity:"O(n)",spaceComplexity:"O(n)",starterCode:{python:`def daily_temperatures(temperatures):
    pass
`,javascript:`function dailyTemperatures(temperatures) {

}
`},testCode:{python:`${a}
_t(daily_temperatures([73,74,75,71,69,72,76,73]),[1,1,4,2,1,1,0,0],'example 1')
_t(daily_temperatures([30,40,50,60]),[1,1,1,0],'increasing')
_t(daily_temperatures([90,60,30]),[0,0,0],'decreasing')
_t(daily_temperatures([50]),[0],'single day')
_t(daily_temperatures([70,70,75]),[2,1,0],'equal temps wait')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(dailyTemperatures([73,74,75,71,69,72,76,73]),[1,1,4,2,1,1,0,0],'example 1');
_t(dailyTemperatures([30,40,50,60]),[1,1,1,0],'increasing');
_t(dailyTemperatures([90,60,30]),[0,0,0],'decreasing');
_t(dailyTemperatures([50]),[0],'single day');
_t(dailyTemperatures([70,70,75]),[2,1,0],'equal temps wait');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"largest-rectangle-histogram",title:"Largest Rectangle in Histogram",difficulty:"Expert",category:"Stacks & Queues",description:"Given an array of integers heights representing the histogram's bar heights where the width of each bar is 1, return the area of the largest rectangle in the histogram. For each bar, the widest rectangle using that bar's full height extends to the nearest shorter bar on each side — a monotonic stack finds these boundaries for all bars in one pass.",examples:[{input:"heights = [2,1,5,6,2,3]",output:"10",explanation:"The largest rectangle has height 5 and spans the bars [5,6], area = 5 × 2 = 10."},{input:"heights = [2,4]",output:"4",explanation:"Either the bar of height 4 alone (area 4) or both bars at height 2 (area 4)."}],constraints:["1 <= heights.length <= 10⁵","0 <= heights[i] <= 10⁴"],hints:["Maintain a stack of indices with non-decreasing heights","When the current bar is shorter than the stack top, pop: the popped bar's rectangle ends here and starts after the new stack top","Append a sentinel height 0 at the end to flush the stack"],tags:["array","stack","monotonic-stack"],timeComplexity:"O(n)",spaceComplexity:"O(n)",starterCode:{python:`def largest_rectangle_area(heights):
    pass
`,javascript:`function largestRectangleArea(heights) {

}
`},testCode:{python:`${a}
_t(largest_rectangle_area([2,1,5,6,2,3]),10,'example 1')
_t(largest_rectangle_area([2,4]),4,'two bars')
_t(largest_rectangle_area([1]),1,'single bar')
_t(largest_rectangle_area([2,2,2]),6,'flat histogram')
_t(largest_rectangle_area([5,4,1,2]),8,'descending then rise')
_t(largest_rectangle_area([0,9]),9,'zero-height bar')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(largestRectangleArea([2,1,5,6,2,3]),10,'example 1');
_t(largestRectangleArea([2,4]),4,'two bars');
_t(largestRectangleArea([1]),1,'single bar');
_t(largestRectangleArea([2,2,2]),6,'flat histogram');
_t(largestRectangleArea([5,4,1,2]),8,'descending then rise');
_t(largestRectangleArea([0,9]),9,'zero-height bar');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"evaluate-rpn",title:"Evaluate Reverse Polish Notation",difficulty:"Intermediate",category:"Stacks & Queues",description:'You are given an array of strings tokens that represents an arithmetic expression in Reverse Polish Notation. Evaluate the expression and return an integer that represents its value. The valid operators are "+", "-", "*", and "/". Each operand may be an integer or another expression. Division between two integers always truncates toward zero (so -7 / 2 = -3 and 10 / -3 = -3, not toward negative infinity). There will be no division by zero. The expression is always valid, and every intermediate result and the final answer fit in a signed 32-bit integer.',examples:[{input:'tokens = ["2","1","+","3","*"]',output:"9",explanation:"((2 + 1) * 3) = 9."},{input:'tokens = ["4","13","5","/","+"]',output:"6",explanation:"(4 + (13 / 5)) = (4 + 2) = 6."},{input:'tokens = ["10","-3","/"]',output:"-3",explanation:"10 / -3 = -3.33..., which truncates toward zero to -3."}],constraints:["1 <= tokens.length <= 10⁴",'tokens[i] is either an operator: "+", "-", "*", "/", or an integer in the range [-200, 200]',"Division truncates toward zero","No division by zero"],hints:["Push operands onto a stack; on an operator, pop the top two and apply it",'Order matters for "-" and "/": the second-popped value is the left operand',"Use truncation toward zero, not floor division — in Python prefer int(a / b) and in JS use Math.trunc(a / b)"],tags:["array","math","stack"],timeComplexity:"O(n)",spaceComplexity:"O(n)",starterCode:{python:`def eval_rpn(tokens):
    pass
`,javascript:`function evalRPN(tokens) {

}
`},testCode:{python:`${a}
_t(eval_rpn(['2','1','+','3','*']),9,'example 1')
_t(eval_rpn(['4','13','5','/','+']),6,'example 2')
_t(eval_rpn(['10','-3','/']),-3,'negative division truncates toward zero')
_t(eval_rpn(['7','2','/']),3,'positive truncation')
_t(eval_rpn(['-7','2','/']),-3,'negative numerator truncates toward zero')
_t(eval_rpn(['5']),5,'single operand')
_t(eval_rpn(['10','6','9','3','+','-11','*','/','*','17','+','5','+']),22,'complex expression')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(evalRPN(['2','1','+','3','*']),9,'example 1');
_t(evalRPN(['4','13','5','/','+']),6,'example 2');
_t(evalRPN(['10','-3','/']),-3,'negative division truncates toward zero');
_t(evalRPN(['7','2','/']),3,'positive truncation');
_t(evalRPN(['-7','2','/']),-3,'negative numerator truncates toward zero');
_t(evalRPN(['5']),5,'single operand');
_t(evalRPN(['10','6','9','3','+','-11','*','/','*','17','+','5','+']),22,'complex expression');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"decode-string",title:"Decode String",difficulty:"Intermediate",category:"Stacks & Queues",description:'Given an encoded string, return its decoded string. The encoding rule is k[encoded_string], where the encoded_string inside the square brackets is repeated exactly k times. You may assume that the input string is always valid: there are no extra white spaces, the square brackets are well-formed, and so on. Furthermore, you may assume that the original data does not contain any digits and that digits are only used to indicate the repeat count k. Encodings may be nested, e.g. 3[a2[c]] decodes to "accaccacc".',examples:[{input:'s = "3[a]2[bc]"',output:'"aaabcbc"'},{input:'s = "3[a2[c]]"',output:'"accaccacc"',explanation:'The inner 2[c] expands to "cc", then a+"cc" repeated 3 times.'},{input:'s = "2[abc]3[cd]ef"',output:'"abcabccdcdcdef"'}],constraints:["1 <= s.length <= 30",'s consists of lowercase English letters, digits, and square brackets "[]"',"s is guaranteed to be a valid input","All the integers in s are in the range [1, 300]"],hints:["Use a stack to remember the string built so far and the repeat count when entering a bracket",'On "[" push the current string and the parsed number, then reset the current string','On "]" pop the count and the previous string, and append current*count to it'],tags:["string","stack","recursion"],timeComplexity:"O(n·k)",spaceComplexity:"O(n·k)",starterCode:{python:`def decode_string(s):
    pass
`,javascript:`function decodeString(s) {

}
`},testCode:{python:`${a}
_t(decode_string('3[a]2[bc]'),'aaabcbc','example 1')
_t(decode_string('3[a2[c]]'),'accaccacc','nested')
_t(decode_string('2[abc]3[cd]ef'),'abcabccdcdcdef','multiple groups')
_t(decode_string('abc'),'abc','no encoding')
_t(decode_string('10[a]'),'aaaaaaaaaa','multi-digit count')
_t(decode_string('2[2[b]c]'),'bbcbbc','nested with suffix')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(decodeString('3[a]2[bc]'),'aaabcbc','example 1');
_t(decodeString('3[a2[c]]'),'accaccacc','nested');
_t(decodeString('2[abc]3[cd]ef'),'abcabccdcdcdef','multiple groups');
_t(decodeString('abc'),'abc','no encoding');
_t(decodeString('10[a]'),'aaaaaaaaaa','multi-digit count');
_t(decodeString('2[2[b]c]'),'bbcbbc','nested with suffix');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"longest-valid-parentheses",title:"Longest Valid Parentheses",difficulty:"Expert",category:"Stacks & Queues",description:'Given a string s containing just the characters "(" and ")", return the length of the longest valid (well-formed) parentheses substring. A valid substring is one in which every opening bracket has a matching closing bracket in the correct order and vice versa. The substring must be contiguous.',examples:[{input:'s = "(()"',output:"2",explanation:'The longest valid substring is "()", whose length is 2.'},{input:'s = ")()())"',output:"4",explanation:'The longest valid substring is "()()", whose length is 4.'},{input:'s = ""',output:"0"}],constraints:["0 <= s.length <= 3·10⁴",'s[i] is "(" or ")"'],hints:['A stack of indices works: seed it with -1 as a base; push indices of "("','On ")" pop; if the stack becomes empty push the current index as a new base, otherwise the length is current index minus the new stack top',"An O(1)-space alternative counts opens and closes left-to-right and again right-to-left"],tags:["string","stack","dynamic-programming"],timeComplexity:"O(n)",spaceComplexity:"O(n)",starterCode:{python:`def longest_valid_parentheses(s):
    pass
`,javascript:`function longestValidParentheses(s) {

}
`},testCode:{python:`${a}
_t(longest_valid_parentheses('(()'),2,'example 1')
_t(longest_valid_parentheses(')()())'),4,'example 2')
_t(longest_valid_parentheses(''),0,'empty string')
_t(longest_valid_parentheses('()(()'),2,'reset in middle')
_t(longest_valid_parentheses('()(())'),6,'fully matched')
_t(longest_valid_parentheses('((((('),0,'all opens')
_t(longest_valid_parentheses(')))))'),0,'all closes')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(longestValidParentheses('(()'),2,'example 1');
_t(longestValidParentheses(')()())'),4,'example 2');
_t(longestValidParentheses(''),0,'empty string');
_t(longestValidParentheses('()(()'),2,'reset in middle');
_t(longestValidParentheses('()(())'),6,'fully matched');
_t(longestValidParentheses('((((('),0,'all opens');
_t(longestValidParentheses(')))))'),0,'all closes');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"reverse-linked-list",title:"Reverse Linked List",difficulty:"Beginner",category:"Linked Lists",description:"Given the head of a singly linked list, reverse the list, and return the new head. The ListNode class is provided by the runner. Follow-up: a linked list can be reversed either iteratively or recursively — could you implement both?",examples:[{input:"head = [1,2,3,4,5]",output:"[5,4,3,2,1]"},{input:"head = [1,2]",output:"[2,1]"},{input:"head = []",output:"[]"}],constraints:["The number of nodes in the list is in the range [0, 5000]","-5000 <= Node.val <= 5000"],hints:["Iterate with three pointers: prev, cur, next","At each step point cur.next back to prev, then advance all three","When cur becomes null, prev is the new head"],tags:["linked-list","recursion"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`${p}
def reverse_list(head):
    pass
`,javascript:`${g}
function reverseList(head) {

}
`},testCode:{python:`${l}${a}
_t(_to_list(reverse_list(_build([1,2,3,4,5]))),[5,4,3,2,1],'five nodes')
_t(_to_list(reverse_list(_build([1,2]))),[2,1],'two nodes')
_t(_to_list(reverse_list(_build([]))),[],'empty list')
_t(_to_list(reverse_list(_build([7]))),[7],'single node')
print(f'{_p}/{_n} tests passed')`,javascript:`${c}${o}
_t(_toList(reverseList(_build([1,2,3,4,5]))),[5,4,3,2,1],'five nodes');
_t(_toList(reverseList(_build([1,2]))),[2,1],'two nodes');
_t(_toList(reverseList(_build([]))),[],'empty list');
_t(_toList(reverseList(_build([7]))),[7],'single node');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"linked-list-cycle",title:"Linked List Cycle",difficulty:"Beginner",category:"Linked Lists",description:"Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Return true if there is a cycle in the linked list, otherwise return false. Follow-up: can you solve it using O(1) memory (Floyd's tortoise-and-hare)?",examples:[{input:"head = [3,2,0,-4], tail connects to node index 1",output:"true",explanation:"The tail's next pointer loops back to the second node."},{input:"head = [1,2], no cycle",output:"false"},{input:"head = [1], no cycle",output:"false"}],constraints:["The number of nodes in the list is in the range [0, 10⁴]","-10⁵ <= Node.val <= 10⁵","Follow-up: O(1) space"],hints:["A visited-set works but costs O(n) space","Floyd's algorithm: a slow pointer moves 1 step, a fast pointer moves 2","If they ever meet, there is a cycle; if fast reaches null, there is none"],tags:["linked-list","two-pointers","floyd-cycle"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`${p}
def has_cycle(head):
    pass
`,javascript:`${g}
function hasCycle(head) {

}
`},testCode:{python:`${l}${a}
_h=_build([3,2,0,-4]);_tail=_h
while _tail.next: _tail=_tail.next
_tail.next=_h.next
_t(has_cycle(_h),True,'cycle to index 1')
_t(has_cycle(_build([1,2])),False,'no cycle')
_t(has_cycle(_build([])),False,'empty list')
_s=_build([1]);_s.next=_s
_t(has_cycle(_s),True,'self loop')
print(f'{_p}/{_n} tests passed')`,javascript:`${c}${o}
const _h=_build([3,2,0,-4]);let _tail=_h;
while(_tail.next)_tail=_tail.next;
_tail.next=_h.next;
_t(hasCycle(_h),true,'cycle to index 1');
_t(hasCycle(_build([1,2])),false,'no cycle');
_t(hasCycle(_build([])),false,'empty list');
const _s=_build([1]);_s.next=_s;
_t(hasCycle(_s),true,'self loop');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"merge-k-sorted-lists",title:"Merge k Sorted Lists",difficulty:"Advanced",category:"Linked Lists",description:"You are given an array of k linked lists, each sorted in ascending order. Merge all the linked lists into one sorted linked list and return its head. Merging lists one by one costs O(k·N); using a min-heap of list heads or divide-and-conquer pairwise merging achieves O(N log k), where N is the total number of nodes.",examples:[{input:"lists = [[1,4,5],[1,3,4],[2,6]]",output:"[1,1,2,3,4,4,5,6]",explanation:"Merging the three sorted lists yields one fully sorted list."},{input:"lists = []",output:"[]"},{input:"lists = [[]]",output:"[]"}],constraints:["k == lists.length","0 <= k <= 10⁴","0 <= lists[i].length <= 500","-10⁴ <= lists[i][j] <= 10⁴","Each lists[i] is sorted ascending"],hints:["A min-heap keyed on node values always pops the global smallest head","After popping a node, push its successor if it exists","Alternatively merge lists pairwise like merge sort: k lists take log k rounds"],tags:["linked-list","heap","divide-and-conquer","merge-sort"],timeComplexity:"O(N log k)",spaceComplexity:"O(k)",starterCode:{python:`import heapq

${p}
def merge_k_lists(lists):
    pass
`,javascript:`${g}
function mergeKLists(lists) {

}
`},testCode:{python:`${l}${a}
_t(_to_list(merge_k_lists([_build(l) for l in [[1,4,5],[1,3,4],[2,6]]])),[1,1,2,3,4,4,5,6],'example 1')
_t(_to_list(merge_k_lists([])),[],'no lists')
_t(_to_list(merge_k_lists([_build([])])),[],'one empty list')
_t(_to_list(merge_k_lists([_build([1]),_build([0])])),[0,1],'two singletons')
_t(_to_list(merge_k_lists([_build([-2,-1]),_build([]),_build([-3])])),[-3,-2,-1],'negatives and empty')
print(f'{_p}/{_n} tests passed')`,javascript:`${c}${o}
_t(_toList(mergeKLists([[1,4,5],[1,3,4],[2,6]].map(_build))),[1,1,2,3,4,4,5,6],'example 1');
_t(_toList(mergeKLists([])),[],'no lists');
_t(_toList(mergeKLists([_build([])])),[],'one empty list');
_t(_toList(mergeKLists([_build([1]),_build([0])])),[0,1],'two singletons');
_t(_toList(mergeKLists([_build([-2,-1]),_build([]),_build([-3])])),[-3,-2,-1],'negatives and empty');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"middle-of-linked-list",title:"Middle of the Linked List",difficulty:"Beginner",category:"Linked Lists",description:"Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes (i.e. the list has an even number of nodes), return the second middle node. The ListNode class is provided by the runner. The returned node is the head of the remaining sublist, so a comparison of its values from that point onward identifies it uniquely.",examples:[{input:"head = [1,2,3,4,5]",output:"[3,4,5]",explanation:"The middle node is the one with value 3."},{input:"head = [1,2,3,4,5,6]",output:"[4,5,6]",explanation:"Since the list has two middle nodes (3 and 4), the second one (4) is returned."}],constraints:["The number of nodes in the list is in the range [1, 100]","1 <= Node.val <= 100"],hints:["Two pointers: slow moves one step, fast moves two steps","When fast reaches the end (or null past it), slow is at the middle","For an even length, this lands slow on the second middle automatically"],tags:["linked-list","two-pointers"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`${p}
def middle_node(head):
    pass
`,javascript:`${g}
function middleNode(head) {

}
`},testCode:{python:`${l}${a}
_t(_to_list(middle_node(_build([1,2,3,4,5]))),[3,4,5],'odd length')
_t(_to_list(middle_node(_build([1,2,3,4,5,6]))),[4,5,6],'even length picks second middle')
_t(_to_list(middle_node(_build([1]))),[1],'single node')
_t(_to_list(middle_node(_build([1,2]))),[2],'two nodes')
_t(_to_list(middle_node(_build([1,2,3]))),[2,3],'three nodes')
print(f'{_p}/{_n} tests passed')`,javascript:`${c}${o}
_t(_toList(middleNode(_build([1,2,3,4,5]))),[3,4,5],'odd length');
_t(_toList(middleNode(_build([1,2,3,4,5,6]))),[4,5,6],'even length picks second middle');
_t(_toList(middleNode(_build([1]))),[1],'single node');
_t(_toList(middleNode(_build([1,2]))),[2],'two nodes');
_t(_toList(middleNode(_build([1,2,3]))),[2,3],'three nodes');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"remove-nth-from-end",title:"Remove Nth Node From End of List",difficulty:"Intermediate",category:"Linked Lists",description:"Given the head of a linked list, remove the n-th node from the end of the list and return its head. The ListNode class is provided by the runner. It is guaranteed that 1 <= n <= the length of the list. Follow-up: could you do this in one pass?",examples:[{input:"head = [1,2,3,4,5], n = 2",output:"[1,2,3,5]",explanation:"The 2nd node from the end (value 4) is removed."},{input:"head = [1], n = 1",output:"[]"},{input:"head = [1,2], n = 1",output:"[1]"}],constraints:["The number of nodes in the list is sz","1 <= sz <= 30","0 <= Node.val <= 100","1 <= n <= sz"],hints:["Use a dummy node before the head so removing the first node is uniform","Advance a fast pointer n steps ahead, then move fast and slow together until fast reaches the end","slow now sits just before the target node — unlink it with slow.next = slow.next.next"],tags:["linked-list","two-pointers"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`${p}
def remove_nth_from_end(head, n):
    pass
`,javascript:`${g}
function removeNthFromEnd(head, n) {

}
`},testCode:{python:`${l}${a}
_t(_to_list(remove_nth_from_end(_build([1,2,3,4,5]),2)),[1,2,3,5],'example 1')
_t(_to_list(remove_nth_from_end(_build([1]),1)),[],'single node removed')
_t(_to_list(remove_nth_from_end(_build([1,2]),1)),[1],'remove last of two')
_t(_to_list(remove_nth_from_end(_build([1,2]),2)),[2],'remove head of two')
_t(_to_list(remove_nth_from_end(_build([1,2,3,4,5]),5)),[2,3,4,5],'remove head')
print(f'{_p}/{_n} tests passed')`,javascript:`${c}${o}
_t(_toList(removeNthFromEnd(_build([1,2,3,4,5]),2)),[1,2,3,5],'example 1');
_t(_toList(removeNthFromEnd(_build([1]),1)),[],'single node removed');
_t(_toList(removeNthFromEnd(_build([1,2]),1)),[1],'remove last of two');
_t(_toList(removeNthFromEnd(_build([1,2]),2)),[2],'remove head of two');
_t(_toList(removeNthFromEnd(_build([1,2,3,4,5]),5)),[2,3,4,5],'remove head');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"add-two-numbers",title:"Add Two Numbers",difficulty:"Intermediate",category:"Linked Lists",description:"You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list, also with digits stored in reverse order. The ListNode class is provided by the runner. You may assume the two numbers do not contain any leading zeros, except the number 0 itself.",examples:[{input:"l1 = [2,4,3], l2 = [5,6,4]",output:"[7,0,8]",explanation:"342 + 465 = 807, stored in reverse as [7,0,8]."},{input:"l1 = [0], l2 = [0]",output:"[0]"},{input:"l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",output:"[8,9,9,9,0,0,0,1]",explanation:"9999999 + 9999 = 10009998."}],constraints:["The number of nodes in each list is in the range [1, 100]","0 <= Node.val <= 9","It is guaranteed that the list represents a number that does not have leading zeros"],hints:["Walk both lists together, summing digits plus a carry from the previous position","Each output digit is sum % 10 and the next carry is sum // 10","Continue while either list has nodes left or a final carry of 1 remains"],tags:["linked-list","math","recursion"],timeComplexity:"O(max(m, n))",spaceComplexity:"O(max(m, n))",starterCode:{python:`${p}
def add_two_numbers(l1, l2):
    pass
`,javascript:`${g}
function addTwoNumbers(l1, l2) {

}
`},testCode:{python:`${l}${a}
_t(_to_list(add_two_numbers(_build([2,4,3]),_build([5,6,4]))),[7,0,8],'example 1')
_t(_to_list(add_two_numbers(_build([0]),_build([0]))),[0],'zero plus zero')
_t(_to_list(add_two_numbers(_build([9,9,9,9,9,9,9]),_build([9,9,9,9]))),[8,9,9,9,0,0,0,1],'carry out new digit')
_t(_to_list(add_two_numbers(_build([5]),_build([5]))),[0,1],'single digit carry')
_t(_to_list(add_two_numbers(_build([1,8]),_build([0]))),[1,8],'different lengths')
print(f'{_p}/{_n} tests passed')`,javascript:`${c}${o}
_t(_toList(addTwoNumbers(_build([2,4,3]),_build([5,6,4]))),[7,0,8],'example 1');
_t(_toList(addTwoNumbers(_build([0]),_build([0]))),[0],'zero plus zero');
_t(_toList(addTwoNumbers(_build([9,9,9,9,9,9,9]),_build([9,9,9,9]))),[8,9,9,9,0,0,0,1],'carry out new digit');
_t(_toList(addTwoNumbers(_build([5]),_build([5]))),[0,1],'single digit carry');
_t(_toList(addTwoNumbers(_build([1,8]),_build([0]))),[1,8],'different lengths');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"max-depth-binary-tree",title:"Maximum Depth of Binary Tree",difficulty:"Beginner",category:"Trees",description:"Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node. The TreeNode class is provided by the runner; test inputs are built from level-order arrays where null marks a missing child.",examples:[{input:"root = [3,9,20,null,null,15,7]",output:"3",explanation:"The longest root-to-leaf path is 3 → 20 → 15 (or 7), which contains 3 nodes."},{input:"root = [1,null,2]",output:"2"}],constraints:["The number of nodes in the tree is in the range [0, 10⁴]","-100 <= Node.val <= 100"],hints:["Recursive definition: depth(node) = 1 + max(depth(left), depth(right))","The empty tree has depth 0 — that is the base case","An iterative BFS that counts levels also works"],tags:["tree","dfs","bfs","recursion"],timeComplexity:"O(n)",spaceComplexity:"O(h)",starterCode:{python:`${m}
def max_depth(root):
    pass
`,javascript:`${_}
function maxDepth(root) {

}
`},testCode:{python:`${d}${a}
_t(max_depth(_tree([3,9,20,None,None,15,7])),3,'example 1')
_t(max_depth(_tree([1,None,2])),2,'right skewed')
_t(max_depth(_tree([])),0,'empty tree')
_t(max_depth(_tree([0])),1,'single node')
_t(max_depth(_tree([1,2,3,4,None,None,None,5])),4,'left-heavy chain')
print(f'{_p}/{_n} tests passed')`,javascript:`${u}${o}
_t(maxDepth(_tree([3,9,20,null,null,15,7])),3,'example 1');
_t(maxDepth(_tree([1,null,2])),2,'right skewed');
_t(maxDepth(_tree([])),0,'empty tree');
_t(maxDepth(_tree([0])),1,'single node');
_t(maxDepth(_tree([1,2,3,4,null,null,null,5])),4,'left-heavy chain');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"validate-bst",title:"Validate Binary Search Tree",difficulty:"Intermediate",category:"Trees",description:"Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows: the left subtree of a node contains only nodes with keys strictly less than the node's key; the right subtree contains only nodes with keys strictly greater than the node's key; and both subtrees must themselves be binary search trees. Note: comparing only parent and child is not enough — every node in a subtree must respect the ancestor's bound.",examples:[{input:"root = [2,1,3]",output:"true"},{input:"root = [5,1,4,null,null,3,6]",output:"false",explanation:"The root is 5 but the right child's subtree contains 3 and 4, which are less than 5."}],constraints:["The number of nodes is in the range [1, 10⁴]","-2³¹ <= Node.val <= 2³¹ - 1","Equal values are NOT allowed"],hints:["Pass down an allowed (low, high) range for each node","Left child narrows the high bound; right child narrows the low bound","Alternatively, an in-order traversal of a valid BST must be strictly increasing"],tags:["tree","bst","dfs","recursion"],timeComplexity:"O(n)",spaceComplexity:"O(h)",starterCode:{python:`${m}
def is_valid_bst(root):
    pass
`,javascript:`${_}
function isValidBST(root) {

}
`},testCode:{python:`${d}${a}
_t(is_valid_bst(_tree([2,1,3])),True,'example 1')
_t(is_valid_bst(_tree([5,1,4,None,None,3,6])),False,'example 2')
_t(is_valid_bst(_tree([1])),True,'single node')
_t(is_valid_bst(_tree([5,4,6,None,None,3,7])),False,'deep violation')
_t(is_valid_bst(_tree([2,2,2])),False,'duplicates invalid')
_t(is_valid_bst(_tree([-10,-20,0])),True,'negative values')
print(f'{_p}/{_n} tests passed')`,javascript:`${u}${o}
_t(isValidBST(_tree([2,1,3])),true,'example 1');
_t(isValidBST(_tree([5,1,4,null,null,3,6])),false,'example 2');
_t(isValidBST(_tree([1])),true,'single node');
_t(isValidBST(_tree([5,4,6,null,null,3,7])),false,'deep violation');
_t(isValidBST(_tree([2,2,2])),false,'duplicates invalid');
_t(isValidBST(_tree([-10,-20,0])),true,'negative values');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"level-order-traversal",title:"Binary Tree Level Order Traversal",difficulty:"Intermediate",category:"Trees",description:"Given the root of a binary tree, return the level order traversal of its nodes' values — i.e., from left to right, level by level, as a list of lists where each inner list holds one level.",examples:[{input:"root = [3,9,20,null,null,15,7]",output:"[[3],[9,20],[15,7]]"},{input:"root = [1]",output:"[[1]]"},{input:"root = []",output:"[]"}],constraints:["The number of nodes is in the range [0, 2000]","-1000 <= Node.val <= 1000"],hints:["Use a queue (BFS); seed it with the root","Snapshot the queue length at the start of each level — that many nodes belong to the current level","Collect those values, enqueue their children, repeat until the queue empties"],tags:["tree","bfs","queue"],timeComplexity:"O(n)",spaceComplexity:"O(n)",starterCode:{python:`from collections import deque

${m}
def level_order(root):
    pass
`,javascript:`${_}
function levelOrder(root) {

}
`},testCode:{python:`${d}${a}
_t(level_order(_tree([3,9,20,None,None,15,7])),[[3],[9,20],[15,7]],'example 1')
_t(level_order(_tree([1])),[[1]],'single node')
_t(level_order(_tree([])),[],'empty tree')
_t(level_order(_tree([1,2,None,3])),[[1],[2],[3]],'left chain')
_t(level_order(_tree([1,2,3,4,5,6,7])),[[1],[2,3],[4,5,6,7]],'perfect tree')
print(f'{_p}/{_n} tests passed')`,javascript:`${u}${o}
_t(levelOrder(_tree([3,9,20,null,null,15,7])),[[3],[9,20],[15,7]],'example 1');
_t(levelOrder(_tree([1])),[[1]],'single node');
_t(levelOrder(_tree([])),[],'empty tree');
_t(levelOrder(_tree([1,2,null,3])),[[1],[2],[3]],'left chain');
_t(levelOrder(_tree([1,2,3,4,5,6,7])),[[1],[2,3],[4,5,6,7]],'perfect tree');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"binary-tree-max-path-sum",title:"Binary Tree Maximum Path Sum",difficulty:"Expert",category:"Trees",description:"A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge connecting them. A node can only appear in the sequence at most once, and the path does not need to pass through the root. The path sum is the sum of the node values in the path. Given the root of a binary tree, return the maximum path sum of any non-empty path. Values may be negative, so a subtree branch is only worth taking when its contribution is positive.",examples:[{input:"root = [1,2,3]",output:"6",explanation:"The optimal path is 2 → 1 → 3 with a sum of 2 + 1 + 3 = 6."},{input:"root = [-10,9,20,null,null,15,7]",output:"42",explanation:"The optimal path is 15 → 20 → 7 with a sum of 42; it does not pass through the root."}],constraints:["The number of nodes is in the range [1, 3·10⁴]","-1000 <= Node.val <= 1000"],hints:["For each node compute the best downward gain: node.val + max(leftGain, rightGain, with negatives clamped to 0)","The best path THROUGH a node is node.val + leftGain + rightGain — update a global maximum with it","Return only the single-branch gain upward; a parent path cannot use both children"],tags:["tree","dfs","recursion","dynamic-programming"],timeComplexity:"O(n)",spaceComplexity:"O(h)",starterCode:{python:`${m}
def max_path_sum(root):
    pass
`,javascript:`${_}
function maxPathSum(root) {

}
`},testCode:{python:`${d}${a}
_t(max_path_sum(_tree([1,2,3])),6,'example 1')
_t(max_path_sum(_tree([-10,9,20,None,None,15,7])),42,'example 2')
_t(max_path_sum(_tree([-3])),-3,'single negative node')
_t(max_path_sum(_tree([2,-1])),2,'skip negative child')
_t(max_path_sum(_tree([-2,-1])),-1,'all negative picks max node')
print(f'{_p}/{_n} tests passed')`,javascript:`${u}${o}
_t(maxPathSum(_tree([1,2,3])),6,'example 1');
_t(maxPathSum(_tree([-10,9,20,null,null,15,7])),42,'example 2');
_t(maxPathSum(_tree([-3])),-3,'single negative node');
_t(maxPathSum(_tree([2,-1])),2,'skip negative child');
_t(maxPathSum(_tree([-2,-1])),-1,'all negative picks max node');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"invert-binary-tree",title:"Invert Binary Tree",difficulty:"Beginner",category:"Trees",description:"Given the root of a binary tree, invert the tree (swap the left and right child of every node), and return its root. The TreeNode class is provided by the runner; test inputs are built from level-order arrays where null marks a missing child, and results are compared as a level-order serialization with trailing nulls trimmed.",examples:[{input:"root = [4,2,7,1,3,6,9]",output:"[4,7,2,9,6,3,1]"},{input:"root = [2,1,3]",output:"[2,3,1]"},{input:"root = []",output:"[]"}],constraints:["The number of nodes in the tree is in the range [0, 100]","-100 <= Node.val <= 100"],hints:["Swap the left and right children of the current node","Recurse into both subtrees (the order does not matter)","The empty tree is the base case — return null"],tags:["tree","dfs","bfs","recursion"],timeComplexity:"O(n)",spaceComplexity:"O(h)",starterCode:{python:`${m}
def invert_tree(root):
    pass
`,javascript:`${_}
function invertTree(root) {

}
`},testCode:{python:`${d}${a}
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
print(f'{_p}/{_n} tests passed')`,javascript:`${u}${o}
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
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"diameter-of-binary-tree",title:"Diameter of Binary Tree",difficulty:"Intermediate",category:"Trees",description:"Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in the tree. This path may or may not pass through the root. The length of a path between two nodes is represented by the number of edges between them (not the number of nodes).",examples:[{input:"root = [1,2,3,4,5]",output:"3",explanation:"The longest path is [4,2,1,3] or [5,2,1,3], which has 3 edges."},{input:"root = [1,2]",output:"1"}],constraints:["The number of nodes in the tree is in the range [1, 10⁴]","-100 <= Node.val <= 100"],hints:["For each node, the longest path through it equals leftHeight + rightHeight (in edges)","Compute heights with a post-order DFS and update a global maximum diameter as you go","Height of an empty subtree is 0; a leaf has height 1 in node terms, so its child heights are 0"],tags:["tree","dfs","recursion"],timeComplexity:"O(n)",spaceComplexity:"O(h)",starterCode:{python:`${m}
def diameter_of_binary_tree(root):
    pass
`,javascript:`${_}
function diameterOfBinaryTree(root) {

}
`},testCode:{python:`${d}${a}
_t(diameter_of_binary_tree(_tree([1,2,3,4,5])),3,'example 1')
_t(diameter_of_binary_tree(_tree([1,2])),1,'two nodes')
_t(diameter_of_binary_tree(_tree([1])),0,'single node')
_t(diameter_of_binary_tree(_tree([1,2,None,3,None,4])),3,'left skewed chain')
_t(diameter_of_binary_tree(_tree([4,2,7,1,3,6,9])),4,'balanced tree')
print(f'{_p}/{_n} tests passed')`,javascript:`${u}${o}
_t(diameterOfBinaryTree(_tree([1,2,3,4,5])),3,'example 1');
_t(diameterOfBinaryTree(_tree([1,2])),1,'two nodes');
_t(diameterOfBinaryTree(_tree([1])),0,'single node');
_t(diameterOfBinaryTree(_tree([1,2,null,3,null,4])),3,'left skewed chain');
_t(diameterOfBinaryTree(_tree([4,2,7,1,3,6,9])),4,'balanced tree');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"lowest-common-ancestor-bst",title:"Lowest Common Ancestor of a BST",difficulty:"Intermediate",category:"Trees",description:"Given the root of a binary search tree (BST) and two values p and q present in the tree, return the value of the lowest common ancestor (LCA) of the two nodes. The lowest common ancestor is defined as the lowest node in the tree that has both target nodes as descendants (where a node is allowed to be a descendant of itself). To keep the signature uniform across languages, the function takes the two targets as integer VALUES (not node references) and returns the LCA node; tests compare the returned node's value. All node values in the BST are unique, and both p and q are guaranteed to exist.",examples:[{input:"root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",output:"6",explanation:"The LCA of nodes 2 and 8 is 6, since they lie in different subtrees of the root."},{input:"root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4",output:"2",explanation:"A node can be a descendant of itself, so the LCA of 2 and 4 is 2."}],constraints:["The number of nodes in the tree is in the range [2, 10⁵]","-10⁹ <= Node.val <= 10⁹","All Node.val are unique","p != q","Both p and q exist in the BST"],hints:["Use the BST ordering — you do not need to search both subtrees","If both p and q are greater than the current node, go right; if both are smaller, go left","When the targets split (one on each side) or one equals the current node, the current node is the LCA"],tags:["tree","bst","dfs","recursion"],timeComplexity:"O(h)",spaceComplexity:"O(1)",starterCode:{python:`${m}
def lowest_common_ancestor(root, p, q):
    pass
`,javascript:`${_}
function lowestCommonAncestor(root, p, q) {

}
`},testCode:{python:`${d}${a}
_b=_tree([6,2,8,0,4,7,9,None,None,3,5])
_t(lowest_common_ancestor(_b,2,8).val,6,'split at root')
_t(lowest_common_ancestor(_b,2,4).val,2,'ancestor is one of the nodes')
_t(lowest_common_ancestor(_b,3,5).val,4,'lca deeper in tree')
_t(lowest_common_ancestor(_b,7,9).val,8,'right subtree')
_t(lowest_common_ancestor(_tree([2,1]),1,2).val,2,'two node tree')
print(f'{_p}/{_n} tests passed')`,javascript:`${u}${o}
const _b=_tree([6,2,8,0,4,7,9,null,null,3,5]);
_t(lowestCommonAncestor(_b,2,8).val,6,'split at root');
_t(lowestCommonAncestor(_b,2,4).val,2,'ancestor is one of the nodes');
_t(lowestCommonAncestor(_b,3,5).val,4,'lca deeper in tree');
_t(lowestCommonAncestor(_b,7,9).val,8,'right subtree');
_t(lowestCommonAncestor(_tree([2,1]),1,2).val,2,'two node tree');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"serialize-deserialize-tree",title:"Serialize and Deserialize Binary Tree",difficulty:"Expert",category:"Trees",description:"Serialization is the process of converting a data structure into a sequence of bits so that it can be stored or transmitted and later reconstructed. Design an algorithm to serialize and deserialize a binary tree. Implement two functions: serialize(root) that turns a tree into a string, and deserialize(data) that turns such a string back into the identical tree. You may use ANY encoding you like — the tests only verify that deserialize(serialize(tree)) reproduces the original tree (a perfect round trip), never the exact string. The TreeNode class is provided by the runner.",examples:[{input:"root = [1,2,3,null,null,4,5]",output:"[1,2,3,null,null,4,5]",explanation:"serialize then deserialize must reproduce the original tree."},{input:"root = []",output:"[]",explanation:"The empty tree must round-trip to the empty tree."}],constraints:["The number of nodes in the tree is in the range [0, 10⁴]","-1000 <= Node.val <= 1000","serialize must return a string","deserialize must accept exactly what serialize returns"],hints:['A pre-order DFS that emits a sentinel (e.g. "#") for null children captures the full structure',"To deserialize, read tokens in the same pre-order: a sentinel is null, otherwise build a node and recurse left then right","BFS level-order with null markers works equally well — just be consistent between the two functions"],tags:["tree","dfs","bfs","design","string"],timeComplexity:"O(n)",spaceComplexity:"O(n)",starterCode:{python:`${m}
def serialize(root):
    pass

def deserialize(data):
    pass
`,javascript:`${_}
function serialize(root) {

}

function deserialize(data) {

}
`},testCode:{python:`${d}${a}
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
print(f'{_p}/{_n} tests passed')`,javascript:`${u}${o}
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
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"number-of-islands",title:"Number of Islands",difficulty:"Intermediate",category:"Graphs",description:'Given an m x n 2D binary grid which represents a map of "1"s (land) and "0"s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water. Diagonal connections do NOT count.',examples:[{input:'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',output:"1",explanation:"All land cells are connected, forming a single island."},{input:'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',output:"3",explanation:"Three separate clusters of land. The diagonal cells at (2,2) and (3,3) are NOT connected."}],constraints:["m == grid.length, n == grid[i].length","1 <= m, n <= 300",'grid[i][j] is "1" or "0"','Cells are the strings "1"/"0", not numbers'],hints:['Scan every cell; each unvisited "1" starts a new island','Flood-fill (DFS or BFS) from that cell, marking visited land (e.g., overwrite with "0")',"Count how many flood-fills you launch"],tags:["graph","dfs","bfs","matrix","flood-fill"],timeComplexity:"O(m·n)",spaceComplexity:"O(m·n)",starterCode:{python:`def num_islands(grid):
    pass
`,javascript:`function numIslands(grid) {

}
`},testCode:{python:`${a}
_t(num_islands([['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]),1,'one island')
_t(num_islands([['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]),3,'three islands')
_t(num_islands([['1']]),1,'single land cell')
_t(num_islands([['0']]),0,'single water cell')
_t(num_islands([['1','0','1'],['0','1','0'],['1','0','1']]),5,'diagonals do not connect')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(numIslands([['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]),1,'one island');
_t(numIslands([['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]),3,'three islands');
_t(numIslands([['1']]),1,'single land cell');
_t(numIslands([['0']]),0,'single water cell');
_t(numIslands([['1','0','1'],['0','1','0'],['1','0','1']]),5,'diagonals do not connect');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"course-schedule",title:"Course Schedule",difficulty:"Intermediate",category:"Graphs",description:"There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [a, b] indicates that you must take course b first if you want to take course a. Return true if you can finish all courses, otherwise return false. This is equivalent to asking whether the prerequisite graph contains a cycle.",examples:[{input:"numCourses = 2, prerequisites = [[1,0]]",output:"true",explanation:"Take course 0 first, then course 1."},{input:"numCourses = 2, prerequisites = [[1,0],[0,1]]",output:"false",explanation:"Course 1 requires course 0 and vice versa — a cycle, so it is impossible."}],constraints:["1 <= numCourses <= 2000","0 <= prerequisites.length <= 5000","prerequisites[i].length == 2","0 <= a, b < numCourses","All pairs are distinct"],hints:["Build an adjacency list and detect a cycle","Kahn's algorithm: repeatedly remove nodes with in-degree 0; if you remove all of them, there is no cycle","Or DFS with three colors: unvisited / in-progress / done; hitting an in-progress node means a cycle"],tags:["graph","topological-sort","dfs","bfs"],timeComplexity:"O(V + E)",spaceComplexity:"O(V + E)",starterCode:{python:`from collections import deque

def can_finish(num_courses, prerequisites):
    pass
`,javascript:`function canFinish(numCourses, prerequisites) {

}
`},testCode:{python:`${a}
_t(can_finish(2,[[1,0]]),True,'simple chain')
_t(can_finish(2,[[1,0],[0,1]]),False,'two-node cycle')
_t(can_finish(5,[[1,4],[2,4],[3,1],[3,2]]),True,'diamond DAG')
_t(can_finish(1,[]),True,'no prerequisites')
_t(can_finish(3,[[0,1],[1,2],[2,0]]),False,'three-node cycle')
_t(can_finish(4,[[1,0],[2,1],[3,2]]),True,'long chain')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(canFinish(2,[[1,0]]),true,'simple chain');
_t(canFinish(2,[[1,0],[0,1]]),false,'two-node cycle');
_t(canFinish(5,[[1,4],[2,4],[3,1],[3,2]]),true,'diamond DAG');
_t(canFinish(1,[]),true,'no prerequisites');
_t(canFinish(3,[[0,1],[1,2],[2,0]]),false,'three-node cycle');
_t(canFinish(4,[[1,0],[2,1],[3,2]]),true,'long chain');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"word-ladder",title:"Word Ladder",difficulty:"Advanced",category:"Graphs",description:"A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence beginWord → s1 → s2 → ... → endWord such that every adjacent pair of words differs by exactly one letter, every si is in wordList (beginWord does not need to be), and the last word equals endWord. Given beginWord, endWord, and wordList, return the number of words in the shortest transformation sequence, or 0 if no such sequence exists. Shortest-path structure means BFS, not DFS.",examples:[{input:'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',output:"5",explanation:'One shortest sequence is "hit" → "hot" → "dot" → "dog" → "cog", which has 5 words.'},{input:'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]',output:"0",explanation:'endWord "cog" is not in wordList, so no valid sequence exists.'}],constraints:["1 <= beginWord.length <= 10","endWord.length == beginWord.length","1 <= wordList.length <= 5000","All words consist of lowercase English letters","All words in wordList are unique"],hints:["Model words as graph nodes with edges between words differing by one letter","BFS from beginWord, tracking depth; the first time you reach endWord is the answer","Generating all 26 single-letter mutations of the current word and checking set membership beats comparing every pair"],tags:["graph","bfs","string"],timeComplexity:"O(n·L·26)",spaceComplexity:"O(n·L)",starterCode:{python:`from collections import deque

def ladder_length(begin_word, end_word, word_list):
    pass
`,javascript:`function ladderLength(beginWord, endWord, wordList) {

}
`},testCode:{python:`${a}
_t(ladder_length('hit','cog',['hot','dot','dog','lot','log','cog']),5,'example 1')
_t(ladder_length('hit','cog',['hot','dot','dog','lot','log']),0,'endWord missing')
_t(ladder_length('a','c',['a','b','c']),2,'single letter words')
_t(ladder_length('hot','dog',['hot','dog']),0,'no bridge word')
_t(ladder_length('hot','dot',['dot']),2,'direct neighbor')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(ladderLength('hit','cog',['hot','dot','dog','lot','log','cog']),5,'example 1');
_t(ladderLength('hit','cog',['hot','dot','dog','lot','log']),0,'endWord missing');
_t(ladderLength('a','c',['a','b','c']),2,'single letter words');
_t(ladderLength('hot','dog',['hot','dog']),0,'no bridge word');
_t(ladderLength('hot','dot',['dot']),2,'direct neighbor');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"rotting-oranges",title:"Rotting Oranges",difficulty:"Intermediate",category:"Graphs",description:"You are given an m x n grid where each cell can have one of three values: 0 representing an empty cell, 1 representing a fresh orange, or 2 representing a rotten orange. Every minute, any fresh orange that is 4-directionally adjacent (up, down, left, right) to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible (some fresh orange can never become rotten), return -1. Diagonal adjacency does NOT spread rot.",examples:[{input:"grid = [[2,1,1],[1,1,0],[0,1,1]]",output:"4"},{input:"grid = [[2,1,1],[0,1,1],[1,0,1]]",output:"-1",explanation:"The orange in the bottom-left corner (row 2, column 0) is never adjacent to a rotten orange, so it can never rot."},{input:"grid = [[0,2]]",output:"0",explanation:"There are no fresh oranges at minute 0, so the answer is 0."}],constraints:["m == grid.length, n == grid[i].length","1 <= m, n <= 10","grid[i][j] is 0, 1, or 2"],hints:["This is a multi-source BFS — enqueue every rotten orange as a level-0 source","Process the queue level by level; each level is one elapsed minute","After the BFS, if any fresh orange remains, return -1; otherwise return the number of elapsed minutes"],tags:["graph","bfs","matrix"],timeComplexity:"O(m·n)",spaceComplexity:"O(m·n)",starterCode:{python:`from collections import deque

def oranges_rotting(grid):
    pass
`,javascript:`function orangesRotting(grid) {

}
`},testCode:{python:`${a}
_t(oranges_rotting([[2,1,1],[1,1,0],[0,1,1]]),4,'example 1')
_t(oranges_rotting([[2,1,1],[0,1,1],[1,0,1]]),-1,'unreachable fresh orange')
_t(oranges_rotting([[0,2]]),0,'no fresh oranges')
_t(oranges_rotting([[0]]),0,'single empty cell')
_t(oranges_rotting([[1]]),-1,'single fresh orange never rots')
_t(oranges_rotting([[2,2],[1,1]]),1,'two sources one minute')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(orangesRotting([[2,1,1],[1,1,0],[0,1,1]]),4,'example 1');
_t(orangesRotting([[2,1,1],[0,1,1],[1,0,1]]),-1,'unreachable fresh orange');
_t(orangesRotting([[0,2]]),0,'no fresh oranges');
_t(orangesRotting([[0]]),0,'single empty cell');
_t(orangesRotting([[1]]),-1,'single fresh orange never rots');
_t(orangesRotting([[2,2],[1,1]]),1,'two sources one minute');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"pacific-atlantic",title:"Pacific Atlantic Water Flow",difficulty:"Intermediate",category:"Graphs",description:"There is an m x n rectangular island that borders both the Pacific Ocean and the Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges. The island is partitioned into a grid of square cells; heights[r][c] represents the height above sea level of the cell at coordinate (r, c). Rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into that ocean. Return a list of grid coordinates [r, c] such that rain water can flow from cell (r, c) to BOTH the Pacific and Atlantic oceans. The result may be returned in any order; tests compare the coordinate set after sorting.",examples:[{input:"heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",output:"[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]"},{input:"heights = [[1]]",output:"[[0,0]]",explanation:"A single cell touches all four edges, so it reaches both oceans."}],constraints:["m == heights.length, n == heights[r].length","1 <= m, n <= 200","0 <= heights[r][c] <= 10⁵"],hints:["Do not flood from each cell — instead flood inward from the ocean borders","Run a reverse BFS/DFS from the Pacific border (top + left) where you may step to a neighbor with height >= current, marking reachable cells","Do the same from the Atlantic border (bottom + right); the answer is the intersection of the two reachable sets"],tags:["graph","dfs","bfs","matrix"],timeComplexity:"O(m·n)",spaceComplexity:"O(m·n)",starterCode:{python:`def pacific_atlantic(heights):
    pass
`,javascript:`function pacificAtlantic(heights) {

}
`},testCode:{python:`${a}
def _norm(x): return sorted([list(c) for c in x])
_t(_norm(pacific_atlantic([[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]])),_norm([[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]),'example 1')
_t(_norm(pacific_atlantic([[1]])),[[0,0]],'single cell')
_t(_norm(pacific_atlantic([[2,1],[1,2]])),_norm([[0,0],[0,1],[1,0],[1,1]]),'all reach both')
_t(_norm(pacific_atlantic([[1,2,3],[8,9,4],[7,6,5]])),_norm([[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]])," spiral")
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
const _norm=x=>x.map(c=>[c[0],c[1]]).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
_t(_norm(pacificAtlantic([[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]])),_norm([[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]),'example 1');
_t(_norm(pacificAtlantic([[1]])),[[0,0]],'single cell');
_t(_norm(pacificAtlantic([[2,1],[1,2]])),_norm([[0,0],[0,1],[1,0],[1,1]]),'all reach both');
_t(_norm(pacificAtlantic([[1,2,3],[8,9,4],[7,6,5]])),_norm([[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]),'spiral');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"alien-dictionary",title:"Alien Dictionary",difficulty:"Expert",category:"Graphs",description:'There is a new alien language that uses the lowercase English alphabet, but the order of the letters is unknown. You are given a list of strings words from the alien language\'s dictionary. The strings in words are sorted lexicographically by the rules of this new language. Derive the order of letters in this language and return it as a string. If there is no valid letter ordering that is consistent with the given words, return "". The dictionary order is determined by comparing adjacent words: the first position where they differ dictates that the earlier word\'s letter precedes the later word\'s letter. If a word is a prefix of a previous longer word (e.g. ["abc","ab"]), the ordering is invalid because a longer word cannot precede its own prefix. Each test is designed so that a consistent ordering, when it exists, is unique.',examples:[{input:'words = ["wrt","wrf","er","ett","rftt"]',output:'"wertf"',explanation:"From the adjacencies: w < e, t < f, r < t, e < r, giving the total order w < e < r < t < f."},{input:'words = ["z","x","z"]',output:'""',explanation:"The constraints imply z < x and x < z, a cycle, so no valid ordering exists."},{input:'words = ["abc","ab"]',output:'""',explanation:'"abc" precedes its own prefix "ab", which is impossible — invalid input.'}],constraints:["1 <= words.length <= 100","1 <= words[i].length <= 100","words[i] consists of only lowercase English letters","Each solvable test has a unique valid ordering"],hints:['Build a graph: for each adjacent pair of words, the first differing character gives an edge "earlier < later"',"Watch the prefix case: if word i is longer than word i+1 and word i+1 is a prefix of word i, the input is invalid",'Topologically sort the letters; if a cycle exists (cannot order all letters) return ""'],tags:["graph","topological-sort","string","bfs","dfs"],timeComplexity:"O(C)",spaceComplexity:"O(1)",starterCode:{python:`from collections import deque

def alien_order(words):
    pass
`,javascript:`function alienOrder(words) {

}
`},testCode:{python:`${a}
_t(alien_order(['wrt','wrf','er','ett','rftt']),'wertf','classic unique order')
_t(alien_order(['z','x','z']),'','cycle is invalid')
_t(alien_order(['abc','ab']),'','prefix violation')
_t(alien_order(['w','x','y','z']),'wxyz','total order from single letters')
_t(alien_order(['a']),'a','single letter')
_t(alien_order(['c','cb','b','ba','a']),'cba','prefix-then-branch chain')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(alienOrder(['wrt','wrf','er','ett','rftt']),'wertf','classic unique order');
_t(alienOrder(['z','x','z']),'','cycle is invalid');
_t(alienOrder(['abc','ab']),'','prefix violation');
_t(alienOrder(['w','x','y','z']),'wxyz','total order from single letters');
_t(alienOrder(['a']),'a','single letter');
_t(alienOrder(['c','cb','b','ba','a']),'cba','prefix-then-branch chain');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"climbing-stairs",title:"Climbing Stairs",difficulty:"Beginner",category:"Dynamic Programming",description:"You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top? Note that the count grows like the Fibonacci sequence, so a naive recursion without memoization is exponential.",examples:[{input:"n = 2",output:"2",explanation:"Two ways: 1+1 and 2."},{input:"n = 3",output:"3",explanation:"Three ways: 1+1+1, 1+2 and 2+1."}],constraints:["1 <= n <= 45"],hints:["To stand on step n you arrived from step n-1 or step n-2","ways(n) = ways(n-1) + ways(n-2), with ways(1)=1, ways(2)=2","Two rolling variables give O(n) time and O(1) space"],tags:["dynamic-programming","fibonacci","memoization"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`def climb_stairs(n):
    pass
`,javascript:`function climbStairs(n) {

}
`},testCode:{python:`${a}
_t(climb_stairs(2),2,'example 1')
_t(climb_stairs(3),3,'example 2')
_t(climb_stairs(1),1,'one step')
_t(climb_stairs(5),8,'five steps')
_t(climb_stairs(10),89,'ten steps')
_t(climb_stairs(45),1836311903,'large n needs O(n)')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(climbStairs(2),2,'example 1');
_t(climbStairs(3),3,'example 2');
_t(climbStairs(1),1,'one step');
_t(climbStairs(5),8,'five steps');
_t(climbStairs(10),89,'ten steps');
_t(climbStairs(45),1836311903,'large n needs O(n)');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"house-robber",title:"House Robber",difficulty:"Intermediate",category:"Dynamic Programming",description:"You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed; the only constraint stopping you from robbing all of them is that adjacent houses have security systems connected — robbing two adjacent houses alerts the police. Given an integer array nums representing the amount of money in each house, return the maximum amount you can rob tonight without alerting the police.",examples:[{input:"nums = [1,2,3,1]",output:"4",explanation:"Rob house 1 (money = 1) and house 3 (money = 3): total = 4."},{input:"nums = [2,7,9,3,1]",output:"12",explanation:"Rob houses 1, 3 and 5: 2 + 9 + 1 = 12."}],constraints:["1 <= nums.length <= 100","0 <= nums[i] <= 400"],hints:["For each house: either skip it (keep previous best) or rob it (add to best excluding the neighbor)","dp[i] = max(dp[i-1], dp[i-2] + nums[i])","Only the last two dp values are needed — O(1) space"],tags:["dynamic-programming","array"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`def rob(nums):
    pass
`,javascript:`function rob(nums) {

}
`},testCode:{python:`${a}
_t(rob([1,2,3,1]),4,'example 1')
_t(rob([2,7,9,3,1]),12,'example 2')
_t(rob([5]),5,'single house')
_t(rob([2,1,1,2]),4,'skip two in a row')
_t(rob([2,100,3,100,4]),200,'alternating riches')
_t(rob([0,0,0]),0,'nothing to steal')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(rob([1,2,3,1]),4,'example 1');
_t(rob([2,7,9,3,1]),12,'example 2');
_t(rob([5]),5,'single house');
_t(rob([2,1,1,2]),4,'skip two in a row');
_t(rob([2,100,3,100,4]),200,'alternating riches');
_t(rob([0,0,0]),0,'nothing to steal');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"coin-change",title:"Coin Change",difficulty:"Intermediate",category:"Dynamic Programming",description:"You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1. You may assume that you have an infinite number of each kind of coin. Greedy (largest coin first) does not work in general — e.g. coins [1,3,4] and amount 6.",examples:[{input:"coins = [1,2,5], amount = 11",output:"3",explanation:"11 = 5 + 5 + 1."},{input:"coins = [2], amount = 3",output:"-1",explanation:"3 cannot be formed from 2s."},{input:"coins = [1], amount = 0",output:"0",explanation:"Zero coins are needed for amount 0."}],constraints:["1 <= coins.length <= 12","1 <= coins[i] <= 2³¹ - 1","0 <= amount <= 10⁴"],hints:["dp[a] = fewest coins to form amount a; dp[0] = 0","dp[a] = 1 + min(dp[a - c]) over all coins c <= a","Initialize with infinity; an unreachable final amount means return -1"],tags:["dynamic-programming","bfs"],timeComplexity:"O(amount · coins)",spaceComplexity:"O(amount)",starterCode:{python:`def coin_change(coins, amount):
    pass
`,javascript:`function coinChange(coins, amount) {

}
`},testCode:{python:`${a}
_t(coin_change([1,2,5],11),3,'example 1')
_t(coin_change([2],3),-1,'impossible')
_t(coin_change([1],0),0,'zero amount')
_t(coin_change([1,3,4],6),2,'greedy fails here')
_t(coin_change([2,5,10,1],27),4,'27 = 10+10+5+2')
_t(coin_change([186,419,83,408],6249),20,'large stress case')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(coinChange([1,2,5],11),3,'example 1');
_t(coinChange([2],3),-1,'impossible');
_t(coinChange([1],0),0,'zero amount');
_t(coinChange([1,3,4],6),2,'greedy fails here');
_t(coinChange([2,5,10,1],27),4,'27 = 10+10+5+2');
_t(coinChange([186,419,83,408],6249),20,'large stress case');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"longest-increasing-subsequence",title:"Longest Increasing Subsequence",difficulty:"Intermediate",category:"Dynamic Programming",description:"Given an integer array nums, return the length of the longest strictly increasing subsequence. A subsequence is derived by deleting some or no elements without changing the order of the remaining elements. Follow-up: the classic DP is O(n²) — can you reach O(n log n) with patience sorting (binary search over pile tops)?",examples:[{input:"nums = [10,9,2,5,3,7,101,18]",output:"4",explanation:"The longest increasing subsequence is [2,3,7,101] (or [2,5,7,101]), length 4."},{input:"nums = [0,1,0,3,2,3]",output:"4",explanation:"[0,1,2,3] has length 4."},{input:"nums = [7,7,7,7,7,7,7]",output:"1",explanation:"Strictly increasing — equal elements cannot chain."}],constraints:["1 <= nums.length <= 2500","-10⁴ <= nums[i] <= 10⁴","Strictly increasing (no equal neighbors)"],hints:["O(n²) DP: dp[i] = 1 + max(dp[j]) over j < i with nums[j] < nums[i]","For O(n log n): keep an array of the smallest possible tail for each subsequence length","Binary-search the tails array for the first element >= num and replace it (or append)"],tags:["dynamic-programming","binary-search","patience-sorting"],timeComplexity:"O(n log n)",spaceComplexity:"O(n)",starterCode:{python:`import bisect

def length_of_lis(nums):
    pass
`,javascript:`function lengthOfLIS(nums) {

}
`},testCode:{python:`${a}
_t(length_of_lis([10,9,2,5,3,7,101,18]),4,'example 1')
_t(length_of_lis([0,1,0,3,2,3]),4,'example 2')
_t(length_of_lis([7,7,7,7,7,7,7]),1,'all equal')
_t(length_of_lis([4,10,4,3,8,9]),3,'[4,8,9]')
_t(length_of_lis([1]),1,'single element')
_t(length_of_lis([5,4,3,2,1]),1,'strictly decreasing')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(lengthOfLIS([10,9,2,5,3,7,101,18]),4,'example 1');
_t(lengthOfLIS([0,1,0,3,2,3]),4,'example 2');
_t(lengthOfLIS([7,7,7,7,7,7,7]),1,'all equal');
_t(lengthOfLIS([4,10,4,3,8,9]),3,'[4,8,9]');
_t(lengthOfLIS([1]),1,'single element');
_t(lengthOfLIS([5,4,3,2,1]),1,'strictly decreasing');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"edit-distance",title:"Edit Distance",difficulty:"Advanced",category:"Dynamic Programming",description:"Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have three operations permitted on a word: insert a character, delete a character, or replace a character. This is the classic Levenshtein distance, solved with a 2D DP over prefixes of both words.",examples:[{input:'word1 = "horse", word2 = "ros"',output:"3",explanation:"horse → rorse (replace h with r) → rose (remove r) → ros (remove e)."},{input:'word1 = "intention", word2 = "execution"',output:"5",explanation:"Five edits transform one word into the other."}],constraints:["0 <= word1.length, word2.length <= 500","word1 and word2 consist of lowercase English letters"],hints:["dp[i][j] = edits to turn the first i chars of word1 into the first j chars of word2","If the last characters match, dp[i][j] = dp[i-1][j-1]; otherwise 1 + min(insert, delete, replace)","Base cases: dp[i][0] = i (all deletes) and dp[0][j] = j (all inserts)"],tags:["dynamic-programming","string","levenshtein"],timeComplexity:"O(m·n)",spaceComplexity:"O(m·n)",starterCode:{python:`def min_distance(word1, word2):
    pass
`,javascript:`function minDistance(word1, word2) {

}
`},testCode:{python:`${a}
_t(min_distance('horse','ros'),3,'example 1')
_t(min_distance('intention','execution'),5,'example 2')
_t(min_distance('','abc'),3,'all inserts')
_t(min_distance('abc',''),3,'all deletes')
_t(min_distance('abc','abc'),0,'identical')
_t(min_distance('park','spake'),3,'mixed operations')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(minDistance('horse','ros'),3,'example 1');
_t(minDistance('intention','execution'),5,'example 2');
_t(minDistance('','abc'),3,'all inserts');
_t(minDistance('abc',''),3,'all deletes');
_t(minDistance('abc','abc'),0,'identical');
_t(minDistance('park','spake'),3,'mixed operations');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"regex-matching",title:"Regular Expression Matching",difficulty:"Expert",category:"Dynamic Programming",description:'Given an input string s and a pattern p, implement regular expression matching with support for "." and "*" where "." matches any single character and "*" matches zero or more of the preceding element. The matching should cover the entire input string, not partial. For example, pattern "c*a*b" matches "aab" because c* matches zero c\'s, a* matches two a\'s, and b matches b.',examples:[{input:'s = "aa", p = "a"',output:"false",explanation:'"a" does not match the entire string "aa".'},{input:'s = "aa", p = "a*"',output:"true",explanation:'"*" means zero or more of the preceding element "a", so "a*" matches "aa".'},{input:'s = "ab", p = ".*"',output:"true",explanation:'".*" means zero or more of any character.'}],constraints:["1 <= s.length <= 20","1 <= p.length <= 20","s contains only lowercase English letters",'p contains lowercase letters, "." and "*"','Each "*" is preceded by a valid character'],hints:["dp[i][j] = does s[:i] match p[:j]?",'If p[j-1] is a letter or ".": dp[i][j] = dp[i-1][j-1] and the characters match','If p[j-1] is "*": either drop "x*" entirely (dp[i][j-2]) or, when s[i-1] matches x, consume one character (dp[i-1][j])'],tags:["dynamic-programming","string","recursion"],timeComplexity:"O(m·n)",spaceComplexity:"O(m·n)",starterCode:{python:`def is_match(s, p):
    pass
`,javascript:`function isMatch(s, p) {

}
`},testCode:{python:`${a}
_t(is_match('aa','a'),False,'example 1')
_t(is_match('aa','a*'),True,'star expands')
_t(is_match('ab','.*'),True,'dot star')
_t(is_match('aab','c*a*b'),True,'zero c then two a')
_t(is_match('mississippi','mis*is*p*.'),False,'classic false case')
_t(is_match('','c*'),True,'empty string vs star')
_t(is_match('ab','.*c'),False,'trailing literal unmatched')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(isMatch('aa','a'),false,'example 1');
_t(isMatch('aa','a*'),true,'star expands');
_t(isMatch('ab','.*'),true,'dot star');
_t(isMatch('aab','c*a*b'),true,'zero c then two a');
_t(isMatch('mississippi','mis*is*p*.'),false,'classic false case');
_t(isMatch('','c*'),true,'empty string vs star');
_t(isMatch('ab','.*c'),false,'trailing literal unmatched');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"unique-paths",title:"Unique Paths",difficulty:"Intermediate",category:"Dynamic Programming",description:"There is a robot on an m x n grid. The robot is initially located at the top-left corner (grid[0][0]). The robot tries to move to the bottom-right corner (grid[m-1][n-1]). The robot can only move either down or right at any point in time. Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner. The answer is guaranteed to be at most the order of 2·10⁹ and fits in a signed 32-bit integer for the given test cases.",examples:[{input:"m = 3, n = 7",output:"28",explanation:"There are 28 distinct paths from the top-left to the bottom-right of a 3 x 7 grid."},{input:"m = 3, n = 2",output:"3",explanation:"From the top-left there are 3 ways to reach the bottom-right: Right→Down→Down, Down→Down→Right, Down→Right→Down."}],constraints:["1 <= m, n <= 100","The answer fits in a signed 32-bit integer for these inputs"],hints:["Every cell can only be reached from the cell above it or the cell to its left","dp[i][j] = dp[i-1][j] + dp[i][j-1], with the first row and first column all equal to 1","A single rolling row of length n reduces the space to O(n)"],tags:["dynamic-programming","combinatorics","math"],timeComplexity:"O(m·n)",spaceComplexity:"O(n)",starterCode:{python:`def unique_paths(m, n):
    pass
`,javascript:`function uniquePaths(m, n) {

}
`},testCode:{python:`${a}
_t(unique_paths(3,7),28,'example 1')
_t(unique_paths(3,2),3,'example 2')
_t(unique_paths(1,1),1,'single cell')
_t(unique_paths(1,10),1,'single row')
_t(unique_paths(10,10),48620,'square grid')
_t(unique_paths(23,12),193536720,'large but int32-safe')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(uniquePaths(3,7),28,'example 1');
_t(uniquePaths(3,2),3,'example 2');
_t(uniquePaths(1,1),1,'single cell');
_t(uniquePaths(1,10),1,'single row');
_t(uniquePaths(10,10),48620,'square grid');
_t(uniquePaths(23,12),193536720,'large but int32-safe');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"word-break",title:"Word Break",difficulty:"Intermediate",category:"Dynamic Programming",description:"Given a string s and a dictionary of strings word_dict, return true if s can be segmented into a space-separated sequence of one or more dictionary words. Note that the same word in the dictionary may be reused multiple times in the segmentation. The dictionary contains no duplicate words.",examples:[{input:'s = "leetcode", word_dict = ["leet","code"]',output:"true",explanation:'"leetcode" can be segmented as "leet code".'},{input:'s = "applepenapple", word_dict = ["apple","pen"]',output:"true",explanation:'"applepenapple" can be segmented as "apple pen apple"; note that "apple" is reused.'},{input:'s = "catsandog", word_dict = ["cats","dog","sand","and","cat"]',output:"false",explanation:"There is no way to segment the entire string into dictionary words."}],constraints:["1 <= s.length <= 300","1 <= word_dict.length <= 1000","1 <= word_dict[i].length <= 20","s and word_dict[i] consist of only lowercase English letters","All the strings of word_dict are unique"],hints:["dp[i] = can the prefix s[:i] be fully segmented? dp[0] = True","dp[i] is True if some j < i has dp[j] True and s[j:i] is in the dictionary","Put the dictionary in a set for O(1) membership and iterate end positions left to right"],tags:["dynamic-programming","string","hash-set"],timeComplexity:"O(n²)",spaceComplexity:"O(n)",starterCode:{python:`def word_break(s, word_dict):
    pass
`,javascript:`function wordBreak(s, wordDict) {

}
`},testCode:{python:`${a}
_t(word_break('leetcode',['leet','code']),True,'example 1')
_t(word_break('applepenapple',['apple','pen']),True,'reuse a word')
_t(word_break('catsandog',['cats','dog','sand','and','cat']),False,'cannot segment')
_t(word_break('a',['a']),True,'single letter')
_t(word_break('aaaaaaa',['aaaa','aaa']),True,'overlap split')
_t(word_break('cars',['car','ca','rs']),True,'ca + rs')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(wordBreak('leetcode',['leet','code']),true,'example 1');
_t(wordBreak('applepenapple',['apple','pen']),true,'reuse a word');
_t(wordBreak('catsandog',['cats','dog','sand','and','cat']),false,'cannot segment');
_t(wordBreak('a',['a']),true,'single letter');
_t(wordBreak('aaaaaaa',['aaaa','aaa']),true,'overlap split');
_t(wordBreak('cars',['car','ca','rs']),true,'ca + rs');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"longest-common-subsequence",title:"Longest Common Subsequence",difficulty:"Intermediate",category:"Dynamic Programming",description:"Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0. A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters. A common subsequence of two strings is a subsequence that is common to both strings.",examples:[{input:'text1 = "abcde", text2 = "ace"',output:"3",explanation:'The longest common subsequence is "ace" and its length is 3.'},{input:'text1 = "abc", text2 = "abc"',output:"3",explanation:'The longest common subsequence is "abc".'},{input:'text1 = "abc", text2 = "def"',output:"0",explanation:"There is no common subsequence, so the result is 0."}],constraints:["1 <= text1.length, text2.length <= 1000","text1 and text2 consist of only lowercase English characters"],hints:["dp[i][j] = LCS length of the first i chars of text1 and first j chars of text2","If text1[i-1] == text2[j-1], dp[i][j] = dp[i-1][j-1] + 1","Otherwise dp[i][j] = max(dp[i-1][j], dp[i][j-1])"],tags:["dynamic-programming","string"],timeComplexity:"O(m·n)",spaceComplexity:"O(m·n)",starterCode:{python:`def longest_common_subsequence(text1, text2):
    pass
`,javascript:`function longestCommonSubsequence(text1, text2) {

}
`},testCode:{python:`${a}
_t(longest_common_subsequence('abcde','ace'),3,'example 1')
_t(longest_common_subsequence('abc','abc'),3,'identical')
_t(longest_common_subsequence('abc','def'),0,'no overlap')
_t(longest_common_subsequence('bsbininm','jmjkbkjkv'),1,'single shared char')
_t(longest_common_subsequence('ezupkr','ubmrapg'),2,'mixed')
_t(longest_common_subsequence('a','a'),1,'single char match')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(longestCommonSubsequence('abcde','ace'),3,'example 1');
_t(longestCommonSubsequence('abc','abc'),3,'identical');
_t(longestCommonSubsequence('abc','def'),0,'no overlap');
_t(longestCommonSubsequence('bsbininm','jmjkbkjkv'),1,'single shared char');
_t(longestCommonSubsequence('ezupkr','ubmrapg'),2,'mixed');
_t(longestCommonSubsequence('a','a'),1,'single char match');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"decode-ways",title:"Decode Ways",difficulty:"Intermediate",category:"Dynamic Programming",description:'A message containing letters from A-Z can be encoded into numbers using the mapping "A" → "1", "B" → "2", ..., "Z" → "26". To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of this mapping (there may be many ways). For example, "11106" can be mapped into "AAJF" (1 1 10 6) or "KJF" (11 10 6); note that the grouping (1 11 06) is invalid because "06" cannot be mapped into a letter since leading zeros are not allowed. Given a string s containing only digits, return the number of ways to decode it. The answer fits in a 32-bit integer. Note that a string starting with 0 or containing an invalid standalone 0 has 0 ways.',examples:[{input:'s = "12"',output:"2",explanation:'"12" could be decoded as "AB" (1 2) or "L" (12).'},{input:'s = "226"',output:"3",explanation:'"226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).'},{input:'s = "06"',output:"0",explanation:'"06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").'}],constraints:["1 <= s.length <= 100","s contains only digits and may contain leading zero(s)"],hints:["dp[i] = number of ways to decode the prefix s[:i]; dp[0] = 1","A single digit s[i-1] contributes dp[i-1] ways when it is 1–9 (not 0)","A two-digit group s[i-2:i] contributes dp[i-2] ways when it is between 10 and 26"],tags:["dynamic-programming","string"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`def num_decodings(s):
    pass
`,javascript:`function numDecodings(s) {

}
`},testCode:{python:`${a}
_t(num_decodings('12'),2,'example 1')
_t(num_decodings('226'),3,'example 2')
_t(num_decodings('06'),0,'leading zero')
_t(num_decodings('0'),0,'just zero')
_t(num_decodings('10'),1,'ten only')
_t(num_decodings('100'),0,'invalid trailing zero')
_t(num_decodings('11106'),2,'classic multi')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(numDecodings('12'),2,'example 1');
_t(numDecodings('226'),3,'example 2');
_t(numDecodings('06'),0,'leading zero');
_t(numDecodings('0'),0,'just zero');
_t(numDecodings('10'),1,'ten only');
_t(numDecodings('100'),0,'invalid trailing zero');
_t(numDecodings('11106'),2,'classic multi');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"partition-equal-subset-sum",title:"Partition Equal Subset Sum",difficulty:"Intermediate",category:"Dynamic Programming",description:"Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal, or false otherwise. This reduces to a subset-sum problem: a valid partition exists if and only if the total sum is even and some subset sums to exactly half the total.",examples:[{input:"nums = [1,5,11,5]",output:"true",explanation:"The array can be partitioned as [1,5,5] and [11], both summing to 11."},{input:"nums = [1,2,3,5]",output:"false",explanation:"The array cannot be partitioned into equal-sum subsets."}],constraints:["1 <= nums.length <= 200","1 <= nums[i] <= 100"],hints:["If the total sum is odd, an equal partition is impossible","Reduce to: can any subset sum to total/2? This is a 0/1 knapsack on the target","Use a boolean dp over achievable sums; iterate sums downward to reuse each number at most once"],tags:["dynamic-programming","array","knapsack"],timeComplexity:"O(n·sum)",spaceComplexity:"O(sum)",starterCode:{python:`def can_partition(nums):
    pass
`,javascript:`function canPartition(nums) {

}
`},testCode:{python:`${a}
_t(can_partition([1,5,11,5]),True,'example 1')
_t(can_partition([1,2,3,5]),False,'odd-ish no split')
_t(can_partition([1,1]),True,'two equal')
_t(can_partition([1]),False,'single element')
_t(can_partition([2,2,3,5]),False,'sum is even but no subset')
_t(can_partition([3,3,3,4,5]),True,'sum 18 -> 9 each')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(canPartition([1,5,11,5]),true,'example 1');
_t(canPartition([1,2,3,5]),false,'odd-ish no split');
_t(canPartition([1,1]),true,'two equal');
_t(canPartition([1]),false,'single element');
_t(canPartition([2,2,3,5]),false,'sum is even but no subset');
_t(canPartition([3,3,3,4,5]),true,'sum 18 -> 9 each');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"burst-balloons",title:"Burst Balloons",difficulty:"Expert",category:"Dynamic Programming",description:"You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons. If you burst the i-th balloon, you will get nums[i-1] · nums[i] · nums[i+1] coins. If i-1 or i+1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it. Return the maximum coins you can collect by bursting the balloons wisely. The trick is to think about which balloon is burst LAST in a range: that fixes both of its (virtual) neighbors and splits the range into independent subproblems.",examples:[{input:"nums = [3,1,5,8]",output:"167",explanation:"Burst order [1,5,3,8]: 3·1·5 + 3·5·8 + 1·3·8 + 1·8·1 = 15 + 120 + 24 + 8 = 167."},{input:"nums = [1,5]",output:"10",explanation:"Burst 1 first (1·1·5 = 5), then 5 (1·5·1 = 5): total 10."}],constraints:["n == nums.length","1 <= n <= 300","0 <= nums[i] <= 100","Keep arrays small in practice — the DP is O(n³)"],hints:["Pad the array with a 1 on each end so boundary balloons have neighbors","dp[i][j] = max coins from bursting all balloons strictly between indices i and j (exclusive)","For each range, try every k as the LAST balloon burst: dp[i][j] = max(dp[i][k] + nums[i]·nums[k]·nums[j] + dp[k][j])"],tags:["dynamic-programming","divide-and-conquer","interval-dp"],timeComplexity:"O(n³)",spaceComplexity:"O(n²)",starterCode:{python:`def max_coins(nums):
    pass
`,javascript:`function maxCoins(nums) {

}
`},testCode:{python:`${a}
_t(max_coins([3,1,5,8]),167,'example 1')
_t(max_coins([1,5]),10,'two balloons')
_t(max_coins([5]),5,'single balloon')
_t(max_coins([7]),7,'single seven')
_t(max_coins([1,2,3,4,5]),110,'ascending')
_t(max_coins([9,76,64]),44416,'three values')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(maxCoins([3,1,5,8]),167,'example 1');
_t(maxCoins([1,5]),10,'two balloons');
_t(maxCoins([5]),5,'single balloon');
_t(maxCoins([7]),7,'single seven');
_t(maxCoins([1,2,3,4,5]),110,'ascending');
_t(maxCoins([9,76,64]),44416,'three values');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"palindrome-number",title:"Palindrome Number",difficulty:"Beginner",category:"Math & Numbers",description:"Given an integer x, return true if x is a palindrome, and false otherwise. An integer is a palindrome when it reads the same forward and backward. For example, 121 is a palindrome while 123 is not. Negative numbers are never palindromes (the minus sign only appears on the left). Follow-up: could you solve it without converting the integer to a string?",examples:[{input:"x = 121",output:"true"},{input:"x = -121",output:"false",explanation:"From left to right it reads -121; from right to left it becomes 121-, so it is not a palindrome."},{input:"x = 10",output:"false",explanation:"Reads 01 from right to left."}],constraints:["-2³¹ <= x <= 2³¹ - 1"],hints:["Negatives and (nonzero) multiples of 10 can be rejected immediately","Reverse the digits arithmetically: rev = rev*10 + x%10","You only need to reverse half the digits: stop when rev >= remaining x"],tags:["math"],timeComplexity:"O(log₁₀ x)",spaceComplexity:"O(1)",starterCode:{python:`def is_palindrome_number(x):
    pass
`,javascript:`function isPalindromeNumber(x) {

}
`},testCode:{python:`${a}
_t(is_palindrome_number(121),True,'example 1')
_t(is_palindrome_number(-121),False,'negative')
_t(is_palindrome_number(10),False,'trailing zero')
_t(is_palindrome_number(0),True,'zero')
_t(is_palindrome_number(1221),True,'even digits')
_t(is_palindrome_number(1234567899),False,'large number')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(isPalindromeNumber(121),true,'example 1');
_t(isPalindromeNumber(-121),false,'negative');
_t(isPalindromeNumber(10),false,'trailing zero');
_t(isPalindromeNumber(0),true,'zero');
_t(isPalindromeNumber(1221),true,'even digits');
_t(isPalindromeNumber(1234567899),false,'large number');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"basic-calculator",title:"Basic Calculator",difficulty:"Expert",category:"Math & Numbers",description:'Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation. The expression may contain digits, "+", "-", "(", ")", and spaces. The unary minus is allowed (e.g. "-(2+3)"). You are NOT allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().',examples:[{input:'s = "1 + 1"',output:"2"},{input:'s = " 2-1 + 2 "',output:"3"},{input:'s = "(1+(4+5+2)-3)+(6+8)"',output:"23",explanation:"Parentheses group sub-expressions; evaluate inside-out."}],constraints:["1 <= s.length <= 3·10⁵",'s consists of digits, "+", "-", "(", ")" and spaces',"s represents a valid expression","The answer fits in a 32-bit integer"],hints:["Track a running result and a sign (+1/-1) for the next operand",'On "(" push the current result and sign onto a stack and start fresh; on ")" pop and combine',"Multi-digit numbers: accumulate digits until a non-digit appears"],tags:["math","stack","string","parsing"],timeComplexity:"O(n)",spaceComplexity:"O(n)",starterCode:{python:`def calculate(s):
    pass
`,javascript:`function calculate(s) {

}
`},testCode:{python:`${a}
_t(calculate('1 + 1'),2,'example 1')
_t(calculate(' 2-1 + 2 '),3,'example 2')
_t(calculate('(1+(4+5+2)-3)+(6+8)'),23,'nested parens')
_t(calculate('-2+ 1'),-1,'unary minus')
_t(calculate('- (3 + (4 + 5))'),-12,'unary minus on group')
_t(calculate('2147483647'),2147483647,'single big number')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(calculate('1 + 1'),2,'example 1');
_t(calculate(' 2-1 + 2 '),3,'example 2');
_t(calculate('(1+(4+5+2)-3)+(6+8)'),23,'nested parens');
_t(calculate('-2+ 1'),-1,'unary minus');
_t(calculate('- (3 + (4 + 5))'),-12,'unary minus on group');
_t(calculate('2147483647'),2147483647,'single big number');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"happy-number",title:"Happy Number",difficulty:"Beginner",category:"Math & Numbers",description:"Write an algorithm to determine if a number n is happy. A happy number is a number defined by the following process: starting with any positive integer, replace the number by the sum of the squares of its digits; repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy. Return true if n is a happy number, and false if not.",examples:[{input:"n = 19",output:"true",explanation:"1² + 9² = 82, 8² + 2² = 68, 6² + 8² = 100, 1² + 0² + 0² = 1."},{input:"n = 2",output:"false",explanation:"The process falls into a cycle that never reaches 1."}],constraints:["1 <= n <= 2³¹ - 1"],hints:["Define a step that replaces n with the sum of the squares of its digits","Detect cycles with a seen-set, or with Floyd's slow/fast pointers","You reach 1 (happy) or revisit a number (unhappy)"],tags:["math","hash-table","two-pointers","cycle-detection"],timeComplexity:"O(log n)",spaceComplexity:"O(log n)",starterCode:{python:`def is_happy(n):
    pass
`,javascript:`function isHappy(n) {

}
`},testCode:{python:`${a}
_t(is_happy(19),True,'example 1')
_t(is_happy(2),False,'example 2')
_t(is_happy(1),True,'one is happy')
_t(is_happy(7),True,'seven is happy')
_t(is_happy(4),False,'four enters the cycle')
_t(is_happy(100),True,'power of ten')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(isHappy(19),true,'example 1');
_t(isHappy(2),false,'example 2');
_t(isHappy(1),true,'one is happy');
_t(isHappy(7),true,'seven is happy');
_t(isHappy(4),false,'four enters the cycle');
_t(isHappy(100),true,'power of ten');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"pow-x-n",title:"Pow(x, n)",difficulty:"Intermediate",category:"Math & Numbers",description:"Implement pow(x, n), which calculates x raised to the power n (i.e. xⁿ). The exponent n may be negative, in which case the result is the reciprocal 1 / x^(-n). A naive loop multiplying x by itself n times is O(n); fast exponentiation (exponentiation by squaring) reduces this to O(log n) by repeatedly squaring the base and halving the exponent. Because results are floating point, the hidden tests compare integer values obtained AFTER rounding, so your answer only needs to be accurate to a small tolerance.",examples:[{input:"x = 2.00000, n = 10",output:"1024.00000"},{input:"x = 2.10000, n = 3",output:"9.26100"},{input:"x = 2.00000, n = -2",output:"0.25000",explanation:"2^(-2) = 1 / 2² = 1 / 4 = 0.25."}],constraints:["-100.0 < x < 100.0","-2³¹ <= n <= 2³¹ - 1","n is an integer","Either x is not zero or n > 0","-10⁴ <= xⁿ <= 10⁴"],hints:["Handle a negative exponent by inverting: x^n = (1/x)^(-n)","Exponentiation by squaring: if n is even, x^n = (x²)^(n/2); if odd, x^n = x · x^(n-1)","Be careful taking -n when n is the most negative int; use a long/while-based decomposition"],tags:["math","recursion","divide-and-conquer"],timeComplexity:"O(log n)",spaceComplexity:"O(log n)",starterCode:{python:`def my_pow(x, n):
    pass
`,javascript:`function myPow(x, n) {

}
`},testCode:{python:`${a}
_t(round(my_pow(2.0,10)),1024,'two to the tenth')
_t(round(my_pow(2.0,0)),1,'exponent zero')
_t(round(my_pow(2.0,-2)*10000),2500,'negative exponent reciprocal')
_t(round(my_pow(3.0,5)),243,'three to the fifth')
_t(round(my_pow(0.5,4)*10000),625,'fractional base')
_t(round(my_pow(2.1,3)*100000),926100,'non-integer base')
_t(round(my_pow(1.0,2147483647)),1,'one to a huge power')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(Math.round(myPow(2.0,10)),1024,'two to the tenth');
_t(Math.round(myPow(2.0,0)),1,'exponent zero');
_t(Math.round(myPow(2.0,-2)*10000),2500,'negative exponent reciprocal');
_t(Math.round(myPow(3.0,5)),243,'three to the fifth');
_t(Math.round(myPow(0.5,4)*10000),625,'fractional base');
_t(Math.round(myPow(2.1,3)*100000),926100,'non-integer base');
_t(Math.round(myPow(1.0,2147483647)),1,'one to a huge power');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"single-number",title:"Single Number",difficulty:"Beginner",category:"Bit Manipulation",description:"Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space — a hash map satisfies neither the space requirement nor the spirit of the problem.",examples:[{input:"nums = [2,2,1]",output:"1"},{input:"nums = [4,1,2,1,2]",output:"4"},{input:"nums = [1]",output:"1"}],constraints:["1 <= nums.length <= 3·10⁴","-3·10⁴ <= nums[i] <= 3·10⁴","Each element appears twice except one","O(n) time, O(1) space required"],hints:["XOR of a number with itself is 0; XOR with 0 is the number itself","XOR is commutative and associative — order does not matter","XOR everything together: pairs cancel, leaving the single number"],tags:["bit-manipulation","xor","array"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`def single_number(nums):
    pass
`,javascript:`function singleNumber(nums) {

}
`},testCode:{python:`${a}
_t(single_number([2,2,1]),1,'example 1')
_t(single_number([4,1,2,1,2]),4,'example 2')
_t(single_number([1]),1,'single element')
_t(single_number([-1,-1,7]),7,'negative pairs')
_t(single_number([0,1,0]),1,'zero pair')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(singleNumber([2,2,1]),1,'example 1');
_t(singleNumber([4,1,2,1,2]),4,'example 2');
_t(singleNumber([1]),1,'single element');
_t(singleNumber([-1,-1,7]),7,'negative pairs');
_t(singleNumber([0,1,0]),1,'zero pair');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"counting-bits",title:"Counting Bits",difficulty:"Intermediate",category:"Bit Manipulation",description:"Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1 bits in the binary representation of i. Follow-up: it is very easy to come up with a solution with O(n log n) runtime (popcount per number) — can you do it in a single pass in O(n) using the results you have already computed?",examples:[{input:"n = 2",output:"[0,1,1]",explanation:"0 → 0b0 (0 ones), 1 → 0b1 (1), 2 → 0b10 (1)."},{input:"n = 5",output:"[0,1,1,2,1,2]",explanation:"3 → 0b11 (2), 4 → 0b100 (1), 5 → 0b101 (2)."}],constraints:["0 <= n <= 10⁵"],hints:["i >> 1 is i with its last bit dropped","ans[i] = ans[i >> 1] + (i & 1)","Equivalently ans[i] = ans[i & (i-1)] + 1, since i & (i-1) clears the lowest set bit"],tags:["bit-manipulation","dynamic-programming"],timeComplexity:"O(n)",spaceComplexity:"O(n)",starterCode:{python:`def count_bits(n):
    pass
`,javascript:`function countBits(n) {

}
`},testCode:{python:`${a}
_t(count_bits(2),[0,1,1],'example 1')
_t(count_bits(5),[0,1,1,2,1,2],'example 2')
_t(count_bits(0),[0],'just zero')
_t(count_bits(8),[0,1,1,2,1,2,2,3,1],'powers of two reset')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(countBits(2),[0,1,1],'example 1');
_t(countBits(5),[0,1,1,2,1,2],'example 2');
_t(countBits(0),[0],'just zero');
_t(countBits(8),[0,1,1,2,1,2,2,3,1],'powers of two reset');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"number-of-1-bits",title:"Number of 1 Bits",difficulty:"Beginner",category:"Bit Manipulation",description:"Write a function that takes a non-negative integer n and returns the number of 1 bits it has in its binary representation (also known as the Hamming weight or popcount). For this problem the input fits within an unsigned 31-bit range so the value is safe as a signed 32-bit integer in every language.",examples:[{input:"n = 11",output:"3",explanation:"The binary representation of 11 is 1011, which has three 1 bits."},{input:"n = 128",output:"1",explanation:"The binary representation of 128 is 10000000, which has a single 1 bit."},{input:"n = 0",output:"0",explanation:"Zero has no 1 bits."}],constraints:["0 <= n <= 2³¹ - 1"],hints:["Inspect the lowest bit with n & 1, then shift n right by one","Repeat until n becomes 0, accumulating the set bits","Brian Kernighan trick: n & (n - 1) clears the lowest set bit, so the loop runs once per 1 bit"],tags:["bit-manipulation","popcount"],timeComplexity:"O(number of set bits)",spaceComplexity:"O(1)",starterCode:{python:`def hamming_weight(n):
    pass
`,javascript:`function hammingWeight(n) {

}
`},testCode:{python:`${a}
_t(hamming_weight(11),3,'example 1')
_t(hamming_weight(128),1,'single bit')
_t(hamming_weight(0),0,'zero')
_t(hamming_weight(7),3,'three low bits')
_t(hamming_weight(2147483647),31,'all 31 bits set')
_t(hamming_weight(1),1,'one')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(hammingWeight(11),3,'example 1');
_t(hammingWeight(128),1,'single bit');
_t(hammingWeight(0),0,'zero');
_t(hammingWeight(7),3,'three low bits');
_t(hammingWeight(2147483647),31,'all 31 bits set');
_t(hammingWeight(1),1,'one');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"missing-number",title:"Missing Number",difficulty:"Beginner",category:"Bit Manipulation",description:"Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array. Can you implement a solution using only O(1) extra space complexity and O(n) runtime complexity? Both the XOR trick (XOR all indices and values) and the Gauss sum formula (n·(n+1)/2 minus the array sum) achieve this.",examples:[{input:"nums = [3,0,1]",output:"2",explanation:"n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number."},{input:"nums = [0,1]",output:"2",explanation:"n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number."},{input:"nums = [9,6,4,2,3,5,7,0,1]",output:"8",explanation:"n = 9; 8 is the missing number in the range [0,9]."}],constraints:["n == nums.length","1 <= n <= 10⁴","0 <= nums[i] <= n","All the numbers of nums are unique"],hints:["The expected sum of 0..n is n·(n+1)/2; subtract the actual sum to find the missing value","Alternatively XOR all indices 0..n together with all array values","Every present number cancels, leaving only the missing one"],tags:["bit-manipulation","xor","array","math"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`def missing_number(nums):
    pass
`,javascript:`function missingNumber(nums) {

}
`},testCode:{python:`${a}
_t(missing_number([3,0,1]),2,'example 1')
_t(missing_number([0,1]),2,'missing at end')
_t(missing_number([9,6,4,2,3,5,7,0,1]),8,'example 3')
_t(missing_number([0]),1,'missing one of [0,1]')
_t(missing_number([1]),0,'missing zero')
_t(missing_number([0,2]),1,'missing middle')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(missingNumber([3,0,1]),2,'example 1');
_t(missingNumber([0,1]),2,'missing at end');
_t(missingNumber([9,6,4,2,3,5,7,0,1]),8,'example 3');
_t(missingNumber([0]),1,'missing one of [0,1]');
_t(missingNumber([1]),0,'missing zero');
_t(missingNumber([0,2]),1,'missing middle');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"binary-search",title:"Binary Search",difficulty:"Beginner",category:"Sorting & Searching",description:"Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity — a linear scan does not count.",examples:[{input:"nums = [-1,0,3,5,9,12], target = 9",output:"4",explanation:"9 exists in nums and its index is 4."},{input:"nums = [-1,0,3,5,9,12], target = 2",output:"-1",explanation:"2 does not exist in nums."}],constraints:["1 <= nums.length <= 10⁴","-10⁴ < nums[i], target < 10⁴","All integers in nums are unique","nums is sorted in ascending order"],hints:["Maintain lo and hi bounds; inspect the middle element","If nums[mid] < target search the right half, if greater search the left","Watch the loop condition (lo <= hi) and mid computation to avoid off-by-one bugs"],tags:["array","binary-search"],timeComplexity:"O(log n)",spaceComplexity:"O(1)",starterCode:{python:`def search(nums, target):
    pass
`,javascript:`function search(nums, target) {

}
`},testCode:{python:`${a}
_t(search([-1,0,3,5,9,12],9),4,'example 1')
_t(search([-1,0,3,5,9,12],2),-1,'not found')
_t(search([5],5),0,'single element hit')
_t(search([5],-5),-1,'single element miss')
_t(search([1,3],3),1,'two elements right')
_t(search([1,3],1),0,'two elements left')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(search([-1,0,3,5,9,12],9),4,'example 1');
_t(search([-1,0,3,5,9,12],2),-1,'not found');
_t(search([5],5),0,'single element hit');
_t(search([5],-5),-1,'single element miss');
_t(search([1,3],3),1,'two elements right');
_t(search([1,3],1),0,'two elements left');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"search-rotated-array",title:"Search in Rotated Sorted Array",difficulty:"Intermediate",category:"Sorting & Searching",description:"There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k so that it becomes [nums[k], ..., nums[n-1], nums[0], ..., nums[k-1]]. Given the rotated array nums and an integer target, return the index of target if it is in nums, or -1 if it is not. You must write an algorithm with O(log n) runtime complexity.",examples:[{input:"nums = [4,5,6,7,0,1,2], target = 0",output:"4"},{input:"nums = [4,5,6,7,0,1,2], target = 3",output:"-1"},{input:"nums = [1], target = 0",output:"-1"}],constraints:["1 <= nums.length <= 5000","-10⁴ <= nums[i] <= 10⁴","All values of nums are unique","nums was sorted ascending, then possibly rotated"],hints:["At any mid, at least one half of the array is properly sorted","Check which half is sorted by comparing nums[lo] with nums[mid]","If target lies inside the sorted half's range, search there; otherwise search the other half"],tags:["array","binary-search"],timeComplexity:"O(log n)",spaceComplexity:"O(1)",starterCode:{python:`def search_rotated(nums, target):
    pass
`,javascript:`function searchRotated(nums, target) {

}
`},testCode:{python:`${a}
_t(search_rotated([4,5,6,7,0,1,2],0),4,'example 1')
_t(search_rotated([4,5,6,7,0,1,2],3),-1,'not present')
_t(search_rotated([1],0),-1,'single miss')
_t(search_rotated([3,1],1),1,'two rotated')
_t(search_rotated([5,1,3],5),0,'target at pivot start')
_t(search_rotated([1,2,3,4,5],4),3,'no rotation')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(searchRotated([4,5,6,7,0,1,2],0),4,'example 1');
_t(searchRotated([4,5,6,7,0,1,2],3),-1,'not present');
_t(searchRotated([1],0),-1,'single miss');
_t(searchRotated([3,1],1),1,'two rotated');
_t(searchRotated([5,1,3],5),0,'target at pivot start');
_t(searchRotated([1,2,3,4,5],4),3,'no rotation');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"kth-largest-element",title:"Kth Largest Element in an Array",difficulty:"Intermediate",category:"Sorting & Searching",description:"Given an integer array nums and an integer k, return the k-th largest element in the array. Note that it is the k-th largest element in sorted order, not the k-th distinct element. Can you solve it without fully sorting the array? A min-heap of size k gives O(n log k); quickselect averages O(n).",examples:[{input:"nums = [3,2,1,5,6,4], k = 2",output:"5",explanation:"Sorted descending: [6,5,4,3,2,1]; the 2nd largest is 5."},{input:"nums = [3,2,3,1,2,4,5,5,6], k = 4",output:"4",explanation:"Duplicates count: descending [6,5,5,4,...], the 4th is 4."}],constraints:["1 <= k <= nums.length <= 10⁵","-10⁴ <= nums[i] <= 10⁴"],hints:["Full sort is O(n log n) — fine as a first pass, but you can do better","Keep a min-heap of the k largest seen so far; its root is the answer","Quickselect: partition like quicksort but recurse into only one side"],tags:["array","heap","quickselect","sorting"],timeComplexity:"O(n) average",spaceComplexity:"O(k)",starterCode:{python:`import heapq

def find_kth_largest(nums, k):
    pass
`,javascript:`function findKthLargest(nums, k) {

}
`},testCode:{python:`${a}
_t(find_kth_largest([3,2,1,5,6,4],2),5,'example 1')
_t(find_kth_largest([3,2,3,1,2,4,5,5,6],4),4,'with duplicates')
_t(find_kth_largest([1],1),1,'single element')
_t(find_kth_largest([7,6,5,4,3,2,1],5),3,'descending input')
_t(find_kth_largest([2,1],2),1,'k equals length')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(findKthLargest([3,2,1,5,6,4],2),5,'example 1');
_t(findKthLargest([3,2,3,1,2,4,5,5,6],4),4,'with duplicates');
_t(findKthLargest([1],1),1,'single element');
_t(findKthLargest([7,6,5,4,3,2,1],5),3,'descending input');
_t(findKthLargest([2,1],2),1,'k equals length');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"median-two-sorted-arrays",title:"Median of Two Sorted Arrays",difficulty:"Expert",category:"Sorting & Searching",description:"Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log(m+n)). Merging the arrays is O(m+n) and does not meet the bar — the intended solution binary-searches the partition point of the smaller array. Return the median as a float.",examples:[{input:"nums1 = [1,3], nums2 = [2]",output:"2.0",explanation:"Merged array = [1,2,3], median is 2."},{input:"nums1 = [1,2], nums2 = [3,4]",output:"2.5",explanation:"Merged array = [1,2,3,4], median is (2 + 3) / 2 = 2.5."}],constraints:["nums1.length == m, nums2.length == n","0 <= m, n <= 1000","1 <= m + n <= 2000","-10⁶ <= nums1[i], nums2[i] <= 10⁶","Both arrays sorted ascending"],hints:["Binary search the smaller array for a cut position i; the other cut j is determined by (m+n+1)/2 - i","The cut is correct when maxLeft1 <= minRight2 and maxLeft2 <= minRight1","Handle empty sides with ±infinity sentinels; odd totals take max of lefts, even totals average the two middles"],tags:["array","binary-search","divide-and-conquer"],timeComplexity:"O(log min(m,n))",spaceComplexity:"O(1)",starterCode:{python:`def find_median_sorted_arrays(nums1, nums2):
    pass
`,javascript:`function findMedianSortedArrays(nums1, nums2) {

}
`},testCode:{python:`${a}
_t(find_median_sorted_arrays([1,3],[2]),2.0,'example 1')
_t(find_median_sorted_arrays([1,2],[3,4]),2.5,'example 2')
_t(find_median_sorted_arrays([0,0],[0,0]),0.0,'all zeros')
_t(find_median_sorted_arrays([],[1]),1.0,'first empty')
_t(find_median_sorted_arrays([2],[]),2.0,'second empty')
_t(find_median_sorted_arrays([1,2],[-1,3]),1.5,'interleaved')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(findMedianSortedArrays([1,3],[2]),2,'example 1');
_t(findMedianSortedArrays([1,2],[3,4]),2.5,'example 2');
_t(findMedianSortedArrays([0,0],[0,0]),0,'all zeros');
_t(findMedianSortedArrays([],[1]),1,'first empty');
_t(findMedianSortedArrays([2],[]),2,'second empty');
_t(findMedianSortedArrays([1,2],[-1,3]),1.5,'interleaved');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"find-min-rotated",title:"Find Minimum in Rotated Sorted Array",difficulty:"Intermediate",category:"Sorting & Searching",description:"Suppose an array of length n sorted in ascending order with distinct values is rotated between 1 and n times. Given the rotated sorted array nums of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time — scanning the array is O(n) and does not meet the bar.",examples:[{input:"nums = [3,4,5,1,2]",output:"1",explanation:"The original array was [1,2,3,4,5] rotated 3 times; the minimum is 1."},{input:"nums = [4,5,6,7,0,1,2]",output:"0",explanation:"The original array was [0,1,2,4,5,6,7] rotated 4 times; the minimum is 0."},{input:"nums = [11,13,15,17]",output:"11",explanation:"The array was rotated 4 times (back to sorted); the minimum is the first element 11."}],constraints:["n == nums.length","1 <= n <= 5000","-5000 <= nums[i] <= 5000","All the integers of nums are unique","nums is sorted ascending then rotated between 1 and n times"],hints:["The minimum is the only element smaller than its predecessor (the rotation pivot)","Compare nums[mid] with nums[hi]: if nums[mid] > nums[hi], the pivot is to the right","Otherwise the minimum is at mid or to its left; shrink hi to mid"],tags:["array","binary-search"],timeComplexity:"O(log n)",spaceComplexity:"O(1)",starterCode:{python:`def find_min(nums):
    pass
`,javascript:`function findMin(nums) {

}
`},testCode:{python:`${a}
_t(find_min([3,4,5,1,2]),1,'example 1')
_t(find_min([4,5,6,7,0,1,2]),0,'example 2')
_t(find_min([11,13,15,17]),11,'no effective rotation')
_t(find_min([2,1]),1,'two elements')
_t(find_min([1]),1,'single element')
_t(find_min([5,1,2,3,4]),1,'pivot near start')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(findMin([3,4,5,1,2]),1,'example 1');
_t(findMin([4,5,6,7,0,1,2]),0,'example 2');
_t(findMin([11,13,15,17]),11,'no effective rotation');
_t(findMin([2,1]),1,'two elements');
_t(findMin([1]),1,'single element');
_t(findMin([5,1,2,3,4]),1,'pivot near start');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"search-2d-matrix",title:"Search a 2D Matrix",difficulty:"Intermediate",category:"Sorting & Searching",description:"You are given an m x n integer matrix with two properties: each row is sorted in non-decreasing order, and the first integer of each row is greater than the last integer of the previous row. Given an integer target, return true if target is in the matrix or false otherwise. You must write a solution in O(log(m·n)) time — because the matrix reads as one fully sorted sequence row by row, a single binary search over the m·n virtual indices works.",examples:[{input:"matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",output:"true",explanation:"3 is present in the first row."},{input:"matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13",output:"false",explanation:"13 is not present in the matrix."}],constraints:["m == matrix.length","n == matrix[i].length","1 <= m, n <= 100","-10⁴ <= matrix[i][j], target <= 10⁴"],hints:["Treat the matrix as a flat sorted array of length m·n","Map a flat index idx to row = idx // n and column = idx % n","Binary search the range [0, m·n - 1] comparing matrix[row][col] with target"],tags:["array","binary-search","matrix"],timeComplexity:"O(log(m·n))",spaceComplexity:"O(1)",starterCode:{python:`def search_matrix(matrix, target):
    pass
`,javascript:`function searchMatrix(matrix, target) {

}
`},testCode:{python:`${a}
_m=[[1,3,5,7],[10,11,16,20],[23,30,34,60]]
_t(search_matrix(_m,3),True,'example 1')
_t(search_matrix(_m,13),False,'example 2')
_t(search_matrix(_m,1),True,'top-left corner')
_t(search_matrix(_m,60),True,'bottom-right corner')
_t(search_matrix([[1]],1),True,'single hit')
_t(search_matrix([[1]],2),False,'single miss')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
const _m=[[1,3,5,7],[10,11,16,20],[23,30,34,60]];
_t(searchMatrix(_m,3),true,'example 1');
_t(searchMatrix(_m,13),false,'example 2');
_t(searchMatrix(_m,1),true,'top-left corner');
_t(searchMatrix(_m,60),true,'bottom-right corner');
_t(searchMatrix([[1]],1),true,'single hit');
_t(searchMatrix([[1]],2),false,'single miss');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"koko-eating-bananas",title:"Koko Eating Bananas",difficulty:"Intermediate",category:"Sorting & Searching",description:"Koko loves to eat bananas. There are n piles of bananas, the i-th pile has piles[i] bananas. The guards have gone and will come back in h hours. Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile and eats k bananas from it. If the pile has fewer than k bananas, she eats all of them and will not eat any more during that hour. Koko likes to eat slowly but still wants to finish all the bananas before the guards return. Return the minimum integer k such that she can eat all the bananas within h hours. The answer is found by binary-searching the eating speed (the answer space), since the hours needed are monotonically non-increasing in k.",examples:[{input:"piles = [3,6,7,11], h = 8",output:"4",explanation:"At speed 4, hours = 1 + 2 + 2 + 3 = 8, exactly within the limit; speed 3 would need 1+2+3+4 = 10 hours."},{input:"piles = [30,11,23,4,20], h = 5",output:"30",explanation:"With only 5 hours (one pile per hour), Koko must eat the largest pile in a single hour, so k = 30."},{input:"piles = [30,11,23,4,20], h = 6",output:"23",explanation:"With 6 hours she can split: speed 23 needs 2+1+1+1+1 = 6 hours."}],constraints:["1 <= piles.length <= 10⁴","piles.length <= h <= 10⁹","1 <= piles[i] <= 10⁹","The answer fits in a signed 32-bit integer"],hints:["The feasible speeds range from 1 to max(piles); larger k never needs more hours","For a candidate speed k, hours = Σ ceil(piles[i] / k)","Binary search the smallest k whose required hours is <= h"],tags:["array","binary-search"],timeComplexity:"O(n log max(piles))",spaceComplexity:"O(1)",starterCode:{python:`def min_eating_speed(piles, h):
    pass
`,javascript:`function minEatingSpeed(piles, h) {

}
`},testCode:{python:`${a}
_t(min_eating_speed([3,6,7,11],8),4,'example 1')
_t(min_eating_speed([30,11,23,4,20],5),30,'one pile per hour')
_t(min_eating_speed([30,11,23,4,20],6),23,'six hours')
_t(min_eating_speed([1,1,1,999],1002),1,'plenty of time')
_t(min_eating_speed([312884470],968709470),1,'single huge pile, slow ok')
_t(min_eating_speed([3],3),1,'single pile slow')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(minEatingSpeed([3,6,7,11],8),4,'example 1');
_t(minEatingSpeed([30,11,23,4,20],5),30,'one pile per hour');
_t(minEatingSpeed([30,11,23,4,20],6),23,'six hours');
_t(minEatingSpeed([1,1,1,999],1002),1,'plenty of time');
_t(minEatingSpeed([312884470],968709470),1,'single huge pile, slow ok');
_t(minEatingSpeed([3],3),1,'single pile slow');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"count-smaller-after-self",title:"Count of Smaller Numbers After Self",difficulty:"Expert",category:"Sorting & Searching",description:"Given an integer array nums, return an integer array counts where counts[i] is the number of elements to the right of nums[i] that are strictly smaller than nums[i]. A brute-force O(n²) scan is too slow for the largest inputs; the intended approaches use a modified merge sort that counts inversions, or a Binary Indexed Tree / Fenwick tree over coordinate-compressed values, both O(n log n).",examples:[{input:"nums = [5,2,6,1]",output:"[2,1,1,0]",explanation:"To the right of 5 there are 2 smaller (2 and 1); right of 2 there is 1 smaller (1); right of 6 there is 1 smaller (1); right of 1 there are 0 smaller."},{input:"nums = [-1,-1]",output:"[0,0]",explanation:"Neither -1 has a strictly smaller element to its right."},{input:"nums = [-1]",output:"[0]",explanation:"A single element has nothing to its right."}],constraints:["1 <= nums.length <= 10⁵","-10⁴ <= nums[i] <= 10⁴"],hints:["Brute force compares each pair — O(n²); use divide and conquer instead","During a merge sort, when an element from the right half is placed before elements remaining in the left half, those left elements each gained a smaller-to-the-right count","Track original indices through the sort so counts land in the right output slot; a Fenwick tree over compressed values is an alternative"],tags:["array","merge-sort","binary-indexed-tree","divide-and-conquer"],timeComplexity:"O(n log n)",spaceComplexity:"O(n)",starterCode:{python:`def count_smaller(nums):
    pass
`,javascript:`function countSmaller(nums) {

}
`},testCode:{python:`${a}
_t(count_smaller([5,2,6,1]),[2,1,1,0],'example 1')
_t(count_smaller([-1,-1]),[0,0],'equal values, none strictly smaller')
_t(count_smaller([-1]),[0],'single element')
_t(count_smaller([1,2,3,4]),[0,0,0,0],'ascending')
_t(count_smaller([4,3,2,1]),[3,2,1,0],'descending')
_t(count_smaller([2,0,1]),[2,0,0],'mixed')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(countSmaller([5,2,6,1]),[2,1,1,0],'example 1');
_t(countSmaller([-1,-1]),[0,0],'equal values, none strictly smaller');
_t(countSmaller([-1]),[0],'single element');
_t(countSmaller([1,2,3,4]),[0,0,0,0],'ascending');
_t(countSmaller([4,3,2,1]),[3,2,1,0],'descending');
_t(countSmaller([2,0,1]),[2,0,0],'mixed');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"min-stack",title:"Min Stack",difficulty:"Beginner",category:"OOP & Design",description:"Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Implement the MinStack class with: push(val) pushes the element val onto the stack; pop() removes the element on the top; top() gets the top element; get_min() retrieves the minimum element. You must implement a solution with O(1) time complexity for EACH function — recomputing the minimum on demand is O(n) and does not count.",examples:[{input:"push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()",output:"[-3, 0, -2]",explanation:"getMin returns -3; after popping -3, top is 0 and the minimum becomes -2."}],constraints:["-2³¹ <= val <= 2³¹ - 1","pop, top and get_min are always called on non-empty stacks","At most 3·10⁴ calls total","Every operation must be O(1)"],hints:["Keep a second stack holding the minimum alongside each element","On push, store min(val, current min) on the min-stack; on pop, pop both","get_min is then just the top of the min-stack"],tags:["stack","design"],timeComplexity:"O(1) per op",spaceComplexity:"O(n)",starterCode:{python:`class MinStack:
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
`,javascript:`class MinStack {
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
`},testCode:{python:`${a}
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
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
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
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"lru-cache",title:"LRU Cache",difficulty:"Intermediate",category:"OOP & Design",description:'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class: LRUCache(capacity) initializes the cache with positive size capacity; get(key) returns the value of the key if it exists, otherwise -1; put(key, value) updates the value if the key exists, otherwise adds the pair — and if the number of keys exceeds capacity, evicts the least recently used key. Both get and put count as "use". The functions get and put must each run in O(1) average time complexity.',examples:[{input:"LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2); put(4,4); get(1); get(3); get(4)",output:"[1, -1, -1, 3, 4]",explanation:"put(3,3) evicts key 2 (least recently used since get(1) refreshed key 1); put(4,4) then evicts key 1."}],constraints:["1 <= capacity <= 3000","0 <= key <= 10⁴","0 <= value <= 10⁵","At most 2·10⁵ calls to get and put","get and put must be O(1) average"],hints:["A hash map gives O(1) lookup; a doubly linked list gives O(1) reordering and eviction","Map keys to list nodes; move a node to the front on every access","In Python, collections.OrderedDict (move_to_end / popitem) implements exactly this; in JS the built-in Map preserves insertion order"],tags:["hash-map","linked-list","design"],timeComplexity:"O(1) per op",spaceComplexity:"O(capacity)",starterCode:{python:`from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        pass

    def get(self, key):
        pass

    def put(self, key, value):
        pass
`,javascript:`class LRUCache {
  constructor(capacity) {

  }

  get(key) {

  }

  put(key, value) {

  }
}
`},testCode:{python:`${a}
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
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
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
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"implement-trie",title:"Implement Trie (Prefix Tree)",difficulty:"Intermediate",category:"OOP & Design",description:'A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a set of strings. Implement the Trie class: Trie() initializes the trie object; insert(word) inserts the string word into the trie; search(word) returns true if the string word is in the trie (i.e. was inserted before), and false otherwise; starts_with(prefix) (startsWith in JavaScript) returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise. Each operation runs in O(L) time where L is the length of the word or prefix.',examples:[{input:'insert("apple"); search("apple"); search("app"); startsWith("app"); insert("app"); search("app")',output:"[true, false, true, true]",explanation:'search("apple") → true; search("app") → false (only "apple" inserted so far); startsWith("app") → true; after insert("app"), search("app") → true.'}],constraints:["1 <= word.length, prefix.length <= 2000","word and prefix consist only of lowercase English letters","At most 3·10⁴ calls in total to insert, search and starts_with"],hints:["Each node holds a map from a character to a child node plus a flag marking the end of a word","insert walks/creates nodes for each character, then sets the end-of-word flag on the last node","search must also verify the end-of-word flag; starts_with only needs the path to exist"],tags:["trie","tree","design","hash-map"],timeComplexity:"O(L) per op",spaceComplexity:"O(total characters)",starterCode:{python:`class Trie:
    def __init__(self):
        pass

    def insert(self, word):
        pass

    def search(self, word):
        pass

    def starts_with(self, prefix):
        pass
`,javascript:`class Trie {
  constructor() {

  }

  insert(word) {

  }

  search(word) {

  }

  startsWith(prefix) {

  }
}
`},testCode:{python:`${a}
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
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
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
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"queue-using-stacks",title:"Implement Queue using Stacks",difficulty:"Beginner",category:"OOP & Design",description:"Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue: push, peek, pop, and empty. Implement the MyQueue class: push(x) pushes element x to the back of the queue; pop() removes the element from the front of the queue and returns it; peek() returns the element at the front of the queue; empty() returns true if the queue is empty, false otherwise. You must use only standard stack operations (push to top, peek/pop from top, size, is-empty). Follow-up: can you implement the queue such that each operation is amortized O(1) time complexity? Even though pop or peek may occasionally take O(n), the average over a sequence of operations is O(1) by moving elements between an input and output stack only when the output stack is empty.",examples:[{input:"push(1); push(2); peek(); pop(); empty()",output:"[1, 1, false]",explanation:"peek() → 1 (front); pop() → 1 (removes front); empty() → false (2 still queued)."}],constraints:["1 <= x <= 9","At most 100 calls will be made to push, pop, peek, and empty","All the calls to pop and peek are valid (the queue is non-empty)"],hints:["Use one stack for incoming pushes and another for outgoing pops","When you need the front and the output stack is empty, pour the entire input stack into the output stack to reverse the order","Each element moves between stacks at most once, giving amortized O(1) per operation"],tags:["stack","queue","design"],timeComplexity:"O(1) amortized per op",spaceComplexity:"O(n)",starterCode:{python:`class MyQueue:
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
`,javascript:`class MyQueue {
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
`},testCode:{python:`${a}
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
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
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
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"subsets",title:"Subsets",difficulty:"Intermediate",category:"Recursion & Backtracking",description:"Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order (the tests normalize ordering). An array of n unique elements has exactly 2ⁿ subsets, including the empty set and the full set.",examples:[{input:"nums = [1,2,3]",output:"[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",explanation:"All 2³ = 8 subsets."},{input:"nums = [0]",output:"[[],[0]]"}],constraints:["1 <= nums.length <= 10","-10 <= nums[i] <= 10","All the numbers of nums are unique"],hints:["Backtrack: at each index choose to include or exclude the element","Record the current path at every node of the recursion tree, not just the leaves","Iterative alternative: start with [[]] and for each num, append num to a copy of every existing subset"],tags:["backtracking","recursion","bit-manipulation"],timeComplexity:"O(n·2ⁿ)",spaceComplexity:"O(n)",starterCode:{python:`def subsets(nums):
    pass
`,javascript:`function subsets(nums) {

}
`},testCode:{python:`_norm=lambda a:sorted(sorted(s) for s in a)
${a}
_t(_norm(subsets([1,2,3])),[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]],'example 1')
_t(_norm(subsets([0])),[[],[0]],'single element')
_t(len(subsets([1,2,3,4,5])),32,'2^5 subsets')
print(f'{_p}/{_n} tests passed')`,javascript:`const _norm=a=>a.map(s=>[...s].sort((x,y)=>x-y)).sort((x,y)=>{const m=Math.min(x.length,y.length);for(let i=0;i<m;i++){if(x[i]!==y[i])return x[i]-y[i];}return x.length-y.length;});
${o}
_t(_norm(subsets([1,2,3])),[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]],'example 1');
_t(_norm(subsets([0])),[[],[0]],'single element');
_t(subsets([1,2,3,4,5]).length,32,'2^5 subsets');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"combination-sum",title:"Combination Sum",difficulty:"Intermediate",category:"Recursion & Backtracking",description:"Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order. The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.",examples:[{input:"candidates = [2,3,6,7], target = 7",output:"[[2,2,3],[7]]",explanation:"2+2+3 = 7 (2 used twice) and 7 alone. These are the only combinations."},{input:"candidates = [2,3,5], target = 8",output:"[[2,2,2,2],[2,3,3],[3,5]]"},{input:"candidates = [2], target = 1",output:"[]"}],constraints:["1 <= candidates.length <= 30","2 <= candidates[i] <= 40","All elements of candidates are distinct","1 <= target <= 40"],hints:["Backtrack with a start index so combinations stay non-decreasing — this prevents duplicates like [2,3] and [3,2]","Reuse is allowed: after choosing candidates[i], recurse with the SAME index i","Prune when the remaining target goes negative"],tags:["backtracking","recursion","array"],timeComplexity:"O(branches^depth)",spaceComplexity:"O(target)",starterCode:{python:`def combination_sum(candidates, target):
    pass
`,javascript:`function combinationSum(candidates, target) {

}
`},testCode:{python:`_norm=lambda a:sorted(sorted(c) for c in a)
${a}
_t(_norm(combination_sum([2,3,6,7],7)),[[2,2,3],[7]],'example 1')
_t(_norm(combination_sum([2,3,5],8)),[[2,2,2,2],[2,3,3],[3,5]],'example 2')
_t(_norm(combination_sum([2],1)),[],'impossible')
_t(_norm(combination_sum([3],9)),[[3,3,3]],'single candidate reused')
print(f'{_p}/{_n} tests passed')`,javascript:`const _norm=a=>a.map(c=>[...c].sort((x,y)=>x-y)).sort((x,y)=>{const m=Math.min(x.length,y.length);for(let i=0;i<m;i++){if(x[i]!==y[i])return x[i]-y[i];}return x.length-y.length;});
${o}
_t(_norm(combinationSum([2,3,6,7],7)),[[2,2,3],[7]],'example 1');
_t(_norm(combinationSum([2,3,5],8)),[[2,2,2,2],[2,3,3],[3,5]],'example 2');
_t(_norm(combinationSum([2],1)),[],'impossible');
_t(_norm(combinationSum([3],9)),[[3,3,3]],'single candidate reused');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"n-queens",title:"N-Queens",difficulty:"Advanced",category:"Recursion & Backtracking",description:'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other (no shared row, column, or diagonal). Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order (the tests sort it). Each solution contains a distinct board configuration, where each row is a string of "." and a single "Q".',examples:[{input:"n = 4",output:'[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',explanation:"There exist two distinct solutions to the 4-queens puzzle."},{input:"n = 1",output:'[["Q"]]'}],constraints:["1 <= n <= 9"],hints:["Place one queen per row; backtrack over the column choice","A square (r, c) is attacked if its column c, diagonal r-c, or anti-diagonal r+c is occupied — three hash sets give O(1) checks","Build the row strings only when a full placement succeeds"],tags:["backtracking","recursion"],timeComplexity:"O(n!)",spaceComplexity:"O(n)",starterCode:{python:`def solve_n_queens(n):
    pass
`,javascript:`function solveNQueens(n) {

}
`},testCode:{python:`${a}
_t(sorted(solve_n_queens(4)),[['..Q.','Q...','...Q','.Q..'],['.Q..','...Q','Q...','..Q.']],'n=4 both solutions')
_t(solve_n_queens(1),[['Q']],'n=1')
_t(solve_n_queens(2),[],'n=2 impossible')
_t(solve_n_queens(3),[],'n=3 impossible')
_t(len(solve_n_queens(5)),10,'n=5 has 10 solutions')
_t(len(solve_n_queens(6)),4,'n=6 has 4 solutions')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(solveNQueens(4).sort(),[['..Q.','Q...','...Q','.Q..'],['.Q..','...Q','Q...','..Q.']],'n=4 both solutions');
_t(solveNQueens(1),[['Q']],'n=1');
_t(solveNQueens(2),[],'n=2 impossible');
_t(solveNQueens(3),[],'n=3 impossible');
_t(solveNQueens(5).length,10,'n=5 has 10 solutions');
_t(solveNQueens(6).length,4,'n=6 has 4 solutions');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"permutations",title:"Permutations",difficulty:"Intermediate",category:"Recursion & Backtracking",description:"Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order (the tests normalize ordering by sorting the outer list of permutations, while each individual permutation is left intact because permutations differ precisely by the order of their elements). An array of n distinct integers has exactly n! permutations.",examples:[{input:"nums = [1,2,3]",output:"[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",explanation:"All 3! = 6 orderings of the three numbers."},{input:"nums = [0,1]",output:"[[0,1],[1,0]]"},{input:"nums = [1]",output:"[[1]]"}],constraints:["1 <= nums.length <= 6","-10 <= nums[i] <= 10","All the integers of nums are unique"],hints:["Backtrack: build the permutation one position at a time, choosing an unused element","Track which elements are already used (a boolean array or a remaining list)","When the current arrangement has length n, record a copy of it"],tags:["backtracking","recursion","array"],timeComplexity:"O(n·n!)",spaceComplexity:"O(n)",starterCode:{python:`def permute(nums):
    pass
`,javascript:`function permute(nums) {

}
`},testCode:{python:`_norm=lambda a:sorted(a)
${a}
_t(_norm(permute([1,2,3])),[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]],'example 1')
_t(_norm(permute([0,1])),[[0,1],[1,0]],'two elements')
_t(_norm(permute([1])),[[1]],'single element')
_t(len(permute([1,2,3,4])),24,'4! permutations')
_t(_norm(permute([7,8,9])),[[7,8,9],[7,9,8],[8,7,9],[8,9,7],[9,7,8],[9,8,7]],'distinct values')
print(f'{_p}/{_n} tests passed')`,javascript:`const _norm=a=>[...a].sort((x,y)=>{const m=Math.min(x.length,y.length);for(let i=0;i<m;i++){if(x[i]!==y[i])return x[i]-y[i];}return x.length-y.length;});
${o}
_t(_norm(permute([1,2,3])),[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]],'example 1');
_t(_norm(permute([0,1])),[[0,1],[1,0]],'two elements');
_t(_norm(permute([1])),[[1]],'single element');
_t(permute([1,2,3,4]).length,24,'4! permutations');
_t(_norm(permute([7,8,9])),[[7,8,9],[7,9,8],[8,7,9],[8,9,7],[9,7,8],[9,8,7]],'distinct values');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"generate-parentheses",title:"Generate Parentheses",difficulty:"Intermediate",category:"Recursion & Backtracking",description:"Given n pairs of parentheses, write a function to generate all combinations of well-formed (valid, balanced) parentheses. You may return the answer in any order (the tests normalize by sorting the list of strings). A string is well-formed if every opening bracket has a matching closing bracket and brackets are properly nested.",examples:[{input:"n = 3",output:'["((()))","(()())","(())()","()(())","()()()"]',explanation:"All five well-formed combinations of 3 pairs of parentheses."},{input:"n = 1",output:'["()"]'}],constraints:["1 <= n <= 8"],hints:["Backtrack tracking how many open and close brackets have been used","You may add an open bracket while open count < n; you may add a close bracket while close count < open count","Record the string when its length reaches 2·n"],tags:["backtracking","recursion","string"],timeComplexity:"O(4ⁿ / √n)",spaceComplexity:"O(n)",starterCode:{python:`def generate_parenthesis(n):
    pass
`,javascript:`function generateParenthesis(n) {

}
`},testCode:{python:`${a}
_t(sorted(generate_parenthesis(3)),sorted(['((()))','(()())','(())()','()(())','()()()']),'example 1')
_t(sorted(generate_parenthesis(1)),['()'],'single pair')
_t(sorted(generate_parenthesis(2)),sorted(['(())','()()']),'two pairs')
_t(len(generate_parenthesis(4)),14,'catalan number 14')
_t(len(generate_parenthesis(5)),42,'catalan number 42')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(generateParenthesis(3).slice().sort(),['((()))','(()())','(())()','()(())','()()()'].sort(),'example 1');
_t(generateParenthesis(1).slice().sort(),['()'],'single pair');
_t(generateParenthesis(2).slice().sort(),['(())','()()'].sort(),'two pairs');
_t(generateParenthesis(4).length,14,'catalan number 14');
_t(generateParenthesis(5).length,42,'catalan number 42');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"sudoku-solver",title:"Sudoku Solver",difficulty:"Expert",category:"Recursion & Backtracking",description:'Write a program to solve a Sudoku puzzle by filling the empty cells. The board is a 9 x 9 grid of strings where each cell holds a digit "1"-"9" or "." for an empty cell. A sudoku solution must satisfy all of the following rules: each of the digits 1-9 must occur exactly once in each row, each of the digits 1-9 must occur exactly once in each column, and each of the digits 1-9 must occur exactly once in each of the nine 3 x 3 sub-boxes of the grid. The "." character indicates empty cells. You may assume the input board has exactly one solution. Modify the board in place to fill the empty cells AND return the solved board so the full grid can be compared.',examples:[{input:'board = [["5","3",".",".","7",...],...] (the classic LeetCode puzzle)',output:"The unique completed 9x9 grid",explanation:"Each empty cell is filled so that every row, column, and 3x3 box contains the digits 1-9 exactly once."}],constraints:["board.length == 9","board[i].length == 9",'board[i][j] is a digit "1"-"9" or "."',"It is guaranteed that the input board has exactly one solution"],hints:["Backtrack over empty cells; try digits 1-9 that do not violate the row, column, or 3x3 box","Maintain sets (or fixed-size arrays) of used digits per row, per column, and per box for O(1) validity checks","When a digit leads to a dead end, undo it and try the next; return success up the recursion once the grid is full"],tags:["backtracking","recursion","matrix","hash-set"],timeComplexity:"O(9^(empty cells))",spaceComplexity:"O(1)",starterCode:{python:`def solve_sudoku(board):
    pass
`,javascript:`function solveSudoku(board) {

}
`},testCode:{python:`${a}
_p1=[['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]
_sol1=[['5','3','4','6','7','8','9','1','2'],['6','7','2','1','9','5','3','4','8'],['1','9','8','3','4','2','5','6','7'],['8','5','9','7','6','1','4','2','3'],['4','2','6','8','5','3','7','9','1'],['7','1','3','9','2','4','8','5','6'],['9','6','1','5','3','7','2','8','4'],['2','8','7','4','1','9','6','3','5'],['3','4','5','2','8','6','1','7','9']]
_t(solve_sudoku(_p1),_sol1,'classic puzzle solved')
_p2=[['5','3','4','6','7','8','9','1','2'],['6','7','2','1','9','5','3','4','8'],['1','9','8','3','4','2','5','6','7'],['8','5','9','7','6','1','4','2','3'],['4','2','6','8','5','3','7','9','1'],['7','1','3','9','2','4','8','5','6'],['9','6','1','5','3','7','2','8','4'],['2','8','7','4','1','9','6','3','5'],['3','4','5','2','8','6','1','7','.']]
_sol2=[['5','3','4','6','7','8','9','1','2'],['6','7','2','1','9','5','3','4','8'],['1','9','8','3','4','2','5','6','7'],['8','5','9','7','6','1','4','2','3'],['4','2','6','8','5','3','7','9','1'],['7','1','3','9','2','4','8','5','6'],['9','6','1','5','3','7','2','8','4'],['2','8','7','4','1','9','6','3','5'],['3','4','5','2','8','6','1','7','9']]
_t(solve_sudoku(_p2),_sol2,'one empty cell')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
const _p1=[['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']];
const _sol1=[['5','3','4','6','7','8','9','1','2'],['6','7','2','1','9','5','3','4','8'],['1','9','8','3','4','2','5','6','7'],['8','5','9','7','6','1','4','2','3'],['4','2','6','8','5','3','7','9','1'],['7','1','3','9','2','4','8','5','6'],['9','6','1','5','3','7','2','8','4'],['2','8','7','4','1','9','6','3','5'],['3','4','5','2','8','6','1','7','9']];
_t(solveSudoku(_p1),_sol1,'classic puzzle solved');
const _p2=[['5','3','4','6','7','8','9','1','2'],['6','7','2','1','9','5','3','4','8'],['1','9','8','3','4','2','5','6','7'],['8','5','9','7','6','1','4','2','3'],['4','2','6','8','5','3','7','9','1'],['7','1','3','9','2','4','8','5','6'],['9','6','1','5','3','7','2','8','4'],['2','8','7','4','1','9','6','3','5'],['3','4','5','2','8','6','1','7','.']];
const _sol2=[['5','3','4','6','7','8','9','1','2'],['6','7','2','1','9','5','3','4','8'],['1','9','8','3','4','2','5','6','7'],['8','5','9','7','6','1','4','2','3'],['4','2','6','8','5','3','7','9','1'],['7','1','3','9','2','4','8','5','6'],['9','6','1','5','3','7','2','8','4'],['2','8','7','4','1','9','6','3','5'],['3','4','5','2','8','6','1','7','9']];
_t(solveSudoku(_p2),_sol2,'one empty cell');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"knn-classifier",title:"K-Nearest Neighbors Classifier",difficulty:"Intermediate",category:"AI / ML Algorithms",description:"Implement the prediction step of a k-nearest-neighbors classifier from scratch (no ML libraries). Given training points X_train (list of feature vectors), their labels y_train, a query point x, and an integer k, return the majority label among the k training points closest to x by Euclidean distance. The test data is constructed so that no distance ties or vote ties affect the answer.",examples:[{input:"X_train = [[1,1],[2,2],[8,8],[9,9]], y_train = [0,0,1,1], x = [1.5,1.5], k = 3",output:"0",explanation:"The 3 nearest neighbors are [1,1], [2,2] (label 0) and [8,8] (label 1); majority vote → 0."},{input:"same training data, x = [8.5,8.5], k = 3",output:"1",explanation:"Nearest are [8,8], [9,9] (label 1) and [2,2] (label 0); majority → 1."}],constraints:["1 <= k <= len(X_train) <= 1000","Feature vectors have equal, small dimension (1–10)","Labels are non-negative integers","No external ML libraries"],hints:["Euclidean distance: sqrt(Σ (a_i - b_i)²) — for ranking you can skip the sqrt","Sort (distance, label) pairs and take the first k","Count label frequencies among those k and return the most common"],tags:["ml","classification","distance-metrics"],timeComplexity:"O(n·d + n log n)",spaceComplexity:"O(n)",starterCode:{python:`from collections import Counter

def knn_predict(X_train, y_train, x, k):
    pass
`,javascript:`function knnPredict(XTrain, yTrain, x, k) {

}
`},testCode:{python:`${a}
_X=[[1,1],[2,2],[8,8],[9,9]];_y=[0,0,1,1]
_t(knn_predict(_X,_y,[1.5,1.5],3),0,'near cluster 0')
_t(knn_predict(_X,_y,[8.5,8.5],3),1,'near cluster 1')
_t(knn_predict(_X,_y,[2,2],1),0,'exact match k=1')
_t(knn_predict([[0],[1],[2],[10]],[0,0,0,1],[9],1),1,'1D nearest outlier')
_t(knn_predict([[1,1],[1,2],[2,1],[5,5],[5,6]],[0,0,0,1,1],[4.5,5],3),1,'five points k=3')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
const _X=[[1,1],[2,2],[8,8],[9,9]],_y=[0,0,1,1];
_t(knnPredict(_X,_y,[1.5,1.5],3),0,'near cluster 0');
_t(knnPredict(_X,_y,[8.5,8.5],3),1,'near cluster 1');
_t(knnPredict(_X,_y,[2,2],1),0,'exact match k=1');
_t(knnPredict([[0],[1],[2],[10]],[0,0,0,1],[9],1),1,'1D nearest outlier');
_t(knnPredict([[1,1],[1,2],[2,1],[5,5],[5,6]],[0,0,0,1,1],[4.5,5],3),1,'five points k=3');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"gradient-descent-linear",title:"Gradient Descent for Linear Regression",difficulty:"Intermediate",category:"AI / ML Algorithms",description:"Implement batch gradient descent to fit a simple linear regression model y = w·x + b, from scratch (no ML libraries). Given 1-D inputs X, targets y, a learning rate lr, and a number of epochs, minimize the mean squared error J(w,b) = (1/n)·Σ(w·x_i + b - y_i)² and return the learned parameters as a pair [w, b]. With the test hyperparameters the parameters converge tightly, and the tests compare predictions rounded to the nearest integer.",examples:[{input:"X = [1,2,3,4], y = [3,5,7,9], lr = 0.01, epochs = 5000",output:"w ≈ 2.0, b ≈ 1.0",explanation:"The data lies exactly on y = 2x + 1, so gradient descent converges to w = 2, b = 1."}],constraints:["2 <= len(X) == len(y) <= 1000","Gradients: dw = (2/n)·Σ(pred - y_i)·x_i and db = (2/n)·Σ(pred - y_i)","Update both parameters simultaneously each epoch","No external ML libraries"],hints:["Initialize w = 0 and b = 0","Each epoch: compute all predictions, then the two gradients, then update w -= lr·dw and b -= lr·db","Compute dw and db from the SAME predictions — do not update w before computing db"],tags:["ml","regression","optimization","gradient-descent"],timeComplexity:"O(epochs·n)",spaceComplexity:"O(1)",starterCode:{python:`def gradient_descent(X, y, lr=0.01, epochs=5000):
    pass
`,javascript:`function gradientDescent(X, y, lr=0.01, epochs=5000) {

}
`},testCode:{python:`${a}
_w,_b=gradient_descent([1,2,3,4],[3,5,7,9],0.01,5000)
_t(round(_w*5+_b),11,'predict x=5 on y=2x+1')
_t(round(_w*10+_b),21,'predict x=10 on y=2x+1')
_w2,_b2=gradient_descent([0,1,2,3],[1,1,1,1],0.01,5000)
_t(round(_w2*7+_b2),1,'flat data learns w=0 b=1')
_w3,_b3=gradient_descent([1,2,3],[-2,-4,-6],0.01,5000)
_t(round(_w3*4+_b3),-8,'negative slope y=-2x')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
const [_w,_b]=gradientDescent([1,2,3,4],[3,5,7,9],0.01,5000);
_t(Math.round(_w*5+_b),11,'predict x=5 on y=2x+1');
_t(Math.round(_w*10+_b),21,'predict x=10 on y=2x+1');
const [_w2,_b2]=gradientDescent([0,1,2,3],[1,1,1,1],0.01,5000);
_t(Math.round(_w2*7+_b2),1,'flat data learns w=0 b=1');
const [_w3,_b3]=gradientDescent([1,2,3],[-2,-4,-6],0.01,5000);
_t(Math.round(_w3*4+_b3),-8,'negative slope y=-2x');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"perceptron",title:"Perceptron Learning Algorithm",difficulty:"Intermediate",category:"AI / ML Algorithms",description:"Implement the classic single-layer perceptron learning algorithm from scratch (no ML libraries) for binary classification of 2-D points. Given training feature vectors X (a list of [x1, x2] points), binary labels y (each 0 or 1), a learning rate lr, and a number of epochs, train the perceptron and return the list of predictions for the training set after training. Initialize the weight vector w = [0, 0] and the bias b = 0. The prediction for a point x is 1 if w·x + b > 0 else 0 (strict greater-than, ties predict 0). For each epoch, iterate over the training examples in order and apply the perceptron update rule: for prediction pred on example (x, y), update w += lr·(y − pred)·x componentwise and b += lr·(y − pred). After all epochs, return the integer predictions for every training point. The algorithm is fully deterministic given this initialization and update order.",examples:[{input:"X = [[0,0],[0,1],[1,0],[1,1]], y = [0,0,0,1], lr = 0.1, epochs = 20",output:"[0,0,0,1]",explanation:"The AND gate is linearly separable; the perceptron converges and reproduces the labels."},{input:"X = [[0,0],[0,1],[1,0],[1,1]], y = [0,1,1,1], lr = 0.1, epochs = 20",output:"[0,1,1,1]",explanation:"The OR gate is also linearly separable and learned exactly."}],constraints:["1 <= len(X) == len(y) <= 1000","Each feature vector has exactly 2 dimensions","Each label y[i] is 0 or 1","Initialize w = [0, 0] and b = 0; pred = 1 if w·x + b > 0 else 0","No external ML libraries"],hints:["Maintain w as a 2-element list and b as a scalar, both starting at 0","For each example compute pred, then error = y − pred (one of -1, 0, +1), and update w and b only when error is non-zero","After training, recompute the prediction for every training point and return them as integers"],tags:["ml","classification","perceptron","optimization"],timeComplexity:"O(epochs·n·d)",spaceComplexity:"O(d)",starterCode:{python:`def perceptron(X, y, lr=0.1, epochs=20):
    pass
`,javascript:`function perceptron(X, y, lr=0.1, epochs=20) {

}
`},testCode:{python:`${a}
_t(perceptron([[0,0],[0,1],[1,0],[1,1]],[0,0,0,1],0.1,20),[0,0,0,1],'AND gate')
_t(perceptron([[0,0],[0,1],[1,0],[1,1]],[0,1,1,1],0.1,20),[0,1,1,1],'OR gate')
_t(perceptron([[0,0],[0,1],[1,0],[1,1]],[0,0,0,0],0.1,20),[0,0,0,0],'all zeros stay zero')
_t(perceptron([[2,2],[3,3],[-1,-1],[-2,-2]],[1,1,0,0],0.1,20),[1,1,0,0],'separable diagonal')
_t(perceptron([[1,1]],[1],0.1,20),[1],'single positive point')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(perceptron([[0,0],[0,1],[1,0],[1,1]],[0,0,0,1],0.1,20),[0,0,0,1],'AND gate');
_t(perceptron([[0,0],[0,1],[1,0],[1,1]],[0,1,1,1],0.1,20),[0,1,1,1],'OR gate');
_t(perceptron([[0,0],[0,1],[1,0],[1,1]],[0,0,0,0],0.1,20),[0,0,0,0],'all zeros stay zero');
_t(perceptron([[2,2],[3,3],[-1,-1],[-2,-2]],[1,1,0,0],0.1,20),[1,1,0,0],'separable diagonal');
_t(perceptron([[1,1]],[1],0.1,20),[1],'single positive point');
console.log(\`\${_p}/\${_n} tests passed\`);`}},{id:"cosine-similarity",title:"Cosine Similarity",difficulty:"Beginner",category:"AI / ML Algorithms",description:"Implement cosine similarity between two equal-length numeric vectors a and b from scratch (no ML libraries). Cosine similarity is the dot product of the two vectors divided by the product of their Euclidean norms: cos(a, b) = (Σ a_i·b_i) / (sqrt(Σ a_i²) · sqrt(Σ b_i²)). It ranges from -1 (exactly opposite) through 0 (orthogonal) to 1 (same direction). Return the raw floating-point similarity; the tests compare round(sim · 10000) as an integer so the result is language-independent and avoids float-equality issues. You may assume neither vector is all zeros.",examples:[{input:"a = [1,0], b = [0,1]",output:"0.0",explanation:"Orthogonal vectors have a dot product of 0, so similarity is 0."},{input:"a = [1,2,3], b = [1,2,3]",output:"1.0",explanation:"Identical direction gives the maximum similarity of 1."},{input:"a = [1,2,3], b = [4,5,6]",output:"0.974631...",explanation:"Dot product 32 over norms √14·√77 ≈ 32.83 gives ≈ 0.9746, i.e. 9746 after round(·10000)."}],constraints:["1 <= len(a) == len(b) <= 1000","-1000 <= a[i], b[i] <= 1000","Neither a nor b is the zero vector","Tests compare round(similarity · 10000) as an integer"],hints:["Compute the dot product Σ a_i·b_i in a single pass","Compute each norm as the square root of the sum of squares","Divide the dot product by the product of the two norms"],tags:["ml","distance-metrics","vectors","math"],timeComplexity:"O(n)",spaceComplexity:"O(1)",starterCode:{python:`import math

def cosine_similarity(a, b):
    pass
`,javascript:`function cosineSimilarity(a, b) {

}
`},testCode:{python:`${a}
_t(round(cosine_similarity([1,0],[0,1])*10000),0,'orthogonal')
_t(round(cosine_similarity([1,2,3],[1,2,3])*10000),10000,'identical')
_t(round(cosine_similarity([1,2,3],[-1,-2,-3])*10000),-10000,'opposite')
_t(round(cosine_similarity([1,2,3],[4,5,6])*10000),9746,'known case')
_t(round(cosine_similarity([2,0],[3,0])*10000),10000,'same direction scaled')
_t(round(cosine_similarity([1,1],[1,0])*10000),7071,'45 degrees')
print(f'{_p}/{_n} tests passed')`,javascript:`${o}
_t(Math.round(cosineSimilarity([1,0],[0,1])*10000),0,'orthogonal');
_t(Math.round(cosineSimilarity([1,2,3],[1,2,3])*10000),10000,'identical');
_t(Math.round(cosineSimilarity([1,2,3],[-1,-2,-3])*10000),-10000,'opposite');
_t(Math.round(cosineSimilarity([1,2,3],[4,5,6])*10000),9746,'known case');
_t(Math.round(cosineSimilarity([2,0],[3,0])*10000),10000,'same direction scaled');
_t(Math.round(cosineSimilarity([1,1],[1,0])*10000),7071,'45 degrees');
console.log(\`\${_p}/\${_n} tests passed\`);`}}].map((t,e)=>{let n={...t.starterCode},s={...t.testCode};for(let[e,i]of S){let r=i[t.id];if(!r)continue;let a=r.tests??("typescript"===e?t.testCode.javascript:void 0);a&&(n[e]=r.starter,s[e]=a)}return{...t,num:e+1,starterCode:n,testCode:s}}),k=t.i(59925).default;function O(t,e,n){let s,i=[];for(let e of t.split("\n")){let t=e.match(/^✓\s+Test\s+(\d+)(.*)/);t&&i.push({num:+t[1],passed:!0,description:e.slice(2).trim()});let n=e.match(/^✗\s+Test\s+(\d+)(.*)/);n&&i.push({num:+n[1],passed:!1,description:e.slice(2).trim()})}let r=t.match(/(\d+)\/(\d+)\s+tests?\s+passed/),a=r?+r[1]:i.filter(t=>t.passed).length,o=r?+r[2]:i.length,l=o>0?Math.round(a/o*100):0;s=0!==n||e?"Your code raised an error. Check the error message and fix the issue.":100===l?"🎉 All tests passed! Great work.":l>=66?`${a}/${o} tests passed. You're close — check the failing cases.`:l>0?`${a}/${o} tests passed. Review the examples and edge cases.`:0===o?"No test results detected. Make sure you haven't removed the test harness.":"No tests passed. Re-read the problem and check your logic.";let c=function(t){if(!t||!t.trim())return null;for(let e of k)try{if(RegExp(e.pattern,"i").test(t))return{title:e.title,cause:e.cause,fix:e.fix,example:e.example}}catch{}return null}(e||"");return{passed:a===o&&o>0&&0===n,score:l,passedTests:a,totalTests:o,testResults:i,feedback:s,errorHint:c?{title:c.title,cause:c.cause,fix:c.fix,example:c.example}:void 0}}var j=t.i(56420);let N=(0,j.default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);var A=t.i(21357);let L=(0,j.default)("lightbulb",[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]);var C=t.i(16327);let q=(0,j.default)("chevron-up",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);var E=t.i(48161);let z=(0,j.default)("circle-x",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);var P=t.i(4139);let $=(0,j.default)("layout-grid",[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]]);var M=t.i(9584);let I=(0,j.default)("arrow-left-right",[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]]);var R=t.i(13285);let B=(0,j.default)("hash",[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]]),D=(0,j.default)("layout-list",[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}],["path",{d:"M14 4h7",key:"3xa0d5"}],["path",{d:"M14 9h7",key:"1icrd9"}],["path",{d:"M14 15h7",key:"1mj8o2"}],["path",{d:"M14 20h7",key:"11slyb"}]]),F=(0,j.default)("link-2",[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]),W=(0,j.default)("git-branch",[["path",{d:"M15 6a9 9 0 0 0-9 9V3",key:"1cii5b"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}]]),X=(0,j.default)("network",[["rect",{x:"16",y:"16",width:"6",height:"6",rx:"1",key:"4q2zg0"}],["rect",{x:"2",y:"16",width:"6",height:"6",rx:"1",key:"8cvhb9"}],["rect",{x:"9",y:"2",width:"6",height:"6",rx:"1",key:"1egb70"}],["path",{d:"M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",key:"1jsf9p"}],["path",{d:"M12 12V8",key:"2874zd"}]]);var V=t.i(28623);let Q=(0,j.default)("calculator",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6",key:"x4nwl0"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18",key:"wjye3r"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M8 18h.01",key:"lrp35t"}]]);var G=t.i(97142);let K=(0,j.default)("refresh-cw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]),U=(0,j.default)("arrow-up-down",[["path",{d:"m21 16-4 4-4-4",key:"f6ql7i"}],["path",{d:"M17 20V4",key:"1ejh1v"}],["path",{d:"m3 8 4-4 4 4",key:"11wl7u"}],["path",{d:"M7 4v16",key:"1glfcx"}]]),Y=(0,j.default)("box",[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]]);var Z=t.i(62633),H=t.i(66595),J=t.i(52330);let tt=(0,s.default)(()=>t.A(53096),{loadableGenerated:{modules:[67211]},ssr:!1,loading:()=>(0,e.jsx)("div",{className:"flex items-center justify-center h-full bg-[#1e1e1e]",children:(0,e.jsx)("div",{className:"w-8 h-8 border-2 border-amber-500/40 border-t-amber-500 rounded-full animate-spin"})})}),te={Beginner:"text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-500/15 dark:border-emerald-500/30",Intermediate:"text-blue-700    bg-blue-50    border-blue-200    dark:text-blue-300    dark:bg-blue-500/15    dark:border-blue-500/30",Advanced:"text-amber-700   bg-amber-50   border-amber-200   dark:text-amber-300   dark:bg-amber-500/15   dark:border-amber-500/30",Expert:"text-red-700     bg-red-50     border-red-200     dark:text-red-300     dark:bg-red-500/15     dark:border-red-500/30"},tn=["All","Arrays & Strings","Two Pointers","Sliding Window","Hash Tables","Stacks & Queues","Linked Lists","Trees","Graphs","Dynamic Programming","Math & Numbers","Bit Manipulation","Recursion & Backtracking","Sorting & Searching","OOP & Design","AI / ML Algorithms"],ts=["All","Beginner","Intermediate","Advanced","Expert"],ti={python:"Python",javascript:"JavaScript",typescript:"TypeScript",java:"Java",go:"Go",cpp:"C++"},tr={python:"python",javascript:"javascript",typescript:"typescript",java:"java",go:"go",cpp:"cpp"};function ta({cat:t}){let n="w-3.5 h-3.5";return({All:(0,e.jsx)($,{className:n}),"Arrays & Strings":(0,e.jsx)(M.Database,{className:n}),"Two Pointers":(0,e.jsx)(I,{className:n}),"Sliding Window":(0,e.jsx)(R.Layers,{className:n}),"Hash Tables":(0,e.jsx)(B,{className:n}),"Stacks & Queues":(0,e.jsx)(D,{className:n}),"Linked Lists":(0,e.jsx)(F,{className:n}),Trees:(0,e.jsx)(W,{className:n}),Graphs:(0,e.jsx)(X,{className:n}),"Dynamic Programming":(0,e.jsx)(V.Sparkles,{className:n}),"Math & Numbers":(0,e.jsx)(Q,{className:n}),"Bit Manipulation":(0,e.jsx)(G.Cpu,{className:n}),"Recursion & Backtracking":(0,e.jsx)(K,{className:n}),"Sorting & Searching":(0,e.jsx)(U,{className:n}),"OOP & Design":(0,e.jsx)(Y,{className:n}),"AI / ML Algorithms":(0,e.jsx)(Z.Brain,{className:n})})[t]??(0,e.jsx)(J.Code2,{className:n})}t.s(["default",0,function(){let[t,s]=(0,n.useState)("list"),[a,o]=(0,n.useState)(null),[l,c]=(0,n.useState)("All"),[d,u]=(0,n.useState)("All"),[p,g]=(0,n.useState)(""),[m,_]=(0,n.useState)("python"),[h,f]=(0,n.useState)(""),[x,b]=(0,n.useState)(!1),[y,v]=(0,n.useState)(null),[w,S]=(0,n.useState)(null),[k,j]=(0,n.useState)("results"),[$,M]=(0,n.useState)(!1),[I,R]=(0,n.useState)(!1),[B,D]=(0,n.useState)(0),[F,W]=(0,n.useState)("problem"),X=(0,n.useMemo)(()=>T.filter(t=>{if("All"!==l&&t.category!==l||"All"!==d&&t.difficulty!==d)return!1;if(p){let e=p.toLowerCase();return t.title.toLowerCase().includes(e)||t.tags.some(t=>t.includes(e))}return!0}),[l,d,p]),V=(0,n.useMemo)(()=>{let t={All:T.length};for(let e of T)t[e.category]=(t[e.category]??0)+1;return t},[]),Q=(0,n.useCallback)(async()=>{if(h&&!x){b(!0),j("results"),W("tests");try{let t=a?.testCode?.[m]??"",e=await fetch("/api/proxy/code/execute",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({language:m,code:t?`${h}
${t}`:h})}),n=await e.json();S({stdout:n.stdout??"",stderr:n.stderr??""}),v(O(n.stdout??"",n.stderr??"",n.exitCode??0))}catch(e){let t=e instanceof Error?e.message:String(e);S({stdout:"",stderr:t}),v(O("",t,1))}finally{b(!1)}}},[h,m,x,a]);if("list"===t)return(0,e.jsxs)("div",{className:"min-h-screen bg-[#f7f8fa] dark:bg-transparent",children:[(0,e.jsx)(i.default,{}),(0,e.jsx)(r.default,{withNavbarOffset:!0}),(0,e.jsxs)("div",{className:"pt-6 pb-12",children:[(0,e.jsxs)("div",{className:"text-center px-4 py-10",children:[(0,e.jsxs)("div",{className:"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30 text-xs text-amber-700 dark:text-amber-300 mb-4",children:[(0,e.jsx)(G.Cpu,{className:"w-3 h-3"})," ",T.length," Problems · 15 Categories"]}),(0,e.jsxs)("h1",{className:"text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3",children:["Code"," ",(0,e.jsx)("span",{className:"bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent",children:"Lab"})]}),(0,e.jsx)("p",{className:"text-slate-600 dark:text-white/70 text-sm max-w-md mx-auto leading-relaxed",children:"Sharpen your skills with curated challenges — algorithms, data structures, ML and more. From beginner to expert, across 6 languages."})]}),(0,e.jsxs)("div",{className:"max-w-5xl mx-auto px-4 mb-6 flex flex-col sm:flex-row gap-3",children:[(0,e.jsxs)("div",{className:"relative flex-1",children:[(0,e.jsx)(H.Search,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-white/40"}),(0,e.jsx)("input",{type:"text",placeholder:"Search problems or tags…",value:p,onChange:t=>g(t.target.value),className:"w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/15 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:border-amber-500 transition-colors"})]}),(0,e.jsx)("div",{className:"flex gap-2 flex-wrap",children:ts.map(t=>{let n=d===t?"All"===t?"bg-slate-100 dark:bg-white/10 border-slate-400 dark:border-white/25 text-slate-800 dark:text-white/90":"Beginner"===t?"bg-emerald-50 dark:bg-emerald-500/15 border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300":"Intermediate"===t?"bg-blue-50    dark:bg-blue-500/15    border-blue-300    dark:border-blue-500/30    text-blue-700    dark:text-blue-300":"Advanced"===t?"bg-amber-50   dark:bg-amber-500/15   border-amber-300   dark:border-amber-500/30   text-amber-700   dark:text-amber-300":"bg-red-50     dark:bg-red-500/15     border-red-300     dark:border-red-500/30     text-red-700     dark:text-red-300":"bg-white dark:bg-[#12121a] border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50 hover:bg-slate-50 dark:hover:bg-white/10";return(0,e.jsx)("button",{onClick:()=>u(t),className:`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${n}`,children:t},t)})})]}),(0,e.jsx)("div",{className:"sm:hidden max-w-5xl mx-auto px-4 mb-4 flex gap-2 overflow-x-auto pb-1.5 [-webkit-overflow-scrolling:touch]",children:tn.map(t=>(0,e.jsxs)("button",{onClick:()=>c(t),className:`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap shrink-0 transition-colors ${l===t?"bg-amber-50 dark:bg-amber-500/15 border-amber-300 dark:border-amber-500/30 text-amber-600 dark:text-amber-400":"bg-white dark:bg-[#12121a] border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50"}`,children:[(0,e.jsx)(ta,{cat:t}),t,(0,e.jsx)("span",{className:l===t?"text-amber-500":"text-slate-400 dark:text-white/40",children:V[t]??0})]},t))}),(0,e.jsxs)("div",{className:"max-w-5xl mx-auto px-4 flex gap-5",children:[(0,e.jsx)("aside",{className:"w-52 flex-shrink-0 hidden sm:block",children:(0,e.jsx)("div",{className:"sticky top-24 rounded-xl bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden",children:tn.map(t=>(0,e.jsxs)("button",{onClick:()=>c(t),className:`w-full flex items-center gap-2.5 px-3 py-2.5 text-left text-xs transition-colors ${l===t?"bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border-r-2 border-amber-500":"text-slate-500 dark:text-white/50 hover:bg-slate-50 dark:hover:bg-white/10 hover:text-slate-800 dark:hover:text-white/90"}`,children:[(0,e.jsx)("span",{className:l===t?"text-amber-600 dark:text-amber-400":"text-slate-400 dark:text-white/40",children:(0,e.jsx)(ta,{cat:t})}),(0,e.jsx)("span",{className:"flex-1 truncate font-medium",children:t}),(0,e.jsx)("span",{className:`text-[10px] tabular-nums ${l===t?"text-amber-500":"text-slate-400 dark:text-white/40"}`,children:V[t]??0})]},t))})}),(0,e.jsxs)("main",{className:"flex-1 min-w-0",children:[(0,e.jsxs)("p",{className:"text-xs text-slate-500 dark:text-white/50 mb-3",children:[X.length," problem",1!==X.length?"s":""]}),0===X.length?(0,e.jsxs)("div",{className:"flex flex-col items-center gap-3 py-20 text-slate-400 dark:text-white/40",children:[(0,e.jsx)(H.Search,{className:"w-8 h-8 opacity-30"}),(0,e.jsx)("p",{className:"text-sm",children:"No problems match your filters."})]}):(0,e.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:X.map(t=>(0,e.jsxs)("button",{onClick:()=>{let e;return e=t.starterCode.python?"python":Object.keys(t.starterCode)[0],void(o(t),_(e),f(t.starterCode[e]??""),v(null),S(null),D(0),R(!1),W("problem"),s("editor"))},className:"text-left rounded-xl bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10 shadow-sm hover:border-amber-300 dark:hover:border-amber-500/30 hover:shadow-md p-4 transition-all group",children:[(0,e.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,e.jsxs)("span",{className:"text-[10px] font-bold text-slate-400 dark:text-white/40 font-mono tabular-nums",children:["#",t.num]}),(0,e.jsx)("span",{className:`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${te[t.difficulty]}`,children:t.difficulty})]}),(0,e.jsx)("h3",{className:"text-sm font-semibold text-slate-800 dark:text-white/90 group-hover:text-slate-900 dark:group-hover:text-white transition-colors leading-snug mb-2",children:t.title}),(0,e.jsxs)("div",{className:"flex items-center gap-2 flex-wrap",children:[(0,e.jsx)("span",{className:"text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50",children:t.category}),t.tags.slice(0,2).map(t=>(0,e.jsx)("span",{className:"text-[10px] text-slate-400 dark:text-white/40",children:t},t))]}),t.timeComplexity&&(0,e.jsxs)("div",{className:"mt-2.5 flex gap-3 text-[10px] font-mono text-slate-400 dark:text-white/40",children:[(0,e.jsxs)("span",{children:["T: ",t.timeComplexity]}),t.spaceComplexity&&(0,e.jsxs)("span",{children:["S: ",t.spaceComplexity]})]})]},t.id))})]})]})]})]});if(!a)return null;let K=Object.keys(a.starterCode),U=y?.score??0,Y=U>=80?"text-emerald-600 dark:text-emerald-400":U>=50?"text-amber-600 dark:text-amber-400":"text-red-600 dark:text-red-400",Z=U>=80?"bg-emerald-500":U>=50?"bg-amber-500":"bg-red-500";return(0,e.jsxs)("div",{className:"flex flex-col h-[100dvh] bg-[#f7f8fa] dark:bg-transparent overflow-hidden",children:[(0,e.jsx)(i.default,{}),(0,e.jsxs)("div",{className:"flex items-center gap-2 px-4 py-2 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#12121a] mt-16 flex-shrink-0",children:[(0,e.jsxs)("button",{onClick:()=>{s("list"),v(null)},className:"flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white text-sm transition-colors",children:[(0,e.jsx)(N,{className:"w-3.5 h-3.5"}),(0,e.jsx)("span",{className:"hidden sm:block",children:"Problems"})]}),(0,e.jsx)("div",{className:"w-px h-5 bg-slate-200 dark:bg-white/10"}),(0,e.jsxs)("div",{className:"flex items-center gap-2 flex-1 min-w-0",children:[(0,e.jsxs)("span",{className:"text-xs text-slate-400 dark:text-white/40 font-mono shrink-0",children:["#",a.num]}),(0,e.jsx)("span",{className:"text-sm font-semibold text-slate-900 dark:text-white truncate",children:a.title}),(0,e.jsx)("span",{className:`hidden sm:inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${te[a.difficulty]}`,children:a.difficulty})]}),(0,e.jsxs)("div",{className:"relative",children:[(0,e.jsxs)("button",{onClick:()=>M(t=>!t),className:"flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 border border-slate-300 dark:border-white/15 hover:bg-slate-50 dark:hover:bg-white/10 text-sm text-slate-700 dark:text-white/90 transition-colors",children:[(0,e.jsx)(J.Code2,{className:"w-3.5 h-3.5 text-amber-600 dark:text-amber-400"}),ti[m],(0,e.jsx)(C.ChevronDown,{className:"w-3.5 h-3.5 text-slate-400 dark:text-white/40"})]}),$&&(0,e.jsx)("div",{className:"absolute top-full right-0 mt-1 w-36 rounded-xl bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10 shadow-xl z-50 overflow-hidden",children:K.map(t=>(0,e.jsx)("button",{onClick:()=>{a&&(_(t),f(a.starterCode[t]??a.starterCode.python??""),v(null),S(null),M(!1))},className:`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-white/10 ${m===t?"text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/15":"text-slate-600 dark:text-white/70"}`,children:ti[t]},t))})]}),(0,e.jsxs)("button",{onClick:Q,disabled:x,className:"flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium transition-all shadow-lg shadow-green-500/25",children:[x?(0,e.jsx)("div",{className:"w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"}):(0,e.jsx)(A.Play,{className:"w-3.5 h-3.5 fill-white"}),x?"Running…":"Run"]})]}),(0,e.jsx)("div",{className:"flex lg:hidden border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#12121a] flex-shrink-0",children:[["problem","Problem"],["code","Code"],["tests","Tests"]].map(([t,n])=>(0,e.jsx)("button",{onClick:()=>W(t),className:`flex-1 py-2.5 text-xs font-medium transition-colors border-b-2 ${F===t?"text-amber-600 dark:text-amber-400 border-amber-500":"text-slate-400 dark:text-white/40 border-transparent"}`,children:n},t))}),(0,e.jsxs)("div",{className:"flex flex-1 overflow-hidden",children:[(0,e.jsxs)("aside",{className:`${"problem"===F?"flex":"hidden"} lg:flex w-full lg:w-[280px] flex-shrink-0 lg:border-r border-slate-200 dark:border-white/10 bg-white dark:bg-[#12121a] flex-col overflow-y-auto`,children:[(0,e.jsx)("div",{className:"p-4 border-b border-slate-100 dark:border-white/10",children:(0,e.jsx)("p",{className:"text-xs text-slate-600 dark:text-white/70 leading-relaxed",children:a.description})}),(0,e.jsxs)("div",{className:"p-4 border-b border-slate-100 dark:border-white/10 space-y-2.5",children:[(0,e.jsx)("h3",{className:"text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-wider",children:"Examples"}),a.examples.map((t,n)=>(0,e.jsxs)("div",{className:"rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-2.5 text-xs font-mono space-y-1 break-all",children:[(0,e.jsxs)("div",{children:[(0,e.jsx)("span",{className:"text-slate-400 dark:text-white/40",children:"In: "}),(0,e.jsx)("span",{className:"text-emerald-600 dark:text-emerald-400",children:t.input})]}),(0,e.jsxs)("div",{children:[(0,e.jsx)("span",{className:"text-slate-400 dark:text-white/40",children:"Out: "}),(0,e.jsx)("span",{className:"text-amber-700 dark:text-amber-300",children:t.output})]}),t.explanation&&(0,e.jsx)("div",{className:"text-slate-400 dark:text-white/40 text-[10px]",children:t.explanation})]},n))]}),(0,e.jsxs)("div",{className:"p-4 border-b border-slate-100 dark:border-white/10 space-y-1.5",children:[(0,e.jsx)("h3",{className:"text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-wider",children:"Constraints"}),a.constraints.map((t,n)=>(0,e.jsxs)("div",{className:"flex items-start gap-1.5 text-xs text-slate-600 dark:text-white/70",children:[(0,e.jsx)("span",{className:"text-amber-500 mt-0.5 shrink-0",children:"•"}),t]},n))]}),(0,e.jsxs)("div",{className:"border-t border-slate-100 dark:border-white/10",children:[(0,e.jsxs)("button",{onClick:()=>R(t=>!t),className:"w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-white/10 transition-colors",children:[(0,e.jsx)(L,{className:"w-3.5 h-3.5 text-amber-500 shrink-0"}),(0,e.jsxs)("span",{className:"text-xs font-medium text-slate-600 dark:text-white/70",children:["Hints (",a.hints.length,")"]}),I?(0,e.jsx)(q,{className:"w-3.5 h-3.5 text-slate-400 dark:text-white/40 ml-auto"}):(0,e.jsx)(C.ChevronDown,{className:"w-3.5 h-3.5 text-slate-400 dark:text-white/40 ml-auto"})]}),I&&(0,e.jsxs)("div",{className:"px-4 pb-4 space-y-2",children:[a.hints.slice(0,B).map((t,n)=>(0,e.jsxs)("div",{className:"flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30",children:[(0,e.jsx)("span",{className:"text-[10px] font-bold text-amber-600 dark:text-amber-400 mt-0.5 shrink-0",children:n+1}),(0,e.jsx)("code",{className:"text-xs text-amber-800 dark:text-amber-200 leading-relaxed font-mono",children:t})]},n)),B<a.hints.length&&(0,e.jsxs)("button",{onClick:()=>D(t=>t+1),className:"mt-1 text-xs text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors flex items-center gap-1",children:[(0,e.jsx)(L,{className:"w-3 h-3"}),0===B?"Show first hint":"Show next hint"]}),B===a.hints.length&&B>0&&(0,e.jsx)("button",{onClick:()=>D(0),className:"mt-1 text-xs text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white/70 transition-colors",children:"Hide hints"})]})]})]}),(0,e.jsxs)("div",{className:`${"code"===F?"flex":"hidden"} lg:flex w-full flex-1 flex-col min-w-0 lg:border-r border-slate-200 dark:border-white/10`,children:[(0,e.jsx)("div",{className:"flex-1 overflow-hidden",children:(0,e.jsx)(tt,{height:"100%",language:tr[m],theme:"vs-dark",value:h,onChange:t=>f(t??""),options:{automaticLayout:!0,fontSize:13,fontFamily:'"Fira Code","Cascadia Code","JetBrains Mono",monospace',fontLigatures:!0,lineNumbers:"on",minimap:{enabled:!1},scrollBeyondLastLine:!1,wordWrap:"on",padding:{top:16,bottom:16},smoothScrolling:!0,cursorBlinking:"smooth",tabSize:4,bracketPairColorization:{enabled:!0}}})}),(0,e.jsxs)("div",{className:"flex items-center gap-3 px-4 py-1.5 bg-white dark:bg-[#12121a] border-t border-slate-200 dark:border-white/10 text-xs text-slate-500 dark:text-white/50 shrink-0",children:[(0,e.jsxs)("span",{children:[h.split("\n").length," lines"]}),(0,e.jsx)("div",{className:"flex-1"}),(0,e.jsx)("span",{className:"px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 font-medium",children:ti[m]})]})]}),(0,e.jsxs)("aside",{className:`${"tests"===F?"flex":"hidden"} lg:flex w-full lg:w-[300px] flex-shrink-0 flex-col bg-white dark:bg-[#12121a]`,children:[(0,e.jsx)("div",{className:"flex border-b border-slate-200 dark:border-white/10 shrink-0",children:["results","output"].map(t=>(0,e.jsx)("button",{onClick:()=>j(t),className:`flex-1 py-2.5 text-xs font-medium transition-colors border-b-2 capitalize ${k===t?"text-amber-600 dark:text-amber-400 border-amber-500":"text-slate-400 dark:text-white/40 border-transparent hover:text-slate-600 dark:hover:text-white/70"}`,children:"results"===t?"Test Results":"Output"},t))}),(0,e.jsxs)("div",{className:"flex-1 overflow-y-auto",children:["results"===k&&(0,e.jsxs)("div",{className:"p-3 space-y-3",children:[!y&&!x&&(0,e.jsxs)("div",{className:"flex flex-col items-center gap-3 py-14 text-slate-400 dark:text-white/40",children:[(0,e.jsx)(A.Play,{className:"w-8 h-8 opacity-25"}),(0,e.jsx)("p",{className:"text-xs text-center",children:"Run your code to see test results"})]}),x&&(0,e.jsxs)("div",{className:"flex flex-col items-center gap-3 py-14 text-slate-500 dark:text-white/50",children:[(0,e.jsx)("div",{className:"w-8 h-8 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin"}),(0,e.jsx)("p",{className:"text-xs",children:"Running tests…"})]}),y&&!x&&(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)("div",{className:"rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm p-3 space-y-2",children:[(0,e.jsxs)("div",{className:"flex items-center justify-between",children:[(0,e.jsx)("span",{className:"text-xs text-slate-500 dark:text-white/50",children:"Score"}),(0,e.jsxs)("span",{className:`text-2xl font-bold tabular-nums ${Y}`,children:[U,(0,e.jsx)("span",{className:"text-xs font-normal text-slate-400 dark:text-white/40",children:"/100"})]})]}),(0,e.jsx)("div",{className:"h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden",children:(0,e.jsx)("div",{className:`h-full rounded-full transition-all duration-700 ${Z}`,style:{width:`${U}%`}})}),(0,e.jsx)("p",{className:"text-xs text-slate-600 dark:text-white/70 leading-relaxed",children:y.feedback})]}),y.testResults.length>0&&(0,e.jsx)("div",{className:"space-y-1.5",children:y.testResults.map((t,n)=>(0,e.jsxs)("div",{className:`flex items-start gap-2 p-2.5 rounded-lg text-xs ${t.passed?"bg-emerald-50 border border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20":"bg-red-50 border border-red-200 dark:bg-red-500/10 dark:border-red-500/20"}`,children:[t.passed?(0,e.jsx)(E.CheckCircle,{className:"w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0"}):(0,e.jsx)(z,{className:"w-3.5 h-3.5 text-red-600 dark:text-red-400 mt-0.5 shrink-0"}),(0,e.jsx)("span",{className:t.passed?"text-emerald-700 dark:text-emerald-300":"text-red-700 dark:text-red-300",children:t.description||`Test ${t.num}`})]},n))}),y.passed&&(0,e.jsxs)("div",{className:"rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 p-3 flex items-center gap-2",children:[(0,e.jsx)(E.CheckCircle,{className:"w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0"}),(0,e.jsxs)("div",{children:[(0,e.jsx)("p",{className:"text-xs font-semibold text-emerald-700 dark:text-emerald-300",children:"All tests passed!"}),(0,e.jsxs)("p",{className:"text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5",children:[y.passedTests,"/",y.totalTests," test cases"]})]})]}),y.errorHint&&(0,e.jsx)("div",{className:"rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/15 overflow-hidden",children:(0,e.jsxs)("div",{className:"flex items-start gap-2.5 px-3 py-3",children:[(0,e.jsx)(L,{className:"w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0"}),(0,e.jsxs)("div",{children:[(0,e.jsx)("p",{className:"text-xs font-semibold text-amber-700 dark:text-amber-300",children:y.errorHint.title}),(0,e.jsx)("p",{className:"text-xs text-amber-700 dark:text-amber-300 mt-0.5",children:y.errorHint.cause}),(0,e.jsx)("p",{className:"text-xs text-amber-800 dark:text-amber-200 mt-1",children:y.errorHint.fix}),y.errorHint.example&&(0,e.jsx)("code",{className:"text-[11px] text-amber-800 dark:text-amber-200 font-mono mt-1.5 block bg-amber-100 dark:bg-amber-500/20 rounded px-2 py-1",children:y.errorHint.example})]})]})})]})]}),"output"===k&&(0,e.jsxs)("div",{className:"p-3 space-y-2",children:[w?.stdout&&(0,e.jsxs)("div",{children:[(0,e.jsx)("p",{className:"text-[10px] font-semibold uppercase text-slate-400 dark:text-white/40 mb-1.5",children:"stdout"}),(0,e.jsx)("pre",{className:"text-xs font-mono text-green-300/75 leading-relaxed whitespace-pre-wrap bg-[#0a0a14] rounded-lg p-3 border border-slate-700",children:w.stdout})]}),w?.stderr&&(0,e.jsxs)("div",{children:[(0,e.jsx)("p",{className:"text-[10px] font-semibold uppercase text-red-500 mb-1.5",children:"stderr"}),(0,e.jsx)("pre",{className:"text-xs font-mono text-red-300/75 leading-relaxed whitespace-pre-wrap bg-[#0a0a14] rounded-lg p-3 border border-red-500/30",children:w.stderr})]}),!w&&!x&&(0,e.jsxs)("div",{className:"flex flex-col items-center gap-2 py-14 text-slate-400 dark:text-white/40",children:[(0,e.jsx)(P.Terminal,{className:"w-8 h-8 opacity-25"}),(0,e.jsx)("p",{className:"text-xs",children:"Run your code to see output"})]})]})]})]})]})]})}],4908)}]);