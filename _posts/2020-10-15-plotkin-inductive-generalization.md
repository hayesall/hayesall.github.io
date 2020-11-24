---
layout: article
title: "Revisiting 'A Note on Inductive Generalization'"
description: "Here I discuss Plotkin's 1970 paper on inductive generalization, an important paper in some portions of the programming languages and inductive logic programming communities."
date: 2020-11-23
excerpt: >-
  Here I discuss Gordon D. Plotkin's 1970 Machine Intelligence paper on inductive
  generalization, an important paper in some portions of the programming
  languages and inductive logic programming communities.
categories: blog
tags: ["machine-learning", "programming-languages", "symbolic-logic", "racket"]
comments: true
image:
  teaser: teaser/inductive-generalization.jpg
  feature: feature/inductive-generalization.jpg
---

Here I discuss Gordon D. Plotkin's 1970 *Machine Intelligence*[^1] paper on inductive
generalization, an important paper in some portions of the programming
languages and inductive logic programming communities.

```
Heating THIS bit of iron to 419°C caused it to melt.
Heating THAT bit of iron to 419°C caused it to melt.
```

Formalized as:

```racket
BitOfIron(bit1) ∧ heated(bit1, 419) ⟹ Melted(bit1)
BitOfIron(bit2) ∧ heated(bit2, 419) ⟹ Melted(bit2)
```

What is the generalization of this?

```racket
(x) BitOfIron(x) ∧ heated(x, 419) ⟹ Melted(x)
```

## Preliminaries

There are three concepts important for our implementation:

1. Terms: $$t, t_{1}, u, ...$$
2. Literals: $$L, L_{1}, M, ...$$
3. Clauses: $$D, D_{1}, D, ...$$
4. Functions and Predicates: $$\phi$$, or the negation of predicates

I find these pretty confusing, so I'll ground them in a specific example:

\\[
\color{orange}{P}(\color{blue}{f}(\color{magenta}{a}, \color{magenta}{b}), \color{blue}{g}(\color{magenta}{m}), \color{magenta}{y}, \color{blue}{h}(\color{blue}{g}(\color{magenta}{m}), \color{magenta}{n}))
\\]

- $$\color{orange}{\text{Literals}}$$ are denoted in Plotkin's notation by
  uppercase characters.
  Here there is only one literal: $$\color{orange}{P}$$.
- $$\color{magenta}{\text{Variables}}$$ shown with lowercase characters. They have
  no arguments.
- $$\color{blue}{\text{Functions}}$$ are usually shown with lowercase characters, and have
  zero or more parameters. Their parameters may be variables or other functions.
  $$\color{blue}{f}(\color{magenta}{a}, \color{magenta}{b})$$ is a function of
  two variables. $$\color{blue}{g}(\color{magenta}{m})$$ is a function of one
  variable.
  $$\color{blue}{h}(\color{blue}{g}(\color{magenta}{m}), \color{magenta}{n}))$$
  is a function of one function and one variable.

## Theorem 1

<figure>
  <img src="/images/blog/plotkin-inductive-generalization/theorem1.jpg" alt="The original theorem from the paper. Text reproduced below this image." style="display: block; margin-left: auto; margin-right: auto;">
</figure>

Every non-empty, finite set of words has a least generalization iff any two
words in the set are compatible.

Let $$W_{1}, W_{2}$$ be any two compatible words. The following algorithm
terminates at stage 3, and the assertion made there is then correct.

1. Set $$V_{i}$$ to $$W_{i}(i = 1, 2)$$. Set $$\varepsilon(i=1,2)$$.
   $$\varepsilon$$ is the empty substitution.
2. Try to find terms $$t_{1}, t_{2}$$ which have the same place in
   $$V_{1}, V_{2}$$ respectively and such that $$t_{1} \neq t_{2}$$ and either
   $$t_{1}, t_{2}$$ begin with different function letters or else at least one
   of them is a variable.
3. If there are no such $$t_{1}, t_{2}$$ then halt. $$V_{1}$$ is a least
   generalization of $$\lbrace W_{1}, W_{2} \rbrace$$ and
   $$V_{1} = V_{2}$$, $$V_{i} \epsilon_{i} = W_{i}(i=1, 2)$$.
4. Choose a variable $$x$$ distinct from any in $$V_{1}$$ or $$V_{2}$$ and
   wherever $$t_{1}$$ and $$t_{2}$$ occur in the same place in $$V_{1}$$
   and $$V_{2}$$, replace each by $$x$$.
5. Change $$\varepsilon_{i}$$ to $$\lbrace t_{i} \mid x \rbrace \varepsilon_{i}(i = 1, 2)$$.
6. Go to 2.

## Rewriting the imperative algorithm into a recursive one

This implements a solution in [Racket](https://racket-lang.org), a Lisp dialect
and language for implementing other languages.

### Designing a representation

We should start is by thinking through how our Literals, Functions, and
Variables will be represented. Choosing a representation will inform how we
think about implementing the algorithm. Since we're in a Lisp, something built
from
[S-expressions](https://en.wikipedia.org/wiki/S-expression)
(or [X-expressions](https://docs.racket-lang.org/txexpr/)) seems reasonable.
Our units are still $$\color{orange}{\text{Literals}}$$,
$$\color{magenta}{\text{Variables}}$$, and $$\color{blue}{\text{Functions}}$$;
so we'll be explicit and represent each as tagged lists.

```racket
(Variable "x")
(Function "f" ())
(Literal "P" ())
```

More complicated words may be composed from simple units. $$P(f(a, b), c)$$ is
written:

```racket
(Literal "P" ((Function "f" ((Variable "a") (Variable "b")) (Variable "c"))))
```

### 1. Base Case

What is the fastest way to exit the function `(antiunify W₁ W₂)`? Below I've
listed three function calls hinting at the answer.

```racket
(antiunify '() '())
(antiunify '(Literal "P" ()) '(Literal "P" ()))
(antiunify '(Variable "a") '(Variable "a"))
```

Plotkin suggests in step (3) that we should halt if we cannot find compatible
terms in the two words---returning $$V_{1}$$ instead.
Why $$V_{1}$$?
Why not $$V_{1}$$ and $$V_{2}$$?
Because $$V_{1}$$ and $$V_{2}$$ are equal at this point: they've been *generalized*.
Therefore we write our base case as:

```racket
(define (antiunify V₁ V₂)
  (cond
    ([equal? V₁ V₂] V₁)
    ; (else (antiunify ... ))))
```

This is all we need for the base case. The general form of the recursive call
will involve: (1) finding compatible terms, and (2) substituting those terms
for variables in the recursive call.

### 2. Finding Terms: Interpreting our Representation

We've represented our language as tagged lists, so we can model *finding terms*
as a series of simple subproblems.

```racket
(define (find-terms W₁ W₂)
  (match W₁
    [`(Literal  ,n ,args) ... ]
    [`(Function ,n ,args) ... ]
    [`(Variable ,n)       ... ]
    [(cons a d)           ... ]
    ['()                  ... ]))
```

Plotkin tells us we are searching for terms such that they:

1. occur in the same place in $$V_{1}, V_{2}$$,
2. are not equal: $$t_{1} \neq t_{2}$$,
3. begin with different function letters, or
4. at least one of them is a variable.

Case (1) will be handled for us by recursion as long as the two words are compatible.
The next easiest case to handle will be **Literals** since they fall outside of
any of these conditions. We pull off the *tag* and its *name*, then we continue
searching through the arguments for each word in our quest to find terms.

```racket
[`(Literal ,n ,args)
  (find-terms args (caddr W₂))]
```

**Functions** look similar to literals, so we'll handle them next. Based on
Case (3): functions can be terms if they begin with different function letters
but have the same argument. Otherwise we can continue searching for terms in
their arguments in the same way we did for literals.

```racket
[`(Function ,n ,args)

  ; If the names are unequal, but the arguments are the same:
  (if (and (not (equal? n (cadr W₂)))
           (equal? args (caddr W₂)))

      ; Return a structure with the compatible terms in each word.
      `(((Function ,n ,args) (Function ,(cadr W₂) ,(caddr W₂))))

      ; Otherwise, look for terms in the arguments of each Function.
      (find-terms args (caddr W₂)))]
```

**Variables** may be valid terms when they have different names. Otherwise,
we'll choose to return an empty list (for reasons that will make sense when we
discuss *cons* in a moment).

```racket
[`(Variable ,n)
  (if (not (equal? n (caddr W₂)))
      `(((Variable ,n) (Variable ,(cadr W₂))))
      '())]
```

The only things left in our match expression are cases for **cons** and
**empty list**. In the **cons** case, we can append the results of looking
for terms in the *car* and *cdr* of each word. If we see an **empty list**,
we'll return an empty list to allow the *append* to merge everything
together at the end of the recursion.

```racket
[`(cons a d)
  (append (find-terms a (car W₂)) (find-terms d (cdr W₂)))]
['() '()]
```

This completes our definition of `find-terms`. Let's look at a couple examples
before moving on to substitution.

Consider looking for potential terms in the words: $$P(x)$$ and $$P(y)$$:

```racket
> (find-terms
    '(Literal "P" ((Variable "x")))
    '(Literal "P" ((Variable "y"))))
'(((Variable "x") (Variable "y")))
```

Or looking for the two possibilities in the
words: $$P(m, f(x))$$, $$P(n, g(y))$$:

```racket
> (find-terms
    '(Literal "P" ((Variable "m") (Function "f" ((Variable "x")))))
    '(Literal "P" ((Variable "n") (Function "g" ((Variable "y"))))))
'(((Variable "m") (Variable "n")) ((Variable "x") (Variable "y")))
```

### 3. Substituting Terms with Variables

We've written a function that finds terms in two words. Now we need something
that takes takes a valid term $$t$$ in a word and replaces it with a
new variable. There are two subtleties here:

1. We need access to an infinite set of variables
  disjoint from the variables that occur in the words
  we are generalizing. The simplest way to draw on an infinite set of variables
  is to assume we can safely use the natural numbers $$\mathbb{N}$$ as names.
2. We do not want to perform the substitution in a
  *position where the terms are already equal*.
  Consider: $$P(x, f(x))$$ and $$P(x, g(y))$$, in the first
  word we want to substitute the $$x$$ in the body of $$f$$, but we do not
  want to replace the $$x$$ that is already equal to the $$x$$ in the other
  word. We can enforce this by giving the substitute function access to
  both words.

This gives us the following skeleton of a function:

```racket
(define (substitute V₁ V₂ t ℕ)
  (match V₁
    [`(Literal  ,n ,args) ... ]
    [`(Function ,n ,args) ... ]
    [`(Variable ,n)       ... ]
    [(cons a d)           ... ]
    ['()                  ... ]))
```

The pattern looks quite similar to what we just wrote for finding terms. Many
things that we did for finding terms will apply here as well. The **Literal**
case is the first example we'll see of this. In the `find-terms` function, we
removed the *tag* and the *name* before searching through the *args*---here
our goal is to return portions of the word unchanged:

```racket
[`(Literal ,n ,args)
  `(Literal ,n ,(substitute args (caddr V₂) t ℕ))]
```

### 4. Putting the pieces together in the recursive call

```racket
(define (antiunify W₁ W₂)
  (antiunify-helper W₁ W₂ 0))
```

```racket
(define (antiunify-helper V₁ V₂ ℕ)
  (cond
    [(equal? V₁ V₂) V₁]
    [else
      (let ((subst  (find-terms V₁ V₂)))
      (let ((subst₁ (caar subst)))
      (let ((subst₂ (cadar subst)))

      (antiunify-helper
        (substitute V₁ V₂ subst₁ ℕ)
        (substitute V₂ V₁ subst₂ ℕ)
        (add1 ℕ)))))]))
```

## Final Code

This gives us a reasonably-concise 52 lines of code.

{% highlight racket linenos %}
#lang racket

(define (antiunify W₁ W₂)
  (antiunify-helper W₁ W₂ 0))

(define (antiunify-helper V₁ V₂ ℕ)
  (cond
    [(equal? V₁ V₂) V₁]
    [else
      (let ((subst  (find-terms V₁ V₂)))
      (let ((subst₁ (caar subst)))
      (let ((subst₂ (cadar subst)))

      (antiunify-helper
        (substitute V₁ V₂ subst₁ ℕ)
        (substitute V₂ V₁ subst₂ ℕ)
        (add1 ℕ)))))]))

(define (find-terms W₁ W₂)
  (match W₁
    [`(Literal  ,n ,args) (find-terms args (caddr W₂))]
    [`(Function ,n ,args)
      (if [and (not (equal? n (cadr W₂))) (equal? args (caddr W₂))]
          `(((Function ,n ,args) (Function ,(cadr W₂) ,(caddr W₂))))
          (find-terms args (caddr W₂)))]
    [`(Variable ,n)
      (if [not (equal? n (cadr W₂))]
        `(((Variable ,n) (Variable ,(cadr W₂))))
        '())]
    [(cons a d)
      (append (find-terms a (car W₂)) (find-terms d (cdr W₂)))]
    ['() '()]))

(define (substitute V₁ V₂ t ℕ)
  (match V₁
    [`(Literal  ,n ,args)
     `(Literal  ,n ,(substitute args (caddr V₂) t ℕ))]
    [`(Function ,n ,args)
      (cond
        [(and (equal? V₁ t)
              (not (equal? V₁ V₂)))
        `(Variable ,ℕ)]
        [else `(Function ,n ,(substitute args (caddr V₂) t ℕ))])]
    [`(Variable ,n)
      (cond
        [(and (equal? V₁ t)
              (not (equal? V₁ V₂)))
              `(Variable ,ℕ)]
        [else V₁])]
    [(cons a d)
      (cons (substitute a (car V₂) t ℕ) (substitute d (cdr V₂) t ℕ))]
    ['() '()]))
{% endhighlight %}

## Critique and closing comments

This intended to communicate the main ideas introduced by Plotkin in the paper.
The solution has quite a few inefficiencies that should be addressed.

1. `(find-terms W₁ W₂)` finds all possible terms in a word, but the `let`
  bindings in `(antiunify-helper V₁ V₂ ℕ)` throw away all but the first.

This only covers Theorem 1 and the first few pages of the Plotkin paper. Two
more theorems are needed before we can generalize observed evidence like the
example shown in the opening section of this post. Those will have to be
reserved for a future post.

[^1]: G. Plotkin. 1970. "A Note on Inductive Generalization"
