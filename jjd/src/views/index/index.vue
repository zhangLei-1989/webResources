<template>
  <div>
    <!--<index-filter @filter="filter"-->
    <!--:show="filterShown"></index-filter>-->
    <backdrop :backdrop-show="selectRole || tutorial"
              @close="cancel"></backdrop>
    <!--<div class="tutorial"-->
    <!--@click.stop.prevent="goToTutorial"-->
    <!--v-if="tutorialShown">-->
    <!--<div class="pic animated2"-->
    <!--:class="{'bounceInDown':tutorial,'bounceInDownRight':!tutorial}">-->
    <!--<div class="tutorial-btn"-->
    <!--@click.stop.prevent="goToTutorial"></div>-->
    <!--<div class="tutorial-close"-->
    <!--@click.stop.prevent="cancelTurtorial"></div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="spring-festival"-->
    <!--@click="goToSpringFestivalDetail">-->
    <!--<div>-->
    <!--<div>春节期间(2017年01月24日至02月05日)人工客服暂停，有问题请在公众号或客服电话留言。1月27日至1月29日不支持提现业务，如若着急用钱请暂时使用补借条功能。</div>-->
    <!--</div>-->
    <!--</div>-->
    <div class="tutorial-btn animated"
         :class="{'bounceIn':!swing}"
         @click.stop.prevent="goToTutorial"
         v-if="tutorialBtnShown"></div>
    <div class="lender-borrower"
         v-show="selectRole"
         transition="slide-bottom">
      <group>
        <ele @click="imBorrower">
          <div>我是借款人</div>
        </ele>
        <ele @click="imLender">
          <div>我是出借人</div>
        </ele>
        <ele @click="cancel">
          <div>取消</div>
        </ele>
      </group>
    </div>
    <group :fixed="true"
           :single="true"
           class="footer">
      <ele>
        <div class="box">
          <div class="button"
               @click.stop.prevent="toCreatedBid">
            <div class="icon bid"></div>
            <div class="desc">求借款</div>
          </div>
          <div class="button"
               @click="toSelectRole">
            <div class="icon iou"></div>
            <div class="desc">补借条</div>
          </div>
          <div class="button"
               @click="seekCredit">
            <div class="icon credit"></div>
            <div class="desc">查信用</div>
          </div>
          <div class="button"
               @click="productList">
            <div class="icon prod"></div>
            <div class="desc">去出借</div>
          </div>
        </div>
      </ele>
    </group>
    <group :first="true"
           class="head">
      <ele :transparent="true">
        <div class="box"
             style="padding: 10px 0;">
          <div class="amount"
               @click="goTo('myWallet')">
            <div class="desc">钱包余额</div>
            <div class="val"
                 style="font-size: 22px;">{{wallet}}

            </div>
          </div>
          <div class="user"
               @click="goTo('my')">
            <div class="icon menu"></div>
            <!--:style="{backgroundImage:'url('+userIcon+')'}"-->
          </div>
          <div class="refresh"
               @click="refresh">
            <div class="icon"
                 :class="{loading: loading}"></div>
          </div>
        </div>
      </ele>
      <ele :transparent="true">
        <div class="box">
          <div class="in-out"
               @click="toOutList">
            <div class="desc">待还金额</div>
            <div class="val">{{out}}</div>
          </div>
          <div class="in-out"
               @click="toInList">
            <div class="desc"
                 :class="{'new-message':toCheck}">待收金额

            </div>
            <div class="val">{{in}}</div>
          </div>
        </div>
      </ele>
    </group>
    <group class="nav">
      <ele>
        <div class="box">
          <div :class="{chosen:currentPage=='bid'}"
               @click="go('bid')">正在借款

          </div>
          <div :class="{chosen:currentPage=='prod'}"
               @click="go('prod')">正在出借

          </div>
        </div>
      </ele>
    </group>
    <group class="nav nav-fixed"
           v-show="stick"
           transition="nav-slide">
      <ele>
        <div class="box">
          <div :class="{chosen:currentPage=='bid'}"
               @click="go('bid')">正在借款

          </div>
          <div :class="{chosen:currentPage=='prod'}"
               @click="go('prod')">正在出借

          </div>
        </div>
      </ele>
    </group>
    <group>
      <!--<router-view :transition="'slide-'+currentPage"-->
      <!--transition-mode="in-out"></router-view>-->
      <router-view></router-view>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import indexFilter from 'components/output/indexFilter'
  import qrcode from 'components/mixin/qrcode'
  import backdrop from 'components/basic/backdrop'
  import { alert, confirm } from 'tools/utils'
  import my from 'api/my'
  import user from 'api/user'
//  import creditCenterUser from 'api/creditCenterUser'
  import {
    setUserInfo,
    toggleLoading,
    clearTempInfo
  } from 'store/actions'
  import { normal } from 'tools/share'

  export default{
    vuex: {
      getters: {
        userIcon: state => state.userInfo.userIcon,
        userId: state => state.userInfo.userId,
        toRegist: state => state.toRegist,
        currentShare: state => state.currentShare,
        loading: state => state.loading,
        tutorialIndex: state => state.temp.cache.tutorialIndex,
        tutorialDetail: state => state.temp.cache.tutorialDetail,
        beginnerGuide: state => state.temp.cache.beginnerGuide
      },
      actions: {
        setUserInfo,
        toggleLoading,
        clearTempInfo
      }
    },
    data () {
      return {
        filterShown: false,
        currentPage: 'bid',
        wallet: '0.00',
        in: '0.00',
        out: '0.00',
        scrollY: 0,
        toCheck: false,
        selectRole: false,
        tutorial: false,
        isOneBid: '',
        tutorialShown: false,
        tutorialBtnShown: false,
        swing: false,
        allowIouAndBuy: true,
      }
    },
    events: {
      child (isOneBid) {
        this.isOneBid = isOneBid
      }
    },
    watch: {
      tutorial (e) {
        if (e) {
          setTimeout(() => {
            this.tutorialShown = true
            this.tutorialBtnShown = false
          }, 300)
        } else {
          setTimeout(() => {
            this.tutorialShown = false
            this.tutorialBtnShown = true
          }, 600)
        }
      }
    },
    computed: {
      stick () {
        return this.scrollY > 192
      }
    },
    components: {
      indexFilter,
      qrcode,
      backdrop
    },
    methods: {
      toOutList () {
        if (this.toRegist) {
          window._JHsdk.action({
            event: 'zc_ac1'
          })
          window._JHsdk.action({
            event: 'sy_ac5'
          })
          alert('请先完成注册')
          this.$router.go('/regist1')
        } else {
          window._JHsdk.action({
            event: 'sy_ac5'
          })
          this.$router.go('/outList')
        }
      },
      toInList () {
        if (this.toRegist) {
          window._JHsdk.action({
            event: 'zc_ac1'
          })
          window._JHsdk.action({
            event: 'sy_ac6'
          })
          alert('请先完成注册')
          this.$router.go('/regist1')
        } else {
          window._JHsdk.action({
            event: 'sy_ac6'
          })
          this.$router.go('/inList')
        }
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
//          .catch(() => {
//          this.allowIouAndBuy = true
//          const that = this
//          confirm('您还没有信用认证，请尽快完成', '提示',
//            [{
//              text: '知道了',
//            }, {
//              text: '去认证',
//              fn () {
//                that.$router.go(`/creditReportSimpleMine/${that.userId}`)
//              },
//            }])
//        })
      },
      imBorrower () {
        if (this.allowIouAndBuy) {
          window._JHsdk.action({
            event: 'sy_ac2',
            params: {
              type: 'borrower'
            }
          })
          this.$router.go('/createIOU/borrower')
        } else {
          const that = this
          confirm(
            '您未满22周岁，不能使用补借条，可以尝试使用求借款功能。',
            '22岁以下用户请使用求借款',
            [{
              text: '知道了'
            }, {
              text: '求借款',
              fn () {
                that.$router.go('/createBid')
              }
            }]
          )
        }
      },
      imLender () {
        window._JHsdk.action({
          event: 'sy_ac2',
          params: {
            type: 'lender'
          }
        })
        this.$router.go('/createIOU/lender')
      },
      goToTutorial () {
        this.cancel()
        this.$router.go('/tutorial')
      },
      toCreatedBid () {
        if (this.toRegist) {
          window._JHsdk.action({
            event: 'sy_ac1',
            params: {
              type: 'not regist'
            }
          })
          window._JHsdk.action({
            event: 'zc_ac1'
          })
          alert('请先完成注册')
          this.$router.go('/regist1')
        } else if (this.isOneBid > 0) {
          window._JHsdk.action({
            event: 'sy_ac1',
            params: {
              type: 'applying'
            }
          })
          alert('同一时间只能有一个求借款')
        } else {
          window._JHsdk.action({
            event: 'sy_ac1',
            params: {
              type: 'ok'
            }
          })
          this.$router.go({
            path: '/createBid',
            replace: false
          })
        }
      },
      toSelectRole () {
        if (this.toRegist) {
          window._JHsdk.action({
            event: 'zc_ac1'
          })
          window._JHsdk.action({
            event: 'sy_ac2',
            params: {
              type: 'not regist'
            }
          })
          alert('请先完成注册')
          this.$router.go('/regist1')
        } else {
          window._JHsdk.action({
            event: 'sy_ac2',
            params: {
              type: 'select'
            }
          })
          this.selectRole = true
        }
      },
      cancel () {
        this.selectRole = false
      },
      cancelTurtorial () {
        this.tutorial = false
        user.saveCache({
          tutorialIndex: true
        })
      },
      filter () {
        this.filterShown = false
      },
      showFilter () {
        this.filterShown = true
      },
      go (e) {
        if (e === 'bid') {
          window._JHsdk.action({
            event: 'sy_ac7'
          })
        } else if (e === 'prod') {
          window._JHsdk.action({
            event: 'sy_ac8'
          })
        }
        this.currentPage = e
        this.$router.go({
          path: `/index/${e}`,
          replace: true
        })
      },
      goTo (e) {
        if (e === 'my') {
          window._JHsdk.action({
            event: 'sy_ac9'
          })
        } else if (e === 'myWallet') {
          window._JHsdk.action({
            event: 'sy_ac10'
          })
        }
        if (this.toRegist) {
          window._JHsdk.action({
            event: 'zc_ac1'
          })
          alert('请先完成注册')
          this.$router.go('/regist1')
        } else {
          this.$router.go({
            path: `/${e}`,
          })
        }
      },
      scrollStart () {
        this.scrollY = window.pageYOffset
      },
      getMyInfo () {
        my.getFirstPageInfo().then((json) => {
          if (!json) return
          this.setUserInfo({
            userId: json.id,
            nickname: json.c_name,
            tel: json.c_telephone,
            userIcon: json.c_head
          })
          this.wallet = json.n_left_amt.toFixed(2)
          this.in = json.n_to_receive_amt.toFixed(2)
          this.out = json.n_to_repay_amt.toFixed(2)
          this.toCheck = json.b_to_receive_check
        })
      },
      refresh () {
        this.toggleLoading(true)
        this.$broadcast('indexFresh')
        this.getMyInfo()
      },
      productList () {
        if (this.toRegist) {
          window._JHsdk.action({
            event: 'sy_ac4',
            params: {
              type: 'not regist'
            }
          })
          window._JHsdk.action({
            event: 'zc_ac1'
          })
          alert('请先完成注册')
          this.$router.go('/regist1')
        } else {
          window._JHsdk.action({
            event: 'sy_ac3',
            params: {
              type: 'ok'
            }
          })
          this.$router.go(`/productList/${this.userId}`)
        }
      },
      seekCredit () {
        if (this.toRegist) {
          window._JHsdk.action({
            event: 'sy_ac3',
            params: {
              type: 'not regist'
            }
          })
          window._JHsdk.action({
            event: 'zc_ac1'
          })
          alert('请先完成注册')
          this.$router.go('/regist1')
        } else {
          window._JHsdk.action({
            event: 'sy_ac3',
            params: {
              type: 'ok'
            }
          })
          this.$router.go('/seekCredit')
        }
      },
//      indexToRegist () {
//        if (this.toRegist) {
//          window._JHsdk.action({
//            event: 'zc_ac1'
//          })
//          alert('请先完成注册')
//          this.$router.go('/regist1')
//        }
//      },
      imgPreLoad (url) {
        const img = new Image()
        img.src = url
        return img
      },
      goToSpringFestivalDetail () {
      }
    },
    created () {
      this.getMyInfo()
      this.clearTempInfo()
      if (!this.toRegist) {
        this.getAgeInfo()
      }
    },
    attached () {
//            const img1 = require('../../../static/tutorial_1.jpg')
//            const img2 = require('../../../static/tutorial_prod_1.jpg')

      document.addEventListener('scroll', this.scrollStart)
      // todo: 临时去掉以下首页放贷款攻略
//            if (
//                this.beginnerGuide &&
//                !this.tutorialDetail &&
//                !this.tutorialIndex
//            ) {
//                this.tutorial = true
//            } else if (
//                this.beginnerGuide &&
//                !this.tutorialDetail &&
//                this.tutorialIndex
//            ) {
//                this.tutorialBtnShown = true
//            }
//            setInterval(() => {
//                this.swing = !this.swing
//            }, 1500)
//            this.imgPreLoad(img1)
//            this.imgPreLoad(img2)
    },
    destroyed () {
      document.removeEventListener('scroll', this.scrollStart)
    },
    route: {
      data ({ to: { name } }) {
        this.currentPage = name
        if (this.currentShare !== 'index') {
          normal()
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/function";

  .desc {
    font-size: $MIN_FONT_SIZE;
    margin-bottom: 5px;
  }

  .val {
    font-size: $LARGE_FONT_SIZE;
  }

  .amount,
  .in-out {
    flex: 1;
    padding: 15px 0;
  }

  .amount {
    flex: 0 0 50%;
  }

  .amount :first-child {
    font-size: $TIP_FONT_SIZE;
  }

  .in-out {
    position: relative;
    &:first-child::after {
      @extend %btn-border;
      border-right: 1px solid white;
      height: 100%;
      top: 0;
    }
  }

  .head {
    background: $HEAD_COLOR;
    color: white;
    text-align: center;
    .row {
      padding: 0 !important;
      &::after {
        width: 100%;
        left: 0;
        border-color: white;
      }
    }
    .box {
      flex: 1;
      position: relative;
      display: flex;
      justify-content: center;
    }
    .user {
      width: 70px;
      height: 50px;
      position: absolute;
      top: 15px;
      left: 10px;
      display: flex;
      .icon {
        @include user-icon(40px);
        border-radius: 0;
        background-size: 20px;
        background-color: transparent;
      }
      .menu {
        background-image: url("../../assets/menu.svg");
      }
    }
    .refresh {
      width: 70px;
      height: 50px;
      position: absolute;
      top: 15px;
      right: 10px;
      display: flex;
      justify-content: flex-end;
      .icon {
        width: 40px;
        height: 40px;
        transform-origin: 50% 50%;
        background: url("../../assets/refresh.svg") center no-repeat {
          size: 22px;
        }
        transform: rotate(90deg);
        /*opacity: .8;*/
        /*border-radius: 100%;*/
      }
    }
    .loading {
      @at-root {
        @keyframes rotate {
          from {
            transform: rotate(0deg)
          }
          to {
            transform: rotate(360deg)
          }
        }
      }
      animation: rotate 1s linear 0s normal none infinite;
    }
  }

  .nav {
    font-size: $BASE_FONT_SIZE;
    .row {
      padding: 0 !important;
      min-height: 0;
      &::after {
        width: 100%;
        left: 0;
      }
    }
    .box {
      height: 44px;
      flex: 1;
      display: flex;
      > div {
        flex: 1;
        text-align: center;
        line-height: 44px;
        color: $MAIN_TEXT_COLOR;
      }
      .chosen {
        color: $MAIN_COLOR;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background-color: $MAIN_COLOR;
        }
      }
    }
  }

  .slide-bid {
    &-transition {
      transition: .2s;
    }
    &-enter {
      transform: translateX(-100%);
    }
    &-leave {
      transform: translateX(100%);
    }
  }

  .slide-prod {
    &-transition {
      transition: .2s;
    }
    &-enter {
      transform: translateX(100%);
    }
    &-leave {
      transform: translateX(-100%);
    }
  }

  .footer {
    padding: 0 !important;
    color: $MAIN_COLOR;
    .row {
      padding: 0 !important;
    }
    .box {
      flex: 1;
      display: flex;
      .button {
        flex: 1;
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      .icon {
        @extend %title-icon;
        width: 24px;
        margin-right: 0;
      }
      .bid {
        background-image: url("../../assets/bid.svg");
      }
      .iou {
        background-image: url("../../assets/iou.svg");
      }
      .credit {
        width: 20px;
        background-image: url("../../assets/checkCredit.svg");
      }
      .prod {
        background-image: url("../../assets/loan.svg");
      }
      .desc {
        font-size: $MIN_FONT_SIZE !important;
        margin-bottom: 0;
      }
    }
  }

  .nav-fixed {
    position: fixed;
    top: -11px;
    left: 0;
    right: 0;
    z-index: 2;
  }

  .nav-slide {
    &-transition {
      transition: .2s;
      transform: translateY(0);
    }
    &-enter,
    &-leave {
      transform: translateY(-100%);
    }
  }

  .slide-bottom {
    &-transition {
      transition: .2s;
      transform: translateY(0);
    }
    &-enter,
    &-leave {
      transform: translateY(100%);
    }
  }

  .new-message {
    position: relative;
    &::after {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background-color: $MINOR_COLOR;
      position: absolute;
      top: 0;
      right: 22%;
    }
  }

  .lender-borrower {
    @extend %fixed-bottom;
    z-index: 3;
    div {
      flex: 1;
      text-align: center;
    }
    .group::after {
      display: none !important;
    }
  }

  .disabled {
    pointer-events: none;
  }

  .tutorial {
    @extend %full-screen;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 4;
    .pic {
      width: 320px;
      height: 400px;
      position: relative;
      margin-bottom: 90px;
      background: url("../../assets/tutorial.png") center no-repeat {
        size: contain;
      }
      .tutorial-btn {
        position: absolute;
        width: 100%;
        height: 50px;
        bottom: 50px;
        left: 0;
        background: url("../../assets/tutorial_btn.png") center no-repeat {
          size: contain;
        }
      }
      .tutorial-close {
        position: absolute;
        width: 30px;
        height: 30px;
        top: 47px;
        right: 16px;
        background: url("../../assets/close_w.svg") center no-repeat {
          size: contain;
        }
      }
    }
  }

  .bounceInDownRight {
    animation-name: bounceInDownRight;
  }

  @keyframes bounceInDownRight {
    0% {
      transform: translate(0, 0) scale(1);
    }
    100% {
      transform: translate(50vw, 50vh) scale(0);
      transform: translate(calc(50vw - 30px), calc(50vh - 20px)) scale(0);
    }
  }

  .tutorial-btn {
    position: fixed;
    right: 0;
    bottom: 25px;
    height: 100px;
    width: 100px;
    z-index: 2;
    background: url("../../assets/tutorial_small.png") center no-repeat {
      size: contain;
    }
  }

  .animated2 {
    animation-duration: 0.6s;
    animation-fill-mode: both;
  }

  .spring-festival {
    width: 100%;
    overflow: hidden;
    background-color: $HEAD_COLOR;
    & > div {
      background-color: $MAIN_COLOR;
      & > div {
        color: white;
        font-size: $MIN_FONT_SIZE;
        padding: 5px;
        width: 900px;
        animation: spring-festival-warning 20s linear infinite;
      }
    }
  }

  @keyframes spring-festival-warning {
    from {
      transform: translateX(400px);
    }
    to {
      transform: translateX(-900px);
    }
  }
</style>
