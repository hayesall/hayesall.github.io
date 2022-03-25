---
layout: article
title: "nuMoM2b-preprocessing"
date: 2019-08-12
excerpt: >-
  Preprocessing scripts to create reproducible partitions of the nuMoM2b data set.
categories: software
github-url: https://github.com/hayesall/nuMoM2b_preprocessing
tags: ["Miscellaneous"]
primary-language: python
---

## Overview

**{{ page.title }}**: {{ page.excerpt }}

- **Source Code**: [{{ page.github-url }}]({{ page.github-url }})

---

## Motivation

I was pretty involved in the Precision Health Initiative, nuMoM2b project, and follow-up
Hoosier Moms Cohort study.

I immediately ran into a problem where there were tens of thousands of variables
and it wasn't obvious whether colleagues were using the same variables or the same preprocessing
steps.

What I wanted was a simple domain-specific language (DSL) to describe where CSV files were
stored, what variables I wanted out of them, and how to merge them into a single design matrix.
It never evolved beyond the JSON representation, but I found this extremely helpful.

<figure class="half">
<img style="max-height: 400px;" src="/images/software/numom2b-preprocessing/config_file_image.png" alt="A JSON file showing a path to CSV files, a set of target variables, and a set of files where other variables are defined.">
<img style="max-height: 400px;" src="/images/software/numom2b-preprocessing/nuMoM2b_preprocessing_architecture.png" alt="High-level architecture of the preprocessing stages. Data and a config file are turned into a final dataframe, and information about each step gets logged to a file.">
</figure>
