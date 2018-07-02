<template>
  <div class="dialog" ref="parents" v-if="isShowDialog">
    <!-- 背景层 -->
    <div class="mark"></div>

    <div class="container">
      <div class="tit">{{tit}}</div>
      <div class="close" @click="close_dialog"></div>

      <div class="content">
        <p class="tip">{{content.tip}}</p>
        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 6}" :placeholder="content.textarea"></el-input>
      </div>

      <div class="button-box">
        <div class="button" v-for="item in buttons">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "dialog",
    props:{

    },
    data () {
      return {
        isShowDialog: false,
        tit: "批量删除",
        content: {
          tip: "确定要批量删除选中信息吗？",
          textarea: "输入原因(选填)",
        },
        inputs: [

        ],
        buttons: [
          {
            name: "确定"
          }
        ]
      }
    },
    methods: {
      close_dialog () {
        this.$refs.parents.style.display = "none";
      }
    }
  }
</script>

<style scoped lang="scss">
  .dialog{
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
      height: 350px;
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
        .tip{
          font-size: 18px;
          color: #000;
          margin: 10px 0;
        }
      }
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
