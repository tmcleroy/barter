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
        path.join(__dirname, '/client/app'),
        path.join(__dirname, '/node_modules')
      ]
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
          loader: 'ejs-loader'
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader', { publicPath: '../' })
        },
        {
          test: /(\.woff|\.woff2|\.ttf|\.eot|\.svg)$/,
          loader: 'file-loader?name=styles/fonts/[name]-[hash].[ext]'
        }
      ]
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(true),
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin('styles/[name].css'),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        _: 'lodash',
        Backbone: 'backbone'
      })
    ]
  };
};
