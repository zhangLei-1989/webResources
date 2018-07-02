<template>
  <div>
    <group :fixed="true">
      <btn :text="'完成'"
           :cut="1"
           :btn-fn="finish"></btn>
    </group>
    <group :first="true">
      <ele>
        <div class="title">
          <div class="icon"></div>
          <div>创建成功</div>
        </div>
      </ele>
      <ele>
        <div>借款金额 {{amount}} 元</div>
        <div slot="right">剩余有效期 {{leftTime}} 天</div>
      </ele>
    </group>
    <group :btn="true"
           v-if="needGuarantor == '1'">
      <btn :text="'邀请担保人'"
           :cut="2"
           :next="true"
           :btn-fn="inviteGuarantor"></btn>
      <btn :text="'邀请出借人'"
           :cut="2"
           :next="true"
           :btn-fn="inviteLender"></btn>
    </group>
    <group :single="true"
           v-else>
      <btn :text="'邀请出借人'"
           :cut="1"
           :next="true"
           :btn-fn="inviteLender"></btn>
    </group>
    <group>
      <div slot="tip_bottom"
           class="tip">
        <ele>
          <div v-if="needGuarantor == '1'">
            为什么要邀请出借人/担保人？<br>
            如果您没有公开求借款，那么只有通过邀请平台外的出借人/担保人，该借款信息才有可能被他人看到；如果您已经选择了公开求借款，那么分享借款标的给平台外的好友，也可以大大提高借款效率哦~
          </div>
          <div v-else>
            为什么要邀请出借人？<br>
            如果您没有公开求借款，那么只有通过邀请平台外的出借人，该借款信息才有可能被他人看到；如果您已经选择了公开求借款，那么分享借款标的给平台外的好友，也可以大大提高借款效率哦~
          </div>
        </ele>
      </div>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import bid from 'api/bid'
  import {
    shareBid
  } from 'tools/share'

  export default{
    vuex: {
      getters: {
        openId: state => state.userInfo.openId
      }
    },
    data () {
      return {
        amount: '',
        leftTime: '',
        needGuarantor: '0',
        id: '',
        firstPage: '',
        timeLength: '',
        rate: '',
        reason: ''
      }
    },
    computed: {
      url () {
        return `${window.$config.domain}#!/borrowDetail/0/${this.id}?share=1`
      }
    },
    components: {},
    methods: {
      inviteGuarantor () {
        this.$router.go(`/shareQr/bid_g/0/${this.id}`)
      },
      inviteLender () {
        this.$router.go(`/shareQr/bid_l/0/${this.id}`)
      },
      finish () {
        window.history.back()
      },
      getBidDetail () {
        bid.getBid({
          id: this.id,
          firstPage: this.firstPage,
          openId: this.openId
        }).then((json) => {
          const detail = json.detail
          this.amount = detail.n_amt
          this.leftTime = detail.n_left_tm
          this.timeLength =
            `${detail.c_crt_tm.slice(0, 10)}至${detail.t_repay_tm}`
          this.rate = detail.n_interest_rate
          this.reason = detail.c_purpose
          this.makeShare()
        })
      },
      makeShare () {
        shareBid({
          amount: this.amount,
          rate: this.rate,
          reason: this.reason,
          timeLength: this.timeLength,
          link: this.url,
          isLender: true,
          id: this.id,
        })
      }
    },
    events: {},
    attached () {
    },
    route: {
      data ({ to: { params: { needGuarantor, firstPage, id } } }) {
        this.id = id
        this.firstPage = firstPage
        this.needGuarantor = needGuarantor
        this.getBidDetail()
      }
    }
  }
</script>

<style lang="scss"
       scoped>
  .title {
    flex: 1;
    /*display: flex;*/
    justify-content: center;
    align-items: center;
    padding: 10px;
    div{
      margin: 0 auto;
      text-align: center;
      color: #999999;
      padding: 10px 0;
    }
    .icon {
      width: 70px;
      height: 70px;
      background: url("../../assets/created.svg") center no-repeat {
        size: contain;
      }
    }
  }
</style>
