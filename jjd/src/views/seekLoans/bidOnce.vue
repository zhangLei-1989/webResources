<template>
  <div>
    <group :fixed="true"
           :single="true">
      <btn :cut="1"
           :text="recerverTypeText"
           :next="true"
           :btn-fn="next"></btn>
    </group>
    <group :first="true">
      <div>
        <div class="jjdSlogan">
          <img src="../../../static/logo.png">
          <img src="../../../static/slogan.png">
        </div>
        <bid-card :link="'/borrowDetail/0/' + id"
                  :user-id="creatorId"
                  :name="creatorName"
                  :user-icon="creatorIcon"
                  :lend="lendNum"
                  :guarantors="guarantorNum"
                  :left-time="leftTime"
                  :type="'求借款'"
                  :status="recerverTypeText"
                  :amount="amount"
                  :length="timeLength"
                  :rate="rate"
                  :fee="fee"
                  :guarantee-rate="guaranteeFee"></bid-card>
      </div>
    </group>
    <share-once :type="2"></share-once>
  </div>
</template>
<script type="text/ecmascript-6">
  import bidCard from 'components/output/bidCard'
  import shareOnce from 'components/output/shareOnce'
  import bid from 'api/bid'
  import user from 'api/user'
  import { alert } from 'tools/utils'

  export default {
    vuex: {
      getters: {
        openId: state => state.userInfo.openId
      }
    },
    data () {
      return {
        id: '',
        creatorId: '',
        creatorName: '',
        creatorIcon: '',
        leftTime: '',
        amount: '',
        timeLength: '',
        rate: '',
        lendNum: '',
        guarantorNum: '',
        fee: '',
        guaranteeFee: '',
        receiverType: 'lender'
      }
    },
    methods: {
      getIouDetail () {
        bid.getBid({
          openId: this.openId,
          firstPage: 0,
          id: this.id
        }).then((json) => {
          this.timeLength = Math.ceil(
            (new Date(json.detail.t_repay_tm) - new Date())
            / 1000 / 60 / 60 / 24
          )
          if (this.timeLength < 0) {
            alert('此次求借款已经过期')
            this.this.timeLength = 0
          }
          this.creatorId = json.detail.c_id
          this.creatorName = json.detail.c_name
          this.creatorIcon = json.detail.c_head
          const createdTime = new Date(json.detail.c_crt_tm)
          this.leftTime = Math.ceil(
            72 - (new Date() - createdTime) / 1000 / 60 / 60
          )
          this.amount = json.detail.n_amt
          this.rate = json.detail.n_interest_rate
          this.lendNum = json.l_bid_list.length
          this.guarantorNum = json.l_guarantee_list.length
          this.fee = json.detail.n_service_amt
          this.guaranteeFee = json.detail.n_guarantee_rate
        })
      },
      next () {
        this.$router.go(`/borrowDetail/0/${this.id}`)
      }
    },
    computed: {
      recerverTypeText () {
        return this.receiverType === 'lender' ?
          '借款给TA' : '帮帮TA'
      }
    },
    components: {
      bidCard,
      shareOnce
    },
    route: {
      data ({ to: { params: { type, id } } }) {
        this.receiverType = type
        this.id = id
        this.getIouDetail()
      }
    },
    attached () {
      user.saveCache({
        bidFirstTime: true
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
    margin-bottom: 10px;
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
</style>
