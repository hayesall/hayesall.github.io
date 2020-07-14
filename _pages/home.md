---
layout: homepage
permalink: /
title: "Alexander L. Hayes • Home"
share: false
excerpt: "Alexander L. Hayes is a Ph.D. Student at Indiana University (IU) Bloomington studying Health Informatics."
---

<div itemscope itemtype="http://schema.org/Person">

  <div class="homepage-intro" style="align: center;">
    <img itemprop="image" src="/images/Alexander_Hayes.png" style="display: block; margin: auto; padding-top: 2em; padding-bottom: 2em;">
  </div>

  <div class="homepage-second">
    <center>
    <h1>Alexander L. Hayes • Ph.D. Student</h1>
    <link itemprop="url" href="https://hayesall.com">
    <a itemprop="sameAs" href="https://github.com/hayesall/" class="btn-social github"><i class="icons fa fa-github fa-2x"> GitHub</i></a>
    <a itemprop="sameAs" href="https://scholar.google.com/citations?user=eAys7JgAAAAJ&hl=en" class="btn-social twitter"><i class="icons ai ai-google-scholar ai-2x"> Scholar</i></a>
    <a itemprop="sameAs" href="https://www.linkedin.com/in/alexanderlhayes/" class="btn-social linkedin"><i class="icons fa fa-linkedin fa-2x"> LinkedIn</i></a>
    <a itemprop="sameAs" href="https://twitter.com/alexanderlhayes/" class="btn-social twitter"><i class="icons fa fa-twitter fa-2x"> Twitter</i></a>
    </center>
  </div>

  <div class="homepage-third">
    <p>
      <span itemprop="name">Alexander L. Hayes</span>

      is a Health Informatics Ph.D. Student working with

      <span itemprop="knows" itemscope itemtype="http://schema.org/Person"><a itemprop="url" href="https://wphomes.soic.indiana.edu/connelly/">Professor <span itemprop="name">Kay Connelly</span></a></span>

      and the

      <span itemprop="affiliation" itemscope itemtype="http://schema.org/EducationalOrganization"><a itemprop="url" href="https://prohealth.luddy.indiana.edu/"><span itemprop="name">ProHealth Informatics Group</span></a></span>

      on the Precision Health Initiative at

      <span itemprop="affiliation" itemscope itemtype="http://schema.org/EducationalOrganization"><link itemprop="url" href="https://www.indiana.edu/"><span itemprop="name">Indiana University Bloomington</span></span>.

      His interests are in

      <span itemprop="knowsAbout">statistical relational artificial intelligence (STARAI)</span>,
      <span itemprop="knowsAbout">machine learning</span>,
      <span itemprop="knowsAbout">software engineering</span>,
      <span itemprop="knowsAbout">open source software</span>;
      and their applications toward solving real-world
      <span itemprop="knowsAbout">health informatics</span>
      problems.

      He holds a B.S. <span itemprop="knowsAbout">Computer Science</span> from

      <span itemprop="alumniOf" itemscope itemtype="http://schema.org/EducationalOrganization">
      <link itemprop="url" href="https://www.indiana.edu/"><span itemprop="name">Indiana University</span>
      </span>

      and continues to collaborate with

      <span itemprop="knows" itemscope itemtype="http://schema.org/Person"><a itemprop="url" href="https://personal.utdallas.edu/~sriraam.natarajan/">Professor <span itemprop="name">Sriraam Natarajan</span></a></span>

      and his colleagues from the

      <span itemprop="affiliation" itemscope itemtype="http://schema.org/EducationalOrganization"><a itemprop="url" href="https://starling.utdallas.edu"><span itemprop="name">StARLinG Lab</span></a></span>

      at the

      <span itemprop="affiliation" itemscope itemtype="http://schema.org/EducationalOrganization"><link itemprop="url" href="https://www.utdallas.edu/"><span itemprop="name">University of Texas at Dallas</span></span>.
      </p>

      <p>
      Alexander is currently working in secondary analysis the nuMoM2b (new-mom-2-be) data set, where one aim is to determine early warning signs for gestational diabetes. Additional information about this project is
      included in the <a href="https://doc.numom2b.org/en/latest/">nuMoM2b preprocessing documentation</a>.
      </p>

      <p>
        <span style="font-weight: bold;">Contact</span>:
        <span itemprop="email">hayesall@iu.edu</span>
      </p>
  </div>
</div>

<div class="homepage-fourth">

<a href="{{ site.url }}/publications/"><h2 style="padding-bottom: 1em; padding-top: 3em; text-decoration: underline;">Recent Publications</h2></a>

{% assign all_publications = site.publications | reverse %}

{% for publication in all_publications limit: 1 %}
  {% include publication-list.liquid %}
{% endfor %}

<h2>Updates</h2>

<ul>
<li><a href="https://github.com/hayesall/srlearn/">srlearn: A Python Library for Gradient-Boosted Statistical Relational Models</a> was accepted at the Ninth International Workshop on Statistical Relational AI</li>
<li>2019-06-14: I am attending International Conference of Machine Learning (ICML) in Long Beach, California.</li>
<li>Spring 2019: I am transferring to work as a Research Assistant with the Proactive Health Informatics (ProHealth) Department within the School of Informatics, Computing, and Engineering (SICE) at Indiana University, Bloomington.</li>
<li>Fall 2018: I will be a Teaching Assistant for Automata Theory (CS 4384.001)</li>
</ul>

<a href="{{ site.url }}/blog/"><h2 style="padding-top: 3em; text-decoration: underline;">Recent blog posts</h2></a>

<div class="tiles">
{% for post in site.posts limit: 4 %}
	{% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->

</div>
