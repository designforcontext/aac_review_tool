### Problem Statement:

### Best Practice:

*To Be Determined*

### Discussion:

*(From David)*

 Do we need to distinguish between different institutional terminology for things when labeling fields? (Object ID vs Accession Number)

*(From Rob)*

I would answer the first question as no, if the semantics are actually the same and thus the data is comparable.  We should maintain some degree of separation between the semantic data and the way that’s rendered to users by different applications.  If (e.g.) Princeton wishes to use Object ID in their application, and Colby prefer Accession Number, no problem.  On the other hand, if there is a real semantic difference between those two, we should model them that way.

*(From Vladimir)*

I agree about already existing per-museum concepts (e.g. the TMS "Terms" and "TermXRef" tables).  For these we should look at coreferencing them against each other.  But when a new concept is being minted, we better do just one (in AAT or AAC-terminology).

Do you agree that instead of this:

    _:title a E35_Title; p2_has_type _:title_type
    _:title_type a E55_Type;
      skos:exactMatch institution:primary_title_type.
      skos:broadMatch aac:primary_title_type

We should use the target concept directly, which is much simpler:

    _:title a E35_Title; p2_has_type aac:primary_title_type

A month ago I wrote about the LIDO Terminology group, and sent links to their staff asking for comments, and to some Getty mapping sheets (but these are not comprehensive).

### Reference:





