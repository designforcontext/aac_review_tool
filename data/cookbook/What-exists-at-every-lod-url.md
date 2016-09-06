### Problem Statement:



### Best Practice:

*To Be Determined*

### Discussion:


*(From Rob)*

I don’t follow the question.  Surely when you dereference a URI you get back the representation of that resource?


*(From Vladimir)*

A very good question, which also relates to Branding.

I'd guess e.g. PUAM will prefer <http://data.artmuseum.princeton.edu/object/1> rather than <http://data.americanartcollaborative.org/puam/object/1>. However, if institution-branded URLs are used, then it is very desirable they resolve, which means

- either each institution should deploy semantic infrastructure
(repo+conneg+resolution), or
- sophistictated proxying (i.e. the host name data.artmuseum.princeton.edu
being handled by the americanartcollaborative.org domain).

Resolution of institution URLs is desirable but not absolutely necessary: the repo can contain statements about them, even if it's hosted at americanartcollaborative.org. And the RDF frontend and browse app can display that info.

Overall, I vote for institution-branded URLs, it's the better future-proof decision.

If we're going to use americanartcollaborative.org URLs, there's another systemic error in the URLs: they all start http://americanartcollaborative.org/.  Does that mean the current website will be destroyed and replaced with an RDF app (like pubby)? Doubt it.  So they should start with http:/data.americanartcollaborative.org/ (notice "data").

### Reference:


