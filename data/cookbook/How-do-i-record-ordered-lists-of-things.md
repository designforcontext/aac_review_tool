### Problem Statement:

### Best Practice:

*To Be Determined*

### Discussion:

*(From Rob)*

We should use rdf:List.  Choice is a pattern for selecting one of a list of alternatives.  We should avoid the magic predicate solution of rdf Containers like Seq, Bag and Alt.  All of this especially because rdf:List serializes nicely in Turtle and JSON-LD, which I hope will be our two primary representations.

*(From Vladimir)*

Disagree. Just because something looks nice in 2 serializations doesn't mean it's easy to query. And Rob, only a list with BLANK nodes looks good in Turtle, but you also dislike blank nodes.

Read [the specific requirement/discussion on github](https://github.com/american-art/npg/issues/34).  It's whether to order things like Sitters at all. Steve says no, I say yes...


But the major statement is that someone is a sitter:

   <object> P62_depicts <sitter1>, <sitter2>.

If we do a list, the expanded triples are like this:

  <object> P62_depicts <object/sitters/1>.
  <object/sitters/1> a rdf:List; 
      rdf:first <sitter1>; 
      rdf:next <object/sitters/2>.
  <object/sitters/2> a rdf:List; 
      rdf:first <sitter2>; 
      rdf:next rdf:nil.

How can one easily find all objects where <sitter/2> appears?

Since the order is subsidiary info, we can tack it as `crmx:displayOrder` somewhere. In this particular case it'll have to be a reification (below), but in many other cases it's in an node we have anyway (e.g. in Title or Production activity i.e. object-actor association).

    <object> crm:P62_depicts <sitter1>, <sitter2>.

    <object/sitter/1> a crm:E13_Attribute_Assignment;
       crm:P140_assigned_attribute_to <object>;
       crmx:property crm:P62_depicts;
       crm:P141_assigned <sitter1>;
       crmx:displayOrder 1.

    <object/sitter/2> a crm:E13_Attribute_Assignment;
       crm:P140_assigned_attribute_to <object>;
       crmx:property crm:P62_depicts;
       crm:P141_assigned <sitter2>;
       crmx:displayOrder 2.

*(From Rob)*

SPARQL 1.1 improves the interactions with rdf:List using property paths. But I’m sure you know that :)

> And Rob, only a list with BLANK nodes looks good in Turtle, but you also dislike blank nodes.

Sure — because I don’t know of a use case that says you need to refer to the index of an object in a particular ordering.  If we have such a use case, then we should use something like OAI-ORE’s proxy construction, or the OLO / CO / schema pattern of ListItem which enforces the creation of the identifiable proxy. Or as you have below, reification (which is the same pattern as ORE). It just makes everything much harder to implement and use, so use cases should be the first discussion.

> How can one easily find all objects where <sitter/2> appears?

<https://www.w3.org/TR/sparql11-query/#collections>


>Since the order is subsidiary info, we can tack it as crmx:displayOrder somewhere.


Right. You can always assign identity to the object-in-context-of-other-object that rdf:List uses a blank node for.

The question is whether this is *required*. I don’t see the need for ordering sitters in a painting… again … what are the use cases where the complexity of ordering outweighs the lack of descriptive fidelity of unordered properties.  Importantly, how will applications make use of that information?



### Reference:

* <https://github.com/american-art/npg/issues/34>
* <https://www.w3.org/TR/sparql11-query/#collections>

