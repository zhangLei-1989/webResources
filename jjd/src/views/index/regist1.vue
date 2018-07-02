<template>
  <div>
    <validator name="validator">
      <div class="margin-top">
        <group>
          <ele>
            <div slot="left">手机号</div>
            <input growing-track="true"
                   type="tel"
                   placeholder="请输入手机号"
                   v-model="tel"
                   v-validate:phone="validRules.phone"
                   slot="right">
          </ele>
        </group>
      </div>
      <group :single="true">
        <btn :text="'获取短信验证码'"
             :next="true"
             :cut="1"
             :btn-fn="msmFn"></btn>
      </group>
    </validator>
  </div>
</template>

<script type="text/ecmascript-6">
  import verify from 'components/mixin/verify'
  import user from 'api/user'

  export default{
    mixins: [verify],
    vuex: {
      getters: {
        openId: state => state.userInfo.openId
      }
    },
    data () {
      return {
        tel: ''
      }
    },
    methods: {
      msmFn () {
        window._JHsdk.action({
          event: 'zc_ac2'
        })
        const that = this
        this.toValidate(() => {
          user.getTelCodeToRegister({
            tel: this.tel,
            openId: this.openId
          }).then(() => {
            this.$router.go(`/regist2/${that.tel}`)
          })
        })
      }
    }
  }
</script>

<style lang="scss"
       scoped>
  @import "../../scss/fragment";

  .row [slot=left] {
    width: 76px;
    min-width: inherit;
  }

  .margin-top {
    margin-top: 50px;
  }
</style>
