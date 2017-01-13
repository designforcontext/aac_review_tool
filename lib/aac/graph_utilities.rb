module AAC
  class GraphUtilities

    def self.to_framed_jsonld(graph, opts)
      context = opts.fetch(:context, nil)
      frame   = opts.fetch(:frame, {})

      unless context.nil?
        frame["@context"] = [frame["@context"]].compact
        if context.is_a? Hash
          frame["@context"] = (context["@context"] || context)
        elsif context.is_a? Array 
          context.each{|c| frame["@context"] << c}
        elsif context.is_a? String
          frame["@context"] << context
        end

        if frame["@context"].count == 1
          frame["@context"] = frame["@context"][0]
        end
      end      



      #puts "frame: #{frame}"


      unframed_json = JSON::LD::API::fromRdf(graph)
      json_results = JSON::LD::API.frame(unframed_json, frame)
      return json_results
    end

    def self.flatten_sameAs(graph) 
      sameAs_list = {}
      new_graph = RDF::Graph.new
      owl =  RDF::URI.new("http://www.w3.org/2002/07/owl#sameAs");
      graph.each_statement do |statement|
        if statement.predicate == owl
          if statement.subject.node?
            sameAs_list[statement.subject] = statement.object
          end
          if statement.object.node?
            begin
              sameAs_list[statement.object] = statement.statement            
            rescue Exception => e
              puts statement.to_s  
            end
          end
        end
      end    
      graph.each_statement do |statement|
        if statement.predicate == owl 
          next
        elsif sameAs_list[statement.subject] && sameAs_list[statement.object]
          new_graph.insert RDF::Statement.new(sameAs_list[statement.subject], statement.predicate, sameAs_list[statement.object])          
        elsif sameAs_list[statement.subject]
          new_graph.insert RDF::Statement.new(sameAs_list[statement.subject], statement.predicate, statement.object)
        elsif sameAs_list[statement.object]
          new_graph.insert RDF::Statement.new(statement.subject, statement.predicate, sameAs_list[statement.object])
        else
          new_graph.insert statement
        end
      end
      return new_graph
    end
  end
end
