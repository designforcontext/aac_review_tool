---
priority: 2
category: modeling
todo: true
---

### Problem Statement:

THIS APPEARS SOMEWHERE ELSE

### Best Practice:

    skos:prefLabel "Name of Term".

### Discussion:

*(From David)*

 Do we need to distinguish between different institutional terminology for things when labeling fields? (Object ID vs Accession Number)

*(From Rob)*

I would answer the first question as no, if the semantics are actually the same and thus the data is comparable.  We should maintain some degree of separation between the semantic data and the way that’s rendered to users by different applications.  If (e.g.) Princeton wishes to use Object ID in their application, and Colby prefer Accession Number, no problem.  On the other hand, if there is a real semantic difference between those two, we should model them that way.

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

-------


---
oct: true
---

### Problem Statement

What is the strategy around linking AAT terms to the institution vocabs

### Best Practice:

### FOR ENTITIES

When the term does not exist, but is created in the mapping process OR if the instituion directly uses AAT

    _:entity crm:P2_has_type aat:123456;
      dcterms:source aat:aat_itself;
      skos:prefLabel "AAT Term".

If the institution has a term that they have reconciled with the AAT or other vocabularies

    _:entity crm:P2_has_type _:institution_type.

    _:institution_type a E55_Type;
      skos:prefLabel "Institution Term";
      dcterms:source institution:their_id;
      skos:broadMatch aat:123456.
    aat:123456 dcterms:source aat:aat_itself;
      skos:prefLabel "AAT Term".

(See Kate's spreadsheets for many of these mappings)

### FOR PREDICATES

*to be determined at the October meeting*

### Discussion:


> How do we know the source of an external reference (ULAN vs VIAF) using only RDF, and not by parsing the URLs?

If someone just gives you a URL, you'll have to parse the URL.
- ULAN has such links, e.g.
  ulan:nnnn skos:inScheme ulan:
  But to get them, you need to load the full ULAN.
- VIAF doesn't have such links. But you can add them to you repo e.g. like
  viaf:nnnn void:inDataset viaf:
  

### Reference:






