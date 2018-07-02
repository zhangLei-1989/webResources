<template>
  <div>
    <div v-if="loading"
         class="title">正在加载信用中心
    </div>
    <group :single="true"
           v-if="inProgress"
           :fixed="true">
      <btn :text="'保存'"
           :cut="1"
           :next="true"
           :btn-fn="toBuy"></btn>
    </group>
    <group :first="true"
           v-if="!loading">
      <ele :more="true"
           :link="'/baseInfo/1'">
        <div slot="left">
          <img src="../../assets/basicInfo.svg"
               v-if="baseInfoOk">
          <img src="../../assets/basicInfo_g.svg"
               v-else>
          <span>基础信息</span>
        </div>
        <div slot="right">
          <span v-if="baseInfoOk">更新于</span>
          <span>{{getTimeText(baseInfoUpdateTime)}}</span>
        </div>
      </ele>
      <ele :more="true"
           v-if="!skipZhima"
           @click="toZhima()">
        <div slot="left">
          <img v-if="zhimaInfoOk"
               src="../../assets/zhimainfo.svg">
          <img v-else
               src="../../assets/zhimainfo_g.svg">
          <span>芝麻信用</span>
        </div>
        <div slot="right">
          <span v-if="zhimaInfoOk">更新于</span>
          <span>{{getTimeText(zhimaInfoUpdateTime)}}</span>
        </div>
      </ele>
      <ele :more="true"
           v-else>
        <div slot="left">
          <img src="../../assets/zhimainfo_g.svg">
          <span>芝麻信用</span>
        </div>
        <div slot="right">
          该项2017年1月1日恢复认证
        </div>
      </ele>
      <ele :more="true"
           @click="toZhima()">
        <div slot="left">
          <img v-if="operatorInfoOk"
               src="../../assets/simpleTel.svg">
          <img v-else
               src="../../assets/operators_g.svg">
          <span>运营商</span>
        </div>
        <div slot="right">
          <span v-if="operatorInfoOk">更新于</span>
          <span>{{getTimeText(operatorInfoUpdateTime)}}</span>
        </div>
      </ele>
      <ele :more="true"
           v-if="jingdongApiOk"
           @click="toZhima()">
        <div slot="left">
          <img src="../../assets/jingdong.svg"
               v-if="jingdongInfoOk">
          <img src="../../assets/jingdong_g.svg"
               v-else>
          <span>京东</span>
        </div>
        <div slot="right">
          <span v-if="jingdongInfoOk">更新于</span>
          <span>{{getTimeText(jingdongInfoUpdateTime)}}</span>
        </div>
      </ele>
      <ele :more="true"
           v-if="!jingdongApiOk">
        <div slot="left">
          <img src="../../assets/jingdong_g.svg">
          <span>京东</span>
        </div>
        <div slot="right">
          认证通道升级中
        </div>
      </ele>
    </group>
    <div class="row-a"
         v-if="!loading && !inProgress">以下信息为非必填项
    </div>
    <group v-if="!loading">
      <ele :more="true"
           v-if="needXuexin && xuexinApiOk"
           :link="'/xuexinInfo'">
        <div slot="left">
          <img src="../../assets/xuexin.svg"
               v-if="xuexinInfoOk">
          <img src="../../assets/xuexinGray.svg"
               v-else>
          <span>学信网</span>
        </div>
        <div slot="right">
          <span v-if="xuexinInfoOk">更新于</span>
          <span>{{getTimeText(xuexinInfoUpdateTime)}}</span>
        </div>
      </ele>
      <ele :more="true"
           v-if="needXuexin && !xuexinApiOk">
        <div slot="left">
          <img src="../../assets/xuexinGray.svg">
          <span>学信网</span>
        </div>
        <div slot="right">
          认证通道升级中
        </div>
      </ele>
      <ele :more="true"
           v-if="needZhengxin && zhengxinApiOk"
           :link="'/zhengxinInfo'">
        <div slot="left">
          <img src="../../assets/bankCredit.svg"
               v-if="zhengxinInfoOk">
          <img src="../../assets/bankCreditGray.svg"
               v-else>
          <span>人行征信</span>
        </div>
        <div slot="right">
          <span v-if="zhengxinInfoOk">更新于</span>
          <span>{{getTimeText(zhengxinInfoUpdateTime)}}</span>
        </div>
      </ele>
      <ele :more="true"
           v-if="needZhengxin && !zhengxinApiOk">
        <div slot="left">
          <img src="../../assets/bankCreditGray.svg">
          <span>人行征信</span>
        </div>
        <div slot="right">
          认证通道升级中
        </div>
      </ele>
      <ele :more="true"
           v-if="needJob"
           :link="'/jobInfo'">
        <div slot="left">
          <img src="../../assets/jobInfo.svg"
               v-if="jobInfoOk">
          <img src="../../assets/jobInfoGray.svg"
               v-else>
          <span>工作信息</span>
        </div>
        <div slot="right">
          <span v-if="jobInfoOk">更新于</span>
          <span>{{getTimeText(jobInfoUpdateTime)}}</span>
        </div>
      </ele>
      <ele :more="true"
           v-if="needIncome"
           :link="'/incomeInfo'">
        <div slot="left">
          <img src="../../assets/incomeInfo.svg"
               v-if="incomeInfoOk">
          <img src="../../assets/incomeInfoGray.svg"
               v-else>
          <span>收入信息</span>
        </div>
        <div slot="right">
          <span v-if="incomeInfoOk">更新于</span>
          <span>{{getTimeText(incomeInfoUpdateTime)}}</span>
        </div>
      </ele>
      <ele :more="true"
           v-if="needCar"
           :link="'/carInfo'">
        <div slot="left">
          <img src="../../assets/car.svg"
               v-if="carInfoOk">
          <img src="../../assets/carGray.svg"
               v-else>
          <span>车产</span>
        </div>
        <div slot="right">
          <span v-if="carInfoOk">更新于</span>
          <span>{{getTimeText(carInfoUpdateTime)}}</span>
        </div>
      </ele>
      <ele :more="true"
           v-if="needHouse"
           :link="'/houseInfo'">
        <div slot="left">
          <img src="../../assets/house.svg"
               v-if="houseInfoOk">
          <img src="../../assets/houseGray.svg"
               v-else>
          <span>房产</span>
        </div>
        <div slot="right">
          <span v-if="houseInfoOk">更新于</span>
          <span>{{getTimeText(houseInfoUpdateTime)}}</span>
        </div>
      </ele>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import user from 'api/creditCenterUser'
  import pay from 'api/pay'
  import { setCreditCenter } from 'store/actions'
  import { alert, confirm } from 'tools/utils'

  export default {
    vuex: {
      getters: {
        tel: state => state.userInfo.tel
      },
      actions: {
        setCreditCenter
      }
    },
    data () {
      return {
        jingdongApiOk: window.location.hostname === 'test.aizhantai.com' || window.location.hostname === 'jjd.renrenxin.com',
        xuexinApiOk: true,
        zhengxinApiOk: true,
        buyId: '',
        baseInfoOk: false,
        baseInfoUpdateTime: '待完善',
        zhimaInfoOk: false,
        zhimaInfoUpdateTime: '待完善',
        operatorInfoOk: false,
        operatorInfoUpdateTime: '待完善',
        jingdongInfoOk: false,
        jingdongInfoUpdateTime: '待完善',
        xuexinInfoOk: false,
        xuexinInfoUpdateTime: '待完善',
        zhengxinInfoOk: false,
        zhengxinInfoUpdateTime: '待完善',
        jobInfoOk: false,
        jobInfoUpdateTime: '待完善',
        incomeInfoOk: false,
        incomeInfoUpdateTime: '待完善',
        carInfoOk: false,
        carInfoUpdateTime: '待完善',
        houseInfoOk: false,
        houseInfoUpdateTime: '待完善',
        paidCredit: false,
        recvBank: false,
        loading: true,
        inProgress: false,
        needXuexin: 1,
        needZhengxin: 1,
        needJob: 1,
        needIncome: 1,
        needCar: 1,
        needHouse: 1,
        bindOk: true,
        skipZhima: true
      }
    },
    computed: {
      needInfoError () {
        const list = []
        if (Boolean(this.needXuexin) > this.xuexinInfoOk) {
          list.push('请完善您的学信信息')
        }
        if (Boolean(this.needZhengxin) > this.zhengxinInfoOk) {
          list.push('请完善您的征信信息')
        }
        if (Boolean(this.needJob) > this.jobInfoOk) {
          list.push('请完善您的工作信息')
        }
        if (Boolean(this.needIncome) > this.incomeInfoOk) {
          list.push('请完善您的收入信息')
        }
        if (Boolean(this.needCar) > this.carInfoOk) {
          list.push('请完善您的车产信息')
        }
        if (Boolean(this.needHouse) > this.houseInfoOk) {
          list.push('请完善您的房产信息')
        }
        return list
      }
    },
    methods: {
      toZhima () {
        if (this.paidCredit) {
          if (this.skipZhima) {
            this.$router.go('/operatorInfo')
          } else {
            this.$router.go('/zhimaInfo')
          }
        } else {
          const that = this
          confirm(
            '该项认证需要付费，确认去支付吗？',
            '提醒',
            [{
              text: '取消'
            }, {
              text: '去支付',
              fn () {
                that.$router.go('/payCredit')
              }
            }]
          )
        }
      },
      go (url) {
        if (this.paidCredit) {
          this.$router.go(url)
        } else {
          const that = this
          confirm(
            '该项认证需要付费，确认去支付吗？',
            '提醒',
            [{
              text: '取消'
            }, {
              text: '去支付',
              fn () {
                that.$router.go('/payCredit')
              }
            }]
          )
        }
      },
      payInit () {
        return user.payInit()
      },
      getCreditList () {
        return user.getCreditList()
      },
      getPayInfo () {
        return pay.checkCredit()
      },
      promiseAll () {
        Promise.all([
          this.payInit(),
          this.getCreditList(),
          this.getPayInfo()
        ]).then(([json1, json2, json3]) => {
          this.paidCredit = json1.b_paid
          this.recvBank = json1.b_recv_bank
          this.bindOk = json3.b_bind_card
          if (!json2) return
          if (json2.b_base_info &&
            json2.b_zhima_credit &&
            json2.b_mobile_info &&
            json2.b_jingdong_info
          ) {
            this.setCreditCenter({
              first: false,
              updateBaseInfo: true
            })
          } else {
            this.setCreditCenter({
              first: true,
              updateBaseInfo: false
            })
          }
          if (json2.b_waiting_credit) {
            let text = ''
            if (this.inProgress) {
              text = '信用报告正在生成中，大约需要 10 分钟，请注意查收微信推送消息。' +
                '认证成功后即可进行出借和借款。'
            } else {
              text = '信用报告正在生成中，大约需要 10 分钟，请注意查收微信推送消息。'
            }
            confirm(
              text,
              '提醒',
              [{
                text: '知道了',
                fn () {
                  window.history.back()
                }
              }],
              true
            )
            return
          } else if (!json3.bank_list || !json3.bank_list.length) {
            // 没有绑过卡
            this.$router.go({
              path: `/bindBankCard/${
                json2.b_set_pwd ? 1 : 0}/${
                json2.b_credit ? 1 : 0}`,
              replace: true
            })
            return
          } else if (!json2.b_zhima_credit) {
            // 没有授信过
            if (!this.paidCredit) {
              // 没授信过, 也没交过钱
              this.$router.go({
                path: '/noCredit',
                replace: true
              })
            } else if (!this.bindOk && !this.recvBank) {
              // 没授信过，交了钱，没回盘
              const that = this
              confirm('您的支付没有成功，建议重新支付，' +
                '如果上次已经扣款成功，平台会在第二个工作日' +
                '将您多支付的款项存入您的账户余额',
                '提示',
                [{
                  text: '不支付',
                  fn () {
                    setTimeout(() => {
                      that.$router.go({
                        path: '/baseInfo',
                        replace: true
                      })
                    }, 300)
                  }
                }, {
                  text: '重新支付',
                  fn () {
                    setTimeout(() => {
                      that.$router.go({
                        path: '/payCredit/1',
                        replace: true
                      })
                    }, 300)
                  }
                }])
            } else {
              // 没授信过, 交了一次钱, 但是交了就走了
              this.$router.go({
                path: '/baseInfo',
                replace: true
              })
            }
            return
          } else if (!json2.b_credit && !this.paidCredit) {
            // 授信过, 过期了，也没交过钱
            this.$router.go({
              path: '/noCredit',
              replace: true
            })
            return
          } else if (this.paidCredit && !this.recvBank) {
            // 授信过，交了钱，没回盘
            const that = this
            confirm('您的支付没有成功，建议重新支付，' +
              '如果上次已经扣款成功，平台会在第二个工作日' +
              '将您多支付的款项存入您的账户余额',
              '提示',
              [{
                text: '不支付'
              }, {
                text: '重新支付',
                fn () {
                  setTimeout(() => {
                    that.$router.go({
                      path: '/payCredit/1',
                      replace: true
                    })
                  }, 300)
                }
              }])
            return
          }
          // 授信过, 交了一次钱, 但是交了之后没用掉此次更新机会
          this.loading = false
          this.baseInfoOk = json2.b_base_info
          this.baseInfoUpdateTime = json2.t_base_upd_tm
          this.zhimaInfoOk = json2.b_zhima_credit
          this.zhimaInfoUpdateTime = json2.t_zhima_credit_upd_tm
          this.operatorInfoOk = json2.b_mobile_info
          this.operatorInfoUpdateTime = json2.t_mobile_upd_tm
          this.jingdongInfoOk = json2.b_jingdong_info
          this.jingdongInfoUpdateTime = json2.t_jingdong_upd_tm
          this.xuexinInfoOk = json2.b_xuexin_info
          this.xuexinInfoUpdateTime = json2.t_xuexin_upd_tm
          this.zhengxinInfoOk = json2.b_zhengxin_info
          this.zhengxinInfoUpdateTime = json2.t_zhengxin_upd_tm
          this.jobInfoOk = json2.b_job_info
          this.jobInfoUpdateTime = json2.t_job_upd_tm
          this.incomeInfoOk = json2.b_income_info
          this.incomeInfoUpdateTime = json2.t_income_upd_tm
          this.carInfoOk = json2.b_car_info
          this.carInfoUpdateTime = json2.t_car_upd_tm
          this.houseInfoOk = json2.b_house_info
          this.houseInfoUpdateTime = json2.t_house_upd_tm
        })
      },
      getTimeText (t) {
        if (!t) {
          return '待完善'
        }
        const d = new Date(t)
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
      },
      toBuy () {
        if (this.buyId === '0') {
          window.history.back()
        } else if (this.needInfoError.length > 0) {
          let errors = ''
          this.needInfoError.forEach((err) => {
            errors += `${err}<br>`
          })
          alert(errors)
        } else {
          this.$router.go({
            path: `/buy/${this.buyId}/1`,
            replace: true
          })
        }
      }
    },
    components: {},
    created () {
      // 2017-1-1 不要跳过芝麻信用
      const today = Date.now()
      const startDay = new Date('2017-01-01T02:00+08:00').getTime()
//            const endDay = new Date('2016-12-19T10:00+08:00').getTime()
      if (today > startDay) {
        this.skipZhima = false
      }
    },
    route: {
      data ({ to: { params: { id, p1, p2, p3, p4, p5, p6 } } }) {
        if (id || p1 || p2 || p3 || p4 || p5 || p6) {
          this.inProgress = true
          this.buyId = id
          this.needCar = parseInt(p1, 10)
          this.needHouse = parseInt(p2, 10)
          this.needJob = parseInt(p3, 10)
          this.needIncome = parseInt(p4, 10)
          this.needXuexin = parseInt(p5, 10)
          this.needZhengxin = parseInt(p6, 10)
        }
        this.promiseAll()
      }
    }
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/function';

  .row-a {
    font-size: $TIP_FONT_SIZE;
    margin: 10px 0 0 10px;
  }

  [slot=right] {
    font-size: $TIP_FONT_SIZE;
  }

  [slot=left] {
    span {
      padding-left: 10px;
      line-height: 50px;
    }
    img {
      position: relative;
      top: 7px;
      width: 25px;
    }
  }

  .title {
    width: 100%;
    text-align: center;
    line-height: 300px;
  }
</style>
