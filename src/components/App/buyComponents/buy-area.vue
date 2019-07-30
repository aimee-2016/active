<template>
  <div class="buy-area">
    <div class="wrap">
      <div class="content" :class="{narrow: isNotServer}">
        <h2>区域选择</h2>
        <div class="area-groups">
          <span
            v-for="(item,index) in areaGroup"
            :key="index"
            :class="{selected: area.zoneid === item.zoneid}"
            @click="changeArea(item)"
          >{{ item.zonename }}</span>
        </div>
        <p>不同区域的资源内网互不相通；请选择与您相近的区域，可降低网络时延、提高您客户的访问速度。</p>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.buy-area {
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
      .area-groups {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        > span {
          margin-right: 10px;
          margin-top: 10px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(102, 102, 102, 1);
          padding: 5px 25px;
          border: 1px solid rgba(217, 217, 217, 1);
          line-height: 23px;
          cursor: pointer;
          &.selected {
            color: rgba(66, 151, 242, 1);
            box-shadow: 0px 2px 10px -3px rgba(66, 151, 242, 0.49);
            border: 1px solid rgba(66, 151, 242, 1);
          }
        }
      }
      > p {
        margin-top: 10px;
        font-size: 12px;
        font-family: MicrosoftYaHei;
        color: rgba(153, 153, 153, 1);
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
    areaGroup: {
      type: Array,
      default: () => {
        return new Array();
      }
    },
    area: {
      type: Object,
      default: () => {
        return new Object();
      }
    }
  },
  methods: {
    changeArea(item) {
      this.$emit("changeArea", item);
    }
  }
};
</script>