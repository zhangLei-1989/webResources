<template>
  <el-container>
    <!-- 二级路由 -->
    <el-header class="header" height="60px">
      <cms-header :tabs="tabs"/>
    </el-header>
    <!-- 二级路由 -->

    <el-main class="main">
      <router-view />
    </el-main>
    <PublishMessage :publisherList="publisherList" ref="publishMessage" @on-submit="submitFn" />
  </el-container>
</template>

<script>
  import cmsHeader from "@/components/public/CMSHeader";
  import PublishMessage from "@/components/message/PublishMessage.vue";

  export default {
    name: "message",
    data () {
      return {
        publisherList: [{
          value: '1',
          label: 'B端用户'
        }, {
          value: '2',
          label: 'C端用户'
        }],
        tabs: [
          {
            name: "消息列表",
            path: "/message/messageList",
            btns: [
              {
                name: '发布消息',
                click: (() => {
                  this.addMessageFn();
                })
              }
            ]
          }
        ],
        search: {
          receiveObject: "", // 接受对象
          title: '',// 消息标题
          content: '', // 内容
          pageNo: 1,
          pageSize: 10
        },
      };
    },
    methods: {
      addMessageFn () {
        this.$refs.publishMessage.showFn();
      },
      submitFn () {
        let _this = this;
        _this.axios({
          method:'post',
          url:_this.$store.state.api.message.get_message_insert,
          data: _this.search
        }).then(res => {
          console.log(res,2222222);
          const { data } = res;
          console.log(data)
          if (!data) {
            this.$message.error('操作失败')
            return;
          }
          if (data.status.code === 200) {
            this.$message.success('操作成功')
            _this.$router.go(0);
          } else {
            this.$message.error('操作失败')
          }
        });
      }
    },
    components: {
      cmsHeader,
      PublishMessage
    }
  };
</script>

<style scoped>
  .main {
    background: #f2f3f5;
  }
</style>
