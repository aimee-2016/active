<template>
  <div class="active-before">
    <div class="wrapper">
      <img src="../../../assets/img/active/actice-before-banner.png">
      <p>活动已经结束咯，去活动中心看看其它活动吧！</p>
      <Button type="primary" @click="$router.push('/activity/')">去活动中心</Button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
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

  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.active-before {
  padding: 50px 0 300px 0;
  background: rgba(255, 255, 255, 1);
  text-align: center;
  p {
    margin-top: 50px;
    margin-bottom: 40px;
    font-size: 28px;
    font-family: MicrosoftYaHei;
  }
}
</style>
