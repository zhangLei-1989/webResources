<template>
	<div class="popRole" ref="parents">
	<!-- 背景层 -->
	<div class="mark"></div>

	<div class="container">
		<div class="tit">{{tit}}</div>
		<div class="close" @click="close_popRole"></div>

		<div class="content">
			<div class="mingcheng">
				<div class="tip">{{inputs.placeholder}}</div>
				<div class="input" v-if="inputs.type == 'input'" :class="inputs.must? 'must' : ''">
					<select class="select">
					  <option value=""></option>
					</select>
				</div>
			</div>
			<div class="miaoshu">
				<div class="tip">{{inputs.placeholder2}}</div>
				<div class="input" v-if="inputs.type == 'input'" :class="inputs.must? 'must' : ''">
					<input type="text" v-model="inputs.value2">
				</div>
				<div class="xz"><span>0</span>/20</div>
			</div>
			<div class="neirong">
				<div class="tip">{{inputs.placeholder3}}</div>
				<div class="input" v-if="inputs.type == 'input'" :class="inputs.must? 'must' : ''">
					<textarea maxlength="100"></textarea>
				</div>
				<div class="xz"><span>0</span>/100</div>
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
	name: "ReleaseTheMessage",
	props:{

	},
	data () {
		return {
			tit: "发布消息",
			inputs: {
					type: "input",
					placeholder: "接受对象：",
					placeholder2: "标题：",
					placeholder3: "公告内容：",
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
		button_click () {
			alert("")
		},
		close_popRole () {
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
		height: 500px;
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
			.mingcheng{
				width: 100%;
				position: relative;
				margin-bottom: 10px;
				overflow: hidden;
				.tip{
					position: absolute;
					top: 0;
					left: 15px;
				}
				.select{
					width: 460px;
					height: 100%;
					padding-left: 75px;
					border: none;
					outline: none;
					position: absolute;
					right: 0;
					top: 0;
				}
			}
			.miaoshu{
				width: 100%;
				position: relative;
				margin-bottom: 10px;
				.tip{
					position: absolute;
					top: 0;
					left: 15px;
				}
				.input{
					width: 100%;
					padding-left: 75px;
				}
				.xz{
					height: 100%;
					position: absolute;
					right: 10px;
					top: 0;
				}
			}
			.neirong{
				border: none;
				border:solid 1px #e6e6e6;
				width: 100%;
				height: 200px;
				outline: none;
				position: relative;
				overflow: hidden;
				.tip{
					position: absolute;
					line-height: 22px;
					top: 0;
					left: 13px;
					color: #a2a2a2;
				}
				textarea{
					width: 540px;
					height: 100%;
					border: none;
					outline: none;
					position: absolute;
					top: 20px;
					left: 0;
					font-size: 18px;
				}
				.xz{
					position: absolute;
					bottom: 0;
					right: 10px;
				}
			}
			&>div{
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
