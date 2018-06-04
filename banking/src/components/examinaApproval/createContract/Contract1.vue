<template>
    <el-dialog
      title="生成合同"
      width="50%"
      :visible="activeContract"
      :before-close="contractClose">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input disabled="disabled" value="合同类型  寓租贷"></el-input>
        </el-col>
        <el-col :span="12">
          <el-input disabled="disabled" value="合同模板  单项借款协议"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:40px;">
        <el-col :span="24" style="padding-top:70px;">
          <div class="progress-bg-gray">
            <div class="progress-bg-active progress-bg-active1"></div>
            <el-row class="progress-tips-con">
              <el-col :span="6" class="progress-tips-item active">
                <div class="progress-tips-item-text">借款合同</div>
              </el-col>
              <el-col :span="6" class="progress-tips-item">
                <div class="progress-tips-item-text">借款申请表</div>
              </el-col>
              <el-col :span="6" class="progress-tips-item">
                <div class="progress-tips-item-text">还款付息确认表</div>
              </el-col>
              <el-col :span="6" class="progress-tips-item">
                <div class="progress-tips-item-text">付款委托书</div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <hr class="division" />
      <el-row class="margin-bottom10">
        <el-col :span="4" style="padding-top:10px;">
          <h1 class="title" style="margin:0px;">生成合同</h1>
        </el-col>
        <el-col :span="8">
          <el-select placeholder="选择甲方" style="width:100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-col>
        <el-col :span="12" style="padding-top:10px;">
          <span style="font-size:14px;color:#999999;line-height:20px;margin-left:15px;">可在"设置 - 字典"中设置，方便以后选择</span>
        </el-col>
      </el-row>
      <el-row class="margin-bottom10">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="20">
          <el-input disabled="disabled" value="借款人:"></el-input>
        </el-col>
      </el-row>
      <el-row class="margin-bottom10">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="20">
          <el-input disabled="disabled" value="住所地:"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="10" style="padding-right:5px;">
          <el-input disabled="disabled" value="法定代表:"></el-input>
        </el-col>
        <el-col :span="10" style="padding-left:5px;">
          <el-input disabled="disabled" value="电话:"></el-input>
        </el-col>
      </el-row>
      <el-row class="margin-bottom10">
        <el-col :span="4" style="padding-top:10px;">
          <h1 class="title" style="margin:0px;">乙方信息</h1>
        </el-col>
        <el-col :span="8">
          <el-select placeholder="选择乙方" style="width:100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-col>
        <el-col :span="12" style="padding-top:10px;">
          <span style="font-size:14px;color:#999999;line-height:20px;margin-left:15px;">可在"设置 - 字典"中设置，方便以后选择</span>
        </el-col>
      </el-row>
      <el-row class="margin-bottom10">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="20">
          <el-input disabled="disabled" value="贷款人:"></el-input>
        </el-col>
      </el-row>
      <el-row class="margin-bottom10">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="20">
          <el-input disabled="disabled" value="住所地:"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="10" style="padding-right:5px;">
          <el-input disabled="disabled" value="法定代表:"></el-input>
        </el-col>
        <el-col :span="10" style="padding-left:5px;">
          <el-input disabled="disabled" value="电话:"></el-input>
        </el-col>
      </el-row>
      <el-row class="margin-bottom10">
        <el-col :span="4" style="padding-top:10px;">
          <h1 class="title" style="margin:0px;">内容信息</h1>
        </el-col>
        <el-col :span="10" style="padding-right:5px;">
          <el-input disabled="disabled" value="合同签订时间：  2017-12-12"></el-input>
        </el-col>
        <el-col :span="10" style="padding-left:5px;">
          <el-input disabled="disabled" value="合同编码："></el-input>
        </el-col>
      </el-row>
      <el-row class="margin-bottom10">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="20">
          <el-input disabled="disabled" value="借款金额（大写）：伍万贰仟元整"></el-input>
        </el-col>
      </el-row>
      <el-row class="margin-bottom10">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="15" style="padding-right:5px;">
          <el-input disabled="disabled" value="借款期限：     2017-12-12           —     2018-12-12"></el-input>
        </el-col>
        <el-col :span="5" style="padding-left:5px;">
          <el-input disabled="disabled" value="1年"></el-input>
        </el-col>
      </el-row>
      <el-row class="margin-bottom10">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="10" style="padding-right:5px;">
          <el-select placeholder="每月还本付息日：        5 日" style="width:100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-col>
        <el-col :span="10" style="padding-left:5px;">
          <el-input disabled="disabled" value="借款年华利率：           9             ％"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="20">
          <el-input disabled="disabled" value="每月等额还贷本息金额：                          5000                      元"></el-input>
        </el-col>
      </el-row>
      <el-row class="margin-bottom10">
        <el-col :span="4" style="padding-top:10px;">
          <h1 class="title" style="margin:0px;">乙方收款账户</h1>
        </el-col>
        <el-col :span="10" style="padding-right:5px;">
          <el-input disabled="disabled" value="收款人：  高雨婷"></el-input>
        </el-col>
        <el-col :span="10" style="padding-left:5px;">
          <el-input disabled="disabled" value="开户行：   上地建设银行"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="20">
          <el-input disabled="disabled" value="银行账号：  27378439848558757374"></el-input>
        </el-col>
      </el-row>
      <template slot="footer">
        <el-button type="primary" style="width:auto;border-radius:4px;" @click="activeAdopt=false">确认</el-button>
      </template>
    </el-dialog>
</template>

<script>
export default {
  name: "Contract1",
  data() {
    return {
      activeContract: true
    };
  }
};
</script>

<style scoped>

</style>