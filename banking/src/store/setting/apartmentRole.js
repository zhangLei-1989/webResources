export default {
    namespaced: true,
    state: {
        departmentDialogActive: false  //是否显示，添加部门弹出框
    },
    mutations: {

        //是否显示，添加部门弹出框
        toogleDepartmentDialogActive: function (state, isActive) {
            state.departmentDialogActive = isActive
        }

    }
}