<template>
  <div>
    <validator name="validator">
      <group>
        <div slot="tip_top"
             class="tip">
          <ele>
            <div>
              验证码已发送至尾号{{tel.slice(7,11)}}的手机
            </div>
          </ele>
        </div>
        <ele>
          <div slot="left">验证码</div>
          <input growing-track="true"
                 type="number"
                 placeholder="请输入验证码"
                 v-model="code"
                 v-validate:code="validRules.code"
                 slot="right">
        </ele>
      </group>

      <group :single="true"
             class="voice-message">
        <div slot="tip_top"
             class="tip box">
          <ele class="box">
            <div class="box">-----收不到短信验证码？-----</div>
          </ele>
        </div>
        <btn :text="callText"
             :allow="allow"
             :cut="1"
             class="animated"
             :class="{'shake': shake}"
             :btn-fn="getVoiceAndAlert"></btn>
      </group>

      <group :single="true">
        <div slot="tip_top"
             class="tip_box"
             style="margin: 0 -10px;">
          <div style="width: 40px; height: 40px"
               @click="toggleCheck">
            <div class="checkbox"
                 :class="{chosen: checked}"></div>
          </div>
          已阅读并同意<a @click.stop.prevent="goService('userService')">《今借到用户协议》</a><a @click="goService('authorizationService')">《征信授权书》</a>
        </div>
        <btn :text="'注册'"
             :next="true"
             :cut="1"
             :btn-fn="regist"></btn>
      </group>
    </validator>
  </div>
</template>

<script type="text/ecmascript-6">
  import verify from 'components/mixin/verify'
  import user from 'api/user'
  import {
    setUserInfo,
    setToken,
    setToRegist
  } from 'store/actions'
  import { alert, feedback, confirm } from 'tools/utils'

  export default{
    mixins: [verify],
    vuex: {
      getters: {
        userInfo: state => state.userInfo
      },
      actions: {
        setUserInfo,
        setToken,
        setToRegist
      }
    },
    data () {
      return {
        tel: '',
        code: '',
        callText: '获取语音验证码',
        allow: false,
        checked: true,
        shake: false
      }
    },
    computed: {},
    methods: {
      goService (e) {
        this.$router.go({
          path: `/${e}`,
          replace: false
        })
      },
      toggleCheck () {
        this.checked = !this.checked
        this.payShown = false
      },
      startCount (e) {
        let count = e
        this.callText = `剩余${count}秒可获取语音验证码`
        const start = setInterval(() => {
          if (count === 1) {
            clearInterval(start)
            this.callText = '获取语音验证码'
            this.allow = true
          } else {
            count -= 1
            this.callText = `剩余${count}秒可获取语音验证码`
          }
        }, 1000)
      },
      getVoiceAndAlert () {
        window._JHsdk.action({
          event: 'zc_ac3'
        })
        setTimeout(() => {
          this.callFn()
        }, 1000)
        alert('语音验证码会以电话的形式告知，您马上会有一个来电，请选择接听')
      },
      callFn (e) {
        this.allow = false
        let seconds = 60
        if (e) {
          seconds = 10
        }
        if (e) {
          this.startCount(seconds)
        } else {
          user.getVoiceCodeToRegister({
            tel: this.tel,
            openId: this.userInfo.openId
          }).then(() => {
            this.startCount(seconds)
          }).catch(() => {
            this.startCount(seconds)
          })
        }
      },
      regist () {
        this.toValidate(() => {
          if (!this.checked) {
            alert('请同意今借到用户协议')
          } else if (!this.userInfo.openId) {
            confirm(
              '微信出了一些小故障，请退出页面，重新进入',
              '提醒',
              [{
                text: '知道了',
                fn () {
                  wx.closeWindow()
                }
              }]
            )
          } else {
            user.regist({
              tel: this.tel,
              code: this.code,
              openId: this.userInfo.openId,
              unionId: this.userInfo.unionId,
              userIcon: this.userInfo.userIcon
            }).then((json) => {
              window._JHsdk.action({
                event: 'zc_ac4',
                params: {
                  type: 'ok'
                }
              })
              this.setToRegist(false)
              this.setUserInfo({
                openId: json.openId,
                cache: json.cache || {}
              })
              window.sessionStorage.cache =
                JSON.stringify(json.cache || {})
              this.setToken(json.token)
              feedback('注册成功')
              window.history.go(-2)
            }).catch((json) => {
              if (json.code === 202) {
                window._JHsdk.action({
                  event: 'zc_ac4',
                  params: {
                    type: 'registed'
                  }
                })
                alert('您所使用的手机号曾经注册过今借到平台，验证信息后即可继续使用')
                const url = `/reRegist/${this.tel}/${
                  json.object.c_user_name}/${json.object.token}`
                this.$router.go({
                  path: url,
                  replace: true
                })
              } else {
                window._JHsdk.action({
                  event: 'zc_ac4',
                  params: {
                    type: 'error'
                  }
                })
              }
            })
          }
        })
      }
    },
    route: {
      data ({ to: { params: { tel } } }) {
        return {
          tel
        }
      }
    },
    created () {
      this.callFn(10)
      setTimeout(() => {
        this.shake = true
      }, 10000)
    },
    attached () {
    }
  }
</script>

<style lang="scss"
       scoped>
  @import "../../scss/fragment";

  .checkbox {
    width: 16px;
    height: 16px;
    @extend %checkbox;
    margin: 12px;
    line-height: 40px;
    border: 1px solid $TIP_COLOR !important;
  }

  .chosen.checkbox::before {
    width: 6px !important;
    height: 10px !important;
    top: 2px;
    left: 5px;
  }

  .tip_box {
    display: flex;
    line-height: 40px;
    font-size: $MIN_FONT_SIZE;
    color: $TIP_COLOR;
    a {
      color: $MAIN_COLOR;
    }
  }

  .row [slot=left] {
    width: 76px;
    min-width: inherit;
  }

  .box {
    width: 100%;
    text-align: center;
  }

  .voice-message {
    margin-bottom: 150px;
    margin-top: 30px;
  }

  .animated {
    -webkit-animation-duration: 0.8s;
    animation-duration: 0.8s;
  }
</style>
