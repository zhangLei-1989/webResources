<template>
  <div>
    <backdrop :backdrop-show="show2"
              @toggle="toggle"></backdrop>
    <div class="pay"
         v-show="show2"
         transition="slide-bottom">
      <group :first="true">
        <ele>
          <div class="title">
            <div class="icon back"
                 :class="{close: currentStep == 'list' || onlyPwd}"
                 @click="back"></div>
            <div>{{title}}</div>
            <div class="icon info"
                 :class="{unvisible: currentStep != 'list'}"></div>
          </div>
        </ele>
      </group>
      <group :first="true"
             class="list-box slide-box"
             v-show="currentStep == 'list'"
             :transition="transitionName">
        <ele v-if="showTip">
          <div class="tips"
               v-if="showTipCode === 2">
            5月26日21:00至5月31日00:00浦发银行、5月27日21:00至5月28日10:00建设银行进行系统升级维护，维护期间请避免使用<span>建设银行</span>、<span>浦发银行卡</span>进行操作
          </div>
          <div class="tips"
               v-if="showTipCode === 1">
            2017年5月26日21:00至5月31日00:00浦发银行进行系统升级维护，维护期间请避免使用<span>浦发银行卡</span>进行操作
          </div>
        </ele>
        <ele>
          <div>交易账户</div>
          <div slot="right">{{tel}}</div>
        </ele>
        <ele :more="true"
             @click="go('choose')"
             v-if="editWay">
          <div>支付方式</div>
          <div slot="right">{{payWay}}</div>
        </ele>
        <ele :more="true"
             v-else>
          <div>支付方式</div>
          <div slot="right">{{payWay}}</div>
        </ele>
        <ele v-if="editAmount && !showCode">
          <div>支付金额</div>
          <input growing-track="true"
                 placeholder="请输入金额"
                 class="money"
                 slot="right"
                 type="number"
                 v-model="amount">
          <div slot="unit"
               class="money">元
          </div>
        </ele>
        <ele v-else>
          <div>支付金额</div>
          <div slot="right"
               class="money">{{amount}} 元
          </div>
        </ele>
        <div class="tip">
          <div v-if="editAmount && !showTip">支持部分还款，金额可修改</div>
        </div>
      </group>
      <group :first="true"
             class="slide-box payway-list"
             v-show="currentStep == 'choose'"
             :transition="transitionName">
        <ele v-for="way in payWayList">
          <div class="payWay"
               :class="{chosen: way.text == payWay}"
               @click="choose(way)">
            {{way.text}}
            <span v-if="way.text == '账户余额'">（{{availableMax}}元）</span>
          </div>
        </ele>
      </group>
      <group :first="true"
             class="slide-box"
             v-show="currentStep == 'pay'"
             :transition="transitionName">
        <ele class="key-board">
          <div>
            <div class="pwd-box"
                 v-show="!showCode">
              <div>
                <div class="numbers">
                  <border-box :cut="6"
                              v-for="dot in 6">
                    <div>
                      <div v-if="dot < password.length"
                           transition="scale"
                           class="dot"></div>
                    </div>
                  </border-box>
                </div>
                <div class="tip"
                     v-link="'/verifyIdcard&Bankcard'">忘记交易密码?
                </div>
              </div>
            </div>
            <div class="pwd-box"
                 v-show="showCode">
              <div class="code-box">
                <div class="numbers"
                     :class="{'fake-placeholder':!code}">
                  <border-box :cut="6"
                              class="new-code"
                              v-for="dot in 6">
                    <div>
                      <div v-if="dot < code.length"
                           class="code-dot">
                        {{code.split('')[dot]}}
                      </div>
                    </div>
                  </border-box>
                </div>
                <div class="tip"
                     :class="{gray: gettingCode}"
                     @click="getCode">
                  <span v-show="!gettingCode">重新获取验证码</span>
                  <span v-else>{{time}}秒后重新获取</span>
                </div>
                <div class="code-btn-box">
                  <btn :cut="1"
                       :next="true"
                       :btn-fn="toConfirmCode"
                       :text="'提交'"></btn>
                </div>
              </div>
            </div>
            <div class="keys"
                 @touchstart.stop.prevent="startPos"
                 @touchmove.stop.prevent="movePos"
                 @touchend.stop.prevent="endPos">
              <border-box :cut="3"
                          v-for="key in keys">
                <div class="key"
                     :class="{c:key=='AC',d:key=='d',hover:hoverKey==key}">{{key}}
                </div>
              </border-box>
            </div>
          </div>
        </ele>
      </group>
      <group :first="true"
             class="slide-box"
             v-show="currentStep == 'wait'"
             :transition="transitionName">
        <ele>
          <div class="success">
            <div class="icon"
                 v-show="ok || failed"
                 :class="{ok: ok, failed: failed}"></div>
            <div>{{payStatus}}</div>
            <pay-tips v-if="!ok && !failed"></pay-tips>
          </div>
        </ele>
      </group>
      <group :single="true"
             class="pay-btn"
             :transition="transitionName"
             v-show="currentStep == 'list'">
        <div class="tip"
             slot="tip_top">
          <ele>
            <div class="real-amount">
              <!--<div class="tips">由于支付通道维护,暂不支持<span>招商银行卡</span></div>-->
              <div>实际扣款<span>{{realAmount}}元</span>，含手续费<span>{{fee}}元</span></div>
              <div v-if="offlineFee || haveFee">
                <div>手续费明细如下：</div>
                <ol>
                  <li v-if="offlineFee">
                    补借条线上还款，扣除还款金额的5‰作为还款手续费（<span>{{offlineFee.toFixed(2)}}元</span>）
                  </li>
                  <li v-if="haveFee">交易金额低于500元，扣除手续费<span>2.50元</span></li>
                </ol>
              </div>
            </div>
          </ele>
        </div>
        <btn :text="'确认支付 ￥' + realAmount"
             :next="true"
             :cut="1"
             :btn-fn="toPayStep"></btn>
      </group>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import backdrop from 'components/basic/backdrop'
  import borderBox from 'components/mixin/borderBox.vue'
  import pay from 'api/pay'
  import iouApi from 'api/iou'
  import my from 'api/my'
  import creditCenterUser from 'api/creditCenterUser'
  import { alert, confirm } from 'tools/utils'
  import payTips from 'components/output/payTips'

  export default {
    props: [
      'show',
      'editAmount',
      'editWay',
      'amount',
      'fn',
      'confirmFn',
      'onlyPwd',
      'realAmount',
      'cTel',
      'iou',
      'wallet',
      'offlineFee',
      'offline',
      'bank',
      'repay',
      'orderId'
    ],
    vuex: {
      getters: {
        toRegist: state => state.toRegist
      },
      actions: {}
    },
    data () {
      return {
        show2: false,
        payWay: '账户余额',
        currentStep: 'list',
        password: '',
        showCode: false,
        code: '',
        clickBack: false,
        keys: [
          '1', '2', '3',
          '4', '5', '6',
          '7', '8', '9',
          'AC', '0', 'd'],
        hoverKey: '',
        x: '',
        y: '',
        payStatus: '',
        bankname: '',
        bankcard: '',
        tel: '',
        pwdOk: 0, // 作为借款人是否可用
        creditOk: 0,
        bindCard: 0,
        cardListLength: 0,
        payToken: '',
        payOrder: '',
        iouNum: 0,
        availableMax: 0,
        ok: false,
        failed: false,
        gettingCode: false,
        time: 30,
        bankcardList: [],
        chosenCardId: '',
        chosenCard: '',
        needRebind: false,
        nextOrderId: '',
        chosenOnce: false,
        showTip: false,
        showTipCode: 0,
        operatorInfoOk: false,
        b_lender_credit: '' // 作为出借人是否可用
      }
    },
    components: {
      backdrop,
      borderBox,
      payTips
    },
    computed: {
      transitionName () {
        if (this.clickBack) {
          return 'slide-out'
        }
        return 'slide-in'
      },
      title () {
        let t = '支付详情'
        switch (this.currentStep) {
          case 'choose':
            t = '支付方式'
            break
          case 'pay':
            if (this.showCode) {
              t = '输入短信验证码'
            } else {
              t = '输入交易密码'
            }
            break
          default:
            if (this.onlyPwd) {
              t = '验证交易密码'
            }
        }
        return t
      },
      payWayList () {
        const list = [{
          text: '账户余额',
          number: '',
          id: ''
        }]
        this.bankcardList.forEach((e) => {
          list.push({
            text: `${e.c_bank_name || '银行卡'}（尾号${e.c_bank_account}）`,
            number: e.c_bank_account,
            id: e.id
          })
        })
        return list
      },
      fee () {
        return (parseFloat(this.realAmount) -
        parseFloat(this.amount || 0)).toFixed(2)
      },
      haveFee () {
        const ra = parseFloat(this.realAmount || 0)
        const of = parseFloat(this.offlineFee || 0)
        const a = parseFloat(this.amount || 0)
        return !!(ra - of - a > 1)
      }
    },
    watch: {
      show (e) {
        this.ok = false
        this.failed = false
        this.needRebind = false
        if (e) {
          if (this.toRegist) {
            this.toggle()
            setTimeout(() => {
              window._JHsdk.action({
                event: 'zc_ac1'
              })
              alert('请先完成注册')
              this.$router.go('/regist1')
            }, 300)
          } else if (!this.bindCard && !this.cardListLength) {
            this.toggle()
            setTimeout(() => {
              alert('请绑定银行卡并设置交易密码')
              this.$router
                .go(`/bindBankCard/${this.pwdOk}/${this.creditOk}`)
            }, 300)
          } else if (!this.pwdOk) {
            this.toggle()
            setTimeout(() => {
              alert('请设置交易密码')
              this.$router.go('/preInputPayPwd/add')
            }, 300)
          } else if ((this.iou && this.iouNum < 1) || this.wallet) {
            this.show2 = e
          } else if (this.bank) { // 更改银行预留手机号
            this.show2 = e
          } else if (this.offline) {
            this.show2 = e
          } else if (this.repay) {
            this.show2 = e
          } else if (this.b_lender_credit === true) {
            this.show2 = e
          } else if ((!this.creditOk && !this.cTel) || (!this.creditOk && !this.cTel)) {
            this.toggle()
            if (this.creditWaiting) {
              setTimeout(() => {
                alert('信用报告正在生成中，大约需要 10 分钟，请注意查收微信推送消息。')
                this.getCreditList()
              }, 300)
            } else {
              let text = ''
              if (this.operatorInfoOk) {
                text = '您的信用认证已过期，请重新认证'
              } else {
                text = '请完善您的信用报告'
              }
              const that = this
              setTimeout(() => {
                window._JHsdk.action({
                  event: 'xy_ac1'
                })
                confirm(text, '提醒', [{
                  text: '马上认证',
                  fn () {
                    that.$router.go('/updateCreditInfoMy/0/0/0/0/0/0/0')
                  },
                }])
              }, 300)
            }
          } else {
            this.show2 = e
          }
        } else {
          this.show2 = e
        }
      },
      amount () {
        this.autoChoose()
      },
      payWay () {
        this.changeInfo()
      },
      cTel (e) {
        // 如果有通过信用中心接口得到电话，就不需要再次获得了
        if (e) {
          this.tel = e
        }
      }
    },
    methods: {
      autoChoose () {
        this.changeInfo()
        if (!this.chosenOnce) {
          const amt = parseFloat(this.amount) || 0
          const max = this.availableMax
          if (max >= amt && this.cTel) {
            this.payWay = '账户余额'
            this.chosenCardId = ''
          } else {
            const list = this.payWayList
            if (list[1]) {
              this.payWay = list[1].text
              this.chosenCardId = list[1].id
            }
          }
        }
      },
      getUserIOUCount () {
        iouApi.getUserIOUCount().then((json) => {
          this.iouNum = json || 0
        })
      },
      startCount () {
        this.gettingCode = true
        const count = setInterval(() => {
          if (this.time === 1) {
            clearInterval(count)
            this.time = 30
            this.gettingCode = false
          } else {
            this.time -= 1
          }
        }, 1000)
      },
      getCode () {
        if (this.gettingCode) return
        setTimeout(() => {
          this.startCount()
        }, 300)
        pay.getSMSCode({
          orderId: this.orderId,
          payToken: this.payToken,
          payOrderId: this.payOrder
        })
      },
      startPos (e) {
        const p = e.touches[0]
        this.x = p.clientX
        this.y = p.clientY
        this.inputNumbers()
      },
      movePos () {
      },
      endPos () {
        this.hoverKey = ''
      },
      inputNumbers () {
        const ww = window.innerWidth
        const wh = window.innerHeight
        const bw = ww / 3
        const bh = 50
        const x = this.x
        let num = ''
        let y = this.y
        y = wh - y
        if (x > 0 && x < bw) {
          if (y > 0 && y < bh) {
            num = 'c'
          } else if (y > bh && y < 2 * bh) {
            num = '7'
          } else if (y > 2 * bh && y < 3 * bh) {
            num = '4'
          } else if (y > 3 * bh && y < 4 * bh) {
            num = '1'
          }
        } else if (x > bw && x < 2 * bw) {
          if (y > 0 && y < bh) {
            num = '0'
          } else if (y > bh && y < 2 * bh) {
            num = '8'
          } else if (y > 2 * bh && y < 3 * bh) {
            num = '5'
          } else if (y > 3 * bh && y < 4 * bh) {
            num = '2'
          }
        } else if (x > 2 * bw && x < 3 * bw) {
          if (y > 0 && y < bh) {
            num = 'd'
          } else if (y > bh && y < 2 * bh) {
            num = '9'
          } else if (y > 2 * bh && y < 3 * bh) {
            num = '6'
          } else if (y > 3 * bh && y < 4 * bh) {
            num = '3'
          }
        }
        this.hoverKey = num
        if (num === 'd') {
          if (this.showCode) {
            this.code =
              this.code.substring(0, this.code.length - 1)
          } else {
            this.password =
              this.password.substring(0, this.password.length - 1)
          }
        } else if (num === 'c') {
          if (this.showCode) {
            this.code = ''
          } else {
            this.password = ''
          }
        } else if (this.showCode && this.code.length < 6) {
          this.code += num
        } else if (this.showCode && this.code.length >= 6) {
          return
        } else if (this.password.length < 5) {
          this.password += num
        } else {
          this.password += num
          this.toPay()
        }
      },
      back () {
        this.clickBack = true
        this.showCode = false
        this.password = ''
        this.code = ''
        this.$dispatch('back', true)
        if (this.onlyPwd) {
          this.payStatus = '正在验证，请不要离开'
        } else {
          this.payStatus = '正在支付，请不要离开'
        }
        if (this.currentStep === 'list' || this.onlyPwd) {
          this.$dispatch('toggle-pay', false)
        } else {
          this.currentStep = 'list'
        }
      },
      go (step) {
        this.password = ''
        this.clickBack = false
        this.currentStep = step
      },
      choose (e) {
        this.chosenOnce = true
        this.payWay = e.text
        this.chosenCard = e.number
        this.chosenCardId = e.id
        this.back()
      },
      toPayStep () {
        if (this.payWay === '账户余额'
          && parseFloat(this.realAmount)
          > parseFloat(this.availableMax)
        ) {
          alert('您的账户余额不足，请选择银行卡支付')
          return
        } else if (this.amount) {
          if (parseFloat(this.amount) > 0) {
            this.go('pay')
          } else {
            alert('请输入正确的还款金额')
          }
        }
      },
      reBind () {
        pay.reBindCard({
          orderId: this.nextOrderId,
          cardNum: this.chosenCardId,
          payOrderId: this.payOrder,
          payToken: this.payToken,
          code: this.code,
        }).then(() => {
          alert('请您输入新的短信验证码')
          this.needRebind = false
          this.code = ''
          this.toPay()
        }).catch(() => {
          this.needRebind = false
          this.code = ''
          this.faile()
        })
      },
      toConfirmCode () {
        if (this.needRebind) {
          this.reBind()
        } else if (this.code && this.code.length >= 4) {
          this.go('wait')
          this.confirmFn(this.code).then(() => {
            this.code = ''
            this.showCode = false
            this.success()
          }).catch((err) => {
            if (err.code === 202) {
              const that = this
              confirm('当前银行网络繁忙，支付结果最长需要24小时才能确认。' +
                '为了不影响您的使用，建议您绑定一张其他银行卡进行支付。' +
                '您多支付的费用最晚将会在下个工作日返还到您今借到的余额中',
                '提示',
                [{
                  text: '暂不绑卡',
                  fn () {
                    that.back()
                    that.code = ''
                    that.go('pay')
                  },
                }, {
                  text: '去绑卡',
                  fn () {
                    that.$router.go('/bindBankCard/0/0')
                  }
                }]
              )
            } else {
              this.back()
              this.code = ''
              this.go('pay')
            }
          })
        }
      },
      changeInfo () {
        this.$dispatch('change-info', {
          cardNum: this.chosenCardId,
          amount: parseFloat(this.amount) || '',
          payWay: this.payWay,
          password: this.password
        })
      },
      toPay () {
        this.changeInfo()
        this.$nextTick(() => {
          this.go('wait')
          this.fn().then((json) => {
            if (json && json.c_pay_token && json.c_pay_order_no) {
              this.showCode = true
              this.payToken = json.c_pay_token
              this.payOrder = json.c_pay_order_no
              this.$dispatch('confirm', {
                token: json.c_pay_token,
                order: json.c_pay_order_no
              })
              this.go('pay')
              this.startCount()
            } else {
              this.showCode = false
              this.success()
            }
          }).catch((err) => {
            if (err.code === 202) {
              this.faile()
              setTimeout(() => {
                this.toggle()
              }, 1000)
              alert('您输入的密码有误，请重新输入')
            } else if (err.code === 203) {
              this.needRebind = true
              this.nextOrderId = err.object.c_order_id
            } else if (err.code === 204) {
              this.nextOrderId = err.object.c_order_id
            } else {
              this.faile()
              setTimeout(() => {
                this.toggle()
              }, 1000)
            }
          })
        })
      },
      success () {
        if (this.onlyPwd) {
          this.payStatus = '验证成功'
          this.ok = true
          this.failed = false
        } else {
          this.payStatus = '支付成功'
          this.ok = true
          this.failed = false
        }
        setTimeout(() => {
          this.$dispatch('success', true)
          this.back()
          this.password = ''
        }, 2000)
      },
      faile () {
        if (this.onlyPwd) {
          this.payStatus = '验证失败'
          this.ok = false
          this.failed = true
        } else {
          this.payStatus = '支付失败'
          this.ok = false
          this.failed = true
        }
        setTimeout(() => {
          this.$dispatch('success', false)
          this.back()
          this.password = ''
          this.needRebind = false
        }, 2000)
      },
      toggle (e) {
        if (!e) {
          this.$dispatch('back', true)
          this.$dispatch('toggle-pay', false)
          this.showCode = false
          this.password = ''
          if (!this.onlyPwd) {
            this.go('list')
          } else {
            this.go('pay')
          }
        }
      },
      getPayInfo () {
        pay.checkCredit().then((json) => {
          if (!this.cTel) {
            this.tel = json.c_telephone
          }
          this.bankcardList = json.bank_list
          this.pwdOk = json.b_set_pwd ? 1 : 0
          this.creditOk = json.b_credit ? 1 : 0
          this.b_lender_credit = json.b_lender_credit
          this.bindCard = json.b_bind_card
          this.cardListLength = json.bank_list.length
        })
      },
      getCreditList () {
        creditCenterUser.getCreditList().then((json) => {
          if (!json) return
          this.creditWaiting = json.b_waiting_credit
          this.operatorInfoOk = json.b_mobile_info
        })
      },
      getWallet () {
        my.getMyAccountList().then((json) => {
          this.availableMax = json.n_amt
          this.autoChoose()
        })
      },
      ifShowTip () {
        const todayNow = Date.now()
        const startDay = new Date('2017-04-21T00:00+08:00').getTime()
        const endDay = new Date('2017-05-31T00:00+08:00').getTime()
        if (todayNow > startDay && todayNow < endDay) {
          this.showTip = true
          const endDay2 = new Date('2017-05-28T10:00+08:00').getTime()
          if (todayNow < endDay2) {
            this.showTipCode = 2
          } else {
            this.showTipCode = 1
          }
        }
      },
    },
    route: {},
    created () {
      this.getPayInfo()
      if (this.onlyPwd) {
        this.go('pay')
      }
      if (this.onlyPwd) {
        this.payStatus = '正在验证，请不要离开'
      } else {
        this.payStatus = '正在支付，请不要离开'
      }
      if (this.iou) {
        this.getUserIOUCount()
      }
      this.getCreditList()
      this.getWallet()
      this.ifShowTip()
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/fragment";

  .pay {
    @extend %fixed-bottom;
    background-color: white;
    height: 450px;
    z-index: 3;
  }

  .list-box {
    .row:last-child::after {
      width: calc(100% - 20px);
      left: 10px;
    }
  }

  .title {
    flex: 1;
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    .icon {
      @extend %title-icon;
      width: 40px;
      margin-right: 0;
    }
    .back {
      background: {
        image: url("../../assets/more.svg");
        size: 20px;
        position: right;
      }
      transform: rotate(180deg);
    }
    .close {
      background: {
        image: url("../../assets/close.svg");
        size: 16px;
        position: left;
      }
      transform: rotate(0deg);
    }
    .info {
      opacity: 0;
      background: {
        image: url("../../assets/info.svg");
        size: 20px;
        position: right;
      }
      transform: scale(1);
      transform-origin: 30px 15px;
      transition: .2s;
    }
  }

  .tips {
    font-size: $TIP_FONT_SIZE !important;
    span {
      color: $MINOR_COLOR !important;
    }
  }

  .tip {
    color: $TIP_COLOR;
    font-size: $TIP_FONT_SIZE;
    text-align: right;
    padding: 10px;
  }

  .payWay {
    flex: 1;
    position: relative;
    &.chosen::after {
      content: "";
      display: block;
      width: 12px;
      height: 20px;
      border: {
        top: 1px solid $MAIN_COLOR;
        left: 1px solid $MAIN_COLOR;
      }
      position: absolute;
      right: 10px;
      top: -2px;
      transform: rotate(-135deg);
    }
  }

  .unvisible {
    pointer-events: none;
    transform: scale(0) !important;
  }

  .slide-in {
    &-transition {
      transition: .3s;
    }
    &-enter {
      transform: translateX(100%);
    }
    &-leave {
      transform: translateX(-100%);
    }
  }

  .slide-out {
    &-transition {
      transition: .3s;
    }
    &-enter {
      transform: translateX(-100%);
    }
    &-leave {
      transform: translateX(100%);
    }
  }

  .slide-bottom {
    &-transition {
      transition: .3s;
    }
    &-enter {
      transform: translateY(100%);
    }
    &-leave {
      transform: translateY(100%);
    }
  }

  .slide-box {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
  }

  .key-board {
    padding: 0;
    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      .pwd-box {
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        > div {
          width: 300px;
        }
        > .code-box {
          width: 200px;
        }
        .numbers {
          display: flex;
          position: relative;
          &::before {
            @extend %btn-border;
            border: {
              left: 1px solid $BORDER_COLOR;
              right: 1px solid $BORDER_COLOR;
            }
          }
          div {
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .dot {
            width: 10px;
            height: 10px;
            border-radius: 5px;
            background-color: black;
          }
          .code-dot {
            width: 20px;
            height: 20px;
            font-size: $LARGE_FONT_SIZE;
          }
        }
      }
      .keys {
        height: 200px;
        width: 100%;
        overflow: hidden;
        /*display: flex;*/
        /*flex-wrap: wrap;*/
        .key {
          height: 50px;
          font-size: $LARGE_FONT_SIZE;
          text-align: center;
          line-height: 50px;
        }
        .hover {
          position: relative;
          &::before {
            @extend %active-drop
          }
        }
        .d,
        .c {
          color: transparent;
          background: #D1D5DB url("../../assets/delete.svg") center no-repeat {
            size: 30px;
            position: center;
          }
        }
        .c {
          background-image: url("../../assets/ac.svg");
        }
      }
    }
    .tip {
      padding: 10px 0;
      color: $MAIN_COLOR;
    }
  }

  .success {
    flex: 1;
    display: flex;
    height: 400px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
      width: 100px;
      height: 100px;
      background: center no-repeat {
        size: 60px;
      }
      opacity: 0;
      transform: translateX(50%);
      transition: 0.3s;
      &.ok {
        background-image: url("../../assets/payOK.svg");
        transform: translateX(0);
        opacity: 1;
      }
      &.failed {
        background-image: url("../../assets/payFailed.svg");
        transform: translateX(0);
        opacity: 1;
      }
    }
  }

  .pay-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    &::after {
      display: none !important;
    }
  }

  .real-amount {
    padding: 0 10px;
    text-align: left;
    span {
      color: $MAIN_COLOR;
    }
    ol {
      padding-left: 18px;
      margin: 2px 0 0;
    }
    > :first-child {
      font-size: $BASE_FONT_SIZE;
      margin-bottom: 5px;
    }
  }

  .money {
    font-weight: 500;
  }

  .gray {
    color: $TIP_COLOR !important;
  }

  .scale {
    &-transition {
    }
    &-enter {
      animation: scaleIn .2s;
    }
    &-leave {
      animation: scaleOut .2s;
    }
  }

  .payway-list {
    height: 400px;
    overflow-y: scroll;
  }

  .new-code {
    background: none !important;
  }

  .code-btn-box {
    display: flex;
    justify-content: center;
    button {
      width: 100% !important;
    }
  }

  .fake-placeholder {
    position: relative;
    &::after {
      content: "4 - 6 位验证码";
      width: 200px;
      position: absolute;
      left: 0;
      top: 0;
      text-align: center;
      line-height: 50px;
      color: $TIP_COLOR;
    }
  }
</style>
