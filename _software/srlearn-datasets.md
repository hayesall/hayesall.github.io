---
layout: article
title: "Relational Dataset Archive"
date: 2021-08-25
excerpt: >-
  An archive of standard, versioned
  benchmark relational datasets.
categories: software
github-url: https://github.com/srlearn/datasets
documentation:
  latest: https://srlearn.github.io/relational-datasets/downloads/
tags: ["Statistical Relational Learning"]
primary-language: bash
---

## Overview

**{{ page.title }}**: {{ page.excerpt }}

![GitHub release (latest by date)](https://img.shields.io/github/v/release/srlearn/datasets)

- **Source Code**: [{{ page.github-url }}]({{ page.github-url }})
- **Documentation (Latest)**: [{{ page.documentation.latest }}]({{ page.documentation.latest }})

---

{% include toc.html %}

## Basic Usage

This is a collection of datasets that have passed all checks set in the
"[Relational Data Linter](/software/ilp-linter/)."

Many are split into standard cross-validation folds for benchmarking
relational learning and inference algorithms.

One of these libraries can be used to manage these datasets locally:

- Python: [relational-datasets](/software/relational-datasets/)
- Julia: [RelationalDatasets.jl](/software/relational-datasets.jl/)

<a target="_blank" href="https://github.com/srlearn/datasets/releases"><img src="/images/software/srlearn-datasets/srlearn-datasets-0.0.5.png" alt="Screenshot of the GitHub assets for datasets 0.0.5. It shows a table of dataset names, version numbers, and their size in bytes."></a>

---

## Contributing a Dataset

I would love more datasets, and I would love any feedback for whether
this is useful to your research!

- Email me at `hayesall@iu.edu`
- or open an issue on GitHub here: [https://github.com/srlearn/datasets/issues](https://github.com/srlearn/datasets/issues)

I drew quite a bit of inspiration for this from [Jonas Schouterden's](https://people.cs.kuleuven.be/~jonas.schouterden/)
[RelationalDatasets](https://github.com/joschout/RelationalDatasets) repository.

---

## Data Versioning and Downloading

**Specific Version**: Versions of each data archive may be downloaded by sending
requests to a url with the following pattern, where `{VERSION}` represents a tag
and `{NAME}` is the name for a dataset:

```
https://github.com/srlearn/datasets/releases/download/{VERSION}/{NAME}_{VERSION}.zip
```

---

## Examples

### curl

Download version `v0.0.4` of `toy_cancer`:

```bash
curl -L https://github.com/srlearn/datasets/releases/download/v0.0.4/toy_cancer_v0.0.4.zip > toy_cancer_v0.0.4.zip
```

Download version `v0.0.4` of `webkb`:

```bash
curl -L https://github.com/srlearn/datasets/releases/download/v0.0.4/webkb_v0.0.4.zip > webkb_v0.0.4.zip
```

### relational-datasets

Load version `v0.0.4` of `toy_cancer`:

```python
from relational_datasets import load

train, test = load("toy_cancer", "v0.0.4")
```

### RelationalDatasets.jl

Load version `v0.0.4` of `toy_cancer`:

```julia
using RelationalDatasets

train, test = load("toy_cancer", "v0.0.4")
```
