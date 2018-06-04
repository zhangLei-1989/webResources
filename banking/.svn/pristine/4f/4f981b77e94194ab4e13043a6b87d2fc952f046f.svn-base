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
  name: "Cooperation",
  data() {
    const self = this;
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
        id: "e11f2863785641f28b14b1d15ade2c67",
        name: "合作方",
        path: "/cooperation/partners",
        btns: [
          {
            id: "57ef37d1c853458bbd7b3d8de29ace25",
            name: "添加",
            click: function() {
              self.$store.commit("partners/tooglePartnersDialogActive", true);
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
            item.parentId == "fad1cdf8288c4c5ea7ceb95948caa1dd"
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
.main {
  background: #f2f3f5;
}
</style>
