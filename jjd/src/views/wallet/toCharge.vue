<template>
  <div>
    <selector :show="cardSelectorShown"
              :default-data="chosenCard"
              :value-list="computedList"
              @set-data="chooseCard"
              @toggle="toggleCardSelectorShown"></selector>
    <pay-money :show="payShown"
               :fn="reCharge"
               :only-pwd="true"
               :confirm-fn="confirmFn"
               :wallet="true"
               :order-id="orderId"
               @confirm="changeConfirmInfo"
               @change-info="changePayInfo"
               @success="success"
               @toggle-pay="togglePayShown"></pay-money>
    <group :single="true"
           :fixed="true">
      <btn :cut="1"
           :next="true"
           :text="'确认充值'"
           @click="showPwdFn"></btn>
    </group>
    <group :first="true">
      <div class="tips"
           v-if="showTip && showTipCode === 2">
        2017年5月26日21:00至5月31日00:00浦发银行进行系统升级维护，维护期间请避免使用<span>浦发银行卡</span>进行操作<br>
        2017年5月27日21:00至5月28日10:00建设银行进行系统升级维护，维护期间请避免使用<span>建设银行卡</span>进行操作
      </div>
      <div class="tips"
           v-if="showTip && showTipCode === 1">
        2017年5月26日21:00至5月31日00:00浦发银行进行系统升级维护，维护期间请避免使用<span>浦发银行卡</span>进行操作
      </div>
      <ele :more="true"
           @click="toggleCardSelectorShown(true)">
        <div>银行卡</div>
        <div slot="right">{{chosenCard.text || '--请选择--'}}</div>
      </ele>
    </group>
    <group>
      <ele>
        <div>充值金额（元）</div>
        <input growing-track="true"
               slot="right"
               type="number"
               @blur="blur"
               placeholder="单次最多可充值50000元"
               v-model="toChargeMoney"/>
      </ele>
      <div slot="tip_bottom"
           class="tip">
        <ele>
          <div>
                        <span class="alert"
                              v-show="toChargeMoney">实际扣款金额{{realAmount}}元
                                                     <span v-if="fee">（含手续费{{fee}}元）</span></span><br>
            <br>
            手续费多少？如何收取？<br>
            一次充值金额≥500元，不收取任何费用<br>
            一次充值金额＜500元，收取手续费2.5元<br>
            <br>
            充值金额什么时候可以使用？<br>
            充值操作完成后，平台大概需要1-2分钟处理，之后方可使用充值金额
          </div>
        </ele>
      </div>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import md5 from 'js-md5'
  import payMoney from 'components/output/payMoney'
  import selector from 'components/mixin/selector'
  import pay from 'api/pay'
  import { alert } from 'tools/utils'

  export default {
    data () {
      return {
        payShown: false,
        cardSelectorShown: false,
        chosenCard: {},
        orderId: '',
        toChargeMoney: '',
        pwd: '',
        bankcardList: [],
        payOrder: '',
        payToken: '',
        lastCardId: '',
        showTip: false,
        showTipCode: 0,
//        togglePayShown: false,
      }
    },
    watch: {
      payShown (e) {
        if (e) {
          this.getOrderId()
        }
      }
    },
    computed: {
      realAmount () {
        const c = parseFloat(this.toChargeMoney) || 0
        if (c < 500) {
          return (c + 2.5).toFixed(2)
        }
        return c.toFixed(2)
      },
      fee () {
        return parseFloat(this.realAmount) -
          parseFloat(this.toChargeMoney)
      },
      computedList () {
        return this.bankcardList.map((e) => {
          const obj = {}
          obj.text = `${e.c_bank_name || '银行卡'}-${e.c_bank_account}`
          obj.id = e.id
          return obj
        })
      }
    },
    methods: {
      chooseCard (card) {
        this.chosenCard = card
      },
      toggleCardSelectorShown (e) {
        this.cardSelectorShown = e
      },
//      getPayInfo () {
//        pay.checkCredit().then((json) => {
//          this.bankcardList = json.bank_list
//          if (this.lastCardId) {
//            json.bank_list.forEach((e) => {
//              if (e.id === this.lastCardId) {
//                const obj = {}
//                obj.text = `${e.c_bank_name ||
//                '银行卡'}-${e.c_bank_account}`
//                obj.id = e.id
//                this.chosenCard = obj
//              }
//            })
//          }
//        })
//      },
      getPayInfo () {
        pay.checkCredit().then((json) => {
          this.bankcardList = json.bank_list
          if (this.lastCardId) {
            json.bank_list.forEach((e) => {
              if (e.id === this.lastCardId) {
                const obj = {}
                obj.text = `${e.c_bank_name ||
                '银行卡'}-${e.c_bank_account}`
                obj.id = e.id
                this.chosenCard = obj
              }
            })
          } else if (json.bank_list.length >= 1) {
            const e = json.bank_list[0]
            const obj = {}
            obj.text = `${e.c_bank_name || '银行卡'}-${e.c_bank_account}`
            obj.id = e.id
            this.chosenCard = obj
          }
        })
      },
      getOrderId () {
        pay.getOrderId().then((json) => {
          this.orderId = json
        })
      },
      showPwdFn () {
        const amt = parseInt(this.toChargeMoney, 10)
        if (!amt || amt < 1) {
          alert('请输入大于1元的整数金额')
        } else if (amt > 50000) {
          alert('请输入不超过50000元的整数金额')
        } else if (!this.chosenCard.id) {
          alert('请选择一张银行卡')
        } else {
          this.payShown = true
        }
      },
      close () {
        this.payShown = false
      },
      togglePayShown (e) {
        this.payShown = e
        if (e) {
          this.getOrderId()
        }
      },
      reCharge () {
        return pay.reCharge({
          cardNum: this.chosenCard.id,
          orderId: this.orderId,
          pwd: md5(md5(this.pwd)),
          reChargeMoney: parseInt(this.toChargeMoney, 10)
        })
      },
      confirmFn (code) {
        return pay.reChargeConfirm({
          orderId: this.orderId,
          reChargeMoney: parseInt(this.toChargeMoney, 10),
          payOrder: this.payOrder,
          payToken: this.payToken,
          payCode: code
        })
      },
      changePayInfo (e) {
        this.pwd = e.password
      },
      changeConfirmInfo (e) {
        this.payOrder = e.order
        this.payToken = e.token
      },
      success (e) {
        if (e) {
//          feedback('充值成功，请关注您的账户余额变化')
          window._JHsdk.action({
            event: 'hx_ac11',
          })
          this.$store.state.money = this.toChargeMoney
          this.$store.state.bankCard = this.chosenCard
          this.close()
          this.getOrderId()
//        跳转到详情页
          this.$router.go('/rechargeSuccess')
        }
        this.togglePayShown(false)
        this.getOrderId()
      },
      blur () {
        this.toChargeMoney = parseInt(this.toChargeMoney || 0, 10)
      },
      ifShowTip () {
        const todayNow = Date.now()
        const startDay = new Date('2017-04-21T00:00+08:00').getTime()
        const endDay = new Date('2017-05-31T00:00+08:00').getTime()
        if (todayNow > startDay && todayNow < endDay) {
          this.showTip = true
          const endDay2 = new Date('2017-05-28T10:00+08:00').getTime()
          if (todayNow < endDay2) {
            this.showTipCode = 2
          } else {
            this.showTipCode = 1
          }
        }
      },
    },
    components: {
      payMoney,
      selector
    },
    created () {
      this.getPayInfo()
      this.getOrderId()
      this.ifShowTip()
    },
    route: {
      data ({ to: { params: { id } } }) {
        return {
          lastCardId: id
        }
      }
    }
  }
</script>
<style lang="scss"
       scoped>
  @import "../../scss/const";

  .tips {
    margin: 10px 0 10px 10px;
    font-size: $TIP_FONT_SIZE;
    span {
      color: $MINOR_COLOR;
    }
  }

  .alert {
    color: $MAIN_COLOR
  }
</style>
