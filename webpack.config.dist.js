var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function () {
  return {
    entry: [path.join(__dirname, '/client/app/scripts/app')],
    output: {
        path: path.join(__dirname, '/server/public/dist/'),
        library: '[name]',
        filename: 'scripts/[name].js'
    },
    resolve: {
      root: [
        path.join(__dirname, '/app/scripts'),
        path.join(__dirname, '/app/styles')
      ],
      alias: {
        // 'bootstrap_sass': 'bootstrap-sass',
        // 'rad': 'rad/dist/scripts',
        // 'templates': path.join(__dirname, '/.dev/scripts/templates'),
        // 'localstorage': path.join(__dirname, '/app/bower_components/Backbone.localStorage/backbone.localStorage.js'),
        // 'twittertext': path.join(__dirname, '/app/bower_components/twitter-text/js/twitter-text.js')
      }
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          include: path.join(__dirname, 'client/app/scripts'),
          loader: 'babel-loader',
          query: {
            optional: ['runtime'],
            stage: 0
          }
        },
        {
          test: /\.ejs$/,
          loader: "ejs-loader?variable=data"
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract(
            'style-loader', 'css!sass', {
              publicPath: '../'
            }
          )
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract(
            'style-loader', 'css', {
              publicPath: '../'
            }
          )
        },
        {
          test: /(\.woff|\.ttf|\.eot|\.svg|\.png|\.gif)$/,
          loader: 'file-loader?name=assets/[name]-[hash].[ext]'
        }
      ]
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
      new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
      ),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        exclude: /templates\.js($|\?)/,
        compress: {
          drop_console: true
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin(true),
      new webpack.PrefetchPlugin('./client/app/styles/app.scss'),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        '_': 'lodash'
      }),
      new ExtractTextPlugin('styles/main.css', { allChunks: true }),
      new webpack.NoErrorsPlugin()
    ]
  };
};
