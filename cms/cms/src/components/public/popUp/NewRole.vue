<template>
	<div class="popRole" ref="parents" v-if="newRole">
	<!-- 背景层 -->
	<div class="mark"></div>

	<div class="container">
		<div class="tit">{{tit}}</div>
		<div class="close" @click="closeFn"></div>

		<div class="content">
			<div class="mingcheng">
				<div class="tip">{{inputs.placeholder}}</div>
				<div class="input" v-if="inputs.type == 'input'" :class="inputs.must? 'must' : ''">
					<input type="text" id="nameM">
				</div>
			</div>
			<div class="miaoshu">
				<div class="tip">{{inputs.placeholder2}}</div>
				<div class="input" v-if="inputs.type == 'input'" :class="inputs.must? 'must' : ''">
					<input type="text" id="Umiaos">
				</div>
			</div>
		</div>

		<div class="button-box">
			<div class="button" v-for="(item, j) in buttons" :key="j" :style="{'background': item.color? item.color : '#ed0536'}" @click="button_click">{{item.name}}</div>
		</div>
	</div>
</div>
</template>
<script>
	import Validation from "../../../../static/js/validation.js";
	export default {
	name: "popRole",
	props:{},
	data () {
		return {
			newRole: false,
			tit: "新增公寓角色",
			inputs: {
					type: "input",
					placeholder: "角色名称：",
					placeholder2: "角色描述：",
	        		value: "",
	        		value2: "",
					must: true
				},
			buttons: [
				{
					name: "保存",
					color: ""
				}
			],
			options: [],
		}
	},
	methods: {
		// 新增用户按钮
		button_click () {
	      	var uname = document.getElementById('nameM');
	      	var namems = document.getElementById('Umiaos');
			const self = this,
		    validate = new Validation();

		    validate.addRule(
		        Validation.rules.isEmptyOrNull,
		        uname.value,
		        "请输入角色名称！"
		    );
		    validate.addRule(
		        Validation.rules.isEmptyOrNull,
		        namems.value,
		        "请输入角色描述！"
		    );

		    const result = validate.startValidate();
		     	if (result) {
		        self.$message.error(result);
		    } else {
	      	self.axios
	      	.post(this.$store.state.api.setting.newrole, {
	        	name: uname.value,
	        	desc: namems.value,
	        	gcid: "9999"
	      	})
	      	.then(function(response) {
	        	self.loading = false;
	        	const { data } = response;
	        	if (data.status.code == 200) {
	        		self.$message.success("保存成功！");
	        		setTimeout(function(){
	        			self.newRole = false;
      					self.queryList();
	        		},2000)
	        	}
	      	})
	      	.catch(function(error) {
	        	self.loading = false;
	        	self.$message.error(error);
	      	});
	      }
		},
		showFn () {
        	this.newRole = true;
      	},
      	closeFn () {
        	this.newRole = false;
      	}
	},
    created() {
      	const self = this;
    }
}
</script>
<style scoped lang="scss">
.popRole{
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
		width: 600px;
		height: 350px;
		background:#fff;
		/* 标题 */
		.tit{
			height: 50px;
			text-indent: 2em;
			font-size: 16px;
			color: #ed0536;
			line-height: 50px;
			border-bottom: 1px solid #f2f6f7;
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
			display: flex;
			flex-wrap: wrap;
			width: 90%;
			margin:20px 5% 0 5%;
			&>div{
				&:nth-child(1){
					margin-top: 10px;
					width: 50%;
					.tip{
						padding-left: 12px;
					}
					.input{
						width: 69%;
					}
				}
				&:nth-child(2){
					margin-top: 10px;
					margin-right: 2%;
					width: 100%;
					.tip{
						width: 15%;
						padding-left: 15px;
					}
					.input{
						width: 85%;
					}
				}
				&>.must:after{
					content: "*";
					position: absolute;
					top: 10px;
					left: 5px;
					color: red;
					line-height: 0;
				}
				position: relative;
				display: flex;
				height:34px;
				border:1px solid #e6e6e6;
				line-height: 34px;
				justify-content: space-around;
				input{
					width: 100%;
					height: 30px;
					border:0;
					outline: none;
					box-sizing: border-box;
					line-height: 30px;
				}
				/* 下拉框 */
				.select{
					/* 下拉icon三角 */
					.select-icon{
						height: 0;
						width: 0;
						border:5px solid transparent;
						position: absolute;
						top: 14px;
						right: 5px;
						border-top-color:#ccc;
					}
					.select-icon-bottom{
						top: 10px;
						border-top-color: transparent;
						border-bottom-color: #ccc;
					}
					.select-list{
						display: none;
						position: absolute;
						top: 20px;
						left: 0;
						width: 100%;
						max-height: 200px;
						background: #fff;
						z-index: 99;
						border:1px solid #e6e6e6;
						border-top: 0;
						cursor: pointer;
						overflow-y: auto;
						li{
							margin-left: -40px;
							text-align: center;
						}
						li:hover{
							color: #ccc;
						}

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
