<template>
  <btn :cut="3"
       :text="text"
       class="get-code"
       @click="getCode"
       :next="true"
       :allow="allow"></btn>
</template>

<script type="text/ecmascript-6">
  import { alert } from 'tools/utils'
  import btn from './btn'

  export default{
    props: [
      'phoneNum',
      'required',
      'fn',
      'start',
      'bindcard',
      'ok'
    ],
    data () {
      return {
        text: '获取验证码',
        allow: true
      }
    },
    components: {
      btn
    },
    methods: {
      getCode () {
        if (this.required) {
          if (this.phoneNum.length === 11) {
            if (this.fn) this.fn()
            this.startCount()
          } else {
            alert('请输入11位手机号码')
          }
        } else if (this.bindcard) {
          if (this.fn) this.fn()
        } else {
          if (this.fn) this.fn()
          this.startCount()
        }
      },
      startCount () {
        let count = 60
        this.text = `剩余${count}秒`
        this.allow = false
        const start = setInterval(() => {
          if (count === 1) {
            clearInterval(start)
            this.text = '获取验证码'
            this.allow = true
            this.$dispatch('child', count)
          } else {
            count -= 1
            this.text = `剩余${count}秒`
          }
        }, 1000)
      }
    },
    events: {
      startCount (e) {
        if (e) {
          this.startCount()
        }
      }
    },
    attached () {
      if (this.start) {
        this.getCode()
      }
    }
  }
</script>

<style lang="scss"
       scoped>
  @import '../../scss/fragment';

  .get-code {
    position: absolute;
    height: 50px;
    top: 0;
    right: 0;
    z-index: 1;
    border-radius: 0;
    margin: 0 !important;
  }
</style>
