<template>
  <div>
    <head-n>
      <!--<div class="content"-->
           <!--slot="top">-->
        <!--<div>借入总额(元)</div>-->
        <!--<div>{{total}}</div>-->
      <!--</div>-->
      <div class="content"
           slot="top">
        <div>最大待还金额(元)</div>
        <div>{{repayMax}}</div>
      </div>
      <div class="content"
           slot="left">
        <div>总利息(元)</div>
        <div>{{income}}</div>
      </div>
      <div class="content"
           slot="right">
        <div>借入次数</div>
        <div>{{times}}</div>
      </div>
    </head-n>
    <group :first="true">
      <ele class="search">
        <div class="icon-box">
          <div class="icon"></div>
          <div class="bg fix"></div>
        </div>
        <input growing-track="true"
               placeholder="可搜索姓名/金额/时间/状态"
               v-model="filter"
               debounce="500"
               type="search">
      </ele>
    </group>
    <group>
      <div slot="tip_top"
           class="tip">
        <ele>
          <div class="box">
            <div class="desc">出借人</div>
            <div>借款金额</div>
            <div>时间</div>
            <div>状态</div>
          </div>
        </ele>
      </div>
      <ele v-for="item in newList | filterBy filter"
           @click="goNext(item.c_iou_id)">
        <div class="box">
          <div class="desc">
            <div class="user-icon"
                 :style="{backgroundImage: 'url(' + item.c_lender_head + ')'}"></div>
            <div>{{item.c_lender_name}}</div>
          </div>
          <div>{{item.n_amt}}</div>
          <div>{{item.t_borrow_tm}}</div>
          <div :class="classVal(item.status)">{{item.n_status}}</div>
        </div>
      </ele>
    </group>
    <no-data v-show="list.length === 0"></no-data>
  </div>
</template>
<script type="text/ecmascript-6">
  import headN from 'components/output/headN'
  import noData from 'components/output/noData'
  import my from 'api/my'

  export default{
    data () {
      return {
        total: '',
        repayMax: '',
        times: '',
        income: '',
        list: [],
        overdue: false,
        tobeCom: false,
        nomal: false,
        filter: ''
      }
    },
    components: {
      headN,
      noData
    },
    methods: {
      getBorrowInfo () {
        my.getBorrowAccount().then((json) => {
          this.total = json.n_amt
          this.repayMax = json.n_history_repay_max
          this.times = json.n_lend_count
          this.income = json.n_fee_amt
          this.list = json.l_lend_list
        })
      },
      goNext (id) {
        if (this.type === 0) {
          this.$router.go({
            path: `/unconfirmIouDetail/${id}`,
            replace: false
          })
        } else {
          this.$router.go({
            path: `/iouDetail/${id}`,
            replace: false
          })
        }
      },
      typeText (type) {
        let text = ''
        if (type === 1) {
          text = '还款中'
        } else if (type === 2) {
          text = '已还清'
        } else if (type === 3) {
          text = '已逾期'
        } else if (type === 4) {
          text = '有争议'
        }
        return text
      },
      classVal (type) {
        let classVal = ''
        if (type === '0') {
          classVal = 'tobeCom'
        } else if (type === '2') {
          classVal = 'overdue'
        } else {
          classVal = ''
        }
        return classVal
      }
    },
    computed: {
      newList () {
        return this.list.map((e) => {
          const newe = e
          newe.n_status = this.typeText(newe.n_status)
          return newe
        })
      }
    },
    created () {
      this.getBorrowInfo()
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

  .content div {
    &:last-child {
      font-size: $LARGE_FONT_SIZE;
    }
    &:first-child {
      font-size: $TIP_FONT_SIZE;
    }
  }

  .title {
    height: 40px;
    background-color: #efefef;
  }

  .overdue {
    color: $MINOR_COLOR !important;
  }

  .tobeCom {
    color: $MAIN_COLOR !important;
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
    > div:nth-child(3) {
      flex: 2;
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

  .search {
    @extend %search;
  }
</style>
