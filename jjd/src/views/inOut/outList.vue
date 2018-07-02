<template>
  <div>
    <backdrop :backdrop-show="selectPayway"
              @close="cancel"></backdrop>
    <div class="select-payway"
         v-show="selectPayway"
         transition="slide-bottom">
      <group>
        <ele @click="toPayOnline">
          <div class="tip-box">
            <span>我要线上还款（无需对方确认）</span>
            <span class="tip-alert"
                  @click.stop.prevent="tipAlertOnline"></span>
          </div>
        </ele>
        <ele @click="toPayOffline">
          <div class="tip-box">
            <span>我已线下还款（需要对方确认）</span>
            <span class="tip-alert"
                  @click.stop.prevent="tipAlertOffline"></span>
          </div>
        </ele>
        <ele @click="cancel">
          <div>取消</div>
        </ele>
      </group>
    </div>
    <pay-money :show="payShown"
               :edit-amount="chosenList.length == 1"
               :edit-way="true"
               :amount="totalAmount"
               :real-amount="realAmount"
               :fn="payIt"
               :confirm-fn="confirmFn"
               :offline-fee="offlineFee"
               :repay="true"
               :order-id="orderId"
               @back="getOrderId"
               @confirm="changeConfirmInfo"
               @change-info="changePayInfo"
               @success="success"
               @toggle-pay="togglePayShown"></pay-money>
    <div class="fixed">
      <ele>
        <div class="checkbox"
             @click.stop.prevent="chooseAll">
          <div :class="{chosen:chosenList.length==currentListLength&&chosenList.length>0}"></div>
          <div class="desc">
            <div>待支付 <span>{{totalAmountShow}}</span> 元</div>
          </div>
        </div>
        <button slot="right"
                @click="next">支付
        </button>
      </ele>
    </div>
    <group :first="true">
      <ele class="no-padding">
        <div class="nav">
          <div :class="{selected: currentPage == 'all'}"
               @click="setPage('all')">
            <div>待还总额</div>
            <div>{{allAmount}}</div>
          </div>
          <div :class="{selected: currentPage == 'week'}"
               @click="setPage('week')">
            <div>7天待还</div>
            <div>{{weekAmount}}</div>
          </div>
          <div :class="{selected: currentPage == 'month'}"
               @click="setPage('month')">
            <div>30天待还</div>
            <div>{{monthAmount}}</div>
          </div>
        </div>
      </ele>
    </group>
    <group v-show="allList.length === 0">
      <no-data :url="url"
               :text="'暂时没有待还哦'"></no-data>
    </group>
    <group v-show="uncheckList.length">
      <ele :danger="true" :more="true" @click="toOfflineRepayList">您有 {{uncheckList.length}}笔 线下还款没有被确认</ele>
    </group>
    <group v-if="currentPage == 'all'">
      <ele :more="true"
           v-for="ele in allList"
           :link="'/iouDetail/' + ele.c_iou_id">
        <div class="checkbox"
             @click.stop="choose(ele.c_iou_installment_list_id)">
          <div :class="{chosen: chosenList.includes(ele.c_iou_installment_list_id)}"></div>
          <div class="desc">
            <div v-if="ele.n_amt > 0">{{ele.n_amt}} 元</div>
            <div v-else>暂无待还金额</div>
            <div>[{{ele.n_cur_tms}}/{{ele.n_total_tms}}]
                 {{ele.c_name}} - {{ele.c_purpose}} - {{ele.b_online ? '线上' : '线下'}}
            </div>
          </div>
        </div>
        <div slot="right"
             :class="{overdue: ele.n_left_tm < 0}"
             class="status">
          <div>{{statusText(ele.n_left_tm)}}</div>
        </div>
      </ele>
    </group>
    <group v-if="currentPage == 'week'">
      <ele :more="true"
           v-for="ele in weekList"
           :link="'/iouDetail/' + ele.c_iou_id">
        <div class="checkbox"
             @click.stop="choose(ele.c_iou_installment_list_id)">
          <div :class="{chosen: chosenList.includes(ele.c_iou_installment_list_id)}"></div>
          <div class="desc">
            <div v-if="ele.n_amt > 0">{{ele.n_amt}} 元</div>
            <div v-else>暂无待还金额</div>
            <div>[{{ele.n_cur_tms}}/{{ele.n_total_tms}}]
                 {{ele.c_name}} - {{ele.c_purpose}} - {{ele.b_online ? '线上' : '线下'}}
            </div>
          </div>
        </div>
        <div slot="right"
             :class="{overdue: ele.n_left_tm < 0}"
             class="status">
          <div>{{statusText(ele.n_left_tm)}}</div>
        </div>
      </ele>
    </group>
    <group v-if="currentPage == 'month'">
      <ele :more="true"
           v-for="ele in monthList"
           :link="'/iouDetail/' + ele.c_iou_id">
        <div class="checkbox"
             @click.stop="choose(ele.c_iou_installment_list_id)">
          <div :class="{chosen: chosenList.includes(ele.c_iou_installment_list_id)}"></div>
          <div class="desc">
            <div v-if="ele.n_amt > 0">{{ele.n_amt}} 元</div>
            <div v-else>暂无待还金额</div>
            <div>[{{ele.n_cur_tms}}/{{ele.n_total_tms}}]
                 {{ele.c_name}} - {{ele.c_purpose}} - {{ele.b_online ? '线上' : '线下'}}
            </div>
          </div>
        </div>
        <div slot="right"
             :class="{overdue: ele.n_left_tm < 0}"
             class="status">
          <div>{{statusText(ele.n_left_tm)}}</div>
        </div>
      </ele>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import md5 from 'js-md5'
  import backdrop from 'components/basic/backdrop'
  import noData from 'components/output/noData'
  import payMoney from 'components/output/payMoney'
  import my from 'api/my'
  import pay from 'api/pay'
  import { setTempInfo } from 'store/actions'
  import { normal } from 'tools/share'
  import { alert, feedback } from 'tools/utils'

  export default{
    vuex: {
      getters: {
        currentShare: state => state.currentShare
      },
      actions: { setTempInfo }
    },
    data () {
      return {
        url: require('../../assets/noDataOut.svg'),
        orderId: '',
        allAmount: '',
        currentPage: 'all',
        chosenList: [],
        allList: [],
        payShown: false,
        tempAmount: '',
        payWay: '账户余额',
        onLine: false,
        selectPayway: false,
        payOrder: '',
        payToken: '',
        offlineFee: 0,
        cardNum: '',
        uncheckList: [],
      }
    },
    components: {
      payMoney,
      backdrop,
      noData
    },
    computed: {
      weekList () {
        return this.allList.filter(e => e.n_left_tm <= 7)
      },
      monthList () {
        return this.allList.filter(e => e.n_left_tm <= 30)
      },
      weekAmount () {
        return this.sum(this.weekList)
      },
      monthAmount () {
        return this.sum(this.monthList)
      },
      totalAmountShow () {
        let total = 0
        this.allList.forEach((item) => {
          if (this.chosenList.includes(
              item.c_iou_installment_list_id
            )) {
            total += parseFloat(item.n_amt)
          }
        })
        return total.toFixed(2)
      },
      totalAmount () {
        let total = 0
        if (this.chosenList.length === 1 && this.tempAmount) {
          total = this.tempAmount
        } else {
          this.allList.forEach((item) => {
            if (this.chosenList.includes(
                item.c_iou_installment_list_id
              )) {
              total += parseFloat(item.n_amt)
            }
          })
        }
        return total.toFixed(2)
      },
      totalAmount2 () {
        let total = 0
        this.onLine = false
        if (this.chosenList.length === 1 && this.tempAmount) {
          if (this.computedChosenList[0] &&
            this.computedChosenList[0].b_online) {
            this.onLine = true
            total = this.tempAmount
          } else {
            total = this.tempAmount * 1.005
            this.offlineFee = this.tempAmount * 0.005
          }
        } else {
          let fee = 0
          this.allList.forEach((item) => {
            if (this.chosenList.includes(
                item.c_iou_installment_list_id
              )) {
              if (item.b_online) {
                this.onLine = true
                total += parseFloat(item.n_amt)
              } else {
                total += parseFloat(item.n_amt) * 1.005
                fee += parseFloat(item.n_amt) * 0.005
              }
            }
          })
          this.offlineFee = fee
        }
        return parseFloat(total.toFixed(3))
      },
      currentListLength () {
        const c = `${this.currentPage}List`
        return this[c].length
      },
      currentChosenList () {
        return this.allList.filter(
          e => this.chosenList.includes(
            e.c_iou_installment_list_id
          ))
      },
      computedChosenList () {
        return this.currentChosenList.map((item, k, a) => {
          const l = Object.assign({}, item)
          if (a.length === 1) {
            l.amt = this.tempAmount || item.n_amt
          } else {
            l.amt = item.n_amt
          }
          return l
        })
      },
      realAmount () {
        let lendAmount = 0
        const t = parseFloat(this.totalAmount2)
        lendAmount = t
        if (lendAmount < 500 && this.payWay !== '账户余额') {
          lendAmount += 2.5
        }
        const lendAmountString = lendAmount.toString()
        let last = 0
        if (lendAmountString.split('.')[1]) {
          last = lendAmountString.split('.')[1].split('')[2]
        }
        if (last > 4) {
          return (
            Math.ceil(parseInt((lendAmount * 100).toFixed(0), 10)) / 100
          ).toFixed(2)
        }
        return (
          Math.floor(parseInt((lendAmount * 100).toFixed(0), 10)) / 100
        ).toFixed(2)
      }
    },
    methods: {
      toSelectPayway () {
        this.selectPayway = true
      },
      cancel () {
        this.selectPayway = false
      },
      toPayOnline () {
        this.cancel()
        this.togglePayShown(true)
      },
      toPayOffline () {
        this.$router.go('/offlineRepay')
      },
      toOfflineRepayList () {
        this.$router.go('/offlineRepayListBorrow')
      },
      setPage (e) {
        this.currentPage = e
        this.chosenList = []
      },
      statusText (e) {
        let text = `剩余 ${e} 天`
        switch (true) {
          case parseInt(e, 10) < 0:
            text = `逾期 ${-e} 天`
            break
          case parseInt(e, 10) === 0:
            text = '今天是还款日'
            break
          default:
        }
        return text
      },
      sum (e) {
        if (e.length < 1) return '0.00'
        if (e.length === 1) {
          return parseFloat(e[0].n_amt).toFixed(2)
        }
        let result = 0
        e.forEach((item) => {
          result += parseFloat(item.n_amt)
        })
        return result.toFixed(2)
      },
      choose (id) {
        if (this.chosenList.includes(id)) {
          const index = this.chosenList.indexOf(id)
          this.chosenList.splice(index, 1)
        } else {
          this.chosenList.push(id)
        }
      },
      chooseAll () {
        const c = `${this.currentPage}List`
        if (this.chosenList.length !== this[c].length) {
          this.chosenList = []
          this[c].forEach((item) => {
            this.chosenList.push(item.c_iou_installment_list_id)
          })
        } else {
          this.chosenList = []
        }
      },
      getToRepayList () {
        my.getToRepayList().then((json) => {
          this.allAmount = json.n_amt
          this.allList = json.l_repay_list
          this.uncheckList = json.l_uncheck_list
        })
      },
      next () {
        if (this.chosenList.length > 0) {
          if (this.onLine) {
            this.toPayOnline()
          } else {
            this.toSelectPayway()
          }
        }
      },
      togglePayShown (e) {
        this.tempAmount = ''
        this.payShown = e
      },
      getOrderId () {
        pay.getOrderId().then((json) => {
          this.orderId = json
        })
      },
      changePayInfo (e) {
        this.cardNum = e.cardNum
        this.tempAmount = e.amount
        this.payWay = e.payWay
        this.password = e.password
      },
      changeConfirmInfo (e) {
        this.payOrder = e.order
        this.payToken = e.token
      },
      payIt () {
        return pay.repay({
          cardNum: this.cardNum,
          orderId: this.orderId,
          idList: this.computedChosenList,
          amount: parseFloat(this.totalAmount),
          password: md5(md5(this.password)),
          payWay: this.payWay === '账户余额' ? 0 : 1,
          offlineWay: ''
        })
      },
      confirmFn (code) {
        return pay.repayConfirm({
          orderId: this.orderId,
          idList: this.computedChosenList,
          amount: parseFloat(this.totalAmount),
          payOrder: this.payOrder,
          payToken: this.payToken,
          payCode: code
        })
      },
      success (e) {
        if (e) {
          window._JHsdk.action({
            event: 'hx_ac10'
          })
          feedback('还款成功')
        }
        this.chosenList = []
        this.tempAmount = ''
        this.togglePayShown(false)
        this.getToRepayList()
        this.getOrderId()
      },
      tipAlertOnline () {
        alert('【线上还款】指的是平台内通过钱包余额或绑定的银行卡支付。')
      },
      tipAlertOffline () {
        alert('【线下还款】指的是在平台外通过现金/支付宝/微信/银行卡转账等途径支付；' +
          '<br>【线下还款】需要对方确认收到款才生效。')
      }
    },
    route: {
      deactivate ({ next }) {
        // 缓存表单
        this.setTempInfo({
          offlineRepay: {
            chosenList: this.computedChosenList,
            totalAmount: this.totalAmount
          }
        })
        next()
      }
    },
    created () {
      this.getToRepayList()
      this.getOrderId()
      if (this.currentShare !== 'index') {
        normal()
      }
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/fragment";

  .no-padding {
    padding: 0 !important;
  }

  .nav {
    @extend %in-out-list-nav;
  }

  .desc,
  .status {
    display: flex;
    flex-direction: column;
    :first-child {
      margin: 15px 0 10px;
    }
    :last-child {
      margin-bottom: 15px;
    }
  }

  .desc {
    :first-child {
      color: $MAIN_COLOR;
    }
    :last-child {
      color: $TIP_COLOR;
      font-size: $TIP_FONT_SIZE;
    }
  }

  .status {
    font-size: $TIP_FONT_SIZE;
    color: $TIP_COLOR;
  }

  .overdue {
    color: $MINOR_COLOR;
    :last-child {
      display: block;
    }
  }

  .checkbox {
    display: flex;
    align-items: center;
    > :first-child {
      @extend %checkbox;
    }
  }

  .fixed {
    @extend %checkbox-bar;
    z-index: 2;
  }

  .slide-bottom {
    &-transition {
      transition: .2s;
      transform: translateY(0);
    }
    &-enter,
    &-leave {
      transform: translateY(100%);
    }
  }

  .select-payway {
    @extend %fixed-bottom;
    z-index: 3;
    div {
      flex: 1;
      text-align: center;
    }
    .group::after {
      display: none !important;
    }
    .tip-box {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .tip-alert {
      width: 40px;
      height: 30px;
      background: url("../../assets/info.svg") center no-repeat {
        size: 12px;
      }
      margin-left: -10px;
    }
  }
</style>
