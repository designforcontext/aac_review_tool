---
priority: 3
title: What is returned when a URL is dereferenced?
category: Defining URL Structures
---
### Problem Statement:

Linked Data URIs are used as globally unique identifiers within the graph structure.  However, one of the major benefits of Linked Open Data is that these identifiers can be dereferenced.  Typically this means that is you enter a LOD URI into a web browser, you are returned a human-readable representation of the LOD Entity that is represented by that URI.  Often (but not always) this is different than the collection website URI.  Also, it is common best practice in the Linked Open Data world to return a RDF representation of the entity from that URL using content negotiation or other techniques.

However, neither of these are strictly required for Linked Data. Within the context of the American Art Collaborative, what will be returned to a user if the user dereferences a URL, and what technical infrastructure is required?

### Best Practice:

When a Linked Data URI is dereferenced using a web browser, a human-readable version of the entity that exists at that URI is returned as HTML.  AAC will be using [Pubby](http://wifo5-03.informatik.uni-mannheim.de/pubby/) as the software used to provide that functionality. 

AAC will also use content negotiation to allow a semantic web crawler to ask for that entity as RDF; this functionality is also included in Pubby.

AAC's use of Pubby is optional; institutions that already have infrastructure to handle dereferencing URIs as both HTML and RDF will continue to use their own solutions.

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

*(From David, following meeting on 9/28/2016)*

The discussion we had today was around what is returned when a AAC partner LOD URL is dereferenced.  In (slightly clearer) english, if "Young Women Picking Fruit" has the AAC URI http://records.cmoa.org/objects/555-1212, when I put that URI in a web browser, what comes back?  

Our consensus agreement was:

ISI is willing to host, for a period of time, a Pubby instance that returns a human-readable version of that linked data. if you put it directly in a web browser, I, it will return a website that should look similar to what comes back from YCBA or SAAM's linked data right now.  Also, if you use content negotiation (don't ask) and ask for it as RDF, you can get a N-triples version. 

For institutions that have the capability and desire to host their own RDF immediately (which might include YCBA and SAAM) we can skip this step and point directly to your existing domain.  ISI will provide you the RDF via Github, and you can do what you will with it.

For institutions that can quickly set up a DNS redirect that points their preferred domain to ISI's server, their preferred URIs will resolve against ISI's pubby.  (In the future, ISI can work with the partners to take over hosting of their own RDF, or institutions can do it on their own, or TBD.)

For institutions that require a slightly longer time to establish a DNS redirect, ISI will assign a placeholder root domain (something like http://data.americanartcollaborative.org/saam/object/12345) so we can begin testing against that URL immediately.  Once the redirect is in place, we'll add that fix to a list of fixes that ISI will make to the model just before the AAC project is complete, so the final published data will reflect the institution's desired URLs.

### Reference:

* [Pubby](http://wifo5-03.informatik.uni-mannheim.de/pubby/)