<template>
  <div>
    <group :single="true"
           :fixed="true">
      <btn :cut="1"
           :text="'确认提交'"
           :next="true"
           :btn-fn="postFamilyInfo">
      </btn>
    </group>
    <group :first="true">
      <ele :more="true">
        <div>家庭地址</div>
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
      <ele :more="true" :first="true"
           @click="toggleHouseTypeShown(true)">
        <div>父母情况</div>
        <div slot="right"
             class="flex">
          <div>{{houseType}}</div>
        </div>
      </ele>
    </group>
    <group v-if="houseType === '单亲'" :first="true">
      <ele :more="true" @click="toggleWhichParentShown(true)">
        <div>父亲/母亲</div>
        <div slot="right"
              class="flex">
          <div>{{whichParent}}</div>
        </div>
      </ele>
    </group>
    <group v-if="houseType === '双亲'?true:houseType === '孤儿'?false:whichParent === '父亲'?true:false">
      <ele>
        <div slot="left">父亲信息</div>
      </ele>
      <ele>
        <div>姓名</div>
        <input type="text"
               slot="right"
               maxlength="10"
               v-model="fatherName"
               placeholder="请输入真实姓名">
      </ele>
      <ele>
        <div>手机号</div>
        <input type="number"
               slot="right"
               maxlength="11"
               v-model="fatherTel"
               placeholder="请输入手机号"/>
      </ele>
      <ele>
        <div>工作职位</div>
        <input type="text"
               slot="right"
               maxlength="20"
               v-model="fatherPos"
               placeholder="请输入工作职位"/>
      </ele>
      <ele>
        <div>年收入</div>
        <input type="number"
               slot="right"
               maxlength="11"
               v-model="fatherIncome"
               placeholder="请输入年收入"/>
        <div slot="unit">万</div>
      </ele>
      <ele class="no-line ">
        <div class="tips">
          请上传该联系人的身份证照片(正面+反面+手持，不超过9张)
        </div>
      </ele>
      <ele>
        <show-pic :upload="picFatherUrls.length < 9"
                  :pic-urls="picFatherUrls"
                  @upload-pic="uploadedFather"
                  :credit="true"></show-pic>
      </ele>
    </group>
    <group v-if="houseType === '双亲'?true:houseType === '孤儿'?false:whichParent === '母亲'?true:false">
      <ele>
        <div>母亲信息</div>
      </ele>
      <ele>
        <div>姓名</div>
        <input type="text"
               slot="right"
               maxlength="10"
               v-model="motherName"
               placeholder="请输入真实姓名">
      </ele>
      <ele>
        <div>手机号</div>
        <input type="number"
               slot="right"
               maxlength="11"
               v-model="motherTel"
               placeholder="请输入手机号"/>
      </ele>
      <ele>
        <div>工作职位</div>
        <input type="text"
               slot="right"
               maxlength="20"
               v-model="motherPos"
               placeholder="请输入工作职位"/>
      </ele>
      <ele>
        <div>年收入</div>
        <input type="number"
               slot="right"
               maxlength="11"
               v-model="motherIncome"
               placeholder="请输入年收入"/>
        <div slot="unit">万</div>
      </ele>
      <ele class="no-line ">
        <div class="tips">
          请上传该联系人的身份证照片(正面+反面+手持，不超过9张)
        </div>
      </ele>
      <ele>
        <show-pic :upload="picMotherUrls.length < 9"
                  :pic-urls="picMotherUrls"
                  @upload-pic="uploadedMother"
                  :credit="true"></show-pic>
      </ele>
    </group>
    <group v-if="houseType === '孤儿'">
      <ele>
        <div>监护人信息</div>
      </ele>
      <ele>
        <div>姓名</div>
        <input type="text"
               slot="right"
               maxlength="10"
               v-model="custodyName"
               placeholder="请输入真实姓名">
      </ele>
      <ele>
        <div>手机号</div>
        <input type="number"
               slot="right"
               maxlength="11"
               v-model="custodyTel"
               placeholder="请输入手机号"/>
      </ele>
      <ele>
        <div>工作职位</div>
        <input type="text"
               slot="right"
               maxlength="20"
               v-model="custodyPos"
               placeholder="请输入工作职位"/>
      </ele>
      <ele>
        <div>年收入</div>
        <input slot="right"
               type="number"
               placeholder="请输入年收入"
               v-model="custodyIncome">
        <div slot="unit">万</div>
      </ele>
      <ele class="no-line ">
        <div class="tips">
          请上传该联系人的身份证照片(正面+反面+手持，不超过9张)
        </div>
      </ele>
      <ele>
        <show-pic :upload="picCustodyUrls.length < 9"
                  :pic-urls="picCustodyUrls"
                  @upload-pic="uploadedCustody"
                  :credit="true"></show-pic>
      </ele>
    </group>
    <group>
      <ele>
        <div slot="left">家庭还款状况(<100字)</div>
      </ele>
      <textarea class="textarea" v-model="familyStatus" placeholder="你的家庭经济状况如何，能够如何帮到你"></textarea>
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
    <selector :show="whichParentShown"
              :default-data="whichParent"
              :value-list="parentList"
              @set-data="setParent"
              @toggle="toggleWhichParentShown"></selector>
  </div>
</template>

<script>
  import selector from 'components/mixin/selector'
  import showPic from 'components/mixin/showPic'
  import city from 'components/mixin/city'

  import jjjh from 'api/jjjh'
  import { alert } from 'tools/utils'

  export default {
    components: {
      selector,
      city,
      showPic
    },
    methods: {
      toggleHouseTypeShown (e) {
        this.houseTypeShown = e
      },
      toggleWhichParentShown (e) {
        this.fatherName = ''
        this.fatherTel = ''
        this.fatherIncome = 0
        this.fatherPos = ''
        this.picFatherUrls = []
        this.motherName = ''
        this.motherTel = ''
        this.motherPos = ''
        this.motherIncome = 0
        this.picMotherUrls = []
        this.custodyName = ''
        this.custodyPos = ''
        this.custodyIncome = 0
        this.custodyTel = ''
        this.picCustodyUrls = []
        this.whichParentShown = e
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
      setHouseType (houseTypeObject) {
        this.houseType = houseTypeObject
      },
      setParent (o) {
        this.whichParent = o
      },
      uploadedFather (obj) {
        this.picFatherUrls.push(obj.localId)
        this.uploadFatherUrls.push(obj.serverId)
      },
      uploadedMother (obj) {
        this.picMotherUrls.push(obj.localId)
        this.uploadMotherUrls.push(obj.serverId)
      },
      uploadedCustody (obj) {
        this.picCustodyUrls.push(obj.localId)
        this.uploadCustodyUrls.push(obj.serverId)
      },
      postFamilyInfo (fn) {
        let fg = 1
        if (this.houseType === '双亲') {
          fg = 1
        } else if (this.houseType === '单亲') {
          fg = 2
        } else if (this.houseType === '孤儿') {
          fg = 3
        }
        let flag = true
        let whichParentType = 0
        if (this.whichParent === '父亲') {
          whichParentType = 1
        } else if (this.whichParent === '母亲') {
          whichParentType = 2
        }
        const obj = {
          c_province_id: this.city.p.code,
          c_province_name: this.city.p.name,
          c_city_id: this.city.c.code,
          c_city_name: this.city.c.name,
          c_county_id: this.city.d.code,
          c_county_name: this.city.d.name,
          c_address_info: this.cityDetail,
          n_family_type: fg,
          c_father_name: this.fatherName,
          c_father_phone: this.fatherTel,
          n_father_year_income: isNaN(parseFloat(this.fatherIncome).toFixed(2)) ?
            '' : parseFloat(this.fatherIncome).toFixed(2),
          c_father_work: this.fatherPos,
          l_father_upload_img: this.uploadFatherUrls || [],
          c_mother_name: this.motherName,
          c_mother_phone: this.motherTel,
          c_mother_work: this.motherPos,
          n_mother_year_income: isNaN(parseFloat(this.motherIncome).toFixed(2)) ?
            '' : parseFloat(this.motherIncome).toFixed(2),
          l_mother_upload_img: this.uploadMotherUrls || [],
          c_custody_name: this.custodyName,
          c_custody_work: this.custodyPos,
          n_custody_year_income: isNaN(parseFloat(this.custodyIncome).toFixed(2)) ?
            '' : parseFloat(this.custodyIncome).toFixed(2),
          c_custody_phone: this.custodyTel,
          l_custody_upload_img: this.uploadCustodyUrls || [],
          c_family_repay_status: this.familyStatus,
          c_info_id: this.familyId,
          n_family_only_type: whichParentType,
        }
        if (fg === 1 && !fn) {
          if (obj.c_mother_phone.length !== 11 || obj.c_father_phone.length !== 11) {
            alert('请输入正确的联系人手机号')
            flag = false
          }
          if (obj.c_father_name === obj.c_mother_name || obj.c_father_phone === obj.c_mother_phone) {
            alert('请不要输入重复的姓名/手机号')
            flag = false
          }
        } else if (fg === 2 && !fn) {
          if (this.whichParent === '父亲') {
            if (obj.c_father_phone.length !== 11) {
              alert('请输入正确的联系人手机号')
              flag = false
            }
          } else if (this.whichParent === '母亲') {
            if (obj.c_mother_phone.length !== 11) {
              alert('请输入正确的联系人手机号')
              flag = false
            }
          }
        } else if (fg === 3 && !fn) {
          if (obj.c_custody_phone.length !== 11) {
            alert('请输入正确的联系人手机号')
            flag = false
          }
        }

        if (flag) {
          jjjh.updateFamilyInfo(obj).then(() => {
            this.uploadFatherUrls = []
            this.uploadMotherUrls = []
            this.uploadCustodyUrls = []
            if (fn) {
              fn()
            } else {
              alert('保存成功')
              this.$router.go('/jjjh')
            }
          }).catch(() => {
            fn()
          })
        }
      },
      autoSave () {
        this.postFamilyInfo(() => {})
      },
    },
    data () {
      return {
        familyId: '',
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
        houseType: '双亲',
        houseTypeShown: false,
        houseTypeList: [
          '双亲',
          '单亲',
          '孤儿',
        ],
        whichParentShown: false,
        whichParent: '父亲',
        parentList: [
          '父亲',
          '母亲',
        ],
        fatherName: '',
        fatherTel: '',
        fatherPos: '',
        fatherIncome: '',
        motherName: '',
        motherTel: '',
        motherPos: '',
        motherIncome: '',
        custodyName: '',
        custodyTel: '',
        custodyPos: '',
        custodyIncome: '',
        picFatherUrls: [],
        picMotherUrls: [],
        picCustodyUrls: [],
        uploadFatherUrls: [],
        uploadMotherUrls: [],
        uploadCustodyUrls: [],
        familyStatus: '',
        pid: '',
      }
    },
    created () {
      const that = this
      jjjh.getFamilyInfo().then((res) => {
        this.city.p.code = res.c_province_id || '' // 省级编码,
        this.city.p.name = res.c_province_name || '' // 省级名称,
        this.city.c.code = res.c_city_id || '' // 地市编码,
        this.city.c.name = res.c_city_name || '' // 地市名称,
        this.city.d.code = res.c_county_id || '' // 县级编码,
        this.city.d.name = res.c_county_name || '' // 县级名称,
        this.cityDetail = res.c_address_info || '' // 具体地址,
        if (res.n_family_type === 1) {
          this.houseType = '双亲'
        } else if (res.n_family_type === 2) {
          this.houseType = '单亲'
        } else if (res.n_family_type === 3) {
          this.houseType = '孤儿'
        }
        this.fatherName = res.c_father_name || '' // 父亲姓名,
        this.fatherTel = res.c_father_phone || '' // 父亲手机号,
        this.fatherIncome = res.n_father_year_income || '' // 父亲年收入,
        this.fatherPos = res.c_father_work || '' // 父亲工作职位,
        this.picFatherUrls = res.l_father_upload_img || [] // 父亲身份证照片,
        this.motherName = res.c_mother_name || '' // 亲姓名,
        this.motherTel = res.c_mother_phone || '' // 亲手机号,
        this.motherPos = res.c_mother_work || '' // 母亲工作职位,
        this.motherIncome = res.n_mother_year_income || '' // 母亲年收入,
        this.picMotherUrls = res.l_mother_upload_img || [] // 母亲身份证照片,
        if (this.houseType === '单亲' && this.fatherName) {
          this.whichParent = '父亲'
        } else if (this.houseType === '单亲' && this.motherName) {
          this.whichParent = '母亲'
        }
        this.custodyName = res.c_custody_name || '' // 监护人姓名,
        this.custodyPos = res.c_custody_work || '' // 监护人工作职位,
        this.custodyIncome = res.n_custody_year_income || '' // 监护人年收入,
        this.custodyTel = res.c_custody_phone || '' // 监护人手机号,
        this.picCustodyUrls = res.l_custody_upload_img || [] // 监护人身份证照片,
        this.familyStatus = res.c_family_repay_status || '' // 家庭还款状况,
        this.familyId = res.id || '' // 家庭信息Id,
        if (res.n_family_only_type === 1) {
          this.whichParent = '父亲'
        } else if (res.n_family_only_type === 2) {
          this.whichParent = '母亲'
        }
      }).catch(() => {
        alert('获取家庭信息失败')
      })
      this.pid = setInterval(() => {
        that.autoSave()
      }, 10000)
    },
    destroyed () {
      const that = this
      this.postFamilyInfo(() => {
        clearInterval(that.pid)
      })
    },
  }
</script>

<style scoped>
.textarea{
  height: 100px;
  overflow: scroll;
  width: 100%;
  margin: 0px;
  padding: 10px;
}
</style>
