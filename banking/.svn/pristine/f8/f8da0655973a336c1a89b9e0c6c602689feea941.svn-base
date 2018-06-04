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
  name: "ExaminaApproval",
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
      { id: "e3d76acc11f248a7b94dfa54a1352774", name: "待审批", path: "/examinaApproval/waitExaminaApproval" },
      { id: "bcfc49905859442bb64c5c7b7b24ecc0", name: "已通过", path: "/examinaApproval/alreadyAdopted" },
      { id: "86e7c0016e2a45fbb07f8e85c70eab09", name: "已驳回", path: "/examinaApproval/alreadyReject" },
      { id: "f2120a5269394b68be8ddd9a12e0044d", name: "已生成合同", path: "/examinaApproval/alreadyGenerate" }
    ];

    const routerNew = [];

    const userInfo = tool.session.get("userInfo");
    if (!userInfo) {
      self.$router.replace("/login");
    } else {
      //2级权限控制（审批）
      const systemResourcesList = userInfo.systemResourcesList;
      if (systemResourcesList) {
        const authorization = systemResourcesList;
        const twoAuthor = authorization.filter(
          item =>
            item.zIndex == 2 &&
            item.parentId == "77bedac4721e4c829616579287d611f8"
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