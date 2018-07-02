<template>
  <div>
    <canvas id="pie"></canvas>
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
          value: '0',
          color: '#82ade4'
        },
        child1: {
          value: '0',
          color: '#7dcdb4'
        },
        child2: {
          value: '0',
          color: '#ff973a'
        }
      }
    },
    computed: {
      rate1 () {
        return this.child1.value / this.all.value
      },
      rate2 () {
        return this.child2.value / this.child1.value
      }
    },
    watch: {
      list () {
        this.compute()
      }
    },
    methods: {
      drawPie () {
        const canvas = document.getElementById('pie')
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        canvas.width = 260
        canvas.height = 300

        ctx.beginPath()
        ctx.moveTo(130, 150)
        ctx.fillStyle = '#82ade4'
        ctx.arc(130, 150, 130, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()

        if (parseFloat(this.rate1) > 0) {
          ctx.beginPath()
          ctx.moveTo(130, 150)
          ctx.fillStyle = '#7dcdb4'
          ctx.arc(130, 150, 110, 0, Math.PI * 2 * this.rate1)
          ctx.closePath()
          ctx.fill()
        }

        if (parseFloat(this.rate2) > 0) {
          ctx.beginPath()
          ctx.moveTo(130, 150)
          ctx.fillStyle = '#ff973a'
          ctx.arc(130, 150, 110, 0, Math.PI * 2 * this.rate1 * this.rate2)
          ctx.closePath()
          ctx.fill()
        }

        if (parseFloat(this.rate1) > 0) {
          ctx.beginPath()
          ctx.lineTo(260, 150)
          ctx.moveTo(130, 150)
          ctx.strokeStyle = '#7dcdb4'
          ctx.lineWidth = 10
          ctx.arc(130, 150, 115, 0, Math.PI * 2 * this.rate1)
          ctx.closePath()
          ctx.stroke()
        }
      },
      compute () {
        if (this.list) {
          this.all.value = this.list[0]
          this.child1.value = this.list[1]
          this.child2.value = this.list[2]
          this.drawPie()
        }
      }
    },
    attached () {
      this.compute()
    }
  }
</script>
<style lang="scss"
       scoped>
  #pie {
    height: 150px;
  }
</style>
