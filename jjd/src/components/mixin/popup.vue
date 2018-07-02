<template>
  <div>
    <backdrop :backdrop-show="popupShow"></backdrop>
    <alert @click="ifHidePopup"
           :alert-show="popupShow"
           :btn-list="btnList"
           :class-name="className"
           :title="title">
      <div slot="content">{{{popupSettings.content}}}</div>
    </alert>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    hidePopup
  } from 'store/actions'
  import backdrop from '../basic/backdrop'
  import alert from '../basic/alert'

  export default{
    vuex: {
      getters: {
        popupShow: state => state.popupShow,
        popupSettings: state => state.popupSettings,
        popupHideBan: state => state.popupHideBan
      },
      actions: {
        hidePopup
      }
    },
    computed: {
      title () {
        return this.popupSettings.title
      },
      content () {
        return this.popupSettings.content
      },
      btnList () {
        return this.popupSettings.btnList
      },
      className () {
        return this.popupSettings.className
      }
    },
    components: {
      backdrop,
      alert
    },
    methods: {
      ifHidePopup () {
        if (!this.popupHideBan) {
          this.hidePopup()
        }
      },
      touchmove () {
      }
    }
  }
</script>

<style scoped>

</style>
