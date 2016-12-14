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

*(Vladimir 1214/2016)*

CRM SIG has a grudge with ECRM because it includes Restrictions (eg a Legal Object must have at least one Right, an Activity must have at least one performed_by Agent) and Disjoints (eg an Actor cannot be Legal Object). But nobody has argued against other goodies in ECRM: inverses and transitives.

So I made a script `ecrm-simplify.xq` that produces ECRM "app profiles", i.e. allows you to pick constructs you like and leave out constructs you don't like. For 2.5 years now, ECRM have been producing such profiles (earliest was `ecrm_150218-inverse-transitive.owl`). 

I think we should use `ecrm_current-inverse-transitive.owl`, but rewrite the URLs to CIDOC URLs.
Separately, the utility and the precise level of inference should be discussed. Or just use GraphDB and be content with 4.7x expansion and 37% type statements (see ref at TODO sibling page).

### Reference:

* [Erlagen OWL model](http://erlangen-crm.org)
* [Erlangen CRM on Github](https://github.com/erlangen-crm/ecrm)
* [ecrm-simplify.xq](https://github.com/erlangen-crm/ecrm/blob/master/ecrm-simplify.xq): Vladimir's script
* [ecrm_current-inverse-transitive.owl](https://github.com/erlangen-crm/ecrm/blob/master/ecrm_current-inverse-transitive.owl): use this version
* [CIDOC RDFS model](http://www.cidoc-crm.org/rdfs/cidoc_crm_v6.2.1-draft-b-2015October.rdfs)
* See also [How do we ensure predicates go both ways?](How-do-we-ensure-predicates-go-both-ways)

