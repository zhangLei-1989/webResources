<template>
  <div>
    <validator name="validator">
      <group :first="true">
        <ele :more="true">
          <div>所在城市</div>
          <div slot="right">
            <button @click="showCity">{{city.p.name}}-{{city.c.name}}-{{city.d.name}}</button>
          </div>
        </ele>
        <ele>
          <div slot="left">详细地址</div>
          <input growing-track="true"
                 slot="right"
                 v-model="cityDetail"
                 maxlength="20"
                 placeholder="**路**小区**单元"
                 v-validate:address="validRules.address"/>
        </ele>
      </group>
      <group>
        <ele :more="true"
             @click="toggleHouseTypeShown(true)">
          <div>房屋类型</div>
          <div slot="right"
               class="flex">
            <div>{{houseType}}</div>
          </div>
        </ele>
        <ele>
          <div slot="left">房屋面积</div>
          <input growing-track="true"
                 type="number"
                 slot="right"
                 maxlength="10"
                 v-model="houseArea"
                 placeholder="请输入整数"
                 v-validate:housearea="validRules.housearea"/>
          <div slot="unit">㎡</div>
        </ele>
        <ele>
          <div slot="left">购买价格</div>
          <input growing-track="true"
                 type="number"
                 slot="right"
                 maxlength="10"
                 v-model="housePrice"
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
                 type="number"
                 slot="right"
                 maxlength="10"
                 v-model="havePay"
                 placeholder="请输入整数"
                 v-validate:havepay="validRules.havepay"/>
          <div slot="unit">万元</div>
        </ele>

        <ele :more="true"
             @click="toggleHouseAgeShown(true)">
          <div>房龄</div>
          <div slot="right"
               class="flex">
            <div>{{houseAge}}</div>
          </div>
        </ele>
        <ele :more="true"
             @click="toggleSecondHandShown(true)">
          <div>是否为二手房</div>
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
             :btn-fn="postHouseInfo">
        </btn>
      </group>

      <group>
        <ele class="no-line ">
          <div class="tips">
            请上传您本人的房产证、购房合同等房产证明图片，要求清晰真实，不可后期处理 (不超过9张)
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
            @set-city="setCity"></city>
      <selector :show="houseTypeShown"
                :default-data="houseType"
                :value-list="houseTypeList"
                @set-data="setHouseType"
                @toggle="toggleHouseTypeShown"></selector>
      <selector :show="payStatusShown"
                :default-data="payStatus"
                :value-list="payStatusList"
                @set-data="setPayStatus"
                @toggle="togglePayStatusShown"></selector>
      <selector :show="houseAgeShown"
                :default-data="houseAge"
                :value-list="houseAgeList"
                @set-data="setHouseAge"
                @toggle="toggleHouseAgeShown"></selector>
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
        houseInfo: store => store.temp.houseInfo // 读取表单缓存
      },
      actions: {
        setTempInfo
      }
    },
    data () {
      return {
        cityDetail: '',
        houseArea: '',
        housePrice: '',
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
            name: ['东城'],
            code: '110101'
          }
        },
        picUrls: [],
        uploadUrls: [],
        houseType: '商品住房',
        houseTypeShown: false,
        houseTypeList: [
          '商品住房',
          '商住两用房',
          '写字楼',
          '经济适用房',
          '整体式商铺',
          '隔断式商铺',
          '小产权房',
          '房改房'
        ],
        payStatus: '全款已付清',
        payStatusShown: false,
        payStatusList: [
          '全款已付清',
          '分期已付清',
          '分期付款中'
        ],
        houseAge: '1年以内',
        houseAgeShown: false,
        houseAgeList: [
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
      toggleHouseTypeShown (e) {
        this.houseTypeShown = e
      },
      setHouseType (houseTypeObject) {
        this.houseType = houseTypeObject
      },
      togglePayStatusShown (e) {
        this.payStatusShown = e
      },
      setPayStatus (payStatusObject) {
        this.payStatus = payStatusObject
      },
      toggleHouseAgeShown (e) {
        this.houseAgeShown = e
      },
      setHouseAge (houseAgeObject) {
        this.houseAge = houseAgeObject
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
      postHouseInfo () {
        this.toValidate(() => {
          creditCenterUser.saveHouseInfo({
            houseType: this.houseType, // 房屋类型
            houseArea: this.houseArea, // 房屋面积
            housePrice: this.housePrice, // 购买价格
            payStatus: this.payStatus, // 付款状态
            havePay: this.havePay, // 已支付
            pCode: this.city.p.code, // 省级编码
            pName: this.city.p.name, // 省级名称
            cCode: this.city.c.code, // 地级编码
            cName: this.city.c.name, // 地级名称
            dCode: this.city.d.code, // 县级编码this.city.d.code
            dName: this.city.d.name, // 县级名称this.city.d.name
            cityDetail: this.cityDetail, // 具体地址
            houseAge: this.houseAge, // 车龄
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
      getHouseInfo () {
        if (!this.houseInfo.secondHand) {
          // 无缓存才去后台请求
          creditCenterUser.getHouseInfo().then((json) => {
            if (!json) return
            this.houseType = json.c_house_type
            this.houseArea = json.c_house_area
            this.housePrice = json.c_house_price // 购买价格
            this.payStatus = json.c_house_pay_status // 付款状态
            this.havePay = json.c_house_paid // 已支付
            this.pCode = json.level_1_code // 省级编码
            this.pName = json.level_1_name // 省级名称
            this.cCode = json.level_2_code // 地级编码
            this.cName = json.level_2_name // 地级名称
            this.dCode = json.level_3_code // 县级编码this.city.d.code
            this.dName = json.level_3_name // 县级名称this.city.d.name
            this.cityDetail = json.c_house_address
            this.houseAge = json.c_house_age // 车龄
            this.secondHand = json.b_house_is_used ? '是' : '否'
            // 是否二手车(true是二手车, false不是二手车)
            this.mortgage = json.b_house_is_mortgage ? '是' : '否'
            // 是否抵押过(true抵押过, false没有抵押过)
            this.pic = json.l_house_image
          })
        }
      }
    },
    created () {
      Object.assign(this.$data, this.houseInfo)
      this.getHouseInfo()
    },
    route: {
      deactivate ({ next }) {
        // 缓存表单
        this.setTempInfo({ houseInfo: this.$data })
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

  input {
    text-align: right !important;
  }

  .tips {
    padding: 10px 0;
    font-size: $TIP_FONT_SIZE;
    color: $TIP_COLOR;
  }
</style>
