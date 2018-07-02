<template>
  <div>
    <group :first="true">
      <ele>
        <div class="title"
             solt="left">
          <img class="detail"
               src="../../assets/detail.svg">
          <span>借款内容</span>
        </div>
      </ele>
      <ele>
        <div class="box">
          <div class="row-a">
            <div>借款人</div>
            <div>{{borrower}}</div>
          </div>
          <div class="row-a">
            <div>出借人</div>
            <div>{{lender}}</div>
          </div>
          <div class="row-a">
            <div>借款金额</div>
            <div>{{money}}元</div>
          </div>
          <div class="row-a">
            <div>出借方式</div>
            <div>{{onLine > 0 ? '线上出借' : '线下出借'}}</div>
          </div>
          <div class="row-a">
            <div>还款方式</div>
            <div>{{payWay > 0 ? '等额本息' : '到期还本付息'}}</div>
          </div>
          <div class="row-a">
            <div>借款日期</div>
            <div>{{startDate}}</div>
          </div>
          <div v-if="payWay > 0"
               class="row-a">
            <div>分期次数</div>
            <div>{{repayTimes}}期</div>
          </div>
          <div v-else
               class="row-a">
            <div>还款日期</div>
            <div>{{endDate}}</div>
          </div>
          <div class="row-a">
            <div>借款利率</div>
            <div>{{yearlyRate}}%</div>
          </div>
          <div class="row-a">
            <div>服务费</div>
            <div>{{serviceFee || 0}}元</div>
          </div>
          <div class="row-a">
            <div>担保费</div>
            <div>{{guarantorRate || 0}}元</div>
          </div>
          <div class="row-a">
            <div>借款用途</div>
            <div>{{use}}</div>
          </div>
          <div class="row-a">
            <div>补充说明</div>
            <textarea v-if="addText.length > 14">{{addText}}</textarea>
            <div v-else>{{addText || '无'}}</div>
          </div>
          <div class="row-a">
            <div>借条ID</div>
            <div style="word-break: break-all;text-align: right;">{{id}}</div>
          </div>
          <div class="row-a">
            <div>创建时间</div>
            <div>{{createdTime}}</div>
          </div>
          <div class="row-a">
            <div>借款协议</div>
            <div class="link"
                 @click="goService">点击查看/下载
            </div>
          </div>
        </div>
      </ele>
    </group>
    <group v-if="picUrls.length">
      <div slot="tip_top"
           class="tip">
        <div>
          图片说明
        </div>
      </div>
      <ele>
        <show-pic :pic-urls="picUrls"></show-pic>
      </ele>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import iou from 'api/iou'
  import showPic from 'components/mixin/showPic'

  export default {
    data () {
      return {
        version: 2,
        id: '',
        borrower: '',
        lender: '',
        money: '',
        guarantorRate: '',
        startDate: '',
        endDate: '',
        payWay: '',
        yearlyRate: '',
        serviceFee: '',
        use: '',
        addText: '',
        picUrls: [],
        onLine: 0,
        repayTimes: 0,
        createdTime: ''
      }
    },
    methods: {
      getIOU () {
        iou.getIOUDetail(this.id).then((json) => {
          this.version = json.n_version // 借条版本
          this.use = json.c_purpose // 借款目的
          this.borrower = json.c_borrower_name // 借款人姓名
          this.lender = json.c_lender_name // 出借人姓名
          this.id = json.id // 借条id
          this.startDate = json.t_borrow_tm // 借款时间
          this.endDate = json.t_repay_tm // 预期还款时间
          this.money = json.n_amt // 还款金额
          this.yearlyRate = json.n_interest_rate // 年利率
          this.serviceFee = json.n_service_amt // 服务费用
          this.guarantorRate = json.n_guarantee_amt // 担保费用
          this.payWay = json.n_repay_type // 还款方式
          this.addText = json.c_memo // 补充说明
          this.picUrls = json.l_pic
          this.onLine = json.b_online
          this.repayTimes = json.n_period
          this.createdTime = json.t_crt_tm
        })
      },
      goService () {
        if (this.version === 0) {
          this.$router.go({
            path: `/iouService0/${this.id}`,
            replace: false
          })
        } else if (this.version === 1) {
          this.$router.go({
            path: `/iouService1/${this.id}`,
            replace: false
          })
        } else if (this.version === 2) {
          this.$router.go({
            path: `/iouService/${this.id}`,
            replace: false
          })
        } else if (this.version === 3) {
          this.$router.go({
            path: `/iouService3/${this.id}`,
            replace: false
          })
        } else if (this.version === 4) {
          this.$router.go({
            path: `/iouService4/${this.id}`,
            replace: false
          })
        } else if (this.version === 5) {
          this.$router.go({
            path: `/iouService5/${this.id}`,
            replace: false
          })
        } else if (this.version === 6) {
          this.$router.go({
            path: `/iouService6/${this.id}`,
            replace: false
          })
        } else if (this.version === 7) {
          this.$router.go({
            path: `/iouService7/${this.id}`,
            replace: false
          })
        } else {
          this.$router.go({
            path: `/iouService7/${this.id}`,
            replace: false
          })
        }
      },
      getAddReason (t) {
        return t.slice(0, 10)
      }
    },
    components: {
      showPic
    },
    route: {
      data ({ to: { params: { id } } }) {
        this.id = id
        this.getIOU()
      }
    }
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/function';

  textarea {
    min-height: 50px !important;
    max-width: 200px;
    font-size: $TIP_FONT_SIZE;
    color: $STRONG_TEXT_COLOR;
  }

  .detail {
    width: 22px;
    line-height: 20px;
  }

  .box {
    flex: 1;
  }

  .row-a {
    font-size: $TIP_FONT_SIZE;
    display: flex;
    line-height: 30px;
    justify-content: space-between;
    div {
      display: flex;
      flex-direction: column;
      &:first-child {
        min-width: 70px;
      }
    }
  }

  .title {
    display: flex;
    align-items: center;
    img {
      margin-right: 5px;
    }
  }

  .link {
    color: $LINK_COLOR;
  }
</style>
