<template>
  <div>
    <group class="content">
      <div v-if="type == 1">
        <div>
          今借到是一个基于大数据征信服务的金融科技 SaaS 平台，依托微信社交平台，通过信用大数据风控和立体催收系统，帮助出借人获客、风控、交易和催收，从而提高借贷效率。目前主要提供求借款、补借条、查信用和去出借四大功能。
        </div>
        <div class="p">
          <!--<img src="../../assets/shareOnce1.png">-->
          <div class="fangbian"></div>
          <div>
            <div class="title">方便</div>
            <div>使用方便，无需下载。</div>
            <div>微信关注公众号即可。</div>
          </div>
        </div>
        <div class="p">
          <div class="kuaisu"></div>
          <div>
            <div class="title">快速</div>
            <div>求借款、补借条、申请借款。</div>
            <div>多种借款姿势想怎么借就怎么借。</div>
          </div>
        </div>
        <div class="p">
          <div class="anquan"></div>
          <div>
            <div class="title">安全</div>
            <div>实名认证、信用报告、电子合同、第三方支付。</div>
            <div>确保安全有法律效力。</div>
          </div>
        </div>
        <div class="p">
          <div class="touming"></div>
          <div>
            <div class="title">透明</div>
            <div>出借指标、收费标准、借款进度...</div>
            <div>一目了然，公开透明。</div>
          </div>
        </div>
      </div>
      <div v-if="type == 2">
        <div>
          今借到是一个基于大数据征信服务的金融科技 SaaS 平台，依托微信社交平台，通过信用大数据风控和立体催收系统，帮助出借人获客、风控、交易和催收，从而提高借贷效率。目前主要提供求借款、补借条、查信用和去出借四大功能。
        </div>
        <div class="p">
          <div class="huoke"></div>
          <div>
            <div class="title">获客</div>
            <div>品牌背书信用沉淀。</div>
            <div>信用报告强力增信，线上线下双渠道传播，出借指标帮助用户快速识别适合自己的出借。</div>
          </div>
        </div>
        <div class="p">
          <!--<img src="../../assets/shareOnce6.png">-->
          <div class="fengkong"></div>
          <div>
            <div class="title">风控</div>
            <div>智能智慧双引擎。</div>
            <div>银行级别的信用报告辅助决策，出借人还可以借助微信视频结合自身经验深入审核借款人资质。</div>
          </div>
        </div>
        <div class="p">
          <div class="jiaoyi"></div>
          <div>
            <div class="title">交易</div>
            <div>安全有法律效力。</div>
            <div>身份认证、电子合同以及第三方支付构建了一个安全有法律效力的交易环境。</div>
          </div>
        </div>
        <div class="p">
          <div class="cuishou"></div>
          <div>
            <div class="title">催收</div>
            <div>立体催收系统。</div>
            <div>平台提供了消息推送、电话催收、征信黑名单、法律支持等多种催收方法。</div>
          </div>
        </div>
      </div>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: [
      'type'
    ],
    data () {
      return {
        huoke: require('../../assets/shareOnce5.png')
      }
    },
    methods: {},
    components: {}
  }
</script>
<style lang="scss"
       scoped>
  @import "../../scss/const";

  .content {
    color: #666;
    font-size: $MIN_FONT_SIZE;
    line-height: 25px;
    padding: 10px;
  }

  .p {
    /*display: flex;*/
    display: -webkit-box;
    margin: 10px 20px 0 0px;
    div:first-child {
      width: 30px;
      height: 30px;
      background-size: 25px 25px;
      margin-top: 5px;
    }
    img {
      width: 30px;
      height: 30px;
      margin: 5px;
    }
    .title {
      font-size: $TIP_FONT_SIZE;
      color: $STRONG_TEXT_COLOR;
    }
  }

  .fangbian {
    background: url("../../assets/shareOnce1.png") no-repeat;
  }

  .kuaisu {
    background: url("../../assets/shareOnce2.png") no-repeat;
  }

  .anquan {
    background: url("../../assets/shareOnce3.png") no-repeat;
  }

  .touming {
    background: url("../../assets/shareOnce4.png") no-repeat;
  }

  .huoke {
    background: url("../../assets/shareOnce5.png") no-repeat;
  }

  .fengkong {
    background: url("../../assets/shareOnce6.png") no-repeat;
  }

  .jiaoyi {
    background: url("../../assets/shareOnce7.png") no-repeat;
  }

  .cuishou {
    background: url("../../assets/shareOnce8.png") no-repeat;
  }
</style>
