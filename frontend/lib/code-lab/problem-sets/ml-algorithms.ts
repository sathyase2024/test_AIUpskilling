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
      python:`def knn_predict(X_train, y_train, x, k):
    # TODO: Return the majority label among the k nearest training points to x
    pass
${PY_HARNESS}
_X=[[1,1],[2,2],[8,8],[9,9]];_y=[0,0,1,1]
_t(knn_predict(_X,_y,[1.5,1.5],3),0,'near cluster 0')
_t(knn_predict(_X,_y,[8.5,8.5],3),1,'near cluster 1')
_t(knn_predict(_X,_y,[2,2],1),0,'exact match k=1')
_t(knn_predict([[0],[1],[2],[10]],[0,0,0,1],[9],1),1,'1D nearest outlier')
_t(knn_predict([[1,1],[1,2],[2,1],[5,5],[5,6]],[0,0,0,1,1],[4.5,5],3),1,'five points k=3')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function knnPredict(XTrain, yTrain, x, k) {
  // TODO: Return the majority label among the k nearest training points to x
  return 0;
}
${JS_HARNESS}
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
    # TODO: Fit y = w*x + b by batch gradient descent; return [w, b]
    pass
${PY_HARNESS}
_w,_b=gradient_descent([1,2,3,4],[3,5,7,9],0.01,5000)
_t(round(_w*5+_b),11,'predict x=5 on y=2x+1')
_t(round(_w*10+_b),21,'predict x=10 on y=2x+1')
_w2,_b2=gradient_descent([0,1,2,3],[1,1,1,1],0.01,5000)
_t(round(_w2*7+_b2),1,'flat data learns w=0 b=1')
_w3,_b3=gradient_descent([1,2,3],[-2,-4,-6],0.01,5000)
_t(round(_w3*4+_b3),-8,'negative slope y=-2x')
print(f'{_p}/{_n} tests passed')`,
      javascript:`function gradientDescent(X, y, lr=0.01, epochs=5000) {
  // TODO: Fit y = w*x + b by batch gradient descent; return [w, b]
  return [0, 0];
}
${JS_HARNESS}
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
]
