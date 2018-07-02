<template>
  <div>
    <group :first="true">
      <ele class="search">
        <div class="icon-box">
          <div class="icon"></div>
          <div class="bg fix"></div>
        </div>
        <input growing-track="true"
               placeholder="搜索"
               v-model="filter"
               debounce="500"
               type="search">
      </ele>
    </group>
    <group>
      <div slot="tip_top"
           class="tip">
        <ele>
          <div>全部好友（{{list.length}}）</div>
        </ele>
      </div>
      <ele v-for="user in list | filterBy filter">
        <div class="user"
             v-if="user.b_credit"
             @click="goNext(user.id)">
          <div class="box icon"
               :style="{backgroundImage: 'url(' + user.c_head + ')'}">
            {{user.c_head ? '' : user.c_name}}
          </div>
          <div class="box">
            <div class="name">{{user.c_name}}</div>
            <div class="nickName">{{user.c_memo ? user.c_memo : '无备注'}}</div>
          </div>
        </div>
        <div v-else
             class="user"
             @click="noCredit">
          <div class="box icon"
               :style="{backgroundImage: 'url(' + user.c_head + ')'}">
            {{user.c_head ? '' : user.c_name}}
          </div>
          <div class="box">
            <div class="name">{{user.c_name}}</div>
            <div class="nickName">{{user.c_memo ? user.c_memo : '无备注'}}</div>
          </div>
        </div>
      </ele>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import my from 'api/my'

  export default{
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        list: [],
        filter: ''
      }
    },
    components: {},
    computed: {},
    methods: {
      goNext (cUserId) {
        this.$router.go(`/creditReportSimpleMine/${cUserId}`)
      },
      noCredit () {
        this.$router.go('/friendsNoCredit')
      }
    },
    route: {},
    created () {
      my.getMyFriend().then((list) => {
        this.list = list
      })
    },
    attached () {
    }
  }
</script>
<style rel="stylesheet/scss"
       lang="scss">
  .search input:focus + .clear {
    opacity: 1 !important;
    z-index: 2 !important;
  }
</style>
<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/function";

  .user {
    display: flex;
    width: 100%;
    .box {
      display: flex;
      flex-direction: column;
      margin-right: 10px;
      justify-content: space-between;
    }
    .icon {
      @include user-icon(40px);
    }
    .name {
      color: $MAIN_TEXT_COLOR;
    }
    .nickName {
      color: $TIP_COLOR;
      font-size: $TIP_FONT_SIZE;
      width: 180px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .search {
    @extend %search;
  }
</style>
