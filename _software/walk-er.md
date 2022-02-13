---
layout: article
title: "Walk-ER"
date: 2017-12-04
excerpt: >-
  A tool for converting Entity-Relationship Diagrams
  (ERDs) into search constraints.
categories: software
github-url: https://github.com/hayesall/Walk-ER
tags: ["Statistical Relational Learning"]
primary-language: python
---

## Overview

**{{ page.title }}**: {{ page.excerpt }}

- **Source Code**: [{{ page.github-url }}]({{ page.github-url }})

---

## Motivation

Goals are discussed more on the [Walk-ER publication page](/publications/construction-background-knowledge/).

Briefly: people frequently observe that "*modes*" are one of the trickiest
parts in relational learning.
We showed that there's a similar representation for them in terms of
Entity-Relationship Diagrams (ERDs), and that if a user labels which
features are important in the digram, then there is a simple search algorithm
that can convert them into a set of modes. Furthermore, modes produced this way
seem to perform pretty well on benchmark problems.

Walk-ER uses a simple representation for ERDs:

```
Nodes: {Course=EntityNodeStyle, courseprof=RelationNodeStyle, Person=EntityNodeStyle, Proj=EntityNodeStyle, courseta=RelationNodeStyle, faculty=AttributeNodeStyle, project=RelationNodeStyle, sameperson=RelationNodeStyle}
Edges: {Person|sameperson=RelationEdge, courseprof|Course=RelationEdge, Person|courseta=RelationEdge, courseta|Course=RelationEdge, project|Proj=RelationEdge, Person|courseprof=RelationEdge, sameperson|Person=RelationEdge, Person|faculty=AttributeEdge, Person|project=RelationEdge}
Important: [courseprof, project, courseta, sameperson]
Target: faculty
RelatedEntities: {courseta=[Course, Person], courseprof=[Course, Person], project=[Person, Proj], sameperson=[Person]}
AttributeEntityMapping: {faculty=Person}
```

and then converts user preferences into the modes in a background file.
