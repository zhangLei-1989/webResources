<template>
  <div>
    <group :single="true"
           :fixed="true">
      <btn :text="'完善信用报告'"
           :next="true"
           :cut="1"
           @click="toPayCredit"></btn>
    </group>
    <group :first="true">
      <ele>
        <div class="box">
          <div class="no-data"></div>
          <div>{{isFirst}}</div>
        </div>
      </ele>
    </group>
    <group>
      <ele>
        <div class="desc">
          <div>为什么需要信用报告？</div>
          <p>
            1、所有用户必须实名认证，保证电子合同的有效性；<br>
            2、对于出借人而言，报告提供了详尽的个人信用信息，可以帮助风控，降低风险；<br>
            3、对于借款人而言，信用报告可以帮助有效筛选优质出借人，完善自己的信用报告也可以大大提高借款效率。
          </p>
          <div>信用报告包括什么内容？</div>
          <p>
            1、实名认证：绑卡；<br>
            2、必填信息：基础信息(微信号、居住地址、紧急联系人)、授权芝麻信用、授权运营商、授权京东；<br>
            3、选填信息：学信网、央行征信报告、工作信息、收入证明、车产、房产。
          </p>
          <div>授信成功后的信用报告是什么样子呢？</div>
          <p>
            <img src="../../../static/creditSample.jpg">
          </p>
        </div>
      </ele>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import user from 'api/creditCenterUser'

  export default {
    data () {
      return {
        isFirst: ''
      }
    },
    components: {},
    computed: {},
    methods: {
      getCredit () {
        user.getCreditList().then((json) => {
          if (!json.b_mobile_info) {
            this.isFirst = '您还没有信用报告~'
          } else {
            this.isFirst = '您的信用报告30天有效期已到，请重新认证'
          }
        })
      },
      toPayCredit () {
        window._JHsdk.action({
          event: 'xy_ac2'
        })
        this.$router.go({
          path: '/payCredit',
          replace: true
        })
      },
    },
    route: {},
    created () {
      this.getCredit()
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/const";

  .desc {
    padding-top: 10px;
    p {
      font-size: $TIP_FONT_SIZE;
      color: $TIP_COLOR;
      margin-top: 5px;
      img {
        width: 100%;
      }
    }
  }

  .box {
    padding: 20px 0;
    color: $TIP_COLOR;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .no-data {
      width: 100px;
      height: 100px;
      background: url("../../assets/noData.svg") center no-repeat {
        size: contain;
      }
    }
  }
</style>
