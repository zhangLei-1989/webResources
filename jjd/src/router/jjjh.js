import familyInfo from '../views/jjjh/familyInfo.vue'
import jjjh from '../views/jjjh/index'
import schoolInfo from '../views/jjjh/schoolInfo'
import eventDescription from '../views/jjjh/eventDescription'
import jjjhBorrowInfoList from '../views/jjjh/jjjhBorrowInfoList'
import jjjhBorrowInfo from '../views/jjjh/jjjhBorrowInfo'
import handleMyJjjh from '../views/jjjh/handleMyJjjh.vue'
import guaranteeAgreement from '../views/jjjh/guaranteeAgreement.vue'
import jjjhDownloadPage from '../views/jjjh/jjjhDownloadPage.vue'
import agreementDetail from '../views/jjjh/agreementDetail.vue'
import showAttention from '../views/jjjh/showAttention.vue'
import guaranteeJjjh from '../views/jjjh/guaranteeJjjh.vue'
import guaranteeConfirm from '../views/jjjh/guaranteeConfirm.vue'
import jjjhGuaranteeAgreementDoc from '../views/jjjh/jjjhGuaranteeAgreementDoc.vue'
import dcxyDoc from '../views/jjjh/dcxyDoc.vue'
import jjmdxyDoc from '../views/jjjh/jjmdxy.vue'
import blzcczxyDoc from '../views/jjjh/blzcczxyDoc.vue'
import jjjhClosed from '../views/jjjh/jjjhClosed.vue'

export default {
  // 今济计划
  '/jjjh': {
    num: 143,
    name: 'jjjh',
    title: '今济计划',
    component: jjjh
  },
  // 事件描述
  '/eventDescription': {
    num: 145,
    name: 'eventDescription',
    title: '事件描述',
    component: eventDescription
  },
  // 今济计划借款信息列表
  '/jjjhBorrowInfoList': {
    num: 146,
    name: 'jjjhBorrowInfoList',
    title: '借款详情',
    component: jjjhBorrowInfoList
  },
  // 今济计划借款信息
  '/jjjhBorrowInfo/:id/:count/:detailId': {
    num: 146,
    name: 'jjjhBorrowInfo',
    title: '借款详情',
    component: jjjhBorrowInfo
  },
  '/schoolInfo': {
    component: schoolInfo,
    title: '学校信息',
    name: 'schoolInfo',
  },
  '/familyInfo': {
    component: familyInfo,
    title: '家庭信息',
    name: 'familyInfo',
  },
  '/handleMyJjjh': {
    component: handleMyJjjh,
    num: 188,
    title: '今济计划',
    name: 'handleMyJjjh',
  },
  '/guaranteeAgreement': {
    component: guaranteeAgreement,
    num: 189,
    title: '担保协议',
    name: 'guaranteeAgreement',
  },
  '/jjjhDownloadPage': {
    component: jjjhDownloadPage,
    num: 190,
    title: '下载协议',
    name: 'jjjhDownloadPage'
  },
  '/agreementDetail/:item': {
    component: agreementDetail,
    num: 191,
    title: '协议详情',
    name: 'agreementDetail',
  },
  '/showAttention': {
    component: showAttention,
    num: 192,
    title: '邮寄和注意事项',
    name: 'showAttention'
  },
  '/guaranteeJjjh/:id': {
    component: guaranteeJjjh,
    num: 193,
    title: '今借到',
    name: 'guaranteeJjjh',
  },
  '/guaranteeConfirm/:id': {
    component: guaranteeConfirm,
    num: 194,
    title: '作担保',
    name: 'guaranteeConfirm',
  },
  '/jjjhGuaranteeAgreementDoc/:id': {
    component: jjjhGuaranteeAgreementDoc,
    num: 195,
    title: '担保协议',
    name: 'jjjhGuaranteeAgreementDoc',
  },
  '/dcxyDoc': {
    component: dcxyDoc,
    num: 196,
    title: '借款协议',
    name: 'dcxyDoc'
  },
  '/jjmdxyDoc': {
    component: jjmdxyDoc,
    num: 197,
    title: '今济名单合作协议',
    name: 'jjmdxyDoc'
  },
  '/blzcczxyDoc': {
    component: blzcczxyDoc,
    num: 198,
    title: '不良资产处置合作协议',
    name: 'blzcczxyDoc',
  },
  '/jjjhClosed': {
    component: jjjhClosed,
    num: 199,
    title: '标的到期已关闭',
    name: jjjhClosed,
  },
}
