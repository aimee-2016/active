<template>
  <div class="buy-billing-type">
    <div class="wrap">
      <h2>计费方式选择</h2>
      <div class="billing-types">
        <span>包年包月</span>
        <span>实时计费</span>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.buy-billing-type {
  margin-top: 10px;
  .wrap {
    width: 1200px;
    padding: 30px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 14px -7px rgba(166, 166, 166, 0.3);
    > h2 {
      font-size: 18px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    .billing-types {
      display: flex;
      margin-top: 20px;
      > span {
        margin-right: 10px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(102, 102, 102, 1);
        padding: 5px 25px;
        border: 1px solid rgba(217, 217, 217, 1);
        line-height: 25px;
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