<template>
  <div>
    <group :single="true"
           :fixed="true">
      <btn :cut="1"
           :text="'确认提交'"
           :next="true"
           @click="postReport">
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
        <!--:more="true" @click="toggleReportReasonShown(true)"-->
        <div slot="left">
          举报原因
        </div>
        <div class="flex">
          {{reportReason}}
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
      <ele :no-line="true">
        <div v-if="luotiao">
          请上传真实有效的证据，尤其是对方索要裸照的聊天截图，越充分越好。本次举报对方不会收到提醒消息。（一次性上传大量图片，处理速度会比较慢）
        </div>
        <div v-else>
          请上传真实有效的证据，越充分越好（一次性上传大量图片，处理速度会比较慢）
        </div>
      </ele>
      <ele>
        <show-pic :upload="true"
                  :pic-urls="picUrls"
                  @upload-pic="uploaded"></show-pic>
      </ele>
    </group>
    <group v-if="!luotiao">
      <div class="tip-detail"
           @click="go('bilkTips')">了解平台举报处理规则>>
      </div>
    </group>

    <!--<selector :show="reportReasonShown"-->
    <!--:default-data="reportReason"-->
    <!--:value-list="reportReasonList"-->
    <!--@set-data="setReportReason"-->
    <!--@toggle="toggleReportReasonShown"></selector>-->
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
        reportReason: '',
        id: '',
        picUrls: [],
        uploadUrls: [],
        addReason: '',
        payWay: '',
        luotiao: 0
      }
    },
    methods: {
      uploaded (obj) {
        this.picUrls.push(obj.localId)
        this.uploadUrls.push(obj.serverId)
      },
      postReport () {
        iou.reportIOU({
          id: this.id,
          payWay: this.payWay,
          imgSrc: this.uploadUrls,
          addReason: this.addReason,
          luotiao: this.luotiao
        }).then(() => {
          feedback('举报成功，请等待平台处理')
          window.history.back()
        })
      },
      getReportIOU () {
        iou.getReportIOU(this.id).then((json) => {
          if (json) {
            this.payWay = json.c_pay_methd
            this.addReason = json.c_memo
            this.picUrls = json.l_pic
          }
        })
      },
      go (e) {
        this.$router.go(`/${e}`)
      }
    },
    components: {
      selector,
      showPic
    },
    route: {
      data ({ to: { params: { id, luotiao } } }) {
        this.id = id
        if (luotiao) {
          this.reportReason = '对方索要裸照'
          this.luotiao = 1
        } else {
          this.reportReason = '对方没有全额出借'
          this.luotiao = 0
          // todo: 暂时去掉上次举报内容的展示
//                    this.getReportIOU()
        }
      }
    }
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/fragment';

  .tip-detail {
    font-size: $TIP_FONT_SIZE;
    align-self: center;
    color: $MAIN_COLOR;
    text-align: right;
    padding-right: 10px;
  }
</style>
