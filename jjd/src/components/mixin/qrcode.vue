<template>
  <div>
    <div class="card-box"
         v-if="qrcodeImg">
      {{{qrcodeImg}}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import qrcode from 'tools/qrcode'
  import user from 'api/user'

  export default{
    props: {
      url: {},
      size: {
        default: 4
      }
    },
    data () {
      return {
        qrcodeImg: ''
      }
    },
    components: {
      qrcode
    },
    watch: {
      url () {
        this.drawQr()
      }
    },
    methods: {
      drawQr () {
        user.long2short(this.url).then((json) => {
          let safeNum = 14
          if (json.shortUrl.length < 30) {
            safeNum = 2
          }
          const qr = qrcode.qrcode(safeNum, 'L')
          qr.addData(json.shortUrl)
          qr.make()
          this.qrcodeImg = qr.createImgTag(this.size)
          this.$dispatch('qr-ok', true)
        })
      }
    }
  }
</script>

<style lang="scss">
  .card-box img {
    width: 200px;
    height: 200px;
  }
</style>

<style scoped
       lang="scss">
  .card-box {
    display: flex;
    border-radius: 10px;
    overflow: hidden;
  }
</style>
