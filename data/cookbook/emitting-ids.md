---
title: Should I model internal identifiers or fields as part of my mapping?
priority: 2
category: Modeling
---

### Problem Statement

Within our published data, there are many fields that exist as part of our internal systems, but do not have any meaning outside the system.  Database IDs, Object IDs, timestamps, or generated GUIDs are examples of these fields.

Are these fields important to model as part of our mapping?

### Best Practice:

Fields that have no use outside of the system do not need to be mapped.  However, it is often difficult to determine what fields could be useful to an external user.  For example, reconciliation against internal identifiers would require that internal ID to be present in the URI, and often legacy systems that exist within your institution count as "external users".

Our recommendation is that any ID that has been used by any system be mapped as part of the linked data.  These IDs should be assigned a meaningful, unique type, and these types should be given a meaningful label.

We also recommend that the ID most commonly used by humans should be the mapped using the `P48 has preferred identifier` predicate.  For museum objects, this is often the accession number, but which ID is up to the mapping instution.

### Discussion:

*(From Duane)*

Both object ID and accession number should be emitted as identifiers in the Linked Data.


*(From David)*

 Do we need to distinguish between different institutional terminology for things when labeling fields? (Object ID vs Accession Number)

*(From Rob)*

I would answer the first question as no, if the semantics are actually the same and thus the data is comparable.  We should maintain some degree of separation between the semantic data and the way that’s rendered to users by different applications.  If (e.g.) Princeton wishes to use Object ID in their application, and Colby prefer Accession Number, no problem.  On the other hand, if there is a real semantic difference between those two, we should model them that way.


### Reference:

* NPG 40
* <https://github.com/american-art/npg/issues/10>
