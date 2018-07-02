<template>
  <div class="canvasBox">
    <div class="pre-qrcode"
         v-if="showQrcode">
      {{{qrcodeImg}}}
    </div>
    <div class="pre-qrcode2"
         v-if="!showQrcode">
      <img src="../../../static/logo_main.svg">
    </div>
    <img id="test"
         :src="base64">
    <canvas id="myCanvas"></canvas>
    <div id="result">
      <img :src="okUrl">
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import qrcode from 'tools/qrcode'
  import user from 'api/user'

  export default {
    props: [
      'showQrcode',
      'qrcodeUrl',
      'base64',
      'name',
      'tel',
      'wxNum',
      'minMoney',
      'maxMoney',
      'minRate',
      'maxRate',
      'minLength',
      'maxLength'
    ],
    data () {
      return {
        qrcodeImg: {},
        okUrl: ''
      }
    },
    methods: {
      drawCard() {
        const canvas = document.getElementById('myCanvas')
        canvas.width = 600
        canvas.height = 300
        const ctx = canvas.getContext('2d')

        // 画出圆角矩形卡片
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
        ctx.roundRect(0, 0, 600, 300, 20)
        ctx.fillStyle = 'white'
        ctx.fill()
        ctx.textAlign = 'left'
        ctx.font = '24px serif'
        ctx.fillStyle = '#999999'
        ctx.fillText(`手机 ${this.tel}`, 140, 100)
        if (this.wxNum) {
          ctx.fillText(`微信 ${this.wxNum}`, 360, 100)
        }
        ctx.fillStyle = '#333333'
        ctx.fillText('放贷额度', 140, 180)
        ctx.fillText('借款利息', 140, 220)
        ctx.fillText('借款时长', 140, 260)
        ctx.font = '28px serif'
        ctx.fillText(this.name, 140, 60)
        ctx.fillStyle = '#ff973a'
        ctx.font = '24px serif'
        ctx.fillText(`${this.minMoney}-${this.maxMoney}元`, 250, 180)
        ctx.fillText(`${this.minRate}%-${this.maxRate}%`, 250, 220)
        ctx.fillText(`${this.minLength}-${this.maxLength}`, 250, 260)
        ctx.beginPath()
        ctx.arc(70, 70, 50, 0, 2 * Math.PI)
        ctx.moveTo(370, 130)
        ctx.lineTo(600, 130)
        ctx.lineTo(600, 290)
        ctx.lineTo(370, 290)
        const test = document.getElementById('test')
        test.addEventListener('load', () => {
          ctx.clip()
          ctx.drawImage(test, 20, 20, 100, 100)
        }, false)
        // 添加二维码
        if (this.showQrcode) {
          user.long2short(this.qrcodeUrl).then((json) => {
            const qr = qrcode.qrcode(2, 'L')
            qr.addData(json.shortUrl)
            qr.make()
            this.qrcodeImg = qr.createImgTag('4')
            setTimeout(() => {
              const preQrcode =
                document.querySelector('.pre-qrcode img')
              ctx.drawImage(preQrcode, 420, 130, 160, 160)
              const downloadUrl = canvas.toDataURL('image/png')
              this.okUrl = downloadUrl
            }, 1000)
          })
        } else {
          setTimeout(() => {
            const preQrcode = document.querySelector('.pre-qrcode2 img')
            ctx.drawImage(preQrcode, 440, 160, 120, 120)
            const downloadUrl = canvas.toDataURL('image/png')
            this.okUrl = downloadUrl
          }, 1000)
        }
      }
    },
    components: {
      qrcode
    },
    attached () {
      this.drawCard()
    }
  }
</script>
<style lang="scss"
       scoped>
  @import "../../scss/function";

  #myCanvas {
    transform: scale(0.5);
    transform-origin: 0 0;
    display: none;
  }

  .hidden {
    display: none;
  }

  .canvasBox {
    width: 100%;
    overflow: hidden;
  }

  #test {
    width: 50px;
    height: 50px;
  }

  .pre-qrcode {
    display: none;
  }

  .pre-qrcode2 {
    display: none;
  }

  #result {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    img {
      width: 300px;
      height: 150px;
    }
  }

  #test {
    display: none;
  }
</style>
