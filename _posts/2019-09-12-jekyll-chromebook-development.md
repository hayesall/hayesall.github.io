---
layout: article
title: "Jekyll on Chromebooks"
description:
date: 2019-09-12
excerpt: >-
  This site can't be reached? 127.0.0.1 refused to connect?
  How does Jekyll development on Chromebook differ from 
  developing on other systems?
categories: blog
tags: ["jekyll", "chromebook"]
image:
  teaser: teaser/redboard_teaser.jpg
---

**TODO**

- Teaser image (console with Jekyll and Chromebook logos)
- Comment section

<img src="/images/blog/jekyll-chromebook/refused_to_connect.png" style="border: 1px solid grey;" alt="Chrome error message: This site can't be reached. 127.0.0.1 refused to connect.">

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

This is happening because the Chrome browser and the Linux Terminal 
[are basically running on different machines](https://support.google.com/chromebook/thread/8244000?hl=en).
The default localhost on the Linux Terminal is not accessible to the browser.

In order for the two to communicate with one another, we have to go through an acceptable channel.
Ater [Chrostini 69.0.3486.0](https://www.reddit.com/r/Crostini/comments/8y337o/hostname_resolution_change_to_penguinlinuxtest/)
a new method for resolving the Linux container hostnames was introduced for the browser. These follow the pattern:

```text
<container_name>.<vm_name>.linux.test
<container_name>.linux.test
```

This means the problem can be resolved by hosting the Jekyll server on a hostname that the Chrome browser
can listen to.

On my machine:

```bash
$ hostname
penguin
$ hostname -I
100.115.92.202
```

So we can run the server on a specific host: `--host $(hostname -I)` while still using the default port.

Then when we point the Chrome browser to `http://penguin.linux.test:4000`, the browser resolves to the 
Jekyll server!
