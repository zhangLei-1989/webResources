<template>
  <div class="group"
       :class="{single:single,fixed:fixed,last:index == siblings - 1,first:first,btn:btn}">
    <slot name="tip_top"></slot>
    <slot></slot>
    <slot name="tip_bottom"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: [
      'single',
      'fixed',
      'first',
      'btn'
    ],
    data () {
      return {
        index: 0,
        siblings: 0
      }
    },
    methods: {
      getIndex () {
        const ele = this.$el
        if (
          !ele
          || !ele.parentNode.getElementsByClassName
          || !Array.indexOf
        ) return
        const siblings = ele.parentNode.getElementsByClassName('group')
        const index = Array.indexOf(siblings, ele)
        this.index = index
        this.siblings = siblings.length
      }
    },
    attached () {
      let i = 0
      const re = setInterval(() => {
        this.getIndex()
        i += 1
        if (i > 2) {
          clearInterval(re)
        }
      }, 500)
    }
  }
</script>

<style lang="scss">
  .single .tip {
    &:first-child {
      padding: 0 0 10px;
    }
    &:last-child {
      padding: 10px 0 0;
    }
  }

  .group .tip {
    align-self: flex-start;
  }

  .group.first {
    padding-top: 0 !important;
    > .row:first-child::before {
      display: none;
    }
  }
</style>

<style lang="scss"
       scoped>
  @import '../../scss/fragment';

  .group {
    padding-top: 10px;
    &:last-child::after,
    &.last::after {
      content: '';
      display: block;
      height: 80px;
    }
  }

  .single {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    padding: 10px;
    margin-top: 0;
    margin-bottom: 0 !important;
    display: flex;
    justify-content: center;
    background-color: #fff;
    &::after {
      display: none !important;
    }
    &::before {
      @extend %row-border;
      top: 0;
    }
  }

  .btn {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    &::after {
      display: none !important;
    }
  }
</style>
