# config.ru (run with rackup)
require './site/app'

# # Boot up the palette server in a thread.  Hack for Heroku.
# p1 = spawn "plumbing-palette-server/scripts/palette-server.py -c config/palette.ini"
# Process.detach(p1)

run MyApp