<template>
  <div>
    <ele :class="{minline: min, normal: normal}"
         @click="toggleShowEle">
      <!--style="min-height: 30px"-->
      <div slot="left"
           class="title" v-if="!normal">
        <img class="icon"
             :src="imgSrc"
             v-show="imgShow" >
        <div>{{text}}</div>
      </div>
      <div slot="left" v-if="normal" class="tip-box">
        <span>{{text}}</span>
        <span class="tip-alert2" @click.stop.prevent="tipAlert"></span>
      </div>
      <div slot="right">
        <img v-bind:class="['arrow', showEle ? 'trans' : '']"
             src="../../assets/more.svg">
      </div>
    </ele>
    <ele class="box">
      <div v-show="showEle">
        <slot></slot>
      </div>
    </ele>
  </div>
</template>
<script type="text/ecmascript-6">
  import {
    alert,
  } from 'tools/utils'

  export default {
    props: {
      text: {
        default: '数据源'
      },
      imgSrc: {
        default: require('../../assets/dataSource.svg')
      },
      imgShow: {
        default: true
      },
      showEle: {
        default: true
      },
      min: {
        default: true
      },
      normal: {
        default: false
      },
      alertText: {
        defaule: ''
      }
    },
    data () {
      return {
//                showEle: true
      }
    },
    methods: {
      toggleShowEle () {
        this.showEle = !this.showEle
//                this.$dispatch('toggle', true)
      },
      tipAlert () {
        alert(this.alertText)
      }
//            ,
//            touchStopPrenent () {
//                this.$dispatch('toggle', false)
//            }
    },
    components: {},
    events: {
      toggleAll (e) {
        this.showEle = e
      }
    }
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/fragment';

  .title {
    @extend %title;
  }

  .arrow {
    @extend %title-icon;
    width: 15px;
    transition: .2s;
    transform: rotate(90deg);
  }

  .trans {
    transform: rotate(270deg);
  }

  .row [slot=right] {
    flex: none;
  }

  :first-child.row {
    width: 100% !important;
    /*border-bottom: 1px solid $BORDER_COLOR !important;
    ::after{
        transform: scaleY(0.5) !important;
    }*/
  }

  .minline {
    min-height: 40px !important;
    background: $Q_COLOR;
    font-size: $TIP_FONT_SIZE;
    img {
      width: 10px;
    }
  }

  .box {
    padding: 0;
    min-height: 0;
    > div {
      flex: 1;
    }
  }
  .normal{
    font-size: $TIP_FONT_SIZE;
  }
  .tip-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row !important;
    .tip-alert2 {
      width: 24px;
      height: 30px;
      background: url("../../assets/info.svg") center no-repeat {
        size: 12px;
      }
    }
  }
</style>
