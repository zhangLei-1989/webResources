<template>
  <div>
    <group :single="true"
           :fixed="true">
      <btn :text="'支付信用认证费 ￥9.9'"
           :next="true"
           :cut="1"
           :btn-fn="next"></btn>
    </group>
    <pay-money :show="payShown"
               :edit-way="true"
               :amount="totalAmount"
               :real-amount="'9.9'"
               :fn="payIt"
               :c-tel="tel"
               :confirm-fn="confirmFn"
               :order-id="orderId"
               @back="getOrderId"
               @confirm="changeConfirmInfo"
               @change-info="changePayInfo"
               @success="success"
               @toggle-pay="togglePayShown"></pay-money>
    <group :first="true">
      <ele>
        <div class="checkbox">
          <div class="chosen"></div>
          <div class="box">
            <div class="icon"></div>
            <div>
              <div>单次认证</div>
              <div class="days">有效期 30 天</div>
            </div>
          </div>
        </div>
        <div slot="right"
             class="money">9.90 元
        </div>
      </ele>
      <div class="tip">
        提示：点此了解<span @click="showCreditRules">信用认证费规则</span>
      </div>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import md5 from 'js-md5'
  import payMoney from 'components/output/payMoney'
  import creditCenterUser from 'api/creditCenterUser'
  import { alert, feedback, confirm } from 'tools/utils'

  export default{
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        orderId: '',
        payShown: false,
        totalAmount: 9.9,
        password: '',
        payWay: '账户余额',
        tel: '',
        payOrder: '',
        payToken: '',
        haveBaseinfo: false,
        duplicate: false,
        haveZhimainfo: false,
        cardNum: '',
        noAfter: false,
        skipZhima: true
      }
    },
    components: {
      payMoney
    },
    computed: {},
    methods: {
      showCreditRules () {
        confirm(`<div style="text-align: left">1.信用认证费：9.90元/次，用于更新信用报告时，支付给第三方数据公司，一次认证有效期为30天，超过30天需重新认证，只有信用认证过后才可以正确使用求借款/补借条/申请借款/去借出等功能。<br/><br/>
        2.若在认证过程中，支付没有成功，建议重新支付。如果上次已经扣款成功，平台会在第二个工作日将您多支付的款项存入您的账户余额中。<br/><br/>
        3.若在有效期内，由于各种原因需要重新认证生成信用报告，则需要再次支付认证费用。<br/><br/>
        4.为了不影响您对产品功能的使用，建议您的重要信息发生变化后尽快进行重新认证更新信用报告。</div>`, '提示', [{ text: '知道了' }])
      },
      next () {
        window._JHsdk.action({
          event: 'xy_ac3'
        })
        if (this.duplicate) {
          alert('该身份证号已经被其他账号认证，您不能再继续授信了')
        } else {
          this.togglePayShown(true)
        }
      },
      togglePayShown (e) {
        this.payShown = e
      },
      getOrderId () {
        creditCenterUser.payInit().then((json) => {
          this.duplicate = json.b_id_credit
          this.orderId = json.c_order_id
          this.tel = json.c_telephone
        })
      },
      changePayInfo (e) {
        this.cardNum = e.cardNum
        this.payWay = e.payWay
        this.password = e.password
      },
      changeConfirmInfo (e) {
        this.payOrder = e.order
        this.payToken = e.token
      },
      payIt () {
        return creditCenterUser.payForCredit({
          cardNum: this.cardNum,
          orderId: this.orderId,
          pwd: md5(md5(this.password)),
          payWay: this.payWay === '账户余额' ? 0 : 1
        })
      },
      confirmFn (code) {
        return creditCenterUser.payForCreditConfirm({
          orderId: this.orderId,
          payOrder: this.payOrder,
          payToken: this.payToken,
          payCode: code
        })
      },
      success (e) {
        if (e) {
          window._JHsdk.action({
            event: 'xy_ac4'
          })
          this.togglePayShown(false)
          feedback('支付成功')
          if (this.noAfter) {
            window.history.back()
          } else if (!this.haveBaseinfo) {
            this.$router.go({
              path: '/baseInfo',
              replace: true
            })
          } else if (this.skipZhima) {
            this.$router.go({
              path: '/operatorInfo',
              replace: true
            })
          } else {
            this.$router.go({
              path: '/zhimaInfo',
              replace: true
            })
          }
        } else {
          this.togglePayShown(false)
          this.getOrderId()
        }
      },
      getCreditList () {
        creditCenterUser.getCreditList().then((json) => {
          this.haveBaseinfo = json.b_base_info
          this.haveZhimainfo = json.b_zhima_credit
        })
      }
    },
    route: {
      data ({ to: { params: { no } } }) {
        if (no) {
          this.noAfter = true
        } else {
          this.noAfter = false
        }
      }
    },
    created () {
      // 2017-1-1 不要跳过芝麻信用
      const today = Date.now()
      const startDay = new Date('2017-01-01T02:00+08:00').getTime()
//            const endDay = new Date('2016-12-19T10:00+08:00').getTime()
      if (today > startDay) {
        this.skipZhima = false
      }
      this.getOrderId()
      this.getCreditList()
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/fragment";

  .money {
    font-weight: 500;
  }

  .checkbox {
    @extend %radio-box;
    .box {
      display: flex;
      padding: 20px 0;
    }
    .icon {
      width: 30px;
      height: 40px;
      margin-right: 5px;
      background: url("../../assets/calender30.svg") center no-repeat {
        size: 26px;
      }
    }
    .days {
      color: $TIP_COLOR;
    }
  }
  .tip{
    padding-top: 10px;
    padding-left: 10px;
    font-size: 14px;
    color: #AAAAAA;
    span{
      color: $MAIN_COLOR;
    }
  }
</style>
