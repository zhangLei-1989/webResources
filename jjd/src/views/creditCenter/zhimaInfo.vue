<template>
  <div>
    <iframe v-if="url"
            id="iFrame1"
            name="iFrame1"
            onload="document.body.scrollTop = 0"
            class="frame"
            :src='url'></iframe>
    <div v-else>
      <group :fixed="true"
             :single="true">
        <btn :cut="1"
             :next="true"
             :btn-fn="submit"
             :text="'立即授权'"></btn>
      </group>
      <group>
        <ele>
          <div>姓名</div>
          <!--<input type="text"-->
          <!--placeholder="请输入真实姓名"-->
          <!--v-model="name"-->
          <!--slot="right">-->
          <div slot="right">{{name}}</div>
        </ele>
        <ele>
          <div>身份证号</div>
          <!--<input type="text"-->
          <!--placeholder="请输入身份证号"-->
          <!--v-model="idcard"-->
          <!--slot="right">-->
          <div slot="right">{{idcard}}</div>
        </ele>
        <ele>
          <div>注册手机号</div>
          <div slot="right">{{tel}}</div>
        </ele>
        <ele>
          <div>银行卡号</div>
          <div slot="right">{{bankcard}}</div>
        </ele>
        <div slot="tip_bottom"
             class="tip">
          <ele>
            <div>以上信息用于确认您的身份</div>
          </ele>
        </div>
      </group>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import user from 'api/creditCenterUser'
  import { alert } from 'tools/utils'

  export default{
    vuex: {
      getters: {
        userId: state => state.userInfo.userId
      }
    },
    data () {
      return {
        name: '',
        idcard: '',
        url: '',
        score: '',
        jjjh: false,
        tel: '',
        bankcard: '',
      }
    },
    methods: {
      init () {
        user.getZhiMaCreditParams().then((json) => {
          this.idcard = json.certNo
          this.name = json.userName
          this.tel = json.telephone
          this.bankcard = json.bankcardNo
        })
      },
      submit () {
        user.zhima({
          name: this.name,
          idcard: this.idcard,
          tel: this.tel,
          bankcard: this.bankcard,
        }).then((json) => {
          if (json.authorized) {
            this.score = json.zmScore
            this.$router.go({
              path: '/operatorInfo',
              replace: true
            })
          } else {
            this.url = 'https://jjd.renrenxin.com/redirect/title.html'
            setTimeout(() => {
              this.url = json.url
            }, 300)
          }
        })
      },
      getMessage (e) {
        const res = e.data
        if (res === 'ok') {
          this.url = ''
          if (this.jjjh) {
            window.history.back()
          } else {
            this.$router.go({
              path: '/operatorInfo',
              replace: true
            })
          }
        } else if (res === 'faile') {
          this.url = ''
          alert('认证失败，请重新认证')
        }
      },
      startGetMessage () {
        window.addEventListener('message', this.getMessage, false)
      },
      stopGetMessage () {
        window.removeEventListener('message', this.getMessage, false)
      }
    },
    created () {
      this.startGetMessage()
      this.init()
      window.localStorage.userId = this.userId
    },
    destroyed () {
      this.stopGetMessage()
    },
    route: {
      data ({ to: { params: { jjjh } } }) {
        return {
          jjjh: !!jjjh,
        }
      }
    }
  }
</script>

<style lang="scss"
       scoped>
  .frame {
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    height: 900px;
    /*min-height: 300px;*/
    border: none;
  }
</style>
