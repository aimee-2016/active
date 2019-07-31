<template>
  <div class="buy-server-specification">
    <div class="wrap">
      <div class="content" :class="{narrow: isNotServer}">
        <h2>{{isNotServer? '数据库' : '主机'}}规格选择</h2>
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
              :class="{selected: serverSpecification.rootDiskType === item.value}"
              @click="changeRootDiskType(item)"
            >{{ item.name }}</span>
          </div>
        </div>
        <div class="specification-item">
          <div class="item-label">
            <span>系统盘容量</span>
          </div>
          <div class="item-slider">
            <i-slider
              v-model="serverSpecification.rootDiskSize"
              unit="GB"
              :min="40"
              :max="1000"
              :step="10"
              :points="[300,500,800]"
              style="margin-right:30px;vertical-align: middle;"
            ></i-slider>
            <InputNumber
              :max="1000"
              :min="40"
              v-model="serverSpecification.rootDiskSize"
              size="large"
              :step="10"
              :precision="0"
            ></InputNumber>
          </div>
        </div>
        <div class="specification-item text-hint">
          <div class="item-label"></div>
          <div class="item-text">
            <p>
              <span @click="addServerSystemDisk">添加数据盘</span>你还可以添加
              <span>{{diskCountLimit}}块</span>数据盘
            </p>
          </div>
        </div>
        <div v-for="(diskitem,diskindex) in serverSpecification.systemDisk" :key="diskindex">
          <div class="specification-item">
            <div class="item-label">
              <span>数据盘类型</span>
            </div>
            <div class="item-text">
              <span
                v-for="(item,index) in serverSpecification.systemDiskTypeGroup"
                :key="index"
                :class="{selected: diskitem.type === item.value}"
                @click="changeServerSystemDiskType(item,diskindex)"
              >{{ item.name }}</span>
              <span class="cancel" @click="deleteServerSystemDisk(diskindex)">取消</span>
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
              <Poptip trigger="hover" placement="top-start" content="包含CPU、内存、系统盘与数据盘在内的价格总计">
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
  </div>
</template>
<style lang="less" scoped>
.buy-server-specification {
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
        .item-slider {
          width: 500px;
          display: flex;
          align-items: center;
        }
      }
      .text-hint {
        margin-top: 10px;
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
      this.$emit("changeCPU", item);
    },
    changeMemory(item) {
      this.$emit("changeMemory", item);
    },
    changeRootDiskType(item) {
      this.$emit("changeRootDiskType", item);
    },
    addServerSystemDisk() {
      this.$emit("addServerSystemDisk");
    },
    changeServerSystemDiskType(item, index) {
      this.$emit("changeServerSystemDiskType", item, index);
    },
    deleteServerSystemDisk(diskindex) {
      this.$emit("deleteServerSystemDisk", diskindex);
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