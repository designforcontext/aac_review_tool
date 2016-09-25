---
title: What are best practices for modeling text strings?
priority: 2
category: Labeling
---
### Problem Statement:

One of the most common uses of Linked Open Data and the CIDOC-CRM is to display text to a human. Because of this, there are many semantically valid techniques for modeling text fields.  Additionally, it is essential that every entity have an associated label, but there are many valid ways to  model those labels.

Which predicates and entities are appropriate for modeling textual information?

### Best Practice:

Best practice is to have an `rdfs:label` for every entity.  

If there are multiple possible labels for an entity, a single `skos:prefLabel` is best practice, with alternate labels as one or more `rdfs:label` tags.  `skos:prefLabel` is a subclass of `rdfs:label`, meaning all `skos:prefLabel` properties are also `rdfs:labels`, so it is not required to duplicate data across them.

Additionally, it is a good practice to use the CIDOC-CRM Appellation classes to model the appellations of entities, since often additional statements or types need to be associated with those appellations.  Even if an entity has an appellation, it is still appropriate to attach a `rdfs:label` to that entity.

For longer-form content within the CIDOC-CRM, it is appropriate to use `crm:P3_has_note`. A good rubric to use is to use `crm:P3_has_note` when the content is *about* the entity, and `rdfs:label` and appelations when it *names* the entity.  

For textual content where you need to associate additional statements with the text, such as an explicit predicate for authorship or for publication date, use a `crm:E33_Linguistic_Object`, which has a `crm:P3_note` with the actual content and a `crm:P2_has_type` with an explanation of what type of content it contains.

### Discussion:

*(From Rob, via email, 9/19/2016)*

+1 to rdfs:label, with skos:prefLabel/altLabel.

For appellations, I agree *if* there is a need to associate information with the string, then yes, it needs the node. Could we call that out more explicitly?

-1 to P3_has_note.  It's used for a dumping ground of everything.  Even dc:description has better semantics than has_note.

*(From David, via email, 9/19/2016)*

I'm mostly worried about being able to tell different bits of content apart here.  Personally, P3_has_note is only useful as a place to actually stick the text for entities that /are/ text, things like provenance, or biographies, or visual descriptions of work.  I don't want them all to be linguistic objects without a way to tell them apart, and I really don't want them to be random notes glued onto things.

*(From Duane, via Email, 9/23/2016)*

Agreed. It is important for the UI to present different text elements appropriately for the substantive content they contain, in order for AAC data to be credible and reflect the expectations of each institution. Particularly where data may have more than one associated item of text, they need to be typed.

### Reference:
