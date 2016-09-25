---
title: How do I maintain the provenance of statements in Linked Open Data?
priority: 3
october: true
category: Triplestores, RDF, and Inferencing
---

### Problem Statement:

When the AAC begins to generate a graph of all of the partner's information, many entities that reference the same entity will exist and be reconciled.

We would like to be able to connect statements made about the entities to the instituion making the statement, particularly when they disagree.

For example, given an person named  Maria von Trapp, I'd like to know that Princeton thinks that Maria von Trapp's middle name is "von" and the last name is "Trapp", but that Harvard thinks that "von Trapp" is the last name.

If the information is reconciled without provenance, we will only know that "Trapp" and "von Trapp" are two possible last names.

How do we maintain this information?

### Best Practice:

A best practice for this problem is still outstanding in the larger Linked Open Data community, and so this question has been determined to be out of scope for the AAC.  

### Discussion:

*(From David Newbury)*

I'd like to maintain field-level provenance for data fields, and I'd like to do this without URL parsing.  This will be essential for things like constituents, where we're going to end up with conflicting data provided by multiple partners, and we're going to have to be able to distinguish between them.

How do we credit external sources for providing us with information, and how do we allow users to judge the authority of statements made?

(I know we can potentially do this through looking at the URL.  Is this sufficient?)

*(From Rob)*

We shouldn’t care about [the source of external references].  And if we do, I’d like to know why we care about it enough to essentially requiring reification of the entire dataset, making it miserable to work with.

*(From Vladimir)*


First of all, we'd like to know that <princeton/constituent/123> and <harvard/constituent/456> are the same.  Better yet, we want to map them both to VIAF or ULAN if possible.  How to deal with labels is a secondary question.

But I see what you mean: for properties of art-research interest, you want to record them all, with provenance.

*(From Rob)*

To me, this question could be off-loaded to “How do AAC partners contribute to ULAN?” which is a Getty question we need to answer in the near future.

---


I think PROV-O is over-engineering for singly-mastered data (e.g. about objects)

*(From Rob)*

I’ve run afoul of the PROV-O constraints so many times over the past few years that I would recommend either extreme caution and checking any use with real experts, or avoiding it entirely.  (e.g. <https://www.w3.org/TR/prov-constraints/#generation-generation-ordering> )


### Reference:
