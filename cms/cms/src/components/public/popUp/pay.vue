<template>
<div class="dialog" ref="parents">
	<!-- 背景层 -->
	<div class="mark"></div>

	<div class="container">
		<div class="tit">{{tit}}</div>
		<div class="close" @click="close_dialog"></div>

		<div class="content">
			<div class="accounts">
				<div v-for="(i, j) in accounts" :key="j" :class="j == accounts_index ? 'active' : ''" @click="accounts_click(i.index)">{{i.name}}</div>
			</div>
			<div class="inputs">
				<el-input placeholder="请输入内容">
				    <template slot="prepend">*商户号</template>
			  	</el-input>
			  	<el-input placeholder="请输入内容">
				    <template slot="prepend">*APP ID</template>
			  	</el-input>
			  	<el-input placeholder="请输入内容">
				    <template slot="prepend">*APP密钥</template>
			  	</el-input>
			</div>
		</div>

		<div class="button-box">
			<div class="button" v-for="(item, j) in buttons" :key="j" :style="{'background': item.bgColor? item.bgColor : '#ed0536'}" @click="button_click">{{item.name}}</div>
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
			accounts: [
				{
					name: "支付宝支付",
					index:0,
				},
				{
					name: "微信支付",
					index:1,
				},
				{
					name: "银联支付",
					index:2,
				},
			],
			accounts_index: 0,
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
		},
		accounts_click (index) {
			this.accounts_index = index;
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
		width: 450px;
		height: 400px;
		background: #fff;
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
			width: 90%;
			margin:0 5%;
			height: 220px;
			background: #e6eced;
			margin-top: 20px;
			.accounts{
				display: flex;
				width: 100%;
				height: 36px;
				line-height: 36px;
				&>div{
					flex:1;
					text-align: center;
					background: #f2f6f7 url("/src/assets/images/pay_03.png") no-repeat 12px 12px;
					cursor: pointer;
					&.active{
						background: #e6eced url("/src/assets/images/pay_06.png") no-repeat 12px 12px;
					}
				}
			}
			.inputs{
				width: 90%;
				margin:0 5%;
				margin-top: 20px;
				&>div{
					width: 100%;
					margin-top: 10px;
					& /deep/ div.el-input-group__prepend{
						border:0;
						background: #fff;
						box-sizing: border-box;
					}
					& /deep/ input.el-input__inner{
						border:0;
						background: #fff;
						box-sizing: border-box;
					}
				}
			}
		}

		/* 按钮盒子 */
		.button-box{
			position: absolute;
			bottom: 30px;
			height: 50px;
			display: flex;
			justify-content: flex-end;
			width: 90%;
			margin:0 5%;
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
</style>
