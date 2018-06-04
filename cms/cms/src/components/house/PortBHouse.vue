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
          <span :style="{ color: i.color }" @click="tagClick(tag_index)">
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
        <span :style="{ color: i.color }" @click="tagClick2(tag_index)">
            {{i.name + '(' + i.number + ')'}}
        </span>
      </el-tag>
    </div>
      
    </el-header>
    <el-row class="noMarginLeft noMarginRight search" :gutter="20">
     <el-col  :span="4" class="noPaddingLeft">
        <el-select v-model="searchbtn.brandvalue" clearable placeholder="公寓" style="width:100%;">
          <el-option
            v-for="item in brand"
            :key="item.id"
            :label="item.brandName"
            :value="item.gcid">
          </el-option>
        </el-select>
      </el-col>
      <el-col  :span="4" class="noPaddingLeft">
        <el-cascader
          v-model="searchbtn.cityIdList"
          id="cityK"
          :options="cityList"
          filterable
          clearable
          change-on-select
          placeholder="城市/区域/商圈"
          :props="cityProps"
          style="width:100%;">
        </el-cascader>
      </el-col>
      <el-col :span="14" class="noPaddingRight noPaddingLeft" style="width:57%;">
        <el-input id="ssk" placeholder="楼盘名称" style="width:100%;"></el-input>
      </el-col>
      <el-col :span="1" class="noPaddingLeft" style="margin-right:10px;">  
        <el-button @click="searchBtn" class="btnC" type="danger" style="width:auto; padding: 12px;">搜索</el-button>
      </el-col>
      <el-col :span="1">
        <el-button @click="exportContractFn" class="btnC" type="danger" style="width:auto; border-color:#000; padding: 12px; background:#000;">导出</el-button>
      </el-col>
    </el-row>
    <el-row class="noMargin search noPaddingBottom">
      <el-col :span="24" style="overflow-y: auto;height: 350px;">
        <el-table :data="table.tbody" stripe border>
          <el-table-column 
            prop="brandName"
            label="公寓名称">
          </el-table-column>
          <el-table-column 
            prop="houseType"
            label="楼盘/房型"
            v-if="bj3">
            <template slot-scope="scope">
              <div>{{ scope.row.quyuCName }}/{{ scope.row.houseType }}</div>
            </template>
          </el-table-column>
          <el-table-column 
            v-for="val in table.thead"
            :prop="val.prop"
            :label="val.label"
            :key="val.prop">
          </el-table-column>
          <el-table-column 
            prop="Citys"
            label="城市/区域/商圈">
            <template slot-scope="scope">
              <div>{{ scope.row.city }}{{ scope.row.hiCity }}/{{ scope.row.quyuAName }}{{ scope.row.hiArea }}/{{ scope.row.quyuBName }}{{ scope.row.hiBusinessCircle }}</div>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            prop="handle"
            label="操作"
            min-width="100">
             <template slot-scope="scope">
              <el-popover
                ref="popover"
                placement="left"
                width="390"
                popper-class="tck"
                trigger="click">
                  <div v-for="data in gridData">
                    <div class="Ztitle">{{ data.title }}</div>
                    <div class="Ztit" v-for="val in data.information">
                      <div class="tit">
                        <span>{{ val.tit }}</span>
                        <i>{{ val.tit11 }}<b>{{ val.houseNum }}</b></i>
                        <i>{{ val.tit12 }}<b>{{ val.houseModel }}</b></i>
                        <i>{{ val.tit13 }}<b>{{ val.houseLayer }}</b></i>
                        <i>{{ val.tit14 }}<b>{{ val.orientationArea }}</b></i>
                        <i>{{ val.tit15 }}<b>{{ val.rentPrice }}</b></i>
                        <i>{{ val.tit16 }}<b>{{ val.houseCharacteristics }}</b></i>
                        <i>{{ val.tit17 }}<b>{{ val.closingDate }}</b></i>
                        <i>{{ val.tit18 }}<b>{{ val.housePerson }}</b></i>
                      </div>
                      <div class="tit" v-if="bj1">
                        <span>{{ val.tit2 }}</span>
                        <i>{{ val.tit19 }}<b>{{ val.leasedState }}</b></i>
                      </div>
                      <div class="tit" style="overflow:hidden;" v-if="bj2">
                        <span>{{ val.tit2 }}</span>
                        <div v-for="item in val.xmlist">
                          <i>
                            <div style="width: 33.3%; float:left;">楼栋 : <b>{{ item.louDongName }}</b></div>
                            <div style="width: 33.3%; float:left;">最高层数 : <b>{{ item.floorCount }}</b></div>
                            <div style="width: 33.3%; float:left;">每层房间数 : <b>{{ item.floorRoomCount }}</b></div>
                          </i>
                        </div>
                      </div>
                      <div class="tit" v-if="bj1">
                        <span>{{ val.tit3 }}</span>
                        <i>{{ val.tit20 }}<b>{{ val.vacancyCondition }}</b></i>
                      </div>
                      <div class="tit" v-if="bj1">
                        <span>{{ val.tit4 }}</span>
                        <i>备&ensp;&ensp;&ensp;&ensp;注 : <b>{{ val.remarks }}</b></i>
                      </div>
                      <div class="tit" v-if="bj2">
                        <span>{{ val.tit4 }}</span>
                        <i>介&ensp;&ensp;&ensp;&ensp;绍 : <b>{{ val.remarks }}</b></i>
                      </div>
                    </div>
                  </div>
              </el-popover>
              <el-button v-popover:popover type="text" @click="alt(scope.row.id)" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    
    <el-row class="noMargin search">
      
    </el-row>
    
    <el-footer class="footer block" height="50px">
      <el-pagination class="liColor"
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
  </el-main>
</template>

<script>
import tool from "../../../static/js/tool.js";
export default {
  name: "portBHouse",
  data() {
    return {
       options: [],
       userInit: {},
       cityProps: {
          value: 'id',
          label: 'name',
          children: 'children'
        },
       gridData: [],
        tag:[
          {
            name: "整租",
            number: "0",
            color: ""
          },
          {
            name: "合租",
            number: "0",
            color: ""
          },
          {
            name: "集中",
            number: "0",
            color: ""
          }
        ],
        tag2:[
          {
            name: "全部",
            number: "0",
            color: ""
          },
          {
            name: "可租",
            number: "0",
            color: ""
          },
          {
            name: "已租",
            number: "0",
            color: ""
          }
        ],
      loading: false,
      jz: false,
      bj: "",
      bjs: "",
      bj1: false,
      bj2: false,
      bj3: true,
      //筛选的过滤信息
      screening: {
        areaValue: "", //城市/区域
        area: [] //城市/区域
      },
      zhexport: {

      },
      search: {
        pageNo: 1,
        pageSize: 10,
        isShared: "",
        status: ""
      },
      //表格信息
      table: {
        thead: [
          {
            prop: "fangNo",
            label: "房号"
          }
        ],
        tbody: [],
        tfoot: [],
        currentPage: 1,
        totalRecord: 0
      },
      cityList: [],
      brand: [],
      value: '',
      searchbtn: {//搜索传参
        cityIdList: [],
        brandvalue: '',
        likeName: ''
      }
    }
  },
  methods: {
    exportContractFn () {
        let _this = this;
        var eInput = document.getElementById("ssk");
        var cityId = _this.searchbtn.cityIdList[0];
        var quyuAId = _this.searchbtn.cityIdList[1];
        var quyuBId = _this.searchbtn.cityIdList[2];
        var likeName = eInput.value;
        var gcid = _this.searchbtn.brandvalue;
        var dc = {
              cityId:cityId,
              quyuAId:quyuAId,
              quyuBId:quyuBId,
              likeName:likeName,
              gcid:gcid,
              isShared: ""
          }
        var jzdc = {
              hiCityId:cityId,
              hiAreaId:quyuAId,
              hiBusinessCircleId:quyuBId,
              likeName:likeName,
              gcid:gcid
          }
        if(_this.bj == 1){
          if(_this.bjs == 1){
            dc.isShared = "0";
            let data = JSON.stringify(dc);
            window.location.href = _this.$store.state.api.house.export_excel + '?data=' + data;
          }
          if(_this.bjs == 2){
            dc.isShared = "0";
            dc.status = "20";
            let data = JSON.stringify(dc);
            console.info('data', data);
            window.location.href = _this.$store.state.api.house.export_excel + '?data=' + data;
          }
          if(_this.bjs == 3){
            dc.isShared = "0";
            dc.status = "40";
            let data = JSON.stringify(dc);
            console.info('data', data);
            window.location.href = _this.$store.state.api.house.export_excel + '?data=' + data;
          }
        }
        if(_this.bj == 2){
          if(_this.bjs == 1){
            dc.isShared = "1";
            let data = JSON.stringify(dc);
            console.info('data', data);
            window.location.href = _this.$store.state.api.house.export_excel + '?data=' + data;
          }
          if(_this.bjs == 2){
            dc.isShared = "1";
            dc.status = "20";
            let data = JSON.stringify(dc);
            console.info('data', data);
            window.location.href = _this.$store.state.api.house.export_excel + '?data=' + data;
          }
          if(_this.bjs == 3){
            dc.isShared = "1";
            dc.status = "40";
            let data = JSON.stringify(dc);
            console.info('data', data);
            window.location.href = _this.$store.state.api.house.export_excel + '?data=' + data;
          }
        }
        if(_this.bj == 3){
          if(_this.bjs == 1){
            let data = JSON.stringify(jzdc);
            console.info('data', data);
            window.location.href = _this.$store.state.api.house.export_jz_excel + '?data=' + data;
          }
          if(_this.bjs == 2){
            dc.status = "20";
            let data = JSON.stringify(jzdc);
            console.info('data', data);
            window.location.href = _this.$store.state.api.house.export_jz_excel + '?data=' + data;
          }
          if(_this.bjs == 3){
            dc.status = "40";
            let data = JSON.stringify(jzdc);
            console.info('data', data);
            window.location.href = _this.$store.state.api.house.export_jz_excel + '?data=' + data;
          }
        }
        
    },
    alt(id) {
      //查看详情按钮
      const _this = this;
      _this.ck = true;
      if((_this.bj == 1) || (_this.bj == 2)){
        _this.loading = true;
        _this.bj1 = true;
        _this.bj2 = false;
        _this.gridData = [
          {
            title: '',
            information:[
              {
                tit: '房源信息',
                tit11: '房源编号 : ',
                tit12: '户　　型 : ',
                tit13: '楼　　层 : ',
                tit14: '朝向面积 : ',
                tit15: '出租价格 : ',
                tit16: '房屋特色 : ',
                tit17: '截止日期 : ',
                tit18: '房源负责人 : ',
                tit19: '出租状态 : ',
                tit20: '空置情况 : ',
                houseNum: '',
                houseModel: '',
                houseLayer: '',
                orientationArea: '',
                rentPrice: '',
                houseCharacteristics: '',
                closingDate: '',
                housePerson: '',
                tit2: '房源状态',
                leasedState: '',
                tit3: '租约信息',
                vacancyCondition: '',
                tit4: '房源备注',
                remarks: ''
              }
            ]
          }
        ]
        console.log("整租 合租");
        _this.axios({
        method:'post',
          url: _this.$store.state.api.house.get_house_details,
          headers:{
            userid: _this.userInit.id,
            token: _this.userInit.token
          },
          data: {
            id:id
          }
        }).then(function(response) {
          _this.loading = false;
          const { data } = response;
          if (data.status.code == 200) {
            console.log(data);
            _this.gridData[0].title = data.result.quyuCName+data.result.louNo+'栋'+data.result.men+'单元'+data.result.fangNo;
            _this.gridData[0].information[0].houseNum = 'No.'+data.result.taizhang;
            _this.gridData[0].information[0].houseModel = data.result.shi+'室'+data.result.ting+'厅'+data.result.wei+'卫'+data.result.chu+'厨';
            _this.gridData[0].information[0].houseLayer = '第'+data.result.loucengA+'层/'+'共'+data.result.loucengB+'层';
            _this.gridData[0].information[0].orientationArea = data.result.chaoXiang+'/'+data.result.mianji+'m²';
            _this.gridData[0].information[0].rentPrice = data.result.dijia+'元/月(最低'+data.result.zujinMin+'元/月)';
            _this.gridData[0].information[0].houseCharacteristics = data.result.tese;
            _this.gridData[0].information[0].closingDate = data.result.jzDate;
            _this.gridData[0].information[0].housePerson = data.result.fzrName+'/'+data.result.fzrPhone;
            if (data.result.status = "10") {
              _this.gridData[0].information[0].leasedState = "待配置";
            };
            if (data.result.status = "11") {
              _this.gridData[0].information[0].leasedState = "配置中";
            };
            if (data.result.status = "20") {
              _this.gridData[0].information[0].leasedState = "空置";
            };
            if (data.result.status = "30") {
              _this.gridData[0].information[0].leasedState = "预定";
            };
            if (data.result.status = "40") {
              _this.gridData[0].information[0].leasedState = "已租";
            };
            if (data.result.status = "50") {
              _this.gridData[0].information[0].leasedState = "正常退";
            };

            if (data.result.status = "51") {
              _this.gridData[0].information[0].leasedState = "非正常退";
            };
            if (data.result.status = "60") {
              _this.gridData[0].information[0].leasedState = "无效";
            };
            _this.gridData[0].information[0].vacancyCondition = data.result.freeDate;
            _this.gridData[0].information[0].remarks = data.result.desc;
          }
        });
      }else if(_this.bj == 3){
        _this.loading = true;
        console.log("集中");
        _this.bj1 = false;
        _this.bj2 = true;
        _this.gridData = [
          {
            title: '',
            information:[
              {
                tit: '项目信息',
                tit11: '项目编号 : ',
                tit12: '项目名称 : ',
                tit13: '房间总数 : ',
                tit14: '品　　牌 : ',
                tit15: '可租日期 : ',
                tit16: '项目房型 : ',
                tit17: '项目地址 : ',
                tit18: '项目负责人 : ',
                houseNum: '',
                houseModel: '',
                houseLayer: '',
                orientationArea: '',
                rentPrice: '',
                houseCharacteristics: '',
                closingDate: '',
                housePerson: '',
                tit2: '楼盘信息',
                xmlist: [],
                tit3: '',
                vacancyCondition: '',
                tit4: '项目介绍',
                remarks: ''
              }
            ]
          }
        ]
        _this.axios({
        method:'post',
          url: _this.$store.state.api.house.get_housejz_details,
          headers:{
            userid: _this.userInit.id,
            token: _this.userInit.token
          },
          data: {
            id:id
          }
        }).then(function(response) {
          _this.loading = false;
          const { data } = response;
          if (data.status.code == 200) {
            console.log(data);
            _this.gridData[0].title = data.result.hiItemName;
            _this.gridData[0].information[0].houseNum = 'No.'+data.result.HouseItemNum;
            _this.gridData[0].information[0].houseModel = data.result.hiItemName;
            _this.gridData[0].information[0].houseLayer = data.result.hiRoomCount;
            _this.gridData[0].information[0].orientationArea = data.result.brand;
            _this.gridData[0].information[0].rentPrice = data.result.kezuTime;
            _this.gridData[0].information[0].houseCharacteristics = data.result.roomTypeName;
            _this.gridData[0].information[0].closingDate = data.result.hiDetailedAddress;
            _this.gridData[0].information[0].housePerson = data.result.fzrName+'/'+data.result.fzrPhone;
            _this.gridData[0].information[0].xmlist = data.result.louDongList;
            _this.gridData[0].information[0].remarks = data.result.hiItemDesc;
          }
        });
      }
    },
    tagClick(index) {
      const _this = this;
      _this.tag[index].color = "#ee234e";
      if(index == 0){
        _this.loading = true;
        //整租按钮
        _this.jz = false;
        _this.bj = "1";
        _this.bj3 = true;
        _this.table.thead = [
          {
            prop: "fangNo",
            label: "房号"
          }
        ]
        _this.tag[1].color = "";
        _this.tag[2].color = "";
        _this.search.isShared = "0";
        _this.axios({
        method:'post',
          url: _this.$store.state.api.house.get_home_list,
          headers:{
            userid: _this.userInit.id,
            token: _this.userInit.token
          },
          data: _this.search
        }).then(function(response) {
          _this.loading = false;
          const { data } = response;
          if (data.status.code == 200) {
            _this.table.tbody = data.result.houseList;
            _this.table.pageNo = data.result.pageNo;
            _this.table.totalRecord = data.result.totalRecord;
            _this.table.pageSize = data.result.pageSize;
            _this.tag2[0].number = data.result.allCount;
            _this.tag2[1].number = data.result.yesCount;
            _this.tag2[2].number = data.result.noCount;
          }
        });
      }
      if(index == 1){
        //合租按钮
        _this.loading = true;
        _this.jz = false;
        _this.bj = "2";
        _this.bj3 = true;
        _this.table.thead = [
          {
            prop: "fangNo",
            label: "房号"
          }
        ]
        _this.tag[0].color = "";
        _this.tag[2].color = "";
        _this.search.isShared = "1";
        _this.axios({
        method:'post',
          url: _this.$store.state.api.house.get_home_list,
          headers:{
            userid: _this.userInit.id,
            token: _this.userInit.token
          },
          data: _this.search
        }).then(function(response) {
          _this.loading = false;
          const { data } = response;
          if (data.status.code == 200) {
            _this.table.tbody = data.result.houseList;
            _this.table.pageNo = data.result.pageNo;
            _this.table.totalRecord = data.result.totalRecord;
            _this.table.pageSize = data.result.pageSize;
            _this.tag2[0].number = data.result.allCount;
            _this.tag2[1].number = data.result.yesCount;
            _this.tag2[2].number = data.result.noCount;
          }
        });
      }
      if(index == 2){
        _this.loading = true;
        _this.search.isShared = "";
        //集中按钮
        _this.jz = true;
        _this.bj = "3";
        _this.bj3 = false;
        _this.table.thead = [
          {
            prop: "hiItemName",
            label: "楼盘"
          },
          {
            prop: "hiRoomCount",
            label: "房间数量(间)"
          }
        ]
        _this.tag[0].color = "";
        _this.tag[1].color = "";
        _this.axios({
        method:'post',
          url: _this.$store.state.api.house.get_homejz_list,
          headers:{
            userid: _this.userInit.id,
            token: _this.userInit.token
          },
          data: _this.search
        }).then(function(response) {
          _this.loading = false;
          const { data } = response;
          if (data.status.code == 200) {
            console.log(data.result);
            _this.table.tbody = data.result.houseList;
            _this.table.pageNo = data.result.pageNo;
            _this.table.totalRecord = data.result.totalRecord;
            _this.table.pageSize = data.result.pageSize;
            _this.tag2[0].number = data.result.allCount;
            _this.tag2[1].number = data.result.yesCount;
            _this.tag2[2].number = data.result.noCount;
          }
        });
      }
    },
    tagClick2(index) {
      let _this = this;
      _this.tag2[index].color = "#ee234e";
      if(index == 0){
        //全部按钮
        _this.loading = true;
        _this.bjs = "1";
        _this.tag2[1].color = "";
        _this.tag2[2].color = "";
        _this.search.status = "";
        if(_this.bj == 1){
          _this.search.isShared = "0";
          _this.axios({
          method:'post',
            url: _this.$store.state.api.house.get_home_list,
            headers:{
              userid: _this.userInit.id,
              token: _this.userInit.token
            },
            data: _this.search
          }).then(function(response) {
            _this.loading = false;
            const { data } = response;
            if (data.status.code == 200) {
              console.log("整租  全部");
              _this.table.tbody = data.result.houseList;
              _this.table.pageNo = data.result.pageNo;
              _this.table.totalRecord = data.result.totalRecord;
              _this.table.pageSize = data.result.pageSize;
              _this.tag2[0].number = data.result.allCount;
              _this.tag2[1].number = data.result.yesCount;
              _this.tag2[2].number = data.result.noCount;
            }
          });
        }
        if(_this.bj == 2){
          _this.search.isShared = "1";
          _this.loading = true;
          _this.axios({
          method:'post',
            url: _this.$store.state.api.house.get_home_list,
            headers:{
              userid: _this.userInit.id,
              token: _this.userInit.token
            },
            data: _this.search
          }).then(function(response) {
            _this.loading = false;
            const { data } = response;
            if (data.status.code == 200) {
              console.log("合租  全部");
              _this.table.tbody = data.result.houseList;
              _this.table.pageNo = data.result.pageNo;
              _this.table.totalRecord = data.result.totalRecord;
              _this.table.pageSize = data.result.pageSize;
              _this.tag2[0].number = data.result.allCount;
              _this.tag2[1].number = data.result.yesCount;
              _this.tag2[2].number = data.result.noCount;
            }
          });
        }
        if(_this.bj == 3){
          _this.loading = true;
          _this.search.isShared = "";
          _this.table.thead = [
            {
              prop: "hiItemName",
              label: "楼盘"
            },
            {
              prop: "hiRoomCount",
              label: "房间数量(间)"
            }
          ]
          _this.axios({
          method:'post',
            url: _this.$store.state.api.house.get_homejz_list,
            headers:{
              userid: _this.userInit.id,
              token: _this.userInit.token
            },
            data: _this.search
          }).then(function(response) {
            _this.loading = false;
            const { data } = response;
            if (data.status.code == 200) {
              console.log("集中  全部");
              _this.table.tbody = data.result.houseList;
              _this.table.pageNo = data.result.pageNo;
              _this.table.totalRecord = data.result.totalRecord;
              _this.table.pageSize = data.result.pageSize;
              _this.tag2[0].number = data.result.allCount;
              _this.tag2[1].number = data.result.yesCount;
              _this.tag2[2].number = data.result.noCount;
            }
          });
        }
      }
      if(index == 1){
        _this.loading = true;
        //可租按钮
        _this.bjs = "2";
        _this.search.status = "20";
        _this.tag2[0].color = "";
        _this.tag2[2].color = "";
        if(_this.bj == 1){
          //在整租按钮里面的  可租按钮
            _this.axios({
            method:'post',
            url: _this.$store.state.api.house.get_home_list,
            headers:{
              userid: _this.userInit.id,
              token: _this.userInit.token
            },
            data: _this.search
          }).then(function(response) {
            _this.loading = false;
            const { data } = response;
            if (data.status.code == 200) {
              console.log("整租 可租");
              _this.table.tbody = data.result.houseList;
              _this.table.pageNo = data.result.pageNo;
              _this.table.totalRecord = data.result.totalRecord;
              _this.table.pageSize = data.result.pageSize;
            }
          });
        }
        if(_this.bj == 2){
          //在合租按钮里面的  可租按钮
            _this.loading = true;
            _this.axios({
            method:'post',
            url: _this.$store.state.api.house.get_home_list,
            headers:{
              userid: _this.userInit.id,
              token: _this.userInit.token
            },
            data: _this.search
          }).then(function(response) {
            _this.loading = false;
            const { data } = response;
            if (data.status.code == 200) {
              console.log("合租 可租");
              _this.table.tbody = data.result.houseList;
              _this.table.pageNo = data.result.pageNo;
              _this.table.totalRecord = data.result.totalRecord;
              _this.table.pageSize = data.result.pageSize;
            }
          });
        }
        if(_this.bj == 3){
          _this.loading = true;
          //在集中按钮里面的  可租按钮
          _this.table.thead = [
              {
                prop: "hiItemName",
                label: "楼盘"
              },
              {
                prop: "hiRoomCount",
                label: "房间数量(间)"
              }
            ]
            _this.axios({
            method:'post',
            url: _this.$store.state.api.house.get_homejz_list,
            headers:{
              userid: _this.userInit.id,
              token: _this.userInit.token
            },
            data: _this.search
          }).then(function(response) {
            _this.loading = false;
            const { data } = response;
            if (data.status.code == 200) {
              console.log("集中 可租");
              _this.table.tbody = data.result.houseList;
              _this.table.pageNo = data.result.pageNo;
              _this.table.totalRecord = data.result.totalRecord;
              _this.table.pageSize = data.result.pageSize;
            }
          });
        }
      }
      if(index == 2){
        _this.loading = true;
        //已租按钮
        _this.bjs = "3";
        _this.search.status = "40";
        _this.tag2[0].color = "";
        _this.tag2[1].color = "";
        if(_this.bj == 1){
          //在整租按钮里面的  已租按钮
            _this.axios({
            method:'post',
            url: _this.$store.state.api.house.get_home_list,
            headers:{
              userid: _this.userInit.id,
              token: _this.userInit.token
            },
            data: _this.search
          }).then(function(response) {
            _this.loading = false;
            const { data } = response;
            if (data.status.code == 200) {
              console.log("整租 已租")
              _this.table.tbody = data.result.houseList;
              _this.table.pageNo = data.result.pageNo;
              _this.table.totalRecord = data.result.totalRecord;
              _this.table.pageSize = data.result.pageSize;
            }
          });
        }
        if(_this.bj == 2){
            _this.loading = true;
          //在合租按钮里面的  已租按钮
            _this.axios({
            method:'post',
            url: _this.$store.state.api.house.get_home_list,
            headers:{
              userid: _this.userInit.id,
              token: _this.userInit.token
            },
            data: _this.search
          }).then(function(response) {
            _this.loading = false;
            const { data } = response;
            if (data.status.code == 200) {
              console.log("合租 已租",data);
              _this.table.tbody = data.result.houseList;
              _this.table.pageNo = data.result.pageNo;
              _this.table.totalRecord = data.result.totalRecord;
              _this.table.pageSize = data.result.pageSize;
            }
          });
        }
        if(_this.bj == 3){
          //在集中按钮里面的  可租按钮
          _this.table.thead = [
              {
                prop: "hiItemName",
                label: "楼盘"
              },
              {
                prop: "hiRoomCount",
                label: "房间数量(间)"
              }
            ]
            _this.axios({
            method:'post',
            url: _this.$store.state.api.house.get_homejz_list,
            headers:{
              userid: _this.userInit.id,
              token: _this.userInit.token
            },
            data: _this.search
          }).then(function(response) {
            _this.loading = false;
            const { data } = response;
            if (data.status.code == 200) {
              console.log("集中 已租");
              _this.table.tbody = data.result.houseList;
              _this.table.pageNo = data.result.pageNo;
              _this.table.totalRecord = data.result.totalRecord;
              _this.table.pageSize = data.result.pageSize;
            }
          });
        }
      }
    },
    houseCount() {
      let _this = this;
      _this.loading = true;
      _this.axios({
        method:'post',
        url: _this.$store.state.api.house.get_home_count,
        headers:{
          userid: _this.userInit.id,
          token: _this.userInit.token
        }
      }).then(function(response) {
        _this.loading = false;
        const { data } = response;
        if (data.status.code == 200) {
          console.log(data);
          _this.tag[0].number = data.result.zhengzuCount;
          _this.tag[1].number = data.result.hezuCount;
          _this.tag[2].number = data.result.jizhongCount;
        }
      });
    },
    queryDataFn() {
      const _this = this;
      _this.loading = true;
      _this.axios({
        method:'post',
        url: _this.$store.state.api.house.get_home_list,
        headers:{
          userid: _this.userInit.id,
          token: _this.userInit.token
        },
        data: _this.search
      }).then(function(response) {
        _this.loading = false;
        const { data } = response;
        if (data.status.code == 200) {
          _this.table.tbody = data.result.houseList;
          _this.table.pageNo = data.result.pageNo;
          _this.table.totalRecord = data.result.totalRecord;
          _this.table.pageSize = data.result.pageSize;
        }
      });
    },
    queryCityList () {
        // 查询城市集合
        let _this = this;
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.house.get_citySelect_list, // 查公寓url
          headers:{
            userid: _this.userInit.id,
            token: _this.userInit.token
          },
          data: ''
        }).then(res => {
          const { data } = res;
          if (data.status.code === '200') {
            var clist = data.result.cityList;
            console.log(clist);
            if (!data.result) {
              return;
            }
            _this.cityList = clist;
          }
        });
      },
    jzCount() {
      let _this = this;
      if(_this.jz){
        _this.table.thead = [
          {
            prop: "hiItemName",
            label: "楼盘"
          },
          {
            prop: "hiRoomCount",
            label: "房间数量(间)"
          }
        ]
        _this.axios({
        method:'post',
          url: _this.$store.state.api.house.get_homejz_list,
          headers:{
            userid: _this.userInit.id,
            token: _this.userInit.token
          },
          data: _this.search
        }).then(function(response) {
          _this.loading = false;
          const { data } = response;
          if (data.status.code == 200) {
            console.log(data.result);
            _this.table.tbody = data.result.houseList;
            _this.table.pageNo = data.result.pageNo;
            _this.table.totalRecord = data.result.totalRecord;
            _this.table.pageSize = data.result.pageSize;
          }
        });
      }
    },
    brandList() {
      let _this = this;
      _this.axios({
        method:'post',
          url: _this.$store.state.api.house.get_companyList_list,
          headers:{
            userid: _this.userInit.id,
            token: _this.userInit.token
          },
        }).then(function(response) {
          _this.loading = false;
          const { data } = response;
          if (data.status.code == 200) {
            _this.brand = data.result.list;
          }
        });
    },
    handleSizeChange(val) {
      let _this = this;
      _this.search.pageSize = val;
      if(!_this.jz){
        _this.queryDataFn();
      }else if(_this.jz){
        _this.jzCount();
      }
    },
    handleCurrentChange(val) {
      let _this = this;
      if (_this.search.pageNo !== 0) {
        _this.search.pageNo = val;
        if(!_this.jz){
          _this.queryDataFn();
        }else if(_this.jz){
          _this.jzCount();
        }
      }
    },
    searchBtn() {
      //搜索按钮
      const _this = this;
      _this.loading = true;
      var eInput = document.getElementById("ssk");
      var cityId = _this.searchbtn.cityIdList[0];
      var quyuAId = _this.searchbtn.cityIdList[1];
      var quyuBId = _this.searchbtn.cityIdList[2];
      var likeName = eInput.value;
      var gcid = _this.searchbtn.brandvalue;
      if(_this.bj == 1){
          if(_this.bjs == 1){
            _this.loading = true;
            console.log("这是整租的全部按钮的搜索按钮");
            var ss = {
              cityId:cityId,
              quyuAId:quyuAId,
              quyuBId:quyuBId,
              likeName:likeName,
              gcid:gcid,
              pageNo: 1,
              pageSize: 10,
              isShared: "0"
            }
          _this.axios({
            method:'post',
              url: _this.$store.state.api.house.get_home_list,
              headers:{
                userid: _this.userInit.id,
                token: _this.userInit.token
              },
              data: ss
            }).then(function(response) {
              _this.loading = false;
              const { data } = response;
              if (data.status.code == 200) {
                _this.table.tbody = data.result.houseList;
                _this.table.pageNo = data.result.pageNo;
                _this.table.totalRecord = data.result.totalRecord;
                _this.table.pageSize = data.result.pageSize;
              }
            });
          }
          if(_this.bjs == 2){
            _this.loading = true;
            console.log("这是整租的可租按钮的搜索按钮");
            var ss = {
              cityId:cityId,
              quyuAId:quyuAId,
              quyuBId:quyuBId,
              likeName:likeName,
              gcid:gcid,
              pageNo: 1,
              pageSize: 10,
              isShared: "0",
              status: "20"
            }
            _this.axios({
              method:'post',
                url: _this.$store.state.api.house.get_home_list,
                headers:{
                  userid: _this.userInit.id,
                  token: _this.userInit.token
                },
                data: ss
              }).then(function(response) {
                _this.loading = false;
                const { data } = response;
                if (data.status.code == 200) {
                  _this.table.tbody = data.result.houseList;
                  _this.table.pageNo = data.result.pageNo;
                  _this.table.totalRecord = data.result.totalRecord;
                  _this.table.pageSize = data.result.pageSize;
                }
              });
          }
          if(_this.bjs == 3){
            _this.loading = true;
            console.log("这是整租的已租按钮的搜索按钮");
            var ss = {
              cityId:cityId,
              quyuAId:quyuAId,
              quyuBId:quyuBId,
              likeName:likeName,
              gcid:gcid,
              pageNo: 1,
              pageSize: 10,
              isShared: "0",
              status: "40"
            }
          _this.axios({
            method:'post',
              url: _this.$store.state.api.house.get_home_list,
              headers:{
                userid: _this.userInit.id,
                token: _this.userInit.token
              },
              data: ss
            }).then(function(response) {
              _this.loading = false;
              const { data } = response;
              if (data.status.code == 200) {
                _this.table.tbody = data.result.houseList;
                _this.table.pageNo = data.result.pageNo;
                _this.table.totalRecord = data.result.totalRecord;
                _this.table.pageSize = data.result.pageSize;
              }
            });
          }
      }
      if(_this.bj == 2){
        if(_this.bjs == 1){
            _this.loading = true;
            console.log("这是合租的全部按钮的搜索按钮");
            var ss = {
              cityId:cityId,
              quyuAId:quyuAId,
              quyuBId:quyuBId,
              likeName:likeName,
              gcid:gcid,
              pageNo: 1,
              pageSize: 10,
              isShared: "1"
            }
          _this.axios({
            method:'post',
              url: _this.$store.state.api.house.get_home_list,
              headers:{
                userid: _this.userInit.id,
                token: _this.userInit.token
              },
              data: ss
            }).then(function(response) {
              _this.loading = false;
              const { data } = response;
              if (data.status.code == 200) {
                _this.table.tbody = data.result.houseList;
                _this.table.pageNo = data.result.pageNo;
                _this.table.totalRecord = data.result.totalRecord;
                _this.table.pageSize = data.result.pageSize;
              }
            });
          }
          if(_this.bjs == 2){
            _this.loading = true;
            console.log("这是合租的可租按钮的搜索按钮");
            var ss = {
              cityId:cityId,
              quyuAId:quyuAId,
              quyuBId:quyuBId,
              likeName:likeName,
              gcid:gcid,
              pageNo: 1,
              pageSize: 10,
              isShared: "1",
              status: "20"
            }
            _this.axios({
              method:'post',
                url: _this.$store.state.api.house.get_home_list,
                headers:{
                  userid: _this.userInit.id,
                  token: _this.userInit.token
                },
                data: ss
              }).then(function(response) {
                _this.loading = false;
                const { data } = response;
                if (data.status.code == 200) {
                  _this.table.tbody = data.result.houseList;
                  _this.table.pageNo = data.result.pageNo;
                  _this.table.totalRecord = data.result.totalRecord;
                  _this.table.pageSize = data.result.pageSize;
                }
              });
          }
          if(_this.bjs == 3){
            _this.loading = true;
            console.log("这是合租的已租按钮的搜索按钮");
            var ss = {
              cityId:cityId,
              quyuAId:quyuAId,
              quyuBId:quyuBId,
              likeName:likeName,
              gcid:gcid,
              pageNo: 1,
              pageSize: 10,
              isShared: "",
              status: "40"
            }
          _this.axios({
            method:'post',
              url: _this.$store.state.api.house.get_home_list,
              headers:{
                userid: _this.userInit.id,
                token: _this.userInit.token
              },
              data: ss
            }).then(function(response) {
              _this.loading = false;
              const { data } = response;
              if (data.status.code == 200) {
                _this.table.tbody = data.result.houseList;
                _this.table.pageNo = data.result.pageNo;
                _this.table.totalRecord = data.result.totalRecord;
                _this.table.pageSize = data.result.pageSize;
              }
            });
          }
      }
      if(_this.bj == 3){
        if(_this.bjs == 1){
          _this.loading = true;
          console.log("这是集中的全部按钮的搜索按钮");
            var ss = {
              hiCityId:cityId,
              hiAreaId:quyuAId,
              hiBusinessCircleId:quyuBId,
              likeName:likeName,
              gcid:gcid,
              pageNo: 1,
              pageSize: 10
            }
          _this.axios({
            method:'post',
              url: _this.$store.state.api.house.get_homejz_list,
              headers:{
                userid: _this.userInit.id,
                token: _this.userInit.token
              },
              data: ss
            }).then(function(response) {
              _this.loading = false;
              const { data } = response;
              if (data.status.code == 200) {
                _this.table.tbody = data.result.houseList;
                _this.table.pageNo = data.result.pageNo;
                _this.table.totalRecord = data.result.totalRecord;
                _this.table.pageSize = data.result.pageSize;
              }
            });
        }
        if(_this.bjs == 2){
          _this.loading = true;
          console.log("这是集中的可租按钮的搜索按钮");
            var ss = {
              hiCityId:cityId,
              hiAreaId:quyuAId,
              hiBusinessCircleId:quyuBId,
              likeName:likeName,
              gcid:gcid,
              pageNo: 1,
              pageSize: 10,
              status: "20"
            }
          _this.axios({
            method:'post',
              url: _this.$store.state.api.house.get_homejz_list,
              headers:{
                userid: _this.userInit.id,
                token: _this.userInit.token
              },
              data: ss
            }).then(function(response) {
              _this.loading = false;
              const { data } = response;
              if (data.status.code == 200) {
                _this.table.tbody = data.result.houseList;
                _this.table.pageNo = data.result.pageNo;
                _this.table.totalRecord = data.result.totalRecord;
                _this.table.pageSize = data.result.pageSize;
              }
            });
        }
        if(_this.bjs == 3){
          _this.loading = true;
          console.log("这是集中的已租按钮的搜索按钮");
            var ss = {
              hiCityId:cityId,
              hiAreaId:quyuAId,
              hiBusinessCircleId:quyuBId,
              likeName:likeName,
              gcid:gcid,
              pageNo: 1,
              pageSize: 10,
              status: "40"
            }
          _this.axios({
            method:'post',
              url: _this.$store.state.api.house.get_homejz_list,
              headers:{
                userid: _this.userInit.id,
                token: _this.userInit.token
              },
              data: ss
            }).then(function(response) {
              _this.loading = false;
              const { data } = response;
              if (data.status.code == 200) {
                _this.table.tbody = data.result.houseList;
                _this.table.pageNo = data.result.pageNo;
                _this.table.totalRecord = data.result.totalRecord;
                _this.table.pageSize = data.result.pageSize;
              }
            });
          
        }
      }
    }
  },
  created() { 
    const self = this;
    const userInfo = tool.session.get("userInfo");
    self.userInit = userInfo;
    self.queryDataFn();
    self.brandList();
    self.queryCityList();
    self.houseCount();
    self.tagClick(0);
    self.tagClick2(0);
  }
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
  width: auto;
  float: left;
  margin-left: -4px;
}
.tagleft .tag{
  border: none;
  margin-right: 25px;
  span{
    font-size: 14px;
    color: #9f9f9f;
    display: block;
    float: left;
    cursor: pointer;
  }
}
.tagright{
  width: auto;
  float: left;
}
.tagright .tag{
  border: none;
  margin-left: 25px;
  span{
    font-size: 12px;
    color: #9f9f9f;
    display: block;
    float: left;
    cursor: pointer;
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
/deep/ .el-table--striped .el-table__body tr.el-table__row--striped:hover td {
  background: #ecf5ff;
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
  border: solid 1px #e5e5e5;
  margin-top: 20px;
  line-height: 50px;
  overflow: hidden;
  background: #f9f9f9 !important;
  position: fixed;
  z-index: 1999;
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
.liColor /deep/ .el-pager .number:hover{
  color: red !important;
}
.liColor /deep/ .el-pager li.active:hover{
  color: #fff !important;
}
.tck {
  z-index: 999999 !important;
}
.tck .Ztitle{
  width: 388px;
  height: 43px;
  background: #f7f9fc;
  font-size: 16px;
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 13px;
  line-height: 44px;
  border-bottom: solid 1px #dfe4e6;
  -webkit-box-shadow: 0 -5px 20px #999999;
  -moz-box-shadow: 0 -5px 20px #999999;
  box-shadow: 0 -5px 20px #999999;
}
.tck .Ztit{
  position: absolute;
  width: 100%;
  top: 44px;
  left: 0;
  background: #fff;
  -webkit-box-shadow: 0 5px 20px #999999;
  -moz-box-shadow: 0 5px 20px #999999;
  box-shadow: 0 5px 20px #999999;
}
.tck .tit{
  width: 100%;
  padding: 10px 14px;
  border-bottom: dashed 1px #dfe4e6; 
}
.tck .tit span{
  display: block;
  font-size: 14px;
  color: #2e3445;
  line-height: 24px;
}
.tck .tit i{
  font-style: normal;
  font-size: 12px;
  color: #a0a0a0;
  display: block;
  line-height: 24px;
}
.tck .tit i b{
  font-weight: normal;
  color: #2e3445;
}
</style>