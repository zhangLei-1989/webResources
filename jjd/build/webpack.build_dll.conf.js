/**
 * Created by hq5544 on 16/9/22.
 */
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var glob = require("glob");
var projectRoot = path.resolve(__dirname, '../')
var utils = require('./utils')

var componentsVendors = glob.sync(path.join(__dirname, '../src/components/**/*.vue'))

var modulesVendors = [
  'fastclick',
  'qrcode-npm',
  'vue-resource',
  'vue-router',
  'vue-validator',
  'vuex',
  'weixin-js-sdk',
  'js-md5',
  'vue',
];

var vendors = modulesVendors.concat(componentsVendors)

module.exports = {
  output: {
    path: 'dist/dll',
    filename: '[name].[chunkhash].js',
    library: '[name]_[chunkhash]',
  },
  entry: {
    vendor: vendors,
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'api': path.resolve(__dirname, '../src/api'),
      'tools': path.resolve(__dirname, '../src/tools'),
      'store': path.resolve(__dirname, '../src/store'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'vue-html',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 1,
          name: utils.assetsPathDll('../dll/img/[name].[hash:7].[ext]')
        },
        include: /static/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        include: projectRoot,
        exclude: /(node_modules)|(static)/,
        query: {
          limit: 10000,
          name: utils.assetsPathDll('../dll/img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPathDll('../dll/fonts/[name].[hash:7].[ext]')
        },
        exclude: /node_modules/
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders(),
    postcss: [require('postcss-cssnext')()],
    autoprefixer: false
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'dist/dll/manifest.json',
      name: '[name]_[chunkhash]',
      context: __dirname,
    }),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, '../dist/dll/index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunks: ['vendor'],
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    })
  ],
};
