<template>
  <div>
    <div v-if="isOk">
      <div v-if="isOk"
           class="title">
        <div class="waiting-img"></div>
        <div>担保成功</div>
      </div>
    </div>
    <div v-if="!isOk">
      <group :first="true" >
        <ele>
          <div>担保金额  </div>
          <div>{{num.toFixed(2)}}元</div>
        </ele>
      </group>
      <group>
        <ele>
          <div>借款人</div>
          <div>{{name}}</div>
        </ele>
        <ele>
          <div>借款金额</div>
          <div>{{amt}}元</div>
        </ele>
        <ele>
          <div>借款时长</div>
          <div>{{time}}年</div>
        </ele>
        <ele>
          <div>年化利率</div>
          <div>{{rate}}%</div>
        </ele>
      </group>
      <group :fixed="true">
        <btn :text="'确认作担保'" :next="true" :cut="1" :btn-fn="confirm"></btn>
      </group>
        <div slot="tip_bottom"
             class="tip_box">
          <div style="width: 40px; height: 40px"
               @click="toggleCheck">
            <div class="checkbox"
                 :class="{chosen: checked}"></div>
          </div>
          已阅读并同意<a @click="seeAgreement">《担保协议》</a>
        </div>
      <group :first="true">
        <div style="padding: 10px;font-size: 14px;color: #666666;padding-top: 0px;">
          提示<br/>
          1、请务必确保借款人是您的孩子<br/>
          2、如果借款人逾期不还，您需要为其垫付
        </div>
      </group>
      <pay-money :show="payShown"
                 :fn="create"
                 :only-pwd="true"
                 @change-info="changePayInfo"
                 @success="success"
                 @toggle-pay="togglePayShown"></pay-money>
    </div>
  </div>
</template>

<script>
  import jjjh from 'api/jjjh'
  import payMoney from 'components/output/payMoney'
  import md5 from 'js-md5'
  import { alert } from 'tools/utils'

  export default {
    components: {
      payMoney,
    },
    data () {
      return {
        prodId: '',
        name: '',
        img: '',
        rate: '',
        amt: '',
        time: '',
        num: 0,
        checked: false,
        payShown: false,
        pwd: '',
        isOk: false,
      }
    },
    methods: {
      toggleCheck () {
        this.checked = !this.checked
        this.payShown = false
      },
      confirm () {
        if (this.checked) {
          this.payShown = true
        } else {
          alert('请同意担保协议')
        }
      },
      changePayInfo (e) {
        this.pwd = e.password
      },
      togglePayShown (e) {
        this.payShown = e
      },
      create () {
        jjjh.confirmGuaPlanApplyLoan(this.prodId, md5(md5(this.pwd))).then(() => {
          this.payShown = false
          this.isOk = true
//          this.$router.go('/')
        }).catch(() => {
          this.payShown = false
//          this.$router.go('/')
        })
      },
      success (e) {
        this.payShown = false
        if (e) {
          this.$router.go(-1)
        }
      },
      seeAgreement () {
        this.$router.go(`/jjjhGuaranteeAgreementDoc/${this.prodId}`)
      }
    },
    route: {
      data ({ to: { params: { id } } }) {
        this.prodId = id
        jjjh.getPlanApplyLoan(this.prodId).then((res) => {
          if (res.c_guarantee_id) {
            this.$router.go('/alreadyGuaranteed')
          } else {
            this.name = res.c_name
            this.img = res.c_head
            this.rate = res.n_interest_rate
            this.amt = res.n_loan_amt
            this.time = res.n_tm
            this.num = ((this.rate * this.time) / 100 + 1) * this.amt
          }
        }).catch((e) => {
          alert(e.message)
        })
      }
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

  .title {
    width: 100%;
    height: 300px;
    line-height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .jjjh-tip {
    padding: 10px 0;
  }

  .waiting-img {
    width: 100px;
    height: 100px;
    background: no-repeat center/contain url("../../assets/simpleOverdue_g.svg");
  }
</style>
