<template>
  <div class="buy-header">
    <div class="wrap">
      <h1>{{titleName}}</h1>
      <a @click="toOldVersion">回到旧版</a>
    </div>
  </div>
</template>
<style lang="less" scoped>
.buy-header {
  height: 44px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -2px 8px 0px rgba(193, 193, 193, 0.3);
  .wrap {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    > h1 {
      font-size: 18px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 44px;
    }
    a {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(66, 151, 242, 1);
      line-height: 44px;
    }
  }
}
</style>
<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  props: {
    titleName: {
      type: String,
      default: "购买云服务器"
    }
  },
  methods: {
    toOldVersion() {
      this.$emit("toOldVersion");
    }
  }
};
</script>