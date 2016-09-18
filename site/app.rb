# Standard Library
require "json"
require "yaml"
require 'tempfile'
require 'digest'
require 'typhoeus'


# Sinatra & Extensions
require 'sinatra/base'
require "sinatra/reloader" 
require "sinatra/json"
require "sinatra/content_for"

# Rendering Libraries
require 'haml'
require "tilt/sass"

# Internal Libraries
require "./lib/plant_uml_encode64.rb"
require "./lib/aac.rb"

# Markdown Libraries
require 'redcarpet'
require 'rouge'
require 'rouge/plugins/redcarpet'

# Slug Libraries
require "unicode"
require "babosa"

# Accomodate syntax highlighting in our markdown.
class HTML < Redcarpet::Render::HTML
  include Rouge::Plugins::Redcarpet
end


def process_recipies
    recipies = {}
    Dir.glob('./data/cookbook/**/*.md').each do |file|
      contents = File.read(file)
      metadata = {}
      if (md = contents.match(/\A(?<metadata>---\s*\n.*?\n?)^(---\s*$\n?)/m))
        contents = md.post_match
        metadata = YAML.load(md[:metadata])
      end
      metadata["title"] ||= File.basename(file, ".md").gsub("-"," ") << "?"
      metadata["answered"] ||= !contents.include?("### Best Practice:\n\n*To Be Determined*")
      metadata["priority"] ||= "5"

      classes = metadata["classes"] ? metadata["classes"].split(" ") : []

      metadata["classes"]  = classes.uniq.join(" ")

      obj= {
        content: contents,
        metadata: metadata,
        path: File.basename(file, ".md"),
        filepath: file
      }
      recipies[obj[:path]] = obj
    end
    recipies.sort_by{|key,obj| [obj[:metadata]["category"],obj[:metadata]["priority"]]}.to_h
end


class MyApp < Sinatra::Base

  helpers Sinatra::ContentFor


  configure :development do
    register Sinatra::Reloader
    Dir.glob('./lib/**/*') { |file| also_reload file}
    set :show_exceptions, :after_handler
  end

  configure do 


    # Load the cookbook (FAQ) data files into memory
    # and store them at `settings.recipies`
    #------------------------------------------------

    set :recipies, process_recipies

    # Search the field YAML files and add the names
    # of the entities that they apply to into
    # `settings.available_types`
    #------------------------------------------------
    found_types = {}
    Dir.glob('./data/fields/**/*.yaml').each do |file|
      obj = YAML.load_file(file)
      name = obj["applies_to"]
      found_types[name] ||= []
      found_types[name].push obj["title"]
    end
    set :available_types, found_types


    # Setup the markdown renderer, and store it at
    # `settings.markdown
    #-------------------------------------------------
    render_options = {
        with_toc_data: true,
        filter_html: false,
        link_attributes: {target: "_blank"}
    }
    extensions = {
        tables: true,
        no_intra_emphasis: true,
        space_after_headers: true,
        autolink: true,
        lax_spacing: true,
        footnotes: true,
    }
    renderer = Redcarpet::Render::HTML.new(render_options)
    set :markdown, Redcarpet::Markdown.new(renderer, extensions)
  end
 

   #                  ROUTES BELOW                   #
   #-------------------------------------------------#
   #-----------------               -----------------#
   #-----------                           -----------#
   #-------                                   -------#
   #-----                                       -----#
   #---                                           ---#                
   #--                                             --#
   #-                                               -#
   #                                                 #
   #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#

  # Index Route
  #----------------------------------------------------------------------------
  get "/" do
    @available_types = settings.available_types
    @recipies =  settings.development? ? process_recipies : settings.recipies
    haml :index
  end

  # App Route
  #----------------------------------------------------------------------------
  get "/entity/:entity_type" do
    @entity_type = params[:entity_type]
    haml :app
  end

  # Cookbook Image Route
  #----------------------------------------------------------------------------
  get "/cookbook/images/:image" do
    File.read("./data/cookbook/images/#{File.basename(params[:image])}")
  end

  # Cookbook Route
  #----------------------------------------------------------------------------
  get "/cookbook/:page" do

    @recipies = settings.development? ? process_recipies : settings.recipies

    @page = params[:page]
    current_recipie = @recipies[@page]
    halt 404 unless current_recipie

    @contents = current_recipie[:content]
    @metadata = current_recipie[:metadata]
    @path     = current_recipie[:path]
    @markdown = settings.markdown


    haml :cookbook
  end


  # Return the appropriate fields for the entity_type file as JSON
  #----------------------------------------------------------------------------
  get "/data" do

    halt 404 unless params[:entity_type] && settings.available_types.keys.include?(params[:entity_type])

    data = Dir.glob('./data/fields/**/*.yaml').collect do |file|
      obj = YAML.load_file(file)
      next unless obj["applies_to"].include? params[:entity_type]
      obj
    end
    json data.compact
  end


  # Run a SPARQL query
  # 
  # Assumes a :fields param, which is a JSON object containing
  #    {select, construct, where, values}
  # and a :values param, which is a object where the keys are
  # the values from the fields.values and the values are the
  # parameters to pass in.
  # 
  # ..."values value values".  There are only three hard things...
  # 
  #----------------------------------------------------------------------------
  post "/search" do

    # setup query
    client = AAC::QueryRunner.new(params[:endpoint])
    query = AAC::QueryObject.new(params[:fields])
    query.prefixes = {crm: params[:crm]}

    # execute the query
    result_graph, values = client.test(query, params[:values], false)

    # convert the resulting graph to turtle
    ttl_string = RDF::Turtle::Writer.buffer( prefixes: AAC::QueryObject::DEFAULT_PREFIXES ) do |writer|
      result_graph.each_statement do |statement|
        writer << statement
      end
    end

    # retrieve the sparql ueries
    select = query.select_query(params[:values]);
    construct = query.construct_query(params[:values])

    # return stuff
    json({object: ttl_string, values: values, select: select, construct: construct})

  end

  

  # Generate the complete graph for an object.
  # (Still under development, tho' it works)
  # 
  # Takes the following params:
  #   :endpoint -> the sparql endpoint to use
  #   :crm      -> what ontology to use for the CRM
  #   :values   -> the list of values to pass into the queries
  #   :type     -> What format to return the results in
  #             options:
  #                 ttl:        Standard Turtle
  #                 nested_ttl: A single graph per-object, with blank nodes and sameAs
  #                 json:       A json object containing only the values from the selects 
  #                 report:     A HTML page detailing the JSON
  # 
  #  TODO: Exctract the report generators into their own module.            
  #----------------------------------------------------------------------------
  post "/full_graph" do

    client = AAC::QueryRunner.new(params[:endpoint])
    graph = RDF::Graph.new
    all_values = {}
    all_fields = {}

    def camelize(word)  
      word.to_slug.normalize.to_s.gsub(/[-_](.)/){|match| $1.upcase}
    end

    # For every relevant data file,
    Dir.glob('./data/fields/**/*.yaml').each do |file|
      test_obj = YAML.load_file(file)
      next unless test_obj["applies_to"] && test_obj["applies_to"].include?(params[:entity_type])

      # ...including default values,
      default_values = {}
      test_obj.select{|k,v| k.to_s =~ /^test_/}.each{|k,v| default_values[k.gsub("test_","")] = v}
      passed_values = params[:values].merge(default_values)

      # ...execute a query,
      query = AAC::QueryObject.new(test_obj)
      query.prefixes = {crm: params[:crm]}
      result_graph, values = client.test(query, passed_values, false)    
      
      # ...append the resulting triples to the graph,
      result_graph.each_statement {|s| graph.insert s}

      #..append the tabular results to the object,
      key = test_obj["key"] || camelize(test_obj["title"])
      all_values[key] = values.collect{|obj| obj.map{|k,v| [camelize(k),v]}.to_h}

      # ...and save the fields if we're doing a report
      all_fields[key] = test_obj if params[:return_type] == "report";
    end

    # If you'd like a report, generate that report.
    if params[:return_type] == "report"

      validation_errors = {}
      report_sections = all_fields.sort_by{|k,v| v["sort_order"]}.collect do |key,field|
        
        values = all_values[key]
        
        title_classes = []
        title_classes.push("no_values") if values.count == 0
        if field["mandatory"] && values.count == 0
          title_classes.push("missing_mandatory") 
          validation_errors[field["title"]] ||= []
          validation_errors[field["title"]].push("Mandatory field not present.")
        end
        if !field["multiples"] && values.count > 1 
          title_classes.push("too_many_values") 
          validation_errors[field["title"]] ||= []
          validation_errors[field["title"]].push("Multiple values present where only one allowed.")
        end

        str = ""
        str << "#### <span class='#{title_classes.join(" ")}'>#{field["title"]}</span>\n\n"

        if values.count > 0
          table_headers = values.first.keys
          str << "|#{table_headers.join(" | ")}|\n"
          str << "|#{table_headers.map{|i| i.gsub(/./,"-")}.join("-|-")}|"
          str << "\n"
          str << values.collect do |value|
            "|" + table_headers.collect do |cell|
              value[cell]
            end.join(" | ")+ "|"
          end.join("\n")
          str << "\n\n"
        else 
          str  << "<span class='no_results'>*(no results)*</span>\n\n"
        end
        str << "------\n\n"
        str
      end

      validation_bits = validation_errors.collect do |name, errors|
        error_str = "**#{name}:**\n\n"
        errors.each{|e| error_str += "* #{e}\n"}
        error_str + "\n\n"
      end.join("") + "-------------------------\n\n"

      unless validation_bits.empty?
        validation_bits = "### Errors\n\n"  + validation_bits
      end

      return settings.markdown.render(validation_bits + "### Field Listing\n\n" + report_sections.join("\n\n")).gsub("<table>","<table class='table table-striped table-condensed table-bordered'>")
    end

    # if you'd like a JSON file, return that.
    if params[:return_type] == "json"
      return JSON.pretty_generate all_values
    end

    # If you like your turtle normalized, let's resolve all of the sameAs statements...
    if params[:return_type] == "ttl"
      sameAs_list = {}
      new_graph = RDF::Graph.new
      owl =  RDF::URI.new("http://www.w3.org/2002/07/owl#sameAs");
      graph.each_statement do |statement|
        if statement.predicate == owl
          if statement.subject.node?
            sameAs_list[statement.subject] = statement.object
          end
          if statement.object.node?
            sameAs_list[statement.object] = statement.statement
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
      graph = new_graph
    end

    # And let's return the graph, exressed in triples.
    val = RDF::Turtle::Writer.buffer( prefixes: AAC::QueryObject::DEFAULT_PREFIXES ) do |writer|
      graph.each_statement do |statement|
        writer << statement
      end
    end

    return val
  end


  # Generate a SVG path from the graph.
  # Given a TTL file, run it through the rdfpuml code
  # and generate a graph.
  #----------------------------------------------------------------------------
  post "/graph" do

    val = params[:ttl].gsub("?", "_:")
    file_path = "./site/public/graphs/"
    uri_path =  "/graphs/" 

    AAC::QueryGraph.generateGraph(val,file_path,uri_path, params[:extras])
  
  end

end