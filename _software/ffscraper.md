---
layout: article
title: "ffscraper"
date: 2019-08-12
excerpt: >-
  A super simple scraper for FanFiction.Net
categories: software
github-url: https://github.com/hayesall/ffscraper
documentation:
  stable: https://ffscraper.readthedocs.io/en/stable/
  latest: https://ffscraper.readthedocs.io/en/latest/
tags: ["Miscellaneous"]
primary-language: python
image:
  teaser: teaser/directed_fanfiction_graph.jpg
  alt: "Directed graph with blue and violet nodes."
---

## Overview

**{{ page.title }}**: {{ page.excerpt }}

- **Source Code**: [{{ page.github-url }}]({{ page.github-url }})
- **Documentation (Latest)**: [{{ page.documentation.latest }}]({{ page.documentation.latest }})

---

## Motivation

This combined some lessons learned from my post on
[*Network of Code Lyoko FanFiction*](/blog/network-of-code-lyoko-fanfiction/).
I'd also been reading about time-evolving networks and their role in
recommendation systems, so I wrote a Python package to assist with
indexing content on FanFiction.Net.

## Getting Started

```bash
pip install ffscraper
```

Interact with the scraper from the command line:

```
python -m ffscraper --help
python -m ffscraper -s 123
```

Or import the Python package and start building your own systems:

```python
import ffscraper as ffs

sids = ["123", "124", "125"]

for id in sids:
  story = ffs.fanfic.story.scraper(id)
  print(story)
```
