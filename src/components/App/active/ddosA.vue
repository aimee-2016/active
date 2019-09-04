<template>
  <div>
    <before v-if="time"></before>
    <div v-else>
      <pc class="pc"></pc>
      <mobile class="mobile"></mobile>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import pc from './ddos.vue'
import mobile from './MhignCopy.vue'
import before from './activeBefore.vue'
import axios from 'axios'
export default {
  data () {
    return {
      time: ''
    }
  },
  created () {
    this.checkTime()
  },
  mounted () {

  },
  methods: {
    checkTime() {
      axios.get('activity/activityTime.do', {
        params: {
          activityId: '53'
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.time = false
        } else {
          this.time = true
        }
      })
    }
  },
  computed: {
  },
  watch: {

  },
  components: {
    pc,
    mobile,
    before
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
