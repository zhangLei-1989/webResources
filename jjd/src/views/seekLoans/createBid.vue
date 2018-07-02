<template>
  <div v-if="loaded">
    <pay-money :show="payShown"
               :fn="create"
               :only-pwd="true"
               @change-info="changePayInfo"
               @success="success"
               @toggle-pay="togglePayShown"></pay-money>
    <date :show="dateShown"
          @toggle="toggleDateShown"
          :default-date="date"
          :min="minDate"
          @set-date="setDate"></date>
    <selector :show="rateSelectorShown"
              :default-data="rate"
              :value-list="rateList"
              @set-data="setRate"
              @toggle="toggleRateSelectorShown"></selector>
    <selector :show="repayTypeSelectorShown"
              :default-data="repayType"
              :value-list="repayTypeList"
              @set-data="setRepayType"
              @toggle="toggleRepayTypeSelectorShown"></selector>
    <selector :show="guarantorSelectorShown"
              :default-data="guarantor"
              :value-list="guarantorList"
              @set-data="setGuarantor"
              @toggle="toggleGuarantorSelectorShown"></selector>
    <selector :show="guaranteeRateSelectorShown"
              :default-data="guaranteeRate"
              :value-list="guaranteeRateList"
              @set-data="setGuaranteeRate"
              @toggle="toggleGuaranteeRateSelectorShown"></selector>
    <selector :show="publicSelectorShown"
              :default-data="toPublic"
              :value-list="publicList"
              @set-data="setPublic"
              @toggle="togglePublicSelectorShown"></selector>
    <selector :show="timesSelectorShown"
              :default-data="repayTimes"
              :value-list="timesList"
              @set-data="setTimes"
              @toggle="toggleTimesSelectorShown"></selector>
    <group :fixed="true">
      <btn :text="'确定'"
           :cut="1"
           :next="true"
           :btn-fn="showPwdFn"></btn>
    </group>
    <group :first="true">
      <div class="tips">您当前的可借款额度为<span>{{borrowAmt}}</span>元</div>
      <ele>
        <div>借款金额</div>
        <input growing-track="true"
               slot="right"
               type="number"
               @blur="blur"
               placeholder="请输入整数"
               v-model="amount">
        <div slot="unit">元</div>
      </ele>
      <ele :more="true"
           @click="toggleRepayTypeSelectorShown(true)">
        <div>还款方式</div>
        <div slot="right">{{repayType}}</div>
      </ele>
      <ele :more="true"
           @click="toggleDateShown(true)"
           v-if="repayType == '到期还本付息'">
        <div>还款日期</div>
        <div slot="right"
             class="flex">
          <div>{{date.y}}-{{date.m}}-{{date.d}}</div>
          <div class="computed">{{computedDays}}天</div>
        </div>
      </ele>
      <ele :more="true"
           @click="toggleTimesSelectorShown(true)"
           v-if="repayType == '等额本息'">
        <div>分期次数</div>
        <div slot="right">{{repayTimes}}</div>
      </ele>
      <ele :more="true"
           @click="toggleRateSelectorShown(true)">
        <div>年化利率</div>
        <div slot="right"
             class="flex">
          <div>{{rate}}</div>
          <div class="computed">{{computedRate}}元</div>
        </div>
      </ele>
      <ele>
        <div class="tip-box">
          <span>服务费</span>
          <span class="tip-alert"
                @click.stop.prevent="tipAlertFee"></span>
        </div>
        <input growing-track="true"
               slot="right"
               type="number"
               :placeholder="placeholder"
               v-model="fee">
        <div slot="unit">元</div>
      </ele>
      <ele :more="true"
           v-if="allowIouAndBuy"
           @click="toggleGuarantorSelectorShown(true)">
        <div class="tip-box">
          <span>是否需要担保人</span>
          <span class="tip-alert"
                @click.stop.prevent="tipAlertGuarantor"></span>
        </div>
        <div slot="right">{{guarantor}}</div>
      </ele>
      <ele v-else>
        <div class="tip-box">
          <span>是否需要担保人</span>
          <span class="tip-alert"
                @click.stop.prevent="tipAlertGuarantor"></span>
        </div>
        <div slot="right">{{guarantor}}</div>
      </ele>
      <ele :more="true"
           @click="toggleGuaranteeRateSelectorShown(true)"
           v-if="guarantor == '需要' && allowIouAndBuy && !isLessThan22">
        <div>担保费率</div>
        <div slot="right"
             class="flex">
          <div>{{guaranteeRate}}</div>
          <div class="computed">{{computedGuaranteeRate}}元</div>
        </div>
      </ele>
      <ele v-if="guarantor == '需要' && (!allowIouAndBuy || isLessThan22)">
        <div>担保费率</div>
        <div slot="right"
             class="flex">
          <div>{{guaranteeRate}}</div>
          <div class="computed">{{computedGuaranteeRate}}元</div>
        </div>
      </ele>
      <ele v-if="amount && fee">
        <div class="box">
          <div class="computed-list">
            <ele :transparent="true"
                 :no-line="true"
                 class="default">
              <div>实际到账金额</div>
              <div>¥{{computedGot}}</div>
            </ele>
            <div class="tip">
              借款金额{{amount}} - 服务费{{fee}} - 担保费{{computedGuaranteeRate}} - 手续费{{(platformFee || 0).toFixed(2)}}
            </div>
            <ele :transparent="true"
                 :no-line="true"
                 class="default">
              <div>预计到期本息</div>
              <div>¥{{computedAmount}}</div>
            </ele>
            <div class="tip">
              本金{{amount}} + 利息{{computedRate}}(假设是今天借到款)


            </div>
            <ele :transparent="true"
                 :no-line="true"
                 class="title">
              <div>【 还款详情 】</div>
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
    </group>
    <group>
      <ele :more="true"
           :link="'/setPurpose/createBid'">
        <div>借款用途</div>
        <div slot="right">{{reason || '请点击选择'}}</div>
      </ele>
    </group>
    <group>
      <ele :more="true"
           @click="togglePublicSelectorShown(true)">
        <div class="tip-box">
          <span>是否公开求借款</span>
          <span class="tip-alert"
                @click.stop.prevent="tipAlertFriends"></span>
        </div>
        <div slot="right">{{toPublic}}</div>
      </ele>
      <div slot="tip_bottom"
           class="tip_box">
        <div style="width: 40px; height: 40px"
             @click="toggleCheck">
          <div class="checkbox"
               :class="{chosen: checked}"></div>
        </div>
        已阅读并同意<a @click.stop.prevent="goService('iouService7')">《今借到借款协议》</a>
      </div>
    </group>
    <group>
      <div slot="tip_bottom"
           class="tip">
        <div>
          提示<br>
          1、在平台储备金范围内，支持所有人任何时间立即提现<br>
          2、如果求借款筹满/筹款超过3天/还款时间到期，借款将自动关闭<br>
          3、当前求借款未关闭，不得发起新的求借款<br>
          4、平台收取手续费=借款金额*1%，用于支付借款期间产生的转账等费用，由借款人承担，在款项到账后平台直接扣除
        </div>
      </div>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import md5 from 'js-md5'
  import date from 'components/mixin/date'
  import selector from 'components/mixin/selector'
  import payMoney from 'components/output/payMoney'
  import bid from 'api/bid'
  import {
    setTempInfo,
    toggleNeedRefresh
  } from 'store/actions'
  import pay from 'api/pay'
  import my from 'api/my'
//  import user from 'api/creditCenterUser'
  import { alert, confirm } from 'tools/utils'

  export default{
    vuex: {
      getters: {
        createBid: state => state.temp.createBid, // 读取表单缓存
        scrollY: state => state.temp.scrollY.createBid,
        pageList: state => state.transition.pageList,
        token: state => state.token
      },
      actions: {
        setTempInfo,
        toggleNeedRefresh
      }
    },
    data () {
      const d = new Date((new Date()).getTime() + 2 * 24 * 3600 * 1000)
      return {
        placeholder: '',
        orderId: '',
        amount: '',
        fee: '',
        borrowAmt: '',
        dateShown: false,
        rateSelectorShown: false,
        repayTypeSelectorShown: false,
        guarantorSelectorShown: false,
        guaranteeRateSelectorShown: false,
        publicSelectorShown: false,
        timesSelectorShown: false,
        minDate: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
        date: {
          y: d.getFullYear(),
          m: d.getMonth() + 1,
          d: d.getDate()
        },
        rateList: [
          '0%', '1%', '2%', '3%', '4%',
          '5%', '6%', '7%', '8%', '9%',
          '10%', '11%', '12%', '13%', '14%',
          '15%', '16%', '17%', '18%', '19%',
          '20%', '21%', '22%', '23%', '24%'],
        rate: '0%',
        repayTypeList: ['等额本息', '到期还本付息'],
        repayType: '到期还本付息',
        timesList: ['3期', '6期', '12期'],
        repayTimes: '3期',
        reason: '',
        addReason: '',
        guarantorList: ['需要', '不需要'],
        guarantor: '不需要',
        guaranteeRateList: [
          '0%', '1%', '2%', '3%', '4%',
          '5%', '6%', '7%', '8%', '9%', '10%'],
        guaranteeRate: '0%',
        publicList: ['公开', '不公开'],
        toPublic: '公开',
        picUrls: [],
        uploadUrls: [],
        payShown: false,
        pwd: '',
        checked: false,
        successCreated: false,
        loaded: false,
        maxAmount22: 200000,
        idcard: '',
        allowIouAndBuy: true,
        isLessThan22: false,
        alertImg: require('../../assets/warning.svg'),
        creditOk: '', // 作为借款人是否可用
        b_lender_credit: '', // 作为借款人是否可用
        isCheckCredit: false, // 是否检测认证
        b_recover: '', // 运营商通道是否恢复
        b_skip: '', // 是否跳过运营商认证
      }
    },
    components: {
      date,
      selector,
      payMoney
    },
    watch: {
      amount (newValue) {
        if (this.isLessThan22 &&
          parseFloat(newValue || 0) > 5000 - (this.maxAmount22 - this.borrowAmt)
        ) {
          this.allowIouAndBuy = false
          this.guarantor = '需要'
          this.guaranteeRate = '0%'
        } else {
          if (this.isLessThan22) {
            this.guaranteeRate = '0%'
          }
          this.allowIouAndBuy = true
        }
      },
    },
    computed: {
      needGuarantor () {
        return this.guarantor === '需要'
      },
      platformFee () {
        return parseFloat(this.amount) / 100
      },
      computedDays () {
        const start = new Date()
        const d0 = this.date
        const end = new Date(d0.y, parseInt(d0.m, 10) - 1, d0.d)
        const m = end.getTime() - start.getTime()
        const d = Math.ceil(m / (24 * 3600 * 1000))
        return d > 0 ? d : 0
      },
      computedGuaranteeRate () {
        if (!this.amount) return '0.00'
        return parseFloat(this.amount)
          * parseFloat(this.guaranteeRate) / 100
      },
      computedRate () {
        const r = this.computedAmount
          - parseFloat(this.amount || 0)
        if (r) {
          return r.toFixed(2)
        }
        return 0.00
      },
      computedAmount () {
        let cAmount = 0
        this.computedList.forEach((item) => {
          cAmount += parseFloat(item.amount)
        })
        if (cAmount < parseFloat(this.amount || 0)) {
          cAmount = parseFloat(this.amount || 0)
        }
        this.placeholder = `不得超过${(this.amount * 0.12).toFixed(2)}`
        return cAmount.toFixed(2)
      },
      computedGot () {
        let r = parseFloat(this.amount || 0)
          - parseFloat(this.fee)
          - parseFloat(this.computedGuaranteeRate)
          - this.platformFee
        if (r < 0) {
          r = 0
        }
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
          r = parseFloat(this.amount || 0)
            * parseFloat(this.rate) / 36500
            * this.computedDays
            + parseFloat(this.amount || 0)
        } else if (this.rate === '0%') {
          r = parseFloat(this.amount || 0) / this.times
        } else {
          const monthRate = parseFloat(this.rate) / 1200
          r = parseFloat(this.amount || 0)
            * (monthRate * Math.pow(1 + monthRate, this.times))
            / (Math.pow(1 + monthRate, this.times) - 1)
        }
        return r.toFixed(2)
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
      errorList () {
        const list = []
        if (!parseInt(this.amount, 10) || parseInt(this.amount, 10) <= 0) {
          list.push('请输入正确的借款金额')
        }
        if (this.amount % 1 !== 0) {
          list.push('借款金额应为整数')
        }
        if (parseInt(this.amount, 10) < 300) {
          list.push('借款金额请大于300元')
        }
        if (parseInt(this.amount, 10) > this.maxAmount22) {
          list.push(`借款金额请少于${this.maxAmount22}元`)
        }
        if (this.times === 1 && this.computedDays < 2) {
          list.push('借款时长不得少于2天')
        }
        const feeNum = parseFloat(this.fee || 0)
        if (this.fee === '') {
          list.push('请输入正确的服务费金额')
        } else if (feeNum < 0) {
          list.push(`请输入0至${
            (parseFloat(this.amount) * 0.12 || 0).toFixed(2)
            }元服务费`)
        }
        if (feeNum > parseFloat(parseFloat(this.amount) * 0.12).toFixed(2)) {
          list.push('您输入的服务费过高，请低于您借款总额的12%')
        }
        if (!this.reason) {
          list.push('请选择您的借款用途')
        }
        if (this.uploadUrls.length > 20) {
          this.picUrls = []
          this.uploadUrls = []
          list.push('请上传少于 20 张图片')
        }
        if (!this.checked) {
          list.push('请同意今借到借款协议')
        }
        return list
      }
    },
    methods: {
      operatorNoRecoverWarn () {
        confirm(
          `<img src="${this.alertImg}"
                      style="width: 80px; margin-top: 10px">
                      <div style="text-align: left">由于您的运营商通道未恢复,您的信用报告缺失运营商数据,但不影响您的出借功能</div>`,
          '',
          [{
            text: '知道了'
          }]
        )
      },
      getPayInfo () {
        pay.checkCredit().then((json) => {
          if (!this.cTel) {
            this.tel = json.c_telephone
          }
          this.creditOk = json.b_credit
          this.b_lender_credit = json.b_lender_credit
          pay.checkOpration().then((res) => {
            /* eslint-disable */
            const that = this
            this.b_recover = res.b_recover
            this.b_skip = res.b_skip
            if (this.creditOk === 0) {
              if (this.b_lender_credit) {
                if (this.b_skip === false) {
                  that.noPassOperator() // 手机运营商故障没有跳过
                } else if (this.b_skip === true && this.b_recover === true) {
                  this.checkOperatorWarn() // 可用但是跳过了运商认证并且运营商通道恢复
                } else if (this.b_skip === true && !this.b_recover) {
                  this.operatorNoRecoverWarn() // 可用但跳过了运营商认证且运营商通道未恢复
                }
              } else {
                this.creditFailed()
              }
            } else {
              this.isCheckCredit = true
              this.remind()
            }
            /* eslint-enable */
          })
        })
      },
      noPassOperator () {
        confirm(
          `<img src="${this.alertImg}"
                      style="width: 80px; margin-top: 10px">
                      <div style="text-align: left">您的信用报告缺失运营商数据 ,请先认证您的运营商数据</div>`,
          '',
          [{
            text: '马上去认证',
            fn () {
              this.$router
                .go('/operatorInfo')
            },
          }, {
            text: '稍后认证',
          }]
        )
      },
      creditFailed () {
        const that = this
        confirm(
          `<img src="${this.alertImg}"
                      style="width: 80px; margin-top: 10px">
                      <div style="text-align: left">您的信用认证已经失效 ,请先认证信用报告</div>`,
          '',
          [{
            text: '马上去认证',
            fn () {
              that.$router
                .go('/operatorInfo')
            },
          }, {
            text: '稍后认证',
          }]
        )
      },
      checkOperatorWarn () {
        confirm(
          `<img src="${this.alertImg}"
                      style="width: 80px; margin-top: 10px">
                      <div style="color: #ED594E">请补充运营商认证</div>
                      <div style="text-align: left">您所在地区的运营商认证通道已恢复,请您及时补充认证,
                      认证运营商回提高您求款成功的可能性</div>`,
          '',
          [{
            text: '马上去认证',
            fn () {
              this.$router
                .go('/operatorInfo')
            },
          }, {
            text: '稍后认证',
          }]
        )
      },
      getCapitalLeft () {
        pay.getCapitalLeft().then((json) => {
          if (!json) {
//                        const str = '今日提现福利已被领完\n提现需等第二个工作日'
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
      goService (e) {
        this.$router.go({
          path: `/${e}/0`,
          replace: false
        })
      },
      toggleCheck () {
        this.checked = !this.checked
      },
      toggleDateShown (e) {
        this.dateShown = e
      },
      setDate (dateObject) {
        this.date = dateObject
      },
      toggleRateSelectorShown (e) {
        this.rateSelectorShown = e
      },
      setRate (rate) {
        this.rate = rate
      },
      toggleTimesSelectorShown (e) {
        this.timesSelectorShown = e
      },
      setTimes (rate) {
        this.repayTimes = rate
      },
      toggleRepayTypeSelectorShown (e) {
        this.repayTypeSelectorShown = e
      },
      setRepayType (repayType) {
        this.repayType = repayType
      },
      toggleGuarantorSelectorShown (e) {
        this.guarantorSelectorShown = e
      },
      setGuarantor (guarantor) {
        this.guarantor = guarantor
      },
      toggleGuaranteeRateSelectorShown (e) {
        this.guaranteeRateSelectorShown = e
      },
      setGuaranteeRate (guaranteeRate) {
        this.guaranteeRate = guaranteeRate
      },
      togglePublicSelectorShown (e) {
        this.publicSelectorShown = e
      },
      setPublic (toPublic) {
        this.toPublic = toPublic
      },
      getOrderId (type) {
        pay.getOrderId(type).then((json) => {
          this.orderId = json
        })
      },
      getBorrowAmt () {
        my.getBorrowAmt().then((json) => {
          if (json.n_borrow_amt < this.maxAmount22) {
            this.borrowAmt =
              parseFloat(parseFloat(this.maxAmount22 - json.n_borrow_amt).toFixed(2))
          } else {
            this.borrowAmt = 0
          }
          if (this.isLessThan22 &&
            parseFloat(this.amount || 0) > 5000 - (this.maxAmount22 - this.borrowAmt)
          ) {
            this.allowIouAndBuy = false
            this.guarantor = '需要'
            this.guaranteeRate = '0%'
          } else {
            if (this.isLessThan22) {
              this.guaranteeRate = '0%'
            }
            this.allowIouAndBuy = true
          }
        })
      },
      getBorrowAmt22 () {
        my.getMyCompleteIdcard().then((json) => {
          if (json.b_bind_card) {
            this.idcard = json.c_id_card_no
            const td = new Date()
            const y = td.getFullYear()
            let m = td.getMonth() + 1
            let d = td.getDate()
            if (m < 10) {
              m = `0${m}`
            }
            if (d < 10) {
              d = `0${d}`
            }
            const tdNumber = parseInt(`${y}${m}${d}`, 10)
            const bdNumber = parseInt(this.idcard.slice(6, 14), 10)
            if (tdNumber - bdNumber < 220000) {
//            this.maxAmount22 = 5000
//            this.allowIouAndBuy = false
              this.isLessThan22 = true
//            this.guarantor = '需要'
//            this.guaranteeRate = '0%'
            }
          }
          this.getBorrowAmt()
        })
      },
      remind () {
        if (this.isCheckCredit) {
          const that = this
          this.checkValid(() => {
            const todayNow = Date.now()
            const startDay = new Date('2017-01-27T00:00+08:00').getTime()
            const endDay = new Date('2017-01-30T00:00+08:00').getTime()
            if (todayNow > startDay && todayNow < endDay) {
              confirm(
                '由于支付公司春节无法结算，1月27日00:00至1月29日24:00暂不支持提现，' +
                '其他业务不受影响。',
                '27日至29日暂不支持提现',
                [{
                  text: '知道了',
                  fn () {
                    setTimeout(() => {
                      const cycleFn = (second) => {
                        confirm(
                          `<img src="${this.alertImg}"
                      style="width: 80px; margin-top: 10px">
                      <div style="color: #ED594E">任何要求私下还款的都是诈骗</div>
                      <div style="text-align: left">请您<span style="color: #ED594E">务必通过今借到线上还款</span>，
                      否则该借条不能自动完结，还会产生逾期记录。
                      今借到不承认任何私下还款方式（支付宝/微信/银行卡等），
                      请谨慎操作严防诈骗。</div>`,
                          '',
                          [{
                            text: second > 0 ? `剩余${second}秒` : '我已认真阅读以上提示',
                            fn () {
                              if (second < 1) {
                                this.payShown = true
                              }
                            },
                            notClose: second > 0,
                          }],
                          true
                        )
                      }
                      let start = 5
                      cycleFn(start)
                      start -= 1
                      const pid = setInterval(() => {
                        cycleFn(start)
                        start -= 1
                        if (start < 0) {
                          clearInterval(pid)
                        }
                      }, 1000)
                    }, 300)
                  }
                }]
              )
            } else {
              const cycleFn = (second) => {
                confirm(
                  `<img src="${this.alertImg}"
                      style="width: 80px; margin-top: 10px">
                      <div style="color: #ED594E">任何要求私下还款的都是诈骗</div>
                      <div style="text-align: left">请您<span style="color: #ED594E">务必通过今借到线上还款</span>，
                      否则该借条不能自动完结，还会产生逾期记录。
                      今借到不承认任何私下还款方式（支付宝/微信/银行卡等），
                      请谨慎操作严防诈骗。</div>`,
                  '',
                  [{
                    text: second > 0 ? `剩余${second}秒` : '我已认真阅读以上提示',
                    fn () {
                      if (second < 1) {
                        that.payShown = true
                      }
                    },
                    notClose: second > 0,
                  }],
                  true
                )
              }
              let start = 5
              cycleFn(start)
              start -= 1
              const pid = setInterval(() => {
                cycleFn(start)
                start -= 1
                if (start < 0) {
                  clearInterval(pid)
                }
              }, 1000)
            }
          })
        }
      },
      showPwdFn () {
        this.getPayInfo()
      },
      close () {
        this.payShown = false
      },
      togglePayShown (e) {
        this.payShown = e
      },
      checkValid (fn) {
        if (this.errorList.length > 0) {
          let errors = ''
          this.errorList.forEach((err) => {
            errors += `${err}<br>`
          })
          alert(errors)
        } else {
          fn()
        }
      },
      create () {
        /* eslint-disable */
        window._vds.push(['setPageGroup', 'createBid'])
        window._vds.push(['setPS1', this.orderId])
        window._vds.push(['setPS2', this.amount || 0])
        window._vds.push(['setPS3', this.repayType])
        window._vds.push(['setPS4', this.repayTimes])
        window._vds.push(['setPS5', this.rate])
        window._vds.push(['setPS6', this.reason])
        /* eslint-enable */
        const d1 = this.date
        const d2 = new Date(d1.y, parseInt(d1.m, 10) - 1, d1.d)
        return bid.addBid({
          orderId: this.orderId,
          amount: parseInt(this.amount || 0, 10),
          repayDate: d2.getTime(),
          repayType: this.repayType === '等额本息' ? 1 : 0,
          times: parseInt(this.repayTimes, 10),
          rate: parseInt(this.rate, 10),
          fee: parseFloat(this.fee),
          reason: this.reason,
          reasonDetail: this.addReason,
          guarantor: this.needGuarantor ? 1 : 0,
          guaranteeRate: parseInt(this.guaranteeRate, 10),
          toPublic: this.toPublic === '公开' ? 1 : 0,
          pics: this.uploadUrls,
          pwd: md5(md5(this.pwd))
        })
      },
      changePayInfo (e) {
        this.pwd = e.password
      },
      success (e) {
        if (e) {
          window._JHsdk.action({
            event: 'hx_ac1',
            params: {
              id: this.orderId
            }
          })
          this.togglePayShown(false)
          this.toggleNeedRefresh(true)
//          feedback('借款创建成功')
          this.successCreated = true
          this.$router.go({
            path: `/successShare/${this.needGuarantor ?
              1 : 0}/0/${this.orderId}`,
            replace: true
          })
        } else {
          this.togglePayShown(false)
          this.getOrderId()
        }
      },
      tipAlertFee () {
        alert('<div style="text-align: left">' +
          '服务费是什么？<br>' +
          '服务费最高不超过借款金额的12%，由借款人自行设置，' +
          '平台在交易成功之后自动扣取。</div>')
      },
      tipAlertGuarantor () {
        alert('<div style="text-align: left">' +
          '为什么需要担保人？<br>' +
          '1、邀请好友强力增信，提高出借率；<br>' +
          '2、担保人帮扩散，获得更多曝光机会。</div>')
      },
      tipAlertFriends () {
        alert('<div style="text-align: left">' +
          '什么是公开求借款？<br>' +
          '平台上的好友都可以看到您的求借款。<br>' +
          '谁是我的平台好友？<br>' +
          '看到过您的借款/出借详情页面的所有注册用户。</div>')
      },
      blur () {
        this.amount = parseInt(this.amount || 0, 10)
      },
    },
    route: {
      deactivate ({ next }) {
        if (this.successCreated) {
          this.successCreated = false
          if (window.localStorage.localCreateBid) {
            window.localStorage.removeItem('localCreateBid')
          }
          // 清空表单
          this.setTempInfo({ createBid: {} })
        } else {
          window.localStorage.localCreateBid =
            JSON.stringify(this.$data)
          // 缓存表单
          this.setTempInfo({ createBid: this.$data })
        }
        this.setTempInfo({
          scrollY: {
            createBid: document.body.scrollTop
          }
        })
        next()
      }
    },
    created () {
      // 应用表单缓存
      const localCreateBid = JSON.parse(
        window.localStorage.localCreateBid || '{}'
      )
      if (Object.keys(this.createBid).length > 0) {
        Object.assign(this.$data, this.createBid)
      } else {
        Object.assign(this.$data, localCreateBid)
      }
      this.allowIouAndBuy = true
      this.isLessThan22 = false
      this.close()
      if (this.token) {
        this.getCapitalLeft()
      }
      this.getOrderId()
      this.getBorrowAmt22()
//      this.getBorrowAmt()
      this.loaded = true
    },
    attached () {
      const lastPage = this.pageList[this.pageList.length - 1]
      if (lastPage === 'setPurpose') {
        document.body.scrollTop = this.scrollY
      }
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import '../../scss/fragment';

  .tip_waring {
    font-weight: 500 !important;
  }

  .tips {
    font-size: $TIP_FONT_SIZE;
    color: $TIP_COLOR;
    padding-left: 10px;
    line-height: 30px;
  }

  .tips span {
    color: $TIP_COLOR;
  }

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

  .flex {
    @extend %date-computed;
  }

  .computed-list {
    @extend %computed-list;
  }

  .box {
    flex: 1;
  }

  .tip-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row !important;
    .tip-alert {
      width: 20px;
      height: 30px;
      background: url("../../assets/info.svg") center no-repeat {
        size: 12px;
      }
    }
  }
</style>
