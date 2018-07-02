<template>
  <div class="popRole" ref="parents">
    <!-- 背景层 -->
      <div class="mark" v-if="isDelete"></div>
      <div class="container" v-if="isDelete">
        <div class="tit">查看员工列表</div>
        <div class="close" @click="closeFn"></div>
        <div class="content">
          <el-table :data="table.tbody"
                    stripe
                    border
                    max-height="540"
                    style="text-align: center; width: 100%;" >
            <el-table-column
              prop='employeeNum'
              label="员工编号"
              width="90"
              height="40">
            </el-table-column>
            <el-table-column
              prop="status"
              label="员工状态"
              width="90">
            </el-table-column>
            <el-table-column
              prop="accountName"
              label="用户名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="nickName"
              label="姓名"
              width="90">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机"
              width="120">
            </el-table-column>
            <el-table-column
              prop="department"
              label='所属部门'
              width="80">
            </el-table-column>
            <el-table-column
              prop="role"
              label="角色"
              width="80">
            </el-table-column>
            <el-table-column
              prop="inductionTime"
              label="入职日期"
              width="110">
            </el-table-column>
            <el-table-column
              prop="ct"
              label="创建日期"
              width="110">
            </el-table-column>
            <el-table-column
              prop="Done"
              label="操作"
              width="189">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="queryMessageLogFn(scope.row)" >日志</el-button>
                <el-button type="text" size="small" @click="queryDetailMessageFn(scope.row.id)">编辑</el-button>
                <el-button type="text" size="small" @click="deleteYuanGongByIdFn(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row class="noMargin search">
          </el-row>
          <el-footer class="footer block" height="50px">
            <el-col :span="10" style="float:left;">
              <div class="grid-content bg-purple">
                <el-checkbox/>
              </div>
            </el-col>
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
          </el-footer>
        </div>
      </div>
    <HouseDelete :tit="tit" :messageObj="messageObj" ref="housedelete"/>
    <YuangongBianji ref="YuangongBianji"/>
    <HouseLog ref="houseLog" />
  </div>
</template>
<script>
  import HouseLog from "@/components/houseAdmin/HouseLog.vue";
  import HouseDelete from "@/components/houseAdmin/HouseDelete.vue";
  import YuangongBianji from "@/components/houseAdmin/YuangongBianji.vue";
  export default {
    name: "HouseLook",
    data () {
      return {
        isDelete: false,
        search: {
          pageNo: 1,
          pageSize: 10,
          gcid: ''
        },
        table: {
          tbody: [
            // {
            //   id: '123',
            //   ct: "20170102847",
            //   department: "荣尚荟",
            //   accountName:'金地',
            //   role: '豪华大',
            //   employeeNum: '201',
            //   phone: '123'
            // },
            // {
            //   id: '123',
            //   ct: "20170102847",
            //   department: "荣尚",
            //   accountName:'金地公寓',
            //   role: '豪华大床',
            //   employeeNum: '201',
            //   phone: '123'
            // },
            // {
            //   id: '123',
            //   ct: "20170102847",
            //   department: "荣尚荟",
            //   accountName:'金地',
            //   role: '豪华大',
            //   employeeNum: '201',
            //   phone: '123'
            // },
            // {
            //   id: '123',
            //   ct: "20170102847",
            //   department: "荣尚",
            //   accountName:'金地公寓',
            //   role: '豪华大床',
            //   employeeNum: '201',
            //   phone: '123'
            // },
            // {
            //   id: '123',
            //   ct: "20170102847",
            //   department: "荣尚荟",
            //   accountName:'金地',
            //   role: '豪华大',
            //   employeeNum: '201',
            //   phone: '123'
            // },
            // {
            //   id: '123',
            //   ct: "20170102847",
            //   department: "荣尚",
            //   accountName:'金地公寓',
            //   role: '豪华大床',
            //   employeeNum: '201',
            //   phone: '123'
            // },
            // {
            //   id: '123',
            //   ct: "20170102847",
            //   department: "荣尚荟",
            //   accountName:'金地',
            //   role: '豪华大',
            //   employeeNum: '201',
            //   phone: '123'
            // },
            // {
            //   id: '123',
            //   ct: "20170102847",
            //   department: "荣尚",
            //   accountName:'金地公寓',
            //   role: '豪华大床',
            //   employeeNum: '201',
            //   phone: '123'
            // },
            // {
            //   id: '123',
            //   ct: "20170102847",
            //   department: "荣尚荟",
            //   accountName:'金地',
            //   role: '豪华大',
            //   employeeNum: '201',
            //   phone: '123'
            // },
            // {
            //   id: '123',
            //   ct: "20170102847",
            //   department: "荣尚",
            //   accountName:'金地公寓',
            //   role: '豪华大床',
            //   employeeNum: '201',
            //   phone: '123'
            // }
          ],
          tfoot: [],
          totalRecord: 100
        },
        tit: '删除',
        messageObj: {
          title: '确定要删除这条消息吗？',
          value: '请输入原因(选填)'
        },
      };
    },
    components: {
      HouseDelete, YuangongBianji,HouseLog
    },
    methods: {
      queryDataFn() {
        let _this = this
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.resources_adjust.get_houseLine_company_all,
          data: {
            pageNo:_this.search.pageNo,
            pageSize:_this.search.pageSize,
            gcid: _this.search.gcid
          }
      }).then(res => {
         // console.log('查看列表',res)
          const { data } = res;
          if (data.status.code === '200') {
            _this.table.tbody = data.result.list; // ????
           // console.log(111,data.result.list)
            _this.table.pageNo = data.result.pageNo; // 当前第几页
            //console.log(222,data.result.pageNo)
            _this.table.totalRecord = data.result.totalRecord; // 总共的条数
           // console.log(333,data.result.totalRecord)
            _this.table.pageSize = data.result.pageSize; //每页多少条
          }
        });
      },
      queryMessageLogFn (userId) {
        //console.info('用户id: ', userId);
        let _this = this
        _this.queryHouseLogFn(userId, (list) => {
          _this.$refs.houseLog.showFn(list);
        });
      },
      queryHouseLogFn(userId, fn) {
        let _this = this;
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.resources_adjust.get_houseLine_log,
          data: {
            recordedDataId: userId.id
          }
        }).then(res => {
          //console.info(res,'house');
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
//        let userId = '';
//        this.queryLogFn(userId, () => {
//          this.$refs.houseLog.showFn();
//        });
      },
      queryDetailMessageFn(id){
        if (!id) {
          this.$message.warning('请选择一行数据');
          return;
        }
        // this.messageDetail = {
        //   id: 1
        // };
        // this.$refs.YuangongBianji.showFn('update',this.messageDetail);
        // return;
        this.axios({
          method: 'post',
          url: this.$store.state.api.resources_adjust.get_jjuser,
          data: {
            id: id
          }
        }).then(res => {
          console.info(res, '我是要回显的员工编辑数据');
          const {data} = res;
          if (data.status.code === '200') {
            console.log('我是data',data.result)
            this.messageDetail = data.result;
            console.log(this.messageDetail, '我要回显');
            //this.$refs.HouseEditor.showFn(this.messageDetail);
            this.$refs.YuangongBianji.showFn('update',this.messageDetail);
          }
        });
      },
      deleteYuanGongByIdFn (id){
        if (!id) {
          this.$message.warning('请先选择一行数据');
        } else {
          this.tit = '删除';
          this.messageObj = {
            title: '确定要删除这条消息吗？',
            value: '请输入原因(选填)'
          };
          this.$refs.housedelete.showFn(id, 'yuangong-delete');
        }
      },
      showFn (user) {
        this.search.gcid = user.gcid;
        if (!this.search.gcid) {
          this.$message.warning('查询条件错误');

          return;
        }
        this.queryDataFn();
        this.isDelete = true;
      },
      closeFn() {
        this.isDelete = false;
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
      }
    },
    mounted () {
    }
  }
</script>
<style scoped lang="scss">
  .deleteAnimation-enter-active {
    animation: deleteAnimation-in 0.55s linear;
    animation-fill-mode: forwards;
  }
  .deleteAnimations-enter-active {
    animation: deleteAnimations-in 0.55s linear;
    animation-fill-mode: forwards;
  }

  @keyframes deleteAnimations-in {
    0% {
      transform: scale(0.1);
      opacity: 1;
    }
    80% {
      transform: scale(0.82);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  @keyframes deleteAnimation-in {
    0% {
      transform: scale(0.1);
      opacity: 1;
    }
    80% {
      transform: scale(0.82);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
  }

  .popRole{
    .mark{
      z-index: 999;
      width: 100%;
      height: 100%;
      background: #000;
      opacity: .5;
      position: fixed;
      top: 0;
      left: 0;
    }
    .container{
      position: fixed;
      left: 50%;
      top: 50%;
      margin-left: -550px;
      margin-top: -335px;
      width: 1100px;
      height: 670px;
      background:#fff;
      z-index: 1000;
      /* 标题 */
      .tit{
        height: 50px;
        text-indent: 2em;
        font-size: 16px;
        color: #ed0536;
        line-height: 50px;
        border-bottom: 1px solid #f2f6f7;
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
        display: flex;
        flex-wrap: wrap;
        width: 1060px;
        margin:20px;
          }
        }
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
  /deep/ .el-button{
    color: #ed0536;
  }
  .btnC{
    color: #fff;
  }
  .footer{
    margin-top: 20px;
    line-height: 50px;
    overflow: hidden;
    background: #f9f9f9 !important;
    position: fixed;
    z-index: 1005;
    width: 70%;
    bottom: 80px;
  }
  .footer .el-pagination{
    margin-top: 10px;
  }


</style>
