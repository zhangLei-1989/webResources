/**
 * Created by hq5544 on 16/4/6.
 */
import { ajaxJsonCreditWeb } from '../tools/utils'

export default {
  // 初始化浏览器容器
  init () {
    return ajaxJsonCreditWeb('prove/initZhengxin')
  },
  // 学信网抓取
  info ({
    username,
    password: pwd,
    picCode: imgrcCode,
    userCode: idCode
  }) {
    return ajaxJsonCreditWeb('prove/zhengxinInfo', {
      pwd,
      idCode,
      username,
      imgrcCode
    })
  },
  // 刷新验证码
  fresh () {
    return ajaxJsonCreditWeb('prove/getZhengxinImg')
  }
}
