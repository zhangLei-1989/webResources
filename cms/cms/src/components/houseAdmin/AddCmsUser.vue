<template>
  <div class="popUp" ref="parents" v-if="isShow">
    <!-- 背景层 -->
    <div class="mark"></div>

    <div class="container">
      <div class="tit">{{method==='update' ? '修改用户' : '新增用户'}}</div>
      <div class="close" @click="closeFn"></div>
      <div class="content">
        <div class="input must appartment-add">
          <span class=" plachoder plachoder5"><i class="position-icon">*</i>公寓名称 :</span>
          <input size="large" v-model="editUserObj.brandName" class="add-input"/>
        </div>
        <div class="input must appartment-add">
          <span class="plachoder plachoder6"><i class="position-icon">*</i>城市/区域 :</span>
          <el-cascader
            placeholder=""
            :options="cityTreeData"
            filterable
            clearable
            change-on-select
            v-model="cityIdList"
            :props="cityProps"
            >
          </el-cascader>
        </div>
        <div class="input must appartment-add">
          <span class="plachoder plachoder1"><i class="position-icon">*</i>联系人姓名 :</span>
          <input size="large" v-model="editUserObj.nickName" class=" add-input" />
        </div>
        <div class="input must appartment-add">
          <span class="plachoder plachoder2"><i class="position-icon">*</i>手机号 :</span>
          <input size="large"
                 v-model="editUserObj.phone"
                 class="add-input"/>
        </div>
        <div class="input must appartment-add">
          <span class="plachoder plachoder3"><i class="position-icon">*</i>验证码 :</span>
          <input
                 size="small"
                 v-model="editUserObj.code"
                 class="input-name">
          <div>
              <pc-timer-button :disabled="method === 'update'"
                               :class="method === 'update' ? 'disabled-button' : ''"
                               ref="timerBtn" @on-run="sendPhoneCode" @on-stop="isTimerStop = true">发送验证码
              </pc-timer-button>
          </div>

        </div>
        <div class="input must appartment-add">
          <span class="plachoder plachoder4"><i class="position-icon">*</i>密码 :</span>
          <input size="large" @focus="clearPwdFn" v-model="editUserObj.accountPwd" type='password' class="add-input"/>
        </div>
      </div>
      <div class="button-box">
        <div class="button" v-if="method==='add'" style="{'background': '#ed0536'}" @click="addUserFn">保存</div>
        <div class="button" v-if="method==='update'" style="{'background': '#ed0536'}" @click="editUserFn">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
  import PcTimerButton from '../public/form/timer-button/index.vue';

  export default {
    name: 'popUp',
    data() {
      return {
        isModifyPwd: false,
        isShow: false,
        method: '',
        tit: '新增用户',
        cityTreeData: [],
        cityIdList: [],
        cityProps: {
          value: 'id',
          label: 'name',
          children: 'children'
        },
        isTimerStop: true,
        editUserObj: {
          phone: '', // 联系电话
          nickName: '', // 昵称
          accountPwd: '', // 密码
          brandName: '', // 公寓名称
          // raCompanyCityId: '', // 城市id
          // raCompanyAreaId: '', // 区域id
          areaId: '', // 区域id
          cityId: '', // 区域id
          companyCityId: '', // 新增城市id
          companyCityName: '', // 新增城市名称
          code: '' // 验证码
        },
        options: []
      };
    },
    components: {
      PcTimerButton
    },
    methods: {
      clearPwdFn() {
        this.isModifyPwd = true;
        this.editUserObj.accountPwd = '';
      },
      formValidate() {
        let result = {
          status: false,
          msg: ''
        };
        let brandName = this.editUserObj.brandName;
        let nickName = this.editUserObj.nickName;
        let phone = this.editUserObj.phone;
        let code = this.editUserObj.code;
        let accountPwd = this.editUserObj.accountPwd;

        if (!this.validate(brandName, 'require')) {
          result.msg = '公寓名称不能为空';
          return result;
        }

        let cityIdList = this.cityIdList;
        console.info('cityIdList', cityIdList);
        if (!cityIdList || cityIdList.length < 2) {
          result.msg = '请选择城市/区域';
          return result;
        } else {
          this.editUserObj.companyCityId = cityIdList[0];
          this.editUserObj.areaId = cityIdList[1];
        }

        if (!this.validate(nickName, 'require')) {
          result.msg = '联系人姓名不能为空';
          return result;
        }
        result.msg = '手机号码不能为空';

        if (!this.validate(phone, 'require')) {
          result.msg = '手机号码不能为空';
          return result;
        }

        if (!this.validate(phone, 'phone')) {
          result.msg = '手机号码格式不正确';
          return result;
        }

        if (this.method === 'add' && !this.validate(code, 'require')) {
          result.msg = '验证码不能为空';
          return result;
        }

        if (!this.validate(accountPwd, 'require')) {
          console.log('密码是啥', accountPwd);
          result.msg = '密码不能为空';
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
      sendPhoneCode() {
        let mobileNo = this.editUserObj.phone;
        this.isTimerStop = false;
        if (!mobileNo) {
          this.$message.warning('手机号码不能为空');
          return;
        }
        this.$refs.timerBtn.start();
        this.axios({
          method: 'POST',
          url: this.$store.state.api.resources_adjust.get_houseLine_code,
          data: {
            phone: mobileNo
          }
        }).then((res) => {
         // console.log(res, '验证码');
          if (res.status.code === 200) {
            console.info('发送验证码成功');
          } else {
            console.info('发送验证码失败');
            // this.$refs.timerBtn.stop();
          }
        });
      },
      require_verification_code(fn) {
        let mobileNo = this.editUserObj.phone;
        let code = this.editUserObj.code;
        if (!mobileNo) {
          this.$message.warning('手机号码不能为空');
          return;
        }
        if (!code) {
          this.$message.warning('验证码不能为空');
          return;
        }
        this.axios({
          method: 'POST',
          url: this.$store.state.api.resources_adjust.get_houseLine_verification,
          data: {
            phone: mobileNo,
            code: code
          }
        }).then((res) => {
          if (res.data.status.code === '1001') {
            this.$message.success('验证码通过');
            fn && fn();
          } else {
            this.$message.error('验证码错误');
          }
        });
      },
      editUserFn() {
        let validateResult = this.formValidate();
        if (!validateResult.status) {
          this.$message.warning(validateResult.msg);
          return;
        }
        this.updateUserFn();
      },
      addUserFn() {
        let validateResult = this.formValidate();
        if (!validateResult.status) {
          this.$message.warning(validateResult.msg);
          return;
        }
        this.require_verification_code(
          () => {
            console.info('校验通过');
            this.insertUserFn();
          }
        );
      },
      updateUserFn() {
        if (!this.isModifyPwd) {
          this.editUserObj.accountPwd = '';
        }
        // 用户管理编辑保存
        let _this = this;
        this.axios({
          method: 'post',
          url: this.$store.state.api.resources_adjust.update_jjuser_two,
          data: this.editUserObj
        }).then(res => {
          const {data} = res;
         // console.log(res, '操作是否成功');
          if (data.status.code === '200') {
            this.$message.success('操作成功');
            _this.closeFn();
            // _this.$router.go(0);
          } else {
            this.$message.error('操作失败');
          }
        });
        // _this.$router.go(0);
      },
      insertUserFn() {
        // 用户管理新增保存
        let _this = this;
        this.axios({
          method: 'post',
          url: this.$store.state.api.resources_adjust.insert_jjuser,
          data: this.editUserObj
        }).then(res => {
          const {data} = res;
          // console.log(res, '操作是否成功');
          if (data.status.code === '200') {
            this.$message.success('操作成功');
            _this.closeFn();
            _this.$router.go(0);
            _this.$emit('on-save-success');
          } else {
            this.$message.error('操作失败');
          }
        });
      },
      showFn(method, user) {
        console.info(user);
        this.method = method;
        if (method === 'update') {
          this.editUserObj = user;
          if (user.companyCityId && user.areaId) {
            let companyCityId = user.companyCityId;
            let areaId = user.areaId;
            this.cityIdList.push(companyCityId, areaId);
          }
        }
       // this.editUserObj.accountPwd = '';

        this.isShow = true;
      },
      closeFn() {
        // 关闭弹出框
        this.isShow = false;
      },
      queryCityList() {
        // 查询城市集合
        let _this = this;
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.house.get_citySelectTwo_list, // 查公寓url
          data: ''
        }).then(res => {
          const {data} = res;
          if (data.status.code === '200') {
            if (!data.result) {
             // console.error('查询到的城市列表为空');
              return;
            }
            _this.cityTreeData = data.result.cityList;
          }
        });
      }
    },
    mounted() {
    },
    created() {
      this.queryCityList();
    }
  };
</script>

<style scoped lang='scss'>
  .el-input--suffix .el-input__inner {
    padding-right: 30px;
    border: none;
  }
  .disabled-button {
    pointer-events: none;
  }
  .popUp {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 999;
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
      width: 600px;
      height: 350px;
      background: #fff;
      /* 标题 */
      .tit {
        height: 50px;
        text-indent: 2em;
        font-size: 16px;
        color: #ed0536;
        line-height: 50px;
        border-bottom: 1px solid #f2f6f7;
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
        margin: 20px 5% 0 5%;
        .appartment-add{
          border: 1px solid #ccc;
          height: 40px;
          padding-left: 5px;
          position: relative;
          .plachoder{
            display: block;
            height: 40px;
            line-height: 43px;
            width: 90px;
            .position-icon{
              position: absolute;
              width: 2px;
              height: 2px;
              top: -10px;
              left: 2px;
              color: #f00;

            }
          }
          .plachoder5{
            width: 70px;
          }
          .plachoder6{
            width: 95px;
          }
          .plachoder2{
            width: 55px;
          }
          .plachoder3{
            width: 100px;
          }
          .plachoder4{
            width: 47px;
          }
          .add-input{
            height: 37px;
            width: 200px;
            margin-top: 1px;
          }
          .input-name{
            height: 37px;
            margin-top: 1px;

          }
        }
        & > div {
          &:nth-child(even) {
            margin-left: 2%;
            margin-top: 10px;
            width: 48%;
          }
          &:nth-child(odd) {
            margin-top: 10px;
            margin-right: 2%;
            width: 48%;
          }
          & > .must:after {
            content: '*';
            position: absolute;
            top: 10px;
            left: 5px;
            color: red;
            line-height: 0;
          }
          position: relative;
          display: flex;
          height: 34px;
          line-height: 34px;
          justify-content: space-around;
          input {
            width: 100%;
            height: 38px;
            border: 0;
            outline: none;
            box-sizing: border-box;
            line-height: 30px;
          }
          /* 下拉框 */
          .select {
            /* 下拉icon三角 */
            .select-icon {
              height: 0;
              width: 0;
              border: 5px solid transparent;
              position: absolute;
              top: 14px;
              right: 5px;
              border-top-color: #ccc;
            }
            .select-icon-bottom {
              top: 10px;
              border-top-color: transparent;
              border-bottom-color: #ccc;
            }
            .select-list {
              display: none;
              position: absolute;
              top: 20px;
              left: 0;
              width: 100%;
              max-height: 200px;
              background: #fff;
              z-index: 99;
              /*border: 1px solid #e6e6e6;*/
              /*border-top: 0;*/
              cursor: pointer;
              overflow-y: auto;
              li {
                margin-left: -40px;
                text-align: center;
              }
              li:hover {
                color: #ccc;
              }

            }
          }
        }
      }
      /* 按钮盒子 */
      .button-box {
        position: absolute;
        bottom: 30px;
        height: 50px;
        display: flex;
        justify-content: flex-end;
        width: 90%;
        margin: 0 5%;
        .button {
          width: 100px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          border-radius: 5px;
          background: #ed0536;
          color: #fff;
          font-size: 16px;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
  }
  /deep/ .el-input{
    border: none;
  }
  /deep/ .el-cascader {
    display: inline-block;
    position: relative;
    font-size: 14px;
    line-height: 39px;
    width: 260px;
    border: none;
    .el-input__inner {
      border: none;
      height: 36px;
    }
  }


  .el-button--text {
    color: #ed0536;
    padding-right: 2px;
  }
</style>
