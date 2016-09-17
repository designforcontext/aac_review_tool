---
title: How do I model a link and its label text to an external website?
priority: 2
category: Modeling
---

### Problem Statement:

Within the AAC data there are links to existing websites, such as the institution's collections site, wikipedia article about the party, or other human-readable resources that exist at URLs. 

What is the RDF pattern that indicates a link to the website as well as metadata about that link, such as a title?

### Best Practice:

AAC best practice for this is to use the `foaf` ontology to model these links.  If the link is to the *primary* website associated with an entity, it should be modeled using `foaf:homepage`, and given an explicit label:

    _:art_object foaf:homepage <www.institution.org/objects/art_object>.
    <www.institution.org/objects/art_object> rdfs:label "Homepage for Art Object".

If it is merely a page *about* an object, use `foaf:page`:

    _:art_object foaf:page <www.institution.org/objects/art_object>.
    <www.institution.org/objects/art_object> rdfs:label "Homepage for Art Object".

If you wish to make explicit statements about the page itself, including the creator of the page, why it is linked, or anything else, model the webpage as a `E31 Document` and type it with the appropriate AAT type. 


### Discussion:

Use Case: How do I go from the AAC data about an object back to the collections page on the institution website?

Also, I'm happy to foaf:page it up here, but that only handles the link, not the *text of the link*.  As in, for <a href="URL">LINK TEXT</a>, I can get the URL, but how do I get the LINK TEXT?


*(From Rob)*

Use case?  That said, the foaf or schema equivalents seem much better to me than the very very loose p1 and p48


### Reference:


