<template>
  <div v-show="creditValied">
    <group :first="true">
      <ele>
        <div class="title-left"
             solt="left">
          <div class="user-icon"
               :style="{backgroundImage: 'url(' + imgSrc + ')'}"></div>
          <div class="user-info">
            <div class="basic-info">{{name}}</div>
            <div class="tel-bg"
                 @click="call(tel)">{{tel}}
            </div>
            <div class="title-right">
              <btn v-for="item in textList"
                   class="need-info"
                   :cut="6"
                   :text="item.val"
                   @click="showFn(item)"
                   :min="true"></btn>
              <btn class="need-info"
                   :cut="6"
                   :text="'运营商'"
                   @click="showFn()"
                   :min="true"
              ></btn>
            </div>
          </div>
        </div>
      </ele>
      <ele :more="true"
           v-if="!isSelf">
        <div slot="left">设置备注</div>
        <div v-if="remark != null"
             class="remark"
             slot="right"
             @click="setRemark">
          <div>{{remark}}</div>
        </div>
        <div v-if="remark === null"
             class="remark"
             slot="right"
             @click="setRemark">
          <div>马上设置</div>
        </div>
      </ele>
    </group>
    <div class="tip-alert"
         @click.stop.prevent="tipAlert1">
      个人数据脱敏处理规则
      <img src="../../assets/info_g.svg">
    </div>

    <group>
      <ele>
        <div class="detail"
             solt="left">
          <img src="../../assets/simpleIouRecord.svg">
          <span>借贷记录（数据源于今借到）</span>
        </div>
      </ele>
      <ele>
        <div class="col">
          <div>类型</div>
          <div>借入</div>
          <div>借出</div>
          <div>担保</div>
        </div>
      </ele>
      <!--<ele>-->
        <!--<div class="col">-->
          <!--<div>累计金额</div>-->
          <!--<div>{{totalBorrow}}</div>-->
          <!--<div>{{totalLend}}</div>-->
          <!--<div class="last">{{totalGuarentee}}</div>-->
        <!--</div>-->
      <!--</ele>-->
      <ele>
        <div class="col">
          <div>最大金额</div>
          <div>{{borrowMax}}</div>
          <div>{{lendMax}}</div>
          <div class="last">{{totalGuarentee}}</div>
        </div>
      </ele>
      <ele>
        <div class="col">
          <div>累计笔数</div>
          <div>{{borrowCnt}}</div>
          <div>{{lendCnt}}</div>
          <div class="last">{{guaranteeCnt}}</div>
        </div>
      </ele>
      <ele>
        <div class="col">
          <div>累计人数</div>
          <div>{{borrowPersonCnt}}</div>
          <div>{{lendPersonCnt}}</div>
          <div class="last">{{guaranteePersonCnt}}</div>
        </div>
      </ele>
      <ele>
        <div class="col mid">
          <div class="tip-box">
            <span>当天借当天还笔数占比</span>
            <span class="tip-alert2"
                  @click.stop.prevent="tipAlert2"></span>
          </div>
          <div>{{borrowTodayPercent}}</div>
          <div>{{lendTodayPercent}}</div>
          <div class="last">--</div>
        </div>
      </ele>
      <ele>
        <div class="col">
          <div>当前金额</div>
          <div>{{nowBorrow}}</div>
          <div>{{nowLend}}</div>
          <div>{{nowGuarentee}}</div>
        </div>
      </ele>
    </group>
    <group>
      <ele>
        <div class="detail"
             solt="left">
          <img src="../../assets/simpleOverdue.svg">
          <span>逾期记录（数据源于今借到）</span>
        </div>
      </ele>
      <ele>
        <div class="col">
          <div>类型</div>
          <div>金额</div>
          <div>次数</div>
        </div>
      </ele>
      <ele>
        <div class="col">
          <div>逾期占比</div>
          <div>{{overdueAmtPercent}}</div>
          <div>{{overdueCntPercent}}</div>
        </div>
      </ele>
      <!--<ele>-->
        <!--<div class="col">-->
          <!--<div>累计逾期</div>-->
          <!--<div>{{totalOverdue}}</div>-->
          <!--<div>{{overdueTimes}}</div>-->
        <!--</div>-->
      <!--</ele>-->
      <ele>
        <div class="col">
          <div>最大逾期</div>
          <div>{{overdueTotalMax}}</div>
          <div>{{overdueTimes}}</div>
        </div>
      </ele>
      <ele>
        <div class="col">
          <div>≥7天逾期</div>
          <div>{{overdue7dayAmt}}</div>
          <div>{{overdue7dayCnt}}</div>
        </div>
      </ele>
      <ele>
        <div class="col">
          <div>当前逾期</div>
          <div>{{nowOverdue}}</div>
          <div>{{nowOverdueTimes}}</div>
        </div>
      </ele>
    </group>
    <group>
      <ele>
        <div class="detail"
             solt="left">
          <img src="../../assets/simpleBereport.svg">
          <span>被举报记录（数据源于今借到）</span>
        </div>
      </ele>
      <ele>
        <div solt="left">因违约被举报次数</div>
        <div solt="left">{{reportedTimes}}</div>
      </ele>
    </group>
    <group>
      <ele>
        <div class="detail"
             solt="left">
          <img src="../../assets/riskAssessment.svg">
          <span>风险排查（数据源于交叉验证）</span>
        </div>
      </ele>
      <ele class="font">
        <div slot="left">是否在法院失信被执行人名单内</div>
        <div slot="">{{getStatus(blacklist)}}</div>
      </ele>
      <ele>
        <div solt="left">姓名与征信是否一致</div>
        <div solt="left"
             :class="{red: nameIszx == '0'}">{{isEquals(nameIszx)}}
        </div>
      </ele>
      <ele>
        <div solt="left">人行征信≥90天逾期记录</div>
        <div solt="left">{{getNum(zxOverdue)}}</div>
      </ele>
      <ele>
        <div solt="left">姓名与学信是否一致</div>
        <div solt="left"
             :class="{red: nameIsxx == '0'}">{{isEquals(nameIsxx)}}
        </div>
      </ele>
      <ele>
        <div solt="left">身份证号与学信是否一致</div>
        <div solt="left"
             :class="{red: idIsxx == '0'}">{{isEquals(idIsxx)}}
        </div>
      </ele>
    </group>
    <!--<group>-->
      <!--<ele>-->
        <!--<div class="detail"-->
             <!--solt="left">-->
          <!--<img src="../../assets/zhimainfo.svg">-->
          <!--<span>芝麻信用（数据源于芝麻信用）</span>-->
        <!--</div>-->
      <!--</ele>-->
      <!--<ele class="font">-->
        <!--<div slot="left">芝麻信用分</div>-->
        <!--<div slot="">{{getZm(zhimaNum)}}</div>-->
      <!--</ele>-->
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
      <!--<accordion  v-if="isMatched" :min="false" :show-ele="false"-->
                  <!--:text="'行业关注名单'" :img-show="false" :normal="true" :alert-text="'记录用户在不同行业的不良记录'">-->
        <!--<ele class="font" v-for="item in watchListDetails">-->
          <!--<div slot="right">{{showStrJson(item).status}}</div>-->
        <!--</ele>-->
      <!--</accordion>-->
      <!--<ele class="font" v-if="isMatched === false">-->
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
      <group :first="true">
        <ele>
          <div class="detail"
               solt="left">
            <img src="../../assets/simpleId.svg">
            <span>身份信息（数据源于今借到）</span>
          </div>
        </ele>
        <ele>
          <div solt="left">身份证号</div>
          <div solt="right">{{idCard || '未填写'}}</div>
        </ele>
        <ele>
          <div solt="left">常用手机号</div>
          <div solt="right">{{telNum || '未填写'}}</div>
        </ele>
        <ele>
          <div solt="left">微信号</div>
          <div solt="right">{{wxNum || '未填写'}}</div>
        </ele>
        <ele>
          <div solt="left"
               style="min-width: 50px;">现居地
          </div>
          <div solt="right"
               style="padding: 7px 0;">
            {{address || '未填写'}}
          </div>
        </ele>
      </group>
      <!--第二版紧急联系人-->
      <group v-if="contactorList && contactorList.length">
        <ele>
          <div class="detail"
               solt="left">
            <img src="../../assets/simpleContact.svg">
            <span>紧急联系人分析（数据源于今借到）</span>
          </div>
        </ele>
        <ele>
          <div class="col">
            <div>姓名</div>
            <div v-for="item in contactorList">{{item.contact_name}}</div>
          </div>
        </ele>
        <ele>
          <div class="col">
            <div>与本人关系</div>
            <div v-for="item in contactorList">{{item.contact_type}}</div>
            <!--this.getType(item)-->
          </div>
        </ele>
        <ele>
          <div class="col">
            <div>联系方式</div>
            <div v-else
                 v-for="item in contactorList"
                 @click="call(item.contact_tel)">{{item.contact_tel}}
            </div>
          </div>
        </ele>
        <ele>
          <div class="col">
            <div>半年内通话次数</div>
            <div class="last"
                 v-for="item in contactorList">{{item.n_call_cnt}}
            </div>
          </div>
        </ele>
      </group>
      <group>
        <ele>
          <div class="detail"
               solt="left">
            <img src="../../assets/simpleTel.svg">
            <span>手机号分析（数据源于运营商）</span>
          </div>
        </ele>
        <ele>
          <div solt="left">使用时长</div>
          <div solt="right">{{useLength}}个月</div>
        </ele>
        <ele>
          <div solt="left">互通联系人</div>
          <div solt="right">{{contactors}}个</div>
        </ele>
      </group>
      <group v-if="jingdong">
        <ele>
          <div class="detail"
               solt="left">
            <img src="../../assets/eConsumption.svg">
            <span>电商消费分析（数据源于京东）</span>
          </div>
        </ele>
        <ele>
          <div solt="left">使用时长</div>
          <div solt="right">{{jdUseLength < 0 ? '个月' : jdUseLength}}</div>
        </ele>
        <ele>
          <div solt="left">购物次数</div>
          <div solt="right">{{jdConsumptionTimes < 0 ? '次' : jdConsumptionTimes}}</div>
        </ele>
        <ele>
          <div solt="left">消费总额</div>
          <div solt="right">{{consumptionMoney < 0 ? '元' : consumptionMoney}}</div>
        </ele>
      </group>
      <group>
        <ele>
          <div class="detail"
               solt="left">
            <img src="../../assets/num-icon.svg">
            <span>数字证书</span>
          </div>
        </ele>
        <ele :link="'/certificate/' + cUserId">
          <div solt="left">数字证书</div>
          <div slot="right">点击查看</div>
        </ele>
      </group>
    </group>
    <div class="fixed">
      <ele>
        <div>
          <div v-if="isSelf">
            <!--<button @click="">下载报告-->
            <!--</button>-->
            <button v-link="'/updateCreditInfoMy'"
                    class="light">更新报告
            </button>
          </div>
          <button @click="reportDetail"
                  class="light">详版报告
          </button>
        </div>
      </ele>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import accordion from 'components/output/accordion'
  import my from 'api/my'
  import pay from 'api/pay'
  import user from 'api/user'
  import {
    alert,
    confirm
  } from 'tools/utils'

  export default {
    vuex: {
      getters: {
        userId: state => state.userInfo.userId,
        overdueTip: state => state.temp.cache.overdueTip
      },
      actions: {}
    },
    data () {
      return {
        isSkipMobileAuth: '',
        isMobile: '',
        cUserId: '',
        remark: '',
        textList: [],
        isSelf: 0,
        imgSrc: '',
        name: '',
        tel: '',
        totalBorrow: '',
        nowBorrow: '',
        totalLend: '',
        nowLend: '',
        totalGuarentee: '',
        nowGuarentee: '',
        borrowCnt: '', // 借入累计笔数
        lendCnt: '', // 借出累计笔数
        guaranteeCnt: '', // 担保累计笔数
        borrowPersonCnt: '', // 借入累计人数
        lendPersonCnt: '', // 借出累计人数
        guaranteePersonCnt: '', // 担保累计人数
        borrowTodayPercent: '', // 借入当天还款笔数占比
        lendTodayPercent: '', // 借出当天还款笔数占比
        totalOverdue: '',
        nowOverdue: '',
        overdueTimes: '',
        nowOverdueTimes: '',
//                seriousTimes: '',
//                nowSeriousTimes: '',
        overdueAmtPercent: '', // 逾期金额占比
        overdueCntPercent: '', // 逾期次数占比
        overdue7dayAmt: '', // 逾期7天金额
        overdue7dayCnt: '', // 逾期7天次数
        reportedTimes: '',
        blacklist: '',
        zhimaNum: '',
        nameIszx: '',
        zxOverdue: '',
        nameIsxx: '',
        idIsxx: '',
        idCard: '',
        telNum: '',
        wxNum: '',
        address: '',
        contactorList: [],
        useLength: '',
        contactors: [],
        jdUseLength: '',
        jdConsumptionTimes: '',
        consumptionMoney: '',
        jingdong: false,
        creditValied: false,
        borrowMax: '',
        lendMax: '',
        guaranteeMax: '',
        overdueTotalMax: '',
        overdurTimesMax: '',
        isMatched: '', // 芝麻信用_是否在行业观察名单里面
        watchListDetails: [], // 行业观察名单
        antifraudScore: '', // 反欺诈分数
        antifraudVerify: [], // 反欺诈认证
        antifraudRisk: [], // 欺诈关注清单
      }
    },
    methods: {
      showFn () {
        if (this.isSkipMobileAuth) {
          const that = this
          if (this.isSelf) { // 自己
            pay.checkOpration().then((res) => {
              let text = ''
              if (res.b_recover) { // 恢复了
                text = '您的运营商认证现在已经恢复，请及时补充，认证运营商会增加好友对您对信任，提过借款效率。'
              } else {             // 没恢复
                text = '您对运营商认证未通过'
              }
              confirm(
                text,
                '提示',
                [{
                  text: '马上去认证',
                  fn () {
                    that.$router.go('/updateCreditInfoMy')
                  }
                }, {
                  text: '稍后去认证',
                  fn () {
                  }
                }]
              )
            })
          } else {           // 别人
            confirm(
              '该用户运营商信息未认证通过，您可以通过查看其他认证信息评估风险。',
              '提示',
              [{
                text: '我知道了',
                fn () {
                }
              }]
            )
          }
        }
      },
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
      overdueTipAlert () {
        confirm(
          '一旦逾期，出借人可以看到借款人紧急联系人的完整手机号码',
          '提示',
          [{
            text: '我知道了',
            fn () {
              user.saveCache({
                overdueTip: true
              })
            }
          }]
        )
      },
      tipAlert1 () {
        alert('<div style="text-align: left">' +
          '信用报告里有关本人的身份证号、居住地址、' +
          '好友姓名和联系方式等敏感信息，平台都做了脱敏处理，' +
          '非本人不能看到完整信息。<br>' +
          '除非逾期，出借人可以看到借款人紧急联系人的完整手机号码。</div>')
      },
      tipAlert2 () {
        if (this.isSelf) {
          alert('<div style="text-align: left">' +
            '该指标是指您生效的所有借条中' +
            '在借款日当天就还款的借条占您所有借条的比例</div>')
        } else {
          alert('<div style="text-align: left">' +
            '该指标是指该用户生效的所有借条中' +
            '在借款日当天就还款的借条占其所有借条的比例。' +
            '产生大量此类非常态的借条有可能是该用户为了刷单或其他目的，' +
            '请您谨慎甄别风险。</div>')
        }
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
      dealCredit (json) {
        if (this.isSelf) {
          this.creditValied = json.b_credit
          if (!this.creditValied) {
            this.$router.go({
              path: '/updateCreditInfoMy',
              replace: true
            })
          } else if (!this.overdueTip) {
            this.overdueTipAlert()
          }
        } else {
          this.creditValied = true
        }
      },
      dealReport (json) {
        this.isSkipMobileAuth = json.b_skip_mobile_auth
        this.isMobile = json.b_mobile_info
        this.lendMax = json.n_history_receive_max
        this.borrowMax = json.n_history_repay_max
        this.guaranteeMax = json.n_history_guarantee_max
        this.overdueTotalMax = json.n_history_overdue_max
        this.jingdong = json.b_jingdong_info // 是否有京东信息
        this.remark = json.c_memo // 备注信息
        this.isSelf = json.b_self // 是否是自己
        this.imgSrc = json.c_head // 头像
        this.name = json.c_name // 用户名
        this.tel = json.c_telephone // 手机号
        this.totalBorrow = json.n_borrow_amt // 借入总额
        this.nowBorrow = json.n_current_borrow_amt // 当前借出总额
        this.totalLend = json.n_lend_amt // 借出总额
        this.nowLend = json.n_current_lend_amt// 当前借入总额
        this.totalGuarentee = json.n_guarantee_amt// 担保总额
        this.borrowCnt = json.n_borrow_cnt// 借入累计笔数
        this.lendCnt = json.n_lend_cnt// 借入累计笔数
        this.guaranteeCnt = json.n_guarantee_cnt// 担保累计笔数
        this.borrowPersonCnt = json.n_borrow_from_person_cnt // 借入累计人数
        this.lendPersonCnt = json.n_lend_to_person_cnt // 借出累计人数
        this.guaranteePersonCnt = json.n_guarantee_to_person_cnt // 担保累计人数
        this.borrowTodayPercent = json.n_borrow_today_repay_percent
        // 借入当天还款笔数占比
        this.lendTodayPercent = json.n_lend_today_repay_percent
        // 借出当天还款笔数占比
        this.nowGuarentee = json.n_current_guarantee_amt // 当前担保总额
        this.overdueAmtPercent = json.n_overdue_amt_percent // 逾期金额占比
        this.overdueCntPercent = json.n_overdue_cnt_percent // 逾期次数占比
        this.overdue7dayAmt = json.n_overdue_7days_amt // 逾期7天金额
        this.overdue7dayCnt = json.n_overdue_7days_cnt // 逾期7天次数

        this.totalOverdue = json.n_overdue_amt // 累计逾期金额
        this.nowOverdue = json.n_current_overdue_amt // 当前逾期金额
        this.overdueTimes = json.n_overdue_cnt // 累计逾期次数
        this.nowOverdueTimes = json.n_current_overdue_cnt // 当前逾期还款次数
//                this.seriousTimes = json.n_overdue_7days_cnt // 逾期超过7天次数
//                this.nowSeriousTimes = json.n_current_overdue_7days_cnt
        // 当前逾期超过7天次数
        this.reportedTimes = json.n_reported_cnt // 被举报次数
        this.idCard = json.id_card_num // 身份证号码
        this.telNum = json.c_mobil_phone // 常用手机号
        this.wxNum = json.c_wechat_id // 微信ID
        this.address = json.c_home_addr // 个人所在区域
//                this.contactors = json.l_contract
        this.contactorList = json.l_contract // 紧急联系人列表
        this.blacklist = json.n_court_accept // 是否在法院黑名单
        this.zhimaNum = json.n_zhima_credit_score // 芝麻信用分
        this.isMatched = json.c_is_matched
        this.watchListDetails = json.watchListDetails
        this.antifraudScore = json.antifraudScore ? json.antifraudScore : '无数据'
        this.antifraudVerify = json.antifraudVerify
        this.antifraudRisk = json.antifraudRisk
        this.nameIsxx = json.n_name_equals_xuexin
        this.idIsxx = json.n_idcard_equals_xuexin
        this.nameIszx = json.n_name_equals_zhengxin
        this.zxOverdue = this.isEqualsNum(json.n_overude_90_days)
        this.useLength = this.isEqualsNum(json.n_tel_use_tm)
        this.contactors = this.isEqualsNum(json.n_tel_exchange)
        this.jdUseLength = this.isEqualsNum(json.n_ebusyness_total_tm)
        this.consumptionMoney = this.isEqualsNum(
          json.n_ebusyness_total_amount
        )
        this.jdConsumptionTimes = this.isEqualsNum(
          json.n_ebusyness_total_count
        )
        if (json.b_bankcard_info) {
          this.textList.push({ val: '银行卡' })
        }
        if (json.b_base_info) {
          this.textList.push({ val: '基础' })
        }
        if (json.b_zhima_credit) {
          this.textList.push({ val: '芝麻分' })
        }
        if (json.b_jingdong_info) {
          this.textList.push({ val: '京东' })
        }
        if (json.b_xuexin_info) {
          this.textList.push({ val: '学信' })
        }
        if (json.b_zhengxin_info) {
          this.textList.push({ val: '征信' })
        }
        if (json.b_house_info) {
          this.textList.push({ val: '房产' })
        }
        if (json.b_car_info) {
          this.textList.push({ val: '车产' })
        }
        if (json.b_income_info) {
          this.textList.push({ val: '收入' })
        }
        if (json.b_job_info) {
          this.textList.push({ val: '工作' })
        }
      },
      getCreditValied () {
        return pay.checkCredit()
      },
      getSimpleReport (cUserId) {
        return my.getCreditReportSimpleMine(cUserId)
      },
      promiseAll (cUserId) {
        Promise.all([this.getCreditValied(), this.getSimpleReport(cUserId)])
          .then(([json1, json2]) => {
            this.dealReport(json2)
            this.dealCredit(json1)
          })
      },
      getType (e) {
        let type = ''
        switch (e.contact_type) {
          case 0:
            type = '配偶'
            break
          case 1:
            type = '父母'
            break
          case 2:
            type = '兄弟姐妹'
            break
          case 3:
            type = '子女'
            break
          case 4:
            type = '同事'
            break
          case 5:
            type = '同学'
            break
          case 6:
            type = '朋友'
            break
          default:
        }
        return type
      },
      getStatus (e) {
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
          case false:
            status = '不在'
            break
          case true:
            status = '在'
            break
          default:
        }
        return status
      },
      isEqualsNum (e) {
        if (e >= 0) {
          return e
        }
        return '未填写'
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
      call (tel) {
        const a = tel.indexOf('*')
        if (a !== -1) {
          return
        }
        window.location.href = `tel:${tel}`
      },
      reportDetail () {
        window._JHsdk.action({
          event: 'ck_ac5',
          params: {
            id: this.cUserId
          }
        })
        this.$router.go(`/creditReportDetail/${this.cUserId}`)
      },
      setRemark () {
        this.$router.go(`/setRemarks/${this.cUserId}/${this.remark}`)
      }
    },
    components: {
      accordion,
    },
    route: {
      data ({ to: { params: { userId } } }) {
        this.cUserId = userId
        this.promiseAll(userId)
      }
    },
    created () {
    }
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/function';

  .remark {
    div {
      width: 180px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .tip-alert {
    margin-left: 10px;
    display: flex;
    margin-top: 10px;
    font-size: $TIP_FONT_SIZE;
    color: $TIP_COLOR;
    img {
      width: 15px;
      height: 15px;
      margin: auto 0 3px 10px;
    }
  }

  .red {
    color: $MINOR_COLOR;
  }

  .row {
    font-size: $TIP_FONT_SIZE;
  }

  .title-left {
    display: flex;
    flex: 1;
    flex-direction: row;
    padding: 10px 0;
    .user-info {
      padding: 5px;
      flex: 1;
      line-height: 20px;
      font-size: $MIN_FONT_SIZE;
      .basic-info {
        width: 70px;
        height: 20px;
        font-size: $TIP_FONT_SIZE;
      }
    }
  }

  .title-right {
    display: flex;
    flex-wrap: wrap;
    button {
      height: 20px;
      line-height: 20px;
      padding: 0;
    }
  }

  .user-icon {
    height: 60px;
    width: 60px;
    margin: 5px 0;
    border-radius: 100%;
    background-size: 60px;
  }

  button {
    margin: 5px 2px;
  }

  .detail {
    display: flex;
    flex-direction: row;
    height: 50px;
    line-height: 20px;
    img {
      width: 20px;
    }
    span {
      line-height: 50px;
      margin-left: 5px;
    }
  }

  .col {
    display: flex;
    flex: 1;
    div {
      flex: 1;
      text-align: center;
    }
    :first-child {
      text-align: left;
    }
    :last-child {
      text-align: right;
    }
  }

  .mid {
    align-items: center;
  }

  .fixed {
    @extend %fixed-box;
  }

  .tel-bg {
    background: url(../../assets/operators_main.svg) -2px center no-repeat;
    background-size: 15px 22px;
    padding: 0 0 0 15px;
  }

  .need-info {
    margin: 5px 5px 0 0;
    font-size: $MIN_FONT_SIZE;
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

    .fontSize14{
      font-size: 14px !important;
    }
  }
</style>
