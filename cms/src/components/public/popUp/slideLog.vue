<template>
<div class="popUp" ref="parents">
	<!-- 背景层 -->
	<div class="mark"></div>

	<div class="container">
		<!-- 标题 -->
		<div class="tit">
			<div v-for="(item, j) in tit" :key="j" :class="j==tableIndex ? 'active' : ''" @click="tableToggle(j)">
				{{item.name}}
			</div>
		</div>
		<!-- 右上角关闭按钮 -->
		<div class="close" @click="close_popUp"></div>

		<div class="content">
			<div class="resources" v-show="tableIndex == 0">
				<div class="important content-flex">
					<div class="safetyCode">
						<div>安全码</div>
						<div class="content-data">
							{{content.safetyCode}}
						</div>
					</div>
					<div class="enterpriseName">
						<div>企业名称</div>
						<div class="content-data">
							{{content.enterpriseName}}
						</div>
					</div>
				</div>
				<div class="detailed">
					<div class="content-flex">
						<div>
							<div>公寓名称</div>
							<div class="content-data">
								{{content.apartmentName}}
							</div>
						</div>
						<div>
							<div>城市/区域</div>
							<div class="content-data">
								{{content.city}}
							</div>
						</div>
					</div>

					<div class="content-flex-def">
						<div>具体地址</div>
						<div class="content-data">
							{{content.specificAddress}}
						</div>
					</div>
					<div class="content-flex-def">
						<div>签约体量</div>
						<div class="content-data">
							{{content.size}}
						</div>
					</div>
					<div class="content-flex">
						<div class="content-flex-def">
							<div>联系人</div>
							<div class="content-data">
								{{content.contractMan}}
							</div>
						</div>
						<div class="content-flex-def">
							<div>电话</div>
							<div class="content-data">
								{{content.phone}}
							</div>
						</div>
					</div>
					<div class="content-flex-def">
						<div>经营模式</div>
						<div class="content-data">
							{{content.model}}
						</div>
					</div>
					<div class="content-flex-def">
						<div>公司简介</div>
						<div class="content-data">
							{{content.companyProfile}}
						</div>
					</div>
					<div class="content-flex-def">
						<div>logo</div>
						<div class="content-data-img">
							<img :src="content.logo">
						</div>
					</div>
				</div>

				<div class="enclosure">
					<div class="content-flex">
						<div class="content-flex-def">
							<div>合同日期</div>
							<div class="content-data">
								{{content.contractDate}}
							</div>
						</div>
						<div class="content-flex-def">
							<div>城营业执照号</div>
							<div class="content-data">
								{{content.licenseNumber}}
							</div>
						</div>
					</div>
					<div class="content-flex-def">
						<div>附件</div>

						<div class="content-data-img">
							<img :src="content.licensePic">
						</div>
						<div class="content-data-img">
							<img :src="content.contractPic">
						</div>
					</div>
				</div>
			</div>

			<div class="control-log" v-show="tableIndex == 1">
				<div class="log-box">
					<div class="line"></div>
					<div v-for="(i, j) in controlLog" :key="j" class="log">
						<div class="ciro"></div>
						<div class="cont">
							<div class="title">
								<div class="log-state">{{i.state}}</div>
								<div class="log-people">
									<div>
										操作人：{{i.people}}
									</div>
									<div class="log-date">
										{{i.time}}
									</div>
								</div>
							</div>
							<p class="text">
								{{i.remarks}}
							</p>
							<div class="arrow"></div>
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
	name: "popUp",
	props:{

	},
	data () {
		return {
			tit: [
				{
					name: "房行详情",
				},
				{
					name: "操作日志",
				},
			],
			content: {
				safetyCode: "0100099",
				enterpriseName: "北京房乾科技有限公司",
				apartmentName: "房乾",
				city: "北京海淀",
				specificAddress:"中关村软件园23号楼201",
				size: 600,
				contractMan: "高雨婷",
				phone: "18010152343",
				model: "合租+整租+集中",
				companyProfile: "我们只做真房源",
				logo: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513139922588&di=e5f390f2316d743619b38ae084d2e335&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01e7575541f622000001714a5c3321.jpg%40900w_1l_2o_100sh.jpg",
				contractDate: "2017-8-9",
				licenseNumber: 168161565689684968,
				licensePic: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513139922588&di=e5f390f2316d743619b38ae084d2e335&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01e7575541f622000001714a5c3321.jpg%40900w_1l_2o_100sh.jpg",
				contractPic: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513139922588&di=e5f390f2316d743619b38ae084d2e335&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01e7575541f622000001714a5c3321.jpg%40900w_1l_2o_100sh.jpg"
			},
			controlLog: [
				{
					state: "通过审核",
					people: "高雨婷",
					time: "2017-08-17 15:50:10",
					remarks: "nonononono"
				},
				{
					state: "通过审核",
					people: "高雨婷",
					time: "2017-08-17 15:50:10",
					remarks: "nonononono"
				},
				{
					state: "通过审核",
					people: "高雨婷",
					time: "2017-08-17 15:50:10",
					remarks: "nonononono"
				},
				{
					state: "通过审核",
					people: "高雨婷",
					time: "2017-08-17 15:50:10",
					remarks: "nononononononononononononononononononononononononononononononnononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononnononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononnononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononnononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononnononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononnononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononnononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononnononononononononononononononononononononononononononononononononononononononono"
				},
				{
					state: "通过审核",
					people: "高雨婷",
					time: "2017-08-17 15:50:10",
					remarks: "nononononononononononononononononononononononononononononononnononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononnononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononnononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononnononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononnononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononnononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononnononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononononnononononononononononononononononononononononononononononononononononononononono"
				}
			],
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
			/* 房行详情 */
			.resources{
				width: calc(100% - 40px);
				margin:0 20px;
				padding-bottom: 40px;
				&>div{
					height: auto;
				}
				/* 一行中两个字段板块 */
				.content-flex{
					width: 100%;
					display: flex;
					align-items: center;
					&>div:nth-child(1){
						flex:1;
						display: flex;
					}
					&>div:nth-child(2){
						flex:1;
						display: flex;
					}
					/* 内容数据 */
					.content-data{
						color: #ccc;
						font-size: 14px;
						margin-left: 20px;
					}
				}

				/* 一行中存在一个板块 */
				.content-flex-def{
					display: flex;
					align-items: center;
					/* 内容数据 */
					.content-data{
						color: #ccc;
						margin-left: 20px;
						font-size: 14px;
					}
					/* 图片数据 */
					.content-data-img{
						margin-left: 20px;
						img{
							height: 60px;
							width: 60px;
						}
					}
				}
				/* 重要信息： 安全码，企业名称 */
				.important{
					height: 50px;
					width: 100%;
					border-bottom: 1px dashed #f3f4f8;
				}
				/* 第二个板块 详细信息板块 */
				.detailed{
					border-bottom: 1px dashed #f3f4f8;
					width: 100%;
					padding-bottom: 20px;
					div{
						margin: 5px 0;
					}
				}
				/* 第三个板块  附件板块*/
				.enclosure{
					padding-top: 20px;
					width: 100%;
					div{
						margin: 5px 0;
					}
				}
			}

			/* 操作日志 */
			.control-log{
				width: 100%;
				position: relative;
				/* 日志的包裹盒子 */
				/* 侧边线 */
				.log-box{
					width: calc(100%- 40px);
					margin:0 20px;
					position: relative;
					padding-bottom: 40px;
					height: 100%;
					.line{
						width: 2px;
						height: 100%;
						background: #eee;
						left: 12px;
						position: absolute;
						z-index: 99;
					}
				}
				/* 所有日志 */
				.log{
					position: relative;
					min-height: 120px;
					width: 100%;
					margin-bottom: 30px;
					/*圆点*/
					.ciro{
						position: absolute;
						width: 40px;
						height: 120px;
					}
				 	.ciro:after{
					 	content:"";
						position: absolute;
						top: 38px;
						left: 4px;
						background: #f3f4f8;
						border-radius: 50%;
						height: 16px;
						width: 16px;
					}
					/*内容*/
					.cont{
						position: relative;
						min-height: 120px;
						width: 90%;
						margin-left: 8%;
						margin-right: 2%;
						border:1px solid #f3f4f8;
						.title{
							height: 34px;
							line-height: 34px;
							width: 100%;
							background: #f3f4f8;
							display: flex;
							justify-content: space-between;
						}
						.log-state{
							font-size: 14px;
							text-indent: 1em;
						}
						.log-people{
							display: flex;
							line-height: 34px;
							&>div{
								margin:0 5px;
								font-size: 12px;
								color: #999;
							}
						}
						.text{
							width: 100%;
							height: auto;
							padding-left: 10px;
							font-size: 14px;
							overflow:hidden;
							word-wrap: break-word;
						}
					}
					/*三角*/
					.arrow{
						height: 12px;
						width: 12px;
						background: #fff;
						position: absolute;
						left: -6px;
						top: 40px;
						transform: rotate(45deg);
					    border-left: 1px solid #f3f4f8;
					    border-bottom: 1px solid #f3f4f8;
					}
				}
			}
		}
	}
}
</style>
