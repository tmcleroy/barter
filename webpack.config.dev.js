var webpack = require('webpack');
var path = require('path');
var packageJson = require('./package.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function () {
  return {
    entry: [
      'webpack-dev-server/client?http://localhost:' + packageJson.appConfig.devPort,
      'webpack/hot/dev-server',
      path.join(__dirname, '/client/app/scripts/app')
    ],
    output: {
        path: path.join(__dirname, '/server/public/dist/'),
        publicPath: 'http://localhost:' + packageJson.appConfig.devPort + '/',
        library: '[name]',
        filename: 'scripts/[name].dev.js'
    },
    resolve: {
      root: [
        path.join(__dirname, '/client/app')
      ]
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          include: [
            path.join(__dirname, 'client/app/scripts')
          ],
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
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
        },
        {
          test: /(\.woff|\.woff2|\.ttf|\.eot|\.svg|\.png|\.jpg|\.gif)$/,
          loader: 'file-loader?name=assets/[name]-[hash].[ext]'
        }
      ]
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
      new ExtractTextPlugin('styles/[name].dev.css'),
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        _: 'lodash',
        Backbone: 'backbone'
      })
    ],
    devtool: 'eval-source-map',
    debug: true
  };
};
