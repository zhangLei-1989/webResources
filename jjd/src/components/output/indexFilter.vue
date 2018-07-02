<template>
  <div class="index-filter"
       v-show="show"
       transition="slide-in">
    <div class="fixed">
      <ele>
        <div>
          <button @click="reset">重置</button>
          <button @click="save">保存设置</button>
          <button @click="filter">确认筛选</button>
        </div>
      </ele>
    </div>
    <div class="list">
      <div>借款额度(元)</div>
      <div class="content">
        <input growing-track="true"
               placeholder="--"
               v-model="minAmount">
        <span>至</span>
        <input growing-track="true"
               placeholder="--"
               v-model="maxAmount">
      </div>
    </div>
    <div class="list">
      <div>借款时常(天)</div>
      <div class="content">
        <input growing-track="true"
               placeholder="--"
               v-model="minLength">
        <span>至</span>
        <input growing-track="true"
               placeholder="--"
               v-model="maxLength">
      </div>
    </div>
    <div class="list">
      <div>年利率(%)</div>
      <div class="content">
        <input growing-track="true"
               placeholder="--"
               v-model="minRate">
        <span>至</span>
        <input growing-track="true"
               placeholder="--"
               v-model="maxRate">
      </div>
    </div>
    <div class="list">
      <div>服务费(元)</div>
      <div class="content">
        <input growing-track="true"
               placeholder="--"
               v-model="minFee">
        <span>至</span>
        <input growing-track="true"
               placeholder="--"
               v-model="maxFee">
      </div>
    </div>
    <div class="list">
      <div>担保费率(%)</div>
      <div class="content">
        <input growing-track="true"
               placeholder="--"
               v-model="minGuaranteeFee">
        <span>至</span>
        <input growing-track="true"
               placeholder="--"
               v-model="maxGuaranteeFee">
      </div>
    </div>
    <div class="list">
      <div>还款方式</div>
      <div class="content">
        <div @click="chooseRepayType('0')"
             :class="{chosen: repayType == '0'}">全部
        </div>
        <div @click="chooseRepayType('1')"
             :class="{chosen: repayType == '1'}">等额本息
        </div>
        <div @click="chooseRepayType('2')"
             :class="{chosen: repayType == '2'}">到期还本付息
        </div>
      </div>
    </div>
    <div class="list last">
      <div>排列顺序</div>
      <div class="content">
        <div @click="chooseFilterOrder('0')"
             :class="{chosen: filterOrder == '0'}">默认排序
        </div>
        <div @click="chooseFilterOrder('1')"
             :class="{chosen: filterOrder == '1'}">年利率从高到低
        </div>
      </div>
      <div class="content">
        <div @click="chooseFilterOrder('2')"
             :class="{chosen: filterOrder == '2'}">服务费从高到低
        </div>
        <div @click="chooseFilterOrder('3')"
             :class="{chosen: filterOrder == '3'}">担保费率从高到低
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ele from 'components/mixin/ele'

  export default{
    props: [
      'show'
    ],
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        filterOrder: '0',
        repayType: '0',
        minAmount: '',
        maxAmount: '',
        minLength: '',
        maxLength: '',
        minRate: '',
        maxTate: '',
        minFee: '',
        maxFee: '',
        minGuaranteeRate: '',
        maxGuaranteeRate: ''
      }
    },
    components: {
      ele
    },
    computed: {},
    methods: {
      reset () {
        this.filterOrder = '0'
        this.repayType = '0'
        this.minAmount = ''
        this.maxAmount = ''
        this.minLength = ''
        this.maxLength = ''
        this.minRate = ''
        this.maxTate = ''
        this.minFee = ''
        this.maxFee = ''
        this.minGuaranteeRate = ''
        this.maxGuaranteeRate = ''
      },
      save () {
        window.console.log('save')
      },
      filter () {
        this.$dispatch('filter', this.$data)
      },
      chooseRepayType (e) {
        this.repayType = e
      },
      chooseFilterOrder (e) {
        this.filterOrder = e
      }
    },
    route: {},
    created () {
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/fragment";

  .index-filter {
    @extend %full-screen;
    z-index: 4;
    background-color: white;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    overflow-y: auto;
  }

  .list {
    padding: 0 10px;
    margin-bottom: 10px;
    font-size: $TIP_FONT_SIZE;
    .content {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      input {
        flex: 1;
        width: 0;
        height: 33px;
        background-color: $BODY_COLOR;
        text-align: center;
        color: $MAIN_COLOR;
        font-size: $TIP_FONT_SIZE;
      }
      span {
        line-height: 33px;
        margin: 0 10px;
      }
      > div {
        flex: 1;
        text-align: center;
        line-height: 33px;
        background-color: $BODY_COLOR;
        color: $TIP_COLOR;
        position: relative;
        &:nth-child(2) {
          margin: 0 10px;
        }
        &:last-child {
          margin-right: 0;
        }

      }
      .chosen {
        background-color: transparent;
        color: $MAIN_COLOR;
        &::before {
          @extend %btn-border;
          border: 1px solid $MAIN_COLOR;
        }
      }
    }
  }

  .last::after {
    content: "";
    display: block;
    height: 80px;
  }

  .fixed {
    @extend %fixed-box;
    button {
      margin-left: 10px;
      &:first-child {
        margin-left: 0;
      }
    }
  }

  .slide-in {
    &-transition {
      transition: .3s;
    }
    &-enter,
    &-leave {
      transform: translateY(100%);
    }
  }
</style>
