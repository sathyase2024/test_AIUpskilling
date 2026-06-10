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
};
