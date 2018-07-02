/**
 * Created by hq5544 on 16/7/23.
 */
import verifyPayPwd from '../views/settings/verifyPayPwd'
import modifyTel from '../views/settings/modifyTel'
import verifyCode from '../views/settings/verifyCode'
import verifyTelCode from '../views/settings/verifyTelCode'
import verifyIdcard from '../views/settings/verifyIdcard'
import verifyIdcardBankcard from '../views/settings/verifyIdcardBankcard'
import bindBankCard from '../views/settings/bindBankCard'
import bankCardDetail from '../views/settings/bankCardDetail'
import modifyBankTel from '../views/settings/modifyBankTel'
import setting from '../views/settings/setting'
import verifyPassword from '../views/settings/verifyPassword'
import modifyPayPwd from '../views/settings/modifyPayPwd'
import addPayPwd from '../views/settings/addPayPwd'
import preInputPayPwd from '../views/settings/preInputPayPwd'
import myBankCards from '../views/settings/myBankCards'
import tutorial from '../views/settings/tutorial'

export default {
  // 验证交易密码
  '/verifyPayPwd': {
    num: 91,
    name: 'verifyPayPwd',
    title: '交易密码',
    component: verifyPayPwd
  },
  // 更换手机号
  '/modifyTel': {
    num: 92,
    name: 'modifyTel',
    title: '更换手机号',
    component: modifyTel
  },
  // 验证手机验证码
  '/verifyCode': {
    num: 93,
    name: 'verifyCode',
    title: '身份验证',
    component: verifyCode
  },
  // 验证手机号和验证码
  '/verifyTel&Code': {
    num: 94,
    name: 'verifyTel&Code',
    title: '更换手机号',
    component: verifyTelCode
  },
  // 验证身份证
  '/verifyIdcard': {
    num: 95,
    name: 'verifyIdcard',
    title: '身份验证',
    component: verifyIdcard
  },
  // 验证身份证和银行卡
  '/verifyIdcard&Bankcard': {
    num: 96,
    name: 'verifyIdcard&Bankcard',
    title: '身份验证',
    component: verifyIdcardBankcard
  },
  // 绑卡
  '/bindBankCard/:pwdOk/:creditOk': {
    num: 97,
    name: 'bindBankCard',
    title: '绑定银行卡',
    component: bindBankCard
  },
  // 绑卡
  '/bankCardDetail/:id/:name/:number': {
    num: 98,
    name: 'bankCardDetail',
    title: '银行卡详情',
    component: bankCardDetail
  },
  // 更换预留手机号
  '/modifyBankTel/:id': {
    num: 99,
    name: 'modifyBankTel',
    title: '更换预留手机号',
    component: modifyBankTel
  },
  // 重新绑卡
  '/rebindBankCard/:rebind': {
    num: 100,
    name: 'bindBankCard',
    title: '绑定银行卡',
    component: bindBankCard
  },
  // 今济计划绑卡
  '/bindBankCard/:jjjh': {
    num: 100,
    name: 'bindBankCard',
    title: '绑定银行卡',
    component: bindBankCard
  },
  // 设置
  '/setting': {
    num: 101,
    name: 'setting',
    title: '设置',
    component: setting
  },
  // 验证密码
  '/verifyPassword': {
    num: 102,
    name: 'verifyPassword',
    title: '设置',
    component: verifyPassword
  },
  // 修改交易密码
  '/modifyPayPwd/:pre': {
    // @pre: 第一次输入的密码
    num: 103,
    name: 'modifyPayPwd',
    title: '确认交易密码',
    component: modifyPayPwd
  },
  // 设置交易密码
  '/addPayPwd/:pre': {
    // @pre: 第一次输入的密码
    num: 104,
    name: 'addPayPwd',
    title: '确认交易密码',
    component: addPayPwd
  },
  // 第一次输入交易密码
  '/preInputPayPwd/:type': {
    // @type = add / modify
    num: 105,
    name: 'preInputPayPwd',
    title: '请输入交易密码',
    component: preInputPayPwd
  },
  // 我的全部银行卡列表
  '/myBankCards': {
    num: 106,
    name: 'myBankCards',
    title: '我的银行卡',
    component: myBankCards
  },
  // 放贷款全攻略
  '/tutorial': {
    num: 107,
    name: 'tutorial',
    title: '出借全攻略',
    component: tutorial
  }
}
