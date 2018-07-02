/**
 * Created by hq5544 on 16/3/26.
 */
import * as types from './mutation-types'

export const toggleLoading = ({ dispatch }, status) => {
  dispatch(types.TOGGLE_LOADING, status)
}
export const toggleWaiting = ({ dispatch }, status) => {
  dispatch(types.TOGGLE_WAITING, status)
}
export const changeTitle = ({ dispatch }, nextTitle) => {
  dispatch(types.CHANGE_TITLE, nextTitle)
  document.title = nextTitle
  const $iframe = document.createElement('iframe')
  $iframe.setAttribute('style', 'opacity: 0')
  const body = document.getElementsByTagName('body')[0]
  $iframe.src = `${document.location.protocol}//www.gushistory.com/jjd2/title.html`
  $iframe.addEventListener('load', () => {
    setTimeout(() => {
      $iframe.removeEventListener('load', null, false)
      body.removeChild($iframe)
    }, 0)
  }, false)
  body.appendChild($iframe)
  // 在 WKWebview 中会不需要 frame 来实现改变 title 了
}
export const showPopup = ({ dispatch }) => {
  dispatch(types.TOGGLE_POPUP, true)
}
export const hidePopup = ({ dispatch }) => {
  dispatch(types.TOGGLE_POPUP, false)
}
export const toggleHideBan = ({ dispatch }, ban) => {
  dispatch(types.TOGGLE_HIDE_BAN, ban)
}
export const settingPopup = ({ dispatch }, settings) => {
  dispatch(types.SETTING_POPUP, settings)
}
export const togglePullRefresh = ({ dispatch }, show) => {
  dispatch(types.TOGGLE_PULL_REFRESH, show)
}
export const setTempInfo = ({ dispatch }, temp) => {
  // 缓存表单信息
  dispatch(types.SET_TEMP_INFO, temp)
}
export const clearTempInfo = ({ dispatch }) => {
  // 清除表单信息
  dispatch(types.CLEAR_TEMP_INFO)
}
export const setCreditCenter = ({ dispatch }, creditCenter) => {
  // 设置信用中心状态
  dispatch(types.SET_CREDIT_CENTER, creditCenter)
}
export const setCurrentPage = ({ dispatch }, currentName = '', lastName) => {
  dispatch(types.SET_CURRENT_PAGE, currentName)
  dispatch(types.SET_LAST_PAGE, lastName)
}
export const setToken = ({ dispatch }, token) => {
  dispatch(types.SET_TOKEN, token)
  window.sessionStorage.token = token
}
export const setUserInfo = ({ dispatch }, info) => {
  dispatch(types.SET_USER_INFO, info)
  window.sessionStorage.userInfo = JSON.stringify(info)
  /* eslint-disable */
  if (info.userId) {
    window._vds.push(['setCS1', 'jjd_user_id', info.userId])
    if (info.n_borrow_cnt) window._vds.push(['setCS2', 'n_borrow_cnt', info.n_borrow_cnt])
    if (info.n_guarantee_cnt) window._vds.push(['setCS3', 'n_guarantee_cnt', info.n_guarantee_cnt])
    if (info.n_product_cnt) window._vds.push(['setCS4', 'n_product_cnt', info.n_product_cnt])
    if (info.n_lend_cnt) window._vds.push(['setCS5', 'n_lend_cnt', info.n_lend_cnt])
    window.zhuge.identify(info.userId, {
      name: info.nickname,
      weixin: info.openId,
      mobile: info.c_telephone,
      avatar: info.c_head
    })
  }
  try {
    window._JHsdk.setUid(info.userId)
  } catch (err) {
    try {
      window.jhd_params.jhd_uid = info.userId
    } catch (err2) {
      setTimeout(() => {
        try {
          window.jhd_params.jhd_uid = info.userId
          window._JHsdk.setUid(info.userId)
        } catch (err3) {
          window.console.error(err3)
        }
      }, 3000)
    }
  }
  /* eslint-enable */
  // if (window.raven && window.raven.captureException) {
  //   window.raven.setUserContext(info)
  // }
}
export const setCreditInfo = ({ dispatch }, creditinfo) => {
  dispatch(types.SET_CREDIT_INFO, creditinfo)
}
export const setAddress = ({ dispatch }, address) => {
  dispatch(types.SET_ADDRESS, address)
}
export const setFeedback = ({ dispatch }, feekback) => {
  dispatch(types.SET_FEEDBACK, feekback)
}
export const setToRegist = ({ dispatch }, toRegist) => {
  window.sessionStorage.toRegist = toRegist
  dispatch(types.SET_TO_REGIST, toRegist)
}
export const toggleShare = ({ dispatch }, share) => {
  dispatch(types.TOGGLE_SHARE, share)
}
export const toggleInitOk = ({ dispatch }, initOk) => {
  dispatch(types.TOGGLE_INIT_OK, initOk)
}
export const setTransitionMode = ({ dispatch }, mode) => {
  dispatch(types.SET_TRANSITION_MODE, mode)
}
export const toggleNeedRefresh = ({ dispatch }, needRefresh) => {
  dispatch(types.TOGGLE_NEED_REFRESH, needRefresh)
}
