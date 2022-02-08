---
layout: archive
permalink: /software/
title: "Alexander L. Hayes • Software"
share: false
excerpt: "Software"
---

# Software

{% assign all_tags = site.data.software_tags | sort: 'order' %}
{% assign all_software = site.software | reverse %}

{% for tag in all_tags %}

<h2 id="{{ tag.name | slugify }}">{{ tag.name }}</h2>

{% if tag.excerpt %}<p>{{ tag.excerpt }}</p>{% endif %}

<div class="bullets">
{% for post in all_software %}
  {% if post.tags contains tag.name %}
  <div class="bullet two-col-bullet">
    <div class="bullet-icon">
    <a href="{{ site.url }}{{ post.url }}"><img src="{% if post.image.teaser %}{{ site.url }}/images/{{ post.image.teaser }}{% else %}{{ site.url }}/images/{{ site.software-placeholder }}{% endif %}" alt="{{ post.image.alt }}" style="border-radius: 50%;"></a>
  </div><!-- /.bullet-icon -->
    <div class="bullet-content">
    <h3><a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a></h3>
    <p>{{ post.excerpt | remove: '<p>' | remove: '</p>'}}</p>
    {% if post.github-url %}<a target="_blank" rel="noopener noreferrer" href="{{ post.github-url }}"><img src="/images/view-on-github.svg" alt="View {{ post.title }} on GitHub"></a>{% endif %}{% if post.primary-language %}<br/><img src="/images/lang-badge/{{ post.primary-language }}-lang.svg">{% endif %}{% if post.downloads %} <img src="{{ post.downloads.monthly }}">{% endif %}
  </div><!-- /.bullet-content -->
  </div>
  {% endif %}
{% endfor %}
</div>
<hr/>

{% endfor %}

## (Notes and Acknowledgements)

Badges were made with [shields.io](https://shields.io/), and Python package statistics are occasionally pulled from PePy
(for example, see the [PePy entry for srlearn](https://pepy.tech/project/srlearn)).
