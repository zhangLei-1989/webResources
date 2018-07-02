<template>
  <div class="feedback-alert"
       v-show="show"
       transition="slide-in"
       @click="close"
       @transitionend="transitionend">
    <div class="box">
      <div class="icon"></div>
      <div>{{content}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    setFeedback
  } from 'store/actions'

  export default{
    vuex: {
      getters: {
        content: state => state.feedbackSettings.content,
        show: state => state.feedbackSettings.show
      },
      actions: {
        setFeedback
      }
    },
    watch: {
      show (e) {
        if (e) {
          setTimeout(() => {
            this.close()
          }, 4000)
        }
      }
    },
    components: {},
    computed: {},
    methods: {
      transitionend () {
        if (!this.show) {
          this.setFeedback({
            content: ''
          })
        }
      },
      close () {
        this.setFeedback({
          show: false
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
  .feedback-alert {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 3;
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    display: flex;
    background-color: rgba(68, 68, 68, 0.8);
    color: white;
    .box {
      height: 70px;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
    }
  }

  .ios .feedback-alert {
    background-color: rgba(0, 0, 0, 0.6);
  }

  .slide-in {
    &-transition {
      transition: .3s;
      transform: translateY(0);
    }
    &-enter,
    &-leave {
      transform: translateY(-100%);
    }
  }

  .icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background: url("../../assets/feedback.svg") center no-repeat {
      size: contain;
    }
  }
</style>
