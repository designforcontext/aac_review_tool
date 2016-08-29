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

## Relationships


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