<template>
  <div>
    <group :first="true">
      <ele>
        <div class="title">
          <div class="icon"></div>
          <div>申请成功</div>
        </div>
      </ele>
      <ele>
        <div>借款金额 {{amount}} 元</div>
        <div slot="right">剩余有效期 3 天</div>
      </ele>
    </group>
    <group>
      <div class="skip-box">
        <div>{{currentNum}} 秒钟后自动跳转</div>
        <div @click="goBack"
             class="skip">点此手动跳转</div>
      </div>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    vuex: {
      getters: {
        openId: state => state.userInfo.openId
      }
    },
    data () {
      return {
        amount: '',
        currentNum: 5,
        overNum: 0,
        pid: 0,
      }
    },
    methods: {
      startCount () {
        this.pid = setInterval(() => {
          this.currentNum -= 1
          if (this.currentNum === this.overNum) {
            this.goBack()
          }
        }, 1000)
      },
      goBack () {
        this.stopCount()
        window.history.go(-2)
      },
      stopCount () {
        clearInterval(this.pid)
      }
    },
    route: {
      data ({ to: { params: { amount } } }) {
        this.amount = amount
        this.startCount()
      }
    }
  }
</script>

<style lang="scss"
       scoped>
  @import "../../scss/const";

  .title {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    .icon {
      width: 50px;
      height: 50px;
      background: url("../../assets/created.svg") center no-repeat {
        size: contain;
      }
    }
  }

  .skip-box {
    padding: 50px 0;
    text-align: center;
  }

  .skip {
    color: $MAIN_COLOR;
    text-decoration: underline;
  }
</style>
