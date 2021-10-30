---
layout: page
title: Projects
permalink: /projects/
---

{% assign ordered_projects = site.projects | sort:"order_number" %}
{% for project in ordered_projects %}
  <section>
    <h2>{{project.title}} 
    {%- if project.title == 'Combo Mambo' -%}
      <a style="margin-left: .5em" href="https://wynnelson.com/dbm/comboMambo.html" target="_blank">(play in new tab)</a>
    {%- endif -%}
    </h2>
    {%- if project.images -%}
      <ul class="imgContainer">
      {% for image in project.images %}
        <li>
          <img src='/assets/projects/{{image}}' alt='{{project.images_alt[forloop.index0]}}'>
        </li>
      {% endfor %}
      </ul>
    {%- endif -%}
  </section>
{% endfor %}
