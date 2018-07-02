<template>
  <div>
    <validator name="validator">
      <group :first="true">
        <ele>
          <div slot="left">公司名称</div>
          <input growing-track="true"
                 slot="right"
                 v-model="comName"
                 maxlength="20"
                 placeholder="请输入公司名称"
                 v-validate:comname="validRules.comname"/>
        </ele>
        <ele>
          <div slot="left">工作职位</div>
          <input growing-track="true"
                 slot="right"
                 v-model="position"
                 maxlength="20"
                 placeholder="请输入工作职位"
                 v-validate:position="validRules.position"/>
        </ele>
        <ele :more="true"
             @click="toggleDateShown(true)">
          <div solt="left">
            入职时间
          </div>
          <div slot="right">
            <div>{{date.y}}-{{date.m}}-{{date.d}}</div>
          </div>
        </ele>
        <ele>
          <div slot="left">联系电话</div>
          <input growing-track="true"
                 slot="right"
                 v-model="tel"
                 maxlength="20"
                 placeholder="请输入公司固定电话"
                 v-validate:tel="validRules.jobPhone"/>
        </ele>
      </group>

      <group :single="true"
             :fixed="true">
        <btn :cut="1"
             :text="'确认提交'"
             :next="true"
             :btn-fn="postJobInfo">
        </btn>
      </group>
      <group>
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
                 placeholder="**路**小区**单元"/>
        </ele>
      </group>
      <group>
        <ele class="no-line ">
          <div class="tips">
            请上传您本人的劳动合同、工牌等工作证明图片，要求清晰真实，不可后期处理（不超过9张）
          </div>
        </ele>
        <ele>
          <show-pic :upload="true"
                    :pic-urls="picUrls"
                    :credit="true"
                    @upload-pic="uploaded"></show-pic>
        </ele>
      </group>


      <date :show="dateShown"
            @toggle="toggleDateShown"
            :default-date="date"
            @set-date="setDate"></date>
      <city :show="cityShown"
            @toggle="toggleCityShown"
            :default-city="city"
            @set-city="setCity"></city>
    </validator>
  </div>
</template>
<script type="text/ecmascript-6">
  import showPic from 'components/mixin/showPic'
  import date from 'components/mixin/date'
  import city from 'components/mixin/city'
  import verify from 'components/mixin/verify'
  import creditCenterUser from 'api/creditCenterUser'
  import {
    setTempInfo
  } from 'store/actions'

  export default{
    mixins: [verify],
    vuex: {
      getters: {
        jobInfo: store => store.temp.jobInfo // 读取表单缓存
      },
      actions: {
        setTempInfo
      }
    },
    data () {
      const d = new Date()
      return {
        comName: '',
        position: '',
        tel: '',
        cityDetail: '',
        dateShown: false,
        date: {
          y: d.getFullYear(),
          m: d.getMonth() + 1,
          d: d.getDate()
        },
        cityShown: false,
        city: {
          p: {
            name: '北京',
            code: '110000'
          },
          c: {
            name: '北京',
            code: '110100'
          },
          d: {
            name: '东城区',
            code: '110101'
          }
        },
        picUrls: [],
        uploadUrls: []
      }
    },
    methods: {
      toggleDateShown (e) {
        this.dateShown = e
      },
      setDate (dateObject) {
        this.date = dateObject
      },
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
      postJobInfo () {
        this.toValidate(() => {
          const d = `${this.date.y}-${this.date.m}-${this.date.d}`
          creditCenterUser.saveJobInfo({
            comName: this.comName,
            position: this.position,
            date: d,
            tel: this.tel,
            pCode: this.city.p.code, // 省级编码
            pName: this.city.p.name, // 省级名称
            cCode: this.city.c.code, // 地级编码
            cName: this.city.c.name, // 地级名称
            dCode: this.city.d.code, // 县级编码
            dName: this.city.d.name, // 县级名称
            cityDetail: this.cityDetail,
            imgSrc: this.uploadUrls
          }).then(() => {
            window.history.back()
          })
        })
      },
      getJobInfo () {
        if (!this.jobInfo.comName) {
          // 无缓存才去后台请求
          creditCenterUser.getJobInfo().then((json) => {
            if (!json) return
            this.comName = json.c_company
            this.position = json.c_position
            const d = new Date(json.c_employment_date)
            this.date = new Date(
              `${d.getFullYear()}-${d
                .getMonth() + 1}-${d.getDate()}`
            )
            this.date = {
              y: d.getFullYear() || 2016,
              m: d.getMonth() + 1 || 9,
              d: d.getDate() || 1
            }
            this.tel = json.c_company_tel
            this.pCode = json.level_1_code // 省级编码
            this.pName = json.level_1_name // 省级名称
            this.cCode = json.level_2_code // 地级编码
            this.cName = json.level_2_name // 地级名称
            this.dCode = json.level_3_code // 县级编码this.city.d.code
            this.dName = json.level_3_name // 县级名称this.city.d.name
            this.cityDetail = json.c_company_address
            this.picUrls = json.l_company_image
          })
        }
      }
    },
    created () {
      Object.assign(this.$data, this.jobInfo)
      this.getJobInfo()
    },
    route: {
      deactivate ({ next }) {
        // 缓存表单
        this.setTempInfo({ jobInfo: this.$data })
        next()
      }
    },
    computed: {
      computedDays () {
        const start = new Date()
        const d0 = this.date
        const end = new Date(d0.y, parseInt(d0.m, 10) - 1, d0.d)
        const m = end - start
        const d = Math.ceil(m / (24 * 3600 * 1000))
        return d > 0 ? d : 0
      }
    },
    components: {
      date,
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

  .row [slot=left] {
    min-width: 0;
    width: 80px;
  }
</style>
