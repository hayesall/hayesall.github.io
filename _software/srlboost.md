---
layout: article
title: "SRLBoost"
date: 2020-10-27
excerpt: >-
  ⚡ Fast implementations of boosted relational
  dependency networks and Markov logic networks.
categories: software
github-url: https://github.com/srlearn/SRLBoost
tags: ["Statistical Relational Learning"]
primary-language: java
---

## Overview

**{{ page.title }}**: {{ page.excerpt }}

- **Source Code**: [{{ page.github-url }}]({{ page.github-url }})

## Getting Started

SRLBoost can be built as a maven package. For example, on Windows:

```
git clone https://github.com/srlearn/SRLBoost.git
cd .\SRLBoost\
mvn package
```

Then learning should feel familiar if you're familiar with other
distributions like BoostSRL. After switching out `X.Y.Z`
with the latest version:

```
java -jar .\target\srlboost-X.Y.Z-jar-with-dependencies.jar -l -train .\data\Toy-Cancer\train\ -target cancer
```

Full notes are available with the repository: [https://github.com/srlearn/SRLBoost#getting-started](https://github.com/srlearn/SRLBoost#getting-started)

---

## Motivation

- I was one of the main people behind releasing
  "[BoostSRL](https://starling.utdallas.edu/software/boostsrl/),"
  but wanted to go in a different direction with the software.
- At one point there was discussion around developing a
  "[BoostSRL-Lite](https://github.com/starling-lab/BoostSRL-Lite/)"
  implementation. But this didn't really go anywhere (and as you'll see
  in the benchmark, it wasn't very "lite").

SRLBoost aims to be a small and fast core&mdash;not to implement every
possible feature.

---

## Benchmarks

### Size Comparison

"BoostSRL-Lite" cut around 6,000 lines of Java out of "BoostSRL."

"SRLBoost" cut close to *50,000* lines of code.

<figure>
<img src="/images/software/srlboost/lines_of_code_graph.png">
<caption>This graph was made at SRLBoost commit <code><a href="https://github.com/srlearn/SRLBoost/tree/cb952a486c57b0fdaee53a10e25a689f7951e6b4">cb952a4</a></code>, BoostSRL-Lite commit <code><a href="https://github.com/starling-lab/BoostSRL-Lite/tree/e198b76ef621241499964110ebdd761cd5461df7">e198b76</a></code>, and BoostSRLv1.1.1 at commit <code><a href="https://github.com/starling-lab/BoostSRL/tree/4f0ad2bc0fba8bb17033df324bc60052000f6b09">4f0ad2b</a></code>. Lines of code were measured with <a href="https://github.com/AlDanial/cloc"><code>cloc-1.84</code></a>, and Java files in each source directory were counted.</caption>
</figure>

---

### Time Comparison

- "BoostSRL" and "BoostSRL-Lite" are nearly indistinguishable
  in terms of runtime
- "SRLBoost" is at least twice as fast

The following diagram compares the learning time (in seconds)
for the three implementations on three benchmark datasets.
On larger datasets like `imdb`, SRLBoost took an average of 5 seconds
while the other two implementations took close to 20 seconds:

<figure>
<img src="/images/software/srlboost/speed_test.png">
<caption>Each of these datasets has 4-5 cross validation folds. This measured the amount of time that it took to learn a boosted relational dependency network on each fold. This procedure repeated 10 times, and the 40-50 runs for each method were averaged to estimate average learning time. The "box-and-whisker" plots show median runtime, interquartile range for how much the total learning time varied, and uses diamonds to show outliers. SRLBoost (blue) is always the fastest.</caption>
</figure>

On large datasets with lots of relations (like `cora`), this difference is even
more pronounced. SRLBoost is so much faster that it's difficult to
visualize the difference on a linear scale:

<figure>
<img src="/images/software/srlboost/cora_speed_test.png">
<caption>The tiny bar on the left shows that the average SRLBoost time for cora is around 17 seconds, compared to 270 seconds for BoostSRL and BoostSRL-Lite.</caption>
</figure>

---

### Are there any downsides?

Metrics are indistinguishable on the first three datasets.
But on the `cora` benchmark, being 15x faster also led to
differences in some key metrics. Specifically,
AUC-ROC decreased by 0.04 and AUC-PR decreased by 0.01.

BoostSRL-v1.1.1 appeared to have significantly worse F1
compared to the other two implementations, but it's
unclear why.[^possibly-a-bug]

| **Implementation** | **cora mean AUC ROC** | **cora mean AUC PR** | **cora mean CLL** | **cora mean F1** |
| :--- | :---: | :---: | :---: | :---: |
| SRLBoost | 0.61 | 0.93 | -0.27 | 0.96 |
| BoostSRL-Lite | 0.65 | 0.94 | -0.29| 0.96 |
| BoostSRLv1.1.1 | 0.65 | 0.94 | -0.29 | 0.78 |

[^possibly-a-bug]: My best guess is that this is a bug introduced when thresholding changed between v1.0 and v1.1 (See commit [5a91ba0](https://github.com/starling-lab/BoostSRL/commit/5a91ba03e8cf3b52184c740419ab56b0b6a5b8d2)). If this *is* this case, there's might exist a *threshold* setting that makes these two the same.

## Conclusion

I'm implementing this as the core for [`srlearn`](/software/srlearn/), so most of the user interfaces
for using SRLBoost are documented there.
