/**
 * Created by hq5544 on 16/7/23.
 */
import toCash from '../views/wallet/toCash'
import toCharge from '../views/wallet/toCharge'
import myWallet from '../views/wallet/myWallet'
import cashSuccess from '../views/wallet/cashSuccess'
import rechargeSuccess from '../views/wallet/rechargeSuccess'

export default {
  // 提现
  '/toCash': {
    num: 132,
    name: 'toCash',
    title: '提现',
    component: toCash
  },
  // 提现
  '/toCash/:id': {
    num: 133,
    name: 'toCash',
    title: '提现',
    component: toCash
  },
  // 充值
  '/toCharge': {
    num: 134,
    name: 'toCharge',
    title: '充值',
    component: toCharge
  },
  // 充值
  '/toCharge/:id': {
    num: 135,
    name: 'toCharge',
    title: '充值',
    component: toCharge
  },
  // 我的钱包
  '/myWallet': {
    num: 136,
    name: 'myWallet',
    title: '钱包',
    component: myWallet
  },
  // 充值成功详情页
  '/rechargeSuccess': {
    name: 'rechargeSuccess',
    title: '充值成功',
    component: rechargeSuccess,
  },
  // 提现页面详情
  '/cashSuccess': {
    name: 'cashSuccess',
    title: '提现结果',
    component: cashSuccess,
  }
}
