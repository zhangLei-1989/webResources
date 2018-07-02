/**
 * Created by hq5544 on 16/3/26.
 */
const appid = 'wx27d28c9426c63d08'

/* eslint-disable max-len */
const config = {
  appid,
  //是否是微信 debug 模式
  debug: false,
  // 接口基础路径
  interfaceBase: 'http://test.aizhantai.com/jjdApi_pre',
  interfaceCredit: 'http://test.aizhantai.com/credit_pre',
  interfaceCreditWeb: 'http://testdata.aizhantai.com/credit-web-pre',
  // 仅仅是分享的回调url时会使用
  domain: 'http://test.aizhantai.com/jjd2/pre/index.html',
  sharePrefix: 'https://open.weixin.qq.com/connect/oauth2/authorize' +
  `?appid=${appid}&redirect_uri=`,
  shareSuffix: '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
  // 分享的图片
  shareLogo: 'http://7xnmj7.com1.z0.glb.clouddn.com/shareLogo.png',
  shareBid: 'http://7xnmj7.com1.z0.glb.clouddn.com/sharejiekuan.png',
  shareIou: 'http://7xnmj7.com1.z0.glb.clouddn.com/sharejietiao.png',
  // 七牛图片前缀
  qiniuUrl: 'http://oe5gh0o9c.bkt.clouddn.com/',
  creditQiniuUrl: 'http://oe5gh0o9c.bkt.clouddn.com/'
}
/* eslint-enable max-len */

export default config
