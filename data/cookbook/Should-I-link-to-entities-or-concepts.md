---
title: Which entity should I link to in an authority file?
priority: 2
category: Reconciliation
---

### Problem Statement:

When reconciling our data against authority files, often there are two entities described in the authority file.  One represents the concept, and the other the entity.

For example, ULAN has `ulan:500012368`, which represents the ontology entry for Mary Cassatt, but they also have `ulan:500012368-agent`, which represents Mary Cassatt herself.  

When we are reconciling the Actors or other entities represented in our data, which of these entities should I link to?

### Best Practice:

*To Be Determined*

### Discussion:

*(From Rob)*

(delete rant about ULAN modeling) I suggest <http://lexvo.org/ontology#isFocusOf> (inverse of foaf:focus) And I have suggested (several times) that this should be in ULAN and TGN natively.

*(From Vladimir)*

The best is to use the ulan:nnnn-agent URL directly.
You could make statements about it (e.g. names coming from local data) in your repository.  Of course, if you want to analyze which data about agents came from which institution, then you need own URLs, and can connect them with sameAs.

### Reference:

* <http://lexvo.org/ontology#isFocusOf>
* <http://www.getty.edu/research/tools/vocabularies/Linked_Data_Getty_Vocabularies.pdf>
