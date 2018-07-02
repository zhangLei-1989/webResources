<template>
  <div>
    <validator name="validator">
      <form novalidate
            v-if="needCode">
        <group>
          <div slot="tip_bottom"
               class="tip">
            <ele>
              <div class="warning">
                京东新注册账号和无交易记录账号授权时会造成认证失败，建议暂时选择跳过，但是如果不属于上述情况仍建议您尽量授权京东，这样可以大大提升您的信用度。
              </div>
            </ele>
          </div>
        </group>
        <group>
          <div slot="tip_top"
               class="tip">
            <ele>
              <div>已向您京东账号绑定的手机发送短信验证码</div>
            </ele>
          </div>
          <ele>
            <input growing-track="true"
                   type="text"
                   placeholder="请输入您收到的短信验证码"
                   v-model="code"
                   maxlength="10"
                   v-validate:code="validRules.code">
          </ele>
        </group>
        <group :single="true"
               class="margin-top">
          <btn :cut="1"
               :text="'提交验证'"
               :btn-fn="submitCode"></btn>
        </group>
        <group :single="true">
          <btn :cut="1"
               :next="true"
               :btn-fn="skip"
               :text="'跳过'"></btn>
        </group>
      </form>
      <form novalidate
            v-else>
        <group>
          <div slot="tip_bottom"
               class="tip">
            <ele>
              <div class="warning">
                京东新注册账号和无交易记录账号授权时会造成认证失败，建议暂时选择跳过，但是如果不属于上述情况仍建议您尽量授权京东，这样可以大大提升您的信用度。
              </div>
            </ele>
          </div>
        </group>
        <group>
          <!--<div slot="tip_top"-->
          <!--class="tip">-->
          <!--<ele>-->
          <!--<div>请提供真实信息，否则不能通过审核</div>-->
          <!--</ele>-->
          <!--</div>-->
          <ele>
            <input growing-track="true"
                   type="text"
                   placeholder="请输入您的京东用户名/邮箱/手机号"
                   v-model="account"
                   maxlength="20"
                   v-validate:account="validRules.account">
          </ele>
          <ele>
            <input growing-track="false"
                   type="password"
                   placeholder="请输入您的登录密码"
                   v-model="password"
                   maxlength="20"
                   v-validate:password="validRules.password">
          </ele>
          <div slot="tip_bottom"
               class="tip">
            <ele>
              <a href="https://plogin.m.jd.com/cgi-bin/m/mreg"
                 @click="regist">没有京东账号？</a>
              <a href="https://plogin.m.jd.com/cgi-bin/m/mfindpwd"
                 @click="forget">忘记密码？</a>
            </ele>
          </div>
        </group>
        <group :single="true"
               class="margin-top">
          <btn :cut="1"
               :text="'同意授权'"
               :btn-fn="submit"></btn>
        </group>
        <group :single="true">
          <btn :cut="1"
               :next="true"
               :btn-fn="skip"
               :text="'跳过'"></btn>
        </group>
      </form>
    </validator>
  </div>
</template>

<script type="text/ecmascript-6">
  import verify from 'components/mixin/verify'
  import jxl from 'api/jxl'
  import {
    toggleWaiting
  } from 'store/actions'
  import { alert, confirm } from 'tools/utils'

  export default{
    mixins: [verify],
    vuex: {
      getters: {
        tel: state => state.temp.baseInfo.userTel
      },
      actions: {
        toggleWaiting
      }
    },
    data () {
      return {
        account: '',
        password: '',
        needCode: false,
        code: ''
      }
    },
    methods: {
      submit () {
        this.toValidate(() => {
          this.toggleWaiting(true)
          jxl.jingdong(
            this.account,
            this.password
          ).then(() => {
            setTimeout(() => {
              this.loop()
            }, 3000)
          })
        })
      },
      loop () {
        jxl.loopJingdong().then(() => {
          this.submitOk()
        }).catch((json) => {
          if (json.code === 202) {
            setTimeout(() => {
              this.loop()
            }, 3000)
          } else {
            this.submitError(json)
          }
        })
      },
      submitOk () {
        this.toggleWaiting(false)
        alert('信用报告正在生成中，大约需要 10 分钟，请注意查收微信推送消息。')
        this.$router.go({
          path: '/',
          replace: true
        })
      },
      submitError (json) {
        this.toggleWaiting(false)
        switch (json.code) {
          case 201: {
            this.needCode = false
            alert('获取京东信息失败，请稍后再试。')
            break
          }
          case 1202: {
            const text = '授权时间过长，请重新授权。'
            const url = '/operatorInfo'
            const that = this
            confirm(text, '提示', [
              {
                text: '去授权',
                fn () {
                  that.$router.go({
                    path: url,
                    replace: true
                  })
                }
              }])
            break
          }
          case 10002: {
            this.needCode = true
            break
          }
          case 10003: {
            alert('用户名或密码错误，请重新输入。')
            break
          }
          case 10004: {
            alert('短信验证码错误，请重新输入。')
            break
          }
          case 10006: {
            alert('短信验证码错误，请重新输入。')
            break
          }
          case 30000: {
            this.$router.go({
              path: '/operatorInfo',
              replace: true
            })
            break
          }
          default: {
            alert(json.message)
          }
        }
      },
      submitCode () {
        this.toValidate(() => {
          this.toggleWaiting(true)
          jxl.jingdongCode(this.code).then(() => {
            setTimeout(() => {
              this.loop()
            }, 3000)
          })
        })
      },
      skip () {
        jxl.skipDataSource().then(() => {
          this.submitOk()
        })
      },
      regist () {
        window.location.href =
          'https://plogin.m.jd.com/cgi-bin/m/mreg'
      },
      forget () {
        window.location.href =
          'https://plogin.m.jd.com/cgi-bin/m/mfindpwd'
      },
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/const";

  .warning {
    color: $MINOR_COLOR;
  }

  .margin-top {
    margin-top: 10px;
  }
</style>
