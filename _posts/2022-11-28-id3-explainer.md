---
layout: article
title: "ID3 Explainer: A Guided Implementation in Python"
description: ""
date: 2022-03-25
excerpt: >-
  Click to add points, export as code.
categories: blog
tags: ["machine-learning"]
comments: true
image:
  teaser: teaser/create_ml_datasets_teaser.jpg
---

Medical knowledge and medical datasets tend to favor categorical attributes. If we hope to develop models that align with, or can be augmented by human knowledge, it is often helpful to work with a representation that favors the categorical encoding.

ID3 (Iterative Dichotomizer 3) is an early example of a supervised learning algorithm that induces a decision tree with categorical splits. It is used to generate a predictive model based on a dataset consisting of categorical variables. ID3 works by iteratively selecting the attribute that best classifies the data at each node in the tree. It does this by using information gain, which is a measure of the quality of an attribute for making decisions, as the criteria for selecting an attribute.

This post aims to be a one-stop-shop for the theory and practical challenge of implementing ID3 and similar approaches. So this will also touch on: (1) data management, (2) object-oriented design, (3) recursive data structures with recursive methods defined on them, and (4) functions as Python classes.

Everything shown here is designed to be compatible with Python 3.7.15 and `numpy==1.21.6` (since those were the default versions shipped in Google Colab at the time of writing). All code should work with future versions barring unexpected backwards-incompatible-API-changes.

## What does our data look like?

Let's start with some assumptions.

- We are given a dataset in the form of a .csv file where each row refers to an object and each column refers to an attribute of that object
- Each column contains categorical values (e.g. 'a', 'b', 'c')
- One column contains a binary target class (e.g. 'yes', 'no')

In Tom M. Mitchell's classic 1997 book "Machine Learning," he references a dataset about playing tennis on Saturdays:

```python
PlayTennis,Outlook,Temperature,Humidity,Wind
no,sunny,hot,high,weak
no,sunny,hot,high,strong
yes,overcast,hot,high,weak
yes,rain,mild,high,weak
yes,rain,cool,normal,weak
no,rain,cool,normal,strong
yes,overcast,cool,normal,strong
no,sunny,mild,high,weak
yes,sunny,cool,normal,weak
yes,rain,mild,normal,weak
yes,sunny,mild,normal,strong
yes,overcast,mild,high,strong
yes,overcast,hot,normal,weak
no,rain,mild,high,strong
```

This checks all of our boxes: the zeroth "PlayTennis" column is a binary target variable, and the remaining columns contain categorical observations like *sunny*, *overcast*, or *rain*.

Let's enforce some of these as type constraints in our implementation. When loading data, we read from a file, and expect a `numpy` array containing string data:

```python
import numpy as np
import numpy.typing as npt

def load_data(file_name: str, skiprows: int = 0) -> npt.NDArray[np.str_]:
  return np.loadtxt(file_name, delimiter=",", skiprows=skiprows, dtype=np.str_)
```

This `load_data` function is a small wrapper around the built-in `numpy.loadtxt` method where we've annotated the return type to be an array of numpy strings.[^ndarray-str-output]

[^ndarray-str-output]: Here I wrote all the code to be compatible with Python 3.7.15 and `numpy==1.21.6`, since those were the versions that Google Colab was shipping in their notebooks. The return types are not defined narrowly enough for type checkers like `mypy` to prove that `loadtxt` returns an array of `dtype=np.str_` here. I'm hopeful that future versions of `numpy` and Python will make it easier to enforce this.

The `skiprows` parameter is helpful to pass along to `np.loadtxt` since we want to distinguish between column names (PlayTennis, Outlook, Temperature, Humidity, Wind) and the values that those columns take:

```python
>>> load_data("toy_decision.csv", skiprows=1)
array([['no', 'sunny', 'hot', 'high', 'weak'],
       ['no', 'sunny', 'hot', 'high', 'strong'],
       ['yes', 'overcast', 'hot', 'high', 'weak'],
        ...
       ['yes', 'overcast', 'mild', 'high', 'strong'],
       ['yes', 'overcast', 'hot', 'normal', 'weak'],
       ['no', 'rain', 'mild', 'high', 'strong']], dtype='<U8')
```

## Trees: Our Recursive Data Structures

We now know what our data looks like. But before we try to implement a machine learning algorithm, we should think through the data structures that it needs to operate on.

Trees are an example of a recursive data structure, where:

- A tree is made up of Nodes
- Each Node represents a column index from a data matrix, the set of values that column takes, and may have a set of branches that lead deeper into the tree
- A special kind of Node is a Leaf. A Leaf has no further branches, and usually represents a pure sample, or the mode of the sample

Since we've described Node and Leaf as special cases of a more general structure, let's start with a base class:

```python
from typing import List, Callable, Optional, Union
import numpy as np
import numpy.typing as npt

class BaseTree:
  def __init__(self) -> None:
    self.index: int = -1
    self.conditions: List[np.str_] = []
    self.branches: List[BaseTree] = []
```

```diff
 class BaseTree:
   def __init__(self) -> None:
     self.index: int = -1
     self.conditions: List[np.str_] = []
-    self.branches: List[BaseTree] = []
+    self.branches: List[Union[Node, Leaf]] = []
```


Every programming problem involves some assumptions. Here we've encoded an index as an integer with a default value of -1, which will represent that the index has not been set.

The types we defined on self.branches already hints that we want two special kinds of this called Node and Leaf:

```python
class Leaf(BaseTree):
  def __init__(self, mode: np.str_) -> None:
    super().__init__()
    self.mode = mode

class Node(BaseTree):
  # Node contains no additional information (yet).
  pass
```

### What's so useful about the recursive part?

Later we are going to define the ID3 algorithm recursively, so we should get some practice thinking about

Trees are frequently quantified by their height, the number of nodes they contain, and the number of leaves that they contain.

The branches are lists containing Node or Leaf. Each of these statistics can be written as a generator expression. If we do not observe anything inside the branches, we are at a Leaf and can return 1, otherwise we return the sum of the branches:

```python
class BaseTree:
  # ...
  def count_leaves(self) -> int:
    if not self.branches:
      return 1
    return sum(b.count_leaves() for b in self.branches)
```

Counting the number of Nodes is similar, but we also have to count all the intermediate entries (+1) on our journey to counting the leaves:

```python
class BaseTree:
  # ...
  def count_nodes(self) -> int:
    if not self.branches:
      return 1
    return 1 + sum(b.count_nodes() for b in self.branches)
```

### "*A Tree is a Function*"

For fun, let's also implement an idea that I picked up from PyTorch. A tree (as we've defined it) is a function $$y = f(X)$$ where the target $$y$$ can be mapped one-to-one with a binary outcome $$y \in \lbrace 0, 1 \rbrace$$ and $$X$$ is a vector.

We'll start with the simplest case: a Leaf. A Leaf is a function where—regardless of the input—the Leaf returns its mode:

```python
>>> import numpy as np
>>> leaf = Leaf(np.str_("0"))
>>> example = np.array(["a", "b", "c"])
>>> leaf()(example)
'0'
```

We will enforce this by implementing the `__call__` method on our Leaf object, and enforce that it returns a Callable expecting a string array, and returning a special string we refer to as the “mode.”

```python
class Leaf(BaseTree):
  # ...
  def __call__(self) -> Callable[[npt.NDArray[np.str_]], np.str_]:
    return lambda _: self.mode
```

> 🤔 Wait, what's with the `leaf()(example)` syntax? Why do we return a lambda function? Wouldn't it be easier to say `leaf(example)`?

That would work too! There tend not to be strict right or wrong answers when designing an API. Here I've chosen the `Leaf()(e)` syntax for two reasons. (1) As we'll see momentarily, the call syntax can be equivalent for nodes and leaves. (2) The syntax distinguishes between the parameters of the Leaf itself, and the data it is applied to. This also invites us to speculate about fun future extensions: like explicitly modeling our leaves as probability distributions, where invoking the expression: `Leaf(probabilistic=True)(e)` has different semantics.

If Leaf takes an array as input but ignores it and returns the mode, so what does a Node do?

The way we designed our Leaf should hint at part of the solution—Node and Leaf together represent a tree-structured function of if/then rules. Therefore the call signature should look similar, but instead of returning a value, we return something conditioned on the input data we receive:

```python
>>> import numpy as np
>>> node = Node()
>>> example = np.array(["a"])
>>> node()(example)
# ??? What should this do?
```

Let's look at a simple example and think through what should happen:

![](/images/blog/id3-explainer/two-split-y-n-tree.png)

In this example we have a tree rooted at a Node that includes two conditions: a and b and two pointers to Leaf objects.

When we call a node with a new example: `node()(example)`, we need to (1) find which branch the value at the node's index corresponds to, then (2) follow that branch.

Notice that we return `subtree()(example)`. This means that if subtree is a Node, the call will progress further down the tree until it reaches a Leaf—where it will return the mode encountered at the leaf:

```python
class Node(BaseTree):
  # ...
  def __call__(self):

    def _call(example: npt.NDArray[np.str_]):
      for cond, subtree in zip(self.conditions, self.branches):
        if example[self.index] == cond:
          return subtree()(example)
      raise ValueError(f"Found unknown value: {cond}, at index: {self.index}.")

    return lambda example: _call(example)
```

### Implementing the remaining methods

In theory we now have everything we need to: (1) create trees, and (2) apply them to new data. But there are a few operations that we should implement now since they will make things easier for us later. Specifically, we're missing (3) a way to access/update values in the branches, and (4) create new branches off a node based on conditions we encounter.

```python
class BaseTree:
  # ...
  def __getitem__(self, i: int):
    return self.branches[i]

  def __setitem__(self, i: int, value: Union["Node", "Leaf"]):
    self.branches[i] = value

  def __call__(self):
    raise NotImplementedError("Cannot call a raw BaseTree.")
```

And in:

```python
class Leaf(BaseTree):
  # ...
  def __repr__(self) -> str:
    return f"Leaf({self.mode})"
```

And finally:

```python
class Node(BaseTree):
  # ...
  def __repr__(self) -> str:
    return f"Node({self.index}, {self.branches})"

  def extend(self, index: int, *conditions: np.str_):
    """Extend the node with a variable's index and
    the values the variable can conditionally take."""
    self.index = index
    for cond in conditions:
      self.branches.append(cond)
      self.branches.append(Node())
    return self
```

We've defined all the pieces we need to create categorical decision trees. It's tedious, but using the methods we've defined gives us enough to write out decision trees by hand.

The simple tree we used to motivate the call implementation on nodes can be written like this:

```python
from numpy import str_
import numpy as np

tree = Node()
tree.extend(0, str_('a'), str_('b'))
tree[0] = Leaf(str_('y'))
tree[1] = Leaf(str_('n'))

# Apply to new data:
for e in np.array([['a'], ['b']]):
    print(f"input = {e}, output = {tree()(e)}")
```

Output:

```haskell
input = ['a'], output = y
input = ['b'], output = n
```

![](/images/blog/id3-explainer/xor-classifier.png)

And here is an implementation of the XOR function:

```python
# Initialize a tree.
tree = Node()

# Extend the root at index 0
tree.extend(0, str_(0), str_(1))

# Extend the two branches with index 1
tree[0].extend(1, str_(0), str_(1))
tree[1].extend(1, str_(0), str_(1))

# Replace all extended Nodes with Leafs
tree[0][0] = Leaf(str_(0))
tree[0][1] = Leaf(str_(1))
tree[1][0] = Leaf(str_(1))
tree[1][1] = Leaf(str_(0))

# Apply our tree function to a dataset:

X = np.array([['0', '0'], ['0', '1'], ['1', '0'], ['1', '1']])

for e in X:
    print(f"input = {e}, output = {tree()(e)}")
```

Output:

```haskell
input = ['0' '0'], output = 0
input = ['0' '1'], output = 1
input = ['1' '0'], output = 1
input = ['1' '1'], output = 0
```

Here's an easy-to-copy-and-paste-version if you've reached this point. Typing is optional in Python, but is written to be compatible with Python 3.7+

<details>
<summary>View full listing for tree data structures (75 lines of code)</summary>

{% highlight python linenos %}
# Copyright © 2022 Alexander L. Hayes

# Dual-Licensed under the terms of the
# MIT License or the Apache 2.0 License,
# at your choosing.

from typing import List, Callable, Optional, Union
import numpy as np
import numpy.typing as npt


class BaseTree:
    def __init__(self) -> None:
        self.index: int = -1
        self.conditions: List[np.str_] = []
        self.branches: List[Union[Node, Leaf]] = []

    def __getitem__(self, i: int):
        return self.branches[i]

    def __setitem__(self, i: int, value: Union["Node", "Leaf"]):
        self.branches[i] = value

    def __call__(self):
        raise NotImplementedError("Cannot call a raw BaseTree.")

    def get_height(self) -> int:
        if not self.branches:
            return 1
        return 1 + max(b.get_height() for b in self.branches)

    def count_nodes(self) -> int:
        if not self.branches:
            return 1
        return 1 + sum(b.count_nodes() for b in self.branches)

    def count_leaves(self) -> int:
        if not self.branches:
            return 1
        return sum(b.count_leaves() for b in self.branches)


class Leaf(BaseTree):
    def __init__(self, mode: np.str_) -> None:
        super().__init__()
        self.mode = mode

    def __repr__(self) -> str:
        return f"Leaf({self.mode})"

    def __call__(self) -> Callable[[npt.NDArray[np.str_]], np.str_]:
        return lambda _: self.mode


class Node(BaseTree):

    def __repr__(self):
        return f"Node({self.index}, {self.branches})"

    def extend(self, index: int, *conditions: np.str_):
        """Extend the node with a variable's index and conditions the variable can take."""
        self.index = index
        for cond in conditions:
            self.conditions.append(cond)
            self.branches.append(Node())
        return self

    def __call__(self):
        def _call(example: npt.NDArray[np.str_]):
            for cond, subtree in zip(self.conditions, self.branches):
                if example[self.index] == cond:
                    return subtree()(example)
            raise ValueError("Incorrect value in node.")

        return lambda example: _call(example)
{% endhighlight %}

</details>

---

## Learning Categorical Decision Trees

We've defined types

ID3 chooses a best split using the information gain criteria. This can also be thought of as maximizing the (expected) reduction in entropy: splitting on the attribute that produces the maximum gain. Information gain is computed as the difference between the original (parent) entropy and the weighted average of the child entropy (after the split).

This is usually written as:

$$Entropy(S) = \sum_{i=1}^{c} -p_{i} \log_{2}(p_{i})$$

Or in Python as:

```python
from math import log

def entropy(pos: int, neg: int) -> float:
  """Compute binary entropy."""
  if (not pos) or (not neg):
    return 0.0
  total = pos + neg
  left = pos / total
  right = neg / total
  return -1.0 * left * log(left, 2) - right * log(right, 2)
```

We also need to know the mode of a vector:

```python
def mode(vector: npt.NDArray[np.str_]) -> np.str_:
  values, counts = np.unique(vector, return_counts=True)
  idx = np.argmax(counts)
  return values[idx]
```

And finally, we'll use accuracy as a simple metric to evaluate whether our implementation learns something useful.

```python
def accuracy_score(y_true, y_pred) -> float:
  if len(y_true) != len(y_pred):
    raise ValueError("accuracy_score is only applicable on equal-sized arrays.")
  return np.sum(np.equal(y_true, y_pred)) / len(y_true)
```

## Interpreting the ID3 Pseudocode

Tom Mitchell describes ID3 as:

{% highlight markdown linenos %}
ID3(Examples, Target_attribute, Attributes)
  • Create a Root node for the tree.
  • If all Examples are positive, Return the single-node tree Root, with label = +
  • If all Examples are negative, Return the single-node tree Root, with label = -
  • If Attributes is empty, Return the single-node tree Root, with label = most common value of
    Target_attribute in Examples.
  • Otherwise Begin
      • A ← the attribute from Attributes that "best" classifies Examples
      • The decision attribute for Root ← A
      • For each possible value, vᵢ, of A,
          • Add a new tree branch below Root, corresponding to the test A = vᵢ
          • Let Examplesᵥᵢ be the subset of Examples that have the value vᵢ for A
          • If Examplesᵥᵢ is empty
            • Then below this new branch add a leaf node with label = most common
              value of Target_attribute in examples
            • Else below this new branch add the subtree
              ID3(Examplesᵥᵢ, Target_attribute, Attributes - {A})
  • End
  • Return Root
{% endhighlight %}

We can

```python
from typing import Counter, List, Union
import numpy as np
import numpy.typing as npt
from tree import Node, Leaf       # ← `tree.py` contains previous implementation


def _recursive_ID3(
    X: npt.NDArray[np.str_],      # ← Data matrix
    y: npt.NDArray[np.str_],      # ← Label vector
    target: np.str_,              # ← Binary target
    attrs: List[int],             # ← List of integer indexes
    tree_pointer: Node,           # ← Pointer to a Node object to modify
    max_height: int = 10,         # ← Constraint on how big the tree can grow
) -> Union[Node, Leaf]:
  # ...
```

Lines 3-6 in the pseudocode form the base cases in our recursive implementation. If the list of possible attributes to split on is exhausted: we halt. If the every example is positive or negative: we halt.

We can simplify this logic and incorporate our constraint to optionally grow the tree to a fixed height:

```python
    # ...
    if max_height - 1 == 0 or not attrs:
        return Leaf(mode(y))

    elif np.all(y == y[0]):
        return Leaf(y[0])

    else:
      # ...
```

This re-orders the conditions in the pseudocode for a small potential gain in efficiency. Checking `max_height - 1 == 0` and `not attrs` should be *constant* operations—they only require math operations or checking the length attribute of a list. Checking whether the label vector contains a pure sample, `np.all(y == y[0])` is a *linear* operation—it requires checking whether every element in the vector is equal to the first element.[^does-branch-reordering-matter]

[^does-branch-reordering-matter]: Does this re-ordering trick matter? In theory: no. Even when the constant-time branch is true, we still need to compute the mode of the label vector, which is another linear operation. In practice: we could see *tiny* performance improvements on some datasets where we only have to evaluate one linear operation instead of two.

Line 8 in the pseudocode tells us to "*Bind A to the attribute from Attribute that 'best' classifies Examples.*" This is a little deceptive—it's easy to state, but this sentence accounts for about 99% of run time in decision tree induction: *finding a good split*.

Let's first look at the implementation, then work through the *how* question:

```python
        # ...
        cls0: npt.NDArray[np.str_] = X[np.nonzero(y == target)]
        cls1: npt.NDArray[np.str_] = X[np.nonzero(y != target)]

        current_entropy = entropy(cls0.shape[0], cls1.shape[0])

        best_attr = np.zeros(len(attrs))

        for i, v in enumerate(attrs):
            cls0_counts: Counter[np.str_] = Counter(cls0[:, v])
            cls1_counts: Counter[np.str_] = Counter(cls1[:, v])
            sum_over_v = current_entropy

            for a in cls0_counts.keys() | cls1_counts.keys():
                attr0_counts = cls0_counts[a]
                attr1_counts = cls1_counts[a]
                s_ratio = (attr0_counts + attr1_counts) / (
                    cls0.shape[0] + cls1.shape[0]
                )
                sum_over_v -= s_ratio * entropy(attr0_counts, attr1_counts)

            best_attr[i] = sum_over_v

        best_split = attrs[np.argmax(best_attr)]
        # ...
```

This implements *information gain*, or the expected reduction in entropy:

$$Gain(S, A) = Entropy(S)~~- \sum_{v \in Values(A)} \frac{|S_{V}|}{|S|} Entropy(S_{v})$$

Use our implementation of `entropy(pos, neg)`.

All that remains is to use our split to extend the tree. Lines 10-17 in the pseudocode can also be simplified:

```diff
      • For each possible value, vᵢ, of A,
          • Add a new tree branch below Root, corresponding to the test A = vᵢ
          • Let Examplesᵥᵢ be the subset of Examples that have the value vᵢ for A
-         • If Examplesᵥᵢ is empty
-           • Then below this new branch add a leaf node with label = most common
-             value of Target_attribute in examples
-           • Else below this new branch add the subtree
              ID3(Examplesᵥᵢ, Target_attribute, Attributes - {A})

```

In

```python
        # ...
        tree_pointer.extend(best_split, *np.unique(X[:, best_split]).tolist())

        # Split and make recursive calls over the next set of branches.
        for i, (cond, subtree) in enumerate(
            zip(tree_pointer.conditions, tree_pointer.branches)
        ):
            idx = np.nonzero(X[:, best_split] == cond)

            tree_pointer[i] = _recursive_ID3(
                X[idx],
                y[idx],
                target,
                [a for a in attrs if a != best_split],
                subtree,
                max_height=max_height - 1,
            )

        return tree_pointer
```

## Wrapping our implementation with a scikit-learn-style API

The recursive implementation is *useable*, but we could design something far more convenient for our end users.[^or-ourselves] Some of the parameters are necessary for the recursive step, but could just as easily be determined at runtime.

[^or-ourselves]: Or ourselves! Just because we've gone through the all of the steps to implement something does not mean we have to mess with the gory details every time. We can simultaneously understand the details and recognize that abstraction is extremely useful.

```diff
 def _recursive_ID3(
     X: npt.NDArray[np.str_],
     y: npt.NDArray[np.str_],
-    target: np.str_,
-    attrs: List[int],
-    tree_pointer: Node,
     max_height: int = 10,
 ) -> Union[Node, Leaf]:
```

Three of these attributes are a bit redundant:

- Since we've focused on binary classification, the `target` does not really matter: the splits will be the same regardless of what we choose (so long as it is valid and actually occurs in the label vector).
- The `attrs` is a list of integers from `0` to `T` with a length that depends on the number of columns in the data matrix `X`.
- The `tree_pointer` should be initialized with an empty tree which is expanded upon in each recursive call. Line 2 from the pseudocode states this as "*Create a Root node for the tree.*"

The `scikit-learn` interface describes models with parameters that can be fit `fit(X, y)` or queried for what they would expect given new data `predict(X)`. The `fit(X, y)` step will use our `_recursive_id3` implementation. `predict(X)` makes use of the "*trees as function*" interpretation we created earlier: we can call the tree on each example in the new dataset: `[self.tree()(x) for x in X]`.

```python
class ID3Classifier:
    def __init__(self, max_height: int = 10):
        self.max_height = max_height
        self._is_fit: bool = False
        self._tree: Union[Node, Leaf] = Node()

    def __repr__(self):
        return repr(self._tree)

    def fit(self, X: npt.NDArray[np.str_], y: npt.NDArray[np.str_]):
        self._tree = _recursive_ID3(
            X,
            y,
            y[0],
            list(range(X.shape[1])),
            Node(),
            self.max_height,
        )
        self._is_fit = True
        return self

    def predict(self, X: npt.NDArray[np.str_]):
        if not self._is_fit:
            raise ValueError("Must call .fit() before .predict()")
        return np.array([self._tree()(x) for x in X])
```

## Using it

```python
X = np.array([['0', '0'], ['0', '1'], ['1', '0'], ['1', '1']])
y = np.array(['0', '1', '1', '0'])

clf = ID3Classifier(max_height=3)
print(clf.fit(X, y))
print(clf.predict(X))
```

```console
Node(0, [Node(1, [Leaf(0), Leaf(1)]), Node(1, [Leaf(1), Leaf(0)])])
['0' '1' '1' '0']
```

```python
data = load_data("toy_decision.csv", skiprows=1)

X, y = data[:, 1:], data[:, 0]

clf = ID3Classifier().fit(X, y)

print(clf)
```

```python
data = load_data("breast-cancer.data")

X, y = data[:, 1:], data[:, 0]

clf = ID3Classifier().fit(X, y)

print(clf)
```

## Conclusion and Exercises

This is a good place to wrap up. There are quite a few extensions that are possible from here. There are quite a few ways this could be extended:

1. **Probabilistic Leaves**: Implement the probabilistic approach mentioned earlier: where the `Leaf` objects contain a distribution over the labels. Then use this to implement a `predict_proba(X)` method on the `ID3Classifier` object.
2. **Splitting Criteria**: Implement another splitting criteria. Examples could include *Gini Impurity* or a *Random Split* that occasionally chooses randomly.
3. **Inspection and Visualization**: Write a function `export_digraph()` that takes a decision tree as input, and returns a [Graphviz](https://graphviz.org/) representation of the tree for easier inspection.
4. **Missing Values**: Inspect the `breast-cancer.data` file, and notice that some variables (features 5 and 8) contain the value: `?`. This symbol indicates that a value was not recorded for some participants. The implementation up to this point is a "*missing as a feature*" approach, where missing data is treated as part of the data. Implement one of the following, and compare results:
  - *Imputation*: Replace missing values in a column with the mode.
  - *Missing with Default Directions*: Read Section 3.4 of [*XGBoost: A Scalable Tree Boosting System*](https://doi.org/10.1145/2939672.2939785).
5. **Default Values and Inference Robustness**: The ID3 implementation shown here is not particularly robust. Observe what happens if a learned decision tree is applied on a dataset containing a value for a variable *not seen at learning time*. Modify the tree data structure to include a `default_value` that can be returned instead of raising a `ValueError`, and modify the ID3 learner to set this value using the mode of the `y` vector.
6. **Numeric Splits**: ID3 was mostly superceded by algorihms that could handle both categorical and numeric features. Modify the functions to handle integer or floating-point arrays, a method to mark categorical/numeric columns, and a `>=` split.
7. **Randomized Trees**: Read Geurts et al. 2006, [*Extremely randomized trees*](https://doi.org/10.1007/s10994-006-6226-1) and the implementation of the [`ExtraTreesClassifier`](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.ExtraTreesClassifier.html) ensemble approach in scikit-learn. Implement a version of this.
8. **Categorical Data Structures**: Read the "*Implementation details*" section of the Julia [CategoricalArrays.jl](https://categoricalarrays.juliadata.org/stable/implementation/) package. Implement a data structure that takes an array of strings `npt.NDArray[np.str_]` as input, converts it to an array of integers `npt.NDArray[int]`, and stores information about the range of possible values that can be present in each column. Modify the split-finding procedure in `_recursive_ID3` to use this information. Can you think of a situation where this approach could be *more robust* when compared against computing the union over keys? (*Hint 1*: What happens to your data as the algorithm creates splits? How did Exercise 5 handle this?)
9. **Model Compilation**: Read about [Treelite](https://treelite.readthedocs.io/en/latest/index.html) and its [ModelBuilder](https://treelite.readthedocs.io/en/latest/tutorials/builder.html) class. Use Treelite to compile your trees, **or** write a function `export_code(tree)` that takes a tree as input and produces C/Python code.
