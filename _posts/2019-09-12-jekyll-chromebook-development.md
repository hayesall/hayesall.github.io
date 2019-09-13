---
layout: article
title: "Jekyll Blogging on Chromebooks"
description: "Fix 'This site can't be reached, 127.0.0.1 refused to connect' error when Jekyll blogging on Chromebooks."
date: 2019-09-12
excerpt: >-
  This site can't be reached? 127.0.0.1 refused to connect?
  How does Jekyll development on Chromebook differ from
  developing on other systems?
categories: blog
tags: ["jekyll", "chromebook"]
comments: true
image:
  teaser: teaser/teaser_jekyll_chromebook.png
---

<img src="/images/blog/jekyll-chromebook/refused_to_connect.png" style="border: 1px solid grey; display: block; margin-left: auto; margin-right: auto;" alt="Chrome error message: This site can't be reached. 127.0.0.1 refused to connect.">

## The simple solution:

Tweak your `jekyll serve` command:

```bash
$ bundle exec jekyll serve --host $(hostname -I)
```

Then point Chrome to this address:

```bash
http://penguin.linux.test:4000
```

## Why?

I'm glad you asked! This is a good opportunity to learn a bit more about how ChromeOS works under the hood.

Maybe you followed the [Quickstart Jekyll Guide](https://jekyllrb.com/docs/)
(or a similar routine)
without any issues, but got stuck when trying to view the site in the Chrome browser.

By default, `jekyll serve` starts the server on `127.0.0.1:4000`. However, the
Chrome browser and the Linux Terminal
[are basically running on different machines](https://support.google.com/chromebook/thread/8244000?hl=en).
Chrome does not know about localhost on the Linux Terminal.

In order for the two to communicate with one another, we have to go through an acceptable channel.
Ater [Chrostini 69.0.3486.0](https://www.reddit.com/r/Crostini/comments/8y337o/hostname_resolution_change_to_penguinlinuxtest/)
the following method for resolving Linux container hostnames was introduced for the browser. These follow the pattern:

```text
<container_name>.<vm_name>.linux.test
<container_name>.linux.test
```

This means the problem can be solved by hosting the Jekyll server on a hostname and port the browser
can listen on.

On my machine:

```bash
$ hostname
penguin
$ hostname -I
100.115.92.202
```

When we run `jekyll serve` on this host: `--host $(hostname -I)` and the default port,
we can point the Chrome browser to `http://penguin.linux.test:4000` and
resolve to the Jekyll server!
