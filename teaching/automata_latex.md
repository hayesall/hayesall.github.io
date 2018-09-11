---
layout: post
title: "Cheatsheet for Automata in LaTeX"
description: A handy list of methods that I have found useful when preparing automata example in LaTeX.
date: 2018-09-10
excerpt: This excerpt describes automata.
---

Some form of "Automata Theory" or "Introductory Theory of Computation" is common toward the end of an undergraduate degree in computer science.

This short guide will help you get started drawing

## Getting Started

Choose one from each of the following:

* Online Editor or Offline Editor?

Online Editors:

* [Overleaf](https://www.overleaf.com/)
* [LaTeX Base (scidock)](https://latexbase.com/)
* [Papeeria](https://papeeria.com/)

Offline Editors:

* Windows, Mac, or Linux?

## Typesetting Math

`amsfonts`, `amssymb`, and `amsmath` are the three packages that are almost always required for typesetting math.

```latex
\usepackage{amsfonts}
\usepackage{amssymb}
\usepackage{amsmath}
```

## Finite Automata

The [TikZ and PGF Manual](https://www.bu.edu/math/files/2013/08/tikzpgfmanual.pdf#section.19) is a great reference for the automata

`tikz` is a useful library for drawing both deterministic and nondeterministic Finite Automata

```latex
% Package for drawing Finite Automata
\usepackage{tikz}
\usetikzlibrary{arrows,automata,positioning}
```

The following example encodes a  nondeterministic finite automata:

```latex
\begin{center}
\begin{tikzpicture}[shorten >=1pt,node distance=2cm,on grid,auto]
    \node[state,initial,accepting]  (q_0)                   {$q_0$};
    \node[state]                    (q_1) [right=of q_0]    {$q_1$};
    \node[state,accepting]          (q_2) [right=of q_1]    {$q_2$};

    \path[->]
    (q_0) edge              node {0}    (q_1)
          edge [loop above] node {0,1}  (   )
    (q_1) edge [bend left]  node {1}    (q_2)
    (q_2) edge [loop above] node {0,1}  (   )
          edge [bend left]  node {0}    (q_1);

\end{tikzpicture}
\end{center}
```

Another example which creates a deterministic finite automata.

```latex
\begin{center}
\begin{tikzpicture}[shorten >=1pt,node distance=2cm,auto]
    \node[state,initial,accepting] (A)                   {$A$};
    \node[state]                   (B) [right of=A]      {$B$};
    \node[state]                   (C) [below left of=B] {$C$};

    \path[->]
    (A) edge              node {1} (B)
        edge [loop above] node {0} ( )
    (B) edge              node {1} (C)
        edge [loop above] node {0} ( )
    (C) edge              node {1} (A)
        edge [loop below] node {0} ( );
\end{tikzpicture}
\end{center}
```

## Grammars

```latex
% Package for helping with Context free Grammars
\usepackage{listings}
\lstset{
    basicstyle=\itshape,
    xleftmargin=3em,
    literate={->}{$\rightarrow$}{2}
             {epsilon}{$\varepsilon$}{1}
}
```
