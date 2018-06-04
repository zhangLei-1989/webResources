<template>
	<el-main v-loading="loading.all" element-loading-background="rgba(0, 0, 0, 0)">
    <el-row class="noMarginLeft noMarginRight search">
      <el-col :span="24">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display:flex;;">
          <el-form-item label="金额">
            <el-input v-model="formInline.minPrice" placeholder="最低" style="width:100px;"></el-input>
            —
            <el-input v-model="formInline.maxPrice" placeholder="最高" style="width:100px;"></el-input>
          </el-form-item>
          <el-form-item>
           <span style="padding:0px 12px;">用款时间</span>
            <el-date-picker
              type="daterange"
              v-model="formInline.date"
              range-separator="—"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:auto;">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="noMarginRight" style="flex:1;">
            <el-input v-model="formInline.likeName" placeholder="借款人"></el-input>
          </el-form-item>
          <el-form-item class="noMarginRight">
            <el-button type="primary" @click="getBorrowApplyList">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
        <el-table :data="table.tbody" stripe @row-click="tableRowClick">
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
                <span class="finance-state">已驳回</span>
            </template>
          </el-table-column>
          <el-table-column
            label="借款人/金额/用款时间">
            <template slot-scope="scope">
                <p>{{ scope.row.apartmentName }}</p>
                <p>
                  <span style="margin-right:7px;">{{ scope.row.expectPrice + '元' }}</span>
                  <span>{{ scope.row.expectDate }}</span>
                </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="hosueAddress"
            label="房源信息">
          </el-table-column>
          <el-table-column
            label="类别/还款方式/申请时间">
            <template slot-scope="scope">
                <p>
                  <span style="margin-right:7px;">寓租贷</span>
                  <span>每月等额</span>
                </p>
                <p>{{ scope.row.ct }}</p>
            </template>
          </el-table-column>
        </el-table>
    <el-row class="noMargin search">
      <el-col :span="24">
        <el-pagination
          background
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRecord">
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog
      title="查看详情"
      width="50%"
      :visible.sync="dialog.detail"
      :before-close="closeDetail">
      <el-row v-loading="loading.detail" element-loading-background="rgba(0, 0, 0, 0)">
        <el-col :span="24">
          <h1 class="title">申请信息</h1>
          <el-row>
            <el-col :span="8">
              <span class="detail-title">贷款种类</span>
              <span class="detail-item" v-text="dialog.detail_msg.borrowType"></span>
            </el-col>
            <el-col :span="8">
              <span class="detail-title">用款时间</span>
              <span class="detail-item" v-text="dialog.detail_msg.expectDate"></span>
            </el-col>
            <el-col :span="8">
              <span class="detail-title">还款方式</span>
              <span class="detail-item">每月等额</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span class="detail-title">用款额度</span>
              <span class="detail-item" v-text="dialog.detail_msg.expectPrice"></span>
            </el-col>
            <el-col :span="16">
              <span class="detail-title">用款明细</span>
              <span class="detail-item" v-text="dialog.detail_msg.remark"></span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span class="detail-title">公寓性质</span>
              <span class="detail-item" v-text="dialog.detail_msg.apartmentType"></span>
            </el-col>
            <el-col :span="8">
              <span class="detail-title">公寓品牌</span>
              <span class="detail-item" v-text="dialog.detail_msg.apartmentBrand"></span>
            </el-col>
            <el-col :span="8">
              <span class="detail-title">联系人姓名</span>
              <span class="detail-item" v-text="dialog.detail_msg.borrowPerson"></span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span class="detail-title">联系人电话</span>
              <span class="detail-item" v-text="dialog.detail_msg.borrowPhone"></span>
            </el-col>
            <el-col :span="16">
              <span class="detail-title">公司地址</span>
              <span class="detail-item" v-text="dialog.detail_msg.apartmentAddress"></span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span class="detail-title">申请说明</span>
              <span class="detail-item" v-text="dialog.detail_msg.description"></span>
            </el-col>
          </el-row>
          <hr class="division" />
          <h1 class="title">借款项目</h1>
          <el-row>
            <el-col :span="24">
              <span class="detail-title">房源地址</span>
              <span class="detail-item" v-text="dialog.detail_msg.hosueAddress"></span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span class="detail-title">户型</span>
              <span class="detail-item" v-text="dialog.detail_msg.roomType"></span>
            </el-col>
            <el-col :span="8">
              <span class="detail-title">面积</span>
              <span class="detail-item" v-text="dialog.detail_msg.area"></span>
            </el-col>
            <el-col :span="8">
              <span class="detail-title">装修</span>
              <span class="detail-item" v-text="dialog.detail_msg.decoration"></span>
            </el-col>
          </el-row>
          <h1 class="title no-mark">业主信息</h1>
          <el-row>
            <el-col :span="4">
              <span class="detail-title">业主附件</span>
            </el-col>
            <el-col :span="5">
              <img :src="dialog.detail_msg.idcZmURL" class="detail-img" />
              <p class="detail-item" style="text-align:center;">身份证正面</p>
            </el-col>
            <el-col :span="5">
              <img :src="dialog.detail_msg.idcFmURL" class="detail-img" />
              <p class="detail-item" style="text-align:center;">身份证反面</p>
            </el-col>
            <el-col :span="5">
              <img :src="dialog.detail_msg.ContractImageURL" class="detail-img" />
              <p class="detail-item" style="text-align:center;">合同附件</p>
            </el-col>
            <el-col :span="5">
              <img :src="dialog.detail_msg.HouseCardURL" class="detail-img" />
              <p class="detail-item" style="text-align:center;">房产证明</p>
            </el-col>
          </el-row>
          <h1 class="title">收款人信息</h1>
          <el-row>
            <el-col :span="8">
              <span class="detail-title">姓名</span>
              <span class="detail-item" v-text="dialog.detail_msg.payeeName"></span>
            </el-col>
            <el-col :span="8">
              <span class="detail-title">手机</span>
              <span class="detail-item" v-text="dialog.detail_msg.payeePhone"></span>
            </el-col>
            <el-col :span="8">
              <span class="detail-title">身份证</span>
              <span class="detail-item" v-text="dialog.detail_msg.idCard"></span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span class="detail-title">开户行</span>
              <span class="detail-item" v-text="dialog.detail_msg.bank"></span>
            </el-col>
            <el-col :span="16">
              <span class="detail-title">银行账号</span>
              <span class="detail-item" v-text="dialog.detail_msg.bankAccount"></span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <span class="detail-title">委托书</span>
            </el-col>
            <el-col :span="5">
              <img v-if="dialog.detail_msg.EntrustURL" :src="dialog.detail_msg.EntrustURL" class="detail-img" />
              <p v-if="dialog.detail_msg.EntrustURL" class="detail-item" style="text-align:center;">委托书</p>
            </el-col>
          </el-row>
          <hr class="division" />
          <h1 class="title">审批意见</h1>
          <el-row>
            <el-col :span="8">
              <span class="detail-title">审批人</span>
              <span class="detail-item" v-text="dialog.detail_msg.checkName"></span>
            </el-col>
            <el-col :span="8">
              <span class="detail-title">审批时间</span>
              <span class="detail-item" v-text="dialog.detail_msg.checkDate"></span>
            </el-col>
            <el-col :span="8">
              <span class="detail-title">审批状态</span>
              <span class="detail-item" :class="dialog.detail_msg.borrowStatusClass" v-text="dialog.detail_msg.borrowStatusText"></span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span class="detail-title">审批备注</span>
              <span class="detail-item" v-text="dialog.detail_msg.approvalIdea"></span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-dialog>
	</el-main>
</template>

<script>
export default {
  name: "AlreadyReject",
  data() {
    return {
      loading: {
        all: true, //整页的loading
        detail: true //查看详情弹出框的loading
      },

      formInline: {
        minPrice: "", //最低金额
        maxPrice: "", //最大金额
        date: "", // 时间
        likeName: "" //用款人
      },

      //筛选的过滤信息
      currentPage: 1, //当前页
      pageSize: 10, //每页条数
      totalRecord: 0, //总条数

      dialog: {
        detail: false, //是否显示，查看详情弹出框
        detail_msg: {} //详情弹出框内容
      },

      //表格信息
      table: {
        tbody: [],
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      }
    };
  },
  methods: {
    /**-----显示，查看详情弹出框----- */
    openDetail(id) {
      this.dialog.detail = true;
      this.getDetail(id);
    },
    /**-----隐藏，查看详情弹出框----- */
    closeDetail() {
      this.dialog.detail = false;
    },

    /**-----查询详情数据----- */
    getDetail(id) {
      const self = this;
      //开启loading
      self.loading.detail = true;
      self
        .axios({
          method: "post",
          url: this.$store.state.api.borrowApply.getBorrowApplyList,
          data: {
            id
          }
        })
        .then(response => {
          //关闭loading
          self.loading.detail = false;
          const { data } = response;
          if (data.status.code == 200) {
            const { baseJsonObject, borroJsonObject } = data.result;
            var detail_msg = {
              id: id,
              borrowType: borroJsonObject.borrowType == 1 ? "寓租贷" : "寓租贷", //贷款种类
              expectDate: borroJsonObject.expectDate, //用款时间
              expectPrice: borroJsonObject.expectPrice, //用款额度
              description: borroJsonObject.description, //用款明细
              apartmentType: borroJsonObject.apartmentType == 0 ? "企业" : "个人", //公寓性质
              apartmentBrand: baseJsonObject.apartmentBrand, //公寓方品牌
              borrowPerson: baseJsonObject.borrowPerson, //联系人姓名
              borrowPhone: baseJsonObject.borrowPhone, //联系人电话
              apartmentAddress: baseJsonObject.apartmentAddress, //公司地址
              remark: borroJsonObject.remark, //申请说明
              hosueAddress: borroJsonObject.hosueAddress, //房屋地址
              roomType: borroJsonObject.roomType, //户型
              area: borroJsonObject.area + "㎡", //面积
              decoration: borroJsonObject.decoration, //装修
              payeeName: borroJsonObject.payeeName, //收款人姓名
              payeePhone: borroJsonObject.payeePhone, //收款人手机
              idCard: borroJsonObject.idCard, //身份证
              bank: borroJsonObject.bank, //开户行
              bankAccount: borroJsonObject.bankAccount, //银行账号
              idcZmURL: data.result.idcardface.smallImgrul
                ? data.result.idcardface.smallImgrul
                : data.result.idcardface.bigImgurl, //身份证正面地址
              idcFmURL: data.result.idcardback.smallImgrul
                ? data.result.idcardback.smallImgrul
                : data.result.idcardback.bigImgurl, //身份证背面地址
              ContractImageURL:
                data.result.contractlist.length > 0
                  ? data.result.contractlist[0].smallImgrul
                  : "", //合同图片地址
              HouseCardURL: data.result.propertycertificate.smallImgrul
                ? data.result.propertycertificate.smallImgrul
                : data.result.propertycertificate.bigImgurl, //房产证图片地址
              EntrustURL: data.result.ownerproxy.smallImgrul
                ? data.result.ownerproxy.smallImgrul
                : data.result.ownerproxy.bigImgurl, //委托书
              checkName: borroJsonObject.checkName, //审批人
              checkDate: borroJsonObject.checkDate, //审批时间
              approvalIdea: borroJsonObject.approvalIdea //审批意见
            };
            if (borroJsonObject.borrowStatus == 1) {
              detail_msg.borrowStatusClass = "green";
              detail_msg.borrowStatusText = "已通过";
            } else if (borroJsonObject.borrowStatus == 2) {
              detail_msg.borrowStatusClass = "red";
              detail_msg.borrowStatusText = "已驳回";
            }
            self.dialog.detail_msg = detail_msg;
          }
        })
        .catch(error => {
          self.loading.all = false;
        });
    },

    /**-----查询列表数据----- */
    getBorrowApplyList() {
      const self = this;
      //开启loading
      self.loading.all = true;
      self
        .axios({
          method: "post",
          url: this.$store.state.api.borrowApply.getList,
          data: {
            pageNo: self.currentPage,
            minPrice: self.formInline.minPrice,
            maxPrice: self.formInline.maxPrice,
            pageSize: self.pageSize,
            likeName: self.formInline.likeName,
            startDate: self.formInline.date[0],
            endDate: self.formInline.date[1],
            status: 2 //0待审批 1已通过 2已驳回 3生成合同
          }
        })
        .then(response => {
          //关闭loading
          self.loading.all = false;
          const { data } = response;
          if (data.status.code == 200) {
            self.table.tbody = [];
            //动态添加数据（渲染列表页面）
            data.result.list.forEach(item => {
              self.table.tbody.push(item);
            });
            self.totalRecord = data.result.totalRecord;
          }
        })
        .catch(error => {
          self.loading.all = false;
        });
    },

    /**-----当前页改变时调用----- */
    currentChange(currentPage) {
      const self = this;
      self.currentPage = currentPage;
      self.getBorrowApplyList();
    },

    /**-----每页条目改变时调用----- */
    sizeChange(pageSize) {
      const self = this;
      self.table.currentPage = 1;
      self.pageSize = pageSize;
      self.getBorrowApplyList();
    },

    /**-----点击单行时触发----- */
    tableRowClick(row) {
      const self = this;
      if (row && row.id) {
        const id = row.id;
        self.openDetail(id);
      }
    }
  },
  created() {
    this.getBorrowApplyList();
  }
};
</script>

<style scoped>
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
.el-button--primary {
  width: 100%;
  background-color: #188ff0;
  border-color: #188ff0;
  border-radius: 0px;
}
/deep/ .el-input__inner {
  border-radius: 0px;
}
/deep/ .el-button--primary span {
  font-size: 14px;
}
/deep/ .el-table tr {
  background: #f7f7f7;
}
/deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #ffffff;
}
/deep/ .el-table th > .cell {
  font-size: 14px;
}
/deep/ .el-table thead tr {
  background-color: #ffffff;
  color: #2e3445;
}
/deep/ .el-pagination {
  padding: 0px;
  text-align: right;
}
/deep/ .el-pagination.is-background .el-pager li.active {
  background-color: #188ff0;
}
/deep/ .el-pagination.is-background .el-pager li:hover {
  color: #188ff0;
}
/deep/ .el-form-item {
  margin: 0px;
  border: 1px solid #dcdfe6;
}
/deep/ .el-form-item .el-input__inner {
  border: 0px;
}
/deep/ .noMarginRight > .el-form-item__content {
  width: 100%;
}
/deep/ .el-form--inline .el-form-item {
  margin-right: 10px;
}
/deep/ .el-form--inline .el-form-item__label {
  padding-left: 12px;
  padding-right: 0px;
}
/deep/ .el-date-editor .el-range-input {
  width: 80px;
}
/deep/ .el-date-editor .el-range-separator {
  width: 30px;
}
/deep/ .el-dialog__title {
  color: #188ff0;
}
/deep/ .el-dialog__headerbtn .el-dialog__close {
  font-size: 14px;
  color: #188ff0;
}
/deep/ .el-table {
  min-height: calc(100vh - 275px);
}
/deep/ .el-dialog__headerbtn .el-dialog__close {
  font-size: 24px;
}
.finance-state {
  display: inline-block;
  color: #fff;
  width: 70px;
  padding-right: 10px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: url(../../../static/image/icon_state_red.png) left top no-repeat;
  background-size: 70px 30px;
}
.title {
  color: #188ff0;
  padding-left: 20px;
  position: relative;
  height: 20px;
  line-height: 20px;
  margin-bottom: 20px;
  font-weight: normal;
  font-size: 14px;
}
.title::before {
  content: "";
  display: block;
  width: 3px;
  height: 18px;
  background-color: #188ff0;
  position: absolute;
  top: 1px;
  left: 0px;
}
.title.no-mark {
  padding-left: 0px;
}
.title.no-mark::before {
  content: none;
}
.detail-title {
  font-size: 14px;
  color: #000;
  margin-right: 20px;
}
.detail-item {
  font-size: 12px;
  color: #777;
}
.detail-item.red {
  color: #f2082e;
}
.detail-item.green {
  color: #01be6a;
}
.division {
  border-style: solid;
  border-width: 1px;
  border-color: #dfe4e6;
  margin: 0px;
  margin-bottom: 20px;
}
.detail-img {
  display: block;
  border: 0px;
  width: 85%;
  height: 85%;
  margin: 0 auto;
}
</style>
