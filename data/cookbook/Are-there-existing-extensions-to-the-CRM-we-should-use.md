---
title: What existing extensions to the CIDOC-CRM should I use?
priority: 2
category: Defining Types
---

### Problem Statement:

Previous projects have developed CIDOC-CRM mappings of museum data, including the [British Museum](http://collection.britishmuseum.org), [SAAM](http://americanart.si.edu/collections/search/lod/about/), and [YCBA](http://britishart.yale.edu/collections/using-collections/technology/linked-open-data).  To complete these mappings, many of the institutions have defined custom concepts, classes, and properties that extend the CIDOC-CRM.  Should the AAC use any of these extensions?  If so, which ones?

Additionally, the CRM has published a series of extensions, including the CRMpc and CRMinf.  Are any of these useful?

### Best Practice:

Our current practice is to use the CRM when possible, and to choose from extensions as needed to fill gaps.  In particular, we are using the CRMpc extension to allow for CRM N.1 properties and the http://www.qudt.org ontology for computable dimensions. 

In general, we prefer existing, widely used extensions over creating new ones.

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

*(From conference call, 9/28/2016)*

* How frequent or infrequent will this issue be?
    * Within a couple months, as we build browse app, we will identify whether the CRM allows for sufficient specificity, or we need something additional beyond CRM
    * Possible issues like distinguishing between first/middle names or the artist vs painting of the artist
    * We will see examples over the next couple months and can make decisions from that

* RS: Concern that we conform to the CRM but not to what the rest of the world does for common data entities (like names)
    * DN: Back to the knowledge representation vs usability discussion
    * CK: This ship has sailed, there is a lot of legacy modeling, so making a big change would delay things even further
    * EF: Doubts about CRM is growing — “hinders progress” — so tempted to go with Getty approach, but it may not be able to afford this within this project at this time
    * CK: Building to the model that DN has been establishing would have been a better start, but coming a little late
    * Good news — the differences will be much fewer than the areas where AAC agrees with Getty and also things like ArtTracks and others

**DECISION:** 

* Continue on as we are, review when we have sufficient examples
* Don’t publish the current modeling in these areas as “Good Practices” but make sure they are described as “Lessons Learned"

*(From Vladimir 12/13/2016)*

For Getty CONA mapping I've defined some simple extensions like crmx:preferred, crmx:sort_order, crmx:property
(the missing piece of crm:E13_Attribute_Assignment). See [CRMX](https://share.getty.edu/display/ITSLODV/CRM+Extensions#CRMExtensions-CRMX) at Getty (Rob has access). There are a few more to cover CCO, eg crmx:P2_extent "art of object or work contributed by an agent, measured in a dimension, or described by a subject"

### Reference:

* <http://crm.rkbexplorer.com/>
* [British Museum Linked Open Data](http://collection.britishmuseum.org)
* [SAAM Linked Open Data](http://americanart.si.edu/collections/search/lod/about/)
* [YCBA Linked Open Data](http://britishart.yale.edu/collections/using-collections/technology/linked-open-data)
