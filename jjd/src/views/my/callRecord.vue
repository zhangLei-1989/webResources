<template>
  <div>
    <ele :no-line="true"
         class="col">
      <div class="box">
        <div class="desc">手机号</div>
        <div>通话次数</div>
        <div>时长(分)</div>
        <div>短信条数</div>
      </div>
    </ele>
    <group :first="true">
      <ele v-for="record in list">
        <div class="box">
          <div class="">{{record.phone_num}}</div>
          <div>{{record.call_cnt}}</div>
          <div>{{record.call_len.toFixed(2)}}</div>
          <div>{{record.sms_cnt}}</div>
        </div>
      </ele>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import creditCenterUser from 'api/creditCenterUser'

  export default{
    data () {
      return {
        list: [
          {
            c_recharge_tm: '',
            c_call_tm: '',
            c_call_lo: '',
            n_amt: ''
          }
        ]
      }
    },
    components: {},
    methods: {
      getCallInfo (userId) {
        creditCenterUser.getContactList(userId).then((json) => {
          this.list = json
        })
      }
    },
    computed: {},
    route: {
      data ({ to: { params: { userId } } }) {
        this.cUserId = userId
        this.getCallInfo(userId)
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
      flex: 1.5;
      display: flex;
      justify-content: center;
    }
    > div {
      flex: 1;
      line-height: 40px;
      text-align: center;
      font-size: $TIP_FONT_SIZE;
    }
    > div:first-child {
      flex: 1.5;
      text-align: left;
    }
    /*> div:nth-child(3) {*/
    /*flex: 1;*/
    /*}*/
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
