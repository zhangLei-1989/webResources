<template>
  <div class="row"
       :style="{width:columnWidth}"></div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      cut: {
        default: 0
      }
    },
    data () {
      return {
        msg: 'hello vue'
      }
    },
    computed: {
      columnWidth () {
        if (!this.cut) {
          return '50px'
        }
        return `${(1 / this.cut) * 100}%`
      }
    },
    components: {}
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/fragment';

  .row {
    display: inline-block;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: $TIP_FONT_SIZE;
    /*background-color:#CCCCCC;*/
  }
</style>
