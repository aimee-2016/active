<template>
  <div class="buy-billing-type">
    <div class="wrap">
      <div class="content" :class="{narrow: isNotServer}">
        <h2>计费方式选择</h2>
        <div class="billing-types">
          <span
            v-for="(item,index) in billingTypeGroup"
            :key="index"
            :class="{selected: billingType === item.value}"
            @click="changeBillingType(item)"
          >{{ item.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.buy-billing-type {
  margin-top: 10px;
  .wrap {
    width: 1200px;
    margin: 0 auto;
    .content {
      padding: 30px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 14px -7px rgba(166, 166, 166, 0.3);
      &.narrow {
        width: 800px;
      }
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
          width: 106px;
          text-align: center;
          border: 1px solid rgba(217, 217, 217, 1);
          line-height: 33px;
          cursor: pointer;
          &.selected {
            color: rgba(66, 151, 242, 1);
            box-shadow: 0px 2px 10px -3px rgba(66, 151, 242, 0.49);
            border: 1px solid rgba(66, 151, 242, 1);
          }
        }
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
  props: {
    isNotServer: {
      type: String,
      default: ""
    },
    billingTypeGroup: {
      type: Array,
      default: () => {
        return new Array();
      }
    },
    billingType: {
      type: String,
      default: ""
    }
  },
  methods: {
    changeBillingType(item) {
      this.$emit("changeBillingType", item);
    }
  }
};
</script>