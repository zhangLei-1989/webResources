<template>
  <div>
    <group :first="true"
           class="bg">
      <div class="begin-body">
        <div class="box"
             @click="go('toLendGuideStep1')">
          <img src="../../assets/lendTo.svg">
          <div>如何出借</div>
        </div>
        <div class="box"
             @click="go('toBidGuideStep1')">
          <img src="../../assets/seekloansTo.svg">
          <div>如何借款</div>
        </div>
        <div class="box"
             @click="go('toGuaranteeGuide')">
          <img src="../../assets/guaranteeTo.svg">
          <div>如何担保</div>
        </div>
      </div>
      <div class="ignore"
           @click="ignore">
        <div class="ignore-skip">跳过>></div>
        <div class="ignore-tip">您可依次点击【首页左上角菜单按钮】-【设置】-【新手引导】再次查看</div>
      </div>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import user from 'api/user'

  export default {
    data () {
      return {
        usual: ''
      }
    },
    methods: {
      go (e) {
        this.$router.go({
          path: `/${e}`,
          replace: false
        })
      },
      ignore () {
        window.history.back()
      },
      save () {
        user.saveCache({
          beginnerGuide: true,
          usual: this.usual
        })
      }
    },
    components: {},
    created () {
    },
    route: {
      data ({ to: { params: { usual } } }) {
        this.usual = usual
        this.save()
      }
    }
  }
</script>
<style lang="scss"
       scoped>
  @import "../../scss/function";

  .bg {
    background: $ELE_W_COLOR;
    &::after {
      display: none !important;
    }
  }

  .begin-body {
    @extend %full-screen;
    background-color: $ELE_W_COLOR;
    display: flex;
    flex-direction: column;
  }

  .box {
    height: 120px;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid $BORDER_COLOR;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    margin: 10px 20px;
    img {
      width: 80px;
      height: 80px;
      margin: auto;
    }
  }

  .ignore {
    position: fixed;
    bottom: 10px;
    width: 100%;
    .ignore-skip {
      text-align: center;
      color: $LINK_COLOR;
      padding: 10px 0 0;
    }
    .ignore-tip {
      text-align: center;
      color: $TIP_COLOR;
      font-size: $MIN_FONT_SIZE;
      padding: 10px;
    }
  }
</style>
