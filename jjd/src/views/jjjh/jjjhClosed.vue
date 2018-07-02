<template>
  <div>
    <div
      class="title1">
      <div class="waiting-img"></div>
      <div>标的到期已关闭</div>
    </div>
    <group :fixed="true">
      <btn :text="'再次申请今济计划'" :cut="1" :next="true" :btn-fn="toJjjhIndex"></btn>
    </group>
  </div>
</template>

<script>
  export default{
    data () {
      return {
      }
    },
    methods: {
      toJjjhIndex () {
//        this.$store.state.isJjjhClosed = true
        window.sessionStorage.setItem('isJjjhClosed', true)
        this.$router.go('/jjjh')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .title1 {
    width: 100%;
    height: 300px;
    line-height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .jjjh-tip {
    padding: 10px 0;
  }

  .waiting-img {
    width: 100px;
    height: 100px;
    background: no-repeat center/contain url("../../assets/simpleOverdue_g.svg");
  }
</style>
