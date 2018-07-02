<template>
  <div class="get-code">
    <button @click="getMsm"
            :class="{disabled: !allow}">{{msmText}}
    </button>
    <span>或</span>
    <button @click="getCall"
            :class="{disabled: !allow}">{{callText}}
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
  import {alert} from 'tools/utils'

  export default{
    props: [
      'phoneNum',
      'required',
      'start',
      'msmFn',
      'callFn'
    ],
    data () {
      return {
        msmText: '获取短信验证码',
        callText: '获取语音验证码',
        allow: true
      }
    },
    components: {},
    methods: {
      getMsm () {
        this.allow = false
        if (this.required) {
          if (this.phoneNum.length === 11) {
            this.msmFn().then(() => {
              this.startCount()
            }).catch((error) => {
              if (error.code === '') {
                window.console.log('error')
              }
            })
          } else {
            this.allow = true
            alert('请输入11位手机号码')
          }
        } else {
          this.msmFn().then(() => {
            this.startCount()
          }).catch((error) => {
            if (error.code === '') {
              window.console.log('error')
            }
          })
        }
      },
      getCall () {
        this.allow = false
        if (this.required) {
          if (this.phoneNum.length === 11) {
            this.callFn().then(() => {
              this.startCount()
            }).catch((error) => {
              if (error.code === '') {
                window.console.log('error')
              }
            })
          } else {
            this.allow = true
            alert('请输入11位手机号码')
          }
        } else {
          this.callFn().then(() => {
            this.startCount()
          }).catch((error) => {
            if (error.code === '') {
              window.console.log('error')
            }
          })
        }
      },
      startCount () {
        let count = 60
        this.msmText = this.callText = `剩余${count}秒`
        const start = setInterval(() => {
          if (count === 1) {
            clearInterval(start)
            this.msmText = '获取短信验证码'
            this.callText = '获取语音验证码'
            this.allow = true
          } else {
            count -= 1
            this.msmText = this.callText = `剩余${count}秒`
          }
        }, 1000)
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
    flex: 1;
    justify-content: space-between;
    display: flex;
    button {
      line-height: 40px;
      height: auto;
      color: $MAIN_COLOR;
      width: 125px;
      &::before {
        @extend %btn-border;
        border: 1px solid $MAIN_COLOR;
        border-radius: $BORDER_RADIUS;
      }
    }
    span {
      line-height: 40px;
    }
  }

  .disabled {
    &, &:active {
      color: $TIP_COLOR !important;
      pointer-events: none;
      cursor: not-allowed;
    }
    &::before {
      border: 1px solid $TIP_COLOR !important;
    }
  }
</style>
