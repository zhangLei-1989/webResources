<template>
  <div>
    <pay-money :show="payShown"
               :fn="toGuarantee"
               :only-pwd="true"
               @change-info="changePayInfo"
               @success="success"
               @toggle-pay="togglePayShown"></pay-money>
    <group :fixed="true">
      <btn :text="'确认作担保'"
           :cut="1"
           :next="true"
           :btn-fn="next"></btn>
    </group>
    <group>
      <ele>
        <div>担保金额</div>
        <input growing-track="true"
               type="number"
               v-model="guaranteeAmount"
               :placeholder="placeholder"
               @blur="blur"
               slot="right">
        <div slot="unit">元</div>
      </ele>
      <ele>
        <div slot="right"
             class="computed-amount">预计收益<span>{{computedAmount}}</span>元
        </div>
      </ele>
    </group>
    <group>
      <ele :more="true"
           :link="`/chooseFriends/${lenderId}`">
        <div class="long">帮找出借人</div>
        <div slot="right">
          <span v-if="friendsName.length < 1">点击选择出借人</span>
          <span v-for="f in friendsName"
                track-by="$index"
                v-if="friendsName.length == 1"> {{f}}</span>
          <span track-by="$index"
                v-if="friendsName.length > 1"> {{friendsName[0]}}等{{friendsName.length }}人</span>
        </div>
      </ele>
      <div slot="tip_bottom"
           class="tip_box">
        <div style="width: 40px; height: 40px"
             @click="toggleCheck">
          <div class="checkbox"
               :class="{chosen: checked}"></div>
        </div>
        已阅读并同意<a @click="goService">《今借到借款协议》</a>
      </div>
    </group>
    <group>
      <div slot="tip_bottom"
           class="tip">
        <div>
          提示<br>
          1、请务必确保借款人是您熟知并信得过的人；<br>
          2、如果借款人逾期不还，您需要为其垫付；<br>
          3、扩散消息给您的好友，帮TA借到才能获得担保收益。
        </div>
      </div>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import md5 from 'js-md5'
  import payMoney from 'components/output/payMoney'
  import { setTempInfo } from 'store/actions'
  import bid from 'api/bid'
  import pay from 'api/pay'
  import { alert, feedback } from 'tools/utils'

  export default{
    vuex: {
      getters: {
        chooseFriends: state => state.temp.chooseFriends,
        guarantee: state => state.temp.guarantee
      },
      actions: { setTempInfo }
    },
    data () {
      return {
        lenderId: '', // 借款人id
        id: '',
        orderId: '', // 订单id
        pwd: '',
        amount: '',
        guaranteeAmount: '',
        guaranteeRate: '',
        friendsName: [],
        friendsId: [],
        payShown: false,
        checked: false
      }
    },
    components: {
      payMoney
    },
    computed: {
      placeholder () {
        return `少于${this.amount}`
      },
      computedAmount () {
        const c = parseInt(this.guaranteeAmount, 10)
          * parseInt(this.guaranteeRate, 10) / 100
        return (c || 0).toFixed(2)
      }
    },
    methods: {
      toggleCheck () {
        this.checked = !this.checked
        this.payShown = false
      },
      next () {
        if (parseInt(this.guaranteeAmount, 10) < 1
          || this.guaranteeAmount.length < 1) {
          alert('请输入担保金额')
        } else if (this.guaranteeAmount % 1 !== 0) {
          alert('担保金额应为整数')
        } else if (parseInt(this.guaranteeAmount, 10) > this.amount) {
          alert('担保金额不得大于借款金额')
        } else if (!this.checked) {
          alert('请同意今借到借款协议')
        } else {
          this.payShown = true
        }
      },
      goService () {
        this.$router.go({
          path: '/iouService7/0',
          replace: false
        })
      },
      toGuarantee () {
        return bid.addGuarantee({
          orderId: this.orderId,
          lenderId: this.lenderId,
          pwd: md5(md5(this.pwd)),
          id: this.id,
          amount: parseInt(this.guaranteeAmount, 10),
          friendsId: this.friendsId
        })
      },
      getOrderId () {
        pay.getOrderId().then((json) => {
          this.orderId = json
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
        if (e) {
          this.togglePayShown(false)
          feedback('担保成功')
          window.history.back()
        } else {
          this.togglePayShown(false)
          this.getOrderId()
        }
      },
      blur () {
        this.guaranteeAmount = parseInt(this.guaranteeAmount || 0, 10)
      }
    },
    route: {
      deactivate ({ next }) {
        // 缓存表单
        this.setTempInfo({ chooseFriends: this.$data })
        next()
      },
      data ({ to: { params: { id, lenderId } } }) {
        return {
          id,
          lenderId
        }
      }
    },
    created () {
      // 应用表单缓存
      Object.assign(this.$data, this.guarantee, this.chooseFriends)
      if (Object.keys(this.guarantee).length < 1) {
        window.history.back()
        return
      }
      this.getOrderId()
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import '../../scss/fragment';

  .checkbox {
    width: 16px;
    height: 16px;
    @extend %checkbox;
    margin: 12px;
    line-height: 40px;
    border: 1px solid $TIP_COLOR !important;
  }

  .chosen.checkbox::before {
    width: 6px !important;
    height: 10px !important;
    top: 2px;
    left: 5px;
  }

  .tip_box {
    display: flex;
    line-height: 40px;
    font-size: $MIN_FONT_SIZE;
    color: $TIP_COLOR;
    a {
      color: $MAIN_COLOR;
    }
  }

  .long {
    white-space: nowrap;
    margin-right: 20px;
  }

  .computed-amount {
    font-size: $TIP_FONT_SIZE;
    color: $TIP_COLOR;
    span {
      color: $MAIN_COLOR;
      margin: 0 5px;
    }
  }
</style>
