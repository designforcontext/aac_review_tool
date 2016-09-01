### Problem Statement:

Previous projects have developed CIDOC-CRM mappings of museum data, including the [British Museum](http://collection.britishmuseum.org), [SAAM](http://americanart.si.edu/collections/search/lod/about/), and [YCBA](http://britishart.yale.edu/collections/using-collections/technology/linked-open-data).  To complete these mappings, many of the institutions have defined custom concepts, classes, and properties that extend the CIDOC-CRM.  Should the AAC use any of these extensions?  If so, which ones?

### Best Practice:

*To Be Determined*

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
