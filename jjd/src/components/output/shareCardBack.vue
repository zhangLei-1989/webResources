<template>
  <div>
    <group>
      <ele>
        <div class="box">
          <img :src="imgUrl"
               id="download"
               crossOrigin="anonymous">
        </div>
      </ele>
    </group>
    <canvas id="myCanvas2"></canvas>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        ok1: false,
        ok2: false,
        imgUrl: ''
      }
    },
    components: {},
    computed: {},
    methods: {
      drawcard (n) {
        const logoImg = require('../../../static/logo_main.svg')
        const sloganImg = require('../../../static/slogan_black.svg')

        const canvas = document.getElementById('myCanvas2')
        canvas.width = 1122 * n
        canvas.height = 709 * n
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, 1122 * n, 709 * n)
        ctx.fill()
        const logo = document.createElement('img')
        logo.setAttribute('crossOrigin', 'anonymous')
        logo.src = logoImg
        logo.style.height = 0
        this.$el.appendChild(logo)
        logo.addEventListener('load', () => {
          ctx.drawImage(logo, 430 * n, 245 * n, 90 * n, 90 * n)
          this.ok1 = true
        }, false)
        const slogan = document.createElement('img')
        slogan.setAttribute('crossOrigin', 'anonymous')
        slogan.src = sloganImg
        slogan.style.height = 0
        this.$el.appendChild(slogan)
        slogan.addEventListener('load', () => {
          ctx.drawImage(slogan, 550 * n, 310 * n, 130 * n, 30 * n)
          this.ok2 = true
        }, false)
        ctx.textAlign = 'center'
        ctx.font = `bold ${24 * n}px STHeiti SimHei`
        ctx.strokeStyle = '#4D4F61'
        ctx.fillStyle = '#4D4F61'
        ctx.textAlign = 'center'
        ctx.fillText('国内领先的网络借条管理平台', 561 * n, 380 * n)
        ctx.textAlign = 'left'
        ctx.font = `${45 * n}px STHeiti SimHei`
        ctx.fillText('今借到', 550 * n, 290 * n)
        ctx.font = '50px STHeiti SimHei'
        ctx.fillStyle = '#999999'
        const list = ['方便', '安全', '快速', '透明']
        list.forEach((ele, i) => {
          ctx.fillText(ele, 830 + (162 * i), 900)
          ctx.lineWidth = 0.5
          ctx.strokeRect(820 + (162 * i), 850, 120, 60)
        })
        this.getUrl(canvas)
      },
      getUrl (canvas) {
        if (this.ok1 && this.ok2) {
          this.imgUrl = canvas.toDataURL('image/png')
        } else {
          setTimeout(() => {
            this.getUrl(canvas)
          }, 500)
        }
      }
    },
    route: {},
    created () {
    },
    attached () {
      this.drawcard(2)
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  #download {
    width: 300px;
  }

  #myCanvas2 {
    display: none;
  }

  .box {
    flex: 1;
    text-align: center;
  }
</style>
