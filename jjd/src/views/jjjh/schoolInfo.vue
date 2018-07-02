<template>
  <div>
    <group :single="true"
           :fixed="true">
      <btn :cut="1"
           :text="'确认提交'"
           :next="true"
           :btn-fn="postSchoolInfo">
      </btn>
    </group>
    <group :first="true">
      <ele :more="true">
        <div>学校地址</div>
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
      <ele>
        <div slot="left">大学班主任／辅导员联系信息</div>
      </ele>
      <ele>
        <div >姓名</div>
        <input type="text"
               slot="right"
               maxlength="10"
               v-model="teacherName"
               placeholder="请输入真实姓名"/>
      </ele>
      <ele>
        <div >手机号</div>
        <input type="number"
               slot="right"
               maxlength="11"
               v-model="teacherTel"
               placeholder="请输入辅导员手机号"/>
      </ele>
    </group>
    <group>
      <ele>
        <div slot="left">大学班长联系信息</div>
      </ele>
      <ele>
        <div >姓名</div>
        <input type="text"
               slot="right"
               maxlength="10"
               v-model="monitorName"
               placeholder="请输入真实姓名">
      </ele>
      <ele>
        <div >手机号</div>
        <input type="number"
               slot="right"
               maxlength="11"
               v-model="monitorTel"
               placeholder="请输入班长手机号"/>
      </ele>
    </group>
    <group>
      <ele>
        <div slot="left">大学舍友联系信息</div>
      </ele>
      <ele>
        <div >姓名</div>
        <input type="text"
               slot="right"
               maxlength="10"
               v-model="roomMateName"
               placeholder="请输入真实姓名">
      </ele>
      <ele>
        <div >手机号</div>
        <input type="number"
               slot="right"
               maxlength="11"
               v-model="roomMateTel"
               placeholder="请输入舍友手机号"/>
      </ele>
    </group>
    <group>
      <ele>
        <div slot="left">其他同学联系信息</div>
      </ele>
      <ele>
        <div >姓名</div>
        <input type="text"
               slot="right"
               maxlength="10"
               v-model="otherName"
               placeholder="请输入真实姓名">
      </ele>
      <ele>
        <div>手机号</div>
        <input type="number"
               slot="right"
               maxlength="11"
               v-model="otherTel"
               placeholder="请输入舍友手机号"/>
      </ele>
    </group>
    <city :show="cityShown"
          @toggle="toggleCityShown"
          :default-city="city"
          @set-city="setCity"></city>
  </div>
</template>
<script>
  //  import creditCenterUser from 'api/creditCenterUser'
  import selector from 'components/mixin/selector'
  //  import showPic from 'components/mixin/showPic'
  import city from 'components/mixin/city'
  import jjjh from 'api/jjjh'
  import { alert } from 'tools/utils'
  //  import verify from 'components/mixin/verify'
  //  import { setTempInfo } from 'store/actions'
  export default {
    components: {
      selector,
      city,
//      showPic
    },
    data () {
      return {
        schoolId: '',
        cityDetail: '',
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
        teacherName: '',
        teacherTel: '',
        monitorName: '',
        monitorTel: '',
        roomMateName: '',
        roomMateTel: '',
        otherName: '',
        otherTel: '',
        pid: '',
      }
    },
    methods: {
      toggleHouseTypeShown (e) {
        this.houseTypeShown = e
      },
      toggleCityShown (e) {
        this.cityShown = e
      },
      showCity () {
        this.cityShown = true
      },
      setCity (cityObject) {
        this.city = cityObject
      },
      postSchoolInfo (fn) {
        const obj = {
          c_province_id: this.city.p.code, // 省级编码,
          c_city_id: this.city.c.code, // 地市编码,
          c_city_name: this.city.c.name, // 地市名称,
          c_county_id: this.city.d.code, // 县级编码,
          c_county_name: this.city.d.name, // 县级名称,
          c_province_name: this.city.p.name, // 省级名称,
          c_address_info: this.cityDetail, // 具体地址,
          c_classmate_phone: this.otherTel, // 其他同学手机,
          c_monitor_name: this.monitorName, // 班长姓名,
          c_teacher_name: this.teacherName, // 教师姓名,
          c_teacher_phone: this.teacherTel, // 教师电话,
          c_roommate_name: this.roomMateName, // 室友姓名,
          c_monitor_phone: this.monitorTel, // 班长手机,
          c_roommate_phone: this.roomMateTel, // 室友手机,
          c_classmate_name: this.otherName, // 其他同学手机,
          c_info_id: this.schoolId, // 学校id信息,
        }
        jjjh.updateSchoolInfo(obj).then(() => {
          if (fn) {
            fn()
          } else {
            alert('保存成功')
            this.$router.go('/jjjh')
          }
        }).catch((e) => {
          fn()
          alert(`保存失败原因是${e.message || ''}`)
        })
      },
      autoSave () {
        this.postSchoolInfo(() => {})
      },
    },
    created () {
      const that = this
      jjjh.getSchoolInfo().then((res) => {
        this.schoolId = res.id
        this.city.p.code = res.c_province_id || '110000'
        this.city.c.code = res.c_city_id || '110100'
        this.city.c.name = res.c_city_name || '北京'
        this.city.d.code = res.c_county_id || '110101'
        this.city.d.name = res.c_county_name || '东城'
        this.city.p.name = res.c_province_name || '北京'
        this.cityDetail = res.c_address_info || ''
        this.otherTel = res.c_classmate_phone || ''
        this.monitorName = res.c_monitor_name || ''
        this.teacherName = res.c_teacher_name || ''
        this.teacherTel = res.c_teacher_phone || ''
        this.roomMateName = res.c_roommate_name || ''
        this.monitorTel = res.c_monitor_phone || ''
        this.roomMateTel = res.c_roommate_phone || ''
        this.otherName = res.c_classmate_name || ''
      })
      this.pid = setInterval(() => {
        that.autoSave()
      }, 10000)
    },
    destroyed () {
      const that = this
      this.postSchoolInfo(() => {
        clearInterval(that.pid)
      })
    },
  }
</script>
<style>
  /*.right {*/
  /*text-indent: 14px;*/
  /*}*/
</style>
