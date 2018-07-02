<template>
  <div class="pay-tips">
    <div>小提示</div>
    <div class="box"
         @click="next">
      <div v-show="cur == 1"
           transition="slide">今借到平台自身不放款，只提供信息服务，您需要把自己的借贷信息分享给他人看到。
      </div>
      <div v-show="cur == 2"
           transition="slide">非亲密关系，不建议您使用【补借条】功能，风险较大，平台推荐【求借款】【去出借】。
      </div>
      <div v-show="cur == 3"
           transition="slide">所有用户都需要信用认证，这是保障电子合同法律有效性的必要前提。
      </div>
      <div v-show="cur == 4"
           transition="slide">在平台储备金范围内，支持所有人任何时间立即提现。
      </div>
      <div v-show="cur == 5"
           transition="slide">线下还款需要对方确认才算完成，如若担心对方不确认建议选择线上还款。
      </div>
    </div>
    <div class="next"
         @click="next"></div>
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
        max: 5,
        cur: 1,
        timeFn: ''
      }
    },
    components: {},
    computed: {},
    methods: {
      next () {
        if (this.cur === this.max) {
          this.cur = 1
        } else {
          this.cur += 1
        }
      }
    },
    events: {
      loadingClick () {
        this.next()
      }
    },
    route: {},
    created () {
    },
    destoryed () {
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/const";

  .pay-tips {
    width: 100%;
    height: 130px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 10px;
    color: $TIP_COLOR;
    font-size: $TIP_FONT_SIZE;
    line-height: 22px;
  }

  .box {
    height: 78px;
    position: relative;
    width: 240px;
    > div {
      width: 100%;
      height: 100%;
      padding: 10px 0;
      position: absolute;
      top: 0;
      left: 0;
      text-indent: 2em;
    }
  }

  .next {
    height: 30px;
    width: 100%;
    background: url("../../assets/nextTip.svg") no-repeat center {
      size: 30px;
    }
  }

  .slide {
    &-transition {
      transition: .3s;
      opacity: 1;
    }
    &-enter {
      transform: translateX(100%);
      opacity: 0;
    }
    &-leave {
      transform: translateX(-100%);
      opacity: 0;
    }
  }
</style>
