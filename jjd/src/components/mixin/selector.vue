<template>
  <div class="selector"
       :class="{active:show}">
    <fixed-box :show="show">
      <div class="buttons">
        <div class="button"
             @click="reset">重置
        </div>
        <div class="button"
             @click="close">完成
        </div>
      </div>
      <div class="selector-content">
        <div class="selector-indicator"></div>
        <div class="selector-drop"
             @touchstart.stop.prevent="startMove"
             @touchmove.stop.prevent="onMove"
             @touchend.stop.prevent="stopMove"></div>
        <div class="selector"
             :style="{transform:'translateY(' + translate + 'px)',transitionDuration:duration}"
             @transitionEnd="transitionEnd">
          <div v-for="ele in valueList"
               :class="{selected:(ele == currentValue) && !spead}">{{getText(ele)}}
          </div>
        </div>
      </div>
    </fixed-box>
  </div>
</template>

<script type="text/ecmascript-6">
  import fixedBox from '../basic/fixedBox'

  export default{
    props: {
      show: {},
      defaultData: {
        default: ''
      },
      valueList: {
        default () {
          return []
        }
      }
    },
    data () {
      return {
        currentValue: '',
        moving: false,
        startY: 0,
        translate: 0,
        spead: 0
      }
    },
    components: {
      fixedBox
    },
    computed: {
      duration () {
        let time = Math.abs(this.spead) * 100
        if (time > 500) {
          time = 500
        } else if (time < 100) {
          time = 100
        }
        return this.moving ? '0' : `${time}ms`
      },
      index () {
        let i = 0
        this.valueList.forEach((e, index) => {
          if (e === this.currentValue) {
            i = index
          }
        })
        return i
      }
    },
    methods: {
      getText (e) {
        if (typeof e === 'string') {
          return e
        } else if (typeof e === 'object') {
          return e.text
        }
        return ''
      },
      close () {
        this.computeTranlate()
        this.$dispatch('set-data', this.currentValue)
        this.show = false
      },
      startMove (e) {
        this.moving = true
        this.startY = e.changedTouches[0].pageY
      },
      onMove (e) {
        const y = e.changedTouches[0].pageY
        this.onMove2(y)
      },
      stopMove () {
        this.stopMove2()
      },
      stopMove2 () {
        if (this.spead > 4) {
          this.translate += 160
        } else if (this.spead < -4) {
          this.translate -= 160
        }
        this.moving = false
        this.computeTranlate()
      },
      onMove2 (y) {
        this.moving = true
        const spead = y - this.startY
        this.translate += spead * 1.2
        this.startY = y
        this.spead = spead
      },
      computeTranlate (defaultData) {
        let index = parseInt((120 - this.translate) / 40, 10)
        const length = this.valueList.length
        if (index > length - 1) {
          index = length - 1
        } else if (index < 0) {
          index = 0
        }
        this.currentValue = defaultData || this.valueList[index]
        this.translate = (this.index * -40) + 100
        if (this.show) {
          this.$dispatch('set-data', this.currentValue)
        }
      },
      reset () {
        this.computeTranlate(this.valueList[0])
      },
      transitionEnd () {
        this.spead = 0
      }
    },
    created () {
      this.computeTranlate(this.defaultData)
    }
  }
</script>

<style lang="scss"
       scoped>
  @import '../../scss/function';

  .selector {
    @include selector-button-bar("../../assets/reset.svg", 17px);

    &-drop {
      @include selector-drop(102px);
    }
    &-content {
      @include selector-content(242px);
    }
    &-indicator {
      @include selector-indicator(100px);
    }
    .selected {
      font-weight: 600;
    }
  }

  .active .selector {
    will-change: transform;
  }
</style>
