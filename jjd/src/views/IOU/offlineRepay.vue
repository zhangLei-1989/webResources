<template>
  <div>
    <pay-money :show="payShown"
               :fn="repay"
               :only-pwd="true"
               :offline="true"
               @change-info="changePayInfo"
               @success="success"
               @toggle-pay="togglePayShown"></pay-money>
    <selector :show="typeSelectorShown"
              :default-data="type"
              :value-list="typeList"
              @set-data="setType"
              @toggle="toggleTypeSelectorShown"></selector>
    <group :single="true"
           :fixed="true">
      <btn :next="true"
           :cut="1"
           :text="'我已还款，告知对方'"
           :btn-fn="showPwdFn"></btn>
    </group>
    <group :first="true">
      <ele v-if="chosenList.length == 1">
        <div>已还金额</div>
        <input growing-track="true"
               type="number"
               slot="right"
               :placeholder="placeholder"
               v-model="repayAmount">
        <div slot="unit">元</div>
      </ele>
      <ele v-else>
        <div>已还金额</div>
        <div slot="right">{{repayAmount}}元</div>
      </ele>
      <ele :more="true"
           @click="toggleTypeSelectorShown(true)">
        <div>还款方式</div>
        <div slot="right">{{type}}</div>
      </ele>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import md5 from 'js-md5'
  import payMoney from 'components/output/payMoney'
  import selector from 'components/mixin/selector'
  import { alert, feedback } from 'tools/utils'
  import pay from 'api/pay'

  export default {
    vuex: {
      getters: {
        offlineRepay: state => state.temp.offlineRepay
      }
    },
    data () {
      return {
        orderId: '',
        payShown: false,
        amount: '',
        repayAmount: '',
        chosenList: [],
        typeSelectorShown: false,
        typeList: ['支付宝', '微信', '银行卡', '现金'],
        type: '支付宝',
        pwd: ''
      }
    },
    computed: {
      placeholder () {
        return `不超过${this.amount}`
      }
    },
    methods: {
      toggleTypeSelectorShown (e) {
        this.typeSelectorShown = e
      },
      setType (type) {
        this.type = type
      },
      getOrderId (type) {
        pay.getOrderId(type).then((json) => {
          this.orderId = json
        })
      },
      showPwdFn () {
        const ra = parseFloat(this.repayAmount)
        const a = parseFloat(this.amount)
        if (!ra) {
          alert('请输入还款金额')
        } else if (ra > a) {
          if (a) {
            alert(`您输入的还款金额过多，不能超过${a}元`)
          } else {
            alert('您目前没有需要还款的金额，请通知出借人尽快确认你的还款')
          }
        } else {
          this.payShown = true
        }
      },
      close () {
        this.payShown = false
      },
      togglePayShown (e) {
        this.payShown = e
      },
      repay () {
        if (this.chosenList.length === 1) {
          this.chosenList[0].amt = parseFloat(this.repayAmount)
          this.chosenList[0].n_amt = parseFloat(this.repayAmount)
        }
        return pay.repay({
          orderId: this.orderId,
          password: md5(md5(this.pwd)),
          amount: parseFloat(this.repayAmount),
          idList: this.chosenList,
          payWay: 2,
          offlineWay: this.type
        })
      },
      changePayInfo (e) {
        this.pwd = e.password
      },
      success (e) {
        if (e) {
          this.togglePayShown(false)
          feedback('还款成功，等待对方确认')
          this.getOrderId()
          window.history.back()
        } else {
          this.togglePayShown(false)
          this.getOrderId()
        }
      }
    },
    components: {
      payMoney,
      selector
    },
    created () {
      this.getOrderId()
      this.chosenList = this.offlineRepay.chosenList
      this.amount = this.offlineRepay.totalAmount
      if (this.chosenList.length !== 1) {
        this.repayAmount = this.amount
      }
    }
  }
</script>
<style lang="scss"
       scoped>

</style>
