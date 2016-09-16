---
title: How do we specify types for entities and predicates?
priority: 1
october: true
category: types
todo: true
---

### Problem Statement:

Often the browse application we need to treat entities with the same CRM class differently.  For instance, there are many man-made objects, but only some of them are works of art.

### Best Practice:

The AAC's best practice is to use P2_has_type to add clarifying details.

    aac:young_women_picking_fruit a crm:E22_Man-Made_Object;
        crm:P2_has_type aac:work_of_art.
    
    aac:work_of_art a E55_Type; 
        rdfs:label "Work of Art".


### Discussion:

We need to decide if we're subclassing entities or adding types.

    aac:young_women_picking_fruit a crm:E22_Man-Made_Object;
        crm:P2_has_type aac:work_of_art.

or 

    aac:young_women_picking_fruit a aac:work_of_art.
    aac:work_of_art rdfs:subClass crm:E22_Man-Made_Object.


*(From Rob Sanderson)*

Are we doing Linked Open Data for Museums, using CRM as one of the ontologies, or are we doing CIDOC-CRM with its Linked Open Data serialization?  If we're doing the former, that CRM happens to have P2_has_type doesn't mean we need to use it, but if we're doing than the latter,  we would.

Regular Linked Data would use subClassing and rdf:type for classes (thus at the ontology level), whereas the CRM projection into RDF builds it in to the regular set of predicates (thus at the individual instance level). My preference is for the latter, rather than creating our own little world apart from everyone else. So I would avoid P2 and E55. 

To then go to the question, if we had actual subclasses, we would refer from the class definition in the ontology to the AAT term that matches.

*(From Vladimir)*

This means a huge, badly defined and ever-changing class hierarchy.
Check the AAT Objects facet (which is fully half of AAT, some 21k concepts).
Trace some of the multi-parented hierarchies.
Is a watercolor a subtype of painting, or is that a technique?
I'd rather leave it to the terminologists to decide questions like this.

*(From Rob)*

As opposed to a huge, badly-defined and ever-changing concept hierarchy that’s at least 2 steps removed from the actual object?

Otherwise all we need is E1_Entity and just point at the AAT concept for Man Made Object. The current approach says CRM is the only ground truth, and everything else is a local idea with some relationship to a concept in a big old pool of stuff. A not unreasonable and pretty well known big old pool of stuff, of course :)


---

##### Top Level Entities

In RS I found that we needed to mark the "top-level" searchable E22
(artworks) somehow.  We had other E22, e.g.:

- Collections
- "real" object parts (e.g. frames). By "real" I mean there was separate info about them in the data.
- "fake" object parts (e.g. to model "movement made at" for a watch, you need to make a part of type "movement" even though you have little info about it)