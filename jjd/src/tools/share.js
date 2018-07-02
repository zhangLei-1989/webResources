/**
 * Created by hq5544 on 16/8/10.
 */
import store from '../store/store'
import { toggleShare } from '../store/actions'

function combination (originalUrl) {
  return window.$config.sharePrefix
    + encodeURIComponent(originalUrl)
    + window.$config.shareSuffix
}

/* eslint-disable max-len */
export const normal = () => {
  toggleShare(store, 'index')
  window.wx.ready(() => {
    window.wx.onMenuShareTimeline({
      title: '今借到-国内领先的网络借条管理平台',
      link: combination(
        `${window.$config.domain}?fromType=timeLine&fromUser=${store.state.userInfo.userId}`
      ),
      imgUrl: window.$config.shareLogo,
      success () {
        window._JHsdk.action({
          event: 'hx_ac5',
          params: {
            type: 'timeLine',
            id: 'index',
          }
        })
      },
    })
    window.wx.onMenuShareAppMessage({
      title: '今借到-国内领先的网络借条管理平台',
      desc: '今借到是人人信公司推出的国内领先的网络借条管理平台，采用借贷双方实名模式，借款人可以为平台内借款行为打网络借条，也可以在平台上直接向朋友发起借款',
      link: combination(
        `${window.$config.domain}?fromType=appMessage&fromUser=${store.state.userInfo.userId}`
      ),
      imgUrl: window.$config.shareLogo,
      success () {
        window._JHsdk.action({
          event: 'hx_ac5',
          params: {
            type: 'appMessage',
            id: 'index',
          }
        })
      },
    })
  })
}
/* eslint-enable max-len */

const timeLine = ({
  title,
  link,
  imgUrl,
  id,
}) => {
  window.wx.ready(() => {
    window.wx.onMenuShareTimeline({
      title,
      link: combination(
        `${link}&fromType=timeLine&fromUser=${store.state.userInfo.userId}`
      ),
      imgUrl,
      success () {
        window._JHsdk.action({
          event: 'hx_ac5',
          params: {
            type: 'timeLine',
            id,
          }
        })
      },
    })
  })
}

const appMessage = ({
  title,
  desc,
  link,
  imgUrl,
  id,
}) => {
  window.wx.ready(() => {
    window.wx.onMenuShareAppMessage({
      title,
      desc,
      link: combination(
        `${link}&fromType=appMessage&fromUser=${store.state.userInfo.userId}`
      ),
      imgUrl,
      success () {
        window._JHsdk.action({
          event: 'hx_ac5',
          params: {
            type: 'appMessage',
            id,
          }
        })
      },
    })
  })
}

export const shareProd = ({
  amount,
  rate,
  timeLength,
  link,
  id,
}) => {
  toggleShare(store, 'prod')
  timeLine({
    title: `我在今借到放款，${amount}元，${rate}%，${timeLength}`,
    link,
    imgUrl: window.$config.shareLogo,
    id,
  })
  appMessage({
    title: '我在今借到放款，快来申请吧',
    desc: `金额：${amount}元，时长：${timeLength}，利率：${rate}%`,
    link,
    imgUrl: window.$config.shareLogo,
    id,
  })
}

export const shareIou = ({
  amount,
  rate,
  reason,
  link,
  id,
}) => {
  toggleShare(store, 'iou')
  appMessage({
    title: '我在今借到给你打了一张借条，快来确认吧~',
    desc: `金额：${amount}元，利率：${rate}%，用途：${reason}`,
    link,
    imgUrl: window.$config.shareLogo,
    id,
  })
}

export const shareBid = ({
  amount,
  rate,
  timeLength,
  reason,
  link,
  isLender,
  id,
}) => {
  toggleShare(store, 'bid')
  let title = ''
  if (isLender) {
    title = '快来帮我筹款吧'
  } else {
    title = '快来帮我作担保吧'
  }
  timeLine({
    title: `我在今借到发起了一个求借款，${amount}元，${timeLength}，${rate}%，${reason}`,
    link,
    imgUrl: window.$config.shareLogo,
    id,
  })
  appMessage({
    title: `我在今借到发起了一个求借款，${title}~`,
    desc: `金额：${amount}元，时长：${timeLength}，利率：${rate}%，用途：${reason}`,
    link,
    imgUrl: window.$config.shareLogo,
    id,
  })
}

export const shareJjjh = ({
                            amount,
                            rate,
                            timeLength,
                            link,
                            id,
                          }) => {
  toggleShare(store, 'jjjh')
  appMessage({
    title: '我在今借到申请了今济计划，快来帮我作担保吧~',
    desc: `金额：${amount}元，利率：${rate}%，时长：${timeLength}年`,
    link,
    imgUrl: window.$config.shareLogo,
    id,
  })
}
