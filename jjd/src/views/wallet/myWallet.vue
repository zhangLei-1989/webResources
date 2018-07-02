<template>
  <div v-show="ok">
    <div class="head">
      <div class="title">
        <div>钱包余额(元)</div>
        <div>{{total.toFixed(2)}}</div>
      </div>
      <div class="btn">
        <div @click="toCharge">
          <div class="icon to-charge"></div>
          <div>充值</div>
        </div>
        <div @click="toCash">
          <div class="icon to-cash"></div>
          <div>提现</div>
        </div>
      </div>
    </div>
    <div>
      <div class="col-title">
        <span v-show="!isShowFilter">收支明细</span>
        <span class="listFilter" @click="toggleListFilter">筛选 <img class="moreImg" src="../../assets/more.svg" alt=""></span>
      </div>
      <div class="colums" v-show="!isShowFilter">
        <div solt="desc">对方姓名 | 成交时间</div>
        <div solt="">收支类型 | 交易金额</div>
      </div>
      <no-data v-show="!listScreened.length && !isShowFilter"
               :text="'暂时没有任何内容'"
               :url="url"></no-data>
      <group class="no-padding" v-show="!isShowFilter">
        <ele v-for="record in listScreened">
          <div slot="left"
               class="content">
            <div class="flexFather">
              <div class="flexSon1">{{record.c_user_name}}</div>
              <div class="unValid flexSon1" v-if="record.b_valid != 1" >未成功</div>
            </div>
            <div class="time">{{record.c_tm}}</div>
          </div>
          <div slot="right"
               class="content">
            <div style="font-weight: 500;">{{record.n_amt>0?'+'+record.n_amt.toFixed(2):record.n_amt.toFixed(2)}}</div>
            <div class="txt-rig">
              {{record.c_type}}<span v-if="!record.b_rcv_bank">-银行处理中</span><span v-if="record.b_rcv_bank && !record.b_valid">-交易失败</span>
            </div>
          </div>
        </ele>
      </group>
      <group class="fliterContent no-padding" v-show="isShowFilter">
        <div class="filterTop">
          <div class="filterRow">
            <div :class="toggleItemAll('全部')" @click="setFilterList('全部')">全部</div>
            <div :class="toggleItem('借入')" @click="setFilterList('借入')">借入</div>
            <div :class="toggleItem('借出')" @click="setFilterList('借出')">借出</div>
          </div>
          <div class="filterRow">
            <div :class="toggleItem('还款')" @click="setFilterList('还款')">还款</div>
            <div :class="toggleItem('提现')" @click="setFilterList('提现')">提现</div>
            <div :class="toggleItem('充值')" @click="setFilterList('充值')">充值</div>
          </div>
          <div class="filterRow">
            <div :class="toggleItem('服务费')" @click="setFilterList('服务费')">服务费</div>
            <div :class="toggleItem('授信手续费')" @click="setFilterList('授信手续费')">授信手续费</div>
            <div :class="toggleItem('借款手续费')" @click="setFilterList('借款手续费')">借款手续费</div>
          </div>
          <div class="filterRow">
            <div :class="toggleItem('充值手续费')" @click="setFilterList('充值手续费')">充值手续费</div>
            <div :class="toggleItem('提现手续费')" @click="setFilterList('提现手续费')">提现手续费</div>
            <div :class="toggleItem('服务费奖励')" @click="setFilterList('服务费奖励')">服务费奖励</div>
            <!--<div :class="toggleItem('文书打印费')" @click="setFilterList('文书打印费')">文书打印费</div>-->
          </div>
          <div class="filterRow">
            <div :class="toggleItem('担保费')" @click="setFilterList('担保费')">担保费</div>
            <div :class="toggleItem('特别还款手续费')" @click="setFilterList('特别还款手续费')">特别还款手续费</div>
            <div :class="toggleItem('逾期管理费奖励')" @click="setFilterList('逾期管理费奖励')">逾期管理费奖励</div>
          </div>
          <div class="filterRow">
            <div :class="toggleItem('其他')" @click="setFilterList('其他')">其他</div>
            <div class="placeHolder"></div>
            <div class="placeHolder"></div>
          </div>
        </div>
        <div class="filterBottom">
          <div class="filterRow">
            <div class="cancelFilter" @click="cancelFilter">取消</div>
            <div class="confirmFilter" @click="confirmFilter">确定</div>
          </div>
        </div>
      </group>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import noData from 'components/output/noData'
  import my from 'api/my'
  import pay from 'api/pay'
  import { alert, confirm } from 'tools/utils'

  export default {
    data () {
      return {
        pwdOk: 0,
        bindCardToCash: 0,
        bindCardToCharge: 0,
        url: require('../../assets/noData.svg'),
        total: 0,
        list: [],
        listScreened: [],
        ok: false,
        last3daysAmount: 0,
        alertImg: require('../../assets/warning.svg'),
        isShowFilter: false,
        filterList: [],
      }
    },
    methods: {
      getWallet () {
        my.getMyAccountList().then((json) => {
          this.total = json.n_amt
          this.list = json.l_account_list
          this.listScreened = json.l_account_list
          this.ok = true
          this.last3daysAmount = json.n_loan_amount_last3days
        })
      },
      toCharge () {
        if (!this.bindCardToCharge) {
          alert('请绑定一张可以使用的银行卡')
          this.$router
            .go(`/bindBankCard/${this.pwdOk}/0`)
        } else if (!this.pwdOk) {
          alert('请设置交易密码')
          this.$router.go('/preInputPayPwd/add')
        } else {
          this.$router.go('/toCharge')
        }
      },
      toCash () {
//                alert('提现功能正在维护，请您稍后再试')
        let allowToCash = true
        const today = Date.now()
        const startDay = new Date('2017-01-27T00:00+08:00').getTime()
        const endDay = new Date('2017-01-30T00:00+08:00').getTime()
        if (today > startDay && today < endDay) {
          allowToCash = false
        }
        if (!this.bindCardToCash) {
          alert('请绑定一张可以使用的银行卡')
          this.$router
            .go(`/bindBankCard/${this.pwdOk}/0`)
        } else if (!this.pwdOk) {
          alert('请设置交易密码')
          this.$router.go('/preInputPayPwd/add')
        } else if (!allowToCash) {
          confirm(
            '由于支付公司春节无法结算，1月27日00:00至1月29日24:00暂不支持提现，' +
            '其他业务不受影响。',
            '27日至29日暂不支持提现',
            [{
              text: '知道了'
            }]
          )
        } else {
          this.noPaybackOfflineAlert()
        }
      },
      getPayInfo () {
        pay.checkCredit().then((json) => {
          this.pwdOk = json.b_set_pwd ? 1 : 0
          this.bindCardToCash =
            (json.b_bind_card && json.bank_list.length) ? 1 : 0
          this.bindCardToCharge =
            json.bank_list.length ? 1 : 0
        })
      },
      noPaybackOfflineAlert () {
        if (this.last3daysAmount > 0) {
          const that = this
          confirm(
            `<img src="${this.alertImg}"
                      style="width: 80px; margin-top: 10px">
                      <div style="color: #ED594E">任何要求私下还款的都是诈骗</div>
                      <div style="text-align: left">请您<span style="color: #ED594E">务必通过今借到线上还款</span>，
                      否则该借条不能自动完结，还会产生逾期记录。
                      今借到不承认任何私下还款方式（支付宝/微信/银行卡等），
                      请谨慎操作严防诈骗。</div>`,
            '',
            [{
              text: '我已认真阅读以上提示',
              fn () {
                that.$router.go('/toCash')
              },
            }],
            true
          )
        } else {
          this.$router.go('/toCash')
        }
      },
      toggleListFilter () {
        this.isShowFilter = !this.isShowFilter
      },
      toggleItem (e) {
        let res = ''
        if (this.filterList[0] === '全部') {
//          res = 'unSelectable'
          res = 'selected'
        } else if (this.filterList.indexOf(e) === -1) {
          res = ''
        } else {
          res = 'selected'
        }
        return res
      },
      toggleItemAll (e) {
        let res
        if (this.filterList.indexOf(e) === -1) {
          res = ''
        } else {
          res = 'selected'
        }
        return res
      },
      setFilterList (e) {
        if (e === '全部') {
          if (this.filterList.indexOf(e) === -1) {
            this.filterList = ['全部']
          } else {
            this.filterList = []
          }
        } else if (this.filterList[0] === '全部') {
          if (e !== '全部') {
            this.filterList = ['借入',
              '借出',
              '还款',
              '提现',
              '充值',
              '服务费',
              '授信手续费',
              '借款手续费',
              '充值手续费',
              '提现手续费',
              '服务费奖励',
              '担保费',
              '特别还款手续费',
              '逾期管理费奖励',
              '其他'
            ]
            const i = this.filterList.indexOf(e)
            this.filterList.splice(i, 1)
          }
        } else if (this.filterList.indexOf(e) === -1) {
          this.filterList.push(e)
        } else {
          const i = this.filterList.indexOf(e)
          this.filterList.splice(i, 1)
        }
      },
      cancelFilter () {
        this.isShowFilter = false
//        this.filterList = []
//        this.listScreened = this.list
      },
      confirmFilter () {
        this.listScreened = []
        this.isShowFilter = false
        if (this.filterList[0] === '全部') {
          this.listScreened = this.list
        } else {
          this.list.forEach((item) => {
            if (this.filterList.indexOf(item.c_type) !== -1) {
              this.listScreened.push(item)
            }
            if (item.c_type === '出借款') {
              if (this.filterList.indexOf('借入') !== -1) {
                if (item.n_amt > 0) {
                  this.listScreened.push(item)
                }
              }
            }
            if (item.c_type === '出借款') {
              if (this.filterList.indexOf('借出') !== -1) {
                if (item.n_amt < 0) {
                  this.listScreened.push(item)
                }
              }
            }
          })
        }
      },
      back () {
        window.location.replace('/myWallet')
      },
//      goBack () {
//        if (window.history.length < 2) {
//          window.history.back()
//        } else if (window.history.length >= 2) {
//          window.history.go(-window.history.length)
//        }
//      }
    },
    computed: {},
    components: {
      noData
    },
    created () {
      this.getWallet()
      this.getPayInfo()
//      window.history.pushState({}, '今借到', '/')
//      window.history.pushState({}, '今借到', '/')
//      window.history.pushState({}, '今借到', '/')
//      window.history.pushState({}, '今借到', '/')
    },
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/fragment';

  .col-title {
    font-size: $TIP_FONT_SIZE;
    line-height: 30px;
    height: 30px;
    padding-left: 10px;
  }

  .colums {
    display: flex;
    padding: 0 10px;
    font-size: $MIN_FONT_SIZE;
    color: $TIP_COLOR;
    line-height: 20px;
    justify-content: space-between;
  }

  .head {
    background: $MAIN_COLOR;
  }

  .title {
    text-align: center;
    line-height: 20px;
    display: flex;
    flex-direction: column;
    color: $MINOR_TEXT_COLOR;
    padding: 20px;
    position: relative;
    &:before {
      @extend %row-border;
      border-color: white;
    }
  }

  .title :first-child {
    font-size: $TIP_FONT_SIZE;
  }

  .title :last-child {
    font-size: $LARGE_FONT_SIZE;
  }

  .btn {
    display: flex;
    flex-direction: row;
    > div {
      flex: 1;
      height: 50px;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: $TIP_FONT_SIZE;
      &:last-child {
        position: relative;
        &:before {
          @extend %btn-border;
          border-left: 1px solid white;
        }
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    font-size: $TIP_FONT_SIZE;
    &[slot=right] {
      text-align: right;
    }
  }

  .content .time {
    color: $TIP_COLOR;
    font-size: $MIN_FONT_SIZE;
  }

  .txt-rig {
    text-align: right;
    font-size: $MIN_FONT_SIZE;
  }

  .icon {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    background: {
      size: 16px 16px;
      repeat: no-repeat;
      position: 30% 50%;
    }
  }

  .to-charge {
    background-image: url(../../assets/chongzhi.svg);
  }

  .to-cash {
    background-image: url(../../assets/tixian.svg);
  }

  .no-padding {
    padding-top: 0 !important;
  }
  .listFilter{
    text-align: right;
    display: inline-block;
    float: right;
    padding-right: 10px;
  }
  .filterTop{
    border-bottom:1px solid #cccccc;
    border-top:1px solid #cccccc;
  }
  .filterRow{
    background-color: #FFFFFF;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    div{
      flex: 1;
      text-align: center;
      box-sizing: border-box;
      margin: 10px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #FFFFFF;
      background-color: #cccccc;
      font-size: 14px;
      color: #FFFFFF;
      border-radius: 5px;
    }
  }
  .filterBottom{
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid #cccccc;
    width: 100%;
    background-color: #FFFFFF;
    .filterRow {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      background-color: transparent;
      .confirmFilter{
        flex: 1;
        text-align: center;
        box-sizing: border-box;
        margin: 10px;
        height: 50px;
        line-height: 50px;
        border: 1px solid $MAIN_COLOR;
        background-color: $MAIN_COLOR;
        color: #FFFFFF;
        border-radius: 3px;
      }
      .cancelFilter {
        flex: 1;
        text-align: center;
        box-sizing: border-box;
        margin: 10px;
        height: 50px;
        line-height: 50px;
        border: 1px solid $MAIN_COLOR;
        background-color: #FFFFFF;
        color: $MAIN_COLOR;
        border-radius: 3px;
      }
    }
  }
  .selected{
    background-color: $MAIN_COLOR !important;
    border-color: $MAIN_COLOR !important;
    color: #ffffff !important;
  }
  .unSelectable{
    background-color: #cccccc;
    color: #666666;
  }
  .placeHolder{
    border: none !important;
    background-color: #FFFFFF !important;
  }
  .moreImg{
    height: 20px;
    padding-top: 10px;
  }
  .left{
    div:nth-child(1){
      position: relative;
    }
  }
  .flexFather{
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
  }
  .flexSon1{
    flex:1;
  }
  .unValid{
    /*position: absolute;*/
    /*left:67px;*/
    width:50px;
    text-align: center;
    background: $MAIN_TEXT_COLOR;
    color: $BORDER_COLOR;
    height: 16px;
    line-height: 15px;
    font-size:12px;
    padding: 1px 0;
  }
</style>
