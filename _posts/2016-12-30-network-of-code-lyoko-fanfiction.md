---
layout: post
title: "Network of Code Lyoko FanFiction"
description: Network of Code Lyoko Fanfiction from FanFiction.net and a search engine to explore it.
date: 2016-12-30
---

Well. Finally got around to putting this old website together. Neat thing about it - powered by [Jekyll](http://jekyllrb.com) and I can use Markdown to author my posts. It actually is a lot easier than I thought it was going to be.

[Full documentation on GitHub](https://github.com/batflyer/CLFanfictionSearchEngine)

``` python
def hello(args*):
  print('Hello World!')
```

{% highlight python %}
def hello(args*):
  print("Hello World!")
{% endhighlight %}

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