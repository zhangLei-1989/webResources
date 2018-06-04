<template>
  <el-button type="text" @click="run" :disabled="time > 0">{{ text }}</el-button>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      second: {
        type: Number,
        default: 60
      }
    },
    data () {
      return {
        time: 0
      };
    },
    methods: {
      run() {
        this.$emit('on-run');
      },
      start() {
        this.time = this.second;
        this.timer();
      },
      stop() {
        this.time = 0;
      },
      timer() {
        if (this.time > 0) {
          this.time--;
          if (this.time === 0) {
            this.$emit('on-stop');
          } else {
            setTimeout(this.timer, 1000);
          }
        }
      }
    },
    computed: {
      text() {
        return this.time > 0 ? this.time + 's 后重获取' : '发送验证码';
      }
    }
  };
</script>
