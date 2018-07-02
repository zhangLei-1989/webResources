<template>
  <div>
    <group :first="true">
      <ele>
        <div class="title"
             solt="left">
          <img class="detail"
               src="../../assets/detail.svg">
          <span>出借内容</span>
        </div>
      </ele>
      <ele>
        <div class="box">
          <div class="row-a">
            <div>借款金额</div>
            <div>{{money}}元</div>
          </div>
          <div class="row-a">
            <div>还款方式</div>
            <div>{{payWay}}</div>
          </div>
          <div class="row-a">
            <div>借款时长</div>
            <div>{{timeLength}}</div>
          </div>
          <div class="row-a">
            <div>借款利率</div>
            <div>{{yearlyRate}}%</div>
          </div>
          <div class="row-a">
            <div>服务费率</div>
            <div>{{feeRate}}%</div>
          </div>
          <div class="row-a">
            <div>服务费最低额度</div>
            <div>{{minFee}}元</div>
          </div>
          <div class="row-a">
            <div>必备信用资料</div>
            <div>{{needInfo}}</div>
          </div>
          <div class="row-a">
            <div>补充说明</div>
            <div>{{addText||'无'}}</div>
          </div>
        </div>
      </ele>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import prod from 'api/prod'

  export default {
    vuex: {
      getters: {
        openId: state => state.userInfo.openId
      }
    },
    data () {
      return {
        id: '',
        money: '',
        payWay: '',
        timeLength: '',
        yearlyRate: '',
        feeRate: '',
        minFee: '',
        needInfoList: [],
        addText: ''
      }
    },
    methods: {
      getUnit (value) {
        if (this.payWay === '等额本息') {
          return '期'
        }
        return value > 0 ? '个月' : '天'
      },
      getProd () {
        prod.getProduct({
          id: this.id,
          openId: this.openId
        }).then((json) => {
          this.money = `${json.n_min_amt} 至 ${json.n_max_amt}`
          this.payWay = json.n_repay_type > 0 ? '等额本息' : '到期还本付息'
          this.timeLength = `${json.n_min_tm}${this.getUnit(
            json.n_min_tm_unit
          )} 至 ${json.n_max_tm}${this.getUnit(json.n_max_tm_unit)}`
          this.yearlyRate = json.n_interest_rate
          this.feeRate = json.n_service_fee_rate
          this.minFee = json.n_min_service_fee
          this.addText = json.c_memo
          const {
            b_require_xuexin_info: xuexin, // 学信 0.否 1.是
            b_require_zhengxin_info: zhengxin, // 征信 0.否 1.是
            b_require_car_info: car, // 车产 0.否 1.是
            b_require_house_info: house, // 房产 0.否 1.是
            b_require_job_info: job, // 工作信息 0.否 1.是
            b_require_income_info: income // 收入信息 0.否 1.是
          } = json
          if (xuexin) {
            this.needInfoList.push('学信')
          }
          if (zhengxin) {
            this.needInfoList.push('征信')
          }
          if (car) {
            this.needInfoList.push('车产')
          }
          if (house) {
            this.needInfoList.push('房产')
          }
          if (job) {
            this.needInfoList.push('工作')
          }
          if (income) {
            this.needInfoList.push('收入')
          }
        })
      }
    },
    computed: {
      needInfo () {
        if (this.needInfoList.length < 1) {
          return '无'
        }
        return this.needInfoList.join('、')
      }
    },
    components: {},
    route: {
      data ({ to: { params: { id } } }) {
        this.id = id
        this.getProd()
      }
    }
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/function';

  .detail {
    width: 22px;
    line-height: 20px;
  }

  .box {
    flex: 1;
  }

  .row-a {
    font-size: $TIP_FONT_SIZE;
    display: flex;
    line-height: 30px;
    justify-content: space-between;
    div {
      display: flex;
      flex-direction: column;
      &:first-child {
        min-width: 90px;
      }
    }
  }

  .title {
    display: flex;
    align-items: center;
    img {
      margin-right: 5px;
    }
  }
</style>
