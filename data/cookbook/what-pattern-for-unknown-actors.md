---
title: What URL should I use for unknown Actors?
priority: 2
category: Defining URL Structures
---

### Problem Statement

A common practice in museum collections management is to create parties within the CMS that represent unknown people.  Sometimes these parties have additional information about them (for example, "Unknown African"), but often they are just "Unknown".  

This practice does not cause any problems within the collection management system, but in Linked Open Data a naive mapping of the "Unknown" party implies that all works created by "Unknown" were created by the same individual, which is likely incorrect.

What pattern do we use in our mappings to distinguish between unknown actors?

### Best Practice:

AAC Best Practice is to create unique URLS for all unidentified agents identified within a Object record (or any other record).  We recommend using the object ID and the agent's role to determine a unique ID.  We recommend **NOT** using "unidentified" within the URL, to avoid consusion in the case the entity is later identified.

Additionally, this entity should be assigned a type that indicates that they are an "unknown" entity to assist with recall.

If at a later date this agent becomes identified, the previously used URL should remain valid—either it should be redirected in some way to the new ID (if it exists), or statements about the now identified entity should be associated with the previous ID, but not both. 

### Discussion:

There is a long discussion of this in [Github Issue NPG #50](https://github.com/american-art/npg/issues/50).

### Reference:

* [Related Github Issue](https://github.com/american-art/npg/issues/50)