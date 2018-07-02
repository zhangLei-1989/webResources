<template>
  <div>
    <group>
      <div class="tip"
           slot="tip_top">
        <ele>长按下方名片，保存到手机，正反面需分别保存</ele>
      </div>
      <ele>
        <share-card-new v-if="ok"
                        :qrcode-url="qrcodeUrl"
                        :show-qrcode="true"
                        :name="name"
                        :tel="tel"
                        :wx-num="wxNum"
                        :min-money="minMoney"
                        :max-money="maxMoney"
                        :min-length="minLength"
                        :max-length="maxLength"
                        :need-info="needInfo"></share-card-new>
      </ele>
    </group>
    <share-card-back></share-card-back>
  </div>
</template>

<script type="text/ecmascript-6">
  import shareCardNew from 'components/output/shareCardNew'
  import shareCardBack from 'components/output/shareCardBack'
  import prod from 'api/prod'

  export default{
    vuex: {
      getters: {
        openId: state => state.userInfo.openId,
        userId: state => state.userInfo.userId,
      },
      actions: {}
    },
    data () {
      return {
        ok: false,
        id: '',
        qrcodeUrl: '',
        name: '',
        tel: '',
        wxNum: '',
        list: [],
        minAmountList: [],
        maxAmountList: [],
        minTimeList: [],
        maxTimeList: [],
        needInfo: []
      }
    },
    components: {
      shareCardNew,
      shareCardBack
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
              this.ok = true
            }, 500)
          })
        })
      },
      getProductList () {
        prod.getHomePage({
          userId: this.id,
          openId: this.openId
        }).then((json) => {
          this.tel = json.c_telephone
          this.name = json.c_name
          this.wxNum = json.c_wx_id
          this.list = json.l_product_list
          this.computeList()
          this.ok = true
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
      getUnitTimes (u) {
        if (u === 0) {
          return 1
        }
        return 100
      },
      combination (originalUrl) {
        return window.$config.sharePrefix
          + encodeURIComponent(originalUrl)
          + window.$config.shareSuffix
      }
    },
    route: {
      data ({ to: { params: { type, id } } }) {
        this.id = id
        this.type = type
        this.qrcodeUrl = this.combination(
          `${window.$config.domain}#!/productList/${id}?share=1&fromType=bussinessCard&fromUser=${this.userId}`
        )
        if (type === 'list') {
          this.getProductList()
        } else {
          this.getProduct()
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

</style>
