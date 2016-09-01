### Problem Statement

Because the CRM is a conceptual reference model, the official definition does not include a mapping to RDF.  Several of these have sprung up, most notably the [Erlagen OWL model](http://erlangen-crm.org) and the official [CIDOC mapping](http://www.cidoc-crm.org/rdfs/cidoc_crm_v6.2.1-draft-b-2015October.rdfs)

We need to choose a specific namespace.

### Best Practice:

We will be using the official CIDOC-CRM namespace (<http://www.cidoc-crm.org/cidoc-crm/>). 

See also [How do we ensure predicates go both ways?](How-do-we-ensure-predicates-go-both-ways%3F)

### Discussion:

We talked about Erlagen OWL vs CIDOC-CRM RDFS.  I think Rob and David both prefer using the CIDOC namespace and using OWL, with inverse properties.  This means that we either have to convince Erlagen and CIDOC them to finish merging (which they've been talking about for a while) or write our own merge triples.  

*(From Vladimir)*

Use the official namespace.  BM and YCBA use ECRM because at the time the official namespace used local names that were Turtle and SPARQL unfriendly, e.g. E21.Person.  It only took me and the Erlangen people 2 years to convince the CRM-SIG to change to the ECRM form (underscores).

* Inferencing

*(From Rob)*

I think the applications should determine this, following from experimentation with what automatic inferences actually result in.  If you have bad data going in, automatically creating inferences from that data just results in even more garbage.  In other words, no need to decide now.


*(From Vladimir)*

That party depends on the queries. My experience re CRM (and what's used in the British Museum and we'll probably enable in CONA and JPGM) is RDFS (subproperty, optionally subclass), inverse, transitive.  In BM we also had special rules for implementing Fundmental Relations search. See two "CIDOC CRM" papers at <http://vladimiralexiev.github.io/pubs/>


### Reference:

* [Erlagen OWL model](http://erlangen-crm.org)
* [CIDOC RDFS model](http://www.cidoc-crm.org/rdfs/cidoc_crm_v6.2.1-draft-b-2015October.rdfs)