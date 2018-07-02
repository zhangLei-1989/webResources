<template>
  <div>
    <selector :show="diplomaSelectorShown"
              :default-data="diploma"
              :value-list="diplomaList"
              @set-data="setDiploma"
              @toggle="toggleDiplomaSelectorShown"></selector>
    <validator name="validator">
      <form novalidate>
        <group>
          <div slot="tip_top"
               class="tip">
            <ele>
              <div>请提供真实信息，否则不能通过审核</div>
            </ele>
          </div>
          <ele :more="true"
               @click="toggleDiplomaSelectorShown(true)">
            <div>最高学历</div>
            <div slot="right">
              {{diploma||'--请选择--'}}
              <input growing-track="true"
                     type="hidden"
                     v-model="diploma"
                     v-validate:xueli="validRules.xueli">
            </div>
          </ele>
          <ele v-if="diploma == '专科及以上'">
            <input growing-track="true"
                   type="text"
                   placeholder="请输入您的身份证号/注册手机号/邮箱"
                   v-model="account"
                   maxlength="30"
                   v-validate:account="validRules.account">
          </ele>
          <ele v-if="diploma == '专科及以上'">
            <input growing-track="false"
                   type="password"
                   placeholder="请输入您的学信网密码"
                   v-model="password"
                   maxlength="20"
                   v-validate:password="validRules.password">
          </ele>
          <ele v-if="codePicUrl">
            <input growing-track="true"
                   type="text"
                   placeholder="请输入图中验证码"
                   maxlength="10"
                   v-model="picCode">
            <div class="code-pic">
              <img :src="codePicUrl"
                   alt="加载中"
                   v-if="codePicUrl"
                   @click="freshCodePic">
              <span v-else>加载中</span>
            </div>
          </ele>
          <div slot="tip_bottom"
               class="tip">
            <ele>
              <a href="https://account.chsi.com.cn/account/account!newaccount"
                 @click="regist">没有学信网账号？</a>
              <a href="https://account.chsi.com.cn/account/password!retrive"
                 @click="forget">忘记学信网账号密码？</a>
            </ele>
            <ele>
              <div>
                您可能于在校期间，或报考职业考试、研究生考试时注册过学信网，所以，建议您先试一试“忘记学信网账号密码？”
              </div>
            </ele>
          </div>
        </group>
        <group :single="true">
          <btn :cut="1"
               :next="true"
               :text="'同意授权'"
               :btn-fn="submit"></btn>
          <!--<div slot="tip_bottom"-->
          <!--class="tip">点击【同意授权】，表示您已经阅读并同意<br>-->
          <!--<a v-link="{path:'/xuexinService'}">《学信网授权协议》</a>-->
          <!--</div>-->
        </group>
      </form>
    </validator>
  </div>
</template>

<script type="text/ecmascript-6">
  import verify from 'components/mixin/verify'
  import selector from 'components/mixin/selector'
  import xuexin from 'api/xuexin'
  import tongdun from 'api/tongdun'
  import {
    toggleWaiting
  } from 'store/actions'
  import { alert } from 'tools/utils'

  export default{
    mixins: [verify],
    vuex: {
      getters: {},
      actions: {
        toggleWaiting
      }
    },
    data () {
      return {
        diplomaSelectorShown: false,
        diplomaList: ['专科及以上', '专科以下'],
        diploma: '--请选择--',
        account: '',
        password: '',
        picCode: '',
        codePicUrl: '',
        userTel: '',
        jjjh: false,
      }
    },
    components: {
      selector
    },
    methods: {
      toggleDiplomaSelectorShown (e) {
        this.diplomaSelectorShown = e
      },
      setDiploma (type) {
        this.diploma = type
      },
      submit () {
        this.toValidate(() => {
          this.toggleWaiting(true)
          xuexin.info(
            this.diploma === '专科及以上',
            this.account,
            this.password,
            this.picCode,
            tongdun.getToken()
          ).then(() => {
            this.toggleWaiting(false)
            if (this.jjjh) {
              window.history.back()
            } else if (this.firstTime) {
              const url = `/operatorInfo/${this.userTel}`
              this.$router.go({
                path: url,
                replace: true
              })
            } else {
              window.history.back()
            }
          }, (json) => {
            this.toggleWaiting(false)
            if (json.code === 201 && json.object) {
              this.codePicUrl = json.object.imgrc
            }
            alert(json.message)
          })
        })
      },
      freshCodePic () {
        xuexin.fresh().then((json) => {
          this.codePicUrl = json
        })
      },
      regist () {
        window.location.href =
          'https://account.chsi.com.cn/account/account!newaccount'
      },
      forget () {
        window.location.href =
          'https://account.chsi.com.cn/account/password!retrive'
      },
      init () {
        xuexin.init().then((json) => {
          if (json) {
            this.codePicUrl = json
          }
        })
      }
    },
    created () {
      this.init()
    },
    route: {
      data ({ to: { params: { jjjh } } }) {
        return {
          jjjh: !!jjjh,
        }
      }
    }
  }
</script>

<style scoped>
    a {
        color: #FCC414;
        margin-bottom: 20px;
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
    }

    .code-pic img {
        height: 50px;
    }

</style>
