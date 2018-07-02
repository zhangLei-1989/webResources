/**
 * Created by hq5544 on 16/4/6.
 */
import {ajaxGet} from '../tools/utils'

export default {
  // 获取 wx 配置权限信息
  signURL () {
    return ajaxGet('user/signURL')
  }
}
