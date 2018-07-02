<template>
  <div>
    <selector :show="cardSelectorShown"
              :default-data="chosenCard"
              :value-list="computedList"
              @set-data="chooseCard"
              @toggle="toggleCardSelectorShown"></selector>
    <pay-money :show="payShown"
               :fn="toWithdraw"
               :only-pwd="true"
               :wallet="true"
               :order-id="orderId"
               @change-info="changePayInfo"
               @success="success"
               @toggle-pay="togglePayShown"></pay-money>
    <group :single="true"
           :fixed="true">
      <btn :cut="1"
           :next="true"
           :text="'确认提现'"
           @click="ShowPwdFn"></btn>
    </group>
    <group :first="true">
      <!--招商银行下线提示-->
      <div class="tips"
           v-if="showTip && showTipCode === 2">
        2017年5月26日21:00至5月31日00:00浦发银行进行系统升级维护，维护期间请避免使用<span>浦发银行卡</span>进行操作<br>
        2017年5月27日21:00至5月28日10:00建设银行进行系统升级维护，维护期间请避免使用<span>建设银行卡</span>进行操作
      </div>
      <div class="tips"
           v-if="showTip && showTipCode === 1">
        2017年5月26日21:00至5月31日00:00浦发银行进行系统升级维护，维护期间请避免使用<span>浦发银行卡</span>进行操作
      </div>
      <ele @click="toggleCardSelectorShown(true)"
           :more="true">
        <div>银行卡</div>
        <div slot="right">{{chosenCard.text || '--请选择--'}}</div>
      </ele>
    </group>
    <group>
      <ele>
        <div>提现金额(元)</div>
        <input growing-track="true"
               slot="right"
               type="number"
               :placeholder="placeholder"
               v-model="withdraw"/>
      </ele>
      <div slot="tip_bottom"
           class="tip">
        <ele>
          <div class="alert-box">
            <div class="alert"
                 v-show="d0feeShown">实际到账金额{{realAmount}}元(扣除基础提现费1.00元<span v-if="d0fee">，特别提现费{{d0fee}}元</span>)
            </div>
            <div class="alert"
                 v-show="moreThanTotal">超出可提现余额，请重新输入
            </div>
            <br>
            <span class="title">提现的规则是什么？</span>
            <span class="title"
                  v-link="'/commonProblem/cash'">了解更多></span><br>
            1、在平台储备金范围内，支持所有人任何时间立即提现；<br>
            <span>2、储备金会及时调整增加额度，不过如果提现金额暴增也存在小概率的额度不足不能当日提现的可能，一旦发生这种情况请您耐心等待到第二个工作日中午12:00后正常提现。</span><br>
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
  import my from 'api/my'
  import { alert, confirm } from 'tools/utils'

  export default {
    vuex: {
      getters: {}
    },
    data () {
      return {
        payShown: false,
        cardSelectorShown: false,
        chosenCard: {},
        orderId: '',
        withdraw: '',
        maxMoney: '',
        t1amount: 0,
        total: 0,
        d0rate: 0,
        d0fee: '',
        pwd: '',
        bankcardList: [],
        lastCardId: '',
        isWorkDay: true,
        d0feeShown: false,
        moreThanTotal: false,
        showTip: false,
        showTipCode: 0,
      }
    },
    methods: {
      chooseCard (card) {
        this.chosenCard = card
      },
      toggleCardSelectorShown (e) {
        this.cardSelectorShown = e
      },
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
          } else {
            this.$nextTick(() => {
              if (this.validList &&
                this.validList.length > 0) {
                const e = this.validList[0]
                const obj = {}
                obj.text = `${e.c_bank_name ||
                '银行卡'}-${e.c_bank_account}`
                obj.id = e.id
                this.chosenCard = obj
              }
            })
          }
        })
      },
      getOrderId () {
        pay.getOrderId().then((json) => {
          this.orderId = json
        })
      },
      ShowPwdFn () {
        const todayNow = Date.now()
        const startDay = new Date('2017-01-27T00:00+08:00').getTime()
        const endDay = new Date('2017-01-30T00:00+08:00').getTime()
        if (todayNow > startDay && todayNow < endDay) {
          confirm(
            '由于支付公司春节无法结算，1月27日00:00至1月29日24:00暂不支持提现，' +
            '其他业务不受影响。',
            '27日至29日暂不支持提现',
            [{
              text: '知道了'
            }]
          )
          return
        }
        const today = new Date()
        const tdHours = today.getHours()
        const tdMinutes = today.getMinutes()
        if (
          (tdHours === 22 && tdMinutes >= 45) ||
          (tdHours === 23 && tdMinutes <= 15)
        ) {
          alert('每日 22:45 至 23:15 为支付系统结算时间，请您稍后再尝试提现')
          return
        }
        const amt = parseFloat(this.withdraw)
        if (!amt || amt < 1) {
          alert('提现金额需大于1元')
        } else if (amt > this.maxMoney) {
          if (!this.total) {
            alert('您当前没有可提现余额，可能有部分钱款还处于在途状态')
          } else if (amt > this.total) {
            alert(`提现金额不得大于${this.maxMoney}元`)
          } else if (this.maxMoney < this.total) {
            const date = new Date()
            const hours = date.getHours()
            if (!this.isWorkDay) {
              alert('由于提现人数过多，平台的储备金额度不够啦，' +
                '我们下个工作日会再次加款的，请下个工作日12点后再次尝试提现吧')
            } else if (hours > 12) {
              alert('由于提现人数过多，平台的储备金额度不够啦，' +
                '我们第二个工作日会再次加款的，请第二个工作日12点后再次尝试提现吧')
            } else {
              alert('由于提现人数过多，平台的储备金额度不够啦，' +
                '我们下午会再次加款的，请12点后再次尝试提现吧')
            }
          } else {
            alert(`提现金额不得大于${this.maxMoney}元`)
          }
        } else if (!this.chosenCard.id) {
          alert('请选择一张银行卡')
        } else if (parseFloat(this.realAmount) <= 0) {
          alert('您的提现金额过小，请重新输入')
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
      toWithdraw () {
        if (this.chosenCard.id) {
          return pay.withdraw({
            cardNum: this.chosenCard.id,
            orderId: this.orderId,
            pwd: md5(md5(this.pwd)),
            withdrawMoney: parseFloat(this.withdraw)
          })
        }
        return new Promise((resolve, reject) => {
          reject('请选择一张银行卡')
        }).catch((err) => {
          alert(err)
        })
      },
      changePayInfo (e) {
        this.pwd = e.password
      },
      success (e) {
        if (e) {
          window._JHsdk.action({
            event: 'hx_ac11',
          })
//          feedback('提现成功，请关注您的银行卡余额变化')
          this.$store.state.money = this.withdraw
          this.$store.state.bankCard = this.chosenCard
          this.getWallet()
          this.withdraw = ''
          this.$router.go('/cashSuccess')
        }
        this.togglePayShown(false)
        this.getOrderId()
      },
      getWallet () {
        my.getMyAccountList().then((json) => {
          const max = json.n_sys_withdraw_amt
          this.d0rate = json.n_sys_withdraw_rate
          this.total = json.n_amt
          this.isWorkDay = json.b_working_day
          if (json.n_withdraw_amt > 0) {
            this.t1amount = json.n_withdraw_amt
          } else {
            this.t1amount = 0
          }
          if (max > 0) {
            this.maxMoney = max
          } else {
            this.maxMoney = 0
          }
        })
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
    watch: {
      withdraw (e) {
        const amt = parseFloat(e)
        if (amt > this.total) {
          this.moreThanTotal = true
          this.d0feeShown = false
        } else if (amt > 0) {
          this.d0feeShown = true
          this.moreThanTotal = false
        } else {
          this.d0feeShown = false
          this.moreThanTotal = false
        }
      }
    },
    computed: {
      placeholder () {
        const max = this.maxMoney
        return `最多可提现${max}元`
      },
      realAmount () {
        const withdrawAmount = parseFloat(this.withdraw) || 0
        let d0fee = 0
        if (withdrawAmount > this.t1amount) {
          d0fee = (withdrawAmount - this.t1amount) * this.d0rate
          if (d0fee < 1) {
            d0fee = 1
          }
        }
        return (withdrawAmount - 1 - d0fee).toFixed(2)
      },
      validList () {
        return this.bankcardList.filter(e => e.b_valid)
      },
      computedList () {
        return this.validList.map((e) => {
          const obj = {}
          obj.text = `${e.c_bank_name || '银行卡'}-${e.c_bank_account}`
          obj.id = e.id
          return obj
        })
      },
      d0fee () {
        const withdrawAmount = parseFloat(this.withdraw) || 0
        let d0fee = 0
        if (withdrawAmount > this.t1amount) {
          d0fee = (withdrawAmount - this.t1amount) * this.d0rate
          if (d0fee < 1) {
            d0fee = 1
          }
          return d0fee.toFixed(2)
        }
        return 0
      }
    },
    components: {
      payMoney,
      selector
    },
    created () {
      this.getPayInfo()
      this.getOrderId()
      this.getWallet()
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
    margin: 10px;
    font-size: $TIP_FONT_SIZE;
    span {
      color: $MINOR_COLOR;
    }
  }

  .alert-box {
    width: 100%;
    text-align: justify;
  }

  .alert {
    color: $MAIN_COLOR;
    margin-bottom: 10px;
    text-align: right;
    width: 100%;
  }

  .title {
    font-weight: bold;
    line-height: 2;
    & + .title {
      float: right;
    }
  }

  .learn-more {
    text-align: center;
    margin-top: 10px;
  }
</style>
