<template>
  <div>
    <validator name="validator">
      <group>
        <ele>
          <div slot="left">新手机号</div>
          <input growing-track="true"
                 type="tel"
                 placeholder="请输入新手机号"
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
        <btn :text="'更换手机号'"
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
  import { feedback } from 'tools/utils'

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
          user.modifyTel({
            tel: this.tel,
            code: this.code
          }).then(() => {
            feedback('手机号码修改成功')
            window.history.go(-2)
          })
        })
      },
      getCode () {
        user.getTelCodeToModifyTel(this.tel)
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
