<template>
  <div class="buy-disk">
    <div class="wrap">
      <div class="content" :class="{narrow: isNotServer}">
        <h2>云硬盘</h2>
        <div class="specification-item">
          <div class="item-label">
            <span>磁盘名称</span>
          </div>
          <div class="item-text">
            <Input
              v-model="diskSpecification.systemDiskName"
              placeholder="请输入磁盘名"
              style="width: 300px"
              :maxlength="30"
            ></Input>
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
        <div v-for="(diskitem,diskindex) in diskSpecification.systemDisk" :key="diskindex">
          <div class="specification-item">
            <div class="item-label">
              <span>数据盘类型</span>
            </div>
            <div class="item-text">
              <span
                v-for="(item,index) in diskSpecification.systemDiskTypeGroup"
                :key="index"
                :class="{selected: diskitem.type === item.value,disabled: area.gpuserver == 1 && item.value !== 'ssd' }"
                @click="changeSystemDiskType(item,diskindex)"
              >{{ item.name }}</span>
              <span class="cancel" @click="deleteSystemDisk(diskindex)" v-if="diskindex !== 0">取消</span>
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
                :min="diskitem.minDiskSize"
                :max="1000"
                :step="20"
                :points="[300,500,800]"
                style="margin-right:30px;vertical-align: middle;"
              ></i-slider>
              <InputNumber
                :max="1000"
                :min="diskitem.minDiskSize"
                v-model="diskitem.size"
                size="large"
                :step="20"
                :precision="0"
              ></InputNumber>
            </div>
          </div>
        </div>
        <div class="specification-item">
          <div class="item-label">
            <span>
              价格
              <Poptip trigger="hover" placement="top-start" content="磁盘总价">
                <span class="label-hint">?</span>
              </Poptip>
            </span>
          </div>
          <div class="item-text">
            <p class="price">￥750/月</p>
          </div>
        </div>
        <div class="specification-item short">
          <div class="item-label">
            <span>自动续费</span>
          </div>
          <div class="item-text">
            <div class="renewal">
              <i-switch v-model="diskSpecification.autoRenewal" @on-change="changeAutoRenewal"></i-switch>
              <span>开启后，资源到期会自动续费，请确保账户内有足够的余额。</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.buy-disk {
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
            &.disabled {
              background: #666666;
              border: 1px solid #666666;
              cursor: not-allowed;
              color: #fff;
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
          .renewal {
            > span {
              margin-right: 10px;
              font-size: 12px;
              font-family: MicrosoftYaHei;
              color: rgba(153, 153, 153, 1);
              line-height: 33px;
            }
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
    area: {
      type: Object,
      default: () => {
        return new Object();
      }
    },
    isNotServer: {
      type: String,
      default: ""
    },
    diskSpecification: {
      type: Object,
      default: () => {
        return new Object();
      }
    }
  },
  methods: {
    addSystemDisk() {
      this.$emit("addSystemDisk");
    },
    changeSystemDiskType(item, index) {
      this.$emit("changeSystemDiskType", item, index);
    },
    deleteSystemDisk(diskindex) {
      this.$emit("deleteSystemDisk", diskindex);
    },
    changeAutoRenewal(val) {
      this.$emit("changeAutoRenewal", val);
    }
  },
  computed: {
    diskCountLimit() {
      return 5 - this.diskSpecification.systemDisk.length;
    }
  },
  watch: {}
};
</script>