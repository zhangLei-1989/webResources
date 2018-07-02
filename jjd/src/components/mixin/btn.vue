<template>
  <button :style="{width:btnWidth}"
          :class="{dangerous:dangerous,disabled:!allow,warning:warning,next:next,min:min,margin:margin,c1:cut==1}"
          @click.stop.prevent="btnFunc()">{{text}}
  </button>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      text: {
        default: '确认'
      },
      cut: {
        default: 0
      },
      allow: {
        default: true
      },
      dangerous: {
        default: false
      },
      warning: {
        default: false
      },
      next: {
        default: false
      },
      min: {
        default: false
      },
      btnFn: {
        type: Function,
        default () {
        }
      }
    },
    computed: {
      btnWidth () {
        if (!this.cut) {
          return '100px'
        } else if (this.cut === 1) {
          return 'calc(100% - 20px)'
        }
        return `${(1 / this.cut) * 100}%`
      },
      margin () {
        if (this.cut && this.cut > 1) {
          return true
        }
        return false
      }
    },
    methods: {
      btnFunc () {
        if (this.allow) {
          this.btnFn()
        }
      }
    }
  }
</script>

<style lang="scss"
       scoped>
  @import '../../scss/fragment';

  button {
    border-radius: $BORDER_RADIUS;
    color: $MAIN_TEXT_COLOR;
    background-color: white;
    &::before {
      @extend %btn-border;
      border: 1px solid #dadada {
        radius: 2 * $BORDER_RADIUS;
      }
    ;
    }
  }

  .disabled {
    &, &:active {
      background-color: #AAAAAA !important;
      color: white !important;
      pointer-events: none;
      cursor: not-allowed;
    }
    ::after,
    ::before {
      display: none !important;
    }
  }

  .warning {
    background-color: white;
    color: $MINOR_COLOR;
    &::before {
      @extend %btn-border;
      border: 2 * $BORDER_RADIUS solid $MINOR_COLOR;
    }
  }

  .dangerous {
    background-color: $MINOR_COLOR;
    color: white;
    &::before {
      display: none !important;
    }
  }

  .next {
    color: white;
    background-color: $MAIN_COLOR;
    &::before {
      display: none;
    }
  }

  .min {
    color: $LINK_COLOR;
    font-size: $TIP_FONT_SIZE;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    &::before {
      @extend %btn-border;
      border: 1px solid $MAIN_COLOR {
        radius: $BORDER_RADIUS;
      }
    }
  }

  :active::after {
    @extend %active-drop
  }

  .fixed {
    position: fixed;
    bottom: 0px;
  }

  .margin {
    margin: 0 10px;
  }

  .c1 {
    width: 100%;
    width: -webkit-calc(100% - 20px);
  }
</style>
