---
layout: article
title: "Malicious .exe Detection"
date: 2016-12-08
excerpt: >-
  Using classifiers to determine whether a Windows portable executable file (.exe) is malicious or benign.
categories: software
github-url: https://github.com/hayesall/MaliciousPortableExecutableDetection
tags: ["Course Projects"]
primary-language: python
---

## Overview

**{{ page.title }}**: {{ page.excerpt }}

- **Source Code**: [{{ page.github-url }}]({{ page.github-url }})

A ["Portable Executable"](https://en.wikipedia.org/wiki/Portable_Executable) is a file format used for installation on the Windows operating system (32-bit and 64-bit systems), most commonly known for the `.exe` file format.  This program trains a classifier using [scikit-learn](http://scikit-learn.org/stable/), writing pickle files for the classifier and features.  This model can then be used to classify PE files, outputting "malicious" or "clean."

## Usage

- `python learnmodel.py [model]`

  1. model can be: AdaBoost, DecisionTree, GNB, GradientBoosting, KNN, RandomForest, NONE
  2. specifying `NONE` as the model will train all of them before selecting whichever has the highest precision.

- Manual:
  1. `python checkfile.py exe-dir/[file]`
  2. `for file in exe-dir/*; do python checkfile.py $file; done`

- Automatic: `./verify.sh`

## Observations

In practice, there's a lot of variance. I applied the models to some common files, and got mixed results.
This was interesting to try, but signature-based methods for finding malicious programs are probably the
way to go still.
