<template>
  <div class="city"
       :class="{active:show}">
    <fixed-box :show="show">
      <div class="buttons">
        <div class="button hidden"
             @click="location"
             v-if="canLocation">定位
        </div>
        <div class="button"
             @click="close">完成
        </div>
      </div>
      <div class="loading"
           v-if="loading"
           transition="fade">
        <div>定位中...</div>
      </div>
      <div class="first-letter">
        <div v-for="l in letters"
             @click="setLetter(l)"
             :class="{selected:letter==l}">{{l}}
        </div>
      </div>
      <div class="city-content">
        <div class="city-indicator"></div>
        <div class="city-drop"
             @touchstart.stop.prevent="startMove"
             @touchmove.stop.prevent="onMove"
             @touchend.stop.prevent="stopMove"></div>
        <div class="selector"
             :style="{transform:'translateY(' + translateP + 'px)',transitionDuration:durationP}"
             @transitionEnd="transitionEnd">
          <div v-for="p in provinces"
               :class="{selected:(provinceCode == p[0]) && !speadP}"
               track-by="$index">{{p[1]}}
          </div>
        </div>
        <div class="selector"
             :style="{transform:'translateY(' + translateC + 'px)',transitionDuration:durationC}"
             v-if="cities.length != 1"
             @transitionEnd="transitionEnd">
          <div v-for="c in cities"
               :class="{selected:(cityCode == c[0]) && !speadC}"
               track-by="$index">{{c[1]}}
          </div>
        </div>
        <div class="selector"
             :style="{transform:'translateY(' + translateD + 'px)',transitionDuration:durationD}"
             v-if="districts.length > 0"
             @transitionEnd="transitionEnd">
          <div v-for="d in districts"
               :class="{selected:(districtCode == d[0]) && !speadD}"
               track-by="$index">{{d[1]}}
          </div>
        </div>
      </div>
    </fixed-box>
  </div>
</template>

<script type="text/ecmascript-6">
  import detail from 'tools/cityDetail'
  import cityList from 'tools/cityList'
  import fixedBox from '../basic/fixedBox'

  export default{
    props: [
      'show',
      'defaultCity',
      'twoLevel'
    ],
    data () {
      return {
        detail,
        cityList,
        letter: 'A-G',
        letters: ['A-G', 'H-K', 'L-S', 'T-Z'],
        provinceCode: '110000',
        cityCode: '110100',
        districtCode: '110101',
        provinceName: '北京',
        cityName: '北京',
        districtName: '东城区',
        moving: false,
        startY: 0,
        translateP: 0,
        translateC: 0,
        translateD: 0,
        speadP: 0,
        speadC: 0,
        speadD: 0,
        canLocation: false,
        lnglatXY: [0, 0],
        loading: false
      }
    },
    components: {
      fixedBox
    },
    computed: {
      durationP () {
        let time = Math.abs(this.speadP) * 100
        if (time > 500) {
          time = 500
        } else if (time < 100) {
          time = 100
        }
        return this.moving ? '0' : `${time}ms`
      },
      durationC () {
        let time = Math.abs(this.speadC) * 100
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
      },
      provinces () {
        return this.cityList[this.letter]
      },
      provinceIndex () {
        let i = 0
        this.provinces.forEach((e, index) => {
          if (e[0] === this.provinceCode) {
            i = index
          }
        })
        return i
      },
      cities () {
        return this.detail.filter(e => e[2] === this.provinceCode)
      },
      cityIndex () {
        let i = 0
        this.cities.forEach((e, index) => {
          if (e[0] === this.cityCode) {
            i = index
          }
        })
        return i
      },
      districts () {
        if (this.twoLevel) {
          return []
        }
        return this.detail.filter(e => e[2] === this.cityCode)
      },
      districtIndex () {
        let i = 0
        this.districts.forEach((e, index) => {
          if (e[0] === this.districtCode) {
            i = index
          }
        })
        return i
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
        if (this.twoLevel && this.cities.length === 1) {
          this.onMove2(y, 'P')
        } else if (this.districts.length === 0) {
          if (x < window.innerWidth / 2) {
            this.onMove2(y, 'P')
          } else {
            this.onMove2(y, 'C')
          }
        } else if (this.cities.length === 1) {
          if (x < window.innerWidth / 2) {
            this.onMove2(y, 'P')
          } else {
            this.onMove2(y, 'D')
          }
        } else if (x < window.innerWidth / 3) {
          this.onMove2(y, 'P')
        } else if (x > (window.innerWidth * 2) / 3) {
          this.onMove2(y, 'D')
        } else {
          this.onMove2(y, 'C')
        }
      },
      stopMove (e) {
        const x = e.changedTouches[0].pageX
        if (this.districts.length === 0) {
          if (x < window.innerWidth / 2) {
            this.stopMove2('P')
          } else {
            this.stopMove2('C')
          }
        } else if (this.cities.length === 1) {
          if (x < window.innerWidth / 2) {
            this.stopMove2('P')
          } else {
            this.stopMove2('D')
          }
        } else if (x < window.innerWidth / 3) {
          this.stopMove2('P')
        } else if (x > (window.innerWidth * 2) / 3) {
          this.stopMove2('D')
        } else {
          this.stopMove2('C')
        }
      },
      onMove2 (y, k) {
        this.moving = true
        const spead = y - this.startY
        this[`translate${k}`] += spead * 1.2
        this.startY = y
        this[`spead${k}`] = spead
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
      setCodeAndName (translate, baseArray, toSetCode, toSetName) {
        if (baseArray.length) {
          let index = parseInt((100 - translate) / 40, 10)
          const length = baseArray.length
          if (index > length - 1) {
            index = length - 1
          } else if (index < 0) {
            index = 0
          }
          this[toSetCode] = baseArray[index][0]
          this[toSetName] = baseArray[index][1]
        }
      },
      computeTranlate (defaultCity) {
        this.setCodeAndName(
          this.translateP,
          this.provinces,
          'provinceCode', 'provinceName'
        )
        this.setCodeAndName(
          this.translateC,
          this.cities,
          'cityCode', 'cityName'
        )
        this.setCodeAndName(
          this.translateD,
          this.districts,
          'districtCode', 'districtName'
        )

        if (defaultCity) {
          this.provinceCode = defaultCity.p ? defaultCity.p.code : ''
          this.cityCode = defaultCity.c ? defaultCity.c.code : ''
          this.districtCode = defaultCity.d ? defaultCity.d.code : ''
          this.provinceName = defaultCity.p ? defaultCity.p.name : ''
          this.cityName = defaultCity.c ? defaultCity.c.name : ''
          this.districtName = defaultCity.d ? defaultCity.d.name : ''
          this.letter = this.getLetter(
            defaultCity.c ? defaultCity.c.code : ''
          )
        }

        this.translateP = (this.provinceIndex * -40) + 80
        this.translateC = (this.cityIndex * -40) + 80
        this.translateD = (this.districtIndex * -40) + 80
        let result = {}
        if (this.twoLevel) {
          result = {
            p: {
              code: this.provinceCode,
              name: this.provinceName
            },
            c: {
              code: this.cityCode,
              name: this.cityName
            }
          }
        } else {
          result = {
            p: {
              code: this.provinceCode,
              name: this.provinceName
            },
            c: {
              code: this.cityCode,
              name: this.cityName
            },
            d: {
              code: this.districtCode,
              name: this.districtName
            }
          }
        }
        if (result.p && typeof result.p.name === 'object') {
          result.p.name = result.p.name[0]
        }
        if (result.c && typeof result.c.name === 'object') {
          result.c.name = result.c.name[0]
        }
        if (result.d && typeof result.d.name === 'object') {
          result.d.name = result.d.name[0]
        }
        this.$dispatch('set-city', result)
      },
      location () {
        this.loading = true
        navigator.geolocation
          .getCurrentPosition(({ coords: { latitude, longitude } }) => {
            this.lnglatXY = [longitude, latitude]
            this.regeocoder()
          })
      },
      regeocoder () {
        const self = this
        /* global AMap b:true */
        const geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: 'all'
        })
        geocoder.getAddress(self.lnglatXY, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            self.geocoderCallBack(result)
          }
          this.loading = false
        })
      },
      geocoderCallBack (data) {
        const adcode = data.regeocode.addressComponent.adcode
        this.provinceCode = `${adcode.slice(0, 2)}0000`
        this.cityCode = `${adcode.slice(0, 4)}00`
        this.districtCode = adcode
        this.computeTranlate({
          p: {
            name: data.regeocode.addressComponent.province,
            code: this.provinceCode
          },
          c: {
            name: data.regeocode.addressComponent.city,
            code: this.cityCode
          },
          d: {
            name: data.regeocode.addressComponent.district,
            code: this.districtCode
          }
        })
      },
      setLetter (letter) {
        this.letter = letter
        this.computeTranlate()
      },
      getLetter (cityCode) {
        let letter = 'A-G'
        if (this.cityList['H-K'].some(e => e[0] === cityCode)) {
          letter = 'H-K'
        } else if (this.cityList['L-S'].some(e => e[0] === cityCode)) {
          letter = 'L-S'
        } else if (this.cityList['T-Z'].some(e => e[0] === cityCode)) {
          letter = 'T-Z'
        }
        return letter
      },
      transitionEnd () {
        this.speadP = 0
        this.speadC = 0
        this.speadD = 0
      }
    },
    created () {
      this.computeTranlate(this.defaultCity)
      this.canLocation = !!navigator.geolocation
    }
  }
</script>

<style lang="scss"
       scoped>
  @import '../../scss/function';

  .city {
    @include selector-button-bar("../../assets/location.svg", 16px);

    &-drop {
      @include selector-drop(82px);
    }
    &-content {
      @include selector-content(202px);
    }
    &-indicator {
      @include selector-indicator(80px);
    }
    .selected {
      font-weight: 600;
    }
    .first-letter {
      display: flex;
      justify-content: space-around;
      div {
        line-height: 30px;
        text-align: center;
        flex: 1;
        margin: 5px;
        color: $MAIN_TEXT_COLOR;
      }
      .selected {
        background-color: $BODY_COLOR;
      }
    }
    .loading {
      background: $BACKDROP_COLOR;
      position: absolute;
      top: 38px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 3;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
  }

  .active .selector {
    will-change: transform;
  }

  .hidden {
    z-index: -1;
  }
</style>
