<template>
  <div class="buy-server-specification">
    <div class="wrap">
      <h2>主机规格选择</h2>
      <div class="specification-item">
        <div class="item-label">
          <span>核心数</span>
        </div>
        <div class="item-text">
          <span
            v-for="(item,index) in serverSpecificationGroup.kernelList"
            :key="index"
            :class="{selected: serverSpecification.CPU === item.value}"
            @click="changeCPU(item)"
          >{{ item.name }}</span>
        </div>
      </div>
      <div class="specification-item">
        <div class="item-label">
          <span>内存</span>
        </div>
        <div class="item-text">
          <span
            v-for="(item,index) in serverSpecification.memoryGroup"
            :key="index"
            :class="{selected: serverSpecification.memory === item.value}"
            @click="changeMemory(item)"
          >{{ item.name }}</span>
        </div>
      </div>
      <div class="specification-item">
        <div class="item-label">
          <span>系统盘类型</span>
        </div>
        <div class="item-text">
          <span
            v-for="(item,index) in serverSpecification.rootDiskTypeGroup"
            :key="index"
            :class="{selected: serverSpecification.rootDiskSize === item.value}"
            @click="changeRootDiskType(item)"
          >{{ item.name }}</span>
        </div>
      </div>
      <div class="specification-item">
        <div class="item-label">
          <span>系统盘容量</span>
        </div>
        <div class="item-text">
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.buy-server-specification {
  margin-top: 10px;
  .wrap {
    width: 1200px;
    margin: 0 auto;
    padding: 30px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 14px -7px rgba(166, 166, 166, 0.3);
    > h2 {
      font-size: 18px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    .specification-item {
      margin-top: 20px;
      display: flex;
      .item-label {
        width: 90px;
        padding-right: 20px;
        text-align: right;
        > span {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(51, 51, 51, 1);
          line-height: 33px;
        }
      }
      .item-text {
        display: flex;
        > span {
          text-align: center;
          margin-right: 10px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(102, 102, 102, 1);
          width: 80px;
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
    serverSpecification: {
      type: Object,
      default: () => {
        return new Object();
      }
    },
    serverSpecificationGroup: {
      type: Object,
      default: () => {
        return new Object();
      }
    }
  },
  methods: {
    changeCPU(item) {
      console.log(item);
    },
    changeMemory(item) {
      console.log(item);
    },
    changeRootDiskType(item) {}
  },
  watch: {}
};
</script>