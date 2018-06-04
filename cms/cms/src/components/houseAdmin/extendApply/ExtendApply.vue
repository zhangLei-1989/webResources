<template>
  <el-main v-loading="loading">
    <el-row>
      <el-col :span="24">
        <a href="#" @click="changeBusinessType(1)">
          <el-tag type="cms">企业认证</el-tag>
        </a>
        <a href="#" @click="changeBusinessType(2)">
          <el-tag type="cms active">推广申请</el-tag>
        </a>
        <a href="#" @click="changeBusinessType(3)">
          <el-tag type="cms">电子签约申请</el-tag>
        </a>
        <a href="#" @click="changeBusinessType(4)">
          <el-tag type="cms">公众号对接</el-tag>
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
          <el-table-column prop="approveTime" label="首次申请时间"></el-table-column>
          <el-table-column prop="wuba" label="58公寓">
            <template slot-scope="scope">
              <el-dropdown>
                <span class="el-dropdown-link">{{scope.row.wuba | getStatus58Name}}
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <div @click="handle58Status(scope.row.gcid, scope.row.id, '0', '未申请')">
                    <el-dropdown-item command="未申请">未申请</el-dropdown-item>
                  </div>
                  <div @click="handle58Status(scope.row.gcid,scope.row.id, '0', '已开通')">
                    <el-dropdown-item command="已开通">已开通</el-dropdown-item>
                  </div>
                  <div @click="handle58Status(scope.row.gcid, scope.row.id,'0', '处理中')">
                    <el-dropdown-item command="处理中">处理中</el-dropdown-item>
                  </div>
                  <div @click="handle58Status(scope.row.gcid, scope.row.id,'0', '待处理')">
                    <el-dropdown-item command="待处理">待处理</el-dropdown-item>
                  </div>
                  <div @click="handle58Status(scope.row.gcid, scope.row.id,'0', '驳回')">
                    <el-dropdown-item command="驳回">驳回</el-dropdown-item>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column prop="raCt" label="春眠">
            <template slot-scope="scope">
              <el-dropdown>
                <span class="el-dropdown-link">{{scope.row.chunmian | getStatus58Name}}
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <div @click="handle58Status(scope.row.gcid,scope.row.id, '1', '未申请')">
                    <el-dropdown-item command="未申请">未申请</el-dropdown-item>
                  </div>
                  <div @click="handle58Status(scope.row.gcid,scope.row.id, '1', '已开通')">
                    <el-dropdown-item command="已开通">已开通</el-dropdown-item>
                  </div>
                  <div @click="handle58Status(scope.row.gcid,scope.row.id, '1', '处理中')">
                    <el-dropdown-item command="处理中">处理中</el-dropdown-item>
                  </div>
                  <div @click="handle58Status(scope.row.gcid,scope.row.id, '1', '待处理')">
                    <el-dropdown-item command="待处理">待处理</el-dropdown-item>
                  </div>
                  <div @click="handle58Status(scope.row.gcid,scope.row.id, '1', '驳回')">
                    <el-dropdown-item command="驳回">驳回</el-dropdown-item>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column prop="raCt" label="爱租哪">
            <template slot-scope="scope">
              <el-dropdown>
                <span class="el-dropdown-link">{{scope.row.aizuna | getStatus58Name}}
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <div @click="handle58Status(scope.row.gcid,scope.row.id, '2', '未申请')">
                    <el-dropdown-item command="未申请">未申请</el-dropdown-item>
                  </div>
                  <div @click="handle58Status(scope.row.gcid,scope.row.id, '2', '已开通')">
                    <el-dropdown-item command="已开通">已开通</el-dropdown-item>
                  </div>
                  <div @click="handle58Status(scope.row.gcid,scope.row.id, '2', '处理中')">
                    <el-dropdown-item command="处理中">处理中</el-dropdown-item>
                  </div>
                  <div @click="handle58Status(scope.row.gcid,scope.row.id, '2', '待处理')">
                    <el-dropdown-item command="待处理">待处理</el-dropdown-item>
                  </div>
                  <div @click="handle58Status(scope.row.gcid,scope.row.id, '2', '驳回')">
                    <el-dropdown-item command="驳回">驳回</el-dropdown-item>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column prop="raCt" label="平安好房">
            <template slot-scope="scope">
              <el-dropdown>
                <span class="el-dropdown-link">{{scope.row.pingan | getStatus58Name}}
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <div @click="handle58Status(scope.row.gcid,scope.row.id, '3', '未申请')">
                    <el-dropdown-item command="未申请">未申请</el-dropdown-item>
                  </div>
                  <div @click="handle58Status(scope.row.gcid,scope.row.id, '3', '已开通')">
                    <el-dropdown-item command="已开通">已开通</el-dropdown-item>
                  </div>
                  <div @click="handle58Status(scope.row.gcid,scope.row.id, '3', '处理中')">
                    <el-dropdown-item command="处理中">处理中</el-dropdown-item>
                  </div>
                  <div @click="handle58Status(scope.row.gcid,scope.row.id, '3', '待处理')">
                    <el-dropdown-item command="待处理">待处理</el-dropdown-item>
                  </div>
                  <div @click="handle58Status(scope.row.gcid, scope.row.id,'3', '驳回')">
                    <el-dropdown-item command="驳回">驳回</el-dropdown-item>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column prop="raCt" label="会找房">
            <template slot-scope="scope">
              <el-dropdown>
                <span class="el-dropdown-link">{{scope.row.huizhaofang | getStatus58Name}}
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <div @click="handle58Status(scope.row.gcid,scope.row.id,'4', '未申请')">
                    <el-dropdown-item command="未申请">未申请</el-dropdown-item>
                  </div>
                  <div @click="handle58Status(scope.row.gcid,scope.row.id, '4', '已开通')">
                    <el-dropdown-item command="已开通">已开通</el-dropdown-item>
                  </div>
                  <div @click="handle58Status(scope.row.gcid,scope.row.id, '4', '处理中')">
                    <el-dropdown-item command="处理中">处理中</el-dropdown-item>
                  </div>
                  <div @click="handle58Status(scope.row.gcid,scope.row.id,'4', '待处理')">
                    <el-dropdown-item command="待处理">待处理</el-dropdown-item>
                  </div>
                  <div @click="handle58Status(scope.row.gcid, scope.row.id,'4', '驳回')">
                    <el-dropdown-item command="驳回">驳回</el-dropdown-item>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column style="height: 600px;" prop="handle" label="操作" width="100">
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
    <extend-apply-pass :tit="tit" :message-obj="messageObj" ref="ExtendApplyPass"/>
    <extend-apply-view ref="ExtendApplyView"/>
  </el-main>
</template>

<script>
  import ExtendApplyPass from './ExtendApplyPass';
  import ExtendApplyView from './ExtendApplyView';

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
          platformType: '', // 0:58公寓1:春眠2:365爱租哪3:平安好房4:会找房
          approveStatus: '', // 0:未申请1:已开通2:处理中3:待处理4:驳回
          desc: '',
          gcid: '',
          logid: '',
        },
        loading: false,
        table: {
          tbody: [
            {
              id: 1,
              status58: 1
            },
            {
              id: 1,
              status58: 2
            }
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
      //查看详情
      queryYuanGongList(user,id) {
         console.info('user', user);
        this.$refs.ExtendApplyView.showFn(user,id,0);
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
      handle58Status(gcid, id,row, command) {
        if (command === '未申请') {
          this.change58Status(gcid,id,row, '0');
        }
        if (command === '已开通') {
          this.change58Status(gcid,id,row, '1');
        }
        if (command === '处理中') {
          this.change58Status(gcid,id,row, '2');
        }
        if (command === '待处理') {
          this.change58Status(gcid,id,row, '3');
        }
        if (command === '驳回') {
          this.housePassFn(gcid,id,row,'4');
        }
      },
      /**
       * 修改58状态
       * @param row 当前行
       * @param status 目标状态
       */
      change58Status(gcid,id, row, status) {
        console.log(row,1111) // 0
        if (!row || !status || !gcid) {
          this.$message.warning('数据不完整');
        }
        this.param.platformType = row
        this.param.approveStatus = status
        this.param.gcid = gcid
        this.param.logid = id
        this.axios({
          method: 'post',
          url: this.$store.state.api.resources_adjust.update_approve_type, // 推广状态列表
          data: this.param
        }).then(res => {
          const {data} = res
          if(data.status.code === '200'){
            this.queryDataFn();
            this.$router.go(0);
          }
        });
      },
      houseCancelPassFn(id, type) {
        if (!id) {
        } else {
          this.tit = '取消审核通过';
          this.messageObj = {
            title: '确定要取消该房行的企业认证审核吗？',
            value: '请输入原因(必填)'
          };
          this.$refs.FH_HouseDelete.showFn(id, type);
        }
      },
      housePassFn(gcid,id,row,type) {
        if (!id) {
          this.$message.warning('请先选择一行数据');
        } else {
          this.tit = '驳回';
          this.messageObj = {
            title: '确定要驳回该房行平安好房的推广申请吗？',
            value: '请输入原因(必填)'
          };
          this.$refs.ExtendApplyPass.showFn(gcid,id,row,type);
        }
      },
      houseRefuseFn(id, type) {
        if (!id) {
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
        // 获取用户管理列表
        let _this = this;
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.resources_adjust.get_approve_list,
          data: _this.search
        }).then(res => {
           console.log('房行列表', res);
          const {data} = res;
          if (data.status.code === '200') {
            this.table.tbody = data.result.list;
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
      ExtendApplyView,
      ExtendApplyPass
    },
    filters: {
      getStatus58Name: function (approveStatus) {
        let name = '';
        switch (approveStatus) {
          case '0' : {
            name = '未申请';
            break;
          }
          case '1' : {
            name = '已开通';
            break;
          }
          case '2' : {
            name = '处理中';
            break;
          }
          case '3': {
            name = '待处理';
            break;
          }
          case '4' : {
            name = '驳回';
            break;
          }

        }
        return name;
      }
    }
  };
</script>

<style scoped lang="scss">
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
