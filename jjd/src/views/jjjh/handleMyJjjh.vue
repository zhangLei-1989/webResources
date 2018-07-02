<template>
  <div>
    <div v-if="endTimeLeft<0">
      <div
           class="title1">
        <div class="waiting-img"></div>
        <div>标的到期已关闭</div>
      </div>
      <group :fixed="true">
        <btn :text="'再次申请今济计划'" :cut="1" :next="true" :btn-fn="toJjjhIndex"></btn>
      </group>
    </div>
    <div v-if="endTimeLeft>0 || endTimeLeft === 0">
      <group :first="true">
        <div class="icon">
          <img src="../../assets/created.svg">
          <div class="banner">今济计划已提交</div>
          <div class="line"></div>
        </div>
        <ele :no-line="true">
          <div>欠款总额: {{planIouAmtSum}} 元</div>
          <div slot="right">剩余有效期: {{endTimeLeft}} 天</div>
        </ele>
      </group>
      <ele :no-line="true" :transparent="true">
        <btn v-if="!isGuarantee"
             :cut="2"
             :text="leftBtnText"
             :next="true"
             :allow="!isGuarantee"
             :btn-fn="goGuaranteeAgreement">
        </btn>
        <div v-if="isGuarantee" style="width: 50%;background-color: #cccccc;height: 48px;line-height: 48px;margin-right: 10px;text-align: center;color: #FFFFFF;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;">
          {{leftBtnText}}
        </div>
        <btn :cut="2"
             :text="'下载协议'"
             :next="true"
             :btn-fn="goDownloadPage"
             :style="{'margin-left':0}"
        >
        </btn>
      </ele>
      <group>
        <div>
          <div class="text title">为什么要邀请担保人？</div>
          <div class="text">请您的父母或监护人作担保，一方面是为了保证您的父母或监护人已知晓您的现状以便及时给予各方面的支持，我们相信身为父母或监护人此时此刻是期望能跟孩子共渡难关的，而不会视之为负担；另一方面有父母或监护人作担保，投资人会更有意愿支持您。</div>
          <div class="text title">下载协议做什么？</div>
          <div class="text">只有您和网贷平台签署了相关协议之后，投资人才能进行出借，请您尽快签字并联系各网贷平台签署协议，然后一并寄回今借到。收件信息详见下载后的文件包。</div>
        </div>
      </group>
    </div>
  </div>
</template>

<script>
  import { alert } from 'tools/utils'
  import jjjh from 'api/jjjh'
  import ele from '../../components/mixin/ele.vue'
  import group from '../../components/mixin/group.vue'
  import btn from '../../components/mixin/btn.vue'


  export default {
    component: {
      ele,
      group,
      btn,
    },
    data () {
      return {
        userId: '',
        planIouAmtSum: '',
        endTimeLeft: '',
        borrowTime: '',
        interestRate: 0,
        familyType: 0, // 父母情况 (1、双亲 2、单亲 3、孤儿)
        leftBtnText: '',
        isGuarantee: ''
      }
    },
    created () {
      jjjh.getPlanInfo().then((res) => {
        this.userId = res.c_user_id // 用户id,
        this.planIouAmtSum = res.planIouAmtSum // 欠款总额,
        this.endTimeLeft = res.t_end_tm // 剩余有效期,
        this.borrowTime = res.n_tm // 借款时长,
        this.interestRate = res.n_interest_rate // 年化利率,
        this.familyType = res.n_family_type // 父母情况 (1、双亲 2、单亲 3、孤儿),
        if (this.familyType === 1) {
          this.leftBtnText = '邀请父母作担保'
        } else if (this.familyType === 2) {
          this.leftBtnText = '邀请父母作担保'
        } else if (this.familyType === 3) {
          this.leftBtnText = '邀请监护人作担保'
        }
        if (this.endTimeLeft < 0) {
          this.$router.go('/jjjhClosed')
        }
      }).catch((e) => {
        alert(e.message)
      })
      jjjh.initPlanApplyLoan().then((res) => {
        jjjh.getPlanApplyLoan(res.c_loan_id).then((resp) => {
          this.isGuarantee = resp.c_guarantee_id
        })
      })
    },
    methods: {
      goDownloadPage () {
        this.$router.go('/jjjhDownloadPage')
      },
      goGuaranteeAgreement () {
        if (!this.isGuarantee) {
          this.$router.go('/guaranteeAgreement')
        }
      },
      toJjjhIndex () {
        this.$router.go('/jjjh')
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../scss/fragment";
  @import "../../scss/const" ;
  .banner{
    position:absolute;
    width: 96%;
    margin-left:2%;
    background-color: #FFFFFF;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #999999;
    top:137px;
  }
  .text{
    padding: 0 10px;
    color: #666666;
  }
  .title{
    font-weight: bold;
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

  .icon{
    height: 200px;
    background-color: #FFFFFF;
    position:relative;
    img{
      position:absolute;
      width: 100px;
      left: 50%;
      top: 50%;
      transform:translate(-37%,-68%);
    }
  }
  .group{
    margin-bottom:38px;
  }
  .line{
    position:absolute;
    width:96%;
    left:2%;
    bottom:0;
    border-bottom:1px solid #cecece;
  }
  .noGuard{
    background: $GRAY_COLOR
  }
</style>
