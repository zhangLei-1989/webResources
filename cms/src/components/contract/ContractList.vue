<template>
  <el-main class="mainPad" v-loading="loading">
    <el-row>
      <el-col :span="24">
        <a href="#" @click="changeStatusType('0')">
          <el-tag :type="currentStatusType==='0' ? 'cms active' : 'cms'">全部({{statusCountResp.allCount}})</el-tag>
        </a>
        <a href="#" @click="changeStatusType('1')">
          <el-tag :type="currentStatusType==='1' ? 'cms active' : 'cms'" >即将搬入({{statusCountResp.jiJiangBanRuCount}})</el-tag>
        </a>
        <a href="#" @click="changeStatusType('2')">
          <el-tag :type="currentStatusType==='2' ? 'cms active' : 'cms'" >在租中({{statusCountResp.zaiZuZhongCount}})</el-tag>
        </a>
        <a href="#" @click="changeStatusType('3')">
          <el-tag :type="currentStatusType==='3' ? 'cms active' : 'cms'" >即将搬出({{statusCountResp.jiJiangBanChuCount}})</el-tag>
        </a>
        <a href="#" @click="changeStatusType('4')">
          <el-tag :type="currentStatusType==='4' ? 'cms active' : 'cms'" >已到期({{statusCountResp.yiDaoQiCount}})</el-tag>
        </a>
        <a href="#" @click="changeStatusType('5')">
          <el-tag :type="currentStatusType==='5' ? 'cms active' : 'cms'" >已退租({{statusCountResp.yiTuiZuCount}})</el-tag>
        </a>
        <a href="#" @click="changeStatusType('6')">
          <el-tag :type="currentStatusType==='6' ? 'cms active' : 'cms'" >待确认({{statusCountResp.notAudited}})</el-tag>
        </a>
        <a href="#" @click="changeStatusType('7')">
          <el-tag :type="currentStatusType==='7' ? 'cms active' : 'cms'" >待生效({{statusCountResp.audited}})</el-tag>
        </a>
        <a href="#" @click="changeStatusType('8')">
          <el-tag :type="currentStatusType==='8' ? 'cms active' : 'cms'" >已作废({{statusCountResp.cancel}})</el-tag>
        </a>
      </el-col>
    </el-row>
    <el-row class="noMarginLeft noMarginRight search" :gutter="20">
      <el-col :span="4" class="noPaddingLeft">
        <el-select v-model="search.brandId" clearable placeholder="公寓" style="width:100%;">
          <el-option
            v-for="item in brandIdList"
            :label="item.brandName"
            :key="item.id"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col v-model="search.id" style="height: 40px;" :span="4" class="noPaddingLeft">
        <el-cascader
          style="width:100%;"
          placeholder="城市/区域/商圈"
          :options="cityTreeData"
          filterable
          clearable
          change-on-select
          v-model="cityIdList"
          :props="cityProps"
          class="pc-input-col3">
        </el-cascader>
      </el-col>
      <el-col :span="13" class="noPaddingRight noPaddingLeft">
        <el-select
          style="width: 100%;"
          v-model="nchdLikeName"
          @change="changeLikeName"
          @remove-tag = "deleteLikeName"
          multiple
          filterable
          remote
          placeholder="订单号、楼盘名称、承租人、承租人电话"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in likeName"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3" class="noPaddingLeft noPaddingRight" style="display: flex;">
        <el-button @click="queryDataFn" class="btnC" type="danger" style="flex: 1; padding: 12px 0px;">搜索</el-button>
        <el-button class="btnC" @click="exportContractFn" type="danger"
                   style="background:#2e3445; border-color:#2e3445; flex: 1; padding: 12px 0px;">导出</el-button>
      </el-col>
    </el-row>
    <el-row class="noMargin search noPaddingBottom">
      <el-col :span="24" style="overflow-y: auto;">
        <el-table :data="table.tbody" @cell-mouse-enter="mouseEnterFn" @cell-mouse-leave="mouseLeaveFn" stripe border>
          <el-table-column
            prop="billNum"
            label="订单号">
          </el-table-column>
          <el-table-column
            prop="brandName"
            label="公寓名称">
          </el-table-column>
          <el-table-column
            prop="buildinglayoutroomNo"
            label="楼盘/房型/房号">
            <template slot-scope="scope">
              <router-link :to="{ path:'/house/portBHouse'}" :class="isMouseEnter ? 'mouse-enter' : ''">
                <div>{{ scope.row.building }}</div>
                <div>{{ scope.row.layout}}/{{scope.row.roomNo}}</div>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="zukeNamezukePhonerentStartTimerentEndTime"
            label="承租人/手机/租期">
            <template slot-scope="scope">
              <div>{{ scope.row.zukeName }}/{{ scope.row.zukePhone }}</div>
              <div>{{ scope.row.rentStartTime}}-{{scope.row.rentEndTime}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="depositrentPaymentpaymentType" min-width="100" label="押金/租金/付款方式">
            <template slot-scope="scope" style="margin-left: -1px">
              <div class="bg-eye">{{scope.row.deposit*10/10}}元押金
                <el-button type="text" size="small">
                  <el-dropdown @command="queryRentInformationFn">
                    <span class="el-dropdown-link">
                       <i class="iconfont eye-color">&#xe8de;</i>
                    </span>
                    <el-dropdown-menu slot="dropdown" class="tankuang">
                      <el-dropdown-item :command="'0' + '-' + scope.row.zukeId">个人信息</el-dropdown-item>
                      <el-dropdown-item :command="'1' + '-' + scope.row.zukeId">查看合同</el-dropdown-item>
                      <el-dropdown-item :command="'2' + '-' + scope.row.zukeId">查看收支</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-button>
              </div>
              <div>{{ scope.row.rentPayment*10/10}}元/月 * {{scope.row.paymentType}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="nextGatherTime"
            label="下期收租日">
          </el-table-column>
          <el-table-column
            prop="rentStatus"
            label="租约状态">
            <template slot-scope="scope">
              <span v-if="scope.row.rentStatus === '0'">租期中</span>
              <span v-if="scope.row.rentStatus === '20'">待签字</span>
              <span v-if="scope.row.rentStatus === '21'">已作废</span>
              <span v-if="scope.row.rentStatus === '16'">已退房</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="noMargin search footer">
      <el-col :span="24">
        <el-pagination
          :background=true
          :page-sizes="[10, 20, 50]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="search.pageNo"
          :page-size="search.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="table.totalRecord">
        </el-pagination>
      </el-col>
    </el-row>

    <query-rent-information ref="contractInfor"/>
  </el-main>
</template>
<script>
  import '../../../static/css/icon.css';
  import QueryRentInformation from "@/components/contract/QueryRentInformation.vue";
  export default {
    name: "contractList",
    data() {
      return {
        isMouseEnter: false,
        currentStatusType: '0',
        likeName: '',
        list: [],
        loading: false,
        states: [],
        cityIdList: [],
        cityProps: {
          value: 'id',
          label: 'name',
          children: 'children'
        },
        cityTreeData: [],
        nchdLikeName: [],
        loading: false,
        //筛选的过滤信息
        search: {
          id: '',
          statusType: '',
          cityId: '', // 城市id
          businessId: '',
          districtId: '',
          quyuAId: '',// 区域id
          quyuBId: '', // 商圈id
          likeName: '', // 合同信息模糊查询条件
          brandName: '',
          brandId: '',
          sortFields: '',
          sortType: '', // 排序字段
          pageNo: 1,
          pageSize: 10
        },
        brandIdList: [],
        //表格信息
        table: {
          tbody: [
            // {
            //   id: '1345',
            //   contractNumber: "20170102847",
            //   name: "荣尚荟公寓",
            //   building:'金地公寓',
            //   layout: '豪华大床房',
            //   roomNo: '201',
            //   zukeName: '高雨婷',
            //   zukePhone: '18672920380',
            //   rentStartTime: '2017-12-12',
            //   rentEndTime: '2018-12-12',
            //   deposit:'2000元押金',
            //   rentPayment:'2300元/月',
            //   paymentType:'1年',
            //   nextDate: "2017-12-12",
            //   state: "租期中",
            //   chengZuId: '123456'
            // }
          ],
          tfoot: [],
          totalRecord: 100
        },
        statusCountResp: {
          jiJiangBanRuCount: 0,
          jiJiangBanChuCount: 0,
          zaiZuZhongCount: 0,
          yiDaoQiCount: 0,
          yiTuiZuCount: 0,
          notAudited: 0,
          audited: 0,
          cancel: 0,
          allCount: 0
        },
        likeNameBak: [
          {
            label: '订单号',
            value: '1'
          },
          {
            label: '楼盘名称',
            value: '2'
          },
          {
            label: '承租人',
            value: '3'
          },
          {
            label: '承租人电话',
            value: '4'
          }
        ],
        likeNameArr: []
      };
    },
    methods: {
      mouseLeaveFn(row, column, cell, event) {
        if (column.label === '楼盘/房型/房号') {
          this.isMouseEnter = false;
        }
      },
      mouseEnterFn(row, column, cell, event) {
        //console.info(row);
       // console.info(column);
        //console.info(cell);
        //console.info(event);
        if (column.label === '楼盘/房型/房号') {
          this.isMouseEnter = true;
        }
      },
      // input
      changeStatusType(statusType) {
        if (this.currentStatusType !== statusType) {
          this.search.statusType = statusType;
          this.currentStatusType = statusType;
          this.queryDataFn();
        }
      },
      deleteLikeName(val) {
       // console.info('删除节点:', val);
        let arrIndex = -1;
        for (let i = 0; i < this.likeNameArr.length; i++) {
          if (val.value === this.likeNameArr[i].value) {
            arrIndex = i;
            break;
          }
        }
       // console.info(arrIndex);
        if (arrIndex > -1) {
          this.likeNameArr.splice(arrIndex);
        }
      },
      changeLikeName(val) {
        //console.info('change节点:', val);
        // 只处理增加tag
        if (val.length <= this.likeNameArr.length) {
          return;
        }
        let lastValue = val[val.length - 1];
        let split = lastValue.split(',');
        let key = split[0];
        let value = split[1];
        let arrIndex = -1;
        for (let i = 0; i < this.likeNameArr.length; i++) {
          //console.info('key:', this.likeNameArr[i]);
          if (key === this.likeNameArr[i].key) {
            arrIndex = i;
            break;
          }
        }
        //console.info('arrIndex', arrIndex);
        let temp = {};
        temp.key = key;
        temp.value = value;
        if (arrIndex > -1) {
          if (arrIndex !== val.length - 1) {
            this.nchdLikeName.splice(val.length - 1);
          }
          this.nchdLikeName.splice(arrIndex, 1, value);
          this.likeNameArr.splice(arrIndex, 1, temp);
        } else {
          this.nchdLikeName.splice(val.length - 1);
          this.nchdLikeName.push(value);
          this.likeNameArr.push(temp);
        }
      },
      remoteMethod(query) {
        if (query !== '') {
          this.likeName = [];
          for (let obj in this.likeNameBak) {
            let temp = {};
            temp.label = this.likeNameBak[obj].label + ' ' + query;
            temp.value = this.likeNameBak[obj].value + ',' + query;
            this.likeName.push(temp);
          }
        } else {
          this.likeName = [];
        }
      },
      exportContractFn () {
        let data = JSON.stringify(this.search);
        //console.info('data', data);
        window.location.href = this.$store.state.api.contract.get_contract_export + '?data=' + data;
      },
      queryRentInformationFn (cmdItem){
        if (!cmdItem) {
          this.$message.warning('菜单选项缺少command属性')
        } else {
          // 给承租人Id 赋值
          let split = cmdItem.split('-');
          let index = split[0]; // 索引值
          let zukeId = split[0]; // 承租ID
          if (!zukeId) {
            this.$message.warning('承租人信息不存在')
            return;
          }
          this.$refs.contractInfor.table_head_click(index);
          this.$refs.contractInfor.showFn(zukeId);
        }
      },
      queryDataFn () {
        //console.log('data1', this.search);// 我发送的数据
        let cityIdList = this.cityIdList;
        this.search.cityId = cityIdList[0] ? cityIdList[0] : '';
        this.search.quyuAId = cityIdList[1] ? cityIdList[1] : '';
        this.search.quyuBId = cityIdList[2] ? cityIdList[2] : '';
        let likeNameStr = '';
        this.likeNameArr.forEach((item, index) => {
          let key = item.key;
          let value = item.value;
          likeNameStr += key + ':' + value;
          if (index !== this.likeNameArr.length - 1) {
            likeNameStr += '&';
          }
        });
        this.search.likeName = likeNameStr;
        let _this = this;
       // console.info('查询条件', this.search);
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.contract.get_contract_list,
          data: _this.search
        }).then(res => {
          //console.log(res,999999);// 响应回来的数据
          const { data } = res;
          // console.log(data,234);
          if (data.status.code === '200') {
            _this.table.tbody = data.result.list;
            // console.log(_this.table.tbody,100)//空
            _this.table.pageNo = data.result.pageNo; // 当前第几页
            _this.table.totalRecord = data.result.totalRecord; // 总共的页数
            _this.table.pageSize = data.result.pageSize; // 每页多少条
          }
        });
      },
      handleSizeChange (val) {
        let _this = this;
        //console.info('每页多少条:', val);
        _this.search.pageSize = val;
        _this.queryDataFn();
      },
      handleCurrentChange (val) {
        let _this = this;
        // console.info('当前第几页:', val);
        if (_this.search.pageNo !== 0) {
          _this.search.pageNo = val;
          _this.queryDataFn();
        }
      },
      queryOrderStatusCount () {
        // 获取状态数目
        let _this = this;
        let param = {
          brandId: '',
          cityId: '',
          quyuAId: '',
          quyuBId: '',
          likeName: '',
          statusType: ''
        };
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.contract.get_contract_stateCount,
          data: param
        }).then(res => {
          // console.log(res);
          const { data } = res;
          //console.log(data,11111);
          if (data) {
            _this.statusCountResp = data.result;
          }
        });
      },
      queryGongYuList () {
        // 查询公寓集合
        let _this = this;
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.house.get_companyList_list, // 查公寓url
          data: ''
        }).then(res => {
          const { data } = res;
          if (data.status.code === '200') {
            if (!data.result) {
              //console.error('查询到的公寓集合为空');
              return;
            }
            _this.brandIdList = data.result.list;
            // console.info('_this.brandIdList', _this.brandIdList);
          }
        });
      },
      queryCityList () {
        // 查询城市集合
        let _this = this;
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.house.get_citySelect_list,
          data: ''
        }).then(res => {
          const { data } = res;
          //console.log(data,111111111)
          if (data.status.code === '200') {
            if (!data.result) {
              //console.error('查询到的城市列表为空');
              return;
            }
            _this.cityTreeData = data.result.cityList;
            //console.info('_this.cityTreeData', _this.cityTreeData);
          }
        });
      }
    },
    created() {
      // 如果写动态数据 需要请求查询发布人接口
//      this.queryPublisherListFn();
      // 查询订单列表
      this.queryDataFn();
      // 获取状态数目
      this.queryOrderStatusCount();
      // 查询公寓集合
      this.queryGongYuList();
      // 查询城市集合
      this.queryCityList();
      // input 输入框
    },
    mounted() {
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
    },
    components: {
      QueryRentInformation
    }
  };
</script>

<style scoped lang="scss">
  .mouse-enter:hover{
    /*text-underline: aqua !important;*/
    text-decoration: underline;
    color: #f00;
  }
  .eye-color{
    color: #ed0536;
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  /deep/ .el-dropdown{
    position: absolute;
    top: 16px;
    left: 160px;
  }
  /deep/ .el-cascader{
    height: 40px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #f40;
  }
  .mainPad{
    padding: 0px !important;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-row.no-margin-bottom {
    margin-bottom: 0px;
  }
  .el-row.search {
    background: #fff;
    padding: 10px;
  }
  .el-button--danger {
    width: 100%;
    background-color: #ed0536;
    border-color: #ed0536;
    border-radius: 0px;
  }
  /deep/ .el-input__inner {
    border-radius: 0px;
  }
  /deep/ .el-button--danger span {
    font-size: 14px;
  }
  /deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #f7f9fc;
    height: 64px;

  }
  /deep/ .el-table th > .cell {
    font-size: 14px;
  }
  /deep/ .el-table thead tr {
    background: #f2f4f7;
    color: #2e3445;
    height: 45px;
  }
  /deep/ .el-pagination {
    padding: 0px;
    text-align: right;
  }
  /deep/ .el-pagination.is-background .el-pager li.active {
    background-color: #ed0536;
  }
  /deep/ .el-pagination.is-background .el-pager li:hover {
    color: #ed0536;
  }
  /deep/ .el-button{
    color: #ed0536;
  }
  .btnC{
    color: #fff;
  }
  .footer{
    background: #f9f9f9 !important;
  }
  .handler{
    border-left:0;
  }

  .liColor /deep/ .el-pager .number:hover{
    color: red !important;
  }
  .liColor /deep/ .el-pager li.active:hover{
    color: #fff !important;
  }
  /deep/ .el-table__body-wrapper{
    height: calc(100vh - 300px);
  }
  .el-main{
    padding: 20px 20px 0 20px;
  }
</style>
