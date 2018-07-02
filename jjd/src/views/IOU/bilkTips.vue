<template>
  <div>
    <group :first="true">
      <div>
        目前，只有线下补借条时借款人才可以举报出借人。
      </div>
      <div>
        举报流程如下：
      </div>
      <div>
        1、上传真实充分的截图证据证明对方没有全额出借（如聊天文字截图、对方拉黑证 据等）；
      </div>
      <div>
        2、平台推送消息给出借人，出借人有72小时反馈证据证明事实，平台将按照出借人默认有违规操作进行处理；
      </div>
      <div>
        3、平台根据双方证据进行处理：
      </div>
      <div>
        a接受举报，借条置为有争议状态，借款人无需还款，不会产生逾期记录，出借人增加1条违规被举报记录，一旦被举报并受理3次，平台会拉黑该用户；
      </div>
      <div>
        b驳回举报，平台不做任何处理，双方可以继续补充证据；
      </div>
      <div>
        借条”有争议“仅表示平台对于该借条的成立条件持怀疑态度，这只是为了维持良好秩序采取的措施，借条依然有法律效力；
      </div>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">

  export default {
    data () {
      return {}
    },
    methods: {},
    components: {},
    route: {}
  }
</script>
<style lang="scss"
       scoped>
  @import '../../scss/fragment';

  .group {
    padding: 10px;
    margin-top: 20px;
  }

  div {
    font-size: 14px;
    line-height: 25px;
    /*text-indent: 2em;*/
  }
</style>
