<template>
  <div>
    <div v-if="!list.length && loaded"
         class="">
      <!--<div class="box">-->
      <!--<div>今借到实时报道</div>-->
      <!--<div class="title">累计注册用户</div>-->
      <!--<div><span>{{registAmount}}</span>人</div>-->
      <!--<div class="title">累计借款总额</div>-->
      <!--<div><span>{{totalBorrowAmount}}</span>元</div>-->
      <!--</div>-->
      <div class="bid-guide">
        点击屏幕下方去出借,创建您自己的出借吧~
      </div>
      <div class="bid-line">
        <div class="dot"></div>
      </div>
    </div>
    <div v-else>
      <prod-card v-for="item in list"
                 :id="item.id"
                 :show-btn="false"
                 :user-id="item.c_lender_id"
                 :user-icon="item.c_lender_head"
                 :name="item.c_lender_name"
                 :apply-num="item.n_apply_cnt"
                 :passing-rate="item.n_pass_rate"
                 :nearly-deal="item.c_last_tm"
                 :average-time="item.n_deal_tm"
                 :min-money="item.n_min_amt"
                 :max-money="item.n_max_amt"
                 :min-length="item.n_min_tm"
                 :max-length="item.n_max_tm"
                 :minlength-unit="item.n_min_tm_unit"
                 :maxlength-unit="item.n_max_tm_unit"
                 :yearly-rate="item.n_interest_rate"
                 :repay-type="item.n_repay_type"
                 :service-rate="item.n_service_fee_rate"
                 :service-fee="item.n_min_service_fee"></prod-card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import prodCard from 'components/output/prodCard'
  import my from 'api/my'
  import { setTempInfo } from 'store/actions'

  export default{
    vuex: {
      getters: {
        indexProd: state => state.temp.indexProd,
        openId: state => state.userInfo.openId,
        toRegist: state => state.toRegist
      },
      actions: {
        setTempInfo
      }
    },
    data () {
      return {
        registAmount: '',
        totalBorrowAmount: '',
        list: [],
        updateTime: 0,
        loaded: true
      }
    },
    components: {
      prodCard
    },
    computed: {},
    methods: {
      getProductList () {
        if (this.toRegist) {
          my.getUnregistVisibleProduct({
            openId: this.openId
          }).then(this.success)
            .catch(this.faile)
        } else {
          my.getVisibleProduct()
            .then(this.success)
            .catch(this.faile)
        }
      },
      success (json) {
        this.loaded = true
        this.list = json
        this.updateTime = new Date().getTime()
//                if (!json || json.length < 1) {
//                    this.getSystemInfo()
//                }
      },
      faile () {
        this.loaded = true
//                this.getSystemInfo()
      },
      getSystemInfo () {
        my.getSystemInfo().then((json) => {
          this.registAmount = json.n_user_cnt
          this.totalBorrowAmount = json.n_iou_cnt
        })
      },
      go (e) {
        this.$router.go(`/productDetailBorrower/${e}`)
      }
    },
    events: {
      indexFresh () {
        this.getProductList()
      }
    },
    route: {
      deactivate ({ next }) {
        // 缓存表单
        this.setTempInfo({ indexProd: this.$data })
        next()
      }
    },
    created () {
      Object.assign(this.$data, this.indexProd)
      const time = new Date().getTime()
      if (time - this.indexProd.updateTime > 60000) {
        this.loaded = false
        this.getProductList()
      }
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/const";

  .bid {
    &-guide {
      width: 260px;
      height: 55px;
      line-height: 20px;
      font-size: $TIP_FONT_SIZE;
      margin: 50px auto;
      margin-right: 20px;
      padding: 5px;
      position: relative;
      color: $TIP_COLOR;
      border: 1px solid $BORDER_COLOR;
      border-radius: 5px;
    }
    &-line {
      transition: 1s ease;
      position: absolute;
      right: 12%;
      top: 350px;
      color: $BORDER_COLOR;
      width: 1px;
      height: calc(100vh - 420px);
      background-color: $BORDER_COLOR;
      .dot {
        position: relative;
        width: 12px;
        height: 12px;
        left: -6px;
        top: calc(100vh - 420px);
        box-sizing: border-box;
        background: $BORDER_COLOR;
        border-radius: 100%;
      }
    }
  }

  .no-prod {
    height: 200px;
    background: url("../../assets/mail.svg") center no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5vh;
    .box {
      width: 160px;
      height: 200px;
      padding: 10px;
      text-align: center;
      font-size: $TIP_FONT_SIZE;
      span {
        color: $MAIN_COLOR;
        font-size: $LARGE_FONT_SIZE;
        font-weight: bold;
      }
      .title {
        margin-top: 5px;
      }
    }
  }

</style>
