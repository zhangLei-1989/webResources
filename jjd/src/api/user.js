/**
 * Created by hq5544 on 16/4/6.
 */
import { ajaxJson, ajaxGet } from '../tools/utils'
import { setTempInfo } from '../store/actions'
import store from '../store/store'

export default {
  // 初始化
  init (code) {
    return ajaxGet('user/init', {
      code
    }, true)
  },
  // 账户信息
  getUserAccount () {
    return ajaxGet('userAccount/getUserAccount')
  },
  // 获取注册短信验证码
  getTelCodeToRegister ({
    tel,
    openId
  }) {
    return ajaxGet('user/getTelCodeToRegister', {
      telephone: tel,
      openId
    }, true)
  },
  // 获取注册语音验证码
  getVoiceCodeToRegister ({
    tel,
    openId
  }) {
    return ajaxGet('user/getVoiceCodeToRegister', {
      telephone: tel,
      openId
    }, true)
  },
  // 获取新手机号验证码
  getTelCodeToModifyTel (telephone) {
    return ajaxGet('user/getTelCodeToModifyTel', {
      telephone
    })
  },
  // 注册
  regist ({
    tel,
    code,
    openId,
    unionId,
    userIcon
  }) {
    return ajaxJson('user/register', {
      telephone: tel,
      mobileCode: code,
      openId,
      unionId,
      headimgurl: userIcon
    }, true)
  },
  // 再次注册
  reRegist ({
    tel,
    code,
    openId,
    unionId,
    userIcon,
    bankCard,
    idCard,
    token
  }) {
    return ajaxJson('user/reRegister', {
      telephone: tel,
      mobileCode: code,
      openId,
      unionId,
      headimgurl: userIcon,
      c_id_card_no: idCard,
      c_bank_card: bankCard,
      token
    }, true)
  },
  // 更改密码前验证交易密码
  checkBeforeModifyTel (password) {
    return ajaxGet('user/checkBeforeModifyTel', {
      password
    })
  },
  // 更换手机号码
  modifyTel ({
    tel,
    code
  }) {
    return ajaxJson('user/modifyTel', {
      telephone: tel,
      mobileCode: code
    })
  },
  // 检查身份证和银行卡号
  checkIdcardAndBankcard ({
    name,
    idcard,
    bankcard
  }) {
    return ajaxJson('user/checkBeforeModifyPayPass', {
      c_name: name, // 用户名
      c_idcard_no: idcard, // 身份证号
      c_bank_account: bankcard // 银行卡号
    })
  },
  // 获取更改交易密码验证码
  getTelCodeToModifyPwd () {
    return ajaxGet('user/getTelCodeToModifyPwd')
  },
  // 验证更改交易密码验证码
  checkModifyPayPwdCode (code) {
    return ajaxGet('user/checkSMSCodeBeforeModifyPayPass', {
      mobileCode: code
    })
  },
  // 设置交易密码
  addPayPassword (pwd) {
    return ajaxGet('user/addPayPassword', {
      password: pwd
    })
  },
  // 修改交易密码
  modifyPayPassword ({
    pwd: new_pwd,
    code: mobileCode
  }) {
    return ajaxJson('user/modifyPayPassword', {
      new_pwd,
      mobileCode
    })
  },
  // 微信 url 签名
  signURL () {
    return ajaxGet('wx/signURL', {}, true)
  },
  // 上链接转短连接
  long2short (url) {
    return ajaxJson('wx/long2short', {
      long_ur: url
    }, true)
  },
  // 缓存数据
  saveCache (json) {
    const jsonParam = {}
    const cache = store.state.temp.cache
    Object.keys(cache).forEach((ele) => {
      jsonParam[ele] = cache[ele]
    })
    const param = Object.assign({}, jsonParam, json)
    setTempInfo(store, {
      cache: param
    })
    window.sessionStorage.cache = JSON.stringify(param)
    return ajaxJson('user/saveCache', param)
  },
}
