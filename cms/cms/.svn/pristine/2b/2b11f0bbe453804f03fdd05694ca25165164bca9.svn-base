<template>
  <el-main class="mainPad" v-loading="loading">
    <el-row class="noMarginLeft noMarginRight search" :gutter="20">
      <el-col :span="4" class="noPaddingLeft">
        <el-select v-model="search.ctId" clearable placeholder="发布人" style="width: 100%;">
          <el-option
            v-for="item in publisherList"
            :key="item.id"
            :label="item.nickName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="noPaddingLeft">
        <el-date-picker
          v-model="search.ct"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="发布时间"
          style="width: 100%;">
        </el-date-picker>
      </el-col>
      <el-col :span="13" class="noPadding">
        <el-input v-model="search.title" placeholder="消息标题" style="width: 100%;" />
      </el-col>
      <el-col :span="3" class="noPaddingLeft noPaddingRight" style="display: flex">
        <el-button @click="queryDataFn" class="btnC" type="danger" style="flex: 1; padding: 12px 0; ">搜索</el-button>
        <!--<el-dialog title="操作日志" :visible.sync="dialogTableVisible">-->
        <!--</el-dialog>-->
        <el-button class="btnC" type="danger"
                   style="flex: 1; padding: 12px 0; background:#25b0fd; border-color:#25b0fd;"
                   @click="queryMessageLogFn">日志</el-button>
      </el-col>
    </el-row>
    <el-row class="noMargin search noPaddingBottom">
      <el-col :span="24" style="overflow-y: auto;">
        <el-table :data="table.tbody" @selection-change="handleSelectionChange" ref="multipleTable" stripe border>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop='identifier'
            label="编号">
          </el-table-column>
          <el-table-column
            prop="title"
            label="消息标题">
          </el-table-column>
          <el-table-column
            prop="ct"
            label="发布时间">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="发布人">
          </el-table-column>
          <el-table-column
            prop="receiveObject"
            label="接收对象">
            <template slot-scope="scope">
              <span v-if="scope.row.receiveObject === '1'">B端用户</span>
              <span v-if="scope.row.receiveObject === '2'">C端用户</span>
            </template>
          </el-table-column>
          <el-table-column
            class="handler"
            prop="Done"
            label="操作"
            min-width="100">
            <template slot-scope="scope" style="margin-left: -1px">
              <el-button type="text" size="small" @click="queryDetailMessageFn(scope.row.id)">详情</el-button>
              <el-button type="text" size="small" @click="deleteMessageByIdFn(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="noMargin search footer">
      <el-col :span="24">
        <div class="grid-content bg-purple" style="float: left">
          <el-checkbox @change="allCheckedFn" />
          <el-button type="small" style="background:#f0002e;
          color:#fff; margin-left:10px;" :disabled="checkDisabled" @click="batchDelete">批量删除</el-button>
        </div>
        <el-pagination
          style="float: right"
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

    <message-log ref="messageLog" :controlLog='controlLogList'/>
    <MessageBatchDelete ref="messageBatchDelete"/>
    <MessageSingleDelete @on-delete="deleteCallBackFn" ref="messageSingleDelete"/>
    <MessageDetail ref="MessageDetail" />
  </el-main>
</template>

<script>
  import MessageLog from "@/components/message/MessageLog.vue"
  import MessageBatchDelete from "@/components/message/MessageBatchDelete.vue"
  import MessageSingleDelete from "@/components/message/MessageSingleDelete.vue"
  import MessageDetail from "@/components/message/MessageDetail.vue"
  export default {
    name: "MessageList",
    data() {
      return {
        title: '',
        ct: '',
        content: '',
        id: '',
        isShow:false,
        controlLogList: [],
        dialogTableVisible: false,
        loading: false,
        value6:'',
        //筛选的过滤信息
        search: {
          ctId: '', //发布人id
          nickName: "", // 发布人
          ct: '', // 发布时间 yyyy-MM-dd
          title: '',// 消息标题
          sortFields: '', // 默认值ct 排序字段
          sortType: '', // 默认值ct 排序字段
          pageNo: 1,
          pageSize: 10
        },
        publisherList: [],
        ids: [],
        checkDisabled: true,
        //表格信息
        table: {
          tbody: [
          ],
          tfoot: [],
          totalRecord: 100
        },
        messageDetailList: [
          // {
          //   title: "",
          //   ct: "",
          //   content: ""
          // },
          // {
          //   title: "活动专区暂时下线公告2",
          //   ct: "2017.2.13 18:34",
          //   content: "尊敬的用户，为了给您带来更好的体验2"
          // },
          // {
          //   title: "活动专区暂时下线公告3",
          //   ct: "2017.3.13 18:34",
          //   content: "尊敬的用户，为了给您带来更好的体验3"
          // },
          // {
          //   title: "活动专区暂时下线公告4",
          //   ct: "2017.4.13 18:34",
          //   content: "尊敬的用户，为了给您带来更好的体验4"
          // }
        ]
      };
    },
    watch: {
      search: {
        handler: function (val, oldVal) {
          setTimeout(()=> {
            this.queryDataFn();
          }, 1000)
        },
        deep: true
      },
    },
    methods: {
      deleteCallBackFn() {
      },
      queryDetailMessageFn(id){
        //alert('查询Id:' + id); // 这有id
        let detailIndex;
        for (let i = 0; i < this.table.tbody.length; i++) {
          if (this.table.tbody[i].id === id) {
            detailIndex = i;
            break;
          }
        }
        this.$refs.MessageDetail.showFn(this.table.tbody, detailIndex);
      },
      queryLogFn (userId, fn) {

        let _this = this
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.message.get_message_log,
          data: _this.search
        }).then(res => {
          const { data } = res;
          //alert(123) 后台接口有问题
          if (data.status.code === '200') {
            this.controlLogList = data.result.list;
            fn && fn(this.controlLogList);
          }
        });
      },
      deleteMessageByIdFn(id){
       // alert('删除Id:' + id);
        //id = 1;
        if (!id) {
          //alert('请先选择一行数据'); // 提示请按需求文档
        } else {
          this.$refs.messageSingleDelete.showFn(id);
        }
      },
      queryDataFn() {
        // console.log('data1', this.search);
        this.axios({
          method:'post',
          url:this.$store.state.api.message.get_message_list,
          data: this.search
        }).then(res => {
         // console.log(res);
          const { data } = res;
         // console.log(data)
          if (data.status.code === '200') {
            this.table.tbody = data.result.list;
            this.search.pageNo = data.result.pageNo; // 当前第几页
            this.search.pageSize = data.result.pageSize; // 每页多少条
            this.table.totalRecord = data.result.totalRecord; // 总共的条数
          }
        });
      },
      queryPublisherListFn() {
        let _this = this;
        _this.axios({
          method:'post',
          url:_this.$store.state.api.message.get_message_publisher,
        }).then(res => {
          // console.log(res,'发布人')
          const { data } = res;
          if (data.status.code === '200') {
            if (!data.result) {
              this.$message.error('查询到的发布人为空')
              return;
            }
            _this.publisherList = data.result.list;
          }

        });
      },
      handleSizeChange(val) {
        //console.info('每页多少条:', val);
        this.search.pageSize = val;
        this.queryDataFn();
      },
      handleCurrentChange(val) {
        //console.info('当前第几页:', val);
        if (this.search.pageNo !== 0) {
          this.search.pageNo = val;
          this.queryDataFn();
        }
      },
      close_popUp () {
        // 关闭弹出框
        //this.$refs.parents.style.display = "none";
      },
      queryMessageLogFn () {
        let userId = '';
        this.queryLogFn(userId, (list) => {
          this.$refs.messageLog.showFn(list);
        });
      },
      batchDelete () {
        if (!this.ids || this.ids.length < 1) {
          this.$message.warning('请先选择一行数据')
        } else {
          this.$refs.messageBatchDelete.showFn(this.ids);
        }
      },
      handleSelectionChange(selectList) {
        this.ids = [];
        selectList.forEach((item) => {
          this.ids.push(item.id);
        });
        this.checkDisabled = this.ids.length < 1;
      },
      allCheckedFn () {
        let _this = this;
        this.table.tbody.forEach(row => {
          //console.info(row);
          _this.$refs.multipleTable.toggleRowSelection(row);
        });
      }
    },
    components: {
      MessageLog,
      MessageBatchDelete,
      MessageSingleDelete,
      MessageDetail,
    },

    created () {
      this.queryDataFn(); // 初始化页面数据
      this.queryPublisherListFn();
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
    text-align: center !important;
    width: auto;
  }
  .handler{
    border-left:0;
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
