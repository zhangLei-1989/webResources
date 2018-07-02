<template>
  <div>
    <group class="top">
      <ele>
        <div class="bg">
          <div class="icon">
            <img :src="url">
          </div>
          <div class="row">
            {{text}}
          </div>
        </div>
      </ele>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      url: {
        default: require('../../assets/noData.svg')
      },
      text: {
        default: '暂无任何内容'
      }
    },
    data () {
      return {}
    },
    methods: {},
    components: {}
  }
</script>
<style lang="scss"
       scoped>
  @import "../../scss/fragment";

  .top {
    padding-top: 0 !important;
  }

  .bg {
    background: #fff;
    width: 100%;
    padding: 25px 0
  }

  div {
    width: 100%;
    text-align: center;
    margin: 0;
    .icon {
      img {
        width: 100px;
        margin-bottom: 5px;
        /*margin: 50px auto 0 auto;*/
      }
    }
    .row {
      color: #999;
      /*line-height: 20px;*/
    }
  }
</style>
