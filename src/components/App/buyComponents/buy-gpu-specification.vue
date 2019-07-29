<template>
  <div class="buy-server-specification">
    <div class="wrap">
      <h2>主机规格选择</h2>
      <div class="specification-item">
        <div class="item-label">
          <span>系统盘类型</span>
        </div>
        <div class="item-text">
          <span
            v-for="(item,index) in gpuSpecification.rootDiskTypeGroup"
            :key="index"
            :class="{selected: gpuSpecification.rootDiskType === item.value}"
            @click="changeRootDiskType(item)"
          >{{ item.name }}</span>
        </div>
      </div>
      <div class="specification-item">
        <div class="item-label">
          <span>系统盘容量</span>
        </div>
      </div>
      <div class="specification-item text-hint">
        <div class="item-label"></div>
        <div class="item-text">
          <p>
            <span @click="addSystemDisk">添加数据盘</span>你还可以添加
            <span>{{diskCountLimit}}块</span>数据盘
          </p>
        </div>
      </div>
      <div v-for="(diskitem,diskindex) in gpuSpecification.systemDisk" :key="diskindex">
        <div class="specification-item">
          <div class="item-label">
            <span>数据盘类型</span>
          </div>
          <div class="item-text">
            <span
              v-for="(item,index) in serverSpecification.systemDiskTypeGroup"
              :key="index"
              :class="{selected: diskitem.type === item.value}"
              @click="changeSystemDiskType(item,diskindex)"
            >{{ item.name }}</span>
            <span class="cancel" @click="deleteSystemDisk(diskindex)">取消</span>
          </div>
        </div>
        <div class="specification-item">
          <div class="item-label">
            <span>数据盘容量</span>
          </div>
          <div class="item-slider">
            <i-slider
              v-model="diskitem.size"
              unit="GB"
              :min="20"
              :max="1000"
              :step="10"
              :points="[300,500,800]"
              style="margin-right:30px;vertical-align: middle;"
            ></i-slider>
            <InputNumber
              :max="1000"
              :min="20"
              v-model="diskitem.size"
              size="large"
              :step="10"
              :precision="0"
            ></InputNumber>
          </div>
        </div>
      </div>
      <div class="specification-item">
        <div class="item-label">
          <span>
            价格
            <Poptip trigger="hover" placement="top-start" content="DDOS防护带宽费用">
              <span class="label-hint">?</span>
            </Poptip>
          </span>
        </div>
        <div class="item-text">
          <p class="price">￥750/月</p>
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
        .label-hint {
          display: inline-block;
          text-align: center;
          color: #2a99f2;
          width: 14px;
          height: 14px;
          border: 1px solid #2a99f2;
          border-radius: 50%;
          font-size: 12px;
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
        .cancel {
          text-align: left;
          color: #4297f2;
          border: none;
        }
        > p {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(51, 51, 51, 1);
          > span {
            color: rgba(66, 151, 242, 1);
          }
          span:nth-child(1) {
            cursor: pointer;
            margin-right: 20px;
          }
          span:nth-child(2) {
            color: #f85e1d;
          }
        }
        .price {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          color: rgba(255, 98, 75, 1);
          line-height: 33px;
        }
      }
    }
    .text-hint {
      margin-top: 10px;
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
    gpuSpecification: {
      type: Object,
      default: () => {
        return new Object();
      }
    },
    gpuSpecificationGroup: {
      type: Object,
      default: () => {
        return new Object();
      }
    }
  },
  methods: {
    changeRootDiskType(item) {
      this.$emit("changeRootDiskType", item);
    },
    addSystemDisk() {
      this.$emit("addSystemDisk");
    },
    changeSystemDiskType(item, index) {
      this.$emit("changeSystemDiskType", item, index);
    },
    deleteSystemDisk(diskindex) {
      this.$emit("deleteSystemDisk");
    }
  },
  computed: {
    diskCountLimit() {
      return 5 - this.serverSpecification.systemDisk.length;
    }
  },
  watch: {}
};
</script>