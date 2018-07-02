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
                   placeholder="请输入您的淘宝手机号/会员名"
                   v-model="account"
                   v-validate:account="validRules.account">
          </ele>
          <ele>
            <input growing-track="false"
                   type="password"
                   placeholder="请输入您的登录密码"
                   v-model="password"
                   v-validate:password="validRules.password">
          </ele>
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
        jingdongOk: false
      }
    },
    methods: {
      getJxlList () {
        jxl.getJxlList().then((json) => {
          this.jingdongOk = json.includes('jingdong')
        })
      },
      submit () {
        this.toValidate(() => {
          this.toggleWaiting(true)
          jxl.taobao(
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
        jxl.loopTaobao().then((json) => {
          if (json === 'jingdong') {
            this.jingdongOk = true
          }
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
        if (this.jingdongOk) {
          this.$router.go({
            path: '/jingdongInfo',
            replace: true
          })
        } else {
          alert('信用报告正在生成中，大约需要 10 分钟，请注意查收微信推送消息。')
          this.$router.go({
            path: '/',
            replace: true
          })
        }
      },
      submitError (json) {
        this.toggleWaiting(false)
        switch (json.code) {
          case 201: {
            alert('获取淘宝信息失败，请稍后再试。')
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
          case 10003: {
            alert('用户名或密码错误，请重新输入。')
            break
          }
          default: {
            alert(json.message)
          }
        }
      }
    },
    created () {
//      this.getJxlList()
    }
  }
</script>

<style scoped>

</style>
