<template>
  <div>
    <div v-if="show"
         class="loading-drop"
         transition="fade"
         @touchmove.stop.prevent="touchmove()">
      <div class="waiting-box">
        <div class="wait-tip">
          <div class="title"
               v-if="bank">银行处理中
          </div>
          <div class="title"
               v-else>正在验证中
          </div>
          <div>大概需要 60 秒，请稍作等待</div>
        </div>
        <more></more>
        <div class="tips">
          <pay-tips></pay-tips>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import more from 'components/mixin/more'
  import payTips from 'components/output/payTips'

  export default{
    props: [
      'show',
      'bank'
    ],
    components: {
      more,
      payTips
    },
    methods: {
      touchmove () {
        this.$dispatch('loadingClick', true)
      }
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  .loading-drop {
    background: rgba(0, 0, 0, .6);
    z-index: 11;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .wait-tip {
    text-align: center;
    font-size: 14px;
    line-height: 1.6;
  }

  .fade-transition {
    transition: .3s ease-out;
  }

  .fade-enter, .fade-leave {
    opacity: 0;
  }

  .waiting-box {
    background-color: #fff;
    width: 100%;
    padding: 20px 10px;
    border-radius: 3px;
  }

  .title {
    font-size: 16px;
    font-weight: bold;
  }

  .tips {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
