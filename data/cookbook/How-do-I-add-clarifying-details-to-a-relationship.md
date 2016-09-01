---
title: How do I add Clarifying Details to a Relationship?
---

### Problem Statement:

Often, we need to define how two entities are related more specifically than the CIDOC-CRM allows.  

For instance if, `Young Woman Picking Fruit` participated in `1904 Carnegie International` and `Wooden Bench` participated in `1904 Carnegie International`, how do we say that "Young Woman Picking Fruit" was an exhibit, but `Wooden Bench` was furniture?

Particularly when `Wooden Bench` also participated in `Intl. Furniture Expo` as an artwork?

### Best Practice:

*To Be Determined*

### Discussion:

(*From David Newbury*

From my understanding of Vladimir's paper on this subject:

**Option 1: Subproperties**

    aac:young_women_picking_fruit aac:was_artwork_in aac:1904_international.
    aac:was_artwork_in rdfs:subProperty of crm:P9i_forms_part_of

but then we have do define a sub property for every possible relationship, which might need to be absurdly comprehensive.

**Option 2: Sub-Entities with Roles**

    aac:young_women_picking_fruit  crm:P9i_forms_part_of "1904 Carnegie International Artwork"
    "1904 Carnegie International Artwork" forms_part_of  "1904 Carnegie International"
    "1904 Carnegie International Artwork" has_type "Artwork Installation"

    "Wooden Bench" participated_in "1904 Carnegie International Furniture"
     "1904 Carnegie International Furniture" forms_part_of  "1904 Carnegie International"
    "1904 Carnegie International Furniture" has_type "Furniture Installation"

This is simple, but probably not valid CRM.  It's basically saying that an event was made up of many sub events, each dictated by the type of object that participated. 

**Option 3: Subject Reification**

"Young Woman Picking Fruit" participated_in "1904 Carnegie International Artwork"

    association p140_assigned_attribute_to "Young Woman Picking Fruit"
    association has_property  "participated_in" 
    association p141_assigned "1904 Carnegie International Artwork"
    association has_type "exhibit"

Totally valid.  Totally confusing.  Probably my recommendation, with my nose held tightly.

**Option 4: Long-Cuts**

    _:role a aac:participation_role;
       had_participating_artwork "Young Woman Picking Fruit";
       had_participating_exhibition  "1904 Carnegie International"
       had_type "Exhibit"


Basically, the same as Option 3, but explicitly defined for each relationship.  The worst of option 3 and option 1.  

Vladimir also suggests two other techniques, one involving named graphs (which is great until you want to use named graphs for anything else, like provenance) and one involving <http://smiy.sourceforge.net/prv/spec/propertyreification.html>, which is a fancy way to define Option 3 formally, allowing the short-cut to be automatically inferred.  

---

*(From Rob Sanderson)*

To me, the most consistent way (considering CRM) IMO is some sort of reification.  If there was a Participation in the same way as there's a Acquisition, we could either subclass Participation or associate a role with it.

    :Exhibition a E7_Activity ;
      p16_used_specific_object :Artwork, :Bench .

We want to distinguish that the usage is different for the two objects. p16.1 mode of use is already in CRM to do that, but we don't have a consistent pattern for it in RDF.  My preference would be something like:

    :Exhibition a E7_Activity ;
      p16x_had_use :Use1, :Use 2 .

    :Use1 a SpecificObjectUse ;
      used :Artwork ;
      p16_1_mode_of_use :Exhibited .

    :Use2 a SpecificObjectUse ;
      used :Bench ;
      p16_1_mode_of_use :Furniture .

---

*(From Vladimir, in [(3)](https://github.com/american-art/npg/issues/20))*

So it seems that "museums won't publish LOD about cases and similar appurtenances" is a safe assumption.
My proposal is to map this to:

    <object/123> crm:P16i_was_used_for <exhibition/456>.
    <exhibition/456> a crm:E7_Activity;
      crm:P2_has_type aat:300054766; # exhibition


### References

* (1) [Types and Annotations for CIDOC CRM Properties](http://vladimiralexiev.github.io/pubs/Alexiev2012-CRM-Properties.pdf)
* (2) https://github.com/american-art/npg/issues/5
* (3) https://github.com/american-art/npg/issues/20
* (4) [Formalization of the CRM: Initial Thoughts](http://www.cidoc-crm.org/docs/31st-meeting-presentations/CRM_FOL_CM_part_1.pdf) 