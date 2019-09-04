<template>
  <div>
    <pc class="pc"></pc>
    <mobile class="mobile"></mobile>
  </div>
</template>

<script type="text/ecmascript-6">
import pc from './ActiveCenter.vue'
import mobile from './Sort.vue'
export default {
  metaInfo: {
    title: '云服务器低价优惠活动 - 特价云服务器体验 - 活动中心 - 新睿云', // set a title
    meta: [{                 // set meta
      name: 'keywords',
      content: '云服务器活动,云服务器活动,低价云服务器,云服务器体验,云服务器优惠,特价云服务器'
    },
      {                 // set meta
        name: 'description',
        content: '新睿云活动中心汇聚了云服务器,云数据库,对象存储等产品,推出新春采购季、免费云服务器、打折促销,分享赚时长等多种优惠活动！'
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
