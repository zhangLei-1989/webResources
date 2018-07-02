<template>
  <div class="dialog" v-if="isShow">
    <!-- 背景层 -->
    <div class="mark"></div>

    <div class="container">
      <div class="tit">{{tit}}</div>
      <div class="close" @click="closeFn"></div>

      <div class="content">
        <div class="accounts">
          <div v-for="(item, j) in accounts" :key="j" :class="item.index === accounts_index ? 'active' : ''" @click="accounts_click(item.index)">
            {{item.name}}
          </div>
        </div>
        <div class="inputs">
          <el-input  v-model="editObj.partner">
            <span>*</span>
            <template slot="prepend">*商户号</template>
          </el-input>
          <el-input  v-model="editObj.key">
            <template slot="prepend">*APP ID</template>
          </el-input>
          <el-input :disabled="accounts_index===0"  v-model="editObj.weixinAppkey">
            <template slot="prepend">*APP密钥</template>
          </el-input>
          <el-input :disabled="accounts_index===0"  v-model="editObj.weixinApikey">
            <template slot="prepend">*API密钥</template>
          </el-input>
        </div>
      </div>

      <div class="button-box">
        <div class="button" :style="{'background': '#a1aab3'}" @click="closeFn">取消</div>
        <div class="button" :style="{'background': '#ed0536'}" @click="button_click">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "dialog",
    props: {},
    data() {
      return {
        isShow: false,
        currentId: '',
        tit: "支付设置",
        content: {
          tip: "确定要删除吗？",
          textarea: "必须输入删除原因",
        },
        inputs: [],
        accounts: [
          {
            name: "支付宝支付",
            index: 0,
          },
          {
            name: "微信支付",
            index: 1,
          },
          {
            name: "银联支付",
            index: 2,
          },
        ],
        accounts_index: 0,
        editObj: {
          gcid: '', // 公司id
          type: '1', // 账户类型：1支付宝 2银联 3微信
          partner: '', // 商户号/合作者身份id
          key: '', // APP ID/安全验证码
          weixinAppkey: '', // APP KEY
          weixinApikey: ''
        }
      };
    },
    methods: {
      button_click() {
        let validateResult = this.formValidate();
        if (!validateResult.status) {
          this.$message.warning(validateResult.msg);
          return;
        }
        this.axios({
          method: 'post',
          url: this.$store.state.api.resources_adjust.payment_setting,
          data: this.editObj
        }).then(res => {
         // console.log(res);
          const {data} = res;
          if (data.status.code === '200') {
            this.$message.success('操作成功');
            this.closeFn();
            this.$router.go(0);
          } else {
            this.$message.error('操作失败');
          }
        });
      },
      closeFn() {
        this.isShow = false;
        this.$emit('on-close', this.currentId);
      },
      showFn(gcid, id) {
        this.editObj.gcid = gcid;
        this.currentId = id;
        this.isShow = true;
      },
      accounts_click(index) {
        this.accounts_index = index;
        this.editObj.type = index + 1 + '';
      },
      formValidate () {
        let result = {
          status: false,
          msg: ''
        };
        let partner = this.editObj.partner;
        let appId = this.editObj.key;
        let appKey = this.editObj.weixinAppkey;
        let weixinApikey = this.editObj.weixinApikey;

        if (!this.validate(partner, 'require')) {
          result.msg = '商户号不能为空';
          return result;
        }

        if (!this.validate(appId, 'require')) {
          result.msg = 'APP ID不能为空';
          return result;
        }
        if (this.accounts_index === 0 && !this.validate(appKey, 'require')) {
          result.msg = 'APP 密钥不能为空';
          return result;
        }
        if (this.accounts_index === 0 && !this.validate(weixinApikey, 'require')) {
          result.msg = 'API 密钥不能为空';
          return result;
        }

        result.status = true;
        result.msg = '验证通过';
        return result
      },
      validate(value, type) {
        // 非空验证
        if (type === 'require') {
          return !!value;
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .clearboth:after {
    content: "";
    height: 0;
    width: 0;
    display: block;
    clear: both;
  }

  .dialog {
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
      width: 450px;
      height: 450px;
      background: #fff;
      /* 标题 */
      .tit {
        height: 50px;
        text-indent: 2em;
        font-size: 16px;
        color: #ed0536;
        line-height: 50px;
        border-bottom: 1px solid #f2f6f7;
        background: #fff;

      }
      /* 关闭按钮 */
      .close {
        position: absolute;
        top: 0;
        right: 0;
        height: 50px;
        width: 50px;
        cursor: pointer;
        background: url("/static/image/close_03.png") no-repeat 15px;
      }
      /* 主体内容 */
      .content {
        width: 90%;
        margin: 0 5%;
        height: 270px;
        background: #e6eced;
        margin-top: 25px;
        .accounts {
          display: flex;
          width: 100%;
          height: 36px;
          line-height: 36px;
          & > div {
            flex: 1;
            text-align: center;
            background: #f2f6f7 url("/src/assets/images/pay_03.png") no-repeat 12px 12px;
            cursor: pointer;
            &.active {
              background: #e6eced url("/src/assets/images/pay_06.png") no-repeat 12px 12px;
            }
          }
        }
        .inputs {
          width: 90%;
          margin: 0 5%;
          margin-top: 2px;
          & > div {
            width: 100%;
            margin-top: 10px;
            & /deep/ div.el-input-group__prepend {
              border: 0;
              background: #fff;
              box-sizing: border-box;
            }
            & /deep/ input.el-input__inner {
              border: 0;
              background: #fff;
              box-sizing: border-box;
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
          background: #ccc;
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
</style>
