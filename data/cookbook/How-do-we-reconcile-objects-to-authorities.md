### Problem Statement:

### Best Practice:

*To Be Determined*

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


