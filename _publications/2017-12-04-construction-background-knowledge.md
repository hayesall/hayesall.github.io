---
layout: article
title: "User Friendly Automatic Construction of Background Knowledge: Mode Construction from ER Diagrams"
date: 2017-12-04
excerpt: >-
  Inductive Logic Programming systems allow domain experts to provide
  background knowledge to constrain to search space of hypotheses. This
  machine learning interface includes an algorithm for translating these
  constraints from Entity-Relationship Diagrams.
image:
  teaser: /publications/kcap2017_hayes_user_friendly.png
---

{% include toc.html %}

# Where to Read

- [Read the Paper Online](https://starling.utdallas.edu/assets/pdfs/KCAP17Mode.pdf)
- [Download a .pdf](https://github.com/starling-lab/Walk-ER/raw/master/TeX_src/UserFriendlyAutomatedConstructionOfBackgroundKnowledge.pdf)
- [Explore Further on GitHub](https://github.com/starling-lab/Walk-ER/)

# Overview: Modes Made Easy

<figure class="half">
  <img src="https://raw.githubusercontent.com/starling-lab/Walk-ER/master/TeX_src/images/baseERD2.png" />
  <img class="faded faded-bottom" src="https://raw.githubusercontent.com/starling-lab/Walk-ER/master/TeX_src/images/baseERD2directed.png" />
  <figcaption>
    Annotated entity-relationship diagrams suggesting that the Tenure status of a Professor is related to the grades of students they advise and teach.
  </figcaption>
</figure>

*Modes* are a way of way of expressing knowledge about the relationships
between entities. Something similar to them is used in various relational
reasoning and probabilistic logic learning frameworks in order to
*constrain the search space* for possible hypotheses.

Perhaps you have social network data involving people, who they are friends
with, their smoking status, and whether they developed lung cancer. The
modes to describe their relationships would look like this:

```prolog
useStdLogicVariables: true.
setParam: treeDepth=4.
setParam: nodeSize=2.
setParam: numOfClauses=8.
mode: friends(+Person, -Person).
mode: friends(-Person, +Person).
mode: smokes(+Person).
mode: cancer(+Person).
bridger: friends/2.
```

Unless you're an expert in Inductive Logic Programming, it might not be
immediately obvious what these mean. The *key idea of this paper* is that
we can encode the same information using Entity Relationship Diagrams,
which should be familiar to anyone who has written SQL queries or is familiar
with relational databases.

This also allows a user to specify **Advice in terms of what variables will
(or will not) be useful for learning a relationship**, providing a means for
domain experts to encode their knowledge about the system.

# How to Cite

Alexander L. Hayes, Mayukh Das, Phillip Odom, and Sriraam Natarajan. 2017.
User Friendly Automatic Construction of Background Knowledge: Mode Construction
from ER Diagrams. In Proceedings of the Knowledge Capture Conference
(K-CAP 2017). ACM, New York, NY, USA, Article 30, 8 pages.
DOI: https://doi.org/10.1145/3148011.3148027

bibTeX:

```tex
@inproceedings{Hayes2017UserFriendly,
   author = {Hayes, Alexander L. and Das, Mayukh and Odom, Phillip and Natarajan, Sriraam},
   title = {User Friendly Automatic Construction of Background Knowledge: Mode Construction from ER Diagrams},
   booktitle = {Proceedings of the Knowledge Capture Conference},
   series = {K-CAP 2017},
   year = {2017},
   isbn = {978-1-4503-5553-7},
   location = {Austin, TX, USA},
   pages = {30:1--30:8},
   articleno = {30},
   numpages = {8},
   url = {http://doi.acm.org/10.1145/3148011.3148027},
   doi = {10.1145/3148011.3148027},
   acmid = {3148027},
   publisher = {ACM},
   address = {New York, NY, USA},
}
```