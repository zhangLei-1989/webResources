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
    <div class="plan-fixed"
         :class="{bottom: !cuishou && !weiyue && !fankui && !luotiao}"
         transition="slide-in"
         v-if="!over&&currentPage=='plan'&&(type==1||(type==3&&plan.b_over_due==1))">
      <ele>
        <div class="checkbox"
             @click.stop="chooseAll">
          <div :class="{chosen:chosenList.length==availablePlanList.length&&chosenList.length>0}"></div>
          <div class="desc">
            <div>待支付 <span>{{totalAmount}}</span> 元</div>
          </div>
        </div>
        <div slot="right"
             class="button"
             @click="next">马上还款
        </div>
      </ele>
    </div>
    <div @click="ioucontent"
         class="head">
      <div class="desc">
        <div>
          {{reason}}<span v-if="addReason">（{{getAddReason(addReason)}}<span v-if="addReason.length > 10">...</span>）</span>
        </div>
        <div class="desc_con">
          <div><span>借款人 {{borrower}}</span>
            <btn :cut="2"
                 :text="'信用报告'"
                 :min="true"
                 :btn-fn="creditReport">
            </btn>
          </div>
          <div><span>出借人 {{lender}}</span>
            <btn :cut="2"
                 :text="'信用报告'"
                 :min="true"
                 :btn-fn="creditReport1">
            </btn>
          </div>
          <div v-if="guarantor"><span>担保人 {{guarantor}}</span>
            <btn :cut="2"
                 :text="'信用报告'"
                 :min="true"
                 :btn-fn="creditReport2">
            </btn>
          </div>
        </div>
        <!--<div>借条编号 {{id}}</div>-->
        <!--<div>借款时间 {{startDate}} 至 {{endDate}}</div>-->
      </div>
      <div class="more"></div>
    </div>
    <group class="amount-list">
      <ele class="line">
        <!--style="color: #fff"-->
        <div class="box">
          <div>
            <div>借款金额</div>
            <div>{{amount}}</div>
          </div>
          <div>
            <div>利率</div>
            <div>{{rate}}%</div>
          </div>
          <div>
            <div>服务费</div>
            <div>{{serviceFee}}</div>
          </div>
          <div>
            <div>担保费</div>
            <div>{{guaranteeFee||0}}</div>
          </div>
        </div>
      </ele>
    </group>
    <group>
      <ele class="nav">
        <div class="box">
          <div :class="{chosen: currentPage == 'plan'}"
               v-if="type === 1 || type === 3"
               @click="changePage('plan')">
            <div>待还</div>
            <div>{{planAmount}}</div>
          </div>
          <div :class="{chosen: currentPage == 'plan'}"
               v-else
               @click="changePage('plan')">
            <div>待收</div>
            <div>{{planAmount}}</div>
          </div>
          <div v-show="!onLine" :class="{chosen: currentPage == 'uncheck'}" @click="changePage('uncheck')">
            <div>待确认</div>
            <div>{{toCheckAmt}}</div>
          </div>
          <!--<div :class="{chosen: currentPage == 'record'}"-->
               <!--v-if="type === 1 || type === 3"-->
               <!--@click="changePage('record')">-->
            <!--<div>已还</div>-->
            <!--<div>{{recordAmount}}</div>-->
          <!--</div>-->
          <!--<div :class="{chosen: currentPage == 'record'}"-->
               <!--v-else-->
               <!--@click="changePage('record')">-->
            <!--<div>已还</div>-->
            <!--<div>{{recordAmountLender}}</div>-->
          <!--</div>-->
        <!--</div>-->
          <div :class="{chosen: currentPage == 'record'}"
               v-if="type === 1 || type === 3"
               @click="changePage('record')">
            <div>已还</div>
            <div>{{repaidAmt}}</div>
          </div>
          <div :class="{chosen: currentPage == 'record'}"
               v-else
               @click="changePage('record')">
            <div>已还</div>
            <div>{{receivedAmt}}</div>
          </div>
        </div>
      </ele>
    </group>

    <div v-if="currentPage == 'plan'">
      <group class="plan-list"
             v-for="plan in computedPlanList">
        <ele @click.stop="choose(plan)"
             :class="{over: plan.b_end == '1', overdue: plan.n_left_tm < 0}">
          <div class="checkbox"
               :class="{disabled: type == 2}">
            <div :class="{chosen: chosenList.includes(plan.c_iou_installment_list_id)}">{{$index + 1}}</div>
            <div class="desc">
              <div class="tip-box">
                <span v-if="plan.b_end && !(type === 1 || type === 3)">{{(plan.n_amt + plan.n_interest_amt + plan.n_overdue_amt).toFixed(2)}} 元</span>
                <span v-if="plan.b_end && (type === 1 || type === 3)">{{(plan.n_amt + plan.n_interest_amt + plan.n_overdue_amt + plan.n_overdue_to_us_amt).toFixed(2)}} 元</span>
                <span v-if="!plan.b_end && (type === 1 || type === 3)">{{plan.n_to_repay_amt}} 元</span>
                <span v-if="!plan.b_end && !(type === 1 || type === 3)">{{plan.n_to_gathering_amt}} 元</span>
                <span class="tip-alert"
                      @click.stop.prevent="tipAlertDetail(plan)"></span>
              </div>
              <!--<div style="font-size: 12px">[{{plan.n_cur_tms}}/{{plan.n_total_tms}}]期</div>-->
            </div>
          </div>
          <div slot="right"
               class="value">
            <div v-show="!plan.b_over_due&&!plan.b_end&&(type === 1 || type === 3)">{{plan.t_repay_tm}} 待还</div>
            <div v-show="plan.b_end&&(type === 1 || type === 3)">已还清</div>
            <div v-show="!plan.b_over_due&&!plan.b_end&&!(type === 1 || type === 3)">{{plan.t_repay_tm}} 待收</div>
            <div v-show="plan.b_end&&!(type === 1 || type === 3)">已收回</div>
            <div v-show="plan.b_end&&plan.b_over_due">曾逾期 {{plan.n_overdue_day}} 天</div>
            <div v-show="!plan.b_end&&plan.b_over_due">已逾期 {{plan.n_overdue_day}} 天</div>
          </div>
        </ele>
      </group>
    </div>
    <group :first="true">
      <div v-if="currentPage == 'record'">
        <div class="tips-box">
          <div>还款日期</div>
          <div>还款人姓名</div>
          <div>还款金额</div>
          <div>还款状态</div>
        </div>
        <group class="record-list"
               v-for="record in computedRecordList">
          <ele @click="toRepayConfirm(record)">
            <div class="box" :class="{'failed': record.b_valid === 0}">
              <div>{{getDate(record.t_repay_tm)}}</div>
              <div>{{record.c_repay_name}}</div>
              <div v-if="type === 1 || type === 3">{{record.n_amt}}元</div>
              <div v-else>{{record.n_to_gathering_amt}}元</div>
              <div :class="{'to-confirm': getValidCode(record)}">{{getValidText(record)}}</div>
            </div>
          </ele>
        </group>
      </div>
    </group>
    <group :first="true">
      <div v-if="currentPage == 'uncheck'">
        <div class="tips-box">
          <div>还款日期</div>
          <div>还款人姓名</div>
          <div>还款金额</div>
          <div>还款状态</div>
        </div>
        <group class="record-list"
               v-for="record in uncheckList">
          <ele @click="toRepayConfirm(record)">
            <div class="box">
              <div>{{getDate(record.t_repay_tm)}}</div>
              <div>{{record.c_repay_name}}</div>
              <div v-if="type === 1 || type === 3">{{record.n_amt}}元</div>
              <div v-else>{{record.n_to_gathering_amt}}元</div>
              <div :class="{'to-confirm': getValidCode(record)}">{{getValidText(record)}}</div>
            </div>
          </ele>
        </group>
      </div>
    </group>

    <div class="fixed"
         v-if="cuishou || weiyue || fankui || luotiao">
      <ele>
        <div>
          <div v-if="cuishou && onLine && version > 1">
            <button v-link="'/collection/' + overdueDays + '/' + id"
                    class="light">催收进度
            </button>
          </div>
          <div v-if="cuishou && !(onLine && version > 1)">
            <button v-link="'/downloadEvidence/' + id"
                    class="light">下载证据
            </button>
          </div>
          <div v-if="luotiao">
            <button @click="reportLuotiao">裸条举报</button>
          </div>
          <div v-if="weiyue">
            <button @click="report">违约举报</button>
          </div>
          <div v-if="fankui">
            <button @click="feedbackReport">举报反馈
            </button>
          </div>
        </div>
      </ele>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import md5 from 'js-md5'
  import backdrop from 'components/basic/backdrop'
  import payMoney from 'components/output/payMoney'
  import iou from 'api/iou'
  import pay from 'api/pay'
  import { alert, feedback, confirm } from 'tools/utils'
  import { setTempInfo } from 'store/actions'

  export default{
    vuex: {
      getters: {
        openId: state => state.userInfo.openId
      },
      actions: {
        setTempInfo
      }
    },
    data () {
      return {
        status: '',
        orderId: '',
        type: '',
        isReported: '',
        reason: '',
        addReason: '',
        borrower: '',
        lender: '',
        guarantor: '',
        id: '',
        startDate: '',
        endDate: '',
        currentPage: 'plan',
        planAmount: '',
        recordAmount: '',
        amount: '',
        tempAmount: '',
        rate: '',
        serviceFee: '',
        guaranteeFee: '',
        recordList: [],
        planList: [],
        chosenList: [],
        uncheckList: [],
        toCheckAmt: 0,
        repaidAmt: 0,
        receivedAmt: 0,
        reported: true,
        payShown: false,
        onLine: false,
        selectPayway: false,
        payOrder: '',
        payToken: '',
        offlineFee: 0,
        overdueDays: 0,
        version: 0,
        cardNum: '',
        borrowerIdCard: '',
        payWay: '',
        lenderId: '',
        borrowerId: '',
        guaranteeId: '',
        viewTime: -3
      }
    },
    components: {
      payMoney,
      backdrop
    },
    computed: {
      over () {
        return !this.availablePlanList.length
      },
      cuishou () {
        return this.type === 2 && this.overdueDays > 0
      },
      luotiao () {
        if (this.type === 1) {
          const id = this.borrowerIdCard
          if (!id) {
            return false
          }
          const gender = id.slice(16, 17)
          if (gender % 2) {
            return false
          }
          return true
        }
        return false
      },
      weiyue () {
        return !this.onLine && this.type === 1
      },
      fankui () {
        return !this.onLine &&
          this.isReported &&
          (this.type === 2 || this.type === 3)
      },
      computedRecordList () {
        return this.recordList.sort(this.sortByDate)
      },
      computedPlanList () {
        return this.planList.sort(this.sortByDate)
      },
      totalAmount () {
        let total = 0
        this.availablePlanList.forEach((item) => {
          if (this.chosenList.includes(item.c_iou_installment_list_id)) {
            total += parseFloat(item.n_to_repay_amt)
          }
        })
        return total.toFixed(2)
      },
      totalAmount2 () {
        let total = 0
        if (this.chosenList.length === 1 && this.tempAmount) {
          if (this.computedChosenList[0].b_online) {
            total = this.tempAmount
          } else {
            total = this.tempAmount * 1.005
            this.offlineFee = this.tempAmount * 0.005
          }
        } else {
          this.computedPlanList.forEach((item) => {
            if (this.chosenList.includes(
                item.c_iou_installment_list_id
              )) {
              let fee = 0
              if (item.b_online) {
                total += parseFloat(item.n_to_repay_amt)
              } else {
                total += parseFloat(item.n_to_repay_amt) * 1.005
                fee += parseFloat(item.n_to_repay_amt) * 0.005
              }
              this.offlineFee = fee
            }
          })
        }
        return parseFloat(total.toFixed(3))
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
          last = lendAmountString.split('.')[1][2]
        }
        if (last > 4) {
          return (Math.ceil(lendAmount * 100) / 100).toFixed(2)
        }
        return (Math.floor(lendAmount * 100) / 100).toFixed(2)
      },
      availablePlanList () {
        return this.computedPlanList.filter(item => item.b_end !== 1)
      },
      currentChosenList () {
        return this.computedPlanList.filter(
          e => this.chosenList.includes(
            e.c_iou_installment_list_id
          ))
      },
      computedChosenList () {
        return this.currentChosenList.map((item, k, a) => {
          const l = Object.assign({}, item)
          if (a.length === 1) {
            l.amt = this.tempAmount
            l.c_iou_id = this.id
          } else {
            l.amt = item.n_to_repay_amt
            l.c_iou_id = this.id
          }
          return l
        })
      },
      recordAmountLender () {
        let amount = 0
        this.computedRecordList.forEach((record) => {
          if (record.b_valid) {
            amount += parseFloat(record.n_to_gathering_amt)
          }
        })
        return amount.toFixed(2) || '0.00'
      }
    },
    methods: {
      creditReport () {
        this.$router.go(`/creditReportSimpleMine/${this.borrowerId}`)
      },
      creditReport1 () {
        this.$router.go(`/creditReportSimpleMine/${this.lenderId}`)
      },
      creditReport2 () {
        this.$router.go(`/creditReportSimpleMine/${this.guaranteeId}`)
      },
      getAddReason (t) {
        return t.slice(0, 10)
      },
      getValidText (record) {
        let flag = ''
        if (record.b_valid) {
          if (!record.b_end) {
            if (!record.b_online) {
              if (this.type === 1) {
                flag = '待出借人处理'
              } else {
                flag = '待处理'
              }
            } else {
              flag = '还款中'
            }
          } else if (record.b_end === 1) {
            flag = '已完结'
          }
        } else if (record.b_valid === 0) {
          flag = '还款失败'
        }
        return flag
      },
      getValidCode (record) {
        if (record.b_valid) {
          if (!record.b_online && !record.b_end) {
            return true
          }
          return false
        }
        return false
      },
      getValidCode2 (record) {
        if (record.b_online === 0 || record.b_valid === 0) {
          return true
        }
        return false
      },
      sortByDate (a, b) {
        const d1 = new Date(a.t_repay_tm)
        const d2 = new Date(b.t_repay_tm)
        return d1 - d2
      },
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
      getDate (m) {
        const d = new Date(m)
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
      },
      // 反馈证明
      feedbackReport () {
        this.$router.go(`/feedbackReport/${this.id}`)
//        this.$router.go(`/addBackReport/${this.id}/${this.amount}/1/${this.type}`)
      },
      // 举报前页面
      report () {
        this.$router.go(`/bilkReport/${this.id}`)
//        this.$router.go(`/preReport/${this.id}/${this.amount}/${this.type}`)
      },
      // 裸条举报
      reportLuotiao () {
        this.$router.go(`/bilkReport/${this.id}/luotiao`)
//        this.$router.go(`/createReport/${this.id}/0/0/1`)
      },
      ioucontent () {
        this.$router.go(`/iouContent/${this.id}`)
      },
      changePage (e) {
        this.currentPage = e
        this.getIOU()
      },
      toRepayConfirm (record) {
        this.$router.go(`/offlineRepayConfirm/${record.c_iou_list_id}/${record.id}`)
      },
      choose (plan) {
        if (this.type === 2) return
        if (!plan.b_end) {
          const id = plan.c_iou_installment_list_id
          if (this.chosenList.includes(id)) {
            const index = this.chosenList.indexOf(id)
            this.chosenList.splice(index, 1)
          } else {
            this.chosenList.push(id)
          }
        }
      },
      chooseAll () {
        if (this.type === 2) return
        if (this.chosenList.length !== this.availablePlanList.length) {
          this.chosenList = []
          this.availablePlanList.forEach((item) => {
            this.chosenList.push(item.c_iou_installment_list_id)
          })
        } else {
          this.chosenList = []
        }
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
        this.payShown = e
      },
      getOrderId () {
        pay.getOrderId().then((json) => {
          this.orderId = json
        })
      },
      changePayInfo (e) {
        this.cardNum = e.cardNum
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
          amount: parseFloat(this.tempAmount || this.totalAmount),
          password: md5(md5(this.password)),
          payWay: this.payWay === '账户余额' ? 0 : 1,
          offlineWay: ''
        })
      },
      confirmFn (code) {
        return pay.repayConfirm({
          orderId: this.orderId,
          idList: this.computedChosenList,
          amount: parseFloat(this.tempAmount || this.totalAmount),
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
        this.tempAmount = ''
        this.togglePayShown(false)
        this.getIOU()
        this.getOrderId()
        this.chosenList = []
      },
      getIOU () {
        iou.getIOUDetail(this.id).then((json) => {
          this.type = json.n_self_type
          // 查看者的身份 0.其他用户 1.借款人 2.出借人 3.担保人
          this.borrowerId = json.c_borrower_id // 借款人id
          this.lenderId = json.c_lender_id // 出借人id
          this.guaranteeId = json.c_guarantee_id  // 担保人id
          this.isReported = json.b_reported // 借款人是否举报了借条 1是 0否
          this.reason = json.c_purpose // 借款目的
          this.addReason = json.c_memo // 借款用途详细描述
          this.borrower = json.c_borrower_name // 借款人姓名
          this.lender = json.c_lender_name // 出借人姓名
          this.guarantor = json.c_guarantee_name // 担保人姓名
          this.id = json.id // 借条id
          this.startDate = json.t_borrow_tm // 借款时间
          this.endDate = json.t_repay_tm // 预期还款时间
          this.planAmount = (json.n_self_type === 1 || json.n_self_type === 3) ?
            json.n_to_repay_amt : json.n_to_gathering_amt // 待还金额
          this.recordAmount = json.n_repaid_amt // 已还金额
          this.amount = json.n_amt // 借款金额
          this.rate = json.n_interest_rate // 年利率
          this.serviceFee = json.n_service_amt // 服务费用
          this.guaranteeFee = json.n_guarantee_amt // 担保费用
          const repaidList = json.l_repaid_list
          Object.keys(repaidList).forEach((i) => {
            if (repaidList[i].b_end === 1) {
              this.recordList.push(repaidList[i])
            }
          })
//          this.recordList = json.l_repaid_list // 还款记录
          Object.keys(repaidList).forEach((i) => {
            if (repaidList[i].b_online === 0 && repaidList[i].b_end === 0) {
              this.uncheckList.push(repaidList[i])
            }
          })
          this.toCheckAmt = json.n_to_check_amt
          this.repaidAmt = json.n_repaid_amt
          this.receivedAmt = json.n_received_amt
          this.planList = json.l_repay_plan_list // 还款计划
          this.onLine = json.b_online
          this.overdueDays = json.n_overdue_day
          this.version = json.n_version // 协议版本
          this.borrowerIdCard = json.c_borrower_id_card
        })
      },
      tipAlertOnline () {
        alert('【线上还款】指的是平台内通过钱包余额或绑定的银行卡支付。')
      },
      tipAlertOffline () {
        alert('【线下还款】指的是在平台外通过现金/支付宝/微信/银行卡转账等途径支付；' +
          '<br>【线下还款】需要对方确认收到款才生效。')
      },
      tipAlertDetail (plan) {
        const text1 =
          `<div style="display: flex;justify-content: space-between">
                     <span>本金：</span>
                     <span>${plan.n_amt}元</span></div>
                     <div style="display: flex;justify-content: space-between">
                     <span>利息：</span>
                     <span>${plan.n_interest_amt}元</span></div>
                     <div style="display: flex;justify-content: space-between">
                     <span>罚息：</span>
                     <span>${plan.n_overdue_amt}元</span></div>
                     <div style="display: flex;justify-content: space-between">
                     <span>逾期管理费：</span>
                     <span>${plan.n_overdue_to_us_amt}元</span></div>`
        const text2 =
          `<div style="display: flex;justify-content: space-between">
                     <span>本金：</span>
                     <span>${plan.n_amt}元</span></div>
                     <div style="display: flex;justify-content: space-between">
                     <span>利息：</span>
                     <span>${plan.n_interest_amt}元</span></div>
                     <div style="display: flex;justify-content: space-between">
                     <span>罚息：</span>
                     <span>${plan.n_overdue_amt}元</span></div>
                     <div style="display: flex;justify-content: space-between">
                     <span>逾期管理费：</span>
                     <span>${plan.n_overdue_to_us_amt}元</span></div>
                     <div style="text-align: left; font-size: 12px; color: #999;">逾期管理费由平台收取，并不计入出借人待收金额，但是如果符合奖励规则，出借人会在借款人还款完成后收到90%的逾期管理费奖励。</div>`
        const title1 = `第${plan.n_cur_tms}期 剩余待还${plan.n_to_repay_amt}元`
        const title2 = `第${plan.n_cur_tms}期 剩余待收${plan.n_to_gathering_amt}元`
        if (this.type === 1 || this.type === 3) {
          confirm(text1, title1, [
            {
              text: '知道了'
            }
          ])
        } else {
          confirm(text2, title2, [
            {
              text: '知道了'
            }
          ])
        }
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
      },
      data ({ to: { params: { id, offlineLineConfirm } } }) {
        if (offlineLineConfirm) {
          this.currentPage = 'record'
        }
        this.id = id
        this.getIOU()
        this.getOrderId()
      }
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/fragment";

  .fixed {
    @extend %fixed-box;
  }

  .head {
    width: 100%;
    display: flex;
    background-color: $MAIN_COLOR;
    color: white;
    padding: 10px;
    line-height: 1.6;
    font-size: $TIP_FONT_SIZE;
    .desc {
      flex: 1;
      min-height: 47px;
      div:first-child {
        font-size: $BASE_FONT_SIZE;
      }
    }
    .desc_con{
      span{
        width: 100px;
        display: inline-block;
        font-size: 14px;
      }
      button {
        width: 28% !important;
        font-size: $MIN_FONT_SIZE !important;
        margin: 5px;
        padding: 0 3px 0 18px;
        background-size: 12px 12px;
        background-position: 8px;
        background-repeat: no-repeat;
        background-color:transparent;
        background-image: url('../../assets/creditInfo_w.png');
        color: $ELE_W_COLOR;
        height: 24px;
        line-height: 24px;
        &::before {
          @extend %btn-border;
          border: 2px solid $MINOR_TEXT_COLOR;
        }
      }
    }
    .more {
      width: 20px;
      background: url("../../assets/more_w.svg") no-repeat center {
        size: 14px;
      }
    }
  }

  .nav {
    padding: 0 !important;
    text-align: center;
    color: $MAIN_TEXT_COLOR;
    .box {
      flex: 1;
      display: flex;
      height: 50px;
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        > :last-child {
          font-size: $TIP_FONT_SIZE;
          color: $TIP_COLOR;
        }
      }
    }
    .chosen::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      width: 100%;
      background-color: $MAIN_COLOR;
    }
  }

  .amount-list {
    padding: 0 !important;
    .box {
      flex: 1;
      display: flex;
      justify-content: space-between;
      text-align: center;
      font-size: $TIP_FONT_SIZE;
      color: $TIP_COLOR;
    }
    .row {
      background: $MAIN_COLOR;
      .box {
        color: $MINOR_TEXT_COLOR;
      }
    }
    .line::before {
      border-bottom: 1px solid #fff !important;
    }
  }

  .plan-list,
  .plan-fixed {
    padding-top: 0 !important;
    color: $MAIN_TEXT_COLOR;
    &::after {
      display: none !important;
    }
    &:last-child::after {
      display: block !important;
    }
    .checkbox {
      display: flex;
      align-items: center;
      > :first-child {
        @extend %checkbox;
      }
    }
    .disabled > :first-child {
      border: none;
    }

    .value {
      font-size: $TIP_FONT_SIZE;
      text-align: right;
    }
    .over,
    .over .desc {
      color: $TIP_COLOR;
      .checkbox > :first-child {
        /*border: 1px solid $BORDER_COLOR;*/
        border: none;
        color: $TIP_COLOR;
      }
    }
    .overdue {
      color: $MINOR_COLOR;
    }
  }

  .plan-list .desc {
    color: $MAIN_COLOR;
    > div:nth-child(2) {
      font-size: $TIP_FONT_SIZE;
    }
  }

  .record-list {
    padding-top: 0 !important;
    font-size: $TIP_FONT_SIZE;
    .box {
      flex: 1;
      display: flex;
      justify-content: space-between;
      color: $MAIN_TEXT_COLOR;
      > div {
        flex: 1;
      }
      > :last-child {
        text-align: right;
        white-space: nowrap;
      }
    }
    /*&::after {*/
    /*display: none !important;*/
    /*}*/
  }

  .plan-fixed {
    @extend %fixed-bottom;
    z-index: 2;
    bottom: 50px;
    color: $STRONG_TEXT_COLOR;
    &.bottom {
      bottom: 0;
    }
    .row {
      padding-right: 0;
    }
    .button {
      padding: 0 20px;
      background-color: $MAIN_COLOR;
      color: white;
      line-height: 50px;
    }
    .desc span {
      color: $MAIN_COLOR;
    }
  }

  .last::after {
    height: 120px !important;
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
      width: 20px;
      height: 30px;
      background: url("../../assets/info.svg") center no-repeat {
        size: 12px;
      }
    }
  }

  .tip-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row !important;
    .tip-alert {
      width: 40px;
      height: 30px;
      background: url("../../assets/info.svg") center no-repeat {
        size: 12px;
      }
      margin-left: -10px;
    }
  }

  .to-confirm {
    color: $MINOR_COLOR;
  }

  .slide-in {
    &-transition {
      transition: .2s;
    }
    &-enter,
    &-leave {
      transform: translateY(100%);
    }
  }

  .tips-box {
    display: flex;
    padding: 5px;
    font-size: $TIP_FONT_SIZE;
    color: $TIP_COLOR;
    div {
      flex: 1;
      &:last-child {
        text-align: right;
      }
    }
  }
  .popup {
    .content {
      div {
        text-align:left;
      }
    }
  }
  .failed {
    color: $GRAY_COLOR !important;
  }
</style>
