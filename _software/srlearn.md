---
layout: article
title: "srlearn"
date: 2022-01-15
excerpt: >-
  A library for learning SRL models with a scikit-learn-style programming interface.
categories: software
github-url: https://github.com/srlearn/srlearn
documentation:
  stable: https://srlearn.readthedocs.io/en/stable/
  latest: https://srlearn.readthedocs.io/en/latest/
tags: ["Statistical Relational Learning"]
primary-language: python
downloads:
  total: https://pepy.tech/badge/srlearn
  monthly: https://pepy.tech/badge/srlearn/month
---

## Overview

**{{ page.title }}**: {{ page.excerpt }}

[![LGTM code quality analysis](https://img.shields.io/lgtm/grade/python/github/srlearn/srlearn?label=code%20quality&logo=lgtm)](https://lgtm.com/projects/g/srlearn/srlearn/context:python)
[![GitHub CI Builds](https://github.com/srlearn/srlearn/actions/workflows/python_tests.yml/badge.svg)](https://github.com/srlearn/srlearn/actions/workflows/python_tests.yml)
[![Code coverage status](https://codecov.io/gh/srlearn/srlearn/branch/main/graphs/badge.svg?branch=main)](https://codecov.io/github/srlearn/srlearn?branch=main)
[![Total Downloads]({{ page.downloads.total }})](https://pepy.tech/project/srlearn)
[![Monthly Downloads]({{ page.downloads.monthly }})](https://pepy.tech/project/srlearn)

- **Source Code**: [{{ page.github-url }}]({{ page.github-url }})
- **Documentation (Latest)**: [{{ page.documentation.latest }}]({{ page.documentation.latest }})

---

## Motivation: Crash Course in relational representations

Not all prediction problems fit into nice 2-dimensional vectors $$X$$ and 1-dimensional labels $$y$$.
Network data is often better represented as a collection of entities, their attributes, and their relationships:

<div class="row">
  <div class="column">
  <img src="/images/software/srlearn/simple-friendship-network.png" alt="Simple network visualization showing six people, their friendships with one another, and whether the person smokes.">
  </div>
  <div class="column">
<div class="language-prolog highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="ss">cancer</span><span class="p">(</span><span class="ss">alice</span><span class="p">).</span>
<span class="ss">cancer</span><span class="p">(</span><span class="ss">bob</span><span class="p">).</span>
<span class="ss">cancer</span><span class="p">(</span><span class="ss">chuck</span><span class="p">).</span>
<span class="ss">cancer</span><span class="p">(</span><span class="ss">fred</span><span class="p">).</span>
<span class="ss">friends</span><span class="p">(</span><span class="ss">alice</span><span class="p">,</span><span class="ss">bob</span><span class="p">).</span>
<span class="ss">friends</span><span class="p">(</span><span class="ss">alice</span><span class="p">,</span><span class="ss">fred</span><span class="p">).</span>
<span class="ss">friends</span><span class="p">(</span><span class="ss">chuck</span><span class="p">,</span><span class="ss">bob</span><span class="p">).</span>
<span class="ss">friends</span><span class="p">(</span><span class="ss">chuck</span><span class="p">,</span><span class="ss">fred</span><span class="p">).</span>
<span class="p">...</span>
<span class="ss">friends</span><span class="p">(</span><span class="ss">fred</span><span class="p">,</span><span class="ss">alice</span><span class="p">).</span>
<span class="ss">friends</span><span class="p">(</span><span class="ss">bob</span><span class="p">,</span><span class="ss">chuck</span><span class="p">).</span>
<span class="ss">friends</span><span class="p">(</span><span class="ss">fred</span><span class="p">,</span><span class="ss">chuck</span><span class="p">).</span>
<span class="ss">friends</span><span class="p">(</span><span class="ss">bob</span><span class="p">,</span><span class="ss">dan</span><span class="p">).</span>
<span class="ss">friends</span><span class="p">(</span><span class="ss">bob</span><span class="p">,</span><span class="ss">earl</span><span class="p">).</span>
<span class="ss">smokes</span><span class="p">(</span><span class="ss">alice</span><span class="p">).</span>
<span class="ss">smokes</span><span class="p">(</span><span class="ss">chuck</span><span class="p">).</span>
<span class="ss">smokes</span><span class="p">(</span><span class="ss">bob</span><span class="p">).</span>
</code></pre></div></div>
  </div>
</div>

## Basic Usage

The general setup is similar to libraries like scikit-learn or Keras that follow:
(1) initialize, (2) fit, and (3) predict.

```python
from srlearn.rdn import BoostedRDNClassifier
from srlearn import Background
from srlearn.datasets import load_toy_cancer

train, test = load_toy_cancer()

# Background knowledge about the domain, and its constraints
bk = Background(modes=train.modes)

# Instantiate a model to learn about cancer diagnoses
clf = BoostedRDNClassifier(
    background=bk,
    target="cancer",
)

clf.fit(train)

clf.predict_proba(test)
# array([0.88079619, 0.88079619, 0.88079619, 0.3075821 , 0.3075821 ])
```

Furthermore, it includes utilities for model visualization and
serialization:

```python
from srlearn.plotting import export_digraph, plot_digraph

plot_digraph(export_digraph(clf, 0))
```

![Tree-structured network where smokes(A) implies cancer](/images/software/srlearn/srlearn-cancer-rdn.svg)

So we learned that if a person `A` smokes, then that person is likely to also have cancer, or:

```prolog
cancer(A) :- smokes(A).
```

---

## Installation

The latest stable version can be installed from PyPi using pip:

```bash
pip install srlearn
```
