import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/components/Index"

// 首页
import Home from '@/components/Home'

// 登录
import Login from '@/components/Login'

// 订单
import Contract from '@/components/Contract'
import ContractList from '@/components/contract/ContractList'
import ReservationOrderList from '@/components/contract/ReservationOrderList'

// 房源
import House from '@/components/House'
import PortBHouse from '@/components/house/portBHouse'
import PortCHouse from '@/components/house/portCHouse'

// 房行
import HouseAdmin from '@/components/HouseAdmin'
import UserManage from '@/components/houseAdmin/UserManage'
import HouseAdminManage from '@/components/houseAdmin/HouseAdminManage'
import CompanyCertify from '@/components/houseAdmin/CompanyCertify'
import ExtendApply from '@/components/houseAdmin/extendApply/ExtendApply';
import SignApply from '@/components/houseAdmin/signApply/SignApply';
import PublicNumber from '@/components/houseAdmin/publicNumber/PublicNumber';

// 用户
import UserRou from '@/components/User'
import PortBUser from '@/components/User/portBUser'
import PortCUser from '@/components/User/portCUser'

// 设置
import Setting from '@/components/Setting'
import ApartmentRole from '@/components/setting/ApartmentRole'
import CMSUserManagement from '@/components/setting/CMSUserManagement'
import CMSRoleManagement from '@/components/setting/CMSRoleManagement'
import ResourceManagement from '@/components/setting/ResourceManagement'

// 消息
import Message from '@/components/Message'
import MessageList from '@/components/message/messageList'



Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    // 初始化页面
    {
      path: '/',
      redirect: '/login',
      name: 'Index',
      component: Index,
      children: [
        // 首页
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        // 订单
        {
          path: "/contract",
          name: "Contract",
          component: Contract,
          children: [
            {
              path: "contractList",
              name: "ContractList",
              component: ContractList
            },
            {
              path: "reservationOrderList",
              name: "ReservationOrderList",
              component: ReservationOrderList
            }
          ]
        },
        // 房源
        {
          path: "/house",
          name: "House",
          component: House,
          children: [
            {
              path: "portBHouse",
              name: "PortBHouse",
              component: PortBHouse
            },
            {
              path: "portCHouse",
              name: "PortCHouse",
              component: PortCHouse
            }
          ]
        },
        // 房行
        {
          path: "/houseAdmin",
          name: "HouseAdmin",
          component: HouseAdmin,
          children: [
            {
              meta: {
                name: '用户管理'
              },
              path: "userManage",
              name: "userManage",
              component: UserManage
            },
            {
              meta: {
                name: '房行管理'
              },
              path: 'houseAdminManage',
              name: 'houseAdminManage',
              component: HouseAdminManage,
              redirect: {name: 'CompanyCertify'},
              children: [
                {
                  meta: {
                    name: '企业认证'
                  },
                  path: 'companyCertify', // 企业认证
                  name: 'CompanyCertify',
                  component: CompanyCertify
                },
                {
                  meta: {
                    name: '推广申请'
                  },
                  path: 'extendApply', // 推广申请
                  name: 'extendApply',
                  component: ExtendApply
                },
                {
                  meta: {
                    name: '电子签约申请'
                  },
                  path: 'signApply', // 电子签约申请
                  name: 'signApply',
                  component: SignApply
                },
                {
                  meta: {
                    name: '公众号对接'
                  },
                  path: 'publicNumber', // 公众号对接
                  name: 'publicNumber',
                  component: PublicNumber
                }
              ]
            }
          ]
        },
        // 用户
        {
          path: "/UserRou",
          name: "UserRou",
          component: UserRou,
          children: [
            {
              path: "portBUser",
              name: "portBUser",
              component: PortBUser
            },
            {
              path: "portCUser",
              name: "portCUser",
              component: PortCUser
            }
          ]
        },
        // 设置
        {
          path: "/setting",
          name: "Setting",
          component: Setting,
          props(route) {
            console.log(route.path)
          },
          children: [
            {
              path: "apartmentRole",
              name: "apartmentRole",
              component: ApartmentRole
            },
            {
              path: "CMSUserManagement",
              name: "CMSUserManagement",
              component: CMSUserManagement
            },
            {
              path: "CMSRoleManagement",
              name: "CMSRoleManagement",
              component: CMSRoleManagement
            },
            {
              path: "ResourceManagement",
              name: "ResourceManagement",
              component: ResourceManagement
            }
          ]
        },
        // 消息
        {
          path: "/message",
          name: "Message",
          component: Message,
          children: [
            {
              path: ":twoLevel",
              name: "messageList",
              component: MessageList
            }
          ]
        }
      ]
    },
    // 登录
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "*",
      redirect: "home"
    }
  ]
})
