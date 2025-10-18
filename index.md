---
layout: page
excludeSiteTitle: false
---

{% capture main %}
My name is Mara Nelson and I am a Software Engineer / Full Stack Web Developer / UI Designer (this field gives us lots of titles to choose from).

Currently I am contracting with Apple's Wallet and Payments division as an internal tooling engineer where I am a principal developer of its Incident Management ecosystem.
In my current position, I regularly work in Javascript (React and Node), Java, and MySQL. I regularly collaborate with stakeholders to review designs and ideate new features.

Over my professional career I've worked with numerous groups to enhance their processes with the development of web based software. By leveraging my knowledge of User Experience (UX) design I ensure that the applications I work on utilize research proven methods that improve the everyday interactions of its users.
{% endcapture %}

{% capture links %}
- [Resume](assets/MaraNelsonResume.pdf)
- [LinkedIn](/linkedin)
- [Github](/linkedin)
{% endcapture %}

<h1>Mara Nelson</h1>
<div>
{% include pageBlock.html
  primary=main
  secondary=links
%}

{% assign projects_page = nil %}
{% for page in site.pages %}
  {% if page.permalink == '/projects/' %}
    {% assign projects_page = page %}
    {% break %} {% endif %}
{% endfor %}

{% capture projects-main %}
{{projects_page.description}}

[Read on](/projects)
{% endcapture %}
{% capture projects-secondary %}
asdf
{% endcapture %}
{% if projects_page %}
{% include pageBlock.html
  title="Projects"
  primary=projects-main
  secondary=projects-secondary
%}
{% endif %}


{% capture about-main %}
asdfasdfa asdf asdf asdf asdf asdf sad

[Read on](/about)
{% endcapture %}
{% capture about-secondary %}
asdf
{% endcapture %}
{% include pageBlock.html
  title="More about me"
  primary=about-main
  secondary=about-secondary
%}
</div>

  {% include clippedImage.html 
    description="A headshot of Mara wearing glasses and smiling. She has long brown hair and a dusty rose shirt."
    source="/assets/headShotOfMara.jpg" 
  %}
