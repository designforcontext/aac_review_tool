### Problem Statement:

### Best Practice:

*To Be Determined*

### Discussion:

*(From Vladimir)*

    _:birth_timespan a E52_Time-Span;
      P3_has_note [DISPLAY DATE];
      P79_beginning_is_qualified_by [QUALIFIER];
      P80_end_is_qualified_by [QUALIFIER];
      P82_at_some_time_within [DATE].

Where did you get this from? Can you give examples of these qualifiers? When the date is uncertain, you'll get `crm:P82a_begin_of_the_begin` and `crm:P82b_end_of_the_end` instead of `P82_at_some_time_within`.  (Actually P82a&b are defined as sub-props of P82, so you may get two P82 depending on reasoning).

And if the data describes a period (frbroo:F51_Pursuit aka "active" or "floruit") rather than a "point" event, you'll definitely have P82a&b.


### Reference:


