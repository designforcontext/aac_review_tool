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



class MyApp < Sinatra::Base

  configure :development do
    register Sinatra::Reloader
    set :show_exceptions, :after_handler
  end

  configure do 
    set :sparql_runner, AAC::QueryRunner.new(AAC::QueryRunner::YCBA_SPARQL)
  end


  # Index Route
  #----------------------------------------------------------------------------
  get "/" do
    haml :index
  end

  # Return the queries file as JSON
  #----------------------------------------------------------------------------
  get "/data" do
    json YAML.load_file("./data/queries.yaml")["E22_Man-Made_Object"]["fields"]
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

    puts params.inspect 
    query = AAC::QueryObject.new(params[:fields])

    result_graph, values = settings.sparql_runner.test(query, params[:values])

    ttl_string = RDF::Turtle::Writer.buffer( prefixes: AAC::QueryObject::DEFAULT_PREFIXES ) do |writer|
      result_graph.each_statement do |statement|
        writer << statement
      end
    end

    json({object: ttl_string, values: values})

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
      file.close
      results = `perl ./rdfpml/rdfpuml.pl #{file.path}`
      file.unlink
      encoded_data = PlantUmlEncode64.encode(results)
      $graph_cache[val] = encoded_data
    end
    return "http://www.plantuml.com/plantuml/svg/#{encoded_data}"
  end

end