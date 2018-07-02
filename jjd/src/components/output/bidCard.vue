<template>
  <div class="bid-card">
    <group :first="true">
      <ele :transparent="true"
           @click="jh"
           :link="link">
        <div class="user">
          <div class="icon"
               :style="{backgroundImage: userIcon ? 'url('+userIcon+')' : 'url('+defaultIcon+')', backgroundColor: userIcon ? 'transparent' : ''}"
               @click.stop.prevent="goToUser"></div>
          <div class="info-all">
            <div class="name">
              <div>{{name}}</div>
              <div class="type">
                <span>{{type}}</span>
                <span class="line"></span>
                <span>{{status}}</span>
              </div>
            </div>
            <div class="info-detail">
              <span v-if="lend">{{lend}}人出借</span>
              <span v-if="guarantors">{{guarantors}}人担保</span>
              <span v-if="leftTime>-1">
                                {{leftTime>0?'剩余 '+leftTime+' 天':!leftTime?'即将失效':'已失效'}}
                            </span>
            </div>
          </div>
        </div>
      </ele>
      <ele :transparent="true"
           :no-line="true"
           :link="link">
        <div class="main-info">
          <div class="amount">
            <div class="val">
              <span>{{getAmountText(amount)}}</span>
              <span>元</span>
            </div>
            <div class="desc">筹款金额</div>
          </div>
          <div class="length">
            <div class="val">
              <span>{{length}}</span>
              <span>天</span>
            </div>
            <div class="desc">借款时长</div>
          </div>
        </div>
        <div class="fee-info"
             slot="right">
          <div class="val">
            <div v-if="rate > -1"
                 class="fee">
              <span>{{rate}}</span>
              <span>%</span>
            </div>
            <div v-if="fee > -1"
                 class="fee">
              <span>{{fee}}</span>
              <span>元</span>
            </div>
            <div v-if="guaranteeRate > -1"
                 class="fee">
              <span>{{guaranteeRate}}</span>
              <span>%</span>
            </div>
          </div>
          <div class="fee-detail">
            <span>年利率</span>
            <span v-if="fee > -1">服务费</span>
            <span v-if="guaranteeRate > -1">担保费率</span>
          </div>
        </div>
      </ele>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: [
      'jh',
      'link',
      'userId',
      'name',
      'userIcon',
      'lend',
      'guarantors',
      'leftTime',
      'type',
      'status',
      'amount',
      'length',
      'rate',
      'fee',
      'guaranteeRate'
    ],
    data () {
      return {
        defaultIcon: require('../../assets/default_icon.svg')
      }
    },
    methods: {
      goToUser () {
        if (this.userId) {
          window._JHsdk.action({
            event: 'ck_ac2',
            params: {
              id: this.userId
            }
          })
          this.$router.go(`/creditReportSimpleMine/${this.userId}`)
        }
        return
      },
      getAmountText (e) {
        const amountNum = parseInt(e, 10)
        const amountText = e.toString()
        if (amountNum >= 1000) {
          return amountText.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
        return amountNum
      }
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/function";

  .bid-card {
    position: relative;
    margin: 0 10px 10px;
    background-color: white;
    border-radius: $BORDER_RADIUS;
    height: 123px;
    &::after {
      @extend %btn-border;
      border: 1px solid $BORDER_COLOR {
        radius: 2 * $BORDER_RADIUS;
      }
    }
    .last {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 1;
      &::after {
        display: none !important;

      }
    }
  }

  .user {
    flex: 1;
    display: flex;
    padding: 10px 0;
    .icon {
      @include user-icon(40px);
      margin-right: 10px;
    }
    .name {
      display: flex;
      align-items: center;
      font-size: $TIP_FONT_SIZE;
      .type {
        margin-left: 5px;
        font-size: $MIN_FONT_SIZE;
        color: $MAIN_COLOR;
        line-height: 16px;
        height: 16px;
        position: relative;
        display: flex;
        align-items: center;
        &::before {
          @extend %btn-border;
          border: 1px solid $MAIN_COLOR {
            radius: 2 * $BORDER_RADIUS;
          }
        }
        span {
          padding: 0 5px;
          display: inline-block;
          text-align: center;
        }
        .line {
          @extend %btn-border;
          border-right: 1px solid $MAIN_COLOR;
          width: 1px;
          height: 20px;
          position: static;
          padding: 0 1px 0 0;
        }
      }
    }
    .info-all {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  .main-info {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }

  %temp {
    padding-right: 3px;
    margin-right: 3px;
    position: relative;
    &::after {
      @extend %btn-border;
      border-right: 1px solid $BORDER_COLOR;
      height: 150%;
      top: -25%;
    }
    &:last-child {
      padding-right: 0;
      margin-right: 0;
      &::after {
        display: none;
      }
    }
  }

  .info-detail,
  .fee-detail {
    font-size: $MIN_FONT_SIZE;
    color: $TIP_COLOR;
    display: flex;
    span {
      @extend %temp;
    }
  }

  .fee-info .fee {
    @extend %temp;
    padding-right: 5px;
    margin-right: 5px;
  }

  .amount,
  .length,
  .fee-info {
    font-size: $MIN_FONT_SIZE;
    .desc {
      color: $TIP_COLOR;
    }
    .val {
      color: $MAIN_COLOR;
      display: flex;
      align-items: baseline;
      height: 24px;
      margin-bottom: 5px;
      span:first-child {
        font-size: $LARGE_FONT_SIZE;
      }
    }
  }

  .length .val {
    justify-content: center;
  }

  .fee-info .val,
  .fee-detail {
    justify-content: flex-end;
  }

  .fee-info {
    flex: 1;
    padding: 10px 0;
    .fee {
      display: flex;
      align-items: baseline;
      padding-right: 3px;
      span:first-child {
        font-size: $BASE_FONT_SIZE !important;
      }
      span:last-child {
        font-size: $MIN_FONT_SIZE !important;
      }
    }
    .val {
      color: $MAIN_TEXT_COLOR;
      align-items: flex-end;
    }
  }
</style>
