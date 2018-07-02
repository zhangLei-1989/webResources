<template>
  <div>
    <ele :more="">
      <div slot="left">出借人</div>
      <div>
        <img class="user-icon"
             v-bind:src="imgSrc">
        <span style="position: relative;top: -10px;">{{name}}</span>
      </div>
    </ele>
    <ele>
      <div slot="left">出借金额</div>
      <div>{{money}}</div>
    </ele>
    <ele>
      <div slot="left">出借时间</div>
      <div>{{time}}</div>
    </ele>
    <ele>
      <div slot="left">出借方式</div>
      <div>{{payWay}}</div>
    </ele>
    <div class="tip">
      查看借款详情
    </div>
    <group>
      <div class="btn-box">
        <btn :cut="2"
             :disabled="true"
             :text="'未收到还款'"></btn>
        <btn :cut="2"
             :next="true"
             :text="'确认已收到还款'"></btn>
      </div>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        name: '庞敬聪',
        money: '2000',
        time: '2016-07-20',
        payWay: '支付宝',
        imgSrc: 'http://7xnw4h.com1.z0.glb.clouddn.com/com644'
      }
    },
    methods: {},
    components: {}
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/function';

  .tip {
    text-align: right;
    line-height: 50px;
    padding: 0 10px;
    font-size: $TIP_FONT_SIZE;
  }

  .user-icon {
    width: 40px;
    height: 40px;
    margin-top: 5px;
    border-radius: 100%;
  }

  /*.group {*/
  /**/
  /*}*/
  .btn-box {
    position: fixed;
    display: inline-flex;
    bottom: 10px;
    width: 100%;
  }

  button {
    margin: 5px;
  }
</style>
