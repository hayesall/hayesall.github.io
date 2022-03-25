---
layout: article
title: "RelationalDatasets.jl"
date: 2021-10-05
excerpt: >-
  A library to load benchmark datasets
  for relational learning&mdash;but in Julia.
categories: software
tags: ["Statistical Relational Learning"]
github-url: https://github.com/srlearn/RelationalDatasets.jl
documentation:
  stable: https://srlearn.github.io/RelationalDatasets.jl/stable/
  latest: https://srlearn.github.io/RelationalDatasets.jl/dev/
primary-language: julia
---

## Overview

**{{ page.title }}**: {{ page.excerpt }}

![GitHub release (latest by date)](https://img.shields.io/github/v/release/srlearn/RelationalDatasets.jl)
![GitHub](https://img.shields.io/github/license/srlearn/RelationalDatasets.jl)
[![codecov](https://codecov.io/gh/srlearn/RelationalDatasets.jl/branch/main/graph/badge.svg?token=HaQuwbovLv)](https://codecov.io/gh/srlearn/RelationalDatasets.jl)
[![Ubuntu/macOS/Windows](https://github.com/srlearn/RelationalDatasets.jl/actions/workflows/package-tests.yml/badge.svg)](https://github.com/srlearn/RelationalDatasets.jl/actions/workflows/package-tests.yml)

- **Source Code**: [{{ page.github-url }}]({{ page.github-url }})
- **Documentation (Latest)**: [{{ page.documentation.latest }}]({{ page.documentation.latest }})

---

## Basic Usage

The main use is loading training and test folds. For example,
we could load fold 2 of webkb:

{% highlight julia linenos %}
using RelationalDatasets

train, test = load("webkb", fold=2)
{% endhighlight %}

It also tries to help bridge the gap with vector-structured data
by providing methods to convert standard datasets:

{% highlight python linenos %}
using RelationalDatasets

data, modes = RelationalDatasets.from_vector(
  [0 1 1; 1 0 2; 2 2 0],
  [0, 0, 1],
)
{% endhighlight %}

---

## Installation

The latest stable version can be installed with Pkg:

```julia
] add RelationalDatasets
```
