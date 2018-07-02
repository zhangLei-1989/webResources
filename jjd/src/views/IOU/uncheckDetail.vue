<template>
  <div>
    <ele>
      <div>还款人</div>
      <div slot="right">{{uncheckItem.c_lender_name}}</div>
    </ele>
    <ele>
      <div>换款金额（元）</div>
      <div slot="right">{{uncheckItem.n_amt}}</div>
    </ele>
    <ele>
      <div>还款时间</div>
      <div slot="right">{{getDate(uncheckItem.c_send_tm)}}</div>
    </ele>
    <ele>
      <div>还款方式</div>
      <div slot="right">{{uncheckItem.c_offline_pay_method}}</div>
    </ele>
    <ele :more="true" :no-line="true" >
      <div></div>
      <div slot="right"  @click="toIouDetail">点击查看借条详情</div>
    </ele>
  </div>
</template>

<script>
  import my from 'api/my'

  export default {
    data () {
      return {
        iouId: '',
        uncheckList: [],
        uncheckItem: {},
      }
    },
    methods: {
      getDate (date) {
        let res
        if (date) {
          res = date.split(' ')[0]
        } else {
          res = ''
        }
        return res
      },
      toIouDetail () {
        this.$router.go(`/iouContent/${this.iouId}`)
      }
    },
    route: {
      data ({ to: { params: { iouId } } }) {
        this.iouId = iouId
        my.getToRepayList().then((json) => {
          this.uncheckList = json.l_uncheck_list
          this.uncheckList.forEach((item) => {
            if (this.iouId === item.c_iou_id) {
              this.uncheckItem = item
            }
          })
        })
      }
    },
    created () {

    }
  }
</script>

<style scoped>

</style>
