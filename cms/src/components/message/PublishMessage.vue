<template>
  <div class="popRole" ref="parents" v-if="publishMessage">
    <!-- 背景层 -->
    <div class="mark"></div>

    <div class="container">
      <div class="tit">发布消息</div>
      <div class="close" @click="closeFn"></div>

      <div class="content">
        <div class="mingcheng">
          <div class="tip">接受对象：</div>
          <div class="input must">
            <el-select class="select" v-model="param.receiveObject">
              <el-option v-for="item in publisherList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
                {{item.label}}</el-option>
            </el-select>
          </div>
        </div>
        <div class="miaoshu">
          <div class="tip">标题：</div>
          <div class="input must">
            <input type="text" maxlength="20" v-model="param.title">
          </div>
          <div class="xz"><span>{{count.title}}</span>/20</div>
        </div>
        <div class="neirong">
          <div class="tip">公告内容：</div>
          <div class="input must" >
            <textarea maxlength="100" v-model="param.content"></textarea>
          </div>
          <div class="xz"><span>{{count.content}}</span>/100</div>
        </div>
      </div>

      <div class="button-box">
        <div class="button" style="{'background': '#ed0536'}" @click="button_click">保存</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'publish-Message',
    // props: {
    //   publisherList: {
    //     type: Array,
    //     default: [],
    //     required: true
    //   }
    // },
    data () {
      return {
        count: {
          title: 0,
          content: 0
        },
        publishMessage: false,
        loading: false,
        param: {
          ctId: '',
          receiveObject: '',
          title: '',
          content: ''
        },
        publisherList: [
          {
            value: '1',
            label: 'B端用户'
          }, {
            value: '2',
            label: 'C端用户'
          }
        ]
      }
    },
    methods: {
      button_click () {
        let receiveObject = this.param.receiveObject;
        let title = this.param.title;
        let content = this.param.content;
        if (!receiveObject) {
          this.$message.warning('请选择接受对象')
          return;
        }
        if (!title) {
          this.$message.warning('请填写标题')
          return;
        }
        if (!content) {
          this.$message.warning('请填写发布内容')
          return;
        }
        let _this = this
        _this.loading = true;
        this.axios({
          method: 'post',
          url: _this.$store.state.api.message.get_message_insert,
          data: _this.param
        }).then(res => {
          const { data } = res;
          if (data.status.code === '200') {
            this.$message.warning('请填写发布内容')

            _this.$router.go(0);
          } else {
            this.$message.warning('请填写发布内容')

          }
          _this.loading = false;
          // 弹窗
        }).catch(error => {
          //console.log(error);
          _this.loading = false;
        });
      },
      showFn () {
        this.publishMessage = true;
      },
      closeFn () {
        this.publishMessage = false;
      }
    },
    mounted () {
      this.param.ctId = this.userInfo.userId;
    },
    computed: {
      userInfo: function () {
        return this.$store.state.userInfo;
      }
    },
    watch: {
      param: {
        handler: function (val, oldVal) {
          // console.info('newParam', val);
          // console.info('oldVal', oldVal);
          this.count.title = val.title.length;
          this.count.content = val.content.length;
        },
        deep: true
      },
    }
  }
</script>
<style scoped lang="scss">

  .popRole{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 999;
    .mark{
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
    .container{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 600px;
      height: 450px;
      background:#fff;
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
        .mingcheng{
          width: 100%;
          position: relative;
          margin-bottom: 10px;
          overflow: hidden;
          .tip{
            position: absolute;
            top: 0;
            left: 15px;
          }
          .select{
            width: 460px;
            height: 100%;
            border: none;
            outline: none;
            position: absolute;
            right: 0;
            top: 0;
          }
        }
        .miaoshu{
          width: 100%;
          position: relative;
          margin-bottom: 10px;
          .tip{
            position: absolute;
            top: 0;
            left: 15px;
          }
          .input{
            width: 100%;
            padding-left: 75px;
          }
          .xz{
            height: 100%;
            position: absolute;
            right: 10px;
            top: 0;
          }
        }
        .neirong{
          border: none;
          border:solid 1px #e6e6e6;
          width: 100%;
          height: 200px;
          outline: none;
          position: relative;
          overflow: hidden;
          .tip{
            position: absolute;
            line-height: 22px;
            top: 0;
            left: 13px;
            color: #a2a2a2;
          }
          textarea{
            width: 540px;
            height: 100%;
            border: none;
            outline: none;
            position: absolute;
            top: 20px;
            left: 1px;
            font-size: 12px;
          }
          .xz{
            position: absolute;
            bottom: 0;
            right: 10px;
          }
        }
        &>div{
          &>.must:after{
            content: "*";
            position: absolute;
            top: 10px;
            left: 5px;
            color: red;
            line-height: 0;
          }
          position: relative;
          display: flex;
          height:40px;
          border:1px solid #e6e6e6;
          line-height: 34px;
          justify-content: space-around;
          input{
            width: 100%;
            height: 30px;
            border:0;
            outline: none;
            box-sizing: border-box;
            line-height: 30px;
          }
          /* 下拉框 */
          .select{
            /* 下拉icon三角 */
            .select-icon{
              height: 0;
              width: 0;
              border:5px solid transparent;
              position: absolute;
              top: 14px;
              right: 5px;
              border-top-color:#ccc;
            }
            .select-icon-bottom{
              top: 10px;
              border-top-color: transparent;
              border-bottom-color: #ccc;
            }
            .select-list{
              display: none;
              position: absolute;
              top: 20px;
              left: 0;
              width: 100%;
              max-height: 200px;
              background: #fff;
              z-index: 99;
              border:1px solid #e6e6e6;
              border-top: 0;
              cursor: pointer;
              overflow-y: auto;
              li{
                margin-left: -40px;
                text-align: center;
              }
              li:hover{
                color: #ccc;
              }

            }
          }
        }
      }
      /* 按钮盒子 */
      .button-box{
        position: absolute;
        bottom: 15px;
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
  /deep/ .el-input--suffix .el-input__inner {
    padding-right: 30px;
    border: none;
    margin: 1px;
    height: 34px;
    font-size: 12px;
  }

  /deep/ .el-select-dropdown__list .el-select-dropdown__item {
    font-size: 12px;
  }

</style>
