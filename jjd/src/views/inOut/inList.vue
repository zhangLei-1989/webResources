<template>
  <div>
    <group :first="true">
      <ele class="no-padding">
        <div class="nav">
          <div :class="{selected: currentPage == 'all'}"
               @click="setPage('all')">
            <div>待收总额</div>
            <div>{{allAmount}}</div>
          </div>
          <div :class="{selected: currentPage == 'week'}"
               @click="setPage('week')">
            <div>7天待收</div>
            <div>{{weekAmount}}</div>
          </div>
          <div :class="{selected: currentPage == 'month'}"
               @click="setPage('month')">
            <div>30天待收</div>
            <div>{{monthAmount}}</div>
          </div>
        </div>
      </ele>
    </group>
    <group v-show="uncheckList.length">
      <ele :danger="true" :more="true" @click="toOfflineRepayListLend">您有 {{uncheckList.length}}笔 线下还款没有被确认</ele>
    </group>
    <group v-if="currentPage == 'all'">
      <ele :more="true"
           v-for="ele in allList"
           :link="'/iouDetail/' + ele.c_iou_id + (ele.b_to_check ? '/1' : '')">
        <div class="desc">
          <div v-if="ele.n_amt > 0">{{ele.n_amt}} 元</div>
          <div v-else>暂无待收金额</div>
          <div>[{{ele.n_cur_tms}}/{{ele.n_total_tms}}]
               {{ele.c_name}} - {{ele.c_purpose}} - {{ele.b_online ? '线上' : '线下'}}
          </div>
        </div>
        <div slot="right"
             :class="{overdue: ele.n_left_tm < 0}"
             class="status">
          <div>{{statusText(ele.n_left_tm)}}</div>
          <div v-if="ele.b_to_check"
               class="to-confirm">有线下还款待处理
          </div>
        </div>
      </ele>
    </group>
    <group v-if="currentPage == 'week'">
      <ele :more="true"
           v-for="ele in weekList"
           :link="'/iouDetail/' + ele.c_iou_id + (ele.b_to_check ? '/1' : '')">
        <div class="desc">
          <div v-if="ele.n_amt > 0">{{ele.n_amt}} 元</div>
          <div v-else>暂无待收金额</div>
          <div>[{{ele.n_cur_tms}}/{{ele.n_total_tms}}]
               {{ele.c_name}} - {{ele.c_purpose}} - {{ele.b_online ? '线上' : '线下'}}
          </div>
        </div>
        <div slot="right"
             :class="{overdue: ele.n_left_tm < 0}"
             class="status">
          <div>{{statusText(ele.n_left_tm)}}</div>
          <div v-if="ele.b_to_check"
               class="to-confirm">有线下还款待处理
          </div>
        </div>
      </ele>
    </group>
    <group v-if="currentPage == 'month'">
      <ele :more="true"
           v-for="ele in monthList"
           :link="'/iouDetail/' + ele.c_iou_id + (ele.b_to_check ? '/1' : '')">
        <div class="desc">
          <div v-if="ele.n_amt > 0">{{ele.n_amt}} 元</div>
          <div v-else>暂无待收金额</div>
          <div>[{{ele.n_cur_tms}}/{{ele.n_total_tms}}]
               {{ele.c_name}} - {{ele.c_purpose}} - {{ele.b_online ? '线上' : '线下'}}
          </div>
        </div>
        <div slot="right"
             :class="{overdue: ele.n_left_tm < 0}"
             class="status">
          <div>{{statusText(ele.n_left_tm)}}</div>
          <div v-if="ele.b_to_check"
               class="to-confirm">有线下还款待处理
          </div>
        </div>
      </ele>
    </group>
    <no-data v-show="allList.length === 0"
             :text="'暂时没有流落在外的金币哦'"
             :url="url"></no-data>
  </div>
</template>

<script type="text/ecmascript-6">
  import my from 'api/my'
  import noData from 'components/output/noData'
  import { normal } from 'tools/share'

  export default{
    vuex: {
      getters: {
        currentShare: state => state.currentShare
      },
      actions: {}
    },
    data () {
      return {
        url: require('../../assets/noDataIn.svg'),
        allAmount: '0.00',
        currentPage: 'all',
        allList: [],
        uncheckList: [],
      }
    },
    components: {
      noData
    },
    computed: {
      weekList () {
        return this.allList.filter(e => e.n_left_tm <= 7)
      },
      monthList () {
        return this.allList.filter(e => e.n_left_tm <= 30)
      },
      weekAmount () {
        if (this.weekList.length < 1) {
          return '0.00'
        }
        return this.sum(this.weekList)
      },
      monthAmount () {
        if (this.monthList.length < 1) {
          return '0.00'
        }
        return this.sum(this.monthList)
      }
    },
    methods: {
      getToReceiveList () {
        my.getToReceiveList().then((json) => {
          this.allAmount = json.n_amt
          this.allList = json.l_receive_list
          this.uncheckList = json.l_uncheck_list
        })
      },
      toOfflineRepayListLend () {
        this.$router.go('/offlineRepayListLend')
      },
      setPage (e) {
        this.currentPage = e
      },
      statusText (e) {
        let text = `剩余 ${e} 天`
        switch (true) {
          case parseInt(e, 10) < 0:
            text = `逾期 ${-e} 天`
            break
          case parseInt(e, 10) === 0:
            text = '今天是收款日'
            break
          default:
        }
        return text
      },
      sum (e) {
        if (e.length < 1) return '0.00'
        if (e.length === 1) {
          return parseFloat(e[0].n_amt).toFixed(2)
        }
        let result = 0
        e.forEach((item) => {
          result += parseFloat(item.n_amt)
        })
        return result.toFixed(2)
      }
    },
    route: {},
    created () {
      this.getToReceiveList()
      if (this.currentShare !== 'index') {
        normal()
      }
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/fragment";

  .no-padding {
    padding: 0 !important;
  }

  .nav {
    @extend %in-out-list-nav;
  }

  .desc,
  .status {
    display: flex;
    flex-direction: column;
    :first-child {
      margin: 15px 0 10px;
    }
    :last-child {
      margin-bottom: 15px;
    }
  }

  .desc {
    :first-child {
      color: $MAIN_COLOR;
    }
    :last-child {
      color: $TIP_COLOR;
      font-size: $TIP_FONT_SIZE;
    }
  }

  .status {
    font-size: $TIP_FONT_SIZE;
    color: $TIP_COLOR;
  }

  .overdue {
    color: $MINOR_COLOR;
    :last-child {
      display: block;
    }
  }

  .to-confirm {
    color: $MINOR_COLOR;
  }
</style>
