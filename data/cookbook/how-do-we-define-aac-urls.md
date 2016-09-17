---
title: What is the root URL for each AAC Partner?
priority: 2
category: Defining URL Structures
---
### Problem Statement

One of the fundemental questions for Linked Data is what namespace you will use when creating URLs to reference entities that you wish to state.

For the AAC, we need to define what root domain we will use for AAC Partner data.

### Best Practice:

Each institution identifies their own domain to use in the RDF.

Pick a domain that you will use for your LOD identifiers. It should be one that you can either manage or delegate, but that you retain control over. This doesn’t mean you need to host the data — but you do need to control the domain. In order for this to work, it needs to be a distinct DNS-routable address for your LOD (not just your main website domain URL).  Either:

* A discrete subdomain (e.g. data.thewalters.org)
* A completely separate  domain (e.g. thedigitalwalters.org)

This allows you to control the DNS (the address, a domain name, and where in the world it is pointing), but delegate the handling of the information. In the short term, the RDF information can be handled, hosted, and managed by ISI — you just create a single DNS entry that points from your address to their server. In future, when your own servers (or some different group/host) hold the information, the address is repointed there. Inside the RDF, the domain remains persistent.

For those institutions with existing LOD URLs (SAAM, YCBA…), they should remain the same — the AAC RDF will use them directly.  The goal for this is that if a user dereferences the URL, data is returned: http://collection.britishart.yale.edu/id/object/499 already does this, so we don't need to do anything for the AAC here. For institutions without RDF data, our assumption is that ISI will spin up a HTML/RDF instance for them during the course of this project. What we recommend is those URLs to be owned by the institution, not AAC.

### Discussion:


### Reference:

* See Confluence: <http://work.americanartcollaborative.org/pages/viewpage.action?spaceKey=GI&title=URI+Root+Domains+for+AAC+Partner+RDF>