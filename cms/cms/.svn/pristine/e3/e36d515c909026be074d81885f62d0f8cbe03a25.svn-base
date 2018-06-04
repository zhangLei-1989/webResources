<template>
  <div class="popRole" ref="parents">
    <!-- 背景层 -->
    <transition name="deleteAnimation">
      <div class="mark" v-if="isDelete"></div>
    </transition>
    <transition name="deleteAnimations">
      <div class="container" v-if="isDelete">
        <div class="tit">{{tit}}</div>
        <div class="close" @click="closeFn"></div>
        <div class="content">
          <div v-if="!imageUrl">暂无数据</div>
          <img v-if="imageUrl" :src="imageUrl" style="width: 1000px; height: 650px">
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isDelete: false,
        imageUrl: ''
      };
    },
    props: {
      tit: {
        type: String,
        default: '查看图片',
        required: true
      }
    },
    methods: {
      showFn (url) {
        this.imageUrl = url;
        this.isDelete = true;
      },
      closeFn() {
        this.isDelete = false;
      }
    },
    mounted () {
    }
  };
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
      z-index: 1001;
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
      margin-left: -500px;
      margin-top: -350px;
      width: 1000px;
      height: 650px;
      background:#fff;
      z-index: 1002;
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
        width: 1000px;
        margin:20px 5% 0 5%;
        position: relative;
        img {
          position: absolute;
          top: -10px;
          left: -50px;
        }
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
