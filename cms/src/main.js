import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/common.css'
import elementUI from "element-ui"
import axios from "axios";
import vueAxios from "vue-axios";
import store from "./store/index";
//查看图片插件
import preview from '@/components/public/preview/index'
import tool from "../static/js/tool.js";
Vue.use(preview)
window.Vue = Vue
window.store = store

Vue.use(elementUI)
// 挂载axios
Vue.prototype.axios = axios;
Vue.prototype.axios = axios.create({
  timeout: 600000
});
Vue.config.productionTip = false

Vue.prototype.axios.interceptors.request.use((config) => {
  let userInfo = tool.session.get("userInfo");
  // userInfo = {
  //   id: '12345',
  //   token: 'asdjsofjdsghd;sjgs'
  // };
  // if (userInfo) {
  //   config.data.headers.userId = userInfo.id;
  //   config.data.headers.token = userInfo.token;
  // }
 // console.info('config:', config);
  return config;
}, (error) => {
  return Promise.reject(error);
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
