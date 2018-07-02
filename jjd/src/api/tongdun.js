/**
 * Created by hq5544 on 16/4/6.
 */
import { guid } from '../tools/utils'

export default {
  // 同盾
  /* eslint-disable no-underscore-dangle */
  getToken () {
    const tokenId = window.sessionStorage.tongdunTokenId || guid()
    window.sessionStorage.tongdunTokenId = tokenId
    window._fmOpt = {
      partner: 'jinjiedao',
      appName: 'jinjiedao_weixin',
      token: tokenId
    }
    const cimg = new Image(1, 1)
    cimg.onload = () => {
      window._fmOpt.imgLoaded = true
    }
    cimg.src = 'https://fp.fraudmetrix.cn/fp/clear.png' +
      '?partnerCode=jinjiedao&appName=' +
      `jinjiedao_weixin&tokenId=${window._fmOpt.token}`
    const fm = document.createElement('script')
    fm.type = 'text/javascript'
    fm.async = true
    fm.src =
      `${(document.location.protocol ===
      'https:' ? 'https://' : 'http://')}` +
      'static.fraudmetrix.cn/fm.js' +
      `?ver=0.1&t=${(new Date().getTime() / 3600000).toFixed(0)}`
    const s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(fm, s)
    return tokenId
  }
  /* eslint-enable no-underscore-dangle */
}
