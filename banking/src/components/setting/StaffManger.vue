<template>
  <el-main v-loading="loading.all" element-loading-background="rgba(0, 0, 0, 0)">
    <el-row class="search">
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline" style="display:flex;;">
          <el-form-item class="noMarginRight noMarginBottom" style="flex:1;">
            <el-input v-model="seachForm.jjrUserLikeName" placeholder="员工名称"></el-input>
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
            prop="employeeNum"
            label="员工编号">
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="姓名">
          </el-table-column>
          <el-table-column
            label="所属部门">
            <template slot-scope="scope">
              <span>{{scope.row.dptm.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="角色">
            <template slot-scope="scope">
              <span>{{scope.row.role.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="inductionTime"
            label="入职日期">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150px">
            <template slot-scope="scope">
              <el-button type="text" v-show="isButtonAuthor('22fdbda7cc9f44d6a7deef912230aa05')" @click="edit(scope.row.id)">编辑</el-button>
              <el-button type="text" v-show="isButtonAuthor('fa1022c8e6ac41ddaa519ca939b2d805')" @click="openDeleteDialog(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
      <!--添加员工-->
      <el-dialog width="50%" :visible.sync="addDialogActive" :title="form.id?'修改员工':'添加员工'" class="addStaff" :before-close="closeDialog">
        <el-row v-loading="loading.submit" element-loading-background="rgba(0, 0, 0, 0)">
          <el-col :span="24">
            <el-form>
              <div class="title">登录信息</div>
              <el-form-item>
                <el-row :gutter="20" class="noMarginBottom">
                  <el-col :span="10">
                    <el-input v-model="form.accountName" class="required">
                      <template slot="prepend">登录名:</template>
                    </el-input>
                  </el-col>
                  <el-col :span="10" class="noPaddingRight">
                    <el-input :disabled="resetPwd" v-model="form.accountPwd" class="required">
                      <template slot="prepend">密码:</template>
                    </el-input>
                  </el-col>
                  <el-col :span="4" class="noPaddingLeft">
                    <el-button style="border-radius:0px;height:42px;border-left:0px;width:100%;" @click="resetPassword">重置密码</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <div class="title">员工信息</div>
              <el-form-item>
                <el-row :gutter="20">
                  <el-col :span="5" style="height:104px;">
                    <img class="imgBox" />
                  </el-col>
                  <el-col :span="19">
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <el-input v-model="form.employeeNum">
                          <template slot="prepend">员工编号:</template>
                        </el-input>
                      </el-col>
                      <el-col :span="12">
                        <el-input class="required" v-model="form.nickName">
                          <template slot="prepend">姓名:</template>
                        </el-input>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20" class="noMarginBottom">
                      <el-col :span="12">
                        <el-input class="required" v-model="form.phone">
                          <template slot="prepend">手机号:</template>
                        </el-input>
                      </el-col>
                      <el-col :span="12">
                        <el-input class="required" v-model="form.idNumber">
                          <template slot="prepend">身份证号:</template>
                        </el-input>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="noMarginBottom">
                  <el-col :span="8">
                    <el-cascader :options="form.departList" v-model="form.dptmId" placeholder="所属部门:" change-on-select></el-cascader>
                  </el-col>
                  <el-col :span="8">
                    <el-select placeholder="角色:" v-model="form.roleId">
                      <el-option v-for="item of form.roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <template>
                      <el-radio-group v-model="form.gender">
                        <el-radio label="1">男</el-radio>
                        <el-radio  label="0">女</el-radio>
                      </el-radio-group>
                    </template>
                  </el-col>
                </el-row>
              </el-form-item>
              <div class="title">员工状态</div>
              <el-form-item>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-select v-model="form.status" placeholder="员工状态:">
                      <el-option label="冻结" value="0"></el-option>
                      <el-option label="有效" value="1"></el-option>
                      <el-option label="审核" value="2"></el-option>
                      <el-option label="删除" value="3"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select v-model="form.becomeStatus" placeholder="是否转正:">
                      <el-option label="否" value="0"></el-option>
                      <el-option label="是" value="1"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-date-picker v-model="form.becomeTime" type="date" placeholder="转正日期:" style="width:100%;"></el-date-picker>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-date-picker v-model="form.inductionTime" type="date" placeholder="入职时间:" style="width:100%;"></el-date-picker>
                  </el-col>
                  <el-col :span="8">
                    <el-date-picker v-model="form.mountTime" type="date" placeholder="上岗日期:" style="width:100%;"></el-date-picker>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="form.zhuJiao">
                      <template slot="prepend">助教:</template>
                    </el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="noMarginBottom">
                  <el-col :span="8">
                    <el-input>
                      <template slot="prepend">培训期数:</template>
                    </el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <div class="title">详细信息</div>
              <el-form-item>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-select v-model="form.wenhuacd" placeholder="文化程度">
                      <el-option label="研究生或以上" value="1"></el-option>
                      <el-option label="本科" value="2"></el-option>
                      <el-option label="大专" value="3"></el-option>
                      <el-option label="高中" value="4"></el-option>
                      <el-option label="中专" value="5"></el-option>
                      <el-option label="初中及以下" value="6"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="form.email">
                      <template slot="prepend">邮箱:</template>
                    </el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="form.weixin">
                      <template slot="prepend">微信:</template>
                    </el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-input v-model="form.qq">
                      <template slot="prepend">QQ:</template>
                    </el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="form.msn">
                      <template slot="prepend">MSN:</template>
                    </el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-date-picker v-model="form.birthday" type="date" placeholder="生日:" style="width:100%;"></el-date-picker>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-input v-model="form.fAddress">
                      <template slot="prepend">家庭住址:</template>
                    </el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-input v-model="form.instancyUserRelation">
                      <template slot="prepend">宿舍名:</template>
                    </el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="form.zhaoPinRen">
                      <template slot="prepend">招聘人:</template>
                    </el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="form.jieShaoRen">
                      <template slot="prepend">介绍人:</template>
                    </el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-input v-model="form.bankCard">
                      <template slot="prepend">开户行:</template>
                    </el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="form.openBank">
                      <template slot="prepend">开户支行:</template>
                    </el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="form.suSheName">
                      <template slot="prepend">持卡人:</template>
                    </el-input>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-input v-model="form.bankNumber">
                      <template slot="prepend">卡号:</template>
                    </el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-input v-model="form.instancyUserName">
                      <template slot="prepend">紧急联系人:</template>
                    </el-input>
                  </el-col>
                  <el-col :span="16">
                    <el-input v-model="form.instancyUserPhone">
                      <template slot="prepend">紧急联系人电话:</template>
                    </el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <template slot="footer">
          <el-button type="primary" style="width:auto;border-radius:4px;" @click="save">保存</el-button>
        </template>
      </el-dialog>
    <!--删除员工-->
    <el-dialog
      title="删除"
      width="30%"
      :visible="dialog.deleted"
      :before-close="closeDeleteDialog">
      <el-row v-loading="loading.deleted" element-loading-background="rgba(0, 0, 0, 0)">
        <el-col :span="24">
          <p class="error-success">您确定要删除该员工吗？</p>
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
  name: "RoleManger",
  data() {
    return {
      //loading信息
      loading: {
        all: true, //整页的loading
        deleted: false, //删除的loading
        submit: false //提交的loading
      },

      //弹出框信息
      dialog: {
        deleted: false, //删除弹出框
        deleted_msg: {
          id: "", //员工id
          deleteWhy: "" //删除员工的原因
        }
      },

      resetPwd: false, //是否可以编辑密码

      //表单信息
      form: {
        id: "",
        accountName: "", //登录名
        accountPwd: "", //密码
        employeeNum: "", //员工编号
        nickName: "", //姓名
        phone: "", //手机号
        idNumber: "", //身份证号
        dptmId: [], //所属部门
        roleId: "", //角色
        gender: "1", //性别  0:女 1:男
        status: "1", //用户状态  0:冻结，1:有效，2:审核，3:删除
        becomeStatus: "1", //是否转正  0:未转正 1:转正
        becomeTime: "", //转正日期
        inductionTime: "", //入职日期
        mountTime: "", //上岗日期
        zhuJiao: "", //助教
        wenhuacd: "", //文化程度: 1：研究生或以上 2：本科 3：大专 4：高中 5：中专 6：初中及以下
        email: "", //邮箱
        weixin: "", //微信
        qq: "", //qq
        msn: "", //msn
        birthday: "", //生日
        fAddress: "", //家庭住址
        instancyUserRelation: "", //宿舍名
        zhaoPinRen: "", //招聘人
        jieShaoRen: "", //介绍人
        bankCard: "", //开户行
        openBank: "", //开户行支行
        suSheName: "", //持卡人
        bankNumber: "", //卡号
        instancyUserName: "", //紧急联系人
        instancyUserPhone: "", //紧急联系人电话
        departList: [], //部门列表数据
        roleList: [] //角色列表数据
      },

      //搜索的信息
      seachForm: {
        jjrUserLikeName: "" //角色名称
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
    addDialogActive: state => state.staffManger.staffDialogActive
  }),
  methods: {
    //搜索
    async search() {
      const self = this;
      self.loading.all = true;
      const { data } = await self.getStaff();
      if (data.status.code == 200) {
        self.table.tbody = data.result.list;
      }
      self.loading.all = false;
    },

    //重置密码
    resetPassword() {
      const self = this;
      self.resetPwd = false;
      self.form.accountPwd = "";
    },

    //关闭，新增 or 修改弹出框
    closeDialog() {
      this.resetForm();
      this.$store.commit("staffManger/toogleStaffDialogActive", false);
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
      self.resetPwd = false;
      self.form.id = "";
      self.form.accountName = "";
      self.form.accountPwd = "";
      self.form.employeeNum = "";
      self.form.nickName = "";
      self.form.phone = "";
      self.form.idNumber = "";
      self.form.dptmId = [];
      self.form.roleId = "";
      self.form.gender = "1";
      self.form.status = "1";
      self.form.becomeStatus = "1";
      self.form.becomeTime = "";
      self.form.inductionTime = "";
      self.form.mountTime = "";
      self.form.zhuJiao = "";
      self.form.wenhuacd = "";
      self.form.email = "";
      self.form.weixin = "";
      self.form.qq = "";
      self.form.msn = "";
      self.form.birthday = "";
      self.form.fAddress = "";
      self.form.instancyUserRelation = "";
      self.form.zhaoPinRen = "";
      self.form.jieShaoRen = "";
      self.form.bankCard = "";
      self.form.openBank = "";
      self.form.suSheName = "";
      self.form.bankNumber = "";
      self.form.instancyUserName = "";
      self.form.instancyUserPhone = "";
    },

    //编辑
    edit(id) {
      const self = this;
      self.resetPwd = true;
      self.loading.submit = true;
      self.$store.commit("staffManger/toogleStaffDialogActive", true);
      self
        .axios({
          method: "post",
          url: self.$store.state.api.setting.tableJjrUser.get,
          data: {
            gcid: "0100099",
            userid: "ab0f10cd02094f7b9b82b82088742557",
            token: "e40f0b86-2ed6-4b62-8571-e63e1f23bbd3",
            id: id
          }
        })
        .then(response => {
          self.loading.submit = false;
          const { data } = response;
          if (data.status.code == 200) {
            const staff = data.result;
            if (staff) {
              self.form.id = staff.id;
              self.form.accountName = staff.accountName;
              self.form.accountPwd = staff.accountPwd
                ? staffs.accountPwd
                : "******";
              self.form.employeeNum = staff.employeeNum;
              self.form.nickName = staff.nickName;
              self.form.phone = staff.phone;
              self.form.idNumber = staff.idNumber;
              self.form.dptmId = [staff.dptm.id];
              self.form.roleId = staff.role.id;
              self.form.gender = staff.gender.toString();
              self.form.status = staff.status.toString();
              self.form.becomeStatus = staff.becomeStatus.toString();
              self.form.becomeTime = staff.becomeTime;
              self.form.inductionTime = staff.inductionTime;
              self.form.mountTime = staff.mountTime;
              self.form.zhuJiao = staff.zhuJiao;
              self.form.wenhuacd = staff.wenhuacd.toString();
              self.form.email = staff.email;
              self.form.weixin = staff.weixin;
              self.form.qq = staff.qq;
              self.form.msn = staff.msn;
              self.form.birthday = staff.birthday;
              self.form.fAddress = staff.fAddress;
              self.form.instancyUserRelation = staff.instancyUserRelation;
              self.form.zhaoPinRen = staff.zhaoPinRen;
              self.form.jieShaoRen = staff.jieShaoRen;
              self.form.bankCard = staff.bankCard;
              self.form.openBank = staff.openBank;
              self.form.suSheName = staff.suSheName;
              self.form.bankNumber = staff.bankNumber;
              self.form.instancyUserName = staff.instancyUserName;
              self.form.instancyUserPhone = staff.instancyUserPhone;
            }
          }
        })
        .catch(() => {
          self.loading.submit = false;
        });
    },

    //保存员工
    save() {
      const self = this;

      const validate = new validation();
      validate.addRule(
        validation.rules.isEmptyOrNull,
        self.form.accountName,
        "登录名不能为空！"
      );
      validate.addRule(
        validation.rules.isEmptyOrNull,
        self.form.accountPwd,
        "密码不能为空！"
      );
      validate.addRule(
        validation.rules.isEmptyOrNull,
        self.form.nickName,
        "姓名不能为空！"
      );
      validate.addRule(
        validation.rules.isEmptyOrNull,
        self.form.phone,
        "手机不能为空！"
      );
      validate.addRule(
        validation.rules.isMobile,
        self.form.phone,
        "手机号格式不正确！"
      );
      validate.addRule(
        validation.rules.isEmptyOrNull,
        self.form.idNumber,
        "身份证不能为空！"
      );
      validate.addRule(
        validation.rules.isIDNumber,
        self.form.idNumber,
        "身份证格式不正确！"
      );
      validate.addRule(
        validation.rules.isEmptyOrNull,
        self.form.dptmId.toString(),
        "请选择所属部门！"
      );
      validate.addRule(
        validation.rules.isEmptyOrNull,
        self.form.roleId,
        "请选择角色！"
      );
      if (self.form.email) {
        validate.addRule(
          validation.rules.isEmail,
          self.form.email,
          "邮箱格式不正确！"
        );
      }
      const result = validate.startValidate();
      if (result) {
        self.$message.error(result);
      } else {
        if (!self.loading.submit) {
          self.loading.submit = true;
          const sendData = {
            id: self.form.id,
            accountName: self.form.accountName,
            employeeNum: self.form.employeeNum,
            nickName: self.form.nickName,
            phone: self.form.phone,
            idNumber: self.form.idNumber,
            dptmId: self.form.dptmId[self.form.dptmId.length - 1],
            roleId: self.form.roleId,
            gender: self.form.gender,
            status: self.form.status,
            becomeStatus: self.form.becomeStatus,
            becomeTime: self.form.becomeTime,
            inductionTime: self.form.inductionTime,
            mountTime: self.form.mountTime,
            zhuJiao: self.form.zhuJiao,
            wenhuacd: self.form.wenhuacd,
            email: self.form.email,
            weixin: self.form.weixin,
            qq: self.form.qq,
            msn: self.form.msn,
            birthday: self.form.birthday,
            fAddress: self.form.fAddress,
            instancyUserRelation: self.form.instancyUserRelation,
            zhaoPinRen: self.form.zhaoPinRen,
            jieShaoRen: self.form.jieShaoRen,
            bankCard: self.form.bankCard,
            openBank: self.form.openBank,
            suSheName: self.form.suSheName,
            bankNumber: self.form.bankNumber,
            instancyUserName: self.form.instancyUserName,
            instancyUserPhone: self.form.instancyUserPhone
          };
          if (sendData.id && self.form.accountPwd != "******") {
            sendData.accountPwd = self.form.accountPwd;
          } else if (!sendData.id) {
            sendData.accountPwd = self.form.accountPwd;
          }
          self
            .axios({
              method: "post",
              url: self.$store.state.api.setting.tableJjrUser.save,
              data: {
                gcid: "0100099",
                userid: "ab0f10cd02094f7b9b82b82088742557",
                token: "e40f0b86-2ed6-4b62-8571-e63e1f23bbd3",
                params: sendData
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
            url: self.$store.state.api.setting.tableJjrUser.deleteById,
            data: {
              gcid: "0100099",
              userid: "ab0f10cd02094f7b9b82b82088742557",
              token: "e40f0b86-2ed6-4b62-8571-e63e1f23bbd3",
              params: {
                id: self.dialog.deleted_msg.id,
                deleteWhy: self.dialog.deleted_msg.deleteWhy
              }
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
          token: "e40f0b86-2ed6-4b62-8571-e63e1f23bbd3"
        }
      });
    },

    //获取员工列表
    getStaff() {
      const self = this;
      return self.axios({
        method: "post",
        url: self.$store.state.api.setting.tableJjrUser.getList,
        data: {
          gcid: "0100099",
          userid: "ab0f10cd02094f7b9b82b82088742557",
          token: "e40f0b86-2ed6-4b62-8571-e63e1f23bbd3",
          jjrUserLikeName: self.seachForm.jjrUserLikeName
        }
      });
    },

    //获取角色列表
    getRoleList() {
      const self = this;
      return self.axios({
        method: "post",
        url: self.$store.state.api.setting.role.getList,
        data: {
          gcid: "0100099",
          userid: "ab0f10cd02094f7b9b82b82088742557",
          token: "e40f0b86-2ed6-4b62-8571-e63e1f23bbd3"
        }
      });
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
        .all([self.getDepartmentList(), self.getStaff(), self.getRoleList()])
        .then(
          self.axios.spread((response1, response2, response3) => {
            self.loading.all = false;
            const { data: department } = response1;
            const { data: tableJjrUser } = response2;
            const { data: role } = response3;
            if (department.status.code == 200) {
              const { list } = department.result;
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
            if (tableJjrUser.status.code == 200) {
              const { list } = tableJjrUser.result;
              self.table.tbody = list;
            }
            if (role.status.code == 200) {
              const { list } = role.result;
              self.form.roleList = list;
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
/*添加员工弹窗*/
/deep/ .addStaff .el-dialog__body {
  padding: 30px 25px 0 25px;
}
/deep/ .addStaff .el-dialog__title {
  color: #188ff0;
}
/deep/ .noMarginRight > .el-form-item__content {
  width: 100%;
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
.addStaff .title {
  color: #404040;
  font-size: 14px;
  padding-left: 9px;
  border-left: 3px solid #188ff0;
  margin-bottom: 20px;
}
.addStaff .imgBox {
  width: 104px;
  height: 104px;
  background-color: #e1eaec;
}
/deep/.addStaff .el-input-group__prepend {
  padding: 0 4px 0 10px;
  background: #fff;
}
/deep/.required .el-input-group__prepend::before {
  content: "*";
  color: #ff0000;
  position: absolute;
  top: 2px;
  left: 2px;
}
/deep/.addStaff .el-input input {
  border: none;
}
/deep/.addStaff .el-input-group__prepend {
  border: none;
}
/deep/.addStaff .el-input {
  border: 1px solid #e6eced;
}
/deep/ .el-table {
  min-height: calc(100vh - 245px);
}
.addStaff .save {
  width: 100px;
  height: 40px;
  background-color: #188ff0;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
  display: inline-block;
  color: #ffffff;
  font-size: 16px;
}
.addStaff .reset {
  width: 80px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  background-color: #ffffff;
  border: solid 1px #e6eced;
  border-left: none;
}
/*end*/
/deep/.roleTable th,
/deep/.roleTable td {
  text-align: center;
}
/deep/.roleManger_top {
  margin-bottom: 20px;
  height: 96px;
  background: #fff;
}
/deep/ .roleManger_top .el-row {
  padding-top: 26px;
}
/deep/ .roleManger_top .el-input {
  padding-left: 10px;
}
/deep/ .el-dialog__headerbtn .el-dialog__close {
  font-size: 24px;
}
.dataBox {
  overflow: auto;
  min-height: calc(100vh - 220px);
  border: 20px solid #fff;
  box-sizing: border-box;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}
.roleManger_top .searchBtn {
  width: 100px;
  display: inline-block;
  vertical-align: bottom;
  width: 84px;
  text-align: center;
  line-height: 40px;
  height: 40px;
  background: #188ff0;
  color: #fff;
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
