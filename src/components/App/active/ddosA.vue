<template>
  <div>
    <pc class="pc"></pc>
    <mobile class="mobile"></mobile>
  </div>
</template>

<script type="text/ecmascript-6">
import pc from './ddos.vue'
import mobile from './hignCopy.vue'
export default {
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  },
  computed: {

  },
  watch: {

  },
  components: {
    pc,
    mobile
  },
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
@media screen and (min-width: 1221px) {
  .pc {
    display: block;
  }
  .mobile {
    display: none;
  }
}
@media screen and (max-width: 1220px) {
  .pc {
    display: none;
  }
  .mobile {
    display: block;
  }
}
// @media screen and (min-width: 641px) {

// }
// @media screen and (max-width: 1366px) {
 
// }

// @media screen and (max-width: 1024px) {
// }

// @media screen and (max-width: 640px) {

// }
</style>
