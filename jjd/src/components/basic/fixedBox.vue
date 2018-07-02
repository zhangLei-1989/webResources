<template>
  <div class="fixed"
       v-show="!hidden">
    <backdrop :backdrop-show="show"
              @click="close"></backdrop>
    <div class="fixed-content"
         @touchmove.stop.prevent="touchmove()"
         v-show="show"
         transition="slide-in"
         @transitionEnd="transitionEnd">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import backdrop from '../basic/backdrop'

  export default{
    props: [
      'show'
    ],
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        hidden: true
      }
    },
    components: {
      backdrop
    },
    computed: {},
    watch: {
      show (e) {
        if (e) {
          this.hidden = false
        }
      }
    },
    methods: {
      touchmove () {
      },
      close () {
        this.show = false
      },
      transitionEnd () {
        this.hidden = !this.show
      }
    },
    route: {},
    created () {
    },
    attached () {
      if (this.show) {
        this.hidden = false
      }
    }
  }
</script>

<style lang="scss"
       scoped>
  @import '../../scss/fragment';

  .fixed {
    @extend %fixed-bottom;
    height: 280px;
    position: fixed;
    z-index: 3;
    &-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 3;
      background-color: white;
    }
  }

  .slide-in {
    &-transition {
      transition: .3s;
    }
    &-enter,
    &-leave {
      transform: translateY(100%);
    }
  }
</style>
