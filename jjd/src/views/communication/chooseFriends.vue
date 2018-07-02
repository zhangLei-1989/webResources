<template>
  <div>
    <div class="fixed">
      <ele>
        <div class="checkbox"
             @click.stop.prevent="chooseAll">
          <div :class="{chosen: friendsId.length == realList.length}"></div>
          <div class="desc">
            <div>总计 <span>{{friendsId.length}}</span> 人</div>
          </div>
        </div>
        <button slot="right"
                @click.stop.prevent="next">确认
        </button>
      </ele>
    </div>
    <group :first="true">
      <ele class="search">
        <div class="icon-box">
          <div class="icon"></div>
          <div class="bg fix"></div>
        </div>
        <input growing-track="true"
               placeholder="搜索"
               v-model="filter"
               type="search"
               debounce="500"
               slot="right">
      </ele>
    </group>
    <group>
      <div slot="tip_top"
           class="tip">
        <ele>
          <div>全部好友（{{realList.length}}）</div>
        </ele>
      </div>
      <ele v-for="user in realList| filterBy filter"
           @click.stop="choose(user)">
        <div class="checkbox">
          <div :class="{chosen: friendsId.includes(user.id)}"></div>
          <div class="user">
            <div class="box icon"
                 :style="{backgroundImage: 'url(' + user.c_head + ')'}">
              {{user.c_head ? '' : user.c_name.slice(0, 1)}}
            </div>
            <div class="box">
              <div class="name">{{user.c_name}}</div>
              <div class="nickName">{{user.c_memo ? user.c_memo : '无备注'}}</div>
            </div>
          </div>
        </div>
      </ele>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import my from 'api/my'
  import { setTempInfo } from 'store/actions'

  export default{
    vuex: {
      getters: {
        chooseFriends: state => state.temp.chooseFriends
      },
      actions: { setTempInfo }
    },
    data () {
      return {
        list: [
          {
            id: '001',
            c_name: '绿全',
            c_head: ''
          },
          {
            id: '002',
            c_name: '洪全',
            c_head: 'http://7xnw4h.com1.z0.glb.clouddn.com/com644_s'
          }
        ],
        lenderId: '',
        filter: '',
        friendsId: [],
        friendsName: []
      }
    },
    components: {},
//        filter: {
//            realList: function(item) {
//                item.id !== this.lenderId
//                return item
//            }
//        },
    computed: {
      realList () {
        return this.list.filter((e) => {
          if (e) {
            return e.id !== this.lenderId
          }
          return false
        })
      }
    },
    methods: {
      choose (user) {
        const id = user.id
        const name = user.c_name
        if (this.friendsId.includes(id)) {
          const index = this.friendsId.indexOf(id)
          this.friendsId.splice(index, 1)
          this.friendsName.splice(index, 1)
        } else {
          this.friendsId.push(id)
          this.friendsName.push(name)
        }
      },
      chooseAll () {
        if (this.friendsId.length !== this.realList.length) {
          this.friendsId = []
          this.realList.forEach((item) => {
            this.friendsId.push(item.id)
            this.friendsName.push(item.c_name)
          })
        } else {
          this.friendsId = []
          this.friendsName = []
        }
      },
      next () {
        window.history.back()
      }
    },
    route: {
      deactivate ({ next }) {
        // 缓存表单
        this.setTempInfo({ chooseFriends: this.$data })
        next()
      },
      data ({ to: { params: { lenderId } } }) {
        return {
          lenderId
        }
      }
    },
    created () {
      my.getMyFriend().then((list) => {
        this.list = list
      })
      // 应用表单缓存
      Object.assign(this.$data, this.chooseFriends)
      if (Object.keys(this.chooseFriends).length < 1) {
        window.history.back()
        return
      }
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
    }
  }

  .search {
    flex: 1;
    display: flex;
    background-color: transparent !important;
    .bg {
      background-color: white;
      position: absolute;
      width: -webkit-calc(100vw - 20px);
      height: 30px;
      top: 0;
    }
    .fix {
      width: calc(100vw - 20px);
    }
    .bg::before {
      @extend %btn-border;
      border: 1px solid $BORDER_COLOR;
    }
    &::before {
      display: none;
    }
    input {
      text-align: left;
      background-color: transparent;
    }
    .icon-box {
      width: 30px;
      height: 30px;
      position: relative;
    }
    .icon {
      width: 30px;
      height: 30px;
      background: url('../../assets/search.svg') no-repeat center {
        size: 20px;
      }
    ;
      position: absolute;
      top: 0;
      z-index: 1;
    }
  }

  .checkbox {
    display: flex;
    align-items: center;
    > :first-child {
      @extend %checkbox;
    }
  }

  .fixed {
    @extend %checkbox-bar;
    z-index: 2;
  }

  .desc {
    :first-child {
      color: $MAIN_COLOR;
    }
    :last-child {
      color: $TIP_COLOR;
      font-size: $TIP_FONT_SIZE;
    }
  }
</style>
