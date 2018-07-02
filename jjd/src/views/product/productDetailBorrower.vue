<template>
  <div v-if="showContent">
    <group :fixed="true"
           :single="true">
      <btn :cut="1"
           :next="true"
           :allow="!isSelf"
           :text="'马上申请'"
           :btn-fn="buy"></btn>
    </group>
    <group :first="true">
      <ele>
        <div class="title-left"
             solt="left">
          <div class="user-icon"
               :style="{backgroundImage: 'url(' + imgSrc + ')'}"></div>
          <div class="user-info">
            <div class="basic-info">{{name}}</div>
            <div class="tel-bg">{{tel}}</div>
          </div>
        </div>
        <div class="title-right"
             solt="right">
          <btn :cut="2"
               :text="'全部产品'"
               :min="true"
               :btn-fn="prodList"></btn>
          <btn :cut="2"
               :text="'信用报告'"
               :min="true"
               :btn-fn="creditReport"></btn>
        </div>
      </ele>
      <ele class="no-padding">
        <border-box :cut="3">
          <div solt="left"
               class="block">
            <div>待收金额</div>
            <div>{{forReceive}}<span>元</span></div>
          </div>
        </border-box>
        <border-box :cut="3">
          <div class="block">
            <div>待还金额</div>
            <div>{{forPay}}<span>元</span></div>
          </div>
        </border-box>
        <border-box :cut="3">
          <div solt="right"
               class="block">
            <div>正在担保金额</div>
            <div>{{guarantee}}<span>元</span></div>
          </div>
        </border-box>
      </ele>
    </group>
    <group>
      <ele>
        <div style="padding: 10px 0;line-height: 30px"
             solt="left">
          <img class="detail"
               src="../../assets/product.svg">产品编号
          <span>{{prodId}}</span>
          <div class="prod_detail">
            <span>{{applyNum}}人申请</span>
            <span>{{passRate}}%通过</span>
            <span>{{speed}}小时处理</span>
            <span v-if="latestDay">最近成交{{getDaysAgo(latestDay)}}天<span v-if="getDaysAgo(latestDay) < 1">前</span></span>
            <span v-else>暂无成交记录</span>
          </div>
        </div>
      </ele>
      <ele>
        <div style="width:100%;margin: 15px 0;">
          <div class="row-a">
            <div>借款金额</div>
            <div>
              <span>{{minMoney}}元</span>至<span>{{maxMoney}}元</span>
            </div>
          </div>
          <div class="row-a">
            <div>借款时长</div>
            <div>
              <span>{{minTime}}</span>至<span>{{maxTime}}</span>
            </div>
          </div>
          <div class="row-a">
            <div>还款方式</div>
            <div>{{payWay == '0' ? '到期还本付息' : '等额本息'}}</div>
          </div>
          <div class="row-a">
            <div>年化利率</div>
            <div>{{yearlyRate}}%</div>
          </div>
          <div class="row-a">
            <div class="tip-box">
              <span>服务费</span>
              <span class="tip-alert"
                    @click.stop.prevent="tipAlertFee"></span>
            </div>
            <div>{{serviceRate}}% | {{minService}}元</div>
          </div>
        </div>
      </ele>
    </group>
    <group v-if="list.length !== 0">
      <ele>
        <div style="padding: 10px 0;line-height: 30px;width: 100%"
             solt="left">
          <img class="detail"
               src="../../assets/essentialInfo.svg">必备资料
          <div class="block"
               style="height: auto; text-align: left">
            <btn :cut="5"
                 :text="item"
                 class="small-btn"
                 v-for="item in list">{{item}}
            </btn>
          </div>
        </div>
      </ele>
    </group>
    <group v-if="addText">
      <ele>
        <div style="padding: 10px 0;line-height: 30px;width: 100%"
             solt="left">
          <img class="detail"
               src="../../assets/addReason.svg">补充说明
          <div style="height: auto;font-size: 14px">
            {{addText}}
          </div>
        </div>
      </ele>
    </group>
    <group>
      <div slot="tip_bottom"
           class="tip">
        <div>
          提示<br>
          在平台储备金范围内，支持所有人任何时间立即提现
        </div>
      </div>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import borderBox from 'components/mixin/borderBox'
  import prod from 'api/prod'
  import my from 'api/my'
  import { shareProd } from 'tools/share'
  import { setTempInfo } from 'store/actions'
  import { alert, confirm } from 'tools/utils'
  import pay from 'api/pay'

  export default {
    vuex: {
      getters: {
        openId: state => state.userInfo.openId,
        userId: state => state.userInfo.userId,
        firstTime: state => state.temp.cache.prodFirstTime,
        toRegist: state => state.toRegist
      },
      actions: {
        setTempInfo
      }
    },
    data () {
      return {
        imgSrc: '',
        cUserId: '',
        name: '',
        forReceive: '',
        forPay: '',
        guarantee: '',
        minMoney: '',
        maxMoney: '',
        minTime: '',
        maxTime: '',
        payWay: '',
        yearlyRate: '',
        serviceRate: '',
        minService: '',
        prodId: '',
        createTime: '',
        tel: '',
        addText: '',
        applyNum: 1,
        passRate: 0,
        latestDay: 1,
        speed: 1,
        list: [],
        showContent: false,
        isSelf: true,
        userCredit: {},
        requireCar: 0,
        requireHouse: 0,
        requireIncome: 0,
        requireJob: 0,
        requireXx: 0,
        requireZx: 0,
        allowIouAndBuy: true,
        creditOk: '', // 作为借款人是否可用
        b_lender_credit: '', // 作为借款人是否可用
        isCheckCredit: false, // 是否检测认证
        b_recover: '', // 运营商通道是否恢复
        b_skip: '', // 是否跳过运营商认证
      }
    },
    methods: {
      getPayInfo () {
        pay.checkCredit().then((json) => {
          if (!this.cTel) {
            this.tel = json.c_telephone
          }
          this.creditOk = json.b_credit
          this.b_lender_credit = json.b_lender_credit
          pay.checkOpration().then((res) => {
            const that = this
            this.b_recover = res.b_recover
            this.b_skip = res.b_skip
            if (this.creditOk === 0 && this.b_lender_credit === 1 && this.b_skip === false) {
              that.noPassOperator()
            } else if (this.creditOk === 1 && this.b_skip === true && this.b_recover === true) {
              this.checkOperatorWarn()
            } else if (this.creditOk === 1 && this.b_skip === true && !this.b_recover) {
              this.operatorNoRecoverWarn()
            } else {
              this.nextStep()
            }
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
      getDaysAgo (e) {
        const s = ((new Date()).getTime() - new Date(e))
          / (1000 * 24 * 3600)
        if (s < 1) {
          return '今'
        } else if (s > 90) {
          return '90'
        }
        return parseInt(s, 10)
      },
      getUnitTimes (u) {
        if (u === 0) {
          return '天'
        }
        return '个月'
      },
      getProdDetail () {
        prod.getProduct({
          id: this.prodId,
          openId: this.openId
        }).then((json) => {
          this.cUserId = json.c_user_id
          this.isSelf = this.userId === json.c_user_id
          this.imgSrc = json.c_head
          this.name = json.c_name
          this.tel = json.c_telephone
          this.forPay = json.n_to_repay_amt
          this.forReceive = json.n_to_receive_amt
          this.guarantee = json.n_current_guarantee_amt
          this.minMoney = json.n_min_amt
          this.maxMoney = json.n_max_amt
          this.payWay = json.n_repay_type
          if (this.payWay === 0) {
            this.minTime = `${json
              .n_min_tm}${json.n_min_tm_unit > 0 ? '个月' : '天'}`
            this.maxTime = `${json
              .n_max_tm}${json.n_max_tm_unit > 0 ? '个月' : '天'}`
          } else {
            this.minTime = `${json.n_min_tm}期`
            this.maxTime = `${json.n_max_tm}期`
          }
          this.yearlyRate = json.n_interest_rate
          this.serviceRate = json.n_service_fee_rate
          this.minService = json.n_min_service_fee
          this.createTime = json.c_lastest_deal_tm
          this.prodId = json.id
          this.addText = json.c_memo
          this.applyNum = json.n_apply_cnt
          this.passRate = json.n_pass_rate
          this.latestDay = json.t_lastest_deal_tm
          this.speed = json.n_deal_tm
          this.userCredit = json.view_user_credit
          this.requireCar = json.b_require_car_info
          this.requireHouse = json.b_require_house_info
          this.requireIncome = json.b_require_income_info
          this.requireJob = json.b_require_job_info
          this.requireXx = json.b_require_xuexin_info
          this.requireZx = json.b_require_zhengxin_info
          let timeLength = ''
          const minTime = `${json.n_min_tm}${
            this.getUnitTimes(json.n_min_tm_unit)}`
          const maxTime = `${
            json.n_max_tm}${this.getUnitTimes(json.n_max_tm_unit)}`
          if (minTime === maxTime) {
            timeLength = maxTime
          } else {
            timeLength = `${minTime}-${maxTime}`
          }
          shareProd({
            amount: `${json.n_min_amt}-${json.n_max_amt}`,
            rate: json.n_interest_rate,
            timeLength,
            link: `${window.$config.domain}#!/productDetailBorrower/${this.prodId}?share=1`,
            id: this.prodId,
          })
          if (json.b_require_car_info === 1) {
            this.list.push('车产证明')
          }
          if (json.b_require_house_info === 1) {
            this.list.push('房产证明')
          }
          if (json.b_require_income_info === 1) {
            this.list.push('收入证明')
          }
          if (json.b_require_job_info === 1) {
            this.list.push('工作证明')
          }
          if (json.b_require_xuexin_info === 1) {
            this.list.push('学信信息')
          }
          if (json.b_require_zhengxin_info === 1) {
            this.list.push('征信信息')
          }
          /* eslint-disable */
          window._vds.push(['setPageGroup', 'prodDetail'])
          window._vds.push(['setPS1', this.prodId])
          window._vds.push(['setPS2', json.n_min_amt])
          window._vds.push(['setPS3', json.n_max_amt])
          window._vds.push(['setPS4', json.n_repay_type ? '等额本息' : '到期还本付息'])
          window._vds.push(['setPS5', this.minTime])
          window._vds.push(['setPS6', this.maxTime])
          /* eslint-enable */
        })
      },
      nextStep () {
        const that = this
        if (!this.allowIouAndBuy) {
          confirm(
            '您未满22周岁，不能申请出借产品，可以尝试使用求借款功能。',
            '22岁以下用户请使用求借款',
            [{
              text: '知道了',
              fn () {
//                window.history.back()
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
        if (this.userCredit.b_car_info >= this.requireCar &&
          this.userCredit.b_earn_info >= this.requireIncome &&
          this.userCredit.b_house_info >= this.requireHouse &&
          this.userCredit.b_job_info >= this.requireJob &&
          this.userCredit.b_xuexin_info >= this.requireXx &&
          this.userCredit.b_zhengxin_info >= this.requireZx) {
          this.$router.go(`/buy/${this.prodId}/1`)
        } else {
          this.$router.go(`/buy/${this.prodId}/0`)
               //      this.$router.go(
               //       `/updateCreditInfoMy/${
               //         this.prodId}/${
               //          this.requireCar}/${
               //          this.requireHouse}/${
               //          this.requireJob}/${
               //      this.requireIncome}/${
               //      this.requireXx}/${
               //        this.requireZx}`)
        }
      },
      buy () {
        this.getPayInfo()
      },
      creditReport () {
        if (this.toRegist) {
          window._JHsdk.action({
            event: 'zc_ac1'
          })
          alert('请先完成注册')
          this.$router.go('/regist1')
        } else {
          window._JHsdk.action({
            event: 'ck_ac3',
            params: {
              id: this.cUserId
            }
          })
          this.$router.go(`/creditReportSimpleMine/${this.cUserId}`)
        }
      },
      prodList () {
        window._JHsdk.action({
          event: 'ck_ac4',
          params: {
            id: this.cUserId
          }
        })
        this.$router.go(`/productList/${this.cUserId}`)
      },
      tipAlertFee () {
        alert('<div style="text-align: left">' +
          '服务费计算规则：<br>' +
          '1、服务费=借款金额*服务费率；<br>' +
          '2、如果计算结果小于最低额度，按照最低额度收取。</div>')
      },
      getAgeInfo () {
        my.getMyCompleteIdcard().then((json) => {
          if (!json.b_bind_card) {
            return
          }
          const idcard = json.c_id_card_no
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
          const bdNumber = parseInt(idcard.slice(6, 14), 10)
          if (tdNumber - bdNumber < 220000) {
            this.allowIouAndBuy = false
          } else {
            this.allowIouAndBuy = true
          }
        })
      },
    },
    components: {
      borderBox
    },
    route: {
      data ({ to: { query: { share }, params: { id } } }) {
        this.prodId = id
        if (!this.firstTime && share) {
          this.$router.go({
            path: `/prodOnce/${id}`,
            replace: true
          })
        } else {
          this.getProdDetail()
          this.getAgeInfo()
          this.showContent = true
        }
      },
      deactivate ({ next }) {
        // 缓存表单
        this.setTempInfo({ buy: this.$data })
        next()
      }
    }
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/function';

  .title-left {
    display: flex;
    flex-direction: row;
    padding: 10px 0;
    .user-info {
      padding: 5px;
      line-height: 20px;
      font-size: $MIN_FONT_SIZE;
      .basic-info {
        width: 70px;
        height: 20px;
        font-size: $TIP_FONT_SIZE;
      }
    }
  }

  .title-right {
    display: flex;
    button {
      width: 100% !important;
      margin: 5px;
      padding: 0 3px 0 18px;
      background: {
        size: 12px 12px;
        position: 3px;
        repeat: no-repeat;
      }
      font-size: $MIN_FONT_SIZE;
    }

    button:first-child {
      background-image: url('../../assets/product.svg');
    }

    button:nth-child(2) {
      background-image: url('../../assets/creditInfo.svg');
      margin-right: 0;
    }
  }

  .user-icon {
    height: 44px;
    width: 44px;
    border-radius: 100%;
    background-size: 44px 44px;
  }

  .block {
    height: 50px;
    text-align: center;
    font-size: $MIN_FONT_SIZE;
    padding-top: 5px;
    div {
      &:first-child {
        line-height: 20px;
        color: $TIP_COLOR;
      }
      &:last-child {
        line-height: 20px;
      }
    }
    button {
      user-select: none;
      color: $MAIN_TEXT_COLOR;
      border-color: $BORDER_COLOR;
      background-image: none;
      padding: 0;
      margin: 5px;
    }
  }

  .detail {
    width: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  img {
    position: relative;
    top: 4px;
  }

  .row-a {
    font-size: $TIP_FONT_SIZE;
    display: flex;
    height: 30px;
    line-height: 30px;
    justify-content: space-between;
    background-color: $ELE_W_COLOR;
    div {
      display: flex;
      flex-direction: row;
    }

  }

  .row-b {
    padding: 10px 0;
    line-height: 20px;
  }

  .link {
    color: $LINK_COLOR;
  }

  .btn-box {
    display: flex;
    flex-direction: row-reverse;
    button {
      padding: 0 5px;
      background: none;
    }
    button:last-child {
      color: $MAIN_TEXT_COLOR;
      border-color: $BORDER_COLOR;
    }
  }

  .prod_detail {
    height: 15px;
    line-height: 20px;
    display: flex;
    flex-direction: row;
    font-size: $MIN_FONT_SIZE;
    span {
      padding: 0 5px;
      border-right: 1px solid $BORDER_COLOR;
      line-height: 15px;
      &:last-child {
        border-right: none;
      }
    }
  }

  .tel-bg {
    background: url(../../assets/operators_main.svg) -3px center no-repeat;
    background-size: 15px 22px;
    padding: 0 0 0 15px;
  }

  .small-btn {
    height: 30px;
    line-height: 30px;
    margin: 0;
    padding: 0 5px !important;
    font-size: $MIN_FONT_SIZE;
  }

  .no-padding {
    padding: 0;
  }
  .aaa{
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
