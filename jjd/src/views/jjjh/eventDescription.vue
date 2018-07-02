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
        <div class="textBlack">
          接触网贷的原因（20字以内）
        </div>
      </div>
      <ele>
        <textarea growing-track="true"
                  maxlength="20"
                  v-model="reason"></textarea>
      </ele>
    </group>
    <group>
      <div slot="tip_top"
           class="tip">
        <div class="textBlack">
          事件经过（≤300字）
        </div>
      </div>
      <ele>
        <textarea growing-track="true"
                  placeholder="简单描述一下事情是如何发展到这一步的，有没有被暴力催收，如何挣钱还款的..."
                  maxlength="300"
                  class="textarea-300"
                  v-model="course"></textarea>
      </ele>
    </group>
    <group>
      <div slot="tip_top"
           class="tip">
        <div class="textBlack">
          反思（≤300字）
        </div>
      </div>
      <ele>
        <textarea growing-track="true"
                  placeholder="这段经历带给你怎样的思考与改变"
                  maxlength="300"
                  class="textarea-300"
                  v-model="rethink"></textarea>
      </ele>
    </group>
    <group>
      <div slot="tip_top"
           class="tip">
        <div class="textBlack">
          还款能力证明（≤300字）
        </div>
      </div>
      <ele>
        <textarea growing-track="true"
                  placeholder="你打算通过哪些途径在三年内挣到这笔钱呢，如职业规划、家庭的支持等，请尽可能展示出你的还款能力"
                  maxlength="300"
                  class="textarea-300"
                  v-model="prove"></textarea>
      </ele>
    </group>
    <group>
      <div slot="tip_top"
           class="tip">
        <div>
          请上传相关图片证明以上情况，让投资人感受到你的诚意和决心（最多9张）
        </div>
      </div>
      <ele>
        <show-pic :pic-urls="picUrls"
                  @upload-pic="uploaded"
                  :upload="picUrls.length < 9"></show-pic>
      </ele>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import showPic from 'components/mixin/showPic'
  import jjjh from 'api/jjjh'
  import { alert } from 'tools/utils'

  export default{
    data () {
      return {
        id: '',
        picUrls: [],
        uploadUrls: [],
        reason: '', // 接触网贷原因
        rethink: '', // 反思
        course: '', // 事件经过
        prove: '', // 还款能力证明
        pid: '',
      }
    },
    components: {
      showPic
    },
    computed: {
      jjjhError () {
        const list = []
        if (!this.reason) {
          list.push('请输入接触网贷的原因')
        }
        if (!this.course) {
          list.push('请输入事件经过')
        }
        if (!this.rethink) {
          list.push('请输入反思')
        }
        if (!this.prove) {
          list.push('请输入还款能力证明')
        }
        if (!this.picUrls.length && !this.uploadUrls.length) {
          list.push('请至少上传一张图片证明')
        }
        return list
      }
    },
    methods: {
      uploaded (obj) {
        this.picUrls.push(obj.localId)
        this.uploadUrls.push(obj.serverId)
      },
      getInfo () {
        jjjh.getEventDesc().then((res) => {
          this.id = res.id
          this.picUrls = res.l_upload_img || []
          this.reason = res.c_contact_reason || ''
          this.rethink = res.c_rethink || ''
          this.course = res.c_event_course || ''
          this.prove = res.c_repay_prove || ''
        })
      },
      save () {
        if (this.jjjhError.length > 0) {
          let errors = ''
          this.jjjhError.forEach((err) => {
            errors += `${err}<br>`
          })
          alert(errors)
        } else {
          this.toSave()
        }
      },
      autoSave () {
        jjjh.updateEventDesc({
          pic: this.uploadUrls,
          reason: this.reason,
          rethink: this.rethink,
          id: this.id,
          course: this.course,
          prove: this.prove,
        }).then(() => {
          this.uploadUrls = []
        })
      },
      toSave () {
        jjjh.updateEventDesc({
          pic: this.uploadUrls,
          reason: this.reason,
          rethink: this.rethink,
          id: this.id,
          course: this.course,
          prove: this.prove,
        }).then(() => {
          window.history.back()
        })
      },
    },
    created () {
      this.getInfo()
      const that = this
      this.pid = setInterval(() => {
        that.autoSave()
      }, 10000)
    },
    destroyed () {
      const that = this
      jjjh.updateEventDesc({
        pic: this.uploadUrls,
        reason: this.reason,
        rethink: this.rethink,
        id: this.id,
        course: this.course,
        prove: this.prove,
      }).then(() => {
        clearInterval(that.pid)
      }).catch(() => {
        clearInterval(that.pid)
      })
    },
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  .textBlack{
    color: black;
  }

  .textarea-300 {
    height: 200px;
  }
</style>
