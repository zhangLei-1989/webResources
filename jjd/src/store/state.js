/**
 * Created by hq5544 on 16/3/26.
 * 初始状态
 */
const state = {
  // 小金 token:
  // 洪全 token: jjd_D9F617688C8D810A171E0CC80F0C334D
  // 敬聪 token: jjd_5DC2B12B4D356567221D418BE8F306B3
  // 媛媛 token:
//    媛媛-生产环境:
  token: '',
  userInfo: {
    // 洪全 userId: 201609181017234973
    // 敬聪 userId: bbc7de27-baa0-4297-afb8-9b0d6a1e4f49
    userId: '',
    // 洪全 openId: o7zIvt3ZMfjGvxC2uxlDFR2Ntvn0
    // 敬聪 openId: o7zIvt3TIAgZ--vRlxFAhiLr8EH4
    // 媛媛 openId: o7zIvtwkf8vOY-sGNJ_MpCQqxzB0
    openId: '',
    tel: '',
    unionId: '',
    nickname: '',
    userIcon: '',
    subscribe: 1,
    cache: ''
  },
  initOk: false,
  loading: false,
  waiting: false,
  title: '今借到',
  currentPage: 'bid',
  currentShare: 'index',
  pullRefresh: false,
  popupShow: false,
  popupHideBan: false,
  toRegist: false,
  needRefresh: false,
  transition: {
    pageList: ['/'],
    transitionMode: 'in'
  },
  popupSettings: {
    title: '',
    btnList: [],
    content: '',
    className: ''
  },
  feedbackSettings: {
    show: false,
    content: ''
  },
  creditCenter: {
    first: false,
    updateBaseInfo: false
  },
  address: {
    addressDistrict: '',
    addressObj: {}
  },
  temp: {
    cache: {
      bidFirstTime: false,
      iouFirstTime: false,
      prodFirstTime: false,
      prodListFirstTime: false,
      beginnerGuide: false,
      noTipBorrowerCreate: false,
      noTipBorrowerConfirm: false,
      noTipLenderCreate: false,
      noTipLenderConfirm: false,
      tutorialIndex: false,
      tutorialDetail: false,
      overdueTip: false
    },
    indexProd: {
      updateTime: 0
    },
    indexBid: {
      updateTime: 0
    },
    modifyPayPwd: {},
    offlineRepay: {},
    guarantorList: {},
    showPurpose: {},
    baseInfo: {},
    seekCredit: {},
    createBid: {},
    createIOU: {},
    addNewPro: {},
    buy: {},
    chooseFriends: {},
    guarantee: {},
    houseInfo: {},
    carInfo: {},
    incomeInfo: {},
    jobInfo: {},
    scrollY: {
      createBid: 0
    }
  },
  creditInfo: {
    bankName: '',
    bankAccount: '',
    isSetPwd: '',
    isCredit: '',
    isbindCard: ''
  },
  isJjjhClosed: false,
}

export default state
