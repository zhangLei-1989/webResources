/**
 * Created by hq5544 on 16/4/6.
 */
import { ajaxGet, ajaxJson } from '../tools/utils'

export default {
  // 获取当前用户的身份证号码
  getMyCompleteIdcard () {
    return ajaxGet('my/getMyCompleteIdcard')
  },
  // 首页-获取用户可见的产品信息
  getVisibleProduct () {
    return ajaxJson('my/getVisibleProduct')
  },
  // 未注册-获取用户可见的产品信息
  getUnregistVisibleProduct ({
    openId
  }) {
    return ajaxGet('my/getUnregistVisibleProduct', {
      openId
    }, true)
  },
  // 获取用户待还列表
  getToRepayList () {
    return ajaxGet('my/getToRepayList')
  },
  // 获取用户待收列表
  getToReceiveList () {
    return ajaxGet('my/getToReceiveList')
  },
  // 我的钱包
  getMyAccountList () {
    return ajaxGet('my/getMyAccountList')
  },
  // 获取用户借出信息
  getLendAccount () {
    return ajaxGet('my/getLendAccount')
  },
  // 获取用户借入信息
  getBorrowAccount () {
    return ajaxGet('my/getBorrowAccount')
  },
  // 获取用户担保信息
  getGuaranteeAccount () {
    return ajaxGet('my/getGuaranteeAccount')
  },
  // 获取用户剩余待还本金余额限额20万
  getBorrowAmt () {
    return ajaxGet('my/getBorrowAmt')
  },
  // 信用报告简版-我的
  getCreditReportSimpleMine (userId) {
    return ajaxGet('report/getSimpleReport', {
      userId
    })
  },
  // 查询信用
  getUserCreditInfo ({
    name, tel
  }) {
    return ajaxJson('report/queryCredit', {
      name,
      tel
    })
  },
  // 获取查信用的结果
  getCreditResultInfo ({ name, tel }) {
    return ajaxJson('report/queryCredit', {
      name,
      tel
    })
  },
  // 获取我的好友列表
  getMyFriend () {
    return ajaxGet('my/getMyFriend')
  },
  // 设置备注
  setRemark ({
    friendId, // 好友id
    memo // 我的id
  }) {
    return ajaxJson('my/setFriendMemory', {
      friendId,
      memo
    })
  },
  // 信用中心houseInfo
  houseInfo ({
    city,
    cityDetail,
    houseType,
    houseArea,
    housePrice,
    payStatus,
    havePay,
    houseAge,
    isSecondHand,
    isMortgage,
    imgSrc
  }) {
    return ajaxJson('my/houseInfo', {
      city,
      cityDetail,
      houseType,
      houseArea,
      housePrice,
      payStatus,
      havePay,
      houseAge,
      isSecondHand,
      isMortgage,
      imgSrc
    })
  },
  carInfo ({
    carTypes,
    driveMileage,
    carPrice,
    havePay,
    payStatus,
    city,
    carAge,
    isSecondHand,
    isMortgage,
    imgSrc
  }) {
    return ajaxJson('my/carInfo', {
      carTypes,
      driveMileage,
      carPrice,
      havePay,
      payStatus,
      city,
      carAge,
      isSecondHand,
      isMortgage,
      imgSrc
    })
  },
  incomeInfo ({
    monIncome,
    imgSrc
  }) {
    return ajaxJson('my/incomeInfo', {
      monIncome,
      imgSrc
    })
  },
  jobInfo ({
    comName,
    position,
    date,
    tel,
    city,
    cityDetail,
    imgSrc
  }) {
    return ajaxJson('my/jobInfo', {
      comName,
      position,
      date,
      tel,
      city,
      cityDetail,
      imgSrc
    })
  },
  // 获取首页基本信息
  getFirstPageInfo () {
    return ajaxGet('my/getFirstPageInfo')
  },
  // 获取首页 bid 列表
  getVisibleBid () {
    return ajaxJson('my/getVisibleBid')
  },
  // 获取未注册首页 bid 列表
  getUnregistVisibleBid ({
    openId
  }) {
    return ajaxGet('my/getUnregistVisibleBid', {
      openId
    }, true)
  },
  // 获取平台信息
  getSystemInfo () {
    return ajaxGet('my/getSystemInfo', {}, true)
  }
}
