##### Implicit Types

    _:thing a E22_Man_Made_Object;
      p2_has_type aac:artwork.

----

##### Linked Data ID

* **Mandatory?** True
* **Multiples?:** False
* **Description:**  This is a string that represents the URI of the object.  
* **Example:** "<http://www.aac-example.org/object/1>"

**CIDOC-CRM Mapping:**  

    N/A

a local-to-global thesaurus mapping here?


  
----

##### Alternate IDs

* **Mandatory?** False
* **Multiples?:** True
* **Description:**  These are identifiers for the work that are not either the LOD URI or the Accession Number
* **Example:** 1230123i123, 39049ddc-288d-4516-aca3-bfca8608bfc5
* **Subfields:**
    - ID Value
    - ID Type
    _ ID Type Name

**CIDOC-CRM Mapping:**  

    _:thing P1_is_identified_by _:identifier.
    _:identifier a E42_Identifier;
      rdfs:label [ID_NUMBER];
      p2_has_type _:id_type.
    _:id_type a E55_Type;
      skos:exactMatch institution:title_type (anything but institution:primary_title_type).
      rdfs:label [TITLE TYPE NAME]


*Questions:*

* Are we going to look up the label for the institution title type from a thesaurus?
* Is label sufficient for display?  (for instance, if the type label is ISBN, would displaying `ISBN: 123-12345-123X` work?)

----

##### Department/Collection

* **Mandatory?** False
* **Multiples?:** False
* **Description:**  These are institution-specific classifications of work.  
* **Example:** Works on Paper, Sculpture Department, Contemporary Art, European Art 

**CIDOC-CRM Mapping:**  

    _:thing P111i_was_added_by _:addition_event.
    _:addition_event a E79_Part_Addition;
      P110_augmented _:collection.
    _:collection a E78_Collection;
      rdfs:label [COLLECTION_NAME];
      skos:exactMatch institution:collection_term_id;
      skos:broadMatch aac:collection_term.



----

##### Creation Date

* **Mandatory?** False
* **Multiples?:** False
* **Description:**  This is the preferred date of creation for the object.  
* **Example:** c. 1750; 12/12/1920; April 15th, 1921; Mung Dinasty
* **Subfields:**
    - Display Date
    - Date Earliest
    - Date Latest

**CIDOC-CRM Mapping:**  

    _:thing P108i_was_produced_by _:production.
    _:production a E12_Production;
        P4_has_timespan _:production_timespan.
    _:production_timespan a E52_Time-Span;
        p82a_begin_of_the_begin [DATE_EARLIEST];
        p82b_end_of_the_end [DATE_LATEST];
        p3_has_note [DISPLAY DATE].

----

##### Acquisition Date

* **Mandatory?** False
* **Multiples?:** False
* **Description:**  This is the preferred date of the acquisition of the object by its current owner.  
* **Example:** c. 1750; August 1980, 2001, April 15th, 1921
* **Subfields:**
    - Display Date
    - Date Earliest
    - Date Latest

**CIDOC-CRM Mapping:**  

    TBD




----

##### Current Location/On Display

* **Mandatory?** False
* **Multiples?:** False
* **Description:**  This is name of a physical location within a building or institution where the work can be found or viewed.  
* **Example:** Not on View, Gallery 6, Mezzanine
* **Subfields:**
    - Name
    - Type
    - URL

**CIDOC-CRM Mapping:**  

    _:thing P55_has_current_location _:location.
    _:location a E53_Place;
        rdfs:label [NAME];
        p2_has_type _:location_type;
        foaf:homepage [URL].
    _:location_type a E55_Type;
        rdfs:label [TYPE];
        skos:broadMatch aac:location_type.


----

##### Other Descriptions

* **Mandatory?** False
* **Multiples?:** True
* **Description:**  These are alternate human-readable descriptions of the work.  
* **Example:** "Tiu artaĵoj, fama por lia reprezento de la homa korpo en sufero, ...", "Image/Sheet: 28.1cm x 20.7cm (11 1/16" x 8 1/8")"
* **Subfields:**
    - Text
    - Author
    - Type

**CIDOC-CRM Mapping:**  

    _:thing P129i_is_subject_of _:description.
    _:description a E33_Linguistic_Object;
        p3_has_note [TEXT];
        P94i_was_created_by _:authorship_event;
        P2_has_type _:institution_description_type.
    _:authorship_event a E65_Creation;
        P14_carried_out_by _:author.
    _:author a E39_Actor;
        rdfs:label [AUTHOR]. 
    _:institution_description_type a E55_type;
        rdfs:label [DESCRIPTION TYPE];
        skos:broadMatch aac:description_type.


----

##### Credit Line

* **Mandatory?** False
* **Multiples?:** False
* **Description:**  This is a block of text describing the appropriate way to communicate or acknowledge the way in which an institution acquired the work.
* **Example:** Gift of Mrs. Henry White Cannon, Sr.

**CIDOC-CRM Mapping:**

    _:thing P129i_is_subject_of _:credit_line.
    _:credit_line a E33_Linguistic_Object;
       P2_has_type aac:credit_line;
       P3_has_note "CONTENT".
    aac:credit_line a E55_Type;
       rdfs:label "This is a microthesaurus term describing the credit line of the work";
       skos:broadMatch <http://vocab.getty.edu/aat/300026687>.


*Questions:*

* Is this the credit line for the object, or for the image?
* Is it appropriate to use this for images of the objects in IIIF as the `attribution`?
* See also <http://collection.britishmuseum.org/id/ontology/PX_has_credit_line>

----

##### Classification

* **Mandatory?** False
* **Multiples?:** True
* **Description:**  This is the type of object the item *is*.  
* **Example:** painting, planographic prints
* **Subfields:**
    - Description
    - Thesaurus URI


**CIDOC-CRM Mapping:**

    _:thing P2_has_type institution:object_type;
    institution:object_type a E55_Type;
       rdfs:label [DESCRIPTION];
       skos:broadMatch aat:aat_term.


----

##### Medium

* **Mandatory?** False
* **Multiples?:** True
* **Description:**  This is what the object *is made of*.  
* **Example:** Silver gelatin; steel; oil paint, canvas
* **Subfields:**
    - Description
    - Thesaurus URI


**CIDOC-CRM Mapping:**

    _:thing p46_is_composed_of institution:material_term;
    institution:material_term a E57_Material;
       p3_has_note [DESCRIPTION];
       skos:broadMatch aat:aat_term.


----

##### Method/Technique

* **Mandatory?** False
* **Multiples?:** True
* **Description:**  This is *how* the object was made.  
* **Example:** Photography, Casting, Fingerpainting
* **Subfields:**
    - Description
    - Thesaurus URI


**CIDOC-CRM Mapping:**

    _:thing P108i_was_produced_by _:production.
    _:production a E12_Production;
        P32_used_general_technique institution:method.

    institution:method a E55_Type;
       p3_has_note [DESCRIPTION];
       skos:broadMatch aat:aat_term.


----

##### Subject

* **Mandatory?** False
* **Multiples?:** True
* **Description:**  This is what the object the item *depicts*.  
* **Example:** Landscape, George Washington, A bridge over the river Kwai
* **Subfields:**
    - Description
    - Type
    - Entity Link


**CIDOC-CRM Mapping:**

    _:thing p62_depicts _:entity.

**Questions**
  
* Do we link here?  
* How do we handle labels, since this can be many types of things


----

##### Image

* **Mandatory?** True
* **Multiples?:** True
* **Description:**  This is a link to an digital image that depicts the object.  
* **Example:** http://www.example.com/images/artwork.jpg
* **Subfields:**
    - URL
    - Type
    - Order
    - Caption
    - Is Primary Image?

**CIDOC-CRM Direct Mapping:**

    _:thing P138i_has_representation [IMAGE URL].
    [IMAGE URL] a E38_Image;
        P2_has_type _:image_type;
    _:image_type a E55_Type;
        rdfs:label [TYPE];
        skos:broadMatch aac:image_type.


**CIDOC-CRM IIIF Mapping:**

    _:thing P129_is_subject_of _:iiif_pres_url .
    _:iiif_pres_url a E73_Information_Object;
        dcterms:conformsTo <http://iiif.io/api/presentation/2>.


----

##### Concept

* **Mandatory?** False
* **Multiples?:** True
* **Description:**  This is what the object the item *is about*.  
* **Example:** Truth, Beauty, Suffering, George Washington
* **Subfields:**
    - Description
    - Type
    - Entity Link


**CIDOC-CRM Mapping:**  


    _:thing P128_carries institution:concept_term;
    institution:concept_term a E90_Symbolic_Object;
       p3_has_note [DESCRIPTION];
       skos:broadMatch aat:aat_term.

----

##### Dimensions

* **Mandatory?** False
* **Multiples?:** True
* **Description:**  These are measurable quantities about a work.  
* **Example:** 1.2cm high; 200 lbs; 16 pages
* **Subfields:**
    - Number (12)
    - Unit (cm)
    - Type Description (height)
    - Element (Frame)


**CIDOC-CRM Direct Mapping:**  

    _:thing P43_has_dimension _:dimension.
    _:dimension a E54_Dimension;
        P90_has_value [NUMBER];
        P91_has_unit _:unit_term;
        P2_has_type aac:type_term;
    _:unit_term a qudt:Unit;
        qudt:abbreviation [UNIT].
    aac:type_term a E55_Type;
        rdfs:label [TYPE_DESCRIPTION].

**CIDOC-CRM Part Mapping:**  

    _:thing P46_is_composed_of _:part.
    _part a E18_Physical_Thing;
        p2_has_type institution:part_type;
        P43_has_dimension _:dimension.
    _:dimension a E54_Dimension;
        P90_has_value [NUMBER];
        P91_has_unit _:unit_term;
        P2_has_type aac:type_term;
    _:unit_term a qudt:Unit;
        qudt:abbreviation [UNIT].
    aac:type_term a E55_Type;
        rdfs:label [TYPE_DESCRIPTION].
    institution:part_type a E55_type;
        P3_has_note [ELEMENT TYPE NAME];
        skos:broadMatch aat:aat_term.

**Questions**

* Should the human-readable collection of dimensions be a description type?

----

##### Bibliography

* **Mandatory?** False
* **Multiples?:** True
* **Description:** These are published references to the work.  
* **Example:** 
* **Subfields:**
    - Reference/CitationNumber
    - Reference/CitationNumberDescription
    - RefAltNumRemarks
    - RefCitation
    - RefSubTitle
    - RefTitle
    - RefYearPublished


**CIDOC-CRM Mapping:**  

    _:thing P70i_is_documented_in _:reference;
    _:reference a E31_Document;
        P48_has_preferred_identifier _:identifier;
        skos:exactMatch [REFERENCE URL];
        p3_has_note [REFERENCE CITATION]; 
        p102_has_title _:document_title;
        p102_has_title _:document_subtitle;
        P108i_was_produced_by _:production.

    _:identifier a E42_Identifier;
        p2_has_type institution:identifier_type;
        p3_has_note [REFERENCE/CITATION NUMBER].

    _:document_title a E35_Title;
      rdfs:label [REFTITLE];
      p2_has_type aac:primary_title.

    _:document_subtitle a E35_Title;
      rdfs:label [RefSubTitle];
      p2_has_type aac:subtitle.

    _:production a E12_Production;
        P4_has_timespan _:production_timespan.
    _:production_timespan a E52_Time-Span;
        rdfs:label [YEAR PUBLISHED];
        P82_at_some_time_within [YEAR PUBLISHED].

    institution:identifier_type a E55_type;
        rdfs:label [REFERENCE/CITATION NUMBER DESCRIPTION];
        skos:broadMatch aac:identifier_type.

**Questions:**           

How to handle the documentation citation?  Should we add a part (the page), and link to through that?

---

##### Exhibitions

* **Mandatory?** False
* **Multiples?:** True
* **Description:** An object's participation in an event. 
* **Example:** 
* **Subfields:**
    - Lending Organization
    - Receiving Instituion
    - Start Date
    - End Date
    - Display Date
    - Title
    - Website
    - Curator
    - Exhibition Note/Citation


**CIDOC-CRM Simple Mapping:**

    _:thing P16i_was_used_for _:event.
    _:event a E7_Activity;
        P4_has_time-span _:exhibition_timespan;
        P14_carried_out_by _:curator;
        P102_has_title _:exhibition_title;
        P2_has_type institution:exhibition_type.

    _:exhibition_timespan a E52_Time-Span;
        P3_has_note [DISPLAY DATE];
        p82a_begin_of_the_begin [DATE_EARLIEST];
        p82b_end_of_the_end [DATE_LATEST].

    institution:exhibition_type a E55_Type;
        rdfs:label "Exhibition";
        skos:broadMatch aat:300054766.

    _:exhibition_title a E35_Title;
        p3_has_note [TITLE].


**CIDOC-CRM Full Mapping:**

    _:thing P30i_custody_transferred_through _:exhibition_loan_event;
        P30i_custody_transferred_through _:exhibition_return_event.

    _:exhibition_loan_event a E10_Transfer_of_Custody, E79_Part_Addition;
        P28_custody_surrendered_by _:loaning_institution;
        P29_custody_received_by _:receiving_institution;
        P21_had_general_purpose mprov_acq:loan;
        P111_added _:thing;
        P110_augmented _:collection;
        P20_had_specific_purpose _:exhibition_event.

    _:exhibition_return_event a E10_Transfer_of_Custody, E80_Part_Removal;
        P28_custody_surrendered_by _:receiving_institution;
        P29_custody_received_by _:loaning_institution;
        P113_removed _:thing;
        P112_diminished _:collection.
        P21_had_general_purpose prov_acq:return;

    _:exhibition_event a E87_Curation_Activity;
        P4_has_time-span _:exhibition_timespan;
        P14_carried_out_by _:curator;
        P147_curated _:collection;

    _:exhibition_timespan a E52_Time-Span;
        P3_has_note [DISPLAY DATE];
        p82a_begin_of_the_begin [DATE_EARLIEST];
        p82b_end_of_the_end [DATE_LATEST].

    _:collection a E78 Collection;
        P2_has_type aac:exhibition;
        P109_has_current_or_former_curator _:curator;
        P102_has_title _:exhibition_title;
        P3_had_note [ExhibCitation];
        foaf:homepage [URL].
        [URL] rdfs:label [LINK NAME].

    _:exhibition_title a E35_Title;
        p3_has_note [TITLE].

**Questions**

* Can we use E35 for the title of an exhibition?
* See Website link for another path for an exhibition website link.
* Do we have distinction between venues and exhibitions?  Do we need to handle multiple steps?

---

##### CreatorDispOrder

* **Mandatory?** True
* **Multiples?:** False
* **Description:** Display order for multiple constuents. 
* **Example:** 1,2,3,5

**CIDOC-CRM Mapping:**
  
    TBD

**Questions**

* What do we want to do with this?  It could be ignored, or it could be modeled using lists, though there's not a CIDOC-CRM solution to this, or it could be semantically modelled if we knew why there was an order.


----

## Images

##### Copyright

* **Mandatory?** False (unless there's an image, in which case True)
* **Multiples?:** False
* **Description:**  This is the copyright associated with a specific visual representation of a work.  
* **Example:** ©2012 The Josef and Anni Albers Foundation / Artists Rights Society (ARS)
* **Subfields:**
    - Text
    - Entity Links
    - Right URI

**CIDOC-CRM Mapping (if string):**

    _:image a E38_Image;
       P104_is_subject_to _:copyright.
    _:copyright a E30_Right;
       P3_has_note <CONTENT>;
       skos:broadMatch <http://rightsstatements.org/vocab/InC/1.0/>.


*There are a couple questions here:*

* Do we assume that this applies to every image for an object if linked to an object, not to an image of the work?
* Do we think that people are going to reconcile their copyright statements to rightssstatements.org?
* Do we think that we're going to aggregate objects by content?
* Do we think that we're going to aggregate objects by rightsstatement.org status?

---

## Relationships

##### Created By

* **Mandatory?** True
* **Multiples?:** True
* **Description:** These are Actors that had a role in the production of the work.  
* **Example:** Mary Cassatt
* **Subfields:**
    - Role
    - Entity ID

**CIDOC-CRM Mapping:**
  
    _:thing P108i_was_produced_by _:production.
    _:production a E12_Production;
        p14_carried_out_by :entity.

**Questions**

* How best to assign the type of creation to the production?  We dont' have any good way to do a `p14.1 -> E55{Maker}` in turtle.


##### Owned By

* **Mandatory?** True
* **Multiples?:** False
* **Description:** These is the current institution that has ownership of the work.  
* **Example:** National Portait Gallery
* **Subfields:**
    - Entity ID
    - Display Name

**CIDOC-CRM Mapping:**
  
    _:thing P52_has_current_owner _:entity.

**Questions**

* I assume we'll use whatever we have as the standard way to identify a person as the display name.


##### Previously Owned By

* **Mandatory?** True
* **Multiples?:** False
* **Description:** These are other Actors that has ownership of the work.  
* **Example:** Galarie Durand Ruel
* **Subfields:**
    - Entity ID

**CIDOC-CRM Shortcut Mapping:**

    _:thing P51_has_former_or_current_owner _:entity . #(where there is no P52_has_current_owner relationship)




##### Related To (Person)

* **Mandatory?** False
* **Multiples?:** False
* **Description:** These are other E39_Actors that are in some way related to the work.  
* **Example:** Rape of Europa (after), Chuck Close (Influenced by), Marvin Gaye (Sitter)
* **Subfields:**
    - Entity ID
    - Role

    _:thing P15i_influenced _:influence_event.
    _:influence_event a E5_event;
        P14_carried_out_by: [ENTITY];
        P21_had_general_purpose _:event_type.
    _:event_type a E55_Type;
        rdfs:label [ROLE];
        skos:broadMatch aat:term.

##### Related To (ENTITY)

* **Mandatory?** False
* **Multiples?:** False
* **Description:** These are other E1_CRM_Entity that are in some way related to the work.  
* **Example:** Rape of Europa (after)
* **Subfields:**
    - Entity ID
    - Role

    _:thing P15i_influenced _:influence_event.
    _:influence_event a E5_event;
        P15_was_influenced_by: [ENTITY];
        P21_had_general_purpose _:event_type.
    _:event_type a E55_Type;
        rdfs:label [ROLE];
        skos:broadMatch aat:term.