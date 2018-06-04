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
	name: "contract",
	data () {
		return {
			activeName: 'first',
			tabs: [
				{ name: "订单列表", path: "contractList" },
				{ name: "预约管理", path: "reservationOrderList" }
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
