<template>
  <div>
    <group :single="true"
           :fixed="true">
      <btn :cut="1"
           :text="'确认提交'"
           :next="true"
           @click="createReport">
      </btn>
    </group>
    <group>
      <ele>
        <div class="tip-box">
          <span>举报原因</span>
          <span v-if="type === 1"
                class="tip-alert"
                @click.stop.prevent="showTip(reportType)"></span>
        </div>
        <div>
          {{reportReason}}
        </div>
      </ele>
      <ele v-if="reportType === 3">
        <div slot="left">
          真实出借金额
        </div>
        <div>
          {{lend}}元
        </div>
      </ele>
      <ele v-if="reportType === 3">
        <div class="tip-box">
          <span>应还金额</span>
          <span v-if="type === 1"
                class="tip-alert"
                @click.stop.prevent="showTip()"></span>
        </div>
        <div>
          {{shouldRepay}}元
        </div>
      </ele>
      <ele v-if="type === 1 && reportType === 1">
        <div>已还待确认金额</div>
        <input slot="right"
               type="number"
               placeholder="请输入已还待确认金额"
               v-model="repaid">
        <div slot="unit">元</div>
      </ele>
      <ele v-if="type === 2 && reportType === 1">
        <div>已还待确认金额</div>
        <div>{{repaid}}元</div>
      </ele>
      <ele>
        <textarea growing-track="true"
                  v-model="addReason"
                  maxlength="500"
                  placeholder="补充说明，不超过500字"></textarea>
      </ele>
    </group>
    <!-- 关于显示照片上传的条件：reportType： 0：裸条；1：不确认收款；2：完全没出借；3：部分出借
          0：证明裸条证据1张图片
          1：凭证1张图片和其他一张图片
          2：证明完全未借出1张图片
          3：凭证1张图片和其他一张图片-->
    <group>
      <ele :no-line="true"
           class="upload-tip">
        <div v-if="type === 1 && reportType === 0">
          请上传出借人索要裸条的聊天记录以及您发送给出借人的记录，证明该借条确实是裸条
        </div>
        <div v-if="type === 1 && reportType === 1">
          请将转账凭证请单独上传到此处（推荐线上还款只需上传还款记录截图片，线下还款仅支持银行卡/支付宝/微信）
        </div>
        <div v-if="type === 1 && reportType === 2">
          请上传真实有效的证据，证明出借人确实没有出借（如聊天记录等）
        </div>
        <div v-if="type === 1 && reportType === 3">
          请按照上面的应还金额还款并将转账凭证请单独上传到此处（推荐线上还款只需上传还款记录的截图，线下还款仅支持银行卡/支付宝/微信）
        </div>
        <div v-if="type === 2 && reportType === 0">
          请上传真实有效的证据，证明该借条不是裸条
        </div>
        <div v-if="type === 2 && reportType === 1">
          请上传真实有效的证据，证明借款人确实没有还款（如聊天记录等）
        </div>
        <div v-if="type === 2 && reportType === 2">
          请将出借的转账凭证请单独上传到此处（线下出借仅支持银行卡/支付宝/微信）
        </div>
        <div v-if="type === 2 && reportType === 3">
          请将出借的转账凭证请单独上传到此处（线下出借仅支持银行卡/支付宝/微信）
        </div>
      </ele>
      <ele>
        <show-pic :upload="true"
                  :pic-urls="picUrls1"
                  @upload-pic="uploaded1"></show-pic>
      </ele>
      <ele :no-line="true"
           v-if="type === 1 && (reportType === 1 || reportType === 3)"
           class="upload-tip">
        <div v-if="reportType === 1">
          请上传其它真实有效的证据，证明确实有还款（如聊天记录等）
        </div>
        <div v-if="reportType === 3">
          请上传真实有效的证据，证明出借人确实没有全额出借/出借人已收到还款（如聊天记录等）
        </div>
      </ele>
      <ele :no-line="true"
           v-if="type === 2 && (reportType === 2 || reportType === 3)"
           class="upload-tip">
        <div v-if="reportType === 2">
          请上传其它真实有效的证据，证明确实有出借（如聊天记录等）
        </div>
        <div v-if="reportType === 3">
          请上传真实有效的证据，证明借款人已收到款/借款人确实没有还款（如聊天记录等）
        </div>
      </ele>
      <ele v-if="(type === 1 && (reportType === 1 || reportType === 3)) || (type === 2 && (reportType === 2 || reportType === 3))">
        <show-pic :upload="true"
                  :pic-urls="picUrls2"
                  @upload-pic="uploaded2"></show-pic>
      </ele>
    </group>

     

  </div>
</template>
<script type="text/ecmascript-6">
  import showPic from 'components/mixin/showPic'
  import ioureport from 'api/ioureport'
  import { feedback, alert } from 'tools/utils'

  export default {
    data () {
      return {
        lenderId: '',
        borrowerId: '',
        reportReason: '',
        id: '',
        picUrls1: [],
        uploadUrls1: [],
        picUrls2: [],
        uploadUrls2: [],
        borrowerImgList: [],
        borrowerOtherImgList: [],
        lenderImgList: [],
        lenderOtherImgList: [],
        addReason: '',
        type: 0,
        amount: 0,
        lend: 0,
        shouldRepay: 0,
        repaid: '',
        routerType: '',
        reportType: 0, // 0：裸条；1：不确认收款；2：完全没出借；3：部分出借
      }
    },
    methods: {
      showTip (type) {
        if (type === 0) {
          alert('对于裸条的举报，如果借款人提供了真实的交易证据平台会即刻拉黑出借人，该出借人不能继续借款/出借')
        } else if (type === 1) {
          alert('对于出借人不确认收款的举报，如果借款人上传真实还款凭证平台会确认相关还款并消除借款人相关逾期记录，出借人被标记1次，标记3次不能再使用补借条，还有可能被拉黑')
        } if (type === 2) {
          alert('对于出借人完全没出借的举报，如果出借人不能提供有力出借凭证平台会将该借条置为“有争议”状态，消除借款人相关逾期记录，出借人被标记1次，标记3次不能再使用补借条，还有可能被拉黑')
        } if (type === 3) {
          alert('对于出借人部分出借的举报，如果借款人确实还清了应还金额平台会将该借条置为“有争议”状态，消除借款人相关逾期记录，出借人被标记1次，标记3次后不能再使用补借条，还有可能被拉黑')
        } else {
          alert('应还金额计算规则：当前应还金额=真实出借金额+约定利息+罚息（罚息按照年化利率24%计算）')
        }
      },
      getReportIOU () {
        ioureport.getReportIOU({
          iouId: this.id,
        }).then((res) => {
          window.console.log(res)
        })
      },
      uploaded1 (obj) {
        this.picUrls1.push(obj.localId)
        this.uploadUrls1.push(obj.serverId)
      },
      uploaded2 (obj) {
        this.picUrls2.push(obj.localId)
        this.uploadUrls2.push(obj.serverId)
      },
      createReport () {
        if (this.routerType === 'updateReport') {
          /**
           * 如果为借款人，则只修改借款人的部分
           * 否则，修改借出人的部分
           */
          if (this.type === 1) {
            this.lenderImgList = []
            this.lenderOtherImgList = []
            this.borrowerImgList = this.uploadUrls1
            this.borrowerOtherImgList = this.uploadUrls2
          } else if (this.type === 2) {
            this.lenderImgList = this.uploadUrls1
            this.lenderOtherImgList = this.uploadUrls2
            this.borrowerImgList = []
            this.borrowerOtherImgList = []
          }
          ioureport.updateReportIOU({
            id: this.id, // 借条id
            borrowerAddReason: '', // 借款人补充说明
            lenderAddReason: this.addReason, // 出借人补充说明
            luotiao: this.reportType === 0 ? 1 : 0,
            borrowerId: this.borrowerId,
            lenderId: this.lenderId,
            reason: this.reportReason,
            realLend: this.lend,
            borrowerImgList: this.borrowerImgList,
            borrowerOtherImgList: this.borrowerOtherImgList,
            lenderImgList: this.lenderImgList,
            lenderOtherImgList: this.lenderOtherImgList,
          }).then(() => {
            feedback('提交成功')
          })
        } else if (this.routerType === 'createReport') {
          ioureport.addReportIOU({
            id: this.id,
            addReason: this.addReason,
            luotiao: this.reportType === 0 ? 1 : 0,
            realLend: this.lend,
            reason: this.reportReason,
            imgList: this.uploadUrls1,
            otherImgList: this.uploadUrls2,
          }).then(() => {
            feedback('提交成功')
          })
        } else if (this.routerType === 'addBackReprot') {
          ioureport.addBackReportIOU({
            id: this.id,
            addReason: this.addReason,
            luotiao: this.reportType === 0 ? 1 : 0,
            realLend: this.realLend,
            reason: this.reportReason,
            imgList: this.uploadUrls1,
            otherImgList: this.uploadUrls2,
          }).then(() => {
            feedback('提交成功')
          })
        }
      },
    },
    components: {
      showPic
    },
    route: {
      data ({ to: { path, params: { id, amount, lend, type } } }) {
        this.id = id
        this.amount = parseFloat(amount)
        this.lend = parseFloat(lend)
        this.type = Number(type)
        this.routerType = path.split('/')[1]
        // todo: 查看举报详情
//        if (this.type === 'updateReport') {
//          this.getReportIOU()
//        }
        if (this.amount === 0) {
          this.reportType = 0
          this.reportReason = '裸条'
        } else if (this.lend === 0) {
          this.reportType = 2
          this.reportReason = '完全没出借'
        } else if (this.lend < this.amount) {
          this.reportType = 3
          this.reportReason = '部分出借'
        } else {
          this.reportType = 1
          this.reportReason = '不确认收款'
        }
        this.getReportIOU()
      }
    }
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/fragment';

  .tip-detail {
    font-size: $TIP_FONT_SIZE;
    align-self: center;
    color: $MAIN_COLOR;
    text-align: right;
    padding-right: 10px;
  }

  .upload-tip {
    padding: 10px 10px 0 10px;
  }

  .tip-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row !important;
    .tip-alert {
      width: 20px;
      height: 30px;
      background: url("../../assets/info.svg") center no-repeat {
        size: 12px;
      }
    }
  }
</style>
