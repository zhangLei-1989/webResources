<template>
  <div class="popRole" ref="parents">
    <!-- 背景层 -->
    <transition name="deleteAnimation">
      <div class="mark" v-if="isPass"></div>
    </transition>
    <transition name="deleteAnimations">
      <div class="container" v-if="isPass">
        <div class="tit">{{tit}}</div>
        <div class="close" @click="closeFn"></div>
        <div class="content">
          <b class="messagetit">{{ messageObj.title }}</b>
          <div class="messageval">
            <textarea v-model="deleteObj.cause" placeholder="输入原因(选填)"></textarea>
          </div>
        </div>
        <div class="button-box">
          <div class="button" v-for="(item, j) in buttons" :key="j" :style="{'background': item.color? item.color : '#ed0536'}" @click="button_click">{{item.name}}</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: "DeleteBtn",
    props: {
      tit: {
        type: String,
        default: '通过审核',
        required: true
      },
      messageObj: {
        type: Object,
        default: {
          title: '确定要通过该房行的企业认证吗？',
          value: '请输入原因(选填)'
        },
        required: true
      }
    },
    data () {
      return {
        isPass: false,
        buttons: [
          {
            name: "确定",
            color: ""
          }
        ],
        options: [],
        operType: '',
        deleteObj: {
          id: '',
          cause: ''
        }
      }
    },
    methods: {
      button_click () {
        let _this = this;
        let url = '';
        let sendData = {};
        sendData.id = this.deleteObj.id;
        if (this.operType === 'pass') {
          url = _this.$store.state.api.resources_adjust.update_audit_status;
          sendData.confirmType = '1';
          sendData.desc = this.deleteObj.cause;
        } else if (this.operType === 'refuse') {
          url = _this.$store.state.api.resources_adjust.update_audit_status;
          sendData.confirmType = '4';
          sendData.desc = this.deleteObj.cause;
        } else if (this.operType === 'cancel-pass') {
          url = _this.$store.state.api.resources_adjust.update_audit_status;
          sendData.confirmType = '4';
          sendData.desc = this.deleteObj.cause;
        } else if (this.operType === 'enable') {
          url = _this.$store.state.api.resources_adjust.update_status_houseLine;
          sendData.raStatus = '0';
          sendData.desc = this.deleteObj.cause;
        } else if (this.operType === 'disable') {
          url = _this.$store.state.api.resources_adjust.update_status_houseLine;
          sendData.raStatus = '1';
          sendData.desc = this.deleteObj.cause;
        } else {
          this.$message.warning('操作类型不匹配')
          return;
        }
        //console.info('url', url);
        //console.info('_this.deleteObj', _this.deleteObj);
        _this.axios({
          method: 'post',
          url: url,
          data: sendData
        }).then(res => {
          const { data } = res;
          if (data.status.code === '200') {
            this.$message.success('操作成功')

            _this.$router.go(0);
          } else {
            this.$message.error('操作失败')
          }
        });
      },
      showFn (id, operType) {
        this.deleteObj.id = id;
        this.operType = operType;
        this.isPass = true;
      },
      closeFn() {
        this.isPass = false;
        this.$emit('on-close', this.deleteObj.id);
      }
    },
    mounted () {
    }
  }
</script>
<style scoped lang="scss">
  .deleteAnimation-enter-active {
    animation: deleteAnimation-in 0.55s linear;
    animation-fill-mode: forwards;
  }
  .deleteAnimations-enter-active {
    animation: deleteAnimations-in 0.55s linear;
    animation-fill-mode: forwards;
  }

  @keyframes deleteAnimations-in {
    0% {
      transform: scale(0.1);
      opacity: 1;
    }
    80% {
      transform: scale(0.82);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  @keyframes deleteAnimation-in {
    0% {
      transform: scale(0.1);
      opacity: 1;
    }
    80% {
      transform: scale(0.82);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
  }

  .popRole{
    .mark{
      z-index: 999;
      width: 100%;
      height: 100%;
      background: #000;
      opacity: .5;
      position: fixed;
      top: 0;
      left: 0;
    }
    .container{
      position: fixed;
      left: 50%;
      top: 50%;
      margin-left: -225px;
      margin-top: -160px;
      width: 450px;
      height: 320px;
      background:#fff;
      z-index: 1000;
      /* 标题 */
      .tit{
        height: 50px;
        text-indent: 2em;
        font-size: 16px;
        color: #ed0536;
        line-height: 50px;
        border-bottom: 1px solid #f2f6f7;
      }
      /* 关闭按钮 */
      .close{
        position: absolute;
        top: 0;
        right: 0;
        height: 50px;
        width: 50px;
        cursor:pointer;
        background: url("/static/image/close_03.png") no-repeat 15px;
      }
      /* 主体内容 */
      .content{
        display: flex;
        flex-wrap: wrap;
        width: 90%;
        margin:20px 5% 0 5%;
        .messagetit{
          width: 100%;
          height: 36px;
          line-height: 36px;
          font-size: 16px;
          color: #404040;
          margin-left: 10px;
        }
        .messageval{
          width: 100%;
          height: 110px;
          padding: 10px;
          border: solid 1px #e8e8e8;
          textarea{
            width: 100%;
            height: 100%;
            resize: none;
            outline: none;
            border: none;
            font-size: 14px;
          }
        }
      }
      /* 按钮盒子 */
      .button-box{
        position: absolute;
        bottom: 30px;
        height: 50px;
        display: flex;
        justify-content: flex-end;
        width: 90%;
        margin:0 5%;
        .button{
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
