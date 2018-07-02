<template>
  <div>
    <validator name="validator">
      <group :first="true">
        <ele>
          <div slot="left">品牌类型</div>
          <input growing-track="true"
                 slot="right"
                 v-model="carTypes"
                 maxlength="20"
                 placeholder="请输入车辆品牌类型"
                 v-validate:cartypes="validRules.cartypes"/>
        </ele>
        <ele :more="true"
             @click="toggleMileageShown(true)">
          <div>行驶里程</div>
          <div slot="right"
               class="flex">
            <div>{{mileage}}</div>
          </div>
        </ele>
        <ele>
          <div slot="left">购买价格</div>
          <input growing-track="true"
                 slot="right"
                 v-model="carPrice"
                 maxlength="10"
                 placeholder="请输入整数"
                 v-validate:price="validRules.price"/>
          <div slot="unit">万元</div>
        </ele>
        <ele :more="true"
             @click="togglePayStatusShown(true)">
          <div>付款状态</div>
          <div slot="right"
               class="flex">
            <div>{{payStatus}}</div>
          </div>
        </ele>
        <ele v-if="payStatus === '分期付款中'">
          <div slot="left">已支付</div>
          <input growing-track="true"
                 slot="right"
                 v-model="havePay"
                 maxlength="10"
                 placeholder="请输入整数"
                 v-validate:havepay="validRules.havepay"/>
          <div slot="unit">万元</div>
        </ele>
        <ele :more="true">
          <div>登记城市</div>
          <div slot="right">
            <button @click="showCity">
              {{city.p ? city.p.name : ''}}
              -
              {{city.c ? city.c.name : ''}}
              {{city.d ? '-' + city.d.name : ''}}
            </button>
          </div>
        </ele>
        <ele :more="true"
             @click="toggleCarAgeShown(true)">
          <div>车龄</div>
          <div slot="right"
               class="flex">
            <div>{{carAge}}</div>
          </div>
        </ele>
        <ele :more="true"
             @click="toggleSecondHandShown(true)">
          <div>是否为二手车</div>
          <div slot="right"
               class="flex">
            <div>{{secondHand}}</div>
          </div>
        </ele>
        <ele :more="true"
             @click="toggleMortgageShown(true)">
          <div>是否抵押过</div>
          <div slot="right"
               class="flex">
            <div>{{mortgage}}</div>
          </div>
        </ele>

      </group>

      <group :single="true"
             :fixed="true">
        <btn :cut="1"
             :text="'确认提交'"
             :next="true"
             :btn-fn="postCarInfo">
        </btn>
      </group>

      <group>
        <ele class="no-line ">
          <div class="tips">
            请上传您本人的车辆登记证、购车发票、车身照片、保险单等车产证明图片，要求清晰真实，不可后期处理（不超过9张）
          </div>
        </ele>
        <ele>
          <show-pic :upload="true"
                    :pic-urls="picUrls"
                    @upload-pic="uploaded"
                    :credit="true"></show-pic>
        </ele>
      </group>

      <city :show="cityShown"
            @toggle="toggleCityShown"
            :default-city="city"
            @set-city="setCity"
            :two-level="true"></city>
      <selector :show="drivenMileageShown"
                :default-data="mileage"
                :value-list="mileageList"
                @set-data="setMileage"
                @toggle="toggleMileageShown"></selector>
      <selector :show="payStatusShown"
                :default-data="payStatus"
                :value-list="payStatusList"
                @set-data="setPayStatus"
                @toggle="togglePayStatusShown"></selector>
      <selector :show="carAgeShown"
                :default-data="carAge"
                :value-list="carAgeList"
                @set-data="setCarAge"
                @toggle="toggleCarAgeShown"></selector>
      <selector :show="secondHandShown"
                :default-data="secondHand"
                :value-list="secondHandList"
                @set-data="setSecondHand"
                @toggle="toggleSecondHandShown"></selector>
      <selector :show="mortgageShown"
                :default-data="mortgage"
                :value-list="mortgageList"
                @set-data="setMortgage"
                @toggle="toggleMortgageShown"></selector>
    </validator>
  </div>

</template>
<script type="text/ecmascript-6">
  import creditCenterUser from 'api/creditCenterUser'
  import selector from 'components/mixin/selector'
  import showPic from 'components/mixin/showPic'
  import city from 'components/mixin/city'
  import verify from 'components/mixin/verify'
  import {
    setTempInfo
  } from 'store/actions'

  export default{
    mixins: [verify],
    vuex: {
      getters: {
        carInfo: store => store.temp.carInfo // 读取表单缓存
      },
      actions: {
        setTempInfo
      }
    },
    data () {
      return {
        carTypes: '',
        carPrice: '',
        havePay: '',
        cityShown: false,
        city: {
          p: {
            name: ['北京'],
            code: '110000'
          },
          c: {
            name: ['北京'],
            code: '110100'
          },
          d: {
            name: '',
            code: ''
          }
        },
        picUrls: [],
        uploadUrls: [],
        mileage: '1万公里内',
        drivenMileageShown: false,
        mileageList: [
          '1万公里内',
          '1-3万公里内',
          '3-5万公里内',
          '5-8万公里内',
          '8-10万公里内',
          '10万公里以上'
        ],
        payStatus: '全款已付清',
        payStatusShown: false,
        payStatusList: [
          '全款已付清',
          '分期已付清',
          '分期付款中'
        ],
        carAge: '1年以内',
        carAgeShown: false,
        carAgeList: [
          '1年以内',
          '1-3年',
          '3-5年',
          '5-6年',
          '6年以上'
        ],
        secondHand: '否',
        secondHandShown: false,
        secondHandList: [
          '否',
          '是'
        ],
        mortgage: '否',
        mortgageShown: false,
        mortgageList: [
          '否',
          '是'
        ]
      }
    },
    methods: {
      showCity () {
        this.cityShown = true
      },
      toggleCityShown (e) {
        this.cityShown = e
      },
      setCity (cityObject) {
        this.city = cityObject
      },
      uploaded (obj) {
        this.picUrls.push(obj.localId)
        this.uploadUrls.push(obj.serverId)
      },
      toggleMileageShown (e) {
        this.drivenMileageShown = e
      },
      setMileage (mileageObject) {
        this.mileage = mileageObject
      },
      togglePayStatusShown (e) {
        this.payStatusShown = e
      },
      setPayStatus (payStatusObject) {
        this.payStatus = payStatusObject
      },
      toggleCarAgeShown (e) {
        this.carAgeShown = e
      },
      setCarAge (carAgeObject) {
        this.carAge = carAgeObject
      },
      toggleSecondHandShown (e) {
        this.secondHandShown = e
      },
      setSecondHand (secondHandObject) {
        this.secondHand = secondHandObject
      },
      toggleMortgageShown (e) {
        this.mortgageShown = e
      },
      setMortgage (mortgageObject) {
        this.mortgage = mortgageObject
      },
      postCarInfo () {
        this.toValidate(() => {
          creditCenterUser.saveCarInfo({
            carBrand: this.carTypes, // 汽车品牌
            carMileage: this.mileage, // 行驶里程
            carPrice: this.carPrice, // 购买价格
            payStatus: this.payStatus, // 付款状态
            havePay: this.havePay, // 已支付
            pCode: this.city.p ? this.city.p.code : '', // 省级编码
            pName: this.city.p ? this.city.p.name : '', // 省级名称
            cCode: this.city.c ? this.city.c.code : '', // 地级编码
            cName: this.city.c ? this.city.c.name : '', // 地级名称
            dCode: '', // 县级编码this.city.d.code
            dName: '', // 县级名称this.city.d.name
            age: this.carAge, // 车龄
            isSecondHeand: this.secondHand === '是',
            // 是否二手车(true是二手车, false不是二手车)
            isMortgage: this.mortgage === '是',
            // 是否抵押过(true抵押过, false没有抵押过)
            pic: this.uploadUrls
          }).then(() => {
            window.history.back()
          })
        })
      },
      getCarInfo () {
        if (!this.carInfo.isSecondHeand) {
          // 无缓存才去后台请求
          creditCenterUser.getCarInfo().then((json) => {
            if (!json) return
            this.carTypes = json.c_car_brand
            this.carMileage = json.c_car_mileage
            this.carPrice = json.c_car_price // 购买价格
            this.payStatus = json.c_car_pay_status // 付款状态
            this.havePay = json.c_car_paid // 已支付
            this.pCode = json.level_1_code // 省级编码
            this.pName = json.level_1_name // 省级名称
            this.cCode = json.level_2_code // 地级编码
            this.cName = json.level_2_name // 地级名称
            this.dCode = json.level_3_code // 县级编码this.city.d.code
            this.dName = json.level_3_name // 县级名称this.city.d.name
            this.age = json.c_car_age // 车龄
            this.isSecondHeand = json.b_car_is_used ? '是' : '否'
            // 是否二手车(true是二手车, false不是二手车)
            this.isMortgage = json.b_car_is_mortgage ? '是' : '否'
            // 是否抵押过(true抵押过, false没有抵押过)
            this.picUrls = json.l_car_image
          })
        }
      }
    },
    created () {
      Object.assign(this.$data, this.carInfo)
      this.getCarInfo()
    },
    route: {
      deactivate ({ next }) {
        // 缓存表单
        this.setTempInfo({ carInfo: this.$data })
        next()
      }
    },
    computed: {},
    components: {
      selector,
      city,
      showPic
    }
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/function';

  input:first-child {
    padding-right: 20px;
  }

  input {
    text-align: right !important;
  }

  .tips {
    padding: 10px 0;
    font-size: $TIP_FONT_SIZE;
    color: $TIP_COLOR;
  }
</style>
