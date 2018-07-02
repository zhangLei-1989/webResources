<template>
  <div>
    <div class="fixed">
      <ele>
        <div>
          <button v-link="'/downloadEvidence/' + id"
                  class="light">下载证据
          </button>
          <button v-if="false"
                  @click="litigation">我要诉讼
          </button>
        </div>
      </ele>
    </div>
    <group :first="true">
      <ele>
        <div class="box">
          <div class="days ok">逾期</div>
          <div class="days"
               :class="{ok: days > 0}">第<span>01</span>天
          </div>
          <div class="timeline"
               :class="{ok: days > 0}">
                        <span class="icon wx"></span
                        >开始向还款人定时推送微信消息提醒还款
          </div>
          <div class="timeline"
               :class="{ok: days > 0}">
            <span class="icon cl"></span>
            上传并定时更新逾期记录至本平台信用中心
          </div>
          <div class="timeline"
               :class="{ok: days > 0}">
            <span class="icon mn"></span>
            以待还本息为基数，每日按年化利率24%计收罚息
          </div>
          <div class="timeline"
               :class="{ok: days > 0}">
            <span class="icon hm"></span>
            开始计收基础逾期管理费(逾期本息+罚息)*1‰/天
          </div>
          <div class="days"
               :class="{ok: days > 16}">第<span>16</span>天
          </div>
          <div class="timeline"
               :class="{ok: days > 16}">
            <span class="icon ms"></span>
            开始短信通知还款人的部分手机联系人
          </div>
          <div class="timeline"
               :class="{ok: days > 16}">
            <span class="icon hm"></span>
            产生特殊逾期管理费(逾期本息+罚息+基础逾期管理费)*5%
          </div>
          <div class="days"
               :class="{ok: days > 30}">第<span>30</span>天
          </div>
          <div class="timeline"
               :class="{ok: days > 30}">
            <span class="icon ms"></span>
            继续短信通知还款人的更多手机联系人
          </div>
          <div class="timeline"
               :class="{ok: days > 30}">
            <span class="icon hm"></span>
            调整特殊逾期管理费率至10%
          </div>
          <div class="timeline"
               :class="{ok: days > 30}">
            <span class="icon cl"></span>
            开放黑名单接口给第三方机构
          </div>
          <div class="timeline"
               :class="{ok: days > 30}">
            <span class="icon bl"></span>
            可以申请法律支持
          </div>
          <div class="days"><span>结束</span></div>
        </div>
      </ele>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        id: '',
        days: 1
        // 0, 16, 30
      }
    },
    components: {},
    computed: {},
    methods: {
      litigation () {
        // todo: 诉讼功能未完成
        window.console.log('litigation')
      }
    },
    route: {
      data ({ to: { params: { days, id } } }) {
        return {
          days: parseInt(days, 10),
          id
        }
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
  @import "../../scss/fragment";

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
    flex: 1;
    padding: 10px 0;
    color: $BORDER_COLOR;
    font-size: $TIP_FONT_SIZE;
    > div {
      padding: 5px 0;
    }
    .days {
      width: 60px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        width: 24px;
        height: 24px;
        border-radius: 24px;
        line-height: 24px;
        font-size: 10px;
        color: white;
        background-color: $BORDER_COLOR;
      }
    }

    .timeline {
      position: relative;
      padding-left: 80px;
      &::before {
        @extend %btn-border;
        border-left: 1px solid $BORDER_COLOR;
        left: calc(-50% + 30px);
      }
      &::after {
        @extend %btn-border;
        width: 10px;
        height: 10px;
        left: 25px;
        top: 10px;
        border: 1px solid $BORDER_COLOR {
          radius: 5px;
        }
        background-color: white;
      }
    }
  }

  .icon {
    display: block;
    width: 16px;
    height: 16px;
    position: absolute;
    background: center no-repeat {
      size: contain;
    }
    left: 55px;
    top: 5px;
  }

  .mn {
    background-image: url("../../assets/mn_g.svg");
  }

  .bl {
    background-image: url("../../assets/bl_g.svg");
  }

  .cl {
    background-image: url("../../assets/cl_g.svg");
  }

  .hm {
    background-image: url("../../assets/hm_g.svg");
  }

  .ms {
    background-image: url("../../assets/ms_g.svg");
  }

  .wx {
    background-image: url("../../assets/wx_g.svg");
  }

  .ok {
    color: $MAIN_TEXT_COLOR;
    .mn {
      background-image: url("../../assets/mn.svg");
    }
    .bl {
      background-image: url("../../assets/bl.svg");
    }
    .cl {
      background-image: url("../../assets/cl.svg");
    }
    .hm {
      background-image: url("../../assets/hm.svg");
    }
    .ms {
      background-image: url("../../assets/ms.svg");
    }
    .wx {
      background-image: url("../../assets/wx.svg");
    }
    &.days span {
      background-color: $MAIN_COLOR;
    }
    &::before,
    &::after {
      border-color: $MAIN_COLOR !important;
    }
  }
</style>
