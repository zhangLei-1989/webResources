<template>
	<div class="popRole" ref="parents">
	<!-- 背景层 -->
	<div class="mark"></div>

	<div class="container">
		<div class="tit">{{tit}}</div>
		<div class="close" @click="close_popRole"></div>

		<div class="content">
			<b class="messagetit">{{ Message.title }}</b>
			<span class="messagetime">{{ Message.cttime }}</span>
			<p class="messageval">{{ Message.value }}</p>
		</div>

		<div class="button-box">
			<div class="button"
           v-for="(item, j) in buttons"
           :key="j" :style="{'background': item.color? item.color : '#ed0536'}"
           @click="button_click">{{item.name}}</div>
		</div>
	</div>
</div>
</template>
<script>
	export default {
	name: "MessageDetails",
	props:{

	},
	data () {
		return {
			tit: "消息详情",
			Message: {
					title: "活动专区暂时下线公告",
					cttime: "2017.2.13 18:34",
					value: "尊敬的用户，为了给您带来更好的体验，活动专区业务将于2017年10月26日22：00-2017年10月27日09：00期间进行系统升级，升级期间秒杀专区入口将暂时下线，升级后可正常充值和查看充值记录，请有需要的用户提前充值或者在系统升级后再充值，给您带来的不便，敬请谅解，感谢您一如既往的支持。"
				},
			buttons: [
				{
					name: "<上一篇",
					color: ""
				},
				{
					name: "下一篇>",
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
			.messagetit{
				width: 100%;
				height: 36px;
				text-align: center;
				line-height: 36px;
				font-size: 22px;
				font-weight: normal;
				color: #404040;
			}
			.messagetime{
				width: 100%;
				height: 24px;
				text-align: center;
				line-height: 24px;
				font-size: 12px;
				color: #a0a0a0;
				position: relative;
				margin-bottom: 40px;
			}
			.messagetime:after{
				width: 35px;
				height: 3px;
				content:'';
				background: #ed0535;
                display:block;
				position: absolute;
				bottom: -10px;
				left: 50%;
				margin-left: -17.5px;
			}
			.messageval{
				font-size: 14px;
				color: #666666;
				line-height: 35px;
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
				line-height: 40px;
				background: none !important;
				color: #a2a2a2;
				font-size: 16px;
				margin-left: 10px;
				cursor: pointer;
			}
		}
	}
}
</style>
