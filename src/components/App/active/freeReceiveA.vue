<template>
  <div>
    <pc class="pc"></pc>
    <mobile class="mobile"></mobile>
  </div>
</template>

<script type="text/ecmascript-6">
import pc from './freeReceive.1.vue'
import mobile from './MfreeAnnual.vue'
export default {
  metaInfo: {
      title: '云服务器免费体验试用 - 免费云服务器试用可申请1年、6个月、3个月、30天 - 活动中心 - 新睿云', // set a title
      meta: [{                 // set meta
        name: 'keywords',
        content: '云服务器免费,云服务器免费试用,免费云服务器试用一年,免费云服务器试用一年,免费云服务器申请,云服务器免费体验'
      },
        {                 // set meta
          name: 'description',
          content: '新睿云推出爆款云服务器免费试用活动，2款云服务器产品最长免费试用1年，每天随时可领，押金随时可退，2018年8月3日开始，总量有限，先到先得！'
        }]
    },
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
</style>
