/**
 * Created by hq5544 on 16/7/23.
 */
import productDetailLender from '../views/product/productDetailLender'
import buy from '../views/product/buy'
import productDetailBorrower from '../views/product/productDetailBorrower'
import loanDetailBorrower from '../views/product/loanDetailBorrower'
import loanDetailLender from '../views/product/loanDetailLender'
import applyCondition from '../views/product/applyCondition'
import addNewPro from '../views/product/addNewPro'
import productList from '../views/product/productList'
import prodOnce from '../views/product/prodOnce'
import prodListOnce from '../views/product/prodListOnce'
import shareOthers from '../views/product/shareOthers'
import shareQr from '../views/product/shareQr'
import prodContent from '../views/product/prodContent'
import signboard from '../views/product/signboard'
import deskCard from '../views/product/deskCard'
import businessCard from '../views/product/businessCard'
import download from '../views/product/download'
import success from '../views/product/success'

export default {
  // 待还列表
  '/productDetailLender/:id': {
    num: 63,
    name: 'productDetail',
    title: '出借详情',
    component: productDetailLender
  },
  // 申请贷款
  '/buy/:id/:isCredit': {
    num: 64,
    name: 'buy',
    title: '马上申请',
    component: buy
  },
  // 贷款产品详情 for 借款人
  '/productDetailBorrower/:id': {
    num: 65,
    name: 'productDetailBorrower',
    title: '出借详情',
    component: productDetailBorrower
  },
  // 贷款详情 for 借款人
  '/loanDetailBorrower/:id': {
    num: 66,
    name: 'loanDetailBorrower',
    title: '借款详情',
    component: loanDetailBorrower
  },
  // 贷款详情 for 出借人
  '/loanDetailLender/:id': {
    num: 67,
    name: 'loanDetailLender',
    title: '借款详情',
    component: loanDetailLender
  },
  // 申请条件
  '/applyCondition': {
    num: 68,
    name: 'applyCondition',
    title: '申请条件',
    component: applyCondition
  },
  // 添加新产品
  '/addNewPro': {
    num: 69,
    name: 'addNewPro',
    title: '添加出借',
    component: addNewPro
  },
  // 产品列表
  '/productList/:id': {
    num: 70,
    name: 'productList',
    title: '我的出借',
    component: productList
  },
  // 分享的产品, 第一次使用
  '/prodOnce/:id': {
    num: 71,
    name: 'prodOnce',
    title: '今借到',
    component: prodOnce
  },
  // 分享的产品列表, 第一次使用
  '/prodListOnce/:userId': {
    num: 72,
    name: 'prodListOnce',
    title: '今借到',
    component: prodListOnce
  },
  // 分享到其他平台
  '/shareOthers/:type/:id/:userId': {
    // @type = prod / list
    num: 73,
    name: 'shareOthers',
    title: '分享',
    component: shareOthers
  },
  // 分享二维码
  '/shareQr/:type/:firstPage/:id': {
    // @type = prod / list / iou / bid_l / bid_g
    // firstPage是否由首页进入0否 1是
    num: 74,
    name: 'shareQr',
    title: '分享',
    component: shareQr
  },
  // 产品内容
  '/prodContent/:id': {
    num: 75,
    name: 'prodContent',
    title: '出借内容',
    component: prodContent
  },
  // 下载入口
  '/download/:type/:id': {
    // type = prod / list
    num: 76,
    name: 'download',
    title: '下载',
    component: download
  },
  // 下载挂牌
  '/signboard/:id': {
    num: 77,
    name: 'signboard',
    title: '下载挂牌',
    component: signboard
  },
  // 下载桌贴
  '/deskCard/:type/:id': {
    // type = prod / list
    num: 78,
    name: 'deskCard',
    title: '下载桌贴',
    component: deskCard
  },
  // 下载名片
  '/businessCard/:type/:id': {
    num: 79,
    name: 'businessCard',
    title: '下载名片',
    component: businessCard
  },
  // 申请产品成功
  '/success/:amount': {
    num: 142,
    name: 'success',
    title: '申请成功',
    component: success
  },
}
