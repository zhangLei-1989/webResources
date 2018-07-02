<template>
  <div class="head">
    <ele :no-line="true"
         :transparent="true">
      <div class="content total">
        <slot name="top"></slot>
      </div>
    </ele>
    <ele class="detail"
         :no-line="true"
         :transparent="true">
      <div class="con-lef">
        <slot name="left"></slot>
      </div>
      <div class="con-rig">
        <slot name="right"></slot>
      </div>
    </ele>
  </div>
</template>

<script type="text/ecmascript-6">
  import ele from '../mixin/ele'

  export default{
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {}
    },
    components: {
      ele
    },
    computed: {},
    methods: {},
    route: {},
    created () {
    },
    attached () {
    }
  }
</script>

<style lang="scss"
       scoped>
  @import '../../scss/const';

  .content {
    flex: 1;
    text-align: center;
  }

  .head {
    background-color: $MAIN_COLOR;
    color: white;
    .row::before {
      display: none;
    }
  }

  .total {
    height: 80px;
    padding: 20px;
    line-height: 30px;
  }

  .detail {
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 60px;
    text-align: center;
  }

  .con-lef {
    width: 50%;
    text-align: center;
  }

  .con-rig {
    width: 50%;
    text-align: center;
  }
</style>
