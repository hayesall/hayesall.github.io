---
layout: archive
permalink: /cv/
title: "Alexander L. Hayes • Curriculum Vitae"
description: This should be appearing at the top of the page.
excerpt: Alexander L. Hayes Curriculum Vitae
share: false
---

# Curriculum Vitae

**hayesall@iu.edu**  
Indiana University Bloomington  
School of Informatics, Computing, and Engineering (SICE)  
ProHealth Lab: Informatics East 255  
918 E. 10th Street  
Bloomington, IN 47401  

Technical Skills
---

Python, Shell Scripting, Linux/Unix, C, Racket, Git, Continuous Integration (CI), Sphinx Documentation

Education
---

**Doctor of Philosophy (Ph.D.) Health Informatics**  
School of Informatics, Computing, and Engineering  
Indiana University, Bloomington, IN


**Bachelor of Science (B.S.) Computer Science**  
*Security Informatics Minor*, Class of 2017, GPA: 3.5 Cumulative  
School of Informatics, Computing, and Engineering  
Indiana University, Bloomington, IN

Work Experience
---

**The University of Texas at Dallas**
Department of Computer Science, Richardson, TX

* **Teaching Assistant** (August 2018 &mdash; **Present**)

  * Fall 2018 &ndash; *Automata Theory* &ndash; CS 4384.001

* **Research Assistant** &ndash; *StARLinG Lab* (May 2018 &mdash; August 2018)

    * Extended the lab's open source tool for converting raw text into relational facts. Rewrote the software so it could be used as a command-line tool or as an imported Python package. Released the software as [rnlp](https://pypi.org/project/rnlp/).
    * Documented, unit tested, and ensured correctness of a Python port of [Relational Functional Gradient Boosting (rfgb.py)](https://pypi.org/project/rfgb/).

* **Teaching Assistant** (August 2017 &mdash; May 2018)  

  * Spring 2018 &ndash; *C Programming in a UNIX Environment* &ndash; CS 3377.501  
    Provided feedback on C++ programming assignments and bash scripts in terms of documentation, style, and functionality of code.
  * Fall 2017 &ndash; *Automata Theory* &ndash; CS 4384.001  
    Graded assignments and exams, prepared and verified automata examples prior to lectures, and provided additional support to students outside of class.

**Indiana University, Bloomington**
Department of Informatics and Computer Science

* **Undergraduate Researcher, STARAI Lab** (July 2017 &mdash; July 2018)
  * Explored methods combining Natural Language Processing and Statistical Relational Learning for information extraction on SEC Form S-1 Documents.
  * Facilitated the public release of the lab's source code onto GitHub, distributed as [BoostSRL](https://github.com/starling-lab/BoostSRL/). Maintained the BoostSRL wiki and tutorials.

* **Undergraduate Researcher, ProHealth Research Experience for Undergraduates** (May 2016 &mdash; August 2016)  
  * Built on research which previously inferred adverse side-effects of drugs based on text data mined from the web. Our work focused on predicting drug-drug interactions from data mined from OpenFDA, PubMed, and a variety of Blogs.

* **Camp Counselor, SICE Summer Camp** (2014, 2015, 2016, 2017)  
  * Led sessions on intermediate Python programming, Scratch, Raspberry Pi, information security, and data analytics.  
  * Introduced high school students to Indiana University's campus, navigated them between sessions where they learned about computer science and informatics.

Publications and Poster Presentations
---

<ul>
{% for pub in site.data.publications %}
  <li>{{pub.authors}}. {{pub.year}}. <i>{{pub.title}}</i>. {{pub.venue}}. {{pub.date}}. {{pub.location}}. {% if pub.doi %}<a href="{{pub.doi}}">{{pub.doi}}</a>{% endif %} {% if pub.code %} &mdash; <a href="{{pub.code}}"><i style="color: red" class="icons fa fa-code"> Code</i></a>{% endif %} {% if pub.pdf %} &mdash; <a href="{{pub.pdf}}"><i style="color: red" class="icons fa fa-file"> .pdf</i></a> {% endif %} {% if pub.poster %} &mdash; <a href="{{pub.poster}}"><i style="color: red" class="icons fa fa-image"> Poster</i></a> {% endif %}</li>
{% endfor %}
</ul>
