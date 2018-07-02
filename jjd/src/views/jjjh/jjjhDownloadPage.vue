<template>
  <div>
    <group :first="true">
      <ele :more="true" @click="showAttention">
        <div>邮寄信息和注意事项</div>
      </ele>
    </group>
    <group>
      <ele :more="true" v-for="item in list" @click="goAgreementDetails(item)">
        <div>{{item}}</div>
      </ele>
    </group>
    <group :fixed="true" :single="true">
      <btn :text="'下载协议'" :cut="1" :next="true" :btn-fn="downloadAgreement"></btn>
    </group>
  </div>
</template>

<script>
  import jjjh from 'api/jjjh'
  import { alert } from 'tools/utils'
  import ele from '../../components/mixin/ele.vue'
  import group from '../../components/mixin/group.vue'
  import btn from '../../components/mixin/btn.vue'

  export default {
    components: {
      ele,
      group,
      btn,
    },
    data () {
      return {
        id: '',
        list: [],
      }
    },
    created () {
      jjjh.uploadAgreement().then((res) => {
        this.list = res.c_plat_name
      })
//      jjjh.downProtocol().then((res) => {
//        this.url = res
//      })
    },
    methods: {
      downloadAgreement () {
        const url = `<div>请复制下方链接，在浏览器中打开</div><div style="text-align: left; width: 100%; -webkit-user-select: text;">${window.$config.interfaceBase}/plan/downProtocol?token=${this.$store.state.token}</div>`
        alert(url)
      },
      goAgreementDetails (item) {
        this.$router.go(`/agreementDetail/${item}`)
      },
      showAttention () {
        this.$router.go('/showAttention')
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
