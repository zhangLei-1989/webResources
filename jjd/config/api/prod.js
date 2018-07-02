/**
 * Created by hq5544 on 16/3/26.
 */
const appid = 'wx8965c39e0fdf11a0'

/* eslint-disable max-len */
const config = {
  appid,
  // 是否是微信 debug 模式
  debug: false,
  // 接口基础路径
  interfaceBase: 'http://www.gushistory.com/jjdApi',
  interfaceCredit: 'http://www.gushistory.com/credit',
  interfaceCreditWeb: 'http://www.gushistory.com/credit-web',
  // 仅仅是分享的回调url时会使用
  domain: 'http://www.gushistory.com/jjd2/index.html',
  sharePrefix: 'https://open.weixin.qq.com/connect/oauth2/authorize' +
  `?appid=${appid}&redirect_uri=`,
  shareSuffix: '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
  // 分享的图片
  shareLogo: 'http://7xnmj7.com1.z0.glb.clouddn.com/shareLogo.png',
  shareBid: 'http://7xnmj7.com1.z0.glb.clouddn.com/sharejiekuan.png',
  shareIou: 'http://7xnmj7.com1.z0.glb.clouddn.com/sharejietiao.png',
  // 七牛图片前缀
  qiniuUrl: 'http://7xrurr.com1.z0.glb.clouddn.com/',
  creditQiniuUrl: 'http://oe6gtsme9.bkt.clouddn.com/'
}
/* eslint-enable max-len */

export default config
