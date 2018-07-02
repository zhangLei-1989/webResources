<template>
  <div>
    <group :first="true">
      <ele>
        <div class="details">
          <div>
            <img src="../../assets/created.svg" alt="">
          </div>
          <div>交易详情</div>
          <div>¥&nbsp;<span>{{money + '.00' }}</span></div>
          <div>预计24小时之内到账</div>
        </div>
      </ele>
      <ele>
        <div>储蓄卡</div>
        <div>{{bankCard.text.slice(0,4)}} 尾号（{{bankCard.text.slice(-4)}}）</div>
      </ele>
    </group>
    <group :single="true"
           :fixed="true"
           class="parent">
      <div class="btn">
        <btn :text="'继续提现'"
             :next="true"
             @click="go">
        </btn>
        <btn :next="true"
             :text="'完成'"
             @click="finish"></btn>
      </div>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">

  export default {
    data () {
      return {
//        money: window.localStorage.getItem('money')本地存储
        money: '',
        bankCard: {},
      }
    },
    methods: {
      go () {
//        this.$router.go('/toCash')
        window.history.go(-1)
      },
      finish () {
//        this.$router.go('/myWallet')
        window.history.go(-2)
      }
    },
    created () {
      this.money = this.$store.state.money
      this.bankCard = this.$store.state.bankCard
    }

  }
</script>
<style lang="scss" scoped>
  @import "../../scss/_const.scss";
  @import '../../scss/_function.scss';

  .details {
    width: 100%;
    padding: 50px 0px 10px ;
    /*text-align: center;*/
    display: flex;
    flex-direction: column;
    align-items: center;

  img {
    width: 130px;
    height: 110px;
    margin-left: 30px;
  }
  >div:nth-child(2) {
     font-size: $TIP_FONT_SIZE;
     color: $TIP_COLOR;
     margin-top:10px;
   }
  >div:nth-child(3) {
     font-size:$MAX_FONT_SIZE;
     margin:10px 0;
   }
  >div:nth-child(4) {
     font-size: $TIP_FONT_SIZE;
     color: $TIP_COLOR;
   }
  }
  .parent{
    display: block;
  .btn{
    width: 100%;
    padding-left: 20px;
    display: flex;
    justify-content:space-between;
  >button{
     flex:1;
     margin-right:20px;
   }
  }
  }
</style>
