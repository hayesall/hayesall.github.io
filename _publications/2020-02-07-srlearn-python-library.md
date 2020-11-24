---
layout: publication
title: "srlearn: A Python Library for Gradient-Boosted Statistical Relational Models"
date: 2019-12-21
categories: ["publications"]
excerpt: >-
  srlearn is a Python library for learning gradient-boosted statistical
  relational models.
abstract: >-
  We present srlearn, a Python library for boosted statistical relational models.
  We adapt the scikit-learn interface to this setting and provide examples for
  how this can be used to express learning and inference problems.
authors: ["Alexander L. Hayes"]
publication_url: "https://arxiv.org/abs/1912.08198"
publisher: "arXiv"
image:
  teaser: publications/starai2020_hayes-srlearn-python-library.png
---

**Accepted** at the [Ninth International Workshop on Statistical Relational AI - StarAI 2020](http://www.starai.org/2020/).

## Paper

Explore further on [GitHub](https://github.com/hayesall/srlearn-StarAI-2020-workshop).

- [Read Online - <i style="color: red" class="icons fa fa-file"> .pdf</i>](/publications/srlearn-python-library.pdf)
  - [Preprint - arXiv:1912.08198 [cs.LG]](https://arxiv.org/abs/1912.08198)
  - [DeepAI Publication Page](https://deepai.org/publication/srlearn-a-python-library-for-gradient-boosted-statistical-relational-models)

## `srlearn` overview

`srlearn` has several aims. At a basic level it wraps the state-of-the-art
[BoostSRL package](https://starling.utdallas.edu/software/boostsrl/wiki/)
for learning the structure and parameters of statistical relational models.
At a higher level, it is an ongoing experiment in creating application programming
interfaces (APIs) that blend idea from *logic programming* with what is familiar to
the machine learning and data science communities built around the *Python
programming language*.

This example is presented as *Figure 1* in the paper, and is presently featured
as one of the getting started examples in the `srlearn` documentation:

```python
>>> from srlearn.rdn import BoostedRDN
>>> from srlearn import Background
>>> from srlearn import example_data
>>> bk = Background(
...     modes=example_data.train.modes,
...     use_std_logic_variables=True,
... )
>>> clf = BoostedRDN(
...     background=bk,
...     target='cancer',
... )
>>> clf.fit(example_data.train)
>>> clf.predict_proba(example_data.test)
array([0.88079619, 0.88079619, 0.88079619, 0.3075821 , 0.3075821 ])
>>> clf.classes_
array([1., 1., 1., 0., 0.])
```

### Software

Results of the paper are based on [`srlearn==0.5.0`](https://pypi.org/project/srlearn/0.5.0/)

Please consider starring 🌟 the
[`srlearn` GitHub Repository](https://github.com/hayesall/srlearn)
repository. It's an open-source project, so any feedback or recommendations are
appreciated.

### Experiments

Scripts for reproducing *Table 1* are contained in the
[`experiments/` directory on GitHub](https://github.com/hayesall/srlearn-StarAI-2020-workshop/tree/master/experiments/).

## Acknowledgments

ALH is sponsored through Indiana University's "Precision Health Initiative"
(PHI) Grand Challenge. ALH would like to thank
[Sriraam Natarajan](https://personal.utdallas.edu/~sriraam.natarajan/),
[Travis LaGrone](https://github.com/travis-c-lagrone),
and
[members of the StARLinG Lab](https://starling.utdallas.edu/people/)
 at the University of Texas at Dallas.
