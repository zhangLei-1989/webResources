/**
 * Created by hq5544 on 16/7/23.
 */
import index from '../views/index/index'
import regist1 from '../views/index/regist1'
import regist2 from '../views/index/regist2'
import reRegist from '../views/index/reRegist'
import indexBid from '../views/index/indexBid'
import indexProd from '../views/index/indexProd'

export default {
  '/index': {
    num: 30,
    name: 'bid',
    title: '今借到',
    // 是否下拉刷新
    component: index,
    subRoutes: {
      // 借款标的
      '/bid': {
        num: 30,
        name: 'bid',
        component: indexBid
      },
      // 贷款产品
      '/prod': {
        num: 31,
        name: 'prod',
        component: indexProd
      }
    }
  },
  // 注册第一步
  '/regist1': {
    num: 32,
    name: 'regist1',
    title: '注册',
    component: regist1
  },
  // 注册第二步
  '/regist2/:tel': {
    num: 33,
    name: 'regist2',
    title: '注册',
    component: regist2
  },
  // 再次注册
  '/reRegist/:tel/:name/:token': {
    num: 34,
    name: 'reRegist',
    title: '注册',
    component: reRegist
  }
}
