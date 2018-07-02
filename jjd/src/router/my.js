/**
 * Created by hq5544 on 16/7/23.
 */
import my from '../views/my/my'
import setRemarks from '../views/communication/setRemarks'
import creditReportDetail from '../views/my/creditReportDetail'
import borrowRecord from '../views/my/borrowRecord'
import lendRecord from '../views/my/lendRecord'
import guaranteeRecord from '../views/my/guaranteeRecord'
import overdueRecord from '../views/my/overdueRecord'
import reportedRecord from '../views/my/reportedRecord'
import telBillRecord from '../views/my/telBillRecord'
import consumptionRecord from '../views/my/consumptionRecord'
import callRecord from '../views/my/callRecord'
import creditReportSimpleMine from '../views/my/creditReportSimpleMine'
import certificate from '../views/my/certificate'

export default {
  // 我的
  '/my': {
    num: 51,
    name: 'my',
    title: '我的',
    component: my
  },
  // 设置备注
  '/setRemarks': {
    num: 52,
    name: 'setRemarks',
    title: '设置备注',
    component: setRemarks
  },
  // 信用报告详版
  '/creditReportDetail/:userId': {
    num: 53,
    name: 'creditReportDetail',
    title: '信用报告详细版',
    component: creditReportDetail
  },
  // 借入记录
  '/borrowRecord/:userId': {
    num: 54,
    name: 'borrowRecord',
    title: '信用报告-借入记录',
    component: borrowRecord
  },
  // 借出记录
  '/lendRecord/:userId': {
    num: 55,
    name: 'lendRecord',
    title: '信用报告-借出记录',
    component: lendRecord
  },
  // 担保记录
  '/guaranteeRecord/:userId': {
    num: 56,
    name: 'guaranteeRecord',
    title: '信用报告-担保记录',
    component: guaranteeRecord
  },
  // 逾期记录
  '/overdueRecord/:userId': {
    num: 57,
    name: 'overdueRecord',
    title: '信用报告-逾期记录',
    component: overdueRecord
  },
  // 被举报记录
  '/reportedRecord/:userId': {
    num: 58,
    name: 'reportedRecord',
    title: '信用报告-被举报记录',
    component: reportedRecord
  },
  // 话费记录
  '/telBillRecord/:userId': {
    num: 59,
    name: 'telBillRecord',
    title: '信用报告-话费记录',
    component: telBillRecord
  },
  // 消费记录
  '/consumptionRecord/:userId': {
    num: 60,
    name: 'consumptionRecord',
    title: '信用报告-消费记录',
    component: consumptionRecord
  },
  // 通话详情记录
  '/callRecord/:userId': {
    num: 61,
    name: 'callRecord',
    title: '信用报告-通话详情记录',
    component: callRecord
  },
  // 信用报告简版-我的
  '/creditReportSimpleMine/:userId': {
    num: 62,
    name: 'creditReportSimpleMine',
    title: '信用报告',
    component: creditReportSimpleMine
  },
// 易云章数字证书
  '/certificate/:id': {
    num: 138,
    name: 'certificate',
    title: '数字证书',
    component: certificate
  }
}
