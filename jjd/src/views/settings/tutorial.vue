<template>
  <div class="box">
    <img class="tutorial"
         @load="show2"
         src="../../../static/tutorial_1.jpg">
    <img class="tutorial"
         v-if="shown2"
         @load="show3"
         src="../../../static/tutorial_2.jpg">
    <img class="tutorial"
         v-if="shown3"
         src="../../../static/tutorial_3.jpg">
  </div>
</template>

<script type="text/ecmascript-6">
  import user from 'api/user'

  export default{
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        shown2: false,
        shown3: false
      }
    },
    components: {},
    computed: {},
    methods: {
      show2 () {
        this.shown2 = true
      },
      show3 () {
        this.shown3 = true
      }
    },
    route: {},
    created () {
    },
    attached () {
      user.saveCache({
        tutorialDetail: true
      })
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  .box {
    overflow: hidden;
  }

  .tutorial {
    width: 100%;
    float: left;
  }
</style>
