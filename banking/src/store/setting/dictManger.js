export default {
    namespaced: true,
    state: {
        dictionaryDialogActive: false  //是否显示，添加部门弹出框
    },
    mutations: {

        //是否显示，添加部门弹出框
        toogleDictionaryDialogActive: function (state, isActive) {
            state.dictionaryDialogActive = isActive
        }

    }
}