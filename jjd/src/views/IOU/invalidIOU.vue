<template style="">
  <div style="margin: calc(50vh - 120px) auto">
    <div class="content">
      <img src="../../assets/noData.svg">
      <div v-if="type === '1'">该求借款已关闭。</div>
      <div v-if="type === '2'">由于对方驳回或超时，借条已经不存在了。</div>
      <div v-if="type === '3'">该出借已关闭。</div>
      <div v-if="!type">页面不存在</div>
    </div>
    <group :fixed="true">
      <btn :text="'去首页'"
           :cut="1"
           :btn-fn="goNext"></btn>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {
        type: 0
      }
    },
    components: {},
    methods: {
      goNext () {
        this.$router.go({
          path: '/index',
          replace: true
        })
      }
    },
    route: {
      data ({ to: { params: { type } } }) {
        this.type = type
      }
    }
  }

</script>
<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import '../../scss/fragment';

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
    img {
      width: 100px;
      margin: 20px auto;
    }
    div {
      padding: 10px;
    }
  }
</style>
