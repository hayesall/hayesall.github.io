---
layout: article
title: "rnlp"
date: 2020-01-30
excerpt: >-
  <b>R</b>elational
  <b>N</b>atural
  <b>L</b>anguage
  <b>P</b>rocessing.
  Lifting raw text into a relational representation.
categories: software
github-url: https://github.com/srlearn/rnlp
documentation:
  stable: https://rnlp.readthedocs.io/en/stable/
  latest: https://rnlp.readthedocs.io/en/latest/
tags: ["Statistical Relational Learning"]
primary-language: python
downloads:
  total: https://pepy.tech/badge/rnlp
  monthly: https://pepy.tech/badge/rnlp/month
---

## Overview

**{{ page.title }}**: {{ page.excerpt }}

[![Total Downloads]({{ page.downloads.total }})](https://pepy.tech/project/srlearn)
[![Monthly Downloads]({{ page.downloads.monthly }})](https://pepy.tech/project/srlearn)

- **Source Code**: [{{ page.github-url }}]({{ page.github-url }})
- **Documentation (Latest)**: [{{ page.documentation.latest }}]({{ page.documentation.latest }})

---

## Motivation

If you're reasoning about documents, there are multiple levels you can reason at:

- Do documents contain a specific phrase?
- Do these sentences contain a phrase while others don't?

rnlp builds a representation of sentences, words, and properties of those words. This hierarchy of concepts
can then be passed to a relational learner to determine how to separate the concept classes.

Consider the U.S. Declaration of Independence. There is a section in the middle
sometimes called the "list of grievances" where the writers spelled out problems
with colonial rule:

```
In Congress, July 4, 1776. The unanimous Declaration of the thirteen united
States of America, When in the Course of human events, it becomes necessary
for one people to dissolve the political bands which have connected them
with another, and to assume among the powers of the earth, the separate and
equal station to which the Laws of Nature and of Nature's God entitle them,
a decent respect to the opinions of mankind requires that they should
declare the causes which impel them to the separation.
...
He has refused his Assent to Laws, the most wholesome and necessary for the
public good.
```

Is there a rule that determines whether a sentence is one of the grievances?
When we pose this as a learning problem, we get the following model:

<figure>
<img src="/images/software/rnlp/list_of_grievances.png" alt="A tree model learned with BoostSRL, showing that a sentence is likely to be part of the list of grievances if it begins with the words He or For.">
<caption>A tree model learned with BoostSRL, showing that a sentence is likely to be part of the list of grievances if it begins with the words 'He' or 'For.'</caption>
</figure>

## Some Historical Notes

rnlp evolved out of a project with Kaushik Roy where we were doing information extraction
from financial documents.

Some of these notes are still on the starling-lab BoostSRL wiki:
[https://starling.utdallas.edu/software/boostsrl/wiki/natural-language-processing/](https://starling.utdallas.edu/software/boostsrl/wiki/natural-language-processing/)
