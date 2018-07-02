<template>
  <ele :hide="hide">
    <div class="city-list">
      <div class="title">{{text}}</div>
      <div class="city2-list">
        <div class="city2-ele">
          <div v-for="city in detailFilter"
               track-by="$index"
               v-if="city[2] == lastCode"
               :class="{'selected': city[0] == thisCode, 'qx': isQx}"
               @click="fn(city[1][0], city[0])">
            {{city[1][0]}}
          </div>
        </div>
      </div>
    </div>
  </ele>
</template>

<script type="text/ecmascript-6">
  import detail from 'tools/cityDetail'

  export default{
    props: [
      'hide',
      'lastCode',
      'thisCode',
      'isQx',
      'text',
      'fn'
    ],
    data () {
      return {
        detail
      }
    },
    computed: {
      detailFilter () {
        const code = this.lastCode
        return this.detail
          .filter(e => e[2] === parseInt(code, 10) || code.toString())
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
</style>
