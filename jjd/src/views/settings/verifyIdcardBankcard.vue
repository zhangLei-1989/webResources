<template>
  <div>
    <validator name="validator">
      <group :first="true">
        <ele>
          <div slot="left">姓名</div>
          <input growing-track="true"
                 type="text"
                 placeholder="请输入姓名"
                 v-validate:username="validRules.username"
                 slot="right"
                 v-model="name">
        </ele>
        <ele>
          <div slot="left">身份证号</div>
          <input growing-track="true"
                 type="text"
                 placeholder="请输入身份证号码"
                 v-validate:idcard="validRules.idcard"
                 slot="right"
                 v-model="idcard">
        </ele>
      </group>
      <group>
        <!--<div slot="tip_top"-->
        <!--class="tip">-->
        <!--<ele>-->
        <!--<div>请输入{{bankName}}储蓄卡卡号（尾号为{{bankCardTip}}）</div>-->
        <!--</ele>-->
        <!--</div>-->
        <ele>
          <div slot="left">银行卡号</div>
          <input growing-track="true"
                 type="number"
                 placeholder="请输入银行卡号"
                 v-validate:bc="validRules.bankCard"
                 slot="right"
                 v-model="bankCard">
        </ele>
      </group>
      <group :single="true">
        <btn :text="'下一步'"
             :cut="1"
             :next="true"
             :btn-fn="modify"></btn>
      </group>
    </validator>
  </div>
</template>

<script type="text/ecmascript-6">
  import verify from 'components/mixin/verify'
  import user from 'api/user'
  import pay from 'api/pay'

  export default{
    mixins: [verify],
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        name: '',
        idcard: '',
        bankCard: '',
        bankName: '',
        bankCardTip: ''
      }
    },
    components: {},
    computed: {},
    methods: {
      getBankInfo () {
        pay.checkCredit().then((json) => {
          this.bankCardTip = json.c_bank_account
          this.bankName = json.c_bank_name
        })
      },
      modify () {
        this.toValidate(() => {
          user.checkIdcardAndBankcard({
            name: this.name.trim(),
            idcard: this.idcard.trim(),
            bankcard: this.bankCard.trim(),
          }).then(() => {
            this.$router.go({
              path: '/verifyCode',
              replace: false
            })
          })
        })
      }
    },
    route: {},
    created () {
//            this.getBankInfo()
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>

</style>
