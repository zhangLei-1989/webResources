/**
 * Created by hq5544 on 16/7/23.
 */
import setPurpose from '../views/seekLoans/setPurpose'
import showPurpose from '../views/seekLoans/showPurpose'
import lendTo from '../views/seekLoans/lendTo'
import borrowDetail from '../views/seekLoans/borrowDetail'
import chooseGuarantor from '../views/seekLoans/chooseGuarantor'
import guarantorList from '../views/seekLoans/guarantorList'
import guarantee from '../views/seekLoans/guarantee'
import createBid from '../views/seekLoans/createBid'
import successShare from '../views/seekLoans/successShare'
import offLineLend from '../views/seekLoans/offLineLend'
import bidOnce from '../views/seekLoans/bidOnce'

export default {
  // 设置借款用途
  '/setPurpose/:type': {
    num: 80,
    name: 'setPurpose',
    title: '借款用途',
    component: setPurpose
  },
  // 查看补充说明
  '/showPurpose': {
    num: 81,
    name: 'showPurpose',
    title: '补充说明',
    component: showPurpose
  },
  // 出借给他
  '/lendTo/:id': {
    num: 82,
    name: 'lendTo',
    title: '借给TA',
    component: lendTo
  },
  // 出借给他，必须有担保人
  '/lendTo/:id/:must': {
    num: 82,
    name: 'lendTo',
    title: '借给TA',
    component: lendTo
  },
  // 借款详情
  '/borrowDetail/:firstPage/:id': {
    num: 83,
    name: 'borrowDetail',
    title: '借款详情',
    component: borrowDetail
  },
  // 选择担保人
  '/chooseGuarantor': {
    num: 84,
    name: 'chooseGuarantor',
    title: '全部担保人',
    component: chooseGuarantor
  },
  // 全部担保人
  '/guarantorList': {
    num: 85,
    name: 'guarantorList',
    title: '担保人列表',
    component: guarantorList
  },
  // 我的担保
  '/guarantee/:id/:lenderId': {
    num: 86,
    name: 'guarantee',
    title: '担保',
    component: guarantee
  },
  // 求借款
  '/createBid': {
    num: 87,
    name: 'createBid',
    title: '求借款',
    component: createBid
  },
  // 发布借款成功并分享
  '/successShare/:needGuarantor/:firstPage/:id': {
    // @needGuarantor 1: 需要担保人; 0: 不需要
    num: 88,
    name: 'successShare',
    title: '创建成功',
    component: successShare
  },
  // 线下出借
  '/offLineLend': {
    num: 89,
    name: 'offLineLend',
    title: '线下出借',
    component: offLineLend
  },
  // 分享的求借款, 第一次使用
  '/bidOnce/:type/:id': {
    // @type = lender / guarantor
    num: 90,
    name: 'bidOnce',
    title: '今借到',
    component: bidOnce
  }
}
