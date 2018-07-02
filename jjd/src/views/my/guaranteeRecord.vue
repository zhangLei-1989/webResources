<template>
  <div>
    <group>
      <div slot="tip_top"
           class="tip">
        <ele>
          <div class="box">
            <div class="">借款人</div>
            <div>担保金额</div>
            <div>时间</div>
            <div>状态</div>
          </div>
        </ele>
      </div>
      <no-data v-if="list.length === 0"></no-data>
      <ele v-else
           v-for="record in list">
        <div class="box">
          <div class="">
            <!--<div class="user-icon"-->
            <!--:style="{backgroundImage: 'url(' + record.c_borrower_head + ')'}"></div>-->
            <div>{{record.c_name}}</div>
          </div>
          <div>{{record.n_amt}}</div>
          <div>{{record.c_tm}}</div>
          <div :class="classVal(record.status)">{{typeText(record.n_status)}}</div>
        </div>
      </ele>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import creditCenterUser from 'api/creditCenterUser'
  import noData from 'components/output/noData'

  export default{
    vuex: {
      getters: {
        currentShare: state => state.currentShare
      },
      actions: {}
    },
    data () {
      return {
        total: '',
        times: '',
        income: '',
        list: [],
        overdue: false,
        tobeCom: false,
        nomal: false
      }
    },
    components: {
      noData
    },
    methods: {
      getGuaranteeInfo (userId) {
        creditCenterUser.getGuaranteeList(userId).then((json) => {
          this.list = json.reverse()
        })
      },
      goNext (borrowid) {
        if (this.type === 0) {
          this.$router.go(`/unconfirmIouDetail/${borrowid}`)
        } else {
          this.$router.go(`/iouDetail/${borrowid}`)
        }
      },
      typeText (type) {
        let text = ''

        if (type === 0) {
          text = '待确认'
        } else if (type === 1) {
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
    computed: {},
//        created () {
//            this.getGuaranteeInfo()
//            if (this.currentShare !== 'index') {
//                normal()
//            }
//        }
    route: {
      data ({ to: { params: { userId } } }) {
        this.cUserId = userId
        this.getGuaranteeInfo(userId)
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
</style>
