// Go language pack for the Code Lab.
//
// Each entry provides the editor `starter` and the hidden `tests`. At run time
// the backend concatenates `starter + "\n" + tests` into a single main.go and
// runs `go run .`. Because Go requires package/import declarations at the top
// of the file, the `starter` carries `package main` plus exactly the imports
// the FINAL program (hidden test runner + a typical solution) needs.
//
// NOTE: this file uses TS template literals. Go raw strings (backticks) are NOT
// used anywhere; all Go strings are double-quoted to avoid escaping headaches.

// Shared test harness. Printed-representation comparison (via fmt.Sprintf %v)
// sidesteps the nil-slice vs empty-slice DeepEqual trap.
const GO_HARNESS = `var _p, _n int

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
}`

// Normalizer for order-insensitive [][]int results: sort each inner slice, then
// sort the outer slice lexicographically. Mirrors the JS/Python _norm helpers.
const GO_NORM_INT2D = `func _norm(a [][]int) [][]int {
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
}`

// Normalizer for order-insensitive [][]string results (group-anagrams): sort
// each inner slice, then sort the outer slice lexicographically by joined key.
const GO_NORM_STR2D = `func _normS(a [][]string) [][]string {
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
}`

// Level-order tree builder shared by all TreeNode problems. Uses a sentinel
// (interface{} nil) to represent missing nodes, matching the JS _tree builder.
const GO_TREE = `type TreeNode struct {
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
}`

// Linked-list helpers shared by ListNode problems.
const GO_LIST = `type ListNode struct {
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
}`

export const GO_PACK: Record<string, { starter: string; tests: string }> = {
  'two-sum': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func twoSum(nums []int, target int) []int {
	return nil
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(twoSum([]int{2, 7, 11, 15}, 9), []int{0, 1}, "example 1")
    _t(twoSum([]int{3, 2, 4}, 6), []int{1, 2}, "example 2")
    _t(twoSum([]int{3, 3}, 6), []int{0, 1}, "duplicate values")
    _t(twoSum([]int{-1, -2, -3, -4, -5}, -8), []int{2, 4}, "negative numbers")
    _t(twoSum([]int{0, 4, 3, 0}, 0), []int{0, 3}, "zeros sum to zero")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'best-time-stock': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func maxProfit(prices []int) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(maxProfit([]int{7, 1, 5, 3, 6, 4}), 5, "example 1")
    _t(maxProfit([]int{7, 6, 4, 3, 1}), 0, "strictly decreasing")
    _t(maxProfit([]int{1, 2}), 1, "two days")
    _t(maxProfit([]int{2, 4, 1}), 2, "peak before valley")
    _t(maxProfit([]int{3, 2, 6, 5, 0, 3}), 4, "buy at 2 sell at 6")
    _t(maxProfit([]int{5}), 0, "single day")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'product-except-self': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func productExceptSelf(nums []int) []int {
	return nil
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(productExceptSelf([]int{1, 2, 3, 4}), []int{24, 12, 8, 6}, "example 1")
    _t(productExceptSelf([]int{-1, 1, 0, -3, 3}), []int{0, 0, 9, 0, 0}, "contains zero")
    _t(productExceptSelf([]int{2, 3}), []int{3, 2}, "two elements")
    _t(productExceptSelf([]int{1, 1, 1, 1}), []int{1, 1, 1, 1}, "all ones")
    _t(productExceptSelf([]int{0, 0}), []int{0, 0}, "two zeros")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'maximum-subarray': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func maxSubarray(nums []int) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(maxSubarray([]int{-2, 1, -3, 4, -1, 2, 1, -5, 4}), 6, "example 1")
    _t(maxSubarray([]int{1}), 1, "single element")
    _t(maxSubarray([]int{5, 4, -1, 7, 8}), 23, "whole array")
    _t(maxSubarray([]int{-1}), -1, "single negative")
    _t(maxSubarray([]int{-2, -1}), -1, "all negative")
    _t(maxSubarray([]int{8, -19, 5, -4, 20}), 21, "restart mid-array")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'merge-intervals': {
    starter: `package main

// imports used by the hidden test runner
import (
	"fmt"
	"sort"
)

func mergeIntervals(intervals [][]int) [][]int {
	return nil
}
`,
    tests: `var _ = sort.Ints

${GO_HARNESS}

func main() {
    _t(mergeIntervals([][]int{{1, 3}, {2, 6}, {8, 10}, {15, 18}}), [][]int{{1, 6}, {8, 10}, {15, 18}}, "example 1")
    _t(mergeIntervals([][]int{{1, 4}, {4, 5}}), [][]int{{1, 5}}, "touching intervals")
    _t(mergeIntervals([][]int{{1, 4}, {2, 3}}), [][]int{{1, 4}}, "fully contained")
    _t(mergeIntervals([][]int{{5, 6}, {1, 2}}), [][]int{{1, 2}, {5, 6}}, "unsorted input")
    _t(mergeIntervals([][]int{{1, 4}, {0, 4}}), [][]int{{0, 4}}, "same end")
    _t(mergeIntervals([][]int{{2, 2}}), [][]int{{2, 2}}, "single point interval")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'first-missing-positive': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func firstMissingPositive(nums []int) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(firstMissingPositive([]int{1, 2, 0}), 3, "example 1")
    _t(firstMissingPositive([]int{3, 4, -1, 1}), 2, "example 2")
    _t(firstMissingPositive([]int{7, 8, 9, 11, 12}), 1, "no small positives")
    _t(firstMissingPositive([]int{1}), 2, "single element")
    _t(firstMissingPositive([]int{2, 1}), 3, "complete pair")
    _t(firstMissingPositive([]int{1, 1}), 2, "duplicates")
    _t(firstMissingPositive([]int{-5}), 1, "only negative")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'single-number': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func singleNumber(nums []int) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(singleNumber([]int{2, 2, 1}), 1, "example 1")
    _t(singleNumber([]int{4, 1, 2, 1, 2}), 4, "example 2")
    _t(singleNumber([]int{1}), 1, "single element")
    _t(singleNumber([]int{-1, -1, 7}), 7, "negative pairs")
    _t(singleNumber([]int{0, 1, 0}), 1, "zero pair")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'counting-bits': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func countBits(n int) []int {
	return nil
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(countBits(2), []int{0, 1, 1}, "example 1")
    _t(countBits(5), []int{0, 1, 1, 2, 1, 2}, "example 2")
    _t(countBits(0), []int{0}, "just zero")
    _t(countBits(8), []int{0, 1, 1, 2, 1, 2, 2, 3, 1}, "powers of two reset")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'climbing-stairs': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func climbStairs(n int) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(climbStairs(2), 2, "example 1")
    _t(climbStairs(3), 3, "example 2")
    _t(climbStairs(1), 1, "one step")
    _t(climbStairs(5), 8, "five steps")
    _t(climbStairs(10), 89, "ten steps")
    _t(climbStairs(45), 1836311903, "large n needs O(n)")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'house-robber': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func rob(nums []int) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(rob([]int{1, 2, 3, 1}), 4, "example 1")
    _t(rob([]int{2, 7, 9, 3, 1}), 12, "example 2")
    _t(rob([]int{5}), 5, "single house")
    _t(rob([]int{2, 1, 1, 2}), 4, "skip two in a row")
    _t(rob([]int{2, 100, 3, 100, 4}), 200, "alternating riches")
    _t(rob([]int{0, 0, 0}), 0, "nothing to steal")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'coin-change': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func coinChange(coins []int, amount int) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(coinChange([]int{1, 2, 5}, 11), 3, "example 1")
    _t(coinChange([]int{2}, 3), -1, "impossible")
    _t(coinChange([]int{1}, 0), 0, "zero amount")
    _t(coinChange([]int{1, 3, 4}, 6), 2, "greedy fails here")
    _t(coinChange([]int{2, 5, 10, 1}, 27), 4, "27 = 10+10+5+2")
    _t(coinChange([]int{186, 419, 83, 408}, 6249), 20, "large stress case")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'longest-increasing-subsequence': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func lengthOfLIS(nums []int) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(lengthOfLIS([]int{10, 9, 2, 5, 3, 7, 101, 18}), 4, "example 1")
    _t(lengthOfLIS([]int{0, 1, 0, 3, 2, 3}), 4, "example 2")
    _t(lengthOfLIS([]int{7, 7, 7, 7, 7, 7, 7}), 1, "all equal")
    _t(lengthOfLIS([]int{4, 10, 4, 3, 8, 9}), 3, "[4,8,9]")
    _t(lengthOfLIS([]int{1}), 1, "single element")
    _t(lengthOfLIS([]int{5, 4, 3, 2, 1}), 1, "strictly decreasing")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'edit-distance': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func minDistance(word1 string, word2 string) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(minDistance("horse", "ros"), 3, "example 1")
    _t(minDistance("intention", "execution"), 5, "example 2")
    _t(minDistance("", "abc"), 3, "all inserts")
    _t(minDistance("abc", ""), 3, "all deletes")
    _t(minDistance("abc", "abc"), 0, "identical")
    _t(minDistance("park", "spake"), 3, "mixed operations")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'regex-matching': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func isMatch(s string, p string) bool {
	return false
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(isMatch("aa", "a"), false, "example 1")
    _t(isMatch("aa", "a*"), true, "star expands")
    _t(isMatch("ab", ".*"), true, "dot star")
    _t(isMatch("aab", "c*a*b"), true, "zero c then two a")
    _t(isMatch("mississippi", "mis*is*p*."), false, "classic false case")
    _t(isMatch("", "c*"), true, "empty string vs star")
    _t(isMatch("ab", ".*c"), false, "trailing literal unmatched")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'number-of-islands': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func numIslands(grid [][]string) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(numIslands([][]string{{"1", "1", "1", "1", "0"}, {"1", "1", "0", "1", "0"}, {"1", "1", "0", "0", "0"}, {"0", "0", "0", "0", "0"}}), 1, "one island")
    _t(numIslands([][]string{{"1", "1", "0", "0", "0"}, {"1", "1", "0", "0", "0"}, {"0", "0", "1", "0", "0"}, {"0", "0", "0", "1", "1"}}), 3, "three islands")
    _t(numIslands([][]string{{"1"}}), 1, "single land cell")
    _t(numIslands([][]string{{"0"}}), 0, "single water cell")
    _t(numIslands([][]string{{"1", "0", "1"}, {"0", "1", "0"}, {"1", "0", "1"}}), 5, "diagonals do not connect")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'course-schedule': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func canFinish(numCourses int, prerequisites [][]int) bool {
	return false
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(canFinish(2, [][]int{{1, 0}}), true, "simple chain")
    _t(canFinish(2, [][]int{{1, 0}, {0, 1}}), false, "two-node cycle")
    _t(canFinish(5, [][]int{{1, 4}, {2, 4}, {3, 1}, {3, 2}}), true, "diamond DAG")
    _t(canFinish(1, [][]int{}), true, "no prerequisites")
    _t(canFinish(3, [][]int{{0, 1}, {1, 2}, {2, 0}}), false, "three-node cycle")
    _t(canFinish(4, [][]int{{1, 0}, {2, 1}, {3, 2}}), true, "long chain")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'word-ladder': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func ladderLength(beginWord string, endWord string, wordList []string) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(ladderLength("hit", "cog", []string{"hot", "dot", "dog", "lot", "log", "cog"}), 5, "example 1")
    _t(ladderLength("hit", "cog", []string{"hot", "dot", "dog", "lot", "log"}), 0, "endWord missing")
    _t(ladderLength("a", "c", []string{"a", "b", "c"}), 2, "single letter words")
    _t(ladderLength("hot", "dog", []string{"hot", "dog"}), 0, "no bridge word")
    _t(ladderLength("hot", "dot", []string{"dot"}), 2, "direct neighbor")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'group-anagrams': {
    starter: `package main

// imports used by the hidden test runner
import (
	"fmt"
	"sort"
	"strings"
)

func groupAnagrams(strs []string) [][]string {
	return nil
}
`,
    tests: `var _ = sort.Strings
var _ = strings.Join

${GO_NORM_STR2D}

${GO_HARNESS}

func main() {
    _t(_normS(groupAnagrams([]string{"eat", "tea", "tan", "ate", "nat", "bat"})), [][]string{{"ate", "eat", "tea"}, {"bat"}, {"nat", "tan"}}, "example 1")
    _t(_normS(groupAnagrams([]string{""})), [][]string{{""}}, "empty string")
    _t(_normS(groupAnagrams([]string{"a"})), [][]string{{"a"}}, "single string")
    _t(_normS(groupAnagrams([]string{"ab", "ba", "ab"})), [][]string{{"ab", "ab", "ba"}}, "duplicate words")
    _t(_normS(groupAnagrams([]string{"abc", "def"})), [][]string{{"abc"}, {"def"}}, "no anagrams")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'top-k-frequent': {
    starter: `package main

// imports used by the hidden test runner
import (
	"fmt"
	"sort"
)

func topKFrequent(nums []int, k int) []int {
	return nil
}
`,
    tests: `${GO_HARNESS}

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
}`,
  },

  'longest-consecutive-sequence': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func longestConsecutive(nums []int) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(longestConsecutive([]int{100, 4, 200, 1, 3, 2}), 4, "example 1")
    _t(longestConsecutive([]int{0, 3, 7, 2, 5, 8, 4, 6, 0, 1}), 9, "example 2")
    _t(longestConsecutive([]int{}), 0, "empty array")
    _t(longestConsecutive([]int{1, 2, 0, 1}), 3, "duplicates")
    _t(longestConsecutive([]int{5}), 1, "single element")
    _t(longestConsecutive([]int{-2, -1, 0, 1}), 4, "negative run")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'reverse-linked-list': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

// Provided: type ListNode struct { Val int; Next *ListNode }
func reverseList(head *ListNode) *ListNode {
	return nil
}
`,
    tests: `${GO_LIST}

${GO_HARNESS}

func main() {
    _t(_toList(reverseList(_build([]int{1, 2, 3, 4, 5}))), []int{5, 4, 3, 2, 1}, "five nodes")
    _t(_toList(reverseList(_build([]int{1, 2}))), []int{2, 1}, "two nodes")
    _t(_toList(reverseList(_build([]int{}))), []int{}, "empty list")
    _t(_toList(reverseList(_build([]int{7}))), []int{7}, "single node")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'linked-list-cycle': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

// Provided: type ListNode struct { Val int; Next *ListNode }
func hasCycle(head *ListNode) bool {
	return false
}
`,
    tests: `${GO_LIST}

${GO_HARNESS}

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
}`,
  },

  'merge-k-sorted-lists': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

// Provided: type ListNode struct { Val int; Next *ListNode }
func mergeKLists(lists []*ListNode) *ListNode {
	return nil
}
`,
    tests: `${GO_LIST}

${GO_HARNESS}

func main() {
    _t(_toList(mergeKLists([]*ListNode{_build([]int{1, 4, 5}), _build([]int{1, 3, 4}), _build([]int{2, 6})})), []int{1, 1, 2, 3, 4, 4, 5, 6}, "example 1")
    _t(_toList(mergeKLists([]*ListNode{})), []int{}, "no lists")
    _t(_toList(mergeKLists([]*ListNode{_build([]int{})})), []int{}, "one empty list")
    _t(_toList(mergeKLists([]*ListNode{_build([]int{1}), _build([]int{0})})), []int{0, 1}, "two singletons")
    _t(_toList(mergeKLists([]*ListNode{_build([]int{-2, -1}), _build([]int{}), _build([]int{-3})})), []int{-3, -2, -1}, "negatives and empty")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'palindrome-number': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func isPalindromeNumber(x int) bool {
	return false
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(isPalindromeNumber(121), true, "example 1")
    _t(isPalindromeNumber(-121), false, "negative")
    _t(isPalindromeNumber(10), false, "trailing zero")
    _t(isPalindromeNumber(0), true, "zero")
    _t(isPalindromeNumber(1221), true, "even digits")
    _t(isPalindromeNumber(1234567899), false, "large number")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'basic-calculator': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func calculate(s string) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(calculate("1 + 1"), 2, "example 1")
    _t(calculate(" 2-1 + 2 "), 3, "example 2")
    _t(calculate("(1+(4+5+2)-3)+(6+8)"), 23, "nested parens")
    _t(calculate("-2+ 1"), -1, "unary minus")
    _t(calculate("- (3 + (4 + 5))"), -12, "unary minus on group")
    _t(calculate("2147483647"), 2147483647, "single big number")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'knn-classifier': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func knnPredict(XTrain [][]float64, yTrain []int, x []float64, k int) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    X := [][]float64{{1, 1}, {2, 2}, {8, 8}, {9, 9}}
    y := []int{0, 0, 1, 1}
    _t(knnPredict(X, y, []float64{1.5, 1.5}, 3), 0, "near cluster 0")
    _t(knnPredict(X, y, []float64{8.5, 8.5}, 3), 1, "near cluster 1")
    _t(knnPredict(X, y, []float64{2, 2}, 1), 0, "exact match k=1")
    _t(knnPredict([][]float64{{0}, {1}, {2}, {10}}, []int{0, 0, 0, 1}, []float64{9}, 1), 1, "1D nearest outlier")
    _t(knnPredict([][]float64{{1, 1}, {1, 2}, {2, 1}, {5, 5}, {5, 6}}, []int{0, 0, 0, 1, 1}, []float64{4.5, 5}, 3), 1, "five points k=3")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'gradient-descent-linear': {
    starter: `package main

// imports used by the hidden test runner
import (
	"fmt"
	"math"
)

// Returns slope w and intercept b for the best-fit line y = w*x + b.
func gradientDescent(X []float64, y []float64, lr float64, epochs int) (float64, float64) {
	return 0, 0
}
`,
    tests: `var _ = math.Round

${GO_HARNESS}

func main() {
    w, b := gradientDescent([]float64{1, 2, 3, 4}, []float64{3, 5, 7, 9}, 0.01, 5000)
    _t(int(math.Round(w*5+b)), 11, "predict x=5 on y=2x+1")
    _t(int(math.Round(w*10+b)), 21, "predict x=10 on y=2x+1")
    w2, b2 := gradientDescent([]float64{0, 1, 2, 3}, []float64{1, 1, 1, 1}, 0.01, 5000)
    _t(int(math.Round(w2*7+b2)), 1, "flat data learns w=0 b=1")
    w3, b3 := gradientDescent([]float64{1, 2, 3}, []float64{-2, -4, -6}, 0.01, 5000)
    _t(int(math.Round(w3*4+b3)), -8, "negative slope y=-2x")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'min-stack': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

type MinStack struct {
}

func NewMinStack() *MinStack { return &MinStack{} }

func (s *MinStack) Push(val int) {}

func (s *MinStack) Pop() {}

func (s *MinStack) Top() int { return 0 }

func (s *MinStack) GetMin() int { return 0 }
`,
    tests: `${GO_HARNESS}

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
}`,
  },

  'lru-cache': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

type LRUCache struct {
}

func NewLRUCache(capacity int) *LRUCache { return &LRUCache{} }

func (c *LRUCache) Get(key int) int { return 0 }

func (c *LRUCache) Put(key int, value int) {}
`,
    tests: `${GO_HARNESS}

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
}`,
  },

  'subsets': {
    starter: `package main

// imports used by the hidden test runner
import (
	"fmt"
	"sort"
)

func subsets(nums []int) [][]int {
	return nil
}
`,
    tests: `${GO_NORM_INT2D}

${GO_HARNESS}

func main() {
    _t(_norm(subsets([]int{1, 2, 3})), [][]int{{}, {1}, {1, 2}, {1, 2, 3}, {1, 3}, {2}, {2, 3}, {3}}, "example 1")
    _t(_norm(subsets([]int{0})), [][]int{{}, {0}}, "single element")
    _t(len(subsets([]int{1, 2, 3, 4, 5})), 32, "2^5 subsets")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'combination-sum': {
    starter: `package main

// imports used by the hidden test runner
import (
	"fmt"
	"sort"
)

func combinationSum(candidates []int, target int) [][]int {
	return nil
}
`,
    tests: `${GO_NORM_INT2D}

${GO_HARNESS}

func main() {
    _t(_norm(combinationSum([]int{2, 3, 6, 7}, 7)), [][]int{{2, 2, 3}, {7}}, "example 1")
    _t(_norm(combinationSum([]int{2, 3, 5}, 8)), [][]int{{2, 2, 2, 2}, {2, 3, 3}, {3, 5}}, "example 2")
    _t(_norm(combinationSum([]int{2}, 1)), [][]int{}, "impossible")
    _t(_norm(combinationSum([]int{3}, 9)), [][]int{{3, 3, 3}}, "single candidate reused")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'n-queens': {
    starter: `package main

// imports used by the hidden test runner
import (
	"fmt"
	"sort"
	"strings"
)

func solveNQueens(n int) [][]string {
	return nil
}
`,
    tests: `var _ = sort.Strings
var _ = strings.Join

${GO_NORM_STR2D}

${GO_HARNESS}

func main() {
    _t(_normS(solveNQueens(4)), _normS([][]string{{"..Q.", "Q...", "...Q", ".Q.."}, {".Q..", "...Q", "Q...", "..Q."}}), "n=4 both solutions")
    _t(_normS(solveNQueens(1)), [][]string{{"Q"}}, "n=1")
    _t(_normS(solveNQueens(2)), [][]string{}, "n=2 impossible")
    _t(_normS(solveNQueens(3)), [][]string{}, "n=3 impossible")
    _t(len(solveNQueens(5)), 10, "n=5 has 10 solutions")
    _t(len(solveNQueens(6)), 4, "n=6 has 4 solutions")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'longest-substring-no-repeat': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func lengthOfLongestSubstring(s string) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(lengthOfLongestSubstring("abcabcbb"), 3, "example 1")
    _t(lengthOfLongestSubstring("bbbbb"), 1, "all same char")
    _t(lengthOfLongestSubstring("pwwkew"), 3, "example 3")
    _t(lengthOfLongestSubstring(""), 0, "empty string")
    _t(lengthOfLongestSubstring("au"), 2, "two distinct")
    _t(lengthOfLongestSubstring("dvdf"), 3, "window left jump")
    _t(lengthOfLongestSubstring("abba"), 2, "stale index trap")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'sliding-window-maximum': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func maxSlidingWindow(nums []int, k int) []int {
	return nil
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(maxSlidingWindow([]int{1, 3, -1, -3, 5, 3, 6, 7}, 3), []int{3, 3, 5, 5, 6, 7}, "example 1")
    _t(maxSlidingWindow([]int{1}, 1), []int{1}, "single element")
    _t(maxSlidingWindow([]int{1, -1}, 1), []int{1, -1}, "window of one")
    _t(maxSlidingWindow([]int{9, 11}, 2), []int{11}, "increasing pair")
    _t(maxSlidingWindow([]int{4, -2}, 2), []int{4}, "decreasing pair")
    _t(maxSlidingWindow([]int{7, 2, 4}, 2), []int{7, 4}, "leading max expires")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'minimum-window-substring': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func minWindow(s string, t string) string {
	return ""
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(minWindow("ADOBECODEBANC", "ABC"), "BANC", "example 1")
    _t(minWindow("a", "a"), "a", "single char match")
    _t(minWindow("a", "aa"), "", "not enough chars")
    _t(minWindow("ab", "b"), "b", "suffix window")
    _t(minWindow("bba", "ab"), "ba", "duplicates in s")
    _t(minWindow("aaflslflsldkalskaaa", "aaa"), "aaa", "repeated requirement")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'binary-search': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func search(nums []int, target int) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(search([]int{-1, 0, 3, 5, 9, 12}, 9), 4, "example 1")
    _t(search([]int{-1, 0, 3, 5, 9, 12}, 2), -1, "not found")
    _t(search([]int{5}, 5), 0, "single element hit")
    _t(search([]int{5}, -5), -1, "single element miss")
    _t(search([]int{1, 3}, 3), 1, "two elements right")
    _t(search([]int{1, 3}, 1), 0, "two elements left")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'search-rotated-array': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func searchRotated(nums []int, target int) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(searchRotated([]int{4, 5, 6, 7, 0, 1, 2}, 0), 4, "example 1")
    _t(searchRotated([]int{4, 5, 6, 7, 0, 1, 2}, 3), -1, "not present")
    _t(searchRotated([]int{1}, 0), -1, "single miss")
    _t(searchRotated([]int{3, 1}, 1), 1, "two rotated")
    _t(searchRotated([]int{5, 1, 3}, 5), 0, "target at pivot start")
    _t(searchRotated([]int{1, 2, 3, 4, 5}, 4), 3, "no rotation")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'kth-largest-element': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func findKthLargest(nums []int, k int) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(findKthLargest([]int{3, 2, 1, 5, 6, 4}, 2), 5, "example 1")
    _t(findKthLargest([]int{3, 2, 3, 1, 2, 4, 5, 5, 6}, 4), 4, "with duplicates")
    _t(findKthLargest([]int{1}, 1), 1, "single element")
    _t(findKthLargest([]int{7, 6, 5, 4, 3, 2, 1}, 5), 3, "descending input")
    _t(findKthLargest([]int{2, 1}, 2), 1, "k equals length")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'median-two-sorted-arrays': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(findMedianSortedArrays([]int{1, 3}, []int{2}), float64(2), "example 1")
    _t(findMedianSortedArrays([]int{1, 2}, []int{3, 4}), 2.5, "example 2")
    _t(findMedianSortedArrays([]int{0, 0}, []int{0, 0}), float64(0), "all zeros")
    _t(findMedianSortedArrays([]int{}, []int{1}), float64(1), "first empty")
    _t(findMedianSortedArrays([]int{2}, []int{}), float64(2), "second empty")
    _t(findMedianSortedArrays([]int{1, 2}, []int{-1, 3}), 1.5, "interleaved")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'valid-parentheses': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func isValid(s string) bool {
	return false
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(isValid("()"), true, "simple pair")
    _t(isValid("()[]{}"), true, "three pairs")
    _t(isValid("(]"), false, "wrong type")
    _t(isValid("([)]"), false, "wrong order")
    _t(isValid("{[]}"), true, "nested")
    _t(isValid("("), false, "unclosed opener")
    _t(isValid("]"), false, "closer without opener")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'daily-temperatures': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func dailyTemperatures(temperatures []int) []int {
	return nil
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(dailyTemperatures([]int{73, 74, 75, 71, 69, 72, 76, 73}), []int{1, 1, 4, 2, 1, 1, 0, 0}, "example 1")
    _t(dailyTemperatures([]int{30, 40, 50, 60}), []int{1, 1, 1, 0}, "increasing")
    _t(dailyTemperatures([]int{90, 60, 30}), []int{0, 0, 0}, "decreasing")
    _t(dailyTemperatures([]int{50}), []int{0}, "single day")
    _t(dailyTemperatures([]int{70, 70, 75}), []int{2, 1, 0}, "equal temps wait")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'largest-rectangle-histogram': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func largestRectangleArea(heights []int) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(largestRectangleArea([]int{2, 1, 5, 6, 2, 3}), 10, "example 1")
    _t(largestRectangleArea([]int{2, 4}), 4, "two bars")
    _t(largestRectangleArea([]int{1}), 1, "single bar")
    _t(largestRectangleArea([]int{2, 2, 2}), 6, "flat histogram")
    _t(largestRectangleArea([]int{5, 4, 1, 2}), 8, "descending then rise")
    _t(largestRectangleArea([]int{0, 9}), 9, "zero-height bar")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'max-depth-binary-tree': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

// Provided: type TreeNode struct { Val int; Left, Right *TreeNode }
func maxDepth(root *TreeNode) int {
	return 0
}
`,
    tests: `${GO_TREE}

${GO_HARNESS}

func main() {
    _t(maxDepth(_tree([]interface{}{3, 9, 20, nil, nil, 15, 7})), 3, "example 1")
    _t(maxDepth(_tree([]interface{}{1, nil, 2})), 2, "right skewed")
    _t(maxDepth(_tree([]interface{}{})), 0, "empty tree")
    _t(maxDepth(_tree([]interface{}{0})), 1, "single node")
    _t(maxDepth(_tree([]interface{}{1, 2, 3, 4, nil, nil, nil, 5})), 4, "left-heavy chain")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'validate-bst': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

// Provided: type TreeNode struct { Val int; Left, Right *TreeNode }
func isValidBST(root *TreeNode) bool {
	return false
}
`,
    tests: `${GO_TREE}

${GO_HARNESS}

func main() {
    _t(isValidBST(_tree([]interface{}{2, 1, 3})), true, "example 1")
    _t(isValidBST(_tree([]interface{}{5, 1, 4, nil, nil, 3, 6})), false, "example 2")
    _t(isValidBST(_tree([]interface{}{1})), true, "single node")
    _t(isValidBST(_tree([]interface{}{5, 4, 6, nil, nil, 3, 7})), false, "deep violation")
    _t(isValidBST(_tree([]interface{}{2, 2, 2})), false, "duplicates invalid")
    _t(isValidBST(_tree([]interface{}{-10, -20, 0})), true, "negative values")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'level-order-traversal': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

// Provided: type TreeNode struct { Val int; Left, Right *TreeNode }
func levelOrder(root *TreeNode) [][]int {
	return nil
}
`,
    tests: `${GO_TREE}

${GO_HARNESS}

func main() {
    _t(levelOrder(_tree([]interface{}{3, 9, 20, nil, nil, 15, 7})), [][]int{{3}, {9, 20}, {15, 7}}, "example 1")
    _t(levelOrder(_tree([]interface{}{1})), [][]int{{1}}, "single node")
    _t(levelOrder(_tree([]interface{}{})), [][]int{}, "empty tree")
    _t(levelOrder(_tree([]interface{}{1, 2, nil, 3})), [][]int{{1}, {2}, {3}}, "left chain")
    _t(levelOrder(_tree([]interface{}{1, 2, 3, 4, 5, 6, 7})), [][]int{{1}, {2, 3}, {4, 5, 6, 7}}, "perfect tree")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'binary-tree-max-path-sum': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

// Provided: type TreeNode struct { Val int; Left, Right *TreeNode }
func maxPathSum(root *TreeNode) int {
	return 0
}
`,
    tests: `${GO_TREE}

${GO_HARNESS}

func main() {
    _t(maxPathSum(_tree([]interface{}{1, 2, 3})), 6, "example 1")
    _t(maxPathSum(_tree([]interface{}{-10, 9, 20, nil, nil, 15, 7})), 42, "example 2")
    _t(maxPathSum(_tree([]interface{}{-3})), -3, "single negative node")
    _t(maxPathSum(_tree([]interface{}{2, -1})), 2, "skip negative child")
    _t(maxPathSum(_tree([]interface{}{-2, -1})), -1, "all negative picks max node")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'valid-palindrome': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func isPalindrome(s string) bool {
	return false
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(isPalindrome("A man, a plan, a canal: Panama"), true, "example 1")
    _t(isPalindrome("race a car"), false, "example 2")
    _t(isPalindrome(" "), true, "whitespace only")
    _t(isPalindrome("0P"), false, "digit vs letter")
    _t(isPalindrome("ab_a"), true, "underscore ignored")
    _t(isPalindrome("a"), true, "single char")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'three-sum': {
    starter: `package main

// imports used by the hidden test runner
import (
	"fmt"
	"sort"
)

func threeSum(nums []int) [][]int {
	return nil
}
`,
    tests: `${GO_NORM_INT2D}

${GO_HARNESS}

func main() {
    _t(_norm(threeSum([]int{-1, 0, 1, 2, -1, -4})), [][]int{{-1, -1, 2}, {-1, 0, 1}}, "example 1")
    _t(_norm(threeSum([]int{0, 1, 1})), [][]int{}, "no solution")
    _t(_norm(threeSum([]int{0, 0, 0})), [][]int{{0, 0, 0}}, "all zeros")
    _t(_norm(threeSum([]int{-2, 0, 1, 1, 2})), [][]int{{-2, 0, 2}, {-2, 1, 1}}, "two triplets")
    _t(_norm(threeSum([]int{0, 0, 0, 0})), [][]int{{0, 0, 0}}, "extra zeros deduped")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'container-most-water': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func maxArea(height []int) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(maxArea([]int{1, 8, 6, 2, 5, 4, 8, 3, 7}), 49, "example 1")
    _t(maxArea([]int{1, 1}), 1, "two lines")
    _t(maxArea([]int{4, 3, 2, 1, 4}), 16, "equal ends")
    _t(maxArea([]int{1, 2, 1}), 2, "small peak")
    _t(maxArea([]int{2, 3, 4, 5, 18, 17, 6}), 17, "tall middle pair")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },

  'trapping-rain-water': {
    starter: `package main

// imports used by the hidden test runner
import "fmt"

func trap(height []int) int {
	return 0
}
`,
    tests: `${GO_HARNESS}

func main() {
    _t(trap([]int{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1}), 6, "example 1")
    _t(trap([]int{4, 2, 0, 3, 2, 5}), 9, "example 2")
    _t(trap([]int{1, 2, 3}), 0, "monotonic — traps nothing")
    _t(trap([]int{3}), 0, "single bar")
    _t(trap([]int{5, 4, 1, 2}), 1, "shallow right wall")
    _t(trap([]int{2, 0, 2}), 2, "simple valley")
    fmt.Printf("%d/%d tests passed\\n", _p, _n)
}`,
  },
}
