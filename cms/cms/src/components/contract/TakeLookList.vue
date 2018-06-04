<template>
  <div class="popUp" ref="parents" v-if="isShowLookList">
    <!-- 背景层 -->
    <div class="mark"></div>

    <div class="container">
      <!-- 标题 -->
      <div class="tit">
        <div v-for="(item, j) in tit" :key="j">
          {{item.name}}
        </div>
      </div>
      <!-- 右上角关闭按钮 -->
      <div class="close" @click="closeFn"></div>
      <div class="content">
        <div class="PersonalInformation">
          <span><i>姓名：</i>{{ controlLogList.reserverName }}</span>
          <span><i>性别：</i>{{ controlLogList.sex }}</span>
          <span><i>手机：</i>{{ controlLogList.reserverPhone }}</span>
          <span><i>来源：</i>{{ controlLogList.accessMode }}</span>
        </div>
        <div class="BuildingInformation">
          <span><i>楼盘：</i>{{ controlLogList.building }}</span>
          <span><i>房型：</i>{{ controlLogList.layout }}</span>
          <span><i>房号：</i>{{ controlLogList.roomNo }}</span>
          <span><i>带看人：</i>{{ controlLogList.followPerson }}</span>
          <span><i>带看时间：</i>{{ controlLogList.reserveDate }}</span>
        </div>
        <div class="Remarks">
          <span><i>备注：</i>{{ controlLogList.remark }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
     // controlLog: {
     //   type: Object,
     //   default: {},
     //   isRequired: true
     // }
    },
    data () {
      return {
        controlLogList: {
          brandName: '',
          reserverPhone: '',
          roomNo: '',
          followPerson: '',
          reserveDate: '',
          remark: '',
          building: ''
        },
        id: '',
        isShowLookList: false,
        tableIndex: 0,
        tit: [
          {
            name: "带看单",
          }
        ],
        // content: {
        //   Personal:[
        //     {
        //       name:"高雨婷",
        //       sex:"女",
        //       phone:"18612345678",
        //       laiyuan:"B端H5"
        //     }
        //   ],
        //   Building:[
        //     {
        //       build:"清上园小区",
        //       specifications:"二室一厅",
        //       roomnum:"201",
        //       daiName:"李星桥",
        //       looktime:"2017-12-12 11:00"
        //     }
        //   ],
        //   Remarks:[
        //     {
        //       beizhu:"1231212313212312312314564564564554"
        //     }
        //   ]
        // }
      }
    },
    methods: {
      showFn(id) {
       this.id = id
        this.isShowLookList = true;
        this.searchLookFn()
      },
      closeFn() {
        this.isShowLookList = false;
      },
      tableToggle (index) {
        this.tableIndex = index;
        //console.log(this.tableIndex, index)
      },
      searchLookFn() {
        let _this = this;
        _this.axios({
          method: 'post',
          url: this.$store.state.api.contract.get_contract_look,
          data: {
            id: _this.id
          }
        }).then(res => {
          // console.log(res,123456);
          const {data} = res;
          //console.log(data);
          if (data && data.status.code === '200') {
            this.controlLogList = data.result;
          }
        });
      },
    },
    mounted () {
      //console.info('controlLog', this.controlLog)
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
    z-index: 9;
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
      bottom: 0;
      top: 0;
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
        color:#f24468;
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
        padding-left: 25px;
        padding-right: 25px;
        span{
          width: 179px;
          float: left;
          line-height: 33px;
          i{
            font-style: normal;
            color: #999999;
          }
        }
        .PersonalInformation{
          width: 100%;
          height: 106px;
          border-bottom: solid 1px #f2f6f7;
          padding-top: 20px;
          font-size: 14px;
        }
        .BuildingInformation{
          width: 100%;
          height: 106px;
          border-bottom: solid 1px #f2f6f7;
          padding-top: 20px;
        }
        .Remarks{
          width: 100%;
          height: 106px;
          padding-top: 20px;
          span{
            width: 100%;
          }
        }
      }
    }
  }
</style>
