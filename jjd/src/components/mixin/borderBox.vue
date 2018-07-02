<template>
  <div class="border-box"
       :class="{top:index<cut,'no-right':index%cut==cut-1,'c3':cut==3,'c4':cut==4,'c6':cut==6}">
    <!--:style="{flex:'0 0 ' + width}"-->
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      cut: {
        default: 4
      }
    },
    data () {
      return {
        index: 0
      }
    },
    computed: {
      width () {
        return `${100 / this.cut}%`
      }
    },
    methods: {
      getIndex () {
        const ele = this.$el
        const siblings = ele.parentNode.children
        const index = Array.indexOf(siblings, ele)
        this.index = index
      }
    },
    attached () {
      this.getIndex()
    }
  }
</script>

<style lang="scss"
       scoped>
  @import "../../scss/fragment";

  .border-box {
    background: {
      image: -webkit-gradient(linear, left top, right top, color-stop(.5, transparent), color-stop(.5, $BORDER_COLOR));
      position: 100% 0;
      repeat: repeat-y;
      size: 1px 100%;
    }
  ;
    position: relative;
    &::after {
      @extend %row-border;
    }
    &.top::before {
      @extend %row-border;
      top: 0;
    }
    &.no-right {
      background-image: none;
    }
  }

  .c3 {
    width: 33.3333%;
    float: left;
  }

  .c4 {
    width: 25%;
    loat: left;
  }

  .c6 {
    width: 16.6666%;
    loat: left;
  }
</style>
