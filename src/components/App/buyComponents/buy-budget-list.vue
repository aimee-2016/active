<template>
  <div class="buy-budget-list">
    <div class="wrap">
      <h3>
        预算清单
        <span v-if="true">1</span>
      </h3>
      <button>查看清单详情</button>
    </div>
  </div>
</template>
<style lang="less" scoped>
.buy-budget-list {
  padding: 14px 20px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 20px -8px rgba(0, 0, 0, 0.5);
  .wrap {
    display: flex;
    justify-content: space-between;
    > h3 {
      font-size: 18px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 36px;
      > span {
        width: 20px;
        height: 20px;
        background: rgba(255, 0, 0, 1);
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(255, 255, 255, 1);
        line-height: 20px;
        text-align: center;
        display: inline-block;
        border-radius: 50%;
      }
    }
    > button {
      cursor: pointer;
      border: none;
      outline: none;
      padding: 8px 18px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(255, 255, 255, 1);
      background: rgba(42, 153, 242, 1);
      border-radius: 2px;
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