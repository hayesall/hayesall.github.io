---
layout: article
title: "relational-datasets"
date: 2021-10-05
excerpt: >-
  A library to load benchmark datasets
  for relational learning.
categories: software
tags: ["Statistical Relational Learning"]
github-url: https://github.com/srlearn/relational-datasets
documentation:
  latest: https://srlearn.github.io/relational-datasets/
primary-language: python
downloads:
  total: https://pepy.tech/badge/relational-datasets
  monthly: https://pepy.tech/badge/relational-datasets/month
---

## Overview

**relational-datasets** is {{ page.excerpt| downcase }}

[![Total alerts](https://img.shields.io/lgtm/alerts/g/srlearn/relational-datasets.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/srlearn/relational-datasets/alerts/)
[![codecov](https://codecov.io/gh/srlearn/relational-datasets/branch/main/graph/badge.svg?token=lutvcUSBRF)](https://codecov.io/gh/srlearn/relational-datasets)
[![Python Package Builds](https://github.com/srlearn/relational-datasets/actions/workflows/python-package.yml/badge.svg)](https://github.com/srlearn/relational-datasets/actions/workflows/python-package.yml)
[![Documentation Deploy](https://github.com/srlearn/relational-datasets/actions/workflows/deploy-docs.yml/badge.svg)](https://github.com/srlearn/relational-datasets/actions/workflows/deploy-docs.yml)
[![Total Downloads]({{ page.downloads.total }})](https://pepy.tech/project/relational-datasets)
[![Monthly Downloads]({{ page.downloads.monthly }})](https://pepy.tech/project/relational-datasets)

- **Source Code**: [{{ page.github-url }}]({{ page.github-url }})
- **Documentation (Latest)**: [{{ page.documentation.latest }}]({{ page.documentation.latest }})

---

## Basic Usage

The main use is loading training and test folds. For example,
we could load fold 2 of webkb:

{% highlight python linenos %}
from relational_datasets import load

train, test = load("webkb", fold=2)
{% endhighlight %}


It also tries to help bridge the gap with vector-structured data
by providing methods to convert standard datasets:

{% highlight python linenos %}
from relational_datasets.convert import from_numpy
import numpy as np

data, modes = from_numpy(
  np.array([[0, 1, 1], [0, 1, 2], [1, 2, 2]]),
  np.array([0, 0, 1]),
)
{% endhighlight %}

Or as a more realistic example, it can convert the "Breast Cancer
Wisconsin" dataset from scikit-learn:

{% highlight python linenos %}
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import KBinsDiscretizer
from relational_datasets.convert import from_numpy

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y)

disc = KBinsDiscretizer(n_bins=5, encode="ordinal")
X_train = disc.fit_transform(X_train).astype(int)
X_test = disc.transform(X_test).astype(int)

train, modes = from_numpy(X_train, y_train)
test, _ = from_numpy(X_test, y_test)
{% endhighlight %}

---

## Installation

The latest stable version can be installed from PyPi using pip:

```bash
pip install relational-datasets
```
