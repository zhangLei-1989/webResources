<template>
  <div class="popRole" ref="parents" v-if="messageDetail">
    <!-- 背景层 -->
    <div class="mark"></div>

    <div class="container">
      <div class="tit">{{tit}}</div>
      <div class="close" @click="closeFn"></div>
      <div class="content ">
        <div class="house_peizhi">
          <h2 class="jiaoGe_title">房屋配置</h2>
          <ul id="peizhiList" class="house_peizhi_content">
          </ul>
        </div>
        <div class="house_chaoBiao">
          <h2 class="jiaoGe_title">水电抄表</h2>
          <table class="house_chaoBiaoList">
            <thead>
            <tr>
              <th>表项</th>
              <th>表数</th>
            </tr>
            </thead>
            <tbody id="yibiaoList">
            <!--<tr>-->
            <!--<td>燃气表</td>-->
            <!--<td>表数（金额）：100</td>-->
            <!--</tr>-->
            </tbody>
          </table>
        </div>
        <div class="house_fuJian">
          <h2 class="jiaoGe_title">附件</h2>
          <ul id="jiaoGePic" class="jiaoGePic"><li style="width: 100%; height: 30px; line-height: 30px; text-align: left; border: 0;">此合同没有上传附件！</li></ul>
        </div>
        <button @click="closeFn" class="determine closeJiaoGe">关闭</button>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "MessageDetails",
    data () {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        messageDetail: false,
        tit: "查看物业交割单",
        currentIndex: 0, // 消息的一个索引
        messageList: []
      }
    },
    computed: {
    },
    methods: {
      showFn () {
        this.messageDetail = true;
      },
      closeFn () {
        this.messageDetail = false;
      },
      handleRemove(file, fileList) {
       // console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
    created () {
      this.messageList = this.messageDetailList;
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
      width: 660px;
      height: 500px;
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
        width: 600px;
        height: 315px;
        padding: 20px;
        overflow: hidden;
        margin-left: 20px;
        .house_peizhi{
          width: 100%;
          height: auto;
          overflow: hidden;
          .jiaoGe_title {
            width: calc(100% - 8px);
            height: 16px;
            line-height: 16px;
            font-size: 16px;
            font-weight: normal;
            color: #404040;
            border-left: 2px solid #ed0536;
            padding-left: 6px;
            overflow: hidden;
          }
          .house_peizhi_content {
            width: calc(100% - 10px);
            height: auto;
            padding-left: 10px;
            margin: 15px 0;
            overflow: hidden;
          }
        }
        .house_chaoBiao{
          .jiaoGe_title {
            width: calc(100% - 8px);
            height: 16px;
            line-height: 16px;
            font-size: 16px;
            font-weight: normal;
            color: #404040;
            border-left: 2px solid #ed0536;
            padding-left: 6px;
            overflow: hidden;
          }
          .house_chaoBiaoList {
            width: calc(100% - 10px);
            height: auto;
            margin: 15px 0 15px 10px;
            overflow: hidden;
            thead{
              width: 100%;
              height: 46px;
              line-height: 46px;
              background: #F2F6F7;
              overflow: hidden;
              tr{
                display: table-row;
                vertical-align: inherit;
                border-color: inherit;
                th{
                  width: 50%;
                  color: #666;
                  font-size: 16px;
                  text-align: center;
                  border: 1px solid #E6E7E9;
                }
              }
            }
            tbody{
              width: 100%;
              height: auto;
              overflow: hidden;
            }
          }
        }
        .house_fuJian {
          width: 100%;
          height: auto;
          overflow: hidden;
          .jiaoGe_title {
            width: calc(100% - 8px);
            height: 16px;
            line-height: 16px;
            font-size: 16px;
            font-weight: normal;
            color: #404040;
            border-left: 2px solid #ed0536;
            padding-left: 6px;
            overflow: hidden;
          }
          .jiaoGePic {
            width: 100%;
            height: auto;
            margin-top: 15px;
            overflow: hidden;
            li{
              width: 100%;
              height: 30px;
              line-height: 30px;
              text-align: left;
              border: 0;
            }
          }
        }
        .closeJiaoGe {
          width: auto;
          height: 44px;
          line-height: 44px;
          float: right;
          border: 0;
          border-radius: 4px;
          padding: 0 30px;
          cursor: pointer;
          margin-top: 20px;
          overflow: hidden;
          color: #ffffff;
          background: #ed0536;
          font-size: 16px;
        }
      }
    }
  }
</style>
