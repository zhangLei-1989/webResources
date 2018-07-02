/**
 * Created by hq5544 on 16/7/23.
 */
import userService from '../views/system/userService'
import authorizationService from '../views/system/authorizationService'
import iouService from '../views/system/iouService'
import iouService0 from '../views/system/iouService0'
import iouService1 from '../views/system/iouService1'
import iouService3 from '../views/system/iouService3'
import iouService4 from '../views/system/iouService4'
import iouService5 from '../views/system/iouService5'
import iouService6 from '../views/system/iouService6'
import iouService7 from '../views/system/iouService7'
import guranteeService from '../views/system/guaranteeService'
import commonProblem from '../views/system/commonProblem'
import zhengxinHelp from '../views/system/zhengxinHelp'
import aboutUs from '../views/system/aboutUs'
import panels from '../views/system/panels'
import beginnerGuide from '../views/system/beginnerGuide'
import toBidGuideStep1 from '../views/system/toBidGuideStep1'
import toBidGuideStep2 from '../views/system/toBidGuideStep2'
import toBidGuideStep3 from '../views/system/toBidGuideStep3'
import toLendGuideStep1 from '../views/system/toLendGuideStep1'
import toLendGuideStep2 from '../views/system/toLendGuideStep2'
import toLendGuideStep3 from '../views/system/toLendGuideStep3'
import toGuaranteeGuide from '../views/system/toGuaranteeGuide'
import toProdListGuide from '../views/system/toProdListGuide'
import updateHistory from '../views/system/updateHistory'

export default {
  // 用户协议
  '/userService': {
    num: 108,
    name: 'userService',
    title: '用户注册协议',
    component: userService
  },
  // 借款协议
  '/iouService/:iouId': {
    num: 109,
    name: 'iouService',
    title: '借款协议',
    component: iouService
  },
  // 借款协议 v0
  '/iouService0/:iouId': {
    num: 110,
    name: 'iouService0',
    title: '借款协议',
    component: iouService0
  },
  // 借款协议 v1
  '/iouService1/:iouId': {
    num: 111,
    name: 'iouService1',
    title: '借款协议',
    component: iouService1
  },
  // 借款协议 v3
  '/iouService3/:iouId': {
    num: 112,
    name: 'iouService3',
    title: '借款协议',
    component: iouService3
  },
  // 借款协议 v4
  '/iouService4/:iouId': {
    num: 113,
    name: 'iouService4',
    title: '借款协议',
    component: iouService4
  },
  // 借款协议 v5
  '/iouService5/:iouId': {
    num: 114,
    name: 'iouService5',
    title: '借款协议',
    component: iouService5
  },
  // 借款协议 v6
  '/iouService6/:iouId': {
    num: 137,
    name: 'iouService6',
    title: '借款协议',
    component: iouService6
  },
  // 借款协议 v7
  '/iouService7/:iouId': {
    num: 139,
    name: 'iouService7',
    title: '借款协议',
    component: iouService7
  },
  // 担保协议
  '/guaranteeService/:iouId': {
    num: 115,
    name: 'guranteeService',
    title: '担保协议',
    component: guranteeService
  },
  // 担保协议
  '/authorizationService': {
    num: 116,
    name: 'authorizationService',
    title: '担保协议',
    component: authorizationService
  },
  // 常见问题
  '/commonProblem': {
    num: 117,
    name: 'commonProblem',
    title: '常见问题',
    component: commonProblem
  },
  // 常见问题
  '/commonProblem/:from': {
    num: 118,
    name: 'commonProblem',
    title: '常见问题',
    component: commonProblem
  },
  // 关于我们
  '/aboutUs': {
    num: 119,
    name: 'aboutUs',
    title: '关于我们',
    component: aboutUs
  },
  // 征信帮助
  '/zhengxinHelp': {
    num: 120,
    name: 'zhengxinHelp',
    title: '征信帮助',
    component: zhengxinHelp
  },
  // 展板
  '/panels': {
    num: 121,
    name: 'panels',
    title: '展板',
    component: panels
  },
  // 新手引导
  '/beginnerGuide/:usual': {
    num: 122,
    name: 'beginnerGuide',
    title: '新手引导',
    component: beginnerGuide
  },
  // 新手引导-求借款1
  '/toBidGuideStep1': {
    num: 123,
    name: 'toBidGuideStep1',
    title: '新手引导-求借款',
    component: toBidGuideStep1
  },
  // 新手引导-求借款2
  '/toBidGuideStep2': {
    num: 124,
    name: 'toBidGuideStep2',
    title: '新手引导-求借款',
    component: toBidGuideStep2
  },
  // 新手引导-求借款3
  '/toBidGuideStep3': {
    num: 125,
    name: 'toBidGuideStep3',
    title: '新手引导-求借款',
    component: toBidGuideStep3
  },
  // 新手引导-出借方案1
  '/toLendGuideStep1': {
    num: 126,
    name: 'toLendGuideStep1',
    title: '新手引导-出借',

    component: toLendGuideStep1
  },
  // 新手引导-出借方案2
  '/toLendGuideStep2': {
    num: 127,
    name: 'toLendGuideStep2',
    title: '新手引导-出借',
    component: toLendGuideStep2
  },
  // 新手引导-出借方案3
  '/toLendGuideStep3': {
    num: 128,
    name: 'toLendGuideStep3',
    title: '新手引导-出借',
    component: toLendGuideStep3
  },
  // 新手引导-作担保
  '/toGuaranteeGuide': {
    num: 129,
    name: 'toGuaranteeGuide',
    title: '新手引导-作担保',
    component: toGuaranteeGuide
  },
  // 新手引导-我的产品列表
  '/toProdListGuide': {
    num: 130,
    name: 'toProdListGuide',
    title: '新手引导-我的出借列表',
    component: toProdListGuide
  },
  // 版本介绍
  '/updateHistory': {
    num: 131,
    name: 'updateHistory',
    title: '版本介绍',
    component: updateHistory
  }
}
