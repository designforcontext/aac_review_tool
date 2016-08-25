module AAC
  class QueryObject
    self::DEFAULT_PREFIXES = <<~eos
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX crm: <http://erlangen-crm.org/current/>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    eos

    attr_accessor :select, :construct, :where, :prefixes
    attr_writer :values

    def values(args)
      arg_list = args.collect do |arg|
        val = arg.collect {|val| "<#{val}>"}.join(" ")
        "(#{val})"
      end.join(" ")

      "VALUES (#{@values}) {#{arg_list}}" 

    end
    def construct_query(args)
      <<~eos
        #{QueryObject::DEFAULT_PREFIXES}
        #{@prefixes}

        CONSTRUCT {
          #{@construct}
        }
        WHERE {
          #{@where}
        }
        #{values(args)}
      eos
    end
    def select_query(args)
      <<~eos
        #{QueryObject::DEFAULT_PREFIXES}
        #{@prefixes}

        SELECT #{@select}
        WHERE {
          #{@where}
        }
        #{values(args)}
      eos
    end
  end
end