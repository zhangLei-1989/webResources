<template>
  <div>
    <!-- 补充证据和反馈证据出现的条件：
        首先判断type：出借人还是借款人 （查看者的身份 0.其他用户 1.借款人 2.出借人 3.担保人）
        （ 1等待出借人反馈证据 2待平台处理 3已被接受 4已被驳回 5借款人补充证据待平台处理 6出借人补充证据待平台处理）
        借款人（1）在举报被驳回的时候显示补充证据按钮（4）
        出借人（2）在接受借款人举报的时候显示反馈证据按钮（1）
                  在举报被接受的时候显示补充证据按钮（3）-->
    <group :single="true"
           v-if="(type === 1 && state === 4) || (type === 2 && state === 3)"
           :fixed="true">
      <btn :cut="1"
           :text="'补充证据'"
           :next="true"
           @click="updateReport">
      </btn>
    </group>
    <group :single="true"
           v-if="type === 2 && state === 1"
           :fixed="true">
      <btn :cut="1"
           :text="'反馈证据'"
           :next="true"
           @click="addBackReport">
      </btn>
    </group>
    <!-- 页头显示语句的条件：
            等待出借人反馈证据 （0）
            等待平台处理（1）
            本次举报已被驳回（2）
            本次举报已被接受（3）-->
    <!--  state：1等待出借人反馈证据 2待平台处理 3已被接受 4已被驳回 5借款人补充证据待平台处理 6出借人补充证据待平台处理
           等待出借人反馈证据 （0）：1等待出借人反馈证据
           等待平台处理（1）：2待平台处理 5借款人补充证据待平台处理 6出借人补充证据待平台处理
           本次举报已被驳回（2）：4已被驳回
           本次举报已被接受（3）：3已被接受 -->
    <group :first="true">
      <ele>
        <div class="top-status">
          <div class="status-img"
               :class="{ok: state === 3, waiting: state === 1 || state === 2 || state === 5 || state === 6, failed: state === 4}"></div>
          <div v-if="state === 1">等待出借人反馈证据</div>
          <div v-if="state === 2 || state === 5 || state === 6">等待平台处理</div>
          <div v-if="state === 4">本次举报已被驳回</div>
          <div v-if="state === 3">本次举报已被接受</div>
        </div>
      </ele>
    </group>
    <!-- 状态细节即时间表 -->
    <group>
      <ele>
        <div class="status-detail">
          <!-- 无论什么状态都会有发起举报这个时间点 -->
          <div class="status-ele ok">
            <div class="time">
              <div>{{getTime(list[0])}}</div>
            </div>
            <div class="status">借款人发起举报</div>
          </div>
          <!-- 遍历list -->
          <div v-for="li in list"
               class="status-ele ok">
            <div class="time">
              <div>{{getTime(li)}}</div>
            </div>
            <div class="status">{{getStatus(li)}}</div>
            <!-- 原因结果建议的返回条件为平台已接受或者已驳回 -->
            <div class="status"
                 v-if="(state === 4 || state === 3) && $index === list.length - 1">结果：{{result}}</div>
            <div class="status"
                 v-if="(state === 4 || state === 3) && $index === list.length - 1">原因：{{reason}}</div>
            <div class="status"
                 v-if="(state === 4 || state === 3) && $index === list.length - 1">建议：{{advice}}</div>
          </div>
        </div>
      </ele>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import ioureport from 'api/ioureport'
  import reasonList from 'tools/reasonList'

  export default {
    data () {
      return {
        id: '',
        // 去除step改为使用state判断状态
        // step: 0, // 0，等待出借人反馈证据；1，等待平台处理；2，本次举报已被驳回；3，本次举报已被接受
        state: 1,
        result: '',
        reason: '',
        advice: '',
        list: [{}],
      }
    },
    methods: {
      nextStep () {
        this.$router.go(`/createReport/${this.id}/${this.amount}`)
      },
      getTime (e) {
        return new Date(e.t_borrower_feedback_tm || e.t_lender_feedback_tm || 0).toLocaleDateString()
      },
      getStatus (e) {
        if (e.n_state === 1) {
          return '等待出借人反馈证据'
        } else if (e.n_state === 2) {
          return '出借人已反馈证据'
        } else if (e.n_state === 3) {
          return '平台已接受本次举报'
        } else if (e.n_state === 4) {
          return '平台已驳回本次举报'
        } else if (e.n_state === 5) {
          return '等待借款人反馈证据'
        } else if (e.n_state === 6) {
          return '等待出借人反馈证据'
        }
        return '正在等待平台处理'
      },
      getReportIOU () {
        ioureport.getReportIOU({
          iouId: this.id,
        }).then((res) => {
          this.state = res.n_state
          // 去除step
          // if (res.n_state === 1) {
          //   this.step = 0
          // } else if (res.n_state === 5 || res.n_state === 6 || res.n_state === 2) {
          //   this.step = 1
          // } else if (res.n_state === 4) {
          //   this.step = 2
          // } else if (res.n_state === 3) {
          //   this.step = 3
          // }
          if (res.n_operate) {
            const reasonObject = reasonList[res.n_operate]
            this.result = reasonObject.result
            this.reason = reasonObject.reason
            this.advice = reasonObject.advice
          }
          this.list = res.l_deal_list
        })
      },
      updateReport () {
        // this.$router.go(`/addBackReport/${this.id}/${this.amount}/1`)
      },
      addBackReport () {
        // this.$router.go(`/addBackReport/${this.id}/${this.amount}/1`)
      },
    },
    components: {
    },
    route: {
      data ({ to: { params: { id, type } } }) {
        this.id = id
        this.type = type
        this.getReportIOU()
      }
    }
  }
</script>
<style lang="scss"
       scoped>
  @import "../../scss/const";

  .top-status {
    height: 160px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .status-img {
    width: 80px;
    height: 80px;
    background: no-repeat center;
    &.ok {
      background-image: url("../../assets/report_success.svg");
    }
    &.waiting {
      background-image: url("../../assets/report_waiting.svg");
    }
    &.failed {
      background-image: url("../../assets/report_failed.svg");
    }
  }

  .status-detail {
    flex: 1;
    padding: 10px 0;
  }

  .status-ele {
    color: $TIP_COLOR;
    position: relative;
    min-height: 80px;
    padding-left: 20px;
    &::before {
      content: '';
      position: absolute;
      left: 5px;
      top: 3px;
      height: 100%;
      width: 1px;
      border-left: 1px dashed $BORDER_COLOR;
    }
    &::after {
      content: '';
      position: absolute;
      left: 0px;
      top: 2px;
      height: 10px;
      width: 10px;
      background-color: $BORDER_COLOR;
      border-radius: 5px;
    }
    &:last-child {
      min-height: 0;
      &::before {
        display: none;
      }
    }
    &.ok {
      color: $MAIN_COLOR;
      &::before {
        border-color: $MAIN_COLOR;
      }
      &::after {
        background-color: $MAIN_COLOR;
      }
    }
  }

  .time {
    display: flex;
    justify-content: space-between;
  }
</style>
