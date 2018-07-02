/**
 * Created by hq5544 on 16/4/6.
 */
import { ajaxJsonCredit, ajaxGetCredit } from '../tools/utils'

export default {
  // 提交运营商信息
  operator ({
    tel: name,
    password
  }) {
    const param = {
      name,
      password
    }
    return ajaxJsonCredit('jxl/grabMobileInfo', param)
  },
  operator2 (param) {
    return ajaxJsonCredit('jxl/grabMobileInfo', param)
  },
  // 查询抓取运营商结果
  loopOperator () {
    return ajaxGetCredit('jxl/queryMobileGrab')
  },
  // 提交运营商验证码
  operatorCode ({
                 code1: captcha1,
                 code2: captcha2,
                 type
                }) {
    return ajaxGetCredit('jxl/submitMobileCaptcha', {
      captcha1,
      captcha2,
      type,
    })
  },
  // 获取淘宝信息
  taobao (name, password) {
    const param = {
      name,
      password
    }
    return ajaxJsonCredit('jxl/grabTaoBaoInfo', param)
  },
  // 查询抓取淘宝结果
  loopTaobao () {
    return ajaxGetCredit('jxl/queryTaobaoGrab')
  },
  // 获取京东信息
  jingdong (name, password) {
    const param = {
      name,
      password
    }
    return ajaxJsonCredit('jxl/grabJingDongInfo', param)
  },
  // 查询抓取淘宝结果
  loopJingdong () {
    return ajaxGetCredit('jxl/queryJingdongGrab')
  },
  // 提交京东验证码
  jingdongCode (code) {
    const param = {
      captcha: code
    }
    return ajaxGetCredit('jxl/submitJingdongCaptcha', param)
  },
  getJxlList () {
    return ajaxGetCredit('jxl/getSupportDataSource')
  },
  // 跳过当前数据源
  skipDataSource () {
    return ajaxGetCredit('jxl/skipDataSource')
  },
  // 跳过当前运营商
  skipOperator (telephone) {
    const param = {
      telephone
    }
    return ajaxGetCredit('jxl/skipMobileAuth', param)
  }
}
