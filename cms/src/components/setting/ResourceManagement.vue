<template>
	<el-row v-loading="loading"
    	element-loading-text="拼命加载中"
    	element-loading-background="rgba(0, 0, 0, 0.3)">
        <el-col :span="24">
          	<el-tabs id="tab_one" v-model="tabs2.activeName" type="border-card">
            	<el-tab-pane v-for="(item,index) of tabs2.data" :key="item.id" :label="item.name" :name="item.id">
            		<span slot="label" class="oneTit"><i @click="threeEdit(item)" class="el-icon-edit oneedit"></i>{{ item.name }}</span>
                	<el-tabs id="tab_two" :tab-position="tabPosition" type="border-card" style="height: 200px;">
                  		<el-tab-pane v-for="(item2,index2) of item.children" :key="item2.id" :label="item2.name">
                  			<span slot="label" class="twoTit"><i @click="threeEdit(item2)" class="el-icon-edit twoedit"></i>{{ item2.name }}</span>
	                    	<el-row class="noMargin noPadding show">
						    	<el-col :span="24">
						        	<el-table :data="item2.children" stripe border>
						          		<el-table-column 
						            	prop="name"
						            	label="资源名称">
						          		</el-table-column>
						          		<el-table-column 
						            	prop="mark"
						            	label="资源标识">
						          		</el-table-column>
						          		<el-table-column 
						            	prop="isScope"
						            	label="是否有范围">
						            		<template slot-scope="scope">
							                	<span v-if="scope.row.isScope=='0'">没有</span>
							                	<span v-if="scope.row.isScope=='1'">有</span>
							              	</template>
						          		</el-table-column>
						          		<el-table-column 
						            	prop="orderIndex"
						            	label="排序值">
						          		</el-table-column>
						          		<el-table-column 
						            	prop="guXuqiuZhengZu"
						            	label="操作">
							            <template slot-scope="scope">
							              	<el-button type="text" style="color:#ed0536;" size="small" @click="threeEdit(scope.row)">编辑</el-button>
							              	<el-button type="text" style="color:#ed0536;" size="small" @click="deleteBtn(scope.row.id)">删除</el-button>
							            	</template>
						          		</el-table-column>
						       		</el-table>
						    	</el-col>
							</el-row>
                  		</el-tab-pane>
		              	<el-tab-pane
		              	 disabled>
						    <span class="tjzy" slot="label" @click="addTwoTj(tabs2.activeName)">添加资源</span>
						</el-tab-pane>
                	</el-tabs>
              	</el-tab-pane>
              	<el-tab-pane
              	 disabled>
				    <span class="tjzy" slot="label" @click="addOneTj(tabs2.activeName)">添加资源</span>
				</el-tab-pane>
          	</el-tabs>
        </el-col>
        <el-dialog
		  title="修改资源"
		  :visible.sync="dialogVisible"
		  width="283px">
		  <div class="ziyuan"><span>资源名称：</span><input type="text" v-model="input3"></div>
		  <div class="ziyuan">
		  	<span>是否有范围：</span>
			<div class="radioone">
				<el-radio v-model="radio" label="1">是</el-radio>
  				<el-radio v-model="radio" label="0">否</el-radio>
			</div>
		  </div>
		  <div class="ziyuan"><span>资源标识：</span><input type="text" v-model="input4"></div>
		  <div class="ziyuan"><span>排列顺序：</span><input type="text" v-model="input5"></div>
		  
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="editBc">保存</el-button>
		  </span>
		</el-dialog>
		<el-dialog
		  title="添加资源"
		  :visible.sync="addVisible"
		  width="283px">
		  <div class="ziyuan"><span>资源名称：</span><input type="text" v-model="addName"></div>
		  <div class="ziyuan">
		  	<span>是否有范围：</span>
			<div class="radioone">
				<el-radio v-model="addRadio" label="1">是</el-radio>
  				<el-radio v-model="addRadio" label="0">否</el-radio>
			</div>
		  </div>
		  <div class="ziyuan"><span>资源标识：</span><input type="text" v-model="addBiaoshi"></div>
		  <div class="ziyuan"><span>排列顺序：</span><input type="text" v-model="addPaixu"></div>
		  
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="addOneTjBc">保存</el-button>
		  </span>
		</el-dialog>
		<el-dialog
		  title="添加资源"
		  :visible.sync="addTwoVisible"
		  width="283px">
		  <div class="ziyuan"><span>资源名称：</span><input type="text" v-model="addTName"></div>
		  <div class="ziyuan">
		  	<span>是否有范围：</span>
			<div class="radioone">
				<el-radio v-model="addTRadio" label="1">是</el-radio>
  				<el-radio v-model="addTRadio" label="0">否</el-radio>
			</div>
		  </div>
		  <div class="ziyuan"><span>资源标识：</span><input type="text" v-model="addTBiaoshi"></div>
		  <div class="ziyuan"><span>排列顺序：</span><input type="text" v-model="addTPaixu"></div>
		  
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="addTwoTjBc">保存</el-button>
		  </span>
		</el-dialog>
		<el-dialog
		  title="添加资源"
		  :visible.sync="addThreeVisible"
		  width="283px"
		  :before-close="handleClose">
		  <div class="ziyuan"><span>资源名称：</span><input type="text" v-model="addSName"></div>
		  <div class="ziyuan">
		  	<span>是否有范围：</span>
			<div class="radioone">
				<el-radio v-model="addSRadio" label="1">是</el-radio>
  				<el-radio v-model="addSRadio" label="0">否</el-radio>
			</div>
		  </div>
		  <div class="ziyuan"><span>资源标识：</span><input type="text" v-model="addSBiaoshi"></div>
		  <div class="ziyuan"><span>排列顺序：</span><input type="text" v-model="addSPaixu"></div>
		  
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="addThreeTjBc">保存</el-button>
		  </span>
		</el-dialog>
		<el-dialog
		  title="删除"
		  :visible.sync="deleteVisible"
		  width="450px">
		  <span style="display: block;">您确定删除该条记录吗？</span>
		  <div class="deleteCon">
		  	<textarea id="desctext" placeholder="请输入删除原因"></textarea>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="deleteBc">确定</el-button>
		  </span>
		</el-dialog>
    </el-row>
</template>
<script>
	import Validation from "../../../static/js/validation.js";
	import { mapState } from 'vuex';
	export default {
		name: "ResourceManagement",
		data() {
			return {
				input3: "",
				input4: "",
				input5: "",
				radio: "",
				onetj: "0",
				twotj: "0",
				addName: "",
				addRadio: "",
				addBiaoshi: "",
				addPaixu: "",
				addIndex: "",
				addTName: "",
				addTRadio: "",
				addTBiaoshi: "",
				addTPaixu: "",
				addSName: "",
				addSRadio: "",
				addSBiaoshi: "",
				addSPaixu: "",
				threeIndex: "3",
				dialogVisible: false,
				addVisible: false,
				addTwoVisible: false,
				deleteVisible: false,
				tabPosition: "left",
		        bandClass: false,
		        cindex: "-1",
		        cindex1: "-1",
      			loading: false,
      			oneParentId: "",
      			tabs2: {
			        activeName: "", //激活的名称
			        data: [] //展示的树
			    },
				table: {
			        tbody: [],
			        tfoot: [],
			        currentPage: 1,
			        totalRecord: 0
		        },
		        edit:{
		        	id:"",
					isScope:"",
					mark:"",
					name:"",
					orderIndex:"",
					parentId:"",
					zIndex:""
		        },
		        deleteBcsj:{
		        	id:"",
		        	deleteWhy:""
		        }
			}
		},
		methods: {
			addOneTj(data) {
				//添加资源
				const self = this;
			    self.addVisible = true;
			    self.oneParentId = data;
			    self.addIndex = "1";
			},
			addOneTjBc() {
				const self = this,
			    validate = new Validation();

			    validate.addRule(
			       	Validation.rules.isEmptyOrNull,
			        self.addName,
			        "请输入资源名称！"
			    );
			    validate.addRule(
			       	Validation.rules.isEmptyOrNull,
			        self.addBiaoshi,
			        "请输入资源标识！"
			    );
			    validate.addRule(
			        Validation.rules.isEmptyOrNull,
			        self.addPaixu,
			        "请输入排列顺序！"
			    );
			    const result = validate.startValidate();
		      	if (result) {
		        	self.$message.error(result);
		      	} else {
				self.axios
		      	.post(this.$store.state.api.setting.system_resources_cmssave,
		      	{
		      		id:"",
		      		isScope:self.addRadio,
		      		mark:self.addBiaoshi,
		      		name:self.addName,
					orderIndex:self.addPaixu,
					parentId:"",
					zIndex:self.addIndex
		      	}).then(function(response) {
		        	self.loading = false;
		        	const { data } = response;
		        	if (data.status.code == 200) {
			    		self.addVisible = false;
		        		self.getResources();
		        	}
		      	})
		      	.catch(function(error) {
		        	self.loading = false;
		        	self.$message.error(error);
		      	});

      			}
			},
			addTwoTj(data) {
				//添加资源
				const self = this;
			    self.addTwoVisible = true;
			    self.oneParentId = data;
			    self.addIndex = "2";
			},
			addTwoTjBc() {
				const self = this,
			    validate = new Validation();

			    validate.addRule(
			       	Validation.rules.isEmptyOrNull,
			        self.addTName,
			        "请输入资源名称！"
			    );
			    validate.addRule(
			       	Validation.rules.isEmptyOrNull,
			        self.addTBiaoshi,
			        "请输入资源标识！"
			    );
			    validate.addRule(
			        Validation.rules.isEmptyOrNull,
			        self.addTPaixu,
			        "请输入排列顺序！"
			    );
			    const result = validate.startValidate();
		      	if (result) {
		        	self.$message.error(result);
		      	} else {
				self.axios
		      	.post(this.$store.state.api.setting.system_resources_cmssave,
		      	{
		      		id:"",
		      		isScope:self.addTRadio,
		      		mark:self.addTBiaoshi,
		      		name:self.addTName,
					orderIndex:self.addTPaixu,
					parentId:self.oneParentId,
					zIndex:self.addIndex
		      	}).then(function(response) {
		        	self.loading = false;
		        	const { data } = response;
		        	if (data.status.code == 200) {
			    		self.addTwoVisible = false;
		        		self.getResources();
		        	}
		      	})
		      	.catch(function(error) {
		        	self.loading = false;
		        	alert(error);
		      	});
		      }
			},
			addThreeTjBc() {
				console.log(this.tabs2.activeName);
				// const self = this,
			 //    validate = new Validation();

			 //    validate.addRule(
			 //       	Validation.rules.isEmptyOrNull,
			 //        self.addSName,
			 //        "请输入资源名称！"
			 //    );
			 //    validate.addRule(
			 //       	Validation.rules.isEmptyOrNull,
			 //        self.addSBiaoshi,
			 //        "请输入资源标识！"
			 //    );
			 //    validate.addRule(
			 //        Validation.rules.isEmptyOrNull,
			 //        self.addSPaixu,
			 //        "请输入排列顺序！"
			 //    );
			 //    const result = validate.startValidate();
		  //     	if (result) {
		  //       	self.$message.error(result);
		  //     	} else {
				// self.axios
		  //     	.post(this.$store.state.api.setting.system_resources_cmssave,
		  //     	{
		  //     		id:"",
		  //     		isScope:self.addSRadio,
		  //     		mark:self.addSBiaoshi,
		  //     		name:self.addSName,
				// 	orderIndex:self.addSPaixu,
				// 	parentId:self.tabs2.activeName,
				// 	zIndex:self.threeIndex
		  //     	}).then(function(response) {
		  //       	self.loading = false;
		  //       	const { data } = response;
		  //       	if (data.status.code == 200) {
		  //       		self.$message.success("添加成功");
		  //       		setTimeout(function(){
			 //    			self.handleClose();
		  //       			self.getResources();
		  //       		},2000);
		  //       	}
		  //     	})
		  //     	.catch(function(error) {
		  //       	self.loading = false;
		  //       	self.$message.error(error);
		  //     	});
		  //     }
			},
			getTree(topList, list) {
		      const self = this;
		      for (var i = 0; i < topList.length; i++) {
		        //获取子级列表
		        var children = list.filter(item => topList[i].id == item.parentId);
		          //递归
	          	self.getTree(children, list);
	            topList[i].children = children;
		      }
		    },
			getResources() {
		      const self = this;
		      self.loading = true;
		      self.onetj = "1";
		      self.axios
		      .post(this.$store.state.api.setting.role_cms_resources, 
		      ).then(function(response) {
		        self.loading = false;
		        const { data } = response;
		        if (data.status.code == 200) {
		          	let { list } = data.result;
			        list = list.map(item => {
			          if (item.zIndex == 1) {
			            item.parentId = "";
			          }
			          return item;
			        });
			        const topList = list.filter(item => {
			          return item.zIndex == 1;
			        });
			        self.getTree(topList, list);
			        self.tabs2.data = topList;
			        if (topList.length > 0) {
			          self.tabs2.activeName = topList[0].id;
			        }
		        }
		      })
		      .catch(function(error) {
		        self.loading = false;
		        alert(error);
		      });
		    },
		    threeEdit(data) {
		    	console.log(data);
		    	const self = this;
		    	self.axios
			      .post(this.$store.state.api.setting.system_resources_cms, {
			      	id: data.id,
					parentId: data.parentId,
					name: data.name,
					mark: data.mark,
					isScope: data.isScope,
					zIndex: data.zIndex,
					orderIndex: data.orderIndex
			      }).then(function(response) {
			        self.loading = false;
			        const { data } = response;
			        if (data.status.code == 200) {
			          	self.dialogVisible = true;
						self.input3 = data.result.name;
						self.input4 = data.result.mark;
						self.input5 = data.result.orderIndex;
						if(data.result.isScope == 0){
							self.radio = "0";
						}
						if(data.result.isScope == 1){
							self.radio = "1";
						}
				    	self.edit.id = data.result.id;
						self.edit.isScope = self.radio;
						self.edit.mark = data.result.mark;
						self.edit.name = data.result.name;
						self.edit.orderIndex = data.result.orderIndex;
						self.edit.parentId = data.result.parentId;
						self.edit.zIndex = data.result.zIndex;
			        }
			      })
			      .catch(function(error) {
			        self.loading = false;
			        alert(error);
			      });
		    },
		    editBc(){
		    	const self = this;
		    	self.edit.isScope = self.radio;
		    	self.axios
			      .post(this.$store.state.api.setting.system_resources_cmssave, 
			      	self.edit).then(function(response) {
			        self.loading = false;
			        const { data } = response;
			        if (data.status.code == 200) {
			          	self.dialogVisible = false;
						self.getResources();
			        }
			      })
			      .catch(function(error) {
			        self.loading = false;
			        alert(error);
			      });
		    },
		    deleteBtn(id) {
		    	const self = this;
		    	self.deleteBcsj.id = id;
		    	self.deleteVisible = true;
		    },
		    deleteBc() {
		    	const self = this;
		    	var deleteWhy = document.getElementById('desctext');

		        self.deleteBcsj.deleteWhy = deleteWhy.value;
		    	self.axios
			      .post(this.$store.state.api.setting.delete_practical_by_id, 
			      self.deleteBcsj).then(function(response) {
			        self.loading = false;
			        const { data } = response;
			        if (data.status.code == 200) {
			          	self.deleteVisible = false;
						self.getResources();
			        }
			      })
			      .catch(function(error) {
			        self.loading = false;
			        alert(error);
			      });
		    },
		    handleClose() {
		    	this.$store.commit('resourceManagement/mutahidshow',false);
		    }
		},
		computed: mapState({
		    addThreeVisible: state => state.resourceManagement.hidshow
		}),
		created() {
			this.getResources();
		}
	}
</script>
<style scoped lang="scss">
	#tab_one {
		height: 600px !important;
		border: none;
	    -webkit-box-shadow: none !important;
	    box-shadow: none !important;
	}
	#tab_one /deep/ .el-tabs__header {
		background: #f2f3f5 !important;
	}
	#tab_one /deep/ .el-tabs__item:hover {
		color: #ed0536;
	}
	#tab_one /deep/ .el-tabs__item.is-active {
		color: #ed0536;
	}
	#tab_one .tjzy {
		color: #ed0536;
	}
	#tab_two {
		height: 500px !important;
		border: none;
	    -webkit-box-shadow: none !important;
	    box-shadow: none !important;
	    overflow-y:scroll;
	}
	#tab_two /deep/ .el-tabs__header {
		background: #f2f6f7 !important;
		width: 140px !important;
	}
	#tab_two /deep/ .el-tabs__item:hover{
		color: #ed0536;
	}
	#tab_two /deep/ .el-tabs__item.is-active {
		color: #ed0536;
		background: #dcdfe6;
	}
	#tab_two /deep/ .el-tabs__content {
		padding: 0;
	}
	/deep/ .el-tabs--left .el-tabs__item {
    	text-align: left !important;
	}
	/deep/ .el-tabs__nav {
		white-space:normal !important;
	}
	/deep/ .el-row{
		width: 100%;
		float: left;    
		padding: 20px;
    	background: #f2f6f7;
    	height: 100%
	}
	/deep/ .is-leaf{
    	background: #f2f6f7;
    	text-align: center;
	}
	/deep/ .is-leaf .cell{
    	color: #000;
    	font-size: 14px;
	}
	/deep/ .el-tabs--border-card{
		height: 400px !important;
	}
	/deep/ .el-table__row{
		text-align: center;
	}
	/deep/ .el-dialog__body{
		padding: 10px 20px;
	}
	/deep/ .el-button--primary {
	    color: #fff;
	    background-color: #ed0536;
	    border-color: #ed0536;
	}
	/deep/ .el-icon-edit.oneedit{
		position: absolute;
		top: 15px;
		right: 3px;
		display: none;
	}
	/deep/ .el-icon-edit.twoedit{
		position: absolute;
		top: 15px;
		right: 20px;
		display: none;
	}
	/deep/ .el-tabs__item:hover>.oneTit>.el-icon-edit.oneedit{
		display: block;
	}
	/deep/ .el-tabs__item:hover>.twoTit>.el-icon-edit.twoedit{
		display: block;
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
	.deleteCon {
	    width: 100%;
	    height: auto;
	    overflow: hidden;
	}
	.deleteCon textarea {
	    width: 395px;
	    min-height: 110px;
	    padding: 0 5px;
	    margin-top: 10px;
	    line-height: 30px;
	    font-size: 14px;
	    text-indent: 1em;
	    border: 1px solid #e6e6e6;
	    border-radius: 2px;
	    vertical-align: top;
	    display: inline-block;
	    overflow: hidden;
	    resize: vertical;
	}
/deep/ .el-table--striped .el-table__body tr.el-table__row--striped:hover td {
  background: #ecf5ff;
}
</style>