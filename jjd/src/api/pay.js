/**
 * Created by hq5544 on 16/4/6.
 */
import { ajaxJson, ajaxGet } from '../tools/utils'

export default {
  // 获取今借到账户垫资余额
  getCapitalLeft () {
    return ajaxGet('pay/getCapitalLeft')
  },
  // 获取用户绑卡相关信息
  payinit () {
    return ajaxJson('pay/payinit')
  },
  // 线下还款确认
  confirmOffLineRepay ({
    pwd: c_password,
    id: c_iou_list_id, // 筹款明细表id
    result: n_ret // 确认结果 0.否掉 1.确认
  }) {
    return ajaxJson('pay/offlineRepayConfirm', {
      c_password,
      c_iou_list_id, // 借条还款明细表id
      n_ret // 确认结果 0.否掉 1.确认
    })
  },
  // 线下出借
  offLineLend ({
    orderId: c_order_id, // 订单号
    bidId: c_bid_id, // 筹款id
    guaranteeId: c_guarantee_id, // 担保人id
    money: c_amt, // 客户想出借金额
    pwd: c_password, // 密码
    payWay: n_pay_method, // 线下支付方式
    offLinePayWay: c_offline_pay_method // 线下支付方式
  }) {
    return ajaxJson('pay/payBid', {
      c_order_id, // 订单号
      c_bid_id, // 筹款id
      c_guarantee_id, // 担保人id
      c_amt, // 客户想出借金额
      c_password, // 密码
      n_pay_method, // 0.余额1.银行卡2.线下
      c_offline_pay_method // 线下支付方式
    })
  },
  // 更换银行预留手机号码
  modifyBankTel ({
    number: c_card_no,
    tel: c_bank_tel,
    pwd: c_password
  }) {
    return ajaxJson('pay/modifyBankTel', {
      c_card_no,
      c_bank_tel,
      c_password
    })
  },
  // 解绑银行卡
  delBindCard ({
    number: c_card_no,
    pwd: c_password
  }) {
    return ajaxJson('pay/delBindCard', {
      c_card_no,
      c_password
    })
  },
  // 获取订单 id
  getOrderId () {
    return ajaxGet('pay/getOrderId')
  },
  // bid 出借
  payBid ({
    cardNum: c_card_no,
    orderId: c_order_id,
    id: c_bid_id,
    guarantor: c_guarantee_id,
    lendAmount: c_amt,
    password: c_password,
    payWay: n_pay_method,
    offlineWay: c_offline_pay_method
  }) {
    return ajaxJson('pay/payBid', {
      c_card_no,
      c_order_id, // 订单号
      c_bid_id, // 筹款id
      c_guarantee_id, // 担保人id
      c_amt, // 客户想出借金额
      c_password, // 密码
      n_pay_method, // 0.余额 1.银行卡 2.线下
      c_offline_pay_method // 线下支付方式
    })
  },
  payBidConfirm ({
    orderId: c_order_id,
    id: c_bid_id,
    guarantor: c_guarantee_id,
    lendAmount: c_amt,
    payOrder: c_pay_order_no,
    payToken: c_pay_token,
    payCode: c_auth_code
  }) {
    return ajaxJson('pay/payBidConfirm', {
      c_order_id, // 订单号
      c_bid_id, // 筹款id
      c_guarantee_id, // 担保人id
      c_amt, // 客户想出借金额
      c_pay_order_no,
      c_pay_token,
      c_auth_code
    })
  },
  // prod 出借
  payProductBid ({
    cardNum: c_card_no,
    orderId: c_order_id,
    id: c_product_bid_id,
    password: c_password,
    payWay: n_pay_method
  }) {
    return ajaxJson('pay/payProductBid', {
      c_card_no,
      c_order_id, // 订单号
      c_product_bid_id, // 产品申请表 id
      c_password, // 密码
      n_pay_method, // 0.余额 1.银行卡 2.线下
      c_offline_pay_method: '' // 线下支付方式
    })
  },
  payProductBidConfirm ({
    orderId: c_order_id,
    id: c_product_bid_id,
    payOrder: c_pay_order_no,
    payToken: c_pay_token,
    payCode: c_auth_code
  }) {
    return ajaxJson('pay/payProductBidConfirm', {
      c_order_id, // 订单号
      c_product_bid_id, // 产品申请表 id
      c_pay_order_no,
      c_pay_token,
      c_auth_code
    })
  },
  // 还款
  repay ({
    cardNum: c_card_no,
    orderId: c_order_id,
    idList: l_iou_id,
    amount: n_amt,
    password: c_password,
    payWay: n_pay_method,
    offlineWay: c_offline_pay_method
  }) {
    return ajaxJson('pay/repay', {
      c_card_no,
      c_order_id, // 订单号
      l_iou_id, // 还款列表
      n_amt, // 还款金额
      c_password, // 密码
      n_pay_method, // 0.余额1.银行卡2.线下
      c_offline_pay_method // 线下支付方式
    })
  },
  repayConfirm ({
    orderId: c_order_id,
    idList: l_iou_id,
    amount: n_amt,
    payOrder: c_pay_order_no,
    payToken: c_pay_token,
    payCode: c_auth_code
  }) {
    return ajaxJson('pay/repayConfirm', {
      c_order_id, // 订单号
      l_iou_id, // 还款列表
      n_amt, // 还款金额
      c_pay_order_no,
      c_pay_token,
      c_auth_code
    })
  },
  checkCredit () {
    return ajaxGet('my/checkCredit')
  },
  // 查询运营商认证通道状态
  checkOpration () {
    return ajaxGet('pay/mobileRecover')
  },
  // 充值
  reCharge ({
    cardNum: c_card_no,
    orderId: c_order_id,
    pwd: c_password,
    reChargeMoney: n_amt
  }) {
    return ajaxJson('pay/recharge', {
      c_card_no,
      c_order_id, // 订单号
      c_password, // 密码
      n_amt // 客户充值金额
    })
  },
  reChargeConfirm ({
    orderId: c_order_id,
    payOrder: c_pay_order_no,
    payToken: c_pay_token,
    payCode: c_auth_code,
    reChargeMoney: n_amt
  }) {
    return ajaxJson('pay/rechargeConfirm', {
      c_order_id, // 订单号
      n_amt, // 客户充值金额
      c_pay_order_no,
      c_pay_token,
      c_auth_code
    })
  },
  // 提现
  withdraw ({
    cardNum: c_card_no,
    orderId: c_order_id,
    pwd: c_password,
    withdrawMoney: n_amt
  }) {
    return ajaxJson('pay/withdraw', {
      c_card_no,
      c_order_id, // 订单号
      c_password, // 密码
      n_amt // 客户提现金额
    })
  },
  // 支付获取不到验证码时重新获取
  getSMSCode ({
    orderId: c_order_id,
    payToken: c_pay_token,
    payOrderId: c_pay_order_no
  }) {
    return ajaxJson('pay/reGetSMSCode', {
      c_order_id,
      c_pay_token,
      c_pay_order_no
    })
  },
  // 获取短信验证码信息
  getTextCode ({
    orderId,
    cardNum,
    tel,
    idNum,
    name
  }) {
    const param = {
      c_order_id: orderId, // 订单号
      c_card_no: cardNum, // 银行卡号
      c_telephone: tel, // 手机号
      c_id_card_no: idNum, // 用户的身份证号
      c_name: name // 用户的名称
    }
    return ajaxJson('pay/getBindCardSMS', param)
  },
  // 重新获取验证码
  getTextCodeAgain ({
    payOrderId,
    payToken
  }) {
    const param = {
      c_pay_order_no: payOrderId, // 平台订单号
      c_pay_token: payToken // 支付令牌
    }
    return ajaxJson('pay/getBindCardSMSAgain', param)
  },
  // 添加绑卡信息
  saveBindCardInfo ({
    orderId,
    cardNum,
    tel,
    idNum,
    name,
    payOrderId,
    payToken,
    bankName,
    code
  }) {
    const param = {
      c_order_id: orderId, // 订单号
      c_card_no: cardNum, // 银行卡号
      c_telephone: tel, // 手机号
      c_id_card_no: idNum, // 用户的身份证号
      c_name: name, // 用户的名称
      c_pay_order_no: payOrderId, // 平台订单号
      c_pay_token: payToken, // 支付令牌
      c_bank_name: bankName, // 银行名称
      c_auth_code: code // 验证码
    }
    return ajaxJson('pay/bindCard', param)
  },
  getMyIdcard () {
    return ajaxGet('my/getMyIdcard')
  },
  reBindCard ({
    orderId,
    cardNum,
    payOrderId,
    payToken,
    code,
  }) {
    const param = {
      c_order_id: orderId, // 订单号
      c_card_no: cardNum, // 银行卡 id
      c_pay_order_no: payOrderId, // 平台订单号
      c_pay_token: payToken, // 支付令牌
      c_auth_code: code, // 验证码
    }
    return ajaxJson('my/reBindCard', param)
  },
}
