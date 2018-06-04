<template>
<el-main class="mainPad" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.3)">
    <el-row class="noMarginLeft noMarginRight search" :gutter="20">
      <el-col :span="23" class="noPaddingRight noPaddingLeft" style="width:95.5%;">
        <el-input id="Uname" placeholder="角色名称" style="width: 100%;"></el-input>
      </el-col>
      <el-col :span="1" class="noPadding">
        <el-button class="btnC" @click="searchBtn" type="danger"style="width: auto; padding: 12px;">搜索</el-button>
      </el-col>
    </el-row>
    <el-row class="noMargin search noPaddingBottom">
      <el-col :span="24" style="overflow-y: auto;height: 400px;">
        <el-table :data="table.tbody" stripe border>
          <el-table-column 
            prop="name"
            label="角色名称">
          </el-table-column>
          <el-table-column 
            prop="ct"
            label="创建时间">
          </el-table-column>
          <el-table-column 
            prop="et"
            label="修改时间">
          </el-table-column>
          <el-table-column 
            prop="desc"
            label="描述">
          </el-table-column>
          <el-table-column
            fixed="right"
            prop="handle"
            label="操作"
            min-width="100">
             <template slot-scope="scope">
              <el-button type="text" size="small" @click="openAuthorityDialog(scope.row.id)">修改权限</el-button>
              <el-button type="text" size="small" @click="bianji(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="delete_Tan(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="noMargin search">
      
    </el-row>
    <el-dialog
      title="修改权限"
      width="80%"
      :visible="dialog.authority"
      v-loading="loadingdia"
      :before-close="closeAuthorityDialog">
      <el-row element-loading-background="rgba(0, 0, 0, 0)">
        <el-col :span="24">
          <el-tabs id="tab_one" v-model="tabs2.activeName" type="border-card">
            <el-tab-pane v-for="(item,index) of tabs2.data" :key="item.id" :label="item.name" :name="item.id">
                <el-row v-for="(item2,index2) of item.children" :key="item2.id" :gutter="40">
                    <el-col :span="4" style="border-right:1px dashed #ccc;">
                      <el-checkbox :indeterminate="item2.indeterminate" v-model="item2.isCheck" @change="checkboxAllChange(index,index2)">{{item2.name}}</el-checkbox>
                    </el-col>
                    <el-col :span="20">
                      <el-checkbox-group v-model="item2.isCheckData" @change="checkboxChange(index,index2)">
                          <el-checkbox class="threeCheck" v-for="item3 of item2.children" :key="item3.id" :label="item3.id">{{item3.name}}</el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                  </el-row>
              </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <button class="parmary" style="border-radius:4px;" @click="saveAuthority">保存</button>
      <!-- <template slot="footer">
        <el-button type="primary" style="width:auto;border-radius:4px;" @click="saveAuthority">保存</el-button>
      </template> -->
    </el-dialog>

    <editAndModification :tabs="tabs" ref="editAndModification"></editAndModification>
    <deleteBtn ref="deleteBtn" :deletes="tabsl"></deleteBtn>
  </el-main>
</template>

<script>
  import editAndModification from "@/components/public/popUp/EditAndModification.vue"; //编辑公寓角色
  import deleteBtn from "@/components/public/popUp/DeleteBtn.vue"; //删除公寓角色
export default {
  name: "CMSRoleManagement",
  data() {
    var self = this
    return {
      loading: false,
      loadingdia: false,
      dialog: {
        authority: false, //修改权限
        authority_msg: {
          id: ""
        }
      },
      tabs: [
        {
          tit: "编辑CMS角色",
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
              color: "",
              click: (function (argument) {
                  this.bianjiBc()
                }).bind(self)
            }
          ]
        } 
      ],
      tabs2: {
        activeName: "", //激活的名称
        data: [] //展示的树
      },
      //筛选的过滤信息
      screening: {
        areaValue: "", //城市/区域
        area: [] //城市/区域
      },
      tabsl: [
        {
          tit: "删除",
          title: "确定要删除这条消息吗？",
          buttons: [
            {
              name: "确定",
              color: "",
              click: (function (argument) {
                  this.delete_Role()
                }).bind(self)
            }
          ]
        }
      ],

      //表格信息
      table: {
        thead: [
          {
            prop: "name",
            label: "角色名称"
          },
          {
            prop: "ct",
            label: "创建时间"
          },
          {
            prop: "et",
            label: "修改时间"
          },
          {
            prop: "desc",
            label: "描述"
          }
        ],
        tbody: [
              
              // {
              //   UserRole: "王云峰3",
              //   CreationTime:"2017-01-01",
              //   ModificationTime:"2017-12-20",
              //   Describe:"管理员3"
              // }
        ],
        tfoot: [],
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      },
      edit: {//编辑参数保存对象
        UsId: "",
        UsName: "",
        UsDesc: ""
      },
      deleteId: "",
      bcid: ""
    };
  },
  methods: {
    closeAuthorityDialog() {
      this.dialog.authority = false;
    },
    //2级全选
    checkboxAllChange(index, index2) {
      const data = this.tabs2.data[index].children[index2];
      data.indeterminate = false;
      if (data.isCheck) {
        if (data.children) {
          data.isCheckData = data.children.map(item => {
            return item.id;
          });
        }
      } else {
        data.isCheckData = [];
      }
    },
    //3级选择
    checkboxChange(index, index2) {
      const data = this.tabs2.data[index].children[index2];
      if (data.isCheckData.length == data.children.length) {
        data.indeterminate = false;
        data.isCheck = true;
      } else if (data.isCheckData.length == 0) {
        data.indeterminate = false;
        data.isCheck = false;
      } else {
        data.indeterminate = true;
      }
    },
    //保存权限
    saveAuthority() {
      const self = this;
      self.loadingdia = true;
      //数据拼接
      let oneResourcesId = "";
      let resourcesList = [];
      const choiceData = self.tabs2.data.filter(
        item => item.id == self.tabs2.activeName
      )[0];
      oneResourcesId = choiceData.id;

      const addList = function(obj) {
        if (obj.zIndex == 1) {
          resourcesList.push({
            id: obj.id,
            scope: 0
          });
        } else if (obj.zIndex == 2) {
          if (obj.isCheck || obj.indeterminate) {
            resourcesList.push({
              id: obj.id,
              scope: 0
            });
            obj.isCheckData.forEach(item => {
              resourcesList.push({
                id: item,
                scope: 0
              });
            });
          }
        }
        if (obj.children) {
          obj.children.forEach(item => addList(item));
        }
      };
      addList(choiceData);
      self
        .axios({
          method: "post",
          url: self.$store.state.api.setting.batch_save,
          data: {
            // gcid: "0100099",
            // userid: "ab0f10cd02094f7b9b82b82088742557",
            // token: "e40f0b86-2ed6-4b62-8571-e63e1f23bbd3",
            params: {
              roleId: self.dialog.authority_msg.id,
              oneResourcesId: oneResourcesId,
              resourcesList: resourcesList
            }
          }
        })
        .then(response => {
          const { data } = response;
          self.loadingdia = false;
          if (data.status.code == 200) {
            self.$alert("操作成功", "提示", {
              callback: action => {
                self.dialog.authority = false;
              }
            });
          }
        })
        .catch(error => {

        });
    },
    //打开修改权限弹出框
    async openAuthorityDialog(id) {
      const self = this;
      self.loadingdia = true;
      self.dialog.authority_msg.id = id;
      self.dialog.authority = true;
      const { data } = await self.getResources(id);
      if (data.status.code == 200) {
        self.loadingdia = false;
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
    },
    //获取资源列表
    getResources(id) {
      const self = this;
      return self.axios({
        method: "post",
        url: self.$store.state.api.setting.role_cms_resources,
        data: {
          roleId:id
        }
      });
    },
    getTree(topList, list) {
      const self = this;
      for (var i = 0; i < topList.length; i++) {
        //获取子级列表
        var children = list.filter(item => topList[i].id == item.parentId);
        if (children.length > 0) {
          children = children.map(item => {
            item.isCheck = item.isChecked == 0 ? false : true;
            item.isCheckData = [];
            item.indeterminate = false;
            return item;
          });
          //递归
          self.getTree(children, list);
          //var result = 
          //if (result) {
            topList[i].children = children;
            topList[i].isCheckData = children
              .filter(item => item.isChecked != 0)
              .map(item => {
                return item.id;
              });
            if (topList[i].children.length == topList[i].isCheckData.length) {
              topList[i].isCheck = true;
              topList[i].indeterminate = false;
            } else if (topList[i].isCheckData.length > 0) {
              topList[i].isCheck = false;
              topList[i].indeterminate = true;
            } else {
              topList[i].isCheck = false;
              topList[i].indeterminate = false;
            }
          //}
        } else {
          return true;
        }
      }
    },
    searchBtn() {
      const self = this;
      self.loading = true;
      var name = document.getElementById('Uname');
      self.axios
      .post(this.$store.state.api.setting.cms_user, {
        roleLikeName: name.value,
        pageNo: "",
        totalPage: "",
        pageSize: "",
        totalRecord: ""
      })
      .then(function(response) {
        self.loading = false;
        const { data } = response;
        if (data.status.code == 200) {
          self.table.tbody = data.result.list;
        }
      })
      .catch(function(error) {
        self.loading = false;
        alert(error);
      });
    },
    delete_Tan(id){
      this.$refs.deleteBtn.showFn();
      this.deleteId = id;
    },
    delete_Role() {
      // cms角色删除按钮
      var self = this;
      var dete = document.getElementById("dedc");
      self.axios
      .post(this.$store.state.api.setting.delete_role, {
        id: this.deleteId,
        desc: dete.value
      })
      .then(function(response) {
        self.loading = false;
        const { data } = response;
        if (data.status.code == 200) {
          self.$message.success("删除成功");
        }
        if(self.$message.success("删除成功")){
          setTimeout(function(){
            self.$refs.deleteBtn.closeFn();
            self.queryList();
          },2000)
        }
      })
      .catch(function(error) {
        self.loading = false;
        self.$message.error(error);
      });
    },
    bianji(data) {
      // cms角色编辑按钮
      var self = this;
      self.loading = true;
      self.bcid = data.id;
      self.axios
      .post(this.$store.state.api.setting.role_cms, {
        id: data.id,
        name: data.UserRole,
        desc: data.Describe
      })
      .then(function(response) {
        self.loading = false;
        const { data } = response;
        if (data.status.code == 200) {
          self.edit.UsId = data.result.id;
          self.$refs.editAndModification.showFn();
          self.tabs.forEach(ele => {
            ele.inputs.value = data.result.name; 
            ele.inputs.value2 = data.result.desc; 
          })
        }
      })
      .catch(function(error) {
        self.loading = false;
        alert(error);
      });
    },
    bianjiBc() {
      var self = this;
      // cms角色编辑保存
      this.tabs.forEach(ele => {
        self.edit.UsName = ele.inputs.value;
        self.edit.UsDesc = ele.inputs.value2;
      })
      var bc = {
        id: self.bcid,
        gcid: "",
        name: self.edit.UsName,
        desc: self.edit.UsDesc
      }
      self.axios
      .post(this.$store.state.api.setting.role_cms_bc, bc)
      .then(function(response) {
        self.loading = false;
        const { data } = response;
        if (data.status.code == 200) {
          self.$message.success("编辑成功");
        }
        if(self.$message.success("编辑成功")){
          setTimeout(function(){
            self.$refs.editAndModification.closeFn();
            self.queryList();
          },2000)
        }
      })
      .catch(function(error) {
        self.loading = false;
        self.$message.error(error);
      });
    },
    queryList() {
      const self = this;
      self.loading = true;
      self.axios
        .post(this.$store.state.api.setting.role_list, {
          id:""
        })
        .then(function(response) {
          self.loading = false;
          const { data } = response;
          if (data.status.code == 200) {
            self.table.tbody = data.result.list;
          }
        })
        .catch(function(error) {
          self.loading = false;
          alert(error);
        });
    }
  },
  components: {
    deleteBtn,
    editAndModification
  },
  created () {
    const self = this;
    self.queryList();
  }
};
</script>

<style scoped lang="scss">
.mainPad{
  padding: 0px !important;
}
.el-row {
  margin-bottom: 20px;
}
.el-row.no-margin-bottom {
  margin-bottom: 0px;
}
.el-row.search {
  background: #fff;
  padding: 20px;
}
.el-button--danger {
  width: 100%;
  background-color: #ed0536;
  border-color: #ed0536;
  border-radius: 0px;
}
/deep/ .el-input__inner {
  border-radius: 0px;
}
/deep/ .el-button--danger span {
  font-size: 14px;
}
/deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #f7f9fc;
}
/deep/ .el-table th > .cell {
  font-size: 14px;
}
/deep/ .el-table thead tr {
  background: #f2f4f7;
  color: #2e3445;
}
/deep/ .el-pagination {
  padding: 0px;
  text-align: right;
}
/deep/ .el-pagination.is-background .el-pager li.active {
  background-color: #ed0536;
}
/deep/ .el-pagination.is-background .el-pager li:hover {
  color: #ed0536;
}
/deep/ .el-button{
  color: #ed0536;
}
.btnC{
  color: #fff;
}

.threeCheck{
  margin: 0px;
  width: 170px;
}
/deep/ .el-dialog__header{
  border-bottom: solid 1px #f2f6f7;
}
/deep/ .el-dialog__header .el-dialog__title{
  color: #f24468;
}
/deep/ .el-dialog{
  margin-top: 50px !important;
}
/deep/ .el-dialog__body{
  background: #f2f3f5;
  padding: 0px 20px;
  min-height: 480px;
  position: relative;
  padding-bottom: 1px;
}
/deep/ .el-checkbox__label{
  color: #404040 !important;
}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #ef244f !important;
    border-color: #ef244f !important;
}
/deep/ .el-checkbox__inner {
    background-color: #fff !important;
    border-color: #ef244f !important;
}
/deep/ .el-tabs__nav .is-active{
    color: #ef244f !important;
}
/deep/ .el-tabs--border-card>.el-tabs__content{
    padding: 15px;
    height: 450px !important;
    overflow-y: scroll !important;
    border: none !important;
}
/deep/ .el-tabs--border-card{
    border: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
}
/deep/ .el-tabs__nav .el-tabs__item:hover{
    color: #ef244f !important;
}
/deep/ .el-tabs__active-bar{
    position: absolute;
    top: 0 !important;
    left: 0;
    height: 2px;
    background-color: #ef244f;
    z-index: 1;
}
/deep/ .el-button--primary{
    background: #ed0536;
    color: #fff;
    border-color: #ed0536;
}
.parmary {
    background: #ed0536;
    color: #fff;
    border-color: #ed0536;
    position: absolute;
    bottom: 40px;
    right: 60px;
    width: 80px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    outline: none;
    border: none;
}
#tab_one {
    border: none;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
}
/deep/ .el-tabs__nav {
    white-space:normal !important;
}
/deep/ .el-table--striped .el-table__body tr.el-table__row--striped:hover td {
  background: #ecf5ff;
}
</style>