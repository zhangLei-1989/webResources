<template>
  <div>
    <validator name="validator">
      <group>
        <ele>
          <div slot="left">姓名</div>
          <input growing-track="true"
                 type="text"
                 placeholder="请输入姓名"
                 v-validate:username="validRules.username"
                 slot="right"
                 v-model="name">
        </ele>
        <ele>
          <div slot="left">身份证号</div>
          <input growing-track="true"
                 type="text"
                 placeholder="请输入身份证号码"
                 v-validate:idcard="validRules.idcard"
                 slot="right"
                 v-model="idcard">
        </ele>
      </group>
      <group :single="true">
        <btn :text="'下一步'"
             :cut="1"
             :next="true"
             :btn-fn="modify"></btn>
      </group>
    </validator>
  </div>
</template>

<script type="text/ecmascript-6">
  import verify from 'components/mixin/verify'

  export default{
    mixins: [verify],
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        name: '',
        idcard: ''
      }
    },
    components: {},
    computed: {},
    methods: {
      modify () {
        this.toValidate(() => {
          this.$router.go('/index')
        })
      }
    },
    route: {},
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
