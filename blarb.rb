require "linkeddata"

ttl = <<~eos
  @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
  @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
  @prefix skos: <http://www.w3.org/2004/02/skos/core#> .
  @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
  <http://collection.britishart.yale.edu/id/object/1000> a <http://erlangen-crm.org/current/E22_Man-Made_Object>;
  <http://erlangen-crm.org/current/P102_has_title> [
    a <http://erlangen-crm.org/current/E35_Title>;
    rdfs:label "Blue Passion Flower, for the Temple of Flora by Robert Thornton";
    <http://erlangen-crm.org/current/P2_has_type> [
      a <http://erlangen-crm.org/current/E55_Type>;
      rdfs:label "Repository title";
      skos:exactMatch <http://collection.britishart.yale.edu/id/thesaurus/title/Repository-title>
    ]
  ],  [
    a <http://erlangen-crm.org/current/E35_Title>;
    rdfs:label "The Blue Passion Flower, for Robert John Thornton’s Temple of Flora (London, 1799–1812)";
    <http://erlangen-crm.org/current/P2_has_type> [
      a <http://erlangen-crm.org/current/E55_Type>;
      rdfs:label "Repository title";
      skos:exactMatch <http://collection.britishart.yale.edu/id/thesaurus/title/Repository-title>
    ]
  ] .
eos

query = <<~eos
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX crm: <http://erlangen-crm.org/current/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

CONSTRUCT {
  <http://collection.britishart.yale.edu/id/object/1000> a crm:E22_Man-Made_Object .
<http://collection.britishart.yale.edu/id/object/1000> crm:P102_has_title _:title .
_:title a crm:E35_Title ;
  rdfs:label ?other_title ;
  crm:P2_has_type _:title_class .
_:title_class a crm:E55_Type ;
  skos:exactMatch ?other_title_type ;
  rdfs:label ?other_title_type_name .

}
WHERE {
  <http://collection.britishart.yale.edu/id/object/1000> a crm:E22_Man-Made_Object .
<http://collection.britishart.yale.edu/id/object/1000> crm:P102_has_title ?title_class .
?title_class a crm:E35_Title ;
  rdfs:label ?other_title .

{
  ?title_class crm:P2_has_type  _:other_title_generic . 
  _:other_title_generic a crm:E55_Type ;
    skos:exactMatch ?other_title_type ;
    rdfs:label ?other_title_type_name .

}
UNION
{
  ?title_class crm:P2_has_type  ?other_title_type . 
  ?other_title_type a crm:E55_Type ;
    rdfs:label ?other_title_type_name .
}

FILTER(?other_title_type != <http://collection.britishart.yale.edu/id/thesaurus/title/preferred>)
FILTER (!isBlank(?other_title_type))

}


eos


repository = RDF::Repository.new()
RDF::Turtle::Reader.new(ttl).each_statement do |s|
  repository.insert(s)
end

client = SPARQL::Client.new(repository)

graph = RDF::Graph.new
results = client.query(query)

results.each_statement {|s| graph.insert s}

puts graph.to_ttl



