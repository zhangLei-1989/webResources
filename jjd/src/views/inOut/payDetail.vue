<template>
  <div>
    <validator name="validator">
      <group>
        <ele :more="true">
          <div slot="left">交易账户</div>
          <div solt="right">{{account}}</div>
        </ele>
        <ele :more="true">
          <div slot="left">付款方式</div>
          <div>{{bankName}}({{bankCardTip}})</div>
        </ele>
        <ele>
          <div slot="left">付款金额</div>
          <input growing-track="true"
                 type="number"
                 placeholder="请输入付款金额"
                 v-validate:payMoney="validRules.bankCard"
                 slot="right"
                 v-model="payMoney">
          <div slot="unit">元</div>
        </ele>
      </group>
      <group :single="true">
        <btn :text="'确认支付'"
             :cut="1"
             :next="true"
             :btn-fn="modify"></btn>
      </group>
    </validator>
  </div>
</template>

<script type="text/ecmascript-6">
  import verify from 'components/mixin/verify'

  export default{
    mixins: [verify],
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        account: '15801575009',
        idcard: '',
        payMoney: '',
        bankName: '建设银行',
        bankCardTip: '1359'
      }
    },
    components: {},
    computed: {},
    methods: {
      modify () {
        this.toValidate(() => {
          this.$router.go('/index')
        })
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

</style>
