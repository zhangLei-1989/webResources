<template>
<el-main class="mainPad" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.3)">
    <el-row class="noMarginLeft noMarginRight search" :gutter="20">
      <el-col :span="3" class="noPaddingLeft">
        <el-select v-model="screening.areaValue" clearable placeholder="状态" style="width:100%;">
          <el-option
            v-for="item in screening.state"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3" class="noPaddingLeft">
        <el-select v-model="screening.areaValue1" clearable placeholder="角色" style="width:100%;">
          <el-option
            v-for="item in screening.area"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="17" class="noPaddingRight noPaddingLeft" style="width:70.5%;">
        <el-select
          v-model="nchdLikeName"
          @change="changeLikeName"
          @remove-tag = "deleteLikeName"
          class="inline-input"
          multiple
          filterable
          remote
          :remote-method="remoteMethod"
          :loading="loading"
          placeholder="姓名、电话"
          style="width: 100%;">
            <el-option
              v-for="item in likeName"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </el-col>
      <el-col :span="1" class="noPadding">
        <el-button class="btnC" type="danger" @click="con()" style="width:auto; padding: 12px; text-align: center">搜索</el-button>
      </el-col>
    </el-row>
    <el-row class="noMargin search noPaddingBottom">
      <el-col :span="24" style="overflow-y: auto;height: 400px;">
        <el-table :data="table.tbody" stripe border>
          <el-table-column
            prop="userName"
            label="用户名"
            style="width: 10px;">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="ct"
            label="注册时间">
          </el-table-column>
          <el-table-column
            prop="role"
            label="角色">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status=='2'">启用</span>
                <span v-if="scope.row.status=='1'">停止</span>
              </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            prop="handle"
            label="操作"
            min-width="100">
             <template slot-scope="scope">
              <el-button type="text" size="small" @click="bianji(scope.row.id)">编辑</el-button>
              <el-button type="text" v-if="scope.row.status === '1'" size="small" @click="qiyong(scope.row.id)">启用</el-button>
              <el-button type="text" v-if="scope.row.status === '2'" size="small" @click="tingzhi(scope.row.id)">停止</el-button>
              <el-button type="text" size="small" @click="SettingLog(scope.row.id)">日志</el-button>
              <el-button type="text" size="small" @click="delete_Tan(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="noMargin search">
      
    </el-row>
  <SettingLog ref="SettingLog" :controlLog="controlLogList"></SettingLog>
  <deleteBtn ref="deleteBtn" :deletes="tabsl"></deleteBtn>
  <newCMSRole ref="newCMSRole" :edits="tabsa"></newCMSRole>
  <enableBtn ref="enableBtn" :enabl="tabsb"></enableBtn>
    <el-dialog
      title="编辑CMS用户"
      :visible.sync="bianjiCMS"
      width="600px">
      <div class="content">
        <div class="inputLeft inputBox">
          <span>用户名：</span>
          <input type="text" v-model="bianjiHx.jueseName">
        </div>
        <div class="inputRight inputBox">
          <span>角色：</span>
          <el-select class="selectInput" v-model="bianjiHx.juese" clearable placeholder="请选择">
            <el-option
            v-for="item in screening.area"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="inputLeft inputBox">
          <span>手机号：</span>
          <input type="text" v-model="bianjiHx.phone">
        </div>
        <div class="inputRight inputBox">
          <span>密码：</span>
          <input type="password" v-model="bianjiHx.password">
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bianjiBc">保存</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
  import Validation from "../../../static/js/validation.js";
  import tool from "../../../static/js/tool.js";
  import SettingLog from "@/components/public/popUp/SetLog.vue"
  import deleteBtn from "@/components/public/popUp/DeleteBtn.vue"; //删除公寓角色
  import newCMSRole from "@/components/public/popUp/NewCMSRole.vue"; //新增公寓角色
  import enableBtn from "@/components/public/popUp/EnableBtn.vue"; //启用
  export default {
  name: "CMSUserManagement",
  data() {
    var self = this
    return {
      likeNameBak: [
        {
          label: '姓名：',
          value: '1'
        },
        {
          label: '电话：',
          value: '2'
        }
      ],
      likeNameArr: [],
      likeName: '',
      tabsa: [
        {
          tit: "编辑CMS用户",
          inputs: [
            {
              type: "input",
              placeholder: "用户名：",
              value: "",
              must: true,
              index: 0,
              type1: "text"
            },
            {
              type: "select",
              placeholder: "角色：",
              options: [],
              value: "",
              must: true,
              index: 2
            },
            {
              type: "input",
              placeholder: "手机号：",
              value: "",
              index: 3,
              must: true,
              type1: "number"
            },
            {
              type: "input",
              placeholder: "密码：",
              value: "",
              index: 5,
              must: true,
              type1: "password"
            }
          ],
          buttons: [
            {
              name: "保存",
              color: "",
              click:(function (argument) {
                  this.bianjiBc()
                }).bind(self)
            }
          ]
        }
      ],
      tabsb: [
        {
          tit: "",
          title: "",
          desc: "",
          buttons: [
            {
              name: "确定",
              color: "",
              click: ""
            }
          ]
        }
      ],
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
      options6: [],
      nchdLikeName: [],
      loading: false,
      bianjiCMS: false,
      controlLogList: [],
      //筛选的过滤信息
      screening: {
        areaValue: "",
        areaValue1: "",
        state: [
          {
            value: "1",
            label: "停止"
          },
          {
            value: "2",
            label: "启用"
          }
        ],
        area: []
      },
      //用户要传的参数
      dat : {
        id: "",
        userName: "",
        phone: "",
        roleId: "",
        status: "",
        sortType: "",
        sortFields: "",
        pageNo: "",
        pageSize: "",
        totalRecord: ""
      },
      //表格信息
      table: {
        thead: [
          {
            prop: "userName",
            label: "用户名"
          },
          {
            prop: "phone",
            label: "手机号"
          },
          {
            prop: "ct",
            label: "注册时间"
          },
          {
            prop: "role",
            label: "角色"
          },
          {
            prop: "status",
            label: "状态"
          }
        ],
        tbody: [],
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
      bianjiHx: {
        id: "",
        jueseName: "",
        juese: "",
        phone: "",
        password: "",
        passwordC: ""
      }
    };
  },
  methods: {
    con() {
      //  查询按钮
      const self = this;
      self.loading = true;
      let likeNameStr = '';
      self.likeNameArr.forEach((item, index) => {
        let key = item.key;
        let value = item.value;
        likeNameStr += key + ':' + value;
        if (index !== self.likeNameArr.length - 1) {
          likeNameStr += '&';
        }
      });
      self.likeName = likeNameStr;
      self.dat.likeName = self.likeName;
      self.dat.status = self.screening.areaValue;
      self.dat.roleId = self.screening.areaValue1;
      self.queryDataFn();
      if(self.queryDataFn()){
        self.loading = false;
      }
    },
    qiyong(id){
      const self = this;
      self.$refs.enableBtn.showFn();
      self.tabsb[0].tit="启用";
      self.tabsb[0].title="您确定要启用该用户吗？";
      self.tabsb[0].buttons[0].click = function(){
        self.qiyongQD(id);
      }
    },
    qiyongQD(id) {
      const self = this,
      validate = new Validation();
      const result = validate.startValidate();
      var val = document.getElementById('textarea');
      var desc = val.value;
      self.axios
      .post(this.$store.state.api.setting.update_status_user,{
          id:id,
          status:2,
          desc:desc
        }
      )
      .then(function(response) {
        const { data } = response;
        if (data.status.code == 200) {
          self.$message.success("启用成功");
          setTimeout(function(){
            self.$refs.enableBtn.closeFn();
            self.queryDataFn();
          },2000)
        }
      })
      .catch(function(error) {
        self.loading = false;
        self.$message.error(error);
      });
    },
    tingzhi(id){
      const self = this;
      self.$refs.enableBtn.showFn();
      self.tabsb[0].tit="停止";
      self.tabsb[0].title="您确定要停止该用户吗？";
      self.tabsb[0].buttons[0].click = function(){
        self.tingzhiQD(id);
      }
    },
    tingzhiQD(id) {
      const self = this,
      validate = new Validation();
      const result = validate.startValidate();
      var val = document.getElementById('textarea');
      var desc = val.value;
      self.axios
      .post(this.$store.state.api.setting.update_status_user,{
          id:id,
          status:1,
          desc:desc
        }
      )
      .then(function(response) {
        const { data } = response;
        if (data.status.code == 200) {
          self.$message.success("停止成功");
          setTimeout(function(){
            self.$refs.enableBtn.closeFn();
            self.queryDataFn();
          },2000)
        }
      })
      .catch(function(error) {
        self.loading = false;
        self.$message.error(error);
      });
    },
    changeLikeName(val) {
      console.info('change节点:', val);
      // 只处理增加tag
      if (val.length <= this.likeNameArr.length) {
        return;
      }
      let lastValue = val[val.length - 1];
      let split = lastValue.split(',');
      let key = split[0];
      let value = split[1];
      let arrIndex = -1;
      for (let i = 0; i < this.likeNameArr.length; i++) {
        console.info('key:', this.likeNameArr[i]);
        if (key === this.likeNameArr[i].key) {
          arrIndex = i;
          break;
        }
      }
      console.info('arrIndex', arrIndex);
      let temp = {};
      temp.key = key;
      temp.value = value;
      if (arrIndex > -1) {
        if (arrIndex !== val.length - 1) {
          this.nchdLikeName.splice(val.length - 1);
        }
        this.nchdLikeName.splice(arrIndex, 1, value);
        this.likeNameArr.splice(arrIndex, 1, temp);
      } else {
        this.nchdLikeName.splice(val.length - 1);
        this.nchdLikeName.push(value);
        this.likeNameArr.push(temp);
      }
    },
    deleteLikeName(val) {
      console.info('删除节点:', val);
      let arrIndex = -1;
      for (let i = 0; i < this.likeNameArr.length; i++) {
        if (val.value === this.likeNameArr[i].value) {
          arrIndex = i;
          break;
        }
      }
      console.info(arrIndex);
      if (arrIndex > -1) {
        this.likeNameArr.splice(arrIndex);
      }
    },
    remoteMethod(query) {
      if (query !== '') {
        this.likeName = [];
        for (let obj in this.likeNameBak) {
          let temp = {};
          temp.label = this.likeNameBak[obj].label + ' ' + query;
          temp.value = this.likeNameBak[obj].value + ',' + query;
          this.likeName.push(temp);
        }
      } else {
        this.likeName = [];
      }
    },
    SettingLog(id){
      var self = this;
      // 日志按钮
      self.axios
      .post(this.$store.state.api.setting.cms_house_log, {
        recordedDataId: id
      })
      .then(function(response) {
        self.loading = false;
        const { data } = response;
        if (data.status.code == 200) {
          self.controlLogList = data.result.list;
          console.log(data);
        }
      })
      .catch(function(error) {
        self.loading = false;
        self.$message.error(error);
      });
      this.$refs.SettingLog.showFn();
    },
    bianji(id) {
      var self = this;
      self.bianjiHx.id = id;
      // 公寓角色编辑按钮
      self.loading = true;
      self.axios
      .post(this.$store.state.api.setting.get_user, {
        id: id
      })
      .then(function(response) {
        self.loading = false;
        const { data } = response;
        if (data.status.code == 200) {
          self.bianjiCMS = true;
          self.bianjiHx.jueseName = data.result.userName;
          self.bianjiHx.juese = data.result.roleId;
          self.bianjiHx.phone = data.result.phone;
          self.bianjiHx.password = "******";
          self.bianjiHx.passwordC = data.result.password;
        }
      })
      .catch(function(error) {
        self.loading = false;
        self.$message.error(error);
      });
    },
    bianjiBc() {
      const self = this,
      // 公寓角色编辑保存
      validate = new Validation();
      validate.addRule(
          Validation.rules.isEmptyOrNull,
          self.bianjiHx.jueseName,
          "角色名称不能为空！"
      );
      validate.addRule(
          Validation.rules.isEmptyOrNull,
          self.bianjiHx.password,
          "密码不能为空！"
      );
      validate.addRule(
          Validation.rules.isEmptyOrNull,
          self.bianjiHx.phone,
          "手机号不能为空！"
      );
      validate.addRule(
          Validation.rules.isMobile,
          self.bianjiHx.phone,
          "请输入正确手机号！"
      );
      validate.addRule(
          Validation.rules.isEmptyOrNull,
          self.bianjiHx.juese,
          "角色不能为空！"
      );
      var bc = {
        id: self.bianjiHx.id,
        userName: self.bianjiHx.jueseName,
        userPwd: self.bianjiHx.password,
        roleId: self.bianjiHx.juese,
        phone: self.bianjiHx.phone
      }
      if(self.bianjiHx.password == "******"){
        bc.userPwd = self.bianjiHx.passwordC
      }
      const result = validate.startValidate();
        if (result) {
          self.$message.error(result);
      } else {
        self.axios
        .post(this.$store.state.api.setting.update_user, bc)
        .then(function(response) {
          self.loading = false;
          const { data } = response;
          if (data.status.code == 200) {
            self.$message.success("保存成功");
            setTimeout(function(){
              self.bianjiCMS = false;
              self.queryDataFn();
            },2000)
          }
        })
        .catch(function(error) {
          self.loading = false;
          self.$message.error(error);
        });
      }
    },
    delete_Tan(id){
      this.$refs.deleteBtn.showFn();
      this.deleteId = id;
    },
    delete_Role() {
      // 公寓角色删除按钮
      var self = this;
      var dete = document.getElementById("dedc");
      self.axios
      .post(this.$store.state.api.setting.delete_user, {
        id: this.deleteId,
        deleteCause: dete.value
      })
      .then(function(response) {
        self.loading = false;
        const { data } = response;
        if (data.status.code == 200) {
          self.$message.success("删除成功");
          setTimeout(function(){
            self.$refs.deleteBtn.closeFn();
            self.queryDataFn();
          },2000)
        }
      })
      .catch(function(error) {
        self.loading = false;
        self.$message.error(error);
      });
    },
    queryDataFn() {
      const self = this,
      validate = new Validation();
      self.loading = true;
      const result = validate.startValidate();
      self.axios
        .post(this.$store.state.api.setting.get_home_list,
          this.dat
          )
        .then(function(response) {
          const { data } = response;
          if (data.status.code == 200) {
            self.loading = false;
            console.log(data,123123123)
            self.table.tbody = data.result.list;
          }
        })
        .catch(function(error) {
          self.loading = false;
          self.$message.error(error);
      });
    },
    queryRole() {
      const self = this;
      //cms用户 角色搜索框
      self.loading = true;
      self.axios
      .post(this.$store.state.api.setting.cms_user
        )
      .then(function(response) {
        const { data } = response;
        if (data.status.code == 200) {
          self.loading = false;
          self.screening.area = data.result.list;
          self.tabsa[0].inputs[1].options = data.result.list;
        }
      })
      .catch(function(error) {
        self.loading = false;
        self.$message.error(error);
      });
    }
  },
  components: {
    SettingLog,
    deleteBtn,
    newCMSRole,
    enableBtn
  },
  created() {
      var self = this;
      self.queryDataFn();
      self.queryRole();
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
/deep/ .el-button {
  color: #ed0536;
}
/deep/ .el-dialog {
  border-radius: 0px;
  height: 350px;
  position: relative;
}
/deep/ .el-dialog__header {
  height: 50px;
  text-indent: 2em;
  border-bottom: 1px solid #f2f6f7;
}
/deep/ .el-dialog__header .el-dialog__title{
  font-size: 16px;
  color: #ed0536;
}
/deep/ .el-dialog__headerbtn .el-dialog__close{
  color: #ed0536;
  font-size: 25px;
}
.content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-top: 10px;
  padding: 0 15px;
}
.inputBox {
  width: 48%;
  float: left;
  position: relative;
  padding-left: 15px;
  height: 34px;
  border: 1px solid #e6e6e6;
  line-height: 34px;
  margin-top: 10px;
}
.inputBox:after {
  content: "*";
  position: absolute;
  top: 10px;
  left: 5px;
  color: red;
  line-height: 0;
}
.selectInput {
  display: inline-block;
  position: relative;
  width: 80%;
  height: 30px;
}
/deep/ .selectInput>.el-input {
  display: block;
  height: 100%;
}
/deep/ .selectInput .el-input__inner {
  border-radius: 0px;
  height: 100%;
  border: none;
  padding: 0px;
}
.inputRight input {
  height: 90%;
  border: none;
  outline: none;
}
.inputRight {
  margin-left: 2%;
}
.inputLeft {
  margin-right: 2%;
}
.inputLeft input {
  height: 90%;
  border: none;
  outline: none;
}
/deep/ .el-dialog__footer {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
/deep/ .el-dialog__footer .el-button {
  width: 100px;
  height: 40px;
}
/deep/ .el-dialog__footer .el-button span{
  color: #fff;
  font-size: 16px;
}
.btnC{
  color: #fff;
}
/deep/ .el-table--striped .el-table__body tr.el-table__row--striped:hover td {
  background: #ecf5ff;
}
</style>
