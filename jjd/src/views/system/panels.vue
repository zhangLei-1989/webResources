<template>
  <div>
    <img style="display: none"
         id="bgImg"
         src="../../../static/flowers.jpg">
    <canvas id="myCanvas"></canvas>
    <!--<div id="result">-->
    <!--<img :src="okUrl">-->
    <!--</div>-->
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
//                okUrl: ''
      }
    },
    methods: {
      drawPanel () {
        const canvas = document.getElementById('myCanvas')
        canvas.width = 600
        canvas.height = 300
        const ctx = canvas.getContext('2d')
        /* eslint-disable max-len, func-names */
        window.CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
          this.beginPath()
          this.moveTo(x + r, y)
          this.arcTo(x + w, y, x + w, y + h, r)
          this.arcTo(x + w, y + h, x, y + h, r)
          this.arcTo(x, y + h, x, y, r)
          this.arcTo(x, y, x + w, y, r)
          // this.arcTo(x+r, y);
          this.closePath()
          return this
        }
        /* eslint-enable max-len, func-names */
        ctx.roundRect(100, 100, 300, 150, 20)
        ctx.fillStyle = 'white'
        ctx.fill()
        const img = document.getElementById('bgImg')
        img.addEventListener('load', () => {
          ctx.drawImage(img, 0, 0, 600, 300)
        }, false)

//                setTimeout(() => {
//                    const downloadUrl = canvas.toDataURL('image/png')
//                    this.okUrl = downloadUrl
//                }, 1000)
      }
    },
    components: {},
    attached () {
      this.drawPanel()
    }
  }
</script>
<style lang="scss"
       scoped>
  #myCanvas {
    width: 100%;
    height: 600px;
  }
</style>
