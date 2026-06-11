// AUTO-GENERATED Java support pack for Code Lab.
// Each entry: { starter (editor-visible), tests (hidden harness appended at runtime) }.

export const JAVA_PACK: Record<string, { starter: string; tests: string }> = {
  "two-sum": {
    starter: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        return new int[]{};
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "best-time-stock": {
    starter: `import java.util.*;
class Solution {
    public int maxProfit(int[] prices) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "product-except-self": {
    starter: `import java.util.*;
class Solution {
    public int[] productExceptSelf(int[] nums) {
        return new int[]{};
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "maximum-subarray": {
    starter: `import java.util.*;
class Solution {
    public int maxSubarray(int[] nums) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "merge-intervals": {
    starter: `import java.util.*;

class Solution {
    public int[][] mergeIntervals(int[][] intervals) {
        return new int[][]{};
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "first-missing-positive": {
    starter: `import java.util.*;
class Solution {
    public int firstMissingPositive(int[] nums) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "single-number": {
    starter: `import java.util.*;
class Solution {
    public int singleNumber(int[] nums) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "counting-bits": {
    starter: `import java.util.*;
class Solution {
    public int[] countBits(int n) {
        return new int[]{};
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "climbing-stairs": {
    starter: `import java.util.*;
class Solution {
    public int climbStairs(int n) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "house-robber": {
    starter: `import java.util.*;
class Solution {
    public int rob(int[] nums) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "coin-change": {
    starter: `import java.util.*;
class Solution {
    public int coinChange(int[] coins, int amount) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "longest-increasing-subsequence": {
    starter: `import java.util.*;
class Solution {
    public int lengthOfLIS(int[] nums) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "edit-distance": {
    starter: `import java.util.*;
class Solution {
    public int minDistance(String word1, String word2) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "regex-matching": {
    starter: `import java.util.*;
class Solution {
    public boolean isMatch(String s, String p) {
        return false;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "number-of-islands": {
    starter: `import java.util.*;
class Solution {
    public int numIslands(char[][] grid) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "course-schedule": {
    starter: `import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        return false;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "word-ladder": {
    starter: `import java.util.*;

class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "group-anagrams": {
    starter: `import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        return null;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "top-k-frequent": {
    starter: `import java.util.*;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        return new int[]{};
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "longest-consecutive-sequence": {
    starter: `import java.util.*;
class Solution {
    public int longestConsecutive(int[] nums) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "reverse-linked-list": {
    starter: `// Provided: class ListNode { int val; ListNode next; ListNode(int val) {...} }
import java.util.*;
class Solution {
    public ListNode reverseList(ListNode head) {
        return null;
    }
}`,
    tests: `class ListNode {
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
}`,
  },
  "linked-list-cycle": {
    starter: `// Provided: class ListNode { int val; ListNode next; ListNode(int val) {...} }
import java.util.*;
class Solution {
    public boolean hasCycle(ListNode head) {
        return false;
    }
}`,
    tests: `class ListNode {
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
}`,
  },
  "merge-k-sorted-lists": {
    starter: `import java.util.*;
// Provided: class ListNode { int val; ListNode next; ListNode(int val) {...} }
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        return null;
    }
}`,
    tests: `class ListNode {
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
}`,
  },
  "palindrome-number": {
    starter: `import java.util.*;
class Solution {
    public boolean isPalindromeNumber(int x) {
        return false;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "basic-calculator": {
    starter: `import java.util.*;
class Solution {
    public int calculate(String s) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "knn-classifier": {
    starter: `import java.util.*;

class Solution {
    public int knnPredict(int[][] XTrain, int[] yTrain, double[] x, int k) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "gradient-descent-linear": {
    starter: `import java.util.*;
class Solution {
    public double[] gradientDescent(double[] X, double[] y, double lr, int epochs) {
        return new double[]{0,0};
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "min-stack": {
    starter: `import java.util.*;

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
}`,
    tests: `public class Main {
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
}`,
  },
  "lru-cache": {
    starter: `import java.util.*;

class LRUCache {
    public LRUCache(int capacity) {

    }
    public int get(int key) {
        return 0;
    }
    public void put(int key, int value) {

    }
}`,
    tests: `public class Main {
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
}`,
  },
  "subsets": {
    starter: `import java.util.*;

class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        return null;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "combination-sum": {
    starter: `import java.util.*;

class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        return null;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "n-queens": {
    starter: `import java.util.*;

class Solution {
    public List<List<String>> solveNQueens(int n) {
        return null;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "longest-substring-no-repeat": {
    starter: `import java.util.*;
class Solution {
    public int lengthOfLongestSubstring(String s) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "sliding-window-maximum": {
    starter: `import java.util.*;
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        return new int[]{};
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "minimum-window-substring": {
    starter: `import java.util.*;
class Solution {
    public String minWindow(String s, String t) {
        return "";
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "binary-search": {
    starter: `import java.util.*;
class Solution {
    public int search(int[] nums, int target) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "search-rotated-array": {
    starter: `import java.util.*;
class Solution {
    public int searchRotated(int[] nums, int target) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "kth-largest-element": {
    starter: `import java.util.*;
class Solution {
    public int findKthLargest(int[] nums, int k) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "median-two-sorted-arrays": {
    starter: `import java.util.*;
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        return 0.0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "valid-parentheses": {
    starter: `import java.util.*;
class Solution {
    public boolean isValid(String s) {
        return false;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "daily-temperatures": {
    starter: `import java.util.*;
class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        return new int[]{};
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "largest-rectangle-histogram": {
    starter: `import java.util.*;
class Solution {
    public int largestRectangleArea(int[] heights) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "max-depth-binary-tree": {
    starter: `// Provided: class TreeNode { int val; TreeNode left, right; TreeNode(int val) {...} }
import java.util.*;
class Solution {
    public int maxDepth(TreeNode root) {
        return 0;
    }
}`,
    tests: `class TreeNode {
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
}`,
  },
  "validate-bst": {
    starter: `// Provided: class TreeNode { int val; TreeNode left, right; TreeNode(int val) {...} }
import java.util.*;
class Solution {
    public boolean isValidBST(TreeNode root) {
        return false;
    }
}`,
    tests: `class TreeNode {
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
}`,
  },
  "level-order-traversal": {
    starter: `import java.util.*;
// Provided: class TreeNode { int val; TreeNode left, right; TreeNode(int val) {...} }
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        return null;
    }
}`,
    tests: `class TreeNode {
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
}`,
  },
  "binary-tree-max-path-sum": {
    starter: `// Provided: class TreeNode { int val; TreeNode left, right; TreeNode(int val) {...} }
import java.util.*;
class Solution {
    public int maxPathSum(TreeNode root) {
        return 0;
    }
}`,
    tests: `class TreeNode {
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
}`,
  },
  "valid-palindrome": {
    starter: `import java.util.*;
class Solution {
    public boolean isPalindrome(String s) {
        return false;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "three-sum": {
    starter: `import java.util.*;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        return null;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "container-most-water": {
    starter: `import java.util.*;
class Solution {
    public int maxArea(int[] height) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "trapping-rain-water": {
    starter: `import java.util.*;
class Solution {
    public int trap(int[] height) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "rotate-array": {
    starter: `import java.util.*;
class Solution {
    public int[] rotate(int[] nums, int k) {
        return nums;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "longest-common-prefix": {
    starter: `import java.util.*;
class Solution {
    public String longestCommonPrefix(String[] strs) {
        return "";
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "spiral-matrix": {
    starter: `import java.util.*;
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        return new ArrayList<>();
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "set-matrix-zeroes": {
    starter: `import java.util.*;
class Solution {
    public int[][] setZeroes(int[][] matrix) {
        return matrix;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "insert-interval": {
    starter: `import java.util.*;
class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        return intervals;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "candy": {
    starter: `import java.util.*;
class Solution {
    public int candy(int[] ratings) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "number-of-1-bits": {
    starter: `import java.util.*;
class Solution {
    public int hammingWeight(int n) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "missing-number": {
    starter: `import java.util.*;
class Solution {
    public int missingNumber(int[] nums) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "unique-paths": {
    starter: `import java.util.*;
class Solution {
    public int uniquePaths(int m, int n) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "word-break": {
    starter: `import java.util.*;
class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        return false;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "longest-common-subsequence": {
    starter: `import java.util.*;
class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "decode-ways": {
    starter: `import java.util.*;
class Solution {
    public int numDecodings(String s) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "partition-equal-subset-sum": {
    starter: `import java.util.*;
class Solution {
    public boolean canPartition(int[] nums) {
        return false;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "burst-balloons": {
    starter: `import java.util.*;
class Solution {
    public int maxCoins(int[] nums) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "rotting-oranges": {
    starter: `import java.util.*;
class Solution {
    public int orangesRotting(int[][] grid) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "pacific-atlantic": {
    starter: `import java.util.*;
class Solution {
    public List<int[]> pacificAtlantic(int[][] heights) {
        return new ArrayList<>();
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "alien-dictionary": {
    starter: `import java.util.*;
class Solution {
    public String alienOrder(String[] words) {
        return "";
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "valid-anagram": {
    starter: `import java.util.*;
class Solution {
    public boolean isAnagram(String s, String t) {
        return false;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "subarray-sum-equals-k": {
    starter: `import java.util.*;
class Solution {
    public int subarraySum(int[] nums, int k) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "four-sum-ii": {
    starter: `import java.util.*;
class Solution {
    public int fourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "middle-of-linked-list": {
    starter: `// Provided: class ListNode { int val; ListNode next; ListNode(int val) {...} }
import java.util.*;
class Solution {
    public ListNode middleNode(ListNode head) {
        return null;
    }
}`,
    tests: `class ListNode {
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
}`,
  },
  "remove-nth-from-end": {
    starter: `// Provided: class ListNode { int val; ListNode next; ListNode(int val) {...} }
import java.util.*;
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        return head;
    }
}`,
    tests: `class ListNode {
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
}`,
  },
  "add-two-numbers": {
    starter: `// Provided: class ListNode { int val; ListNode next; ListNode(int val) {...} }
import java.util.*;
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        return null;
    }
}`,
    tests: `class ListNode {
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
}`,
  },
  "happy-number": {
    starter: `import java.util.*;
class Solution {
    public boolean isHappy(int n) {
        return false;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "pow-x-n": {
    starter: `import java.util.*;
class Solution {
    public double myPow(double x, int n) {
        return 0.0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "perceptron": {
    starter: `import java.util.*;
class Solution {
    public int[] perceptron(int[][] X, int[] y, double lr, int epochs) {
        return new int[]{};
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "cosine-similarity": {
    starter: `import java.util.*;
class Solution {
    public double cosineSimilarity(double[] a, double[] b) {
        return 0.0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "implement-trie": {
    starter: `import java.util.*;

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
}`,
    tests: `public class Main {
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
}`,
  },
  "queue-using-stacks": {
    starter: `import java.util.*;

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
}`,
    tests: `public class Main {
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
}`,
  },
  "permutations": {
    starter: `import java.util.*;
class Solution {
    public List<List<Integer>> permute(int[] nums) {
        return new ArrayList<>();
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "generate-parentheses": {
    starter: `import java.util.*;
class Solution {
    public List<String> generateParenthesis(int n) {
        return new ArrayList<>();
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "sudoku-solver": {
    starter: `import java.util.*;
class Solution {
    public char[][] solveSudoku(char[][] board) {
        return board;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "find-all-anagrams": {
    starter: `import java.util.*;
class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        return new ArrayList<>();
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "longest-repeating-replacement": {
    starter: `import java.util.*;
class Solution {
    public int characterReplacement(String s, int k) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "max-consecutive-ones-iii": {
    starter: `import java.util.*;
class Solution {
    public int longestOnes(int[] nums, int k) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "find-min-rotated": {
    starter: `import java.util.*;
class Solution {
    public int findMin(int[] nums) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "search-2d-matrix": {
    starter: `import java.util.*;
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        return false;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "koko-eating-bananas": {
    starter: `import java.util.*;
class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "count-smaller-after-self": {
    starter: `import java.util.*;
class Solution {
    public List<Integer> countSmaller(int[] nums) {
        return new ArrayList<>();
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "evaluate-rpn": {
    starter: `import java.util.*;
class Solution {
    public int evalRPN(String[] tokens) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "decode-string": {
    starter: `import java.util.*;
class Solution {
    public String decodeString(String s) {
        return "";
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "longest-valid-parentheses": {
    starter: `import java.util.*;
class Solution {
    public int longestValidParentheses(String s) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "invert-binary-tree": {
    starter: `// Provided: class TreeNode { int val; TreeNode left, right; TreeNode(int val) {...} }
import java.util.*;
class Solution {
    public TreeNode invertTree(TreeNode root) {
        return root;
    }
}`,
    tests: `class TreeNode {
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
}`,
  },
  "diameter-of-binary-tree": {
    starter: `// Provided: class TreeNode { int val; TreeNode left, right; TreeNode(int val) {...} }
import java.util.*;
class Solution {
    public int diameterOfBinaryTree(TreeNode root) {
        return 0;
    }
}`,
    tests: `class TreeNode {
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
}`,
  },
  "lowest-common-ancestor-bst": {
    starter: `// Provided: class TreeNode { int val; TreeNode left, right; TreeNode(int val) {...} }
import java.util.*;
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, int p, int q) {
        return root;
    }
}`,
    tests: `class TreeNode {
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
}`,
  },
  "serialize-deserialize-tree": {
    starter: `// Provided: class TreeNode { int val; TreeNode left, right; TreeNode(int val) {...} }
import java.util.*;
class Solution {
    public String serialize(TreeNode root) {
        return "";
    }
    public TreeNode deserialize(String data) {
        return null;
    }
}`,
    tests: `class TreeNode {
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
}`,
  },
  "move-zeroes": {
    starter: `import java.util.*;
class Solution {
    public int[] moveZeroes(int[] nums) {
        return nums;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "remove-duplicates-sorted": {
    starter: `import java.util.*;
class Solution {
    public int[] removeDuplicates(int[] nums) {
        return nums;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "sort-colors": {
    starter: `import java.util.*;
class Solution {
    public int[] sortColors(int[] nums) {
        return nums;
    }
}`,
    tests: `public class Main {
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
}`,
  },
  "three-sum-closest": {
    starter: `import java.util.*;
class Solution {
    public int threeSumClosest(int[] nums, int target) {
        return 0;
    }
}`,
    tests: `public class Main {
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
}`,
  },
};
