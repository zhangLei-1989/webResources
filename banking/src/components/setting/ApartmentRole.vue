<template>
  <el-main v-loading="loading.all" element-loading-background="rgba(0, 0, 0, 0)">
    <el-row class="search">
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline" style="display:flex;" @submit.native.prevent>
          <el-form-item class="noMarginRight noMarginBottom" style="flex:1;">
            <el-input v-model="seachForm.departmenLikeName" placeholder="部门名称"></el-input>
          </el-form-item>
          <el-form-item class="noMarginRight noMarginBottom">
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="search noMargin" :gutter="20">
      <el-col :span="4" class="noPaddingLeft">
        <el-tree :data="form.departList" style="background:#f2f6f7;"></el-tree>
      </el-col>
      <el-col :span="20" class="noPaddingRight">
        <el-table
          :data="table.tbody"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="parentName"
            label="所属部门">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型">
           <template slot-scope="scope">
             <span v-if="scope.row.type==0">总部</span>
             <span v-if="scope.row.type==10">本区</span>
             <span v-if="scope.row.type==20">本店</span>
             <span v-if="scope.row.type==30">本部</span>
             <span v-if="scope.row.type==40">本组</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="showIndex"
            label="顺序">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" v-show="isButtonAuthor('f599048682f04737bbb9796b6059d38d')" @click="edit(scope.row.id)">编辑</el-button>
              <el-button type="text" v-show="isButtonAuthor('fc6ce63ac3ea4fba92502f0f33950def')" @click="openDeleteDialog(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!--添加 or 修改部门-->
    <el-dialog
      title="添加部门"
      :visible="addDialogActive"
      width="50%"
      :before-close="closeDialog"
      >
      <el-row v-loading="loading.submit" element-loading-background="rgba(0, 0, 0, 0)">
        <el-col :span="24">
          <el-form ref="ruleForm" label-width="110px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="部门名称：" class="noMargin" required>
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属部门：" class="noMargin" required>
                  <el-cascader :options="form.departList" change-on-select style="width: 100%" v-model="form.parent"></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="显示顺序：" required>
              <el-input v-model.number="form.showIndex"></el-input>
            </el-form-item>
            <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item class="noMargin noLabel">
                <el-select style="width: 100%" v-model="form.typeId">
                  <el-option label="总部" value="0"></el-option>
                  <el-option label="本区" value="10"></el-option>
                  <el-option label="本店" value="20"></el-option>
                  <el-option label="本部" value="30"></el-option>
                  <el-option label="本组" value="40"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="部门电话：" class="noMargin">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item class="noMargin noLabel">
                <el-select placeholder="城市" filterable style="width: 100%" v-loading="loading.city" element-loading-background="rgba(0, 0, 0, 0)" v-model="form.cityId" @change="cityChange">
                  <el-option v-for="item of form.cityList" :key="item.id" :label="item.name?item.name:item.cityName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="noMargin noLabel">
                <el-select placeholder="区域" filterable style="width: 100%" v-loading="loading.town" element-loading-background="rgba(0, 0, 0, 0)" v-model="form.townId" @change="townChange">
                  <el-option v-for="item of form.townList" :key="item.id" :label="item.name?item.name:item.cityName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="noMargin noLabel">
                <el-select placeholder="商圈" style="width: 100%" v-loading="loading.district" element-loading-background="rgba(0, 0, 0, 0)" v-model="form.districtId">
                  <el-option v-for="item of form.districtList" :key="item.id" :label="item.name?item.name:item.cityName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="部门地址：">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="部门描述：">
            <el-input v-model="form.desc"></el-input>
          </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <template slot="footer">
        <el-button type="primary" style="width:auto;border-radius:4px;" @click="save">保存</el-button>
      </template>
    </el-dialog>
    <!--删除部门-->
    <el-dialog
      title="删除"
      width="30%"
      :visible="dialog.deleted"
      :before-close="closeDeleteDialog">
      <el-row v-loading="loading.deleted" element-loading-background="rgba(0, 0, 0, 0)">
        <el-col :span="24">
          <p class="error-success">您确定删除该条记录吗？</p>
          <el-input type="textarea" placeholder="请输入删除原因" v-model="dialog.deleted_msg.deleteWhy"></el-input>
        </el-col>
      </el-row>
      <template slot="footer">
        <el-button type="primary" style="width:auto;border-radius:4px;" @click="deleted">确定</el-button>
      </template>
    </el-dialog>
  </el-main>
</template>

<script>
import tool from "../../../static/js/tool.js";
import validation from "../../../static/js/validation.js";
import { mapState } from "vuex";
export default {
  name: "apartmentRole",
  data() {
    return {
      //弹出框信息
      dialog: {
        deleted: false, //删除弹出框
        deleted_msg: {
          id: "", //部门id
          deleteWhy: "" //删除部门原因
        }
      },

      //loading信息
      loading: {
        all: true, //整页的loading
        city: true, //城市下拉框的loading
        town: true, //区县下拉框的loading
        district: true, //商圈下拉框的loading
        deleted: false, //删除的loading
        submit: false //提交的loading
      },

      //表单信息
      form: {
        id: "",
        name: "", //部门名称
        desc: "", //部门描述
        showIndex: "", //部门顺序
        address: "", //部门地址
        typeId: "0", //部门类型Id
        parent: [], //父级部门id
        phone: "", //电话
        departList: [], //部门列表数据
        cityId: "", //城市id
        townId: "", //区县id
        districtId: "", //商圈id
        cityList: [], //城市列表数据
        townList: [], //区县列表数据
        districtList: [] //商圈列表数据
      },

      //搜索的信息
      seachForm: {
        departmenLikeName: "" //部门名称
      },

      //表格信息
      table: {
        tbody: [], //表格数据
        currentPage: 1, //当前页
        pageSize: 10, //每页条数
        totalRecord: 0 //总条数
      }
    };
  },
  computed: mapState({
    addDialogActive: state => state.apartmentRole.departmentDialogActive
  }),
  methods: {
    //搜索
    async search() {
      const self = this;
      self.loading.all = true;
      const { data } = await self.getDepartmentList();
      if (data.status.code == 200) {
        self.table.tbody = data.result.list;
      }
      self.loading.all = false;
    },

    //关闭，新增 or 修改弹出框
    closeDialog() {
      this.resetForm();
      this.$store.commit("apartmentRole/toogleDepartmentDialogActive", false);
    },

    //打开删除弹出框
    openDeleteDialog(id) {
      this.dialog.deleted_msg.id = id;
      this.dialog.deleted = true;
    },

    //打开删除弹出框
    closeDeleteDialog() {
      this.dialog.deleted = false;
    },

    //重置表单
    resetForm() {
      const self = this;
      self.form.id = "";
      self.form.name = "";
      self.form.desc = "";
      self.form.showIndex = "";
      self.form.address = "";
      self.form.typeId = "";
      self.form.parent = [];
      self.form.phone = "";
      //self.form.departList = [];
      self.form.cityId = "";
      self.form.townId = "";
      self.form.districtId = "";
      //self.form.cityList = [];
      //self.form.townList = [];
      //self.form.districtList = [];
    },

    //城市选择切换
    cityChange(cityId) {
      this.getCityTownDistrict(cityId);
    },

    //区县选择切换
    async townChange(townId) {
      const self = this;
      self.loading.district = true;
      const { data: districtData } = await self.getDistrictList(townId);
      self.loading.district = false;
      //判断商圈是否查询成功
      if (districtData.status.code == 200) {
        const districtId =
          districtData.result.list.length > 0
            ? districtData.result.list[0].id
            : "";
        self.form.districtList = districtData.result.list; //给商圈列表赋值
        self.form.districtId = districtId;
      }
    },

    //编辑
    async edit(id) {
      const self = this;
      self.loading.submit = true;
      self.$store.commit("apartmentRole/toogleDepartmentDialogActive", true);

      const { data: departmentData } = await self.axios({
        method: "post",
        url: self.$store.state.api.setting.department.getList,
        data: {
          gcid: "0100099",
          userid: "ab0f10cd02094f7b9b82b82088742557",
          token: "e40f0b86-2ed6-4b62-8571-e63e1f23bbd3",
          params: {
            id: id
          }
        }
      });
      if (departmentData.status.code == 200) {
        const depart = departmentData.result.list[0];
        if (depart) {
          self.form.id = depart.id;
          self.form.name = depart.name;
          self.form.desc = depart.desc;
          self.form.showIndex = depart.showIndex;
          self.form.address = depart.address;
          self.form.typeId = depart.type;
          self.form.parent = [depart.parent];
          self.form.phone = depart.phone;
          self.form.cityId = depart.cityId;
          self.form.townId = depart.townId;
          self.form.districtId = depart.districtId;

          if (depart.cityId) {
            const { data: townData } = await self.getTownList(depart.cityId);
            if (townData.status.code == 200) {
              self.form.townList = townData.result.list; //给区县列表赋值

              if (depart.townId) {
                const { data: districtData } = await self.getDistrictList(
                  depart.townId
                );
                if (districtData.status.code == 200) {
                  self.form.districtList = districtData.result.list; //给商圈列表赋值
                }
              }
            }
          }
        }
      }
      self.loading.submit = false;
    },

    //保存部门
    save() {
      const self = this;

      const validate = new validation();
      validate.addRule(
        validation.rules.isEmptyOrNull,
        self.form.name,
        "部门名称不能为空！"
      );
      validate.addRule(
        validation.rules.isEmptyOrNull,
        self.form.parent.toString(),
        "请选择所属部门！"
      );
      validate.addRule(
        validation.rules.isEmptyOrNull,
        self.form.showIndex,
        "显示顺序不能为空！"
      );
      const result = validate.startValidate();
      if (result) {
        self.$message.error(result);
      } else {
        if (!self.loading.submit) {
          self.loading.submit = true;
          self
            .axios({
              method: "post",
              url: self.$store.state.api.setting.department.save,
              data: {
                gcid: "0100099",
                userid: "ab0f10cd02094f7b9b82b82088742557",
                token: "e40f0b86-2ed6-4b62-8571-e63e1f23bbd3",
                params: {
                  id: self.form.id,
                  name: self.form.name,
                  parent: self.form.parent[self.form.parent.length - 1],
                  showIndex: self.form.showIndex,
                  type: self.form.typeId,
                  phone: self.form.phone,
                  cityId: self.form.cityId,
                  townId: self.form.townId,
                  districtId: self.form.districtId,
                  address: self.form.address,
                  desc: self.form.desc
                }
              }
            })
            .then(response => {
              self.loading.submit = false;
              const { data } = response;
              if (data.status.code == 200) {
                self.$alert("操作成功", "提示", {
                  callback: action => {
                    self.init();
                    self.closeDialog();
                  }
                });
              }
            })
            .catch(error => {
              self.loading.submit = false;
            });
        }
      }
    },

    //删除
    deleted() {
      const self = this;
      if (self.dialog.deleted_msg.id && !self.loading.deleted) {
        self.loading.deleted = true;
        self
          .axios({
            method: "post",
            url: self.$store.state.api.setting.department.deleteById,
            data: {
              gcid: "0100099",
              userid: "ab0f10cd02094f7b9b82b82088742557",
              token: "e40f0b86-2ed6-4b62-8571-e63e1f23bbd3",
              id: self.dialog.deleted_msg.id,
              deleteWhy: self.dialog.deleted_msg.deleteWhy
            }
          })
          .then(response => {
            self.loading.deleted = false;
            const { data } = response;
            if (data.status.code == 200) {
              self.$alert("操作成功", "提示", {
                callback: action => {
                  self.init();
                  self.closeDeleteDialog();
                }
              });
            }
          })
          .catch(error => {
            self.loading.deleted = false;
          });
      }
    },

    //获取部门列表
    getDepartmentList() {
      const self = this;
      return self.axios({
        method: "post",
        url: self.$store.state.api.setting.department.getList,
        data: {
          gcid: "0100099",
          userid: "ab0f10cd02094f7b9b82b82088742557",
          token: "e40f0b86-2ed6-4b62-8571-e63e1f23bbd3",
          departmenLikeName: self.seachForm.departmenLikeName
        }
      });
    },

    //获取城市列表
    getCityList() {
      const self = this;
      return self.axios({
        method: "post",
        url: self.$store.state.api.setting.location.cityGetList,
        data: {
          gcid: "0100099",
          userid: "ab0f10cd02094f7b9b82b82088742557",
          token: "e40f0b86-2ed6-4b62-8571-e63e1f23bbd3"
        }
      });
    },

    //获取区县列表
    getTownList(cityId) {
      const self = this;
      return self.axios({
        method: "post",
        url: self.$store.state.api.setting.location.townGetList,
        data: {
          gcid: "0100099",
          userid: "ab0f10cd02094f7b9b82b82088742557",
          token: "e40f0b86-2ed6-4b62-8571-e63e1f23bbd3",
          params: {
            cityId: cityId
          }
        }
      });
    },

    //获取商圈列表
    getDistrictList(townId) {
      const self = this;
      return self.axios({
        method: "post",
        url: self.$store.state.api.setting.location.districtGetList,
        data: {
          gcid: "0100099",
          userid: "ab0f10cd02094f7b9b82b82088742557",
          token: "e40f0b86-2ed6-4b62-8571-e63e1f23bbd3",
          params: {
            townId: townId
          }
        }
      });
    },

    //获取默认的  城市/区县/商圈
    async getCityTownDistrict(cityId) {
      const self = this;
      let cityData = null;
      self.loading.town = true;
      self.loading.district = true;
      if (!cityId) {
        cityId = "d94bba14-dec1-11e5-bcc3-00163e1c066c"; //默认查询北京市
        self.loading.city = true;
        cityData = (await self.getCityList()).data;
        self.loading.city = false;
        //判断城市是否查询成功
        if (cityData.status.code == 200) {
          self.form.cityList = cityData.result.list; //给城市列表赋值
          self.form.cityId = cityId;
        } else {
          return;
        }
      }
      const { data: townData } = await self.getTownList(cityId);
      self.loading.town = false;
      //判断区县是否查询成功
      if (townData.status.code == 200) {
        const townId =
          townData.result.list.length > 0 ? townData.result.list[0].id : "";
        self.form.townList = townData.result.list; //给区县列表赋值
        self.form.townId = townId;
        if (townId) {
          const { data: districtData } = await self.getDistrictList(townId);
          self.loading.district = false;
          //判断商圈是否查询成功
          if (districtData.status.code == 200) {
            const districtId =
              districtData.result.list.length > 0
                ? districtData.result.list[0].id
                : "";
            self.form.districtList = districtData.result.list; //给商圈列表赋值
            self.form.districtId = districtId;
          }
        } else {
          //如果没有区县列表，那就清空商圈列表
          self.loading.district = false;
          self.form.districtList = [];
          self.form.districtId = "";
        }
      }
    },

    //将部门的列表数据拼接为tree型数据
    getTree(topList, list) {
      const self = this;
      for (var i = 0; i < topList.length; i++) {
        //获取子级列表
        var children = list.filter(item => topList[i].id == item.parent);
        if (children.length > 0) {
          children = children.map(item => {
            return {
              id: item.id,
              value: item.id,
              label: item.name
            };
          });
          //递归
          var result = self.getTree(children, list);
          if (result) {
            topList[i].children = children;
          }
        } else {
          return true;
        }
      }
    },

    //页面初始化
    init() {
      var self = this;
      self.loading.all = true;
      self.axios
        .all([self.getDepartmentList(), self.getCityTownDistrict()])
        .then(
          self.axios.spread(response => {
            self.loading.all = false;
            const { data: department } = response;
            if (department.status.code == 200) {
              //动态拼接树形结构，同时寻找tree的顶层
              const { list } = department.result;
              self.table.tbody = list;
              const topList = list.filter(item => !item.parent).map(item => {
                return {
                  id: item.id,
                  value: item.id,
                  label: item.name
                };
              });
              self.getTree(topList, list);
              self.form.departList = topList;
            }
          })
        );
    },

    /**-----判断按钮是否有权限----- */
    isButtonAuthor(id) {
      const self = this;
      const userInfo = tool.session.get("userInfo");
      if (!userInfo) {
        self.$router.replace("/login");
      } else {
        const systemResourcesList = userInfo.systemResourcesList;
        if (systemResourcesList) {
          const authorization = systemResourcesList;
          const author = authorization.filter(
            item => item.zIndex == 3 && item.id == id
          );
          if (author.length > 0) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
  },
  created() {
    this.init();
  }
};
</script>

<style scoped>
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
.el-button--primary {
  width: 100%;
  background-color: #188ff0;
  border-color: #188ff0;
  border-radius: 0px;
}
/deep/ .el-textarea__inner {
  padding: 10px 15px;
  min-height: 100px !important;
}
/deep/ .el-input__inner {
  border-radius: 0px;
}
/deep/ .el-button--primary span {
  font-size: 14px;
}
/deep/ .el-table tr {
  background: #f7f7f7;
}
/deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #ffffff;
}
/deep/ .el-table th > .cell {
  font-size: 14px;
}
/deep/ .el-table thead tr {
  background-color: #ffffff;
  color: #2e3445;
}
/deep/ .el-pagination {
  padding: 0px;
  text-align: right;
}
/deep/ .el-pagination.is-background .el-pager li.active {
  background-color: #188ff0;
}
/deep/ .el-pagination.is-background .el-pager li:hover {
  color: #188ff0;
}
/deep/ .el-form-item {
  margin: 0px;
  border: 1px solid #dcdfe6;
  margin-bottom: 20px;
}
/deep/ .el-form-item .el-input__inner {
  border: 0px;
}
/deep/ .noMarginRight > .el-form-item__content {
  width: 100%;
}
/deep/ .el-form--inline .el-form-item {
  margin-right: 10px;
}
/deep/ .el-form--inline .el-form-item__label {
  padding-left: 12px;
  padding-right: 0px;
}
/deep/ .el-form--label-left .el-form-item__label {
  padding-left: 12px;
  padding-right: 12px;
}

/deep/ .noLabel .el-form-item__content {
  margin-left: 0px !important;
}

/deep/ .el-date-editor .el-range-input {
  width: 60px;
}
/deep/ .el-date-editor .el-range-separator {
  width: 30px;
}
/deep/ .el-dialog__header {
  border-bottom: 1px solid #f2f6f7;
}
/deep/ .el-dialog__title {
  color: #188ff0;
}
/deep/ .el-dialog__headerbtn .el-dialog__close {
  font-size: 14px;
  color: #188ff0;
}
.el-input.is-disabled {
  position: relative;
}
.el-input.is-disabled::before {
  position: absolute;
  left: 0px;
  top: 0px;
  content: "＊";
  color: #f2082e;
}
/deep/ .required {
  position: relative;
}
/deep/ .required::before {
  position: absolute;
  left: 0px;
  top: 0px;
  content: "＊";
  color: #f2082e;
  z-index: 999999;
}
/deep/ .el-cascader::before {
  line-height: normal;
}
/deep/ .el-table {
  min-height: calc(100vh - 245px);
}
/deep/ .el-dialog__headerbtn .el-dialog__close {
  font-size: 24px;
}
.finance-state {
  display: inline-block;
  color: #fff;
  width: 70px;
  padding-right: 10px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: url(../../../static/image/icon_state_blue.png) left top no-repeat;
  background-size: 70px 30px;
}
.title {
  color: #188ff0;
  padding-left: 20px;
  position: relative;
  height: 20px;
  line-height: 20px;
  margin-bottom: 20px;
  font-weight: normal;
  font-size: 14px;
}
.title::before {
  content: "";
  display: block;
  width: 3px;
  height: 18px;
  background-color: #188ff0;
  position: absolute;
  top: 1px;
  left: 0px;
}
.title.no-mark {
  padding-left: 0px;
}
.title.no-mark::before {
  content: none;
}
.detail-title {
  font-size: 14px;
  color: #000;
  margin-right: 20px;
}
.detail-item {
  font-size: 12px;
  color: #777;
}
.detail-item.red {
  color: #f2082e;
}
.error-message {
  font-size: 14px;
  color: #f2082e;
  margin-bottom: 10px;
}
.error-success {
  font-size: 14px;
  color: #188ff0;
  margin-bottom: 10px;
}
</style>
