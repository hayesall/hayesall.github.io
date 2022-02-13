---
layout: article
title: "Arduino Thermometer Control"
date: 2019-04-08
excerpt: >-
  Diagrams, controller code, and evaluation for a TMP102 thermometer.
categories: software
github-url: https://github.com/hayesall/Informatics-Temperature-Study
tags: ["Course Projects"]
primary-language: cpp
image:
  teaser: teaser/redboard_teaser.jpg
  alt: "An arduino redboard wired to a breadboard."
---

## Overview

**{{ page.title }}**: {{ page.excerpt }}

- **Source Code**: [{{ page.github-url }}]({{ page.github-url }})

---

## Motivation

The sensors built into smart phones can record all kinds of useful information, but answering
questions about "*how hot is it exactly where I'm standing?*" isn't possible with current
technology.

Different health outcomes are tied to the local environment where a person is,
but heat and local climate are impossible to evaluate on a person-by-person basis.
This was a short study for prototyping
with on-body sensors, and seeing the temperature dynamics as I carried one around.

<figure>
  <img class="image-responsive" style="display:block; margin:auto; max-height: 450px;" src="https://raw.github.com/hayesall/Informatics-Temperature-Study/master/docs/svg/schematic.svg?sanitize=true" />
  <figcaption>
    Schematic showing how to wire the RedBoard and the TMP102. This schematic was
    created as a <a href="https://github.com/hayesall/Informatics-Temperature-Study/blob/master/docs/svg/schematic.txt">text file</a>
    then rendered with <a href="https://github.com/ivanceras/svgbob">svgbob</a>.
  </figcaption>
</figure>

## Conclusion

I wrote some notes about this as a blog post:
[*How Hot is the IU School of Informatics*](/blog/arduino-temperature-study/).
