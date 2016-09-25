---
title: Is there a generic relationship for undefined entity relationships?
priority: 3
category: Modeling
---
### Problem Statement:

When mapping relationships between entities, often there are relationships that exis, but the semantic nature of the relationship is either poorly defined, extremely variable, or an semantically accurate predicate is not known.  

In almost all cases, a well-defined relationship could be constructed, but the work to do so may exceed the value created by doing so in the eyes of the institution.

Is there a catch-all predicate that can be used in this situation, or should the data instead be discarded?

### Best Practice:

For two entities that are related, but where the nature of that relationship is not specified, use `dcterms:related`.

### Discussion:

*(From Rob)*

Use case for this?  If there’s an actual reason to say that there is some unknown relationship between two resources… `dcterms:related`?

*(From Vladimir)*


CRM doesn't have generic relations.  You could use `dct:related`, but it's best always to dig and see the nature of the relation from somewhere.

*(From Rob)*

I’m interested in the use case that this question came from.


### Reference:


