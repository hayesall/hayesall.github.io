---
layout: archive
permalink: /teaching/
title: "Alexander L. Hayes • Teaching"
share: false
excerpt: "Office Hours and Classes"
---

{% assign all_courses = site.classes | reverse %}

# Teaching

I am assisting with "Introduction to Health Informatics" this semester:

- [{{ all_courses[0].title }}]({{ all_courses[0].url }})

## All Courses

<ul>
{% for course in all_courses %}
  <li><a href="{{ course.url }}">{{ course.title }}</a></li>
{% endfor %}
</ul>
