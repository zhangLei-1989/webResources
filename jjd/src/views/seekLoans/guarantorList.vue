<template>
  <div>
    <group>
      <div slot="tip_top"
           class="tip">
        <ele>
          <div class="box">
            <div class="desc">担保人</div>
            <div>此单担保</div>
            <div>正在担保</div>
            <div>待还</div>
          </div>
        </ele>
      </div>
      <ele v-for="record in guarantorList">
        <div class="box">
          <div class="desc">
            <div class="user-icon"
                 :style="{backgroundImage: 'url(' + record.c_head + ')'}"></div>
            <div>{{record.c_name}}</div>
          </div>
          <div>{{record.n_guarantee_amt}}元</div>
          <div>{{record.n_guarantee_total_amt}}万元</div>
          <div>{{record.n_to_repay_total_amt}}元</div>
        </div>
      </ele>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    vuex: {
      getters: {
        tempGuarantorList: state => state.temp.guarantorList
      }
    },
    data () {
      return {
        guarantorList: [
          {
            c_id: '123',
            c_name: '庞敬聪',
            c_head: 'http://7xnw4h.com1.z0.glb.clouddn.com/com644',
            n_guarantee_amt: '2000',
            n_guarantee_total_amt: '5',
            n_to_repay_total_amt: '200'
          }
        ]
      }
    },
    components: {},
    methods: {},
    computed: {},
    created () {
      // 应用表单缓存
      Object.assign(this.$data, this.tempGuarantorList)
      if (Object.keys(this.tempGuarantorList).length < 1) {
        window.history.back()
        return
      }
    }
  }

</script>
<style lang="scss"
       scoped>
  @import '../../scss/function';

  .user {
    display: flex;
    align-items: center;
    position: relative;
    &-icon {
      @include user-icon(40px);
      margin-right: 10px;
    }
  }

  .box {
    flex: 1;
    display: flex;
    .desc {
      flex: 2;
      display: flex;
      color: $MAIN_TEXT_COLOR;
    }
    > div {
      flex: 1;
      line-height: 40px;
      text-align: center;
      font-size: $TIP_FONT_SIZE;
      color: $TIP_COLOR;
    }
    > div:last-child {
      text-align: right;
    }
  }

  .tip .box {
    > div {
      line-height: 1;
      font-size: $MIN_FONT_SIZE;
    }
    .desc {
      color: $TIP_COLOR;
      &::before {
        content: "";
        display: inline-block;
        width: 50px;
      }
    }
  }
</style>
