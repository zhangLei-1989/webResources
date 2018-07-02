/**
 * Created by hq5544 on 16/7/23.
 */
import inList from '../views/inOut/inList'
import outList from '../views/inOut/outList'
import payDetail from '../views/inOut/payDetail'

export default {
  // 待收列表
  '/inList': {
    num: 27,
    name: 'inList',
    title: '待收',
    component: inList
  },
  // 待还列表
  '/outList': {
    num: 28,
    name: 'outList',
    title: '待还',
    component: outList
  },
  // 付款详情
  '/payDetail': {
    num: 29,
    name: 'payDetail',
    title: '付款详情',
    component: payDetail
  }
}
