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
        点击屏幕下方求借款,赶快发起[求借款]吧~
      </div>
      <div class="bid-line">
        <div class="dot"></div>
      </div>
      <div class="bid-guide"
           style="left: 25%">
        如果有已经完成的交易,就来[补借条]吧~
      </div>
      <div class="bid-line-2">
        <div class="dot"></div>
      </div>
    </div>
    <bid-card v-for="li in list"
              :jh="jhTongji(li.id)"
              :link="getLink(li)"
              :user-id="li.c_borrower_id"
              :name="li.c_borrower_name"
              :user-icon="li.c_borrower_head"
              :lend="li.n_lender_num"
              :guarantors="li.n_guarantee_num"
              :left-time="li.n_left_tm"
              :type="getType(li)"
              :status="getStatus(li)"
              :amount="li.n_amt"
              :length="li.n_borrow_tm"
              :rate="li.n_interest_rate"
              :fee="li.n_type == 1 ? -1 : li.n_service_amt"
              :guarantee-rate="li.n_type == 0 ? li.n_guarantee_rate : -1"></bid-card>
  </div>
</template>

<script type="text/ecmascript-6">
  import bidCard from 'components/output/bidCard'
  import more from 'components/mixin/more.vue'
  import my from 'api/my'
  import {
    setUserInfo,
    setTempInfo,
    toggleNeedRefresh
  } from 'store/actions'

  export default{
    vuex: {
      getters: {
        indexBid: state => state.temp.indexBid,
        userId: state => state.userInfo.userId,
        openId: state => state.userInfo.openId,
        needRefresh: state => state.needRefresh,
        toRegist: state => state.toRegist
      },
      actions: {
        setTempInfo,
        setUserInfo,
        toggleNeedRefresh
      }
    },
    data () {
      return {
        registAmount: '',
        totalBorrowAmount: '',
        list: [],
        updateTime: 0,
        isOnebid: 0,
        loaded: true
      }
    },
    components: {
      bidCard,
      more
    },
    watch: {
      list (l) {
        this.isOnebid = 0
        l.forEach((e) => {
          if (e.n_type === 0 && this.userId === e.c_borrower_id) {
            this.isOnebid += 1
          } else {
            this.isOnebid += 0
          }
        })
        this.$dispatch('child', this.isOnebid)
      }
    },
    methods: {
      getLink (e) {
        let link = ''
        switch (e.n_type) {
          case 0:
            link = `/borrowDetail/1/${e.id}`
            break
          case 1:
            link = `/unconfirmIouDetail/${e.id}`
            break
          case 2:
            if (e.b_self_deal) {
              link = `/loanDetailLender/${e.id}`
            } else {
              link = `/loanDetailBorrower/${e.id}`
            }
            break
          default:
        }
        return link
      },
      getType (e) {
        let type = ''
        switch (e.n_type) {
          case 0:
            type = '求借款'
            break
          case 1:
            type = '补借条'
            break
          case 2:
            if (e.b_self_deal) {
              type = '向我借款'
            } else {
              type = '申请借款'
            }
            break
          default:
        }
        return type
      },
      getStatus (e) {
        let status = ''
        switch (e.n_type) {
          case 0:
            if (e.b_self_deal) {
              status = '待出借'
            } else {
              status = '筹款中'
            }
            break
          case 1:
            if (e.b_self_deal) {
              status = '请尽快确认'
            } else {
              status = '待对方确认'
            }
            break
          case 2:
            if (e.b_self_deal) {
              if (e.b_in_payment) {
                status = '支付验证中'
              } else {
                status = '请尽快处理'
              }
            } else {
              status = '待对方确认'
            }
            break
          default:
        }
        return status
      },
      getBidList () {
        if (this.toRegist) {
          my.getUnregistVisibleBid({
            openId: this.openId
          }).then(this.success)
            .catch(this.faile)
        } else {
          my.getVisibleBid()
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
        this.getSystemInfo()
      },
      getSystemInfo () {
        my.getSystemInfo().then((json) => {
          this.registAmount = json.n_user_cnt
          this.totalBorrowAmount = json.n_iou_cnt
        })
      },
      jhTongji (id) {
        return () => {
          window._JHsdk.action({
            event: 'ck_ac1',
            params: {
              id
            }
          })
        }
      },
    },
    events: {
      indexFresh () {
        this.getBidList()
      }
    },
    route: {
      deactivate ({ next }) {
        // 缓存表单
        this.setTempInfo({ indexBid: this.$data })
        next()
      }
    },
    created () {
      Object.assign(this.$data, this.indexBid)
      const time = new Date().getTime()
      if (time - this.indexBid.updateTime > 60000) {
        this.toggleNeedRefresh(false)
        this.loaded = false
        this.getBidList()
      } else if (this.needRefresh) {
        this.toggleNeedRefresh(false)
        this.loaded = false
        this.getBidList()
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
      width: 210px;
      height: 60px;
      line-height: 20px;
      font-size: $TIP_FONT_SIZE;
      margin: 50px 20px;
      padding: 5px;
      position: relative;
      color: $TIP_COLOR;
      border: 1px solid $BORDER_COLOR;
      border-radius: 5px;
    }
    &-line {
      transition: 1s ease;
      position: absolute;
      left: 15%;
      top: 350px;
      color: $BORDER_COLOR;
      width: 1px;
      height: calc(100vh - 425px);
      background-color: $BORDER_COLOR;
      .dot {
        position: relative;
        width: 12px;
        height: 12px;
        left: -6px;
        top: calc(100vh - 425px);
        box-sizing: border-box;
        background: $BORDER_COLOR;
        border-radius: 100%;
      }
      &-2 {
        transition: 1s ease;
        position: absolute;
        left: 40%;
        top: 460px;
        color: $BORDER_COLOR;
        width: 1px;
        height: calc(100vh - 535px);
        background-color: $BORDER_COLOR;
        .dot {
          position: relative;
          width: 12px;
          height: 12px;
          left: -6px;
          top: calc(100vh - 535px);
          box-sizing: border-box;
          background: $BORDER_COLOR;
          border-radius: 100%;
        }
      }
    }
  }

  .no-bid {
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

  .no-after {
    margin-bottom: -30px;
  }
</style>
