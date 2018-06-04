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
  name: "Finance",
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
        id: "a95e4a96366f4901a87163c32483265f",
        name: "应收",
        path: "/finance/shouldCollect"
      },
      {
        id: "f9fc139d778d44ce89fc0e2949440ad0",
        name: "已收",
        path: "/finance/alreadyCollect"
      },
      {
        id: "242d99e3b2544cbabdb1e734124990aa",
        name: "待打款合同",
        path: "/finance/waitMoneyContract"
      }
    ];

    const routerNew = [];

    const userInfo = tool.session.get("userInfo");
    if (!userInfo) {
      self.$router.replace("/login");
    } else {
      //2级权限控制（财务）
      const systemResourcesList = userInfo.systemResourcesList;
      if (systemResourcesList) {
        const authorization = systemResourcesList;
        const twoAuthor = authorization.filter(
          item =>
            item.zIndex == 2 &&
            item.parentId == "87d1f81b8c9e4d8486c0f18fe36aea13"
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