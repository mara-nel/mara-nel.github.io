---
layout: page
title: Projects
permalink: /projects/
---

{% assign ordered_projects = site.projects | sort:"order_number" %}

{% for project in ordered_projects %}
  {% if project.hidden != true %}
  {% assign title = project.title %}
  {% assign images = project.images %}
  {% assign description = project.description %}
  {% assign link = project.link %}

  {% include projectCard.html 
    title=title
    images=images
    description=description
    link=link
  %}
  {% endif %}
{% endfor %}
