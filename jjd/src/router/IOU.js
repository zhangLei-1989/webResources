/**
 * Created by hq5544 on 16/7/23.
 */
import unconfirmIouDetail from '../views/IOU/unconfirmIouDetail'
import iouDetail from '../views/IOU/iouDetail'
import offlineRepay from '../views/IOU/offlineRepay'
import offlineRepayConfirm from '../views/IOU/offlineRepayConfirm'
import createIOU from '../views/IOU/createIOU'
import feedbackReport from '../views/IOU/feedbackReport'
import bilkReport from '../views/IOU/bilkReport'
import bilkTips from '../views/IOU/bilkTips'
import iouContent from '../views/IOU/iouContent'
import iouOnce from '../views/IOU/iouOnce'
import downloadEvidence from '../views/IOU/downloadEvidence'
import collection from '../views/IOU/collection'
import invalidIOU from '../views/IOU/invalidIOU'
import offlineRepayListBorrow from '../views/IOU/offlineRepayListBorrow'
import offlineRepayListLend from '../views/IOU/offlineRepayListLend'
import uncheckDetail from '../views/IOU/uncheckDetail'
import uncheckDetailLend from '../views/IOU/uncheckDetailLend'

export default {
  // 未确认借条详情
  '/unconfirmIouDetail/:id': {
    num: 35,
    name: 'unconfirmIouDetail',
    title: '借条详情',
    component: unconfirmIouDetail
  },
  // 已生成借条详情
  '/iouDetail/:id/:offlineLineConfirm': {
    // @type = lender(不能还款) / borrower / guarantor 现在已经去掉
    num: 36,
    name: 'iouDetail',
    title: '借条详情',
    component: iouDetail
  },
  // 已生成借条详情
  '/iouDetail/:id': {
    // @type = lender(不能还款) / borrower / guarantor 现在已经去掉
    num: 37,
    name: 'iouDetail',
    title: '借条详情',
    component: iouDetail
  },
  // 确认线下还款
  '/offlineRepay': {
    num: 38,
    name: 'offlineRepay',
    title: '线下还款',
    component: offlineRepay
  },
  '/offlineRepayListBorrow': {
    num: 500,
    name: 'offlineRepayListBorrow',
    title: '线下还款待确认（借款人）',
    component: offlineRepayListBorrow
  },
  '/uncheckDetail/:iouId': {
    num: 501,
    name: 'uncheckDetail',
    title: '还款详情(借款人)',
    component: uncheckDetail
  },
  '/uncheckDetailLend/:iouId': {
    num: 5011,
    name: 'uncheckDetailLend',
    title: '还款详情(出借人)',
    component: uncheckDetailLend
  },
  '/offlineRepayListLend': {
    num: 502,
    name: 'offlineRepayListLend',
    title: '线下还款待确认 (出借人)',
    component: offlineRepayListLend
  },
  // 还款通知
  '/offlineRepayConfirm/:id': {
    num: 39,
    name: 'offlineRepayConfirm',
    title: '还款通知',
    component: offlineRepayConfirm
  },
  // 还款通知
  '/offlineRepayConfirm/:id/:iouId': {
    num: 39,
    name: 'offlineRepayConfirm',
    title: '还款通知',
    component: offlineRepayConfirm
  },
  // 补借条
  '/createIOU/:type': {
    // @type = lender / borrower
    num: 40,
    name: 'createIOU',
    title: '补借条',
    component: createIOU
  },
  // 举报反馈
  '/feedbackReport/:id': {
    num: 41,
    name: 'feedbackReport',
    title: '举报反馈',
    component: feedbackReport
  },
  // 违规举报
  '/bilkReport/:id': {
    num: 42,
    name: 'bilkReport',
    title: '违约举报',
    component: bilkReport
  },
  // 裸条举报
  '/bilkReport/:id/:luotiao': {
    num: 43,
    name: 'bilkReport',
    title: '裸条举报',
    component: bilkReport
  },
  // 违规举报规则说明
  '/bilkTips': {
    num: 44,
    name: 'bilkTips',
    title: '处理规则',
    component: bilkTips
  },
  // 借条内容
  '/iouContent/:id': {
    num: 45,
    name: 'iouContent',
    title: '借条内容',
    component: iouContent
  },
  // 分享的借条, 第一次使用
  '/iouOnce/:id': {
    num: 46,
    name: 'iouOnce',
    title: '今借到',
    component: iouOnce
  },
  // 下载证据
  '/downloadEvidence/:id': {
    num: 47,
    name: 'downloadEvidence',
    title: '下载证据',
    component: downloadEvidence
  },
  // 催收简介
  '/collection/:days/:id': {
    num: 48,
    name: 'collection',
    title: '催收进度',
    component: collection
  },
  // 借条被驳回
  '/invalidIOU/:type': {
    num: 49,
    name: 'invalidIOU',
    title: '今借到',
    component: invalidIOU
  },
  // 404
  '/404': {
    num: 50,
    name: '404',
    title: '页面不存在',
    component: invalidIOU
  }
}
