<template>
  <el-row :gutter="20">
    <el-col :span="11">

      <el-row>
        <el-col v-for="(item,index) in stateTabs" :key="'tabs'+index" :span="4" class="nav-item">
          <router-link style="max-width:95px;" class="router-link" @click.native="currentIndex = index" :to="item.path">{{item.name}}</router-link>
        </el-col>
      </el-row>

    </el-col>
    <el-col :span="11">

      <el-row :gutter="6" class="borderRight">

        <el-col :span="4" v-for="(item,index) of stateTabs[currentIndex].btns" :key="'btns'+index" class="btn-item">
          <el-button v-if="item.click" type="danger" class="btn" v-on:click="item.click">{{item.name}}</el-button>
          <el-button v-else-if="!item.click" type="danger" class="btn">{{item.name}}</el-button>
        </el-col>

      </el-row>

    </el-col>
    <el-col :span="2" style="padding:0 !important;">

      <el-row class="xinXi">
        <el-dropdown @command="handleCommand">
          <el-col :span="24" class="header-container el-dropdown-link">
            <img class="header-img" :src="headerImgage" />
            <span class="nickname" v-text="nickName"></span>
          </el-col>
          <el-dropdown-menu
            slot="dropdown">
            <el-dropdown-item command='true'>修改密码</el-dropdown-item>
            <div @click="logout">
              <el-dropdown-item>退出</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>

    </el-col>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="500px"
      show-close>
      <div>
        <div class="passwordBox"><span class="place">旧密码：</span><input class="passIpt" type="password" v-model="updatePassword.userPwdOld"></div>
        <div class="passwordBox"><span class="place">新密码：</span><input class="passIpt" type="password" v-model="updatePassword.userPwdNew"></div>
        <div class="passwordBox"><span class="place">确认密码：</span><input class="passIpt" type="password" v-model="updatePassword.qdPassword"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button class="baoCun" type="primary" @click="updatepass">保 存</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
  import Validation from "../../../static/js/validation.js";
  import tool from "../../../static/js/tool.js";
  export default {
    name: "cms-header",
    props: {
      tabs: {
        type: Array,
        default: [],
        required: true
      },
      btns: {
        type: Array
      }
    },
    data() {
      return {
        dialogVisible: false,
        stateTabs: [],
        currentIndex: 0,
        nickName: "",
        headerImgage: "",
        updatePassword: {
          id:"",
          userPwdOld:"",
          userPwdNew:"",
          qdPassword:"",
        },
        userInit:{}
      };
    },
    methods: {
      logout() {
        this.$router.replace('/login');
      },
      handleCommand(command) {
        if(command == 'true'){
          this.dialogVisible = true;
        }
        this.updatePassword.userPwdOld = "";
        this.updatePassword.userPwdNew = "";
        this.updatePassword.qdPassword = "";
      },
      updatepass() {
        const self = this,
        validate = new Validation();

        if(self.updatePassword.userPwdNew !== self.updatePassword.qdPassword) {
          self.$message.error("两次密码输入不同");
        }else{
          validate.addRule(
            Validation.rules.isEmptyOrNull,
            self.updatePassword.userPwdOld,
            "旧密码不能为空！"
          );
          validate.addRule(
            Validation.rules.isString,
            self.updatePassword.userPwdOld,
            "不可输入汉字！"
          );
          validate.addRule(
            Validation.rules.isEmptyOrNull,
            self.updatePassword.userPwdNew,
            "新密码不能为空！"
          );
          validate.addRule(
            Validation.rules.isString,
            self.updatePassword.userPwdNew,
            "新密码不能为汉字！"
          );
          validate.addRule(
            Validation.rules.isEmptyOrNull,
            self.updatePassword.qdPassword,
            "请再次输入新密码！"
          );
          validate.addRule(
            Validation.rules.isString,
            self.updatePassword.qdPassword,
            "确认密码不能为汉字！"
          );
          const result = validate.startValidate();
          if (result) {
            self.$message.error(result);
          } else {
            self.axios({
              method: "post",
              url: self.$store.state.api.login.update_pwd,
              data: {
                id: self.updatePassword.id,
                userPwdOld: self.updatePassword.userPwdOld,
                userPwdNew: self.updatePassword.userPwdNew
              }
            })
            .then(response => {
              const { data } = response;
              if (data.status.code == 200) {
                self.$alert("修改成功，请使用新密码重新登录！", "提示", {
                  callback: action => {
                    this.$router.replace('/login');
                  }
                });
              }
              if (data.status.code == 99) {
                self.$alert(data.status.msg, "提示", {
                  callback: action => {
                    this.dialogVisible = false;
                  }
                });
              }
            })
            .catch(error => {
              console.error(error);
            });
          }
        }

      }
    },
    created() {
      const { tabs } = this.$props;
      if (tabs) {
        this.stateTabs = tabs;
        // console.info('1111',tabs);
        this.stateTabs.forEach((item, index) => {
          if (item.btns) {
            item.btns.reverse();
          }
          // console.info(this.$router.currentRoute.path);
          if (this.$router.currentRoute.path.indexOf(item.path) >= 0) {
            this.currentIndex = index;
          }
          // console.info(item.path);
        });
      }
      const userInfo = tool.session.get("userInfo");
      this.userInit = userInfo;
      console.log(this.userInit);
      this.updatePassword.id = userInfo.id;
      if (userInfo) {
        this.nickName = userInfo.nickName;
        if(userInfo.pic == ""){
          this.headerImgage =
          "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=547138142,3998729701&fm=27&gp=0.jpg";
        }else{
          this.headerImgage = userInfo.pic;
        }
      }
    }
  };
</script>

<style scoped>
  .nav-item {
    text-align: center;
    height: 60px;
    line-height: 60px;
  }

  .nav-item a.router-link {
    display: block;
    width: 100%;
    height: 100%;
    color: #2e3445;
    font-size: 14px;
    position: relative;
  }
  .nav-item a.router-link.router-link-active {
    color: #ed0536;
  }
  .nav-item a.router-link.router-link-active::after {
    content: "";
    display: block;
    width: 100%;
    height: 3px;
    background: #ed0536;
    bottom: 0;
    position: absolute;
  }

  .btn-item {
    text-align: center;
    height: 60px;
    line-height: 60px;
    float: right;
  }

  .borderRight {
    border-right: 1px solid #f2f6f7;
    padding-right: 10px;
  }
  .borderRight:empty {
    border-right: 0px;
    padding-right: 0px;
    height: 60px;
  }

  .btn-item .btn {
    width: 100% !important;
    padding: 12px 0px !important;
    text-align: center;
    border-radius: 3px;
  }

  .el-button--danger {
    background: #ed0536;
    border-color: #ed0536;
  }

  .header-container {
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: center;
  }

  .xinXi {
    padding-right: 10px;
  }
  .xinXi:hover {
    background: #f8f8f8;
  }
  .xinXi /deep/ .el-dropdown {
    width: 100%;
    float: right;
  }
  .header-img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  .nickname {
    padding-left: 10px;
    font-size: 14px;
  }
  /deep/ .el-dialog__header {
    height: 50px;
    border-bottom: 1px solid #f2f6f7;
    background: #f8f8f8;
  }
  /deep/ .el-dialog__header .el-dialog__title{
    font-size: 16px;
    color: #ed0536;
  }
  /deep/ .el-dialog__headerbtn .el-dialog__close{
    color: #ed0536;
    font-size: 25px;
  }
  .baoCun {
    background-color: #ed0536;
    border-color: #ed0536;
  }
  .passwordBox {
    width: 450px;
    height: 38px;
    line-height: 38px;
    position: relative;
    margin-top: 10px;
  }
  .place {
    position: absolute;
    left: 10px;
    line-height: 38px;
    z-index: 99;
  }
  .passIpt {
    box-sizing: border-box !important;
    padding-left: 70px;
    position: absolute;
    display: block;
    width: 100%;
    height: 38px;
    line-height: 38px;
    border: 1px solid #e6e6e6;
    background-color: #fff;
    border-radius: 2px;
    outline: none;
  }
</style>
