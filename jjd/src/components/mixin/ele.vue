<template>
  <label class="row"
         :class="{dashed:dashed,'no-line':noLine,transparent:transparent,danger:danger}"
         v-show="!hide"
         @click.stop.prevent="stop">
    <img src="../../assets/alert_bg_w.png" alt="" v-if="danger" class="eleImg">
    <slot name="left">
    </slot>
    <slot></slot>
    <div class="more"
         v-if="more&&!danger"></div>
    <div class="more-danger" v-if="more&&danger"></div>
    <slot name="right"></slot>
    <div class="clear"
         @click="clear"></div>
    <slot name="unit"></slot>
  </label>
</template>

<script type="text/ecmascript-6">
  export default{
    props: [
      'link',
      'hide',
      'dashed',
      'noLine',
      'transparent',
      'more',
      'danger'
    ],
    methods: {
      clear (e) {
        const newE = e
        newE.target.previousElementSibling.value = ''
        newE.target.previousElementSibling.focus()
      },
      stop () {
        this.$router.go(
          this.link
        )
      }
    }
  }
</script>

<style lang="scss">
  @import '../../scss/fragment';

  .row {
    > :first-child + input {
      flex: 1;
      min-width: 120px;
    }
    > input:first-child {
      text-align: left;
      flex: 1;
    }
    & > input:focus {
      margin-right: 25px;
    }
    [slot=left] {
      min-width: 106px;
    }
    [slot=left] + [slot=right] {
      &, & input {
        flex: 1;
        text-align: left;
      }
    }
  }

  .android .row > input,
  .ios .row > input:first-child,
  :first-child + input[slot=right],
  [slot=left] + input[slot=right] {
    &:focus + .clear {
      opacity: 1;
      z-index: 1;
    }
  }

  [slot="unit"] {
    padding-left: 5px;
  }

  .row > input,
  [slot=left] + input[slot=right] {
    &:focus + .clear + [slot="unit"] {
      position: relative;
      left: -25px;
    }
  }
  .left-danger{
    padding-left: 80px;
  }

  .more + [slot=right] {
    margin-right: 20px;
    text-align: right;
  }
  .more-danger + [solt=right] {
    margin-right: 20px;
    text-align: right;
  }
  .eleImg{
    display: inline-block;
    position: absolute;
    left: 11px;
    top: 15px;
    height: 20px;
    width: 20px;
  }

  .con-rig [slot=right] {
    text-align: center !important;
  }

  .row + .tip_box {
    position: relative;
  }

  .row + .tip::before,
  .row + .tip_box::before {
    @extend %row-border;
    top: 0;
  }

  .tip[slot] {
    font-size: $TIP_FONT_SIZE;
    color: $TIP_COLOR;
    position: relative;
    &:last-child {
      padding: 10px 10px 0;
    }
    &:first-child {
      padding: 0 10px 10px;
    }
    a {
      color: $LINK_COLOR;
    }
  }

  .tip[slot=tip_bottom]:first-child {
    padding-top: 0;
  }

  [slot=right]:first-child {
    flex: 1;
    text-align: right;
  }

  button + .tip {
    text-align: center;
  }
</style>

<style lang="scss"
       scoped>
  @import '../../scss/fragment';

  .row {
    width: 100%;
    padding: 0 10px;
    position: relative;
    min-height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    &::before {
      @extend %row-border;
      top: 0;
    }
    &::after {
      @extend %row-border;
      width: calc(100% - 20px);
      left: 10px;
    }
    .tip & {
      padding: 0;
      background-color: transparent;
      min-height: inherit;
      &::before,
      &::after {
        content: none;
      }
    }
    ~ .row::before {
      content: none;
    }
    &:last-child::after {
      width: 100%;
      left: 0;
    }
  }

  .clear,
  .more {
    height: 100%;
    width: 40px;
    position: absolute;
    right: 0;
    top: 0;
    background: url("../../assets/clear.svg") no-repeat center {
      size: 14px;
    }
    opacity: 0;
    z-index: -1;
    transition: .1s;
  }
  .clear,
  .more-danger {
    height: 100%;
    width: 40px;
    position: absolute;
    right: 0;
    top: 0;
    background: url("../../assets/clear.svg") no-repeat center {
      size: 14px;
    }
    opacity: 0;
    z-index: -1;
    transition: .1s;
  }

  .more {
    background-image: url("../../assets/more.svg");
    opacity: 1;
    z-index: 1;
    width: 30px;
  }
  .more-danger{
    background-image: url("../../assets/more_w.svg");
    opacity: 1;
    z-index: 1;
    width: 30px;
  }

  .dashed {
    &::before {
      display: none;
    }
    &::after {
      border-bottom-style: dashed;
    }
  }

  .no-line {
    &:not(:first-child)::before,
    &::after {
      display: none;
    }
  }

  .transparent {
    background: transparent;
  }
  .danger {
    background-color: $MINOR_COLOR;
    color: white;
    padding-left: 40px;
  }
</style>
