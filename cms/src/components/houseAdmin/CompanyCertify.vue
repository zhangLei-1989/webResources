<template>
  <el-main v-loading="loading">
    <el-row>
      <el-col :span="24">
        <a href="#" @click="changeBusinessType(1)">
          <el-tag type="cms active">企业认证</el-tag>
        </a>
        <a href="#" @click="changeBusinessType(2)">
          <el-tag type="cms">推广申请</el-tag>
        </a>
        <a href="#" @click="changeBusinessType(3)">
          <el-tag type="cms">电子签约申请</el-tag>
        </a>
        <a href="#" @click="changeBusinessType(4)">
          <el-tag type="cms">公众号对接</el-tag>
        </a>
        <a href="#" @click="changeConfirmType('0')">
          <el-tag :type = "currentConfirmType === '0' ? 'cms active' : 'cms'">全部({{statusCountResp.allCount}})</el-tag>
        </a>
        <a href="#" @click="changeConfirmType('3')">
          <el-tag :type = "currentConfirmType === '3' ? 'cms active' : 'cms'">待审核({{statusCountResp.waitCount}})</el-tag>
        </a>
        <a href="#" @click="changeConfirmType('1')">
          <el-tag :type = "currentConfirmType === '1' ? 'cms active' : 'cms'">已通过({{statusCountResp.yesCount}})</el-tag>
        </a>
        <a href="#" @click="changeConfirmType('4')">
          <el-tag :type = "currentConfirmType === '4' ? 'cms active' : 'cms'">未通过({{statusCountResp.noCount}})</el-tag>
        </a>
      </el-col>
    </el-row>
    <el-row class="noMarginLeft noMarginRight search" :gutter="20">
      <el-col :span="4" v-model="search.id" style="height: 40px;" class="noPaddingLeft">
        <el-cascader
          style="width: 100%"
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
          placeholder="企业名称、公寓名称"
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
        <el-button @click="queryDataFn" type="danger" style="flex: 1; padding: 12px 0px;">搜索</el-button>
        <el-button class="btnC noPaddingRight" @click="exportContractFn"
                   type="danger"
                   style="flex: 1; border-color:#2e3445;; padding: 12px 0px; background:#2e3445;;">导出</el-button>
      </el-col>
    </el-row>
    <el-row class="noMargin search noPaddingBottom">
      <el-col :span="24" style="overflow-y: auto;">
        <el-table :data="table.tbody" stripe border style="text-align: center; ">
          <el-table-column
            prop="gcid"
            label="安全码">
          </el-table-column>
          <el-table-column
            prop="raCompanyName"
            label="企业名称">
          </el-table-column>
          <el-table-column
            prop="brandName"
            label="公寓名称">
          </el-table-column>
          <el-table-column
            prop="raCompanyArea"
            label="所属区域">
          </el-table-column>
          <el-table-column
            prop="raCt"
            label="注册时间">
          </el-table-column>
          <el-table-column
            prop="compactAccessory"
            label="合同">
            <template slot-scope="scope">
              <span style="color:#31b1f9;"><i class="iconfont" @click="viewImg('查看合同', scope.row.compactAccessory)">&#xe601;</i></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="licensePic"
            label="附件">
            <template slot-scope="scope">
              <span style="color:#31b1f9;"><i class="iconfont" @click="viewImg('查看附件', scope.row.licensePic)">&#xe601;</i></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="confirmType"
            label="审核状态">
            <template slot-scope="scope">
              <span v-if="scope.row.confirmType === '1'" style="color:#1dbc6d;">已通过</span>
              <span v-if="scope.row.confirmType === '3'" style="color:#31b1f9;">待审核</span>
              <span v-if="scope.row.confirmType === '4'" style="color:#fb3636;">未通过</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="statusName"
            label="账号状态">
            <template slot-scope="scope" style="">
              <span v-if="scope.row.status === '1'" style="color:#1dbc6d;">正常</span>
              <span v-if="scope.row.status === '0'" style="color:#fb3636;">禁用</span>
            </template>
          </el-table-column>
          <el-table-column
            style="height: 600px;"
            prop="handle"
            label="操作"
            width="100">
            <template slot-scope="scope" style="height: auto">
              <el-dropdown>
                <span class="el-dropdown-link">{{scope.row.currentBtnName ? scope.row.currentBtnName : '操作'}}
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <div @click="handleCommand(scope.row, '详情')">
                    <el-dropdown-item command="详情">详情</el-dropdown-item>
                  </div>
                  <div @click="handleCommand(scope.row, '通过')">
                    <el-dropdown-item v-if="scope.row.confirmType === '3' || scope.row.confirmType === '4'" command="通过">通过</el-dropdown-item>
                  </div>
                  <div @click="handleCommand(scope.row, '取消通过')">
                    <el-dropdown-item v-if="scope.row.confirmType === '1'" command="取消通过">取消通过</el-dropdown-item>
                  </div>
                  <div @click="handleCommand(scope.row, '拒绝')">
                    <el-dropdown-item v-if="scope.row.confirmType === '3'" command="拒绝">拒绝</el-dropdown-item>
                  </div>
                  <div @click="handleCommand(scope.row, '编辑')">
                    <el-dropdown-item command="编辑">编辑</el-dropdown-item>
                  </div>
                  <div @click="handleCommand(scope.row, '支付设置')">
                    <el-dropdown-item command="支付设置">支付设置</el-dropdown-item>
                  </div>
                  <div @click="handleCommand(scope.row, '查看日志')">
                    <el-dropdown-item command="查看日志">查看日志</el-dropdown-item>
                  </div>
                  <div @click="handleCommand(scope.row, '禁用')">
                    <el-dropdown-item v-if="scope.row.status === '0'">禁用</el-dropdown-item>
                  </div>
                  <div @click="handleCommand(scope.row, '启用')">
                    <el-dropdown-item v-if="scope.row.status === '1'" command="启用">启用</el-dropdown-item>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
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
    <HouseEditor @on-close="onClose" ref="HouseEditor"/>
    <house-admin-slide-log @on-close="onClose" ref="HouseLog"/>
    <HousePay @on-close="onClose" ref="HousePay"/>
    <house-pass @on-close="onClose" :tit="tit" :messageObj="messageObj" ref="FH_HouseDelete"/>
    <view-house-img :tit="tit" ref="ViewHouseImg" />
  </el-main>
</template>

<script>
  import HouseEditor from '@/components/houseAdmin/HouseEditor.vue';
  import HouseAdminSlideLog from "@/components/houseAdmin/HouseAdminSlideLog.vue";
  import HousePay from "@/components/houseAdmin/HousePay.vue";
  import HousePass from "@/components/houseAdmin/HousePass.vue"
  import ViewHouseImg from "@/components/houseAdmin/ViewHouseImg.vue"
  export default {
    name: "HouseAdminManage",
    data() {
      return {
        messageDetial: '',
        // 状态
        tit: '删除',
        isShowBtn: false,
        messageObj: {
          title: '确定要删除这条消息吗？',
          value: '请输入原因(选填)'
        },
        currentConfirmType: '0',
        statusCountResp: {
          noCount: 0, // 未通过数
          allCount: 0, // 全部数
          waitCount: 0, // 待审核数
          yesCount: 0 // 已通过数
        },
        cityIdList: [],
        cityProps: {
          value: 'id',
          label: 'name',
          children: 'children'
        },
        cityTreeData: [],
        likeName: '',
        nchdLikeName: [],
        likeNameArr: [],
        likeNameBak: [
          {
            label: '企业名称',
            value: '1'
          },
          {
            label: '公寓名称',
            value: '2'
          }
        ],
        search: {
          raCompanyName: '', // 公司名称
          raCompanyCityId: '', //城市id
          raCompanyAreaId: '', //区域id
          confirmType: '', // 类型
          likeName: '', //模糊搜索
          sortFields: '', //排序
          sortType: '', //升序or降序
          pageNo: 1, //
          pageSize: 10, //
          totalRecord: '',
        },
        loading: false,
        currentBtnName: '操作',
        //筛选的过滤信息
        screening: {
          areaValue: "", //城市/区域
          area: [] //城市/区域
        },
        tit: '通过审核',
        messageObj: {
          title: '确定要通过该房行的企业认证吗？',
          value: '请输入原因(选填)'
        },
        //表格信息
        table: {
          tbody: [
            // {
            //   id: 1,
            //   raCompanyCityRaCompanyArea: '城市',
            //   confirmTypeName: '待审核',
            //   confirmType: '1'
            // }
            // {
            //   status: '0',
            //   confirmType: '2'
            // },
            // {
            //   status: '1',
            //   confirmType: '3'
            // },
            // {
            //   confirmType: '4'
            // },
            // {
            //   compactAccessory: 'http://fangqian.oss-cn-beijing.aliyuncs.com/_def97fb8-5be3-426f-a873-b3da63f9e6fa_b.jpg'
            // },
            // {
            //   licensePic: '4'
            // }
          ],
          tfoot: [],
          totalRecord: 100,
        }
      };
    },
    methods: {
      onClose(id) {
        for (let i = 0; i < this.table.tbody.length; i++) {
          if (this.table.tbody[i].id === id) {
            this.table.tbody[i].currentBtnName = '操作';
            break;
          }
        }
      },
      viewImg(title, url) {
        this.tit = title;
        //alert(title);
        //  alert(url);
        this.$refs.ViewHouseImg.showFn(url);
      },
      exportContractFn () {
        let data = JSON.stringify(this.search);
        //console.info('data', data);
        window.location.href = this.$store.state.api.resources_adjust.export_houseLine + '?data=' + data;
      },
      changeBusinessType(type) {
        let path = '';
        switch (type) {
          case 1: {
            path = '/houseAdmin/houseAdminManage/companyCertify';
            break;
          }
          case 2: {
            path = '/houseAdmin/houseAdminManage/extendApply';
            break;
          }
          case 3: {
            path = '/houseAdmin/houseAdminManage/signApply';
            break;
          }
          case 4: {
            path = '/houseAdmin/houseAdminManage/publicNumber';
            break;
          }
        }
        this.$router.replace(path);
      },
      changeConfirmType(confirmType) {
        this.search.confirmType = confirmType;
        this.currentConfirmType = confirmType;
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
        // console.info(arrIndex);
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
          //  console.info('key:', this.likeNameArr[i]);
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
      queryCityList() {
        // 查询城市集合
        let _this = this;
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.house.get_citySelectTwo_list, // 公寓列表
          data: ''
        }).then(res => {
          // console.log('res: ', res);
          const {data} = res;
          if (data.status.code === '200') {
            if (!data.result) {
              //  console.error('查询到的城市列表为空');
              return;
            }
            _this.cityTreeData = data.result.cityList;
          }
        });
      },
      queryOrderStatusCount() {
        // 获取状态数目
        let _this = this;
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.resources_adjust.get_houseLineCount_list,
          data: ''
        }).then(res => {
          // console.log(res);
          const {data} = res;
          //console.log(data,11111);
          if (data) {
            _this.statusCountResp = data.result;
          }
        });
      },
      // 获取详情
      handleCommand(row, command) {
        let _this= this
       // _this.$set(row,'currentBtnName', command);
        if (command === '编辑') {
          if (command === '编辑') {
            _this.axios({
              method: 'post',
              url: _this.$store.state.api.resources_adjust.get_houseLine,
              data: {
                id: row.id
              }
            }).then(res => {
              // console.info(res, '我是要回显的大数据');
              const {data} = res;

              if (data.status.code === '200') {
                //  console.log('我是data',data.result)
                _this.messageDetail = data.result;
                console.log(this.messageDetail, '我要回显fang');
                this.$refs.HouseEditor.showFn(this.messageDetail);
              }
            });
            // this.$refs.HouseEditor.showFn({id: 1});

            // this.messageDetail = {
            //   // brandName: '公寓名称', // 公寓名称
            //   //   licenseNo: '业执照号', // 营 业执照号
            //   //   raCompanyAreaId: '区域id', // 区域id
            //   //   licensePic: '营业执照附件', // 营业执照附件
            //   //   cooperationTime: '合同签约日期', // 合同签约日期
            //   //   raHouseNumber: '签约体量 number', // 签约体量 number
            //   //   houseModel: '经营模式', // 经营模式
            //   //   companyIntro: '公司简介', // 公司简介
            //   //   raCompanyCityId: '城市id', // 城市id
            //   //   connectMan: '联系人', // 联系人
            //   //   raCompanyName: '企业名称', // 企业名称
            //   //   connectPhone: '联系人电话', // 联系人电话
            //   //   compactAccessory: '合同附件', // 合同附件
            //   //   raCompanyAddress: '', // 具体地址
            //   //   raLogo: '具体地址', // logo
            //   //   id: 'id', // id
            //   //   gcid: '安全码' // 安全码
            // };
            // this.$refs.HouseEditor.showFn(this.messageDetail);
          }
          //this.$refs.HouseEditor.showFn();
        }
        if (command === '详情') {
          this.$refs.HouseLog.showFn(row.id, 0);
        }
        if (command === '查看日志') {
          this.$refs.HouseLog.showFn(row.id, 1);
        }
        if (command === '支付设置') {
          this.$refs.HousePay.showFn(row.gcid, row.id);
        }
        if (command === '通过') {
          this.housePassFn(row.id, 'pass');
        }
        if (command === '取消通过') {
          this.houseCancelPassFn(row.id, 'cancel-pass');
        }
        if (command === '拒绝') {
          this.houseRefuseFn(row.id, 'refuse');
        }
        if (command === '禁用') {
          this.disableByIdFn(row.id, 'disable');
        }
        if (command === '启用') {
          this.enableByIdFn(row.id, 'enable');
        }
      },
      houseCancelPassFn(id, type) {
        if (!id) {
          // alert('请先选择一行数据'); // 提示请按需求文档
        } else {
          this.tit = '取消审核通过';
          this.messageObj = {
            title: '确定要取消该房行的企业认证审核吗？',
            value: '请输入原因(必填)'
          };
          this.$refs.FH_HouseDelete.showFn(id, type);
        }
      },
      housePassFn(id, type) {
        if (!id) {
          // alert('请先选择一行数据'); // 提示请按需求文档
        } else {
          this.tit = '通过审核';
          this.messageObj = {
            title: '确定要通过该房行的企业认证吗？',
            value: '请输入原因(选填)'
          };
          this.$refs.FH_HouseDelete.showFn(id, type);
        }
      },
      houseRefuseFn(id, type) {
        if (!id) {
          // alert('请先选择一行数据'); // 提示请按需求文档
        } else {
          this.tit = '驳回审核';
          this.messageObj = {
            title: '确定要驳回该房行的企业认证吗？',
            value: '请输入原因(必填)'
          };
          this.$refs.FH_HouseDelete.showFn(id, type);
        }
      },
      enableByIdFn(id, type) {
        if (!id) {
          // alert('请先选择一行数据'); // 提示请按需求文档
        } else {
          this.tit = '启用';
          this.messageObj = {
            title: '确定要启用该房行吗？',
            value: '请输入原因(选填)'
          };
          this.$refs.FH_HouseDelete.showFn(id, type);
        }
      },
      disableByIdFn(id, type) {
        if (!id) {
          //  alert('请先选择一行数据'); // 提示请按需求文档
        } else {
          this.tit = '禁用';
          this.messageObj = {
            title: '确定要禁用该房行吗？',
            value: '请输入原因(必填)'
          };
          this.$refs.FH_HouseDelete.showFn(id, type);
        }
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
      queryDataFn() {
        let cityIdList = this.cityIdList;
        this.search.raCompanyCityId = cityIdList[0] ? cityIdList[0] : '';
        this.search.raCompanyAreaId = cityIdList[1] ? cityIdList[1] : '';
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
        // console.info('查询条件', this.search);
        // 获取用户管理列表
        let _this = this;
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.resources_adjust.get_houseLine_list,
          data: _this.search
        }).then(res => {
          // console.log('房行列表', res);
          const {data} = res;
          if (data.status.code === '200') {
            this.table.tbody = data.result.houseLineList;
            this.table.pageNo = data.result.pageNo; // 当前第几页
            this.table.totalRecord = data.result.totalRecord; // 总共的条数
            this.table.pageSize = data.result.pageSize; //每页多少条
          }
        });
      },
    },
    created() {
      this.queryDataFn(); // 初始化页面数据
      this.queryCityList();
      this.queryOrderStatusCount();
    },
    components: {
      HouseEditor,
      HouseAdminSlideLog,
      HousePay,
      HousePass,
      ViewHouseImg
    }
  };
</script>

<style scoped lang="scss">
  .iconfont{
    font-family:"iconfont";
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    padding-left:20px
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #333;
  }

  .el-icon-arrow-down {
    font-size: 12px;
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
