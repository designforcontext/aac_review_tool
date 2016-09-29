---
title: What serialization of RDF should I publish?
priority: 4
category: Triplestores, RDF, and Inferencing
---

### Problem Statement:

RDF is an abstract graph model and there are multiple valid serialization of RDF that can be published as part of a data dump.  Common ones include Turtle, JSON-LD, and RDF-XML.

For a consistent user experience, it is beneficial to choose one or more consistent serializations to publish for a data dump.

### Best Practice:

For the AAC project, the primary serialization will be N-Triples. 

Additionally, the Getty Museum is working on a set of contexts and frames for JSON-LD.  Currently generating an AAC context and frame is out of scope, but we will evaluate the Getty's version and see if it is applicable to the project.

Additional serializations may be made available as resources permit.

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

*(From Rob, via email, 9/19/2016)*

JSON-LD, Though the context is a pain, as there's no good way to handle the predicates with the same human readable name and different URIs :(

*(From David, via email, 9/19/2016)*

I'm fine with that, but if it's actually going to be /nice/ JSON-LD, then someone needs to write a very nice context, as well as a frame for each institution's model (or one for the super-model of all the institutions, which doesn't exist, despite Vlad and I wanting one).   

### Reference:

* TODO:  Add links to definitions of the various formats.