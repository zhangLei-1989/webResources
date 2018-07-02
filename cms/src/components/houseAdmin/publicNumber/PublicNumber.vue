<template>
  <el-main v-loading="loading">
    <el-row>
      <el-col :span="24">
        <a href="#" @click="changeBusinessType(1)">
          <el-tag type="cms">企业认证</el-tag>
        </a>
        <a href="#" @click="changeBusinessType(2)">
          <el-tag type="cms">推广申请</el-tag>
        </a>
        <a href="#" @click="changeBusinessType(3)">
          <el-tag type="cms">电子签约申请</el-tag>
        </a>
        <a href="#" @click="changeBusinessType(4)">
          <el-tag type="cms active">公众号对接</el-tag>
        </a>
      </el-col>
    </el-row>
    <el-row class="noMargin search noPaddingBottom">
      <el-col :span="24" style="overflow-y: auto;">
        <el-table :data="table.tbody" stripe border style="text-align: center; ">
          <el-table-column prop="gcid" label="安全码"></el-table-column>
          <el-table-column prop="brandName" label="公寓名称"></el-table-column>
          <el-table-column prop="contractName" label="联系人"></el-table-column>
          <el-table-column prop="contractPhone" label="联系电话"></el-table-column>
          <el-table-column prop="contractPhone" label="对接内容">
            <template slot-scope="scope">
              <a @click="dockingContent(scope.row)" class="getColor">我是对接内容({{scope.row.applyContentCount}})</a>
            </template>
          </el-table-column>
          <el-table-column prop="applyTime" label="申请时间"></el-table-column>
          <el-table-column style="height: 600px;" prop="handle" label="操作" width="100">x
            <template slot-scope="scope" style="margin-left: -1px">
              <el-button type="text" size="small" @click="queryYuanGongList(scope.row.gcid, scope.row.id)">查看</el-button>
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
    <public-number-count :tit="tit" :message-obj="messageObj" ref="public_number"/>
    <public-number-view ref="ExtendApplyView"/>
  </el-main>
</template>

<script>
  import PublicNumberCount from './PublicNumberCount';
  import PublicNumberView from './PublicNumberView';

  export default {
    name: 'ExtendApply',
    data() {
      return {
        tit: '驳回',
        isShowBtn: false,
        messageObj: {
          title: '确定要驳回该房行平安好房的申请吗？',
          value: '请输入原因(必填)'
        },
        search: {
          sortFields: '',
          totalRecord: '',
          pageNo: 1, //
          pageSize: 10
        },
        param: {
          gcid: '',
          sortFields: '',
          totalRecord: '',
          pageNo: 1, //
          pageSize: 10
        },
        loading: false,
        table: {
          tbody: [
            // {
            //   id: 1345,
            //   gcid: 1234,
            //   status58: 1
            // },
            // {
            //   id: 1,
            //   status58: 2
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
          totalRecord: 100
        }
      };
    },
    methods: {
      //弹框
      queryYuanGongList(gcid, id) {
        // console.info('user', user);
        // if (!user.id || !user.gcid) {
        //   this.$message.warning('未找到该公司')
        //   return;
        // }
        this.$refs.ExtendApplyView.showFn(gcid, id, 0);
      },
      // 对接内容
      dockingContent(row){
        // alert(row.id);
        let outid = row.id;
        this.param.gcid = row.gcid
        this.axios({
          method: 'post',
          url: this.$store.state.api.resources_adjust.get_wechat_list, // 公众号内容列表
          data: this.param
        }).then(res => {
          const {data} = res
          if(data.status.code === '200') {
            console.log(data,'公众号内容')
            this.list = data.result.list
            console.log('我是要穿走的id', outid)
            this.$refs.public_number.showFn(this.list, outid)
            //this.$router.go(0);
          }
        });
        // this.list = [
        //   {
        //     "contractPhone": "11011011011",
        //     "brandName": "黑猫警所",
        //     "gcid": "03516669",
        //     "applyContent": "公众号对接",
        //     "contractName": "黑猫警长",
        //     "id": "5d754bdaa04245249356fc449ee987fb",
        //     "applyContentCount": "1",
        //     "applyTime": "2018-01-26"
        //   },
        //   {
        //     "contractPhone": "17600261062",
        //     "brandName": "葫芦山",
        //     "gcid": "03515470",
        //     "applyContent": "公众号对接",
        //     "contractName": "金刚葫芦娃",
        //     "id": "e77ccbb5482b420b84c6383988d2ad53",
        //     "applyContentCount": "2",
        //     "applyTime": "2018-01-26"
        //   }
        // ]

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
      // 获取详情
      handle58Status(row, command) {
        if (command === '未申请') {
          this.change58Status(row, 10);
        }
        if (command === '已开通') {
          this.change58Status(row, 20);
        }
        if (command === '处理中') {
          this.change58Status(row, 30);
        }
        if (command === '待处理') {
          this.change58Status(row, 40);
        }
        if (command === '驳回') {
          this.housePassFn(row.id, 'pass');
        }
      },
      /**
       * 修改58状态
       * @param row 当前行
       * @param status 目标状态
       */
      // change58Status(row, status) {
      //   if (!row || !row.id || !status) {
      //     alert('数据不完整');
      //   }
      //   this.axios({
      //     method: 'post',
      //     url: '', // 推广列表
      //     data: {
      //       status: status,
      //       id: row.id
      //     }
      //   }).then(res => {
      //     this.queryDataFn();
      //   });
      // },
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
          alert('请先选择一行数据'); // 提示请按需求文档
        } else {
          this.tit = '驳回';
          this.messageObj = {
            title: '确定要驳回该房行平安好房的推广申请吗？',
            value: '请输入原因(必填)'
          };
          this.$refs.ExtendApplyPass.showFn(id, type);
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
        // 获取公众号对接列表
        let _this = this;
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.resources_adjust.publicnum_docking,
          data: _this.search
        }).then(res => {
          // console.log('房行列表', res);
          const {data} = res;
          if (data.status.code === '200') {
            this.table.tbody = data.result.list;
            console.log('我要找id',data.result.list)
            for(let i = 0; i< this.table.tbody.length;i++){
              console.log(i)
              this.outid = this.table.tbody[i].id
              console.log('我是id',this.outid)
            }
            this.table.pageNo = data.result.pageNo; // 当前第几页
            this.table.totalRecord = data.result.totalRecord; // 总共的条数
            this.table.pageSize = data.result.pageSize; // 每页多少条
          }
        });
      }
    },
    created() {
      this.queryDataFn(); // 初始化页面数据
    },
    components: {
      PublicNumberView,
      PublicNumberCount
    },
  };
</script>

<style scoped lang="scss">
  .getColor {
    color: #ed0536;
    text-decoration: underline;
  }
  .iconfont {
    font-family: "iconfont";
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    padding-left: 20px
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

  .footer {
    background: #f9f9f9 !important;
  }

  /deep/ .el-table__body-wrapper {
    height: calc(100vh - 300px);
  }

  .el-main {
    padding: 20px 20px 0 20px;
  }


</style>
