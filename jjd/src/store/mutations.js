/**
 * Created by hq5544 on 16/3/26.
 */
import {
  CHANGE_TITLE,
  TOGGLE_POPUP,
  SETTING_POPUP,
  TOGGLE_PULL_REFRESH,
  TOGGLE_LOADING,
  TOGGLE_HIDE_BAN,
  SET_TEMP_INFO,
  CLEAR_TEMP_INFO,
  SET_TOKEN,
  SET_USER_INFO,
  SET_CREDIT_INFO,
  SET_CREDIT_CENTER,
  SET_CURRENT_PAGE,
  SET_ADDRESS,
  TOGGLE_WAITING,
  SET_FEEDBACK,
  SET_TO_REGIST,
  TOGGLE_SHARE,
  TOGGLE_INIT_OK,
  SET_LAST_PAGE,
  SET_TRANSITION_MODE,
  TOGGLE_NEED_REFRESH
} from './mutation-types'

/* eslint-disable no-param-reassign */
const mutations = {
  [TOGGLE_LOADING] (state, status) {
    state.loading = status
  },
  [TOGGLE_WAITING] (state, status) {
    state.waiting = status
  },
  [CHANGE_TITLE] (state, title) {
    state.title = title
  },
  [TOGGLE_PULL_REFRESH] (state, title) {
    state.footerShow = title
  },
  [TOGGLE_POPUP] (state, show) {
    state.popupShow = show
  },
  [TOGGLE_HIDE_BAN] (state, ban) {
    state.popupHideBan = ban
  },
  [SETTING_POPUP] (state, settings) {
    const defaultList = [
      {
        text: '知道了'
      }
    ]
    state.popupSettings.title = settings.title
    state.popupSettings.content = settings.content || '发生了一点小错误哦'
    state.popupSettings.btnList = settings.btnList || defaultList
    state.popupSettings.className = settings.className || ''
  },
  [SET_TEMP_INFO] (state, temp) {
    const keys = Object.keys(temp)
    if (Object.keys(temp[keys[0]]).length > 0) {
      Object.assign(state.temp, temp)
    } else {
      state.temp[keys[0]] = {}
    }
  },
  [CLEAR_TEMP_INFO] (state) {
    state.temp.modifyPayPwd = {}
    state.temp.offlineRepay = {}
    state.temp.guarantorList = {}
    state.temp.showPurpose = {}
    state.temp.baseInfo = {}
    state.temp.seekCredit = {}
    state.temp.buy = {}
    state.temp.chooseFriends = {}
    state.temp.guarantee = {}
    state.temp.houseInfo = {}
    state.temp.carInfo = {}
    state.temp.incomeInfo = {}
    state.temp.jobInfo = {}
    state.temp.addNewPro = {}
    Object.assign(state.temp.createIOU, {
      picUrls: [],
      uploadUrls: []
    })
    Object.assign(state.temp.createBid, {
      picUrls: [],
      uploadUrls: []
    })
    Object.assign(state.temp.buy, {
      picUrls: [],
      uploadUrls: []
    })
  },
  [SET_CREDIT_CENTER] (state, creditCenter) {
    Object.assign(state.creditCenter, creditCenter)
  },
  [SET_CURRENT_PAGE] (state, name) {
    state.currentPage = name
  },
  [SET_LAST_PAGE] (state, name) {
    if (name) {
      state.transition.pageList.push(name)
    } else {
      state.transition.pageList.pop()
    }
  },
  [SET_TOKEN] (state, token) {
    state.token = token
  },
  [SET_TO_REGIST] (state, toRegist) {
    state.toRegist = toRegist
  },
  [SET_USER_INFO] (state, info) {
    Object.assign(state.userInfo, info)
  },
  [SET_CREDIT_INFO] (state, creditinfo) {
    Object.assign(state.creditInfo, creditinfo)
  },
  [SET_ADDRESS] (state, address) {
    Object.assign(state.address, address)
  },
  [SET_FEEDBACK] (state, feedback) {
    Object.assign(state.feedbackSettings, feedback)
  },
  [TOGGLE_SHARE] (state, share) {
    state.currentShare = share
  },
  [TOGGLE_INIT_OK] (state, initOk) {
    state.initOk = initOk
  },
  [SET_TRANSITION_MODE] (state, mode) {
    state.transition.transitionMode = mode
  },
  [TOGGLE_NEED_REFRESH] (state, needRefresh) {
    state.needRefresh = needRefresh
  }
}
/* eslint-enable no-param-reassign */
export default mutations
