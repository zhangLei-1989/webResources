<template>
  <div class="basic-card">
    <group :first="true">
      <ele :transparent="true"
           @click.stop.prevent="goToProd">
        <div>
          <div class="title-left">
            <div class="user-icon"
                 :class="{prodnum:prodnum}"
                 :style="{backgroundImage: userIcon ? 'url('+userIcon+')' : 'url('+defaultIcon+')'}"
                 @click.stop.prevent="goToUser"></div>
            <div class="user-info">
              <div class="basic-info">{{name}}</div>
              <div class="title-detail">
                <div>{{applyNum}}人申请</div>
                <div>{{passingRate}}%通过</div>
                <div v-if="averageTime <= 48">{{(averageTime || 0).toFixed(1)}}小时处理</div>
                <div v-else>>48小时处理</div>
                <!--<span v-if="showBtn">最近成交{{getDaysAgo(nearlyDeal)}}天<span v-if="getDaysAgo(latestDay) < 1">前</span></span>-->
                <div v-if="showBtn">
                  <div v-if="nearlyDeal">最近成交{{nearlyDeal}}天<span v-if="nearlyDeal < 1">前</span></div>
                  <div v-else>最近成交暂无</div>
                </div>
                <!--<span v-if="nearlyDeal < 1">前</span>-->
              </div>
              <div class="share"
                   :class="{shareclose:isClose}"
                   v-show="showBtn"
                   @click.stop.prevent="goToShare">
                <img v-if="!isClose"
                     src="../../assets/share.svg">
                <img v-if="isClose"
                     src="../../assets/shareGray.svg">
                分享
              </div>
            </div>
          </div>
        </div>
      </ele>
      <ele :transparent="true"
           @click.stop.prevent="goToProd">
        <div class="content">
          <div class="content-left">

            <div v-if="minMoney === maxMoney"
                 class="content-title"
                 :class="{isClose:isClose}">
              {{getAmountText(maxMoney)}}<span class="unit"><span v-if="maxMoney >= 10000"
                                                                  class="wanUnit">万</span>元</span>
            </div>
            <div v-else
                 class="content-title"
                 :class="{isClose:isClose}">
              {{getAmountText(minMoney)}}<span class="unit"><span v-if="minMoney >= 10000"
                                                                  class="wanUnit">万</span></span>
              -
              {{getAmountText(maxMoney)}}<span class="unit"><span v-if="maxMoney >= 10000"
                                                                  class="wanUnit">万</span>元</span>
            </div>
            <div>单笔出借额度</div>
          </div>
          <div class="content-right">
            <div v-if="minLength === maxLength && minlengthUnit === maxlengthUnit"
                 class="content-title"
                 :class="{isClose:isClose}">
              {{minLength}}<span class="unit">{{getUnit(minlengthUnit)}}</span>
            </div>
            <div v-else
                 class="content-title"
                 :class="{isClose:isClose}">
              {{minLength}}<span class="unit">{{getUnit(minlengthUnit)}}</span>
              -
              {{maxLength}}<span class="unit">{{getUnit(maxlengthUnit)}}</span>
            </div>
            <div>借款时长</div>
          </div>
        </div>
      </ele>
      <ele :transparent="true"
           :no-line="true"
           @click.stop.prevent="goToProd">
        <div class="foot">
          <div class="foot-left">
            <div>年利率</div>
            <div class="unit">{{yearlyRate}}%</div>
          </div>
          <div class="foot-right">
            服务费
            <div class="unit">
              <span>{{serviceRate}}%</span>
              <span>{{serviceFee}}元</span>
            </div>
          </div>
        </div>
      </ele>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import basicCard from '../basic/basicCard'

  export default{
    props: [
      'showBtn',
      'self',
      'isClose',
      'id',
      'userId',
      'name',
      'userIcon',
      'applyNum',
      'passingRate',
      'nearlyDeal',
      'averageTime',
      'minMoney',
      'maxMoney',
      'minLength',
      'maxLength',
      'minlengthUnit',
      'maxlengthUnit',
      'yearlyRate',
      'serviceRate',
      'serviceFee',
      'prodnum',
      'repayType'
    ],
    data () {
      return {
        defaultIcon: require('../../assets/default_icon.svg')
      }
    },
    components: {
      basicCard
    },
    methods: {
      getDaysAgo (e) {
        const s = ((new Date()).getTime() - new Date(e))
          / (1000 * 24 * 3600)
        if (s < 1) {
          return '今'
        } else if (s > 90) {
          return '90'
        }
        return parseInt(s, 10)
      },
//            getDaysAgo(e) {
//                if (!this.nearlyDeal) {
//                    return '暂无最近成交记录'
//                } else if (this.nearlyDeal < 1) {
//                    return '最近成交今天'
//                }
//                return `最近成交${e}天前`
//            },
      getUnit (value) {
        if (this.repayType > 0) {
          return '期'
        }
        return value > 0 ? '个月' : '天'
      },
      goToShare () {
        if (!this.id) return
        this.$router.go(`/shareQr/prod/1/${this.id}`)
      },
      goToUser () {
        if (!this.id) return
        this.$router.go(`/creditReportSimpleMine/${this.userId}`)
      },
      goToProd () {
        if (!this.id) return
        if (this.self) {
          this.$router.go(`/productDetailLender/${this.id}`)
        } else {
          this.$router.go(`/productDetailBorrower/${this.id}`)
        }
      },
//            getAmountText (e) {
//                const amountNum = parseInt(e, 10)
//                const amountText = (e || 0).toString()
//                if (amountNum >= 1000 && amountNum < 10000) {
//                    return amountText.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
//                } else if (amountNum >= 10000) {
//                    return (amountNum / 10000).toFixed(1)
//                }
//                return amountNum
//            },
      getAmountText (e) {
        const amountNum = parseInt(e, 10)
        const amountText = (e || 0).toString()
        if (amountNum >= 1000 && amountNum < 10000) {
          return amountText.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        } else if (amountNum >= 10000) {
          return (amountNum / 10000).toFixed(1)
        }
        return amountNum
      },
      getAmountUnit (e) {
        const amountNum = parseInt(e, 10)
        if (amountNum >= 10000) {
          return '万'
        }
        return ''
      }
    },
    computed: {}
  }
</script>

<style lang="scss"
       scoped>
  @import '../../scss/fragment';

  .wanUnit {
    font-size: $BASE_FONT_SIZE;
  }

  .basic-card {
    margin: 0 10px 10px;
    background-color: white;
    border-radius: $BORDER_RADIUS;
    position: relative;
    .group::after {
      display: none !important;
    }
    &::before {
      @extend %btn-border;
      border: 1px solid $BORDER_COLOR {
        radius: 2 * $BORDER_RADIUS;
      }
    }
  }

  .prodnum {
    display: none;
  }

  .share {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: $MIN_FONT_SIZE;
    color: $MAIN_COLOR;
    padding: 0 5px 0 20px;
    line-height: 16px;
    border: 1px solid $MAIN_COLOR {
      radius: 10px;
    }
    img {
      width: 20px;
      height: 20px;
      position: absolute;
      left: -1px;
      top: -2px;
    }
  }

  .shareclose {
    color: $TIP_COLOR;
    border: 1px solid $TIP_COLOR {
      radius: 10px;
    }
  }

  .user-icon {
    height: 40px;
    width: 40px;
    margin-right: 10px;
    /*margin: 5px 5px 5px 0;*/
    border-radius: 100%;
    background-size: 40px 40px;
  }

  .title-left {
    display: flex;
    align-items: center;
    padding: 10px 0;
    .user-info {
      display: flex;
      line-height: 25px;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      .basic-info {
        font-size: $TIP_FONT_SIZE;
      }
    }
  }

  .title-detail {
    display: flex;
    font-size: 10px;
    color: $TIP_COLOR;
    div {
      height: 20px;
      line-height: 20px;
      padding: 0 5px;
      position: relative;
      overflow: hidden;
      &::after {
        @extend %btn-border;
        border-right: 1px solid $BORDER_COLOR;
        height: 100%;
        top: 0%;
      }
    }
    :first-child {
      padding: 0 5px 0 0;
    }
    :last-child::after {
      display: none;
    }
  }

  .isClose {
    color: $TIP_COLOR !important;
  }

  .content {
    display: flex;
    flex: 1;
    text-align: center;
    font-size: $MIN_FONT_SIZE;
    margin: 15px 0;
    color: $TIP_COLOR;
    &-title {
      color: $MAIN_COLOR;
      font-size: $LARGE_FONT_SIZE;
      margin-bottom: 5px;
      white-space: nowrap;
      .unit {
        font-size: $MIN_FONT_SIZE;
      }
    }
    &-left {
      flex: 1;
      position: relative;
      &::after {
        @extend %btn-border;
        border-right: 1px solid $BORDER_COLOR;
      }
    }
    &-right {
      flex: 1;
    }
  }

  .foot {
    display: flex;
    flex: 1;
    font-size: $MIN_FONT_SIZE;
    color: $TIP_COLOR;
    .unit {
      color: $MAIN_TEXT_COLOR;
    }
    &-left {
      justify-content: center;
      display: flex;
      flex: 1;
      .unit {
        margin-left: 5px;
      }
    }
    &-right {
      justify-content: center;
      display: flex;
      flex: 1;
      .unit {
        margin-left: 5px;
        :first-child {
          padding-right: 5px;
          position: relative;
          &::after {
            @extend %btn-border;
            border-right: 1px solid $BORDER_COLOR;
            height: 160%;
            top: -30%;
          }
        }
      }
    }
  }
</style>
