<template>
  <div style="text-align: center;">
    <group>
      <columns class="tip"
               :cut="1"
               v-text="'要完善以下信息，才能申请借款哦'"></columns>
      <ele :more="true">
        <div class="img">
          <img src="../../assets/bankCredit.svg"/>
        </div>
        <div solt="left"
             class="left-txt">人行征信
        </div>
        <div solt="right"
             class="right-txt"><span>更新于</span>2016-07-18
        </div>
      </ele>
      <ele :more="true">
        <div class="img">
          <img src="../../assets/car.svg"/>
        </div>
        <div solt="left"
             class="left-txt">车产
        </div>
        <div solt="right"
             class="right-txt">尚未完善
        </div>
      </ele>
      <ele :more="true">
        <div class="img">
          <img src="../../assets/house.svg"/>
        </div>
        <div solt="left"
             class="left-txt">房产
        </div>
        <div solt="right"
             class="right-txt">尚未完善
        </div>
      </ele>
    </group>
    <btn :cut="1"
         :disabled="true"
         :text="'确认提交'"></btn>
  </div>
</template>
<script type="text/ecmascript-6">
  import columns from 'components/mixin/columns'

  export default {
    data () {
      return {}
    },
    methods: {},
    components: {
      columns
    }
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/fragment';

  .tip {
    flex-direction: row;
    color: $TIP_COLOR;
    width: auto;
  }

  .img {
    height: 25px;
    width: 25px;
  }

  .left-txt {
    position: absolute;
    left: 50px;
    line-height: 50px
  }

  .right-txt {
    color: $TIP_COLOR;
  }
</style>
