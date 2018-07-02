<script type="text/ecmascript-6">
  import user from 'api/user'
  import { getArg, browser } from 'tools/utils'
  import {
    setUserInfo,
    setToken,
    setTempInfo,
    toggleInitOk,
    setToRegist
  } from 'store/actions'
  import { normal } from 'tools/share'

  export default{
    vuex: {
      getters: {
        token: state => state.token
      },
      actions: {
        setUserInfo,
        setToken,
        setTempInfo,
        toggleInitOk,
        setToRegist
      }
    },
    data () {
      return {
        browserClass: {}
      }
    },
    methods: {
      init (fn) {
        const code = getArg('code')
        const token = window.sessionStorage.token
          || this.token
        const tempUserInfo = JSON.parse(
          window.sessionStorage.userInfo || '{}'
        )
        const tempCache = JSON.parse(
          window.sessionStorage.cache || '{}'
        )
        let toRegist = false
        if (window.sessionStorage.toRegist === 'true') {
          toRegist = true
        }
        if ((token && token !== 'undefined') || toRegist) {
          this.setToRegist(toRegist)
          this.setToken(token)
          this.setUserInfo(tempUserInfo)
          this.setTempInfo({
            cache: tempCache
          })
          fn()
        } else {
          if (!code) return
          user.init(code).then((json) => {
            this.setToken(json.token)
            this.setUserInfo({
              openId: json.openid,
              nickname: json.nickname,
              unionId: json.unionid,
              subscribe: json.subscribe,
              userIcon: json.headimgurl,
              userId: json.userId,
              cache: json.cache,
              n_lend_cnt: json.n_lend_cnt,
              n_borrow_cnt: json.n_borrow_cnt,
              n_guarantee_cnt: json.n_guarantee_cnt,
              n_product_cnt: json.n_product_cnt
            })
            this.setTempInfo({
              cache: json.cache || {}
            })
            window.sessionStorage.cache =
              JSON.stringify(json.cache || {})
            fn()
          }).catch((response) => {
            fn()
            if (response.data &&
              response.data.code === 401) {
              window.console.log('401')
            }
          })
        }
      },
      setBrowserClass () {
        const browserResult = browser()
        if (browserResult.android) {
          this.browserClass = {
            android: true
          }
        }
        if (browserResult.ios) {
          this.browserClass = {
            ios: true
          }
        }
      },
      signUrl (initFn) {
        user.signURL().then((json) => {
          window.wx.config({
            debug: window.$config.debug,
            appId: window.$config.appid, // 必填，公众号的唯一标识
            timestamp: json.timestamp, // 必填，生成签名的时间戳
            nonceStr: json.nonceStr, // 必填，生成签名的随机串
            signature: json.signature, // 必填，签名，见附录1
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'chooseImage',
              'previewImage',
              'uploadImage',
              'downloadImage',
              'scanQRCode',
              'hideOptionMenu']
            // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
          initFn()
        })
      }
    },
    created () {
      this.setBrowserClass()
      this.signUrl(() => {
        normal()
      })
      this.init(() => {
        this.toggleInitOk(true)
      })
    }
  }
</script>
