/* eslint-env shelljs */

// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'
env.BUILD_ENV = 'prod'

var path = require('path')
var config = require('../config/webpack')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.build_prod.conf')

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory.prod)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
//cp('-R', 'static/', assetsPath)
cp('-R', path.join(__dirname, '../dist/redirect/'), path.join(__dirname, '../dist/prod/'))

webpack(webpackConfig, function (err, stats) {
  cp('-R', path.join(__dirname, '../dist/static/prod'), path.join(__dirname, '../dist/prod/static/'))
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
})
