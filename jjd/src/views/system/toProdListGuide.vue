<template>
  <div class="full">
    <backdrop :backdrop-show="true"></backdrop>
    <div class="btn-box1">
    </div>
    <group :first="true">
      <ele>
        <div class="title-left"
             solt="left">
          <div class="user-icon"
               :style="{backgroundImage: 'url(' + imgSrc + ')'}"></div>
          <div class="user-info">
            <div class="basic-info">洪泉</div>
            <div>15801008888</div>
          </div>
        </div>
        <div class="title-right"
             solt="right">
          <btn :cut="1"
               :text="'信用报告'"
               :min="true"></btn>
        </div>
      </ele>
      <ele class="no-padding">
        <border-box :cut="3">
          <div solt="left"
               class="block">
            <div>待收金额</div>
            <div>1000.90<span>元</span></div>
          </div>
        </border-box>
        <border-box :cut="3">
          <div class="block">
            <div>待还金额</div>
            <div>500.50<span>元</span></div>
          </div>
        </border-box>
        <border-box :cut="3">
          <div solt="right"
               class="block">
            <div>正在担保金额</div>
            <div>1000<span>元</span></div>
          </div>
        </border-box>
      </ele>
    </group>
    <group>
      <div>
        <div class="icon-box">
          <img src="../../assets/product.svg"
               class="icon">
          <div>我的出借</div>
        </div>
        <prod-card style="z-index:12;animation: fade-in 1s 0s normal;"
                   :name="'出借编号 201608271614218888'"
                   :apply-num="15"
                   :passing-rate="96"
                   :nearly-deal="2"
                   :average-time="3"
                   :min-money="1000"
                   :max-money="10000"
                   :min-length="1"
                   :max-length="30"
                   :yearly-rate="24"
                   :service-fee="50"
                   :service-rate="5"
                   :repay-type="'等额本息'"
                   :prodnum="true"></prod-card>
        <div class="guide-line"
             style="animation: fade-in 1.5s 0s normal;">
          <div class="dot"
               style="top: 20px"></div>
        </div>
        <div class="guide guide-txt"
             style="animation: fade-in 2s 0s normal;">
          <div>添加出借后，您有两种途径获客</div>
          <div>1.分享出借链接至微信好友/群,对方点开后即为您的好友，可直接申请您的出借</div>
          <div>2.下载宣传素材并打印，配合推广活动使用</div>
          <div>ps.单个出借也可以分享，下载素材</div>
        </div>
        <div class="btn-box">
          <btn :cut="4"
               :text="'分享出借'"
               :min="true"
               style="animation: fade-in 5s 0s normal;">
          </btn>
          <!--<div class="guide-line btn-line" style="animation: fade-in 2.5s 0s normal;">-->
          <!--<div class="dot"></div>-->
          <!--</div>-->
          <btn :cut="4"
               :text="'下载素材'"
               :min="true"
               style="animation: fade-in 4s 0s normal;"></btn>
          <div class="guide-line btn-line-2"
               style="animation: fade-in 3.5s 0s normal;">
            <div class="dot"></div>
          </div>
          <btn :cut="4"
               :text="'添加出借'"
               :min="true"
               style="animation: fade-in 3s 0s normal;"></btn>
          <!--<div class="guide-line btn-line-3" style="animation: fade-in 4.5s 0s normal;">-->
          <!--<div class="dot"></div>-->
          <!--</div>-->
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
             style="width: 100%; height: 200px;animation: fade-in 5s 0s normal;">
          <img class="guide-next"
               src="../../assets/arrow_next.svg">
          <div class="next">进入首页</div>
        </div>
      </div>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import prodCard from 'components/output/prodCard'
  import borderBox from 'components/mixin/borderBox'
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
        maxTimeList: []
      }
    },
    components: {
      prodCard,
      borderBox,
      backdrop
    },
    computed: {},
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
      top: 140px;
      color: $GUIDE_COLOR;
      width: 1px;
      height: 30px;
      background-color: $GUIDE_COLOR;
      .dot {
        position: relative;
        width: 12px;
        height: 12px;
        left: -6px;
        top: 0px;
        box-sizing: border-box;
        background: #fff;
        border: 3px solid rgba(0, 0, 0, 0.1);
        border-radius: 100%;
      }
    }
    &-txt {
      transition: 1s ease;
      width: 300px;
      height: 110px;
      line-height: 20px;
      font-size: $TIP_FONT_SIZE;
      margin: 20px 10px;
      padding: 5px;
      position: fixed;
      top: 0px;
      color: $GUIDE_COLOR;
      border: 1px solid $GUIDE_COLOR;
    }
    &-next {
      width: 30px;
      height: 30px;
      position: fixed;
      right: 10px;
      bottom: 70px;
    }
  }

  .next {
    color: #fff;
    position: fixed;
    text-align: right;
    right: 10px;
    bottom: 50px;
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
        background: {
          image: url('../../assets/basicInfo.svg');
          size: 12px;
          position: right center;
          repeat: no-repeat;
        }
      ;
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
    color: $MAIN_TEXT_COLOR;
    padding: 5px 10px 10px;
  }

  .icon {
    width: 20px;
    height: 20px;
    margin: 0 5px;
  }

  .gray {
    color: $TIP_COLOR;
  }

  .btn-box1 {
    width: 100%;
    position: fixed;
    height: 50px;
    bottom: 0;
    background: white;
  }

  .btn-box {
    z-index: 12;
    width: 100%;
    position: fixed;
    bottom: 0;
    background: none;
    display: flex;
    flex-direction: row-reverse;
    padding: 5px 10px;
    button {
      z-index: 12;
      margin: 5px;
      padding: 0 5px;
      background: none;
      color: $GUIDE_COLOR;
      &::before {
        border: 1px solid #fff;
        top: -15px;
      }
      &::after {
      }
    }
  }

  .btn-line {
    z-index: 12;
    position: absolute;
    left: 30%;
    top: calc(430px - 100vh);
    width: 1px;
    height: calc(100vh - 430px);
    background-color: $GUIDE_COLOR;
    &-2 {
      z-index: 12;
      position: absolute;
      top: calc(430px - 100vh);
      width: 1px;
      height: calc(100vh - 430px);
      background-color: $GUIDE_COLOR;
      left: 58%;
    }
    &-3 {
      z-index: 12;
      position: absolute;
      top: calc(430px - 100vh);
      width: 1px;
      height: calc(100vh - 430px);
      background-color: $GUIDE_COLOR;
      left: 85%;
    }
  }

  .block {
    font-size: $TIP_FONT_SIZE;
    padding: 10px 0;
  }

  .no-padding {
    padding: 0 !important;
    min-height: 0;
  }
</style>
