<template>
  <div v-if="loaded">
    <group :first="true">
      <ele class="cer-box">
        <div class="cer-bg">
          <div class="cer-line">
            <div>颁发给</div>
            <div>{{ownerName}}</div>
          </div>
          <div class="cer-line">
            <div>颁发者</div>
            <!--<div>iTrustChina Class 2 Enterprise Subcriber CA-G3</div>-->
            <div>天威诚信数字认证中心</div>
          </div>
          <div class="cer-line">
            <div>序列号</div>
            <div>{{cerNum}}</div>
          </div>
          <div class="cer-line">
            <div>有效期</div>
            <div>{{beginTime}} ~ {{endTime}}</div>
          </div>
          <div class="cer-line">
            <div>使用者</div>
            <div>{{userName}}</div>
          </div>
          <div class="cer-line">
            <div>付费方</div>
            <div>北京人人信科技有限公司</div>
          </div>
          <div class="cer-line">
            <div>证书说明</div>
            <div>数字证书由证书授权中心发行，具有安全唯一性。</div>
          </div>
        </div>
      </ele>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import ecloud from 'api/ecloud'
  import { confirm } from 'tools/utils'

  export default{
    vuex: {
      getters: {
        name: state => state.userInfo.nickname
      }
    },
    data () {
      return {
        userId: '',
        ownerName: '',
        cerNum: '',
        beginTime: '',
        endTime: '',
        userName: '',
        loaded: false
      }
    },
    components: {},
    methods: {
      getCaInfo (userId) {
        ecloud
          .getCertInfo(userId)
          .then((info) => {
            this.cerNum = info.serialNumber
            this.beginTime = info.certNotBefore
            this.endTime = info.certNotAfter
            this.ownerName = info.userName
            this.userName = info.userName
            if (!this.cerNum) {
              confirm(
                '您再完成一笔新的交易，就可以查看您的证书啦',
                '提示',
                [{
                  text: '知道了',
                  fn () {
                    window.history.back()
                  }
                }]
              )
            } else {
              this.loaded = true
            }
          })
      }
    },
    computed: {},
    route: {
      data ({ to: { params: { id } } }) {
        this.userId = id
        this.getCaInfo(this.userId)
      }
    }
  }
</script>
<style lang="scss"
       scoped>
  @import "../../scss/const";

  .cer-box {
    justify-content: center;
  }

  .cer-bg {
    background: url('../../../static/yiyunzhang_bg.png') no-repeat center {
      size: contain;
    }
  ;
    width: 320px;
    height: 300px;
    padding-top: 100px;
  }

  .cer-line {
    display: flex;
    font-size: 10px;
    margin-bottom: 5px;
    & > :first-child {
      width: 60px;
      text-align: right;
      padding-right: 5px;
      color: #6E97BA;
    }
  }
</style>
