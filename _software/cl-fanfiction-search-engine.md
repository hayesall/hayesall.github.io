---
layout: article
title: "FanFiction Search Engine"
date: 2016-12-16
excerpt: >-
  A full-text search engine for Code Lyoko FanFiction.
  Final project for Search Informatics.
categories: software
github-url: https://github.com/hayesall/CLFanfictionSearchEngine
tags: ["Course Projects"]
primary-language: python
image:
  teaser: teaser/directed_fanfiction_graph.jpg
  alt: "Directed graph with blue and violet nodes."
---

## Overview

**{{ page.title }}**: {{ page.excerpt }}

- **Source Code**: [{{ page.github-url }}]({{ page.github-url }})

---

## Motivation

The final portion of the "Search Informatics" course I took involved
developing an entire search engine---including a frontend website,
a backend for returning pages, the spiders for crawing the web, and
scrapers for turning pages into searchable text.

At the time, FanFiction.Net lacked a full-text search option.
It was possible to search for content in the "title" or
"synopsis" sections, but there was no way to know if any of
the stories mentioned "twitter."

<figure>
<img class="image-responsive" style="display:block; margin:auto; max-width: 600px;" alt="Screenshot of the search engine page, containing a text box where a user can write their query, a button to start the search, and some disclaimers about the project: specifically that this was done with regards to the terms and conditions of the host website." src="/images/software/cl-fanfiction-search-engine/ff_search_screenshot.png">
</figure>

The PageRank algorithm operates on a directed graph, so it was possible to incorporate some knowledge about
how the website worked. There are "Users" and "Stories," which I generally drew with violet or blue nodes.
Users can write or review stories---therefore I could crawl over all the stories,
extract text to build the search engine, and record user interactions to build the network.

<figure>
<img alt="Simple sixteen node network of users and stories, where directed edges show that a user wrote or reviewed a story." class="image-responsible" src="https://raw.githubusercontent.com/hayesall/CLFanfictionSearchEngine/master/media/directed-fanfiction-graph.jpg" style="display: block; margin: auto; padding-top: 0.4em; padding-bottom: 0.4em;">
</figure>

When visualized, the inner region appeared to be extremely dense. There were some users and stories with less
attention, but the inner region was quite dense and showed a high amount of engagement between users
and stories.

<figure>
<img alt="Complete network of the community, showing a dense inner region where many users and stories interact with one another." src="https://github.com/hayesall/CLFanfictionSearchEngine/blob/master/media/fan-network9.png?raw=true" style="display: block; margin: auto; padding-top: 0.4em; padding-bottom: 0.4em;" class="img-responsive"/>
</figure>

## Conclusions

I wrote some notes about this as a blog post:
[*Network of Code Lyoko FanFiction*](/blog/network-of-code-lyoko-fanfiction/).

This search engine is no longer maintained. I still study networks and learning
on arbitrarily-structured data though.
