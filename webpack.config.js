var webpack     = require('webpack');
var path        = require('path');
const validate  = require('webpack-validator');
const merge     = require('webpack-merge');
 
const parts     = require('./config/webpack-parts.js');
const pkg       = require('./package.json');


const BUILD_DIR = path.resolve(__dirname, 'site/public/js');
const APP_DIR   = path.resolve(__dirname, 'site/react/');


const common = {
  entry: {
    app: APP_DIR + '/index.jsx',
    vendor: Object.keys(pkg.dependencies)
  },

  output: {
    path: BUILD_DIR,
    publicPath: "/js/",
    filename: '[name].js'
  },
  module : {

    loaders : [
      {
        test : /\.jsx/,
        include : APP_DIR,
        loader : 'babel?cacheDirectory'
      }
    ]
  }
};

var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(common, 
      {
        devtool: 'source-map'
    },
    parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
    ),
    parts.extractBundle({
        name: 'vendor',
        entries: Object.keys(pkg.dependencies)
    }),
    parts.minify()

    );
    break;
  default:
    config = merge(common,
      {
        devtool: 'cheap-module-eval-source-map'
      },
      parts.extractBundle({
          name: 'vendor',
          entries: Object.keys(pkg.dependencies)
      })
      
    );
}

module.exports = validate(config);