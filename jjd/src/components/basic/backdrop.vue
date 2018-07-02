<template>
  <div id="backdrop"
       v-show="backdropShow"
       transition="fade"
       @touchstart.stop.prevent="touchStopPrenent()"
       @touchmove.stop.prevent="touchStopPrenent()"
       @touchend.stop.prevent="touchStopPrenent()"></div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: [
      'backdropShow'
    ],
    methods: {
      touchStopPrenent () {
        this.$dispatch('toggle', false)
        if (this.backdropShow) {
          this.$dispatch('close')
          this.$dispatch('loadingClick', true)
        }
      }
    },
    watch: {
      backdropShow (e) {
        this.$dispatch('toggle', e)
        // 遮罩关闭时触发
      }
    }
  }
</script>

<style lang="scss"
       scoped>
  @import '../../scss/fragment';

  #backdrop {
    @extend %full-screen;
    background: $BACKDROP_COLOR;
    z-index: 3;
  }

  .fade {
    &-transition {
      transition: .3s ease-out;
    }
    &-enter,
    &-leave {
      opacity: 0;
    }
  }
</style>
