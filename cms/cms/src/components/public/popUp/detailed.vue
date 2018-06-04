<template>
<div class="dialog" ref="parents">
	<!-- 背景层 -->
	<div class="mark"></div>

	<div class="container">
		<div class="tit">{{tit}}</div>
		<div class="close" @click="close_dialog"></div>

		<div class="content">
			<div class="header">
				<div class="information clearboth">
					<div class="face">
						<img src="" alt="">
					</div>
					<div class="person">
						<div class="name">李阳</div>
						<div>
							<div class="sex">男</div>
							<div class="phone">1695412236</div>
						</div>
						<div>
							<div class="position">
								<div>职位：</div>
								<div>前端工程师</div>
							</div>
							<div>
								<div>爱好：</div>
								<div>户外运动</div>
							</div>
						</div>
					</div>
				</div>
				<div class="table-head ">
					<div class="clearboth">
						<div v-for="(i, j) in table_head" :key="j" :class="j == table_head_index? 'active' : '' " @click="table_head_click(i.index)">{{i.name}}</div>
					</div>
				</div>
			</div>

			<div class="tenant-box" v-show="table_head_index == 0">
				<div class="tenant">
					<div class="title">
						承租人信息
					</div>
					<div class="tenant-information">
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
						<div>
							<div>租客性别：</div>
							<div>女</div>
						</div>
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
						<div>
							<div>租客性别：</div>
							<div>女</div>
						</div>
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
						<div>
							<div>租客性别：</div>
							<div>女</div>
						</div>
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
						<div>
							<div>租客性别：</div>
							<div>女</div>
						</div>
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
						<div>
							<div>租客性别：</div>
							<div>女</div>
						</div>
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
					</div>
				</div>
				<div class="cotenant">
					<div class="title">
						承租人信息
					</div>
					<div class="cotenant-information">
						<div>
							<div>
								<div>租客姓名：</div>
								<div>高雨婷</div>
							</div>
							<div>
								<div>租客性别：</div>
								<div>女</div>
							</div>
							<div>
								<div>租客姓名：</div>
								<div>高雨婷</div>
							</div>
						</div><div>
							<div>
								<div>租客姓名：</div>
								<div>高雨婷</div>
							</div>
							<div>
								<div>租客性别：</div>
								<div>女</div>
							</div>
							<div>
								<div>租客姓名：</div>
								<div>高雨婷</div>
							</div>
						</div><div>
							<div>
								<div>租客姓名：</div>
								<div>高雨婷</div>
							</div>
							<div>
								<div>租客性别：</div>
								<div>女</div>
							</div>
							<div>
								<div>租客姓名：</div>
								<div>高雨婷</div>
							</div>
						</div><div>
							<div>
								<div>租客姓名：</div>
								<div>高雨婷</div>
							</div>
							<div>
								<div>租客性别：</div>
								<div>女</div>
							</div>
							<div>
								<div>租客姓名：</div>
								<div>高雨婷</div>
							</div>
						</div><div>
							<div>
								<div>租客姓名：</div>
								<div>高雨婷</div>
							</div>
							<div>
								<div>租客性别：</div>
								<div>女</div>
							</div>
							<div>
								<div>租客姓名：</div>
								<div>高雨婷</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="contract-box" v-show="table_head_index == 1">
				<div class="resources-msg">
					<div class="title">
						承租人信息
					</div>
					<div class="information">
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
						<div>
							<div>租客性别：</div>
							<div>女</div>
						</div>
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
						<div>
							<div>租客性别：</div>
							<div>女</div>
						</div>
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
						<div>
							<div>租客性别：</div>
							<div>女</div>
						</div>
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
						<div>
							<div>租客性别：</div>
							<div>女</div>
						</div>
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
						<div>
							<div>租客性别：</div>
							<div>女</div>
						</div>
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
					</div>
				</div>
				<div class="contract-msg">
					<div class="title">
						承租人信息
					</div>
					<div class="information">
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
						<div>
							<div>租客性别：</div>
							<div>女</div>
						</div>
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
					</div>
				</div>
				<div class="sign-msg">
					<div class="title">
						承租人信息
					</div>
					<div class="information">
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
						<div>
							<div>租客性别：</div>
							<div>女</div>
						</div>
						<div>
							<div>租客姓名：</div>
							<div>高雨婷</div>
						</div>
					</div>
				</div>
			</div>

			<div class="capitalFlow-box" v-show="table_head_index == 2">
				<div>
					<div class="sign">
						<div>代收款</div>
					</div>
					<div class="state">
						<div>
							<span class="term">已到期</span>
							<span>租金<span class="symbol">+</span>6000元</span>
						</div>
						<div>预收时间：2017-11-14</div>
					</div>
					<div class="timeSlot">
						<div>
							第1期，共4期
						</div>
						<div>
							2017-11-14到2018-02-13
						</div>
					</div>
					<div class="room">
						<div>
							李凯 - 17600689551
						</div>
						<div>
							<span class="roomNumber">110</span>花园小区1号楼1单元110室-A
						</div>
					</div>
				</div>
				<div>
					<div class="sign">
						<div>代收款</div>
					</div>
					<div class="state">
						<div>
							<span class="term">已到期</span>
							<span>租金<span class="symbol">+</span>6000元</span>
						</div>
						<div>预收时间：2017-11-14</div>
					</div>
					<div class="timeSlot">
						<div>
							第1期，共4期
						</div>
						<div>
							2017-11-14到2018-02-13
						</div>
					</div>
					<div class="room">
						<div>
							李凯 - 17600689551
						</div>
						<div>
							<span class="roomNumber">110</span>花园小区1号楼1单元110室-A
						</div>
					</div>
				</div>
				<div>
					<div class="sign">
						<div>代收款</div>
					</div>
					<div class="state">
						<div>
							<span class="term">已到期</span>
							<span>租金<span class="symbol">+</span>6000元</span>
						</div>
						<div>预收时间：2017-11-14</div>
					</div>
					<div class="timeSlot">
						<div>
							第1期，共4期
						</div>
						<div>
							2017-11-14到2018-02-13
						</div>
					</div>
					<div class="room">
						<div>
							李凯 - 17600689551
						</div>
						<div>
							<span class="roomNumber">110</span>花园小区1号楼1单元110室-A
						</div>
					</div>
				</div>
				<div>
					<div class="sign">
						<div>代收款</div>
					</div>
					<div class="state">
						<div>
							<span class="term">已到期</span>
							<span>租金<span class="symbol">+</span>6000元</span>
						</div>
						<div>预收时间：2017-11-14</div>
					</div>
					<div class="timeSlot">
						<div>
							第1期，共4期
						</div>
						<div>
							2017-11-14到2018-02-13
						</div>
					</div>
					<div class="room">
						<div>
							李凯 - 17600689551
						</div>
						<div>
							<span class="roomNumber">110</span>花园小区1号楼1单元110室-A
						</div>
					</div>
				</div>
				<div>
					<div class="sign">
						<div>代收款</div>
					</div>
					<div class="state">
						<div>
							<span class="term">已到期</span>
							<span>租金<span class="symbol">+</span>6000元</span>
						</div>
						<div>预收时间：2017-11-14</div>
					</div>
					<div class="timeSlot">
						<div>
							第1期，共4期
						</div>
						<div>
							2017-11-14到2018-02-13
						</div>
					</div>
					<div class="room">
						<div>
							李凯 - 17600689551
						</div>
						<div>
							<span class="roomNumber">110</span>花园小区1号楼1单元110室-A
						</div>
					</div>
				</div>
				<div>
					<div class="sign">
						<div>代收款</div>
					</div>
					<div class="state">
						<div>
							<span class="term">已到期</span>
							<span>租金<span class="symbol">+</span>6000元</span>
						</div>
						<div>预收时间：2017-11-14</div>
					</div>
					<div class="timeSlot">
						<div>
							第1期，共4期
						</div>
						<div>
							2017-11-14到2018-02-13
						</div>
					</div>
					<div class="room">
						<div>
							李凯 - 17600689551
						</div>
						<div>
							<span class="roomNumber">110</span>花园小区1号楼1单元110室-A
						</div>
					</div>
				</div>

			</div>

		</div>
	</div>
</div>
</template>

<script>
export default {
	name: "dialog",
	props:{

	},
	data () {
		return {
			tit: "查看租客信息",
			content: {
				tip: "确定要删除吗？",
				textarea: "必须输入删除原因",
			},
			table_head: [
				{
					name: "租客信息",
					index: 0,
				},
				{
					name: "合同信息",
					index: 1,
				},
				{
					name: "收支信息",
					index: 2,
				},
			],
			table_head_index: 0,
			inputs: [

			],
			buttons: [
				{
					name: "保存"
				}
			]
		}
	},
	methods: {
		table_head_click (index) {
			this.table_head_index = index;
		},
		close_dialog () {
			this.$refs.parents.style.display = "none";
		}
	}
}
</script>

<style scoped lang="scss">
.clearboth:after{
	content: "";
	height: 0;
	width: 0;
	display:block;
	clear:both;
}
.dialog{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	z-index: 999;
	.mark{
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.4;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
	}
	.container{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		min-width: 1060px;
		width: 80%;
		height: 710px;
		background: #f2f6f7;
		overflow:hidden;
		/* 标题 */
		.tit{
			height: 60px;
			text-indent: 2em;
			font-size: 16px;
			color: #ed0536;
			line-height: 60px;
			border-bottom: 1px solid #f2f6f7;
			background:#fff;
		}
		/* 关闭按钮 */
		.close{
			position: absolute;
			top: 0;
			right: 0;
			height: 60px;
			width: 60px;
			cursor:pointer;
			background: url("/static/image/close_03.png") no-repeat 15px;
		}
		/* 主体内容 */
		.content{
			height: 650px;
			width: 100%;
			.header{
				height: 160px;
				width: 100%;
				background: #fff;
				.information{
					.face{
						height:80px;
						width:80px;
						border-radius: 50%;
						background: #ccc;
						overflow:hidden;
						margin: 20px;
						float: left;
						img{
							height: 100%;
							width:100%;
						}
					}
					.person{
						width: 500px;
						float: left;
						display: flex;
						margin-top: 20px;
						flex-wrap: wrap;
						&>div{
							width: 100%;
							display: flex;
							margin-top: 3px;
							&>div{
								display: flex;
								margin-right:20px;
								color: #a1a1a1;
							}
						}
						.name{
							line-height: 30px;
							width: 100%;
							font-size: 16px;
						}

					}
				}
				.table-head{
					width: 100%;
					&>div{
					}
					&>div>div{
						float: left;
						height: 40px;
						line-height: 40px;
						padding: 0 30px;
						font-size: 14px;
						cursor: pointer;
						color: #000;
						&.active{
							color: #f00031;
							border-bottom: 2px solid #f00031;
						}
					}
				}
			}
	 		.contract-box{
				width: calc(100%-40px);
				background: #fff;
				margin:20px;
				height: 440px;
				.title{
					width: 100%;
					padding: 20px 0 10px 0;
					font-size: 16px;
					text-indent: 2em;
					position: relative;
					&:after{
						content: "";
						height: 16px;
						width: 3px;
						display: block;
						background: #f2324e;
						position: absolute;
						border-radius: 5px;
						left: 1.8em;
						top: 22px;
						z-index: 33;
					}
				}
				.information{
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					&>div{
						height: 30px;
						width: 30%;
						margin-top: 5px;
						display: flex;
						&>div:nth-child(1){
							text-indent: 3em;
							color: #a1a1a1;
						}
					}
				}
		 	}
		 	.tenant-box{

		 	}
			.tenant-box{
				width: calc(100%-40px);
				margin:20px;
				height: 490px;
				&>div{
					background: #fff;
					position: relative;
					margin-top: 20px;
					&.tenant{
						height: 240px;
					}
					&.cotenant{
						height: 180px;
						overflow-y: auto;
					}
					.title{
						width: 100%;
						padding: 20px 0 10px 0;
						font-size: 16px;
						text-indent: 2em;
						&:after{
							content: "";
							height: 16px;
							width: 3px;
							display: block;
							background: #f2324e;
							position: absolute;
							border-radius: 5px;
							left: 1.8em;
							top: 22px;
							z-index: 33;
						}
					}
					.tenant-information{
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;
						&>div{
							height: 30px;
							width: 30%;
							margin-top: 5px;
							display: flex;
							&>div:nth-child(1){
								text-indent: 3em;
								color: #a1a1a1;
							}
						}
					}
					.cotenant-information{
						overflow-y: auto;
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;
						&>div{
							width: 100%;
							display: flex;
							flex-wrap: wrap;
							justify-content: space-between;
							&>div{
								height: 30px;
								width: 30%;
								margin-top: 5px;
								display: flex;
								&>div:nth-child(1){
									text-indent: 3em;
									color: #a1a1a1;
								}
							}
						}
					}
				}

			}
			.capitalFlow-box{
				width: calc(100%-40px);
				height: 440px;
				background: #fff;
				margin:20px;
				overflow-y: auto;

				&>div{
					height: 70px;
					width: 100%;
					display: flex;
					justify-content: space-around;
					&:nth-child(odd){
						background: #fff;
					}
					&:nth-child(even){
						background: #f7f7f7;
					}
					&>div{
						flex:3;
						margin-right: 3px;
						&.sign{
							flex:2;
							position: relative;
							&>div{
								overflow:hidden;
								width: 86px;
								height: 30px;
								line-height: 30px;
								text-indent: 1em;
								background: #31b1f9;
								margin-top: 20px;
								position: absolute;
								left: 50%;
								margin-left: -43px;
								color: #daf2fc;
								&:after{
									content:"";
									display: block;
									height: 22px;
									width: 22px;
									background: #fff;
									position: absolute;
									right:-12px;
									top: 4px;
									transform: rotate(45deg);
								    border-left: 1px solid #f3f4f8;
								    border-bottom: 1px solid #f3f4f8;
								}
							}
						}
						&.state{
							&>div{
								margin-top:5px;
							}
							&>div:nth-child(1){
								margin-top: 15px;
							}
							.term{
								padding: 3px 5px;
								background: #fd484c;
								color: #fec7ca;
								border-radius: 2px;
							}
							.symbol{
								color: #50bffa;
								padding: 0 5px;
							}
						}
						&.timeSlot{
							&>div{
								margin-top:3px;
							}
							&>div:nth-child(1){
								margin-top: 15px;
							}
						}
						&.room{
							&>div{
								margin-top:3px;
							}
							&>div:nth-child(1){
								margin-top: 15px;
								background: url("/src/assets/images/shouzhi_03.png") no-repeat 5px;
								text-indent: 2em;
							}
							.roomNumber{
								padding: 3px 5px;
								background:#26affe;
								color: #daf2fc;
								border-radius: 2px;
								margin:0 5px;
							}
						}
					}

				}
			}
		}
	}
}
</style>
