<template>
  <div class="popUp" ref="parents" v-if="isShowLog">
    <!-- 背景层 -->
    <div class="mark"></div>

    <div class="container">
      <!-- 标题 -->
      <div class="tit">
        <div>
          操作日志
        </div>
      </div>
      <!-- 右上角关闭按钮 -->
      <div class="close" @click="closeFn"></div>

      <div class="content">
        <div class="control-log">
          <div class="log-box">
            <div class="line"></div>
            <div v-for="(item,index) in controlLog" :key= 'index' class="log">
              <div class="ciro"></div>
              <div class="cont">
                <div class="title">
                  <div class="log-state">{{item.title}}</div>
                  <div class="log-people">
                    <div>
                      操作人：{{item.userName}}
                    </div>
                    <div class="log-date">
                      {{item.ct}}
                    </div>
                  </div>
                </div>
                <p class="text">
                  {{item.desc}}
                </p>
                <div class="arrow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SetLog",
    props:{
      controlLog: {
        type: Array,
        default: [],
        required: true
      }
    },
    data () {
      return {
        isShowLog: false,
        /*controlLog: [
         {
         state: "通过审核",
         people: "高雨婷",
         time: "2017-08-17 15:50:10",
         remarks: "nonononono"
         },
         {
         state: "通过审核",
         people: "高雨婷",
         time: "2017-08-17 15:50:10",
         remarks: "nonononono"
         }
         ],*/
        tableIndex: 0
      }
    },
    methods: {
      showFn() {
        this.isShowLog = true;
      },
      closeFn() {
        this.isShowLog = false;
      }
    },
    mounted () {
    }
  }
</script>

<style scoped lang="scss">
  .popUp{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999999;
    .mark{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #000;
      opacity: 0.4;
    }
    .container{
      position: absolute;
      top:0;
      right: 0;
      width: 600px;
      height: 100%;
      background:#fff;
      overflow:hidden;
      /* 标题 */
      .tit{
        height: 50px;
        font-size: 16px;
        line-height: 50px;
        border-bottom: 1px solid #f2f6f7;
        margin-top: 0;
        &>div{
          line-height: 50px;
          float: left;
          padding: 0 20px;
          text-align: center;
          cursor: pointer;
          font-size: 16px;
        }
        &>div.active{
          color: #ed0536;
          background: #eee;
        }
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
        height:100%;
        width: 100%;
        overflow-y: auto;
        /* 房行详情 */
        .resources{
          width: calc(100% - 40px);
          margin:0 20px;
          padding-bottom: 40px;
          &>div{
            height: auto;
          }
          /* 一行中两个字段板块 */
          .content-flex{
            width: 100%;
            display: flex;
            align-items: center;
            &>div:nth-child(1){
              flex:1;
              display: flex;
            }
            &>div:nth-child(2){
              flex:1;
              display: flex;
            }
            /* 内容数据 */
            .content-data{
              color: #ccc;
              font-size: 14px;
              margin-left: 20px;
            }
          }

          /* 一行中存在一个板块 */
          .content-flex-def{
            display: flex;
            align-items: center;
            /* 内容数据 */
            .content-data{
              color: #ccc;
              margin-left: 20px;
              font-size: 14px;
            }
            /* 图片数据 */
            .content-data-img{
              margin-left: 20px;
              img{
                height: 60px;
                width: 60px;
              }
            }
          }
          /* 重要信息： 安全码，企业名称 */
          .important{
            height: 50px;
            width: 100%;
            border-bottom: 1px dashed #f3f4f8;
          }
          /* 第二个板块 详细信息板块 */
          .detailed{
            border-bottom: 1px dashed #f3f4f8;
            width: 100%;
            padding-bottom: 20px;
            div{
              margin: 5px 0;
            }
          }
          /* 第三个板块  附件板块*/
          .enclosure{
            padding-top: 20px;
            width: 100%;
            div{
              margin: 5px 0;
            }
          }
        }

        /* 操作日志 */
        .control-log{
          width: 100%;
          position: relative;
          /* 日志的包裹盒子 */
          /* 侧边线 */
          .log-box{
            width: calc(100% - 40px);
            margin:0 20px;
            position: relative;
            padding-bottom: 40px;
            height: 100%;
            padding-top: 25px;
            .line{
              width: 2px;
              height: 100%;
              background: #eee;
              left: 12px;
              top: 0;
              position: absolute;
              z-index: 99;
            }
          }
          /* 所有日志 */
          .log{
            position: relative;
            min-height: 120px;
            width: 100%;
            margin-bottom: 30px;
            /*圆点*/
            .ciro{
              position: absolute;
              width: 40px;
              height: 120px;
            }
            .ciro:after{
              content:"";
              position: absolute;
              top: 38px;
              left: 4px;
              background: #f3f4f8;
              border-radius: 50%;
              height: 16px;
              width: 16px;
            }
            /*内容*/
            .cont{
              position: relative;
              min-height: 120px;
              width: 90%;
              margin-left: 8%;
              margin-right: 2%;
              border:1px solid #f3f4f8;
              .title{
                height: 34px;
                line-height: 34px;
                width: 100%;
                background: #f3f4f8;
                display: flex;
                justify-content: space-between;
              }
              .log-state{
                font-size: 14px;
                text-indent: 1em;
              }
              .log-people{
                display: flex;
                line-height: 34px;
                &>div{
                  margin:0 5px;
                  font-size: 12px;
                  color: #999;
                }
              }
              .text{
                width: 100%;
                height: auto;
                padding-left: 10px;
                font-size: 14px;
                overflow:hidden;
                word-wrap: break-word;
              }
            }
            /*三角*/
            .arrow{
              height: 12px;
              width: 12px;
              background: #fff;
              position: absolute;
              left: -6px;
              top: 40px;
              transform: rotate(45deg);
              border-left: 1px solid #f3f4f8;
              border-bottom: 1px solid #f3f4f8;
            }
          }
        }
      .btns{
          width: 100%;
          background: #f2f6f7;
          height: 50px;
          position: absolute;
          bottom: 0;
          left: 0;
          .leftF{
            float: right;
            position: absolute;
            top: 10px;
            right: 15px;
            button{
              width: 80px;
              height: 35px;
              text-align: center;
              line-height: 35px;
              color: #fff;
              float: left;
              margin-left: 15px;
              background: #24b0fc;
              font-size: 16px;
              outline: none;
              border: none;
              border-radius: 3px;
            }
            button:nth-child(3){
              background: #ed0536;
            }
          }
        }
      }
    }
  }
</style>
