/**
 * Created by hq5544 on 16/7/23.
 */
import updateCreditInfoMy from '../views/creditCenter/updateCreditInfoMy'
import jobInfo from '../views/creditCenter/jobInfo'
import incomeInfo from '../views/creditCenter/incomeInfo'
import carInfo from '../views/creditCenter/carInfo'
import houseInfo from '../views/creditCenter/houseInfo'
import baseInfo from '../views/creditCenter/baseInfo'
import zhimaInfo from '../views/creditCenter/zhimaInfo'
import operatorInfo from '../views/creditCenter/operatorInfo'
import jingdongInfo from '../views/creditCenter/jingdongInfo'
import taobaoInfo from '../views/creditCenter/taobaoInfo'
import xuexinInfo from '../views/creditCenter/xuexinInfo'
import zhengxinInfo from '../views/creditCenter/zhengxinInfo'
import citySelect from '../views/creditCenter/citySelect'
import noCredit from '../views/creditCenter/noCredit'
import friendsNoCredit from '../views/creditCenter/friendsNoCredit'
import payCredit from '../views/creditCenter/payCredit'
import operatorHelp1 from '../views/creditCenter/operatorHelp1'
import operatorHelp2 from '../views/creditCenter/operatorHelp2'

export default {
  // 更新信用报告（基础信息）
  '/baseInfo': {
    num: 7,
    name: 'baseInfo',
    title: '基础信息',
    component: baseInfo
  },
  '/baseInfo/:single': {
    num: 7,
    name: 'baseInfo',
    title: '基础信息',
    component: baseInfo
  },
  // 芝麻信用授权
  '/zhimaInfo': {
    num: 8,
    name: 'zhimaInfo',
    title: '芝麻信用授权',
    component: zhimaInfo
  },
  // 芝麻信用授权，今济计划
  '/zhimaInfo/:jjjh': {
    num: 8,
    name: 'zhimaInfo',
    title: '芝麻信用授权',
    component: zhimaInfo
  },
  // 更新信用报告（运营商信息）
  '/operatorInfo': {
    num: 9,
    name: 'operatorInfo',
    title: '运营商信息',
    component: operatorInfo
  },
  // 更新信用报告（今济计划）
  '/operatorInfo/:jjjh': {
    num: 9,
    name: 'operatorInfo',
    title: '运营商信息',
    component: operatorInfo
  },
  // 更新信用报告（京东信息）
  '/jingdongInfo': {
    num: 10,
    name: 'jingdongInfo',
    title: '京东信息',
    component: jingdongInfo
  },
  // 更新信用报告（淘宝信息）
  '/taobaoInfo': {
    num: 11,
    name: 'taobaoInfo',
    title: '淘宝信息',
    component: taobaoInfo
  },
  // 更新信用报告（学信信息）
  '/xuexinInfo': {
    num: 12,
    name: 'xuexinInfo',
    title: '学信信息',
    component: xuexinInfo
  },
  // 更新信用报告（今济计划）
  '/xuexinInfo/:jjjh': {
    num: 12,
    name: 'xuexinInfo',
    title: '学信信息',
    component: xuexinInfo
  },
  // 更新信用报告（征信信息）
  '/zhengxinInfo': {
    num: 13,
    name: 'zhengxinInfo',
    title: '征信信息',
    component: zhengxinInfo
  },
  // 更新信用报告（工作信息）
  '/jobInfo': {
    num: 14,
    name: 'jobInfo',
    title: '工作信息',
    component: jobInfo
  },
  // 更新信用报告（收入信息）
  '/incomeInfo': {
    num: 15,
    name: 'incomeInfo',
    title: '收入信息',
    component: incomeInfo
  },
  // 更新信用报告（车产信息）
  '/carInfo': {
    num: 16,
    name: 'carInfo',
    title: '车产信息',
    component: carInfo
  },
  // 更新信用报告（房产信息）
  '/houseInfo': {
    num: 17,
    name: 'houseInfo',
    title: '房产信息',
    component: houseInfo
  },
  // 更新信用报告（我的）
  '/updateCreditInfoMy': {
    num: 18,
    name: 'updateCreditInfoMy',
    title: '更新信用报告',
    component: updateCreditInfoMy
  },
  // 更新信用报告（需要补充）
  '/updateCreditInfoMy/:id/:p1/:p2/:p3/:p4/:p5/:p6': {
    num: 19,
    name: 'updateCreditInfoMy',
    title: '更新信用报告',
    component: updateCreditInfoMy
  },
  // 城市街道选择
  '/citySelect': {
    num: 20,
    name: 'citySelect',
    title: '更新信用报告',
    component: citySelect
  },
  // 没有信用中心
  '/noCredit': {
    num: 21,
    name: 'noCredit',
    title: '信用报告',
    component: noCredit
  },
  // 好友没有信用中心
  '/friendsNoCredit': {
    num: 22,
    name: 'friendsNoCredit',
    title: '信用报告未完成',
    component: friendsNoCredit
  },
  // 购买信用中心
  '/payCredit': {
    num: 23,
    name: 'payCredit',
    title: '信用报告',
    component: payCredit
  },
  // 购买信用中心，不需要走后续流程
  '/payCredit/:no': {
    num: 24,
    name: 'payCredit',
    title: '信用报告',
    component: payCredit
  },
  // 运营商使用
  '/operatorHelp1': {
    num: 140,
    name: 'operatorHelp1',
    title: '运营商信息',
    component: operatorHelp1,
  },
  // 运营商使用
  '/operatorHelp2': {
    num: 141,
    name: 'operatorHelp2',
    title: '运营商信息',
    component: operatorHelp2,
  },
}
