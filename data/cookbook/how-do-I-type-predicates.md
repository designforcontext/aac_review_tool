---
title: How do I specify types for predicates?
priority: 1
category: Defining Types
---

### Problem Statement:

Often, we need to define how two entities are related more specifically than the CIDOC-CRM allows.  

For instance if, `Young Woman Picking Fruit` participated in `1904 Carnegie International` and `Wooden Bench` participated in `1904 Carnegie International`, how do we say that "Young Woman Picking Fruit" was an exhibit, but `Wooden Bench` was furniture?

Particularly when `Wooden Bench` also participated in `Intl. Furniture Expo` as an artwork?



### Best Practice:

Within the CRM, there is a technique for this using the ".1" properties, which let you assign types to properties.  RDF does not support directly assigning properties to instances of predicates; however, there are several techniques for managing this.  

In order of preference:

**(1).** Best practice is to use the full complexity of the CRM, which can often avoid the need to explicitly type predicates.  This can include modeling each data point as a complex chain of entities, and typing those entities with `P2 has type`.

For example, when modeling the creation of a watch, rather than using the predicate `PX.watch_pendant_made_in`, you could explicitly model the parts and their specific parts.

    <object/123> p2_has_type <watch>; 
        P42_is_composed_of  <object/123/pendant>.
        <object/123/pendant> p2_has_type <pendant>;
        P108i_was_produced_by <object/123/pendant/production>.
        <object/123/pendant/production> P7_took_place_at <place>.

**(2).** When an explicit specification of a predicate is needed, our best practice is to use the CRMpc ontology to reify the statement.  

For example, when specifying that Michelangelo created David in the role of "sculptor", rather than say 

    _:production_of_david crm:P14_carried_out_by _:michelangelo

you would say

    _:sculpting a crmpc:PC14_carried_out_by;
        crmpc:P01_has_domain _:production_of_david;
        crmpc:P02_has_range _:michelangelo; 
        crmpc:P14.1_in_the_role_of aat:1293823.  #sculptor

**(3).** Another best practice is to use the CRM with predicates from broadly adopted ontologies like QUDT, SKOS, or FOAF.  

For instance, when referencing the primary homepage of an institution, it is a best practice to use `foaf:homepage` rather reify a CRM identifier.  It is important, however, when doing this, to make sure that no semantic information is lost.

Vladimir: sure. But there are no such props to distinguish between participation of Artwork vs Bench

**(4).** If none of these techniques will work, our last recommendation is to extend the CRM and define a new predicate using `rdfs:subPropertyOf`.

    _:production_of_david crmx:P14_carried_out_as_scupltor_by _:michelangelo.

    crmx:P14_carried_out_as_scupltor_by rdfs:subPropertyOf crm:P14_carried_out_by;
      rdfs:label "carried out in the role of sculptor".

### Discussion:


(*From David Newbury*)

From my understanding of Vladimir's paper on this subject:

**Option 1: Subproperties**

    aac:young_women_picking_fruit aac:was_artwork_in aac:1904_international.
    aac:was_artwork_in rdfs:subProperty of crm:P9i_forms_part_of

but then we have do define a sub property for every possible relationship, which might need to be absurdly comprehensive.

Vladimir: as it says above, this is the worst option. When I started on ResearchSpace, they had a CRM extension with 220 props like "pendant made at", "gilded at". By using some systematic mechanisms, we reduced to very few extension props.

**Option 2: Sub-Events with Roles**

    aac:young_women_picking_fruit  crm:P9i_forms_part_of "1904 Carnegie International Artwork"
    "1904 Carnegie International Artwork" forms_part_of  "1904 Carnegie International"
    "1904 Carnegie International Artwork" has_type "Artwork Installation"

    "Wooden Bench" participated_in "1904 Carnegie International Furniture"
    "1904 Carnegie International Furniture" forms_part_of  "1904 Carnegie International"
    "1904 Carnegie International Furniture" has_type "Furniture Installation"

This is simple, but probably not valid CRM.  It's basically saying that an event was made up of many sub events, each dictated by the type of object that participated. 

Vladimir: It is totally valid (modulo the prop names). It's the more widely used mechanism in ResearchSpace, see [Type in Subevent](https://confluence.ontotext.com/display/ResearchSpace/BM+Association+Mapping+v2#BMAssociationMappingv2-TranslatedCodeinSubEvents)

**Option 3: Subject Reification**

"Young Woman Picking Fruit" participated_in "1904 Carnegie International Artwork"

    association p140_assigned_attribute_to "Young Woman Picking Fruit"
    association has_property  "participated_in" 
    association p141_assigned "1904 Carnegie International Artwork"
    association has_type "exhibit"

Totally valid.  Totally confusing.  Probably my recommendation, with my nose held tightly.

Vladimir: this is [Type in Reified Association](https://confluence.ontotext.com/display/ResearchSpace/BM+Association+Mapping+v2#BMAssociationMappingv2-TranslatedCodeInReifiedAssociation) and you have to use it when you can't use Events (eg "influenced by": unless you want to make up some fake "Influencing" event you know nothing about).

**Option 4: Long-Cuts**

    _:role a aac:participation_role;
       had_participating_artwork "Young Woman Picking Fruit";
       had_participating_exhibition  "1904 Carnegie International"
       had_type "Exhibit"

Basically, the same as Option 3, but explicitly defined for each relationship.  The worst of option 3 and option 1.  

Vladimir also suggests two other techniques
- one involving named graphs (which is great until you want to use named graphs for anything else, like provenance) 
- another involving [PRV](http://smiy.sourceforge.net/prv/spec/propertyreification.html), which is a fancy way to define Option 3 formally, allowing the short-cut to be automatically inferred. 

Vladimir: nothing fancy about PRV: it describes formally the reification mechanism. Sort of like this table you see in [rdfpuml](https://github.com/american-art/aac_mappings/blob/master/rdfpuml/rdfpuml.pl#L37) [(revised)](https://github.com/american-art/aac_mappings/pull/6/commits/3de318d0becf6148b0a05394eb9eaef76a303e58#diff-1d9a50214fb3320152c97145293e5988L37) that controls drawing associations. In the future I'll make it eat PRV turtle as Reification config file, rather than hard-coded.

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

Vladimir: that's true of Exhibitions: no museum will publish data about their Display Cases and junk they used at an exhibition (just a red herring from Steve). But the general question of how to model roles stays.

*(From Rob, via email, 9/19/2016)*

Can we flip 2 and 3 around?  Surely reuse of existing terms outside of CRM is better than full on reification?


### References

* (1) [Types and Annotations for CIDOC CRM Properties](http://vladimiralexiev.github.io/pubs/Alexiev2012-CRM-Properties.pdf)
* (2) https://github.com/american-art/npg/issues/5
* (3) https://github.com/american-art/npg/issues/20
* (4) [Formalization of the CRM: Initial Thoughts](http://www.cidoc-crm.org/docs/31st-meeting-presentations/CRM_FOL_CM_part_1.pdf) 
