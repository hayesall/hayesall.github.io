---
layout: archive
permalink: /teaching/
title: "Alexander L. Hayes • Teaching"
share: false
excerpt: "Office Hours and Classes"
---

# Teaching

I am currently a Research Assistant with the ProHealth Group, and will not be teaching this semester. If you need to set up an appointment, I can be reached at `hayesall@iu.edu`.

Past Courses
---

{% assign all_classes = site.classes | reverse %}

<ul>
{% for page in all_classes %}
  <li><a href="{{ page.url }}">{{ page.title }}</a></li>
{% endfor %}
</ul>
