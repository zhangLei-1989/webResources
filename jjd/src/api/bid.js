/**
 * Created by hq5544 on 16/4/6.
 */
import { ajaxJson, ajaxGet } from '../tools/utils'

export default {
  // 创建借款
  addBid ({
    orderId: c_order_id, // 订单id
    amount: n_amt, // 借钱金额
    repayDate: t_repay_tm, // 预期还款日期
    repayType: n_repay_type, // 还款方式(int)0.到期还本付息1.等额本息（按月还款，最后一次性付清所有本息）
    times: n_period,
    rate: n_interest_rate, // 年化利率,(int)范围为0~24%，这里以1%为单位，传入0~24之间的整数
    fee: n_service_amt, // 服务费
    reason: c_purpose, // 借款用途
    reasonDetail: c_memo, // 借款用途详细描述
    guarantor: b_guarantee, // 是否需要担保人(int)0.否 1.是
    guaranteeRate: c_guarantee_rate, // 担保人费用比例(int)0~24
    toPublic: b_public, // 是否公开(int)0:不公开;1公开，默认公开
    pics: l_pic,
    pwd: c_pay_password
  }) {
    return ajaxJson('bid/addBid', {
      c_order_id,
      n_amt,
      t_repay_tm,
      n_repay_type,
      n_period,
      n_interest_rate,
      n_service_amt,
      c_purpose,
      c_memo,
      b_guarantee,
      c_guarantee_rate,
      b_public,
      l_pic,
      c_pay_password,
      bWechat: 1
    })
  },
  // 作担保
  addGuarantee ({
    orderId: c_order_id,
    pwd: c_pay_password,
    id: bidId,
    amount: n_amt,
    friendsId: l_friend
  }) {
    return ajaxJson('bid/addGuarantee', {
      c_order_id,
      c_pay_password,
      bidId, // 筹款id
      n_amt, // 担保金额
      b_public: l_friend.length > 0 ? 1 : 0, // 是否公开0.否 1.是
      l_friend // 好友列表
    })
  },
  // 获取详情
  getBid ({
    id,
    firstPage,
    openId
  }) {
    return ajaxGet('bid/getBid', {
      bidId: id,
      bFirstPage: firstPage,
      openid: openId
    }, true)
  },
  // 关闭筹款
  closeBid (id) {
    return ajaxGet('bid/closeBid', {
      bidId: id
    })
  },
  // 线下出借 todo 等接口
  offLineLend (id) {
    return ajaxGet('bid/closeBid', {
      bidId: id
    })
  }
}
