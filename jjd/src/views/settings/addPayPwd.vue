<template>
  <div>
    <div class="pwd-tip">
      <div class="step">
        <div class="ok">1</div>
        <div class="line ok"></div>
        <div class="ok">2</div>
      </div>
      <div class="desc">
        <div>设置</div>
        <div>确认</div>
      </div>
    </div>
    <div class="box">
      <div id="pwd">
        <input type="hidden"
               v-model="realPwd">
        <span class="pwd-box"></span>
        <span class="pwd-box"></span>
        <span class="pwd-box"></span>
        <span class="pwd-box"></span>
        <span class="pwd-box"></span>
        <span class="pwd-box"></span>
      </div>
    </div>
    <div id="touch-keybord"
         @touchstart.stop.prevent="startPos"
         @touchmove.stop.prevent="movePos"
         @touchend.stop.prevent="endPos">
      <border-box :cut="3">
        <div class="keybord-btn b1"
             :class="{ 'is-hover': cur == '1' }">1
        </div>
      </border-box>
      <border-box :cut="3">
        <div class="keybord-btn b2"
             :class="{ 'is-hover': cur == '2' }">2
        </div>
      </border-box>
      <border-box :cut="3">
        <div class="keybord-btn b3"
             :class="{ 'is-hover': cur == '3' }">3
        </div>
      </border-box>
      <border-box :cut="3">
        <div class="keybord-btn b4"
             :class="{ 'is-hover': cur == '4' }">4
        </div>
      </border-box>
      <border-box :cut="3">
        <div class="keybord-btn b5"
             :class="{ 'is-hover': cur == '5' }">5
        </div>
      </border-box>
      <border-box :cut="3">
        <div class="keybord-btn b6"
             :class="{ 'is-hover': cur == '6' }">6
        </div>
      </border-box>
      <border-box :cut="3">
        <div class="keybord-btn b7"
             :class="{ 'is-hover': cur == '7' }">7
        </div>
      </border-box>
      <border-box :cut="3">
        <div class="keybord-btn b8"
             :class="{ 'is-hover': cur == '8' }">8
        </div>
      </border-box>
      <border-box :cut="3">
        <div class="keybord-btn b9"
             :class="{ 'is-hover': cur == '9' }">9
        </div>
      </border-box>
      <border-box :cut="3">
        <div class="keybord-btn bc"
             :class="{ 'is-hover': cur == 'c' }">AC
        </div>
      </border-box>
      <border-box :cut="3">
        <div class="keybord-btn b0"
             :class="{ 'is-hover': cur == '0' }">0
        </div>
      </border-box>
      <border-box :cut="3">
        <div class="keybord-btn bd"
             :class="{ 'is-hover': cur == 'd' }">
        </div>
      </border-box>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import md5 from 'js-md5'
  import borderBox from 'components/mixin/borderBox'
  import user from 'api/user'
  import pay from 'api/pay'
  import { alert, feedback } from 'tools/utils'

  export default {
    data () {
      return {
        show: true,
        next: false,
        disabled: true,
        x: 0,
        y: 0,
        realPwd: '',
        pre: '',
        cur: '',
        creditOk: false
      }
    },
    watch: {
      realPwd (e) {
        if (e.length === 6) {
          this.addPwd()
        }
      }
    },
    methods: {
      toggleShowKeyboard (e) {
        this.show = e
      },
      startPos (e) {
        const p = e.touches[0]
        this.x = p.pageX
        this.y = p.clientY
        this.doSomething()
      },
      movePos () {
      },
      endPos () {
        this.cur = ''
      },
      close () {
        this.show = false
      },
      doSomething () {
        const ww = window.innerWidth
        const wh = window.innerHeight
        const bw = ww / 3
        const bh = 50
        const x = this.x
        let num = ''
        let y = this.y

        y = wh - y
        if (x > 0 && x < bw) {
          if (y > 0 && y < bh) {
            num = 'c'
          } else if (y > bh && y < 2 * bh) {
            num = '7'
          } else if (y > 2 * bh && y < 3 * bh) {
            num = '4'
          } else if (y > 3 * bh && y < 4 * bh) {
            num = '1'
          }
        } else if (x > bw && x < 2 * bw) {
          if (y > 0 && y < bh) {
            num = '0'
          } else if (y > bh && y < 2 * bh) {
            num = '8'
          } else if (y > 2 * bh && y < 3 * bh) {
            num = '5'
          } else if (y > 3 * bh && y < 4 * bh) {
            num = '2'
          }
        } else if (x > 2 * bw && x < 3 * bw) {
          if (y > 0 && y < bh) {
            num = 'd'
          } else if (y > bh && y < 2 * bh) {
            num = '9'
          } else if (y > 2 * bh && y < 3 * bh) {
            num = '6'
          } else if (y > 3 * bh && y < 4 * bh) {
            num = '3'
          }
        }
        this.cur = num
        if (num === 'd') {
          const txtLen = this.realPwd.length
          const dom = document
            .getElementsByClassName('pwd-box')[txtLen - 1]
          if (dom) {
            dom.innerHTML = ''
          }
          this.realPwd
            = this.realPwd.slice(0, this.realPwd.length - 1)
        } else if (num === 'c') {
          this.realPwd = ''
          for (let i = 0; i < 9; i += 1) {
            const dom = this.$el.querySelectorAll('#pwd span')[i]
            if (dom) {
              dom.innerHTML = ''
            }
          }
        } else {
          this.realPwd += num
          this.realPwd = this.realPwd.slice(0, 6)
          const txtLen = this.realPwd.length
          if (txtLen === 6) {
            this.show = false
            this.next = true
            this.disabled = false
          } else {
            this.show = true
            this.next = false
            this.disabled = true
          }
          for (let i = 0; i <= txtLen; i += 1) {
            if (this.realPwd[i]) {
              const dom = this.$el.querySelectorAll('.pwd-box')[i]
              if (dom) {
                dom.innerHTML
                  = this.realPwd[i]
                dom.innerHTML
                  = '<span style="height: 10px;' +
                  'width: 10px;background-color: black;' +
                  'border-radius: 100%"></span>'
              }
            }
          }
        }
      },
      addPwd () {
        if (this.pre === md5(md5(this.realPwd))) {
          user.addPayPassword(
            this.pre
          ).then(() => {
            feedback('密码设置成功')
            if (this.creditOk) {
              window.history.go(-1)
            } else {
              this.$router.go({
                path: '/updateCreditInfoMy',
                replace: true
              })
            }
          }).catch(() => {
            this.$router.go({
              path: '/preInputPayPwd/add',
              replace: true
            })
          })
        } else {
          alert('您两次输入的密码不一致，请重新输入')
          this.$router.go({
            path: '/preInputPayPwd/add',
            replace: true
          })
        }
      },
      getPayInfo () {
        pay.checkCredit().then((json) => {
          this.creditOk = json.b_credit
        })
      }
    },
    components: {
      borderBox
    },
    route: {
      data ({ to: { params: { pre } } }) {
        return {
          pre
        }
      }
    },
    created () {
      this.getPayInfo()
    }
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/fragment';

  .hidden {
    display: none;
  }

  .keyboard {
    height: 400px;
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: white;
    z-index: 50;
  }

  .box {
    /*height: 60px; */
    display: flex;
    width: 100%;
    height: 140px;
    text-align: center;
  }

  #pwd {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .pwd-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    width: 48px;
    line-height: 48px;
    text-align: center;
    position: relative;
    margin: 2px;
    background-color: white;
    &::before {
      @extend %btn-border;
      border: 1px solid $BORDER_COLOR;
    }
  }

  #touch-keybord {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $ELE_W_COLOR;
    overflow: hidden;
    font-size: $BASE_FONT_SIZE;
  }

  #touch-keybord div {
    height: 50px;
    float: left;
    text-align: center;
    line-height: 50px;
    width: 33.33%;
    font-size: $LARGE_FONT_SIZE;
  }

  .bc,
  .bd {
    background-color: #D1D5DB;
  }

  .bd {
    background: #D1D5DB url("../../assets/delete.svg") center no-repeat {
      size: 30px;
      position: center;
    }
  }

  #touch-keybord div.is-hover {
    background-color: #eee;
  }

  .keybord-btn {
    text-align: center;
    width: 100% !important;
  }

  .active .selector {
    will-change: transform;
  }

  .pwd-tip {
    @extend %pwd-tip;
  }
</style>
