<template>
  <div class="buy-selected-config">
    <div class="wrap">
      <h3>已选择配置</h3>
      <ul class="config-list">
        <li>区域：华东1区</li>
        <li>计费模式：包年包月</li>
      </ul>
    </div>
  </div>
</template>
<style lang="less" scoped>
.buy-selected-config {
  margin-top: 5px;
  padding: 20px;
  background: rgba(255, 255, 255, 1);
  .wrap {
    > h3 {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      color: rgba(51, 51, 51, 1);
      font-weight: normal;
    }
    .config-list {
      margin-top: 20px;
      > li {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(102, 102, 102, 1);
        margin-bottom: 10px;
      }
    }
  }
}
</style>
<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  props: {},
  methods: {}
};
</script>