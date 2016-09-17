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

For textual content that you wish to make statements about (such as authorship or creation date), use a `crm:E33_Linguistic_Object`, which has a `crm:P3_note` with the actual content and a `crm:P2_has_type` with an explanation of what type of content it contains.

### Discussion:


### Reference:
