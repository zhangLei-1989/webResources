/**
 * Created by hq5544 on 16/4/6.
 */
import { ajaxJsonCreditWeb } from '../tools/utils'

export default {
  // 初始化浏览器容器
  init () {
    return ajaxJsonCreditWeb('prove/initXuexin')
  },
  // 学信网抓取
  info (type, username, password, code, tongduTokenId) {
    const param = {
      b_xueli_up_zhuanke: type,
      username,
      password,
      imgrc: code,
      tongduTokenId
    }
    return ajaxJsonCreditWeb('prove/xuexinInfo', param)
  },
  // 刷新验证码
  fresh () {
    return ajaxJsonCreditWeb('prove/getXuexinImg')
  }
}
