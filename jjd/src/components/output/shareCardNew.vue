<template>
  <div class="canvasBox">
    <div class="pre-qrcode"
         v-if="showQrcode">
      {{{qrcodeImg}}}
    </div>
    <div class="pre-qrcode2"
         v-if="!showQrcode">
      <img src="../../../static/logo2.png"
           crossOrigin="anonymous">
    </div>
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
      'name',
      'tel',
      'wxNum',
      'minMoney',
      'maxMoney',
      'minLength',
      'maxLength',
      'needInfo'
    ],
    data () {
      return {
        qrcodeImg: {},
        okUrl: ''
      }
    },
    methods: {
      getAmountUnit (e) {
        const amountNum = parseInt(e, 10)
        if (amountNum >= 10000) {
          return `${(amountNum / 10000).toFixed(1)}万`
        } else if (amountNum >= 1000) {
          return `${(amountNum / 1000).toFixed(1)}千`
        }
        return `${amountNum}元`
      },
      drawCard () {
        const canvas = document.getElementById('myCanvas')
        canvas.width = 1122
        canvas.height = 709
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
        ctx.roundRect(0, 0, 1122, 709, 0)
        ctx.fillStyle = 'white'
        ctx.fill()
        ctx.textAlign = 'left'
        let y = 100
        if (this.needInfo && this.needInfo.length > 0) {
          y = 0
          ctx.font = '46px STHeiti SimHei'
          ctx.fillStyle = '#999999'
          ctx.fillText('必备资料', 50, 640 + y)
          this.needInfo.forEach((ele, i) => {
            ctx.fillText(ele, 280 + (132 * i), 640)
            ctx.lineWidth = 0.5
            ctx.strokeRect(265 + (132 * i), 592, 120, 60)
          })
        }
        ctx.font = '50px STHeiti SimHei'
        ctx.fillStyle = '#999999'
        ctx.fillText(`手机  ${this.tel}`, 50, 250 + (y / 2))
        if (this.wxNum) {
          ctx.fillText(`微信  ${this.wxNum}`, 50, 310 + (y / 2))
        }
        ctx.font = '40px STHeiti SimHei'
        if (this.showQrcode) {
          ctx.fillText('微信扫一扫', 865, 320 + (y / 2))
        }
        ctx.fillStyle = '#333333'
        ctx.font = 'bold 70px STHeiti SimHei'
        ctx.fillText(this.name, 50, 140 + (y / 2))
        ctx.font = '46px STHeiti SimHei'
        ctx.fillStyle = '#333333'
        ctx.fillText('放贷额度', 50, 540 + (y / 2))
        ctx.fillText('借款时长', 600, 540 + (y / 2))
        ctx.fillStyle = '#ff973a'
        ctx.fillText(`${this.getAmountUnit(this
          .minMoney)}-${this.getAmountUnit(this
          .maxMoney)}元`, 260, 540 + (y / 2))
        if (this.minLength === this.maxLength) {
          ctx.fillText(this.minLength, 810, 540 + (y / 2))
        } else {
          ctx.fillText(`${this.minLength}-${this
            .maxLength}`, 810, 540 + (y / 2))
        }
        ctx.fillStyle = '#999999'
        ctx.beginPath()
        ctx.moveTo(50, 410 + (y / 2))
        ctx.lineTo(1072, 410 + (y / 2))
        ctx.lineWidth = 0.5
        ctx.closePath()
        ctx.stroke()
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
              ctx.drawImage(preQrcode, 842, 30 + ((y / 2)), 250, 250)
              const downloadUrl = canvas.toDataURL('image/png')
              this.okUrl = downloadUrl
            }, 1000)
          })
        } else {
          setTimeout(() => {
            const preQrcode = document.querySelector('.pre-qrcode2 img')
            ctx.drawImage(preQrcode, 872, 50, 200, 200)
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
    img {
      width: 300px;
    }
  }

  #test {
    display: none;
  }
</style>
