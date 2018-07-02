<template>
  <div v-if="showContent">
    <group :first="true"
           v-if="!isBorrower">
      <ele>
        <div class="title-left"
             solt="left">
          <div class="user-icon"
               :style="{backgroundImage: 'url(' + imgSrc + ')'}"></div>
          <div class="user-info">
            <div class="basic-info">{{borrower}}</div>
            <div>{{tel}}</div>
          </div>
        </div>
        <div class="title-right"
             solt="right">
          <btn :cut="1"
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
      <div class="row-icon">
        <button class="fix">{{timeLeftText}}</button>
        <div class="after"></div>
      </div>

      <ele class="row-l no-line add-line">
        <div slot="left">
          {{raised}}
          <span>已筹金额</span>
        </div>
        <div slot="" :class="{isClosed:isClosedCss}">
          {{amount}}
          <span>借款总额</span>
        </div>
      </ele>
      <ele class="">
        <div class="progress-bar">
          <div class="bar">
            <div class="raised-bar"
                 :style="{width:raisedWidth}">
              <div class="dot"></div>
            </div>
          </div>
        </div>
      </ele>
    </group>
    <accordion :min="false"
               :text="'借款内容'"
               :img-src="detailImg"
               :show-ele="lenderId !== userId">
      <div>
        <div class="row-a">
          <div>借款人</div>
          <div>{{borrower}}</div>
        </div>
        <div class="row-a">
          <div>借款利率</div>
          <div>{{yearlyRate}}%</div>
        </div>
        <div class="row-a">
          <div>服务费</div>
          <div>{{serviceFee}}元</div>
        </div>
        <div class="row-a"
             v-if="needGuarantor">
          <div>担保利率</div>
          <div>{{guarantorRate}}%</div>
        </div>
        <div class="row-a">
          <div>还款方式</div>
          <div>{{payWay}}</div>
        </div>
        <div v-if="payWay == '等额本息'"
             class="row-a">
          <div>分期次数</div>
          <div>{{repayTimes}}期</div>
        </div>
        <div v-else
             class="row-a">
          <div>还款时间</div>
          <div>{{payBackTime}}</div>
        </div>
        <div class="row-a">
          <div>借款用途</div>
          <div>{{use}}</div>
        </div>
        <div class="row-a">
          <div>补充说明</div>
          <div v-if="!reasonDeatil">无</div>
          <div v-else
               class="link"
               v-link="'/showPurpose'">点击查看
          </div>
        </div>
        <div class="row-a">
          <div>借款协议</div>
          <div class="link"
               @click="goService('iouService7')">点击查看
          </div>
        </div>
      </div>
    </accordion>
    <group v-if="needGuarantor">
      <ele>
        <div style="line-height:50px"
             solt="left">
          <img class="detail"
               src="../../assets/guaranteeOrange.svg">担保人（<span>{{ guarantorList.length}}</span>）
        </div>
        <!--<div v-if="guarantorList.length !== 0" class="show-all">-->
        <!--查看全部-->
        <!--</div>-->
      </ele>
      <!--<columns class="row-s" :cut="5"-->
      <!--v-for="item in colList"-->
      <!--v-text="item.val">-->
      <!--</columns>-->
      <ele v-if="guarantorList.length !== 0"
           class="no-line gua-record">
        <div v-for="items in colList"
             v-text="items.val"></div>
      </ele>
      <ele class="gua-record"
           v-for="items in guarantorList">
        <div>
          <img class="user-icon"
               :src="items.c_head">
          <span>
                        {{items.c_name}}
                    </span>
        </div>

        <div>
          {{items.n_amt}}元
        </div>
        <div>
          {{items.n_user_guarantee_amt}}元
        </div>
        <div style="text-align: right;">
          {{items.n_to_repay_amt}}元
        </div>
      </ele>
    </group>
    <group>
      <ele>
        <div style="line-height:50px"
             solt="left">
          <img class="detail"
               src="../../assets/record.svg">借款记录（<span>{{recordList.length}}</span>）
        </div>
        <!--<div v-if="guarantorList.length !== 0" class="show-all">-->
        <!--查看全部-->
        <!--</div>-->
      </ele>
      <ele v-for="items in recordList"
           @click="goToIou(items)"
           :more="isBorrower">
        <div class="title-left"
             solt="left"
             style="padding: 0">
          <img class="user-icon"
               :src="items.c_head">
          <div class="user-info">
            <div class="basic-info">
              {{items.c_name}}
            </div>
            <div>
              担保人：<span>{{items.c_guarantee_name||'无'}}</span>
            </div>
          </div>
        </div>
        <div style="font-size: 14px;"
             slot="right">
          {{items.n_amt}}元
        </div>
      </ele>
    </group>
    <group>
      <ele>
        <div class="row-b">
          <div class="row-a">订单编号：<span>{{id}}</span></div>
          <div class="row-a">创建时间：<span>{{createTime}}</span></div>
          <div v-if="isClosed"
               class="row-a">关闭时间：<span>{{closeTime}}</span></div>
        </div>
      </ele>
    </group>
    <div v-show="lastAmt && !isClosed">
      <div class="fixed"
           v-if="isBorrower">
        <ele>
          <div>
            <button class="light"
                    @click="resend('bid_l')">邀请出借人
            </button>
            <button v-if="needGuarantor"
                    class="light"
                    @click="resend('bid_g')">邀请担保人
            </button>
            <button @click="close">关闭</button>
          </div>
        </ele>
      </div>

      <div class="btn-box-lender"
           v-else>
        <btn :cut="2"
             :text="'作担保'"
             v-if="needGuarantor"
             @click="toGuarantee">
        </btn>
        <btn :cut="2"
             :text="'借给TA'"
             :next="true"
             v-if="needGuarantor"
             @click="toLend">
          <!--v-link="'/lendTo/' + id"-->
          <!--v-link="'/bidOnce/1/' + id"-->
        </btn>
        <btn :cut="1"
             :text="'借给TA'"
             :next="true"
             v-if="!needGuarantor"
             @click="toLend">
        </btn>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import columns from 'components/mixin/columns'
  import borderBox from 'components/mixin/borderBox'
  import accordion from 'components/output/accordion'
  import {
    setTempInfo,
    toggleNeedRefresh
  } from 'store/actions'
  import {
    shareBid
  } from 'tools/share'
  import bid from 'api/bid'
  import my from 'api/my'
  import { alert, confirm, feedback } from 'tools/utils'

  export default {
    vuex: {
      getters: {
        userId: state => state.userInfo.userId,
        openId: state => state.userInfo.openId,
        firstTime: state => state.temp.cache.bidFirstTime,
        toRegist: state => state.toRegist
      },
      actions: {
        setTempInfo,
        toggleNeedRefresh
      }
    },
    data () {
      return {
        detailImg: require('../../assets/detail.svg'),
        lenderId: '',
        id: '',
        tel: '',
        isClosed: '',
        firstPage: '',
//                userId: '',
        raised: '',
        amount: '',
        guarantorRate: '',
        imgSrc: '',
        name: '',
        forReceive: '',
        forPay: '',
        guarantee: '',
        borrower: '',
        payBackTime: '',
        payWay: '',
        yearlyRate: '',
        serviceFee: '',
        use: '',
        reasonDeatil: '',
        createTime: '',
        closeTime: '',
        repayTimes: '',
        colList: [
          { val: '担保人' },
          { val: '此单担保' },
          { val: '担保总额' },
          { val: '待还' }
        ],
        lastDays: 0,
        lastAmt: 0,
        guarantorList: [],
        recordList: [],
        isBorrower: true,
        needGuarantor: 0,
        showContent: false,
        share: false,
        timeLength: '',
        borrowerIdCard: '',
        allowIouAndBuy: true,
        canIGuarantee: true,
      }
    },
    methods: {
      goToIou (item) {
        if (this.isBorrower) {
          this.$router.go(`/iouDetail/${item.c_bid_list_id}`)
        }
      },
      getBidDetail () {
        bid.getBid({
          id: this.id,
          firstPage: this.firstPage,
          openId: this.openId
        }).then((json) => {
          if (!this.firstTime && !json.my_info.b_creator && this.share) {
            const that = this
            this.$router.go({
              path: `/bidOnce/lender/${that.id}`,
              replace: true
            })
          } else {
            this.showContent = true
          }
          const detail = json.detail
          this.borrowerIdCard = detail.c_id_card_no
          const idcard = this.borrowerIdCard
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
          if (tdNumber - bdNumber < 220000 && detail.b_guarantee) {
            this.allowIouAndBuy = false
          } else {
            this.allowIouAndBuy = true
          }
          this.tel = detail.c_telephone
          this.isClosed = detail.b_end // 0筹标中,1.关闭
          this.lenderId = detail.c_id // 借款人id
          this.borrower = detail.c_name
          this.imgSrc = detail.c_head
          this.forPay = detail.n_to_repay_amt
          this.forReceive = detail.n_to_receive_amt
          this.guarantee = detail.n_current_guarantee_amt
          this.yearlyRate = detail.n_interest_rate
          this.guarantorRate = detail.n_guarantee_rate
          this.serviceFee = detail.n_service_amt
          this.amount = detail.n_amt
          this.raised = detail.n_amt - detail.n_rest_amt
          this.lastAmt = detail.n_rest_amt
          this.use = detail.c_purpose
          this.reasonDeatil = detail.c_memo
          this.payBackTime = detail.t_repay_tm
          this.payWay = detail.n_repay_type === 0 ?
            '到期还本付息' : '等额本息'
          this.setTempInfo({
            showPurpose: {
              picUrls: json.l_pic,
              addReason: detail.c_memo
            }
          })
          this.guarantorList = json.l_guarantee_list
          this.recordList = json.l_bid_list
          this.createTime = detail.c_crt_tm
          this.closeTime = detail.c_close_tm
          this.repayTimes = detail.n_period
          this.lastDays = detail.n_left_tm
//                    this.userId = json.my_info.c_my_id
          this.isBorrower = json.my_info.b_creator
          this.needGuarantor = detail.b_guarantee
          this.timeLength =
            `${detail.c_crt_tm.slice(0, 10)}至${detail.t_repay_tm}`
          this.makeShare()
        })
      },
      close () {
        const that = this
        confirm(
          '关闭订单后，该标的不能继续筹款<br>已经筹得款项，仍需按时还款',
          '提示',
          [{
            text: '暂不关闭'
          }, {
            text: '确认关闭',
            fn () {
              bid.closeBid(that.id).then(() => {
                feedback('申请已关闭')
                that.toggleNeedRefresh(true)
                window.history.back()
              })
            }
          }]
        )
      },
      goService (e) {
        this.$router.go({
          path: `/${e}/0`,
          replace: false
        })
      },
      resend (bidX) {
        this.$router.go(`/shareQr/${bidX}/1/${this.id}`)
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
              id: this.lenderId
            }
          })
          this.$router.go(`/creditReportSimpleMine/${this.lenderId}`)
        }
      },
      makeShare () {
        shareBid({
          amount: this.amount,
          rate: this.yearlyRate,
          reason: this.use,
          timeLength: this.timeLength,
          link: this.url,
          isBorrower: true,
          id: this.id,
        })
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
          if (tdNumber - bdNumber < 250000) {
            this.canIGuarantee = false
          } else {
            this.canIGuarantee = true
          }
        })
      },
      toGuarantee () {
        if (!this.allowIouAndBuy && !this.canIGuarantee) {
          alert('您当前的年龄不足 25 周岁，不满足给对方作担保的条件')
        } else {
          this.$router.go(`/guarantee/${this.id}/${this.lenderId}`)
        }
      },
      toLend () {
        if (!this.allowIouAndBuy && !this.guarantorNum) {
          alert('对方目前的年龄不足 22 周岁，' +
            '发起的求借款至少需要 1 名担保人，' +
            '您才可以正常出借给对方')
        } else if (!this.allowIouAndBuy) {
          this.$router.go(`/lendTo/${this.id}/must`)
        } else {
          this.$router.go(`/lendTo/${this.id}`)
        }
      },
    },
    computed: {
      raisedWidth () {
        return `${this.raised * 100 / this.amount}%`
      },
      guarantorNum () {
        return this.guarantorList.length
      },
      recordNum () {
        return this.recordList.length
      },
      url () {
        return `${window.$config.domain}#!/borrowDetail/0/${this.id}?share=1`
      },
      isClosedCss () {
        return this.isClosed
      },
      timeLeftText () {
        let text = ''
        if (this.isClosed) {
          text = '已关闭'
        } else {
          text = `剩余${this.lastDays}天`
        }
        return text
      }
    },
    components: {
      columns,
      borderBox,
      accordion
    },
    route: {
      deactivate ({ next }) {
        // 缓存表单
        this.setTempInfo({
          guarantee: {
            lenderId: this.lenderId,
            amount: this.amount,
            guaranteeRate: this.guarantorRate,
            lastAmt: this.lastAmt
          }
        })
        this.setTempInfo({
          guarantorList: {
            lenderId: this.lenderId,
            amount: this.amount,
            fee: this.serviceFee,
            date: {
              y: this.payBackTime.split('-')[0],
              m: this.payBackTime.split('-')[1],
              d: this.payBackTime.split('-')[2]
            },
            guarantorList: this.guarantorList,
            rate: this.yearlyRate,
            repayType: this.payWay,
            repayTimes: this.repayTimes
          }
        })
        next()
      },
      data ({ to: { query: { share }, params: { firstPage, id } } }) {
        this.id = id
        this.firstPage = firstPage
        this.share = share
        this.getBidDetail()
        this.getAgeInfo()
        this.setTempInfo({
          chooseFriends: {
            friendsId: [],
            friendsName: []
          }
        })
      }
    }
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/function';

  .gua-record {
    display: flex;
    div {
      flex: 1;
      text-align: center;
      font-size: $TIP_FONT_SIZE;
    }
    :first-child {
      flex: 1.5;
      text-align: left;
      span {
        height: 50px;
        line-height: 50px;
      }
      img {
        position: relative;
        top: 10px;
      }
    }
  }

  .no-line.gua-record div:first-child {
    text-align: left;
    position: relative;
    left: 35px;
  }

  .no-line.gua-record div:nth-child(4) {
    text-align: right;
  }

  .title-left {
    display: flex;
    flex-direction: row;
    padding: 10px 0;
    align-items: center;
    .user-info {
      padding: 5px;
      line-height: 20px;
      font-size: $MIN_FONT_SIZE;
      .basic-info {
        width: 70px;
        height: 20px;
        font-size: $TIP_FONT_SIZE;
        /*background-image: url('../../assets/basicInfo.svg');*/
        /*background-size: 12px;*/
        /*background-position: right center;*/
        /*background-repeat: no-repeat;*/
      }
    }
  }

  .title-right {
    display: flex;
    button {
      margin: 5px;
      padding: 0 5px 0 18px;
      background: {
        size: 12px 12px;
        position: 3px;
        repeat: no-repeat;
      }
    }

    button:first-child {
      min-width: 80px;
      background-image: url('../../assets/product.svg');
      padding-left: 20px;
      white-space: nowrap;
    }
  }

  .user-icon {
    height: 30px;
    width: 30px;
    border-radius: 100%;
    background-size: 30px 30px;
  }

  .block {
    height: 50px;
    text-align: center;
    padding: 5px 0;
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
    margin-right: 5px;
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
    padding: 0 10px;
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

  .btn-box-lender {
    display: flex;
    flex-direction: row;
    justify-content: center;
    @extend %fixed-bottom;
    padding: 10px;
    background-color: $ELE_W_COLOR;
    z-index: 2;
    button {
      padding: 0;
      background-image: none;
    }
    &::before {
      @extend %row-border;
      top: 0;
    }
  }

  .row-icon {
    position: relative;
    width: 100%;
    text-align: center;
    button {
      width: 80px;
      height: 30px;
      line-height: 35px;
      border-radius: $BORDER_RADIUS $BORDER_RADIUS 0 0;
      background-color: $MAIN_COLOR;
      position: absolute;
      top: -5px;
      left: -webkit-calc(50% - 40px);
      padding: 0;
      margin: 0 auto;
      color: $MINOR_TEXT_COLOR;
      z-index: 2;
    }
    .fix {
      left: calc(50% - 40px);
    }
    .after {
      position: absolute;
      left: calc(50% - 40px);
      top: 25px;
      width: 80px;
      height: 20px;
      border: {
        top: 10px solid #ff973a;
        left: 40px solid {
          color: transparent;
        }
        right: 40px solid {
          color: transparent;
        }
        bottom-color: transparent;
      }
      z-index: 1;
    }
  }

  .row-l {
    height: 80px;
    div {
      padding-top: 30px;
      font-size: $LARGE_FONT_SIZE !important;
      display: flex;
      flex-direction: column;
      &:first-child {
        color: $LINK_COLOR;
      }
      &:last-child {
        color: $TIP_COLOR;
      }
      span {
        font-size: $TIP_FONT_SIZE;
      }
    }
  }

  .progress-bar {
    padding: 10px;
    width: 100%;
  }

  .bar {
    width: 100%;
    background-color: $BODY_COLOR;
    height: 4px;
    border-radius: 2px;
    position: relative;
  }

  .raised-bar {
    position: relative;
    height: 100%;
    width: 0;
    min-width: 11px;
    transition: .3s ease-out;
    background-color: $MAIN_COLOR;
    border-radius: 5px;
  }

  .dot {
    position: absolute;
    width: 11px;
    height: 11px;
    border-radius: 5px;
    background-color: white;
    top: -4px;
    right: 0;
    &::before {
      @extend %btn-border;
      border: 1px solid $BORDER_COLOR;
      border-radius: 10px;
    }
  }

  .row-s {
    height: 30px;
    background-color: $ELE_W_COLOR;
  }

  .no-line {
    color: $TIP_COLOR;
    display: flex;
    > div {
      font-size: $TIP_FONT_SIZE;
    }
  }

  .no-padding {
    padding: 0 !important;
  }

  .show-all {
    font-size: $TIP_FONT_SIZE;
    color: $TIP_COLOR;
  }

  .add-line {
    position: relative;
    &::before {
      display: block !important;
    }
  }

  .fixed {
    @extend %fixed-box;
    .light {
      color: $MAIN_COLOR;
      &::before {
        border-color: $MAIN_COLOR;
      }
    }
  }

  .isClosed{
    color: $MAIN_COLOR;
  }
</style>
