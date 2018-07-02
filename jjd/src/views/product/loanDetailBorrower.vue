<template>
  <div>
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
          <btn :cut="2"
               :text="'全部出借'"
               :min="true"
               @click="toProductList"></btn>
          <btn :cut="2"
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
            <div>借款时间</div>
            <div>{{createTime}}</div>
          </div>
          <div class="row-a">
            <div>借款时长</div>
            <div>{{borrowLength}}{{lengthUnit}}</div>
          </div>
          <div class="row-a">
            <div>还款方式</div>
            <div>{{payWay > 0 ? '等额本息' : '到期还本付息'}}</div>
          </div>
          <div class="row-a">
            <div>借款利率</div>
            <div>{{yearlyRate}}%</div>
          </div>
          <div class="row-a">
            <div class="tip-box">
              <span>服务费</span>
              <span class="tip-alert"
                    @click.stop.prevent="tipAlertFee"></span>
            </div>
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
          <div class="row-a">
            <div>借款协议</div>
            <!--<div class="link" @click="goService">点击查看</div>-->
            <div v-if="status === 2"
                 class="link"
                 @click="goService(id)">点击查看
            </div>
            <div v-else
                 class="link"
                 @click="goService('0')">点击查看
            </div>
          </div>
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
    <div class="fixed">
      <ele>
        <div>
          <button @click="close">关闭</button>
          <!--<button class="light" @click="resend">再次发送</button>-->
        </div>
      </ele>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import borderBox from 'components/mixin/borderBox'
  import prod from 'api/prod'
  import { alert, feedback, confirm } from 'tools/utils'
  import { setTempInfo } from 'store/actions'

  export default {
    vuex: {
      actions: {
        setTempInfo
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
        lender: '',
        lenderId: '',
        money: '',
        borrowLength: '',
        lengthUnit: '',
        payWay: '',
        yearlyRate: '',
        serviceFee: '',
        use: '',
        id: '',
        status: '',
        orderId: '',
        createTime: '',
        reasonDetail: ''
      }
    },
    methods: {
      toProductList () {
        window._JHsdk.action({
          event: 'ck_ac4',
          params: {
            id: this.lenderId
          }
        })
        this.$router.go(`/productList/${this.lenderId}`)
      },
      toSimpleCreditReport () {
        window._JHsdk.action({
          event: 'ck_ac3',
          params: {
            id: this.lenderId
          }
        })
        this.$router.go(`/creditReportSimpleMine/${this.lenderId}`)
      },
      close () {
        const that = this
        confirm('申请关闭后，相关记录也将一并清除，对方不能继续出借。' +
          '确认关闭本次借款申请吗？',
          '提示',
          [{
            text: '不关闭'
          }, {
            text: '关闭',
            fn () {
              prod.closeBidProduct(that.id).then(() => {
                feedback('关闭成功')
                window.history.back()
              })
            }
          }])
      },
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
          this.lender = json.c_lender_name
          this.lenderId = json.c_lender_id
          this.money = json.n_amt
          this.borrowLength = json.n_period
          this.lengthUnit = this.getLengthUnit(json.n_tm_unit)
          this.payWay = json.n_repay_type
          this.yearlyRate = json.n_interest_rate
          this.serviceFee = json.n_service_amt
          this.use = json.c_purpose
          this.status = json.n_order_state
          this.reasonDetail = json.c_memo
          const d = new Date(json.t_apply_tm)
          this.createTime = `${d.getFullYear()}-${
          d.getMonth() + 1}-${d.getDate()}`
          this.setTempInfo({
            showPurpose: {
              picUrls: json.l_pic_list,
              addReason: json.c_memo
            }
          })
        })
      },
      getLengthUnit (e) {
        let text = ''
        switch (e) {
          case 0:
            text = '天'
            break
          case 1:
            text = '个月'
            break
          case 2:
            text = '年'
            break
          default:
        }
        return text
      },
      tipAlertFee () {
        alert('<div style="text-align: left">' +
          '服务费计算规则：<br>' +
          '1、服务费=借款金额*服务费率；<br>' +
          '2、如果计算结果小于最低额度，按照最低额度收取。</div>')
      },
      resend () {
        this.$router.go(`/shareQr/bid_l/0/${this.id}`)
      },
      goService (e) {
        this.$router.go({
          path: `/iouService7/${e}`,
          replace: false
        })
      }
    },
    components: {
      borderBox
    },
    route: {
      data ({ to: { params: { id } } }) {
        this.id = id
        this.getProductBid()
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
      font-size: $MIN_FONT_SIZE;
      background: {
        position: 3px;
        repeat: no-repeat;
        size: 12px 12px;
      }
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
    padding: 10px 0;
    font-size: $MIN_FONT_SIZE;
    div {
      &:first-child {
        line-height: 20px;
        color: $TIP_COLOR;
      }
      &:last-child {
        line-height: 20px;
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
    font-size: $TIP_FONT_SIZE;
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
  }

  .link {
    color: $LINK_COLOR;
  }

  .btn-box {
    display: flex;
    flex-direction: row-reverse;
    @extend %fixed-bottom;
    z-index: 2;
    padding: 10px;
    background-color: white;
    button {
      padding: 0 5px;
      background: none;
    }
    button:last-child {
      color: $MAIN_TEXT_COLOR;
      &::before {
        border-color: $BORDER_COLOR;
      }
    }
    &::after {
      @extend %row-border;
      top: 0;
    }
  }

  .no-padding {
    padding: 0;
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

  .fixed {
    @extend %fixed-box;
  }
</style>
