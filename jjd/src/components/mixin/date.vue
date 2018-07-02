<template>
  <div class="date"
       :class="{active:show}">
    <fixed-box :show="show">
      <div class="buttons">
        <div class="button"
             @click="today">今天
        </div>
        <div class="button"
             @click="close">完成
        </div>
      </div>
      <div class="date-content">
        <div class="date-indicator"></div>
        <div class="date-drop"
             @touchstart.stop.prevent="startMove"
             @touchmove.stop.prevent="onMove"
             @touchend.stop.prevent="stopMove"></div>
        <div class="selector"
             :style="{transform:'translateY(' + translateY + 'px)',transitionDuration:durationY}"
             @transitionEnd="transitionEnd">
          <div v-for="y in 30"
               :class="{selected:(currentYear == 2000 + y) && !speadY}">{{2000 + y}}年
          </div>
        </div>
        <div class="selector"
             :style="{transform:'translateY(' + translateM + 'px)',transitionDuration:durationM}"
             @transitionEnd="transitionEnd">
          <div v-for="m in 12"
               :class="{selected:(currentMonth == m + 1) && !speadM}">{{m + 1}}月
          </div>
        </div>
        <div class="selector"
             :style="{transform:'translateY(' + translateD + 'px)',transitionDuration:durationD}"
             @transitionEnd="transitionEnd">
          <div v-for="d in days"
               :class="{selected:(currentDay == d + 1) && speadD == 0}">{{d + 1}}日
          </div>
        </div>
      </div>
    </fixed-box>
  </div>
</template>

<script type="text/ecmascript-6">
  import fixedBox from '../basic/fixedBox'

  export default{
    props: [
      'show',
      'defaultDate',
      'min',
      'max'
    ],
    data () {
      return {
        currentYear: 2000,
        currentMonth: 1,
        currentDay: 1,
        moving: false,
        startY: 0,
        translateY: 0,
        translateM: 0,
        translateD: 0,
        speadY: 0,
        speadM: 0,
        speadD: 0
      }
    },
    components: {
      fixedBox
    },
    computed: {
      minSecond () {
        if (this.min) {
          const m = this.min.split('-')
          const d = new Date(m[0], parseInt(m[1], 10) - 1, m[2])
          return d.getTime()
        }
        return 0
      },
      maxSecond () {
        if (this.max) {
          const m = this.max.split('-')
          const d = new Date(m[0], parseInt(m[1], 10) - 1, m[2])
          return d.getTime()
        }
        return 1893369600000
      },
      days () {
        const month = parseInt(this.currentMonth, 10)
        const d = new Date(this.currentYear, month, 0)
        return d.getDate()
      },
      durationY () {
        let time = Math.abs(this.speadY) * 100
        if (time > 500) {
          time = 500
        } else if (time < 100) {
          time = 100
        }
        return this.moving ? '0' : `${time}ms`
      },
      durationM () {
        let time = Math.abs(this.speadM) * 100
        if (time > 500) {
          time = 500
        } else if (time < 100) {
          time = 100
        }
        return this.moving ? '0' : `${time}ms`
      },
      durationD () {
        let time = Math.abs(this.speadD) * 100
        if (time > 500) {
          time = 500
        } else if (time < 100) {
          time = 100
        }
        return this.moving ? '0' : `${time}ms`
      }
    },
    methods: {
      close () {
        this.show = false
      },
      startMove (e) {
        this.moving = true
        this.startY = e.changedTouches[0].pageY
      },
      onMove (e) {
        const { pageX: x, pageY: y } = e.changedTouches[0]
        if (x < window.innerWidth / 3) {
          this.onMove2(y, 'Y')
        } else if (x > window.innerWidth * 2 / 3) {
          this.onMove2(y, 'D')
        } else {
          this.onMove2(y, 'M')
        }
      },
      stopMove (e) {
        const x = e.changedTouches[0].pageX
        if (x < window.innerWidth / 3) {
          this.stopMove2('Y')
        } else if (x > window.innerWidth * (2 / 3)) {
          this.stopMove2('D')
        } else {
          this.stopMove2('M')
        }
      },
      stopMove2 (k) {
        if (this[`spead${k}`] > 4) {
          this[`translate${k}`] += 160
        } else if (this[`spead${k}`] < -4) {
          this[`translate${k}`] -= 160
        }
        this.moving = false
        this.computeTranlate()
      },
      onMove2 (y, k) {
        this.moving = true
        const spead = y - this.startY
        this[`translate${k}`] += spead * 1.2
        this.startY = y
        this[`spead${k}`] = spead
      },
      computeTranlate (defaultDate) {
        let year = parseInt(2002 - ((this.translateY - 40) / 40), 10)
        if (year > 2029) {
          year = 2029
        } else if (year < 2000) {
          year = 2000
        }

        let month = parseInt(3 - ((this.translateM - 40) / 40), 10)
        if (month > 12) {
          month = 12
        } else if (month < 1) {
          month = 1
        }

        let day = parseInt((3 - ((this.translateD - 40) / 40)), 10)
        if (day > this.days) {
          day = this.days
        } else if (day < 1) {
          day = 1
        }
        const tempSecond = new Date(year, month - 1, day).getTime()
        if (defaultDate) {
          this.currentYear = defaultDate.y
          this.currentMonth = defaultDate.m
          this.currentDay = defaultDate.d
        } else if (tempSecond >= this.minSecond &&
          tempSecond <= this.maxSecond) {
          this.currentYear = year
          this.currentMonth = month
          this.currentDay = day
        } else if (tempSecond < this.minSecond) {
          const minDate = new Date(this.minSecond)
          this.currentYear = minDate.getFullYear()
          this.currentMonth = minDate.getMonth() + 1
          this.currentDay = minDate.getDate()
        } else if (tempSecond > this.maxSecond) {
          const minDate = new Date(this.maxSecond)
          this.currentYear = minDate.getFullYear()
          this.currentMonth = minDate.getMonth() + 1
          this.currentDay = minDate.getDate()
        }
        this.translateY = ((this.currentYear - 2002) * -40) + 20
        this.translateM = ((this.currentMonth - 3) * -40) + 20
        this.translateD = ((this.currentDay - 3) * -40) + 20
        this.$dispatch('set-date', {
          y: this.currentYear,
          m: parseInt(this.currentMonth, 10) < 10 ?
            `0${parseInt(this.currentMonth, 10)}` : this.currentMonth,
          d: parseInt(this.currentDay, 10) < 10 ?
            `0${parseInt(this.currentDay, 10)}` : this.currentDay
        })
      },
      today () {
        const today = new Date()
        this.computeTranlate({
          y: today.getFullYear(),
          m: today.getMonth() + 1,
          d: today.getDate()
        })
      },
      transitionEnd () {
        this.speadY = 0
        this.speadM = 0
        this.speadD = 0
      }
    },
    created () {
      this.computeTranlate(this.defaultDate)
    }
  }
</script>

<style lang="scss"
       scoped>
  @import '../../scss/function';

  .date {
    @include selector-button-bar("../../assets/today.svg", 17px);

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
