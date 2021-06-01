---
layout: page
title: Projects
permalink: /projects/
---

{% assign ordered_projects = site.projects | sort:"order_number" %}
{% for project in ordered_projects %}
  <h2>{{project.title}}</h2>
  {%- if project.image -%}
  <img src='{{project.image}}' width='800'>
  {%- endif -%}
{% endfor %}
