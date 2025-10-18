---
layout: page
permalink: /reading/
---

{% capture main %}
I grew up in a family of readers. Once in elementary school a concerned teached contacted my mother to say that I had been spending my recess reading instead of playing. My mother was confused about what the problem was. I read a lot back then but eventually that habit died down.

During graduate school, with access to an enormous university library system, I really began to read earnestly again and I began tracking the books I read. In those first few years of recording I also wanted to show off a little and see how much I could get read. Since then I've found a few other hobbies that I want to dedicate my time to and that desire to show off has dissipated. I don't update as often as I once did, but I am always tracking what I read and eventually these records get updated accordingly.
{% endcapture %}

{% assign reading_logs = site.reading_logs%}
{% capture links %}
<ul>
{% for rl in reading_logs %}
<li><a href="{{rl.permalink}}">{{rl.year}}</a></li>
{% endfor %}
</ul>

{% endcapture %}



{% include pageBlock.html
  title="Reading"
  primary=main
  secondary=links
%}