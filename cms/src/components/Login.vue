<template>
  <el-container v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
    <div class="login-bg">
      <div class="login">
        <img src="../../static/image/logo.png" class="logo" />
        <form class="login-form">
          <h1 class="title"><span>密码登录</span></h1>
          <div class="form-item">
            <div class="form-item-container">
              <label for="username" id="phoneicon" class="form-icon icon-phone"></label>
              <input id="username" type="text" placeholder="手机号/用户名" @focus="focus('phoneicon','active')" @blur="blur('phoneicon','form-icon icon-phone')" spellcheck="false" v-model.trim="username" />
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-container">
              <label for="password" id="lockicon" class="form-icon icon-lock"></label>
              <input id="password" type="password" placeholder="密码" @keyup.enter="login" @focus="focus('lockicon','active1')" @blur="blur('lockicon','form-icon icon-lock')" v-model.trim="password" />
            </div>
          </div>
          <div class="form-item">
            <a class="btn-login" v-on:click="login">登录</a>
          </div>
        </form>
      </div>
    </div>
  </el-container>
</template>

<script>
import Validation from "../../static/js/validation.js";
import tool from "../../static/js/tool.js";

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
    login() {
      const self = this,
      validate = new Validation();

      validate.addRule(
        Validation.rules.isEmptyOrNull,
        self.username,
        "用户名不能为空！"
      );
      validate.addRule(
        Validation.rules.isEmptyOrNull,
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
            url: self.$store.state.api.login.pc_login,
            data: {
              userName: self.username,
              userPwd: self.password
            }
          })
          .then(function(response) {
            const { data } = response;
            if (data.status.code == 200) {
              tool.session.set("userInfo", data.result);
              self.loading = false;
              self.$router.replace("/home");
            }
            if (data.status.code == 1007) {
              self.loading = false; 
              self.$message.error(data.status.msg);
            }
          })
          .catch(function(error) {
            self.loading = false;
            self.$message.error(error);
          });
      }
    },
    focus(id,isactive) {
      const phone = document.getElementById(id);
      phone.className = isactive;
    },
    blur(id,active) {
      const phone = document.getElementById(id);
      phone.className = active;
    }
  },
  created() {
    const self = this;
  }
};
</script>

<style scoped>
.login-bg {
  width: 100vw;
  height: 100vh;
  background: url(../../static/image/login_bg.jpg) no-repeat;
  background-size: 100vw 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  width: 25vw;
}
.login .logo {
  display: block;
  margin: 0 auto;
  width: 9vw;
  margin-bottom: 2vw;
}
.login .login-form {
  background: #fff;
  border-radius: 7px;
  padding-bottom: 7vh;
  overflow: hidden;
}
.login .login-form .title {
  display: block;
  text-align: center;
  margin-bottom: 5vh;
  box-sizing: content-box;
  padding-top: 2vh;
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
  width: 4.5vw;
  height: 3px;
  margin: 0 auto;
  margin-top: 2vh;
  background: #ed0536;
}

.form-item {
  padding: 0px 3vw;
  margin-bottom: 1vw;
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
  width: 3vw;
  height: 3vw;
}
.form-item .form-item-container .active {
  display: block;
  width: 3vw;
  height: 3vw;
}
.form-item .form-item-container .active1 {
  display: block;
  width: 3vw;
  height: 3vw;
}
.form-item .form-item-container .form-icon::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
}
.form-item .form-item-container .active::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
}
.form-item .form-item-container .active1::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
}
.form-item .form-item-container .form-icon.icon-phone::before {
  background: url(../../static/image/icon-phone.png) center/35% no-repeat;
}
.form-item .form-item-container .active::before {
  background: url(../../static/image/icon-phone-l.png) center/35% no-repeat;
}
.form-item .form-item-container .form-icon.icon-lock::before {
  background: url(../../static/image/icon-lock.png) center/35% no-repeat;
}
.form-item .form-item-container .active1::before {
  background: url(../../static/image/icon-lock-l.png) center/35% no-repeat;
}

.form-item .form-item-container input {
  border: 0px;
  flex: 1;
  outline: none;
  font-size: 14px;
  color: #333;
}

.form-item .btn-login {
  display: block;
  background: #ed0536;
  color: #fff;
  line-height: 3vw;
  text-align: center;
  border-radius: 3px;
  font-size: 14px;
}
</style>