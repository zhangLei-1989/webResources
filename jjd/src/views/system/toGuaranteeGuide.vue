<template>
  <div class="full">
    <backdrop :backdrop-show="true"></backdrop>
    <group :fixed="true"
           :single="true"
           class="footer">
      <ele>
        <div class="box">
          <div class="button">
            <div class="icon bid"></div>
            <div class="desc">求借款</div>
          </div>
          <div class="button">
            <div class="icon iou"></div>
            <div class="desc">补借条</div>
          </div>
          <div class="button">
            <div class="icon credit"></div>
            <div class="desc">查信用</div>
          </div>
          <div class="button">
            <div class="icon prod"></div>
            <div class="desc">出借</div>
          </div>
        </div>
      </ele>
    </group>
    <group :first="true"
           class="head">
      <div>
        <div class="box">
          <div class="amount">
            <div class="desc">钱包余额(元)</div>
            <div class="val">{{wallet}}</div>
          </div>
          <div class="user">
            <div class="icon"
                 :style="{backgroundImage:'url('+ userHead +')'}"></div>
          </div>
          <div class="refresh">
            <div class="icon"></div>
          </div>
        </div>
      </div>
      <div>
        <div class="box">
          <div class="in-out">
            <div class="desc">待还金额(元)</div>
            <div class="val">{{out}}</div>
          </div>
          <div class="in-out">
            <div class="desc">待收金额(元)
            </div>
            <div class="val">{{in}}</div>
          </div>
        </div>
      </div>
    </group>
    <group class="nav">
      <ele>
        <div class="box">
          <div class="chosen guide white"
               style="animation: fade-in 0.5s 0s normal;">正在借款
          </div>
          <div>正在出借
          </div>
        </div>
      </ele>
    </group>
    <group>
      <bid-card style="animation: fade-in 1s 0s normal;"
                class="guide"
                :name="'洪泉'"
                :user-icon=""
                :lend="1"
                :guarantors="1"
                :left-time="30"
                :type="'求借款'"
                :status="'还款中'"
                :amount="2000"
                :length="30"
                :rate="12"
                :fee="50"
                :guarantee-rate="5"></bid-card>
      <div class="guide-line"
           style="animation: fade-in 1.5s 0s normal;">
        <div class="dot"></div>
      </div>
      <div class="guide guide-txt"
           style="animation: fade-in 2s 0s normal;">
        <div>作担保</div>
        <div>1.选择好友的求借款进行担保</div>
        <div>2.出借人选择您作担保并出借后，您将会收到相应的担保费用</div>
        <div>3.如出借人逾期还款，您有义务替TA还款</div>
      </div>
      <div v-if="usual === '1'"
           class="guide"
           @click="back"
           style="width: 100%; height: 200px;animation: fade-in 3s 0s normal;">
        <img class="guide-next"
             src="../../assets/arrow_next.svg">
        <div class="next">返回菜单</div>
      </div>
      <div v-else
           class="guide"
           @click="go('index')"
           style="width: 100%; height: 200px;animation: fade-in 3s 0s normal;">
        <img class="guide-next"
             src="../../assets/arrow_next.svg">
        <div class="next">进入首页</div>
      </div>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import bidCard from 'components/output/bidCard'
  import qrcode from 'components/mixin/qrcode'
  import backdrop from 'components/basic/backdrop'

  export default{
    vuex: {
      getters: {
        beginnerGuide: state => state.temp.cache.beginnerGuide,
        usual: state => state.temp.cache.usual
      }
    },
    data () {
      return {
        currentPage: 'bid',
        wallet: '1234.50',
        in: '500.50',
        out: '1060.09',
        toCheck: true,
        userHead: '',
        list: [
          {
            name: '张三',
            userIcon: '',
            lend: '2',
            guarantors: '3',
            leftTime: '30',
            type: '求借款',
            status: '还款中',
            amount: '1000',
            length: '15',
            rate: '18',
            fee: '10',
            guaranteeRate: '5'
          }
        ]
      }
    },
    computed: {},
    components: {
      qrcode,
      backdrop,
      bidCard
    },
    methods: {
      go (e) {
        this.currentPage = e
        this.$router.go({
          path: `/${e}`,
          replace: true
        })
      },
      back () {
        window.history.back()
      },
      goToRegist () {
        this.$router.go('/regist1')
      }
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/function";

  .full {
    @extend %full-screen;
  }

  .guide {
    position: relative;
    z-index: 10;
    text-align: left;
    animation: leftToRight3 2s;
    animation-delay: 4s;
    &-line {
      transition: 1s ease;
      z-index: 12;
      position: absolute;
      left: 100px;
      top: 350px;
      color: $GUIDE_COLOR;
      width: 1px;
      height: 30px;
      background-color: $GUIDE_COLOR;
      .dot {
        position: relative;
        width: 12px;
        height: 12px;
        left: -6px;
        top: 30px;
        box-sizing: border-box;
        background: #fff;
        border: 3px solid rgba(0, 0, 0, 0.1);
        border-radius: 100%;
      }
    }
    &-txt {
      transition: 1s ease;
      width: 270px;
      height: 110px;
      line-height: 20px;
      font-size: $TIP_FONT_SIZE;
      margin: 40px calc(50% - 120px);
      padding: 5px;
      position: fixed;
      color: $GUIDE_COLOR;
      border: 1px solid $GUIDE_COLOR;
    }
    &-next {
      width: 30px;
      height: 30px;
      position: fixed;
      right: 20px;
      bottom: 30px;
    }
  }

  .next {
    color: #fff;
    position: fixed;
    text-align: right;
    right: 20px;
    bottom: 10px;
  }

  .white {
    color: $GUIDE_COLOR !important;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    100% {
      opacity: 1
    }
  }

  .desc {
    font-size: $TIP_FONT_SIZE;
    margin-bottom: 5px;
  }

  .val {
    font-size: $MAX_FONT_SIZE;
  }

  .amount,
  .in-out {
    flex: 1;
    padding: 15px 0;
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
    }
    .user {
      width: 70px;
      height: 50px;
      position: absolute;
      top: 15px;
      left: 10px;
      display: flex;
      .icon {
        @include user-icon(44px);
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
        width: 30px;
        height: 30px;
        transform-origin: 50% 50%;
        background: url("../../assets/refresh.svg") center no-repeat {
          size: contain;
        }
      }
    }
  }

  .nav {
    font-size: $TIP_FONT_SIZE;
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
          background-color: $GUIDE_COLOR;
        }
      }
    }
  }

  .slide-bid {
    &-transition {
      transition: .3s;
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
      transition: .3s;
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
      right: 20%;
    }
  }

  .to-regist {
    @extend %full-screen;
    z-index: 10;
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
</style>
