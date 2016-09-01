# Standard Library
require "json"
require "yaml"
require 'tempfile'

# Sinatra & Extensions
require 'sinatra/base'
require "sinatra/reloader" 
require "sinatra/json"

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

class HTML < Redcarpet::Render::HTML
  include Rouge::Plugins::Redcarpet # yep, that's it.
end

class MyApp < Sinatra::Base

  configure :development do
    register Sinatra::Reloader
    Dir.glob('./lib/**/*') { |file| also_reload file}


    set :show_exceptions, :after_handler
  end

  configure do 

    recipies = {}
    Dir.glob('./data/cookbook/**/*.md').each do |file|
      contents = File.read(file)
      metadata = {}
      if (md = contents.match(/\A(?<metadata>---\s*\n.*?\n?)^(---\s*$\n?)/m))
        contents = md.post_match
        metadata = YAML.load(md[:metadata])
      end
      metadata["title"] ||= File.basename(file, ".md").gsub("-"," ")

      obj= {
        content: contents,
        metadata: metadata,
        path: File.basename(file, ".md")
      }
      recipies[obj[:path]] = obj
    end
    set :recipies, recipies

    found_types = {}
    Dir.glob('./data/fields/**/*.yaml').each do |file|
      obj = YAML.load_file(file)
      name = obj["applies_to"]
      found_types[name] ||= []
      found_types[name].push obj["title"]
    end
    set :available_types, found_types

  end


  # Index Route
  #----------------------------------------------------------------------------
  get "/" do
    @available_types = settings.available_types
    @recipies = settings.recipies
    haml :index
  end

  # App Route
  #----------------------------------------------------------------------------
  get "/entity/:entity_type" do
    @entity_type = params[:entity_type]
    haml :app
  end

  # Cookbook Route
  #----------------------------------------------------------------------------
  get "/cookbook/images/:image" do

    File.read("./data/cookbook/images/#{File.basename(params[:image])}")
  end

  get "/cookbook/:page" do
    current_recipie = settings.recipies[params[:page]]
 
    halt 404 unless current_recipie

    @contents = current_recipie[:content]
    @metadata = current_recipie[:metadata]

    render_options = {
        with_toc_data: true
    }
    extensions = {
        tables: true,
        no_intra_emphasis: true,
        autolink: true,
        lax_spacing: true,
        footnotes: true,
    }
    renderer = Redcarpet::Render::HTML.new(render_options)
    @markdown = Redcarpet::Markdown.new(renderer, extensions)
    haml :cookbook

  end


  # Return the queries file as JSON
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

    client = AAC::QueryRunner.new(params[:endpoint])
    query = AAC::QueryObject.new(params[:fields])
    query.prefixes = {crm: params[:crm]}

    result_graph, values = client.test(query, params[:values], false)

    ttl_string = RDF::Turtle::Writer.buffer( prefixes: AAC::QueryObject::DEFAULT_PREFIXES ) do |writer|
      result_graph.each_statement do |statement|
        writer << statement
      end
    end

    select = query.select_query(params[:values]);
    construct = query.construct_query(params[:values])

    json({object: ttl_string, values: values, select: select, construct: construct})

  end

  

  # Generate the complete graph for an object.
  # (Still under development, tho' it works)
  # 
  # Takes the following params:
  #   :endpoint -> the sparql endpoint to use
  #   :crm      -> what ontology to use for the CRM
  #   :values   -> the list of values to pass into the queries
  #   :type     -> What format do you want? 
  #             options:
  #                 ttl:        Standard Turtle
  #                 nested_ttl: A single graph per-object, with blank nodes and sameAs
  #                 json:       A json object containing only the values from the selects 
  #             
  #----------------------------------------------------------------------------
  post "/full_graph" do
    client = AAC::QueryRunner.new(params[:endpoint])

    graph = RDF::Graph.new

    Dir.glob('./data/fields/**/*.yaml').each do |file|
      test_obj = YAML.load_file(file)
      next unless test_obj["applies_to"] && test_obj["applies_to"].include?(params[:entity_type])


      default_values = {}
      test_obj.select{|k,v| k.to_s =~ /^test_/}.each{|k,v| default_values[k.gsub("test_","")] = v}
      passed_values = params[:values].merge(default_values)


      query = AAC::QueryObject.new(test_obj)
      query.prefixes = {crm: params[:crm]}

      result_graph, values = client.test(query, passed_values, false)    
      result_graph.each_statement {|s| graph.insert s}
    end

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
    $graph_cache ||= {}
    val = params[:ttl].gsub("?", "_:")

    encoded_data = $graph_cache[val]
    unless encoded_data
      file = Tempfile.new(["",".ttl"])
      file.write(val)
      file.write(params[:extras]) if (params[:extras])
      file.close
      results = `perl ./rdfpuml/rdfpuml.pl #{file.path}`
      file.unlink
      # puts "results of the graph: #{results} from #{file.path}"
      encoded_data = PlantUmlEncode64.encode(results)
      $graph_cache[val] = encoded_data
    end
    return "http://www.plantuml.com/plantuml/svg/#{encoded_data}"
  end

end