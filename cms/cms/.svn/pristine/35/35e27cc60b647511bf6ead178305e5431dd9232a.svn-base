<template>
	<el-container>
		<!-- 二级路由 -->
		<el-header class="header" height="60px">
			<cms-header :tabs="tabs"></cms-header>
		</el-header>
		<!-- 二级路由 -->

		<el-main class="main">
			<router-view></router-view>
		</el-main>

	</el-container>
</template>

<script>
import cmsHeader from "@/components/public/CMSHeader"
export default {
	name: "house",
	data () {
		return {
			tabs: [
				{ name: "B端房源", path: "portBHouse" },
				{ name: "C端房源", path: "portCHouse" }
			]
		}
	},
	components: {
    	cmsHeader
    }
}
</script>

<style scoped>
.main{
	background: #f2f3f5;
}
</style>
