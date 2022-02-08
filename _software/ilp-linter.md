---
layout: article
title: "Relational Data Linter"
date: 2021-08-24
excerpt: >-
  A grammar and linter to check that relational or
  inductive logic programming datasets
  meet standards.
categories: software
github-url: https://github.com/srlearn/linter/
documentation:
  latest: https://srlearn.github.io/linter/
tags: ["Statistical Relational Learning"]
primary-language: go
---

## Overview

**{{ page.title }}**: {{ page.excerpt }}

[![Test Parsing](https://github.com/srlearn/linter/actions/workflows/package-test.yml/badge.svg)](https://github.com/srlearn/linter/actions/workflows/package-test.yml)

- **Source Code**: [{{ page.github-url }}]({{ page.github-url }})
- **Documentation (Latest)**: [{{ page.documentation.latest }}]({{ page.documentation.latest }})

## Download

Precompiled binaries are listed on the
[GitHub Releases page](https://github.com/srlearn/linter/releases).

The latest version can be downloaded with these links:

| Platform | Link |
| :--- | :--- |
| Linux/amd64 | [Download](https://github.com/srlearn/linter/releases/latest/download/linter-linux-amd64) |
| macOS/amd64 | [Download](https://github.com/srlearn/linter/releases/latest/download/linter-darwin-amd64) |
| Windows/amd64 | [Download](https://github.com/srlearn/linter/releases/latest/download/linter-windows-amd64.exe) |

## Usage

**Example 1: No Errors**

When the dataset is well-formatted, nothing is returned.

Here are the contents of `pos1.txt`

```prolog
smokes(person1).
friends(person1,person2).
friends(person2,person1).
```

Running the linter produces no output&mdash;no issues are found.

```bash
./linter -tokens -file=examples/pos/pos1.txt
./linter -file=examples/pos/pos1.txt
# (No output for either case)
```

**Example 2: Bad Data**

When there is something in the data that cannot be recognized, problems
are directed to stderr.

Here's a file called `neg1.txt`:

```prolog
friends(person1,person2).
Bad Data.
```

This file cannot be properly tokenized or parsed.

```bash
$ ./linter -tokens -file=examples/neg/neg1.txt
line 2:0 token recognition error at: 'B'
line 2:3 token recognition error at: ' '
line 2:4 token recognition error at: 'D'

$ ./linter -file=examples/neg/neg1.txt
line 2:0 token recognition error at: 'B'
line 2:3 token recognition error at: ' '
line 2:4 token recognition error at: 'D'
line 2:5 missing '(' at 'ata'
line 2:8 mismatched input '.' expecting {')', ','}
```

**Example 3: Regression Examples**

The parser can also look for `regressionExample` values, used in regression
data sets.

The parser **will not** check whether an *entire* dataset is correct
(`regressionExample` in labeled as positive, empty negative examples, and
facts). But this could be accomplished fairly easily elsewhere.

```prolog
regressionExample(medv(id100),33.2).
regressionExample(medv(id101),27.5).
regressionExample(medv(id10),18.9).
regressionExample(medv(id102),26.5).
```

## Build from Source

Building requires a [Go compiler](https://golang.org/).

```bash
cd cmd
go build
```

A copy of the generated ANTLR parser files are committed to the repository,
and rebuilding them requires an [ANTLR Parser Generator](https://www.antlr.org/).

```bash
make clean
make linter
```

## Limitations

This grammar is extremely conservative currently: the only tokens
allowed are lowercase characters, integers, and underscores.

```prolog
a(x_1,y_1).
b(x_1).
```

## Contributions

- [Alexander L. Hayes](https://hayesall.com) - *Indiana University, Bloomington*

Some ideas were taken from the `FOPC_MLN_ILP_Parser` developed by
Jude Shavlik and Trevor Walker (and possibly contributed to by many others
who went unnamed in the source code). There are a few versions of their
Tokenizers
([StreamTokenizerJWS](https://github.com/hayesall/SRLBoost/blob/master/src/main/java/edu/wisc/cs/will/FOPC_MLN_ILP_Parser/StreamTokenizerJWS.java)
and
[StreamTokenizerTAW](https://github.com/hayesall/SRLBoost/blob/master/src/main/java/edu/wisc/cs/will/FOPC_MLN_ILP_Parser/StreamTokenizerTAW.java))
and [Parser](https://github.com/hayesall/SRLBoost/blob/master/src/main/java/edu/wisc/cs/will/FOPC_MLN_ILP_Parser/FileParser.java)
currently used in other projects.