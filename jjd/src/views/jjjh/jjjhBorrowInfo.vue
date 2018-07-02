<template>
  <div>
    <selector :show="typeSelectorShown"
              :default-data="type"
              :value-list="typeList"
              @set-data="setType"
              @toggle="toggleTypeSelectorShown"></selector>
    <date :show="date1Shown"
          @toggle="toggleDate1Shown"
          :default-date="date1"
          @set-date="setDate1"></date>
    <date :show="date2Shown"
          @toggle="toggleDate2Shown"
          :default-date="date2"
          @set-date="setDate2"></date>
    <group :fixed="true">
      <btn :text="'保存'"
           :cut="1"
           :next="true"
           :btn-fn="save"></btn>
    </group>
    <group :first="true">
      <ele>
        <div>平台全称</div>
        <input slot="right"
               type="text"
               placeholder="请输入平台全称"
               maxlength="10"
               v-model="name">
      </ele>
      <ele :more="true"
           @click="toggleTypeSelectorShown(true)">
        <div>平台形式</div>
        <div slot="right">{{type || '--请选择--'}}</div>
      </ele>
      <ele>
        <div>账号</div>
        <input slot="right"
               type="text"
               placeholder="请输入账号"
               maxlength="20"
               v-model="account">
      </ele>
      <ele>
        <div>密码</div>
        <input slot="right"
               type="password"
               placeholder="请输入密码"
               maxlength="20"
               v-model="password">
      </ele>
      <ele>
        <div>借款本金</div>
        <input slot="right"
               type="number"
               placeholder="请输入整数"
               v-model="amount">
        <div slot="unit">元</div>
      </ele>
      <ele>
        <div>年化利率</div>
        <input slot="right"
               type="number"
               placeholder="请输入整数"
               v-model="rate">
        <div slot="unit">%</div>
      </ele>
      <ele>
        <div>已还金额</div>
        <input slot="right"
               type="number"
               placeholder="请输入已还金额"
               v-model="repaid">
        <div slot="unit">元</div>
      </ele>
      <ele>
        <div>待还金额</div>
        <input slot="right"
               type="number"
               placeholder="请输入待还金额"
               v-model="toRepay">
        <div slot="unit">元</div>
      </ele>

      <ele :more="true"
           @click="toggleDate1Shown(true)">
        <div>借款日期</div>
        <div slot="right">{{date1.y}}-{{date1.m}}-{{date1.d}}</div>
      </ele>
      <ele :more="true"
           @click="toggleDate2Shown(true)">
        <div>应还日期</div>
        <div slot="right">{{date2.y}}-{{date2.m}}-{{date2.d}}</div>
      </ele>
    </group>
    <group>
      <div slot="tip_top"
           class="tip">
        <div>
          借款用途（≤10字）
        </div>
      </div>
      <ele>
        <textarea maxlength="10"
                  v-model="reason"
                  placeholder="务必填写真实借款用途(≤10字)"
        ></textarea>
      </ele>
    </group>
    <group>
      <div slot="tip_top"
           class="tip">
        <div>
          请上传关键证据证明该笔款项去向（最多9张）
        </div>
      </div>
      <ele>
        <show-pic :pic-urls="picUrls1"
                  @upload-pic="uploaded1"
                  :upload="picUrls1.length < 9"></show-pic>
      </ele>
    </group>
    <group>
      <div slot="tip_top"
           class="tip">
        <div>
          请上传完整的借款协议截图（最多9张）
        </div>
      </div>
      <ele>
        <show-pic :pic-urls="picUrls2"
                  @upload-pic="uploaded2"
                  :upload="picUrls2.length < 9"></show-pic>
      </ele>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import date from 'components/mixin/date'
  import selector from 'components/mixin/selector'
  import showPic from 'components/mixin/showPic'
  import jjjh from 'api/jjjh'
  import {
    setTempInfo,
  } from 'store/actions'
  import { alert } from 'tools/utils'

  export default{
    vuex: {
//      getters: {
//        jjjhList: state => state.temp.jjjhList, // 读取表单缓存
//      },
      actions: {
        setTempInfo,
      }
    },
    data () {
      const d = new Date((new Date()).getTime() + 2 * 24 * 3600 * 1000)
      return {
        count: 0,
        id: '',
        detailId: '',
        date1Shown: false,
        date2Shown: false,
        typeSelectorShown: false,
        date1: {
          y: d.getFullYear(),
          m: d.getMonth() + 1,
          d: d.getDate()
        },
        date2: {
          y: d.getFullYear(),
          m: d.getMonth() + 1,
          d: d.getDate()
        },
        type: '',
        typeList: [
          'APP',
          '公众号',
          '网站',
          '其他',
        ],
        name: '',
        account: '',
        password: '',
        amount: '',
        rate: '',
        repaid: '',
        toRepay: '',
        reason: '',
        picUrls1: [],
        uploadUrls1: [],
        picUrls2: [],
        uploadUrls2: [],
        jjjhList: [],
        pid: '',
      }
    },
    components: {
      date,
      selector,
      showPic,
    },
    computed: {
      jjjhError () {
        const list = []
        if (this.name === '') {
          list.push('请输入平台名称')
        }
        if (this.type === '') {
          list.push('请选择平台形式')
        }
        if (this.account === '') {
          list.push('请输入账号')
        }
        if (this.password === '') {
          list.push('请输入密码')
        }
        if (this.amount === '') {
          list.push('请输入借款本金')
        }
        if (this.rate === '') {
          list.push('请输入借款利率')
        }
        if (this.repaid === '') {
          list.push('请输入已还金额')
        }
        if (this.toRepay === '') {
          list.push('请输入待还金额')
        }
        if (this.reason === '') {
          list.push('请输入借款理由')
        }
        if (!this.picUrls1.length && !this.uploadUrls1.length) {
          list.push('请至少上传一张款项去向的截图')
        }
        if (!this.picUrls2.length && !this.uploadUrls2.length) {
          list.push('请至少上传一张借款协议的截图')
        }
        if (this.date2.y < this.date1.y) {
          list.push('请填写正确的日期')
        }
        if (this.date2.y === this.date1.y && this.date2.m < this.date2.m) {
          list.push('请填写正确的日期')
        }
        if (this.date2.y === this.date1.y && this.date2.m === this.date1.m
          && this.date2.d < this.date1.d) {
          list.push('请填写正确的日期')
        }
        return list
      }
    },
    methods: {
      toggleDate1Shown (e) {
        this.date1Shown = e
      },
      setDate1 (dateObject) {
        this.date1 = dateObject
      },
      toggleDate2Shown (e) {
        this.date2Shown = e
      },
      setDate2 (dateObject) {
        this.date2 = dateObject
      },
      toggleTypeSelectorShown (e) {
        this.typeSelectorShown = e
      },
      setType (type) {
        this.type = type
      },
      uploaded1 (obj) {
        this.picUrls1.push(obj.localId)
        this.uploadUrls1.push(obj.serverId)
      },
      uploaded2 (obj) {
        this.picUrls2.push(obj.localId)
        this.uploadUrls2.push(obj.serverId)
      },
      save () {
        if (this.jjjhError.length > 0) {
          let errors = ''
          this.jjjhError.forEach((err) => {
            errors += `${err}<br>`
          })
          alert(errors)
        } else {
          this.toSave()
        }
      },
      toSave (fn) {
        const d1 = new Date(this.date1.y, parseInt(this.date1.m, 10) - 1, this.date1.d)
        const d2 = new Date(this.date2.y, parseInt(this.date2.m, 10) - 1, this.date2.d)
        jjjh.updateIouInfo({
          count: this.count,
          id: this.id,
          detailId: this.detailId,
          name: this.name,
          type: this.type,
          account: this.account,
          password: this.password,
          amount: this.amount,
          rate: this.rate,
          repaid: this.repaid || 0,
          toRepay: this.toRepay || 0,
          date1: d1.getTime(),
          date2: d2.getTime(),
          reason: this.reason,
          pic1: this.uploadUrls1,
          pic2: this.uploadUrls2,
        }).then((res) => {
          this.uploadUrls1 = []
          this.uploadUrls2 = []
          if (fn) {
            this.detailId = this.detailId || res.c_detail_id
            fn()
          } else {
            window.history.back()
          }
        }).catch(() => {
          fn()
        })
      },
      autoSave () {
        this.toSave(() => {})
      },
    },
    created () {
    },
    route: {
      data ({ to: { params: { id, count, detailId } } }) {
        jjjh.getIouInfo().then((res) => {
          this.jjjhList = res.l_iou_detail_list
          this.id = id
          this.count = parseInt(count, 10)
          if (detailId !== '0') {
            this.detailId = detailId
          }
          if (this.jjjhList[0]) {
            this.jjjhList.forEach((li) => {
              if (parseInt(li.id, 10) === parseInt(this.detailId, 10)) {
                const d1 = new Date(li.t_loan_tm)
                this.date1 = {
                  y: d1.getFullYear(),
                  m: d1.getMonth() + 1,
                  d: d1.getDate()
                }
                const d2 = new Date(li.t_repay_tm)
                this.date2 = {
                  y: d2.getFullYear(),
                  m: d2.getMonth() + 1,
                  d: d2.getDate()
                }
                let type = ''
                if (li.n_plat_type === 1) {
                  type = 'APP'
                } else if (li.n_plat_type === 2) {
                  type = '公众号'
                } else if (li.n_plat_type === 3) {
                  type = '网站'
                } else {
                  type = '其他'
                }
                this.type = type
                this.name = li.c_plat_name
                this.account = li.c_plat_uname
                this.password = li.c_plat_pwd
                this.amount = li.n_loan_amt
                this.rate = li.n_loan_rate
                this.repaid = li.n_already_repaid_amt
                this.toRepay = li.n_to_repay_amt
                this.reason = li.c_loan_use
                this.picUrls1 = li.l_evidence_upload_img || []
                this.picUrls2 = li.l_protocol_upload_img || []
              }
            })
          }
        })
        const that = this
        this.pid = setInterval(() => {
          that.autoSave()
        }, 10000)
      }
    },
    destroyed () {
      const that = this
      this.toSave(() => {
        clearInterval(that.pid)
      })
    },
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
</style>
