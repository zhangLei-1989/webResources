<template>
  <div>
    <group :first="true">
      <ele :more="true"
           v-if="bindCard"
           :link="'/verifyPayPwd'">
        <div>更换手机号码</div>
      </ele>
      <ele :more="true"
           v-else
           :link="'/bindBankCard/' + pwdOk + '/' + creditOk">
        <div>更换手机号码</div>
        <div slot="right">绑卡后即可更换</div>
      </ele>
      <!--<ele :more="true"-->
      <!--:link="'/modifyPwd'">-->
      <!--<div>修改登录密码</div>-->
      <!--</ele>-->
      <ele :more="true"
           v-if="bindCard && pwdOk"
           :link="'/verifyIdcard&Bankcard'">
        <div>修改交易密码</div>
      </ele>
      <ele :more="true"
           v-if="bindCard && !pwdOk"
           :link="'/preInputPayPwd/add'">
        <div>设置交易密码</div>
      </ele>
      <ele :more="true"
           v-if="!bindCard"
           :link="'/bindBankCard/' + pwdOk + '/' + creditOk">
        <div>修改交易密码</div>
        <div slot="right">绑卡后才可修改</div>
      </ele>
    </group>
    <group>
      <ele :more="true"
           :link="'/commonProblem'">
        <div>常见问题</div>
      </ele>
      <ele :more="true"
           :link="'/beginnerGuide/1'">
        <div>新手引导</div>
      </ele>
      <ele :more="true"
           :link="'/updateHistory'">
        <div>版本介绍</div>
      </ele>
      <ele :more="true"
           :link="'/aboutUs'">
        <div>关于我们</div>
      </ele>
      <!--<ele :more="true"-->
           <!--:link="'/jjjh'">-->
        <!--<div>今济计划</div>-->
      <!--</ele>-->
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import pay from 'api/pay'

  export default{
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        pwdOk: 1,
        creditOk: 1,
        bindCard: 1
      }
    },
    components: {},
    computed: {},
    methods: {
      getPayInfo () {
        pay.checkCredit().then((json) => {
          this.pwdOk = json.b_set_pwd ? 1 : 0
          this.creditOk = json.b_credit ? 1 : 0
          this.bindCard = json.b_bind_card || json.bank_list.length
        })
      }
    },
    route: {},
    created () {
      this.getPayInfo()
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  button {
    position: fixed;
    bottom: 10px;
  }
</style>
