import Vue from 'vue'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
import fastclick from 'fastclick'
// import Raven from 'raven-js'
import config from '$apiConfig'
import App from './App'
import Router from './router/router'
import ele from './components/mixin/ele'
import btn from './components/mixin/btn'
import group from './components/mixin/group'
import pollifill from './tools/polyfill'

// window.raven = Raven

// Raven
//   .config('https://0660abaf0c2348ca879e9215836bddec@sentry.io/110612', {
//     release: '201612010945'
//   })
//   .install()

pollifill.includes()

Vue.use(VueResource)

Vue.use(VueValidator)

Vue.component('ele', ele)
Vue.component('btn', btn)
Vue.component('group', group)

window.$config = config

Router.start(App, 'app')

fastclick.attach(document.getElementsByTagName('body')[0])
//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  // /|   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
