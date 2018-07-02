<template>
  <div>
    <ele class="col"
         :no-line="true"
         v-if="list.length"
    >
      <div class="box">
        <div class="desc">月份</div>
        <div>消费记录</div>
        <div>消费金额</div>
      </div>
    </ele>
    <group :first="true" v-if="list.length">
      <ele v-for="record in list">
        <div class="box">
          <div class="desc">{{record.trans_mth}}</div>
          <div>{{record.all_count}}</div>
          <div>{{record.all_amount.toFixed(2)}}元</div>
        </div>
      </ele>
    </group>
    <no-data v-show="list.length === 0"
             :text="'暂无内容'"></no-data>

  </div>
</template>
<script type="text/ecmascript-6">
  import creditCenterUser from 'api/creditCenterUser'
  import noData from 'components/output/noData'

  export default{
    data () {
      return {
        list: []
      }
    },
    components: {
      noData,
    },
    methods: {
      getConsumptionInfo (userId) {
        creditCenterUser.getEbusinessExpense(userId).then((json) => {
          this.list = json
        })
      }
    },
    computed: {},
    route: {
      data ({ to: { params: { userId } } }) {
        this.cUserId = userId
        this.getConsumptionInfo(userId)
      }
    }
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/function';

  .box {
    min-height: 30px;
    line-height: 30px;
    padding: 0;
    flex: 1;
    display: flex;
    .desc {
      flex: 1;
      display: flex;
      justify-content: left;
    }
    > div {
      flex: 1;
      line-height: 40px;
      text-align: center;
      font-size: $TIP_FONT_SIZE;
    }
    > div:nth-child(3) {
      flex: 1;
    }
    > div:last-child {
      text-align: right;
    }
  }

  .col {
    padding: 0 10px;
    min-height: 30px;
    color: $MAIN_TEXT_COLOR;
    background-color: $BODY_COLOR;
  }
</style>
