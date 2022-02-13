---
layout: article
title: "ExportPublic.jl"
date: 2019-08-07
excerpt: >-
  Julia macro for people who prefer declaring public/private
  scoping with syntactic sugar.
categories: software
github-url: https://github.com/hayesall/ExportPublic.jl
tags: ["Miscellaneous"]
primary-language: julia
---

## Overview

**{{ page.title }}**: {{ page.excerpt }}

- **Source Code**: [{{ page.github-url }}]({{ page.github-url }})

---

## Motivation

I made a post on StackOverflow about whether Julia supported
[syntax for automatically exporting certain functions in modules](https://stackoverflow.com/questions/67548496/syntax-to-automatically-export-functions-in-a-julia-module).

Python distinguishes between weak public and private scoping by
prefacing symbols with an underscore (`_`). The reply I received
suggested a package called `ExportAll.jl`, but I wanted
something with syntactic sugar:

```julia
module SimpleMathExample
  using ExportPublic

  _secret_pi = 22/7                         # Private
  my_pi = _secret_pi                        # Public

  function add_squared(a::Int, b::Int)      # Public
    _squared(a) + _squared(b)
  end

  function _squared(a::Int)                 # Private
    a ^ 2
  end

  @exportPublic()                           # <--- Export our Public symbols
end
```

And using this automatically handles exporting symbols:

```julia
julia> include("SimpleMathExample.jl")
julia> using .SimpleMathExample
julia> add_squared(5, 5)
50
julia> my_pi
3.142857142857143
julia> _secret_pi
ERROR: UndefVarError: _secret_pi not defined
julia> _squared(5)
ERROR: UndefVarError: _squared not defined
```

I've found having something like this to be helpful during development.
