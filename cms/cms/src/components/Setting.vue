<template>
<el-container>
	<!-- 二级路由 -->
	<el-header class="header" height="60px">
		<cms-header :tabs="tabs"></cms-header>
	</el-header>
	<!-- 二级路由 -->
	<el-main class="main">
		<router-view></router-view>
	</el-main>
	<newRole ref="newRole"></newRole>
	<newCMSRole ref="newCMSRole" :edits="tabsl"></newCMSRole>
	<newlyAdded ref="newlyAdded"></newlyAdded>
</el-container>

</template>

<script>
import Validation from "../../static/js/validation.js";
import tool from "../../static/js/tool.js";
import cmsHeader from "@/components/public/CMSHeader"
// 弹出层
import newRole from "@/components/public/popUp/NewRole.vue"; //新增公寓角色
import newCMSRole from "@/components/public/popUp/NewCMSRole.vue"; //新增CMS用户
import newlyAdded from "@/components/public/popUp/NewlyAdded.vue"; //新增CMS角色

export default {
	name: "setting",
	data() {
		var self = this
		return {
			dialogVisible: false,
			ziyuanName: "",
			radio: "",
			ziyuanBiaoshi: "",
			paixu: "",
			activeName: 'first',
			tabsl: [
					{
			          tit: "新增CMS用户",
			          inputs: [
			            {
			              type: "input",
			              placeholder: "用户名：",
			              value: "",
			              must: true,
			              index: 0
			            },
			            {
			              type: "select",
			              placeholder: "角色：",
			              options: [],
			              value: "",
			              must: true,
			              index: 1
			            },
			            {
			              type: "input",
			              placeholder: "手机号：",
			              value: "",
			              index: 2,
			              must: true,
			            },
			            {
			              type: "input",
			              placeholder: "密码：",
			              value: "",
			              index: 3,
			              must: true,
			            }
			          ],
			          buttons: [
			            {
			              name: "保存",
			              color: "",
			              click:(function (argument) {
			                  this.Preservation()
			                }).bind(self)
			            }
			          ]
		        }
			],
			tabs: [
				{ 
					name: "公寓角色", 
					path: "/setting/ApartmentRole",
					btns: [
					  	{
						  	name: "新增角色",
						  	click:(function (argument) {
						  		this.addNewRole()
						  	}).bind(self)
				  		}
				  	]
				},
				{ 
					name: "CMS用户", 
					path: "/setting/CMSUserManagement",
					btns: [
					  	{
						  	name: "新增用户",
						  	click:(function (argument) {
						  		this.addNewCMSRole()
						  	}).bind(self)
				  		}
				  	]
				},
				{ 
					name: "CMS角色", 
					path: "/setting/CMSRoleManagement",
					btns: [
					  	{
						  	name: "新增角色",
						  	click: (function (argument) {
						  		this.addNewlyAdded()
						  	}).bind(self)
				  		}
				  	]
				},
				{ 
					name: "资源管理", 
					path: "/setting/ResourceManagement",
					btns: [
					  	{
						  	name: "添加资源",
						  	click: (function (argument) {
						  		this.addZiyuan();
						  	}).bind(self)
				  		}
				  	]
				}
			]
		}
    },
    methods:{
    	addNewRole () {
        	this.$refs.newRole.showFn();
      	},
    	addNewCMSRole () {
        	this.$refs.newCMSRole.showFn();
      	},
    	addNewlyAdded () {
        	this.$refs.newlyAdded.showFn();
      	},
      	addZiyuan () {
      		this.$store.commit('resourceManagement/mutahidshow',true);
      	},
      	Preservation () {
			const self = this;
      		//获取新增CMS用户 input 里面的值
      		var ipt = document.getElementById("1");
      		var iptList = document.getElementById("ipt").childNodes;
      		var ipts1 = ipt.value;
      		self.tabsl[0].inputs[1].options.forEach(opt => {
      			if(ipts1 == opt.label){
      				ipts1 = opt.value;
      			}
      		})
      		var ipts = iptList[0].childNodes[2].children[0].value; //名字
      		var ipts2 = iptList[2].childNodes[2].children[0].value;//手机号
      		var ipts3 = iptList[3].childNodes[2].children[0].value;//密码
      		var tb2 = {
      			roleId:ipts1,
      			userName: ipts,
      			phone: ipts2,
      			userPwd: ipts3
      		}
	      	const validate = new Validation();
	      	validate.addRule(
	          	Validation.rules.isEmptyOrNull,
	          	ipts,
	          	"角色名称不能为空！"
	      	);
	      	validate.addRule(
	          	Validation.rules.isEmptyOrNull,
	          	ipts2,
	          	"手机号不能为空！"
	      	);
	      	validate.addRule(
	          	Validation.rules.isMobile,
	          	ipts2,
	          	"请输入正确手机号！"
	      	);
	      	validate.addRule(
	          	Validation.rules.isEmptyOrNull,
	          	ipts1,
	          	"角色不能为空！"
	      	);
	      	validate.addRule(
	          	Validation.rules.isEmptyOrNull,
	          	ipts3,
	          	"密码不能为空！"
	      	);
	      	validate.addRule(
	          	Validation.rules.isString,
	          	ipts3,
	          	"密码不能为汉字！"
	      	);
      		const result = validate.startValidate();
		        if (result) {
		          self.$message.error(result);
		    } else {
      		self.axios
	      	.post(this.$store.state.api.setting.insert_user, 
	      		tb2)
	      	.then(function(response) {
	        	self.loading = false;
	        	const { data } = response;
	        	if (data.status.code == 200) {
	        		self.$message.success("保存成功");
	        		setTimeout(function(){
	        			self.$refs.newCMSRole.closeFn();
	        			self.$router.go(0);
	        		},2000);
	        	}
	      	})
	      	.catch(function(error) {
	        	self.loading = false;
	        	self.$message.error(error);
	      	});
	      }
      	},
      	queryCMSrole() {
			const self = this;
	    	//cms用户 角色选择框
	      	self.axios
	      	.post(this.$store.state.api.setting.cms_user
	        	)
	      	.then(function(response) {
	        	const { data } = response;
	        	if (data.status.code == 200) {
	          		data.result.list.forEach(element => {
	            	var tb1 = {
	                	value: "",
	                	label: "",
	                	id: ""
	              	}
	            	tb1.value = element.id;
	            	tb1.label = element.name;
		            self.tabsl[0].inputs[1].options.push(tb1)
	          		});
	        	}
	      	})
	      	.catch(function(error) {
	        	self.loading = false;
	        	self.$message.error(error);
	      	});
      	}
    },
    created() {
    	const self = this;
    	self.queryCMSrole();
    },
    components: {
    	cmsHeader,
    	newRole,
    	newCMSRole,
    	newlyAdded
    }
}
</script>

<style scoped>
.router-link{
	height: 100%;
}
.main{
	background: #f2f3f5;
}
.router-link-active{
	color:red;
	border-bottom: 1px solid red;
}
.el-header {
	background-color: #fff;
	color: #333;
	line-height: 60px;
}
.el-aside {
	color: #333;
}
.el-row {
	margin-bottom: 20px;
	&:last-child {
	  margin-bottom: 0;
	}
}
.el-col {
	border-radius: 4px;
}
.grid-content {
	border-radius: 4px;
	min-height: 36px;
}
.row-bg {
	padding: 10px 0;
	background-color: #f9fafc;
}
/deep/ .el-dialog__body{
	padding: 10px 20px;
}
/deep/ .el-button--primary {
    color: #fff;
    background-color: #ed0536;
    border-color: #ed0536;
}
.ziyuan{
	width: 245px;
    height: 36px;
    margin-bottom: 20px;
    line-height: 36px;
    position: relative;
    float: left;
}
.ziyuan span{
	position: absolute;
	left: 8px;
	z-index: 333;
	font-size: 14px;
}
.ziyuan input{
	width: 243px;
    height: 36px;
    line-height: 36px;
    position: absolute;
    padding: 0px 5px 0px 80px;
	font-size: 14px;
}
.radioone{
	width: 133px;
	float: right;
}
</style>
