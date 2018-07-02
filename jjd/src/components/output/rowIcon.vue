<template>
  <div>
    <canvas id="icon"></canvas>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: [
      'list'
    ],
    data () {
      return {
        all: {
          value: '8',
          color: '#82ade4'
        },
        child1: {
          value: '3',
          color: '#7dcdb4'
        }
      }
    },
    computed: {
      rate () {
        return this.child1.value / this.all.value
      }
    },
    methods: {
      drawIcon () {
        const canvas = document.getElementById('icon');
        if (canvas.getContext) {
          const ctx = canvas.getContext('2d');
          ctx.beginPath();
          ctx.moveTo(50, 10);
          ctx.lineTo(120, 10);
          ctx.lineTo(120, 60);
          ctx.lineTo(50, 60);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(50, 60);
          ctx.lineTo(120, 60);
          ctx.lineTo(85, 90);
          ctx.fill();
        }
      }
    },
    attached () {
//            this.compute()
      this.drawIcon()
    }
  }
</script>
<style lang="scss"
       scoped>
  #pie {
    height: 150px;
  }
</style>
