---
title: How do I model lists of entities or multiple values?
priority: 2
category: Modeling
answered: false
---
### Problem Statement:

Often the boundary between an entity and and a collection of entities is somewhat fuzzy.  Items are made up of parts, entities are collected into collections, or people have many names.  

Additionally, oftentimes we care about the order of these items—by which we mean that the order in which these entities are listed has some sort of meaning.

What are our best practices around collections, parts, and lists?

### Best Practice:

There are three typical types of collections:

If an entity consists of a collection of parts, there are CRM predicates that allow you to compile a collection of parts: `P46 is composed of`, `P106 is composed of`, `P5 consists of`, and several others.  These allow you to specify the specific parts of an entity.

Collections of entities (For instance, a group of objects) are best modeled as a `E19 Physical Object`.  For the specific case of a curated holding of objects, `E78 Collection` is applicable, but pay close attention to the scope note when deciding to use this structure.

Multiples of an object must be semantically modeled in some way. Worst case, use `P15 was influenced by` as a way to link the creation events, or `dcterms:related` to specify a completely non-semantic relationship, but know that this is not a recommended practice.

When lists are ordered, the best practice is to determine the specific semantic meaning encoded in that order, and model that semantic meaning.

Another common use case is when the first item of the list is the preferred type, and all others are alternates.  In this case, indicating a preferred value by typing it with `aat:300404670` is a good practice.

However, if either of those prove to be difficult, a good practice is to encode the ordering data in some way in the interest of data fidelity.  The encoding of the information is up for discussion.

### Discussion:

*(From Rob)*

We should use rdf:List.  Choice is a pattern for selecting one of a list of alternatives.  We should avoid the magic predicate solution of rdf Containers like Seq, Bag and Alt.  All of this especially because rdf:List serializes nicely in Turtle and JSON-LD, which I hope will be our two primary representations.

*(From Vladimir)*

Disagree. Just because something looks nice in 2 serializations doesn't mean it's easy to query. And Rob, only a list with BLANK nodes looks good in Turtle, but you also dislike blank nodes.

Read [the specific requirement/discussion on github](https://github.com/american-art/npg/issues/34).  It's whether to order things like Sitters at all. Steve says no, I say yes...


But the major statement is that someone is a sitter:

    <object> P62_depicts <sitter1>, <sitter2>.

If we do a list, the expanded triples are like this:

    <object> P62_depicts <object/sitters/1>.
    <object/sitters/1> a rdf:List; 
        rdf:first <sitter1>; 
        rdf:next <object/sitters/2>.
    <object/sitters/2> a rdf:List; 
        rdf:first <sitter2>; 
        rdf:next rdf:nil.

How can one easily find all objects where <sitter/2> appears?

Since the order is subsidiary info, we can tack it as `crmx:displayOrder` somewhere. In this particular case it'll have to be a reification (below), but in many other cases it's in an node we have anyway (e.g. in Title or Production activity i.e. object-actor association).

    <object> crm:P62_depicts <sitter1>, <sitter2>.

    <object/sitter/1> a crm:E13_Attribute_Assignment;
       crm:P140_assigned_attribute_to <object>;
       crmx:property crm:P62_depicts;
       crm:P141_assigned <sitter1>;
       crmx:displayOrder 1.

    <object/sitter/2> a crm:E13_Attribute_Assignment;
       crm:P140_assigned_attribute_to <object>;
       crmx:property crm:P62_depicts;
       crm:P141_assigned <sitter2>;
       crmx:displayOrder 2.

*(From Rob)*

SPARQL 1.1 improves the interactions with rdf:List using property paths. But I’m sure you know that :)

> And Rob, only a list with BLANK nodes looks good in Turtle, but you also dislike blank nodes.

Sure — because I don’t know of a use case that says you need to refer to the index of an object in a particular ordering.  If we have such a use case, then we should use something like OAI-ORE’s proxy construction, or the OLO / CO / schema pattern of ListItem which enforces the creation of the identifiable proxy. Or as you have below, reification (which is the same pattern as ORE). It just makes everything much harder to implement and use, so use cases should be the first discussion.

> How can one easily find all objects where <sitter/2> appears?

<https://www.w3.org/TR/sparql11-query/#collections>


>Since the order is subsidiary info, we can tack it as crmx:displayOrder somewhere.


Right. You can always assign identity to the object-in-context-of-other-object that rdf:List uses a blank node for.

The question is whether this is *required*. I don’t see the need for ordering sitters in a painting… again … what are the use cases where the complexity of ordering outweighs the lack of descriptive fidelity of unordered properties.  Importantly, how will applications make use of that information?

*(From David)*

Do we have any mapped relationships between multiples of objects? (Sets, Triptycs, etc.)

*(From Rob)*

I think that would be valuable, especially for exhibitions (including multiple stops), as they would serve multiple purposes:
  — provide links between resources from different institutions that otherwise might not be connected
  — provide a discovery mechanism across institutions
  — exercise both CRM and IIIF
  — hopefully expose some of the work done for the exhibition in terms of curation

*(From Vladimir)*

From my experience with Archiving (we're in the EHRI project), these above are very different animals.
There's no good semantic model of EAD (the XML archival standard). I know about two, but each has its problems.

It would definitely be great to discover Exhibitions that showed objects from the different museums. But first we'd need to coreference exhibitions across museums. I'm not aware of any work in that direction, or a global register of exhibitions.

Overall on the above question, I think it should be addressed from the "browse app requirements" point of view.

*(From Rob)*

Agreed.  Let’s not derail the discussion by looking at archival practices and RDF!

*(From Duane, via email, 9/19/2016)*

Ordering will be useful, and hopefully it is provided explicitly in the data provided by institutions, rather than implicitly based on the row sequence in data exports. I will try to find some good use cases with partner museum data. I believe there will be some around subjects, and certainly where there are sets of works (like triptychs, series, etc.). Also, where institutions start getting into scholarly content, as you know the author order matters. I have some clients teeing up who want to combine museum and archive materials, or scholarly OSCI-like materials that are associated with collections and archives. They want to leverage patterns from AAC for their collection work, but then combine it with other types of things.

### Reference:

* <https://github.com/american-art/npg/issues/34>
* <https://github.com/american-art/autry/issues/37>
* <https://www.w3.org/TR/sparql11-query/#collections>


