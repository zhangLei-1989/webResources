<template>
  <div>
    <pay-money v-if="canConfirm"
               :show="payShown"
               :fn="confirmFn"
               :only-pwd="true"
               :offline="true"
               @change-info="changePayInfo"
               @success="success"
               @toggle-pay="togglePayShown"></pay-money>
    <group :fixed="true"
           :single="true"
           v-if="canConfirm">
      <div class="btn-box">
        <btn :cut="2"
             :text="'未收到款'"
             @click="notReceived"></btn>
        <btn :cut="2"
             :next="true"
             :text="'确认已收到还款'"
             @click="received"></btn>
      </div>
    </group>
    <group :first="true">
      <ele>
        <div slot="left">还款人</div>
        <div>
          <img class="user-icon"
               :src="headUrl">
          <span style="position: relative;top: -10px;">{{name}}</span>
        </div>
      </ele>
      <ele>
        <div slot="left">还款金额</div>
        <div>{{money}}元</div>
      </ele>
      <ele>
        <div slot="left">还款时间</div>
        <div>{{paytime}}</div>
      </ele>
      <ele>
        <div slot="left">还款方式</div>
        <div>{{offLinePayWay}}</div>
      </ele>
      <div slot="tip_bottom"
           class="tip">
        <ele @click="linkIouDetail">
          <div slot="right">查看借条详情</div>
        </ele>
      </div>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import md5 from 'js-md5'
  import payMoney from 'components/output/payMoney'
  import pay from 'api/pay'
  import iou from 'api/iou'
  import { confirm, feedback } from 'tools/utils'

  export default {
    vuex: {
      getters: {
        userId: state => state.userInfo.userId
      }
    },
    data () {
      return {
        id: '',
        iouId: '',
        name: '',
        money: '',
        paytime: '',
        offLinePayWay: '',
        headUrl: '',
        canConfirm: 0,
        pwd: '',
        payShown: false,
        clickBtn: 0,
      }
    },
    methods: {
      getIOURepayDetail () {
        iou.getIOURepayDetail({
          id: this.id,
          iouId: this.iouId,
        }).then((json) => {
          this.name = json.c_repay_name
          this.headUrl = json.c_repay_head
          if (this.userId === json.c_repay_id) {
            this.money = json.n_amt
          } else {
            this.money = json.n_to_gathering_amt
          }
          const d = new Date(json.t_repay_tm)
          this.paytime =
            `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
          this.offLinePayWay = json.c_offline_pay_method || '线上还款'
          this.iouId = json.c_iou_id
          this.canConfirm =
            !json.b_online && !json.b_end && json.b_valid &&
            json.c_repay_id !== this.userId
        })
      },
      linkIouDetail () {
        const iouId = this.iouId
        this.$router.go({
          path: `/iouDetail/${iouId}`
        })
      },
      received () {
        this.clickBtn = 1
        const that = this
        confirm('您确定已经收到对方还款了吗？', '提示', [
          {
            text: '取消'
          }, {
            text: '已收到',
            fn () {
              that.payShown = true
            }
          }
        ])
      },
      notReceived () {
        this.clickBtn = 0
        const that = this
        confirm('您没有收到对方还款，要驳回该次还款吗？', '提示', [
          {
            text: '取消'
          }, {
            text: '驳回',
            fn () {
              that.payShown = true
            }
          }
        ])
      },
      confirmFn () {
        return pay.confirmOffLineRepay({
          pwd: md5(md5(this.pwd)),
          id: this.id, // 筹款明细表id
          result: this.clickBtn // 确认结果 0.否掉 1.确认
        })
      },
      close () {
        this.payShown = false
      },
      togglePayShown (e) {
        this.payShown = e
      },
      changePayInfo (e) {
        this.pwd = e.password
      },
      success (e) {
        this.togglePayShown(false)
        if (e) {
          if (this.clickBtn) {
            feedback('确认收款成功')
          } else {
            feedback('驳回收款成功')
          }
          this.getIOURepayDetail()
          window.history.back()
        }
      }
    },
    components: {
      payMoney
    },
    route: {
      data ({ to: { params: { id, iouId } } }) {
        this.id = id
        this.iouId = iouId
        this.getIOURepayDetail()
      }
    },
    created () {
    }
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/function';

  .user-icon {
    width: 40px;
    height: 40px;
    margin-top: 5px;
    border-radius: 100%;
  }

  .btn-box {
    width: 100%;
    display: flex;
  }

  button {
    margin: 5px;
  }
</style>
