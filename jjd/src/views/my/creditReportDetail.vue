<template>
  <div style="width: 100%">
    <div class="tip">
      <!--todo 报告编号-->
      <div slot="left"
           style="font-size: 12px">报告编号{{reportNum}}
      </div>
      <div slot="right"
           style="font-size: 12px">更新时间{{updateTime.slice(0, 4)}}-{{updateTime.slice(4, 6)}}-{{updateTime.slice(6,
                                   8)}}
      </div>
    </div>
    <div class="basicInfo">
      <div class="left">
        <div>{{name}}</div>
        <div>身份证：{{idCard}}</div>
        <div @click="call(tel)">手机号：{{tel}}</div>
        <div>微信号：{{wxNum}}</div>
        <div class="address">
          <div>现居地：</div>
          <div class="address-detail">{{address}}</div>
        </div>
      </div>
      <div class="img-box">
        <img class="right"
             :src="personInfo.head ? personInfo.head : imgSrc">
      </div>
    </div>
    <div class="tip toggle">
      <div slot="left">详细数据</div>
      <div slot=""
           @click="toggleAllEle">全部{{toggleText}}
      </div>
    </div>
    <accordion :min="false"
               :text="'数据源分析'"
               :img-src="dataSourceImg">
      <ele>
        <div class="box gray">
          <div slot="left">数据源</div>
          <div slot="">使用时长(月)</div>
          <div slot="right">授权采集时间</div>
        </div>
      </ele>
      <ele v-for="item in dataSource">
        <div class="box">
          <div slot="left">{{item.name}}</div>
          <div slot="">{{item.use_time}}</div>
          <div slot="right">{{item.binding_time.slice(0, 11)}}</div>
        </div>
      </ele>
    </accordion>
    <group>
      <accordion :min="false"
                 :text="'风险排查（源于交叉验证）'"
                 :img-src="riskImg">
        <ele class="font">
          <div slot="left">是否在法院失信被执行人名单内</div>
          <div slot="">{{getBlackList(personInfo.n_court_accept)}}</div>
        </ele>
        <ele class="font">
          <div slot="left">姓名与征信是否一致</div>
          <div slot=""
               :class="{red: personInfo.n_name_equals_zhengxin == '0'}">
            {{isEquals(personInfo.n_name_equals_zhengxin)}}
          </div>
        </ele>
        <ele class="font">
          <div slot="left">人行征信≥90天逾期记录</div>
          <div slot="">{{getNum(personInfo.n_zhengxin_overude_90_days)}}</div>
        </ele>
        <ele class="font">
          <div slot="left">姓名与学信是否一致</div>
          <div slot=""
               :class="{red: personInfo.n_name_equals_xuexin == '0'}">
            {{isEquals(personInfo.n_name_equals_xuexin)}}
          </div>
        </ele>
        <ele class="font">
          <div slot="left">身份证号与学信是否一致</div>
          <div slot=""
               :class="{red: personInfo.n_idcard_equals_xuexin == '0'}">
            {{isEquals(personInfo.n_idcard_equals_xuexin)}}
          </div>
        </ele>
      </accordion>
    </group>
    <group>
      <accordion :min="false"
                 :text="'借贷数据分析（源于今借到）'"
                 :img-src="iouImg">
        <ele>
          <div class="box">
            <div slot="">借入</div>
            <div slot="">累计{{lendInfo.n_borrow_cnt}}次</div>
            <div slot="">最大{{lendInfo.n_history_repay_max}}元</div>
            <div slot=""
                 @click="goTo('borrowRecord/' + this.cUserId)">点击查看
            </div>
          </div>
        </ele>
        <ele>
          <div class="box">
            <div slot="">借出</div>
            <div slot="">累计{{lendInfo.n_lend_cnt}}次</div>
            <div slot="">最大{{lendInfo.n_history_receive_max}}元</div>
            <div slot=""
                 @click="goTo('lendRecord/' + this.cUserId)">点击查看
            </div>
          </div>
        </ele>
        <ele>
          <div class="box">
            <div slot="">担保</div>
            <div slot="">累计{{lendInfo.n_guarantee_cnt}}次</div>
            <div slot="">累计{{lendInfo.n_guarantee_amt}}元</div>
            <div slot=""
                 @click="goTo('guaranteeRecord/' + this.cUserId)">点击查看
            </div>
          </div>
        </ele>
        <ele>
          <div class="box">
            <div slot="">逾期</div>
            <div slot="">累计{{lendInfo.n_overdue_cnt}}次</div>
            <div slot="">最大{{lendInfo.n_history_overdue_max}}元</div>
            <div slot=""
                 @click="goTo('overdueRecord/' + this.cUserId)">点击查看
            </div>
          </div>
        </ele>
        <ele>
          <div class="box">
            <div style="">被举报</div>
            <div slot="">累计{{lendInfo.n_reported_cnt}}次</div>
            <div slot="">--</div>
            <div slot=""
                 @click="goTo('reportedRecord/' + this.cUserId)">点击查看
            </div>
          </div>
        </ele>
      </accordion>
    </group>
    <group>
      <accordion :min="false"
                 :text="'紧急联系人分析（交叉验证）'"
                 :img-src="contactImg">
        <div>
          <ele>
            <div class="box">
              <div slot="left">姓名</div>
              <div slot=""
                   v-for="item in contacts">{{item.contact_name}}
              </div>
            </div>
          </ele>
          <ele>
            <div class="box">
              <div slot="left">与本人关系</div>
              <div slot=""
                   v-for="item in contacts">{{item.contact_type}}
              </div>
            </div>
          </ele>
          <ele>
            <div class="box">
              <div slot="left">联系方式</div>
              <div slot=""
                   v-for="item in contacts"
                   @click="call(item.contact_tel)">{{item.contact_tel}}
              </div>
            </div>
          </ele>
          <ele>
            <div class="box">
              <div slot="left">半年内通话次数</div>
              <div slot=""
                   v-for="item in contacts">{{zeroDeal(item.n_call_cnt,'次')}}
              </div>
            </div>
          </ele>
          <ele>
            <div class="box">
              <div slot="left">通话时长</div>
              <div slot=""
                   v-for="item in contacts">{{item.n_call_len.toFixed(2)}}分钟
              </div>
            </div>
          </ele>
          <ele>
            <div class="box">
              <div slot="left">短信条数</div>
              <div slot=""
                   v-for="item in contacts">{{item.n_sms_cnt}}条
              </div>
            </div>
          </ele>
          <ele>
            <div class="box">
              <div slot="left">收货总额</div>
              <div slot=""
                   v-for="item in contacts">{{item.n_total_amount}}元
              </div>
            </div>
          </ele>
          <ele>
            <div class="box">
              <div slot="left">收货次数</div>
              <div slot=""
                   v-for="item in contacts">{{item.n_total_count < 0 ? 0 : item.n_total_count}}次
              </div>
            </div>
          </ele>
          <ele>
            <div class="box">
              <div slot="left">最早收货时间</div>
              <div slot=""
                   v-for="item in contacts">{{item.c_begin_date ? item.c_begin_date.slice(0, 11) : '无'}}
              </div>
            </div>
          </ele>
          <ele>
            <div class="box">
              <div slot="left">最晚收货时间</div>
              <div slot=""
                   v-for="item in contacts">{{item.c_end_date ? item.c_end_date.slice(0, 11) : '无'}}
              </div>
            </div>
          </ele>
        </div>
      </accordion>
    </group>
    <!--<group>-->
      <!--<accordion :min="false"-->
                 <!--:text="'芝麻信用（源于芝麻信用）'"-->
                 <!--:img-src="zhimaImg">-->
        <!--<ele class="font">-->
          <!--<div slot="left">芝麻信用分</div>-->
          <!--<div slot="">{{getZm(personInfo.n_zhima_credit_score)}}</div>-->
        <!--</ele>-->
      <!--</accordion>-->
      <!--<ele class="font" v-if="isMatched === null">-->
        <!--<div slot="left" class="tip-box">-->
          <!--<span>行业关注名单</span>-->
          <!--<span class="tip-alert2"-->
                <!--@click.stop.prevent="tipAlertHYGZMD"></span>-->
        <!--</div>-->
        <!--<div slot="">无数据</div>-->
      <!--</ele>-->
      <!--&lt;!&ndash;<ele class="font" v-if="isMatched === 'true'">&ndash;&gt;-->
        <!--&lt;!&ndash;<div slot="left"><span>行业关注名单</span>&ndash;&gt;-->
          <!--&lt;!&ndash;<span class="tip-alert2" @click.stop.prevent="tipAlertHYGZMD"></span>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;</ele>&ndash;&gt;-->
      <!--<accordion  v-if="isMatched === 'true'" :min="false" :show-ele="false"-->
                  <!--:text="'行业关注名单'" :img-show="false" :normal="true" :alert-text="'记录用户在不同行业的不良记录'">-->
        <!--<ele class="font" v-for="item in watchListDetails">-->
          <!--<div slot="right">{{showStrJson(item).status}}</div>-->
        <!--</ele>-->
      <!--</accordion>-->
      <!--<ele class="font" v-if="isMatched === 'false'">-->
        <!--<div slot="left" class="tip-box">-->
          <!--<span>行业关注名单</span>-->
          <!--<span class="tip-alert2" @click.stop.prevent="tipAlertHYGZMD"></span>-->
        <!--</div>-->
        <!--<div slot="">无不良记录</div>-->
      <!--</ele>-->
      <!--<ele class="font">-->
        <!--<div slot="left" class="tip-box">-->
          <!--<span>申请欺诈评分</span>-->
          <!--<span class="tip-alert2"-->
                <!--@click.stop.prevent="tipAlertQZPF"></span>-->
        <!--</div>-->
        <!--<div slot="">{{antifraudScore}}</div>-->
      <!--</ele>-->
      <!--<ele class="font" v-if="!antifraudVerify.length">-->
        <!--<div slot="left" class="tip-box">-->
          <!--<span>欺诈信息验证</span>-->
          <!--<span class="tip-alert2" @click.stop.prevent="tipAlertQZXXYZ"></span>-->
        <!--</div>-->
        <!--<div slot="">无数据</div>-->
      <!--</ele>-->
      <!--<accordion  v-if="antifraudVerify.length" :min="false" :show-ele="false"-->
                  <!--:text="'欺诈信息验证'" :img-show="false" :normal="true" :alert-text="'对用户资料的真实性进行验证，识别出用户的欺诈冒用信息'">-->
        <!--<ele class="font" v-for="item in antifraudVerify">-->
          <!--<div slot="right">{{showStrJson(item).status}}</div>-->
        <!--</ele>-->
      <!--</accordion>-->
      <!--<ele class="font" v-if="!antifraudRisk.length">-->
        <!--<div slot="left">-->
          <!--欺诈关注清单-->
        <!--</div>-->
        <!--<div slot="">无数据</div>-->
      <!--</ele>-->
      <!--<accordion  v-if="antifraudRisk.length" :min="false" :show-ele="false"-->
                  <!--:text="'欺诈关注清单'" :img-show="false">-->
        <!--<ele class="font" v-for="item in antifraudRisk">-->
          <!--<div slot="right">{{showStrJson(item).status}}</div>-->
        <!--</ele>-->
      <!--</accordion>-->
    <!--</group>-->
    <group>
      <accordion :min="false"
                 :text="'手机号分析（源于运营商）'"
                 :img-src="telImg">
        <ele class="box2">
          <div slot="left">注册手机号</div>
          <div slot=""
               @click="call(registPhone)">{{registPhone}}
          </div>
        </ele>
        <ele class="box2"
             v-for="item in bankPhone">
          <div slot="left">银行卡预留手机号</div>
          <div slot=""
               @click="call(item)">{{item}}
          </div>
        </ele>
        <ele class="box2">
          <div slot="left">运营商认证手机号</div>
          <div slot=""
               @click="call(personInfo.c_mobile_phone)">{{personInfo.c_mobile_phone}}
          </div>
        </ele>
        <div class="dividing-line">------以下数据为常用手机号的分析结果------</div>
        <ele class="box2">
          <div slot="left">使用时长</div>
          <div slot="">{{telUseLen}}个月</div>
        </ele>
        <ele class="box2">
          <div slot="left">互通联系人</div>
          <div slot="">{{personInfo.n_tel_exchange}}个</div>
        </ele>
        <ele class="box2">
          <div slot="left">是否在电商中使用过</div>
          <div slot="">{{getStatus(this.personInfo.n_tel_ebusyness_count)}}</div>
        </ele>
        <ele class="box2"
             no-line="true">
          <div slot="left">贷款类号码联系情况</div>
          <div slot="">{{mobileAnalysis.loan_result || '无数据'}}</div>
        </ele>
        <div class="top-line">
          <div class="result"
               v-for="item in mobileAnalysis.loan_evidence">{{item}}
          </div>
        </div>
        <ele class="box2"
             no-line="true">
          <div slot="left">银行类号码联系情况</div>
          <div slot="">{{mobileAnalysis.bank_result || '无数据'}}</div>
        </ele>
        <div class="top-line">
          <div class="result"
               v-for="item in mobileAnalysis.bank_evidence">{{item || '无数据'}}
          </div>
        </div>
        <ele class="box2"
             no-line="true">
          <div slot="left">信用卡类号码联系情况</div>
          <div slot="">{{mobileAnalysis.credit_card_result || '无数据'}}</div>
        </ele>
        <div class="top-line">
          <div class="result"
               v-for="item in mobileAnalysis.credit_card_evidence">{{item || '无数据'}}
          </div>
        </div>
        <ele class="box2">
          <div slot="left">通话记录详情</div>
          <div slot=""
               @click="goTo('callRecord/' + this.cUserId)">点击查看
          </div>
        </ele>
        <ele class="box2">
          <div slot="left">话费详情</div>
          <div slot=""
               @click="goTo('telBillRecord/' + this.cUserId)">点击查看
          </div>
        </ele>
      </accordion>
    </group>
    <group>
      <accordion :min="false"
                 :text="'地址与收货人分析（交叉验证）'"
                 :img-src="addressImg">
        <ele class="line">
          <div>本人现居地址：</div>
          <div class="address-detail">{{address}}</div>
        </ele>
        <ele class="line"
             v-for="item in Ecommerce">
          <div>电商收货地址：</div>
          <div class="address-detail">{{item.address}}</div>
          <div class="font"
               v-for="p in item.receiver">
            <!--todo 收货人姓名、联系电话-->
            <div><span>收货人姓名：</span><span>{{p.name}}</span></div>
            <div><span>联系电话：</span><span v-for="tel in p.phone_num_list">{{tel}}<br></span></div>
          </div>
          <div class="font">
            <div><span>消费次数：</span><span>{{item.total_count}}</span></div>
            <div><span>消费金额：</span><span>{{item.total_amount.toFixed(2)}}元</span></div>
          </div>
          <div><span>收货时间：</span><span>{{item.begin_date.slice(0, 11)}}至{{item.end_date.slice(0, 11)}}</span>
          </div>
        </ele>
      </accordion>
    </group>
    <group>
      <accordion :min="false"
                 :text="'电商消费分析（源于京东）'"
                 :img-src="eshopImg">
        <ele class="box2">
          <div slot="left">使用时长</div>
          <div slot="">{{zeroDeal(eUsedLen, '个月')}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">购物次数</div>
          <div slot="">{{zeroDeal(eUsedTimes, '次')}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">消费总额</div>
          <div slot="">{{zeroDeal(eUsedAmount, '元')}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">消费详情</div>
          <div slot=""
               @click="goTo('consumptionRecord/' + this.cUserId)">点击查看
          </div>
        </ele>
      </accordion>
    </group>
    <group v-if="showZhengxin(personInfo)">
      <accordion :min="false"
                 :text="'人行征信（源于人行征信系统）'"
                 :img-src="zxImg">
        <ele class="box2">
          <div slot="left">信用卡账户数</div>
          <div slot="">{{getNum(personInfo.n_zhengxin_account_count)}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">购房贷款数</div>
          <div slot="">{{getNum(personInfo.n_zhengxin_house_count)}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">其它贷款数</div>
          <div slot="">{{getNum(personInfo.n_zhengxin_other_count)}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">逾期总次数</div>
          <div slot="">{{getNum(personInfo.n_zhengxin_overdue_count)}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">≥90天逾期次数</div>
          <div slot="">{{getNum(personInfo.n_zhengxin_overude_90_days)}}</div>
        </ele>
      </accordion>
    </group>
    <group v-if="xuexin.length">
      <accordion :min="false"
                 :text="'学信网（源于学信网）'"
                 :img-src="xxImg"
                 v-for="item in xuexin">
        <ele class="box2">
          <div slot="left">学历</div>
          <div slot="">{{item.c_student_level}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">学校</div>
          <div slot="">{{item.c_university}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">专业</div>
          <div slot="">{{item.c_major}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">类型</div>
          <div slot="">{{item.c_full_time}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">状态</div>
          <div slot="">{{item.c_student_status}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">入校时间</div>
          <div slot="">{{item.c_student_begin_time}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">离校时间</div>
          <div slot="">{{item.c_student_end_time}}</div>
        </ele>
      </accordion>
    </group>
    <group v-if="jobInfo">
      <accordion :min="false"
                 :text="'工作信息（源于本人填写）'"
                 :img-src="jobImg">
        <ele class="font">
          <div slot="left">公司名称</div>
          <div class="address-detail">{{jobInfo.c_company}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">工作职位</div>
          <div class="address-detail">{{jobInfo.c_position}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">入职时间</div>
          <div slot="">{{jobInfo.c_employment_date}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">联系电话</div>
          <div slot="">{{jobInfo.c_company_tel}}</div>
        </ele>
        <ele class="font">
          <div slot="left">公司地址</div>
          <div class="address-detail">
            {{jobInfo.level_1_name}}-{{jobInfo.level_2_name}}-{{jobInfo.level_3_name}}-{{jobInfo.c_company_address}}
          </div>
        </ele>
        <ele class="no-line"
             v-if="picUrls && picUrls.length > 0">
          <div class="tips">
            工作证明
          </div>
        </ele>
        <ele v-if="picUrls && picUrls.length > 0">
          <show-pic :upload="false"
                    :credit="true"
                    :pic-urls="picUrls">>
          </show-pic>
        </ele>
      </accordion>
    </group>
    <!--v-show="!earnInfo === null"-->
    <group v-if="earnInfo">
      <accordion :min="false"
                 :text="'收入证明（源于本人填写）'"
                 :img-src="incomeImg">
        <ele class="box2">
          <div slot="left">月收入</div>
          <div slot="">{{earnInfo.c_earn_month}}</div>
        </ele>
        <ele class="no-line"
             v-if="incomePicUrls && incomePicUrls.length > 0">
          <div class="tips">
            收入证明
          </div>
        </ele>
        <ele v-if="incomePicUrls && incomePicUrls.length > 0">
          <show-pic :upload="false"
                    :credit="true"
                    :pic-urls="incomePicUrls"></show-pic>
        </ele>
      </accordion>
    </group>
    <group v-if="houseInfo">
      <accordion :min="false"
                 :text="'房产证明（源于本人填写）'"
                 :img-src="houseImg">
        <ele class="font">
          <div slot="left">房屋地址</div>
          <div class="address-detail">
            {{houseInfo.level_1_name}}-{{houseInfo.level_2_name}}-{{houseInfo.level_3_name}}-{{houseInfo.c_house_address}}
          </div>
        </ele>
        <ele class="box2">
          <div slot="left">房屋类型</div>
          <div slot="">{{houseInfo.c_house_type}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">房屋面积</div>
          <div slot="">{{houseInfo.c_house_area}}㎡</div>
        </ele>
        <ele class="box2">
          <div slot="left">购买价格</div>
          <div slot="">{{houseInfo.c_house_price}}万</div>
        </ele>
        <ele class="box2">
          <div slot="left">付款状态</div>
          <div slot="">{{houseInfo.c_house_pay_status}}</div>
        </ele>
        <ele class="box2"
             v-if="houseInfo.c_house_paid">
          <div slot="left">已支付</div>
          <div slot="">{{houseInfo.c_house_paid}}万</div>
        </ele>
        <ele class="box2">
          <div slot="left">房龄</div>
          <div slot="">{{houseInfo.c_house_age}}年</div>
        </ele>
        <ele class="box2">
          <div slot="left">是否二手房</div>
          <div slot="">{{getStatus(houseInfo.b_house_is_used)}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">是否抵押过</div>
          <div slot="">{{getStatus(houseInfo.b_house_is_mortgage)}}</div>
        </ele>
        <ele class="no-line"
             v-if="housePicUrls && housePicUrls.length > 0">
          <div class="tips">
            房产证明
          </div>
        </ele>
        <ele v-if="housePicUrls && housePicUrls.length > 0">
          <show-pic :upload="false"
                    :credit="true"
                    :pic-urls="housePicUrls"></show-pic>
        </ele>
      </accordion>
    </group>
    <group v-if="carInfo">
      <accordion :min="false"
                 :text="'车产信息（源于本人填写）'"
                 :img-src="carImg">
        <ele class="box2">
          <div slot="left">品牌类型</div>
          <div slot="">{{carInfo.c_car_brand}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">行驶里程</div>
          <div slot="">{{carInfo.c_car_mileage}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">购买价格</div>
          <div slot="">{{carInfo.c_car_price}}万</div>
        </ele>
        <ele class="box2">
          <div slot="left">付款状态</div>
          <div slot="">{{carInfo.c_car_pay_status}}</div>
        </ele>
        <ele class="box2"
             v-if="carInfo.c_car_paid">
          <div slot="left">已支付</div>
          <div slot="">{{carInfo.c_car_paid}}万</div>
        </ele>
        <ele class="box2">
          <div slot="left">登记城市</div>
          <div slot="">{{carInfo.level_1_name}}-{{carInfo.level_2_name}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">车龄</div>
          <div slot="">{{carInfo.c_car_age}}年</div>
        </ele>
        <ele class="box2">
          <div slot="left">是否二手车</div>
          <div slot="">{{getStatus(carInfo.b_car_is_used)}}</div>
        </ele>
        <ele class="box2">
          <div slot="left">是否抵押过</div>
          <div slot="">{{getStatus(carInfo.b_car_is_mortgage)}}</div>
        </ele>
        <ele class="no-line"
             v-if="carPicUrls && carPicUrls.length > 0">
          <div class="tips">
            车产证明
          </div>
        </ele>
        <ele v-if="carPicUrls && carPicUrls.length > 0">
          <show-pic :upload="false"
                    :credit="true"
                    :pic-urls="carPicUrls"></show-pic>
        </ele>
      </accordion>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import accordion from 'components/output/accordion'
  import columns from 'components/mixin/columns'
  import showPic from 'components/mixin/showPic'
  import creditCenterUser from 'api/creditCenterUser'
  import { normal } from 'tools/share'
  import {
    setTempInfo
  } from 'store/actions'
  import {
    alert,
  } from 'tools/utils'

  export default {
    vuex: {
      getters: {
        scrollY: state => state.temp.scrollY.creditReportDetail
      },
      actions: {
        setTempInfo
      }
    },
    data () {
      return {
        dataSourceImg: require('../../assets/dataSource.svg'),
        riskImg: require('../../assets/riskAssessment.svg'),
        iouImg: require('../../assets/detailIouImg.svg'),
        contactImg: require('../../assets/simpleContact.svg'),
        addressImg: require('../../assets/address.svg'),
        telImg: require('../../assets/simpleTel.svg'),
        eshopImg: require('../../assets/eConsumption.svg'),
        zxImg: require('../../assets/zhengxin.svg'),
        xxImg: require('../../assets/xuexin.svg'),
        jobImg: require('../../assets/jobInfo.svg'),
        incomeImg: require('../../assets/incomeInfo.svg'),
        houseImg: require('../../assets/house.svg'),
        carImg: require('../../assets/car.svg'),
        zhimaImg: require('../../assets/zhimainfo.svg'),
        cUserId: '',
        personInfo: {},
        mobileAnalysis: {}, // 手机号分析
        registPhone: '', // 注册手机号
        bankPhone: [], // 注册手机号
        toggleText: '收起',
//                showEle: true,
        reportNum: '',
        updateTime: '',
        imgSrc: require('../../assets/basicInfo_g.svg'),
//                zhimaNum: '',
        name: '',
        idCard: '',
        tel: '',
        wxNum: '',
        address: '',
        lenderid: '',
        dataSource: [],
        shopData: [],
//                zxOverdue: '',
//                nameIsxx: '',
//                idnumIsxx: '',
        contacts: [],
        Ecommerce: [],
        telUseLen: '',
//                telContacts: 0,
        isUsedE: '',
        eUsedLen: '',
        eUsedTimes: '',
        eUsedAmount: '',
        xuexin: [],
        lendInfo: {},
        jobInfo: [],
        earnInfo: {},
        incomePicUrls: [],
        houseInfo: {},
        housePicUrls: [],
        carInfo: {},
        carPicUrls: [],
        isMatched: '', // 芝麻信用_是否在行业观察名单里面
        watchListDetails: [], // 行业观察名单
        antifraudScore: '', // 反欺诈分数
        antifraudVerify: [], // 反欺诈认证
        antifraudRisk: [], // 欺诈关注清单
      }
    },
    methods: {
      showStrJson (str) {
        let res
        try {
          res = JSON.parse(str)
        } catch (e) {
          if (e) {
            res = {
              status: '数据错误',
            }
          }
        }
        return res
      },
      tipAlertQZPF () {
        alert('基于用户的基本信息和历史行为进行评分，其中0分表示无法识别申请信息风险；1-100分为有效识别，分数越高，风险越小。')
      },
      tipAlertHYGZMD () {
        alert('记录用户在不同行业的不良记录')
      },
      tipAlertQZXXYZ () {
        alert('记录用户在不同行业的不良记录')
      },
      zeroDeal (e, unit) {
        if (e < 0) {
          return '未填写'
        }
        return `${e}${unit}`
      },
      goTo (e) {
        this.$router.go({
          path: `/${e}`,
          replace: false
        })
      },
      call (tel) {
        const a = tel.indexOf('*')
        if (a !== -1) {
          return
        }
        window.location.href = `tel:${tel}`
      },
      toggleAllEle () {
//                this.showEle = true
//                this.showEle = e
        if (this.toggleText === '收起') {
          this.$broadcast('toggleAll', false)
          this.toggleText = '展开'
        } else if (this.toggleText === '展开') {
          this.$broadcast('toggleAll', true)
          this.toggleText = '收起'
        }
      },
      borrowList (lenderid) {
        this.$router
          .go(`../borrowOrLend/unconfirmIouDetailLender/${lenderid}`)
      },
      lenderList (borrowerid) {
        this.$router
          .go(`../borrowOrLend/unconfirmIouDetailBorrower/${borrowerid}`)
      },
      guaranteeList (borrowerid) {
        this.$router
          .go(`../borrowOrLend/unconfirmIouDetailBorrower/${borrowerid}`)
      },
      getCreditReportDetail (userId) {
        creditCenterUser.getCreditReportDetail(userId).then((json) => {
          this.personInfo = json.c_report_person
          this.mobileAnalysis = json.c_mobile_analysis || {}
          this.registPhone = json.c_register_phone
          this.bankPhone = json.l_bind_card_telephone
//                    this.zhimaNum = personInfo.n_zhima_credit_score
          this.reportNum = json.c_report_person.c_report_id
          this.updateTime = json.c_report_person.c_crt_tm
          this.name = json.c_report_person.real_name
          this.idCard = json.c_report_person.id_card_num
          this.tel = json.c_report_person.c_mobile_phone
          this.wxNum = json.c_report_person.c_wechat_id
          this.address = json.c_report_person.c_home_addr // 现居地
          this.dataSource = json.l_report_data_source
          this.shopData = json.l_report_deliver_address
          this.contacts = json.l_report_base_contract
          this.Ecommerce = json.l_report_deliver_address
          this.telUseLen = json.c_report_person.n_tel_use_tm
          this.isUsedE = json.c_report_person.n_tel_use_tm
          // todo 电话是否在电商平台使用
          this.eUsedLen = json.c_report_person.n_ebusyness_total_tm
          this.eUsedTimes = json.c_report_person.n_ebusyness_total_count
          // todo 电商消费次数
          this.eUsedAmount = json.c_report_person.n_ebusyness_total_amount
          this.lendInfo = json.c_lend_info
          this.jobInfo = json.c_job_info
          if (json.c_job_info) {
            this.picUrls = json.c_job_info.l_company_image
          }
          this.earnInfo = json.c_earn_info
          if (json.c_earn_info) {
            this.incomePicUrls = json.c_earn_info.l_earn_image
          }
          this.houseInfo = json.c_house_info
          if (json.c_house_info) {
            this.housePicUrls = json.c_house_info.l_house_image
          }
          this.carInfo = json.c_car_info
          if (json.c_car_info) {
            this.carPicUrls = json.c_car_info.l_car_image
          }
          this.xuexin = json.l_report_xuexin
          this.$nextTick(() => {
            document.body.scrollTop = this.scrollY
          })
          this.isMatched = json.c_report_person.c_is_matched
          this.watchListDetails = json.c_report_person.watchListDetails
          this.antifraudScore = json.c_report_person.antifraudScore ? json.c_report_person.antifraudScore : '无数据'
          this.antifraudVerify = json.c_report_person.antifraudVerify
          this.antifraudRisk = json.c_report_person.antifraudRisk
        })
      },
      getStatus (e) {
        let status = ''
        switch (e) {
          case 0:
            status = '否'
            break
          case 1:
            status = '是'
            break
          case -1:
            status = '无数据'
            break
          case false:
            status = '否'
            break
          case true:
            status = '是'
            break
          default:
        }
        return status
      },
      getBlackList (e) {
        let status = ''
        switch (e) {
          case 0:
            status = '不在'
            break
          case 1:
            status = '在'
            break
          case -1:
            status = '无数据'
            break
          default:
        }
        return status
      },
      isEquals (e) {
        if (e === 1) {
          return '一致'
        } else if (e === 0) {
          return '不一致'
        }
        return '无数据'
      },
      getZm (e) {
        if (e >= 0) {
          return e
        }
        return '无法评分'
      },
      getNum (e) {
        if (e >= 0) {
          return e
        }
        return '无数据'
      },
      showZhengxin (person) {
        const r = person.n_zhengxin_account_count +
          person.n_zhengxin_house_count +
          person.n_zhengxin_other_count +
          person.n_zhengxin_overdue_count +
          person.n_zhengxin_overude_90_days
        if (r === -5) {
          return false
        }
        return true
      }
    },
    components: {
      accordion,
      columns,
      showPic
    },
    route: {
      deactivate ({ next }) {
        // 缓存表单
        this.setTempInfo({
          scrollY: {
            creditReportDetail: document.body.scrollTop
          }
        })
        this.setTempInfo({ [this.cUserId]: this.$data })
        next()
      },
      data ({ to: { params: { userId } } }) {
//        if (this.$store.state.temp[userId]) {
//          Object.assign(this.$data, this.$store.state.temp[userId])
//          this.$nextTick(() => {
//            document.body.scrollTop = this.scrollY
//          })
//        } else {
//          this.cUserId = userId
//          this.getCreditReportDetail(userId)
//        }
        this.cUserId = userId
        this.getCreditReportDetail(userId)
      }
    },
    created () {
      normal()
    },
    attached () {
    }
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/fragment';

  .red {
    color: $MINOR_COLOR;
  }

  .address {
    display: flex;
    flex-direction: row;
    div {
      min-width: 56px;
    }
  }

  .tip {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: 30px;
    margin: 0 10px;
  }

  .basicInfo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: $ELE_W_COLOR;
    line-height: 30px;
    font-size: $TIP_FONT_SIZE;
    position: relative;
    overflow: hidden;
    .img-box {
      padding: 40px 10px;
    }
    .left {
      text-align: left;
      padding-left: 10px;
    }
    .right {
      width: 60px;
      height: 80px;
      border: 1px solid $BORDER_COLOR;
      text-align: right;
    }
    &::before {
      @extend %row-border;
      top: 0;
    }
    &::after {
      @extend %row-border;
    }
  }

  .box {
    flex: 1;
    display: flex;
    justify-content: space-between;
    > div {
      flex: 1;
      line-height: 40px;
      text-align: center;
      font-size: $TIP_FONT_SIZE;
    }
    > div:first-child {
      text-align: left;
    }
    > div:last-child {
      text-align: right;
    }
  }

  .box2 {
    flex: 1;
    display: flex;
    justify-content: space-between;
    > div {
      flex: 1;
      line-height: 40px;
      text-align: center;
      font-size: $TIP_FONT_SIZE;
    }
    > div:first-child {
      text-align: left;
    }
    > div:nth-child(2) {
      text-align: right;
    }
  }

  .font {
    font-size: $TIP_FONT_SIZE;
  }

  .gray {
    color: $TIP_COLOR;
  }

  .line {
    display: inline-block;
    line-height: 26px;
    font-size: $TIP_FONT_SIZE;
    padding: 10px;
  }

  .toggle {
    margin: 5px 10px;
  }

  .address-detail {
    line-height: 1.2;
    padding: 7px 0;
  }

  .tips {
    font-size: $TIP_FONT_SIZE;
  }

  .dividing-line {
    color: $TIP_COLOR;
    font-size: $TIP_FONT_SIZE;
    line-height: 30px;
    text-align: center;
  }

  .result {
    color: $TIP_COLOR;
    font-size: $MIN_FONT_SIZE;
    line-height: 25px;
    text-align: left;
    padding: 0 10px;
  }

  .top-line::after {
    content: '';
    display: block;
    width: calc(100% - 20px);
    border-bottom: 1px solid #ccc;
    transform: scaleY(0.5);
    margin: 0 10px;
  }
  .tip-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row !important;
    .tip-alert2 {
      width: 24px;
      height: 30px;
      background: url("../../assets/info.svg") center no-repeat {
        size: 12px;
      }
    }
  }
</style>
