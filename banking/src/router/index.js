import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/components/Index"

// 登录
import Login from '@/components/Login'

// 工作台
import Home from '@/components/Home'

// 审批
import ExaminaApproval from '@/components/ExaminaApproval'
import WaitExaminaApproval from '@/components/examinaApproval/WaitExaminaApproval'
import AlreadyAdopted from '@/components/examinaApproval/AlreadyAdopted'
import AlreadyReject from '@/components/examinaApproval/AlreadyReject'
import AlreadyGenerate from '@/components/examinaApproval/AlreadyGenerate'

// 合同
import Contract from '@/components/Contract'
import Examine from '@/components/contract/Examine'
import AlreadyComplete from '@/components/contract/AlreadyComplete'

// 财务
import Finance from '@/components/Finance'
import ShouldCollect from '@/components/finance/shouldCollect'
import AlreadyCollect from '@/components/finance/alreadyCollect'
import WaitMoneyContract from '@/components/finance/waitMoneyContract'

// 合作
import Cooperation from '@/components/cooperation'
import Partners from '@/components/cooperation/partners'

// 设置
import Setting from '@/components/Setting'
import ApartmentRole from '@/components/setting/ApartmentRole'
import RoleManger from '@/components/setting/RoleManger'
import StaffManger from '@/components/setting/StaffManger'
 import DictManger from '@/components/setting/DictManger'
// import DictManger from '@/components/setting/Dictionary'
import CorporateBulletin from '@/components/setting/CorporateBulletin'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {   // 初始化页面
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {  // 工作台
          path: '/home',
          name: 'home',
          component: Home
        },
        {  // 审批
          path: '/examinaApproval',
          name: 'examinaApproval',
          component: ExaminaApproval,
          children: [
            {
              path: "waitExaminaApproval",
              name: "waitExaminaApproval",
              component: WaitExaminaApproval
            }, {
              path: "alreadyAdopted",
              name: "alreadyAdopted",
              component: AlreadyAdopted
            }, {
              path: "alreadyReject",
              name: "alreadyReject",
              component: AlreadyReject
            }, {
              path: "alreadyGenerate",
              name: "alreadyGenerate",
              component: AlreadyGenerate
            }
          ]
        },
        {  // 合同
          path: "/contract",
          name: "contract",
          component: Contract,
          children: [
            {
              path: "examine",
              name: "examine",
              component: Examine
            },
            {
              path: "alreadyComplete",
              name: "alreadyComplete",
              component: AlreadyComplete
            }
          ]
        },
        {  // 财务
          path: "/finance",
          name: "finance",
          component: Finance,
          children: [
            {
              path: "shouldCollect",
              name: "shouldCollect",
              component: ShouldCollect
            },
            {
              path: "alreadyCollect",
              name: "alreadyCollect",
              component: AlreadyCollect
            },
            {
              path: "waitMoneyContract",
              name: "waitMoneyContract",
              component: WaitMoneyContract
            }
          ]
        },
        {  // 合作
          path: "/cooperation",
          name: "cooperation",
          component: Cooperation,
          children: [
            {
              path: "partners",
              name: "partners",
              component: Partners
            }
          ]
        },
        {  // 设置
          path: "/setting",
          name: "setting",
          component: Setting,
          children: [
            {
              path: "apartmentRole",
              name: "apartmentRole",
              component: ApartmentRole
            },{
              path: "roleManger",
              name: "roleManger",
              component: RoleManger
            },{
              path: "staffManger",
              name: "staffManger",
              component: StaffManger
            },{
              path: "dictManger",
              name: "dictManger",
              component: DictManger
            },{
              path: "corporateBulletin",
              name: "corporateBulletin",
              component: CorporateBulletin
            }
          ]
        }
      ]
    },
    {   // 登录
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "*",
      redirect: "home"
    }
  ]
})
