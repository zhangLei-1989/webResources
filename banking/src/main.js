import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/common.css'
import elementUI from "element-ui"
import axios from "axios";
import vueAxios from "vue-axios";
import store from "./store/index";
import echarts from 'echarts'

import VueSee from 'vue-see'
var options = { bgOpacity: 0.9, history: false };
Vue.use(VueSee, options);
/*
 *-----UEditor的引用-----
 */
import '../static/UEditor/ueditor.config.js'
import '../static/UEditor/ueditor.all.min.js'
import '../static/UEditor/lang/zh-cn/zh-cn.js'
import '../static/UEditor/ueditor.parse.min.js'


Vue.filter('date', function (input) {
  var d = new Date(input);
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
  var hour = d.getHours();
  var minutes = d.getMinutes();
  var seconds = d.getSeconds();
  // return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
  return year + '-' + month + '-' + day
})

Vue.use(elementUI)
// 挂载axios
Vue.prototype.axios = axios;
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
