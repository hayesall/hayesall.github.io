---
layout: archive
permalink: /publications/
title: "Alexander L. Hayes • Publications"
share: false
excerpt: "Alexander L. Hayes List of Publications"
---

# Publications

{% assign all_publications = site.publications | reverse %}

{% for publication in all_publications %}
  {% include publication-list.liquid %}
{% endfor %}
