/**
 * Created by hq5544 on 16/7/23.
 *
 * 17/4/28 修改路由举报记录添加传参type，删除addBackReprot
 */
import createReport from '../views/newReprot/createReport'
import preReport from '../views/newReprot/preReport'
import reportRecord from '../views/newReprot/reportRecord'

export default {
  // 发起举报
  '/createReport/:id/:amount/:lend/:type': {
    num: 143,
    name: 'createReport',
    title: '发起举报',
    component: createReport
  },
  // 补充证据
  '/updateReport/:id/:amount/:lend/:type': {
    num: 144,
    name: 'createReport',
    title: '补充证据',
    component: createReport
  },
  // 反馈证据
  '/addBackReprot/:id/:amount/:lend/:type': {
    num: 145,
    name: 'createReport',
    title: '反馈证据',
    component: createReport
  },
  // 发起举报
  '/preReport/:id/:amount/:type': {
    num: 146,
    name: 'preReport',
    title: '发起举报',
    component: preReport
  },
  // 举报记录
  '/reportRecord/:id/:type': {
    num: 147,
    name: 'reportRecord',
    title: '举报记录',
    component: reportRecord
  },
}
