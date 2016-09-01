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

### Best Practice:

### Discussion:

Rob's suggestion is to publish the simple version and construct the longer version only as needed.  David's suggestion is to publish the longer version and construct the shorter one for use in the browse app.  Option three is to publish both, which creates data duplication.  

*(From Rob)*

First there’s the discussion around the use of other ontologies, then the creation of new ones if needed.  If we can import terms from existing places, so much the better. And (IMO) if the resulting model is simpler but just as expressive, we should do that in preference to using a more complex CRM pattern.  As simple as possible, and no simpler.

Regarding other ontologies, `dc:` and `schema:` seem two strong candidates, along with any W3C ontology.


### References:



