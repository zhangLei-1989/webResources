<template>
  <div>
    <validator name="validator">
      <group :single="true"
             :fixed="true">
        <btn :text="'验证并注册'"
             :cut="1"
             :next="true"
             :btn-fn="reRegist"></btn>
      </group>
      <group :first="true">
        <ele>
          <div>姓名</div>
          <div slot="right">{{name}}</div>
        </ele>
        <ele>
          <div>手机号</div>
          <div slot="right">{{tel}}</div>
        </ele>
        <ele>
          <div>身份证号</div>
          <input growing-track="true"
                 v-model="idCard"
                 slot="right"
                 v-validate:idcard="validRules.idcard"
                 placeholder="请输入身份证号">
        </ele>
        <ele>
          <div>银行卡号</div>
          <input growing-track="true"
                 v-model="bankCard"
                 slot="right"
                 v-validate:bc="validRules.bankCard"
                 placeholder="请输入之前绑定的银行卡号">
        </ele>
      </group>
    </validator>
  </div>
</template>

<script type="text/ecmascript-6">
  import verify from 'components/mixin/verify'
  import user from 'api/user'
  import { feedback } from 'tools/utils'
  import {
    setUserInfo,
    setToken,
    setToRegist
  } from 'store/actions'

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
        name: '',
        token: '',
        idCard: '',
        bankCard: ''
      }
    },
    components: {},
    computed: {},
    methods: {
      reRegist () {
        this.toValidate(() => {
          user.reRegist({
            tel: this.tel,
            openId: this.userInfo.openId,
            unionId: this.userInfo.unionId,
            userIcon: this.userInfo.userIcon,
            bankCard: this.bankCard,
            idCard: this.idCard,
            token: this.token
          }).then((json) => {
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
          })
        })
      }
    },
    route: {
      data ({ to: { params: { tel, name, token } } }) {
        return {
          tel,
          name,
          token
        }
      }
    },
    created () {
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>

</style>
