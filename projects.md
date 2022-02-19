---
layout: page
title: Projects
permalink: /projects/
---

{% assign ordered_projects = site.projects | sort:"order_number" %}

{% for project in ordered_projects %}

  {% assign title = project.title %}
  {% assign images = project.images %}
  {% assign description = project.description %}

  {% include projectCard.html 
    title=title
    images=images
    description=description
  %}

{% endfor %}
