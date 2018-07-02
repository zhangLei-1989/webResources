<template>
  <el-row :gutter="20">
    <el-col :span="11">
      <el-row>
        <el-col v-for="(item,index) in stateTabs" :key="'tabs'+index" :span="4" class="nav-item">
          <router-link class="router-link" @click.native="changeTabFn(index, item)"
                       :class="{'active':index===currentIndex}"
                       :to="item.path">{{item.name}}
          </router-link>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="11">
      <el-row :gutter="6" class="borderRight">
        <el-col :span="4" class="btn-item">
          <el-button v-if="stateBtn && isShowButton" type="danger" class="btn" @click="clickFn">{{stateBtn.name}}
          </el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="2" style="padding:0 !important;">
      <el-row>
        <el-dropdown>
          <el-col :span="24" class="header-container el-dropdown-link">
            <img class="header-img" :src="userInfo.headerImage"/>
            <span class="nickname" v-text="userInfo.nickName"></span>
          </el-col>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>消息</el-dropdown-item>
            <div @click="logout">
              <el-dropdown-item>退出</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  import tool from "../../../../static/js/tool.js";
  export default {
    name: "cms-custmer-header",
    props: {
      tabs: {
        type: Array,
        default: [],
        required: true
      },
      btn: {
        type: Object
      }
    },
    data() {
      return {
        stateTabs: [],
        stateBtn: {},
        currentIndex: 0,
        isShowButton: true
      };
    },
    computed: {
      userInfo: function () {
        let user = tool.session.get("userInfo");
        if (user) {
          user.headerImage = this.$store.state.userInfo.headerImage;
          console.info('userInfo: ', user)
          // 判断user里面是有有头像的url如果有则给user.headerImage赋值 如果没有使用模式的头像
        } else {
          user = this.$store.state.userInfo;
        }
        return user;
      }
    },
    methods: {
      clickFn() {
        this.$emit('on-click');
      },
      changeTabFn(index, item) {
        this.currentIndex = index;
        this.isShowButton = item.isShowButton;
      },
      logout() {
        tool.session.delAll();
        this.$router.replace('/login');
      }
    },
    created() {
      const {tabs} = this.$props;
      console.info('tabs', tabs);
      if (tabs) {
        this.stateTabs = tabs;
      }
      this.stateBtn = this.btn;
    }
  };
</script>

<style scoped>
  .nav-item {
    text-align: center;
    height: 60px;
    line-height: 60px;
  }

  .nav-item a.router-link {
    display: block;
    width: 100%;
    height: 100%;
    color: #2e3445;
    font-size: 14px;
    position: relative;
  }

  .nav-item a.router-link.active {
    color: #ed0536;
  }

  .nav-item a.router-link.active::after {
    content: "";
    display: block;
    width: 100%;
    height: 3px;
    background: #ed0536;
    bottom: 0;
    position: absolute;
  }

  .btn-item {
    text-align: center;
    line-height: 60px;
    float: right;
    width: 80px;
    height: 30px;
    margin-right: 20px;
  }

  .borderRight {
    border-right: 1px solid #f2f6f7;
    padding-right: 10px;
  }

  .borderRight:empty {
    border-right: 0px;
    padding-right: 0px;
    height: 60px;
  }

  .btn-item .btn {
    width: 100% !important;
    padding: 12px 0px !important;
    text-align: center;
    border-radius: 3px;
  }

  .el-button--danger {
    background: #ed0536;
    border-color: #ed0536;
  }

  .header-container {
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: center;
  }

  .header-img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .nickname {
    padding-left: 10px;
    font-size: 14px;
  }
</style>
