import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

//服务器api接口地址
import api from "./serverApi.js"

import apartmentRole from "./setting/apartmentRole.js"  //设置-部门管理
import roleManger from "./setting/roleManger.js"  //设置-角色管理
import staffManger from "./setting/staffManger.js"  //设置-员工管理
import corporateBulletin from "./setting/corporateBulletin.js"  //设置-企业公告
import dictManger from "./setting/dictManger.js"  //设置-字典管理
import partners from "./cooperation/partners.js"  //合作方-合作方

const store = new Vuex.Store({
    state: { api },
    modules: {
        apartmentRole,
        roleManger,
        staffManger,
        corporateBulletin,
        dictManger,
        partners
    }
});

export default store;
