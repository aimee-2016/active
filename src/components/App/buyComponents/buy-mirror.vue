<template>
  <div class="buy-mirror">
    <div class="wrap">
      <h2>镜像选择</h2>
      <div class="mirror-group">
        <span
          v-for="(item,index) in mirrorTypeGroup"
          :key="index"
          :class="{selected: mirrorType === item.value}"
          @click="changeMirrorType(item)"
        >{{ item.text }}</span>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.buy-mirror {
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
    .mirror-group {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      > span {
        margin-right: 10px;
        margin-top: 10px;
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
</style>
<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  props: {
    mirrorTypeGroup: {
      type: Array,
      default: () => {
        return new Array();
      }
    },
    mirrorType: {
      type: String,
      default: ""
    }
  },
  methods: {
    changeMirrorType(item) {
      this.$emit("changeMirrorType", item);
    }
  }
};
</script>