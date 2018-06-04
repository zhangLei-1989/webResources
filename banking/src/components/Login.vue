<template>
  <el-container v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
    <div class="login-bg">
      <div class="login">
        <img src="../../static/image/logo.png" class="logo" />
        <form class="login-form">
          <h1 class="title"><span>密码登录</span></h1>
          <div class="form-item">
            <div class="form-item-container">
              <label for="username" class="form-icon icon-phone"></label>
              <input id="username" type="text" placeholder="用户名" spellcheck="false" v-model.trim="username" />
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-container">
              <label for="password" class="form-icon icon-lock"></label>
              <input id="password" type="password" placeholder="密码" v-model.trim="password" />
            </div>
          </div>
          <div class="form-item">
            <a class="btn-login" v-on:click="login">登录</a>
          </div>
          <div class="form-item">
            <p class="forget-password">若忘记密码，请联系管理员</p>
          </div>
        </form>
      </div>
    </div>
  </el-container>
</template>

<script>
import validation from "../../static/js/validation.js";
import tool from "../../static/js/tool.js";
import "../../static/css/theme/default.css";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      loading: false
    };
  },
  methods: {
    login: function() {
      const self = this,
        validate = new validation();

      validate.addRule(
        validation.rules.isEmptyOrNull,
        self.username,
        "用户名不能为空！"
      );
      validate.addRule(
        validation.rules.isEmptyOrNull,
        self.password,
        "密码不能为空！"
      );
      const result = validate.startValidate();
      if (result) {
        self.$message.error(result);
      } else {
        self.loading = true;
        self
          .axios({
            method: "post",
            url: self.$store.state.api.setting.login,
            data: {
              gcid: "0100099",
              accountName: self.username,
              accountPwd: self.password,
              userid: "ab0f10cd02094f7b9b82b82088742557",
              token: "e40f0b86-2ed6-4b62-8571-e63e1f23bbd3"
            }
          })
          .then(function(response) {
            self.loading = false;
            const { data } = response;
            if (data.status.code == 200) {
              tool.session.set("userInfo", data.result);
              self.$router.replace("/home");
            } else if (data.status.code == 1007) {
              self.password = "";
              self.$message.error(data.status.msg);
            }
          })
          .catch(error => {
            self.loading = false;
          });
      }
    }
  }
};
</script>
<style scoped>
.login-bg {
  width: 100vw;
  height: 100vh;
  background: url(../../static/image/login_bg.png) no-repeat;
  background-size: 100vw 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  width: 350px;
}
.login .logo {
  display: block;
  margin: 0 auto;
  width: 100px;
  margin-bottom: 20px;
}
.login .login-form {
  background: #fff;
  border-radius: 7px;
  padding-bottom: 20px;
}
.login .login-form .title {
  display: block;
  text-align: center;
  margin-bottom: 25px;
  box-sizing: content-box;
  padding-top: 20px;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
}
.login .login-form .title::after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: #f2f6f7;
}

.login .login-form .title span {
  font-size: 16px;
  color: #404040;
}
.login-form .title span::after {
  content: "";
  display: block;
  width: 60px;
  height: 3px;
  margin: 0 auto;
  margin-top: 15px;
  background: #ed0536;
}

.form-item {
  padding: 0px 20px;
  margin-bottom: 15px;
}
.form-item:last-child {
  margin-bottom: 0px;
}
.form-item .form-item-container {
  border: 1px solid #f2f6f7;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  padding: 1px;
}
.form-item .form-item-container .form-icon {
  display: block;
  width: 40px;
  height: 40px;
}
.form-item .form-item-container .form-icon::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
}
.form-item .form-item-container .form-icon.icon-phone::before {
  background: url(../../static/image/icon-phone.png) center/35% no-repeat;
}
.form-item .form-item-container .form-icon.icon-lock.form-icon {
  background: url(../../static/image/icon-lock.png) center/35% no-repeat;
}

.form-item .form-item-container input {
  border: 0px;
  flex: 1;
  outline: none;
  font-size: 14px;
  color: #999999;
}

.form-item .btn-login {
  display: block;
  background: #ed0536;
  color: #fff;
  line-height: 40px;
  text-align: center;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
}
.form-item .forget-password {
  color: #999999;
  text-align: center;
  font-size: 14px;
}
</style>