<template>
  <div>
    <group :fixed="true">
      <btn :text="'保存'"
           :cut="1"
           :next="true"
           @click="save"></btn>
    </group>
    <group>
      <div slot="tip_top"
           class="tip">
        <div>
          借款用途
        </div>
      </div>
      <ele>
        <div class="reasons">
          <div v-for="ele in reasonList"
               class="fix"
               :class="{chosen: ele == reason}"
               @click="choose(ele)">{{ele}}
          </div>
        </div>
      </ele>
    </group>
    <group>
      <div slot="tip_top"
           class="tip">
        <div>
          补充说明（不超过300字）
        </div>
      </div>
      <ele>
                <textarea growing-track="true"
                          placeholder="具体说明您的借款用途或证明您的还款能力"
                          maxlength="300"
                          v-model="addReason"></textarea>
      </ele>
    </group>
    <group>
      <div slot="tip_top"
           class="tip">
        <div>
          图片说明（不超过20张）
        </div>
      </div>
      <ele>
        <show-pic :pic-urls="picUrls"
                  @upload-pic="uploaded"
                  :upload="true"></show-pic>
      </ele>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import showPic from 'components/mixin/showPic'
  import { setTempInfo } from 'store/actions'

  export default{
    vuex: {
      getters: {
        createBid: store => store.temp.createBid,
        createIOU: store => store.temp.createIOU,
        buy: store => store.temp.buy
      },
      actions: { setTempInfo }
    },
    data () {
      return {
        picUrls: [],
        uploadUrls: [],
        addReason: '',
        reasonList: [
          '个体经营',
          '消费',
          '助学',
          '创业',
          '租房',
          '旅游',
          '装修',
          '医疗',
          '其他'
        ],
        reason: '',
        purposeType: ''
      }
    },
    components: {
      showPic
    },
    computed: {},
    methods: {
      uploaded (obj) {
        this.picUrls.push(obj.localId)
        this.uploadUrls.push(obj.serverId)
      },
      save () {
        window.history.back()
      },
      choose (e) {
        this.reason = e
      }
    },
    route: {
      deactivate ({ next }) {
        // 缓存表单
        this.setTempInfo({ [this.purposeType]: this.$data })
        next()
      },
      data ({ to: { params: { type } } }) {
        this.purposeType = type
        // 应用表单缓存
        Object.assign(this.$data, this[this.purposeType])
        if (Object.keys(this[this.purposeType]).length < 1) {
          window.history.back()
          return
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/const";

  .reasons {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 10px;
    div {
      width: 90px;
      width: -webkit-calc((100vw - 40px) / 3);
      background-color: $BORDER_COLOR;
      border-radius: $BORDER_RADIUS;
      color: white;
      margin: 10px 0 5px;
      text-align: center;
      line-height: 40px;
      font-size: $TIP_FONT_SIZE;
    }
    .fix {
      width: calc((100vw - 40px) / 3);
    }
    .chosen {
      background-color: $MAIN_COLOR;
    }
  }
</style>
