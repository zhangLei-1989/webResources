<template>
  <div class="follow">
    <div class="drop"
         @click="goToFollow"></div>
    <div class="qr">
      <div class="img"
           :style="{backgroundImage: 'url(' + qrImg +')'}"></div>
      <div class="text">
        <div>点击二维码 关注今借到</div>
        <div>才能进行后续操作哦~</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { confirm } from 'tools/utils'

  export default{
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        qrImg: require('../../../static/jjd_qr_small.jpg')
      }
    },
    components: {},
    computed: {},
    methods: {
      goToFollow () {
        confirm(
          `<div>长按下方图片<br>
                    点击【识别图中二维码】<br>
                    点击关注即可关注</div>
                    <img src="${this.qrImg}"
                    style="width: 172px; height: 172px">`,
          '你还没有关注【今借到】公众号'
        )
      }
    },
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

  .follow {
    width: 100%;
    padding: 0 10px 10px;
  }

  .drop {
    @extend %full-screen;
    z-index: 3;
  }

  .qr {
    background: url("../../assets/qr_bg.svg") center no-repeat {
      size: 300px;
    }
    height: 160px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .img {
      width: 86px;
      height: 86px;
      background: center no-repeat {
        size: 86px;
      }
      /*background: url("../../../static/jjd_qr_small.jpg") center no-repeat {*/
      /*size: 86px;*/
      /*}*/
      margin-top: 15px;
    }
    .text {
      color: white;
      margin-top: 5px;
    }
  }
</style>
