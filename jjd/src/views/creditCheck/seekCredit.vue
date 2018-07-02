<template>
  <div>
    <validator name="validator">
      <group :single="true"
             :fixed="true">
        <btn :cut="1"
             :text="'查询逾期记录'"
             :next="true"
             :btn-fn="getCredit"></btn>
      </group>
      <group :first="true">
        <ele>
          <div slot="left">姓名</div>
          <input growing-track="true"
                 slot="right"
                 type="text"
                 placeholder="请输入查询对象的真实姓名"
                 v-model="name"
                 v-validate:username="validRules.username"/>
        </ele>
        <ele>
          <div slot="left">手机号</div>
          <input growing-track="true"
                 slot="right"
                 type="tel"
                 placeholder="请输入查询对象的手机号"
                 v-model="tel"
                 v-validate:phone="validRules.phone"/>
        </ele>
      </group>
    </validator>
  </div>
</template>

<script type="text/ecmascript-6">
  import verify from 'components/mixin/verify'
  import my from 'api/my'
  import { setTempInfo } from 'store/actions'

  export default {
    mixins: [verify],
    vuex: {
      getters: {
        seekCredit: store => store.temp.seekCredit // 读取表单缓存
      },
      actions: {
        setTempInfo
      }
    },
    data () {
      return {
        name: '',
        tel: '',
        isV: '',
        headSrc: '',
        reportedTimes: '',
        totalOverdue: '',
        totalRepay: '',
        overdueMax: '',
      }
    },
    methods: {
      getCredit () {
        this.toValidate(() => {
          my.getUserCreditInfo({
            name: this.name,
            tel: this.tel
          }).then((json) => {
            this.setTempInfo({
              seekCredit: {
                name: json.c_name,
                headSrc: json.c_head,
                reportedTimes: json.n_reported_cnt,
                overdueTimes: json.n_overdue_cnt,
                totalOverdue: json.n_overdue_amt,
                totalRepay: json.n_current_overdue_amt,
                overdueMax: json.n_history_overdue_max,
              }
            })
            this.success()
          })
        })
      },
      success () {
        this.$router.go({
          path: '/creditResult',
          replace: true
        })
      }
    },
    components: {}
  }
</script>
<style scoped>
    [slot=left] {
        width: 80px;
        min-width: 0;
    }

</style>
