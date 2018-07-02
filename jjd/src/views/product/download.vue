<template>
  <div>
    <group>
      <ele :more="true"
           :link="'/businessCard/' + type + '/' + id">
        <div>下载名片</div>
      </ele>
      <ele :more="true"
           v-if="isList"
           :link="'/signboard/' + id">
        <div>下载挂牌</div>
      </ele>
      <ele :more="true"
           :link="'/deskCard/' + type + '/' + id">
        <div>下载桌贴</div>
      </ele>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        id: '',
        type: ''
      }
    },
    components: {},
    computed: {
      isList () {
        return this.type === 'list'
      }
    },
    methods: {},
    route: {
      data ({ to: { params: { type, id } } }) {
        return {
          id,
          type
        }
      }
    },
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
