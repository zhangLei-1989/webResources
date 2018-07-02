/**
 * Created by pjc on 2016/7/19.
 */
import { ajaxGet, ajaxForm, ajaxJson } from '../tools/utils'

export default {
  // 获取查信用的结果
  getCreditResultInfo () {
    return ajaxGet('my/getCreditInfoById')
  },
  // 获取验证码
  getTelCodeToRegister (telephone) {
    return ajaxForm('user/getTelCodeToRegister', {
      telephone
    }, true)
  },
  // 添加新产品
  addProduct ({
    id: c_order_id,
    minMoney: n_min_amt,
    maxMoney: n_max_amt,
    minTime: n_min_tm,
    maxTime: n_max_tm,
    payWay: n_repay_type,
    yearlyRate: n_interest_rate,
    minService: n_min_service_fee,
    serviceRate: n_service_fee_rate,
    addText: c_memo,
    house: b_require_house_info,
    xuexin: b_require_xuexin_info,
    zhengxin: b_require_zhengxin_info,
    car: b_require_car_info,
    jobInfo: b_require_job_info,
    incomeInfo: b_require_income_info,
    minUnit: n_min_tm_unit,
    maxUnit: n_max_tm_unit,
    pwd: c_pay_password
  }) {
    return ajaxJson('prod/addProduct', {
      c_order_id, // 订单id
      n_min_amt, // 最小借款额度
      n_max_amt, // 最大借款额度
      n_min_tm, // 借款时间下限（天）
      n_max_tm, // 借款时间上限（天）
      n_repay_type, // 还款方式0.到期还本付息1.等额本息（按月还款，最后一次性付清所有本息）
      n_interest_rate, // 年化利率,范围为0~24%，这里以1%为单位，存储0~50之间的整数
      n_min_service_fee, // 最低服务费
      n_service_fee_rate, // 服务费率%, 这里以1%为单位，存储0~50之间的整数
      c_memo, // 补充说明
      b_require_xuexin_info, // 学信 0.否 1.是
      b_require_zhengxin_info, // 征信 0.否 1.是
      b_require_car_info, // 车产 0.否 1.是
      b_require_house_info, // 房产 0.否 1.是
      b_require_job_info, // 工作信息 0.否 1.是
      b_require_income_info, // 收入信息 0.否 1.是
      n_min_tm_unit,
      n_max_tm_unit,
      c_pay_password
    })
  },
  // 获取产品详情 借款人
  getProduct ({
    id,
    openId
  }) {
    return ajaxGet('prod/getProduct', {
      id,
      openId
    }, true)
  },
  // 获取产品详情 出借人
  getProductBySelf (id) {
    return ajaxGet('prod/getProductBySelf', {
      id
    })
  },
  // 关闭产品
  closeProduct (id) {
    return ajaxGet('prod/closeProduct', {
      bOpen: 0,
      id
    })
  },
  // 开启产品
  openProduct (id) {
    return ajaxGet('prod/closeProduct', {
      bOpen: 1,
      id
    })
  },
  // 购买产品
  applyProduct ({
    orderId: c_order_id,
    productId: c_product_id,
    amount: n_amt,
    times: n_period,
    reason: c_purpose,
    reasonDetail: c_memo,
    pics: l_pic,
    pwd: c_pay_password,
    unit: n_tm_unit
  }) {
    return ajaxJson('prod/applyProduct', {
      c_order_id, // 订单id
      c_product_id, // 产品id
      n_amt, // 借款金额
      n_period, // 分期还款的期数
      c_purpose, // 借款用途
      c_memo, // 借款用途详细描述
      bWechat: true, // 是否是微信平台 0否 1是
      l_pic, // 图片列表
      c_pay_password,
      n_tm_unit
    })
  },
  // 关闭购买产品请求 出借人 / 借款人
  closeBidProduct (id) {
    return ajaxGet('prod/closeBidProduct', {
      id
    })
  },
  // 获取产品申请详情
  getProductBid ({
    id
  }) {
    return ajaxGet('prod/getProductBid', {
      id
    })
  },
  getHomePage ({
    userId: userid,
    openId
  }) {
    return ajaxGet('prod/getHomePage', {
      userid,
      openId
    }, true)
  },
  // 获取头像 base64
  getUserHead ({
    userId,
    openId
  }) {
    return ajaxGet('prod/getUserHead', {
      userId,
      openId
    }, true)
  }
}
