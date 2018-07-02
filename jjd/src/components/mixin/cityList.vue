<template>
  <div class="box">
    <group :fixed="true">
      <btn :cut="1"
           :next="true"
           :text="'选好了'"
           :btn-fn="ok"></btn>
    </group>
    <group :first="true">
      <ele>
        <div class="city-list">
          <div class="title">请选择省份（按首字母检索；部分手机首次点击后需请稍作等待）</div>
          <div class="city1-list">
            <div v-for="(key, val) in cityList"
                 track-by="$index"
                 class="city1-ele"
                 @click="setCity1(key)"
                 :class="{'selected': key == city1}">
              <div>
                {{key}}
              </div>
            </div>
          </div>
        </div>
      </ele>
      <ele>
        <div class="city-list">
          <div class="city2-list">
            <div v-for="(key, citys) in cityList"
                 track-by="$index"
                 class="city2-ele"
                 v-if="key == city1">
              <div v-for="city in citys"
                   track-by="$index"
                   @click="setCity2(city[1][0], city[0])"
                   :class="{'selected': city[1][0] == city2}">{{city[1][0]}}
              </div>
            </div>
          </div>
        </div>
      </ele>
      <city-list-ele :hide="!city2 || hideCity"
                     :last-code="code1"
                     :this-code="code2"
                     :is-qx="false"
                     :text="'请选择城市'"
                     :fn="setCity3"
                     keep-alive></city-list-ele>
      <city-list-ele :hide="!code2 || hideQx"
                     :last-code="code2"
                     :this-code="code3"
                     :is-qx="true"
                     :text="'请选择区县'"
                     :fn="setCity4"
                     keep-alive></city-list-ele>
      <ele :hide="!roads.length">
        <div class="city-list">
          <div class="title">请选择街道</div>
          <div class="roads">
            <div v-for="road in roads"
                 track-by="$index"
                 class="road"
                 :class="{'selected': road[0] == code4}"
                 @click="setRoad(road[1], road[0])">
              {{road[1]}}
            </div>
          </div>
        </div>
      </ele>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import cityList from 'tools/cityList'
  import { ajaxJsonp } from 'tools/utils'
  import cityListEle from '../basic/cityListEle'

  export default{
    data () {
      return {
        cityList,
        city1: 'A-G',
        city2: '',
        city3: '',
        city4: '',
        code1: '',
        code2: '',
        code3: '',
        roads: [],
        road: '',
        code4: '',
        hideCity: false,
        hideQx: false
      }
    },
    components: {
      cityListEle
    },
    methods: {
      setCity1 (city1) {
        if (city1 !== this.city1) {
          this.city1 = city1
          this.city2 = ''
          this.code1 = ''
          this.city3 = ''
          this.code2 = ''
          this.city4 = ''
          this.code3 = ''
          this.road = ''
          this.roads = []
          this.code4 = ''
        }
      },
      setCity2 (city2, code1) {
        if (city2 !== this.city2) {
          this.city2 = city2
          this.code1 = code1
          this.city3 = ''
          this.code2 = ''
          this.city4 = ''
          this.code3 = ''
          this.road = ''
          this.roads = []
          this.code4 = ''
          if (code1 === '110000' ||
            code1 === '500000' ||
            code1 === '310000' ||
            code1 === '120000') {
            this.hideCity = true
            this.setCity3('', (parseInt(code1, 10) + 100))
          } else {
            this.hideCity = false
          }
        }
      },
      setCity3 (city3, code2) {
        if (city3 !== this.city3 || !city3) {
          this.city3 = city3
          this.code2 = code2
          this.city4 = ''
          this.code3 = ''
          this.road = ''
          this.roads = []
          this.code4 = ''
          this.$nextTick(() => {
            const qxNum = document.getElementsByClassName('qx').length
            if (qxNum === 0) {
              this.hideQx = true
              this.getAddress()
            } else {
              this.hideQx = false
            }
          })
        }
      },
      setCity4 (city4, code3) {
        if (city4 !== this.city4) {
          this.city4 = city4
          this.code3 = code3
          this.road = ''
          this.roads = []
          this.code4 = ''
          this.getAddress()
        }
      },
      setRoad (road, code4) {
        this.road = road
        this.code4 = code4
      },
      getAddress () {
        const param = {}
        param.l1 = this.code1
        param.l2 = this.code2
        param.l3 = this.code3
        param.lang = 'zh-S'
        ajaxJsonp(
          'https://lsp.wuliu.taobao.com/locationservice' +
          '/addr/output_address_town_array.do',
          param
        ).then((json) => {
          this.roads = json.result
        })
      },
      ok () {
        this.$dispatch('set-address', {
          p: {
            name: this.city2,
            code: this.code1
          },
          c: {
            name: this.city3,
            code: this.code2
          },
          d: {
            name: this.city4,
            code: this.code3
          },
          r: this.road
        })
      }
    }
  }
</script>

<style lang="scss"
       scoped>
  @import '../../scss/const';

  .city-list {
    width: 100%;
  }

  .city1-list,
  .city2-list {
    display: flex;
  }

  .city2-list {
    width: 100%
  }

  .city1-ele,
  .city2-ele {
    flex: 0 1 25%;
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 100%;
      text-align: center;
      padding: 10px 5px;
      transition: .2s;
    }
  }

  .city2-ele {
    flex: 0 1 100%;
    > div {
      flex-basis: 25%;
      width: auto;
    }
  }

  .selected {
    background-color: $MAIN_COLOR;
    color: white;
  }

  .title {
    padding: 10px 0;
  }

  .road {
    padding: 10px;
    min-width: 33.33%;
    transition: .2s;
    float: left;
  }

  .box {
    background-color: white;
  }

  .last::after {
    display: none !important;
  }

  .row {
    padding: 10px !important;
  }
</style>
