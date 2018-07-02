<template>
  <div class="step-bar"
       v-if="show"
       :class="{single:num == 1,two:num > 1}">
    <div class="box">
      <div class="icon base-info ok"
           v-show="baseInfo"
           transition="step-slide">
        <div class="bg"></div>
      </div>
      <div class="icon zhima"
           :class="{ok:['zhimaInfo','operatorInfo','jingdongInfo'].includes(current)}"
           v-show="zhima"
           transition="step-slide">
        <div class="bg"></div>
      </div>
      <div class="icon phone"
           :class="{ok:['operatorInfo','jingdongInfo'].includes(current)}"
           v-show="operator"
           transition="step-slide">
        <div class="bg"></div>
      </div>
      <div class="icon jingdong"
           :class="{ok:['jingdongInfo'].includes(current)}"
           v-show="jingdong"
           transition="step-slide">
        <div class="bg"></div>
      </div>

      <div class="icon xuexin"
           v-show="xuexin"
           transition="step-slide">
        <div class="bg"></div>
      </div>
      <div class="icon zhengxin"
           v-show="zhengxin"
           transition="step-slide">
        <div class="bg"></div>
      </div>
      <div class="icon work"
           v-show="work"
           transition="step-slide">
        <div class="bg"></div>
      </div>
      <div class="icon income"
           v-show="income"
           transition="step-slide">
        <div class="bg"></div>
      </div>
      <div class="icon house"
           v-show="house"
           transition="step-slide">
        <div class="bg"></div>
      </div>
      <div class="icon car"
           v-show="car"
           transition="step-slide">
        <div class="bg"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: [
      'first',
      'updateBaseInfo',
      'current'
    ],
    data () {
      return {}
    },
    components: {},
    computed: {
      show () {
        return [
          'baseInfo',
          'zhimaInfo',
          'operatorInfo',
          'jingdongInfo',
          'xuexinInfo',
          'zhengxinInfo',
          'jobInfo',
          'incomeInfo',
          'houseInfo',
          'carInfo'].includes(this.current)
      },
      baseInfo () {
        return (this.first
          || this.current === 'baseInfo')
          && !this.xuexin
          && !this.zhengxin
          && !this.work
          && !this.income
          && !this.house
          && !this.car
      },
      zhima () {
        return (this.first
          || this.updateBaseInfo
          || this.current === 'zhimaInfo')
          && !this.xuexin
          && !this.zhengxin
          && !this.work
          && !this.income
          && !this.house
          && !this.car
      },
      operator () {
        return (this.first
          || this.updateBaseInfo
          || this.current === 'operatorInfo')
          && !this.xuexin
          && !this.zhengxin
          && !this.work
          && !this.income
          && !this.house
          && !this.car
      },
      jingdong () {
        return (this.first
          || this.updateBaseInfo
          || this.current === 'jingdongInfo')
          && !this.xuexin
          && !this.zhengxin
          && !this.work
          && !this.income
          && !this.house
          && !this.car
      },
      xuexin () {
        return this.current === 'xuexinInfo'
      },
      zhengxin () {
        return this.current === 'zhengxinInfo'
      },
      work () {
        return this.current === 'jobInfo'
      },
      income () {
        return this.current === 'incomeInfo'
      },
      house () {
        return this.current === 'houseInfo'
      },
      car () {
        return this.current === 'carInfo'
      },
      num () {
        let num = 0
        if (this.baseInfo) {
          num += 1
        }
        if (this.zhima) {
          num += 1
        }
        if (this.operator) {
          num += 1
        }
        if (this.jingdong) {
          num += 1
        }
        if (this.xuexin) {
          num += 1
        }
        if (this.zhengxin) {
          num += 1
        }
        if (this.work) {
          num += 1
        }
        if (this.income) {
          num += 1
        }
        if (this.house) {
          num += 1
        }
        if (this.car) {
          num += 1
        }
        return num
      }
    },
    methods: {},
    route: {},
    created () {
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/fragment";

  .step-bar {
    width: 100%;
    padding: 10px;
    display: flex;
    .box {
      flex: 1;
      display: flex;
      justify-content: space-between;
      position: relative;
      height: 40px;
      &::before {
        @extend %row-border;
        top: 50%;
        z-index: 0;
      }
    }
  }

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    .bg {
      width: 38px;
      height: 38px;
      position: absolute;
      top: 1px;
      left: 1px;
      z-index: 1;
      background: center no-repeat {
        size: 24px;
      }
    }
    &::before {
      @extend %btn-border;
      width: 200%;
      height: 200%;
      left: -50%;
      top: -50%;
      background-color: $BODY_COLOR;
      border: 1px solid $BORDER_COLOR {
        radius: 100px;
      }
    }
    &::after {
      content: "";
      width: 90%;
      height: 90%;
      position: absolute;
      left: 5%;
      top: 5%;
      border-radius: 50px;
      background-color: $BODY_COLOR;
    }
  }

  .base-info {
    .bg {
      background-image: url("../../assets/basicInfo_g.svg");
    }
    &.ok {
      .bg {
        background-image: url("../../assets/basicInfo_w.svg");
      }
      &::before {
        border-color: $MAIN_COLOR;
      }
      &::after {
        background-color: $MAIN_COLOR;
      }
    }
  }

  .zhima {
    .bg {
      background-image: url("../../assets/zhimainfo_g.svg");
    }
    &.ok {
      .bg {
        background-image: url("../../assets/zhimainfo_w.svg");
      }
      &::before {
        border-color: #7DCDB4;
      }
      &::after {
        background-color: #7DCDB4;
      }
    }
  }

  .phone {
    .bg {
      background-image: url("../../assets/operators_g.svg");
    }
    &.ok {
      .bg {
        background-image: url("../../assets/operators_w.svg");
      }
      &::before {
        border-color: #7DCDB4;
      }
      &::after {
        background-color: #7DCDB4;
      }
    }
  }

  .jingdong {
    .bg {
      background: {
        image: url("../../assets/jingdong_g.svg");
        size: 30px;
      }
    }
    &.ok {
      .bg {
        background-image: url("../../assets/jingdong_w.svg");
      }
      &::before {
        border-color: #FF6B6C;
      }
      &::after {
        background-color: #FF6B6C;
      }
    }
  }

  .xuexin {
    .bg {
      background-image: url("../../assets/xuexin_w.svg");
    }
    &::before {
      border-color: #82ADE4;
    }
    &::after {
      background-color: #82ADE4;
    }
  }

  .zhengxin {
    .bg {
      background-image: url("../../assets/bankCredit_w.svg");
    }
    &::before {
      border-color: #FF6B6C;
    }
    &::after {
      background-color: #FF6B6C;
    }
  }

  .work {
    .bg {
      background-image: url("../../assets/jobInfo_w.svg");
    }
    &::before {
      border-color: #82ADE4;
    }
    &::after {
      background-color: #82ADE4;
    }
  }

  .income {
    .bg {
      background-image: url("../../assets/incomeInfo_w.svg");
    }
    &::before {
      border-color: #FF6B6C;
    }
    &::after {
      background-color: #FF6B6C;
    }
  }

  .house {
    .bg {
      background-image: url("../../assets/house_w.svg");
    }
    &::before {
      border-color: #FF973A;
    }
    &::after {
      background-color: #FF973A;
    }
  }

  .car {
    .bg {
      background-image: url("../../assets/car_w.svg");
    }
    &::before {
      border-color: #7DCDB4;
    }
    &::after {
      background-color: #7DCDB4;
    }
  }

  .single .box {
    justify-content: center;
    &::before {
      display: none;
    }
  }

  .two {
    padding: 10px 60px;
  }

  .step-slide {
    &-transition {
      transition: .2s;
      opacity: 1;
    }
    &-enter {
      position: absolute;
      opacity: 0;
      transform: translateX(100%);
    }
    &-leave {
      position: absolute;
      opacity: 0;
      transform: translateX(-100%);
    }
  }
</style>
