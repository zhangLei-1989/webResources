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
          <prod-card :id="item.id"
                     :show-btn="false"
                     :user-id="item.c_user_id"
                     :user-icon="item.c_head"
                     :name="item.c_name"
                     :apply-num="item.n_apply_cnt"
                     :passing-rate="item.n_pass_rate"
                     :nearly-deal="item.c_last_tm"
                     :average-time="item.n_deal_tm"
                     :min-money="item.n_min_amt"
                     :max-money="item.n_max_amt"
                     :min-length="item.n_min_tm"
                     :max-length="item.n_max_tm"
                     :minlength-unit="item.n_min_tm_unit"
                     :maxlength-unit="item.n_max_tm_unit"
                     :yearly-rate="item.n_interest_rate"
                     :repay-type="item.n_repay_type"
                     :service-rate="item.n_service_fee_rate"
                     :service-fee="item.n_min_service_fee"></prod-card>
        </div>
      </div>
    </group>
    <share-once :type="1"></share-once>
  </div>
</template>
<script type="text/ecmascript-6">
  import shareOnce from 'components/output/shareOnce'
  import prodCard from 'components/output/prodCard'
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
        id: '',
        item: {}
      }
    },
    methods: {
      getProduct () {
        prod.getProduct({
          id: this.id,
          openId: this.openId
        }).then((json) => {
          this.item = json
        })
      },
      next () {
        this.$router.go(`/productDetailBorrower/${this.id}`)
      }
    },
    components: {
      shareOnce,
      prodCard
    },
    route: {
      data ({ to: { params: { id } } }) {
        this.id = id
        this.getProduct()
      }
    },
    attached () {
      user.saveCache({
        prodFirstTime: true
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
    height: 210px;
    padding-top: 10px;
  }
</style>
