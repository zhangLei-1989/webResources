/**
 * Created by hq5544 on 16/3/26.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { ajaxGetPushift } from 'tools/utils'
import RouterMap from './map'
import {
  changeTitle,
  togglePullRefresh,
  setCurrentPage,
  setTransitionMode
} from '../store/actions'
import store from '../store/store'

Vue.use(VueRouter)

const router = new VueRouter()

router.map(RouterMap.map)
router.alias(RouterMap.alias)
router.redirect(RouterMap.redirect)

function checkInitOk (fn) {
  if (store.state.initOk) {
    fn()
  } else {
    setTimeout(() => {
      checkInitOk(fn)
    }, 100)
  }
}

router.beforeEach((transition) => {
  const pageList = store.state.transition.pageList
  if (transition.to.name === pageList[pageList.length - 1]) {
    setTransitionMode(store, 'out')
  } else {
    setTransitionMode(store, 'in')
  }
  checkInitOk(transition.next)
//    Vue.nextTick(() => {
//        checkInitOk(transition.next)
//    })
})

router.afterEach((transition) => {
  // 每次路由切换后进行的操作
  changeTitle(store, transition.to.title)
  togglePullRefresh(store, transition.to.pullRefresh)
  const pageList = store.state.transition.pageList
  if (transition.to.name === pageList[pageList.length - 1]) {
    setCurrentPage(store, transition.to.name)
  } else {
    setCurrentPage(store, transition.to.name, transition.from.name)
  }
  document.body.scrollTop = 0
  // todo: 这里本打算做切换效果, 但是 transform 和 fixed 冲突
//    setTimeout(() => {
//        window.scrollBy(0, 1)
//        setTimeout(() => {
//            window.scrollBy(0, -1)
//        }, 100)
//    }, 1000)
  if (!store.state.temp.cache.beginnerGuide &&
    store.state.token &&
    transition.to.name !== 'beginnerGuide' &&
    // transition.to.name !== 'jjjh' &&
    transition.to.name !== 'eventDescription' &&
    transition.to.name !== 'jjjhBorrowInfoList' &&
    transition.to.name !== 'jjjhBorrowInfo' &&
    transition.to.name !== 'schoolInfo' &&
    transition.to.name !== 'familyInfo') {
    setTimeout(() => {
      router.go('/beginnerGuide/0')
    }, 500)
  }
  const openId = store.state.userInfo.openId
  if (openId) {
    ajaxGetPushift('user/uploadAccessPage', {
      openid: openId,
      page: transition.to.num
    }).catch((err) => {
      window.console.log(err)
    })
  }
  window.zhuge.track('pageView', {
    title: transition.to.title,
    name: transition.to.name
  })
})

export default router
