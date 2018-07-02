/**
 * Created by hq5544 on 16/3/30.
 * 全部的工具函数
 */
import Vue from 'vue'
import Router from '../router/router'
import store from '../store/store'
import {
  showPopup,
  settingPopup,
  toggleLoading,
  toggleHideBan,
  setFeedback,
  setToRegist
} from '../store/actions'

const utils = {
  lastAjax: '',
  obj2parms (obj) {
    let params = ''
    Object.keys(obj).forEach((item) => {
      params += `&${item}=${obj[item]}`
    })
    if (params) {
      params = `?${params}`.replace(/&/, '')
    }
    return params
  },
  ajax (url, param = {}, ignoreToken, options = {}, method = 'POST') {
    // ajax 的封装
//        if (utils.lastAjax === url) {
//            return new Promise((resolve, reject) => {
//                reject(`${url}: duplicate request! `)
//            })
//        }
    utils.lastAjax = url

    let params = {}
    let urlParam = ''
    let body = {}
    let methodText = ''
    let args = []

    if (!ignoreToken) {
      if (!store.state.token || store.state.token === 'undefined') {
        return new Promise((resolve, reject) => {
          reject(`${url}: no token! `)
        }).catch((err) => {
          window.console.log(err)
        })
      }
    }
    const token = store.state.token
    if (token && token !== 'undefined') {
      params = {
        token
      }
    }

    const options2 = Object.assign({
      timeout: 0,
      options
    })

    if (method === 'GET') {
      params = Object.assign(params, param)
      methodText = 'get'
      urlParam = utils.obj2parms(params)
      args = [url + urlParam, options2]
    } else {
      body = param
      methodText = 'post'
      urlParam = utils.obj2parms(params)
      args = [url + urlParam, body, options2]
    }

    return new Promise((resolve, reject) => {
      if (!options.ignoreLoading) {
        toggleLoading(store, true)
      }
      const cycle = (n) => {
        Vue.http[methodText](...args).then((response) => {
          utils.lastAjax = ''
          if (!options.ignoreLoading) {
            toggleLoading(store, false)
          }
          return response.json()
        }).then((res) => {
          const responseData = res
          if (responseData.code === 200) {
            resolve(responseData.object)
          } else if (responseData.code === 401) {
            if (store.state.currentPage === 'bid' ||
              store.state.currentPage === 'prod') {
              setToRegist(store, true)
            } else {
              utils.confirm('您尚未注册, 点击按钮去注册', '提示', [
                {
                  text: '去注册',
                  fn () {
                    Router.go({
                      path: '/regist1',
                      replace: true
                    })
                  }
                }
              ], true)
            }
            resolve(responseData.object)
          } else if (responseData.code === 202) {
            reject(responseData)
          } else if (responseData.code === 9001) {
            utils.confirm(
              '由于您长时间没有访问导致页面失效，您退出再次进入就可以继续使用了',
              '提示',
              [{
                text: '马上退出',
                fn () {
                  wx.closeWindow()
                }
              }]
            )
          } else if (
            n <= 5 &&
            (!responseData || !responseData.code)
          ) {
            cycle(n + 1)
          } else {
            utils.alert(responseData.message)
            reject(responseData)
          }
        }).catch((response) => {
          if (n <= 5 && !options.ignoreLoading) {
            cycle(n + 1)
          } else {
            // if (window.raven && window.raven.captureException) {
            //   window.raven.captureException(
            //     JSON.stringify(response)
            //   )
            //   window.raven.captureException(
            //     'ajax response error'
            //   )
            // }
            utils.lastAjax = ''
            if (!options.ignoreLoading) {
              toggleLoading(store, false)
              utils.confirm(`api: ${url}<br>
                                status: ${response.status}<br>
                                ${response.body}`,
                '网络错误',
                [{ text: '我知道了' }])
//                        utils.confirm(`信用中心正在升级<br>
//                            新版本将为您提供更丰富的功能<br>
//                            请稍作等待`,
//                            '升级提示',
//                            [{
//                                text: '我知道了'
//                            }])
            }
          }
        })
      }
      cycle(1)
    })
  },
  alert (content, ban) {
    // alert 弹窗
    const settings = {}
    settings.content = content
    settings.title = '提醒'
    settingPopup(store, settings)
    showPopup(store)
    toggleHideBan(store, ban)
  },
  confirm (content, title, btnList, ban, className) {
    // confirm 弹窗
    const settings = {}
    settings.content = content
    settings.title = title
    settings.btnList = btnList
    settings.className = className
    settingPopup(store, settings)
    showPopup(store)
    toggleHideBan(store, ban)
  }
}

export const feedback = (content) => {
  setFeedback(store, {
    show: true,
    content
  })
}

export const ajaxForm = (url,
                         param,
                         ignoreToken) => {
  // api 全局路径
  Vue.http.options.root = window.$config.interfaceBase
  return utils.ajax(url,
    param,
    ignoreToken,
    { emulateJSON: true })
}

export const ajaxJson = (url,
                         param,
                         ignoreToken) => {
  Vue.http.options.root = window.$config.interfaceBase
  return utils.ajax(url,
    param,
    ignoreToken)
}

export const ajaxGet = (url,
                        param,
                        ignoreToken = false) => {
  Vue.http.options.root = window.$config.interfaceBase
  return utils.ajax(url,
    param,
    ignoreToken, {}, 'GET')
}

export const ajaxJsonCredit = (url,
                               param,
                               ignoreToken) => {
  Vue.http.options.root = window.$config.interfaceCredit
  return utils.ajax(url,
    param,
    ignoreToken)
}

export const ajaxGetCredit = (url,
                              param,
                              ignoreToken = false) => {
  Vue.http.options.root = window.$config.interfaceCredit
  return utils.ajax(url,
    param,
    ignoreToken, {}, 'GET')
}

export const ajaxJsonCreditWeb = (url,
                                  param,
                                  ignoreToken) => {
  Vue.http.options.root = window.$config.interfaceCreditWeb
  return utils.ajax(url,
    param,
    ignoreToken)
}

export const ajaxGetCreditWeb = (url,
                                 param,
                                 ignoreToken = false) => {
  Vue.http.options.root = window.$config.interfaceCreditWeb
  return utils.ajax(url,
    param,
    ignoreToken, {}, 'GET')
}

export const ajaxGetPushift = (url,
                               param,
                               ignoreToken = false) => {
  Vue.http.options.root = window.$config.interfaceBase
  return utils.ajax(url,
    param,
    ignoreToken, { ignoreLoading: true }, 'GET')
}

export const ajaxJsonp = (url, param) => new Promise((resolve) => {
  toggleLoading(store, true)
  let query = '?'
  Object.keys(param).forEach((key, index) => {
    query += `${index ? '&' : ''}${key}=${param[key]}`
  })
  Vue.http.jsonp(`${url}${query}`, param).then((response) => {
    toggleLoading(store, false)
    resolve(response.data)
  })
})
/* eslint-disable */
export const getArg = (name) => {
  // 在 App.vue 中无法获取 router 对象, 所以需要手动获取 query 参数
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  const search = window.location.search ||
    (`?${window.location.hash.split('?')[1]}`)
  const r = search.substr(1).match(reg)
  if (r !== null) return decodeURI(r[2])
  return null
}
// 判断访问终端
export const browser = () => {
  const u = navigator.userAgent
  return {
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
    // android终端
    iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
    weixin: u.indexOf('MicroMessenger') > -1, // 是否微信
    qq: u.match(/\sQQ/i) === ' qq', // 是否QQ
    language: (
      navigator.browserLanguage || navigator.language
    ).toLowerCase()
  }
}

export const guid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  const r = Math.random() * 16 | 0
  const v = c === 'x' ? r : (r & 0x3 | 0x8)
  return v.toString(16)
})
/* eslint-enable */

export const alert = utils.alert
export const confirm = utils.confirm
