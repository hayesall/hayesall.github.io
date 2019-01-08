---
layout: article
permalink: /teaching/
title: "Teaching"
share: false
excerpt: "Office Hours and Classes"
---

I am currently a Research Assistant with the ProHealth Group, and will not be teaching this semester. If you need to set up an appointment, I can be reached at `hayesall@indiana.edu`.

Past Courses
---

{% assign all_classes = site.classes | reverse %}

<ul>
{% for page in all_classes %}
  <li><a href="{{ page.url }}">{{ page.title }}</a></li>
{% endfor %}
</ul>
