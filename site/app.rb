require 'sinatra/base'
require "sinatra/reloader" 
require "sinatra/json"
require "json"
# require 'typhoeus'
require 'tempfile'

require 'haml'
require "tilt/sass"

require "sinatra/link_header"

class MyApp < Sinatra::Base

  configure :development do
    register Sinatra::Reloader
    set :show_exceptions, :after_handler
  end

  get "/" do
    haml :index
  end

end