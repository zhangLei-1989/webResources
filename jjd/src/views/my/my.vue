<template>
  <div>
    <group class="user">
      <ele :link="'/creditReportSimpleMine/' + userId">
        <div class="title">
          <div class="user-icon"
               :style="{backgroundImage: 'url(' + userIcon + ')'}"></div>
          <div class="user-info">
            <div>{{name || '尚未实名认证'}}</div>
            <div class="tel-bg">{{tel}}</div>
          </div>
        </div>
      </ele>
    </group>
    <group>
      <div class="box">
        <border-box :cut="3"
                    v-link="'/myBorrow'">
          <div class="icon in-icon"></div>
          <div class="text">借入</div>
        </border-box>
        <border-box :cut="3"
                    v-link="'/myLend'">
          <div class="icon out-icon"></div>
          <div class="text">借出</div>
        </border-box>
        <border-box :cut="3"
                    v-link="'/myGuarantee'">
          <div class="icon guarantee-icon"></div>
          <div class="text">担保</div>
        </border-box>
      </div>
    </group>
    <group>
      <ele :more="true"
           :link="'/creditReportSimpleMine/' + userId">
        <div class="title">
          <div class="icon credit-icon"></div>
          <div>信用</div>
        </div>
        <div slot="right"
             class="credit-tip">{{creditStatus}}
        </div>
      </ele>
      <ele :more="true"
           :link="'/myBankCards'">
        <div class="title">
          <div class="icon bank-icon"></div>
          <div>银行卡</div>
        </div>
      </ele>
      <ele :more="true"
           :link="'/friends'">
        <div class="title">
          <div class="icon friend-icon"></div>
          <div>好友</div>
        </div>
      </ele>
      <ele :more="true"
           :link="'/setting'">
        <div class="title">
          <div class="icon setting-icon"></div>
          <div>设置</div>
        </div>
      </ele>
      <!--<ele :more="true"-->
      <!--:link="'/tutorial'">-->
      <!--<div class="title">-->
      <!--<div class="icon tutorial-icon"></div>-->
      <!--<div>放贷款全攻略</div>-->
      <!--</div>-->
      <!--</ele>-->
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import borderBox from 'components/mixin/borderBox'
  import user from 'api/creditCenterUser'

  export default{
    vuex: {
      getters: {
        name: state => state.userInfo.nickname,
        tel: state => state.userInfo.tel,
        userIcon: state => state.userInfo.userIcon,
        userId: state => state.userInfo.userId
      },
      actions: {}
    },
    data () {
      return {
        creditStatus: ''
      }
    },
    components: {
      borderBox
    },
    computed: {},
    methods: {
      getCreditList () {
        user.getCreditList().then((json) => {
          if (json.b_waiting_credit) {
            this.creditStatus = '报告生成中'
          } else if (!json.b_mobile_info) {
            this.creditStatus = '马上认证'
          } else if (!json.b_credit) {
            this.creditStatus = '报告已过期，请重新认证'
          }
        })
      }
    },
    route: {},
    created () {
      this.getCreditList()
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/function";

  .title {
    @extend %title;
  }

  .credit-icon {
    background-image: url("../../assets/creditInfo.svg");
  }

  .bank-icon {
    background-image: url("../../assets/bankCard_r.svg");
  }

  .friend-icon {
    background-image: url("../../assets/friend.svg");
  }

  .setting-icon {
    background-image: url("../../assets/setting.svg");
  }

  .tutorial-icon {
    background-image: url("../../assets/tutorial_icon.svg");
  }

  .box {
    display: flex;
    background-color: white;
    flex-flow: row wrap;
    text-align: center;
    .icon {
      @extend %title-icon;
      height: 24px;
      width: 100%;
      margin-top: 10px;
    }
    .text {
      margin-bottom: 10px;
      color: $MAIN_TEXT_COLOR;
      font-size: $TIP_FONT_SIZE;
      margin-top: 5px;
    }
  }

  .in-icon {
    background-image: url("../../assets/inList.svg");
  }

  .out-icon {
    background-image: url("../../assets/outList.svg");
  }

  .guarantee-icon {
    background-image: url("../../assets/guarantee.svg");
  }

  .user {
    padding-top: 0 !important;
    .row::before {
      display: none;
    }
    &-icon {
      @include user-icon(44px);
      margin-right: 10px;
    }
    .title {
      align-items: center;
    }
    .user-info {
      line-height: 25px;
      padding: 15px 0;
      > :last-child {
        font-size: $TIP_FONT_SIZE;
        color: $TIP_COLOR;
      }
    }
  }

  .tel-bg {
    background: url(../../assets/operators_main.svg) -3px center no-repeat;
    background-size: 15px 22px;
    padding: 0 0 0 15px;
  }

  .credit-tip {
    font-size: $TIP_FONT_SIZE;
    color: $TIP_COLOR;
  }
</style>
