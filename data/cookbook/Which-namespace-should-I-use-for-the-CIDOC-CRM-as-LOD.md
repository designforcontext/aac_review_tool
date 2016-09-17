---
priority: 1
category: Triplestores, RDF, and Inferencing
---
### Problem Statement

Because the CRM is a conceptual reference model, the official definition does not include a mapping to RDF.  Several of these have sprung up, most notably the [Erlagen OWL model](http://erlangen-crm.org) and the official [CIDOC mapping](http://www.cidoc-crm.org/rdfs/cidoc_crm_v6.2.1-draft-b-2015October.rdfs).

In order to allow our implementations to interoperate, a specific namespace RDF  implementation of the CRM needs to be chosen.

### Best Practice:

Our recommendation is to use official CIDOC-CRM namespace (<http://www.cidoc-crm.org/cidoc-crm/>) and to use the `crm:` prefix in turtle or JSON-LD mappings.

### Discussion:

We talked about Erlagen OWL vs CIDOC-CRM RDFS.  Rob and David both prefer using the CIDOC namespace and using OWL, with inverse properties.  This means that we either have to convince Erlagen and CIDOC them to finish merging (which they've been talking about for a while) or write our own merge triples.  

*(From Vladimir)*

Use the official namespace.  BM and YCBA use ECRM because at the time the official namespace used local names that were Turtle and SPARQL unfriendly, e.g. E21.Person.  It only took me and the Erlangen people 2 years to convince the CRM-SIG to change to the ECRM form (underscores).


### Reference:

* [Erlagen OWL model](http://erlangen-crm.org)
* [CIDOC RDFS model](http://www.cidoc-crm.org/rdfs/cidoc_crm_v6.2.1-draft-b-2015October.rdfs)
* See also [How do we ensure predicates go both ways?](How-do-we-ensure-predicates-go-both-ways)

