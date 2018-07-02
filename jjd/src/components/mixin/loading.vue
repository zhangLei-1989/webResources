<template>
  <div>
    <div v-show="show"
         id="loading"
         transition="slide">
      <div></div>
    </div>
    <div v-show="show"
         class="loading-drop"
         @click.stop.prevent="touchmove()"
         @touchmove.stop.prevent="touchmove()"
         @touchstart.stop.prevent="touchmove()"
         @touchend.stop.prevent="touchmove()"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: [
      'show'
    ],
    methods: {
      touchmove () {
        this.$dispatch('loadingClick', true)
        this.$broadcast('loadingClick', true)
      }
    }
  }
</script>

<style lang="scss"
       scoped>
  @import '../../scss/fragment';

  #loading {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;
    background-color: $MAIN_COLOR;
    > div {
      background: linear-gradient(to right, $MAIN_COLOR 35%, $MINOR_COLOR 50%, $MAIN_COLOR 65%);
      width: 200%;
      height: 3px;
      transform: translateX(-100%);
      animation: {
        name: loading;
        duration: 2s;
        iteration-count: infinite;
      }
      @at-root {
        @keyframes loading {
          0% {
            transform: translateX(-65%);
          }
          100% {
            transform: translateX(15%);
          }
        }
      }
    }
  }

  .slide {
    &-transition {
      transition: all .3s;
    }
    &-enter,
    &-leave {
      opacity: 0;
      transform: translateY(-100%);
    }
  }

  .loading-drop {
    @extend %full-screen;
    background: transparent;
    z-index: 10;
  }
</style>
