<template>
  <div>
    <pay-money :show="payShown"
               :edit-amount="false"
               :edit-way="true"
               :amount="money"
               :real-amount="realAmount"
               :fn="payIt"
               :confirm-fn="confirmFn"
               :order-id="orderId"
               @back="getOrderId"
               @confirm="changeConfirmInfo"
               @change-info="changePayInfo"
               @success="success"
               @toggle-pay="togglePayShown"></pay-money>
    <group :first="true">
      <ele>
        <div class="title-left"
             solt="left">
          <div class="user-icon"
               :style="{backgroundImage: 'url(' + imgSrc + ')'}"></div>
          <div class="user-info">
            <div class="basic-info">{{name}}</div>
            <div>{{tel}}</div>
          </div>
        </div>
        <div class="title-right"
             solt="right">
          <btn :cut="1"
               :text="'信用报告'"
               :min="true"
               @click="toSimpleCreditReport"></btn>
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
        <div style="line-height:50px"
             solt="left">
          <img class="detail"
               src="../../assets/detail.svg">借款内容
        </div>
      </ele>
      <ele>
        <div class="box">
          <div class="row-a">
            <div>借款人</div>
            <div>{{borrower}}</div>
          </div>
          <div class="row-a">
            <div>出借人</div>
            <div>{{lender}}</div>
          </div>
          <div class="row-a">
            <div>借款金额</div>
            <div>{{money}}元</div>
          </div>
          <div class="row-a">
            <div>还款方式</div>
            <div>{{repayType > 0 ? '等额本息' : '到期还本付息'}}</div>
          </div>
          <div class="row-a">
            <div>借款时长</div>
            <div>{{computedTimeLength}}</div>
          </div>
          <div class="row-a">
            <div>借款利率</div>
            <div>{{yearlyRate}}%</div>
          </div>
          <div class="row-a">
            <div>服务费</div>
            <div>{{serviceFee}}元</div>
          </div>
          <!--<div class="row-a">-->
          <!--<div>还款计划</div>-->
          <!--<div class="link">点击查看</div>-->
          <!--</div>-->
          <div class="row-a">
            <div>借款用途</div>
            <div>{{use}}</div>
          </div>
          <div class="row-a">
            <div>补充说明</div>
            <div v-if="!reasonDetail">无</div>
            <div v-else
                 class="link"
                 v-link="'/showPurpose'">点击查看
            </div>
          </div>
          <!--<div class="row-a">-->
            <!--<div>借款协议</div>-->
            <!--<div v-if="status === 2"-->
                 <!--class="link"-->
                 <!--@click="goService(id)">点击查看-->
            <!--</div>-->
            <!--<div v-else-->
                 <!--class="link"-->
                 <!--@click="goService('0')">点击查看-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </ele>
    </group>
    <group>
      <ele>
        <div class="row-b">
          <div class="row-a">订单编号：<span>{{id}}</span></div>
          <div class="row-a">创建时间：<span>{{createTime}}</span></div>
        </div>
      </ele>
    </group>
    <ele v-if="status===0">
      <div class="btn-box">
        <btn :cut="2"
             :text="'驳回'"
             :btn-fn="close">
        </btn>
        <btn :cut="2"
             :text="'借给TA'"
             :next="true"
             :btn-fn="getCapitalLeft">
        </btn>
      </div>
    </ele>
  </div>
</template>
<script type="text/ecmascript-6">
  import md5 from 'js-md5'
  import payMoney from 'components/output/payMoney'
  import borderBox from 'components/mixin/borderBox'
  import prod from 'api/prod'
  import pay from 'api/pay'
  import { confirm, feedback } from 'tools/utils'
  import {
    setTempInfo,
    toggleNeedRefresh
  } from 'store/actions'

  export default {
    vuex: {
      actions: {
        setTempInfo,
        toggleNeedRefresh
      }
    },
    data () {
      return {
        imgSrc: '',
        name: '',
        tel: '',
        forReceive: '',
        forPay: '',
        guarantee: '',
        borrower: '',
        borrowId: '',
        lender: '',
        money: '',
        payWay: '',
        repayType: 0,
        timeLength: '',
        yearlyRate: '',
        serviceFee: '',
        use: '',
        reasonDetail: '',
        id: '',
        createTime: '',
        orderId: '',
        payShown: false,
        password: '',
        timeUnit: 0,
        status: 1,
        payOrder: '',
        payToken: '',
        cardNum: ''
      }
    },
    computed: {
      computedTimeLength () {
        if (this.repayType > 0) {
          return `${this.timeLength}期`
        }
        if (this.timeUnit > 0) {
          return `${this.timeLength}个月`
        }
        return `${this.timeLength}天`
      },
      realAmount () {
        const lendAmount = parseFloat(this.money)
        if (lendAmount < 500 && this.payWay !== '账户余额') {
          return (lendAmount + 2.5).toFixed(2)
        }
        return lendAmount.toFixed(2)
      }
    },
    methods: {
      getProductBid () {
        prod.getProductBid({
          id: this.id
        }).then((json) => {
          this.imgSrc = json.c_head
          this.name = json.c_name
          this.tel = json.c_telephone
          this.forReceive = json.n_to_receive_amt
          this.forPay = json.n_to_repay_amt
          this.guarantee = json.n_current_guarantee_amt
          this.borrower = json.c_borrower_name
          this.borrowId = json.c_borrower_id
          this.lender = json.c_lender_name
          this.money = json.n_amt
          this.timeLength = json.n_period
          this.timeUnit = json.n_tm_unit
          this.repayType = json.n_repay_type
          this.yearlyRate = json.n_interest_rate
          this.serviceFee = json.n_service_amt
          this.use = json.c_purpose
          this.reasonDetail = json.c_memo
          this.status = json.n_order_state
          const date = new Date(json.t_apply_tm)
          this.createTime = `${date
            .getFullYear()}-${date
            .getMonth() + 1}-${date
            .getDate()} ${date
            .getHours()}:${date
            .getMinutes()}`
          this.setTempInfo({
            showPurpose: {
              picUrls: json.l_pic_list,
              addReason: json.c_memo
            }
          })
        })
      },
      getCapitalLeft () {
        const that = this
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
                  that.next()
                }
              }])
          } else {
            that.next()
          }
        })
      },
      close () {
        const that = this
        confirm('您确认要驳回这次申请吗？', '提醒', [
          {
            text: '不驳回'
          },
          {
            text: '驳回',
            fn () {
              prod.closeBidProduct(that.id).then(() => {
                feedback('驳回成功')
                that.toggleNeedRefresh(true)
                window.history.back()
              })
            }
          }
        ])
      },
      togglePayShown (e) {
        this.payShown = e
      },
      next () {
        this.togglePayShown(true)
      },
      goService (e) {
        this.$router.go({
          path: `/iouService7/${e}`,
          replace: false
        })
      },
      getOrderId (type) {
        pay.getOrderId(type).then((json) => {
          this.orderId = json
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
        return pay.payProductBid({
          cardNum: this.cardNum,
          orderId: this.orderId,
          id: this.id,
          password: md5(md5(this.password)),
          payWay: this.payWay === '账户余额' ? 0 : 1
        })
      },
      confirmFn (code) {
        return pay.payProductBidConfirm({
          orderId: this.orderId,
          id: this.id,
          payOrder: this.payOrder,
          payToken: this.payToken,
          payCode: code
        })
      },
      success (e) {
        if (e) {
          window._JHsdk.action({
            event: 'hx_ac8',
            params: {
              id: this.id,
              orderId: this.orderId,
            }
          })
          this.togglePayShown(false)
          feedback('出借成功')
          this.toggleNeedRefresh(true)
          this.getProductBid()
          window.history.back()
        } else {
          this.togglePayShown(false)
          this.getOrderId()
        }
      },
      toSimpleCreditReport () {
        window._JHsdk.action({
          event: 'ck_ac3',
          params: {
            id: this.borrowId
          }
        })
        this.$router.go(`/creditReportSimpleMine/${this.borrowId}`)
      },
    },
    components: {
      borderBox,
      payMoney
    },
    route: {
      data ({ to: { params: { id } } }) {
        this.id = id
//                this.getCapitalLeft()
        this.getProductBid()
        this.getOrderId()
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
    padding: 15px 0;
    .user-info {
      padding: 5px;
      line-height: 20px;
      font-size: $MIN_FONT_SIZE;
      .basic-info {
        width: 70px;
        height: 20px;
        font-size: $TIP_FONT_SIZE;
        /*background: {*/
        /*image: url('../../assets/basicInfo.svg');*/
        /*size: 12px;*/
        /*position: right center;*/
        /*repeat: no-repeat;*/
        /*}*/
      }
    }
  }

  .title-right {
    display: flex;
    button {
      margin: 5px;
      padding: 0 5px 0 18px;
      width: 100% !important;
      background: {
        size: 12px 12px;
        position: 3px;
        repeat: no-repeat;
      }
    }

    button:first-child {
      background-image: url('../../assets/product.svg');
    }

    button:nth-child(2) {
      background-image: url('../../assets/creditInfo.svg');
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
    padding: 10px 0;
    font-size: $MIN_FONT_SIZE;
    div {
      &:first-child {
        line-height: 16px;
        color: $TIP_COLOR;
      }
      &:last-child {
        line-height: 16px;
      }
    }
  }

  .detail {
    width: 22px;
    line-height: 20px;
  }

  img {
    position: relative;
    top: 4px;
  }

  .row-a {
    font-size: $MIN_FONT_SIZE;
    display: flex;
    height: 30px;
    line-height: 30px;
    justify-content: space-between;
    padding: 0 10px;
    background-color: $ELE_W_COLOR;
    div {
      display: flex;
      flex-direction: column;
    }
  }

  .row-b {
    padding: 10px 0;
    line-height: 20px;
    width: 100%;
    .row-a {
      padding: 0;
    }
  }

  .link {
    color: $LINK_COLOR;
  }

  .btn-box {
    display: flex;
    flex-direction: row;
    @extend %fixed-bottom;
    z-index: 2;
    padding: 10px;
    background: $ELE_W_COLOR;
    button {
      padding: 0;
    }
    &::before {
      @extend %row-border;
      top: 0;
    }
  }

  .no-padding {
    padding: 0;
  }

  .box {
    flex: 1;
    .row-a {
      padding: 0;
    }
  }
</style>
