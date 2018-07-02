<template>
  <div>
    <group :single="true"
           :fixed="true">
      <btn :cut="1"
           :text="'下一步'"
           :next="true"
           @click="nextStep">
      </btn>
    </group>
    <group>
      <ele>
        <div>出借人真实出借金额</div>
        <input slot="right"
               type="number"
               placeholder="请输入出借人真实出借金额"
               v-model="realLend">
        <div slot="unit">元</div>
      </ele>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        realLend: '',
        id: '',
        amount: '',
        type: '',
      }
    },
    methods: {
      nextStep () {
        this.$router.go(`/createReport/${this.id}/${this.amount}/${this.realLend}/${this.type}`)
      },
    },
    components: {
    },
    route: {
      data ({ to: { params: { id, amount, type } } }) {
        this.id = id
        this.amount = parseFloat(amount)
        this.type = type
      }
    }
  }
</script>
<style lang="scss"
       scoped>

</style>
