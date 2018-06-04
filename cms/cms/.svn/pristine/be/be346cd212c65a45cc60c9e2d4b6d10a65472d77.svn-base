<template>
<el-main class="mainPad" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.3)">
    <el-row class="noMarginLeft noMarginRight search" :gutter="20">
      <el-col :span="3" class="noPaddingLeft">
        <el-select v-model="screening.areaValue" placeholder="公寓" style="width:100%;">
          <el-option
           <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3" class="noPaddingLeft">
        <el-select v-model="screening.areaValue" placeholder="城市" style="width:100%;">
          <el-option
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </el-col>
      <el-col :span="3" class="noPaddingLeft">
        <el-select v-model="screening.areaValue" placeholder="来源" style="width:100%;">
          <el-option
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </el-col>
      <el-col :span="8" class="noPaddingLeft" style="overflow:hidden; width: 33%;">
        <el-date-picker
          v-model="value"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width:100%;">
        </el-date-picker>
      </el-col>
      <el-col :span="3" class="noPadding" style="width: 15%;">
        <el-input placeholder="姓名、电话" style="width: 100%;"></el-input>
      </el-col>
      <el-col :span="1" class="noPaddingLeft">
        <el-button class="btnC" type="danger" style="width:auto; padding: 12px;">搜索</el-button>
      </el-col>
      <el-col :span="1" class="noPaddingRight">
        <el-button class="btnC" type="danger" style="width: auto; padding: 12px; background:#2b3142; border-color:#2b3142;">导出</el-button>
      </el-col>
      <el-col :span="1" class="noPaddingRight">
        <el-button class="btnC" type="danger" style="width: auto; padding: 12px; background:#25b0fd; border-color:#25b0fd; margin-left:10px;">日志</el-button>
      </el-col>
    </el-row>
    <el-row class="noMargin search noPaddingBottom">
      <el-col :span="24">
        <el-table :data="table.tbody" stripe border>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column 
            prop="UserRole"
            label="用户角色">
          </el-table-column>
          <el-table-column 
            prop="CreationTime"
            label="创建时间">
          </el-table-column>
          <el-table-column 
            prop="ModificationTime"
            label="修改时间">
          </el-table-column>
          <el-table-column 
            prop="Describe"
            label="描述">
          </el-table-column>
          <el-table-column
            fixed="right"
            prop="handle"
            label="操作"
            min-width="100">
             <template slot-scope="scope">
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row class="noMargin search">
      
    </el-row>
    <el-footer class="footer block" height="50px">
      <el-col :span="10" style="float:left;">
        <div class="grid-content bg-purple">
           <el-checkbox></el-checkbox>
           <el-button type="small" style="background:#f0002e; color:#fff; margin-left:10px;">批量删除</el-button>
         </div>
      </el-col>
      <el-pagination
        :background=true
        :page-sizes="[10, 20, 50, 100, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size=10
        :total="0">
      </el-pagination>
    </el-footer>
  </el-main>
</template>

<script>
export default {
  name: "portCUser",
  data() {
    return {
      options: [],
        value: '',
      loading: false,
      //筛选的过滤信息
      screening: {
        areaValue: "", //城市/区域
        area: [] //城市/区域
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
              //   UserRole: "王云峰",
              //   CreationTime:"2017-01-01",
              //   ModificationTime:"2017-12-20",
              //   Describe:"管理员"
              // },
              // {
              //   UserRole: "王云峰1",
              //   CreationTime:"2017-01-01",
              //   ModificationTime:"2017-12-20",
              //   Describe:"管理员1"
              // },
              // {
              //   UserRole: "王云峰2",
              //   CreationTime:"2017-01-01",
              //   ModificationTime:"2017-12-20",
              //   Describe:"管理员2"
              // },
              // {
              //   UserRole: "王云峰3",
              //   CreationTime:"2017-01-01",
              //   ModificationTime:"2017-12-20",
              //   Describe:"管理员3"
              // }
        ],
        tfoot: [],
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      }
       
    }
  },
  methods: {
    handleCurrentChange: function() {
      alert(123);
    }
  }/*,
  created: function() {
    var self = this;
    self.axios
      .post(this.$store.state.api.resources_adjust.get_houseLine_list, {
        pageNo: self.table.currentPage,
        pageSize: self.table.pageSize
      })
      .then(function(response) {
        console.log(response.data.result.houseLineList);
        self.loading = false;
        const { data } = response;
        if (data.status.code == 200) {
          self.table.totalRecord = data.result.totalRecord;
          data.result.houseLineList.forEach(item => {
            if (item.confirmType == 1) {
              item.confirmTypeName = "已通过";
            }
            item.raCompanyCityRaCompanyArea =
              item.raCompanyCity + " / " + item.raCompanyArea;
            item.statusName = item.status == 0 ? "禁用" : "正常";
            self.table.tbody.push(item);
          });
        }
      })
      .catch(function(error) {
        self.loading = false;
        alert(error);
      });
  }*/
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
</style>