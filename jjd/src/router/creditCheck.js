/**
 * Created by hq5544 on 16/7/23.
 */
import creditResult from '../views/creditCheck/creditResult'
import seekCredit from '../views/creditCheck/seekCredit'

export default {
  // 信用查询结果
  '/creditResult': {
    num: 25,
    name: 'creditResult',
    title: '逾期记录',
    component: creditResult
  },
  // 查信用
  '/seekCredit': {
    num: 26,
    name: 'seekCredit',
    title: '查信用',
    component: seekCredit
  }
}
