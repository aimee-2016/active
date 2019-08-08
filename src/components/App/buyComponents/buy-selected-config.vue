<template>
  <div class="buy-selected-config">
    <div class="wrap">
      <h3>已选择配置</h3>
      <ul class="config-list" v-if="currentServerConfig">
        <div>
          <li>服务器类型：{{ serverConfigText.serverTypeText}}</li>
          <li>区域：{{ serverConfigText.area.zonename }}</li>
          <li>计费模式：{{serverConfigText.billingTypeText}}</li>
          <li>购买时长：{{serverConfigText.buyTimeText}}</li>
          <li>镜像：{{serverConfigText.mirrorName}}</li>
          <li>规格：{{serverConfigText.cpu + "核" + serverConfigText.memory + "G"}}</li>
          <li>系统盘与存储：{{serverConfigText.rootDiskSize + "G " + serverConfigText.rootDiskType + " " + serverConfigText.diskListText}}</li>
          <li
            v-if="serverConfigText.serverType ==='NOKIAServer'"
          >防护带宽： {{serverConfigText.defendBandwidth + "GB"}}</li>
        </div>
        <div class="base">
          <li>网络：{{serverConfigText.network}}</li>
          <li>公网IP：{{serverConfigText.publicIPTypeText}}</li>
          <li>带宽大小：{{serverConfigText.bandwidth + "MB"}}</li>
          <li>防火墙：{{serverConfigText.firewall}}</li>
          <li>购买数量：{{serverConfigText.buyCount + "台"}}</li>
        </div>
        <div
          class="base right"
          v-show="serverConfigText.step === 3 || serverConfigText.step === 2 "
        >
          <button @click="addToCart">加入预算清单</button>
        </div>
      </ul>
      <ul class="config-list" v-if="currentDiskConfig">
        <li>区域：{{ diskConfigText.area.zonename }}</li>
        <li>计费模式：{{diskConfigText.billingTypeText}}</li>
        <li>购买时长：{{diskConfigText.buyTimeText}}</li>
        <li>数据盘：{{diskConfigText.diskListText}}</li>
        <li>购买数量：{{diskConfigText.buyCount}}</li>
        <div class="base right">
          <button @click="addToCart">加入预算清单</button>
        </div>
      </ul>
      <ul class="config-list" v-if="currentNetworkipConfig">
        <li>区域：{{ networkIPConfigText.area.zonename }}</li>
        <li>网络：{{networkIPConfigText.network}}</li>
        <li>计费模式：{{networkIPConfigText.billingTypeText}}</li>
        <li>带宽大小：{{networkIPConfigText.bandwidth + "MB"}}</li>
        <li>购买时长：{{networkIPConfigText.buyTimeText}}</li>
        <li>购买数量：{{networkIPConfigText.buyCount}}</li>
        <div class="base right">
          <button @click="addToCart">加入预算清单</button>
        </div>
      </ul>
      <ul class="config-list" v-if="currentDatabaseConfig">
        <div>
          <li>区域：{{ databaseConfigText.area.zonename }}</li>
          <li>计费模式：{{databaseConfigText.billingTypeText}}</li>
          <li>购买时长：{{databaseConfigText.buyTimeText}}</li>
          <li v-show="databaseConfigText.mirrorName">镜像：{{databaseConfigText.mirrorName}}</li>
          <li>规格：{{databaseConfigText.cpu + "核" + databaseConfigText.memory + "G"}}</li>
          <li>系统盘与存储：{{databaseConfigText.rootDiskSize + "G " + databaseConfigText.rootDiskType + " " + databaseConfigText.diskListText}}</li>
        </div>
        <div class="base">
          <li>网络：{{databaseConfigText.network}}</li>
          <li>公网IP：{{databaseConfigText.publicIPTypeText}}</li>
          <li>带宽大小：{{databaseConfigText.bandwidth + "MB"}}</li>
          <li>防火墙：{{databaseConfigText.firewall}}</li>
          <li>购买数量：{{databaseConfigText.buyCount + "台"}}</li>
        </div>
        <div class="base right">
          <button @click="addToCart">加入预算清单</button>
        </div>
      </ul>
      <ul class="config-list" v-if="currentSafelyipConfig">
        <li>区域：{{ safelyIPConfigText.area.zonename }}</li>
        <li>网络：{{safelyIPConfigText.network}}</li>
        <li>计费模式：{{safelyIPConfigText.billingTypeText}}</li>
        <li>带宽大小：{{safelyIPConfigText.bandwidth + "MB"}}</li>
        <li>购买时长：{{safelyIPConfigText.buyTimeText}}</li>
        <li>购买数量：{{safelyIPConfigText.buyCount}}</li>
        <div class="base right">
          <button @click="addToCart">加入预算清单</button>
        </div>
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
      li {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(102, 102, 102, 1);
        margin-bottom: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .base {
        margin-top: 20px;
        > button {
          cursor: pointer;
          outline: none;
          border: none;
          background: rgba(42, 153, 242, 1);
          border-radius: 2px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(255, 255, 255, 1);
          padding: 8px 18px;
        }
      }
      .right {
        text-align: right;
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
    currentServerConfig: {
      type: Object,
      default: () => {
        return null;
      }
    },
    currentDiskConfig: {
      type: Object,
      default: () => {
        return null;
      }
    },
    currentNetworkipConfig: {
      type: Object,
      default: () => {
        return null;
      }
    },
    currentDatabaseConfig: {
      type: Object,
      default: () => {
        return null;
      }
    },
    currentSafelyipConfig: {
      type: Object,
      default: () => {
        return null;
      }
    }
  },
  methods: {
    addToCart() {
      this.$emit("addToCart");
    }
  },
  computed: {
    serverConfigText() {
      let config = this.currentServerConfig;
      // 服务器类型
      switch (config.serverType) {
        case "cloudServer":
          config.serverTypeText = "云服务器";
          break;
        case "NOKIAServer":
          config.serverTypeText = "高防服务器";
          break;
        case "GPUServer":
          config.serverTypeText = "GPU服务器";
          break;
      }
      // 计费配置转文字
      let billingType = "";
      let buyTime = "";
      switch (config.billingType) {
        case "month":
          billingType = "包年包月";
          buyTime = config.buyTime + "月";
          break;
          if (config.buyTime > 11) {
            buyTime = config.buyTime / 12 + "年";
          }
        case "current":
          billingType = "实时计费";
          buyTime = "实时计费";
          break;
        case "week":
          billingType = "7天计费";
          buyTime = "7天";
          break;
        case "day":
          billingType = "按天计费";
          buyTime = config.buyDay + "天";
          break;
      }
      config.billingTypeText = billingType;
      config.buyTimeText = buyTime;

      // 数据盘转文字
      let diskList = "";
      if (config.diskList.length === 0) {
        config.diskListText = "无数据盘";
      } else {
        config.diskList.forEach(item => {
          diskList += item.size + "G " + item.type + " ";
        });
        config.diskListText = diskList;
      }
      config.publicIPTypeText =
        config.publicIPType === "buyNow" ? "立即购买" : "暂不购买";
      return config;
    },
    diskConfigText() {
      let config = this.currentDiskConfig;
      // 计费配置转文字
      let billingType = "";
      let buyTime = "";
      switch (config.billingType) {
        case "month":
          billingType = "包年包月";
          buyTime = config.buyTime + "月";
          if (config.buyTime > 11) {
            buyTime = config.buyTime / 12 + "年";
          }
          break;
        case "current":
          billingType = "实时计费";
          buyTime = "实时计费";
          break;
        case "week":
          billingType = "7天计费";
          buyTime = "7天";
          break;
        case "day":
          billingType = "按天计费";
          buyTime = config.buyDay + "天";
          break;
      }
      config.billingTypeText = billingType;
      config.buyTimeText = buyTime;
      // 数据盘转文字
      let diskList = "";
      if (config.diskList.length === 0) {
        config.diskListText = "无数据盘";
      } else {
        config.diskList.forEach(item => {
          diskList += item.size + "G " + item.type + " ";
        });
        config.diskListText = diskList;
      }
      return config;
    },
    networkIPConfigText() {
      let config = this.currentNetworkipConfig;
      // 计费配置转文字
      let billingType = "";
      let buyTime = "";
      switch (config.billingType) {
        case "month":
          billingType = "包年包月";
          buyTime = config.buyTime + "月";
          if (config.buyTime > 11) {
            buyTime = config.buyTime / 12 + "年";
          }
          break;
        case "current":
          billingType = "实时计费";
          buyTime = "实时计费";
          break;
        case "week":
          billingType = "7天计费";
          buyTime = "7天";
          break;
        case "day":
          billingType = "按天计费";
          buyTime = config.buyDay + "天";
          break;
      }
      config.billingTypeText = billingType;
      config.buyTimeText = buyTime;
      return config;
    },
    databaseConfigText() {
      let config = this.currentDatabaseConfig;
      // 计费配置转文字
      let billingType = "";
      let buyTime = "";
      switch (config.billingType) {
        case "month":
          billingType = "包年包月";
          buyTime = config.buyTime + "月";
          if (config.buyTime > 11) {
            buyTime = config.buyTime / 12 + "年";
          }
          break;
        case "current":
          billingType = "实时计费";
          buyTime = "实时计费";
          break;
        case "week":
          billingType = "7天计费";
          buyTime = "7天";
          break;
        case "day":
          billingType = "按天计费";
          buyTime = config.buyDay + "天";
          break;
      }
      // 数据盘转文字
      let diskList = "";
      if (config.diskList.length === 0) {
        config.diskListText = "无数据盘";
      } else {
        config.diskList.forEach(item => {
          diskList += item.size + "G " + item.type + " ";
        });
        config.diskListText = diskList;
      }
      config.publicIPTypeText =
        config.publicIPType === "buyNow" ? "立即购买" : "暂不购买";
      config.billingTypeText = billingType;
      config.buyTimeText = buyTime;
      return config;
    },
    safelyIPConfigText() {
      let config = this.currentSafelyipConfig;
      // 计费配置转文字
      let billingType = "";
      let buyTime = "";
      switch (config.billingType) {
        case "month":
          billingType = "包年包月";
          buyTime = config.buyTime + "月";
          if (config.buyTime > 11) {
            buyTime = config.buyTime / 12 + "年";
          }
          break;
        case "current":
          billingType = "实时计费";
          buyTime = "实时计费";
          break;
        case "week":
          billingType = "7天计费";
          buyTime = "7天";
          break;
        case "day":
          billingType = "按天计费";
          buyTime = config.buyDay + "天";
          break;
      }
      config.billingTypeText = billingType;
      config.buyTimeText = buyTime;
      return config;
    }
  }
};
</script>