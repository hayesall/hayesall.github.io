---
layout: article
title: "LaTeX Finite Automata and State Diagrams with Tikz"
description: Methods for creating automata and finite state machine diagrams in LaTeX.
date: 2017-12-02
excerpt: This short guide collects some examples of drawing finite state machines using the Tikz LaTeX library.
categories: blog
tags: ["automata"]
comments: true
redirect_from:
  - /latex-automata/
image:
  teaser: teaser/automata_teaser.png
  feature: feature/automata_finite_state_diagrams.png
  text: "LaTeX Finite Automata with Tikz"
---

When I was TA'ing for Automata Theory, the in-browser finite-state machine creators I found tended to feel either a bit restricted or unable to generate high-quality automata images. Lo and behold, LaTeX already had a package which produced diagrams from a description.

This short guide includes some examples for creating finite state automata using LaTeX and `tikz`. For something more in-depth, the [TikZ and PGF Manual](https://www.bu.edu/math/files/2013/08/tikzpgfmanual.pdf#section.19) chapter is a great reference.

## Finite Automata

`tikz` is a great package for drawing both deterministic and nondeterministic Finite Automata. The `arrows`, `automata`, and `positioning` libraries used in conjunction provide all we should need.

```latex
\usepackage{tikz}
\usetikzlibrary{arrows,automata,positioning}
```

Let's start with four examples that illustrate some of the languages regular languages can represent. The empty set can be recognized by many machines, but the final state is always an empty set.

<div style="overflow: auto">
$$ \emptyset = \Big( Q = \{ s_0\}, \Sigma = \{ 0, 1\}, \delta = \begin{bmatrix}s_0, s_0\end{bmatrix}, q_0 = s_0, F = \{ \} \Big) $$
</div>

<div class="row">
  <div class="column">
  <img src="/images/blog/latex-automata/empty.png" style="display: block; margin-left: auto; margin-right: auto;">
  </div>
  <div class="column">
  <div class="language-latex highlighter-rouge"><pre class="highlight"><code><span class="c">% { }</span>
<span class="nt">\begin{tikzpicture}</span>[shorten &gt;=1pt,node distance=2cm,on grid,auto]
  <span class="k">\tikzstyle</span><span class="p">{</span>every state<span class="p">}</span>=[fill=<span class="p">{</span>rgb:black,1;white,10<span class="p">}</span>]

  <span class="k">\node</span><span class="na">[state,initial]</span> (s<span class="p">_</span>0)  <span class="p">{$</span><span class="nb">s</span><span class="p">_</span><span class="m">0</span><span class="p">$}</span>;

  <span class="k">\path</span><span class="na">[-&gt;]</span>
  (s<span class="p">_</span>0) edge  [loop above]  <span class="p">{</span>0,1<span class="p">}</span> ( );
<span class="nt">\end{tikzpicture}</span>
  </code></pre>
  </div>
  </div>
</div>

---

The natural opposite of a machine that accepts nothing is a machine which accepts everything. By the same logic as before, all automata where Q equals F will recognize this language.

<div style="overflow: auto">
$$ \{ 0, 1\}^* = \Big( Q = \{ s_0 \}, \Sigma = \{ 0, 1 \}, \delta = \begin{bmatrix} s_0, s_0 \end{bmatrix}, q_0 = s_0, F = \{ s_0 \} \Big)$$
</div>

<div class="row">
  <div class="column">
  <img src="/images/blog/latex-automata/01star.png" style="display: block; margin-left: auto; margin-right: auto;">
  </div>
  <div class="column">
  <div class="language-latex highlighter-rouge"><pre class="highlight"><code><span class="c">% {0,1}*</span>
<span class="nt">\begin{tikzpicture}</span>[shorten &gt;=1pt,node distance=2cm,on grid,auto]
  <span class="k">\tikzstyle</span><span class="p">{</span>every state<span class="p">}</span>=[fill=<span class="p">{</span>rgb:black,1;white,10<span class="p">}</span>]

  <span class="k">\node</span><span class="na">[state,initial,accepting]</span> (s<span class="p">_</span>0)  <span class="p">{$</span><span class="nb">s</span><span class="p">_</span><span class="m">0</span><span class="p">$}</span>;

  <span class="k">\path</span><span class="na">[-&gt;]</span>
  (s<span class="p">_</span>0) edge  [loop above]  <span class="p">{</span>0,1<span class="p">}</span> ( );
<span class="nt">\end{tikzpicture}</span>
  </code></pre>
  </div>
  </div>
</div>

---

## Positioning Nodes on the Grid

Now that we've seen the two languages which can be expressed with a single state, we turn our focus to those which require two or more states.

The next two languages represent `ε` and `{0,1}+`. Respectively these correspond to "the language of strings containing nothing" and "the language of strings containing something". From these images it is also worth noticing that they are inverses of one another.

These examples use a position parameter to show that `s_1` should be positioned to the `right of=s_0`.

<div style="overflow: auto">
$$ \{ \epsilon \} = \Big( Q = \{ s_0, s_1 \}, \Sigma = \{ 0, 1\}, \delta = \begin{bmatrix} s_1, s_1 \\ s_1, s_1\end{bmatrix}, q_0 = s_0, F = \{ s_0 \} \Big)$$
</div>


<div class="row">
  <div class="column">
  <img src="/images/blog/latex-automata/epsilon.png" style="display: block; margin-left: auto; margin-right: auto;">
  </div>
  <div class="column">
  <div class="language-latex highlighter-rouge"><pre class="highlight"><code><span class="c">% { \epsilon }</span>
<span class="nt">\begin{tikzpicture}</span>[shorten &gt;=1pt,node distance=2cm,on grid,auto]
  <span class="k">\tikzstyle</span><span class="p">{</span>every state<span class="p">}</span>=[fill=<span class="p">{</span>rgb:black,1;white,10<span class="p">}</span>]

  <span class="k">\node</span><span class="na">[state,initial,accepting]</span>  (s<span class="p">_</span>0)                 <span class="p">{$</span><span class="nb">s</span><span class="p">_</span><span class="m">0</span><span class="p">$}</span>;
  <span class="k">\node</span><span class="na">[state]</span>                    (s<span class="p">_</span>1) [right of=s<span class="p">_</span>0]  <span class="p">{$</span><span class="nb">s</span><span class="p">_</span><span class="m">1</span><span class="p">$}</span>;

  <span class="k">\path</span><span class="na">[-&gt;]</span>
  (s<span class="p">_</span>0) edge                node <span class="p">{</span>0,1<span class="p">}</span>  (s<span class="p">_</span>1)
  (s<span class="p">_</span>1) edge  [loop above]  node <span class="p">{</span>0,1<span class="p">}</span>  ();
<span class="nt">\end{tikzpicture}</span>
</code></pre>
</div>
</div>
</div>

---

<div style="overflow: auto">
$$ \{ 0, 1 \}^+ = \Big( Q = \{ s_0, s_1 \}, \Sigma = \{ 0, 1 \}, \delta = \begin{bmatrix} s_1, s_1 \\ s_1, s_1 \end{bmatrix}, q_0 = s_0, F = \{ s_1 \} \Big)$$
</div>





<div class="row">
  <div class="column">
  <img src="/images/blog/latex-automata/01plus.png" style="display: block; margin-left: auto; margin-right: auto;">
  </div>
  <div class="column">
  <div class="language-latex highlighter-rouge"><pre class="highlight"><code><span class="c">% { 0,1 }+</span>
<span class="nt">\begin{tikzpicture}</span>[shorten &gt;=1pt,node distance=2cm,on grid,auto]
  <span class="k">\tikzpicture</span><span class="p">{</span>every state<span class="p">}</span>=[fill=<span class="p">{</span>rgb:black,1;white,10<span class="p">}</span>]

  <span class="k">\node</span><span class="na">[state,initial,accepting]</span>  (s<span class="p">_</span>0)                 <span class="p">{$</span><span class="nb">s</span><span class="p">_</span><span class="m">0</span><span class="p">$}</span>;
  <span class="k">\node</span><span class="na">[state]</span>                    (s<span class="p">_</span>1) [right of=s<span class="p">_</span>0]  <span class="p">{$</span><span class="nb">s</span><span class="p">_</span><span class="m">1</span><span class="p">$}</span>;

  <span class="k">\path</span><span class="na">[-&gt;]</span>
  (s<span class="p">_</span>0) edge                node <span class="p">{</span>0,1<span class="p">}</span>  (s<span class="p">_</span>1)
  (s<span class="p">_</span>1) edge  [loop above]  node <span class="p">{</span>0,1<span class="p">}</span>  ();
<span class="nt">\end{tikzpicture}</span>
</code></pre>
</div>
  </div>
</div>

---

## Arcs as Edges

As automata grow more complicated, it's beneficial to have control over placement of both the nodes and the edges.

This example (Figure 1.4 from *Sipser (3rd Edition)*) uses `right of=` for positioning the nodes, but edges on the path all either loop above a node or bend left.

<img src="/images/blog/latex-automata/three_state.png" style="display: block; margin-left: auto; margin-right: auto;">

```latex
\begin{tikzpicture}[shorten >=1pt,node distance=2cm,on grid,auto]
  \tikzstyle{every state}=[fill={rgb:black,1;white,10}]

    \node[state,initial]   (q_1)                    {$q_1$};
    \node[state,accepting] (q_2)  [right of=q_1]    {$q_2$};
    \node[state]           (q_3)  [right of=q_2]    {$q_3$};

    \path[->]
    (q_1) edge [loop above] node {0}    (   )
          edge [bend left]  node {1}    (q_2)
    (q_2) edge [bend left]  node {0}    (q_3)
          edge [loop above] node {1}    (   )
    (q_3) edge [bend left]  node {0,1}  (q_2);
\end{tikzpicture}
```

Finally, this example (Figure 1.12 From *Sipser (3rd Edition)*) puts together all of the pieces seen so far: positioning nodes on the grid, loops, and directed edges.

<img src="/images/blog/latex-automata/begin_end_same_letter.png" style="display: block; margin-left: auto; margin-right: auto;">

```latex
\begin{tikzpicture}[shorten >=1pt,node distance=2cm,auto]
  \tikzstyle{every state}=[fill={rgb:black,1;white,10}]

  \node[state,initial]   (s)                      {$s$};
  \node[state,accepting] (q_1) [below left of=s]  {$q_1$};
  \node[state]           (q_2) [below of=q_1]     {$q_2$};
  \node[state,accepting] (r_1) [below right of=s] {$r_1$};
  \node[state]           (r_2) [below of=r_1]     {$r_2$};

  \path[->]
  (s)   edge              node {a} (q_1)
        edge              node {b} (r_1)
  (q_1) edge [loop left]  node {a} (   )
        edge [bend left]  node {b} (q_2)
  (q_2) edge [loop left]  node {b} (   )
        edge [bend left]  node {a} (q_1)
  (r_1) edge [loop right] node {b} (   )
        edge [bend left]  node {a} (r_2)
  (r_2) edge [loop right] node {a} (   )
        edge [bend left]  node {b} (r_1);
\end{tikzpicture}
```
