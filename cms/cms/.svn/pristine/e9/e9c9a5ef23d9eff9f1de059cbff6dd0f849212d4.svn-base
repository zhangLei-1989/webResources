<template>
<div class="dialog" ref="parents">
	<!-- 背景层 -->
	<div class="mark"></div>

	<div class="container">
		<div class="tit">{{tit}}</div>
		<div class="close" @click="close_dialog"></div>

		<div class="content">
			<div class="enterprise">
				<div class="title">
					企业信息
				</div>
				<div class="information">
					<div>
					  	<el-input placeholder="请输入内容">
					    	<template slot="prepend">企业名称：</template>
					  	</el-input>
						<div>请输入与完整企业名称,需要和营业执照对应</div>
						<span class="must">*</span>
					</div>
					<div>
					  	<el-input placeholder="请输入内容">
					    	<template slot="prepend">企业名称：</template>
					  	</el-input>
						<div>请输入与完整企业名称,需要和营业执照对应</div>
						<span class="must">*</span>
					</div>
					<div>
					  	<el-input placeholder="请输入内容">
					    	<template slot="prepend">企业名称：</template>
					  	</el-input>
						<div>请输入与完整企业名称,需要和营业执照对应</div>
						<span class="must">*</span>
					</div>
					<div>
					  	<el-input placeholder="请输入内容">
					    	<template slot="prepend">企业名称：</template>
					  	</el-input>
						<div>请输入与完整企业名称,需要和营业执照对应</div>
						<span class="must">*</span>
					</div>
					<div>
						<div class="special">
				    		<span class="tip">企业名称：</span>
							<el-select v-model="value4" clearable placeholder="请选择">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
						  	</el-select>
					  	</div>
						<div>请输入与完整企业名称,需要和营业执照对应</div>
						<span class="must">*</span>
					</div>
					<div>
					  	<div class="special noTip">
				    		<span class="tip">企业名称：</span>
				    		<div class="checkbox">
								<el-checkbox-group v-model="checkList">
								    <el-checkbox label="合租"></el-checkbox>
								    <el-checkbox label="集中"></el-checkbox>
								    <el-checkbox label="单租"></el-checkbox>
							  	</el-checkbox-group>
				    		</div>
					  	</div>
					  	<div></div>
					</div>
					<div>
					  	<div class="special">
				    		<span class="tip">企业名称：</span>
				    		<el-upload
				    		  style="width: 190px;height: 30px;border:0"
							  class="upload-demo"
							  drag
							  action="https://jsonplaceholder.typicode.com/posts/"
							  multiple>
							  <div><i class="el-icon-upload"></i><span class="text-upload">点击上传</span></div>
							</el-upload>
					  	</div>
					  	<div>上传PNG/GIF格式文件，文件不能超过2MB</div>
					</div>
					<div style="height: 100px">
						<el-input
						  type="textarea"
						  :autosize="{ minRows: 4, maxRows: 4}"
						  style="padding-right: 40px"
						  placeholder="请输入内容">
						</el-input>
					</div>

				</div>
			</div>
			<div class="licence">
				<div class="title">
					证照
				</div>
				<div class="information">
					<div>
					  	<el-input placeholder="请输入内容">
					    	<template slot="prepend">企业名称：</template>
					  	</el-input>
						<div>完整企业名称,需要和营业执照对应</div>
					</div>
					<div>
					  	<div class="special">
				    		<span class="tip">企业名称：</span>
				    		<el-upload
				    		  style="width: 190px;height: 30px;border:0"
							  class="upload-demo"
							  drag
							  action="https://jsonplaceholder.typicode.com/posts/"
							  multiple>
							  <div><i class="el-icon-upload"></i><span class="text-upload">点击上传</span></div>
							</el-upload>
					  	</div>
					  	<div>上传PNG/GIF格式文件，文件不能超过2MB</div>
					</div>
					<div>
					  	<div class="special">
				    		<span class="tip">企业名称：</span>
				    		<el-upload
				    		  style="width: 190px;height: 30px;border:0"
							  class="upload-demo"
							  drag
							  action="https://jsonplaceholder.typicode.com/posts/"
							  multiple>
							  <div><i class="el-icon-upload"></i><span class="text-upload">点击上传</span></div>
							</el-upload>
					  	</div>
					  	<div>上传PNG/GIF格式文件，文件不能超过2MB</div>
					</div>
					<div>
					  	<div class="special">
				    		<span class="tip">企业名称：</span>
				    		<el-upload
				    		  style="width: 190px;height: 30px;border:0"
							  class="upload-demo"
							  drag
							  action="https://jsonplaceholder.typicode.com/posts/"
							  multiple>
							  <div><i class="el-icon-upload"></i><span class="text-upload">点击上传</span></div>
							</el-upload>
					  	</div>
					  	<div>上传PNG/GIF格式文件，文件不能超过2MB</div>
					</div>
				</div>
			</div>

			<div class="button-box">
				<div class="button" v-for="(item, j) in buttons" :key="j" :style="{'background': item.bgColor? item.bgColor : '#ed0536'}" @click="button_click">{{item.name}}</div>
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
			tit: "启用",
			content: {
				tip: "确定要删除吗？",
				textarea: "必须输入删除原因",
			},
			inputs: [

			],
			buttons: [
				{
					name: "保存"
				}
			],
			options: [{
	          value: '选项1',
	          label: '黄金糕'
	        }, {
	          value: '选项2',
	          label: '双皮奶'
	        }, {
	          value: '选项3',
	          label: '蚵仔煎'
	        }, {
	          value: '选项4',
	          label: '龙须面'
	        }, {
	          value: '选项5',
	          label: '北京烤鸭'
	        }],
	        value4: '',
	        checkList: [],
			buttons: [
				{
					name: "取消",
					bgColor: "#a1aab3"
				},
				{
					name: "保存"
				}
			]
		}
	},
	methods: {
		button_click () {

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
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.container{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		min-width: 650px;
		width: 50%;
		height: 95%;
		background: #fff;
		overflow:hidden;
		/* 标题 */
		.tit{
			height: 50px;
			text-indent: 2em;
			font-size: 16px;
			color: #ed0536;
			line-height: 50px;
			border-bottom: 1px solid #f2f6f7;
			background:#fff;
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
			width: 100%;
			height: 100%;
			overflow-y: auto;
			padding-bottom: 30px;
			.enterprise, .licence{
				width: calc(100%-40px);
				margin:20px 0 0 20px;
				.title{
					width: 100%;
					height: 34px;
					line-height: 34px;
					font-size: 16px;
					position: relative;
					text-indent: 4px;
					&:after{
						content: "";
						height: 16px;
						width: 3px;
						display: block;
						background: #f2324e;
						position: absolute;
						border-radius: 5px;
						top: 8px;
						left: 0px;
						z-index: 33;
					}
				}
				.information{
					width: 100%;
					&>div{
						position: relative;
						display: flex;
						height: 36px;
						justify-content: space-around;
						margin-top: 15px;
						flex:1;

						/deep/ .el-input.el-input-group{
							border:1px solid #e6eced;
						}
						&>div{
							width:50%;
							flex:1;
							/deep/ .el-input-group__prepend{
								background: #fff;
								padding: 0 10px;
								border:0;
								color: #000;
								font-size: 14px;
							}
							/deep/ .el-input__inner{
								height: 30px;
								background: #fff;
								padding: 0 6px;
								border:0;
							}
							&:nth-child(2){
								text-indent: 1em;
								line-height: 36px;
							}
							&.special{
								display: flex;
								flex:1;
								border:1px solid #e6eced;
								.tip{
									line-height: 34px;
									padding: 0 10px;
									border:0;
									font-size: 14px;
								}
								/deep/ .el-input__inner{
									height: 34px;
								}
								.checkbox{
									line-height: 34px;
									/deep/ .el-checkbox__label{
										padding:0px;
									}
								}
								/deep/ .el-upload {
									width: 100%;
								}
								/deep/ .el-upload-dragger{
									height: 34px;
									width: 100%;
									border:0;
								}
								/deep/ .el-icon-upload{
								    font-size: 16px;
								    padding: 0 5px;
								    color: red;
									line-height: 30px;
									margin:0;
								}
								/deep/ .text-upload{
									color: #a1a1a1;
								}
							}
						}
						.must{
							position: absolute;
							top: 3px;
							left: 5px;
							color: red;
						}
					}
				}
			}
			/* 按钮盒子 */
			.button-box{
				height: 50px;
				display: flex;
				justify-content: flex-end;
				width: 90%;
				margin: 30px 5%;
				.button{
					width: 100px;
					height: 40px;
					text-align: center;
					background: #ccc;
					line-height: 40px;
					border-radius: 5px;
					background: #ed0536;
					color: #fff;
					font-size: 16px;
					margin-left: 10px;
					cursor: pointer;
				}
			}
		}
	}
}
</style>
