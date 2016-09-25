---
title: What is best practice for labeling external authorities? 
priority: 3
category: Labeling
---

### Problem Statement

When modeling and mapping Linked Open Data, terms are often referenced from other URIs on the web that are controlled by an external source.  A common example of this practice would be the use of the AAT to provide type information for entities within CIDOC-CRM data.  

To semantically map this, all that is *required* is the URL of that type.  However, to minimize network traffic, increase performance, and assist applications in determining what ontology you are using, it is often a good practice to include some subset of that ontology's graph within your local graph to help users understand your use of that ontology.

What is the appropriate portions of an external ontology's graph to import into your own triplestore?

### Best Practice:

When linking to an entity in any authority file outside the current graph, you should import into our triplestore  a `skos:prefLabel` and a `skos:inScheme` for the entity. 

For example, if we are using the AAT term for provenance to type a Document, you should import these two triples into into our triplestore:


    aat:300055863 skos:inScheme aat: .
    aat:300055863 skos:prefLabel "Provenance" .

This will allow any application to display to a user a label for the type, and also allow the application to select the appropriate form of query needed to interrogate the dereferenced URL.

### Discussion:

*(From Vladimir)*

> How do we know the source of an external reference (ULAN vs VIAF) using only RDF, and not by parsing the URLs?

If someone just gives you a URL, you'll have to parse the URL.
- ULAN has such links, e.g.
  ulan:nnnn skos:inScheme ulan:
  But to get them, you need to load the full ULAN.
- VIAF doesn't have such links. But you can add them to you repo e.g. like
  viaf:nnnn void:inDataset viaf:
  
> What should you import into your triplestore?

For external nodes, you want at least the label.
Which also means for every AAT concept we use, we should state a prefLabel
*in our repo*. For efficiency, but also because GVP's pref label is different (e.g. we want
the simpler "exhibition" not the fully unambiguous "exhibitions (events)")

*(From Rob, via email, 9/19/2016)*

I think the description is wrong -- we're not importing from an *ontology*, but just referencing other resources on the web that happen to be controlled by someone else.  To me, it's simply the same recommendation of "When linking to any resource, include its label" regardless of who manages the resource.

*(From David, 9/22/2016)*

I agree.  Updated the description to more closely match Rob's suggestion.

### Reference:

