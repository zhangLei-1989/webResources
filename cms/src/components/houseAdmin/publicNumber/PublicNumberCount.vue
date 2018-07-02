<template>
  <div class="popRole" ref="parents" v-if="isShow">
    <!-- 背景层 -->
    <div class="mark"></div>
    <div class="container">
      <div class="tit">房乾公寓公众号对接</div>
      <div class="close" @click="closeFn"></div>
      <div class="content">
        <el-tabs type="border-card" tab-position='left'>
          <el-tab-pane v-for="(list,index) in publicList" :key="index">
            <span slot="label">
              <el-button type="success" size="mini">
                {{list.isCheck | getStatus58Name}}
              </el-button>
              <span class="content-size">{{list.wechatName}}</span>
            </span>
            <div class="public-detail">
              <div class="public-title">
                <h1>公众号名称: {{list.wechatName}}</h1>
                <div class="public-btn">
                  <el-dropdown>
                <span class="el-dropdown-link">
                  {{list.isCheck | getStatus58Name}}<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                    <el-dropdown-menu slot="dropdown">
                      <div style="font-size: 14px" @click="handle58Status(list.gcid, list.id, '已开通')">
                        <el-dropdown-item command="已开通">已开通</el-dropdown-item>
                      </div>
                      <div @click="handle58Status(list.gcid, list.id, '处理中')">
                        <el-dropdown-item command="处理中">处理中</el-dropdown-item>
                      </div>
                      <div @click="handle58Status(list.gcid, list.id, '待处理')">
                        <el-dropdown-item command="待处理">待处理</el-dropdown-item>
                      </div>
                      <div @click="handle58Status(list.gcid, list.id, '驳回')">
                        <el-dropdown-item command="驳回">驳回</el-dropdown-item>
                      </div>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
              <div class="public-detail-top">
                <div class="public-detail-top1">
                  <div class="public-city"><span class="city-width">房源所在城市</span> <span class="city-font">{{list.city}}</span></div>
                  <div class="public-bumen"><span class="city-width">部门</span><span class="city-font">{{list.department}}</span></div>
                </div>
                <div class="public-detail-top1">
                  <div class="public-city"><span class="city-width">联系人</span> <span class="city-font">{{list.contactsName}}</span></div>
                  <div class="public-bumen"><span class="city-width">联系人电话</span><span class="city-font">{{list.contactsPhone}}</span></div>
                </div>
              </div>
              <div class="public-detail-bottom">
                <div class="public-detail-top1">
                  <div class="public-city"><span class="city-width">公众号账号</span> <span class="city-font">{{list.wechatAccounts}}</span></div>
                  <div class="public-bumen"><span class="city-width">公众号密码</span><span class="city-font">
                     <input :type="list.passwordType" class="passwordBox" :value="list.wechatPassword" disabled>
                    <span @click="toggleType(1,list)" class="showPassword"></span>
                    <span @click="toggleType(2,list)" class="hiddenPassword"></span>
                  </span>
                   </div>
                </div>
                <div class="public-detail-top1">
                  <div class="public-city"><span class="city-width">商户号</span> <span class="city-font">{{list.mchId}}</span></div>
                  <div class="public-bumen"><span class="city-width">APP ID</span><span class="city-font">{{list.appId}}</span></div>
                </div>
                <div class="public-detail-top1">
                  <div class="public-city"><span class="city-width">APP ID秘钥</span> <span class="city-font">{{list.appKey}}</span></div>
                  <div class="public-bumen"><span class="city-width">API秘钥</span><span class="city-font">{{list.apiKey}}</span></div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!--<el-tab-pane label="角色管理">guanli </el-tab-pane>-->
          <!--<el-tab-pane label="角色管理">角色管理</el-tab-pane>-->
          <!--<el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>-->
        </el-tabs>
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
        isShow: false,
        count: {
          title: 0,
          content: 0
        },
        publicList: [],
        publishMessage: false,
        loading: false,
        param: {
          ctId: '',
          receiveObject: '',
          title: '',
          content: ''
        },
        search: {
          id: '',
          approveStatus: '',
          desc: '',
          gcid: '',
          outid: '',
        },
      }
    },
    methods: {
      handle58Status(gcid, id,command) {
        if (command === '已开通') {
          this.change58Status(gcid, id, '2');
        }
        if (command === '处理中') {
          this.change58Status(gcid, id, '1');
        }
        if (command === '待处理') {
          this.change58Status(gcid, id, '0');
        }
        if (command === '驳回') {
          this.housePassFn(gcid, id, '3');
        }
      },
      change58Status(gcid, id, status) {
        if (!id || !status || !gcid) {
          this.$message.warning('数据不完整');
        }
        this.search.id = id
        this.search.gcid = gcid
        //alert(this.search.outid);
         //this.search.outid = outid
        this.search.approveStatus = status
        //alert(status);
        this.axios({
          method: 'post',
          url: this.$store.state.api.resources_adjust.publicnum_approve, // 公众号改变状态
          data: this.search
        }).then(res => {
          const {data} = res
          if(data.status.code === '200') {
            console.log('最里边的状态',data)
           // this.queryDataFn();
            this.$router.go(0);
          }
        });
      },
      housePassFn(gcid, id, status) {
        if (!id) {
          this.$message.warning('请先选择一行数据'); // 提示请按需求文档
        } else {
          this.tit = '驳回';
          this.messageObj = {
            title: '确定要驳回该房行开通电子签约申请吗？',
            value: '请输入原因(必填)'
          };
          this.$refs.ExtendApplyPass.showFn(gcid, id, status);
        }
      },
      showFn (list, outid) {
        list.forEach((item)=>{
           Object.assign(item,{
             passwordType:'password'
           });
        });
        this.publicList = list
        console.log(outid,1111)
        this.search.outid = outid
        // alert('this.outid:' + outid);
        this.isShow = true;
      },
      closeFn () {
        this.isShow = false;
      },
      /**
       * 密码显示隐藏
       */
      toggleType(val,item){
        if(val==1){
          item.passwordType = 'password';
        }else if(val == 2){
          item.passwordType = 'text';
        }
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
    filters: {
      getStatus58Name: function (isCheck) {
        let name = '';
        switch (isCheck) {
          case '2' : {
            name = '已开通';
            break;
          }
          case '1' : {
            name = '处理中';
            break;
          }
          case '0': {
            name = '待处理';
            break;
          }
          case '3' : {
            name = '驳回';
            break;
          }

        }
        return name;
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
      width: 830px;
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
        width: 100%;
        .content-size{
          font-size: 14px;
          color: #ed0536;
        }
        .public-detail {
          width: 510px;
          height: 300px;
          margin: 20px 38px 80px 38px;
          font-size: 16px;
          .public-title {
            width: 510px;
            height: 40px;
            line-height: 40px;
            h1 {
              float: left;
              font-size: 16px;
              color: #333;
            }
            .public-btn {
              float: right;
              width: 100px;
              height: 40px;
              border: 1px solid #dcdfe6;
            }
          }
          .public-detail-top {
            width: 510px;
            height: 95px;
            margin-top: 20px;
            font-size: 16px;
            border-bottom: 1px dashed #999999;
            .public-detail-top1{
              height: 40px;
              line-height: 40px;
              .public-city{
                float: left;
                width: 250px;
                height: 40px;
                line-height: 40px;
                .city-width {
                  display: inline-block;
                  width: 88px;
                  font-size: 14px;
                }
                .city-font {
                  font-size: 14px;
                  color: #999999;
                }
              }
              .public-bumen {
                width: 250px;
                float: right;
                height: 40px;
                line-height: 40px;
                font-size: 16px;
                .city-width {
                  display: inline-block;
                  width: 74px;
                  font-size: 14px;
                }
                .city-font {
                  font-size: 14px;
                  color: #999;
                }
              }
            }

          }
          .public-detail-bottom {
            width: 510px;
            height: 95px;
            margin-top: 20px;
            font-size: 16px;
            .public-detail-top1{
              height: 40px;
              line-height: 40px;
              .public-city{
                float: left;
                width: 250px;
                height: 40px;
                line-height: 40px;
                .city-width {
                  display: inline-block;
                  width: 88px;
                  font-size: 14px;
                }
                .city-font {
                  font-size: 14px;
                  color: #999;
                }
              }
              .public-bumen {
                width: 250px;
                float: right;
                height: 40px;
                line-height: 40px;
                font-size: 16px;
                .city-width {
                  display: inline-block;
                  width: 74px;
                  font-size: 14px;
                }
                .city-font {
                  font-size: 14px;
                  color: #999;
                }
              }
            }

          }
        }

      }
    }
  }
  /deep/ .el-dropdown {
    margin-left: 22px;
  }
  /deep/ .el-tabs--border-card {
    width: 100%;
    font-size: 14px;
    height: 400px;
    background: #fff;
    border: 1px solid #dcdfe6;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
  /deep/ .el-tabs__item {
    font-size: 14px;
    font-weight: 500;
    height: 80px;
    color: #303133;
    position: relative;
    text-align: center;
    line-height: 80px;
  }
  /deep/ .el-tabs__nav-scroll{
    height: 100%;
    width: 240px;
  }
  /deep/ .el-tabs--border-card>.el-tabs__content {
    padding: 0;
  }
  /deep/ .el-button--mini, .el-button--mini.is-round {
    padding: 1px 3px;
    width: 46px;
    height: 20px;
  }

  .passwordBox{
    width: 80px;
    border:none;
  }

  .hiddenPassword , .showPassword{
    display: inline-block;
    width: 18px;
    height: 10px;
    cursor: pointer;
    margin-right: 6px;
  }
  .hiddenPassword{
    /*background: url("../../../../static/image/close.png") no-repeat ;*/
    background-size: 100% 100%;
  }
  .showPassword{
    /*background: url("../../../../static/image/open.png") no-repeat;*/
    background-size: 100% 100%;
  }
</style>
