/**
 * Created by hq5544 on 16/4/6.
 */
// import {ajaxJson, ajaxJsonCredit} from '../tools/utils' // , ajaxGetCredit
import { ajaxJsonCredit, ajaxGetCredit, ajaxJsonCreditWeb } from '../tools/utils'

export default {
  // 获取信用中心状态列表
  getCreditList () {
    return ajaxGetCredit('user/getCreditSwitch')
  },
  // 信用报告详版
  getCreditReportDetail (userId) {
    return ajaxGetCredit('report/getH5CreditReport', {
      userId
    })
  },
  // 获取基本信息
  getBaseInfo () {
    return ajaxJsonCredit('prove/getBaseInfo')
  },
  // 保存基本信息
  saveBaseInfo ({
                  pCode,
                  cCode,
                  dCode,
                  pName,
                  cName,
                  dName,
                  wxAccount,
                  address,
                  contact1name,
                  contact1type,
                  contact1tel,
                  contact2name,
                  contact2type,
                  contact2tel
                }) {
    const param = {
      level_1_code: pCode,
      level_2_code: cCode,
      level_3_code: dCode,
      level_1_name: pName,
      level_2_name: cName,
      level_3_name: dName,
      c_wechat_id: wxAccount,
      c_home_addr: address,
      l_contacts: [
        {
          contact_tel: contact1tel,
          contact_name: contact1name,
          contact_type: contact1type
        },
        {
          contact_tel: contact2tel,
          contact_name: contact2name,
          contact_type: contact2type
        }
      ]
    }
    return ajaxJsonCredit('prove/saveBasicInfo', param)
  },
  // 获取车辆信息
  getCarInfo () {
    return ajaxGetCredit('prove/getCarProve')
  },
  // 保存车辆信息
  saveCarInfo ({
                 carBrand: c_car_brand, // 汽车品牌
                 carMileage: c_car_mileage, // 行驶里程
                 carPrice: c_car_price, // 购买价格
                 payStatus: c_car_pay_status, // 付款状态
                 havePay: c_car_paid, // 已支付
                 pCode: level_1_code, // 省级编码
                 pName: level_1_name, // 省级名称
                 cCode: level_2_code, // 地级编码
                 cName: level_2_name, // 地级名称
                 dCode: level_3_code, // 县级编码
                 dName: level_3_name, // 县级名称
                 age: c_car_age, // 车龄
                 isSecondHeand: b_car_is_used, // 是否二手车(true是二手车, false不是二手车)
                 isMortgage: b_car_is_mortgage, // 是否抵押过(true抵押过, false没有抵押过)
                 pic: l_car_image
               }) {
    return ajaxJsonCredit('prove/setCarProve', {
      c_car_brand, // 汽车品牌
      c_car_mileage, // 行驶里程
      c_car_price, // 购买价格
      c_car_pay_status, // 付款状态
      c_car_paid, // 已支付
      level_1_code, // 省级编码
      level_1_name, // 省级名称
      level_2_code, // 地级编码
      level_2_name, // 地级名称
      level_3_code, // 县级编码
      level_3_name, // 县级名称
      c_car_age, // 车龄
      b_car_is_used, // 是否二手车(true是二手车, false不是二手车)
      b_car_is_mortgage, // 是否抵押过(true抵押过, false没有抵押过)
      l_car_image
    })
  },
  // 获取房产信息
  getHouseInfo () {
    return ajaxGetCredit('prove/getHouseProve')
  },
  // 保存房产信息
  saveHouseInfo ({
                   houseType: c_house_type, // 房屋类型
                   houseArea: c_house_area, // 房屋面积
                   housePrice: c_house_price, // 购买价格
                   payStatus: c_house_pay_status, // 付款状态
                   havePay: c_house_paid, // 已支付
                   pCode: level_1_code, // 省级编码
                   pName: level_1_name, // 省级名称
                   cCode: level_2_code, // 地级编码
                   cName: level_2_name, // 地级名称
                   dCode: level_3_code, // 县级编码
                   dName: level_3_name, // 县级名称
                   cityDetail: c_house_address, // 具体地址
                   houseAge: c_house_age, // 车龄
                   isSecondHeand: b_house_is_used, // 是否二手车(true是二手车, false不是二手车)
                   isMortgage: b_house_is_mortgage, // 是否抵押过(true抵押过, false没有抵押过)
                   pic: l_house_image
                 }) {
    return ajaxJsonCredit('prove/setHouseProve', {
      c_house_type, // 房屋类型
      c_house_area, // 房屋面积
      c_house_price, // 购买价格
      c_house_pay_status, // 付款状态
      c_house_paid, // 已支付
      level_1_code, // 省级编码
      level_1_name, // 省级名称
      level_2_code, // 地级编码
      level_2_name, // 地级名称
      level_3_code, // 县级编码
      level_3_name, // 县级名称
      c_house_address, // 具体地址
      c_house_age, // 车龄
      b_house_is_used, // 是否二手车(true是二手车, false不是二手车)
      b_house_is_mortgage, // 是否抵押过(true抵押过, false没有抵押过)
      l_house_image
    })
  },
  // 获取工作信息
  getJobInfo () {
    return ajaxGetCredit('prove/getJobProve')
  },
  // 保存工作信息
  saveJobInfo ({
                 comName: c_company, // 公司名
                 position: c_position, // 职位
                 date: c_employment_date, // 入职日期
                 tel: c_company_tel, // 联系电话
                 pCode: level_1_code, // 省级编码
                 pName: level_1_name, // 省级名称
                 cCode: level_2_code, // 地级编码
                 cName: level_2_name, // 地级名称
                 dCode: level_3_code, // 县级编码
                 dName: level_3_name, // 县级名称
                 cityDetail: c_company_address, // 具体地址
                 imgSrc: l_company_image
               }) {
    return ajaxJsonCredit('prove/setJobProve', {
      c_company, // 公司名
      c_position, // 职位
      c_employment_date, // 入职日期
      c_company_tel, // 联系电话
      level_1_code, // 省级编码
      level_1_name, // 省级名称
      level_2_code, // 地级编码
      level_2_name, // 地级名称
      level_3_code, // 县级编码
      level_3_name, // 县级名称
      c_company_address, // 具体地址
      l_company_image
    })
  },
  // 获取收入信息
  getIncomeInfo () {
    return ajaxGetCredit('prove/getEarnProve')
  },
  // 保存收入信息
  saveIncomeInfo ({
                    monIncome: c_earn_month, // 月收入
                    picUrls: l_earn_image
                  }) {
    return ajaxJsonCredit('prove/setEarnProve', {
      c_earn_month, // 月收入
      l_earn_image
    })
  },
  // 刷新验证码
  fresh () {
    return ajaxJsonCredit('zhengxin/getImgrc')
  },
  // 提交全部验证
  submitCredit () {
    return ajaxJsonCredit('user/submitCredit')
  },
  // 获取用户录入的开关信息
  infoStage () {
    return ajaxJsonCredit('user/getBasicSwitch')
  },
  // 支付初始化
  payInit () {
    return ajaxGetCredit('user/payInit')
  },
  // 支付授信费用
  payForCredit ({
                  cardNum: c_card_no,
                  orderId: c_order_id,
                  payWay: n_pay_method,
                  pwd: c_password
                }) {
    return ajaxJsonCredit('user/payForCredit', {
      c_card_no,
      c_order_id,
      n_pay_method,
      c_password
    })
  },
  payForCreditConfirm ({
                         orderId: c_order_id,
                         payOrder: c_pay_order_no,
                         payToken: c_pay_token,
                         payCode: c_auth_code
                       }) {
    return ajaxJsonCredit('user/payCreditFeeConfirm', {
      c_order_id,
      c_pay_order_no,
      c_pay_token,
      c_auth_code
    })
  },
//    信用中心用户借入信息
  getBorrowList (userId) {
    return ajaxGetCredit('report/getBorrowList', {
      userId
    })
  },
  //    信用中心用户借出信息
  getLendList (userId) {
    return ajaxGetCredit('report/getLendList', {
      userId
    })
  },
  //    信用中心用户担保信息
  getGuaranteeList (userId) {
    return ajaxGetCredit('report/getGuaranteeList', {
      userId
    })
  },
  //    信用中心用户逾期信息
  getOverdueList (userId) {
    return ajaxGetCredit('report/getOverdueList', {
      userId
    })
  },
  //    信用中心用户被举报信息
  getReportList (userId) {
    return ajaxGetCredit('report/getReportList', {
      userId
    })
  },
  //    信用中心用户通话记录详情
  getContactList (userId) {
    return ajaxGetCredit('report/getContactList', {
      userId
    })
  },
  //    信用中心用户话费详情
  getMobileBill (userId) {
    return ajaxGetCredit('report/getMobileBill', {
      userId
    })
  },
  //    信用中心用户电商消费详情
  getEbusinessExpense (userId) {
    return ajaxGetCredit('report/getEbusinessExpense', {
      userId
    })
  },
  // 芝麻信用
  zhima ({
           name,
           idcard: certNo,
           tel: telephone,
           bankcard: bankcardNo,
         }) {
    return ajaxJsonCreditWeb('prove/getZhiMaCredit', {
      name,
      certNo,
      telephone,
      bankcardNo,
    })
  },
  getZhiMaCreditParams () {
    return ajaxJsonCreditWeb('prove/getZhiMaCreditParams')
  }
}
