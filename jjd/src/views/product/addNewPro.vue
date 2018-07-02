<template>
  <div>
    <pay-money :show="payShown"
               :fn="addNewProduct"
               :only-pwd="true"
               @change-info="changePayInfo"
               @success="success"
               @toggle-pay="togglePayShown"></pay-money>
    <backdrop :backdrop-show="fixedSelectorShown"
              @toggle="toggleFixedSelectorShown"></backdrop>
    <group class="fixed-selector"
           v-show="fixedSelectorShown"
           transition="slide-in">
      <ele>
        <div class="reasons">
          <div v-for="ele in infoList"
               :class="{chosen: needInfo.includes(ele)}"
               track-by="$index"
               @click="choose(ele)">{{ele.name}}
          </div>
        </div>
      </ele>
      <ele>
        <div class="button"
             @click="toggleFixedSelectorShown(false)">确认
        </div>
      </ele>
    </group>
    <group :single="true"
           :fixed="true">
      <btn :cut="1"
           :next="true"
           :text="'确认发布'"
           :btn-fn="showPwdFn"></btn>
    </group>
    <selector :value-list="selectList"
              :show="selectorShow1"
              :default-data="selectorValue1"
              @toggle="toggleSelectorShown1"
              @set-data="setSelector1"></selector>
    <selector :value-list="selectList"
              :show="selectorShow2"
              :default-data="selectorValue2"
              @toggle="toggleSelectorShown2"
              @set-data="setSelector2"></selector>
    <selector :value-list="selectList2"
              :show="selectorShow3"
              :default-data="selectorValue3"
              @toggle="toggleSelectorShown3"
              @set-data="setSelector3"></selector>
    <selector :value-list="selectList2"
              :show="selectorShow4"
              :default-data="selectorValue4"
              @toggle="toggleSelectorShown4"
              @set-data="setSelector4"></selector>
    <selector :value-list="moneyList"
              :show="moneyShow"
              :default-data="money"
              @toggle="toggleMoneyShown"
              @set-data="setMoney"></selector>
    <selector :value-list="payWayList"
              :show="payWayShow"
              :default-data="payWayValue"
              @toggle="togglePayWayShown"
              @set-data="setPayWay"></selector>
    <selector :value-list="yearlyRateList"
              :show="yearlyRateShow"
              :default-data="yearlyRateValue"
              @toggle="toggleYearlyRateShown"
              @set-data="setYearlyRate"></selector>
    <selector :value-list="serviceRateList"
              :show="serviceRateShow"
              :default-data="serviceRateValue"
              @toggle="toggleServiceRateShown"
              @set-data="setServiceRate"></selector>
    <selector :value-list="minServiceList"
              :show="minServiceShow"
              :default-data="minServiceValue"
              @toggle="toggleMinServiceShown"
              @set-data="setMinService"></selector>
    <group :first="true">
      <!--<ele>-->
      <!--<div slot="left">借款金额</div>-->
      <!--<input growing-track="true" placeholder="100"-->
      <!--v-model="minMoney"-->
      <!--style="width:60px;text-align:right">-->
      <!--<span>至</span>-->
      <!--<div slot="right">-->
      <!--<input growing-track="true" class="min-input"-->
      <!--placeholder="200000"-->
      <!--v-model="maxMoney"-->
      <!--style="width:60px;text-align:left">-->
      <!--</div>-->
      <!--<div slot="unit">元</div>-->
      <!--</ele>-->
      <ele :more="true"
           @click="showMoney">
        <div>借款金额</div>
        <div slot="right">
          <div>{{moneyValue}}
          </div>
        </div>
      </ele>
      <ele :more="true"
           @click="showPayWay">
        <div>还款方式</div>
        <div slot="right">
          <div>{{payWayValue}}
          </div>
        </div>
      </ele>
      <ele v-if="payWayValue=='到期还本付息'">
        <div>借款时长</div>
        <div slot="right"
             class="time-length">
          <div @click="showSelector1">{{selectorValue1}}
          </div>
          <span>至</span>
          <div>
            <div @click="showSelector2">{{selectorValue2}}
            </div>
          </div>
        </div>
      </ele>
      <ele v-if="payWayValue=='等额本息'">
        <div>分期次数</div>
        <div slot="right"
             class="time-length">
          <div @click="showSelector3">{{selectorValue3}}
          </div>
          <span>至</span>
          <div>
            <div @click="showSelector4">{{selectorValue4}}
            </div>
          </div>
        </div>
      </ele>
      <ele :more="true"
           @click="showYearlyRate">
        <div>年化利率</div>
        <div slot="right">
          <div>{{yearlyRateValue}}
          </div>
        </div>
      </ele>
      <ele :more="true"
           @click="showServiceRate">
        <div class="tip-box">
          <span>服务费率</span>
          <span class="tip-alert"
                @click.stop.prevent="tipAlertFee"></span>
        </div>
        <div slot="right">
          <div>{{serviceRateValue}}
          </div>
        </div>
      </ele>
      <ele :more="true"
           @click="showMinService">
        <div class="tip-box">
          <span>服务费最低额度</span>
        </div>
        <div slot="right">
          <div>{{minServiceValue}}
          </div>
        </div>
      </ele>
      <!--<ele>-->
      <!--<div>服务费最低额度</div>-->
      <!--<div slot="right">-->
      <!--<input growing-track="true" placeholder="请输入整数"-->
      <!--v-model="minService">-->
      <!--</div>-->
      <!--<div slot="unit">元</div>-->
      <!--</ele>-->
    </group>
    <group>
      <ele :more="true"
           @click="toggleFixedSelectorShown(true)">
        <div slot="left">必备信用资料</div>
        <div slot="right">
          <span v-if="needInfo.length < 1">点击选择</span>
          <span v-else>{{needInfo[0].name}}等{{needInfo.length}}项</span>
        </div>
      </ele>
    </group>
    <group>
      <ele>
        <div slot="left">补充说明</div>
      </ele>
      <ele>
                <textarea growing-track="true"
                          placeholder="不超过40字，例如需要面谈等"
                          maxlength="40"
                          v-model="addText"></textarea>
      </ele>
    </group>
    <group :first="true">
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
  </div>
</template>
<script type="text/ecmascript-6">
  import selector from 'components/mixin/selector'
  import prod from 'api/prod'
  import pay from 'api/pay'
  import backdrop from 'components/basic/backdrop'
  import {
    alert,
    feedback
  } from 'tools/utils'
  import {
    toggleNeedRefresh,
    setTempInfo
  } from 'store/actions'
  import payMoney from 'components/output/payMoney'
  import md5 from 'js-md5'

  export default {
    vuex: {
      getters: {
        addNewPro: state => state.temp.addNewPro
      },
      actions: {
        toggleNeedRefresh,
        setTempInfo
      }
    },
    data () {
      return {
        orderId: '',
        minMoney: 300, // 最小借款额度
        maxMoney: 1000, // 最大借款额度
        minTime: '', // 最短借款时间
        maxTime: '', // 最长借款时间
        yearlyRate: '', // 年利率
        minService: '0', // 最低服务费
        serviceRate: '', // 服务费率
        addText: '', // 补充说明
        xuexin: 0, // 是否需要学信信息
        zhengxin: 0, // 是否需要征信信息
        car: 0, // 是否需要车辆信息
        house: 0, // 是否需要房产信息
        jobInfo: 0, // 是否需要工作信息
        incomeInfo: 0, // 是否需要收入信息
        selectorShow1: false,
        selectorShow2: false,
        selectorShow3: false,
        selectorShow4: false,
        moneyShow: false,
        payWayShow: false,
        yearlyRateShow: false,
        serviceRateShow: false,
        minServiceShow: false,
        selectorValue1: '3个月',
        selectorValue2: '12个月',
        selectorValue3: '3期',
        selectorValue4: '12期',
        moneyValue: '300 - 1000元',
        payWayValue: '到期还本付息',
        yearlyRateValue: '12%',
        serviceRateValue: '0%',
        minServiceValue: '0元',
        selectList: [
          '2天',
          '3天',
          '7天',
          '15天',
          '21天',
          '1个月',
          '3个月',
          '6个月',
          '12个月',
          '24个月',
          '36个月'
        ],
        selectList2: [
          '3期',
          '6期',
          '12期'
        ],
        moneyList: [
          '300 - 1000元',
          '1000 - 3000元',
          '3000 - 10000元',
          '10000 - 50000元',
          '50000 - 200000元'
        ],
        payWayList: [
          '等额本息',
          '到期还本付息'
        ],
        yearlyRateList: [
          '0%',
          '1%',
          '2%',
          '3%',
          '4%',
          '5%',
          '6%',
          '7%',
          '8%',
          '9%',
          '10%',
          '11%',
          '12%',
          '13%',
          '14%',
          '15%',
          '16%',
          '17%',
          '18%',
          '19%',
          '20%',
          '21%',
          '22%',
          '23%',
          '24%'
        ],
        serviceRateList: [
          '0%',
          '5%',
          '10%',
          '12%'
        ],
        minServiceList: [],
        infoList: [
          {
            key: 'xuexin',
            name: '学信'
          },
          {
            key: 'zhengxin',
            name: '征信'
          },
          {
            key: 'car',
            name: '车产证明'
          },
          {
            key: 'house',
            name: '房产证明'
          },
          {
            key: 'jobInfo',
            name: '工作信息'
          },
          {
            key: 'incomeInfo',
            name: '收入证明'
          }
        ],
        needInfo: [],
        fixedSelectorShown: false,
        payShown: false,
        pwd: '',
        checked: false,
        successCreated: false
      }
    },
    computed: {
      errorList () {
        const list = []
//                if (!parseInt(this.minMoney, 10) ||
//                    !parseInt(this.maxMoney, 10) ||
//                    parseInt(this.minMoney, 10) >
//                    parseInt(this.maxMoney, 10)) {
//                    list.push('请输入正确的借款金额')
//                }
//                if (parseInt(this.minMoney, 10) < 100
//                    || parseInt(this.maxMoney, 10) < 100) {
//                    list.push('借款金额不能低于 100 元')
//                }
//                if (parseInt(this.minMoney, 10) > 200000
//                    || parseInt(this.maxMoney, 10) > 200000) {
//                    list.push('借款金额不能超过 200000 元')
//                }
        if (this.payWayValue === '等额本息') {
          if (this.selectList2.indexOf(this.selectorValue3) >
            this.selectList2.indexOf(this.selectorValue4)) {
            list.push('请输入正确的借款时长')
          }
        } else if (this.selectList.indexOf(this.selectorValue1) >
          this.selectList.indexOf(this.selectorValue2)) {
          list.push('请输入正确的借款时长')
        }
//                if (!parseInt(this.minService, 10)) {
//                    list.push('请输入最低服务费')
//                }
        if (!this.checked) {
          list.push('请同意今借到借款协议')
        }
        return list
      }
    },
    methods: {
      goService () {
        this.$router.go({
          path: '/iouService7/0',
          replace: false
        })
      },
      setData () {
        if (this.moneyValue === '300 - 1000元') {
          this.minMoney = 300  // 最小借款额度
          this.maxMoney = 1000 // 最大借款额度
        } else if (this.moneyValue === '1000 - 3000元') {
          this.minMoney = 1000  // 最小借款额度
          this.maxMoney = 3000 // 最大借款额度
        } else if (this.moneyValue === '3000 - 10000元') {
          this.minMoney = 3000  // 最小借款额度
          this.maxMoney = 10000 // 最大借款额度
        } else if (this.moneyValue === '10000 - 50000元') {
          this.minMoney = 10000  // 最小借款额度
          this.maxMoney = 50000 // 最大借款额度
        } else if (this.moneyValue === '50000 - 200000元') {
          this.minMoney = 50000  // 最小借款额度
          this.maxMoney = 200000 // 最大借款额度
        }
      },
      toggleCheck () {
        this.checked = !this.checked
      },
      getUnitCode (value) {
        const unit = value.split(parseInt(value, 10))[1]
        if (unit === '天') {
          return 0
        }
        return 1
      },
      toggleFixedSelectorShown (e) {
        this.fixedSelectorShown = e
      },
      showSelector1 () {
        this.selectorShow1 = true
      },
      toggleSelectorShown1 (e) {
        this.selectorShow1 = e
      },
      setSelector1 (cur) {
        this.selectorValue1 = cur
      },
      showSelector2 () {
        this.selectorShow2 = true
      },
      toggleSelectorShown2 (e) {
        this.selectorShow2 = e
      },
      setSelector2 (cur) {
        this.selectorValue2 = cur
      },
      showSelector3 () {
        this.selectorShow3 = true
      },
      toggleSelectorShown3 (e) {
        this.selectorShow3 = e
      },
      setSelector3 (cur) {
        this.selectorValue3 = cur
      },
      showSelector4 () {
        this.selectorShow4 = true
      },
      toggleSelectorShown4 (e) {
        this.selectorShow4 = e
      },
      setSelector4 (cur) {
        this.selectorValue4 = cur
      },
      // 借款金额
      showMoney () {
        this.moneyShow = true
      },
      toggleMoneyShown (e) {
        this.moneyShow = e
        this.changeMinServiceList()
      },
      setMoney (cur) {
        this.moneyValue = cur
        this.setData()
      },
      // 付款方式
      showPayWay () {
        this.payWayShow = true
      },
      togglePayWayShown (e) {
        this.payWayShow = e
      },
      setPayWay (cur) {
        this.payWayValue = cur
      },
      // 年利率
      showYearlyRate () {
        this.yearlyRateShow = true
      },
      toggleYearlyRateShown (e) {
        this.yearlyRateShow = e
      },
      setYearlyRate (cur) {
        this.yearlyRateValue = cur
      },
      // 服务费率
      showServiceRate () {
        this.serviceRateShow = true
      },
      toggleServiceRateShown (e) {
        this.serviceRateShow = e
        this.changeMinServiceList()
      },
      setServiceRate (cur) {
        this.serviceRateValue = cur
      },
      // 服务费最低额度
      showMinService () {
        this.minServiceShow = true
      },
      toggleMinServiceShown (e) {
        this.minServiceShow = e
      },
      changeMinServiceList () {
        this.minServiceList = []
        this.minServiceList.push(
          '0元',
          `${this.minMoney * 0.05}元`,
          `${this.minMoney * 0.1}元`,
          `${this.minMoney * 0.12}元`
        )
        this.minServiceValue = '0元'
//                const cur = parseFloat(this.minServiceValue)
//                if (cur > this.minMoney * 0.2) {
//                    this.minServiceValue = this.minMoney * 0.2 + '元'
//                } else if (cur < this.minMoney * 0.05) {
//                    this.minServiceValue = this.minMoney * 0.05 + '元'
//                }
      },
      setMinService (cur) {
        this.minServiceValue = cur
        if (cur) {
          this.minService = this.minServiceValue
            .slice(0, this.minServiceValue.length - 1)
        }
      },
      getOrderId (type) {
        pay.getOrderId(type).then((json) => {
          this.orderId = json
        })
      },
      showPwdFn () {
        this.checkValid(() => {
          this.payShown = true
        })
      },
      close () {
        this.payShown = false
      },
      togglePayShown (e) {
        this.payShown = e
      },
      choose (e) {
        if (this.needInfo.includes(e)) {
          const index = this.needInfo.indexOf(e)
          this.needInfo.splice(index, 1)
          this[e.key] = 0
        } else {
          this.needInfo.push(e)
          this[e.key] = 1
        }
      },
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
      addNewProduct () {
        const param = {
          id: this.orderId, // 产品id
          minMoney: this.minMoney, // 最小借款额度
          maxMoney: this.maxMoney, // 最大借款额度
          payWay: this.payWayValue === '等额本息' ? 1 : 0, // 付款方式
          yearlyRate: parseInt(this.yearlyRateValue, 10), // 年利率
          minService: parseInt(this.minService, 10), // 最低服务费
          serviceRate: parseInt(this.serviceRateValue, 10), // 服务费率
          addText: this.addText, // 补充说明
          house: this.house,
          xuexin: this.xuexin, // 是否需要学信信息
          zhengxin: this.zhengxin, // 是否需要征信信息
          car: this.car, // 是否需要车辆信息
          jobInfo: this.jobInfo, // 是否需要工作信息
          incomeInfo: this.incomeInfo, // 是否需要收入信息
          pwd: md5(md5(this.pwd))
        }
        if (this.payWayValue === '等额本息') {
          param.minTime = parseInt(this.selectorValue3, 10)
          param.minUnit = this.getUnitCode(this.selectorValue3)
          param.maxTime = parseInt(this.selectorValue4, 10)
          param.maxUnit = this.getUnitCode(this.selectorValue4)
        } else {
          param.minTime = parseInt(this.selectorValue1, 10)
          param.minUnit = this.getUnitCode(this.selectorValue1)
          param.maxTime = parseInt(this.selectorValue2, 10)
          param.maxUnit = this.getUnitCode(this.selectorValue2)
        }
        return prod.addProduct(param)
      },
      changePayInfo (e) {
        this.pwd = e.password
      },
      success (e) {
        if (e) {
          window._JHsdk.action({
            event: 'hx_ac4',
            params: {
              id: this.orderId
            }
          })
          this.togglePayShown(false)
          this.toggleNeedRefresh(true)
          feedback('出借创建成功')
          this.successCreated = true
          window.history.back()
        } else {
          this.togglePayShown(false)
          this.getOrderId()
        }
      },
      tipAlertFee () {
        alert('<div style="text-align: left">' +
          '服务费计算规则：<br>' +
          '1、服务费=借款金额*服务费率；<br>' +
          '2、如果计算结果小于最低额度，按照最低额度收取。</div>')
      }
    },
    components: {
      selector,
      backdrop,
      payMoney
    },
    created () {
      this.setData()
      this.getOrderId()
      // 应用表单缓存
      const localAddNewPro = JSON.parse(
        window.localStorage.localAddNewPro || '{}'
      )
      if (Object.keys(this.addNewPro).length > 0) {
        Object.assign(this.$data, this.addNewPro)
      } else {
        Object.assign(this.$data, localAddNewPro)
      }
      this.infoList = [
        {
          key: 'xuexin',
          name: '学信'
        },
        {
          key: 'zhengxin',
          name: '征信'
        },
        {
          key: 'car',
          name: '车产证明'
        },
        {
          key: 'house',
          name: '房产证明'
        },
        {
          key: 'jobInfo',
          name: '工作信息'
        },
        {
          key: 'incomeInfo',
          name: '收入证明'
        }
      ]
      this.needInfo = []
//            this.serviceRate = '0%'
      if (
        this.moneyList.length < 5 ||
        this.moneyList[0] !== '300 - 1000元'
      ) {
        this.moneyValue = '300 - 1000元'
        this.moneyList = [
          '300 - 1000元',
          '1000 - 3000元',
          '3000 - 10000元',
          '10000 - 50000元',
          '50000 - 200000元'
        ]
      }
      if (this.serviceRateList.length > 4) {
        this.serviceRateValue = '0%'
        this.serviceRateList = [
          '0%',
          '5%',
          '10%',
          '12%'
        ]
      }
      this.payShown = false
    },
    route: {
      deactivate ({ next }) {
        if (this.successCreated) {
          this.successCreated = false
          if (window.localStorage.localAddNewPro) {
            window.localStorage.removeItem('localAddNewPro')
          }
          // 清空表单
          this.setTempInfo({ addNewPro: { } })
        } else {
          window.localStorage.localAddNewPro =
            JSON.stringify(this.$data)
          // 缓存表单
          this.setTempInfo({ addNewPro: this.$data })
        }
        next()
      }
    }
  }
</script>
<style lang="scss"
       scoped>
  @import "../../scss/fragment";

  textarea {
    color: $MAIN_TEXT_COLOR;
  }

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

  .min-input {
    width: 70px;
  }

  .add-txt input {
    width: 100%;
  }

  .time-length {
    display: flex;
    > div > div,
    > span {
      margin-left: 10px;
    }
  }

  .fixed-selector {
    @extend %fixed-bottom;
    z-index: 3;
  }

  .button {
    flex: 1;
    text-align: center;
    color: $MAIN_COLOR;
  }

  .reasons {
    flex: 1;
    /*display: flex;*/
    /*flex-wrap: wrap;*/
    /*justify-content: space-between;*/
    width: 100%;
    margin: 10px 0;
    div {
      width: 90px;
      float: left;
      background-color: $BORDER_COLOR;
      border-radius: $BORDER_RADIUS;
      color: white;
      margin: 5px;
      text-align: center;
      line-height: 40px;
      font-size: $TIP_FONT_SIZE;
    }
    .chosen {
      background-color: $MAIN_COLOR;
    }
  }

  .slide-in {
    &-transition {
      transition: .3s;
    }
    &-enter,
    &-leave {
      transform: translateY(100%);
    }
  }

  .tip-box {
    display: flex;
    justify-content: center;
    align-items: center;
    .tip-alert {
      width: 20px;
      height: 30px;
      background: url("../../assets/info.svg") center no-repeat {
        size: 12px;
      }
    }
  }
</style>
