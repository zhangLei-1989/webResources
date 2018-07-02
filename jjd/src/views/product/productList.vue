<template>
  <div v-if="showContent">
    <div class="fixed"
         v-if="isself">
      <ele>
        <div>
          <button class="light"
                  @click="addNewPro">添加出借
          </button>
          <button class="light"
                  v-if="list.length > 0"
                  @click="download">下载素材
          </button>
          <button class="disabled"
                  v-else>下载素材
          </button>
          <button @click="shareThisList"
                  class="light"
                  v-if="list.length > 0">分享出借
          </button>
          <button class="disabled"
                  v-else>分享出借
          </button>
        </div>
      </ele>
    </div>
    <group :first="true">
      <ele>
        <div class="title-left"
             solt="left">
          <div class="user-icon"
               :style="{backgroundImage: 'url(' + imgSrc + ')'}"></div>
          <div class="user-info">
            <div class="basic-info">{{name || '尚未实名认证'}}</div>
            <div class="tel-bg">{{tel}}</div>
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
            <!--getAmountText(guarantee)-->
            <div>{{guarantee}}<span>元</span></div>
          </div>
        </border-box>
      </ele>
    </group>
    <group :first="true">
      <div>
        <div class="icon-box">
          <img src="../../assets/product.svg"
               class="icon">
          <div>我的出借</div>
        </div>
        <prod-card v-for="item in validList"
                   :name="'出借编号 ' + item.id"
                   :apply-num="item.n_apply_cnt"
                   :show-btn="true"
                   :passing-rate="item.n_pass_rate"
                   :nearly-deal="getDaysAgo(item.c_lastest_deal_tm)"
                   :average-time="item.n_deal_tm"
                   :min-money="item.n_min_amt"
                   :max-money="item.n_max_amt"
                   :min-length="item.n_min_tm"
                   :minlength-unit="item.n_min_tm_unit"
                   :max-length="item.n_max_tm"
                   :maxlength-unit="item.n_max_tm_unit"
                   :yearly-rate="item.n_interest_rate"
                   :service-fee="item.n_min_service_fee"
                   :service-rate="item.n_service_fee_rate"
                   :id="item.id"
                   :self="isself"
                   :is-close="false"
                   :repay-type="item.n_repay_type"
                   :prodnum="true"></prod-card>
        <no-data v-if="list.length === 0 && listClose.length === 0"></no-data>
        <!--<div class="box"-->
        <!--v-if="list.length === 0 && listClose.length === 0">-->
        <!--<img class="tutorial"-->
        <!--@load="show2"-->
        <!--src="../../../static/tutorial_prod_1.jpg">-->
        <!--<img class="tutorial"-->
        <!--v-if="shown2"-->
        <!--src="../../../static/tutorial_prod_2.jpg">-->
        <!--</div>-->
      </div>
      <div v-if="listClose.length > 0">
        <div class="icon-box"
             style="margin: -10px 0 0 10px;">
          <!--<img src="../../assets/product.svg" class="icon">-->
          <div>已关闭的出借,其他人不可见,您可以重新开启</div>
        </div>
        <prod-card v-for="item in invalidList"
                   class="gray"
                   :name="'出借编号  ' + item.id"
                   :apply-num="item.n_apply_cnt"
                   :passing-rate="item.n_pass_rate"
                   :nearly-deal="getDaysAgo(item.c_lastest_deal_tm)"
                   :average-time="item.n_deal_tm"
                   :min-money="item.n_min_amt"
                   :max-money="item.n_max_amt"
                   :min-length="item.n_min_tm"
                   :minlength-unit="item.n_min_tm_unit"
                   :max-length="item.n_max_tm"
                   :maxlength-unit="item.n_max_tm_unit"
                   :yearly-rate="item.n_interest_rate"
                   :service-fee="item.n_min_service_fee"
                   :service-rate="item.n_service_fee_rate"
                   :id="item.id"
                   :self="true"
                   :is-close="true"
                   :repay-type="item.n_repay_type"
                   :prodnum="true"></prod-card>
      </div>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import prodCard from 'components/output/prodCard'
  import noData from 'components/output/noData'
  import borderBox from 'components/mixin/borderBox'
  import prod from 'api/prod'
  import pay from 'api/pay'
  import { alert } from 'tools/utils'
  import {
    shareProd
  } from 'tools/share'

  export default{
    vuex: {
      getters: {
        userId: state => state.userInfo.userId,
        openId: state => state.userInfo.openId,
        firstTime: state => state.temp.cache.prodListFirstTime,
        toRegist: state => state.toRegist
      },
      actions: {}
    },
    data () {
      return {
        isself: '',
        id: '',
        imgSrc: '',
        name: '',
        tel: '',
        forReceive: '',
        forPay: '',
        guarantee: '',
        list: [],
        listClose: [],
        minAmountList: [],
        maxAmountList: [],
        rateList: [],
        minTimeList: [],
        maxTimeList: [],
        showContent: false,
        share: false,
        creditValied: false,
        shown2: false
      }
    },
    components: {
      prodCard,
      borderBox,
      noData
    },
    computed: {
      minMoney () {
        if (this.minAmountList.length) {
          return Math.min(...this.minAmountList)
        }
        return 0
      },
      maxMoney () {
        if (this.maxAmountList.length) {
          return Math.max(...this.maxAmountList)
        }
        return 0
      },
      minLength () {
        let m = 0
        if (this.minTimeList.length) {
          m = Math.min(...this.minTimeList)
        }
        if (m >= 100) {
          return `${m / 100}个月`
        }
        return `${m}天`
      },
      maxLength () {
        let m = 0
        if (this.maxTimeList.length) {
          m = Math.max(...this.maxTimeList)
        }
        if (m >= 100) {
          return `${m / 100}个月`
        }
        return `${m}天`
      },
      minRate () {
        if (this.rateList.length) {
          return Math.min(...this.rateList)
        }
        return 0
      },
      maxRate () {
        if (this.rateList.length) {
          return Math.max(...this.rateList)
        }
        return 0
      },
      validList () {
        return this.list.sort((a, b) => {
          const aTime = parseInt(a.id.slice(0, 14), 10)
          const bTime = parseInt(b.id.slice(0, 14), 10)
          return bTime - aTime
        })
      },
      invalidList () {
        return this.listClose.sort((a, b) => {
          const aTime = parseInt(a.id.slice(0, 14), 10)
          const bTime = parseInt(b.id.slice(0, 14), 10)
          return bTime - aTime
        })
      }
    },
    methods: {
      show2 () {
        this.shown2 = true
      },
      getDaysAgo (e) {
        const s = ((new Date()).getTime() - new Date(e))
          / (1000 * 24 * 3600)
        if (s < 1) {
          if ((new Date()).getDate() === (new Date(e)).getDate()) {
            return '今'
          }
          return '1'
        } else if (s > 90) {
          return '>90'
        }
        return Math.ceil(s, 10)
      },
      getAmountText (e) {
        const amountNum = parseInt(e, 10)
        const amountText = e.toString()
        if (amountNum >= 1000 && amountNum < 10000) {
          return amountText.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        } else if (amountNum >= 10000) {
          return `${(amountNum / 10000).toFixed(2)}万`
        }
        return amountNum.toFixed(2)
      },
      getUnitTimes (u) {
        if (u === 0) {
          return 1
        }
        return 100
      },
      computeList () {
        this.list.forEach((ele) => {
          this.rateList.push(ele.n_interest_rate)
          this.minAmountList.push(ele.n_min_amt)
          this.maxAmountList.push(ele.n_max_amt)
          this.minTimeList.push(ele.n_min_tm
            * this.getUnitTimes(ele.n_min_tm_unit))
          this.maxTimeList.push(ele.n_max_tm
            * this.getUnitTimes(ele.n_max_tm_unit))
        })
      },
      getCreditValied () {
        pay.checkCredit().then((json) => {
          this.creditValied = json.b_credit
        })
      },
      getHomePage (id) {
        prod.getHomePage({
          userId: id,
          openId: this.openId
        }).then((json) => {
          this.isself = json.b_self
          if (!this.firstTime && !json.b_self && this.share) {
            this.$router.go({
              path: `/prodListOnce/${id}`,
              replace: true
            })
          } else {
            this.showContent = true
          }
          this.imgSrc = json.c_head
          this.name = json.c_name
          this.tel = json.c_telephone
          this.forReceive = json.n_to_receive_amt
          this.forPay = json.n_to_repay_amt
          this.guarantee = json.n_current_guarantee_amt
          this.list = json.l_product_list
          this.listClose = json.l_invalid_product_list // 已关闭的产品列表
          this.computeList()
          let amount = ''
          if (this.minMoney === this.maxMoney) {
            amount = this.minMoney
          } else {
            amount = `${this.minMoney}-${this.maxMoney}`
          }
          let timeLength = ''
          if (this.minLength === this.maxLength) {
            timeLength = this.maxLength
          } else {
            timeLength = `${this.minLength}-${this.maxLength}`
          }
          let rate = ''
          if (this.minRate === this.maxRate) {
            rate = this.maxRate
          } else {
            rate = `${this.minRate}-${this.maxRate}`
          }
          shareProd({
            amount,
            rate,
            timeLength,
            link: `${window.$config.domain}#!/productList/${this.id}?share=1`,
            id: this.id,
          })
        })
      },
      shareThisList () {
        this.$router.go(`/shareQr/list/0/${this.id}`)
      },
      download () {
        this.$router.go(`/download/list/${this.id}`)
      },
      addNewPro () {
        this.$router.go('/addNewPro')
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
              id: this.id
            }
          })
          this.$router.go(`/creditReportSimpleMine/${this.id}`)
        }
      }
    },
    route: {
      data ({ to: { query: { share }, params: { id } } }) {
        this.id = id
        this.share = share
        this.getHomePage(id)
        this.getCreditValied()
      }
    },
    created () {
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
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
    .user-icon[_v-305f66b2] {
      width: 0 !important;
      height: 0;
    }
  }

  .title-right {
    display: flex;
    button {
      width: 100% !important;
      font-size: $MIN_FONT_SIZE !important;
      margin: 5px;
      padding: 0 3px 0 18px;
      background-size: 12px 12px;
      background-position: 3px;
      background-repeat: no-repeat;
      background-image: url('../../assets/creditInfo.svg');
    }
  }

  .user-icon {
    height: 44px;
    width: 44px;
    border-radius: 100%;
    background-size: 44px 44px;
  }

  .border-box {
    display: flex;
    justify-content: center;
    text-align: center;
    position: static;
  }

  .icon-box {
    display: flex;
    font-size: $TIP_FONT_SIZE;
    line-height: 30px;
    color: $MAIN_TEXT_COLOR;
  }

  .icon {
    width: 20px;
    height: 20px;
    margin: 5px;
  }

  .gray {
    color: $TIP_COLOR;
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
      color: $MAIN_TEXT_COLOR;
      border-color: $BORDER_COLOR;
      background-image: none;
      padding: 0;
      margin: 5px;
    }
  }

  .no-padding {
    padding: 0 !important;
    min-height: 0;
  }

  .tel-bg {
    background: url(../../assets/operators_main.svg) -3px center no-repeat;
    background-size: 15px 22px;
    padding: 0 0 0 15px;
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

  .box {
    overflow: hidden;
  }

  .tutorial {
    width: 100%;
    float: left;
  }
</style>
