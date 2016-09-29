require 'linkeddata'
require 'json/ld'
require 'rdf/isomorphic'
require "diffy"
require 'sparql/client'

module AAC
  class QueryRunner

    QueryRunner::YCBA_SPARQL = "http://collection.britishart.yale.edu/openrdf-sesame/repositories/ycba"
    QueryRunner::SAAM_SPARQL = "http://edan.si.edu/saam/sparql"
    
    def initialize(server)
      @server = SPARQL::Client.new(server)
    end
    
  
    def test(obj, params, validate=false)

      q1 = obj.construct_query(params)
      q2 = obj.select_query(params)
    
      # puts "SELECT QUERY: \n\n\n#{q2}\n\n\n"
      # puts "CONSTRUCT QUERY: \n\n\n#{q1}\n\n\n"

      graph =  get_graph(q1)
      values = get_values(q2)

      if validate
        validate_results(q1, q2, graph, values)
      end
      
      [graph, values]
    end


    def get_values(query, engine = @server) 
      results = engine.query(query)
      values = []
      results.each_solution do |s|
        items = {}
        s.each_variable do |v|
          items[v.name.to_s] = v.value.to_s
        end
        values << items
      end
      values.sort_by{|a| a.to_s}
    end


    def get_graph(query, engine = @server) 
      graph = RDF::Graph.new
      results = engine.query(query)
      
      results.each_statement {|s| graph.insert s}
      graph
    end

    def validate_results(q1, q2, graph, values)
      repository = RDF::Repository.new()
      graph.each_statement do |s|
        repository.insert(s)
      end

      validation_client = SPARQL::Client.new(repository)

      values2 = get_values(q2, validation_client)
      if (values - values2 != [])
        puts "--------------------"
        puts values
        puts "===does not match==="
        puts values2
        puts "--------------------"
        puts "SEE QUERY:"
        puts "#{q2}"
        puts "--------------------"
        
      end 
      g2 = get_graph(q1, validation_client)

      if graph.count != g2.count || !g2.isomorphic_with?(graph) 
        puts Diffy::Diff.new(graph.to_ttl, g2.to_ttl, options = {})
      end
    end
  end
end