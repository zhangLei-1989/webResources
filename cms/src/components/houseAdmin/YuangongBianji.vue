<template>
  <div class="popUp" ref="parents" v-if="isShow">
    <!-- 背景层 -->
    <div class="mark"></div>
    <div class="container">
      <div class="tit">编辑员工</div>
      <div class="close" @click="closeFn"></div>
      <div class="content">
        <div class="login-container">
          <div class="box-border">登录信息</div>
          <div class="login-message">
              <div class="input-box">
            <el-input type="text" placeholder="" v-model="editObj.accountName">
              <template slot="prepend">*用户名：</template>
            </el-input>
              </div>
            <div class="input-passward">
            <el-input  v-model="editObj.accountPwd" id="user-account-pwd" :readonly="pwdDisabled" type="password">
              <template slot="append"><span @click="resetPwd" class="rest-pwd-btn">重置密码:</span></template>
              <template slot="prepend">*密码：</template>
            </el-input>
            </div>
          </div>
        </div>
        <div class="yuangong-container">
          <div class="box-border">员工信息</div>
          <div class="message-top">
            <div class="message-top-left">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false">
                <img v-if="imageUrl" :src="imageUrl" v-model="editObj.pic" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="message-top-right">
              <div class="input-box1">
              <el-input v-model="editObj.employeeNum">
                <template slot="prepend">*员工编号：</template>
              </el-input>
              </div>
              <div class="input-box1">
              <el-input v-model="editObj.nickName">
                <template slot="prepend">*姓名：</template>
              </el-input>
              </div>
              <div class="input-box1">
              <el-input v-model="editObj.phone" >
                <template slot="prepend">*手机号：</template>
              </el-input>
              </div>
                <div class="input-box1">
              <el-input v-model="editObj.idNumber" >
                <template slot="prepend">*身份证：</template>
              </el-input>
                </div>
            </div>
          </div>
          <div class="message-bottom">
            <div class="message-bottom-left">
              <div class="input-box2">
              <el-select
                v-model="editObj.dptmId"
                collapse-tags
                placeholder="房乾测试部">
                <el-option
                  v-for="item in dptmIdList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              </div>
              <div class="input-box3">
              <el-select
                v-model="editObj.roleId"
                collapse-tags
                style="margin-left: 20px;"
                placeholder="后台工程师开发部">
                <el-option
                  v-for="item in roleIdList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              </div>
            </div>
            <div class="message-bottom-right">
              <el-radio v-model="editObj.gender" label='1' text-color="#40">男</el-radio>
              <el-radio v-model="editObj.gender" label='0' text-color="#40">女</el-radio>
            </div>
          </div>
        </div>
        <div class="status-container">
          <div class="box-border">员工状态</div>
          <div class="status-top">
            <div class="input-box4">
            <el-select v-model="editObj.status + ''" placeholder="有效">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </div>
            <div class="input-box6">
            <el-select v-model="editObj.becomeStatus+ ''"  placeholder="否">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </div>
              <div class="input-box5">
            <el-date-picker
              v-model="editObj.becomeTime"
              type="date"
              placeholder="转正日期">
            </el-date-picker>
              </div>
          </div>
          <div class="status-bottom">
            <div class="input-box4">
            <el-date-picker
              v-model="editObj.inductionTime"
              style="width: 210px; float: left;"
              type="date"
              placeholder="入职日期">
            </el-date-picker>
            </div>
            <div class="input-box6">
            <el-date-picker
              style="width: 210px; float: left; margin: 0 6px;"
              v-model="editObj.mountTime"
              type="date"
              placeholder="上岗日期">
            </el-date-picker>
            </div>
            <div class="input-box6">
            <el-input  placeholder="助教" v-model="editObj.zhuJiao">
              <template slot="prepend">*助教:</template>
            </el-input>
            </div>
          </div>
          <div class="status-middle">
            <div class="input-box7">
            <el-input v-model="editObj.trainCount">
              <template slot="prepend">*培训期数：</template>
            </el-input>
            </div>
          </div>
        </div>
        <div class="detail-container" style="overflow: hidden">
          <div class="box-border">详细信息</div>
          <div class="login-message" style="height: 40px;">
            <div class="input-box4">
            <el-select v-model="editObj.wenhuacd" placeholder="文化程度">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </div>
            <div class="input-box5">
            <el-input v-model="editObj.email">
              <template slot="prepend">*邮箱：</template>
              </el-input>
            </div>
            <div class="input-box6">
            <el-input v-model="editObj.weixin">
              <template slot="prepend">*微信：</template>
              </el-input>
            </div>
          </div>
          <div class="detail1" style="margin: 8px 0; overflow: hidden">
            <div class="input-box4">
              <el-input  placeholder="QQ" v-model="editObj.qq">
                <template slot="prepend">*QQ：</template>
              </el-input>
            </div>
            <div class="input-box5">
              <el-input  placeholder="MSN" v-model="editObj.msn">
                <template slot="prepend">*MSN：</template>
              </el-input>
            </div>
            <div class="input-box5">
            <el-date-picker
              style="float: right; width: 200px;"
              v-model="editObj.birthday"
              type="date"
              placeholder="生日">
            </el-date-picker>
            </div>
          </div>
          <div class="detail2" style="margin: 8px 0">
            <div class="input-box7">
              <el-input  placeholder="家庭住址" v-model="editObj.fAddress">
                <template slot="prepend">*家庭住址：</template>
              </el-input>
            </div>
          </div>
          <div class="detail3">
            <div class="input-box4">
              <el-input  placeholder="宿舍名" style="width: 210px; float: left; " v-model="editObj.suSheName">
                <template slot="prepend">*宿舍名：</template>
              </el-input>
            </div>
            <div class="input-box5">
              <el-input  placeholder="招聘人" style="width: 210px; float: left; margin: 0 6px;" v-model="editObj.zhaoPinRen">
                <template slot="prepend">*招聘人：</template>
              </el-input>
            </div>
            <div class="input-box6">
              <el-input  placeholder="介绍人" style="width: 210px; float: left; " v-model="editObj.jieShaoRen">
                <template slot="prepend">*介绍人：</template>
              </el-input>
            </div>
          </div>

          <div class="detail4" style="margin-top: 8px;">
            <div class="input-box4">
              <el-input  placeholder="开户行" style="width: 210px; float: left; " v-model="editObj.bankCard">
                <template slot="prepend">*开户行：</template>
              </el-input>
            </div>
            <div class="input-box5">
              <el-input  placeholder="开户支行" style="width: 210px; float: left; margin: 0 6px;" v-model="editObj.openBank">
                <template slot="prepend">*开户行：</template>
              </el-input>
            </div>
            <div class="input-box6">
              <el-input  placeholder="持卡人" style="width: 210px; float: left; " v-model="editObj.bankCardName">
                <template slot="prepend">*开户行：</template>
              </el-input>
            </div>
          </div>
          <div class="detail5">
            <div class="input-box7">
              <el-input  placeholder="卡号" v-model="editObj.bankNumber">
                <template slot="prepend">*卡号：</template>
              </el-input>
            </div>
          </div>
          <div class="detail6">
            <div class="input-box8">
              <el-input  placeholder="紧急联系人" style="width: 210px; float: left; " v-model="editObj.instancyUserName">
                <template slot="prepend">*紧急联系人：</template>
              </el-input>
            </div>
            <div class="input-box9">
              <el-input  placeholder="紧急联系人电话" style="width: 430px; float: left; " v-model="editObj.instancyUserPhone">
                <template slot="prepend">*紧急联系人电话：</template>
              </el-input>
            </div>
          </div>
        </div>
        <div class="button">
          <el-button @click="editUserFn" type="primary">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'popUp',
    data () {
      return {
        method: '',
        pwdDisabled: true,
        dptmIdList: [],
        roleIdList: [],
        options1: [{
          label: '有效',
          value: '0'
        }, {
          label: '冻结',
          value: '1'
        }
        ],
        value: '',
        options2: [{
          label: '转正',
          value: '0'
        }, {
          label: '未转正',
          value: '1'
        }],

        options3: [
          {
            label: '研究生或以上',
            value: '1'
          },
          {
            label: '本科',
            value: '2'
          },
          {
            label: '大专',
            value: '3'
          },
          {
            label: '高中',
            value: '4'
          },
          {
            label: '中专',
            value: '5'
          },
          {
            label: '初中或一下',
            value: '6'
          }
        ],
        value: '',
        imageUrl: '',
        isShow: false,
        radio: '1',
        activeNames: ['1'],
        value1: '1',
        editObj: {
          zhuJiao: '',
          instancyUserPhone: '',
          instancyUserName: '',
          bankNumber: '',
          bankCardName: '',
          bankCard: '',
          jieShaoRen: '',
          openBank: '',
          zhaoPinRen: '',
          fAddress: '',
          suSheName: '',
          birthday: '',
          msn: '',
          qq: '',
          id: '',
          name: '',
          accountName: '', // 用户名
          accountPwd: '', // 密码
          pic: '', // 员工头像
          employeeNum: '', // 员工编号
          nickName: '', // 姓名
          phone: '', // 手机号
          idNumber: '', // 身份证
          dptmId: '', // 部门id
          roleId: '', // 角色id
          gender: '1', // 性别 0女 1 男
          status: '', // 状态 0有效1冻结
          becomeTime: '', // 转正日期
          wenhuacd: '', // 文化程度
          email: '', // 邮箱
          weixin: '', // 微信
          becomeStatus: '' ,// 是否转正0未转正1转正
          mountTime: '', // 上岗日期
          inductionTime: '' // 入职日期
        }
      };
    },
    methods: {
      resetPwd() {
        this.pwdDisabled = false;
        this.editObj.accountPwd = '';
        document.getElementById("user-account-pwd").focus();
      },
      editUserFn() {
        let validateResult = this.formValidate();
        if (!validateResult.status) {
          this.$message.warning(validateResult.msg);
          return;
        }
        this.updateUserFn();
      },
      updateUserFn() {
        let _this = this;
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.resources_adjust.update_jjuser,
          data: _this.editObj
        }).then(res => {
          const {data} = res;
         // console.log(res, '操作是否成功');
          if (data.status.code === '200') {
            this.$message.success('操作成功');
            _this.closeFn();
            _this.$router.go(0);
          } else {
            this.$message.error('操作失败');
          }
        });
      },
      queryDptmIdListFn() {
        //部门列表
        let id = this.editObj.id;
        let name = this.editObj.name;
        let search = {
          id: id,
          name: name
        };
        this.axios({
          method: 'post',
          url: this.$store.state.api.resources_adjust.get_houseLine_department,
          data: search
        }).then(res => {
          const {data} = res;
          console.log('部门列表',data);
          if (data.status.code === '200') {
            this.dptmIdList = data.result.list;
          }
        });
      },
      queryRoleIdListFn() {
        let id = this.editObj.id;
        let name = this.editObj.name;
        let search = {
          id: id,
          name: name
        };
        this.axios({
          method: 'post',
          url: this.$store.state.api.resources_adjust.get_houseLine_role,
          data: search
        }).then(res => {
          const {data} = res;
          console.log(data, '角色列表');
          if (data.status.code === '200') {
            this.roleIdList = data.result.list;
          }
        });
      },
      formValidate () {
        let result = {
          status: false,
          msg: ''
        };
        let accountName = this.editObj.accountName;
        let accountPwd = this.editObj.accountPwd;
        let nickName = this.editObj.nickName;
        let phone = this.editObj.phone;
        let idNumber = this.editObj.idNumber;
        let becomeTime = this.editObj.becomeTime;
        if (!this.validate(accountName, 'require')) {
          result.msg = '用户名不能为空';
          return result;
        }
        if (!this.validate(accountPwd, 'require')) {
          result.msg = '密码不能为空';
          return result;
        }
        if (!this.validate(nickName, 'require')) {
          result.msg = '姓名不能为空';
          return result;
        }
        if (!this.validate(phone, 'require')) {
          result.msg = '手机号码不能为空';
          return result;
        }
        if (!this.validate(idNumber, 'require')) {
          result.msg = '身份证不能为空';
          return result;
        }
        if (!this.validate(becomeTime, 'require')) {
          result.msg = '转正日起不能为空';
          return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
      },
      validate(value, type) {
        // 非空验证
        if (type === 'require') {
          return !!value;
        }
        // 手机号验证
        if (type === 'phone') {
          return /^1\d{10}$/.test(value);
        }
      },
      showFn (method, user) {
        console.info('我是传过来的数据',user);
        if (method ? method === 'update' : '') {
          console.info('user:', user);
          this.editObj = user;
          this.editObj.gender = user.gender===1 ? '1' : '0';
        }
        // 设置默认密码 123456
        this.editObj.accountPwd = '123456';
        this.isShow = true;
      },
      closeFn () {
        // 关闭弹出框
        this.isShow = false;
      }
    },
    mounted () {
    },
    created () {
      this.queryDptmIdListFn();
      this.queryRoleIdListFn();
    }
  };
</script>

<style scoped lang='scss'>
  .rest-pwd-btn {
    cursor: pointer;
  }
  .popUp {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1006;
    .mark {
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
    .container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 730px;
      height: 575px;
      overflow:auto;
      background: #fff;
      /* 标题 */
      .tit {
        padding: 0 80px 0 20px;
        height: 42px;
        line-height: 42px;
        border-bottom: 1px solid #eee;
        font-size: 14px;
        color: #ed0536;
        overflow: hidden;
        background-color: #F8F8F8;
        border-radius: 2px 2px 0 0;
        margin-left: 14px;
      }
      /* 关闭按钮 */
      .close {
        position: absolute;
        top: 0;
        right: 0;
        height: 50px;
        width: 50px;
        cursor: pointer;
        background: url('/static/image/close_03.png') no-repeat 15px;
      }
      /* 主体内容 */
      .content {
        display: flex;
        flex-wrap: wrap;
        width: 90%;
        height: 450px;
        margin: 20px 5% 0 5%;

        .login-container{
          width: 656px;
          height: 86px;
          .box-border {
            width: 100%;
            border-left: 2px solid #ed0536;
            height: 18px;
            padding-left: 4px;
          }
          .login-message{
            margin-top: 15px;
            width: 656px;
            height: 40px;
            .input-box{
              width: 274px;
              height: 40px;
              border: 1px solid #ccc;
              float: left;
            }
            .input-passward{
              float: right;
              width: 370px;
              height: 40px;
              border: 1px solid #ccc;
            }
          }
        }

        .yuangong-container{
          width: 656px;
          height: 140px;
          margin-bottom: 10px;
          .box-border {
            width: 100%;
            border-left: 2px solid #ed0536;
            height: 18px;
            padding-left: 4px;
          }
          .message-top{
            width: 656px;
            height: 88px;
            margin-bottom: 8px;
            .message-top-left{
              width: 88px;
              height: 88px;
              float: left;
              .avatar-uploader .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
              }
              .avatar-uploader .el-upload:hover {
                border-color: #409EFF;
              }
              .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 88px;
                height: 88px;
                line-height: 88px;
                text-align: center;
              }
              .avatar {
                width: 88px;
                height: 88px;
                display: block;
              }
            }
            .message-top-right{
              float: right;
              width: 560px;
              .input-box1{
                width: 274px;
                height: 40px;
                border: 1px solid #ccc;
                float: left;
                margin: 3px;
              }
            }
          }
          .message-bottom{
            height: 40px;
            .input-box2{
              width: 200px;
              height: 40px;
              border: 1px solid #ccc;
              float: left;
            }
            .input-box3{
              width: 200px;
              height: 40px;
              border: 1px solid #ccc;
              float: left;
              margin-left: 5px;
            }
            .message-bottom-right{
              float: right;
              width: 190px;
              height: 40px;
              padding: 13px;
            }
          }
        }
        .status-container{
          overflow: hidden;
          width: 670px;
          height: 170px;
          margin-top: 20px;
          margin-bottom: 10px;
          .box-border {
            width: 100%;
            border-left: 2px solid #ed0536;
            height: 18px;
            padding-left: 4px;
          }
          .input-box4{
            width: 202px;
            height: 40px;
            border: 1px solid #ccc;
            float: left;
            margin-left: 5px;
            margin-bottom: 5px;
          }
          .input-box5{
            width: 202px;
            height: 40px;
            border: 1px solid #ccc;
            float: right;
            margin-left: 5px;
            margin-bottom: 5px;

          }
          .input-box6{
            width: 200px;
            height: 40px;
            border: 1px solid #ccc;
            float: left;
            margin-left: 15px;
            margin-bottom: 5px;
          }
          .input-box7{
            width: 642px;
            height: 40px;
            border: 1px solid #ccc;
            float: left;
            margin-bottom: 5px;
          }
        }
        .detail-container{
          width: 670px;
          height: 360px;
          .input-box4{
            width: 202px;
            height: 40px;
            border: 1px solid #ccc;
            float: left;
            margin-left: 5px;
            margin-bottom: 5px;
          }
          .input-box5{
            width: 202px;
            height: 40px;
            border: 1px solid #ccc;
            float: right;
            margin-left: 5px;
            margin-bottom: 5px;

          }
          .input-box6{
            width: 200px;
            height: 40px;
            border: 1px solid #ccc;
            float: left;
            margin-left: 15px;
            margin-bottom: 5px;
          }
          .input-box7{
            width: 642px;
            height: 40px;
            border: 1px solid #ccc;
            float: left;
            margin-bottom: 5px;
          }
          .input-box8{
            width: 200px;
            height: 40px;
            border: 1px solid #ccc;
            float: left;
            margin-bottom: 5px;
          }
          .input-box9{
            width: 400px;
            height: 40px;
            border: 1px solid #ccc;
            float: right;
            margin-bottom: 5px;
          }
          .box-border {
            width: 100%;
            border-left: 2px solid #ed0536;
            height: 18px;
            padding-left: 4px;
          }
        }
        .button {
          width: 670px;
          height: 40px;
          .el-button{
            width: 100px;
            height: 40px;
            float: right;
            color: #f40;
          }
        }
      }
    }
  }
  /deep/ .el-input-group__prepend {
    outline: 0;
    border: none;
    background-color: #fff;
  }
  /deep/ .el-input__inner {
    border: none;
    margin-top: 1px;
    height: 37px;
    margin-left: 1px;
    width: 130px;
    padding: 0;
  }
  /deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 200px;
  }
  /deep/ .el-input-group__prepend {
    outline: 0;
    border: none;
    background-color: #fff;
    padding: 3px;
    height: 35px;
    margin-left: 2px;
  }
</style>
