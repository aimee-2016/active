<template>
  <div>
    
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import reg from '../../../../util/regExp'
import VueQArt from 'vue-qart'
import $ from 'jquery'
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
    authInfo () {
      return this.$store.state.authInfo ? this.$store.state.authInfo : null
    },
    authInfoPersion () {
      return this.$store.state.authInfoPersion
    },
    userInfo () {
      return this.$store.state.userInfo
    },
  },
  watch: {

  },
  components: {

  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
