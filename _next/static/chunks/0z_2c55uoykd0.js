(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,67585,(e,t,s)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0}),Object.defineProperty(s,"BailoutToCSR",{enumerable:!0,get:function(){return a}});let n=e.r(32061);function a({reason:e,children:t}){if("u"<typeof window)throw Object.defineProperty(new n.BailoutToCSRError(e),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return t}},9885,(e,t,s)=>{"use strict";function n(e){return e.split("/").map(e=>encodeURIComponent(e)).join("/")}Object.defineProperty(s,"__esModule",{value:!0}),Object.defineProperty(s,"encodeURIPath",{enumerable:!0,get:function(){return n}})},52157,(e,t,s)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0}),Object.defineProperty(s,"PreloadChunks",{enumerable:!0,get:function(){return o}});let n=e.r(43476),a=e.r(74080),r=e.r(63599),l=e.r(9885),i=e.r(43369);function o({moduleIds:e}){if("u">typeof window)return null;let t=r.workAsyncStorage.getStore();if(void 0===t)return null;let s=[];if(t.reactLoadableManifest&&e){let n=t.reactLoadableManifest;for(let t of e){if(!n[t])continue;let e=n[t].files;s.push(...e)}}if(0===s.length)return null;let d=(0,i.getAssetTokenQuery)();return(0,n.jsx)(n.Fragment,{children:s.map(e=>{let s=`${t.assetPrefix}/_next/${(0,l.encodeURIPath)(e)}${d}`;return e.endsWith(".css")?(0,n.jsx)("link",{precedence:"dynamic",href:s,rel:"stylesheet",as:"style",nonce:t.nonce},e):((0,a.preload)(s,{as:"script",fetchPriority:"low",nonce:t.nonce}),null)})})}},69093,(e,t,s)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0}),Object.defineProperty(s,"default",{enumerable:!0,get:function(){return d}});let n=e.r(43476),a=e.r(71645),r=e.r(67585),l=e.r(52157);function i(e){return{default:e&&"default"in e?e.default:e}}let o={loader:()=>Promise.resolve(i(()=>null)),loading:null,ssr:!0},d=function(e){let t={...o,...e},s=(0,a.lazy)(()=>t.loader().then(i)),d=t.loading;function c(e){let i=d?(0,n.jsx)(d,{isLoading:!0,pastDelay:!0,error:null}):null,o=!t.ssr||!!t.loading,c=o?a.Suspense:a.Fragment,x=t.ssr?(0,n.jsxs)(n.Fragment,{children:["u"<typeof window?(0,n.jsx)(l.PreloadChunks,{moduleIds:t.modules}):null,(0,n.jsx)(s,{...e})]}):(0,n.jsx)(r.BailoutToCSR,{reason:"next/dynamic",children:(0,n.jsx)(s,{...e})});return(0,n.jsx)(c,{...o?{fallback:i}:{},children:x})}return c.displayName="LoadableComponent",c}},70703,(e,t,s)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0}),Object.defineProperty(s,"default",{enumerable:!0,get:function(){return a}});let n=e.r(55682)._(e.r(69093));function a(e,t){let s={};"function"==typeof e&&(s.loader=e);let a={...s,...t};return(0,n.default)({...a,modules:a.loadableGenerated?.modules})}("function"==typeof s.default||"object"==typeof s.default&&null!==s.default)&&void 0===s.default.__esModule&&(Object.defineProperty(s.default,"__esModule",{value:!0}),Object.assign(s.default,s),t.exports=s.default)},98242,e=>{"use strict";var t=e.i(43476),s=e.i(71645),n=e.i(70703),a=e.i(62319),r=e.i(56420);let l=(0,r.default)("terminal",[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]]);var i=e.i(21357),o=e.i(30274);let d=(0,r.default)("save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);var c=e.i(28623),x=e.i(16327),m=e.i(67927),p=e.i(48161);let u=(0,r.default)("circle-x",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);var h=e.i(74544);let g=(0,r.default)("memory-stick",[["path",{d:"M12 12v-2",key:"fwoke6"}],["path",{d:"M12 18v-2",key:"qj6yno"}],["path",{d:"M16 12v-2",key:"heuere"}],["path",{d:"M16 18v-2",key:"s1ct0w"}],["path",{d:"M2 11h1.5",key:"15p63e"}],["path",{d:"M20 18v-2",key:"12ehxp"}],["path",{d:"M20.5 11H22",key:"khsy7a"}],["path",{d:"M4 18v-2",key:"1c3oqr"}],["path",{d:"M8 12v-2",key:"1mwtfd"}],["path",{d:"M8 18v-2",key:"qcmpov"}],["rect",{x:"2",y:"6",width:"20",height:"10",rx:"2",key:"1qcswk"}]]),b=(0,r.default)("lightbulb",[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]);var f=e.i(52330);let w=(0,r.default)("sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]),j=(0,r.default)("moon",[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]]),y=(0,r.default)("circle-alert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]),v=(0,n.default)(()=>e.A(53096),{loadableGenerated:{modules:[67211]},ssr:!1,loading:()=>(0,t.jsx)("div",{className:"flex items-center justify-center h-full bg-[#1e1e1e]",children:(0,t.jsxs)("div",{className:"flex flex-col items-center gap-3",children:[(0,t.jsx)("div",{className:"w-8 h-8 border-2 border-purple-500/40 border-t-purple-500 rounded-full animate-spin"}),(0,t.jsx)("span",{className:"text-white/40 text-sm font-mono",children:"Loading editor…"})]})})}),N={python:`# Two Sum Problem
# Given an array of integers nums and an integer target,
# return indices of the two numbers such that they add up to target.
#
# Time Complexity: O(n)  |  Space Complexity: O(n)

from typing import List

def two_sum(nums: List[int], target: int) -> List[int]:
    """
    Uses a hash map to store complement indices.
    Returns [i, j] where nums[i] + nums[j] == target.
    """
    seen = {}  # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []  # No solution found


# ─── Test your solution ──────────────────────────────────
if __name__ == "__main__":
    print(two_sum([2, 7, 11, 15], 9))   # Expected: [0, 1]
    print(two_sum([3, 2, 4], 6))         # Expected: [1, 2]
    print(two_sum([3, 3], 6))            # Expected: [0, 1]
`,javascript:`// Two Sum Problem
// Given an array of integers nums and an integer target,
// return indices of the two numbers such that they add up to target.
//
// Time Complexity: O(n)  |  Space Complexity: O(n)

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  const seen = new Map(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }

  return []; // No solution found
}

// ─── Test your solution ──────────────────────────────────
console.log(twoSum([2, 7, 11, 15], 9));  // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6));        // Expected: [1, 2]
console.log(twoSum([3, 3], 6));           // Expected: [0, 1]
`,typescript:`// Two Sum Problem
// Given an array of integers nums and an integer target,
// return indices of the two numbers such that they add up to target.
//
// Time Complexity: O(n)  |  Space Complexity: O(n)

function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const complement: number = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement)!, i];
    }
    seen.set(nums[i], i);
  }

  return []; // No solution found
}

// ─── Test your solution ──────────────────────────────────
console.log(twoSum([2, 7, 11, 15], 9));  // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6));        // Expected: [1, 2]
console.log(twoSum([3, 3], 6));           // Expected: [0, 1]
`,java:`// Two Sum Problem
// Given an array of integers nums and an integer target,
// return indices of the two numbers such that they add up to target.
//
// Time Complexity: O(n)  |  Space Complexity: O(n)

import java.util.HashMap;
import java.util.Arrays;

public class Solution {

    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> seen = new HashMap<>(); // value -> index

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            seen.put(nums[i], i);
        }

        return new int[] {}; // No solution found
    }

    // ─── Test your solution ──────────────────────────────
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(Arrays.toString(sol.twoSum(new int[]{2,7,11,15}, 9))); // [0, 1]
        System.out.println(Arrays.toString(sol.twoSum(new int[]{3,2,4}, 6)));     // [1, 2]
        System.out.println(Arrays.toString(sol.twoSum(new int[]{3,3}, 6)));       // [0, 1]
    }
}
`,go:`// Two Sum Problem
// Given an array of integers nums and an integer target,
// return indices of the two numbers such that they add up to target.
//
// Time Complexity: O(n)  |  Space Complexity: O(n)

package main

import "fmt"

func twoSum(nums []int, target int) []int {
	seen := make(map[int]int) // value -> index

	for i, num := range nums {
		complement := target - num
		if j, ok := seen[complement]; ok {
			return []int{j, i}
		}
		seen[num] = i
	}

	return []int{} // No solution found
}

// ─── Test your solution ──────────────────────────────────
func main() {
	fmt.Println(twoSum([]int{2, 7, 11, 15}, 9)) // [0 1]
	fmt.Println(twoSum([]int{3, 2, 4}, 6))       // [1 2]
	fmt.Println(twoSum([]int{3, 3}, 6))           // [0 1]
}
`,cpp:`// Two Sum Problem
// Given an array of integers nums and an integer target,
// return indices of the two numbers such that they add up to target.
//
// Time Complexity: O(n)  |  Space Complexity: O(n)

#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen; // value -> index

    for (int i = 0; i < (int)nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.count(complement)) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }

    return {}; // No solution found
}

// ─── Test your solution ──────────────────────────────────
int main() {
    vector<int> a = {2, 7, 11, 15};
    auto r1 = twoSum(a, 9);
    cout << "[" << r1[0] << ", " << r1[1] << "]" << endl; // [0, 1]

    vector<int> b = {3, 2, 4};
    auto r2 = twoSum(b, 6);
    cout << "[" << r2[0] << ", " << r2[1] << "]" << endl; // [1, 2]

    vector<int> c = {3, 3};
    auto r3 = twoSum(c, 6);
    cout << "[" << r3[0] << ", " << r3[1] << "]" << endl; // [0, 1]

    return 0;
}
`},k={python:{label:"Python",monacoLang:"python"},javascript:{label:"JavaScript",monacoLang:"javascript"},typescript:{label:"TypeScript",monacoLang:"typescript"},java:{label:"Java",monacoLang:"java"},go:{label:"Go",monacoLang:"go"},cpp:{label:"C++",monacoLang:"cpp"}},S=[{id:1,input:"nums=[2,7,11,15], target=9",expected:"[0,1]",actual:"",status:"pending"},{id:2,input:"nums=[3,2,4], target=6",expected:"[1,2]",actual:"",status:"pending"},{id:3,input:"nums=[3,3], target=6",expected:"[0,1]",actual:"",status:"pending"}];e.s(["default",0,function(){let[e,n]=(0,s.useState)("python"),[r,C]=(0,s.useState)(N.python),[M,O]=(0,s.useState)("vs-dark"),[P,_]=(0,s.useState)("output"),[T,E]=(0,s.useState)(!1),[L,R]=(0,s.useState)(null),[A,H]=(0,s.useState)(!1),[I,z]=(0,s.useState)(S),[G,B]=(0,s.useState)(!0),[$,q]=(0,s.useState)(!1),D=r.split("\n").length,F=r.length;return(0,s.useEffect)(()=>{if(!$)return;let e=()=>q(!1);return window.addEventListener("click",e),()=>window.removeEventListener("click",e)},[$]),(0,t.jsxs)("div",{className:"flex flex-col h-screen bg-[#0a0a0f] overflow-hidden",children:[(0,t.jsx)(a.default,{}),(0,t.jsxs)("div",{className:"flex items-center gap-3 px-4 py-2 border-b border-white/10 bg-black/40 backdrop-blur-md mt-16 flex-shrink-0",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 mr-4",children:[(0,t.jsx)("div",{className:"p-1.5 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500",children:(0,t.jsx)(l,{className:"w-4 h-4 text-white"})}),(0,t.jsx)("span",{className:"font-bold text-white text-sm tracking-tight hidden sm:block",children:"Code Lab"})]}),(0,t.jsxs)("div",{className:"relative",onClick:e=>{e.stopPropagation(),q(!$)},children:[(0,t.jsxs)("button",{className:"flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm text-white/80",children:[(0,t.jsx)(f.Code2,{className:"w-3.5 h-3.5 text-cyan-400"}),k[e].label,(0,t.jsx)(x.ChevronDown,{className:"w-3.5 h-3.5 text-white/40"})]}),$&&(0,t.jsx)("div",{className:"absolute top-full left-0 mt-1 w-40 rounded-xl bg-[#1a1a2e] border border-white/10 shadow-xl z-50 overflow-hidden",children:Object.keys(k).map(s=>(0,t.jsx)("button",{onClick:()=>{n(s),C(N[s]),R(null),z(S),q(!1)},className:`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-white/10 ${e===s?"text-cyan-400 bg-white/5":"text-white/70"}`,children:k[s].label},s))})]}),(0,t.jsxs)("button",{onClick:()=>O("vs-dark"===M?"light":"vs-dark"),className:"flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm text-white/80",children:["vs-dark"===M?(0,t.jsx)(j,{className:"w-3.5 h-3.5 text-indigo-400"}):(0,t.jsx)(w,{className:"w-3.5 h-3.5 text-yellow-400"}),(0,t.jsx)("span",{className:"hidden sm:block",children:"vs-dark"===M?"Dark":"Light"})]}),(0,t.jsx)("div",{className:"flex-1"}),(0,t.jsxs)("button",{className:"flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm",onClick:()=>_("review"),children:[(0,t.jsx)(c.Sparkles,{className:"w-3.5 h-3.5 text-purple-400"}),(0,t.jsx)("span",{className:"bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-medium hidden sm:block",children:"AI Review"})]}),(0,t.jsxs)("button",{className:"flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 hover:border-white/40 bg-transparent text-white/70 hover:text-white transition-colors text-sm",children:[(0,t.jsx)(d,{className:"w-3.5 h-3.5"}),(0,t.jsx)("span",{className:"hidden sm:block",children:"Save"})]}),(0,t.jsxs)("button",{className:"flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-medium transition-all shadow-lg shadow-purple-900/30",children:[(0,t.jsx)(o.Send,{className:"w-3.5 h-3.5"}),(0,t.jsx)("span",{className:"hidden sm:block",children:"Submit"})]}),(0,t.jsxs)("button",{onClick:()=>{E(!0),_("output"),setTimeout(()=>{E(!1),R(`>>> Running ${k[e].label} code...

[0, 1]
[1, 2]
[0, 1]

✓ All test cases passed!
Execution time : 42 ms
Memory usage   : 18.3 MB`),z([{id:1,input:"nums=[2,7,11,15], target=9",expected:"[0,1]",actual:"[0,1]",status:"passed"},{id:2,input:"nums=[3,2,4], target=6",expected:"[1,2]",actual:"[1,2]",status:"passed"},{id:3,input:"nums=[3,3], target=6",expected:"[0,1]",actual:"[0,1]",status:"passed"}])},1500)},disabled:T,className:"flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium transition-all shadow-lg shadow-green-900/30",children:[T?(0,t.jsx)("div",{className:"w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"}):(0,t.jsx)(i.Play,{className:"w-3.5 h-3.5 fill-white"}),T?"Running…":"Run"]})]}),(0,t.jsxs)("div",{className:"flex flex-1 overflow-hidden",children:[(0,t.jsxs)("aside",{className:"w-[250px] flex-shrink-0 border-r border-white/10 bg-black/20 flex flex-col overflow-y-auto",children:[(0,t.jsxs)("div",{className:"p-4 border-b border-white/10",children:[(0,t.jsx)("h2",{className:"font-semibold text-white text-sm leading-tight",children:"Two Sum Problem"}),(0,t.jsxs)("div",{className:"flex items-center gap-2 mt-2",children:[(0,t.jsx)("span",{className:"px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",children:"Medium"}),(0,t.jsx)("span",{className:"px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30",children:"+150 XP"})]})]}),(0,t.jsxs)("div",{className:"p-4 border-b border-white/10 text-white/70 text-xs leading-relaxed space-y-2",children:[(0,t.jsxs)("p",{children:["Given an array of integers ",(0,t.jsx)("code",{className:"text-cyan-400 bg-cyan-400/10 px-1 rounded",children:"nums"})," and an integer ",(0,t.jsx)("code",{className:"text-cyan-400 bg-cyan-400/10 px-1 rounded",children:"target"}),", return indices of the two numbers such that they add up to ",(0,t.jsx)("code",{className:"text-cyan-400 bg-cyan-400/10 px-1 rounded",children:"target"}),"."]}),(0,t.jsxs)("p",{children:["You may assume that each input would have ",(0,t.jsx)("strong",{className:"text-white/90",children:"exactly one solution"}),", and you may not use the same element twice."]}),(0,t.jsx)("p",{children:"You can return the answer in any order."})]}),(0,t.jsxs)("div",{className:"p-4 border-b border-white/10 space-y-3",children:[(0,t.jsx)("h3",{className:"text-white/90 text-xs font-semibold uppercase tracking-wider",children:"Examples"}),(0,t.jsxs)("div",{className:"rounded-lg bg-white/5 border border-white/10 p-3 space-y-1.5 text-xs font-mono",children:[(0,t.jsx)("div",{className:"text-white/50",children:"Input:"}),(0,t.jsx)("div",{className:"text-green-400",children:"nums = [2,7,11,15], target = 9"}),(0,t.jsx)("div",{className:"text-white/50 pt-1",children:"Output:"}),(0,t.jsx)("div",{className:"text-cyan-400",children:"[0,1]"}),(0,t.jsx)("div",{className:"text-white/40 text-[10px] pt-1",children:"nums[0] + nums[1] = 2 + 7 = 9"})]}),(0,t.jsxs)("div",{className:"rounded-lg bg-white/5 border border-white/10 p-3 space-y-1.5 text-xs font-mono",children:[(0,t.jsx)("div",{className:"text-white/50",children:"Input:"}),(0,t.jsx)("div",{className:"text-green-400",children:"nums = [3,2,4], target = 6"}),(0,t.jsx)("div",{className:"text-white/50 pt-1",children:"Output:"}),(0,t.jsx)("div",{className:"text-cyan-400",children:"[1,2]"})]})]}),(0,t.jsxs)("div",{className:"p-4 border-b border-white/10 space-y-2",children:[(0,t.jsx)("h3",{className:"text-white/90 text-xs font-semibold uppercase tracking-wider",children:"Constraints"}),(0,t.jsxs)("ul",{className:"space-y-1 text-xs text-white/60 font-mono",children:[(0,t.jsxs)("li",{className:"flex items-start gap-1.5",children:[(0,t.jsx)("span",{className:"text-purple-400 mt-0.5",children:"•"})," 2 ≤ nums.length ≤ 10⁴"]}),(0,t.jsxs)("li",{className:"flex items-start gap-1.5",children:[(0,t.jsx)("span",{className:"text-purple-400 mt-0.5",children:"•"})," -10⁹ ≤ nums[i] ≤ 10⁹"]}),(0,t.jsxs)("li",{className:"flex items-start gap-1.5",children:[(0,t.jsx)("span",{className:"text-purple-400 mt-0.5",children:"•"})," -10⁹ ≤ target ≤ 10⁹"]}),(0,t.jsxs)("li",{className:"flex items-start gap-1.5",children:[(0,t.jsx)("span",{className:"text-purple-400 mt-0.5",children:"•"})," Only one valid answer exists."]})]})]}),(0,t.jsxs)("div",{className:"p-4 border-b border-white/10 space-y-2",children:[(0,t.jsxs)("button",{onClick:()=>H(!A),className:"flex items-center gap-2 text-xs font-medium text-yellow-400 hover:text-yellow-300 transition-colors",children:[(0,t.jsx)(b,{className:"w-3.5 h-3.5"}),A?"Hide Hints":"Show Hints",(0,t.jsx)(x.ChevronDown,{className:`w-3 h-3 transition-transform ${A?"rotate-180":""}`})]}),A&&(0,t.jsxs)("div",{className:"space-y-2 mt-1",children:[(0,t.jsxs)("div",{className:"rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-2.5 text-xs text-yellow-200/80",children:[(0,t.jsx)("span",{className:"text-yellow-400 font-semibold",children:"Hint 1:"})," A brute force approach runs in O(n²). Can you do better?"]}),(0,t.jsxs)("div",{className:"rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-2.5 text-xs text-yellow-200/80",children:[(0,t.jsx)("span",{className:"text-yellow-400 font-semibold",children:"Hint 2:"}),"Try storing each number's complement in a hash map as you iterate."]})]})]}),(0,t.jsxs)("div",{className:"p-4",children:[(0,t.jsxs)("button",{onClick:()=>B(!G),className:"flex items-center gap-2 text-xs font-medium text-white/70 hover:text-white transition-colors w-full",children:[G?(0,t.jsx)(x.ChevronDown,{className:"w-3.5 h-3.5"}):(0,t.jsx)(m.ChevronRight,{className:"w-3.5 h-3.5"}),"Test Cases",(0,t.jsx)("span",{className:"ml-auto text-white/40",children:"3"})]}),G&&(0,t.jsx)("div",{className:"mt-2 space-y-2",children:I.map(e=>(0,t.jsxs)("div",{className:"rounded-lg bg-white/5 border border-white/10 p-2.5 text-xs",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-1.5",children:[(0,t.jsxs)("span",{className:"text-white/50 font-medium",children:["Case ",e.id]}),"passed"===e.status&&(0,t.jsx)(p.CheckCircle,{className:"w-3.5 h-3.5 text-green-400"}),"failed"===e.status&&(0,t.jsx)(u,{className:"w-3.5 h-3.5 text-red-400"}),"pending"===e.status&&(0,t.jsx)(y,{className:"w-3.5 h-3.5 text-white/30"})]}),(0,t.jsxs)("div",{className:"font-mono text-white/60 leading-relaxed space-y-0.5",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-white/30",children:"in: "}),e.input]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-white/30",children:"exp: "}),e.expected]})]})]},e.id))})]})]}),(0,t.jsxs)("div",{className:"flex-1 flex flex-col min-w-0 border-r border-white/10",children:[(0,t.jsx)("div",{className:"flex-1 border border-white/10 overflow-hidden",children:(0,t.jsx)(v,{height:"100%",language:k[e].monacoLang,theme:M,value:r,onChange:e=>C(e??""),options:{fontSize:13,fontFamily:'"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',fontLigatures:!0,lineNumbers:"on",minimap:{enabled:!1},scrollBeyondLastLine:!1,wordWrap:"on",padding:{top:16,bottom:16},renderLineHighlight:"gutter",smoothScrolling:!0,cursorBlinking:"smooth",tabSize:4,bracketPairColorization:{enabled:!0}}})}),(0,t.jsxs)("div",{className:"flex items-center gap-4 px-4 py-1.5 bg-black/40 border-t border-white/10 text-xs text-white/40 flex-shrink-0",children:[(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)("kbd",{className:"px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-white/50",children:"Ctrl"}),(0,t.jsx)("span",{children:"+"}),(0,t.jsx)("kbd",{className:"px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-white/50",children:"Enter"}),(0,t.jsx)("span",{className:"ml-1",children:"to run"})]}),(0,t.jsx)("span",{className:"hidden sm:block",children:"|"}),(0,t.jsxs)("span",{className:"hidden sm:flex items-center gap-1",children:[(0,t.jsx)("kbd",{className:"px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-white/50",children:"Ctrl"}),(0,t.jsx)("span",{children:"+"}),(0,t.jsx)("kbd",{className:"px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-white/50",children:"S"}),(0,t.jsx)("span",{className:"ml-1",children:"to save"})]}),(0,t.jsx)("div",{className:"flex-1"}),(0,t.jsxs)("span",{children:[D," lines"]}),(0,t.jsxs)("span",{className:"hidden sm:block",children:[F," chars"]}),(0,t.jsx)("span",{className:"px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30 font-medium",children:k[e].label})]})]}),(0,t.jsxs)("aside",{className:"w-[300px] flex-shrink-0 flex flex-col bg-black/30",children:[(0,t.jsx)("div",{className:"flex border-b border-white/10 flex-shrink-0",children:["output","review","testcases"].map(e=>(0,t.jsxs)("button",{onClick:()=>_(e),className:`flex-1 py-2.5 text-xs font-medium transition-colors border-b-2 ${P===e?"text-white border-purple-500":"text-white/40 border-transparent hover:text-white/70"}`,children:["output"===e&&"Output","review"===e&&(0,t.jsxs)("span",{className:"flex items-center justify-center gap-1",children:[(0,t.jsx)(c.Sparkles,{className:"w-3 h-3"})," AI Review"]}),"testcases"===e&&"Test Cases"]},e))}),(0,t.jsxs)("div",{className:"flex-1 overflow-y-auto",children:["output"===P&&(0,t.jsxs)("div",{className:"p-3 h-full flex flex-col gap-3",children:[(0,t.jsx)("div",{className:"flex-1 rounded-xl bg-[#0d0d1a] border border-white/10 p-3 font-mono text-xs overflow-y-auto min-h-[120px]",children:T?(0,t.jsxs)("div",{className:"flex items-center gap-2 text-white/50",children:[(0,t.jsx)("div",{className:"w-3 h-3 border border-green-500/40 border-t-green-500 rounded-full animate-spin"}),"Executing…"]}):L?(0,t.jsx)("pre",{className:"whitespace-pre-wrap text-green-300 leading-relaxed",children:L}):(0,t.jsxs)("div",{className:"flex flex-col items-center justify-center h-full gap-2 text-white/30 py-8",children:[(0,t.jsx)(l,{className:"w-8 h-8 opacity-30"}),(0,t.jsx)("span",{children:"Run your code to see output"})]})}),L&&!T&&(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-2",children:[(0,t.jsxs)("div",{className:"rounded-lg bg-white/5 border border-white/10 p-2.5 flex items-center gap-2",children:[(0,t.jsx)(h.Clock,{className:"w-4 h-4 text-cyan-400 flex-shrink-0"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"text-white/40 text-[10px]",children:"Time"}),(0,t.jsx)("div",{className:"text-white text-xs font-semibold",children:"42 ms"})]})]}),(0,t.jsxs)("div",{className:"rounded-lg bg-white/5 border border-white/10 p-2.5 flex items-center gap-2",children:[(0,t.jsx)(g,{className:"w-4 h-4 text-purple-400 flex-shrink-0"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"text-white/40 text-[10px]",children:"Memory"}),(0,t.jsx)("div",{className:"text-white text-xs font-semibold",children:"18.3 MB"})]})]})]}),L&&!T&&(0,t.jsxs)("div",{className:"rounded-xl bg-green-500/10 border border-green-500/20 p-3 flex items-center gap-2",children:[(0,t.jsx)(p.CheckCircle,{className:"w-4 h-4 text-green-400 flex-shrink-0"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"text-green-400 text-xs font-semibold",children:"All Tests Passed"}),(0,t.jsx)("div",{className:"text-green-300/60 text-[10px]",children:"3 / 3 test cases passed"})]})]})]}),"review"===P&&(0,t.jsxs)("div",{className:"p-3 space-y-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 pb-1",children:[(0,t.jsx)("div",{className:"p-1.5 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500",children:(0,t.jsx)(c.Sparkles,{className:"w-3.5 h-3.5 text-white"})}),(0,t.jsx)("span",{className:"text-sm font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent",children:"AI Code Review"})]}),(0,t.jsxs)("div",{className:"rounded-xl bg-green-500/10 border border-green-500/20 p-3 space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(p.CheckCircle,{className:"w-4 h-4 text-green-400"}),(0,t.jsx)("span",{className:"text-xs font-semibold text-green-400",children:"Code Quality"})]}),(0,t.jsx)("p",{className:"text-xs text-white/70 pl-6",children:"Good structure and naming conventions. Clean, readable code."})]}),(0,t.jsxs)("div",{className:"rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-3 space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(h.Clock,{className:"w-4 h-4 text-cyan-400"}),(0,t.jsx)("span",{className:"text-xs font-semibold text-cyan-400",children:"Time Complexity"})]}),(0,t.jsxs)("p",{className:"text-xs text-white/70 pl-6",children:[(0,t.jsx)("span",{className:"font-mono bg-cyan-400/10 text-cyan-300 px-1.5 py-0.5 rounded",children:"O(n)"})," "," — Optimal hash map approach. Excellent!"]})]}),(0,t.jsxs)("div",{className:"rounded-xl bg-purple-500/10 border border-purple-500/20 p-3 space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(g,{className:"w-4 h-4 text-purple-400"}),(0,t.jsx)("span",{className:"text-xs font-semibold text-purple-400",children:"Space Complexity"})]}),(0,t.jsxs)("p",{className:"text-xs text-white/70 pl-6",children:[(0,t.jsx)("span",{className:"font-mono bg-purple-400/10 text-purple-300 px-1.5 py-0.5 rounded",children:"O(n)"})," "," — Hash map grows linearly with input size."]})]}),(0,t.jsxs)("div",{className:"rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-3 space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(b,{className:"w-4 h-4 text-yellow-400"}),(0,t.jsx)("span",{className:"text-xs font-semibold text-yellow-400",children:"Suggestion"})]}),(0,t.jsx)("p",{className:"text-xs text-white/70 pl-6",children:"Consider adding an early exit or input validation for empty arrays."}),(0,t.jsx)("div",{className:"rounded-lg bg-black/40 border border-white/10 p-2.5 ml-2 font-mono text-[11px] text-green-300 leading-relaxed",children:`if not nums:
    return []
# ... rest of logic`})]}),(0,t.jsxs)("div",{className:"rounded-xl bg-white/5 border border-white/10 p-3 space-y-2",children:[(0,t.jsx)("h4",{className:"text-xs font-semibold text-white/80",children:"Detailed Analysis"}),(0,t.jsxs)("ul",{className:"space-y-1.5 text-xs text-white/60",children:[(0,t.jsxs)("li",{className:"flex items-start gap-2",children:[(0,t.jsx)(p.CheckCircle,{className:"w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0"}),"Single-pass solution — avoids nested loops entirely."]}),(0,t.jsxs)("li",{className:"flex items-start gap-2",children:[(0,t.jsx)(p.CheckCircle,{className:"w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0"}),"Hash map lookup is O(1) average case."]}),(0,t.jsxs)("li",{className:"flex items-start gap-2",children:[(0,t.jsx)(p.CheckCircle,{className:"w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0"}),"Handles duplicate values correctly via index tracking."]}),(0,t.jsxs)("li",{className:"flex items-start gap-2",children:[(0,t.jsx)(y,{className:"w-3.5 h-3.5 text-yellow-400 mt-0.5 flex-shrink-0"}),"No input validation for edge cases (empty array, null)."]})]})]}),(0,t.jsxs)("div",{className:"rounded-xl bg-gradient-to-br from-purple-600/20 to-cyan-600/10 border border-purple-500/20 p-3 text-center",children:[(0,t.jsx)("div",{className:"text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent",children:"92/100"}),(0,t.jsx)("div",{className:"text-xs text-white/50 mt-0.5",children:"AI Score"})]})]}),"testcases"===P&&(0,t.jsxs)("div",{className:"p-3 space-y-2",children:[(0,t.jsx)("p",{className:"text-xs text-white/40 pb-1",children:"Run your code to execute test cases."}),(0,t.jsxs)("div",{className:"grid grid-cols-[1fr_auto_auto_auto] gap-2 text-[10px] font-semibold uppercase tracking-wider text-white/30 px-2",children:[(0,t.jsx)("span",{children:"Input"}),(0,t.jsx)("span",{children:"Expected"}),(0,t.jsx)("span",{children:"Actual"}),(0,t.jsx)("span",{children:"Status"})]}),I.map(e=>(0,t.jsxs)("div",{className:`rounded-xl border p-3 space-y-1.5 text-xs font-mono transition-colors ${"passed"===e.status?"bg-green-500/5 border-green-500/20":"failed"===e.status?"bg-red-500/5 border-red-500/20":"bg-white/5 border-white/10"}`,children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("span",{className:"text-white/50",children:["Case ",e.id]}),"passed"===e.status&&(0,t.jsxs)("span",{className:"flex items-center gap-1 text-green-400 text-[10px]",children:[(0,t.jsx)(p.CheckCircle,{className:"w-3 h-3"})," Passed"]}),"failed"===e.status&&(0,t.jsxs)("span",{className:"flex items-center gap-1 text-red-400 text-[10px]",children:[(0,t.jsx)(u,{className:"w-3 h-3"})," Failed"]}),"pending"===e.status&&(0,t.jsxs)("span",{className:"flex items-center gap-1 text-white/30 text-[10px]",children:[(0,t.jsx)(h.Clock,{className:"w-3 h-3"})," Pending"]})]}),(0,t.jsxs)("div",{className:"text-white/60 space-y-0.5 leading-relaxed",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-white/30",children:"Input    "}),e.input]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-white/30",children:"Expected "}),(0,t.jsx)("span",{className:"text-cyan-300",children:e.expected})]}),e.actual&&(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-white/30",children:"Actual   "}),(0,t.jsx)("span",{className:"passed"===e.status?"text-green-300":"text-red-300",children:e.actual})]})]})]},e.id))]})]})]})]})]})}],98242)}]);