<template>
  <div>
    <group :fixed="true"
           :single="true">
      <btn :cut="1"
           :text="'向TA借款'"
           :next="true"
           :btn-fn="next"></btn>
    </group>
    <group :first="true">
      <div>
        <div class="jjdSlogan">
          <img src="../../../static/logo.png">
          <img src="../../../static/slogan.png">
        </div>
        <div class="no-box">
          <share-card-new v-if="listOk"
                          :qrcode-url="qrcodeUrl"
                          :show-qrcode="true"
                          :name="name || '无'"
                          :tel="tel || '无'"
                          :wx-num="wxNum || '无'"
                          :min-money="minMoney || 0"
                          :max-money="maxMoney || 0"
                          :min-length="minLength || 0"
                          :max-length="maxLength || 0"></share-card-new>
        </div>
      </div>
    </group>
    <share-once :type="1"></share-once>
  </div>
</template>
<script type="text/ecmascript-6">
  import shareCardNew from 'components/output/shareCardNew'
  import shareOnce from 'components/output/shareOnce'
  import prod from 'api/prod'
  import user from 'api/user'

  export default {
    vuex: {
      getters: {
        openId: state => state.userInfo.openId
      }
    },
    data () {
      return {
        list: [],
        minAmountList: [],
        maxAmountList: [],
        rateList: [],
        minTimeList: [],
        maxTimeList: [],
        userId: '',
        name: '',
        tel: '',
        wxNum: '',
        listOk: false
      }
    },
    methods: {
      getProductList () {
        prod.getHomePage({
          userId: this.userId,
          openId: this.openId
        }).then((json) => {
          this.tel = json.c_telephone
          this.name = json.c_name
          this.wxNum = json.c_wx_id
          this.list = json.l_product_list
          this.computeList()
          this.listOk = true
        })
      },
      next () {
        this.$router.go(`/productList/${this.userId}`)
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
      }
    },
    computed: {
      qrcodeUrl () {
        return this.combination(
          `${window.$config.domain}#!/productList/${this.userId}?share=1&fromType=prodListOnce&fromUser=${this.userId}`
        )
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
      }
    },
    components: {
      shareCardNew,
      shareOnce
    },
    route: {
      data ({ to: { params: { userId } } }) {
        this.userId = userId
        this.getProductList()
      }
    },
    attached () {
      user.saveCache({
        prodListFirstTime: true
      })
    }
  }
</script>
<style lang="scss"
       scoped>
  @import "../../scss/const";

  .jjdSlogan {
    height: 50px;
    background-color: $MAIN_COLOR;
    :first-child {
      width: 40px;
      height: 40px;
      margin: 5px 10px;
    }
    :last-child {
      height: 30px;
      margin: 10px 0;
    }
  }

  .no-box {
    height: 200px;
    padding-top: 10px;
  }
</style>
