<template>
  <div class="bg">
    <!--<group :fixed="true"-->
    <!--:single="true"-->
    <!--class="others"-->
    <!--v-if="type=='prod'||type=='list'">-->
    <!--<btn :text="'分享到微信外的平台？'"-->
    <!--:cut="1"-->
    <!--:btn-fn="others"></btn>-->
    <!--</group>-->
    <div class="desc" v-if="!(type === 'jjjhAgreement')">
      发送给微信好友或朋友圈<br>
      或者<br>
      让对方扫一扫二维码
    </div>
    <div class="desc" v-if="type === 'jjjhAgreement'">
      发送给您的父母或监护人<br/>
      或者<br/>
      让对方扫一扫二维码
    </div>
    <qrcode :url="combination(url)"
            :size="8"
            class="share-qr"></qrcode>
  </div>
</template>

<script type="text/ecmascript-6">
  import qrcode from 'components/mixin/qrcode'
  import prod from 'api/prod'
  import iou from 'api/iou'
  import bid from 'api/bid'
  import jjjh from 'api/jjjh'
  import {
    shareBid,
    shareIou,
    shareProd,
    shareJjjh,
  } from 'tools/share'

  export default{
    vuex: {
      getters: {
        userId: state => state.userInfo.userId,
        openId: state => state.userInfo.openId
      },
      actions: {}
    },
    data () {
      return {
        list: [],
        minAmountList: [],
        maxAmountList: [],
        rateList: [],
        minTimeList: [],
        maxTimeList: [],
        id: '',
        firstPage: '',
        type: '',
        amount: '',
        rate: '',
        timeLength: '',
        reason: '',
        aimedId: ''
      }
    },
    components: {
      qrcode
    },
    computed: {
      url () {
        /* eslint-disable max-len */
        let shareUrl = ''
        switch (this.type) {
          case 'prod':
            shareUrl = `${window.$config.domain}#!/productDetailBorrower/${this.id}?share=1`
            break
          case 'list':
            shareUrl = `${window.$config.domain}#!/productList/${this.id}?share=1`
            break
          case 'iou':
            shareUrl = `${window.$config.domain}#!/unconfirmIouDetail/${this.id}?share=1`
            break
          case 'bid_l':
            shareUrl = `${window.$config.domain}#!/borrowDetail/0/${this.id}?share=1`
            break
          case 'bid_g':
            shareUrl = `${window.$config.domain}#!/borrowDetail/0/${this.id}?share=1`
            break
          case 'jjjhAgreement':
            shareUrl = `${window.$config.domain}#!/guaranteeJjjh/${this.id}?share=1`
            break
          default:
        }
        return shareUrl
        /* eslint-enable max-len */
      },
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
      },
      minRate () {
        return Math.min(...this.rateList)
      },
      maxRate () {
        return Math.max(...this.rateList)
      }
    },
    methods: {
      combination (originalUrl) {
        return window.$config.sharePrefix
          + encodeURIComponent(
            `${originalUrl}&?fromType=directQR&fromUser=${this.userId}`
          )
          + window.$config.shareSuffix
      },
      others () {
        this.$router.go(
          `/shareOthers/${this.type}/${this.id}/${this.aimedId}`
        )
      },
      getUnitTimes (u) {
        if (u === 0) {
          return 1
        }
        return 100
      },
      computeList () {
        this.list.forEach((ele) => {
          this.rateList.push(ele.n_interest_rate)
          this.minAmountList.push(ele.n_min_amt)
          this.maxAmountList.push(ele.n_max_amt)
          this.minTimeList.push(ele.n_min_tm
            * this.getUnitTimes(ele.n_min_tm_unit))
          this.maxTimeList.push(ele.n_max_tm
            * this.getUnitTimes(ele.n_max_tm_unit))
        })
      },
      makeShare () {
        switch (this.type) {
          case 'prod': {
            let timeLength = ''
            if (this.minLength === this.maxLength) {
              timeLength = this.maxLength
            } else {
              timeLength = `${this.minLength}-${this.maxLength}`
            }
            let rate = ''
            if (this.minRate === this.maxRate) {
              rate = this.maxRate
            } else {
              rate = `${this.minRate}-${this.maxRate}`
            }
            shareProd({
              amount: `${this.minMoney}-${this.maxMoney}`,
              rate,
              timeLength,
              link: this.url,
              id: this.id,
            })
            break
          }
          case 'list': {
            let timeLength = ''
            if (this.minLength === this.maxLength) {
              timeLength = this.maxLength
            } else {
              timeLength = `${this.minLength}-${this.maxLength}`
            }
            let rate = ''
            if (this.minRate === this.maxRate) {
              rate = this.maxRate
            } else {
              rate = `${this.minRate}-${this.maxRate}`
            }
            shareProd({
              amount: `${this.minMoney}-${this.maxMoney}`,
              rate,
              timeLength,
              link: this.url,
              id: this.id,
            })
            break
          }
          case 'iou':
            shareIou({
              amount: this.amount,
              rate: this.rate,
              reason: this.reason,
              link: this.url,
              id: this.id,
            })
            break
          case 'bid_l': // 邀请出借人
            shareBid({
              amount: this.amount,
              rate: this.rate,
              reason: this.reason,
              timeLength: this.timeLength,
              link: this.url,
              isLender: true,
              id: this.id,
            })
            break
          case 'bid_g': // 邀请担保人
            shareBid({
              amount: this.amount,
              rate: this.rate,
              reason: this.reason,
              timeLength: this.timeLength,
              link: this.url,
              id: this.id,
            })
            break
          case 'jjjhAgreement': { // jjjh 分享给出给担保人
            shareJjjh({
              amount: this.amount,
              rate: this.rate,
              timeLength: this.timeLength,
              link: this.url,
              id: this.id,
            })
            break
          }
          default:
        }
      },
      getProduct () {
        prod.getProduct({
          id: this.id,
          openId: this.openId
        }).then((json) => {
          this.name = json.c_name
          this.tel = json.c_telephone
          this.aimedId = json.c_user_id
          this.list.push({
            n_min_amt: json.n_min_amt,
            n_max_amt: json.n_max_amt,
            n_min_tm: json.n_min_tm,
            n_max_tm: json.n_max_tm,
            n_min_tm_unit: json.n_min_tm_unit,
            n_max_tm_unit: json.n_max_tm_unit,
            n_interest_rate: json.n_interest_rate
          })
          this.computeList()
          this.makeShare()
        })
      },
      getProductList () {
        prod.getHomePage({
          userId: this.userId,
          openId: this.openId
        }).then((json) => {
          this.aimedId = json.c_user_id
          this.list = json.l_product_list
          this.computeList()
          this.makeShare()
        })
      },
      getIou () {
        iou.getPreIOUDetail({
          iouId: this.id,
          openId: this.openId
        }).catch((response) => {
          if (response.code === 202) {
            this.$router.go({
              path: `/iouDetail/${this.iouId}`,
              replace: true
            })
          }
        }).then((json) => {
          this.amount = json.n_amt
          this.rate = json.n_interest_rate
          this.reason = json.c_purpose
          this.makeShare()
        })
      },
      getBid () {
        bid.getBid({
          id: this.id,
          firstPage: this.firstPage,
          openId: this.openId
        }).then(({ detail }) => {
          this.timeLength =
            `${detail.c_crt_tm.slice(0, 10)}至${detail.t_repay_tm}`
          this.amount = detail.n_amt
          this.rate = detail.n_interest_rate
          this.reason = detail.c_purpose
          this.makeShare()
        })
      },
      getJjjh () {
        jjjh.getPlanInfo().then((res) => {
          this.amount = res.planIouAmtSum
          this.rate = res.n_interest_rate
          this.timeLength = res.n_tm
          this.makeShare()
        })
      }
    },
    route: {
      data ({ to: { params: { type, firstPage, id } } }) {
        this.type = type
        this.id = id
        this.firstPage = firstPage
        if (type === 'prod') {
          this.getProduct()
        } else if (type === 'list') {
          this.getProductList()
        } else if (type === 'iou') {
          this.getIou()
        } else if (type === 'bid_l' || type === 'bid_g') {
          this.getBid()
        } else if (type === 'jjjhAgreement') {
          this.getJjjh()
        }
      }
    },
    created () {
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  .bg {
    height: 100vh;
    background-color: #1c1c20;
  }

  .share-qr {
    display: flex;
    justify-content: center;
  }

  .desc {
    padding: 90px 0 30px;
    color: white;
    text-align: center;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      width: 80px;
      height: 80px;
      transform: rotate(45deg);
      background: url("../../assets/arrow.svg") right 10px no-repeat {
        size: contain;
      }
    }
  }

  .others {
    background-color: transparent !important;
    &::before {
      display: none;
    }
  }
</style>
