<template>
  <div class="server-page">
    <buy-header title="购买云服务器" @toOldVersion="toOldVersion('host')"></buy-header>
    <div class="buy-step">
      <div
        v-for="(item,index) in buyStepGroup"
        :key="index"
        class="step-item"
        :class="{onStep: buyStep >= index}"
      >
        <div class="step-index">
          <span>{{index + 1}}</span>
        </div>
        <div class="step-text">
          <span>{{ item }}</span>
        </div>
        <div class="step-line" v-if="index < 3"></div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.server-page {
  background: rgba(248, 248, 248, 1);
  .buy-step {
    width: 1200px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    .step-item {
      position: relative;
      display: flex;
      .step-index {
        width: 28px;
        height: 28px;
        border: 1px solid rgba(153, 153, 153, 1);
        background: #fff;
        border-radius: 50%;
        text-align: center;
        span {
          font-size: 14px;
          font-family: HelveticaNeue;
          color: rgba(153, 153, 153, 1);
          line-height: 28px;
        }
      }
      .step-text {
        margin-left: 10px;
        span {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          color: rgba(153, 153, 153, 1);
          line-height: 28px;
        }
      }
      .step-line {
        margin-left: 20px;
        height: 2px;
        width: 218px;
        border: 1px solid rgba(233, 233, 233, 1);
        position: relative;
        top: 50%;
      }
      &.onStep {
        .step-index {
          border: 1px solid rgba(74, 151, 238, 1);
          background: rgba(74, 151, 238, 1);
          span {
            color: #fff;
          }
        }
        .step-text {
          span {
            color: #666666;
          }
        }
        .step-line {
          border: 1px solid rgba(74, 151, 238, 1);
        }
      }
    }
  }
}
</style>
<script type="text/ecmascript-6">
import buyHeader from "../buyComponents/buy-header";
export default {
  components: {
    buyHeader
  },
  data() {
    return {
      buyStep: 0,
      buyStepGroup: ["主机配置", "网络与带宽", "登陆信息", "订单确认"]
    };
  },
  methods: {
    toOldVersion(val) {
      this.$router.push("/buy/host");
    }
  }
};
</script>