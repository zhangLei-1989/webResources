<template>
  <div>
    <group :first="true">
      <ele>
        <div class="user">
          <div class="user-icon"
               :style="{backgroundImage: 'url(' + headSrc + ')'}"></div>
          <div>{{name}}</div>
        </div>
      </ele>
      <ele :no-line="true"
           class="list">
        <div>被举报次数</div>
        <div slot="right">{{reportedTimes}} 次</div>
      </ele>
      <ele :no-line="true"
           class="list">
        <div>逾期次数</div>
        <div slot="right">{{overdueTimes}} 次</div>
        <!--<div slot="right">0 次</div>-->
      </ele>
      <!--<ele :no-line="true"-->
           <!--class="list">-->
        <!--<div>逾期总额</div>-->
        <!--<div slot="right">{{totalOverdue}} 元</div>-->
        <!--&lt;!&ndash;<div slot="right">0 元</div>&ndash;&gt;-->
      <!--</ele>-->
      <ele :no-line="true"
           class="list">
        <div>最大逾期总额</div>
        <div slot="right">{{overdueMax}} 元</div>
        <!--<div slot="right">0 元</div>-->
      </ele>
      <ele class="list">
        <div>当前逾期金额</div>
        <div slot="right">{{totalRepay}} 元</div>
        <!--<div slot="right">0 元</div>-->
      </ele>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  //    import my from 'api/my'
  import { setTempInfo } from 'store/actions'

  export default {
    vuex: {
      getters: {
        seekCredit: state => state.temp.seekCredit
      },
      actions: { setTempInfo }
    },
    data () {
      return {
        headSrc: '',
        name: '',
        reportedTimes: '',
        overdueTimes: '',
        totalOverdue: '',
        totalRepay: '',
        overdueMax: '',
      }
    },
    methods: {
      getCreditResult () {
        this.headSrc = this.seekCredit.headSrc
        this.name = this.seekCredit.name
        this.reportedTimes = this.seekCredit.reportedTimes
        this.overdueTimes = this.seekCredit.overdueTimes
        this.totalOverdue = this.seekCredit.totalOverdue
        this.totalRepay = this.seekCredit.totalRepay
        this.overdueMax = this.seekCredit.overdueMax
      }
    },
    components: {},
    created () {
      // 应用表单缓存
      Object.assign(this.$data, this.seekCredit)
      if (Object.keys(this.seekCredit).length < 1) {
        window.history.back()
        return
      }
      this.getCreditResult()
    }
  }
</script>

<style lang="scss"
       scoped>
  @import "../../scss/function";

  .user {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 15px 0;
    color: $MAIN_TEXT_COLOR;
    position: relative;
    &-icon {
      @include user-icon(50px);
      margin-bottom: 10px;
    }
    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 80px;
      height: 40px;
      background: url("../../../static/creditResult.png") center no-repeat {
        size: contain;
      }
    ;
      top: 65px;
      right: -11px;
      transform: rotate(20deg);
      z-index: 1;
    }
  }

  .list {
    color: $TIP_COLOR;
  }
</style>
