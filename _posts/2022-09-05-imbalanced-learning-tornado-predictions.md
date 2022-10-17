---
layout: article
title: "Imbalanced Learning and Tornado Prediction in the 1880s"
description: "WIP."
date: 2022-09-05
excerpt: >-
  WIP.
categories: blog
tags: ["machine-learning"]
comments: true
image:
  teaser: teaser/create_ml_datasets_teaser.jpg
  feature: feature/bn-rule-extraction.png
---

The year is 1884.

The United States is twenty years out of the Civil War and facing a difficult time at Reconstruction. There are thirty-eight states in the Union and a handful of territories; with Alaska being the newest. Alaska becomes "[The District of Alaska](https://en.wikipedia.org/wiki/District_of_Alaska)," having previously been designated a strategic military area but now having a notable enough population size to establish a civil government in the area. Grover Cleveland is elected as the 22nd Presiden of the United States after defeating James G. Blaine in the Election of 1884.[^2] The Washington Monument is completed.[^3] Mark Twain puts the finishing touches on "*The Adventures of Huckleberry Finn*" and publishes it in the UK and Canada[^4]—later, Ernest Hemingway would later describe this event as the demiurge of all modern American literature.[^5]

Less well-known was a young army seargant named Finley. He publishes an article in the [American Meteorology Journal](https://archive.org/details/pub_american-meteorological-journal)[^1] that he's divided these United States into thirteen regions of similar size, and developed a tornado prediction model that achieves 97% accuracy when deployed in a real-world setting.

## Development

I've been reading a fair amount on ROC curves recently, specifically their development and the problems they aimed to solve in prediction tasks. John Swet's collection on ROC curves detailed some of the history of prediction problems, and he mentioned a case study that I couldn't believe had never come up in any of my readings on imbalanced machine learning or imbalanced learning.

[^1]: asdf [American Meteorological Journal 1884-07: Volume 1 Issue 3](https://archive.org/details/sim_american-meteorological-journal_1884-07_1_3/page/84/mode/2up)

[^2]: https://en.wikipedia.org/wiki/1884_United_States_presidential_election

[^3]: https://en.wikipedia.org/wiki/Washington_Monument

[^4]: https://en.wikipedia.org/wiki/Adventures_of_Huckleberry_Finn

[^5]: https://www.jstor.org/stable/41999953
