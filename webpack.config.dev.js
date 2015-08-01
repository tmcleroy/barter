var path = require('path');
var webpack = require('webpack');
var packageJson = require('./package.json');

module.exports = function () {
  return {
    entry: [
      'webpack-dev-server/client?http://localhost:' + packageJson.appConfig.devPort,
      'webpack/hot/dev-server',
      path.join(__dirname, '/client/app/scripts/app')
    ],
    output: {
        path: path.join(__dirname, '/server/public/dist/build/'),
        library: '[name]',
        filename: 'scripts/[name].dev.js'
    },
    resolve: {
      root: [
        path.join(__dirname, '/client/app/scripts'),
        path.join(__dirname, '/client/app/styles')
      ],
      alias: {
        // 'templates': path.join(__dirname, '/.dev/scripts/templates')
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
          loader: 'style-loader!css-loader!sass-loader'
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
        {
          test: /(\.woff|\.ttf|\.eot|\.svg|\.png|\.gif)$/,
          loader: 'url-loader'
        }
      ]
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
      // new webpack.ResolverPlugin(
      //   new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
      // ),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        '_': 'lodash'
      }),
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'eval-source-map',
    debug: true
  };
};
