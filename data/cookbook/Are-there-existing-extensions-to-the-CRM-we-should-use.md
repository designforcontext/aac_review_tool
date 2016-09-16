---
title: What existing extensions to the CIDOC-CRM should we use?
priority: 2
october: true
category: types
todo: true
---

### Problem Statement:

Previous projects have developed CIDOC-CRM mappings of museum data, including the [British Museum](http://collection.britishmuseum.org), [SAAM](http://americanart.si.edu/collections/search/lod/about/), and [YCBA](http://britishart.yale.edu/collections/using-collections/technology/linked-open-data).  To complete these mappings, many of the institutions have defined custom concepts, classes, and properties that extend the CIDOC-CRM.  Should the AAC use any of these extensions?  If so, which ones?

### Best Practice:

The best practice is to use the CRM whenever possible, which can include modeling each data point as a complex chain of entities, and typing those entities with P2_has_type.

TODO: (Example: Vladimir and Watches)

The next best practice is to use the CRM, typing predicates using reification from an established vocab.

TODO: (Example:  David and creator types)

The next best practice is to use the CRM with predicates from broadly adopted ontologies like Qunt, SKOS, or FOAF.

TODO: (Example:  Dimensions with QUIT)

The last practice is to define our own ontology.

TODO: (BM mappings) 

### Discussion:

*(From Rob)*

We should look to broadly adopted ontologies first, and then any community extensions.  So if we 
need a term from BM/YCBA, we should use it.


*(From Vladimir)*

Don't look at <http://crm.rkbexplorer.com/>. It "polluted CRM" by adding 2x more custom properties such as PX.watch_pendant_made_in.
Instead, the next mapping we did, added a few custom properties, and uses a lot more of CIDOC CRM and generic mechanisms for extension.

Search for "revealed" at <http://vladimiralexiev.github.io/pubs/.>

E.g. the above would be modeled like this (rdf:type skipped for brevity):

    <object/123> p2_has_type <watch>; 
        P42_is_composed_of  <object/123/pendant>.
    <object/123/pendant> p2_has_type <pendant>;
        P108i_was_produced_by <object/123/pendant/production>.
    <object/123/pendant/production> P7_took_place_at <place>.


### Reference:

* <http://crm.rkbexplorer.com/>
* [British Museum Linked Open Data](http://collection.britishmuseum.org)
* [SAAM Linked Open Data](http://americanart.si.edu/collections/search/lod/about/)
* [YCBA Linked Open Data](http://britishart.yale.edu/collections/using-collections/technology/linked-open-data)
