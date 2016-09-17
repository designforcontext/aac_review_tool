---
title: How should I connect name parts to the appropriate full name?
priority: 2
category: Modeling
---
### Problem Statement

When representing names or other appelations, it is common to both represent full names and parts of the names as individual entities within the graph. It then becomes important to connect the components of a name to the full name from which they were taken. 

For example, given "John Smith" and "Joe Smith" as alternate names for the same person, and Given "John" and "Joe" as first names for the person, how do we associate "Joe" as the first name of "Joe Smith"?

### Best Practice:

In the CRM, this is done using the predicate `P106 is composed of` to link the two appelations.  For example:  
    
    _:john_smith a crm:E41_Appellation; 
      rdfs:label "John Smith".

    _:john a crm:E41:Appellation;
      rdfs:label "John";

    _:john_smith crm:p106_is_composed_of _:john.

If this knowledge is present, it should be represented in the graph.

### Discussion:


### Reference:

