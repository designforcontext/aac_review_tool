---
priority: 2
category: Reconciliation
---
### Problem Statement:

One of the most important concepts in Linked Open Data is the linking of entities across graph boundaries.  This is essential both for reconciliation (asserting that your entity is the same as another entity) and for knowledge sharing (using statements from another graph to gain additional information about your entity). 

To bridge between graphs, there are several predicates that are available in different vocabularies, including `owl:sameAs`, `skos:exactMatch`, and `skos:broadMatch`.

What is best practice for linking across graphs?

### Best Practice:

Our recommended **Linking Technique** is to use the [skos:mappingRelation](http://www.w3.org/TR/skos-reference/#mapping) to communicate these matches.  [owl:sameAs](http://www.w3.org/TR/owl-ref/#sameAs-def) has inherent issues when connecting things that are "the same" when there is a lack of complete agreement between institutions on all particulars of the entity or where entities prefer to maintain their authority in part for the entities.

The the [skos:mappingRelation](http://www.w3.org/TR/skos-reference/#mapping) provides five options for us to use:

* `skos:broadMatch`
* `skos:narrowMatch`
* `skos:closeMatch`
* `skos:exactMatch`
* `skos:relatedMatch`

For **instance-based authorities**, we recommend using `skos:closeMatch` or `skos:exactMatch`.  The primary difference between these two is if the relationship is *transitive*, meaning that if A -> B and B -> C,  A -> C.

For example, 

    saam:mary_cassatt skos:closeMatch ulan:mary_cassatt .
    crystal_bridges:mary_cassatt skos:closeMatch ulan:mary_cassatt .
    # does not imply that
    saam:mary_cassatt skos:closeMatch crystal_bridges:mary_cassatt.

but 

    saam:mary_cassatt skos:exactMatch ulan:mary_cassatt .
    crystal_bridges:mary_cassatt skos:exactMatch ulan:mary_cassatt .
    # *does* imply that
    saam:mary_cassatt skos:exactMatch crystal_bridges:mary_cassatt.

The official recommendation from the W3 is:

> The property `skos:closeMatch` is used to link two concepts that are sufficiently similar that they can be used interchangeably in some information retrieval applications. 

> The property `skos:exactMatch` is used to link two concepts, indicating a high degree of confidence that the concepts can be used interchangeably across a wide range of information retrieval applications.

Since all `skos:exactMatch` statements are *also* `skos:closeMatch` statements by definition, the Browse application will use `skos:closeMatch` to look for connections between entities, however we recommend using `skos:exactMatch` to indicate any matches that have been reviewed and approved by a human. 

For **Hierarchical authorities**, we recommend using `skos:broadMatch` to define the connection between your internal authority and the external authority.  This connection implies that your concept is *more specific* than the concept linked to in the external authority.  For instance:

    saam:oil_on_canvas  skos:broadMatch aat:oil_paint

implies that while it would be correct to state that SAAM's oil on canvas is a type of `aat:oil_paint`, there are details and about SAM's definition that are more specific than the AAT's. Read this statement as saying that SAAM's Oil on Canvas term *has a broader match in* AAT's Oil Paint term.

When deciding if this is an appropriate link, it is useful to think about this in the context of search or grouping.  If we returned all items that were `aat:oil_paint`, would you want objects that hold `saam:oil_on_canvas` to come back?

We recommend **not** using `skos:narrowMatch`.  This states that your concept is a generalization of the specific match, and unless you are committed to doing so comprehensively, it's not a useful practice.

_(The only time to consider using `owl:sameAs` is if an institution has chosen to use an external vocabulary as their source of authority and they do not maintain any additional metadata about that statement.  At that point, we would recommend mapping this relationship using the URI of the external authority directly, but, if for technical reasons this is impossible, the other option is publishing your internal URI and using `owl:sameAs` to connect it to the entity. It is important to realize that in either case this connection means that there is no longer a way to recognize your agency in asserting this fact—you are stating it as a definative fact.)_

### Discussion:

*(From Rob)*

+1 to star shaped and the use of skos.

*(From Vladimir)*

The recommended way to link two real-world entities is with owl:sameAs, but you have to be careful because that has rather strong semantics: it says to "smuch" the two URLs (at least conceptually) so they share all their statements.

In other words, you'd have one resource known by two URLs.

SKOS uses `skos:exactMatch` rather than `owl:sameAs` because in two different thesauri you'd have different provenance info (e.g. dc:creator, dc:date) about the same concept.

`skos:exactMatch` has no semantic implications except:

- it's an equivalence relation (transitive, symmetric, reflexive)
- it implies both subject and object are `skos:Concept`.

---

**Option 1:**

    :A a E21_Person.
    :B a schema:Person .
    :A owl:sameAs :B . 


**Option 2:**

    :A a E21_Person.
    :B a schema:Person .
    :A skos:exactMatch  :B . 

**Option 3:**

    :A a E21_Person .
    :B a schema:Person .
    :C a E91_Co-Reference_Assignment ;
      P155_has_co-reference_target :A ;
      P153_assigned_co-reference_to :C.

If you want to track provenance of coreferences, that's a good way (though EDOAL much predates this CRM way).

**Option 4:**

    :A a E21_Person .
    :B a schema:Person .
    :C a E91_Co-Reference_Assignment ;
       P155_has_co-reference_target :A ;
       P153_assigned_co-reference_to :D .
    :D a E32_Authority_Document ;
      skos:exactMatch :B .

*(From Vladimir)*

This is completely wrong. E32_Authority_Document is a thesaurus (corresponds to skos:ConceptScheme), so it can't be a match to an individual (person).

**Option 5:**

    :A a E21_Person .
    :B a gvp:PersonConcept .
    :C a E32_Authority_Document ;
      P71_lists _:A ;
      skos:exactMatch _:B .

*(From Vladimir)*

Same mistake here: `E32_Authority_Document` can't be a matched to an individual `gvp:PersonConcept`.

---

About gvp:PersonConcept: ULAN uses SKOS and Schema, see
<http://vocab.getty.edu/doc/#ULAN_Specifics>. E.g. for a person you'd have:

    ulan:500011051 a skos:Concept, gvp:PersonConcept; 
      skos:prefLabel "Rembrandt van Rijn";
      foaf:focus ulan:500011051-agent.
    ulan:500011051-agent a schema:Person. 
      # with nationality, biography, and events attached

If it used CRM, it could look like this (but Martin Doerr says concepts should never be used for specific entities like people).

    ulan:500011051 a E55_Type; 
      P71i_listed_in ulan:nnnn ; 
      P129_is_about ulan:500011051-agent.
    ulan:nnnn a E32_Authority_Document.
    ulan:500011051-agent a E21_Person.

### Reference:

* <http://www.w3.org/TR/skos-primer/>
* <http://www.getty.edu/research/tools/vocabularies/Linked_Data_Getty_Vocabularies.pdf>


