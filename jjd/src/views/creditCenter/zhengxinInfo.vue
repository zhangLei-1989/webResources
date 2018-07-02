<template>
  <div>
    <validator name="validator">
      <form novalidate>
        <group>
          <div slot="tip_top"
               class="tip">
            <ele>
              <div>请提供真实信息，否则不能通过审核</div>
            </ele>
          </div>
          <ele>
            <input growing-track="true"
                   type="text"
                   placeholder="请输入您的征信中心登录名"
                   v-model="account"
                   maxlength="20"
                   v-validate:account="validRules.account">
          </ele>
          <ele>
            <input growing-track="false"
                   type="password"
                   placeholder="请输入您的征信中心密码"
                   v-model="password"
                   maxlength="20"
                   v-validate:password="validRules.password">
          </ele>
          <ele>
            <input growing-track="false"
                   type="text"
                   placeholder="请输入图中验证码"
                   v-model="picCode"
                   maxlength="10"
                   v-validate:pc="validRules.picCode">
            <div class="code-pic">
              <img :src="codePicUrl"
                   alt="加载中"
                   v-if="codePicUrl"
                   @click="freshCodePic">
              <span v-else>加载中</span>
            </div>
          </ele>
          <ele>
            <input growing-track="true"
                   type="text"
                   placeholder="请输入您的身份验证码"
                   v-model="userCode"
                   maxlength="10"
                   v-validate:userCode="validRules.userCode">
          </ele>
          <div slot="tip_bottom"
               class="tip">
            <ele>
              <div class="codeError"
                   @click="codeError">身份验证码错误?
              </div>
              <a v-link="{path:'/zhengxinHelp'}">如何获取征信信息？</a>
            </ele>
          </div>
        </group>
        <group :single="true">
          <btn :cut="1"
               :next="true"
               :text="'同意授权'"
               :btn-fn="submit"></btn>
        </group>
      </form>
    </validator>
  </div>
</template>

<script type="text/ecmascript-6">
  import verify from 'components/mixin/verify'
  import zhengxin from 'api/zhengxin'
  import {
    toggleWaiting
  } from 'store/actions'
  import { alert } from 'tools/utils'

  export default{
    mixins: [verify],
    vuex: {
      getters: {
        firstTime: state => state.firstTime
      },
      actions: {
        toggleWaiting
      }
    },
    data () {
      return {
        account: '',
        password: '',
        picCode: '',
        userCode: '',
        codePicUrl: ''
      }
    },
    methods: {
      submit () {
        this.toValidate(() => {
          this.toggleWaiting(true)
          zhengxin.info({
            username: this.account,
            password: this.password,
            picCode: this.picCode,
            userCode: this.userCode
          }).then(() => {
            this.toggleWaiting(false)
            window.history.back()
          }).catch((json) => {
            this.toggleWaiting(false)
            alert(json.message)
            this.freshCodePic()
          })
        })
      },
      codeError () {
        alert('您在征信中心的查询请求提交以后，24小时后可短信得到身份验证码，有效期为7日，过期需重新申请。')
      },
      freshCodePic () {
        zhengxin.fresh().then((json) => {
          this.codePicUrl = json
        })
      },
      init () {
        zhengxin.init().then((json) => {
          if (json) {
            this.codePicUrl = json
          }
        })
      }
    },
    created () {
      this.init()
    }
  }
</script>

<style scoped>
    a,
    .codeError {
        color: #FCC414;
    }

    .code-pic {
        font-size: 14px;
        color: #999;
        height: 40px;
        position: absolute;
        height: 50px;
        top: 0;
        right: 0;
        line-height: 50px;
        min-width: 70px;
        text-align: center;
        overflow: hidden;
    }

    .code-pic img {
        height: 50px;
        margin: 0px -20px;
    }

</style>
