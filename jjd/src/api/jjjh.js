/**
 * Created by hq5544 on 16/4/6.
 */
import { ajaxJson, ajaxGet } from '../tools/utils'

export default {
  // 获取用户是否提交今借计划
  getPlanSubmit () {
    return ajaxGet('plan/getPlanSubmit')
  },
  // 提交今借计划
  addPlanSubmit () {
    return ajaxJson('plan/addPlanSubmit')
  },
  // 获取(事件描述、借款详情、家庭信息、学校信息)填写状态
  getPlanState () {
    return ajaxGet('plan/getPlanState')
  },
  // get school info
  getSchoolInfo () {
    return ajaxGet('plan/getSchoolInfo')
  },
  // update or init school info
  updateSchoolInfo (obj) {
    return ajaxJson('plan/updateSchoolInfo', obj)
  },
  // get family info
  getFamilyInfo () {
    return ajaxGet('plan/getFamilyInfo')
  },
  updateFamilyInfo (obj) {
    return ajaxJson('plan/updateFamilyInfo', obj)
  },
  downProtocol () {
    return ajaxGet('plan/downProtocol')
  },
  // 获取事件描述信息
  getEventDesc () {
    return ajaxGet('plan/getEventDesc')
  },
  initPlanApplyLoan () {
    return ajaxGet('plan/initPlanApplyLoan')
  },
  getPlanApplyLoan (loanId) {
    return ajaxGet('plan/getPlanApplyLoan', { c_loan_id: loanId })
  },
  getPlanInfo () {
    return ajaxGet('plan/getPlanInfo')
  },
  uploadAgreement () {
    return ajaxJson('plan/uploadAgreement')
  },
  confirmGuaPlanApplyLoan (loanId, pwd) {
    return ajaxJson('plan/confirmGuaPlanApplyLoan', { c_loan_id: loanId, c_password: pwd })
  },
  // 更新事件描述信息
  updateEventDesc ({
                     pic: l_upload_img,
                     reason: c_contact_reason,
                     rethink: c_rethink,
                     id: c_event_id,
                     course: c_event_course,
                     prove: c_repay_prove,
                   }) {
    return ajaxJson('plan/updateEventDesc', {
      l_upload_img,
      c_contact_reason,
      c_rethink,
      t_crt_tm: new Date().getTime(),
      c_event_id,
      c_event_course,
      c_repay_prove,
    })
  },
  // 获取借款信息
  getIouInfo () {
    return ajaxGet('plan/getIouInfo')
  },
  // 更新借款信息
  updateIouInfo (obj) {
    let type = 10
    if (obj.type === 'APP') {
      type = 1
    } else if (obj.type === '公众号') {
      type = 2
    } else if (obj.type === '网站') {
      type = 3
    }
    return ajaxJson('plan/updateIouInfo', {
      n_to_repay_plats: obj.count, // 仍有欠款的网贷平台总数,
      l_iou_detail_list: [{
        c_plat_name: obj.name, // 平台名称,
        n_plat_type: type, // 平台形式(平台形式1、APP 2、公众号 3、网站 10、其他),
        c_plat_uname: obj.account, // 账号,
        c_plat_pwd: obj.password, // 密码,
        n_loan_amt: parseInt(obj.amount, 10), // 借款本金,
        n_loan_rate: parseInt(obj.rate, 10), // 年化利率%,
        n_already_repaid_amt: parseFloat(obj.repaid).toFixed(2), // 已还金额,
        n_to_repay_amt: parseFloat(obj.toRepay).toFixed(2), // 待还金额,
        t_loan_tm: obj.date1, // 借款日期,
        t_repay_tm: obj.date2, // 应还日期,
        c_loan_use: obj.reason, // 借款用途,
        l_evidence_upload_img: obj.pic1, // 关键证据证明款项图片,
        l_protocol_upload_img: obj.pic2, // 借款协议图片
        c_detail_id: obj.detailId, // 借款详情id,
      }],
      c_info_id: obj.id, // 借款信息id
    })
  },
}
