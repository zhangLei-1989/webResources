<template>
  <div class="dialog" v-if="isShowInformation">
    <!-- 背景层 -->
    <transition name="bounce">
      <div class="mark"></div>
    </transition>

    <div class="container">
      <div class="tit">{{tit}}</div>
      <div class="close" @click="closeFn"></div>

      <div class="content">
        <div class="header">
          <div class="information clearboth">
            <div class="face">
              <!--{{gerenInfo.picWeixin}}-->
              <img src="" alt="">
            </div>
            <div class="person">
              <div class="name">{{gerenInfo.username}}</div>
              <div >
                <div>{{gerenInfo.gender | getGenderName }}</div>
                <div class="phone">{{gerenInfo.phone}}</div>
              </div>
              <div>
                <div class="position">
                  <div>职位：</div>
                  <div>{{gerenInfo.job}}</div>
                </div>
                <div>
                  <div>爱好：</div>
                  <div>{{gerenInfo.hobby}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="table-head ">
            <div class="clearboth">
              <div v-for="(i, j) in table_head" :key="j" :class="j == table_head_index? 'active' : '' "
                   @click="table_head_click(i.index)">{{i.name}}
              </div>
            </div>
          </div>
        </div>

        <div class="tenant-box" v-show="table_head_index == 0"
             >
          <div class="tenant">
            <div class="title">
              承租人信息
            </div>
            <div class="tenant-information">
              <div>
                <div>租客姓名：</div>
                <div>{{gerenInfo.username}}</div>
              </div>
              <div>
                <div>租客性别：</div>
                <div>{{gerenInfo.gender | getGenderName }}</div>
              </div>
              <div>
                <div>租客电话：</div>
                <div>{{gerenInfo.phone}}</div>
              </div>
              <div>
                <div>身份证号码：</div>
                <div>{{gerenInfo.sfzNo}}</div>
              </div>
              <div>
                <div>紧急联系人：</div>
                <div>{{gerenInfo.emergencyPeo}}</div>
              </div>
              <div>
                <div>紧急联系人电话：</div>
                <div>{{gerenInfo.emergencyPeoPhone}}</div>
              </div>
              <div>
                <div>职位：</div>
                <div>{{gerenInfo.job}}</div>
              </div>
              <div>
                <div>爱好：</div>
                <div>{{gerenInfo.hobby}}</div>
              </div>
              <div>
                <div>渠道来源：</div>
                <div>{{gerenInfo.channelSourceId}}</div>
              </div>
              <div>
                <div>所属银行：</div>
                <div>{{gerenInfo.cardType}}</div>
              </div>
              <div>
                <div>所属支行：</div>
                <div>{{gerenInfo.cardTypeZhihang}}</div>
              </div>
              <div>
                <div>银行卡号：</div>
                <div>{{gerenInfo.cardNo}}</div>
              </div>
              <div>
                <div>身份证附件：</div>
                <div @click="querySfz"><a href="#" style="color: #f20; text-decoration: underline">查看身份证</a></div>
              </div>
              <div>
                <div>工作证明：</div>
                <div @click="querySfz"><a href="#" style="color: #f20; text-decoration: underline">查看工作证明</a></div>

              </div>
              <div>
                <div >其他证明：</div>
                <div @click="querySfz"><a href="#" style="color: #f20; text-decoration: underline">查看其他证明</a></div>

              </div>
            </div>
          </div>
          <div class="cotenant">
            <div class="title">
              合租人信息
            </div>
            <div class="cotenant-information">
              <div v-for="hezuren in heZuRenList" :key="hezuren.id">
                <div >
                  <div>姓名/性别：</div>
                  <div>{{hezuren.username}}/{{hezuren.gender | getGenderName }}</div>
                </div>
                <div>
                  <div>电话：</div>
                  <div>{{hezuren.phone}}</div>
                </div>
                <div>
                  <div>身份证号：</div>
                  <div>{{hezuren.sfzNo}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="contract-box" v-show="table_head_index == 1">
          <div class="resources-msg">
            <div class="title">
              房源信息
            </div>
            <div class="information">
              <div>
                <div>小区名称：</div>
                <div>{{heZuInfo.quyuCName}}</div>
              </div>
              <div>
                <div>座栋信息：</div>
                <div>{{heZuInfo.louNo}}{{heZuInfo.louDanWei}}{{heZuInfo.men}}{{heZuInfo.menDanWei}}{{heZuInfo.fangNo}}</div>
              </div>
              <div>
                <div>房屋编号：</div>
                <div>{{heZuInfo.chanquanNo}}</div>
              </div>
              <div>
                <div>房屋信息：</div>
                <div>{{heZuInfo.shi}}室{{heZuInfo.ting}}厅
                 {{heZuInfo.chu}}厨{{heZuInfo.wei}}卫
                  {{heZuInfo.tai}}台
                </div>
              </div>
              <div>
                <div>楼层面积：</div>
                <div>第{{heZuInfo.loucengA}}层/共{{heZuInfo.loucengB}}层 {{heZuInfo.mianji}}㎡</div>
              </div>
            </div>
          </div>
          <div class="contract-msg">
            <div class="title">
              合同信息
            </div>
            <div class="information">
              <div>
                <div>合同编号：</div>
                <div>{{zuKeInfo.taiZhang}}</div>
              </div>
              <div>
                <div>签约类型：</div>
                <div>{{zuKeInfo.signType}}</div>
              </div>
              <div>
                <div>签约日期：</div>
                <div>{{zuKeInfo.signType}}</div>
              </div>
            </div>
            <div class="information">
              <div>
                <div>合同期限：</div>
                <div>{{zuKeInfo.ct}}~{{zuKeInfo.endTime}}</div>
              </div>
              <div>
                <div>承租价格：</div>
                <div>{{zuKeInfo.jiage}}</div>
              </div>
              <div>
                <div>押金：</div>
                <div>{{zuKeInfo.yaJin}}</div>
              </div>
            </div>
            <div class="information">
              <div>
                <div>提前付款天数：</div>
                <div>{{zuKeInfo.tiqianDays}}</div>
              </div>
              <div>
                <div>付款方式：</div>
                <div>{{zuKeInfo.zhifuTypeName}}</div>
              </div>
              <div>
                <div>合同/交割单：</div>
                <div><a @click="querySfz" href="#" style="color: #f20; text-decoration: underline">查看附件</a> <a @click="queryWuye" href="#" style="color: #f20; text-decoration: underline">查看物业交割单</a></div>
              </div>
            </div>
            <div class="information">
              <div>
                <div>备注：</div>
                <div></div>
              </div>
              <div>
                <div>优惠信息：</div>
                <div>{{zuKeInfo.discountTypeName}}</div>
              </div>
              <div>
                <div>录入时间：</div>
                <div>{{zuKeInfo.ct}}</div>
              </div>

            </div>
            <div class="information">
              <div>
                <div>入住人数：</div>
                <div>{{zuKeInfo.contractZuKeNowNum}}</div>
              </div>
              <div>
                <div>退租日期：</div>
                <div>{{zuKeInfo.tuiOrWeiDate}}</div>
              </div>
              <div>
                <div>退租备注：</div>
                <div>{{zuKeInfo.tuiOrWeiRemark}}</div>
              </div>
            </div>
          </div>
          <div class="sign-msg">
            <div class="title">
              签约信息
            </div>
            <div class="information">
              <div>
                <div>签约部门：</div>
                <div>{{qianyueInfo.buMenName}}</div>
              </div>
              <div>
                <div>签约人：</div>
                <div>{{qianyueInfo.qianyuerenName}}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="capitalFlow-box" v-show="table_head_index == 2">
          <div v-for="shouZhiInfo in shouZhiInfoList" :key="shouZhiInfo.id">
            <div class="sign">
              <div v-if="shouZhiInfo.confirmStatus === '0'" style="background: #f5b000;">审核中</div>
              <div v-if="shouZhiInfo.confirmStatus === '1'" style="background: #31b1f9;">审核通过</div>
              <div v-if="shouZhiInfo.confirmStatus === '2'" style="background: #f00031;">审核失败</div>
            </div>
            <div class="state">
              <div>
                <span class="term" v-if="shouZhiInfo.costType === '已到期'" style="background: #f00031;" >{{shouZhiInfo.costType}}</span>
                <span class="term" v-if="shouZhiInfo.costType !== '已到期'" style="background: #01be6a;" >{{shouZhiInfo.costType}}</span>
                <span>租金<span class="symbol">{{shouZhiInfo.type | getType }}</span>{{shouZhiInfo.money}}</span>
              </div>
              <div>预收时间：{{shouZhiInfo.predictTime}}</div>
            </div>
            <div class="timeSlot">
              <div>
                {{shouZhiInfo.desc}}
              </div>
              <div>
                {{shouZhiInfo.beginTime}}到{{shouZhiInfo.endTime}}
              </div>
            </div>
            <div class="room">
              <div>
                {{shouZhiInfo.paymentName}} - {{shouZhiInfo.paymentPhone}}
              </div>
              <div>
                <span class="roomNumber">{{shouZhiInfo.roomNo}}</span>
                {{shouZhiInfo.building}}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <Fujian ref="fujian"/>
    <Wuyejiaogedan ref="jiaogedan"/>
  </div>
</template>
<script>
  import Fujian from "@/components/contract/Fujian.vue"
  import Wuyejiaogedan from "@/components/contract/Wuyejiaogedan.vue"
  export default {
    name: 'queryRentInformation',
    data() {
      return {
        sfzInfo: {},
        indentChengzuId: '',
        id: '',
        zuKeInfo: {
        },// 包括租客信息和合同信息
        gerenInfo: {},
        heZuInfo: {},
        qianyueInfo: {},
        houseUser: {},
         heZuRenList: [],
        shouZhiInfoList: [],

        isShowInformation: false,
        tit: '查看租客信息',
        content: {
          tip: '确定要删除吗？',
          textarea: '必须输入删除原因',
        },
        table_head: [
          {
            name: '租客信息',
            index: 0,
          },
          {
            name: '合同信息',
            index: 1,
          },
          {
            name: '收支信息',
            index: 2,
          },
        ],
        table_head_index: 0,
        inputs: [],
        buttons: [
          {
            name: '保存'
          }
        ]
      }
    },

    methods: {
      querySfz () {
        let _this = this;
        let param = {
          id: '',
          tblId: '',// 合同id
          gcid: '',
          subType: '0',
          type: '120'
        };
        _this.axios({
          method: 'post',
          url: this.$store.state.api.contract.get_contract_pics,
          data: param
        }).then(res => {
        //  console.log(res,'sfz信息');
          const {data} = res;
          // console.log(data);
          if (data && data.status.code === '200') {
            this.sfzInfo = data.result; //  data.result请求该成对应的字段
          }
        });
        this.$refs.fujian.showFn(this.sfzInfo);

      },
      queryWuye () {
        let _this = this;
        let param = {
          id: '',
          tblId: '',// 合同id
          gcid: '',
          subType: '0,1',
          type: '120'
        };
        _this.axios({
          method: 'post',
          url: this.$store.state.api.contract.get_contract_pics,
          data: param
        }).then(res => {
          //console.log(res,'sfz信息');
          const {data} = res;
          // console.log(data);
          if (data && data.status.code === '200') {
            this.gerenInfo = data.result; //  data.result请求该成对应的字段
          }
        });
        this.$refs.jiaogedan.showFn();

      },
      //获取承租人个人信息
      queryGeRenInfo() {
        let _this = this;
        let param1 = {
          id: '',// 租客ID
        };
        _this.axios({
          method: 'post',
          url: this.$store.state.api.contract.get_contract_geren,
          data: param1
        }).then(res => {
        // console.log(res,'geren信息');
          const {data} = res;
          // console.log(data);
          if (data && data.status.code === '200') {
            this.gerenInfo = data.result; //  data.result请求该成对应的字段
            this.heZuRenList = data.result.heZuRenList; //  data.result请求该成对应的字段
            //console.log(this.heZuRenList,'合租人信息')
          }
        });
      },
      //合同信息
      queryChengZuInfo() {
        let _this = this;
        let param = {
          id: this.id,// 租客ID
          isGetFuzeren: '1',
          isGetHeZuRen: '1',//
          isGetChengZuRen: '1', // 是否需要获取成租人信息，
          isGetHouse: '1',// 是否需要获取房源信息
          isGetHouseShouDing: '1' // 是否需要收订消息
        };
        _this.axios({
          method: 'post',
          url: this.$store.state.api.contract.get_contract_hetong,
          data: param
        }).then(res => {
          const {data} = res;
          // console.log(data,'我的预约信息');
          if (data && data.status.code === '200') {
            this.zuKeInfo = data.result; //  data.result请求该成对应的字段
            this.heZuInfo=data.result.house// 合租人
            this.qianyueInfo=data.result.qianyue// 预约
           // console.log(this.qianyueInfo)
            this.fzrList=data.result.fzrList // 负责人
            this.houseFzrList=data.result.houseFzrList // 房屋负责人
            this.houseUser=data.result.houseUser // houseuser
           // console.log(this.zuKeInfo,'租客信息');
          }
        });
      },
      // 根据合同ID查询收支信息
      queryShouZhiInfo() {
        let _this = this;
        let param1 = {
          indentChengzuId: _this.indentChengzuId,
        };
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.contract.get_contract_balance,
          data: param1 // 合同id
        }).then(res => {
          console.log(res, '收支');
          const {data} = res;
         // console.log(data);
          if (data && data.status.code === '200') {
            this.shouZhiInfoList = data.result.list; //  data.result请求该成对应的字段
          }
        });
      },
      table_head_click(index) {
        this.table_head_index = index;
      },
      showFn(zukeId) {
        this.zukeId = zukeId;
        this.isShowInformation = true;
      },
      closeFn() {
        this.isShowInformation = false;
      }
    },
    filters: {
      getGenderName: function(val){
       // console.info('getGenderName', val)
        let gender=''
        switch (val){
          case 0 : {
            gender = '女'
            break;
          }
          case 1 : {
            gender = '男'
            break;
          }
        }
        return gender
      },
      getType: function (val) {
        let type=''
        switch (val){
          case 1 : {
            type = '+'
            break;
          }
          case 2 : {
            type = '-'
            break;
          }
        }
        return type
      },
      getShou: function (val) {
        let type=''
        switch (val){
          case 0 : {
            type = '审核中'
            break;
          }
          case 1 : {
            type = '审核通过'
            break;
          }
          case 2 : {
            type = '审核失败'
            break;
          }
        }
        return type
      }
    },
    created() {
      // 根据承租人ID查询承租人以及合同信息
      this.queryChengZuInfo();
      this.queryShouZhiInfo();
      this.queryGeRenInfo();
    },
    components: {
      Fujian,
      Wuyejiaogedan
    }
  }

</script>

<style scoped lang="scss">
  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  .clearboth:after {
    content: "";
    height: 0;
    width: 0;
    display: block;
    clear: both;
  }

  .dialog {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 999;
    .mark {
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
    .container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      min-width: 1060px;
      width: 80%;
      height: 650px;
      background: #f2f6f7;
      overflow: hidden;
      /* 标题 */
      .tit {
        height: 60px;
        text-indent: 2em;
        font-size: 16px;
        color: #ed0536;
        line-height: 60px;
        border-bottom: 1px solid #f2f6f7;
        background: #fff;
      }
      /* 关闭按钮 */
      .close {
        position: absolute;
        top: 0;
        right: 0;
        height: 60px;
        width: 60px;
        cursor: pointer;
        background: url("/static/image/close_03.png") no-repeat 15px;
      }
      /* 主体内容 */
      .content {
        height: 650px;
        width: 100%;
        .header {
          height: 160px;
          width: 100%;
          background: #fff;
          .information {
            .face {
              height: 80px;
              width: 80px;
              border-radius: 50%;
              background: #ccc;
              overflow: hidden;
              margin: 20px;
              float: left;
              img {
                height: 100%;
                width: 100%;
              }
            }
            .person {
              width: 500px;
              float: left;
              display: flex;
              margin-top: 20px;
              flex-wrap: wrap;
              & > div {
                width: 100%;
                display: flex;
                margin-top: 3px;
                & > div {
                  display: flex;
                  margin-right: 20px;
                  color: #a1a1a1;
                }
              }
              .name {
                line-height: 30px;
                width: 100%;
                font-size: 16px;
              }

            }
          }
          .table-head {
            width: 100%;
            & > div {
            }
            & > div > div {
              float: left;
              height: 40px;
              line-height: 40px;
              padding: 0 30px;
              font-size: 14px;
              cursor: pointer;
              color: #000;
              &.active {
                color: #f00031;
                border-bottom: 2px solid #f00031;
              }
            }
          }
        }
        .contract-box {
          width: calc(100% - 40px);
          background: #fff;
          margin: 20px;
          height: 440px;
          .title {
            width: 100%;
            padding: 20px 0 10px 0;
            font-size: 16px;
            text-indent: 2em;
            position: relative;
            &:after {
              content: "";
              height: 16px;
              width: 3px;
              display: block;
              background: #f2324e;
              position: absolute;
              border-radius: 5px;
              left: 1.8em;
              top: 22px;
              z-index: 33;
            }
          }
          .information {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            & > div {
              height: 30px;
              width: 30%;
              margin-top: 5px;
              display: flex;
              & > div:nth-child(1) {
                text-indent: 3em;
                color: #a1a1a1;
              }
            }
          }
        }
        .tenant-box {

        }
        .tenant-box {
          width: calc(100% - 40px);
          margin: 20px;
          height: 490px;
          & > div {
            background: #fff;
            position: relative;
            margin-top: 20px;
            &.tenant {
              height: 240px;
            }
            &.cotenant {
              height: 180px;
              overflow-y: auto;
            }
            .title {
              width: 100%;
              padding: 20px 0 10px 0;
              font-size: 16px;
              text-indent: 2em;
              &:after {
                content: "";
                height: 16px;
                width: 3px;
                display: block;
                background: #f2324e;
                position: absolute;
                border-radius: 5px;
                left: 1.8em;
                top: 22px;
                z-index: 33;
              }
            }
            .tenant-information {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              & > div {
                height: 30px;
                width: 30%;
                margin-top: 5px;
                display: flex;
                & > div:nth-child(1) {
                  text-indent: 3em;
                  color: #a1a1a1;
                }
              }
            }
            .cotenant-information {
              overflow-y: auto;
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              & > div {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                & > div {
                  height: 30px;
                  width: 30%;
                  margin-top: 5px;
                  display: flex;
                  & > div:nth-child(1) {
                    text-indent: 3em;
                    color: #a1a1a1;
                  }
                }
              }
            }
          }

        }
        .capitalFlow-box {
          width: calc(100% - 40px);
          height: 440px;
          background: #fff;
          margin: 20px;
          overflow-y: auto;

          & > div {
            height: 70px;
            width: 100%;
            display: flex;
            justify-content: space-around;
            &:nth-child(odd) {
              background: #fff;
            }
            &:nth-child(even) {
              background: #f7f7f7;
            }
            & > div {
              flex: 3;
              margin-right: 3px;
              &.sign {
                flex: 2;
                position: relative;
                & > div {
                  overflow: hidden;
                  width: 86px;
                  height: 30px;
                  line-height: 30px;
                  text-indent: 1em;
                  background: #31b1f9;
                  margin-top: 20px;
                  position: absolute;
                  left: 50%;
                  margin-left: -43px;
                  color: #daf2fc;
                  &:after {
                    content: "";
                    display: block;
                    height: 22px;
                    width: 22px;
                    background: #fff;
                    position: absolute;
                    right: -12px;
                    top: 4px;
                    transform: rotate(45deg);
                    border-left: 1px solid #f3f4f8;
                    border-bottom: 1px solid #f3f4f8;
                  }
                }
              }
              &.state {
                & > div {
                  margin-top: 5px;
                }
                & > div:nth-child(1) {
                  margin-top: 15px;
                }
                .term {
                  padding: 3px 5px;
                  background: #0f0;
                  color: #fec7ca;
                  border-radius: 2px;
                }
                .symbol {
                  color: #50bffa;
                  padding: 0 5px;
                }
              }
              &.timeSlot {
                & > div {
                  margin-top: 3px;
                }
                & > div:nth-child(1) {
                  margin-top: 15px;
                }
              }
              &.room {
                & > div {
                  margin-top: 3px;
                }
                & > div:nth-child(1) {
                  margin-top: 15px;
                  background: url("/src/assets/images/shouzhi_03.png") no-repeat 5px;
                  text-indent: 2em;
                }
                .roomNumber {
                  padding: 3px 5px;
                  background: #26affe;
                  color: #daf2fc;
                  border-radius: 2px;
                  margin: 0 5px;
                }
              }
            }

          }
        }
      }
    }
  }
</style>
