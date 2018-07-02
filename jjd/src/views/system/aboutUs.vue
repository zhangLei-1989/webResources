<template>
  <div>
    <div class="logo">
      <img src="../../../static/logo_main.svg">
      <img src="../../../static/slogan_black.svg">
    </div>
    <div class="title">今借到<span>V3.3.10</span></div>
    <div class="content">
      <div>
        今借到是一个依托微信社交平台，通过信用大数据风控和立体催收系统，帮助民间放贷人士获客、风控、交易与管理，提高借贷效率的金融服务平台。
      </div>
      <div>
        今借到致力于成为金融的入口，帮助有信用的个人和企业今天就借到钱，我们坚信每一个有信用的借款人都是创造价值的主体，我们永不放贷，因为总有出借人比我们更能识别借款人的信用。
      </div>
    </div>
    <div class="foot">
      <div>
        <div>
          <span>客服电话</span>
          <span>010 - 83036303</span>
        </div>
        <div>
          <span>服务时间</span>
          <span>10:00 - 19:00（工作日）</span>
        </div>
      </div>
    </div>
    <div class="copy-right">
      <div>
        copyright&copy北京人人信科技有限公司
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    methods: {},
    components: {}
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/fragment';

  .logo {
    width: 100%;
    text-align: center;
    :first-child {
      width: 59px;
      height: 59px;
      margin: 50px auto 0 auto;
      display: block;
    }
    :last-child {
      width: 87px;
      height: 22px;
      margin: 10px auto;
      display: block;
    }
  }

  .title {
    margin-top: 10px;
    text-align: center;
    font-size: 10px;
    span {
      margin: 0 3px;
    }
  }

  .content {
    background: $ELE_W_COLOR;
    margin: 20px 10px 10px 10px;
    border-radius: 10px;
    div {
      padding: 15px 10px;
      font-size: $MIN_FONT_SIZE;
      color: $MAIN_TEXT_COLOR;
    }
  }

  .foot {
    width: 100%;
    text-align: center;
    font-size: $MIN_FONT_SIZE;
    margin-top: 50px;
    div {
      width: 210px;
      margin: auto;
      div {
        text-align: left;
        :first-child {
          border-right: 1px solid #666;
        }
        span {
          padding: 0 5px;
        }
      }
    }
  }

  .copy-right {
    width: 100%;
    color: $TIP_COLOR;
    font-size: $MIN_FONT_SIZE;
    margin-top: 10px;
    div {
      width: 200px;
      margin: 0 auto;
    }
  }
</style>
