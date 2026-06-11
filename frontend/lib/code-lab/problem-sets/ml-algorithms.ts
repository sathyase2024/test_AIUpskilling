import { PY_HARNESS, JS_HARNESS, type ProblemDef } from './harness'

export const ML_ALGORITHMS: ProblemDef[] = [
  {
    id:'knn-classifier', title:'K-Nearest Neighbors Classifier', difficulty:'Intermediate', category:'AI / ML Algorithms',
    description:'Implement the prediction step of a k-nearest-neighbors classifier from scratch (no ML libraries). Given training points X_train (list of feature vectors), their labels y_train, a query point x, and an integer k, return the majority label among the k training points closest to x by Euclidean distance. The test data is constructed so that no distance ties or vote ties affect the answer.',
    examples:[
      {input:'X_train = [[1,1],[2,2],[8,8],[9,9]], y_train = [0,0,1,1], x = [1.5,1.5], k = 3',output:'0',explanation:'The 3 nearest neighbors are [1,1], [2,2] (label 0) and [8,8] (label 1); majority vote → 0.'},
      {input:'same training data, x = [8.5,8.5], k = 3',output:'1',explanation:'Nearest are [8,8], [9,9] (label 1) and [2,2] (label 0); majority → 1.'},
    ],
    constraints:['1 <= k <= len(X_train) <= 1000','Feature vectors have equal, small dimension (1–10)','Labels are non-negative integers','No external ML libraries'],
    hints:['Euclidean distance: sqrt(Σ (a_i - b_i)²) — for ranking you can skip the sqrt','Sort (distance, label) pairs and take the first k','Count label frequencies among those k and return the most common'],
    tags:['ml','classification','distance-metrics'], timeComplexity:'O(n·d + n log n)', spaceComplexity:'O(n)',
    starterCode:{
      python:`from collections import Counter

def knn_predict(X_train, y_train, x, k):
    pass
`,
      javascript:`function knnPredict(XTrain, yTrain, x, k) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_X=[[1,1],[2,2],[8,8],[9,9]];_y=[0,0,1,1]
_t(knn_predict(_X,_y,[1.5,1.5],3),0,'near cluster 0')
_t(knn_predict(_X,_y,[8.5,8.5],3),1,'near cluster 1')
_t(knn_predict(_X,_y,[2,2],1),0,'exact match k=1')
_t(knn_predict([[0],[1],[2],[10]],[0,0,0,1],[9],1),1,'1D nearest outlier')
_t(knn_predict([[1,1],[1,2],[2,1],[5,5],[5,6]],[0,0,0,1,1],[4.5,5],3),1,'five points k=3')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
const _X=[[1,1],[2,2],[8,8],[9,9]],_y=[0,0,1,1];
_t(knnPredict(_X,_y,[1.5,1.5],3),0,'near cluster 0');
_t(knnPredict(_X,_y,[8.5,8.5],3),1,'near cluster 1');
_t(knnPredict(_X,_y,[2,2],1),0,'exact match k=1');
_t(knnPredict([[0],[1],[2],[10]],[0,0,0,1],[9],1),1,'1D nearest outlier');
_t(knnPredict([[1,1],[1,2],[2,1],[5,5],[5,6]],[0,0,0,1,1],[4.5,5],3),1,'five points k=3');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'gradient-descent-linear', title:'Gradient Descent for Linear Regression', difficulty:'Intermediate', category:'AI / ML Algorithms',
    description:'Implement batch gradient descent to fit a simple linear regression model y = w·x + b, from scratch (no ML libraries). Given 1-D inputs X, targets y, a learning rate lr, and a number of epochs, minimize the mean squared error J(w,b) = (1/n)·Σ(w·x_i + b - y_i)² and return the learned parameters as a pair [w, b]. With the test hyperparameters the parameters converge tightly, and the tests compare predictions rounded to the nearest integer.',
    examples:[
      {input:'X = [1,2,3,4], y = [3,5,7,9], lr = 0.01, epochs = 5000',output:'w ≈ 2.0, b ≈ 1.0',explanation:'The data lies exactly on y = 2x + 1, so gradient descent converges to w = 2, b = 1.'},
    ],
    constraints:['2 <= len(X) == len(y) <= 1000','Gradients: dw = (2/n)·Σ(pred - y_i)·x_i and db = (2/n)·Σ(pred - y_i)','Update both parameters simultaneously each epoch','No external ML libraries'],
    hints:['Initialize w = 0 and b = 0','Each epoch: compute all predictions, then the two gradients, then update w -= lr·dw and b -= lr·db','Compute dw and db from the SAME predictions — do not update w before computing db'],
    tags:['ml','regression','optimization','gradient-descent'], timeComplexity:'O(epochs·n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`def gradient_descent(X, y, lr=0.01, epochs=5000):
    pass
`,
      javascript:`function gradientDescent(X, y, lr=0.01, epochs=5000) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_w,_b=gradient_descent([1,2,3,4],[3,5,7,9],0.01,5000)
_t(round(_w*5+_b),11,'predict x=5 on y=2x+1')
_t(round(_w*10+_b),21,'predict x=10 on y=2x+1')
_w2,_b2=gradient_descent([0,1,2,3],[1,1,1,1],0.01,5000)
_t(round(_w2*7+_b2),1,'flat data learns w=0 b=1')
_w3,_b3=gradient_descent([1,2,3],[-2,-4,-6],0.01,5000)
_t(round(_w3*4+_b3),-8,'negative slope y=-2x')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
const [_w,_b]=gradientDescent([1,2,3,4],[3,5,7,9],0.01,5000);
_t(Math.round(_w*5+_b),11,'predict x=5 on y=2x+1');
_t(Math.round(_w*10+_b),21,'predict x=10 on y=2x+1');
const [_w2,_b2]=gradientDescent([0,1,2,3],[1,1,1,1],0.01,5000);
_t(Math.round(_w2*7+_b2),1,'flat data learns w=0 b=1');
const [_w3,_b3]=gradientDescent([1,2,3],[-2,-4,-6],0.01,5000);
_t(Math.round(_w3*4+_b3),-8,'negative slope y=-2x');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'perceptron', title:'Perceptron Learning Algorithm', difficulty:'Intermediate', category:'AI / ML Algorithms',
    description:'Implement the classic single-layer perceptron learning algorithm from scratch (no ML libraries) for binary classification of 2-D points. Given training feature vectors X (a list of [x1, x2] points), binary labels y (each 0 or 1), a learning rate lr, and a number of epochs, train the perceptron and return the list of predictions for the training set after training. Initialize the weight vector w = [0, 0] and the bias b = 0. The prediction for a point x is 1 if w·x + b > 0 else 0 (strict greater-than, ties predict 0). For each epoch, iterate over the training examples in order and apply the perceptron update rule: for prediction pred on example (x, y), update w += lr·(y − pred)·x componentwise and b += lr·(y − pred). After all epochs, return the integer predictions for every training point. The algorithm is fully deterministic given this initialization and update order.',
    examples:[
      {input:'X = [[0,0],[0,1],[1,0],[1,1]], y = [0,0,0,1], lr = 0.1, epochs = 20',output:'[0,0,0,1]',explanation:'The AND gate is linearly separable; the perceptron converges and reproduces the labels.'},
      {input:'X = [[0,0],[0,1],[1,0],[1,1]], y = [0,1,1,1], lr = 0.1, epochs = 20',output:'[0,1,1,1]',explanation:'The OR gate is also linearly separable and learned exactly.'},
    ],
    constraints:['1 <= len(X) == len(y) <= 1000','Each feature vector has exactly 2 dimensions','Each label y[i] is 0 or 1','Initialize w = [0, 0] and b = 0; pred = 1 if w·x + b > 0 else 0','No external ML libraries'],
    hints:['Maintain w as a 2-element list and b as a scalar, both starting at 0','For each example compute pred, then error = y − pred (one of -1, 0, +1), and update w and b only when error is non-zero','After training, recompute the prediction for every training point and return them as integers'],
    tags:['ml','classification','perceptron','optimization'], timeComplexity:'O(epochs·n·d)', spaceComplexity:'O(d)',
    starterCode:{
      python:`def perceptron(X, y, lr=0.1, epochs=20):
    pass
`,
      javascript:`function perceptron(X, y, lr=0.1, epochs=20) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(perceptron([[0,0],[0,1],[1,0],[1,1]],[0,0,0,1],0.1,20),[0,0,0,1],'AND gate')
_t(perceptron([[0,0],[0,1],[1,0],[1,1]],[0,1,1,1],0.1,20),[0,1,1,1],'OR gate')
_t(perceptron([[0,0],[0,1],[1,0],[1,1]],[0,0,0,0],0.1,20),[0,0,0,0],'all zeros stay zero')
_t(perceptron([[2,2],[3,3],[-1,-1],[-2,-2]],[1,1,0,0],0.1,20),[1,1,0,0],'separable diagonal')
_t(perceptron([[1,1]],[1],0.1,20),[1],'single positive point')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(perceptron([[0,0],[0,1],[1,0],[1,1]],[0,0,0,1],0.1,20),[0,0,0,1],'AND gate');
_t(perceptron([[0,0],[0,1],[1,0],[1,1]],[0,1,1,1],0.1,20),[0,1,1,1],'OR gate');
_t(perceptron([[0,0],[0,1],[1,0],[1,1]],[0,0,0,0],0.1,20),[0,0,0,0],'all zeros stay zero');
_t(perceptron([[2,2],[3,3],[-1,-1],[-2,-2]],[1,1,0,0],0.1,20),[1,1,0,0],'separable diagonal');
_t(perceptron([[1,1]],[1],0.1,20),[1],'single positive point');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
  {
    id:'cosine-similarity', title:'Cosine Similarity', difficulty:'Beginner', category:'AI / ML Algorithms',
    description:'Implement cosine similarity between two equal-length numeric vectors a and b from scratch (no ML libraries). Cosine similarity is the dot product of the two vectors divided by the product of their Euclidean norms: cos(a, b) = (Σ a_i·b_i) / (sqrt(Σ a_i²) · sqrt(Σ b_i²)). It ranges from -1 (exactly opposite) through 0 (orthogonal) to 1 (same direction). Return the raw floating-point similarity; the tests compare round(sim · 10000) as an integer so the result is language-independent and avoids float-equality issues. You may assume neither vector is all zeros.',
    examples:[
      {input:'a = [1,0], b = [0,1]',output:'0.0',explanation:'Orthogonal vectors have a dot product of 0, so similarity is 0.'},
      {input:'a = [1,2,3], b = [1,2,3]',output:'1.0',explanation:'Identical direction gives the maximum similarity of 1.'},
      {input:'a = [1,2,3], b = [4,5,6]',output:'0.974631...',explanation:'Dot product 32 over norms √14·√77 ≈ 32.83 gives ≈ 0.9746, i.e. 9746 after round(·10000).'},
    ],
    constraints:['1 <= len(a) == len(b) <= 1000','-1000 <= a[i], b[i] <= 1000','Neither a nor b is the zero vector','Tests compare round(similarity · 10000) as an integer'],
    hints:['Compute the dot product Σ a_i·b_i in a single pass','Compute each norm as the square root of the sum of squares','Divide the dot product by the product of the two norms'],
    tags:['ml','distance-metrics','vectors','math'], timeComplexity:'O(n)', spaceComplexity:'O(1)',
    starterCode:{
      python:`import math

def cosine_similarity(a, b):
    pass
`,
      javascript:`function cosineSimilarity(a, b) {

}
`,
    },
    testCode:{
      python:`${PY_HARNESS}
_t(round(cosine_similarity([1,0],[0,1])*10000),0,'orthogonal')
_t(round(cosine_similarity([1,2,3],[1,2,3])*10000),10000,'identical')
_t(round(cosine_similarity([1,2,3],[-1,-2,-3])*10000),-10000,'opposite')
_t(round(cosine_similarity([1,2,3],[4,5,6])*10000),9746,'known case')
_t(round(cosine_similarity([2,0],[3,0])*10000),10000,'same direction scaled')
_t(round(cosine_similarity([1,1],[1,0])*10000),7071,'45 degrees')
print(f'{_p}/{_n} tests passed')`,
      javascript:`${JS_HARNESS}
_t(Math.round(cosineSimilarity([1,0],[0,1])*10000),0,'orthogonal');
_t(Math.round(cosineSimilarity([1,2,3],[1,2,3])*10000),10000,'identical');
_t(Math.round(cosineSimilarity([1,2,3],[-1,-2,-3])*10000),-10000,'opposite');
_t(Math.round(cosineSimilarity([1,2,3],[4,5,6])*10000),9746,'known case');
_t(Math.round(cosineSimilarity([2,0],[3,0])*10000),10000,'same direction scaled');
_t(Math.round(cosineSimilarity([1,1],[1,0])*10000),7071,'45 degrees');
console.log(\`\${_p}/\${_n} tests passed\`);`,
    },
  },
]
