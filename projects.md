---
layout: page
permalink: /projects/
description: "Short overview about my projects Can maybe use this same description for what gets shown on index ie put it as front matter"
---

{% assign ordered_projects = site.projects | sort:"order_number" %}

{% assign desc = page.description %}
{% capture playableLinks %}
- asdf
- qwer
{% endcapture %}

{% include pageBlock.html
  title="Projects"
  primary=desc
  secondary=playableLinks
%}


{% for project in ordered_projects %}
  {% if project.hidden != true %}
  {% assign title = project.title %}
  {% assign images = project.images %}
  {% assign description = project.description %}
  {% assign link = project.link %}

  {% include projectOverview.html 
    title=title
    images=images
    description=description
    link=link
  %}
  {% endif %}
{% endfor %}
