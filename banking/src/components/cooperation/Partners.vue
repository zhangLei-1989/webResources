<template>
  <el-main v-loading="loading.all" element-loading-background="rgba(0, 0, 0, 0)">
    <el-row class="noMarginLeft noMarginRight search">
      <el-col :span="24">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display:flex;;">
          <el-form-item label="授信额度">
            <el-input v-model="formInline.minPrice" placeholder="最低" style="width:100px;"></el-input>
            —
            <el-input v-model="formInline.maxPrice" placeholder="最高" style="width:100px;"></el-input>
          </el-form-item>
          <el-form-item class="noMarginRight" style="flex:1;">
            <el-input v-model="formInline.likeName" placeholder="公寓名称"></el-input>
          </el-form-item>
          <el-form-item class="noMarginRight">
            <el-button type="primary" @click="fetchData">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div ref="table" class="tableDate">
      <el-table :data="dataList" stripe>
        <el-table-column
          label="公寓名称">
          <template slot-scope="scope">
            <span class="finance-state">{{scope.row.apartmentName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="公寓品牌">
          <template slot-scope="scope">
            <span class="finance-state">{{scope.row.apartmentBrand}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="a3"
          label="已合作房源数" >
          <template slot-scope="scope">
            <span class="finance-state">{{scope.row.countAll}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="a4"
          label="合约中房源数">
          <template slot-scope="scope">
            <div class="finance-state" >
              <span class="house-count" @click="showHouse(scope.row)">{{scope.row.countNow}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="a5"
          label="授信额度">
          <template slot-scope="scope">
            <span class="finance-state">{{scope.row.creditQuota}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="a6"
          label="已使用额度"
          width="100">
          <template slot-scope="scope">
            <span class="finance-state">{{scope.row.creditQuotaUsed}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="a7"
          label="剩余额度">
          <template slot-scope="scope">
            <span class="finance-state">{{scope.row.creditQuotaRemain}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="a8"
          label="违约合同数">
          <template slot-scope="scope">
            <span class="finance-state">{{scope.row.breachContract}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="a9"
          label="开始合作时间"
          width="180">
          <template slot-scope="scope">
            <span class="finance-state">{{scope.row.contractCreateDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="handle"
          label="操作"
          width="130">
          <template slot-scope="scope">
           <div @click.stop="stopPor">
             <el-select v-model="screening.areaValue[scope.$index]" placeholder="修改额度" style="width:100%;"
                        @change="handleDo(scope)">
               <el-option value="修改额度"
                          v-show="isButtonAuthor('5dac90348b694acf8b48300b2340d5be')">修改额度</el-option>
               <el-option value="查看详情">查看详情</el-option>
               <el-option value="历史额度">历史额度</el-option>
               <el-option value="删除"  v-show="isButtonAuthor('238f97dda78a4fdd9e1d6599692e92eb')" >删除</el-option>
             </el-select>
           </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-row  class="noMargin search">
      <el-col :span="24">
        <el-pagination
          background
          :current-page="currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRecord">
        </el-pagination>
      </el-col>
    </el-row>
    <!--弹窗-->
    <!--历史授信额度-->
    <el-dialog
      class="historyQuota"
      title="历史授信额度"
      width="550px"
      :visible.sync="btnControllerGroup.historyQuotaBtn">
      <el-table
        :data="historyQuotaList"
        :stripe="true"
        :border="true"
        max-height="520"
        height="400"
        :row-style="{height:'40px'}"
        :header-row-style="{background: '#f2f4f7', height: '46px',color:'#404040'}"
        style="width: 100%" >
        <el-table-column
          prop="a7"
          label="更改时间">
          <template slot-scope="scope">
            <span>{{scope.row.et}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="a7"
          label='额度'>
          <template slot-scope="scope">
            <span>{{scope.row.creditQuota}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="a7"
          label="备注">
          <template slot-scope="scope">
            <span>{{scope.row.remark}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="a7"
          label="操作人">
          <template slot-scope="scope">
            <span>{{historyQuotaList.ctName}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--修改授信额度-->
    <el-dialog
      title="修改授信额度"
      :visible.sync="btnControllerGroup.modifyLineBtn"
      width="550px"
      class="modifyLine">
      <div class="breakMoney_top">
        <span class="modifyLine_text">当前额度:</span>
        <span class="modifyLine_money">¥{{currentItem.creditQuota}}</span>
      </div>
      <div>
        <div class="money_num">
          <label class="require">修改额度</label>
          <input type="text" v-model="modifyLineForm.money">
        </div>
        <div class="remake">
          <textarea placeholder="备注" v-model="modifyLineForm.remark"></textarea>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
         <div class="sureBtn" @click="modifyLine">确认</div>
      </span>
    </el-dialog>
    <!--合作中的房源-->
    <el-dialog
      title="合作中的房源"
      :visible.sync="btnControllerGroup.houseSourceBtn"
      width="1140px"
      class="houseSource"
     >
      <div class="house_top">
        <el-row>
          <el-col :span="9">
            <span class="count_text">数量</span>
            <span class="count_num">{{currentItem.countNow}}</span>
          </el-col>
          <el-col :span="15" class="search">
            <el-form :inline="true">
              <el-form-item class="time_picker">
                <span class='hetong'>合同时间</span>
                <el-date-picker
                  type="daterange"
                  range-separator="—"
                  v-model="partnersFormLine.date"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width:auto;">
                </el-date-picker>
              </el-form-item>
              <el-form-item class="noMarginRight" style="flex:1;" :style="{width:'220px'}">
                <el-input v-model="formInline.user" placeholder="小区名"></el-input>
              </el-form-item>
              <el-form-item class="noMarginRight">
                <el-button type="primary">搜索</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <el-table
        :header-row-style="{background: '#f2f4f7', height: '46px',color:'#404040'}"
        border
        :style="{width:'100%',marginTop:'13px',textAlign:'center'}"
        :data="historyList"
        max-height="520"
        height="400">
        <el-table-column
          prop="a7"
          label="合作时间" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.contract_ct}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="a7"
          label="房源地址" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.getFullAddress}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="a7"
          label="装修" width="50">
          <template slot-scope="scope">
            <span>{{scope.row.zhuangxiutype}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="a7"
          label="户型" width="70">
          <template slot-scope="scope">x
            <span>{{scope.row.hx}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="a7"
          label="面积" width="70">
          <template slot-scope="scope">
            <span>{{scope.row.mianji}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="a7"
          label="押金" width="70">
          <template slot-scope="scope">
            <span>{{scope.row.yajin}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="a7"
          label="托管期限" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.startDate}}-{{scope.row.endDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="a7"
          label="付款方式"  width="160" >
          <template slot-scope="scope">
            <span>{{computedPayMethod(scope.row.payMethod)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="a7"
          label="房间量/余量">
          <template slot-scope="scope">
            <span>{{scope.row.splitCount}}/{{Number(scope.row.splitCount)-Number(scope.row.chuzuCount)}}</span>
          </template>
        </el-table-column>
      </el-table>

    </el-dialog>
    <!--添加合作放-->
    <el-dialog
      class="addCooperation"
      title="添加合作方"
        width="550px"
      :visible="addCooperationBtn"
      :before-close="closeDialog">
      <el-form v-show="true">
        <el-form-item>
          <el-input  v-model="addCooperationForm.apartmentName">
            <template slot="prepend">企业名称 :</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="addCooperationForm.apartmentBrand">
            <template slot="prepend">公寓品牌 :</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="addCooperationForm.apartmentAddress">
            <template slot="prepend">住所地 :</template>
          </el-input>
        </el-form-item>
        <el-form-item class="item2">
          <el-row>
            <el-col :span="11" class="behalf">
              <el-input v-model="addCooperationForm.apartmentPerson">
                <template slot="prepend">法定代表 :</template>
              </el-input>
            </el-col>
            <el-col :span="11" class="phone">
              <el-input v-model="addCooperationForm.apartmentPhone">
                <template slot="prepend">联系电话 :</template>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-input v-model="addCooperationForm.apartmentLogo">
            <template slot="prepend">公司简称 :</template>
          </el-input>
        </el-form-item>
        <el-form-item v-model="addCooperationForm.creditQuota" class="item2">
          <el-row>
            <el-col :span="11" class="behalf">
              <el-input v-model="addCooperationForm.gcid">
                <template slot="prepend">安全码 :</template>
              </el-input>
            </el-col>
            <el-col :span="11" class="phone">
              <el-input v-model="addCooperationForm.creditQuota">
                <template slot="prepend">授信额度 :</template>
                <template slot="append">元</template>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div class="el-footer" slot="footer">
        <span class="save" @click="addCooperationSave">保存</span>
      </div>
    </el-dialog>
    <!--弹窗end -->
    <!-- 查看收支详情  确认收款 -->
    <el-dialog
      class="waitBack"
      title="查看收支详情"
      width="700px"
      :visible.sync="btnControllerGroup.partnersBtn">
      <div class="waitBack_item">
        <h2 class="item_title">基本信息</h2>
        <el-row>
          <el-col :span="3" class="item_name">企业名称  </el-col>
          <el-col :span="21" class="item_content">{{partnersForm.apartmentName}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="item_name">安全码  </el-col>
          <el-col :span="5" class="item_content"> {{partnersForm.gcid}}</el-col>
          <el-col :span="3" class="item_name">公司简称 </el-col>
          <el-col :span="5" class="item_content">{{partnersForm.apartmentLogo}}</el-col>
          <el-col :span="3" class="item_name">公寓品牌</el-col>
          <el-col :span="5" class="item_content">{{partnersForm.creditQuota}}</el-col>
        </el-row>
      </div>
      <div class="waitBack_item sureBox">
        <h2 class="item_title">数据</h2>
        <el-row>
          <el-col :span="3" class="item_name">授信额度</el-col>
          <el-col :span="5" class="item_content">{{currentItem.creditQuota}}</el-col>
          <el-col :span="3" class="item_name">已使用额度</el-col>
          <el-col :span="5" class="item_content">{{currentItem.creditQuotaUsed}}</el-col>
          <el-col :span="3" class="item_name">剩余额度 </el-col>
          <el-col :span="5" class="item_content">{{currentItem.creditQuotaRemain}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="item_name">已合作房源  </el-col>
          <el-col :span="5" class="item_content">{{currentItem.countAll}}</el-col>
          <el-col :span="3" class="item_name">合约中房源</el-col>
          <el-col :span="5" class="item_content">{{currentItem.countNow}}</el-col>
          <el-col :span="3" class="item_name">违约合同 </el-col>
          <el-col :span="5" class="item_content">{{currentItem.breachContract}}</el-col>
        </el-row>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
  import tool from "../../../static/js/tool.js";
  import { mapState } from "vuex";
  export default {
    name: "Partners",
    data() {
      return {
        partnersFormLine:{ //合作中的房源搜索信息
          date:'', //搜索时间
          likeName: '' //小区名
        },
        dialogFormline:{   // 合作中的房源搜索

        },
        height:'',//页面初始高度
        pageSize: 5,  //分页每页数据数量
        currentPage: 1, //当前分页页码
        totalRecord: 0, // 总数据量
        loading: false,
        addCooperationForm:{
          apartmentName:'', //企业名称
          apartmentBrand:'' , //公寓品牌
          apartmentAddress:'',//住所地
          apartmentPerson:'',//法人代表
          apartmentPhone:'',//联系电话
          gcid:'',//安全码
          creditQuota:'', //授信额度
          apartmentLogo:'', // 公寓简称
        },
        modifyLineForm: {    //修改授信额度表单数据
          money: '',  //金额
          remark:'' // 备注
        },
        houseList:[],
        currentItem: {
          creditQuota: '',
          creditQuota:'',//授信额度
          creditQuotaUsed:'',//已使用额度
          creditQuotaRemain:'',//剩余额度
          countAll:'',//已合作房源
          countNow:'',//合约中房源
          breachContract:""//违约合同
        }, //当前条数
        screening: {
          areaValue: []//选择操作按钮中的数据
        },
        loading:{
          all:'' // 页面加载弹框
        },
        btnControllerGroup: {
          historyQuotaBtn: false, //  历史授信额度
          modifyLineBtn: false,// 修改授信额度
          houseSourceBtn: false, // 合作中的房源
          partnersBtn:false, // 合作方详情
        },
        partnersForm:{  //
          apartmentName:'',//公寓名称
          apartmentLogo:'', //公司简称
          gcid:'',//安全码
          apartmentBrand:'',//公寓品牌
          creditQuota:''//授信额度
        },
        dataList: [],
       /* historyQuotaList:{
          et:'',//更改时间
          creditQuota:'', //授信额度
          remark:'',//备注
          ctName:'' // 创建人id
        },  // 历史授信额度数据*/
        historyQuotaList:[],
        historyList:[], //合作中的房源
        formInline: {
          minPrice: "",  //最低
          maxPrice: "",  //最高
          likeName: "" // 模糊搜索
        },
        //筛选的过滤信息
        historyQuotaData: {
          thead: [{
            prop: 'time',
            label: '更改时间',
            width: 150
          }, {
            prop: 'quota',
            label: '额度',
            width: 79
          }, {
            prop: 'notice',
            label: '备注',
            width: 197
          }, {
            prop: 'user',
            label: '操作人',
            width: 82
          }],
          data: [
            {
              time: "2017-12-12  11:11:11",
              quota: "100000",
              notice: "备注",
              user: '高玉婷'
            },
            {
              time: "2017-12-12  11:11:11",
              quota: "100000",
              notice: "备注",
              user: '高玉婷'
            }
          ]
        },
        houseData: {   //合作房源数据
          thead: [{
            prop: 'time',
            width: '190',
            label: '合作时间',
          }, {
            prop: 'address',
            width: '180',
            label: '房源地址',
          }, {
            prop: 'fitment',
            width: '60',
            label: '装修',
          }, {
            prop: 'doorModel',
            width: '70',
            label: '户型',
          }, {
            prop: 'area',
            width: '60',
            label: '面积',
          }, {
            prop: 'area',
            width: '80',
            label: '押金',
          }, {
            prop: 'area',
            width: '190',
            label: '拖款期限',
          }, {
            prop: 'area',
            width: '80',
            label: '付款方式',
          }, {
            prop: 'area',
            width: '110',
            label: '房间量/余量',
          }]
        },
        addFormData: { //添加合作方表单信息

        }
      };
    },
    computed: mapState({
      addCooperationBtn: state => state.partners.partnersDialogActive
    }),
    methods: {
      closeDialog() {
        this.$store.commit("partners/tooglePartnersDialogActive", false);
      },
      computedPayMethod(code){
          //1.押一付一，2.押一付三，3.半年付，4.年付，5押二付一
         var str = ''
         if(code == 1){
            str = '押一付一'
         }else if(code == 2){
            str = '押一付三'
         }else  if(code == 3){
            str = '半年付'
         }else if(code == 4){
            str ='年付'
         }else  if(code == 5){
            str = '5押二付一'
         }
         return str;
      },
      /**
       * 显示合作方详情
       */
      showPartners() {
        var _this =this
        var {id} = this.currentItem
        this.axios({
          url:this.$store.state.api.basePartner.partnersDetail,
          method:'post',
          data:{
            id
          }
        }).then(function (response) {
          var {data} =response
          if(data.status.code == 200){
            console.log(data.result);
            _this.partnersForm  = data.result
          }else {
            _this.$message.error(response.data.status.msg)
          }
        }).catch((error)=>{

        })
      },
      /**
       * 获取列表数据
       */
      fetchData() {
        this.loading.all = true
        var _this = this;
        var dataOption = {
          minPrice: this.formInline.minPrice,
          maxPrice: this.formInline.maxPrice,
          likeName: this.formInline.likeName,
          pageNo:this.currentPage,
          pageSize:this.pageSize,
        };

        this.axios({
          url: this.$store.state.api.basePartner.getList,
          method: "post",
          data: dataOption,
        }).then(function (response) {
           const {result}= response.data
          if (response.data.status.code == 200) {
            _this.loading.all = false
            _this.totalRecord = result.totalRecord;
            _this.pageSize = result.pageSize;
            _this.pageNo =result.pageNo;
            _this.dataList = response.data.result.list;
          }else {
             _this.message.error(response.data.status.msg)
          }
        }).catch((error)=>{
           _this.loading.all = false
        })
      },
      //删除合作方
      deleteCo(id){
        var _this = this
        this.axios({
          url:this.$store.state.api.basePartner.delete,
          method:'post',
          data:{
            id
          }
        }).then(function (response) {
          var {data} = response
          if (data.status.code == 200) {
            _this.$message('删除成功')
            _this.fetchData()
          }else {
            _this.$message(data.status.msg)
          }
        })
      },
      /**-----判断按钮是否有权限----- */
      isButtonAuthor(id) {
        const self = this;
        const userInfo = tool.session.get("userInfo");
        if (!userInfo) {
          self.$router.replace("/login");
        } else {
          const systemResourcesList = userInfo.systemResourcesList;
          if (systemResourcesList) {
            const authorization = systemResourcesList;
            const author = authorization.filter(
              item => item.zIndex == 3 && item.id == id
            );
            if (author.length > 0) {
              return true;
            } else {
              return false;
            }
          }
        }
      },
      stopPor(){

      },
      /**
       * 操作中的下拉选择
       * @param item 当前行数据
       */
      handleDo(item) {
        this.currentItem = item.row
        console.log(item.row)
        var _this= this
        var val = this.screening.areaValue[item.$index]
        if (val == '修改额度') {
          this.modifyLineForm.money = '';
          this.modifyLineForm.remark = '';
          this.btnControllerGroup.modifyLineBtn = true
        } else if (val == '历史额度') {
          this.btnControllerGroup.historyQuotaBtn = true
        }else if(val=='查看详情'){
          this.btnControllerGroup.partnersBtn = true
          this.showPartners()
        }else if(val == '删除'){
          this.$alert('确定删除合作方吗?', '标题名称', {
            confirmButtonText: '确定',
            callback: action => {
              _this.deleteCo(item.row.id)
            }
          });
        }
      },
      /**
       * 修改授信额度
       */
      modifyLine() {
        var _this =this
        var {id} = this.currentItem
        var creditQuota = this.modifyLineForm.money
        var remark = this.modifyLineForm.remark
        this.axios({
          url:this.$store.state.api.basePartner.update,
          method:'post',
          data:{
            id,
            creditQuota,
            remark
          }
        }).then(function (response) {
            if(response.data.status.code == 200){
              _this.$alert("操作成功", "提示", {
                callback: action => {
                  _this.btnControllerGroup.modifyLineBtn = false
                }
              });
            }else {
              _this.$message.error(response.data.status.msg)
            }
        }).catch((error)=>{
          _this.$message('请求有误')
        })
      },
      /**
       * 合作中的房源
       */
      showHouse(row){
          this.currentItem = row
          this.btnControllerGroup.houseSourceBtn = true
          this.cooperationHouse(row.id)
      },

      //获取历史授信额度
      cooperationHouse(id){  //保存添加中的房源
        var  _this = this

        this.axios({
          url:this.$store.state.api.basePartner.cooperationHouse,
          method:'post',
          data:{
            id:id,
            startDate: this.partnersFormLine.date[0],
            endDate: this.partnersFormLine.date[1],
          }
        }).then(function (response) {
          var {data} = response
          if(data.status.code == 200){
             console.log(data.result.list)
             _this.historyList = data.result.list
          }else{
            _this.$message.error(data.status.msg)
          }
        }).catch((error)=>{
          _this.$message('数据获取错误')
        })
      },
      //获取历史授信额度
      getHistory(){  //保存添加中的房源
        var  _this = this
        this.axios({
          url:this.$store.state.api.basePartner.saveParner,
          method:'post',
          data:{}
        }).then(function (response) {
          if(response.data.status.code == 200){
            _this.$alert("操作成功", "提示", {
              callback: action => {
                _this.closeDialog();
              }
            });
            for(var i in _this.addCooperationForm){
              _this.addCooperationForm[i] = ''
            }
          }
        })
      },
      addCooperationSave(){  //保存添加中的房源
        var  _this = this
        var sendOption=this.addCooperationForm;
          for(var i in sendOption) {
            if (sendOption[i] == '') {
              this.$message('表单数据必填')
              return
            }
          }
          this.axios({
            url:this.$store.state.api.basePartner.saveParner,
            method:'post',
            data:sendOption
          }).then(function (response) {
            var {data} = response
            for(var i  in _this.addCooperationForm){
               _this.addCooperationForm[i] = ''
            }
            if(data.status.code == 200){
              _this.$alert("操作成功", "提示", {
                callback: action => {
                  _this.closeDialog();
                }
              });
              _this.fetchData()
            }else{
              _this.$message(data.status.msg)
            }
          })
      },
      getistoryQuotaListData(){
        var _this = this
        var {partnerId} =this.currentItem
        this.axios({
          method:'post',
          data:{
            partnerId
          },
          url:this.$store.state.api.basePartner.getHistory
        }).then(function (response) {
          if (response.data.status.code == 200) {
            _this.historyQuotaList.push(response.data.result);
          }
        })
      },
      /**
       * 改变分页每页显示的条数
       * @param val 每页显示的数目
       */
      handleSizeChange(val) {
        var _this = this
        this.pageSize = val
        this.fetchData(val, _this.currentPage)
      },
      /**
       * 分页操作(下一页,上一页,点击分页跳转)
       * @param val 将要跳转到的分页
       */
      handleCurrentChange(val) {
        this.currentPage = val
        this.fetchData(this.pageSize, val)
      }
    },
    created() {
      this.fetchData()
    }
  };
</script>

<style scoped>
  /*弹窗样式*/
  /*添加合作方*/
  /deep/ .addCooperation .el-row {
    margin-bottom: 0;
  }

  /deep/ .addCooperation .el-input-group__prepend,
  /deep/ .addCooperation .el-input-group__append {
    background: #fff;
    border: none;
  }

  /deep/ .addCooperation .el-input-group__prepend {
    padding: 0 0 0 10px;
  }

  /deep/ .addCooperation .el-input-group__prepend::before {
    content: '*';
    position: absolute;
    top: 2px;
    left: 2px;
    color: #ff0000;
  }

  /deep/ .addCooperation .el-form-item {
    margin-bottom: 15px;
  }

  .addCooperation .phone {
    border: 1px solid #dcdfe6;
    margin-left: 20px;
    width: 244px;
  }

  .addCooperation .behalf {
    border: 1px solid #dcdfe6;
    width: 244px;
  }

  /deep/ .addCooperation .item2 {
    border: none;
  }

  .addCooperation .save {
    width: 100px;
    height: 40px;
    background-color: #188ff0;
    border-radius: 5px;
    display: inline-block;
    line-height: 40px;
    text-align: center;
    color: #ffffff;
    font-size: 16px;
    margin-bottom: 20px;
    position: relative;
    left: 14px;
  }

  /deep/ .addCooperation .el-dialog__body {
    padding-bottom: 0;
  }

  /*合同中的房源 */
  /deep/ .houseSource .house_top .el-row.search {
    padding: 0;
  }

  /deep/ .houseSource . house_top .el-button {
    width: 80px;
  }

  /deep/ .houseSource .house_top .el-date-editor {
    padding-left: 30px;
  }

  /deep/ .houseSource th {
    text-align: center;
  }

  .houseSource .time_picker {
    width: 360px;
  }

  .houseSource .count_text, .houseSource .count_num {
    color: #188ff0;
    font-size: 20px;
    display: inline-block;
    vertical-align: center;
  }

  .houseSource .count_text {
    font-size: 14px;
    padding: 0 14px 0 19px;
  }

  .houseSource .house_top {
    height: 60px;
    line-height: 60px;
    background: #f2f4f7;
  }

  /deep/ .houseSource .house_top .el-form-item__content {
    line-height: 60px;
  }

  .houseSource .house_top .el-form-item {
    border: none;
  }

  .houseSource .hetong {
    height: 40px;
    line-height: 40px;
    display: inline-block;
    background: #fff;
    left: 20px;
    position: relative;
    z-index: 2;
    color: #404040;
    top: -1px;
    padding-left: 11px;
  }

  /*历史授信额度 */
  /deep/ .historyQuota th,
  /deep/ .historyQuota td {
    text-align: center;
  }

  /*修改备注额度*/
  /deep/ .modifyLine .el-dialog__body {
    padding: 0;
  }

  /deep/ .el-dialog .el-dialog__title {
    color: #188ff0;
  }

  .modifyLine .breakMoney_top {
    height: 72px;
    line-height: 72px;
    padding-left: 25px;
    border-bottom: 1px dashed #dfe4e6;;
  }

  .modifyLine_text {
    color: #999999;
    font-size: 14px;
  }

  .modifyLine_money {
    color: #404040;
    font-size: 20px;
  }

  .modifyLine .money_num {
    width: 244px;
    height:40px ;
    position: relative;
    left: 24px;
    margin-top: 20px;
  }

  .money_num label {
    display: block;
    z-index: 2;
    width: 68px;
    height: 34px;
    line-height: 34px;
    left: 9px;
  }


  .money_num span {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }

  .money_num input {
    position: absolute;
    top: 0;
    left: 0;
    width: 244px;
    height: 34px;
    border: 1px solid #e6eced;
    outline: none;
    padding-left: 70px;
  }

  .modifyLine .remake {
    margin: 9px 0 0 25px;
  }

  .modifyLine .remake textarea {
    width: 497px;
    height: 77px;
    padding: 9px;
    border: solid 1px #e6eced;
    resize: none;
    color: #404040;
    font-size: 14px;
  }

  /deep/ .modifyLine .el-dialog__footer {
    margin: 31px 0 0 0;
    padding-bottom: 41px;
  }

  /deep/ .modifyLine .revertBtn {
    width: 140px;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    background-color: #ffffff;
    border-radius: 5px;
    border: solid 2px #188ff0;
    text-align: center;
    color: #188ff0;
    font-size: 16px;
    vertical-align: top;
  }

  /deep/ .modifyLine .sureBtn {
    width: 100px;
    height: 40px;
    display: inline-block;
    background-color: #188ff0;
    border-radius: 5px;
    line-height: 40px;
    text-align: center;
    vertical-align: top;
    color: #ffffff;
    margin: 0 12px 0 19px;
  }

  /*弹窗 end*/
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
    width: 90px;
  }

  /deep/ .el-date-editor .el-range-separator {
    width: 30px;
  }

  .finance-state {
    display: inline-block;
    width: 80px;
    padding-right: 10px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  .finance-state.yellow {
    background: url(../../../static/image/icon_state_yellow.png) left top / 70px 30px no-repeat !important;
  }

  .finance-state.gray {
    background: url(../../../static/image/icon_state_gray.png) left top / 70px 30px no-repeat;
  }

  .finance-state.black {
    background: url(../../../static/image/icon_state_black.png) left top / 70px 30px no-repeat;
  }

  .finance-state.green {
    background: url(../../../static/image/icon_state_green.png) left top / 70px 30px no-repeat;
  }

  .finance-state.blue {
    background: url(../../../static/image/icon_state_blue.png) left top / 70px 30px no-repeat;
  }

  .finance-state.red {
    background: url(../../../static/image/icon_state_red.png) left top / 70px 30px no-repeat;
  }

  .finance-state.orange {
    background: url(../../../static/image/icon_state_orange.png) left top / 70px 30px no-repeat;
  }
  .modifyLine .require{
     position: relative;
  }
  .modifyLine .require::before{
    content: '*';
    position: absolute;
    top:6px;
    left: 6px;
  }
 .searchPagination{
   position: fixed;
   bottom: 40px;
   width: 80%;
 }
  .tableDate {
    background: #fff;
  }
  .searchPagination{
    position: fixed;
    bottom: 20px;
    width: 89%;
    background:#f9f9f9 ;
    padding: 10px 20px 10px 10px;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
  }
  .money_num .require::before{
    content: '*';
    position: absolute;
    color:#ff2020;
    top:-8px;
    left: -4px;
  }
  /* 查看合作方闲情*/

  /deep/ .waitBack .el-row {
    margin-bottom: 10px;
  }

  /deep/ .waitBack .el-dialog__body {
    padding: 0;
  }

  /deep/ .waitBack .el-dialog__footer {
    background: #f2f6f7;
  }

  /deep/ .waitBack .waitBack_item {
    margin: 0 26px;
    padding-bottom: 21px;
    border-bottom: 1px dashed #dfe4e6;
  }

  .waitBack .item_title {
    color: #188ff0;
    padding-left: 8px;
    font-size: 14px;
    border-left: 3px solid #188ff0;
    margin: 21px 0 29px 0;
    font-weight: normal;
  }

  .waitBack .item_name {
    color: #404040;
    font-size: 14px;
  }

  .waitBack .item_content {
    color: #999999;
    font-size: 12px;
  }

  .waitBack .img_list {
    overflow: auto;
    margin-left: 26px;
    padding: 0;
  }

  .waitBack .img_list li {
    width: 100px;
    height: 100px;
    background-color: #dfe4e6;
    float: left;
    margin-right: 20px;
  }

  .waitBack .sureBox {
    overflow: auto;
    border: none;
    padding-bottom: 60px;
    margin-left: 25px;
    border-bottom: 1px dashed #dfe4e6;
  }
  .waitBack .sureGet {
    width: 80px;
    height: 36px;
    background-color: #188ff0;
    border-radius: 2px;
    line-height: 36px;
    text-align: center;
    color: #ffffff;
    font-size: 16px;
    margin-left: 592px;
  }

  /deep/ .el-button.rejectBtn {
    width: 120px;
    text-align: left;
    border-radius: 0;
    text-indent: 10px;
  }
  .house-count{
    color: #188ff0;
    border-bottom: 1px solid #188ff0;
    cursor: pointer;
  }
  .el-row.search {
    background: #fff;
    padding: 20px;
  }
  /deep/ .el-table__body-wrapper{
    height: calc(100vh - 300px);
  }
  .el-main{
    padding: 20px 20px 0 20px;
  }

</style>
