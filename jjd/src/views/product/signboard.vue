<template>
  <div>
    <group>
      <div class="tip"
           slot="tip_top">
        <ele>长按下方挂牌，保存到手机</ele>
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
  </div>
</template>

<script type="text/ecmascript-6">
  import creditCenterUser from 'api/creditCenterUser'

  export default{
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        id: '',
        address: '',
        startDate: '',
        endDate: '一年',
        imgUrl: '',
        ok1: false,
        ok2: false,
        ok3: false,
        ok4: false
      }
    },
    components: {},
    computed: {},
    methods: {
      drawcard (n) {
        const board = require('../../../static/board.png')
        const sealImg = require('../../../static/seal.png')
        const logoImg = require('../../../static/logo2.png')
        const qrcodeImg = require('../../../static/jjd_qr_small.jpg')
        const sloganImg = require('../../../static/slogan_black.png')

        const canvas = document.getElementById('myCanvas')
        canvas.width = 1135 * n
        canvas.height = 795 * n
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, 1135 * n, 795 * n)
        ctx.fill()
        const box = document.createElement('img')
        box.setAttribute('crossOrigin', 'anonymous')
        box.src = board
        box.style.height = 0
        this.$el.appendChild(box)
        box.addEventListener('load', () => {
          ctx.drawImage(box, 0, -170 * n, 1135 * n, 1135 * n)
          this.ok1 = true
        }, false)
        const seal = document.createElement('img')
        seal.setAttribute('crossOrigin', 'anonymous')
        seal.src = sealImg
        seal.style.height = 0
        this.$el.appendChild(seal)
        seal.addEventListener('load', () => {
          ctx.drawImage(seal, 750 * n, 570 * n, 150 * n, 150 * n)
          this.ok2 = true
        }, false)
        const logo = document.createElement('img')
        logo.setAttribute('crossOrigin', 'anonymous')
        logo.src = logoImg
        logo.style.height = 0
        this.$el.appendChild(logo)
        logo.addEventListener('load', () => {
          ctx.drawImage(logo, 500 * n, 105 * n, 90 * n, 90 * n)
          this.ok3 = true
        }, false)
        const qrcode = document.createElement('img')
        qrcode.setAttribute('crossOrigin', 'anonymous')
        qrcode.src = qrcodeImg
        qrcode.style.height = 0
        this.$el.appendChild(qrcode)
        qrcode.addEventListener('load', () => {
          ctx.drawImage(qrcode, 380 * n, 100 * n, 100 * n, 100 * n)
        }, false)
        const slogan = document.createElement('img')
        slogan.setAttribute('crossOrigin', 'anonymous')
        slogan.src = sloganImg
        slogan.style.height = 0
        this.$el.appendChild(slogan)
        slogan.addEventListener('load', () => {
          ctx.drawImage(slogan, 620 * n, 170 * n, 130 * n, 30 * n)
          this.ok4 = true
        }, false)
        ctx.textAlign = 'center'
        ctx.font = `bold ${50 * n}px Helvetica`
        ctx.strokeStyle = '#4D4F61'
        ctx.fillStyle = '#4D4F61'
        ctx.fillText('新锐投资人', 567 * n, 350 * n)
        ctx.textAlign = 'left'
        ctx.font = `bold ${25 * n}px Helvetica`
        ctx.fillText('编号', 100 * n, 470 * n)
        ctx.fillText('起始日', 100 * n, 550 * n)
        ctx.fillText('地址', 500 * n, 470 * n)
        ctx.fillText('有效期', 500 * n, 550 * n)
        ctx.font = `${25 * n}px Helvetica`
        ctx.fillText(this.id.slice(0, 18), 200 * n, 470 * n)
        ctx.fillText(this.startDate, 200 * n, 550 * n)
        ctx.fillText(this.address, 600 * n, 470 * n)
        ctx.fillText(this.endDate, 600 * n, 550 * n)
        ctx.font = `${20 * n}px Helvetica`
        ctx.fillText('北京人人信科技有限公司', 710 * n, 700 * n)
        ctx.textAlign = 'center'
        ctx.fillText('国 内 领 先 的 网 络 借 条 管 理 平 台', 567 * n, 250 * n)
        ctx.textAlign = 'left'
        ctx.font = `${45 * n}px Helvetica`
        ctx.fillText('今借到', 620 * n, 150 * n)
        ctx.beginPath()
        ctx.moveTo(486 * n, 105 * n)
        ctx.lineTo(486 * n, 195 * n)
        ctx.lineWidth = 0.5
        ctx.closePath()
        ctx.stroke()
        this.getUrl()
      },
      getUrl () {
        if (this.ok1 && this.ok2 && this.ok3 && this.ok4) {
          const canvas = document.getElementById('myCanvas')
          const downloadUrl = canvas.toDataURL('image/png')
          this.imgUrl = downloadUrl
        } else {
          setTimeout(() => {
            this.getUrl()
          }, 500)
        }
      },
      getBaseInfo () {
        creditCenterUser.getBaseInfo().then((json) => {
          this.address = json.c_home_addr
          this.drawcard(2)
        })
      }
    },
    route: {
      data ({ to: { params: { id } } }) {
        const d = new Date()
        return {
          id,
          startDate: `${d.getFullYear()}年${d
            .getMonth() + 1}月${d.getDate()}日`
        }
      }
    },
    created () {
    },
    attached () {
      this.getBaseInfo()
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

  .box {
    flex: 1;
    text-align: center;
  }
</style>
