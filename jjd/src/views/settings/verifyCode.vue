<template>
  <div>
    <validator name="validator">
      <group>
        <div slot="tip_top"
             class="tip">
          <ele>
            <div>验证码已发送至尾号{{tel.slice(7,11)}}的手机</div>
          </ele>
        </div>
        <ele>
          <div slot="left">验证码</div>
          <div slot="right">
            <input growing-track="true"
                   type="number"
                   placeholder="请输入验证码"
                   v-model="code"
                   v-validate:code="validRules.code">
            <codebtn :fn="getCode"
                     :start="true"></codebtn>
          </div>
        </ele>
      </group>
      <group :single="true">
        <btn :text="'下一步'"
             :cut="1"
             :next="true"
             :btn-fn="next"></btn>
      </group>
    </validator>
  </div>
</template>

<script type="text/ecmascript-6">
  import codebtn from 'components/mixin/codebtn'
  import verify from 'components/mixin/verify'
  import user from 'api/user'
  import { setTempInfo } from 'store/actions'

  export default{
    mixins: [verify],
    vuex: {
      getters: {
        tel: state => state.userInfo.tel
      },
      actions: { setTempInfo }
    },
    data () {
      return {
        code: ''
      }
    },
    components: {
      codebtn
    },
    computed: {},
    methods: {
      next () {
        this.toValidate(() => {
          user.checkModifyPayPwdCode(this.code).then(() => {
            this.setTempInfo({
              modifyPayPwd: {
                code: this.code
              }
            })
            this.$router.go({
              path: '/preInputPayPwd/modify',
              replace: true
            })
          })
        })
      },
      getCode () {
        user.getTelCodeToModifyPwd()
      }
    },
    route: {},
    created () {
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  .row [slot=left] {
    width: 76px;
    min-width: 0;
  }
</style>
