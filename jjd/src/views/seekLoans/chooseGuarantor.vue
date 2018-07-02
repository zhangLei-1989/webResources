<template>
  <div>
    <group :fixed="true">
      <btn :cut="1"
           :next="true"
           :btn-fn="next"></btn>
    </group>
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
      <ele v-for="record in realList| filterBy filter">
        <div class="checkbox"
             @click.stop="choose(record)">
          <div :class="{chosen: guarantor == record}"></div>
          <div class="box">
            <div class="desc">
              <div class="user-icon"
                   :style="{backgroundImage: 'url(' + record.c_head + ')'}"></div>
              <div>{{record.c_name}}</div>
            </div>
            <div>{{getAmountUnit(record.n_amt - record.n_used_amt)}}</div>
            <div>{{getAmountUnit(record.n_user_guarantee_amt)}}</div>
            <div>{{getAmountUnit(record.n_to_repay_amt)}}</div>
          </div>
        </div>
      </ele>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import { setTempInfo } from 'store/actions'

  export default{
    vuex: {
      getters: {
        userId: state => state.userInfo.userId,
        tempGuarantorList: state => state.temp.guarantorList
      },
      actions: { setTempInfo }
    },
    data () {
      return {
        guarantorList: [],
        guarantor: {},
        guaranteeAmt: 0
      }
    },
    components: {},
    methods: {
      choose (e) {
        if (this.guarantor === e) {
          this.guarantor = ''
          this.guaranteeAmt = 0
        } else {
          this.guarantor = e
          this.guaranteeAmt = e.n_amt - e.n_used_amt
        }
      },
      next () {
        window.history.back()
      },
      getAmountUnit (e) {
        if (e >= 10000) {
          return `${(e / 10000).toFixed(1)}万`
        }
        return e
      }
    },
    computed: {
      realList () {
        return this.guarantorList.filter((e) => {
          if ((e.n_amt - e.n_used_amt) > 0) {
            return e.c_id !== this.userId
          }
          return false
        })
      }
    },
    created () {
      // 应用表单缓存
      this.guarantorList = this.tempGuarantorList
      Object.assign(this.$data, this.tempGuarantorList)
      if (Object.keys(this.tempGuarantorList).length < 1) {
        window.history.back()
        return
      }
    },
    route: {
      deactivate ({ next }) {
        // 缓存表单
        this.setTempInfo({ guarantorList: this.$data })
        next()
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
    padding-left: 32px;
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

  .checkbox {
    @extend %radio-box;
  }
</style>
