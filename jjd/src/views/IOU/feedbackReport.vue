<template>
  <div>
    <group :single="true"
           :fixed="true">
      <btn :cut="1"
           :text="'确认提交'"
           :next="true"
           @click="feedbackOfReport">
      </btn>
    </group>
    <group>
      <!--<div slot="tip_top"-->
           <!--class="tip">-->
        <!--<ele>-->
          <!--<div>春节期间(1月27日至1月29日)举报处理暂停，我们会在节后统一受理。</div>-->
        <!--</ele>-->
      <!--</div>-->
      <ele>
        <div class="report-tip">
          您被举报有违规行为，请您尽快上传出借证据，否则平台将会按照违规处理该借条
        </div>
      </ele>
      <ele :more="true">
        <div>
          <!--还剩余<span>{{leftHours}}</span>小时-->
        </div>
        <div @click="toIOU"
             slot="right">
          查看借条详情
        </div>
      </ele>
    </group>
    <group>
      <ele :more="true"
           @click="togglePayWayShown(true)">
        <div>
          以何种方式支付
        </div>
        <div class="flex"
             slot="right">
          {{payWay}}
        </div>
      </ele>
      <ele>
                <textarea growing-track="true"
                          v-model="addReason"
                          maxlength="500"
                          placeholder="补充说明，不超过500字"></textarea>
      </ele>
    </group>
    <group>
      <ele class="no-line ">
        <div class="report-tip">
          请上传真实有效的出借证据，越充分越好（一次性上传大量图片，处理速度会比较慢）
        </div>
      </ele>
      <ele>
        <show-pic :upload="true"
                  :pic-urls="picUrls"
                  @upload-pic="uploaded"></show-pic>
      </ele>
    </group>

    <selector :show="payWayShown"
              :default-data="payWay"
              :value-list="payWayList"
              @set-data="setPayWay"
              @toggle="togglePayWayShown"></selector>
  </div>
</template>
<script type="text/ecmascript-6">
  import selector from 'components/mixin/selector'
  import showPic from 'components/mixin/showPic'
  import iou from 'api/iou'
  import { feedback } from 'tools/utils'

  export default {
    data () {
      return {
        id: '',
        picUrls: [],
        uploadUrls: [],
        addReason: '',
        leftHours: '72',
        payWay: '支付宝',
        payWayShown: false,
        payWayList: [
          '支付宝',
          '微信支付',
          '现金',
          '银行卡',
          '今借到平台',
          '其他'
        ]
      }
    },
    methods: {
      toIOU () {
        this.$router.go(`/iouDetail/${this.id}`)
      },
      uploaded (obj) {
        this.picUrls.push(obj.localId)
        this.uploadUrls.push(obj.serverId)
      },
      togglePayWayShown (e) {
        this.payWayShown = e
      },
      setPayWay (payWayObject) {
        this.payWay = payWayObject
      },
      feedbackOfReport () {
        iou.reportIOU({
          id: this.id,
          payWay: this.payWay,
          imgSrc: this.uploadUrls,
          addReason: this.addReason
        }).then(() => {
          feedback('反馈成功，请等待平台处理')
          this.$router.go({
            path: `/iouDetail/${this.id}`,
            replace: true
          })
        })
      },
      getReportIOU () {
        iou.getReportIOU(this.id).then((json) => {
          if (json) {
            this.leftHours = json.leftHours // todo 等接口
            this.payWay = json.c_pay_methd
            this.addReason = json.c_memo
            this.picUrls = json.l_pic
          }
        })
      }
    },
    components: {
      selector,
      showPic
    },
    route: {
      data ({ to: { params: { id } } }) {
        this.id = id
        this.getReportIOU()
      }
    }
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/fragment';

  .report-tip {
    font-size: $TIP_FONT_SIZE;
    align-self: center;
  }
</style>
