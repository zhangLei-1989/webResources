<template>
	<div class="popRole" ref="parents" v-if="modifypd">
	<!-- 背景层 -->
	<div class="mark"></div>

	<div class="container" v-for="val1 in modify">
		<div class="tit">{{val1.tit}}</div>
		<div class="close" @click="close_popRole"></div>

		<div class="content">
			<ul class="oneTit">
				<li v-for="val in val1.oneList">{{ val.name }}</li>
			</ul>
		</div>
		<div class="twoAndthree">
			<ul class="lList">
				<li v-for="val in val1.twoList">
					<span class="twoList"><i class="img"></i>{{ val.name }}</span>
					<div class="tl">
						<div class="threeList" v-for="item in val.threeList"><i class="img"></i>{{ item.name }}</div>
					</div>
				</li>
			</ul>
			<div class="button-box">
				<button class="button" v-for="(item2, j) in val1.buttons" :key="j" @click="item2.click" >{{ item2.name }}</button>
			</div>
		</div>
	</div>
</div>
</template>
<script>
	export default {
	name: "modifyPermissions",
	props:{
		modify: {
	      	type: Array
	    },
	    tit: {
	    	type: String
	    },
	    oneList: {
	    	type: Array
	    },
	    twoList: {
	      	type: Array
	    },
	    threeList: {
	    	type: Array
	    },
	    buttons: {
	    	type: Array
	    }
	},
	data () {
		return {
			Modify:[],
			options: [],
			modifypd: false
		}
	},
	methods: {
		button_click () {
			alert("")
		},
		close_popRole () {
			// 关闭弹出框
			this.$refs.parents.style.display = "none";
			this.modifypd = false;
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
		},
		showFn() {
        	this.modifypd = true;
      	},
      	closeFn() {
        	this.modifypd = false;
      	}
	},
	mounted () {
		document.onclick = () => {
			// 关闭所有的下拉列表框
			this.close_selectList();
		}
	},
	created() {
	    const { modify } = this.$props;
    	if (modify) {
      		this.Modify = modify;
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
		width: 1060px;
		height: 600px;
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
			.oneTit{
				width: 100%;
			    background: #fff;
			    float: left;
			    padding-left: 0px;
			    padding:0 10px;
			    margin: 0;
			    li{
			    	height: 45px;
				    line-height: 45px;
				    padding: 0 25px;
				    display: inline-block;
				    float: left;
				    cursor: pointer;
				    font-size: 14px;
			    }
			}
		}
		.twoAndthree{
			width: 100%;
			height: calc(100% - 90px);
			background: #f2f3f5;
			position: relative;
			padding: 15px 19px;
			.img{
				width: 16px;
				height: 16px;
				background: #fff;
				border: solid 1px #eee;
				display: block;
				float: left;
				margin-right: 9px;
				margin-top: 3px;
			}
			.lList{
				width: 100%;
				height: 100%;
				background: #fff;
				padding:0 21px;
				margin: 0px;
				li{
					width: 100%;
					height: auto;
					overflow: hidden;
					padding:28px 0;
				}
				.twoList{
					float: left;
					width: 126px;
					line-height: 22px;
					font-size: 14px;
					color: #404040;
					border-right: solid 1px #000;
					margin-right: 25px;
				}
				.tl{
					width: calc(100% - 152px);
					float: left;
					height: 100%;
					.threeList{
						width: 170px;
						float: left;
						line-height: 22px;
						font-size: 14px;
						color: #404040;
						margin-bottom: 20px;
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
					line-height: 40px;
					background: #ed0536;
					outline: none;
					border: none;
					border-radius: 5px;
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
