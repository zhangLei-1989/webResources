/**
 * Created by hq5544 on 16/4/6.
 */
import { ajaxJson, ajaxGet } from '../tools/utils'

export default {
  // 账户信息
  getUnconfirmList ({ pages, rows }) {
    return ajaxGet('iou/getunconfirmlist', {
      pages,
      rows
    })
  },
  // 创建借条
  addIOU ({
    id: c_order_id, // 订单id
    amount: n_amt, // 金额
    borrowDate: t_borrow_tm, // 借钱日期
    repayDate: t_repay_tm, // 预期还钱日期
    rate: n_interest_rate, // 年化利率
    // fee: n_service_amt, // 服务费
    reason: c_purpose, // 借钱描述
    addReason: c_memo, // 借钱描述
    lender: c_lender_name, // 出借人姓名
    borrower: c_borrower_name, // 借款人姓名
    creatorType: b_crt_creditor, // 创建的类型，0为作为债务人，1为债权人
    picUrls: l_pic,
    pwd: c_pay_password
  }) {
    return ajaxJson('iou/addIOU', {
      c_order_id,
      n_amt,
      t_borrow_tm,
      t_repay_tm,
      n_interest_rate,
      // n_service_amt,
      c_purpose,
      c_memo,
      c_lender_name,
      c_borrower_name,
      b_crt_creditor,
      l_pic,
      c_pay_password,
      n_service_amt: 0,
      bWechat: 1
    })
  },
  getIOUDetail (iouid) {
    return ajaxGet('iou/getIOU', {
      iouid
    })
  },
  getIOURepayDetail ({
                       id,
                       iouId,
  }) {
    return ajaxGet('iou/getIOUListById', {
      iouListId: id,
      iouId,
    })
  },
  getPreIOUDetail ({
    iouId: iouid,
    openId: openid
  }) {
    return ajaxGet('iou/getPreIOU', {
      iouid,
      openid
    }, true)
  },
  // 举报借条+举报反馈同一个接口
  reportIOU ({
    id: iouId, // 借条id
    payWay: c_pay_methd, // 付款方式
    addReason: c_memo, // 补充说明
    imgSrc: l_pic,
    luotiao: b_naked
  }) {
    return ajaxJson('iou/reportIOU', {
      bWechat: 1,
      iouId,
      c_pay_methd,
      c_memo,
      l_pic,
      b_naked
    })
  },
  // 获取之前的举报信息
  getReportIOU (iouId) {
    return ajaxGet('iou/getReportIOU', {
      iouId
    })
  },
  // 驳回借条
  refuseIOU ({
    id: iouid,
    reason: cause
  }) {
    return ajaxJson('iou/refuseIOU', {
      iouid,
      cause
    })
  },
  // 确认借条
  confirmIOU ({
    id: iouId,
    pwd: c_pay_password
  }) {
    return ajaxGet('iou/confirmIOU', {
      iouId,
      c_pay_password
    })
  },
  // 删除借条deleteIOU
  deleteIOU (iouId) {
    return ajaxGet('iou/deleteIOU', {
      iouId
    })
  },
  // 获取 iou 数目
  getUserIOUCount () {
    return ajaxGet('iou/getUserIOUCount')
  }
}
