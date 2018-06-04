<template>
  <el-main class="mainPad" v-loading="loading">
    <el-row>
      <el-col :span="24">
        <a href="#" @click="changeStatusType('0')"><el-tag :type="currentStatusType==='0' ? 'cms active' : 'cms'">全部({{statusCountResp.total}})</el-tag></a>
        <a href="#" @click="changeStatusType('1')">
          <el-tag :type="currentStatusType==='1' ? 'cms active' : 'cms'" >待受理({{statusCountResp.pending}})</el-tag>
        </a>
        <a href="#" @click="changeStatusType('2')">
          <el-tag :type="currentStatusType==='2' ? 'cms active' : 'cms'" >已受理({{statusCountResp.accepted}})</el-tag>
        </a>
        <a href="#" @click="changeStatusType('4')">
          <el-tag :type="currentStatusType==='4' ? 'cms active' : 'cms'" >无效({{statusCountResp.invalid}})</el-tag>
        </a>
      </el-col>
    </el-row>
    <el-row class="noMarginLeft noMarginRight search" :gutter="20">
      <el-col :span="3" class="noPaddingLeft">
        <el-select v-model="search.brandId" clearable placeholder="公寓" style='width: 100%'>
          <el-option
            style="width: 100px;"
            v-for="item in brandIdList"
            :label="item.brandName"
            :key="item.id"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3" class="noPaddingLeft">
        <el-select v-model="search.accessMode" clearable placeholder="来源" style="width:100%;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <!--1B 和 2C-->
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="7" class="noPaddingLeft">
        <el-date-picker
          v-model="timeList"
          type="daterange"
          value-format = "yyyy-MM-dd"
          unlink-panels
          @change="getTime"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width:100%;">
        </el-date-picker>
      </el-col>
      <el-col :span="10" class=" noPadding" style="width:41.4%;">
        <el-select
          v-model="nchdLikeName"
          @change="changeLikeName"
          @remove-tag = "deleteLikeName"
          class="inline-input"
          style="width:100%;"
          multiple
          filterable
          remote
          placeholder="楼盘名称、联系人姓名、联系人电话"
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
      <el-col :span="1" class="noPaddingLeft">
        <el-button @click="queryDataFn" class="btnC" type="danger" style="width: auto; padding: 12px;">搜索</el-button>
      </el-col>
    </el-row>
    <el-row class="noMargin search noPaddingBottom">
      <el-col :span="24" style="overflow-y: auto;">
        <el-table :data="table.tbody" stripe border>
          <el-table-column
            prop='brandName'
            label="公寓名称">
          </el-table-column>
          <el-table-column
            prop="buildinglayouroomNo"
            label="楼盘/房型/房号">
            <template slot-scope="scope">
              <div>{{ scope.row.building }}</div>
              <div>{{ scope.row.layout}}/{{scope.row.roomNo}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="reserverNamereserverPhone"
            label="联系人姓名/电话">
            <template slot-scope="scope">
              <div>{{ scope.row.reserverName }}</div>
              <div>{{ scope.row.reserverPhone }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="reserveDate"
            label="预约看房时间">
          </el-table-column>
          <el-table-column
            prop="accessMode"
            label="来源">
            <template slot-scope="scope">
              <span v-if="scope.row.accessMode === '1'">B端APP</span>
              <span v-if="scope.row.accessMode === '2'">B端WEB</span>
              <span v-if="scope.row.accessMode === '3'">C端H5</span>
              <span v-if="scope.row.accessMode === '4'">B端APP</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="followPerson"
            label="带看人">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
          <el-table-column
            prop="processState"
            label="受理状态">
            <template slot-scope="scope">
              <span v-if="scope.row.processState === '1'">待受理</span>
              <span v-if="scope.row.processState === '2'">已受理</span>
              <span v-if="scope.row.processState === '4'">无效</span>
            </template>
          </el-table-column>
          <el-table-column
            class="handler"
            prop="Done"
            label="操作"
            min-width="100">
            <template slot-scope="scope" style="margin-left: -1px">
              <el-button type="text" size="small" @click="searchLookFn(scope.row.id)">查看</el-button>
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
    <TakeLookList ref="lookList" :controlLog="controlLogList" />
  </el-main>
</template>

<script>
  import TakeLookList from "@/components/contract/TakeLookList.vue"
  export default {
    name: "orderList",
    data() {
      return {
        likeName:'',
        timeList: [],
        currentStatusType: '0',
        controlLogList: {
          brandName: '',
          reserverName: '',
          reserverPhone: '',
          roomNo: '',
          followPerson: '',
          reserveDate: '',
          remark: '',
          building: ''
        },
        options: [
          {
            value: '1',
            label: 'B端APP'
          },{
            value: '2',
            label: 'B端WEB'
          },
          {
            value: '3',
            label: 'C端H5'
          },{
            value: '4',
            label: 'C端APP'
          }
        ],
        value: '',
        loading: false,
        states: [],
        value6:'',
        nchdLikeName: [],
        //筛选的过滤信息
        search: {
          id: '',
          accessMode: '', // 访问来源 1.移动端 2.电脑端
          custSource: '', // 访问来源 1.移动端 2.电脑端
          reserveStartTime: '', // 预约开始时间
          reserveEndTime: '',// 预约结束时间
          brandId: '', // 公寓名称对应的id
          likeName: '', // 模糊查询
          pageNo: 1,
          pageSize: 10,
          processState:'0'
        },
        brandIdList: [{
         // brandName: '12345',
         //  id: '111'
        }],
        publisherList: [],
        //表格信息
        table: {
          tbody: [
            // {
            //   name: "荣尚荟公寓",
            //   roomNumber: "金地公寓/豪华大床房/201",
            //   telephone: "高雨婷18672920380",
            //   appointment: '2017-12-12',
            //   source: 'B端H5',
            //   seePeople: '李星娇',
            //   remarks: '',
            //   admissibility: "未受理",
            // },
          ],
          tfoot: [],
          totalRecord: 100
        },
        statusCountResp: {
          total: 0,
          pending: 0,
          invalid: 0,
          accepted: 0
        },
        likeNameBak: [
          {
            label: '楼盘名称',
            value: '1'
          },
          {
            label: '姓名',
            value: '2'
          },
          {
            label: '电话',
            value: '3'
          }
        ],
        likeNameArr: []
      };
    },
    methods: {
      getTime(daterange){
        this.time = daterange;
       // console.log(this.time);
      },
      //改变状态
      changeStatusType(processState) {
        this.search.processState = processState;
        this.currentStatusType = processState;
        this.queryDataFn();
      },
//      输入框
      deleteLikeName(val) {
        //console.info('删除节点:', val);
        let arrIndex = -1;
        for (let i = 0; i < this.likeNameArr.length; i++) {
          if (val.value === this.likeNameArr[i].value) {
            arrIndex = i;
            break;
          }
        }
        //console.info(arrIndex);
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
         // console.info('key:', this.likeNameArr[i]);
          if (key === this.likeNameArr[i].key) {
            arrIndex = i;
            break;
          }
        }
       // console.info('arrIndex', arrIndex);
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
      queryDataFn() {
        let likeNameStr = '';
        this.likeNameArr.forEach((item, index) => {
          let key = item.key;
          let value = item.value;
          likeNameStr += key + ':' + value;
          if (index !== this.likeNameArr.length - 1) {
            likeNameStr += ',';
          }
        });
        this.search.likeName = likeNameStr;
        let timeList = this.timeList
        console.log('time',this.timeList)
        this.search.reserveStartTime = timeList[0] ? timeList[0] : '';
        this.search.reserveEndTime = timeList[1] ? timeList[1] : '';
        let _this = this;
       // console.info('查询条件', this.search);
        _this.axios({
          method:'post',
          url: _this.$store.state.api.contract.get_contract_meetList,
          data: _this.search
        }).then(res => {
          const { data } = res;
          if (data.status.code === '200') {
            _this.table.tbody = data.result.list;
            console.info('_this.table.tbody', _this.table.tbody);
            _this.table.pageNo = data.result.pageNo;
            _this.table.totalRecord = data.result.totalRecord;
            _this.table.pageSize = data.result.pageSize;

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
            //console.info('_this.brandIdList', _this.brandIdList);
          }
        });
      },
      handleSizeChange(val) {
        //alert(1234)
        let _this = this;
        //console.info('每页多少条:', val);
        _this.search.pageSize = val;
        _this.queryDataFn();
      },
      handleCurrentChange(val) {
        let _this = this;
        // console.info('当前第几页:', val);
        if (_this.search.pageNo !== 0) {
          _this.search.pageNo = val;
          _this.queryDataFn();
        }
      },
      searchLookFn(id) {
        if (!id) {
          this.$message.warning('未找到带看人数据')
          return;
        }else {
          this.$refs.lookList.showFn(id);
        }
          // let _this = this;
          // _this.axios({
          //   method: 'post',
          //   url: this.$store.state.api.contract.get_contract_look,
          //   data: _this.search
          // }).then(res => {
          //  // console.log(res,123456);
          //   const {data} = res;
          //   //console.log(data);
          //   if (data && data.status.code === '200') {
          //     this.controlLogList = data.result;
          //   }
          // });
          // this.$refs.lookList.showFn(user);
      },
      queryOrderStatusCount () {
        // 获取状态数目
        let _this = this;
        let param = {
          brandId: '',
          accessMode: '',
          reserveStartTime: '',
          reserveEndTime: '',
          likeName: '',
        };
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.contract.get_contract_getCountNewByState,
          data: param
        }).then(res => {
          // console.log(res,5555);
          const { data } = res;
          //console.log(data,11111);
          if (data) {
            //console.log(data,4444)
            _this.statusCountResp = data.result;
          }
        });
      },
    },
    components: {
      TakeLookList
    },
    mounted() {
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
    },
    created() {
      this.queryDataFn()
      this.queryOrderStatusCount()
      this.queryGongYuList()
    }
  };
</script>

<style scoped lang="scss">
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
  }
  /deep/ .el-table th > .cell {
    font-size: 14px;
  }
  /deep/ .el-table thead tr {
    background: #f2f4f7;
    color: #2e3445;
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
  /deep/ .el-table__body-wrapper{
    height: calc(100vh - 300px);
  }
  .el-main{
    padding: 20px 20px 0 20px;
  }

</style>
