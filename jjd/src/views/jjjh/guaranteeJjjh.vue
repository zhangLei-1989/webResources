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
      <group :first="true">
        <div>
          <div class="jjdSlogan">
            <img src="../../../static/logo.png">
            <img src="../../../static/slogan.png">
          </div>
        </div>
      </group>
      <group>
        <ele :transparent="true" :no-line="true">
          <div class="card">
            <div class="flexFather">
              <div class="flexSon1">
                <img :src="img" class="img">
              </div>
              <div class="flexSon7">
                <p style="color: #666">{{name||1212}}</p>
                <p style="color: #999">已申请今济计划</p>
              </div>
            </div>
            <div class="flexFather">
              <div class="flexSon1 textCenter">
                <p>借款金额</p>
                <p>{{amt}}元</p>
              </div>
              <div class="flexSon1 textCenter">
                <p>年化利率</p>
                <p>{{rate}}%</p>
              </div>
              <div class="flexSon1 textCenter">
                <p>借款时长</p>
                <p>{{time}}年</p>
              </div>
            </div>
          </div>
        </ele>
      </group>
      <group style="height: 800px">
        <p style="padding: 0 10px;color: #666">
          今借到为了帮助深陷多头借贷的大学生，推出“今济计划”。“今济计划”将会由今借到创始人马卫东先生出资100万元，社会各界阳光投资人出资共同设立“今济基金”。通过长期低息债权形式垫付还款、行业内共享“今济名单”进行限制性保护、并为“今济对象”们提供培训课程和工作机会等一系列方式，解救陷入多头借贷大学生们，使其重返校园正常学习生活。
        </p>
        <p style="padding: 0 10px;color: #666">
          为了帮助到最需要帮助的同学，今借到设置了相对严格的审核要求，现在学生本人已经完善了个人信息，需要父母中的一方作担保，然后阳光投资人才能出借。
        </p>
      </group>
      <group :fixed="true">
        <btn :text="'作担保'" :cut="1" :next="true" @click="toGuaranteeConfirm"></btn>
      </group>
    </div>
  </div>
</template>

<script>
  import jjjh from 'api/jjjh'
  import { alert } from 'tools/utils'

  export default {
    data () {
      return {
        prodId: '',
        name: '123',
        img: '123123',
        amt: 0,
        rate: 0,
        time: 0,
        isOk: false,
      }
    },
    methods: {
      toGuaranteeConfirm () {
        this.$router.go(`/guaranteeConfirm/${this.prodId}`)
      }
    },
    route: {
      data ({ to: { params: { id } } }) {
        this.prodId = id
//        if (share === 1) {
        jjjh.getPlanApplyLoan(this.prodId).then((res) => {
          if (res.c_guarantee_id) {
            this.isOk = true
          } else {
            this.isOk = false
            this.name = res.c_name
            this.img = res.c_head
            this.rate = res.n_interest_rate
            this.amt = res.n_loan_amt
            this.time = res.n_tm
          }
        }).catch((e) => {
          alert(e.message)
        })
//       }
      }
    }
  }
</script>

<style lang="scss"
       scoped>
  @import "../../scss/const";

  .jjdSlogan {
    height: 50px;
    background-color: $MAIN_COLOR;
    :first-child {
      width: 40px;
      height: 40px;
      margin: 5px 10px;
    }
    :last-child {
      height: 30px;
      margin: 10px 0;
    }
  }

  .no-box {
    height: 210px;
    padding-top: 10px;
  }
  .img{
    height: 40px;
    width: 40px;
    border-radius: 20px;
    margin-top: 20px;
    margin-left: 10px;
  }
  .card{
    width: 100%;
    border-radius: 10px;
    border: 1px solid #cccccc;
    background-color: #FFFFFF;
  }
  .flexFather{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .flexSon1{
    flex:1;
    margin-right: 10px;
  }
  .flexSon7{
    flex: 7;
  }
  .textCenter{
    text-align: center;
    margin-bottom: 10px;
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
