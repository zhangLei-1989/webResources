var path = require('path')
var config = require('../config/webpack')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV != 'production' ?
      config.dev.assetsPublicPath :
      process.env.BUILD_ENV == 'dev' ?
        config.build.assetsPublicPath.dev :
        process.env.BUILD_ENV == 'pre' ?
          config.build.assetsPublicPath.pre :
          config.build.assetsPublicPath.prod,
    // 这里判断是否使用绝对路径还是相对路径进行开发和生产, 在 config.js 里面配置
    filename: '[name].js',
    sourceMapFilename: utils.assetsPath('js/[name].[hash].map.js')
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'api': path.resolve(__dirname, '../src/api'),
      'tools': path.resolve(__dirname, '../src/tools'),
      'store': path.resolve(__dirname, '../src/store'),
      'scss': path.resolve(__dirname, '../src/scss'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      '$apiConfig': path.resolve(__dirname,
        process.env.NODE_ENV != 'production' ?
          '../config/api/dev.js' :
          process.env.BUILD_ENV == 'dev' ?
            '../config/api/dev.js' :
            process.env.BUILD_ENV == 'pre' ?
              '../config/api/pre.js' :
              '../config/api/prod.js')
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
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
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
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        },
        exclude: /node_modules/
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders()
  }
}
