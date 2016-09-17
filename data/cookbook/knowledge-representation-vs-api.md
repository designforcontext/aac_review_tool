---
title: How do I handle complexity in knowledge representation?
priority: 1
category: Modeling
---
### Problem Statement:

The CIDOC-CRM defines a specific way to model many relationships between entities.  However, other ontologies also define conceptually-similar relationships, often in much simpler ways.  For example, take the first name of an actor:

    _:actor crm:P131_is_identified_by _:actor_name.
    _:actor_name a crm:E82_Actor_Appellation;
    crm:P106_is_composed_of _:name_part.
    _:name_part a crm:E82_Actor_Appellation;
        crm:p2_has_type institution:first_name_type.
        rdfs:label "John".
    institution:first_name_type a crm:E55_Type;
        skos:broadMatch aat:300404651.

and also

    _:actor foaf:firstName "John".

Additionally, museum data often is complex enough that in order to correctly model the information available, mapping has to happen not at the row level, but at the individual cell level.  For example, when determining what the relationship "after" means when discussing two artworks, it is possible that depending on the relationship between the two people and the two works, the CRM mapping of that relationship could be wildly different.

When and how is it appropriate to simplify the graph, and at what stage in the pipeline is this most appropriate?  



### Best Practice:

*To Be Determined*

### Discussion:

Rob's suggestion is to publish the simple version and construct the longer version only as needed.  David's suggestion is to publish the longer version and construct the shorter one for use in the browse app.  Option three is to publish both, which creates data duplication.  

*(From Rob)*

First there’s the discussion around the use of other ontologies, then the creation of new ones if needed.  If we can import terms from existing places, so much the better. And (IMO) if the resulting model is simpler but just as expressive, we should do that in preference to using a more complex CRM pattern.  As simple as possible, and no simpler.

Regarding other ontologies, `dc:` and `schema:` seem two strong candidates, along with any W3C ontology.

*(From David)*

For complicated knowledge modeling problems, ones that require a significant amount of cell-by-cell modeling, my recommendation is to find a good example, preferably one that exposes information across institutions, and to model it as a best practice using the full CRM constructs.

This can be added to the AAC triplestore by hand and demoed in the browse application as an example of the fullest potential of the CRM.

Additionally, we should identify a shortcut technique that is simple to execute in Karma and recommend it as a good practice for the AAC.

Ideally, it would be possible for a single query to locate both of these (when executed against the shortcut), but if this is not possible it should be flagged as such in the AAC and an API structure defined to abstract the complexity.  


### References:

* See Github Issue NPG #49

