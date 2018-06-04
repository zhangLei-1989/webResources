<template>
<el-row>
	<el-col :span="24" class="logo-container"></el-col>
  	<el-col :span="24">
	    <el-menu
        :default-active="activeIndex"
	      class="el-menu-vertical-demo"
	      background-color="#2e3445"
	      text-color="#b3bbbb"
	      :router="true"
	      active-text-color="#fff">

	     	<!-- 侧边栏 - 路由router -->
			<el-menu-item v-for="(item, ind) in router" :key="ind" :index="item.index" :route="item.path" disabled="">
				<i :class="item.icon"></i>
				<span slot="title">{{item.title}}</span>
			</el-menu-item>

	    </el-menu>

	</el-col>

</el-row>
</template>

<script>
export default {
  data() {

    const router = [
      {
        index: "1",
        path: { 
          path: "/home" 
        },
        title: "首页",
        icon: "icon-aside icon-aside-home"
      },
      {
        index: "2",
        path: {
          path: "/contract/contractList"
        },
        title: "订单",
        icon: "icon-aside icon-aside-order"
      },
      {
        index: "3",
        path: {
          path: "/house/portBHouse"
        },
        title: "房源",
        icon: "icon-aside icon-aside-house-source"
      },
      {
        index: "4",
        path: {
          path: "/houseAdmin/userManage"
        },
        title: "房行",
        icon: "icon-aside icon-aside-house-line"
      },
      {
        index: "5",
        path: {
          path: "/UserRou/PortBUser"
        },
        title: "用户",
        icon: "icon-aside icon-aside-user"
      },
      {
        index: "6",
        path: {
          path: "/setting/ApartmentRole"
        },
        title: "设置",
        icon: "icon-aside icon-aside-setting"
      },
      {
        index: "7",
        path: {
          path: "/message/messageList"
        },
        title: "消息",
        icon: "icon-aside icon-aside-message"
      }
    ];
    return {
      activeIndex: "",
      router
    };
  },
  created() {
    const self = this;
    const matchedList = self.$router.getMatchedComponents();
    if (matchedList.length >= 2) {
      const route = self.router.filter(item => {
        return (
          item.path.path
            .toLowerCase()
            .indexOf(matchedList[1].name.toLowerCase()) >= 0
        );
      });
      if (route.length > 0) {
        self.activeIndex = route[0].index;
      }
    }
  }
};
</script>

<style scoped>
.logo-container {
  background: #242937 url(../../../static/image/logo2.png) center/40% no-repeat;
  height: 60px;
  margin-bottom: 20px;
}
.el-menu-vertical-demo {
  width: 100%;
  border-width: 0px;
}
.router-link-active {
}
.el-menu-item {
  height: 54px;
  line-height: 54px;
  display: flex;
  padding-left: 15px !important;
}
.el-menu-item span {
  font-size: 14px;
}

.el-menu-item.is-active {
  background: #242937 !important;
}
.el-menu-item.is-active::before {
  display: block;
  position: absolute;
  left: 0;
  content: "";
  width: 4px;
  height: 54px;
  background: #ed0536;
}

.icon-aside::before {
  content: "";
  display: block;
  width: 30px;
  height: 46px;
}

.icon-aside.icon-aside-home::before {
  background: url(../../../static/image/icon_home.png) center no-repeat;
}
.el-menu-item.is-active .icon-aside.icon-aside-home::before {
  background: url(../../../static/image/icon_home_active.png) center no-repeat;
}

.icon-aside.icon-aside-order::before {
  background: url(../../../static/image/icon_order.png) center no-repeat;
}
.el-menu-item.is-active .icon-aside.icon-aside-order::before {
  background: url(../../../static/image/icon_order_active.png) center no-repeat;
}

.icon-aside.icon-aside-house-source::before {
  background: url(../../../static/image/icon_house_source.png) center no-repeat;
}
.el-menu-item.is-active .icon-aside.icon-aside-house-source::before {
  background: url(../../../static/image/icon_house_source_active.png) center
    no-repeat;
}

.icon-aside.icon-aside-house-line::before {
  background: url(../../../static/image/icon_house_line.png) center no-repeat;
}
.el-menu-item.is-active .icon-aside.icon-aside-house-line::before {
  background: url(../../../static/image/icon_house_line_active.png) center
    no-repeat;
}

.icon-aside.icon-aside-user::before {
  background: url(../../../static/image/icon_user.png) center no-repeat;
}
.el-menu-item.is-active .icon-aside.icon-aside-user::before {
  background: url(../../../static/image/icon_user_active.png) center no-repeat;
}

.icon-aside.icon-aside-setting::before {
  background: url(../../../static/image/icon_setting.png) center no-repeat;
}
.el-menu-item.is-active .icon-aside.icon-aside-setting::before {
  background: url(../../../static/image/icon_setting_active.png) center
    no-repeat;
}

.icon-aside.icon-aside-message::before {
  background: url(../../../static/image/icon_message.png) center no-repeat;
}
.el-menu-item.is-active .icon-aside.icon-aside-message::before {
  background: url(../../../static/image/icon_message_active.png) center
    no-repeat;
}
</style>
