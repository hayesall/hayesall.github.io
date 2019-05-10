---
layout: archive
permalink: /
title: "Alexander L. Hayes • Home"
share: false
excerpt: "Alexander L. Hayes is a Health Informatics Ph.D. Student at Indiana University (IU) Bloomington."
---

<div class="homepage-intro">
  <img src="/images/Alexander_Hayes.png" style="display: block; margin: auto; padding-top: 2em; padding-bottom: 2em;">
</div>

<div class="homepage-second">
  <center>
    <h1>Alexander L. Hayes • Ph.D. Student</h1>

    <a href="https://github.com/hayesall/" class="btn-social github"><i class="icons fa fa-github fa-2x"> GitHub</i></a> <a href="https://www.linkedin.com/in/alexanderlhayes/" class="btn-social linkedin"><i class="icons fa fa-linkedin fa-2x"> LinkedIn</i></a> <a href="https://twitter.com/alexanderlhayes/" class="btn-social twitter"><i class="icons fa fa-twitter fa-2x"> Twitter</i></a>
  </center>
</div>

<div class="homepage-third">
  <p>Alexander L. Hayes is a Health Informatics Ph.D. Student working with <a href="http://wphomes.soic.indiana.edu/connelly/">Professor Kay Connelly</a> and the <a href="https://prohealth.sice.indiana.edu/">Proactive Health Informatics Department</a> on the <a href="https://grandchallenges.iu.edu/precision-health/index.html">Precision Health Initiative</a>. His interests are in statistical relational artificial intelligence (STARAI), systems, open source development&mdash;and their applications toward solving real-world Health Informatics problems. He holds a B.S. Computer Science from Indiana University, and continues to collaborate with <a href="http://utdallas.edu/~sxn177430/">Professor Sriraam Natarajan</a> and his colleagues from the <a href="https://starling.utdallas.edu">StARLinG Lab</a> at the University of Texas at Dallas.</p>
  <p>He is currently working in the nuMoM2b (new-mom-2-be) data set, where one of the aims is to model the development of gestational diabetes. Additional information about this project is included in the <a href="https://doc.numom2b.org/en/latest/">nuMoM2b preprocessing documentation</a>.</p>
</div>

<div class="homepage-fourth">

<a href="{{ site.url }}/publications/"><h2 style="padding-bottom: 1em; padding-top: 3em; text-decoration: underline;">Recent Publications</h2></a>

{% assign all_publications = site.publications | reverse %}

{% for publication in all_publications limit: 1 %}
  {% include publication-list.liquid %}
{% endfor %}

<h2>Updates</h2>

<ul>
<li>Spring 2018: I am transferring to work as a Research Assistant with the Proactive Health Informatics (ProHealth) Department within the School of Informatics, Computing, and Engineering (SICE) at Indiana University, Bloomington.</li>
<li>Fall 2018: I will be a Teaching Assistant for Automata Theory (CS 4384.001)</li>
</ul>

<a href="{{ site.url }}/blog/"><h2 style="padding-top: 3em; text-decoration: underline;">Recent blog posts</h2></a>

<div class="tiles">
{% for post in site.posts limit: 4 %}
	{% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->

</div>
