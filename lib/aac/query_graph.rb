module AAC
  class QueryGraph
    def self.generateGraph(data,file_path, uri_path, extras = nil)
      
      hash = Digest::SHA256.hexdigest data

      filename = "#{file_path}#{hash}.svg"
        
      unless File.exists? filename

        file = Tempfile.new(["",".ttl"])
        file.write(data)
        file.write(extras) if extras
        file.close
        results = `perl ./rdfpuml/rdfpuml.pl #{file.path}`
        file.unlink

        # puts "results of the graph: #{results} from #{file.path}"
        encoded_data = PlantUmlEncode64.encode(results)
        url =  "http://www.plantuml.com/plantuml/svg/#{encoded_data}"
        response = Typhoeus.get(url, followlocation: true)
        File.open(filename, "wb") {|f| f.write response.body}

     end
     return "#{uri_path}#{hash}.svg" 
    end
  end
end