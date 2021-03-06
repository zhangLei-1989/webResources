//服务器地址
//const server_address = 'http://192.168.107.29:52020'
//const server_address = 'http://192.168.103.100:52020'
//const server_address = 'http://test.cms.efanghang.com';
const server_address = 'http://192.168.103.100:52020'


//服务器api地址
const api = {

    //接口地址
    login: {
        pc_login: "/cms/login/pc_login",
        update_pwd: "/cms/sys/table_cms_user/update_pwd"
    },
    home: {
        get_yesterday_add_house: "/cms/house/house/get_yesterday_add_house",
        get_home_count: "/cms/house/house/get_home_count",
        getChengzuCountByDate: "/cms/compact/chengzu/getChengzuCountByDate",
        get_houseLineCount_list: "/cms/sys/resources_adjust/get_houseLineCount_list",
        get_yesterday_balance: "/cms/balance/table_balance_sheet/get_yesterday_balance",
        get_yesterday_user_count: "/cms/meet/guest_source_pools/get_yesterday_user_count",
        get_user_count: "/cms/meet/guest_source_pools/get_user_count",
        get_ratio_month: "/cms/house/house/get_ratio_month",
        get_ratio_week: "/cms/house/house/get_ratio_week",
        get_count_by_time: "/cms/house/house/get_count_by_time",
        guest_source_pools: "/cms/meet/guest_source_pools/get_count",
        get_range_count: "/cms/meet/guest_source_pools/get_range_count",
        get_ratiom_count: "/cms/meet/guest_source_pools/get_ratiom_count",
        get_ratiow_count: "/cms/meet/guest_source_pools/get_ratiow_count"
    },
    resources_adjust: {    //房行管理
        get_houseLine_list: '/cms/sys/resources_adjust/get_houseLine_list',    //列表
        get_manger_list: '/cms/sys/table_jjr_user/get_jjusrHome_list',    //用户管理列表
        get_houseLineCount_list: '/cms/sys/resources_adjust/get_houseLineCount_list',  //待审核/通过/未通过总数
        update_status_houseLine: '/cms/sys/resources_adjust/update_status_houseLine',  //账号状态修改
        update_audit_status: '/cms/sys/resources_adjust/update_audit_status',  //审核状态修改
        get_houseLine_detail: '/cms/sys/resources_adjust/get_houseLine_detail', //获取房行详情
        get_houseLine_delete: '/cms/sys/table_jjr_user/delete_jjuser',  // 用户管理的删除
        get_houseLine_use: '/cms/sys/table_jjr_user/update_status_jjuser', // 用户管理启用和禁用
        get_houseLine_log: '/cms/log/cms_house_log/get_list' , // 日志
        get_houseLine_code: '/cms/sys/table_jjr_user/send_verification_code' , // 房行发送验证码
        get_houseLine_new: '/cms/sys/table_jjr_user/insert_jjuser',  // 用户管理新赠
        get_houseLine_verification: '/cms/sys/table_jjr_user/require_verification_code',  // 验证验证码
        get_houseLine_huixian: '/cms/sys/table_jjr_user/get_jjuser' , // 验证验证码
        get_houseLine_company_all: '/cms/sys/table_jjr_user/get_company_all' , // 查看员工列表
        get_houseLine_department: '/cms/sys/department/get_list'  ,// 查看部门列表
        get_houseLine_role: '/cms/sys/role/get_list',  // 查看角色列表
        update_jjuser: '/cms/sys/table_jjr_user/update_jjuser' , // 用户管理查看编辑
        get_jjuser: '/cms/sys/table_jjr_user/get' , // 用户管理查看编辑回显
        insert_jjuser: '/cms/sys/table_jjr_user/insert_jjuser' , // 用户管理新增保存
        house_jjuser: '/cms/sys/table_jjr_user/get_jjuser' , // 用户管理编辑回显
        update_jjuser_two: '/cms/sys/table_jjr_user/update_jjuser_two' , // 用户管理编辑修改保存
        payment_setting: '/cms/account/bind_account/payment_setting' ,// 房行支付设置
        get_houseLine: '/cms/sys/resources_adjust/get_houseLine' , // 房行管理编辑回显
        update_houseLine : '/cms/sys/resources_adjust/update_houseLine' , // 房行管理编辑
        export_houseLine : '/cms/sys/resources_adjust/export_excel',  // 房行管理导出
        export_excel_houseLine : '/cms/sys/table_jjr_user/export_excel'  // 房行用户管理导出


    },
    house: {    //房源管理
        get_home_count: '/cms/house/house/get_home_count',      //B端房源--整租/合租/集中总数
        get_house_details: '/cms/house/house/get_house_details',        //B端房源--整租/合租详细信息
        get_home_list: '/cms/house/house/get_home_list',        //B端房源--获取整租/合租列表
        get_homejz_list: '/cms/house/house/get_homejz_list',    //B端房源--获取集中列表
        get_housejz_details: '/cms/house/house/get_housejz_details',        //B端房源--获取集中项目详细信息
        get_citySelect_list: '/cms/house/house/get_citySelect_list',        //B端房源--获取城市下拉
        get_city_list: '/cms/house/house/get_city_list',        //获取城市列表（Only）
        get_area_list: '/cms/house/house/get_area_list',        //获取区域列表（Only）
        get_businessCircle_list: '/cms/house/house/get_businessCircle_list',     //获取商圈列表（Only）
        get_companyList_list:'/cms/house/house/get_companyList_list' ,     //获取公寓名称列表
        get_citySelectTwo_list:'/cms/house/house/get_citySelectTwo_list',      //城市区域
        export_excel: "/cms/house/house/export_excel",
        export_jz_excel: "/cms/house/house/export_jz_excel"
    },
    message: {      //消息
        get_message_insert: '/cms/message/message_bulletin/insert',
        get_message_detail: '/cms/message/message_bulletin/get_detail', //获取消息详情
        get_message_log: '/cms/message/message_bulletin_log/get_list', //获取日志列表
        get_message_list: '/cms/message/message_bulletin/get_list', //获取消息列表
        get_message_singleDelete: '/cms/message/message_bulletin/delete_by_id', //单条信息删除
        get_message_batchDelete: '/cms/message/message_bulletin/delete_by_ids', //批量信息删除
        get_message_details: '/cms/message/message_bulletin/get_by_id', //获取消息详情
        get_message_logInformation: '/cms/message/message_bulletin_log/get_list', //获取日志信息
        get_message_publisher: '/cms/sys/table_cms_user/get_list', //获取日志信息
    },
    contract: {//订单
        get_contract_list: '/cms/compact/chengzu/get_list', //获取订单列表
        get_contract_information: '/cms/compact/chengzu/get_by_id', //根据chengzuId获取个人信息和合同信息
        get_contract_hetong: '/cms/compact/chengzu/get_contract_by_id', //根据chengzuId获取个人信息和合同信息
        get_contract_chenzu: '/cms/compact/chengzu/get_chengzu_by_id', //根据chengzuId获取个人信息
        get_contract_stateCount: '/cms/compact/chengzu/status_count', //获取订单各状态数目
        get_contract_pics: '/cms/accessory/pic/get_list', //查询图片附件信息
        get_contract_delivery: '/cms/house/house_delivery/get', //获取物业交割清单
        get_contract_export: '/cms/compact/chengzu/export', //订单查询结果导出
        get_contract_balance: '/cms/balance/table_balance_sheet/get_compact_list', //根据合同id查询收支信息列表
        get_contract_cost: '/cms/sys/zi_dian/get_list_by_mark', //根据字典mark(类型标识)查询对应费用列表
        get_contract_meetList: '/cms/meet/rentorInfo/get_list', // 预约管理多条件分页查询  预约管理分页
        get_contract_getCountNewByState: '/cms/meet/rentorInfo/getCountNewByState', // 预约列表页各处理状态数目 状态
        get_contract_look: '/cms/meet/rentorInfo/get_by_id', // 预约详情查看
        get_contract_geren: '/cms/compact/chengzu/get_chengzubasic_by_id', // 预约详情查看
    },
    user: {        //用户
        get_list: "/cms/meet/guest_source_pools/get_list",  //用户列表
        export_list: "/cms/meet/guest_source_pools/export_list"
    },
    setting: {
        get_home_list: "/cms/sys/table_cms_user/get_home_list",
        get_list: "/cms/sys/role/get_list",
        role_list: "/cms/sys/role_cms/get_list",
        mohu_list: "/cms/sys/role/get_list",
        delete_List: "/cms/sys/role/delete_by_id",
        newrole: "/cms/sys/role/save",
        cms_user: "/cms/sys/role_cms/get_list",
        insert_user: "/cms/sys/table_cms_user/insert_user",
        save: "/cms/sys/role_cms/save",
        bianji: "/cms/sys/role/get",
        bianjiBc: "/cms/sys/role/save",
        delete_user: "/cms/sys/table_cms_user/delete_user",
        delete_role: "/cms/sys/role_cms/delete_role",
        get_user: "/cms/sys/table_cms_user/get_user",
        update_user: "/cms/sys/table_cms_user/update_user",
        role_resources: "/cms/sys/role_resources/get_list",
        cms_house_log: "/cms/log/cms_house_log/get_list",
        batch_save: "/cms/sys/role_resources/batch_save",
        role_cms_resources: "/cms/sys/role_cms_resources/get_list",
        update_status_user: "/cms/sys/table_cms_user/update_status_user",
        role_cms: "/cms/sys/role_cms/get",
        role_cms_bc: "/cms/sys/role_cms/save",
        system_resources_cms: "/cms/sys/system_resources_cms/get",
        system_resources_cmssave: "/cms/sys/system_resources_cms/save",
        delete_practical_by_id: "/cms/sys/system_resources_cms/delete_practical_by_id"
    }
}
const autoAddServerAddress = function (obj) {

    const result = Object.create(null)

    for (let key in obj) {

        if (typeof obj[key] == 'object') {
            result[key] = autoAddServerAddress(obj[key])
        } else {
            result[key] = server_address + obj[key]
        }

    }
    return result

}

export default autoAddServerAddress(api)
