<template>
  <div>
    <city :show="cityShown"
          @toggle="toggleCityShown"
          :default-city="data.city"
          @set-city="setCity"></city>
    <selector :show="contact1typeSelectorShown"
              :default-data="data.contact1type"
              :value-list="contactList1"
              @set-data="setContact1type"
              @toggle="toggleContact1typeSelectorShown"></selector>
    <selector :show="contact2typeSelectorShown"
              :default-data="data.contact2type"
              :value-list="contactList2"
              @set-data="setContact2type"
              @toggle="toggleContact2typeSelectorShown"></selector>
    <validator name="validator">
      <group :fixed="true">
        <btn :cut="1"
             :next="true"
             :text="singleStep ? '完成' : '下一步'"
             :btn-fn="submit"></btn>
      </group>
      <group>
        <div slot="tip_top"
             class="tip">
          <ele>
            <div>本人信息</div>
          </ele>
        </div>
        <ele>
          <div>微信号</div>
          <input growing-track="true"
                 type="text"
                 placeholder="请输入您的微信号"
                 maxlength="20"
                 slot="right"
                 v-model="data.wxAccount"
                 v-validate:wx="validRules.wxAccount">
        </ele>
        <ele @click="showCity"
             :more="true">
          <div class="address">现居住地区
          </div>
          <div slot="right">{{data.cityCombine||'--请选择地址--'}}
            <input growing-track="true"
                   type="hidden"
                   v-model="data.cityCombine"
                   v-validate:addr="validRules.address">
          </div>
        </ele>
        <ele :hide="!data.cityCombine">
          <div class="address">详细地址</div>
          <input growing-track="true"
                 type="text"
                 placeholder="请具体到小区门牌号"
                 maxlength="20"
                 slot="right"
                 v-model="data.addressDetail"
                 v-validate:addr="validRules.address">
        </ele>
      </group>
      <group>
        <div slot="tip_top"
             class="tip">
          <ele>
            <div>紧急联系人1</div>
          </ele>
        </div>
        <ele :more="true"
             @click="toggleContact1typeSelectorShown(true)">
          <div>TA是我的</div>
          <div slot="right">{{data.contact1type||'--请选择--'}}</div>
        </ele>
        <ele>
          <div>联系人姓名</div>
          <input growing-track="true"
                 type="text"
                 placeholder="请输入该联系人真实姓名"
                 v-model="data.contact1name"
                 slot="right"
                 maxlength="10"
                 v-validate:cn1="validRules.contactName">
        </ele>
        <ele>
          <div>联系人电话</div>
          <input growing-track="true"
                 type="tel"
                 placeholder="请输入该联系人电话"
                 v-model="data.contact1tel"
                 maxlength="15"
                 slot="right"
                 v-validate:cp1="validRules.contactPhone">
        </ele>
      </group>
      <group>
        <div slot="tip_top"
             class="tip">
          <ele>
            <div>紧急联系人2</div>
          </ele>
        </div>
        <ele :more="true"
             @click="toggleContact2typeSelectorShown(true)">
          <div>TA是我的</div>
          <div slot="right">{{data.contact2type||'--请选择--'}}</div>
        </ele>
        <ele>
          <div>联系人姓名</div>
          <input growing-track="true"
                 type="text"
                 placeholder="请输入该联系人真实姓名"
                 v-model="data.contact2name"
                 maxlength="10"
                 slot="right"
                 v-validate:cn2="validRules.contactName">
        </ele>
        <ele>
          <div>联系人电话</div>
          <input growing-track="true"
                 type="tel"
                 placeholder="请输入该联系人电话"
                 v-model="data.contact2tel"
                 maxlength="15"
                 slot="right"
                 v-validate:cp2="validRules.contactPhone">
        </ele>
      </group>
    </validator>
  </div>
</template>

<script type="text/ecmascript-6">
  import verify from 'components/mixin/verify'
  import selector from 'components/mixin/selector'
  import {
    setAddress,
    setTempInfo,
    setCreditCenter
  } from 'store/actions'
  import creditCenterUser from 'api/creditCenterUser'
  import city from 'components/mixin/city'
  import { alert } from 'tools/utils'

  export default{
    mixins: [verify],
    vuex: {
      getters: {
        baseInfo: store => store.temp.baseInfo // 读取表单缓存
      },
      actions: {
        setAddress,
        setTempInfo,
        setCreditCenter
      }
    },
    data () {
      return {
        data: {
          wxAccount: '',
          addressDetail: '',
          contact1name: '',
          contact1type: '',
          contact1tel: '',
          contact2name: '',
          contact2type: '',
          contact2tel: '',
          city: {
            p: {
              name: '',
              code: ''
            },
            c: {
              name: '',
              code: ''
            },
            d: {
              name: '',
              code: ''
            }
          },
          cityCombine: ''
        },
        contact1typeSelectorShown: false,
        contact2typeSelectorShown: false,
        contactList1: [
          '配偶',
          '父母',
          '兄弟姐妹',
          '子女',
        ],
        contactList2: [
          '父母',
          '兄弟姐妹',
          '子女',
          '同事',
          '同学',
          '朋友',
        ],
        haveCredit: false,
        paidCredit: false,
        cityShown: false,
        skipZhima: true,
        singleStep: false
      }
    },
    components: {
      selector,
      city
    },
    methods: {
      showCity () {
        this.cityShown = true
      },
      toggleCityShown (e) {
        this.cityShown = e
      },
      setCity (cityObject) {
        this.data.city = cityObject
        if (this.data.city.p.name) {
          this.data.cityCombine =
            `${this.data.city.p.name}-${this
              .data.city.c.name}-${this.data.city.d.name}`
        }
      },
      toggleContact1typeSelectorShown (e) {
        this.contact1typeSelectorShown = e
      },
      setContact1type (type) {
        this.data.contact1type = type
      },
      toggleContact2typeSelectorShown (e) {
        this.contact2typeSelectorShown = e
      },
      setContact2type (type) {
        this.data.contact2type = type
      },
      payInit () {
        creditCenterUser.payInit().then((json) => {
          this.paidCredit = json.b_paid
        })
      },
      init () {
        creditCenterUser.getCreditList().then((json) => {
          this.haveCredit = json.b_zhima_credit &&
            json.b_mobile_info &&
            json.b_jingdong_info
          if (this.haveCredit) {
            this.setCreditCenter({
              first: false,
              updateBaseInfo: false
            })
          } else {
            this.setCreditCenter({
              first: true,
              updateBaseInfo: false
            })
          }
        })
      },
      submit () {
        this.toValidate(() => {
          if (this.data.contact1tel === this.data.contact2tel) {
            alert('紧急联系人的手机号码不能重复')
            return
          }
          creditCenterUser.saveBaseInfo({
            pCode: this.data.city.p ? this.data.city.p.code : '',
            cCode: this.data.city.c ? this.data.city.c.code : '',
            dCode: this.data.city.d ? this.data.city.d.code : '',
            pName: this.data.city.p ? this.data.city.p.name : '',
            cName: this.data.city.c ? this.data.city.c.name : '',
            dName: this.data.city.d ? this.data.city.d.name : '',
            wxAccount: this.data.wxAccount,
            address: `${this.data.cityCombine} ${this
              .data.addressDetail}`,
            contact1name: this.data.contact1name,
            contact1type: this.data.contact1type,
            contact1tel: this.data.contact1tel,
            contact2name: this.data.contact2name,
            contact2type: this.data.contact2type,
            contact2tel: this.data.contact2tel
          }).then(() => {
            if (this.singleStep) {
              window.history.back()
            } else if (this.paidCredit) {
              if (this.skipZhima) {
                this.$router.go({
                  path: '/operatorInfo',
                  replace: true
                })
              } else {
                this.$router.go({
                  path: '/zhimaInfo',
                  replace: true
                })
              }
            } else {
              this.$router.go({
                path: '/noCredit',
                replace: true
              })
            }
          })
        })
      },
      rf () {
        return false
      },
      getBaseInfo () {
        if (!this.baseInfo.wxAccount) {
          // 无缓存才去后台请求
          creditCenterUser.getBaseInfo().then((json) => {
            if (!json) return
            const {
              c_wechat_id: wxAccount,
              c_home_addr: address,
              level_1_code: code1,
              level_1_name: name1,
              level_2_code: code2,
              level_2_name: name2,
              level_3_code: code3,
              level_3_name: name3
            } = json
            const data = this.data
            data.wxAccount = wxAccount
            data.addressDetail = address
              .replace(address.split(' ', 2)[0], '')
              .trim()
            this.setCity({
              p: {
                code: code1,
                name: name1 || ''
              },
              c: {
                code: code2,
                name: name2 || ''
              },
              d: {
                code: code3,
                name: name3 || ''
              }
            })
            if (json.l_contacts) {
              data.contact1name = json.l_contacts[0].contact_name
              data.contact1type = json.l_contacts[0].contact_type
              data.contact1tel = json.l_contacts[0].contact_tel
              data.contact2name = json.l_contacts[1].contact_name
              data.contact2type = json.l_contacts[1].contact_type
              data.contact2tel = json.l_contacts[1].contact_tel
            }
            this.setAddress({
              cityCombine: address.split(' ', 2)[0],
              city: {
                p: {
                  name: name1,
                  code: code1
                },
                c: {
                  name: name2,
                  code: code2
                },
                d: {
                  name: name3,
                  code: code3
                }
              }
            })
          })
        }
      }
    },
    created () {
      // 应用表单缓存
      Object.assign(this.data, this.baseInfo)
      // 2017-1-1 不要跳过芝麻信用
      const today = Date.now()
      const startDay = new Date('2017-01-01T02:00+08:00').getTime()
//            const endDay = new Date('2016-12-19T10:00+08:00').getTime()
      if (today > startDay) {
        this.skipZhima = false
      }
      this.getBaseInfo()
      this.init()
      this.payInit()
    },
    route: {
      data ({ to: { params: { single } } }) {
        if (single) {
          this.singleStep = true
        }
      },
      deactivate ({ next }) {
        // 缓存表单
        this.setTempInfo({ baseInfo: this.data })
        next()
      }
    }
  }
</script>

<style scoped>
    .address {
        min-width: 70px;
    }

    .address + div {
        flex: 1;
        text-align: right;
    }

</style>
