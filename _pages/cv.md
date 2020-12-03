---
layout: archive
permalink: /cv/
title: "Alexander L. Hayes • Curriculum Vitae"
description: This should be appearing at the top of the page.
excerpt: Alexander L. Hayes Curriculum Vitae
share: false
---

{:.no_toc}
## Curriculum Vitae

**Alexander L. Hayes**  
**hayesall@iu.edu**  
Indiana University Bloomington  
Luddy School of Informatics, Computing, and Engineering  
ProHealth Lab: Informatics East 255  
918 E. 10th Street  
Bloomington, IN 47401  

{% include toc.html %}

## Technical Skills

**Languages**: Python, Shell Scripting, Java, C/C++, JavaScript, Racket

**Libraries**: NumPy, SciPy, scikit-learn, Pandas, NetworkX, pytest

**Tools**: Git, GitHub, GitHub Actions, JIRA, ReadTheDocs, Travis-CI, CircleCI, AppVeyor, CodeCov, PyPi

**Development Platforms**: Linux/UNIX, Jekyll, Android, Arduino, Google Cloud Platform

**Documentation Tools**: LaTeX, Sphinx, Javadoc, Doxygen, Markdown, ReStructured Text

**Workflows**: Continuous Integration (CI), Gitflow

## Education

**Doctor of Philosophy (Ph.D.) Health Informatics**  
School of Informatics, Computing, and Engineering  
Indiana University, Bloomington, IN


**Bachelor of Science (B.S.) Computer Science**  
*Security Informatics Minor*, Class of 2017, GPA: 3.5 Cumulative  
School of Informatics, Computing, and Engineering  
Indiana University, Bloomington, IN

## Experience

**Indiana University, Bloomington**  
ProHealth Lab, Luddy School of Informatics, Computer Science, and Engineering

- **Research Assistant** &ndash; *ProHealth Lab* &ndash; *Precision Health Initiative* (January 2019 &mdash; **Present**)  

  - Secondary analysis on incidence of gestational diabetes
    - Developed tools for data cleaning and pre-processing for creating reproducible data partitions: [numom2b.org](http://numom2b.org).
    - Solved the binary class imbalance problem (imbalance of 1 to 32).
    - Reduced features (original feature space ~7000 variables)
    - Explained predictions for a clinical decision support setting.

**CareBand Inc.**  
222 West Merchandise Mart Plaza #1230, Chicago, IL

- **Developer and Machine Learning Research Consultant** (February 2020 &mdash; **Present**)  

  - Implemented solutions for indoor location tracking.  
  - Developed models to analyze trends in user behavior.

**The University of Texas at Dallas**  
Department of Computer Science, Richardson, TX

- **Teaching Assistant** (August 2018 &mdash; December 2018)

  - Fall 2018 &ndash; *Automata Theory* &ndash; CS 4384.001  
    Led two lectures on finite automata minimization. Graded assignments and exams, prepared and verified automata examples prior to lectures, and held four hours of office hours per week to answer questions.

- **Research Assistant** &ndash; *StARLinG Lab* (May 2018 &mdash; August 2018)

    - Extended the lab's open source tool for converting raw text into relational facts. Rewrote the software so it could be used as a command-line tool or as an imported Python package. Released the software as [rnlp](https://pypi.org/project/rnlp/).
    - Documented, unit tested, and ensured correctness of a Python port of [Relational Functional Gradient Boosting (rfgb)](https://pypi.org/project/rfgb/).

- **Teaching Assistant** (August 2017 &mdash; May 2018)  

  - Spring 2018 &ndash; *C Programming in a UNIX Environment* &ndash; CS 3377.501  
    Provided feedback on C++ programming assignments and bash scripts in terms of documentation, style, and functionality of code.
  - Fall 2017 &ndash; *Automata Theory* &ndash; CS 4384.001  
    Graded assignments and exams, prepared and verified automata examples prior to lectures, and provided additional support to students outside of class.

**Indiana University, Bloomington**  
Department of Informatics and Computer Science

- **Undergraduate Researcher, STARAI Lab** (July 2017 &mdash; July 2018)
  - Explored methods combining Natural Language Processing and Statistical Relational Learning for information extraction on SEC Form S-1 Documents.
  - Facilitated the public release of the lab's source code onto GitHub, distributed as [BoostSRL](https://github.com/starling-lab/BoostSRL/). Maintained the BoostSRL wiki and tutorials.

- **Undergraduate Researcher, ProHealth Research Experience for Undergraduates** (May 2016 &mdash; August 2016)  
  - Built on research which previously inferred adverse side-effects of drugs based on text data mined from the web. Our work focused on predicting drug-drug interactions from data mined from OpenFDA, PubMed, and a variety of Blogs.

- **Camp Counselor, SICE Summer Camp** (2014, 2015, 2016, 2017)  
  - Led sessions on intermediate Python programming, Scratch, Raspberry Pi, information security, and data analytics.  
  - Introduced high school students to Indiana University's campus, navigated them between sessions where they learned about computer science and informatics.

## Software

- `srlearn`: A Python Library for Gradient-Boosted Statistical Relational Models
  - [Python Package Index](https://pypi.org/project/srlearn/)
  - [Source on GitHub](https://github.com/hayesall/srlearn)
  - [Documentation](https://srlearn.readthedocs.io/en/latest/)
- `SRLBoost`: A Java library for learning and inference with SRL models: up to 15x faster than existing libraries
  - [Source on GitHub](https://github.com/hayesall/SRLBoost)
- `rnlp`: Converting text to relational facts
  - [Python Package Index](https://pypi.org/project/rnlp/)
  - [Source on GitHub](https://github.com/hayesall/rnlp)
  - [Documentation](https://rnlp.readthedocs.io/en/latest/)

## Publications and Poster Presentations

<ul>
{% for pub in site.data.publications %}
  <li>{{pub.authors}}. {{pub.year}}. <i>{{pub.title}}</i>. {{pub.venue}}. {{pub.date}}. {{pub.location}}. {% if pub.doi %}<a href="{{pub.doi}}">{{pub.doi}}</a>{% endif %} {% if pub.code %} &mdash; <a href="{{pub.code}}"><i style="color: red" class="icons fa fa-code"> Code: {{pub.code}}</i></a>{% endif %} {% if pub.pdf %} &mdash; <a href="{{pub.pdf}}"><i style="color: red" class="icons fa fa-file"> .pdf: {{pub.pdf}}</i></a> {% endif %} {% if pub.poster %} &mdash; <a href="{{pub.poster}}"><i style="color: red" class="icons fa fa-image"> Poster: {{pub.poster}}</i></a> {% endif %}</li>
{% endfor %}
</ul>

## Conference Attendance

- **Association for the Advancement of Artificial Intelligence (AAAI)** 2020: Hilton New York Midtown, New York, New York, USA. Workshop Poster Presentation. (2020-02-06, 2020-02-08)
  - Ninth International Workshop on Statistical Relational AI (StarAI 2020) [Workshop URL](http://www.starai.org/2020/)
- **International Conference of Machine Learning (ICML)** 2019: Long Beach Convention Center, Long Beach, California, USA. Attendee. (2019-06-14, 2019-06-15)
  - 2019 Workshop on Human-in-the-Loop Learning (HILL) [Workshop URL](https://sites.google.com/view/hill2019/home), [ICML Schedule](https://icml.cc/Conferences/2019/ScheduleMultitrack?event=3511)
  - The Third Workshop on Tractable Probabilistic Modeling (TPM) [Workshop URL](https://sites.google.com/view/icmltpm2019/home), [ICML Schedule](https://icml.cc/Conferences/2019/Schedule?showEvent=3530)

## Service - Open Source Contributions

### [`scikit-learn-contrib / imbalanced-learn`](https://github.com/scikit-learn-contrib/imbalanced-learn/)

[`imbalanced-learn`](https://github.com/scikit-learn-contrib/imbalanced-learn/) "A Python package to Tackle the Curse of Imbalanced Datasets in Machine Learning"

Changes proposed:

- [Fix typos in specificity_score](https://github.com/scikit-learn-contrib/imbalanced-learn/pull/614)
- [Fixed a bug caused by external changes in the scikit-learn package](https://github.com/scikit-learn-contrib/imbalanced-learn/pull/591)
- [Implemented a method for showing system information to assist in bug reporting](https://github.com/scikit-learn-contrib/imbalanced-learn/pull/557)

Code review:

- [ROSE: Random OverSampling Examples](https://github.com/scikit-learn-contrib/imbalanced-learn/pull/754)
- [Missing initialization leading to tests being missed](https://github.com/scikit-learn-contrib/imbalanced-learn/pull/748)

Community questions I helped resolve:

- [Why doesn't SMOTE+Tomek-Links accept an SVM-SMOTE during oversampling?](https://github.com/scikit-learn-contrib/imbalanced-learn/issues/589#issuecomment-517269361)
- [Why do datasets fail for imblearn==0.4.3?](https://github.com/scikit-learn-contrib/imbalanced-learn/issues/574#issuecomment-498822382)
- [Why do Tomek Links take so long?](https://github.com/scikit-learn-contrib/imbalanced-learn/issues/567#issuecomment-490545013)
- [Why does parallelism fail?](https://github.com/scikit-learn-contrib/imbalanced-learn/issues/560#issuecomment-478282569)

### [`SPFlow / SPFlow`](https://github.com/SPFlow/SPFlow/)

[`SPFlow`](https://github.com/SPFlow/SPFlow/) "An easy and extensible library for sum-product networks."

Changes proposed:

- [Automatically build and deploy documentation to a webserver when changes occur](https://github.com/SPFlow/SPFlow/pull/80)
- [Rework the documentation. Instead of writing everything in a README file, write documentation in a series of files that can be exported as web pages](https://github.com/SPFlow/SPFlow/pull/79)

Community questions I helped resolved:

- [How can I reproduce the example visualization?](https://github.com/SPFlow/SPFlow/issues/89)

### [`microsoft / LightGBM`](https://github.com/microsoft/LightGBM/)

[`LightGBM`](https://github.com/microsoft/LightGBM/) "A fast, distributed, high performance gradient boosting (GBT, GBDT, GBRT, GBM or MART) framework based on decision tree algorithms, used for ranking, classification and many other machine learning tasks."

Changes proposed:

- [Reworked the FAQ to properly link to questions](https://github.com/microsoft/LightGBM/pull/2293)
- [Method for automatically paginating the Python API](https://github.com/microsoft/LightGBM/pull/2286)

Code review:

- [Limiting files checked during documentation generation](https://github.com/microsoft/LightGBM/pull/2297)

Community questions I helped resolve:

- [How to optimize for prediction speed for real-time application?](https://github.com/microsoft/LightGBM/issues/2094#issuecomment-519560915)
- [How to adapt the test build to use GitHub Actions?](https://github.com/microsoft/LightGBM/issues/2353#issuecomment-524862575)
- [Why are pages not found when JavaScript is disabled?](https://github.com/microsoft/LightGBM/issues/2300#issuecomment-516874783)

### [`google-research / arxiv-latex-cleaner`](https://github.com/google-research/arxiv-latex-cleaner)

[`arxiv-latex-cleaner`](https://github.com/google-research/arxiv-latex-cleaner): "arXiv LaTeX Cleaner: Easily clean the LaTeX code of your paper to submit to arXiv"

Changes proposed:

- [Converting to a Python package and providing a console script](https://github.com/google-research/arxiv-latex-cleaner/pull/15)
