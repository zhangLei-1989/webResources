/**
 * Created by hq5544 on 16/4/6.
 */
import { ajaxJson } from '../tools/utils'

export default {
  // 获取用户的 ca 信息
  getCertInfo (userId) {
    return ajaxJson('ecloudSign/getCertInfo', { userId })
  }
}
