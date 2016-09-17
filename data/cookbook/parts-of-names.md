---
title: How should I model parts of Actor names?
priority: 2
category: Modeling
---
### Problem Statement

When representing an actor within a museum Collection Management System, it is a common practice to break apart names into their components.  For instance, "John Smith" could be represented by a first name of "John" and a last name of "Smith". 

Additional name parts might include titles, suffixes, prefixes, or middle names.

Are these essential components of the record, and if so, how should they be modeled?

### Best Practice:

AAC best practice is to represent the parts of the names as separate Actor Appelations, typed using the AAT vocabulary.  If this information is provided by an institution, is conceivably useful for users (for example by an academic researching name parts), and should thus be made available.  

We do **NOT** recommend splitting names into components as part of a mapping process.  Additionally, we acknowledge that this modelling may occasionaly mis-represent the ground truth if the institution's provided data is inaccurate, however that is broadly true of all data.  Care should be taken in mapping to correctly understand the institution's intention when providing the information.

Additionally, the existing common practice for mapping this information is to use `E82 Actor Appellation` for representing Actor names.   We recommend continuing this practice.

### Discussion:

TODO:  Include references to the github discussion of this issue here.

### Reference:

* See also the [related question on how to connect the parts of names to their full form](map-names-to-variants).


