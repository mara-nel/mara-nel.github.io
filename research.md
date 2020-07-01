---
layout: page
title: Research
mathjax: true
permalink: /research/
---

<!--h2>
<a href="/portfolio/#research">Research Statement</a>
</h2-->
<h2 id="research">Research Statement</h2>

<blockquote>
My dissertation is on generalizations of Descartes’ Rule of Signs to multivariate polynomial systems.
It focuses on identifying conditions on the signs of negatively coupled Pham systems that guarantee that a positive real solution exists.
Future work will be in contributing to the growing body of knowledge about sums of nonnegative circuit (SONC) polynomials.
What follows is an introduction to Descartes’ Rule of Signs, my contributions in extending one aspect of this, and an introdution to SONC polynomials.
</blockquote>

<a href="/assets/NelsonResearchStatement.pdf">Full Research Statement (PDF)</a>




<h2>
Friendly Introduction
</h2>

A polynomial $p$ has the following form:

$$ p = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0. $$

A root of a polynomial $f$ is a number $c$ for which $f$ evaluates to $0$, ie $f(c) = 0$. 

As an example, 

$$f(x) = x^2 - 1$$

has a root $x=1$, because

$$f(1) = (1)^2 - 1 = 0.$$

In fact $x=-1$ is also a root.

A positive root is just a root that is also positive. 
In our example, $x=1$ is a positive root, whereas $x=-1$ is not.

It can be useful to know the positive roots of a polynomial.
Maybe less useful, but still a good thing to know, is how many positive roots a polynomial has.

In general, the coefficients (the $a_i$) of a polynomial determine where and how many roots there are.
Remarkably though, if all we knew were which $a_i$ were positive and which were negative, we could still make statements about how many positive roots a polynomial has!

What's known as Descartes' rule of signs (named after 
<a class="external" href="https://en.wikipedia.org/wiki/Rene_Descartes">
Ren&eacute; Descartes</a>
) does exactly this. 

First though we need to define the notion of counting sign changes.

Consider the following list of numbers

$$1, -2, -7, 10, 0, 3.$$

If we were to read off the numbers of this list from left to right, the number of sign changes would be the number of times we went from a positive number to a negative number or vice versa.
Remember, $0$ is neither positive or negative, so if that ever appears in our list, we can just ignore it.

Thus 

$$ s( 1, -2, -7, 10, 0, 3) = 
s( 1, -2, -7, 10, 3) = 2 $$

and 

$$ s(0, -2, 0 ,3, -1, 1) = s(-2,3,-1,1) = 3. $$


Descartes' rule of signs says that for a polynomial

$$ f = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0, $$

the number of positive roots $p$ is less than or equal to the number of sign changes of the coefficients $a_i$ AND that these two numbers have the same parity (ie are both odd or both even).
That is to say

$$ p = s(a_n, a_{n-1} ,\dots, a_1, a_0) - 2k $$ 

for some $k\geq 0$.

As an example, we can immediately conclude that the polynomial

$$ f = x^{17} - 34x^{14} - 3x^{11} + 160 x^2 - 2$$

has at least one positive root. 
Can you see why?


Now imagine a system of polynomials, maybe something like $f=(f_1,f_2,f_3)$ where

$$\begin{align*}
f_1 &= a_{1200}x_1^2 + a_{1111}x_1x_2x_3 + a_{1001}x_3 + a_{1000} \\
f_2 &= a_{2101}x_1x_3 + a_{2111}x_1x_2x_3 + a_{2010}x_2\\
f_3 &= a_{3030}x_2^3 + a_{3021}x_2^2x_3 + a_{3100}x_1 + a_{3000}.
\end{align*}$$

It just got a lot harder.
This is an example of a system of multivariate polynomials and a statement like Descartes' rule of signs does not exist for these kinds of systems.


My research is motivated by this problem.
Exactly what I'm working on changes as I explore it, but in the end it relates to this.



