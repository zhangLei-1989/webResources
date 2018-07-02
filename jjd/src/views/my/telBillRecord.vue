<template>
  <div>
    <group :first="true">
      <ele class="col"
           :no-line="true">
        <div>月份</div>
        <div>消费金额</div>
      </ele>
      <ele class="box"
           v-for="record in list">
        <div>{{record.bill_cycle.slice(0, 11)}}</div>
        <div>{{record.total_amt}}元</div>
      </ele>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import creditCenterUser from 'api/creditCenterUser'

  export default{
    data () {
      return {
        list: [],
        Text: [
          {
            val: '月份'
          },
          {
            val: '金额'
          }
        ]
      }
    },
    components: {},
    methods: {
      getTelBillInfo (userId) {
        creditCenterUser.getMobileBill(userId).then((json) => {
          this.list = json
        })
      }
    },
    computed: {},
    route: {
      data ({ to: { params: { userId } } }) {
        this.cUserId = userId
        this.getTelBillInfo(userId)
      }
    }
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/function';

  .col {
    min-height: 30px;
    line-height: 30px;
    background: $BODY_COLOR;
    font-size: $TIP_FONT_SIZE;
  }

  .box {
    font-size: $TIP_FONT_SIZE;
  }
</style>
