<template>
  <div class="popUp" ref="parents" v-if="isShow">
    <!-- 背景层 -->
    <div class="mark"></div>

    <div class="container">
      <!-- 标题 -->
      <div class="tit">
        <div v-for="(item, j) in tit" :key="j" :class="item.index === tableIndex? 'active' : '' " @click="tableToggle(item.index)">
          {{item.name}}
        </div>
      </div>
      <!-- 右上角关闭按钮 -->
      <div class="close" @click="closeFn"></div>

      <div class="content">
        <div class="resources" v-show="tableIndex == 0">
          <div class="important content-flex">
            <div class="safetyCode">
              <div>安全码</div>
              <div class="content-data content-data1">
                {{content.gcid}}
              </div>
            </div>
            <div class="enterpriseName">
              <div>企业名称</div>
              <div class="content-data">
                {{content.raCompanyName}}
              </div>
            </div>
          </div>
          <div class="detailed">
            <div class="content-flex">
              <div>
                <div>公寓名称</div>
                <div class="content-data content-data2">
                  {{content.brandName}}
                </div>
              </div>
              <div>
                <div>城市/区域</div>
                <div class="content-data">
                  {{content.raCompanyCity}}/{{content.raCompanyArea}}
                </div>
              </div>
            </div>

            <div class="content-flex-def">
              <div>具体地址</div>
              <div class="content-data">
                {{content.raCompanyAddress}}
              </div>
            </div>
            <div class="content-flex-def">
              <div>签约体量</div>
              <div class="content-data">
                {{content.raHouseNumber}}
              </div>
            </div>
            <div class="content-flex">
              <div class="content-flex-def">
                <div class="lianxiren">联系人</div>
                <div class=" content-data content-data3">
                  {{content.connectMan}}
                </div>
              </div>
              <div class="content-flex-def">
                <div class="dianhua">电话</div>
                <div class="content-data">
                  {{content.connectPhone}}
                </div>
              </div>
            </div>
            <div class="content-flex-def">
              <div>经营模式</div>
              <div class="content-data">
                {{content.houseModel}}
              </div>
            </div>
            <div class="content-flex-def">
              <div>公司简介</div>
              <div class="content-data">
                {{content.companyIntro}}
              </div>
            </div>
            <div class="content-flex-def">
              <div>logo</div>
              <div class="content-data-img">
                <div v-for="(item, index) in raLogoList">
                  <img v-if="index < 2" class="preview-img" :src="item.src" @click="$preview.open(index, raLogoList)">
                </div>
                <p v-if="!raLogoList || raLogoList.length === 0">没有查看的图片</p>
              </div>
            </div>
          </div>

          <div class="enclosure">
            <div class="content-flex">
              <div class="content-flex-def">
                <div>合同日期</div>
                <div class="content-data">
                  {{content.contractDate}}
                </div>
              </div>
              <div class="content-flex-def">
                <div>城营业执照号</div>
                <div class="content-data">
                  {{content.licenseNo}}
                </div>
              </div>
            </div>
            <div class="content-flex-def">
              <div>附件</div>

              <div class="content-data-img">
                <div v-for="(item, index) in licensePicList">
                  <img v-if="index < 2" class="preview-img" :src="item.src" @click="$preview.open(index, licensePicList)">
                </div>
                <p v-if="!licensePicList || licensePicList.length === 0">没有查看的图片</p>
              </div>
              <div class="content-data-img">
                <div v-for="(item, index) in compactAccessoryList">
                  <img v-if="index < 2" class="preview-img" :src="item.src" @click="$preview.open(index, compactAccessoryList)">
                </div>
                <p v-if="!compactAccessoryList || compactAccessoryList.length === 0">没有查看的图片</p>
              </div>
            </div>
          </div>
        </div>
 <!--日志-->
        <div class="control-log" v-show="tableIndex == 1">
          <div class="log-box">
            <div class="line"></div>
            <div v-for="(i, j) in controlLogList" :key="j" class="log">
              <div class="ciro"></div>
              <div class="cont">
                <div class="title">
                  <div class="log-state">{{i.title}}</div>
                  <div class="log-people">
                    <div>
                      操作人：{{i.userName}}
                    </div>
                    <div class="log-date">
                      {{i.ct}}
                    </div>
                  </div>
                </div>
                <div class="text">
                  <p  v-for="(item,index) in i.descArr">
                    {{item}}
                  </p>
                </div>
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
    name: 'popUp',
    props: {},
    data() {
      return {
        raLogoList: [],
        licensePicList: [],
        compactAccessoryList: [],
        controlLogList: [],
        isShow: false,
        tit: [
          {
            index: 0,
            name: '房行详情'
          },
          {
            index: 1,
            name: '操作日志'
          },
        ],
        currentId: '', // 用于处理按钮显示
        content: {
          safetyCode: '',
          enterpriseName: '',
          apartmentName: '',
          city: '',
          specificAddress: '',
          size: 600,
          contractMan: '',
          phone: '',
          model: '',
          companyProfile: '',
          logo: '',
          contractDate: '',
          licenseNumber: 168161565689684968,
          contractPic: '',
          raCompanyAddress: '',//  公司地址
          raCompanyCity: '',//  城市
          raCompanyArea: '',//  区域
          connectMan: '',//  联系人
          connectPhone: '',//  电话
          raCompanyName: '',//  公司,名称
          raHouseNumber: '',//  签约体量
          companyIntro: '',//  公司简介
          houseModel: '',//  经营模式
          raLogo: '',//  公司logo
          licenseNo: '',//  营业执照编号
          cooperationTime: '',//  合同日期
          compactAccessory: '',//  合同附件
          licensePic: ''//  营业执照扫描件
        },
        controlLog: [
          {
            userName: '', // 操作人
            title: '', // 标题
            userId: '', // 操作人id
            desc: '', // 描述
            ct: '', // 创建日期
            gcid: '', // 公司id
          }
        ],
        tableIndex: 0
      };
    },
    methods: {
      tableToggle(index) {
        this.tableIndex = index;
      },
      showFn(gcid, id, index) {
        this.tableIndex = index;
        this.isShow = true;
        // 查询详情
        this.currentId = id;
        this.queryDetail(gcid);
        // 查询日志
        this.queryLog(id);
      },
      closeFn() {
        this.isShow = false;
        this.$emit('on-close', this.currentId);
      },
      queryDetail(id) {
        this.axios({
          method: 'post',
          url: this.$store.state.api.resources_adjust.get_houseLine_detail,
          data: {
            gcid: id
          }
        }).then(res => {
          const {data} = res;
          if (data.status.code === '200') {
            this.content = data.result;
            // console.info('this.content', this.content);
            let img1 = {}
            img1.src = this.content.raLogo
            img1.w = '1000'
            img1.h = '600'
            this.raLogoList.push(img1)

            let img2 = {}
            img2.src = this.content.licensePic
            img2.w = '1000'
            img2.h = '600'
            this.licensePicList.push(img2)

            let img3 = {}
            img3.src = this.content.compactAccessory
            img3.w = '1000'
            img3.h = '600'
            this.compactAccessoryList.push(img3)
          }
        });
      },
      queryLog(id) {
        let _this = this;
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.resources_adjust.get_houseLine_log,
          data: {
            recordedDataId: id,
            sortType:'',
            sortFields:'',
            pageNo:'',
            pageSize:'',
            totalRecord:''
          }
        }).then(res => {
          //console.info(res,'house');
          const {data} = res;
          if (data.status.code === '200') {
            console.log(data,'rizhi')
            data.result.list.forEach((item,i)=>{
              console.log(item.desc)
              let Arr=item.desc.split(';')
              Object.assign(item,{
                descArr:Arr
              })
            })
            _this.controlLogList = data.result.list;
            _this.controlLog.desc = data.result.list;
            // fn && fn(this.controlLogList);
          }
        });
      }
    },
    mounted() {
    }
  };
</script>

<style scoped lang="scss">
  .popUp {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    .mark {
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
    .container {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 500px;
      height: 700px;
      background: #fff;
      overflow: hidden;
      /* 标题 */
      .tit {
        height: 60px;
        font-size: 16px;
        line-height: 50px;
        border-bottom: 1px solid #f2f6f7;
        margin-top: 0;
        & > div {
          line-height: 60px;
          float: left;
          padding: 0 20px;
          text-align: center;
          cursor: pointer;
          font-size: 16px;
          height: 60px;
        }
        & > div.active {
          color: #ed0536;
          background: #eee;
        }
      }
      /* 关闭按钮 */
      .close {
        position: absolute;
        top: 0;
        right: 0;
        height: 50px;
        width: 50px;
        cursor: pointer;
        background: url("/static/image/close_03.png") no-repeat 15px;
      }
      /* 主体内容 */
      .content {
        height: 100%;
        width: 100%;
        overflow-y: auto;
        /* 房行详情 */
        .resources {
          width: calc(100% - 40px);
          margin: 0 20px;
          padding-bottom: 40px;
          & > div {
            height: auto;
          }
          /* 一行中两个字段板块 */
          .content-flex {
            width: 100%;
            display: flex;
            align-items: center;
            & > div:nth-child(1) {
              flex: 1;
              display: flex;
            }
            & > div:nth-child(2) {
              flex: 1;
              display: flex;
            }
            /* 内容数据 */
            .content-data {
              color: #ccc;
              font-size: 14px;
              margin-left: 60px;
            }
            .content-data1 {
              margin-left: 48px;
            }
            .content-data2 {
              margin-left: 40px;
            }


          }

          /* 一行中存在一个板块 */
          .content-flex-def {
            display: flex;
            align-items: center;
            .lianxiren {
              width: 40px;
              margin-right: 15px;
            }
            .dianhua{
              margin-right: 45px;
            }
            /* 内容数据 */
            .content-data {
              color: #ccc;
              margin-left: 40px;
              font-size: 14px;

            }
            /* 图片数据 */
            .content-data-img {
              margin-left: 65px;
              width: 100px;
              height: 100px;
              background: #dfe4e6;
              img {
                width: 100%;
                border: none;
              }
            }
          }
          /* 重要信息： 安全码，企业名称 */
          .important {
            height: 70px;
            width: 100%;
            border-bottom: 1px dashed #f3f4f8;
          }
          /* 第二个板块 详细信息板块 */
          .detailed {
            border-bottom: 1px dashed #f3f4f8;
            width: 100%;
            padding-bottom: 20px;
            div {
              margin: 5px 0;
            }
          }
          /* 第三个板块  附件板块*/
          .enclosure {
            padding-top: 20px;
            width: 100%;
            div {
              margin: 5px 0;
            }
          }
        }

        /* 操作日志 */
        .control-log {
          width: 100%;
          height: 100%;
          position: relative;
          /* 日志的包裹盒子 */
          /* 侧边线 */
          .log-box {
            width: calc(100% - 40px);
            margin: 0 20px;
            position: relative;
            padding-bottom: 40px;
            height: 100%;
            .line {
              width: 2px;
              height: 100%;
              background: #eee;
              left: 12px;
              position: absolute;
              z-index: 99;
            }
          }
          /* 所有日志 */
          .log {
            position: relative;
            min-height: 120px;
            width: 100%;
            margin-bottom: 30px;
            /*圆点*/
            .ciro {
              position: absolute;
              width: 40px;
              height: 120px;
            }
            .ciro:after {
              content: "";
              position: absolute;
              top: 38px;
              left: 4px;
              background: #f3f4f8;
              border-radius: 50%;
              height: 16px;
              width: 16px;
            }
            /*内容*/
            .cont {
              position: relative;
              min-height: 120px;
              width: 90%;
              margin-left: 8%;
              margin-right: 2%;
              border: 1px solid #f3f4f8;
              height: 100%;

              .title {
                height: 34px;
                line-height: 34px;
                width: 100%;
                background: #f3f4f8;
                display: flex;
                justify-content: space-between;
              }
              .log-state {
                font-size: 14px;
                text-indent: 1em;
              }
              .log-people {
                display: flex;
                line-height: 34px;
                & > div {
                  margin: 0 5px;
                  font-size: 12px;
                  color: #999;
                }
              }
              .text {
                width: 100%;
                height: auto;
                padding-left: 10px;
                font-size: 14px;
                overflow: hidden;
                word-wrap: break-word;
                margin-top: 30px;
                line-height: 30px;
              }
            }
            /*三角*/
            .arrow {
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
