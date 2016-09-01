### Problem Statement:

The CIDOC-CRM defines many of its properties to work both directions: using `P1: Is identified by` to link a object to an name also means that the name is linked to the object.

However, RDF does not natively support inverse predicates, and so all of the RDF mappings have predicates for the relationships in both directions:  `crm:P1_is_identified_by` and `crm:P1i_identifies`.

It is important that any application using this information be able to traverse the link in either direction, so how do we insure that is possible?

### Best Practice:

*To Be Determined*

### Discussion:

* Inverse Properties

*(From Rob)*

My approach here is to think in terms of APIs rather than abstract models.  When an application requests a representation of an artist, it would be useful for that response to include the link to the artwork.  And when you request the artwork, the link to the artist.  Whether that needs to be materialized in the triplestore or computed on the fly (and cached) I have a slight preference for inferring, as then we don’t miss any.  (Meaning we would need to define all of the inverses, as the CIDOC-CRM RDFS based ontology does not do that for us)

*(From Vladimir)*

No big deal.

I usually prefer to lay the links from the object's root node down (and that helps with circumscribing the object graph, see [the disussion on Business Objects](#)).  But if we include inverse reasoning, you'll get both directions for each property.

I wrote a [simplification script](https://github.com/erlangen-crm/ecrm/blob/master/ecrm-simplify.xq) that can get the goodies (inverses and transitive) without the baddies (owl:Restrictions that IMHO are not useful and were badly criticized by CRM SIG).  It's applied in every ECRM release, so we should use this: <https://github.com/erlangen-crm/ecrm/blob/master/ecrm_current-inverse-transitive.owl>.  We just change the prefix on top and presto-chango we got official CRM  namespace with the inverses and transitives we need.


*(From Stephen Stead)*

From the current CRM rdf
2. RDF does not allow to instantiate properties beginning from a range value.
   Therefore, each CRM property is represented as two RDFS properties.
   For instance "P2 has type (is type of)" is represented as:
   "P2_has_type" for the domain to range direction and "P2i_is_type_of" for the range to domain direction.

*(From David Newbury)*

Understood. 

I believe the discussion is trying to determine at which step within the data transformation pipeline from institutional data dump to browse app that inverse relationship is instantiated.  Implicit in that discussion is the question of whose responsibility instantiating it is.

*(From Rob Sanderson)*

That, and where the inverse-ness should be declared.

### Reference:




