// AUTO-GENERATED: C++ language pack for the Code Lab (50 problems).
// Each entry: starter (editor scaffold, compiles) + tests (hidden harness + cases).
// Final program = starter + "\n" + tests, compiled with g++ -O2 -std=c++17.

export const CPP_PACK: Record<string, { starter: string; tests: string }> = {
  "two-sum": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<int> twoSum(vector<int>& nums, int target) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "best-time-stock": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int maxProfit(vector<int>& prices) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "product-except-self": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<int> productExceptSelf(vector<int>& nums) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "maximum-subarray": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int maxSubarray(vector<int>& nums) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "merge-intervals": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> mergeIntervals(vector<vector<int>>& intervals) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "first-missing-positive": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int firstMissingPositive(vector<int>& nums) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "single-number": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int singleNumber(vector<int>& nums) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "counting-bits": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<int> countBits(int n) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "climbing-stairs": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int climbStairs(int n) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "house-robber": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int rob(vector<int>& nums) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "coin-change": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int coinChange(vector<int>& coins, int amount) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "longest-increasing-subsequence": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int lengthOfLIS(vector<int>& nums) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "edit-distance": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int minDistance(string word1, string word2) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "regex-matching": {
    starter: `#include <bits/stdc++.h>
using namespace std;
bool isMatch(string s, string p) {
  return false;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "number-of-islands": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int numIslands(vector<vector<char>>& grid) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "course-schedule": {
    starter: `#include <bits/stdc++.h>
using namespace std;
bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
  return false;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "word-ladder": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "group-anagrams": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<vector<string>> groupAnagrams(vector<string>& strs) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "top-k-frequent": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<int> topKFrequent(vector<int>& nums, int k) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "longest-consecutive-sequence": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int longestConsecutive(vector<int>& nums) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "reverse-linked-list": {
    starter: `#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct ListNode { int val; ListNode *next; ListNode(int v = 0, ListNode *n = nullptr) : val(v), next(n) {} };
ListNode* reverseList(ListNode* head) {
  return nullptr;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "linked-list-cycle": {
    starter: `#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct ListNode { int val; ListNode *next; ListNode(int v = 0, ListNode *n = nullptr) : val(v), next(n) {} };
bool hasCycle(ListNode* head) {
  return false;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "merge-k-sorted-lists": {
    starter: `#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct ListNode { int val; ListNode *next; ListNode(int v = 0, ListNode *n = nullptr) : val(v), next(n) {} };
ListNode* mergeKLists(vector<ListNode*>& lists) {
  return nullptr;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "palindrome-number": {
    starter: `#include <bits/stdc++.h>
using namespace std;
bool isPalindromeNumber(int x) {
  return false;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "basic-calculator": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int calculate(string s) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "knn-classifier": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int knnPredict(vector<vector<double>> XTrain, vector<int> yTrain, vector<double> x, int k) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "gradient-descent-linear": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<double> gradientDescent(vector<double> X, vector<double> y, double lr = 0.01, int epochs = 5000) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "min-stack": {
    starter: `#include <bits/stdc++.h>
using namespace std;
class MinStack {
public:
  MinStack() {}
  void push(int val) {}
  void pop() {}
  int top() { return 0; }
  int getMin() { return 0; }
};
`,
    tests: `// ---- test harness ----
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
`,
  },
  "lru-cache": {
    starter: `#include <bits/stdc++.h>
using namespace std;
class LRUCache {
public:
  LRUCache(int capacity) {}
  int get(int key) { return 0; }
  void put(int key, int value) {}
};
`,
    tests: `// ---- test harness ----
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
`,
  },
  "subsets": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> subsets(vector<int>& nums) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "combination-sum": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "n-queens": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<vector<string>> solveNQueens(int n) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "longest-substring-no-repeat": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int lengthOfLongestSubstring(string s) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "sliding-window-maximum": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "minimum-window-substring": {
    starter: `#include <bits/stdc++.h>
using namespace std;
string minWindow(string s, string t) {
  return "";
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "binary-search": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int search(vector<int>& nums, int target) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "search-rotated-array": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int searchRotated(vector<int>& nums, int target) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "kth-largest-element": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int findKthLargest(vector<int>& nums, int k) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "median-two-sorted-arrays": {
    starter: `#include <bits/stdc++.h>
using namespace std;
double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "valid-parentheses": {
    starter: `#include <bits/stdc++.h>
using namespace std;
bool isValid(string s) {
  return false;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "daily-temperatures": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<int> dailyTemperatures(vector<int>& temperatures) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "largest-rectangle-histogram": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int largestRectangleArea(vector<int>& heights) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "max-depth-binary-tree": {
    starter: `#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct TreeNode { int val; TreeNode *left; TreeNode *right; TreeNode(int v = 0) : val(v), left(nullptr), right(nullptr) {} };
int maxDepth(TreeNode* root) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "validate-bst": {
    starter: `#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct TreeNode { int val; TreeNode *left; TreeNode *right; TreeNode(int v = 0) : val(v), left(nullptr), right(nullptr) {} };
bool isValidBST(TreeNode* root) {
  return false;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "level-order-traversal": {
    starter: `#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct TreeNode { int val; TreeNode *left; TreeNode *right; TreeNode(int v = 0) : val(v), left(nullptr), right(nullptr) {} };
vector<vector<int>> levelOrder(TreeNode* root) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "binary-tree-max-path-sum": {
    starter: `#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct TreeNode { int val; TreeNode *left; TreeNode *right; TreeNode(int v = 0) : val(v), left(nullptr), right(nullptr) {} };
int maxPathSum(TreeNode* root) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "valid-palindrome": {
    starter: `#include <bits/stdc++.h>
using namespace std;
bool isPalindrome(string s) {
  return false;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "three-sum": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> threeSum(vector<int>& nums) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "container-most-water": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int maxArea(vector<int>& height) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "trapping-rain-water": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int trap(vector<int>& height) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "rotate-array": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<int> rotate(vector<int>& nums, int k) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "longest-common-prefix": {
    starter: `#include <bits/stdc++.h>
using namespace std;
string longestCommonPrefix(vector<string>& strs) {
  return "";
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "spiral-matrix": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<int> spiralOrder(vector<vector<int>>& matrix) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "set-matrix-zeroes": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> setZeroes(vector<vector<int>>& matrix) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "insert-interval": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "candy": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int candy(vector<int>& ratings) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "number-of-1-bits": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int hammingWeight(int n) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "missing-number": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int missingNumber(vector<int>& nums) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "unique-paths": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int uniquePaths(int m, int n) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "word-break": {
    starter: `#include <bits/stdc++.h>
using namespace std;
bool wordBreak(string s, vector<string>& wordDict) {
  return false;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "longest-common-subsequence": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int longestCommonSubsequence(string text1, string text2) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "decode-ways": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int numDecodings(string s) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "partition-equal-subset-sum": {
    starter: `#include <bits/stdc++.h>
using namespace std;
bool canPartition(vector<int>& nums) {
  return false;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "burst-balloons": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int maxCoins(vector<int>& nums) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "rotting-oranges": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int orangesRotting(vector<vector<int>>& grid) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "pacific-atlantic": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "alien-dictionary": {
    starter: `#include <bits/stdc++.h>
using namespace std;
string alienOrder(vector<string>& words) {
  return "";
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "valid-anagram": {
    starter: `#include <bits/stdc++.h>
using namespace std;
bool isAnagram(string s, string t) {
  return false;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "subarray-sum-equals-k": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int subarraySum(vector<int>& nums, int k) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "four-sum-ii": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int fourSumCount(vector<int>& nums1, vector<int>& nums2, vector<int>& nums3, vector<int>& nums4) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "middle-of-linked-list": {
    starter: `#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct ListNode { int val; ListNode *next; ListNode(int v = 0, ListNode *n = nullptr) : val(v), next(n) {} };
ListNode* middleNode(ListNode* head) {
  return nullptr;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "remove-nth-from-end": {
    starter: `#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct ListNode { int val; ListNode *next; ListNode(int v = 0, ListNode *n = nullptr) : val(v), next(n) {} };
ListNode* removeNthFromEnd(ListNode* head, int n) {
  return nullptr;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "add-two-numbers": {
    starter: `#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct ListNode { int val; ListNode *next; ListNode(int v = 0, ListNode *n = nullptr) : val(v), next(n) {} };
ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
  return nullptr;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "happy-number": {
    starter: `#include <bits/stdc++.h>
using namespace std;
bool isHappy(int n) {
  return false;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "pow-x-n": {
    starter: `#include <bits/stdc++.h>
using namespace std;
double myPow(double x, int n) {
  return 0.0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "perceptron": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<int> perceptron(vector<vector<double>> X, vector<int> y, double lr = 0.1, int epochs = 20) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "cosine-similarity": {
    starter: `#include <bits/stdc++.h>
using namespace std;
double cosineSimilarity(vector<double> a, vector<double> b) {
  return 0.0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "implement-trie": {
    starter: `#include <bits/stdc++.h>
using namespace std;
class Trie {
public:
  Trie() {}
  void insert(string word) {}
  bool search(string word) { return false; }
  bool startsWith(string prefix) { return false; }
};
`,
    tests: `// ---- test harness ----
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
`,
  },
  "queue-using-stacks": {
    starter: `#include <bits/stdc++.h>
using namespace std;
class MyQueue {
public:
  MyQueue() {}
  void push(int x) {}
  int pop() { return 0; }
  int peek() { return 0; }
  bool empty() { return true; }
};
`,
    tests: `// ---- test harness ----
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
`,
  },
  "permutations": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> permute(vector<int>& nums) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "generate-parentheses": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<string> generateParenthesis(int n) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "sudoku-solver": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<vector<char>> solveSudoku(vector<vector<char>>& board) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "find-all-anagrams": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<int> findAnagrams(string s, string p) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "longest-repeating-replacement": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int characterReplacement(string s, int k) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "max-consecutive-ones-iii": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int longestOnes(vector<int>& nums, int k) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "find-min-rotated": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int findMin(vector<int>& nums) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "search-2d-matrix": {
    starter: `#include <bits/stdc++.h>
using namespace std;
bool searchMatrix(vector<vector<int>>& matrix, int target) {
  return false;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "koko-eating-bananas": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int minEatingSpeed(vector<int>& piles, int h) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "count-smaller-after-self": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<int> countSmaller(vector<int>& nums) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "evaluate-rpn": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int evalRPN(vector<string>& tokens) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "decode-string": {
    starter: `#include <bits/stdc++.h>
using namespace std;
string decodeString(string s) {
  return "";
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "longest-valid-parentheses": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int longestValidParentheses(string s) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "invert-binary-tree": {
    starter: `#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct TreeNode { int val; TreeNode *left; TreeNode *right; TreeNode(int v = 0) : val(v), left(nullptr), right(nullptr) {} };
TreeNode* invertTree(TreeNode* root) {
  return nullptr;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "diameter-of-binary-tree": {
    starter: `#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct TreeNode { int val; TreeNode *left; TreeNode *right; TreeNode(int v = 0) : val(v), left(nullptr), right(nullptr) {} };
int diameterOfBinaryTree(TreeNode* root) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "lowest-common-ancestor-bst": {
    starter: `#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct TreeNode { int val; TreeNode *left; TreeNode *right; TreeNode(int v = 0) : val(v), left(nullptr), right(nullptr) {} };
TreeNode* lowestCommonAncestor(TreeNode* root, int p, int q) {
  return nullptr;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "serialize-deserialize-tree": {
    starter: `#include <bits/stdc++.h>
using namespace std;
// Provided node type (do not modify):
struct TreeNode { int val; TreeNode *left; TreeNode *right; TreeNode(int v = 0) : val(v), left(nullptr), right(nullptr) {} };
string serialize(TreeNode* root) {
  return "";
}
TreeNode* deserialize(string data) {
  return nullptr;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "move-zeroes": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<int> moveZeroes(vector<int>& nums) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "remove-duplicates-sorted": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<int> removeDuplicates(vector<int>& nums) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "sort-colors": {
    starter: `#include <bits/stdc++.h>
using namespace std;
vector<int> sortColors(vector<int>& nums) {
  return {};
}
`,
    tests: `// ---- test harness ----
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
`,
  },
  "three-sum-closest": {
    starter: `#include <bits/stdc++.h>
using namespace std;
int threeSumClosest(vector<int>& nums, int target) {
  return 0;
}
`,
    tests: `// ---- test harness ----
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
`,
  },
};
