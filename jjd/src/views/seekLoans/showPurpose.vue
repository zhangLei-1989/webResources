<template>
  <div>
    <group>
      <div slot="tip_top"
           class="tip">
        <div>
          文字说明
        </div>
      </div>
      <ele>
        <div class="addReason">{{addReason || '无'}}</div>
      </ele>
    </group>
    <group v-if="picUrls.length">
      <div slot="tip_top"
           class="tip">
        <div>
          图片说明
        </div>
      </div>
      <ele>
        <show-pic :pic-urls="picUrls"></show-pic>
      </ele>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import showPic from 'components/mixin/showPic'
  import { setTempInfo } from 'store/actions'

  export default{
    vuex: {
      getters: { showPurpose: state => state.temp.showPurpose },
      actions: { setTempInfo }
    },
    data () {
      return {
        picUrls: [],
        addReason: ''
      }
    },
    components: {
      showPic
    },
    computed: {},
    methods: {},
    route: {},
    created () {
      Object.assign(this.$data, this.showPurpose)
      if (Object.keys(this.showPurpose).length < 1) {
        window.history.back()
        return
      }
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  .addReason {
    flex: 1;
    min-height: 80px;
    margin: 10px 0;
  }
</style>
