<template>
  <div>
    <group :single="true"
           :fixed="true">
      <btn :cut="1"
           :text="'保存'"
           :next="true"
           :btn-fn="setRemark">
      </btn>
    </group>
    <group :first="true">
      <ele>
        <textarea v-if="cMemo.toString() === 'null'"
                  growing-track="true"
                  placeholder="请输入备注信息(<40字)"
                  v-model="friendRemark"
                  maxlength="40"></textarea>
        <textarea v-else
                  growing-track="true"
                  v-model="friendRemark"
                  maxlength="40">{{cMemo}}</textarea>
      </ele>
    </group>

  </div>
</template>
<script type="text/ecmascript-6">
  import my from 'api/my'

  export default {
    data () {
      return {
        friendRemark: '',
        cUserId: '',
        cMemo: ''
      }
    },
    methods: {
      setRemark () {
        return my.setRemark({
          friendId: this.cUserId,
          memo: this.friendRemark
        }).then(() => {
          window.history.back()
        })
      }
    },
    components: {},
    route: {
      data ({ to: { params: { userId, memo } } }) {
        this.cUserId = userId
        this.cMemo = memo
      }
    }
  }
</script>
<style lang="scss"
       scoped>

</style>
