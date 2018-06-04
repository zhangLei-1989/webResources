<template>
  <div class="popUp" ref="parents" v-if="isShowLog">
    <!-- 背景层 -->
    <div class="mark"></div>

    <div class="container">
      <!-- 标题 -->
      <div class="tit">
        <div class="active">
          操作日志
        </div>
      </div>
      <!-- 右上角关闭按钮 -->
      <div class="close" @click="closeFn"></div>

      <div class="content">
        <div class="control-log">
          <div class="log-box">
            <div class="line"></div>
            <div v-if="!controlLogList || controlLogList.length === 0">暂无数据</div>
            <div v-if="controlLogList && controlLogList.length > 0" v-for="(item,index) in controlLogList" :key= 'index' class="log">
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
                </p>
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
    name: "messageLog",
    data () {
      return {
        isShowLog: false,
        tableIndex: 0,
        controlLogList: []
      }
    },
    methods: {
      showFn(list) {
        this.controlLogList = list;
        this.isShowLog = true;
      },
      closeFn() {
        this.isShowLog = false;
      }
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
      right: 0;
      top: 0;
      bottom:0;
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
            height: 100%;
            .line{
              width: 2px;
              height: 100%;
              background: #eee;
              left: 12px;
              position: absolute;
              z-index: 99;
              margin-top: -30px;
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
              margin-left: 8%;
              border:1px solid #f3f4f8;
              margin-top: 30px;
              height: 100%;
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
                margin-top: 15px;
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
      }
    }
  }
</style>
