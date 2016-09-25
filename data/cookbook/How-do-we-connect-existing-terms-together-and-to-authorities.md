---
title: How do I reconcile intitutional thesauri to external thesauri?
priority: 2
category: Reconciliation
---

### Problem Statement:

Museum practice tends to involve a significant amount of categorization and term creation.  Many of these terms are pulled from institutional vocabularies that share many concepts with external or peer vocabularies, but without a reconciliation process it is impossible to determine these relationships.

Also, often individual entities are implicitly typed, but this typing is made explicit as part of the mapping process by connecting the entity through `crm:P2_has_type` to an external vocabulary.

What is the appropriate RDF predicates to use to connect these internal vocabularies to external thesauri? 

### Best Practice:

When the term does not exist but is created in the mapping process, or if the instituion internally uses the external vocabulary, use `P2 has type` directly with the URI, and import the source and a preferred label into your graph.

    _:entity crm:P2_has_type aat:123456.
    aat:123456 skos:inScheme aat: ;
      skos:prefLabel "AAT Term".

If the institution has a internal term that they have reconciled with the AAT or other vocabularies, preserve that term, and use `skos:broadMatch` to indicate the connection between that term and the external term.  Also, import the source of the term and a preferred label into your graph.

    _:entity crm:P2_has_type _:institution_type.

    _:institution_type a E55_Type;
      skos:prefLabel "Institution Term";
      skos:inScheme institution: ;
      skos:broadMatch aat:123456.
    aat:123456 skos:inScheme aat: ;
      skos:prefLabel "AAT Term".

### Discussion:

*(From Vladimir)*

I agree about already existing per-museum concepts (e.g. the TMS "Terms" and "TermXRef" tables).  For these we should look at coreferencing them against each other.  But when a new concept is being minted, we better do just one (in AAT or AAC-terminology).

Do you agree that instead of this:

    _:title a E35_Title; p2_has_type _:title_type
    _:title_type a E55_Type;
      skos:exactMatch institution:primary_title_type.
      skos:broadMatch aac:primary_title_type

We should use the target concept directly, which is much simpler:

    _:title a E35_Title; p2_has_type aac:primary_title_type

A month ago I wrote about the LIDO Terminology group, and sent links to their staff asking for comments, and to some Getty mapping sheets (but these are not comprehensive).

### Reference:

* (See Kate's spreadsheets for many of these mappings)




