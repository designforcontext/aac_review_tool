require "./lib/aac.rb"
require 'yaml'
require 'json'


obj = {
  "thing"           => "http://collection.britishart.yale.edu/id/object/499",
  "pref_title_type" => "http://collection.britishart.yale.edu/id/thesaurus/title/preferred"
}

obj = {
  "thing"           => "http://edan.si.edu/saam/id/object/1991.39.1",
  "pref_title_type" => "http://collection.britishart.yale.edu/id/thesaurus/title/preferred"
}

testRig = AAC::QueryRunner.new(AAC::QueryRunner::SAAM_SPARQL)

graph = RDF::Graph.new
all_values = {}

data = YAML.load_file('data/queries.yaml')

data.each do |name, object_type|
  puts "\nCHECKING #{name.upcase}:"
  puts "------------------------"

  all_values[obj["thing"]] = {}
  object_type["fields"].each do |fieldname, field|
    name = fieldname.downcase.gsub(" ","_")
    puts "\nField #{fieldname.upcase}:"
    query = AAC::QueryObject.new(field)
    result_graph, values =  testRig.test(query, obj)

    puts "\n\nBAD QUERY???\n#{query.select_query(obj)}\n\n" if values.empty?

    result_graph.each_statement {|s| graph.insert s}
    all_values[obj["thing"]][name] = values
    # all_values[obj["thing"]]["#{name}_graph"] = result_graph.to_ttl
    # all_values[obj["thing"]]["#{name}_sparql"] = query.select_query(obj)

    puts values
  end 
end

puts "\n\n\n\nFINAL GRAPH:\n"

val = RDF::Turtle::Writer.buffer( prefixes: AAC::QueryObject::DEFAULT_PREFIXES ) do |writer|
  graph.each_statement do |statement|
    writer << statement
  end
end
puts val

puts "\n\n\n\nFINAL VALUES:\n"

puts JSON.pretty_generate all_values


