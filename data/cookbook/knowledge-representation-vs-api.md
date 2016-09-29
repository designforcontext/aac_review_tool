---
title: How do I handle complexity in knowledge representation?
priority: 1
category: Modeling
---
### Problem Statement:

The CIDOC-CRM defines a specific way to model many relationships between entities.  However, other ontologies also define conceptually-similar relationships, often in much simpler ways.  For example, take the first name of an actor:

    _:actor crm:P131_is_identified_by _:actor_name.
    _:actor_name a crm:E82_Actor_Appellation;
    crm:P106_is_composed_of _:name_part.
    _:name_part a crm:E82_Actor_Appellation;
        crm:p2_has_type institution:first_name_type.
        rdfs:label "John".
    institution:first_name_type a crm:E55_Type;
        skos:broadMatch aat:300404651.

and also

    _:actor foaf:firstName "John".

Additionally, museum data often is complex enough that in order to correctly model the information available, mapping has to happen not at the row level, but at the individual cell level.  For example, when determining what the relationship "after" means when discussing two artworks, it is possible that depending on the relationship between the two people and the two works, the CRM mapping of that relationship could be wildly different.

When and how is it appropriate to simplify the graph, and at what stage in the pipeline is this most appropriate?  



### Best Practice:

There is a long and ongoing discussion about the benefits and trade-offs of modeling for the most effective API vs. modeling for the most comprehensive knowledge representation, and there is may not be a best practice for every application.

For the AAC, due to the decisions that have been made over the course of the project, we will continue to lean towards the side of knowledge representation, but we will follow closely the work that the Getty Museum is doing as they perform a similar task with a stronger focus on effective API design.   Our hope is that through comparing these two projects, we will be able to extract recommendations and lessons learned.

### Discussion:

Rob's suggestion is to publish the simple version and construct the longer version only as needed.  David's suggestion is to publish the longer version and construct the shorter one for use in the browse app.  Option three is to publish both, which creates data duplication.  

*(From Rob)*

First there’s the discussion around the use of other ontologies, then the creation of new ones if needed.  If we can import terms from existing places, so much the better. And (IMO) if the resulting model is simpler but just as expressive, we should do that in preference to using a more complex CRM pattern.  As simple as possible, and no simpler.

Regarding other ontologies, `dc:` and `schema:` seem two strong candidates, along with any W3C ontology.

*(From David)*

For complicated knowledge modeling problems, ones that require a significant amount of cell-by-cell modeling, my recommendation is to find a good example, preferably one that exposes information across institutions, and to model it as a best practice using the full CRM constructs.

This can be added to the AAC triplestore by hand and demoed in the browse application as an example of the fullest potential of the CRM.

Additionally, we should identify a shortcut technique that is simple to execute in Karma and recommend it as a good practice for the AAC.

Ideally, it would be possible for a single query to locate both of these (when executed against the shortcut), but if this is not possible it should be flagged as such in the AAC and an API structure defined to abstract the complexity.  

*(From Rob, via email, 9/19/2016)*

If you want the data to be used, make it as simple as possible to cover as many use cases as possible but not absolutely every possible scenario. I've wasted too many years working on and with standards that didn't follow this and die on the vine.

*(From David, via email, 9/19/2016)*

To me, what we're doing is trying to *as accurately as possible* represent the information that the museums are publishing.  I think that doing so lets us create multiple simultaneous APIs for multiple use cases, each with different needs, and if we flatten stuff out prematurely we optimize for a single use case, but eliminate use cases that we can't know about yet.  I don't think we're building an API—I think we're building a data store to build APIs on top of. 

Which is only a useful way to think about it if someone actually builds an API for people to use, which is on my plate, I believe.  But this may not be the project where I actually get to prove this point.  I just have worked on too many projects where the API has been defined by the known use cases, and then more and more functionality gets glued on and the API becomes unsustainable.  If we can disassociate the semantic layer from the API layer, we can, when needed, throw out the API layer and replace it without having to do rework against all the wildly disparate data sources.  It's ridiculous overkill if all we're trying to do is build a consensus website view against multiple datasets—though if that's all we're doing, then Linked Data is overkill in general.  I'd just define a limited interop API, map the data to that directly, and things would be faster, easier, and less confusing for everyone.  Instead, I think what the AAC is doing/should be doing is demonstrating that if you build a rich, consistent semantic layer, building that interop API should be trivial without remapping from the source data, and that building a /different/ API should also be trivial.

*(From Duane, via email, 9/19/2016)*

I want to reinforce what David said here. We would all love this to be simple, but AAC’s goal is beyond the browse app. It is in part to explore how feasible/unfeasible this is, what kinds of norms would be needed, and then build one demonstration on top of it. I’m frustrated that we could have used much of the available $ to build a really sophisticated and engaging app, but only a tiny % of the budget goes there. So I have two further thoughts to add to the discussion:

We want to show that there is a distinction between the input transformation (moving rigid legacy models into flexible, if dense, linked relationship models) and the output transformation (create developer-accessible APIs for a range of purposes). There is a very negative meme around one-offs in the museum (and DH) world currently, but that comes from two places: Un-maintainable over-complexity or Inflexible over-simplicity. We would like to see if there is a balance by teasing apart input and output around the repository (or whether we can fail at both in a single project? :-) ). The data pipeline diagram I circulated a few weeks ago aimed to capture that distinction. The “Toy Box” idea for the browse app also hopes to leverage different data views, where other API outputs of the data will be needed (and we have at least 3 developers so far who want to try building “toys”).

There is a key *unstated* requirement, I think. 14 institutions (with others waiting in the wings) are making an effort to get data out of their systems, with a desire for flexibility. The modeling of complexity mirrors what they have given us (e.g. deconstructed names, multiple titles for works, etc.), minus some of the relationships we can create (reconciliation + some mapping). I think, if we aim to simplify it will require (or appear to them) throwing away data. Making what they have less expressive/complete. I am concerned that decision will need to be put before the partner institutions, to negotiate the anticipated outcomes and their acceptance of what will appear, to them, changing their data. Otherwise they say “we gave you this, but can’t get it out.” I don’t think this project has the time or budget for that negotiation, or the data leadership. So I think, if it is not an extreme burden, then a bit of extra complexity could be a prudent thing, as well as reinforcing lessons learned.

*(From Rob, via email, 9/19/2016)*

To clarify my point on simplicity -- it's not against the /data/ being complex, it's about the complexity that CIDOC CRM imposes, which is then multiplied by trying to fit absolutely everything into a single union-of-all-models.  I agree we shouldn't throw away data, I think where we disagree is that we have to use ONLY CRM to express that data.

For example, I can either do, using well established Linked Data predicates:

    _:who a E21_Person ;
      rdfs:label "Rob Sanderson" ;
      schema:familyName "Sanderson" ;
      schema:givenName "Rob" .

Or with CRM [with AAT] I can do:

    _:who a E21_Person ;
      crm:P131_is_identified_by [
          a crm:E82_Actor_Appellation ;
          crm:p2_has_type aat:300266386 ;
          crm:P3_has_note "Rob Sanderson" ;
          crm:P106_is_composed_of [
              a crm:E82_Actor_Appellation ;
              crm:P2_has_type aat:3000404651 ;
              crm:P3_has_note "Rob ] , [
              a crm:E82_Actor_Appellation ;
              crm:P2_has_type aat:300404652 ;
              crm:P3_has_note "Sanderson" ] .


[And God forbid if there's an actual note about the resource, rather than a value. Or that AAT doesn't have the concept of the type. How can I say that my ORCID identifies me?  Or a URI, that goes in a `p3_has_note`??]  

I don't want to throw away data, I want us to produce useful Linked Data that follows the norms of the LOD community, rather than sticking religiously to only what CRM gives us.   This was my "Are we doing LOD, or are we doing CRM?" comment ... and I understood Eleanor's response to confirm that we were doing the former.

My perspective is that LOD *is* the API. You can do whatever you want in the privacy of your own database, and using full on hardcore CRM ... great. But when an external client then starts to consume that (being the point of LOD, no?) with the intention to actually use it (see previous parenthetical), there needs to be agreement and understanding about the meaning of the data. CRM makes that much harder, for (IMO) insufficient gain. Just look at the above example... are we really prepared to say that the CRM version is a best practice for an entire community? And we think that anyone will take that seriously? 

*(From Duane, via email, 9/19/2016)*

Then we don’t disagree! I have been a proponent of LOD for many years, in many industries, before engaging with CRM. :-)

I leave the details of specific choices for mappings and alternatives to you and David. You two have your “hands in the soil.” And I recognize the degree to which the promoters of CRM are known to advocate purity/singularity over alignment with broader non-CH LOD community. I just want to be sure I’m clearly a voice for data flexibility, for the use cases planned, known, and as-yet-unknown (but anticipated).


*(From David, via email, 9/19/2016)*

I agree with you guys on all of this.  There is no freaking way that anyone can build an application directly against a fully-reified CIDOC-CRM model.  It's a mess of an API.  

What I've been learning, though, from having spent three years trying to model museum data in partnership with people who really, really care about details that I don't understand or even understand why matter (until they explain it to me), is that it is capable of allowing me to capture important details.

For instance, my wife is "Becca Newbury".  But at one point in her life, she was "Rebecca Elmer".  And to her friends, she's "Boo".  Also, on at least one essential document, she's "Rebecca Newberry", but  not really; only in the context of that document.

Or, to use a museum example—my default, go-to painting (which I don't even like) is titled "Young Women Picking Fruit", except for a period in 1905 where it went be "Young Woman Plucking Fruit". 

These details matter, and they're known, and they can't be captured in schema.org, but they can in the CRM (and probably in other ways.).   And in 95% of the applications that I can think about, they don't matter.  But in some cases, they do.  And I feel like my job is to try and model the data so that that 5% of use cases is still possible. 

Also, because the data that I want is shared across hundreds of databases around the world, I can't rely on the nuances being kept within an internal database—it needs to be made publicly available somehow.

Because of this, I don't think that the data model and the API surface can be the same thing.  It's trying to serve two masters: usability and nuance. One has to give, or they need to be two separate things.  

So my first design goal is to model the data as completely as the data allows, with enough fidelity that if nothing else I could recreate the source document with it.  If I can "round-trip" the data, I know that I've at least not thrown information away, even if I've mis-labeled it.

My second design goal is to make it so it is as easy as possible to build APIs on top of.  This tends to mean designing the data model so that a single query can return data modeled at different levels of complexity.  At the simplest levels, that means that there's a certain amount of boilerplate that might seem like overkill, but it's there to make the more nuanced levels possible without completely separate queries, if all you want is the simple data.

Third, I think we should use the best tool for the job.  If museums are going to be CIDOC, that's great, but there's no reason to model everything in that.  Say, for bibliographical data—give me enough in CIDOC that I can tell there's an entity, give me a label to read, and give me a skos:exact match to something modeled sanely with a skos:inScheme or some other hook so I know how to move forward programmatically..

Finally, you need a simple API.  Preferably several, for different discrete use cases.  I think that if you're going to model this, it should be also possible to have an API surface for this that exposes, say, Dublin Core.  And Schema.org.  And whatever else you need—preferably at the application level.  I look at what Facebook is doing with GraphQL, or Netflix with Falcor, and this is the pattern I'm seeing.  Rich, graph-based underlying data stores, with simple, easily-definable, malleable APIs built on top of them.  

This does mean that you can't have your API and your model be the same thing, because the API needs to change, and the model doesn't.  The API needs to responds to use cases, but it is so expensive to remodel the data that it becomes "impossible".

I realize there are no tools to do this in the museum world.  This is the problem I'm seeing, and the one that I'm interested in helping to solve.  

*(From conference call, 9/28/2016)*

**JSON-LD is an issue**

* Two options
    * Build triples, then just map a flat JSON-LD version — not as useful
    * Create a Frame, map the model into it, then apply all the data into the Frame — very complex, and takes a lot more time
        * Creates a “best form” for it — create a Frame, a Context
        * Contains the explicit structure inherent in the RDF, which makes it most useful
* Can we just do it with the N3 data?
* RS: Linked Data as internal data model or as an API in consistent/usable way?
    * JSON-LD is best for external use of the data by others
    * Interoperability is Rob’s goal
* DN: Best way to provide an API for the browse app is JSON-LD
    * Best way to maintain flexible interoperability is to have an RDF graph
    * SO
        * Create the simplest graph possible? (RS view)
        * Create a rich set and then transformations to make the data simple? (DN view)
* RS: Semantic Web didn’t take off until it simplified to use HTTP and JSON-LD, so accessible to others now
* CK: Don’t disagree with RS. It’s a resources issue.
    * Complexity of data
        * NPG — number of files (from 7 to 17), lots of comments, 50+ modeling discussions, etc.
        * Number of people in the project is large, and there will be a lot of discussions about how to model/create the Frames for JSON-LD
        * Rob has committed the Getty to doing this 
        * Happy to share this for AAC
* RS: Framing specification is already written (but don’t ever read it! it is messy!)
* DN: Concern — it means taking the Getty target data model, so every institution’s data has to be modeled the same way?
    * Concerns of shortcut properties and long-form properties
    * Data will not appear if the paths don’t match the Getty’s model?
    * RS: Won’t change the structure of the graph, so it may not appear the same but the data should be there
* RS: Challenge: Which resources should not be embedded, in the context of the entire graph? As long as the Frame does not set a default, 
    * DN: In the case of birthdate, only one would have a label and be visible in the context, whereas the other would be available but would not be represented in a way that people can understand.
* DN: How do we query?
    * SPARQL query to extract a subset of the data, and then build Frames for the specific subset that is extracted. Can also do CONSTRUCT queries, UNIONS, etc.
* CK: Going forward?
    * RS: Send the Getty target models for ISI and DN to review.
    * ISI: Continue to model for N3 / SPARQL.
    * DN: Build smaller, more targeted frames.
    * Agree that doing a full, large, Frame-focused model is a huge amount of work.
* DN: Aim for capturing as much knowledge as possible, then when we achieve some consensus (and experience), we can review how that aligns with a more general model

### References:

* <https://github.com/american-art/npg/issues/49>

