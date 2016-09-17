---
title: What serialization of RDF should I publish?
priority: 4
category: Triplestores, RDF, and Inferencing
---

### Problem Statement:

RDF is an abstract graph model and there are multiple valid serialization of RDF that can be published as part of a data dump.  Common ones include Turtle, JSON-LD, and RDF-XML.

For a consistent user experience, it is beneficial to choose one or more consistent serializations to publish for a data dump.

### Best Practice:

*To Be Determined*

### Discussion:

##### Turtle vs JSON-LD?

*(From Vladimir)*

These are merely different RDF serializations: a proper repo can return
either.

- Turtle is more readable, so we should use it for discussions and examples
- JSONLD can be more easily consumable by your app, especially if we can
make proper Framing based on the "business object graph" shape.


*(From Rob)*

JSON-LD vs anything else?  JSON-LD.

##### Linked Data Fragments

Are LOD Fragments as a possible technology for use instead of SPARQL?

*(From Rob)*

LD Fragments for CRM would be at best mediocre IMO, but would be happy to see a demonstration of their value in practice.

*(From Vladimir)*

They're not at all incompatible.  LDF implements SPARQL in the browser, by asking only simple patters out of the server (\<s p o> where each position can be unbound). LDF is ok for fetching objects, but not ok for finding complex patterns, especially where filters are involved.

*(From David)*

Are we generating a JSON-LD framing for CIDOC?  Does one exist we can steal?

### Reference:

* TODO:  Add links to definitions of the various formats.