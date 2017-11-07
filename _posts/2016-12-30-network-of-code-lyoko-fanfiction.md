---
layout: post
title: "Network of Code Lyoko FanFiction"
description: Network of Code Lyoko Fanfiction from FanFiction.net and a search engine to explore it.
date: 2016-12-30
---

This was originally part of a final project for Search Information, but my fascination with network visualization cropped up here and I thought it was worth sharing. This is a condensed version of the [full article](https://batflyer.github.io/CLFanFictionSearchEngine), and naturally the code is available on [GitHub](https://github.com/batflyer/CLFanFictionSearchEngine).

<img src="https://raw.githubusercontent.com/batflyer/CLFanfictionSearchEngine/master/media/directed-fanfiction-graph.jpg" style="display: block; margin: auto;">

In "fanfic world" there are users and stories. Users can review fanfics and write fanfics. Each of these are shown with a directed edge: stories point to their authors, authors point to their stories, and readers point to stories they reviewed. The challenge is to decide which fanfics are relevant based on keywords, and which fanfics are most popular based on PageRank.

{% highlight python linenos %}
'''
do block comments work?
'''
import os
import random
import re

# Define a short class for raising exceptions to help with debugging.

class ExceptionCase(Exception):
    def handle(self):
        print(self.message)

# Setup: parse the commandline input, perform checks, and import/parse the specified file.

class Setup:
    
    def __init__(self):

        self.diagram_file = None # The diagram we're walking.
        self.verbose = False     # -v, --verbose
        self.nowalk = False      # -n, --nowalk
        self.walk = True         # -w, --walk
        self.shortest = False    # -s, --shortest
        self.exhaustive = False  # -p, --exhaustive
        self.random = False      # -r, --random
        self.randomwalk = False  # -rw, --randomwalk
        self.Nfeatures = None    # -n, --number
        
{% endhighlight %}
