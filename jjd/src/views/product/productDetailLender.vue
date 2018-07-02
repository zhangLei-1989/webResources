<template>
  <div>
    <div class="fixed">
      <ele>
        <div>
          <button @click="close"
                  v-if="isOpen">关闭
          </button>
          <button @click="open"
                  v-else
                  class="light">恢复
          </button>
          <button v-if="isOpen"
                  v-link="'/download/prod/' + productId"
                  class="light">下载素材
          </button>
          <button v-if="isOpen"
                  v-link="'/shareQr/prod/0/'+productId"
                  class="light">分享出借
          </button>
          <button v-if="!isOpen"
                  class="disabled">下载素材
          </button>
          <button v-if="!isOpen"
                  class="disabled">分享出借
          </button>
        </div>
      </ele>
    </div>
    <group :first="true">
      <ele :more="true"
           :link="'/prodContent/'+productId">
        <div class="title">
          <div class="icon product-icon"></div>
          <div>编号 {{productId}}</div>
        </div>
        <div slot="right"
             class="tip">
          详情
        </div>
      </ele>
      <ele class="create-time">
        <div class="tip">
          创建时间 {{createDate}}
        </div>
      </ele>
    </group>
    <group>
      <ele>
        <div class="title">
          <div class="icon pie-icon"></div>
          <div>出借指标</div>
        </div>
      </ele>
      <ele :no-line="true">
        <pie :list="pieList"></pie>
        <div slot="right"
             class="pie-tip">
          <div>
            <div class="icon">
              <div class="value1"></div>
            </div>
            <div class="key">浏览量</div>
            <div class="value">{{value1}}</div>
          </div>
          <div>
            <div class="icon">
              <div class="value2"></div>
            </div>
            <div class="key">申请量</div>
            <div class="value">{{value2}}</div>
          </div>
          <div>
            <div class="icon">
              <div class="value3"></div>
            </div>
            <div class="key">通过量</div>
            <div class="value">{{value3}}</div>
          </div>
          <div>
            <div class="icon">
              <div class="value4"></div>
            </div>
            <div class="key">申请率</div>
            <div class="value">{{rate1}}</div>
          </div>
          <div>
            <div class="icon">
              <div class="value5"></div>
            </div>
            <div class="key">通过率</div>
            <div class="value">{{rate2}}</div>
          </div>
        </div>
      </ele>
      <ele>
        <div class="pie-desc">
          <div class="icon rmb-icon"></div>
          <div class="key">出借总额</div>
          <div class="value">{{lendAmount}}元</div>
        </div>
        <div slot="right"
             class="pie-desc">
          <div class="icon speed-icon"></div>
          <div class="key">处理速度</div>
          <div class="value">{{speed}}小时</div>
        </div>
      </ele>
    </group>
    <group>
      <ele>
        <div class="title">
          <div class="icon record-icon"></div>
          <div>申请记录</div>
        </div>
      </ele>
      <ele v-for="user in list"
           @click="goToDetail(user)">
        <div class="list">
          <div class="user">
            <div class="user-icon"
                 :style="{backgroundImage: 'url(' + user.c_head + ')'}"></div>
            <div class="user-name">{{user.c_name}}</div>
          </div>
          <div class="amount">{{user.n_amt}}元</div>
        </div>
        <div slot="right"
             class="list">
          <div class="date">{{user.c_crt_tm.slice(0, 11)}}</div>
          <div class="status">{{getStatusText(user.c_status)}}</div>
        </div>
      </ele>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import pie from 'components/output/pie'
  import prod from 'api/prod'
  import { shareProd } from 'tools/share'
  import { confirm, feedback } from 'tools/utils'

  export default{
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        productId: '',
        createDate: '',
        value1: '',
        value2: '',
        value3: '',
        lendAmount: '',
        speed: '',
        list: [],
        isOpen: true
      }
    },
    components: {
      pie
    },
    computed: {
      pieList () {
        return [
          this.value1,
          this.value2,
          this.value3
        ]
      },
      rate1 () {
        return `${(this.value2 / (this.value1 || 1) * 100).toFixed(2)}%`
      },
      rate2 () {
        return `${(this.value3 / (this.value2 || 1) * 100).toFixed(2)}%`
      }
    },
    methods: {
      close () {
        const that = this
        confirm('您确认要关闭这个出借吗？', '提醒', [
          {
            text: '不关闭'
          },
          {
            text: '关闭',
            fn () {
              prod.closeProduct(that.productId).then(() => {
                feedback('出借关闭成功')
                that.isOpen = false
              })
            }
          }
        ])
      },
      open () {
        const that = this
        confirm('您确认要恢复这个出借吗？', '提醒', [
          {
            text: '继续关闭'
          },
          {
            text: '恢复',
            fn () {
              prod.openProduct(that.productId).then(() => {
                feedback('出借恢复成功')
                that.isOpen = true
              })
            }
          }
        ])
      },
      getStatusText (e) {
        let text = ''
        switch (e) {
          case 0:
            text = '待处理'
            break
          case 1:
            text = '银行处理中'
            break
          case 2:
            text = '已出借'
            break
          case 3:
            text = '已拒绝'
            break
          case 4:
            text = '已关闭'
            break
          default:
        }
        return text
      },
      getUnitTimes (u) {
        if (u === 0) {
          return '天'
        }
        return '个月'
      },
      getProductDetail () {
        prod.getProductBySelf(this.productId).then((json) => {
          this.roductId = json.id
          const date = new Date(json.t_crt_tm)
          this.createDate = `${date
            .getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
          this.value1 = json.n_view_cnt
          this.value2 = json.n_apply_cnt
          this.value3 = json.n_pass_cnt
          this.lendAmount = json.n_total_amt
          this.speed = json.n_deal_tm
          this.list = json.l_apply_list
          this.isOpen = json.b_valid
          let timeLength = ''
          const minTime = `${json.n_min_tm}${
            this.getUnitTimes(json.n_min_tm_unit)}`
          const maxTime = `${
            json.n_max_tm}${this.getUnitTimes(json.n_max_tm_unit)}`
          if (minTime === maxTime) {
            timeLength = maxTime
          } else {
            timeLength = `${minTime}-${maxTime}`
          }
          shareProd({
            amount: `${json.n_min_amt}-${json.n_max_amt}`,
            rate: json.n_interest_rate,
            timeLength,
            link: `${window.$config.domain}#!/productDetailBorrower/${json.id}?share=1`,
            id: this.productId,
          })
        })
      },
      goToDetail (user) {
        if (user.c_status === 2) {
          this.$router.go(`/iouDetail/${user.iouId}`)
        } else {
          this.$router.go(`/loanDetailLender/${user.c_product_bid_id}`)
        }
      },
    },
    route: {
      data ({ to: { params: { id } } }) {
        this.productId = id
        this.getProductDetail()
      }
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/function";

  .title {
    @extend %title;
  }

  .create-time {
    min-height: 40px !important;
  }

  .product-icon {
    background-image: url("../../assets/product.svg");
  }

  .record-icon {
    background-image: url("../../assets/record.svg");
  }

  .pie-icon {
    background-image: url("../../assets/pie.svg");
  }

  .tip {
    color: $TIP_COLOR;
    font-size: $TIP_FONT_SIZE;
    align-self: inherit !important;
  }

  .pie-tip {
    > div {
      line-height: 26px;
      display: flex;
      width: 140px;
      justify-content: space-between;
      font-size: $TIP_FONT_SIZE;
    }
    .icon {
      width: 26px;
      height: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        height: 10px;
        width: 10px;
        border-radius: 5px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        &::before,
        &::after {
          content: '';
          flex: 1;
        }
      }
    }
    .value1 {
      &::before,
      &::after {
        background-color: #82ade4;
      }
    }
    .value2 {
      &::before,
      &::after {
        background-color: #7dcdb4;
      }
    }
    .value3 {
      &::before,
      &::after {
        background-color: #ff973a;
      }
    }
    .value4 {
      &::before {
        background-color: #7dcdb4;
      }
      &::after {
        background-color: #82ade4;
      }
    }
    .value5 {
      &::before {
        background-color: #ff973a;
      }
      &::after {
        background-color: #7dcdb4;
      }
    }
    .key {
      color: $MAIN_TEXT_COLOR;
      padding: 0 5px;
    }
    .value {
      color: $STRONG_TEXT_COLOR;
      flex: 1;
      text-align: right;
    }
  }

  .pie-desc {
    display: flex;
    justify-content: center;
    line-height: 30px;
    flex: 1;
    .icon {
      width: 16px;
      height: 30px;
      background: {
        position: center;
        repeat: no-repeat;
        size: contain;
      }
    }
    .rmb-icon {
      background-image: url("../../assets/rmb.svg");
    }
    .speed-icon {
      background-image: url("../../assets/speed.svg");
    }
    .key {
      color: $MAIN_TEXT_COLOR;
      font-size: $TIP_FONT_SIZE;
      margin: 0 5px;
    }
    .value {
      color: $STRONG_TEXT_COLOR;
      font-size: $TIP_FONT_SIZE;
    }
  }

  .list {
    display: flex;
    color: $MAIN_TEXT_COLOR;
    line-height: 30px;
    font-size: $TIP_FONT_SIZE;
    &:first-child {
      flex: 3;
    }
    &:nth-child(2) {
      flex: 4;
    }
    .user {
      flex: 1;
      display: flex;
      .user-icon {
        @include user-icon(30px);
        margin-right: 5px;
      }
      .user-name {
        white-space: nowrap;
      }
    }
    .amount {
      flex: 1;
      text-align: center;
    }
    .date {
      flex: 1;
      text-align: center;
    }
    .status {
      flex: 1;
      text-align: right;
    }
  }

  .fixed {
    @extend %fixed-box;
  }
</style>
