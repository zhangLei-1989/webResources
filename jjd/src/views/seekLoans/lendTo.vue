<template>
  <div>
    <pay-money :show="payShown"
               :edit-amount="false"
               :edit-way="true"
               :amount="lendAmount"
               :real-amount="realAmount"
               :fn="payIt"
               :confirm-fn="confirmFn"
               :order-id="orderId"
               @back="getOrderId"
               @confirm="changeConfirmInfo"
               @change-info="changePayInfo"
               @success="success"
               @toggle-pay="togglePayShown"></pay-money>
    <group :fixed="true">
      <btn :text="'下一步'"
           :cut="1"
           :next="true"
           :btn-fn="next"></btn>
    </group>
    <group :first="true">
      <ele :more="true"
           :link="'/chooseGuarantor'"
           v-if="realList.length > 0">
        <div>选择担保人</div>
        <div v-if="guarantor && guarantor.c_name"
             slot="right">{{guarantor.c_name}}
        </div>
        <div v-else
             slot="right">点击选择担保人
        </div>
      </ele>
      <ele v-else>
        <div>选择担保人</div>
        <div slot="right">无可选担保人</div>
      </ele>
    </group>
    <group>
      <ele>
        <div>出借金额</div>
        <input v-if="guarantor"
               growing-track="true"
               slot="right"
               type="number"
               @blur="blur"
               :placeholder="'不超过' + Math.min(guarantorList.amount, guarantee.lastAmt || 0)"
               v-model="lendAmount">
        <input v-else
               growing-track="true"
               slot="right"
               v-model="lendAmount"
               type="number"
               @blur="blur"
               :placeholder="'不超过' + guarantee.lastAmt">
        <div slot="unit">元</div>
      </ele>
      <ele :no-line="true"
           class="computed-amount"
           :class="{last: !lendAmount}">
        <div>
          <!--利息{{computedRate}} + 服务费{{computedFee}}-->
          预计总收益:
          <span>{{computedIncome}}</span>
          元

        </div>
      </ele>
      <ele v-if="lendAmount">
        <div class="box">
          <div class="computed-list">
            <ele :transparent="true"
                 :no-line="true"
                 class="title">
              <div>【 收款计划 】</div>
            </ele>
            <ele :transparent="true"
                 :dashed="true"
                 v-for="list in computedList">
              <div>{{list.date}}</div>
              <div>¥{{list.amount}}</div>
            </ele>
          </div>
        </div>
      </ele>
      <div slot="tip_bottom"
           class="tip_box">
        <div style="width: 40px; height: 40px"
             @click="toggleCheck">
          <div class="checkbox"
               :class="{chosen: checked}"></div>
        </div>
        已阅读并同意<a @click="goService">《今借到借款协议》</a>
      </div>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import md5 from 'js-md5'
  import selector from 'components/mixin/selector'
  import payMoney from 'components/output/payMoney'
  import pay from 'api/pay'
  import { setTempInfo } from 'store/actions'
  import { alert, feedback, confirm } from 'tools/utils'

  export default{
    vuex: {
      getters: {
        userId: state => state.userInfo.userId,
        tempGuarantorList: state => state.temp.guarantorList.guarantorList,
        guarantorList: state => state.temp.guarantorList,
        lendTo: state => state.temp.lendTo,
        guarantor: state => state.temp.guarantorList.guarantor || '',
        guarantee: state => state.temp.guarantee
      },
      actions: { setTempInfo }
    },
    data () {
      const d = new Date()
      return {
        orderId: '',
        id: '',
        amount: '',
        lendAmount: '',
        fee: '',
        date: {
          y: d.getFullYear(),
          m: d.getMonth() + 1,
          d: d.getDate()
        },
        rate: '',
        repayType: '',
        repayTimes: '',
        password: '',
        payWay: '',
        guarantor: {},
        offlineWay: '',
        payShown: false,
        payOrder: '',
        payToken: '',
        checked: false,
        cardNum: '',
        mustGuarantee: false,
      }
    },
    components: {
      selector,
      payMoney
    },
    computed: {
      realList () {
        if (!this.tempGuarantorList) return []
        return this.tempGuarantorList.filter((e) => {
          if ((e.n_amt - e.n_used_amt) > 0) {
            return e.c_id !== this.userId
          }
          return false
        })
      },
      guarantorListAdded () {
        return ['不需要'].concat(this.tempGuarantorList)
      },
      computedDays () {
        const start = new Date()
        const d0 = this.date
        const end = new Date(d0.y, parseInt(d0.m, 10) - 1, d0.d)
        const m = end - start
        const d = Math.ceil(m / (24 * 3600 * 1000))
        return d > 0 ? d : 0
      },
      computedRate () {
        const r = this.computedAmount
          - parseInt(this.lendAmount || 0, 10)
        return r.toFixed(2)
      },
      computedAmount () {
        let cAmount = 0
        this.computedList.forEach((item) => {
          cAmount += parseFloat(item.amount)
        })
        if (cAmount < parseInt(this.lendAmount || 0, 10)) {
          cAmount = parseInt(this.lendAmount || 0, 10)
        }
        return cAmount.toFixed(2)
      },
      computedFee () {
        const r = parseInt(this.fee, 10)
          * parseInt(this.lendAmount || 0, 10)
          / parseInt(this.amount, 10)
        return (r || 0).toFixed(2)
      },
      computedIncome () {
        const r = parseFloat(this.computedRate)
//                    + parseFloat(this.computedFee)
        return r.toFixed(2)
      },
      times () {
        let n = 1
        if (this.repayType === '等额本息') {
          n = parseInt(this.repayTimes, 10)
        } else {
          n = 1
        }
        return n || 1
      },
      perMonth () {
        let r = 0
        if (this.times === 1) {
          r = parseInt(this.lendAmount || 0, 10)
            * parseInt(this.rate, 10) / 36500
            * this.computedDays
            + parseInt(this.lendAmount || 0, 10)
        } else if (this.rate === '0%' || this.rate === 0) {
          r = parseInt(this.lendAmount || 0, 10) / this.times
        } else {
          const monthRate = parseInt(this.rate, 10) / 1200
          r = parseInt(this.lendAmount || 0, 10)
            * (monthRate * Math.pow(1 + monthRate, this.times))
            / (Math.pow(1 + monthRate, this.times) - 1)
        }
        return (r || 0).toFixed(2)
      },
      computedList () {
        const cList = []
        if (this.repayType === '等额本息') {
          for (let i = 0; i < this.times; i += 1) {
            const d = new Date()
            const thisDate
              = new Date(d.setMonth(d.getMonth() + i + 1))
            let tMonth = thisDate.getMonth() + 1
            if (tMonth < 10) {
              tMonth = `0${tMonth}`
            }
            let tDate = thisDate.getDate()
            if (tDate < 10) {
              tDate = `0${tDate}`
            }
            cList.push({
              date: `${thisDate.getFullYear()}-`
              + `${tMonth}-`
              + `${tDate}`,
              amount: this.perMonth
            })
          }
        } else {
          cList.push({
            date: `${this.date.y}-${this.date.m}-${this.date.d}`,
            amount: this.perMonth
          })
        }
        return cList
      },
      realAmount () {
        const lendAmount = parseFloat(this.lendAmount || 0)
        if (lendAmount < 500 && this.payWay !== '账户余额') {
          return (lendAmount + 2.5).toFixed(2)
        }
        return lendAmount.toFixed(2)
      }
    },
    methods: {
      getCapitalLeft () {
        pay.getCapitalLeft().then((json) => {
          if (!json) {
            confirm('由于今借到交易量飞速增长，' +
              '平台今天准备的储备金已经被小伙伴们取光光啦，' +
              '所以现在借到的钱需要等到第二个工作日正常提现。' +
              '如果借款人急需马上提现,' +
              '建议您暂时通过补借条线下出借。' +
              '我们也在努力提供更充足的储备金支持更多的小伙伴们当日提现，' +
              '感谢您的理解与支持。',
              '今日提现福利已被领完<br/>提现需等第二个工作日<br/>急需用钱请暂用补借条',
              [{
                text: '知道了',
                fn () {
                }
              }])
            return
          }
        })
      },
      blur () {
        this.lendAmount = parseInt(this.lendAmount || 0, 10)
      },
      goService () {
        this.$router.go({
          path: '/iouService7/0',
          replace: false
        })
      },
      toggleCheck () {
        this.checked = !this.checked
        this.payShown = false
      },
      getMin () {
        const min = Math.min(
          this.guarantorList.guaranteeAmt,
          this.guarantee.lastAmt
        )
        return min
      },
      togglePayShown (e) {
        this.payShown = e
      },
      toggleGuarantorSelectorShown (e) {
        this.guarantorSelectorShown = e
      },
      getOrderId (type) {
        pay.getOrderId(type).then((json) => {
          this.orderId = json
        })
      },
      changePayInfo (e) {
        if (this.lendAmount !== e.amount) {
          this.lendAmount = e.amount
        }
        this.cardNum = e.cardNum
        this.payWay = e.payWay
        this.password = e.password
      },
      changeConfirmInfo (e) {
        this.payOrder = e.order
        this.payToken = e.token
      },
      next () {
        if (this.mustGuarantee && !this.guarantor.c_id) {
          alert('对方目前的年龄不足 22 周岁，' +
            '您至少要选择 1 名担保人，' +
            '才可以正常出借给对方')
        } else if (!this.lendAmount || parseFloat(this.lendAmount) <= 0) {
          alert('请输入正确的出借金额')
        } else if (this.lendAmount % 1 !== 0) {
          alert('出借金额应为整数')
        } else if (this.guarantor &&
          this.lendAmount > Math.min(
            this.guarantorList.guaranteeAmt,
            this.guarantee.lastAmt
          )) {
          alert('出借金额不得大于有效担保金额')
        } else if (!this.guarantor &&
          this.lendAmount > this.guarantee.lastAmt) {
          alert('出借金额不得大于剩余借款金额')
        } else if (!this.checked) {
          alert('请同意今借到借款协议')
        } else {
          this.togglePayShown(true)
        }
      },
      payIt () {
        return pay.payBid({
          cardNum: this.cardNum,
          orderId: this.orderId,
          id: this.id,
          guarantor: this.guarantor.c_id || '',
          lendAmount: this.lendAmount,
          password: md5(md5(this.password)),
          payWay: this.payWay === '账户余额' ? 0 : 1,
          offlineWay: this.offlineWay
        })
      },
      confirmFn (code) {
        return pay.payBidConfirm({
          orderId: this.orderId,
          id: this.id,
          guarantor: this.guarantor.c_id || '',
          lendAmount: this.lendAmount,
          payOrder: this.payOrder,
          payToken: this.payToken,
          payCode: code
        })
      },
      success (e) {
        if (e) {
          window._JHsdk.action({
            event: 'hx_ac6',
            params: {
              id: this.id,
              order: this.orderId,
            }
          })
          this.togglePayShown(false)
          feedback('出借成功')
          window.history.go(-1)
        } else {
          this.togglePayShown(false)
          this.getOrderId()
        }
      }
    },
    route: {
      deactivate ({ next }) {
        // 缓存表单
        this.setTempInfo({ lendTo: this.$data })
        next()
      },
      data ({ to: { params: { id, must } } }) {
        this.id = id
        this.mustGuarantee = !!must
      }
    },
    created () {
      // 应用表单缓存
      Object.assign(
        this.$data, this.lendTo,
        this.guarantorList, this.tempGuarantorList
      )
      if (this.userId) {
        this.getCapitalLeft()
      }
      this.getOrderId()
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import '../../scss/fragment';

  .checkbox {
    width: 16px;
    height: 16px;
    @extend %checkbox;
    margin: 12px;
    line-height: 40px;
    border: 1px solid $TIP_COLOR !important;
  }

  .chosen.checkbox::before {
    width: 6px !important;
    height: 10px !important;
    top: 2px;
    left: 5px;
  }

  .tip_box {
    display: flex;
    line-height: 40px;
    font-size: $MIN_FONT_SIZE;
    color: $TIP_COLOR;
    a {
      color: $MAIN_COLOR;
    }
  }

  .computed-list {
    @extend %computed-list;
  }

  .box {
    flex: 1;
  }

  .computed-amount {
    min-height: 0 !important;
    padding-top: 1em !important;
    div {
      flex: 1;
      text-align: right;
      font-size: $TIP_FONT_SIZE;
      color: $TIP_COLOR;
    }
    span {
      color: $MAIN_COLOR;
    }
    &.last {
      padding-bottom: 1em !important;
    }
  }
</style>
