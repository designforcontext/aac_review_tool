---
title: How do I handle class and property-based traversal in the triplestore?
priority: 1
category: Triplestores, RDF, and Inferencing
---

### Problem Statement

The CIDOC-CRM, like many ontologies, relies heavily on subclassing and subproperties to provide much of the explantory power of the model.  In order to fully use this power, we need to at some point make explicit that assigning an entity a class implies that we have also assigned  all of that classes' superclasses to the entity, and that using a predicate implies all of its superproperties.

What is the correct technique for making these explicit?

### Best Practice:

*To Be Determined*

### Discussion:

*(From David)*

How should we figure out when and how to use inferencing?

*(From Rob)*

I think the applications should determine this, following from experimentation with what automatic inferences actually result in.  If you have bad data going in, automatically creating inferences from that data just results in even more garbage.  In other words, no need to decide now.


*(From Vladimir)*

That party depends on the queries. My experience re CRM (and what's used in the British Museum and we'll probably enable in CONA and JPGM) is RDFS (subproperty, optionally subclass), inverse, transitive.  In BM we also had special rules for implementing Fundmental Relations search. See two "CIDOC CRM" papers at <http://vladimiralexiev.github.io/pubs/>

*(From David)*

Linked Data has this idea of classes and inheritance, and it is pretty deeply embedded in the way that the CRM works as a mechanism to handle modeling at various levels of specificity.  It's a short-cut for data duplication.  We can say:

    <puam:person-institution/13984> a crm:E21_Person ;
        crm:P131_is_identified_by <puam:person-institution/13984/appellation> .

But, without inference, we'd have to explicitly write:

    <puam:person-institution/13984> a crm:E21_Person;
           a crm:E20_Biological_Object;
           a crm:E19_Physical_Object;
           a crm:E18_Physical_Thing;
           a crm:E72_Legal_Object;
           a crm:E70_Thing;
           a crm:E39_Actor;
           a crm:E77_Persistent_Item;
           a E1_CRM_Entity;
           crm:P131_is_identified_by <puam:person-institution/13984/appellation> ;
           crm:P1_is_identified_by <puam:person-institution/13984/appellation> .
    <puam:person-institution/13984/appellation> crm:P131i_identifies <puam:person-institution/13984> ;
           crm:P1i_identifies <puam:person-institution/13984> .

And so on, for every relationship.  All of these are true statements in the CRM, and we use class and property inference to avoid having to write them all out.  It lets the modeler use the most specific  statement they can, and vaguer ones are automatically included.

On the query side, it's the same:

    SELECT ?appellation 
    WHERE {
      ?artist a crm:E39_Actor; 
       crm:P1_is_identified_by ? appellation
    }

Is a nice, simple query.  Without inference, you have to query against every possible path:

    SELECT distinct ?appellation 
    WHERE {
     {
       ?artist a crm:E21_Person; 
       crm:P1_is_identified_by ?appellation.
     } UNION {
       ?artist a crm:E39_Actor; 
       crm:P1_is_identified_by ?appellation.
     } UNION {
       ?artist a crm:E21_Person; 
       crm:P131_is_identified_by ?appellation.
     } UNION {
       ?artist a crm:E39_Actor.
       ?appellation crm:P1i_identifies ?artist.
     } UNION {
       ?artist a crm:E21_Person.
       ?appellation crm:P131i_identifies ?artist.
     } UNION {
       ?artist a crm:E21_Person.
       ?appellation crm:P1i_identifies ?artist.
     } UNION {
       ?artist a crm:E40_Legal_Body; 
       crm:P1_is_identified_by ?appellation.
     } UNION {
       ?artist a crm:E40_Legal_Body; 
       ?appellation crm:P1i_identifies ?artist.
     } UNION {
       ?artist a crm:E40_Legal_Body; 
       crm:P131_is_identified_by ?appellation.
     } UNION {
       ?artist a crm:E40_Legal_Body.
       ?appellation crm:P131i_identifies ?artist.
     } UNION {
       ?artist a crm:E74_Group; 
       crm:P1_is_identified_by ?appellation.
     } UNION {
       ?artist a crm:E74_Group; 
       ?appellation crm:P1i_identifies ?artist.
     } UNION {
       ?artist a crm:E74_Group; 
       crm:P131_is_identified_by ?appellation.
     } UNION {
       ?artist a crm:E74_Group.
       ?appellation crm:P131i_identifies ?artist.
     }
    }

And notice that we're not taking into account artists that are not people or groups!  This wouldn't return animal artists, robot artists, or any other odd edge cases, even though the CRM explicitly has modeling abilities to handle these things.

To deal with this problem, we have a couple options:

1).  Use a query store that does inferencing.  This lets the modeler use the most specific pattern, the querier use a less specific pattern, and as long as the statements are true, it will return values.  This is definitely the best option.

2).  Use a reasoner to auto-expand the triples before ingest.  This will take the first model form and automatically create the second form, which will then be ingested.  It means there's a lot of duplicated data in the triple store (and things like pubby are a lot less useful), but it allows the modeler and the querier to be appropriately specific.

3).  Make the querier check against every possible option.  This is technically possible,  but as you can see, for even the simplest query this gets absurdly long.  

4).  Make the modeler do the expansion by hand.  This is the current suggestion of ISI; the student will model all of the hierarchy that they think is important (mostly inverses, and maybe a couple core classes, but not the whole chain).  This sort of works, but is more work for the modeler and prone to human error, and it means that what is and isn't modeled has to be communicated out-of-band, in documentation.

5).  Define explicitly what we will use, and enforce consistency at the lowest possible denominator.  If we say that we will only use `crm:E39_Actor` and `crm:P1_is_identified_by`, we can avoid this problem on both ends.  But at that point, we might as well use dublin core, or foaf, or a CSV file.  We have lost all the expressive power of Linked Data, and we're just making our lives complicated for no good reason.

### But Why?

Vladimir 12/13/2016: for all that inferencing, use a proper triplestore like GraphDB.
See "Large-scale Reasoning with a Complex Cultural Heritage Ontology (CIDOC CRM)" at my [pubs](http://vladimiralexiev.github.io/pubs/): it inferred 4.7x more statements, for a total of 916M, without a hitch.

But David, you should also ask yourself, do we need all of that inference? Who's going to query by class Propositional Object or Symbolic Object (I can never remember the difference). Or look at slide 14: given 2.5M museum objects, we had 17M Legal Objects (Lawyers of the world, rejoice!), and BM did't even have any Rights statements. 37% of all statements were type statements

### Reference:

* See also the discussion of [inferencing](How-do-I-ensure-predicates-go-both-ways).
