---
layout: article
title: "bn-rule-extraction"
date: 2019-08-07
excerpt: >-
  Extracting interpretable decision lists
  from Bayesian Networks.
categories: software
github-url: https://github.com/hayesall/bn-rule-extraction
tags: ["Explainable Machine Learning", "Bayesian Networks"]
primary-language: python
image:
  teaser: teaser/bn-rule-extraction-teaser.png
  alt: "A Bayesian network where alpha, beta, gamma influence X, which influences T."
---

## Overview

**{{ page.title }}**: {{ page.excerpt }}

- **Source Code**: [{{ page.github-url }}]({{ page.github-url }})

---

## Motivation

Bayesian Network *structures* are fairly interpretable, and Bayesian
network *parameters* are fairly interpretable. But it isn't always
obvious how to interpret both of these at the same time.

This package extracts decision lists from pomegranate Bayesian
networks.

I wrote a longer blog post on this topic: [*Extracting Interpretable Rules from Bayesian Networks in Python*]({% post_url 2022-01-04-bayes-net-rule-extraction %}).
