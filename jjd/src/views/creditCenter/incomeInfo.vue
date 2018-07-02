<template>
  <div>
    <validator name="validator">
      <group :first="true">
        <ele>
          <div slot="left">月收入</div>
          <input growing-track="true"
                 slot="right"
                 type="number"
                 maxlength="10"
                 v-model="monIncome"
                 placeholder="请输入整数"
                 v-validate:income="validRules.income"/>
          <div slot="unit">元</div>
        </ele>

      </group>

      <group :single="true"
             :fixed="true">
        <btn :cut="1"
             :text="'确认提交'"
             :btn-fn="postIncomeInfo"
             :next="true">
        </btn>
      </group>
      <group>
        <ele class="no-line">
          <div class="tips">
            请上传您本人近六个月的银行卡流水账单、社保公积金明细等收入证明图片，要求清晰真实，不可后期处理（不超过9张）
          </div>
        </ele>
        <ele>
          <show-pic :upload="true"
                    :pic-urls="picUrls"
                    :credit="true"
                    @upload-pic="uploaded"></show-pic>
        </ele>
      </group>
    </validator>
  </div>
</template>
<script type="text/ecmascript-6">
  import creditCenterUser from 'api/creditCenterUser'
  import showPic from 'components/mixin/showPic'
  import verify from 'components/mixin/verify'
  import {
    setTempInfo
  } from 'store/actions'

  export default{
    mixins: [verify],
    vuex: {
      getters: {
        incomeInfo: state => state.temp.incomeInfo
      },
      actions: {
        setTempInfo
      }
    },
    data () {
      return {
        monIncome: {},
        picUrls: [],
        uploadUrls: []
      }
    },
    methods: {
      uploaded (obj) {
        this.picUrls.push(obj.localId)
        this.uploadUrls.push(obj.serverId)
      },
      postIncomeInfo () {
        this.toValidate(() => {
          creditCenterUser.saveIncomeInfo({
            monIncome: this.monIncome,
            picUrls: this.uploadUrls
          }).then(() => {
            window.history.back()
          })
        })
      },
      getIncomeInfo () {
        if (!this.incomeInfo.monIncome) {
          // 无缓存才去后台请求
          creditCenterUser.getIncomeInfo().then((json) => {
            if (!json) return
            this.monIncome = json.c_earn_month
            this.picUrls = json.l_earn_image
          })
        }
      }
    },
    created () {
      Object.assign(this.$data, this.incomeInfo)
      this.getIncomeInfo()
    },
    route: {
      deactivate ({ next }) {
        // 缓存表单
        this.setTempInfo({ incomeInfo: this.$data })
        next()
      }
    },
    computed: {
      computedDays () {
        const start = new Date()
        const d0 = this.date
        const end = new Date(d0.y, parseInt(d0.m, 10) - 1, d0.d)
        const m = end - start
        const d = Math.ceil(m / (24 * 3600 * 1000))
        return d > 0 ? d : 0
      }
    },
    components: {
      showPic
    }
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/function';

  input {
    text-align: right !important;
  }

  .tips {
    padding: 10px 0;
    font-size: $TIP_FONT_SIZE;
    color: $TIP_COLOR;
  }
</style>
