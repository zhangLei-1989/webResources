<template>
  <div v-if="loaded">
    <pay-money :show="payShown"
               :fn="create"
               :only-pwd="true"
               @change-info="changePayInfo"
               @success="success"
               @toggle-pay="togglePayShown"></pay-money>
    <date :show="borrowDateShown"
          @toggle="toggleBorrowDateShown"
          :default-date="borrowDate"
          :max="maxDate"
          @set-date="setBorrowDate"></date>
    <date :show="repayDateShown"
          @toggle="toggleRepayDateShown"
          :default-date="repayDate"
          :min="minDate"
          @set-date="setRepayDate"></date>
    <selector :show="rateSelectorShown"
              :default-data="rate"
              :value-list="rateList"
              @set-data="setRate"
              @toggle="toggleRateSelectorShown"></selector>
    <group :fixed="true">
      <btn :text="'确定'"
           :cut="1"
           :next="true"
           :btn-fn="showPwdFn"></btn>
    </group>
    <group :first="true">
      <div v-if="type=='borrower'"
           class="tips">
        您当前的可借款额度为<span>{{borrowAmt}}</span>元
      </div>
      <ele>
        <div>借款金额</div>
        <input growing-track="true"
               slot="right"
               type="number"
               placeholder="请输入整数"
               v-model="amount">
        <div slot="unit">元</div>
      </ele>
      <ele :more="true"
           @click="toggleBorrowDateShown(true)">
        <div>借款日期</div>
        <div slot="right">{{borrowDate.y}}-{{borrowDate.m}}-{{borrowDate.d}}</div>
      </ele>
      <ele :more="true"
           @click="toggleRepayDateShown(true)">
        <div>还款日期</div>
        <div slot="right">{{repayDate.y}}-{{repayDate.m}}-{{repayDate.d}}</div>
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
      <ele class="computed-amount">
        <div>
          本金{{amount || '0'}} + 利息{{computedRate}} = 到期本息
          <span>{{computedAmount}}</span>
          元
        </div>
      </ele>
    </group>
    <group>
      <ele :more="true"
           :link="'/setPurpose/createIOU'">
        <div>借款用途</div>
        <div slot="right">{{reason || '请点击选择'}}</div>
      </ele>
    </group>
    <group>
      <ele>
        <div>对方姓名（{{type=='lender'?'借款人':'出借人'}}）</div>
        <input growing-track="true"
               slot="right"
               type="text"
               placeholder="正确才能生效哦"
               maxlength="20"
               v-model="receiver">
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
    <group>
      <div slot="tip_bottom"
           class="tip">
        <div>
          提示<br>
          <span class="warning">1、补借条不享受服务费和逾期管理费奖励政策，不能线上走账，不支持逾期催收，存在较大的风险，如果不是非常亲密的关系，不建议您使用此功能</span><br>
          <span class="warning">2、如果您是现金交易请不要补借条，一旦发生争议，因为双方无法提供交易证据，平台会将借条置为有争议状态</span><br>
          3、补借条的待确认有效期为3天，到期自动关闭<br>
          4、补借条不支持线上出借，请确保你们已经线下交易完毕
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
  import iou from 'api/iou'
  import pay from 'api/pay'
  import my from 'api/my'
  import creditCenterUser from 'api/creditCenterUser'
  import { alert, feedback, confirm } from 'tools/utils'
  import {
    setTempInfo,
    toggleNeedRefresh
  } from 'store/actions'
  import user from 'api/user'

  export default{
    vuex: {
      getters: {
        createIOU: store => store.temp.createIOU, // 读取表单缓存
        userInfo: state => state.userInfo,
        noTipLenderCreate: state => state.temp.cache.noTipLenderCreate,
        noTipBorrowerCreate: state => state.temp.cache.noTipBorrowerCreate
      },
      actions: {
        setTempInfo,
        toggleNeedRefresh
      }
    },
    data () {
      return {
        orderId: '',
        amount: '',
        borrowAmt: '',
        borrowDateShown: false,
        repayDateShown: false,
        rateSelectorShown: false,
        borrowDate: {
          y: '',
          m: '',
          d: ''
        },
        repayDate: {
          y: '',
          m: '',
          d: ''
        },
        rateList: [
          '0%', '1%', '2%', '3%', '4%',
          '5%', '6%', '7%', '8%', '9%',
          '10%', '11%', '12%', '13%', '14%',
          '15%', '16%', '17%', '18%', '19%',
          '20%', '21%', '22%', '23%', '24%'],
        rate: '0%',
        reason: '',
        addReason: '',
        receiver: '',
        type: '',
        picUrls: [],
        uploadUrls: [],
        pwd: '',
        payShown: false,
        checked: false,
        alertImg: require('../../assets/warning.svg'),
        haveSeenNotice: false,
        successCreated: false,
        loaded: false,
        maxAmount23: 200000,
        idcard: '',
        creditOk: '', // 作为借款人是否可用
        b_lender_credit: '', // 作为借款人是否可用
        isCheckCredit: false, // 是否检测认证
        b_recover: '', // 运营商通道是否恢复
        b_skip: '', // 是否跳过运营商认证
      }
    },
    watch: {
      noTipLenderCreate (e) {
        this.changeDot(e)
      },
      noTipBorrowerCreate (e) {
        this.changeDot(e)
      }
    },
    components: {
      date,
      selector,
      payMoney
    },
    computed: {
      minDate () {
        const d = this.borrowDate
        const d1 = new Date(d.y, parseInt(d.m, 10) - 1, d.d)
        const d2 = new Date(d1.getTime() + 24 * 3600 * 1000)
        return `${d2.getFullYear()}-${d2.getMonth() + 1}-${d2.getDate()}`
      },
      maxDate () {
        const d = this.repayDate
        const d1 = new Date(d.y, parseInt(d.m, 10) - 1, d.d)
        const d2 = new Date(d1.getTime() - 24 * 3600 * 1000)
        return `${d2.getFullYear()}-${d2.getMonth() + 1}-${d2.getDate()}`
      },
      errorList () {
        const list = []
        if (!parseInt(this.amount, 10) || parseInt(this.amount, 10) <= 0) {
          list.push('请输入正确的借款金额')
        }
        if (parseInt(this.amount, 10) > this.borrowAmt) {
          list.push(`借款金额请少于${this.borrowAmt}元`)
        }
        if (this.computedDays < 1) {
          list.push('出借日期与还款日期至少间隔1天')
        }
        if (!this.reason) {
          list.push('请选择借款用途')
        }
        if (!this.receiver.trim()) {
          list.push('请输入对方姓名')
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
      },
      computedDays () {
        const d1 = this.borrowDate
        const start = new Date(d1.y, parseInt(d1.m, 10) - 1, d1.d).getTime()
        const d2 = this.repayDate
        const end = new Date(d2.y, parseInt(d2.m, 10) - 1, d2.d).getTime()
        const m = end - start
        const d = Math.ceil(m / (24 * 3600 * 1000))
        return d > 0 ? d : 0
      },
      computedRate () {
        const r = this.computedAmount
          - parseFloat(this.amount || 0)
        if (r) {
          return r.toFixed(2)
        }
        return 0
      },
      computedAmount () {
        const cAmount = parseFloat(this.amount || 0)
          * parseInt(this.rate, 10) / 36500
          * this.computedDays
          + parseFloat(this.amount || 0)
        return cAmount.toFixed(2)
      }
    },
    methods: {
      getPayInfo () {
        pay.checkCredit().then((json) => {
          if (!this.cTel) {
            this.tel = json.c_telephone
          }
          this.creditOk = json.b_credit ? 1 : 0
          this.b_lender_credit = json.b_lender_credit
          pay.checkOpration().then((res) => {
            this.b_recover = res.b_recover
            this.b_skip = res.b_skip
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
      operatorNotCover () {
        confirm(
          `<img src="${this.alertImg}"
                      style="width: 80px; margin-top: 10px">
                      <div style="text-align: left">由于您的运营商通道未恢复,您的信用报告缺失运营商数据,但不影响您的出借功能</div>`,
          '提示',
          [{
            text: '知道了',
            fn () {
            },
          }]
        )
      },
      operatorNoRecoverWarn () {
        confirm(
          `<img src="${this.alertImg}"
                      style="width: 80px; margin-top: 10px">
                      <div style="text-align: left">由于您的运营商通道未恢复,您的信用报告缺失运营商数据,但不影响您的求借款功能</div>`,
          '',
          [{
            text: '知道了'
          }]
        )
      },
      toggleCheck () {
        this.checked = !this.checked
      },
      toggleBorrowDateShown (e) {
        this.borrowDateShown = e
      },
      getBorrowAmt () {
        my.getBorrowAmt().then((json) => {
          if (json.n_borrow_amt < this.maxAmount23) {
            this.borrowAmt =
              parseFloat(parseFloat(this.maxAmount23 - json.n_borrow_amt).toFixed(2))
          } else {
            this.borrowAmt = 0
          }
        })
      },
      getBorrowAmt23 () {
        creditCenterUser.getZhiMaCreditParams().then((json) => {
          this.idcard = json.certNo
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
          if (tdNumber - bdNumber < 230000) {
            this.maxAmount23 = 8000
          }
          this.getBorrowAmt()
        })
      },
      setBorrowDate (dateObject) {
        this.borrowDate = dateObject
      },
      toggleRepayDateShown (e) {
        this.repayDateShown = e
      },
      setRepayDate (dateObject) {
        this.repayDate = dateObject
      },
      toggleRateSelectorShown (e) {
        this.rateSelectorShown = e
      },
      setRate (rate) {
        this.rate = rate
      },
      getOrderId () {
        pay.getOrderId().then((json) => {
          this.orderId = json
        })
      },
      showPwdFn () {
        this.checkValid(() => {
          const repayTime = (new Date(
            this.repayDate.y,
            parseInt(this.repayDate.m, 10) - 1,
            this.repayDate.d
          )).getTime()
          const currentTime = new Date().getTime()
          const next3daysTime = new Date(currentTime + 259200000).getTime()
          /* eslint-disable */
          if (this.creditOk) {
            if (repayTime < currentTime) {
              this.tooEarlyWarning()
            } else if (repayTime < next3daysTime) {
              this.tooShortWarning()
            } else {
              this.normalNextStep()
            }
          } else {
            if (this.type === 'borrower') {
              if (this.b_lender_credit === 1) {
                if (this.b_skip === false) {
                  this.noPassOperator()
                } else {
                  if (this.b_recover) {
                    this.checkOperatorWarn()
                  } else {
                    this.operatorNotCover()
                  }
                }
              } else {
                // todo 提示认证数据
                this.creditFailed()
              }
            } else if (this.type === 'lender') {
              if (this.b_lender_credit === 1) {
                this.normalNextStep()
              } else {
                // todo 提示认证数据
                this.creditFailed()
              }
            }
          }
          /* eslint-enable */
        })
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
      normalNextStep () {
        const that = this
        confirm(
          `<img src="${that.alertImg}"
                        style="width: 80px; margin-top: 10px">
                        <div style="color:#ed594e; text-align: left">
                        借条是为已经完成的借贷行为补一张借条，不走帐，
                        作为电子凭证，请确保你们已经线下交易完毕。</div>
                        <div style="text-align: left; margin-top: 10px">
                        对方确认后借条即刻生效，要发起该借条吗？</div>`,
          '',
          [{
            text: '不发起'
          }, {
            text: '发起',
            fn () {
              that.payShown = true
            }
          }]
        )
      },
      tooEarlyWarning () {
        const that = this
        confirm('该借条的还款日期早于当前时间，借条生效后马上就会产生逾期，请您再次确认还款日期无误。',
          '提示',
          [{
            text: '返回修改'
          }, {
            text: '确认无误',
            fn () {
              that.payShown = true
            }
          }]
        )
      },
      tooShortWarning () {
        const that = this
        confirm('距离该借条还款日不足3天，借条生效后很快就会产生逾期，请您再次确认还款日期无误。',
          '提示',
          [{
            text: '返回修改'
          }, {
            text: '确认无误',
            fn () {
              that.payShown = true
            }
          }]
        )
      },
      /* eslint-disable max-len */
      riskWarning (type) {
        let url = '/'
        let btnText = '今借到'
        let text = ''
        if (type === 'lender') {
          url = `/productList/${this.userInfo.userId}`
          btnText = '去出借'
          text = '补借条不享受服务费和逾期管理费奖励政策，不能线上走账，不支持逾期催收，存在较大的风险，如果不是非常亲密的关系，建议您使用去出借功能'
        } else if (type === 'borrower') {
          url = '/createBid'
          btnText = '求借款'
          text = '补借条不能通过平台走账，存在较大的欺诈风险，<span style="color:#ed594e">请确保已经收到钱</span>再来补借条，如果不是非常亲密的关系，建议您使用求借款功能'
        }
        const that = this
        const noMore = document.createElement('div')
        const noMoreDot = document.createElement('div')
        noMoreDot.id = 'no-more-dot'
        noMoreDot.setAttribute('style', 'width:16px;height:16px;border:2px solid #ccc;border-radius:8px;position:absolute;top:2px;left:0')
        const noMoreText = document.createElement('div')
        noMoreText.setAttribute('style', 'padding-left:20px')
        noMoreText.textContent = '不再提示'
        noMore.appendChild(noMoreDot)
        noMore.appendChild(noMoreText)
        noMore.setAttribute('style', 'text-align:left;color:#999;margin-top:10px;position:relative')
        noMore.addEventListener('click', () => {
          this.noMoreTip(type)
        })
        confirm(
          `<img src="${that.alertImg}"
                    style="width: 80px; margin-top: 10px">
                    <div style="color:#ed594e">
                    补借条有风险，推荐${btnText}</div>
                    <div style="text-align: left; margin-top: 10px">
                    ${text}</div><div id="no-more-tip"></div>`,
          '',
          [{
            text: '坚持补借条',
            fn () {
              that.haveSeenNotice = true
            }
          }, {
            text: `试试${btnText}`,
            fn () {
              that.haveSeenNotice = true
              that.$router.go({
                path: url,
                replace: true
              })
            }
          }]
        )
        this.$nextTick(() => {
          const noMoreTip = document.getElementById('no-more-tip')
          if (!noMoreTip.childNodes[0]) {
            noMoreTip.appendChild(noMore)
          }
        })
      },
      changeDot (e) {
        const dot = document.getElementById('no-more-dot')
        if (e) {
          dot.setAttribute('style', 'width:16px;height:16px;border:2px solid #ccc;border-radius:8px;position:absolute;top:2px;left:0;background-color:#000')
        } else {
          dot.setAttribute('style', 'width:16px;height:16px;border:2px solid #ccc;border-radius:8px;position:absolute;top:2px;left:0')
        }
      },
      /* eslint-enable max-len */
      noMoreTip (type) {
        if (type === 'lender') {
          user.saveCache({
            noTipLenderCreate: !this.noTipLenderCreate
          })
        } else if (type === 'borrower') {
          user.saveCache({
            noTipBorrowerCreate: !this.noTipBorrowerCreate
          })
        }
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
        window._vds.push(['setPageGroup', 'createIOU'])
        window._vds.push(['setPS1', this.orderId])
        window._vds.push(['setPS2', this.amount || 0])
        window._vds.push(['setPS3', this.type])
        window._vds.push(['setPS4', this.rate])
        window._vds.push(['setPS5', this.reason])
        /* eslint-enable */
        return iou.addIOU({
          id: this.orderId,
          amount: parseInt(this.amount, 10),
          rate: parseInt(this.rate, 10),
          reason: this.reason,
          addReason: this.addReason,
          borrower: this.type === 'borrower' ?
            this.userInfo.nickname : this.receiver.trim(),
          lender: this.type === 'lender' ?
            this.userInfo.nickname : this.receiver.trim(),
          creatorType: this.type === 'lender' ? 1 : 0,
          picUrls: this.uploadUrls,
          borrowDate: (new Date(
            this.borrowDate.y,
            parseInt(this.borrowDate.m, 10) - 1,
            this.borrowDate.d
          )).getTime(),
          repayDate: (new Date(
            this.repayDate.y,
            parseInt(this.repayDate.m, 10) - 1,
            this.repayDate.d
          )).getTime(),
          pwd: md5(md5(this.pwd))
        })
      },
      changePayInfo (e) {
        this.pwd = e.password
      },
      goService () {
        this.$router.go({
          path: '/iouService7/0',
          replace: false
        })
      },
      success (e) {
        if (e) {
          if (this.type === 'borrower') {
            window._JHsdk.action({
              event: 'hx_ac2',
              params: {
                id: this.orderId
              }
            })
          } else {
            window._JHsdk.action({
              event: 'hx_ac3',
              params: {
                id: this.orderId
              }
            })
          }
          this.togglePayShown(false)
          this.toggleNeedRefresh(true)
          feedback('借条创建成功')
          this.successCreated = true
          this.$router.go({
            path: `/shareQr/iou/0/${this.orderId}`,
            replace: true
          })
        } else {
          this.togglePayShown(false)
          this.getOrderId()
        }
      },
      blur () {
        this.amount = parseInt(this.amount || 0, 10)
      },
    },
    route: {
      data ({ to: { params: { type } } }) {
        // 应用表单缓存
        const localCreateIou = JSON.parse(
          window.localStorage.localCreateIou || '{}'
        )
        if (Object.keys(this.createIOU).length > 0) {
          Object.assign(this.$data, this.createIOU)
          if (!this.createIOU.borrowDate || !this.createIOU.borrowDate.y) {
            const d1 = new Date()
            this.borrowDate = {
              y: d1.getFullYear(),
              m: d1.getMonth() + 1,
              d: d1.getDate()
            }
          }
          if (!this.createIOU.repayDate || !this.createIOU.repayDate.y) {
            const d2 = new Date(
              (new Date()).getTime() + 24 * 3600 * 1000
            )
            this.repayDate = {
              y: d2.getFullYear(),
              m: d2.getMonth() + 1,
              d: d2.getDate()
            }
          }
        } else {
          Object.assign(this.$data, localCreateIou)
          const d1 = new Date()
          const d2 = new Date((new Date()).getTime() + 24 * 3600 * 1000)
          this.borrowDate = {
            y: d1.getFullYear(),
            m: d1.getMonth() + 1,
            d: d1.getDate()
          }
          this.repayDate = {
            y: d2.getFullYear(),
            m: d2.getMonth() + 1,
            d: d2.getDate()
          }
        }
        this.type = type
        this.close()
        this.getOrderId()
//                this.getBorrowAmt23()
        this.getBorrowAmt()
        this.loaded = true
      },
      deactivate ({ next }) {
        if (this.successCreated) {
          this.successCreated = false
          if (window.localStorage.localCreateIou) {
            window.localStorage.removeItem('localCreateIou')
          }
          // 清除表单
          this.setTempInfo({ createIOU: { } })
        } else {
          window.localStorage.localCreateIou =
            JSON.stringify(this.$data)
          // 缓存表单
          this.setTempInfo({ createIOU: this.$data })
        }
        next()
      }
    },
    created () {
    },
    attached () {
      setTimeout(() => {
        if (
          this.type === 'lender' &&
          !this.noTipLenderCreate &&
          !this.haveSeenNotice
        ) {
          this.riskWarning(this.type)
        } else if (
          this.type === 'borrower' &&
          !this.noTipBorrowerCreate &&
          !this.haveSeenNotice
        ) {
          this.riskWarning(this.type)
        }
      }, 300)
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import '../../scss/fragment';

  input {
    overflow: scroll;
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

  .computed-amount {
    min-height: 40px !important;
    div {
      flex: 1;
      text-align: right;
      font-size: $TIP_FONT_SIZE;
      color: $TIP_COLOR;
    }
    span {
      color: $MAIN_COLOR;
    }
  }

  .warning {
    color: $MAIN_COLOR;
  }
</style>
