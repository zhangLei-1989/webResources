<template>
  <div>
    <pay-money :show="payShown"
               :fn="deleteCard"
               :only-pwd="true"
               :bank="true"
               @change-info="changePayInfo"
               @success="success"
               @toggle-pay="togglePayShown"></pay-money>
    <div class="head">
      <div>
        <div>{{name}}</div>
        <div class="last-num">储蓄卡<span>|</span>尾号<span>{{number}}</span></div>
      </div>
      <div>
                <span class="to-cash"
                      @click="confirmDelete">解绑</span>
      </div>
    </div>
    <group>
      <div slot="tip_top"
           class="tip">
        <ele>
          <div>管理银行卡</div>
        </ele>
      </div>
      <ele :first="true"
           :more="true"
           @click="modifyBankTel">
        <div>更换预留手机号</div>
      </ele>
      <ele :more="true"
           @click="toCash">
        <div>提现</div>
      </ele>
      <ele :more="true"
           @click="toCharge">
        <div>充值</div>
      </ele>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import md5 from 'js-md5'
  import pay from 'api/pay'
  import { feedback, confirm } from 'tools/utils'
  import payMoney from 'components/output/payMoney'

  export default {
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        id: '',
        name: '',
        number: '',
        pwd: '',
        payShown: false
      }
    },
    components: {
      payMoney
    },
    computed: {},
    methods: {
      modifyBankTel () {
        this.$router.go(`/modifyBankTel/${this.id}`)
      },
      toCash () {
//                alert('提现功能正在维护，请您稍后再试')
        this.$router.go(`/toCash/${this.id}`)
      },
      toCharge () {
        this.$router.go(`/toCharge/${this.id}`)
      },
      deleteCard () {
        return pay.delBindCard({
          number: this.id,
          pwd: md5(md5(this.pwd))
        })
      },
      success (e) {
        this.togglePayShown(false)
        if (e) {
          feedback('解绑成功')
          window.history.back()
        }
      },
      confirmDelete () {
        const that = this
        confirm(
          `确认删除尾号${this.number}的银行卡吗`,
          '提示',
          [{
            text: '不删除'
          }, {
            text: '删除',
            fn () {
              setTimeout(() => {
                that.togglePayShown(true)
              }, 300)
            }
          }]
        )
      },
      changePayInfo (e) {
        this.pwd = e.password
      },
      togglePayShown (e) {
        this.payShown = e
      }
    },
    route: {
      data ({ to: { params: { id, name, number } } }) {
        return {
          id,
          name,
          number
        }
      }
    },
    created () {
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/fragment";

  .head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    background: linear-gradient(left, #7da7ce, #5f92c2);
    color: white;
  }

  .last-num {
    font-size: 14px;
    line-height: 20px;
    margin-top: 5px;
  }

  .last-num span:first-child {
    margin: 0 5px;
  }

  .to-cash {
    position: relative;
    top: 7px;
    display: block;
    text-align: center;
    width: 50px;
    line-height: 26px;
    font-size: $TIP_FONT_SIZE;
    &::before {
      @extend %btn-border;
      border: 1px solid white {
        radius: $BORDER_RADIUS;
      }
    }
  }

  .func {
    height: 60px;
    display: flex;
    flex-direction: row;
  }

  .func div {
    flex: 1;
    font-size: 14px;
    padding: 10px;
    color: #333;
    line-height: 40px;
    background: #fff;
    border: 1px solid #f2f2f2;
  }

  .number {
    font-size: $LARGE_FONT_SIZE;
    display: flex;
    .num {
      width: 12px;
    }
    .star {
      color: transparent;
      background: url("../../assets/star.svg") center no-repeat {
        size: 6px;
      }
    }
    .space {
      margin-right: 8px;
    }
  }

  .inline-block {
    display: inline-block;
  }
</style>
