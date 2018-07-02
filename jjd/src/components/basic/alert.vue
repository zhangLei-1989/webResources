<template>
  <div class="box"
       v-show="alertShow"
       transition="scale">
    <div class="popup"
         @click.stop=""
         :class="className">
      <div class="title"
           v-if="title">{{title}}
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="btn-group"
           v-if="btnList.length">
        <button v-for="btn in alertBtnList"
                :style="{width:btnWidth}"
                @click="btn.fn">{{btn.text}}
        </button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    hidePopup
  } from 'store/actions'

  export default{
    props: [
      'title',
      'alertShow',
      'btnList',
      'className'
    ],
    data () {
      return {
        addClass: ''
      }
    },
    vuex: {
      actions: {
        hidePopup
      }
    },
    created () {
    },
    ready () {
    },
    methods: {
    },
    computed: {
      alertBtnList () {
        const that = this
        const hidePopupFn = this.hidePopup
        let alertVal = []
        const val = this.btnList
        alertVal = val.map(ele => (
          Object.assign({}, ele, {
            fn () {
              if (ele.fn) {
                ele.fn.bind(that)()
              }
              if (!ele.notClose) {
                hidePopupFn()
              }
            }
          })
        ))
        return alertVal
      },
      btnWidth () {
        return `${100 / this.btnList.length}%`
      },
    }
  }
</script>

<style lang="scss"
       scoped>
  @import '../../scss/fragment';

  .box {
    @extend %full-screen;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 4;
    padding: 20px;
  }

  .popup {
    width: 100%;
    max-width: 400px;
    background-color: white;
    border-radius: $BORDER_RADIUS;
  }

  .title {
    padding: 15px 20px 10px;
    text-align: center;
    font-size: $TITLE_FONT_SIZE;
    font-weight: bold;
  }

  .scale {
    &-transition {
    }
    &-enter {
      animation: scaleIn .3s;
    }
    &-leave {
      animation: scaleOut .3s;
    }
    @at-root {
      @keyframes scaleIn {
        0% {
          transform: scale(0);
        }

        60% {
          transform: scale(1.1);
        }

        80% {
          transform: scale(1.1);
        }

        100% {
          transform: scale(1);
        }
      }

      @keyframes scaleOut {
        100% {
          transform: scale(0);
        }

        40% {
          transform: scale(1.1);
        }

        10% {
          transform: scale(1.1);
        }

        0% {
          transform: scale(1);
        }
      }
    }
  }

  .btn-group {
    height: 48px;
    display: flex;
    justify-content: space-between;
    position: relative;
    &::before {
      @extend %row-border;
      top: 0;
    }
  }

  button {
    float: left;
    flex: 1;
    &:active::after {
      @extend %active-drop
    }
  }

  .content {
    padding: 0 20px 20px;
    text-align: center;
    word-break: break-all;
    max-height: 300px;
    overflow: auto;
  }
  /*跳过运营商弹框样式*/
  .operatorBox{
    padding-bottom: 18px;
    .btn-group::before {
      border-bottom: none;
    }
    .operator {
      text-align: left;
    }
    button{
      margin: 0 5%;
      border-radius: 8px;
      background: $BORDER_MAIN_COLOR;
      color: $ELE_W_COLOR;
    }
  }
</style>
