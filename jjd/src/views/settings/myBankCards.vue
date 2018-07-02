<template>
  <div v-show="loaded">
    <group>
      <div class="plus-box"
           v-if="list.length < 10"
           v-link="'/bindBankCard/'+pwdOk+'/1'">
        <div class="plus"></div>
      </div>
      <div class="bank-card"
           @click="toCardDetail(li)"
           v-for="li in computedList">
        <div class="checking"
             v-if="!li.b_valid">
          <div>银行处理中</div>
          <div>若5分钟仍未成功，可点击上方 "+" 再次提交</div>
        </div>
        <div class="name">{{li.c_bank_name || '银行卡'}}</div>
        <div class="number">
          <div v-for="dot in li.c_bank_account.length"
               class="num"
               :class="{star:li.c_bank_account.split('')[dot]=='*',space:dot%4==3}">
            {{li.c_bank_account.split('')[dot]}}
          </div>
        </div>
      </div>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import pay from 'api/pay'

  export default{
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        loaded: false,
        pwdOk: 1,
        list: []
      }
    },
    components: {},
    computed: {
      computedList () {
        return this.list.map((e) => {
          const f = Object.assign({}, e)
          f.c_bank_account = `************${e.c_bank_account}`
          return f
        })
      }
    },
    methods: {
      getPayInfo () {
        pay.checkCredit().then((json) => {
          this.pwdOk = json.b_set_pwd ? 1 : 0
          if (!json.bank_list || !json.bank_list.length) {
            this.$router.go({
              path: `/bindBankCard/${this.pwdOk}/0`,
              replace: true
            })
          } else {
            this.list = json.bank_list
            this.loaded = true
          }
        })
      },
      toCardDetail (li) {
        if (li.b_valid) {
          this.$router.go(`bankCardDetail/${li.id
            }/${li.c_bank_name || '银行卡'
            }/${li.c_bank_account.slice(-4)}`)
        }
      }
    },
    route: {},
    created () {
      this.getPayInfo()
    },
    attached () {
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/const";

  .bank-card {
    padding: 10px;
    background: linear-gradient(left, #7da7ce, #5f92c2);
    border-radius: 8px;
    color: white;
    margin: 0 10px 10px;
    position: relative;
  }

  .checking {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: $BACKDROP_COLOR;
    top: 0;
    left: 0;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: $TIP_FONT_SIZE;
    line-height: 1.6;
  }

  .plus-box {
    padding: 10px;
    border: 1px solid $BORDER_COLOR {
      radius: 8px;
    }
    margin: 0 10px 10px;
  }

  .plus {
    height: 60px;
    background: url("../../assets/plus.svg") center no-repeat {
      size: 30px;
    }
  }

  .name {
    font-weight: bold;
    margin-bottom: 20px;
  }

  .number {
    font-size: $LARGE_FONT_SIZE;
    display: flex;
    .num {
      width: 13px;
    }
    .star {
      color: transparent;
      background: url("../../assets/star.svg") center no-repeat {
        size: 6px;
      }
    }
    .space {
      margin-right: 8px;
    }
  }

  .inline-block {
    display: inline-block;
  }
</style>
