<template>
  <div>
    <pay-money :show="payShown"
               :fn="modifyTel"
               :only-pwd="true"
               :bank="true"
               @change-info="changePayInfo"
               @success="success"
               @toggle-pay="togglePayShown"></pay-money>
    <validator name="validator">
      <group :first="true">
        <ele>
          <div slot="left">新预留手机号</div>
          <input growing-track="true"
                 type="tel"
                 placeholder="请输入新手机号"
                 v-validate:phone="validRules.phone"
                 slot="right"
                 v-model="tel">
        </ele>
      </group>
      <group :single="true"
             class="margin-top">
        <btn :text="'更换预留手机号'"
             :cut="1"
             :next="true"
             :btn-fn="next"></btn>
      </group>
    </validator>
  </div>
</template>

<script type="text/ecmascript-6">
  import md5 from 'js-md5'
  import payMoney from 'components/output/payMoney'
  import verify from 'components/mixin/verify'
  import pay from 'api/pay'
  import { feedback } from 'tools/utils'

  export default{
    mixins: [verify],
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        id: '',
        number: '',
        tel: '',
        pwd: '',
        payShown: false
      }
    },
    components: {
      payMoney
    },
    computed: {},
    methods: {
      next () {
        this.toValidate(() => {
          this.togglePayShown(true)
        })
      },
      modifyTel () {
        return pay.modifyBankTel({
          number: this.id, // 别被名字骗了,他就是id
          tel: this.tel,
          pwd: md5(md5(this.pwd))
        })
      },
      success (e) {
        this.togglePayShown(false)
        if (e) {
          feedback('预留手机号码修改成功')
          window.history.go(-1)
        }
      },
      changePayInfo (e) {
        this.pwd = e.password
      },
      togglePayShown (e) {
        this.payShown = e
      }
    },
    route: {
      data ({ to: { params: { id } } }) {
        return {
          id
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
  .row [slot=left] {
    width: 76px;
    min-width: 106px;
  }

  .margin-top {
    margin-top: 50px;
  }
</style>
