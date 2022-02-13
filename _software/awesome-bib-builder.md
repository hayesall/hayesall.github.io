---
layout: article
title: "awesome-bib-builder"
date: 2020-11-17
excerpt: >-
  Scripts for transforming BibTeX files into markdown collections.
categories: software
github-url: https://github.com/hayesall/awesome_bib_builder
tags: ["Miscellaneous"]
primary-language: python
---

## Overview

**{{ page.title }}**: {{ page.excerpt }}

- **Source Code**: [{{ page.github-url }}]({{ page.github-url }})

---

## Motivation

There's a trend on GitHub where people build "*awesome*" lists of research papers, like [awesome-spn](https://github.com/arranger1044/awesome-spn) or [awesome-gradient-boosting-papers](https://github.com/benedekrozemberczki/awesome-gradient-boosting-papers).

<figure>
<img alt="Screenshots from two lists. The left shows a list of sum-product network papers from 2019. The right shows gradient boosting papers from 2021." src="/images/software/awesome-bib-builder/two-awesome-lists.png" style="max-width: 100%;">
<caption>Snapshots from two awesome lists. (Left) sum-product network papers written in 2019. (Right) Gradient-boosting papers published in 2021.</caption>
</figure>

Maintaining lists like these will get extremely tedious over time though. Ordering papers by year and topic means maintaining the same data in
two locations.

This is exactly the problem I ran into when putting together notes on Bayesian Network papers I read: [http://bayes.hayesall.com](http://bayes.hayesall.com)

---

## Approach

Academics tend to like `bibtex` citations, so I thought it would make sense to
turn a folder of `.bib` files into a structured markdown representation.
