<template>
	<el-container v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.3)">

    <!-- 头部 - 二级路由 -->
    <el-header class="bg-white">
      <cms-header :tabs="tabs" ></cms-header>
    </el-header>

		<!-- 主体 - 内容 -->
		<el-main class="bg-grey">
      <el-row :gutter="20">

        <el-col :span="6">

          <el-card class="box-card bg-bule">
            <div class="box-card-title">昨日订单总数</div>
            <div class="box-card-number">{{ homelist.Dcount }}</div>
            <div class="box-card-icon icon-order"></div>
          </el-card>

        </el-col>
        <el-col :span="6">

          <el-card class="box-card bg-bule">
            <div class="box-card-title">昨日销售总额</div>
            <div class="box-card-number">¥{{ homelist.YDcount }}</div>
            <div class="box-card-icon icon-sale"></div>
          </el-card>

        </el-col>
        <el-col :span="6">

          <el-card class="box-card bg-orange">
            <div class="box-card-title">昨日新增用户</div>
            <div class="box-card-number">{{ homelist.XZuser }}</div>
            <div class="box-card-icon icon-user-tatol"></div>
          </el-card>

        </el-col>
        <el-col :span="6">

          <el-card class="box-card bg-orange">
            <div class="box-card-title">用户总数</div>
            <div class="box-card-number">{{ homelist.Zuser }}</div>
            <div class="box-card-icon icon-user-add"></div>
          </el-card>

        </el-col>

      </el-row>
      <el-row :gutter="20">

        <el-col :span="6">

          <el-card class="box-card bg-red">
            <div class="box-card-title">昨日新增房源</div>
            <div class="box-card-number">{{ homelist.count }}</div>
            <div class="box-card-icon icon-house-add"></div>
          </el-card>

        </el-col>
        <el-col :span="6">

          <el-card class="box-card bg-red">
            <div class="box-card-title">房间数总数</div>
            <div class="box-card-number">{{ homelist.Zcount }}</div>
            <div class="box-card-icon icon-house-total"></div>
          </el-card>

        </el-col>
        <el-col :span="6">

          <el-card class="box-card bg-green">
            <div class="box-card-title">已上架房源总数</div>
            <div class="box-card-number">0</div>
            <div class="box-card-icon icon-up-house-total"></div>
          </el-card>

        </el-col>
        <el-col :span="6">

          <el-card class="box-card bg-green">
            <div class="box-card-title">已下架房源总数</div>
            <div class="box-card-number">0</div>
            <div class="box-card-icon icon-bottom-house-total"></div>
          </el-card>

        </el-col>

      </el-row>
      <el-row :gutter="20">

        <el-col :span="12">

          <el-card class="box-card bg-white">
            <h1 class="box-card-h1">待处理事务</h1>
            <el-row>
              <el-col :span="12">
                <div @click="portCHouse" class="box-card-affair">
                  <img src="static/image/home-affair-01.png" class="box-card-affair-img kjrk" />
                  <div class="box-card-affair-msgc">
                    <span class="affair-number">0</span>
                    <span class="affair-state">待审核房源</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="box-card-affair" @click="houseAdmindsh" >
                  <img src="static/image/home-affair-02.png" class="box-card-affair-img kjrk" />
                  <div class="box-card-affair-msgc">
                    <span class="affair-number">{{ homelist.houseH }}</span>
                    <span class="affair-state">待审核房行</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>

        </el-col>
        <el-col :span="12">

          <el-card class="box-card bg-white">
            <h1 class="box-card-h1">快捷入口</h1>
            <el-row>
              <el-col :span="6" class="box-card-entry">
                <img src="static/image/home-entry-01.png" class="box-card-entry-img kjrk" style="width:40px;" @click="contract"/>
                <span class="entry-state">订单管理</span>
              </el-col>
              <el-col :span="6" class="box-card-entry">
                <img src="static/image/home-entry-02.png" class="box-card-entry-img kjrk" @click="house" />
                <span class="entry-state">房源管理</span>
              </el-col>
              <el-col :span="6" class="box-card-entry">
                <img src="static/image/home-entry-03.png" class="box-card-entry-img kjrk" @click="houseAdmin" />
                <span class="entry-state">房行管理</span>
              </el-col>
              <el-col :span="6" class="box-card-entry">
                <img src="static/image/home-entry-04.png" class="box-card-entry-img kjrk" @click="user" />
                <span class="entry-state">用户管理</span>
              </el-col>
            </el-row>
          </el-card>

        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">

          <el-card class="box-card bg-white">
            <h1 class="box-card-h1">房源统计</h1>
            <div class="box-card-chart">
              <el-row :gutter="30">
                <el-col :span="4" class="bordeRight">
                  <div class="chart-left">
                    <div class="chart-left-title">本月新增房源总数</div>
                    <div class="chart-left-state">{{ fyshujuM.count }}</div>
                    <div>
                      <span class="chart-left-proportion up" :style="{ color: fyshujuM.type }">{{ fyshujuM.ratio }}</span>
                      <span class="chart-left-proportion-name">环比上月</span>
                    </div>
                  </div>
                  <div class="chart-left">
                    <div class="chart-left-title">本周新增房源总数</div>
                    <div class="chart-left-state">{{ fyshujuW.count }}</div>
                    <div>
                      <span class="chart-left-proportion down" :style="{ color: fyshujuW.type }">{{ fyshujuW.ratio }}</span>
                      <span class="chart-left-proportion-name">环比上周</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="chart-right">
                    <div class="overflow">
                      <div class="chart-right-title right-title">{{ title.week }}</div>
                      <div class="left-title">
                        <span class="timeSelect" :style="{ color: fyshujuColor.color,borderColor: fyshujuColor.border }" @click="changeWeek">最近7天</span>
                        <span class="timeSelect" :style="{ color: fyshuju2Color.color,borderColor: fyshuju2Color.border }" @click="changeMonth">最近30天</span>
                        <el-date-picker
                          @change="changeZdy"
                          v-model="fyvalue"
                          type="daterange"
                          value-format="yyyy-MM-dd"
                          range-separator="——"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                        </el-date-picker>
                      </div>
                    </div>
                    <div class="chart-container">
                      <div id="main" style="width:100%; height:280px;">
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>

        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">

          <el-card class="box-card bg-white">
            <h1 class="box-card-h1">用户统计</h1>
            <div class="box-card-chart">
              <el-row :gutter="30">
                <el-col :span="4" class="bordeRight">
                  <div class="chart-left">
                    <div class="chart-left-title">本月新增用户总数</div>
                    <div class="chart-left-state">{{ usershujuM.count }}</div>
                    <div>
                      <span class="chart-left-proportion up" :style="{ color: usershujuM.type }">{{ usershujuM.ratio }}</span>
                      <span class="chart-left-proportion-name">环比上月</span>
                    </div>
                  </div>
                  <div class="chart-left">
                    <div class="chart-left-title">本周新增用户总数</div>
                    <div class="chart-left-state">{{ usershujuW.count }}</div>
                    <div>
                      <span class="chart-left-proportion down" :style="{ color: usershujuW.type }">{{ usershujuW.ratio }}</span>
                      <span class="chart-left-proportion-name">环比上周</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="chart-right">
                    <div class="overflow">
                      <div class="chart-right-title right-title">{{ title2.week }}</div>
                      <div class="left-title">
                          <span class="timeSelect" :style="{ color: usershujuColor.color,borderColor: usershujuColor.border }" @click="userWeek">最近7天</span>
                          <span class="timeSelect" :style="{ color: usershuju2Color.color,borderColor: usershuju2Color.border }" @click="userMonth">最近30天</span>
                          <el-date-picker
                            @change="userZdy"
                            v-model="uservalue"
                            type="daterange"
                            range-separator="——"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                          </el-date-picker>
                        </div>
                      </div>
                    <div class="chart-container">
                      <div id="main1" style="width:100%; height:280px;">
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>

        </el-col>
      </el-row>
    </el-main>

	</el-container>
</template>

<script>
import cmsHeader from "@/components/public/CMSHeader";
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入曲线图组件
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  name: "home",
  data() {
    return {
      tabs: [{ name: "首页", path: "/home" }],
      loading: false,
      info: "home",
      homelist: {
        count: "0",
        Zcount: "0",
        Dcount: "0",
        houseH: "0",
        YDcount: "0",
        XZuser: "0",
        Zuser: "0"
      },
      fyshujuColor: {
        color: "",
        border: ""
      },
      fyshuju2Color: {
        color: "",
        border: ""
      },
      usershujuColor: {
        color: "",
        border: ""
      },
      usershuju2Color: {
        color: "",
        border: ""
      },
      fyshujuM: {
        count: "0",
        ratio: "0%",
        type: ""
      },
      fyshujuW: {
        count: "0",
        ratio: "0%",
        type: ""
      },
      usershujuM: {
        count: "0",
        ratio: "0%",
        type: ""
      },
      usershujuW: {
        count: "0",
        ratio: "0%",
        type: ""
      },
      title:{
        week:""
      },
      title2:{
        week:""
      },
      weekDx: "0",
      weekDx2: "0",
      option:{},
      echart: "",
      dateArray: [],//近七天的图标数据
      List: [],
      fyvalue:"",
      uservalue:""
    };
  },
  methods: {
      changeWeek() {
        //房源数据最近7天
        var self = this;
        self.loading = true;
        self.fyshujuColor.color = "#f11f4d";
        self.fyshujuColor.border= "#f11f4d";
        self.fyshuju2Color.color = "";
        self.fyshuju2Color.border= "";
        self.weekDx = "1";
        self.dateArray = [];
        self.title.week = "近一周房源统计";
        //设置日期，当前日期的前七天
        var myDate = new Date(); //获取今天日期
        myDate.setDate(myDate.getDate() - 7);
        var dateTemp;
        var flag = 1;
        var year = myDate.getFullYear();

        for (var i = 0; i < 7; i++) {

          var day = myDate.getDate();
          if(day < 10){
            day = "0" + day;
          }
          var month = myDate.getMonth()+1;
          if(month < 10){
            month = "0" + month;
          }
          dateTemp = (year+"-"+month+"-"+day);
          self.dateArray.push(dateTemp);
          myDate.setDate(myDate.getDate() + flag);
        }
        console.log(self.dateArray);
        var time = {
          beginTime: self.dateArray[0],
          endTime: self.dateArray[6]
        }
        self.dateQuery(time);
      },
      changeMonth() {
        var self = this;
        self.fyshujuColor.color = "";
        self.fyshujuColor.border= "";
        self.fyshuju2Color.color = "#f11f4d";
        self.fyshuju2Color.border= "#f11f4d";
        self.weekDx = "0";
        self.dateArray = [];
        self.title.week = "近一个月房源统计";
        //设置日期，当前日期的前30天
        var myDate = new Date(); //获取今天日期
        myDate.setDate(myDate.getDate() - 30);
        var dateTemp;
        var flag = 1;

        for (var i = 0; i < 30; i++) {

          var day = myDate.getDate();
          if(day < 10){
            day = "0" + day;
          }
          var month = myDate.getMonth()+1;
          if(month < 10){
            month = "0" + month;
          }
          var year = myDate.getFullYear();
          if(month > 12){
            year = year+1;
          }
          dateTemp = (year+"-"+month+"-"+day);
          self.dateArray.push(dateTemp);
          myDate.setDate(myDate.getDate() + flag);
        }
        var time = {
          beginTime: self.dateArray[0],
          endTime: self.dateArray[29]
        }
        self.dateQuery(time);
      },
      changeZdy() {
        var self = this;
        self.fyshujuColor.color = "";
        self.fyshujuColor.border= "";
        self.fyshuju2Color.color = "";
        self.fyshuju2Color.border= "";
        self.weekDx = "0";
        var time = {
          beginTime: self.fyvalue[0],
          endTime: self.fyvalue[1]
        }
        self.dateQuery(time);
      },
      userWeek() {
        //用户数据最近7天
        var self = this;
        self.loading = true;
        self.usershujuColor.color = "#f11f4d";
        self.usershujuColor.border= "#f11f4d";
        self.usershuju2Color.color = "";
        self.usershuju2Color.border= "";
        self.weekDx2 = "1";
        self.dateArray = [];
        self.title2.week = "近一周用户统计";
        //设置日期，当前日期的前七天
        var myDate = new Date(); //获取今天日期
        myDate.setDate(myDate.getDate() - 7);
        var dateTemp;
        var flag = 1;
        var year = myDate.getFullYear();

        for (var i = 0; i < 7; i++) {

          var day = myDate.getDate();
          if(day < 10){
            day = "0" + day;
          }
          var month = myDate.getMonth()+1;
          if(month < 10){
            month = "0" + month;
          }
          dateTemp = (year+"-"+month+"-"+day);
          self.dateArray.push(dateTemp);
          myDate.setDate(myDate.getDate() + flag);
        }
        var time = {
          guCtBegin: self.dateArray[0],
          guCtEnd: self.dateArray[6]
        }
        self.dateQueryUser(time);
      },
      userMonth() {
        var self = this;
        self.usershujuColor.color = "";
        self.usershujuColor.border= "";
        self.usershuju2Color.color = "#f11f4d";
        self.usershuju2Color.border= "#f11f4d";
        self.weekDx2 = "0";
        self.dateArray = [];
        self.title2.week = "近一个月用户统计";
        //设置日期，当前日期的前30天
        var myDate = new Date(); //获取今天日期
        myDate.setDate(myDate.getDate() - 30);
        var dateTemp;
        var flag = 1;

        for (var i = 0; i < 30; i++) {

          var day = myDate.getDate();
          if(day < 10){
            day = "0" + day;
          }
          var month = myDate.getMonth()+1;
          if(month < 10){
            month = "0" + month;
          }
          var year = myDate.getFullYear();
          if(month > 12){
            year = year+1;
          }
          dateTemp = (year+"-"+month+"-"+day);
          self.dateArray.push(dateTemp);
          myDate.setDate(myDate.getDate() + flag);
        }
        var time = {
          guCtBegin: self.dateArray[0],
          guCtEnd: self.dateArray[29]
        }
        self.dateQueryUser(time);
      },
      userZdy() {
        var self = this;
        self.usershujuColor.color = "";
        self.usershujuColor.border= "";
        self.usershuju2Color.color = "";
        self.usershuju2Color.border= "";
        self.weekDx2 = "0";
        var time = {
          guCtBegin: self.uservalue[0],
          guCtEnd: self.uservalue[1]
        }
        self.dateQueryUser(time);
      },
      dateQuery(data) {
        const self = this;
        self.axios
        .post(self.$store.state.api.home.get_count_by_time, data)
        .then(function(response) {
          const { data } = response;
          if (data.status.code == 200) {
            self.echart = 1;
            self.List = data.result.list;
            self.fytubiao();
            self.userWeek();
          }
        })
        .catch(function(error) {
          // self.$alert("请刷新页面！");
        });
      },
      dateQueryUser(data) {
        const self = this;
        self.axios
        .post(self.$store.state.api.home.get_range_count, data)
        .then(function(response) {
          self.loading = false;
          const { data } = response;
          self.List = data.result.list;
          self.usertubiao();
        })
        .catch(function(error) {
         // self.$alert("请刷新页面！");
        });
      },
      initListCoutn() {
        var self = this;
        self.axios
        .post(this.$store.state.api.home.get_yesterday_add_house, {
        })
        .then(function(response) {
          const { data } = response;
          if (data.status.code == 200) {
            //昨日新增房源
            self.homelist.count = data.result.count;
          }
        })
        .catch(function(error) {
          //self.$alert("请刷新页面！");
        });
        self.axios
        .post(this.$store.state.api.home.get_home_count, {
        })
        .then(function(response) {
          const { data } = response;
          if (data.status.code == 200) {
            //房间数总数
            self.homelist.Zcount = parseInt(data.result.hezuCount)+parseInt(data.result.jizhongCount)+parseInt(data.result.zhengzuCount);
          }
        })
        .catch(function(error) {
          //self.$alert("请刷新页面！");
        });
        self.axios
        .post(this.$store.state.api.home.getChengzuCountByDate, {
        })
        .then(function(response) {
          const { data } = response;
          if (data.status.code == 200) {
            self.homelist.Dcount = data.result.count;
          }
        })
        .catch(function(error) {
        //  self.$alert("请刷新页面！");
        });
        self.axios
        .post(this.$store.state.api.home.get_houseLineCount_list, {
        })
        .then(function(response) {
          const { data } = response;
          if (data.status.code == 200) {
            self.homelist.houseH = data.result.waitCount;
          }
        })
        .catch(function(error) {
         // self.$alert("请刷新页面！");
        });
        self.axios
        .post(this.$store.state.api.home.get_yesterday_balance, {
        })
        .then(function(response) {
          const { data } = response;
          if (data.status.code == 200) {
            self.homelist.YDcount = data.result.balanceObject.income;
          }
        })
        .catch(function(error) {
         // self.$alert("请刷新页面！");
        });
        self.axios
        .post(this.$store.state.api.home.get_yesterday_user_count, {
        })
        .then(function(response) {
          const { data } = response;
          if (data.status.code == 200) {
            self.homelist.XZuser = data.result.count;
          }
        })
        .catch(function(error) {
         // self.$alert("请刷新页面！");
        });
        self.axios
        .post(this.$store.state.api.home.get_user_count, {
        })
        .then(function(response) {
          const { data } = response;
          if (data.status.code == 200) {
            self.homelist.Zuser = data.result.count;
          }
        })
        .catch(function(error) {
          //self.$alert("请刷新页面！");
        });
        //本月房源同期比例
        self.axios
        .post(this.$store.state.api.home.get_ratio_month, {
          beginTime:"",
          endTime:""
        })
        .then(function(response) {
          const { data } = response;
          if (data.status.code == 200) {
            self.fyshujuM = data.result;
            if(data.result.type == 1){
              self.fyshujuM.type = "green";
            }
            if(data.result.type == 2){
              self.fyshujuM.type = "red";
            }
            if(data.result.type == 3){
              self.fyshujuM.type = "#999";
            }
          }
        })
        .catch(function(error) {
          //self.$alert("请刷新页面！");
        });
        //本周房源同期比例
        self.axios
        .post(this.$store.state.api.home.get_ratio_week, {
        })
        .then(function(response) {
          const { data } = response;
          if (data.status.code == 200) {
            self.fyshujuW = data.result;
            if(data.result.type == 1){
              self.fyshujuW.type = "green";
            }
            if(data.result.type == 2){
              self.fyshujuW.type = "red";
            }
            if(data.result.type == 3){
              self.fyshujuW.type = "#999";
            }
          }
        })
        .catch(function(error) {
         // self.$alert("请刷新页面！");
        });
        //本月用户同期比例
        self.axios
        .post(this.$store.state.api.home.get_ratiom_count, {
        })
        .then(function(response) {
          const { data } = response;
          if (data.status.code == 200) {
            self.usershujuM = data.result;
            if(data.result.type == 1){
              self.usershujuM.type = "green";
            }
            if(data.result.type == 2){
              self.usershujuM.type = "red";
            }
            if(data.result.type == 3){
              self.usershujuM.type = "#999";
            }
          }
        })
        .catch(function(error) {
        //  self.$alert("请刷新页面！");
        });
        //本周用户同期比例
        self.axios
        .post(this.$store.state.api.home.get_ratiow_count, {
        })
        .then(function(response) {
          const { data } = response;
          if (data.status.code == 200) {
            self.usershujuW = data.result;
            if(data.result.type == 1){
              self.usershujuW.type = "green";
            }
            if(data.result.type == 2){
              self.usershujuW.type = "red";
            }
            if(data.result.type == 3){
              self.usershujuW.type = "#999";
            }
          }
        })
        .catch(function(error) {
         // self.$alert("请刷新页面！");
        });
      },
      contract() {
        const self = this;
        if(self.loading == false){
          self.$router.push('/contract/contractList');
        }
      },
      house() {
        this.$router.push('/house/portBHouse');
      },
      houseAdmin() {
        this.$router.push('/houseAdmin/userManage');
      },
      user() {
        this.$router.push('/user/portBUser');
      },
      houseAdmindsh() {
        this.$router.push('/houseAdmin/houseAdminManage');
      },
      portCHouse() {
        this.$router.push('/house/portCHouse');
      },
      fytubiao() {
        var self = this;
        console.log(self.List,8888888)
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        //myChart.showLoading();
        var date = [];
        var data = [];

        self.List.forEach(item => {
          if(self.weekDx == 1){
            if(item.week == "1"){
              item.week = "周一"
            }
            if(item.week == "2"){
              item.week = "周二"
            }
            if(item.week == "3"){
              item.week = "周三"
            }
            if(item.week == "4"){
              item.week = "周四"
            }
            if(item.week == "5"){
              item.week = "周五"
            }
            if(item.week == "6"){
              item.week = "周六"
            }
            if(item.week == "7"){
              item.week = "周日"
            }
            date.push(item.week);
            data.push(item.count);
          }else{
            date.push(item.date);
            data.push(item.count);
          }
        })
        self.option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'left'
            },
            grid: {//x、y轴缩进
                    left: '0%',
                    right: '0%',
                    bottom: '2%',
                    containLabel: true
                },
            xAxis: {//x轴
                type: 'category',
                boundaryGap: false,//负值
                data: date ,//x轴数据
                //axisLabel:
            },
            yAxis: {//y轴
                type: 'value',
                boundaryGap: false,
                splitLine: {//背景分割线
                        show: true,
                    },
            },
            dataZoom: [
              {
                type: 'inside',
                start: 0,
                end: 10
              },
              {//按钮
                start: 0,
                end: 10,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#43b572',
                    shadowBlur: 0,//按钮阴影
                    shadowColor: 'rgba(248,248,248)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0
                }//handle是下面的小图表
              }
            ],
            series: [
                {
                    name:'房源数量',
                    type:'line',
                    smooth:true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: 'rgb(67, 181, 114)'
                        }
                    },
                    areaStyle: {
                        normal: {//数据线
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(255, 255, 255)'
                            }, {
                                offset: 1,
                                color: 'rgb(236, 247, 231)'
                            }])
                        }
                    },
                    data: data
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
         myChart.setOption(self.option);
      },
      usertubiao() {
        var self = this;
        // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('main1'));
        //myChart1.showLoading();
        var date = [];
        var data = [];

        self.List.forEach(item => {
          if(self.weekDx2 == 1){
            if(item.week == "1"){
              item.week = "周一"
            }
            if(item.week == "2"){
              item.week = "周二"
            }
            if(item.week == "3"){
              item.week = "周三"
            }
            if(item.week == "4"){
              item.week = "周四"
            }
            if(item.week == "5"){
              item.week = "周五"
            }
            if(item.week == "6"){
              item.week = "周六"
            }
            if(item.week == "7"){
              item.week = "周日"
            }
            date.push(item.week);
            data.push(item.count);
          }else{
            date.push(item.date);
            data.push(item.count);
          }
        })
        self.option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'left'
            },
            grid: {//x、y轴缩进
                    left: '0%',
                    right: '0%',
                    bottom: '0%',
                    containLabel: true
                },
            xAxis: {//x轴
                type: 'category',
                boundaryGap: false,//负值
                data: date ,//x轴数据
                //axisLabel:
            },
            yAxis: {//y轴
                type: 'value',
                boundaryGap: false,
                splitLine: {//背景分割线
                        show: true,
                    },
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 10
            }, {//按钮
                start: 0,
                end: 10,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#43b572',
                    shadowBlur: 0,//按钮阴影
                    shadowColor: 'rgba(248,248,248)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0
                }//handle是下面的小图表
            }],
            series: [
                {
                    name:'房源数量',
                    type:'line',
                    smooth:true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: 'rgb(67, 181, 114)'
                        }
                    },
                    areaStyle: {
                        normal: {//数据线
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(255, 255, 255)'
                            }, {
                                offset: 1,
                                color: 'rgb(236, 247, 231)'
                            }])
                        }
                    },
                    data: data
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
         myChart1.setOption(self.option);
      }
  },
  components: {
    cmsHeader
  },
  mounted() {
  },
  created() {
    const self = this;
    self.initListCoutn();
    self.changeWeek();
  }
};
</script>
<style scoped>
.header {
  background: #fff;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0px;
}

.box-card {
  border-radius: 5px;
  position: relative;
}
.box-card .box-card-title {
  color: #f2f3f5;
  font-size: 14px;
  padding-top: 10px;
}
.box-card .box-card-number {
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  padding-top: 10px;
}
.box-card .box-card-icon {
  position: absolute;
  width: 40px;
  height: 50px;
  right: 15px;
  bottom: 10px;
}
.box-card .box-card-icon.icon-order {
  width: 35px;
  height: 45px;
  background: url(../../static/image/home01.png) center/contain no-repeat;
}
.box-card .box-card-icon.icon-sale {
  background: url(../../static/image/home02.png) center/contain no-repeat;
}
.box-card .box-card-icon.icon-user-tatol {
  width: 40px;
  height: 45px;
  background: url(../../static/image/home03.png) center/contain no-repeat;
}
.box-card .box-card-icon.icon-user-add {
  width: 50px;
  height: 50px;
  background: url(../../static/image/home04.png) center/contain no-repeat;
}
.box-card .box-card-icon.icon-house-add {
  background: url(../../static/image/home05.png) center/contain no-repeat;
}
.box-card .box-card-icon.icon-house-total {
  background: url(../../static/image/home06.png) center/contain no-repeat;
}
.box-card .box-card-icon.icon-up-house-total {
  background: url(../../static/image/home07.png) center/contain no-repeat;
}
.box-card .box-card-icon.icon-bottom-house-total {
  background: url(../../static/image/home08.png) center/contain no-repeat;
}

.box-card .box-card-h1 {
  margin-left: -20px;
  border-left: 3px solid #242937;
  padding-left: 20px;
  color: #242937;
  font-size: 14px;
  font-weight: normal;
  text-align: left;
}

.box-card .box-card-height-fixed {
  height: 50px;
}

.box-card .box-card-affair {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 120px;
}

.box-card-affair .box-card-affair-img {
  width: 50px;
}
.box-card-affair .box-card-affair-msgc {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  height: 50px;
}
.box-card-affair .box-card-affair-msgc .affair-number {
  flex: 1;
  order: 0;
  color: #2e3445;
  font-weight: bold;
  font-size: 20px;
}
.box-card-affair .box-card-affair-msgc .affair-state {
  order: 1;
  color: #2e3445;
  font-size: 14px;
}

.box-card .box-card-entry {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 120px;
}
.box-card-entry .box-card-entry-img {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}
.box-card-entry .entry-state {
  color: #2e3445;
  font-size: 14px;
}

.box-card .box-card-chart {
  padding-top: 20px;
}
.box-card-chart .bordeRight {
  border-right: 1px solid #edeef0;
}
.box-card-chart .chart-left {
  height: 150px;
}
.box-card-chart .chart-left .chart-left-title {
  color: #9d9fa3;
  font-size: 14px;
}
.box-card-chart .chart-left .chart-left-state {
  color: #2e3445;
  font-size: 20px;
  font-weight: bold;
  padding: 7px 0px;
}
.box-card-chart .chart-left .chart-left-proportion {
  font-size: 12px;
}
.box-card-chart .chart-left .chart-left-proportion-name {
  font-size: 12px;
  color: #999999;
  margin-left: 20px;
}

.box-card-chart .chart-right {
  height: 300px;
}
.box-card-chart .chart-right .chart-right-title {
  font-size: 14px;
  color: #242937;
  height: 20px;
  line-height: 20px;
}
.box-card-chart .chart-right .chart-container {
  width: 100%;
  height: 280px;
}

.bg-white {
  background: #ffffff;
}
.bg-grey {
  background: #f2f3f5;
}
.bg-bule {
  background: #55aae6;
}
.bg-orange {
  background: #f48d5f;
}
.bg-red {
  background: #ef7477;
}
.bg-green {
  background: #4ac780;
}
.overflow {
  overflow: hidden;
}
.right-title {
  float: left;
}
.left-title {
  width: auto;
  float: right;
}
.timeSelect {
  font-size: 12px;
  line-height: 26px;
  color: #999999;
  padding: 3px 10px;
  border: solid 1px #c7c7c7;
  border-radius: 15px;
  text-align: center;
  margin-right: 13px;
  cursor: pointer;
}
.timeSelect.active {
  color: #ed0536;
  padding: 0 10px;
  border: solid 1px #ed0536;
}
/deep/ .el-range-editor.el-input__inner {
  padding: 0px 15px !important;
  border-radius: 25px !important;
  height: 22px !important;
  width: 250px !important;
}
/deep/ .el-date-editor .el-range__icon {
  line-height: 20px !important;
}
/deep/ .el-date-editor .el-range-separator {
  padding: 0 5px;
  line-height: 20px !important;
  width: 5%;
  color: #303133;
}
.box-card-affair {
  cursor: pointer;
}
.kjrk {
  cursor: pointer;
}
</style>
