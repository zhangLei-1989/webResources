// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env.js'),
    indexDev: path.resolve(__dirname, '../../dist/dev/index.html'),
    indexPre: path.resolve(__dirname, '../../dist/pre/index.html'),
    indexProd: path.resolve(__dirname, '../../dist/prod/index.html'),
    assetsRoot: path.resolve(__dirname, '../../dist'),
    assetsSubDirectory: {
      dev: 'static/dev',
      pre: 'static/pre',
      prod: 'static/prod'
    },
    assetsSubDirectoryDll: '',
    assetsPublicPath: {
      // dev: 'https://api.jinjiedao.cn/jjd2/dev/',
      dev: 'http://ceshi.gushistory.com/jjd2/dev/',
      pre: 'http://test.aizhantai.com/jjd2/pre/',
      prod: 'http://www.gushistory.com/jjd2/'
    },
    // 目前来看, 使用绝对路径部署资源是正确的, 可以实现模块的组件化.
    // `assetsPublicPath` 设置成 cdn 地址的话, 全部 js 和 css 就变成了 cdn 地址, 这样以后每次更新, 只需要 index.html 里面的文件名变动, 就会对应了 cdn 上的静态资源.
    productionSourceMap: false,
    // gzip off by default as many popular static hosts such as
    // surge or netlify already gzip all static assets for you
    productionGzip: false,
    // 七牛自动处理 gzip
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    assetsPublicPath: '/', // 这里是本地开发路径
    assetsSubDirectory: 'static',
    env: require('./dev.env'),
    port: 8082,
    proxyTable: {}
  }
}
