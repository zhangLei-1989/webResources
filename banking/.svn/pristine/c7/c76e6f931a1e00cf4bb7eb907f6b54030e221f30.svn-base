<template>
<el-container>
	<!-- 二级路由 -->
	<el-header class="header" height="60px">
		<cms-header :tabs="tabs"></cms-header>
	</el-header>
	<!-- 二级路由 -->

  <router-view></router-view>

</el-container>

</template>

<script>
import tool from "../../static/js/tool.js";
import cmsHeader from "@/components/public/CMSHeader";

export default {
  name: "setting",
  data() {
    const self = this;
    return {
      activeName: "first",
      tabs: []
    };
  },
  components: {
    cmsHeader
  },
  created() {
    const self = this;
    //2级菜单
    const router = [
      {
        id: "0c1303393755418dbbc8cf1f3b0c4b6f",
        name: "部门管理",
        path: "/setting/apartmentRole",
        btns: [
          {
            id: "981982b4d4cc4b658c77723f8a6536af",
            name: "添加部门",
            click: function() {
              self.$store.commit(
                "apartmentRole/toogleDepartmentDialogActive",
                true
              );
            },
            show: false
          }
        ]
      },
      {
        id: "fda0f8685f20408190627a8a30303804",
        name: "角色管理",
        path: "/setting/roleManger",
        btns: [
          {
            id: "dac798d095654abda862a5c87cb38fba",
            name: "添加角色",
            click: function() {
              self.$store.commit("roleManger/toogleRoleDialogActive", true);
            },
            show: false
          }
        ]
      },
      {
        id: "3bed8fe1516a47fba7196e073ba36c03",
        name: "员工管理",
        path: "/setting/staffManger",
        btns: [
          {
            id: "0e9bdef784624460abd19824d3c611b1",
            name: "添加员工",
            click: function() {
              self.$store.commit("staffManger/toogleStaffDialogActive", true);
            },
            show: false
          }
        ]
      },
      // {
      //   name: "字典管理",
      //   path: "/setting/dictManger",
      //   btns: [
      //     {
      //       name: "添加",
      //       click: function() {
      //         self.$store.commit(
      //           "dictManger/toogleDictionaryDialogActive",
      //           true
      //         );
      //       }
      //     }
      //   ]
      // },
      {
        id: "f080f1a9b3184409ae57bf496b67286f",
        name: "企业公告",
        path: "/setting/corporateBulletin",
        btns: [
          {
            id: "5e48fb208a03419497c6242668fb43c4",
            name: "添加公告",
            click: function() {
              self.$store.commit(
                "corporateBulletin/toogleCorporateDialogActive",
                true
              );
            },
            show: false
          }
        ]
      }
    ];

    const routerNew = [];

    const userInfo = tool.session.get("userInfo");
    if (!userInfo) {
      self.$router.replace("/login");
    } else {
      //2级权限控制（设置）
      const systemResourcesList = userInfo.systemResourcesList;
      if (systemResourcesList) {
        const authorization = systemResourcesList;
        const twoAuthor = authorization.filter(
          item =>
            item.zIndex == 2 &&
            item.parentId == "7ee6dbb5c81645b1a944fec22fd6bd27"
        );
        twoAuthor.forEach(item => {
          //3级权限控制（添加）
          const threeAuthor = authorization.filter(
            item2 => item2.zIndex == 3 && item2.parentId == item.id
          );

          router.forEach(item2 => {
            if (item.id == item2.id) {
              //判断3级权限

              for (let i = 0; i < item2.btns.length; i++) {
                let isResult = false;
                for (let j = 0; j < threeAuthor.length; j++) {
                  if (item2.btns[i].id == threeAuthor[j].id) {
                    isResult = true;
                  }
                }
                if (isResult) {
                  item2.btns[i].show = true;
                }
              }
              const showList = item2.btns.filter(item => item.show);
              item2.btns = showList;

              routerNew.push(item2);
            }
          });
        });
      }
    }

    self.tabs = routerNew;
  }
};
</script>

<style scoped>
.router-link {
  height: 100%;
}
.main {
  background: #f2f3f5;
}
.router-link-active {
  color: red;
  border-bottom: 1px solid red;
}
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
