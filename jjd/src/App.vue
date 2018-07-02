<template>
  <div id="app"
       :class="browserClass">
    <loading :show="loading"></loading>
    <waiting :show="waiting"
             :bank="bankWaiting"></waiting>
    <div>
      <step-bar :first="creditCenter.first"
                :update-base-info="creditCenter.updateBaseInfo"
                :current="currentPage"></step-bar>
      <follow v-if="initOk && !subscribe && !['bidOnce','iouOnce','prodOnce','prodListOnce'].includes(currentPage)"></follow>
      <router-view></router-view>
    </div>
    <popup></popup>
    <feedback></feedback>
  </div>
</template>

<script type="text/ecmascript-6">
  // 只需要在根组件绑定一次, 子组件全部可以通过 this.$store 访问
  import loading from 'components/mixin/loading'
  import waiting from 'components/mixin/waiting'
  import popup from 'components/mixin/popup'
  import feedback from 'components/mixin/feedback'
  import stepBar from 'components/output/stepBar'
  import follow from 'components/output/follow'
  import init from 'components/output/init'
  import {
    toggleLoading,
    setToken
  } from './store/actions'
  import store from './store/store'

  export default {
    mixins: [init],
    store,
    vuex: {
      getters: {
        loading: state => state.loading,
        waiting: state => state.waiting,
        creditCenter: state => state.creditCenter,
        currentPage: state => state.currentPage,
        subscribe: state => state.userInfo.subscribe,
        initOk: state => state.initOk
      },
      actions: {
        toggleLoading,
        setToken
      }
    },
    data () {
      return {}
    },
    computed: {
      bankWaiting () {
        return this.currentPage === 'bindBankCard'
      }
    },
    watch: {},
    events: {
      loadingClick () {
        this.$broadcast('loadingClick', true)
      }
    },
    components: {
      popup,
      feedback,
      loading,
      waiting,
      stepBar,
      follow
    },
    methods: {},
    created () {
    },
    attached () {
    }
  }
</script>

<style lang="scss">
  /* 这里写全局样式 */
  @import './scss/normal';
</style>
