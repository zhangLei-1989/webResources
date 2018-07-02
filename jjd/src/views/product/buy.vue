<template>
  <div v-if="loaded">
    <pay-money :show="payShown"
               :fn="next"
               :only-pwd="true"
               @change-info="changePayInfo"
               @success="success"
               @toggle-pay="togglePayShown"></pay-money>
    <group :fixed="true">
      <btn :text="isCredit == '1' ? '马上申请' : '下一步'"
           :cut="1"
           :next="true"
           :btn-fn="showPwdFn"></btn>
    </group>
    <date :show="dateShown"
          @toggle="toggleDateShown"
          :default-date="date"
          @set-date="setDate"></date>
    <selector :show="timesSelectorShown"
              :default-data="repayTimes"
              :value-list="timesList"
              @set-data="setTimes"
              @toggle="toggleTimesSelectorShown"></selector>
    <selector :show="timeLengthSelectorShown"
              :default-data="timeLength"
              :value-list="timesList"
              @set-data="setTimeLength"
              @toggle="toggleTimeLengthSelectorShown"></selector>
    <group>
      <div class="tips">
        您当前的可借款额度为<span>{{borrowAmt}}</span>元
      </div>
      <ele>
        <div>借款金额</div>
        <input growing-track="true"
               slot="right"
               type="number"
               :placeholder="placeholder"
               @blur="blur"
               v-model="buyAmount">
        <div slot="unit">元</div>
      </ele>
      <ele :more="true"
           @click="toggleTimesSelectorShown(true)"
           v-if="payWay > 0">
        <div>分期次数</div>
        <div slot="right">{{repayTimes}}</div>
      </ele>
      <ele :more="true"
           @click="toggleTimeLengthSelectorShown(true)"
           v-else>
        <div>借款时长</div>
        <div slot="right"
             class="flex">
          <div>{{timeLength}}</div>
        </div>
      </ele>
      <ele v-if="buyAmount && (repayTimes != '--请选择--' || timeLength != '--请选择--')">
        <div class="box">
          <div class="computed-list">
            <ele :transparent="true"
                 :no-line="true"
                 class="default">
              <div>实际到账金额</div>
              <div>¥{{computedGot}}</div>
            </ele>
            <div class="tip">
              借款金额{{buyAmount}} - 服务费{{computedFee}} - 手续费{{platformFee}}
            </div>
            <ele :transparent="true"
                 :no-line="true"
                 class="default">
              <div>预计到期本息</div>
              <div>¥{{computedAmount}}</div>
            </ele>
            <div class="tip">
              本金{{buyAmount}} + 利息{{computedRate}}(假设是今天借到款)
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
           :link="'/setPurpose/buy'">
        <div>借款用途</div>
        <div slot="right">{{reason || '请点击选择'}}</div>
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
  import date from 'components/mixin/date'
  import payMoney from 'components/output/payMoney'
  import {
    setTempInfo,
    toggleNeedRefresh
  } from 'store/actions'
  import pay from 'api/pay'
  import prod from 'api/prod'
  import my from 'api/my'
//  import creditCenterUser from 'api/creditCenterUser'
  import { alert, confirm } from 'tools/utils'

  export default{
    vuex: {
      getters: {
        toRegist: state => state.toRegist,
        buy: store => store.temp.buy, // 读取表单缓存
        token: state => state.token
      },
      actions: {
        setTempInfo,
        toggleNeedRefresh
      }
    },
    data () {
      const d = new Date()
      return {
        orderId: '',
        minMoney: '0',
        maxMoney: '0',
        buyAmount: '',
        borrowAmt: '',
        serviceRate: '',
        minService: '',
        yearlyRate: '',
        dateShown: false,
        repayTimes: '--请选择--',
        timeLength: '--请选择--',
        date: {
          y: d.getFullYear(),
          m: d.getMonth() + 1,
          d: d.getDate()
        },
        reason: '',
        payWay: '到期还本付息',
        picUrls: [],
        uploadUrls: [],
        addReason: '',
        id: '',
        timesSelectorShown: false,
        timeLengthSelectorShown: false,
        payShown: false,
        pwd: '',
        minTime: '',
        maxTime: '',
        isCredit: 0,
        checked: false,
        loaded: false,
        maxAmount22: 200000,
        idcard: '',
        allowIouAndBuy: true,
        alertImg: require('../../assets/warning.svg'),
      }
    },
    components: {
      selector,
      date,
      payMoney
    },
    computed: {
      placeholder () {
        return `${this.minMoney}至${this.maxMoney}`
      },
      platformFee () {
        return parseFloat(this.buyAmount) / 100
      },
      computedDays () {
        if (this.payWay > 0) {
          return parseInt(this.repayTimes, 10)
        }
        if (this.timeLength.indexOf('月') > -1) {
          const num = parseInt(this.timeLength, 10)
          const today = new Date()
          const newDate = new Date()
          newDate.setMonth(today.getMonth() + num)
          const m = newDate - today
          const d = Math.ceil(m / (24 * 3600 * 1000))
          return d
        }
        return parseInt(this.timeLength, 10)
      },
      computedRate () {
        const r = this.computedAmount
          - parseFloat(this.buyAmount || 0)
        if (r) {
          return r.toFixed(2)
        }
        return 0
      },
      computedAmount () {
        let cAmount = 0
        this.computedList.forEach((item) => {
          cAmount += parseFloat(item.amount)
        })
        if (cAmount < parseFloat(this.buyAmount || 0)) {
          cAmount = parseFloat(this.buyAmount || 0)
        }
        return cAmount.toFixed(2)
      },
      computedFee () {
        const rate = parseInt(this.serviceRate, 10)
        const min = parseInt(this.minService, 10)
        let fee = 0
        fee = rate * parseFloat(this.buyAmount) / 100
        if (fee < min) {
          fee = min
        }
        return fee
      },
      computedGot () {
        let r = parseFloat(this.buyAmount || 0)
          - parseFloat(this.computedFee)
          - this.platformFee
        if (r < 0) {
          r = 0
        }
        return r.toFixed(2)
      },
      times () {
        let n = 1
        if (this.payWay > 0) {
          n = parseInt(this.repayTimes, 10)
        }
        return n || 1
      },
      perMonth () {
        let r = 0
        if (this.times === 1) {
          r = parseFloat(this.buyAmount || 0)
            * parseInt(this.yearlyRate, 10) / 36500
            * this.computedDays
            + parseFloat(this.buyAmount || 0)
        } else if (parseInt(this.yearlyRate, 10) === 0) {
          r = parseFloat(this.buyAmount || 0) / this.times
        } else {
          const monthRate = parseInt(this.yearlyRate, 10) / 1200
          r = parseInt(this.buyAmount || 0, 10)
            * (monthRate * Math.pow(1 + monthRate, this.times))
            / (Math.pow(1 + monthRate, this.times) - 1)
        }
        return (r || 0).toFixed(2)
      },
      computedList () {
        const cList = []
        if (this.payWay > 0) {
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
              date: `${thisDate.getFullYear() || ''}-`
              + `${tMonth || ''}-`
              + `${tDate || ''}`,
              amount: this.perMonth
            })
          }
        } else {
          const td = new Date()
          const rd = new Date(
            td.getTime() +
            this.computedDays * 24 * 60 * 60 * 1000
          )
          cList.push({
            date: `${rd.getFullYear() || ''}-${(rd
              .getMonth() + 1 || '')}-${rd.getDate() || ''}`,
            amount: this.perMonth
          })
        }
        return cList
      },
      errorList () {
        const list = []
        if (!parseInt(this.buyAmount, 10) ||
          this.buyAmount < this.minMoney ||
          this.buyAmount > this.maxMoney) {
          list.push('借款金额不在出借范围内，请重新输入')
        }
        if (parseFloat(this.buyAmount) > this.maxAmount22) {
          list.push(`借款金额请少于${this.maxAmount22}元`)
        }
        if (this.times === 1 && this.computedDays < 1) {
          list.push('请选择正确的借款时长/分期次数')
        } else if (
          this.repayTimes === '--请选择--' &&
          this.timeLength === '--请选择--') {
          list.push('请选择正确的借款时长/分期次数')
        }
        if (!this.reason) {
          list.push('请选择您的借款用途')
        }
        if (!this.checked) {
          list.push('请同意今借到借款协议')
        }
        return list
      },
      timesList () {
        const list1 = [
          '1天',
          '2天',
          '3天',
          '7天',
          '15天',
          '21天',
          '1个月',
          '3个月',
          '6个月',
          '12个月',
          '24个月',
          '36个月'
        ]
        const list2 = ['3期', '6期', '12期']
        let list = []
        if (this.payWay > 0) {
          list = list2
        } else {
          list = list1
        }
        const startIndex = list.indexOf(this.minTime)
        const endIndex = list.indexOf(this.maxTime)
        return list.splice(startIndex, endIndex - startIndex + 1)
      }
    },
    methods: {
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
      getBorrowAmt () {
        my.getBorrowAmt().then((json) => {
          if (json.n_borrow_amt < this.maxAmount22) {
            this.borrowAmt =
              parseFloat(this.maxAmount22 - json.n_borrow_amt)
                .toFixed(2)
          } else {
            this.borrowAmt = 0
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
              this.allowIouAndBuy = false
            }
          }
          this.getBorrowAmt()
        })
      },
      getUnitCode () {
        if (this.payWay > 0) {
          return 1
        }
        const unit = this.timeLength.split(parseInt(this.timeLength, 10))[1]
        if (unit === '天') {
          return 0
        }
        return 1
      },
      toggleDateShown (e) {
        this.dateShown = e
      },
      setDate (dateObject) {
        this.date = dateObject
      },
      toggleTimesSelectorShown (e) {
        this.timesSelectorShown = e
      },
      setTimes (times) {
        this.repayTimes = times
      },
      toggleTimeLengthSelectorShown (e) {
        this.timeLengthSelectorShown = e
      },
      setTimeLength (timeLength) {
        this.timeLength = timeLength
      },
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
      getOrderId (type) {
        pay.getOrderId(type).then((json) => {
          this.orderId = json
        })
      },
      showPwdFn () {
        if (this.toRegist) {
          setTimeout(() => {
            window._JHsdk.action({
              event: 'zc_ac1'
            })
            alert('请先完成注册')
            this.$router.go('/regist1')
          }, 300)
          return
        }
        const that = this
        if (!this.allowIouAndBuy) {
          confirm(
            '您未满22周岁，不能申请出借产品，可以尝试使用求借款功能。',
            '22岁以下用户请使用求借款',
            [{
              text: '知道了',
              fn () {
                window.history.back()
              }
            }, {
              text: '求借款',
              fn () {
                that.$router.go('/createBid')
              }
            }]
          )
          return
        }
        this.checkValid(() => {
          if (that.isCredit === '1') {
            const todayNow = Date.now()
            const startDay =
              new Date('2017-01-27T00:00+08:00').getTime()
            const endDay =
              new Date('2017-01-30T00:00+08:00').getTime()
            if (todayNow > startDay && todayNow < endDay) {
              confirm(
                '由于支付公司春节无法结算，1月27日00:00至1月29日24:00暂不支持提现，' +
                '其他业务不受影响。',
                '27日至29日暂不支持提现',
                [{
                  text: '知道了',
                  fn () {
                    that.payShown = true
                  }
                }]
              )
            } else {
              const cycleFn = (second) => {
                confirm(
                  `<img src="${that.alertImg}"
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
          } else {
            alert('请填写出借人要求的必备信用资料')
            that.$router.go({
              path: `/updateCreditInfoMy/${
                that.id}/${
                that.buy.requireCar}/${
                that.buy.requireHouse}/${
                that.buy.requireJob}/${
                that.buy.requireIncome}/${
                that.buy.requireXx}/${
                that.buy.requireZx}`,
              replace: true
            })
          }
        })
      },
      close () {
        this.payShown = false
      },
      togglePayShown (e) {
        this.payShown = e
      },
      changePayInfo (e) {
        this.pwd = e.password
      },
      success (e) {
        if (e) {
          window._JHsdk.action({
            event: 'hx_ac7',
            params: {
              id: this.orderId,
            }
          })
          this.togglePayShown(false)
//          feedback('申请成功')
          this.toggleNeedRefresh(true)
          this.$router.go({
            path: `/success/${this.buyAmount}`,
            replace: true,
          })
        } else {
          this.togglePayShown(false)
          this.getOrderId()
        }
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
      next () {
        /* eslint-disable */
        window._vds.push(['setPageGroup', 'buy'])
        window._vds.push(['setPS1', this.orderId])
        window._vds.push(['setPS2', this.buyAmount || 0])
        window._vds.push(['setPS3', `${this.times} ${this.getUnitCode() ? '月/期' : '天'}`])
        window._vds.push(['setPS4', this.payWay])
        window._vds.push(['setPS5', this.reason])
        window._vds.push(['setPS6', this.id])
        /* eslint-enable */
        return prod.applyProduct({
          pwd: md5(md5(this.pwd)),
          orderId: this.orderId,
          productId: this.id,
          amount: parseInt(this.buyAmount, 10),
          times: this.payWay > 0 ?
            parseInt(this.repayTimes, 10) :
            parseInt(this.timeLength, 10),
          reason: this.reason,
          reasonDetail: this.addReason,
          pics: this.uploadUrls,
          unit: this.getUnitCode()
        })
      },
      blur () {
        this.buyAmount = parseInt(this.buyAmount || 0, 10)
      }
    },
    route: {
      data ({ to: { params: { id, isCredit } } }) {
        this.id = id
        // 应用表单缓存
        let buy = {}
        if (Object.keys(this.buy).length > 0) {
          Object.assign(this.$data, this.buy)
          buy = this.buy
        }
        if (Object.keys(buy).length < 1) {
          window.history.back()
          return
        }
        if (this.token) {
          this.getCapitalLeft()
        }
        this.getOrderId()
        this.getBorrowAmt22()
//        this.getBorrowAmt()
        this.isCredit = isCredit
        this.loaded = true
      },
      deactivate ({ next }) {
        // 缓存表单
        this.setTempInfo({ buy: this.$data })
        next()
      }
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import '../../scss/fragment';

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

  .computed-title {
    @extend %computed-title;
  }

  .computed-list {
    @extend %computed-list;
  }

  .box {
    flex: 1;
  }

  .flex {
    @extend %date-computed;
  }

  .income {
    flex: 1;
    text-align: center;
    &::before,
    &::after {
      @extend %row-border;
      width: 15%;
      top: 25px;
      left: 20%;
    }
    &::after {
      left: 65%;
    }
  }

  .margin-bottom {
    margin-bottom: -10px;
  }
</style>
