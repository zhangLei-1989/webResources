<template>
  <div>
    <div v-if="loaded">
      <div v-if="!overdued">
        <div v-if="submited"
             class="title">
          <div class="waiting-img"></div>
          <div>平台审核中，请耐心等待</div>
        </div>
        <group :first="true"
               v-if="!submited">
          <ele>
            <div class="jjjh-tip">
              如何提高成功率？<br>
              1、填写本人真实有效的信息<br>
              2、银行卡持卡人身份证号、姓名与学信一致<br>
              3、运营商手机号和芝麻信用一致<br>
              4、所填联系人在6个月内有过通话记录<br>
              5、尽可能证明你的还款能力
            </div>
          </ele>
        </group>
        <group :single="true"
               v-if="!submited"
               :fixed="true">
          <btn :text="'确认提交'"
               :cut="1"
               :next="true"
               :btn-fn="submit"></btn>
        </group>
        <group v-if="!submited">
          <ele :more="!bindCardOk"
               @click="toBindCard">
            <div class="slot-left">
              <img src="../../assets/bankCard.svg"
                   v-if="bindCardOk">
              <img src="../../assets/bankCard_g.svg"
                   v-if="!bindCardOk">
              <span>绑卡</span>
            </div>
            <div slot="right">
              <span v-if="bindCardOk">已完成</span>
              <span v-if="!bindCardOk">未完成</span>
            </div>
          </ele>
          <ele :more="!xuexinInfoOk"
               @click="toXuexinInfo">
            <div class="slot-left">
              <img src="../../assets/xuexin.svg"
                   v-if="xuexinInfoOk">
              <img src="../../assets/xuexinGray.svg"
                   v-if="!xuexinInfoOk">
              <span>学信网</span>
            </div>
            <div slot="right">
              <span v-if="xuexinInfoOk">已完成</span>
              <span v-if="!xuexinInfoOk">未完成</span>
            </div>
          </ele>
          <ele :more="!zhimaInfoOk"
               @click="toZhimaInfo">
            <div class="slot-left">
              <img v-if="zhimaInfoOk"
                   src="../../assets/zhimainfo.svg">
              <img v-if="!zhimaInfoOk"
                   src="../../assets/zhimainfo_g.svg">
              <span>芝麻信用</span>
            </div>
            <div slot="right">
              <span v-if="zhimaInfoOk">已完成</span>
              <span v-if="!zhimaInfoOk">未完成</span>
            </div>
          </ele>
          <ele :more="!operatorInfoOk"
               @click="toOperatorInfo">
            <div class="slot-left">
              <img v-if="operatorInfoOk"
                   src="../../assets/simpleTel.svg">
              <img v-if="!operatorInfoOk"
                   src="../../assets/operators_g.svg">
              <span>运营商</span>
            </div>
            <div slot="right">
              <span v-if="operatorInfoOk">已完成</span>
              <span v-if="!operatorInfoOk">未完成</span>
            </div>
          </ele>
        </group>
        <group v-if="!submited">
          <ele :more="true"
               @click="toEventDescription">
            <div class="slot-left">
              <img src="../../assets/edit.svg"
                   v-if="eventOk">
              <img src="../../assets/edit_g.svg"
                   v-if="!eventOk">
              <span>事件描述</span>
            </div>
            <div slot="right">
              <span v-if="eventOk">已完成</span>
              <span v-if="!eventOk">未完成</span>
            </div>
          </ele>
          <ele :more="true"
               @click="toJjjhBorrowDetail">
            <div class="slot-left">
              <img src="../../assets/jjjhBorrow.svg"
                   v-if="borrowDetailOk">
              <img src="../../assets/jjjhBorrow_g.svg"
                   v-if="!borrowDetailOk">
              <span>借款详情</span>
            </div>
            <div slot="right">
              <span v-if="borrowDetailOk">已完成</span>
              <span v-if="!borrowDetailOk">未完成</span>
            </div>
          </ele>
          <ele :more="true"
               @click="toJjjhFamilyInfo">
            <div class="slot-left">
              <img src="../../assets/familyInfo.svg"
                   v-if="familyInfoOk">
              <img src="../../assets/familyInfo_g.svg"
                   v-if="!familyInfoOk">
              <span>家庭信息</span>
            </div>
            <div slot="right">
              <span v-if="familyInfoOk">已完成</span>
              <span v-if="!familyInfoOk">未完成</span>
            </div>
          </ele>
          <ele :more="true"
               @click="toJjjhSchoolInfo">
            <div class="slot-left">
              <img src="../../assets/school.svg"
                   v-if="schoolInfoOk">
              <img src="../../assets/school_g.svg"
                   v-if="!schoolInfoOk">
              <span>学校信息</span>
            </div>
            <div slot="right">
              <span v-if="schoolInfoOk">已完成</span>
              <span v-if="!schoolInfoOk">未完成</span>
            </div>
          </ele>
        </group>
      </div>
      <div v-if="overdued">
        <div>
          <div
            class="title1">
            <div class="waiting-img"></div>
            <div>标的到期已关闭</div>
          </div>
          <group :fixed="true">
            <btn :text="'再次申请今济计划'" :cut="1" :next="true" :btn-fn="showApply"></btn>
          </group>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import jjjh from 'api/jjjh'
  import pay from 'api/pay'
  import user from 'api/creditCenterUser'
  import { alert } from 'tools/utils'

  export default {
    vuex: {
      getters: {
        toRegist: state => state.toRegist
      },
    },
    data () {
      return {
        bindCardOk: false,
        zhimaInfoOk: false,
        operatorInfoOk: false,
        eventOk: false,
        xuexinInfoOk: false,
        borrowDetailOk: false,
        familyInfoOk: false,
        schoolInfoOk: false,
        submited: true,
        overdued: false,
        loaded: false,
        isClosed: false,
      }
    },
    computed: {
      jjjhError () {
        const list = []
        if (!this.bindCardOk) {
          list.push('请绑定一张银行卡')
        }
        if (!this.xuexinInfoOk) {
          list.push('请完善您的学信信息')
        }
        if (!this.zhimaInfoOk) {
          list.push('请完善您的芝麻信用信息')
        }
        if (!this.operatorInfoOk) {
          list.push('请完善您的运营商信息')
        }
        if (!this.eventOk) {
          list.push('请完善您的事件描述')
        }
        if (!this.borrowDetailOk) {
          list.push('请完善您的借款详情')
        }
        if (!this.familyInfoOk) {
          list.push('请完善您的家庭信息')
        }
        if (!this.schoolInfoOk) {
          list.push('请完善您的学校信息')
        }
        return list
      }
    },
    methods: {
      showApply () {
        this.overdued = false
      },
      getStatus () {
        if (!this.isClosed) {
          jjjh.getPlanSubmit().then((res) => {
            this.submited = res.n_plan_submit === 1
            this.overdued = res.n_plan_submit === 2
            this.isClosed = res.n_plan_submit === 2
            this.loaded = true
            if (this.submited) {
              this.$router.go('/handleMyJjjh')
            }
          })
        }
        user.getCreditList().then((res) => {
          this.zhimaInfoOk = res.b_zhima_credit
          this.operatorInfoOk = res.b_mobile_info
          this.xuexinInfoOk = res.b_xuexin_info
        })
        jjjh.getPlanState().then((res) => {
          this.borrowDetailOk = res.n_plan_iou === 1
          this.eventOk = res.n_plan_desc === 1
          this.familyInfoOk = res.n_plan_family === 1
          this.schoolInfoOk = res.n_plan_school === 1
        })
        pay.checkCredit().then((json) => {
          if (json.bank_list && json.bank_list.length) {
            this.bindCardOk = true
          }
        })
      },
      toBindCard () {
        if (!this.bindCardOk) {
          this.$router.go('/bindBankCard/jjjh')
        }
      },
      toXuexinInfo () {
        if (!this.xuexinInfoOk) {
          this.$router.go('/xuexinInfo/jjjh')
        }
      },
      toZhimaInfo () {
        if (!this.zhimaInfoOk) {
          this.$router.go('/zhimaInfo/jjjh')
        }
      },
      toOperatorInfo () {
        if (!this.operatorInfoOk) {
          this.$router.go('/operatorInfo/jjjh')
        }
      },
      toEventDescription () {
        this.$router.go('/eventDescription')
      },
      toJjjhBorrowDetail () {
        this.$router.go('/jjjhBorrowInfoList')
      },
      toJjjhFamilyInfo () {
        this.$router.go('/familyInfo')
      },
      toJjjhSchoolInfo () {
        this.$router.go('/schoolInfo')
      },
      submit () {
        if (this.jjjhError.length > 0) {
          let errors = ''
          this.jjjhError.forEach((err) => {
            errors += `${err}<br>`
          })
          alert(errors)
        } else {
          this.toSubmit()
        }
      },
      toSubmit () {
        this.isClosed = false
        window.sessionStorage.removeItem('isJjjhClosed')
        jjjh.addPlanSubmit().then(() => {
          this.getStatus()
        })
      },
      getPayInfo (cb) {
        pay.checkCredit().then((json) => {
          if (!json.bank_list || !json.bank_list.length || !json.b_bind_card) {
            alert('请先完成绑卡，再填写其他信息')
            this.$router.go('/bindBankCard/jjjh')
          } else {
            cb()
          }
        })
      },
    },
    created () {
      if (this.toRegist) {
        alert('请先完成注册')
        this.$router.go('/regist1')
      } else {
        const that = this
        this.getPayInfo(that.getStatus)
      }
    },
    route: {
      data () {
        this.isClosed = window.sessionStorage.getItem('isJjjhClosed')
        if (this.isClosed) {
          jjjh.getPlanSubmit().then((res) => {
            this.submited = res.n_plan_submit === 1
            this.loaded = true
            if (this.submited) {
              this.$router.go('/handleMyJjjh')
            }
          })
        }
//        else {
//          jjjh.getPlanSubmit().then((res) => {
//            this.submited = res.n_plan_submit === 1
//            this.overdued = res.n_plan_submit === 2
//            this.isClosed = res.n_plan_submit === 2
//            this.loaded = true
//            if (this.submited) {
//              this.$router.go('/handleMyJjjh')
//            }
//          })
//        }
      }
    },
    destroyed () {
      window.sessionStorage.removeItem('isJjjhClosed')
    },
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

  .slot-left {
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

  .title1 {
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
