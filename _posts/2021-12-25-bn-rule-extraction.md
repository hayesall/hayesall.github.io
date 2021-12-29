---
layout: article
title: "Extracting Interpretable Rules from Bayesian Networks in Python"
description:
date: 2021-12-28
excerpt: WIP
categories: blog
tags: ["machine-learning"]
comments: true
image:
  teaser: teaser/kmeans_teaser.png
  feature: feature/kmeans_feature.png
---

## Some prerequisites

I'll assume that you know a little about
Bayesian networks and factorized probability
distributions.[^1]

[^1]: If I do have some extra commentary to provide, I'll add them in the footnotes, like this.

Gopalakrishnan 2010 described an algorithm
for learning logical rules based on a
modified version of the K2 structure
learning algorithm. With ten years of
hindsight available to me, it

$$ \tag{1} P(D \mid M) = \prod_{i=1}^{n} \prod_{j=1}^{q_{i}} \frac{(r_{i} - 1)!}{(N_{ij} + r_{i} - 1)!} \prod_{k=1}^{r_{i}} N_{ijk}! $$

Given that you know a little about Bayesian networks, you're surely
aware that the inference schemes on top of them can get quite
complicated.[^3]

[^3]: How complicated? The last author on this paper, Gregory F. Cooper, proved that exact inference is NP-hard for general Bayesian networks. See: "*The computational complexity of probabilistic inference using bayesian belief networks*," [https://doi.org/10.1016/0004-3702(90)90060-D](https://doi.org/10.1016/0004-3702(90)90060-D)

## Interpreting the algorithm in the paper

Gopalakrishnan et al. developed the "Bayesian Rule Learning" (BRL)
algorithm in two parts.

Page 3 had the first part, which handled searching for a Bayesian network
structure (lines 1-9 in the BRL listing). This removes some of the
details, but the main idea is that it does a local beam search over the
user-provided variable order and continues making local changes to the
network structure so long as the likelihood score keeps improving and the
"max number of parents" constraint is not violated.

Here is a rough transcription I made of the algorithm into a Julia-esque
syntax:

```julia
while (!isempty(B) && A ⊂ V)
  M = max(B.score)                # Highest scoring model removed from B
  X = V - {parents(M) ∪ A}        # Xᵢ not in 𝑀 or 𝐴

  score_improves = false

  if (!isempty(X) && size(parents(M) < MAX_CONJS))
    for Xᵢ in X
      Mₙ = add_parent(M, Xᵢ, T)    # Add Xᵢ as a parent of T in M

      if score(Mₙ, D) > score(M, D)
        add(M, B)
        score_improves = true
      end
    end
  end

  if !score_improves
    add(M, F)                       # Place 𝑀 on 𝐹
    A = A ∪ {Xᵢ for Xᵢ in M}
  end
end
```

Line 10 appears to occur independently of the rest of the listing.
It removes a model from the priority queue $$\mathit{F}$$ and uses the
joint distribution over the variables to create IF/THEN rules.

```julia
model = first(F)                    # First model removed from priority queue 𝐹
for Xᵢ ∈ model
  for j ∈ Xᵢ                        # Each joint state of values
    for k ∈ T
      CF(R[j][k])
    end
    s = argmaxₖ(maxⱼ(CF(R[j][k])))
    @show "IF ($Xᵢ = $j) THEN ($T = $s); $(CF(R[j][s]))"
  end
end
```

The sum of these two parts is the "Bayesian Rule Learning" algorithm.
But thinking a bit more generally, this consists of one part for
"structure learning" and another part for "rule extraction." I have
ten years of hindsight available to me, so this immediately reminded
me of a now-familiar pattern from the *machine learning explainability*
literature: where someone applies post-processing to a blackbox
classifier/regressor and uses the resulting rules to explain what is
happening in the complicated model.[^5]

[^5]: Christoph Molnar's "[Interpretable Machine Learning](https://christophm.github.io/interpretable-ml-book/)" book (and others) tend to distinguish between inherently interpretable models and post-processing to explain an uninterpretable model. The chapter on "Decision Rules" and "Bayesian Rule Lists" have some overlap with what I'm discussing here.

An alternative interpretation for this part shows up in figure 3,
where the `CF` is the likelihood ratio for one outcome versus another.

For example, if you have the following two-variable model with CPTs:

<div class="row">
  <div class="column">
    <p>
      $$
      \begin{split}
      P(X = x_1) = 0.7 \cr
      P(X = x_2) = 0.3 \cr\cr

      P(T = t \mid X = x_1) = 0.8 \cr
      P(T = f \mid X = x_1) = 0.2 \cr
      P(T = t \mid X = x_2) = 0.4 \cr
      P(T = f \mid X = x_2) = 0.6
      \end{split}
      $$
    </p>
  </div>
  <div class="column">
    <img src="/images/blog/bn-rule-extraction/simple-model.svg">
  </div>
</div>

Then the "rule extraction" portion of the algorithm produces

```diff
+ IF (X = x₁) THEN T = t
+   CF = 4
- IF (X = x₁) THEN T = f
-   CF = 0.25
- IF (X = X₂) THEN T = t
-   CF = 0.67
+ IF (X = x₂) THEN T = f
+   CF = 1.5
```

## Implementing Bayesian Rule Learning as a Python package

I implemented the rule extraction portion and a helper method as a Python package,
and the code is on my GitHub:
[https://github.com/hayesall/bn-rule-extraction/](https://github.com/hayesall/bn-rule-extraction/)

```bash
pip install git+https://github.com/hayesall/bn-rule-extraction.git
```

### Bayesian Rules for Deciding when to Play Tennis

- Open Notebook in Colab: <a target="_blank" rel="noopener noreferrer" href="https://colab.research.google.com/github/hayesall/bn-rule-extraction/blob/main/docs/notebooks/tennis.ipynb"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open in Colab"></a>
- View Notebook on GitHub: <a target="_blank" rel="noopener noreferrer" href="https://github.com/hayesall/bn-rule-extraction/blob/main/docs/notebooks/tennis.ipynb"><code>tennis.ipynb</code></a>

You're walking your dog past the YMCA tennis courts, because your dog likes going on walks every day
and thinks the tennis courts smell interesting. But you notice the courts are only occupied about half the
time. Not having anything better to do, you start collecting some data on court occupation and weather
each day.[^2]

[^2]: See section 3.4.2 of Tom Mitchell's Machine Learning book (page 59 in Alexander's edition). Tom M. Mitchell. McGraw Hill. (1997). 3.4.2. In "*Machine Learning*." ISNB: 9781259096952

<div class="row">
  <div class="column">

<div>
<style scoped>

    .dataframe {
        font-size: 13px;
        border: 2px solid;
    }

    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>PlayTennis</th>
      <th>Outlook</th>
      <th>Temperature</th>
      <th>Humidity</th>
      <th>Wind</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>no</td>
      <td>sunny</td>
      <td>hot</td>
      <td>high</td>
      <td>weak</td>
    </tr>
    <tr>
      <th>1</th>
      <td>no</td>
      <td>sunny</td>
      <td>hot</td>
      <td>high</td>
      <td>strong</td>
    </tr>
    <tr>
      <th>2</th>
      <td>yes</td>
      <td>overcast</td>
      <td>hot</td>
      <td>high</td>
      <td>weak</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>11</th>
      <td>yes</td>
      <td>overcast</td>
      <td>mild</td>
      <td>high</td>
      <td>strong</td>
    </tr>
    <tr>
      <th>12</th>
      <td>yes</td>
      <td>overcast</td>
      <td>hot</td>
      <td>normal</td>
      <td>weak</td>
    </tr>
    <tr>
      <th>13</th>
      <td>no</td>
      <td>rain</td>
      <td>mild</td>
      <td>high</td>
      <td>strong</td>
    </tr>
  </tbody>
</table>
</div>
  </div>
  <div class="column">

<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="kn">from</span> <span class="nn">bayes_rule_extraction</span> <span class="kn">import</span> <span class="n">ordinal_encode</span><span class="p">,</span> <span class="n">print_rules</span>
<span class="kn">from</span> <span class="nn">pomegranate</span> <span class="kn">import</span> <span class="n">BayesianNetwork</span>
<span class="kn">import</span> <span class="nn">pandas</span> <span class="k">as</span> <span class="n">pd</span>

<span class="n">data</span> <span class="o">=</span> <span class="n">pd</span><span class="p">.</span><span class="n">read_csv</span><span class="p">(</span><span class="s">"https://raw.githubusercontent.com/hayesall/bn-rule-extraction/main/toy_decision.csv"</span><span class="p">)</span>
<span class="n">data</span>
</code></pre></div></div>

  </div>
</div>


### Naive Bayes for Tennis

Naive Bayes assumes that the variables are conditionally independent given the label. We'll represent this by passing a fixed structure where all of the variables have `PlayTennis` (0) as a parent.

<div class="row">
  <div class="column">
  <img src="/images/blog/bn-rule-extraction/tennis-naive-bayes.svg" alt="Naive bayes representation of the tennis variables. PlayTennis is a parent to Outlook, Temperature, Humidity, and Wind.">
  </div>
  <div class="column">

  <div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="n">naive_model</span> <span class="o">=</span> <span class="n">BayesianNetwork</span><span class="p">.</span><span class="n">from_structure</span><span class="p">(</span>
    <span class="n">encoded_data</span><span class="p">,</span>
    <span class="n">structure</span><span class="o">=</span><span class="p">((),</span> <span class="p">(</span><span class="mi">0</span><span class="p">,),</span> <span class="p">(</span><span class="mi">0</span><span class="p">,),</span> <span class="p">(</span><span class="mi">0</span><span class="p">,),</span> <span class="p">(</span><span class="mi">0</span><span class="p">,)),</span>
    <span class="n">state_names</span><span class="o">=</span><span class="n">data</span><span class="p">.</span><span class="n">columns</span><span class="p">,</span>
<span class="p">)</span>
</code></pre></div></div>

  </div>
</div>

The network seems backwards to a sensible causal story (*Not playing tennis causes high humidity*), but this looks reasonable for making some guesses like: "*On days when tennis is played, the humidity is probably normal.*"

```python
print_rules(naive_model, data.columns, mapping)
```

```haskell
Probabilities:
- PlayTennis
    P( PlayTennis = no ) = 0.36
    P( PlayTennis = yes ) = 0.64

IF (PlayTennis = no) THEN (Outlook = sunny)
    CF = 1.50
IF (PlayTennis = no) THEN (Humidity = high)
    CF = 4.00
IF (PlayTennis = yes) THEN (Humidity = normal)
    CF = 2.00
IF (PlayTennis = no) THEN (Wind = strong)
    CF = 1.50
IF (PlayTennis = yes) THEN (Wind = weak)
    CF = 2.00
```

### Structure Learning + Rule Extraction for the Binary Classification Case



We can encode "PlayTennis should not be the parent of any other node" using the `exclude_edges` parameter with a list of tuples:

<div class="row">
  <div class="column">
  <img src="/images/blog/bn-rule-extraction/tennis-learned-structure.svg" alt="A structure found during structure learning.">
  </div>
  <div class="column">

<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="n">excluded_edges</span> <span class="o">=</span> <span class="p">[</span>
  <span class="nb">tuple</span><span class="p">([</span><span class="mi">0</span><span class="p">,</span> <span class="n">i</span><span class="p">])</span> <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="nb">len</span><span class="p">(</span><span class="n">data</span><span class="p">.</span><span class="n">columns</span><span class="p">))</span>
<span class="p">]</span>

<span class="n">binary_model</span> <span class="o">=</span> <span class="n">BayesianNetwork</span><span class="p">().</span><span class="n">from_samples</span><span class="p">(</span>
  <span class="n">encoded_data</span><span class="p">,</span>
  <span class="n">exclude_edges</span><span class="o">=</span><span class="n">excluded_edges</span><span class="p">,</span>
  <span class="n">state_names</span><span class="o">=</span><span class="n">data</span><span class="p">.</span><span class="n">columns</span><span class="p">,</span>
<span class="p">)</span>
</code></pre></div></div>
  </div>
</div>

Extracting rules in this case suggests that humidity is the main indicator of whether this person plays tennis or not.

```console
IF (Humidity = high) THEN (PlayTennis = no)
    CF = 1.33
IF (Humidity = normal) THEN (PlayTennis = yes)
    CF = 6.00
```

### Using a structure based on some prior knowledge

There's one structure I want to highlight. I found this one while trying
to figure out which structure produced the best
leave-one-out-cross-validation accuracy.

<div class="row">
  <div class="column">
  <img src="/images/blog/bn-rule-extraction/tennis-known-structure.svg" alt="A structure we wanted to try.">
  </div>
  <div class="column">

<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="n">known_structure_model</span> <span class="o">=</span> <span class="n">BayesianNetwork</span><span class="p">.</span><span class="n">from_structure</span><span class="p">(</span>
    <span class="n">encoded_data</span><span class="p">,</span>
    <span class="n">structure</span><span class="o">=</span><span class="p">((</span><span class="mi">1</span><span class="p">,</span> <span class="mi">4</span><span class="p">),</span> <span class="p">(),</span> <span class="p">(),</span> <span class="p">(</span><span class="mi">2</span><span class="p">,),</span> <span class="p">()),</span>
    <span class="n">state_names</span><span class="o">=</span><span class="n">data</span><span class="p">.</span><span class="n">columns</span><span class="p">,</span>
<span class="p">)</span>
</code></pre></div></div>
  </div>
</div>

The causal interpretation seems tenuous&mdash;it seems like a sunny or overcast outlook should affect the temperature. But it also seems overly optimistic to expect causal explanations from the fictional world this data was drawn from.

This structure gives us an excuse to explore *multiple conditions
affecting an outcome.* Both `Outlook` and `Wind` influence `PlayTennis`.

### Bayesian Rule Extraction to Explain Income from Census Data

- Open Notebook in Colab: <a target="_blank" rel="noopener noreferrer" href="https://colab.research.google.com/github/hayesall/bn-rule-extraction/blob/main/docs/notebooks/adult.ipynb"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open in Colab"></a>
- View Notebook on GitHub: <a target="_blank" rel="noopener noreferrer" href="https://github.com/hayesall/bn-rule-extraction/blob/main/docs/notebooks/adult.ipynb"><code>adult.ipynb</code></a>

Now we'll turn our focus toward applying the "*Bayesian Rule Learning*" algorithm to a more-realistic
*Adult* dataset, which is a common benchmark for *interpretable* or *fair* methods
(I adapted some of the setup here from the
[InterpretML documentation for the Explainable Boosting Machine](https://interpret.ml/docs/ebm.html)
(used under terms of the *MIT License*)).

This follows the standard binary classification problem. The goal is to predict whether a person made
more/less than $50,000 using attributes like "Age," "Education," "MaritalStatus," etc.

```python
from bayes_rule_extraction import ordinal_encode, print_rules
from pomegranate import BayesianNetwork
import pandas as pd

data = pd.read_csv(
    "https://archive.ics.uci.edu/ml/machine-learning-databases/adult/adult.data",
    header=None,
)
data.columns = [
    "Age", "WorkClass", "fnlwgt", "Education", "EducationNum",
    "MaritalStatus", "Occupation", "Relationship", "Race", "Gender",
    "CapitalGain", "CapitalLoss", "HoursPerWeek", "NativeCountry", "Income"
]

data.drop(["Age", "fnlwgt", "EducationNum", "CapitalGain", "CapitalLoss", "HoursPerWeek"], axis=1, inplace=True)
data.replace(" ?", pd.NA, inplace=True)
data.dropna(inplace=True)
data
```


<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>WorkClass</th>
      <th>Education</th>
      <th>MaritalStatus</th>
      <th>Occupation</th>
      <th>Relationship</th>
      <th>Race</th>
      <th>Gender</th>
      <th>NativeCountry</th>
      <th>Income</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>State-gov</td>
      <td>Bachelors</td>
      <td>Never-married</td>
      <td>Adm-clerical</td>
      <td>Not-in-family</td>
      <td>White</td>
      <td>Male</td>
      <td>United-States</td>
      <td>&lt;=50K</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Self-emp-not-inc</td>
      <td>Bachelors</td>
      <td>Married-civ-spouse</td>
      <td>Exec-managerial</td>
      <td>Husband</td>
      <td>White</td>
      <td>Male</td>
      <td>United-States</td>
      <td>&lt;=50K</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Private</td>
      <td>HS-grad</td>
      <td>Divorced</td>
      <td>Handlers-cleaners</td>
      <td>Not-in-family</td>
      <td>White</td>
      <td>Male</td>
      <td>United-States</td>
      <td>&lt;=50K</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Private</td>
      <td>11th</td>
      <td>Married-civ-spouse</td>
      <td>Handlers-cleaners</td>
      <td>Husband</td>
      <td>Black</td>
      <td>Male</td>
      <td>United-States</td>
      <td>&lt;=50K</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Private</td>
      <td>Bachelors</td>
      <td>Married-civ-spouse</td>
      <td>Prof-specialty</td>
      <td>Wife</td>
      <td>Black</td>
      <td>Female</td>
      <td>Cuba</td>
      <td>&lt;=50K</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>32556</th>
      <td>Private</td>
      <td>Assoc-acdm</td>
      <td>Married-civ-spouse</td>
      <td>Tech-support</td>
      <td>Wife</td>
      <td>White</td>
      <td>Female</td>
      <td>United-States</td>
      <td>&lt;=50K</td>
    </tr>
    <tr>
      <th>32557</th>
      <td>Private</td>
      <td>HS-grad</td>
      <td>Married-civ-spouse</td>
      <td>Machine-op-inspct</td>
      <td>Husband</td>
      <td>White</td>
      <td>Male</td>
      <td>United-States</td>
      <td>&gt;50K</td>
    </tr>
    <tr>
      <th>32558</th>
      <td>Private</td>
      <td>HS-grad</td>
      <td>Widowed</td>
      <td>Adm-clerical</td>
      <td>Unmarried</td>
      <td>White</td>
      <td>Female</td>
      <td>United-States</td>
      <td>&lt;=50K</td>
    </tr>
    <tr>
      <th>32559</th>
      <td>Private</td>
      <td>HS-grad</td>
      <td>Never-married</td>
      <td>Adm-clerical</td>
      <td>Own-child</td>
      <td>White</td>
      <td>Male</td>
      <td>United-States</td>
      <td>&lt;=50K</td>
    </tr>
    <tr>
      <th>32560</th>
      <td>Self-emp-inc</td>
      <td>HS-grad</td>
      <td>Married-civ-spouse</td>
      <td>Exec-managerial</td>
      <td>Wife</td>
      <td>White</td>
      <td>Female</td>
      <td>United-States</td>
      <td>&gt;50K</td>
    </tr>
  </tbody>
</table>
</div>

### Unconstrained Structure Learning

*Gopalakrishnan 2010* used a modified version of the K2 structure learning algorithm. This uses pomegranate's `.from_samples` method to fitting exact structures using search.

K2 would have provided some control over the maximum number of edges and whether one node can be the parent of another through a user's choice of variable ordering. Similar to what I showed in the "Tennis" example, some advice to constrain variable parentage is probably useful in practice.

For example, leaving the model "unconstrained" may produce network structures and downstream rules that are more difficult to interpret:

```python
unconstrained_model = BayesianNetwork().from_samples(
    encoded_data,
    state_names=data.columns,
)
```

<img src="/images/blog/bn-rule-extraction/adult-unconstrained.svg" alt="Structure learned on the adult dataset with no constraints.">

Similar to the Naive Bayes case from the "Tennis" example, you might be able to make guesses when knowing the prior probabilities of the outcomes and its influence on other variables. But "Income" was what we wanted to predict, and a network rooted at "Income" means that it will never occur after a `THEN`.

```python
print_rules(unconstrained_model, data.columns, mapping)
```

```
Probabilities:
- Income
    P( Income = <=50K ) = 0.75
    P( Income = >50K ) = 0.25
```

Here we see a case where the confidence factor is infinite. Since the confidence factor is calculated
by weighing the evidence for and against something, `CF = inf` means there was no contrary evidence.

```
IF (Relationship = Husband ^ Gender = Female) THEN (MaritalStatus = Married-civ-spouse)
    CF = inf
IF (Relationship = Husband ^ Gender = Male) THEN (MaritalStatus = Married-civ-spouse)
    CF = 1383.67
```


<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>WorkClass</th>
      <th>Education</th>
      <th>MaritalStatus</th>
      <th>Occupation</th>
      <th>Relationship</th>
      <th>Race</th>
      <th>Gender</th>
      <th>NativeCountry</th>
      <th>Income</th>
    </tr>
  </thead>
  <tbody>
      <tr>
      <th>575</th>
      <td>Private</td>
      <td>Bachelors</td>
      <td>Married-civ-spouse</td>
      <td>Exec-managerial</td>
      <td>Wife</td>
      <td>White</td>
      <td>Male</td>
      <td>United-States</td>
      <td>&gt;50K</td>
    </tr>
    <tr>
      <th>7109</th>
      <td>Private</td>
      <td>HS-grad</td>
      <td>Married-civ-spouse</td>
      <td>Sales</td>
      <td>Husband</td>
      <td>White</td>
      <td>Female</td>
      <td>United-States</td>
      <td>&lt;=50K</td>
    </tr>
  </tbody>
</table>
</div>


### Adding constraints to guide the structure learning

`pomegranate` provides some control over variable influences using the `include_edges` or `exclude_edges` parameters in the `.from_samples` method.

Since we're interested in "Income," this adds a constraint requiring: "*Income cannot be the parent of any node.*"

This tends to produce a network rooted at "MaritalStatus," with "Income" having "Relationship" and "Education" as parents.

```python
excluded_edges = [tuple([8, i]) for i in range(len(data.columns)-1)]

model = BayesianNetwork().from_samples(
    encoded,
    exclude_edges=excluded_edges,
    state_names=data.columns,
)
```

<img src="/images/blog/bn-rule-extraction/adult-constrained.svg" alt="Structure learned on the adult dataset with a constraint that Income cannot be the parent of any other variable.">

## Ideas and Further Thoughts

### (1) Rules with equally likely outcomes

It's pretty common to find cases where we could refine the rules. Consider these two cases:

```python
if (Outlook == "sunny" and Wind == "strong"):
    PlayTennis = ("no", 1.0)

if (Outlook == "sunny" and Wind == "strong"):
    PlayTennis = ("yes", 1.0)
```

(1) The conditions are the same, (2) the confidence factors for both outcomes are the same, but (3) the *outcomes are different*. This might be refined to say something like: "*If the outlook is sunny and the wind is strong, it's equally likely that the person plays tennis.*"

---

### (2) Being Infinitely confident

Now consider a case like this:

```python
if (Outlook == "overcast" and Wind == "strong"):
    PlayTennis = ("yes", inf)
```

This occurs here because we have two examples where the outlook is overcast and the wind is strong; and our imaginary user played tennis on both days:

```console
   PlayTennis   Outlook    Wind
-------------------------------
6         yes  overcast  strong
11        yes  overcast  strong
?          no  overcast  strong    <-- never observed in the training data
```

There are two interpretations for "infinite confidence" here. Either (1) the relationship is determinitic and the user always plays tennis on overcast, windy days; or (2) we didn't didn't observe enough cases to adequately assess how confident we should be.

Extracting rules from the Bayes net resulted in four of these:

```python
if (Outlook == "overcast" and Wind == "strong"):
    PlayTennis = ("yes", inf)
if (Outlook == "overcast" and Wind == "weak"):
    PlayTennis = ("yes", inf)
if (Outlook == "rain" and Wind == "strong"):
    PlayTennis = ("no", inf)
if (Outlook == "rain" and Wind == "weak"):
    PlayTennis = ("yes", inf)
```

I suspect this could help reveal deterministic paths within uncertain models, shed light on cases where domain expertise or more data are required, or perhaps reveal "bugs" in the data where a variable that should be dependent on another was incorrectly recorded.

## Some brief remarks

I read a decent amount on Bayesian networks
since the modeling approach tends to align
really well with health informatics problems. Around October 2020 I stumbled into a 2010 paper by
Vanathi Gopalakrishnan, Jonathan L. Lustgarten,
Shyam Visweswaran, and Gregory F. Cooper.

The paper positioned itself as a technique
for learning logical rules, but around
ten years passed and the fields of
"*explainable or interpretable machine learning*" are better defined, which in
hindsight made this paper look more like
a post-hoc explanations technique for
a Bayesian network.

"Bayesian rule learning for biomedical data mining"
https://academic.oup.com/bioinformatics/article/26/5/668/212302