<template>
  <div>
    <group :fixed="true"
           :single="true">
      <btn :cut="1"
           :text="'查看借条详情'"
           :next="true"
           :btn-fn="next"></btn>
    </group>
    <group :first="true">
      <div>
        <div class="jjdSlogan">
          <img src="../../../static/logo.png">
          <img src="../../../static/slogan.png">
        </div>
        <bid-card :link="'/unconfirmIouDetail/' + id"
                  :user-id="creatorId"
                  :name="creatorName"
                  :user-icon="creatorIcon"
                  :left-time="leftTime"
                  :type="'补借条'"
                  :status="'请尽快确认'"
                  :amount="amount"
                  :length="timeLength"
                  :rate="rate"
                  :fee="-1"
                  :guarantee-rate="-1"></bid-card>
      </div>
    </group>
    <share-once :type="2"></share-once>
  </div>
</template>
<script type="text/ecmascript-6">
  import bidCard from 'components/output/bidCard'
  import shareOnce from 'components/output/shareOnce'
  import iou from 'api/iou'
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
        creatorId: '',
        creatorName: '',
        creatorIcon: '',
        leftTime: '',
        amount: '',
        timeLength: '',
        rate: ''
      }
    },
    methods: {
      getIouDetail () {
        iou.getPreIOUDetail({
          openId: this.openId,
          iouId: this.id
        }).then((json) => {
          this.creatorId = json.c_crt_id
          if (json.c_crt_id === json.c_borrower_id) {
            this.creatorName = json.c_borrower_name
            this.creatorIcon = json.c_borrower_head
          } else if (json.c_crt_id === json.c_lender_id) {
            this.creatorName = json.c_lender_name
            this.creatorIcon = json.c_lender_head
          }
          const createdTime = new Date(json.c_crt_tm)
          this.leftTime = Math.ceil(
            3 - (new Date() - createdTime) / 1000 / 60 / 60 / 24
          )
          this.amount = json.n_amt
          this.timeLength = Math.ceil(
            (new Date(json.t_repay_tm) - new Date(json.t_borrow_tm))
            / 1000 / 60 / 60 / 24
          )
          this.rate = json.n_interest_rate
        }).catch((response) => {
          if (response.code === 202) {
            this.$router.go({
              path: `/iouDetail/${this.id}`,
              replace: true
            })
          }
        })
      },
      next () {
        this.$router.go(`/unconfirmIouDetail/${this.id}`)
      }
    },
    computed: {},
    components: {
      bidCard,
      shareOnce
    },
    route: {
      data ({ to: { params: { id } } }) {
        this.id = id
        this.getIouDetail()
      }
    },
    attached () {
      user.saveCache({
        iouFirstTime: true
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
