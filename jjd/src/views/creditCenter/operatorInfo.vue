<template>
  <div>
    <validator name="validator">
      <form novalidate
            v-if="needCode">
        <group :single="true"
               :fixed="true">
          <btn :cut="1"
               :next="true"
               :text="'提交验证'"
               :btn-fn="submitCode"></btn>
        </group>
        <group>
          <div slot="tip_top"
               class="tip">
            <ele>
              <div v-if="typeCode == '0'">已向 {{phone}} 的手机发送短信验证码</div>
              <div v-if="typeCode == '1'">请输入 {{phone}} 的手机的查询密码</div>
              <div v-if="typeCode == '2'">请输入图片验证码</div>
              <div v-if="typeCode == '3'">请输入 {{phone}} 的手机收到的短信验证码，并输入图片验证码</div>
            </ele>
          </div>
          <ele v-if="typeCode == '0'">
            <input growing-track="true"
                   type="text"
                   placeholder="请输入您收到的短信验证码"
                   v-model="code"
                   maxlength="10"
                   v-validate:code="validRules.code">
          </ele>
          <ele v-if="typeCode == '1'">
            <input growing-track="false"
                   type="password"
                   placeholder="请输入您的查询密码"
                   v-model="code"
                   maxlength="20"
                   v-validate:sp="validRules.searchPwd">
          </ele>
          <ele v-if="typeCode == '2'">
            <input growing-track="false"
                   type="text"
                   placeholder="请输入图中验证码"
                   v-model="code"
                   maxlength="10"
                   v-validate:pc="validRules.picCode">
            <div class="code-pic">
              <img :src="codeBase64"
                   alt="加载中"
                   v-if="codeBase64">
              <span v-else>加载中</span>
            </div>
          </ele>
          <ele v-if="typeCode == '3'">
            <input growing-track="true"
                   type="text"
                   placeholder="请输入您收到的短信验证码"
                   v-model="code"
                   maxlength="10"
                   v-validate:code="validRules.code">
          </ele>
          <ele v-if="typeCode == '3'">
            <input growing-track="false"
                   type="text"
                   placeholder="请输入图中验证码"
                   v-model="code2"
                   maxlength="10"
                   v-validate:pc="validRules.picCode">
            <div class="code-pic">
              <img :src="codeBase64"
                   alt="加载中"
                   v-if="codeBase64">
              <span v-else>加载中</span>
            </div>
          </ele>
        </group>
      </form>
      <form novalidate
            v-else>
        <group :single="true"
               :fixed="true">
          <btn :cut="1"
               :next="true"
               :text="'同意授权'"
               :btn-fn="submit"></btn>
        </group>
        <group>
          <ele>
            <div>手机号码</div>
            <input growing-track="true"
                   type="tel"
                   placeholder="请输入您的手机号码"
                   v-model="phone"
                   maxlength="15"
                   slot="right"
                   v-validate:phone="validRules.phone">
          </ele>
          <ele>
            <div>服务密码</div>
            <input growing-track="false"
                   type="password"
                   placeholder="请输入您的服务密码"
                   v-model="password"
                   maxlength="20"
                   slot="right"
                   v-validate:password="validRules.password">
          </ele>
        </group>
        <group>
          <div slot="tip_bottom"
               class="tip">
            <ele>
              <a @click="help1">授权失败的常见原因？</a>
              <a @click="help2">如何获取服务密码？</a>
            </ele>
          </div>
        </group>
        <group>
          <div slot="tip_bottom"
               class="tip">
            <ele>
              <div class="black">
                <header>
                  点击“同意授权”按钮表示接受如下内容：
                </header>
                <section>
                  <p>1、授权北京人人信科技有限公司获取以下信息包括但不限于姓名、身份证号、手机号码、通话记录，用于生成个人信用报告；</p>
                  <p>2、你的好友可查看你的手机号码使用时长、互通联系人数量、通话次数、通话时长以及短信条数、话费缴纳情况，以便甄别出借风险；</p>
                  <p>3、当你发生违约或其他影响信用的不良行为时，北京人人信科技有限公司有权利用相关信息向你的联系人发送提醒消息，如有需要还会向有关部门提供可能联系到你的电话号码、地址等信息，用于追究违约责任。</p>
                </section>
              </div>
            </ele>
          </div>
        </group>
      </form>
    </validator>
  </div>
</template>

<script type="text/ecmascript-6">
  import verify from 'components/mixin/verify'
  import codebtn from 'components/mixin/codebtn'
  import jxl from 'api/jxl'
  import {
    toggleWaiting
  } from 'store/actions'
  import { alert, confirm } from 'tools/utils'

  export default{
    mixins: [verify],
    vuex: {
      getters: {
        firstTime: state => state.firstTime,
        tel: state => state.userInfo.tel
      },
      actions: {
        toggleWaiting
      }
    },
    data () {
      return {
        phone: '',
        password: '',
        code: '',
        code2: '',
        needCode: false,
        taobaoOk: false,
        jingdongOk: false,
        typeCode: '0',
        loopTimes: 0,
        codeBase64: '',
        jjjh: false,
        alertImg: require('../../assets/warning.svg'),
      }
    },
    components: {
      codebtn
    },
    methods: {
      showRiskWarn () {
        const that = this
        confirm(
          ` <div class="operator">
              由于您所在地区的运营商临时下线 ，您可以跳过运营商认证，还可以通过认证其他信息，获得更多权益。
            </div>
            <div style="text-align: left; margin-top: 10px">
            </div><div id="no-more-tip"></div>`,
          '暂时跳过运营商认证',
          [{
            text: '再试试',
          }, {
            text: '跳过运营商认证',
            fn () {
              jxl.skipOperator(that.phone).then(() => {
                window.history.back()
              })
            }
          }],
          false,
          'operatorBox'
        )
      },
      submit () {
        this.toValidate(() => {
          if (this.jjjh) {
            this.toggleWaiting(true)
            jxl.operator2({
              name: this.phone,
              password: this.password,
              isCheckBaseInfo: 'no',
            }).then(() => {
              setTimeout(() => {
                this.loop()
              }, 3000)
            })
          } else {
            this.toggleWaiting(true)
            jxl.operator({
              tel: this.phone,
              password: this.password
            }).then(() => {
              setTimeout(() => {
                this.loop()
              }, 3000)
            })
          }
        })
      },
      loop () {
//        if (this.loopTimes < 1) {
//          this.getJxlList()
//        }
        this.loopTimes += 1
        jxl.loopOperator().then((json) => {
          if (json === 'taobao') {
            this.taobaoOk = true
          } else if (json === 'jingdong') {
            this.jingdongOk = true
          }
          this.submitOk()
        }).catch((json) => {
          if (json.code === 202) {
            setTimeout(() => {
              this.loop()
            }, 3000)
          } else {
            this.code = ''
            this.submitError(json)
          }
        })
      },
      getJxlList () {
        jxl.getJxlList().then((json) => {
          this.taobaoOk = json.includes('taobao')
          this.jingdongOk = json.includes('jingdong')
        })
      },
      submitOk () {
        this.toggleWaiting(false)
        if (this.jjjh) {
          window.history.back()
        } else if (this.taobaoOk) {
          this.$router.go({
            path: '/taobaoInfo',
            replace: true
          })
        } else if (this.jingdongOk) {
          this.$router.go({
            path: '/jingdongInfo',
            replace: true
          })
        } else {
          alert('信用报告正在生成中，大约需要 10 分钟，请注意查收微信推送消息。')
//          this.$router.go({
//            path: '/',
//            replace: true
//          })
          window.history.back()
        }
      },
      submitError (json) {
        this.toggleWaiting(false)
        const that = this
        switch (json.code) {
          case 2502: {
            that.showRiskWarn()
            break
          }
          case 201: {
            this.needCode = false
            alert(json.message || '运营商验证失败，请重新验证。')
            break
          }
          case 501: {
            this.needCode = false
            alert('运营商验证失败，请30分钟后再次验证。')
            break
          }
          case 1201: {
            const text1 = '您使用的号码不支持授权，请更换其它号码。'
            alert(text1)
            break
          }
          case 9999: {
            alert('您输入的图片验证码错误，请重新输入。')
            this.needCode = true
            this.codeBase64 = json.object
            break
          }
          case 10000: {
            alert('请输入短信验证码和图片验证码。')
            this.needCode = true
            this.typeCode = '3'
            this.codeBase64 = json.object
            break
          }
          case 10001: {
            alert('请输入图片验证码。')
            this.needCode = true
            this.typeCode = '2'
            this.codeBase64 = json.object
            break
          }
          case 10002: {
            this.needCode = true
            this.typeCode = '0'
            break
          }
          case 10003: {
            alert('用户名或密码错误，请重新输入。')
            this.needCode = false
            break
          }
          case 10017: {
            this.needCode = true
            this.typeCode = '0'
            break
          }
          case 10018: {
            this.needCode = true
            this.typeCode = '0'
            break
          }
          case 10022: {
            this.needCode = true
            this.typeCode = '1'
            break
          }
          case 10004: {
            alert('短信验证码错误，请重新输入。')
            break
          }
          case 10006: {
            alert('短信验证码错误，请重新输入。')
            break
          }
          case 10007: {
            alert('短信验证码错误，请重新认证。')
            window.history.back()
            break
          }
          case 10023: {
            alert('查询密码错误，请重新输入。')
            break
          }
          case 10099: {
            alert('正在为您的运营商进行授信，无需再次提交。')
            this.submitOk()
            break
          }
          case 30001: {
            alert('您的密码错误次数已达上限，请找回登录密码后再次认证，或3小时后重试。')
            break
          }
          case 30002: {
            alert('您登录失败次数过多，帐号已被锁定，请明天再试。')
            break
          }
          default: {
            this.needCode = false
            this.typeCode = '0'
            alert(json.message)
          }
        }
      },
      submitCode () {
        this.toValidate(() => {
          this.toggleWaiting(true)
          jxl.operatorCode({
            code1: this.code,
            code2: this.code2,
            type: this.typeCode,
          }).then(() => {
            setTimeout(() => {
              this.loop()
            }, 3000)
          })
        })
      },
      rf () {
        return false
      },
      goUrl (url) {
        if (url.indexOf('.') > -1) {
          window.location.href = `http://${url}`
        } else {
          window.location.href = `tel:${url}`
        }
      },
      help1 () {
        this.$router.go('/operatorHelp1')
      },
      help2 () {
        this.$router.go('/operatorHelp2')
      },
    },
    created () {
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
  @import '../../scss/const';

  header {
    color: $MAIN_COLOR;
    margin: 1em 0 .5em;
  }

  p {
    margin: .2em 0 .5em;
    text-align: justify;
  }

  h4 {
    margin: .5em 0 .2em;
  }

  .can-go {
    text-decoration: underline;
  }

  .black {
    color: black;
    font-size: 12px;
    padding: 0 10px;
    header {
      font-weight: bold;
      color: black;
    }
  }
</style>
