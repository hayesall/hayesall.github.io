---
layout: article
title: "boostsrl"
date: 2019-08-07
excerpt: >-
  Python wrappers for BoostSRL jar files with a sklearn-style API.
---

[![boostsrl Python Package Index latest version][pypi img]](https://pypi.org/project/boostsrl/)
[![boostsrl-python-package License][license img]](https://github.com/hayesall/boostsrl-python-package/blob/master/LICENSE)
[![Travis Continuous Integration build status][build status]](https://travis-ci.org/hayesall/boostsrl-python-package)
[![Code coverage status][codecov]](https://codecov.io/github/hayesall/boostsrl-python-package?branch=master)
[![Circle Continuous Integration documentation correctness status][circleci]](https://circleci.com/gh/hayesall/boostsrl-python-package)
[![ReadTheDocs latest documentation build status][readthedocs]](https://boostsrl.readthedocs.io/en/latest/)

[pypi img]:https://img.shields.io/pypi/v/boostsrl.svg
[license img]:https://img.shields.io/github/license/hayesall/boostsrl-python-package.svg
[build status]:https://travis-ci.org/hayesall/boostsrl-python-package.svg?branch=master
[codecov]:https://codecov.io/gh/hayesall/boostsrl-python-package/branch/master/graphs/badge.svg?branch=master
[circleci]:https://circleci.com/gh/hayesall/boostsrl-python-package.svg?style=shield
[readthedocs]:https://readthedocs.org/projects/boostsrl/badge/?version=latest

**boostsrl** is a set of Python wrappers around BoostSRl with a scikit-learn-style interface.

- **Documentation**: [https://boostsrl.readthedocs.io/en/stable/](https://boostsrl.readthedocs.io/en/stable/)
- **Questions?** Contact [Alexander L. Hayes](https://hayesall.com) ([hayesall@iu.edu](mailto:hayesall@iu.edu))

{% include toc.html %}

## Getting Started

### Prerequisites

* Java 1.8
* Python (3.6, 3.7)

### Installation

The latest stable version can be installed from PyPi using pip:

```bash
pip install boostsrl
```

The [Getting Started](https://boostsrl.readthedocs.io/en/latest/getting_started.html)
guide has further details.

## Basic Usage

The general setup should be similar to scikit-learn. But there are a few extra requirements in terms of setting background knowledge and formatting the data.

A minimal working example (using the Toy-Cancer data set imported with 'example_data') is:

```python
>>> from boostsrl.rdn import RDN
>>> from boostsrl import Background
>>> from boostsrl import example_data
>>> bk = Background(
...     modes=example_data.train.modes,
...     use_std_logic_variables=True,
... )
>>> clf = RDN(
...     background=bk,
...     target='cancer',
... )
>>> clf.fit(example_data.train)
>>> clf.predict_proba(example_data.test)
array([0.88079619, 0.88079619, 0.88079619, 0.3075821 , 0.3075821 ])
>>> clf.classes_
array([1., 1., 1., 0., 0.])
```

`example_data.train` and `example_data.test` are each
[`boostsrl.Database`](https://boostsrl.readthedocs.io/en/latest/generated/boostsrl.Database.html#boostsrl.Database) object,
so this hides some of the complexity behind the scenes.

This example abstracts away some complexity in exchange for compactness.
For more thorough examples, see the
[Examples Gallery](https://boostsrl.readthedocs.io/en/latest/auto_examples/index.html)
section of the documentation.

## Contributing

Please refer to [CONTRIBUTING.md](https://github.com/hayesall/boostsrl-python-package/blob/master/.github/CONTRIBUTING.md) for documentation on submitting issues and pull requests.

## Versioning

We use [SemVer](https://semver.org/) for versioning. See [PyPi](https://pypi.org/project/boostsrl/) or [Releases](https://github.com/hayesall/boostsrl-python-package/releases) for all stable versions that are available.
