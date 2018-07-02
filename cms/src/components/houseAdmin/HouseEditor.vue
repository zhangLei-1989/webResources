<template>
  <div class="dialog" v-if="isShow">
    <!-- 背景层 -->
    <div class="mark"></div>

    <div class="container">
      <div class="tit">{{tit}}</div>
      <div class="close" @click="closeFn"></div>

      <div class="content">
        <div class="enterprise">
          <div class="title">
            企业信息
          </div>
          <div class="information">
            <div>
              <div class="box-input">
              <el-input v-model="editObj.raCompanyName" >
                <template slot="prepend">企业名称：</template>
              </el-input>
              </div>
              <div>请输入与完整企业名称,需要和营业执照对应</div>
              <span class="must">*</span>
            </div>
            <div>
              <div class="box-input">
              <el-input v-model="editObj.brandName">
                <template slot="prepend">公寓品牌：</template>
              </el-input>
                </div>
              <div>请输入公寓品牌</div>
              <span class="must">*</span>
            </div>
            <div>
              <div class="special">
                <div class="box-input" style="width: 323px;" v-model="editObj.id">
                <span class="tip">城市/区域：</span>
                <el-cascader
                  :options="cityTreeData"
                  filterable
                  clearable
                  change-on-select
                  v-model="cityIdList"
                  :props="cityProps">
                </el-cascader>
                </div>
              </div>
              <span class="must">*</span>
            </div>
            <div>
              <div class="box-input">
              <el-input v-model="editObj.raCompanyAddress">
                <template slot="prepend">地址：</template>
              </el-input>
              </div>
              <div>请输入公司所在经营地址</div>
              <span class="must">*</span>
            </div>
            <div>
              <div class="box-input">
              <el-input v-model="editObj.raHouseNumber" placeholder="例: 600/套/间">
                <template slot="prepend">签约体量</template>
              </el-input>
              </div>
              <div>请按规则输入签约体量</div>
              <span class="must">*</span>
            </div>
            <div>
              <div class="box-input">
              <el-input  v-model="editObj.connectMan" >
                <template slot="prepend">联系人姓名：</template>
              </el-input>
              </div>
              <div>请输入联系人姓名</div>
              <span class="must">*</span>
            </div>
            <div>
              <div class="box-input">
              <el-input v-model="editObj.connectPhone">
                <template slot="prepend">联系人电话：</template>
              </el-input>
              </div>
              <div>请输入联系人电话</div>
              <span class="must">*</span>
            </div>
            <div>
              <div class="special noTip">
                <span class="tip">经营模式：</span>
                <div class="checkbox">
                  <el-checkbox-group v-model="houseModelList">
                    <el-checkbox label="1">合租</el-checkbox>
                    <el-checkbox label="2">整租</el-checkbox>
                    <el-checkbox label="3">集中</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <div></div>
            </div>
            <div>
              <div class="special">
                <span class="tip">公司logo：</span>
                <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <span>点击上传</span>
                </el-upload>
              </div>
              <div>只能上传jpg/png文件，且不超过500kb</div>
            </div>
            <div style="height: 100px">
              <el-input v-model="editObj.companyIntro"
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 4}"
                        size="large"
                        placeholder="公司简介">
              </el-input>
            </div>

          </div>
        </div>
        <div class="licence">
          <div class="title">
            证照信息
          </div>
          <div class="information">
            <div>
              <div class="box-input">
              <el-input v-model="editObj.cooperationTime">
                <template slot="prepend">合作协议签订日期：</template>
              </el-input>
              </div>
              <div>完整企业名称,需要和营业执照对应</div>
            </div>
            <div>
              <div class="box-input">
              <el-input placeholder="营业执照号" v-model="editObj.licenseNo">
                <template slot="prepend">营业执照号：</template>
              </el-input>
              </div>
              <div>请输入统一社会信用代码</div>
            </div>
            <div>
              <div class="special">
                <span class="tip">营业执照：</span>
                <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <span>点击上传</span>
                </el-upload>
              </div>
              <div>请上传营业执照扫描件</div>
            </div>
            <div>
              <div class="special">
                <span class="tip">合同附件：</span>
                <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <span>点击上传</span>
                </el-upload>
              </div>
              <div>请上传合作协议扫描附件</div>
            </div>
          </div>
        </div>

        <div class="button-box">
          <div class="button" :style="{'background': '#a1aab3'}" @click="closeFn">取消</div>
          <div class="button" :style="{'background': '#ed0536'}" @click="editUserFn">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dialog',
    props: {},
    data() {
      return {
        isShow: false,
        tit: '编辑房行资料',
        houseModelList: [],
        editObj: {
          brandName: '', // 公寓名称
          licenseNo: '', // 营 业执照号
          raCompanyAreaId: '', // 区域id
          licensePic: '', // 营业执照附件
          cooperationTime: '', // 合同签约日期
          raHouseNumber: '', // 签约体量 number
          houseModel: '', // 经营模式
          companyIntro: '', // 公司简介
          raCompanyCityId: '', // 城市id
          connectMan: '', // 联系人
          raCompanyName: '', // 企业名称
          connectPhone: '', // 联系人电话
          compactAccessory: '', // 合同附件
          raCompanyAddress: '', // 具体地址
          raLogo: '', // logo
          id: '', // id
          gcid: '' // 安全码
        },
        cityTreeData: [],
        cityIdList: [],
        cityProps: {
          value: 'id',
          label: 'name',
          children: 'children'
        },
        checkList: []
      };
    },
    created() {
      this.queryCityList();
    },
    methods: {
      editUserFn() {
        let validateResult = this.formValidate();
        if (!validateResult.status) {
          this.$message.warning(validateResult.msg);
          return;
        }
        this.updateUserFn();
      },
      updateUserFn() {
        let _this = this;
        _this.axios({
          method: 'post',// 编辑
          url: _this.$store.state.api.resources_adjust.update_houseLine,
          data: _this.editObj
        }).then(res => {
          const {data} = res;
          console.log(res, '操作是否成功');
          if (data.status.code === '200') {
            this.$message.success('操作成功');
            _this.closeFn();
            _this.$router.go(0);
          } else {
            this.$message.error('操作失败');
          }
        });
      },
      formValidate () {
        let result = {
          status: false,
          msg: ''
        };
        let raCompanyName = this.editObj.raCompanyName;
        let brandName = this.editObj.brandName;
        let cityIdList = this.cityIdList;
        if (!cityIdList || cityIdList.length < 2) {
          result.msg = '请选择城市/区域';
          return result;
        } else {
          this.editObj.raCompanyCityId = cityIdList[0];
          this.editObj.raCompanyAreaId = cityIdList[1];
        }
        let raHouseNumber = this.editObj.raHouseNumber;
        let connectMan = this.editObj.connectMan;
        let connectPhone = this.editObj.connectPhone;
        if (!this.validate(raCompanyName, 'require')) {
          result.msg = '企业名称不能为空';
          return result;
        }
        if (!this.validate(brandName, 'require')) {
          result.msg = '公寓名称不能为空';
          return result;
        }
        if (!this.validate(raHouseNumber, 'require')) {
          result.msg = '签约体量不能为空';
          return result;
        }
        if (!this.validate(connectMan, 'require')) {
          result.msg = '联系人不能为空';
          return result;
        }
        if (!this.validate(connectPhone, 'phone')) {
          result.msg = '联系人电话格式不正确';
          return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
      },
      validate(value, type) {
        // 非空验证
        if (type === 'require') {
          return !!value;
        }
        // 手机号验证
        if (type === 'phone') {
          return /^1\d{10}$/.test(value);
        }
      },
      showFn(house) {
        this.editObj = house;
        if (house.raCompanyCityId && house.raCompanyAreaId) {
          let companyCityId = house.raCompanyCityId;
          let areaId = house.raCompanyAreaId;
          this.cityIdList.push(companyCityId, areaId);
        }
        // houseModelList 赋值
        this.editObj.houseModel = house.houseModel
        console.log(111,this.editObj.houseModel)
        let  strHouse = this.editObj.houseModel
         this.houseModelList = strHouse.split(",")
        console.log(this.houseModelList)
        this.isShow = true;
      },
      closeFn() {
        this.isShow = false;
        this.$emit('on-close', this.editObj.id);
      },
      button_click() {

      },
      queryCityList() {
        // 查询城市集合
        let _this = this;
        _this.axios({
          method: 'post',
          url: _this.$store.state.api.house.get_citySelectTwo_list,
          data: ''
        }).then(res => {
         // console.log('res: ', res);
          const {data} = res;
          if (data.status.code === '200') {
            if (!data.result) {
              //console.error('查询到的城市列表为空');
              return;
            }
            _this.cityTreeData = data.result.cityList;
          }
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  .clearboth:after {
    content: "";
    height: 0;
    width: 0;
    display: block;
    clear: both;
  }

  .dialog {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 99;
    .mark {
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0.4;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      min-width: 650px;
      width: 50%;
      height: 80%;
      background: #fff;
      overflow: hidden;
      /* 标题 */
      .tit {
        height: 50px;
        text-indent: 2em;
        font-size: 16px;
        color: #ed0536;
        line-height: 50px;
        border-bottom: 1px solid #f2f6f7;
        background: #fff;
      }
      /* 关闭按钮 */
      .close {
        position: absolute;
        top: 0;
        right: 0;
        height: 50px;
        width: 50px;
        cursor: pointer;
        background: url("/static/image/close_03.png") no-repeat 15px;
      }
      /* 主体内容 */
      .content {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        padding-bottom: 30px;
        .box-input {
          border: 1px solid #e6eced;
          padding-top: 1px;
          height: 40px;
        }
        .enterprise, .licence {
          width: calc(100% - 40px);
          margin: 20px 0 0 20px;
          .title {
            width: 100%;
            height: 34px;
            line-height: 34px;
            font-size: 16px;
            position: relative;
            text-indent: 4px;
            padding-left: 10px;
            &:after {
              content: "";
              height: 16px;
              width: 3px;
              display: block;
              background: #f2324e;
              position: absolute;
              border-radius: 5px;
              top: 8px;
              left: 5px;
              z-index: 33;
            }
          }
          .information {
            width: 100%;
            & > div {
              position: relative;
              display: flex;
              height: 36px;
              justify-content: space-around;
              margin-top: 15px;
              flex: 1;

              /deep/ .el-input-group {
                line-height: normal;
                display: inline-table;
                width: 100%;
                border-collapse: separate;
                padding-top: 5px;
              }
              & > div {
                width: 50%;
                flex: 1;
                /deep/ .el-input-group__prepend {
                  background: #fff;
                  padding: 0 10px;
                  border: 0;
                  color: #000;
                  font-size: 14px;
                  padding-top: 1px;
                }
                /deep/ .el-input__inner {
                  height: 30px;
                  background: #fff;
                  padding: 0 6px;
                  border: 0;
                }
                &:nth-child(2) {
                  text-indent: 1em;
                  line-height: 36px;
                }
                &.special {
                  display: flex;
                  flex: 1;
                  .tip {
                    line-height: 34px;
                    padding: 0 10px;
                    border: 0;
                    font-size: 14px;
                  }
                  /deep/ .el-input__inner {
                    height: 34px;
                  }
                  .checkbox {
                    line-height: 34px;
                    /deep/ .el-checkbox__label {
                      padding: 0px;
                    }
                  }
                  /deep/ .el-upload {
                    width: 100%;
                  }
                  /deep/ .el-upload-dragger {
                    height: 34px;
                    width: 100%;
                    border: 0;
                  }
                  /deep/ .el-icon-upload {
                    font-size: 16px;
                    padding: 0 5px;
                    color: red;
                    line-height: 30px;
                    margin: 0;
                  }
                  /deep/ .text-upload {
                    color: #a1a1a1;
                  }
                }
              }
              .must {
                position: absolute;
                top: 3px;
                left: 5px;
                color: red;
              }
            }
          }
        }
        /* 按钮盒子 */
        .button-box {
          height: 50px;
          display: flex;
          justify-content: flex-end;
          width: 90%;
          margin: 30px 5%;
          .button {
            width: 100px;
            height: 40px;
            text-align: center;
            background: #ccc;
            line-height: 40px;
            border-radius: 5px;
            background: #ed0536;
            color: #fff;
            font-size: 16px;
            margin-left: 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
