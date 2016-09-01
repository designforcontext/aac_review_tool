### Problem Statement:

How to take this series of searches and concatenate the resulting triples into a document that describes the browse app's view of the graph, something that's more useful than the Pubby view of the data that just returns all triples where the ID is either the subject or object; that works well for shallow graphs, but the CRM is so deeply linked that I think the document has to travel a couple hops.

### Best Practice:

*To Be Determined*

### Discussion:

*(From Vladimir)*


What you call "Pubby view" is the Symmetric Concise Bounded Description (with the addition that blank nodes are traversed). It's a good choice for a repo to return in response to a DESCRIBE. However, we need a business-domain-specific definition of "business object" (or "unit of work" if you like). Artworks being the most important kind, but we also need to cover entities like people, institutions, etc.

Here's an example for the GVP vocabularies: <http://vocab.getty.edu/doc/queries/#All_Data_For_Subject>

Although this is much simpler than CRM, you see that it's not trivial at all.

"CRM... a couple hops" is a strong understatement.

For the British Museum:

- (here's the list of all RDF paths for Artworks that we wanted to display)[https://confluence.ontotext.com/display/ResearchSpace/BM+RForms+Mockup#BMRFormsMockup-BMRForm].
- We didn't implement this as a definite query. We listed all properties we
wanted to navigate, but that doesn't work that well:
    - in some situations you want to navigate a property P, in other cases stop there
    - such navigation involves making a whole bunch of queries

I haven't yet done this task "circumscribe the business-object graph" for CONA or JPGM.


> Some of those parts are external-AAT, Geonames, Schema.org, FOAF. 

Don't need to bring them all in. For external nodes, you want at least the label.
Which also means for every AAT concept we use, we should state a prefLabel
*in our repo*. For efficiency, but also because GVP's pref label is different (e.g. we want
the simpler "exhibition" not the fully unambiguous "exhibitions (events)")

If you can implement the above with one query, it's definitely CONSTRUCT since it returns shaped data. Can't be SELECT which returns tabular data. (Actually it's better to package that CONSTRUCT into  a type-dependent DESCRIBE, if the repo can be convinced to do so)

For returning lists of objects, you definitely want fewer fields, returned with SELECT as a table. E.g. see [this](https://confluence.ontotext.com/display/ResearchSpace/Search+Result+Fields#SearchResultFields-DisplayFields)

### Reference:

* <https://confluence.ontotext.com/display/ResearchSpace/Search+Result+Fields#SearchResultFields-DisplayFields>
* <https://confluence.ontotext.com/display/ResearchSpace/BM+RForms+Mockup#BMRFormsMockup-BMRForm>
