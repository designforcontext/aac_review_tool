---
title: "Consistency of Dates and Date Ranges"
priority: 3
category: Modeling
todo: true
---

### Problem Statement:



### Best Practice:

*To Be Determined*

*Vladimir 12/14/2016*

I think the best practice has been clear for 4-5 years now

    _:birth_timespan a E52_Time-Span;
      crm:P3_has_note "[DISPLAY DATE]";
      crm:P82a_begin_of_the_begin "[EARLIEST_DATE]"^^xsd:date; # or "[EARLIEST_YEAR]"^^xsd:gYear
      crm:P82b_end_of_the_end "[LATEST_DATE]"^^xsd:date. # or "[LATEST_YEAR]"^^xsd:gYear


### Discussion:

*(From Vladimir)*

    _:birth_timespan a E52_Time-Span;
      P3_has_note [DISPLAY DATE];
      P79_beginning_is_qualified_by [QUALIFIER];
      P80_end_is_qualified_by [QUALIFIER];
      P82_at_some_time_within [DATE].

Where did you get this from? Can you give examples of these qualifiers?

*(Vladimir 12/14/2016)* To make it clear: P79 "qualifies the beginning of an E52 Time-Span in some way. The nature of the qualification may be certainty, precision, source etc": this is not at all the date itself. In my practice I've never seen separate qualifiers for beginning/end, so never used P79/80.

When the date is uncertain (a range), use `crm:P82a_begin_of_the_begin` and `crm:P82b_end_of_the_end` (actually P82a&b are defined as sub-props of P82, so you may get two P82 depending on reasoning). When the date/year is certain, use `P82_at_some_time_within`.

If the data describes a period (frbroo:F51_Pursuit aka "active" or "floruit") rather than a "point" event, definitely use P82a/b.

### Reference:

* https://github.com/american-art/npg/issues/41
* https://github.com/american-art/npg/issues/42
* Types: https://github.com/american-art/npg/issues/38
* [How to implement CRM Time in RDF ](http://cidoc-crm.org/docs/How_to%20implement%20CRM_Time_in%20RDF.pdf)
