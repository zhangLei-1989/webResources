<template>
  <el-container>
    <!-- 二级路由 -->
    <el-header class="header" height="60px">
      <cms-header :tabs="tabs" ></cms-header>
    </el-header>
    <!-- 二级路由 -->
    <router-view></router-view>
    <add-cms-user ref="addUser"/>
  </el-container>
</template>

<script>
  import cmsHeader from "@/components/public/CMSHeader";
  import AddCmsUser from "@/components/houseAdmin/AddCmsUser.vue";

  export default {
    name: "houseAdmin",
    data() {
      return {
        tabs: [
          {
            name: '用户管理',
            path: '/houseAdmin/userManage',
            btns: [
              {
                name: '新增用户',
                click: (() => {
                  this.addUserFn();
                })
              }
            ]
          },
          {
            name: '房行管理',
            path: '/houseAdmin/houseAdminManage'
          }
        ]
      };
    },
    components: {
      cmsHeader,
      AddCmsUser
    },
    methods: {
      addUserFn() {
        this.$refs.addUser.showFn('add', {});
      },
      queryCMSrole() {
      }
    },
    created() {
      const self = this;
      self.queryCMSrole();
    }
  };
</script>

<style scoped>
  .main {
    background: #f2f3f5;
  }
</style>
