<template>
<el-main class="mainPad" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.3)">
    <el-header class="tag-header">
    <div class="tagleft">
      <el-tag v-for="(i, tag_index) in tag"
              :key="tag_index"
              color="transparent"
              size="mini"
              class="tag">
          <span @click="tagClick(tag_index)">
              {{i.name + '(' + i.number + ')'}}
          </span>
      </el-tag>
    </div>
    <div class="tagright">
      <el-tag v-for="(i, tag_index) in tag2"
            :key="tag_index"
            color="transparent"
            size="mini"
            class="tag">
        <span @click="tagClick(tag_index)">
            {{i.name + '(' + i.number + ')'}}
        </span>
      </el-tag>
    </div>
      
    </el-header>
    <el-row class="noMarginLeft noMarginRight search" :gutter="20">
      <el-col :span="4" class="noPaddingLeft">
        <el-select v-model="value" placeholder="公寓" style="width:100%;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col  :span="4" class="noPaddingLeft">
        <el-select v-model="value" placeholder="城市/区域/商圈" style="width:100%;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="15" class="noPaddingRight noPaddingLeft" style="width:62.1%;">
        <el-input placeholder="楼盘名称、小区名" style="width:100%;"></el-input>
      </el-col>
      <el-col :span="1" class="noPadding">
        <el-button class="btnC" type="danger" style="width:auto;padding: 12px;">搜索</el-button>
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
            prop="GongyuName"
            label="公寓名称">
          </el-table-column>
          <el-table-column 
            prop="Properties"
            label="楼盘/房型">
          </el-table-column>
          <el-table-column 
            prop="RoomNumber"
            label="房号">
          </el-table-column>
          <el-table-column 
            prop="Citys"
            label="城市/区域/商圈">
          </el-table-column>
          <el-table-column 
            prop="AuditStatus"
            label="审核状态">
          </el-table-column>
          <el-table-column 
            prop="UpperAndLowerFrame"
            label="上下架状态">
          </el-table-column>
          <el-table-column
            fixed="right"
            prop="handle"
            label="操作"
            min-width="100">
             <template slot-scope="scope">
              <el-select class="czBtn" v-model="value" placeholder="操作">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :size="10">
                </el-option>
              </el-select>
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
           <el-button type="small" style="background:#31b1f9; color:#fff; margin-left:10px;">批量通过</el-button>
           <el-button type="small" style="background:#ed0536; color:#fff; margin-left:10px;">批量拒绝</el-button>
           <el-button type="small" style="background:#31b1f9; color:#fff; margin-left:10px;">批量上架</el-button>
           <el-button type="small" style="background:#ed0536; color:#fff; margin-left:10px;">批量下架</el-button>
         </div>
      </el-col>
       <el-pagination class="liColor"
        :background=true
        :page-sizes="[10, 20, 50, 100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="0">
      </el-pagination>
    </el-footer>
  </el-main>
</template>

<script>
export default {
  name: "portCHouse",
  data() {
    return {
      tag:[
          {
            name: "整租",
            number: "0"
          },
          {
            name: "合租",
            number: "0"
          },
          {
            name: "集中",
            number: "0"
          }
        ],
        tag2:[
          {
            name: "全部",
            number: "0"
          },
          {
            name: "待审核",
            number: "0"
          },
          {
            name: "已通过",
            number: "0"
          },
          {
            name: "未通过",
            number: "0"
          },
          {
            name: "已上架",
            number: "0"
          },
          {
            name: "已下架",
            number: "0"
          }
        ],
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
            prop: "GongyuName",
            label: "公寓名称"
          },
          {
            prop: "Properties",
            label: "楼盘/房型"
          },
          {
            prop: "RoomNumber",
            label: "房号"
          },
          {
            prop: "Citys",
            label: "城市/区域/商圈"
          },
          {
            prop: "AuditStatus",
            label: "审核状态"
          },
          {
            prop: "UpperAndLowerFrame",
            label: "上下架状态"
          }
        ],
        tbody: [
            // {
            //   GongyuName: "王云峰",
            //   Properties:"2017-01-01",
            //   RoomNumber:"2017-12-20",
            //   Citys:"管理员",
            //   AuditStatus:"待审核",
            //   UpperAndLowerFrame:"已下架"
            // },
            // {
            //   GongyuName: "王云峰",
            //   Properties:"2017-01-01",
            //   RoomNumber:"2017-12-20",
            //   Citys:"管理员",
            //   AuditStatus:"已通过",
            //   UpperAndLowerFrame:"已上架"
            // },
            // {
            //   GongyuName: "王云峰",
            //   Properties:"2017-01-01",
            //   RoomNumber:"2017-12-20",
            //   Citys:"管理员",
            //   AuditStatus:"未通过",
            //   UpperAndLowerFrame:"已下架"
            // },
            // {
            //   GongyuName: "王云峰",
            //   Properties:"2017-01-01",
            //   RoomNumber:"2017-12-20",
            //   Citys:"管理员",
            //   AuditStatus:"待审核",
            //   UpperAndLowerFrame:"已下架"
            // }
        ],
        tfoot: [],
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      },
        options: [],
        value: ''
    }
  },
  methods: {
    handleCurrentChange: function() {
      alert(123);
    },
    tagClick (index) {
      console.log(this.pageSize);
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
.tag-header{
  padding-left: 0px;
  height: 40px !important;
}
.tagleft{
  width: 260px;
  float: left;
}
.tagleft .tag{
  border: none;
  margin-right: 29px;
  span{
    font-size: 14px;
    color: #9f9f9f;
    display: block;
    float: left;
  }
}
.tagright{
  float: left;
}
.tagright .tag{
  border: none;
  margin-left: 26px;
  span{
    font-size: 12px;
    color: #9f9f9f;
    display: block;
    float: left;
  }
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
.czBtn /deep/ .el-input--suffix .el-input__inner{
  width: 90px;
  border: none;
  background: none;
  margin-left: 10px;
  color: red;
}
.czBtn /deep/ .el-input--suffix .el-input__inner::-webkit-input-placeholder{
  color:red !important;
}
.czBtn /deep/ .el-input--suffix span i{
  color: red;
}
.liColor /deep/ .el-pager .number:hover{
  color: red !important;
}
.liColor /deep/ .el-pager li.active:hover{
  color: #fff !important;
}
</style>