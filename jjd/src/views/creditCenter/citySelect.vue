<template>
  <div keep-alive>
    <group :first="true"
           class="city-select-box">
      <city-list @set-address="setAddressDistrict"
                 keep-alive></city-list>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import cityList from 'components/mixin/cityList'
  import {
    setAddress
  } from 'store/actions'

  export default{
    vuex: {
      getters: {},
      actions: {
        setAddress
      }
    },
    data () {
      return {}
    },
    components: {
      cityList
    },
    computed: {},
    methods: {
      setAddressDistrict (obj) {
        const address = obj.p.name + obj.c.name + obj.d.name + obj.r
        this.setAddress({
          addressObj: obj,
          addressDistrict: address
        })
        window.history.back()
      }
    },
    route: {},
    created () {
    },
    attached () {
    }
  }
</script>

<style lang="scss"
       scoped>
</style>
