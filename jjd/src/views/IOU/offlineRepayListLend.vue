<template>
  <group :first="true">
    <div class="warning">线下还款有可能被对方驳回，被驳回后需要您重新发起还款，如果对方驳回时间超过还款时间，会导致您产生逾期记录，所以，如果对方迟迟不确认收款，请您及时联系对方提醒确认收款。</div>
  </group>
  <group>
    <ele v-for="item in uncheckList" :more="true" @click="toUncheckDetail(item)">
      <div class="singleSel">
        <div class="rowTop">{{item.n_amt}}元</div>
        <div class="rowBottom">{{item.c_borrower_name}} - {{item.c_offline_pay_method}}</div>
      </div>
      <div slot="right">{{item.c_send_tm.split(' ')[0]}}</div>
    </ele>
  </group>
</template>

<script>
  import my from 'api/my'

  export default {
    data () {
      return {
        allAmount: 0,
        allList: [],
        uncheckList: [],
      }
    },
    created () {
      this.getToReceiveList()
    },
    methods: {
      getToReceiveList () {
        my.getToReceiveList().then((json) => {
          this.allAmount = json.n_amt
          this.allList = json.l_repay_list
          this.uncheckList = json.l_uncheck_list
        })
      },
      toUncheckDetail (iouItem) {
        this.$router.go(`/offlineRepayConfirm/${iouItem.c_iou_list_id}/undefined`)
      },
    }
  }
</script>

<style scoped rel="stylesheet/scss"
       lang="scss">
  @import "../../scss/fragment";
  *{
    color: $MAIN_TEXT_COLOR;
  }

  .singleSel{
    padding: 10px 0 10px 0;
  }
  .rowTop{
    padding: 10px;
    color: $MINOR_COLOR;
    padding-left: 0px;
  }
  .rowBottom{
    padding: 0 10px 10px 0;
  }
  .warning{
    color: $MINOR_COLOR;
    padding: 10px;
    background-color: #ffffff;
  }
</style>
