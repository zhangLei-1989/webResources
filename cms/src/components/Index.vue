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
import sideBar from "@/components/public/SideBar"
export default {
	name: "index",
	data () {
		return {
	
		}
	},
	methods: {

    },
    components: {
    	sideBar
    }
}
</script>

<style scoped>
.el-aside {
  width: 100px !important;
  min-height: 100vh;
  background: #2e3445;
}
</style>