---
priority: 3
title: What is returned when a URL is dereferenced?
category: Defining URL Structures
---
### Problem Statement:

Linked Data URIs are used as globally unique identifiers within the graph structure.  However, one of the major benefits of Linked Open Data is that these identifiers can be dereferenced.  Typically this means that is you enter a LOD URI into a web browser, you are returned a human-readable representation of the LOD Entity that is represented by that URI.  Often (but not always) this is different than the collection website URI.  Also, it is common best practice in the Linked Open Data world to return a RDF representation of the entity from that URL using content negotiation or other techniques.

However, neither of these are strictly required for Linked Data. Within the context of the American Art Collaborative, what will be returned to a user if the user dereferences a URL, and what technical infrastructure is required?

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

*(From Rob, via email, 9/19/2016)*

You know my preference for JSON-LD as default, with other representations via conneg.

*(From David, via email, 9/19/2016)*

I think what we're looking here is that /something/ needs to be returned here.  It's not obvious whose responsibility it is to make sure the URLs dereference to something.   My preference would be a pubby-style HTML and a RDF in at least one form—I don't care at all what it is.

### Reference:

