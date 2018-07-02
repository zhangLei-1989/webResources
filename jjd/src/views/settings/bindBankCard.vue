<template>
  <div>
    <group class="lastbtn"
           :single="true"
           :fixed="true">
      <btn :text="'确认绑卡'"
           :allow="haveGotSms"
           :cut="1"
           :next="true"
           :btn-fn="saveBankCardInfo"></btn>
    </group>
    <selector :value-list="bankCardList"
              :show="bankCardShow"
              :default-data="chosenBank"
              @toggle="toggleBankCardShown"
              @set-data="setBankCard"></selector>
    <group>
      <div slot="tip_top"
           class="tip">
        <ele>
          <div>注意：请您避免绑定<span class="alert">信用卡</span>、<span class="alert">结算卡</span>。
          </div>
        </ele>
      </div>
      <ele>
        <div slot="left">持卡人</div>
        <div v-if="binded"
             slot="right">{{name}}
        </div>
        <input v-else
               growing-track="true"
               type="text"
               placeholder="请输入真实姓名"
               v-model="name"
               slot="right">
      </ele>
      <ele>
        <div slot="left">身份证号</div>
        <div v-if="binded"
             slot="right">{{idNum}}
        </div>
        <input v-else
               growing-track="true"
               type="text"
               placeholder="请输入身份证号"
               slot="right"
               v-model="idNum">
      </ele>
      <ele>
        <div slot="left">银行卡号</div>
        <input growing-track="true"
               type="number"
               placeholder="请输入银行卡号"
               slot="right"
               v-model="cardNum">
      </ele>
      <ele :more="true">
        <div slot="left">选择银行</div>
        <div slot="right">
          <div class="selector"
               @click="showBankCard">{{bankName || '--请选择--'}}
          </div>
        </div>
      </ele>
      <ele>
        <div slot="left">预留手机号</div>
        <input growing-track="true"
               type="tel"
               placeholder="务必输入银行预留手机号"
               slot="right"
               v-model="phone">
      </ele>
      <ele v-if="!isUsedText || failed">
        <div slot="left">验证码</div>
        <div slot="right">
          <input growing-track="true"
                 type="number"
                 placeholder="请输入验证码"
                 v-model="code">
          <codebtn :fn="getTextCode"
                   :bindcard="true"
                   :ok="codebtnOk"
                   :start="false"></codebtn>
        </div>
      </ele>
      <ele v-else>
        <div slot="left">验证码</div>
        <div slot="right">
          <input growing-track="true"
                 type="number"
                 placeholder="请输入新的验证码"
                 v-model="code">
          <codebtn :fn="getTextCodeAgain"
                   :bindcard="true"
                   :ok="codebtnOk"
                   :start="false"></codebtn>
        </div>
      </ele>
      <div slot="tip_bottom"
           class="tip">
        <ele>
          <div>点击【确认绑卡】后，银行会向该卡扣取1.00元至10.00元随机金额进行验证，扣款成功后该笔验证钱款会存入您的今借到账户余额中，不会对您的资金造成影响</div>
        </ele>
      </div>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import selector from 'components/mixin/selector'
  import codebtn from 'components/mixin/codebtn'
  import pay from 'api/pay'
  import { alert, feedback } from 'tools/utils'
//  import bankList from 'tools/bankList'
  import {
    toggleWaiting
  } from 'store/actions'

  export default {
    vuex: {
      actions: {
        toggleWaiting
      }
    },
    data () {
      return {
        orderId: '',
        bankCardShow: false,
        bankCardList: [
          { text: '建设银行', value: '' },
          { text: '工商银行', value: '' },
          { text: '农业银行', value: '' },
          { text: '邮储银行', value: '' },
          { text: '中国银行', value: '' },
          { text: '光大银行', value: '' },
          { text: '平安银行', value: '' },
          { text: '华夏银行', value: '' },
//          { text: '交通银行', value: '' },
          { text: '兴业银行', value: '' },
          { text: '中信银行', value: '' },
          { text: '浦发银行', value: '' },
          { text: '北京银行(单笔充值最多333元，提现正常)', value: '北京银行' },
          { text: '民生银行(单笔充值最多333元，提现正常)', value: '民生银行' },
//          { text: '上海银行(单笔充值最多9.9元，不能提现)', value: '上海银行' },
        ],
        name: '',
        chosenBank: {},
        bankName: '',
        cardNum: '',
        phone: '',
        idNum: '',
        payOrderId: '',
        payToken: '',
        code: '',
        isUsedText: 0,
        pwdOk: 0,
        creditOk: 0,
        rebind: false,
        binded: false,
        failed: true,
        haveGotSms: false,
        jjjh: false,
      }
    },
    components: {
      selector,
      codebtn
    },
    computed: {
      errorList () {
        const list = []
        if (!this.name) {
          list.push('请输入持卡人姓名')
        }
        if (!this.idNum2) {
          list.push('请输入身份证号')
        }
        if (this.idNum2.length > 18) {
          list.push('请输入正确的身份证号')
        }
        if (!this.cardNum) {
          list.push('请输入银行卡号')
        }
        if (!this.phone) {
          list.push('请输入预留手机号')
        }
        return list
      },
      codebtnOk () {
        return !this.errorList.length
      },
      idNum2 () {
        return this.idNum.trim()
      }
    },
    watch: {
//      cardNum (e) {
//        const num6 = parseInt(e.slice(0, 6), 10)
//        const index = bankList.numList.indexOf(num6)
//        if (index > -1) {
//          let bankName = ''
//          bankList.nameList.forEach((l) => {
//            if (index >= l.min && index <= l.max) {
//              bankName = l.name
//            }
//          })
//          if (this.bankCardList.includes(bankName)) {
//            this.bankName = bankName
//          } else {
//            this.bankName = ''
//          }
//        } else {
//          this.bankName = ''
//        }
//      }
    },
    events: {
      child (count) {
        if (count > 1) {
          this.isUsedText = 0
        }
        this.isUsedText = 1
        return this.isUsedText
      }
    },
    methods: {
      checkValid (fn) {
        if (this.errorList.length > 0) {
          let errors = ''
          this.errorList.forEach((err) => {
            errors += `${err}<br>`
          })
          alert(errors)
        } else {
          fn()
        }
      },
      isUserdMsg () {
        if (this.isUsedText === 1) {
          this.code = ''
        }
        return
      },
      showBankCard () {
        this.bankCardShow = true
      },
      toggleBankCardShown (e) {
        this.bankCardShow = e
      },
      setBankCard (cur) {
        this.chosenBank = cur
        this.bankName = cur.value || cur.text
      },
      getTextCode () {
        this.checkValid(() => {
          pay.getTextCode({
            orderId: this.orderId,
            cardNum: this.cardNum.replace(/\s+/g, ''),
            tel: this.phone.trim(),
            idNum: this.idNum2,
            name: this.name.trim()
          }).then((json) => {
            this.payOrderId = json.c_pay_order_no
            this.payToken = json.c_pay_token
            this.isUserdMsg()
            this.$broadcast('startCount', true)
            this.failed = false
            this.haveGotSms = true
          }).catch((err) => {
            if (err.code === 202 || err.code === 203) {
              this.failed = false
              feedback('绑卡成功')
              window.history.back()
            } else if (err.code === 204) {
              this.failed = false
              this.orderId = err.object.c_order_id
            } else {
              this.failed = true
              this.getOrderId()
            }
          })
        })
      },
      getTextCodeAgain () {
        this.checkValid(() => {
          pay.getSMSCode({
            orderId: this.orderId,
            payOrderId: this.payOrderId,
            payToken: this.payToken
          }).then(() => {
            this.$broadcast('startCount', true)
            this.haveGotSms = true
          })
        })
      },
      saveBankCardInfo () {
        this.checkValid(() => {
          if (!this.code) {
            alert('请输入验证码')
            return
          }
          this.toggleWaiting(true)
          pay.saveBindCardInfo({
            orderId: this.orderId,
            cardNum: this.cardNum.replace(/\s+/g, ''),
            tel: this.phone,
            idNum: this.idNum2,
            name: this.name,
            payOrderId: this.payOrderId,
            payToken: this.payToken,
            bankName: this.bankName,
            code: this.code
          }).then(() => {
            window._JHsdk.action({
              event: 'yhk_ac2'
            })
            this.toggleWaiting(false)
            feedback('已提交，正在等待银行校验结果')
            if (this.jjjh) {
              window.history.back()
            } else if (this.rebind) {
              this.$router.go({
                path: '/',
                replace: true
              })
            } else if (!this.pwdOk) {
              this.$router.go({
                path: '/preInputPayPwd/add',
                replace: true
              })
            } else if (!this.creditOk) {
              this.$router.go({
                path: '/updateCreditInfoMy',
                replace: true
              })
            } else {
              window.history.back()
            }
          }).catch((err) => {
            if (err.message.match('验证码') || err.code === 202) {
              this.failed = false
              alert('您输入的验证码有误，请重新输入')
            } else {
              // 不是验证码错误，就重新获取一个 orderId
              this.getOrderId()
            }
            this.toggleWaiting(false)
            this.isUsedText = 0
          })
        })
      },
      getOrderId () {
        return pay.getOrderId().then((json) => {
          this.orderId = json
        })
      },
      bindcardInit () {
        pay.getMyIdcard().then((json) => {
          this.binded = json.b_bind_card
          if (this.binded) {
            this.idNum = json.c_id_card_no
            this.name = json.c_name
          }
        })
      }
    },
    route: {
      data ({ to: { params: { pwdOk, creditOk, rebind, jjjh } } }) {
        window._JHsdk.action({
          event: 'yhk_ac1'
        })
        return {
          pwdOk: pwdOk === '1',
          creditOk: creditOk === '1',
          rebind: !!rebind,
          jjjh: !!jjjh,
        }
      }
    },
    created () {
      this.getOrderId()
      this.bindcardInit()
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/const";

  .row [slot=left] {
    min-width: 0;
    width: 90px;
  }

  .lastbtn {
    margin: 50px 0;
  }

  .warning {
    color: $MAIN_COLOR;;
  }

  .alert {
    color: $MINOR_COLOR;
  }
</style>
