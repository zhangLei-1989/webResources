<template>
  <div>
    <validator name="validator">
      <group>
        <ele>
          <div slot="left">手机号码</div>
          <input growing-track="true"
                 type="tel"
                 placeholder="请输入登录密码"
                 v-validate:phone="validRules.phone"
                 slot="right"
                 v-model="tel">
        </ele>
        <ele>
          <div slot="left">验证码</div>
          <div slot="right">
            <input growing-track="true"
                   type="number"
                   placeholder="请输入验证码"
                   v-model="code"
                   v-validate:code="validRules.code">
            <codebtn :phone-num="tel"
                     :required="true"
                     :fn="getCode"></codebtn>
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

  export default{
    mixins: [verify],
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        tel: '',
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
          window.console.log('next')
          this.$router.go('/index')
        })
      },
      getCode () {
        window.console.log('get')
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
