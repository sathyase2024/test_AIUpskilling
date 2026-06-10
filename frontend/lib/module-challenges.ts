export interface ModuleChallenge {
  title: string
  scenario: string
  tasks: string[]
  starterCode: string
  expectedOutput: string
  hints: string[]
  language: 'python' | 'javascript'
}

const C: Record<string, ModuleChallenge> = {

  // ── python-for-ai-ml ─────────────────────────────────────────────────────────

  'python-for-ai-ml::Foundations': {
    title: 'Weather Station Analyzer',
    language: 'python',
    scenario: 'A remote weather station logged 14 days of Celsius temperatures. Analyze the data using core Python — no libraries needed.',
    tasks: [
      'Implement celsius_to_fahrenheit(c) using the formula F = c × 9/5 + 32',
      'Implement summarize(temps) that returns min, max, and average (rounded to 1 decimal)',
      'Print the results in the expected format',
    ],
    starterCode: `# Challenge: Weather Station Analyzer
temps_celsius = [22, 26, 28, 33, 35, 31, 28, 24, 20, 23, 29, 31, 34, 27]

def celsius_to_fahrenheit(c):
    # TODO: return Fahrenheit equivalent (F = c * 9/5 + 32)
    pass

def summarize(temps):
    f_temps = [celsius_to_fahrenheit(t) for t in temps]
    # TODO: compute min, max, avg of f_temps (round to 1 decimal)
    # return {'min': ..., 'max': ..., 'avg': ..., 'converted': f_temps}
    pass

result = summarize(temps_celsius)
print(f"Converted: {result['converted']}")
print(f"Min: {result['min']}°F | Max: {result['max']}°F | Avg: {result['avg']}°F")
`,
    expectedOutput: `Converted: [71.6, 78.8, 82.4, 91.4, 95.0, 87.8, 82.4, 75.2, 68.0, 73.4, 84.2, 87.8, 93.2, 80.6]
Min: 68.0°F | Max: 95.0°F | Avg: 82.3°F`,
    hints: [
      'celsius_to_fahrenheit: return (c * 9/5) + 32',
      'Use the built-in min(), max(), and round() functions',
      'Average = sum(f_temps) / len(f_temps)',
    ],
  },

  'python-for-ai-ml::Core Skills': {
    title: 'Sales Array Analytics',
    language: 'python',
    scenario: 'An e-commerce team has 4 weeks of sales data across 3 product categories. Use NumPy to analyse it efficiently.',
    tasks: [
      'Compute total sales per week (row sums) and per category (column sums)',
      'Find the best-performing week index and best category index',
      'Normalise each column to the 0–1 range: (x − min) / (max − min)',
    ],
    starterCode: `import numpy as np

# 4 weeks x 3 categories: Electronics, Clothing, Food
sales = np.array([
    [1200, 450, 300],
    [1800, 520, 280],
    [950,  610, 410],
    [2100, 480, 350],
])

# TODO: weekly_totals = sum across columns (axis=1)
weekly_totals = None

# TODO: category_totals = sum across rows (axis=0)
category_totals = None

# TODO: best_week = index of the highest weekly total
best_week = None

# TODO: normalise — for each column: (col - col.min()) / (col.max() - col.min())
normalised = None

categories = ['Electronics', 'Clothing', 'Food']
print("Weekly totals:", weekly_totals)
print("Category totals:", category_totals)
print(f"Best week: Week {best_week + 1} (sales: {weekly_totals[best_week]})")
print("Normalised sales:\\n", normalised.round(2))
`,
    expectedOutput: `Weekly totals: [1950 2600 1970 2930]
Category totals: [6050 2060 1340]
Best week: Week 4 (sales: 2930)
Normalised sales:
 [[0.22 0.   0.15]
 [0.74 0.44 0.  ]
 [0.   1.   1.  ]
 [1.   0.19 0.54]]`,
    hints: [
      'Use sales.sum(axis=1) for weekly totals and sales.sum(axis=0) for category totals',
      'np.argmax(weekly_totals) returns the index of the highest value',
      'For normalisation: (sales - sales.min(axis=0)) / (sales.max(axis=0) - sales.min(axis=0))',
    ],
  },

  'python-for-ai-ml::Applied Practice': {
    title: 'Customer Churn Detector',
    language: 'python',
    scenario: 'A telecom company wants to flag customers likely to churn. Clean the data and compute churn metrics using Pandas.',
    tasks: [
      'Drop rows where contract_months is NaN or negative',
      'Add a churned column: True if last_activity_days > 90',
      'Print churn rate (%) and the average contract length for churned vs retained customers',
    ],
    starterCode: `import pandas as pd
import numpy as np

data = {
    'customer_id': range(1, 11),
    'contract_months': [12, None, 6, 24, -1, 18, 12, None, 6, 24],
    'last_activity_days': [30, 120, 95, 15, 200, 45, 110, 88, 180, 20],
    'monthly_spend': [45, 60, 30, 80, 25, 55, 40, 70, 35, 90],
}
df = pd.DataFrame(data)

# TODO: drop rows where contract_months is NaN or <= 0
df = df  # replace with your filter

# TODO: add 'churned' column — True if last_activity_days > 90
df['churned'] = None  # replace with your logic

churn_rate = df['churned'].mean() * 100
avg_contract = df.groupby('churned')['contract_months'].mean()

print(f"Records after cleaning: {len(df)}")
print(f"Churn rate: {churn_rate:.1f}%")
print("Avg contract months by churn status:")
print(avg_contract.round(1))
`,
    expectedOutput: `Records after cleaning: 7
Churn rate: 42.9%
Avg contract months by churn status:
churned
False    19.5
True      8.0
Name: contract_months, dtype: float64`,
    hints: [
      'Chain two conditions: df.dropna(subset=["contract_months"]) then df[df["contract_months"] > 0]',
      "df['churned'] = df['last_activity_days'] > 90",
      'groupby returns a GroupBy object — call .mean() on it',
    ],
  },

  'python-for-ai-ml::Advanced Topics': {
    title: 'Gradient Descent from Scratch',
    language: 'python',
    scenario: 'Implement gradient descent to fit a straight line y = mx + b to noisy data — the same maths that underlies every neural network.',
    tasks: [
      'Implement compute_loss(y_true, y_pred) as mean squared error',
      'Implement gradient_step(X, y, m, b, lr) that returns updated m and b',
      'Run 200 iterations and print the final parameters and loss',
    ],
    starterCode: `import numpy as np

np.random.seed(42)
X = np.linspace(0, 10, 50)
y = 2.5 * X + 1.0 + np.random.randn(50) * 1.5  # true: m=2.5, b=1.0

def compute_loss(y_true, y_pred):
    # TODO: return mean squared error = mean((y_true - y_pred)^2)
    pass

def gradient_step(X, y, m, b, lr=0.01):
    n = len(X)
    y_pred = m * X + b
    # TODO: compute dm = -(2/n) * sum(X * (y - y_pred))
    # TODO: compute db = -(2/n) * sum(y - y_pred)
    # TODO: return updated m - lr*dm, b - lr*db
    pass

m, b = 0.0, 0.0
for i in range(200):
    m, b = gradient_step(X, y, m, b, lr=0.01)

y_pred = m * X + b
print(f"Fitted:  m = {m:.3f}, b = {b:.3f}")
print(f"MSE loss: {compute_loss(y, y_pred):.4f}")
`,
    expectedOutput: `Fitted:  m = 2.452, b = 0.835
MSE loss: 1.8742`,
    hints: [
      'compute_loss: np.mean((y_true - y_pred) ** 2)',
      'dm = -(2/n) * np.sum(X * (y - y_pred))  — gradient of MSE w.r.t. m',
      'return m - lr * dm, b - lr * db',
    ],
  },

  'python-for-ai-ml::Production & Scale': {
    title: 'Model Evaluation Pipeline',
    language: 'python',
    scenario: 'Before shipping a classifier, you need to compute precision, recall, and F1 from raw predictions — without relying on sklearn.',
    tasks: [
      'Implement precision(tp, fp) and recall(tp, fn)',
      'Implement f1(precision, recall)',
      'Run evaluate() on the sample predictions and print all metrics',
    ],
    starterCode: `# y_true: actual labels, y_pred: model predictions (both 0 or 1)
y_true = [1,0,1,1,0,1,0,0,1,1, 0,1,0,0,1,1,0,1,0,1]
y_pred = [1,0,1,0,0,1,1,0,1,1, 0,0,0,1,1,1,0,1,0,0]

def confusion(y_true, y_pred):
    tp = sum(1 for a, p in zip(y_true, y_pred) if a == 1 and p == 1)
    fp = sum(1 for a, p in zip(y_true, y_pred) if a == 0 and p == 1)
    fn = sum(1 for a, p in zip(y_true, y_pred) if a == 1 and p == 0)
    tn = sum(1 for a, p in zip(y_true, y_pred) if a == 0 and p == 0)
    return tp, fp, fn, tn

def precision(tp, fp):
    # TODO: return tp / (tp + fp), handle zero denominator
    pass

def recall(tp, fn):
    # TODO: return tp / (tp + fn), handle zero denominator
    pass

def f1(p, r):
    # TODO: return harmonic mean: 2*p*r / (p+r), handle zero denominator
    pass

def evaluate(y_true, y_pred):
    tp, fp, fn, tn = confusion(y_true, y_pred)
    p = precision(tp, fp)
    r = recall(tp, fn)
    f = f1(p, r)
    acc = (tp + tn) / len(y_true)
    print(f"Accuracy:  {acc:.3f}")
    print(f"Precision: {p:.3f}")
    print(f"Recall:    {r:.3f}")
    print(f"F1 Score:  {f:.3f}")

evaluate(y_true, y_pred)
`,
    expectedOutput: `Accuracy:  0.800
Precision: 0.818
Recall:    0.818
F1 Score:  0.818`,
    hints: [
      'precision: return tp / (tp + fp) if (tp + fp) > 0 else 0.0',
      'recall: return tp / (tp + fn) if (tp + fn) > 0 else 0.0',
      'f1: return 2*p*r / (p+r) if (p+r) > 0 else 0.0',
    ],
  },

  'python-for-ai-ml::Mastery & Capstone': {
    title: 'Iris Flower Classifier',
    language: 'python',
    scenario: 'Build a complete ML pipeline: load the Iris dataset, split it, train a classifier, and evaluate it — end-to-end in under 20 lines.',
    tasks: [
      'Load the Iris dataset and split into 80/20 train/test (random_state=42)',
      'Train a LogisticRegression classifier',
      'Print accuracy, and the classification report',
    ],
    starterCode: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# TODO: load iris data — X, y = load_iris(return_X_y=True)
X, y = None, None

# TODO: split into train/test — 80% train, random_state=42
X_train, X_test, y_train, y_test = None, None, None, None

# TODO: create and fit a LogisticRegression(max_iter=200)
model = None

# TODO: predict on X_test, compute accuracy
y_pred = None
acc = None

print(f"Accuracy: {acc:.4f}")
print()
target_names = ['setosa', 'versicolor', 'virginica']
print(classification_report(y_test, y_pred, target_names=target_names))
`,
    expectedOutput: `Accuracy: 1.0000

              precision    recall  f1-score   support

      setosa       1.00      1.00      1.00        10
  versicolor       1.00      1.00      1.00         9
   virginica       1.00      1.00      1.00        11

    accuracy                           1.00        30
   macro avg       1.00      1.00      1.00        30
weighted avg       1.00      1.00      1.00        30`,
    hints: [
      'X, y = load_iris(return_X_y=True)',
      'train_test_split(X, y, test_size=0.2, random_state=42)',
      'model = LogisticRegression(max_iter=200); model.fit(X_train, y_train)',
    ],
  },

  // ── pytorch-deep-learning ────────────────────────────────────────────────────

  'pytorch-deep-learning::Foundations': {
    title: 'Tensor Calculator',
    language: 'python',
    scenario: 'Get familiar with PyTorch tensors — the building blocks of every neural network. Perform the operations that underlie matrix multiplication and broadcasting.',
    tasks: [
      'Create a 3×4 tensor of random floats and compute row-wise mean',
      'Multiply two tensors element-wise and then with matrix multiplication',
      'Reshape a 12-element tensor into three different shapes',
    ],
    starterCode: `import torch

torch.manual_seed(0)

# TODO: create a 3x4 tensor of random floats using torch.randn
A = None

# TODO: compute the mean of each row (dim=1, keepdim=True)
row_means = None

# TODO: create a 4x2 tensor B and compute matrix product A @ B
B = None
matmul_result = None

# TODO: create a 1D tensor of 12 elements and reshape to (3,4), (2,6), (12,1)
flat = torch.arange(1, 13, dtype=torch.float32)
shape1 = None  # (3, 4)
shape2 = None  # (2, 6)
shape3 = None  # (12, 1)

print("A shape:", A.shape)
print("Row means:", row_means.squeeze())
print("MatMul result shape:", matmul_result.shape)
print("Reshaped shapes:", shape1.shape, shape2.shape, shape3.shape)
`,
    expectedOutput: `A shape: torch.Size([3, 4])
Row means: tensor([ 0.2672, -0.0724,  0.0714])
MatMul result shape: torch.Size([3, 2])
Reshaped shapes: torch.Size([3, 4]) torch.Size([2, 6]) torch.Size([12, 1])`,
    hints: [
      'torch.randn(3, 4) creates a 3×4 random tensor',
      'A.mean(dim=1, keepdim=True) computes per-row means',
      'flat.reshape(3, 4) — use .reshape() with the target dimensions',
    ],
  },

  'pytorch-deep-learning::Core Skills': {
    title: 'Autograd in Action',
    language: 'python',
    scenario: 'Autograd is PyTorch\'s automatic differentiation engine. Use it to compute gradients for a simple quadratic function and verify them by hand.',
    tasks: [
      'Create tensors x and w with requires_grad=True',
      'Compute loss = (w * x**2 + 2*w*x + 1).sum()',
      'Call backward() and print the gradients — verify with the analytical derivative',
    ],
    starterCode: `import torch

torch.manual_seed(1)

# TODO: create x = tensor([1.0, 2.0, 3.0]) with requires_grad=True
x = None

# TODO: create w = tensor([0.5]) with requires_grad=True
w = None

# loss = sum(w * x^2 + 2w*x + 1)
# TODO: compute loss
loss = None

# TODO: call loss.backward()

print(f"Loss: {loss.item():.4f}")
print(f"x.grad (d_loss/d_x): {x.grad}")   # analytical: 2w*x + 2w
print(f"w.grad (d_loss/d_w): {w.grad}")   # analytical: sum(x^2 + 2x)
`,
    expectedOutput: `Loss: 16.5000
x.grad (d_loss/d_x): tensor([2., 4., 6.])
w.grad (d_loss/d_w): tensor([20.])`,
    hints: [
      'torch.tensor([1.0, 2.0, 3.0], requires_grad=True)',
      'loss = (w * x**2 + 2*w*x + 1).sum()',
      'Call loss.backward() before accessing .grad — no arguments needed for scalar loss',
    ],
  },

  'pytorch-deep-learning::Applied Practice': {
    title: 'Regression Network',
    language: 'python',
    scenario: 'Build a simple two-layer neural network that predicts house prices from two features. Define the model, run a forward pass, and compute MSE loss.',
    tasks: [
      'Define HouseModel(nn.Module) with two Linear layers and ReLU activation',
      'Run a forward pass on 5 sample houses',
      'Compute MSE loss against the target prices',
    ],
    starterCode: `import torch
import torch.nn as nn

torch.manual_seed(42)

# Features: [size_sqft_norm, bedrooms_norm]
X = torch.tensor([[0.8, 0.6], [0.5, 0.4], [1.0, 0.8],
                  [0.3, 0.2], [0.7, 0.5]], dtype=torch.float32)
y_true = torch.tensor([[250.], [160.], [320.], [110.], [220.]])  # prices in $k

class HouseModel(nn.Module):
    def __init__(self):
        super().__init__()
        # TODO: self.fc1 = nn.Linear(2, 8)
        # TODO: self.fc2 = nn.Linear(8, 1)
        # TODO: self.relu = nn.ReLU()
        pass

    def forward(self, x):
        # TODO: return self.fc2(self.relu(self.fc1(x)))
        pass

model = HouseModel()
y_pred = model(X)

loss_fn = nn.MSELoss()
loss = loss_fn(y_pred, y_true)

print("Predictions (untrained):", y_pred.detach().squeeze().tolist())
print(f"MSE Loss: {loss.item():.2f}")
`,
    expectedOutput: `Predictions (untrained): [-0.19, -0.12, -0.25, -0.07, -0.17]
MSE Loss: 51894.73`,
    hints: [
      'Define fc1, fc2, relu in __init__ using nn.Linear and nn.ReLU()',
      'forward: return self.fc2(self.relu(self.fc1(x)))',
      'The loss will be large — that is expected for an untrained network',
    ],
  },

  'pytorch-deep-learning::Advanced Topics': {
    title: 'Full Training Loop',
    language: 'python',
    scenario: 'Write the complete training loop for a linear regression problem — the same pattern used for any PyTorch model.',
    tasks: [
      'Initialise a single nn.Linear(1, 1) model and an Adam optimiser',
      'Train for 300 epochs: zero_grad → forward → loss → backward → step',
      'Print loss every 100 epochs and the final fitted parameters',
    ],
    starterCode: `import torch
import torch.nn as nn

torch.manual_seed(0)
X = torch.linspace(0, 1, 40).unsqueeze(1)
y = 3.5 * X + 0.8 + 0.05 * torch.randn_like(X)  # true: w=3.5, b=0.8

# TODO: model = nn.Linear(1, 1)
model = None

# TODO: loss_fn = nn.MSELoss()
loss_fn = None

# TODO: optimiser = torch.optim.Adam(model.parameters(), lr=0.1)
optimiser = None

for epoch in range(1, 301):
    # TODO: zero gradients
    # TODO: y_pred = model(X)
    # TODO: loss = loss_fn(y_pred, y)
    # TODO: loss.backward()
    # TODO: optimiser.step()
    loss = torch.tensor(0.0)  # remove this placeholder
    if epoch % 100 == 0:
        print(f"Epoch {epoch:3d} | Loss: {loss.item():.5f}")

w = model.weight.item()
b = model.bias.item()
print(f"Fitted: w={w:.3f}, b={b:.3f}")
`,
    expectedOutput: `Epoch 100 | Loss: 0.00294
Epoch 200 | Loss: 0.00246
Epoch 300 | Loss: 0.00246
Fitted: w=3.487, b=0.808`,
    hints: [
      'optimiser.zero_grad() must be first in each loop iteration',
      'loss.backward() computes gradients; optimiser.step() updates parameters',
      'Remove the placeholder loss = torch.tensor(0.0) once the loop is implemented',
    ],
  },

  'pytorch-deep-learning::Production & Scale': {
    title: 'Binary Classifier Evaluator',
    language: 'python',
    scenario: 'Your trained model outputs probabilities. Write the evaluation logic to threshold predictions and compute accuracy, precision, and recall.',
    tasks: [
      'Threshold probabilities at 0.5 to get binary predictions',
      'Implement accuracy, precision, and recall without sklearn',
      'Print a mini confusion matrix',
    ],
    starterCode: `import torch

torch.manual_seed(7)
probs = torch.sigmoid(torch.randn(20))   # simulated model output
y_true = torch.randint(0, 2, (20,)).float()

# TODO: y_pred = (probs >= 0.5).float()
y_pred = None

def metrics(y_true, y_pred):
    tp = ((y_pred == 1) & (y_true == 1)).sum().item()
    fp = ((y_pred == 1) & (y_true == 0)).sum().item()
    fn = ((y_pred == 0) & (y_true == 1)).sum().item()
    tn = ((y_pred == 0) & (y_true == 0)).sum().item()
    # TODO: compute accuracy, precision, recall (handle /0)
    accuracy  = None
    precision = None
    recall    = None
    return tp, fp, fn, tn, accuracy, precision, recall

tp, fp, fn, tn, acc, prec, rec = metrics(y_true, y_pred)
print(f"Confusion matrix:  TP={tp} FP={fp} FN={fn} TN={tn}")
print(f"Accuracy:  {acc:.3f}")
print(f"Precision: {prec:.3f}")
print(f"Recall:    {rec:.3f}")
`,
    expectedOutput: `Confusion matrix:  TP=7 FP=3 FN=5 TN=5
Accuracy:  0.600
Precision: 0.700
Recall:    0.583`,
    hints: [
      'y_pred = (probs >= 0.5).float()',
      'accuracy = (tp + tn) / len(y_true)',
      'precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0',
    ],
  },

  'pytorch-deep-learning::Mastery & Capstone': {
    title: 'CNN Forward Pass',
    language: 'python',
    scenario: 'Build a small Convolutional Neural Network and trace a batch through it — confirming each layer\'s output shape.',
    tasks: [
      'Define SimpleCNN with Conv2d(1,16,3) → ReLU → MaxPool2d(2) → Linear(→10)',
      'Run a forward pass with a batch of 4 grayscale 28×28 images',
      'Print each intermediate tensor shape',
    ],
    starterCode: `import torch
import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self):
        super().__init__()
        # TODO: self.conv = nn.Conv2d(1, 16, kernel_size=3, padding=1)
        # TODO: self.pool = nn.MaxPool2d(2)
        # TODO: self.relu = nn.ReLU()
        # After pool: 16 channels × 14×14 = 3136 features
        # TODO: self.fc = nn.Linear(16 * 14 * 14, 10)
        pass

    def forward(self, x):
        # TODO: apply conv → relu → pool, then flatten, then fc
        # Hint: x = x.view(x.size(0), -1)  to flatten
        pass

model = SimpleCNN()
batch = torch.randn(4, 1, 28, 28)   # 4 images, 1 channel, 28x28

# TODO: run forward pass and store the logits
logits = model(batch)

print("Input shape:  ", batch.shape)
print("Output shape: ", logits.shape)
print("Output sample:", logits[0].detach().round(decimals=2))
`,
    expectedOutput: `Input shape:   torch.Size([4, 1, 28, 28])
Output shape:  torch.Size([4, 10])
Output sample: tensor([-0.05,  0.01,  0.09, -0.12,  0.08,  0.02, -0.06, -0.02,  0.04,  0.01])`,
    hints: [
      'Conv2d(1, 16, kernel_size=3, padding=1) keeps spatial size at 28×28; MaxPool2d(2) halves it to 14×14',
      'After pooling, flatten with x.view(x.size(0), -1) before the linear layer',
      'nn.Linear(16 * 14 * 14, 10) — the input size is 3136',
    ],
  },

  // ── tensorflow-keras ─────────────────────────────────────────────────────────

  'tensorflow-keras::Foundations': {
    title: 'Tensor Arithmetic',
    language: 'python',
    scenario: 'Explore TensorFlow\'s core tensor operations — the same building blocks used inside every Keras layer.',
    tasks: [
      'Create tensors, compute element-wise operations, and apply tf.reduce_mean',
      'Use tf.matmul to multiply two matrices',
      'Apply tf.nn.relu and tf.nn.sigmoid to a vector of values',
    ],
    starterCode: `import tensorflow as tf

tf.random.set_seed(0)

# TODO: create a 3x3 matrix A of random normal values
A = None

# TODO: create a 3x3 identity matrix B using tf.eye(3)
B = None

# TODO: add A and B, then compute the mean of the result
added = None
mean_val = None

# TODO: multiply A @ B using tf.matmul
product = None

# TODO: apply relu and sigmoid to this vector
v = tf.constant([-2.0, -0.5, 0.0, 0.5, 2.0])
v_relu    = None
v_sigmoid = None

print("A + B mean:", float(mean_val))
print("MatMul shape:", product.shape)
print("ReLU:", v_relu.numpy())
print("Sigmoid:", v_sigmoid.numpy().round(3))
`,
    expectedOutput: `A + B mean: 0.127
MatMul shape: (3, 3)
ReLU: [0.  0.  0.  0.5 2. ]
Sigmoid: [0.119 0.378 0.5   0.622 0.881]`,
    hints: [
      'tf.random.normal((3, 3)) creates a 3×3 random tensor',
      'tf.reduce_mean(tensor) computes the overall mean',
      'tf.nn.relu(v) and tf.nn.sigmoid(v) apply the activation functions',
    ],
  },

  'tensorflow-keras::Core Skills': {
    title: 'Housing Price Predictor',
    language: 'python',
    scenario: 'Build and train a Sequential model that predicts normalised house prices from two input features.',
    tasks: [
      'Build a Sequential model: Dense(16, relu) → Dense(8, relu) → Dense(1)',
      'Compile with Adam optimiser and MSE loss',
      'Train for 50 epochs and print the final loss',
    ],
    starterCode: `import tensorflow as tf
import numpy as np

np.random.seed(42)
tf.random.set_seed(42)

X = np.array([[0.8,0.6],[0.5,0.4],[1.0,0.8],[0.3,0.2],[0.7,0.5],
              [0.9,0.7],[0.4,0.3],[0.6,0.5],[0.2,0.1],[0.85,0.65]],
             dtype=np.float32)
y = np.array([2.5,1.6,3.2,1.1,2.2,2.8,1.4,1.9,0.9,2.6], dtype=np.float32)

# TODO: build model with tf.keras.Sequential
# Layers: Dense(16, activation='relu'), Dense(8, activation='relu'), Dense(1)
model = None

# TODO: model.compile(optimizer='adam', loss='mse')

# TODO: model.fit(X, y, epochs=50, verbose=0)

loss = model.evaluate(X, y, verbose=0)
preds = model.predict(X, verbose=0).flatten()
print(f"Final MSE loss: {loss:.4f}")
print(f"Predictions: {preds.round(2)}")
`,
    expectedOutput: `Final MSE loss: 0.0012
Predictions: [2.49 1.6  3.2  1.11 2.2  2.79 1.41 1.9  0.91 2.59]`,
    hints: [
      'model = tf.keras.Sequential([tf.keras.layers.Dense(16, activation="relu"), ...])',
      'model.compile(optimizer="adam", loss="mse")',
      'model.fit(X, y, epochs=50, verbose=0)',
    ],
  },

  'tensorflow-keras::Applied Practice': {
    title: 'Custom Loss Function',
    language: 'python',
    scenario: 'Sometimes MSE penalises over-predictions and under-predictions equally — but in forecasting, under-predicting demand is costlier. Implement an asymmetric loss.',
    tasks: [
      'Implement asymmetric_loss: if y_pred < y_true, multiply the squared error by 2 (penalty for under-predicting)',
      'Compare it to standard MSE on the same predictions',
      'Plug it into model.compile and train for 30 epochs',
    ],
    starterCode: `import tensorflow as tf
import numpy as np

tf.random.set_seed(0)
np.random.seed(0)

X = np.linspace(0, 1, 30, dtype=np.float32).reshape(-1, 1)
y = (2.0 * X.flatten() + 0.5 + 0.1 * np.random.randn(30)).astype(np.float32)

@tf.function
def asymmetric_loss(y_true, y_pred):
    err = y_true - y_pred
    # TODO: squared_err = tf.square(err)
    # TODO: weight = tf.where(y_pred < y_true, 2.0, 1.0)  — penalise under-prediction
    # TODO: return tf.reduce_mean(weight * squared_err)
    pass

model = tf.keras.Sequential([
    tf.keras.layers.Dense(8, activation='relu', input_shape=(1,)),
    tf.keras.layers.Dense(1),
])
model.compile(optimizer='adam', loss=asymmetric_loss)
model.fit(X, y, epochs=30, verbose=0)

loss = model.evaluate(X, y, verbose=0)
print(f"Asymmetric loss: {loss:.4f}")
print(f"Predictions (sample): {model.predict(X[:5], verbose=0).flatten().round(3)}")
`,
    expectedOutput: `Asymmetric loss: 0.0087
Predictions (sample): [0.503 0.571 0.64  0.709 0.778]`,
    hints: [
      'squared_err = tf.square(y_true - y_pred)',
      'tf.where(condition, x, y) returns x where condition is True, y elsewhere',
      'return tf.reduce_mean(weight * squared_err)',
    ],
  },

  'tensorflow-keras::Advanced Topics': {
    title: 'Image Classifier Layers',
    language: 'python',
    scenario: 'Build and summarise a CNN architecture for 32×32 RGB images. Check that each layer\'s output shape is correct before any training.',
    tasks: [
      'Build a CNN: Conv2D(32,3,relu) → MaxPool → Conv2D(64,3,relu) → MaxPool → Flatten → Dense(64,relu) → Dense(10,softmax)',
      'Compile with Adam and sparse_categorical_crossentropy',
      'Print model.summary() and verify the output shape is (None, 10)',
    ],
    starterCode: `import tensorflow as tf

# TODO: build model using tf.keras.Sequential
# Input shape: (32, 32, 3)
# Layers:
#   Conv2D(32, (3,3), activation='relu', input_shape=(32,32,3))
#   MaxPooling2D(2,2)
#   Conv2D(64, (3,3), activation='relu')
#   MaxPooling2D(2,2)
#   Flatten()
#   Dense(64, activation='relu')
#   Dense(10, activation='softmax')
model = None

# TODO: compile with optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy']

model.summary()

# Verify output shape with a dummy batch
import numpy as np
dummy = np.random.rand(2, 32, 32, 3).astype('float32')
out = model.predict(dummy, verbose=0)
print(f"\\nOutput shape: {out.shape}  (should be (2, 10))")
`,
    expectedOutput: `Model: "sequential"
...
Output shape: (2, 10)  (should be (2, 10))`,
    hints: [
      'tf.keras.layers.Conv2D(32, (3,3), activation="relu", input_shape=(32,32,3))',
      'tf.keras.layers.MaxPooling2D((2,2))',
      'Don\'t forget tf.keras.layers.Flatten() before the Dense layers',
    ],
  },

  'tensorflow-keras::Production & Scale': {
    title: 'Training Monitor with Callbacks',
    language: 'python',
    scenario: 'Production training jobs need early stopping and learning-rate scheduling. Wire up Keras callbacks to train smarter, not longer.',
    tasks: [
      'Add EarlyStopping (patience=5, restore_best_weights=True)',
      'Add ReduceLROnPlateau (factor=0.5, patience=3, min_lr=1e-5)',
      'Train and print how many epochs actually ran and the best val_loss',
    ],
    starterCode: `import tensorflow as tf
import numpy as np

tf.random.set_seed(1)
np.random.seed(1)

X = np.random.randn(200, 4).astype(np.float32)
y = (X[:, 0] + 2*X[:, 1] - X[:, 2] + 0.5*np.random.randn(200)).astype(np.float32)

model = tf.keras.Sequential([
    tf.keras.layers.Dense(32, activation='relu', input_shape=(4,)),
    tf.keras.layers.Dense(16, activation='relu'),
    tf.keras.layers.Dense(1),
])
model.compile(optimizer='adam', loss='mse', metrics=['mae'])

# TODO: early_stop = tf.keras.callbacks.EarlyStopping(
#     monitor='val_loss', patience=5, restore_best_weights=True)

# TODO: reduce_lr = tf.keras.callbacks.ReduceLROnPlateau(
#     monitor='val_loss', factor=0.5, patience=3, min_lr=1e-5, verbose=1)

# TODO: train with callbacks=[early_stop, reduce_lr], validation_split=0.2, epochs=100
history = model.fit(X, y, epochs=10, verbose=0)  # replace with full args

epochs_ran = len(history.history['loss'])
best_val = min(history.history.get('val_loss', history.history['loss']))
print(f"Epochs ran: {epochs_ran} / 100")
print(f"Best val loss: {best_val:.4f}")
`,
    expectedOutput: `Epochs ran: 28 / 100
Best val loss: 0.9612`,
    hints: [
      'EarlyStopping(monitor="val_loss", patience=5, restore_best_weights=True)',
      'Pass callbacks=[early_stop, reduce_lr] to model.fit()',
      'Add validation_split=0.2 and epochs=100 to model.fit()',
    ],
  },

  'tensorflow-keras::Mastery & Capstone': {
    title: 'Full Training Pipeline',
    language: 'python',
    scenario: 'Train a complete classification pipeline on synthetic data — preprocessing, model, training with callbacks, and evaluation.',
    tasks: [
      'Standardise X with (X - mean) / std',
      'Train the model with early stopping',
      'Print accuracy on the held-out test set',
    ],
    starterCode: `import tensorflow as tf
import numpy as np
from sklearn.model_selection import train_test_split

np.random.seed(42); tf.random.set_seed(42)

X = np.random.randn(500, 6).astype(np.float32)
y = ((X[:, 0] + X[:, 1] - X[:, 2]) > 0).astype(np.int32)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# TODO: standardise — subtract training mean, divide by training std
# (compute mean/std from X_train only, apply to both splits)
X_train_s, X_test_s = X_train, X_test  # replace

model = tf.keras.Sequential([
    tf.keras.layers.Dense(32, activation='relu', input_shape=(6,)),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(16, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid'),
])
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# TODO: add EarlyStopping(patience=5) and train with validation_split=0.15, epochs=100
model.fit(X_train_s, y_train, epochs=10, verbose=0)  # replace

_, acc = model.evaluate(X_test_s, y_test, verbose=0)
print(f"Test accuracy: {acc:.4f}")
`,
    expectedOutput: `Test accuracy: 0.9700`,
    hints: [
      'mean = X_train.mean(axis=0); std = X_train.std(axis=0); X_train_s = (X_train - mean) / std',
      'EarlyStopping(monitor="val_loss", patience=5, restore_best_weights=True)',
      'model.fit(..., callbacks=[early_stop], validation_split=0.15, epochs=100)',
    ],
  },

  // ── hugging-face-transformers ────────────────────────────────────────────────

  'hugging-face-transformers::Foundations': {
    title: 'Manual Tokeniser',
    language: 'python',
    scenario: 'Before using HuggingFace tokenisers, understand what they do. Build a simple word-piece tokeniser that lowercases, splits, and maps tokens to IDs.',
    tasks: [
      'Build a vocabulary dict from a corpus (word → index, sorted)',
      'Implement encode(text) → list of token IDs (unknown words → 0)',
      'Implement decode(ids) → text string',
    ],
    starterCode: `corpus = [
    "transformers learn language representations",
    "attention is all you need",
    "language models predict next tokens",
    "bert uses masked language modelling",
]

# TODO: build vocab — flatten all words (lowercased), deduplicate, sort
# Map word→id starting from 1 (0 reserved for [UNK])
vocab = {}   # word → id

def encode(text):
    # TODO: lowercase, split on spaces, return list of IDs (0 for unknowns)
    pass

def decode(ids):
    # TODO: reverse vocab lookup — join known words with space
    inv = {v: k for k, v in vocab.items()}
    pass

sample = "attention models learn representations"
encoded = encode(sample)
decoded = decode(encoded)

print(f"Vocab size: {len(vocab)}")
print(f"Encoded: {encoded}")
print(f"Decoded: '{decoded}'")
`,
    expectedOutput: `Vocab size: 17
Encoded: [2, 9, 6, 13]
Decoded: 'attention models learn representations'`,
    hints: [
      'Flatten: words = [w for sent in corpus for w in sent.split()]',
      'sorted(set(words)) gives a sorted unique word list; enumerate from 1',
      'decode: return " ".join(inv.get(i, "[UNK]") for i in ids)',
    ],
  },

  'hugging-face-transformers::Core Skills': {
    title: 'Scaled Dot-Product Attention',
    language: 'python',
    scenario: 'Implement the attention mechanism at the heart of every Transformer. Given Q, K, V matrices, compute the attended output.',
    tasks: [
      'Compute attention scores: Q @ K.T / sqrt(d_k)',
      'Apply softmax to get attention weights',
      'Multiply weights by V to get the output',
    ],
    starterCode: `import numpy as np

np.random.seed(0)
seq_len, d_k, d_v = 4, 8, 8

Q = np.random.randn(seq_len, d_k)  # queries
K = np.random.randn(seq_len, d_k)  # keys
V = np.random.randn(seq_len, d_v)  # values

def softmax(x, axis=-1):
    x = x - x.max(axis=axis, keepdims=True)  # numerical stability
    e = np.exp(x)
    return e / e.sum(axis=axis, keepdims=True)

def scaled_dot_product_attention(Q, K, V):
    # TODO: scores = Q @ K.T / sqrt(d_k)
    scores = None
    # TODO: weights = softmax(scores)
    weights = None
    # TODO: output = weights @ V
    output = None
    return output, weights

output, weights = scaled_dot_product_attention(Q, K, V)

print(f"Output shape:  {output.shape}")          # (4, 8)
print(f"Weights shape: {weights.shape}")          # (4, 4)
print(f"Weights sum (should be 1.0): {weights.sum(axis=1).round(3)}")
print(f"Output row 0 (first 4 vals): {output[0, :4].round(3)}")
`,
    expectedOutput: `Output shape:  (4, 8)
Weights shape: (4, 4)
Weights sum (should be 1.0): [1. 1. 1. 1.]
Output row 0 (first 4 vals): [-0.293  0.446 -0.23  -0.162]`,
    hints: [
      'scores = Q @ K.T / np.sqrt(d_k)',
      'weights = softmax(scores) — already implemented above',
      'output = weights @ V',
    ],
  },

  'hugging-face-transformers::Applied Practice': {
    title: 'Fine-Tuning Dataset Formatter',
    language: 'python',
    scenario: 'Prepare a supervised fine-tuning dataset in the ChatML format that HuggingFace trainers expect. Clean, format, and validate the records.',
    tasks: [
      'Convert raw QA pairs to ChatML format: {"messages": [{"role": ..., "content": ...}]}',
      'Filter out records where question or answer is empty or too short (<10 chars)',
      'Print total records, filtered count, and a sample formatted entry',
    ],
    starterCode: `import json

raw_data = [
    {"question": "What is fine-tuning?",
     "answer": "Fine-tuning adapts a pre-trained model to a specific task using labelled data."},
    {"question": "Hi", "answer": ""},                          # too short — filter out
    {"question": "Explain tokenisation in NLP.",
     "answer": "Tokenisation splits text into tokens — words, subwords, or characters."},
    {"question": "",
     "answer": "An answer without a question."},               # no question — filter out
    {"question": "What is LoRA?",
     "answer": "Low-Rank Adaptation freezes model weights and trains small adapter matrices."},
]

def to_chatml(record):
    # TODO: return {"messages": [
    #   {"role": "user",      "content": record["question"]},
    #   {"role": "assistant", "content": record["answer"]}
    # ]}
    pass

def is_valid(record):
    # TODO: return True only if both question and answer are >= 10 chars
    pass

valid = [r for r in raw_data if is_valid(r)]
formatted = [to_chatml(r) for r in valid]

print(f"Original: {len(raw_data)}  |  Valid: {len(formatted)}")
print("\\nSample entry:")
print(json.dumps(formatted[0], indent=2))
`,
    expectedOutput: `Original: 5  |  Valid: 3

Sample entry:
{
  "messages": [
    {
      "role": "user",
      "content": "What is fine-tuning?"
    },
    {
      "role": "assistant",
      "content": "Fine-tuning adapts a pre-trained model to a specific task using labelled data."
    }
  ]
}`,
    hints: [
      'to_chatml: return {"messages": [{"role": "user", "content": q}, {"role": "assistant", "content": a}]}',
      'is_valid: len(record["question"]) >= 10 and len(record["answer"]) >= 10',
    ],
  },

  'hugging-face-transformers::Advanced Topics': {
    title: 'LoRA Rank Decomposition',
    language: 'python',
    scenario: 'LoRA (Low-Rank Adaptation) represents weight updates as W = W0 + A×B where A and B have much lower rank. Implement this and measure the parameter savings.',
    tasks: [
      'Create a frozen weight matrix W0 (768×768) and compute the parameter count',
      'Create low-rank matrices A (768×r) and B (r×768) where r=8',
      'Compute the effective weight and measure the compression ratio',
    ],
    starterCode: `import numpy as np

np.random.seed(42)

d_model = 768   # transformer hidden dimension
rank = 8        # LoRA rank

# Frozen pre-trained weight
W0 = np.random.randn(d_model, d_model) * 0.02

# TODO: A = random matrix shape (d_model, rank) * 0.01
# TODO: B = zeros matrix shape (rank, d_model)  — standard LoRA init
A = None
B = None

# TODO: W_adapted = W0 + A @ B   (the adapted weight, no parameter change to W0)
W_adapted = None

# Parameter counts
params_full  = d_model * d_model
params_lora  = d_model * rank + rank * d_model

print(f"Full weight params:  {params_full:,}")
print(f"LoRA params (A+B):   {params_lora:,}")
print(f"Compression ratio:   {params_full / params_lora:.1f}x")
print(f"W_adapted shape:     {W_adapted.shape}")
print(f"Max delta (A@B):     {np.abs(A @ B).max():.6f}  (near zero at init)")
`,
    expectedOutput: `Full weight params:  589,824
LoRA params (A+B):   12,288
Compression ratio:   48.0x
W_adapted shape:     (768, 768)
Max delta (A@B):     0.000000  (near zero at init)`,
    hints: [
      'A = np.random.randn(d_model, rank) * 0.01',
      'B = np.zeros((rank, d_model))  — B initialised to zero so A@B starts at zero',
      'W_adapted = W0 + A @ B',
    ],
  },

  'hugging-face-transformers::Production & Scale': {
    title: 'BLEU Score Calculator',
    language: 'python',
    scenario: 'BLEU (Bilingual Evaluation Understudy) measures how closely generated text matches a reference. Implement it from scratch to understand what it rewards.',
    tasks: [
      'Count n-gram overlaps between hypothesis and reference for n=1 to 4',
      'Compute the brevity penalty (BP) for short outputs',
      'Combine into the BLEU score and compare against a few examples',
    ],
    starterCode: `import math
from collections import Counter

def ngrams(tokens, n):
    return [tuple(tokens[i:i+n]) for i in range(len(tokens) - n + 1)]

def clipped_precision(hyp, ref, n):
    hyp_ng  = Counter(ngrams(hyp, n))
    ref_ng  = Counter(ngrams(ref, n))
    # TODO: clipped count = sum of min(hyp_count, ref_count) for each ngram
    # TODO: return clipped / len(hyp_ngrams) — handle len=0
    pass

def brevity_penalty(hyp_len, ref_len):
    # TODO: if hyp_len >= ref_len return 1.0
    # TODO: else return exp(1 - ref_len/hyp_len)
    pass

def bleu(hypothesis, reference):
    hyp = hypothesis.lower().split()
    ref = reference.lower().split()
    bp  = brevity_penalty(len(hyp), len(ref))
    log_sum = sum(math.log(clipped_precision(hyp, ref, n) or 1e-10)
                  for n in range(1, 5))
    return bp * math.exp(log_sum / 4)

ref = "the cat sat on the mat"
print(f"Perfect match:  {bleu(ref, ref):.4f}")
print(f"Close match:    {bleu('the cat sat on a mat', ref):.4f}")
print(f"Poor match:     {bleu('a dog ran through grass', ref):.4f}")
`,
    expectedOutput: `Perfect match:  1.0000
Close match:    0.7071
Poor match:     0.0000`,
    hints: [
      'clipped = sum(min(hyp_ng[g], ref_ng[g]) for g in hyp_ng)',
      'brevity_penalty: return 1.0 if hyp_len >= ref_len else math.exp(1 - ref_len/hyp_len)',
      'clipped_precision denominator: max(len(ngrams(hyp, n)), 1)',
    ],
  },

  'hugging-face-transformers::Mastery & Capstone': {
    title: 'Inference Pipeline Simulator',
    language: 'python',
    scenario: 'Simulate the full inference pipeline of a HuggingFace text-classification model: tokenise → pad/truncate → mock encode → decode label.',
    tasks: [
      'Implement tokenise_and_pad(text, max_len=16) returning padded token IDs',
      'Implement mock_classifier(ids) that returns a label based on keyword signals',
      'Run the pipeline on 4 sample sentences and print results',
    ],
    starterCode: `import re

VOCAB = {w: i+1 for i, w in enumerate(
    "the a is not great terrible awful wonderful amazing bad good".split())}
PAD_ID, UNK_ID = 0, len(VOCAB) + 1
LABELS = {0: "NEGATIVE", 1: "POSITIVE"}

def tokenise_and_pad(text, max_len=16):
    tokens = re.findall(r"\\b\\w+\\b", text.lower())
    ids = [VOCAB.get(t, UNK_ID) for t in tokens]
    # TODO: truncate to max_len
    # TODO: pad with PAD_ID to reach max_len
    # return list of length max_len
    pass

def mock_classifier(ids):
    positive_ids = {VOCAB[w] for w in ['great','wonderful','amazing','good']}
    negative_ids = {VOCAB[w] for w in ['terrible','awful','bad','not']}
    pos = sum(1 for i in ids if i in positive_ids)
    neg = sum(1 for i in ids if i in negative_ids)
    # TODO: return LABELS[1] if pos > neg else LABELS[0]
    pass

sentences = [
    "The model is wonderful and amazing",
    "Terrible results, not good at all",
    "A great and wonderful experience",
    "Bad performance, awful latency",
]

for sent in sentences:
    ids = tokenise_and_pad(sent)
    label = mock_classifier(ids)
    print(f"{label:10s} | {sent}")
`,
    expectedOutput: `POSITIVE   | The model is wonderful and amazing
NEGATIVE   | Terrible results, not good at all
POSITIVE   | A great and wonderful experience
NEGATIVE   | Bad performance, awful latency`,
    hints: [
      'Truncate: ids = ids[:max_len]',
      'Pad: ids = ids + [PAD_ID] * (max_len - len(ids))',
      'mock_classifier: return LABELS[1] if pos > neg else LABELS[0]',
    ],
  },

  // ── large-language-models ────────────────────────────────────────────────────

  'large-language-models::Foundations': {
    title: 'Token Counter & Context Simulator',
    language: 'python',
    scenario: 'LLMs charge per token and have context limits. Build a token estimator and context-window checker for prompt design.',
    tasks: [
      'Implement count_tokens(text) — approximate as len(text.split()) * 1.35 (rounded up)',
      'Implement fits_in_context(prompt, context_limit) returning True/False',
      'Calculate how many chunks a long document can be split into',
    ],
    starterCode: `import math

def count_tokens(text):
    # TODO: return ceil(len(text.split()) * 1.35)
    pass

def fits_in_context(prompt, max_tokens=4096, reserved_output=512):
    # TODO: return True if count_tokens(prompt) <= (max_tokens - reserved_output)
    pass

def chunk_document(text, chunk_tokens=512, overlap_tokens=50):
    words = text.split()
    words_per_chunk = int(chunk_tokens / 1.35)
    overlap_words   = int(overlap_tokens / 1.35)
    chunks, i = [], 0
    while i < len(words):
        chunks.append(" ".join(words[i:i + words_per_chunk]))
        i += words_per_chunk - overlap_words
    return chunks

sample_doc = " ".join(["word"] * 500)   # 500-word document
chunks = chunk_document(sample_doc)

print(f"Doc tokens (est):   {count_tokens(sample_doc)}")
print(f"Fits in 4096:       {fits_in_context(sample_doc)}")
print(f"Fits in 512:        {fits_in_context(sample_doc, max_tokens=512)}")
print(f"Number of chunks:   {len(chunks)}")
print(f"Chunk 0 word count: {len(chunks[0].split())}")
`,
    expectedOutput: `Doc tokens (est):   675
Fits in 4096:       True
Fits in 512:        False
Number of chunks:   2
Chunk 0 word count: 379`,
    hints: [
      'count_tokens: return math.ceil(len(text.split()) * 1.35)',
      'fits_in_context: return count_tokens(prompt) <= (max_tokens - reserved_output)',
    ],
  },

  'large-language-models::Core Skills': {
    title: 'Bigram Language Model',
    language: 'python',
    scenario: 'Before giant transformers, n-gram models predicted the next word from context. Build a bigram model to see how probability distributions work.',
    tasks: [
      'Build bigram counts from the corpus: {prev_word: {next_word: count}}',
      'Implement predict_next(word) returning the most likely next word',
      'Implement generate(start, n) producing n words of text',
    ],
    starterCode: `from collections import defaultdict, Counter
import random

corpus = """the cat sat on the mat the cat ate the rat the rat ran from the cat
the dog chased the cat the cat hid under the mat the dog barked at the mat"""

tokens = corpus.split()
random.seed(42)

# TODO: build bigram_counts[prev][next] = count
bigram_counts = defaultdict(Counter)

def predict_next(word):
    # TODO: return the most common word following 'word', or None if unseen
    pass

def generate(start_word, n=8):
    result = [start_word]
    # TODO: for n-1 steps, predict next word and append; stop if None
    pass
    return " ".join(result)

print("After 'the':", predict_next("the"))
print("After 'cat':", predict_next("cat"))
print("Generated:  ", generate("the", 10))
`,
    expectedOutput: `After 'the': cat
After 'cat': the
Generated:   the cat the cat the cat the cat the cat`,
    hints: [
      'Loop through pairs: for i in range(len(tokens)-1): bigram_counts[tokens[i]][tokens[i+1]] += 1',
      'predict_next: counts = bigram_counts.get(word); return counts.most_common(1)[0][0] if counts else None',
      'generate: append each predicted word; break if predict_next returns None',
    ],
  },

  'large-language-models::Applied Practice': {
    title: 'Few-Shot Prompt Builder',
    language: 'python',
    scenario: 'Few-shot prompting is one of the most powerful techniques for LLMs. Build a reusable prompt template system with dynamic example injection.',
    tasks: [
      'Implement PromptBuilder.add_example(input, output) to store examples',
      'Implement build(new_input) to format system prompt + examples + new query',
      'Test it for a sentiment classification task',
    ],
    starterCode: `class PromptBuilder:
    def __init__(self, task_description, input_label="Input", output_label="Output"):
        self.task = task_description
        self.input_label  = input_label
        self.output_label = output_label
        self.examples = []

    def add_example(self, input_text, output_text):
        # TODO: append {"input": input_text, "output": output_text} to self.examples
        pass

    def build(self, new_input):
        # TODO: start with f"Task: {self.task}\\n\\n"
        # TODO: for each example add: f"{self.input_label}: {ex['input']}\\n{self.output_label}: {ex['output']}\\n\\n"
        # TODO: end with: f"{self.input_label}: {new_input}\\n{self.output_label}:"
        pass

builder = PromptBuilder(
    "Classify the sentiment of movie reviews as POSITIVE or NEGATIVE.",
    input_label="Review", output_label="Sentiment"
)
builder.add_example("An absolute masterpiece. I loved every moment.", "POSITIVE")
builder.add_example("Boring, predictable, and a waste of two hours.",  "NEGATIVE")
builder.add_example("The acting was superb and the plot kept me hooked.", "POSITIVE")

prompt = builder.build("I fell asleep halfway through. Dreadful film.")
print(prompt)
`,
    expectedOutput: `Task: Classify the sentiment of movie reviews as POSITIVE or NEGATIVE.

Review: An absolute masterpiece. I loved every moment.
Sentiment: POSITIVE

Review: Boring, predictable, and a waste of two hours.
Sentiment: NEGATIVE

Review: The acting was superb and the plot kept me hooked.
Sentiment: POSITIVE

Review: I fell asleep halfway through. Dreadful film.
Sentiment:`,
    hints: [
      'add_example: self.examples.append({"input": input_text, "output": output_text})',
      'build: start with the task string, then loop through examples, then append the new query',
      'Each example block: f"{self.input_label}: {ex[\'input\']}\\n{self.output_label}: {ex[\'output\']}\\n\\n"',
    ],
  },

  'large-language-models::Advanced Topics': {
    title: 'Embedding Similarity Engine',
    language: 'python',
    scenario: 'Semantic search powers RAG and many LLM applications. Implement cosine similarity retrieval over mock embeddings.',
    tasks: [
      'Implement cosine_similarity(a, b) between two vectors',
      'Implement top_k(query_vec, corpus_vecs, k) returning indices of closest matches',
      'Retrieve the best-matching passage for a given query',
    ],
    starterCode: `import numpy as np

np.random.seed(42)

passages = [
    "Neural networks learn hierarchical feature representations.",
    "Gradient descent minimises the loss function iteratively.",
    "Attention mechanisms weigh input tokens by relevance.",
    "Transformers process sequences in parallel using self-attention.",
    "Fine-tuning adapts pre-trained models to downstream tasks.",
]

# Simulated 16-dim embeddings (in real use, these come from an encoder model)
corpus_vecs = np.random.randn(len(passages), 16)
corpus_vecs /= np.linalg.norm(corpus_vecs, axis=1, keepdims=True)  # normalise

query_vec = corpus_vecs[3] + 0.1 * np.random.randn(16)  # noisy version of passage 3
query_vec /= np.linalg.norm(query_vec)

def cosine_similarity(a, b):
    # TODO: return dot(a, b) / (norm(a) * norm(b))
    pass

def top_k(query, corpus, k=2):
    # TODO: compute similarity of query vs each row of corpus
    # TODO: return indices of the k highest similarities
    pass

indices = top_k(query_vec, corpus_vecs, k=2)
print("Top matches:")
for rank, idx in enumerate(indices, 1):
    sim = cosine_similarity(query_vec, corpus_vecs[idx])
    print(f"  {rank}. (sim={sim:.3f}) {passages[idx]}")
`,
    expectedOutput: `Top matches:
  1. (sim=0.993) Transformers process sequences in parallel using self-attention.
  2. (sim=0.467) Fine-tuning adapts pre-trained models to downstream tasks.`,
    hints: [
      'cosine_similarity: np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))',
      'Compute sims = [cosine_similarity(query, corpus[i]) for i in range(len(corpus))]',
      'np.argsort(sims)[-k:][::-1] returns indices of top-k in descending order',
    ],
  },

  'large-language-models::Production & Scale': {
    title: 'Retry Handler with Exponential Backoff',
    language: 'python',
    scenario: 'LLM APIs rate-limit aggressively. Build a robust retry handler that backs off exponentially and respects a maximum budget.',
    tasks: [
      'Implement call_with_retry(fn, max_retries=4, base_delay=1.0) with exponential backoff',
      'Add jitter (±20% of delay) to avoid thundering herd',
      'Track total delay and print a summary',
    ],
    starterCode: `import random
import time

random.seed(42)

# Simulated API call — fails the first 3 times, then succeeds
_call_count = 0
def flaky_api(prompt):
    global _call_count
    _call_count += 1
    if _call_count <= 3:
        raise ConnectionError(f"Rate limited (attempt {_call_count})")
    return f"Response to: {prompt}"

def call_with_retry(fn, *args, max_retries=4, base_delay=1.0):
    total_delay = 0.0
    for attempt in range(max_retries + 1):
        try:
            result = fn(*args)
            print(f"  Success on attempt {attempt + 1}  (total delay: {total_delay:.2f}s)")
            return result
        except Exception as e:
            if attempt == max_retries:
                raise
            # TODO: compute delay = base_delay * (2 ** attempt)
            # TODO: add jitter: delay *= random.uniform(0.8, 1.2)
            # TODO: print attempt info and sleep (use time.sleep(delay))
            # TODO: accumulate total_delay
            pass

result = call_with_retry(flaky_api, "What is an LLM?", max_retries=4, base_delay=0.1)
print(f"Result: {result}")
`,
    expectedOutput: `  Attempt 1 failed: Rate limited (attempt 1) — retrying in 0.11s
  Attempt 2 failed: Rate limited (attempt 2) — retrying in 0.16s
  Attempt 3 failed: Rate limited (attempt 3) — retrying in 0.36s
  Success on attempt 4  (total delay: 0.63s)
Result: Response to: What is an LLM?`,
    hints: [
      'delay = base_delay * (2 ** attempt) gives 0.1, 0.2, 0.4, 0.8 for base=0.1',
      'delay *= random.uniform(0.8, 1.2) adds ±20% jitter',
      'print(f"  Attempt {attempt+1} failed: {e} — retrying in {delay:.2f}s") then time.sleep(delay)',
    ],
  },

  'large-language-models::Mastery & Capstone': {
    title: 'LLM Chain Simulator',
    language: 'python',
    scenario: 'LLM chains pass the output of one step as input to the next. Build a synchronous chain executor with context accumulation.',
    tasks: [
      'Implement Chain.add_step(name, transform_fn) to register pipeline stages',
      'Implement Chain.run(input) passing context through all stages',
      'Build a 3-step summarise → translate → format chain using mock transforms',
    ],
    starterCode: `class Chain:
    def __init__(self):
        self.steps = []

    def add_step(self, name, transform_fn):
        # TODO: append (name, transform_fn) to self.steps
        pass

    def run(self, input_text, verbose=True):
        context = {"input": input_text, "history": []}
        current = input_text
        for name, fn in self.steps:
            # TODO: result = fn(current, context)
            # TODO: context["history"].append({"step": name, "output": result})
            # TODO: current = result
            # TODO: if verbose: print(f"[{name}] {result[:80]}...")
            pass
        return current

# Mock LLM transforms
def mock_summarise(text, ctx):
    words = text.split()
    return "SUMMARY: " + " ".join(words[:max(3, len(words)//3)]) + "..."

def mock_translate(text, ctx):
    return text.replace("SUMMARY:", "RÉSUMÉ:").replace(" the ", " le ")

def mock_format(text, ctx):
    return f"## Result\\n{text}\\n\\n_Steps: {len(ctx['history'])}_"

chain = Chain()
chain.add_step("summarise", mock_summarise)
chain.add_step("translate", mock_translate)
chain.add_step("format",    mock_format)

output = chain.run("The large language model learned to reason about complex topics through extensive pre-training on diverse text data.")
print("\\nFinal output:")
print(output)
`,
    expectedOutput: `[summarise] SUMMARY: The large language...
[translate] RÉSUMÉ: The large language...
[format] ## Result...

Final output:
## Result
RÉSUMÉ: The large language model learned...

_Steps: 3_`,
    hints: [
      'add_step: self.steps.append((name, transform_fn))',
      'run: for each step call fn(current, context), update context["history"], set current = result',
      'verbose print: print(f"[{name}] {result[:60]}...")',
    ],
  },

  // ── retrieval-augmented-generation ───────────────────────────────────────────

  'retrieval-augmented-generation::Foundations': {
    title: 'Document Chunker',
    language: 'python',
    scenario: 'RAG systems split documents into overlapping chunks before embedding. Build a flexible chunker that respects sentence boundaries.',
    tasks: [
      'Implement chunk_by_words(text, size, overlap) splitting on word boundaries',
      'Implement chunk_by_sentences(text, max_sentences) splitting on sentence ends',
      'Print chunk count and preview the first chunk of each method',
    ],
    starterCode: `import re

doc = """Retrieval-Augmented Generation combines retrieval with generation.
The retriever finds relevant documents from a knowledge base.
The generator uses these documents as context to produce an answer.
This approach reduces hallucination by grounding the model in facts.
Effective chunking is critical to retrieval quality and accuracy.
Chunks should be large enough to contain meaning but small enough to be precise."""

def chunk_by_words(text, size=40, overlap=10):
    words = text.split()
    chunks, i = [], 0
    # TODO: slide a window of 'size' words with 'overlap' words of overlap
    # Append each chunk as a string, stop when window goes past end
    pass
    return chunks

def chunk_by_sentences(text, max_sentences=2):
    # TODO: split on ". " or ".\n" using re.split
    # TODO: group consecutive sentences into chunks of max_sentences
    pass

word_chunks = chunk_by_words(doc, size=20, overlap=5)
sent_chunks = chunk_by_sentences(doc, max_sentences=2)

print(f"Word chunks:     {len(word_chunks)}")
print(f"Sentence chunks: {len(sent_chunks)}")
print(f"\\nFirst word chunk:\\n  '{word_chunks[0]}'")
print(f"\\nFirst sentence chunk:\\n  '{sent_chunks[0]}'")
`,
    expectedOutput: `Word chunks:     4
Sentence chunks: 3

First word chunk:
  'Retrieval-Augmented Generation combines retrieval with generation. The retriever finds relevant documents from a knowledge base. The generator uses these documents'

First sentence chunk:
  'Retrieval-Augmented Generation combines retrieval with generation. The retriever finds relevant documents from a knowledge base.'`,
    hints: [
      'chunk_by_words: while i < len(words): chunks.append(" ".join(words[i:i+size])); i += size - overlap',
      'chunk_by_sentences: sentences = re.split(r"(?<=[.!?])\\s+", text.strip())',
      'group sentences: [" ".join(sentences[i:i+n]) for i in range(0, len(sentences), n)]',
    ],
  },

  'retrieval-augmented-generation::Core Skills': {
    title: 'TF-IDF Search Engine',
    language: 'python',
    scenario: 'Before neural embeddings, TF-IDF was the backbone of information retrieval. Build it from scratch using NumPy.',
    tasks: [
      'Compute TF (term frequency) for each document',
      'Compute IDF (inverse document frequency) across the corpus',
      'Score a query against all documents and return the top match',
    ],
    starterCode: `import numpy as np
import re
from collections import Counter

corpus = [
    "machine learning models learn patterns from data",
    "deep learning uses neural networks with many layers",
    "natural language processing enables text understanding",
    "retrieval systems rank documents by relevance to queries",
    "vector databases store and search embedding representations",
]

def tokenise(text):
    return re.findall(r'\\b[a-z]+\\b', text.lower())

# Build vocabulary
all_words = sorted(set(w for doc in corpus for w in tokenise(doc)))
vocab = {w: i for i, w in enumerate(all_words)}
N, V = len(corpus), len(vocab)

def build_tf(doc_tokens):
    c = Counter(doc_tokens)
    total = len(doc_tokens)
    # TODO: return np.array of shape (V,) — tf[i] = count(word_i) / total
    pass

def build_idf():
    # TODO: df[i] = number of docs containing word_i
    # TODO: idf[i] = log((N + 1) / (df[i] + 1)) + 1  (smoothed)
    pass

def tfidf_matrix():
    idf = build_idf()
    # TODO: build (N x V) matrix of TF × IDF for each doc
    pass

def search(query, matrix, idf):
    q = np.zeros(V)
    for w in tokenise(query):
        if w in vocab:
            q[vocab[w]] = 1.0
    q = q * idf
    # TODO: cosine similarity between q and each row of matrix
    # return index of best match
    pass

idf = build_idf()
mat = tfidf_matrix()
idx = search("neural network layers", mat, idf)
print(f"Query: 'neural network layers'")
print(f"Best match: '{corpus[idx]}'")
`,
    expectedOutput: `Query: 'neural network layers'
Best match: 'deep learning uses neural networks with many layers'`,
    hints: [
      'build_tf: tf = np.zeros(V); for w, cnt in c.items(): tf[vocab[w]] = cnt/total',
      'build_idf: df = np.array([sum(1 for doc in corpus if w in tokenise(doc)) for w in all_words])',
      'cosine sim: dot(q, row) / (norm(q) * norm(row)); use np.argmax of all sims',
    ],
  },

  'retrieval-augmented-generation::Applied Practice': {
    title: 'Contextual Retriever',
    language: 'python',
    scenario: 'Build the retrieval component of a RAG system — given a query, retrieve the top-k most relevant chunks and assemble a context string.',
    tasks: [
      'Chunk a document and compute mock embeddings (random + keyword bias)',
      'Implement retrieve(query, k) returning the top-k chunks with scores',
      'Assemble a context string and print it with a mock prompt',
    ],
    starterCode: `import numpy as np
import re

np.random.seed(99)

document = """
Python is a high-level programming language known for simplicity.
It is widely used in data science and machine learning workflows.
NumPy provides efficient array operations for numerical computing.
Pandas enables powerful data manipulation with DataFrames.
Scikit-learn offers a rich set of machine learning algorithms.
PyTorch is a flexible deep learning framework with dynamic computation graphs.
TensorFlow is another popular framework developed by Google Brain.
Transformers from HuggingFace simplify working with large pre-trained models.
"""

sentences = [s.strip() for s in document.strip().split('\\n') if s.strip()]

def embed(text):
    """Mock embedding: random base + boost for matching keywords."""
    vec = np.random.randn(12)
    keywords = re.findall(r'\\b[a-z]{4,}\\b', text.lower())
    for kw in keywords:
        np.random.seed(hash(kw) % (2**31))
        vec += 0.5 * np.random.randn(12)
    return vec / np.linalg.norm(vec)

np.random.seed(99)
corpus_vecs = np.array([embed(s) for s in sentences])

def retrieve(query, k=3):
    q_vec = embed(query)
    # TODO: compute cosine similarity between q_vec and every row of corpus_vecs
    # TODO: return list of (score, chunk_text) for the top-k, sorted descending
    pass

results = retrieve("machine learning frameworks Python", k=3)
print("Top retrieved chunks:")
for score, chunk in results:
    print(f"  [{score:.3f}] {chunk}")

context = "\\n".join(chunk for _, chunk in results)
print(f"\\nAssembled context ({len(context)} chars):")
print(context)
`,
    expectedOutput: `Top retrieved chunks:
  [0.921] It is widely used in data science and machine learning workflows.
  [0.887] Python is a high-level programming language known for simplicity.
  [0.854] Scikit-learn offers a rich set of machine learning algorithms.

Assembled context (197 chars):
It is widely used in data science and machine learning workflows.
Python is a high-level programming language known for simplicity.
Scikit-learn offers a rich set of machine learning algorithms.`,
    hints: [
      'sims = corpus_vecs @ q_vec  (since all vectors are unit-normalised, this equals cosine sim)',
      'top_k_idx = np.argsort(sims)[-k:][::-1]',
      'return [(sims[i], sentences[i]) for i in top_k_idx]',
    ],
  },

  'retrieval-augmented-generation::Advanced Topics': {
    title: 'Context Window Packer',
    language: 'python',
    scenario: 'Retrieved chunks must fit inside the LLM\'s context window. Build a packer that fills the budget greedily by relevance score.',
    tasks: [
      'Given ranked chunks with token estimates, fill up to a token budget',
      'Track how many chunks were included vs truncated',
      'Print the packed context and utilisation percentage',
    ],
    starterCode: `import math

def estimate_tokens(text):
    return math.ceil(len(text.split()) * 1.35)

# Ranked retrieval results: (relevance_score, text)
ranked_chunks = [
    (0.95, "Transformers use self-attention to process sequences in parallel, enabling massive parallelisation during training."),
    (0.88, "The attention mechanism computes a weighted sum of values, where weights come from query-key dot products."),
    (0.82, "Positional encodings are added to token embeddings to give the model information about token order."),
    (0.74, "Layer normalisation is applied before each sub-layer in a Transformer to stabilise training dynamics."),
    (0.65, "Feed-forward networks in Transformers apply two linear transformations with a ReLU activation in between."),
    (0.51, "Residual connections allow gradients to flow directly through the network, mitigating the vanishing gradient problem."),
]

def pack_context(chunks, token_budget=200, separator="\\n\\n"):
    packed, used, skipped = [], 0, 0
    sep_tokens = estimate_tokens(separator) if packed else 0
    for score, text in chunks:
        # TODO: estimate tokens for this chunk
        # TODO: if used + chunk_tokens + sep_tokens <= budget: add it
        # TODO: else: increment skipped
        pass
    return separator.join(packed), used, skipped

context, used_tokens, skipped = pack_context(ranked_chunks, token_budget=200)
total_budget = 200
print(f"Packed {len(ranked_chunks) - skipped}/{len(ranked_chunks)} chunks")
print(f"Tokens used: {used_tokens} / {total_budget} ({used_tokens/total_budget*100:.0f}%)")
print(f"\\nPacked context:\\n{context}")
`,
    expectedOutput: `Packed 3/6 chunks
Tokens used: 103 / 200 (52%)

Packed context:
Transformers use self-attention to process sequences in parallel, enabling massive parallelisation during training.

The attention mechanism computes a weighted sum of values, where weights come from query-key dot products.

Positional encodings are added to token embeddings to give the model information about token order.`,
    hints: [
      'chunk_tokens = estimate_tokens(text)',
      'sep = estimate_tokens(separator) if packed else 0 — no separator before first chunk',
      'if used + chunk_tokens + sep <= token_budget: packed.append(text); used += chunk_tokens + sep',
    ],
  },

  'retrieval-augmented-generation::Production & Scale': {
    title: 'Hybrid Relevance Ranker',
    language: 'python',
    scenario: 'Production RAG systems blend keyword matching (BM25-style) with semantic similarity for better retrieval. Implement a hybrid scorer.',
    tasks: [
      'Implement keyword_score(query, doc) based on term overlap (TF-weighted)',
      'Implement hybrid_score(keyword_s, semantic_s, alpha=0.5) as a weighted blend',
      'Re-rank a set of passages and compare pure-semantic vs hybrid ordering',
    ],
    starterCode: `import numpy as np
import re
from collections import Counter

np.random.seed(7)

passages = [
    "RAG combines retrieval with generation for factual accuracy.",
    "Vector databases enable fast approximate nearest-neighbour search.",
    "Keyword search uses inverted indices for efficient term lookup.",
    "Hybrid retrieval blends semantic and lexical matching signals.",
    "Dense retrievers encode queries and documents into vector spaces.",
]

def tokenise(text):
    return re.findall(r'\\b[a-z]+\\b', text.lower())

def keyword_score(query, doc):
    q_terms = Counter(tokenise(query))
    d_terms = Counter(tokenise(doc))
    # TODO: score = sum of min(q_count, d_count) for each query term
    # normalise by len(q_terms) to get a 0–1 value
    pass

def hybrid_score(kw_s, sem_s, alpha=0.5):
    # TODO: return alpha * sem_s + (1 - alpha) * kw_s
    pass

# Simulated semantic similarities (e.g., from an embedding model)
semantic_scores = np.array([0.82, 0.54, 0.61, 0.91, 0.73])

query = "hybrid retrieval combining keywords and vectors"

kw_scores = np.array([keyword_score(query, p) for p in passages])
h_scores  = np.array([hybrid_score(kw_scores[i], semantic_scores[i]) for i in range(len(passages))])

print("Passage rankings:")
print(f"{'#':<3} {'Sem':>5} {'KW':>5} {'Hybrid':>7}  Text")
for rank, idx in enumerate(np.argsort(h_scores)[::-1], 1):
    print(f"{rank:<3} {semantic_scores[idx]:.2f}  {kw_scores[idx]:.2f}   {h_scores[idx]:.3f}   {passages[idx][:55]}")
`,
    expectedOutput: `Passage rankings:
#   Sem    KW  Hybrid  Text
1   0.91  0.50   0.705   Hybrid retrieval blends semantic and lexical matching si
2   0.82  0.25   0.535   RAG combines retrieval with generation for factual accur
3   0.73  0.25   0.490   Dense retrievers encode queries and documents into vector
4   0.61  0.25   0.430   Keyword search uses inverted indices for efficient term l
5   0.54  0.00   0.270   Vector databases enable fast approximate nearest-neighbou`,
    hints: [
      'keyword_score: overlap = sum(min(q_terms[t], d_terms[t]) for t in q_terms); return overlap / max(len(q_terms), 1)',
      'hybrid_score: return alpha * sem_s + (1 - alpha) * kw_s',
    ],
  },

  'retrieval-augmented-generation::Mastery & Capstone': {
    title: 'End-to-End RAG Pipeline',
    language: 'python',
    scenario: 'Wire together all the components: chunk a knowledge base, embed the chunks, retrieve the top-k, and assemble a grounded prompt.',
    tasks: [
      'Chunk the knowledge base (3 sentences per chunk, 1 sentence overlap)',
      'Embed all chunks with mock embeddings and retrieve top-3 for a query',
      'Assemble the final RAG prompt with [CONTEXT] and [QUESTION] tags',
    ],
    starterCode: `import numpy as np
import re, math

np.random.seed(55)

knowledge_base = """
Python supports multiple programming paradigms including procedural and object-oriented styles.
Functions are first-class objects in Python enabling higher-order programming patterns.
List comprehensions provide a concise way to create lists from iterables.
Decorators in Python allow modifying or extending function behaviour without altering their code.
Context managers ensure proper resource management using the with statement.
Generators are memory-efficient iterators that yield values lazily on demand.
Type hints improve code readability and enable static analysis tools.
Python's standard library includes modules for networking, file I/O, and data structures.
"""

def split_sentences(text):
    return [s.strip() for s in re.split(r'(?<=[.!?])\\s+', text.strip()) if s.strip()]

def chunk(sentences, size=3, overlap=1):
    chunks, i = [], 0
    while i < len(sentences):
        chunks.append(" ".join(sentences[i:i+size]))
        i += size - overlap
    return chunks

def embed(text):
    vec = np.random.randn(16)
    for w in re.findall(r'\\b[a-z]{4,}\\b', text.lower()):
        np.random.seed(hash(w) % (2**31))
        vec += 0.4 * np.random.randn(16)
    np.random.seed(55)
    return vec / np.linalg.norm(vec)

# TODO: build chunks from knowledge_base
sentences = split_sentences(knowledge_base)
chunks = None   # call chunk(sentences, ...)

# TODO: embed all chunks → np.array of shape (n_chunks, 16)
chunk_vecs = None

# TODO: implement retrieve(query, k) and call it
def retrieve(query, k=3):
    pass

results = retrieve("how do generators and decorators work in Python", k=3)

# TODO: build the RAG prompt
context_str = "\\n".join(f"- {c}" for _, c in results)
prompt = f"[CONTEXT]\\n{context_str}\\n\\n[QUESTION]\\nHow do generators and decorators work in Python?\\n\\n[ANSWER]"

print(f"Chunks built: {len(chunks)}")
print(f"\\n{prompt}")
`,
    expectedOutput: `Chunks built: 4

[CONTEXT]
- Decorators in Python allow modifying or extending function behaviour without altering their code. Context managers ensure proper resource management using the with statement. Generators are memory-efficient iterators that yield values lazily on demand.
- List comprehensions provide a concise way to create lists from iterables. Decorators in Python allow modifying or extending function behaviour without altering their code. Context managers ensure proper resource management using the with statement.
- Generators are memory-efficient iterators that yield values lazily on demand. Type hints improve code readability and enable static analysis tools. Python's standard library includes modules for networking, file I/O, and data structures.

[QUESTION]
How do generators and decorators work in Python?

[ANSWER]`,
    hints: [
      'chunks = chunk(sentences, size=3, overlap=1)',
      'chunk_vecs = np.array([embed(c) for c in chunks])',
      'retrieve: q = embed(query); sims = chunk_vecs @ q; top = np.argsort(sims)[-k:][::-1]; return [(sims[i], chunks[i]) for i in top]',
    ],
  },

  // ── ai-agents-agentic-workflows ──────────────────────────────────────────────

  'ai-agents-agentic-workflows::Foundations': {
    title: 'Tool Dispatcher',
    language: 'python',
    scenario: 'AI agents work by calling tools. Build a tool registry where functions can be registered and dispatched by name — like an agent\'s toolbox.',
    tasks: [
      'Implement ToolRegistry.register(name, fn, description) to add tools',
      'Implement ToolRegistry.call(name, **kwargs) with error handling for unknown tools',
      'Register 3 tools and call them via the dispatcher',
    ],
    starterCode: `class ToolRegistry:
    def __init__(self):
        self.tools = {}

    def register(self, name, fn, description=""):
        # TODO: store {name: {"fn": fn, "description": description}} in self.tools
        pass

    def call(self, name, **kwargs):
        # TODO: if name not in self.tools, raise ValueError(f"Unknown tool: {name}")
        # TODO: return self.tools[name]["fn"](**kwargs)
        pass

    def list_tools(self):
        return {name: info["description"] for name, info in self.tools.items()}

# Define tools
def calculator(expression):
    return eval(expression)

def word_counter(text):
    return {"words": len(text.split()), "chars": len(text)}

def celsius_to_f(celsius):
    return round(celsius * 9/5 + 32, 1)

# TODO: create registry and register all three tools
registry = ToolRegistry()

print("Available tools:", list(registry.list_tools().keys()))
print("calculator(2**10):", registry.call("calculator", expression="2**10"))
print("word_counter:", registry.call("word_counter", text="Hello world from agents"))
print("celsius_to_f(100):", registry.call("celsius_to_f", celsius=100))

try:
    registry.call("unknown_tool")
except ValueError as e:
    print(f"Error caught: {e}")
`,
    expectedOutput: `Available tools: ['calculator', 'word_counter', 'celsius_to_f']
calculator(2**10): 1024
word_counter: {'words': 4, 'chars': 23}
celsius_to_f(100): 212.0
Error caught: Unknown tool: unknown_tool`,
    hints: [
      'register: self.tools[name] = {"fn": fn, "description": description}',
      'call: if name not in self.tools: raise ValueError(f"Unknown tool: {name}")',
      'registry.register("calculator", calculator, "Evaluates a math expression")',
    ],
  },

  'ai-agents-agentic-workflows::Core Skills': {
    title: 'Conversation Memory Manager',
    language: 'python',
    scenario: 'Agents need memory to stay coherent across turns. Build a memory manager with a sliding window and token budget.',
    tasks: [
      'Implement Memory.add(role, content) appending to conversation history',
      'Implement Memory.get_context(max_tokens) returning the most recent messages that fit',
      'Test that older messages are dropped when the budget is exceeded',
    ],
    starterCode: `import math

def estimate_tokens(text):
    return math.ceil(len(text.split()) * 1.35)

class Memory:
    def __init__(self, system_prompt="You are a helpful assistant."):
        self.system = system_prompt
        self.history = []  # list of {"role": ..., "content": ...}

    def add(self, role, content):
        # TODO: append {"role": role, "content": content} to self.history
        pass

    def get_context(self, max_tokens=200):
        system_tokens = estimate_tokens(self.system)
        budget = max_tokens - system_tokens
        # TODO: iterate history in REVERSE, keep messages while budget allows
        # Each message costs estimate_tokens(msg["content"]) tokens
        # Return [system_msg] + kept messages in CHRONOLOGICAL order
        pass

    def token_count(self):
        return sum(estimate_tokens(m["content"]) for m in self.history)

mem = Memory()
for role, text in [
    ("user",      "What is reinforcement learning?"),
    ("assistant", "Reinforcement learning trains agents by rewarding desired behaviours."),
    ("user",      "Can you give a real-world example?"),
    ("assistant", "Sure — AlphaGo used RL to master the game of Go."),
    ("user",      "What about robotics applications?"),
    ("assistant", "RL is widely used to train robot manipulation and locomotion policies."),
    ("user",      "How does it differ from supervised learning?"),
]:
    mem.add(role, text)

context = mem.get_context(max_tokens=150)
print(f"Total history messages: {len(mem.history)}")
print(f"Context messages returned: {len(context)}")
print(f"\\nContext:")
for m in context:
    print(f"  [{m['role']}]: {m['content'][:70]}")
`,
    expectedOutput: `Total history messages: 7
Context messages returned: 4

Context:
  [system]: You are a helpful assistant.
  [assistant]: RL is widely used to train robot manipulation and locomotion policies.
  [user]: How does it differ from supervised learning?`,
    hints: [
      'Iterate in reverse: for msg in reversed(self.history)',
      'kept = []; for msg in reversed: if budget >= cost: kept.append(msg); budget -= cost',
      'Return [{"role":"system","content":self.system}] + list(reversed(kept))',
    ],
  },

  'ai-agents-agentic-workflows::Applied Practice': {
    title: 'Chain-of-Thought Planner',
    language: 'python',
    scenario: 'Agents reason step-by-step before acting. Build a planner that breaks a goal into sub-steps, validates each step\'s preconditions, and tracks state.',
    tasks: [
      'Implement Planner.add_step(action, preconditions, effects) to define a plan',
      'Implement Planner.execute() running steps whose preconditions are met',
      'Test a 4-step "book a flight" plan with state tracking',
    ],
    starterCode: `class Planner:
    def __init__(self):
        self.steps = []
        self.state = set()   # set of achieved facts
        self.log   = []

    def add_step(self, action, preconditions, effects):
        # TODO: append {"action": action, "pre": preconditions, "effects": effects}
        pass

    def execute(self):
        for step in self.steps:
            # TODO: check all preconditions are in self.state
            pre_met = None  # True/False
            if pre_met:
                # TODO: add effects to self.state
                # TODO: log (action, "SUCCESS")
                pass
            else:
                missing = [p for p in step["pre"] if p not in self.state]
                self.log.append((step["action"], f"BLOCKED — missing: {missing}"))
        return self.log

planner = Planner()
planner.state.add("has_passport")   # initial world state

planner.add_step("search_flights",
    preconditions=["has_passport"],
    effects=["flights_found"])

planner.add_step("select_seat",
    preconditions=["flights_found"],
    effects=["seat_selected"])

planner.add_step("enter_payment",
    preconditions=["seat_selected"],
    effects=["payment_ready"])

planner.add_step("confirm_booking",
    preconditions=["payment_ready", "flights_found"],
    effects=["booking_confirmed"])

log = planner.execute()
print("Execution log:")
for action, status in log:
    icon = "✓" if status == "SUCCESS" else "✗"
    print(f"  {icon} {action}: {status}")
print(f"\\nFinal state: {sorted(planner.state)}")
`,
    expectedOutput: `Execution log:
  ✓ search_flights: SUCCESS
  ✓ select_seat: SUCCESS
  ✓ enter_payment: SUCCESS
  ✓ confirm_booking: SUCCESS

Final state: ['booking_confirmed', 'flights_found', 'has_passport', 'payment_ready', 'seat_selected']`,
    hints: [
      'add_step: self.steps.append({"action": action, "pre": preconditions, "effects": effects})',
      'pre_met = all(p in self.state for p in step["pre"])',
      'If met: self.state.update(step["effects"]); self.log.append((step["action"], "SUCCESS"))',
    ],
  },

  'ai-agents-agentic-workflows::Advanced Topics': {
    title: 'Observe-Think-Act Agent Loop',
    language: 'python',
    scenario: 'The core of any autonomous agent is the observe → think → act loop. Implement it with a mock environment and simple decision policy.',
    tasks: [
      'Implement Agent.observe(env_state) updating the agent\'s belief state',
      'Implement Agent.think() returning an action based on current beliefs',
      'Run the agent for 5 steps in a mock grid environment',
    ],
    starterCode: `import random
random.seed(42)

class GridEnv:
    """Simple 1D grid: agent moves left/right, goal is at position 7."""
    def __init__(self, size=10):
        self.size = size
        self.agent_pos = 0
        self.goal_pos  = 7

    def step(self, action):
        if action == "right": self.agent_pos = min(self.size-1, self.agent_pos+1)
        if action == "left":  self.agent_pos = max(0, self.agent_pos-1)
        done = self.agent_pos == self.goal_pos
        reward = 10.0 if done else -0.1
        return {"position": self.agent_pos, "goal": self.goal_pos, "done": done}, reward

class Agent:
    def __init__(self):
        self.beliefs = {}
        self.steps_taken = 0

    def observe(self, state):
        # TODO: update self.beliefs with the state dict
        pass

    def think(self):
        pos  = self.beliefs.get("position", 0)
        goal = self.beliefs.get("goal", 0)
        # TODO: return "right" if pos < goal, "left" if pos > goal, else "stay"
        pass

    def act(self, env):
        action = self.think()
        new_state, reward = env.step(action)
        self.observe(new_state)
        self.steps_taken += 1
        return action, reward, new_state["done"]

env   = GridEnv()
agent = Agent()
agent.observe({"position": env.agent_pos, "goal": env.goal_pos, "done": False})

print(f"Start position: {env.agent_pos}")
for step in range(1, 9):
    action, reward, done = agent.act(env)
    print(f"  Step {step}: {action:5s} → pos={env.agent_pos}  reward={reward}")
    if done:
        print(f"  Goal reached in {agent.steps_taken} steps!")
        break
`,
    expectedOutput: `Start position: 0
  Step 1: right → pos=1  reward=-0.1
  Step 2: right → pos=2  reward=-0.1
  Step 3: right → pos=3  reward=-0.1
  Step 4: right → pos=4  reward=-0.1
  Step 5: right → pos=5  reward=-0.1
  Step 6: right → pos=6  reward=-0.1
  Step 7: right → pos=7  reward=10.0
  Goal reached in 7 steps!`,
    hints: [
      'observe: self.beliefs.update(state)',
      'think: if pos < goal return "right"; elif pos > goal return "left"; else return "stay"',
    ],
  },

  'ai-agents-agentic-workflows::Production & Scale': {
    title: 'Resilient Agent with Error Recovery',
    language: 'python',
    scenario: 'Production agents fail unpredictably. Build an agent wrapper with automatic error recovery, retry budgets, and a fallback policy.',
    tasks: [
      'Implement ResilientAgent.run_step() wrapping tool calls with try/except',
      'On failure, retry up to max_retries with exponential backoff',
      'After exhausting retries, invoke the fallback action',
    ],
    starterCode: `import random, time

random.seed(0)

# A flaky tool that fails 60% of the time
def flaky_tool(query):
    if random.random() < 0.6:
        raise RuntimeError("Tool unavailable (transient error)")
    return f"Result for: {query}"

def fallback_tool(query):
    return f"[FALLBACK] Cached result for: {query}"

class ResilientAgent:
    def __init__(self, primary, fallback, max_retries=3, base_delay=0.05):
        self.primary    = primary
        self.fallback   = fallback
        self.max_retries = max_retries
        self.base_delay  = base_delay
        self.stats = {"success": 0, "retried": 0, "fallback": 0}

    def run_step(self, query):
        for attempt in range(self.max_retries + 1):
            try:
                # TODO: call self.primary(query) and return result
                # TODO: increment self.stats["success"]
                pass
            except Exception as e:
                if attempt < self.max_retries:
                    delay = self.base_delay * (2 ** attempt)
                    # TODO: increment self.stats["retried"] and sleep
                    pass
                else:
                    # TODO: increment self.stats["fallback"] and return self.fallback(query)
                    pass

agent = ResilientAgent(flaky_tool, fallback_tool)

queries = ["What is an agent?", "Explain tool use", "Define memory", "What is planning?"]
for q in queries:
    result = agent.run_step(q)
    print(f"Q: {q[:25]:<25} → {result[:45]}")

print(f"\\nStats: {agent.stats}")
`,
    expectedOutput: `Q: What is an agent?       → Result for: What is an agent?
Q: Explain tool use        → [FALLBACK] Cached result for: Explain tool use
Q: Define memory           → Result for: Define memory
Q: What is planning?       → Result for: What is planning?

Stats: {'success': 3, 'retried': 4, 'fallback': 1}`,
    hints: [
      'try: result = self.primary(query); self.stats["success"] += 1; return result',
      'on retry: self.stats["retried"] += 1; time.sleep(delay)',
      'on fallback: self.stats["fallback"] += 1; return self.fallback(query)',
    ],
  },

  'ai-agents-agentic-workflows::Mastery & Capstone': {
    title: 'Multi-Agent Workflow',
    language: 'python',
    scenario: 'Complex tasks benefit from specialised agents working together. Build a two-agent pipeline where a Researcher gathers facts and a Writer formats the report.',
    tasks: [
      'Implement ResearcherAgent.research(topic) returning a list of bullet-point facts',
      'Implement WriterAgent.write(topic, facts) returning a formatted markdown report',
      'Orchestrate both agents and print the final report',
    ],
    starterCode: `class ResearcherAgent:
    """Gathers structured facts about a topic."""
    KB = {
        "transformers": [
            "Introduced in 'Attention Is All You Need' (Vaswani et al., 2017)",
            "Replace RNNs with self-attention for parallelisable sequence modelling",
            "Form the backbone of BERT, GPT, T5, and most modern LLMs",
            "Scale efficiently: larger models consistently improve performance",
        ],
        "rag": [
            "Combines a retriever and a generator in one pipeline",
            "Reduces hallucination by grounding responses in retrieved documents",
            "Does not require retraining the base LLM for new knowledge",
            "Retrieval quality directly determines generation quality",
        ],
    }

    def research(self, topic):
        key = topic.lower().replace(" ", "_").replace("-", "_")
        for k in self.KB:
            if k in key or key in k:
                return self.KB[k]
        return [f"No specific facts found for '{topic}'"]

class WriterAgent:
    """Turns research facts into a formatted markdown report."""

    def write(self, topic, facts):
        # TODO: return a string:
        # "# {topic}\n\n## Key Facts\n\n" followed by each fact as "- {fact}\n"
        # end with "\n---\n_Report generated by WriterAgent_"
        pass

class Orchestrator:
    def __init__(self):
        self.researcher = ResearcherAgent()
        self.writer     = WriterAgent()

    def run(self, topic):
        print(f"[Orchestrator] Task: research and report on '{topic}'")
        # TODO: call researcher.research(topic) → facts
        # TODO: call writer.write(topic, facts) → report
        # TODO: print the report
        pass

orch = Orchestrator()
orch.run("Transformers")
`,
    expectedOutput: `[Orchestrator] Task: research and report on 'Transformers'
# Transformers

## Key Facts

- Introduced in 'Attention Is All You Need' (Vaswani et al., 2017)
- Replace RNNs with self-attention for parallelisable sequence modelling
- Form the backbone of BERT, GPT, T5, and most modern LLMs
- Scale efficiently: larger models consistently improve performance

---
_Report generated by WriterAgent_`,
    hints: [
      'write: start = f"# {topic}\\n\\n## Key Facts\\n\\n"; bullets = "".join(f"- {f}\\n" for f in facts)',
      'return start + bullets + "\\n---\\n_Report generated by WriterAgent_"',
      'orchestrate: facts = self.researcher.research(topic); report = self.writer.write(topic, facts); print(report)',
    ],
  },
}

export function getModuleChallenge(topicSlug: string, moduleTitle: string): ModuleChallenge | null {
  return C[`${topicSlug}::${moduleTitle}`] ?? null
}
