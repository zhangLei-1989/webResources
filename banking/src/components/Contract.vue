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
  name: "contract",
  data() {
    return {
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
        id: "a816d6f2d2454fc9b2e16a4d8cb5206b",
        name: "审核",
        path: "/contract/examine"
      },
      {
        id: "a31feaef2e024f8dbdd9c8ee6ec8de81",
        name: "已完成",
        path: "/contract/alreadyComplete"
      }
    ];

    const routerNew = [];

    const userInfo = tool.session.get("userInfo");
    if (!userInfo) {
      self.$router.replace("/login");
    } else {
      //2级权限控制（合同）
      const systemResourcesList = userInfo.systemResourcesList;
      if (systemResourcesList) {
        const authorization = systemResourcesList;
        const twoAuthor = authorization.filter(
          item =>
            item.zIndex == 2 &&
            item.parentId == "2228e67acfa54c64bd4d2654af80bb0a"
        );
        twoAuthor.forEach(item => {
          router.forEach(item2 => {
            if (item.id == item2.id) {
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
.main {
  background: #f2f3f5;
}
</style>