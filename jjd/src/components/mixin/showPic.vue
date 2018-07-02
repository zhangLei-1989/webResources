<template>
  <div class="pics">
    <div class="pic"
         v-if="wxWKWebview && upload"
         v-for="pic in okPicUrls"
         :style="{backgroundImage:'url(' + base64pics[$index] + ')'}"
         :url="getUrl(pic)"
         track-by="$index"
         @click="showCurrent"></div>
    <div class="pic"
         v-if="!wxWKWebview || !upload"
         v-for="pic in okPicUrls"
         :style="{backgroundImage:'url(' + getUrl(pic) + ')'}"
         :url="getUrl(pic)"
         track-by="$index"
         @click="showCurrent"></div>
    <div class="pic upload"
         @click="choosePic"
         v-if="upload"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      picUrls: {
        default () {
          return []
        }
      },
      upload: {
        default () {
          return false
        }
      },
      credit: {}
    },
    data () {
      return {
        newUrl: '',
        wxWKWebview: window.__wxjs_is_wkwebview === true,
        base64pics: [],
      }
    },
    computed: {
      okPicUrls () {
        return this.picUrls.map(item => this.getUrl(item))
      }
    },
    methods: {
      showCurrent (e) {
        const current = e.target.getAttribute('url')
        const that = this
        window.wx.previewImage({
          current, // 当前显示图片的http链接
          urls: that.okPicUrls // 需要预览的图片http链接列表
        })
      },
      uploadPic (img) {
        const that = this
        const upLoadPromise = new Promise((resolve) => {
          window.wx.uploadImage({
            localId: img,
            // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1,
            // 默认为1，显示进度提示
            success (data) {
              const serverId = data.serverId
              that.$dispatch('upload-pic', {
                localId: img,
                serverId
              })
              resolve()
            }
          })
        })
        const getBase64Promise = new Promise((resolve) => {
          window.wx.getLocalImgData({
            localId: img,
            // 图片的localID
            success (res) {
              // localData是图片的base64数据，可以用img标签显示
              that.base64pics.push(res.localData)
              resolve()
            }
          })
        })
        if (this.wxWKWebview) {
          return Promise.all([upLoadPromise, getBase64Promise])
        }
        return upLoadPromise
      },
      oneByOne (list, i) {
        const that = this
        let k = i
        that.uploadPic(list[k]).then(() => {
          if (k < list.length - 1) {
            k += 1
            that.oneByOne(list, k)
          }
        })
      },
      choosePic () {
        const that = this
        window.wx.chooseImage({
          count: 9, // 默认9
          sizeType: ['original', 'compressed'],
          // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'],
          // 可以指定来源是相册还是相机，默认二者都有
          success (res) {
            // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            that.oneByOne(res.localIds, 0)
          }
        })
      },
      getUrl (id) {
        if (id.indexOf('wxLocalResource') > -1 || id.indexOf('wxlocalresource') > -1) {
          return id
        } else if (id.indexOf('http') > -1) {
          return id
        }
        if (this.credit) {
          return window.$config.creditQiniuUrl + id
        }
        return window.$config.qiniuUrl + id
      }
    }
  }
</script>

<style lang="scss"
       scoped>
  @import '../../scss/function';

  .pics {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-right: -10px;
    padding-bottom: 10px;
  }

  .pic {
    width: 50px;
    height: 50px;
    background-size: cover;
    background-position: center;
    margin: 10px 10px 0 0;
    position: relative;
    &::before {
      @extend %btn-border;
      border: 1px solid $BORDER_COLOR;
    }
  }

  .upload {
    background: url("../../assets/plus.svg") center no-repeat;
    background-size: 20px;
  }
</style>
