<template>
<div class="popUp" ref="parents">
	<!-- 背景层 -->
	<div class="mark"></div>

	<div class="container">
		<!-- 标题 -->
		<div class="tit">
			<div v-for="(item, j) in tit" :key="j">
				{{item.name}}
			</div>
		</div>
		<!-- 右上角关闭按钮 -->
		<div class="close" @click="close_popUp"></div>

		<div class="content">
			<div class="PersonalInformation" v-for="val in content.Personal">
				<span><i>姓名：</i>{{ val.name }}</span>
				<span><i>性别：</i>{{ val.sex }}</span>
				<span><i>手机：</i>{{ val.phone }}</span>
				<span><i>来源：</i>{{ val.laiyuan }}</span>
			</div>
			<div class="BuildingInformation" v-for="val in content.Building">
				<span><i>楼盘：</i>{{ val.build }}</span>
				<span><i>房型：</i>{{ val.specifications }}</span>
				<span><i>房号：</i>{{ val.roomnum }}</span>
				<span><i>带看人：</i>{{ val.daiName }}</span>
				<span><i>带看时间：</i>{{ val.looktime }}</span>
			</div>
			<div class="Remarks" v-for="val in content.Remarks">
				<span><i>备注：</i>{{ val.beizhu }}</span>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: "TakeALook",
	props:{

	},
	data () {
		return {
			tit: [
				{
					name: "带看单",
				}
			],
			content: {
				Personal:[
					{
						name:"高雨婷",
						sex:"女",
						phone:"18612345678",
						laiyuan:"B端H5"
					}
				],
				Building:[
					{
						build:"清上园小区",
						specifications:"二室一厅",
						roomnum:"201",
						daiName:"李星桥",
						looktime:"2017-12-12 11:00"
					}
				],
				Remarks:[
					{
						beizhu:"1231212313212312312314564564564554"
					}
				]
			},
			tableIndex: 0
		}
	},
	methods: {
		close_popUp () {
			// 关闭弹出框
			this.$refs.parents.style.display = "none";
		},
		tableToggle (index) {
			this.tableIndex = index;
			console.log(this.tableIndex, index)
		}
	},
	mounted () {
	}
}
</script>

<style scoped lang="scss">
.popUp{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 999;
	.mark{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000;
		opacity: 0.4;
	}
	.container{
		position: absolute;
		right: 0;
		bottom: 0;
		width: 600px;
		height: 90%;
		background:#fff;
		overflow:hidden;
		/* 标题 */
		.tit{
			height: 50px;
			font-size: 16px;
			line-height: 50px;
			border-bottom: 1px solid #f2f6f7;
			margin-top: 0;
			color:#f24468;
			&>div{
				line-height: 50px;
				float: left;
				padding: 0 20px;
				text-align: center;
				cursor: pointer;
				font-size: 16px;
			}
			&>div.active{
				color: #ed0536;
				background: #eee;
			}
		}
		/* 关闭按钮 */
		.close{
			position: absolute;
			top: 0;
			right: 0;
			height: 50px;
			width: 50px;
			cursor:pointer;
			background: url("/static/image/close_03.png") no-repeat 15px;
		}
		/* 主体内容 */
		.content{
			height:100%;
			width: 100%;
			overflow-y: auto;
			padding-left: 25px;
			padding-right: 25px;
			span{
				width: 179px;
				float: left;
				line-height: 33px;
				i{
					font-style: normal;
					color: #999999;
				}
			}
			.PersonalInformation{
				width: 100%;
				height: 106px;
				border-bottom: solid 1px #f2f6f7;
				padding-top: 20px;
				font-size: 14px;
			}
			.BuildingInformation{
				width: 100%;
				height: 106px;
				border-bottom: solid 1px #f2f6f7;
				padding-top: 20px;
			}
			.Remarks{
				width: 100%;
				height: 106px;
				padding-top: 20px;
				span{
					width: 100%;
				}
			}
		}
	}
}
</style>
