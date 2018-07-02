<template>
  <div>
    <group :first="true"
           class="no-last">
      <ele>
        <div>仍有欠款的网贷平台总数</div>
        <input type="number"
               v-model="count"
               @blur="handleCount"
               placeholder="≥5">
        <div slot="unit">个</div>
      </ele>
    </group>
    <group v-if="count">
      <div slot="tip_top"
           class="tip">
        <div>
          借款详情
        </div>
      </div>
      <ele more="true"
           v-for="i in parseInt(count)"
           track-by="$index"
           @click="toDetail(list[i])">
        <div>{{(list[i] || {}).c_plat_name || '平台' + ($index + 1)}}</div>
      </ele>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import jjjh from 'api/jjjh'
  import {
    setTempInfo,
  } from 'store/actions'
  import { alert } from 'tools/utils'

  export default {
    vuex: {
      actions: {
        setTempInfo,
      },
    },
    data () {
      return {
        count: '',
        id: '',
        list: [],
      }
    },
    methods: {
      getList () {
        jjjh.getIouInfo().then((res) => {
          this.id = res.id
          this.count = res.n_to_repay_plats || ''
          this.list = res.l_iou_detail_list || []
          this.setTempInfo({
            jjjhList: this.list,
          })
        })
      },
      toDetail (li) {
        if (li) {
          this.$router.go(`/jjjhBorrowInfo/${this.id}/${this.count}/${li.id}`)
        } else {
          // 没有详情 id 就传 0
          this.$router.go(`/jjjhBorrowInfo/${this.id}/${this.count}/0`)
        }
      },
      handleCount () {
        if (this.count !== '') {
          if (this.count < 5) {
            alert('当前仅支持身陷5家及以上网贷平台的学生申请')
            this.count = 5
          }
        }
      }
    },
    created () {
      this.getList()
    },
    compiled () {
      this.getList()
    },
  }
</script>
<style lang="scss"
       scoped>
  .no-last::after {
    display: none !important;
  }
</style>
