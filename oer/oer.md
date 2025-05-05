---
layout: oer_page
oer_type: home
title: Open Educational Resources
permalink: /oer/
---


{% capture about_primary %}
<p>
Open educational resources (OER) are freely accesible resources that can be used for teaching and learning.

As an instructor and recitation leader I have created countless course materials, much of which I have been able to repackage as OER.
</p>
{% endcapture %}

{% assign ordered_sections = site.oer_sections | sort:"order" %}

{% capture sections %}
<h3>Sections</h3>
<ul>
  {% for ordered_section in ordered_sections %}
    {% assign num_lessons = site.oer_lessons | where: 'section-slug', ordered_section.slug | size %} 
    <li><a href="{{ordered_section.slug}}">{{ordered_section.title}} ({{num_lessons}} lessons)</a></li>
  {% endfor %}
</ul>
{% endcapture %}


{% include pageBlock.html
  title="About OER"
  primary=about_primary
  secondary=sections
%}


