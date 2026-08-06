---
layout: archive
permalink: /teaching/
title: "Alexander L. Hayes • Teaching"
share: false
excerpt: "Office Hours and Classes"
---

# Teaching

I typically teach CS2 (i211) and discrete math (i201) courses. Beyond those: I've led a JavaScript course, and previously TA'd for CS1 (i210), health informatics, and a C & Unix Programming course.

## All Courses

Below are semesters, courses, enrollment, and my role. *Just for fun*, the table also lists the number of repositories on GitHub that I juggled with my teaching team.

<table>
    <caption>Alexander's past courses, roughly between Fall 2017 and the present.</caption>
    <thead>
        <tr style="font-weight:bold;">
            <td scope="col">Semester</td>
            <td scope="col">Name</td>
            <td scope="col">Number</td>
            <td scope="col">Enrollment</td>
            <td scope="col">Role</td>
            <td scope="col"># of Repos</td>
        </tr>
    </thead>
    <tbody>
        {% assign all_courses = site.data.teaching | reverse %}
        {% for course in all_courses %}
        <tr>
            <td style="text-align:right;">{{ course.term }}</td>

            {% if course.teaching_id %}
              {% assign course_page = site.classes | where: "teaching_id", course.teaching_id | first %}
              <td><a style="color:#537b99;border-bottom:1px dotted #5e7b99;" href="{{ course_page.url }}">{{ course.name }}</a></td>
            {% else %}
              <td>{{ course.name }}</td>
            {% endif %}
            
            <td>{{ course.code }}</td>
            <td style="text-align:right;">{{ course.enrollment }}</td>
            <td>{{ course.job_title }}</td>
            <td>{{ course.github_repo_count | default: '-' }}</td>
        </tr>
        {% endfor %}
    </tbody>
</table>
