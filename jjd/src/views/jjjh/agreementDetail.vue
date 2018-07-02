<template>
  <div>
    <ele :more="true" @click="toDoc(1)">不良资产处置合作协议</ele>
    <!--<ele :more="true" @click="toDoc(2)">借款协议</ele>-->
    <ele :more="true" @click="toDoc(3)">今济名单合作协议</ele>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        item: ''
      }
    },
    methods: {
      toDoc (i) {
        if (i === 1) {
          this.$router.go('/blzcczxyDoc')
        } else if (i === 2) {
          this.$router.go('/dcxyDoc')
        } else if (i === 3) {
          this.$router.go('/jjmdxyDoc')
        }
      }
    },
    route: {
      data ({ to: { params: { item } } }) {
        this.item = item
      },
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
