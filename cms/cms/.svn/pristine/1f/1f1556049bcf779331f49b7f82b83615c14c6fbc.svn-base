<template>
  <div class="popRole" ref="parents" v-if="messageDetail">
    <!-- 背景层 -->
    <div class="mark"></div>

    <div class="container">
      <div class="tit">{{tit}}</div>
      <div class="close" @click="closeFn"></div>
      <div class="content">
        <b class="messagetit">{{ messageList[currentIndex].title}}</b>
        <span class="messagetime">{{ messageList[currentIndex].ct}}</span>
        <p class="messageval">{{ messageList[currentIndex].content}}</p>
      </div>
      <div class="button-box">
        <div class="button" v-if="messageList && messageList.length > 1" :style="{'color': backBtnColor}" @click="backStep">&lt;上一篇</div>
        <div class="button" v-if="messageList && messageList.length > 1" :style="{'color': nextBtnColor}" @click="nextStep">下一篇&gt;</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "MessageDetails",
    data () {
      return {
        title: '',
        ct: '',
        content: '',
        messageDetail: false,
        tit: "消息详情",
        currentIndex: 0, // 消息的一个索引
        messageList: []
      }
    },
    // props: {
    //   messageDetailList: {
    //     type: Array,
    //     default: [],
    //     required: true,
    //     title: ''
    //   }
    // },
    computed: {
      backBtnColor () {
        if (this.currentIndex === 0) {
          return '#a2a2a2';
        } else {
          return '#ed0536';
        }
      },
      nextBtnColor () {
        if (this.currentIndex === this.messageList.length -1) {
          return '#a2a2a2';
        } else {
          return '#ed0536';
        }
      }
    },
    methods: {
      showFn (list, index) {
        //console.info('list', list);
        //console.info('index', index);
        this.messageList = list;
        this.currentIndex = index;
        this.messageDetail = true;
      },
      closeFn () {
        this.messageDetail = false;
      },
      /**
       * 上一步
       */
      backStep () {
        this.$emit('queryDetailMessageFn', 'scope.row.id')
        if (this.currentIndex === 0) {
          return;
        }
        this.currentIndex -= 1;
        //console.info('currentIndex', this.currentIndex);
        //console.info('this.messageList.length -1', this.messageList.length - 1);
      },
      /**
       * 下一步
       */
      nextStep () {
        if (this.currentIndex === this.messageList.length - 1) {
          return;
        }
        this.currentIndex += 1;
        //console.info('currentIndex', this.currentIndex);
        //console.info('this.messageList.length -1', this.messageList.length - 1);
      }
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
      height: 510px;
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
        .messagetit{
          width: 100%;
          height: 36px;
          text-align: center;
          line-height: 36px;
          font-size: 22px;
          font-weight: normal;
          color: #404040;
        }
        .messagetime{
          width: 100%;
          height: 24px;
          text-align: center;
          line-height: 24px;
          font-size: 12px;
          color: #a0a0a0;
          position: relative;
          margin-bottom: 40px;
        }
        .messagetime:after{
          width: 35px;
          height: 3px;
          content:'';
          background: #ed0535;
          display:block;
          position: absolute;
          bottom: -10px;
          left: 50%;
          margin-left: -17.5px;
        }
        .messageval{
          font-size: 14px;
          color: #666666;
          line-height: 35px;
        }
      }
      /* 按钮盒子 */
      .button-box{
        position: absolute;
        bottom: 1px;
        height: 50px;
        display: flex;
        justify-content: flex-end;
        width: 90%;
        margin:0 5%;
        .button{
          width: 100px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          background: none !important;
          font-size: 16px;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
  }
</style>
