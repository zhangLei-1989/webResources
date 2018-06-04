<template>
  <el-main>
    <el-main class="mainPad" v-loading="loading">
      <el-row class="noMarginLeft noMarginRight search" :gutter="20">
        <el-col :span="4" class="noPaddingLeft" style="height: 40px;">
          <el-cascader
            style="width: 100%;"
            placeholder="城市/区域"
            :options="cityTreeData"
            filterable
            clearable
            change-on-select
            v-model="cityIdList"
            :props="cityProps"
            class="pc-input-col3">
          </el-cascader>
        </el-col>
        <el-col :span="17" class="noPaddingRight noPaddingLeft">
          <el-select
            v-model="nchdLikeName"
            @change="changeLikeName"
            @remove-tag="deleteLikeName"
            class="inline-input"
            style="width:100%;"
            multiple
            filterable
            remote
            placeholder="公寓名称、安全码、联系人、手机号"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in likeName"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!--<el-input v-model="search.messageTitle" placeholder="公寓名称、安全码、联系人、手机号码、" style="width:100%;"></el-input>-->
        </el-col>
        <el-col :span="3" class="noPaddingLeft noPaddingRight" style="display: flex;">
          <el-button @click="queryDataFn" class="btnC" type="danger" style="flex: 1; padding: 12px 0px;">搜索</el-button>
          <el-button class="btnC" @click="exportContractFn" type="danger" style="flex: 1; background:#2e3445; border-color:#2e3445; padding: 12px 0;">导出</el-button>
        </el-col>
      </el-row>
      <div>
      <el-row class="noMargin search noPaddingBottom">
        <el-col :span="24" style="overflow-y: auto;">
          <el-table :data="table.tbody" stripe border style="text-align: center;">
            <el-table-column
              prop='gcid'
              label="安全码">
            </el-table-column>
            <el-table-column
              prop="brandName"
              label="公寓名称">
            </el-table-column>
            <el-table-column
              prop="raCompanyCityraCompanyArea"
              label="所属区域">
              <template slot-scope="scope">
                <span> {{scope.row.raCompanyCity}}-{{scope.row.raCompanyArea}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="nickName"
              label="联系人">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机">
            </el-table-column>
            <el-table-column
              prop="ct"
              label='注册时间'>
            </el-table-column>
            <el-table-column
              prop="statusName"
              label="状态"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.status=='0'" style="color:#1dbc6d;">有效</span>
                <span v-if="scope.row.status=='1'" style="color:#31b1f9;">停止</span>
              </template>
            </el-table-column>
            <el-table-column
              class="handler"
              prop="Done"
              label="操作"
              width="220">
              <template slot-scope="scope" style="margin-left: -1px">
                <el-button type="text" size="small" @click="queryYuanGongList(scope.row)">查看</el-button>
                <el-button type="text" size="small" @click="queryMessageLogFn(scope.row)">日志</el-button>
                <el-button type="text" size="small" @click="queryDetailMessageFn(scope.row.id)">编辑</el-button>
                <el-button type="text" v-if="scope.row.status === '0'" size="small"
                           @click="disableByIdFn(scope.row.id)">停止
                </el-button>
                <el-button type="text" v-if="scope.row.status === '1'" size="small" @click="enableByIdFn(scope.row.id)">
                  启用
                </el-button>
                <el-button type="text" size="small" @click="deleteMessageByIdFn(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      </div>
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
        <!--<el-col :span="10" style="float:left;">-->
          <!--&lt;!&ndash;<div class="grid-content bg-purple">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-checkbox></el-checkbox>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--</el-col>-->

      <HouseLog ref="houseLog"/>
      <HouseDelete :tit="tit" :messageObj="messageObj" ref="houseDelete"/>
      <AddCmsUser ref="MessageDetail"/>
      <HouseLook ref="houseLook"/>
    </el-main>
  </el-main>

</template>

<script>
  import HouseLog from "@/components/houseAdmin/HouseLog.vue";
  import HouseDelete from "@/components/houseAdmin/HouseDelete.vue";
  import AddCmsUser from '@/components/houseAdmin/AddCmsUser.vue';
  import HouseLook from '@/components/houseAdmin/HouseLook.vue';

  export default {
    name: "userManage",
    data() {
      return {
        recordedDataId: '',
        isShow: false,
        controlLogList: [],
        dialogTableVisible: false,
        loading: false,
        states: ["Alabama", "Alaska", "Arizona",],
        likeName: '',
        nchdLikeName: [],
        likeNameArr: [],
        likeNameBak: [
          {
            label: '公寓名称',
            value: '1'
          },
          {
            label: '安全码',
            value: '2'
          },
          {
            label: '联系人',
            value: '3'
          },
          {
            label: '手机号',
            value: '4'
          }
        ],
        // 筛选的过滤信息
        search: {
          id: "",
          gcid: '',
          phone: '',
          nickName: "",
          brandName: '',
          sortFields: '',
          likeName: '',
          sortType: '',
          totalRecord: '',
          status: '',
          pageNo: 1,
          pageSize: 10,
          areaId: '',
          cityId: '',
          raCompanyName: '',
          raCompanyCityId: '',
          raCompanyAreaId: '',
          confirmType: '',
        },
        log: {
          recordedDataId: '',
          gcid: '',
          sortType: '',
          sortFields: '',
          pageNo: '',
          pageSize: '',
          totalRecord: '',
        },
        cityIdList: [],
        cityProps: {
          value: 'id',
          label: 'name',
          children: 'children'
        },
        cityTreeData: [],
        publisherList: [],
        tit: '删除',
        messageObj: {
          title: '确定要删除这个用户吗？',
          value: '请输入原因(选填)'
        },
        //表格信息
        table: {
          tbody: [
            // {
            //   id: 1,
            //   brandName: '111',
            //   gcid: 1
            // }
          ],
          tfoot: [],
          totalRecord: 100
        },
        messageDetail: {
          phone: '',
          nickName: '', // 昵称
          accountPwd: '', // 密码
          brandName: '', // 公寓名称
          companyCityId: '', // 城市id
          companyCityName: '', // 城市名称
          areaId: '' // 区域id
        }
      };
    },
    methods: {
      exportContractFn () {
        let data = JSON.stringify(this.search);
       // console.info('data', data);
        window.location.href = this.$store.state.api.resources_adjust.export_excel_houseLine + '?data=' + data;
      },
      changeStatusType(statusType) {
        this.search.statusType = statusType;
        this.currentStatusType = statusType;
        this.queryDataFn();
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
        //console.info(arrIndex);
        if (arrIndex > -1) {
          this.likeNameArr.splice(arrIndex);
        }
      },
      changeLikeName(val) {
       // console.info('change节点:', val);
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
      queryCityList() {
        // 查询城市集合
        let _this = this;
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.house.get_citySelectTwo_list, // 查公寓url
          data: ''
        }).then(res => {
          //console.log('res: ', res);
          const {data} = res;
          if (data.status.code === '200') {
            if (!data.result) {
             // console.error('查询到的城市列表为空');
              return;
            }
            _this.cityTreeData = data.result.cityList;
            //console.info('_this.cityTreeData', _this.cityTreeData);
          }
        });
      },
      queryDetailMessageFn(id) {
      //  alert('查询Id:' + id);
        this.axios({
          method: 'post',
          url: this.$store.state.api.resources_adjust.get_houseLine_huixian,
          data: {
            id: id
          }
        }).then(res => {
         console.info(res, '我是要回显的大数据');
          const {data} = res;
          if (data.status.code === '200') {
            this.messageDetail = data.result;
            console.log(this.messageDetail, '我要回显');
            this.$refs.MessageDetail.showFn('update', this.messageDetail);
          }
        });
        // this.$refs.MessageDetail.showFn('update', this.messageDetail);
      },
      deleteMessageByIdFn(id) {
        if (!id) {
         // alert('请先选择一行数据'); // 提示请按需求文档
        } else {
          this.tit = '删除';
          this.messageObj = {
            title: '确定要删除该用户吗？',
            value: '请输入原因(选填)'
          };
          this.$refs.houseDelete.showFn(id, 'delete');
        }
      },
      queryYuanGongList(user) {
        console.info('user', user);
        if (!user.id || !user.gcid) {
          this.$message.warning('未找到该公司')
          return;
        }
        this.$refs.houseLook.showFn(user);
      },
      disableByIdFn(id) {
        if (!id) {
          //alert('请先选择一行数据'); //
        } else {
          this.tit = '停止';
          this.messageObj = {
            title: '确定要停止该用户吗？',
            value: '请输入原因(选填)'
          };
          this.$refs.houseDelete.showFn(id, 'disable');
        }
      },
      enableByIdFn(id) {
        if (!id) {
         // alert('请先选择一行数据');
        } else {
          this.tit = '启用';
          this.messageObj = {
            title: '确定要启用该用户吗？',
            value: '请输入原因(选填)'
          };
          this.$refs.houseDelete.showFn(id, 'enable');
        }
      },
      queryDataFn() {
        // 获取用户管理列表
        let cityIdList = this.cityIdList;
        this.search.cityId = cityIdList[0] ? cityIdList[0] : '';
        this.search.areaId = cityIdList[1] ? cityIdList[1] : '';
        let likeNameStr = '';
        let likeNameArr = this.likeNameArr;
        likeNameArr.forEach((item, index) => {
          let key = item.key;
          let value = item.value;
          likeNameStr += key + ':' + value;
          if (index !== likeNameArr.length - 1) {
            likeNameStr += '&';
          }
        });
        this.search.likeName = likeNameStr;
        //console.info('查询条件', this.search);

        let _this = this;
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.resources_adjust.get_manger_list,
          data: _this.search
        }).then(res => {
         // console.log(res, 666666);
          const {data} = res;
          if (data.status.code === '200') {
            this.table.tbody = data.result.jjuserHomeList;
            this.table.pageNo = data.result.pageNo; // 当前第几页
            this.table.totalRecord = data.result.totalRecord; // 总共的条数
            this.table.pageSize = data.result.pageSize; //每页多少条
          }
        });
      },
      queryPublisherListFn() {
        //console.info('queryPublisherListFn');
        this.axios({
          method: 'get',
          url: ''
        }).then(res => {
         // console.info(res);
          if (!res.data.reuslt) {
          //  console.error('查询到的发布人集合为空');
            return;
          }
          for (let ctId in res.data.result) {
            let obj = {};
            obj.label = ctId.name;
            obj.value = ctId.code;
            this.publisherList.push(obj);
          }
        });
      },
      handleSizeChange(val) {
        this.search.pageSize = val;
        this.queryDataFn();
      },
      handleCurrentChange(val) {
        if (this.search.pageNo !== 0) {
          this.search.pageNo = val;
          this.queryDataFn();
        }
      },
      close_popUp() {
        // 关闭弹出框
        //this.$refs.parents.style.display = "none";
      },
      queryMessageLogFn(user) {
        //this.id = userId.id
       // console.info('用户id: ', this.id);
        let _this = this;
        _this.queryHouseLogFn(user, (list) => {
          _this.$refs.houseLog.showFn(list);
        });
        let list = [];
        _this.$refs.houseLog.showFn(list);
      },
      queryHouseLogFn(user, fn) {
       // console.info('用户id: ', user.id);
        let _this = this;
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.resources_adjust.get_houseLine_log,
          data: {
            recordedDataId: user.id,
          }
        }).then(res => {
         // console.info(res,'house');
          const {data} = res;
          if (data.status.code === '200') {
            // console.log(data,'rizhi')
            _this.controlLogList = data.result.list;
            fn && fn(this.controlLogList);
          }
        });
        // 查数据
        // this.controlLogList = [
        //   {
        //     operationContent: "删除",
        //     userName: "高雨婷",
        //     ct: "2017-08-17 15:50:10",
        //     remarks: "备注",
        //     title: '消息标题',
        //   },
        //   {
        //     operationContent: "批量删除",
        //     userName: "高雨婷",
        //     ct: "2017-08-17 15:50:10",
        //     remarks: "备注",
        //     title: '消息标题'
        //   }
        // ];
       // let userId = '';
       // this.queryLogFn(userId, () => {
       //   this.$refs.houseLog.showFn();
       // });
      },
      batchDelete() {
        this.$refs.MessageBatchDelete.showFn();
      }
    },
    components: {
      HouseLog,
      HouseDelete,
      AddCmsUser,
      HouseLook
    },
    created: function () {
      this.queryDataFn(); // 初始化页面数据
      this.queryCityList(); // 查询城市的二级列表
      this.publisherList = [{
      //   value: '选项1',
      //   label: '黄金糕'
      // }, {
      //   value: '选项2',
      //   label: '双皮奶'
      // }, {
      //   value: '选项3',
      //   label: '蚵仔煎'
      }];
    }
  };
</script>

<style scoped lang="scss">
  .mainPad {
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
    text-align: center;

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

  /deep/ .el-button {
    color: #ed0536;
  }

  .btnC {
    color: #fff;
  }
  .handler {
    border-left: 0;
  }
  .footer{
    background: #f9f9f9 !important;
  }
  /deep/ .el-table__body-wrapper{
    height: calc(100vh - 300px);
  }
  .el-main{
    padding: 20px 20px 0 20px;
  }
</style>
