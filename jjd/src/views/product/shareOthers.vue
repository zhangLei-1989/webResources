<template>
  <div class="bg">
    <group>
      <div class="desc">
        <div>A 二维码：</div>
        <div>1、保存图片，上传至目标平台</div>
        <div>2、用户用微信扫描下图二维码就可以申请出借</div>
      </div>
    </group>
    <group v-if="showCard2">
      <share-card-new :qrcode-url="qrcodeUrl"
                      :show-qrcode="true"
                      :name="name"
                      :tel="tel"
                      :wx-num="wxNum"
                      :min-money="minMoney"
                      :max-money="maxMoney"
                      :min-length="minLength"
                      :max-length="maxLength"
                      :need-info="needInfo"></share-card-new>
      <div class="bottom-tip">（长按图片，保存到手机）</div>
    </group>
    <group>
      <div class="desc">
        <div>B 出借链接：</div>
        <div>对于不允许上传二维码的平台，可以选择上传无二维码名片+出借链接的方式</div>
      </div>
    </group>
    <group v-if="showCard">
      <share-card-new :qrcode-url="qrcodeUrl"
                      :show-qrcode="false"
                      :name="name"
                      :tel="tel"
                      :wx-num="wxNum"
                      :min-money="minMoney"
                      :max-money="maxMoney"
                      :min-length="minLength"
                      :max-length="maxLength"
                      :need-info="needInfo"></share-card-new>
      <div class="bottom-tip">（长按图片，保存到手机）</div>
      <div class="card_text"
           v-if="short">
        <a :href="short"
           target="_blank">{{short}}</a>
      </div>
      <div class="bottom-tip">（长按链接可以复制）</div>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import shareCardNew from 'components/output/shareCardNew'
  import prod from 'api/prod'
  import user from 'api/user'

  export default {
    vuex: {
      getters: {
        openId: state => state.userInfo.openId,
        userId: state => state.userInfo.userId,
      }
    },
    data () {
      return {
        list: [],
        minAmountList: [],
        maxAmountList: [],
        minTimeList: [],
        maxTimeList: [],
        id: '',
        userId: '',
        base64: '',
        name: '',
        tel: '',
        wxNum: '',
        type: '',
        showCard: false,
        showCard2: false,
        short: '',
        needInfo: [],
        qrcodeUrl: ''
      }
    },
    methods: {
      getProduct () {
        prod.getProduct({
          id: this.id,
          openId: this.openId
        }).then((json) => {
          this.name = json.c_name
          this.tel = json.c_telephone
          this.wxNum = json.c_wx_id
          this.list.push({
            n_min_amt: json.n_min_amt,
            n_max_amt: json.n_max_amt,
            n_min_tm: json.n_min_tm,
            n_max_tm: json.n_max_tm,
            n_min_tm_unit: json.n_min_tm_unit,
            n_max_tm_unit: json.n_max_tm_unit
          })
          const list = []
          if (json.b_require_car_info) {
            list.push('车产')
          }
          if (json.b_require_house_info) {
            list.push('房产')
          }
          if (json.b_require_income_info) {
            list.push('收入')
          }
          if (json.b_require_job_info) {
            list.push('工作')
          }
          if (json.b_require_xuexin_info) {
            list.push('学信')
          }
          if (json.b_require_zhengxin_info) {
            list.push('征信')
          }
          this.needInfo = list
          this.computeList()
          this.$nextTick(() => {
            setTimeout(() => {
              this.showCard = true
            }, 500)
          })
        })
      },
      getProductList () {
        prod.getHomePage({
          userId: this.userId,
          openId: this.openId
        }).then((json) => {
          this.name = json.c_name
          this.tel = json.c_telephone
          this.wxNum = json.c_wx_id
          this.list = json.l_product_list
          this.computeList()
          this.$nextTick(() => {
            setTimeout(() => {
              this.showCard = true
            }, 500)
          })
        })
      },
      computeList () {
        this.list.forEach((ele) => {
          this.minAmountList.push(ele.n_min_amt)
          this.maxAmountList.push(ele.n_max_amt)
          this.minTimeList.push(ele.n_min_tm
            * this.getUnitTimes(ele.n_min_tm_unit))
          this.maxTimeList.push(ele.n_max_tm
            * this.getUnitTimes(ele.n_max_tm_unit))
        })
      },
      combination (originalUrl) {
        return window.$config.sharePrefix
          + encodeURIComponent(originalUrl)
          + window.$config.shareSuffix
      },
      getUnitTimes (u) {
        if (u === 0) {
          return 1
        }
        return 100
      },
      longshort (long) {
        user.long2short(long).then((json) => {
          this.short = json.shortUrl
        })
      },
      getQrcodeUrl () {
        /* eslint-disable max-len */
        let shareUrl = ''
        switch (this.type) {
          case 'prod':
            shareUrl = this.combination(
              `${window.$config.domain}#!/productDetailBorrower/${this.id}?share=1&fromType=others&fromUser=${this.userId}`
            )
            break
          case 'list':
            shareUrl = this.combination(
              `${window.$config.domain}#!/productList/${this.id}?share=1&fromType=others&fromUser=${this.userId}`
            )
            break
          default:
        }
        this.longshort(shareUrl)
        this.qrcodeUrl = shareUrl
        /* eslint-enable max-len */
      }
    },
    computed: {
      minMoney () {
        return Math.min(...this.minAmountList)
      },
      maxMoney () {
        return Math.max(...this.maxAmountList)
      },
      minLength () {
        const m = Math.min(...this.minTimeList)
        if (m >= 100) {
          return `${m / 100}个月`
        }
        return `${m}天`
      },
      maxLength () {
        const m = Math.max(...this.maxTimeList)
        if (m >= 100) {
          return `${m / 100}个月`
        }
        return `${m}天`
      }
    },
    watch: {
      showCard (e) {
        if (e) {
          setTimeout(() => {
            this.showCard2 = true
          }, 1000)
        }
      }
    },
    components: {
      shareCardNew
    },
    route: {
      data ({ to: { params: { type, id, userId } } }) {
        this.id = id
        this.userId = userId
        this.type = type
        if (type === 'prod') {
          this.getProduct()
        } else {
          this.getProductList()
        }
        this.getQrcodeUrl()
      }
    }
  }
</script>
<style lang="scss"
       scoped>
  @import "../../scss/function";

  .last::after {
    display: none !important;
  }

  .card_text {
    height: 30px;
    line-height: 30px;
    background: #fff;
    font-size: $TIP_FONT_SIZE;
    margin: 10px;
    padding-left: 10px;
    border-radius: 5px;
  }

  .desc {
    padding: 0 20px;
    color: white;
    line-height: 1.4;
  }

  .bg {
    background-color: #1c1c20;
    padding-bottom: 50px;
  }

  .bottom-tip {
    text-align: center;
    color: white;
    font-size: $TIP_FONT_SIZE;
    padding-top: 5px;
    .card_text + & {
      padding-top: 0;
    }
  }
</style>
