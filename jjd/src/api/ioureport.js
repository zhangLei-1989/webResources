/**
 * Created by hq5544 on 16/4/6.
 *
 * 17/4/28 修改addReportIOU，添加imgLength，otherImgLength，otherImgList
 */
import { ajaxJson, ajaxGet } from '../tools/utils'

export default {
  // 发起举报
  addReportIOU ({
                  id: iouId, // 借条id
                  addReason: c_borrower_memo, // 补充说明
                  luotiao: b_naked,
                  realLend: n_real_lend_amt,
                  reason: n_report_reason,
                  imgList: l_borrower_img,
                  otherImgList: l_borrower_other_img,
                }) {
    return ajaxJson('ioureport/addReportIOU', {
      bWechat: 1,
      iouId,
      b_naked,
      n_report_reason,
      n_real_lend_amt,
      // n_borrower_img_no: l_borrower_img.length,
      n_borrower_img_no: l_borrower_img.length,
      l_borrower_img,
      c_borrower_memo,
      n_borrower_other_img_no: l_borrower_other_img.length,
      l_borrower_other_img,
      n_lender_img_no: '',
      l_lender_img: [],
      c_lender_memo: '',
      c_pay_methd: '',
    })
  },
  // 反馈证据证据
  addBackReportIOU ({
                     id: iouId, // 借条id
                     addReason: c_lender_memo, // 补充说明
                     luotiao: b_naked,
                     realLend: n_real_lend_amt,
                     reason: n_report_reason,
                     imgList: l_lender_img,
                     otherImgList: l_lender_other_img,
                   }) {
    return ajaxJson('ioureport/addBackReportIOU', {
      bWechat: 1,
      iouId,
      b_naked,
      n_report_reason,
      n_real_lend_amt,
      n_borrower_img_no: '',
      l_borrower_img: [],
      c_borrower_memo: '',
      n_lender_img_no: l_lender_img.length,
      l_lender_img,
      c_lender_memo,
      n_lender_other_img_no: l_lender_other_img.length,
      l_lender_other_img,
      c_pay_methd: '',
    })
  },
  // 补充证据
  updateReportIOU ({
                  id: iouId, // 借条id
                  borrowerAddReason: c_borrower_memo, // 借款人补充说明
                  lenderAddReason: c_lender_memo, // 出借人补充说明
                  luotiao: b_naked,
                  borrowerId: c_borrower_id,
                  lenderId: c_lender_id,
                  reason: n_report_reason,
                  realLend: n_real_lend_amt,
                  borrowerImgList: l_borrower_img,
                  borrowerOtherImgList: l_borrower_other_img,
                  lenderImgList: l_lender_img,
                  lenderOtherImgList: l_lender_other_img,
                }) {
    return ajaxJson('ioureport/updateReportIOU', {
      bWechat: 1,
      iouId,
      b_naked,
      c_borrower_id,
      c_lender_id,
      n_report_reason,
      n_real_lend_amt,
      n_borrower_img_no: l_borrower_img.length,
      l_borrower_img,
      c_borrower_memo,
      n_borrower_other_img_no: l_borrower_other_img.length,
      l_borrower_other_img,
      n_lender_img_no: l_lender_img.length,
      l_lender_img,
      c_lender_memo,
      n_lender_other_img_no: l_lender_other_img.length,
      l_lender_other_img,
    })
  },
  // 获取之前的举报信息
  getReportIOU ({
                  iouId,
                }) {
    return ajaxGet('ioureport/getReportIOU', {
      bWechat: 1,
      iouId,
    })
  },
}
