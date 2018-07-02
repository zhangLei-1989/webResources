<template>
  <div>
    <validator name="validator">
      <group>
        <ele>
          <div slot="left">密码</div>
          <input growing-track="false"
                 type="password"
                 placeholder="请输入登录密码"
                 v-validate:password="validRules.password"
                 slot="right"
                 v-model="password">
        </ele>
      </group>
      <group :single="true">
        <btn :text="'下一步'"
             :cut="1"
             :next="true"
             :btn-fn="next"></btn>
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
        password: ''
      }
    },
    components: {},
    computed: {},
    methods: {
      next () {
        this.toValidate(() => {
          window.console.log('next')
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
