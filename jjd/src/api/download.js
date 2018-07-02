/**
 * Created by hq5544 on 16/4/6.
 */
import store from '../store/store'

const downloadUtils = {
  download (api) {
    window.location.href =
      `${window.$config.interfaceBase}/${api}`
  }
}

export default {
  // 下载举报信模板
  getJuBaoXinTemplate ({
    iouId
  }) {
    downloadUtils.download(
      `protocol/getJuBaoXinTemplate?iouId=${iouId}`
    )
  },
  // 下载民事起诉模板
  getMinShiQiSuTemplate ({
    iouId
  }) {
    downloadUtils.download(
      `protocol/getMinShiQiSuTemplate?iouId=${iouId}`
    )
  },
  // 下载起诉材料说明
  getSuSongTemplate ({
    iouId
  }) {
    downloadUtils.download(
      `protocol/getSuSongTemplate?iouId=${iouId}`
    )
  },
  // 下载仲裁材料说明
  getZhongCaiTemplate ({
    iouId
  }) {
    downloadUtils.download(
      `protocol/getZhongCaiTemplate?iouId=${iouId}`
    )
  },
  // 下载仲裁申请书模板
  getZhongCaiShenQingTemplate ({
    iouId
  }) {
    downloadUtils.download(
      `protocol/getZhongCaiShenQingTemplate?iouId=${iouId}`
    )
  },
  // 下载借款协议
  getLoanAgreements ({
    iouId
  }) {
    const token = store.state.token
    downloadUtils.download(
      `protocol/getLoanAgreements?token=${token}&iouId=${iouId}`
    )
  },
  // 下载借款协议，得到 url
  getLoanAgreementsUrl ({
    iouId
  }) {
    const token = store.state.token
    return `${window.$config.interfaceBase}/protocol/getLoanAgreements?token=${token}&iouId=${iouId}`
  },
  // 下载转账证据
  getTransferEvidence ({
    iouId
  }) {
    const token = store.state.token
    downloadUtils.download(
      `protocol/getTransferEvidence?token=${token}&iouId=${iouId}`
    )
  },
  // 下载身份证号的说明
  getIOUSpecialExplain ({
    iouId
  }) {
    const token = store.state.token
    downloadUtils.download(
      `protocol/getIOUSpecialExplain?token=${token}&iouId=${iouId}`
    )
  },
}
