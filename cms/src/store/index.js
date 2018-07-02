import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

//服务器api接口地址
import api from "./serverApi.js"
import resourceManagement from "./resourceManagement.js"

import userInfo from './userInfo.js'

const store = new Vuex.Store({
	state: { api },
	modules: {
		userInfo,
		resourceManagement
	}
});

export default store;