/**
 * Created by hq5544 on 16/3/26.
 */
const appid = 'wx27d28c9426c63d08'

/* eslint-disable max-len */
const config = {
  appid,
  // 是否是微信 debug 模式
  debug: false,
  // 接口基础路径
  interfaceBase: 'http://ceshi.gushistory.com/jjdApi',
  interfaceCredit: 'http://ceshi.gushistory.com/credit',
  interfaceCreditWeb: 'http://ceshi.gushistory.com/credit-web',
  // 仅仅是分享的回调url时会使用
  domain: 'http://ceshi.gushistory.com/jjd2/dev/index.html',
  sharePrefix: 'https://open.weixin.qq.com/connect/oauth2/authorize' +
  `?appid=${appid}&redirect_uri=`,
  shareSuffix: '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
  // 分享的图片
  shareLogo: 'http://7xnmj7.com1.z0.glb.clouddn.com/shareLogo.png',
  shareBid: 'http://7xnmj7.com1.z0.glb.clouddn.com/sharejiekuan.png',
  shareIou: 'http://7xnmj7.com1.z0.glb.clouddn.com/sharejietiao.png',
  // 七牛图片前缀
  qiniuUrl: 'http://7xo1jz.com2.z0.glb.qiniucdn.com/',
  creditQiniuUrl: 'http://7xo1jz.com2.z0.glb.qiniucdn.com/'
}
/* eslint-enable max-len */

export default config
