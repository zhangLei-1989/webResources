<template>
  <div class="popRole" ref="parents" v-if="messageDetail">
    <!-- 背景层 -->
    <div class="mark"></div>

    <div class="container">
      <div class="tit">{{tit}}</div>
      <div class="close" @click="closeFn"></div>
      <div class="content ">
        <div class="certificate">
            <div class="certificate-main">
              <div class="img-load">
                <div v-for="(item, index) in tubImg">
                  <img v-if="index < 2" class="preview-img change-img" :src="item.src" height="160" @click="$preview.open(index, tubImg)">
                </div>
                <p v-if="!tubImg || tubImg.length === 0" class="tipContent">没有查看的图片</p>
              </div>
              <!--<div class="img-load">-->
                <!--<img class="preview-img" v-for="(item, index) in tubImg"-->
                     <!--:src="item.src" height="100" @click="$preview.open(index, tubImg)">-->
                <!--<p class="tipContent">没有查看的图片</p>-->
              <!--</div>-->
            </div>
          <div class="certificate-btn">
            <div class="uploadEwmWarp">
              <img src="../../../static/image/icon-ewm.png" alt="">
              <span class="ewmDsc">二维码上传</span>
            </div>
            <div class="tupianUpload">
              <a  href="javaScript:;">同步手机上传图片</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "MessageDetails",
    data () {
      return {
        tubImg: [],
        sfzInfo: {},
        obj: {},
        common: [],
        pageIndex: 1,
        dialogImageUrl: '',
        dialogVisible: false,
        messageDetail: false,
        tit: "查看附件",
        currentIndex: 0, // 消息的一个索引
        messageList: []
      }
    },
    computed: {
    },
    methods: {
      showFn (sfzInfo) {
        this.tubImg = [];
        this.sfzInfo = sfzInfo;
        // sfzInfo.list =[
        //   {
        //     big: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516515016941&di=92b6185a2d97f77010fad193e397be2c&imgtype=0&src=http%3A%2F%2Fwww.taopic.com%2Fuploads%2Fallimg%2F131124%2F234822-13112415025460.jpg'
        //   },
        //   {
        //     big: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516515016941&di=92b6185a2d97f77010fad193e397be2c&imgtype=0&src=http%3A%2F%2Fwww.taopic.com%2Fuploads%2Fallimg%2F131124%2F234822-13112415025460.jpg'
        //   },
        //   {
        //     big: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516515016941&di=92b6185a2d97f77010fad193e397be2c&imgtype=0&src=http%3A%2F%2Fwww.taopic.com%2Fuploads%2Fallimg%2F131124%2F234822-13112415025460.jpg'
        //   }
        // ];
        for (let imgObj of sfzInfo.list) {
          let bigImg = imgObj.big;
          let middleImg = imgObj.middle;
          let smallImg = imgObj.small;
          let img = {};
          img.src = bigImg;
          img.w = '1000';
          img.h = '600';
          this.tubImg.push(img)
        }

        // let img = {};
        // img.src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516515016941&di=92b6185a2d97f77010fad193e397be2c&imgtype=0&src=http%3A%2F%2Fwww.taopic.com%2Fuploads%2Fallimg%2F131124%2F234822-13112415025460.jpg';
        // img.w = '1000';
        // img.h = '600';
        // this.tubImg.push(img)
        //
        // let img1 = {};
        // img1.src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517110235&di=cdf4d4fdbc9ed0c4ab8150315f2a4de2&imgtype=jpg&er=1&src=http%3A%2F%2Fpic14.nipic.com%2F20110516%2F2457331_185933660000_2.jpg';
        // img1.w = '1000';
        // img1.h = '600';
        //  this.tubImg.push(img1)
        this.messageDetail = true;
      },
      closeFn () {
        this.messageDetail = false;
      },
      handleRemove(file, fileList) {
        //console.log(file, fileList);
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
  .change-img {
    float: left;
  }
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
        display: flex;
        height: 321px;
        flex-wrap: wrap;
        width: 90%;
        margin:20px 5% 0 5%;
        .certificate{
          width: 520px;
          height: 100%;
          padding: 30px 20px 30px 30px;
          margin: 0 auto;
          font-size: 14px;
          background: #fff;
          .certificate-main{
            width: 520px;
            height: 160px;
            .img-load{
              cursor: pointer;
              width: 320px;
              height: 160px;
              text-align: center;
              background: url(../../../static/image/fileimg.png) center 39% no-repeat #e1eaec;
              display: inline-block;
              float: left;
              position: relative;
              img {
                width: 100%;
              }
              .tipContent{
                width: 124px;
                color: #999;
                text-align: center;
                position: absolute;
                top: 54%;
              }
            }
          }
          .certificate-btn{
            width: 510px;
            margin: 25px 0 0;
            text-align: right;
            .uploadEwmWarp{
              float: left;
              height: 40px;
              line-height: 40px;
              position: relative;
              .ewmDsc{
                margin-left: 10px;
                vertical-align: middle;
              }
              .uploadEwmContent{
                position: absolute;
                width: 160px;
                height: 200px;
                padding: 10px;
                box-shadow: 0 0 5px #666;
                border-radius: 5px;
                bottom: 0;
                left: 0;
                background-color: #fff;
                display: none;
                .newEwm{
                  width: 150px;
                  height: 150px;
                  margin: 0 auto;
                }
                .uploadDesc-top{
                  margin-top: 10px;
                  text-align: center;
                  line-height: normal;
                }
                .uploadDesc-bottom{
                  margin-top: 10px;
                  text-align: center;
                  line-height: normal;
                }
              }
            }
            .layui-input-inline{
              display: inline-block;
              vertical-align: middle;
              .layui-btn-normal{

                color: #fff;
                font-size: 14px;
              }
            }
            .tupianUpload{
              width: 100%;
              height: auto;
              overflow: hidden;
              a{
                width: auto;
                height: 36px;
                line-height: 36px;
                font-size: 14px;
                color: #2091d2;
                text-decoration: underline;
                overflow: hidden;
                float: left;
              }
            }
          }
        }
      }
    }
  }
</style>
