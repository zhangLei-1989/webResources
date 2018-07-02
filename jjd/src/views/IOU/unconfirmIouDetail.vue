<template>
  <div v-if="showContent">
    <group :fixed="true"
           :btn="true"
           v-if="!isMine">
      <btn :cut="2"
           :text="'驳回'"
           :btn-fn="refuse">
      </btn>
      <btn :cut="2"
           :text="'确认'"
           :next="true"
           :btn-fn="showPwdFn">
      </btn>
    </group>
    <div class="fixed-box"
         v-else>
      <ele>
        <div>
          <button @click="deleteIou">删除</button>
          <button class="light"
                  @click="resend">再次发送

          </button>
        </div>
      </ele>
    </div>
    <pay-money :show="payShown"
               :fn="confirmIOU"
               :only-pwd="true"
               :iou="true"
               @change-info="changePayInfo"
               @success="success"
               @toggle-pay="togglePayShown"></pay-money>
    <group :first="true"
           v-if="!isMine">
      <ele>
        <div class="title-left"
             solt="left">
          <div class="user-icon"
               :style="{backgroundImage: 'url(' + imgSrc + ')'}"></div>
          <div class="user-info">
            <div class="basic-info">{{name}}</div>
            <div class="tel-bg">{{tel}}</div>
          </div>
        </div>
        <div class="title-right"
             solt="right">
          <btn :cut="1"
               :text="'信用报告'"
               :min="true"
               :btn-fn="creditReport"></btn>
        </div>
      </ele>
      <ele class="no-padding">
        <border-box :cut="3">
          <div solt="left"
               class="block">
            <div>待收金额</div>
            <div>{{forReceive}}<span>元</span></div>
          </div>
        </border-box>
        <border-box :cut="3">
          <div class="block">
            <div>待还金额</div>
            <div>{{forPay}}<span>元</span></div>
          </div>
        </border-box>
        <border-box :cut="3">
          <div solt="right"
               class="block">
            <div>正在担保金额</div>
            <div>{{guarantee}}<span>元</span></div>
          </div>
        </border-box>
      </ele>
    </group>
    <group :first="isMine">
      <ele>
        <div style="width: 100%">
          <ele style="padding: 0;">
            <div style="line-height:50px"
                 solt="left">
              <img class="detail"
                   src="../../assets/detail.svg">借款内容

            </div>
          </ele>
          <div class="row-a">
            <div>借款人</div>
            <div>{{borrower}}</div>
          </div>
          <div class="row-a">
            <div>出借人</div>
            <div>{{lender}}</div>
          </div>
          <div class="row-a">
            <div>借款金额</div>
            <div>{{money}}元</div>
          </div>
          <div class="row-a">
            <div>借款时间</div>
            <div>{{borrowTime}}</div>
          </div>
          <div class="row-a">
            <div>还款时间</div>
            <div>{{payBackTime}}</div>
          </div>
          <div class="row-a">
            <div>借款利率</div>
            <div>{{yearlyRate}}%</div>
          </div>
          <div class="row-a">
            <div>借款用途</div>
            <div>{{use}}</div>
          </div>
          <div class="row-a">
            <div>补充说明</div>
            <div v-if="!addReason">无</div>
            <div v-else
                 class="link"
                 @click="go('showPurpose')">点击查看

            </div>
          </div>
          <div class="row-a">
            <div>借款协议</div>
            <div class="link"
                 @click="goService">点击查看

            </div>
          </div>
        </div>
      </ele>
    </group>
    <group>
      <ele style="padding: 0;">
        <div class="row-b">
          <div class="row-a">订单编号：<span>{{iouId}}</span></div>
          <div class="row-a">创建时间：<span>{{createTime}}</span></div>
        </div>
      </ele>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import md5 from 'js-md5'
  import payMoney from 'components/output/payMoney'
  import borderBox from 'components/mixin/borderBox'
  import selector from 'components/mixin/selector'
  import iou from 'api/iou'
  import my from 'api/my'
  import pay from 'api/pay'
  import {
    setTempInfo,
    toggleNeedRefresh
  } from 'store/actions'
  import { alert, feedback, confirm } from 'tools/utils'
  import user from 'api/user'
//  import creditCenterUser from 'api/creditCenterUser'

  export default {
    vuex: {
      getters: {
        openId: state => state.userInfo.openId,
        firstTime: state => state.temp.cache.iouFirstTime,
        toRegist: state => state.toRegist,
        noTipLenderConfirm: state => state.temp.cache.noTipLenderConfirm,
        noTipBorrowerConfirm: state => state.temp.cache.noTipBorrowerConfirm
      },
      setters: {},
      actions: {
        setTempInfo,
        toggleNeedRefresh
      }
    },
    data () {
      return {
        anotherId: '',
        imgSrc: '',
        name: '',
        borrowAmt: '',
        tel: '',
        forReceive: '',
        forPay: '',
        guarantee: '',
        borrower: '',
        lender: '',
        money: '',
        borrowTime: '',
        payBackTime: '',
        yearlyRate: '',
        use: '',
        addReason: '',
        iouId: '',
        createTime: '',
        status: '',
        reportedTimes: '',
        isAuthenticate: '',
        isBindCard: '',
        isMine: 1,
        isBlackList: '',
        isSelfRole: 0,
        viewTime: -3,
        reasonList: [
          '发错人啦',
          '借条信息有误',
          '未全额收到款'
        ],
        payShown: false,
        pwd: '',
        showContent: false,
        alertImg: require('../../assets/warning.svg'),
        type: '',
        maxAmount22: 200000,
        idcard: '',
        allowIouAndBuy: true,
        creditOk: '', // 作为借款人是否可用
        b_lender_credit: '', // 作为借款人是否可用
        isCheckCredit: false, // 是否检测认证
        b_recover: '', // 运营商通道是否恢复
        b_skip: '', // 是否跳过运营商认证
      }
    },
    watch: {
      noTipLenderConfirm (e) {
        this.changeDot(e)
      },
      noTipBorrowerConfirm (e) {
        this.changeDot(e)
      }
    },
    methods: {
      getIouDetail () {
        iou.getPreIOUDetail({
          iouId: this.iouId,
          openId: 'o22hLxObC5CCeDBQO7XMgkm4E9o8'
//          openId: this.openId
        }).then((json) => {
          if (json.c_crt_id === json.c_lender_id) {
            this.name = json.c_lender_name // 出借人姓名
            this.imgSrc = json.c_lender_head // 出借人头像
            this.tel = json.c_lender_tel // 出借人手机号
            this.anotherId = json.c_lender_id
            this.type = 'lender'
          } else if (json.c_crt_id === json.c_borrower_id) {
            this.name = json.c_borrower_name // 借款人姓名
            this.imgSrc = json.c_borrower_head  // 借款人头像
            this.tel = json.c_borrower_tel // 借款人手机号
            this.anotherId = json.c_borrower_id
            this.type = 'borrower'
          }
          this.forReceive = json.n_to_receive_amt // 待收总额
          this.forPay = json.n_to_repay_amt // 待还总额
          this.guarantee = json.n_guarantee_amt // 担保总额
          this.borrower = json.c_borrower_name // 借款人姓名
          this.lender = json.c_lender_name // 借款人姓名
          this.money = json.n_amt // 借款人姓名
          this.borrowTime = json.t_borrow_tm // 借款时间
          this.payBackTime = json.t_repay_tm // 预期还款时间
          this.yearlyRate = json.n_interest_rate // 年利率
          this.use = json.c_purpose // 借款目的
          this.addReason = json.c_memo // 借款目的
          this.createTime = json.c_crt_tm // 创建时间
          this.status = json.n_status // iou状态 0.待确认1.驳回
          this.reportedTimes = json.n_creater_reported_cnt // 创建借条的人被举报次数
          this.isAuthenticate = json.b_self_credit // 自己是否认证过0.否1.是
          this.isBindCard = json.b_self_bind_card // 自己是否绑卡0.否1.是
          this.viewTime = json.n_first_viewer
          if (json.b_self_create === 1) {
            this.isMine = true
          } else {
            this.isMine = false
          }
          this.isBlackList = json.b_self_ban // 自己是否封杀状态0.否1.是
          this.setTempInfo({
            showPurpose: {
              addReason: json.c_memo,
              picUrls: json.l_pic_list
            }
          })
          this.showContent = true
          if (!this.isMine &&
            this.type === 'lender' && !this.noTipLenderConfirm) {
            this.riskWarning(this.type)
          } else if (!this.isMine &&
            this.type === 'borrower' && !this.noTipBorrowerConfirm) {
            this.riskWarning(this.type)
          }
          this.checkView()
        }).catch((response) => {
          if (response.code === 202) {
            this.$router.go({
              path: `/iouDetail/${this.iouId}`,
              replace: true
            })
          } else {
            this.$router.go({
              path: '/invalidIOU/2',
              replace: true
            })
          }
        })
      },
      getPayInfo () {
        pay.checkCredit().then((json) => {
          if (!this.cTel) {
            this.tel = json.c_telephone
          }
          this.creditOk = json.b_credit
          this.b_lender_credit = json.b_lender_credit
          if (this.creditOk) {
            this.judgeTime()
          } else {
            pay.checkOpration().then((res) => {
              this.b_recover = res.b_recover
              this.b_skip = res.b_skip
              if (this.b_lender_credit) {
                if (this.type === 'borrower') {
                  if (this.b_recover) {
                    this.checkOperatorWarn()
                  } else {
                    this.operatorNoRecoverWarn()
                  }
                } else if (this.type === 'lender') {
                  this.judgeTime()
                }
              } else {
                this.creditFailed()
              }
            })
          }
        })
      },
      creditFailed () {
        const that = this
        confirm(
          `<img src="${this.alertImg}"
                      style="width: 80px; margin-top: 10px">
                      <div style="text-align: left">您的信用认证已经失效 ,请先认证信用报告</div>`,
          '',
          [{
            text: '马上去认证',
            fn () {
              that.$router
                .go('/operatorInfo')
            },
          }, {
            text: '稍后认证',
          }]
        )
      },
      noPassOperator () {
        confirm(
          `<img src="${this.alertImg}"
                      style="width: 80px; margin-top: 10px">
                      <div style="text-align: left">您的信用报告缺失运营商数据 ,请先认证您的运营商数据</div>`,
          '',
          [{
            text: '马上去认证',
            fn () {
              this.$router
                .go('/operatorInfo')
            },
          }, {
            text: '稍后认证',
          }]
        )
      },
      checkOperatorWarn () {
        confirm(
          `<img src="${this.alertImg}"
                      style="width: 80px; margin-top: 10px">
                      <div style="color: #ED594E">请补充运营商认证</div>
                      <div style="text-align: left">您所在地区的运营商认证通道已恢复,请您及时补充认证,
                      认证运营商回提高您求款成功的可能性</div>`,
          '',
          [{
            text: '马上去认证',
            fn () {
              this.$router
                .go('/operatorInfo')
            },
          }, {
            text: '稍后认证',
          }]
        )
      },
      operatorNoRecoverWarn () {
        confirm(
          `<img src="${this.alertImg}"
                      style="width: 80px; margin-top: 10px">
                      <div style="text-align: left">由于您的运营商通道未恢复,您的信用报告缺失运营商数据,但不影响您的求借款功能</div>`,
          '',
          [{
            text: '知道了'
          }]
        )
      },
      needCredit () {
        confirm(
          `<img src="${this.alertImg}"
                      style="width: 80px; margin-top: 10px">
                      <div style="color: #ED594E">请认证信用报告</div>
                      <div style="text-align: left">您所在地区的运营商认证通道已恢复,请您及时补充认证,
                      认证运营商回提高您求款成功的可能性</div>`,
          '',
          [{
            text: '马上去认证',
            fn () {
              this.$router
                .go('/operatorInfo')
            },
          }, {
            text: '稍后认证',
          }]
        )
      },
      getBorrowAmt () {
        my.getBorrowAmt().then((json) => {
          this.borrowAmt = json.n_borrow_amt
          if (this.borrowAmt < this.maxAmount22) {
            const lastBorrow = this.maxAmount22 - this.borrowAmt
            // 剩余借款额度
            if (!this.allowIouAndBuy) {
              const that = this
              confirm(
                '补借条不能线上走账存在较大的风险，' +
                '所以平台不支持22岁以下的用户使用补借条功能，试试求借款吧~',
                '22岁以下用户请使用求借款',
                [{
                  text: '知道了'
                }, {
                  text: '求借款',
                  fn () {
                    that.$router.go('/createBid')
                  }
                }]
              )
            } else if (lastBorrow < this.money) {
              const that = this
              const needPay = this.money - lastBorrow
              // 需要还款额度
              confirm(
                `该借条金额超过了您的当前可借款额度(${lastBorrow}元)，
                                您至少需要还${needPay}元才能进行确认操作，
                                因为存在利息等费用实际还款金额一般会高于${needPay}元。`,
                '提示',
                [{
                  text: '取消'
                }, {
                  text: '马上还款',
                  fn () {
                    that.$router.go({
                      path: '/outList',
                      replace: true
                    })
                  }
                }]
              )
            } else {
              this.payShown = true
            }
          } else {
            const that = this
            const needPay = this.borrowAmt - this.maxAmount22 // 需要还款额度
            confirm(
              `该借条金额超过了您的当前可借款额度(0元)，
                            您至少需要还${needPay}元才能进行确认操作，
                            因为存在利息等费用实际还款金额一般会高于${needPay}元。`,
              '提示',
              [{
                text: '取消'
              }, {
                text: '马上还款',
                fn () {
                  that.$router.go({
                    path: '/outList',
                    replace: true
                  })
                }
              }]
            )
          }
        })
      },
      checkView () {
        if (this.viewTime === 0) {
          alert('该借条是转发借条，不是由发起人本人直接分享的，请您谨慎操作以免受骗')
        }
      },
      getBorrowAmt22 () {
        my.getMyCompleteIdcard().then((json) => {
          if (json.b_bind_card) {
            this.idcard = json.c_id_card_no
            const td = new Date()
            const y = td.getFullYear()
            let m = td.getMonth() + 1
            let d = td.getDate()
            if (m < 10) {
              m = `0${m}`
            }
            if (d < 10) {
              d = `0${d}`
            }
            const tdNumber = parseInt(`${y}${m}${d}`, 10)
            const bdNumber = parseInt(this.idcard.slice(6, 14), 10)
            if (tdNumber - bdNumber < 220000) {
//            this.maxAmount22 = 5000
              this.allowIouAndBuy = false
            }
          }
          this.getBorrowAmt()
        })
      },
      /* eslint-disable max-len */
      showReason () {
        if (this.toRegist) {
          setTimeout(() => {
            window._JHsdk.action({
              event: 'zc_ac1'
            })
            alert('请先完成注册')
            this.$router.go('/regist1')
          }, 300)
          return
        }
        const that = this
        confirm('<div v-for="record in reasonList"><div class="checkbox" @click.stop="choose(record)"></div></div>', '请选择驳回原因', [
          {
            text: '取消'
          }, {
            text: '确认驳回',
            fn () {
              that.refuse()
            }
          }
        ])
      },
      choose (e) {
        this.reason = e
      },
      showPwdFn () {
        if (this.toRegist) {
          setTimeout(() => {
            window._JHsdk.action({
              event: 'zc_ac1'
            })
            alert('请先完成注册')
            this.$router.go('/regist1')
          }, 300)
          this.getPayInfo()
          return
        }
      },
      judgeTime () {
        const lastTimeMS = new Date(this.borrowTime).getTime() - new Date(this.payBackTime).getTime()
        if (lastTimeMS > 31536000000) {
          const that = this
          confirm(
            '该笔交易借款时长超过1年，提醒您再次确认',
            '提示',
            [{
              text: '取消'
            }, {
              text: '确认借款时长无误',
              fn () {
                that.afterShowPwdFn()
              }
            }],
          )
        } else {
          this.afterShowPwdFn()
        }
      },
      afterShowPwdFn () {
        const that = this
        const alertImg = require('../../assets/warning.svg')

        confirm(
          `<img src="${alertImg}" style="width: 80px; margin-top: 10px">
                    <div style="color:#ED594E; text-align: left">
                    补借条是为已经完成的借贷行为补一张借条，不走帐，
                    仅作为电子凭证，请确保你们已经线下交易完毕</div>
                    <div style="text-align: left; margin-top:10px">
                    确认后，借条即刻生效，要确认该借条吗？</div>`,
          '',
          [{
            text: '取消'
          }, {
            text: '已交易成功，确认',
            fn () {
              if (that.isMine && that.type === 'borrower') {
//                that.getBorrowAmt22()
                that.getBorrowAmt()
              } else if (that.type === 'lender') {
                that.getBorrowAmt22()
//                that.getBorrowAmt()
              } else {
                that.payShown = true
              }
            }
          }]
        )
      },
      riskWarning (type) {
        let btnText = '今借到'
        let text = ''
        if (type === 'lender') {
          btnText = '去出借'
          text = '补借条不享受服务费和逾期管理费奖励政策，不能线上走账，不支持逾期催收，存在较大的风险，如果不是非常亲密的关系，建议您使用去出借功能'
        } else if (type === 'borrower') {
          btnText = '求借款'
          text = '补借条不能通过平台走账，存在较大的欺诈风险，<span style="color:#ED594E">请确保已经收到钱</span>再来补借条，如果不是非常亲密的关系，建议您使用求借款功能'
        }
        const that = this
        const noMore = document.createElement('div')
        const noMoreDot = document.createElement('div')
        noMoreDot.id = 'no-more-dot'
        noMoreDot.setAttribute('style', 'width:16px;height:16px;border:2px solid #ccc;border-radius:8px;position:absolute;top:2px;left:0')
        const noMoreText = document.createElement('div')
        noMoreText.setAttribute('style', 'padding-left:20px')
        noMoreText.textContent = '不再提示'
        noMore.appendChild(noMoreDot)
        noMore.appendChild(noMoreText)
        noMore.setAttribute('style', 'text-align:left;color:#999;margin-top:10px;position:relative')
        noMore.addEventListener('click', () => {
          this.noMoreTip(type)
        })
        confirm(
          `<img src="${that.alertImg}"
                    style="width: 80px; margin-top: 10px">
                    <div style="color:#ED594E">
                    补借条有风险，推荐${btnText}</div>
                    <div style="text-align: left; margin-top: 10px">
                    ${text}</div><div id="no-more-tip"></div>`,
          '',
          [{
            text: '我知道了'
          }]
        )
        this.$nextTick(() => {
          const noMoreTip = document.getElementById('no-more-tip')
          if (!noMoreTip.childNodes[0]) {
            noMoreTip.appendChild(noMore)
          }
        })
      },
      changeDot (e) {
        const dot = document.getElementById('no-more-dot')
        if (e) {
          dot.setAttribute('style', 'width:16px;height:16px;border:2px solid #ccc;border-radius:8px;position:absolute;top:2px;left:0;background-color:#000')
        } else {
          dot.setAttribute('style', 'width:16px;height:16px;border:2px solid #ccc;border-radius:8px;position:absolute;top:2px;left:0')
        }
      },
      /* eslint-enable max-len */
      noMoreTip (type) {
        if (type === 'lender') {
          user.saveCache({
            noTipLenderConfirm: !this.noTipLenderConfirm
          })
        } else if (type === 'borrower') {
          user.saveCache({
            noTipBorrowerConfirm: !this.noTipBorrowerConfirm
          })
        }
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
        this.toggleNeedRefresh(true)
        this.togglePayShown(false)
        if (e) {
          window._JHsdk.action({
            event: 'hx_ac9',
            params: {
              id: this.iouId,
            }
          })
          feedback('确认成功')
          this.$router.go({
            path: '/',
            replace: true
          })
        }
      },
      confirmIOU () {
        return iou.confirmIOU({
          id: this.iouId,
          pwd: md5(md5(this.pwd))
        })
      },
      refuse () {
        if (this.toRegist) {
          setTimeout(() => {
            window._JHsdk.action({
              event: 'zc_ac1'
            })
            alert('请先完成注册')
            this.$router.go('/regist1')
          }, 300)
          return
        }
        const that = this
        confirm('驳回后，该借条将会被马上删除，不能再操作。' +
          '确认驳回该借条吗？',
          '提醒',
          [{
            text: '不驳回'
          }, {
            text: '确认驳回',
            fn () {
              iou.refuseIOU({
                id: that.iouId,
                reason: ''
              }).then(() => {
                that.toggleNeedRefresh(true)
                feedback('驳回成功')
                that.$router.go({
                  path: '/',
                  replace: true
                })
              })
            }
          }
          ])
      },
      deleteIou () {
        const that = this
        confirm('借条删除后，相关记录也将一并清除，对方不能确认，借条不会生效。' +
          '确认删除该借条吗？',
          '提醒',
          [{
            text: '不删除'
          }, {
            text: '确认删除',
            fn () {
              iou.deleteIOU(that.iouId).then(() => {
                that.toggleNeedRefresh(true)
                feedback('删除成功')
                window.history.back()
              })
            }
          }
          ])
      },
      go (e) {
        this.$router.go(`/${e}`)
      },
      goService () {
        this.$router.go({
          path: '/iouService7/0',
          replace: false
        })
      },
      resend () {
        this.$router.go(`/shareQr/iou/0/${this.iouId}`)
      },
      creditReport () {
        if (this.toRegist) {
          window._JHsdk.action({
            event: 'zc_ac1'
          })
          alert('请先完成注册')
          this.$router.go('/regist1')
        } else {
          window._JHsdk.action({
            event: 'ck_ac3',
            params: {
              id: this.anotherId
            }
          })
          this.$router.go(`/creditReportSimpleMine/${this.anotherId}`)
        }
      }
    },
    created () {
    },
    components: {
      borderBox,
      selector,
      payMoney
    },
    route: {
      data ({ to: { query: { share }, params: { id } } }) {
        this.iouId = id
        if (!this.firstTime && share) {
          this.$router.go({
            path: `/iouOnce/${id}`,
            repalce: true
          })
        } else {
//                    this.getBorrowAmt()
          this.getIouDetail()
        }
      }
    }
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/function';

  .checkbox {
    @extend %radio-box;
  }

  .title-left {
    display: flex;
    flex-direction: row;
    padding: 15px 0;
    .user-info {
      padding: 5px;
      line-height: 20px;
      font-size: $MIN_FONT_SIZE;
      .basic-info {
        width: 70px;
        height: 20px;
        font-size: $TIP_FONT_SIZE;
      }
    }
  }

  .title-right {
    display: flex;
    button {
      width: 100% !important;
    }
  }

  .user-icon {
    height: 44px;
    width: 44px;
    border-radius: 100%;
    background-size: 44px 44px;
  }

  .title-right {
    display: flex;
    button {
      margin: 5px;
      padding: 0 5px 0 18px;
      width: 100% !important;
      background: {
        position: 3px;
        repeat: no-repeat;
        size: 12px 12px;
      }
    }

    button:first-child {
      background-image: url('../../assets/product.svg');
    }

    button:nth-child(2) {
      background-image: url('../../assets/creditInfo.svg');
      margin-right: 0;
    }
  }

  .block {
    height: 60px;
    text-align: center;
    padding: 10px 0;
    font-size: $MIN_FONT_SIZE;
    div {
      &:first-child {
        line-height: 20px;
        color: $TIP_COLOR;
      }
      &:last-child {
        line-height: 20px;
      }
    }
  }

  .detail {
    width: 22px;
    line-height: 20px;
  }

  img {
    position: relative;
    top: 4px;
  }

  .row-a {
    font-size: $TIP_FONT_SIZE;
    display: flex;
    height: 30px;
    line-height: 30px;
    justify-content: space-between;
    padding: 0;
    background-color: $ELE_W_COLOR;
    div {
      display: flex;
      flex-direction: column;
    }
  }

  .row-b {
    padding: 10px;
    line-height: 20px;
    width: 100%;
  }

  .link {
    color: $LINK_COLOR;
  }

  .tel-bg {
    background: url(../../assets/operators_main.svg) -3px center no-repeat;
    background-size: 15px 22px;
    padding: 0 0 0 15px;
  }

  .no-padding {
    padding: 0;
  }

  .fixed-box {
    @extend %fixed-box;
  }
</style>
