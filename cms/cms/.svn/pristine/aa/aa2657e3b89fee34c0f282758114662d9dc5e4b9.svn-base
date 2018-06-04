<template>
<div class="popUp" ref="parents">
	<!-- 背景层 -->
	<div class="mark"></div>

	<div class="container">
		<div class="tit">{{tit}}</div>
		<div class="close" @click="close_popUp"></div>

		<div class="content">
			<div v-for="(i,j) in inputs" :data-index="i.index" :key="j">
				<!-- 左侧提示文字 -->
				<div class="tip">{{i.placeholder}}</div>
				<!-- 输入框 -->
				<div class="input" v-if="i.type == 'input'" :class="i.must? 'must' : ''">
					<input type="text" v-model="i.value">
				</div>
				<!-- 下拉选择框 -->
				<div class="select" v-if="i.type == 'select'" :class="i.must? 'must' : ''">
					<input type="text" @click.self.stop="select_options_show" v-model="i.value">
					<ul class="select-list" @click="select_options_selected">
						<li v-for="(j, k) in i.options" :key="k" v-show="new RegExp(i.value.replace(/^\s+|\s+$/, ''), 'g').exec(j.label)!=null">{{j.label}}</li>
					</ul>
					<span class="select-icon"></span>
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
export default {
	name: "popUp",
	props:{

	},
	data () {
		return {
			tit: "名称",
			inputs: [
				{
					type: "input",
					placeholder: "公寓名称：",
	        		value: "",
					must: true,
					index: 0
				},
				{
					type: "select",
					placeholder: "城市/区域：",
					options: [
						{
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
				        },
						{
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
				        },
				    ],
	        		value: "",
					must: true,
					index: 1
				},
				{
					type: "input",
					placeholder: "联系人姓名：",
	        		value: "",
					index: 2,
					must: true,
				},
				{
					type: "input",
					placeholder: "手机号：",
	        		value: "",
					index: 3,
					must: true,
				},
				{
					type: "input",
					placeholder: "验证码：",
	        		value: "",
					must: true,
					index: 4
				},
				{
					type: "input",
					placeholder: "密码：",
	        		value: "",
					index: 5,
					must: true,
				}
			],
			buttons: [
				{
					name: "保存",
					color: ""
				},
				{
					name: "保存",
					color: ""
				},
				{
					name: "保存",
					color: ""
				}
			],
			options: [],
		}
	},
	methods: {
		button_click () {
			alert("")
		},
		close_popUp () {
			// 关闭弹出框
			this.$refs.parents.style.display = "none";
		},
		// 关闭所有的下拉框
		close_selectList () {
			var select_list = document.getElementsByClassName("select-list"),
				selec_icon = document.getElementsByClassName("select-icon");
				// console.log(select_list, selec_icon)
			for (var i=0; i<select_list.length; i++) {
				select_list[i].style.display = "none";
				selec_icon[i].className = "select-icon";
			}
		},
		// 显示下拉框
		select_options_show (e) {
			// 先关闭所有的下拉框
			this.close_selectList();

			var tar = e.target.parentNode.children;
			// 找到相应的下拉选择框， 进行展示
			for (var i=0; i<tar.length; i++) {
				if (tar[i].className == "select-list") {
					tar[i].style.display = "block";
				}
				if ( tar[i].className == "select-icon" ) {
					tar[i].setAttribute("class", tar[i].getAttribute("class")+" select-icon-bottom")
				}
			}
		},
		// 下拉多选框 选择完毕
		select_options_selected (e) {
			// 获取当前选择框的index， 控制数据改变内容
			var  index = e.target.parentNode.parentNode.parentNode.getAttribute("data-index");
			this.inputs[index].value = e.target.innerText;
			// 关闭下拉框
			this.close_selectList();
		}
	},
	mounted () {
		document.onclick = () => {
			// 关闭所有的下拉列表框
			this.close_selectList();
		}
	}
}
</script>

<style scoped lang="scss">
.popUp{
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
				&:nth-child(even){
					margin-left: 2%;
					margin-top: 10px;
					width: 48%;
				}
				&:nth-child(odd){
					margin-top: 10px;
					margin-right: 2%;
					width: 48%;
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
					height: 30px;
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
