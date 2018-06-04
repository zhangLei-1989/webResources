<template>
<el-main class="mainPad" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.3)">
    <el-row class="noMarginLeft noMarginRight search" :gutter="20">
      <el-col :span="2" class="noPaddingLeft">
        <el-select v-model="screening.brandId" clearable placeholder="公寓" style="width:100%;">
          <el-option
            style="width:87.4063px;"
            v-for="item in brand"
            :key="item.id"
            :label="item.brandName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="noPaddingLeft">
        <el-cascader
          v-model="vcityList"
          :options="cityList"
          filterable
          clearable
          change-on-select
          placeholder="城市/区域/商圈"
          :props="cityProps"
          style="width:100%;">
        </el-cascader>
      </el-col>
      <el-col :span="3" class="noPaddingLeft">
        <el-select v-model="screening.guNeedType" clearable placeholder="需求类型" style="width:100%;">
          <el-option
            <el-option
              v-for="item in xuqiuType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="noPaddingLeft">
        <el-select v-model="screening.guAccessMode" clearable placeholder="来源" style="width:100%;">
          <el-option
           <el-option
              v-for="item in laiyuan"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </el-col>
      <el-col :span="5" class="noPaddingLeft" style="overflow:hidden;">
        <el-date-picker
          v-model="timeT"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="——"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="timexz"
          style="width:100%;">
        </el-date-picker>
      </el-col>
      <el-col :span="8" class="noPadding" style="width:32%; position:relative; height: 40px;">
        <el-select
          v-model="nchdLikeName"
          @change="changeLikeName"
          @remove-tag = "deleteLikeName"
          class="inline-input"
          multiple
          filterable
          remote
          :remote-method="remoteMethod"
          :loading="loading"
          placeholder="姓名、电话"
          style="width: 100%;">
            <el-option
              v-for="item in likeName"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </el-col>
      <el-col :span="1" class="noPaddingLeft">
        <el-button @click="time" class="btnC" type="danger" style="width:auto; padding: 12px;">搜索</el-button>
      </el-col>
      <el-col :span="1">
        <el-button @click="exportContractFn" class="btnC" type="danger" style="width:auto; padding: 12px; background:#2b3142; border-color:#2b3142;">导出</el-button>
      </el-col>
    </el-row>
    <el-row class="noMargin search noPaddingBottom">
      <el-col :span="24" style="overflow-y: auto;height: 390px;">
        <el-table :data="table.tbody" stripe border>
          <el-table-column 
            prop="brand"
            label="公寓名称">
          </el-table-column>
          <el-table-column 
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column 
            prop="phone"
            label="手机号">
          </el-table-column>
          <el-table-column 
            prop="CityQuyu"
            label="城市/区域/商圈">
            <template slot-scope="scope">
              <div>{{ scope.row.guCityName}}/{{ scope.row.guTownName }}/{{ scope.row.guDistrictName }}</div>
            </template>
          </el-table-column>
          <el-table-column 
            prop="guXuqiuZhengZu"
            label="需求类型">
              <template slot-scope="scope">
                <span v-if="scope.row.guXuqiuZhengZu=='1'">整租</span>
                <span v-if="scope.row.guXuqiuZhengZu=='2'">合租</span>
              </template>
          </el-table-column>
          <el-table-column 
            prop="PriceRange"
            label="价格区间">
            <template slot-scope="scope">
              <div>{{ scope.row.guMinMoney}}-{{ scope.row.guMaxMoney }}</div>
            </template>
          </el-table-column>
          <el-table-column 
            prop="guAccessMode"
            label="来源">
              <template slot-scope="scope">
                <span v-if="scope.row.guAccessMode=='1'">B端APP</span>
                <span v-if="scope.row.guAccessMode=='2'">B端WEB</span>
              </template>
          </el-table-column>
          <el-table-column 
            prop="guCt"
            label="创建时间">
          </el-table-column>
          <el-table-column 
            prop="Remarks"
            label="备注">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="noMargin search">
      
    </el-row>
    <el-footer class="footer block" height="50px">
      <el-pagination class="liColor"
        :background=true
        :page-sizes="[10, 20, 50]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="search.pageNo"
        :page-size="search.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="table.totalRecord">
      </el-pagination>
    </el-footer>
  </el-main>
</template>

<script>
import tool from "../../../static/js/tool.js";
export default {
  name: "portBUser",
  data() {
    return {
      likeNameBak: [
        {
          label: '姓名：',
          value: '1'
        },
        {
          label: '电话：',
          value: '2'
        }
      ],
      likeNameArr: [],
      likeName: '',
      nchdLikeName: [],
      userInit: {},
      loading: false,
      xuqiuType:[
        {
          value: '0',
          label: '整租'
        },
        {
          value: '1',
          label: '合租'
        },
        {
          value: '2',
          label: '集中'
        }
      ],
      cityProps: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      laiyuan:[
        {
          value: '1',
          label: 'B端APP'
        },
        {
          value: '2',
          label: 'B端WEB'
        }
      ],
      value: '',
      brand: [],
      hello: '',
      timeT: [],
      cityList: [],
      vcityList: [],
      //筛选的过滤信息
      screening: {
        brandId: "",//公寓名称
        guTownId: "",//区域
        guCityId: "",//城市
        guDistrictId: "",//商圈
        guNeedType: "",//需求类型
        guAccessMode: "",//来源
        keyWords: "",//姓名电话
        pageNo: 1,
        pageSize: 10,
        guCtBegin: "",//开始时间
        guCtEnd: ""//结束时间
      },
      search: {
        pageNo: 1,
        pageSize: 10
      },
      //表格信息
      table: {
        thead: [
          {
            prop: "UserRole",
            label: "用户角色"
          },
          {
            prop: "CreationTime",
            label: "创建时间"
          },
          {
            prop: "ModificationTime",
            label: "修改时间"
          },
          {
            prop: "Describe",
            label: "描述"
          }
        ],
        tbody: [
          // {
          //   ApartmentName: "王云峰",
          //   UName:"asdad",
          //   CellphoneNumber:"ads",
          //   CityQuyu:"fff",
          //   Demand:"阿斯顿",
          //   PriceRange:"请问企鹅",
          //   Source:"啊实打实的",
          //   CreationTime:"12321321",
          //   Remarks:"请问请问"
          // }
        ],
        cityL:[],
        tfoot: [],
        currentPage: 1,
        totalRecord: 0
      },
      fypd: "1", //列表分页判断
      fypd1: "1" //搜索分页判断
    }
  },
  methods: {
    exportContractFn () {
        let _this = this;
        _this.screening.pageNo = "";
        _this.screening.pageSize = "";
        let likeNameStr = '';
      _this.likeNameArr.forEach((item, index) => {
        let key = item.key;
        let value = item.value;
        likeNameStr += key + ':' + value;
        if (index !== _this.likeNameArr.length - 1) {
          likeNameStr += '&';
        }
      });
      _this.screening.guCtBegin = _this.timeT[0];
      _this.screening.guCtEnd = _this.timeT[1];
      _this.screening.keyWords = likeNameStr;
      _this.screening.guCityId = _this.vcityList[0];
      _this.screening.guTownId = _this.vcityList[1];
      _this.screening.guDistrictId = _this.vcityList[2];
        let data = JSON.stringify(_this.screening);
        console.info('data', data);
        window.location.href = _this.$store.state.api.user.export_list + '?data=' + data;
    },
    time() {
      const _this = this;
      self.loading = true;
      _this.fypd = "1";
      _this.fypd1 = "2";
      let likeNameStr = '';
      _this.likeNameArr.forEach((item, index) => {
        let key = item.key;
        let value = item.value;
        likeNameStr += key + ':' + value;
        if (index !== _this.likeNameArr.length - 1) {
          likeNameStr += '&';
        }
      });
      _this.screening.guCtBegin = _this.timeT[0];
      _this.screening.guCtEnd = _this.timeT[1];
      _this.screening.keyWords = likeNameStr;
      _this.screening.guCityId = _this.vcityList[0];
      _this.screening.guTownId = _this.vcityList[1];
      _this.screening.guDistrictId = _this.vcityList[2];
      _this.axios({
        method:'post',
        url: _this.$store.state.api.user.get_list,
        headers:{
          userid: _this.userInit.id,
          token: _this.userInit.token
        },
        data: _this.screening
      }).then(function(response) {
        _this.loading = false;
        const { data } = response;
        if (data.status.code == 200) {
          console.log(_this.screening);
          _this.table.tbody = data.result.list;
          _this.table.pageNo = data.result.pageNo;
          _this.table.totalRecord = data.result.totalRecord;
          _this.table.pageSize = data.result.pageSize;
        }
      });
    },
    conso() {
      var szz = document.getElementById("sz");
      var input = document.getElementById("inbl");
      szz.style.display = "block";
      input.addEventListener("blur", function(){
        szz.style.display = "none";
      });
    },
    conso1() {
      var obj = {};
      Object.defineProperty(obj,'hello',{
          set:function(val){
              document.getElementById('sz11').innerHTML = val;
              document.getElementById('sz22').innerHTML = val;
              document.getElementById('inbl').value = val;
          }
      });
      document.getElementById('inbl').onkeyup = function(e){
          obj.hello = e.target.value;
      };
    },
    changeLikeName(val) {
      console.info('change节点:', val);
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
        console.info('key:', this.likeNameArr[i]);
        if (key === this.likeNameArr[i].key) {
          arrIndex = i;
          break;
        }
      }
      console.info('arrIndex', arrIndex);
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
    deleteLikeName(val) {
      console.info('删除节点:', val);
      let arrIndex = -1;
      for (let i = 0; i < this.likeNameArr.length; i++) {
        if (val.value === this.likeNameArr[i].value) {
          arrIndex = i;
          break;
        }
      }
      console.info(arrIndex);
      if (arrIndex > -1) {
        this.likeNameArr.splice(arrIndex);
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
      const _this = this;
      self.loading = true;
      _this.fypd = "2";
      _this.fypd1 = "1";
      _this.axios({
        method:'post',
        url: _this.$store.state.api.user.get_list,
        headers:{
          userid: _this.userInit.id,
          token: _this.userInit.token
        },
        data: _this.search
      }).then(function(response) {
        self.loading = false;
        const { data } = response;
        if (data.status.code == 200) {
          console.log(data.result);
          _this.table.tbody = data.result.list;
          _this.table.pageNo = data.result.pageNo;
          _this.table.totalRecord = data.result.totalRecord;
          _this.table.pageSize = data.result.pageSize;  
        }
      });
    },
    handleSizeChange(val) {
      let _this = this;
      _this.search.pageSize = val;
      if(_this.fypd == 2){
        _this.queryDataFn();
      }else if(_this.fypd1 == 2){
        _this.screening.pageSize = val;
        _this.time();
      }
    },
    handleCurrentChange(val) {
      let _this = this;
      if (_this.search.pageNo !== 0) {
        _this.search.pageNo = val;
        if(_this.fypd == 2){
          _this.queryDataFn();
        }else if(_this.fypd1 == 2){
          _this.screening.pageNo = val;
          _this.time();
        }
      }
    },
    ncityList() {
      // 查询城市集合
      let _this = this;
      _this.axios({
        method: 'post',
        url: _this.$store.state.api.house.get_citySelect_list, // 查公寓url
        headers:{
          userid: _this.userInit.id,
          token: _this.userInit.token
        },
        data: ''
      }).then(res => {
        const { data } = res;
        if (data.status.code === '200') {
          var clist = data.result.cityList;
          console.log(clist);
          if (!data.result) {
            return;
          }
          _this.cityList = clist;
        }
      });
    },
    brandList() {
      let _this = this;
      _this.axios({
        method:'post',
          url: _this.$store.state.api.house.get_companyList_list,
          headers:{
            userid: _this.userInit.id,
            token: _this.userInit.token
          },
        }).then(function(response) {
          self.loading = false;
          const { data } = response;
          if (data.status.code == 200) {
            console.log(data,1231231232)
            _this.brand = data.result.list;
          }
        });
    }
  },
  created() {
    const self = this;
    const userInfo = tool.session.get("userInfo");
    self.userInit = userInfo;
    self.queryDataFn();
    self.ncityList();
    self.brandList();
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
  padding: 20px;
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
.liColor /deep/ .el-pager .number:hover{
  color: red !important;
}
.liColor /deep/ .el-pager li.active:hover{
  color: #fff !important;
}
/deep/ .el-button{
  color: #ed0536;
}
.btnC{
  color: #fff;
}
.footer{
  border: solid 1px #e5e5e5;
  margin-top: 20px;
  line-height: 50px;
  overflow: hidden;
  background: #f9f9f9 !important;
  position: fixed;
  z-index: 222222;
  width: 89.7%;
  bottom: 0;
  .el-col{
    width: auto;
    float: right;
  }
}
.footer .el-pagination{
  margin-top: 10px;
}
.xz{
  position: absolute;
  top: 10px;
  left: 0;
  margin-right: 10px;
}
.xz span{
  margin-left: 5px;
  line-height: 28px;
}
.sz{
  width: 100%;
  height: auto;
  overflow: hidden;
  position: absolute;
  top: 100%;
  left: 0;
  padding: 0 10px;
  margin-top: 5px;
  background: #fff;
  border-radius: 3px;
  border: solid 1px #eee;
  z-index: 999999;
}
.sz span{
  display: block;
  font-size: 14px;
  line-height: 24px;
  cursor: pointer;
}
/deep/ .el-table--striped .el-table__body tr.el-table__row--striped:hover td {
  background: #ecf5ff;
}
</style>