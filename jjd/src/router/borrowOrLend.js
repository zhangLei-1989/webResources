/**
 * Created by hq5544 on 16/7/23.
 */
import myGuarantee from '../views/borrowOrLend/myGuarantee'
import myLend from '../views/borrowOrLend/myLend'
import myBorrow from '../views/borrowOrLend/myBorrow'

export default {
  // 我的担保
  '/myGuarantee': {
    num: 1,
    name: 'myGuarantee',
    title: '担保',
    component: myGuarantee
  },
  // 我的借出
  '/myLend': {
    num: 2,
    name: 'myLend',
    title: '借出',
    component: myLend
  },
  // 我的借入
  '/myBorrow': {
    num: 3,
    name: 'myBorrow',
    title: '借入',
    component: myBorrow
  }
}
