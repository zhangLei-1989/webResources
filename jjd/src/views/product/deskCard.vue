<template>
  <div>
    <group>
      <div class="tip"
           slot="tip_top">
        <ele>长按下方桌贴，保存到手机</ele>
      </div>
      <ele>
        <div class="box">
          <img :src="imgUrl"
               id="download"
               crossOrigin="anonymous">
        </div>
      </ele>
    </group>
    <canvas id="myCanvas"></canvas>
    <qrcode :url="url"
            :size="8"
            class="no-display"
            @qr-ok="qrOk"
            id="shareQr"></qrcode>
  </div>
</template>

<script type="text/ecmascript-6">
  import qrcode from 'components/mixin/qrcode'

  export default{
    vuex: {
      getters: {
        userId: state => state.userInfo.userId,
      },
      actions: {}
    },
    data () {
      return {
        id: '',
        imgUrl: '',
        url: '',
        type: '',
        ok1: false,
        ok2: false
      }
    },
    components: {
      qrcode
    },
    computed: {},
    methods: {
      drawcard (n) {
        const deskImg = require('../../../static/desk_card.png')

        const canvas = document.getElementById('myCanvas')
        canvas.width = 284 * n
        canvas.height = 284 * n
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, 284 * n, 284 * n)
        ctx.fill()
        const desk = document.createElement('img')
        desk.setAttribute('crossOrigin', 'anonymous')
        desk.src = deskImg
        desk.style.height = 0
        this.$el.appendChild(desk)
        desk.addEventListener('load', () => {
          ctx.drawImage(desk, 0, 0 * n, 284 * n, 284 * n)
          this.ok1 = true
        }, false)
        this.getQrEle(ctx, n, 1)
        this.getUrl(1)
      },
      getQrEle (ctx, n, i0) {
        let i = i0
        const qr = document.querySelector('#shareQr > div > img')
        if (i > 10) return
        if (qr) {
          qr.style.height = 0
          ctx.drawImage(qr, 87 * n, 70 * n, 110 * n, 110 * n)
          this.ok2 = true
        } else {
          setTimeout(() => {
            this.getQrEle(ctx, n, i += 1)
          }, 500)
        }
      },
      getUrl (i0) {
        let i = i0
        if (this.ok1 && this.ok2) {
          const canvas = document.getElementById('myCanvas')
          const downloadUrl = canvas.toDataURL('image/png')
          this.imgUrl = downloadUrl
        } else {
          setTimeout(() => {
            this.getUrl(i += 1)
          }, 500)
        }
      },
      combination (originalUrl) {
        return window.$config.sharePrefix
          + encodeURIComponent(originalUrl)
          + window.$config.shareSuffix
      },
      qrOk () {
        this.drawcard(2)
      }
    },
    route: {
      data ({ to: { params: { type, id } } }) {
        let shareUrl = ''
        if (type === 'list') {
          shareUrl = this.combination(
            `${window.$config.domain}#!/productList/${id}?share=1&fromType=deskCard&fromUser=${this.userId}`
          )
        } else {
          shareUrl = this.combination(
            `${window.$config.domain}#!/productDetailBorrower/${
              id}?share=1&fromType=deskCard&fromUser=${this.userId}`
          )
        }
        this.url = shareUrl
        return {
          type,
          id
        }
      }
    },
    created () {
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  #download {
    width: 300px;
  }

  #myCanvas {
    display: none;
  }

  .no-display {
    opacity: 0;
  }

  .box {
    flex: 1;
    text-align: center;
  }
</style>
