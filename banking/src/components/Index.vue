<template>
<el-container>
	<!-- 侧边栏 -->
	<el-aside>
		<side-bar></side-bar>
	</el-aside>

	<!-- 主要内容 -->
	<router-view></router-view>

</el-container>

</template>

<script>
import tool from "../../static/js/tool.js";
import sideBar from "@/components/public/SideBar";
export default {
  name: "index",
  data() {
    return {};
  },
  methods: {},
  components: {
    sideBar
  },
  created() {
    const userInfo = tool.session.get("userInfo");
    if (!userInfo) {
      this.$router.replace("/login");
    } else {
      const matchedList = this.$router.getMatchedComponents();
      if (
        matchedList.length == 1 &&
        matchedList[0].name.toLowerCase() == "index"
      ) {
        this.$router.replace("/home");
      }
    }
  }
};
</script>

<style scoped>
.el-aside {
  width: 100px !important;
  min-height: 100vh;
  background: #364364;
}
</style>
