<template>
  <div>
    <!--<group :single="true"-->
    <!--:fixed="true">-->
    <!--<btn :text="'下载证据'"-->
    <!--:cut="1"-->
    <!--:next="true"-->
    <!--@click="download"></btn>-->
    <!--</group>-->
    <group>
      <div slot="tip_top"
           class="tip">
        <ele>如何下载证据？<br>
             1.点击打开以下您想要下载的文件；<br>
             2.点击屏幕右上角【...】，选择【复制链接】；<br>
             3.通过微信等方式将此链接在电脑浏览器中打开，文件就会自动下载到您的电脑上了。</ele>
      </div>
      <!--<ele @click="">保证担保合同</ele>-->
      <ele @click="getLoanAgreements">借款协议（如需下载建议彩印）</ele>
      <ele @click="getIOUSpecialExplain">借款协议中身份证号的说明（如需下载建议彩印）</ele>
      <ele v-if="onLine"
           @click="getTransferEvidence">转账凭证（如需下载建议彩印）
      </ele>
      <!--<ele @click="">双方注册信息</ele>-->
      <ele @click="getJuBaoXinTemplate">举报信模板</ele>
      <ele @click="getMinShiQiSuTemplate">民事起诉状模板</ele>
      <ele @click="getSuSongTemplate">提起诉讼需准备的手续和证据材料说明</ele>
      <ele @click="getZhongCaiShenQingTemplate">仲裁申请书模板</ele>
      <ele @click="getZhongCaiTemplate">提起仲裁需准备的手续和证据材料说明</ele>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import download from 'api/download'
  import iou from 'api/iou'
  import { alert } from 'tools/utils'

  export default{
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        id: '',
        onLine: false
      }
    },
    components: {},
    computed: {},
    methods: {
      download () {
        // todo: 下载证据的功能, 未完成
        window.console.log('download')
      },
      getJuBaoXinTemplate () {
        download.getJuBaoXinTemplate({
          iouId: this.id
        })
      },
      getMinShiQiSuTemplate () {
        download.getMinShiQiSuTemplate({
          iouId: this.id
        })
      },
      getSuSongTemplate () {
        download.getSuSongTemplate({
          iouId: this.id
        })
      },
      getZhongCaiTemplate () {
        download.getZhongCaiTemplate({
          iouId: this.id
        })
      },
      getZhongCaiShenQingTemplate () {
        download.getZhongCaiShenQingTemplate({
          iouId: this.id
        })
      },
      getIOUSpecialExplain () {
        download.getIOUSpecialExplain({
          iouId: this.id
        })
      },
      getLoanAgreements () {
        const url = download.getLoanAgreementsUrl({
          iouId: this.id
        })
        alert(`<div>请复制下方链接，在浏览器中打开：</div><div style="text-align: left; width: 100%; -webkit-user-select: text;">${url}</div>`)
      },
      getTransferEvidence () {
        download.getTransferEvidence({
          iouId: this.id
        })
      },
      getIou () {
        iou.getIOUDetail(this.id).then((json) => {
          this.onLine = json.b_online
        })
      }
    },
    route: {
      data ({ to: { params: { id } } }) {
        this.id = id
        this.getIou()
      }
    },
    created () {
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>

</style>
